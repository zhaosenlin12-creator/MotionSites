# HERO_PROMPT — "NOWHERE®" · Stay out of the loop (circle lookbook)

Build a single, self-contained HTML file (inline `<style>` + one inline IIFE `<script>`, no frameworks, no build step) that recreates the page described below **exactly**. It is an interactive fashion lookbook for a fictional label called **NOWHERE®**: nine models (transparent PNG cut-outs, shot from a high overhead camera) stand upright on a large ellipse — a circle seen from above, like a clock face — around a centred serif title **"Stay out of the loop"**. The ring spins with a critically damped spring; the nearest (bottom) model is the active look. A phone-style status bar sits on top, a decorative QR code top-left, a vertical "Looks" pill left, a vertical Ring/Grid toggle right, a dock at the bottom with the look name, item pills and a "Shop this fit" button. Opening a look morphs the model (FLIP) into a big focus view with numbered shop dots and a receipt-style "slip" that prints down from the top edge, where items can be added to the bag with a size picker. Everything is greyscale: studio grey, white paper, black ink.

Do not invent anything. Every value, label and behaviour below is load-bearing.

---

## 1. Document / head

- `<!doctype html>`, `<html lang="en">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width,initial-scale=1">`, `<meta name="theme-color" content="#ececec">`.
- `<title>NOWHERE — Stay out of the loop · circle</title>`
- `<meta name="description" content="Vol. 01. Nine looks for going quiet. Spin the ring, pick a fit, tap a dot to shop the item.">`

## 2. Fonts (embedded, no network)

All fonts are embedded as **woff2 data URIs** (`src:url(data:font/woff2;base64,…) format("woff2")`) directly in `@font-face` rules — no Google Fonts link. Use the real font files encoded to base64:

| family | file | weight | style | notes |
|---|---|---|---|---|
| `"Inter Tight"` | variable/roman woff2 | `300 400` (range) | normal | `font-display:swap` |
| `"Inter Tight"` | italic woff2 | `300` | italic | `font-display:swap` — used for every `<i>`/italic text (prices, current drawer item, focus name, etc.) |
| `'Instrument Serif'` | latin subset woff2 | `400` | normal | `font-display:swap`, `unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD` |

Instrument Serif is used **only** for the big centred loop title. Everything else is Inter Tight.

## 3. Design tokens (`:root`)

| token | value |
|---|---|
| `--studio` | `#ececec` (page / stage background, light studio grey) |
| `--paper` | `#fff` |
| `--ink` | `#000` |
| `--muted` | `#6f6f6f` |
| `--ease` | `cubic-bezier(.16,1,.3,1)` — long soft ease-out (the default for almost everything) |
| `--spring` | `cubic-bezier(.34,1.56,.64,1)` — overshooting back-out (bag tally bump, shop dot hover, dot pop, size press, toast) |
| `--morph` | `cubic-bezier(.7,0,.15,1)` — strong ease-in-out used only for the Ring↔Grid morph |
| `--font` | `"Inter Tight","Helvetica Neue",Helvetica,Arial,sans-serif` |
| `--bar-h` | `48px` (becomes `64px` at ≤809px) |
| `--slip-w` | `336px` |
| `--slip-r` | `24px` |
| `--slip-room` | `calc(var(--slip-w) + var(--slip-r) + 24px)` = 384px |

Two additional one-off curves: `cubic-bezier(.65,0,.35,1)` (glint sweep) and `cubic-bezier(.2,1.6,.4,1)` (dot scale / CTA arrow nudge).

## 4. Global base styles

- `*{box-sizing:border-box}`.
- `html, body`: margin 0, padding 0, background `--studio`, colour `--ink`, font `--font`, `16px/24px`, weight 400, `-webkit-font-smoothing:antialiased`. `body{overflow-x:hidden}`.
- `button`: inherits font and colour, no background, no border, padding 0, `cursor:pointer`, `-webkit-tap-highlight-color:transparent`.
- `a`: inherit colour, no underline. `i`: italic.
- Focus ring: `button:focus-visible, a:focus-visible` → `outline:1px solid #000; outline-offset:3px; border-radius:999px`.
- **`.cap`** caption style: `12px/16px`, weight 400, uppercase, tabular numerals.
- **Tracking class group** — `.cap`, `.pill`, tag tip names, slip CTA, toast, size buttons, the size-confirm button, follow cursor labels, receipt line names, dock piece names, Ring/Grid buttons and receipt "Add" buttons all get `letter-spacing:.02em; word-spacing:.12em`.
- **`.pill`** (the core UI atom): `inline-flex`, centred, `min-height:36px`, `padding:0 16px`, **`1px dashed #000` border**, `border-radius:999px`, white background, `12px/16px` uppercase, `transition: background-color .3s, color .3s`. `:hover` and `[aria-current]` → black background, white text, **border becomes solid**.

The dashed-black-hairline-pill on white is the signature visual language: every chip, button, tooltip, size option and the follow cursor uses a 1px dashed ink border that turns solid when the element is inverted to black.

---

## 5. DOM structure (top to bottom)

```
header.bar                         (status bar, absolute, z 60)
main
  section.deck#deck                 (100svh stage)
    div.deck__intro                 (visually hidden h1 + p)
    div.deck__stage#stage           (focusable carousel region)
      span.loop__ring#loopRing      (dashed ellipse)
      div.loop                      (serif title + subtitle)
      div.deck__crowd#crowd         (9 × .model)
      div.deck__labels#labels       (9 grid labels)
      span.deck__glint              (light sweep overlay)
      span.follow#follow            (follow cursor)
      span.deck__live#live          (aria-live polite)
    div.dock                        (bottom controls)
      div.dock__now#now             (counter, autoplay, name)
      ul.dock__pieces#pieces        (item pills)
      button.dock__shop#shop
    a.deck__qr                      (svg#qr 25×25)
    button.deck__looksbtn.pill#drawerBtn  "Looks"
    div.deck__view                  (Ring / Grid)
    div.drawer#drawer               (Looks drawer)
    div.focus#focus                 (focus look viewer)
    aside.slip#slip                 (receipt)
div.toast#toast                     (fixed, outside main)
```

The hidden intro (`.deck__intro`, clipped to 1×1px with `clip-path:inset(50%)`, `white-space:nowrap`) contains, verbatim:

- `<h1 id="deck-title"><span>Stay out of the</span> <span>loop, <i>pal.</i></span></h1>`
- `<p><span>Vol. 01. Nine looks for going quiet.</span> <span>Spin the ring, choose a fit, tap a dot to shop the item.</span></p>`

The section has `aria-labelledby="deck-title"`.

---

## 6. Status bar (`header.bar`)

- `position:absolute; top:0; left:0; right:0; z-index:60; height:var(--bar-h)` (48px; 64px mobile); `display:flex; align-items:center; gap:16px; padding:0 24px`. The bar itself is `pointer-events:none`; its direct children are `pointer-events:auto`.
- Children, left → right (all `.stat` = `inline-flex`, centred, `gap:8px`, and `.cap`):
  1. **Clock** `#clock` (aria-hidden), initial text **`06:00`**, then replaced by the live local time from `Intl.DateTimeFormat(undefined, {hour:'2-digit', minute:'2-digit'})`. It re-ticks exactly at each minute boundary: next timeout = `60000 − (Date.now() % 60000) + 50` ms.
  2. **Signal** (`.stat--signal`, `margin-right:auto` so it pushes the rest right): four bars in a `inline-flex; align-items:flex-end; gap:2px; height:12px` box; each bar `3px` wide, heights **4px, 6px, 9px, 12px**, all filled `rgba(0,0,0,.2)` (i.e. every bar is grey = no signal). Followed by text **`Low signal`** (`.stat__txt`).
  3. **Brand** `a.brand` (`href="#"`, `aria-label="NOWHERE home"`): absolutely centred (`left:50%; transform:translateX(-50%)`), text **`Nowhere`** + `<i>®</i>`. `24px/24px`, weight **300**, `letter-spacing:-.05em`, uppercase → renders `NOWHERE®`. The `®` is `12px`, `letter-spacing:0`, `vertical-align:top`, `font-style:normal`, `margin-left:2px`.
  4. **Battery** (`.stat--battery`): a cell `24×12px`, `padding:1px`, `1px solid #000` border, `border-radius:3px`, with a nub (`::after`) `2×4px` black at `top:3px; right:-4px`, radius `0 1px 1px 0`; inner fill is a black block at **12% width**, full height, radius 1px. Then text **`12%`**.
  5. **Bag button** `button.bagbtn.pill` (`aria-label="Bag"`): text **`Bag (`** `<span class="tally" data-tally>0</span>` **`)`**. `min-width:96px; min-height:32px`. The tally is `inline-block`, tabular numerals, `transition: transform .5s var(--spring)`; class `.bump` sets `translateY(-4px)` (the code removes `.bump`, forces reflow, re-adds it on every add — so it springs up 4px the first time and stays raised).
