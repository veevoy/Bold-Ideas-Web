# Handoff verification — 25 September 2026

## Published navigation repair — 29 September 2026

- Reproduced live Case studies navigation returning to the homepage; HTTP probes confirmed 307 redirects on `/case-studies`, `/services` and `/index.html`.
- Added a failing regression for the real asset host's canonical HTML redirect, then changed the Worker fallback to fetch `/` internally. Updated the built hosting integration fixture to reproduce the same redirect.
- Typecheck, build, 25 application tests and 11 hosting tests passed. Frontend bundle hashes and original 4K video bytes are unchanged.
- Published version 3 on the same public domain. Verified actual browser clicks from the homepage to Case studies, Kinable detail and Services, then opened Proof of Product and confirmed its expanded content. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Publication refresh — 29 September 2026

- Removed the sector subtitle from Client in the shared detail template and removed its unused CSS rule. Local browser DOM confirms the CBA facts contain only the client name, with no subtitle span.
- Published the entire current application on the existing domain at the user's explicit request. Earlier local-only notes below are historical; the original handoff ZIP remains unchanged.
- TypeScript, production build, four-project content validation, 55-file asset inventory and all 24 application tests passed in the synchronised hosting checkout.
- All 11 lossless video delivery tests passed. The original 4K film hashes are unchanged.
- Native publication returned `succeeded` for version 2; exact IDs and source commit are recorded in [DEPLOYMENT.md](DEPLOYMENT.md).

## Automated checks

Executed in the cleaned working project and repeated from a separately extracted handoff copy after a fresh `npm ci` from the package registry (75 packages):

- Node.js 25.6.1 / npm 11.9.0 used for this run. The declared baseline is Node.js >=22.18; that exact older runtime was not separately executed.
- `npm run typecheck`: passed.
- `npm run build`: passed, including 2 published case studies and all 37 public assets.
- `npm test`: 12/12 passed (8 case/content tests, 4 Sites worker/build-output tests).
- Sites files exist: `dist/client/index.html`, `dist/server/index.js`, `dist/.openai/hosting.json`.
- Local documentation links resolve; source import graph has no unreachable implementation modules. `vite-env.d.ts` is retained as a TypeScript declaration file.
- Final source archive has an explicit allow-list and ZIP integrity validation. Application files match the clean-install copy that was tested. No dependencies, builds, Git, secrets, agent tools or working screenshots are shipped.

Production bundle after cleanup: JS 416.73 kB (132.04 kB gzip), CSS 74.17 kB (14.57 kB gzip). Large public video files are separate from these bundle sizes.

## Browser checks

Used the locally served production build, not only the development server:

- Desktop 1512×802: homepage renders with current content and hero media; no horizontal overflow.
- Direct `/work/love-peace-harmony` route: correct title/content and loaded community photograph.
- Direct service anchor: Tech Strategic Compass opens; all four service cards use normal flow while expanded; no broken loaded images.
- Innovators background: conference MP4 loaded at readyState 4, playing at native rate 1.
- Mobile 390×844: audience video loads; document width remains 390px.
- Manual motion-off: all three first-story stills and all three bridge stills render; footer video is removed. Motion restored afterward.
- Mobile `/work/mapwhizz`: correct case, loaded illustration and no horizontal overflow.
- Browser error log: empty at the end of the check.

This was a focused cleanup regression check. It is not a new full accessibility audit, real-device performance test or production deployment. OS reduced-motion implementation is preserved; this run exercised the manual preference rather than OS emulation.

## Cleanup performed

- Public assets reduced from 68 files / 244.9 MiB to 37 files / 114.3 MiB. About 130.6 MiB of retired videos, stills and unused imagery removed.
- Removed 11 retired source files: old hero/process components, the original alternate rationale/film component, unused stylesheets and the comparison flag.
- Removed `?story=original` comparison routing. The default current homepage is unchanged.
- Removed old design experiments, generated mockups, review screenshots, archives and superseded iteration logs.
- Consolidated current documentation and active provenance. Original live-copy evidence and the case-study editing guide remain.
- Preserved native current 4K footage, all active posters/static alternatives, brand files, source content, package lock, Sites adapter and existing tests.
- Git history and local installed dependencies were not deleted; they are excluded from the handoff. Generated build output is also excluded and can be regenerated.

Removed/replaced working files were verified in a temporary recovery archive outside the project before cleanup. The recovery archive is not part of the client handoff.

## Local follow-up — 25 September 2026

