# Current design and interaction rules

This file describes the implemented September 2026 website. It replaces the older concept and iteration logs; there is one active visual direction.

## Identity and layout

- Overused Grotesk variable font, served locally from `prototype/public/brand/`.
- Alabaster `#F8F3EC`, Green `#173438`, Cinnabar `#E8502F`, Lavender `#C7A8F2`. Shared variables are in `prototype/src/optical.css`; section-specific tokens are in the corresponding stylesheets.
- The selected navigation starts wide and transparent over the homepage hero, then contracts into a warm near-white floating bar. Subpages begin with the compact bar. Its supplied wordmark omits the small consulting line; full original wordmarks remain in the footer.
- Content width is capped at 1920px with responsive gutters. Large lightweight headings, generous open space, fine rules and the original curved four-point star in Cinnabar or Lavender form the layout vocabulary.
- Brand stars mark real grid/rule joins. Colour is assigned per section via `--junction-color`, never alternated between corners of a single frame: Lavender in the homepage hero, audience timeline marker, case previews/index/related stories and testimonial/facts frames; Cinnabar in the first story, About benefits, process, outcome rules and contact. Introduce Lavender before the service cards so their large colour field feels continuous with the identity. Homepage project labels and the selected testimonial indicator use Cinnabar ink `--red-text`; the full testimonial page retains darker Lavender numbering `#735199`. Preserve existing CTA colours, client-brand artwork and service-card grounds. Avoid duplicating shared junctions at mobile breakpoints.
- Keep the distinction between photographic illustrative films, abstract animation and actual case evidence.

## Page composition

1. Photographic hero film, original headline and positioning, booking CTA and experience strip (Tesco, Mapwhizz, Love Peace Harmony, Kinable; no qualifying subtitle). Hero fills at least the viewport height, with horizontal rules extending to both screen edges. On mobile, all content stays over the film; compact type and spacing preserve room for the image. Content may make very short viewports taller rather than being clipped.
2. First scroll-controlled illustrative film with centred claims and two supporting notes, then readable longer context.
3. Four audiences, each with its own centred phrase, short description and background footage.
4. Case-study previews linking to shared-template detail pages.
5. Four service cards covering six offers. Qualified pricing and timing remain visible before expansion.
6. Collaboration introduction followed by a centred heading, secondary paragraph and bridge film for each of three stages.
7. About benefit grid; a hard edge returns to the light testimonial section.
8. FAQ, contact panel, full footer and photographic footer video.

## Case-study detail

One editorial template serves all project JSON. The project name sits above a centred headline on a full-bleed photographic hero. Projects with a supplied `hero.screen` show it below the headline over a separate photographic background. A `hero` with only `background` intentionally has no foreground (CBA). Supplied product screens use a contained phone or browser panel; ordinary photos have no device chrome. Kinable and Mapwhizz use quiet real stock backgrounds: edge foliage and simple pale architecture. LPH uses the sea/sky background supplied in the user’s Figma composition. CBA uses its original brewery courtyard photograph from the client website, clearly connecting the hero and thumbnails to the brewery. Foregrounds remain the working Kinable app, LPH Figma Donate screen and Mapwhizz Figma report detail. CBA shows only its background photograph in hero and thumbnails, since this engagement did not include interface design. Backgrounds avoid people and busy scenes. A light 10% tint in thumbnails and a 52% / 24% / 8% hero gradient preserve the photography while supporting the heading. Prefer real stock photography before generation. Compact facts sit inside a fine frame with a four-point star at each corner, beside the overview. Subsequent text holds the same right-hand reading column and alternates with editorial compositions of authentic UI details. JSON showcases select source-pixel crops, arranged on solid client-colour grounds: mint and blue-grey for Mapwhizz, lavender for Kinable, warm gold for LPH. Use complete UI components with their labels intact, not repeated full app windows. Selected website sections sit upright and complete inside fixed 3:2 paired compositions (`pages`). Analytical pairs (`stack`) use a larger primary view and a supporting detail, stacking vertically on mobile. Single screens use intrinsic height, capped at 68svh plus canvas padding. Kinable phones share a frame size and original bottom-navigation alignment. Other detail layouts keep their reading order on mobile. Mapwhizz body media now uses five finished compositions supplied by the user in Figma section 1492:8466. Preserve their exact backgrounds, framing and scale relationships through full-frame lossless images in `artwork`/`artwork-pair`; add no further canvas or frame. The two portrait compositions sit side by side. The repeated report overview is omitted, and the postcode table precedes the commute graphs. Ordinary context photographs retain the original image treatment; Mapwhizz photographic phone mockups and company setup are retired. Homepage, index and related-story thumbnails use CaseStudyThumbnail. LPH uses the Donate screen over its supplied sea background (`thumbnailTone: light`); Mapwhizz pairs the hero architecture photograph with a complete commute-graph panel via `thumbnailScreen`, leaving the hero screen unchanged. LPH body media now uses eight finished compositions supplied in Figma section 1935:9606, kept intact through lossless full-frame `artwork`/`artwork-pair` images. The sequence is dashboard, About/song pair, donation, volunteering, Global Map/sign-in pair, and events/projects. Preserve the supplied sky/forest photographs, solid gold/cream grounds, translucent frames and internal crops. Add no extra frame, crop, shadow or padding. Pairs remain side by side on mobile. Previous full-page sources are archived outside public/. The dashboard is refreshed from the corrected Figma source so its logo is complete. Kinable retains its phone over the sky, and CBA retains the courtyard alone. Photographic preview backgrounds may move; their foregrounds and all hero screens remain complete. Kinable and Mapwhizz heroes retain their original screens.

