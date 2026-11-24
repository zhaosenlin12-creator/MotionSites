# Prompt: "Nadia's Depot" — container-crane portfolio hero

Build a single-file, one-screen portfolio hero (`index.html`, no build step) for a fictional product designer called **Nadia**. The page is a shipping depot: a pile of chunky 3D corrugated shipping containers sits on a flat terracotta page, in front of a giant cream word **PROJECTS**. An overhead gantry crane runs along a rail under the nav. Clicking a container makes the crane travel to it, lower its cable, grab it, hoist it to the top centre of the screen and swing its two front doors open like a gatefold, revealing a dark corrugated interior with a content card inside. Recreate everything below exactly.

---

## 1. Tech and assets

- Plain HTML + CSS + one `<script type="module">`. Three.js **0.160.0** from jsDelivr via an import map:
  - `three` → `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`
  - `three/addons/` → `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/` (only `geometries/RoundedBoxGeometry.js` is used)
- No images and no video. All 3D is built in code; the corrugation is a generated normal map; container labels are canvas textures.
- Fonts (Google Fonts, latin subset, self-hosted woff2; the standalone file embeds them as base64 data URIs):
  - **Archivo**, width 125%, weight 800–900, registered as family `"Archivo X"` with `font-stretch:125%` — `https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q8EsLydOxI.woff2`. Used for the giant word and the stencil labels.
  - **Manrope** variable 200–800 — `https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSg.woff2`. All UI text.
  - **Instrument Serif** italic 400 — `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2`. Only the accent word in each card title.
- Before building the 3D, `await document.fonts.load('900 40px "Archivo X"')` (and Manrope 800 / Instrument Serif italic) so the canvas labels use the right font.

## 2. Colours

| Token | Hex | Use |
|---|---|---|
| page | `#E27657` | body background (flat terracotta) |
| word | `#F6EDE1` | giant "PROJECTS" |
| ui | `#FFFFFF` | nav, pill, eyebrow, card text |
| accent | `#F0653F` | italic accent word in card titles, email button |
| navy | `#1F2E5C` | containers THE WORK, WHAT I DO; PROCESS label ink |
| mustard | `#E0A93B` | containers ABOUT ME, ARCHIVE |
| ivory | `#F2EBDD` | container PROCESS |
| sky | `#8FC3E6` | containers TOOL KIT, SAY HELLO |
| inside | `#1A1D2B` | interior walls of every container |
| steel | `#E4E1DC` | rail, trolley, spreader (roughness .38, metalness .1) |
| bolts | `#9b968f` | rail bolts |
| lock rods | `#d8d3cb` | door lock rods |

Card body text is `rgba(255,255,255,.88)`; chip borders `rgba(255,255,255,.35)`; the pill border `rgba(255,255,255,.85)`.

## 3. Layout system

Design frame **1440 × 900** ("design px"). JS sets CSS vars on `<html>`:
- `--k` = screen px per design px; `--n` = nav unit; `--rail` = rail screen y; `--wordFS`, `--wordX`, `--wordB`, `--wordH` for the giant word.
- **Landscape** (`vw/vh ≥ 1.05`): `k = min(vw/1440, vh/900)`, frame centred horizontally (`tx=(vw−1440k)/2`) and bottom-anchored (`ty = vh − 900k`). `n = max(.62, k)`.
- **Portrait** (`vw/vh < 1.05`): `n = min(1, max(.62, vw/560))`; `k = vw/1130`; `tx = vw/2 − 768k`; `ty = wordTop − 716k` so the pile rests on the word.
- Screen → world: `x = (sx − tx)/k`, `y = −(sy − ty)/k`, `z = 0`. World units are design px.

### HTML layers (all inside `<main class="stage">`, `position:fixed; inset:0; overflow:hidden`)
1. `.word` (z 1): a bottom strip holding `<span id="word">PROJECTS</span>`. Archivo X 900, stretch 125%, `letter-spacing:-.035em`, `line-height:1`, colour word. JS sizes it so its width = `vw × 1.005`, shifts it left by `vw × .004`, and puts the **baseline 35 design px above the bottom edge** (portrait: `34 × n`). Use canvas `measureText` (`fontBoundingBoxAscent/Descent`, `actualBoundingBoxAscent`) to place the baseline exactly: `bottom = baseGap − ((fs − (fA+fD))/2 + fD)`. On 1440 × 900 the caps run from y≈711 to the baseline at 865.
2. `<canvas id="gl">` (z 2), full viewport, transparent WebGL.
3. `.nav` (z 5), height `58n`, side padding `36n`, flex space-between:
   - `.logo` "nadia" — Manrope 800, `max(22px, 30n)`, `letter-spacing:-.03em`.
   - `.links` centred absolutely: "work", "about", "process", "contact" (lowercase) — Manrope 700, `max(12px, 15n)`, gap `36n`, 6 px vertical padding; hidden below 820 px wide.
   - `.talk` "Let’s Talk ↗" — same style as the links. Hover: opacity .75.
