# NOWHERE® Lookbook — full recreation brief

Build a single-file, full-viewport fashion lookbook called **NOWHERE®**. Nine full-body models, each shot from a high overhead camera on a light grey studio floor, stand in a 3D carousel ring that can be dragged, scrolled sideways, played automatically or switched to a 3×3 grid. Clicking the front model zooms it into a "look view" with numbered dots on each garment, and a paper receipt prints down from the top-right listing the three pieces with sizes, a 10% whole-fit discount and an add-to-bag flow. Everything is plain HTML, CSS and vanilla JavaScript in one file, with no libraries. The page is exactly one screen tall (100svh, never scrolls). Everything below must be reproduced exactly.

## 1. Assets

All images are transparent PNG cut-outs served as WebP through an image proxy. Use these exact URLs. Each look image has a native 914×1616 frame (aspect about 0.566). The figure fills the frame top to bottom and stands with the soles a little above the bottom edge, so each look has a "foot" value (the empty fraction under the shoes) used to push the image down so the shoes sit on the box's bottom edge.

| # | Look | Full image (914 w) | Small image (571 w) |
|---|---|---|---|
| 1 | Somewhere Else | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190717_6580d844-f3b0-4240-8b4a-239355685fc9.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190717_6580d844-f3b0-4240-8b4a-239355685fc9.png&w=571&q=85 |
| 2 | Dial-Up | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190715_b129d73c-3854-445e-b7c4-0335a044dc2c.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190715_b129d73c-3854-445e-b7c4-0335a044dc2c.png&w=571&q=85 |
| 3 | Long Walks | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190715_04902164-40f3-4b66-928c-8fc7f606b83c.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190715_04902164-40f3-4b66-928c-8fc7f606b83c.png&w=571&q=85 |
| 4 | Low Battery | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190716_fe797c9a-091f-4ab1-adb4-c81f8f47495c.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190716_fe797c9a-091f-4ab1-adb4-c81f8f47495c.png&w=571&q=85 |
| 5 | No Reply | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190718_6392c417-6a7c-40e9-b501-c5bc6b752c2c.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190718_6392c417-6a7c-40e9-b501-c5bc6b752c2c.png&w=571&q=85 |
| 6 | Analog | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190717_e049b67c-231b-49f8-99b9-23fbd678f46e.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190717_e049b67c-231b-49f8-99b9-23fbd678f46e.png&w=571&q=85 |
| 7 | Rewind | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190754_449c9910-c1c1-4e4a-a5d1-d9fa6feacfef.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190754_449c9910-c1c1-4e4a-a5d1-d9fa6feacfef.png&w=571&q=85 |
| 8 | Out Of Office | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190716_635cd62a-6803-4784-9567-c6a93d056066.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190716_635cd62a-6803-4784-9567-c6a93d056066.png&w=571&q=85 |
| 9 | Paper Maps | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190718_b1b78d62-6b2f-4762-ab0d-f751efdae1c7.png&w=914&q=85 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190718_b1b78d62-6b2f-4762-ab0d-f751efdae1c7.png&w=571&q=85 |

| Sheet | Rows | URL (600 w) |
|---|---|---|
| 1 | looks 1–3 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190756_3f427fdd-ba34-433e-bc55-eb9b03d2e1c6.png&w=600&q=85 |
| 2 | looks 4–6 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190758_785127d3-ef7d-4831-976b-14540a7188aa.png&w=600&q=85 |
| 3 | looks 7–9 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_190800_4db1daba-ebb1-436f-857a-91dfab40f4b7.png&w=600&q=85 |

Each sheet is a 3×3 grid of nine product packshots on a flat #ececec background. Row r (0–2) of a sheet belongs to the r-th look in that sheet's group, and column c (0–2) is that look's piece c. A thumbnail shows one cell using the sheet as a CSS background with background-size 300% 300% and background-position (c × 50%) (r × 50%). Never slice the sheets into separate files.

## 2. Fonts

One family, **Inter Tight** (Google Fonts), self-hosted as two latin WOFF2 files: the upright variable file covering weights 300–400, and the italic file at weight 300. font-display swap. Preload the upright file. The fallback stack is "Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif. Only weights 300 (large display text) and 400 (everything else) are used. Italics: the look name in the look view, prices, drawer meta, and the active or hovered drawer name.

