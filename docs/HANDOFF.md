# Technical handoff — 25 September 2026

Publication update, 29 September 2026: the user explicitly authorised replacing the preview with the entire current working version. That publication succeeded on the same domain; see [DEPLOYMENT.md](DEPLOYMENT.md). Earlier local-only notes below describe the state when those changes were made. Future edits remain local until explicitly authorised. Case-detail Client facts now show the name without an industry subtitle; sector metadata remains available to indexes.

## Running and delivering the project

The application root is `prototype/`. Use Node.js >=22.18 and the committed `package-lock.json`; `npm ci` installs the locked versions. `.nvmrc` records the supported baseline. No environment file, API key, database or proprietary agent tool is required.

```sh
cd prototype
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Run `npm run typecheck`, `npm run build` and then `npm test` before handing over an update. Build must precede the Sites tests because they also check generated output. `npm test` covers authored case content, route lookup and the existing Sites worker. Build additionally validates case images and the complete public-asset inventory. `npm run preview -- --host 127.0.0.1 --port 4173` previews the production build.

Build outputs:

| Path under prototype/ | Purpose |
| --- | --- |
| `dist/client/` | Static website: HTML, bundled JS/CSS and active local media. |
| `dist/server/index.js` | Existing Sites asset worker with HTML-route fallback. |
| `dist/.openai/hosting.json` | Existing Sites configuration, no database/storage bindings. |

For a conventional static host, deploy `dist/client/` at the domain root. Preserve real static files and missing-file 404s; route other HTML page requests to `/index.html`. Nested paths must work when opened directly, not only after clicking from the homepage. The site uses root-relative asset URLs and is not configured for a subdirectory such as `/new-site/`.

The Sites scaffold is retained, but this cleanup did not deploy or change hosting. No hosting account or credentials are transferred in the package.

After cleanup, a separate frozen client preview was published at the user's request. See [DEPLOYMENT.md](DEPLOYMENT.md) for its identity and lossless video hosting adapter. Further changes must remain local until the user explicitly requests another publication.

## Local update — quieter case backgrounds, 28 September 2026

Replaced all four busy hero/thumbnail backgrounds with real stock photos dominated by sky and a restrained motif. The shared thumbnail tint is now 10%; the hero gradient is 52% / 24% / 8%. Full foreground screenshots, parallax and chapter detail compositions remain intact. See [CASE-HERO-MEDIA.md](CASE-HERO-MEDIA.md) for sources, crop metadata and the retired media record. This update is local only; the published preview remains frozen. Verified desktop/mobile hero and thumbnail crops, loaded backgrounds and absence of horizontal overflow. Typecheck, build, asset/content validation and all 24 tests pass.

## Local update — Lavender accent rhythm, 29 September 2026

Lavender appears in the opening hero junctions, moving audience timeline star, case-study lists and related stories, and testimonial/facts frames. Cinnabar remains in the story, About benefits, process, outcomes and contact; homepage project labels and the active testimonial indicator also use Cinnabar ink. Stars in an individual section share one colour through the scoped `--junction-color` token. Full-page testimonial numbering retains `--lavender-text` (#735199). The transparent desktop navigation groups links right before booking. Experience logos use the selected white monochrome treatment again, with the Mapwhizz mask preserving its clock details. Homepage testimonial rules no longer overlap a painted frame border. Screen bezels use 32% Alabaster with a static 12px backdrop blur; the browser bar uses a translucent light fill. CBA hero and all thumbnails show the original brewery courtyard as the sole background photograph; the unrelated field is retired. Existing CTA colours, large service-card surfaces and motion are unchanged. Local only.

## Local update — consistent bullet lists, 29 September 2026

Editorial bullet lists share `BrandList`: the original curved four-point homepage star, 16px wide with a 16px text gap. Homepage commitments, case-study chapters/outcomes and service inclusions all use it. Markers are Cinnabar on Alabaster; service lists inherit the card text colour for contrast on orange, Lavender and Green. Preserve semantic lists and hide decorative SVGs from assistive technology. Ordered project timelines and benefit grids retain their distinct structure. Local only.

## Routes and page structure

| URL | Behaviour |
| --- | --- |
| `/` | Homepage. |
| `/#services`, `/#work`, `/#about`, `/#contact` | Homepage sections. |
| `/#how-we-work`, `/#who-we-work-with` | Collaboration and audience sections. |
| `/#tech-strategic-compass` and other service IDs | Opens the named service, scrolls to it and focuses its trigger. |
| `/case-studies` (also `/work`) | All published case studies, automatically listed from the shared JSON collection. |
| `/services` | All six service packages, grouped by need; normal-flow disclosures, shared prices and scope. |
| `/services#tech-strategic-compass` and other service IDs | Opens and focuses the named package on the services page. |
| `/work/kinable` | Kinable case study: development under way, with the supplied working-build screens and testimonial. |
| `/work/love-peace-harmony` | Love Peace Harmony case study. |
| `/work/mapwhizz` | Mapwhizz case study, including Suzanna Dumitrescu’s testimonial. |
| `/work/czech-beer-alliance` | Czech Beer Alliance × BoldLeads.ai case study. |
| `/testimonials` | Full testimonial page. |