This section records subsequent local changes. The published client preview and original handoff archive above remain frozen.

- Added `/case-studies` and `/services` indexes using existing shared content. Existing `/work/:slug` details and service deep links remain functional.
- `npm run typecheck` and `npm run build`: passed. `npm test`: 14/14 passed (8 content, 4 worker, 2 routing). Asset validation: 38 active files.
- Browser checks: both indexes at desktop and actual 390px iframe widths; open service scope and direct service anchor; desktop navigation right inset 7px; longest audience heading fully visible at 957px and 390px.
- Mobile hero supporting copy appears below the film. Hamburger-only animated menu has no divider stack and a bounded booking action; Escape closes it and closed content is inert.
- Native browser scroll input at 390px switched climate to wellbeing. Client-selected canyon and meditation trimmed from source second 5 loaded correctly.
- Mobile bridge loaded its 1920×1080/30fps derivative: forward scroll moved from 0s to 8.52s, reverse scroll to 4.13s, with corresponding chapter headings.
- Manual motion-off rendered three static bridge steps and compact audience selection; motion restored afterwards.
- Independent finish review: disposition `ship`, no material fixes. Documentation review confirmed the existing design system is preserved.

Checks used the local Vite server and desktop browser with 390px iframe viewports; no physical iOS/Android device test or new publication was performed. Temporary QA HTML was removed.

## Local content update — 25 September 2026

- Added the full supplied Kinable and Mapwhizz testimonials, preserving Mapwhizz’s three paragraphs and both attributions. Six entries share the homepage carousel and `/testimonials`; Mapwhizz’s case detail references the same quote by ID.
- Added `/work/czech-beer-alliance` from the supplied DOCX, automatically included in the home/index/next-story collection. The shared template supports optional lists, closing paragraphs, outcome body copy, a separate future phase and project-specific contact copy. Original cases remain valid.
- Added the official CBA brewery photograph and its provenance. It shows the client’s brewery context, not the delivered software. Source editorial notes remain out of public page copy; the planned outreach features remain in “What’s next”.
- Browser checks in the local Vite preview: CBA opening at 1280px, actual 796px pane and 390px iframe; mobile prose/lists; desktop outcome; full Kinable/Mapwhizz quotes and attribution; Mapwhizz detail quote; CBA index link; carousel switching to Suzanna. No horizontal overflow at the checked widths, cover loaded at 1920px, no browser errors.
- Automated verification: TypeScript passed; 16/16 tests passed (10 content, 4 worker, 2 routing). Production build passed with 3 published case studies and 39 inventoried assets.
- Temporary browser QA HTML was removed. Checks do not constitute a physical-device test. Published client preview and original handoff ZIP remain unchanged.

Independent content-extension finish review: `ship`, no material fixes. Existing design-system files remain unchanged. The Impeccable detector was unavailable (launcher permission denied); review used source checks and the captured responsive views.


## Local hero and navigation comparison — 25 September 2026

- Hero now fills at least the viewport height, without the former 1040px cap. Horizontal rules extend to both screen edges. All mobile hero copy/actions/experience remain over the film, replacing the earlier split documented above.
- Added two opt-in local comparisons: `?nav=glass` adapts its translucent ground, lettering and logo to the section below; `?nav=expanding` starts transparent and content-width, shrinking to the compact white navbar on scroll. The unparameterised default retains its white navigation pending selection.
- Homepage now contains only Kinable, Mapwhizz and Rebecca. Browser verified all three controls, Rebecca-to-Kinable wraparound, and all six entries after following “All testimonials”.
- Responsive browser checks: 2560×1440 actual iframe (hero 1440px, full-bleed rules), 390×844 (hero 844px, all content over the image), 320×568 (hero grows to 740px; scroll reveals remaining content), and the actual 957px browser pane. No horizontal overflow at those widths.
- Expanding navigation changed from 1744px to 620px width after scroll; glass navigation changed from dark translucent green to light translucent white over a light section. Open mobile menu has a solid readable ground; Escape closes it and restores inert/hidden state. Reduced-motion transition overrides remain in source; OS preference was not emulated in this pass.
- TypeScript and production build passed. 19/19 tests passed (10 content, 4 worker, 2 routes, 3 navigation preview). Asset validation passed for all 40 files. Browser error log was empty.
- Temporary responsive QA HTML removed. Screenshots are local QA artifacts, outside public assets. No physical-device test, deployment or handoff ZIP update was performed.
- The Impeccable detector was attempted once but could not run (launcher permission denied); responsive captures and source inspection provide the review evidence.