Typography roles:

| Role | Size / line-height | Weight | Tracking | Case |
|---|---|---|---|---|
| Body base | 16 / 24 | 400 | normal | — |
| "cap" small label | 12 / 16 | 400 | 0.02em, word-spacing 0.12em | UPPERCASE, tabular numbers |
| Logo in status bar | 24 / 24 | 300 | −0.05em | UPPERCASE |
| Active look name (bottom left) | 32 / 32 (24/24 at ≤1199 px, 16/16 with −0.02em at ≤809 px) | 300 | −0.05em | UPPERCASE |
| Drawer names, look-view caption, receipt logo, receipt total | 40 / 40 (32/32 on phones) | 300 | −0.05em | UPPERCASE |
| The ® mark | 12 px, top-aligned, 2 px left margin, tracking 0, upright | — | — | — |

The same 0.02em letter-spacing and 0.12em word-spacing also apply to pills, tooltip names, the CTA, the toast, size chips, the confirm button, the cursor labels, receipt names, dock piece names, the Ring/Grid buttons and the receipt Add buttons.

## 3. Head and tokens

Title: "NOWHERE — Stay out of the loop, pal". Meta description: "Vol. 01. Nine looks for going quiet. Spin the ring, pick a fit, tap a dot to shop the item." theme-color #ececec. Viewport width=device-width, initial-scale 1.

Colour and motion tokens:

| Token | Value |
|---|---|
| studio (page background) | #ececec |
| paper | #ffffff |
| ink | #000000 |
| muted | #6f6f6f |
| ease | cubic-bezier(.16, 1, .3, 1) |
| spring | cubic-bezier(.34, 1.56, .64, 1) |
| morph (ring↔grid) | cubic-bezier(.7, 0, .15, 1) |
| bar height | 48 px (64 px on phones) |
| receipt width | 336 px, 24 px from the right edge; reserved room = 336 + 24 + 24 = 384 px |

Global: box-sizing border-box, body has no margin, horizontal overflow hidden, antialiased text. Buttons reset (no border, background or padding, inherit font and colour, pointer cursor). Focus ring: 1 px solid ink outline with a 3 px offset and a 999 px radius on buttons and links.

**Pill** style (used by Bag, Looks, Close and the drawer nav): inline-flex, centred, min-height 36 px, 0 16 px padding, 1 px **dashed** ink border, 999 px radius, white fill, 12/16 uppercase text. On hover, or when aria-current is set, it turns into a black fill, white text and a solid border (0.3 s background/colour transition).

## 4. Layout, top to bottom

The page is a single section ("deck"), 100svh tall, min-height 640 px (560 px on phones), overflow clip, background #ececec. A visually hidden h1 reads "Stay out of the loop, pal." (with "pal." in italics), followed by a hidden paragraph: "Vol. 01. Nine looks for going quiet." and "Spin the ring, choose a fit, tap a dot to shop the item."

### 4.1 Status bar (absolute, top, 48 px tall, z 60, padding 0 24 px, gap 16 px)
- Left: a live clock in 12-px caps, formatted with Intl hour:minute in 2-digit form, refreshed on each minute boundary.
- Next: signal bars, four 3 px wide bars, 2 px gap, heights 4/6/9/12 px, coloured rgba(0,0,0,.2), then the text "LOW SIGNAL". This group takes margin-right:auto.
- Centre (absolute, left 50%, translateX(−50%)): logo "NOWHERE" plus a small ®.
- Right: a battery icon (24×12 px, 1 px ink border, 3 px radius, 1 px padding, 2×4 px nub on the right edge, inner fill 12% wide) followed by "12%".
- Far right: a pill button "BAG (0)", min-width 96 px, min-height 32 px. The number is a tally that bumps up 4 px with the spring easing (0.5 s) whenever it changes.
- Phones (≤809 px): padding 0 16 px, gap 8 px; the battery, the "LOW SIGNAL" text and the code mark are hidden; Bag shrinks to 0 12 px padding.

