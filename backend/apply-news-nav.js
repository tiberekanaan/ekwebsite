/**
 * Adds the "News" link to the Global single type's navigation, idempotently:
 *
 *   - navbarLinks: inserted directly after the "Our Work" entry (or appended
 *     when there is no such entry), unless a /news link already exists.
 *   - footerColumns: inserted before "Blog" in the "Learn" column (or appended
 *     to that column), unless a /news link already exists there.
 *
 * Needed because production stores its own nav arrays, so the frontend's
 * hard-coded defaults (which now include News) never surface there. Both
 * arrays are PUT back whole — a partial PUT would drop the other links.
 * Safe to re-run: a second run reports "already present" and writes nothing.
 * Defaults to local dev (backend/.env). For production, pass a Strapi Cloud
 * write-capable API token explicitly and delete it afterwards:
 *
 *   node apply-news-nav.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-news-nav.js
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const NEWS_LINK = { label: "News", url: "/news" };

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

// Strip Strapi's bookkeeping so the component arrays can be PUT back verbatim.
const cleanLink = ({ label, url }) => ({ label, url });
const isNews = (link) => link.url === NEWS_LINK.url;

function withNavbarNews(links) {
  const clean = links.map(cleanLink);
  if (clean.some(isNews)) return null;
  const after = clean.findIndex((l) => /our work/i.test(l.label) || l.url === "/our-programs");
  clean.splice(after === -1 ? clean.length : after + 1, 0, NEWS_LINK);
  return clean;
}

function withFooterNews(columns) {
  const clean = columns.map(({ heading, links }) => ({
    heading,
    links: (links ?? []).map(cleanLink),
  }));
  if (clean.some((col) => col.links.some(isNews))) return null;
  let learn = clean.find((col) => /learn/i.test(col.heading));
  if (!learn) {
    learn = { heading: "Learn", links: [] };
    clean.push(learn);
  }
  const before = learn.links.findIndex((l) => l.url === "/blog");
  learn.links.splice(before === -1 ? learn.links.length : before, 0, NEWS_LINK);
  return clean;
}

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(
    `${STRAPI_URL}/api/global?populate[navbarLinks]=true&populate[footerColumns][populate]=*`,
    { headers },
  );
  if (!res.ok) throw new Error(`GET global ${res.status}: ${await res.text()}`);
  const { data: global } = await res.json();
  if (!global) throw new Error("Global single type has no published entry");

  const patch = {};
  const navbar = global.navbarLinks ?? [];
  const footer = global.footerColumns ?? [];

  // Empty arrays mean the frontend defaults (which include News) apply —
  // leave them empty rather than freezing a copy of the defaults in the CMS.
  if (navbar.length > 0) {
    const next = withNavbarNews(navbar);
    if (next) patch.navbarLinks = next;
    else console.log("navbarLinks: News already present.");
  } else {
    console.log("navbarLinks: unset — frontend defaults apply, nothing to do.");
  }
  if (footer.length > 0) {
    const next = withFooterNews(footer);
    if (next) patch.footerColumns = next;
    else console.log("footerColumns: News already present.");
  } else {
    console.log("footerColumns: unset — frontend defaults apply, nothing to do.");
  }

  if (Object.keys(patch).length === 0) {
    console.log("Nothing to write.");
    return;
  }

  const put = await fetch(`${STRAPI_URL}/api/global`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: patch }),
  });
  if (!put.ok) throw new Error(`PUT global ${put.status}: ${await put.text()}`);
  console.log(
    `Global updated (${Object.keys(patch).join(", ")}) at ${STRAPI_URL}. Publish Global in the admin if the PUT left it as a draft.`,
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
