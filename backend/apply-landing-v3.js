/**
 * One-off content migration: replaces the homepage dynamic zone with the six
 * approved landing-v3 sections (Hero, What we do, Where we are, Voice,
 * Our work, Close) and trims the Global navbar links to the v3 nav.
 *
 * The old Challenges / Threats / Partners / Future blocks are removed from
 * the homepage (their components stay in the schema for later reuse on
 * About / Our Work pages). Copy is verbatim from CONTENT-IMPLEMENTATION.md.
 *
 * Requires the new schema (blocks.what-we-do / blocks.programmes /
 * blocks.close + hero.heritage etc.) to be live on the target Strapi first:
 * restart the local dev server, or wait for the Strapi Cloud deploy.
 *
 * Defaults to local dev (backend/.env). To update the live production site,
 * pass a Strapi Cloud write-capable API token explicitly:
 *
 *   node apply-landing-v3.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-landing-v3.js
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

// __component must be the first key of every block — Strapi 5.47 REST PUT
// 400s on dynamic zones otherwise.
const BLOCKS = [
  {
    __component: "blocks.hero",
    eyebrow: "A locally-led NGO · South Tarawa, Kiribati",
    title: null, // null keeps the frontend's styled default: <em>Thriving, resilient</em> futures
    description:
      "Empower Kiribati is a platform for community initiatives. We partner with ministries, funders and community organisations to design, deliver and measure work that cultivates the conditions for a resilient Kiribati.",
    heritage:
      "Te bwabwai has supported I-Kiribati livelihoods for centuries. It grows only where the knowledge and the conditions are right, and today both are under threat. Our livelihoods are no exception. We exist to address both.",
    primaryButtonText: "See our work",
    primaryButtonLink: "#our-work",
    secondaryButtonText: "Partner with us",
    secondaryButtonLink: "/contact",
  },
  {
    __component: "blocks.what-we-do",
    eyebrow: "What we do",
    title: "Four areas of work",
    description: "Each of our programmes belongs to one of these.",
    items: [
      {
        title: "Empowering leaders & communities",
        description:
          "We work with people who already hold responsibility in a community organisation, a church or a youth group, on the leadership and systems their organisation needs to last.",
      },
      {
        title: "Enabling digital participation",
        description:
          "We deliver digital literacy and online safety work with schools, libraries and community groups, from basic internet skills through to recognising a scam.",
      },
      {
        title: "Building partnerships for impact",
        description:
          "We connect what communities tell us they need with the ministries, funders and organisations able to help.",
      },
      {
        title: "Creating conditions for innovation",
        description:
          "We create the space for people to test a practical idea, and help build the financial footing to keep it running.",
      },
    ],
  },
  {
    __component: "blocks.impact",
    eyebrow: "Where we are",
    title: "We started in May 2024",
    description: "We are a small organisation. This is what we have done so far.",
    metrics: [
      { number: "5", label: "Programmes delivered or under way" },
      { number: "40+", label: "Workshops run since we began" },
      { number: "1,500+", label: "People have attended one of them" },
      { number: "3", label: "Funding partners backing our work" },
    ],
    note: "All of this work has been on South Tarawa. Where we have a signed attendance register, we publish that number. Where a group was too large to count person by person, the figure we publish is lower than the number who were actually in the room.",
    outcomes: [],
  },
  {
    __component: "blocks.testimonials",
    eyebrow: "In their words",
    quote:
      "I once was a boss but not a leader. After the workshop I learnt a lot about the difference.",
    attribution: "A faith leader · July 2026",
    note: "We identify people by their role and the month, not by name. At the start of every workshop we tell participants that their individual answers will not be shared.",
  },
  {
    __component: "blocks.programmes",
    eyebrow: "Our work",
    title: "What we are running now",
    items: [
      {
        title: "American Spaces",
        description:
          "Youth workshops on vision, leadership, cybersafety and careers, at the Kiribati National Library and in secondary schools",
        partnerLine: "with the U.S. Embassy Suva",
        programmeStatus: "running",
        statusYear: null,
      },
      {
        title: "Empowering Community Leadership",
        description:
          "Two-day workshops in leadership, digital literacy and financial management, run for three separate groups of local leaders",
        partnerLine: "with the New Zealand High Commission",
        programmeStatus: "completed",
        statusYear: "2026",
      },
      {
        title: "Women's Economic Empowerment",
        description:
          "We facilitated the workshops that built a national framework with 19 women's organisations",
        partnerLine: "convened by MWYSSA, funded by Caritas",
        programmeStatus: "completed",
        statusYear: "2026",
      },
    ],
    buttonText: "All our work",
    buttonLink: "/our-programs",
  },
  {
    __component: "blocks.close",
    eyebrow: "Work with us",
    title: "Bwabwai is not grown in a day",
    description:
      "The same is true of the skill and confidence it takes to lead. If your organisation would like a workshop, or you work with a partner interested in this kind of work, please write to us.",
    buttonText: "Get in touch",
    buttonLink: "/contact",
  },
];

// v3 nav: Contact renders as the Header's CTA button, not a nav link, and the
// Kiribati language link is omitted until the te taetae ni Kiribati page exists.
const NAV_LINKS = [
  { label: "Our Work", url: "/our-programs" },
  { label: "Resources", url: "/resources" },
  { label: "Blog", url: "/blog" },
  { label: "About", url: "/about" },
];

async function put(endpoint, data, token) {
  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PUT ${endpoint} ${res.status} ${res.statusText}\n${text}`);
  }
  return res.status;
}

async function main() {
  const token = readEnvToken();
  if (!token) {
    throw new Error("STRAPI_API_TOKEN missing. Add a write-capable token to backend/.env.");
  }

  const status = await put("/api/homepage", { blocks: BLOCKS }, token);
  console.log(`✓ Homepage blocks replaced with the six landing-v3 sections (${status}).`);

  const navStatus = await put("/api/global", { navbarLinks: NAV_LINKS }, token);
  console.log(`✓ Global navbar links set to the v3 nav (${navStatus}).`);

  console.log("  If the live site doesn't reflect it, publish Homepage and Global in the Strapi admin.");
}

main().catch((err) => {
  console.error("✗ Migration failed:", err.message);
  process.exit(1);
});
