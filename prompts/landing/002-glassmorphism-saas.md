---
id: 002-glassmorphism-saas
title: Glassmorphism SaaS ¡ª frosted layers on scroll
category: Landing Page
type: full-page
access: open
tags: [glassmorphism, scroll, frosted, backdrop-filter]
palette: ["#a8c5ff", "#d3a4ff", "#82e8c4"]
created: 2026-02-02
---

# Glassmorphism SaaS ¡ª frosted layers on scroll

> Multi-layer frosted cards that drift up at different speeds as the user scrolls. Built around `IntersectionObserver` + CSS transforms.

## Preview

![preview](../../docs/screenshots/002-glassmorphism-saas.svg)

## Prompt

```text
Build a single-page SaaS landing for "Lumen", a design-collaboration tool. Background: a deep radial gradient from #1b1f3a to #06070d. Stack three semi-transparent "frosted" panels (rgba(255,255,255,.06), backdrop-filter: blur(18px), border: 1px solid rgba(255,255,255,.12), border-radius: 24px) in a column. Each panel holds one feature: real-time cursors, comment threads, and design-system sync. As the user scrolls, panels translateY from +60px to 0 and fade opacity 0 ¡ú 1, staggered 120ms apart, using IntersectionObserver to add a `.visible` class. Inside each panel: a 24px semibold title (Inter 600), a 1-line muted description, and a "See it live ¡ú" link in accent #a8c5ff. End the page with a wide CTA banner with a subtle moving-noise SVG overlay (animateTransform translate).
```

## Notes

- `backdrop-filter` requires Safari prefix `-webkit-backdrop-filter`.
- `IntersectionObserver` threshold `0.15` keeps animations smooth on mobile.

## Source

- Origin: curated from `Melectrona` / `motionsites.ai`
- License: MIT
