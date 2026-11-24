# ORBE — Future Mode · hero recreation brief

Recreate this page exactly as described: a single self-contained `index.html` (inline CSS and JS, fonts embedded as base64 WOFF2, everything else loaded from the URLs below). It is a one-screen, non-scrolling, full-viewport futuristic hero. A black sci-fi HUD bezel frames a night sky above the clouds, where violet aurora ribbons whip across the sky (a looping video). A huge white geometric headline, "FUTURE MODE", scrolls sideways behind a glass 3D figure whose head is a glowing cyan halo ring with a planet orbiting inside it. "NEW" and "ERA" sit in the bottom corners, a chamfered "DISCOVER" button sits bottom centre, and the cursor leaves a liquid ribbed-glass trail through the sky while the figure turns to look at it.

The page title is `ORBE — Future Mode` and the favicon is blank (`<link rel="icon" href="data:,">`). Language: `en`.

---

## 1. Assets (use these exact URLs; never re-host, re-encode or compress them)

| Use | URL |
|---|---|
| Sky still plate (2048×1360 PNG, 3:2). Shown through the image proxy at 2048 wide, WebP, q85 | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261105_170816_005f1a54-50e2-4842-b1b8-0b5d062fa432.png&w=2048&q=85` |
| Sky still plate, raw | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261105_170816_005f1a54-50e2-4842-b1b8-0b5d062fa432.png` |
| Sky loop video (Kling 3.0, 1276×720, 24 fps, 5.04 s, 16:9, silent, first frame = last frame) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261105_173304_f896736c-46d1-4e39-996c-3ee39ad7c52f.mp4` |
| Figure on flat chroma green (2048×1360 PNG, same framing as the plate). Placeholder until the 3D model loads. Through the proxy at 2048 wide, WebP, q92 | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261105_170812_0c57a015-bd35-401b-8233-f62bc609252f.png&w=2048&q=92` |
| 3D glass figure (Tripo H3.1, GLB, ~14.7 MB, ~200k faces, PBR textures) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261105_173920_6c4560d8-436c-4a04-a8c6-79224e8b156e.glb` |
| three.js r160 (ES modules, via import map) | `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js` and addons from `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/` (GLTFLoader.js, RoomEnvironment.js) |

All Higgsfield/CloudFront and `images.higgs.ai` URLs send `Access-Control-Allow-Origin: *`. Load every image, video and GLB that WebGL touches with `crossOrigin = "anonymous"`. The plate `<img>` carries `crossorigin="anonymous"`.

### Fonts
- **Share Tech Mono** 400, latin subset: `https://fonts.gstatic.com/s/sharetechmono/v16/J7aHnp1uDWRBEqV98dVQztYldFcLowEF.woff2`
- **Share Tech** 400, latin subset (used for the digit zero only): `https://fonts.gstatic.com/s/sharetech/v23/7cHtv4Uyi5K0OeZ7bohU8H0JmA.woff2`

Embed both as base64 `data:font/woff2` URLs under one family named **"Orbe Mono"**:
1. Face 1: Share Tech Mono, no `unicode-range`.
2. Face 2: Share Tech, `unicode-range: U+0030`. It is declared second, so every `0` renders as an unslashed zero while all other glyphs stay Share Tech Mono.

Both faces use `font-display: block`. The stack is `"Orbe Mono", ui-monospace, monospace`. All text on the page uses this family. The big words (FUTURE MODE, NEW, ERA) are not text: they are vector outlines (see §5 and the appendix).

### Colours
| Token | Value | Use |
|---|---|---|
| ink | `#f3f6ff` | all text, headline, NEW/ERA, labels |
| cyan | `#5ef3ff` | button chip, button edge line, hover accents, focus ring |
| bezel | `#030409` | HUD frame |
| page background | `#0b0f3a` | `html, body` (behind everything) |

`html, body`: height 100%, `overflow: hidden`, margin 0, `-webkit-font-smoothing: antialiased`, `box-sizing: border-box` everywhere.

---

## 2. Coordinate system and layers

Everything was measured on a **2048 × 1360 mockup frame (3:2)**, and every number below is in those frame units. There are two ways of mapping frame units to the screen:

- **Cover frame**, for the sky and the figure. A 2048×1360 box centred in its stage, scaled to cover it: `--u = max(100cqw / 2048, 100cqh / 1360)`, with the stage as a size container (`container-type: size`). The box is `2048u × 1360u` at `left: 50%; top: 50%; transform: translate(-50%, -50%)`. On wide or tall screens it crops and never letterboxes.
- **Pinned frame**, for all text and UI. It fills the viewport (`inset: 0`, no transform), with `--u = min(100vw / 2048, 100vh / 1150)`. The headline is anchored to the top, the words and button to the bottom, and the side copy to the vertical centre, so nothing is ever cropped. At exactly 3:2 the two units are equal and the layout matches the mockup pixel for pixel.

The layers are full-viewport absolute boxes (`inset: 0; overflow: hidden`), bottom to top:

1. **stage-bg** (cover frame). The plate `<img>` (object-fit cover), a hidden `<video>` (2×2 px, opacity 0, used only as a texture), and the WebGL sky canvas (fades in over 1 s once it has drawn).
2. **stage-hl** (pinned). The headline marquee. It sits *under* the figure.
3. **stage-fig** (cover frame). The keyed-green placeholder canvas, plus the three.js canvas (fades in over 1.4 s while the placeholder fades out over 1.4 s).
4. **stage-ui** (pinned). The side copy, NEW, ERA and the DISCOVER button. It sits *over* the figure.
5. **HUD** (`position: fixed; inset: 0; z-index: 10; pointer-events: none`, except its buttons). It has its own unit `--h = min(100vw / 2048, 100vh / 1360)`.

