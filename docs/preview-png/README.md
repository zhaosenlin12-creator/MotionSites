# Preview PNGs (rendered)

These PNGs are **rendered previews** of the SVG mockups in `../screenshots/` (and the HTML examples in `../../examples/` / `../../templates/`). They were generated with Playwright Chromium at 1280×800.

You don't need these files to use the repo — they exist so the catalog can be previewed on systems where SVG / HTML rendering isn't available (e.g. README thumbnailers, Slack / Discord link previews, image-aware editors).

## Regenerate

```bash
# Requires Python 3.10+ with playwright installed
python ../../scripts/render_previews.py
```

The script will overwrite every `.png` here with a fresh render. SVG sources stay unchanged.

## Files

| PNG | Source | Notes |
| --- | --- | --- |
| `catalog-hero.png` | `../screenshots/catalog-hero.svg` | Full hero with 4-up category row + 8-card grid |
| `prompt-card.png` | `../screenshots/prompt-card.svg` | Single prompt card detail |
| `categories.png` | `../screenshots/categories.svg` | Category chip row |
| `filters.png` | `../screenshots/filters.svg` | Multi-dimensional filter panel |
| `search-spotlight.png` | `../screenshots/search-spotlight.svg` | Search-active state with glow |
| `001-aurora-landing.png` … `010-parallax-3d-layers.png` | `../screenshots/*.svg` | Per-prompt preview cards |
| `hero-aurora.png` | `../../examples/hero-aurora.html` | Working aurora hero |
| `pricing-cards.png` | `../../examples/pricing-cards.html` | Working pricing cards |
| `starter.png` | `../../templates/starter.html` | Starter template mid-reveal |
