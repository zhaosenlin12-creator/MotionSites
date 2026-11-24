# Prompt: "Marika Lindfors" WebGL ribbon hero

Recreate this page exactly as described: a single, full-screen, black portfolio hero. Eight rounded project cards, each playing a looping preview video, form one continuous ribbon. The ribbon snakes in depth across a WebGL stage above a receding perspective grid floor. A virtual scroll (wheel, touch, keys) slides the cards through the curve, and scroll speed deepens and twists it. Phones get a looping vertical stack instead. Everything below is required; nothing is decorative guesswork.

Build it as one self-contained `index.html` (inline CSS and JS, ES modules). Use three.js 0.160.0 for WebGL. Write custom GLSL `ShaderMaterial`s for the cards and the floor, not built-in materials.

---

## 1. Libraries, font and assets

### three.js
- Load three.js through an import map: `three` → `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`. Import it as a namespace.

### Font: Inter Tight (variable, weights 100–900)
- Google Fonts CSS: `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap`
- Latin woff2 file (one variable file covers 400 and 500): `https://fonts.gstatic.com/s/intertight/v9/NGSwv5HMAFg6IuGlBNMjxLsH8ag.woff2`
- Declare it with `@font-face`: family "Inter Tight", `font-weight: 100 900`, `font-display: swap`. In the shipped standalone file the woff2 is embedded as a base64 `data:font/woff2` URL, so the page needs no font request.
- Fallbacks: the body uses `"Inter Tight", system-ui, sans-serif`. Canvas captions use `"Inter Tight", sans-serif`.
- Before drawing any caption, wait for `document.fonts.load('400 18px "Inter Tight"')`.

### Card media
There are eight motionsites.ai design previews. Each card has two pieces of media:
- **Poster:** a still preview image, shown immediately.
- **Video:** the design's own preview MP4, swapped in on its first decoded frame.

Every URL below sends `Access-Control-Allow-Origin: *`. Load every image and video with `crossOrigin = "anonymous"` so WebGL can sample it.

