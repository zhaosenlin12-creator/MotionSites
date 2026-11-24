# VESTRA — Virtual Try-On Outerwear Hero: exact recreation prompt

Build a single-file, full-viewport e-commerce hero for a fictional menswear outerwear brand called VESTRA. A male model stands front-on in the centre of a pale ice-stone studio. His jacket changes on a loop. Every few seconds, or on every scroll, the next garment's cut-out packshot flies from a product rail on the right onto his torso, the worn jacket swaps, and the product title rolls up behind a mask. The page is one screen with no scroll. It must match everything below exactly: every asset URL, element, measurement, colour, font and animation timing. Use plain HTML, CSS and vanilla JavaScript with no libraries. Use the Web Animations API for all motion.

## 1. Assets (use these exact URLs, never re-host)

All images are loaded through the Higgsfield image proxy. Build each `src` as `https://images.higgs.ai/?default=1&output=webp&url=` + encodeURIComponent(ORIGINAL) + `&w=` + WIDTH + `&q=85`. WIDTH is 2048 on desktop. On screens narrower than 820 px it is 1280 for the plates and 1024 for the packshot sheet. Each ORIGINAL is `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/` followed by the file name below.

| Role | File name (append to the CloudFront prefix) | Native size | Notes |
|---|---|---|---|
| Base plate: model in a plain black crew-neck tee and charcoal trousers, hands in pockets, seamless ice-stone backdrop with soft mist in the bottom corners, no UI | hf_20261115_071307_1d0f42d5-b05f-4e21-bf76-f52fb4b12bb5.png | 2048×1360 | Always visible underneath |
| Wear plate 0: the same model and pose wearing the glossy ice-grey puffer | hf_20261115_071402_80cf9c12-dd74-45cf-a639-1f8580543ff3.png | 2048×1360 | Product 0 |
| Wear plate 1: sage-green fleece zip jacket | hf_20261115_071402_63307d14-96fd-4b18-bae5-034018df0692.png | 2048×1360 | Product 1 |
| Wear plate 2: light-grey technical hooded shell | hf_20261115_071402_01ef6ea1-a2e6-4d0d-83ce-cbae31202ccc.png | 2048×1360 | Product 2 |
| Wear plate 3: deep-navy hooded parka | hf_20261115_071400_47a4d43c-8f7c-4f0a-b860-1dc753202b92.png | 2048×1360 | Product 3 |
| Packshot sheet: 2×2 grid of the four jackets as ghost-mannequin cut-outs on a transparent background | hf_20261115_071304_55f839b8-7976-43af-8b07-b439c6be0936.png | 2048×2048, alpha | Shown as CSS background-position crops |

All five plates share identical framing. The model is horizontally centred, with his head top at about plate y 150 and his garment centred at plate (1012, 640). A jacket on the body is about 600 plate px wide.

Packshot crop boxes inside the 2048×2048 sheet, given as x, y, width, height in sheet pixels:

| Product | Box |
|---|---|
| 0 Alpine Puffer (top-left) | 134, 79, 760, 863 |
| 1 Ridge Fleece (top-right) | 1138, 79, 790, 863 |
| 2 Drift Shell (bottom-left) | 137, 1024, 748, 901 |
| 3 Harbor Parka (bottom-right) | 1146, 1011, 776, 966 |

To draw packshot i at scale k (sheet px to screen px), make an element w·k × h·k in size. Set background-image to the sheet, background-size to 2048k × 2048k, background-position to (−x·k, −y·k), and background-repeat to no-repeat.

## 2. Product data (exact strings)

| # | Title (left column) | Price | Cart-pill name (rendered uppercase) | Cart-pill sub-label |
|---|---|---|---|---|
| 0 | Alpine Puffer | $238.00 | Alpine Puffer Jacket | Ice Grey |
| 1 | Ridge Fleece | $148.00 | Ridge Fleece Jacket | Sage |
| 2 | Drift Shell | $196.00 | Drift Shell Jacket | Light Grey |
| 3 | Harbor Parka | $284.00 | Harbor Parka | Navy |

