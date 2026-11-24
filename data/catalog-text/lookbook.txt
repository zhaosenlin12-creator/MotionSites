# Obverse — interactive techwear lookbook slider with shoppable hotspots

Build a single-file, full-viewport, fully responsive fashion e-commerce **lookbook slider** for an invented store called **"OBVERSE"**. Each slide is one collaboration "look": a transparent cut-out model standing on a light-grey seamless studio floor, with a giant pale wordmark behind them. Frosted product hotspot tags point at each garment.

The page is extremely interactive:
- a masked wipe transition between looks, a rolling slide counter and line-masked text swaps;
- drag, wheel and keyboard navigation;
- hover tags that expand into size pickers, a quick-view drawer, add-to-bag with a flying thumbnail and a working bag drawer;
- a press-and-hold magnifier lens, a search overlay and an index overlay;
- live currency switching with counting prices, a "fullscreen" focus mode and a custom labelled cursor.

The layout matches a minimal Helvetica-style lookbook UI kit: tiny black nav at the top, a huge thin slide counter at top-left, product info at bottom-left and the collab mark at bottom-right. Everything below must be matched exactly. The page never scrolls (`html, body { height:100%; overflow:hidden }`).

---

## 1. Global look

- **Font:** **Inter Tight** from Google Fonts, weights 200, 300, 400, 500 and 600, with fallback `"Helvetica Neue", Helvetica, Arial, sans-serif`. It is the only typeface. Antialiased.
- **Colour tokens:**
  - `--bg: #e4e4e4`
  - `--ink: #0d0d0d`
  - `--mute: #8b8b8b`
  - `--line: rgba(0,0,0,.12)`
  - `--blue: #1747e6` for all prices
  - `--tag: rgba(250,250,250,.78)`
- **Easings:**
  - `--ease: cubic-bezier(.77,0,.18,1)` for slides, wipes and drawers.
  - `--out: cubic-bezier(.16,1,.3,1)` for reveals.
  - An "exit" curve `cubic-bezier(.7,0,.84,0)` for things leaving.
- **Side padding:** `--pad: clamp(16px, 2.6vw, 38px)`.
- **Stage** (fixed, inset 0, overflow hidden):
  - background `radial-gradient(120% 90% at 50% 45%, #ececec 0%, #e4e4e4 55%, #d9d9d9 100%)`;
  - a grain overlay through `::after`: an inline SVG `feTurbulence` fractalNoise (baseFrequency .9, 2 octaves) tinted grey at alpha .18, `opacity .35`, `mix-blend-mode: multiply`.
- **No edge margins:** the stage and figures go edge to edge.
- **Selection:** `::selection` is ink background with grey text.

## 2. Assets (transparent PNG cut-outs, served as WebP with alpha)

Every model image is a 1744×2336 cut-out with a transparent background. Use them exactly as given:

