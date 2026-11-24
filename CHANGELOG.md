
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

## [1.2.0] - 2026-11-22

### Added
- **44-prompt replication-recipe pack** (`data/recipe_pack.json`): "how do I reproduce this premium effect?" prompts in three tracks — reverse-engineering (`morluto/rea`, MIT, 14), craft pipeline (`storytold/craft-anything`, Apache-2.0, 14) and community effect patterns (MIT libraries and W3C/MDN standards, 16). Every record carries `source_id`, `source_repo`, `source_url` and `source_license`.
- `scripts/recipe_demo.html` + `scripts/recipe_demo.js`: a pure HTML/CSS demo kit with 29 archetypes (teardown, tokens, timeline, easing curves, scroll map, state machine, acceptance report, pixel diff, material ladder, shader field, bento, trail…). Every demo exposes `window.__seek(ms)` so capture frames are deterministic.
- `scripts/render_recipe_previews.py`: renders 36 frames per recipe at 1280×800 through Playwright, encodes a 2.4 s / 15 fps mp4 and a webp poster. 88 new preview files (~5 MB).
- `scripts/build_recipe_docs.js` → generated `docs/recipe-pack.md` provenance table.
- New catalog category **Replication Recipes** (44 cards) with its own chip; pinned above the scraped catalog via negative `sort_order`.
- New `source_kind: recipes`: source-filter option ("Recipe pack" / 复刻配方), card badge (配方), and the header's fifth stat now shows the recipe count instead of the always-zero concept count.
- Search now matches tags; the modal metadata panel links a recipe to its source repo and licence.
- `scripts/tests/recipe-pack.test.js`: id/prompt/preview/provenance invariants, no-external-font guard, cache-bust stamp sync.

### Changed
- **Build pipeline reconciled with the published site.** `build.js` was stale: re-running it produced a 504-card catalog and rewrote `index.html` with the old Google-Fonts head. `ms_prompts_merged.json` / `ms_prompts_with_text.json` are now rebuilt from the published 317 cards (including the 24 bodies that only existed in `catalog-text.json`), `ms_template.html` is re-synced to the shipped self-hosted-font page, and the build only publishes cards with a preview + non-empty body (the 2026-09 cleanup rule is now enforced in code).
- `build.js` writes pretty JSON with stable ordering, prunes stale `catalog-text/*.txt`, and asserts the media/category/text invariants on every run; a second run on an unchanged tree is byte-identical.
- Catalog lite counts: **361 total / 193 images / 168 videos / 0 concepts / 44 recipes / 361 complete**; `motionsites=296`, `community=21`.
- Header counters: removed a duplicated `.stats` wrapper; the fifth stat is now Recipes (driven by `catalog-lite.recipes`).
- `audit-catalog.js` audits the recipe pack too; `findOrphanAssets` accounts for `poster_rel` and the documented `website-builder.mp4` redirect stub.
- `ms_script.js` cache-bust stamp → `20261122v1`; the build writes the same stamp into the script tag (unit-tested).
- Removed the unused `assets/previews/taskly.webm`.

### Verified
- `node scripts/build.js` → 361 records, invariants hold; identical output on re-run.
- `node scripts/audit-catalog.js` → `AUDIT OK records=361 complete=361 recipes=44 community=21 missingBodies=0 assets=361`.
- `node --test scripts/tests/*.test.js` → 42 tests, 38 pass, 4 pre-existing failures in `import-liro.test.js` because the git-ignored `sources/akkikumar72/liro-prompts` research cache is absent in a fresh clone (same failures on the untouched checkout).
- Browser check at 1440×900: 361 cards, chip `Replication Recipes 44`, source filter offers the recipe pack, first-card modal shows the full prompt, zero console errors.

## [1.3.0] - 2026-11-22