### 4.2 Side controls
- **Code mark**: top-left, at left 24 px and top bar-height + 8 px, 48×48 px. It's a decorative 25×25 module pattern drawn as one SVG path (crisp edges): three 7×7 finder squares (outer ring plus 3×3 core) in the top-left, top-right and bottom-left corners, and every other cell outside the finder zones filled at random (seeded generator: seed = seed × 16807 mod 2147483647, fill when the value is above 0.52, seed 7). Hover scales it to 1.06. Hidden on phones.
- **Looks**: a vertical pill on the left edge (left 24 px, or 12 px on phones; vertically centred), width 36 px, 20 px 0 padding, writing-mode vertical-rl, rotated 180°. Text "LOOKS". It toggles the drawer.
- **Ring / Grid switch**: right edge (right 24 px, or 12 px on phones; vertically centred), a dashed-border white capsule holding two vertical buttons (36 px wide, or 32 px on phones; 16 px 0 padding, or 12 px; rotated 180°), "RING" on top and "GRID" below. The pressed one is black with white text.

### 4.3 Stage (absolute, inset 0, focusable, cursor grab, touch-action pan-y, no text selection)
It contains the crowd layer, the grid caption layer, a light sweep, the follow cursor and a polite live region.

**Model element**: absolute, left 0, bottom 0, transform-origin 50% 100%, starting at opacity 0. Inside it, a figure box `height: var(--model-h)` with aspect-ratio 4/7, which holds:
- a soft floor shadow: a span positioned left/right −12%, bottom −3%, height 16%, built from three radial gradients and blurred 3 px. They are an ellipse 22%×20% at 50% 82% from rgba(0,0,0,.42) to transparent at 72%; an ellipse 42%×32% at 50% 80% from .16 to transparent at 74%; and a faint plume 40%×55% at 34% 46% from .07 to transparent at 72%.
- the image: absolute, filling the box, object-fit contain, object-position 50% 100%, translateY(foot × 100%). It uses srcset with the 571 w and 914 w versions and sizes "(max-width: 809px) 240px, 360px". The first look gets fetchpriority high.
- a hit button: absolute, inset 6% 18% 0, radius 24 px, labelled "Look 0N: Name". Only the active look's button is tabbable.

### 4.4 Dock (absolute bottom, padding 0 32 px 32 px, or 0 16 px 24 px on phones; z 5)
- **Bottom left**: the counter "01 / 09" in caps, plus a 24 px round dashed-border autoplay toggle showing a pause icon (two bars) or a play triangle. Below them, the active look name in 32 px caps. When the name changes it plays a "swap" animation: from opacity 0, blur 4 px and +16 px down, 0.8 s ease.
- **Bottom centre** (absolute, left 50%, bottom 32 px, or 96 px on phones; gap 8 px): three piece pills for the active look. Each is a dashed white pill with 4 px 16 px 4 px 4 px padding, holding a 48 px circle thumbnail (40 px on phones; the sheet cell scaled 1.18 inside) and a two-line text block: the name in 12-px caps (max 136 px, ellipsis) and the price in 12 px italic. On hover it turns black with white text and the thumbnail zooms to 1.32 over 1 s. When the look changes, the three items rise in (from opacity 0, 8 px blur and +24 px), 0.9 s ease, staggered 70 ms each. At ≤1199 px the text is hidden and the padding becomes 4 px. Clicking a pill opens the look view and highlights that piece.
- **Bottom right**: "SHOP THIS FIT" in caps, then a 64 px black circle (56 px on phones; caption hidden on phones) holding a white 24 px plus. On hover the circle scales to 1.08 with the spring easing and the plus rotates 90°. Clicking opens the look view.

## 5. The ring (core math)

Measure on every stage resize (ResizeObserver):
- W, H = stage width and height. "mobile" means innerWidth < 810.
- bottomPad = 168 on mobile, 120 otherwise. topPad = 136.
- modelH = max(200, round((H − bottomPad − 18 − topPad) / 1.12)). Set it as `--model-h` on the stage.
- frontScale = 1.12 on mobile, 1.165 otherwise.
- dragPx (pixels per look) = max(90 on mobile or 120, W × 0.3).
- body width = modelH × 4/7.

Ring constants: radius factor 0.44 (0.84 on mobile), perspective factor 0.8 (1.1 on mobile), horizon 0.06, front step 0.03, lift 40 px, angular step = 2π/9.