A visually hidden `<h1>` reads "Future Mode — a new era by ORBE".

---

## 3. HUD bezel (pinned to the viewport edges)

A full-viewport SVG whose `viewBox` is the viewport in px, redrawn on every resize. It is one `<path>` filled `#030409` with `fill-rule: evenodd`: an outer rectangle (the whole viewport) minus an inner "window" shape. Let `h` be the HUD unit (`min(W/2048, H/1360)`; on phones ≤820 px, `W/860`), `cx = W/2` and `k = 7h` (corner softening). The window has:

- **Edges:** left `L = 20h`, top `T = 20h`, right `R = W − 20h`, bottom `B = H − 30h`. Outer corners are quadratic-rounded with radius `30h`.
- **Top notch (hangs down from the top edge, centred).** The edge runs to `cx − 220h`, then a 45°-ish chamfer goes down to `(cx − 188h, T + 30h)`. The notch floor runs to `cx + 190h`, then the chamfer goes back up to `(cx + 222h, T)`. Each notch corner is softened with a quadratic curve of size `k` (`0.7k` along the diagonal).
- **Bottom notch (rises from the bottom edge, centred).** From `cx + 232h` on the bottom edge, a chamfer rises to `(cx + 190h, B − 37h)`. The notch ceiling runs to `cx − 188h`, then the chamfer goes down to `(cx − 230h, B)`, with the same `k` softening.
- **Side bulges (desktop only), on both sides.** Centred vertically at `bc = H × 577/1360`. The window edge steps inward by `26h` between `bc − 247h` and `bc + 247h`, with straight chamfers `52h` tall at each end, so the black bezel is thicker there.
- **Corner brackets** (stroke `#cfd6e6`, width `max(1, 2h)`, no fill). An L in each viewport corner, offset `5h` from the edges, each arm `14h` long.
- **Side rails (desktop only).** Vertical lines at `x = 20h` and `x = W − 20h` from `bc − 180h` to `bc + 208h`. Stroke `#cfd6e6`, width `max(.8, 1.2h)`, opacity .55. A dot of radius `3h` (fill `#7f8aa6`) sits at each end.

**HUD text** (Orbe Mono, `23h`, colour ink, `line-height: 1`, `white-space: pre`):
- **Brand tab:** "ORBE", centred in the top notch at `top: 14h`, shifted `−6h` from centre (`translateX(calc(-50% − 6h))`).
- **Coordinates:** "X.0052  //  Y.0053" (two spaces each side of `//`), at `21.3h`, centred, `bottom: 27h`, in the bottom notch. On `pointermove` they update to `X.` + clientX and `Y.` + clientY, each rounded and zero-padded to 4 digits (last 4 kept).
- **MENU:** a `<button>` at `right: 41h; top: 42h`, `23h`. Hover turns it cyan.
- **Motion toggle (top-left).** A `<button>` at `left: 45h; top: 40h`, flex with gap `8h`, holding:
  - a badge SVG `68h × 22h`, viewBox 0 0 68 22: a rounded rect `x1 y1 w66 h20 rx5`, fill `#0a0c14`, stroke ink 1.4; four slanted parallelogram stripes in ink (`M8,19 L14,3 H19 L13,19Z`, then the same shifted +12, +24 and +36 in x); a dot `cx60 cy11 r2.4`;
  - the label "ON".

  Clicking it toggles the class `paused` on `<html>`. That pauses the marquee, the sky loop, the figure loop and the video. The label switches to "OFF", and `aria-pressed` and `aria-label` ("Motion on"/"Motion off") update with it. Hovering the label turns it cyan.

---

## 4. Sky: Kling loop in WebGL with a cursor "liquid glass" trail

**Source.** The `<video>` (`muted loop playsinline preload="auto"`, `crossOrigin = anonymous`) starts playing on load; its `src` is set in JS. Until it fires `playing`, the plate image is the texture. After that the video is the texture, re-uploaded every frame once `readyState ≥ 2`. Because the video is 16:9 and the canvas is 3:2, the texture's x is sampled as `0.5 + (x − 0.5) × cover`, where `cover = (2048/1360) / (videoWidth/videoHeight)`. That is a centre crop, so the video's centre equals the plate exactly. For the plate, `cover = 1`. Upload with `UNPACK_FLIP_Y_WEBGL = true`.

**Canvas.** It fills the cover frame. Its backing size is the CSS size, capped to 1600 px wide (same aspect). The WebGL context uses `alpha: false, antialias: false`.

**Trail buffer.** Two 256×170 RGBA textures with framebuffers (ping-pong). Each frame:
- decay the previous value: `o = max(o × 0.972 − 0.0035, 0)`;
- add a soft capsule along the segment from the previous pointer position to the current one: `o += smoothstep(0.075, 0, d) × amt`, where `d` is the distance to the segment measured with the x axis scaled by 1.506 so the brush is round on screen;
- clamp to [0, 1].

Pointer position is in canvas UV with y flipped. `amt` grows with pointer speed: on each `pointermove`, `amt = min(1, amt + hypot(movementX, movementY) / 40)`. The trail pass uses `amt × 0.55`, and after each frame `amt *= 0.82`. Before the first move nothing is drawn.

