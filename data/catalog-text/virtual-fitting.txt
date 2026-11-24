# VirtualFit: Spatial Try-On Arc (exact recreation prompt)

Build a single-screen, visionOS-style virtual try-on hero called **VirtualFit**.

- **Scene:** a softly blurred bright living room fills the screen. A man stands in the centre, cut off at mid-thigh, in front of a huge ghosted `FIT` word.
- **Garment arc:** frosted-glass garment cards curve around him in a 3D arc. They recede, shrink, tilt and blur toward the edges and bob gently. You can drag, flick, scroll, use the arrow keys or buttons, or click a card.
- **Try-on:** when the arc settles on a garment, a glowing horizontal scan line sweeps down the model with a faint scan-line grid and reveals him wearing that garment.
- **Controls:** a glass pill tab bar sits at the top, a glass tool rail on the left, and a glass buy card at the bottom (thumbnail, rolling name and price, size chips and colour dots).
- **Cursor:** a 58px glass cursor reads `TRY ON` over cards and `DRAG` over empty space.

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Reproduce every value, string, timing and URL exactly.

---

## 1. Page basics

- `<html lang="en">`, title `VirtualFit: Spatial Try-On`, viewport `width=device-width,initial-scale=1`.
- **Font:** Inter 400, 500, 600, 700, 800 and 900 from `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap`, with preconnects to fonts.googleapis.com and fonts.gstatic.com (crossorigin). The standalone version embeds the latin woff2 as base64 `@font-face` rules instead.
- **Reset:** `*{box-sizing:border-box;margin:0;padding:0}`. `html,body{height:100%}`.
- **`body`:** background `#e9e4dc`, colour `#fff`, Inter, `overflow:hidden`, antialiased, `user-select:none`.
- **Buttons:** reset to inherit font and colour, no background and no border.
- On `(pointer:fine)`, `cursor:none` on html, body and buttons.
- **CSS variables:**
  - `--ease:cubic-bezier(.2,.8,.2,1)`
  - `--sans:"Inter",system-ui,-apple-system,sans-serif`
  - `--MH:min(78vh,62vw)` (model height; `min(62vh,128vw)` below 768px)
  - `--CW`, the card width, set by JS
  - the three image variables in section 2

## 2. Assets (use these exact URLs)

