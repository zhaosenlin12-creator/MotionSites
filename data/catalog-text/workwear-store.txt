# TARROW "Work ’26 Men": exact recreation prompt

Build a single self-contained HTML page (vanilla HTML, CSS and JavaScript; no framework, library or build step) for **TARROW**, a fictional men's canvas workwear label. It is a one-screen shoppable lookbook that never scrolls as a page.

Six men in different poses queue on an empty warm-sand studio floor and form a depth ramp: the man at the front right is large and crisp, and each man behind him is smaller, hazier and further left. Five are visible and the sixth waits off stage. The queue advances by itself every 2 seconds. A click brings any man to the front, the mouse wheel scrolls the queue in both directions, and the queue can be dragged with a mouse or finger. Whenever it advances, the man who was in front blurs, turns translucent and travels back through and behind the line to the end. A product panel on the left always shows the pieces worn by the front man.

Follow every number below. Units are CSS pixels unless stated otherwise. "u" is the design unit defined in section 4. "max(16px, 25u)" means the larger of 16 px and 25 design units.

---

## 1. Media

Use these exact URLs. Each is served as WebP through an image proxy with open CORS headers.

| Asset | Source coordinate space | Use | URL |
|---|---|---|---|
| Model sheet (six transparent cut-outs, 3 × 2) | 3504 × 2336 | Load once with anonymous cross-origin, then crop each man onto his own canvas | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261122_103836_0757222f-18b8-4b37-a307-4c9e9aa92f0b.png&w=3504&q=85 |
| Packshot sheet (20 garments, 5 × 4, on warm grey) | 3200 × 2560 (delivered at 2000 × 1600; all coordinates below are in the 3200 × 2560 space) | CSS background crops in the product cards | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261122_103837_02085cf8-5983-4df4-b754-7ed73f211852.png&w=2000&q=85 |
| Empty studio plate | 2048 × 1360 (delivered at 1920 wide) | Softened stage background | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261122_103836_d2b0109f-45f7-4474-b910-f7523683299e.png&w=1920&q=85 |

There is no video. All motion is the queue and the interface.

Load the model sheet with up to 3 attempts, 700 ms apart. When it has loaded: lay out, paint the six canvases, make the looks visible all at once (they have no entrance animation), mark the page ready and start the 2 second autoplay timer.

## 2. Fonts

Two families, both on Google Fonts. The stylesheet is https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@200..800&display=swap and the exact latin files are:

| Family | Style and weight | Used for | File |
|---|---|---|---|
| Instrument Serif | Regular 400 | Headline, panel heading | https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2 |
| Instrument Serif | Italic 400 | The year "’26" in the headline | https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2 |
| Manrope | Variable, 200 to 800 (uses 400, 600, 700) | Wordmark, subtitle, count, products, pill, badge | https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSg.woff2 |

Use font-display swap. Fall back to a generic serif for Instrument Serif and to system-ui, sans-serif for Manrope. Turn on antialiased font smoothing. Run the layout again when the fonts are ready, then play the text entrance.

## 3. Head and colour tokens

| Item | Value |
|---|---|
| Language | English |
| Title | TARROW \| Work ’26 Men |
| Meta description | TARROW Work ’26: six canvas workwear looks for men. Pick a look to see every piece in it. |
| Viewport | device width, initial scale 1, viewport-fit cover |
| Favicon | an empty data URI |
| Preconnect | https://images.higgs.ai, cross-origin |

| Token | Colour | Used for |
|---|---|---|
| Sand | #CAC2B6 | Page and stage background |
| Panel | #E4E1E2 | Product panel |
| Pack | #D2CFCC | Packshot boxes, and the plus buttons in the stacked layout |
| Ink | #2E3754 | All text and icons |
| Brick | #874839 | Scrollbar thumb, bag badge, focus outline |
| Pill | #252934 | Hover name pill, with white #fff text |
| Button | #E7E4E4 | Plus buttons in the side-by-side layouts |
| Shadow | rgba(67,55,42,.34) at the centre, rgba(67,55,42,.14) at 48%, transparent at the edge | Floor shadow under each man |