For every look i, given the continuous ring position `pos`:
- a = (i − pos) × step, wrapped into (−π, π].
- R = W × radius factor, P = W × perspective factor.
- k = P / (P + R × (1 − cos a)) (the perspective factor).
- dist = |a| / step, near = clamp(1 − dist, 0, 1).
- scale = k × (1 + (frontScale − 1) × near).
- x = W/2 + R × sin(a) × k.
- yNear = H − bottomPad − 40, yFar = topPad + (H − topPad) × 0.06 − 40.
- y = yFar + (yNear − yFar) × k + (desktop only: H × 0.03 × near).
- blur = 1.8 × dist when dist ≤ 1, otherwise min(1.8 + (dist − 1) × 2, 6.5) px.
- transform = translate3d(x, y − H, 0) translateX(−50%) scale(scale). Opacity is 1, except 0 when the scaled body is fully outside the stage (more than 4 px past either edge), which also sets visibility hidden. pointer-events are off below opacity 0.5. z-index = round(scale × 1000). Only write opacity and filter when they change.

**Spring**: pos follows goal with a critically damped spring: stiffness 95, damping 2√95, integrated in 3 sub-steps per frame with dt clamped to 0.034 s. It settles when both |pos − goal| and |velocity| are ≤ 0.0005. Run requestAnimationFrame only while it moves, while dragging, or when a relayout is pending. Add an "is-moving" class meanwhile, which sets will-change on the models. Pause when the stage leaves the viewport (IntersectionObserver).

**Intro**: pos starts at −1.15 with the goal at 0, so on load the ring visibly spins about one look into place (instant under reduced motion).

**Active look**: active = round(goal) mod 9. Changing it updates the counter, name, live region, drawer highlight, grid captions, receipt and dock pieces; replays the name swap, the piece rise and a **light sweep**; closes the look view if open; and restarts the autoplay timer. The sweep is a 42%-wide skewed (−12°) white gradient band (transparent → .28 at 42% → .6 at 50% → .28 at 58% → transparent, 100°) in a soft-light blended overlay. It runs 1.5 s with cubic-bezier(.65,0,.35,1) from translateX(−130%) to 330%, fading in by 18% and out by the end.

**Autoplay**: on by default, off under reduced motion. Every 5 s it advances one look, unless the tab is hidden, the stage is off-screen, the user is dragging or hovering the receipt with a mouse, or the look view, grid or drawer is open (then it just reschedules). The toggle button flips it. Any drag, wheel, arrow key, ring click, grid switch, drawer opening, look view opening or receipt interaction turns autoplay off.

**Dragging** (pointer events on the stage; ignored in grid or look view, and for non-primary mouse buttons):
- On pointerdown, record the start x/y, the start goal, the pointer id and a velocity trail.
- On move: if the vertical movement exceeds 10 px and beats the horizontal, give up (let the page scroll). If the horizontal movement exceeds 8 px and is more than 1.2× the vertical, start dragging: capture the pointer, add "is-dragging" (cursor grabbing) and stop autoplay.
- While dragging: goal = startGoal − dx / dragPx, active = round(goal), and keep the last 6 samples.
- On release: velocity v = (last x − first x) / (last t − first t) in px/ms; base = round(startGoal). On mobile, move ±1 if |dx| > 30 or |v| > 0.3, otherwise snap back. On desktop, target = round(goal − v × 160 / dragPx); if that equals base and |v| > 0.3, push one look in the flick direction; clamp to base ± 2.
- Ignore the click that fires within 60 ms after a drag ends.

**Clicking a model**: in the ring, if it is the front model (shortest signed distance 0) open the look view, otherwise rotate to it the short way. In the grid, jump the ring to it instantly and open the look view.

**Wheel**: only horizontal-dominant wheels (deltaX bigger than deltaY), not in grid or look view. Prevent the default, accumulate deltaX, and step one look when the total passes 45, then lock for 520 ms.

**Keys** (stage focused): ←/→ step; in the grid ↑/↓ jump ±3; Enter opens the look view. Escape anywhere closes the look view, or else the drawer.

## 6. Follow cursor (only for fine-pointer, hover-capable devices)

