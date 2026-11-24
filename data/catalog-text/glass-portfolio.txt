# Mirasol Studio — Hero + About: exact recreation brief

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts.

Build a single self-contained `index.html` (no build step) for a fictional design-engineer portfolio, **Mirasol Studio**, consisting of a full-screen **hero** and a full-screen **about** section. Behind both sections sits one fixed, full-viewport **WebGL canvas** (three.js) that renders a live, pointer-reactive, deep-teal "shattered streak" background, a glossy **refractive glass 3D word "hello"** with four small glass objects, a scroll-driven **4 px dot-dissolve** that turns the scene dark teal-black as you reach the about section, and a full-screen **pointer fluid** post-process that curves and stretches the whole frame as the mouse moves. All text is real HTML layered above the canvas. Everything below must be reproduced exactly.

---

## 1. Libraries, fonts and assets

### 1.1 Scripts (CDN, exact versions)
- **three.js 0.170.0** as an ES module through an import map:
  - `three` → `https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js`
  - `three/addons/` → `https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/` (only `utils/BufferGeometryUtils.js` → `mergeGeometries` is used)
- **Lenis 1.1.13** smooth scroll (UMD global): `https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js`

### 1.2 Fonts (latin subset woff2; embed them as base64 `@font-face` data URIs so the file is standalone)
| Family name used in CSS | Source woff2 | @font-face settings | Used for |
|---|---|---|---|
| `"Archivo Wide"` (variable Archivo) | `https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XA35FckqWY8Q-2trydOxI.woff2` | `font-weight: 100 900; font-stretch: 62% 125%; font-display: swap` | Wordmark (stretch 100%), headline (stretch 112%), always weight 800 |
| `"Inter"` (variable) | `https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2` | `font-weight: 100 900; font-display: swap` | Default body sans, lede, statement, history (weight 400) |
| `"JetBrains Mono"` (variable) | `https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2` | `font-weight: 100 800; font-display: swap` | Nav links, hero mono columns, footer (weight 400) |
| `"Ms Madi"` | `https://fonts.gstatic.com/s/msmadi/v2/HTxsL2UxNnOji5E1B-fFiQ.woff2` | `font-weight: 400; font-display: swap` | Neon "Mira" signature |

Font stacks: sans = `"Inter", system-ui, sans-serif`; wide = `"Archivo Wide", "Archivo", system-ui, sans-serif`; mono = `"JetBrains Mono", ui-monospace, monospace`.

### 1.3 Image asset (one; always loaded from the direct Higgsfield result through the images.higgs.ai proxy — never re-hosted)
- **About portrait** (fictional young woman, short wavy dark hair, black turtleneck, cool aqua-teal key light from the left, seafoam rim light, deep-teal-to-aqua gradient backdrop, square):
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_072427_1c6c0843-2189-4e71-8462-58232b961bde.png&w=900&q=85`
  (raw result: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261106_072427_1c6c0843-2189-4e71-8462-58232b961bde.png`)

There are no other images or videos. Every 3D object is generated in code.

### 1.4 Document head
- `<html lang="en">`, UTF-8, `width=device-width, initial-scale=1`.
- Title: `Mirasol Studio — Design & Engineering`.
- Meta description: `Mira Sol — motion and design engineering. Skill and heart, brought to every screen.`

---

## 2. Layout system

The whole page is designed on a **1440 × 900** frame.
- `--ux = 100vw / 1440`: horizontal unit. All x positions and horizontal gaps use it.
- `--u = min(100vw / 1440, 100vh / 900)`: size unit. All font sizes, vertical positions from the top, and element sizes use it. Because it never exceeds the height-based unit, nothing is ever cropped under the nav on short/wide windows.
- Vertical positions are written as "top N" (= N × `--u` from the section top) or "bottom N" (= N × `--u` from the section bottom).
- Every section (`.screen`) is exactly `100vh` (`100svh` where supported), `position: relative`; its `.frame` is `position: absolute; inset: 0`; every direct child of the frame is absolutely positioned.

