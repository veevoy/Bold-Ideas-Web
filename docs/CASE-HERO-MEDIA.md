# Case-study hero and thumbnail photography — 28 September 2026

Kinable and Mapwhizz use real stock photographs with broad sky and restrained motifs. LPH uses the sea/sky photograph supplied inside the user’s Figma composition. Those are decorative, not evidence of client-owned locations. CBA uses its original courtyard photograph from the client website, selected again on 29 September to make the project recognisable. No generative edits were used.

| Project | Background | Photographer and source | Runtime file |
| --- | --- | --- | --- |
| Kinable | Leaves confined to the edge of a blue sky | [Dhruv Pulipaka / Unsplash](https://unsplash.com/photos/green-leaves-against-a-clear-blue-sky-5ngibK58EQ4) | `kinable-sky-stock.webp` |
| Love Peace Harmony | Soft blue/pink sky over a calm sea | [User-supplied Figma background, node 1935:15724](https://www.figma.com/design/881tXtHnSBHC0QBBBSfBPn/LPH-Web?node-id=1935-15724) | `lph-sea-figma.webp` |
| Mapwhizz | Pale building corner and open sky | [Tandem X Visuals / Unsplash](https://unsplash.com/photos/a-white-building-with-a-blue-sky-in-the-background-KqwgBSp9bY0) | `mapwhizz-architecture-stock.webp` |
| Czech Beer Alliance | The original brewery courtyard at dusk | [Czech Beer Alliance](https://czechbeeralliance.co.uk/uploads/2019/04/pivovar-compressor.jpg) | `czech-beer-alliance-brewery.jpg` |

The Kinable and Mapwhizz stock backgrounds were downloaded on 28 September 2026 under the [Unsplash licence](https://unsplash.com/license). Files are 2000px-wide WebP derivatives at quality 76, with the full source composition retained. LPH’s sea background is a lossless 2050×1318 export of the supplied Figma layer; the underlying photography source was not specified. Its former flower background and original provenance are archived outside public/. Exact image dimensions and focal positions are in each project JSON; provenance is also in `assets.json`. CSS controls responsive cropping and shading.

## Shared treatment

`CaseStudyThumbnail` uses the same preview across homepage, index and related stories. Kinable, LPH and CBA retain the hero pairing. Mapwhizz uses the same architecture photograph with a separate commute-graph panel in its thumbnails. Thumbnails have a light 10% tint. The hero has a 52% / 24% / 8% gradient, holding the strongest shade over the upper 22% for the small white project name, then fading below the heading. Foreground screenshots remain complete, undarkened and in rounded translucent light frames with a static 12px backdrop blur. Background-only parallax and reduced-motion behaviour remain unchanged.

Kinable retains the working-build onboarding screen, LPH its authentic Figma Donate screen, and Mapwhizz its authentic Figma report detail. CBA has no interface-design deliverable: hero and every thumbnail show only the original courtyard background, with no foreground photo or device chrome. The courtyard and Pilsen brewery stock photo also remain as context within the narrative. The field background and its source metadata are archived in `retired-case-backgrounds/`.

The previous generated garden/city and stock forest are retired outside public/ in `docs/retired-case-backgrounds/`; the original generation records are preserved there. Prefer stock photography before generation for future replacements. Chapter-level UI detail compositions remain on solid client-colour backgrounds.

The background-only CBA hero holds its 52% shade through the central headline area (68% of the hero) so bright courtyard walls do not compete with the white text. Thumbnail shading stays at 10%.
