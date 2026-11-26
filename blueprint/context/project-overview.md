# Empower Kiribati website - Project Overview

<!-- blueprint:source-hash e628ad3516fb21be975bcd1986e4e1aa3efd78bb522007bf7bc49d37c9c0a9ef -->

> Public website and CMS for Empower Kiribati, a locally-led NGO in Bikenibeu,
> South Tarawa: programmes, delivery evidence, news and grant guides, all
> edited by staff in Strapi.

## Problem

Empower Kiribati (operating name of Digital Kiribati Inc, registered 6 May
2024) partners with ministries, funders and community organisations on
leadership, digital participation, partnerships and innovation. The site must
prove the organisation is real, active and credible to funders and partners,
give community groups practical resources (starting with Kiribati-specific
grant guides), and let non-technical staff publish all of it themselves.

## Users

- **Prospective funders, embassies, ministries** - evaluate a partner: programmes, delivery record, figures.
- **Existing partners and counterparts** - see what happened recently.
- **Community organisations, churches, schools, youth** - find programmes, exchanges and resources.
- **Journalists and general visitors** - a contact and a recent story.
- **Editors** - trusted, non-technical staff in the Strapi admin. No visitor accounts.

> TODO (confirm): who the day-to-day editors are and how many.

## Usage model

- Small public, internet-facing NGO site; no sign-in for visitors.
- Untrusted input only via the contact form and newsletter sign-up (Zod validation, honeypot).
- Editors are trusted; production API tokens are short-lived and deleted after use.
- Consent rules: participants quoted by role and month only; partners named only with `consent_to_name`.

## Features

Shipped (1-20):

1. **Strapi backend and core types** - events, blog, basic page, web form; Public read seeded on bootstrap.
2. **Astro frontend on Velocity** - Content Loader collections, shared layout.
3. **Contact form** - Astro Action, saved to Strapi.
4. **Resources** - index and detail with video, download, external-article blocks.
5. **Programmes and partners** - many-to-many, slugged programme URLs.
6. **Kiribati translations** - optional `en-KI` versions with a language toggle.
7. **Landing page block system** - homepage dynamic zone rendered by block components.
8. **Visual identity** - ek palette, page headers, reveal motion, About/Contact/404 redesigns.
9. **Global settings in the CMS** - logo, nav, footer, socials, contact details.
10. **Site search** - Pagefind index built on deploy.
11. **Analytics and rebuild webhook** - Vercel Web Analytics; Strapi publish triggers a Vercel build.
12. **Newsletter sign-up** - subscribers saved to Strapi.
13. **Grant guides** - tagged long-form articles with outline and related articles.
14. **Content spine** - Strategy, Programme, Activity; delivery record on programme pages.
15. **Per-programme partner roles** - partners grouped by role on programme pages.
16. **Landing content v3 and the Challenge cycle** - donor-reviewed copy, scroll-pinned nine steps.
17. **News** - slugged stories, `/news`, hero Latest line, What's new section.
18. **All landing copy in Strapi** - including Challenge cycle and SEO fields.
19. **Landing restructure** - activity-first homepage; cycle moved to About.
20. **SEO indexing fixes** - canonical domain guard, full sitemap, NGO/NewsArticle data.

Roadmap (next is 21):

21. **Real 404s on all detail pages** - stop 500s on unknown programme/blog/resource/event/partner URLs.
22. **Women Economic Empowerment programme page** - draft entry, `what_it_is_not`, government role. *(TODO confirm)*
23. **People and partners** - person type, partner consent and roles.
24. **Consent and records** - testimonial consent gating, policy type, resource kinds.
25. **Content cleanup** - singletons, legacy fields, dead-link check. *(TODO confirm News vs Blog)*
26. **Events and measurement** - richer events, outcome measurement.
27. **Grant guide: reporting back to your funder** - promised in the budget guide.
28. **Lint baseline** - make `pnpm lint` usable as a gate.
29. **Faster news first load** - cold start on on-request pages. *(TODO confirm trade-off)*

## Data model

Strapi 5; every entry has `documentId` (24-char string, the stable reference),
`createdAt`, `updatedAt`, and `publishedAt` where Draft & Publish is on (D&P).
`ᴸ` = localised (`en`, `en-KI`).

### Programme (`project`, D&P)

- `title`ᴸ (string, required), `description`ᴸ (richtext; first line doubles as excerpt)
- `image` (media), `project_status` (enum running/completed/planned/agreed_not_started)
- `objectives`ᴸ, `metrics`ᴸ (richtext), `location`ᴸ (string)
- `strategy` (many-to-one Strategy); legacy `pillars` (many-to-many, migration source)
- `partner_links` (repeatable `shared.programme-partner`: `partner` → Partner, `partner_role` enum funder/co_implementer); legacy `partners` (many-to-many, fallback)
- `activities` (one-to-many Activity), `testimonials` (one-to-many Testimonial)
- Public URL `/our-programs/<slug>`, slug derived from `title` at build time.

### Strategy (`pillar`, D&P)

- `title` (string, required), `description` (richtext), `projects` (inverse). Four fixed entries, seeded; no own pages.

### Activity (no D&P)

- `title` (string, required), `date` (date, required), `end_date` (date), `venue`, `island` (string)
- `attendance` (int), `count_method` (enum register/estimate, required)
- `delivered` (bool), `not_delivered_reason` (string), `programme` (many-to-one Programme)

### Partner (D&P)

- `name` (string, required), `logo` (media), `website_url` (string)
- `role` (enum funder/government/in_kind_donor/co_implementor) - organisation kind, not per-programme role
- `consent_to_name` (bool), `display_order` (int), `projects` (many-to-many Programme)
- Landing marquee shows only funder/government with consent.