### Colour tokens
| Token | Value | Use |
|---|---|---|
| ink | `#ffffff` | All primary text |
| page / dot colour | `#091618` | `html` background, WebGL clear colour, dot-dissolve colour |
| grey | `#87999a` | About "history" paragraph text |
| line | `rgba(255,255,255,.13)` | Hero grid lines |

`html` has the page colour, `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`. `body` is transparent, uses the sans stack, `overflow-x: hidden`. Links inherit colour with no underline. All elements `box-sizing: border-box; margin: 0; padding: 0`.

### Stacking
1. `<canvas id="gl">`: `position: fixed; inset: 0; 100vw × 100vh; z-index 0; pointer-events: none`, starts at `opacity 0` and fades to 1 with `transition: opacity 1s ease` when the scene is ready (class `on`).
2. `<main>`: `position: relative; z-index 1`, holding both sections, both with transparent backgrounds so the canvas shows through.
3. Fixed nav and footer: `z-index 20`, `pointer-events: none` on the bar but `auto` on their children.

---

## 3. Fixed chrome (visible over both sections)

### 3.1 Nav (top bar)
- `position: fixed; top: 0; left: 0; right: 0`, padding left 63 `--ux`, right 62 `--ux`.
- Height `max(32px, 36 --u)`. Flex row, centred vertically, `space-between`.
- **Wordmark** (left, link to `#`): text `MIRASOL.STUDIO`. Archivo Wide, weight 800, stretch 100%, size `max(12px, 16 --u)`, letter-spacing −0.01em.
- **Links** (right): flex, gap 50 `--ux`, JetBrains Mono, size `max(11px, 16.7 --u)`. In order:
  1. `WORK`: link to `#about` (smooth-scrolls with Lenis).
  2. `CONTACT`: `mailto:hello@mirasol.studio`.
  3. `THEME[A]`: button. Toggles its own text between `THEME[A]` and `THEME[B]`. On B, the root element gets `filter: hue-rotate(-28deg) saturate(1.1)`; on A, the filter is removed.
  4. `SOUND[-]`: button. Toggles text between `SOUND[-]` and `SOUND[+]` (cosmetic only, no audio).
- Buttons have no background or border and inherit the font.
- **Link hover underline**: a 1 px line in `currentColor`, 3 px below the text. It starts at `scaleX(0)` with origin right. On hover it grows to `scaleX(1)` with origin left over 0.35 s `cubic-bezier(.2,.7,.2,1)`. Leaving the link shrinks it back toward the right.

### 3.2 Footer bar
- `position: fixed; bottom: 28 --u; left/right: 0`, same side padding as the nav, height 58 `--u`.
- 3-column grid `1fr auto 1fr`, centred vertically, JetBrains Mono, size `max(11px, 16.7 --u)`.
- **Left: live clock.** Text `GMT±H  HH:MM` with two spaces between. H is the viewer's own UTC offset in hours (one decimal if fractional), HH:MM is local time zero-padded. Updates every 10 s. Tabular numerals, `white-space: pre`.
- **Centre: pointer coordinates.** Text `XXXX X YYYY Y`, initially `0720 X 0450 Y`. On every pointer move, x = round(clientX / innerWidth × 1440) and y = round(clientY / innerHeight × 900), each zero-padded to 4 digits. Tabular numerals.
- **Right: globe icon.** Inline SVG with viewBox 0 0 48 28, white 1.4 stroke, no fill, width 47 `--u`.
  - Outer ellipse: cx 24, cy 14, rx 22.5, ry 12.5.
  - Inner meridian ellipse: cx 24, cy 14, rx 9, ry 12.5. Animated `scaleX(1 → −1 → 1)` over 6 s linear infinite around (24, 14), so it looks like a spinning globe.
  - Lines: equator M1.5 14 h45; latitudes M4.5 7.5 h39 and M4.5 20.5 h39; vertical axis M24 1.5 v25.

