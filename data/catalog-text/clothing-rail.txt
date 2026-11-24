# HERO PROMPT — "Offcut" streetwear clothing-rail hero (exact recreation)

Build a single self-contained `index.html` (inline `<style>` and `<script>`, no framework, no build step) that recreates the "Offcut" hero exactly as specified below. It is a dark, minimal streetwear shop hero: a gothic blackletter logo, a polished chrome clothing rail across the page, ten garments hanging on it **edge-on in real CSS 3D** that swing round to face the viewer when hovered, a caption under the faced garment, a "See availability" pill, and a red scrolling marquee band at the bottom. Clicking a garment lifts it off the rail into a large centred detail view with a product counter, an italic serif name, a price, prev/next arrows and a Close button, while the rest of the page washes out.

Every number in this document is load-bearing. Where a value is given, use exactly that value. Do not add any element, text, effect, sound, loader or animation that is not described here. Page `<title>` is `Offcut`, `lang="en"`, UTF-8, viewport `width=device-width,initial-scale=1`.

---

## 1. Fonts

Load from Google Fonts in one stylesheet link (with `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` crossorigin), `display=swap`:

- **Inter** weights **400, 500, 600** (upright only).
- **Instrument Serif**, **italic only** (ital 1, regular weight 400).
- **UnifrakturMaguntia** (regular 400).

The exact family query is: Inter wght 400;500;600, Instrument Serif ital@1, UnifrakturMaguntia.

Usage:
- Body / UI default: `"Inter","Helvetica Neue",Arial,sans-serif`, antialiased (`-webkit-font-smoothing: antialiased`).
- Logo: UnifrakturMaguntia with `serif` fallback.
- Product name in detail view: Instrument Serif italic with `serif` fallback.

---

## 2. Colour tokens

Define on `:root`:

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0b0b0c` | page / letterbox background, pill hover text |
| `--ink` | `#f1efec` | all primary text, pill hover fill |
| `--mute` | `#8d8a86` | caption price line, counter, detail price |
| `--red` | `#b3121b` | marquee band |

Other colours used literally:
- Artboard radial centre colour `#18181a`.
- Rail gradient stops `#fafafa`, `#b9bcc1`, `#5d6066`, `#a9adb3`, `#e6e7e9`.
- Rail end-cap gradient stops `#8d9096`, `#f3f3f4`, `#7a7d83`.
- Pill border `rgba(241,239,236,.6)`; arrow border `rgba(241,239,236,.5)`.
- Shadows in pure black at the alphas listed per element.

---

## 3. Global reset and page behaviour

- `*` → `box-sizing: border-box; margin: 0; padding: 0`.
- `html, body` → `height: 100%`, `overflow: hidden` (the page never scrolls), background `--bg`.
- `body` → colour `--ink`, Inter, antialiased, **text selection disabled** (`user-select: none` and the `-webkit-` prefixed version).
- `button` reset → inherit font and colour, no background, no border, `cursor: pointer`.

---

## 4. Artboard: 1500 × 1000, scaled to fit, letterboxed and centred

