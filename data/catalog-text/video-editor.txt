# Glaze — "Crafted for Motion": exact recreation brief

Build a single-file landing page (one `index.html`, no build step) for **Glaze**, a fictional programmable video editor. It has three sections stacked vertically, plus a fixed header and a full-screen loader:

1. **Hero** — a pale blue-grey gradient screen with a large live 3D keychain hanging from the top centre (five charms on chains, real rigid-body physics, pushed by the mouse), a huge two-line headline "Crafted for / Motion" anchored bottom-left, and the subtitle with a black "Get Started" button anchored bottom-right.
2. **Logo ticker** — a grey caption and an endlessly drifting row of invented wordmarks.
3. **Timeline → statement** — a dark editor timeline with two video tracks (V1, V2) holding five motion-graphics clips, staggered in time, under a moving orange playhead; below it, a large centred three-line sentence with five empty inline slots. When the sentence scrolls into view while you scroll down, the five clips fly out of the timeline and land, small, inside the sentence. Scrolling back up sends them back onto their tracks.

Everything below is exact. Follow it value for value.

---

## 1. Libraries and assets

| What | Exact source |
|---|---|
| GSAP 3.12.5 (classic script) | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger 3.12.5 (classic script) | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
| three.js 0.169.0 (ES module via import map, key `three`) | `https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js` |
| three addons (import map prefix `three/addons/`) | `https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/` — uses `environments/RoomEnvironment.js`, `geometries/RoundedBoxGeometry.js`, `loaders/FontLoader.js`, `geometries/TextGeometry.js` |
| Rapier 3D physics 0.14.0, compat build (import map key `rapier`) | `https://cdn.jsdelivr.net/npm/@dimforge/rapier3d-compat@0.14.0/rapier.es.js` (call its `init()` before use) |
| Typeface for the 3D letter "G" | `https://cdn.jsdelivr.net/npm/three@0.169.0/examples/fonts/helvetiker_bold.typeface.json` |
| Tile sheet still (3 × 2 grid of six rounded motion-graphics tiles on near-black, 2048 × 1360 source) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261109_062058_badb8004-99df-4227-91bb-ecd9ca4d0adb.png&w=2048&q=85` |
| Tile sheet motion (Kling clip of the same sheet padded to 16:9: 1280 × 720, 24 fps, 5.04 s, loops seamlessly) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261109_065027_c89c0a52-25ea-47a9-9e65-f17ff3ea5daf.mp4` |

The six tiles on the sheet, left to right, top row then bottom row: (1) a puffy pale sky-blue pillow squircle with a glossy tangerine 3D star bulging from it; (2) a deep cobalt tile with the glowing blurred white lowercase word "glaze"; (3) an orange-and-cobalt halftone-dot blob; (4) cobalt/electric-blue vertical light streaks with chromatic fringing behind bold orange "JUST / EDIT"; (5) an orange tile with stacked warped white "MOTION" rows; (6) a liquid chrome blob with cobalt and orange reflections (on the sheet but not used on the page).

## 2. Fonts

All self-hosted woff2 (latin subset) from Fontsource on jsDelivr, `font-display: swap`. In the standalone build every file is base64-embedded as a `data:font/woff2` URL.

| Family | Weight | URL |
|---|---|---|
| Inter Tight | 400 | `https://cdn.jsdelivr.net/fontsource/fonts/inter-tight@latest/latin-400-normal.woff2` |
| Inter Tight | 500 | `https://cdn.jsdelivr.net/fontsource/fonts/inter-tight@latest/latin-500-normal.woff2` |
| Inter Tight | 600 | `https://cdn.jsdelivr.net/fontsource/fonts/inter-tight@latest/latin-600-normal.woff2` |
| Kaushan Script | 400 | `https://cdn.jsdelivr.net/fontsource/fonts/kaushan-script@latest/latin-400-normal.woff2` |
| Unbounded | 700 | `https://cdn.jsdelivr.net/fontsource/fonts/unbounded@latest/latin-700-normal.woff2` |
| Syncopate | 700 | `https://cdn.jsdelivr.net/fontsource/fonts/syncopate@latest/latin-700-normal.woff2` |
| Michroma | 400 | `https://cdn.jsdelivr.net/fontsource/fonts/michroma@latest/latin-400-normal.woff2` |
| Archivo Black | 400 | `https://cdn.jsdelivr.net/fontsource/fonts/archivo-black@latest/latin-400-normal.woff2` |