- Mobile (≤809px): `gap:8px; padding:0 16px`; battery and the "Low signal" text are hidden; bag button `min-width:0; padding:0 12px`.

Note: the bar is not a stacking context; the slip (z 70) and drawer (z 80) both start at `top:0` and therefore cover the bar where they overlap.

---

## 7. Deck & stage

- `.deck`: `position:relative; height:100svh; min-height:640px` (560px on mobile); `overflow:clip`; background `--studio`.
- `.deck__stage#stage`: `position:absolute; inset:0`, `tabindex="0"`, `role="region"`, `aria-roledescription="carousel"` (switches to `"grid of looks"` in grid mode), `aria-label="Looks — arrow keys turn the ring, Enter opens the look"`. `outline:none; cursor:grab; touch-action:pan-y; user-select:none`. `:focus-visible` → `box-shadow: inset 0 0 0 2px #000`. While dragging (`.deck.is-dragging`) cursor `grabbing`.
- `.deck__crowd`: `absolute; inset:0; z-index:1; transition: opacity .7s var(--ease) .2s`.
- `.deck__labels`: `absolute; inset:0; z-index:2; pointer-events:none`.
- `.deck__live`: visually hidden (`clip:rect(0 0 0 0)`), `aria-live="polite"`; on every non-quiet look change its text becomes `Look {n}: {name}` with **unpadded** n (e.g. `Look 2: Dial-Up`).

### 7.1 The model element

Each of the nine `.model` elements:

- `position:absolute; left:0; bottom:0; transform-origin:50% 100%; opacity:0` (opacity is set by JS each frame). While the ring is moving or dragging, `.deck.is-moving .model{will-change:transform,opacity}`.
- CSS variable `--foot` set on the element to that look's foot offset (see §9).
- Inner `.model__fig`: `position:relative; height:var(--model-h,560px); aspect-ratio:4/7; transition:opacity .5s var(--ease)`. `--model-h` is set on the stage by JS.
- Inside the fig, in order:
  1. **Shadow** `span.model__shadow` (aria-hidden): `absolute; left:-12%; right:-12%; bottom:-3%; height:16%; pointer-events:none; filter:blur(3px)`, background = three stacked radial gradients:
     - `radial-gradient(22% 20% at 50% 82%, rgba(0,0,0,.42), rgba(0,0,0,0) 72%)` — tight dark contact core
     - `radial-gradient(42% 32% at 50% 80%, rgba(0,0,0,.16), rgba(0,0,0,0) 74%)` — wider soft pool
     - `radial-gradient(40% 55% at 34% 46%, rgba(0,0,0,.07), rgba(0,0,0,0) 72%)` — faint offset spill up-left
  2. **Image** `img.model__pic`: `src` = 914px variant, `srcset="{571px url} 571w, {914px url} 914w"`, `sizes="(max-width: 809px) 240px, 360px"`, `alt` = look name, `draggable="false"`, `decoding="async"`; the very first model also gets `fetchpriority="high"`. Styles: `absolute; inset:0; width/height 100%; object-fit:contain; object-position:50% 100%; pointer-events:none; -webkit-user-drag:none; transform: translateY(calc(var(--foot,0) * 100%))` — i.e. the cut-out is pushed **down** by `foot × its own height` so the soles (which sit above transparent padding in the PNG) land exactly on the box's bottom edge.
  3. **Hit area** `button.model__hit` (`type="button"`, `tabindex="-1"` except the active one which gets `0`, `data-i="{index}"`, `aria-label="Look 01: Somewhere Else"` with padded number): `absolute; inset:6% 18% 0; border-radius:24px` (transparent).
- Grid hover (fine hover only): when any `.model__hit` inside the crowd is hovered in grid mode, every **other** model's `.model__fig` drops to `opacity:.35`.

---

## 8. Assets (verbatim)