The supplied reference informs this rhythm, while the existing type, palette and four-point star remain. Mobile collapses to a single reading order and omits the redundant desktop margin labels. Full attributed quotes use the same four-corner frame as the facts, as a Green card with Paper text on the surrounding Alabaster page. Only the card is coloured; the section is not a colour band. Every quotation and author aligns left on the homepage, detail and testimonial index. Every author has a circular company mark before the name. Homepage testimonial top/bottom edges are painted only by the full-width rules; transparent frame block borders reserve spacing without doubling line opacity. Outcomes stay on Alabaster between top and bottom rules, each with one centred star. Visible image captions and credit links are omitted; descriptive alt text and source metadata remain. Keep the factual distinction between working-build screenshots, report examples, design mockups and client-context photographs.

After the challenge, optional project milestones occupy a full-width Green band with a numbered horizontal timeline and a Cinnabar star at each step. Light copy and Lavender step numbers keep the sequence readable. The text is concise and factual; this is a sequence, not a duration scale. At 900px and below it becomes a vertical line. The full story, imagery and current project status remain intact below it.

“More stories” presents the next two published projects as quieter image-over-copy previews, bounded by top/bottom rules with a shared central divider and star junctions. Mobile stacks them with one star at each left-hand rule start. There is no separate oversized Read the story button; each preview is a single named link.

## Index pages

The case-study index uses a continuous ruled two-column grid: image at left, prominent project name, supporting headline and quiet sector at right. Fine horizontal rules separate projects; the central divider meets them at Lavender stars. Mobile stacks image then copy, removes the central divider, and places the stars at the left of each rule. The index and related stories share CaseStudyPreview. Headings retain weight 350, and previews have transparent underline/focus feedback rather than Lavender button fills.

The services index pairs each category heading and introduction with separate coloured disclosure cards. The category lead is sticky only above 900px viewport width and 700px height; the offer cards remain in normal flow. Smaller or shorter viewports use a static lead. Each category retains its established colour, shared pricing and scope. There is no additional “Explore” label or “Not sure” section.

## Motion

Case hero photographs move more slowly than the page: the background translates from 0 to 20% of its own height as the hero scrolls out, with 20% vertical overscan and clipping at the hero boundary. Headings and foreground images stay in normal flow. This works on mobile; reduced motion uses a static, untransformed image. Details omit the redundant All case studies links in the hero and related-story heading; the main navigation retains its Case studies link.

The case index, case detail and services index share once-only viewport entrances: copy moves 16px into place over 520ms and media uncovers its final 10% over 700ms. Timeline steps stagger by 70ms, up to 210ms. Unanimated content stays visible; focus cancels an active entrance, and reduced motion skips it. Preview images scale by only 2.5% on hover, with a small directional arrow movement. No text shadows, blur, looping float or permanent transformed text layers are introduced. The homepage lists published projects only; no Coming soon row.

Headline reveals are character entrances inside word masks; accessible labels remain unsplit. Supporting film text is staggered by scroll distance, not elapsed time. First-film side notes begin +160px and +340px from each chapter start, revealing over 80px. Bridge secondary text begins +160px and reveals over 80px.

