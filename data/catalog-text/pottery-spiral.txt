# Ceramics: spiral ticker hero, recreation prompt

Build a single full-screen hero section for a studio pottery portfolio. It shows 34 small square photographs of handmade ceramics flowing endlessly along one round spiral of three loops, centred on the screen. A huge word, "Ceramics", spans the full width along the bottom edge, its letters cut off by the bottom of the screen, and the small monospace label "Studio pottery" sits just above its left end. The tiles pass behind the word, and a white fade at the bottom of the screen dissolves them before they reach it. The tiles drift slowly forever. The mouse wheel, touch swipes and the arrow, Page and Space keys push them faster forward or backward along the spiral, with no end, because the page itself never scrolls. It is a single `index.html`, with no framework or library, and the fonts are self-hosted.

## 1. Assets

| Asset | URL | How it is used |
| --- | --- | --- |
| Tile sheet (3×3 grid of 9 ceramics photos, 2048×2048 PNG) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261118_062935_549a25c0-75f8-4239-bebd-64d1f851ec20.png | Never loaded directly. It goes through the resizer below. |
| Tile sheet as served (WebP, 1200 px wide) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_062935_549a25c0-75f8-4239-bebd-64d1f851ec20.png&w=1200&q=85 | The background image of every tile. Each tile shows one cell through `background-size: 300% 300%` and `background-position` set to the cell's column × 50% and row × 50%. |

The sheet's nine cells, read left to right and top to bottom:
- **Cell 0:** a sage-green bowl with a wavy rim.
- **Cell 1:** a terracotta bud vase.
- **Cell 2:** a raw rust-orange clay texture.
- **Cell 3:** a speckled oatmeal plate seen from above.
- **Cell 4:** a celadon cup.
- **Cell 5:** a bone-white fluted cup.
- **Cell 6:** a deep sage bottle vase.
- **Cell 7:** a cream crackle-glaze round vase.
- **Cell 8:** a terracotta and white crackle bowl.

All of them are soft, slightly out-of-focus product photos on a blurred linen backdrop. The resizer sends `access-control-allow-origin: *` and image/webp.

## 2. Fonts

| Role | Family | Weight | Source (latin subset WOFF2) |
| --- | --- | --- | --- |
| Big word | Inter, display optical size (registered as "Inter Display") | 600 | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_fjbvMwCp50PDca1ZL7.woff2 (Google Fonts request: `family=Inter:opsz,wght@32,600`) |
| Label | Geist Mono | 400 | https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeE9KK5U5Ck.woff2 |

Declare both with `@font-face` and `font-display: block`, using the family names "Inter Display" and "Geist Mono". The big word uses `font-variation-settings: "opsz" 32`. Fallbacks: Inter, then system-ui, then sans-serif for the word; ui-monospace, then monospace for the label. The page waits for both fonts before its first layout, because the word is fitted to the screen width by measuring it. A failsafe starts the page after 1.5 s even if the fonts never load.

## 3. Head and colour tokens