Independent finish review: `ship`; all nine supplied responsive/state captures were valid and no material fixes were requested. Header navigation was also checked across the case-study route: the selected proposal parameter persists and glass switches to its light tone.


## Local editorial case-study layout and clearer glass — 25 September 2026

- Glass navigation now uses 60% light / 45% dark surfaces and 14px blur; photo backgrounds remain visible through it. The default white and expanding proposals remain unchanged.
- All three cases use a large headline, wide cover, facts beside the overview, then a shared reading column interrupted by chapter images. Desktop pairs stack on mobile. Full client narratives, lists, testimonial attribution and the separate future phase are preserved; original JSON narrative values were compared before/after excluding image metadata.
- Mapwhizz uses four credited design mockups from the designer’s public portfolio. CBA and LPH each contain three credited photographs contextualising the client’s work. Images are optional per chapter and remain editable in JSON without touching components. Retired Mapwhizz optical illustration removed; all public media are inventoried.
- TypeScript, production build and 20/20 tests passed (11 content, 4 worker, 2 route, 3 navigation). Content validates 3 published studies; inventory validates 46 files. The new content test checks optional chapter media, empty/missing media and precise nested validation failures.
- One batched browser pass plus one confirmation after removing redundant mobile chapter labels: actual 1280px desktop iframe, 390px CBA, 320px Mapwhizz and the actual intermediate pane; no horizontal overflow at checked widths. Inspected headline/cover, overview, long prose, full-width photography, uncropped image pairs, their mobile stacking and the multi-paragraph quote/outcome. Glass was inspected on both photographic hero and light detail backgrounds.
- The normal homepage and Mapwhizz route logged no browser errors. Temporary responsive iframe wrappers reported a MutationObserver injection error on creation/navigation; app source and the wrapper contain no observer, and the same route was clean outside the wrapper. This is recorded as a QA-tool limitation rather than claimed as an app pass. Native touch hardware, full zoom/browser matrix and OS transparency preference were not emulated in this pass.
- Impeccable detector was attempted once and failed with permission denied (126). Manual structural inspection and browser evidence were used; the unavailable detector was not rerun.
- Local only. No source push, hosted-version update or redeployment; the frozen client preview and earlier handoff ZIP are unchanged.

Independent finish review: `ship` after the single requested fix to remove redundant mobile chapter labels; the same mobile prose capture was rechecked. All narrative copy remains intact. Temporary QA HTML/tabs were removed and no QA files are in the build.

Independent documentation check confirmed the shared template, editable fields, image counts/provenance and glass values. The related-story label in the editing guide was corrected to “More stories”. Existing Impeccable sidecar drift was left untouched.

## Selected navigation, case studies and service packages — 25 September 2026

- The selected expanding navigation is now the unparameterised default; home starts transparent at content width and becomes a 620px white bar on scroll. Subpages use the compact form. Explicit glass/classic review URLs remain available; default links no longer add review parameters. Permanent active-link underlines are removed; hover and focus affordances remain.
- Case details put the project name above the headline. Shared corner stars frame project facts and complete testimonials. Outcome rules appear above and below the section with a star centred on each. Visible photo captions/credits are removed; descriptive alt text and source metadata remain.
- `CS.pptx` supplied by the user provides the new Kinable story (in development), fuller Mapwhizz and Love Peace Harmony stories, three actual Kinable build screens and two Mapwhizz example reports. Report figures are not used as impact metrics. Mapwhizz's remaining legacy rebuild has begun, not been declared completed. The original directly supplied quotes and CBA story are retained.
- The case index uses wide image/text rows without the previous scope-divider clutter. Services use sticky category leads beside separate coloured disclosure cards, reverting to normal flow on narrow/short screens. Removed “Explore this package” and the redundant “Not sure where to start?” section. Qualified commercial content remains shared with the homepage.
- Manual motion preference and footer control are removed. OS reduced motion still controls static alternatives and animation behaviour; saved legacy manual preferences no longer override it.
- Automated checks: `npm run typecheck`, all 20 tests, and `npm run build` passed. Content validation finds four published projects; asset inventory validates 51 runtime files.
- One batched browser pass inspected 1280px desktop and 390px mobile iframe layouts plus the actual 796px pane. Checked index/detail opening, phone screenshots, mobile facts frame, full three-paragraph Mapwhizz quote, both outcome rules, expanded service cards and default navbar scroll states. No horizontal overflow in the checked layouts; desktop service lead stayed at 132px while its open card scrolled, and mobile lead was static. Navigation measured 1178px expanded / 620px compact, with the active underline at scaleX(0).
- Evidence: `/tmp/bold-final-review/` viewport captures. The responsive harness uses scaled same-origin iframes; grey outside them is test canvas. The native Mapwhizz page logged no errors. Native touch hardware, OS preference emulation and a complete browser/zoom matrix were not exercised in this pass.
- No publication, hosted snapshot update or handoff ZIP regeneration. Temporary QA files and tabs are removed after review.