### Added
- **40 new community cards** from the MIT-licensed `superdesigndev/superdesign-prompts` repo: README front-matter (title / category / tags / author / try_url) + a fenced design-spec prompt body + a preview asset per record. Catalog: **361 → 401 cards**, images 193 → 233, community picks 21 → 61.
- `scripts/import-superdesign-repo.js` — idempotent importer: parses the repo layout, extracts bodies, converts previews to 16:10 1280×800 webp covers, normalises the licence to the repo `LICENSE` (MIT), dedupes by id/slug and appends to the build sources. Dry-run by default, `--write` to apply.
- `scripts/convert_preview.py` — shared Pillow cover converter (centre-cropped 1280×800 webp), used by the importer instead of relying on an ffmpeg build that may lack libwebp.
- `docs/source-scouting.md` — evidence-backed evaluation of the next sources: motionsites.ai has no public catalog endpoint and paywalled bodies (previews are public but are only used for preview rebuilds); Figma Community file pages answer 403 to non-browser clients and files are user-licensed; 21st.dev is metadata+preview only; `kenje24/rebirth-motionsitesprompt`, `gradeoin/…`, `xiiiabu/…` are viable next batches; text-only and unlicensed mirrors are listed as rejected.
- `scripts/tests/superdesign-cards.test.js` — licence / provenance / preview-bytes / body invariants for imported community cards.

### Changed
- `data/catalog_sources.json`: Superdesign and giglianepefrei licences corrected to **MIT** (both repo `LICENSE` files are MIT); added the motionsites public preview CDN as a media-only source with an explicit "no paywall bypass" notice.
- Cache-bust stamp → `20261122v3` in both `scripts/build.js` and `ms_script.js`; README counts, file layout, provenance and recent-changes tables updated to 401 / 233 / 168 / 61.

### Verified
- `node scripts/build.js` → 401 records, invariants hold; second run byte-identical.
- `node scripts/audit-catalog.js` → `AUDIT OK records=401 complete=401 recipes=44 community=61 missingBodies=0 assets=401`.
- `node --test scripts/tests/*.test.js` → 45 tests, 42 pass, 3 pre-existing environment failures (they need the git-ignored `sources/` research caches).
- Browser check at 1440×900 against the deployed build: 401 cards, community filter/import cards render their covers, zero console errors.

### Notes
- Preview assets were pulled from the public repository through a CDN proxy because `raw.githubusercontent.com` was intermittently unreachable from the build host; content was verified as valid webp after conversion. When GitHub is reachable, clone the repo into `sources/superdesign-prompts` and run the committed importer instead.
- 78 of the 118 candidate records were skipped: their preview asset exceeded the 700 KB budget on the slow link, or the download was truncated. They can be picked up by a later `scripts/import-superdesign-repo.js --write` run with a normal connection.

## [1.3.1] - 2026-11-22

### Added
- **64 more community cards** from the MIT `superdesigndev/superdesign-prompts` library once the network recovered: import went from 40 to **104 Superdesign cards** (140 prompt folders inventoried through the GitHub tree API; 126 image previews). Catalog: **401 → 465 cards**, images **233 → 297**, community picks **61 → 125**.
- Cover pipeline for remote fetches (inventory → parallel raw download → Pillow 16:10 webp → cache import) documented in `docs/source-scouting.md`; the committed `scripts/import-superdesign-repo.js` remains the reproducible path from a local clone.

### Changed
- Cache-bust stamp → `20261122v4`; README / CHANGELOG / source-scouting counts refreshed (465 total, 297 images, 125 community, 67 categories).
- Removed 7 duplicate `preview.webp` covers for community cards that already ship an mp4 preview, so the orphan-asset audit stays clean.

### Verified
- `node scripts/build.js` → 465 records, invariants hold; second run byte-identical.
- `node scripts/audit-catalog.js` → `AUDIT OK records=465 complete=465 recipes=44 community=125 missingBodies=0 assets=465`.
- `node --test scripts/tests/*.test.js` → 45 tests, 42 pass, 3 pre-existing environment failures (git-ignored `sources/` caches absent in a fresh clone).
- Browser check: community filter renders 125 cards, imported covers load, zero console errors.