Global rules: border-box sizing and zero margins on everything; buttons have no border, padding or background, inherit font and colour and show a pointer cursor; SVGs are display block; tap highlight is transparent. The html and body are 100% high with hidden overflow and no overscroll behaviour. Keyboard focus shows a 2 px brick outline offset 3 px (on the invisible model buttons: offset −3 px with a 12 px radius).

## 4. Layout system

The app is fixed to the viewport (inset 0) and is a two-cell CSS grid: panel and stage. There are three layouts, always chosen by aspect ratio and height, never by width alone.

| Layout | When | Design unit u | Grid |
|---|---|---|---|
| Wide (default) | everything not matched below | the smaller of (viewport width ÷ 1440) and (dynamic viewport height ÷ 900) | panel on the left, max(250px, 340u) wide; stage takes the rest |
| Short landscape | aspect ratio at least 115/100, height at most 500 px, width at least 541 px | same as wide | panel on the left, clamped between 196px and 300px at 32vw; stage takes the rest |
| Stacked | aspect ratio at most 115/100, or width at most 540 px | the smaller of (width ÷ 760) and (height ÷ 1100) | one column: stage on top at 58fr, panel below at 42fr |

Panel padding variable: max(16px, 25u) in wide, 14px in short landscape, max(16px, 3.5vw) in stacked.

At exactly 1440 × 900: u is 1 px, the panel is 340 × 900 at the left and the stage is 1100 × 900 starting at x 340.

## 5. Page structure, in order

1. Main app.
   1. Stage section, labelled "Work ’26 looks": the plate layer; the header (wordmark and two tool buttons); the intro (h1 and subtitle); a container of six looks, hidden from assistive technology; five invisible slot buttons; one name pill.
   2. Panel aside, labelled "The full kit": a focusable scroll container holding a heading row and a list of product cards; a custom scrollbar track with a thumb.
   3. A visually hidden polite live region.

Every visible string:

| Where | Exact text |
|---|---|
| Wordmark | TARROW |
| Headline | Work ’26 Men (right single quotation mark; "’26" is italic) |
| Subtitle | Six looks, made for the job |
| Panel heading | The full kit |
| Piece count | 3 PIECES or 4 PIECES |
| Pill | the hovered look's name (section 7) |
| Products | names, descriptions and prices in section 9 |
| Bag badge | the number of items added, hidden at zero |

There are no nav links, social icons, announcement bar, buttons under the headline, arrows or dots.

## 6. Stage

The stage is position relative, overflow hidden, isolated, sand, with a grab cursor, touch-action pinch-zoom and text selection disabled. While dragging, the stage and all its children show a grabbing cursor.

**Plate.** Absolute, inset −32px on every side, z-index 0, the plate image centred at cover size without repeat, filter blur 14px, no pointer events.

**Header.** Absolute across the top of the stage, z-index 30, flex with space-between and vertically centred, no pointer events except on the tools.

| Property | Wide | Short landscape | Stacked |
|---|---|---|---|
| Height | 92u, at least 52px | 48px | max(54px, 82u) |
| Left padding | max(16px, 35u) | 16px | panel padding variable |
| Right padding | 22u | 8px | panel padding variable minus 8px |
| Wordmark size | max(16px, 25u) | same as wide | max(17px, 26u) |

The wordmark is Manrope 700, tracking .19em, line-height 1. At 1440 × 900 it sits at x 375, y 34, about 135 wide.

**Tools.** Two buttons with a 5u gap, each max(36px, 44u) square with a centred icon max(19px, 24u) square, drawn as stroked SVG on a 24 × 24 view box, current colour, stroke width 1.6, no fill.

