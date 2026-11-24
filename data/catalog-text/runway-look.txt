# HERO PROMPT — "Night ’26 Shell" runway shop-the-look section (exact recreation)

Build one self-contained `index.html` with inline `<style>` and `<script>`, no framework and no build step. It must recreate the "Night ’26 Shell" shop-the-look section exactly as specified below.

It is a dark fashion e-commerce section in two parts:

- **Runway (left).** Six full-body models of young Korean men and women in black technical outerwear stand in a tightly packed row on a dark seamless floor, with mirror reflections under their feet.
  - The centre model is full size and razor sharp.
  - Each step away from the centre is smaller, standing further back (feet higher), more blurred and darker. The outermost models fade out like a ghosted back row.
  - Clicking a side model, dragging, using the arrows or the timeline, or autoplay slides the whole row as one continuous carousel with a fast ease-out and a long soft settle.
- **Sidebar (right).** "In this look" lists the centre model's two pieces as cards. On every change the cards blur out to skeleton shimmers and refill one after the other.
  - Below the cards sits a "Complete the look" bundle price with 10% off and a cobalt "ADD FULL LOOK TO BAG" button.
  - Adding pieces flies the thumbnail into the bag icon in a floating pill nav.

**Rules:**
- Every number below is load-bearing. Where a value is given, use exactly that value.
- The layout is **fully fluid and responsive**: no fixed canvas and no scaling of a fixed stage.
- Do not add anything that is not described here.

**Page basics:**
- `<title>`: `Night ’26 Shell — Shop the Look`.
- `lang="en"`, UTF-8.
- Viewport: `width=device-width,initial-scale=1`.

---

## 1. Assets (use these exact URLs)

All six images are 1360×2048 PNG cut-outs on a **transparent background**, served as WebP (alpha preserved) through the `images.higgs.ai` resizer at `w=900`. Build every URL with this helper:

```
CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'
H(file, w) = 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(CDN + file) + '&w=' + w + '&q=85'
```

What all six images share:
- Each shows one model standing straight, front-facing, arms down, head to shoes.
- They are registered to the same framing: feet at about y 2000 of 2048, figure centred on x 680.
- The same image is used for the runway figure and for the sidebar thumbnails (cropped with background-position).

| # | Look name | Model / outfit | File |
|---|---|---|---|
| 0 | Cobalt Shell | Korean woman, long black hair; cobalt-blue rain shell, black wide cargo pants, black boots | `hf_20261113_092602_2edcdd38-47f9-40ca-b2f0-3d1196e356ed.png` |
| 1 | Silver Signal | Korean man; silver metallic hooded down parka, black straight trousers, black sneakers | `hf_20261113_092602_489603db-d621-4dac-8dad-0aaf42f0d15c.png` |
| 2 | Night Run | Korean man; black hooded technical shell, black wide cargo pants, black boots | `hf_20261113_092516_b5bd2ecc-b375-46e1-bb83-eca3e17f818b.png` |
| 3 | Long Hour | Korean woman, low ponytail; knee-length black hooded parka, black trousers | `hf_20261113_092601_1b201cc2-e88d-4501-80a3-6907b149777a.png` |
| 4 | Gallery Opening | Korean man, buzz cut; black quilted down vest over a black hoodie, graphite cargo pants | `hf_20261113_092603_fceeb6f1-9ee2-4883-8e0f-3327ae0bab7a.png` |
| 5 | Soft Static | Korean woman, black bob; graphite fleece half-zip, black pleated wide trousers | `hf_20261113_092602_91acecdf-be55-4f27-b413-012a4615763a.png` |

Full URLs, in order 0–5:
1. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092602_2edcdd38-47f9-40ca-b2f0-3d1196e356ed.png&w=900&q=85
2. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092602_489603db-d621-4dac-8dad-0aaf42f0d15c.png&w=900&q=85
3. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092516_b5bd2ecc-b375-46e1-bb83-eca3e17f818b.png&w=900&q=85
4. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092601_1b201cc2-e88d-4501-80a3-6907b149777a.png&w=900&q=85
5. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092603_fceeb6f1-9ee2-4883-8e0f-3327ae0bab7a.png&w=900&q=85
6. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_092602_91acecdf-be55-4f27-b413-012a4615763a.png&w=900&q=85

