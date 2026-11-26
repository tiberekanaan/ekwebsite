# Coding Standards

> Rewritten by `/adopt` on 2026-11-26 to match the code that exists. The older
> `context/coding-standards.md` states the original intent; where the two
> differ, this file describes what the code actually does.

## Repository layout

- `frontend/` - Astro 6 site (pnpm). `backend/` - Strapi 5 CMS (npm).
- `context/current-feature.md` - running feature log and history; keep updating
  it per the workflow in `CLAUDE.md`.
- `backend/apply-*.js` - one-off, idempotent production content migrations,
  run by hand with a short-lived token.

## TypeScript

- Strict mode. No `any`; use proper types or `unknown`.
- Define interfaces for component props and Strapi payloads. Strapi 5
  responses are flat (no `.attributes`) and entries are addressed by
  `documentId`.
- Use type inference where obvious, explicit types where helpful.

## Astro

- `.astro` components by default; zero client JS unless interactivity needs
  it. Small behaviour lives in a component `<script>` bound once at module
  scope and re-collected on `astro:page-load` (the site uses `<ClientRouter />`).
- Progressive enhancement: the server-rendered page must be complete without
  JS. Enhancements add a class (for example `.ek-enhanced`) only when JS runs
  and reduced motion is off.
- Reveal motion uses `data-reveal` and `data-reveal-delay` from `Motion.astro`.
- Build-time content comes from Content Loader collections in
  `src/content.config.ts` (`fetchStrapi` / `softFetchStrapi`, Zod from
  `astro/zod`, Zod 4 syntax such as `z.email()`).
- Detail pages that offer a translation are on-request: `prerender = false`,
  resolve the slug from the build-time collection, then fetch the localised
  entry by `documentId` with `?locale=`. Return `new Response(null, { status: 404 })`
  for unknown slugs; never `Astro.rewrite('/404')` from an on-demand route.
- Forms use Astro Actions in `src/actions/index.ts` with Zod input,
  `ActionError` for failures and `isInputError()` for field messages.
- `Astro.glob()` and `<ViewTransitions />` are removed in Astro 6; use
  `import.meta.glob()` / `getCollection()` and `<ClientRouter />`.

## Landing page and CMS blocks

- Homepage section order is fixed in `src/pages/index.astro`; each CMS block
  supplies copy only. Every block keeps a code fallback for every string.
- New homepage populate keys go in a list that is retried without them on a
  400, so a Vercel build that lands before the Strapi Cloud schema deploy still
  renders CMS copy.
- `*text*` in a CMS title renders as the lime `<em>` emphasis.

## Strapi

- Use the Document Service API (`strapi.documents`) and `documentId`; manage
  states with `publish()` / `unpublish()`.
- Bootstrap (`backend/src/index.ts`) seeds Public permissions and content
  idempotently: check with `findFirst`, create, then publish.
- Generated types in `backend/types/generated/` are committed; update them by
  hand with schema changes in the generated shape, and do not commit drift from
  a dev server that lags the schema files.
- Apply scripts: fetch, modify, PUT. Put `__component` first in each
  dynamic-zone entry. Fill only unset fields; guard any overwrite by the exact
  old value. A plain REST POST publishes immediately.

## File Organization

- Pages: `src/pages/[route]/index.astro`, `[slug].astro`
- Landing blocks: `src/components/blocks/NameBlock.astro`
- Site chrome: `src/components/empower/`; shared UI by feature folder
- Lib/utils: `src/lib/[utility].ts`; types: `src/types/[feature].ts`
- Strapi: `backend/src/api/<type>/`, components in `backend/src/components/{blocks,shared}/`

## Naming

- Components: PascalCase (`NewsCard.astro`)
- Files: match the component name or kebab-case
- Functions: camelCase; constants: SCREAMING_SNAKE_CASE
- Types/interfaces: PascalCase, no prefix

## Styling

- Tailwind CSS v4, configured in CSS (`@theme` in `src/styles/global.css`).
  No `tailwind.config.*`.
- Use the `ek-*` tokens (`ek-900`, `ek-mist`, `ek-paper`, `ek-lime`,
  `ek-olive`, `ek-ink`, `ek-muted`). The site is light-themed with dark
  feature sections; there is no dark mode toggle.
- No inline styles, except a CSS custom property set from data
  (for example `--ek-steps`).

## Environment and security

- Environment variables are declared with `astro:env` in `astro.config.mjs`.
- Content Security Policy stays enabled.
- The canonical site address must never fall back to a `*.vercel.app` host.
- Never commit API tokens; production tokens are created for one task and
  deleted after.

## Testing

No test runner is set up. Vitest and Playwright are installed (inherited from
the Velocity starter), but there are no test files and no configuration, and
`AGENTS.md` declares no `test` command, so testing is not a gate. Add one with
`/tests` as a deliberate step when wanted.

Until then, verify work with:

- `pnpm check` (type check) and `pnpm build` in `frontend/`.
- Browser evidence: ad-hoc Playwright scripts against the dev server at
  1440 px and 390 px. Use `scrollIntoView({ behavior: 'instant' })`, because
  the site sets smooth scrolling globally.
- For content changes, the public Strapi API and the rendered live pages.

When a runner is added, the scope rule applies: test pure logic with real edge
cases (slug builders, date formatters, sorters, apply-script helpers), not UI
components.

## Code Quality

- No commented-out code.
- No unused imports or variables.
- Keep functions under about 50 lines.
- `pnpm lint` currently reports about 1,600 pre-existing problems; do not add
  new ones in files you touch.

## Comments

Write code that explains itself; comment only what the code cannot say.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner blocks, section dividers, or narration of obvious code.
- A comment earns its place when it captures a decision, a gotcha or
  workaround, why a value is what it is, or a link to a spec or issue.
- Keep doc comments minimal: a one-line purpose on an exported type or
  function is plenty.

## Writing

- No em dashes (U+2014) in generated content or site copy: docs, comments,
  commit messages, specs, CMS seed text.
- Use a hyphen for `term - description` separators; rephrase prose with
  commas, parentheses, or a colon. Avoid en dashes and the ellipsis character.
- Site copy is British English.
