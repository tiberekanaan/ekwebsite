/**
 * One-off content migration: rewrites the "Where we are" impact block into
 * the Track record section from CONTENT-IMPLEMENTATION_1.md §2.4 (new
 * eyebrow/title/intro, four figures with bold label + sub-label, closing
 * line replacing the honesty note) and inserts the §2.5 partner-marquee
 * block directly after it if not already present. Every other homepage
 * block is preserved untouched via fetch-modify-put.
 *
 * Requires the blocks.partner-marquee schema to be live on the target
 * Strapi first (restart local dev, or wait for the Strapi Cloud deploy).
 *
 * Defaults to local dev (backend/.env). To update production, pass a Strapi
 * Cloud write-capable API token explicitly:
 *
 *   node apply-track-record.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-track-record.js
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

const IMPACT = {
  eyebrow: "Track record",
  title: "Delivered, and measured",
  description:
    "Government ministries, regional agencies, civil society and community organisations come to us with the work that matters most to their communities.",
  metrics: [
    { number: "1,500+", label: "People reached", description: "through our programmes" },
    { number: "50+", label: "Organisations", description: "we have worked alongside" },
    { number: "40+", label: "Workshops delivered", description: "since 2024" },
    { number: "5", label: "Programmes", description: "delivered or under way" },
  ],
  note: "Every initiative we take on is designed against national priorities, measured before and after, and reported in full.",
};

const MARQUEE = {
  __component: "blocks.partner-marquee",
  eyebrow: "Our funding and government partners",
  intro:
    "The ministries, embassies and funds that back our work and shape it alongside national priorities.",
};

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
  if (__component === "blocks.impact") {
    return { __component, ...rest, ...IMPACT };
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

  const impactIndex = blocks.findIndex((b) => b.__component === "blocks.impact");
  if (impactIndex === -1)
    throw new Error("No blocks.impact entry found on the homepage — nothing to rewrite");
  if (!blocks.some((b) => b.__component === "blocks.partner-marquee")) {
    blocks.splice(impactIndex + 1, 0, MARQUEE);
  }
  console.log(`Rebuilding ${blocks.length} blocks (${STRAPI_URL})`);

  const putRes = await fetch(`${STRAPI_URL}/api/homepage`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { blocks } }),
  });
  if (!putRes.ok) throw new Error(`PUT homepage ${putRes.status}: ${await putRes.text()}`);
  console.log("Homepage impact block rewritten to Track record.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
