# Al Mairaaj Simulators

Standalone React app hosting interactive science simulators, deployed independently
at `simulators.almairaaj.com`. Kept separate from the main Al Mairaaj app so this
project's dependencies, build size, and deploy cadence don't affect the core LMS.

## How it connects to the main app

The main app's `simulators` database table has a `page_path` column per simulator.
When a student or teacher clicks a simulator, it opens `page_path` in a new tab.
Once this subdomain is live, update those rows to point here, e.g.:

```sql
UPDATE simulators
SET page_path = 'https://simulators.almairaaj.com/periodic-table'
WHERE slug = 'periodic-table';
```

No changes are needed on the main app's code for this - it already treats
`page_path` as an arbitrary URL and opens it in a new tab.

## Adding a new simulator

1. Create `src/pages/YourSimulator.jsx`.
2. Register its route in `src/main.jsx`.
3. Update the corresponding row's `page_path` in the main app's `simulators` table
   once deployed.

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

Outputs static files to `dist/` - deploy that folder to any static host (the
project's own VPS via nginx, Vercel, Netlify, GitHub Pages, etc.) pointed at
`simulators.almairaaj.com`.

## Authentication

This app currently has **no login requirement** - anyone with a simulator's direct
URL can open it. That's fine for purely educational content with nothing
student-specific. If a future simulator needs to know who's using it (tracking
progress, restricting access), you'll need to either:

- Share the main app's session cookie by setting `SESSION_DOMAIN=.almairaaj.com`
  in the main Laravel app, or
- Have the main app generate a short-lived signed token and pass it in the URL
  when linking here, verified on load.
