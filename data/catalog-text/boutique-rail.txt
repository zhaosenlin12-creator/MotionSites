# Maison Verrel — "The Rail" boutique hero: exact recreation prompt

Build a single-file, one-screen luxury fashion storefront hero called **Maison Verrel**. The whole screen is a calm warm-ivory studio. A thin gold clothing rail curves across the full width like a shallow smile, and twenty garments (tailored blazers, belted trench coats, silk slip dresses and a satin gown in ivory, champagne, black, oxblood and taupe) hang from it side-on on dark wooden hangers, each with a small cream price tag. The rail scrolls sideways with inertia and the clothes swing on their hooks. Hovering a piece turns it to face you. Clicking it opens a full-screen quick-view with a size picker and an Add to cart button. Adding to cart shrinks the garment into the bag icon in the nav, and the bag opens a cart drawer that slides in from the right. Everything below is the exact specification: reproduce it pixel for pixel.

Use plain HTML, CSS and vanilla JavaScript in one file. No frameworks, no libraries, no build step. The page never scrolls vertically (`overflow: hidden` on html and body); the rail is the only thing that moves sideways.

---

## 1. Assets (use these exact URLs)

All garment imagery comes from three transparent PNG product sheets. Each sheet is a 4-column × 2-row grid of the same eight garments, 1360 × 2048 px, every cell 340 × 1024 px, every garment hanging from a slim dark-brown wooden hanger with a thin brass hook. Load every sheet through the images.higgs.ai proxy, which returns a WebP that keeps the alpha channel:

`https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded source>&w=1360&q=85`

| Sheet | View | Source URL (URL-encode it into the proxy link) |
|---|---|---|
| side | strict side profile, edge-on | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115504_3ab92758-5854-4a1c-85db-ff8efd929e86.png |
| front | straight-on front view | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115743_54dc8c72-0be0-4858-bd0c-10ecb399c16c.png |
| back | straight-on back view | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115613_7d45aea6-1bea-41ff-b878-72d7c8bcb9da.png |

Add `<link rel="preconnect" href="https://images.higgs.ai">` in the head. Preload all three sheets as `Image()` objects as soon as the script runs, and keep a promise per sheet that resolves once the image has loaded and decoded.

### Garment index (cell order, same in all three sheets)

| k | Cell | Name shown in the UI |
|---|---|---|
| 0 | row 1, col 1 | Noir Tailored Blazer (black single-breasted blazer) |
| 1 | row 1, col 2 | Ivory Belted Trench (long ivory trench) |
| 2 | row 1, col 3 | Oxblood Silk Slip (ankle-length slip, thin straps) |
| 3 | row 1, col 4 | Taupe Wool Blazer |
| 4 | row 2, col 1 | Champagne Bias Slip (ankle length) |
| 5 | row 2, col 2 | Pearl Silk Slip (ivory slip) |
| 6 | row 2, col 3 | Taupe Belted Trench |
| 7 | row 2, col 4 | Oxblood Satin Gown (floor length, fuller skirt) |

Every piece costs **$690** (tags read "$690"; the UI shows "$690.00").

### Crop table (measured on the sheets, in sheet pixels)

Each crop starts exactly at the hanger's hook tip, so a garment can be positioned by its hook. For view `v` and garment `k` the table gives `[y, h, hookX]`. The crop rectangle is x = hookX − 170, y = y, width = 340, height = h + 6.

| k | side [y, h, hookX] | front [y, h, hookX] | back [y, h, hookX] |
|---|---|---|---|
| 0 | 44, 619, 185 | 79, 552, 175 | 76, 515, 176 |
| 1 | 45, 860, 514 | 76, 900, 511 | 60, 890, 508 |
| 2 | 45, 876, 834 | 76, 913, 848 | 60, 901, 845 |
| 3 | 45, 606, 1169 | 80, 550, 1179 | 76, 520, 1180 |
| 4 | 1024, 937, 177 | 1024, 936, 177 | 1026, 931, 175 |
| 5 | 1024, 936, 511 | 1024, 940, 513 | 1026, 929, 508 |
| 6 | 1024, 907, 825 | 1024, 894, 851 | 1024, 901, 845 |
| 7 | 1024, 962, 1166 | 1024, 938, 1185 | 1024, 934, 1184 |

