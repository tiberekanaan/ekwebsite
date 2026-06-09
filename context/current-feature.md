## Current Feature

Empower Kiribati landing page (`/`) — bespoke marketing layout that replaces the Velocity demo home.

## Status

Implemented locally on `main` (no branch yet). `npm run build` passes. Not committed.

## Goals

- New brand-aligned Header (logo "EMPOWER Kiribati", nav: About / Our Work / Resources / Blog / Events / Contact, CTA "Build Your Skills").
- "The Future" hero with 2x2 values grid, image placeholder + 3 overlay stat boxes.
- "Our Work" four-pillar card grid.
- "Our Impact" three-stat card grid.
- Latest Events + Latest News (from Strapi via `getCollection`, up to 3 each).
- Responsive (single column on mobile).

## Notes

- New components live under `src/components/empower/` to keep them separate from Velocity's reusable library.
- Brand palette uses standard Tailwind utilities (slate / teal / lime) rather than Velocity's semantic tokens — the existing design tokens didn't match the design.
- Image placeholders are gradient `<div>`s; replace with real `<img>` / `<Image>` once assets are available.
- Mobile hamburger toggle uses a small inline script (no extra framework component needed).

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-06-09 — **Scaffolded Strapi 5 backend** (`backend/`). Strapi 5.47.1, TypeScript, SQLite. Installed `fnm`, pinned Node 22 via `.node-version` (Strapi 5 rejects Node 25). Branch `feature/strapi-scaffold` merged ff to `main` (commit `7b3408a`) and deleted.
- 2026-06-09 — **Added four Strapi 5 content types** (`event`, `blog`, `basic-page`, `web-form`) directly under `backend/src/api/` (no branch — committed straight to `main` as `d04b806` during the catch-up).
- 2026-06-09 — **Scaffolded Velocity Astro 6 frontend** (`frontend/`) from `southwellmedia/velocity`, npm-installed under Node 22, wired `src/content.config.ts` to Strapi via Content Loader API async loaders (mapping `documentId` → Astro `id`), lifted Strapi base URL into `astro:env` as `STRAPI_URL`, added `marked` for richtext rendering, built blog + events list/detail pages, removed Velocity's local-markdown `[...slug].astro`. Committed straight to `main` as `aeb3313` during the catch-up.
- 2026-06-09 — **Contact form via Astro Actions → Strapi `web-form`**. Added `src/actions/index.ts` with `contact.submit` (Zod 4 input using `z.email()`, honeypot, `ActionError` on Strapi failure, optional `STRAPI_TOKEN` bearer). Rewrote `src/pages/contact.astro` to use `action={actions.contact.submit}` with `isInputError()` for field-level errors and `prerender = false`. Switched site to hybrid via `@astrojs/node` adapter (standalone) — bumped `astro` to `^6.4.5`. Deleted the old `/api/contact.ts` stub. Branch `feature/web-form-action` merged ff to `main` and deleted.
