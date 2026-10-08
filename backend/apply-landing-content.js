/**
 * Makes the landing page's hard-coded copy permanent CMS content, so every
 * section can be edited in the admin instead of falling back to code.
 * Idempotent: a field that already has a value is never touched, except for
 * two deliberate repairs of stale copy (see REPAIRS).
 *
 * Homepage (single type):
 *   - fills every unset field on the existing blocks (hero, what-we-do,
 *     impact, testimonials, programmes, close) with the copy the frontend
 *     renders today;
 *   - inserts the blocks that only existed in code: challenge-cycle (after
 *     the hero), partner-marquee and news (after programmes);
 *   - seeds seoTitle / seoDescription.
 *   REPAIRS: the close block still holds the pre-rewrite "Rome is not built
 *   in a day" copy and the programmes title still reads "What we are running
 *   now" — both are replaced ONLY while they hold exactly that legacy text,
 *   so later admin edits survive re-runs.
 *
 * Global (single type): seeds the contact, footer, social, header-CTA and
 * nav fields only where unset (the News nav link on an existing nav is
 * apply-news-nav.js's job).
 *
 * Photos are not uploaded: the hero and Strategic-focus card photos stay as
 * the bundled, graded images until an editor uploads replacements into the
 * fields that now exist for them.
 *
 * Needs the cms-landing-content schema deployed (400s with a clear message
 * otherwise). Defaults to local dev (backend/.env). For production, pass a
 * Strapi Cloud full-access token explicitly and delete it afterwards:
 *
 *   node apply-landing-content.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-landing-content.js
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

// ---------------------------------------------------------------------------
// The copy the frontend renders today, block by block (verbatim from the
// components' fallbacks).
// ---------------------------------------------------------------------------

const HERO = {
  eyebrow: "A locally-led NGO · South Tarawa, Kiribati",
  // *text* renders as the lime emphasis.
  title: "*Thriving, resilient* futures",
  description:
    "Empower Kiribati is a platform for community initiatives. We partner with ministries, funders and community organisations to design, deliver and measure work that cultivates the conditions for a resilient Kiribati.",
  primaryButtonText: "See our work",
  primaryButtonLink: "#our-work",
  secondaryButtonText: "Partner with us",
  secondaryButtonLink: "/contact",
  photoLabel: "South Tarawa · Kiribati",
};

const CHALLENGE_CYCLE = {
  eyebrow: "The challenge",
  title: "Our challenges are not loud, but their effects are real.",
  steps: [
    "Kiribati has a small economy with few industries. That means few jobs, and most of them are with government.",
    "Every year many students finish school and university. There are not enough jobs for all of them, even for those who did well.",
    "Those who left school early do not have the skills for the jobs that do exist.",
    "Meanwhile the cost of living keeps rising. Food, fuel and everyday goods cost more, but pay stays the same. Every fortnight it buys less than the fortnight before.",
    "On top of that, families give to their community and their church, as they always have. These are important, and they come out of the same pay.",
    "So a family needs more than it earns. To cover the difference, they borrow from relatives or friends.",
    "When the next pay arrives, part of it is already owed. Less is left than before, and the costs have not gone away. Each time this happens the gap gets wider and harder to escape.",
    "Financial pressure takes a parent's attention away from important responsibilities, such as raising their children well and supporting their education. Children need help and encouragement to do well at school. Without it, many fall behind and leave early. They then face the same job market their parents did, and the pattern begins again.",
    "The harm does not stay inside the home. Where there is no work and no purpose, young people drift into groups that get into trouble, and pressure inside families can turn into violence against women and children.",
  ].map((text) => ({ text })),
  closeLead:
    "This cycle repeats itself in every generation. It passes from parents to children, and starts again.",
  closeConditions: "What holds it in place is conditions, not a lack of effort or ambition.",
  closeHighlight: "Conditions can be changed.",
  closeStatement:
    "Kiribati will not be changed from outside. It will be changed by I-Kiribati people with the skills, the systems and the standing to do it. We exist to build all three, and to raise the leaders who will keep building long after us.",
};

const WHAT_WE_DO = {
  eyebrow: "How we respond",
  title: "Strategic focus",
  description: "Each of our programmes belongs to one of these.",
  items: [
    "We empower leaders & communities",
    "We enable digital participation",
    "We build partnerships for impact",
    "We create conditions for innovation",
  ].map((title) => ({ title })),
};

const IMPACT = {
  eyebrow: "Track record",
  title: "Delivered, and measured",
  description:
    "Government ministries, regional agencies, civil society and community organisations come to us with the work that matters most to their communities.",
  note: "Every initiative we take on is designed against national priorities, measured before and after, and reported in full.",
  metrics: [
    { number: "1,500+", label: "People reached", description: "through our programmes" },
    { number: "50+", label: "Organisations", description: "we have worked alongside" },
    { number: "40+", label: "Workshops delivered", description: "since 2024" },
    { number: "5", label: "Programmes", description: "delivered or under way" },
  ],
  voyageStart: "May 2024",
  voyageEnd: "Today",
};

const PROGRAMMES = {
  eyebrow: "Our work",
  title: "Featured projects",
  buttonText: "All our work",
  buttonLink: "/our-programs",
};

const PARTNER_MARQUEE = {
  eyebrow: "Our funding and government partners",
  intro:
    "The ministries, embassies and funds that back our work and shape it alongside national priorities.",
};

const NEWS = {
  eyebrow: "News",
  title: "What's new",
  description: "Grants awarded, sessions delivered and partnerships agreed, as they happen.",
  buttonText: "All news",
  buttonLink: "/news",
};

const TESTIMONIALS = {
  eyebrow: "In their words",
  quote:
    "I once was a boss but not a leader. After the workshop I learnt a lot about the difference.",
  attribution: "A faith leader · July 2026",
  note: "We identify people by their role and the month, not by name. At the start of every workshop we explain this, and people are free to decline.",
};

const CLOSE = {
  eyebrow: "Work with us",
  title: "Back work that is *already happening*",
  description:
    "We are on the ground in South Tarawa, delivering with partners who checked us before they funded us. If you are looking for a partner in Kiribati who can plan, deliver and report properly, start here.",
  buttonText: "Start a conversation",
  // null → the button derives its mailto from Global partnershipEmail.
  buttonLink: null,
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

// The SEO layout appends " — <site name>" itself, so the title is the page's
// own name only.
const SEO = {
  seoTitle: "Thriving, resilient futures",
  seoDescription: HERO.description,
};
const LEGACY_SEO_TITLE = "Empower Kiribati — Thriving, resilient futures";

const DEFAULTS = {
  "blocks.hero": HERO,
  "blocks.challenge-cycle": CHALLENGE_CYCLE,
  "blocks.what-we-do": WHAT_WE_DO,
  "blocks.impact": IMPACT,
  "blocks.programmes": PROGRAMMES,
  "blocks.partner-marquee": PARTNER_MARQUEE,
  "blocks.news": NEWS,
  "blocks.testimonials": TESTIMONIALS,
  "blocks.close": CLOSE,
};

// Stale stored copy that is replaced only while it still reads exactly so.
const REPAIRS = [
  {
    component: "blocks.close",
    when: (b) => b.title === "Rome is not built in a day",
    set: {
      eyebrow: CLOSE.eyebrow,
      title: CLOSE.title,
      description: CLOSE.description,
      buttonText: CLOSE.buttonText,
      buttonLink: CLOSE.buttonLink,
    },
    note: "close copy → Work-with-us",
  },
  {
    component: "blocks.programmes",
    when: (b) => b.title === "What we are running now",
    set: { title: PROGRAMMES.title },
    note: 'programmes title → "Featured projects"',
  },
];

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
  navbarLinks: [
    { label: "Our Work", url: "/our-programs" },
    { label: "News", url: "/news" },
    { label: "Resources", url: "/resources" },
    { label: "Blog", url: "/blog" },
    { label: "About", url: "/about" },
  ],
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
        { label: "News", url: "/news" },
        { label: "Blog", url: "/blog" },
        { label: "Events", url: "/events" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------

// Same per-component populate the frontend uses, so nested components and
// media come back complete and nothing is dropped on the rebuild.
const POPULATE = [
  "populate[blocks][on][blocks.hero][populate]=*",
  "populate[blocks][on][blocks.challenge-cycle][populate]=*",
  "populate[blocks][on][blocks.what-we-do][populate][items][populate]=*",
  "populate[blocks][on][blocks.programmes][populate]=*",
  "populate[blocks][on][blocks.close][populate]=*",
  "populate[blocks][on][blocks.challenges][populate]=*",
  "populate[blocks][on][blocks.threats][populate]=*",
  "populate[blocks][on][blocks.impact][populate]=*",
  "populate[blocks][on][blocks.partner-marquee][populate]=*",
  "populate[blocks][on][blocks.news][populate]=*",
  "populate[blocks][on][blocks.pillars][populate][pillars][populate]=*",
  "populate[blocks][on][blocks.testimonials][populate][testimonials][populate]=*",
  "populate[blocks][on][blocks.future][populate]=*",
  "populate[blocks][on][blocks.partners][populate][logos][populate]=*",
  "populate[blocks][on][blocks.partners][populate][categories]=true",
].join("&");

const STRIP = new Set(["id", "documentId", "createdAt", "updatedAt", "publishedAt", "locale"]);
const isMedia = (v) => v && typeof v === "object" && typeof v.url === "string" && "mime" in v;

// Strips Strapi bookkeeping and reduces media to ids so the block can be PUT
// back verbatim. Relations (pillars/testimonials) are reduced to documentIds.
function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") {
    if (isMedia(value)) return value.id;
    if (value.documentId && !("__component" in value) && Object.keys(value).length > 6) {
      // a populated relation entry
      return { documentId: value.documentId };
    }
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (STRIP.has(k)) continue;
      out[k] = clean(v);
    }
    return out;
  }
  return value;
}

const isUnset = (v) =>
  v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

// `__component` must be the first key of each dynamic-zone entry on PUT.
function rebuild(block) {
  const { __component, ...rest } = block;
  return { __component, ...clean(rest) };
}

function fillUnset(block, defaults, changes) {
  for (const [key, value] of Object.entries(defaults)) {
    if (value === null) continue; // nothing to seed
    if (isUnset(block[key])) {
      block[key] = value;
      changes.push(key);
    }
  }
}

async function applyHomepage(headers) {
  const res = await fetch(`${STRAPI_URL}/api/homepage?${POPULATE}`, { headers });
  if (res.status === 400) {
    throw new Error(
      `The landing-content schema (blocks.challenge-cycle etc.) is not deployed at ${STRAPI_URL} yet — re-run after the schema deploy.`,
    );
  }
  if (!res.ok) throw new Error(`GET homepage ${res.status}: ${await res.text()}`);
  const { data: home } = await res.json();
  if (!home) throw new Error("Homepage single type has no published entry");

  const blocks = (home.blocks ?? []).map(rebuild);
  const log = [];

  // 1. Repairs of stale copy.
  for (const repair of REPAIRS) {
    const block = blocks.find((b) => b.__component === repair.component);
    if (block && repair.when(block)) {
      Object.assign(block, repair.set);
      log.push(`repair: ${repair.note}`);
    }
  }

  // 2. Fill unset fields on existing blocks.
  for (const block of blocks) {
    const defaults = DEFAULTS[block.__component];
    if (!defaults) continue;
    const changes = [];
    fillUnset(block, defaults, changes);
    if (changes.length) log.push(`${block.__component}: ${changes.join(", ")}`);
  }

  // 3. Insert the blocks that only existed in code, in their page positions.
  const has = (c) => blocks.some((b) => b.__component === c);
  const insertAfter = (afterComponent, component) => {
    if (has(component)) return;
    const idx = blocks.findIndex((b) => b.__component === afterComponent);
    const entry = { __component: component, ...DEFAULTS[component] };
    blocks.splice(idx === -1 ? blocks.length : idx + 1, 0, entry);
    log.push(`inserted ${component}`);
  };
  insertAfter("blocks.hero", "blocks.challenge-cycle");
  insertAfter("blocks.programmes", "blocks.partner-marquee");
  insertAfter("blocks.partner-marquee", "blocks.news");

  // 4. SEO fields (the doubled legacy title is repaired while it reads exactly so).
  const data = { blocks };
  for (const [key, value] of Object.entries(SEO)) {
    if (isUnset(home[key])) {
      data[key] = value;
      log.push(`seo: ${key}`);
    }
  }
  if (home.seoTitle === LEGACY_SEO_TITLE) {
    data.seoTitle = SEO.seoTitle;
    log.push("repair: seoTitle no longer repeats the site name");
  }

  if (log.length === 0) {
    console.log("Homepage: nothing to change.");
    return;
  }
  const put = await fetch(`${STRAPI_URL}/api/homepage`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  });
  if (!put.ok) throw new Error(`PUT homepage ${put.status}: ${await put.text()}`);
  console.log("Homepage updated:\n  - " + log.join("\n  - "));
}

async function applyGlobal(headers) {
  const res = await fetch(
    `${STRAPI_URL}/api/global?populate[navbarLinks]=true&populate[headerCta]=true&populate[socialLinks]=true&populate[footerColumns][populate]=*`,
    { headers },
  );
  if (!res.ok) throw new Error(`GET global ${res.status}: ${await res.text()}`);
  const { data: global } = await res.json();
  if (!global) throw new Error("Global single type has no published entry");

  const patch = {};
  for (const [key, value] of Object.entries(GLOBAL_SEEDS)) {
    if (isUnset(global[key])) patch[key] = value;
  }
  if (Object.keys(patch).length === 0) {
    console.log("Global: nothing to change.");
    return;
  }
  const put = await fetch(`${STRAPI_URL}/api/global`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: patch }),
  });
  if (!put.ok) throw new Error(`PUT global ${put.status}: ${await put.text()}`);
  console.log(`Global seeded: ${Object.keys(patch).join(", ")}.`);
}

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  await applyHomepage(headers);
  await applyGlobal(headers);
  console.log(`Done against ${STRAPI_URL}. Publish Homepage and Global in the admin if a PUT left them as drafts.`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