Independent finish review: `ship`, no material fixes. All 13 requested viewport/state captures and two supplemental captures were valid. The existing independent reviewer was reused after the tool refused a fresh reviewer thread at its thread limit; it received only the new review packet and did not inherit the builder's transcript for this task.

Documentation handoff completed: DESIGN.md, PRODUCT.md, application AGENTS.md, HANDOFF.md, content/source records and the Czech case-editing guide match the finished implementation. Portrait containment is documented for details/index/next-story; homepage retains its existing cover crop. No unresolved scoped documentation contradictions.

## Branded case index, related stories and project timelines — 25 September 2026

- Case index now uses project-name-led previews in a continuous ruled grid, with Cinnabar stars at its joins. Mobile stacks image and text and moves the stars to the left-hand rule starts. Shared `CaseStudyPreview` preserves complete portrait screenshots.
- Related stories now show the next two published projects as smaller image-over-copy links, with equal-height image frames. Removed the large separate Read the story button and its unused hover rules. Empty/single-project navigation is handled and tested.
- Optional validated `timeline` data is populated for all four cases from the supplied deck and CBA narrative. Kinable development and Mapwhizz's remaining backend rebuild remain in progress. Full existing narratives, quotes and media metadata remain. Horizontal desktop milestones align their text rows; at 900px and below they use a vertical line.
- Final checks: TypeScript passed; production build passed; all 21 tests passed (12 content/model, 4 Sites adapter, 2 routing, 3 navigation). Content validation finds four published cases; asset inventory still matches all 51 public assets.
- Browser evidence: `/tmp/bold-case-brand-review/` contains six desktop/mobile index, timeline and related-story captures. Actual iframe widths were 1280 and 390 CSS px; grey outside is QA canvas. Observed no horizontal overflow, no broken images, equal related-image heights and aligned timeline descriptions. Following the Mapwhizz related link reached its detail. An independent visual/source assessment found no material blocker.
- The responsive harness logged MutationObserver errors without an application source; native detail navigation did not reproduce them. The native tab's older errors were transient Vite hot-reload messages while exports and props were being updated. No new application error appeared after the completed implementation was loaded. Temporary QA HTML and tabs were removed.
- Shadow report: no authored text-shadow exists, and runtime detail inspection found only the intentional header box-shadow. The user clarified the symptom appears primarily on one external monitor and not on the Mac display. No speculative CSS or motion change was made; a display-specific cause is suspected, not confirmed.
- Local only. The frozen hosted preview and original handoff archive were not updated. Physical-device testing, external-monitor diagnosis and a full cross-browser matrix were not performed.

## Photographic case heroes and microanimations — 25 September 2026

- Case details now use a full-bleed photographic hero with the project name above a centred headline. Optional validated `hero.background` and `hero.screen` separate atmosphere from evidence. Kinable and Mapwhizz use two generated illustrative backgrounds with their original supplied product screens. LPH and CBA retain client-context photographs without fabricated interfaces. Prompts and output paths are in `CASE-HERO-MEDIA.md`.
- Timelines occupy Green bands; full attributed testimonials sit on Lavender, with the existing star frames. Outcome framing and complete source narratives remain. Solid surface contrast ratios: Paper/Green 12.00, supporting light copy/Green 9.71, Lavender/Green and Green/Lavender 6.51.
- Shared once-only viewport entrances cover case previews, detail chapters/media and service cards. Copy moves 16px; media reveals its lower edge. No text blur/shadows or persistent transformed text layers. Keyboard focus cancels an active entrance; OS reduced-motion skips it. Preview hover gently scales imagery and moves the arrow. Existing disclosure animation and sticky category leads are preserved.
- Removed the homepage Coming soon case-study placeholder and its unused styles. Only published projects remain.
- TypeScript and production build passed. All 22 tests passed: 13 content/model, 4 Sites adapter, 2 routing, 3 navigation. New content test validates optional hero layers, unsafe paths and dimensions, and media collection. Four published case studies and all 53 runtime assets validate.
- One batched browser pass used 1280px desktop and 390px mobile same-origin iframe viewports. Screenshots in `/tmp/bold-case-hero-review/`: Kinable and Mapwhizz heroes at both sizes; LPH photograph-only hero; desktop/mobile index; Green timeline; Lavender mobile testimonial; expanded services on both sizes. Original screen aspect ratios remain intact and checked mobile pages have no horizontal overflow. Keyboard Enter expanded Tech Strategic Compass on mobile and Proof of Product on desktop; `aria-expanded` updated, focus remained visible, and the desktop category lead retained `position: sticky` with no transform.
- Native Kinable detail loaded after the finished edits with an empty error log. Temporary responsive HTML and tabs were removed. This was not a physical-device, OS-preference-emulation, external-monitor or exhaustive cross-browser performance test. Reduced-motion and failure fallback paths were checked in source.
- All edits remain local. No hosted preview or handoff archive update.