---

## 4. Hero section (`aria-label="Intro"`)

### 4.1 Grid overlay (decorative, `aria-hidden`)
- **Vertical 1 px lines** in the line colour at x = 52, 494, 946, 1388 `--ux`, full height.
- **Horizontal 1 px lines** at top 256, at bottom 320 and at bottom 30, full width.
- **Crosshairs** at every intersection of those 4 columns × 3 rows (12 total): 13 × 13 `--u` boxes centred on the intersection, each made of a 1 px white vertical and a 1 px white horizontal stroke, at opacity 0.7.

### 4.2 Text
| Element | Position | Font | Exact text |
|---|---|---|---|
| Lede | left 63 `--ux`, top 68 | Inter 400, 30 `--u`, line-height 37 `--u`, letter-spacing −0.02em | `Motion &` (line break) `Engineering` |
| Mono column 1 | left 505 `--ux`, top 70 | JetBrains Mono 16.7 `--u`, line-height 25 `--u`, `white-space: pre` | `Building with rigor.` / `Sweating the pixels.` |
| Mono column 2 | left 957 `--ux`, top 70 | same | `I’m Mira Sol, I lead Design & Engineering` / `and AI exploration at Mirasol Studio,` / `across craft & code. Off-hours I build` / `design tools for team efficiency.` |
| Headline `<h1>` | left 60 `--ux`, bottom 126 | Archivo Wide 800, stretch 112%, 77 `--u`, line-height 78 `--u`, letter-spacing −0.012em, uppercase | `I BRING` / `SKILL & HEART` / `TO EVERY SCREEN` (written in markup as "I bring / Skill & heart / to every screen") |

- The apostrophe in "I’m" is a typographic right single quote.
- Each headline line is a block span with `overflow: hidden`. It has 4 `--u` bottom padding and −4 `--u` bottom margin so descenders aren't clipped. Inside it is a block `<em>` (not italic) that slides up during the entrance.

### 4.3 Entrance (runs once, after `document.fonts.ready`)
- A guard class `anim` is added to `<html>` before first paint and hides the hero's entrance elements (opacity 0). It's removed when the timeline starts, and also by a failsafe after 3.5 s.
- All entrances use Web Animations with `fill: both` and ease `cubic-bezier(.16,1,.3,1)` unless stated otherwise:
  - Hero grid: opacity 0 → 1, 900 ms, delay 300 ms, linear.
  - Nav and footer: opacity 0 → 1 and translateY −8 px → 0, 900 ms, delay 350 ms.
  - Lede, mono column 1, mono column 2, in that order: opacity 0 → 1 and translateY 14 px → 0, 1000 ms, delays 500 / 610 / 720 ms (110 ms stagger).
  - Headline lines: each `<em>` goes translateY 105% → 0 (masked by its line), 1200 ms, delays 650 / 770 / 890 ms (120 ms stagger).

---

## 5. About section (`id="about"`, `aria-label="About"`)

The section background is transparent. Its dark field is the WebGL dot-dissolve (see §7.5) that has fully covered the scene by the time this section is in view.

### 5.1 Grid (decorative)
- **Vertical 1 px lines** in `rgba(255,255,255,.075)` at x = 52, 499, 942, 1387 `--ux`.
- **Horizontal lines** at top 270, top 582 and bottom 28.
- **Seven crosshairs** at opacity 0.35, at (column, row):
  - (52, 582), (499, 270), (499, 582), (1387, 270), (1387, 582)
  - (942, bottom row), (499, bottom row)

### 5.2 Dot clusters (decorative)
- Two 64 × 64 `--u` squares, at (303 `--ux`, top 626) and (1004 `--ux`, top 712).
- Each is filled with a repeating 8 `--u` grid of tiny white dots (`rgba(255,255,255,.55)`, radius about 1.1 `--u` with a 1.4 `--u` soft edge).
- Each is masked by a radial fade (solid to 30%, transparent at the edge) and set to overall opacity 0.45.