An 80 px circle centred on the pointer: 1 px dashed ink border, white at 60% with a 6 px backdrop blur. It holds the stacked labels "DRAG" and "VIEW" (12-px caps). The real cursor is hidden over the stage. It eases toward the pointer each frame with factor 0.18. States:
- on (enters the stage): scale 0.3 → 1, opacity 0 → 1, 0.6 s ease.
- over the front model, or any model in the grid: black fill, solid border, white "VIEW".
- over a non-front model: a small black dot (scale 0.2), labels hidden.
- dragging: black, scale 0.74.
- in the look view: hidden (0 opacity), and the pins and close button get a pointer cursor.
- pointer leaves the stage: off.

## 7. Grid view

Switching animates every model with transitions of transform 1.25 s morph, plus opacity and filter 0.8 s ease. Each model is delayed by round(|wrapped angle| / π × 4) × 0.32 s going to the grid (0.24 s going back), so models ripple outward from the front. The animation class is removed after 1.7 s. Grid placement: rows = 3, top = 80 (72 on mobile), rowH = (H − 96 (104 on mobile) − top) / 3, colW = W/3, scale = min(rowH − 40, colW × 7/4 × 0.92) / modelH, x = colW × (col + 0.5), y = top + rowH × (row + 1) − 32. No blur, full opacity, z = 10 + row. Each model gets a caption below it ("0N  NAME", muted, the active one in ink) at y + 12, fading in with opacity 0.8 s ease delayed 0.9 s + i × 50 ms. In grid mode the dock name, pieces and shop button fade out, and hovering one model dims every other figure to 0.35.

## 8. Look view ("focus")

An overlay (z 40) fades the studio colour in over 0.45 s and fades the crowd, dock, code mark, Looks button and view switch out over 0.35 s.
- The model stage area runs from top bar-height + 16 px to bottom 96 px, from left 48 px to right 384 + 24 px, with the content bottom-centred. Clicking empty space closes the view (zoom-out cursor). On phones it runs from bar-height + 48 px to bottom 46svh + 16 px, with 16 px sides.
- A fresh copy of the active model is built at height h = max(160, min(area height, area width / (4/7))), with the same foot offset. Its pins (dots) layer sits inside the figure, translated by the same foot.
- **FLIP zoom**: measure the ring's front figure and the new figure, set the start transform to translate(Δleft, Δbottom) scale(ringHeight / newHeight) with transform-origin 0 100% and no transition, force a reflow, then clear it so it grows into place over 0.95 s ease. Closing animates back onto whichever ring model is in front, then removes the copy after 950 ms.
- **Top row**: the caption "0N." plus the italic name (40 px, gap 12 px) on the left, and a 48 px round dashed close button with an X on the right, which rotates 90° on hover. It slides down 10 px and fades in (0.8 s opacity, 1 s transform, both delayed 0.35 s). Right padding = 384 + 8 px.
- **Hint** centred at the bottom (left 0 to right 384 px, bottom 16 px): "TAP A DOT TO SHOP THIS ITEM", fading in after 1.1 s. Hidden on phones.
- **Pins**: 48 px hit areas centred on the given (x%, y%) of the figure, each holding a 32 px black circle with "01", "02" or "03". They pop in from scale 0 with the spring easing, 0.9 s, delayed 0.6 s + index × 0.11 s. Hovering or activating one turns it white with an ink ring and scales it to 1.15. A tooltip pill (dashed, white, 8 × 16 px padding) shows "NAME" in caps and the italic price. It sits to the right of the dot (left: 100% − 4 px), sliding in from −8 px at scale 0.96 over 0.6 s ease. If it doesn't fit on the right it flips to the left side, and if it fits neither side it drops below, centred, with a horizontal correction that keeps it 8 px inside the area. Hovering a pin highlights the matching receipt line, and clicking it scrolls that line into view.

Pin positions (x%, y% of the 4:7 figure) and foot offsets:

