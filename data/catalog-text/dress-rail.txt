# PERLÉ — boutique rail hero: exact recreation brief

Build a single-file, one-screen fashion hero for a fictional evening-wear label called **PERLÉ**. The whole page is a photo-real blush boutique room seen straight on. A thin rose-gold clothing rail carries twelve satin and tulle dresses on wire hangers, each turned three-quarters to the side. Hovering a dress turns it to face front, pulls it forward and pushes its neighbours apart. Clicking opens a product window. "Put in bag" flies the dress, shrinking, into a glossy shopping bag that stands in the room. There is no scroll on desktop. Everything below is exact; do not add anything that is not listed.

---

## 1. Fonts (self-hosted latin WOFF2, or the Google Fonts equivalents)

| Role | Family | Weight | Google Fonts URL |
|---|---|---|---|
| Headline | Anton | 400 | https://fonts.googleapis.com/css2?family=Anton&display=swap |
| UI and body | Inter (variable) | 400–700 | https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap |
| Wordmark "PERLÉ" | Cormorant Garamond | 500 | https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap |

Use `font-display: swap`. Body text is Inter with `-webkit-font-smoothing: antialiased`.

## 2. Colour tokens

- `--ink #3A2620` (cocoa, main text and the bag pill)
- `--ink-2 #2B1813` (headline)
- `--muted #8A6F66` (secondary text)
- `--pink #F2BDB6` (the sticker)
- `--rose-gold #B88068` (the wordmark)
- `--line #E3CFC6` (hairlines in the panels)
- Darkest UI ink `#1E1310` (buttons, product titles, the toast, close buttons)
- Page background behind everything `#F2E1D8`
- Ease used everywhere: `--ease: cubic-bezier(.2,.8,.2,1)`

## 3. Assets (use these direct links; never re-host or crop locally)

Wrap every image as `https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded result URL>&w=<width>&q=85`.

| Asset | Result URL | Size | `w=` |
|---|---|---|---|
| Room plate (empty blush room: wall, three ceiling spotlights, satin curtains at both edges, glossy floor) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_132815_809092cb-b72d-4f4f-b41c-c1d24681acef.png | 2048×1360 | 2048 |
| Rail (transparent PNG, full frame, rail only) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_132917_2cb0e896-2d1e-4f5b-a87a-dfee64cda3d0.png | 2048×1360 | 2048 |
| Shopping bag (transparent PNG, full frame, bag only) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_134055_faa0ec42-af98-4a01-80bc-75e40bdfc913.png | 2048×1360 | 2048 |
| Front-view dress sheet, white background (12 dresses in a 6×2 grid) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_132814_4a2e9efb-446a-436a-b8ae-acb9fa4959b8.png | 3504×2336 | 3504 (2400 on screens < 820 px), q=92 |
| Front-view dress sheet, background removed | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_134057_ddd9f637-f6ca-4795-a12f-431d48a5db96.png | 3504×2336 | same, q=92 |
| Side-view (three-quarter) dress sheet, white background | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_142625_d5ac8927-7f44-44ea-8f4f-5f2f0ca3229b.png | 3504×2336 | same, q=92 |
| Side-view dress sheet, background removed | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_142706_368ff44a-f116-4ce4-9dd5-39f17c18c484.png | 3504×2336 | same, q=92 |
| Model photo sheet (one model wearing each dress, 6×2 cells of 584×1168, cream backdrop) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_132918_bcc5f03d-708a-463b-9f37-f300600b9c7a.png | 3504×2336 | 3504 |
| Model re-shot for dresses 2 and 7 (2 cells of 1024×2048) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_135549_9e069d90-0840-4913-b437-ab66267d0c68.png | 2048×2048 | 2048 |

### Dress sprites: bounding boxes in the 3504×2336 sheets

Each entry is `[x, y, w, h, hookX]`, where hookX is the x of the hanger hook's top pixel. The order is the same in both sheets: top row 1–6, bottom row 7–12.

