## Current Feature

Scaffold Strapi 5 backend (`backend/`).

## Status

Scaffolded; not yet smoke-tested, branched, or committed.

## Goals

- Stand up a working Strapi 5 backend ready for the content modeling phase (Events, Blog, Basic Pages, Web-forms).
- Pin Node to a Strapi-supported version (20–24) for this project.

## Notes

- Node 25 (Homebrew) was incompatible with Strapi 5. Installed `fnm`, added shell hook to `~/.zshrc`, installed Node 22.22.3, pinned via project `.node-version`.
- Scaffolded with `npx create-strapi@latest backend` using: TypeScript, SQLite (`.tmp/data.db`), npm, `--skip-cloud`, `--no-example`, `--no-run`, `--no-git-init`.
- Strapi 5.47.1; uses `better-sqlite3`. Dev: `cd backend && npm run develop`.

## History

<!-- Keep this updated. Earliest to latest -->