**Piece data per look.** Each look has exactly 2 pieces, listed as: name, price in USD, thumbnail crop rows `[y0, y1]` in the 1360×2048 source, and pin position as a fraction of the model box `[x, y]`.

| # | Piece 1 | Piece 2 |
|---|---|---|
| 0 | Cobalt Rain Shell, 425, `[300,1080]`, pin `[.60,.30]` | Wide Cargo Pant, 165, `[1020,2010]`, pin `[.38,.70]` |
| 1 | Mirror Down Parka, 650, `[230,1100]`, pin `[.62,.30]` | Straight Tech Trouser, 180, `[1040,2010]`, pin `[.38,.72]` |
| 2 | Storm Hooded Shell, 390, `[230,1040]`, pin `[.62,.30]` | Wide Cargo Pant, 165, `[1000,2010]`, pin `[.38,.70]` |
| 3 | Hooded Long Parka, 720, `[260,1440]`, pin `[.62,.36]` | Straight Tech Trouser, 180, `[1360,2010]`, pin `[.40,.82]` |
| 4 | Quilted Down Vest, 310, `[240,1110]`, pin `[.58,.30]` | Graphite Cargo Pant, 175, `[1060,2010]`, pin `[.38,.70]` |
| 5 | Graphite Fleece Half-Zip, 210, `[320,1000]`, pin `[.60,.28]` | Pleated Wide Trouser, 195, `[940,2010]`, pin `[.40,.70]` |

**Floor-glow tone per look**, used in a radial gradient as described in section 4:

| Look | Tone |
|---|---|
| 0 | `rgba(40,80,255,.30)` |
| 1 | `rgba(200,210,230,.24)` |
| 2 | `rgba(70,78,96,.32)` |
| 3 | `rgba(80,86,100,.30)` |
| 4 | `rgba(90,96,110,.30)` |
| 5 | `rgba(110,112,120,.26)` |

**Loading:**
- Preload all six with `new Image()` and `decode()`.
- The initial centre look is **index 2 (Night Run)**.

---

## 2. Font and tokens

**Font:**
- **Inter** 300 / 400 / 500 / 600 from Google Fonts, with `display=swap`.
- Fallback stack: `"Helvetica Neue", Arial, sans-serif`.
- Antialiased, and `user-select: none` on the page.

**Tokens:**
```
--bg:#0d0e10  --panel:#121316  --card:#1b1d21  --card-2:#24272c
--ink:#f2f3f5 --mute:#8a8e96   --dim:#5b5f67   --line:rgba(255,255,255,.08)
--blue:#1f4dff --blue-2:#3d64ff
--sw: clamp(300px, 31vw, 500px)      /* sidebar width */
```

---

## 3. Page layout (fluid)

**Desktop:**
- `html, body`: full height, `overflow: hidden`, background `--bg`.
- `#stage`: `position: fixed; inset: 0; display: grid; grid-template-columns: minmax(0,1fr) var(--sw)`.
- Column 1 is `#runway` (relative, 100% height, `overflow: hidden`). Column 2 is `#side`, the sidebar.

**Phone layout (≤ 820px):**
- `--sw: 100vw`; the page scrolls (`overflow: auto`, height auto).
- `#stage` becomes `display: block`.
- `#runway` height is `min(86svh, 760px)`.
- The sidebar stacks below it with a top border instead of a left border, and natural height.
- The title moves to `top: 78px` so it sits under the nav pill, which is absolutely centred.
- Timeline labels collapse to just numbers: segments 22px wide, the active one 44px, look names hidden.
- The VIEW cursor is disabled.

At ≤ 1100px, timeline segments are 30px wide and the active one is 120px.

---

## 4. Runway background and text

- **`#runway` background,** two layers:
  - `radial-gradient(60% 46% at 50% 44%, rgba(70,78,96,.32), transparent 70%)`;
  - over `linear-gradient(180deg, #131418 0%, #101114 56%, #0a0b0d 74%, #0b0c0e 100%)`.
