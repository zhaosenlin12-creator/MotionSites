---
id: 003-magnetic-cta-hero
title: Magnetic CTA hero �� pointer-driven
category: Hero
type: hero
access: open
tags: [magnetic, pointer, gsap, cta, micro-interaction]
palette: ["#ff7a59", "#ffd166", "#06d6a0"]
created: 2026-01-22
---

# Magnetic CTA hero �� pointer-driven

> A single-screen hero where the primary CTA button "magnetically" follows the cursor within a 60px radius, then springs back when the cursor leaves. Built with GSAP `quickTo`.

## Preview

![preview](../../docs/screenshots/003-magnetic-cta-hero.svg)

## Prompt

```text
Create a minimal one-screen hero for "Forge", a developer-focused CI product. Background: solid #0a0e1a. Center: a 72px bold headline "Ship 10�� faster", a 1-line sub-headline, and a 56��56 rounded CTA "Start building ��" with a soft radial-gradient background (#ff7a59 �� #ffd166). Use GSAP to create two `quickTo` instances on the button's x and y, with a duration of 0.4s and ease "power3.out". On `pointermove` over the document, project the cursor onto the button center; if the distance is under 120px, translate the button by 25% of that delta; otherwise snap to 0,0. On hover, scale the button to 1.05; on click, briefly flash the gradient (transition 80ms ease-in-out to a brighter highlight, then back). Use Inter 700 / 16px / letter-spacing -.02em for the headline and JetBrains Mono for the CTA label.
```

## Notes

- Disable on touch devices (`pointer: coarse` media query).
- Keep the magnetic field small (�� 25% delta) �� too much feels nauseating.

## Source

- Origin: curated from `giglianepefrei`
- License: MIT