Body font: Inter Tight, fallback `system-ui, sans-serif`, `-webkit-font-smoothing: antialiased`.

## 3. Head, tokens and scaling

- Title: `Glaze — Crafted for Motion`. `<meta name="viewport" content="width=device-width, initial-scale=1">`, `lang="en"`.
- Global reset: `box-sizing: border-box`, zero margin and padding; links inherit colour with no underline; buttons have no background or border.
- Colour tokens: ink `#111418`; page background `#f4f7fb`; header pill `rgba(234,239,246,.82)`; timeline panel `#12151b`.
- **Scaling unit `--u`**: the design is drawn on a 1536-px-wide frame. `--u = 100vw / 1536`. Inside the hero only, `--u = min(100vw / 1536, 100vh / 864)` so short, wide windows shrink the hero type with the height. Below 820 px width, `--u = 100vw / 390` (phone layout, section 10). Every "u" value below is a multiple of this unit.
- `body` has `overflow-x: hidden`.

## 4. Loader (first thing on screen)

- A fixed full-viewport layer (z-index 50), background `#f4f7fb`, content centred, starting with `clip-path: inset(0 0 0 0)`.
- One line of text: **"Press play on fresh ideas."** — Inter Tight 500, 34u (22 px on phones), letter-spacing −0.01em, inside a paragraph with `overflow: hidden` so the line can slide in and out of a mask.
- Sequence: after 0.15 s the line rises into view from `yPercent 110` over 0.7 s, `expo.out`. The page then waits until **both** (a) the 3D keychain has finished building and rendered its first frame and (b) 1.4 s have passed since load. Then the exit plays: the line leaves upward to `yPercent −110` over 0.55 s `expo.in`; overlapping by 0.15 s, the whole layer wipes upward to `clip-path: inset(0 0 100% 0)` over 0.8 s `expo.inOut`. The page entrance (section 6) starts at the start of that wipe; the layer is removed when the wipe ends.
- Failsafe: if the 3D never becomes ready, the exit fires anyway at 6 s.
- With `prefers-reduced-motion: reduce` the loader is not shown at all.

## 5. Header (fixed, above everything except the loader)

- Fixed at top 24u, left 90u, right 90u; a flex row with the two pills pushed to opposite ends, aligned to the top. The header itself ignores the pointer; the pills accept it. z-index 20.
- **Pills**: height 64u, radius 16u, background `rgba(234,239,246,.82)` with a 14 px backdrop blur.
- **Left pill**: width 708u, horizontal padding 22u, `overflow: hidden`, width transition 0.6 s `cubic-bezier(.7,0,.2,1)`. Contents in order:
  - Logo "Glaze" + a dot: Kaushan Script 31u, line-height 1, letter-spacing −0.01em, the whole logo skewed −6° horizontally. The dot is a 4u filled circle in the text colour, 3u after the word, sitting on the baseline. `aria-label="Glaze home"`.
  - Nav, 52u after the logo, gap 25u, Inter Tight 18u, colour `#1e2128`: **Co-Create, Product, Blocks, Templates, Pricing, Blog**. Hover: opacity 0.55 (0.2 s). The nav fades with a 0.35 s opacity transition.
  - A "More" button pushed to the far right of the pill: 30u square, holding a vertical two-dot glyph (two 2-unit-radius circles 12 units apart in a 4 × 16 viewBox), drawn 4u × 16u.
- **Right pill**: height 60u, 2u lower than the left pill (margin-top 2u), padding 0 13u 0 22u, gap 18u, Inter Tight 18u: a plain **Login** link, then **Try for free** as a dark chip (background `#16191f`, text `#fafafa`, radius 9u, padding 8u 16u; hover background `#2b3140`).
- **Compact state**: once `scrollY > 40`, the left pill animates to width 250u (just logo + dots) and the nav fades to opacity 0 and stops taking clicks. Scrolling back to the top restores it.

