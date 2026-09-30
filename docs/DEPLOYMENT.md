# Client preview — latest refinement release, 30 September 2026

Live URL: https://bold-ideas-client-preview.twenntyonee.chatgpt.site

The user explicitly requested publishing the completed refinements to the existing preview, followed by uploading the full working project to https://github.com/veevoy/Bold-Ideas-Web. The existing public audience was preserved. This release adds equal compact navigation gaps, the smaller BoldLeads logo and controlled disclosure, a single offer divider, smooth homepage service-deck transitions and native CSS case-hero parallax. It retains all version 7 mobile frame sequences, content and media updates.

## Current published identity

- Site: `appgprj_6ab635feab94819199180c35e62adf7e`
- Saved version: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_0d926a3488908191816c6413c325a1ba` (version 8)
- Source commit: `248f0176dcea4ae768261801f9943ddec8d2f1e7`
- Deployment: `appgdep_6abcdc6857688191953d669b43cce7dc`
- Native status: `succeeded`, 2026-09-30 09:55:10 UTC.
- Source checkout: `../handoff/client-preview-site/`
- Uploaded archive: `../handoff/bold-ideas-client-preview-2026-09-30-refined-sites.tar.gz`
- Archive SHA-256: `a351c28a876f2617c54ad35f4f6bcab6388f1240f54991c19f0c607317f53704` (242 files, 165,304,320 bytes).

The source synchronisation byte-checked 322 project files while preserving the isolated hosting adapters and original 4K media. TypeScript, 48 application tests, 13 additional hosting/media tests, the production build and four-case/211-asset validators passed. Native archive saving and publication both succeeded. Physical iPhone Safari frame pacing remains unverified; the prior browser viewport checks are documented in VERIFICATION.md.

The GitHub destination is the explicitly requested `veevoy/Bold-Ideas-Web` repository, initially empty with admin access confirmed. It receives the regular source tree, original media and Git history; generated builds, local handoff archives and credentials stay excluded. Future publication still needs another explicit request.

---

# Earlier release — version 7, 30 September 2026

Live URL: https://bold-ideas-client-preview.twenntyonee.chatgpt.site

The user explicitly requested publication of the complete current version to the same preview domain on 30 September 2026. This release includes the compact BoldLeads offer with supplied SVG, smaller audience bottom spacing, smooth navigation alignment, and the preceding local mobile frame sequences, testimonials spacing, CBA logo and footer attribution changes. The existing public audience was preserved. GitHub was not pushed during this release. Future publication still requires another explicit user request.

## Version 7 published identity

- Site: `appgprj_6ab635feab94819199180c35e62adf7e`
- Saved version: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_4c2090be87448191941a444246b596a9` (version 7)
- Source commit: `31da305b5a6428160fd05fba16cbf2c2859c8863`
- Deployment: `appgdep_6abccf5a84b8819184f76e5dfca8f6ba`
- Native status: `succeeded`, 2026-09-30 09:00:56 UTC.
- Source checkout: `../handoff/client-preview-site/`
- Local archive retained: `../handoff/bold-ideas-client-preview-2026-09-30-sites.tar.gz`

The local archive passed packaging validation but its native upload failed twice with a serialization error. Version listing confirmed neither attempt saved a new version. The same pushed commit was then saved as version 7 without an archive and built remotely by Sites; native publication succeeded. The local archive was not used for this deployment. Hosting range adapters and original media hashes remain unchanged. Mobile/touch scroll presentation now uses the WebP canvas sequences; desktop retains native 4K video.

Validation passed: TypeScript, 44 application tests plus 13 hosting/media tests, production build, four published case studies and 211 public media assets. Local visual checks covered desktop/mobile layout and both directions of the navigation transition. Physical iPhone Safari verification of the earlier animation fix is still outstanding; no physical-device success is claimed.

---

## Previous release — 29 September 2026

Live URL: https://bold-ideas-client-preview.twenntyonee.chatgpt.site

The user explicitly requested publication of the latest working version on 29 September 2026, including Kinable background blur and media optimisation, and upload to https://github.com/ulrychkristian/Bold-Ideas-Web. The user subsequently explicitly approved publishing the mobile-video delivery repair and uploading it to GitHub. Version 6 includes that repair together with the latest approved case galleries, LPH Donate/sea hero, service walkthrough and responsive media. **Do not push new source, save another hosted version or redeploy without a new explicit publication request.** Anyone with the URL can view this preview; the existing public audience was preserved. No automatic publishing was enabled.

## Published identity