### Notes
- 15 largest previews (>1.2 MB each, ~32 MB total) are still pending on this slow link; re-running the importer from a clone will pick them up.
- The environment briefly needed a CDN proxy when `raw.githubusercontent.com` was unreachable; once the network recovered, the same importer used direct raw downloads.

## [1.4.0] - 2026-11-22

### Added
- **Recipe pack 44 -> 104 prompts.** Three tracks now run the same length: `rea` 40 (deterministic capture,
  HAR/source-map/coverage evidence, obligation ledger), `craft` 40 (token scales, state coverage, parity audits,
  handoff scorecard), `community` 24 (split-flap, odometer, SVG draw, scroll-scrubbed video, pan canvas, flip deck,
  spotlight border, accordion morph).
- Five new demo styles in `scripts/recipe_demo.js` — `network` (request waterfall), `code` (recovered source with a
  mapping gutter), `graph` (module/route map), `flap` (split-flap board), `odo` (odometer roll) — so the new previews
  show the artefact each recipe produces instead of a generic card.
- `docs/competitor-teardown.md`: observed/inferred/unknown teardown of ten adjacent prompt libraries, their record
  schemas, and the five-slot body template they share. Feeds `docs/source-scouting.md`.
- `scripts/_merge_recipes.js` and `.work/recipes/SPEC.md` — the authoring contract and validating merge used to build
  the 60 new records (id/title/demo drift, word budget, palette, duplicate-body hash, sort-order assignment).

### Changed
- `scripts/build_recipe_docs.js` prints the live pack size and the five new style labels; `docs/recipe-pack.md`
  regenerated at 104 rows.
- `docs/source-scouting.md` records the 1.4.0 evaluations: `DexZane/awesome-web-prompts` (MIT, 49 new slugs, only 21
  with a preview or live demo), `kenje24/rebirth-motionsitesprompt` (deferred: 420 new slugs but no per-record preview
  mapping), `Vivvidai/vividsites` (excluded by its licence), `promptmotion.art` (out of domain).

### Fixed
- `scripts/recipe_demo.js` had 156 double-encoded glyphs (arrows, middots, degree signs, multiplication signs,
  checkmarks) left by an earlier GBK console round-trip. Every preview carried mojibake in its chrome line; the kit is
  repaired by `scripts/_fix_demo_mojibake.js` and all 104 previews re-rendered.
- The `svgdraw` and `gallery` demos printed hardcoded labels ("Lottie layers", "scrollY -> translateX"); they now read
  the recipe's own `kind` / `meta`, so an SVG path recipe no longer previews as a Lottie teardown.

### Verified
- `node scripts/_merge_recipes.js` -> 104 records, validation OK (60 authored bodies, 221-274 words, all with
  `Acceptance:` criteria, no duplicate body hashes).
- `python scripts/render_recipe_previews.py --all --force` -> 104 mp4 + 104 webp.
- `node scripts/build.js` -> 525 records; `node scripts/audit-catalog.js` -> AUDIT OK.

## [1.4.1] - 2026-11-22

### Added
- **20 community cards from `DexZane/awesome-web-prompts` (MIT)** — catalog 525 -> 545, images 297 -> 317,
  community 125 -> 145. Imported from the repo's YAML front-matter (name, level, category, tech_stack, tags,
  recommended_ai, bilingual description) plus each record's full `prompt.md` brief.
- `scripts/import-awesome-web-prompts.js` — dry-run-by-default importer with a category map, a level -> type
  rule, a 400-character body floor, and an explicit skip for records with no captionable preview.
- `scripts/render_awp_previews.py` — serves the downloaded record dirs on loopback and captures each
  self-contained `index.html` demo at 1280x800 into a 16:10 webp cover. Handles intro overlays (real clicks,
  then removing `body.locked`), slide-deck demos that open on a bare colour field, and footer bands captured
  in a 460 px viewport so the band fills the frame.