- Search, labelled "Search": a circle centred 10.3, 10.3 with radius 7.6, plus a line from 16,16 to 22,22.
- Bag, labelled "Bag, 0 items" (updates, with singular "item" for one): a trapezoid body through 4.5,7.5 → 19.5,7.5 → 20.8,22.5 → 3.2,22.5, closed, with round joins; a handle from 8,10 up to 8,5.8, a semicircular arc of radius 4 over to 16,5.8, then down to 16,10.
- Bag badge: absolute at the button's top right, at least 18 px wide, 18 px high, 4 px side padding, radius 9 px, brick with white Manrope 700 at 11 px on an 18 px line, centred.

Neither tool opens anything.

**Intro.** Absolute, z-index 1 (behind the men), no pointer events.

| Property | Wide | Short landscape | Stacked |
|---|---|---|---|
| Left | max(16px, 35u) | 16px | panel padding variable |
| Top | max(50px, 100u) | 44px | max(52px, 82u) |
| Headline size | max(34px, 95u) | max(30px, 9.2vh) | max(40px, 78u) |
| Subtitle size | max(12px, 22u) | same as wide | max(12px, 20u) |

Headline: Instrument Serif 400, line-height 1.05, letter-spacing −.037em, word-spacing .035em, no wrapping. Subtitle: Manrope 400, line-height 1.35, top margin −7u, no wrapping. Headline, subtitle and panel heading each sit inside a clipping line wrapper (display block, overflow hidden, padding 0 .04em .03em 0) with an inline-block span inside that animates. At 1440 × 900 the headline block starts at x 375, y 100 and is roughly 400 wide.

## 7. The six looks

The initial order, front to back, is the order of this table. Boxes are x, y, width, height in the 3504 × 2336 model sheet.

| Index | Name | Crop box | Pose and clothes | Pieces, in panel order | Shadow centre | Shadow width |
|---|---|---|---|---|---|---|
| 0 | Dock Walker | 264, 48, 588, 1064 | Long stride to the right looking at camera; navy chore jacket, khaki double-knee | Harbour Duck Jacket, Double-Knee Pant, Heavy Crew Tee, Foreman Lace Boot | .5 | 1.2 |
| 1 | Brick Shift | 1556, 60, 372, 1048 | Front-on, thumb at pocket; brick jacket and beanie, ecru pant | Kiln Chore Jacket, Plaster Canvas Pant, Kiln Watch Cap | .49 | 1.35 |
| 2 | Quarry Hand | 2696, 60, 388, 1056 | Walking at camera, legs crossing; grey beard, sand jacket, navy beanie | Quarry Overshirt, Yard Work Pant, Night Shift Tee, Dock Watch Cap | .5 | 1.1 |
| 3 | Night Rig | 384, 1204, 336, 1052 | Side-on, looking back to camera, hands at waist; navy overalls | Rigger Bib Overall, Long Shift Crew, Foreman Lace Boot | .5 | 1.15 |
| 4 | Plaster Run | 1500, 1204, 416, 1044 | Front-on, smiling, carrying a brick tote; ecru jacket | Plaster Zip Jacket, Timber Crew Tee, Carpenter Pant, Kiln Tool Tote | .55 | 1.15 |
| 5 | Kiln Break | 2688, 1200, 388, 1044 | Hip out, ankles crossed, hand in pocket; brick overshirt, navy cap | Brickyard Overshirt, Gravel Crew Tee, Siteline Cap | .58 | 1.2 |

**Element.** Each look is an absolute box at left 0, top 0 with transform origin at its top-left, will-change transform and opacity, hidden until the sheet has loaded. It contains a shadow first and a canvas second. The canvas is display block, relative, 100% by 100%. The looks layer fills the stage at z-index 2 with no pointer events, and each look has its own z-index inside it.

**Sizing.** With S as the front height (section 8), a look's natural CSS height is S × crop height ÷ 1064 and its width keeps the crop's aspect ratio. Using one divisor for all six keeps the men's real relative heights.

**Shadow.** Absolute at the bottom of the look, 9% of its height, moved down by 50% of itself, filled with a closest-side radial gradient in the shadow colours. Its width is the table's width × the look's width and its centre is the table's centre × the look's width. It scales and fades with the man.