## Unified layered heroes, parallax and Green quote cards — 25 September 2026

- Removed All case studies links from the case-detail hero and More stories heading. Global navigation and the homepage index link remain.
- All four heroes now include a foreground image over a separate photo background. Kinable and Mapwhizz retain genuine interface screens; LPH and CBA use their existing photographs without browser/device chrome. No new media or claims added.
- Motion scroll values translate only the background by 0–20% of its own height as the hero leaves view. A 120%-height layer and clipped hero provide overscan. OS reduced motion uses a static 100%-height image; title and foreground never receive the parallax transform.
- Replaced the Lavender testimonial band with a Green card on the Alabaster page. Paper quote/name and light secondary attribution preserve the full original wording and four red corner stars. Measured solid contrasts remain 12.0:1 and 9.71:1.
- TypeScript, production build and all 22 tests pass. Four published projects and all 53 media assets validate. The schema test fixture explicitly omits optional hero metadata so its fallback tests remain independent of the now-configured LPH hero.
- One browser batch covered LPH desktop and CBA mobile layered heroes, Kinable desktop Green quote card and Mapwhizz mobile long quote. Native Kinable parallax moved the background 105.879px after 441px of page scroll; mobile moved it 69.12px after 288px. The background remained beyond the visible hero edge. At 390px, no horizontal overflow was observed. Computed quote section background is transparent, card Green, quote Paper and author role #d5dfd9. Native page error log was empty.
- Evidence: /tmp/bold-case-parallax-review/. Same-origin responsive iframe widths 1280/390px and native 796px pane; no physical-device or OS preference emulation. Removed temporary QA files/tabs. Client preview and handoff archive remain frozen.

## Layered thumbnails and readable quotations — 25 September 2026

- Shared CaseStudyThumbnail now pairs the existing hero background with the complete foreground screen or project photograph on the homepage, case index and related stories. Homepage scroll and preview hover move only the background; reduced motion remains static. No public media were added (53 assets, four published cases).
- Case-detail quotations and authors align left. Multi-paragraph homepage quotations also align left, preserving Mapwhizz’s full three paragraphs. Confirmed quote and author share the same left edge.
- Batched browser review covered homepage/index at 1280px and 390px, Mapwhizz detail quote at both widths, related previews, homepage carousel selection and navigation from the CBA related preview. Foregrounds preserve their aspect ratio and checked pages have no horizontal overflow. Evidence: `/tmp/bold-thumbnail-review/`.
- The temporary iframe harness logged MutationObserver errors during some navigations; native app-tab error logs were empty. No MutationObserver is authored in application source. Physical-device and cross-browser testing were not performed. Temporary harness and QA tabs removed.
- Final typecheck, production build, content/asset validation and all 22 tests passed. All changes remain local; frozen client preview and original handoff archive were not updated.

## Supplied Figma imagery, real stock backgrounds and consistent quotes — 25 September 2026

