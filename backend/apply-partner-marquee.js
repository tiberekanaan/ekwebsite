/**
 * Fills the homepage funding-partners logo strip, idempotently. The strip
 * shows partners whose role is funder, government or partner AND
 * consent_to_name is true; some of ours were missing:
 *
 *   - Irish Aid and Oxfam (role funder) and American Council for International
 *     Education Kiribati (role partner — needs the `partner` enum value
 *     deployed first): no partner entries existed. Creates each (its role,
 *     consent true) with its logo from src/seed/assets/, uploaded once
 *     and looked up by file name. If an entry already exists, only its unset
 *     logo / role / consent are filled.
 *   - Volunteer Service Abroad, New Zealand High Commission and the Ministry
 *     for Women, Youth, Sports & Social Affairs: logos replaced with tightly
 *     cropped user-supplied PNGs; each skipped once its file is attached.
 *   - "US Embassy Suva" (has the logo, linked to American Space Program) and
 *     "American Spaces": role was unset → set to funder (only while unset).
 *   - "U.S. Embassy Suva" (with full stops): an unused duplicate — no logo,
 *     consent false, linked to nothing. Deleted, but only while it still has
 *     no logo and no programme links of either kind (user-approved 2026-11-26;
 *     it reappeared, deletion re-approved the same day).
 *
 * A plain REST write on this Strapi publishes directly; the publish webhook
 * then rebuilds Vercel. Defaults to local dev (backend/.env). For production,
 * pass a Strapi Cloud full-access API token explicitly and delete it after:
 *
 *   node apply-partner-marquee.js
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-partner-marquee.js
 */

const fs = require("fs");
const path = require("path");

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const ASSETS = path.join(__dirname, "src", "seed", "assets");

const NEW_PARTNERS = [
  {
    name: "Irish Aid",
    file: "irish-aid-logo.png",
    alt: "Government of Ireland, International Development Programme (Irish Aid)",
  },
  { name: "Oxfam", file: "oxfam-logo.png", alt: "Oxfam" },
  {
    name: "American Council for International Education Kiribati",
    file: "acie-kiribati-logo.jpg",
    alt: "American Council for International Education Kiribati",
    role: "partner",
  },
];

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };

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