**Canvas.** The backing scale is the smaller of 1 and (natural height × device pixel ratio, capped at 2, ÷ crop height). Draw the crop with high-quality smoothing, then erase three small leftover grey patches with destination-out filled polygons, given in sheet coordinates (convert by subtracting the crop origin and multiplying by the backing scale). Repaint only when the scale changes.

- Brick Shift: 1608,645 · 1615,645 · 1616,663 · 1618,672 · 1611,670 · 1606,660.
- Night Rig, first patch: 470,1480 · 491,1469 · 500,1469 · 512,1491 · 515,1520 · 505,1526 · 494,1514 · 481,1499.
- Night Rig, second patch: 489,1569 · 500,1574 · 512,1589 · 508,1590 · 499,1582.

## 8. The ramp: slots and geometry

There are six slots. Slot 0 is the front and slot 5 is off stage. X is a fraction of stage width, measured to the look's horizontal centre. Foot rise is a fraction of S, measured upward from the floor line. Scale multiplies the look's natural size.

| Slot | X, wide and short | X, stacked | Foot rise | Scale | Opacity | Resting z-index |
|---|---|---|---|---|---|---|
| 0 | .818 | .8 | 0 | 1 | 1 | 10 |
| 1 | .586 | .555 | .061 | .8 | 1 | 9 |
| 2 | .368 | .363 | .095 | .64 | .97 | 8 |
| 3 | .18 | .205 | .11 | .55 | .82 | 7 |
| 4 | .027 | .068 | .142 | .436 | .5 | 6 |
| 5 | −.13 | −.13 | .16 | .38 | 0 | 5 |

In the wide layout slot 4 is intentionally part hidden by the stage's left edge.

**Floor and S.** W and H are the stage's width and height. Title bottom is the intro's offset top plus its offset height (use offsets, so the entrance transform does not affect it).

| Layout | Floor line from the stage top | Front height S |
|---|---|---|
| Wide | H × .838, then raised by .3 × (H × .658 − S) | the smaller of H × .658 and W × .54 |
| Short landscape | H − 18 | the smaller of (floor − 76) ÷ 1.035 and W × .56 |
| Stacked | H − the larger of 14 and H × .045 | the smaller of (floor − title bottom − 28) ÷ 1.015 and W × .68 |

In the wide and short layouts, then keep the men clear of the title: for slots 1 to 4, if (X × W − S × scale × .22) is not greater than the intro's right edge, limit S to (floor − title bottom − 8 − pill height) ÷ (scale × 1.09 + foot rise), using 22 px if the pill height is unknown. Finally S is at least 80 px.

**Placing a look each frame.** Left is X × W minus half of (natural width × scale). Top is floor minus foot rise × S minus natural height × scale. Apply translate3d to that point followed by the scale, then the opacity, then a blur filter only when blur is above .05. The filter radius is blur × (S ÷ 592) ÷ the larger of scale and .4, because the filter sits inside a scaled layer.

**Slot buttons.** Five invisible buttons at z-index 20 with pointer cursors, one per visible slot. Horizontally each runs between the midpoints to its neighbouring slots' X; the first reaches the stage's right edge and the last its left edge. Bottom is floor − foot rise × S + 8. Top is the larger of 52 and (bottom − scale × S × 1.16 − 8). Their accessible labels are "Show the NAME look", or "NAME, current look" for the front.

Recompute all geometry, repaint as needed and refit the packshots whenever the stage resizes (ResizeObserver). Also refit packshots and the scrollbar when the panel content resizes.

## 9. Product panel

The panel is relative, background panel grey, minimum height 0. The scroll container is 100% high, scrolls vertically, contains overscroll and hides the native scrollbar. The heading row scrolls away with the cards.