**How a crop is painted at scale `s` (px per sheet px):** a div ("face") of width 340·s and height (h+6)·s, `left: −170·s` (so its horizontal centre sits on the hook), `top: 0`, `background-image` = the sheet, `background-size: (1360·s)px auto`, `background-position: (−(hookX−170)·s)px (−y·s)px`, `background-repeat: no-repeat`. Never cut or re-host the images: every garment, thumbnail and quick-view image is a CSS crop of these three sheets.

### Fonts

| Family | Weights | Source |
|---|---|---|
| Inter (variable) | 100–900 (uses 400, 500, 600, 700) | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 (latin subset; Google Fonts CSS: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap) |
| Cormorant Garamond | 500 | https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06KnTOig.woff2 (Google Fonts CSS: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap) |

Declare both with `@font-face` (Inter with `font-weight: 100 900`), `font-display: swap`. Body font: `"Inter", system-ui, sans-serif`, with `-webkit-font-smoothing: antialiased`. Cormorant Garamond is used only for the wordmark.

---

## 2. Head, tokens and the scaling unit

- `<html lang="en" class="is-loading">`, title "Maison Verrel — The Rail", viewport `width=device-width, initial-scale=1, viewport-fit=cover`.
- Colour tokens: background `#FAF7F2`, utility bar `#EFEBE4`, ink `#1A1716`, muted `#746A5E`, hairline `#DDD5C9`, search pill `#EDE8DF`, tag `#F6F1E7`. Near-black for buttons and badges: `#0E0D0C`.
- **One design unit `--u`** (a px length set by JS). Every size below is written in design px and must be rendered as `calc(N * var(--u))`.
  - Desktop (viewport width > 820): `u = min(innerWidth/1440, innerHeight/900)`. The design frame is 1440 × 900.
  - Phone and tablet (width ≤ 820): `u = min(innerWidth/390, innerHeight/780)`.
  - Recompute on `resize`. If width or height is 0 (a hidden or collapsed frame), skip the layout until the next resize.
- Rail parameters as CSS custom properties read by JS (unitless design px): desktop `--rail-top: 270; --rail-sag: 74; --gap: 121; --gs: .455; --start: 113`; phone `--rail-top: 292; --rail-sag: 30; --gap: 80; --gs: .30; --start: 46`.
- Elements are absolutely positioned and pinned to the edges they belong to: left items use `left`, right items use `right`, centred items use `left: 50%; translate: -50% 0`. Vertical offsets are from the top, and the footer is measured from the bottom.

---

## 3. Structure and desktop layout (1440 × 900 frame)

The DOM is: a `.page` wrapper (`position: fixed; inset: 0`), containing `.stage` (every hero element) and `.qv` (the quick-view layer). After `.page` comes the cart `aside.drawer`.

### Utility bar
Full width, top 0, height 31, background `#EFEBE4`. Right-aligned links with right padding 48: "Our Ateliers", "Care", "Journal", "Sign In", in Inter 13.5, colour `#6B655D`. Between links is a "|" in `#A39C92` with 15 of margin on each side (drawn with `a + a::before`).

### Nav row (top 31, height 72)
- **Wordmark** "MAISON VERREL": Cormorant Garamond 500, size 23.6, letter-spacing 0.075em, line-height 1. Left 47, top 20 inside the nav. It spans x 47–251 on screen.
- **Links** "Home", "Atelier", "The Rail", "Contact": Inter 500, size 15.5, gap 42, centred (`left: 50%; translate: -50% 0`) and nudged left by 8 (`transform: translateX(-8u)`), top 25. On screen they span x 545–879.
- **Tools**, right 64, top 16, in a flex row:
  - Search pill: 150 × 40, radius 20, background `#EDE8DF`, left padding 29, gap 14. Magnifier icon 19 × 19 (circle r 7 at 10.5/10.5 plus a line to the bottom-right, stroke `#2A2420`, width 1.7, round caps), then the word "Search" in Inter 15, colour `#8B857C`.
  - Account icon 22 × 22 (head circle r 4 and a shoulders path, stroke `#1A1716`, 1.6), 26 to the left of it.
  - Bag button 32 further right: bag outline 22 × 22 (trapezoid body plus handle arc, stroke 1.6). Count badge: 18 tall, minimum width 18, fully rounded, `#0E0D0C`, white Inter 600 at 10.5, at left 12 and top −9 relative to the icon. It starts at **3**.

