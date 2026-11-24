# Found — The Curiosity Cabinet with a Web-Spinning Spider (exact recreation prompt)

Give me a single-file, full-screen home page for **found**, a personal archive of curious objects called "the curiosity cabinet". The page is flat electric blue with a giant white wordmark `found` in the middle. Collectible cut-out objects float around it: a "Main Character" mug, a frosted glass radio player, a retro laptop in a glass sleeve, a pink book with an iPod, and a "CALL MY LAWYER" t-shirt at the bottom edge.

A photo-real jumping spider lives on the page. It drops in on a silk thread, chases a fly that replaces the mouse cursor, and walks on inverse-kinematics legs cut from one photo. As it moves, it spins real-looking silk threads between the letters and objects: sagging verlet ropes with dew drops, fuzz, iridescence and shadows that fall only on the objects. Click to make it pounce on the fly and wrap it in silk. Press Delete to shake the web off. When it rests, its head crossfades to a cute face that blinks, and later it falls asleep.

All of it runs in one HTML file with a single 2D canvas and no libraries. The live original was a small Preact app, and plain DOM plus vanilla JS is fine. The only external resources are the Inter font, which the supplied file embeds, and three radio streams.

**Source of truth:** the supplied **HTML Code** section is the complete working page. It has all 18 images as base64 data URIs and Inter embedded. Reproduce every value below exactly. When in doubt, copy the behaviour of that file.

---

## 1. Page basics

