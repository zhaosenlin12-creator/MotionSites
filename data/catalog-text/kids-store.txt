# BUNTO° — kids' basics hero with a rotating garment ring

Build a single-screen, full-viewport hero for a fictional premium kids' clothing brand called BUNTO°. It is one HTML file with inline CSS and JavaScript, no frameworks and no build step. The page never scrolls (body overflow hidden). Everything below is exact; follow the numbers, the copy and the timings as written.

## 1. Overall idea

A warm off-white page with tiny wide-tracked all-caps labels around the edges, a huge pale ghost word "TINY" behind the centre, and six floating kids' garments arranged on an invisible horizontal ring that turns slowly and continuously, left to right across the front. The front piece is the largest, straight and highest. The side pieces are smaller, lower and lean outwards. The back pieces sit lower still, tucked behind the side pieces. Visitors can drag or fling the ring with mouse or touch. Hovering a piece updates the large index number bottom-left. Clicking any piece opens a product view: the ring freezes, the chosen piece glides to the left and grows, the others shrink and drift out to the sides, a round close button appears on the piece, and a product panel with name, description, four colour swatches and an "Add to bag" link fades in on the right. Swatches swap the garment's colourway in place. "Add to bag" flies a shrinking copy of the garment in an arc into the bag icon in the top bar, which bounces and shows a count badge.

## 2. Assets

There is one image. It is a transparent sprite sheet, 3200 × 2560 px, laid out as 5 columns × 4 rows of equal 640 × 640 cells, each cell holding one garment centred on a transparent background.

- Sheet URL (use exactly this, it serves a transparent WebP): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_115509_577e7e29-0e80-43e6-93ac-e6cf71972818.png&w=3200&q=85`
- Original PNG behind it: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115509_577e7e29-0e80-43e6-93ac-e6cf71972818.png`
- Columns (products), left to right: 0 = cotton dungarees with bib pocket and rolled cuffs, 1 = sleeveless knit romper with wooden shoulder buttons, 2 = long-sleeve cotton tee with a chest pocket, 3 = chunky knit button cardigan with wooden buttons, 4 = bucket hat.
- Rows (colourways), top to bottom: 0 = Peach, 1 = Pink, 2 = Sage, 3 = Butter.
- Show one cell by putting the sheet on an element as `background-image`, `background-size: 500% 400%`, `background-repeat: no-repeat`, and `background-position: (col × 25)% (row × 33.333)%`. Never crop or re-host the image; every garment on the page is a CSS crop of this one sheet.
- Store the sheet URL once as a CSS custom property `--sheet: url("…")` on `:root` and reuse it.
- Add a hidden inline SVG filter, `<filter id="clean" color-interpolation-filters="sRGB">` containing `<feComponentTransfer><feFuncA type="linear" slope="1.1" intercept="-0.1"/></feComponentTransfer>`, and apply `filter: url(#clean)` to every garment layer. It removes faint compression specks around the cut-outs.

## 3. Fonts

One family: Inter, variable weight 200–700, latin subset, from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@200..700&display=swap` (self-host the latin woff2 as `@font-face { font-family: "Inter"; font-weight: 200 700; font-display: swap }` if you prefer). Fallback `system-ui, sans-serif`. Turn on `-webkit-font-smoothing: antialiased`.

Weights in use: 200 for the big index number, 500 for all small caps labels and the product title, 600 for the bag count, 700 for the logo and the ghost word.

## 4. Colour tokens

- `--bg #F9F2E9` page background (warm cream)
- `--ghost #F5E6D9` ghost word "TINY"
- `--ink #3E3A3C` all text and icons
- `--muted #716D71` product description and category label
- `--line #E6D9D2` hairline borders of the round bag and close buttons
- `--dot #CFC6C2` inactive pagination dots (active dot uses `--ink`)
- Swatch colours: Peach `#FEDBDA`, Pink `#FCB7CC`, Sage `#C8C997`, Butter `#F5B55A`
- Floor shadow: radial gradient `rgba(120,96,86,.16)` at the centre → `rgba(120,96,86,.07)` at 55% → transparent, blurred by 3 design px.

## 5. Head

- `<title>BUNTO° — Soft things for small people</title>`
- Meta description: "Premium organic-cotton basics for ages 1–6: rompers, dungarees, tees, cardigans and hats in soft peach, pink, sage and butter."
- `<meta name="viewport" content="width=device-width, initial-scale=1">`, `lang="en"`.