**Sky shader** (per pixel `v` in 0..1):
- `t` = trail value. Gradient `g = (t(v ± 1.5/256 in x), t(v ± 1.5/170 in y))`, each as a difference (right − left, up − down).
- Ribbed field: `rib = ( sin(v.y·180 + time·2.2 + sin(v.x·70 + time)·2.4), cos(v.x·150 − time·1.7 + sin(v.y·60)·2.2) )`.
- Offset: `off = g·0.05 + rib·0.013·smoothstep(0, .6, t)`.
- Chromatic split: red sampled at `v + off·1.25`, green at `v + off`, blue at `v + off·0.75` (sample UVs clamped to .001–.999).
- Inside the trail, mix toward `c·(1.08, .98, 1.15) + (.05, .03, .09)` by `smoothstep(0, .5, t)` (a faint violet glass tint).
- Add an edge glint `(.7, .9, 1)·|g|·0.12`.
- Add ribbed shading `(.75, .7, 1)·dot(rib, (.55, .83))·0.05·smoothstep(0, .5, t)`, so the glass ribs show even over flat sky.

The result reads as a tube of ribbed, refracting glass dragged through the sky, rippling the aurora and clouds behind it and fading out over about a second.

**Robustness.**
- On `webglcontextlost`, stop drawing and hide the canvas so the plate shows.
- With reduced motion, ignore the pointer and draw the plate only (no video).

---

## 5. Headline marquee: "FUTURE MODE" (behind the figure)

**Look.** A custom monoline geometric display face in ink `#f3f6ff`:
- **Strokes:** 30 units thick on a 189-unit cap height (cap top at frame y 122.5, baseline at 311.5).
- **Corners:** square, with selectively rounded outer corners.
- **Letterforms:**
  - **F:** top and middle bars only, plus the stem.
  - **U:** an open U with rounded bottom corners.
  - **T:** a top bar plus a diagonal from top-left into the stem.
  - **R:** a top bar with a rounded top-right corner, a short right stem, and a diagonal leg into a vertical tail.
  - **E:** three bars with a rounded top-left corner.
  - **M:** stems linked by diagonals.
  - **O:** a perfect ring.
  - **D:** a top bar, a diagonal down to the right and a bottom bar, like a "Ↄ" closed at the right.

It is drawn as SVG (outlines in the appendix), not a font.

**Placement.** A box at `left: 0; top: 100u; height: 260u; width: 8000u` (pinned frame). Inside it, an SVG with `viewBox="0 100 8000 260"` and `preserveAspectRatio="xMinYMin meet"`, so 1 SVG unit = 1u.

**Track.** One period is 2352 units wide and contains the letters plus the small index labels. The period is drawn three times (x 0, 2352 and 4704). Letter positions within a period, in frame x (add 20 to the mask x values in the appendix):

| Glyph | x range |
|---|---|
| F | −87 … 89 |
| U | 108 … 291 |
| T | 312 … 523 |
| U | 540 … 726 |
| R | 753 … 937 |
| E | 959 … 1135 |
| (word gap) | |
| M | 1276 … 1537 |
| O | 1553 … 1751 |
| D | 1767 … 1947 |
| E | 1948 … 2124 |

**Animation.** `transform: translateX(0 → −2352px)` (SVG user units), `34 s linear infinite`, so the words drift left continuously and seamlessly. Paused by the toggle, and off with reduced motion.

**Index labels** (in the track, Orbe Mono 24 units, ink; `x`, baseline `y` in frame units):
- `G_021` (185, 268)
- `G_020` (312, 308)
- `G_021` (618, 268)
- `G_018` vertical at (778, 310), rotated −90° so it reads bottom-to-top
- `G_005` (993, 268)
- `G_005` (930, 352)
- `G_0013` vertical at (1338, 310)
- `G_003` (1605, 253)
- `G_004` (1768, 268)
- `G_005` (1963, 268)

---

## 6. The 3D glass figure

**Placement.** three.js r160 `WebGLRenderer` on a transparent canvas filling the cover frame (`alpha: true, antialias: true, powerPreference: 'high-performance'`, pixel ratio capped at 1.5).
- **Camera:** an **orthographic camera in frame units**: left 0, right 2048, top 0, bottom −1360, near −6000, far 6000, z = 2000. Frame x runs right and frame y runs downward as negative world y.
- **Fit:** the model is fitted to the figure's 2D bounding box on the mockup, **x 584–1380, y 269–1315**:
  1. Load the GLB and rotate it **−90° about Y** (Tripo exports it facing +X).
  2. Centre it on its bounding box.
  3. Scale it uniformly so its height equals 1046 units (1315 − 269).
  4. Place the pivot at (982, −792).

**Renderer.** sRGB output, ACES Filmic tone mapping, exposure **0.82**, clear alpha 0. The environment is `RoomEnvironment` through PMREM (sigma 0.04).

**Lights:**
| Light | Colour | Intensity | Position |
|---|---|---|---|
| Hemisphere | `#d8e6ff` / ground `#2a1b6b` | 1.1 | — |
| Key directional | `#ffe2f4` | 1.5 | (−500, 700, 900) |
| Cyan rim directional | `#5ef3ff` | 2.4 | (900, 300, −700) |
| Violet rim directional | `#9b5cff` | 2.0 | (−900, 200, −600) |

