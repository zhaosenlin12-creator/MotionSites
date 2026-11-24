# HERO PROMPT — "olla" Stack-smart Kitchenware Landing Page (Balloon-Drop Grill)

> Exact recreation brief. Build a **single self-contained HTML file** (inline `<style>` and inline `<script>`, no frameworks, no build step, no libraries) that reproduces the page described below pixel-for-pixel and frame-for-frame. Every number in this document is load-bearing. Where a value is given in `vw`, `vh`, `%` or `px`, use exactly that unit. Where an easing curve, duration or delay is given, use exactly that. Every copy string is quoted verbatim — do not rephrase, re-capitalise or add punctuation.

---

## 0. Concept in one paragraph

A minimal, warm-beige kitchenware landing page for a brand called **olla**. At the top: a fixed white rounded navigation bar with a "Shop" mega-menu that wipes open downward into a strip of five line-icons. Below it, a hero made of two rounded panels side by side: a wide **night-sky panel** (deep navy sky, lilac clouds) on the left, and a narrow **yellow product card** on the right that plays a looping video of cookware nesting into itself. In the sky panel, a **folding grill pan hangs from a bunch of seven yellow balloons**, gently bobbing. A giant white word "olla" sits at the bottom-left of the sky panel. When the user scrolls, the balloons let go and float up out of the panel, and the grill **falls under gravity** — opening into a V shape and folding shut again as it falls — drifts sideways, shrinks, **passes behind the beige gutter between the sky panel and the kitchen panel below**, and **lands exactly in an empty gap on a kitchen counter** in a photographic kitchen section. When it lands, a centred headline fades up over the kitchen photo.

---

## 1. Document setup

- `<!doctype html>`, `<html lang="en">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width,initial-scale=1">`.
- `<title>`: **olla — Stack-smart kitchenware** (that is an em dash with a space on either side).
- Fonts: preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`), then load **Jost** from Google Fonts with weights **400, 500, 600** and `display=swap` (stylesheet URL: `https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&display=swap`).
- Font stack for `body`: `"Jost", "Futura", "Century Gothic", Arial, sans-serif`. Enable `-webkit-font-smoothing: antialiased`.
- Global reset: every element `box-sizing: border-box; margin: 0; padding: 0`.
- `html` background = page beige **#e9e7df**. `body` has `overflow-x: hidden`.
- Links and buttons: inherit font and colour, no background, no border, pointer cursor, no text-decoration.

### 1.1 Design tokens (define as CSS custom properties on `:root`)

| Token | Value | Use |
|---|---|---|
| `--page` | `#e9e7df` | page background (warm light beige/greige) — this beige is also what shows in the gutters between panels |
| `--ink` | `#16193a` | default text colour (very dark navy-ink), icon stroke colour |
| `--navy` | `#141a4a` | card text colour, card button hover background |
| `--white` | `#fff` | |
| `--card` | `#f7d23a` | fallback card yellow (replaced at runtime by a colour sampled from the video — see §6.3) |
| `--gap` | `1.19vw` | gutter between the sky panel and card, and between hero and kitchen panel |
| `--w` | `87vw` | content container width (nav, drop strip, hero row, kitchen panel all share this width) |
| `--ease` | `cubic-bezier(.2,.8,.2,1)` | the single easing curve used for every CSS transition with an ease specified |

Body text colour = `--ink`.

---

## 2. Assets (copy these URLs verbatim)

All imagery is AI-rendered. Images are served through the `images.higgs.ai` resizing proxy (WebP output); the two video clips are served directly from CloudFront. Define them as JavaScript constants at the top of the script and apply the images as CSS `background-image`s from JS (so the URLs live in one place).

