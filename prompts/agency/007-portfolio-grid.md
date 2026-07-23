---
id: 007-portfolio-grid
title: Portfolio grid — masonry reveal
category: Agency
type: full-page
access: open
tags: [masonry, portfolio, scroll-reveal, agency]
palette: ["#0d0d0d", "#e7e7e7", "#ff5f1f"]
created: 2026-01-28
---

# Portfolio grid — masonry reveal

> A 3-column masonry of project thumbnails that reveal in a staggered cascade as the user scrolls. Designed for digital agencies.

## Preview

![preview](../../docs/screenshots/007-portfolio-grid.svg)

## Prompt

```text
Build a portfolio grid for "Studio Onyx", a digital agency. Above the grid: a 96px bold headline "Selected work" with a 1-line subtitle. Below: a CSS-grid masonry using `grid-template-rows: masonry` (fallback to a fixed 4-row template with manual spans for older browsers). Each tile is a 16:10 thumbnail with a soft #0d0d0d overlay, the project name in 18px Inter 600 white, and a tag pill (e.g. "Branding", "Web", "Motion") in the top-left. As tiles enter the viewport, fade them up (y: 32 — 0, opacity: 0 — 1, stagger: 60ms) using IntersectionObserver and a CSS `transition: transform .8s cubic-bezier(.2,.7,.2,1), opacity .8s`. Hover: lift the tile by -6px and dim the overlay by 25%. Include a sticky filter chip row above the grid (All / Web / Brand / Motion) that animates the active chip with a sliding pill background.
```

## Notes

- `grid-template-rows: masonry` is currently only in Firefox behind a flag — use the CSS Grid `span N` fallback for cross-browser support.
- Lazy-load tile images with `loading="lazy"`.

## Source

- Origin: curated from `giglianepefrei`
- License: MIT