Product 0 is active on load.

## 3. Fonts

- Inter, as a variable font (100–900), latin subset: https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2. All UI text uses it, at weights 400 and 500.
- Archivo ExtraBold 800 at font-stretch 125% (Expanded), latin: https://fonts.gstatic.com/s/archivo/v25/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q8EsJaRE-NWIDdgffTTtDRZ9xdp.woff2. It is used only for the VESTRA wordmark.
- Declare each with @font-face and font-display: swap. Declare Inter with font-weight 100 900. Declare Archivo with font-weight 800 and font-stretch 125%. The standalone file embeds both woff2 files as base64 data URIs.

## 4. Colour tokens

| Token | Value | Use |
|---|---|---|
| bg | #DEE4E8 | page and hero background (matches the plate backdrop) |
| nav | #F5F7F8 | nav bar; also the loading tiles |
| ink | #18222D | all primary text, borders, the button fill, the active pagination dash, the badge |
| muted | #56616A | eyebrow and pill sub-label |
| white | #FFFFFF | cart pill, button text |
| nav border | rgba(24,34,45,.06) | 1 px under the nav |
| dash idle | rgba(24,34,45,.22) | inactive pagination dashes |
| scroller track | rgba(24,34,45,.10) | right-edge indicator track |

Text contrast: ink on bg is about 13:1 and muted on bg is about 5:1, both passing AA.

## 5. Scaling system

The design is measured on a 1440×900 frame. Desktop unit: `--u = min(100vw/1440, 100vh/900)`, and every desktop size below is a number times `--u`. Elements are anchored to the viewport edges, not to a centred frame. The left column is pinned to the left edge, the rail to the right edge, the cart pill to the bottom centre, and the nav to the top. Vertical positions of the copy and rail are offsets from the viewport's vertical centre (50vh). The breakpoint is 820 px: below it the phone layout applies (section 9). html and body are 100% tall, overflow hidden, and the background is bg. The hero is position: fixed with inset 0, overflow hidden and touch-action none.

## 6. Desktop layout (values at 1440×900, where u = 1)

Plates: one container holds six stacked images: the base, then wear plates 0–3. Wear plates have opacity 0 except the active one, which has opacity 1. The container is 2048×1360 with transform-origin top-left, transformed by translate(ox, oy) scale(ps):
- ps = max(vw/2048, vh/1360) (cover)
- ox = (vw − 2048·ps)/2
- oy starts as (vh − 1360·ps)/2. It is then clamped so the head stays below the nav: oy = min(0, max(oy, navHeight + 18u − 150·ps)), where navHeight = max(44u, 40px). In short, wide windows the crop comes off the bottom.

At 1440×900 the result is ps 0.703, and the model spans about x 500–925 with his head top near y 86.

Nav: absolute at the top, full width. Height is max(44u, 40px), background nav, 1 px bottom border. It is a flex row with space-between and horizontal padding max(19u, 14px), at z-index 5.
- Left: "Collections" link, Inter 400 at max(14.5u, 13px), letter-spacing −0.005em, ink. It is followed after a gap of max(8u, 6px) by a 10u chevron-down SVG (path M2 3.5 l3 3 3-3, stroke 1.4).
- Centre: "VESTRA", absolutely centred at left 50% and top 50% with translate(−50%,−50%). Archivo 800, stretch 125%, font-size max(19.5u, 17px), letter-spacing 0.01em, line-height 1. At 1440 it renders about 106 px wide.
- Right: two outline icons, each max(22u, 20px) square, gap max(26u, 18px), stroke width 1.5.
  - Account: circle cx12 cy8 r4, plus the shoulders path M4.5 20.5 c1.2-3.8 4-5.5 7.5-5.5 s6.3 1.7 7.5 5.5 z.
  - Bag: body M5 8 h14 l-1 12.5 H6 z, handle M8.5 10 V6.8 a3.5 3.5 0 0 1 7 0 V10.
  - The bag carries a badge "2": an ink circle of max(15u, 14px) with white Inter 500 text at max(9.5u, 9px), offset right −9u and top −8u, with a 1.5 px nav-coloured ring.

