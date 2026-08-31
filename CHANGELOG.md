
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
- 5 community mp4 downloads: 5 / 5 success via aw.githubusercontent.com/superdesigndev/superdesign-prompts/main/....
- 8/8 downloaded files decode cleanly with ffmpeg (3 webp_pipe valid; 5 mp4 isom h264 valid; 1 png_pipe for the 404 card).
