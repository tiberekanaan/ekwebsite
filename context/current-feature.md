## Current Feature

**Feature:** Build "Our Partners" and "Our Programs" Relational Architecture

## Status

Completed

## Goals
1. **Backend (Strapi):** Create two new collection types: `Partner` and `Project`. Create a many-to-many relation between them so a Partner can have many Projects, and a Project can have many Partners. 
2. **Frontend (Astro):** Update `src/content.config.ts` to fetch both `partners` and `projects` collections. Ensure the fetch URL includes `?populate=*` so Strapi 5 returns the linked relational data.
3. **UI (Astro):** 
   - Build `src/pages/our-partners/index.astro` to display a custom grid of partners.
   - Build a dynamic route `src/pages/our-partners/[id].astro` that displays the partner's details and lists their associated projects.
   - Build `src/pages/our-programs/index.astro` to display a list of all projects.

## Notes

- `BaseLayout` continues to own the `<html>` shell, SEO, schemas, analytics, ClientRouter, and the skip-to-content link via its `header` / `footer` / default slots. `Layout` is a thin wrapper that picks the empower chrome.
- Static pages (`about.astro`, `contact.astro`, `404.astro`) intentionally stay on `BaseLayout` for now — out of scope per the request.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-06-09 — **Scaffolded Strapi 5 backend** (`backend/`). Strapi 5.47.1, TypeScript, SQLite. Installed `fnm`, pinned Node 22 via `.node-version` (Strapi 5 rejects Node 25). Branch `feature/strapi-scaffold` merged ff to `main` (commit `7b3408a`) and deleted.
- 2026-06-09 — **Added four Strapi 5 content types** (`event`, `blog`, `basic-page`, `web-form`) directly under `backend/src/api/` (no branch — committed straight to `main` as `d04b806` during the catch-up).
- 2026-06-09 — **Scaffolded Velocity Astro 6 frontend** (`frontend/`) from `southwellmedia/velocity`, npm-installed under Node 22, wired `src/content.config.ts` to Strapi via Content Loader API async loaders (mapping `documentId` → Astro `id`), lifted Strapi base URL into `astro:env` as `STRAPI_URL`, added `marked` for richtext rendering, built blog + events list/detail pages, removed Velocity's local-markdown `[...slug].astro`. Committed straight to `main` as `aeb3313` during the catch-up.
- 2026-06-09 — **Contact form via Astro Actions → Strapi `web-form`**. Added `src/actions/index.ts` with `contact.submit` (Zod 4 input using `z.email()`, honeypot, `ActionError` on Strapi failure, optional `STRAPI_TOKEN` bearer). Rewrote `src/pages/contact.astro` to use `action={actions.contact.submit}` with `isInputError()` for field-level errors and `prerender = false`. Switched site to hybrid via `@astrojs/node` adapter (standalone) — bumped `astro` to `^6.4.5`. Deleted the old `/api/contact.ts` stub. Branch `feature/web-form-action` merged ff to `main` and deleted.
- 2026-06-09 — **Empower Kiribati landing page**. Replaced the Velocity demo home with brand-specific components under `frontend/src/components/empower/` (Header, Hero "The Future", OurWork four-pillar grid, Impact three-stat grid, LatestEvents + LatestNews pulling top 3 from Strapi via `getCollection`). Uses standard Tailwind v4 utilities (slate / teal / lime); image placeholders are gradient divs pending real assets. Branch `feature/empower-landing` ff-merged to `main` (commit `639d7aa`) and deleted.
- 2026-06-09 — **Resource content type + frontend pages**. Strapi: three components under `backend/src/components/content-blocks/` (`video.url`, `download.file`, `article.external_link`) and a new `resource` collection (`title`, `description`, `content_blocks` dynamic zone, Draft & Publish on) under `backend/src/api/resource/`. Frontend: `resources` collection in `content.config.ts` (Zod 4 discriminated union over `__component`), populate via `?populate[content_blocks][populate]=*`. Pages: `src/pages/resources/index.astro` (card grid) and `src/pages/resources/[id].astro` (getStaticPaths with string ids, switch over `__component` to render iframe/Watch Video, Download File, and Read External Article cards). Branch `feature/resource-content-type` ff-merged to `main` (commit `b416eb3`) and deleted.
- 2026-06-09 — **Shared `Layout` wrapper (Header + Footer)**. Added `src/layouts/Layout.astro` (thin wrapper around `BaseLayout` that plugs the empower `Header` into `slot="header"` and a new `Footer` into `slot="footer"`) and `src/components/empower/Footer.astro` (slate/teal/lime brand). Switched `BaseLayout` body to `flex-col` so the footer hugs the viewport bottom on short pages. Migrated `index`, `blog/index`, `blog/[id]`, `events/index`, `events/[id]`, `resources/index`, `resources/[id]` from `BaseLayout` → `Layout`; dropped the local `<Header slot="header" />` from `index.astro`. Static `about`/`contact`/`404` intentionally stayed on `BaseLayout`. Branch `feature/layout-wrapper` ff-merged to `main` (commit `c752555`) and deleted.
- 2026-06-09 — **Partner + Project content types with relational frontend pages**. Strapi: two new collection types under `backend/src/api/` — `partner` (`name`, `logo`, `website_url`) and `project` (`title`, `description` richtext, `image`) — with a many-to-many relation declared on `partner.projects` (owning, `inversedBy: "partners"`) and mirrored on `project.partners` (`mappedBy: "projects"`). Both Draft & Publish. Frontend: added `partners` and `projects` collections to `content.config.ts` (fetched with `?populate=*`, Zod 4 schemas with lightweight `partnerRef`/`projectRef` for the M2M). Pages: `our-partners/index.astro` (alphabetical card grid with logo + project count), `our-partners/[id].astro` (`getStaticPaths` over `documentId`; shows logo, website link, and associated project cards), `our-programs/index.astro` (date-sorted grid with image, description excerpt, clickable partner badges linking back to `/our-partners/[id]`). Updated `OurWork.astro` landing pillars so PROGRAMS → `/our-programs` and OUR PARTNERS → `/our-partners`. Branch `feature/partners-projects` ff-merged to `main` and deleted.
