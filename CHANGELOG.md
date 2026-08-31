
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
- 12 cards pruned from `catalog-meta.json` / `catalog-details.json` because they were dead-ends for end users: no `assets/previews/<id>.*` file was on disk **and** no `data/catalog-text/<id>.txt` body was available, so the gallery only showed a fallback concept card and a paywall placeholder - useless in offline use.
  - New (2026-08-31 batch, 11): `xportfolio-hero`, `evr-ventures-hero`, `railroad-ai-hero`, `grow-ai-hero`, `planet-orbit-hero`, `neovision-landing`, `finlytic-hero`, `orbit-web3-hero`, `apex-saas-hero`, `mindloop-hero`, `stellar-ai-v2-hero`.
  - Legacy (1, asset already missing): `community-superdesign-the-stacking-cards-effect`.
- Total cards: **579 -> 567**. Image/video/concept counts unchanged (the 12 cards fell in the implicit "neither" bucket that never surfaced as usable content).