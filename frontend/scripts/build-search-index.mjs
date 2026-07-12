// Builds the Pagefind search index after `astro build`.
// Indexes the static HTML in dist/client and writes the index both there
// (for local preview / dev serving) and into .vercel/output/static (what
// Vercel actually serves in production — the old `pagefind --site dist/client`
// postbuild never reached it, so live search was dead).
import { existsSync } from 'node:fs';
import * as pagefind from 'pagefind';

const SITE_DIR = 'dist/client';
const VERCEL_STATIC_DIR = '.vercel/output/static';

if (!existsSync(SITE_DIR)) {
  console.error(`[pagefind] ${SITE_DIR} not found — run \`astro build\` first.`);
  process.exit(1);
}

const { index } = await pagefind.createIndex();
const { errors, page_count: pageCount } = await index.addDirectory({ path: SITE_DIR });

if (errors.length > 0) {
  console.error('[pagefind] indexing errors:', errors);
  process.exit(1);
}

await index.writeFiles({ outputPath: `${SITE_DIR}/pagefind` });

if (existsSync(VERCEL_STATIC_DIR)) {
  await index.writeFiles({ outputPath: `${VERCEL_STATIC_DIR}/pagefind` });
}

await pagefind.close();
console.log(
  `[pagefind] indexed ${pageCount} pages → ${SITE_DIR}/pagefind` +
    (existsSync(VERCEL_STATIC_DIR) ? ` + ${VERCEL_STATIC_DIR}/pagefind` : ''),
);