| Variable | URL | What it is |
|---|---|---|
| `--room` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080623_c94c85a3-23d5-4a0c-afff-41be1b5b8191.png&w=2400&q=85` | Bright Scandinavian living room, 16:9. Big window with plants at left, beige sofa and round coffee table lower left, white wall with leaf shadows in the middle, a plant in a grey pot and an oak shelf with books at right, oak floor with a cream rug. |
| `--model` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080717_e02cb856-b812-4c9b-9b86-8a741c7f65eb.png&w=2688&q=85` | Transparent sheet, 2688×1520. The same man (short dark hair, trimmed beard, charcoal trousers) five times side by side, from head to mid-thigh, in: a white crew tee, an oversized white sweatshirt, a white linen shirt, a heather-grey hoodie, and a white ringer tee with black trims. |
| `--garm` | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261104_080719_f5a4cca2-cf42-4957-ab3b-ddec34d2b71a.png&w=2048&q=85` | Transparent ghost-mannequin sheet, 2048×1360, in a 3×2 grid. Top row: white tee, white sweatshirt, white linen shirt. Bottom row: grey hoodie, ringer tee, navy tee (the navy tee is unused). |

**Crops:**
- **Model:** each figure is a 524×1360 window of the model sheet, so `background-size:513% 111.76%` with `background-position-y:100%`.
- **Garments:** each is a 640×640 box of the garment sheet, so `background-size:320% 212.5%`.

## 3. Data

```js
const ITEMS=[
  {n:"Basic T-shirt", p:45,  g:[1.14,3.06],  m:.37,   c:[["White","#f4f2ee"],["Ash","#c9c7c2"],["Charcoal","#3b3c3f"],["Navy","#27324d"]]},
  {n:"Basic Sweater", p:105, g:[49.7,1.39],  m:25.0,  c:[["White","#f6f4ef"],["Oat","#ddd3c2"],["Sage","#b9c2ae"],["Black","#1f1f21"]]},
  {n:"Linen Shirt",   p:95,  g:[98.2,3.33],  m:49.86, c:[["White","#f7f6f1"],["Sand","#d9ccb4"],["Sky","#bcd0e2"],["Olive","#717556"]]},
  {n:"Grey Hoodie",   p:110, g:[1.14,93.3],  m:74.77, c:[["Heather","#a9a9a8"],["Bone","#e6e1d6"],["Forest","#33463a"],["Black","#1f1f21"]]},
  {n:"Ringer Tee",    p:55,  g:[49.7,95.3],  m:99.35, c:[["White / Black","#f4f2ee"],["Cream / Navy","#efe6d3"],["Grey / Red","#c9c7c2"],["White / Green","#e9efe8"]]},
];
```

- `g` is the garment `background-position` (x%, y%).
- `m` is the model `background-position-x` (%).
- There are 10 cards in all (two copies of the 5 items, so the arc loops seamlessly).

## 4. Layers and styling

1. **`.room`** (fixed, inset -3%): the room on `center/cover`, `filter:blur(2.5px) saturate(1.05)`, `transform:scale(1.08)`. An `::after` overlay adds `radial-gradient(70% 60% at 50% 45%, rgba(255,252,246,.10), rgba(40,30,20,.16))`.
2. **`.ghost`** (fixed, z 2): `FIT` with each letter in its own inline-block span.
   - Position: centred at `top:calc(50% − MH×.42)`.
   - Font: Inter 900 at `MH×.42`, line-height .8, letter-spacing -.04em.
   - Colour `rgba(255,255,255,.3)`, a 1px stroke `rgba(255,255,255,.35)`, and text-shadow `0 1px 0 rgba(255,255,255,.35)`.
3. **Glass material `.glass`** (used by the tabs, rail, arrows, cards and buy card):
   - background `linear-gradient(155deg, rgba(250,248,245,.30), rgba(150,144,136,.20) 48%, rgba(205,200,192,.24))`
   - `backdrop-filter:blur(22px) saturate(1.5)`
   - border `1px solid rgba(255,255,255,.5)`
   - shadows `inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 0 rgba(255,255,255,.12), 0 20px 50px -24px rgba(40,30,20,.45)`
4. **Tabs `.tabs.glass`:**
   - Layout: fixed, centred, top 4.2vh, z 30, padding 5px, radius 999px, gap 2px.
   - Buttons: `Tops` (active), `Bottoms`, `Outerwear`, `Shoes`, `Accessories`. Each is 38px tall with 0 22px padding, Inter 500 14px, colour `rgba(30,30,32,.72)`; the active one is `#111`.
   - A sliding white pill (`rgba(255,255,255,.92)`, shadow `0 4px 14px -6px rgba(0,0,0,.3)`) sits under the active tab. It moves with `transform` and `width` over .6s `--ease`.