**Material.** Replace every mesh's material with `MeshPhysicalMaterial`. Keep the GLB's base-colour `map` and `normalMap` (normalScale 1). Then set:
- colour `#a9b2ff`, roughness .25, metalness 0;
- clearcoat 1, clearcoatRoughness .08;
- iridescence 1, iridescenceIOR 1.4, thickness range 200–700;
- sheen .5, sheenRoughness .3, sheenColor `#9fe9ff`;
- emissive `#30227a` at .5, envMapIntensity .7;
- `transparent`, opacity .88.

**Shader additions** (via `onBeforeCompile`, after the emissive map). `vObj` is the vertex position in geometry space, and `yf` is height normalised by the geometry's bounding box: 0 at the bottom, 1 at the top of the ring.
- **Open the halo ring.** Tripo fills the ring with a membrane, so cut it out. The ring lies in the model's Y–Z plane, centred at (z −0.035, y 0.328) with inner radii 0.152 (z) and 0.112 (y). Discard fragments inside that ellipse, except the planet (a circle at (−0.031, 0.339), r 0.046) and the small moon (a circle at (−0.112, 0.294), r 0.02).
- **Fresnel rim.** `rim = (1 − |normal.z|)²`. Add emissive `mix((.35, .95, 1), (.66, .4, 1), smoothstep(.2, .8, yf)) × rim × 1.8`: cyan low on the body, violet higher up.
- **Warm core.** Add `(1, .62, .55) × .55 × smoothstep(.18, .42, yf) × (1 − smoothstep(.52, .68, yf)) × |normal.z|^2.5`, a peach glow in the chest where the surface faces the viewer.
- **Cyan halo.** Let `ring = smoothstep(.69, .73, yf)`.
  - Tint the base colour toward `×(.08, .62, 1)` by `ring` (60% less on the planets).
  - Add emissive `(.06, .7, 1) × ring × (.9 + 2.2·rim) × pulse` (50% less on the planets), where `pulse = .85 + .15·sin(time·2.2)`.

**Motion** (per frame; easing `k = 1 − exp(−dt·4.2)`, with dt clamped to 0…0.05 s):
- Measure the pointer from the figure's **head** on screen: x at the pivot, frame y 450 (the ring centre). Then `dx = clamp((clientX − headX) / (innerWidth/2), −1, 1)` and `dy` likewise with innerHeight.
- **Turn:** yaw target `0.62·dx + 0.025·sin(t·0.6)` (up to ~35° toward the cursor, plus a tiny breath).
- **Head tilt:** pitch target `0.2·dy` (looks up or down at the cursor).
- **Lean:** roll target `−0.045·dx` (into the turn).
- **Parallax:** x drift target `14·dx` units.
- **Bob:** y `+ 5·sin(t·0.9)`.
- When the pointer leaves the window, the targets return to 0.
- Paused by the toggle; with reduced motion, render once, static.

**Placeholder and loading.** Until the GLB arrives, a canvas in the same cover frame shows the green-screen figure still, keyed in WebGL:
- `d = g − max(r, b)`, `alpha = 1 − smoothstep(.10, .38, d)`, spill clamp `g = min(g, max(r, b)·.96)`, premultiplied output.
- When the model is ready, the 3D canvas fades in over 1.4 s and the placeholder fades out over 1.4 s. 2 s later, release the placeholder's GL context (`WEBGL_lose_context`).
- With no WebGL at all, key the same formula once on a 2D canvas (1024×680, from the 1024-wide proxy URL), so the figure always shows.
- On a lost 3D context, stop the loop and hide that canvas.

---

## 7. UI over the figure (pinned frame)

**Side copy.** Orbe Mono `21.4u`, line height `30u`, uppercase, letter-spacing 0, ink. The block's top is at `calc(50% − 101u)`.
- The first line is "+++", with letter-spacing .24em, raised 5u.
- An empty spacer `21u` tall sits between the second and third lines.

| Side | Position | Lines |
|---|---|---|
| Left | `left: 102u`, left-aligned | `+++` / `BEND THE HORIZON` / (spacer) / `ASCEND` |
| Right | `right: 95u`, right-aligned | `+++` / `HOLD THE LIGHT` / (spacer) / `UNFOLDING` |

**NEW and ERA.** Filled ink outlines with `fill-rule: evenodd`. Outlines are in the appendix.
- **NEW:** viewBox 0 0 480 160, box `480u × 160u` at `left: 60u; bottom: 120u`.
- **ERA:** viewBox 0 0 420 160, box `420u × 160u` at `right: 48u; bottom: 120u`.

The glyphs share the headline's style at a 120-unit cap height: "NEW" with a swooping N, and "ERA" with an E whose middle bar is offset, an R like "Ʀ", and an open A.

**DISCOVER button.** A `<button aria-label="Discover">`, box `330u × 102u` at `left: calc(50% − 162u); bottom: 131u`. Its SVG uses `viewBox="862 1127 330 102"`, so the paths below are in frame units:
1. **Body:** octagon `M884,1131 H1170 L1188,1149 V1207 L1170,1225 H884 L866,1207 V1149 Z`, fill `#04060c`, stroke `#04060c` 7, round joins.
2. **Cyan edge line** along the left side and top only: `M871,1196 V1151 L886,1136 H1170 L1181,1147`, stroke `#5ef3ff` 2.2, opacity .9.
3. **Thin dark outline** on the body octagon, stroke `#0a1220` 2, opacity .9.
4. **Chip:** octagon `M1110,1140 H1166 L1180,1154 V1196 L1166,1210 H1110 L1096,1196 V1154 Z`, fill `#5ef3ff`.
5. **Chevrons:** three, `M1124,1167 l6,8 l-6,8`, then the same shifted +10 and +20 in x. Stroke `#0a1a2c` 2.2, butt caps, miter joins.
6. **Label:** "DISCOVER" in HTML, Orbe Mono `26.3u`, letter-spacing .01em, ink, at `left: 62u`, vertically centred.

