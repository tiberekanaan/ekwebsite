import { existsSync, createReadStream } from 'node:fs';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, envField, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Dev only: re-runs the Strapi content loaders when admin edits are detected,
// so saved entries show up on the next browser refresh without restarting the
// server. Refreshing unconditionally would force a full page reload in the
// browser on every tick, so we poll a cheap fingerprint (entry count + latest
// updatedAt per collection) and only re-sync when it changes.
const STRAPI_COLLECTIONS = [
  'blogs',
  'events',
  'resources',
  'partners',
  'projects',
  'activities',
  'pillars',
  'testimonials',
  'news-updates',
];

let strapiRefreshTimer;

const strapiAutoRefresh = {
  name: 'strapi-auto-refresh',
  hooks: {
    'astro:server:setup'({ refreshContent }) {
      const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
      let lastFingerprint;
      // clear any timer from a previous in-process config reload — leaked
      // intervals keep refreshing (and reloading the page) forever
      clearInterval(strapiRefreshTimer);
      strapiRefreshTimer = setInterval(async () => {
        try {
          const parts = await Promise.all(
            STRAPI_COLLECTIONS.map(async (name) => {
              const res = await fetch(
                `${strapiUrl}/api/${name}?fields[0]=updatedAt&sort[0]=updatedAt:desc&pagination[pageSize]=1`,
              );
              if (!res.ok) return `${name}:${res.status}`;
              const { data, meta } = await res.json();
              return `${name}:${meta?.pagination?.total}:${data?.[0]?.updatedAt ?? ''}`;
            }),
          );
          const fingerprint = parts.join('|');
          // skip the refresh on the first tick — startup already synced
          if (lastFingerprint !== undefined && fingerprint !== lastFingerprint) {
            await refreshContent?.();
          }
          lastFingerprint = fingerprint;
        } catch {
          // Strapi may be down or restarting; retry on the next tick
        }
      }, 10_000);
      strapiRefreshTimer.unref?.();
    },
    'astro:server:done'() {
      clearInterval(strapiRefreshTimer);
    },
  },
};

// Dev only: Pagefind indexes built HTML, so `astro dev` normally has no search.
// On server start we (re)build the index from the last `dist/client` build and
// serve `/pagefind/*` from it, so search works in dev with the latest built
// content. Run `npm run build` once (or after big content changes) to refresh.
const CLIENT_DIR = fileURLToPath(new URL('./dist/client', import.meta.url));

const PAGEFIND_MIME = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

const pagefindDev = {
  name: 'pagefind-dev',
  hooks: {
    'astro:server:setup'({ server, logger }) {
      // Rebuild the index from the last build (fire-and-forget; ~1s).
      (async () => {
        if (!existsSync(join(CLIENT_DIR, 'index.html'))) return;
        try {
          const pagefind = await import('pagefind');
          const { index } = await pagefind.createIndex();
          const { page_count: pageCount } = await index.addDirectory({ path: CLIENT_DIR });
          await index.writeFiles({ outputPath: join(CLIENT_DIR, 'pagefind') });
          await pagefind.close();
          logger.info(`pagefind: dev search index ready (${pageCount} pages from last build)`);
        } catch (err) {
          logger.warn(`pagefind: could not build dev index — ${err.message}`);
        }
      })();

      server.middlewares.use('/pagefind', (req, res, next) => {
        const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const file = normalize(join(CLIENT_DIR, 'pagefind', pathname));
        if (!file.startsWith(join(CLIENT_DIR, 'pagefind')) || !existsSync(file)) return next();
        res.statusCode = 200;
        res.setHeader('Content-Type', PAGEFIND_MIME[extname(file)] ?? 'application/octet-stream');
        if (req.method === 'HEAD') return res.end();
        createReadStream(file).pipe(res);
      });
    },
  },
};

export default defineConfig({
  site: process.env.SITE_URL || 'https://empower.org.ki',

  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      STRAPI_URL: envField.string({
        context: 'server',
        access: 'public',
        default: 'http://localhost:1337',
      }),
      STRAPI_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      STRAPI_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      EMAIL_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      PUBLIC_GA_MEASUREMENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      CONTACT_FORM_ENDPOINT: envField.string({ context: 'server', access: 'secret', optional: true }),
      NEWSLETTER_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      GOOGLE_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
      BING_SITE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_GOOGLE_MAPS_API_KEY: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
      PUBLIC_CONSENT_ENABLED: envField.boolean({ context: 'client', access: 'public', optional: true, default: false }),
      PUBLIC_PRIVACY_POLICY_URL: envField.string({ context: 'client', access: 'public', optional: true, default: '' }),
    },
  },

  image: {
    layout: 'constrained',
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Ubuntu',
      cssVariable: '--font-ubuntu',
      weights: [400, 500, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Saira Condensed',
      cssVariable: '--font-saira',
      weights: [500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Playfair Display',
      cssVariable: '--font-playfair',
      weights: [500, 600, 700, 800],
    },
  ],

  adapter: vercel(),

  // Old routes from before the programme/strategy restructure; keeps
  // published links alive. Activities and strategies get no URLs of their own.
  redirects: {
    '/projects/[slug]': '/our-programs/[slug]',
  },

  integrations: [
    react(),
    mdx(),
    sitemap(),
    strapiAutoRefresh,
    pagefindDev,
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  security: {
    checkOrigin: true,
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

});
