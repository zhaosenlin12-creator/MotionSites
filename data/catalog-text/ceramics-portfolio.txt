# Nora Valle — Ceramics: infinite 3D cover-flow drum (recreation prompt)

Recreate this page exactly as described: a one-screen ceramics portfolio on a warm stone background, with a small letter-spaced name and three text links in the top-left corner, and a single vertical column of square ceramic photographs that sit on an endless 3D drum (a horizontal cylinder) in the right third of the screen. The wheel, trackpad, touch drag and arrow keys turn the drum with a soft, critically damped spring. Nothing snaps, and the drum loops forever in both directions. There is no other UI: no nav bar, no buttons, no footer, no icons, no dividers.

## 1. Assets

| Asset | URL | How it is used |
|---|---|---|
| Cover sheet (12 photos in a 4 × 3 grid) | Source: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261119_114114_a64c89f4-eb85-4b22-a317-d87931718097.png (3312 × 2480 PNG). Load it through the resizer: https://images.higgs.ai/?default=1&output=webp&url=<the source URL, URL-encoded>&w=<width>&q=85 | One texture for every cover. The resizer sends Access-Control-Allow-Origin: *, so load the image with crossOrigin "anonymous" for WebGL. |
| Montserrat 500, latin | https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Hw5aXo.woff2 | The name only. |
| Inter variable 100–900, latin | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 | Links and cover captions (weight 400). |

The sheet width requested from the resizer is chosen once at load: 282 × k × DPR × 4 × 1.25, rounded up to a multiple of 200, then clamped between 1600 and 3312 (k is the layout scale from section 4, and DPR is devicePixelRatio capped at 2). On a 1440 × 900 screen at DPR 1 this is 1600; at DPR 2 it is 3000.

Sheet grid (pixel seams measured on the 3312 × 2480 source): column edges at 0, 830, 1651, 2480 and 3312; row edges at 0, 823, 1645 and 2480. Tiles are numbered 1–12, left to right and then top to bottom. Each tile is cropped 10 source pixels inside its seams on all four sides, so no neighbouring photo bleeds in. Convert these crops to texture coordinates by dividing by 3312 and 2480.

| Tile | Subject |
|---|---|
| 1 | Tall speckled oat bottle vase, a small glossy bowl in front left, a matte charcoal cup right, on crumpled linen |
| 2 | One wide speckled cream bowl on a weathered wooden board |
| 3 | Stacked tumbler cups, charcoal and oat at the back, oat and clay-brown in front |
| 4 | Close crop of a glossy drip-glazed bowl rim, cream with rust edges |
| 5 | Wide shallow dark bowl with a blue-grey interior on linen |
| 6 | Tall matte charcoal cylinder vase with one dried flower stem |
| 7 | Three stacked glazed plates with a single pear on top, on wood |
| 8 | Round speckled moon jar on linen |
| 9 | Speckled teapot with two small cups on wood |
| 10 | Three bud vases (clay brown, oat, charcoal) on linen |
| 11 | Speckled cream pitcher jug on linen |
| 12 | Dark lidded jar with a wooden spoon on wood |

All tiles share one warm grey-taupe plaster backdrop and the same soft window light.

## 2. Head and colour tokens

- The language is "en", with a viewport meta of width=device-width, initial-scale=1, viewport-fit=cover. The title is "Nora Valle — Ceramics".
- The page background, set on html and body, is #F5F0E8 (warm stone). Both are 100% tall with overflow hidden: the page never scrolls, and the drum takes all wheel input.
- The name is #2E2925, the links are #665650 (hover #2E2925 with a 0.3 s ease colour transition), and the captions are #6E655E.
- The placeholder shown on each cover until the sheet loads is a flat #B9AEA2 (rgb 0.725, 0.682, 0.635).
- The body font is Inter, falling back to system-ui and sans-serif, with -webkit-font-smoothing antialiased, touch-action none and user-select none.
- Add the class "js" to html in a head script before the body, so the entrance can hide the text without a flash.

## 3. Desktop layout (designed on a 1440 × 900 frame)

### Identity block (fixed, z-index 5)
- Position: left 45 px, top 14 px.
- Name "NORA VALLE" (exactly these 10 characters, uppercase in the markup):
  - Montserrat 500, 15.5 px, letter-spacing 0.42 em, line-height 1, colour #2E2925, 1 px top padding.
  - On 1440 × 900 its box measures 214 × 17 px at (45, 14).
