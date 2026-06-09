## Current Feature

None

## Status

—

## Goals

—

## Notes

—

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-06-09 — **Scaffolded Strapi 5 backend** (`backend/`). Strapi 5.47.1, TypeScript, SQLite. Installed `fnm`, pinned Node 22 via `.node-version` (Strapi 5 rejects Node 25). Branch `feature/strapi-scaffold` merged ff to `main` (commit `7b3408a`) and deleted.
- 2026-06-09 — **Added four Strapi 5 content types** (`event`, `blog`, `basic-page`, `web-form`) directly under `backend/src/api/` (no branch — committed straight to `main` as `d04b806` during the catch-up).
- 2026-06-09 — **Scaffolded Velocity Astro 6 frontend** (`frontend/`) from `southwellmedia/velocity`, npm-installed under Node 22, wired `src/content.config.ts` to Strapi via Content Loader API async loaders (mapping `documentId` → Astro `id`), lifted Strapi base URL into `astro:env` as `STRAPI_URL`, added `marked` for richtext rendering, built blog + events list/detail pages, removed Velocity's local-markdown `[...slug].astro`. Committed straight to `main` as `aeb3313` during the catch-up.
- 2026-06-09 — **Contact form via Astro Actions → Strapi `web-form`**. Added `src/actions/index.ts` with `contact.submit` (Zod 4 input using `z.email()`, honeypot, `ActionError` on Strapi failure, optional `STRAPI_TOKEN` bearer). Rewrote `src/pages/contact.astro` to use `action={actions.contact.submit}` with `isInputError()` for field-level errors and `prerender = false`. Switched site to hybrid via `@astrojs/node` adapter (standalone) — bumped `astro` to `^6.4.5`. Deleted the old `/api/contact.ts` stub. Branch `feature/web-form-action` merged ff to `main` and deleted.
- 2026-06-09 — **Empower Kiribati landing page**. Replaced the Velocity demo home with brand-specific components under `frontend/src/components/empower/` (Header, Hero "The Future", OurWork four-pillar grid, Impact three-stat grid, LatestEvents + LatestNews pulling top 3 from Strapi via `getCollection`). Uses standard Tailwind v4 utilities (slate / teal / lime); image placeholders are gradient divs pending real assets. Branch `feature/empower-landing` ff-merged to `main` (commit `639d7aa`) and deleted.
- 2026-06-09 — **Resource content type + frontend pages**. Strapi: three components under `backend/src/components/content-blocks/` (`video.url`, `download.file`, `article.external_link`) and a new `resource` collection (`title`, `description`, `content_blocks` dynamic zone, Draft & Publish on) under `backend/src/api/resource/`. Frontend: `resources` collection in `content.config.ts` (Zod 4 discriminated union over `__component`), populate via `?populate[content_blocks][populate]=*`. Pages: `src/pages/resources/index.astro` (card grid) and `src/pages/resources/[id].astro` (getStaticPaths with string ids, switch over `__component` to render iframe/Watch Video, Download File, and Read External Article cards). Branch `feature/resource-content-type` ff-merged to `main` (commit `b416eb3`) and deleted.