Left copy column: absolute, left 42u, top = 50vh − 183u, z-index 3.
- Eyebrow "NEW SEASON": Inter 500, 11.4u, letter-spacing 0.22em, uppercase, muted, line-height 1. It spans x 42–144 and y ≈265–279.
- Title: an h1 in a mask wrapper (overflow hidden, position relative) holding one span. Margin-top 16u, Inter 400, 55.7u, letter-spacing −0.022em, line-height 1.12, nowrap, ink. "Alpine Puffer" spans x 42–366 and y ≈291–358.
- Price: the same kind of mask wrapper. Margin-top 12u, Inter 400, 26.5u, letter-spacing −0.01em, line-height 1.2. "$238.00" spans x 42–146.
- Shop Now button: margin-top 26u, inline-flex, height 42u, padding 0 20u, 1 px solid ink border, no radius. The text is Inter 400 at 14.5u, followed after a gap of 12u by a 15u right-arrow SVG (M2 8 h11, M9 4 l4 4-4 4, stroke 1.4). The box is x 42–181, y 427–469. On hover the fill becomes ink and the text white, with a 0.3 s transition.

Product rail: an absolute full-screen layer at z-index 2 with pointer-events none. Only its packshots take pointer events and show the pointer cursor. Two packshots are visible: active+1 in slot 0 and active+2 in slot 1, wrapping modulo 4. Packshot scale s = 0.335u. Each packshot is vertically centred on cy = 50vh − 13u, so its top is cy − h·s/2.
- Slot 0 left edge: vw − 393u (x 1047 at 1440).
- Slot 1 left edge: vw − 120u (x 1320), half cut off by the right edge.
- At 1440×900 the fleece in slot 0 sits at x 1047, y 292, and is 265×289.

Pagination: four dashes in a row at left vw − 393u and top 50vh + 190u (y 640). The gap is 5u, each dash is 2u tall with radius 2 px, inactive dashes are 5u wide in dash-idle, and the active dash is 20u wide in ink. Width and background transition over 0.35 s with cubic-bezier(.22,.61,.36,1).

Right-edge indicator, which is decorative: absolute, right 17u, top 50vh − 234u, 3u × 69u, radius 3 px, track colour. Its top 50% is an ink bar.

Cart pill: absolute, left 50% with translateX(−50%), bottom 52u, 474u × 60u, white, radius 10u. The shadow is 0 6u 24u rgba(24,34,45,.08) plus 0 1px 2px rgba(24,34,45,.05). It is a flex row with items centred, padding 0 10u 0 12u, z-index 5. At 1440×900 it spans x 483–957 and y 788–848. Contents, left to right:
- Thumbnail: 42u square, radius 4u. It is the active product's packshot from the sheet, fitted inside at 92% and centred.
- Meta block: margin-left 15u, flex 1, line-height 1.25. The name is Inter 500 at 13u, letter-spacing 0.01em, uppercase, single line with ellipsis. The sub-label is Inter 400 at 11.5u, muted, margin-top 3u.
- Price: Inter 400 at 14u, margin-right 25u.
- "Add to cart" button: flex, gap 9u, height 40u, padding 0 15u 0 13u, ink fill, white text at 14u, radius 6u, with a 14u bag icon before the text (M3.5 5.5 h9 l-.7 8 h-7.6 z, M6 7 V4.6 a2 2 0 0 1 4 0 V7, stroke 1.3). The button is x 822–947.

"Drag to explore": absolute, right 44u, bottom 66u. Inter 400 at 14.5u in ink, followed after a gap of 12u by the same 15u arrow. It spans x 1264–1396.

## 7. The garment swap (exact timeline, 1200 ms in total)

A swap to target product T, from current product A, runs these steps. The two worn jackets cross-dissolve; the base plate (black tee) never shows during a swap.