Hover, with transitions of .5 s `cubic-bezier(.2, .8, .2, 1)`:
- the chip moves `−6px` and widens to `scaleX(1.07)` (origin 1180, 1175);
- the chevrons slide `+8px`;
- the label turns white with a cyan glow (`0 0 10u rgba(94,243,255,.6)`).

Focus-visible shows a 2 px cyan outline, offset 4 px.

---

## 8. Entrance (one Web Animations timeline, run once)

The guard class `js` is set on `<html>` in the head. Under it, everything marked "enter" starts at opacity 0. The timeline starts when fonts are ready and the plate image has loaded (or errored). A **3.5 s failsafe** starts it regardless. Easing for all steps: `cubic-bezier(.16, 1, .3, 1)`, with `fill: backwards`.

| Element | Delay | Duration | From → to |
|---|---|---|---|
| Plate | 0 | 1600 ms | opacity 0, scale 1.06 → 1 |
| Headline | 250 ms | 1300 ms | opacity 0, translateY 18%, clip-path inset(0 0 100% 0) → inset(0 0 −40% 0) |
| Figure placeholder | 450 ms | 1500 ms | opacity 0, translateY 4%, scale .97, blur 12 px → none |
| Left copy | 900 ms | 900 ms | from translateX −24 px |
| Right copy | 950 ms | 900 ms | from translateX +24 px |
| NEW | 1000 ms | 1100 ms | translateY 30% with a bottom-up clip reveal |
| ERA | 1080 ms | 1100 ms | translateY 30% with a bottom-up clip reveal |
| Button | 1250 ms | 900 ms | translateY 20 px, scale .92 |

Then the class `entered` is added. With reduced motion everything is shown at once.

---

## 9. Phone (≤ 820 px)

- **HUD:** unit `h = 100vw/860`, with no side bulges or rails. The same notches, brackets, ORBE, ON, MENU and coordinates.
- **Text layers:** they leave the frame unit and use px:
  - **Headline:** `top: 58px`, height 120 px, box width `8000 × 120/260` px. It still scrolls and fills the width.
  - **Side copy:** `top: 186px`, 11 px on a 14 px line, spacer 8 px, `left: 20px` / `right: 20px`.
  - **NEW:** 150×50 px at `left: 12px; bottom: 114px`.
  - **ERA:** 131×50 px at `right: 12px; bottom: 114px`.
  - **Button:** 212×66 px, centred (`left: 50%; translateX(-50%)`), `bottom: max(34px, env(safe-area-inset-bottom))`. Its label scales with it.
- **Figure stage:** it starts below the copy (`top: clamp(200px, 30svh, 260px)`, down to the bottom). The figure is cover-fitted in that box, so its head and ring sit mid-screen.
- **Sky:** it stays full-viewport behind everything.
- **Scrolling:** none sideways, at 375 px.

## 10. Reduced motion (`prefers-reduced-motion: reduce`)

- No marquee animation.
- No entrance; everything is visible at once.
- No video; the static plate drawn through WebGL, with no trail.
- The 3D figure rendered once, static, facing forward.
- The coordinates still update.

---

## Appendix: exact outline data (SVG path `d`, frame-unit geometry)

**Headline, traced glyphs.** This is one path in "mask space" = frame space minus (20, 105), with even-odd fill. Each traced glyph is that path clipped to its x range (in mask units): U 88–271, T 292–503, U 520–706, M 1256–1517, O 1533–1731, D 1747–1927. Draw each clip through a `<symbol viewBox="x0−1 0 width 220">` placed at the same x, inside `translate(20, 105)`.

