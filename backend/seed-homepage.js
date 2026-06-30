/**
 * Seeds the Homepage Single Type with the "Cultivating Resilience" narrative.
 * Reads STRAPI_API_TOKEN from backend/.env and PUTs the full dynamic-zone block
 * set (hero → challenges → threats → impact → testimonials → partners → future)
 * to the local Strapi 5 instance, matching frontend/new-landing-page.html.
 *
 *   node seed-homepage.js
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = "http://localhost:1337";

// --- Read STRAPI_API_TOKEN from .env (no dotenv dependency) -----------------
function readEnvToken() {
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
  return process.env.STRAPI_API_TOKEN || null;
}

// --- Dynamic-zone payload (Strapi 5 standard) -------------------------------
// Order mirrors the design: hero → challenges → threats → impact →
// testimonials → partners → future. Testimonials and partners are seeded with
// header copy only; their entries render the same placeholders as the design.
const blocks = [
  {
    __component: "blocks.hero",
    title: "Cultivating a Resilient Kiribati",
    description:
      "We help our people gain the leadership, enterprise, and digital skills they need to thrive in a rapidly changing world — and to lead that change themselves.",
    primaryButtonText: "Support Our Work",
    primaryButtonLink: "/contact",
    secondaryButtonText: "See Our 2026–2030 Vision",
    secondaryButtonLink: "#future",
  },
  {
    __component: "blocks.challenges",
    eyebrow: "The changing soil",
    title: "The threats to our roots",
    description:
      "Just as rising tides threaten the roots of the bwabwai, modern pressures are threatening the roots of our livelihoods, our culture, and our well-being. Four challenges shape life in Kiribati today.",
    items: [
      {
        title: "Climate change",
        caption:
          "Rising seas wash away shorelines and contaminate the freshwater and soil our communities depend on for survival.",
      },
      {
        title: "Unemployment",
        caption:
          "Few jobs and limited pathways into enterprise leave young people unable to earn, straining households and pushing many into vulnerable informal work.",
      },
      {
        title: "Limited digital participation",
        caption:
          "Gaps in access, awareness, and confidence lock people out of the tools needed to connect, learn, and earn safely online.",
      },
      {
        title: "Fragile local leadership",
        caption:
          "Progress too often rests on a few individuals or outside help, making it hard for communities to sustain long-term change on their own.",
      },
    ],
  },
  {
    __component: "blocks.threats",
    eyebrow: "How we adapt",
    title: "Our roots of empowerment",
    lead: "Like the bwabwai, surviving these challenges takes a healthy root system and the ability to adapt. We don't offer temporary relief — we build the knowledge, skills, and local leadership needed to meet each threat at its root. Here's how each challenge becomes a pathway for growth.",
    items: [
      {
        threatLabel: "When the environment shifts",
        threatText:
          "Climate change erodes the land, water, and food our communities rely on.",
        answerTitle: "We create conditions for innovation",
        answerText:
          "We help communities test, learn, and adapt new ways of growing food, preserving culture, and building climate resilience — so solutions are owned locally.",
      },
      {
        threatLabel: "When jobs are scarce",
        threatText:
          "A narrow job market leaves capable people without a way to earn.",
        answerTitle: "We enable livelihoods & enterprise",
        answerText:
          "We teach practical money management and help entrepreneurs build viable businesses — creating new income that doesn't depend on a limited job market.",
      },
      {
        threatLabel: "When the world moves online",
        threatText:
          "Many are left behind without the skills to take part safely.",
        answerTitle: "We enable digital participation",
        answerText:
          "We build the digital literacy and cyber-safety skills people need to navigate the internet with confidence — so no one is left behind.",
      },
      {
        threatLabel: "When progress is fragile",
        threatText: "Change stalls when it depends on too few people.",
        answerTitle: "We empower leaders & communities",
        answerText:
          "We develop local stewards and build strong organisational foundations — so communities can lead their own change long after external funding ends.",
      },
      {
        threatLabel: "Because we can't do this alone",
        threatText:
          "Lasting change needs reach beyond any one organisation.",
        answerTitle: "We build partnerships for impact",
        answerText:
          "We forge trusted relationships with government ministries and regional funders — so our work reaches every island and achieves true scale.",
      },
    ],
  },
  {
    __component: "blocks.impact",
    eyebrow: "The harvest",
    title: "The change we're growing",
    description:
      "We measure real change, not just activity. As our programmes take root from 2026 onward, this is the evidence we hold ourselves to.",
    metrics: [
      {
        number: "From 2026",
        label: "People supported into stronger livelihoods and enterprise",
      },
      {
        number: "From 2026",
        label: "Communities reached through digital skills and safety",
      },
      {
        number: "From 2026",
        label: "Local leaders developed through our programmes",
      },
      {
        number: "From 2026",
        label: "Active partnerships delivering work together",
      },
    ],
  },
  {
    __component: "blocks.testimonials",
    eyebrow: "In their words",
    title: "Voices from our communities",
  },
  {
    __component: "blocks.partners",
    eyebrow: "Stronger together",
    title: "Who we work with",
  },
  {
    __component: "blocks.future",
    eyebrow: "The road ahead",
    title: "Where we're heading",
    description:
      "Our plan runs from 2026 to 2030 — moving from strong foundations to programmes that sustain themselves.",
    buttonText: "Support our work",
    buttonLink: "#top",
  },
];

async function main() {
  const token = readEnvToken();
  if (!token) {
    throw new Error(
      "STRAPI_API_TOKEN missing. Add a write-capable token to backend/.env."
    );
  }

  const res = await fetch(`${STRAPI_URL}/api/homepage`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: { blocks } }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PUT ${res.status} ${res.statusText}\n${text}`);
  }

  console.log(`✓ Homepage seeded (${res.status}). ${blocks.length} blocks written.`);
}

main().catch((err) => {
  console.error("✗ Seed failed:", err.message);
  process.exit(1);
});