`src/site-routes.ts` selects pages from `window.location.pathname`. Navigation between pages uses ordinary links. `/work` aliases the case-study index; unknown `/work/...` addresses show the case-not-found view. Other unrecognised top-level paths currently render the homepage. These are client-rendered routes, without per-route server rendering or complete HTTP 404 handling.

On an actual reload the app intentionally resets scroll to the top before paint and clears the saved fragment. Normal anchor navigation still works.

## Editing content

| Change | Source file under prototype/ |
| --- | --- |
| Services, need groupings, prices, booking URL, email, FAQ, all testimonials | `src/content.ts` |
| Hero/navigation copy, collaboration steps, About benefits, contact copy | `src/optical-content.ts` |
| First film headlines/notes and longer rationale | `src/why-content.ts` |
| Audience names, descriptions and film IDs | `src/components/Audiences.tsx` |
| Optional testimonial company marks, mapped by stable ID | `src/testimonial-content.ts` |
| Studio address, footer utility/legal links | `src/components/SiteFooter.tsx` |
| Case-study content and images | `src/content/case-studies/*.json` |
| Base font, colour and layout tokens | `src/optical.css` |
| Final bounded-button hover rules | `src/interactions.css` |

Case studies use one shared template, `src/components/CaseStudyPage.tsx`, and one validated model, `src/case-study-model.ts`. Copy an existing JSON, change the unique slug/filename, fill its fields and set `published: true` to include it in the next local build. The `/case-studies` index, homepage and two related-project links update automatically. The current order is Kinable, Love Peace Harmony, Mapwhizz, then Czech Beer Alliance. The [editing guide](../prototype/src/content/case-studies/README.md) explains every field in Czech. Inclusion in a local build does not authorise publication.

Local update, 28 September: body imagery for Kinable, LPH and Mapwhizz uses `CaseStudyShowcases` and editable `showcases` arrays. Each composition selects source-pixel crops of authentic UI components on a solid client-colour background. Crop bounds, layouts and source assets are validated. Original images and provenance are retained; heroes show complete screens. The later compact-gallery update below replaces LPH and Mapwhizz thumbnails. CBA keeps context photographs because no product-interface assets are supplied. The editing guide documents the available composition layouts. Desktop/mobile checks, typecheck, all 24 tests and the production build passed. This update has not been published to the frozen client preview.

