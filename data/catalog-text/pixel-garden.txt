# HERO PROMPT — "Dune Play" by Grovekit (interactive pixel-art plant playground)

Build a single self-contained `index.html` (inline CSS + inline vanilla JS, no frameworks, no build step) that recreates the page described below **exactly**. The page is a full-viewport, non-scrolling toy: three pixel-art desert plants (a coconut palm, a barrel cactus with a pink flower, and a jacaranda tree) stand on small sand mounds over a flat warm-sand background. You can click or brush them to shake their leaves and petals loose, turn on weather so the wind bends them and strips foliage off, watch leaves fall and pile up as litter, have everything "grow back", flip to an x-ray "skeleton" view, toggle sound, switch to a single-plant carousel and toggle dark mode.

Everything visual on the plants is made of square "cells" (fat pixels) drawn on one full-screen `<canvas>`. All UI chrome is HTML floating above the canvas.

Document title: **`Dune Play · Grovekit`** (with a middle dot). `lang="en"`, UTF-8, `width=device-width,initial-scale=1` viewport.

---

## 1. Assets

Exactly three sprites are used. Each is a **transparent-background pixel-art PNG** rendered by Higgsfield and served through the images.higgs.ai proxy. Load them with `crossOrigin = "anonymous"` (pixel data is read back from a canvas, so CORS must be honoured). Use these URLs verbatim:

| key | plant | URL |
|---|---|---|
| `palm` | coconut palm | `https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023150_cc5c0d10-d6fc-429d-9245-a05e69771f45.png&w=1024` |
| `cactus` | barrel cactus with pink flower | `https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023155_2d3af7db-5e50-423f-822f-fbbb8b599e76.png&w=1024` |
| `jac` | jacaranda tree (purple blossom) | `https://images.higgs.ai/?default=1&output=png&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_023200_f11ab77e-4a73-43f2-971c-d77090c352ff.png&w=1024` |

Font: **Inter** from Google Fonts, weights **400, 500, 600** only, `display=swap`, with `preconnect` hints to `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin). Fallback stack: `"Inter", system-ui, sans-serif`. Antialiased font smoothing (`-webkit-font-smoothing: antialiased`).

No other images, icon fonts or libraries. All icons are tiny inline SVGs or text glyphs, described below.

The three sprites are loaded in parallel; only when all three are decoded and converted does the app run layout and start the animation loop. Until then the page shows the UI over the plain background.

---

## 2. Theme tokens

Define CSS custom properties on `:root` (light) and override them on `body.dark` (dark). The theme switches by toggling the class `dark` on `<body>`.

| token | light | dark | use |
|---|---|---|---|
| `--bg` | `#f2ebdf` | `#14110d` | page + canvas background (warm sand / near-black brown) |
| `--panel` | `#fff` | `#1f1b15` | pill / panel fill |
| `--ink` | `#17140f` | `#f3ede2` | primary text, slider fill |
| `--mute` | `#8b8378` | `#8f877a` | secondary text, inactive segments, dots, ticks |
| `--line` | `rgba(23,20,15,.09)` | `rgba(243,237,226,.09)` | 1 px borders, dividers |
| `--seg` | `#ece5d9` | `#2b261e` | segmented-control trough, BETA chip |
| `--knob` | `#fff` | `#f3ede2` | switch & slider knobs (but see dark overrides below: both become pure `#fff` in dark) |
| `--track` | `#ddd5c8` | `#3a342a` | off-switch track, slider track |
| `--on` | `#17140f` | `#f3ede2` | active view button, Grow back button fill |
| `--shadow` | `0 10px 34px rgba(60,44,20,.07)` | `0 10px 34px rgba(0,0,0,.35)` | control-bar drop shadow |

Hard-coded colours (not tokens):
- Switch ON track: `#2fb35a` (green), both themes.
- In dark mode the switch knob and slider knob are forced to pure `#fff`.
- Skeleton overlay: `#c8382a` (light) / `#ff6a4d` (dark).
- Windsock pole: `#6b6258` (light) / `#9a8f80` (dark); sock stripes `#e8573b` (orange-red) and `#f4efe6` (off-white), both themes.
- Counter icon flower: pink `#f06aa8`, centre yellow `#ffd24a`.
- Sand mound tones: `#e4cfa6`, `#d9c094`, `#cdb282`, `#efdcb8` (same in both themes).
- Cactus "bare" rib colour: `#b2875a`.

Global resets: `* {box-sizing:border-box; margin:0; padding:0}`. `html, body` are 100% height, `overflow:hidden`, background `var(--bg)` with `transition: background .5s`. Body colour `var(--ink)`, text selection disabled (`user-select:none` incl. `-webkit-`). Buttons: inherit font and colour, transparent background, no border, `cursor:pointer`.

The canvas background is **not** a CSS colour: each frame the canvas is filled with the *computed* background colour of `<body>`, so during the .5 s theme transition the canvas fades in lock-step with the page.

---

## 3. Layout of the UI chrome

All chrome is `position:fixed`, `z-index:5` (tooltip `z-index:6`), on top of the canvas.