- Front sheet (row top 42 / 1202):
  `[145,43,381,1091,326] [746,42,327,835,904] [1328,42,291,1026,1470] [1877,43,297,1073,2019] [2454,43,281,1093,2582] [3006,42,335,1066,3167] [181,1202,310,849,334] [638,1203,540,1043,906] [1328,1202,295,1046,1470] [1890,1202,279,1062,2023] [2436,1191,317,1056,2531] [2993,1172,349,1093,3164]`
- Side sheet (row top 54 / 1192):
  `[231,56,264,1056,368] [808,54,221,844,915] [1368,54,215,1025,1462] [1925,54,242,1047,2049] [2489,55,227,1048,2595] [3038,54,261,1111,3157] [238,1194,243,913,363] [707,1190,425,1042,917] [1346,1192,243,1034,1464] [1926,1191,232,1038,2038] [2467,1193,268,1040,2597] [3007,1174,312,1074,3170]`

### Runtime clean-up of the cut sheets (required)

The background remover leaves white inside each hanger's triangle. On load, load the white-background sheet and its cut version with `crossOrigin="anonymous"` into two canvases (same size), then for each sprite, only in the zone from 60 px above the sprite's top to 34% of its height (and 30 px either side):

1. **Front sheet only (pockets):** flood-fill 4-connected components of pixels whose white-sheet RGB are all ≥ 253 and whose cut alpha > 0. Any component larger than `250·f²` px (f = loaded width / 3504) gets alpha 0.
2. **Both sheets (haze):** four passes over the same zone. A pixel with min(RGB) ≥ 232 in the white sheet and max−min ≤ 16 gets alpha 0 if its cut alpha < 225 or any 4-neighbour already has alpha 0.

Export the cleaned canvas with `toBlob(..., "image/webp", .92)`, put it on the root as CSS variables `--sheet` (front) and `--side` (side), and use `var(--sheet)` / `var(--side)` as each sprite's `background-image`. Start with the raw cut URLs and swap when ready. Wait for both (failsafe 10 s) before showing the dresses. Then preload both model sheets.

## 4. Stage system (desktop, ≥ 820 px wide)

All scene content lives in one `1440×900` px stage (`transform-origin: 0 0`) inside a fixed full-viewport `.hero` (overflow hidden). Every coordinate below is in stage px.

- `cover = max(W/1440, H/900)`. If `900·cover − H > 24·cover` (a wide, short screen, where cover would crop the headline or caption), use `u = H/888` instead, else `u = cover`.
- `ox = (W − 1440u)/2`, `oy = (H − 900u)·0.4` (when cropping vertically, 40% comes off the top). Stage transform `translate(ox, oy) scale(u)`.
- Two extra copies of the plate, `transform: scaleX(-1)`, at `left: -1440px` and `left: 1440px`, so on wide screens the room continues past each side with mirrored curtain, wall and floor.
- The nav sits outside the stage, pinned to the viewport with its own unit `--n = clamp(min(W/1440, H/900), .72, 1.35)`, offset inward by `--nx = max(ox, 0)` so it lines up with the stage.

### Layers inside the stage, in paint order

1. **Plate:** `0, 0, 1440×900`, stretched to fill.
2. **Rail:** the full-frame rail cut-out at `left 17.7, top 9.9, width 1413.8, height 902.2` (`max-width: none`, pointer-events none). This places its posts at x 309 / 1350, the top bar at y ≈ 294 and the feet at y ≈ 812.
3. **Headline** `h1.hl`: two block spans, "Dress up." / "Glow up.", uppercase Anton 94.5 px, line-height 83 px, colour `--ink-2`, at `left 83.4, top 122.5`. Use `transform: scaleX(.913)` from the top-left so the ink spans x 86–400 (line 1) and 86–386 (line 2), with caps top at y 122 and 205.
4. **Sentence** `p.sub`: "Soft satin, pearl buttons and a little shine for tonight." Inter 16.3 px / 24.5 px, `--ink`, `left 443, top 184.7, width 232`, wrapping after "and".
5. **Dresses:** see §5.
6. **Hit columns:** one transparent `<button>` per dress, `top 276, height 592`, z 50 (see §6).
7. **Sticker** `button.sticker`: "Peek at this piece", uppercase Inter 10 px weight 700, letter-spacing .11em, `--pink` background, `--ink` text, padding 7/13/6, `box-shadow 0 3px 8px rgba(96,52,38,.18)`, z 45. Hidden: `opacity 0; transform: translate(-50%,0) rotate(-5deg) scale(.9)`. Shown: `opacity 1; scale(1)`, transitions .16 s opacity / .2 s transform.
8. **Bag** `button.bag`: hit box at `left 84.4, top 667.7, 205.3×197.2`, z 30, `transform-origin: 50% 100%`.
   - It holds the full-frame bag cut-out at `left -78.3, top -642.6, width 1383.2, height 891`.
   - A soft contact shadow `::before`: an ellipse 22 px tall, 6 px below the bottom, from 4% to 98% of the width, `radial-gradient(closest-side, rgba(110,62,46,.32), transparent)`, blur 3 px.
   - A count badge: a 40 px circle `#F7C9C4` with `--ink` Inter 15/500 text, at `left 182.6, top 45.3` inside the box, `box-shadow 0 2px 6px rgba(96,52,38,.14)`.