4. `.pill` "PICK A CONTAINER ↓" — top-right: `right:34n; top: var(--rail) + 26n`; height `max(26px,30n)`; padding `0 14n`; 1 px white(.85) border; radius 999; Manrope 800 `max(11px,10n)` caps, `letter-spacing:.22em`. Not clickable.
5. `.eyebrow` "NADIA’S DEPOT · 7 CONTAINERS · 2026" — bottom-left: `left:35n; bottom:14n`; Manrope 800 `max(11px,10n)` caps, `letter-spacing:.24em`.
6. `.card` (z 3) — positioned every time a container opens (see §7).
7. A visually hidden `#menu` with one `<button>` per container ("Open about me" …) that calls the same pick logic (keyboard / screen-reader access).

## 4. Camera, renderer and light

- `WebGLRenderer({antialias:true, alpha:true})`, pixel ratio `min(dpr,2)`, `outputColorSpace = SRGB`, **NoToneMapping**, shadows on, `PCFSoftShadowMap`.
- `PerspectiveCamera` fov **20°**. It looks at the world point under the viewport centre, `c = toWorld(vw/2, vh/2)`. Distance `D = (vh/k/2)/tan(10°)`. Position `c + (0, sin(8°)·D, cos(8°)·D)` → an 8° downward pitch so the tops of the boxes show. near `.3D`, far `3D`.
- Lights: `AmbientLight(#ffffff, 2.2)` + `HemisphereLight(#ffffff, #d27a5e, .22)` + key `DirectionalLight(#fffaf4, .78)` at `c + (−500, 1500, 1100)` casting shadows (map 2048, radius 6, bias −0.0006, normalBias 0.6, ortho shadow camera ±`max(vw,vh)/k × .75`) + fill `DirectionalLight(#ffe6d8, .35)` at `c + (900, 200, 900)`. These values make the rendered front faces read almost exactly as the palette hexes.
- Shadow catcher: a 6000 × 3000 horizontal plane with `ShadowMaterial({opacity:.22})` at world y **−742** (the floor under the pile). The page itself receives no shadow.

## 5. The containers

### Geometry (one `Group` per container, pivot at its centre)
Sizes (L × H × D, design px): **std 252 × 104 × 104**, **hero 430 × 158 × 140**, **cube 142 × 96 × 112**. Wall thickness T = 4, frame bar F = 7.
- Hollow box: back wall (`L×H×T` at z=−D/2+T/2), roof and floor (`L×T×D`), two end walls (`T×H×D`). Use per-face materials (`+x,−x,+y,−y,+z,−z`): every face that points into the box uses the **inside** colour, every outer face the container colour.
- Frame bars, colour = container colour × 0.9, roughness .45, sitting 0.5 px proud: 4 vertical corner posts (`F×(H+1)×F`), 4 long rails (`(L+1)×F×F`), 4 short rails (`F×F×(D+1)`).
- **Doors**: the whole front is two half-panels (`(L/2−F) × (H−2F) × T`), each on a pivot group at the outer front corner (`x = ±(L/2−F)`, `z = D/2−F/2`), the panel offset inward by half its width. Each door has two lock rods (cylinders r 1.4, height `dH × .92`, colour `#d8d3cb`) on its inner face at 32% and 72% of its width.
- **Corrugation**: a 64 × 4 canvas normal map whose x-normal is `cos(2πu)×.62` (z = √(1−x²)), RepeatWrapping, repeat = round(face length / 10) so there is one ridge per 10 design px; `MeshStandardMaterial` roughness .6, metalness 0, `normalScale .55`. Roof/floor use the same map rotated 90°. Materials are cached per colour/length.
- **Label**: a plane `(L−2F) × (H−2F)` just in front of the closed doors (`z = D/2−F/2+T/2+2.2`, polygonOffset −2), textured with a 1024-wide canvas: Archivo X 900, two lines at 27% of the canvas height (one line at 30%), line height .9 em, left-aligned at 7.5% of the width, vertically centred, shrunk to fit 82% of the width. Transparent material.
- Everything casts and receives shadows.

