# Orrel Studio — Paper Cupboard Footer: exact recreation prompt

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts.

Build a single-file, full-viewport website footer for a fictional architecture practice called **Orrel Studio**. The whole screen is the front of a two-door cupboard made of warm clay letterpress paper. The footer UI (copyright, tagline, link columns and a giant blind-embossed wordmark) is printed and pressed into the two door fronts. The doors meet at a vertical seam in the exact centre of the screen. Each door has a tall pill-shaped paper handle beside the seam. Clicking either handle swings both doors open toward the viewer in real CSS 3D, hinged on the outer screen edges. Behind them, a narrow strip of a dim brown cupboard interior shows five plain horizontal shelves holding a rolled architectural plan, a small cardboard arch model and a brass ruler. After the doors settle, a real 3D folded paper airplane (three.js) flies in from off-screen in front of the open left door, turns into the opening and lands on a shelf with a soft shadow. Every new opening adds one more airplane, so the shelves collect them. Clicking a handle again slams the doors shut with a small overshoot. A thin nav bar floats above everything.

Use plain HTML, CSS and one ES module script. The only libraries are three.js 0.160.0 from jsDelivr (via an import map) and two Google Fonts.

---

## 1. Assets

| Asset | Exact URL | How it is used |
|---|---|---|
| Cupboard interior plate (2048×1360 PNG, served as WebP) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261119_114337_4c8a8d52-cd31-4cd5-aafa-8463e0e4cbb0.png&w=2048&q=85` | The only bitmap. It is a straight-on photo of a warm brown cupboard interior (#5a2e1a to #7a4a30 tones, soft front light, darker corners) with five full-width horizontal shelves and no vertical dividers. Objects sit at the centre: a rolled plan tied with string on shelf 2, a cardboard arch model on shelf 3, a brass ruler on shelf 4. Shelves 1 and 5 are empty. It sits behind the doors. Placement is in section 4. |
| three.js 0.160.0 | `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js` | Import map entry `"three"`, imported as `import * as THREE from 'three'`. |
| Instrument Sans (variable, weights 400–700, latin) | `https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1Q.woff2` (Google Fonts family "Instrument Sans") | All UI text. Declared with `@font-face` at font-weight 400 700. In the shipped standalone file it is base64-embedded. |
| Newsreader (regular 400, latin, optical size axis) | `https://fonts.gstatic.com/s/newsreader/v26/cY9VfjOCX1hbuyalUrK49dLafXjalZCsZBsgBgbNJYQ.woff2` (Google Fonts family "Newsreader", opsz 6–72) | Nav logo wordmark and the giant embossed wordmark. Weight 400 only. Base64-embedded in the standalone file. |
| Paper grain | An inline SVG data URI, no file | A 240×240 feTurbulence tile, described in section 5. |
| Airplane texture and shadow | Drawn at runtime on canvases, no file | Described in section 9. |

Both fonts use `font-display:swap`. The page title is "Orrel Studio". Use `lang="en"`, `meta charset utf-8` and `meta viewport width=device-width, initial-scale=1`.

---

## 2. Colour tokens

| Token | Value | Use |
|---|---|---|
| --paper | #ddd0bd | Door paper base |
| --paper-hi | #e3d8c7 | Lighter paper (gradients) |
| --paper-lo | #d2c3ae | Darker paper near the left hinge |
| --interior | #61301c | Stage background behind everything |
| --ink | #3a1d10 | Headings, logo, logo mark |
| --text | #5a4535 | Tagline |
| --muted | #6e5948 | Footer links |
| --accent | #b0784f | Copyright line, focus outline |
| --handle-closed | #6b4a33 | Handle colour while closed |
| --handle-open | #d9c9b4 | Handle colour once lit/open |
| CTA pill | #b7784f, hover #a86c45, text #fbf1e6 | "Book a demo" |
| Nav links | #3e2a1c; over the opening #f0e5d4 | See section 7 |
| html/body background | #2a160c | Shown only if something fails |

---

## 3. Scaling system