1. Look 01 — man in sunglasses walking right, black strapped tech trench:
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_045212_ac4848bb-f365-4841-af88-2aeed5407ae1.png&w=1400&q=85`
2. Look 02 — woman, three-quarter view, slate padded parka and black cargo trousers:
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_045214_3657bb3f-99c0-4369-998c-8b5197604f41.png&w=1400&q=85`
3. Look 03 — man facing camera, olive-black harness utility jumpsuit:
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_045216_ac1176b8-e8d4-468d-88be-328498028c08.png&w=1400&q=85`
4. Look 04 — woman walking forward, bone-white layered coat:
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_045217_f3be0027-62dd-4889-af3e-fc1181d1458f.png&w=1400&q=85`
5. Look 05 — man, deep-navy shell cape with hood and black pleated wide trousers:
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261115_045219_ae6b1137-5e4b-4005-9c88-c7b2f22908b6.png&w=1400&q=85`

No other images are used. Product thumbnails, the quick-view close-up, bag thumbnails, search results and index cards are all **crops of these same images** (see 9.1). Preload all five before the intro runs.

## 3. Data (invented collaborations; prices stored in USD)

Each look has a subject bounding box inside its image, given as fractions `[x0, y0, x1, y1]`. Each item has a hotspot position `x,y` (fraction of image), a preferred tag side, a colour name, swatches, a crop zoom `z` and a description.

| # | Collab | Season | Box | Items |
|---|---|---|---|---|
| 01 | Asker × KODA | AW26 | .298,.196,.727,.822 | AK 07 Tech Trench $1240 (x .44 y .38, left, "Carbon", #1d1d1d #4a4c48 #6b5d4a, z 2.6); AK 07 Strap Boot $560 (x .64 y .80, right, "Black", #141414 #5a5a5a, z 3.4) |
| 02 | Vesper × RUNE | SS27 | .308,.134,.702,.882 | VR 03 Padded Parka $980 (.47,.27, left, Slate); VR 03 Cargo Trouser $340 (.60,.62, right, Black); VR 03 Track Runner $290 (.43,.85, left, Black) |
| 03 | Morrow × TEKTON | AW26 | .329,.118,.652,.908 | MT 11 Utility Jumpsuit $1120 (.48,.29, left, Olive Black); MT 11 Field Boot $480 (.56,.89, right, Black) |
| 04 | Lumen × AISO | SS27 | .335,.107,.680,.907 | LA 05 Layered Coat $1460 (.44,.33, left, Bone); LA 05 Wide Trouser $380 (.57,.70, right, Chalk); LA 05 Cloud Boot $420 (.49,.90, left, Cream) |
| 05 | Nord × HALE | AW26 | .294,.181,.708,.871 | NH 09 Shell Cape $1340 (.46,.36, left, Deep Navy); NH 09 Pleat Trouser $460 (.58,.68, right, Black) |

- **Descriptions:** short technical copy, for example "Oversized storm trench in a matte ripstop shell, with modular webbing straps, articulated sleeves and a stowable storm collar."
- **Currencies:** USD ($, ×1), EUR (€, ×.92), GBP (£, ×.79) and JPY (¥, ×151, no decimals). Format with `toLocaleString('en-US')` and 2 decimals, for example `$1,240.00`.

## 4. Figure layout (JS, recomputed on resize)

Every look is its own full-stage `.layer` (absolute, inset 0, transparent) holding a `.fig`, which holds `.fig-in`, which holds:
- the shadow;
- the `<img>`, with `object-fit: contain` and no pointer events;
- a `.hit` box placed over the subject's bounding box (cursor "grab");
- the hotspots.

Sizing:
- **Desktop:** the subject height (y1−y0 of the image) equals **80 % of the viewport height**, and the feet line (y1) sits at **90.5 % of the viewport height**.
- **Phones under 640 px:** 60 % height, with the feet at 78 %.
- The image width is height × 1744/2336.
- **Width cap:** if the subject width would exceed 50 % of the viewport width (62 % on phones), shrink to fit.
- The subject's horizontal centre ((x0+x1)/2) sits at exactly 50 vw.

**Floor shadow:**
- an ellipse at the subject's bottom-centre, 1.25 × the subject width wide and 16 % of that tall;
- translated (−50 %, −62 %);
- `radial-gradient(closest-side, rgba(0,0,0,.34), rgba(0,0,0,.12) 55%, transparent)`, blur 6 px.

**Mouse parallax** (rAF lerp at 0.06 toward the normalised pointer, −.5 to .5):
- `.fig-in` gets `translate3d(sx·−18px, sy·−10px, 0) perspective(1400px) rotateY(sx·4deg)`;
- the background wordmark moves the opposite way, `sx·46px, sy·22px`.

## 5. Background wordmark

- **Position:** centred at left 50 % and top 46 %, behind the figures, no wrapping.
- **Text:** the collab in caps, for example `ASKER × KODA`.
- **Type:** Inter Tight 500, `clamp(120px, 21vw, 420px)`, `letter-spacing: -.065em`, `line-height: .8`, colour `#dadada`. The "×" is weight 200 in `#d2d2d2`.
- **Masking:** every character is its own overflow-hidden inline-block with an inner `<i>`, so it can roll.
- **Fit to width:** after rendering, scale the font size down until the word's width is at most 94 % of the viewport width (125 % in fullscreen mode). There must be **no font-size transition**, or the measurement breaks.
- **On a slide change:** the old letters roll out (translateY ∓105 %, 520 ms, 18 ms stagger, exit curve). The new letters then roll in from ±105 % (900 ms, 28 ms stagger, `--out`). The direction follows the slide direction.

