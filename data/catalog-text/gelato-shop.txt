# Gelato Lab: Marble Lazy-Susan Flavour Carousel Hero

Recreate this page exactly as described: a single full-screen hero for a fictional artisan gelato brand, **Gelato Lab**. A pale marble ring (a lazy-susan seen straight from above) carries five ceramic bowls of gelato. Every 1.9 s the whole ring turns one step (72°). The bowl at the bottom-centre swings out to the upper-left and shrinks, and the bowl at the upper-right swings down into the centre and grows. In the same move the page background crossfades to the next flavour's colour, the title and labels recolour, and the flavour name swaps. It runs on its own forever: five flavours, then it loops. Build it as one self-contained `index.html` with plain HTML, CSS and vanilla JavaScript (no frameworks, no build step).

---

## 1. Overall feel

- Flat-lay food photography on a saturated pastel field. Camera straight top-down. Soft overhead light.
- Each flavour owns one flat background colour; the colour change is what tells the visitor "new flavour".
- Huge chunky display title at the bottom ("GELATO LAB"). The big centre bowl overlaps its top edge, so the bowl sits in front of the word.
- Small, widely tracked uppercase labels on the left. Two outlined square nav buttons in the top corners.
- Props scattered at the edges for a real-table feel: a waffle cone and raspberries on the left, blueberries with mint on the right, two gold spoons at the bottom corners.
- A faint all-over wavy-line pattern and a soft dark vignette sit over the background colour.

---

## 2. Fonts (exact)

Load from Google Fonts (or embed as base64 `@font-face` for a standalone file):

```
https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Archivo:wght@500;600;700&display=swap
```

- **Dela Gothic One 400**: the display title "GELATO LAB" only.
- **Archivo 600**: the eyebrow "ARTISAN" and the "BUY NOW" button label.
- **Archivo 700**: the flavour name.
- Body fallback: `"Archivo", system-ui, sans-serif`. `-webkit-font-smoothing: antialiased`.

Wait for `document.fonts.ready` before measuring the title (see §6.6).

---

## 3. Assets (exact URLs, all direct Higgsfield results served through images.higgs.ai)

All images are loaded with `crossOrigin = "anonymous"`.

### 3.1 Five gelato bowls (one transparent 2048×2048 PNG each, requested at w=1400)

Each image is a perfectly circular bowl seen straight from above, centred, with a transparent background. The bowl fills **98.5 %** of the image width (`COUPE_FILL = 0.985`).