### 3.1 Shared "pill" style
Class `.pill`: background `var(--panel)`, `1px solid var(--line)` border, `border-radius:30px`, box-shadow `0 1px 2px rgba(0,0,0,.03)`, `transition: background .5s, border-color .5s`.

### 3.2 Brand pill (top-left)
- Element: a `.pill` div with text **`Grovekit`**.
- Position: `left:24px; top:16px`. Height `44px`, horizontal padding `18px`, content centred (grid, place-items center).
- Type: 14px, weight 600.

### 3.3 Title (top-centre)
- Centred horizontally (`left:50%`, `translateX(-50%)`), `top:26px`. Flex row, items centred, gap `8px`. Not a pill (no background).
- Text **`Dune Play`** at 17px, weight 500.
- Followed by a **`BETA`** chip: 8px, weight 600, letter-spacing `.06em`, background `var(--seg)`, colour `var(--mute)`, padding `3px 5px`, radius `5px`, nudged up `translateY(-6px)` so it sits like a superscript.
- Followed by an **info button** (aria-label "About") showing the letter **`i`**: 20×20 circle, `1.5px solid var(--ink)` border, centred text 11px weight 600, `margin-left:14px` (so 8 + 14 px from the chip), `opacity:.85`.

### 3.4 Info tooltip
- A `.pill` div, but `border-radius:16px`. Fixed, centred (`left:50%`), `top:62px`, width `290px`, padding `14px 16px`, 13px text, line-height 1.45, colour `var(--ink)`, `z-index:6`.
- Text verbatim: **"Brush through the plants with your cursor to shake their leaves and petals loose. Turn on the weather and let the wind do it, or peek at the skeletons underneath."**
- Hidden state: `opacity:0`, `transform: translate(-50%,-6px)`, `pointer-events:none`. Shown when `<body>` has class `tip`: `opacity:1`, `translate(-50%,0)`. Transitions: opacity .25s, transform .3s.
- Behaviour: clicking the "i" toggles `body.tip` (and stops propagation). Any click anywhere else on the window removes `body.tip`.

### 3.5 "Shaken" counter pill
- `.pill`, centred horizontally, `top:88px`, height `34px`, padding `0 14px`, flex row, items centred, gap `7px`, 13.5px, colour `var(--mute)`.
- Content: [pixel flower icon] **Shaken** **`4,812`** **times**. The number is in a bold element: colour `var(--ink)`, weight 600, `font-variant-numeric: tabular-nums`.
- Icon: an SVG, displayed 14×14 px, viewBox 0 0 7 7, `shape-rendering: crispEdges`. It is a 7×7 pixel flower: a pink (`#f06aa8`) rounded-octagon blob filling — row 0: columns 2–4; row 1: columns 1–5; rows 2, 3, 4: columns 0–6; row 5: columns 1–5; row 6: columns 2–4 — with a single yellow (`#ffd24a`) cell painted on top at column 3, row 3 (the centre).
- The counter starts at **4812**, displayed with en-US thousands separators (`4,812`), and increments by 1 for every shake (see §7).

### 3.6 View toggle (top-right)
- `.pill` container at `right:88px; top:16px`, height `46px`, padding `4px`, flex, gap `2px`.
- Two buttons, each `44×36`, radius `24px`, content centred, transitions background .3s and colour .3s. Active button (`.on`): background `var(--on)`, colour `var(--bg)` (i.e. black chip with sand icon in light mode, inverted in dark).
- Button 1 "All plants" (active by default): SVG 16×14 (viewBox 16×14) with three vertical rounded bars, each 3.4 wide × 12 tall at y=1, x = 1, 6.3, 11.6, corner radius 1.2, fill `currentColor`.
- Button 2 "One plant": same SVG but only the middle bar (x = 6.3).

### 3.7 Dark-mode moon (top-right corner)
- A `.pill` button, `right:24px; top:16px`, 46×46 (a circle, since radius 30), centred content, aria-label "Dark mode".
- Icon: 18×18 SVG crescent moon in `currentColor`, viewBox 24×24 — the classic crescent formed by a circle of radius 8 with a bite taken out of its upper-right (path geometry: start at (20,14.5), arc r8 to (9.5,4), then a large arc r8 back to (20,14.5)).
- Click toggles `body.dark`.

### 3.8 Control bar (bottom)
- A `.pill` but radius `28px` and box-shadow `var(--shadow)`.
- Position: centred (`left:50%; translateX(-50%)`), `bottom:16px`. Width `min(1240px, calc(100vw - 32px))`. Height `max(13vh, 96px)`. Padding `0 28px`. Flex row, items centred, gap `28px`.
- Children, left to right:
  1. **Windsock canvas** (§10): internal 28×30, displayed 56×60, `image-rendering: pixelated`, `flex:none`.
  2. **Weather group**: label "Weather"; row: Weather switch, then segmented control **Breezy | Storm** (Breezy selected; the whole segment carries `.dim` while weather is off).
  3. **Vertical divider**: 1 px wide, stretches to full height minus `22px` top and bottom margins, colour `var(--line)`.
  4. **Direction group**: label "Direction"; segmented control **Left | Right** (Right selected by default).
  5. **Wind speed group**: label row "Wind speed" … **value label** (starts showing `Calm`); slider below.
  6. **Gusts group**: label row "Gusts" … **value label**; slider below. (The HTML initially says "Light gusts", but the slider initialises at 0.45, which immediately rewrites it to **`Gusty`** — that is what is shown on load.)
  7. **Vertical divider** (same as 3).
  8. **Show group**: label "Show"; row: text "Skeleton" + switch, then text "Sound" (with `margin-left:14px`) + switch.
