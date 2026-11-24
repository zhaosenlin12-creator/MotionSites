# Opaque Stack: WebGL Leaning-Card Portfolio with Fly-to-Page Transition (exact recreation prompt)

Build a single-file portfolio home page for a fictional creative studio, **OPAQUE®**.

**The stack:** on an off-white `#fafafa` canvas, a long diagonal row of thin portrait image cards stands in 3D. Each card is turned −30° and the row leans from the lower left to the upper right, seen through a very narrow 5° lens from slightly above.

- **Scroll or drag:** the row slides endlessly along its diagonal, with eased momentum.
- **Hover:** the card under the cursor slides out of the stack, and its uppercase title follows the cursor.
- **Click a card:**
  1. Every other card vanishes at once.
  2. The clicked card glides to the centre of the screen, turns to face the viewer and becomes square, while the camera flies to a straight-on view.
  3. The project page fades in over it: a centred title and description, a two-column image grid, and a "Next project" row.
- **Back:** clicking "OPAQUE® PROJECTS" (or pressing Esc) returns to the stack, and the row flies in again.

Each card's edges blur softly into the page through a custom shader: sharp in the middle, blurred towards every edge.

Use plain HTML, CSS and JS in one file, with **three.js r128** and **GSAP 3.12.5** from cdnjs. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `OPAQUE® Projects`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Font (Google Fonts):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the Inter latin woff2 faces (400 and 500) as base64 `@font-face` rules instead.
- **Scripts, in this order before the inline script:**
  - `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`
  - `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- **Variables:** `--bg:#fafafa`, `--ink:#141414`, `--mute:#a9a9a9`, `--line:rgba(0,0,0,.08)`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `var(--bg)`.
  - body font `"Inter","Helvetica Neue",Arial,sans-serif`, ink colour, antialiased.
- **Utility class `.u`:** 11px, letter-spacing .02em, uppercase.
- **The body starts with class `loading`.**

## 2. The single image asset

All twelve projects come from **one 4×3 contact sheet** (2336×1744, white gutters): twelve moody editorial images.

| Row | Images |
|---|---|
| 1 | Red glossy lips with a gold ring; soft white cumulus clouds in blue sky; red neon tubes at night; a white mannequin bust in hard venetian-blind light |
| 2 | A blue-tinted woman's face close-up; a woman's silhouette against warm orange light; liquid chrome metal spheres; a glowing blue jellyfish in the dark |
| 3 | Grey concrete stairs with a hard diagonal shadow; a rainbow prism light leak; car headlights in fog; a black-and-white crashing wave |

URL (exact):

`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_084005_ab0d1fcf-a93f-4e32-a277-1523e1768fbe.png&w=2400&q=88`

**Cutting the sheet into cells:**

- Load it with `crossOrigin='anonymous'`.
- Use the sheet constants `SW=2336, SH=1744, CW=.2425, CG=.01, RH=.3244, RG=.0134`.
- Cell i is at column `c=i%4` and row `r=floor(i/4)`. With `k = naturalWidth/SW`, the cell is at:
  - x `c*(CW+CG)*SW*k`, width `CW*SW*k`
  - y `r*(RH+RG)*SH*k`, height `RH*SH*k`
- `cellCanvas(i,size)` draws a cell into a square canvas. For each project:
  - the **sharp** texture is a 512px canvas (`THREE.CanvasTexture`);
  - the **blur** texture is a 24px canvas (`CanvasTexture`, `minFilter = magFilter = LinearFilter`), so upscaling it is the blur;
  - `url` is the 512px canvas as a JPEG data URL (quality .7), used for the corner thumbnail.
- After each project, add `100/12` to the loading progress and wait 30ms.

**Projects** (name, category, year):

| # | Name | Category | Year |
|---|---|---|---|
| 0 | Velvet Mouth | Graphic identity | 2025 |
| 1 | Cumulus | Site design | 2025 |
| 2 | No Signal | Video | 2024 |
| 3 | Still Life | 3D | 2024 |
| 4 | Memories | AI | 2025 |
| 5 | Shadowplay | Graphic identity | 2024 |
| 6 | Mercury | 3D | 2025 |
| 7 | Abyss | Site design | 2024 |
| 8 | Concrete Poem | Graphic identity | 2023 |
| 9 | Prism | AI | 2025 |
| 10 | Headlights | Video | 2023 |
| 11 | Tide | Site design | 2024 |