| Time (ms) | What happens | Easing |
|---|---|---|
| 0 | Layer order: wear plate A gets z-index 1 and stays fully opaque; wear plate T gets z-index 2 and class "on" (its animation holds it at opacity 0 until its delay ends) | — |
| 100–350 | Old title span and old price span translate from Y 0 to −105% inside their masks. They are set absolute (top-left) as soon as the swap starts and removed when done | cubic-bezier(.55,0,.8,.3) |
| 100–300 | Every rail packshot except the flyer fades to 0 | linear |
| 60–1010 | Glide: T's packshot is moved out of the rail into the hero itself (its own layer, so the rail refill cannot cut the flight short). It translates from its rail slot to the torso while scaling up, one transform animation of 950 ms. The end transform puts its box centre at (ox + 1012·ps, oy + 710·ps), scaled by k = (0.86 · 600 · ps)/(760 · s), so it lands slightly smaller and lower than the worn jacket and never covers the face. Transform-origin is the centre, z-index 4 | cubic-bezier(.22,.9,.3,1): fast start, long soft landing |
| 60–1070 | Flyer opacity, a separate 1010 ms animation with keyframes 1 → 1 at 0.45 → 0.6 at 0.72 → 0. It is removed when this finishes. If the packshot was not in the rail (going backwards), it is created at slot 0 and its keyframes start at 0, reaching 1 at 0.18 | ease-in-out |
| 350–800 | New title and new price spans translate from Y 105% to 0 inside their masks | cubic-bezier(.22,.61,.36,1) |
| 420–1180 | Wear plate T fades from opacity 0 to 1 on top of A. When it finishes, A loses class "on" | cubic-bezier(.45,0,.25,1) |
| 600 | The rail is rebuilt with T+1 in slot 0 and T+2 in slot 1. Each new packshot enters from 45u to the right of its slot at opacity 0, reaching its slot at opacity 1 over 350 ms. The active pagination dash moves to T. The cart pill's thumbnail, name, sub-label and price fade to 0 over 150 ms, are swapped, then fade back to 1 | cubic-bezier(.22,.61,.36,1) |
| 1200 | The swap is complete. If another swap was requested during this one, it runs now; otherwise the autoplay timer restarts | — |

The motion copies the reference video: the next jacket travels from the rail and settles softly onto the model while the worn jacket changes underneath it, and the title rolls up behind a mask.

## 8. Triggers, scroll and autoplay

- Autoplay loop: after the loading reveal (at 600 ms), schedule the next product (active+1, wrapping 3 to 0) after a 2000 ms hold. Each swap restarts the hold when it finishes, so the jackets cycle about every 3.2 s forever.
- Scroll (desktop): listen for wheel events on the window with passive false and call preventDefault (the page never scrolls). Scrolling down goes to the next jacket and scrolling up to the previous one. Every scroll counts:
  - Convert the delta to pixels: deltaMode 1 × 16, deltaMode 2 × the viewport height.
  - Add it to an accumulator, which resets when the direction changes or after 250 ms without wheel events.
  - When the accumulator reaches ±50 px and at least 140 ms have passed since the last step, take one step in that direction and reset the accumulator. One mouse-wheel notch (100 px) is therefore always one jacket, and the 140 ms gap stops trackpad momentum from racing through the rail.
- Stepping: step(dir) moves one jacket from wherever the page is heading. If a swap is running, the base is the queued target rather than the current one. A request made during a running swap replaces the queue with that target (or clears it if the target equals the current jacket), and runs when the swap finishes. Rapid scrolls therefore all register: five quick notches down land five jackets along.
- Touch: a pointer movement of more than 40 px on release counts as a swipe. A mainly horizontal swipe goes next (left) or previous (right). A mainly vertical touch swipe goes next (finger up, like scrolling down) or previous (finger down). The hero has touch-action: none.
- Click a rail packshot: swap to that product. Clicks that end a drag are ignored.
- Keys: ArrowRight, ArrowDown and PageDown go next. ArrowLeft, ArrowUp and PageUp go back.
- User control: any scroll, swipe, drag, key press or rail click sets a 6000 ms user hold. Autoplay waits until 6 s after the last user input before moving on, so it never undoes a scroll back.
- Pausing the loop (the visitor can stop it):
  - While a mouse pointer is over a packshot, the cart pill or the Shop Now button. It resumes when the pointer leaves those elements or leaves the window.
  - While a pointer is pressed on the hero (dragging or touching).
  - While the tab is hidden, using visibilitychange.