```
M 741.234 18.425 C 733.564 21.016, 733.500 21.259, 733.500 47.835 L 733.500 71.609 737.261 79.217 C 744.570 93.999, 744.282 93.814, 813.142 128.005 C 838.639 140.665, 863.775 153.156, 869 155.762 C 876.492 159.498, 878.847 161.195, 880.143 163.789 C 881.287 166.081, 889.925 173.278, 908.643 187.534 L 935.500 207.989 1025.750 207.995 L 1116 208 1116 193 L 1116 178 1079.250 177.891 C 1041.674 177.779, 1029.642 177.665, 1010.750 177.241 L 1000 177 1000 168.500 L 1000 160 992.201 160 L 984.402 160 984.810 156.500 C 985.173 153.396, 984.959 153, 982.918 153 C 980.760 153, 980.730 153.082, 982.435 154.329 C 983.942 155.431, 984.054 156.030, 983.091 157.829 C 980.384 162.887, 975.755 159.293, 976.186 152.467 C 976.489 147.670, 976.611 147.489, 979.750 147.187 C 981.576 147.011, 983 147.339, 983 147.937 C 983 148.521, 983.466 149, 984.035 149 C 984.737 149, 984.726 148.356, 984 147 C 982.723 144.614, 977.839 144.284, 976.032 146.462 C 975.280 147.368, 974.948 150.219, 975.159 153.964 L 975.500 160.004 972.250 160.002 L 969 160 969 143.200 C 969 131.467, 969.362 126.038, 970.200 125.200 C 971.111 124.289, 988.689 124, 1043.200 124 L 1115 124 1115 109.081 L 1115 94.161 1043.535 93.831 C 978.006 93.527, 971.930 93.359, 970.379 91.808 C 968.364 89.793, 967.379 60.882, 969.134 55.266 C 971.548 47.540, 966.702 48, 1045.635 48 L 1116 48 1116 33 L 1116 18 1079.750 17.898 C 1059.813 17.842, 1026.175 17.729, 1005 17.648 L 966.500 17.500 960.831 20.373 C 953.545 24.065, 946.071 31.528, 942.397 38.780 L 939.500 44.500 939.224 115.773 L 938.949 187.046 925.525 176.798 L 912.101 166.551 910.534 159.525 C 909.672 155.661, 907.654 150.206, 906.051 147.403 C 899.844 136.556, 897.653 135.243, 829.205 101.361 C 757.190 65.713, 763 69.737, 763 55.501 L 763 47.938 820.750 48.219 C 885.100 48.532, 882.486 48.242, 885.985 55.470 C 887.861 59.344, 888 61.606, 888 88.187 L 888 116.742 892.750 115.860 C 902.414 114.065, 910.239 108.284, 914.808 99.563 C 917.371 94.673, 917.473 93.830, 917.819 74.870 C 918.103 59.318, 917.848 53.956, 916.593 49.055 C 912.389 32.649, 899.967 21.439, 883.371 19.078 C 873.358 17.653, 745.260 17.065, 741.234 18.425 M 1958.786 18.030 C 1944.136 20.498, 1931.874 33.493, 1928.872 49.733 C 1928.254 53.080, 1927.965 64.943, 1928.173 78.467 C 1928.594 105.785, 1929.771 109.934, 1939.659 118.971 C 1949.231 127.720, 1952.295 128.418, 1982.750 128.796 L 2009 129.121 2009 113.561 L 2009 98 1987.016 98 L 1965.032 98 1961.766 95.082 L 1958.500 92.164 1958.500 73.601 L 1958.500 55.038 1961.767 51.769 L 1965.034 48.500 1987.017 48.196 L 2009 47.892 2009 33.098 L 2009 18.304 1998.344 17.652 C 1984.708 16.818, 1964.854 17.007, 1958.786 18.030 M 0 33 L 0 48 35.073 48 L 70.147 48 69.861 33 L 69.575 18 34.788 18 L 0 18 0 33 M 88.759 71.250 C 88.616 100.538, 88.855 126.975, 89.289 130 C 90.600 139.136, 94.812 146.520, 105.594 158.587 C 111.042 164.684, 121.036 176.042, 127.802 183.825 C 142.389 200.606, 144.755 202.594, 154 205.833 C 158.328 207.349, 230.647 207.057, 237.667 205.495 C 254.827 201.677, 267.863 186.957, 270.939 167.923 C 271.587 163.913, 271.976 134.548, 271.976 89.750 L 271.975 18 256.488 18 L 241 18 241 91.852 L 241 165.704 238.750 169.010 C 233.490 176.739, 234.811 176.500, 197.308 176.500 L 163.764 176.500 156.210 168.500 C 133.893 144.867, 120.248 128.988, 119.639 125.943 C 119.287 124.187, 119 99.181, 119 70.375 L 119 18 104.009 18 L 89.018 18 88.759 71.250 M 292 33.500 L 292 49 316.750 49.005 C 340.629 49.010, 341.630 49.089, 345.204 51.255 C 350.011 54.169, 450.945 154.775, 452.112 157.815 C 452.600 159.088, 453 170.676, 453 183.565 L 453 207 468.593 207 L 484.187 207 483.843 179.250 L 483.500 151.500 480.215 144.563 C 477.226 138.252, 474.521 135.266, 450.215 111.454 C 435.522 97.059, 410 71.890, 393.500 55.524 C 354.293 16.634, 357.187 18.021, 315.250 18.008 L 292 18 292 33.500 M 388.617 29.251 C 388.681 35.438, 388.794 42.413, 388.867 44.750 L 389 49 446.500 49 L 504 49 504 33.500 L 504 18 446.250 18.001 L 388.500 18.003 388.617 29.251 M 520 72.790 C 520 140.272, 519.579 137.818, 534.208 155.500 C 573.054 202.452, 571.101 200.301, 578 203.742 L 584.500 206.985 625.201 206.992 C 651.172 206.997, 667.819 206.599, 671.201 205.891 C 683.284 203.363, 696.339 193.318, 701.374 182.675 C 707.080 170.614, 707 171.899, 707 91.790 L 707 18 692.500 18 L 678 18 677.990 34.750 C 677.985 43.963, 677.709 76.925, 677.377 108 C 676.787 163.221, 676.725 164.589, 674.637 168.449 C 670.281 176.499, 670.277 176.500, 629.331 176.500 L 593.161 176.500 590.473 174 C 583.946 167.929, 551.382 129.607, 550.289 126.710 C 549.424 124.418, 549.077 113.352, 549.074 88 C 549.072 68.475, 549.055 44.737, 549.035 35.250 L 549 18 534.500 18 L 520 18 520 72.790 M 1282.219 20.379 C 1270.370 24.891, 1263.308 31.662, 1258.785 42.847 L 1256.500 48.500 1256.218 127.750 L 1255.936 207 1270.950 207 L 1285.963 207 1286.232 130.413 L 1286.500 53.826 1289.306 51.413 C 1291.771 49.292, 1293.105 48.997, 1300.306 48.976 L 1308.500 48.953 1345.802 86.726 C 1366.318 107.502, 1383.756 125.948, 1384.552 127.718 C 1385.734 130.345, 1386 137.916, 1386 168.968 L 1386 207 1401.040 207 L 1416.079 207 1415.790 163.147 L 1415.500 119.294 1412 112.599 C 1408.985 106.831, 1402.955 100.346, 1368.500 65.820 C 1320.462 17.682, 1322.115 18.846, 1301 18.307 C 1289.780 18.020, 1287.857 18.232, 1282.219 20.379 M 1353 33.500 L 1353 49 1387.599 49 C 1416.665 49, 1422.716 49.246, 1425.440 50.538 C 1427.223 51.384, 1441.734 65.222, 1457.687 81.288 C 1484.264 108.055, 1486.789 110.893, 1487.846 115.193 C 1488.628 118.375, 1489 133.910, 1489 163.443 L 1489 207 1503.534 207 L 1518.069 207 1517.784 155.250 L 1517.500 103.500 1514.638 97.760 C 1511.078 90.622, 1501.670 80.577, 1469.801 49.888 C 1435.308 16.671, 1438.863 18.044, 1387.250 18.017 L 1353 18 1353 33.500 M 1611.016 19.534 C 1537.366 32.857, 1507.880 119.752, 1557.677 176.718 C 1596.662 221.315, 1677.779 217.822, 1713.706 170 C 1731.664 146.097, 1737.171 109.409, 1727.081 80.896 C 1717.763 54.565, 1695.419 32.878, 1667.887 23.442 C 1652.820 18.279, 1627.553 16.543, 1611.016 19.534 M 1747 33.395 L 1747 48.904 1772.584 49.202 L 1798.167 49.500 1801.257 53 C 1802.956 54.925, 1824.856 77.356, 1849.923 102.846 C 1877.950 131.347, 1895.952 150.407, 1896.674 152.346 C 1899.552 160.079, 1896.972 169.744, 1890.867 174.099 L 1887.500 176.500 1817.250 176.770 L 1747 177.039 1747 192.020 L 1747 207 1816.364 207 C 1859.362 207, 1887.773 206.612, 1891.109 205.979 C 1907.202 202.927, 1919.552 191.973, 1925.101 175.829 C 1928 167.396, 1928.329 150.179, 1925.751 141.851 C 1923.008 132.990, 1918.250 127.680, 1865.295 74.395 C 1821.985 30.816, 1814.719 23.913, 1809.500 21.395 L 1803.500 18.500 1775.250 18.193 L 1747 17.886 1747 33.395 M 1611.162 51.032 C 1596.187 54.955, 1579.817 66.975, 1572.637 79.321 C 1554.288 110.868, 1566.893 154.919, 1598.838 170.891 C 1610.702 176.823, 1614.123 177.502, 1632 177.476 C 1648.450 177.453, 1648.527 177.442, 1657.500 173.953 C 1695.756 159.079, 1712.730 118.027, 1694.823 83.686 C 1690.014 74.462, 1676.469 61.322, 1666.966 56.661 C 1651.140 48.898, 1628.159 46.580, 1611.162 51.032 M 0.439 99.298 C 0.165 100.012, 0.067 106.875, 0.220 114.548 L 0.500 128.500 34.750 128.784 L 69 129.068 69 113.534 L 69 98 34.969 98 C 7.993 98, 0.834 98.269, 0.439 99.298 M 1943 192 L 1943 207 1976 207 L 2009 207 2009 192 L 2009 177 1976 177 L 1943 177 1943 192
```