5. **Rail `.rail.glass`:**
   - Layout: fixed, left `max(18px,1.8vw)`, vertically centred, padding 8px, gap 10px, radius 999px.
   - Four 42px round buttons with 20px icons: a filled tee (active: white `rgba(255,255,255,.9)` disc, colour #111), a cart, a calendar and a profile.
   - Inactive icons are `rgba(30,30,32,.8)` and hover to `rgba(255,255,255,.35)`.
6. **Stage `.stage`** (fixed, inset 0, z 10, `touch-action:pan-y`) holds `.arc` at the centre.
   - Each `.card.glass` is `CW` wide and `CW×1.42` tall, centred on the arc origin, radius 22px, overflow hidden.
   - Inside each card:
     - Garment image `.g`: left/right 8%, top 5%, height 66%, `drop-shadow(0 14px 14px rgba(40,30,20,.22))`.
     - Name: Inter 500 at `CW×.068`, bottom 17%.
     - Price `$NN`: Inter 700 at `CW×.095`, bottom 7%.
     - Name and price are both white with `text-shadow 0 1px 8px rgba(0,0,0,.18)`.
   - A `.sheen` diagonal highlight (`linear-gradient(105deg, transparent 40%, rgba(255,255,255,.5) 50%, transparent 60%)`) sweeps across once (1s) when the cursor enters a card.
   - `CW = min(14.8vw, 33vh)`, or `min(30vw, 170px)` below 768px.
7. **Model `.model`** (fixed, centred, bottom 0, height `--MH`, `aspect-ratio:524/1360`, z 50, no pointer events). Layers:
   - `#mCur`: the current outfit.
   - `#mNext`: the next outfit, starting at `clip-path:inset(0 0 100% 0)`.
   - `.grid`: `repeating-linear-gradient(0deg, transparent 0 5px, rgba(255,255,255,.22) 5px 6px)`, `mix-blend-mode:screen`, clipped.
   - `.scan`: a 2px line spanning -14% to 114% of the width. Gradient `transparent → #fff 18% → #fff 82% → transparent`, glow `0 0 18px 4px rgba(255,255,255,.75), 0 0 60px 10px rgba(190,225,255,.45)`. Its `::after` trails a `MH×.12` tall wash, `linear-gradient(to top, rgba(220,238,255,.32), transparent)`, above it.
8. **Arrows:** 46px glass circles with 16px chevrons in `#222`, vertically centred. Left one at `calc(max(18px,1.8vw) + 76px)`, right one at `max(18px,1.8vw)`. Hidden on phones.
9. **Buy card `.buy.glass`:**
   - Layout: fixed, centred, bottom 4.6vh, z 60, width `min(640px, 100vw − 32px)`, flex, gap 22px, padding `12px 22px 12px 12px`, radius 24px, white text, text-shadow `0 1px 6px rgba(0,0,0,.18)`.
   - **Thumbnail:** 64px, radius 14px, `rgba(255,255,255,.3)`, garment inset 6px.
   - **Info:** name in Inter 600 16px; price in Inter 500 14px at .9 opacity. Each sits in a `.ln` mask, 1.15em tall with overflow hidden, so text can roll.
   - **`Size`** label (Inter 500 12px, .85 opacity), then 30px round chips `S` `M` `L` `XL`. They are `rgba(255,255,255,.22)` with white text; the active one (`M` at start) is white with #111 text; pressing one scales it to .9.
   - **Colour:** the label `Color · <name>` rolls when it changes. Below it are four 18px dots in the item's colours. The active dot has a ring: `0 0 0 2px rgba(255,255,255,.95), 0 0 0 4px rgba(0,0,0,.12)`.
10. **Cursor `.cur`** (58px, fixed, z 100):
    - Ring: 1.5px `rgba(255,255,255,.95)` border, `rgba(255,255,255,.14)` fill, `backdrop-filter:blur(6px)`, shadow `0 6px 20px -8px rgba(0,0,0,.35)`.
    - A 6px white dot in the centre.
    - Hidden labels in Inter 700 10px, letter-spacing .12em: `TRY ON` (#111) and `DRAG` (white).
    - It follows the pointer with `pos += (target − pos) × .22`.
    - Over a card (`try`): the ring scales to 1.5 and fills `rgba(255,255,255,.92)`, and `TRY ON` scales in.
    - Over empty stage or while dragging (`drag`): the ring scales to 1.2 and `DRAG` shows.
    - Over a button (`btn`): the ring scales to .6.
    - Pointer down: 1.05.
    - Transitions: ring .5s, dot .4s, text .45s, all `--ease`.

## 5. Arc maths (every animation frame)

**State:** `pos` (float), `target` (int). When not dragging, `pos += (target − pos) × .11`.

**Card offset:** for card `i`, `u = mod(i − pos + 5, 10) − 5`. Let `a = |u|` and `sg = sign(u)`.

**Horizontal placement:**
- Table `XS = [0, .215, .345, .432, .49, .52] × W` (phones: `[0, .36, .5, .56, .6, .62] × W`).
- `xAt(a)` interpolates linearly through that table.
- `x = sg × xAt(a) × ie`, where `ie` is the intro ease (below).

**Per-card values:**
- **Behind the model** (`a < 1`): `s = .55 + .45a`, `z = −260(1 − a)`, opacity `a`, `ry = −sg × 16a`.
- **Otherwise:** `s = 1 / (1 + .3(a − 1)^1.15)`, `z = −110(a − 1)`, `ry = −sg × (16 + 9 × min(2, a − 1))`, blur `max(0, a − 1.6) × 2.4` px.
- **Far edge** (`a > 3.4`): opacity `1 − (a − 3.4)/.8`.
- **Bob:** `sin(t × 1.1 + seed) × H × .006 × min(1, a)`. `y = bob − (1 − s) × H × .04`.
- **Pointer tilt:** `ry += sx × 10`, where `sx` and `sy` are the smoothed pointer offsets in [-.5, .5], smoothed by `× .06`.

**Transform:** `translate(x, y) perspective(1300px) translateZ(z) rotateY(ry) rotateX(−sy × 6) scale(s × (.6 + .4ie))`. Each card carries its own perspective; there is no shared `preserve-3d` scene, which keeps the backdrop blur from flickering.

**Stacking and visibility:** z-index is 1 behind the model, otherwise `round(100 − 10a)`. A card is hidden when its opacity is below .01. Card opacity is multiplied by `ie`.

**Intro:** `intro += .012` per frame, and `ie = 1 − (1 − intro)³`. The cards spread out from the centre and scale up.

**Parallax:**
- Room: `translate3d(−sx × 22px, −sy × 14px, 0) scale(1.08 − .03ie)`.
- Ghost word: `translate(calc(−50% − sx × 40px), −sy × 16px)`.
- Ghost letters rise in: letter `i` gets `translateY((1 − ie)(60 + 30i)px)`.

**Settle:** when `|target − pos| < .02` and `mod(round(target), 5)` differs from the outfit shown (and nothing is being dragged), run try-on for that item.

## 6. Try-on scan (950 ms, `cubic-bezier(.65,0,.35,1)`)

1. Update the buy card, cancel any running scan, and set `#mNext` to the new figure.
2. Run these Web Animations together:
   - **`#mNext` clip:** `inset(0 0 100% 0)` → `inset(0 0 0% 0)` over 950ms, fill forwards.
   - **`.grid` clip:** `inset(0 0 100% 0)` → `inset(0 0 0 0)` at 50% → `inset(100% 0 0 0)` over 1092ms.
   - **`.scan`:** top 0%, `scaleX(.2)`, opacity 0 → top 6%, `scaleX(1)`, opacity 1 at 8% → top 94% at 92% → top 100%, `scaleX(.2)`, opacity 0.
   - **`#mNext` settle:** `scale(1.012)` → 1 over 1250ms, ease-out.
3. When the clip animation finishes, copy the figure to `#mCur` and cancel all four animations.

On load, `#mCur` stays hidden and the first scan reveals the model from nothing.

## 7. Buy card updates

- **Name, price and colour label** roll: the old text animates `translateY(0)` → `−110%` while the new text animates `110%` → `0`, over 620ms with `cubic-bezier(.2,.8,.2,1)`.
- **Thumbnail:** jumps to the new crop and animates from `translateY(70%) scale(.8)` over 650ms.
- **Colour dots:** rebuilt from the item's colours with the first one active. Clicking a dot rolls the label to `Color · <name>`.
- **Size chips:** clicking one sets it active.

## 8. Input

- **Drag:** pointerdown on the stage starts a drag. `pos = p0 − dx / XS[1]` (one card per arc step), and the velocity is tracked in px/ms. On release, `target = round(pos − flick × 3.2)`.
- **Click:** a click (moved under 6px) on a card sets `target` so that card comes to the centre.
- **Wheel:** horizontal or vertical delta builds up past 60, then steps ±1 with at least 260ms between steps.
- **Keys and buttons:** arrow keys and the arrow buttons step ±1.
- **Tabs:** clicking a tab slides the pill to it and adds 5 to `target`, so the arc does a full lap and lands back on the same garment.

## 9. Phones (≤767px) and reduced motion

- **Phones:**
  - The tabs shrink to 32px with 0 13px padding and 12px text, and scroll sideways.
  - The rail moves to bottom left (`left:10px`, `bottom:calc(4.6vh + 150px)`) with 34px buttons.
  - The arrows are hidden.
  - The buy card wraps onto two lines.
- **Reduced motion:**
  - The spring snaps straight to the target and the intro is instant.
  - No bob and no sheen.
  - The scan is skipped: the outfit swaps instantly.
  - The buy card text swaps without rolling.