### The pile (world position = design x, −design y, z; Euler XYZ in radians)
| id | label | colour / ink | size | pos (x, y, z) | rot (x, y, z) |
|---|---|---|---|---|---|
| process | PROCESS | ivory / navy | std | 352, 575, 34 | .22, −.52, .27 |
| work | THE / WORK | navy / white | hero | 676, 620, 0 | .14, .06, 0 |
| about | ABOUT / ME | mustard / white | cube | 560, 500, −6 | .16, .20, 0 |
| kit | TOOL / KIT | sky / white | cube | 556, 410, −14 | .18, .14, 0 |
| hello | SAY / HELLO | sky / white | std | 792, 474, −40 | .24, −.20, −.40 |
| do | WHAT / I DO | navy / white | std | 1000, 592, 28 | .22, −.40, −.40 |
| archive | ARCHIVE | mustard / white | std | 1196, 616, 120 | .20, −.28, −.32 |

The result is a small hill: THE WORK lies flat in the middle, ABOUT ME and TOOL KIT are stacked on its left end, PROCESS leans in from the left, SAY HELLO leans on THE WORK, and WHAT I DO and ARCHIVE tumble down to the right. The lower half of the pile overlaps the top of PROJECTS.

### Crane (steel `#E4E1DC`)
- Rail: cylinder r 6.5, 9000 long, horizontal, at world y = `railY`, z −10. `railY` comes from the rail screen y = `max(73k, 73n)`, pinned just under the nav. 140 instanced bolts (sphere r 2.2, `#9b968f`) every 72 px along it at z −3.5.
- Trolley at `(trolleyX, railY−6, 6)`: rounded box 62 × 30 × 30 (radius 7), two wheel cylinders r 6 at x ±17, and a hub (rounded 22 × 16 × 20) 22 below.
- Cable: cylinder r 2.4 (`#d9d6d0`), scaled in y, from `railY − 31` down to the spreader.
- Spreader: rounded plate 58 × 22 × 30, a knob cylinder r 7, and a 90 × 6 × 10 bar. Height 24. At rest the cable is 118 long; the empty spreader hangs above the pile at the trolley's x (starts at x 720).

## 6. Interaction (timings measured frame by frame from the reference reel)

Clicks are raycast against the containers (pointer cursor on hover, nothing else on hover). One container can be open at a time. Clicks during an animation are queued (only the latest is kept).

**Pick a container** (`pickUp`):
1. Trolley travels along the rail to the container's attach point (top centre in world space): duration `0.22 + distance/2600` s, ease in-out cubic.
2. Cable lowers onto the container: **0.36 s**, ease-out quad. Pause **0.08 s** (grab).
3. **Hoist 0.55 s, ease-out quad** (measured): position lerps from home to the hang target, rotation slerps to level (identity), scale grows from 1 to `s`. The trolley and cable follow the container's attach point every frame. The container stops casting shadows while it hangs.
4. On arrival, a small settling swing: rotation about z = `.03 × sin(3πt) × (1−t)` over **0.7 s**.
5. After **0.05 s**, the card is filled and placed, and fades in 0.15 s later.
6. **Doors open 0.42 s, ease-out cubic** (measured): left door `rotation.y = +θ·a`, right `−θ·a`, θ = **122°** (98° in portrait). The label fades out during the first 12% of the door move (opacity `1 − 8a`).

**Hang target** (world): landscape — body height `bodyH = max(218k, min(170, vh×.42))/k` design px, `fitH = bodyH`, `fitW = 2.5 × bodyH`, centre `x = c.x`, `y = railY − 48×min(1, bodyH/218) − bodyH/2`, z 70. Portrait — centre halfway between `railY − 40` and the pile top + 30 (+10), `fitW = vw × (vw<360 ? .93 : .86)/k`, `fitH = min(.62 fitW, gap × .8)`. Scale `s = min(fitW/L, fitH/H)`, so each container keeps its own proportions (a cube opens as a square box). On 1440 × 900 a std container hangs about 546 × 218 with its top just under the trolley, as in the mockup.

**Containers resting on others** settle when their support is lifted, 0.12 s into the hoist: **0.38 s ease-in quad** to the dropped pose, then a 0.18 s, 4 px bounce. They ride back up (0.3 s ease-out quad) when the support returns, starting 0.24 s into its lowering.
- Lifting ABOUT ME: TOOL KIT drops 90.
- Lifting THE WORK: ABOUT ME and TOOL KIT drop 194; SAY HELLO drops 126 and rolls flatter (rot z +.30, rot x −.05).