### 5.3 Portrait card
- left 62 `--ux`, top 179, size 321 × 323 `--u`.
- Background: the portrait URL (§1.3), `cover`, positioned 50% 30%, fallback colour `#12302f`.
- `role="img"`, `aria-label="Portrait of Mira Sol in cool teal light"`.

### 5.4 Neon signature
- Text `Mira`, `aria-hidden`. Position left 34 `--ux`, top 172, so it overlaps the card's top-left corner.
- Font: Ms Madi, 112 `--u`, line-height 1, colour `#7aeed6`, horizontal padding 10 `--u`, no wrap.
- Transform: `rotate(-17deg)` with origin at 0 50%.
- Neon glow (text-shadow stack): `0 0 1.5u #2fdcbc`, `0 0 7u #16c6a4`, `0 0 18u rgba(22,198,164,.55)`.

### 5.5 Statement and history
- **Statement**: left 509 `--ux`, top 166. Inter 400, 55.5 `--u`, line-height 61 `--u`, letter-spacing −0.005em, white. Each line is a separate block, no wrap:
  1. `I shape how teams and AI work`
  2. `together with clarity and care,`
  3. `crafting the next generation of`
  4. `digital products.`
- **History**: left 509 `--ux`, top 453, same type but in grey `#87999a`. Lines:
  1. `I’m building ` + link `Lumen Kit™` + `, and`
  2. `previously worked on ` + link `Northwind`
  3. link `Cloud` + `, ` + link `Fieldnote` + `, and ` + link `Parcel` + `.`
- **Links** (`href="#"`) are white with a 3 `--u` underline drawn as a background bar, sitting 2 `--u` above the text box bottom.
- On hover, the bar shrinks to zero width toward the right and the text turns `#b8f4e6`. Both transitions run over 0.45 s `cubic-bezier(.2,.7,.2,1)`; the colour transition is 0.3 s.

### 5.6 About entrance
Runs once, when 40% of the section is visible (IntersectionObserver, threshold 0.4). Card, signature and rows start at inline opacity 0.
- **Card**: opacity 0 → 1, clip-path `inset(100% 0 0 0)` → `inset(0 0 0 0)`, translateY 20 px → 0. 1100 ms, ease `cubic-bezier(.16,1,.3,1)`.
- **Signature (draw-on)**: clip-path from `inset(-60% 100% -60% -20%)` to `inset(-60% -20% -60% -20%)`, revealing left to right. Opacity 0 → 0.4 at 60% → 1. 1300 ms, delay 450 ms, ease `cubic-bezier(.55,.1,.3,1)`.
- **Signature flicker**: then an infinite opacity loop 1 → 0.82 → 1 → 0.9 → 1 over 4200 ms, starting after 1800 ms.
- **Clean-up**: when each clip-path reveal finishes, cancel that animation and write its end state inline (opacity 1, clip-path none, transform none). This is required: otherwise the GPU compositor can leave a stale dark copy of the card painted over the canvas while scrolling.
- **Rows**: all seven statement/history lines, opacity 0 → 1 and translateY 22 px → 0, 1000 ms, delay 150 ms + 80 ms × index.

---

## 6. Smooth scroll
- Lenis with `lerp: 0.1` and `smoothWheel: true`, driven from `requestAnimationFrame`.
- Same-page anchor links call `lenis.scrollTo(id)`.
- Add CSS so Lenis works: `html.lenis, html.lenis body {height: auto}` and `.lenis.lenis-smooth {scroll-behavior: auto !important}`.
- Lenis is skipped entirely with reduced motion.

---

## 7. The WebGL scene

### 7.0 Renderer, camera, pointer and scroll progress
- **Renderer**:
  - `WebGLRenderer` on `#gl`, antialias on, `powerPreference: high-performance`.
  - Pixel ratio min(devicePixelRatio, 2). Tone mapping off. Clear colour `#091618`.
  - If creation throws, add class `no-gl` to `<html>`. The hero then gets a static gradient `linear-gradient(160deg, #06252c 0%, #0f4a48 55%, #2a8f80 100%)` and the about section gets `#091618`.
