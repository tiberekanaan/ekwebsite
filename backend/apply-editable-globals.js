/**
 * One-off content migration for the "everything editable" feature. Two steps:
 *
 * 1. Homepage blocks.close — the stored fields still carry the old v3
 *    "Bwabwai" close copy, which the frontend has ignored since the
 *    Work-with-us rewrite. Now that CloseBlock honours its CMS fields again,
 *    this OVERWRITES them with the locked Work-with-us copy (title uses
 *    *asterisks* for the lime emphasis) and seeds the three route cards.
 *    buttonLink is left null so the button derives its mailto from the
 *    Global partnershipEmail.
 *
 * 2. Global single type — seeds the new contact/social/footer fields with
 *    the values currently hard-coded in the frontend, but only where a field
 *    is unset, so re-running never clobbers admin edits.
 *
 * Safe to run BEFORE the schema deploys: if Strapi rejects the new keys
 * (routes/contactHeading/contactText, global seeds), the script falls back
 * to writing only the fields that already exist and tells you to re-run
 * after the deploy. Run it once pre-push to purge the stale close copy, and
 * once post-deploy to seed the rest. Defaults to local dev (backend/.env).
 * For production, pass a Strapi Cloud write-capable API token explicitly:
 *
 *   node apply-editable-globals.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-editable-globals.js
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

// Fields that already exist in the deployed blocks.close schema — writable
// even before the new schema ships.
const CLOSE_LEGACY = {
  eyebrow: "Work with us",
  title: "Back work that is *already happening*",
  description:
    "We are on the ground in South Tarawa, delivering with partners who checked us before they funded us. If you are looking for a partner in Kiribati who can plan, deliver and report properly, start here.",
  buttonText: "Start a conversation",
  buttonLink: null,
};

// Fields added by this feature's schema — only writable once it has deployed.
const CLOSE_NEW = {
  contactHeading: "Talk to us directly",
  contactText:
    "Write to us and we will respond promptly. You will get a real answer, not a form response, and we will tell you plainly if we are not the right partner for it.",
  routes: [
    {
      label: "Embassies, ministries and funds",
      title: "Fund a programme",
      body: "Tell us the outcome you are mandated to reach. We will come back with a design, a budget and the measures we will report against.",
    },
    {
      label: "Agencies, NGOs and private sector",
      title: "Deliver with us",
      body: "If your work needs an in-country partner who knows the communities and can run it properly, we can take that role or share it.",
    },
    {
      label: "Community organisations, churches and schools",
      title: "Bring us to your people",
      body: "Tell us what your members are struggling with. If it sits in our work, we will look for the partner and the funding to make it happen.",
    },
  ],
};

// Seeded only where the field is currently unset.
const GLOBAL_SEEDS = {
  generalEmail: "externalaffairs@empower.org.ki",
  partnershipEmail: "partnership@empower.org.ki",
  phone: "+686 7300 5227",
  footerAddress: "Te Kimatore CS Compound\nBikenibeu, South Tarawa",
  officeLine: "Bikenibeu, South Tarawa, Kiribati",
  utcNote:
    "Kiribati is UTC+12, ahead of most of the world. Your message will already be waiting for us when our day starts.",
  footerBlurb:
    "A Kiribati NGO based in Bikenibeu, South Tarawa. We work on leadership, digital skills and financial confidence in the communities we come from.",
  footerContactHeading: "Get in touch",
  legalLine:
    "Empower Kiribati is the operating name of Digital Kiribati Inc, incorporated under the Republic of Kiribati Incorporated Societies Act 2002 on 6 May 2024 (Reg. No 21/24) and registered as a National NGO with the Ministry for Women, Youth, Sports and Social Affairs.",
  footerTagline: "Mauri from Kiribati",
  headerCta: { label: "Contact", url: "/contact" },
  socialLinks: [
    { label: "Facebook", url: "https://facebook.com/empowerkiribati" },
    { label: "LinkedIn", url: "https://linkedin.com/company/empowerkiribati" },
  ],
  footerColumns: [
    {
      heading: "Our work",
      links: [
        { label: "Programmes", url: "/our-programs" },
        { label: "Partners", url: "/our-partners" },
      ],
    },
    {
      heading: "Learn",
      links: [
        { label: "Resources", url: "/resources" },
        { label: "Blog", url: "/blog" },
        { label: "Events", url: "/events" },
      ],
    },
  ],
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
function rebuild(block, closeCopy) {
  const { __component, ...rest } = clean(block);
  if (__component === "blocks.close") {
    return { __component, ...rest, ...closeCopy };
  }
  return { __component, ...rest };
}

const isUnset = (v) =>
  v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // 1. Homepage: rewrite the close block.
  const homeRes = await fetch(`${STRAPI_URL}/api/homepage?${POPULATE}`, { headers });
  if (!homeRes.ok) throw new Error(`GET homepage ${homeRes.status}: ${await homeRes.text()}`);
  const { data: home } = await homeRes.json();

  const putHomepage = (blocks) =>
    fetch(`${STRAPI_URL}/api/homepage`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ data: { blocks } }),
    });

  const sourceBlocks = home?.blocks ?? [];
  if (!sourceBlocks.some((b) => b.__component === "blocks.close")) {
    console.log("No blocks.close entry on the homepage — skipping the close rewrite.");
  } else {
    let putHome = await putHomepage(
      sourceBlocks.map((b) => rebuild(b, { ...CLOSE_LEGACY, ...CLOSE_NEW })),
    );
    if (putHome.status === 400) {
      // New schema not deployed yet — write only the fields that exist.
      putHome = await putHomepage(sourceBlocks.map((b) => rebuild(b, CLOSE_LEGACY)));
      if (putHome.ok) {
        console.log(
          `Close copy fixed, but the routes/contact fields are not in the deployed schema yet — re-run after the schema deploy to seed them (${STRAPI_URL}).`,
        );
      }
    } else if (putHome.ok) {
      console.log(`Close block rewritten with the Work-with-us copy + route cards (${STRAPI_URL}).`);
    }
    if (!putHome.ok) throw new Error(`PUT homepage ${putHome.status}: ${await putHome.text()}`);
  }

  // 2. Global: seed only unset fields.
  const globalRes = await fetch(
    `${STRAPI_URL}/api/global?populate[navbarLinks]=true&populate[headerCta]=true&populate[socialLinks]=true&populate[footerColumns][populate]=*`,
    { headers },
  );
  if (globalRes.status === 400) {
    // Deep populate of the new components 400s until the schema deploys.
    console.log(
      "Global: the new fields are not in the deployed schema yet — re-run after the schema deploy to seed them.",
    );
    return;
  }
  if (!globalRes.ok) throw new Error(`GET global ${globalRes.status}: ${await globalRes.text()}`);
  const { data: global } = await globalRes.json();
  if (!global) throw new Error("Global single type has no published entry");

  const patch = {};
  for (const [key, value] of Object.entries(GLOBAL_SEEDS)) {
    if (isUnset(global[key])) patch[key] = value;
  }

  if (Object.keys(patch).length === 0) {
    console.log("Global: all fields already set — nothing to seed.");
    return;
  }

  const putGlobal = await fetch(`${STRAPI_URL}/api/global`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: patch }),
  });
  if (!putGlobal.ok) throw new Error(`PUT global ${putGlobal.status}: ${await putGlobal.text()}`);
  console.log(`Global seeded: ${Object.keys(patch).join(", ")}.`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