- One design unit `--u` maps a 1440×900 frame to the viewport: `--u: max(min(100vw/1440, 100vh/900), 0.8px)`. Every size, offset and spacing below is written as N × u (written "N u"). Font sizes are additionally floored with `max()` so no text drops under 11–12 px.
- The stacked layout (phones, portrait tablets, landscape phones) applies on `(max-width:820px), (max-width:1180px) and (orientation:portrait), (orientation:landscape) and (max-height:520px)`. There `--u: min(100vw/390, 1.35px)`.
- Landscape phones add `(orientation:landscape) and (max-height:520px)`, where `--u: min(100vh/420, 1.2px)`.
- Small desktops and landscape tablets, `(max-width:1279px)`, tighten the columns (section 6).
- `html, body` are 100% tall with `overflow:hidden`. Everything lives in `main.stage`, `position:fixed; inset:0; overflow:hidden; background:var(--interior)`.

---

## 4. Layer stack (bottom to top) and the interior

1. **.interior** (absolute, inset 0, overflow hidden, aria-hidden).
   - **.plate-frame** is a 1440×900 px box with left 50% and top 50%, transformed `translate(-50%,-50%) scale(coverU)`. JS sets this with coverU = max(vw/1440, vh/900), so the frame covers the viewport like background-size cover.
   - Inside it, the plate `<img>` is absolutely positioned at left −2px, top 9px, width 1444px, height auto. It is not draggable and not selectable. At that placement the five shelf surfaces land at frame y ≈ 168, 346, 520, 689 and 868, and the objects are centred at frame x ≈ 738.
   - **.gapshade** covers inset 0 with `radial-gradient(ellipse 60% 70% at 50% 45%, transparent 30%, rgba(25,10,3,.35) 100%)`, a vignette.
   - **.dim** covers inset 0, background #1d0e06, opacity driven by JS: 0.78 × (1 − lit). The interior is dark until the doors open.
   - **canvas#cvIn** (three.js "inside" renderer, z-index 1) holds airplanes that are inside the cupboard, plus their shadows.
2. **.doors**, z-index 2, absolute inset 0, `transform-style:preserve-3d`, perspective-origin 50% 50%. Its perspective in px is set by JS to D (section 9) so the CSS 3D and the three.js camera match exactly.
3. **canvas#cvFront**, z-index 3: the airplane while it flies in front of the doors.
4. **nav**, z-index 4.

Both canvases: absolute, inset 0, 100% × 100%, pointer-events none.

---

## 5. Doors

- **.door.left** (left 0) and **.door.right** (right 0): each is top 0, height 100%, width 50%, `transform-style:preserve-3d`, `will-change:transform`. The transform origin is the outer edge: `0 50%` for the left door, `100% 50%` for the right. Each door contains a **.face** and an **.edge**.
- **.face**: absolute inset 0, overflow hidden, backface-visibility hidden.
  - Left door background: `linear-gradient(90deg, #d2c3ae 0%, #ddd0bd 55%, #e3d8c7 100%)`.
  - Right door background: `linear-gradient(90deg, #e3d8c7 0%, #ddd0bd 45%, #e3d8c7 100%)`.
- **.grain** (inside each face): inset 0, opacity 0.95, mix-blend-mode multiply, background tile 240×240px. The tile is an SVG data URI with feTurbulence fractalNoise baseFrequency 0.9, numOctaves 4, stitchTiles, then feColorMatrix "0 0 0 0 .45  0 0 0 0 .37  0 0 0 0 .28  0 0 0 .3 0". This gives warm brown speckle at about 30% alpha.
- **.shade** (inside each face): inset 0, pointer-events none, opacity 0 when closed.
  - Left door: gradient 90deg from rgba(43,22,10,0) to rgba(43,22,10,1). Right door: the same at 270deg, so both darken toward their free edge.
  - JS sets opacity = (max(0, −angle)/50) × 0.32 while the doors turn.
- **.seamline**: 1px wide, full height.
  - Left door: at its right edge, rgba(60,35,18,.28).
  - Right door: at its left edge, rgba(255,248,236,.35). Together they read as a fine seam with a light lip.
- **.edge** (door thickness): 18px wide, full height, `linear-gradient(90deg, #bba68e, #cdbba5 40%, #b39c83)`.
  - Left door: placed at left 100%, origin `0 50%`, `rotateY(90deg)`.
  - Right door: right 100%, origin `100% 50%`, `rotateY(-90deg)`.
  - Both stand perpendicular behind the face at the free edge, so a paper thickness shows when the door swings.
- **Rotation:** JS writes `rotateY(angle deg)` on the left door and `rotateY(−angle deg)` on the right. Negative angle means open, toward the viewer. A small positive angle is "pressed in".

---

## 6. Door content (desktop 1440×900 values; u = 1 px there)