- Read-only Figma exports: three LPH frames (dashboard, homepage, meditation library) and three Mapwhizz frames (overview, report setup, CO₂ comparison). These replace provisional media in details and shared thumbnails. Original dimensions and full frames retained in lossless WebP. Sources and node IDs: CASE-STUDY-FIGMA-ASSETS.md and assets.json.
- Real stock photographs now supply the LPH forest and CBA brewery backgrounds. No new generated imagery was shipped. Superseded standalone photographs of people and two replaced Mapwhizz mockups were removed from runtime assets. The original design content within exported screens is unchanged.
- Preview backgrounds use a 56% dark overlay; hero overlay is 72%–48%. Foreground images remain unaffected and uncropped. Existing parallax and reduced-motion rules are preserved.
- All quotes and author blocks align left across homepage, case detail and testimonial index. Every author has a circular company mark; Kinable and Mapwhizz use official marks. Full quotations and factual case narratives remain unchanged.
- One batched CUA inspection covered LPH at 1280px, Mapwhizz hero and long Green testimonial at 390px, desktop case-index thumbnails, all six testimonial author/logo pairings and computed homepage alignment for all three slides. No horizontal overflow at checked widths; hero files loaded. Native LPH route error log was empty. Responsive checks use same-origin iframe viewports, not physical devices.
- Typecheck, production build, content/asset validators and all 22 tests pass. Inventory: 56 assets, four published case studies. Temporary review harness and tabs removed. Client preview and handoff archive remain frozen; all changes are local.

## Final hero scale, optical navigation gaps and homepage marks — 25 September 2026

- LPH hero/previews now use its authentic Figma homepage; Mapwhizz uses the travel-time analysis report detail (1512×1068 viewport of the supplied long design). Rounded dark bezels apply to hero/previews and chapter screenshots marked `presentation: "screen"`. Original photographs and already composed device mockups remain unframed.
- Thumbnail shade reduced to 32%; hero shade is 60% at the top, 36% in the middle and 20% at the bottom. Existing background parallax and reduced-motion handling remain.
- Kinable at a 2560×1440 CSS viewport has a 388.8px-wide phone (previous cap 270px), contained within the 1440px hero. The composition is vertically centred. Compact navbar gaps measured 48.16/48.15px; expanded homepage gaps 324.45/324.45px at 1280px. SVG horizontal whitespace was trimmed without modifying logo paths.
- Homepage logos are Tesco, Mapwhizz, LPH and Kinable. Original complete client marks load correctly, rendered monochrome on the film. The qualifying subtitle is removed per explicit user instruction. Superseded logos/screens retired from public media.
- One batched CUA review covered 2560×1440 Kinable, 1280×900 LPH/homepage/case index, and 390×844 Mapwhizz/homepage. No horizontal overflow on inspected routes; report and homepage assets load with their expected rounded frames. Native homepage error log empty. These are browser/iframe viewport checks, not physical-device tests. Temporary review files and tabs removed.
- Typecheck, production build, content and media validation, and all 22 tests pass. Inventory: 55 public files, four published projects. Client preview and handoff archive remain frozen; local-only changes.

## Service-card weight and restored media detail — 25 September 2026

- Homepage need-card titles now use weight 350, matching the main section headings. No sizes, copy or disclosure behaviour changed.
- Restricted the transparent screenshot wrapper to landscape media. Portrait Kinable chapter images keep their original #e9ddf3 background and the new dark rounded phone bezel. This fixes the selector-specificity regression introduced with the screen frames.
- Mapwhizz’s original pin retains its internal clock detail in the monochrome experience strip: the three original white paths are now transparent mask cutouts instead of being flattened into the white pin. Original geometry and wordmark retained; asset provenance updated.
- Batched CUA review at 1280px and 390px confirmed the restored phone panels, title weight 350 and no horizontal overflow. The rendered homepage strip shows the pin’s internal clock. Typecheck, build, 55-file inventory validation and all 22 tests pass. Temporary harness removed. Local changes only.

## Scroll rendering and mobile logo alignment — 25 September 2026