### Eyebrow (top 144, centred)
"NEW COLLECTION" in Inter 600 12.4, tracking 0.18em, colour `#5A5148`. Then a 1 × 13 divider in `#C9C0B3`, then "EVENING & TAILORING" in the same size, colour `#8A7F72`, tracking 0.213em. Gap 17 between parts. On screen: x 535–679, divider ≈ 697, x 715–901.

### Headline (top 176, centred, one line)
"Silhouettes that hang right." in Inter 600, size 62, letter-spacing −0.035em, line-height 1.1. Each word is its own inline-block span with a right margin of 0.24em (none on the last). Word colours fade from ink to light: "Silhouettes" `#141210`, "that" `#54493F`, "hang" `#75675A`, and "right." has a text gradient, `linear-gradient(90deg, #A6968A, #C6B8A9)` clipped to the text. It spans about x 347–1102, with cap-top near y 190 and baseline near y 235.

### The rail
- `.rail-zone`: full width, from top 230 to bottom 120, `touch-action: pan-y`, cursor `grab` (`grabbing` while dragging).
- The rail is an SVG quadratic curve across the full page width, recomputed on every resize. Its centreline is `railY(x) = (railTop + sag · (1 − t²)) · u`, where `t = (x − W/2) / (W/2)` and W is the page width. That gives y 270 at both edges and 344 in the middle on desktop. With y0 = railY(0) and yc = 2·railY(W/2) − y0, the path is `M0 y0 Q W/2 yc W y0`. Draw three strokes in this order, with no fill:
  1. A shadow 4u lower: `rgba(80,60,35,.12)`, width 3u.
  2. The main tube: width 5.2u, stroke a vertical gradient `#E9DCBC` → `#C2A877` (45%) → `#7F6743`.
  3. A highlight 1.3u higher: `rgba(255,247,226,.85)`, width 1.1u.

### Garments on the rail
- Twenty pieces in this order of k: **0, 1, 2, 3, 4, 0, 5, 6, 7, 0, 4, 1, 2, 3, 5, 6, 7, 1, 4, 3**. The first eleven match the mockup's line-up across the screen.
- Hook x of piece i: `x = (start + i·gap)·u − scroll + offset_i`. Hook y: `railY(x) − 3u`, so every hanger sits on the curve and slides along it as the rail scrolls.
- Each piece is nested like this: `.g` (translated to its hook point with `translate3d`) › `.drop` (intro animation) › `.sway` (rotation, origin at the hook, i.e. `transform-origin: 0 0`) › `.lift` (hover scale, origin 0 0, `perspective: 700u`). Inside `.lift` are two faces, side and front, painted at scale `s = gs·u` (0.455u on desktop), plus the price tag. Next to `.drop` is a soft floor shadow and an invisible hit button.
- **Price tag:** 35 × 19, background `#F6F1E7`, radius 2, shadow `0 1u 3u rgba(60,45,30,.18)`, text "$690" in Inter 600 9.6, colour `#2A2420`. A 2.4u hole dot in `#B9AE9C` sits near its top centre. Place it at left −6u and top 52u from the hook. Rotate tag i by the repeating pattern −5, 4, −3, 6, −4, 3, −6, 4, −3, 5 degrees.
- **Shadow:** an ellipse 16u tall and 110·(gs/0.48)u wide, centred under the hook and 4u below the garment's bottom, filled with `radial-gradient(closest-side, rgba(70,52,34,.13), transparent)`.
- **Hit area:** a button `gap·u` wide, centred on the hook, as tall as the side face, with aria-label "<name>, $690".