| Constant | URL (verbatim) | What it shows |
|---|---|---|
| `SKY` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_013341_08629ffd-6ab5-44a8-bec8-f1939ab3a6cd.png&w=2048&q=88` | A painterly **navy night sky** with soft **lilac/lavender clouds** — no subject, just atmosphere. Used as the sky panel background, `center / cover`, no-repeat. |
| `BALLOONS` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_013346_9a3e7023-d72b-4572-a9b2-cc7a8f57a248.png&w=1024&q=90` | A **transparent** (alpha) WebP of a cluster of **seven glossy yellow balloons** whose strings converge downward to a single point. Intrinsic aspect ratio **1360 : 2048** (portrait). The point where all strings meet is at **49.4 % of the image width, 94.6 % of the image height** — this point is the anchor that must sit on the grill's handle. |
| `KITCHEN` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_015339_b6f97f82-8012-44de-a22b-fe02bd458b20.png&w=2688&q=88` | A bright, warm, photographic **kitchen interior**, intrinsic size **2688 × 1520 px**. On the counter there is an **empty gap** (between appliances — next to an air fryer) where the grill is meant to land. Upper area is a calm wall that hosts the headline. Used as kitchen panel background, `center / cover`, no-repeat. |
| `GRILL_CLIP` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261109_014328_9a7b4687-246e-497b-9bb9-42c285db3f47.mp4` | A **1440 × 1440 square green-screen** loop of the folding grill pan: it starts closed, **opens into a V** (two halves hinging apart), then **closes again** (start frame ≈ end frame). Pure chroma-green background, keyed out at runtime. The grill body occupies roughly **83 %** of the square frame; its **handle** (where the balloon strings attach) is near the top, at **7.5 %** of the frame height from the top edge. |
| `POTS_CLIP` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261109_014333_8f8987d1-2b8c-4309-a5ac-8bbe9b8835d6.mp4` | A **1440 × 1440 square** loop on a **flat yellow background** of a cookware set (pots/pans) **nesting into each other and separating again**. Plays as a normal muted autoplay loop inside the card. |

CORS: both videos must be loaded with `crossOrigin = "anonymous"` because their pixels are read back from canvases (colour sampling and chroma keying). Never re-host, re-upload or substitute any of these assets.

---

## 3. Page structure (DOM order and z-order)

Top-level children of `<body>`, in this order:

1. `nav#nav` — fixed nav bar
2. `div#drop` — fixed Shop dropdown strip (sibling of nav, not a child)
3. `section#hero` — the two-panel hero row
   - `div#sky` (left panel) containing, in order: `div.tag` (tagline), `div#balloons` (balloon image), `canvas.grill#gS` (grill copy #1), `div.word` (giant "olla")
   - `aside#card` (right panel) containing: `span.new`, `p`, `video#pots`, `a.shop`
4. `section#kitchen` — kitchen panel containing: `canvas.grill#gK` (grill copy #2), `div#ktext` (headline block with `h2` + `p`)
5. `div#foot` — an empty spacer, height **9.3vh**

Z-index summary:

| Element | z-index | Notes |
|---|---|---|
| `#nav` | 50 | fixed, always on top |
| `#drop` | 49 | fixed, just under the nav |
| `#sky .tag` | 3 | above balloons and grill |
| `#sky .word` ("olla") | 3 | **above the grill** — the falling grill passes *behind* the giant word |
| `#balloons` | 2 | |
| `.grill` canvases | 2 | in the sky, DOM order puts the grill canvas after the balloons, so grill paints over balloons; the word comes after and has z 3 |
| `#ktext` | 4 | above the kitchen grill canvas |

---

## 4. Navigation bar (`#nav`)

### 4.1 Box

- `position: fixed`, `left: 50%`, `margin-left: calc(var(--w) / -2)` (i.e. horizontally centred with the 87vw width), `top: 1.9vh`.
- `width: 87vw`, `height: 5vh`, `min-height: 40px`.
- `background: #fff`, `border-radius: 10px`, no shadow, no border.
- `display: flex; align-items: center`, horizontal padding **3.9vw** on left and right, 0 vertical.
- `z-index: 50`.

### 4.2 Contents (left → right)

1. **Logo**: an `<a class="logo">` with text **olla** (all lowercase). Font size `clamp(17px, 1.35vw, 24px)`, weight **600**, letter-spacing **−0.03em**. Colour ink.
2. **Links group** `#links`: absolutely positioned, `left: 50%`, `transform: translateX(-52%)` (deliberately 2 % off-centre to the left — optically balances the chevron), `display: flex`, `gap: 2.4vw`, font size `clamp(12px, 0.95vw, 16px)`, weight **500**. The six links in order, verbatim:
   - **Shop** — followed by a small chevron-down icon (class `shop`)
   - **olla**
   - **olla PRO**
   - **Simply Good**
   - **Recipes**
   - **Journal**
3. **Search button** `#search`: `margin-left: auto` (pushed to the right edge of the padding), 18 × 18 px, `aria-label="Search"`. Its SVG (viewBox 0 0 20 20, rendered 18 × 18) is a magnifying glass: a circle centred at (8.5, 8.5) with radius 6, no fill, stroke currentColor width 1.7, plus a straight handle line from (13, 13) to (18, 18), stroke width 1.7.

### 4.3 Link details

- Each link: `position: relative; display: flex; align-items: center; gap: 4px`.
- **Hover underline**: a pseudo-element (`::after`) absolutely positioned `left: 0; right: 0; bottom: -3px; height: 1.5px; background: currentColor`, initially `transform: scaleX(0)` with `transform-origin: left`; on hover `scaleX(1)`. Transition `transform .35s var(--ease)`. So the underline draws in from left to right.
- **Chevron** in "Shop": SVG viewBox 0 0 10 10, rendered **9 × 9 px**, a single open polyline path from (1.5, 3.5) to (5, 7) to (8.5, 3.5), no fill, stroke currentColor, stroke width 1.5 — a small "V". It has `transition: transform .3s var(--ease)`.
- When the menu is open (body has class `menu`): the chevron rotates **180°** (points up) and the Shop link's opacity becomes **0.55**.

---

## 5. Shop mega-menu strip (`#drop`)

### 5.1 Box

- `position: fixed`, centred like the nav (`left: 50%`, `margin-left: calc(var(--w)/-2)`, `width: 87vw`).
- `top: calc(1.9vh + 5vh + .9vh)` — i.e. sits **0.9vh below** the nav's bottom edge.
- `height: 9.5vh`, `min-height: 70px`, `background: #fff`, `border-radius: 10px`, `z-index: 49`.
- `display: flex; justify-content: center; align-items: center; gap: 6.2vw`.

### 5.2 Reveal animation (clip-path wipe)

- Closed state: `clip-path: inset(0 0 100% 0 round 10px)` — fully clipped from the bottom, so nothing is visible (the strip is collapsed to its top edge).
- Open state (`body.menu`): `clip-path: inset(0 0 0 0 round 10px)`.
- Transition: `clip-path .45s var(--ease)`. Result: the white strip **wipes downward** from its top edge, with rounded corners at all times.

### 5.3 Items (staggered)

Each item is an `<a>` laid out as a vertical column: `display: flex; flex-direction: column; align-items: center; gap: 6px`. Label font size `clamp(10px, 0.72vw, 13px)`, weight **500**.

- Closed state: `opacity: 0; transform: translateY(-6px)`.
- Open state: `opacity: 1; transform: none`.
- Transition: `opacity .3s` (default ease) and `transform .4s var(--ease)`.
- Stagger (transition-delay applies only in the open state, so closing is simultaneous): item 1 → 0s, item 2 → **0.04s**, item 3 → **0.08s**, item 4 → **0.12s**, item 5 → **0.16s**.

Icons: inline SVGs with viewBox **0 0 36 36**, rendered at `clamp(26px, 2.1vw, 36px)` square, `fill: none`, `stroke: var(--ink)`, `stroke-width: 1.3`, round line joins and round line caps. On item hover the icon stroke turns **#3a49c9** (a bright royal blue). All icons are thin line drawings.

| # | Label (verbatim) | Icon description (all coordinates in the 36 × 36 viewBox) |
|---|---|---|
| 1 | **Shop All** | A little **storefront**: a rectangle body from x 5 to 31, y 14 to 31; an **awning/roof** as an open trapezoid line from (3, 14) up to (6, 6), across to (30, 6), down to (33, 14); a **door** as an open rectangle from (14, 31) up to (14, 22), across to (22, 22), down to (22, 31); and a small **window** rectangle from (9, 18) to (13, 21). |
| 2 | **Stack-smart™** | **Stacked cubes / isometric boxes**: a hexagon (top cube) with vertices (18, 4), (25, 8), (25, 16), (18, 20), (11, 16), (11, 8); inside it a "Y" of edges from (11, 8) to (18, 12) to (25, 8), plus (18, 12) down to (18, 20); below it two quadrilateral faces — a left face (11, 20)→(18, 24)→(18, 32)→(11, 28) closed, and a right face (25, 20)→(18, 24)→(18, 32)→(25, 28) closed — suggesting a second block beneath. |
| 3 | **EverCoat™** | A **leaf**: an outline that starts at the bottom-left (8, 28), sweeps up via a curve to the top-right tip (30, 7), then curves back down to (8, 28) (a lens/leaf shape, closed); plus a **midrib/stem** curve from (8, 28) curving up toward (24, 14). |
| 4 | **Family Sized** | A **family of three people**: two head circles of radius 3.5 at (11, 11) and (25, 11), a smaller middle head of radius 3 at (18, 15); shoulders/bodies as three dome arcs — left from (5, 28) rising and returning to (17, 28) via a rounded hump, right from (19, 28) to (31, 28), and a smaller central child arc from (13, 31) to (23, 31) in front. |
| 5 | **Pro Performance** | A **lightning bolt in a circle**: circle centred (18, 18) radius 14; inside, a closed zig-zag bolt polygon (20, 7) → (13, 19) → (19, 19) → (16, 29) → (24, 16) → (18, 16) → back to (20, 7). |

The ™ characters in labels 2 and 3 are the literal "™" glyph, not superscripts.

### 5.4 Open/close behaviour (JS)

- Hovering the "Shop" link → add class `menu` to `<body>` immediately (cancel any pending close).
- Mouse leaving the "Shop" link → schedule removal of `menu` after **160 ms**.
- Hovering the `#drop` strip → cancel the pending close and keep it open; leaving the strip → schedule close after 160 ms. (This bridges the 0.9vh gap between nav and strip.)
- Clicking "Shop" → `preventDefault()` and **toggle** the `menu` class (touch support).

---

## 6. Hero row (`#hero`)

### 6.1 Row box

- `position: relative`, `width: 87vw`, `margin: 0 auto`, `padding-top: 9.3vh`, `height: 100vh`.
- `display: flex`, `gap: 1.19vw` (var(--gap)).
- So the panels start 9.3vh from the top of the document (clearing the nav: 1.9vh + 5vh + 2.4vh breathing room) and are **89.3vh tall**, leaving 1.4vh at the bottom of the first screen before the gutter.

### 6.2 Sky panel (`#sky`)

- `position: relative`, `flex: 0 0 71.1%` (exactly 71.1 % of the 87vw row — not grow, not shrink), `height: 89.3vh`.
- `border-radius: 14px`, **`overflow: hidden`** (critical — this clips the balloons and the sky copy of the grill to the rounded window).
- Background: `#0d1650` fallback colour plus the `SKY` image, `center / cover`, no-repeat.

**Tagline** `.tag`:
- Absolute, `left: 6.45%`, `top: 8.8%` of the panel.
- White, `font-size: clamp(20px, 2.05vw, 36px)`, weight **500**, `line-height: 1.08`, `letter-spacing: -0.01em`, `z-index: 3`.
- Text (two lines, a hard line break after the ™): **Stack-smart™** / **kitchenware** — where "™" is a `<sup>` at `font-size: .42em`, `vertical-align: top`, `position: relative; top: .2em` (small trademark tucked against the cap height).

**Giant word** `.word`:
- Absolute, `left: 6.1%`, `bottom: 5.4%`.
- Text **olla** (lowercase), white, `font-size: 27vh`, weight **500**, `line-height: .74` (tight, so the box hugs the glyphs), `letter-spacing: -0.035em`, `z-index: 3`.
- It sits above the grill canvas, so as the grill falls through the lower part of the panel it disappears *behind* the letters.

**Balloons** `#balloons` (positioned by JS — see §9):
- Absolute, `width: 30%` of the sky panel, `aspect-ratio: 1360 / 2048`, background = `BALLOONS` image `center / contain` no-repeat.
- `transform-origin: 49.4% 94.6%` — the string-meeting point, so rotations pivot around where the strings tie to the grill.
- `z-index: 2`, `will-change: transform`.

**Grill canvas #1** `canvas.grill#gS` — see §8 and §9.

### 6.3 Product card (`#card`)

- `position: relative`, `flex: 1` (takes the remaining ~28.9 % minus the gap), `height: 89.3vh`, `border-radius: 14px`, `overflow: hidden`.
- Background `--card` (#f7d23a) initially; text colour `--navy` (#141a4a); padding **2.2vh** top/bottom, **1.4vw** left/right.

**Colour sampling (makes the card seamless with the video):** once the pots video fires `loadeddata` (listen once), draw the video's **top-left region of 12 % width × 12 % height** (source rect x 0, y 0, w = videoWidth·0.12, h = videoHeight·0.12) into an **8 × 8** offscreen canvas, read all 64 pixels, average R, G and B separately (integer-truncate each), and set the card's inline `background` to `rgb(R, G, B)`. Wrap in try/catch so a CORS failure silently keeps #f7d23a. The intent: the clip's flat yellow backdrop and the card colour become identical, so the feathered video edge is invisible.

**Contents (top → bottom):**

1. **"NEW" pill** `span.new`: `display: inline-grid; place-items: center`, `height: 3vh`, `min-height: 22px`, horizontal padding **1.25vw**, `border-radius: 30px`, white background, `font-size: clamp(9px, 0.66vw, 12px)`, weight **600**, `letter-spacing: .02em`. Text: **NEW**.
2. **Paragraph** `p`: `margin-top: 2.1vh`, `font-size: clamp(12px, 0.92vw, 16px)`, `line-height: 1.55`, weight **500**. Text with two hard line breaks: **Say hello to simplicity.** / **Introducing Stack-smart™** / **kitchenware.** — the ™ is a `<sup>` at `.6em` with `vertical-align: top`.
3. **Pots video** `video#pots`: attributes `muted loop playsinline autoplay crossorigin="anonymous"`; `src` set from JS to `POTS_CLIP`, then `.play()` called (swallow the rejection).
   - Absolute, `left: 50%`, `top: 52%`, `width: 118%` of the card, `aspect-ratio: 1`, `transform: translate(-50%, -50%)`, `object-fit: cover`, `pointer-events: none`. It is wider than the card, so it bleeds off both sides and is cropped by the card's overflow.
   - **Radial feather mask** (both `-webkit-mask` and `mask`): `radial-gradient(closest-side, #000 72%, transparent 99%)` — fully opaque inside 72 % of the closest-side radius, fading to transparent by 99 %. Combined with the sampled background colour, the video has no visible edge.
   - The video sits in normal stacking order (no z-index), painted above the pill/paragraph only where they overlap — in practice it sits in the middle of the card under the text block.
4. **Shop button** `a.shop`: absolute, `left: 1.4vw; right: 1.4vw; bottom: 2.4vh`, `height: 4.3vh`, `min-height: 32px`, `border-radius: 40px` (full pill), white background, `display: grid; place-items: center`, `font-size: clamp(11px, 0.84vw, 15px)`, weight **600**. Text: **Shop Stack-smart™** (literal ™ glyph). Hover: background `--navy` (#141a4a), text white; transition `background .3s, color .3s`.

---

## 7. Kitchen panel (`#kitchen`)

- `position: relative`, `width: 87vw`, `height: 89.3vh`, `margin: 1.19vw auto 0` (the same gutter as between the hero panels), `border-radius: 14px`, **`overflow: hidden`**.
- Background colour `#efe9de` fallback + `KITCHEN` image, `center / cover`, no-repeat.
- Contains `canvas.grill#gK` (grill copy #2) and the headline block.

### 7.1 Headline block `#ktext`

- Absolute; its `left`/`top` are **set by JS in pixels** to the cover-fitted image point (0.496, 0.125) (see §10), with initial CSS fallback `left: 50%; top: 13%`.
- `transform: translate(-50%, -50%)` (centred on that point), `text-align: center`, colour **#1b1b1b**, `z-index: 4`, `white-space: nowrap`.
- **h2**: text **Cooks for your family. Fits your space.** — `font-size: var(--kh, 22px)`, weight **600**, `letter-spacing: -0.01em`, `line-height: 1.2`.
- **p**: text with one hard line break **A stack-smart kitchenware system designed** / **to save up to 50% more cupboard space.** — `margin-top: .45em`, `font-size: var(--kp, 15px)`, `line-height: 1.38`, weight **450** (requested even though only 400/500/600 load; the browser will synthesise/round it).
- `--kh` and `--kp` are set by JS on `#kitchen` to **2.85 %** and **2.05 %** of the **displayed image height** (KITCHEN intrinsic height 1520 × cover scale), formatted to 1 decimal place + "px". This keeps the type locked to the photo's scale at every viewport.

### 7.2 Landing fade

- Both children (`h2` and `p`) start at `opacity: 0; transform: translateY(14px)`, with `transition: opacity .7s var(--ease), transform .7s var(--ease)`. The `p` has `transition-delay: .12s`.
- When `<body>` has class `landed`, both go to `opacity: 1; transform: none`. Removing the class reverses the fade (it is toggled continuously; see §11).

### 7.3 Footer spacer

`div#foot` with `height: 9.3vh` after the kitchen panel — this is what allows the page to scroll far enough for the kitchen panel's top to reach 9.3vh from the viewport top (directly under the nav).

---

## 8. The grill technique (green-screen clip → keyed frame cache → scroll scrub)

The grill is **not** a playing video. It is a set of pre-keyed frames scrubbed by scroll.

### 8.1 Two canvases

- Both canvases have class `.grill`: `position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none; will-change: transform`.
- `#gS` lives inside `#sky`; `#gK` lives inside `#kitchen`. Both always show the same frame at the same document-space position, size and rotation (§12 explains why).

### 8.2 Frame caching

- Constants: **NF = 48** frames, **FS = 560** px square cache canvases.
- Create an offscreen `<video>`: `crossOrigin = "anonymous"`, `muted = true`, `playsInline = true`, `preload = "auto"`, `src = GRILL_CLIP`. Wait for `loadeddata` (reject on `error`; the whole cache routine's failure is silently caught).
- Let `dur = video.duration − 0.05` (avoid seeking past the last decodable frame).
- For i = 0 … 47 sequentially: set `currentTime = dur · i / 47`, await the `seeked` event, then create a 560 × 560 canvas (2D context with `willReadFrequently: true`), draw the video scaled into the full 560 × 560, apply the chroma key (§8.3) in place, and push the canvas into the frames array.
- As soon as frame 0 is cached, set a `ready` flag and force a redraw, so the grill appears immediately while the remaining frames continue to cache.

### 8.3 Chroma key (per pixel, on the 560 × 560 canvas)

For each pixel with channels r, g, b:

1. m = max(r, b)
2. k = g − m (how much "greener than anything else" the pixel is)
3. If **k > 18**:
   - alpha = max(0, 1 − (k − 18) / 52) → written as alpha·255 (integer-truncated). So k = 18 is fully opaque, k ≥ 70 is fully transparent, linear in between (threshold **18**, soft range **52**).
   - **Despill**: g = min(g, m + 6) — clamps green to at most 6 above the larger of red/blue, removing the green fringe on edges.
4. Otherwise leave the pixel untouched (alpha stays 255).

Write the image data back with `putImageData`.

### 8.4 Drawing a frame

- Frame index f (see §11.4) is computed each animation frame; only when f changes (or on a forced redraw) do both canvases get cleared and redrawn: `clearRect` the full backing store, then `drawImage(frames[f], 0, 0, canvasWidth, canvasHeight)` (scale the 560 cache to the canvas backing size). If f exceeds the number of frames cached so far, use the last cached one.
- Before `ready`, f = 0 and nothing is drawn (empty canvas).

### 8.5 Canvas sizing

- m = ceil( max(c0, c1) · 1.05 ) CSS px, where c0 and c1 are the start and end grill sizes (§9, §10). Both canvases: CSS width/height = m px; backing store = m · dpr square, with **dpr = min(devicePixelRatio, 2)**.
- The visible size is then controlled purely by a CSS `scale(size / m)` in the transform (§11.5), so the canvas never needs to be resized during scroll.

---

## 9. Geometry: sky panel start state and balloons

All geometry is computed in **document coordinates** (bounding client rect + `scrollY`) in a `measure()` function, run on load, after `document.fonts.ready`, and on every `resize`.

- S = sky panel rect: S.x = left, S.y = top + scrollY, S.w, S.h.
- K = kitchen panel rect, same way.

**Grill start (hanging in the sky):**
- Centre x0 = S.x + **0.81 · S.w**; centre y0 = S.y + **0.525 · S.h** (81 % across, 52.5 % down the sky panel — right of centre, in the lower half, clear of the tagline).
- Frame size c0 = **0.425 · S.h** (the square frame is 42.5 % of the panel height).

**Balloons (strings meet the grill handle):**
- Width bw = **0.30 · S.w**; height bh = bw · 2048 / 1360.
- Handle point in the panel's local coordinates: x = 0.81 · S.w, y = 0.525 · S.h − c0/2 + **0.075 · c0** (top of the frame plus 7.5 % of the frame).
- Balloon element `left` = 0.81 · S.w − bw · **0.494**; `top` = (0.525 · S.h − c0/2 + c0 · 0.075) − bh · **0.946**. That places the image's string-meeting point (49.4 %, 94.6 %) exactly on the handle.

---

## 10. Geometry: kitchen cover-fit mapping and landing target

The kitchen photo is `background-size: cover` and centred, so image-relative coordinates must be mapped through the fit:

- Intrinsic KI = 2688 × 1520.
- sc = max(K.w / 2688, K.h / 1520) (cover scale).
- ox = (K.w − 2688 · sc) / 2; oy = (K.h − 1520 · sc) / 2 (negative overflow offsets, centred).
- Image point (nx, ny) in 0…1 → document px: ( K.x + ox + nx · 2688 · sc , K.y + oy + ny · 1520 · sc ).
- Displayed image height H = 1520 · sc.

**Landing gap** (empty spot on the counter) = image point **(0.489, 0.641)** → (gx, gy).

**End size**: c1 = H · **0.2 / 0.83** — the grill body (≈ 83 % of its square frame) ends up 20 % of the displayed image height, matching the scale of the neighbouring air fryer.

**End centre**: x1 = gx; y1 = gy − c1 · **0.91** + c1 / 2 — i.e. the frame is positioned so that the point at **91 % down the frame** (the bottom of the grill body / its feet) rests exactly on the gap point on the counter.

**Headline**: image point **(0.496, 0.125)** → set `#ktext` left/top to that point minus K.x / K.y (panel-local px). Set `--kh` = H · 0.0285 px and `--kp` = H · 0.0205 px on `#kitchen` (1 decimal).

**Scroll end** (progress = 1): end = max(200, K.y − 0.093 · innerHeight) — the scroll position at which the kitchen panel's top sits 9.3 % of the viewport height from the top, directly under the nav, mirroring the hero panel's offset.

After measuring, resize both canvases (§8.5) and force a redraw.

---

## 11. Scroll choreography (runs every requestAnimationFrame)

### 11.1 Progress and smoothing

- Every frame: target = scrollY / end. Smoothed progress sp += (target − sp) · **0.18**. If |target − sp| < 0.0005, snap sp = target.
- p = clamp(sp, 0, 1) (clamp = min/max to [0, 1]).
- The loop starts after `document.fonts.ready` resolves (measure first, then begin rAF). Also call measure once immediately at script end.

### 11.2 Fall parameter and curves

- q = clamp( (p − 0.02) / 0.9 ) — nothing moves for the first 2 % of progress; the fall completes at p = 0.92.
- **Vertical** uses gravity-like acceleration: fall = q^**1.75**.
- **Horizontal drift** and **size** use smoothstep: s(q) = q² · (3 − 2q).

### 11.3 Idle motion (while hanging)

Let t = performance.now() / 1000 (seconds), idle = 1 − clamp(p · 12) — full at p = 0, faded to 0 by p = 1/12.
- **Bob** = idle · sin(1.9 · t) · **6 px** (±6 px vertical, 1.9 rad/s).
- **Sway** = idle · sin(1.3 · t) · **1.4°** (±1.4°, 1.3 rad/s).

### 11.4 Grill position, size, tilt, frame

- x = x0 + (x1 − x0) · s(q)
- y = y0 + (y1 − y0) · q^1.75 + bob
- size = c0 + (c1 − c0) · s(q)
- tilt (degrees) = sin(q · π) · **−9** + sway — tilts up to 9° counter-clockwise mid-fall and returns to level on landing.
- Frame index f = round( clamp( (q − 0.12) / 0.72 ) · 47 ), also clamped to [0, cachedFrames − 1]; 0 when not ready. The grill stays closed for the first 12 % of the fall, opens into its V around the middle, and is fully closed again by q = 0.84 — it lands closed.

### 11.5 Applying to the two canvases

With scl = size / m:
- `#gS` transform: translate( x − S.x − m/2 px, y − S.y − m/2 px ) rotate( tilt deg ) scale( scl )
- `#gK` transform: translate( x − K.x − m/2 px, y − K.y − m/2 px ) rotate( tilt deg ) scale( scl )
- Order matters: translate first, then rotate, then scale; transform-origin is the default centre of the canvas, so rotation and scaling happen around the grill's centre.

### 11.6 Balloons release

- r = clamp( p · 1.25 ) (the balloons finish leaving by p = 0.8).
- Balloon transform: translate( r · −0.06 · S.w px, bob − r · 1.25 · S.h px ) rotate( sway · 1.6 − r · 6 deg ).
- So they bob in sync with the grill while idle (same bob, sway amplified ×1.6), and on scroll they rise by 1.25 panel heights (well out of the top of the sky panel, clipped by its rounded overflow), drift left by 6 % of the panel width, and rotate to −6°, pivoting on the string knot.
- Note there is no tether: the balloons rise and the grill falls simultaneously — the release reads as "let go".

### 11.7 Landed state

Toggle class `landed` on `<body>` whenever **p > 0.9** (on every frame — scrolling back up removes it and the headline fades out).

### 11.8 Debug hook (optional, but included in the original)

Expose `window.__olla` with getter `p` (current smoothed progress), getter `ready` (number of cached frames) and the `measure` function.

---

## 12. Layering — why two canvases (the key illusion)

- The sky panel and the kitchen panel are **separate rounded boxes with `overflow: hidden`**, separated by a **1.19vw strip of page beige** (#e9e7df).
- The grill is drawn **twice**: once in a canvas inside the sky panel, once in a canvas inside the kitchen panel. Both are positioned from the **same document-space centre (x, y)** by subtracting each panel's own document origin. Same frame, same size, same rotation.
- Each panel clips its own copy to its own rounded window. So while the grill crosses the boundary, its upper part is visible inside the sky panel, its lower part inside the kitchen panel, and **the slice that overlaps the beige gutter is invisible** — the grill appears to pass *behind* the page, as if the panels were windows onto one continuous space. The rounded corners clip it too.
- Do NOT use a single fixed/overlay canvas — that would paint over the beige gutter and break the illusion.
- In the sky panel the giant "olla" word (z 3) and tagline (z 3) are above the grill (z 2), and the grill (later in DOM, same z 2) is above the balloons. In the kitchen panel the headline (z 4) is above the grill.

---

## 13. Responsive / phone layout (max-width: 760px)

- `--w` becomes `calc(100vw − 32px)` (16 px side gutters); `--gap` becomes **12px**.
- Hide `#links` and `#drop` entirely (`display: none`). Nav horizontal padding becomes **18px** (logo left, search icon right).
- `#hero`: `flex-direction: column`, `height: auto`, `padding-top: 76px`.
- `#sky`: `flex: none`, `height: 72vh`; `.word` font size **34vw**.
- `#card`: `flex: none`, `height: 78vh`, padding **18px**; the shop button `left: 18px; right: 18px`.
- `#kitchen`: `height: 70vh`.
- `#ktext`: `white-space: normal`, `width: 86%`.
- The JS geometry is unchanged — because everything is measured from live bounding rects in document space, the grill automatically falls from the sky panel, past the card (which is now stacked between sky and kitchen — the grill simply passes behind it since neither panel copy paints over the card), and lands in the kitchen gap. The scroll end formula is the same.

---

## 14. Copy deck (all text, verbatim)

| Location | Text |
|---|---|
| `<title>` | olla — Stack-smart kitchenware |
| Nav logo | olla |
| Nav links | Shop · olla · olla PRO · Simply Good · Recipes · Journal |
| Search button aria-label | Search |
| Drop items | Shop All · Stack-smart™ · EverCoat™ · Family Sized · Pro Performance |
| Sky tagline | Stack-smart<sup>™</sup> ⏎ kitchenware |
| Sky giant word | olla |
| Card pill | NEW |
| Card paragraph | Say hello to simplicity. ⏎ Introducing Stack-smart<sup>™</sup> ⏎ kitchenware. |
| Card button | Shop Stack-smart™ |
| Kitchen h2 | Cooks for your family. Fits your space. |
| Kitchen p | A stack-smart kitchenware system designed ⏎ to save up to 50% more cupboard space. |

(⏎ = `<br>`.)

---

## 15. Timeline walkthrough (what the user should experience)

1. **Load (scroll 0)**: Nav, sky panel, yellow card. Pots clip loops in the card with no visible edges (card colour sampled from the clip). Grill appears (as soon as frame 0 is keyed) hanging at 81 %/52.5 % of the sky panel, 42.5 % of the panel height, closed, gently bobbing ±6 px and swaying ±1.4°, with the balloon bunch above it, strings tied to the handle, bobbing with it.
2. **First few percent of scroll**: idle bob/sway fade out by p ≈ 0.083. Balloons start rising and drifting left, rotating toward −6°; they leave the top of the sky panel by p = 0.8.
3. **p 0.02 → 0.92**: the grill falls — slow at first, accelerating (q^1.75) — drifts horizontally toward the counter gap and shrinks (smoothstep), tilting up to −9° at mid-fall. From q 0.12 it opens into a V, then folds shut by q 0.84. It slides behind the giant "olla" word, exits the bottom of the sky panel, is hidden while crossing the beige gutter (and behind nothing else), re-emerges from the top edge of the kitchen panel and settles, level and closed, with its feet on the counter gap at image point (0.489, 0.641).
4. **p > 0.9**: headline "Cooks for your family. Fits your space." fades up 14 px over 0.7 s, the paragraph follows 0.12 s later. Kitchen panel top is now just under the nav.
5. **Scrolling back up** reverses everything exactly (all state is a pure function of smoothed scroll progress plus time for the idle motion).

---

## 16. Implementation notes and pitfalls

- Everything must be computed from live layout; never hard-code pixel positions. Re-run measure on resize.
- Use one rAF loop for everything; do not use scroll event listeners for animation (the loop reads scrollY directly).
- The grill canvases are never resized during scroll — only transformed. Redraw canvas pixels only when the frame index changes.
- Draw the cached 560 px frames with the default image smoothing.
- Do not add any opacity fades, blurs or crossfades to the grill, balloons or videos. The only opacity transitions on the page are the menu items and the landed headline.
- The card video must stay a real `<video>` element (not canvas), muted, looping, inline.
- Don't add shadows to any panel, nav or pill. Flat design: white, beige, navy, yellow.
- Panels' corner radius is **14px**; nav and drop strip **10px**; pill and button fully rounded (30px / 40px).
- If the grill clip fails to load (CORS/network), the page must still work: nothing is drawn for the grill and the rest animates normally.

---

## 17. Acceptance checklist

- [ ] Single HTML file; Jost 400/500/600 from Google Fonts; title "olla — Stack-smart kitchenware".
- [ ] Page background #e9e7df; ink #16193a; navy #141a4a; card fallback #f7d23a; easing cubic-bezier(.2,.8,.2,1) everywhere an ease is used.
- [ ] All five asset URLs present verbatim (SKY, BALLOONS, KITCHEN via images.higgs.ai; GRILL_CLIP, POTS_CLIP via cloudfront), none substituted or re-hosted.
- [ ] Nav: fixed, 87vw, 5vh (min 40px) tall at top 1.9vh, white, radius 10px, 3.9vw side padding; logo "olla" clamp(17px,1.35vw,24px)/600/−0.03em; links centred with translateX(−52%), gap 2.4vw, clamp(12px,.95vw,16px)/500; left-to-right underline on hover (1.5px, bottom −3px, .35s); 18px search glyph at right.
- [ ] Shop hover/click opens the drop strip: 0.9vh below nav, 9.5vh (min 70px), clip-path wipe down .45s, items fade/slide from −6px with 0/40/80/120/160 ms stagger; chevron rotates 180°, Shop dims to .55; 160 ms close delay bridges the gap; five line icons (storefront, stacked cubes, leaf, family, bolt-in-circle) stroke 1.3, hover #3a49c9.
- [ ] Hero row: 87vw, padding-top 9.3vh, 100vh tall, gap 1.19vw; sky panel 71.1% × 89.3vh, radius 14, overflow hidden; card fills the rest, 89.3vh, radius 14.
- [ ] Sky tagline at 6.45%/8.8%, clamp(20px,2.05vw,36px)/500/1.08/−0.01em with small top-aligned ™; giant "olla" at left 6.1% bottom 5.4%, 27vh/500, line-height .74, −0.035em, above the grill.
- [ ] Card: NEW pill (3vh, min 22px, 1.25vw padding, radius 30), paragraph 2.1vh below at clamp(12px,.92vw,16px)/1.55/500, pots video at 50%/52%, 118% wide square, object-fit cover, radial mask closest-side #000 72% → transparent 99%; card background equals the average of the clip's top-left 12% region; "Shop Stack-smart™" pill button at bottom 2.4vh, 4.3vh tall (min 32px), hover navy/white.
- [ ] Kitchen panel: 87vw × 89.3vh, 1.19vw below hero, radius 14, overflow hidden, cover-fitted photo; 9.3vh spacer after it.
- [ ] Headline centred on cover-mapped image point (0.496, 0.125); h2 size = 2.85% and p size = 2.05% of displayed image height; hidden until p > 0.9, then .7s fade/rise with .12s stagger; reverses on scroll up.
- [ ] Grill clip cached as 48 seeked frames into 560px canvases; chroma key k = g − max(r,b), threshold 18, soft range 52, despill g → min(g, max(r,b)+6); grill appears as soon as frame 0 is ready.
- [ ] Grill hangs at 81%/52.5% of sky panel, frame = 42.5% of panel height, bobbing ±6px @1.9 rad/s and swaying ±1.4° @1.3 rad/s, fading out over the first 1/12 of progress.
- [ ] Balloons 30% of sky width, aspect 1360:2048, transform-origin 49.4% 94.6%, strings meet the handle at 7.5% of the grill frame; release: up 1.25 × panel height, left 6% width, rotate −6°, complete at p = 0.8.
- [ ] Progress = scrollY / max(200, kitchenTopDoc − 0.093·innerHeight), smoothed by 0.18/frame with 0.0005 snap; q = clamp((p − 0.02)/0.9); vertical q^1.75; drift and size smoothstep; tilt sin(qπ)·−9° + sway; frame = round(clamp((q − 0.12)/0.72)·47).
- [ ] Landing: centre x at gap x, frame bottom (91% of frame) on the counter gap at image point (0.489, 0.641); size = displayed image height × 0.2 / 0.83; lands closed and level.
- [ ] Two grill canvases (one per panel) driven by the same document coordinates; the grill visibly disappears in the beige gutter between sky and kitchen and is clipped by the rounded corners — never drawn on top of the gutter.
- [ ] Canvases sized ceil(max(c0,c1)·1.05) CSS px at dpr ≤ 2, animated only via transform translate→rotate→scale(size/m).
- [ ] Phone (≤760px): width 100vw − 32px, gap 12px, no links/drop, nav padding 18px, stacked hero (padding-top 76px), sky 72vh with 34vw word, card 78vh with 18px padding, kitchen 70vh, headline wraps at 86% width; the fall still lands in the gap.
- [ ] No opacity crossfades on grill/balloons/videos, no shadows, no external JS libraries; page works (minus the grill) if the clip fails.