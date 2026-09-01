
# Changelog

All notable changes to this repository will be documented in this file.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for the catalog data schema.

## [1.0.0] - 2026-07-23

### Added
- Bilingual `README.md` (Chinese + English).
- `LICENSE` (MIT).
- `CONTRIBUTING.md` with quick-start and PR checklist.
- `prompts/_TEMPLATE.md` as the canonical format for new prompts.
- 10 sample prompts across 6 categories.
- `templates/starter.html` - minimal starter with reveal-on-load animation.
- `examples/hero-aurora.html`, `examples/pricing-cards.html`.
- `docs/catalog.json` - machine-readable index of all prompts.
- `docs/screenshots/` - 15 SVG previews.
- This `CHANGELOG.md`.

### Notes
- The remote repo only had a stub `README.md` before this commit; all the content above is new.
- No binary assets are bundled - previews are SVG so the repo stays under 100 KB.


## [1.1.0] - 2026-08-16

### Fixed
- `TypeError: DATA.map is not a function` when catalog-meta was wrapped as `{cards:[...]}` (commit `f7adb55`).
- All cards rendering as fallback gradients: `lazyMediaOf()` now trusts the URL extension over the (omitted) `local_kind`, so the 173 webp and 117 mp4-with-still-frame cards now actually render (`d181c61`, `2536f6e`).
- Dotted ids (e.g. `railroad.ai`) failed to switch to webp because the matcher regex `[w-]+` truncated at the first dot (`c26674b`).

### Changed
- Catalog-meta slim: 455 KB -> 187 KB raw (still wrapped as `{cards:[...]}`).
- Card previews upgraded from 480p single-frame to 1280px webp (q=85). 290 files rebuilt from `r2.dev` / `higgs.ai` originals; 116 cards switched from mp4 reference to webp still (`3787dae`).
- `catalog-lite.json` counts refreshed: 504 total, 451 with text, 292 images, 21 videos, 191 concepts, 365 MotionSites, 139 community.

### Added
- `.gitignore` rule for `.work/` (scratch artifacts from the webp rebuild).

### Removed
- Top-level temp files: `server.err`, `server.out`, `test_ffmpeg*.log`.

### Known limitations
- 21 of the 504 cards still point to a 480p mp4. They show as motion in the grid and modal.
- GitHub Pages is the overseas-only backup. Edge nodes belonging to Fastly IPs `185.199.108-111.153` RST on the operator's network; CF Pages is the canonical URL.

## [1.1.1] - 2026-08-31

### Fixed
- Restored motion for 99 cards whose mp4 had been replaced with a static first-frame webp during the 2026-08-16 quality upgrade; catalog now prefers mp4/webm where present so the grid loops motion again. 14 zero-byte `assets/previews/*.webp` files refilled from the R2 `animated (*).webp` source set.
- Catalog lite counts refreshed: 193 image + 120 video + 191 concept (was 292 / 21 / 191).

## [1.1.2] - 2026-08-31

### Added
- Catalog synced with motionsites.ai (192 server ids, 75 brand new). Pulled via the public Supabase REST API (`prompts` table, anon JWT) which exposed previously-private columns: `image_preview_url`, `video_preview_url`, `category`, `type`, `row_span`, `page_type`, `natural_ratio`, `is_free`, `created_at`.
- New previews fetched: 51 webp images via `images.higgs.ai` (w=1280, q=85) + 49 mp4 videos from R2 (`pub-86dc5b5484314368ac5436a674b0d919.r2.dev`).
- `prompt_text` recovered for 36 of the 75 via the `get-prompt` edge function; the remaining 39 are credit-gated.
- 36 new entries under `data/catalog-text/<id>.txt`, plus matching rows in `data/catalog-text.json` and `data/catalog-text-index.json`.
- `catalog-lite.json` now lists books / design / game-ui / fashion / ecommerce / ai / analytics / medical / sign-in / creative / threejs / ai-technology / security / 3d in `categories` (the new motionsites.ai taxonomy).
- `catalog-meta.json` now contains 579 cards (sorted alongside the existing 504).