- **Camera**: perspective. The **horizontal** field of view is fixed: 60° when the viewport is ≥ 1024 px wide, else 38°. Vertical fov = 2·atan(tan(hfov/2) / aspect). The camera has layer 10 enabled in addition to 0.
- **Pointer state**:
  - `uv` = (clientX / innerWidth, 1 − clientY / innerHeight), so y points up.
  - `inside` is true only for mouse/pen moves, and false on document pointerleave, mouseleave or window blur.
- **"Phone"** means viewport width < 820 px.
- **Scroll progress p** (drives the dissolve): with vh = innerHeight and bottom = hero's bounding-rect bottom, p = clamp((vh − bottom) / (vh − 0.25·vh), 0, 1). So p = 0 while the hero fills the screen, and p = 1 once its bottom edge has risen to 25% of the viewport height.

### 7.1 Background stack (the streaky teal field)
Five full-screen passes ping-pong between two render targets at **0.3× the CSS viewport size** (no depth). The result is composited as a full-screen quad behind everything (render order −10, depth test off).
- **Timing**: shared uniform time t = seconds since load.
- **Pointer centre P**:
  - Desktop: P eases toward the pointer uv by 0.1 per frame while the pointer is inside, and back toward the rest point (0.5, 0.5) by 0.05 per frame when it leaves. This ease is what makes the field curve and stretch toward the cursor and then settle.
  - Phone: P is fixed at (0.5, −0.1).
  - The vignette, swirl, sine and bokeh passes receive P; the shatter pass stays anchored at (0.5, 0.5).
- **Passes, in order:**
  1. **Vignette** (ignores its input).
     - Inputs: aspect a = (W/H, 1); skew s = (0.54, 0.46); half-radius h = 0.354 / 2.
     - d = distance(uv·a·s, P·a·s).
     - f = smoothstep(h − 0.5h, h + 0.5h, d) (falloff 1).
     - Edge intensity −0.82 then pushes f toward 1: f = mix(f, 1, 0.82).
     - Output colour = mix(**bg `#86ead6`**, **vignette `#06252c`**, f), with all colours converted to linear.
  2. **Swirl**: radius 0.25, angle 0.1, mix 0.5.
     - Take the offset from P with the aspect-corrected x.
     - Inside the radius, rotate it by angle·10·smoothstep(radius, 0, r) + t/20.
     - Blend back to the unwarped uv by smoothstep(0, radius, r), then mix 50% with the original uv before sampling.
  3. **Sine warp**: frequency 0.35, amplitude 1.18.
     - In −1..1 space: x += sin((y + P.y)·20·0.35 + 0.25·t) · 1.18·0.2.
     - Applied over the whole screen, so moving the pointer vertically shifts the wave phase.
  4. **Shatter**: Voronoi, amount 1, spread 0.9, angle −45/360 turn, skew 0.9, centred (0.5, 0.5).
     - Cell space: (uv − 0.5) · (aspect, 1) · 16, rotated by −45° and squashed by skew 0.9. This makes long diagonal cells, which are the diagonal light streaks.
     - Each cell's feature point drifts: 0.5 + 0.5·sin(5 + 0.2·t + 2π·hash).
     - Sample offset = point·0.4·spread − 0.2·spread, softened toward cell edges and corners (smoothstep over 0.02 of F1 and 0.04 of F2 − F1).
  5. **Bokeh blur**: amount 3.125 × 0.754, tilt 0.5.
     - Blur radius = amount · mix(1 − d, d, 0.5), where d is the distance to the tracked centre.
     - 32 golden-angle samples (step 2.39996, growing radius r += 1/r), pixel step (H/W, 1) × 0.003, with a tiny per-pixel rotation from a 128² random greyscale noise texture.
     - Sample weight = 5 + c⁹·150, so highlights bloom.
