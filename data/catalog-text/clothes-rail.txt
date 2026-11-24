# HINA — Little Wardrobe: interactive garment-rail hero

Build a single-page, full-screen hero for a fictional children's clothing label called **HINA**. The page is one quiet studio wall with a steep diagonal clothes rail running from the top-left corner down towards the centre-right. Twelve small garments hang on it; the first one hangs large at the front-left, the other eleven hang behind it on the rail at full width, each one tucked behind the piece in front so that only its right-hand side shows, and they get smaller as they recede. A thin, very airy info column sits on the right. Visitors browse the rail (wheel, arrow keys, arrow buttons, swipe), hover a piece on the rail to see it pulled out like someone lifting a hanger to look at it, click a rail piece to bring it to the front, and click the front piece to open a detail view in which the rest of the rail closes up into a soft blurred stack behind it while a detail panel with three photo tabs slides in. Everything must feel calm, soft and premium — pastel, thin type, very wide letter-spacing, slow eased motion. Use a single HTML file with inline CSS and inline JavaScript, no frameworks, no build step.

## 1. Assets (use these exact URLs)

All images are loaded straight from their Higgsfield result links through the images.higgs.ai proxy, which converts them to WebP. Build each proxied URL as: `https://images.higgs.ai/?default=1&output=webp&url=` + the URL-encoded result link + `&w=<width>&q=85`. Do not download, crop or re-host any of them; every piece is shown with CSS background-size and background-position crops of the sheets below.

| Asset | Result link (encode it into the proxy URL) | Proxy width | Native size | What it is |
|---|---|---|---|---|
| Garment sprite sheet (transparent) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_121624_09fa35c4-680e-46a5-b6a9-8acd429bce67.png | 3312 | 3312 × 2480 | A 4 × 3 grid of twelve children's garments, each on a small natural-wood hanger with a silver hook, background removed (true alpha). Used for every rail piece and for the "On hanger" tab of pieces 2–12. |
| Smock-dress detail sheet | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_121448_68442996-20c3-4f65-8f3d-56d2b6df8152.png | 2048 | 2048 × 2048 | A 2 × 2 grid of photos of piece 1 (the periwinkle smock dress): top-left back view on its hanger, top-right smocking close-up, bottom-left fabric weave macro, bottom-right a flat lay (unused). Cells are about 1007 px with ~34 px white gutters; cell origins are (0,0), (1041,0), (0,1041), (1041,1041). |
| Fabric close-up sheet | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_132947_dc18692c-66e4-447b-a11e-167b3bcadefb.png | 3312 | 3312 × 2480 | A 4 × 3 grid of square fabric macros, one per piece, in the same order as the sprite sheet. Column x-ranges: 0–805, 836–1638, 1668–2476, 2506–3311. Row y-ranges: 0–803, 834–1633, 1664–2479. |
| Detail close-up sheet | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_132948_27322be0-e8d1-436a-a229-09ef6371cb98.png | 3312 | 3312 × 2480 | A 4 × 3 grid of square detail close-ups (collars, buttons, frills, straps, smocking), one per piece, same order. Column x-ranges: 0–811, 842–1640, 1671–2470, 2501–3311. Row y-ranges: 0–804, 835–1635, 1668–2479. |

**Sprite boxes on the garment sheet** (x, y, width, height of the visible garment including its hook, plus the x of the hook stem). Pieces are numbered in reading order, left to right, top to bottom.

| # | Piece | x | y | w | h | hook x |
|---|---|---|---|---|---|---|
| 1 | Smock dress (periwinkle, Peter Pan collar) | 120 | 54 | 560 | 742 | 404 |
| 2 | Muslin dress (white, flutter sleeves) | 982 | 56 | 508 | 708 | 1244 |
| 3 | Pointelle cardigan (blush) | 1792 | 62 | 558 | 588 | 2067 |
| 4 | Denim dungaree dress (periwinkle wash) | 2638 | 54 | 514 | 726 | 2893 |
| 5 | Ruffle blouse (lilac grey) | 110 | 865 | 596 | 652 | 406 |
| 6 | Broderie smock (white) | 938 | 869 | 610 | 650 | 1234 |
| 7 | Linen pinafore (blush) | 1844 | 855 | 456 | 718 | 2067 |
| 8 | Soft knit jumper (periwinkle) | 2614 | 861 | 570 | 630 | 2895 |
| 9 | Frill dress (white) | 112 | 1661 | 592 | 712 | 407 |
| 10 | Pocket pinafore (lilac grey) | 996 | 1661 | 492 | 716 | 1237 |
| 11 | Gingham dress (blush / cream) | 1832 | 1663 | 478 | 714 | 2067 |
| 12 | Quilted vest (pale periwinkle) | 2682 | 1673 | 434 | 630 | 2894 |