9. **Credit:** "Created by Perlé Atelier.", Inter 10.5 px, `--ink` at 80% opacity, right 38, top 861.

### Nav (fixed, z 20, `--n` units)

- **Wordmark** "PERLÉ": Cormorant Garamond 500, 46n px, letter-spacing .14em, `--rose-gold`, line-height 1, at `left: nx + 84n, top: 32.5n`. It is a link to `/`.
- **Pill** "YOUR BAG" + count:
  - Box: `right: nx + 62n, top 20n, height 42n`, fully rounded, background `--ink`, text `#FBF1EC` Inter 14n.
  - Spacing: padding `0 8n 0 19n`, gap 14n.
  - Count: a 27n circle `#F8D3CF`, `--ink`, 13n/500.
  - Clicking it opens the bag panel.

### Caption under the rail (outside the stage, positioned in stage coordinates)

- Box: centred at stage x 839, top `min(oy + 845u, H − 54u)`, width 520, `transform: translate(-50%,0) scale(u)`, z 35, text centred.
- **Line 1:** Inter 16/600 `--ink`, letter-spacing −.005em. Idle text "Find your after-dark slip."
- **Line 2:** Inter 11 `--muted`, 3 px gap. Idle text "Hover to browse. Click to see it on." (on `(hover: none)` devices: "Tap to browse. Tap again to see it on.").
- **Swapping:** add `.swap` (both lines fade to 0 over .14 s), change the text after 110 ms, then remove `.swap`.
- **Toast** inside it, at top 16 px, centred:
  - Look: `#1E1310` background, `#FBF1EC` Inter 12/600, padding 9×18, fully rounded.
  - Hidden: `opacity 0, translateY(8px)`.
  - Shown for 2.6 s: opacity .22 s, transform .3 s.

## 5. The dresses

Scale: sheet px × **S = 0.44** = stage px. The hook line is **HOOK_Y = 291**. The usable rail runs **RAIL_L = 347** for **RAIL_W = 970** px. **FLOOR = 838** is the lowest a pulled-forward hem may reach.

Each dress is a zero-size wrapper `.dress` at `left: cx (hook x), top: 291`, z-index = index + 1, `transition: left .34s var(--ease), opacity .22s linear`. It holds two layers (`.art`, absolute, background from the sheet):

- `.side`, from the side sheet with row top 54/1192:
  - placement: `left = −(hookX − x)·S`, `top = (y − rowTop)·S`
  - size: `w·S × h·S`
  - background: `background-size: 3504S × 2336S`, `background-position: −x·S −y·S`
  - `transform-origin: (hookX − x)·S  −(y − rowTop)·S`, which is the hook point
- `.front`, the same construction from the front sheet with row top 42/1202.

Both layers get `filter: drop-shadow(0 7px 9px rgba(96,52,38,.16))` and the transition `transform .22s var(--ease), opacity .18s linear, filter .22s var(--ease)`.

- **Rest:** `.side` opacity 1, no transform. `.front` opacity 0, `transform: scaleX(.58)`.
- **Hovered (`.on`):** wrapper z 40 (!important).
  - `.side` → opacity 0, `scale(var(--k)) scaleX(.55)` (it squeezes out).
  - `.front` → opacity 1, `scale(var(--k))` (it opens up into the front view and grows from the hook), shadow `drop-shadow(0 22px 24px rgba(96,52,38,.26))`.
  - Per-dress `--k = min(1.42, (838 − 291) / (frontH·S))`, so short dresses grow 1.42× and long gowns stop with the hem at y 838.