**Headline, hand-drawn glyphs.** In mask space; stroke ink 30, no fill, round joins, butt caps.
- **F** (origin x = −107):
  ```
  M69,32.5 H-82.5 A10,10 0 0 0 -92.5,42.5 V206.5 M-92.5,108.5 H68
  ```
- **R:**
  ```
  M896,206.5 V154 L747.5,72 V42.5 A10,10 0 0 1 757.5,32.5 H892.5 A10,10 0 0 1 902.5,42.5 V97
  ```
  plus a round-capped dot `M902.5,90 V97` to round the stem end.
- **E** (FUTURE):
  ```
  M1115,32.5 H963.5 A10,10 0 0 0 953.5,42.5 V181.5 A10,10 0 0 0 963.5,191.5 H1115 M953.5,108.5 H1114
  ```
- **E** (MODE): the same path shifted +989 in x.

**NEW** (viewBox 0 0 480 160, even-odd):
```
M 34.459 19.820 C 28.801 22.473, 22 31.373, 22 36.122 C 22 36.605, 28.275 37, 35.944 37 C 52.445 37, 52.559 37.060, 58.589 49 C 60.673 53.125, 66.498 64.375, 71.535 74 C 76.572 83.625, 84.855 99.600, 89.942 109.500 C 100.272 129.605, 103.029 133.119, 110.736 136.002 C 120.688 139.726, 130.322 137.731, 137.616 130.436 C 144.944 123.108, 145 122.628, 145 66.818 L 145 18 135.009 18 L 125.019 18 124.759 67.141 C 124.472 121.522, 124.708 119.685, 118.303 117.442 C 116.050 116.653, 114.162 113.913, 108.681 103.480 C 68.196 26.418, 67.781 25.714, 60.214 21.280 C 54.032 17.657, 40.682 16.900, 34.459 19.820 M 175.239 19.335 C 170.338 21.112, 165.392 25.476, 162.282 30.767 C 159.620 35.296, 159.485 36.162, 159.158 50.865 C 158.712 70.930, 160.683 76.618, 170.155 82.598 C 176.964 86.896, 181.444 87.190, 228.842 86.452 L 273.184 85.761 272.755 76.630 L 272.326 67.500 226.980 67.240 C 186.536 67.008, 181.438 66.802, 179.817 65.335 C 178.266 63.930, 178 62.042, 178 52.418 C 178 35.553, 173.295 37, 228.135 37 L 273 37 273 27.500 L 273 18 225.750 18.076 C 192.062 18.130, 177.564 18.492, 175.239 19.335 M 285 67.304 L 285 116.607 287.602 121.829 C 294.279 135.227, 299.244 137.411, 324 137.832 C 353.652 138.336, 352.638 138.596, 363.828 127.648 C 368.971 122.617, 373.814 117.285, 374.590 115.800 C 375.746 113.586, 376 104.530, 376 65.550 L 376 18 366 18 L 356 18 356 64.035 C 356 115.491, 356.273 113.473, 348.920 116.415 C 345.865 117.638, 341.185 118, 328.448 118 C 309.675 118, 305.604 117.042, 304.286 112.316 C 303.854 110.767, 303.500 88.912, 303.500 63.750 L 303.500 18 294.250 18 L 285 18 285 67.304 M 433 53.670 L 433 89.339 420.250 102.235 C 404.159 118.510, 405.168 118, 389.050 118 L 376 118 376 128.086 L 376 138.172 392.250 137.836 C 407.791 137.515, 408.700 137.383, 413.077 134.809 C 419.396 131.095, 445.455 103.957, 448.811 97.596 L 451.500 92.500 451.796 55.250 L 452.091 18 442.546 18 L 433 18 433 53.670 M 159 126.992 L 159 137 216.036 137 L 273.072 137 272.786 127.250 L 272.500 117.500 215.750 117.242 L 159 116.983 159 126.992
```