- Group (`.grp`): flex column, gap `12px`, `min-width:0`.
- Label (`.lab`): 13.5px, colour `var(--mute)`, flex with `justify-content:space-between`, gap `20px`, `white-space:nowrap`. The value inside it (bold) is `var(--ink)`, weight 600 — so "Wind speed" sits left and "Calm" sits right above the slider.
- Row (`.row`): flex, items centred, gap `14px`.
- Plain labels "Skeleton"/"Sound": 14px.

#### Switch (`.sw`)
- Button 50×30, radius 20, background `var(--track)`, `position:relative`, `transition: background .3s`, `flex:none`.
- Knob (pseudo-element): 24×24 circle at left 3 / top 3, background `var(--knob)` (pure `#fff` in dark), shadow `0 1px 3px rgba(0,0,0,.18)`, `transition: transform .3s cubic-bezier(.3,1.4,.5,1)` (springy overshoot).
- ON (`.on`): track `#2fb35a`, knob `translateX(20px)`.
- Three switches: Weather (`wx`), Skeleton (`sk`), Sound (`snd`). All start off.

#### Segmented control (`.seg`)
- Flex trough, background `var(--seg)`, radius 20, padding 3, `transition: background .5s`.
- Buttons: height 34, padding `0 17px`, radius 17, 14px, colour `var(--mute)`, transitions background/colour/box-shadow .3s.
- Selected (`.on`): background `var(--panel)`, colour `var(--ink)`, shadow `0 1px 3px rgba(0,0,0,.1)`.
- `.dim`: whole control at `opacity:.55`.

#### Slider (`.rng`) — custom, not `<input type=range>`
- Container 168×22, `position:relative`, `touch-action:none`, `cursor:pointer`.
- Track: absolute, full width, `top:10px`, height 2, `var(--track)`, radius 2.
- Fill: absolute from left, `top:10px`, height 2, `var(--ink)`, radius 2, width = value %.
- Three tick dots inserted at 25 %, 50 %, 75 % (drawn above the fill, below the knob): 4×4 circles at `top:9px`, `margin-left:-2px`, colour `var(--mute)`, opacity .6.
- Knob: 20×20 circle, `top:1px`, `margin-left:-10px`, left = value %, background `var(--knob)` (pure `#fff` in dark), `1px solid var(--line)`, shadow `0 1px 4px rgba(0,0,0,.2)`.
- Value is clamped 0–1. When set programmatically "animated", knob `left` and fill `width` transition over **.7s cubic-bezier(.2,.8,.2,1)**; when set by the user dragging, transitions are `none` (instant tracking).
- Interaction: pointerdown captures the pointer, starts dragging and sets value = (clientX − rect.left) / rect.width; pointermove while dragging updates; pointerup ends. **If Weather is ON when the user touches either slider, Weather switches OFF** (switch and dim state resync, no preset applied) — manual control overrides the preset.
- Value label = label set[min(4, round(value·4))]:
  - Wind speed: `Calm`, `Breeze`, `Windy`, `Strong`, `Gale`
  - Gusts: `Still`, `Light gusts`, `Gusty`, `Strong gusts`, `Wild gusts`

### 3.9 Grow back button + single-view nav
- **Grow back**: a button (not a pill: no border) with text `Grow back`, centred (`left:50%`), `bottom: calc(13vh + 52px)` (floating just above the bar), height 34, padding `0 16px`, radius 30, background `var(--on)`, colour `var(--bg)`, 12.5px weight 500.
  - Hidden: `opacity:0`, `translate(-50%,10px)`, no pointer events. Visible when `body.bare`: `opacity:1`, `translate(-50%,0)`, clickable. Transitions: opacity .3s, transform .4s cubic-bezier(.2,.8,.2,1) — it slides up 10 px while fading in.
- **Single-view nav** (only displayed when `body.single`): a flex pill-like box (panel background, line border, radius 30, height 34, padding `0 8px`, gap 10, 16px font) positioned with `left: calc(50% - 6px)` and `translateX(-100%)` at the same bottom as Grow back — i.e. its right edge sits 6 px left of centre. Contents: a `‹` button, three dots, a `›` button. Buttons 26×26, centred, colour `var(--ink)`, aria-labels "Previous plant"/"Next plant". Dots: 6×6 circles, `var(--mute)`, opacity .45; the active dot gets opacity 1, background `var(--ink)`, `scale(1.15)`; transitions opacity/transform .3s.
- In single view, Grow back moves so its left edge is at `calc(50% + 6px)` with `transform: translate(0,10px)` (hidden) / `none` (when bare) — so nav and Grow back sit side by side, 12 px apart, centred on the page. The nav is always visible in single view; Grow back still appears only when bare.

