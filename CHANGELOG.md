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
- 10 sample prompts across 6 categories:
  - Landing Page: `001-aurora-landing`, `002-glassmorphism-saas`
  - Hero: `003-magnetic-cta-hero`, `004-typewriter-hero`, `010-parallax-3d-layers`
  - SaaS: `005-pricing-cards`, `006-feature-marquee`
  - Agency: `007-portfolio-grid`
  - Dashboard: `008-live-metrics-dashboard`
  - Portfolio: `009-scroll-storytelling`
- `templates/starter.html` — minimal starter with reveal-on-load animation.
- `examples/hero-aurora.html` — fully working aurora hero, pure CSS.
- `examples/pricing-cards.html` — fully working pricing cards, pure CSS.
- `docs/catalog.json` — machine-readable index of all prompts.
- `docs/screenshots/` — 15 SVG previews (1 catalog hero, 1 prompt card, 1 categories row, 1 filters panel, 1 search spotlight, 10 per-prompt cards).
- This `CHANGELOG.md`.

### Notes
- The remote repo only had a stub `README.md` before this commit; all the content above is new.
- No binary assets are bundled — previews are SVG so the repo stays under 100 KB and diff-friendly.


## [1.1.0] - 2026-08-16

### Fixed
- `TypeError: DATA.map is not a function` when catalog-meta was wrapped as `{cards:[…]}` (commit `f7adb55`).
- All cards rendering as fallback gradients: `lazyMediaOf()` now trusts the URL extension over the (omitted) `local_kind`, so the 173 webp and 117 mp4-with-still-frame cards now actually render (`d181c61`, `2536f6e`).
- Dotted ids (e.g. `railroad.ai`) failed to switch to webp because the matcher regex `[w-]+` truncated at the first dot (`c26674b`).

### Changed
- Catalog-meta slim: 455 KB -> 187 KB raw (still wrapped as `{cards:[…]}`).
- Card previews upgraded from 480p single-frame to 1280px webp (q=85). 290 files rebuilt from `r2.dev` / `higgs.ai` originals; 116 cards switched from mp4 reference to webp still (`3787dae`).
- `catalog-lite.json` counts refreshed: 504 total, 451 with text, 292 images, 21 videos, 191 concepts, 365 MotionSites, 139 community.

### Added
- `.gitignore` rule for `.work/` (scratch artifacts from the webp rebuild).

### Removed
- Top-level temp files: `server.err`, `server.out`, `test_ffmpeg*.log`.

### Known limitations
- 21 of the 504 cards still point to a 480p mp4 (community-superdesign items that have only relative `prompts/...` paths in `catalog-details.json`, so we can't reach their source for a re-extract). They show as motion in the grid and modal.
- GitHub Pages is the overseas-only backup. Edge nodes belonging to Fastly IPs `185.199.108-111.153` RST on the operator's network; CF Pages is the canonical URL.

## [1.1.1] - 2026-08-31

### Fixed
- Restored motion for 99 cards whose mp4 had been replaced with a static first-frame webp during the 2026-08-16 quality upgrade; catalog now prefers mp4/webm where present so the grid loops motion again. 14 zero-byte `assets/previews/*.webp` files refilled from the R2 `animated (*).webp` source set.
- Catalog lite counts refreshed: 193 image + 120 video + 191 concept (was 292 / 21 / 191).