## 9. Loading reveal

A fixed grid of tiles covers the whole viewport at z-index 20, coloured nav (#F5F7F8). It has 10 columns × 6 rows on desktop and 5 × 9 on phones. The tile order is shuffled with Fisher–Yates. Over 600 ms, tiles are hidden instantly (no fade) in that order, so tile n is hidden once elapsed/600 × count ≥ n. The overlay is removed when all tiles are hidden, with a 1000 ms safety removal. The reveal starts when the base plate and wear plate 0 have decoded, or after a 1800 ms failsafe.

## 10. Phone layout (below 820 px)

`--u = 100vw/390`. The nav is 52 px tall with 16 px padding. "Collections" is 14 px, the wordmark 19 px, the icons 21 px with a gap of 20 px, and the badge 15 px.

Copy: left 20 px, right 20 px, top 76 px.
- Eyebrow 10.5 px.
- Title clamp(34px, 10vw, 44px) with margin-top 12 px.
- Price 19 px with margin-top 8 px.
- Shop Now 38 px tall, padding 0 16 px, 13.5 px text.

The stage runs from 8 px below the bottom of the Shop Now button to vh − 82 px. The plates are scaled with ps = min(stageHeight/1080, 0.64·vw/600) and placed so the garment centre (plate x 1012) sits at 39% of the viewport width, with oy = stageTop − 120·ps. The plate container gets a soft mask: the intersection of two linear gradients, horizontal and vertical, each transparent → black at 9% → black at 91% → transparent. The plate edges dissolve into the matching bg colour with no seams.

The rail packshot scale is s = 0.29·ps. Slot 0 is at vw − 102u and slot 1 at vw − 10u (only a sliver shows). The rail centre is at stageTop + 0.40·stageHeight, and the dashes sit 500·s below it. The dashes are 2 px tall, idle 5 px, active 18 px, with a gap of 4 px.

Cart pill: left and right 12 px, bottom 12 px plus the safe-area inset, height 58 px, radius 12 px.
- Thumbnail 40 px.
- Name 12 px and sub-label 11 px.
- Price 13 px.
- Button 40 px tall, padding 0 13 px, 13 px text, radius 8 px.

"Drag to explore" and the right-edge indicator are hidden. Swiping the stage swaps, and touching it holds the autoplay.

On short phones in landscape (below 820 px wide and below 520 px tall): copy top 64 px, title 28 px, price 16 px, Shop Now 34 px tall.

On screens 820 px and wider, including landscape phones, the desktop layout applies. The nav values use the max() floors above so the bar never collapses.

## 11. Reduced motion

With prefers-reduced-motion: reduce, there are no tiles and no autoplay. Swaps triggered by click, swipe or keys are instant: the plate class switches, the title and price text are replaced, the rail is rebuilt and the pill updates, with no animation.

## 12. Acceptance checklist

- At 1440×900 the title spans x 42–366, the cart pill x 483–957 / y 788–848, the first packshot sits at x 1047, and the wordmark is centred and about 106 px wide.
- On load the tiles clear in about 0.6 s in random order, then the puffer is shown.
- After a 2 s hold, the fleece glides from the rail onto the model while the tee shows briefly, the title rolls to "Ridge Fleece", the rail refills from the right, and the pill shows "RIDGE FLEECE JACKET · Sage · $148.00". The order then loops through Drift Shell, Harbor Parka and back to Alpine Puffer.
- Hovering a packshot or the pill stops the loop, and leaving restarts it. Click, drag and the arrow keys all work.
- Each scroll notch moves exactly one jacket (down forward, up back), five rapid notches move five, and autoplay then waits 6 s.
- During a swap the tee never shows, and the incoming packshot glides onto the torso and dissolves into the worn jacket over about 1.2 s.
- The phone at 390×844 shows no seams and no horizontal scroll.
- All images load from images.higgs.ai and both fonts render.