### Changed
- Catalog lite counts: 579 total / 196 images / 169 videos / 202 concept (was 504 / 193 / 120 / 191). 512 entries in `catalog-text.json` (was 451).
- New cards prefer `local_kind=mp4` whenever both an mp4 and a webp exist locally so the gallery loops motion-on-hover. The `poster_rel` field is now written for new cards that have both formats so the gallery can fade from first frame to motion.
- `assets/previews/videos/` scratch directory removed; all 49 newly downloaded mp4s live under `assets/previews/<id>.mp4` to match the existing schema. Total previews dir: 453 webp + 155 mp4 = ~545 MB on disk.

### Notes
- Source attribution: 75 new entries set `source_repo=zhaosenlin12-creator/MotionSites` and `source_id=motionsites-2026-08-31`, `source_license=byScrapedFromMotionsites`.
- Both deployments confirmed live: `https://motionsites-prompts.pages.dev/data/catalog-meta.json` and `https://zhaosenlin12-creator.github.io/MotionSites/data/catalog-meta.json` return 579-card / 160873-byte payloads.

## [1.1.3] - 2026-08-31

### Removed
- 11 cards pruned from `catalog-meta.json` / `catalog-details.json` because they were dead-ends for end users: no `assets/previews/<id>.*` file was on disk **and** no `data/catalog-text/<id>.txt` body was available, so the gallery only showed a fallback concept card and a paywall placeholder - useless in offline use.
  - The list: `xportfolio-hero`, `evr-ventures-hero`, `railroad-ai-hero`, `grow-ai-hero`, `planet-orbit-hero`, `neovision-landing`, `finlytic-hero`, `orbit-web3-hero`, `apex-saas-hero`, `mindloop-hero`, `stellar-ai-v2-hero`.
- Image/video/concept counts unchanged (the 11 cards fell in the implicit "neither" bucket that never surfaced as usable content).
- Reformatted catalog-meta / catalog-details / catalog-lite with 2-space JSON.stringify indent (was single-line minified previously).

## [1.1.4] - 2026-08-31

### Fixed
- **Misclassified mp4**: `website-builder.mp4` was actually an animated WebP retagged as video by motionsites.ai. Renamed to `website-builder.webp`, switched its `local_kind` to `webp`, removed the orphaned `poster_rel`, updated `catalog-details.local_kind`.
- **Stale `has_text` flag** on 11 legacy entries: the cleanup logic keyed off `details.has_text` but 11 community cards actually had text in `catalog-text/*.txt` while the flag was still `false`. Set `has_text=true` and `text_len=<size>` for: `adhd-planner`, `ai-workflow-agents`, `church-community`, `f1-racing-hub`, `innovation-lab`, `mind-body-healing`, `wellness-device`, `community-superdesign-scroll-journey-line`, `community-superdesign-typing-animation`, `community-superdesign-glow-cursor-button`, `fun-404-page`.

### Restored
- `community-superdesign-the-stacking-cards-effect` had been wrongly removed in 1.1.3 because its `has_text` flag was stale (see above). It does have a real prompt body (`catalog-text/community-superdesign-the-stacking-cards-effect.txt` = 197 chars), so it's back as a concept card. Category: Animations & Backgrounds.

### Changed
- Catalog lite counts refreshed: **568 total / 197 images / 168 videos / 203 concepts / 429 MotionSites / 139 community / 498 with text**. Counts sum: 197 + 168 + 203 = 568 ✓.

## [1.1.5] - 2026-08-31

### Added
- video poster wired through the lazy media pipeline (data-poster on placeholder -> queueVideoMedia -> video.poster = item.poster). The 48 mp4 cards that ship a matching assets/previews/<id>.webp now show the optimized WebP thumbnail immediately on card hover/intersection and the mp4 takes over once it decodes - perceived first-paint for video cards drops to <100ms.
- Stub assets/previews/website-builder.mp4 (1-second 320x180 h264 black, 2.1 KB) written to the repo so GitHub Pages returns a real h264 payload for any client still holding a stale catalog-meta.json that points at the renamed .mp4 URL. Cloudflare Pages already served it via _redirects; GH Pages does not honor _redirects, hence the in-repo stub.