### 3.10 Responsive (≤ 900 px wide)
- Control bar: `overflow-x:auto`, `justify-content:flex-start`, gap 20px (scrolls horizontally).
- Title moves to `top:70px`, counter to `top:110px` (below the brand pill row).
- View toggle hidden.

---

## 4. The canvas

- `<canvas id="scene">` fixed, `inset:0`, 100%×100%, `image-rendering: pixelated`, `touch-action:none`. It sits below all UI.
- Backing size = `round(innerWidth·DPR) × round(innerHeight·DPR)` where **DPR = min(devicePixelRatio || 1, 2)**.
- All drawing is axis-aligned filled squares of side **C** device pixels (one "cell"). No antialiasing, no images drawn to the main canvas — every sprite pixel is its own `fillRect`.

---

## 5. Sprite-to-grid pipeline (run once per plant at load)

Each plant definition:

| key | target rows | flex (bendiness) | default foliage kind | wood rule |
|---|---|---|---|---|
| palm | **96** | **1.15** | `frond` | hue 12–48° (inclusive), saturation > .30, value < .82 |
| cactus | **58** | **0.12** | `flesh` | special (below) |
| jac | **86** | **0.60** | `petal` | hue 8–50° (inclusive), saturation > .22, value < .72 |

Steps:
1. **Decode** the PNG, draw it to an offscreen canvas at native size, read pixels.
2. **Crop to alpha bounding box**: the bbox of all pixels with alpha **> 60**.
3. **Downsample**: target rows = per plant (above); cols = `round(rows · bboxWidth / bboxHeight)`. Draw the cropped region into a `cols × rows` canvas with `imageSmoothingEnabled = true` and `imageSmoothingQuality = 'high'` and read it back.
4. **Alpha threshold**: skip any cell with alpha **< 120** (everything kept is drawn fully opaque).
5. **Posterise**: each R, G, B channel → `round(c/8)·8` (multiples of 8), clamped to ≤ 255 when building the colour string `rgb(r,g,b)`.
6. **Classify** using HSV of the posterised colour (h in degrees 0–360, s = (max−min)/max, v = max, all from 0–1 channels; standard hue formula, negative hue + 360):
   - **Palm / Jacaranda**: `wood = rule(h,s,v)` from the table — brown trunks/branches are wood; everything else is foliage of the plant's default kind (`frond` for palm, `petal` for jacaranda — the whole jacaranda canopy behaves like petals).
   - **Cactus** (evaluated in this order):
     - `green` = 60 < h < 170.
     - If green **and v < .36** → **wood** (the dark rib lines) with a **bare colour `#b2875a`** (see §9).
     - else if **flower** → kind `petal`. Flower = (h > 300 or h < 18) with s > .35 (pink petals), **or** (38 ≤ h ≤ 62 with s > .6 and the cell is in the top 30 % of rows, y < rows·0.3) (the yellow flower centre).
     - else if **spine** = s < .38 and v > .55 (pale, low-saturation light pixels) → kind `spine`.
     - else → kind `flesh` (the green body).
7. **Looseness**: build an occupancy grid of kept cells. For each cell count occupied cells `n` in its **7×7 neighbourhood** (offsets −3…+3 both axes, the cell itself included, out-of-bounds ignored). `loose = clamp((1 − n/49)·1.8 + random·0.25, 0, 1)`. Edge/outer cells are loose (≈1), interior cells are tight (≈0).
8. **Seed**: each cell gets `seed = random · 6.28`.

Each cell record stores: home column `hx`, home row `hy`, colour, `wood` flag, optional `bare` colour, `kind` (`frond` | `petal` | `flesh` | `spine`), `loose`, `seed`, and runtime state. Each plant record also stores `cols`, a spring position `k = 0` and velocity `kv = 0`.

---

## 6. World layout (on load and on every window resize / view change)