| # | Flavour | Bowl | Scoops | URL |
|---|---|---|---|---|
| 1 | BERRY / ROSE | glossy ivory porcelain, thin gold rim | raspberry pink with freeze-dried raspberry, dusty rose with rose petals, blackcurrant purple topped with a raspberry and two blueberries | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_062631_ec34a231-9141-457a-afd9-637effe7ec03.png&w=1400&q=90` |
| 2 | PISTACHIO / CREAM | glossy deep burgundy glaze, gold rim | pistachio with chopped pistachios, vanilla bean, white chocolate shavings | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_062744_ac87ceec-2040-4078-80fd-6b6bf016f675.png&w=1400&q=90` |
| 3 | MANGO / PASSION | glossy cobalt blue glaze, gold rim | mango with mango cubes, peach with a peach slice, passion fruit with seeds | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_062753_b99d867d-9f15-4cde-a4b0-08e68fe96931.png&w=1400&q=90` |
| 4 | DARK CHOC / HAZELNUT | matte sage-green stoneware, gold rim | dark chocolate shavings, hazelnut with chopped hazelnuts, coffee with three coffee beans | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_062803_7758f16c-7b82-4eb3-9c3e-aca45f2feda3.png&w=1400&q=90` |
| 5 | BLUEBERRY / LAVENDER | glossy terracotta glaze, gold rim | blueberry with fresh blueberries, lavender with lavender buds, pale lilac | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_062812_b00d1221-9fcc-425e-9c6e-a51ed94ea059.png&w=1400&q=90` |

Each bowl is an `<img class="coupe">` positioned absolutely; no canvas processing.

### 3.2 Props sheet (1024×688, transparent, background removed by Higgsfield)

`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061331_a11a52ac-d35b-4489-afdc-0e3d97464d02.png&w=1024&q=90`

Five items are shown as **CSS background-position crops** of this one sheet (do not slice the image). Boxes in sheet pixels `[x, y, w, h]`:

| key | item | box |
|---|---|---|
| cone | empty waffle cone lying diagonally | `[100, 63, 249, 276]` |
| rasp | three raspberries | `[405, 214, 137, 132]` |
| blue | three blueberries + mint sprig | `[691, 130, 186, 160]` |
| spoonL | gold spoon, bowl top-right, handle to the bottom-left | `[127, 381, 234, 211]` |
| spoonR | gold spoon, bowl top-left, handle to the bottom-right | `[658, 380, 233, 218]` |

For a prop drawn `w` design units wide: `s = w / boxW`; element size `w × boxH·s`; `background-size: 1024·s × 688·s`; `background-position: −boxX·s, −boxY·s` (all multiplied by the design unit `u`, §5). Each prop has `filter: drop-shadow(0 6u 8u rgba(25,12,45,.22))` and `pointer-events: none`.

### 3.3 Marble ring (1024×1024, the ring on flat grey)

`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061250_28696685-24a2-408e-8365-47c9b892d5cc.png&w=1024&q=90`

A pale cream marble annulus with soft grey veins. In the 1024 image its centre is at **(507.5, 502.5)**, outer radius **462.5**, inner radius **354**. The bowls sit on the middle of the band: `BAND = (462.5 + 354) / 2 / 462.5 = 0.8827` of the outer radius.

The grey around and inside the ring is removed with a **CSS radial mask**, not by editing the image (§6.3).

---

## 4. Flavours, colours and order (loop order)

```js
const FLAVOURS = [
  { name: 'BERRY /<br>ROSE',         bg: '#9C8FD0', ink: '#34284A' }, // periwinkle
  { name: 'PISTACHIO /<br>CREAM',    bg: '#E8A0B4', ink: '#4A1F33' }, // rose
  { name: 'MANGO /<br>PASSION',      bg: '#F5D4BA', ink: '#5A3216' }, // peach
  { name: 'DARK CHOC /<br>HAZELNUT', bg: '#C49A9A', ink: '#3B2222' }, // dusty mauve
  { name: 'BLUEBERRY /<br>LAVENDER', bg: '#EBD98A', ink: '#2D2F63' }, // lemon cream
];
```

- `bg` is the page background for that flavour. `ink` colours the title, the eyebrow and its rules, the flavour name and the BUY NOW border and text.
- Bowl i on the ring always carries flavour i (bowl 1 = Berry/Rose, and so on).
- The nav buttons stay white on every flavour.

---

## 5. Page structure and scaling

```html
<main class="hero" id="hero" aria-label="Gelato Lab">
  <div class="waves"></div>
  <div class="stage" id="stage">
    <div class="ring-shadow" id="ringShadow"></div>
    <div class="ring" id="ring"></div>
    <h1 class="title" id="title">GELATO LAB</h1>
    <!-- script appends: 5 × (div.coupe-shadow + img.coupe), then 5 × div.prop -->
    <div class="eyebrow">ARTISAN</div>
    <p class="flavour" id="flavour">BERRY /<br>ROSE</p>
    <button class="buy" type="button">BUY NOW</button>
  </div>
  <div class="vignette"></div>
  <button class="nav-btn nav-menu" type="button" aria-label="Open menu">(3-line menu icon)</button>
  <button class="nav-btn nav-cart" type="button" aria-label="Cart">(cart icon)</button>