| Property | Wide | Short landscape | Stacked |
|---|---|---|---|
| Inner padding top | max(18px, 44u) | 12px | max(12px, 20u) |
| Inner padding sides | left is the padding variable, right is that minus 1px | same | same |
| Inner padding bottom | max(20px, 30u) | same | same |
| Heading row height | max(34px, 52u) | auto | auto |
| Heading row bottom margin | 11u | 8px | max(10px, 14u) |
| Heading size | max(25px, 42u) | 24px | max(25px, 38u) |
| Gap between cards | 30u | 16px | 10px |
| Packshot box height | max(190px, 443u) | max(150px, 46vh) | max(92px, 150u) |

Heading row: flex, space-between, baseline aligned, 10 px gap. Heading is Instrument Serif 400, line-height 1.15, no wrapping. Count is Manrope 400 at max(11px, 13u), tracking .14em, no wrapping.

**Card in the wide and short layouts.** A vertical stack. The packshot box is full width, pack colour, radius max(10px, 14u), overflow hidden. The plus button is a circle max(28px, 38u) across, button colour, inset max(8px, 11u) from the box's bottom right. The text block has top padding max(9px, 15u) and 1 px at each side.

| Text | Size | Weight | Line height | Top margin |
|---|---|---|---|---|
| Name | max(13px, 17u) | 700 | 1.35 | 0 |
| Description | max(11px, 13.5u) | 400 | 1.4 | max(2px, 4u) |
| Price | max(12px, 16u) | 700 | 1.3 | max(5px, 11u) |

**Card in the stacked layout.** A row: an image column max(92px, 150u) wide and a flexible text column, vertically centred. The plus button moves to the row's right edge, vertically centred, max(32px, 42u) across, pack colour. Text padding is 0 on top and bottom, max(42px, 56u) right and max(12px, 18u) left. Name is max(14px, 19u), description max(11.5px, 15u), price max(13px, 17u).

**Stacked at 720 px wide or more.** Two columns of those rows with a 24 px column gap and a 16 px row gap. Image column max(80px, 104u), box height max(100px, 134u), plus button max(30px, 36u), text padding right max(36px, 44u) and left max(10px, 14u), name max(13px, 17u), description max(11px, 13.5u).

**Plus icon.** A 12 × 12 px SVG with a centred vertical and horizontal line, stroke 1.3. Each is labelled "Add NAME to bag".

**Products.** Boxes are x, y, width, height in the 3200 × 2560 packshot space. Prices show with a leading dollar sign.

| Name | Description | Price | Box |
|---|---|---|---|
| Harbour Duck Jacket | Dense cotton duck, built to last. | $165 | 56, 100, 536, 488 |
| Double-Knee Pant | Reinforced knees, roomy straight leg. | $128 | 776, 68, 312, 556 |
| Heavy Crew Tee | Thick ecru jersey with a tight collar. | $48 | 1324, 108, 512, 484 |
| Foreman Lace Boot | Full-grain leather on a welted sole. | $240 | 2028, 212, 396, 352 |
| Kiln Chore Jacket | Brick canvas with three patch pockets. | $172 | 2608, 96, 532, 492 |
| Plaster Canvas Pant | Undyed canvas, cut wide and straight. | $118 | 164, 700, 320, 580 |
| Kiln Watch Cap | Ribbed merino with a deep turn-up. | $42 | 744, 796, 384, 360 |
| Quarry Overshirt | Washed sand twill, worn open or shut. | $154 | 1324, 712, 520, 516 |
| Yard Work Pant | Navy twill with a hammer-ready seat. | $112 | 2072, 708, 324, 572 |
| Dock Watch Cap | Close-knit wool for early starts. | $42 | 2672, 796, 384, 360 |
| Night Shift Tee | Midnight jersey, soft from day one. | $48 | 80, 1384, 492, 472 |
| Rigger Bib Overall | Navy duck with brass side buttons. | $186 | 804, 1284, 264, 636 |
| Long Shift Crew | Long-sleeve jersey with ribbed cuffs. | $64 | 1340, 1364, 476, 496 |
| Plaster Zip Jacket | Light canvas, full zip, two pockets. | $158 | 1964, 1368, 540, 496 |
| Timber Crew Tee | Earth-brown cotton in a boxy cut. | $48 | 2628, 1380, 488, 468 |
| Kiln Tool Tote | Waxed canvas with six outer pockets. | $78 | 128, 1960, 380, 496 |
| Brickyard Overshirt | Brushed cotton, heavy as a jacket. | $138 | 684, 1964, 504, 508 |
| Gravel Crew Tee | Sand jersey that hides the dust. | $48 | 1336, 1984, 488, 460 |
| Siteline Cap | Six-panel twill with a curved brim. | $38 | 2032, 2056, 400, 356 |
| Carpenter Pant | Khaki drill with a side tool loop. | $124 | 2712, 1936, 300, 556 |