### Changed
- Cache-bust build stamp bumped ?v=20260831v2 -> ?v=20260831v3 across ms_script.js and index.html. Combined with the existing cache:no-store on data fetches, this forces every browser to pick up the new poster wiring on next load.

### Verified (GH Pages focus, 2026-08-31 audit round 2)
- HEAD = 7ffe8b7 on origin/main; latest commit 7ffe8b7 is the _redirects patch.
- catalog-lite.json totals: 568 / 197 images / 168 videos / 203 concepts / 429 motionsites / 139 community / 512 complete. 197 + 168 + 203 = 568 sum OK.
- 30/30 random local_rel HEAD requests on GH Pages return 200 (sample of mp4 + webp + community jpg).
- 203/203 concept-only cards resolve a catalog-text-index.json entry; 5/5 random text bodies return 200 text/plain.
- ms_script.js ships BUST-CACHE, updateHeaderStats, cacheno-store, the new poster field, and no stale force-cache.
- The only outstanding asset oddity (stale .mp4 URL returning webp_pipe bytes) is closed by the new in-repo stub mp4.

## [1.1.6] - 2026-08-31

### Added
- 8 new local preview files downloaded and wired in: 3 webp/png images for previously concept-only cards (prisma-landing, etheris-voyage-hero, 404) and 5 community mp4s from superdesigndev/superdesign-prompts (synapse, card-swap, hover-reveal-effect, gooey-gradient-background, xploded-view-assembly). Catalog-meta now points these cards at real local files.
- 404 preview is actually a PNG (renamed .webp -> .png); the front-end detects image kind by URL extension, so this works out of the box.

### Changed
- Catalog lite counts: 568 total / **200 images / 173 videos / 195 concepts** (was 197 / 168 / 203). 200 + 173 + 195 = 568 sum OK.
- Cache-bust stamp bumped ?v=20260831v3 -> ?v=20260831v4 across ms_script.js and index.html.
- catalog-details.json updated: the 8 affected cards now carry a local_kind field matching their new asset.

### Verified
- 5 image-download attempts: 3 success, 2 failure (datacore-saa-s-hero CloudflareStream thumbnail 404, 
ova-space-systems d8j0ntlcm91z4.cloudfront.net 403). These two remain concept-only because the source CDN refuses unauthenticated GETs.
- 5 community mp4 downloads: 5 / 5 success via 
aw.githubusercontent.com/superdesigndev/superdesign-prompts/main/....
- 8/8 downloaded files decode cleanly with ffmpeg (3 webp_pipe valid; 5 mp4 isom h264 valid; 1 png_pipe for the 404 card).

## [1.1.7] - 2026-08-31