The detail uses an editorial sequence: project name above a centred headline on a full-width photographic hero, a real product screen below it when supplied (CBA intentionally has background only), framed facts beside the overview, a right-hand reading column alternating with chapter imagery, framed quote (when provided), outcome and two related stories. A concise optional timeline after the challenge is editable as `timeline: [{ title, description }]`; it preserves project sequence without inventing durations. It uses a horizontal rule with star nodes on desktop and a vertical line at 900px and below, all on a Green band. Only the quote card is Green with Paper text and light supporting author copy; the surrounding section remains Alabaster. Facts and quotes have a star at each of their four corners; the outcome has top and bottom rules with one centred star each. Optional `images` arrays belong directly to `challenge`, each `approach` section and `nextPhase`; the older `gallery` remains supported after the approach. The shared `caseStudyImages()` collector validates every image, including optional chapters and the separate hero layers. Inline images and foreground hero screens retain their full aspect ratio. The shared CaseStudyThumbnail uses the optional authored composition, or falls back to the hero pairing, on homepage, case index and related stories. Compositions are static; photographic previews animate the background alone. All quotes and authors align left on every route, with circular company marks before the names. Visible image captions and credit links have been removed; alt text, JSON metadata and provenance in `assets.json` remain.

Local compact-gallery update, 29 September: Kinable daily-care and care-plan frames share dimensions and original navigation baselines via `footerCrop`. LPH now uses eight finished compositions supplied in Figma section 1935:9606, displayed in six `artwork`/`artwork-pair` blocks: dashboard; About/song pair; donation; volunteering; Global Map/sign-in pair; events/projects. Four landscape images are 2050×1318 and four portraits are 964×1318. Lossless WebP exports are pixel-identical to the Figma PNGs; their complete backgrounds, frames and crops remain intact with no added CSS canvas treatment. Both portrait pairs remain side by side on mobile. Its previous four long page exports and composition metadata are archived outside public/. Thumbnails reuse the Donate/sea hero pairing with a light background treatment; the redundant long-homepage source is archived outside public/ with provenance. Mapwhizz now shows five complete compositions prepared by the user in Figma section 1492:8466: postcode table, commute comparisons, company dashboard, analysis types and results. The duplicate report overview was removed at the user’s request; the postcode table now precedes the commute graphs. They are lossless WebP at original dimensions (three 2050×1318 and two 964×1318), displayed with `artwork`/`artwork-pair` and no additional crop, background, frame or padding. The two portrait frames stay side by side. Its thumbnail now pairs the original hero architecture background with the complete commute-graph screen (Figma node 1492:9472), using `thumbnailScreen` independently of the unchanged hero. The former CO₂ thumbnail source is archived outside public/. Source metadata is retained. Company setup and both photographic mobile mockups remain archived outside public/ with provenance. No UI is generated, and report figures remain example data. `pages` uses a fixed 3:2 canvas without rotations or clipped page edges; `stack` uses a primary view and supporting detail, stacked vertically on mobile. Single screens use intrinsic height capped at 68svh plus padding. Phone pairs stay side by side. LPH’s hero now pairs the supplied sea photograph with its Donate screen, and the dashboard uses the corrected source export with its complete logo. This work is local only. CBA retains context photographs because no interface-design work was supplied.

There is no browser-based editor. Content changes are source-file edits followed by a local build; a later deployment requires a new explicit publication request. `published: false` controls display, not confidentiality; unpublished source can still be included in the client bundle.

Optional `hero: { background, screen? }` separates the photographic setting from authentic product evidence. The foreground uses `screen` when supplied; a hero with `background` alone is intentionally background-only. CBA has no overlaid photo in its hero or any thumbnails. Kinable, LPH and Mapwhizz use real stock backgrounds with restrained motifs. CBA uses the original brewery courtyard, without an overlaid image. Backgrounds avoid people; previews use a light 10% tint and heroes a 52% / 24% / 8% gradient, holding the strongest shade over the upper title area. Prefer stock before generation. If `hero` is omitted for a new case, `image` supplies both layers until a background is added. No screen is fabricated. See [CASE-HERO-MEDIA.md](CASE-HERO-MEDIA.md) for paths and provenance. The background is decorative when `illustrative: true`. No image captions have been restored. All case studies links are removed from the detail hero and related-story heading; the global Case studies navigation remains. The background alone translates by up to 20% of its height as its hero scrolls out. A 120%-height image and clipped hero prevent exposed edges. Reduced motion keeps the image static.

