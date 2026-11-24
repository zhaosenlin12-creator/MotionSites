# Recreation prompt — "Kai Renn / KR.ST" dark three-view portfolio

Build a single-page, dark-mode portfolio for a fictional motion and brand designer called Kai Renn (wordmark "KR.ST"). It has three views switched by a floating dock: (1) Gallery, a WebGL sphere of looping website preview videos that you spin, zoom into and open an overview for; (2) Projects, a WebGL grid of the same videos with glass-lens edges, frosted labels and hover-to-play; (3) About, a WebGL page where a chrome robot head floats over a centred serif headline and a horizontal, endlessly looping text track slides past it, each line of text pulling away from the head like a magnet. Everything below is exact: reproduce every value.

The whole thing is one HTML file. Three.js 0.160.0 (ES module from jsDelivr, via an import map that maps "three" to https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js and "three/addons/" to https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/) and GSAP 3.12.5 (https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js, global) are the only libraries. No sound.

---

## 1. Media (all are MotionSites preview videos, 16:9 MP4, H.264, CORS `*`)

Base URL: https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/ — append the path and `.mp4`. Every video element is created with crossOrigin "anonymous", muted, loop, playsInline (plus the playsinline and webkit-playsinline attributes), preload "metadata".

| # | Path | Title | Category | Year | Description (used in overviews and the lightbox) |
|---|---|---|---|---|---|
| 1 | aaaf/glaze-motion | Glaze | Motion | 2026 | A three-part product story where glazed ceramics spin, drip and settle as you scroll. |
| 2 | a/obsisidianArea | Obsidian | Interactive | 2026 | An editorial hero where a winged figure breaks through the oversized wordmark. |
| 3 | aaaf/try-the-look-hero | Try The Look | Ecommerce | 2026 | Outfits swap on a live model the moment you hover a garment. |
| 4 | aaaf/loops-virtual-store | Loops Store | Ecommerce | 2026 | A virtual store you walk through room by room, with products on the shelves. |
| 5 | aaaf/vell-lookbook | Runway Lookbook | Interactive | 2026 | Looks walk down a runway and stop wherever your cursor lands. |
| 6 | uploaded/jackportofplio | 3D Portfolio | Portfolio | 2025 | A character-led portfolio hero with a big expressive 3D lead. |
| 7 | aaaf/virtualfit-arc-hero | Virtual Fitting | Ecommerce | 2026 | Garments arc around a mannequin and snap on when you pick one. |
| 8 | aaaf/vasari-vhs-hero | Shelf Hero | Portfolio | 2026 | Work stored as VHS tapes on a shelf. Pull one out to play the case. |
| 9 | aaaf/orvante-agency | Orvante Agency | Agency | 2026 | A monochrome agency landing page with campaign stills and a tight grid. |
| 10 | designs/orbit-spher-hero-interactive | Orbit Sphere | Interactive | 2026 | Cards orbit a glowing core. Drag to spin it, tap a card to bring it forward. |
| 11 | aaaf/reelmark-hero-interaction | Reelmark | Creator Platform | 2026 | A creator platform hero with a reel strip that scrubs as you move. |
| 12 | aaaf/lena-varga-hero | Lena Varga | 3D Portfolio | 2026 | A playful 3D sculptor portfolio led by a clay-soft mascot. |
| 13 | designs/ink-reveal-hover | Ink Reveal | Hover | 2026 | Ink blooms through the wordmark wherever the cursor passes. |
| 14 | aaaf/living-portrait-hero | Living Portrait | Portfolio | 2026 | A portrait that blinks, breathes and follows your cursor with its eyes. |
| 15 | aaaf/lumen-roof-hero | Solar Fog | Interactive | 2026 | A house at dusk that switches between day and night as you toggle. |
| 16 | aaaf/axon-hero | AXON | Portfolio | 2026 | A point-cloud bust drifting in a field of particles. |
| 17 | aaaf/clothing-rail-hero | Clothing Rail | Ecommerce | 2026 | Garments slide along a rail. Grab one to pull it into view. |
| 18 | aaaf/facet-glass-hero | Facet Glass | 3D | 2026 | Faceted glass panels catch the light as the page scrolls. |
| 19 | aaaf/nomi-hero | Nomi Agent | AI | 2026 | A scan-lined kitten mascot introduces an inbox agent. |
| 20 | aaaf/stellarmind-hero | Stellarmind | AI | 2026 | A starfield hero for an AI research lab with a slow camera drift. |
| 21 | aaaf/vhs-arc-hero | VHS Archive | Portfolio | 2026 | Tapes fan out in an arc, each holding one project. |
| 22 | designs/saffron-3d-webgl-landing | Saffron Field | Interactive | 2026 | Golden particles bloom into words as you move across the field. |
| 23 | designs/roadster-3d-car-landing | Roadster 3D | 3D | 2026 | A roadster turntable with paint and wheel swaps in real time. |
| 24 | aaaf/kinestra-card-story-v2 | Card Story | Interactive | 2026 | A story told through stacked cards that flip as you scroll. |