- **Horizon hairline:** a 1px `::after` at `top: 66%` with `linear-gradient(90deg, transparent, rgba(255,255,255,.07), transparent)`.
- **`#floorGlow`:**
  - absolute, `left: 52%; top: 69%; width: 70%; height: 24%; transform: translateX(-50%)`, round;
  - background `radial-gradient(closest-side, <look tone>, transparent)`, with a `.9s` background transition when the look changes.
- **Title** (top-left, z 25):
  - position `left: clamp(20px, 4.4%, 48px); top: clamp(22px, 4.2vh, 38px)`, max-width 46%;
  - `h1` "Night ’26 Shell": Inter 400, `clamp(26px, 3.6vw, 40px)`, letter-spacing −.025em, line-height 1;
  - `p`: 13px `--mute`, 12px top margin: "Six looks, styled head to toe. Tap a pin to see the piece."

---

## 5. Floating nav pill

- **Position:** fixed, horizontally centred over the runway: `left: calc((100vw - var(--sw))/2); translateX(-50%); top: clamp(14px, 2.4vh, 22px)`.
- **Box:** height 46, radius 24, padding 0 8.
- **Surface:**
  - background `rgba(28,30,35,.78)`, 1px `--line` border, `blur(14px)` backdrop;
  - shadow `0 10px 30px -12px rgba(0,0,0,.7)`.
- **Contents,** in order:
  - menu (two lines);
  - a 1×20 separator;
  - logo: a white stylised bird/wing mark, 40×20, in a 56px-wide button;
  - a separator;
  - search, account and bag icons, each 18px white 1.6-stroke line icons in 38px round buttons with an 8% hover fill.
- **Bag badge:** a 16px blue pill with a white 10px/600 count at the top-right of the bag button.
  - It is hidden at count 0 via `scale(0)` and springs in with `.35s cubic-bezier(.3,1.8,.5,1)`.
  - Every change plays a `bump` (scale 1.5 at 40%).

---

## 6. The carousel (the core of the section)

### 6.1 Geometry, measured from the runway each time it resizes

```
narrow = innerWidth <= 820
MH  = min(runwayH * (narrow ? .66 : .705), runwayW * (narrow ? 1.05 : .92))   // model box height
MW  = MH * 421/634                                                           // model box width
U   = MH / 634                                                               // unit scale
CX  = runwayW * (narrow ? .5 : .523)                                         // centre x
FEET= runwayH * (narrow ? .86 : .85)                                         // centre model's feet y
```

- Set `--mh` and `--mw` CSS variables from these values.
- Re-measure on `resize` and with a `ResizeObserver` on `#runway`.

### 6.2 Model element

- `.model`: absolute, `width: var(--mw); height: var(--mh); margin-left: calc(var(--mw)/-2)`, `transform-origin: 50% 100%`, `pointer-events: none`.
- It contains:
  - **`.fig`**, filling the box: the look image at `center bottom / contain`, with `-webkit-box-reflect: below -2px linear-gradient(transparent 68%, rgba(255,255,255,.22))`. This produces the floor reflection.
  - **`.hit`**, the only clickable area: `left: 29%; right: 29%; top: 3%; bottom: 2%; pointer-events: auto; cursor: none`, with the default cursor on the centre model. This body-sized hit area means the centre model's transparent margins never block clicks on its neighbours.

### 6.3 Continuous position and depth table

`pos` is a float carousel position (start 2). Each frame, for each model `i`:
- `d = wrap(i − pos)` into `[−3, 3)`;
- interpolate linearly through this table by `a = |d|`.

| a | x offset | scale | feet lift | blur px | brightness | opacity |
|---|---|---|---|---|---|---|
| 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| 1 | 160 | .94 | 12 | 1.2 | .90 | 1 |
| 2 | 284 | .85 | 59 | 4 | .72 | 1 |
| 3 | 362 | .78 | 95 | 8 | .55 | .55 |
| 3.6 | 392 | .74 | 110 | 11 | .48 | 0 |

- x offset and lift are multiplied by `U`; blur is multiplied by `max(.6, U)`. The x offset takes the sign of `d`.
- `transform: translate3d(CX + x, FEET − lift − MH, 0) scale(sc)`.
- `filter: blur(bl) brightness(br)`; `opacity: op`; `z-index: 100 − round(a·10)`.
- The model with `|d| < .5` gets class `c` (centre).