### Slots (`place()`)

The dresses still on the rail are laid out left to right in slots:

- **At rest:** every slot is `970/n`, and the dress sits in the slot centre: `cx = RAIL_L + (k + .5)·step`.
- **One dress hovered:** its slot is `G = min(frontW·S·k·0.8 + 28, 970·0.42)` and the others share `(970 − G)/(n − 1)`. This pushes the dresses on its left further left and the ones on its right further right; the `left` transition animates the push.
- The hit buttons take the same slots: `left = slot start, width = slot width`.

### The twelve dresses (name, price, colour line, description, fabric & fit)

1. Golden Hour — $128 — Peach satin — "A liquid peach slip that pools at the hem. Cowl neck, bias cut, made for long dinners." — "Heavy satin with a soft fishtail. True to size; the bias cut skims the body."
2. Pearl Drop — $96 — Shell pink — "A shell-pink mini with pearl-strung straps and a pearl hem that catches every light." — "Satin with strung glass pearls. Fitted through the body; size up for room."
3. Champagne Toast — $112 — Champagne — "Champagne satin gathered at one side, so the dress sits like a pour of bubbles." — "Satin with side ruching. True to size; the ruching gives a little stretch."
4. First Light — $124 — Pearl white — "A pearl-white slip with a beaded neckline. Quiet in daylight, luminous at night." — "Silky satin, pearl-beaded straps. True to size; lightly lined."
5. Rose Bloom — $134 — Dusty rose — "Dusty-rose satin ruched up the hip and finished with a hand-tied rosette." — "Satin with an asymmetric draped hem. Fitted; size up between sizes."
6. Velvet Hour — $108 — Mauve taupe — "A mauve-taupe cowl slip with a long, easy line from strap to hem." — "Washed satin, bias cut. True to size with a relaxed fall."
7. Lace Whisper — $92 — Ivory lace — "An ivory lace mini with a scalloped hem for garden parties and late cake." — "Corded lace over a soft lining. True to size."
8. Tutu Dream — $148 — Blush tulle — "A corset bodice over clouds of blush tulle. The most dramatic piece on the rail." — "Boned satin bodice, five layers of tulle. Size to your bust."
9. Moonbeam — $116 — Ivory gold — "A warm ivory slip with pearl straps and a glossy, moon-bright finish." — "Satin with a pearl neckline. True to size; lightly lined."
10. Petal Pull — $126 — Rose pink — "Rose-pink satin ruched along one side with a soft rosette at the hip." — "Satin with side ruching. Fitted; size up for room."
11. Lilac Haze — $104 — Pale lilac — "A pale lilac slip that looks pink in candlelight and silver at dawn." — "Fluid satin, bias cut. True to size."
12. Garden Party — $98 — Cream floral — "A cream slip printed with tiny blush blooms and finished with tie straps." — "Printed satin with adjustable ties. True to size."

## 6. Interactions

### Hover (mouse) and first tap (touch)

- `pointerenter` on a hit column (mouse only) → `setHover(i)`.
- `pointerleave` on the hits container → `setHover(-1)`.
- Keyboard focus on a hit also hovers.
- `setHover(i)` removes `.on` from the previous dress, sets the new one and calls `place()` (the push). It then adds `.on` and shows the sticker:
  - sticker `left = cx`, `top = 291 + frontH·S·k − 18`, tilted −5°
  - caption becomes "Name · $Price" / "Colour / XS – XL"
- `setHover(-1)` hides the sticker and restores the idle caption.
- **Click:** on mouse it opens the product window. On touch/pen, the first tap on a dress that isn't hovered only hovers it, and the second tap opens it. Clicking the sticker opens the hovered dress.

### Product window (`.scrim` + `.pdp`)

**Open:**
- `body.dim` blurs the hero and nav (`blur(11px) saturate(.96)`, .22 s).
- The scrim `rgba(58,38,32,.10)` fades in over .2 s.
- The panel goes from `scale(.955)` and opacity 0 to normal (.24 s ease / .2 s).
- Focus moves to the close button.