- Site: `appgprj_6ab635feab94819199180c35e62adf7e`
- Saved version: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_73daa08020c08191b5a48e0492ed28e7` (version 6)
- Source commit: `0f4d26b113c7f3040d89cff9e1201ee5e3b0bb19`
- Deployment: `appgdep_6abbd0a84db081919ccfd17203f64d08`
- Native deployment status: `succeeded`, 2026-09-29 14:52:48 UTC.
- Isolated source checkout: `../handoff/client-preview-site/`
- Deployment archive: `../handoff/bold-ideas-client-preview-2026-09-29-mobile-routing-sites.tar.gz`

## Snapshot and media integrity

The deployed application uses the current working application, copied into the existing isolated hosting checkout before checks, build and source push. It includes the latest navigation, four case studies, media compositions, testimonials and unified star bullets. The original handoff ZIP was not changed. The hosting-only video delivery adapter was retained.

Sites source storage rejected the two large video objects, and [Cloudflare limits individual static files to 25 MiB](https://developers.cloudflare.com/workers/platform/limits/). The hosting checkout therefore stores these films as 4 MiB binary parts. Its build restores and SHA-256-checks the originals before running the regular application build; the hosted Worker streams the same bytes with HTTP Range support at the original MP4 URLs. No video transcoding, resolution reduction, frame-rate change, timing change or UI change was made.

- First story: 56,152,184 bytes; SHA-256 `f3b371bccd500c940582189c1d00e6e59e1b83f6880d9104040da066bdc96cba`.
- Bridge: 44,224,134 bytes; SHA-256 `641fad3e1710f2bf296630048b413b53367747e7507f75a068490a95bf9fae7c`.

The adapter belongs only to the separate hosting checkout, under `hosting/` and `scripts/`. The working application and regular handoff retain their complete MP4 files. No hosting credentials are stored in the project.

## Verification

- Application TypeScript check and production build passed.
- All 40 application/content/Sites/route/navigation/scroll-video tests passed; content and asset validation passed for four projects and 147 public assets. Full npm audit reported zero vulnerabilities.
- 13 additional media-delivery tests passed: full-file byte identity, exact seeks across stored parts, HEAD, conditional requests, invalid ranges and deep-page fallback.
- Native save and publication succeeded; the returned live URL is recorded above.
- Production-preview desktop/mobile verification covered Kinable blur, sharp foreground, smaller responsive image selection and LPH gallery loading. See VERIFICATION.md for measured file savings and test limitations. Native publication succeeded. For the delivery repair, six actual HTTP range probes (beginning, middle and end of both mobile MP4s) returned 206, correct Content-Range and byte-identical payloads. Physical iPhone/Safari playback remains for the user to confirm.

## Routing correction — 29 September 2026

The user reported that published links returned to the homepage. Live `/case-studies`, `/services` and `/index.html` responses were HTTP 307 with `Location: /`, while `/` returned 200. The Worker fallback fetched `/index.html`, unintentionally forwarding the asset host's canonical redirect to the visitor. It now fetches the canonical root internally and returns the HTML while retaining the requested browser URL. A regression test covers GET/HEAD across the two indexes, testimonials and all four cases; the hosting integration fixture now reproduces the canonical redirect as well. Both tests failed with 307 before the fix and passed afterward. The repair changes no frontend styling, content or media bytes.

For a future **explicitly authorised** update, rebuild from the requested source, preserve lossless media delivery and use the same Site identity. Never treat the presence of `.openai/hosting.json` as continuing permission to publish.

## Mobile video delivery repair — 29 September 2026

Both mobile MP4 URLs originally ignored Range requests and returned whole files with HTTP 200. The source Worker now repairs range responses from asset bindings that do not implement them. Live version 5 then exposed a second issue: existing static assets bypassed that Worker entirely.

The hosting build now calls `packageMobileScrollMedia('dist/client')` from `prototype/scripts/package-mobile-scroll-media.mjs` in its `scripts/copy-sites-build.mjs`, after copying the regular build and desktop media parts. Its returned manifest is merged into the existing media manifest before generating the deployed Worker. This moves only the deployed mobile MP4s into internal content-addressed parts, so their unchanged public URLs reach the range-enabled adapter. Keep this step when synchronising future source updates. Source MP4s and ordinary static build outputs remain complete. No film bytes, dimensions, frame rates or scroll mappings changed.

Version 6 live verification: both files returned exactly 2 bytes for bytes=0-1 and exactly 1,024 bytes for middle/end probes, each HTTP 206 with the correct total file size in Content-Range. These checks resolve the confirmed server delivery fault; they do not replace a physical-device visual test.

## Previous publication

Version 5 added the regular Worker range handling but was superseded after live probing exposed direct-asset bypass: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_2b936b9fcd488191b0897e2f937d5d29`, source `3c178225ace829106d43f2b43465ad9fc614b1e9`, deployment `appgdep_6abbcf3b24a0819192a2184f20f6bb0a`. Archive: `../handoff/bold-ideas-client-preview-2026-09-29-mobile-range-sites.tar.gz`.

Version 4 published the media-optimised website: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_ba6e5f9f67388191bb3f2b9dbe374f7d`, source `e48caad62265a3e3d002bc9f614f5cc181427f5c`, deployment `appgdep_6abbc8baed208191b802dbde5ff54dd6` (succeeded at 2026-09-29 14:19:02 UTC). Archive: `../handoff/bold-ideas-client-preview-2026-09-29-optimized-sites.tar.gz`.

Version 3 repaired hosted navigation: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_043b3e605fd08191a033f829ca68ef7c`, source `dddcaf8f7ed2a23bd6d81fa1a0d1d6d1fee4349b`, deployment `appgdep_6abb8a0060b48191b944aa1c82416be8` (succeeded at 2026-09-29 09:51:12 UTC). Archive: `../handoff/bold-ideas-client-preview-2026-09-29-routing-sites.tar.gz`. Its live navigation was verified from homepage through case index, Kinable and Services.

The initial 29 September refresh is version 2: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_3e5f2986ca3081918ff3afdebeba994f`, source `f184f537960a7449203183011ebe38e53918492c`, deployment `appgdep_6abb875dd4a88191bdc5080b3ab581df`. Its archive is `../handoff/bold-ideas-client-preview-2026-09-29-sites.tar.gz`. Version 3 fixes its hosted navigation.

The original 25 September 2026 publication remains version 1: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_4c28c65d62b0819196d2bb981375d93c`, source `489b8e17137a7312097f988b9cddc4ee3dadddbb`, deployment `appgdep_6ab63853ed908191bec11f509a79ae4b`. Its archive is `../handoff/bold-ideas-client-preview-sites.tar.gz`.