| # | Name | foot | Pin 1 | Pin 2 | Pin 3 |
|---|---|---|---|---|---|
| 1 | Somewhere Else | .0501 | 52, 44 | 80, 40 | 44, 57 |
| 2 | Dial-Up | .0501 | 76, 45 | 54, 68 | 45, 87 |
| 3 | Long Walks | .0656 | 66, 47 | 51, 64 | 48, 87 |
| 4 | Low Battery | .0582 | 76, 47 | 43, 70 | 54, 88 |
| 5 | No Reply | .065 | 72, 41 | 51, 68 | 45, 89 |
| 6 | Analog | .047 | 75, 45 | 51, 70 | 46, 88 |
| 7 | Rewind | .0377 | 69, 43 | 51, 72 | 56, 92 |
| 8 | Out Of Office | .0891 | 65, 47 | 43, 68 | 60, 86 |
| 9 | Paper Maps | .0588 | 66, 41 | 48, 72 | 56, 88 |

## 9. Receipt (the drawer that prints in)

An aside at top 0, right 24 px, 336 px wide, white, max-height calc(100% − 32 px), as a flex column. Its bottom edge is a torn zigzag made with a mask: conic-gradient(from −45deg at bottom, transparent, black 1deg 89deg, transparent 90deg), sized 16 px wide and 100% tall. Hidden by default. When the look view opens it becomes visible and **prints down** from translateY(−100%) to 0 in 18 hard steps (steps(18, end)) over 1.3 s, delayed 0.3 s. On phones it sits along the bottom (inset auto 16 px 0, max-height 46svh) and prints **up** from +100%.

Contents, top to bottom:
1. **Header** (centred, 32 px 0 16 px padding, 24 px side margin, dashed bottom rule): the logo "NOWHERE®" at 40 px, "VOL. 01 · TILL 0004 · LISBON" in caps, and "LOOK 0N — NAME" in caps.
2. **Lines** (scrollable, 0 24 px padding), one per piece. A 3-column grid (24 px, 1fr, auto) with areas "n name price" / "n kind add": the number "0N" via a pseudo-element; the name in 12-px caps; the price on the right; the kind (Top, Outerwear, Bottom, Shoes, Accessory) in muted caps; and an "ADD" chip (24 px tall, dashed, radius 999). Each line has a dashed bottom rule, plus a solid 1 px ink rule that wipes in from the left (scaleX 0 → 1, 0.9 s ease) while the line is "hot".
   - Clicking ADD on a sized piece toggles a size picker that drops in (from −8 px, 0.7 s): size chips (min 40 × 28 px, dashed, the selected one solid black, pressing scales to 0.94) and a full-width black "ADD TO BAG" button (min-height 32 px). Meanwhile the chip reads "CLOSE". One-size pieces add immediately.
   - Clothing sizes are S, M, L, XL; shoe sizes 40–45; the belt is One size. The default selection is the second size (M or 41).
   - Once added, the chip turns solid black and reads "IN BAG", the bag tally increases with its bump, and a toast says "ITEM ADDED TO YOUR BAG." (or "FIT ADDED TO YOUR BAG." when several are added at once).
3. **Bundle** (16 px 24 px padding, gap 12 px): a message line (hidden when empty), then a summary list with SUBTOTAL, "WHOLE FIT −10%" (shown as −$x) and, under a dashed rule, the TOTAL row at 40 px light (subtotal × 0.9). Money shows whole dollars when round, otherwise two decimals. Then the full-width black CTA (min-height 48 px) "ADD WHOLE FIT TO BAG" with a long right arrow that nudges 4 px right on hover. The CTA adds every piece whose size was chosen or that has one size. For the rest it opens their pickers (only the first on phones) and shows "Choose size for: Name, Name". When every piece is in the bag, the CTA turns white with an inset ink outline and reads "WHOLE FIT IN YOUR BAG".
4. **Footer**: a 40 px barcode drawn with a repeating linear gradient (ink 0–2 px, gap to 4, ink 4–5, gap to 8, ink 8–11, gap to 12, ink 12–13, gap to 17), then "THANKS FOR GOING NOWHERE." in caps.
On phones the header, footer and the subtotal/discount rows are hidden, and the total drops to 32 px.

Hovering the receipt with a mouse pauses autoplay. Hovering a line highlights its pin, and leaving the list clears it. The cart state is kept per look (added, chosen size, whether a size was chosen).

The toast: fixed at the bottom centre, 24 px up, a black pill with white 12-px caps and 12 px 20 px padding. It rises from +16 px with the spring easing (0.5 s) and hides after 2.5 s.

## 10. Looks drawer