## 6. Scaling system

Two units, both relative to a 1440 × 900 design frame:

- `--n: calc(100vw/1440)` is the chrome unit. Edge-pinned UI (logo, labels, nav, index, scroll hint) is placed with it relative to the viewport edges.
- `--u: min(100vw/1440, 100vh/900)` is the stage unit. A `.stage` box of `1440u × 900u` is centred in the viewport (`left:50%; top:50%; transform: translate(-50%,-50%)`), and everything inside it (ghost word, shadow, dots, garments, close button, product panel) is positioned in design px multiplied by `--u`.

All small caps text uses a `max(9px, …)` or `max(8px, …)` floor so it never becomes unreadable.

## 7. Layout (desktop, design px at 1440 × 900)

Reusable caps style `.caps`: `font-size: max(9px, 10.5n)`, weight 500, `letter-spacing: .32em`, uppercase, line-height 1.62.

Edge chrome (positioned in `n` units from the viewport edges):

1. Logo, top-left: "BUNTO" plus a superscript "°", a link to "/". Left 46, top 30, font-size `max(22px, 30n)`, weight 700, letter-spacing −0.035em, line-height 1. The "°" is a `<sup>` at 0.5em, weight 500, raised `vertical-align: .9em`, margin-left .04em.
2. Tagline, top centre: two lines "SOFT THINGS FOR SMALL PEOPLE" / "AGES 1–6", caps style, centred at 50% horizontally, top 37, no wrapping, with `padding-left: .32em` to optically centre the tracking.
3. Nav, top-right: right 39, top 32, a flex row with a 16n gap: the caps link "MENU" (font-size `max(9px, 9.5n)`), then a round bag button. The bag button is `max(28px, 35n)` square, 1px `--line` border, fully round, centred icon at 42% size. The icon is an outline bag (16 × 16 viewBox, stroke 1.3): path `M3.5 5.5h9l-.7 8h-7.6z` for the body and `M5.8 5.5V4.4a2.2 2.2 0 0 1 4.4 0v1.1` for the handle. Inside the button sits a count badge (see section 11), and the button has `aria-label="Bag, 0 items"`.
4. Left label: "THE BASICS — 16 PIECES", caps, left 46, top 131.
5. Right label: "ORGANIC COTTON" / "KNIT", caps, right-aligned, right 38, top 132.
6. Vertical label on the far left edge: "EVERYDAY ESSENTIALS FOR LITTLE EXPLORERS", caps at `max(8px, 9n)`, rotated −90°, centred on left 26, top 447 (a zero-width flex box centred on that point, translated −50% vertically, then rotated).
7. Index, bottom-left: left 46, bottom 52, a flex row of: a big number "01" (font-size `max(30px, 50n)`, weight 200, letter-spacing −0.04em, line-height 1, inside an overflow-hidden box 1em tall so it can roll), a 1px × 28n vertical bar in `--ink` at 45% opacity with 20n margins either side, and a two-line caps label (`max(8px, 9.5n)`, min-width 16em) "ROMPER" / "COLLECTION". A second label, "CHOOSE" / "A COLOUR", is stacked on top of it, absolutely positioned and hidden (opacity 0, translateY 8px). Both labels transition opacity and transform over .45s ease.
8. Scroll hint, bottom centre: bottom 59, centred, a down arrow (11 × 16 viewBox, stroke 1.2, path `M5.5 1v13M1.5 10l4 4 4-4`, width 11n, min 8px) and "SCROLL TO EXPLORE" in caps at `max(8px, 9.5n)`, 14n gap.

Stage contents (design px × `u`, inside the centred 1440 × 900 stage):