- All content lives inside one absolutely positioned artboard `div#art`, exactly **1500px wide × 1000px tall**, `transform-origin: 0 0`.
- Artboard background: a radial gradient, ellipse **70% wide × 55% tall**, centred **at 50% horizontally, 40% vertically**, going from `#18181a` at the centre to `#0b0b0c` (`--bg`) at the edge. (Outside the artboard, the body's flat `#0b0b0c` fills the letterbox bars, so the bars blend in.)
- Fit function (run once on load and on every `resize`):
  - `k = min(windowInnerWidth / 1500, windowInnerHeight / 1000)`.
  - Set `transform: scale(k)` on the artboard.
  - Set `left = (innerWidth − 1500·k) / 2` px and `top = (innerHeight − 1000·k) / 2` px, so the scaled artboard is centred both ways with equal bars on the two letterbox sides.
- Every coordinate below is in artboard pixels (before scaling). The page has no responsive breakpoints: the whole composition always scales as one image.

---

## 5. Shared text styles

- `.ui` class: **12px**, weight **500**, letter-spacing **0.12em**, **uppercase**.
- `.pill` class: height **34px**, horizontal padding **0 20px**, border **1px solid rgba(241,239,236,.6)**, border-radius **40px**, `display: inline-grid; place-items: center`, transitions `background .25s, color .25s`. On hover: background `--ink` (#f1efec), text colour `--bg` (#0b0b0c). The pills are decorative (no click action).

---

## 6. Elements in stacking (DOM) order inside the artboard

The z-order is purely DOM order (no z-index anywhere). From back to front:

1. `#about`, 2. `#logo`, 3. `#contact`, 4. `#rail`, 5. `#rack` (the garments), 6. `#cap` (caption), 7. `#avail` (pill), 8. `#band` (marquee), 9. `#det` (detail layer, containing in order: `.hit` backdrop, `#big2`, `#big`, `#prev`, `#next`, `#info`, `#close`).

Important consequence: the garments are drawn over the rail; the `#rack` container is a full 1500×1000 transparent layer that sits on top of About / logo / Contact / rail (so those are not hoverable); the detail layer is above everything.

### 6.1 Header

- **About** (`#about`, class `.ui` + `.dim`): text `About`, absolutely positioned **left 46px, top 46px**.
- **Logo** (`#logo`, class `.dim`): text `Offcut` (mixed case, NOT uppercase), absolutely positioned at **left 50%, top 26px**, `translateX(-50%)` so it is horizontally centred. Font: UnifrakturMaguntia **400, 64px, line-height 1**, letter-spacing **0.01em**, colour `--ink`.
- **Contact** (`#contact`, classes `.ui`, `.dim` and `.dimmer`): text `Contact`, absolutely positioned **right 46px, top 46px**.

None of these are links and none have click behaviour.

### 6.2 Rail

- `#rail` (class `.dim`): absolutely positioned **left 150px, right 150px** (so it spans x 150 → 1350, width **1200px**), **top 254px**, **height 12px**, border-radius **6px**.
- Background: vertical linear gradient (top → bottom) `#fafafa 0%`, `#b9bcc1 28%`, `#5d6066 55%`, `#a9adb3 78%`, `#e6e7e9 100%` — a polished chrome tube with a bright top highlight, dark core just below middle and a lighter bottom reflection.
- Box shadow: `0 10px 18px rgba(0,0,0,.45)`.
- **End caps** via `::before` and `::after`: each is **16px wide × 30px tall**, border-radius **5px**, **top −9px** relative to the rail (so they extend 9px above and 9px below the 12px tube; artboard y 245 → 275), background horizontal linear gradient (90deg) `#8d9096`, `#f3f3f4` at 45%, `#7a7d83`. Left cap at **left −14px** (artboard x 136 → 152), right cap at **right −14px** (artboard x 1348 → 1364).

### 6.3 Rack container

- `#rack` (class `.dim`): absolutely positioned at 0,0, **1500 × 1000**, transparent. It contains the ten garment elements, created in script.

### 6.4 Caption

- `#cap` (class `.dimmer`): absolutely positioned **top 552px**, horizontal position = the faced garment's `left` value, with `translateX(-50%)` so it centres under the garment. `text-align: center`, **11px**, letter-spacing **0.12em**, **uppercase**, colour `--mute`, `white-space: nowrap`, `pointer-events: none`.
- Two lines: a bold-block first line (rendered as a `<b>`, `display: block`, colour `--ink`, weight **500**, margin-bottom **4px**) holding the product **name**, then a second line (a span, in `--mute`) holding the **price**.
- Hidden by default (`opacity: 0`); class `.on` makes it `opacity: 1`.
- Transitions: `left .75s cubic-bezier(.2,.8,.2,1)` and `opacity .35s` (default ease).

### 6.5 "See availability" pill

- `#avail`: a `<button>` with classes `pill ui dim dimmer`, text `See availability` (uppercase via `.ui`), absolutely positioned **left 50%, top 790px**, `translateX(-50%)`.

### 6.6 Red marquee band

- `#band` (class `.dimmer`): absolutely positioned **left 0, right 0, bottom 0**, **height 46px** (artboard y 954 → 1000), background `--red` `#b3121b`, `overflow: hidden`, `display: flex; align-items: center`.
- Inner track: one `div`, `display: flex; white-space: nowrap`, **13px**, weight **600**, letter-spacing **0.14em**, colour `--ink` (inherited). It is filled by script with the following 6-span sequence repeated **16 times**: `OFFCUT`, `•`, `LIMITED RUN`, `•`, `NO RESTOCKS`, `•` (each a separate `<span>`; the bullet is U+2022). Every span has **padding-right 22px** (that is the only spacing between items; no margins, no other separators).
- Animation: keyframe goes **to `translateX(-50%)`** (from the natural 0), **22s, linear, infinite**. Because the content is an even number of identical repeats, shifting by half the track width loops seamlessly. Text scrolls right-to-left.

### 6.7 Detail layer (`#det`)

- `#det`: absolutely positioned `inset: 0` over the whole artboard, `pointer-events: none` while closed; `pointer-events: auto` when `body.open` (and its buttons explicitly `pointer-events: auto` when open).
- `.hit`: first child, `position: absolute; inset: 0`; transparent full-artboard backdrop. Clicking it closes the detail view.
- `#big2`: the outgoing ghost used during prev/next. Absolutely positioned **left 50%, top 244px, 473px × 492px, margin-left −236.5px** (so x 513.5 → 986.5, y 244 → 736), `background-repeat: no-repeat`, `opacity: 0`, `pointer-events: none`. **Default transform-origin (centre)**. No drop shadow.
- `#big`: the big detail garment. Same box as `#big2` (left 50%, top 244, 473 × 492, margin-left −236.5), `background-repeat: no-repeat`, **transform-origin 50% 4%** (the hanger hook), `opacity: 0` by default, `filter: drop-shadow(0 30px 40px rgba(0,0,0,.6))`. It sits above `#big2`.
- `#prev` and `#next`: `<button class="arr">` with aria-labels `Previous` / `Next`. Each is absolutely positioned **top 452px**, **46 × 46px**, circular (border-radius 50%), border **1px solid rgba(241,239,236,.5)**, `display: grid; place-items: center`, opacity 0 by default. `#prev` at **left calc(50% − 300px)** = artboard x **450 → 496**; `#next` at **left calc(50% + 254px)** = x **1004 → 1050** (so both sit 17.5px outside the 473px garment box). Transitions: `opacity .4s` with **.25s delay**, `background .2s`, `color .2s`. Hover: background `--ink`, colour `--bg`.
  - Icons: inline SVG **16 × 16**, viewBox 0 0 24 24, a single open chevron path, no fill, stroke `currentColor`, stroke-width **1.8**. Previous: a "<" chevron from (15,5) to (8,12) to (15,19). Next: a ">" chevron from (9,5) to (16,12) to (9,19).
- `#info`: absolutely positioned **left 50%, top 770px**, `translateX(-50%)`, centred text, opacity 0 by default, transition **`opacity .5s` with `.25s` delay**. Children in order:
  1. `#num` — counter, **11px**, letter-spacing **0.16em**, colour `--mute`, formatted as two-digit index, space, slash, space, two-digit total: e.g. `01 / 10`.
  2. `#name` — product name, Instrument Serif **italic 400, 40px, line-height 1.15**, colour `--ink`, margin **8px top, 0 sides, 6px bottom**. Mixed case as in the product list (not uppercase).
  3. `#price` — **13px**, letter-spacing **0.08em**, colour `--mute`, margin-bottom **18px**, e.g. `€48`.
  4. A `<button class="pill ui">` with text `See availability` (decorative).
- `#close`: `<button class="ui">` text `Close`, absolutely positioned **right 46px, top 46px** (exactly where Contact sits — Contact disappears when open, Close takes its place), opacity 0 by default, transition `opacity .4s` with `.25s` delay.
- When `body` has class `open`: `#info`, both `.arr` buttons and `#close` become `opacity: 1`.

---

## 7. The "open" wash-out states

Two utility classes control what happens to the page when the detail view is open (class `open` on `<body>`):

- `.dim` — elements: About, logo, Contact, rail, rack, avail pill. They carry `transition: opacity .7s cubic-bezier(.2,.8,.2,1), filter .7s`. When open: **`opacity: .12` and `filter: blur(2px)`**.
- `.dimmer` — elements: Contact, caption, avail pill, band. When open: **`opacity: 0` and `pointer-events: none`**. This rule is declared after the `.dim` rule with equal specificity, so for elements that are both (Contact and the avail pill) the opacity **0** wins (they fade fully out over .7s thanks to the `.dim` transition, with the blur too).
  - The band has no transition, so it disappears **instantly** on open and reappears instantly on close.
  - The caption fades with its own `.35s` opacity transition and is not blurred.

Net visible result when open: logo, About, rail and the remaining edge-on garments are faint ghosts (12% opacity, 2px blur); Contact, caption, bottom pill and red band are gone; the big garment, arrows, info and Close are crisp.

---

## 8. Garment imagery: one transparent sprite sheet

All ten garments (and the big detail view) come from **one transparent PNG sprite sheet, 2048 × 1360 px**, delivered as WebP through the images.higgs.ai proxy. Use this URL exactly, character for character:

```
https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_130252_7b1b8485-d5c5-440c-8921-f5ae01054c6a.png&w=2048&q=90
```

Do not re-host, re-crop into separate files, or substitute other images. Each element that shows a garment uses the sheet as a CSS `background-image` with `background-repeat: no-repeat`.

### 8.1 Sheet geometry

- Sheet size: `SW = 2048`, `SH = 1360`.
- The sheet holds **5 columns × 2 rows** of garments on hangers. Cell width **`CW = 409.6`** (2048 / 5), cell height **`CH = 530`**.
- Row top Y coordinates on the sheet: **row 0 at y = 80**, **row 1 at y = 700** (`ROWY = [80, 700]`).
- Garment index `k` (0–9): column = `k mod 5`, row = `floor(k / 5)`. So k 0–4 are the top row left→right, k 5–9 the bottom row left→right.

### 8.2 Product list (index order, exact strings; the dash is an em dash U+2014 with spaces)

| k | Name | Price |
|---|---|---|
| 0 | Winged Skull Tee | €48 |
| 1 | Heavy Blank Tee — Black | €38 |
| 2 | Heavy Blank Tee — White | €38 |
| 3 | Offcut Longsleeve | €55 |
| 4 | Rose & Chain Tee | €52 |
| 5 | Varsity Jacket | €240 |
| 6 | No Restocks Longsleeve | €58 |
| 7 | Arch Logo Hoodie | €95 |
| 8 | Barbed Heart Tee | €48 |
| 9 | Black Zip Hoodie | €98 |

`N = 10`. The garment's rail position, its caption, its detail-view counter and its sheet cell all use the same index.

### 8.3 Padded crop box (why 50px)

On the sheet, neighbouring garments touch or overlap their cell borders (sleeves reach into the next cell). So each garment is cropped from a box **50px wider than its cell on both sides**: `PAD = 50`, box width **`BW = CW + 2·PAD = 509.6`**, box height **`CH = 530`** (no vertical padding). The box for garment k on the sheet starts at:

- `x = (k mod 5) · 409.6 − 50`
- `y = ROWY[floor(k / 5)]` (80 or 700)

and is 509.6 wide × 530 tall. (For k = 0 and k = 5 the box starts at x = −50, i.e. 50px of empty space left of the sheet, which is fine because the sheet is transparent and background-repeat is off.)

### 8.4 Pixel-based background mapping (the "paint" routine)

A single routine paints garment k into any element so that the padded crop box exactly fills that element, regardless of element size. It reads the element's **layout size** (`offsetWidth` = ew, `offsetHeight` = eh; untransformed) and sets, in **px**, not percentages:

- `background-image`: the sheet URL.
- `background-size`: width = `SW / BW · ew` = `2048 / 509.6 · ew`; height = `SH / CH · eh` = `1360 / 530 · eh`. (The X and Y scales are computed independently: `sx = ew / 509.6`, `sy = eh / 530`.)
- `background-position`: x = `−x_box / BW · ew` = `−x_box · sx`; y = `−y_box / CH · eh` = `−y_box · sy`.
- `clip-path`: the k-th polygon string from §8.5.

Reference results (for checking your implementation):

- Rail garment element (289 × 300): background-size ≈ **1161.44 × 769.81 px**; position for k = 0 ≈ (28.36, −45.28), k = 1 (−203.93, −45.28), k = 2 (−436.22, −45.28), k = 3 (−668.51, −45.28), k = 4 (−900.80, −45.28); k 5–9 use the same x values with y ≈ −396.23.
- Detail element (473 × 492): background-size ≈ **1900.91 × 1262.49 px**; position for k = 0 ≈ (46.41, −74.26), k = 1 (−333.77, −74.26), k = 2 (−713.96, −74.26), k = 3 (−1094.14, −74.26), k = 4 (−1474.32, −74.26); k 5–9 same x, y ≈ −649.81.

The routine is called on each rail garment once on creation, on `#big` when opening / stepping, and on `#big2` when stepping.

### 8.5 Per-garment clip polygons (data — use verbatim)

Even with the padding, neighbour slivers would show inside each crop box. Each garment is therefore clipped with its **own traced outline**: a CSS `polygon()` in **percentage coordinates of the padded 509.6 × 530 box** (so the same string works at 289 × 300 and at 473 × 492). Each polygon traces hook → hanger → shoulders → sleeves → hem of that garment only. Index them 0–9 in the same order as the product list and apply as `clip-path`. Copy these strings exactly:

**Polygon 0 — Winged Skull Tee:**

```
polygon(52.98% 2.08%,51.41% 3.96%,51.81% 3.96%,52.98% 2.45%,55.34% 2.45%,56.12% 3.21%,56.12% 5.47%,54.55% 7.17%,54.36% 9.25%,51.61% 10.38%,47.88% 15.09%,45.92% 16.60%,44.74% 16.60%,31.20% 23.40%,29.24% 25.28%,25.51% 30.94%,14.13% 53.58%,25.51% 60.19%,28.85% 61.70%,28.26% 82.45%,28.65% 96.79%,45.33% 96.79%,49.25% 96.42%,52.00% 95.66%,56.51% 95.66%,62.60% 96.79%,79.47% 96.79%,80.06% 90.38%,79.87% 61.89%,94.39% 53.77%,83.99% 32.08%,79.47% 24.72%,75.94% 22.26%,64.76% 16.79%,63.58% 16.79%,60.24% 13.96%,59.26% 12.08%,57.50% 10.19%,54.95% 9.25%,54.95% 7.17%,56.71% 5.09%,56.71% 3.58%,55.14% 1.89%)
```

**Polygon 1 — Heavy Blank Tee — Black:**

```
polygon(53.85% 1.89%,52.47% 2.83%,51.88% 3.96%,52.28% 3.96%,53.45% 2.45%,55.61% 2.45%,56.59% 3.58%,56.59% 5.28%,54.83% 7.17%,54.83% 9.25%,52.47% 10.00%,50.90% 11.51%,49.14% 14.34%,46.39% 16.60%,45.41% 16.60%,35.60% 21.51%,30.89% 24.53%,26.77% 31.13%,26.37% 32.64%,21.86% 41.32%,15.97% 54.34%,24.80% 59.81%,29.51% 62.08%,28.53% 86.23%,28.53% 94.91%,28.92% 96.79%,44.62% 96.79%,48.55% 96.42%,52.28% 95.47%,57.77% 95.47%,60.32% 96.23%,64.05% 96.60%,80.73% 96.79%,80.93% 71.51%,80.53% 62.08%,93.88% 54.53%,93.88% 53.96%,92.90% 52.64%,92.90% 51.13%,83.87% 32.08%,79.55% 24.72%,75.63% 21.89%,71.11% 20.00%,64.84% 16.60%,63.85% 16.60%,61.89% 15.28%,58.16% 10.38%,55.22% 9.25%,55.22% 7.55%,56.79% 5.66%,57.18% 3.77%,55.81% 2.08%)
```

**Polygon 2 — Heavy Blank Tee — White:**

```
polygon(49.61% 1.89%,48.43% 2.45%,47.45% 3.96%,47.84% 3.96%,49.02% 2.45%,51.18% 2.45%,52.16% 3.40%,52.16% 5.28%,50.59% 6.98%,50.39% 9.25%,47.65% 10.38%,46.27% 11.70%,44.31% 14.72%,42.15% 16.42%,40.78% 16.60%,30.57% 21.70%,26.45% 24.53%,22.33% 31.32%,12.52% 52.08%,13.70% 54.53%,25.67% 61.51%,24.69% 86.79%,24.69% 95.28%,25.08% 96.79%,32.34% 96.42%,42.35% 96.60%,47.25% 95.85%,51.57% 95.85%,56.08% 96.60%,67.66% 96.42%,75.71% 96.79%,76.10% 96.42%,76.30% 83.21%,75.31% 61.51%,89.44% 53.77%,89.64% 53.21%,87.68% 49.81%,79.24% 31.70%,75.12% 24.91%,71.39% 22.08%,58.24% 15.85%,56.48% 14.15%,53.73% 10.38%,50.98% 9.25%,50.98% 7.17%,52.55% 5.47%,52.75% 3.58%,51.77% 2.26%)
```

**Polygon 3 — Offcut Longsleeve:**

```
polygon(46.35% 1.89%,45.17% 2.45%,44.19% 3.96%,46.15% 2.26%,47.72% 2.26%,49.10% 3.58%,49.10% 5.09%,47.33% 7.17%,47.14% 9.25%,44.00% 10.75%,41.64% 14.34%,38.70% 16.79%,37.72% 16.79%,25.16% 23.21%,23.00% 25.28%,20.25% 30.75%,15.15% 48.87%,10.24% 71.70%,8.48% 83.58%,8.28% 89.25%,8.87% 91.13%,8.48% 96.23%,16.13% 97.92%,17.11% 97.74%,18.49% 92.83%,19.47% 91.70%,20.45% 89.25%,22.21% 89.06%,22.41% 96.04%,23.00% 96.98%,39.87% 96.60%,44.98% 95.47%,47.14% 95.47%,51.84% 96.42%,61.07% 96.23%,71.86% 96.98%,72.25% 96.79%,72.45% 90.38%,72.84% 90.00%,74.61% 90.19%,76.18% 93.21%,77.55% 97.92%,85.60% 96.79%,85.60% 91.51%,86.19% 90.57%,86.19% 84.53%,84.81% 73.21%,82.06% 58.68%,79.12% 46.04%,75.39% 32.45%,72.65% 26.23%,71.08% 24.15%,57.34% 16.79%,55.97% 16.60%,53.22% 14.15%,51.65% 11.51%,50.47% 10.38%,47.72% 9.25%,47.72% 7.17%,49.49% 5.09%,49.49% 3.58%,48.12% 2.08%)
```

**Polygon 4 — Rose & Chain Tee:**

```
polygon(45.25% 1.89%,43.29% 3.96%,43.88% 3.96%,45.05% 2.45%,47.21% 2.45%,48.19% 3.40%,48.19% 5.09%,46.43% 7.36%,46.43% 9.25%,43.88% 10.19%,42.31% 11.70%,40.93% 13.96%,38.19% 16.42%,36.81% 16.60%,24.25% 22.83%,21.70% 24.91%,16.21% 34.15%,6.59% 54.15%,21.31% 62.26%,20.72% 80.94%,20.92% 96.79%,39.76% 96.79%,44.66% 96.42%,72.14% 96.79%,72.53% 96.42%,72.53% 76.23%,71.94% 62.26%,79.40% 58.49%,86.07% 54.15%,75.67% 32.08%,71.35% 24.91%,67.03% 21.89%,61.54% 19.43%,59.18% 17.92%,56.63% 16.79%,55.65% 16.79%,53.69% 15.47%,49.96% 10.57%,47.02% 9.25%,47.02% 7.17%,48.39% 5.66%,48.78% 3.77%,47.41% 2.08%)
```

**Polygon 5 — Varsity Jacket:**

```
polygon(52.39% 1.70%,50.43% 3.77%,52.20% 2.26%,54.55% 2.26%,55.53% 3.40%,55.53% 4.91%,53.57% 7.17%,53.57% 9.43%,50.63% 10.57%,47.68% 14.34%,46.31% 14.53%,42.78% 17.74%,41.60% 17.92%,29.24% 24.53%,27.08% 26.60%,24.92% 29.81%,22.17% 37.55%,19.23% 47.92%,15.70% 65.85%,14.72% 76.23%,14.52% 84.72%,15.11% 90.38%,16.68% 92.26%,17.07% 93.40%,17.07% 97.74%,17.66% 98.30%,20.02% 98.68%,25.12% 98.68%,25.71% 98.11%,26.10% 93.40%,27.86% 90.94%,28.45% 88.30%,30.02% 88.30%,30.42% 88.68%,30.61% 92.83%,31.40% 93.58%,60.44% 93.96%,63.19% 93.58%,75.16% 93.77%,75.94% 93.02%,76.33% 88.49%,78.30% 88.30%,78.89% 90.94%,80.85% 93.58%,81.44% 98.30%,82.03% 98.87%,89.29% 98.49%,90.07% 97.92%,90.07% 93.21%,91.84% 90.75%,92.03% 78.49%,90.66% 63.58%,87.91% 49.06%,83.40% 32.83%,81.44% 28.49%,78.10% 24.72%,65.74% 17.92%,64.36% 17.55%,61.03% 14.53%,59.65% 14.34%,56.51% 10.19%,53.96% 9.25%,53.96% 7.36%,55.73% 5.28%,55.93% 3.40%,54.55% 1.89%)
```

**Polygon 6 — No Restocks Longsleeve:**

```
polygon(53.85% 1.13%,52.47% 2.08%,51.88% 3.21%,52.28% 3.21%,53.45% 1.70%,55.61% 1.70%,56.59% 2.64%,56.59% 4.34%,54.83% 6.42%,54.83% 8.30%,51.88% 9.43%,48.74% 13.58%,46.39% 15.47%,45.41% 15.47%,34.22% 20.94%,30.49% 23.21%,28.73% 25.28%,26.18% 31.13%,24.02% 37.74%,22.45% 44.53%,19.31% 63.77%,18.33% 75.66%,18.13% 86.42%,18.72% 91.51%,19.70% 93.21%,19.51% 97.55%,20.88% 98.30%,27.35% 98.87%,28.34% 94.34%,30.10% 94.15%,30.69% 95.85%,30.69% 97.92%,31.28% 98.30%,48.16% 97.92%,51.10% 97.17%,55.22% 97.17%,57.57% 97.92%,65.82% 97.74%,77.79% 98.30%,78.18% 94.72%,79.95% 94.53%,81.12% 98.87%,85.83% 98.68%,88.58% 98.11%,88.78% 93.21%,89.56% 91.89%,90.15% 87.17%,90.15% 79.81%,89.36% 68.11%,86.42% 45.85%,82.69% 30.19%,80.53% 25.28%,78.77% 23.21%,65.03% 15.85%,63.27% 15.47%,61.11% 13.58%,58.16% 9.43%,55.22% 8.30%,55.22% 6.60%,56.99% 4.34%,56.99% 2.64%,55.81% 1.32%)
```

**Polygon 7 — Arch Logo Hoodie:**

```
polygon(48.82% 2.08%,47.06% 3.96%,48.82% 2.45%,50.78% 2.45%,51.96% 3.40%,51.96% 5.47%,50.20% 7.36%,50.20% 9.43%,47.84% 10.38%,41.37% 10.75%,34.50% 12.26%,33.52% 13.21%,33.12% 15.47%,30.57% 20.94%,30.57% 22.26%,25.27% 25.66%,23.70% 27.92%,21.55% 32.83%,16.44% 48.49%,12.32% 68.49%,11.15% 78.11%,10.75% 85.28%,11.34% 90.94%,12.52% 92.45%,12.13% 97.55%,20.37% 99.25%,20.96% 98.68%,22.14% 94.15%,23.70% 92.83%,24.29% 91.70%,25.86% 91.70%,27.04% 93.96%,27.83% 98.11%,34.30% 97.17%,46.08% 96.23%,57.85% 96.42%,72.37% 98.11%,74.14% 92.08%,74.53% 91.70%,76.10% 91.70%,76.69% 93.02%,78.45% 94.91%,79.83% 99.25%,87.68% 98.11%,88.27% 97.74%,87.87% 92.45%,89.05% 91.13%,89.44% 88.11%,89.44% 81.70%,88.66% 73.21%,87.28% 63.96%,83.95% 48.68%,79.24% 33.21%,76.69% 27.92%,74.92% 25.47%,69.62% 22.08%,69.62% 20.75%,67.27% 15.66%,66.68% 13.21%,65.31% 12.08%,62.56% 11.32%,52.94% 10.38%,50.78% 9.62%,50.59% 7.36%,52.16% 5.85%,52.55% 3.77%,52.35% 3.21%,50.59% 1.89%)
```

**Polygon 8 — Barbed Heart Tee:**

```
polygon(45.96% 1.32%,44.00% 3.02%,44.19% 3.40%,45.96% 1.70%,47.53% 1.70%,48.90% 2.83%,48.90% 4.53%,47.14% 6.42%,46.94% 8.68%,44.00% 9.81%,41.64% 13.21%,38.70% 15.85%,37.32% 16.04%,23.98% 22.64%,21.62% 24.72%,17.90% 30.75%,7.30% 51.70%,21.62% 59.62%,20.84% 75.09%,21.04% 98.87%,33.59% 98.68%,38.50% 99.25%,44.39% 98.30%,50.08% 98.30%,53.61% 99.06%,62.64% 98.68%,72.84% 99.06%,73.23% 98.87%,73.63% 88.68%,73.04% 60.00%,86.77% 52.26%,86.77% 51.70%,76.77% 31.51%,73.04% 25.28%,69.90% 22.45%,57.14% 16.04%,55.97% 16.04%,53.22% 13.77%,50.47% 9.81%,47.53% 8.68%,47.53% 6.42%,49.10% 4.91%,49.49% 3.40%,48.12% 1.51%,46.94% 1.13%)
```

**Polygon 9 — Black Zip Hoodie:**

```
polygon(45.25% 1.51%,43.29% 3.21%,43.49% 3.58%,45.25% 1.89%,47.02% 1.89%,48.19% 3.02%,48.19% 4.91%,46.43% 6.79%,46.43% 9.06%,43.29% 10.38%,34.46% 11.13%,29.75% 12.26%,28.57% 13.77%,28.18% 15.85%,25.63% 20.94%,25.63% 22.26%,20.13% 25.85%,16.60% 32.64%,13.27% 43.40%,10.32% 55.47%,7.18% 73.77%,6.59% 79.81%,6.59% 87.36%,7.18% 91.13%,8.56% 92.64%,8.36% 97.55%,8.75% 98.11%,16.60% 98.87%,17.97% 93.40%,19.15% 92.45%,19.94% 90.75%,21.70% 90.94%,22.88% 96.98%,23.47% 97.36%,35.44% 96.23%,45.45% 96.42%,46.04% 98.11%,46.62% 97.92%,46.62% 96.60%,47.41% 96.23%,56.44% 96.23%,69.00% 97.36%,69.58% 96.60%,70.57% 91.13%,72.33% 90.94%,73.31% 92.83%,74.29% 93.58%,75.86% 99.06%,83.32% 98.30%,83.71% 97.92%,83.71% 92.83%,84.89% 91.51%,85.48% 88.87%,85.68% 81.13%,85.09% 72.83%,82.34% 55.66%,79.20% 42.45%,76.06% 32.26%,72.72% 25.85%,67.43% 22.26%,67.43% 20.94%,66.05% 18.87%,64.29% 13.02%,61.73% 11.70%,56.83% 10.94%,50.35% 10.57%,48.98% 9.62%,47.02% 9.25%,46.82% 6.98%,48.59% 5.09%,48.78% 3.21%,47.21% 1.51%)
```

Because clip-path also clips hit-testing, clicks/hovers on the garment image itself only register inside the outline (but see §9.3 — the hover box is the parent element).

---

## 9. The rail: 3D edge-on garments

### 9.1 Garment element structure

For each product k, create a `div.g` containing a single `<i>` child, append it to `#rack`, and paint the `<i>` with garment k.

- `.g`: `position: absolute`, **top 236px**, **width 289px, height 300px**, **margin-left −144.5px** (so its `left` value is its horizontal centre), **`perspective: 900px`** (on the `.g` itself, i.e. each garment has its own vanishing point at its own centre), `cursor: pointer`, transition **`left .75s cubic-bezier(.2,.8,.2,1)`**.
- `.g i`: `position: absolute; inset: 0` (fills 289 × 300), `background-repeat: no-repeat`, **`transform-origin: 50% 4%`** (x centre, 12px down — the hanger hook sitting on the rail, which is at artboard y 254–266; the garment box top is at 236 so the hook is at ≈ y 248), **`transform: rotateY(-74deg)`** — the garment is turned almost edge-on, like clothes hanging sideways on a real rail, showing a narrow foreshortened sliver. Filter: **`brightness(.82) drop-shadow(0 18px 18px rgba(0,0,0,.5))`**. Transition: **`transform .75s cubic-bezier(.2,.8,.2,1), filter .75s`** (the filter transition uses the default ease).
- Faced state `.g.face i`: **`transform: rotateY(0deg)`** (flat, facing the viewer), filter **`brightness(1) drop-shadow(0 22px 26px rgba(0,0,0,.55))`**.

The rotation is a true 3D rotation, so the near edge grows and the far edge shrinks under the 900px perspective as the garment swings round. The rotation direction is negative Y (−74°), and it animates to 0° — keep the sign.

### 9.2 Layout maths

Constants: **`SLOT = 108`** px between garment centres, **`OPEN = 86`** px extra gap, **`CX = 750`** (artboard centre).

State: `hov` (index of the faced garment, −1 for none) and `open` (index shown in detail view, −1 for none).

`layout()` sets, for each garment k:

- base x = `CX + (k − (N − 1)/2) · SLOT` = `750 + (k − 4.5) · 108`. Resting centres: **264, 372, 480, 588, 696, 804, 912, 1020, 1128, 1236**.
- If `hov ≥ 0` and `k ≠ hov`: x += `sign(k − hov) · OPEN` — every garment to the left of the faced one moves **86px left**, every garment to the right moves **86px right**; the faced one stays at its base slot. This opens a gap so the turned-to-face garment has room (all neighbours slide apart together, not just the adjacent ones).
- `left = x px`, and toggles class `face` on exactly the garment with `k === hov`.

Then the caption: if `hov ≥ 0`, set the caption's `left` to the same `left` string as the faced garment, fill the name and price of `hov`, and add `.on`; else remove `.on` (caption keeps its last text and position while fading out). Because both `.g` and `#cap` animate `left` with the same .75s curve, the caption glides with the garment.

`layout()` runs once at start (nothing faced: ten edge-on garments evenly spaced across the rail, no caption).

### 9.3 Hover / pointer behaviour

- Each `.g` listens for **`pointerenter`**: if not open, set `hov = k` and `layout()`.
- `#rack` listens for **`pointerleave`**: if not open, `hov = −1` and `layout()`.
- Note: the hover target is the whole 289 × 300 `.g` box (not the clipped image), and these boxes overlap heavily (108px slots); later garments in DOM order (higher k) are on top. Moving across the rail therefore faces garments one by one in sequence.
- Note: `#rack` is a full 1500 × 1000 layer, so moving into empty space on the artboard does NOT reset the hover — the last faced garment stays faced. It resets only when the pointer actually leaves `#rack`: leaving the artboard/window, or moving onto an element stacked above the rack that receives pointer events (the "See availability" pill or the red band). The caption has `pointer-events: none` and does not count.
- Each `.g` listens for **`click`** → `openG(k)`.

### 9.4 Keyboard (rail mode, i.e. `open < 0`)

Global `keydown` on window (no preventDefault):
- **ArrowRight**: `hov = min(N − 1, hov + 1)` then `layout()` (from no selection it goes to 0).
- **ArrowLeft**: if `hov < 0` → `hov = N − 1` (9); otherwise `hov = max(0, hov − 1)`; then `layout()`.
- **Enter**: if `hov ≥ 0`, `openG(hov)`.

---

## 10. Detail view

### 10.1 `openG(k)` — lift from the rail

1. If already open, do nothing. Set `open = k`, `hov = k`, call `layout()` (so the rail behind shows k faced with the gap open, even though it is about to be hidden/dimmed).
2. Read the garment's current centre `gx = parseFloat(G[k].style.left)`.
3. Cancel any running Web Animations on `#big`, paint `#big` with garment k, fill the info (§10.2), add class `open` to `<body>` (starts all wash-out and fade-in transitions in §6.7 / §7).
4. Animate `#big` with the Web Animations API, **750ms, easing `cubic-bezier(.2,.8,.2,1)`, fill `forwards`**, two keyframes:
   - from: `transform: translate(${gx − 750}px, −8px) scale(.61)`, `opacity: 1`
   - to: `transform: none`, `opacity: 1`.
   With transform-origin 50% 4% on `#big`, scale .61 makes the 473px box ≈ 289px wide (the rail garment's width) and the horizontal translate puts it over the clicked garment's slot, 8px higher — so the big image appears to start exactly where the rail garment hangs and grows/glides to the centre (473 × 492 at top 244, centred on x 750). No opacity fade: it is fully opaque from the first frame.
5. Hide the rail original: `G[k].style.visibility = 'hidden'` (so there is no duplicate on the dimmed rail).

### 10.2 `fill(k)`

- `#num` = two-digit `k + 1`, then ` / `, then two-digit `N` → e.g. `01 / 10`, `07 / 10`.
- `#name` = product name; `#price` = product price.

### 10.3 `step(d)` — previous / next (d = −1 or +1), crossfade-slide

1. If not open, do nothing. `from = open`; `open = (open + d + N) mod N` (wraps around both ways: 10 → 1 and 1 → 10).
2. `fill(open)`. Restore visibility of `G[from]`, hide `G[open]`. Set `hov = open` and `layout()` (the ghosted rail behind shifts its gap to the new garment).
3. Outgoing ghost: paint `#big2` with garment `from` and animate it, **600ms, `cubic-bezier(.2,.8,.2,1)`, no fill** (it snaps back to its default opacity 0 afterward):
   - from `transform: none; opacity: 1; filter: blur(0)`
   - to `transform: translateX(${−d · 120}px) scale(.94); opacity: 0; filter: blur(6px)`.
   So on Next (d = +1) the old garment slides 120px **left**, shrinks to 94%, blurs 6px and fades out; on Previous it goes right.
4. Incoming: cancel `#big` animations, paint `#big` with garment `open` and animate, **600ms, same easing, fill `forwards`**:
   - from `transform: translateX(${d · 120}px) scale(.94); opacity: 0; filter: blur(6px)`
   - to `transform: none; opacity: 1; filter: blur(0)`.
   So on Next the new garment enters from 120px right. (The `#big` drop-shadow filter is replaced by the animated blur filter while this animation is in effect — reproduce exactly by animating `filter` on `#big`.)
5. Info text swaps instantly (no animation on the text itself).

### 10.4 `closeG()` — put it back

1. If not open, do nothing. `k = open`, `gx = parseFloat(G[k].style.left)` (the faced slot position).
2. Animate `#big`, **650ms, `cubic-bezier(.2,.8,.2,1)`, fill `forwards`**: from `transform: none; opacity: 1` to `transform: translate(${gx − 750}px, −8px) scale(.61); opacity: 1` — the reverse of the lift, shrinking back onto its rail slot.
3. Immediately remove `open` from `<body>` (page un-dims over .7s, band reappears instantly, info/arrows/Close fade out over their transitions, `#det` stops catching pointer events).
4. After a **650ms** `setTimeout`: restore `G[k].style.visibility`, cancel all animations on `#big`, set `#big` inline `opacity: 0`, set `open = −1`, `hov = −1`, `layout()` — the rail garment reappears in place and then swings back edge-on as the gap closes (.75s).

### 10.5 Detail controls

- `#prev` click → `step(−1)`; `#next` click → `step(1)`; `#close` click → `closeG()`; `.hit` backdrop click → `closeG()`.
- Clicks on `#big` inside its traced outline, on `#info` or on the arrows do not close (they are above the backdrop); clicks on transparent areas of the big garment box fall through the clip-path to the backdrop and close.
- Keyboard while open: **ArrowRight** → `step(1)`, **ArrowLeft** → `step(−1)`, **Escape** → `closeG()`. Enter does nothing while open.

### 10.6 Debug hook

Expose `window.__closet = { openG, step, closeG, setHov(k) }` where `setHov` sets `hov = k` and runs `layout()` (used for automated screenshots/recording).

---

## 11. Timing and easing summary

| What | Duration | Easing | Delay |
|---|---|---|---|
| Garment slide (`.g` left) | .75s | cubic-bezier(.2,.8,.2,1) | — |
| Garment rotateY −74° ↔ 0° | .75s | cubic-bezier(.2,.8,.2,1) | — |
| Garment brightness/shadow | .75s | ease (default) | — |
| Caption slide (left) | .75s | cubic-bezier(.2,.8,.2,1) | — |
| Caption fade | .35s | ease | — |
| Page wash-out opacity | .7s | cubic-bezier(.2,.8,.2,1) | — |
| Page wash-out blur | .7s | ease | — |
| Info block fade | .5s | ease | .25s |
| Arrows / Close fade | .4s | ease | .25s |
| Arrow hover bg/colour | .2s | ease | — |
| Pill hover bg/colour | .25s | ease | — |
| Open lift (`#big`) | 750ms | cubic-bezier(.2,.8,.2,1) | — |
| Step crossfade-slide (both layers) | 600ms | cubic-bezier(.2,.8,.2,1) | — |
| Close return (`#big`) | 650ms (+650ms timeout restore) | cubic-bezier(.2,.8,.2,1) | — |
| Marquee | 22s loop | linear | — |
| Band show/hide on open | instant | — | — |

---

## 12. Things NOT to do

- Do not use flat 2D scaleX tricks for the edge-on look — it must be `rotateY` under `perspective: 900px` on each garment wrapper with origin 50% 4%.
- Do not use percentage background-size/position; compute px from the element's layout size as in §8.4.
- Do not omit or simplify the clip polygons; without them neighbouring garment sleeves show at the box edges.
- Do not crossfade the whole page or fade the big garment in on open — the lift is fully opaque and purely transform-based.
- Do not add a modal background colour; the wash-out is opacity + blur of the page itself over the unchanged radial background.
- Do not make the logo uppercase, do not change fonts, do not add hover underlines, links, or extra sections. The page is exactly one non-scrolling 1500×1000 composition.

---

## 13. Acceptance checklist

- [ ] Fonts: Inter 400/500/600, Instrument Serif italic, UnifrakturMaguntia loaded from Google Fonts; page title `Offcut`.
- [ ] 1500×1000 artboard scaled by `min(w/1500, h/1000)`, centred with equal letterbox bars in `#0b0b0c`; no scrolling; text not selectable.
- [ ] Radial background 70% × 55% at 50% 40%, `#18181a` → `#0b0b0c`.
- [ ] `ABOUT` at 46/46 left, `CONTACT` at 46/46 right, 12px 500 uppercase .12em; blackletter `Offcut` 64px centred at top 26.
- [ ] Chrome rail x 150–1350, y 254, 12px tall, radius 6, 5-stop vertical gradient, shadow 0 10 18 .45; 16×30 end caps at −14px, top −9, radius 5.
- [ ] Ten garments from the single sheet URL (verbatim), each in a 289×300 box at top 236, centres 264 … 1236 step 108, turned rotateY(−74°) about 50% 4% under perspective 900px, brightness .82 with drop-shadow 0 18 18 .5.
- [ ] Each garment shows only its own outline (verbatim polygon k); no neighbour sleeves/slivers visible at either size.
- [ ] Background mapping in px: size 2048/509.6·w × 1360/530·h, position −(col·409.6−50)·sx, −rowY·sy; rows at 80 and 700.
- [ ] Hover faces the garment (rotateY 0, brightness 1, shadow 0 22 26 .55) and pushes all left garments −86px and all right garments +86px, everything gliding .75s on cubic-bezier(.2,.8,.2,1).
- [ ] Caption at top 552 centred under faced garment: name in ink 500 above price in mute, 11px uppercase .12em, gap 4px; fades .35s.
- [ ] Hover persists over empty artboard; resets only on leaving the rack layer (window, pill or band).
- [ ] Arrow keys move the faced garment (Right from none → 0, Left from none → 9, clamped at ends); Enter opens it.
- [ ] `SEE AVAILABILITY` pill at top 790 centred: 34px tall, padding 20, 1px .6 border, radius 40, inverts on hover.
- [ ] Red `#b3121b` band 46px at the bottom with `OFFCUT • LIMITED RUN • NO RESTOCKS •` ×16, 13px 600 .14em, 22px padding-right per item, scrolling −50% in 22s linear infinite, seamless.
- [ ] Click: garment lifts from translate(gx−750, −8px) scale(.61) to the centred 473×492 box at top 244 in 750ms, fully opaque, origin 50% 4%, drop-shadow 0 30 40 .6; rail original hidden.
- [ ] Open state: About/logo/rail/rack at opacity .12 + blur 2px over .7s; Contact, caption, bottom pill gone; band gone instantly.
- [ ] Info at top 770: `01 / 10` counter 11px .16em mute; italic Instrument Serif name 40px/1.15 with 8px/6px margins; price 13px .08em mute with 18px below; pill. Fades in .5s after .25s.
- [ ] Round 46px arrows at top 452, x 450 and 1004, 1px .5 border, 16px chevrons stroke 1.8, invert on hover; `CLOSE` at right 46 / top 46. Fade .4s after .25s.
- [ ] Next/Prev (buttons or ←/→): counter wraps 10↔1; old image slides ∓120px, scale .94, blur 6px, fades out; new image enters from ±120px with the same, 600ms; rail behind updates its gap.
- [ ] Close (button, Esc, or backdrop click): image shrinks back to its rail slot in 650ms while page un-dims; after 650ms the rail garment reappears and swings back edge-on as the gap closes.
- [ ] `window.__closet` exposes openG, step, closeG, setHov.
- [ ] No extra elements, effects, loaders or z-index; stacking is DOM order as listed in §6.