- **Composite**:
  - base = mix(bg, overlay(bg, white), 0.61).
  - blend = clamp(stack + **output `#0f6b66`**·0.35).
  - final = base · mix(1, blend, 0.95), then converted to sRGB.
  - The look: dark teal edges, bright aqua-teal diagonal streaks around the centre, curling toward the cursor.
- **Cadence**: the stack re-renders only while p < 0.98, every 2nd frame (every 4th once p > 0.75).

### 7.2 Glass material (shared by all five objects)
- **Environment capture**: every non-glass object (background quad and dot overlay, layer 0) is rendered into a **half-resolution** target (with depth, half-float). Glass meshes live on layer 10, so they're excluded from that capture.
- **Cadence**: refreshed while the hero is visible and p < 0.99 — every frame on desktop (every 2nd frame when p > 0.5, every 4th when p > 0.75), every 3rd frame on phones.
- **Shading**, per fragment, with screen uv = fragCoord / drawing-buffer size:
  1. **Refraction**: refract the eye ray through the normal with IOR 1.15 (R), 1.18 (G) and 1.22 (B).
     - Take 3 samples per channel (2 on phones). Offset = (0.72 + i/loop·0.1 + noise·0.025) · 0.14 along the refracted xy.
     - Average them.
  2. **Tone**: saturation 1.2, brightness ×0.6, contrast 0.98 around 0.5, gamma 1.
  3. **Tint**: a vertical gradient from tint B (bottom of the mesh) to tint A (top), by local model y.
     - Tint alpha × mix(0.4 facing, 1.0 grazing) by 1 − |n·e|.
     - Applied as a **hard-light** blend (tint mix 1).
  4. **Specular**: Blinn half-vector, shininess 100, plus diffuse 0.05·max(0, n·L), all × 1.2.
  5. **Fresnel**: (1 − |e·n|)³ × 0.72, masked to the side facing (−1, 1, −1) with smoothstep(−0.5, 0.5).
- **Light**:
  - L orbits on a circle of radius |(4, 9)| at z 0.5, rest angle atan2(9, 4).
  - On desktop with the pointer inside, cast a ray from the camera through the pointer onto the z = 0 plane. The target angle is atan2(−hit.y, −hit.x), so the highlight swings opposite the cursor.
  - The angle eases with damping 6/s along the shortest arc, and returns to rest when the pointer leaves.

### 7.3 The five objects (geometry built in code, world units)
All objects use the glass above. Each has its own tint pair `[top A, bottom B]`.

1. **"hello"**: one continuous monoline cursive stroke.
   - **Path**: a centripetal Catmull-Rom curve through about 70 hand-placed points.
     - Order: lead-in, tall looped **h** (loop opening about 1.1 wide), h hump, small looped **e**, two tall open-looped **l**'s (ascender about 4.3, x-height about 1.9), a closed **o**, then a rising tail exiting right.
     - Slight z depth: up-strokes forward (+0.25), down-strokes back (−0.35), so crossings overlap rather than intersect.
   - **Tube**: radius 0.4, 1400 segments × 28 radial, with sphere caps at both ends. Scaled 0.86 vertically, normals recomputed, centred.
   - **Size**: scaled so the word is **15.3 world units wide** on desktop (mobile ×19/22). Position (−0.1, 0.7, 2); mobile (0, 0.4, 2).
   - **Tint**: `#effffb` / `#9fe8d8`.
   - **Rotation**: before 240° about Y → rest 4° about Y → after 90° about Y.
2. **Sparkle**: four-point star.
   - Shape: concave quadratic curves through (0, ±1) and (±1, 0) with control points at ±0.16. Extruded depth 0.12, bevel thickness 0.16, size 0.1, 8 segments.
   - Scale 0.82 (mobile 0.62). Position (−6.9, 3.9, 1); mobile (−4.6, 3.9, 1).
   - Tint `#ffffff` / `#d4e2e0` (neutral silver).
   - Rest rotation (0, −14°, 8°), after (0, 360°, 0).