1. Ghost word "TINY": full-width centred, top 109, font-size 295, weight 700, letter-spacing −0.02em, line-height 1, colour `--ghost`, no pointer events, not selectable, `aria-hidden`.
2. Floor shadow: an ellipse at left 370, top 690, 700 × 48, fully round, the radial gradient from section 4, blur 3.
3. Pagination dots: five 9 × 9 round dots (min 6px), 21 apart, centred at y 752. They are decorative (`aria-hidden`). The dot at index (front piece index mod 5) is `--ink`; the rest are `--dot`. Colour transition .5s.
4. Six garment elements (`.item`), each a 510 × 510 box whose centre is the transform origin (width/height 510u, negative margins of 255u, then positioned purely with `transform`). Each holds two full-size layers, `.art` and `.art2`, showing the sheet crop. `.art2` starts at opacity 0 and is used for colour cross-fades. Items are `role="button"`, focusable (`tabindex=0`), with `aria-label` like "Peach Romper", and `cursor: pointer`.
5. Close button (product view only): a 44 × 44 round button (min 34px), 1px `--line` border, background `rgba(249,242,233,.7)`, centred × icon (12 × 12 viewBox, stroke 1.3, path `M1.5 1.5l9 9M10.5 1.5l-9 9`, 36% size), `aria-label="Close"`, z-index 300. Hidden by default: opacity 0, `translate(-50%,-50%) scale(.6)`, no pointer events. Its border turns `--ink` on hover.
6. Product panel (product view only): left 905, top 368, width 400. In order: a category line (caps at `max(8px, 9.5u)`, colour `--muted`), the product name as an h2 (font-size 34u, weight 500, letter-spacing −0.025em, line-height 1.1, margins 12u above and 14u below), the description paragraph (font-size `max(12px, 14u)`, line-height 1.6, `--muted`, max 30em), a swatch row (flex, 12u gap, margins 26u top and 30u bottom) of four 24u round colour buttons (min 18px, `role="radio"` inside a `role="radiogroup"` with `aria-label="Colour"`), and finally an "ADD TO BAG →" text button (caps at `max(8px, 9.5u)`, 1px `--ink` underline as a bottom border, 4px bottom padding). The selected swatch shows a 1px `--ink` ring 5u outside it at 70% opacity (a `::after` that scales from .8 to 1 over .3s).

## 8. The ring (the core motion)

Products in ring order (index: column, starting row): 0 = Romper Peach (1, 0), 1 = Tee Pink (2, 1), 2 = Dungarees Sage (0, 2), 3 = Cardigan Butter (3, 3), 4 = Bucket hat Pink (4, 1), 5 = Cardigan Sage (3, 2). The colours alternate so neighbours never match.

Product copy:

- Dungarees: category "Dungarees · Ages 1–5"; description "Washed cotton twill with a bib pocket, adjustable straps and rolled-up cuffs."
- Romper: "Romper · Ages 1–3"; "Soft knit in organic cotton, with wooden shoulder buttons and snaps for easy changes."
- Tee: "Long-sleeve tee · Ages 1–6"; "Heavyweight organic jersey with a little chest pocket and ribbed cuffs."
- Cardigan: "Cardigan · Ages 1–6"; "Chunky hand-feel knit with wooden buttons, made for layering on cool mornings."
- Bucket hat: "Bucket hat · Ages 1–6"; "Garment-dyed cotton canvas with a soft brim that folds into any pocket."

The product name is "<Colour> <Kind>", for example "Peach Romper" or "Sage Cardigan".

Geometry, in design px, run every animation frame with `requestAnimationFrame`:

- Constants: centre `CX = 718`, `CY = 418`, radius `R = 411`, vertical drop `DROP = 110`, base scale `S0 = 0.97`, tilt `TILT = 9°`, `N = 6`, `STEP = 2π/6`.
- Piece *i* sits at angle `θ = base + i·STEP`. Let `c = cos θ`, `s = sin θ` and `k = (1 + c)/2` (1 at the front, 0 at the back).
- x = `CX + R·s`; y = `CY + (1 − k)·DROP`; scale = `S0·(0.72 + 0.28·k)`; z-index = `round(k·100) + 1`; rotation = `TILT·s` degrees, so pieces on the left lean outwards anticlockwise, pieces on the right lean outwards clockwise, and the front piece is straight.
- Apply it as `transform: translate(x·u, y·u) scale(scale) rotate(rotation deg)`.
- Auto-turn: `base` grows by `OMEGA·dt` every frame, where `OMEGA = STEP / 4.2 s`. One slot every 4.2 s and a full turn every ≈ 25 s. Because x = R·sin θ, the front pieces travel left to right, come round behind on the right, and re-emerge on the left. Clamp `dt` to 50 ms, and do not advance while the tab is hidden.
- Front piece: the one with the largest cos θ. It drives which pagination dot is active.

Drag and fling:

- `pointerdown` on the stage (left button only, not in the product view) starts a drag. The stage has `touch-action: pan-y` (vertical page scrolling still works on phones), `cursor: grab`, and `cursor: grabbing` while dragging, with user-select disabled.
- `pointermove` (on window): convert the horizontal pointer delta to design px (divide by stage width / 1440) and add `dx / R` to `base`, so the front piece tracks the pointer. Keep a smoothed velocity `v = 0.6·v + 0.4·(dθ per 16.7 ms)`. Once the accumulated movement passes 6 design px, mark the gesture as a drag, add the `dragging` class and capture the pointer. A drag never opens a piece.
- On `pointerup` or `pointercancel`: if it was a drag, start a fling of `clamp(v, ±0.12)` rad per frame. Each frame add the fling to `base` and multiply it by `0.92^(dt·60)` until it falls below 0.0005. At release the auto-turn weight drops to 0 and climbs back to 1 at 0.8 per second, so the throw blends smoothly back into the slow turn.
- The auto-turn and the fling pause during a drag and while a piece is open.

Hover: entering a piece sets the index to that piece's number (01–06) and the label to "<KIND>" / "COLLECTION". Leaving resets it to "01" / "ROMPER COLLECTION". The number change is a vertical roll: the current digits slide up out of view (translateY −110%, .7s `cubic-bezier(.65,0,.35,1)`), then after 300 ms the new digits jump to +110% with no transition and roll back to 0.

## 9. Product view (click)