**Panel:** `min(66vw,1000px) × min(78vh,640px)`, radius 22, background `linear-gradient(135deg,#FBF5F1,#F7ECE6 60%,#F8E3E0)`, `box-shadow 0 30px 80px rgba(70,35,25,.22), 0 4px 14px rgba(70,35,25,.08)`. Two columns, 46% / 54%.

**Left column, the photo:**
- Background `#EEE0D4` (`#E9DCD0` for dresses 2 and 7).
- "Modelled" view:
  - one model-sheet cell, scaled to the column height and centred in a clip box as wide as the scaled cell
  - dresses 2 and 7 use the re-shot cells 0 and 1 instead
- "On its hanger" view: the front sprite, scaled to fit 80% of the box, centred, lifted 24 px, `drop-shadow(0 10px 14px rgba(96,52,38,.18))`.
- The two views crossfade over .2 s.
- Toggle pills, centred 18 px from the bottom: "Modelled" / "On its hanger".
  - Size: 30 px tall, padding 0 14, Inter 11.5/600, gap 6.
  - Active: `#1E1310` with `#FBF1EC` text. Inactive: `#FFF8F4` with `--ink` text.

**Right column (padding 52/48/36/40), in order:**
- "PERLÉ" in Cormorant 22 px, .2em, rose-gold
- name: Inter 32/700, −.02em, 30 px gap above
- price "$128.00": 17/600, 18 px gap above
- description: 14/1.55, max 400 px
- "Find your size": 12/700, 24 px gap above
- five size chips XS S M L XL:
  - size 42×36, 1 px `#DCC3BA` border, `#FFF9F6` background, 12.5/500, gap 8
  - **M is preselected on every open**
  - selected chip: `#1E1310` with `#FBF1EC` text
- hint "Choose a size to make it yours.": 11.5 px `--muted` (turns `#B4473C` if no size is chosen)
- "Put in bag" button: 48 px, `#1E1310`, uppercase 12.5/700, .12em, max 440 px
- "Fabric & fit" disclosure:
  - a `<details>` with a 6 px triangle that rotates 90° when open, a hairline above it
  - text 12.5/1.55
- line "Late nights deserve a soft shine.": 11.5 `--muted`

**Close:** the round 34 px close button (`#1E1310`, × icon), Esc, or a click on the scrim.

### Put in bag: the fly into the bag (as in the original reel)