A white panel sliding in from the left (width min(560 px, 100%), 1 px solid ink right border, padding 24 px 32 px 32 px, or 16 px 16 px 24 px on phones). Closed, it sits at translateX(−101%), hidden. Open, it slides in over 1 s ease and dims the page with a 200vmax box-shadow at rgba(0,0,0,.14).
- Top row: "LOOKS · VOL. 01" in caps, plus a "CLOSE" pill.
- An ordered list of the 9 looks, each a full-width row with a dashed top rule (the last also has a bottom rule). The 3-column grid (32 px, 1fr, auto) holds the number in caps, the name at 40 px light uppercase (ellipsis), and in muted italic "3 pieces · $total". The current look's name is italic. On hover the name goes italic and slides 8 px right over 0.7 s. Rows rise in on open (1 s ease, delayed 0.12 s + i × 50 ms). Clicking a row rotates the ring the short way to that look and closes the drawer.
- Footer nav pills: "Vol. 01", "Places", "Letters", "Postcards".
- While the drawer is open the code mark and the dock name fade out. Opening it focuses the current look's row, and closing it returns focus to the Looks button.

## 11. Content

| # | Look | Piece 1 (kind, price) | Piece 2 | Piece 3 |
|---|---|---|---|---|
| 1 | Somewhere Else | Ribbed Tank Top (Top, $36) | Striped Open Shirt (Top, $74) | Braided Belt (Accessory, $32, One size) |
| 2 | Dial-Up | Corduroy Trucker (Outerwear, $142) | Pleated Shorts (Bottom, $64) | Suede Moccasin (Shoes, $118) |
| 3 | Long Walks | Polar Fleece Zip (Top, $92) | Nylon Hike Shorts (Bottom, $58) | Mesh Trainers (Shoes, $124) |
| 4 | Low Battery | Yellow Anorak Shell (Outerwear, $128) | Fleece Joggers (Bottom, $72) | Chunky Sandals (Shoes, $84) |
| 5 | No Reply | Navy Rollneck Knit (Top, $118) | Wool Trousers (Bottom, $106) | Leather Mary Janes (Shoes, $134) |
| 6 | Analog | Corduroy Blazer (Outerwear, $156) | Black Slim Jeans (Bottom, $98) | Desert Boots (Shoes, $146) |
| 7 | Rewind | Faded Black Hoodie (Top, $86) | Carpenter Trousers (Bottom, $94) | Retro Court Sneaker (Shoes, $116) |
| 8 | Out Of Office | Linen Camp Shirt (Top, $76) | Pleated Bermuda (Bottom, $68) | Leather Slides (Shoes, $62) |
| 9 | Paper Maps | Rugby Top (Top, $88) | Tapered Khakis (Bottom, $84) | Suede Low-Tops (Shoes, $122) |

## 12. Accessibility and reduced motion

The stage is a focusable region (aria-roledescription "carousel", or "grid of looks" in grid mode) with the label "Looks — arrow keys turn the ring, Enter opens the look". It has a polite live region announcing "Look N: Name". The drawer, look view and receipt toggle aria-hidden, the Looks button toggles aria-expanded, and the view buttons and size chips use aria-pressed. Under prefers-reduced-motion every animation and transition is turned off, the ring snaps without the spring, there is no intro spin and no autoplay, and the cursor follows instantly.

## 13. Acceptance checklist
- On load the ring spins about one position into place; the front model is largest and sharp, and neighbours shrink, rise toward the horizon and blur up to 6.5 px.
- A drag of about 30% of the width moves one look; a fast flick moves up to two; scrolling sideways steps one; arrows step one.
- Every 5 s it advances, with a light sweep, the name swap and the piece pills rising in.
- The follow circle reads DRAG, turns black with VIEW over the front model, and shrinks to a dot over the others.
- Clicking the front model zooms it smoothly from its ring spot into the look view; the receipt prints down in 18 visible steps; the pins pop in one by one.
- Pin tooltips never leave the area; hovering lines and pins cross-highlights them.
- The size picker, Add to bag, the bag tally bump, the toast, the whole-fit CTA with its size prompt and the completed state all work.
- The grid switch ripples models into a 3×3 grid with captions; switching back ripples them into the ring.
- The phone layout works at 390 px with no sideways scroll.