### Left door
- **.copy** block: left 55u, top 180u.
  - **"© 2026 ORREL STUDIO"**: Instrument Sans 500, font-size max(11px, 12.6u), letter-spacing 0.035em, colour --accent.
  - **Tagline** "Drawn slowly." line break "Built to last.": margin-top 9u, margin-left 8u, font-size max(12px, 14u), line-height 19u, colour --text.
- **Embossed mark and "Orrel"**: an SVG, bottom 0, left 38u, width min(580u, 50vw − 60u), height 200u, viewBox 0 0 580 200, preserveAspectRatio xMinYMax meet, overflow visible, aria-hidden. It contains one `<g filter="url(#deboss)" fill="#d3c4b0">` holding:
  - The logo mark symbol at x 2, y 38, width 176, height 153.
  - `<text x=205 y=183>` "Orrel" in Newsreader 400, font-size 196, textLength 368, lengthAdjust spacingAndGlyphs. This stops the word from ever crossing the seam.
- **Handle**: absolute, right 21u, top 307u. Its style is in the Handles section below.

### Right door
- **.links** (flex row): left 190u (measured from the seam), top 180u. Three columns:
  - c1 (width 185u): **Product** with Platform, Security, Book a demo.
  - c2 (width 180u): **Company** with About, Careers, Contact.
  - c3: **Legal** with Privacy policy.
  - Column headings (h4): Instrument Sans 500, font-size max(12px, 14u), line-height 1, colour --ink, margin-bottom 11u.
  - Links: block, font-size max(12px, 14u), line-height max(20px, 24u), colour --muted. Hover turns them --ink with a 0.25s colour transition. All links point to "#".
- **Embossed "Studio"**: SVG at bottom 0, left 156u, width min(520u, 50vw − 176u), height 200u, viewBox 0 0 520 200, xMinYMax meet. One `<g filter="url(#deboss)" fill="#d6c8b4">` with `<text x=0 y=186>` "Studio" in Newsreader 400, font-size 196, textLength 506, spacingAndGlyphs. Across the seam the wordmark reads "Orrel Studio".
- **Handle**: left 21u, top 307u.

### Small desktops and landscape tablets (max-width 1279px)
- .links left 120u, c1 width 150u, c2 width 140u.
- .copy left 40u.

### The deboss filter (#deboss)
Defined once in a hidden 0×0 SVG: filter region x −5%, y −10%, width 110%, height 125%, sRGB. The steps, in order:
1. Blur SourceAlpha with stdDeviation 3 (b).
2. Offset b by (3.6, 4.4) (ob). Arithmetic composite of SourceAlpha and ob with k2 1, k3 −1 gives the inner top-left band. Flood #4e3420 at 0.62 opacity, composited "in" it: the inner shadow.
3. Offset b by (−2.2, −2.6) (ob2). The same arithmetic gives the inner bottom-right band. Flood #fff7ec at 0.85, "in": the inner highlight.
4. Blur SourceAlpha with stdDeviation 1 and offset (1.6, 2). Composite "out" SourceAlpha for an outer rim. Flood #fff8ee at 0.55, "in": the rim light.
5. Merge, bottom to top: SourceGraphic, inner shadow, inner highlight, rim light.

The letters read as pressed into the paper, tone on tone with no ink.

### Logo mark (symbol #mark, viewBox 0 0 120 104)
Two stacked chevron "roof" shapes:
- Upper path: M60 4 L114 52 L104 54 L60 18 L16 54 L6 52 Z.
- Lower path: M60 46 L118 100 L106 102 L60 62 L14 102 L2 100 Z.

---

## 7. Nav (fixed on top of everything)

### Layout
- **nav**: absolute, z-index 4, top 0, full width, height 58u. Flex row, items centred vertically, space-between, padding 0 42u. pointer-events none on the bar, auto on its children.
- **Logo** (link to "#", aria-label "Orrel Studio home"):
  - Flex row with gap 9u: the mark SVG at width 33u, filled #3a1d10, then the text "Orrel Studio".
  - Text: Newsreader 400, 25u, letter-spacing −0.01em, colour --ink.
  - padding 5px 0, margin −5px 0, which enlarges the tap area without moving anything.
- **CTA** "Book a demo" (link to "#"):
  - Pill (radius 999px), background #b7784f, text #fbf1e6.
  - Font-size max(11.5px, 13u), height max(28px, 30u), padding 0 max(12px, 16u), flex centred.
  - Hover background #a86c45, 0.25s transition.