</main>
```

- `body`: `overflow: hidden`, `margin: 0`, background is the current flavour colour (set from JS each frame). `.hero`: `position: fixed; inset: 0; overflow: hidden`.
- **Design unit `--u`** (set in px from JS on `:root`). Every size and position below is in design units and written as `calc(N * var(--u))`.
- **Desktop / landscape** (viewport `W/H ≥ 0.9`): a 1440 × 900 design frame. `u = min(W/1440, H/900)`. On short landscape screens (`H < 560`, phones on their side) use `u = min(W/1440, H/770)` instead, so the stage stays bigger and crops a little top and bottom instead of shrinking.
- **Portrait** (`W/H < 0.9`): add `body.portrait`. A 390-wide frame with `u = min(W/390, H/760)`. The stage height is `sh = H/u` design units (CSS var `--hs`).
- `.stage`: `position: absolute; left: 50%; top: 50%; width: 1440u; height: 900u; transform: translate(-50%, -50%)` (portrait: `390u × hs·u`). The ring, bowls, props, title and labels live inside the stage. The waves, the vignette and the nav buttons cover the whole viewport.

### 5.1 Background layers

- `.waves`: absolute, full cover, `opacity: .5`, `pointer-events: none`. A repeating SVG wave line, tile `120u × 28u`:
  ```
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='28' viewBox='0 0 120 28'%3E%3Cpath d='M0 14 C 15 4, 30 4, 45 14 S 75 24, 90 14 S 112 6, 120 14' fill='none' stroke='rgba(30,20,50,0.16)' stroke-width='1.1'/%3E%3C/svg%3E")
  ```
- `.vignette` (above the stage): `radial-gradient(ellipse 75% 70% at 50% 45%, transparent 55%, rgba(20,10,40,.22) 100%)`, `pointer-events: none`.

### 5.2 Nav buttons (white outline squares)

- `position: absolute; top: 26u; width: 60u; height: 60u; border: 1.5u solid color-mix(in srgb, #fff 55%, transparent); border-radius: 14u; background: transparent; color: #fff; z-index: 20; display: grid; place-items: center`.
- Menu at `left: 40u`; cart at `right: 40u`. Icon `24u` square.
- Hover: `background: rgba(255,255,255,.14)` with a `.25s ease` transition.
- Menu icon: `<path d="M4 7h16M4 12h16M4 17h16"/>`, stroke 1.8, round caps, viewBox 24.
- Cart icon: `<path d="M3 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.2L20 8H6.2"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>`, stroke 1.7, round caps and joins.
- Portrait: `top 18u`, `48u` square, radius `12u`, icon `21u`, menu `left 18u`, cart `right 18u`.

### 5.3 Copy (desktop positions in the 1440 × 900 frame)

| element | position | style |
|---|---|---|
| `.eyebrow` "ARTISAN" | left 158u, top 455u, z 6 | Archivo 600, `max(9px, 15u)`, letter-spacing .42em, colour `--ink`; flex row with gap 18u; `::before` and `::after` are 64u × 1.5u rules in `currentColor` (the `::after` has margin-left −6u to balance the tracking) |
| `.flavour` (two lines, e.g. "BERRY /" + "ROSE") | left 190u, top 497u, z 6 | Archivo 700, `max(11px, 21u)`, line-height 1.28, letter-spacing .2em, colour `--ink` |
| `.buy` "BUY NOW" | left 190u, top 572u, 156u × 50u, z 6 | border 2u solid `--ink`, radius 8u, transparent; Archivo 600 `max(9px, 14u)`, letter-spacing .2em, colour `--ink`; hover fills with `--ink` and turns the text `--bg` (.25s) |
| `.title` "GELATO LAB" | left 190u, top 632u, z 3 | Dela Gothic One 400, line-height 1, letter-spacing −.01em, nowrap, colour `--ink`; font-size fitted so the word is exactly **1062u** wide |

**Portrait copy** (centred column): eyebrow centred at `top = copyTop`, 12u, rules 40u, gap 12u. Flavour centred (`left 0; right 0; text-align: center`) at `copyTop + 30`, 17u. Button centred at `copyTop + 92`, 140u × 46u, 13u. Title centred at `titleTop`, fitted to **350u** wide.

---

## 6. Geometry and motion

### 6.1 Ring layout constants

| | desktop | portrait |
|---|---|---|
| ring radius to the bowl centres `R` | 430 | 222 |
| centre bowl diameter `big` | 470 | 262 |
| side bowl diameter `small` | 292 | 158 |
| centre bowl centre `bowlY` | 418 | see below |
| ring centre | `cx = stageWidth/2`, `cy = bowlY − R` | same |

Portrait vertical stack (coupe, then labels, then title, centred between the nav and the spoons):
```
stackH = big + 22 + 138 + 20 + 50;  top = 82;  avail = sh − 70 − top;
bowlY  = top + max(0, (avail − stackH) * 0.45) + big/2;
copyTop  = bowlY + big/2 + 22;
titleTop = copyTop + 158;
```

On desktop the centre bowl's bottom edge (418 + 235 = 653) just overlaps the top of the title glyphs (the title starts at 632 with line-height 1), so the bowl sits in front of the word.

### 6.2 The five bowls on the ring

Five bowls are spaced evenly: `STEP = 360 / 5 = 72°`. A continuous position `p` (0…5) says which flavour is at the front. For bowl `i`:

```
diff = ((i − p) mod 5 + 5) mod 5;  if (diff ≥ 2.5) diff −= 5;   // −2.5 … 2.5
angle = (90 − diff * 72)°          // screen angle, y down; 90° = straight below the ring centre
x = cx + R·cos(angle),  y = cy + R·sin(angle)
ad = |diff|
scale = ad ≤ 1 ? 1 + (small/big − 1)·ad  :  small/big − (ad − 1)·0.08
rotation = (p − i) * 72°           // bowls turn with the ring (rigid lazy-susan)
z-index  = 4 + round(100 − ad*20)  // front bowl on top
```

- At rest (`p` an integer), the front bowl sits at the bottom-centre (angle 90°) at full size. The next flavour (diff = 1) sits at 18°, to the upper-right on the ring, at `small/big` scale. The previous flavour (diff = −1) sits at 162°, to the upper-left. The other two are at 234° and 306°, above the top edge of the screen and hidden.
- As `p` goes from k to k+1, every bowl moves +72° clockwise along the ring. The front bowl swings out to the upper-left and shrinks, the upper-right bowl swings down into the centre and grows, and a new bowl comes in from above the top-right. The hidden bowl moves from 234° to 306° across the top, off screen, so the wrap is never seen.
- Each `img.coupe` element is `big / 0.985` units square (so the visible bowl is exactly `big`). Transform: `translate((x − size/2)·u, (y − size/2)·u) scale(scale) rotate(rotation)`, with `transform-origin` at the centre and `will-change: transform`.
- **Bowl shadow** (`div.coupe-shadow`, under each bowl, `z = bowl z − 1`): a circle `1.12·big` wide, `radial-gradient(circle, rgba(25,12,45,.30) 0%, rgba(25,12,45,.14) 48%, transparent 70%)`, centred on the bowl and moved down by `0.05·big·scale`, scaled by the same `scale` and not rotated.

### 6.3 The ring

- `#ring` is a square of side `D = 2R / 0.8827` units (desktop D ≈ 974; portrait ≈ 503), `border-radius: 50%`, `background-repeat: no-repeat`.
- `background-image`: the ring URL. With `k = D / (2·462.5)`: `background-size: 1024·k·u`, `background-position: (D/2 − 507.5·k)·u  (D/2 − 502.5·k)·u`.
- Mask (both `mask-image` and `-webkit-mask-image`), with `ri = D/2 · 354/462.5 · u` and `ro = D/2 · u`:
  `radial-gradient(circle closest-side, transparent (ri−1)px, #000 (ri+.5)px, #000 (ro−1.5)px, transparent (ro)px)`
- Transform each frame: `translate((cx − D/2)·u, (cy − D/2)·u) rotate(p·72°)`. The ring turns with the bowls.
- `#ringShadow`: the same size, not rotated, moved down 10u; background `radial-gradient(circle closest-side, transparent (ri − 10u), rgba(25,12,45,.16) (ri + 6u), rgba(25,12,45,.16) (ro − 4u), transparent (ro + 14u))`.
- Z-order inside the stage: ring shadow, ring, title (z 3), bowl shadows and bowls (z ≥ 4), props, labels and button (z 6).

On desktop the ring centre is at `y = 418 − 430 = −12`, just above the frame, so you see a U-shaped lower arc. The big front bowl covers its bottom, and the two side bowls sit on its arms near the top corners.

### 6.4 Props placement `[x, y, width, rotation°]` (design units)

Desktop:
```
cone   [-34, 168, 190, -14]    rasp   [34, 340, 118, 0]    blue [1238, 360, 168, 0]
spoonL [ 86, 760, 210,   0]    spoonR [1146, 760, 210, 0]
```
Portrait (`c+n` = `bowlY + n`; `t+n` = `max(titleTop, sh − 170) + n`):
```
cone   [-50, c+150, 104, -14]   rasp [-26, c+250, 70, 0]   blue [312, c+170, 96, 0]
spoonL [-44, t+62, 150, 0]      spoonR [284, t+62, 150, 0]
```
Props are static: they do not move with the ring.

### 6.5 Timeline (measured from the reference prototype)

- **Hold 1400 ms**, then **turn 500 ms**, repeating. One step is 1.9 s, and a full loop of five flavours is 9.5 s.
- Easing of the turn: `cubic-bezier(0.42, 0, 0.58, 1)` (Figma smart-animate "ease in and out"), solved numerically (Newton iterations on x, then y).
- Driven by one `requestAnimationFrame` loop:
  ```
  e = now − phaseStart
  if (e < HOLD)              p = step
  else if (e < HOLD + TURN)  p = step + ease((e − HOLD) / TURN)
  else { step = (step + 1) % 5; phaseStart += HOLD + TURN; p = step }
  ```
  If a frame gap is longer than 250 ms (background tab), push `phaseStart` forward by the gap so the loop resumes from a hold instead of jumping.
- **During the turn, all driven by the same eased t = p − floor(p)**:
  - Background: `body.style.background` and `--bg` are linear RGB interpolations from the current flavour's `bg` to the next one's.
  - Ink: `--ink` interpolates the same way, so the title, labels, rules and button border recolour smoothly.
  - Flavour name: for `t < 0.5` it shows the current name with `opacity = 1 − 2t` and `translateY(−2t · 8u)`. At `t ≥ 0.5` it switches to the next name with `opacity = 1 − 2(1 − t)` and `translateY(+2(1 − t) · 8u)`. So the old name fades up and out, and the new one fades in from slightly below.
  - Ring and bowls move as in §6.2–6.3.

### 6.6 Loading

- `.hero` starts at `opacity: 0` with `transition: opacity .6s ease`. Load all 5 bowls, the ring and the props sheet (`crossOrigin = "anonymous"`) plus `document.fonts.ready`. Then build the bowls and props, run the layout, add `.ready` (fade to `opacity: 1`), and start the loop on the next animation frame. The first flavour then holds 1.4 s before the first turn.
- **Title fit**: set the title to 100px, measure its width, then set `font-size = 100 · (targetWidth · u) / measuredWidth` px (1062u desktop, 350u portrait). Redo the whole layout on `resize`.

### 6.7 Reduced motion

`prefers-reduced-motion: reduce`: no fade-in transition, hold **3000 ms**, turn **1 ms**. The flavour, colours and bowls switch instantly every 3 s, with no rotation.

---

## 7. Responsive checks

- 1440 × 900 desktop: the layout above.
- 1440 × 810 (16:9): `u = 0.9`, stage centred.
- 768 × 1024 tablet portrait and 390 × 844 / 360 × 640 phones: portrait stack. The bowl is centred near the top third, the side bowls peek in at the top corners, labels and button sit centred below the bowl, and the title is right under them. Cone and raspberries hug the left edge, blueberries the right, spoons the bottom corners.
- 844 × 390 / 667 × 375 phones in landscape: desktop layout with the short-screen unit, so the title and labels stay readable and the minimum font sizes (`max(9px, …)`) keep the small text legible.

---

## 8. Accessibility and details

- `aria-label`s on the two icon buttons; the bowl images use `alt=""` (decorative); the flavour name is real text.
- No scroll: the hero is one fixed screen.
- Everything is positioned with transforms; nothing animates layout properties.