- **Categories:** `All, Graphic identity, Site design, AI, Video, 3D`.
- **REPEAT = 3:** the twelve projects appear three times, giving 36 cards.

## 3. Renderer and camera

- **Canvas `#gl`:** `position:fixed; inset:0`, full size, `touch-action:none`.
  - `body.hov #gl` gets `cursor:pointer`; `body.drag #gl` gets `cursor:grabbing`.
- **Renderer:** `THREE.WebGLRenderer({canvas, antialias:true, alpha:false})`, clear colour `#fafafa`, pixel ratio `min(devicePixelRatio,2)`.
- **Camera:** `PerspectiveCamera(5, innerWidth/innerHeight, .1, 1000)`.
  - `placeCamera()`: position `(0, 100/7.5, aspect<1 ? 55 : 35)`, then `lookAt(0,0,0)`.
  - On resize: set the renderer size, update the aspect and projection, and call `placeCamera()` unless a project is open.
- **Group:** one `world` group in the scene holds every card.

## 4. Card shader (ShaderMaterial, transparent)

**Vertex shader:** pass `vUv`; standard projection.

**Fragment shader**, with uniforms `uMeshSize` (vec2), `uImageSize` (vec2, set to 1,1), `uImageTexture`, `uBlurTexture`, `uOpacity`:

```
ratio = vec2(min((mesh.x/mesh.y)/(img.x/img.y),1.0), min((mesh.y/mesh.x)/(img.y/img.x),1.0))
uvCover = vUv*ratio + (1-ratio)*0.5
progress = 1.0; margin = 0.15
on each of the four edges: progress.rgb *= smoothstep(edge, edge±margin, vUv)
blur.a *= 0.75
color = mix(sharp, blur, 1.0 - progress.r)
color.a *= uOpacity
```

The middle 70% of the card is sharp, and the outer 15% on each side fades into the blurred copy.

## 5. Cards and layout

- **Sizes:** `GAP=.375`, `BE=4/3`, `SC=1-(BE-1)*.5`, `H0=1.5*SC`, `W0=1.5*BE*SC`.
- **Geometry:** `BoxGeometry(H0, W0, .0175)`, a thin portrait slab.
- **Each card is:**
  - `mesh`: the shader material, with `uMeshSize = (H0, W0)`;
  - `hit`: the same geometry with an invisible `MeshBasicMaterial` (opacity 0, transparent, no depth write), `scale.x = 1.5`, a generous hover target;
  - `inner` group: holds the mesh and slides on hover;
  - `holder` group: holds `inner` and `hit`, and is placed on the row.
- **Card state:** `{n, i, mesh, hit, inner, holder, order:n, visK:1, on:true}`.
- **Motion state:**
  - `scroll = {current:0, previous:0}`
  - `mouse = {x:-1, y:-1, drag:{x,y,active}, on:{x,y}, down}`
  - `M = 0` (eased drag)
  - `intro = {x:-20}`
  - `wrap(min,max,v)` = modulo wrap
- **layout(), every frame:**
  1. Ease the drag: `M += (drag.x - drag.y - M) * .1`.
  2. Ease the scroll: `scroll.previous += (current - previous) * .15`.
  3. Set `J = scroll.previous/25 - M/100 + intro.x`.
  4. Take the visible (filtered) cards: `N` = their count, `len = max(N,24)`, `F = len*GAP/2`, `step = len/N`. Each visible card gets `order = k*step`, which spreads a filtered set along a loop of at least 24 slots.
  5. For every card:
     - `visK += ((on?1:0) - visK) * .12`, and `uOpacity = visK`.
     - If nothing is open:
       - `x = wrap(-F, F, (order - J)*GAP)`
       - `y = -(1 - visK)*1.2`, so filtered-out cards sink
       - `z = aspect<1 ? -x*6 : -x*aspect*1.5`
       - `rotation.x = 0`, `rotation.y = -π/6`
       - visible only while `visK > .02` and `|z| < 12.5`

