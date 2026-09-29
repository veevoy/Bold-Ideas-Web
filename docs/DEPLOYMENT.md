# Client preview — refreshed 29 September 2026

Live URL: https://bold-ideas-client-preview.twenntyonee.chatgpt.site

The user explicitly requested publication of the latest working version on 29 September 2026, including Kinable background blur and media optimisation, and upload to https://github.com/ulrychkristian/Bold-Ideas-Web. Version 4 replaces the earlier snapshot on the same domain and includes the latest approved case galleries, LPH Donate/sea hero, service walkthrough and mobile scroll-video fixes. **Do not push new source, save another hosted version or redeploy without a new explicit publication request.** Anyone with the URL can view this preview; the existing public audience was preserved. No automatic publishing was enabled.

## Published identity

- Site: `appgprj_6ab635feab94819199180c35e62adf7e`
- Saved version: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_ba6e5f9f67388191bb3f2b9dbe374f7d` (version 4)
- Source commit: `e48caad62265a3e3d002bc9f614f5cc181427f5c`
- Deployment: `appgdep_6abbc8baed208191b802dbde5ff54dd6`
- Native deployment status: `succeeded`, 2026-09-29 14:19:02 UTC.
- Isolated source checkout: `../handoff/client-preview-site/`
- Deployment archive: `../handoff/bold-ideas-client-preview-2026-09-29-optimized-sites.tar.gz`

## Snapshot and media integrity

The deployed application uses the current working application, copied into the existing isolated hosting checkout before checks, build and source push. It includes the latest navigation, four case studies, media compositions, testimonials and unified star bullets. The original handoff ZIP was not changed. The hosting-only video delivery adapter was retained.

Sites source storage rejected the two large video objects, and [Cloudflare limits individual static files to 25 MiB](https://developers.cloudflare.com/workers/platform/limits/). The hosting checkout therefore stores these films as 4 MiB binary parts. Its build restores and SHA-256-checks the originals before running the regular application build; the hosted Worker streams the same bytes with HTTP Range support at the original MP4 URLs. No video transcoding, resolution reduction, frame-rate change, timing change or UI change was made.

- First story: 56,152,184 bytes; SHA-256 `f3b371bccd500c940582189c1d00e6e59e1b83f6880d9104040da066bdc96cba`.
- Bridge: 44,224,134 bytes; SHA-256 `641fad3e1710f2bf296630048b413b53367747e7507f75a068490a95bf9fae7c`.

The adapter belongs only to the separate hosting checkout, under `hosting/` and `scripts/`. The working application and regular handoff retain their complete MP4 files. No hosting credentials are stored in the project.

## Verification

- Application TypeScript check and production build passed.
- All 32 application/content/Sites/route/navigation/scroll-video tests passed; content and asset validation passed for four projects and 147 public assets. Full npm audit reported zero vulnerabilities.
- 11 additional media-delivery tests passed: full-file byte identity, exact seeks across stored parts, HEAD, conditional requests, invalid ranges and deep-page fallback.
- Native save and publication succeeded; the returned live URL is recorded above.
- Production-preview desktop/mobile verification covered Kinable blur, sharp foreground, smaller responsive image selection and LPH gallery loading. See VERIFICATION.md for measured file savings and test limitations. Native publication succeeded; no further live-browser QA was required for this release.

## Routing correction — 29 September 2026

The user reported that published links returned to the homepage. Live `/case-studies`, `/services` and `/index.html` responses were HTTP 307 with `Location: /`, while `/` returned 200. The Worker fallback fetched `/index.html`, unintentionally forwarding the asset host's canonical redirect to the visitor. It now fetches the canonical root internally and returns the HTML while retaining the requested browser URL. A regression test covers GET/HEAD across the two indexes, testimonials and all four cases; the hosting integration fixture now reproduces the canonical redirect as well. Both tests failed with 307 before the fix and passed afterward. The repair changes no frontend styling, content or media bytes.

For a future **explicitly authorised** update, rebuild from the requested source, preserve lossless media delivery and use the same Site identity. Never treat the presence of `.openai/hosting.json` as continuing permission to publish.

## Previous publication

Version 3 repaired hosted navigation: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_043b3e605fd08191a033f829ca68ef7c`, source `dddcaf8f7ed2a23bd6d81fa1a0d1d6d1fee4349b`, deployment `appgdep_6abb8a0060b48191b944aa1c82416be8` (succeeded at 2026-09-29 09:51:12 UTC). Archive: `../handoff/bold-ideas-client-preview-2026-09-29-routing-sites.tar.gz`. Its live navigation was verified from homepage through case index, Kinable and Services.

The initial 29 September refresh is version 2: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_3e5f2986ca3081918ff3afdebeba994f`, source `f184f537960a7449203183011ebe38e53918492c`, deployment `appgdep_6abb875dd4a88191bdc5080b3ab581df`. Its archive is `../handoff/bold-ideas-client-preview-2026-09-29-sites.tar.gz`. Version 3 fixes its hosted navigation.

The original 25 September 2026 publication remains version 1: `appgprj_6ab635feab94819199180c35e62adf7e~appgver_4c28c65d62b0819196d2bb981375d93c`, source `489b8e17137a7312097f988b9cddc4ee3dadddbb`, deployment `appgdep_6ab63853ed908191bec11f509a79ae4b`. Its archive is `../handoff/bold-ideas-client-preview-sites.tar.gz`.
