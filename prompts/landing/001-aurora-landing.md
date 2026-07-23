---
id: 001-aurora-landing
title: Aurora ！ animated gradient landing
category: Landing Page
type: full-page
access: open
tags: [aurora, gradient, framer-motion, hero, cta]
palette: ["#7b9cff", "#b48cff", "#5cdcb1", "#ffba72"]
created: 2026-01-15
---

# Aurora ！ animated gradient landing

> A landing page that pairs a slowly-shifting conic-gradient backdrop with a frosted-glass hero card. Designed for SaaS launches.

## Preview

![preview](../../docs/screenshots/001-aurora-landing.svg)

## Meta

| Field | Value |
| --- | --- |
| Category | Landing Page |
| Type | full-page |
| Access | open |
| Tags | aurora, gradient, framer-motion, hero, cta |
| Palette | `#7b9cff`, `#b48cff`, `#5cdcb1`, `#ffba72` |

## Prompt

```text
Design a full-page landing for a SaaS analytics product called "Aurora". Use a dark navy background (#07080c) with a slowly-rotating conic gradient overlay cycling through #7b9cff, #b48cff, #5cdcb1, #ffba72, and #ff8ab1 ！ animate it via CSS @keyframes (filter: hue-rotate) over 24 seconds linear infinite. Place a sticky frosted-glass navigation bar at the top (backdrop-filter: blur(20px), rgba(7,8,12,.78)). The hero section should center a 1-line headline (Inter 700, 64px, letter-spacing -.03em), a 1-sentence sub-headline in muted gray, and two pill-shaped CTA buttons ！ primary in white, secondary with a thin border. Use Framer Motion to fade-up each block (y: 24 ★ 0, opacity: 0 ★ 1, stagger: 80ms) on mount. Below the hero, render a 3-column feature grid with rounded-2xl cards, each card having a 64x64 gradient icon, a 16px semibold title, and 2 lines of body text. The page should feel calm, expensive, and motion-rich but never noisy.
```

## Notes

- Pure CSS animation runs at 60fps on Edge / Safari / Firefox.
- Framer Motion requires `"use client"` in Next.js 13+ App Router.
- Conic gradient is GPU-accelerated but can flash on very old Android ！ fall back to a static linear gradient.

## Source

- Origin: curated from `xianxian-sensen` / `motionsites.ai`
- License: MIT