The result is that neighbours overlap the centre slightly, and the row recedes into depth: feet higher, smaller, blurrier, darker. The outer pair fades away, and models wrap round smoothly from one side to the other.

### 6.4 Transition

`go(i, dir)`:
1. Take the shortest signed distance `d = wrap(i − pos)`. If `dir` is given and the distance is exactly 3, use that direction.
2. Tween `pos` from its current value to `pos + d` over `760 + (|d| − 1)·140` ms with **`ease = t => 1 − (1 − t)^4.2`**. This is a fast ease-out: about 60% of the travel happens in the first 150 ms, followed by a long soft settle.
3. On start: set `active`, hide the pins, hide the VIEW cursor, swap the sidebar cards (§8.2), update the timeline, restart the autoplay timer, and set the floor-glow tone.
4. On end: show the pins.

### 6.5 Ways to change looks

- Click a side model's `.hit` area.
- **Drag / swipe** on the runway:
  - `pos = startPos − dx/(170·U)`;
  - on release, snap with `go(round(pos))`, and swallow the click that follows a drag;
  - `touch-action: pan-y` on the models layer.
- The ← and → buttons step one look in that direction, and the ArrowLeft / ArrowRight keys do the same.
- Click a timeline segment to jump to that look.
- Autoplay (§7).

### 6.6 VIEW cursor

`#view` is fixed and follows the pointer:
- 58px white circle centred on the pointer;
- the text `VIEW` inside: 8px/600, .18em tracking, colour `#0d0e10`;
- `scale(0)` → `scale(1)` with `.35s cubic-bezier(.3,1.4,.5,1)`.

**Every animation frame**, run `elementFromPoint(lastPointer)`. Show the circle only when the pointer is over a non-centre model's hit area, no tween is running and no drag is in progress. Re-checking every frame keeps it correct while models slide under a still cursor.

### 6.7 Pins (centre model only)

- **Marker:**
  - two 24px glass dots per look, at the pin fractions of the centre model box;
  - fill `rgba(255,255,255,.16)`, 1px white border, `blur(6px)` backdrop, 6px white core;
  - a `::before` ring pulsing (scale .6 → 1.7, 2.2 s).
- **Appearing:** each springs in with `scale 0 → 1` and `.45s cubic-bezier(.3,1.6,.5,1)`, staggered 120 ms + k·120 ms after a transition ends.
- **Tooltip:** sits to the right, in a dark glass box `rgba(20,22,26,.85)`, and shows "**Piece name**  $price.00" (the price muted).
- **Linking with the sidebar:**
  - Hovering a pin highlights its sidebar card: blue border `rgba(61,100,255,.8)` and background `#1d2130`.
  - Hovering a card shows its pin's tooltip.
  - Clicking a pin toggles its tooltip.

---

## 7. Bottom controls and autoplay

`#ctrl` geometry:
- absolute, `left / right: clamp(16px, 4.4%, 48px); bottom: clamp(14px, 2.8vh, 24px)`;
- height 40, flex, gap `clamp(12px, 2.5%, 28px)`, z 20.

**Contents:**
- **←** arrow button: 40px round, 1.4-stroke long arrow, 8% hover fill, `scale(.92)` while pressed.
- **Timeline:** six `.seg` buttons in a flex row (gap 6, max-width 520).
  - Each segment is a 2px bar (track `rgba(255,255,255,.18)` with a white fill `<i>`) over a 10px label `01`…`06`.
  - Segments are 52px wide. The active one widens to 150px over `.6s cubic-bezier(.7,0,.2,1)` and shows its look name after the number (white, weight 500, fading in).
  - Earlier segments are filled 100%.
- **Pause / play** button (36px), pushed right with `margin-left: auto`. Its icon toggles between two bars and a triangle. Space also toggles it.
- **→** arrow button.

**Autoplay:**
- On by default.
- Dwell is 5200 ms: the active segment's fill grows from 0 to 100% and then calls `go(active + 1, +1)`.
- The timer restarts on every change.
- It is paused while a drag is in progress, and stops when paused.

---

## 8. Sidebar `#side`

- **Panel:** background `--panel`, 1px `--line` left border.
- **Padding:** `clamp(20px,3.3vh,30px) clamp(16px,1.9vw,28px) clamp(18px,3vh,28px)`.
- **Layout:** flex column, `overflow: auto`.