Poster URL pattern (an images.higgs.ai WebP of the design's preview PNG, 1280 px wide, quality 85):
`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F<ID>.png&w=1280&q=85`

Video URL pattern: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/<PATH>.mp4`

Keep the card order exactly as listed (it is the ribbon order). The aspect ratio (width ÷ height) is the card's own shape; the media is cover-cropped into it.

| # | Caption | Video `<PATH>` | Poster `<ID>` | Card aspect |
|---|---|---|---|---|
| 1 | Living Portrait | `aaaf/living-portrait-hero` | `hf_20261031_044539_b7fde132-8c25-4dda-ab05-4e4be99bf3d3` | 1.745 |
| 2 | Moss Island | `aaaf/mossline-hero` | `hf_20261106_032528_99eb9a00-a553-40b6-8b97-017e918971c6` | 1.700 |
| 3 | Flower Valley | `aaaf/fernhollow` | `hf_20261103_061637_11907771-15ce-494b-81a4-9051861d6ce5` | 1.735 |
| 4 | Runway Lookbook | `aaaf/vell-lookbook` | `hf_20261102_044911_1ad79156-a8dc-475a-8891-8408a9b61320` | 1.837 |
| 5 | Shelf Hero | `aaaf/vasari-vhs-hero` | `hf_20261029_012401_8f947ed0-7b82-47d6-bdcd-b1ce1af0bf5f` | 1.526 |
| 6 | Solar Fog | `aaaf/lumen-roof-hero` | `hf_20261102_041507_8e9c2d22-8be2-4652-8bbe-1f4556ea463a` | 1.658 |
| 7 | Honey Bee | `designs/honey-bee-melli-landing` | `hf_20261017_154537_1384fa6d-282d-46e2-8748-a70be1cf681a` | 1.330 |
| 8 | Spider Web | `aaaf/found-spider` | `hf_20261104_020746_7eebb7cf-e21b-4288-8211-0cb9d0728f48` | 1.610 |

The full video URLs:
1. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4`
2. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/mossline-hero.mp4`
3. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/fernhollow.mp4`
4. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vell-lookbook.mp4`
5. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vasari-vhs-hero.mp4`
6. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/lumen-roof-hero.mp4`
7. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/honey-bee-melli-landing.mp4`
8. `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/found-spider.mp4`

Video facts:
- H.264, 1600×900 (Shelf Hero is 1440×960, Honey Bee 1920×1414).
- 6.5–7 s loops, about 24 MB in total.
- Posters are 1280 px wide; most are 1280×714, Shelf Hero 1280×859, Honey Bee 1280×956.

Do not download, re-encode or re-host any of these. Use the URLs above as given.

---

## 2. Page shell (HTML and CSS)

### Document
- `<title>`: **Marika Lindfors**. `lang="en"`, `meta viewport width=device-width, initial-scale=1`.

### Global
- `* { box-sizing: border-box; margin: 0; padding: 0 }`
- `html, body`:
  - `background: #000`, `color: #fff`, `height: 100%`, `overflow: hidden`
  - `overscroll-behavior: none`, `touch-action: none`, `-webkit-tap-highlight-color: transparent`
  - There is no native scroll at all.
- `body`: font as above, `-webkit-font-smoothing: antialiased`.
- `canvas#gl`: `position: fixed; inset: 0; width: 100%; height: 100%; display: block`, `aria-hidden="true"`.

### Design unit `--u`
- Desktop: `--u = 100vw / 1500`, so 1u = 0.96 px at 1440 wide.
- Phone (`max-width: 649px`): `--u = 100vw / 390`, so 1u = 0.9615 px at 375 wide.
- The JS uses the same unit: `U = vw / 1500`, or `vw / 390` on phones.

### Corner navigation
A `<nav class="ui" aria-label="Site">` holds four fixed elements. Each one:
- `position: fixed; z-index: 5`, colour `#fff`
- Font: `500 max(9px, 10u) / 1.4 "Inter Tight"`, `text-transform: uppercase`, `letter-spacing: 0`
- No background, border or underline
- Starts at `opacity: 0` with `transition: opacity .6s ease .2s`; becomes `opacity: 1` once `body.ready` is set

| Element | Text (as written; CSS uppercases it) | Desktop position | Phone position |
|---|---|---|---|
| `<a class="tl" href="#">` | Marika Lindfors | left 80u, top 40u | left 40u, top 25u |
| `<button class="tr">` | Profile | right 80u, top 40u | right 40u, top 25u |
| `<a class="bl" href="#">` | `Featured <span>/</span> <span>Full</span>` | left 80u, bottom 40u | left 40u, bottom 25u |
| `<button class="br">` | Newsletter | right 80u, bottom 40u | right 40u, bottom 25u |

- Both spans in the bottom-left link ("/" and "Full") are at `opacity: .5`.
- At 1440×900 the labels render at 9.6 px: left text at x = 76.8 px, top labels at y = 38.4 px.

### Loader (three dashes)
- Fixed, centred with `translate(-50%, -50%)`, `display: flex; gap: 6px; z-index: 4`.
- Three `<i>` bars, 2 px tall, white, widths **44 px, 44 px, 38 px**.
- Each runs the keyframe `dash` (opacity 0.25 → 1 at 50% → 0.25) over **1 s ease-in-out infinite**. Delays are 0, 0.12 s and 0.24 s.
- On `body.ready` it fades out over 0.4 s and gets `pointer-events: none`.

### Phone veil (phones only)
- `.veil`: fixed, `inset: 0; z-index: 3; pointer-events: none`.
- Two stacked gradients: one `to bottom`, one `to top`. Both use the same stops: `#000` at 0%, rgba(0,0,0,.77) at 5%, .42 at 10%, .14 at 15%, .02 at 20%, transparent at 26%.
- It fades cards to black under the top and bottom labels.
- `display: none` on desktop, `block` at ≤649 px.

### Screen-reader list
- `<main class="sr" id="list" aria-label="Featured work">`, visually hidden (1×1 px, clipped).
- One `<article><h2>{caption}</h2></article>` per card, in order.

---

## 3. Renderer, camera and world mapping

### Renderer
- `WebGLRenderer({ antialias: true, alpha: false })`, clear colour `#000`, output colour space sRGB.
- Pixel ratio `min(devicePixelRatio, 2)`. Size = `clientWidth × innerHeight`.

### Camera
- `PerspectiveCamera(fov 53.4°, aspect vw/vh, near 0.1, far 2000)` at **(0, 0, 41.18)**, looking down −z.
- These are the reference site's live camera values.

### World units
- `H = tan(fov/2) · 41.18` (≈ 20.71) is the half-height of the z = 0 plane.
- `W = H · aspect` is its half-width.
- `k = 2H / vh` converts CSS px to world units on z = 0.
- A card laid out at CSS rect (x, y, w, h) becomes a plane at:
  - world x = `(x + w/2 − vw/2) · k`
  - world y = `−(y + h/2 − vh/2) · k`
  - scale `(w·k, h·k)`

### Cards
- Each card is a `PlaneGeometry(1, 1, 96, 24)` scaled to size.
- Render settings: `transparent`, `depthTest: false`, `depthWrite: false`, `frustumCulled: false`, renderOrder 0.
- Enable derivatives (fwidth).

---

## 4. Layout

### Desktop (viewport wider than 649 px)
- **Card height** `cardH = min(0.435 · innerHeight, 550u)`. That is 391.5 px at 900 tall.
- **Card width** = `cardH × aspect`.
- **Row:** cards sit in one horizontal row, in table order, with a **10u gap**, vertically centred.
- **Corner radius:** 20u.
- **Loop:** loop length L = Σ(width + gap). Each card's base x is the running sum.
- **Placement each frame:**
  - x = base − current
  - wrap into `[left, left + L)`, where `left = −(L − vw)/2`
  - The row is endless; the wrap seam is always off-screen.
- **Start:** current = target = **100** px, so the first frame matches the reference.
  - Card 1 is cut at the left; card 2 (Moss Island) starts at about 40% across and faces the camera.
  - Card 3 (Flower Valley) recedes on the right.
  - At 1440×900, card edges land at about x = 558, 569, 1180 and 1192 px.

### Phone (viewport 649 px or narrower)
- **Card width** = vw − 40u (20u margin each side). **Height** = width ÷ aspect.
- **Stack:** cards stack vertically with a **20u gap**, centred horizontally.
- **Corner radius:** 15u.
- **Loop:** L = Σ(height + gap). Cards wrap within `[top, top + L)`, where `top = −(L − vh)/2`.
- **Start:** current = target = `−0.177 · vh`, so card 1's top sits about 18% down the screen. Card 8 (Spider Web) peeks in above it under the veil.
- **Mode switch:** when the layout crosses 649 px, reset current and target to that mode's start and clear any pending scroll.
- **Resize:** run layout again 100 ms after the last resize. This recomputes sizes, the unit, the camera aspect, the reflection target (half resolution) and every overlay.

---

## 5. Card surface: overlay and media

### Overlay
Each card has a transparent canvas, the overlay, drawn at scale `s = 2 · min(dpr, 2) / 1.5`. The canvas is card width·s × card height·s.

**Caption** (the card's title):
- Font `400` Inter Tight, **18u** on desktop and **16u** on phone.
- Letter-spacing −0.05em, white, alphabetic baseline.
- Inset **20u** from the left on desktop, **10u** on phone.
- Baseline at `canvas height − 10u − 0.22 · font size`.
- Drop shadow `rgba(0,0,0,.5)` with 12u blur, so it stays legible over bright frames.

**Pill button:**
- Black circle, radius 12.5u (25u diameter).
- Inset 20u (desktop) or 10u (phone) from the right, and 10u from the bottom.
- White icon stroke, 1.4u wide, round caps and joins, arm length a = 4.5u:
  - **Desktop: "+"**, a horizontal and a vertical stroke, each ±a through the centre.
  - **Phone: "→"**, a horizontal stroke ±a, plus an arrowhead from (+0.2a, −0.8a) to (+a, 0) to (+0.2a, +0.8a).

**Texture:** use the overlay as a `CanvasTexture` with sRGB colour, maximum anisotropy and trilinear mipmaps. WebGL2 texture storage cannot change size, so when the canvas size changes (resize or mode switch), dispose of the texture and create a new one.

### Media
- First a `Texture` of the poster image (sRGB, max anisotropy).
- Unless reduced motion is on, create a `<video>` per card:
  - `crossOrigin = anonymous`, `muted` and `defaultMuted`, `loop`, `playsInline` (also set the `playsinline` and `muted` attributes), `preload = auto`, `src` = the card's video URL.
- On the first presented frame, swap the poster for a `VideoTexture` (sRGB). Use `requestVideoFrameCallback` where available, otherwise the `playing` event.

### Cover crop
The crop is done in the shader with `u_crop = (offsetX, offsetY, scaleX, scaleY)`:
- ma = media width ÷ media height; a = the card's aspect
- If a > ma: scaleY = ma / a, scaleX = 1. Otherwise scaleX = a / ma, scaleY = 1.
- offset = (1 − scale) / 2, so the crop is centred.
- Media UV = offset + vUv · scale.

### Playback management (every frame)
- A card's video plays only while that card is on or near the screen; otherwise it pauses.
  - Desktop: its row x satisfies `x + w > −0.5·vw` and `x < 1.5·vw`.
  - Phone: `y + h > −0.5·vh` and `y < 1.5·vh`.
- Nothing plays while `document.hidden`. All videos pause when the tab is hidden.
- `play()` rejections are ignored.

---

## 6. Card shader: the ribbon (exact math)

Uniforms per card:

| Uniform | Desktop | Phone |
|---|---|---|
| u_sheetW | W | H |
| u_sheetD | per frame | per frame |
| u_sheetT | 1.15 (SPAN) | 1 |
| u_sheetC | 1 (S-curve) | 0 (bowl) |
| u_sheetP | 1 | 1 |
| u_sheetV | per frame | 0 |
| u_leanA | W · (−0.12) | 0 |
| u_leanW | W | 0 |
| u_diag | 0.03 | 0 |
| u_axis | 0 | 1 |
| u_dent | 0.035 | 0.035 |
| u_shade | 1 | 0 |
| u_shadeS | 1 | 0.6 |
| u_corner | 20u ÷ card height | 15u ÷ card height |

`u_hover` is per card, per frame. `u_res` is the card size in world units.

Constants: PI = 3.141592653589793, BANK = −0.16, REAR_Y = 0.1, REAR_Z = 0.2, VTWIST = 1.8, TAIL = 1.0, SHIFT = −0.2.

### Shape functions (wx = world x)
- **q(wx)** = wx / W · T + SHIFT
- **shape(q)** = mix(1 − q², sin(πq), C) · e^(−TAIL·q²)
  - C = 1 gives a Gaussian-damped sine, the S-curve.
  - C = 0 gives a damped bowl.
- **shapeSlope(q)** = mix(bowl′, ess′, C) · e^(−q²), where
  - bowl′ = −2q(1 + TAIL(1 − q²))
  - ess′ = π·cos(πq) − 2·TAIL·q·sin(πq)
- **z(wx)** = −D · shape(q(wx)): the ribbon recedes where the shape is positive and comes forward where it is negative.
- **roll(wx)** = BANK · shapeSlope(q) / π · C: the resting bank that follows the S.

### Vertex stage
1. **Hover dent.** If hovered, push the vertex back in z by `hover · dent · resY · dome(uv)`, where dome(uv) = (1 − qx²)(1 − qy²) with q = 2·uv − 1.
2. **To world space.** Transform with the model matrix.
3. **Phone axis swap.** If u_axis = 1, swap world x and y, so the same ribbon runs down y. Swap back after step 7.
4. **Wind.** Rotate (y, z) about the x axis by angle a = roll(x). If V > 0, add the velocity wring: `VTWIST · V · smoothstep(0.3, 0.9, |x/W|) · sign(x/W)`. It does nothing at the centre and twists the two edges in opposite directions.
5. **Bend.** z += z(x).
6. **Diagonal and rear lift.**
   - y += diag · x (the ribbon climbs slightly to the right).
   - If V > 0, with m = 1 − smoothstep(−1, 0.3, x/W): y += REAR_Y · W · V · m and z += REAR_Z · W · V · m. The left/rear part lifts and comes forward while moving.
7. **Lean ("door").** z += leanA · ramp(x / leanW), where ramp(s) = s·(1.5 − 0.5s²) with s clamped to [−1, 1]. With leanA negative, the right side swings away and the left side swings toward the camera.

### Fragment stage
1. Sample the media at the crop UV. Composite the overlay over it: rgb = mix(media, overlay.rgb, overlay.a).
2. **Depth darkening** (desktop): depth = clamp((D − z(wx)) / 2D, 0, 1), plus the hover dome term, clamped. Then rgb = mix(rgb, vec3(0.059), shade · 0.8 · depth^shadeS). Receding parts darken heavily (about 68% at the far crest) and near parts only lightly (about 12%).
3. **Lighting.** Light direction L = normalize(−0.4, 0.5, 1).
   - The normal comes from the analytic slopes: dz/dx = −D · shapeSlope(q) · T / W, plus (leanA/leanW) · leanSlope, plus the hover dome derivatives, then rotated by roll(wx). leanSlope(s) = 1.5 · (1 − min(|s|, 1)²).
   - Diffuse: rgb *= 1 − 0.12 · (1 − (n·L · 0.5 + 0.5)).
   - Specular sheen: Blinn-Phong with gloss 48 and strength 0.35, against the view vector to the displaced point.
4. **Rounded corners.** Signed-distance rounded box in card space (aspect × 1) with radius u_corner, anti-aliased with fwidth. Multiply the result into alpha.
5. **Fade-in.** alpha also multiplies u_alpha.

---

## 7. Floor (desktop only)

### Geometry and placement
- `PlaneGeometry(1, 1, 48, 24)` rotated −90° about x.
- Render settings: transparent, no depth test or write, double-sided, renderOrder −1.
- **Height:** y = a = −cardH·k/2 − 0.06H, just under the cards.
- **Run (depth behind the strip):** o = 6H.
- **Near edge:** near = min(41.18 · (1 − |a|/H) + 0.2H, 41.18 · 0.8).
- **Scale:** (W · 2 · 4, 1, near + o). **Position:** z = (near − o)/2.
- **Grid:** cell size = 0.22H; repeat count = (width / cell, o / cell).

### Vertex
- vFar = −worldZ / o, so 0 is at the strip, 1 at the far end and negative toward the camera.
- Apply the same lean as the cards (leanA = −0.12W, leanW = W, k = 1). The floor turns with the ribbon.

### Fragment
- fade = 1 − smoothstep(0.2, 0.95, vFar)
- The base colour is black: both tints are #000, mixed by smoothstep(0, 0.8, vFar).
- Contact shadow: multiply by 1 − 0.55 · e^(−14|vFar|).
- **Grid lines:** g = (uv.x · cellsX, vFar · cellsY). line = max over both axes of 1 − smoothstep(0, 1.5·fwidth(g), |fract(g) − 0.5|). col += line · 0.08 · fade. These are hairlines at 8% white.
- **Reflection** (on the lines only):
  - A mirrored camera, a clone of the main camera, sits at y = 2m − camY, where m = a − 0.07H.
  - Each frame, render the cards into a half-resolution render target with the floor hidden.
  - In the shader, project the floor point through that camera's view-projection. Spread it from a light at x = −0.6W: wp.x −= (x − lightX) · 0.35 · |vFar|.
  - Sample with a soft 10% edge falloff. Weight by e^(−6·vFar) behind the strip or e^(2.2·vFar) in front of it.
  - col += reflection · line · 0.5 · weight · edges · fade.
- Output alpha = u_alpha · fade, with u_alpha fading in to 0.9.

The floor is hidden on phones, and the reflection pass is skipped there.

---

## 8. Virtual scroll, velocity and inertia (the reference's input model)

### State
- `target` (where the strip should go) and `current` (where it is), in CSS px along the strip axis.

### Wheel (passive)
- Ignore events with ctrlKey.
- Delta: use the larger of deltaY and deltaX. Multiply by 16 for line mode, or by vh for page mode.
- **Big flick:** |delta| ≥ 40, at least 30 ms since the previous event, and no burst within 500 ms (a burst means events arriving less than 30 ms apart). A big flick adds delta · 1.25 · 2 to a `pending` pool.
- Any other event pushes delta · 1.25 immediately.
- Each frame, the pending pool eases in by `pending · (1 − (1 − 0.22)^(min(dt·60, 4)))`. Once it is under 0.05, flush the remainder.

### Touch (passive)
- touchmove pushes (previousY − currentY) · 3.25.
- touchend pushes the last move's delta · 35 (the fling).

### Keys
- ArrowDown and ArrowRight: +100. ArrowUp and ArrowLeft: −100.
- PageDown: +0.9·vh. PageUp: −0.9·vh. Space: ±0.9·vh (Shift reverses it).
- Ignore keys pressed with Meta, Ctrl or Alt, and call preventDefault on the ones handled.

### Push and lag clamp
- push(d) adds d to target.
- **Desktop only:** soft-clamp the lag to one viewport width: target = current + tanh((target − current)/vw) · vw.

### Each frame
- ratio = min(dt · 60, 2), with dt capped at 50 ms.
- current += (target − current) · 0.1 · ratio, rounded to 0.01 px.
- With reduced motion, current = target exactly.

### Velocity (drives the bend)
- t = tanh((target − current) / N), where N = 550 on desktop and 245 on phones.
- vel = t · |t| (signed square). r = min(1, |vel|), or 0 with reduced motion.
- **Desktop:**
  - D = W · 0.2 · (1 + 1.1·r): the S deepens by up to 2.1× while moving.
  - V = r: the edge wring and rear lift come in.
  - At rest D ≈ 6.63 world units at 16:10.
- **Phone:**
  - D = H · 0.18 · 1.1 · r. The stack is perfectly flat at rest and bows into the bowl shape only while it moves.
  - The ends come toward the viewer and look larger mid-swipe.
  - V = 0, there's no lean, and there's no depth shading.

---

## 9. Hover (desktop pointer)

- Track the pointer in normalised device coordinates. Leaving the document resets it off-screen.
- **Picking:** each frame, rebuild each card's deformed outline on the CPU with the same sheet and lean formulas. Use 5 columns × top and bottom edges, projected through the camera. The pointer must fall inside that outline's screen bounding box.
- The hovered card's `hover` value eases toward 1 at a rate of 1 − e^(−8·dt), and back to 0 at 1 − e^(−6·dt).
- The hovered card dents inward (the dome term), darkens in the middle and shifts its sheen.
- The cursor becomes a pointer over a card.
- Hover is off on phones and with reduced motion.

---

## 10. Loading and entrance

1. **Boot:** run layout, then start the frame loop at once (the floor and cards are at alpha 0).
2. **In parallel:** load the font and all 8 poster images.
3. **When they're ready:** for each card, set up its media (poster texture plus its video), paint its overlay, set loaded = true, and add `body.ready`.
   - The corner labels fade in (0.6 s, after 0.2 s).
   - The loader fades out (0.4 s).
4. **Fades:**
   - Each card's u_alpha rises linearly over **0.6 s** to 1, once its overlay exists.
   - The floor's u_alpha rises over **0.8 s** to 0.9.
5. **Failsafe:** add `body.ready` after **8 s** regardless, and if loading fails.
6. Each video replaces its poster on its first decoded frame, with no black flash.

---

## 11. Reduced motion

With `prefers-reduced-motion: reduce`:
- No videos are created; cards keep their still posters.
- No inertia: current snaps to target.
- r = 0, so no velocity bend, wring or rear lift. The resting S-curve stays.
- No hover dent.

---

## 12. Accessibility and miscellany

- The canvas, veil and loader are `aria-hidden`. The project titles exist as the hidden list in §2.
- The corner nav is real links and buttons.
- Everything except the importmap, the three.js module and the media URLs is inline; there are no other network requests.
- Expected result:
  - **At 1440×900:** a black stage, an S-shaped ribbon of three visible playing cards over a faint grid floor that reflects them on its lines, and the four tiny uppercase corner labels.
  - **At 375×812:** a looping column of four cards with arrow pills, faded at the top and bottom under the labels.