The Gallery uses items 1–20; Projects uses items 1–24. Six more (a/3dcha "Character Studio", designs/finsmith-fish-3d "FinSmith", aaaf/vante-ribbon-hero "Vante Ribbon", designs/honey-bee-melli-landing "Melli", aaaf/oraciteslArea "Oracite", aaaf/fernhollow "Flower Valley") exist in the data list but are not shown.

Every video keeps its native 16:9 aspect ratio everywhere. Nothing is cropped to portrait.

## 2. Fonts

Self-host three latin WOFF2 files from Google Fonts (or load the same families from Google Fonts):
- "Geist", variable weight 100–900, normal (https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2).
- "Newsreader", weights 300–500, normal (https://fonts.gstatic.com/s/newsreader/v26/cY9AfjOCX1hbuyalUrK4397yjA.woff2).
- "Newsreader", weights 300–500, italic (https://fonts.gstatic.com/s/newsreader/v26/cY9CfjOCX1hbuyalUrK439vCjohC.woff2).

Stacks: sans = "Geist", ui-sans-serif, system-ui, sans-serif. Serif = "Newsreader", ui-serif, Georgia, serif. All WebGL text is drawn into canvases with these fonts after document.fonts.ready.

## 3. Head and tokens

Title "Kai Renn — Motion & Brand Designer". Meta description: "Kai Renn is a motion and brand designer. A spinning sphere of interactive website work, a curated project index and a studio page." Viewport: width=device-width, initial-scale=1, viewport-fit=cover.

Colour tokens: --bg #0c0c0d (page and every WebGL clear colour), --ink #ededeb (all primary text), --mute #8a8a88 (secondary text), --pill #1c1c1e, --pill-h #262628, --line #232325. html and body are full height, overflow hidden, overscroll none, antialiased. Every view is a fixed full-viewport section (opacity 0, visibility hidden until shown) holding one absolutely-positioned canvas container.

Easing used in CSS everywhere: cubic-bezier(.16,1,.3,1). GSAP "expo.out" is the house ease for text reveals.

## 4. The dock navbar (shared)

A single frosted capsule fixed at the bottom centre: bottom 18px, centred with left 0 / right 0 / margin auto / width max-content (no transform). Padding 5px, gap 4px, radius 12px, background rgba(28,28,30,.66), backdrop blur 16px, 1px border rgba(255,255,255,.06), shadow 0 12px 40px rgba(0,0,0,.45), z-index 50. It starts at opacity 0 with no pointer events.

Contents left to right: the wordmark "KR.ST" (Geist 600, 14px, tracking −0.02em, padding 6px 10px 6px 8px, links to Gallery); a 1px × 18px divider (rgba(255,255,255,.1), 4px side margins); three tabs; another divider; the menu dot button.

Each tab is a 30px-tall flex row, padding 0 9px, radius 5px. It holds an italic Newsreader label (17px, line-height 1, max-width 0 and opacity 0 when inactive) and a Geist 500 number (12px, translateY −1px). Hover background rgba(255,255,255,.06), active background rgba(255,255,255,.1). The active tab animates its label to max-width 120px, opacity 1, margin-right 3px (max-width and margin over .7s on the house curve, opacity over .4s), while its number shrinks to 10px and lifts to translateY −6px, becoming a superscript, also over .7s. Tabs: "Gallery" 1, "Projects" 2, "About" 3.

The menu dot is a 30px square, radius 5px, with a 4px ink dot that scales ×2.2 (.5s) when open. Clicking it toggles a menu panel that opens upward: fixed, bottom 66px, centred (left 50%, margin-left −110px), 220px wide, padding 14px, radius 8px, background rgba(22,22,24,.82) with 18px blur and a 1px --line border. Closed it sits at translateY 6px, scale .98, opacity 0. Open: no transform, opacity 1, transitions .35s opacity and .5s transform on the house curve, transform-origin bottom centre. Inside: a 12px mute line "Available for select projects from January." then three serif 17px rows separated by 1px --line rules: "Studio 03", "Index 02", "Sphere 01" (the numbers are 11px Geist mute, right-aligned). Each row routes to its view.

The dock appears once: when the Gallery intro bursts into the sphere (or immediately on any other view) it tweens from y 16px, opacity 0 to y 0, opacity 1 over .9s expo.out and gains pointer events.

Routing: hash-based (#gallery default, #projects, #about). Switching fades the current view to opacity 0 (.35s power2.in), stops its render loop, hides it, then shows the next and fades it in (.5s power2.out). Each view is built lazily on first visit and keeps its state afterwards.

## 5. View 1 — Gallery (sphere of videos)

Renderer: WebGL, alpha true, antialias on non-touch devices, pixel ratio min(dpr, 2). Perspective camera, fov 60, at z 12. A conversion px(v) = v × (2 × 12 × tan(30°)) / viewportHeight turns CSS pixels into world units at the sphere's depth.

Layout constants: radiusX/Y/Z 250px (×0.8 when the viewport width is 1025–1440), planeSize 104px (×0.8 in the same range; 72px at ≤640), centerScale = planeSize × 120/82, expandHeightVh 70, expandPush 1.8, expandFade 0.1, expandDuration .8s power4.out. Twenty planes (PlaneGeometry 1×1, MeshBasicMaterial transparent, double-sided, depthWrite off, starting colour #1b1b1d until its video has a frame). Plane scale: the longer side equals planeSize, the other follows the video's aspect (16:9 → wider than tall). The texture is the full video frame: repeat (1,1), offset (0,0).

Positions: a Fibonacci sphere. For item i of N: y = i×(2/N) − 1 + (1/N), r = sqrt(1 − y²), angle = π×(3 − √5)×i, position = (cos(angle)×r, y, sin(angle)×r) times the radii. On phones (≤640) the radius is the half-width minus 24px minus half a plane. Every plane always faces the camera: its quaternion is the inverse of the sphere group's quaternion.

Spin model, every frame:
- drag: velocity += pointer delta × 0.001 (x drives yaw, y drives pitch); wheel and two-finger pinch add deltaY × 0.0002 to yaw.
- velocity × 0.94 each frame (friction); accumulated angle is smoothed with a factor of 0.11; the per-frame difference of the smoothed angle is applied as a rotation about world Y (yaw) and world X (pitch), premultiplied into the group quaternion.
- idle: an auto-spin of 0.001 rad per frame about an axis tilted 23° from vertical, which stops for good after the first user interaction.

Videos: each plane's video starts loading 200ms into the intro and plays once it has a frame. Every 300ms, videos on the far hemisphere are paused (when the plane's direction faces away: z/length below −0.25; resumes above −0.1) so only around ten decode at once. While a plane is zoomed, all others pause.

Intro sequence (first visit only):
- The centre shows the wordmark "KR.ST" drawn in Geist 600 64px into a canvas, displayed 90px wide, fading in (.6s, .2s delay).
- Side labels "Kai Renn" (left) and "Motion & Brand Designer" (right), Geist 13px, sit at 9% from each edge in overflow-hidden masks and slide up from yPercent 100 (.9s expo.out, stagger .07s, delay .5s). They are hidden at viewport ≤1024px.
- A counter at the bottom (Newsreader 14px, 3 digits, "001") slides in from below (.75s power4.out, .5s delay) and then tweens towards the share of loaded circle videos (.5s power1.out each update, capped at 099).
- After 2s, once the first ten videos have frames (or 30s pass), the counter tweens to 100 and slides out upward. The first ten planes appear on a circle of radius 240px (×0.75 on phones), starting at −90° and 36° apart, each fading in (1s power3.out) and scaling from 0.01 to 70px with back.out(1.7), staggered 0.1s. The circle spins 0.5° per frame.
- 1.3s later the spin ramps up to 7.3× over 1s (power2.in).
- 0.8s after that the wordmark fades out (0.75s power2.inOut), the side labels slide up out of view, and the ten planes collapse into the centre (1.25s power2.inOut, stagger 0.05s), stacking 1.5px apart in depth and growing to centerScale.
- 0.2s after the collapse ends, everything explodes: all twenty planes move from the centre (or from their stack position) to their sphere positions over 1s power3.out, with an overshoot multiplier of 1 + 0.1 × sin(π × t). The side labels slide back in, the dock rises in, and the "DRAG TO EXPLORE" hint (Geist 10px, tracking .24em, mute) fades in at the bottom.
Reduced motion skips the intro and shows the finished sphere with no auto-spin.

Hover: raycast on pointermove (batched once per frame). The hovered plane's title and category appear in the bottom caption (13px Geist 500 title, 14px Newsreader mute category, 6px gap); the caption text leaves upward (.25s power2.in) and the new one rises from yPercent 110 (.6s expo.out). The cursor is "pointer" over a plane, "grab" within 250px of the centre, otherwise default; "grabbing" while dragging.

Click (pointer moved under 6px and total path under 10px):
- Clicking a plane expands it: expand 0→1 over .8s power4.out. Its target height is 70% of the visible height (minus the reserved overview band), its width follows its aspect, and on phones it is capped at the viewport width minus 16px. It moves to the centre of the screen. All other planes are pushed outward ×1.8 and fade to 10% opacity. Its video plays. A cursor label "Overview" (Geist 500 12px, dark text on rgba(237,237,235,.92), radius 4px, offset 14px from the pointer) follows the mouse via gsap.quickTo (.5s power3.out) and scales from .6 to 1 (.6s power4.out) while over the zoomed plane.
- Clicking the zoomed plane again opens its overview: a reserved band of 290px opens at the bottom (factor 0→1, .8s power4.out), shifting the plane up by half that band and shrinking it to 70% of the remaining height. The overview panel (max 600px wide, centred, bottom 78px) fades up from y 16 (.7s expo.out, .12s delay). It shows the title (Geist 500 15px) with "Category, Year" (Newsreader 15px mute), a Close button (12px, 26px tall, --pill), the description (Newsreader 17px, line-height 1.35, #cfcfcc, max 54ch) and three 11px tags on --pill: "Preview video", "MotionSites", "Live WebGL". The cursor label changes to "Close".
- Clicking the zoomed plane while its overview is open closes the overview. Clicking anywhere else, pressing Esc or using the Close button collapses the zoom.

## 6. View 2 — Projects (WebGL grid)

Renderer: antialias, opaque, clear colour #0c0c0d, pixel ratio min(dpr, 2). Perspective camera fov 35, placed at (width/2, −height/2, height/2 / tan(17.5°)), looking at (width/2, −height/2, 0), so one world unit equals one CSS pixel and the page runs downward along −y.

Layout (in px): columns 3 above 1024px, 2 at 641–1024px, 1 at ≤640px. Page padding 8, column gap 8, row gap 40. Tile width = (viewport − 16 − gaps) / cols; tile height = width × 9/16 (tiles are 16:9). The headline sits 200px from the top and is centred: "A Curated Selection of " (Geist 500 16px, tracking −0.16px) followed by "Motion and Interactive Sites" (Newsreader 400 17px). On phones it breaks into "A Curated Selection of Motion and" / "Interactive Sites" with a 20px line step. The grid starts 80px below the headline. Under each tile, 12px below: the title (Geist 500 12px, ink), then 6px lower "Category, Year" (Newsreader 13px, mute). A footer, Newsreader 13px mute, sits 240px below the last row: "Kai Renn — Index 2019–2026" centred (on phones split as "Kai Renn" left and "Index 2019–2026" right).

Tile shader: each tile samples a still (uTex) and its video (uTex2) and crossfades by uMix. Before its media lands it shows a skeleton of grey 0.085 with a diagonal shimmer band (sweep = fract(time × 0.6), band = smoothstep(0.18, 0, |(u+v)/2 − sweep|) × 0.035). uReveal fades from skeleton to media.

Loading: a tile starts loading when it is within 1.6 viewports below or 0.6 above the visible area. It creates its video (preload auto), seeks to min(1.2s, 30% of the duration), draws that frame into a 480px-wide canvas as the still, and reveals it (uReveal 0→1 over .8s power2.out).

Chip: at the tile's top-left (8px inset) sits a frosted label "01  Motion" (index two digits, two spaces, category; Geist 500 12px, padding 8px sides, 6px top, 4px bottom, radius 4px). Its shader blurs the tile's own media under it with a 32-tap golden-angle spiral (radius 40px), mixes that toward rgb 0.05 by 45%, and draws the label text on top. It follows the same still/video crossfade as the tile.

Glass-lens post pass: the scene renders into a 4×-multisampled render target, then a fullscreen pass refracts the top and bottom 8% of the screen. Inside a band, t runs 0 at the inner edge to 1 at the screen edge, sag(t) = 1 − sqrt(1 − t²), and the sample is pushed toward the inner edge by sag × band × strength (1). Inside the bands a 16-sample spectral dispersion spreads samples along y by (t − 0.5) × 0.01 × distortion × 30 with red/green/blue weights smoothstep(.8,.2,t) / smoothstep(0,.5,t)×smoothstep(1,.5,t) / smoothstep(.2,.8,t). The result is converted to sRGB at the end.

Scroll: wheel adds deltaY to a target; touch drags add the finger delta with inertia (velocity × 0.95 per frame). The rendered offset eases toward the target by 0.12 per frame and clamps between 0 and page height minus viewport height.

Hover (desktop wider than 1024px): the hovered tile's video starts playing and uMix tweens to 1 (.45s power2.out); leaving tweens it back to 0 and pauses. A 64px round "View" bubble (italic Newsreader 16px, dark on rgba(237,237,235,.94)) follows the pointer through gsap.quickTo (.5s power3.out) and scales .6→1 with opacity (.75s power4.out on enter, .6s on leave). On touch or ≤1024px, the tile closest to the viewport's vertical centre plays instead.

Entrance: the headline pieces fade in (.3s) while their letters resolve out of random ". : · , ; _" glyphs over 1.1s (power2.out; each character resolves once progress passes 0.7 × its position + 0.3 × random). Tiles, chips, titles and categories fade in and rise 60px (opacity .9s power2.out, position 1.2s expo.out), delayed .35s + .08s per column + .06s per row.

Click a tile: a lightbox fades in (.45s) over a rgba(8,8,9,.86) backdrop with 14px blur. It holds the video at up to 1100px wide and 70vh tall (16:9, contain, radius 6px) rising from scale .94, y 20 (.9s expo.out). Below it: the title (Geist 500 15px) with "Category, Year" (serif mute), the description (serif 17px), and a Close button. Esc, Close or clicking the backdrop closes it and unloads the video.

## 7. View 3 — About (chrome bot + horizontal magnetic text track)

Renderer: antialias, opaque, clear colour #0c0c0d, scene background #0c0c0d, output sRGB, no tone mapping, pixel ratio min(dpr, 2). Camera fov 45 at z 13. A half-float render target the size of the canvas holds the scene without the bot and the lens disc, for the click effect.

Environment (for the chrome): a PMREM of a small black room (background #0a0a0b) lit by emissive white panels: a 14×5 ceiling panel at y 6 (intensity 1.1), a 3.2×10 strip at x −6 (1.0), a 2.4×10 strip at x 6 (0.85), a 12×2.2 panel behind at z −6, y −1.5 (0.6), a 5×4 panel in front at (3, 2.5, 6) (0.8) and a 14×6 floor at y −6 (0.22). Keeping every panel at or below about 1.1 is what avoids bloom-like blocks.

The bot (own model, built from primitives and centred on its bounding box):
- Head: a sphere of radius 1 scaled (1.1, 1, 0.98) in chrome (MeshPhysical, white, metalness 1, roughness 0.07).
- Visor: a front patch of the same sphere (phi from π/2 − 1.02 over 2.04 rad, theta from π/2 − 0.5 over 1.0 rad), scaled 1.5% larger, in near-black glossy material (#040405, metalness 0.3, roughness 0.12, clearcoat 1, clearcoat roughness 0.04).
- Eyes: two capsules (radius 0.075, length 0.2) at x ±0.3, y 0.03, sitting on the visor surface, flattened to 45% depth, in an unlit #f2f2ee material.
- Antenna: a chrome stem (0.022–0.03 radius, 0.42 tall) at y 1.15 with a 0.095 chrome ball at y 1.38.
- Ears: chrome tori (radius 0.2, tube 0.065) at x ±1.1 with dark visor-material caps (cylinders of radius 0.15).
- Halo: a chrome torus (radius 0.78, tube 0.05) under the head at y −1.28, tilted 0.92 × 90°, spinning at 0.35 rad/s.
- Scale: the bot is always 200px tall on screen (×0.9 at ≤1440px wide, ×0.85 at ≤1024px), placed at the screen centre, z −1.

Shader additions on all bot materials (injected with onBeforeCompile):
- Liquid-glass reveal: a front line rises from the bounding-box bottom minus the band (0.97) to the top plus 0.25 × band, wavy by value noise (amplitude 0.95 × (1 − reveal)). Fragments above it are discarded. Within one band below it the surface is mixed toward a brighter, #8fa0ff-tinted "liquid" look, with a blue (#1621ff) shimmering meniscus line (power-3 falloff, ×1.4).
- Hover glow: a #1621ff glow around the raycast hit point (radius 1.09 world units, spread 0.262, falloff power 3, brightness 0.4), multiplied by a hover factor that eases toward 1 at 0.1 per frame on hit and back toward 0 at 0.05 per frame.

The reveal runs 0→1 over 3.85s power2.out with a 1s delay on the first visit (0.45s on later visits). Clicks are ignored below 0.8.

Behaviour every frame:
- Mouse follow: the target rotation is x = clamp(vertical offset from the centre ÷ half the height, ±0.62), y = clamp(horizontal offset ÷ half the width, ±0.59), z = 0.2 × horizontal offset. The current rotation eases toward it at 1 − (1 − 0.08)^(60 × dt). Before any mouse movement on desktop the target is (−0.62, 0.59, 0.2); on phones it is 0.
- Float: y = sin(phase) × 0.2 × amplitude × reveal, where the phase advances by dt × 1.5 × speed, eased with factor 1 − (1 − 0.08)^(60 × dt).
- Blink every 3–5s: the eyes squash to 10% height over 0.18s and back.
- Sleep: after 30s with no mousemove, wheel, pointerdown, touchstart or keydown (desktop only, fully revealed), the eyes close to 20% height (1.1s power2.inOut), the rotation target tweens to (0.42, 0, 0.12) over 1.4s, and the float slows to speed 0.35 and amplitude 1.6 (1.6s). Any input wakes it: speed and amplitude return over 0.8s, the eyes snap open, and the head shakes.
- Head shake: the y offset goes +0.22 (0.09s), −0.18 (0.12s), +0.10 (0.11s), then 0 (0.18s).

Click on the bot (fully revealed, not mid-effect):
- The rotation freezes. A lens disc (a circle of radius 1 at z −8) scales from 0 to 10 world units over 4s expo.out; once it passes 6.14 it dissolves (0→1 over 0.8975s sine.inOut), then resets.
- The disc samples the background render target in screen space and pulls it toward the centre: zoom pull = 0.5 × 0.30 × nd², where nd is the distance normalised to the disc's screen radius. The rim (from nd 0.85) is pulled inward by 0.2344. Chromatic dispersion of 1.64 × 0.004 applies from nd 0.6, with 8 samples and per-channel Gaussian weights.
- Light on top: a white nova (Gaussian, size 4 × glow 11 × 0.003, intensity 0.285 × 11/17 × 1.15), a #252ba7 ring at radius 0.49, width 0.08 (×0.9 × 11/17 × 1.8) with a wide aura, a thin white rim at 0.483, and an edge ring at 0.478 (width 0.06, softness 1, intensity 1.053, #252ba7).
- Dissolve order: the light fades by 60%, the distortion by 80%, and the alpha from 80% to 100%.
- At the same time the bot plays one of two alternating hit reactions, then the head shake:
  - Recoil: rotation x −0.45 and y +0.18 (0.16s power3.out) with the eyes squashed, then back with elastic.out(1, .45) over 0.9s.
  - Spin: one full turn on y (1.1s power3.inOut) with a z wobble of 0.25 settling with elastic.out(1, .5).

Text layer: all text is drawn into canvases (software-backed 2D contexts, willReadFrequently, drawn at the renderer's pixel ratio, linear filtering, no mipmaps) on planes at z −8. One world unit equals visibleHeight(at z −8) ÷ viewport height px.

Headline: a full-viewport canvas centred on the screen. Newsreader 300 at 75px (62px at ≤640; at ≤1024 it shrinks to fit the widest word and wraps), line height 1.18, tracking −0.01em, ink. Three lines:
- "Shaping quiet systems into"
- "restless, precise and wildly kinetic"
- "Motion™ that people remember."

The "™" is Geist 400 24px (16px at ≤1024), raised by 0.2 × the font size and spaced 8px after "Motion". Fifty-six pixels below the last line, centred, is "Currently at Northfold® Studio" in Geist 500 14px (12px on phones). Hovering just "Northfold® Studio" fades a background-coloured plane over it to 50% opacity (0.55s expo.out).

Horizontal track: the wheel (whichever of deltaX or deltaY is larger) and swipes on either axis move a target. The rendered offset eases toward it at 0.12 per frame, with touch inertia of 0.95 per frame. Scrolling down or right moves the content left. Every element's x is wrapped with ((x + L/2) mod L) − L/2, so the track loops forever and the headline returns after the last stop. L = (end of the last block + 260px, or 140px on phones) + half the viewport width.

The track starts half a viewport plus 200px (70px on phones) to the right of the headline. Stops alternate between above the centre line (block bottom 78px above centre; 64px on phones) and below it (block top 78px below centre). Each stop advances x by max(0.62 × block width, 200px) + 90px (150px + 60px on phones). Blocks are left-aligned.

Every block starts with a grey heading (Geist 500 12px, mute). The ten stops, in order:
1. Paragraph, top. "Motion" over "Product films, UI motion and 3D loops that explain a product in seconds." (Newsreader 300 22px, 29px line step, wrapped at 320px; 16px below the heading).
2. List, bottom. "Interactive" over "WebGL Sites", "Scroll Stories", "Creative Development", "Prototyping" (Newsreader 400 18px, 7px gaps).
3. Chapter, top. "Part One  ·  Craft", then a numeral "I" in Newsreader 300 72px, then "Tools change every season. The habit of finishing things never ships late." in Newsreader 300 19px, 26px line step, max 300px.
4. Quote, bottom. "“Loud is easy. Calm takes work.”" in Newsreader italic 300 40px (30px on phones), 1.12 line step, max 440px, then "— Studio note, 2024" in the grey heading style.
5. Stats, top. "Recognition" over "06  Sites of the Day", "03  Motion awards", "02  Type juries", "14  Years in motion" (Geist 400 18px, 9px gaps).
6. Paragraph, bottom. "Identity" over "Brand systems and type direction that move as well as they sit still."
7. Chapter, top. "Part Two  ·  Rhythm", numeral "II", "Interfaces are music you can touch. Timing decides how a page feels."
8. List, bottom. "Selected clients" over "Halden", "Oaro", "Velmo Labs", "Fieldhouse", "Marlo Bikes".
9. Quote, top. "“Break something on purpose, then keep the best part.”" with "— Studio note, 2025".
10. Links, bottom. "Contact" over:
    - "hello@krst.example →", which opens mailto:hello@krst.example.
    - "See the full index →", which opens #projects.
    - "Booking from January", in mute colour and not a link.
    All three are in Newsreader 300 22px. Linked lines dim to 50% opacity on hover (0.55s) and show a pointer cursor.

Magnetic make-space (the key interaction): the bot owns an oval keep-out zone on the text plane, with radius X 3.4 world units and Y 4.0543 (both ×0.7875 at ≤640) and 0.35 of padding.
- Every frame, for each line of each block, take the horizontal distance from the bot to the nearest point of that line's own text: 0 if the text spans the bot's x.
- If that distance is less than the X radius, the oval's half-height there is h = Ry × sqrt(1 − (d/Rx)²) + padding. A line above the bot must keep its lower edge at least h above centre; a line below must keep its upper edge at least h below centre.
- Lines are processed from the one nearest the bot outward. Each line's need is at least its inner neighbour's current shift, so lines never overlap.
- Each shift eases toward its need with a factor of max(0.1, 0.14 − 0.012 × k), where k is the line's order from the inside, so the nearest line leads and the outer lines follow a touch later. All of them ease back to their resting place once the bot has passed.

A "SCROLL →" hint (Geist 11px, tracking .22em, mute, bottom 78px) fades in from x −8 (0.9s expo.out, 1.6s delay). Its arrow nudges 5px right in a 1.6s loop. It fades out at the first scroll.

## 8. Mobile and reduced motion

Phones: the sphere radius fits the width, plane 72px, circle ×0.75, and the side labels are hidden. Projects shows one column with the tile nearest the centre playing. On About, the headline wraps and shrinks to fit, blocks narrow to min(viewport − 56px, 300px), the band and quote shrink as noted above, and the keep-out oval is ×0.7875. The dock stays centred at the bottom.

prefers-reduced-motion: CSS transitions are off, the Gallery intro is skipped, there is no auto-spin and no Projects scramble, the About reveal is instant and the float is off.

## 9. Acceptance checklist

- The Gallery loads with the counter, circle spin, collapse and explode, then a sphere of 20 looping 16:9 videos that drag-spins with inertia, auto-spins until touched and shows a hover caption. Clicking a plane zooms it; clicking it again opens the overview; Close or Esc collapses it.
- The dock shows "KR.ST | Gallery¹ 2 3 | •" with the expanding italic label on the active tab, and its menu opens upward.
- Projects shows a 3-column 16:9 WebGL grid with refracted, colour-fringed top and bottom bands, frosted index chips, video crossfade on hover, a "View" bubble, smooth wheel scroll and a lightbox on click.
- About shows the centred serif headline with the chrome bot pouring in as liquid glass and following the mouse. The text track scrolls sideways forever, and every line slides up or down out of the bot's oval and settles back after it passes. Clicking the bot fires the blue lens burst over the text, and the bot naps after 30 idle seconds.
- There are no console errors, all three fonts load, and no request fails except a missing favicon.