## 6. Chrome

### Nav

- Fixed top, padding `24px var(--pad)`, 13 px text.
- **Left to right:**
  1. Logo "OBVERSE" (600, 13.5 px, .02em tracking), in a box `clamp(120px, 17.5vw, 250px)` wide.
  2. A 3×3 dot **grid icon** (opens the index), in a 26 px round button with a hover tint `rgba(0,0,0,.06)`.
  3. A **search** magnifier icon.
  4. "**Fullscreen**", with `margin-left: clamp(20px, 6vw, 90px)`.
  5. Pushed right with a gap of `clamp(18px, 3vw, 46px)`: the **currency** selector "USD ▾", "**Account**" and "**Bag (0)**".
- **Text links:** a 1 px underline that scales in from the left on hover and out to the right.

### Currency dropdown

- A frosted menu (`rgba(250,250,250,.86)`, blur 14 px, 3 px radius) listing USD $, EUR €, GBP £ and JPY ¥.
- It opens with `clip-path: inset(0 0 100% 0)` → `inset(0)` (.5 s `--ease`), and the caret rotates 180°.
- **Choosing a currency:**
  - the code label rolls up and out, then in;
  - **every visible price and the total count** from the old to the new currency over 900 ms (ease-out quart) in requestAnimationFrame.

### Bag count

- The number lives in an overflow-hidden span.
- **On change:** the old number goes to −110 % (280 ms); the new one comes from +110 % (520 ms `--out`). "Bag" pulses to scale 1.18.

### Slide counter (top-left)

- Position: top `clamp(86px, 11.5vh, 120px)`.
- Two **digit reels**: each a column of 0–9, one row = 1em tall, in an overflow-hidden 1em box.
- Type: weight 200, `clamp(46px, 5.6vw, 84px)`, -.04em tracking.
- After the reels: "/05" (300, `clamp(16px, 1.6vw, 22px)`).
- **On change:** each reel animates to `translateY(-digit em)` over 1000 ms `--ease`; the second digit starts 70 ms later.
- **Progress line** under the counter: `clamp(60px, 6vw, 92px)` × 1 px track in `--line`, with an ink fill `scaleX(n/5)` that transitions over 1.1 s.

### Arrows

- 44 px round buttons at mid-height, `left/right: calc(var(--pad) - 14px)`.
- Small solid black triangles (7×10).
- Hover: a background of `rgba(255,255,255,.55)`, and the triangle nudges 3 px outward.

### Info (bottom-left)