**Fitting a packshot.** The image area fills the packshot box (in stacked it is relative and 100% high). Expand the crop so a little of the sheet's grey surrounds the garment: start 4.5% of the width left and 3.5% of the height above, at 109% of the width and 107% of the height. The display factor k is the smaller of (area width × .8 ÷ the larger of original crop width and 470) and (area height × .8 ÷ the larger of original crop height and 540); the two floors keep hats and boots smaller than jackets. The element is the expanded crop × k, centred, with the sheet as a non-repeating background sized 3200k × 2560k and positioned at minus the expanded origin × k. Feather its edges with two intersected linear-gradient masks: horizontal (transparent, opaque at 5%, opaque at 95%, transparent) and vertical (transparent, opaque at 4%, opaque at 96%, transparent), with the WebKit-prefixed equivalent using source-in compositing.

**Custom scrollbar.** A track 12 px wide on the panel's right edge, full height, z-index 3, touch-action none, hidden when nothing overflows. The thumb is brick, 5 px wide, flush right and square-ended. Its height is the larger of 28 px and view height² ÷ content height, and it moves over (view height − thumb height) in proportion to scroll. Dragging the track scrolls by pointer distance × content height ÷ view height, with pointer capture.

**Smooth panel wheel.** Prevent the default (unless Ctrl is held). Delta mode line counts 32 px and page counts one view height. Add to a target clamped to the scroll range, then each frame move toward it by 1 − e^(−dt ÷ 70 ms), with dt capped at 64 ms, snapping within 1 px. A key press, a touch or a thumb drag cancels the target. Reduced motion uses native scrolling.

## 10. Motion A: a timed advance (click or autoplay)

Clicking slot k brings that man to the front. Clicking slot 0 does nothing. Autoplay uses k = 1.

At the click, save every look's current rendered x, foot rise, scale and opacity as its start (so a click during any movement never jumps). Looks in slots below k are "wrapping". If k is greater than 1, the clicked look is "popping". Every new slot is (old slot − k) modulo 6. Wrapping looks take z-index 1 immediately and the others 10 minus their new slot. Update the button labels, swap the panel and restart the autoplay timer.

| Part | Delay | Duration | Easing | Behaviour |
|---|---|---|---|---|
| Glide: x, foot rise, scale, opacity | 33 ms | 780 ms | cubic-bezier(.75, 0, .3, .95) | all looks move from their saved state to the new slot |
| Second settle, new slot 1 only | 800 ms | 230 ms | smoothstep t²(3 − 2t) | the glide ends at slot scale ÷ 1.065, then the man grows from the feet to the full slot scale |
| Ghost, wrapping looks | 150 ms | until 690 ms | sine half-wave g | opacity is multiplied by 1 − .68g and blur is 7g, so the old front passes behind everyone to the back |
| Soft focus, everyone else except a popping look | 280 ms | 340 ms | sine half-wave | blur peaks at 1.8 |
| Pop, clicked look when k is 2 or more | 0 | 75 ms | quadratic ease-out 1 − (1 − t)² | scale and opacity reach their front values in place, while x and foot rise follow the normal glide |

The move is over at 1030 ms. Solve the cubic-bezier numerically (about 22 bisection steps is enough). Drive everything from one requestAnimationFrame loop using performance.now, never CSS transitions.

## 11. Motion B: wheel and drag (a continuous loop)

