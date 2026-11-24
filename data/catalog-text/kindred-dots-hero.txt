# Kindred — Dot-Matrix Hands Hero (exact recreation prompt)

Build a single-file, full-viewport landing hero for **Kindred**, a community platform for creatives. The page is a calm off-white canvas with a centered headline, a black pill CTA with a rainbow underglow, and a row of partner logos at the bottom. Behind the copy, **two human hands reach toward each other (Creation-of-Adam style), drawn live in code as a black dot-matrix / LED halftone made of horizontal scanline rows of dots**. The hands slowly drift, roll and breathe, and each hand periodically **glitch-dissolves dot by dot into a second pose** and back. The background is rendered on a `<canvas>` every frame. It is not a video and not a GIF.

Plain HTML, CSS and vanilla JS in one file, with no frameworks. The only external resources are the Google Font and one Higgsfield image used as the luminance source for the halftone.

---

## 1. Assets (use exactly these URLs)

| Use | URL |
|---|---|
| Hand source sheet (2×2 black-and-white photo sheet of four isolated hands on pure white, 2688×1520 original, requested at w=1600 → 1600×905). Must be loaded with `crossOrigin="anonymous"` (the proxy sends `access-control-allow-origin: *`) so `getImageData` works. | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261030_025250_100df7b8-31fd-4614-aa4a-c1b7d5b6b273.png&w=1600&q=85` |
| Font | `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap` (with preconnect to fonts.googleapis.com and fonts.gstatic.com crossorigin) |

Sheet layout (fractions of the sheet's width and height, `[x, y, w, h]`):
- `LA` = `[0, .06, .47, .40]`, top-left: left forearm entering from the left edge, palm down, index finger pointing right, other fingers loosely curled (Adam's hand).
- `RA` = `[.53, .06, .47, .40]`, top-right: right forearm entering from the right edge, index finger pointing left, fingers drooping (God's hand).
- `LB` = `[0, .55, .47, .40]`, bottom-left: the left hand open, fingers spread, palm down, reaching right.
- `RB` = `[.53, .55, .47, .40]`, bottom-right: the right hand open, palm turned up, fingers curved, reaching left.

Pose A = the pointing pair (LA + RA). Pose B = the open pair (LB + RB).

No other images. Logos are inline SVG.

---

## 2. Design tokens

```css
:root{--bg:#f7f7f5;--ink:#111111;--mute:#9a9a9a;--sub:#7b7b7b}
```
- Page background `#f7f7f5` (warm off-white). Dots are `#0d0d0d`.
- Font: **Inter** 400/500/600, `-webkit-font-smoothing:antialiased`, fallback `system-ui, sans-serif`.
- Global reset: `*{box-sizing:border-box;margin:0;padding:0}`. `html,body{height:100%}`.

---

## 3. Structure

```
section.hero (position:relative; height:100vh; min-height:660px; overflow:hidden)
  canvas#dots (absolute, inset:0, 100%×100%, display:block)
  nav
  div.copy
  div.logos
```
Everything except the canvas has `position:relative|absolute; z-index:3`.

### 3.1 Nav
- A flex row centered horizontally, `gap: clamp(18px, 2.6vw, 40px)`, `padding-top: 36px`, font-size 13.5px.
- **Brand:** an inline SVG mark (16×18, viewBox `0 0 16 18`, path `M2 0h4v18H2zM7 9c3-1 5-4 6-9h3c-1 5-3 8-6 9 3 1 5 4 6 9h-3c-1-5-3-8-6-9z`, a stylised "K" with a straight stem and two curved arms) plus "Kindred". Weight 600, 15px, letter-spacing −.01em, gap 8px, margin-right 10px.
- **Links:** Platform · Marketplace · Creators · Resources · Company. Colour `#3a3a3a`, no underline; hover `#000` (transition .2s).
- **Sign In pill:** background `#111`, white text, padding 10px 21px, radius 999px, weight 500, margin-left 10px. On hover it rises 1px (`translateY(-1px)`, .25s).

### 3.2 Copy block
- Absolute: `left:50%; top:24.5%; transform:translateX(-50%)`, centered text, `width:min(92vw,720px)`.
- `h1`: weight 500, letter-spacing −.035em, line-height 1.04, `font-size: clamp(38px, 3.75vw, 68px)`.
  - Line 1, "Reconnecting", is a block span in grey `#9a9a9a`.
  - Line 2, "Human Creativity.", is ink `#111`.
- Subline `p`: "We’re not building another platform. We’re building a place where people belong." Margin-top 20px, auto sides, `max-width:340px`, colour `#7b7b7b`, `font-size:clamp(13px,1.02vw,15.5px)`, line-height 1.4. It wraps to two centered lines.
- CTA wrapper `.cta`: inline-block, relative, `margin-top: clamp(34px, 3.6vw, 52px)`.
  - The anchor "Join the circle" is a black `#111` pill with white 13.5px weight-500 text, padding 11px 20px, radius 999px.
  - **Rainbow underglow:** a `::before` element, absolute, `left:10%; right:10%; bottom:-6px; height:16px; border-radius:50%`, with background `linear-gradient(90deg,#ffcf5a,#7dffa8,#5ad7ff,#9b7bff,#ff6fd8,#ffb36b)`, `filter: blur(9px)`, opacity .85. It sits behind the pill and peeks out below it as a soft spectrum glow.
  - Hover: the glow goes to opacity 1, `blur(12px)` and `bottom:-9px`. The pill rises 1px. All transitions .3s.

### 3.3 Partner logos
- Absolute, `bottom: clamp(28px, 6vh, 64px)`, full width, flex centered, `gap: clamp(26px, 4.6vw, 66px)`, wraps, padding 0 16px.
- Colour `#8d8d8d`, `font-size: clamp(14px, 1.18vw, 17px)`, weight 500, letter-spacing −.01em. Each logo is a 17×17 inline SVG icon (fill currentColor) plus a word, gap 7px.
- The six logos, all fictional:
  1. **Lumenix**, leaf: `M3 15c0-7 5-12 14-12-1 9-6 14-13 13l-1 2-2-1z`
  2. **Velora**, hexagon ring: `M10 1l8 4.5v9L10 19l-8-4.5v-9zM10 6l-4 2.3v4.4L10 15l4-2.3V8.3z`
  3. **Nimbus**, double wave: `M1 5q4.5-3 9 0t9 0v3q-4.5 3-9 0t-9 0zm0 7q4.5-3 9 0t9 0v3q-4.5 3-9 0t-9 0z`
  4. **Quanta**, concentric rings: `M10 1a9 9 0 110 18 9 9 0 010-18zm0 3a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 110 6 3 3 0 010-6z`
  5. **Solstice**, two peaks: `M1 17L7 6l3 5 3-7 6 13z`
  6. **Parallax**, stacked layers: `M10 1l9 4-9 4-9-4zm-9 8l9 4 9-4v3l-9 4-9-4zm0 5l9 4 9-4v2l-9 4-9-4z`
- All SVG viewBoxes are `0 0 20 20`.

---

## 4. The dot-matrix hands (canvas, the core of the design)

### 4.1 Pipeline per frame
1. Load the sheet once. Slice it into **four pre-downscaled tiles**, one 420px-wide canvas per `SRC` rect (height from aspect), drawn with `imageSmoothingQuality='high'`.
2. Keep two tiny offscreen "field" canvases, `fA` and `fB` (`willReadFrequently:true`). Each is sized **cols × rows**, so each pixel equals one dot.
3. Every frame, fill both fields white. Draw pose-A tiles (LA, RA) into `fA` and pose-B tiles (LB, RB) into `fB`, each with its hand's current transform (4.3). Read both with `getImageData`.
4. Clear the visible canvas. For each grid cell, pick a field (4.4), turn its luminance into a quantised dot size, and draw a filled circle in `#0d0d0d`.

### 4.2 Grid
- `DPR = min(2, devicePixelRatio)`. The canvas backing size is W·DPR × H·DPR. Draw with `setTransform(DPR,0,0,DPR,0,0)`.
- Horizontal pitch `step = max(5, W/205)` (≈7px at 1440 wide).
- Row pitch `rowStep = step × 2.05`. The rows read as LED scanlines, with dots nearly touching along a row and clear gaps between rows.
- `cols = ceil(W/step)`, `rows = ceil(H/rowStep)`. The dot centre is `((i+.5)·step, (j+.5)·rowStep)`.
- Base radius `R = step × .46`.
- Per-cell dissolve seed: `seed = .55·hash(i,j) + .45·hash(j·3.1, 7.7)`. It is mostly random per dot, with a per-row bias so dissolves streak along rows. Here `hash(a,b) = fract(sin(a·127.1 + b·311.7)·43758.5453)`.
- Recompute everything on resize.

### 4.3 Hand placement and drift
- `LOOP = 20` seconds. `a = 2π·t/LOOP`. Phase `ph = 0` for the left hand and `π` for the right, so they move in counter-phase.
- Block size: `hw = W·.53` (portrait `W·.66`). `hh = hw · (.40·1520)/(.47·2688)`, which keeps the sheet aspect.
- Vertical centre: `cy = H·.54` (portrait `H·.66`).
- Base x position:
  - Left: `x = reach − W·.045`.
  - Right: `x = W − hw + W·.045 − reach`.
  - The forearms run past the screen edges.
- Motion:
  - `reach = (.035·sin(a+ph) + .012·sin(2a+1.3+ph))·W`: the hands slowly reach in and pull back.
  - `scale = 1 + .07·sin(a+.9+ph)`: they breathe toward and away from the viewer.
  - `rot = (left ? 1 : −1) · .045·sin(a+2.1+ph)` radians: a gentle roll.
- Transform order when drawing into the field: scale to field space `(cols/W, rows/H)`; translate to the pivot (left edge or right edge, `cy`); rotate; scale; translate back. Then `drawImage(tile, x, cy−hh/2, hw, hh)`.

### 4.4 Pose switches (glitch dissolve)
- `smooth(a,b,x)` is a clamped smoothstep. `mixAt(t,on,off,dur) = smooth(on,on+dur,t) · (1 − smooth(off,off+dur,t))`.
- Left half (`i < cols/2`): `mL = mixAt(t, 6.2, 14.6, 1.6)`. Right half: `mR = mixAt(t, 2.4, 10.4, 1.6)`.
  - The right hand opens at 2.4s and returns at 10.4s. The left opens at 6.2s and returns at 14.6s.
  - Both are back in pose A before the 20s loop restarts, so the loop is seamless.
- Per dot: `useB = seed < m`, and sample `fB` if true, otherwise `fA`. Dots switch in a scattered, row-streaked order.
- While a switch is in progress (`0.001 < m < 0.999`), any dot with `|seed − m| < .12` sits on the "front". Its value is multiplied by `|seed−m|/.12`, and also by `.3` when `hash(i+tick, j) ≤ .4`. The front flickers, thins and sparkles as it sweeps.

### 4.5 Luminance → dot
- `lum = red/255` of the chosen field pixel.
- `v = clamp((1 − lum − .16)/.42, 0, 1)`. White background gives no dot. Mid-grey skin gives big dots. Highlights give small dots, which produces visible shading inside the hands.
- Shimmer: `v *= .86 + .14·sin(t·3.2 + seed·40)`.
- Centre fade: with `cx = |(i+.5)/cols − .5|`, apply `v *= smooth(.035, .11, cx)`. The fingertips dissolve just before the CTA and never touch.
- Copy quiet zone: with `ex = cx/.2` (portrait `.44`) and `ey = ((j+.5)·rowStep/H − .385)/.085` (portrait centre `.33`), apply `v *= smooth(.85, 1.25, hypot(ex,ey))`. No dots cross the headline subline.
- **Quantise** to `LEVELS = [0, .26, .52, .78, 1]`: take the highest level with `v ≥ level − .13`. Level 0 draws nothing.
- Radius = `R × level`, except the lowest level, which uses `R × .38`. That gives the tiny "····" pinpoints in light areas. The result reads as a crisp LED halftone with five sizes, not a smooth gradient.

### 4.6 Row glitch
- `tick = floor(t·7)`, so the pattern changes 7 times a second.
- For each row, if `hash(j, tick) > .965`, the whole row slides by `round((hash(tick, j) − .5)·8)` columns. The sample index is `clamp(i − shift)`.
- A few random rows jump sideways for a beat, like a misaligned LED display.

### 4.7 Loop
- `requestAnimationFrame` calls `render((now − t0)/1000)`. `render` wraps `t` into `[0, LOOP)`.
- Expose `window.__render = render` so a deterministic recorder can drive time.

---

## 5. Responsive (≤760px)
- Nav: hide every link except Sign In. Use `justify-content:space-between` with padding `22px 18px 0`.
- Copy `top:20%`.
- Logos wrap onto two rows with `gap:14px 24px` and font-size 13px.
- On a portrait viewport (H > W), the hand band sits lower at `cy = .66H`, the hands are wider (`.66W`), and the quiet zone moves to `.33H` with width `.44`. The hands sit under the CTA.

## 6. Feel
Quiet, editorial and human. The hero should look like a monochrome LED wall showing two reaching hands. Motion is slow and continuous: drift, breathe, roll, shimmer. Every few seconds one hand crackles apart dot by dot and re-forms in a new pose. Keep everything black on warm off-white. The only colour is the soft rainbow glow under the CTA.