- Width `clamp(210px, 18vw, 270px)`, bottom `clamp(26px, 4.2vh, 44px)`.
- **Lines:**
  - "Asker × KODA" / "Season: AW26" (500, `clamp(17px, 1.45vw, 21px)`, line-height 1.18);
  - then grey 13 px lines: "This look 2 positions" / "Size: S-M-L-XL";
  - then, `clamp(26px, 5vh, 54px)` lower, "Total: $1,800.00" (the look's sum) with a "+" button at the right edge.
- **The "+" button** rotates 90° on hover. Clicking it adds every item of the look in size M, one after another 220 ms apart, each flying from its tag.
- **Every line** is an overflow-hidden mask with an inner span.
- **On a slide change:**
  - each line slides out to ∓110 % (420 ms, 55 ms stagger, exit curve);
  - its text swaps;
  - it slides in from ±110 % (760 ms `--out`).

### Collab mark (bottom-right)

- "ASKER / × / KODA" stacked, centred, 11 px, .24em tracking, `#9a9a9a`, weight 500.
- **On change:** it wipes up and away (`clip-path` to `inset(0 0 100% 0)`, 450 ms), then wipes back in from the bottom.

### Hint (bottom-centre)

- 10.5 px uppercase, .16em tracking, grey.
- Content: "**DRAG** TO BROWSE", then 5 dot buttons, then "**HOLD** TO ZOOM".
- **Dot buttons:** 18 px wide, each with a 1 px grey line; the active one is ink and 2 px tall. Clicking jumps to that look.

## 7. Hotspots

**Structure.** Each hotspot is a zero-size anchor at (x, y) % of the image, containing:
- **Dot:** 14 px, white, `0 1px 6px rgba(0,0,0,.25)` shadow, with a 6 px ink centre. An outer 1 px white ring pings: scale .5 → 1.9 and fades over 2.4 s, infinitely.
- **Leg:** a 34 px horizontal white hairline running toward the tag.
- **Tag:**
  - a `<button>` 186 px wide with padding `10px 30px 10px 12px`, 3 px radius;
  - background `var(--tag)` with `backdrop-filter: blur(14px) saturate(1.3)`, shadow `0 10px 30px -12px rgba(0,0,0,.35)`;
  - placed 40 px from the dot on its side, at top −24 px;
  - text: the name "AK 07 Tech Trench" (500, 12.5 px), the price in blue (12.5 px, tabular figures), and a small black ▸ caret at the right.

**Hover.** The tag opens:
- a hidden row of four size chips (S, M, L, XL; 10.5 px, 1 px line border) grows from 0 to 27 px tall with a 10 px top margin (.45 s `--out`);
- the caret nudges 3 px;
- the shadow deepens;
- other open tags close.

**Clicks.**
- Clicking a size chip adds that size straight to the bag, with the chip squishing to .85.
- Clicking anywhere else on the tag opens the quick view.

**Hotspots in** (after a look arrives), per spot with a 140 ms stagger:
1. the dot pops from scale 0 → 1.25 → 1 (620 ms);
2. the leg draws from scaleX 0 (500 ms, +180 ms);
3. the tag wipes open from the dot side with `clip-path` (800 ms, +320 ms);
4. the name and price glide 14 px from the dot side (900 ms, +380 ms and +440 ms).

**Hotspots out:** the tag wipes closed (320 ms), the leg retracts and the dot shrinks.

**Keeping tags on screen** (computed in JS on layout): if the tag doesn't fit on its preferred side within a 12 px margin, flip it to the other side. If neither side fits, shift it with a margin.

## 8. Slide transition (the signature move)

`go(n, dir)` runs over D = 1150 ms. It is ignored while busy.

1. **Wipe.** The new layer's `clip-path` animates from `inset(0 0 0 100%)` (for next; mirrored for previous) to `inset(0)`. The old layer animates from `inset(0)` to `inset(0 100% 0 0)`. Both use `--ease`, so the two clip edges coincide as one vertical seam sweeping across the screen.
2. **Figures inside the wipe:**
   - new `.fig`: `translateX(dir·16vw) scale(1.06) blur(6px)` → none (D+150 ms);
   - old `.fig`: none → `translateX(-dir·22vw) scale(.94) blur(4px)`.
3. **The seam.** A 1 px `rgba(0,0,0,.35)` vertical hairline rides the seam. It carries a tiny label beside it, "02 — VESPER" (10 px, .14em), and is visible only during the transition.
4. **Everything else at once:**
   - the wordmark letters roll;
   - the counter reels roll;
   - the info lines swap;
   - the collab mark wipes;
   - the active dot moves.
5. **Hotspots:** the old ones animate out immediately; the new ones animate in starting at D−380 ms.
6. **After D:** clean up the old layer and remove its animations.

**Ways to navigate:**
- the arrows;
- the ← and → keys;
- the dots;
- the wheel (|delta| > 18, locked for 1.3 s);
- the index;
- **drag**: pointerdown on the stage, then horizontal movement over 6 px. The current figure follows at 0.35× the drag with a slight `rotate(dx·.004deg)`, the wordmark shifts −0.08×, and the cursor label reads "Next →" or "← Prev". On release past 70 px it calls go(); otherwise the figure springs back (700 ms `--out`).

## 9. Panels and overlays

**Scrim:** `rgba(20,20,20,.18)`; wipes in from the right with `clip-path` (.8 s). Esc or clicking the scrim closes everything.

### 9.1 Crop helper (used everywhere)

- A container with overflow hidden.
- Inside it, the look's `<img>` at `width: z×100%`, positioned at left 50 % / top 50 % with `transform: translate(-x·100%, -y·100%)`. This centres the hotspot point.
- Crop zooms:
  - the quick view uses z;
  - bag and flying thumbnails use .8z;
  - search results use .9z, and on hover they scale 1.08.

### 9.2 Quick view drawer

**Layout:**
- right side, `min(440px, 100vw)`, `#f2f2f2`;
- slides in with translateX(102%) → 0 (.85 s `--ease`).

**Contents, top to bottom:**
1. **Header row:** "Asker × KODA — 01/05" and a round × button that rotates 90° on hover.
2. **Close-up:** `min(46vh, 420px)` tall on a `radial-gradient(#ebebeb, #dcdcdc)`. It shows the garment crop and:
   - zooms from scale 1.25 to 1 on open (1.4 s);
   - pans slowly forever (alternating 9 s);
   - carries the label "DETAIL · 300%".
3. **Code line:** "AK 07 · AW26" (11 px, .18em, grey).
4. **Name:** 24 px, 500, -.025em.
5. **Price:** blue, 15 px.
6. **Description:** 13 px grey, max 44ch.
7. **COLOUR:** the colour name on the right, then 26 px swatch circles. The active swatch has an outer 1 px ring. Clicking a swatch flashes the image (brightness and blur).
8. **SIZE:** "Size guide" on the right, then a 4-column grid of S, M, L and XL. The selected size is filled ink.
9. **Black "Add to bag … $1,240.00" button:**
   - With no size chosen, the size grid **shakes** and "Size guide" turns red, reading "Select a size".
   - With a size, a blue fill sweeps across (scaleX, .7 s), the label reads "Added ✓", and the thumbnail flies to the bag.
10. **Accordion:** `<details>` rows for Composition, Fit & care and Shipping, each with a + that rotates 45° when open.

**Opening animation:** every child of the body rises 24 px with a clip reveal, staggered by 45 ms.

### 9.3 Fly to bag

- A fixed 120×150 crop clone starts at the source element's centre.
- It flies along an arc (WAAPI, 950 ms, `cubic-bezier(.5,0,.3,1)`):
  - start: the source, scale 1;
  - at 45 %: the midpoint, lifted 120 px, scale .7, rotated −8°;
  - end: the "Bag" label's centre, scale .08, round.
- When it lands, the bag count rolls.
- A black pill toast slides up from the bottom: a green dot and "Added — AK 07 Tech Trench, M". It hides after 2.2 s.

### 9.4 Bag drawer

- The same drawer style, headed "Bag (n)".
- **Rows:** a 76×96 crop thumbnail, the name, the meta line "Asker × KODA · Carbon · M", round − and + quantity buttons, the line price, and "Remove". Removing collapses the row's height and slides it 40 px right.
- **Empty state:** "Your bag is empty. Hover a hotspot and tap a size to add."
- **Footer:**
  - Subtotal;
  - Shipping, which is Free over $500 and otherwise $25;
  - Total, followed by a black "Checkout →" button. It is a demo, so it only shows the toast.
- **Opening animation:** rows slide in from the right with a clip, staggered by 70 ms.

### 9.5 Search overlay

- A top panel in `#efefef` that wipes down with `clip-path` (.9 s).
- **Header:** "Search the archive" and a × button.
- **Input:** huge, weight 300, `clamp(34px, 5vw, 72px)`, -.04em tracking, underlined by a 1 px ink line, placeholder "Trench, boot, parka…".
- **Counter:** "12 PIECES ACROSS 5 LOOKS" or "3 PIECES MATCHING "BOOT"".
- **Results grid:** `auto-fill`, minimum 150 px; each result is a 4:5 crop with its name and blue price. The grid filters live as you type.
- **Clicking a result:** close, go to its look, then open its quick view.
- **Opening animation:** results rise with a clip reveal, staggered by 40 ms.

### 9.6 Index overlay (grid icon)

- A full-screen `#e9e9e9` panel that wipes up from the bottom (1 s).
- **Header:** "Index — AW26 / SS27 collaborations".
- **Five columns,** each with:
  - a tall card on `radial-gradient(#f1f1f1, #dedede)` holding the full model (112 % height, anchored at the bottom). On hover the model scales 1.05 and lifts;
  - a large thin number "01" and "Asker × KODA / AW26 · 2 pcs" underneath.
- The active card has a 1 px ink outline.
- **Opening animation:** models rise 30 % (1.2 s, 70 ms stagger) and the meta wipes in.
- **Clicking a card:** close, then go to that look.

## 10. Hold-to-zoom lens

- Pointerdown on the figure's `.hit` area, then held for 200 ms without moving more than 6 px, opens a **230 px circular magnifier** that follows the pointer.
- The lens is a positioned wrapper with an inner circle that scales from 0 → 1 (.5 s `--out`).
- **Inner circle:**
  - background `#e6e6e6`;
  - box-shadow `0 26px 60px -16px rgba(0,0,0,.55), 0 0 0 4px rgba(255,255,255,.9), 0 0 0 5px rgba(0,0,0,.18)`;
  - a small "2.4×" chip near the bottom.
- **Contents:** the current look's image at 2.4× the on-screen size, offset so the point under the cursor is at the centre.
- The cursor label reads "Zoom". Releasing closes the lens.

## 11. Fullscreen mode

- Clicking "Fullscreen" (or pressing F) toggles `body.fs`. The label rolls to "Exit fullscreen".
- **The layers container** scales 1.14 from origin 50 % 90 %, so the feet stay put.
- **Everything else moves away with clip-path** (1 s `--ease`):
  - info, counter, progress line, collab mark and the nav's right group slide off;
  - the hint drops 70 px.
- The wordmark refits at 125 % width.

## 12. Custom cursor (pointer: fine only)

- Hide the native cursor.
- **Default:** a 12 px dot in `rgba(25,25,25,.6)`.
- **Over buttons:** a 40 px hollow ring with a 1 px border `rgba(25,25,25,.55)` and a faint fill.
- **While pressed:** shrinks to 8 px.
- **Label pill:** an ink pill with white uppercase text (10 px, .16em) at +16 px / +12 px. It wipes in with `clip-path`.
- **Contextual labels:**
  - "Drag" on the stage;
  - "Hold · Zoom" on the figure;
  - "Quick view" on tags;
  - "Add M" on size chips;
  - "Add look" on +;
  - "Index";
  - "View" on index cards;
  - "Open" on search results;
  - "01"–"05" on the dots;
  - "Next →" or "← Prev" while dragging.
- **Recording mode (`?rec`):**
  - the dot is a 50 px `rgba(40,40,40,.42)` disc with a 2 px white border;
  - the hover ring is 62 px;
  - pressed is 42 px;
  - the label is larger (12 px) and placed at +36 px / +26 px;
  - the loader is skipped, and the reveal starts immediately.

## 13. Intro

1. **Loader:** a full-screen ink panel.
   - The letters "OBVERSE" (`clamp(48px, 9vw, 150px)`, 500, -.05em) rise one by one, 45 ms apart.
   - A "000→100" counter runs at the bottom-right over 1.1 s.
   - The letters exit upward, and the panel wipes up with `clip-path` (1 s `--ease`).
2. **Look 01 reveal,** 450 ms into the wipe:
   - the figure rises from translateY(14vh) scale(1.08) with a bottom-up `clip-path` (1.5 s);
   - the wordmark letters roll up (40 ms stagger);
   - the nav items drop from −120 % (50 ms stagger);
   - the counter reels roll in;
   - the info lines rise;
   - the collab mark, hint, arrows and progress line clip in;
   - then the hotspots animate in.

## 14. Responsive

- **≤1100 px:** hide "Drag to browse" in the hint.
- **≤900 px:** hide "Hold to zoom", and tighten the gaps around Fullscreen and the logo.
- **≤640 px (phone):**
  - **Nav:** padding 18 px 16 px; hide Account and Fullscreen.
  - **Counter:** at top 70 px, with the progress line at 118 px.
  - **Info:** spans the bottom (left 16, right 16, bottom 20) with 16 px titles.
  - **Collab mark:** hidden.
  - **Hint:** only the dots, at top-right.
  - **Tags:** 150 px wide with 11 px text, a 18 px leg and a 24 px offset.
  - **Arrows:** at 44 % height.
  - **Index:** a horizontal scroll-snap row with 72 % wide cards.
- **Touch:** dragging uses pointer events and also works on touch. The custom cursor is hidden on `pointer: coarse`.

## 15. Do not

- Do not use any real brand name or logo; every name above is invented.
- Do not use opacity fades for the slide transition; it is clip-path wipes and transforms only.
- Do not add a device frame or outer margins; the stage is full-bleed.
- Do not let the page scroll.
- Do not use any images other than the five URLs above.