# SpaceX Rockets — Allo Frontend Test

Two-screen rocket browser built on the Launch Library 2 API (v2.2.0).

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run type-check`.

Requires Node 20+.

## Features

- **List** — all 13 SpaceX launcher configurations with image, name and description
- **Filter** — client-side search by rocket name
- **Add rocket** — in-memory only, since the API is read-only
- **Detail** — image, name, description, cost per launch, country, first flight
- **UI states** — loading, error with retry, empty, success
- **Missing data** — null and empty-string fields fall back to a placeholder
- Responsive across mobile, tablet and desktop

## Architecture

```
src/
├─ types/       API response shapes + the app's Rocket model
├─ services/    fetch wrapper (http.ts) + rocket endpoints and mapper
├─ stores/      Pinia store: single source of truth
├─ utils/       currency, date and fallback formatting
├─ components/  RocketCard, RocketFormDialog, State{Loading,Error,Empty}
└─ pages/       index.vue (/) and rockets/[id].vue (/rockets/:id)
```

### Notes on the decisions

**Two rocket types.** `LauncherConfig` mirrors the API's `snake_case` shape;
`Rocket` is the camelCase model the UI consumes. The mapper in
`services/rockets.ts` is the only place that knows about the API's field
layout, so the v2.3.0 changes the brief warns about would be a one-file edit.

**Store-first detail page.** Opening a rocket from the list costs no request,
which matters given the documented 15 requests/hour limit. A direct visit to
`/rockets/:id` falls through to the API.

**API rockets and user rockets are stored separately.** A refetch can
therefore never wipe out what the user added.

**Retry is conditional.** A 404 hides the retry button, since retrying it can
only fail again.

## Fixing the starter

On a clean `npm install`, the starter failed `npm run type-check` with four
errors. There was no committed lockfile, so npm resolved newer minor versions
than the scaffold was written against:

- `@tsconfig/node22` had moved to `"lib": ["es2024"]`, which TypeScript 5.6
  does not recognise. Pinned to `22.0.0`.
- `vue-router` 4.6 ships its own type-only `vue-router/auto` entry, so
  `import { createRouter } from 'vue-router/auto'` no longer resolves. The
  runtime APIs now come from `vue-router`; `routes` still comes from
  `vue-router/auto-routes`. Typed routes are unaffected.

`package-lock.json` is committed so this stays reproducible.