- Investigated the reported flickering of assorted homepage elements. Before edits a cold 1440×900 homepage held 481 paused Web Animations; at the first case row it still held 390 paused effects. TextReveal and ContentReveal now create animations only when entering view, then cancel finished effects. At the same first-row position only the active entrance plus one paused background marquee remained (37 total, one paused); the resting mobile footer and case index had one and zero animations respectively.
- Replaced the four viewport-fixed case-copy layers and clip paths with absolutely positioned, row-contained layers under ordinary overflow clipping. Scroll compensation retains the existing viewport-centred composition, opacity timing, headline spread and background parallax. Mobile/static/reduced-motion layouts remain in normal flow. Service stacking and disclosure logic are unchanged.
- CUA desktop review at 1440×900 covered forward/backward case scrolling, complete readable titles on revisit, a service open/close cycle and restored sticky stacking. No document-height changes occurred while scrolling case rows. Opening/collapsing a disclosure changes height as expected; open cards all had relative positioning and no scale, and closing restored sticky positions 104/124px for the first two cards.
- At 390×844, compact navigation logo inset is 20px. The mobile footer signoff's image box begins at 9.2089px; the original 8.2173% internal SVG whitespace places its visible ink at 24px, aligned with copyright. No mobile horizontal overflow. Mobile case-index entrances also completed normally.
- Typecheck, production build, all 22 tests, four-case content validation and the 55-file media inventory passed. Native homepage console error/warning log was empty. The temporary iframe harness emitted its previously observed MutationObserver integration errors during reload/navigation; a later frame-scoped DOM lookup timed out, while screenshot and native-page checks worked. Temporary harness and tabs removed.
- The user's intermittent flicker was not reliably reproduced before the changes, so these address verified animation overhead and overlapping-layer risks, not a proven device-specific root cause. No physical-device, external-display or cross-browser GPU test was performed. All changes are local; the hosted client snapshot remains frozen.

## Case-copy scroll smoothness regression — 25 September 2026

- The user reported jumpy central copy after the row-local rendering change. Removed the new per-frame JavaScript counter-scroll, its scroll-span MotionValue and ResizeObserver. Native sticky positioning now holds a viewport-height copy layer within a vertically extended track, clipped by the row. The authored ±90px drift, opacity, line spread, one-time reveal and background parallax remain. Deferred animation allocation from the earlier fix is retained.
- CUA checks at 1440×900 and 2560×1440 confirmed the sticky layer's base top stays at 0px throughout visible row traversal, including reverse scrolling; scroll no longer requires a matching JavaScript translation to cancel page movement. Document height remained stable and no horizontal overflow occurred. At 390×844 the track/content are static, full copy remains readable and no overflow occurred. Native homepage console had no errors/warnings.
- Typecheck, production build, all 22 existing tests and the four-case/55-asset validators passed. Temporary responsive harness removed. These checks cover browser viewport behaviour, not a high-refresh-rate external-monitor recording. Local only; hosted client snapshot unchanged.

## Compact mobile process spacing and matching navigation — 25 September 2026

- Removed the mobile-only How we work link; mobile now maps the same navigation content as desktop (Case studies, Services, About), followed by its booking CTA.
- At widths up to 699px, bridge media top-aligns instead of centring in the remaining viewport space. Short headings bottom-align within the existing reserved chapter height, eliminating unused space beneath single-line headings. Subtitle margin is 12px and the copy/media grid gap is 16px. Film timing, scroll distance, stable chapter sizing and desktop layout are unchanged.
- CUA review at 430×932 confirmed Agree the way forward has a 12px title/subtitle gap and film top 319.39px (previously 500.26px). At 360×740 the final chapter and full film fit; film ends at 505.53px and no horizontal overflow occurs. Opened/closed mobile menu and verified its four links. At 1440×900 desktop retains centred media, 24px grid gap and 24px subtitle margin.
- Typecheck, build, all 22 tests, four-case content validation and the 55-file inventory passed. Temporary QA harness/tab removed. Local only; no publication.

## Balanced mobile process composition — 25 September 2026

- Centred the compact headline/subtitle/film group inside the mobile pinned stage, reserving 96px above and 32px below. The second grid row now uses the film's natural 16:9 height instead of filling remaining viewport space; its zero minimum allows it to shrink if needed. The earlier 12px subtitle margin, 16px copy/media gap, chapter sizing and scroll/video mapping remain intact. Desktop and reduced-motion static layouts are unchanged.
- CUA inspection at 430×932 measured the whole group from y=277.87 to 718.13, with the full 414×232.88 film. At 320×568 it fits from y=130.48 to 501.52 with the full 304×171 film. Neither width has horizontal overflow. These are responsive browser viewport checks rather than physical-device tests.
- Typecheck, production build, all 22 tests and both content/asset validators passed (four projects, 55 files). Local-only change; hosted preview unchanged.

## Responsive images and Kinable background blur — 29 September 2026