async function api(headers, method, url, body) {
  const res = await fetch(`${STRAPI_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${url} ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function findPartner(headers, name) {
  const q = `/api/partners?filters[name][$eq]=${encodeURIComponent(name)}&populate[logo]=true&populate[projects]=true`;
  const { data } = await api(headers, "GET", q);
  if (data.length > 1) throw new Error(`More than one partner named "${name}" — resolve in the admin first.`);
  return data[0] ?? null;
}

async function ensureLogo(headers, file, alt) {
  const { Authorization } = headers;
  const found = await fetch(
    `${STRAPI_URL}/api/upload/files?filters[name][$eq]=${encodeURIComponent(file)}`,
    { headers: { Authorization } },
  );
  if (!found.ok) throw new Error(`GET upload/files ${found.status}: ${await found.text()}`);
  const files = await found.json();
  if (files.length > 0) {
    console.log(`${file} already uploaded (id ${files[0].id}).`);
    return files[0].id;
  }
  const form = new FormData();
  form.append("files", new Blob([fs.readFileSync(path.join(ASSETS, file))], { type: MIME[path.extname(file)] }), file);
  form.append("fileInfo", JSON.stringify({ name: file, alternativeText: alt }));
  const up = await fetch(`${STRAPI_URL}/api/upload`, { method: "POST", headers: { Authorization }, body: form });
  if (!up.ok) throw new Error(`POST upload ${up.status}: ${await up.text()}`);
  const [uploaded] = await up.json();
  console.log(`${file} uploaded (id ${uploaded.id}).`);
  return uploaded.id;
}

async function ensureNewPartner(headers, { name, file, alt, role = "funder" }) {
  const existing = await findPartner(headers, name);
  const logoId = existing?.logo ? null : await ensureLogo(headers, file, alt);
  if (!existing) {
    await api(headers, "POST", "/api/partners", {
      data: { name, role, consent_to_name: true, logo: logoId },
    });
    console.log(`Created partner "${name}" (${role}, consent, logo).`);
    return;
  }
  const patch = {};
  if (logoId) patch.logo = logoId;
  if (!existing.role) patch.role = role;
  if (existing.consent_to_name !== true) patch.consent_to_name = true;
  if (Object.keys(patch).length === 0) {
    console.log(`"${name}" already complete.`);
    return;
  }
  await api(headers, "PUT", `/api/partners/${existing.documentId}`, { data: patch });
  console.log(`Updated "${name}": ${Object.keys(patch).join(", ")}.`);
}

// Existing partners whose uploaded logos carried wide margins (rendered tiny
// in the strip), replaced with tightly cropped user-supplied versions.
const LOGO_REPLACEMENTS = [
  { name: "Volunteer Service Abroad", file: "vsa-logo.png", alt: "Volunteer Service Abroad, Te Tūao Tāwāhi" },
  { name: "New Zealand High Commission", file: "nzhc-logo.png", alt: "New Zealand High Commission, Te Aka Aorere" },
  {
    name: "Ministry for Women, Youth, Sports & Social Affairs",
    file: "mwyssa-logo.png",
    alt: "Ministry of Women, Youth, Sport and Social Affairs, Republic of Kiribati",
  },
];

async function replaceLogo(headers, { name, file, alt }) {
  const p = await findPartner(headers, name);
  if (!p) {
    console.log(`"${name}" not found — skipped.`);
    return;
  }
  if (p.logo?.name === file) {
    console.log(`"${name}" already has ${file}.`);
    return;
  }
  const logoId = await ensureLogo(headers, file, alt);
  await api(headers, "PUT", `/api/partners/${p.documentId}`, { data: { logo: logoId } });
  console.log(`Replaced "${name}" logo with ${file}.`);
}

async function ensureRole(headers, name) {
  const p = await findPartner(headers, name);
  if (!p) {
    console.log(`"${name}" not found — skipped.`);
    return;
  }
  if (p.role) {
    console.log(`"${name}" already has role ${p.role}.`);
    return;
  }
  await api(headers, "PUT", `/api/partners/${p.documentId}`, { data: { role: "funder" } });
  console.log(`Set "${name}" role → funder.`);
}

async function removeDuplicateEmbassy(headers) {
  const name = "U.S. Embassy Suva";
  const dup = await findPartner(headers, name);
  if (!dup) {
    console.log(`Duplicate "${name}" already gone.`);
    return;
  }
  // Also check the per-programme partner_links component, which the
  // partner's own `projects` relation does not see.
  const { data: programmes } = await api(
    headers,
    "GET",
    "/api/projects?populate[partner_links][populate][partner]=true&pagination[pageSize]=100",
  );
  const linked = programmes.some((pr) =>
    (pr.partner_links ?? []).some((l) => l.partner?.documentId === dup.documentId),
  );
  if (dup.logo || (dup.projects ?? []).length > 0 || linked) {
    console.log(`"${name}" now has a logo or programme links — not deleting; resolve in the admin.`);
    return;
  }
  await api(headers, "DELETE", `/api/partners/${dup.documentId}`);
  console.log(`Deleted unused duplicate "${name}".`);
}

async function main() {
  const token = readEnvToken();
  if (!token) throw new Error("No STRAPI_API_TOKEN available");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  for (const partner of NEW_PARTNERS) await ensureNewPartner(headers, partner);
  for (const r of LOGO_REPLACEMENTS) await replaceLogo(headers, r);
  await ensureRole(headers, "US Embassy Suva");
  await ensureRole(headers, "American Spaces");
  await removeDuplicateEmbassy(headers);
  console.log(`Done against ${STRAPI_URL}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
