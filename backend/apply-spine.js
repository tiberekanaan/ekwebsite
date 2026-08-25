/**
 * One-off data migration for the content spine:
 *  - maps the legacy programme status "on-going" to "running"
 *  - sets each programme's new `strategy` (manyToOne) from the first entry of
 *    the deprecated `pillars` M2M when strategy is not yet set
 *
 * Idempotent: programmes already migrated are skipped. Requires the spine
 * schema (activity type, strategy relation, new status enum) to be live on
 * the target Strapi first.
 *
 * Defaults to local dev (backend/.env). For production:
 *
 *   STRAPI_URL=https://determined-strength-17a6de9eef.strapiapp.com STRAPI_API_TOKEN=xxx node apply-spine.js
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
    `${STRAPI_URL}/api/projects?populate[pillars]=true&populate[strategy]=true&pagination[pageSize]=100`,
    { headers },
  );
  if (!res.ok) throw new Error(`GET projects ${res.status}\n${await res.text()}`);
  const { data: projects } = await res.json();

  let changed = 0;
  for (const p of projects) {
    const data = {};
    if (p.project_status === "on-going") data.project_status = "running";
    if (!p.strategy && p.pillars?.length > 0) data.strategy = p.pillars[0].documentId;

    if (Object.keys(data).length === 0) {
      console.log(`- ${p.title}: already migrated`);
      continue;
    }
    const putRes = await fetch(`${STRAPI_URL}/api/projects/${p.documentId}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!putRes.ok) throw new Error(`PUT ${p.title} ${putRes.status}\n${await putRes.text()}`);
    console.log(`✓ ${p.title}: ${Object.keys(data).join(", ")} updated`);
    changed++;
  }
  console.log(`Done — ${changed} of ${projects.length} programmes updated.`);
}

main().catch((err) => {
  console.error("✗ Migration failed:", err.message);
  process.exit(1);
});