`usePageEntrance.ts` adds once-only viewport entrances to the index, detail and services page. Copy translates 16px over 520ms; media reveals its final 10% over 700ms. Timeline items stagger at 70ms (max 210ms). The default DOM stays visible, keyboard focus cancels the relevant running animation, and OS reduced motion disables these entrances and spatial hover effects. Preview image/arrow hover and the existing animated disclosures provide feedback without introducing text shadows or blur. Only published case studies appear on the homepage; the Coming soon placeholder has been removed.

Testimonials use stable `id` values in `content.ts`; their array order controls the full testimonial page. The explicit `homepageIds` list in `testimonial-content.ts` selects Kinable, Mapwhizz and Rebecca for the homepage, in that order. Required company marks in `testimonial-content.ts` are keyed by that ID, so reordering cannot mismatch a quote and logo. A missing mark fails explicitly. Kinable’s original symbol comes from its official primary SVG; Mapwhizz uses its official favicon. Separate paragraphs with `\n\n`. Maintain the full attributed wording. Case-study `testimonialId` references the same quote, avoiding duplicated copy. Kinable and Mapwhizz were supplied on 25 September.

The user supplied `CS.pptx` on 25 September: Kinable is on slides 2–4, Mapwhizz on slides 5–8 and Love Peace Harmony on slide 9. Kinable was added as one new JSON case; Mapwhizz and LPH were updated in place. Kinable remains in development towards commercial launch. Mapwhizz's remaining legacy-backend rebuild has begun; the source does not establish completion. LPH remains product definition, specification, working prototype and a plan for the full build. The user's directly supplied testimonial quotes remain the source for attributed quotations, rather than the deck's versions. CBA's original narrative is preserved; its timeline summarises the supplied qualification, research and CRM workflow.

Czech Beer Alliance was transcribed from “Case Study - Czech Beer Alliance x BoldLeads.docx”. Editorial notes are excluded from the page. The source separates future work from the delivered engine; `nextPhase` preserves that distinction. No numerical outcomes or prices were added. Its source editorial note asks for client sign-off before publication; this local addition does not change the frozen client preview.

The remaining historical names (`prototype`, `optical-*`) are naming only. The retired experiment switch and alternate page components have been removed. CSS remains layered rather than being reformatted or broadly rewritten during cleanup.

The 25 September local follow-up adds `CaseStudiesPage.tsx`, `ServicePackagesPage.tsx` and `listing-pages.css`. The case index uses wide image-and-text rows with weight-350 page and project headings. Service packages reuse `needs`/`services` from `content.ts` and the same scope renderer as the homepage. Updating a price or scope once updates both views. Each category lead is sticky only when the viewport is wider than 900px and taller than 700px; its separate coloured offer cards remain in normal flow. The services page has no “Explore” label or additional “Not sure” section. Navigation now points to the two indexes; hero “Our services” still opens the homepage section.

These changes are local only. The frozen preview checkout and previously supplied handoff ZIP were not updated.

## Selected navigation and local review variants

The user selected the expanding navigation as the default. Plain `/` starts with a wide transparent bar and contracts after scrolling; all subpages start compact. Default links omit the navigation query parameter. `/?nav=glass` and `/?nav=classic` remain explicit review variants, with header links preserving the selected review parameter across routes. The permanent active underline has been removed; hover feedback and `aria-current` remain. These are local changes; the frozen preview is unchanged.

`src/navigation-preview.ts` handles the parameter and safe internal links; `src/components/useNavigationSurface.ts` reads the section under the navbar once per scroll frame. Photo sections declare `data-nav-tone`; solid sections use their painted background. `src/navigation.css` supplies the selected behaviour, review variants, contrast fallbacks and reduced-motion rules. Glass uses 60% light / 45% dark opacity with a 14px backdrop blur; the open mobile menu and reduced-transparency fallback remain opaque. The homepage bar becomes compact at 96px of scroll and expands again below 32px to prevent jitter. `logo-navigation-light.svg` preserves the original logo geometry and red mark, with cream lettering.

