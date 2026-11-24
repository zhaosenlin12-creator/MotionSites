# VEKTOR LAB: WebGL curved-gallery experiments hub with a glass rim and RGB edge lights

Build a single-file, fully responsive, **full-screen WebGL experiments gallery** for an invented creative-code studio, **"VEKTOR LAB"**.

The page is one fixed 100vh screen on a near-black field (#0f0e14). It has three parts:

- A horizontal strip of ten poster cards, warped into a **"smile" band**. The centre cards are tallest, and cards step shorter the further they sit from the centre.
- A giant monospace title under the strip. It **scrambles through random codes while the strip moves** and settles on the name of the centre card.
- A full-screen **glass-slab post-process**. The edges of the screen refract and split the cards into RGB like a rounded glass lens. Three independent **red, green and blue light patches** drift around the screen border and mix into pastel mint, cyan, blue, lavender and pink.

Nothing moves on its own except the edge lights and the spinning cross. **Motion is scroll-driven only**, with eased inertia. Match every detail below.

---

## 1. Global

- **Font:** JetBrains Mono 400/500 (Google Fonts), used for everything.
- **Tokens:**
  - `--txt: #e7e4ee`
  - `--mute: rgba(231,228,238,.56)`
  - `--base: #0f0e14`
- **Stage:** `html, body { height: 100%; overflow: hidden; background: var(--base) }`.
- **Canvas:** one WebGL canvas, `position: fixed; inset: 0; width: 100%; height: 100%`. With CSS `inset: 0` you must also set width and height to 100%, otherwise the canvas is oversized.
- **Library:** three.js r128 from `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`.
- **Small UI text:** `font-size: max(9px, .74vw)` with `letter-spacing: .04em`, uppercase.
- **Link hover underline:** a 1px `::after` line under each link that scales from 0 to 1 (`transform-origin` right, then left), over .45s `cubic-bezier(.16,1,.3,1)`.

## 2. Assets (exactly these URLs)

All images go through the Higgsfield image proxy:

`https://images.higgs.ai/?default=1&output=webp&url=<encoded png url>&w=800&q=85`

Use `w=800` for cards and `w=1100` for the detail overlay. The PNG base is:

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_<id>.png`

Ten experiments, in order: `[id, label, description]`.

1. `115951_dfbb63e2-69b4-466d-9ad7-f4f7de9cd24c`
   - Label: **GLT PRFL**
   - Description: "A portrait torn apart by its own compression artifacts." (Glitch portrait: a woman in profile with cyan and magenta RGB-shifted scanlines on black.)
2. `115952_fa09b8fe-2f53-4d81-9284-5d78071532bd`
   - Label: **NBL BLB**
   - Description: "A liquid metaball that reshapes itself around a tiny nebula." (An orange-to-violet liquid blob on a starfield.)
3. `115951_23ecfa34-c7f3-4075-8dcb-d8e0e502fcba`
   - Label: **DTH FRM**
   - Description: "Portraits rebuilt from ordered dither blocks." (A black-and-white portrait breaking into pixel blocks.)
4. `115844_f4f7427a-8b16-4e63-aa5c-b27873498709`
   - Label: **PXL GLPH**
   - Description: "An 8-bit glyph engine that turns sound into a pixel sigil." (A red and black pixel creature on electric blue.)
5. `115845_9e7421de-5902-47f8-81a3-d02392c56fb0`
   - Label: **CHR KNOT**
   - Description: "An endless chrome knot, tied and re-tied in real time." (A chrome torus knot on black with tiny HUD text.)
6. `115844_481db69e-e141-4bb7-869c-4d56cd1a609a`
   - Label: **TYP ARC**
   - Description: "Condensed type reprinted through a virtual xerox loop."
7. `115845_d2d9b7b9-4f9b-417d-92f4-3cac1fc68881`
   - Label: **MSC CUBE**
   - Description: "A low-res voxel cube glowing in a field of tiles."
8. `115844_68bb6bd9-4c0b-4fa9-b6ae-e521d48fabeb`
   - Label: **MLT SPHR**
   - Description: "A wireframe planet melting into a neon puddle." (A green wireframe sphere.)
9. `115844_e3917370-94ca-4fde-b231-938c6630c739`
   - Label: **HLO SILK**
   - Description: "Iridescent fabric folding under a wind you steer." (Holographic silver silk.)
10. `115845_bc9dcc9e-09cd-4e45-9072-8d19420c45ac`
    - Label: **HEX 7F**
    - Description: "Hex numbers cut, glitched and halftoned." (A giant black "0x7F" on acid yellow with a halftone.)

**Spinning cross video:** a dark 3D plus sign rotating on black, a 5 s loop.

- URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_115952_fb332608-6f05-451c-9416-bbba87baffce.mp4`
- Attributes: `muted loop playsinline`, `crossOrigin="anonymous"`.
- Display: shown with `mix-blend-mode: screen` so the black disappears.

Load textures with `THREE.TextureLoader` (`setCrossOrigin('anonymous')`, `minFilter = LinearFilter`).

## 3. Layout (percentages of the viewport, measured from the reference)

**Top nav.** All items are `position: fixed`.

- "LAB.EXP" at left 31.1%, top 1.7%.
- "LIST/GRID" at left 37.5%, top 4.5%.
- Centre logo at left 50% (translateX(-50%)), top .6%:
  - a 40×46 line-art glyph, max(20px, 2.2vw) wide, stroke #e7e4ee 1.6;
  - the glyph has a vertical stem with a cross bar, a circle r7 with an inner dot r2.4, side ticks, and two little legs;
  - under it, "VZX" at max(8px, .62vw) with letter-spacing .12em.
- "ABOUT" at left 61.6%, top 4.5%.
- "LET'S TALK" at left 66.4%, top 1.7%.

**Footer** (bottom 2.1%):

- "SFX" toggle at left 1.1%, with a tiny speaker SVG whose sound waves appear when it is on.
- "EXPERIMENTS HUB" at left 29.1%.
- "VEKTOR" centred at 50%.
- "©2026" at left 68.8%.
- A palette list at right 1%, stacked vertically and right-aligned:
  - items: BLACK, RED, GREEN, YELLOW, BLUE;
  - font-size max(8px, .66vw), line-height 1.18, opacity .6;
  - the active item is at opacity 1 with a "▪ " prefix.

**Title:**

- Position: left 29%, top 85.7%, translateY(-50%).
- Type: font-size 4.5vw, weight 400, letter-spacing .02em, `white-space: pre`.

**Rule:** a 1px line at left 57.1%, top 89.7%, width 13.8%, rgba(231,228,238,.5). On it sits a 1×7px tick that slides to `index/9 × 100%` of the line over .6s `cubic-bezier(.16,1,.3,1)`.

**Cross:** centred at left 50%, top 76%, 16vw wide, aspect 1912/1080; clicking it jumps the strip 3–6 cards ahead.

## 4. The card strip (one WebGL scene, orthographic camera in CSS pixels)

The strip is 3 copies of the 10 cards (30 meshes), wrapped infinitely: `x = wrap(i*PITCH - pos)` over a span of 30×PITCH.

**Geometry:**

- `CARD_W = .174 × viewport width`, `GAP = .0046 W`, `PITCH = .1786 W`.
- Each card is a `PlaneGeometry(1, 1, 48, 1)` positioned in the **vertex shader** from:
  - uniform `uX` (card centre in viewport widths);
  - `uRes`;
  - `uS` (hover scale);
  - `uGrid` with `uGR` (grid layout rect).
- **Top edge.** It is computed per vertex and is flat except at the far edges:
  `topY = H*(.217 - .03*smoothstep(.30, .45, |dxn|))`,
  where `dxn` is the vertex's x offset from the screen centre divided by W.
- **Bottom edge.** It is flat for each card and steps up with that card's distance from the centre:
  `botY = H*(.659 - .135*smoothstep(.12, .39, |uX|))`.
  - The two centre cards are about 44% of H tall.
  - The next ones are about 38%.
  - The outer ones are about 33%, with their tops lifting slightly.
- On mobile (<760px): `topY` base .26, `botY` base .60, and distances multiplied by 1.6.
- The card is vertically centred between topY and botY, scaled by `uS`.
- Mix to the grid rect by `uGrid`.

**Fragment shader:**

- **Rounded corners.** Use an SDF in real pixels: `uSize` is the card's on-screen size, and the radius is 4.8% of the card width. Alpha is `1 - smoothstep(-.8, .8, d)`.
- **Block-reveal glitch.**
  - Split the card into a **5 × 7 grid** of cells.
  - Each cell gets a random threshold `r = hash(cell + seed)*.92 + .04`.
  - Cells whose `r > uRev` are covered with near-black `vec3(.043, .043, .058)`.
  - Cells within .12 of opening show a pixelated sample of the image: the cell-centre texel × .8, mixed at .85.
- **Reveal timing.** `uRev` animates 0→1 over 750 ms:
  - every time a card **enters** the visible range (|x| < .62), with a random 0–120 ms delay;
  - on load (intro reveal staggered by distance: `(time - .2 - |x|*.8)/.9`).
- **Loading and hover.** Show a flat dark `vec3(.05)` until the texture loads. Hover brightens by 8% and scales by 1.5%.

**Labels.** Each card has a DOM label: its experiment code, rgba(231,228,238,.62).

- Placement: the label's bottom-left sits 0.6% H above the card's top-left corner, offset 2px right.
- Tilt: it is rotated to the angle of the card's top edge, so labels on the far cards tilt with the lift.
- Positions come from a CPU mirror of the vertex maths, `cardPt(card, u, v)`, which is also used for click picking.

## 5. Motion (measured from the reference)

- **Input.** Wheel (either axis), pointer drag and arrow keys move `target`; there is **no idle drift and no snapping**.
  - Wheel: `target += delta × .00042` (×2 on mobile).
  - Drag: `target = start - dx/W × 1.1`.
  - Arrows: ± one pitch, rounded.
- **Easing.** Every frame: `pos += (target - pos) × (1 - (1 - .12)^(dt×30))`. That is a ~10-frame ramp and a ~30-frame decay at 30 fps, like the reference.
- **Centre card.** The card with the smallest |x| becomes the centre card. When it changes, move the rule tick (and play a 1400 Hz blip if SFX is on).
- **Title.**
  - While `|target - pos| > .004`, replace the title text every 3rd frame with a random code: a random 2–3 character block, a space, then a random 3–4 character block, from A–Z and 0–9 (e.g. "X5 F6A", "4HL 901W", "QR5 QWI").
  - When the strip stops, it shows the centre card's label (e.g. "GLT PRFL").
- **Cross.** Its video speed increases with scroll speed.

## 6. Glass-rim post-process (the key look; not CSS gradients, not blurred blobs)

Render the flat background and the cards into a `WebGLRenderTarget` at device-pixel size. Then draw a full-screen quad with this shader:

1. **Rounded-rect SDF of the viewport.**
   - Corner radius: `.22 × min(W, H)`.
   - `d` is the distance inside the edge.
   - Rim width: `.17 × min(W, H)`, widened by up to 30% along the bottom (`smoothstep(.25, 0, uv.y)`).
   - `t = clamp(1 - d/rim, 0, 1)`.
2. **Refraction.**
   - Take the outward normal `n` from finite differences of the SDF.
   - Sample the scene at `px - n × t² × rim × .46`. This samples inward, so content near the rim is magnified and bends around the rounded corners, and the outer cards curve like they are seen through the edge of a glass slab.
3. **Dispersion.**
   - Sample R at offset ×1.06, G at ×1.00 and B at ×0.94.
   - Average 5 taps along the tangent, spread `t³ × .003 × min(W, H)`.
4. **Edge light.** Three independent R, G and B light patches drift around the perimeter, each lifting a single channel.
   - Angle: `ang = atan((y - H/2)/H, (x - W/2)/W)`, with time T in seconds.
   - Channel fields:
     - `lr = .5+.5*(.62*sin(2ang+.55T) + .38*sin(3ang-.41T+1.7))`
     - `lg = .5+.5*(.62*sin(2ang-.47T+2.3) + .38*sin(ang-.33T+4.1))`
     - `lb = .5+.5*(.62*sin(ang+.38T+4.6) + .38*sin(3ang+.52T+.9))`
   - Shape each with `smoothstep(.32, .9, l)`, then `G *= 1 - .65R` (it never turns yellow).
   - Mask:
     - `k = min(xEdge/(.12W), bottom/(.19H), top/(.09H))`, clamped;
     - `mask = (1 - k)^1.7`.
   - Final colour: `light = L + vec3(.16, .15, .34)` (the lavender carrier), desaturated 12%, then `col += light × mask × .34`.
   - Result: the borders slowly cycle through mint, cyan, blue, lavender and pink, strongest at the bottom centre and the corners, and the tint lies over the cards too.
5. **Background.** The background scene under all this is only a flat colour (`uBase`, default `vec3(.059, .055, .078)`) with a faint centre lift `×(1 + .25×(1 - radial distance))` and ±.006 grain.

The palette buttons lerp `uBase` at 5% per frame to:

- BLACK `.055,.055,.065`
- RED `.085,.05,.06`
- GREEN `.059,.055,.078`
- YELLOW `.08,.075,.05`
- BLUE `.05,.06,.09`

## 7. Interactions

- **Click a card** (no drag) to open a detail overlay:
  - fixed, `rgba(15,14,20,.92)`, a 2-column grid;
  - it opens with `clip-path: inset(50% 0 50% 0)` → `inset(0)` over .7s `cubic-bezier(.77,0,.18,1)`.
  - Left side: the 1100px image (70vh tall, aspect .68, 0.6vw corner radius), covered by the same **5×7 dark-block grid**, whose blocks vanish at random (delay 300–1000 ms).
  - Right side: "EXPERIMENT 0N" in muted text, the label at 4.5vw, and the description (max 44ch, line-height 1.7).
  - "CLOSE" sits top-right; Esc also closes it.
- **LIST/GRID** morphs the strip into a centred 5×2 grid:
  - cards .13W wide, aspect .68;
  - progress lerps at `1 - .88^(dt×60)`;
  - every card re-runs its block reveal;
  - the title, rule and cross fade out.
- **LAB.EXP, ABOUT and LET'S TALK** show a small centred toast for 1.8 s: "LAB.EXP — 10 EXPERIMENTS", "VEKTOR LAB · CREATIVE CODE STUDIO", "HELLO@VEKTOR.LAB".
- **SFX** toggles WebAudio square-wave blips (660 Hz on toggle, 1400 Hz on a centre change, 440 Hz on open, 220 Hz on the cross).
- The cursor becomes a pointer over cards.
- Render order per frame:
  1. into the render target: clear, background, cards;
  2. to the screen: the glass pass.
  3. Start the loop after `document.fonts.ready`.

## 8. Responsive (<760px)

- **Nav and footer:** hide LAB.EXP and LET'S TALK. LIST/GRID moves to left 6%, and ABOUT to right 6%. Hide EXPERIMENTS HUB and ©2026.
- **Title, rule and cross:**
  - title: left 6%, top 82%, 10vw;
  - rule: left 6%, top 89%, width 50%;
  - cross: 46vw at top 70%.
- **Strip:** the curve maths takes the mobile constants from section 4.
- **Overlay:** stacks into one column.