### 8.1 Content

- **Header:**
  - "In this **look**" at 20px/400, with "look" in `--mute`;
  - right-aligned `2 PIECES` at 10px/500, .14em tracking, `--mute`.
- **Two cards** (gap 12, 22px top margin):
  - Card: height `clamp(104px, 13.8vh, 124px)`, radius 16, `--card` fill, 1px `--line` border, padding 12, gap 18.
  - Thumbnail: 4:5 (height = card height − 24), radius 10, `--card-2` fill. It is the look image cropped to that piece's `[y0, y1]` rows, centred horizontally on source x 680 (scale `k = min(h/(y1 − y0), w/560)`).
  - A tiny `1` / `2` index sits at its top-right.
  - Name at 14px; price `$NNN.00` at 13px `--mute`.
  - A 32px round **+** button at the bottom-right.
- **Bundle** (`margin-top: auto`):
  - "Complete the look" at 13px/500;
  - "Bundle all 2 and save 10%" at 11px `--mute`;
  - on the right, the struck-through sum (11px `--dim`) and the bundle price (22px), which is the sum × 0.9.
  - Both prices **count** from the old value to the new one over 600 ms (ease-out cubic).
- **CTA:**
  - 54px tall, full width, radius 28, `--blue` fill (hover `--blue-2`, pressed `scale(.985)`);
  - `ADD FULL LOOK TO BAG` at 12px/600 with .08em tracking, plus a long arrow that slides 4px on hover.
  - On click a white overlay sweeps across it (`scaleX` 0 → 1, .7 s).

### 8.2 Card swap animation (on every look change)

1. Add `.out` to both cards. The thumbnail, text and + button go to opacity 0, `blur(6px)` and `translateY(6px)`. At the same time a skeleton layer fades in: grey blocks with a moving shimmer, `linear-gradient(90deg, #202328, #2a2e34, #202328)` at 200% size, 1.1 s linear loop.
2. After 420 ms, fill in the new look's data.
3. Remove `.out` from card 1 at +180 ms and from card 2 at +320 ms, so the new content comes back in sequence. Use `.35s` opacity/filter transitions and a `.45s cubic-bezier(.2,.8,.2,1)` transform.

### 8.3 Bag behaviour

- **"+" on a card:**
  - Adds that piece. The button turns blue and its plus rotates 45° into an ×.
  - A 'flyer' copy of the thumbnail flies to the bag icon, shrinking to a 12px dot over `.75s cubic-bezier(.6,0,.2,1)`.
  - After 700 ms the bag count increments with a bump.
  - Toast: "Piece name added".
  - Clicking again removes the piece and toasts "Removed from bag".
- **Full-look button:**
  - Adds every missing piece, with flyers staggered 120 ms apart.
  - Toast: "Look name — full look added · saved 10%", or "Full look already in your bag".
  - The label becomes `FULL LOOK IN BAG` when both pieces are in the bag.
- **Toast:**
  - Fixed, centred over the runway at `top: clamp(70px, 9vh, 84px)`.
  - Dark glass `rgba(28,30,35,.92)`, 12px text.
  - Slides 10px down into place; auto-hides after 1.7 s.

---

## 9. Acceptance checklist

- [ ] It is truly responsive, with no fixed-size scaled stage:
  - 1920×1080 and 1280×720 fill the screen;
  - tablet and phone stack the runway above the sidebar with no horizontal scroll.
- [ ] The runway is a packed, overlapping depth row: the centre is sharp and largest, and neighbours are smaller, feet higher, progressively blurred and darker, with reflections under every model.
- [ ] Look changes are one continuous slide using `1 − (1 − t)^4.2`, roughly 760 ms. Every model interpolates scale, lift, blur and brightness.
- [ ] Hovering a side model shows the round VIEW cursor, and clicking brings that model to the centre. The centre's transparent margins never block clicks on its neighbours.
- [ ] Sidebar cards blur to skeleton shimmers and refill in sequence, and the prices count.
- [ ] Pins, the timeline, autoplay with pause, the arrows, keys, drag and swipe, add to bag with the flying thumbnail and badge bump, and the full-look bundle all work.