## Media and animation

All required runtime media are local under `public/`. [assets.json](assets.json) lists every retained file, its use and provenance. External source URLs are attribution records, not runtime download dependencies. Source recordings in Downloads are not required for the packaged site.

The current inventory contains 147 public files (65 originals and 82 responsive derivatives). See CASE-STUDY-FIGMA-ASSETS.md for the five active Mapwhizz and eight LPH user-prepared Figma exports, stock photographs and official testimonial marks. Three active Kinable screenshots extracted from `CS.pptx` slide 3 were converted to WebP at quality 91 without changing dimensions; the daily-care image now uses a lossless redacted derivative with only the wellbeing attribution name and preceding separator removed at the user's request. All pixels outside that redaction are identical to the original decoded image. Its original and edit provenance are archived outside public/. The two superseded Mapwhizz report examples from slides 6–7 are archived outside public/ along with the older dashboard and long report. Original deck extraction files are not runtime dependencies.

Local content update, 29 September 2026: AI Automation Starter is £2,500–£4,000 with a 1–2 week duration in the shared `src/content.ts` source used by the homepage and services index. This user-requested update supersedes the historical source copy; it is not yet published.

| Area | Current video | Control |
| --- | --- | --- |
| Hero | `coral-collaboration.mp4`, mobile variant | Muted visible-loop playback, matching poster. |
| First scroll story | `bold-story-scroll-4k.mp4`, mobile 540p variant | Scroll seeking at 30fps, 14.6s. |
| Collaboration bridge | `collaboration-bridge-scroll-4k.mp4`, mobile 540p variant | Scroll seeking at 30fps, 10s on desktop and mobile. |
| Charities / Climate solutions / Wellbeing solutions / Innovators | `audiences/charities.mp4`, `climate-canyon.mp4`, `wellbeing-motion.mp4`, `innovators-conference.mp4` | Only the selected visible film plays, at native speed. |
| Footer | `footer-studio.mp4` | Muted loop only while the exposed footer window is visible. |

The two 4K scroll films account for most of the package size. Their short keyframe intervals intentionally support seeking; current quality is preserved. Replacing them with aggressively compressed long-GOP footage may reintroduce stutter.

First story (`BoldScrollStory.tsx`): progress `[0,.07,.30,.56,.65,.95,1]` maps to seconds `[0,0,3.6,9.1,10.4,14.6,14.6]`, clamped to just before the media end. Headline chapter boundaries use decoded 3.6s/10.7s. Left/right supporting notes reveal at +160/+340 CSS px with 80px fades. Horizontal 7% and subtle vertical feathering hide cropped source edges.

Bridge (`ProcessSection.tsx`, `ProcessFilm.tsx`): progress `[0,.10,.94,1]` maps to `[0,0,9.94,9.94]`. Headline chapter changes follow decoded 1.7s/4.5s. Secondary text starts +160 CSS px after each chapter boundary with an 80px fade. Do not add time-based delays or intermediate playback freezes. The supplied animation itself contains some geometry changes.

`HomeJourney.tsx` changes the background over 560px, finishing 96px before the bridge film enters view. Its exit before testimonials is a hard edge. `SiteFooter.tsx`/`footer.css` extend the film behind the curved panel by 25px on desktop / 17px on mobile.

When replacing a film, update matching posters and `docs/assets.json`. If duration or edit points change, update the related scroll mapping. `npm run validate:assets` catches missing, unlisted and empty public files and literal missing asset references; it does not simulate playback or evaluate arbitrary dynamic URL logic.

## Interaction and accessibility contracts

