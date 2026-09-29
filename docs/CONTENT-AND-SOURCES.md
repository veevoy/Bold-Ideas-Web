# Content and source records

The active English copy is maintained in `prototype/src/content.ts`, `optical-content.ts`, `why-content.ts` and the case-study JSON files. [content-source-2026-09-22.txt](content-source-2026-09-22.txt) preserves the original live-site copy used during the redesign. Later user-directed edits are reflected in the current source, not in that historical snapshot.

## Factual boundaries

- Preserve all six services and their qualified GBP prices. Audit/diagnosis fees do not automatically include implementation. Scope and timing belong to the stated service stage.
- Prior work with Microsoft, Tesco, Allwyn and Vodafone is described as experience through previous agency roles. Do not turn it into direct-client or endorsement claims.
- Love Peace Harmony received a defined MVP, prototype, technical blueprint and roadmap. Community photography does not show a launched member platform or the Bold Ideas team.
- Kinable has a business and technical specification, working prototype, cost estimate and phased roadmap. Development is under way towards commercial launch; do not present it as a launched product or claim measured user outcomes.
- Mapwhizz has a stabilised backend and new frontend in production. Work has begun on the remaining legacy-backend rebuild; completion is not established. Four images are interface design mockups and two are supplied example reports. Figures in those reports are not client impact metrics.
- Keep attributed testimonial wording. Do not invent metrics, biographies, project screenshots or new client names.

The existing case validator checks structure and media availability, not the truth or publication approval of business claims.

## Case-study sources — 25 September 2026

The user supplied `CS.pptx`: Kinable on slides 2–4, Mapwhizz on slides 5–8 and Love Peace Harmony on slide 9. The deck supports one new Kinable case and updates to the existing Mapwhizz and LPH cases; these are not duplicate projects. The local collection now contains four projects, ordered Kinable, LPH, Mapwhizz and Czech Beer Alliance.

The Kinable and Mapwhizz testimonials supplied directly by the user remain intact in `prototype/src/content.ts`; the deck did not replace their wording. Czech Beer Alliance still derives from “Case Study - Czech Beer Alliance x BoldLeads.docx”; only its collection order changed in this follow-up. Its future work stays separate from delivered work.

All follow-up content is local only. The client preview published earlier on 25 September remains frozen; see [DEPLOYMENT.md](DEPLOYMENT.md).

## Media

[assets.json](assets.json) consolidates the retained brand, generated/user-supplied media, stock clips, client photography and company marks. Retired-source records and unused files were removed from the working handoff; current attribution and source links are preserved.

The current inventory covers 51 public files. Five new WebPs preserve the full dimensions of source PNGs extracted from `CS.pptx`: Kinable's three working-build screens from slide 3 and Mapwhizz's two example reports from slides 6–7. Kinable portrait screens display uncropped on case details, the case index and next-story previews; homepage previews retain their cover crop. Mapwhizz also retains four design mockups from Kristian Ulrych's public portfolio; LPH and CBA each retain three client-context photographs.

Visible image captions and credit links have been removed from the case-study presentation at the user's request. Existing caption/credit metadata, descriptive alt text and provenance records remain; their absence from the visible page does not change the nature or source of the imagery.

User-supplied recordings are identified by source filename without machine-specific home paths. All playback uses files included in `prototype/public/`. The original files remain outside the project with the owner. Stock backgrounds and generated people are illustrative; do not represent them as the actual team or client outcomes.

## Component provenance

`Disclosure.tsx` is an independent implementation informed by the public preview of [Motion Primitives Disclosure on 21st.dev](https://21st.dev/@ibelick/components/disclosure). No locked component source was copied. It uses real buttons, expanded state, IDs, labelled regions and reduced-motion support.

Text entrance direction was informed by the user's MyHealthPrac reference and implemented locally with accessible unsplit heading names. No reference-site code or artwork is required by this project.

React, Motion, Vite, TypeScript and Lucide are package dependencies recorded in `prototype/package-lock.json`; their license files are distributed with installed packages. The handoff does not assign a new open-source license to the client's website or branding.