## 2. Font

One family only: **Noto Sans** (Google Fonts, https://fonts.google.com/specimen/Noto+Sans), the latin variable WOFF2 file covering weights 100–900: https://fonts.gstatic.com/s/notosans/v42/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5a7duw.woff2 . Declare it with @font-face (font-weight 100 900, font-display swap) and use it for everything with a system-ui fallback. Weights used: 300 for the logo and the product title, 400 for everything else. Turn on antialiased font smoothing. Almost all text is uppercase with very wide letter-spacing; only the product description and the panel caption are sentence case.

## 3. Head, colours and global rules

- Title "HINA — Little Wardrobe"; meta description "HINA little wardrobe: an interactive rail of soft children's clothing."; an empty data: favicon; viewport width=device-width, initial-scale=1.
- A tiny inline script in the head adds the class `pre` to the html element unless the visitor prefers reduced motion (this hides elements before the entrance animation).
- Colour tokens: wall #ECE6EB, ink #32333F (all main text and lines), muted #6A6B80 (secondary text), value #7173A6 (the spec values, a soft periwinkle-grey), periwinkle accent #9D9FE4, blush accent #E9ACA9. Main easing curve: cubic-bezier(.2,.75,.2,1).
- box-sizing border-box everywhere, no margins; html and body full height; body background is the wall colour and on desktop the body does not scroll (overflow hidden). Buttons inherit font and colour with no background or border.

## 4. Background wall

A fixed full-viewport layer behind everything. Two stacked backgrounds: a radial highlight (70 % × 80 % ellipse centred at 80 % / 40 %) going from #F1EBEF to transparent at 70 %, over a horizontal linear gradient #DED7DD (0 %) → #E6E0E5 (30 %) → #ECE6EB (60 %) → #EFE9ED (100 %). The effect is a soft lilac-grey studio wall that is slightly darker on the left and lightest just right of centre. There are no props, no floor and no other scenery.

## 5. Scaling system

All hero content (rail, garments and info UI) lives in one fixed **1440 × 900 px frame**, absolutely positioned at 50 % / 50 % of a fixed full-viewport stage with transform-origin top-left. Every coordinate in this brief is in frame pixels. On screens wider than 820 px the frame is scaled by `min(max(vw/1440, vh/900), vh/870, vw/1380)` and translated by −720 × scale and −450 × scale, so it covers the viewport but never crops the UI at the edges on unusual aspect ratios. The nav is not inside the frame: it is pinned to the viewport edges with its own unit `--ns` = max(0.62, min(1, vw/1440)), by which its font size, offsets, gaps and the burger width are all multiplied. Recompute both on resize.

## 6. Top navigation (fixed, viewport edges)

Height 42 px × ns, z-index above everything except the frame UI; 10.5 px × ns, letter-spacing 0.19em, ink colour.
- Left: the wordmark "HINA" at left 57 px × ns, top 9 px × ns, 24 px × ns, weight 300, letter-spacing 0.56em, line-height 1. It is a link to "/".
- Centre (horizontally centred, top 14 px × ns): four links CLOTHING, ACCESSORY, JOURNAL, ABOUT, with 35 px × ns between them. CLOTHING is active, with a 1 px ink underline 2 px below the text (stopping 0.2em short of the right end). Only CLOTHING has an href; the others are plain labels.
- Right (right 54 px × ns, top 14 px × ns): "SEARCH", then 34 px × ns gap, "MENU" followed 21 px × ns later by a three-line burger icon (25 px × ns wide, three 1 px ink lines at 0, 6 and 12 px).
- No buttons, pills, CTAs or extra items.

## 7. The rail (inside the frame)

**Rail line.** The rail is a straight line through frame space with y = 5 + 0.641 × (x − 330). Draw it as an SVG polygon in a 1440 × 900 viewBox, behind the garments: a tapered tube from x = 250 to x = 1062, 18 px thick at the left end (railY − 9 to railY + 9) narrowing to about 5.4 px at the right end (railY − 2.6 to railY + 2.8, with the bottom-right corner at x 1065). Fill it with a vertical gradient #FFFFFF → #F3F1F5 (55 %) → #C9C5D0, so it reads as a white powder-coated tube catching light from above. It runs off the top-left corner of the frame.

**Garment elements.** Create twelve absolutely positioned divs, one per piece, each sized to its sprite box (w × h), with the garment sheet as a non-repeating background at its native size (3312 × 2480 px) shifted by (−x, −y). Set each element's transform-origin to (hookX − x, 0), i.e. the top of its hook, so every scale and rotation pivots on the hook. Transitions on each piece: transform 0.55 s with the main easing curve, opacity 0.35 s ease, filter 0.55 s ease. Pieces never receive pointer events; all hit-testing is done mathematically (section 10).

**Slots.** The piece currently shown is "cur"; each piece's slot is (index − cur) mod 12, so slot 0 is the front and slots 1–11 run back along the rail. The hook x of each slot is: 352, 440, 505, 565, 620, 670, 716, 758, 796, 831, 863, 893. Fractional and negative slots interpolate linearly (a negative slot is 352 + slot × 120). The z-index is 100 − slot, so nearer pieces cover farther ones.

**Scale.** The front piece is drawn at scale 0.93. A piece behind is scaled by the hook x through this piecewise-linear table: 352 → 0.94, 435 → 0.905, 545 → 0.83, 670 → 0.70, 778 → 0.57, 878 → 0.445, 958 → 0.33, 1045 → 0.19. Scaling is uniform: never squash or skew a garment horizontally.

**Placement.** For a piece at slot j with hook x X and scale S: translate it to (X − (hookX − x) + dx, railY(X) − 9 × S + dy), then rotate(rot), then scale(S). dx, dy and rot are 0 except during the hover pull-out. The hook therefore sits just on top of the rail, and each garment hangs at full width from it. Because the pieces are drawn at full width and overlap, the viewer sees the whole front piece (its left sleeve near x 100 and its hem around y 700) and only the right-hand sides and hems of the pieces behind, getting smaller up to about x 1000. Their hems may hang slightly below the front piece's hem.

**Floor shadow.** A 600 × 60 px ellipse (radial gradient rgba(70,60,90,.14) fading to transparent) placed behind all pieces at x 52 and y = railY(352) + frontSpriteHeight × 0.93 − 26, so it sits under the front garment's hem.

## 8. Right-hand info column (desktop)

Absolutely positioned at left 1118, top 198, width 310 px. From top to bottom:
1. Counter "01 / 12": 11 px, letter-spacing 0.18em, muted, 18 px tall.
2. Product title in two lines (for example "SMOCK" / "DRESS"): 28 px below, 31 px, weight 300, letter-spacing 0.14em, line-height 35 px, minimum height 70 px, no wrapping.
3. A short rule: 36 px below, 20 × 1 px, muted at 70 % opacity.
4. Description in two lines: 24 px below, 13 px, letter-spacing 0.088em, line-height 24 px, muted, 300 px wide (for example "Soft brushed cotton with hand" / "smocking. Made for play and naps.").
5. Spec list: 54 px below, 10 px, letter-spacing 0.16em, line-height 27 px. Three rows with no wrapping: label column 117 px wide in ink (MATERIAL, COLOUR, SIZE), value in #7173A6 with letter-spacing 0.14em.
6. "VIEW DETAILS" button: 50 px below, 11 px, letter-spacing 0.2em, 7 px bottom padding and a 1 px ink underline, followed 14 px later by a 10 × 10 thin diagonal arrow icon (an up-right arrow, 1 px stroke).

**Pager** at left 1118, top 752, 270 px wide, spread with space-between: a thin left arrow (a 36 × 12 svg with a 1 px line and open arrowhead, at 55 % opacity), the counter "01 / 12" (11 px, 0.18em), and a matching right arrow. The buttons are 38 × 24 px.

**Left index** at left 40, top 250 (10 px, letter-spacing 0.18em, muted): the current number "01"; then 12 px below a 1 × 77 px track (ink at 18 %) with a solid ink fill that scales from the top to (current / 12) with the main easing over 0.55 s; then 19 px below it "12".

**Footer** at left 53, top 866: "HINA · LITTLE WARDROBE | 07", 10 px, letter-spacing 0.225em, muted.

**Hint** at left 723, top 866: "CLICK TO PEEK", a 20 × 10 double-headed thin arrow with 14 px margins, then "CLICK AGAIN TO FOLLOW", 9.2 px, letter-spacing 0.2em, muted.

The whole UI layer sits above the garments (z-index 300) but lets clicks pass through except on its own children.

## 9. Product data (12 pieces, in sprite order)

| # | Title line 1 | Title line 2 | Description line 1 | Description line 2 | Material | Colour | Size |
|---|---|---|---|---|---|---|---|
| 1 | SMOCK | DRESS | Soft brushed cotton with hand | smocking. Made for play and naps. | ORGANIC COTTON | PERIWINKLE / BLUSH / CLOUD | 2Y / 4Y / 6Y |
| 2 | MUSLIN | DRESS | Airy double gauze with little | flutter sleeves for warm days. | COTTON MUSLIN | CLOUD WHITE | 2Y / 4Y / 6Y |
| 3 | POINTELLE | CARDIGAN | Fine pointelle knit with wooden | buttons. Light and easy to layer. | COTTON KNIT | BLUSH | 1Y / 2Y / 4Y |
| 4 | DENIM | DUNGAREE | Washed soft denim with a full | skirt and adjustable straps. | COTTON DENIM | PERIWINKLE WASH | 2Y / 4Y / 6Y |
| 5 | RUFFLE | BLOUSE | Crinkled cotton with a wide | ruffle collar and puff sleeves. | COTTON CRINKLE | LILAC GREY | 2Y / 4Y / 6Y |
| 6 | BRODERIE | SMOCK | Broderie anglaise with frilled | shoulders and a roomy cut. | COTTON BRODERIE | CLOUD WHITE | 2Y / 4Y / 6Y |
| 7 | LINEN | PINAFORE | Washed linen with button straps | and two deep patch pockets. | LINEN 100% | BLUSH | 2Y / 4Y / 6Y |
| 8 | SOFT KNIT | JUMPER | Open-stitch cotton knit with a | gentle, easy round neck. | COTTON KNIT | PERIWINKLE | 1Y / 2Y / 4Y |
| 9 | FRILL | DRESS | Pintucked cotton with frilled | shoulders and elastic cuffs. | ORGANIC COTTON | CLOUD WHITE | 2Y / 4Y / 6Y |
| 10 | POCKET | PINAFORE | Soft twill with frilled straps | and pockets for small treasures. | COTTON TWILL | LILAC GREY | 2Y / 4Y / 6Y |
| 11 | GINGHAM | DRESS | Smocked gingham with short | puff sleeves for sunny days. | COTTON GINGHAM | BLUSH / CREAM | 2Y / 4Y / 6Y |
| 12 | QUILTED | VEST | Lightly quilted with wooden | buttons. Warm, never bulky. | COTTON QUILT | PALE PERIWINKLE | 1Y / 2Y / 4Y |

## 10. Interactions

**Browsing (next).** Triggered by a mouse wheel (deltaY + deltaX accumulated; one step each time the total passes ±40, desktop only, and the page's own scrolling is prevented), the Right or Down arrow keys, the right pager arrow, or a left swipe of more than 36 px on touch. Steps are throttled to one every 95 ms, so a fast wheel flick runs through several pieces quickly, like flicking hangers. On a step forward:
- the front piece moves to slot −1.3 (back up the rail to the upper left, about 156 px left of the front hook) and fades to opacity 0, using its normal transitions;
- every other piece moves one slot forward with the 0.55 s eased transform, growing as it comes forward, and the new front piece lands at scale 0.93;
- after 360 ms the old front piece is jumped, with transitions switched off for one frame, to the last slot at the far end of the rail, then fades back in there;
- the hover pull-out is cleared.

**Browsing (previous).** Left or Up arrow keys, the left pager arrow, or a right swipe. The piece in the last slot is jumped invisibly to slot −1.3 with a z-index above everything, then on the next frame everything is laid out again: that piece slides down the rail into the front slot while fading in, and the others step back one slot.

**Text swap.** On every step all changing texts (counter, both title lines, both description lines, the three spec values, the pager counter) fade out with a 5 px downward shift (opacity 0.22 s, transform 0.32 s eased). After 140 ms they are replaced and fade back up. The left index number and the index fill update at the same time.

**Hover pull-out (mouse only).** Track mousemove over the stage and convert the pointer into frame coordinates (subtract the frame's on-screen left/top and divide by the frame scale). For each piece compute its span: left = hookX − (hookX − x) × S, right = hookX + (x + w − hookX) × S, top = railY(hookX) − 9 × S, bottom = top + h × S. The pointer is on the front piece if it lies between its left + 30 and right − 20 and between its top + 60 and bottom. Otherwise walk the slots from 1 to 11 and take the first piece whose right − 6 is at or past the pointer's x; that piece is hovered only if the pointer is between its top + 40 and bottom − 10 and to the right of the front piece's right − 20. The hovered rail piece is drawn pulled out: dx = 38 × S, dy = +6 px, rotate −6° (its hem swings out to the right around the hook) and scale × 1.035. Every piece behind it shifts right by 18 × its scale to make room, and the pieces in front stay still. All of this animates with the normal 0.55 s eased transitions, and moving off the pieces (or leaving the stage) settles everything back. The cursor becomes a pointer over the front piece or a hoverable rail piece. Nothing happens while the detail view is open, or on devices without hover.

**Click a rail piece ("click again to follow").** Show the pull-out on that piece (this is what a tap shows on touch screens), then after 260 ms step forward as many times as its slot number, 120 ms apart, so the rail runs and that piece arrives at the front.

**Click the front piece, or VIEW DETAILS: the detail view.** Add the class `detail` to the body. For 0.76 s every piece uses slower transitions (transform 0.7 s cubic-bezier(.65,0,.25,1), opacity 0.55 s, filter 0.55 s), then goes back to normal.
- The front piece does not move.
- The rail closes up behind it. Every piece behind is re-placed with its rail x compressed to 352 + (x − 352) × 0.36, scaled for that new x, and drawn at opacity 0.62 with filter blur(7px) saturate(.55) brightness(1.04). The result is a soft, blurred, faded wedge of garments hugging the right side of the front piece and receding up along the rail. Nothing flies away or disappears.
- The rail tube is clipped from the right (clip-path inset(0 46% 0 0), 0.7 s same curve), so it ends just behind the wedge.
- The info column and the pager slide 328 px left (0.75 s cubic-bezier(.65,0,.2,1)), and the pager widens to 596 px so its arrows sit at x 790 and about 1386 with the counter centred between them.
- After a 0.32 s delay the detail panel fades in from 46 px to the right (opacity 0.45 s ease, transform 0.7 s eased).
- Clicking the front piece again, the BACK TO COLLECTION button or pressing Escape reverses all of it. Browsing still works while the detail view is open: the front piece changes and the stack stays blurred.

**Detail panel** at left 1098, top 118, 292 × 700 px:
- "BACK TO COLLECTION" with a 9 × 9 thin × icon, top-right, 9.5 px, letter-spacing 0.2em, with a 12 px gap before the icon.
- At top 52 (spanning the width minus 22 px): the tab name on the left (for example "ON HANGER") and "01 / 03" on the right, 9.5 px, letter-spacing 0.2em, muted.
- At top 80, three equal tab buttons, 8.5 px, letter-spacing 0.16em, muted, with a 1 px ink line at 14 % along the bottom: "01 / ON HANGER", "02 / FABRIC", "03 / DETAIL". The active tab is in ink with a 1 px ink underline that stops 14 px short of the tab's right edge.
- At top 110, a 270 × 470 px image box (full width minus 22 px) with background #F0EAF0 and hidden overflow, holding three stacked layers that cross-fade (opacity 0.45 s). The active layer also settles from scale 1.03 to 1 over 0.9 s.
- A caption at top 596, 11 px, letter-spacing 0.06em, line-height 20 px, muted: "Hung on a little wooden hanger." / "Soft to the touch, washed for comfort." / "Small touches, sewn to last." for the three tabs.
- A 1 × 520 px scroll track at the far right (from top 80, ink at 12 %) with a 3 × 120 px rounded thumb (ink at 45 %) that slides to top 0 / 200 / 400 for tabs 1 / 2 / 3 (0.5 s eased).
- Opening the panel always resets it to tab 1.

**What each tab shows:**
- Piece 1, ON HANGER: the back-view cell of the smock-dress detail sheet, fitted to the box width (scale = boxWidth / 990), and the layer itself is sized to that cell's height and centred vertically so the neighbouring cell never shows. The box colour matches the photo's background.
- Piece 1, FABRIC and DETAIL: the bottom-left (fabric weave) and top-right (smocking) cells of that sheet, each scaled to cover the box (scale = max(boxW, boxH) / 995), centred, starting 6 px inside the cell to trim the white gutters.
- Pieces 2–12, ON HANGER: the piece's own transparent sprite, contained in 90 % of the box width and 88 % of its height, centred. The layer is sized exactly to the sprite box so no neighbouring garment ever shows.
- Pieces 2–12, FABRIC and DETAIL: that piece's cell (column = index mod 4, row = index div 4) on the fabric and detail close-up sheets, inset 6 px from the measured gutters, scaled to cover the box and centred.
- Recompute all of these when the panel opens, when the front piece changes, and on resize while the panel is open (the box size differs on phones).

## 11. Opening animation (one Web Animations timeline, runs once)

While the html element has the class `pre`, the garments, tube, nav, index, footer, hint, pager, rule and VIEW DETAILS are hidden, and every text line inside a reveal wrapper sits 105 % below its overflow-hidden mask. On load the script removes `pre` and runs these animations with fill backwards and easing cubic-bezier(.2,.75,.2,1). A 4-second failsafe removes `pre` regardless. With reduced motion none of it runs and everything shows at once.

| Element | Keyframes | Duration | Delay |
|---|---|---|---|
| Rail tube | opacity 0 → 1 and clip-path inset(0 100% 0 0) → inset(0) (it draws in from the left) | 1000 ms | 100 ms |
| Nav | opacity 0 → 1 | 900 ms | 200 ms |
| Each garment, front first | opacity 0 → 1 while dropping from 14 px above (CSS translate) | 900 ms | 250 ms + slot × 35 ms |
| Text lines (counter, title 1, title 2, description 1, description 2, the three spec rows), in order | translateY(105%) and opacity 0 → in place, opacity 1 (a line-by-line reveal) | 1000 ms | from 650 ms, +70 ms per line |
| Index, rule, VIEW DETAILS, pager, footer, hint, in order | opacity 0 → 1 | 900 ms | from 900 ms, +70 ms each |

## 12. Phone and small screens (≤ 820 px)

- The body scrolls. The stage becomes a normal block 64vh tall (minimum 430 px) showing a cropped view of the same frame: the frame scale is stageHeight / 780 and it is shifted so the front piece and the first few rail pieces fill the width (x = min(0, max(vw − 1100 × scale, (vw − 760 × scale)/2 − 40 × scale)), y = −stageHeight/2 − 20 × scale with the frame's top at 50 %).
- The nav is absolute and 52 px tall. The wordmark sits at 18 / 16 px, 19 px, letter-spacing 0.5em. The centre links and SEARCH are hidden; MENU and the burger sit at right 18, top 20.
- The left index, footer and hint are hidden. The info column, pager and detail panel are moved by script into a section below the stage (padding 8 / 22 / 40 px) and flow normally there: title 26 px with line-height 30 px; tighter gaps (title 14, rule 18, description 18, specs 24, button 26, pager 34 px); the pager spans the full width.
- In the detail view the panel opens below the pager (34 px gap) at full width, with its image box at a 4 : 5 aspect ratio, and the page smooth-scrolls to it. The scroll track is hidden.
- On touch, swiping left or right on the stage browses, and tapping the front piece toggles the detail view. A tap on a rail piece shows its pull-out, then brings it to the front.
- When the script moves those blocks back on resize to desktop, they return into the frame UI in their original order. Nothing may cause sideways scrolling at any width (check 390, 768 and 844 × 390 landscape).

## 13. Reduced motion

With prefers-reduced-motion: reduce, all CSS transitions and animations are switched off (every state change is instant), the entrance timeline is skipped, and the phone scroll to the panel is instant.

## 14. Acceptance checklist

- At 1440 × 900 the front smock dress fills the left 40 % of the screen. The diagonal white rail runs from the top-left corner to about (1062, 470). Eleven garments hang behind at full width, never squashed, showing only their right sides and shrinking into the distance. The info column reads 01 / 12, SMOCK DRESS, etc., in thin wide-tracked caps.
- The wheel, arrow keys and arrows each move one piece: the front piece slides off up the rail and fades, and the next glides forward and grows. Fast wheel flicks run through several pieces.
- Hovering a rail piece pulls it out with a small outward swing while the pieces behind make room. Clicking it runs the rail until it is at the front.
- Clicking the front piece leaves it in place, closes the rail into a blurred, faded stack right behind it, shortens the rail, slides the text left and fades in the panel. All three tabs show sharp photos of that exact piece, with no neighbouring images visible. Clicking again, Back or Escape restores the rail.
- No horizontal scroll on phones, and the phone detail panel is reachable by scroll.
- No console errors. All four images load from images.higgs.ai, and the font loads.