- **Cell size**: `C = max(2, round(innerHeight · DPR · 0.0054))` device pixels in the three-plant view; factor **0.0068** in single view (plants appear ~26 % larger).
- Grid width `cols = ceil(canvasWidth / C) + 2`.
- **Ground row** `GY = round(canvasHeight · 0.68 / C)` — the ground line is at 68 % of the viewport height.
- Allocate a **litter height map** `hm` (one int per column, all 0) and a **floor mask** `floor` (one flag per column, all 0).
- Plant centre fractions of width: palm **0.20**, cactus **0.48**, jacaranda **0.77**. In single view all are at **0.50** and only the selected plant is visible (`one` index; default **1 = cactus**).
- Per plant: centre column `cx = round(canvasWidth · fx / C)`; origin `ox = cx − round(cols/2)`; `oy = GY − rows` (the sprite's bottom row sits on row GY−1).
- **Sand mound** per plant: width `w = round(max(plantCols · 1.05, 40))` cells, starting at column `cx − round(w/2)`. For each x = 0…w−1 with `t = x/(w−1)`, mound height `hgt = round( sin(t·π)^0.6 · 3 )` (0–3 cells, a flat-topped dome). Fill cells from row `GY+1` up to row `GY+1−hgt` (y = 0…hgt, row = GY − y + 1). Each cell's tone = `tones[(x·7 + y·3) mod 4]` with tones `['#e4cfa6', '#d9c094', '#cdb282', '#efdcb8']` — a dithered sandy texture. The mound is drawn before the plant every frame (the plant base overlaps its top).
- **Litter floor**: only under visible plants, columns `cx − (W>>1)` to `cx + (W>>1)` (exclusive) where `W = round(max(plantCols·1.05, 40) · 1.25)` — i.e. **1.25× the mound width**. Falling foliage can only land where `floor` is set; elsewhere it falls through and off the bottom of the screen.
- Update the single-view dots (active = selected index).
- **Reset**: every cell of every plant goes back to attached (state 0); body class `bare` is removed.

---

## 7. Interaction: shaking

### Hit test
Convert the pointer to grid coords: `gx = clientX · DPR / C`, `gy = clientY · DPR / C`. For each visible plant, quick-reject unless `ox−3 ≤ gx ≤ ox+cols+3` and `oy−3 ≤ gy ≤ GY+2`. Then the plant is hit if **any attached cell** (state 0, wood or foliage) has `|ox + hx + sx − gx| < 3` and `|oy + hy − gy| < 3` (sx = that cell's current sway offset). First hit plant wins.

### Hover cursor
On pointermove (when not dragging) set the canvas cursor to `pointer` over a plant, otherwise `default`.

### Click (pointerdown)
If a plant is hit: capture the pointer, start a drag record `{plant, lastX = clientX}`, and **shake(plant, dir = random ±1, power = 1)**.

### Drag shake
While dragging, on pointermove compute `dx = clientX − lastX`; whenever `|dx| > 28` px, **shake(plant, sign(dx), power = 0.7)** and set `lastX = clientX`. (So brushing back and forth keeps shaking the same plant.) pointerup / pointercancel end the drag.

### shake(plant, dir, power)
1. `leaves` = all foliage (non-wood) cells currently attached.
2. Spring impulse: `kv += dir · (5 + 4·power)`.
3. Count to detach: `n = max( min(leaves, 30), min( round(leaves · 0.13 · power), 170 ) )` — at least 30 (or all if fewer), ~13 % of what's left, capped at 170.
4. Sort leaves descending by `loose + random·0.9` (looser, outer leaves preferred, with randomness) and detach the first `n` with initial velocity:
   - `vx = dir·(6 + random·16) + windDir·windSpeed·12`
   - `vy = −(6 + random·16)` (upward toss; units = cells/second, +y is down)
5. Increment the Shaken counter by 1 (always, even if nothing was left to drop) and re-render it as en-US formatted.

### Spring
Each plant has a 1-D damped spring `k` (position) / `kv` (velocity), integrated every frame: `kv += (−k·42 − kv·3.4)·dt; k += kv·dt` (stiffness **42**, damping **3.4**, semi-implicit Euler). Its contribution is added to the sway (§8), so a shake makes the whole plant whip side to side and settle over ~1–2 s.

---

## 8. Wind model and per-frame simulation

### Time
`t` = seconds since page start; `dt = min(0.05, frame delta seconds)`.

### Gust noise
`gustN(t) = ( sin(1.31t) + sin(2.17t + 1.3) + 0.8·sin(0.63t + 2.1) + 2.8 ) / 5.6` → a smooth 0…~1 signal.

### Wind value
`g = gustN(t)`; `w = dir · ( speed·0.75 + speed·g·gust·0.9 + gust·g·0.12 )`, `aw = |w|`. `dir` is −1 (Left) or +1 (Right). Note that even at speed 0 the gust term gives a faint idle breath.

### Automatic shedding rate
`rate = speed > 0.15 ? speed^2.4 · 0.045 · (0.35 + gustN(1.7t) · gust · 1.7) : 0`.

### Per plant, per frame
1. Draw its sand mound cells.
2. Integrate the spring (§7).
3. **Sway**: `sway = ( w·0.55 + sin(0.9t + cx)·0.05 + (aw > 0.05 ? sin(3.1t + cx)·aw·0.12 : 0) ) · flex + k·0.55·max(0.25, flex)` (cx = plant centre column, de-syncing plants).
4. For each cell with `hg = 1 − hy/rows` (0 at base, 1 at top):

**Attached (state 0)**
- Foliage only: counts toward `total` and `attached`. Auto-detach with probability per frame `rate · dt · (spine ? 0.25 : 1) · (0.2 + loose·1.6) · (0.4 + hg)`, initial velocity `vx = w·30 + (random−0.5)·8`, `vy = −random·6`. If detached, skip drawing as attached.
- **Bend offset** (all attached cells): `ox = sway · hg^1.7 · rows · 0.14`, `oy = 0` — the base is anchored, the top bends most.
- **Streaming tails** (foliage only): `arm = loose^1.6 · (flex > 0.3 ? 1 : 0.35)` (stiff plant — cactus — gets 0.35×); `g = 0.65 + 0.35·sin(2.6t − hx·0.18 + seed·0.3)` (a travelling ripple across the canopy); then `ox += w·aw·arm·rows·0.42·g + sin(7t + seed)·arm·aw·1.4` (pull downwind plus fast flutter) and `oy = −arm·aw²·3·g` (outer leaves lift slightly in strong wind).
- Store `sx = round(ox)`, `sy = round(oy)` (whole cells, keeping it crunchy pixel art). Draw at cell `(ox_plant + hx + sx, oy_plant + hy + sy)`.
- Colour: the cell colour, except cactus rib wood cells which are mixed toward their bare colour (§9).

**Not attached** — foliage counts toward `total` only.

**Flying (state 1)** — lifetime factor `lt` by kind: **petal 1.5, frond 1.25, flesh 0.95, spine 0.6** (set at detach; each flying cell also gets a random phase `ph ∈ [0, 6.28)`).
- Accelerations: `ax = w·48·lt + sin(4.2t + ph)·16·lt` (wind push + side-to-side flutter); `ay = (spine ? 50 : 18) / lt` (gravity: spines drop fast, petals float).
- Drag-toward-target integration: `vx += (ax − vx·1.6)·dt`; `vy += (ay − vy·1.1)·dt`.
- Position: `x += vx·dt + sin(6t + ph)·0.05·lt`; `y += vy·dt`.
- **Leaving the screen**: if `x < −4` or `x > cols + 4` or `y > canvasHeight/C + 4` → state 3 (gone, not drawn).
- **Landing**: with `c = round(x)`, if `c` is in range, `floor[c]` is set, `y ≥ GY − hm[c]` and `vy > 0` → state 2, snap `y = GY − hm[c]`, `x = c`, then `hm[c] = min(5, hm[c] + 1)`. Litter piles up on the ground row and stacks at most **5** cells high per column.

**Landed (state 2)** — if `aw > 0.55` (storm-strength), each frame with probability `(aw − 0.5)·dt·1.4` the litter is **re-lifted**: detach again with `vx = w·40`, `vy = −8 − random·10` (and its column's `hm` decrements by 1).

**Returning (state 4)** — see §9.

States 1, 2, 4 are drawn at `(round(x), round(y))` in the cell's own colour.

General detach rules: wood never detaches; a cell already flying is ignored; detaching an attached cell starts it at its current displayed position (home + sx, sy); detaching a landed cell decrements `hm` at its column; gone (3) and returning (4) cells cannot be detached. Every detach increments a per-frame counter used for sound.

5. **Skeleton overlay** (when Skeleton is on): after all the plant's cells, draw every attached wood cell again on top in `#c8382a` (light) / `#ff6a4d` (dark) at `(ox + hx + sx, oy + hy)` (horizontal sway applied, no vertical tail offset). Result: palm trunk and frond ribs, jacaranda trunk/branches and cactus rib lines show as a red x-ray rig while foliage still moves around them.
6. Plant bareness `bareK = total ? 1 − attached/total : 0`; the scene is "bare" if any visible plant has `attached < total`.

After all plants: unless a grow-back is in progress, toggle `body.bare` to the bare flag (shows/hides Grow back). Fire one rustle burst for the frame's detach count (§11). Update wind sound gain. Draw the windsock with the current `t` and `w`. Request the next frame.

---

## 9. Bare colour mixing & Grow back

### Cactus ribs
Cactus rib cells (wood with bare colour `#b2875a`) are drawn as `mix(original, #b2875a, bareK)` — linear RGB interpolation, rounded. As the cactus loses its green flesh/spines/flower, the dark rib lines warm up into a tan woody skeleton; when fully stripped they are pure `#b2875a`. (Uses the previous frame's bareK.)

### Grow back (button click)
1. Set a `growing` flag (suppresses toggling `body.bare` for **1800 ms**), clear `hm` to all zeros.
2. For every visible foliage cell not attached: if it is gone (state 3) or has never had a position, respawn it at `x = homeX + (random − 0.5)·30`, `y = GY + 6` (just below ground, spread around the plant). Set state 4, remember start `fx, fy`.
3. **Staggered, bottom-first** start time: with `r = hy/rows`, `t0 = now + (r > 0 ? (1 − r)·0.25 : 0) + (1 − r)·0.45 + random·0.35` seconds — cells near the base start first, the crown last (up to ~1.05 s later). Duration `du = 0.55 + random·0.35` s.
4. Remove `body.bare` immediately (button fades out).
5. Each frame for state 4: `e = clamp((now − t0)/du, 0, 1)`, `ez = 1 − (1 − e)^3` (**ease-out cubic**); `x = fx + (homeX − fx)·ez`, `y = fy + (homeY − fy)·ez − sin(e·π)·8` — every pixel flies home along an **8-cell upward arc**. Home = `(ox + hx, oy + hy)` (no sway). Before its start time a cell waits at its start position. When `e ≥ 1` it becomes attached (state 0) with `sx = 0`.

### Grow back visibility rules
- Visible (`body.bare`) whenever any visible plant has any detached foliage (flying, landed, gone or returning), recomputed every frame — except during the 1.8 s grow window, where it stays hidden.
- Removed on layout changes (resize, view switch, carousel step), which also reattach everything.
- In single view it sits right of the carousel nav (§3.9).

---

## 10. Windsock (pixel art, in the control bar)

Drawn every frame on the 28×30 canvas (displayed at 2×, pixelated). Clear it, then:
- **Pole**: colour `#6b6258` (light) / `#9a8f80` (dark). A 2-px-wide rectangle at x = 13, y = 1, height 29; plus a 4×2 base foot at x = 12, y = 28.
- **Sock**: `a = min(1, |w|)`, `d = sign(w)` (or +1 if 0), droop angle `ang = (1 − a)·1.25` rad (calm: hangs ~72° down beside the pole; gale: straight out horizontally). Five segments `i = 0…4`:
  - distance from pole `r = 2 + 2.4·i`
  - flap `fl = sin(10t − 1.2i) · a · 0.9` (a wave travelling down the sock, stronger in stronger wind)
  - `dx = cos(ang)·r`, `y = 3 + sin(ang)·r + fl`
  - segment height `h = max(2, 4 − floor(i/2))` → 4, 4, 3, 3, 2 (tapering)
  - colour: even i `#e8573b`, odd i `#f4efe6` (orange/white stripes)
  - x: if d > 0, `15 + dx`; else `9 − dx` (mirrored to the left side of the pole)
  - fill a rect `3 × h` at `(round(x), round(y − h/2 + 1))`.

---

## 11. Sound (Web Audio, created lazily on first Sound ON)

- Turning Sound ON the first time creates an `AudioContext` (with `webkitAudioContext` fallback); later ON clicks just `resume()` it.
- **Noise buffer**: mono, 2 s at the context sample rate, brown-ish noise: `l = (l + 0.02·white)/1.02`, sample = `l · 3.5`, where white ∈ [−1, 1).
- **Wind bed**: looping buffer source → **bandpass 420 Hz, Q 0.6** → gain (starts 0) → destination, started immediately. Every frame the gain is smoothed with `setTargetAtTime(target, now, 0.25)` where target = Sound on ? `min(0.5, aw·0.45 + 0.01)` : 0 (so turning Sound off fades it out but keeps the graph alive).
- **Rustle bursts**: once per frame when ≥ 1 cell detached that frame (and Sound is on): a new one-shot source on the same noise buffer → **highpass 1800 Hz** → gain envelope → destination. Peak `a = min(0.22, 0.02 + n/180)` (n = cells detached this frame); gain 0 at now, linear ramp to `a` in 20 ms, exponential ramp to 0.0005 by +0.35 s; start at a random offset 0–1 s into the buffer; stop at +0.4 s.

---

## 12. Controls state & behaviour

Initial state: weather off, mode `breezy`, direction +1 (Right), wind speed **0**, gust **0.45**, skeleton off, sound off, light theme, three-plant view, single index 1.

- **Weather switch**: toggles weather. Turning it **ON** applies the current mode's preset with animated sliders. Turning it **OFF** animates speed back to **0** and gust to **0.45**. The Breezy/Storm segment is dimmed (.55) while weather is off.
- **Presets** (speed, gust): **Breezy = 0.40 / 0.45** (labels "Breeze" / "Gusty"), **Storm = 0.95 / 0.95** (labels "Gale" / "Wild gusts").
- **Breezy/Storm buttons**: select the mode **and** force weather ON, then apply the preset (animated .7s).
- **Direction Left/Right**: sets dir −1/+1 and moves the `.on` highlight. Affects wind sign, leaf flight, toss velocity, sway direction and windsock side.
- **Sliders**: manual edit; touching one turns weather OFF (no preset reset).
- **Skeleton switch**: toggles the red wood overlay.
- **Sound switch**: toggles audio (initialises on first enable — requires that user gesture).
- **Moon**: toggles dark theme (all tokens + canvas background + skeleton/pole colours).
- **View toggle**: "All plants" / "One plant" sets single mode, swaps `.on`, toggles `body.single`, re-layouts (bigger cells, one centred plant, reset).
- **‹ / ›**: previous `(one + 2) mod 3` / next `(one + 1) mod 3`, re-layout. Dots reflect palm, cactus, jacaranda order.
- **Resize**: re-layout (resets all foliage).

Optional debug hook: expose `window.__pp` with the plants array, state object, grow, slider setters, weather sync, shake, setSingle and a `detachAll` that throws every foliage cell with random velocity (x ±10, y up to −20) — handy for testing, not visible.

---

## 13. Look & feel summary

- Light: warm cream sand `#f2ebdf` everywhere, white rounded pills with hairline borders, near-black ink. Dark: deep brown-black `#14110d` with `#1f1b15` pills and cream ink; transitions are .5 s.
- The plants are chunky (cells ≈ 0.54 % of viewport height, e.g. 5 device px on a 900 px tall 1× screen, 10 on retina), sitting on the 68 % ground line with small dithered sand mounds. Palm left (tall, very bendy), cactus slightly left of centre (short, nearly rigid, pink flower on top), jacaranda right (purple canopy, medium flex).
- At rest there is a subtle idle sway. In Storm the palm whips hard downwind, fronds stream out into tails, petals and leaves rip away, flutter across the screen, pile up in little drifts under the plants (max 5 high) and get swept off again; the windsock stands straight out and flaps.
- Pixel crispness everywhere: integer cell offsets, `image-rendering: pixelated`, crisp-edged icon SVG.

---

## 14. Acceptance checklist

- [ ] Title is `Dune Play · Grovekit`; Inter 400/500/600 loaded from Google Fonts.
- [ ] All light and dark tokens match §2 exactly; theme toggles via `body.dark` with .5 s background transition and the canvas background follows the computed body colour.
- [ ] Brand pill "Grovekit" at 24/16, 44 px high, 14px/600.
- [ ] Title "Dune Play" 17px/500 + raised 8px BETA chip + 20 px circled "i" 14 px further right; tooltip text verbatim, 290 px, slides 6 px + fades; outside click closes it.
- [ ] Counter pill at top 88, 7×7 pink flower with yellow centre, "Shaken **4,812** times", increments per shake with en-US commas.
- [ ] View toggle (two buttons 44×36, three-bar / one-bar icons) at right 88, moon pill 46×46 at right 24; view toggle hidden ≤ 900 px.
- [ ] Control bar: min(1240px, 100vw−32px) × max(13vh, 96px), bottom 16, radius 28, gap 28, padding 28, big soft shadow; order windsock · Weather · divider · Direction · Wind speed · Gusts · divider · Show.
- [ ] Switches 50×30, springy knob, green `#2fb35a` when on; segments with white raised selected chip; custom 168 px sliders with 3 tick dots and 20 px knob.
- [ ] On load labels read "Calm" and "Gusty"; Breezy → 0.40/0.45 ("Breeze"/"Gusty"), Storm → 0.95/0.95 ("Gale"/"Wild gusts"), animated .7s cubic-bezier(.2,.8,.2,1); weather off → 0/0.45; touching a slider turns weather off.
- [ ] Three sprite URLs used verbatim, loaded with CORS; converted via alpha bbox (>60), high-quality downsample to 96/58/86 rows, alpha ≥ 120 kept, channels posterised to multiples of 8.
- [ ] Wood classification per §5 (palm h12–48 s>.3 v<.82; jac h8–50 s>.22 v<.72; cactus dark green v<.36 ribs → wood with bare `#b2875a`; pink/yellow-top → petal; pale low-sat → spine; rest flesh).
- [ ] Looseness from 7×7 neighbourhood `(1−n/49)·1.8 + rand·0.25`, clamped; per-cell random seed.
- [ ] C = round(H·DPR·0.0054) (single 0.0068), min 2, DPR ≤ 2; ground at 68 %; plants at 20/48/77 % (single: centred, default cactus).
- [ ] Sand mounds: width max(cols·1.05, 40), height round(sin(tπ)^0.6·3), four tones by (7x+3y) mod 4; litter floor only under mounds at 1.25× width; litter stacks ≤ 5.
- [ ] Pointer cursor over plants; click shakes with impulse dir·(5+4·power), detaches max(min(L,30), min(round(L·0.13·power),170)) loosest-biased leaves with the specified velocities; dragging shakes every 28 px at power 0.7; spring k=42, damping 3.4.
- [ ] Sway, streaming tails (arm = loose^1.6, ×0.35 for cactus), gust noise, wind and shed-rate formulas exactly as §8.
- [ ] Flying physics: ax = w·48·lt + flutter, ay = 18/lt (spines 50/lt), drag 1.6 / 1.1, lifetimes petal 1.5 / frond 1.25 / flesh 0.95 / spine 0.6; off-screen removal at ±4 cells; storm (|w| > 0.55) re-lifts litter.
- [ ] Grow back appears (slides up 10 px) whenever foliage is missing; click → bottom-first staggered return, ease-out cubic, 8-cell arc; gone pixels respawn below ground near the plant; button stays hidden 1.8 s.
- [ ] Single view: ‹ • • • › nav left of centre, Grow back right of centre, 12 px gap; dots show the active plant.
- [ ] Skeleton draws attached wood on top in `#c8382a` / `#ff6a4d`; cactus ribs warm toward `#b2875a` as it goes bare.
- [ ] Windsock: pole + base, five tapering orange/white segments, droop (1−a)·1.25 rad, travelling flap, mirrors with direction, pole colour per theme.
- [ ] Sound: brown-ish looping noise → bandpass 420 Hz Q 0.6 → gain min(0.5, |w|·0.45 + 0.01) smoothed 0.25; rustle bursts → highpass 1800 Hz, 20 ms attack, exp decay to 0.0005 at 0.35 s, peak min(0.22, 0.02 + n/180).
- [ ] Resizing or switching views rebuilds the layout and reattaches every leaf; no page scroll, no text selection, no console errors.