### Footer (desktop)
- **Left** (left 47, bottom 58, a box 420 × 40): a hint "Hover a piece · click to look closer" in Inter 14.6, colour `#776D63`, preceded by a 27 × 1 rule in `#8E857A` with a gap of 13. A hidden label in the same spot holds two lines: the hovered piece's name (Inter 600) and its price "$690.00", at 13 px in ink.
- **Progress** (centred, bottom 64): a track 140 × 2 in `#DCD4C8`. The thumb is 58% of the track width, ink coloured, with `left = progress × 42%`.
- **Right** (right 48, bottom 46, right-aligned): two lines "Cut from Italian silk and wool." / "Tailored to order. Made to last." in Inter 600 15.6, line-height 1.24, tracking −0.005em. Below them, 14 lower, the link "Shop the Collection" in Inter 500 13.4 with a 15 × 10 arrow (a line plus a chevron, stroke 1.3), a gap of 9, a 1 px ink underline and bottom padding 5.

---

## 4. Interactions (exact behaviour)

### 4.1 Load sequence (runs once)
The `html.is-loading` guard hides the garments, headline words and footer until fonts plus the side and front sheets are ready. A failsafe starts the intro anyway after 2.5 s. When the intro starts, remove the class and run Web Animations:

| Element | From → to | Duration | Delay | Easing |
|---|---|---|---|---|
| Garment `.drop` i (0–19) | translateY(−42u), opacity 0, blur(6px) → none, 1, blur(0) | 620 ms | i × 70 ms | cubic-bezier(.2,.9,.3,1), fill backwards |
| Garment swing impulse | add ±1.6 to the sway velocity, alternating sign by index | — | i × 70 + 420 ms | spring (see 4.2) |
| Headline word j (0–3) | blur(12px), opacity 0, translateY(6u) → sharp, 1, 0 | 820 ms | 60 + j × 110 ms | cubic-bezier(.25,.8,.3,1) |
| Footer left / progress / footer right | opacity 0 → 1 | 420 ms | 600 / 680 / 760 ms | ease-out |

The rail, nav, utility bar and eyebrow are visible from the first frame. So the garments drop onto their hooks one by one from left to right, each with a little pendulum swing, while the headline sharpens word by word out of a blur.

### 4.2 Rail scroll, inertia and sway (one requestAnimationFrame loop)
- State in px: `target`, `cur`, `vel`. `maxScroll = max(0, (2·start + 19·gap)·u − pageWidth)`, and `target` is clamped to [0, maxScroll].
- Every frame (dt = elapsed / 16.667, capped at 3): `cur += (target − cur) · (1 − (1 − 0.085)^dt)`, and `vel = Δcur / dt`.
- **Wheel** anywhere, when the quick-view is closed: `preventDefault()` and add the dominant of deltaX or deltaY × 0.9 to target.
- **Drag** (pointer on the rail zone): it counts as a drag once the pointer moves more than 6 px. While dragging, `target = startTarget − dx × 1.15`, and hover is cleared. On release, fling with `target −= releaseVelocity(px/ms) × 260`. A click that followed a drag is ignored.
- **Keys:** ArrowRight and ArrowLeft move one gap. Escape closes the quick-view, or the cart if the quick-view is shut.
- **Sway** (per piece, a damped spring, skipped when reduced motion is on): target angle = clamp(−vel × 0.22, −7°, 7°); `av += (target − a) · 0.05 · dt; av *= 0.88^dt; a += av · dt`; apply `rotate(a deg)` on `.sway` around the hook. Fast scrolling makes the clothes swing against the direction of travel, and they settle when the rail stops.
- **Progress thumb:** `left = (cur / maxScroll) × 42%`.

### 4.3 Hover: turn to face (mouse only)
- Entering a hit area with a mouse pointer (not while dragging or adding to cart) gives `.g` the class `hov` and raises it to z-index 5.
- **Lift:** `.lift` goes to `translateY(12u) scale(1.2)` over 0.42 s, cubic-bezier(.22,1,.36,1). It scales from the hook, so the garment grows and drops slightly.
- **Turn:** the side face rotates Y 0 → −90° in 0.15 s (cubic-bezier(.5,0,1,1)). Then the front face rotates Y 90° → 0 in 0.15 s with a 0.15 s delay (cubic-bezier(0,0,.3,1)). On leave it plays in reverse, front out first, then side back in after 0.15 s. Both faces use `backface-visibility: hidden` and `transform-origin: 50% 0`.
- **Neighbours make room:** each piece eases (factor 0.16 per frame) towards an offset of sign(d) × [0, 50, 24, 9, 0][min(|d|, 4)] × (gs/0.48)u, where d = its index − the hovered index.
- **Label:** the hint fades up and out (opacity 0, translateY −6u, 0.3 s), and the name/price label fades in from translateY 6u.
- **Touch** (`hover: none`): the hint reads "Tap a piece · tap again to look closer". The first tap does the hover turn and the second tap opens the quick-view.