**Close** (click the open container again, or click another one first):
1. Card fades out; doors close **0.17 s, ease-in quad** (measured); the label fades back in.
2. Pause 0.06 s, then lower back to the exact home pose: **0.42 s, ease in-out quad** (position, rotation, scale back to 1).
3. Landing bounce: y += `sin(πt) × (1−t) × 5` over 0.2 s. Shadows on again.
4. The empty cable retracts to its 118 rest length: 0.3 s, ease-out quad.
5. If another container was clicked, it is then picked as above.

**Pill**: if the open container (doors fully open) would overlap the pill on screen (short landscape screens), the pill fades out (`opacity 0`, .25 s) while it hangs and comes back on close.

## 7. The card inside the open container

Projected from the hanging container's back interior wall: take the 4 corners `(±(L/2−F), ±(H/2−F), −D/2+T)` in the final hang pose, project them with the camera, and use their screen bounding box as the card's `left/top/width/height`. Card scale `--c = min(height/200, width/480)` px. Below 112 px tall add `.tight` (h2 16 px, gaps 4–6 px).

Card layout: flex column, vertically centred, side padding `42c`. Children fade in (opacity .28 s ease-out; translateY `10c` → 0 over .38 s `cubic-bezier(.22,1,.36,1)`), staggered by .06 s.
- `.eb` eyebrow — Manrope 800, `max(11px,12c)`, caps, `letter-spacing:.24em`.
- `h2` — Manrope 800, `max(18px,40c)`, `letter-spacing:-.035em`, line-height 1.05, margin-top `12c`. The accent word is `<em>` in Instrument Serif italic 400, colour accent `#F0653F`, 1.08 em.
- `p` — Manrope 500, `max(11px,16c)`, line-height 1.5, max-width `440c`, white .88.
- `.chips` — wrap, gap `8c`; each chip 1 px white(.35) border, radius 999, padding `5c 12c`, Manrope 700 `max(11px,12.5c)`.
- `.mail` — accent-filled pill button, white Manrope 800 `max(11px,13c)`, padding `max(5px,7c) 16c`, min-height 24 px, `mailto:` link.

Card content:
| container | eyebrow | title | body |
|---|---|---|---|
| ABOUT ME | 01 / HELLO | Hi, I’m *Nadia.* | A product designer shaping calm, useful tools. Every container in the pile holds a piece of my work. |
| WHAT I DO | 02 / WHAT I DO | What I *do.* | chips: Product design · Design systems · Prototyping · UX research |
| THE WORK | 03 / THE WORK | Selected *work.* | chips: Banking app · Health portal · Travel booking · Design system |
| PROCESS | 04 / PROCESS | How I *work.* | Listen, sketch, prototype, test, repeat. Small steps, shipped often, measured honestly. |
| TOOL KIT | 05 / TOOL KIT | My *kit.* | chips: Sketchbooks · Prototypes · Design tokens · User interviews |
| ARCHIVE | 06 / ARCHIVE | Old *boxes.* | Side projects, experiments and small things made for fun since 2016. |
| SAY HELLO | 07 / SAY HELLO | Got an *idea?* | Send a note, a half-formed idea, or just say hi. + button `hello@nadia.studio` |

## 8. Load

Idle on load: the pile is still, the empty spreader hangs at the centre of the rail, and nothing is open. One entrance timeline runs once (Web Animations, `fill:'backwards'`) on every `.rv` element in DOM order (word, logo, links, talk, pill, eyebrow): opacity 0 → 1 and translateY 12 px → 0 over 850 ms (the word: 18% → 0 over 1100 ms), delay `120 + i × 70` ms, easing `cubic-bezier(.22,1,.36,1)`. The guard is `html.js .rv{opacity:0}` / `html.ready .rv{opacity:1}`, with a 2.5 s failsafe that adds `.ready`.

## 9. Responsive and reduced motion

- Recompute everything on `resize`: frame, word, rail, camera, light, shadow camera, bolts, hang target and scale. Re-place an open container and its card.
- Below 820 px wide the centre nav links are hidden (logo + Let’s Talk stay on one row).
- Portrait screens use the portrait frame above: the whole pile stays visible, resting on the word, and the open container hangs in the space between the rail and the pile with its doors at 98°.
- `prefers-reduced-motion: reduce`: every tween and wait resolves instantly (no travel, hoist, swing or door animation, just the open state), there is no entrance animation, and the card has no transition.
- Verified sizes: phones 320–430 portrait, 568–932 landscape, tablets 600–1366, laptops and desktops up to 2560 wide. Nothing leaves the viewport, UI blocks don't overlap, text is at least 11 px, touch targets are at least 24 px, and every card fits inside its container.