- Title `Found`. The viewport meta includes `viewport-fit=cover`.
- Font: Inter 400 / 500 / 600 (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`). The standalone embeds the latin subset as a woff2 data URI. Stack: `"Inter", system-ui, -apple-system, "Segoe UI", sans-serif`.
- Colours: `--blue: #1129e2` (page), `--ink: #ffffff`, `--ink-70: rgba(255,255,255,0.7)`, `--glass: rgba(255,255,255,0.1)`. `color-scheme: dark`.
- Design frame: a Figma frame 2000 × 1125. `--u: min(calc(100vw / 2000), calc(100dvh / 1125))`.
  - Horizontal positions are in vw (`x / 20 * 1vw`). Vertical positions are in dvh (`y / 11.25 * 1dvh`). Sizes use `--u`, so the composition fills any screen while objects keep their proportions.
- `body` is blue with `overflow: hidden`. `.page` is `100vw × 100dvh`.
- `.frame` holds every element, absolutely positioned, white Inter 400, `user-select: none`.
- Layer order, bottom to top:
  1. `.frame` (all content).
  2. `.web-layer`: one full-size canvas, `pointer-events: none`.
  3. `.over`: a second copy of the big wordmark in which only the letter **o** is visible. This makes the spider crawl *under* the "o" but over the other letters.
- Global cursor: `html, body { cursor: none; touch-action: none; overscroll-behavior: none; user-select: none; -webkit-touch-callout: none }`. Buttons, links and inputs get `cursor: pointer; touch-action: manipulation`.

## 2. Layout (desktop, sizes in u)

- **Nav** `.top-nav`:
  - Position: left/right `max(16px, 7vw)`, top `max(12px, 38/11.25 dvh)`, height `56u` (min 40px). A flex row with space-between.
  - **Logo:** 157 × 44u.
    - Two stacked outline-folder PNGs: back 53 × 41 at top 6.33u, front 53 × 34 at top 12.33u.
    - Wordmark `found` at left 70u, 36u / 44u line height, tracking −0.08em.
  - **Links:** `home, archive, oddities, experiments, the drawer, about, contact`.
    - 22u, tracking −0.08em, gap 32u, no wrap.
    - The first (`home`) is active: weight 500 with `text-decoration: line-through`.
  - **Right icons:** search and menu (26u PNGs), gap 32u, in a 157u-wide right-aligned box.
- **Big wordmark** `.found`:
  - Centred at left 50%, top `547/11.25 dvh − 48u`, `translate(-50%,-50%)`.
  - 350u, line height 240u, tracking −0.1em, `text-indent: -0.1em`.
  - Each letter is a span: `f`, `o` (transparent in `.frame`, visible in `.over`), `und`.
- **Mug** (241 × 220 PNG, "Main Character" in handwriting): left `205/20 vw`, top `359/11.25 dvh − 48u`, width 241u.
- **iBook in a glass sleeve** (312 × 377 PNG): right `162/20 vw`, top `323/11.25 dvh`, width 312u.
- **Book and iPod in a glass sleeve** (293 × 322 PNG): right `376/20 vw`, top `689.5/11.25 dvh`, width 293u.
- **T-shirt** (250 × 226 PNG, "CALL MY LAWYER (888) 799-2021" in handwriting): centred, `bottom: 0`, width 250u.
- **Radio player** `.player`:
  - Box: left `max(16px, 7vw)`, top `509/11.25 dvh − 48u`, 291 × 172u. Padding 16u, radius 24u, column gap 12u.
  - Glass: `rgba(255,255,255,.1)`, `backdrop-filter: blur(12u)` and `inset 0 0 0 1px rgba(255,255,255,.25)`.
  - **Head:** 40u art thumbnail (radius 12u), title `Support the arts` (18u, weight 600) and sub `date an artist` (12u, 70% white). A 20u heart icon sits on the right.
  - **Progress:** a 4u bar on `rgba(255,255,255,.2)` with a 46% white fill.
  - **Times row** (10u, weight 600, 70% white, tabular numerals): on the left, a 6u dot plus the uppercase status `live`; on the right, the station name.
  - **Controls row:** shuffle 16u (55% opacity), previous 24u, play 48u (a white circle), next 24u, repeat 16u (55% opacity).
  - **Playing:**
    - The play icon becomes a white 48u circle with two 4.5 × 16u blue bars.
    - The bar becomes a flowing gradient: `linear-gradient(90deg, rgba(255,255,255,.35), #fff 40%, rgba(255,255,255,.35) 80%)`, size 200%, animated to `-200%` over 2.4s linear infinite.
    - The dot turns `#ff5a5a` and pulses to 35% opacity over 1.6s.
  - **Status texts:** `live`, `tuning…`, `offline`.
  - **Stations:** Groove Salad `https://ice1.somafm.com/groovesalad-128-mp3`, Lush `https://ice1.somafm.com/lush-128-mp3`, Drone Zone `https://ice1.somafm.com/dronezone-128-mp3`. Previous and next cycle through them; play toggles a `new Audio()` (preload none).
- **Headline** `.cabinet` `the curiosity<br>cabinet`: left `max(16px,7vw)`, top `775/11.25 dvh`, width 396u, 80u / 80u, tracking −0.1em.
- **Tagline** `A personal archive of the wonderfully random.`: left `max(16px,7vw)`, top `959/11.25 dvh`, 24u / 26u, tracking −0.06em.
- **Hint:** `#spider-instructions`, fixed bottom-right at `max(12px, safe-area)`, `11px/1.5 Arial`, tracking .02em, `rgba(255,255,255,.65)`.
  - Desktop text: `Del / Backspace — clear web · Double-click — make the spider jump`.
  - Touch (`hover:none and pointer:coarse`), 10.5px / 1.6: `Hold — clear web<br>Double-tap — make the spider jump`.
- **Web anchors:** every element the web can stick to carries `data-web-anchor`: the logo word, each nav link, both nav icons, the big wordmark, the mug, iBook, book, player, headline, tagline and t-shirt. The t-shirt also has `data-stick="bottom"`.

## 3. Responsive

- **Landscape and short** (`min-aspect-ratio:1/1` and `max-height:560px`): `--u: 100dvh/900`. Hide the tagline and mug. Book at right `120/20 vw`.
- **Landscape at 1100px wide or less:** hide the nav links.
- **Portrait** (`max-aspect-ratio:1/1`): `--u: min(100vw/560, 1px)`. Hide the links. Nav top 16px. Then stack from the bottom up:
  - T-shirt 226u at the bottom.
  - Tagline at bottom `226u + 16px`, left and right 16px, wrapping, `max(13px, 26u)`, line height 1.2.
  - Headline at bottom `288u + 32px`, left 16px, 80u.
  - Player at bottom `448u + 56px`, left 16px.
  - Book at right 3vw, bottom `440u + 50px`, width 210u.
  - Wordmark at top `min(31dvh, 100dvh − 700u − 56px)`, 195u / 150u.
  - Mug at left 2vw, top `56px + 1dvh`, width 165u.
  - iBook at right 3vw, top `50px + 1dvh`, width 165u.
- **Portrait at 700px tall or less:** hide the mug and iBook.
- **Spider scale** `t`:
  - Portrait: `clamp(w/480, .78, 1.1)`.
  - Height under 560: `max(.68, h/620)`.
  - Otherwise: `min(w/1440, h/810)`.
  - Final clamp: .6–1.25.
  - Then spider `size = 1.63·t`, `flySize = max(.75, 1.05·t)`, and the unit `K = size·0.12` px per sprite unit.

## 4. Images (all embedded as data URIs in the supplied file)

| Image | Format, size | Used for |
|---|---|---|
| Spider photo | WebP 560 × 560 | Top view of a brown and cream banded jumping spider. Sliced into the body, head and 8 legs. Sprite space is 1254 units wide, so the image scale is `560/1254`. |
| Idle head | WebP 308 × 308 | Cute big-eyed spider face. Sprite space 308. |
| Fly | WebP 240 × 246 | Top view of a house fly. Sprite space 920 × 945. |
| Objects | PNG | Book 293 × 322, iBook 312 × 377, mug 241 × 220, t-shirt 250 × 226, all with transparency. |
| UI icons | PNG | Player art 40, logo back 53 × 41, logo front 53 × 34, search 26, menu 26, heart 20, shuffle 16, previous 24, play 48, next 24, repeat 16. |

## 5. Spider rig (sprite units, 1254 base)

- **Body points:**
  - pivot `(627,600)`, waist `(627,548)`, spinneret `(627,150)`.
  - Abdomen ellipse `(628,345) r 220×205`.
  - Head ellipses `(630,680) r 172×148`, `(545,880) r 74×70`, `(712,880) r 74×70`.
- **Masks:** the abdomen and head layers are cut from the photo with these ellipses, drawn black with `blur(2·scale px)` and applied `destination-in`.
- **Legs:** four legs per side, each as hip, knee and foot in the image. The left side mirrors the right with `x → 1254 − x`.
  - `[(470,760),(370,830),(400,1160)]`
  - `[(460,665),(300,690),(100,955)]`
  - `[(480,605),(370,580),(55,475)]`
  - `[(490,560),(360,420),(410,52)]`
- **Leg strips:** each leg is resampled from the photo into a straight strip:
  - Length = femur + tibia. Width `legWidth 92`.
  - Bilinear sampling along the hip→knee→foot polyline.
  - Alpha fades out over the outer 28% of the half-width.
  - `split` = femur share of the strip, used to draw the femur and tibia halves separately.
- **Body space:** image point → body point `(y − 600, −(x − 627))`, so the head points along +x of the heading. Each leg stores `hip` and `rest` (its foot) in body space, and `a` / `b` are the femur and tibia lengths.
  - If `a+b < 1.15·|rest−hip|`, scale a and b up to that.
  - Gait group = `(legIndex + (rightSide?0:1)) % 2`, an alternating tetrapod gait.

## 6. Spider motion (per frame, `dt = min(0.033 s, real delta)`)

- **Target:** the fly's position, or the raw pointer when there is no fly image. The spider keeps a gap of `560·K` (`330·K` without the fly).
  - Speed `min(760, (distance − gap)·4)` px/s, eased with `1 − e^(−10dt)`.
  - Heading turns toward the target with `1 − e^(−8dt)`.
  - Position is clamped 10px inside the canvas.
  - Body sway `z = clamp(−angularVelocity·0.08, ±0.35)`, eased with `1 − e^(−6dt)`, rotating the abdomen about the waist.
- **Intro:**
  - Start: x = W/2, y = −760K, heading straight down, with a live silk thread from an anchor at `(W/2, −2)`.
  - After 3s it drops to H/2 over 2.3s with `1 − (1 − v)^2.4`.
  - Then a damped bounce `14·e^(−3.2v)·sin(6.5v)`, x sway `sin(1.8u)·8·e^(−0.5u)` and a tiny heading wobble.
  - 1.3s after arriving it lands: squash, and the web vibrates in a 140px radius at strength 2.
- **Feet:**
  - Target = the rest point placed in world space, plus velocity × 0.09.
  - **Step trigger:** foot more than `130K` from its target (front pair `0.7×`), or more than 30% of that when nearly stopped. Also when overextended (more than 98% of reach) or when a front foot falls behind the hip.
  - A leg only steps if no leg of the other group is mid-step, unless it is overextended or more than 1.6× the trigger distance.
  - **Step duration:** `clamp(0.15 − speed/3200, 0.055, 0.15)` s, with cubic ease-out from the old to the new foot position.
  - Each footfall vibrates nearby threads (radius 30, strength 0.6).
- **IK:** two-bone law of cosines. Choose the knee solution that bends outward for that side.
  - While stepping, the knee lifts outward by `sin(π·t)·26K` (front legs 12K) and the foot by `sin(π·t)·20K`, both away from the body centre.
  - Each bone is drawn as its slice of the leg strip, rotated along the bone, with 12% overlap at the ends.
- **Drawing order:** legs, back to front, then the abdomen, then the head.
  - **Abdomen:** breathes with scale `1 + sin(phase)·(0.025 + 0.03·sleep)`; phase speed is `3.2 − 1.8·smooth(sleep)`.
  - **Landing squash:** `lt` decays 4/s; the abdomen scale is `(2 − y, y)` with `y = 1 − 0.1·lt`.
  - **Compositing:** the whole spider is rendered to an offscreen canvas, then composited with a shadow.
    - Colour `rgba(0,0,0, 0.42 − min(0.24, h/500))`, blur `7 + 0.14h`, offset `(5 + 0.35h, 9 + 0.6h)`.
    - `h` is the current jump height. The spider also scales by `1 + h/260`, so it reads as lifting off the page.
- **Rest face:**
  - When the pointer has been still for more than 0.25s, with no jump, speed under 25 and all feet planted, `qt` ramps up 3.2/s (down 6/s).
  - The photo head fades to 15% and the idle head image fades in on top: scale `3.3·(0.9 + 0.1x)`, mapping `(154,150)` → `(630,690)`.
  - **Blinks:** after 1.5s, a 0.2s blink, then a second blink 0.33s later, then every 3–5s.
    - Each of the 6 eyes (`[139,158,12.5]`, `[170,158,12.5]`, `[117,150,7.5]`, `[192,150,7.5]`, `[112,136,4]`, `[197,136,4]`) gets an eyelid.
    - The eyelid is a curved shape filled with the head's own sampled skin colour (darkened ×0.82 / 0.78 / 0.75), sweeping down inside a clip circle, with a `rgba(40,22,12,.7)` lid line.
- **Sleep:**
  - After 8s at rest, `sleep` ramps over 1.6s. Legs tuck to 62% of their reach, the eyes stay shut and the body shrinks 3%.
  - Three white `z` letters drift up and right from body point `(260,−170)`:
    - Weight 700, system-ui, size `(12 + 14c)·scale`.
    - Rising 70px with a 25% black shadow and fading in and out as `sin(π·c)`.
  - A landed fly also snores at half size.
  - **Waking:** moving the pointer while `sleep > 0.6` makes a small startled hop (0.3s, height 26) and vibrates the web.

## 7. The fly cursor

- **Drawing:** the fly is drawn at `79·flySize` px wide. The wings are cut from the photo with an 11-point polygon, `(398,380) (330,415) (250,515) (180,615) (132,720) (148,795) (212,805) (305,742) (385,652) (410,560) (414,455)`, mirrored for the right wing. Wing hinge `(388,405)`. The body is the photo minus the wings.
- **Following:**
  - The fly follows the pointer with ease `1 − e^(−(28 − 20·recoil)·dt)`.
  - Buzz jitter: `(sin(23.1B) + 0.6·sin(37.7B + 1.3))·2.2` and `(sin(29.3B + 0.7) + 0.6·sin(41.9B))·2.2`, scaled by `1 − landed`.
  - It turns along its motion above 60 px/s.
- **Landing:** after 1.2s still, `landed` ramps up 3/s (down 10/s).
- **Wings:**
  - Flying: four ghost copies at 34 Hz (46 Hz when caught). Each wing rotates `±0.9·q` around the hinge with `scaleY(1 − 0.25q)`.
  - Landed: the wings fold.
- **Shadow:** `rgba(0,0,0, 0.2 + 0.18·landed)`, blur `3 + 9y`, offset `(3 + 14y, 5 + 26y)`, with a bob of `sin(6B)·1.2·y`, where `y = 1 − landed` is the hover height.
- **Hiding:** the fly fades out over buttons, links, inputs and `[data-no-spider]`, where the system pointer shows instead.

## 8. Silk

- **Threads:**
  - Verlet ropes of 12 segments (13 points).
  - Damping 0.975, gravity `110·dt²`.
  - Wind `(sin(0.45B)·0.6 + sin(1.3B + 1.7)·0.4)·(0.6 + 0.4·sin(1.1B + 0.012y + phase))·22·dt²` on x.
  - Four constraint passes with both ends pinned. Rest segment length `distance/12 × 1.01–1.015` gives a slight sag.
  - The pointer pushes rope points within 36px.
- **Live thread:** runs from the last anchor to the spinneret, thickness 1.25.
- **Anchor points:** points sampled every 7px along the visible outline of every `[data-web-anchor]` element.
  - **Text:** each glyph is rasterised to a canvas in its computed font and the edge pixels (alpha > 128) are kept.
  - **Images:** the alpha edge (alpha > 140).
  - **Boxes:** rounded-rect perimeters.
  - These silhouettes are also kept as a mask canvas.
- **Attaching:**
  1. When the spinneret comes within 70px of an outline point, at least 30px from the live thread's start and more than 54px from it, the live thread is pinned there.
  2. That thread gets dew drops.
  3. A radial thread (thickness 0.7) joins this point to the nearest earlier anchor within 288px.
  4. With 75% probability, another thread (0.85) joins it to the nearest outline point within 204px (not within 45px).
  5. A new live thread starts, and the web vibrates in a 60px radius at strength 1.2.
- **Free space:** with no anchor elements on the page, a point is dropped every 120px.
- **Vibration:** points within a radius get random kicks of `strength·(1 − d/r)`. The whole rope is shaken a little when an end is near. Dew drops on a shaken thread start sliding with a 35% chance.
- **Rendering each thread:**
  1. A halo: alpha 0.06, width 4×thickness.
  2. The main strand per segment: width `thick·(0.9 − 0.35·sin(πi/12))`, alpha 0.8, silk colour `rgba(255,255,255,0.75)`.
  3. An iridescent overlay `hsl(190 + 150P, 100%, 74%)` at alpha `0.12 + 0.3P³`, with `P = 0.5 + 0.5·sin(2·angle + 0.3B + phase)`.
  4. Two wavy sub-fibres offset ±1.1 / 0.9 × thickness, alpha 0.38, width 0.45.
  5. Micro-hairs: about 3 per 1.1px (40% on touch screens), length 0.5–2.7 × thickness, alpha 0.55, width 0.35.
  6. Fluff: 40% of threads carry 1–2 clumps, either 5 grey-brown dust dots (`#8a7a6a`) or 10 curling cream fibres (`rgba(240,232,220)`).
  7. Dew drops: count `floor(length/55·(0.4 + rand))`, radius 1.6–6.2, drawn with a 64px glass-bead sprite (radial gradient rims, warm caustic `rgba(255,210,150,.45)`, white specular).
  8. A white glint segment travels along each thread at 0.6 per second.
  - Threads fade to 50% over 90s.
  - Each anchor point gets 30 tiny hair tufts and a 3px bead.
- **Shadows:** all threads and drops are drawn in black on an offscreen canvas with shadow `rgba(8,14,70,.42)`, blur 3.5, offset (7, 11). That canvas is masked (`destination-in`) by the anchor silhouettes, so web shadows fall only on letters and objects, never on the blue.
- **Drops:**
  - Sliding drops move with the slope (`du += slope·9dt`, ×0.95).
  - They fall off when the slope is steep, when they reach the ends, or randomly when they are big.
  - Falling drops use gravity 1100.
  - A drop that lands on an object or letter silhouette after falling more than 10px becomes a splat: a squashed bead with a soft shadow. At most 400 splats.

## 9. Objects react

The images that are anchors (mug, iBook, book, t-shirt and the nav icons) wobble as the spider walks past.

- Within `260K` of the image box, at speed over 40:
  - Torque `cross(offset, velocity)/size²`, clamped ±2.5, ×120·dt.
  - Push `0.85·velocity·dt`.
- Damping `e^(−2.8dt)`. Angle spring beyond 24° (×8) and offset spring beyond 50px (×8).
- The t-shirt (`data-stick="bottom"`) pivots at `50% 100%`, never translates, and springs back harder beyond 8° (×20).
- Applied through CSS `rotate` and `translate`.
- Anchors are re-sampled 0.3s after everything stops moving.
- A jump landing spins nearby objects by ±16–28°.

## 10. Input

- **Mouse click** (or double-tap on touch), anywhere except controls: the spider pounces at the fly.
  - It lands where its mouth (heading × 360K) meets the fly, travelling at most 360K.
  - Duration `clamp(distance/1100, 0.28, 0.6)` s, ease-in-out quad.
  - Jump height `max(22, min(0.3·distance, 130))`, shown as scale and shadow.
  - On landing: squash, web vibration (140, 3) and nudged objects.
- **Catching:** if the fly is within `55·flySize` of the mouth, it is caught for 3–4.2s.
  - It trembles at 47 and 31 Hz and its wings buzz.
  - It is wrapped in a silk cocoon: 7 ellipse strokes of radius `30·flySize` drawing on progressively, plus 70 short fibres.
  - Then it breaks free and is flung 150px away, while the cocoon fades.
- **Delete / Backspace** (outside inputs): clear the web.
  - Every dew drop falls, the threads fade out at 2.6 per second and the web shakes hard.
  - Splats drop off-screen, and a fresh live thread starts from the spinneret.
- **Touch:** hold 650ms to clear the web (with a 30ms vibration), double-tap to move the fly and jump.
- **Pointer leaving the window:** the fly disappears and the spider stays put.

## 11. Loop and setup

- **Canvas:** DPR capped at 2, sized by a ResizeObserver.
- **Anchors** are sampled on resize, on `document.fonts.ready`, on `load` and after 600ms.
- **Frame order:**
  1. Update the fly.
  2. Update the image nudges.
  3. Update the spider (intro, jump, follow, feet).
  4. Update the rest and sleep state.
  5. Update the anchoring and the silk physics.
- **Draw order:**
  1. Web shadows.
  2. Threads, splats and drops.
  3. The spider through its shadowed offscreen.
  4. The z letters.
  5. The fly, and the cocoon when it is caught.