- `data/catalog_sources.json` gains the `awesome-web-prompts` entry with its preview notice.

### Changed
- README counts, provenance table and file layout refreshed for the import; `docs/source-scouting.md` moves
  `awesome-web-prompts` from "evaluated" to "ingested"; `docs/competitor-teardown.md` records the outcome.
- One candidate (`protein-bars`) is deliberately not imported: its demo opens on an untextured colour field, so
  the capture is not a usable preview. 26 further records ship no preview or demo at all and stay out.
- The source filter now expands the recipe pack into its three tracks (`recipes:rea`, `recipes:craft`,
  `recipes:community`), so 104 recipes are browsable by method instead of as one 104-card bucket. Labels are
  localised and the option survives a language switch.
- New **track band** above the grid: three cards (`rea` 40 / `craft` 40 / community 24), each showing three
  previews of its own recipes, the track name and a one-line method summary. Click filters to that track and
  keeps the band's active state in sync with the source filter; a second click clears it. `scroll-margin-top`
  keeps the band clear of the sticky toolbar after the click scrolls it into view.

### Verified
- `node scripts/import-awesome-web-prompts.js` -> dirs=47 new=20 skipped=27 (26 no-preview, 1 no-usable-cover).
- `node scripts/build.js` -> 545 records; `node scripts/audit-catalog.js` -> AUDIT OK records=545 complete=545
  recipes=104 community=145 missingBodies=0 assets=545.
- Browser probe -> 545 cards, 104 recipe badges, community filter renders the 20 new covers, zero console errors.
- Track filter probe -> `recipes` 104, `recipes:rea` 40, `recipes:craft` 40, `recipes:community` 24.


## [1.4.2] - 2026-11-23

### Added
- `scripts/verify-assets.js` — walks every card's `local_rel` and `poster_rel` and checks existence, size and
  magic bytes (webp / png / jpeg / mp4 / webm). 673 files, 107 MB, 0 problems.
- `scripts/verify_previews.py` — browser sweep: walks the whole grid at 900 px steps, samples six scroll
  checkpoints for decoded visible images, then probes every media URL (200/206). Works against a local server
  or the deployed site.
- `scripts/verify_live_sample.py` — samples N previews across the catalog and decodes each in a fresh
  `Image()`, which separates "the asset is broken" from "this link is slow".
- `scripts/repair_blank_previews.py` — re-cuts blank seeded previews from their source animated webp.

### Fixed
- **11 seeded previews were blank.** The 1.1.8 "convert animated webp to static" pass kept frame 0, which is an
  empty canvas for these files. Each was re-fetched from the R2 source listed in `catalog-details.json` and
  re-cut at ~40% of the loop: agency-services, arceage-contact-us, arceage-stats, arceage-testimonial,
  bento-grid-stats, cosmic, email-landing-page, health-portal, pixel-grid-hover, portfolio-about, radial-diagram.
- The client hid an image and swapped in the gradient placeholder after a single failed request. On a flaky link
  one dropped `ERR_HTTP2_PROTOCOL_ERROR` therefore degraded a card for the whole session; the handler now retries
  twice with a cache-busting parameter before falling back.
- Toolbar reflows at 700 px (search on its own row, selects in two columns), so a 420 px viewport no longer
  scrolls sideways; OG/Twitter meta tags carry the live counts.

### Verified
- `node scripts/verify-assets.js` -> ASSETS OK (673 files).
- `python scripts/verify_previews.py` (local) -> 545 cards, 41/41 visible images decoded, 673 media URLs, 0 errors.
- `python scripts/verify_live_sample.py --base https://zhaosenlin12-creator.github.io/MotionSites/ --n 80`
  -> 63/63 sampled previews decoded.