- **CDN base**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/`
- **Image wrapper** `px(file, w)` = `` `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(CDN + file)}&w=${w}&q=85` `` — the full CDN URL (base + file name) is URL-encoded into the `url` parameter; output WebP, width `w`, quality 85. Every image on the page goes through this wrapper. No other image hosts.

### 8.1 CUTS — the nine transparent model cut-outs (look 1 → 9, in order)

1. `hf_20261108_190717_6580d844-f3b0-4240-8b4a-239355685fc9.png`
2. `hf_20261111_034030_a9171bb1-0b34-4468-9a9e-f451d79b8429.png`
3. `hf_20261111_034045_5a78f1ff-8dea-4054-85bc-60a28a4cc434.png`
4. `hf_20261111_034059_24eecc7c-e8b7-4b9c-b58c-b862b1261e87.png`
5. `hf_20261111_034112_5aa3a76f-7e92-48bb-b93d-ec3a35be2494.png`
6. `hf_20261111_034123_ce28dc23-bd91-40ba-95e6-7a09442a865f.png`
7. `hf_20261111_034137_abed307a-bcb4-4192-82e9-6ec122a80820.png`
8. `hf_20261111_034150_fc1776ff-a8d6-4060-a8af-1afedfdfc563.png`
9. `hf_20261111_034202_62b7ffb7-14f5-4dfc-87fe-83c6d9ee6134.png`

Each look uses `img = px(CUTS[n-1], 914)` and `small = px(CUTS[n-1], 571)`.

### 8.2 SHEETS — three 3×3 product contact sheets (item thumbnails)

1. `hf_20261108_190756_3f427fdd-ba34-433e-bc55-eb9b03d2e1c6.png` — looks 1–3
2. `hf_20261108_190758_785127d3-ef7d-4831-976b-14540a7188aa.png` — looks 4–6
3. `hf_20261108_190800_4db1daba-ebb1-436f-857a-91dfab40f4b7.png` — looks 7–9

All three are loaded at `px(file, 600)`. Each sheet is a 3×3 grid: **row = the look's position within its group of three** (`(n−1) % 3`), **column = the item index within the look** (0, 1, 2). Sheet index = `floor((n−1)/3)`.

So: look 1 → sheet 1 row 0; look 2 → sheet 1 row 1; look 3 → sheet 1 row 2; look 4 → sheet 2 row 0; look 5 → sheet 2 row 1; look 6 → sheet 2 row 2; look 7 → sheet 3 row 0; look 8 → sheet 3 row 1; look 9 → sheet 3 row 2. Item 01 = column 0 (left), item 02 = column 1 (middle), item 03 = column 2 (right).

Thumbnail rendering: an inner `span` with `background-image:url('{sheet 600px url}')`, `background-size:300% 300%`, `background-position: {col×50}% {row×50}%` (0%, 50% or 100% on each axis), then `transform:scale(1.18)` so the cell's edges are cropped away (`transition: transform 1s var(--ease)`; on piece hover `scale(1.32)`).

---

## 9. Content — the nine looks (verbatim)

Size sets: **CLOTH** = `S, M, L, XL`; **SHOE** = `40, 41, 42, 43, 44, 45`; **ONE** = `One size`.

`foot` = foot offset (fraction of figure height the image and the dot layer are shifted down). `tags` = shop-dot positions as `[left %, top %]` of the figure box, one per item, in item order.

| # | name | foot | tag 01 | tag 02 | tag 03 |
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

Items (name · kind · price USD · sizes):

| # | item 01 | item 02 | item 03 |
|---|---|---|---|
| 1 | Ribbed Tank Top · Top · $36 · CLOTH | Striped Open Shirt · Top · $74 · CLOTH | Braided Belt · Accessory · $32 · ONE |
| 2 | Corduroy Trucker · Outerwear · $142 · CLOTH | Pleated Shorts · Bottom · $64 · CLOTH | Suede Moccasin · Shoes · $118 · SHOE |
| 3 | Polar Fleece Zip · Top · $92 · CLOTH | Nylon Hike Shorts · Bottom · $58 · CLOTH | Mesh Trainers · Shoes · $124 · SHOE |
| 4 | Yellow Anorak Shell · Outerwear · $128 · CLOTH | Fleece Joggers · Bottom · $72 · CLOTH | Chunky Sandals · Shoes · $84 · SHOE |
| 5 | Navy Rollneck Knit · Top · $118 · CLOTH | Wool Trousers · Bottom · $106 · CLOTH | Leather Mary Janes · Shoes · $134 · SHOE |
| 6 | Corduroy Blazer · Outerwear · $156 · CLOTH | Black Slim Jeans · Bottom · $98 · CLOTH | Desert Boots · Shoes · $146 · SHOE |
| 7 | Faded Black Hoodie · Top · $86 · CLOTH | Carpenter Trousers · Bottom · $94 · CLOTH | Retro Court Sneaker · Shoes · $116 · SHOE |
| 8 | Linen Camp Shirt · Top · $76 · CLOTH | Pleated Bermuda · Bottom · $68 · CLOTH | Leather Slides · Shoes · $62 · SHOE |
| 9 | Rugby Top · Top · $88 · CLOTH | Tapered Khakis · Bottom · $84 · CLOTH | Suede Low-Tops · Shoes · $122 · SHOE |

**Money format**: `'$' + (Math.round(v*100)/100).toFixed(v % 1 ? 2 : 0)` — whole numbers without decimals (`$142`), fractional values with two decimals (`$14.20`).

Resulting receipt sums (Subtotal / "Whole fit −10%" / Total = subtotal × 0.9):

| # | subtotal | −10% | total |
|---|---|---|---|
| 1 | $142 | −$14.20 | $127.80 |
| 2 | $324 | −$32.40 | $291.60 |
| 3 | $274 | −$27.40 | $246.60 |
| 4 | $284 | −$28.40 | $255.60 |
| 5 | $358 | −$35.80 | $322.20 |
| 6 | $400 | −$40 | $360 |
| 7 | $296 | −$29.60 | $266.40 |
| 8 | $206 | −$20.60 | $185.40 |
| 9 | $294 | −$29.40 | $264.60 |

(The minus is the true minus sign `−` U+2212, prefixed before the `$`.)

Numbers in the UI are zero-padded to two digits (`01`…`09`) by a `pad` helper.

---

## 10. Circle (ring) layout — exact maths

### 10.1 Measurement (`measure()`, run by a ResizeObserver on the stage)

- `W = stage.clientWidth`, `H = stage.clientHeight`.
- `mobile = innerWidth < 810`.
- `bottomPad = mobile ? 168 : 120`; `topPad = 136`.
- `modelH = max(200, round((H − bottomPad − 18 − topPad) / 1.12))` (1.12 = `RING.fit`). Set as `--model-h` (px) on the stage — this is the *unscaled* layout height of every `.model__fig`; the ring then scales figures down with transforms.
- Each body's unscaled width `w = modelH × 4/7`.
- `dragPx = max(mobile ? 90 : 120, W × 0.3)` — pixels of horizontal drag per one look step.
- If grid mode is on, re-run the grid layout; mark dirty and kick the animation loop.

(The original tuning object also contains `radius .44, radiusM .84, persp .8, perspM 1.1, horizon .06, front 1.165, frontM 1.12, step .03, lift 40` — these are **unused** leftovers; do not use them.)

### 10.2 Per-frame ring placement (`layoutRing()`, skipped while grid is on)

- `STEP = 2π / 9`. `pos` = continuous spring position in "look units" (look index, not wrapped).
- Centre: `cx = W × 0.5`, `cy = topPad + (H − topPad − bottomPad) × 0.5 + 6`.
- Vertical radius: `ry = (H − topPad − bottomPad) × (mobile ? 0.34 : 0.37)`.
- Horizontal radius: `rx = min(W × (mobile ? 0.30 : 0.28), ry × (mobile ? 1.15 : 1.7))`.
- Front figure base height: `frontH = H × (mobile ? 0.19 : 0.255)` — i.e. **25.5% of stage height (19% on mobile)**; `front = frontH / modelH` (scale factor).
- Title position: stage var `--loop-y = cy − frontH × 0.5 − 6` px → the title centre sits in the empty middle of the ring, in the gap **between the nearest (front) model's head and the farthest (back) model's feet**.
- Ring ellipse: `--ring-y = cy` px; `#loopRing` width `2·rx`, height `2·ry`.
- For each look `i`:
  - `a = wrapAngle((i − pos) × STEP)` wrapped into (−π, π].
  - `depth = (1 + cos a) / 2` → **1 at the bottom/front, 0 at the top/back**.
  - `dist = |a| / STEP`; `near = clamp(1 − dist, 0, 1)` (1 only for the look exactly at front, fading to 0 one step away).
  - **scale** `s = front × (0.5 + 0.5·depth) × (1 + 0.14·near)` → the back model is half the front size; the exact front model gets a +14% boost (so the actual front figure renders at `1.14 × frontH`).
  - `x = cx + rx·sin(a)` (look `i = pos + 1` sits to the right, so the next look approaches from the right).
  - `y = cy + ry·cos(a) + modelH·s·0.08` → the feet offset: figure bottoms are pushed 8% of their rendered height below the ellipse line so the **feet sit on the ring** (front is at the bottom of the ellipse, back at the top).
  - **blur** `= max(0, (1 − depth) × 2.2 − 0.3)` px → front sharp, back ≈1.9px blur (applied only if > 0.05px, as `filter:blur(Npx)` with one decimal).
  - **z-index** `= round(depth × 1000) + 10` (front highest).
  - opacity 1.
- `place(b, x, y, s, op, blur, z)`:
  - Off-screen culling: if `x + w·s/2 < −4` or `x − w·s/2 > W + 4` → opacity 0.
  - `transform: translate3d({x}px, {y − H}px, 0) translateX(-50%) scale({s})` (x/y to 1 decimal, s to 4 decimals). Because the element is anchored `bottom:0; left:0` with `transform-origin:50% 100%`, `y` is where the figure's **bottom-centre** lands.
  - Opacity written only when changed (3-decimal string); `visibility:hidden` when < .01; `pointer-events:none` when < .5.
  - Filter and z-index written each frame.

Worked example at 1440×900 desktop: modelH 559, cx 720, cy 464, ry ≈238.3, rx ≈403.2, frontH ≈229.5, title centre y ≈343, front figure bottom ≈723px, front figure height ≈262px.

### 10.3 Title and ring styling

- `.loop`: `absolute; left:50%; top:var(--loop-y,50%); z-index:0; transform:translate(-50%,-50%); text-align:center; pointer-events:none; transition: opacity .6s var(--ease), transform .9s var(--ease)`; aria-hidden. It sits **below** the crowd (crowd z 1), so models always overlap it.
  - `p.loop__t`: **`Stay out<br>of the loop`** — margin 0, `"Instrument Serif", Georgia, serif`, weight 400, `font-size:clamp(34px, 4vw, 70px)`, `line-height:.98`, `letter-spacing:-.01em`, black. Sentence case (not uppercase), two lines.
  - `p.loop__s`: **`Vol. 01 — Nine looks`** (em dash) — `margin:14px 0 0`, Inter Tight `13px/16px`, colour `--muted`, `letter-spacing:.01em`.
- `.loop__ring`: `absolute; left:50%; top:var(--ring-y,50%); z-index:0; border:1px dashed rgba(0,0,0,.14); border-radius:50%; transform:translate(-50%,-50%); pointer-events:none; transition: opacity .6s var(--ease)` — a very faint dashed ellipse the feet stand on.
- In **grid** and **focus** views both the title and the ring fade to `opacity:0`, and the title also shrinks to `translate(-50%,-50%) scale(.94)`.

---

## 11. Spring animation loop