### 4.4 Click: quick-view
- `body.qv-open` fades `.stage` to opacity 0 with blur(8px) over 0.45 s, and disables pointer events on it.
- **Image:** a `.qv-img` layer holds a front face and a back face of the piece. On desktop they are painted at scale 0.9u, with the hook at x 440u and y 62u. A 1.5 px rod in `#3B3631` hangs from the top of the screen down to the hook. It fades in after 0.45 s.
- **Fly-in:** the image animates from the garment's current position and size on the rail (the front face if it was hovered, otherwise the side face) to its place. Use a translate plus a scale from origin 0 0, with the scale set by the height ratio, opacity 0.6 → 1, over 700 ms, cubic-bezier(.22,1,.36,1). Hide the rail copy while the quick-view is open. Cancel any running animation on the layer before starting, and use a token so a close that finishes late can never clear a newer open.
- **Info column** (left 972u, width 430u, vertically centred with translate −42%), every item fading up 10u with a stagger of 0.28 s + j × 0.045 s:
  1. Counter "i / 20": Inter 12, tracking 0.12em, colour `#8A7F72`.
  2. Name: Inter 600 23, tracking −0.01em.
  3. Price "$690.00": Inter 600 15.5.
  4. Tabs "Front" and "Back": Inter 15, gap 32, inactive `#8A7F72`, active ink with a 2 px underline and bottom padding 6. Switching crossfades the two faces over 0.25 s, but only once that sheet has loaded.
  5. "SIZE": Inter 11, tracking 0.14em, muted.
  6. Size pills S, M, L, XL: 52 × 44, fully rounded, border 1.5 px `#DDD5C9`, Inter 500 14. The selected one is filled `#0E0D0C` with white text. S is selected by default.
  7. "Add to cart": full width, 58 tall, fully rounded, `#0E0D0C`, white Inter 600 16.
  8. Meta row, separated by a top hairline: the piece name on the left and "View product page" (underlined) on the right, Inter 13.5.
- **Close:** a "Close ×" button at top right (right 28, top 22, height 32), with a 1.5 px ink border, background `#FAF7F2` and Inter 500 14. It reverses the flight back to the rail position with opacity → 0 over 520 ms (cubic-bezier(.55,0,.2,1)). Escape also closes it.

### 4.5 Add to cart: fly into the bag
1. The button turns `#8D8780` and shows a 16u white spinner (0.7 s linear rotation) and the text "Adding…" for 1000 ms.
2. Clone the face that is currently showing (front or back) as a fixed element on top of everything at its exact on-screen rectangle. Close the quick-view without the return flight: the piece reappears on its hook with a small drop (translateY −24u → 0, opacity 0 → 1, 520 ms, delay 260 ms) and a sway nudge of +1.4.
3. The clone flies in an arc to the centre of the bag icon over 820 ms, cubic-bezier(.55,.05,.35,1), with `transform-origin: 50% 42%`. Keyframes: start; at 45% it has moved 45% of the way, lifted 90u higher, at scale (1 + end) × 0.42; at the end it has moved the full distance at scale `end = bagHeight × 1.6 / cloneHeight` (minimum 0.04) and opacity 0.35.
4. When it lands: remove the clone, put the item (with the chosen size, quantity 1) at the top of the cart, raise the badge 3 → 4 with a pop (scale 1 → 1.45 → 1, 0.5 s, cubic-bezier(.3,1.6,.5,1)) and bounce the bag (scale 1 → 1.22 with rotate −6° → 0.94 → 1, 520 ms, ease-out).
5. **The cart drawer does not open.** It opens only when the bag icon is clicked.