3. **Pill**: capsule, radius 0.5, length 1.3, rotated 110° about Z (tilted down to the right).
   - Scale 1 (mobile 0.75). Position (6.3, 3.35, 0); mobile (4.7, 3.7, 0).
   - Tint `#c8f6ea` / `#38c4a4`. After rotation (0, 0, 180°).
4. **Pearl**: sphere, radius 0.76.
   - Position (9.7, −0.1, 0.5); mobile (5.2, −2.8, 0.5), scale 0.75 on mobile.
   - Tint `#f6fffd` / `#d4f6ee`. No rotation change.
5. **Cursor arrow**: classic pointer polygon (0,0) (0,−3.1) (0.82,−2.38) (1.42,−3.62) (1.98,−3.36) (1.4,−2.16) (2.42,−2.16).
   - Extruded depth 0.35, bevel thickness 0.28, size 0.24, 10 segments.
   - Scale 0.58 (mobile 0.46). Position (8.9, −2.95, −1); mobile (3.6, −5.2, −1).
   - Tint `#e4fbf5` / `#6fd8c0`. Rotation axis tilted 45° about Z. Rest (0, 10°, 8°), after (0, 720°, 0).

### 7.4 Scene motion
- **Ready**: after 5 rendered frames, the canvas gets class `on` (1 s CSS fade-in) and the objects become visible.
- **Intro dolly**: progress goes 0 → 1 over 1.2 s.
  - Camera z = lerp(base + 8, base, ease(progress)), where base = lerp(24, 32, p).
  - Ease is cubic-bezier(0.66, 0, 0.01, 1): slow start, very fast middle, soft landing.
- **Spin-in**: each object starts at its *before* rotation. Every frame it damps (λ = 6/s) toward its target rotation.
  - entry = clamp((scroll + vh − heroTop) / vh); after = clamp(that − 1).
  - Target = lerp(before, rest, entry), then lerp toward *after* by the after value.
  - On load "hello" therefore spins from 240° to 4°. Over the first screen of scroll, it turns to 90° (edge-on) while the cursor spins 720° and the sparkle 360°.
- **Scroll-synced rise**: each object's y adds (0.5 − heroCentreDocY/vh)·Hz + scrollY/vh·Hz·0.72, where Hz is the visible world height at the object's depth. So the objects climb at 72% of the page's scroll speed.
- **Float** (desktop only): y += 0.18·sin(1.2t) + 0.06·sin(0.6t).
- **Camera parallax** (desktop only):
  - Target offset = ((0.5 − uv.x)·2·1.4, (0.5 − uv.y)·2·1.4·0.6); the look-at point = −0.12 × that offset.
  - Both ease by 0.18 per frame while the pointer is inside, 0.05 after it leaves.
  - On phones they ease back to 0.
- Objects are hidden whenever the hero is completely off screen.

### 7.5 Section change: the dot dissolve
- A full-screen quad (render order 10, depth test off, transparent) draws a grid of **4 CSS-px cells**.
- Each cell holds a dot of colour `#091618` with radius 0.9·p in cell space, anti-aliased with fwidth.
- As p goes 0 → 1, the dots grow from nothing until they merge into solid teal-black. You see the glass "hello" break up into a dotted pixel ghost and vanish while the camera pulls back from z 24 to 32.
- The dots are also captured into the glass environment, so the glass refracts them.

### 7.6 Pointer fluid (the hover on "hello")
The finished scene renders to a full-resolution half-float target. A stable-fluids velocity simulation then displaces that whole frame on its way to the screen.
- **Grid**: 160 cells on the short side × aspect on the long side, half-float, linear filtering.
- **Input**:
  - Pointer position and per-frame delta are in drawing-buffer pixels with y up.
  - When the pointer is not active, the delta decays ×0.9 per frame.