- Document language: en.
- Title: "Ceramics — Studio pottery".
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`.
- There is no navigation, no buttons and no other text.
- A visually hidden h1 reads "Ceramics — Studio pottery". The section is a `main` element with aria-label "Ceramics, studio pottery". Everything decorative is aria-hidden.

| Token | Value | Use |
| --- | --- | --- |
| --bg | #ffffff | Page and section background |
| --ink | #111111 | Big word |
| --label | #6b6b63 | Label text (warm grey) |
| --tile-bg | #e8e2d4 | Bone-coloured placeholder behind each tile until the sheet loads |

- **Page box:** html and body are 100% tall, with `overflow: hidden`, `overscroll-behavior: none` and a white background.
- **Section:** relative, 100% wide, 100vh tall (100svh where supported), `overflow: hidden`, `touch-action: none`.

## 4. Layers, bottom to top

| z-index | Layer | Details |
| --- | --- | --- |
| 1 | Orbit | A full-section layer holding the 34 tiles. Within it each tile gets its own z-index of 1 + floor(distance along the path / 10), so tiles further along the path draw over earlier ones. |
| 2 | Bottom fade | Absolutely placed at the bottom, full width, 46% of the section height. Linear gradient from top to bottom: white at 0 opacity at 0%, 0.55 at 38%, 0.88 at 66%, solid #fff at 100%. Ignores pointer events. |
| 3 | Big word | A full-section SVG (viewBox = section width × height) containing one text element, "Ceramics". |
| 3 | Label | A paragraph, "Studio pottery", absolutely positioned. |

## 5. Desktop layout (any screen that is not a portrait phone)

The base unit is s = min(width / 1440, height / 900), with a floor of 0.42. At 1440×900, s = 1.

- **Spiral:**
  - It's a circle, not an oval: its x and y radius are both 470 × s (470 px at 1440×900).
  - Its centre is at 50% of the width and 44% of the height (720, 396 at 1440×900).
  - The outermost loop bleeds slightly off the top edge.
- **Tiles:** squares of round(70 × s) px (70 px at 1440×900), with no border, radius or shadow.
- **Big word, size:**
  - Fit its rendered width to the section width minus a left pad and a right pad, where pad = 12 × max(width / 1440, 0.6) and right pad = 25 × max(width / 1440, 0.6).
  - To fit it, measure the text at font-size 100 with `getComputedTextLength()`, then scale.
  - Cap the font size at 50% of the section height so short landscape screens keep the spiral visible.
  - At 1440×900 this gives about 326 px, and the ink spans x 12 to 1415.
  - Letter-spacing is -0.02em, weight 600, colour #111111.
- **Big word, position:**
  - Shift it horizontally so its ink starts exactly at the left pad: x = pad minus the text's getBBox().x at x 0.
  - Its baseline sits below the bottom edge, at section height + 0.04 × font size, so the bottoms of the letters are cut off.
  - Its cap top is at baseline - 0.727 × font size (about y 676 at 1440×900).
- **Label:**
  - Geist Mono 400, max(12, 21 × s) px (21 px at 1440), line-height 1, no letter-spacing, colour #6b6b63, no wrapping.
  - Left: max(16, 40 × width / 1440) px.
  - Top: cap top - max(8, 11 × s) - 0.8 × label size, so its baseline sits about 11 px above the cap top of the "C". At 1440×900 the box is about x 40, y 640, 176 × 21.

## 6. Phone layout (width under 820 px and portrait)

- **Spiral:**
  - Both radii are 62% of the width, so it bleeds off both sides.
  - Its centre is at 50% of the width and 42% of the height.
- **Tiles:** round(min(width × 0.115, 60)) px (45 px at 390 wide).
- **Big word:**
  - Pad is max(8, 2% of the width) on both sides, and the word fills the width between them (about 85 px font size at 390 wide).
  - The baseline rule is the same as on desktop.
- **Label:** 12 px, left max(16, 4.5% of the width), 12 px above the cap top.

Tablets and landscape phones use the desktop rules with the unit floor of 0.42; on a landscape phone the 50%-height cap on the word applies. Rebuild the layout on every window resize, throttled to one per animation frame. The page must never scroll sideways.

## 7. The spiral path (CSS motion path)

Every tile is absolutely positioned at top 0, left 0, and rides one shared path given as a CSS custom property:
- `offset-path: path("…")` set from script.
- `offset-rotate: auto`, so each tile turns to the path's direction and its tilt changes continuously as it travels.
- The default anchor, so the tile's centre sits on the path.

The path shape is an Archimedean spiral:
- It starts at the outer right edge (angle 0, radius = full) and runs clockwise on screen (angle increasing with y pointing down) inward to the centre.
- It makes 3 full turns (angle range 0 to 6π).
- The radius shrinks linearly from 100% to 5% of the full radius.
- Point at parameter t from 0 to 1: x = cx + cos(6πt) × rx × f, y = cy + sin(6πt) × ry × f, where f = 1 - 0.95t.

It must be smooth, not a polyline:
- Build it from 48 cubic Bezier segments (16 per turn) using exact tangents.
- For each segment from t0 to t1 (step h = 1/48), the first control point is P(t0) + P′(t0) × h / 3 and the second is P(t1) - P′(t1) × h / 3.
- The derivative is P′(t) = (rx × (-sin(a) × A × f + cos(a) × (-0.95)), ry × (cos(a) × A × f + sin(a) × (-0.95))), with A = 6π and a = A × t.
- A polyline of many short straight lines makes the tiles' rotation step visibly at every corner. That jitter was rejected.

## 8. Tiles

- **Count:** 34 tiles, evenly spaced along the path: tile i starts at offset i × 100 / 34 %.
- **Images:** tiles cycle through the sheet cells in the order 0, 4, 2, 6, 1, 8, 3, 7, 5, repeating, so neighbours always differ.
- **Rendering:** each tile shows its cell, is not repeated, and has `will-change: offset-distance, opacity`. Its starting opacity is 0 until the first paint.

## 9. Motion

The script owns one shared offset, "base", in percent of the path, and writes these to every tile every animation frame:
- **Position:** offset-distance = ((base + i × 100 / 34) mod 100) %. Keep it positive: add 100 before the final mod.
- **Opacity:** min(1, d / 10, (100 - d) / 10), where d is that tile's distance. Tiles fade in over the first 10% of the path at the outer edge and fade out over the last 10% as they reach the centre, so the wrap from 100% back to 0% is invisible.
- **Stacking:** z-index = 1 + floor(d / 10).

| Motion | Value | Notes |
| --- | --- | --- |
| Base drift | +0.001% of the path per millisecond (1% per second; a full loop takes 100 s) | Runs forever from page load. Measured on the reference live site. |
| Frame step cap | Per-frame elapsed time is capped at 40 ms | After a stall or a background tab the tiles never jump. |
| Scroll push | 0.0043% of the path per pixel of scroll input | About 2.15% per 500 px. Down or swipe-up pushes forward, up or swipe-down pushes backward. |
| Push easing | The pending push is applied as a smoothed step each frame: step = push × (1 - e^(-dt / 110 ms)); add step to base and subtract it from push; snap push to 0 below 0.0001 | Eases out over about 0.4 s, then the base drift carries on. |

Inputs (the infinite scroll):
- **Wheel:** a non-passive `wheel` listener on window calls preventDefault. Its deltaY is converted to pixels (×16 for line mode, × window height for page mode), clamped to ±400 per event, then multiplied by the push rate.
- **Touch:** while a finger moves on the section, each touchmove adds (previous y - current y) × 1.6 pixels of push. Swiping up pushes forward.
- **Keys:**
  - ArrowDown +120 px, ArrowUp -120 px.
  - PageDown +600 px, PageUp -600 px.
  - Space +600 px, Shift+Space -600 px.
  - Each calls preventDefault.

Because the document itself never scrolls, there is no end. The tiles keep responding to scrolling in either direction forever, and they never stop moving when input stops.

## 10. Opening: the spiral forms softly from the edge inward

A short, subtle load animation of about 2 s, running in the same direction the tiles flow. The tiles do not travel around the loops. Each tile appears at its own place on the spiral, gliding a tiny distance inward along the path while it fades in and grows slightly. The outermost tiles start first and the ones nearer the centre follow, so the spiral forms from the outside in. The base drift keeps running underneath the whole time.

How it works, per tile, with d its normal distance along the path:
- **Start time:** delay = d / 100 × 1100 ms. The outermost tile (d near 0) starts at 0 ms, and the tile at the centre end (d near 100) starts at 1.1 s.
- **Progress:** e = sin(k × π / 2), an ease-out sine, where k = clamp((time since start - delay) / 850 ms, 0, 1).
- **Position:** offset-distance = max(0, d - 2.4 × (1 - e)). The tile starts 2.4% of the path further out and glides inward to its slot. That is less than the 2.94% gap between neighbours, so tiles never cross.
- **Opacity:** its normal opacity × e.
- **Scale:** its CSS `scale` is 0.85 + 0.15 × e.
- **End of the intro:** at 1.95 s (1100 + 850 ms) the intro ends and the normal formula takes over at scale 1, with no jump.

On the first layout the root gets a "ready" class. The word's SVG and the label then fade up once:
- **From:** opacity 0, translateY(14 px).
- **To:** opacity 1, no transform.
- **Timing:** 1 s, with easing cubic-bezier(.22, 1, .36, 1).

| Element | Delay | Duration |
| --- | --- | --- |
| Spiral tiles (staggered edge to centre) | 0 to 1.1 s | 0.85 s each |
| Big word | 0.7 s | 1 s |
| Label | 0.82 s | 1 s |

## 11. Reduced motion

With `prefers-reduced-motion: reduce`:
- There is no opening animation: the full spiral shows at once.
- The text shows immediately with no transition.
- The tiles are painted once at their starting positions and never move.
- Wheel, touch and key input do nothing.

## 12. Acceptance checklist

- At 1440×900 the word "Ceramics" spans x 12 to about 1415, its cap top is near y 676, and its bottom is cut off by the screen.
- "Studio pottery" sits just above the left end of the "C".
- The spiral is a true circle of 3 loops centred at about (720, 396), with the outer loop touching the top edge.
- Tiles are 70 px and rotate smoothly with the curve, with no stepping or jitter.
- Tiles pass behind the word, and the bottom white fade hides them before they reach it.
- On load the spiral forms softly from the outer edge inward in about 2 s, in the same direction the tiles flow: tiles fade in and grow slightly in place with a small inward glide, with no spinning around the loops and no overlaps.
- Tiles fade in at the outer start of the path and out at the centre, with no visible pop.
- With no input, the tiles move 1% of the path per second, indefinitely.
- Scrolling down speeds them forward and scrolling up sends them back. This keeps working after any amount of scrolling, and the page never moves.
- On a 390×844 phone the spiral bleeds off both sides, the tiles are about 45 px, and the word fills the width at the bottom.
- There is no horizontal scroll at any width, and no console errors.