### 4.6 Cart drawer (opens from the bag icon)
- `aside.drawer`: fixed on the right, 560u wide, full height, background `#FDFBF7`, left hairline. It slides from translateX(100%) to 0 over 0.6 s, cubic-bezier(.22,1,.36,1).
- **Page shift:** `.page` animates its `right` from 0 to 560u with the same curve, so the hero re-centres in the remaining space. The rail is redrawn for the new width every frame. In this state the search pill collapses to a 40u circle (left padding 10.5u, text clipped) and the nav links move to `left: calc(50% + 24u)`, so nothing overlaps.
- **Header:** "Cart" in Inter 700 27, tracking −0.02em. A count chip (24u, `#E9E3DA`, Inter 600 12.5). A round close button (40u, `#EFEAE2`) at the right.
- **Rows** (grid 76u | 1fr | auto, gap 18, padding 16 top and 18 bottom, hairline `#ECE6DC`): a thumbnail (76 × 96, the front crop fitted and centred), then the name in Inter 500 17, the size and "$690.00" in Inter 14 `#6F665C` with line-height 1.5, a quantity stepper (40 tall, border `#DCD4C8`, radius 4, buttons "−" and "+", value in the middle) and a trash icon. The line total is on the right in Inter 600 16. A new row slides in from translateX(30u) over 0.6 s.
- **Starting cart:** Taupe Wool Blazer (M), Champagne Bias Slip (S), Ivory Belted Trench (M).
- **Footer:** "Estimated total" with the sum (for example $2,760.00), the note "Taxes and shipping calculated at checkout." in `#8A7F72` 12.5, and a full-width black "Checkout" button (52 tall, radius 3).
- The steppers and trash update the count chip, the badge and the total live.

---

## 5. Phone and tablet (width ≤ 820)
- `u = min(width/390, height/780)`. The utility bar, nav links, search pill and account icon are hidden. The wordmark sits at left 20, top 26, size 20, and the bag at right 30, top 24.
- The eyebrow moves to top 104 (size 9.5, gap 10). The headline moves to top 130, size 40, width 330, wraps over two lines ("Silhouettes that / hang right."), centred, line-height 1.08.
- The rail uses the phone rail parameters (rail-top 292, sag 30, gap 80, scale 0.30, start 46), and the rail zone runs from top 260 to bottom 150.
- The hint sits at left 20, bottom 150. The progress bar is at bottom 128, width 110. The copy block is at right 20, bottom 30, size 13, with the link at 12.
- **Quick-view:** the image is centred horizontally with its hook at top 64. The scale is the largest value up to 0.46u that fits the piece's taller view (front or back) into the space above the info panel. The panel is pinned at left 20, bottom 24, width 350, with a 94% background tint shown only while open.
- The drawer is full width and the page does not shift. There is no sideways scroll at any size: 375 × 667, 390 × 844, 768 × 1024 and landscape 844 × 390 (which uses the desktop branch) must all fit.

## 6. Reduced motion
Under `prefers-reduced-motion: reduce`:
- Every CSS transition and animation duration becomes 0.
- The intro is skipped (everything shows at once) and there is no sway.
- The quick-view, close and fly-to-bag happen instantly, with no motion: the item is simply added and the badge updates.

## 7. Acceptance checklist
- [ ] At 1440 × 900 the layout matches the measurements above: wordmark x 47–251, eyebrow centred at y ≈ 151, headline x ≈ 347–1102, rail at 270 → 344 → 270, eleven garments visible with the first hook at x 113, footer copy right-aligned at x 1392.
- [ ] The garments drop on one by one, swing, and the headline sharpens from blur. Everything appears within about 1.5 s of the sheets loading.
- [ ] Wheel and drag scroll the rail with inertia, the clothes swing with the speed and settle, and the progress thumb follows.
- [ ] Hover turns the piece from side-on to front, lifts it 1.2×, moves the neighbours aside and shows its name and price at bottom left.
- [ ] Clicking any of the 20 pieces always shows its image in the quick-view, including after closing, switching quickly or adding to cart. Front and Back both work.
- [ ] Add to cart shows the loading state, flies the garment into the bag, and the badge goes up. The drawer stays closed until the bag is clicked.
- [ ] The phone layout works by touch with no sideways scroll, and reduced motion removes all movement.