Allocate headline and supporting-content entrance animations only when they enter view; never retain paused per-character animations for offscreen sections. Completed entrances release their animation effects. Homepage case-study copy uses native sticky positioning in an extended track clipped by its row. This keeps the copy centred in the viewport without JavaScript counter-scrolling or viewport-fixed layers inside clip paths. Only the small authored drift and reveal remain scroll-driven transforms.

The bridge film follows scroll at a constant rate through its three chapters, with holds only at the start/end. The site background enters Green over 560px and reaches it before the process film becomes visible. Green continues through About; the next light section has an ordinary hard edge.

Service cards stack only while every offer is closed. Opening a detail places the whole deck in normal flow at scale 1; the last closing animation must finish before stacking returns. This prevents expanded content being trapped behind another card.

Hero, audience and footer films loop while relevant and visible. Scroll films seek rather than play on a clock. Offscreen/hidden-tab work is suppressed. The operating system's reduced-motion preference exposes still imagery and readable copy. The site has no separate pause-motion control or stored motion preference. Keep the footer film under the panel's rounded corners to avoid gaps.

## Controls

Lavender fill and Green text apply to visibly bounded action buttons on hover/focus. Quiet navigation/text links, FAQ and service disclosures keep transparent backgrounds and underline/focus feedback. Do not style every clickable element like a filled button.

Disclosures use real buttons with expanded state, controls relationships and labelled content. Closing content becomes inert while collapsing. Preserve keyboard focus, Escape on the mobile menu, the skip link and OS reduced-motion support.

## Selected navigation and review variants

The expanding navigation is the selected default. On the homepage it begins transparent and aligned with the content edges, becomes compact at 96px of scroll, and expands again below 32px. On subpages it remains compact. Default internal links carry no navigation query parameter. Navigation keeps hover underline feedback and semantic current-page state, without a permanent active underline.

Explicit local review variants remain available: `?nav=glass` uses a 14px blurred translucent surface (60% light / 45% dark) with text/logo tone following the section beneath; `?nav=classic` uses the earlier white floating bar. Header links preserve an explicitly selected review variant. All variants retain the opaque mobile menu, bounded booking CTA and reduced-motion behaviour.

Homepage testimonials are limited to Kinable, Mapwhizz and Rebecca at Big Brand Love, in that order. The separate testimonial page retains all entries.

## Maintenance

`prototype/src/main.tsx` records CSS loading order. `optical.css` supplies shared/base rules; section styles refine them; `interactions.css` intentionally comes last. Historical selector names such as optical remain in shared code to avoid risky renaming and cascade changes during handoff. They do not mean the retired stone hero or old process component is active.

Media provenance and current filenames are in [docs/assets.json](docs/assets.json). Content editing is described in [docs/HANDOFF.md](docs/HANDOFF.md).

## Final media and spacing adjustment — 25 September 2026

The experience strip contains only Tesco, Mapwhizz, Love Peace Harmony and Kinable, with no qualifying subtitle. Logos use a white monochrome CSS filter at 83% opacity (86% on mobile). Mapwhizz retains transparent clock cutouts so filtering cannot flatten its symbol. Compact navigation uses equal visible gaps between the trimmed logo, links and booking button. Its transparent expanded state groups the links at the right, 32px before the booking button, with the logo at the left. Case hero composition centres the content vertically; phone width scales with viewport height (220–420px) and large-screen headlines scale to 128px. Landscape UI images and phones use rounded translucent light bezels (32% Alabaster) with a static 12px backdrop blur; ordinary photographs have no device frame. LPH foreground is the website homepage; Mapwhizz is the travel-time report detail viewport.

The background-only CBA hero holds its 52% shade through the central headline area (68% of the hero) so bright courtyard walls do not compete with the white text. Thumbnail shading stays at 10%.

Editorial bullet lists share `BrandList`: the original curved four-point homepage star, 16px wide with a 16px text gap. Homepage commitments, case-study chapters/outcomes and service inclusions all use it. Markers are Cinnabar on Alabaster; service lists inherit the card text colour for contrast on orange, Lavender and Green. Preserve semantic lists and hide decorative SVGs from assistive technology. Ordered project timelines and benefit grids retain their distinct structure.

Kinable’s hero and thumbnail background now use a restrained, static 4px blur, with a small independent scale to cover filter edges. The foreground app stays sharp. Responsive candidates preserve complete artwork and its proportions; the browser selects resolution according to display size.