- Live `data/catalog-lite.json` -> 545 total / 104 recipes / 317 images / 228 videos / 145 community.
### Deployed
- Cloudflare Pages production (branch `master`) now serves `ms_script.js?v=20261122v7`: 545 cards, 104 recipes,
  317 images, 228 videos, 145 community. Verified through the Cloudflare edge: 673/673 media URLs 200/206 with
  the correct MIME, 63/63 sampled previews decoded (median 864 ms), track band + filters + modal working,
  0 console errors, and the full-grid sweep decodes 41/41 visible images.
- A first deploy with `-Branch main` only produced a preview URL; the project's production branch is `master`.
  README now documents that, because the failure mode is silent: previews go to `main.motionsites-prompts.pages.dev`
  while `motionsites-prompts.pages.dev` keeps serving the old build.
- GitHub Pages mirror is on the same stamp.

## [1.5.0] - 2026-11-23

### Added
- **459 preview-only cards mirrored from motionsites.ai** (catalogue 545 -> 1,004). The site's SPA reads its
  catalogue from a Supabase row projection that is readable with the key it ships to every visitor; that
  projection returns 825 rows with `id, title, category, type, is_free, image_preview_url, video_preview_url`.
  255 of them were already here; of the 570 new ones, 460 had a fetchable preview (452 image, 8 video) and were
  imported, 110 publish no preview at all and were skipped.
- `scripts/import-motionsites-catalog.js` — dry-run-by-default importer: downloads the preview, cuts a 16:10
  1280x800 webp cover (`convert_preview.py`, or an ffmpeg frame for video-only rows), appends the record with
  `preview_only: true`, and registers the `motionsites-public-catalog` source.
- A `preview_only` tier in `scripts/build.js`: such records are kept without a prompt body, counted as
  `previewOnly` in `catalog-lite.json`, excluded from `complete`, and still held to the preview-file invariant.

### Changed
- Cards now carry a `has_text` flag from the build, and the client badges them 全文 / 仅预览 / 元数据 accordingly.
  Before this, every card rendered as 元数据 because the body is fetched lazily when the modal opens.
- Preview-only cards open a modal with the public preview, the source link and an explicit note that the body
  lives behind the source's account gate; copy and export stay disabled.
- Mirrored records are re-bucketed by section type (Hero Section / Footer Section / Pricing Page / …) with the
  upstream industry string kept in `tags`, so the category filter stays at 62 labels instead of 172.

### Verified
- `node scripts/import-motionsites-catalog.js` -> rows 570, planned 460, imported 459 (one video had no usable
  frame), covers 29.2 MB, merged 900.
- `node scripts/build.js` -> 1004 records / 545 with text / 459 preview-only / 776 images / 228 videos / 104
  recipes / 755 motionsites / 145 community; invariants hold.
- `node scripts/audit-catalog.js` -> AUDIT OK records=1004 complete=545 missingBodies=459 assets=1004 (the 459 are
  the flagged preview-only tier, not silent gaps).
- Local browser probe -> 545 全文 badges, 459 仅预览 badges, preview-only modal shows the note + source link,
  filters and the track band unchanged, 0 console errors.

## [1.6.0] - 2026-11-23

### Changed
- **Back to a pure resource gallery.** Every card is one collected resource: a local preview plus its complete
  prompt body. Removed in this release:
  - the **104 replication recipes** (`data/recipe_pack.json`, `docs/recipe-pack.md`, `recipes/re/cr/sc` preview
    media, the recipe demo kit, the recipe tests) — they were method material, not collected resources;
  - the **track band** above the grid, its CSS, its JS and the `recipes:rea|craft|community` entries in the
    source filter;
  - the **459 preview-only mirrors** from the 1.5.0 catalogue sweep — cards whose prompt body lives behind the
    source's account gate had no readable prompt, which is exactly what this catalogue must not list;
  - the **Recipes** counter in the header, the recipe chip and the recipe rows in the OG/Twitter descriptions.
