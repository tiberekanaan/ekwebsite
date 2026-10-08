/**
 * Seeds the first three News Updates (April–October 2026 stories) and the
 * shared placeholder photo, idempotently:
 *
 *   - Uploads src/seed/assets/news-placeholder.jpg once (looked up by name)
 *     and attaches it to every entry as the photo — replace it per entry in
 *     the admin when a real photo is available.
 *   - Creates each entry only when no entry with its slug exists (draft or
 *     published), so re-running never duplicates or clobbers admin edits.
 *   - A plain REST POST on this Strapi publishes immediately (verified), so
 *     the entries go live on creation; the publish webhook then rebuilds
 *     Vercel — which is the point.
 *
 * Needs the news-section schema (slug field) deployed; 400s with a clear
 * message otherwise. Defaults to local dev (backend/.env). For production,
 * pass a Strapi Cloud full-access API token explicitly and delete it after:
 *
 *   node apply-news-items.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-news-items.js
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const PLACEHOLDER = path.join(__dirname, "src", "seed", "assets", "news-placeholder.jpg");

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

// Source: ~/Downloads/empower-kiribati-news-items-oct-2026.md. Copy verbatim
// apart from dropping the "Tarawa, <month>" dateline (the date field carries
// it). The source gives months only, so the day of each date is a placeholder
// — adjust in the admin if a precise date matters.
const NEWS_ITEMS = [
  {
    slug: "irish-aid-backs-ara-bikemarawa-rerei-campaign",
    title: "Irish Aid backs Empower Kiribati's support for the Ara BikeMarawa Rerei campaign",
    date: "2026-10-07",
    summary:
      "Support under Irish Aid's In Country Micro-Projects Scheme lets Empower Kiribati work alongside the Environment and Conservation Division on the Ara BikeMarawa Rerei shoreline campaign, starting with a workshop for local shoreline champions.",
    content: `Empower Kiribati has received support from Irish Aid under its In Country Micro-Projects Scheme (ICMPS), and the new project will let the organisation work directly alongside the Environment and Conservation Division (ECD) of the Ministry of Environment, Lands and Agriculture Development on the Ara BikeMarawa Rerei (ABM) campaign, which ECD leads as part of its ongoing effort to keep Kiribati's shorelines clean.

The partnership moved from paper to practice within days of the announcement, when Empower Kiribati and ECD brought local group leaders and shoreline champions together for an opening workshop at which participants explored how communities can strengthen the campaign on their own stretches of coast. Because the people best placed to change habits on a beach are the ones who live beside it, the project will rely on these local champions to raise awareness and carry the work back into their villages, with the wider aim of a cleaner environment that protects biodiversity and supports healthier living.

The support fits Irish Aid's focus on long-term programmes that tackle environmental challenges and reach the communities furthest behind first. Empower Kiribati thanks Irish Aid, the Environment and Conservation Division and every leader who joined the first workshop, and will share further updates as the campaign develops.`,
  },
  {
    slug: "uuti-sessions-open-exchange-opportunities",
    title: "UUTI sessions open a door to exchange opportunities for Kiribati youth",
    date: "2026-09-30",
    summary:
      "A series of sessions, backed by the U.S. Embassy Suva and delivered with American Councils for International Education Kiribati, introduced young people to the UUTI exchange programme and how to apply.",
    content: `Over late August and September, Empower Kiribati ran a series of sessions introducing young people to UUTI, short for *Uaiakinan ao Uarokoan Toronibwaia I-Kiribati*, an exchange activity that prepares Kiribati youth for the wider world by building their work-readiness, ICT and English language skills.

The first two sessions were facilitated by the UUTI Coordinator, who walked participants through the programme's goals and the experiences it offers, while a UUTI alumnus currently spending time in the United States through the programme shared what the learning, cultural exchange and personal growth have meant to them. Hearing from someone living the programme firsthand gave participants a far clearer picture than a brochure could, and it left room for the practical questions that young people and their families tend to ask before committing to an application.

In September the sessions travelled to students at SHC, where participants learned about eligibility requirements, the application process and the experiences of former participants. News of that session reached close to ten thousand people on Facebook, one of the widest audiences an Empower Kiribati programme post has drawn this year, which suggests that interest in international study and exchange among Kiribati youth runs deep.

The series was made possible by the U.S. Embassy Suva and delivered in collaboration with American Councils for International Education Kiribati. More information is available at [americancouncils.org](https://www.americancouncils.org).`,
  },
  {
    slug: "empowering-communities-workshops-reach-community-leaders",
    title: "Empowering Communities workshops reach civil society, faith-based and community leaders",
    date: "2026-07-31",
    summary:
      "Three two-day rounds of the Empowering Community Leadership workshop, funded through the New Zealand High Commission, brought leadership, digital literacy and financial literacy skills to civil society, faith-based and community organisation leaders.",
    content: `Between June and July, Empower Kiribati delivered three rounds of its Empowering Community Leadership workshop, a two-day programme funded through the New Zealand High Commission to Kiribati that equips local leaders with practical skills in leadership, digital literacy and financial literacy.

Each round was built for a different group of leaders, so that the training spoke to the realities of their work:

- **Civil society organisation leaders** met on 18 and 19 June at the Seminary and Institute Lounge (LDS) in Teaoraereke.
- **Faith-based organisation leaders** met on 7 and 8 July at the LDS venue in Bwangantebure, offered by The Church of Jesus Christ of Latter-day Saints.
- **Community-based organisation leaders** met on 30 and 31 July at the YCL Boardroom in Antebuka.

On the first day, participants worked on strategic leadership, communication and advocacy grounded in community voice, and then turned to digital tools that can make their organisations more efficient and extend their outreach, with particular attention to staying safe online and protecting organisational accounts and information. The second day focused on financial literacy, tracing how real financial stability is built step by step from strategy and budgeting through fundraising, record-keeping and reporting, and helping leaders recognise the quiet financial patterns that can hold organisations and communities back over time. For church leaders, the sessions also explored how stewardship, transparency and sound budgeting sustain faith-based organisations into the future.

Empower Kiribati thanks the New Zealand High Commission for investing in community leaders, the LDS Church for its venues, and every leader who took part and shared openly across the six days.`,
  },
];

async function ensurePlaceholder(headers) {
  const name = path.basename(PLACEHOLDER);
  const existing = await fetch(
    `${STRAPI_URL}/api/upload/files?filters[name][$eq]=${encodeURIComponent(name)}`,
    { headers },
  );
  if (!existing.ok) throw new Error(`GET upload/files ${existing.status}: ${await existing.text()}`);
  const files = await existing.json();
  if (Array.isArray(files) && files.length > 0) {
    console.log(`Placeholder photo already uploaded (id ${files[0].id}).`);
    return files[0].id;
  }
  const form = new FormData();
  form.append("files", new Blob([fs.readFileSync(PLACEHOLDER)], { type: "image/jpeg" }), name);
  form.append(
    "fileInfo",
    JSON.stringify({ alternativeText: "", caption: "Placeholder — replace with a photo of the event" }),
  );
  const up = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: headers.Authorization },
    body: form,
  });
  if (!up.ok) throw new Error(`POST upload ${up.status}: ${await up.text()}`);
  const [file] = await up.json();
  console.log(`Placeholder photo uploaded (id ${file.id}).`);
  return file.id;
}

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Probe the slug field first so a pre-schema-deploy run fails clearly.
  const probe = await fetch(`${STRAPI_URL}/api/news-updates?fields[0]=slug&status=draft`, { headers });
  if (probe.status === 400) {
    throw new Error(
      `The news-update slug field is not in the deployed schema at ${STRAPI_URL} yet — re-run after the schema deploy.`,
    );
  }
  if (!probe.ok) throw new Error(`GET news-updates ${probe.status}: ${await probe.text()}`);

  const photo = await ensurePlaceholder(headers);

  for (const item of NEWS_ITEMS) {
    const found = await fetch(
      `${STRAPI_URL}/api/news-updates?filters[slug][$eq]=${encodeURIComponent(item.slug)}&status=draft&fields[0]=slug`,
      { headers },
    );
    if (!found.ok) throw new Error(`GET news-updates ${found.status}: ${await found.text()}`);
    const { data } = await found.json();
    if (data.length > 0) {
      console.log(`Skip (exists): ${item.slug}`);
      continue;
    }
    const created = await fetch(`${STRAPI_URL}/api/news-updates`, {
      method: "POST",
      headers,
      body: JSON.stringify({ data: { ...item, photo } }),
    });
    if (!created.ok) throw new Error(`POST news-updates ${created.status}: ${await created.text()}`);
    const { data: entry } = await created.json();
    console.log(`Created: ${item.slug} (${entry.documentId}, ${entry.publishedAt ? "published" : "draft"})`);
  }
  console.log(`Done against ${STRAPI_URL}.`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