## 6. Interaction

- **Hover:**
  - Each frame, raycast the visible cards' `hit` meshes at the mouse NDC. Skip this before ready, while open, while dragging, or with no mouse.
  - On a new hovered card:
    - The previous card's `inner.position` goes back to (0,0), expo.out 0.5s.
    - The new card's `inner.position` goes to `x: 2/3, y: -.1`, expo.out 0.5s.
    - The body gets `hov`.
    - `#label` shows the project name.
    - `#thumb` shows its image.
- **Wheel:** `scroll.current += (deltaY + deltaX)/20`, passive, ignored before ready or while open.
- **Arrow keys:** ±12. **Esc:** closes the project.
- **Drag:**
  - pointerdown on the canvas stores `on = drag - client` and captures the pointer.
  - Once the pointer has moved more than 3px:
    - drag mode starts and the body gets `drag`;
    - `world.scale` → 0.825 (expo.out .75s);
    - `drag = on + client`.
  - On pointerup, drag mode ends and the scale returns to 1 (expo.out .75s).
  - A pointerup without a drag on a hovered card opens it.
- **Cursor label `#label`:**
  - Fixed, 11px Inter 500 uppercase ink, `pointer-events:none`.
  - Follows at `translate(x+14px, y+12px)`.
  - Opacity transition .2s.

## 7. Open a project (exact sequence)

`openTile(t)`:

1. Set `opened = t`, clear the hover, and add `opened` to the body (the side chrome fades out).
2. **Hide every other card at once.**
3. Snap `t.inner.position` to (0,0).
4. `t.holder.position.x` → 0, expo.out over `1.25/3*2` s. On each update, `z = -x*aspect*1.5`, so the card slides along the row to the centre.
5. `t.holder.rotation.y` → 0, expo.inOut 1.25s (it turns to face you).
6. `camera.position` → `(0, 0, innerWidth<640 ? 35 : 30)`, expo.inOut 1.25s, calling `lookAt(0,0,0)` on every update.
7. **When the camera tween completes:**
   - fill the page and make `#page` visible;
   - fade it `opacity 0 → 1` over 0.5s, power1.inOut;
   - then hide the card underneath.

`closeTile()`:

1. Kill the page tweens, hide the page (opacity 0, hidden), and remove `opened`.
2. Reset the card's `rotation.y` to `-π/6` and call `placeCamera()`.
3. Set `opened = null`.
4. The row flies in again: `intro.x = -20` → 0, expo.out 2s.

"OPAQUE® PROJECTS" (`#home`) calls `closeTile`.

## 8. Project page `#page`

- **Container:** fixed, inset 0, z-index 8, `overflow-y:auto`, `overscroll-behavior:none`, background `var(--bg)`, a flex column. It starts at opacity 0 and `visibility:hidden`.
- **Head section `.head`:**
  - Height 50vh (min 20rem), `margin-top:3.75rem`, content centred vertically, font-size 11px, line-height 1.0909.
  - The inner row has padding `5rem 14px`.
  - `h1` (the project name): width 12.5rem, Inter 500 11px uppercase.
  - `p` (the description): max-width 287px, padding `0 2px`.
- **Grid `.grid`:** two equal columns, no gap. Five blocks, all cut from the project's own sheet cell (as JPEG data URLs, quality .85):

  | Block | Crop (x, y, w, h of the cell) | Output size | Width | Aspect ratio |
  |---|---|---|---|---|
  | 1 | 0, .08, 1, .84 | 1200×1000 | half | 1.2 |
  | 2 | .18, 0, .64, 1 | 900×1400 | half | .64 |
  | 3 | 0, .2, 1, .6 | 1800×1080 | full (spans both columns) | 1.67 |
  | 4 | .05, .05, .5, .5 | 1000×1000 | half | 1 |
  | 5 | .45, .45, .5, .5 | 1000×1000 | half | 1 |

  - Each block is a relative box with overflow hidden and an absolutely-filled `object-fit:cover` image.
  - Images start at opacity 0 and fade in (`.in`, .6s `cubic-bezier(.215,.61,.355,1)`) as they load.