**ERA** (viewBox 0 0 420 160, even-odd):
```
M 322.500 18.417 C 316.733 20.992, 314.320 25.199, 302.952 52.500 C 296.769 67.350, 289.259 85.350, 286.263 92.500 C 283.268 99.650, 278.126 112.025, 274.838 120 C 271.549 127.975, 268.617 135.063, 268.322 135.750 C 267.914 136.702, 270.165 137, 277.776 137 C 286.420 137, 287.839 136.764, 288.304 135.250 C 288.940 133.179, 307.223 88.786, 318.987 60.750 C 325.181 45.986, 327.706 41, 328.988 41 C 331.096 41, 334.974 49.258, 356.570 99.727 L 372.500 136.955 382.750 136.977 C 388.387 136.990, 393 136.711, 393 136.358 C 393 135.515, 376.124 97.445, 353.611 47.500 C 352.372 44.750, 349.814 38.703, 347.929 34.063 C 346.043 29.423, 343.145 24.186, 341.488 22.426 C 336.848 17.495, 328.510 15.735, 322.500 18.417 M 36 20.079 C 29.959 22.810, 25.252 27.451, 22.387 33.500 C 18.842 40.987, 18.838 64.963, 22.381 72.571 C 25.292 78.824, 30.910 83.620, 37.500 85.480 C 42.995 87.031, 80.991 87.447, 116.750 86.348 L 136 85.756 136 76.378 L 136 67 89.071 67 C 32.918 67, 37.357 68.450, 38.263 50.406 C 38.665 42.399, 38.933 41.454, 41.407 39.326 L 44.112 37 90.056 37 L 136 37 136 27.500 L 136 18 88.250 18.022 C 42.396 18.043, 40.321 18.125, 36 20.079 M 156 19.596 C 150.112 23.338, 149.500 25.306, 149.500 40.500 C 149.500 63.587, 150.828 64.825, 195 82.940 C 214.549 90.956, 238.852 102.455, 240.750 104.586 C 242.870 106.966, 243 107.973, 243 122.056 L 243 137 252 137 L 261 137 261 120.178 C 261 99.611, 260.056 96.034, 252.942 89.638 C 250.259 87.226, 245.012 83.986, 241.282 82.438 C 237.552 80.891, 229.325 77.410, 223 74.704 C 216.675 71.997, 202.500 65.982, 191.500 61.336 C 167.057 51.014, 167.608 51.482, 167.885 41.250 L 168 37 203.045 37 L 238.091 37 240.545 39.455 C 242.965 41.874, 243 42.158, 243 59.474 L 243 77.038 245.750 76.396 C 250.183 75.362, 256.160 71.720, 258.411 68.681 C 260.596 65.732, 262.029 44.299, 260.564 36.490 C 259.610 31.402, 254.238 24.224, 249.142 21.229 L 244.500 18.500 201.500 18.254 C 163.648 18.037, 158.201 18.198, 156 19.596 M 20 120.853 C 20 122.973, 19.711 127.473, 19.358 130.853 L 18.715 137 77.358 137 L 136 137 136 127 L 136 117 78 117 L 20 117 20 120.853
```