- Links "Instagram", "Twitter", "Email":
  - A flex row 17 px below the name, with a 28 px gap.
  - Inter 400, 15.2 px, line-height 1, letter-spacing −0.005 em, colour #665650, no underline.
  - Boxes at x = 45, 144 and 221, top 48, widths 71, 49 and 38 px, 15 px tall.
  - They are plain anchors (href "#") and the only clickable things on the page.

### Stage
A fixed full-viewport container (z-index 1, overflow hidden) that holds one canvas filling it, drawn at the device pixel ratio (capped at 2).

### The drum: geometry in design pixels (multiply every length by k)
- 12 square covers, each 282 × 282 px, on a cylinder of radius R = 698 px whose axis runs horizontally across the screen.
- The angular step between covers is 30°.
- The axis centre (the vanishing point) is at x = 70.76% of the stage width and y = 50% of the stage height. On 1440 × 900 that is (1019, 450).
- Perspective: the viewer sits 1510 px in front of the front-most point of the drum.
- The whole drum is pushed back by R, so the cover facing the viewer straight on is drawn at exactly 1:1 (282 px, crisp). Covers further round foreshorten and shrink.
- Cover i (i = 0 to 11) has angle θi = drumAngle − 30° × i, so increasing i goes down the column. With y pointing down and z pointing toward the viewer, a cover-plane point with local coordinates (x, y) from −141 to +141 lands at:
  - Y = y·cos θ − R·sin θ
  - Z = y·sin θ + R·cos θ − R
  - screen x = cx + x / w and screen y = cy + Y / w, where w = (1510 − Z) / 1510.

  A larger θ moves a cover up the screen. This is exactly CSS perspective 1510px on a zero-size box at (cx, cy), containing translateZ(−698px) rotateX(drumAngle), with each cover at rotateX(−30° × i) translateZ(698px).
- Drum order, top to bottom (cover i shows this tile): 2, 1, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12.
- Back of the drum: covers whose plane faces away (cos θ × (1510 + 698) ≤ 698) are still drawn. They show as narrower, upright slivers in the gaps between the front covers, at about 52% of the front width. To keep them upright, flip their image vertically.
- Depth sorting must be correct (front covers hide back covers). There is no shading, no shadow, no border and no rounded corners. Covers are plain photographic squares on the flat background.
- Rest pose at load: drumAngle = 34.35° (30° plus 4.35°). Tile 1, the vase trio, sits just above centre, at 877–1161 × 258–538 on 1440 × 900. Tile 2 (the bowl) is above it, tilted back into a trapezoid 274 × 180. The drip-rim close-up (tile 4) is below, 281 × 221. The back slivers peek out between them.

### Captions
- Each cover carries the caption "Project — 2026" (em dash with spaces) in its own plane, so it tilts and foreshortens with the cover.
- Inter 400, 9.3 px × k, letter-spacing 0.01 em, colour #6E655E.
- The text box's left edge is 11 px × k left of the cover's left edge. Its top is 9 px × k below the cover's bottom edge, with line-height 1 (baseline about 0.865 em below the box top).
- Captions are drawn on front-facing covers only, never on the back slivers. They don't hide anything behind them: no depth write, alpha-blended.

## 4. Scaling, tablet and mobile

- Layout scale: k = min(availableHeight / 900, columnWidth / 282).
  - On desktop, availableHeight = viewport height and columnWidth = 30% of viewport width.
  - Every drum length (282, 698, 1510, the caption size and offsets) is multiplied by k. On 1440 × 900, k = 1; on 1920 × 1080, k = 1.2.
- The identity block is not scaled on desktop.
- Phone and tablet portrait (viewport narrower than 820 px and taller than wide):
  - The identity block moves to left 20 px, top 22 px. The name becomes 14 px with 0.38 em tracking. The links become 14 px with a 22 px gap, 16 px below the name.
  - The stage starts 92 px from the top, so covers turn under a clean header and never pass behind the text.
  - The drum axis sits at 50% of the stage width (centred) and 50% of the stage height.
  - k = min((viewport height − 92) / 900, 64% of viewport width / 282). On 390 × 844 this is about 0.84, giving a front cover about 237 px wide. On 768 × 1024 it is about 1.0.