- Constants: `STIFF = 95`, `DAMP = 2·√95` (critical damping, no overshoot).
- State: `pos` (starts at **−1.15** so on load the ring visibly spins into place; starts at 0 with reduced motion), `goal = 0`, `vel = 0`.
- `kick()` starts a requestAnimationFrame only if none is pending and the stage is visible (IntersectionObserver).
- `tick(t)`: `dt = last ? min(0.034, (t − last)/1000) : 1/60`. Integrate with **3 substeps** of semi-implicit Euler: `h = dt/3`; each substep `acc = −STIFF·(pos − goal) − DAMP·vel; vel += acc·h; pos += vel·h`.
- Settle: if `|pos − goal| ≤ 5e-4` and `|vel| ≤ 5e-4` → snap `pos = goal, vel = 0`; else moving.
- Relayout the ring when moving, dirty or dragging. Toggle `.deck.is-moving` while moving or dragging. Request the next frame only while moving or dragging (loop sleeps when idle).
- Reduced motion: `pos = goal` instantly.
- `IntersectionObserver` on the stage sets `visible` (last entry's `isIntersecting`) and kicks when visible; `visibilitychange` → when the document becomes visible, kick and reschedule autoplay.

---

## 12. Active look, navigation, autoplay

- `setActive(i, quiet=false)`: wrap `i` mod 9; no-op if unchanged. Then: only the active model's hit button gets `tabindex=0`; drawer items get `aria-current="true|false"`; grid labels toggle `.is-on`; dock counter `#nowIdx` = padded index, `#nowName` = name. If **not quiet**: live region text; (unless reduced motion) restart the **glint** sweep (remove `.is-glint` from stage, reflow, re-add) and the dock name **swap** animation (same restart trick on `#now` with `.is-swap`); and if focus is open, close it. Always: re-render the slip and the dock pieces (pieces animate in only when not quiet), and reschedule autoplay.
- `goTo(g)`: `goal = g; setActive(mod(g, 9)); kick()`. `next` = `goTo(round(goal)+1)`, `prev` = `goTo(round(goal)−1)`, `jumpTo(i)` = `goTo(round(goal) + shortest(i, active))` where `shortest(target, from) = mod(target − from + 4.5, 9) − 4.5` (shortest way round the ring).
- **Autoplay**: on by default (off with reduced motion). Every **5000 ms** it calls `next()` if: stage visible, not dragging, document not hidden, mouse not hovering the slip, focus closed, grid off, drawer closed — otherwise it just reschedules. `setAutoplay(on)` toggles `.deck.is-playing` and the button's `aria-pressed`. `stopAuto()` turns autoplay **off permanently** (until the user presses play) and is called on every manual interaction: drag, click-to-rotate, wheel, arrow keys, opening focus/drawer, grid toggle, receipt clicks, CTA.
- The slip sets `slipHover = true` on `pointerenter` with a mouse pointer and false on `pointerleave`.

### 12.1 Drag / fling

- `pointerdown` on the stage is ignored if focus is open, grid is on, or it is a non-primary mouse button. It records start x/y, `startGoal = goal`, pointer id, and a trail `[{x, t}]`.
- `pointermove` (also always feeds the follow cursor): ignore other pointer ids; if a mouse moves without the primary button held → release. Intent detection before dragging: if `|dy| > 10` and `|dy| > |dx|` → abandon (vertical scroll wins; stage has `touch-action:pan-y`). If `|dx| > 8` and `|dx| > 1.2·|dy|` → start dragging: add `.deck.is-dragging`, `setPointerCapture`, `stopAuto()`.
- While dragging: push to trail (keep the last 6 samples); `goal = startGoal − dx / dragPx` (drag left → higher index → next look comes in from the right); `setActive(mod(round(goal), 9))` live; kick.
- Release (`pointerup` / `pointercancel`): velocity `v` (px/ms) = (last.x − first.x) / (last.t − first.t) over the trail; `base = round(startGoal)`; `dx` total.
  - **Mobile**: if `|dx| > 30` or `|v| > 0.3` → `base + (dx < 0 ? 1 : −1)`, else `base` (exactly one step per swipe).
  - **Desktop**: `target = round(goal − v·160 / dragPx)`; if `target === base` and `|v| > 0.3` → `base + (v < 0 ? 1 : −1)`; clamp to `base ± 2`.
  - `goTo(target)`; record `dragEnd` timestamp.
- **Click** on the stage: ignored if within **60 ms** of a drag end. Only `.model__hit` clicks count. In grid: `goal = pos = i; vel = 0; setActive(i); openFocus()`. In ring: `d = shortest(i, round(goal))`; `d === 0` (the front model) → open focus; otherwise `stopAuto()` and rotate to it (`goTo(round(goal) + d)`).
- **Wheel** (non-passive): only when horizontal delta dominates (`|deltaX| > |deltaY|`) and focus/grid are off; `preventDefault`; ignore while locked; accumulate `deltaX`; when `|sum| > 45` → `stopAuto()`, `next()` if positive else `prev()`, reset sum, lock for **520 ms**.
- **Keyboard** on the focused stage: `ArrowRight` → next, `ArrowLeft` → prev (both `stopAuto`). In grid only, `ArrowDown`/`ArrowUp` → `jumpTo(active ± 3)` (one row). `Enter` (focus closed) → in grid first snap `goal = pos = active, vel = 0`; then `openFocus()`. Global `Escape`: closes focus if open, else closes the drawer if open.

### 12.2 Glint sweep

- `.deck__glint` (inside the stage): `absolute; inset:0; z-index:1550; overflow:hidden; pointer-events:none; mix-blend-mode:soft-light`.
- Its `::before`: `top:-20%; bottom:-20%; width:42%`, resting `opacity:0; transform:translateX(-130%) skewX(-12deg)`, background `linear-gradient(100deg, transparent, rgba(255,255,255,.28) 42%, rgba(255,255,255,.6) 50%, rgba(255,255,255,.28) 58%, transparent)`.
- When the stage has `.is-glint`: keyframes `glint` over **1.5s** `cubic-bezier(.65,0,.35,1)`: 0% opacity 0 at `translateX(-130%) skewX(-12deg)`; 18% opacity 1; 100% opacity 0 at `translateX(330%) skewX(-12deg)`. A soft white light band sweeps left→right across the whole stage on every look change.

---

## 13. Follow cursor

- Only on fine pointers (`(hover: hover) and (pointer: fine)`): add `.deck.has-follow` (which sets `cursor:none` on the stage and all its descendants; focus tags and the focus close button keep `cursor:pointer`). On touch devices the follow element is removed from the DOM.
- Markup: `span.follow#follow` (`absolute; top:0; left:0; z-index:1700; pointer-events:none`) › `span.follow__in` › `<b class="f-drag">Drag</b><b class="f-view">View</b>`.
- `.follow__in`: `absolute; top:-40px; left:-40px; 80×80px; display:grid; place-items:center; border:1px dashed #000; border-radius:50%; background:rgba(255,255,255,.6); backdrop-filter:blur(6px)` (+ `-webkit-`); resting `opacity:0; transform:scale(.3)`; `transition: transform .6s var(--ease), opacity .35s, background-color .35s, color .35s`. Both labels share `grid-area:1/1`, `12px/16px` uppercase, `transition: opacity .25s`; "View" starts at opacity 0.
- Tracking: on mouse `pointermove` (stage and focus stage) target = pointer relative to the stage rect. On first appearance snap to target and add `.is-on` (opacity 1, scale 1). Position follows with a lerp factor **0.18** per frame (1 with reduced motion) via `translate3d`, rAF loop stops when the remaining distance < 0.4px.
- States (recomputed on each move):
  - `.is-view` — hovering a model hit that is the front model (or any model in grid), not dragging, focus closed → solid black disc, white text, label swaps **Drag → View**.
  - `.is-link` — hovering a non-front model's hit, not dragging → solid black disc shrunk to `scale(.2)` (a small black dot), labels hidden.
  - `.is-pin` — focus open and hovering a tag or the close button → hidden.
  - Dragging (`.deck.is-dragging`) → solid black, white text "Drag", `scale(.74)`.
  - Any time focus is open, `.follow__in` is hidden (opacity 0).
  - `pointerleave` on the stage removes `is-on`, `is-view`, `is-link`.
- Default state over empty stage: translucent frosted white circle with dashed outline reading **DRAG**.

---

## 14. Dock (bottom controls)

- `.dock`: `absolute; left:0; right:0; bottom:0; z-index:5; display:flex; align-items:flex-end; justify-content:space-between; padding:0 32px 32px; pointer-events:none` (children auto); `transition: opacity .7s var(--ease) .2s`.
- **Left — `.dock__now#now`** (`flex column; gap:8px; min-width:0; transition: opacity .4s`):
  - Row `.dock__count` (`flex; align-items:center; gap:12px`): `.cap` counter **`01 / 09`** (`#nowIdx` / `#nowTotal`, total = padded 9) + **autoplay button** `#auto` (`aria-label="Autoplay"`, `aria-pressed="true"`): `24×24px` circle, `1px dashed #000`, centred icon 12×12 `fill=currentColor` on a 24-unit viewBox — pause = two bars `M6.5 4.5h3.5v15H6.5z` and `M14 4.5h3.5v15H14z`; play = triangle `M7 4.5v15l12.5-7.5z`. Pause shows when pressed=true, play when false. Click toggles autoplay.
  - `.dock__name#nowName`: initial **`Somewhere Else`** — `32px/32px`, weight 300, `letter-spacing:-.05em`, uppercase, nowrap. Swap animation (`.is-swap` on `#now`) **.8s var(--ease)**, `from {opacity:0; filter:blur(4px); transform:translateY(16px)}`.
- **Centre — `ul.dock__pieces#pieces`** (`aria-label="Items in this fit"`): `absolute; left:50%; bottom:32px; translateX(-50%); flex; gap:8px; no list style; transition: opacity .4s`. Three `li` (`--i` = 1..3), each a `button.piece` (`data-p`, `aria-label="{name}, {price}"`):
  - `flex; align-items:center; gap:12px; padding:4px 16px 4px 4px; 1px dashed #000; radius 999px; white; text-align:left; transition: background-color .3s, color .3s`.
  - Round thumb `.piece__img` `48×48`, `border-radius:50%`, `overflow:hidden`, background `--studio`, containing the sheet-cell span (§8.2).
  - Text column: `.piece__name` (`max-width:136px`, ellipsis, `12px/16px` uppercase, nowrap) and `.piece__price` (`12px/16px`, italic, tabular).
  - Hover (hover-capable only): black, white text, solid border, thumb zoom 1.32.
  - Entry animation (`.is-in` on the ul, restarted on each non-quiet look change, not on boot or with reduced motion): each li `rise .9s var(--ease) backwards`, delay `--i × 70ms`; `rise` = `from {opacity:0; filter:blur(8px); transform:translateY(24px)}`.
  - Click → `openFocus()` then highlight that item (`setHot(p, scroll=true)`).
- **Right — `button.dock__shop#shop`** (`aria-label="Shop this fit"`): `inline-flex; align-items:center; gap:16px; margin-left:auto; transition: opacity .4s`: `.cap` text **`Shop this fit`** + `.dock__dot` `64×64` black circle with white plus icon (24px, `stroke-width 1.5`, round caps, path `M12 4v16M4 12h16`). Dot `transition: transform .6s var(--spring)`; icon `transition: transform .6s var(--ease)`. Hover → dot `scale(1.08)`, plus rotates **90°**. Click → `openFocus()`.
- In grid view the pieces, shop button and now block fade to 0 (non-interactive). In focus the whole dock fades out (.35s).

## 15. Side controls

- **QR code** `a.deck__qr` (`href="#"`, `aria-label="Nowhere code"`): `absolute; left:24px; top:calc(var(--bar-h) + 8px); z-index:30; 48×48`; `transition: opacity .4s, transform .5s var(--ease)`; hover `scale(1.06)`. Contains `svg#qr` (`viewBox="0 0 25 25"`, `shape-rendering="crispEdges"`, aria-hidden) filling the box. Hidden on mobile.
  - **Generation** (decorative, deterministic): 25×25 module grid. Three finder patterns 7×7 at (0,0), (18,0), (0,18): fill the outer 1-module border plus the 3×3 core (x,y in 2..4), leaving the ring between empty. Exclusion zones (no random modules): `x<8 && y<8`, `x>16 && y<8`, `x<8 && y>16`. Then iterate `y` 0..24 outer, `x` 0..24 inner; outside the zones fill a module when `rnd() > .52`, where `rnd` is a Park–Miller LCG: `seed = 7`; each call `seed = (seed × 16807) % 2147483647; return seed / 2147483647`. Output a single `<path fill="currentColor">` whose `d` is `M{x} {y}h1v1h-1z` for every filled cell (finder cells first, then random cells).
- **Looks button** `button.deck__looksbtn.pill#drawerBtn` (`aria-expanded`, `aria-controls="drawer"`): text **`Looks`**; `absolute; top:50%; left:24px` (12px mobile); `z-index:30; width:36px; min-height:0; padding:20px 0; writing-mode:vertical-rl; transform:translateY(-50%) rotate(180deg)` (reads bottom→top); `transition: background-color .3s, color .3s, opacity .4s`. Toggles the drawer.
- **View toggle** `div.deck__view` (`role="group"`, `aria-label="View"`): `absolute; top:50%; right:24px` (12px mobile); `z-index:30; flex column; overflow:hidden; 1px dashed #000; radius 999px; white; translateY(-50%); transition: opacity .4s`. Two `button.deck__vbtn` (`data-v="ring"` **`Ring`**, pressed true; `data-v="grid"` **`Grid`**): `width:36px; padding:16px 0` (32px / 12px 0 on mobile), `12px/16px` uppercase, `writing-mode:vertical-rl; transform:rotate(180deg)`, `transition: background-color .3s, color .3s`; `[aria-pressed="true"]` → black with white text. Click → `setGrid(v === 'grid')`.

---

## 16. Grid view

- `setGrid(on)`: no-op if unchanged or while focus is open. `stopAuto()`. For every body compute a stagger ring index `round(|wrapAngle((i − pos)·STEP)| / π × 4)` (0 for the front model … 4 for the back) and set `--d` = that × **0.32s** when entering grid, × **0.24s** when leaving. Add `.deck.is-anim`, which gives models `transition: transform 1.25s var(--morph) var(--d), opacity .8s var(--ease) var(--d), filter .8s var(--ease) var(--d)`; remove `.is-anim` after **1700 ms** (0 with reduced motion). Toggle `.deck.is-grid`, update the toggle buttons' `aria-pressed` and the stage's `aria-roledescription`. Entering → `layoutGrid()`; leaving → reset cached opacity/filter, mark dirty, `layoutRing()` (models morph back onto the circle front-first).
- `layoutGrid()`: 3 rows × 3 columns in look order. `top = mobile ? 72 : 80`; `rowH = (H − (mobile ? 104 : 96) − top) / 3`; `colW = W / 3`; uniform scale `s = min(rowH − 40, colW × 7/4 × 0.92) / modelH`. For look `i`: `x = colW × (i%3 + 0.5)`, `y = top + rowH × (floor(i/3) + 1) − 32` (figure bottom). Same transform formula as the ring; opacity 1, no blur, z-index `10 + row`.
- **Labels**: one `span.deck__label.cap` per look with `--i`, text `{01}&nbsp;&nbsp;{Name}` (two non-breaking spaces). `absolute; top:0; left:0; colour --muted; nowrap; opacity:0; transition: opacity .4s`; the active label `.is-on` is black. Placed at `translate3d(x, y + 12, 0) translateX(-50%)` (centred 12px under each figure). In grid they fade in: `opacity .8s var(--ease)` with delay `0.9s + i × 50ms`.
- In grid: title and ring fade out, dock now/pieces/shop fade out, the follow cursor shows "View" on every model, clicking any model opens focus on it, arrow keys move by 1 (left/right) or 3 (up/down), autoplay is suspended. Ring layout is skipped while grid is on (the spring still updates `pos`).

---

## 17. Focus view (open look)

### 17.1 Layout

- `.focus#focus` (aria-hidden toggled): `absolute; inset:0; z-index:40; visibility:hidden; pointer-events:none; transition: visibility 0s linear .95s`. `::before` is a full studio-grey backdrop: `opacity:0; transition: opacity .6s var(--ease) .15s` (fade out when closing). Open (`.deck.is-focus`): visible, interactive, no visibility delay; backdrop opacity 1 over `.45s`.
- While focus is open the crowd, dock, now block, QR, Looks button and view toggle fade to 0 over `.35s` and become non-interactive.
- `.focus__stage#focusStage`: `absolute; top:calc(var(--bar-h) + 16px); right:calc(var(--slip-room) + 24px)` (= 408px, leaving room for the slip); `bottom:96px; left:48px; display:flex; align-items:flex-end; justify-content:center; cursor:zoom-out`.
- `.focus__top`: `absolute; top:0; left:0; right:0; flex; align-items:flex-start; justify-content:space-between; gap:16px; padding: calc(var(--bar-h) + 16px) calc(var(--slip-room) + 8px) 0 48px`; resting `opacity:0; translateY(-10px)`; when open `opacity .8s .35s` and `transform 1s var(--ease) .35s` to visible/none.
  - `p.focus__cap`: `flex; gap:12px; margin:0; 40px/40px; weight 300; letter-spacing:-.05em; uppercase` containing `span#focusNum` = **`01.`** (padded number + dot) and `i#focusName` = look name in italic.
  - `button.focus__close#focusClose` (`aria-label="Close look"`): `48×48` circle, `1px dashed #000`, white, ✕ icon 16px (`stroke-width 1.6`, round caps, `M5 5l14 14M19 5L5 19`); `transition: transform .6s var(--ease)`; hover rotates **90°**.
- `p.focus__hint.cap`: **`Tap a dot to shop this item`** — `absolute; left:0; right:var(--slip-room); bottom:16px; text-align:center; opacity:0; pointer-events:none`; when open fades in `opacity 1s var(--ease) 1.1s`. Hidden on mobile.

### 17.2 Opening — FLIP morph

`openFocus()` (no-op if already open): `stopAuto()`, clear hot, close the drawer if open. Take the active look and the **front model's** `.model__fig` (`bodies[mod(round(goal), 9)]`) as the source. Fill the number/name. Measure the focus stage rect; figure height `h = max(160, min(rect.height, rect.width / (4/7)))`. Create `div.focus__model` (`position:relative; flex:none; cursor:default; transform-origin:0 100%; transition: transform .95s var(--ease)`) with `--model-h: h px` and `--foot`, containing a `.model__fig` with the same shadow + image markup (no hit button) plus a `div.tags` layer. Append, set `focusOpen`, add `.deck.is-focus`, set aria-hidden false on focus and slip. Unless reduced motion: set `transition:none`, set transform to the FLIP inverse `translate3d(src.left − dst.left px, src.bottom − dst.bottom px, 0) scale(src.height / dst.height)` (bottom-left anchored because of `transform-origin:0 100%`), force reflow, restore the transition and clear the transform — the small ring figure grows smoothly into the big focus figure over .95s. Focus the close button (`preventScroll`).

### 17.3 Closing

`closeFocus()`: (unless reduced) set the focus model's transform to the FLIP from the **current** front figure (so it shrinks back to where the ring/grid figure is), clear `focusOpen`, remove `.is-focus`, set aria-hidden true, clear hot, remove the element after **950 ms** (0 reduced). If focus was inside the focus view or slip, move focus back to the stage. Triggers: close button, click on the focus stage outside the figure, `Escape`, any non-quiet look change, opening the drawer.

### 17.4 Shop dots (tags)

- `div.tags`: `absolute; inset:0; transform:translateY(calc(var(--foot,0) * 100%))` — shifted with the image so dots stay on the garments.
- One `button.tag` per item: `data-p` (1..3), inline `left:{x}%; top:{y}%; --pi:{1..3}`, `aria-label="01: Ribbed Tank Top, $36"`. `absolute; display:grid; place-items:center; 48×48; margin:-24px 0 0 -24px` (centred on the point).
  - `span.dotnum`: `32×32` black circle, white `12px/16px` tabular text **`01`/`02`/`03`**. Entry `pop .9s var(--spring) backwards` with delay `pi × .11s + .6s`, `pop` = `from {opacity:0; transform:scale(0)}`. `transition: transform .5s cubic-bezier(.2,1.6,.4,1), background-color .25s, color .25s, box-shadow .4s`. Hover / `.is-hot` → white fill, black text, `box-shadow:0 0 0 1px #000`, `scale(1.15)`.
  - `span.tag__tip` (pill tooltip): `absolute; top:50%; left:calc(100% − 4px); flex; align-items:baseline; gap:12px; padding:8px 16px; nowrap; white; 1px dashed #000; radius 999px; opacity:0; pointer-events:none; transform-origin:0 50%; transform:translate(-8px,-50%) scale(.96); transition: opacity .35s, transform .6s var(--ease)`. Content: `<b>` item name (`12px/16px` 400 uppercase) + `<span>` price (`12px/16px` italic tabular). Visible on hover / `.is-hot` / focus-visible → `opacity:1; translateY(-50%)`.
  - **Tip fitting** `fitTip(tag)` (run when a tag becomes hot): reset classes; if `tag.right + tipWidth ≤ stage.right − 8` keep it on the right; else if `tag.left − tipWidth ≥ stage.left + 8` add `.is-flip` (tip on the left: `left:auto; right:calc(100% − 4px); transform-origin:100% 50%`, hidden offset `translate(8px,-50%) scale(.96)`); else add `.is-below` (tip centred under the dot: `top:calc(100% + 8px); left:50%; max-width:calc(100vw − 48px)`, `transform-origin:50% 0`, hidden `translate(calc(-50% + var(--dx)), -8px) scale(.96)`, shown `translate(calc(-50% + var(--dx)), 0)`, name ellipsised) with `--dx` = horizontal nudge in px that clamps the tip's centre into `[stage.left + 8 + half, stage.right − 8 − half]`, `half = min(tipWidth, stage.width − 16)/2`.
- **Hot linking** `setHot(p, scroll)`: removes `.is-hot` from everything, then (p ≠ 0) fits and marks tag `p` hot and marks receipt line `p` hot; with `scroll` the line is `scrollIntoView({block:'nearest', behavior: 'smooth'})` (`'auto'` reduced). Triggered by: mouse `pointerover` on a tag, `focusin` on a tag, clicking a tag (with scroll), mouse `pointerover` on a receipt line, clicking a dock piece (with scroll); `pointerleave` from the receipt list clears it; opening/closing focus clears it.
- Clicks inside the focus stage: on a tag → hot (with scroll); anywhere outside `.model__fig` → close focus; on the figure itself → nothing.

---

## 18. The slip (receipt drawer)

### 18.1 Shape and print animation

- `aside.slip#slip` (`aria-label="In this fit"`, aria-hidden toggled): `absolute; top:0; right:var(--slip-r)` (24px); `z-index:70; flex column; width:336px; max-height:calc(100% − 32px); padding-bottom:8px; background:#fff`; hidden: `visibility:hidden; opacity:0; transition: opacity .35s, visibility 0s .35s`.
- **Zig-zag torn bottom edge** via mask (and `-webkit-mask`): `conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 0 0 / 16px 100%` — repeating 16px-wide tiles whose bottom forms a row of 8px-deep triangular teeth, like a till receipt.
- Open (`.deck.is-focus .slip`): visible, opacity 1, no transition, `animation: print 1.3s steps(18, end) .3s both` with `print` = `translateY(-100%) → none` — the receipt is fed down from the very top edge of the screen in 18 discrete stepped jerks, like a thermal printer.
- It hangs from the top of the viewport and overlays the status bar's right side (z 70 > 60).

### 18.2 Header

`.slip__head`: `flex column; align-items:center; gap:4px; margin:0 24px; padding:32px 0 16px; text-align:center; border-bottom:1px dashed #000`.
- `.slip__logo`: **`Nowhere`**`<i>®</i>` — `40px/40px`, weight 300, `-.05em`, uppercase, `margin-bottom:8px`; ® `12px`, tracking 0, `vertical-align:top`, normal style.
- `.cap` **`Vol. 01 · Till 0004 · Lisbon`**
- `.cap#slipLook` **`Look 01 — Somewhere Else`** (updates to `Look {pad n} — {name}`).

### 18.3 Lines

- `ul.slip__lines#lines` (`role="list"`): `flex:1 1 auto; min-height:0; margin:0; padding:0 24px; list-style:none; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:thin`.
- Each `li.line` (`data-p` 1..3; `.is-added` when in bag): `position:relative; display:grid; grid-template-columns:24px minmax(0,1fr) auto; grid-template-areas:"n name price" "n kind add"; align-items:center; gap:4px 8px; padding:12px 0; border-bottom:1px dashed #000`.
  - `::before` content `"0" attr(data-p)` → **`01`** in area `n`, `align-self:start`, `12px/16px` tabular.
  - `::after` hot underline: `absolute; left:0; right:0; bottom:-1px; height:1px; black; transform-origin:0 50%; scaleX(0); transition: transform .9s var(--ease)`; `.is-hot` → `scaleX(1)` (a solid line draws left→right over the dashed border).
  - `.line__name` (area name) item name `12px/16px` uppercase; `.line__price` (area price) right-aligned tabular money; `.line__kind.cap` (area kind) muted kind (`Top`, `Outerwear`…).
  - `button.line__add` (area add, `justify-self:end`, `aria-expanded`, `aria-label="Add to bag: {name}"` or `"In bag: {name}"`): `height:24px; padding:0 8px; 1px dashed #000; radius 999px; 12px/16px uppercase; transition: background-color .3s, color .3s`. Its label comes from `::after`: **`Add`**; while the picker is open (`.line.is-picking`) **`Close`**; when added (`.line.is-added`) **`In bag`** with black fill, white text, solid border, `cursor:default`.
  - `div.pick` (hidden by default; `grid-column:1/-1; flex column; gap:8px; padding-top:8px; animation: drop .7s var(--ease)`, `drop` = `from {opacity:0; translateY(-8px)}`):
    - `div.pick__sizes` (`role="group"`, `aria-label="Size"`, `flex; wrap; gap:8px`): one `button.size` per size (`data-s`, `aria-pressed`): `min-width:40px; min-height:28px; padding:0 12px; 1px dashed #000; radius 999px; 12px/16px uppercase; transition: background-color .3s, color .3s, transform .45s var(--spring)`; pressed → black/white/solid; `:active` → `scale(.94)`.
    - `button.pick__ok` **`Add to bag`**: full width, `min-height:32px`, black, white `12px/16px` uppercase.

### 18.4 Bundle / totals

`.slip__bundle`: `flex column; gap:12px; padding:16px 24px`.
- `p.slip__msg#msg` (`role="status"`, polite): `12px/16px`, margin 0, hidden when empty.
- `dl.sum` (`flex column; gap:4px; margin:0`), rows are `div`s with `flex; align-items:baseline; justify-content:space-between; gap:16px`; `dt`/`dd` margin 0 tabular:
  - `.cap` **`Subtotal`** / `#sumSub`
  - `.cap` **`Whole fit −10%`** / `#sumOff` (e.g. `−$14.20`)
  - `.sum__total`: **`Total`** / `#sumTotal` — `margin-top:8px; padding-top:12px; border-top:1px dashed #000; 40px/40px; weight 300; -.05em; uppercase`.
- `button.slip__cta#cta`: `flex; centred; gap:12px; width:100%; min-height:48px; black; white; 12px/16px uppercase; transition: background-color .45s, color .45s`. Content: **`Add whole fit to bag`** (`.t-add`), hidden **`Whole fit in your bag`** (`.t-done`), and an arrow SVG (22×12 on viewBox 26×14, stroke 1.5, round caps/joins, `M1 7h24M19 1l6 6-6 6`) with `transition: transform .5s cubic-bezier(.2,1.6,.4,1)`, hover `translateX(4px)`. When `.slip.is-complete` (every item of the look in bag): white background, black text, `box-shadow: inset 0 0 0 1px #000`, `.t-add` and arrow hidden, `.t-done` shown.

### 18.5 Footer

`.slip__foot` (aria-hidden): `flex column; align-items:center; gap:8px; padding:8px 24px 24px`:
- `.slip__code` fake barcode: `width:100%; height:40px; background: repeating-linear-gradient(90deg, #000 0 2px, transparent 2px 4px, #000 4px 5px, transparent 5px 8px, #000 8px 11px, transparent 11px 12px, #000 12px 13px, transparent 13px 17px)` (17px repeating bar pattern).
- `.cap` **`Thanks for going nowhere.`**

### 18.6 Bag / receipt logic

- Cart state per look per item: `{added:false, size: sizes[1] if more than one size else sizes[0], touched: sizes.length === 1}` — clothes default to **M**, shoes to **41**, accessories to **One size**; only one-size items count as "touched" (size confirmed) by default. State persists per look while browsing; `bagCount` is global.
- `renderSlip()` (on every active change): header look line, rebuild the three lines (keeping `.is-added`), pickers closed, sizes pressed per state; subtotal = sum of prices, off = `'−' + money(sub × .1)`, total = `money(sub × .9)`; clear message; toggle `.is-complete`.
- Clicks in the lines list (each calls `stopAuto()`):
  - **Add** button: if already added → nothing. If one size → add immediately. Otherwise toggle the picker (`.is-picking`, `aria-expanded`).
  - **Size** button: set that size, mark touched, update `aria-pressed` (does not add).
  - **Add to bag** (pick__ok): mark touched, add.
- `addToBag(ks)`: mark each added, set `.is-added`, remove `.is-picking`, hide picker, update aria-label to `In bag: …`; `bagCount += ks.length`; every `[data-tally]` shows the count and re-triggers `.bump`; toast **`Fit added to your bag.`** if more than one item was added at once, else **`Item added to your bag.`**; toggle `.is-complete`.
- **CTA** ("Add whole fit to bag"): if all added → nothing. `stopAuto()`. Among not-yet-added items, add every touched one at once (one toast); for the untouched ones open their pickers (`.is-picking`, visible) — on mobile only the first one — and set the message **`Choose size for: {Name A}, {Name B}`** (comma-separated item names). The user then picks sizes / presses Add to bag per line (or presses the CTA again after picking sizes).
- The discount line is informational ("whole fit −10%"); the total always shows the 10%-off price of the full fit.

### 18.7 Toast

`div.toast#toast` (`role="status"`, polite, outside main): `position:fixed; left:50%; bottom:24px; z-index:2000; padding:12px 20px; radius 999px; black; white; 12px/16px uppercase; opacity:0; pointer-events:none; transform:translate(-50%,16px); transition: opacity .25s, transform .5s var(--spring)`; `.is-on` → opacity 1, `translate(-50%,0)`. Shown for **2500 ms** (timer restarts on each toast).

---

## 19. Looks drawer

- `div.drawer#drawer` (aria-hidden toggled): `absolute; top:0; bottom:0; left:0; z-index:80; flex column; width:min(560px,100%); padding:24px 32px 32px` (16px 16px 24px mobile); `overflow-y:auto; overscroll-behavior:contain; background:#fff; border-right:1px solid #000; visibility:hidden; transform:translateX(-101%); box-shadow:0 0 0 200vmax rgba(0,0,0,0)`; closing `transition: transform .8s var(--ease), box-shadow .6s, visibility 0s .8s`.
- Open (`.deck.is-drawer`): visible, `transform:none`, `box-shadow:0 0 0 200vmax rgba(0,0,0,.14)` (huge spread shadow dims the rest of the page 14%), `transition: transform 1s var(--ease), box-shadow .6s`.
- `.drawer__top` (`flex; space-between; centred; min-height:40px`): `.cap` **`Looks · Vol. 01`** + `button.pill#drawerClose` **`Close`**.
- `ol.drawer__list#drawerList` (`margin:32px 0 auto; padding:0; no list style`), nine `li` (`--i` = index 0..8), each `button.drawer__item` (`data-i`): `display:grid; grid-template-columns:32px minmax(0,1fr) auto; align-items:baseline; gap:16px; width:100%; padding:16px 0; border-top:1px dashed #000; text-align:left`; the last item also has a dashed bottom border. Content:
  - `.cap` padded number `01`
  - `.drawer__name` look name — `40px/40px` (32px mobile), weight 300, `-.05em`, uppercase, nowrap, ellipsis, `transition: transform .7s var(--ease)`; current (`aria-current="true"`) → italic; hover → italic + `translateX(8px)`.
  - `.drawer__meta.cap` — muted, italic, **not uppercase** (`text-transform:none` overrides `.cap`): `{3} pieces · {subtotal}`, e.g. **`3 pieces · $142`**, `3 pieces · $324`, `3 pieces · $274`, `3 pieces · $284`, `3 pieces · $358`, `3 pieces · $400`, `3 pieces · $296`, `3 pieces · $206`, `3 pieces · $294`. On mobile the grid is `24px minmax(0,1fr)` and the meta wraps to column 2 on its own row.
  - When the drawer opens, each li plays `rise 1s var(--ease) backwards` with delay `.12s + i × 50ms`.
- `nav.drawer__nav` (`aria-label="Main"`, `flex; wrap; gap:8px; margin-top:32px`): four `a.pill href="#"` — **`Vol. 01`**, **`Places`**, **`Letters`**, **`Postcards`**.
- While the drawer is open the QR code and dock now block fade out.
- `setDrawer(open)`: toggle class, aria-hidden, `aria-expanded` on the Looks button. On open: `stopAuto()`, close focus if open, focus the active drawer item. On close, if focus was inside the drawer, return it to the Looks button. Clicking an item → `jumpTo(i)` (shortest rotation) and close. Close button / Looks button toggle / `Escape` close it.

---

## 20. z-order summary

| layer | z-index |
|---|---|
| loop ring, loop title (inside stage) | 0 |
| crowd (models inside: `round(depth×1000)+10`, i.e. 10…1010 in ring; `10+row` in grid) | 1 |
| grid labels | 2 |
| dock | 5 |
| QR, Looks button, view toggle | 30 |
| focus view | 40 |
| status bar | 60 |
| slip (receipt) | 70 |
| drawer | 80 |
| glint overlay (stage is not a stacking context, so it competes at deck level) | 1550 |
| follow cursor | 1700 |
| toast (fixed) | 2000 |

---

## 21. Responsive rules

- **≤1199px**: dock name `24px/24px`; dock pieces show thumbnails only (text hidden, padding 4px — round 48px chips).
- **≤809px (mobile; JS uses `innerWidth < 810`)**:
  - `--bar-h: 64px`; bar gap 8px, padding 0 16px; battery, "Low signal" and QR hidden; bag pill compact.
  - Deck `min-height:560px`; Looks button `left:12px`; view toggle `right:12px`, buttons 32px wide / padding 12px 0.
  - Dock padding `0 16px 24px`; name `16px/16px`, `letter-spacing:-.02em`; pieces raised to `bottom:96px` (above the name/shop row), thumbs 40px; "Shop this fit" label hidden; dot 56px.
  - Ring maths: bottomPad 168, `ry` factor .34, `rx = min(W×.30, ry×1.15)`, front height 19% of H, dragPx min 90, swipe = exactly one look.
  - Grid: top 72, bottom reserve 104.
  - Focus: stage `top: calc(var(--bar-h) + 48px); right:16px; bottom:calc(46svh + 16px); left:16px` (figure in the upper half); top bar padding `calc(var(--bar-h) + 8px) 16px 0`; caption `32px/32px`; hint hidden.
  - Slip becomes a bottom sheet: `inset:auto 16px 0; width:auto; max-height:46svh`, animation `print-up` (`translateY(100%) → none`, same 1.3s steps(18)) — it prints **up** from the bottom; head, foot and the Subtotal/−10% rows are hidden; total `32px/32px`, no top margin. CTA opens only the first missing size picker.
  - Drawer padding `16px 16px 24px`, names 32px.
- Image `sizes`: 240px on mobile, 360px otherwise.

## 22. Reduced motion (`prefers-reduced-motion: reduce`)

- CSS: `*, *::before, *::after { animation:none !important; transition:none !important }`.
- JS: `pos` starts at 0 (no intro spin), spring snaps instantly, autoplay off by default, no glint/name-swap/pieces animation restarts, follow cursor lerp 1 (no lag), no FLIP transforms, focus model removed immediately on close, grid `is-anim` removed immediately, line scroll `auto`.

## 23. Boot sequence

1. Build the nine model elements into `#crowd`, the nine drawer items, the nine grid labels.
2. Draw the QR; start the clock.
3. Observe the stage with a ResizeObserver (`measure`) and an IntersectionObserver; listen for `visibilitychange`.
4. `#nowTotal` = `09`; `measure()`; `setActive(0, quiet=true)` (renders slip and pieces without animation, no glint); `setAutoplay(autoplay)`; `kick()` — the ring springs from −1.15 to 0, the nine figures swinging around the ellipse until **Somewhere Else** stands at the front-bottom.

---

## 24. Acceptance checklist

- [ ] Single HTML file; Inter Tight (300/400 roman + 300 italic) and Instrument Serif 400 are embedded as woff2 base64 data URIs; no external CSS/JS/fonts.
- [ ] Colours exactly `#ececec` / `#fff` / `#000` / `#6f6f6f`; the three named curves `--ease (.16,1,.3,1)`, `--spring (.34,1.56,.64,1)`, `--morph (.7,0,.15,1)` exist and are used where specified.
- [ ] Every image URL is `https://images.higgs.ai/?default=1&output=webp&url={encodeURIComponent(CDN+file)}&w={w}&q=85` with the CDN base `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/`; nine CUTS at 914/571 with srcset; three SHEETS at 600.
- [ ] Item thumbnails crop the correct sheet cell: sheet = floor((n−1)/3), row = (n−1)%3, column = item index; `background-size:300% 300%`, positions in 50% steps, scale 1.18 (1.32 on hover).
- [ ] Status bar: live clock (initial 06:00), 4 grey signal bars + "Low signal", centred "NOWHERE®", battery 12%, "Bag (0)" pill.
- [ ] Nine models stand upright on an ellipse centred at (W/2, topPad + (H−topPad−bottomPad)/2 + 6); `ry` = 37% (34% mobile) of the inner height; `rx = min(W·.28, ry·1.7)` (mobile `min(W·.3, ry·1.15)`); depth `(1+cos a)/2`; scale `front·(.5+.5·depth)·(1+.14·near)` with front = 25.5% (19% mobile) of H; feet offset `+modelH·s·.08`; blur `max(0,(1−depth)·2.2−.3)`; z `round(depth·1000)+10`; off-screen culling.
- [ ] Cut-outs shifted down by their `foot` fraction; soft three-layer contact shadow under every figure.
- [ ] Serif title "Stay out / of the loop" + "Vol. 01 — Nine looks" sits at `cy − frontH/2 − 6`, between the nearest head and the farthest feet, behind the models; faint dashed ellipse (rgba(0,0,0,.14)) exactly 2rx × 2ry at cy; both fade out (title also scales .94) in grid and focus.
- [ ] Spring: stiffness 95, damping 2√95, 3 substeps, dt ≤ 34 ms, settle at 5e-4; intro spin from −1.15.
- [ ] Drag thresholds (8px horizontal / 10px vertical abandonment, 1.2 ratio), dragPx = max(120 (90), .3W), fling rule (v·160/dragPx, ±1 on |v|>.3, clamp ±2; mobile one step on >30px or |v|>.3); 60 ms click suppression after drag.
- [ ] Horizontal wheel accumulates to 45 and locks 520 ms; arrows rotate; grid up/down jumps 3; Enter opens; Escape closes focus then drawer.
- [ ] Autoplay advances every 5 s under the listed conditions; any manual interaction turns it off; play/pause icon button toggles it.
- [ ] Glint: soft-light white band sweeping left→right in 1.5s on every look change; dock name blur-rises in; item pills rise in staggered 70 ms.
- [ ] Follow cursor (fine pointers only): 80px frosted dashed circle "DRAG", lerp .18; black "VIEW" on the front model (and all models in grid); tiny black dot on other models; black scale .74 while dragging; hidden in focus.
- [ ] Clicking a side model rotates it to the front; clicking the front model, "Shop this fit", a dock piece or pressing Enter opens focus.
- [ ] Grid: 3×3 morph with `--morph` 1.25s and ring-distance stagger (.32s in / .24s out), labels "01  Name" fading in after .9s + i·50ms, hover dims others to .35.
- [ ] Focus: FLIP from the ring/grid figure (transform-origin bottom-left, .95s ease) into a big figure; caption "01. *Name*", rotating ✕ close, hint "Tap a dot to shop this item"; three black numbered dots popping in (.6s + k·.11s) at the tabulated positions; pill tooltips that flip left or drop below to stay inside the stage; hover/focus/click links dots and receipt lines.
- [ ] Slip: 336px white receipt with zig-zag mask bottom, printed down from the top in 18 steps (up from the bottom on mobile), header "NOWHERE® / Vol. 01 · Till 0004 · Lisbon / Look 01 — Somewhere Else", three lines with 01/02/03, name, price, kind and Add/Close/In bag pill, size picker (default M / 41 / One size), Subtotal / Whole fit −10% / Total, CTA "Add whole fit to bag" → "Whole fit in your bag", barcode and "Thanks for going nowhere."
- [ ] Bag logic: one-size items add instantly; others require a size confirmation; CTA adds confirmed items and opens pickers + "Choose size for: …" for the rest; bag tally updates and springs; toasts "Item added to your bag." / "Fit added to your bag." for 2.5 s.
- [ ] Drawer: 560px white panel sliding from the left with 14% page dim, "Looks · Vol. 01" + Close, nine 40px uppercase names with "3 pieces · $…" meta (current italic, hover italic + 8px shift), nav pills Vol. 01 / Places / Letters / Postcards; clicking a look rotates the ring the shortest way.
- [ ] Decorative 25×25 QR from the seeded LCG (seed 7, ×16807 mod 2³¹−1, threshold .52) with three finder squares, top-left under the bar (hidden on mobile).
- [ ] Vertical "Looks" pill on the left and "Ring | Grid" vertical toggle on the right, both reading bottom→top.
- [ ] All responsive breakpoints (1199 / 809) and the reduced-motion behaviour match §21–22; no horizontal scroll at phone width.