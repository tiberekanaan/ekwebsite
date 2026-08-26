/**
 * One-off content migration: rewrites the "What we do" block header to
 * "How we respond / Strategic focus" and turns each area title into its
 * action statement ("Empowering leaders & communities" -> "We empower
 * leaders & communities"). Item descriptions stay in the CMS but the
 * frontend no longer renders them — each card now carries the action
 * statement only and links through to the detail on /our-programs.
 * Every other homepage block is preserved untouched via fetch-modify-put.
 *
 * Defaults to local dev (backend/.env). To update production, pass a Strapi
 * Cloud write-capable API token explicitly:
 *
 *   node apply-strategic-focus.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-strategic-focus.js
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

function readEnvToken() {
  if (process.env.STRAPI_API_TOKEN) return process.env.STRAPI_API_TOKEN;
  const envPath = path.join(__dirname, ".env");
  let raw = "";
  try {
    raw = fs.readFileSync(envPath, "utf8");
  } catch {
    throw new Error(`Cannot read ${envPath}`);
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*STRAPI_API_TOKEN\s*=\s*(.*)\s*$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

const HEADER = {
  eyebrow: "How we respond",
  title: "Strategic focus",
};

// Keyword-matched so the rewrite survives minor title drift and is
// idempotent — rerunning maps an already-rewritten title to itself.
const TITLES = [
  { match: /leader|communit/i, title: "We empower leaders & communities" },
  { match: /digital/i, title: "We enable digital participation" },
  { match: /partner/i, title: "We build partnerships for impact" },
  { match: /innovat/i, title: "We create conditions for innovation" },
];

// Same per-component populate the frontend uses, so nested components and
// media come back complete and nothing is silently dropped on the rebuild.
const POPULATE = [
  "populate[blocks][on][blocks.hero][populate]=*",
  "populate[blocks][on][blocks.what-we-do][populate][items][populate]=*",
  "populate[blocks][on][blocks.programmes][populate]=*",
  "populate[blocks][on][blocks.close][populate]=*",
  "populate[blocks][on][blocks.challenges][populate]=*",
  "populate[blocks][on][blocks.threats][populate]=*",
  "populate[blocks][on][blocks.impact][populate]=*",
  "populate[blocks][on][blocks.partner-marquee][populate]=*",
  "populate[blocks][on][blocks.pillars][populate][pillars][populate]=*",
  "populate[blocks][on][blocks.testimonials][populate][testimonials][populate]=*",
  "populate[blocks][on][blocks.future][populate]=*",
  "populate[blocks][on][blocks.partners][populate][logos][populate]=*",
  "populate[blocks][on][blocks.partners][populate][categories]=true",
].join("&");

const isMedia = (v) =>
  v && typeof v === "object" && "url" in v && "hash" in v && "mime" in v;

// Strip Strapi bookkeeping and collapse populated media to bare ids so the
// payload round-trips cleanly through PUT.
function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") {
    if (isMedia(value)) return value.id;
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (["id", "documentId", "createdAt", "updatedAt", "publishedAt"].includes(k)) continue;
      out[k] = clean(v);
    }
    return out;
  }
  return value;
}

// __component must be the first key of every block — Strapi 5.47 REST PUT
// 400s on dynamic zones otherwise.
function rebuild(block) {
  const { __component, ...rest } = clean(block);
  if (__component === "blocks.what-we-do") {
    const items = (rest.items ?? []).map((item) => {
      const mapped = TITLES.find(({ match }) => match.test(item.title));
      return mapped ? { ...item, title: mapped.title } : item;
    });
    return { __component, ...rest, ...HEADER, items };
  }
  return { __component, ...rest };
}

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getRes = await fetch(`${STRAPI_URL}/api/homepage?${POPULATE}`, { headers });
  if (!getRes.ok) throw new Error(`GET homepage ${getRes.status}: ${await getRes.text()}`);
  const { data } = await getRes.json();
  const blocks = (data?.blocks ?? []).map(rebuild);

  if (!blocks.some((b) => b.__component === "blocks.what-we-do"))
    throw new Error("No blocks.what-we-do entry found on the homepage — nothing to rewrite");
  console.log(`Rebuilding ${blocks.length} blocks (${STRAPI_URL})`);

  const putRes = await fetch(`${STRAPI_URL}/api/homepage`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { blocks } }),
  });
  if (!putRes.ok) throw new Error(`PUT homepage ${putRes.status}: ${await putRes.text()}`);
  console.log("What-we-do block rewritten to Strategic focus.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