- Landscape phones and tablets use the desktop layout. On 844 × 390 the drum sits in the right third with a front cover about 122 px wide.
- Nothing ever scrolls sideways.
- Resizing recomputes k, the canvas size and the axis position.

## 5. Interaction and motion

One state value, drumAngle (in degrees, unbounded, so it loops forever because the 12 covers repeat every 360°), follows a target angle through a critically damped spring.

- Spring:
  - ω = 8.5 rad/s, acceleration = ω² × (target − angle) − 2ω × velocity.
  - Integrate semi-implicitly every animation frame in sub-steps of at most 4 ms, with the frame time clamped to 64 ms.
  - The angle snaps to the target once the distance is under 0.0005° and the speed under 0.01°/s.
  - Result: speed builds up smoothly instead of jumping, quick wheel notches blend into one continuous glide, and every move eases to rest in about 0.6 s with no overshoot. There is no snapping to covers; the drum can rest between two covers, as in the original reel.
- Wheel:
  - target += deltaY × (30° / (329 px × k)). One cover of rotation equals 329 px of wheel travel at k = 1, the screen spacing between neighbouring covers.
  - Line-mode deltas are multiplied by 16 and page-mode deltas by the viewport height.
  - The listener is non-passive and calls preventDefault. Wheel down turns covers upward.
- Drag (mouse, pen or touch, via pointer events on the window; ignore presses that start on a link):
  - On press, set the target to the current angle and zero the velocity.
  - While dragging, the angle follows the pointer 1:1 (−dy × the same degrees-per-pixel), with the spring bypassed.
  - Track a smoothed velocity: 70% of the newest sample plus 30% of the previous.
  - On release, if the last move was under 90 ms ago, keep that velocity and set target = angle + velocity × 2 / ω, so the drum coasts and settles with no bounce. Otherwise it stops where it was let go.
- Keys: ArrowDown, PageDown and Space add 30° to the target; ArrowUp and PageUp subtract 30°. Each glides through the same spring.
- Load:
  - The drum starts 60° before its rest angle and glides into place through the same spring.
  - On the first animation frame, add the class "ready" to html; a 1.5 s timeout also adds it as a failsafe.
  - Before "ready", the name and each link are at opacity 0 and translateY(10 px). With "ready", they fade and rise to rest over 1 s with cubic-bezier(.22,.61,.36,1). The links are staggered by 0.08, 0.16 and 0.24 s.
- Reduced motion (prefers-reduced-motion: reduce):
  - No load spin, so the drum starts at rest.
  - Wheel, drag and keys move the drum instantly (the angle equals the target, with no spring).
  - Text shows immediately with no transition.
- Rendering:
  - Draw with WebGL2: one program and one unit quad, 12 cover draws plus up to 12 caption draws per frame.
  - Turn depth testing on. Use antialias for the edges, mipmapped trilinear filtering, and anisotropic filtering up to 8× when available.
  - Use premultiplied-alpha caption text, rendered once at 4× into a canvas after Inter has loaded.
  - Redraw only when the angle or the size changes.
  - If WebGL2 is unavailable, build the same drum from CSS 3D transforms. That means 24 face elements with background-position crops of the same sheet and backface-visibility hidden, the back faces turned 180° on X, and captions as spans inside the front faces. Adding "?css" to the URL forces this fallback for testing.

## 6. Acceptance checklist

- On 1440 × 900 at rest: name box 214 × 17 at (45, 14); Instagram at (45, 48); centre cover 284 × 280 at (877, 258) showing the vase trio; captions at the lower left of each front cover; back slivers visible in the gaps.
- Scrolling down repeatedly cycles all 12 covers and comes back to the start: an infinite loop in both directions.
- One wheel notch (deltaY 100) turns about 9°, building up smoothly and settling in about 0.6 s. Five notches 90 ms apart make one continuous glide with no stops.
- A drag-and-flick coasts and settles with no overshoot; a slow drag stops where it was released.
- Front covers are pixel-sharp at rest, with no blur from 3D scaling.
- The phone layout has a clean header, covers turning beneath it, and no sideways scroll at 360, 390, 768 or 1024 px wide.
- With reduced motion on, nothing animates on its own.