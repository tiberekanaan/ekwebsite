/**
 * One-off data migration for per-programme partner roles:
 *  - copies each programme's legacy `partners` M2M into the new
 *    `partner_links` repeatable component, defaulting every copied link's
 *    role to "funder" (adjust to co_implementer in the admin afterwards)
 *
 * Idempotent: programmes that already have partner_links are skipped, so
 * admin edits are never clobbered. Requires the programme-partner component
 * schema to be live on the target Strapi first (a 400 on the populate keys
 * means the schema has not deployed yet — rerun after the deploy).
 *
 * Defaults to local dev (backend/.env). For production:
 *
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-partner-roles.js
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

async function main() {
  const token = readEnvToken();
  if (!token) {
    throw new Error("STRAPI_API_TOKEN missing. Add a write-capable token to backend/.env.");
  }
  const headers = { Authorization: `Bearer ${token}` };

  const res = await fetch(
    `${STRAPI_URL}/api/projects?populate[partners]=true&populate[partner_links][populate][partner]=true&pagination[pageSize]=100`,
    { headers },
  );
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 400) {
      throw new Error(
        `GET projects 400 — the partner_links schema is probably not deployed yet. Rerun after the Strapi deploy.\n${body}`,
      );
    }
    throw new Error(`GET projects ${res.status}\n${body}`);
  }
  const { data: projects } = await res.json();

  let changed = 0;
  for (const p of projects) {
    if ((p.partner_links ?? []).length > 0) {
      console.log(`- ${p.title}: partner_links already set (${p.partner_links.length})`);
      continue;
    }
    if ((p.partners ?? []).length === 0) {
      console.log(`- ${p.title}: no partners to migrate`);
      continue;
    }
    const partner_links = p.partners.map((partner) => ({
      partner: { connect: [partner.documentId] },
      partner_role: "funder",
    }));
    const putRes = await fetch(`${STRAPI_URL}/api/projects/${p.documentId}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ data: { partner_links } }),
    });
    if (!putRes.ok) throw new Error(`PUT ${p.title} ${putRes.status}\n${await putRes.text()}`);
    console.log(
      `✓ ${p.title}: ${partner_links.length} partner link(s) created as funder — ${p.partners
        .map((x) => x.name)
        .join(", ")}`,
    );
    changed++;
  }
  console.log(`Done — ${changed} of ${projects.length} programmes updated.`);
}

main().catch((err) => {
  console.error("✗ Migration failed:", err.message);
  process.exit(1);
});