1. The button turns to "In your bag ✓" (`#5E3A30`). After 380 ms the window closes, with the blur and scrim fading.
2. Disable the hit columns. Make sure the chosen dress is hovered: front-on, pulled forward, neighbours pushed. Hide the sticker. On phones, smooth-scroll the rail to `left: 0` so the bag is on screen.
3. Animate the dress wrapper with Web Animations: delay 420 ms, duration 820 ms, `cubic-bezier(.45,.05,.55,.95)`, fill forwards.
   - Distances: `dx = 186 − cx` and `dy = 712 − 291 − frontH·S·k·0.16·0.55`. The bag mouth is at stage (186, 712).
   - Keyframes:
     - 0: `translate(0,0) scale(1)`
     - .2: `translate(.06dx, −34px) scale(.92)` (it lifts off the hook)
     - .48: `translate(.45dx, .2dy) scale(.6)`
     - .76: `translate(.85dx, .72dy) scale(.3)`
     - .9: `translate(dx, dy) scale(.16)`
     - 1: `translate(dx, dy + 46px) scale(.144)`
   - At 55% of the flight add `.flying` (z 26, below the bag's z 30), so it drops in behind the bag's front.
4. **On finish:**
   - Bag dip-and-settle, 420 ms ease-out: `translateY(0) scale(1,1)` → (.35) `translateY(4px) scale(1.05,.95)` → (.7) `translateY(-2px) scale(.98,1.02)` → none.
   - Bag count pop: scale 1 → 1.35 → 1 over 380 ms.
   - Hide the dress (`.gone`, with transitions off for one frame so it doesn't flash back), clear the hover, cancel the animation and re-enable the hits.
   - Then mark it off the rail, call `place()` so the gap closes (.34 s), update both counts and show the toast "<Name> is in your bag."

### Bag panel

The bag or the pill opens it (any product window closes first). Same scrim and blur.

- **Panel:** `min(430px,92vw) × min(86vh,720px)`, padding 40/30/26.
- **Title:** "Your pearl-pink picks.", Inter 27/600, −.025em.
- **Rows:**
  - a 62×80 thumbnail (`#F3E6DE`, radius 10, the front sprite fitted to 54×70)
  - name 14/600
  - "Colour · Size M" 12 `--muted`
  - price 13.5/600
  - an underlined "Remove" 11.5 `--muted`, which puts the dress back on the rail and calls `place()`
  - hairlines `--line`
- **Empty state:** "Nothing on hold yet. Pick a dress from the rail."
- **Footer:** "Subtotal" with a bold 19 px total.

## 7. Load sequence (one timeline, run once)

The root starts with class `js-intro`, which hides the headline spans, sentence, dresses, bag, logo, pill and caption. On the first frame, remove it and run Web Animations with `fill: backwards` and the ease `cubic-bezier(.2,.8,.2,1)`:

| Element | Keyframes | Duration | Delay |
|---|---|---|---|
| Logo | opacity 0 → 1, translateY(−8px) → 0 | 700 ms | 60 ms |
| Pill | opacity 0 → 1, translateY(−8px) → 0 | 700 ms | 120 ms |
| Each headline line | from opacity 0, translateY(38%), `clip-path: inset(0 0 100% 0)` to fully shown | 950 ms | 140 ms + 120 ms per line |
| Sentence | opacity 0 → 1, translateY(10px) → 0 | 900 ms | 380 ms |
| Bag | opacity 0 → 1, translateY(10px) → 0 | 800 ms | 520 ms |
| Caption | opacity 0 → 1 | 700 ms | 800 ms |
| Dresses (once both cleaned sheets are ready) | opacity 0 → 1, translateY(−14px) → 0 | 760 ms | 45 ms per dress |

Failsafe: remove `js-intro` after 2.6 s regardless.

## 8. Phones and small screens (< 820 px)

- The body scrolls vertically. The hero is in normal flow (min-height 100svh) on `radial-gradient(130% 55% at 50% 0%, #F6E5D9, transparent 70%), #EED7C9`. The room image appears only once, inside the rail strip.
- **Nav:**
  - It sits absolutely at the top.
  - Wordmark at left 20 / top 22, 27 px.
  - Pill at right 16 / top 14: 38 px tall, 12.5 px text, gap 10, padding 0 6 0 15, a 26 px count.
- **Copy block** (padding 92/20/6), replacing the in-stage headline and sentence:
  - headline: Anton `clamp(56px,17vw,84px)` / .87, −.3px
  - sentence: 15.5/1.48, max 300 px, 14 px gap
- **Rail strip** `.rack`:
  - Height: start from `min(64svh,560px)` to get `u = max(height/684, W/1148)`, then set its height to `684u`.
  - The track is `1440u` wide with overflow hidden, so you swipe through one room only. The mirrored plates are hidden.
  - Stage transform `translate(0, −200u) scale(u)` (it shows stage y 200–884).
  - Horizontal swipe only (`overflow-x: auto`, no scrollbar, `overscroll-behavior-x: contain`), starting at `scrollLeft = 292u` (the rail start). Swipe left for the bag.
  - Edges: `mask-image: linear-gradient(to bottom, transparent 0, #000 64px, #000 calc(100% − 36px), transparent 100%)`, so the strip fades into the page colour with no seam.
- **Caption:** in flow below the strip (padding 4/20/26, min-height 92), toast at top 52.
- **Product window and bag panel:** full screen (100vw × 100dvh, no radius). The product window stacks the photo (47dvh) above the details (padding 24/22/30, title 27 px).
- **Taps:** the first tap previews (turns the dress front-on and pushes its neighbours), the second opens it.

## 9. Reduced motion

Under `prefers-reduced-motion: reduce`, turn off all transitions and animations. The intro is skipped (the dresses just appear once the sheets are ready), and Put in bag bags the dress immediately with no flight.