- **Next section `.next`:** height 50vh (min 20rem), centred, padding 14px, 11px uppercase.
  - Credits row: "Category" in an 8.25rem column at 30% opacity, then the category.
  - A full-width link: "Next project" in an 8.25rem column at 30% opacity (100% on hover, .5s), then the next project's name.
  - Clicking it fades the page to 0 over .25s, refills it with the next project, scrolls to the top, and fades back in over .5s (power1.inOut).
- **Descriptions** (by project index):
  0. A campaign built from close-up texture and saturated colour, shot and graded in-house.
  1. Site design and art direction for an atmospheric weather brand, all soft light and slow motion.
  2. A night-time film series exploring signal, noise and the glow of the city after dark.
  3. Still lifes rendered in 3D, mixing studio light with synthetic materials.
  4. An AI-assisted portrait series about memory, distortion and the faces we half remember.
  5. Visual identity built from shadow and warm light, for a theatre collective.
  6. Liquid-metal forms for a product launch, modelled, lit and animated in 3D.
  7. An immersive site for a deep-sea research lab, glowing in the dark.
  8. A typographic identity cast in concrete for an architecture biennale.
  9. Generative colour studies trained on refracted light.
  10. A short film shot entirely in fog, following two headlights through the night.
  11. An editorial site for a surf brand, built around the rhythm of the tide.

## 9. Chrome (all with class `chrome`, transition opacity .6s)

`body.loading` hides it. `body.opened` hides everything except the nav.

- **Nav** (fixed at left 6px, top 6px, flex, gap 3px, z-index 10, `.u`): four tiles.
  - Labels: `OPAQUE<sup>®</sup>&nbsp;PROJECTS` (198px wide, ink), `Research`, `Studio`, `Contact` (122px, mute).
  - Each tile: 58px tall, padding `0 10px 10px` with the text at the bottom, radius 4px.
  - Background `rgba(242,242,241,.5)` with `backdrop-filter: blur(14px)` and an inset 1px `var(--line)` ring.
  - Hover: ink text on `#ececeb`.
- **`#thumb`:** fixed at top-right 10px, 58×58, radius 3px, cover background. Filter `grayscale(1) contrast(1.1)`. Shows the hovered project's image (Memories at start).
- **Filter chips `#chips`:** fixed at right 10px, bottom 62px, a column aligned right, gap 5px.
  - One pill per category: 30px tall, padding `0 13px`, radius 30px, background `rgba(242,242,241,.9)`, line ring.
  - Text: Inter 500 10px uppercase, mute; ink when active or hovered.
  - A count in a 7px `<sup>`.
  - Clicking sets `t.on` for the matching cards: the others sink and fade through `visK`, and the remaining ones re-spread along the loop.
- **Mode switch `#mode`:** fixed at bottom-right 10px, padding 3px, radius 4px, the same glass. Two buttons, "Overview" and "Index": 34px tall, 11px uppercase. The active one is white with a line ring.
  - **Index** shows `#index`: a list fixed at left 10px, top 96px, width `min(420px,40vw)`.
  - Each row is a grid `28px 1fr auto auto`, holding number, name (500, ink), category and year, with a top border line.
  - Row hover: ink text, padding-left 12px.
  - Hovering a row scrolls the stack to that project and sets the thumbnail; clicking a row opens it.
- **At 760px or narrower:** nav tiles are 76px (first one 120px) and the index is 80vw.

## 10. Loader and intro

1. `#loader` covers the page (bg colour) with a centred "0%" (Inter 500 11px).
2. While the textures build: `prog.previous += (current - previous)*.1` each frame, shown as a rounded percent.
3. At 100:
   - The percent fades out (.5s, delay .25).
   - The loader fades out (.5s, delay .75, power1.inOut), then is removed, and `loading` is removed from the body.
4. After 750ms:
   - Set `ready = true`.
   - **The row flies in:** `intro.x` -20 → 0, expo.out 2s.
   - `world.scale` starts at 0.825 and eases to 1 (expo.out 1s, delay 1.25s).
   - The thumbnail shows project 4.
5. **The render loop** runs `layout()`, `pick()` and `renderer.render()` on every requestAnimationFrame.