Wheel and drag share one continuous position P, measured in looks. It is unbounded; the front index is P modulo 6.

**State at any P.** Let B be floor(P + 0.000001) and q be P − B, clamped 0 to 1. A look with index i is in slot s = (i − B) modulo 6. If q is below 0.0001 it rests in that slot. Otherwise it interpolates linearly by q to slot (s − 1) modulo 6 in x, foot rise, scale and opacity. Let m be sin(πq).

- The look leaving slot 0 is the ghost: with g as m to the power .7, opacity is multiplied by 1 − .68g, blur is 7g and z-index is 1.
- Every other look has blur 1.8 × m × (absolute speed ÷ 2, clamped to 1) and z-index 10 minus its destination slot.

Because this depends only on P, scrolling backwards plays the same path in reverse: the ghost comes from the back through the line to the front.

**Taking over.** When wheel or drag begins, P starts at the current front index. If a one-look timed move is still running, P starts at front − 1 + eased glide progress, and the speed is that easing's slope (sampled 8 ms either side). For each look record the difference between what is on screen and the state at P, for x, foot rise, scale, opacity and blur; add that difference back multiplied by (1 − smoothstep over 280 ms) so there is never a jump. The spring target starts at the front index.

**Spring.** Critically damped, omega 8.5 per second, solved exactly each frame with dt capped at 250 ms: with offset o = P − target, c = velocity + 8.5o and e = exp(−8.5dt), the new P is target + (o + c·dt)e and the new velocity is (velocity − 8.5c·dt)e. When no snap is pending and the offset is below .002 and the speed below .03, land exactly, hand control back and restart the autoplay timer.

**Wheel over the stage.** Prevent the default unless Ctrl is held; ignore it during a drag. Use whichever of horizontal and vertical delta is larger. Delta mode line counts 32 px and page counts 300 px. Down or right is forward, up or left is back. 300 px equals one look. If the direction reverses, first set the target to the nearest whole position to P. Add delta ÷ 300 and keep the target within 6 looks of P. After 130 ms without a wheel event, snap the target in the direction of travel: ceil(target − .08) going forward, floor(target + .08) going back. One mouse notch is therefore one look.

**Drag on the stage.**

1. Primary pointer and primary button only, and not from the header tools. A press becomes a drag after 6 px of horizontal movement. Measure from that threshold, so the first movement does not jump. Capture the pointer, hide the pill and show the grabbing cursor.
2. One look equals (X of slot 0 − X of slot 4) ÷ 4 × W pixels. P follows the pointer one to one. Dragging right is forward, left is back.
3. Keep the last 100 ms of samples. Velocity is the position change over the larger of the sample time and 50 ms.
4. On release (pointer up, cancel, or a move with no button held), velocity is zero if the last movement was more than 90 ms ago. The flick allowance is the smaller of 2 and (.2 + absolute looks dragged). The target is the rounded value of P + (velocity × .18, clamped to plus or minus the allowance).
5. If that equals the starting look but the drag exceeded .22 of a look and the velocity does not oppose it, move one look in the drag direction.
6. If the velocity points toward the target, cap it at 8.5 × the distance, otherwise use zero, so there is no overshoot. The spring finishes the move.
7. Swallow the click that follows a drag. A plain press without movement remains a click, and a click during a scroll switches to the timed advance from the current on-screen state.

**Panel during scrubbing.** When P gets more than .54 of a look from the shown index, change the shown index to the nearest, reassign slots and labels and swap the panel.

## 12. Panel swap, pill, autoplay

**Panel swap.** Set the card list's opacity to 0 immediately. After 40 ms replace the cards, count, scroll position (back to the top), packshot fit and thumb, then clear the inline opacity and animate opacity .35 to 1 over 30 ms. If a swap is already waiting, do not restart it (it will render the latest front), so fast scrolling never leaves the panel blank.

**Name pill.** Absolute at the stage origin, z-index 25, no pointer events, background pill, white Manrope 600 at max(11px, 13u). Height and line height max(22px, 28u), side padding max(9px, 14u), fully round, no tail, no wrapping. Show it for the slot under a mouse pointer (or a keyboard-focused slot button).

