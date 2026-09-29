# Bold Ideas Consulting — website handoff

Responsive website built with React 19, TypeScript, Vite 6 and Motion. This is the current implementation as of 29 September 2026, with the approved-in-conversation visual direction and supplied videos. Preparing this package does not publish the site.

The client preview was refreshed with the current version at the user's request on 29 September 2026: [open preview](https://bold-ideas-client-preview.twenntyonee.chatgpt.site). Future changes are **local only** until explicitly authorised for publication; see [deployment record](docs/DEPLOYMENT.md).

## Start locally

Use **Node.js 22.18 or later** (the content validator imports TypeScript directly). The app has no required environment variables, API keys, database or CMS.

```sh
cd prototype
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Open `http://127.0.0.1:5173/`. The app directory is still named `prototype` to preserve the existing development and hosting setup.

## Check and build

From `prototype/`:

```sh
npm run typecheck
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4173
```

Build validates case-study content and the public asset inventory. It writes the website to `prototype/dist/client/`, plus the existing Sites adapter in `dist/server/` and `dist/.openai/`. For other static hosts, publish `dist/client/` and configure SPA history fallback to `/index.html` for page routes. Keep missing asset requests as 404s.

## What is included

- Homepage, six services in expandable cards, four audience backgrounds, two scroll-driven stories and video footer.
- Case-study index at `/case-studies` and full service-package list at `/services`, using the same data as the homepage.
- Shared case-study template for Kinable, Love Peace Harmony, Mapwhizz and Czech Beer Alliance at `/work/:slug`.
- Full testimonial page at `/testimonials`.
- Responsive layouts, keyboard controls, motion preference and static media fallbacks.
- External Google booking link and email contact; Privacy and Terms point to the existing live site.

There is no CMS, admin interface, form backend or separate contact page. The homepage retains its services and contact sections. The indexes are included in the 29 September published client preview.

## Where to begin

| File | Purpose |
| --- | --- |
| [docs/HANDOFF.md](docs/HANDOFF.md) | Architecture, deployment, maintenance, media timings and remaining release decisions. |
| [Case-study editing guide](prototype/src/content/case-studies/README.md) | Czech guide to editing and adding consistently structured projects. |
| [docs/assets.json](docs/assets.json) | Active media files and responsive derivatives, source records and processing notes. |
| [docs/CONTENT-AND-SOURCES.md](docs/CONTENT-AND-SOURCES.md) | Copy authority, attribution and component provenance. |
| [DESIGN.md](DESIGN.md) | Current visual and interaction rules. |
| [PRODUCT.md](PRODUCT.md) | Current scope and content boundaries. |
| [docs/VERIFICATION.md](docs/VERIFICATION.md) | Checks performed for this handoff and cleanup summary. |

The handoff archive includes source, lockfile, configuration, tests, active public media and these documents. It excludes `node_modules`, generated builds, Git history, agent tools, design experiments, screenshots and superseded media. Originals in the owner's Downloads folder are not required to run or build the site.

## Regenerate responsive images

After changing image sources, run `npm run media:responsive` from `prototype/`. Sharp generates smaller WebP candidates, updates `src/content/image-variants.json` and adds their provenance to `docs/assets.json`. The checked-in variants need no image conversion at build or runtime. Original Figma artwork stays lossless; responsive UI candidates are lossless after resizing. Superseded media under `docs/retired-*` is local archival material and is excluded from Git and deployment.