## 6. Section 1 — Hero

### Layout
- Full viewport height (`100vh`, min 560 px), `overflow: hidden`, background a vertical linear gradient: `#dbe3ee` at 0%, `#eef2f8` at 62%, `#f4f7fb` at 100%.
- A `<canvas>` fills the hero absolutely (pointer-events none, aria-hidden) — the 3D keychain.
- Above it (z-index 2), the content layer fills the hero as a flex row aligned to the **bottom**, with `space-between`, a 40u gap and padding 0 90u 64u (90u side margins, 64u from the bottom). Pointer-events pass through except on the button.
- **Left, bottom — Headline** `Crafted for` / `Motion` (a line break after "for"): Inter Tight 500, **128u**, line-height 0.94, letter-spacing −0.03em, no wrapping, colour ink, left-aligned. The text sits in an inner inline-block span inside a block mask with `overflow: hidden` (padding-bottom 0.08em, margin-bottom −0.08em so descenders aren't clipped).
- **Right, bottom — a column** (left-aligned content, 10u extra bottom padding so it sits on the headline's baseline):
  - **Subtitle** `Glaze, the first video editor` / `you can build on.` (line break after "editor"): 23.5u, letter-spacing 0.01em, line-height 1.15.
  - **Button** `Get Started`: 28u below, height 48u, horizontal padding 29u, radius 13u, background `#16191f`, white text 16u, letter-spacing 0.02em. Hover: scales to 1.05 with a springy `cubic-bezier(.3,1.6,.5,1)` 0.3 s and background `#2b3140`.

### Entrance (starts when the loader's wipe begins)
| Element | From | Duration | Delay | Ease |
|---|---|---|---|---|
| Headline inner span | `yPercent 105` (hidden below its mask) | 1.2 s | 0.35 s | expo.out |
| Subtitle, then button (0.1 s stagger) | y +24 px, opacity 0 | 1.0 s | 0.55 s | expo.out |
| Header pills (0.08 s stagger) | y −20 px, opacity 0 | 0.9 s | 0.4 s | expo.out |
| 3D camera rig + gravity (below) | camera y −4 → 0 | 1.5 s | 0.5 s | elastic.out(1,1) |

### The 3D keychain — renderer, light, camera
- WebGL renderer on the hero canvas: antialias, transparent (`alpha`), `preserveDrawingBuffer`, pixel ratio `min(devicePixelRatio, 2)`, ACES Filmic tone mapping, sRGB output. Clear colour `#e3e9f2` at alpha 0 (so glass transmission samples a colour close to the page sky).
- Environment: three's `RoomEnvironment` through a PMREM generator (sigma 0.04), environment intensity 1.05. No visible background.
- Lights: a white directional "rim" light, intensity 1.6, at (−29, −14.8, −35) aimed at (0, 2.2, 0); a white directional key light, intensity 1.1, at (6, 10, 12).
- Camera: perspective, FOV 35°, near 0.1, far 500, inside a rig group. The rig starts at (0, −4, 10) and rises to (0, 0, 10) in the entrance. The camera's own offset inside the rig: desktop (aspect ≥ 0.9) (0, +1.06, −4.4) — so it sits only **5.6 units** from the z = 0 plane, centred on the keyring, which makes the bunch large and hangs it from the top centre with the keyring just above the top edge; phones/portrait (aspect < 0.9) (0, −0.9, +2.2). Canvas and camera aspect follow the hero size on every resize.
- Render only while the hero is in the viewport (IntersectionObserver).

### Physics world (Rapier) — the same rig and tuning as a real keychain
- World gravity (0, −9.81, 0); fixed timestep 1/60 s stepped from an accumulator (frame delta capped at 0.1 s).
- Every body: linear damping **2.3**, angular damping **2.9**, can sleep.
- Collision groups (Rapier interaction groups, membership in the upper 16 bits, filter in the lower 16; group bit = 1 << n): groups **none = 0, tags = 1, chain = 2**. Charms ("tags") are in *tags* and collide with *tags*. Chain links are in *chain* and collide with *none* (they pass through everything). The small start/end rings of every chain are in *chain* and collide with *tags* and *chain*.
- **Main keyring**: a steel torus, radius 0.5, tube 0.04, at (0, 3.2, 0), facing the camera (a visual only; it sits just above the top edge of the frame on desktop).
- Attachment points lie on that ring: for an angle θ (degrees), the point is (0.5·cos(θ−90°), 0.5·sin(θ−90°)) relative to the ring centre, so 0° is the bottom of the ring.

**Every charm hangs on its own chain**, built like this (θ = the charm's ring angle, base = the attachment point on the ring at z 0):
1. A fixed anchor body at base.
2. A **start ring** body at base: collider a cuboid with half extents (0.12·0.12, 0.12, 0.12), density 5; drawn as a steel torus radius 0.12, tube 0.0144, turned 90° about Y (edge-on). Spherical joint anchor↔start ring at their origins.
3. **N link bodies**, each spawned at base + (0.5, 0, 0) (they swing into place on the first frames): ball collider radius 0.1, density 1, group chain/none. Spherical joint from the start ring's local (0, −0.12, 0) to link 0's origin. Consecutive links are joined with **rope joints** of maximum length L (0.06 for metal chains).
4. An **end ring** body at base: same as the start ring but radius 0.08. Spherical joint from the last link's local (0, −0.08, 0) to the end ring's origin.
5. The **charm body**, spawned at (base.x, base.y, z): its collider and density are listed below; it is welded to the end ring with a **fixed joint** — end ring origin ↔ the charm's local point (0, offset, 0). The offset always puts the end ring just *above* the charm's collider, so nothing rubs at rest and the bunch settles completely still.
6. A constant outward force on the charm (set once, persists): with angle φ, F = (0.7·cos(φ−90°), 0.7·sin(φ−90°), z). This fans the charms apart like a real bunch of keys.

Chain links are drawn with one instanced mesh per chain: each instance sits at its link body's position, oriented along the chain (direction to the next link, or from the previous one for the last), with that direction smoothed per frame (lerp factor 10·dt). Metal links are a steel oval: a torus radius 0.062, tube 0.02, scaled 1.5 along Y, colour `#a9afba`, metalness 1, roughness 0.2, and each link is twisted about its own axis by i·16°, plus 90° on every other link, so neighbouring links interlock visually.

Per-frame orientation keeping (runs every rendered frame): the start ring's yaw is limited to ±15°; the end ring's and the charm's yaw to ±12° (yaw = the angle of the body's local +Z axis around world Y; when exceeded, rotate back to the limit about world Y and zero the Y angular velocity). The charm also eases its rotation toward identity by a slerp of 0.001 per frame, skipped while it sleeps (and without waking it).

**The five charms, left to right:**

| # | Charm | Ring angle θ | Push angle φ | Spawn z | Collider (half extents / radius) | Density | Fixed-joint offset | Chain |
|---|---|---|---|---|---|---|---|---|
| 1 | Holographic cassette | −50° | −64° | −0.2 | cuboid 0.42 × 0.52 × 0.15 | 1.4 | 0.64 | 8 steel links, L 0.06 |
| 2 | Cobalt bead strand | −18° | −16° | 0.4 | ball r 0.12 | 30 | 0.22 | 9 bead "links", L 0.135, no twist |
| 3 | Pearl ring | 14° | 10° | 0.8 | cuboid 0.5 × 0.5 × 0.12 | 1.4 | 0.62 | 9 steel links, L 0.06 |
| 4 | Orange letter G | 40° | 46° | 0.15 | cuboid 0.42 × 0.48 × 0.12 | 1.4 | 0.6 | 10 steel links, L 0.06 |
| 5 | House key | 84° | 88° | −0.25 | cuboid 0.22 × 0.64 × 0.05 | 4 | 0.7 | 9 steel links, L 0.06 |

**Charm models** (all built in code, centred on their body):
- *Small hanging loop* used on charms: a steel torus (colour `#cfd3da`, metalness 1, roughness 0.18), radius 0.075, tube 0.0225, turned 90° about Y, placed at the top of the charm.
- *Cassette*: a rounded box 0.8 × 1.02 × 0.15 (radius 0.06, 5 segments) in clear holographic glass — physical material, colour `#e9eeff`, roughness 0.08, transmission 1, thickness 0.35, IOR 1.42, iridescence 1 (iridescence IOR 1.7, thickness range 180–820 nm), clearcoat 1 (roughness 0.05). Inside it: a rounded label 0.58 × 0.8 × 0.05 with a pastel rainbow holographic canvas texture (a 256 × 320 diagonal gradient through `#b8f1ff, #c9b8ff, #ffc2ec, #fff1b8, #b8ffd9, #9fc4ff, #e2b8ff`, with 26 random soft ellipses in white / `#8fa0ff` at 18% opacity), metalness 0.45, roughness 0.18, iridescence 1 (IOR 1.9, 250–900 nm), clearcoat 1; a cobalt tape window, rounded box 0.2 × 0.5 × 0.07 (`#2a3a8c`, metalness 0.3, roughness 0.25, clearcoat 1); two steel reel rings (torus r 0.07, tube 0.026) at y ±0.17, z 0.03; loop at y 0.59.
- *Bead strand*: the chain itself is the strand — every link is drawn as a glossy cobalt sphere r 0.068 (`#1430e0`, roughness 0.12, clearcoat 1 / 0.04). The charm at the end is a slightly bigger bead, r 0.085, same material.
- *Pearl ring*: a torus radius 0.33, tube 0.15 (36 × 72 segments), pearl material — colour `#f7f4f2`, metalness 0.05, roughness 0.26, iridescence 0.9 (IOR 1.35, 300–700 nm), sheen 1 with sheen colour `#ffe6f6` (sheen roughness 0.4), clearcoat 1 (0.12); loop at y 0.56.
- *Letter G*: 3D text "G" in Helvetiker Bold, size 0.74, depth 0.1, curve segments 10, bevel thickness 0.1, bevel size 0.055, 8 bevel segments, centred; glossy enamel `#ff5512`, roughness 0.22, clearcoat 1 (0.06); loop at y 0.54.
- *House key*: an extruded 2D shape (depth 0.045, bevel 0.012 in 3 segments, 28 curve segments): a round bow (arc radius 0.21 centred at (0, 0.36), from −0.32π to 1.32π), a shaft from (−0.06, 0.12) down to (−0.06, −0.62), a tip at (0.01, −0.7) and (0.06, −0.66), then seven teeth up the right edge alternating x 0.11 / 0.065 at y −0.6, −0.52, −0.45, −0.37, −0.3, −0.22, −0.14, back to (0.06, −0.08) and (0.06, 0.12); a round hole r 0.055 at (0, 0.44). The geometry is shifted up 0.065 so it spans −0.635 to 0.635 (hole at 0.505), and centred in depth. Material: physical, `#e4e6ea`, metalness 1, roughness 0.16, clearcoat 0.4. A loop (r 0.07) at y 0.6.

### Mouse interaction — a push field, not a constant animation
At rest the keychain is completely still. Only the mouse moves it:
- Track `pointermove` on the window; the pointer counts as "inside" while its y is within the hero canvas. Convert to normalised device coordinates over the canvas.
- Every physics step while inside (and only if the step delta ≤ 0.1 s): cast a ray from the camera through the pointer and intersect it with the plane z = 0 → point P.
- For every charm body within **radius 2** of P (distance d, d > 0): apply an impulse along the vector from P to the charm of magnitude **4.4 · (1 − d/2)² · dt / d** per unit of that vector. Near charms get shoved away from the cursor, swing on their chains and settle back within ~5 s thanks to the damping.

### Entrance physics (the drop-in)
When the entrance starts: one GSAP timeline, defaults duration 1.5 s, delay 0.5 s, `elastic.out(1,1)`. Track 1 moves the camera rig y from −4 to 0. Track 2 runs a dummy progress 0 → 1 alongside; on every update set every body's gravity scale to **−0.25** (the charms float up while the camera rises to meet them) and, once progress reaches 1, to **1** for good (they drop and swing into place).

## 7. Section 2 — Logo ticker

- Padding 72u top, 40u bottom.
- Caption, centred: **"Teams from top studios and agencies build with Glaze"** — 20.66u, letter-spacing 0.033em, colour `rgba(15,20,30,.38)`.
- 52u below: a full-width marquee strip with `overflow: hidden` and a horizontal edge fade mask (transparent → black at 4% and 96% → transparent).
- The track is a flex row of two identical lists (the second is a clone, aria-hidden). Each list: items 48u tall, gap 96u, trailing padding 96u, colour `#0c0e12`, base size 30u, line-height 1. The eight invented wordmarks and their styles:

| Text | Style |
|---|---|
| Solstiq | Archivo Black, uppercase, letter-spacing −0.01em |
| MAVERO | Unbounded 700, letter-spacing 0.02em |
| KILNWORKS | Syncopate 700, 26u, letter-spacing 0.04em |
| FORGELY | Michroma, 25u, letter-spacing 0.06em |
| VELDA | Inter Tight 300, 28u, letter-spacing 0.42em |
| Nova&Kin | Inter Tight 600, letter-spacing −0.03em |
| TERRAVO | Unbounded 700, letter-spacing 0.02em |
| Orbelle | Archivo Black, uppercase |

- Motion (requestAnimationFrame, only while visible): x decreases by (70 + boost) · dt · (viewport width / 1536) px per frame (×2.4 on phones); when the track has moved one list width it wraps back by that width. Every scroll event adds |Δscroll| · 2.2 to `boost`; boost decays by a factor 0.04^dt each frame. So the logos drift steadily and whip faster while you scroll.

## 8. Section 3 — Timeline, then statement

The section (`overflow: hidden`, position relative) holds two blocks in this order: the **timeline** first, the **statement** below it, then a 160u spacer.

### Timeline panel (first)
- Block: padding 150u top, 68u sides, 60u bottom; z-index 1; content centred.
- Inner box: width 100%, max-width 1400u, aspect ratio **1372 / 500**; every child is absolutely positioned in percentages of this box.
- **Panel**: fills the box, radius 44u, background `#12151b`, shadows `0 40u 70u rgba(40,60,110,.22)` and `0 6u 14u rgba(20,30,60,.18)`.
- **Pause button** in the top-left gutter: left 1.7%, top 4.4%, 40u square, radius 11u, background `#2a2f39` (hover `#363c48`), a white two-bar pause icon 11u × 12u that switches to a play triangle when paused.
- **Ruler**: left 8%, right 2.4%, top 5.2%, 28u tall; labels **0s 1s 2s 3s 4s 5s 6s** spread evenly (13u, weight 600, `#e9edf3`) with two 1-px minor ticks (10u, white at 22%) between neighbours.
- **Two track lanes**, left 8%, right 2.4%, each 33% tall, radius 14u, background `rgba(255,255,255,.05)`: **V1** at top 16%, **V2** at top 56%. Their labels "V1" / "V2" sit in the left gutter at left 2.9%, vertically centred on the lanes (top 32.5% and 72.5%), 13u monospace, weight 600, `#8d97a8`, letter-spacing 0.04em.
- **Five clip slots** (square, height 28% of the box; V1 slots at top 18.5%, V2 slots at top 58.5%), placed in time order like clips on an edit — the lane spans 0–6 s, so x = 8% + 89.6% × t / 6:

| Clip | Track | Left | Tile |
|---|---|---|---|
| 1 | V1 | 9.5% | inflated star |
| 2 | V2 | 22.9% | glowing "glaze" |
| 3 | V1 | 34.1% | halftone blob |
| 4 | V2 | 50.6% | "JUST EDIT" streaks |
| 5 | V1 | 66.2% | kinetic "MOTION" |

- Each slot holds one absolutely positioned **block** (z-index 1, `will-change: transform`) containing one **tile** (below).
- **Playhead**: an orange (`#ff5512`) vertical line 2u wide from top 12.5% to bottom 4.5%, above the clips (z-index 2), with a pill on top showing the running timecode (white 11.5u, weight 600, tabular numbers, padding 5u 7u, radius 6u, `#ff5512`). While playing it starts at 2.4 s, counts up in real time, sweeps the ruler (left = 8% + 89.6% × t / 6) and wraps at 6 s; the label reads `00:SS.cc`. The pause button freezes it together with the tile video.

### Tiles
- Each tile is clipped with a squircle clip-path (object-bounding-box path: a superellipse with exponent 4.2, sampled at 160 points).
- Background: the tile-sheet still (section 1), `background-size: 358.04% 237.76%` (a 572-px square crop of the 2048 × 1360 sheet). Positions: tile 1 `5.217% 8.312%`, tile 2 `49.966% 8.312%`, tile 3 `94.851% 8.312%`, tile 4 `5.217% 90.04%`, tile 5 `49.966% 90.04%`.
- An inner white glow on every tile: a pseudo-element with radius 22.4% and `inset 0 0 (tile width × 0.15) rgba(255,255,255,.55)`.
- **Motion**: one hidden, muted, looping, inline, `crossorigin="anonymous"` `<video>` plays the Kling clip. Each tile has a `<canvas>` (tile width × min(dpr, 2) px square) that, every animation frame while the section is on screen (IntersectionObserver with 200 px margin), draws its crop of the video frame: the clip is the 2418 × 1360 padded sheet scaled to 1280 × 720, so with K = 1280 / 2418 the source square is 572·K px wide at (262K, 65.5·720/1360), (922.5K, same), (1585K, same), (262K, 709.5·720/1360), (922.5K, same). The canvases fade in over 0.4 s once the video has data; until then (and with reduced motion) the still background shows.

### Statement (second)
- Block: padding 120u top, 90u sides, 170u bottom.
- Heading (h2): Inter Tight 500, 57.2u, line-height 1.08, letter-spacing −0.012em, **centred**, max-width 31.5ch with auto side margins, wrapping into exactly three lines:
  - "Glaze [■] is the first video [■] editor where"
  - "creatives can [■] build and remix [■] custom"
  - "design tools [■] right on timeline."
- Each [■] is an empty inline slot, 1em × 1em, margin 0.1em 0.2em −0.15em 0.2em. Five slots, in reading order, matching clips 1–5.

### The timeline ⇄ statement flight (FLIP)
- The blocks always live in their timeline slots. For block i, from the bounding boxes of sentence slot i and its timeline slot: scale = sentenceSlot.width / timelineSlot.width; x = sentenceSlot.left − timelineSlot.left + (sentenceSlot.width − timelineSlot.width) / 2; y = sentenceSlot.top − timelineSlot.top + (sentenceSlot.height − timelineSlot.height) / 2. Applying that transform (origin centre) parks the block exactly over its slot in the sentence; scale 1, x 0, y 0 puts it back on its track.
- **Start state: on the tracks.** On load, after fonts are ready, and on every width change, set every block straight to its current state with no rotation.
- **Trigger**: while the section is on screen, listen to scroll. Whenever the **sentence** is on screen (its top above the viewport bottom, its bottom below the viewport top) and the page scrolls **down**, send the blocks into the sentence; when it scrolls **up**, send them back to the timeline. Nothing happens if they are already there.
- **The flight** (one GSAP timeline): block i starts at i × 0.1 s going down into the sentence (i × 0.05 s going back up). Track 1: scale, x and y to the target over 1.5 s `power2.inOut`. Track 2, at the same start: rotation to a random angle between −15° and +15° over 0.75 s `power2.in`, then back to 0° over 0.75 s `power2.out`. The clips peel off their tracks, wobble down the page and drop into the words.
- **First reveal**: the first time the timeline comes within 300 px of the viewport bottom (once only, and only while the blocks are on their tracks), the first clip's inner content drops onto its track from y −300 px and rotation 15° over 2 s `power1.out`.

## 9. Interactions summary

| Trigger | Response |
|---|---|
| Page load | Loader line rises; waits for 3D + 1.4 s; wipes up; headline/sub/button/header enter; camera rises with an elastic bounce while the charms float, then they drop and swing to rest |
| Mouse near the charms | Radial impulse pushes them away (strength 4.4, radius 2), chains swing, settle within ~5 s |
| Scroll past 40 px | Left header pill shrinks to logo + dots, nav fades |
| Scrolling (any) | Ticker speeds up, then eases back |
| Sentence on screen + scroll down | Five clips fly off the timeline tracks down into the sentence (staggered, wobbling) |
| Sentence on screen + scroll up | Clips fly back up onto their tracks |
| Playing | Orange playhead sweeps 0–6 s and loops, timecode on it |
| Pause button | Freezes the playhead/timecode and the tile video; icon switches pause ↔ play |
| Nav link hover / CTA hover | Opacity 0.55 / scale 1.05 + lighter background |

## 10. Phone layout (≤ 820 px)

- `--u = 100vw / 390`.
- Header: top/left/right 12 px; pills 46 px tall, radius 12 px; left pill fixed at 128 px wide (logo 22 px, 3-px dot, dots button 22 px), nav hidden; right pill gap 12 px, 14 px text, padding 0 6px 0 14px; dark chip radius 8 px, padding 7px 12px.
- Hero: height `100svh`; the content becomes one left-aligned column pinned to the bottom (headline, then subtitle and button) with padding 0 20px 30svh; headline 15.2vw on its two lines, line-height 0.96; subtitle 16 px, 16 px below the headline; button 44 px tall, 15 px text, padding 0 24px, radius 12 px, 22 px below. The 3D camera uses the portrait offsets (section 6), so the keyring shows at the top with the charms hanging above the copy.
- Ticker: padding 44px 0 16px; caption 14 px with 24-px side padding; marquee 28 px below; items 32 px tall, 22 px (KILNWORKS/FORGELY/VELDA 19 px), gap 48 px; drift ×2.4.
- Timeline (first): padding 72px 12px 20px; aspect ratio 1372 / 640 (taller lanes); panel radius 16 px; pause 17 px (radius 5 px, icon 5 × 6 px) at left 1.6%, top 3.4%; ruler 14 px tall at top 4.6%, labels 8 px, ticks 5 px with every other minor tick hidden; lanes radius 7 px; V labels 8 px at left 2.4%; playhead pill 7.5 px text, padding 3px 4px.
- Statement (second): padding 56px 18px 90px; heading 9.2vw, line-height 1.12; slots 1.15em with margin −0.05em 0.2em −0.2em 0.2em.

## 11. Reduced motion (`prefers-reduced-motion: reduce`)

No loader; no entrance tweens; the camera starts at its final position with gravity 1, the physics world is stepped 240 times once to settle and then frozen (no mouse push); the ticker stands still; the tile video is never loaded (tiles show the still sheet); the playhead stays put; the timeline ⇄ statement switch jumps instantly with no flight; header transitions are instant.

## 12. Acceptance checklist

- At 1440 × 810: loader line → upward wipe → headline rises; the charms rise into view with the camera and drop; after ~5 s nothing in the hero moves until the mouse comes near.
- Five charms left to right — holographic cassette, cobalt bead strand, pearl ring, orange G, silver key — each on its own visible chain running up out of frame to the keyring; they hang large from the top centre and clear the headline (bottom-left), with the subtitle and button bottom-right.
- The header pill shrinks after 40 px of scroll.
- The ticker drifts and speeds up on scroll.
- The timeline comes first: five clips staggered over V1/V2, playing their motion loop under a sweeping orange playhead.
- The centred sentence below wraps in three lines exactly as listed, with five empty inline slots.
- Scrolling down to the sentence sends the five clips flying off the tracks, staggered and wobbling, into the slots; scrolling up sends them back onto the tracks.
- No network failures; all eight fonts load; works at 390 px wide.