- It is centred on that man, clamped 6 px inside the stage, with its bottom (scale × S × .035 + 6) above the top of his crop, and never higher than 4 px from the stage top. It follows him every frame.
- Opacity changes linearly over 150 ms. Vertical scale is .35 + .65 × smoothstep(opacity).
- During a timed advance it keeps riding the man it named until 270 ms, stays hidden until 540 ms, then returns with the newly hovered name. Change the text only while its opacity is below .05.
- Hide it while dragging or while scroll speed is above .35 looks per second.
- Hover never scales a man.

**Autoplay.** One look every 2000 ms, measured start to start, beginning when the images are ready. Keep resetting the timer while any of these is true: the queue is being dragged, pressed or scrolled; a mouse is over the panel; something in the panel has visible keyboard focus; the document is hidden; less than 6000 ms has passed since a touch start, move or end in the panel. Touching or wheeling the stage clears that touch wait. Panel scrolling, adding to the bag, leaving the panel and visibility changes also restart the timer.

**Bag.** Each plus press adds 1, reveals the badge and updates the bag's accessible label. Nothing flies or opens.

**Live region.** Announce "NAME, N pieces" for changes the person made. Autoplay changes are silent.

## 13. Opening animation

Only text animates on load. Each element rises from translateY 45% and opacity 0 to rest, once, over 950 ms with cubic-bezier(.2, .7, .2, 1) and backwards fill.

| Order | Element | Delay | Duration |
|---|---|---|---|
| 1 | Wordmark | 0 ms | 950 ms |
| 2 | Headline span | 75 ms | 950 ms |
| 3 | Subtitle span | 150 ms | 950 ms |
| 4 | Panel heading span | 225 ms | 950 ms |
| 5 | Piece count | 300 ms | 950 ms |

Before it runs, a body class hides these five elements. Remove the class as the animations start, with a failsafe that removes it at 2500 ms, and force-finish each animation after 2200 ms, so throttled tabs never show blank text.

## 14. Mobile, tablet and reduced motion

- Phones in portrait, portrait tablets and near-square windows use the stacked layout: the full ramp with all five men visible above, the product rows scrolling inside the lower 42%. At 720 px and wider the rows form two columns.
- Phones on their side use the short landscape layout. The front man leaves room for his pill below the header icons.
- Horizontal swipes on the stage are the drag. A tap on a man selects him. Pinch zoom still works.
- No text is below 11 px, no button is below 24 px, nothing scrolls sideways, and the title never overlaps a resting man or a pill at any size from 320 × 568 to 3440 × 1440.
- With prefers-reduced-motion: no entrance, no autoplay, clicks and panel swaps are instant, wheel input lands directly on its snapped look, a drag follows the pointer and lands instantly on release, and the panel uses native scrolling.

## 15. Acceptance checklist

1. At 1440 × 900: a 340 px grey panel on the left, the sand studio on the right, TARROW at the top left of the stage, the headline directly beneath, five men ascending to a 592 px front figure at the right whose feet are near y 754.
2. All six poses are different and the men keep their true relative heights.
3. The page advances at 2 seconds and every 2 seconds after that.
4. A click glides for 780 ms, the new second man settles about 6.5% larger by 1030 ms, and the old front travels behind the line as a blurred ghost.
5. A click two or more back pops to front size in place, then glides forward.
6. One wheel notch down is the next look, one up is the previous, and the loop wraps both ways with no overshoot.
7. Dragging follows the pointer, a short drag moves one look, a flick adds no more than two, and a drag never triggers a click.
8. Interrupting any movement by click, wheel or drag causes no jump.
9. The panel shows only what the front man wears, within 75 ms of a click, with the scrollbar longer for three pieces than for four.
10. Reading the panel pauses autoplay. Wheeling over the panel scrolls products, never the men.
11. Every layout fits without overlaps, and reduced motion is respected.
12. The console has no errors.