- Kinable hero and shared thumbnails now blur only the photographic background by 4px, with overscan covering the filter edges. The foreground phone remains sharp; background parallax and reduced-motion behaviour are preserved.
- Added 82 responsive WebP derivatives for 36 originals, selected by srcSet/sizes. Full authored Figma exports remain lossless; source-pixel UI crops retain their original assets. The reproducible media:responsive script updates both its manifest and the 147-file public inventory, and skips variants larger than their originals.
- Six static scroll-video posters now total 1,046,596 bytes, down from 4,802,832 bytes (78.2% reduction). Kinable’s 710,914-byte background has 46,020-byte, 153,134-byte and 283,718-byte variants. Removed the global homepage-poster preload from unrelated routes. Existing below-fold lazy loading, mobile video derivatives and offscreen playback guards remain.
- Updated Vite to 6.4.3 and compatible vulnerable transitive dependencies. Full npm audit reports zero vulnerabilities. TypeScript, production build, content/asset validators and all 32 tests pass. Production bundles: JS 464.33 kB / 145.18 kB gzip; CSS 101.92 kB / 19.56 kB gzip.
- One production-preview browser review covered Kinable at 1280×720 and 390×844. The mobile browser selected its 480px / 46 kB background, computed blur is 4px on the background and none on the phone. LPH’s mobile gallery selected the 480px dashboard derivative and loaded it successfully. Both mobile routes have 390px document width without horizontal overflow. Temporary viewport and QA tab removed.
- These are file-size measurements and browser viewport checks, not physical-device tests or a Lighthouse/Core Web Vitals benchmark. The user explicitly authorised uploading this release to the named GitHub repository and replacing the existing client preview; see DEPLOYMENT.md for the completed publication record.

## Mobile MP4 byte ranges — initial local verification

- Live evidence on 29 September: both mobile MP4 URLs ignored `Range: bytes=0-1` and `Range: bytes=1000000-1001023`, returning HTTP 200 with the complete 5,823,461-byte / 4,128,088-byte files. The desktop story returned the requested two bytes with HTTP 206. This is a concrete delivery fault consistent with the reported iPhone/Safari disappearance, not a physical-device reproduction.
- The application Worker now supplies exact single byte ranges when an MP4 asset binding returns an uncompressed whole-file response. Native 206 responses pass through. The repair preserves full-file and HEAD responses, strong If-Range semantics, and handles middle/open-ended/suffix/clamped/unsatisfiable ranges. It streams the selected bytes and cancels the remaining asset read; no media transcoding or frontend animation changes.
- Four regression cases failed against the previous source. An integration test also failed against the previous built Worker, then passed after rebuilding. Final TypeScript, production build, content/assets validation and all 39 application tests passed. Real mobile MP4 byte comparisons cover the beginning, middle and end of both files; a chunked-stream test covers cancellation without whole-file buffering.
- NOT deployed or pushed. Automatic approval review rejected preparation of a new Sites publication because it required explicit consent for the new deployment. The existing public version remains version 4. Once approved, open the same Site, copy the changed Worker/tests, preserve the large-video adapter, publish and verify actual HTTP 206/Content-Range/body bytes on the live mobile URLs. If the host serves public MP4 assets before the Worker, route them through internal asset paths as the desktop adapter does. A physical iPhone/Safari retest is still required after publication; local tests alone do not establish that the reported visual symptom is resolved.

### Approved follow-up: route mobile films through the media adapter

- The user explicitly approved publishing the repair to the same preview and GitHub. Version 5's live probes still returned whole files, proving the platform's direct-asset path bypassed the regular Worker for these existing public MP4s.
- Added `scripts/package-mobile-scroll-media.mjs`. The isolated hosting build merges its manifest into the existing range-enabled desktop media adapter. It removes the two direct MP4 build outputs and stores identical bytes in internal, content-addressed parts up to 4 MiB. The ordinary static build and source MP4s remain unchanged.
- New hosting integration tests simulate asset-first routing and failed with 200 before the packaging change; both now pass with exact 206 bodies. A repository test verifies that direct mobile build paths are absent and that all parts reassemble byte-for-byte to both original files. Final live verification follows publication below.

### Final published verification

- Version 6 succeeded on the unchanged public preview domain. Both mobile MP4s now return HTTP 206 and correct Content-Range for beginning (0–1), middle (1,000,000–1,001,023) and final 1,024-byte requests. All six downloaded bodies exactly match their corresponding original source bytes.
- Final suites passed: 40 application tests and 13 hosting/media integration tests. TypeScript, production build and four-case/147-file validators passed. No frontend visuals or media bytes changed. Physical Safari/iPhone retesting is still outstanding; the server delivery fault is verified fixed. Publication identity and source commit are in DEPLOYMENT.md.