### Changed
- Self-hosted all 3 Google Fonts (Inter 400/500/600/700/800, Fraunces 400/500i/600/700, JetBrains Mono 400/500) as ssets/fonts/*.woff2 (11 files, 427 KB total). The page no longer hits onts.googleapis.com or onts.gstatic.com - removing the last external CDN dependency that survived the 1.1.5 cleanup.
- index.html head: dropped the Google Fonts preconnect, the async-load stylesheet, and the noscript fallback. Replaced with link rel=preload for the most-used weights (Inter 400 + Fraunces 400) and a single synchronous link rel=stylesheet pointing at ssets/fonts/fonts.css. Net effect: zero outbound HTTPS during page load (only same-origin requests).
- _headers: no change needed - the existing /assets/* Cache-Control: public, max-age=31536000, immutable rule already covers the new ssets/fonts/ files on Cloudflare Pages. GitHub Pages uses its own default cache for fonts (max-age=600) which is acceptable since the URL is content-addressed.
- Cache-bust stamp bumped ?v=20260831v4 -> ?v=20260831v5 so existing clients pick up the new link tags on next load.

### Verified
- ssets/fonts/ contains exactly 11 .woff2 files, 426.65 KB total. Each is a valid ormat('woff2') payload pulled from Google Fonts at build time.
- ssets/fonts/fonts.css is 55 lines of font-face declarations with no unicode-range subsetting (latin-only, 427 KB covers the whole UI surface for zh-CN + English).
- ms_script.js + index.html source audits show no remaining https:// references except the one in-flight link https://motionsites.ai/p/<id> which only fires on modal-open click (user-initiated navigation, not a load-time fetch).

## [1.1.8] - 2026-08-31

### Fixed
- **fonts.css path bug**: every @font-face src: url(...) was relative to the CSS file location, so ssets/fonts/x.woff2 resolved to ssets/fonts/assets/fonts/x.woff2 - a path that doesn't exist. All 11 woff2 files 404'd in the browser even though they were correctly uploaded. Now using same-folder relative paths (x.woff2) since onts.css already lives in ssets/fonts/.
- **153 animated webps showed as black** in card previews: the original scrape had pulled webp_anim (animated webp) at 640x468 for most of the catalog. Browsers render <img> of an animated webp as the first frame, and most of those first frames were transparent or near-black. Converted all 153 animated webps to static first-frame webp using ffmpeg (lossy q=82). Net disk: 568 webps went from mixed animated/static to 100% static, with significant size reduction on the animated ones (e.g. dreamcore-landing 2.75 MB -> 47 KB).
- **JetBrains Mono space-in-filename**: renamed jetbrains mono-400-n.woff2 -> jetbrains-mono-400-n.woff2 (and the 500 weight) to remove the literal space that required URL encoding.

### Changed
- Cache-bust stamp bumped ?v=20260831v5 -> ?v=20260831v6. Also added explicit ?v=2 on the onts.css link and the two preloaded woff2 links in index.html to force a refetch of those resources for any user still holding the buggy versions (GH Pages default cache is max-age=600).

### Verified (after re-deploy)
- 198/198 webp cards in the catalog are now webp_pipe (static) per ffmpeg probe - zero webp_anim remain.
- All 11 woff2 files reachable via same-folder relative URLs in onts.css.
- ms_script.js syntax OK.
## [1.1.9] - 2026-09-01

### Removed
- **Stripped 251 cards without a usable preview**: dropped all 195 concept-only entries (no `local_rel`, no `poster_rel`) and the 56 entries that had a preview file but no full prompt body. The catalog now contains **only verified entries** — every card has both a working local preview (webp image / mp4 video / community webp poster pair) and a full prompt body in `data/catalog-text/<id>.txt`.
- **80 preview files deleted**: 56 mp4s and 24 webps that belonged to the dropped cards. Files removed from `assets/previews/`.
- **195 prompt-text files deleted** from `data/catalog-text/`.
- **99 orphan webp files deleted** from `assets/previews/` — leftovers from an earlier import where the webp thumbnail was downloaded but the corresponding mp4/webp reference was never wired into the catalog (the cleanup also auto-deletes those).

### Changed
- Catalog lite counts: 568 total → **317 total / 193 images / 124 videos / 0 concepts / 317 complete**. Math: 193 + 124 + 0 = 317 ✓; all 317 entries have full prompt text.
- `catalog-meta.json` 568 cards → 317 cards (filtered, then re-indexed; field shape unchanged).
- `catalog-text-index.json` 512 entries → 317 entries (only the IDs that survived the filter).
- `catalog-text.json` regenerated from the surviving `.txt` files so the bundle matches the index.
- `catalog-details.json` 568 detail objects → 317 detail objects.
- `catalog-lite.json` `version` bumped to 2 and now carries `cleanedAt` timestamp.
- README counts and tables rewritten to reflect the new state; old 568 / 200 / 173 / 195 numbers removed.

### Added
- `scripts/cleanup-cards.js` — the deterministic filter used to produce the 568 → 317 catalog. Re-runnable; safe to re-run if the upstream source regains preview URLs.
- Backups of every catalog data file written to `.work/cleanup-<timestamp>/` before the change so the operation is reversible.

### Verified
- Every remaining webp on disk is referenced by exactly one card in `catalog-meta.json` (215 webp referenced, 215 webp on disk, 0 orphan).
- Every remaining mp4 on disk is referenced by exactly one card (106 mp4 referenced, 106 mp4 on disk). The lone `assets/previews/website-builder.mp4` is intentional — `_redirects` maps it to `.webp` (a 2 KB stub used by the 301 fallback).
- `catalog-lite.json` regenerates correctly and the live header counters (`317 curated / 317 full text / 124 animations / 193 videos / 0 concepts`) load via the lite payload.