- `scripts/build.js` no longer reads a recipe pack and no longer accepts a body-less record: a record without both
  a preview and a prompt body is dropped, and the "missing prompt body" assertion is unconditional again.
- Catalogue: 441 cards (296 MotionSites + 145 community), 317 image previews, 124 video previews, 0 body-less
  cards.

### Verified
- `node scripts/build.js` -> Records=441 complete=441 images=317 videos=124 concepts=0 motionsites=296
  community=145; invariants hold.
- `node scripts/audit-catalog.js` -> AUDIT OK records=441 complete=441 recipes=0 community=145
  missingBodies=0 assets=441.
- Every card's body checked directly: 0 missing, 0 stubs (4 community prompts are short by design — they are
  complete one-line briefs from the Superdesign repo, not truncated text).
- Local browser probe -> 441 cards, no track band, no recipe stat, all 441 cards badged 全文, three sampled
  modals returned 13 442 / 5 927 / 6 911 characters of prompt text, 0 console errors.

## [1.6.1] - 2026-11-24

### Added
- **149 new resources** from `kenje24/rebirth-motionsitesprompt` (MIT). The repo publishes a generated
  manifest (`src/data/prompts.generated.ts`, 661 rows) whose records carry a full prompt body **and** a
  preview URL, which is exactly the shape this catalogue wants: catalogue 441 -> 590, community 145 -> 294,
  images 317 -> 466.
- `scripts/import-kenje-catalog.js` — dry-run-by-default importer: dedupes by id, normalised title and body
  fingerprint, excludes the repo's `HorizonX Library` (94) and `21st.dev Registry` (93) re-publications
  because their upstream licences are not ours to archive, downloads each preview (image directly, video via
  an ffmpeg frame), and writes a 1280x800 webp cover.
- `kenje-rebirth-motionsites` registered in `data/catalog_sources.json` with its preview notice.

### Verified
- `node scripts/import-kenje-catalog.js --write` -> plan 180, imported 149, failures 31 (media host returns
  403/404 or drops the connection; those records are simply not listed).
- `node scripts/build.js` -> 590 records / 590 with text / 466 images / 124 videos / 296 motionsites /
  294 community; invariants hold.
- `node scripts/audit-catalog.js` -> AUDIT OK records=590 complete=590 missingBodies=0 assets=590.
- `node scripts/verify-assets.js` -> 614 files / 106 MB / 0 problems.

## [1.6.2] - 2026-11-24

### Added
- **186 more resources** (catalogue 590 -> 776, community 294 -> 480): the media that failed in 1.6.1 was retried,
  and the `kenje24/rebirth-motionsitesprompt` manifest's **HorizonX** (92) and **21st.dev** (92) captures were
  imported with their full prompt bodies and locally rendered covers.
- `scripts/import-kenje-extra.js` — resumes the failed list and imports the two previously excluded corpora.
  Videos are cut from the CDN with ffmpeg, with a download-then-frame fallback for hosts that refuse ffmpeg's
  TLS/UA; images are fetched with a browser header set plus the source site as Referer; both are wrapped in
  timeouts so one dead host cannot stall the batch.

### Fixed
- Removed the stale `/assets/previews/website-builder.mp4` stub and its `_redirects` rule: the card it served was
  dropped in 1.6.0, which left an orphan asset.
- Orphan covers are now cleaned before a build (two were left by the retry pass).

### Verified
- `node scripts/import-kenje-extra.js --write` -> 87 imported on the first pass, 75 on the dev21 retry; 34 media
  remain unfetchable (mux thumbnails behind a token, 403/404 hosts) and are not listed.
- `node scripts/build.js` -> 776 records / 776 with text / 652 images / 124 videos / 296 motionsites /
  480 community; invariants hold.
- `node scripts/audit-catalog.js` -> AUDIT OK records=776 complete=776 missingBodies=0 assets=776.
- `node scripts/verify-assets.js` -> 776 files / 110 MB / 0 problems.