- **Per frame while active**:
  1. Curl.
  2. Add a splat: velocity += (delta / bufferSize) · exp(−|d|² / 0.003) · 3000, where d is the aspect-corrected distance to the pointer. Velocities are clamped to ±1000.
  3. Divergence.
  4. Pressure: clear, then 4 Jacobi iterations.
  5. Subtract the pressure gradient.
  6. Self-advect with dt 0.016 and dissipation 3 (divide by 1 + 3·0.016).
- **Display**:
  - displacement = velocity / gridSize; m = |displacement|.
  - Take 4 taps along −displacement·0.3·(k + 0.3)·m for k = 0, ⅓, ⅔, 1. Use teal-biased channel weights so green leads: R 0.55 + 0.45·(1 − |2k − 1|), G 1 − 0.2k, B 0.75 + 0.25k.
  - Add a palette highlight where motion is strong: ramp(sin(2m)·0.5 + 0.5) · smoothstep(0.2, 0.8, m) · 0.25.
  - The ramp runs pale aqua (0.62, 1, 0.9) → seafoam (0.25, 0.95, 0.62) → teal (0.04, 0.62, 0.55), in linear colour.
  - Result: swiping across the word bends and smears it along the stroke with aqua/teal fringes, then it relaxes back to its exact shape.
- **When it runs**: only on desktop, without reduced motion, while the dots are not solid, and within 600 ms of the last pointer movement (delta² > 1).
  - Solid means p ≥ 0.9, staying solid until p ≤ 0.82 (hysteresis).
- **Dot trail (about section)**: while the dots are solid on desktop, a trail of up to 14 squares follows the mouse on a **16 px grid**.
  - Colour `#5fe0c4`. Dot radius 0.8 of the cell, which fills each cell as a square.
  - Each time the pointer enters a new cell, the trail shifts. The head stays at strength 1; older cells fade with damping 2/s.
- **Idle skip**: when fully dissolved (p = 1), with the hero off screen and no fluid, trail or pointer activity, the loop skips rendering and keeps the last frame.

---

## 8. Phones (viewport ≤ 820 px)
- **Unit**: n = 100vw / 430.
- **Nav**: padding 0 18n, height 52n. Wordmark 14n. Links gap 14n, size 12n. `THEME` and `SOUND` are hidden.
- **Hidden**: footer, grid lines, dot clusters.
- **Layout**: sections become `height: auto`. Each frame becomes a relative flex column with padding 76n 18n 0, and all absolute offsets are reset.
- **Hero**:
  - min-height 100svh.
  - Lede 24n, line-height 1.18.
  - Mono column 1: 12.5n, line-height 1.55, normal wrapping, 14n top margin.
  - Mono column 2 is hidden.
  - A flexible spacer (at least 300n) leaves room for the 3D word, which is centred behind.
  - Headline 35n, line-height 1.02, 40n bottom padding, at the bottom.
- **About**:
  - Padding 60n 18n 70n.
  - Portrait 220 × 222n with margin 40n 0 0 10n.
  - Signature absolute at (4n, 64n), 92n.
  - Statement and history 29n, line-height 1.16, flowing inline. Statement top margin 34n, history top margin 22n. Link underline 2 px.
- **Scene**: no pointer tracking, parallax, float, fluid or trail. 2 refraction samples. Background centre fixed at (0.5, −0.1). Mobile object positions and scales from §7.3.

## 9. Reduced motion (`prefers-reduced-motion: reduce`)
- All CSS animations and transitions are off.
- No Lenis. No text entrance timelines (everything visible immediately).
- In the scene: no intro dolly (starts at its final position) and no spin damping (rotations follow scroll directly). No float, no camera parallax, no fluid and no trail.
- Still active:
  - the background stack's slow time-based drift of the swirl, sine and shatter cells;
  - the scroll-linked rise, turn and dot dissolve, which are driven by the user's own scrolling.