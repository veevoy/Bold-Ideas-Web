# Bold Ideas web application

See the [project README](../README.md) and [technical handoff](../docs/HANDOFF.md).

Requires Node.js 22.18+. From this directory:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Validation and production build:

```sh
npm run typecheck
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4173
```

Content: `src/content.ts`, `src/optical-content.ts`, `src/why-content.ts`, and `src/content/case-studies/*.json`. See the [case-study editing guide](src/content/case-studies/README.md).

Keep this directory together with the root `docs/` folder: `scripts/validate-assets.mjs` reads `../docs/assets.json`. The production website itself only needs the generated build and its public assets.