- Clicking (or pressing Enter/Space on) any visible piece opens it. Add class `detail` to the hero. A blend value `d` animates 0 → 1 over 560 ms with ease-in-out cubic (`t<.5 ? 4t³ : 1 − (−2t+2)³/2`). Closing animates it back to 0 the same way.
- Chosen piece: interpolate from its live ring pose to a target. Desktop target x 470, y 425, scale 1.12; phone target x 716, y 300, scale 0.86. Rotation goes to 0, and z-index becomes 300.
- Every other piece: move outwards along x by `240·d` (away from the chosen piece's ring x), multiply its scale by `1 − 0.45·d`, multiply its opacity by `max(0, 1 − 1.4·d)`, and disable its pointer events.
- Floor shadow: translate by `((targetX − 718)·0.82·d, (targetY − 418)·d)` design px (an extra −60·d px vertically on phones) and scaleX `1 − 0.45·d`, so it settles under the opened piece.
- Pagination dots fade to `opacity: 1 − d`.
- The ring stops turning while open and resumes from the same angle after closing.
- Close button: placed at `(targetX + 205·targetScale, targetY − 200·targetScale)` design px, which is the top-right corner of the opened garment. With class `detail` it becomes opacity 1, scale 1 and clickable, after a .25s delay (opacity .35s ease, transform .45s `cubic-bezier(.22,1,.36,1)`). Focus moves to it.
- Product panel: each child starts at opacity 0 and translateY 18u. In detail it goes to opacity 1 and none, with opacity .55s ease, transform .7s `cubic-bezier(.22,1,.36,1)`, staggered by 60 ms per child (0, .06, .12, .18, .24 s).
- Index: shows the opened piece's number. The "KIND / COLLECTION" label fades out upwards (−8px) while "CHOOSE / A COLOUR" fades in from +8px.
- Closing: the close button, the Escape key or keyboard all reverse everything. Focus returns to the piece and the index resets to 01 / ROMPER COLLECTION.

Colour swatches: clicking a swatch puts the new row's crop on `.art2`, adds a `swap` class (opacity transition .35s), and fades `.art2` to 1. After 360 ms it copies the crop to `.art`, hides `.art2` again without a transition, and plays a small scale bounce on the piece (×(1 + 0.035·sin(π·t)) over 420 ms). The product name, the aria-label, the selected ring and `aria-checked` all update.

## 10. Entrance (on load, once)

Wait until the sheet image has loaded (with a 2.5 s failsafe), then:

- Every chrome element starts hidden (class `rv`, opacity 0, only applied when JS has run) and is animated with the Web Animations API from opacity 0 and translateY 14px (its existing transform preserved) to its rest state. Each takes 1000 ms with `cubic-bezier(.22,1,.36,1)`, staggered 80 ms + 60 ms × order. The order is logo, tagline, nav, left label, right label, vertical label, ghost, shadow, dots, index, scroll hint. The ghost word is the exception: 1400 ms rising from 40px, starting at 150 ms. When each animation finishes, remove `rv` and cancel the animation so later inline styles (dot fade, shadow move) take over.
- The ring rises in at the same time, starting 300 ms after load and taking 1.6 s overall. Each piece's progress is `clamp((entered·1600 − (1 − cos θ)·260)/1000)` with ease-out cubic, so the front pieces arrive first and the back pieces a little later. Each piece moves up 36 design px into place, scales from 0.95 to 1, and fades from 0 to 1.

## 11. Add to bag

- Clicking "ADD TO BAG →" takes the opened piece's on-screen rectangle and the bag button's rectangle. It creates a fixed-position copy (`.fly`, z-index 1000, no pointer events) of the same size with the same sheet crop and colour, the `#clean` filter plus `drop-shadow(0 10px 14px rgba(90,70,60,.18))`.
- The copy flies along a quadratic Bézier from the piece's top-left to the point that centres it on the bag. The control point is at x = start + 0.62·(end − start), y = max(0, min(startY, endY) − 0.12·height). The path is sampled into 25 keyframes. The scale rises to 1.06 over the first 12% (sine), then shrinks to `max(0.04, bagWidth·0.9/width)` with an exponent of 0.55, so it shrinks early. The rotation is `−14·sin(π·t)` degrees, and the opacity drops by 60% over the last 10%. Duration 950 ms, easing `cubic-bezier(.45,0,.25,1)`.
- On landing: remove the copy and increment the count. The badge (a 17px-tall pill at the bag's top-right, −5px offsets, `--ink` background, `--bg` text, 9.5px weight 600) pops in from scale 0 with `cubic-bezier(.34,1.56,.64,1)` .45s. The bag button wiggles (scale 1 → 1.28 with −8° → 0.94 with 4° → 1, 520 ms ease-out), the badge pulses (scale 1.45, 420 ms, 60 ms delay), and the bag's aria-label becomes "Bag, N item(s)".
- The button text changes to "ADDED TO BAG ✓" and goes back to "ADD TO BAG →" after 1.8 s. The garment in the product view stays where it is.

## 12. Phone (max-width 820px and min-height 521px)

- `--u: min(100vw/600, 100vh/1100)`, so the ring is larger relative to the screen and its side and back pieces run off the edges.
- Hidden: the tagline, both side labels, the vertical label and the "MENU" text.
- The logo is at left 20, top 22, 24px; the bag is at right 20, top 18. The stage centre is at 45% of the viewport height. The ghost word is 250u at top 150u.
- The index is at left 20, bottom 26, with a 34px number, a 22px bar and 12px margins. The scroll hint becomes just the arrow at right 20, bottom 34.
- Product view: the piece goes to x 716, y 300, scale 0.86, centred above the panel. The panel is centred (left `calc(50% − 270u)`, top 585u, width 540u), with a 24px title, a 13px description at line-height 1.5, 9px caps lines, and swatches with a 12px gap and 12/14px margins. The close button follows the same formula, so it sits at the top-right of the piece.

Landscape phone (max-width 820px and max-height 520px): use the desktop layout with `--u: min(100vw/1440, 100vh/900)` and `--n: calc(100vw/1000)`, the stage centred at 50%, the panel at left 905u, top 330u, width 430u, a 20px title and an 11px description. At any height up to 520px, hide the vertical label.

## 13. Reduced motion

With `prefers-reduced-motion: reduce`: no entrance animation (everything visible at once), no auto-turn, a product-view blend of about 1 ms, no fly animation (the badge just counts), no colour cross-fade, and transitions off for the panel, index, dots, shadow and swatch layers. Dragging still works.

## 14. Acceptance checklist

- At 1440 × 900 the ring turns slowly and continuously, left to right at the front, one piece every 4.2 s, with no jumps.
- The side pieces lean outwards about 9° at most, the front piece is straight, and the back pieces are lower and partly hidden.
- Dragging turns the ring under the pointer, a fling coasts and blends back into the auto-turn, and a drag never opens a piece.
- Clicking any piece runs the 560 ms transition into the product view, with the close button on the piece's top-right, and closing restores the ring at the same angle.
- All four swatches swap the colourway with a cross-fade, and the title updates.
- Add to bag flies the garment into the bag, the bag bounces, and the count increments every time.
- At 390 × 844 there is no sideways scroll, the product view stacks the piece above the panel, and the close button stays on the piece.
- No text other than the copy listed here, and no extra decoration.