- **Nav links**: "About", "Careers", "Contact" followed by an arrow span "↗" (margin-left 5u, 0.9em).
  - Font-size max(12px, 14.5u), gap 26u, colour #3e2a1c, margin-left −10u.
  - Each link has padding 8px 0 and margin −8px 0 for tap height. Hover sets opacity 0.6.

### Two-layer link band (stays readable over the opening)
The links are rendered twice, in two **.navband** layers.
- Each layer is absolute, full width, full nav height, flex-centred, pointer-events none, and carries CSS variables --gl and --gr. Both start at 50vw.
- **Normal layer** (dark links, interactive): mask-image `linear-gradient(90deg, #000 var(--gl), transparent var(--gl), transparent var(--gr), #000 var(--gr))`. The dark text is hidden over the opening.
- **".lite" layer** (aria-hidden, links tabindex −1, not clickable): colour #f0e5d4, with the inverse mask. Only the part over the opening shows, in light text.
- **JS:** every frame of door motion, it sets --gl = vw/2 − gapHalf and --gr = vw/2 + gapHalf on both layers, where gapHalf is the projected half-width of the opening (section 9). The words switch from dark to light exactly at the door edges.

---

## 8. Handles

- **Shape:** button, border 0, radius 999px, width 33u, height 205u, pointer cursor, background --handle-closed (#6b4a33).
- **Shadows** (a raised paper pull): inset (2u, 2u) blur 3u rgba(255,250,240,.28), inset (−2u, −3u) blur 5u rgba(40,20,8,.35), drop (3u, 6u) blur 9u rgba(50,28,12,.32), and (−1u, −1u) blur 2u rgba(255,250,240,.5).
- **Transitions:** background and box-shadow, 0.2s ease.
- **Inner mark:** an SVG at the bottom (bottom 18u, centred, width 15u, opacity 0.75). viewBox 0 0 120 104, two stroked chevrons "M10 50 L60 10 L110 50" and "M10 96 L60 56 L110 96", stroke-width 10, round joins, no fill.
  - Stroke #8e6f55 while closed. When .stage has class "lit", the handle background becomes #d9c9b4 and the stroke #a88b70.
- **Accessibility:** aria-controls "doors", aria-expanded false/true, aria-label "Open the cupboard" / "Close the cupboard". Focus-visible shows a 2px --accent outline at offset 4px.

---

## 9. Motion and interaction (all timings measured frame by frame from the reference video)

### Camera and perspective
- three.js PerspectiveCamera with fov 16°, near 10, far 20000, at (0, 0, D), where D = (vh/2) / tan(8°).
- The world is in screen pixels: x = 0 at screen centre (right positive), y = 0 at screen centre (up positive), and z = 0 is the door plane. Positive z comes toward the viewer.
- The same D, in px, is the CSS perspective of .doors, so DOM doors and WebGL airplanes share one projection.
- On every resize, recompute D, the renderer sizes (pixel ratio min(2, devicePixelRatio)), the camera aspect, coverU and the open angle.

### Open angle (computed per screen)
- target half-gap = clamp(vw × 0.08, 72, 140) px. W = vw/2.
- Step a from 18° to 62° in 0.5° increments. Take the first a where (W − W·cos a) × D / (D − W·sin a) ≥ target. That gives about 30° at 1440 wide and about 50° on phones.
- gapHalf(angle) = |(−W + W·cos a) × D / (D − W·sin a)|.

### Easing curves (a cubic-bezier solver run in JS)
| Name | Curve |
|---|---|
| open | (.22, .8, .25, 1): half the travel in about 0.12 s |
| press | (.45, 0, .55, 1) |
| closeIn | (.55, .05, .85, .4): slow start, fast end |
| spring | (.2, .7, .3, 1) |
| fade | (.2, .7, .2, 1) |

### Opening (click either handle while closed)
| Time | What happens |
|---|---|
| 0–300 ms | Anticipation: angle tweens from its current value to +2° with "press". The doors press back in slightly, matching the reference drawer's 4% lift before release. |
| 300–770 ms | Swing: angle tweens from +2° to −OPEN_DEG with "open". |
| 370 ms | .stage gets class "lit": the handles turn cream and the nav light layer becomes useful. |
| 300–630 ms | lit tweens 0→1 with "fade", so .dim falls from 0.78 to 0 and the shelves light up. |
| 770 + 600 ms | One airplane launches. |

### Closing (click while open)
| Time | What happens |
|---|---|
| 0–400 ms | lit tweens back to 0 with "fade". The angle tweens to +1.6° with "closeIn", a slam slightly past closed. |
| 400 ms | "lit" is removed. |
| 400–570 ms | The angle springs from +1.6° back to 0 with "spring". |

### Rules
- A token counter cancels any running tween when a new click arrives, so rapid clicks never fight.
- Reduced motion (prefers-reduced-motion: reduce): open and close jump straight to the final state, and a new airplane appears already landed.

### Airplane model
- **Geometry:** a folded dart in a BufferGeometry, nose +x, up +y, span z, centred by translating −0.5 in x. Vertices: N (1,0,0), T (0,0,0), K (0.06,−0.13,0), ML (0,0.035,−0.13), WL (0.02,0.1,−0.42), MR (0,0.035,0.13), WR (0.02,0.1,0.42). Triangles: N-T-ML, N-ML-WL, N-MR-T, N-WR-MR, N-K-T.
- **UVs:** u = x, v = 0.5 + z + 0.3y. Computed vertex normals.
- **Material:** MeshStandardMaterial, roughness 0.92, metalness 0, double-sided, flat shading. The map is a 512 px canvas in sRGB with anisotropy 4:
  - fill #efe5d3;
  - grid lines every 16 px in rgba(165,135,105,.22) at 0.8 px, with every 80 px stronger in rgba(150,120,90,.45) at 1.4 px;
  - a small pencil floor-plan stroke in rgba(110,80,55,.35).
- **Size:** L = max(70, 140 × coverU × (0.8 in the stacked layout, else 1)), applied as a uniform scale.
- **Lights** (in both scenes): HemisphereLight sky #fff6e8 / ground #6b4a33 at 1.25k, DirectionalLight #ffffff at 1.6k from (−300, 700, 900), DirectionalLight #ffe9d0 at 0.5k from (400, −200, 600). k = 0.92 inside, 1 in front.
- **Contact shadow:** a Sprite with a 128 px radial gradient, rgba(20,8,2,.55) at the centre to transparent. Scale (1.05L, 0.16L), placed 0.1L under the landing point. Its opacity rises as the plane descends.

### Landing spots
- Six spots in the 1440×900 interior frame, as (x, shelf surface y): (714,168) top shelf, (730,443) on top of the arch, (716,868) bottom shelf, (742,287) on top of the rolled plan, (690,166) and (748,866).
- They are used in order. After six, planes stack 6 frame-px higher on the same spots.
- A spot is skipped if its screen y, minus 0.35L, would sit under the nav bottom (+30 px in the stacked layout), or if it is off-screen.
- x is clamped inside the visible opening: max offset = (W(1 − cos OPEN_DEG) × 1.1 − 0.45L) / coverU around frame x 720.
- **Frame to world:** screen sx = (fx − 720)·coverU + vw/2, sy = (fy − 450)·coverU + vh/2. At depth z = −40 (40 px inside the cupboard), world x = (sx − vw/2)(D − z)/D and world y = (vh/2 − sy)(D − z)/D. Add 0.11L to y so the keel rests on the shelf.
- **Landed pose:** Euler(x 0.3, y yaw, z 0.04, order YXZ), with yaw cycling through −0.62, −0.45, −0.75, −0.52, −0.68, −0.4. The nose points right (the way it flew in), and the top tilts toward the viewer.

### Flight paths
Cubic Bézier P0→P3, alternating per flight.
| Point | Even flights: low from the left | Odd flights: glide from top-left behind the nav |
|---|---|---|
| P0 | (−vw/2 − 1.4L, −0.2vh, 520) | (−vw/2 − 1.0L, vh/2 + 0.5L, 480) |
| P1 | (−0.24vw, −0.08vh, 640) | (−0.26vw, 0.3vh, 600) |
| P2 | (land.x − 0.15L, land.y + 0.3L, 420) | (land.x − 0.15L, land.y + 0.6L, 420) |
| P3 | land + (0, 0.06L, 0) | land + (0, 0.06L, 0) |
| Duration | 800 ms | 1060 ms |

- **Progress:** s = 1 − (1 − t)^2.1, a decelerating glide.
- **Orientation:** forward f = the normalised Bézier derivative. With up = normalize(0, 1, 0.85), z = normalize(f × up) and u = z × f; makeBasis(f, u, z). Then roll around local x by bank = (−0.32 on even flights / +0.28 on odd flights)·(1 − s) + sin(t·π·3.2)·0.13·(1 − t). From s 0.62 to 1, slerp to the landed pose with smoothstep.
- **Layer handoff:** the plane starts in the front scene, drawn above the doors. Each frame, compare its z with the door surface at its x. With W = vw/2 and a = the current open angle, the door free edge sits at |x| = W − W·cos a. For |x| at or beyond that, door z = ((W − |x|)/(W·cos a))·W·sin a. When the plane's z falls 6 px below that, move it to the inside scene, rendered under the doors. The door then correctly occludes it as it enters the opening.
- **Settle (240 ms):** y offset = 0.06L(1 − k) − sin(kπ)·0.018L, plus a rock around the nose axis of sin(2πk)·0.05(1 − k). Shadow at full opacity.
- **Collecting:** landed planes stay. Closing hides them behind the doors, and the next opening adds one more.
- **Rendering:** a single rAF loop renders both renderers only when something changed (a needsRender flag). Both use alpha, antialias and a transparent clear colour.

### Load reveal (once)
- Elements with class .rv start at opacity 0 and translateY(10px). When body gets class "ready" (after two rAFs, with a 1.5 s safety timeout), they transition to opacity 1 and no transform over 0.9 s with cubic-bezier(.2,.7,.2,1).
- Staggered delays: nav links 0.08 s, CTA 0.12 s, copyright 0.15 s, Product column 0.2 s, tagline 0.25 s, Company 0.28 s, "Orrel" emboss 0.35 s, Legal 0.36 s, "Studio" emboss 0.4 s, logo 0 s.
- Reduced motion shows everything at once.

---

## 10. Stacked layout (phones, portrait tablets, landscape phones)

### Nav
- Height auto, padding 14u 16u 0, flex-wrap wrap, items at the top.
- Logo text 21u with the mark at 26u. CTA font max(11.5px, 12u), height max(28px, 28u), padding 0 13u.
- The link bands move to a second row: top 58u, height 24u. Links font max(12px, 13u) with gap 22u.

### Doors
- **Copy:** left 16u, top 112u. Copyright max(11px, 10.5u). Tagline max(12px, 13u), line-height 18u, no left margin.
- **Links:** one vertical stack of the three column groups at left 44u, top 112u, gap 18u. Headings and links max(12px, 12.5u), link line-height max(20px, 21u), auto widths.
- **Embossed wordmarks:** bottom 22u.
  - Left: left 10u, width min(180u, 50vw − 24u), height 70u.
  - Right: left 22u, width min(168u, 50vw − 30u), height 70u.
- **Handles:** vertically centred (bottom: 50vh − 60u), width max(28px, 26u), height 120u, 10u from the seam. Inner mark 12u wide at bottom 12u.

### Landscape phones (max-height 520px), overriding the above
- --u = min(100vh/420, 1.2px). The nav no longer wraps, and the link bands sit back on the first row (top 0, height 56u).
- Copy and links at top 70u. Links become a row with gap 18u, starting at max(44u, 46px) from the seam so they clear the handle.
- Handles: bottom 50vh − 50u, height 100u.

### Verified
Checked automatically at 32 sizes from 320×568 to 2560×1440, closed and open: nothing outside the viewport, no overlaps, nothing crossing the seam, all text at least 11 px, and touch targets at least 24 px.

---

## 11. Acceptance checklist

- On load: two closed paper doors fill the screen with a centre seam. Dark-brown pill handles sit 21u either side of the seam. The deboss-embossed "Orrel" (with the chevron mark) and "Studio" run along the bottom. The copyright and tagline are top-left, the three link columns top-right, and the nav is on top. The UI fades up once.
- Clicking a handle: a 0.3 s press-in, then both doors swing open over 0.47 s, hinged on the outer edges, with visible paper edge thickness and darkening free edges. The handles turn cream, the dark interior brightens to show five shelves, and the nav words over the gap turn light.
- About 0.6 s later a grid-textured paper airplane enters from the left, passes in front of the left door, turns into the gap and settles on a shelf with a shadow and a tiny rock. Each later opening adds another plane, alternating between the low path and the top-left path.
- Clicking again: a 0.4 s ease-in slam with a tiny overshoot and spring back by 0.57 s. The interior goes dark and the handles go brown.
- Reduced motion: instant states, with airplanes appearing already landed.
- Responsive at every phone, tablet and desktop size, as described above.