### Testimonial (D&P)

- `quote` (text, required), `author` (string, required), `role` (string), `image` (media), `project` (many-to-one Programme)

### News Update (`news-update`, D&P)

- `title`ᴸ (string, required), `slug` (uid from title, optional; derived when missing)
- `summary`ᴸ (text), `content`ᴸ (richtext), `date` (date, required), `photo` (media)
- URL `/news/<slug>`; old `/news/<documentId>` links 301.

### Article (grant guides, D&P)

- `title` (string, required), `slug` (uid, required), `category`, `author`, `last_reviewed` (string)
- `excerpt`, `meta_description` (text), `body` (richtext), `reading_time` (int)
- `tags` (many-to-many Tag). URL `/resources/articles/<slug>`.

### Tag (no D&P)

- `name` (string, required, unique), `group` (enum stage/topic/audience, required), closed vocabulary of 18 seeded tags.

### Other collections

- **Blog** (D&P): `title`ᴸ, `content`ᴸ (richtext), `publish_date` (date). URL `/blog/<documentId>`.
- **Event** (D&P): `date`, `location` (required), `details` (richtext), `image`. No title field.
- **Resource** (D&P): `title`ᴸ, `description`ᴸ, `content_blocks`ᴸ (zone: video, download, external article).
- **Web form** (no D&P): `name`, `email`, `message` (all required) - contact submissions.
- **Subscriber** (no D&P): `email` (required, unique).

### Single types

- **Homepage** (D&P): `blocks` (dynamic zone of `blocks.*`: hero, challenge-cycle, what-we-do, impact, programmes, partner-marquee, news, testimonials, close, plus dormant legacy blocks), `seoTitle`, `seoDescription`. Blocks supply copy only; order is fixed in code.
- **Global** (D&P): `siteName`, `favicon`/`logo`/`logoWhite` (media), `navbarLinks` and `socialLinks` (repeatable `shared.link` label/url), `headerCta` (`shared.link`), `footerColumns` (repeatable heading + links), `generalEmail`, `partnershipEmail`, `phone`, `footerAddress`, `officeLine`, `utcNote`, `footerBlurb`, `footerContactHeading`, `legalLine`, `footerTagline`.
- **Basic page** (About): `title`, `content` (richtext, split by `##` headings).
- **Partners page** (D&P): eyebrow, title, description, intro heading and richtext, image, CTA fields.

> Locked: `documentId` references, the `en-KI` locale code, and title-derived
> slugs are relied on by URLs, the sitemap and apply scripts.

## Tech stack

- **Astro 6 (Velocity starter)** - frontend, Content Loader collections, Astro Actions, on-request pages for translations.
- **Tailwind CSS v4** - CSS-first `@theme` tokens (`ek-*`).
- **TypeScript strict, Zod 4** (`astro/zod`) - typing and validation.
- **marked** - rich-text rendering. **Pagefind** - static search.
- **Strapi 5.47** - CMS; SQLite locally, Strapi Cloud in production.
- **pnpm** (frontend), **npm** (backend).
- **Idempotent `backend/apply-*.js` scripts** - production content migrations.

## Monetization

Not applicable: an NGO site with no payments. Editorial rule: no donate button.

> TODO (confirm): whether online giving is ever planned.

## UI/UX

- Light site with dark feature sections; `ek` palette (teal `ek-900`, mist, paper, lime), Playfair headings, condensed eyebrows with a three-wave glyph, pill buttons, photo cards.
- Scroll reveals respect reduced motion; complete without JS.
- Voice: British spelling, no em dashes, South Tarawa (never "across Kiribati"), no staff names, role-and-month attribution.

Routes:

- `/` - hero, featured programmes, What's new, track record, strategic focus, Why-we-exist teaser, partners, quote, Work with us
- `/about` - Why we exist (pinned cycle), story, What we stand for, approach, get involved
- `/our-programs`, `/our-programs/<slug>` - programmes by strategy; detail with partners, delivery record, testimonials
- `/our-partners`, `/our-partners/<id>`
- `/news`, `/news/<slug>`; `/blog`, `/blog/<id>`; `/events`, `/events/<id>`
- `/resources`, `/resources/<id>`, `/resources/articles/<slug>`
- `/contact`; `?lang=kir` on translatable detail pages

## Deployment

- **Frontend:** Vercel project `ekwebsite`, `empower.org.ki` (`www` redirects). Build `pnpm build`. Env: `STRAPI_URL`, `STRAPI_API_TOKEN`, `SITE_URL`.
- **Backend:** Strapi Cloud (`determined-strength-17a6de9eef.strapiapp.com`); schema deploys take about 15 minutes.
- **Release:** pushing `main` deploys both. Strapi publish/unpublish/delete webhook rebuilds Vercel (about 1 minute).
- **Domain:** registrar Mount Systems (renews 14 May 2027); DNS on Vercel nameservers; email on Google Workspace (MX, SPF, DKIM, DMARC in Vercel DNS).

## Open questions

> Resolve in the plans, then re-run /overview.

- **Partner roles mismatch:** build-plan item 15 says programme pages group partners as funder, government and co-implementer, but `shared.programme-partner.partner_role` only allows funder/co_implementer. The government option belonged to the lost Women Economic Empowerment work (item 22).
- **Women Economic Empowerment page (22):** rebuild from the upload instructions, or drop?
- **News vs Blog (25):** phase 4 planned a merge; News was kept separate on 2026-10-08.
- **News first-load speed (29):** prebuilding removes the `?lang=kir` toggle on news.
- **Editors and giving:** who edits day to day; whether online giving is planned.
