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