- `SiteMotion.tsx` follows the OS reduced-motion preference. The footer pause-motion feature and its local-storage preference have been removed entirely.
- Static fallback stories contain all three chapters; they are not just a blank poster.
- Background video playback pauses offscreen and in hidden tabs. Media failures retain posters or readable static content.
- `ServiceFinder.tsx` puts the entire deck into normal flow while any detail is open **or closing**. Restore sticky stacking after the final close animation; mixed sticky/relative siblings caused the previous overlap bug.
- `Disclosure.tsx` exposes expanded state and labelled regions; closing content becomes inert immediately.
- Navbar/mobile menu, anchor navigation, keyboard focus and the skip link are part of the delivered behaviour. Mobile menu uses an animated hamburger and disclosure panel; booking is a bounded button.
- Mobile hero keeps the headline, supporting copy, actions and experience strip over the film. Hero height is at least the viewport height and can grow on short screens; horizontal rules extend to the screen edges. On mobile, scrolling selects the audience and its looping film; the bridge video seeks with scroll in both directions. Reduced-motion retains readable static alternatives.
- Climate uses the client-selected Mixkit canyon clip 41401. Wellbeing starts at source second 5, where arm movement begins.

## Existing release decisions

These items were already present in the project; handoff preparation does not resolve them automatically:

- Confirm commercial wording, current prices, case/project status, testimonials and supplied media permissions with the owner before public launch. Figma exports remain the owner-supplied design evidence; stock licensing and original client-photo sources are recorded in assets.json. Source records are preserved; they are not a blanket license grant.
- Booking points to the existing Google appointment URL; Privacy and Terms point to the current Bold Ideas domain. Verify the intended final destinations when switching domains.
- The site is a client-rendered SPA. Titles/descriptions update in the browser; static per-case Open Graph previews, prerendering and full server-status handling are not implemented.
- No CMS, backend contact form, analytics, cookie-management integration or new hosting setup is included.
- The original supplied font is retained; no separate font-license document was included in the project. Keep the owner's original identity/license records with the final publishing documentation.

## Package boundaries

The handoff archive contains the root documentation, `docs/` and `prototype/` source/configuration/public assets/tests. It excludes dependencies, builds, Git, agent skills/state, screenshots, design explorations and superseded assets. Those exclusions do not affect runtime.

Install dependencies with `npm ci`; regenerate builds with `npm run build`. The ZIP should be handed over as one folder, since asset validation reads `docs/assets.json` from the app's parent. Do not publish the whole source archive as the website document root.


## Local mobile playback update — 29 September 2026

Both scroll films now select 960×540/30fps H.264 Main level 3.1 on narrow or coarse-pointer devices (including landscape). They retain the original duration and mapping, with GOP6, no B-frames and faststart; desktop keeps the existing 4K originals. The first mobile file is about 5.6 MiB instead of 53.6 MiB, the bridge about 3.9 MiB instead of 19.4 MiB. `attachScrollVideo` accepts HAVE_METADATA and wakes on loadedmetadata/canplay, so seeking does not depend on loadeddata arriving first. A single in-flight seek catches up to the latest target, with no timed playback. Offscreen/hidden cleanup and decoded-frame chapter synchronisation remain. The first story no longer switches to stills merely because viewport height is below 620px; short landscape screens use a compact two-column layout. Stills remain for reduced motion and media errors.

`viewport-fit=cover` lets backgrounds extend into iPhone safe areas; `safe-area.css` insets controls and footer copy. The existing section sampler updates the root canvas and theme colour, independently of the Alabaster page background. Browser-owned Safari bars cannot be removed by this site. Physical iOS Safari verification remains necessary; local responsive Chromium checks do not emulate those browser controls. This update is local only and is not on the frozen client preview.

Local media update, 29 September: Services → AI Automation Starter includes the user-supplied Pipeline_Showcase.mp4 below “What you get”, with native playback controls and fullscreen support. The full-duration silent H.264 derivative is 1080p/30fps, 34.967 seconds and 1.48 MB, with a 6-second poster; no autoplay or eager video loading. Homepage service cards are unchanged. LPH hero and all previews now use the supplied sea photograph and Donate screen, with its original 20px presentation frame removed before applying the site’s shared bezel. The dashboard was refreshed from the corrected Figma source, keeping the entire logo. Replaced images and provenance are archived outside public/ in retired-case-media/lph-sea-donate-replacement-provenance.json.
