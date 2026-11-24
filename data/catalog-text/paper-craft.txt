# Foldwild Studio: full recreation brief

Build this website exactly as described: a single-page, hash-routed site for a fictional paper-craft studio called **Foldwild Studio**. Everything is one `index.html` with inline CSS and JavaScript, plus GSAP 3.12.5 from `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`. There is no build step and no framework. All imagery and video are loaded from the URLs listed below. Do not substitute, re-host or crop them into new files. Several objects are shown from one sprite sheet using CSS `background-size` and `background-position`.

The site has five page types: an **intro film**, a **home slider**, a **product page** (five items), a **menu overlay**, and an **editorial page** (About, Studio, Journal). The look is matte low-poly folded-paper sculptures floating over flat pastel colour fields, with deep-ink type.

---

## 1. Media

### 1.1 Sprite sheets (transparent PNG, 2048×2048, 2×2 grid of four cut-out paper objects)

Load each through the image proxy at width 1600. Each sheet is the background image of an absolutely positioned `div`.

| Key | Contents (quadrant 0 top-left, 1 top-right, 2 bottom-left, 3 bottom-right) | URL |
|---|---|---|
| s1 | 0 large blue Morpho butterfly, wings open; 1 Morpho side view, wings raised; 2 small Morpho from above; 3 peach paper blossom | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220652_7971eee8-dbed-4c0c-88a9-cd5772b5afc9.png&w=1600&q=85 |
| s2 | 0 coral/white koi curving left; 1 koi curving right (wide); 2 small white/gold koi; 3 lily pad with pink lotus | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220651_df022d4d-2138-4a6e-a7c0-d3292ed6e3af.png&w=1600&q=85 |
| s3 | 0 large magenta beetroot with tall leaves; 1 tilted beetroot; 2 pair of beetroots tied; 3 halved beetroot with rings | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220652_551a1ee3-3deb-4057-bc02-5e070de60636.png&w=1600&q=85 |
| s4 | 0 large violet/crimson betta facing left; 1 teal/violet betta facing right; 2 small crimson betta; 3 green aquatic plant with bubbles | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220652_d0ec09b0-b7c1-4601-90ea-dd3f2b6a9284.png&w=1600&q=85 |
| s5 | 0 large orange Monarch butterfly, front view; 1 Monarch at an angle; 2 small Monarch from the side; 3 empty | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220650_88a4dc53-9985-4ca3-a53d-01ac559c178c.png&w=1600&q=85 |

**Exact crop boxes** for each object, as percentages of the full sheet (x, y, width, height):

- s1: q0 (9.18, 8.79, 39.06, 33.98) · q1 (63.09, 11.72, 25.2, 31.84) · q2 (14.06, 63.09, 25.59, 18.36) · q3 (63.48, 63.09, 18.55, 19.14)
- s2: q0 (10.94, 8.79, 26.37, 37.89) · q1 (53.91, 16.99, 40.63, 31.45) · q2 (14.45, 58.79, 24.02, 25.59) · q3 (58.59, 62.5, 25.98, 22.07)
- s3: q0 (12.11, 3.91, 26.56, 41.8) · q1 (58.01, 13.09, 35.35, 28.91) · q2 (12.89, 54.1, 25.98, 35.74) · q3 (58.01, 63.67, 33.59, 21.68)
- s4: q0 (4.3, 5.86, 42.77, 39.65) · q1 (55.08, 10.94, 38.28, 33.59) · q2 (13.09, 60.16, 28.32, 25.2) · q3 (60.35, 58.98, 24.22, 30.08)
- s5: q0 (6.25, 10.35, 39.06, 28.52) · q1 (59.96, 7.62, 29.88, 33.2) · q2 (16.21, 57.23, 25, 28.71)

**How to show one object at a target width `w` (px).** Let `bs = w / (cropW/100)`. The element is `w` wide and `w × cropH / cropW` tall, with `background-size: bs px bs px`, `background-position: −(cropX/100)·bs px −(cropY/100)·bs px` and `background-repeat: no-repeat`.

**Shadow under every object.** A separate `div` with `border-radius: 50%`, background `rgba(29,27,46,.22)` and `filter: blur(14px)`. It is `0.62w` wide and `0.11w` tall, placed at x = object x + `0.19w` and y = object y + `1.02 × object height`. On the home stage it sits lower by `0.05 × viewport height × r` (r is defined in §5). Its opacity is `alpha × (0.55 + 0.45r)`, times 0.6 for back objects. In static layouts (product card, loop fallback, menu preview) the shadow's opacity is 0.33 for the back object and 0.55 for the front ones.

### 1.2 Scene sheets (2048×1360, 2×2 grid of 3:2 paper dioramas separated by thin white gutters; load at width 2048)

| Key | Quadrants | URL |
|---|---|---|
| c1 | 0 orange paper glasshouse with butterflies flying out (mint ground); 1 red/white striped lighthouse on rocks over folded blue waves with leaping orange fish (peach); 2 orange market cart with striped awning and vegetables rolling down a yellow road (butter); 3 paper workbench with folded butterflies, fish and scissors (lilac) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220553_70fa0711-1de7-4c3c-85e7-cafe4934e3c2.png&w=2048&q=85 |
| c2 | 0 round paper koi pond with koi and lily pads (powder blue); 1 folded paper numbers "2026" with butterflies on top (peach); 2 rows of paper beetroot in a folded field (mint); 3 striped paper sailboat on folded waves with leaping fish (butter) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261111_220552_1b871352-ee7b-49f9-9834-95c47ffa249a.png&w=2048&q=85 |

**How to show one quadrant `q` (qx = q mod 2, qy = q div 2) cover-cropped into a box of size bw × bh.** Let qw = 2048/2 × 0.97 and qh = 1360/2 × 0.96. Let s = max(bw/qw, bh/qh) × zoom, with zoom 1.04 for page images and 1 for cards. Then `background-size: 2048·s px 1360·s px` and `background-position: (bw/2 − (qx+0.5)·1024·s) px (bh/2 − (qy+0.5)·680·s) px`. Recompute on resize.

### 1.3 Videos (direct links, H.264, 1280×720, 24 fps, muted)

- Intro film, 10.04 s: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224117_b319aa12-0927-4642-99b2-12727753649b.mp4. A camera glide across a miniature paper world: glasshouse with butterflies streaming out, koi pond, beetroot rows, mint sky.
- Product loops, 5.04 s each, seamless (first frame equals last). Three paper objects of that item move hard on the item's card colour, with soft shadows:
  - morpho: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224035_63943978-3c02-4c51-81ab-fc2c80896997.mp4
  - koi: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224035_452afb5a-4a77-4caf-80d6-fae74e5aa7ac.mp4
  - beetroot: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224035_23822af0-dadb-411e-b7da-6ef2d4f4490c.mp4
  - betta: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224035_ae5474fc-8fdf-4fc4-8445-8a69340fbaf3.mp4
  - monarch: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261111_224035_37ddbd70-4e22-4d23-a87e-1f46b4851fff.mp4

---

## 2. Fonts, head, colour tokens

- **Font: Figtree**, the variable font covering weights 300–900 (Google Fonts: https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap; latin woff2 file https://fonts.gstatic.com/s/figtree/v9/_Xms-HUzqDCFdgfMm4S9DQ.woff2). Self-host or embed it as `@font-face{font-family:Figtree; font-weight:300 900; font-display:swap}`. Use weight 500 for all headings, labels and buttons, and 400 for body text. The fallback is `system-ui, sans-serif`, with antialiased smoothing.
- **Head:** `<title>Foldwild Studio</title>`, meta description "Foldwild Studio folds butterflies, fish and garden produce from paper.", viewport `width=device-width,initial-scale=1`.
- **Tokens:**
  - `--ink: #1D1B2E` for all text and buttons.
  - `--ivory: #FAF6F0` for the menu background and button text.
  - `--u: calc(100vw/1440)` is the design unit. Every desktop size below written as "N u" means `calc(N * var(--u))`.
  - `--vh` is set from JavaScript to `innerHeight/100 px`.
  - `--pbg` is the current page background colour.
- **Slide colours** (page background / card panel):
  - Morpho #F7C6B2 / #FBDDD0
  - Koi #B7D3F3 / #D2E3F8
  - Beetroot #BEE5D3 / #D7F0E4
  - Betta #F6E3A1 / #FAEDC4
  - Monarch #CDBBF2 / #DFD3F7
- **Editorial page colours:** About #BEE5D3, Studio #CDBBF2, Journal #F7C6B2. The content section background is #FBFAF8. Body grey is #55535f for editorial paragraphs and #77757f for the cover card description.
- **Page shell:** `html` and `body` are 100% tall with `overflow: hidden`, and the body background follows the current colour. Links inherit their colour and have no underline. Buttons are unstyled.

---

## 3. Data

### 3.1 Five slides (in this order; the slider loops)

Each object is listed as quadrant q, then card placement l/t/w (left and top as % of the card's width and height, width as % of the card's width), desktop home position d=[x%, y%] of the viewport, mobile home position m=[x%, y%], and parallax speed sp. The first object of each slide is the **back** object, drawn behind the title. The other two are **front** objects, drawn in front of it.

1. **morpho**, sheet s1, tab "Morpho", title lines "Morpho" / "wings", float object q3.
   - back q1: l50 t8 w27, d[23,13], m[33,23], sp .9
   - q0: l2 t40 w43, d[7,41], m[2,51], sp 1.1
   - q2: l60 t46 w31, d[70,45], m[62,55], sp 1.2
2. **koi**, s2, "Koi", "Koi" / "carp", float q3.
   - back q0: l16 t3 w27, d[19,9], m[10,21], sp .9
   - q2: l6 t46 w28, d[11,47], m[4,53], sp 1.1
   - q1: l50 t38 w47, d[64,41], m[46,54], sp 1.25
3. **beetroot**, s3, "Beetroot", "Ruby" / "beetroot", float q3.
   - back q0: l46 t3 w28, d[22,10], m[30,20], sp .9
   - q2: l4 t42 w29, d[7,44], m[3,52], sp 1.1
   - q1: l58 t42 w38, d[68,43], m[58,55], sp 1.2
4. **betta**, s4, "Betta", "Betta" / "fins", float q3.
   - back q0: l36 t1 w44, d[24,7], m[14,20], sp .9
   - q2: l6 t46 w30, d[11,46], m[4,52], sp 1.1
   - q1: l56 t42 w40, d[67,43], m[56,56], sp 1.3
5. **monarch**, s5, "Monarch", "Monarch" / "flight", float q2.
   - back q1: l52 t5 w30, d[22,12], m[33,22], sp .9
   - q0: l4 t38 w46, d[8,41], m[2,51], sp 1.1
   - q2: l62 t46 w27, d[70,46], m[62,56], sp 1.2

**Product copy.** Every product's small label (`sub`) is "Collection". Each has a title, a description and an info title, which is "Inside the series" for all five, followed by five list lines.

- **Morpho wings.** Description: "Our Morpho series is folded from forty-two hand-cut sheets of cobalt and ink paper. Every wing is scored by hand so the facets catch the light the way a living Morpho does, then mounted to hover a finger's width off the wall."
  List: 42 folds in every butterfly · Cobalt, ink and pearl papers · Mounted on a hidden brass pin · Shipped flat in a linen sleeve · Signed and numbered editions of 60.
- **Koi carp.** Description: "Each koi begins as a single sheet of coral paper and a single sheet of white. We fold the two together so the pattern runs through the body like real scales, then shape the long tail fins by hand until they look caught mid-turn."
  List: Two-sheet fold for true markings · Fins shaped by hand, never cut · Coral, pearl and gold papers · Hung on a near-invisible line · Signed and numbered editions of 48.
- **Ruby beetroot.** Description: "Our garden pieces start in the kitchen garden behind the studio. We study the real roots through the season, then fold them in deep magenta stock with leaves pressed from a darker green, so a bowl of them looks freshly pulled."
  List: Studied from our own garden rows · Magenta stock with pressed leaves · Sold singly or as a bunch of three · Lacquer-free, matte finish · Made to order in four weeks.
- **Betta fins.** Description: "The betta is our most layered fold. Its tail alone takes sixty pleats of violet and crimson tissue, set one over another so light passes through the edges. We hang each one as if it has just flared at its own reflection."
  List: Sixty pleats in every tail · Violet, crimson and teal tissue · Light passes through the fin edges · Ships in a rigid display box · Signed and numbered editions of 36.
- **Monarch flight.** Description: "Monarchs travel thousands of miles each autumn, and this series follows their route. Each butterfly is folded from orange and black paper and finished with a hand-painted white border, so no two wings are quite the same."
  List: Hand-painted wing borders · Orange, ink and bone papers · Sold singly or as a flight of five · Mounted on a hidden brass pin · Signed and numbered editions of 60.

### 3.2 Editorial pages

Each page has a title, a cover scene, a cover description and three blocks. Each block has a heading, a scene and a paragraph. The blocks alternate sides.

**About:** title "Foldwild Studio", cover c1 q0.
- Cover: "Foldwild is a small paper studio that folds butterflies, fish and garden produce by hand. Every piece is designed, scored and folded in our workshop, from a single sheet or a few, with no glue on show."
- History (c2 q1): "Foldwild began in 2016 on a kitchen table with a stack of offcuts and a single blue butterfly. The first pieces went to friends, then to a neighbourhood market. Today a team of eight folds every edition in a bright studio above a print shop, still by hand and still one sheet at a time."
- The garden (c2 q2): "Behind the studio we keep a small kitchen garden. We grow the beetroot, squash and peppers that our produce series is modelled on, and we sketch them through the season. When a root is pulled, it comes inside to the workbench so we can study the shape before we fold it."
- Market days (c1 q2): "Once a month we load a cart and take new pieces to the market in person. It is where we hear what people love, which colours they reach for and which folds make children laugh. Many of our best ideas started as a question asked over the cart."

**Studio:** title "The Studio", cover c1 q3.
- Cover: "Our studio is a long room with north light, three cutting tables and a wall of paper. Here we design new folds, test them dozens of times and keep a library of every pattern we have ever made."
- Paper first (c2 q0): "We source papers from three mills that still make them slowly. Each colour is chosen for how it holds a crease and how it turns in the light. A koi needs a soft, strong sheet; a betta tail needs tissue so thin the light passes straight through."
- Testing a fold (c2 q3): "A new design is folded around thirty times before it joins a collection. We trim, re-score and refold until the piece holds its shape without support. Only then do we write the pattern down and number the first edition."
- Workshops (c1 q3): "Twice a season we open the studio for small workshops. Guests fold a simple butterfly or a fish, and leave with a pattern sheet so they can keep folding at home. Places are limited to ten so everyone gets time at the table."

**Journal:** title "Journal", cover c1 q1.
- Cover: "Notes from the studio: where our ideas come from, what we are folding next and the people and places that shape each collection."
- By the sea (c2 q3): "Our koi and betta pieces began on a week by the coast, watching fish turn in rock pools. We came home with a notebook of sketches and a box of shells, and spent the winter learning how to fold movement into a fin."
- The koi pond (c2 q0): "A neighbour lent us their pond for a summer of study. We sat by it most mornings, drawing the way the koi bend and gather. The curve of our koi series comes straight from those mornings, folded into paper over many attempts."
- Next season (c2 q2): "Next season we are working on a series of garden roots and a new flight of moths, folded in softer papers with hand-painted edges. As always, we will share the first pieces here before they reach the studio shelves."

---

## 4. Persistent chrome (fixed on every page)

- **Logo.** Top-left at 42u / 36u, z-index 75, linking to `#/`. A 22u triangle mark (one solid ink triangle with a second, 45%-opacity triangle overlapping its right side) followed by the stacked lowercase wordmark "foldwild" / "studio". Weight 500, 25u, line-height 0.86.
- **Burger.** Top-right at 42u from the right and 36u from the top. A 58u round button, z-index 80, with three 2px ink bars, each 44% of the button's width, spaced 7px apart. When the menu is open, an ink circle scales from 0 to 1 behind the bars, the bars turn ivory, the outer bars rotate ±45° and scale to 0.6 width to form an X, and the middle bar fades out. Easing is `cubic-bezier(.77,0,.18,1)` over 0.5s.
- **Footer links.** Bottom-left at 46u / 36u, 13u, weight 500, 52u gaps: "EN" (1.5px underline), "FR" (55% opacity), "Legals" (to #/about), "Replay film".
- **Header backdrop (phones only).** A fixed 74px bar (96px on tablets) behind the logo and burger, filled with `--pbg`. It fades in over 0.4s once a page has scrolled more than 40px.

---

## 5. Home slider (the stage)

The stage is a fixed full-screen layer holding:
- a background div whose colour follows the current slide;
- a "card" div, a W×H rectangle with `transform-origin: 0 0`, hidden until Discover;
- for each slide, in this stacking order: the back object and its shadow, then a `<canvas>` with the two-line title, then the front objects and their shadows.

The stage uses `cursor: grab`, `touch-action: pan-y` and `user-select: none`.

### 5.1 Viewport configuration (recomputed on resize)

- **Desktop**, any viewport except a phone or tablet held upright:
  - title font size `fs = round(min(0.099W, 0.19H))`;
  - `coeffWidth = 1`;
  - card (the Centre stage product layout): width = 0.36W, height = 0.64H, x = (W − card width)/2, top 0;
  - `dcx = 0.1W` (how far the title drifts right while closing), `dcy = 0`.
- **Mobile**, W ≤ 820 and H ≥ W:
  - `fs = 0.13125W`;
  - `coeffWidth = 1.5`;
  - card x = 0.11W, card width = 0.78W, card height = 1.2675 × card width;
  - `dcx = 0`, `dcy = −0.1H`.
- In both, `ratio = 0.5 × fs / 190`.

### 5.2 Index controller

This is a looping, smoothed index, ported from the original site's slider.

- **State:** `goto`, `smooth`, `int` (the rounded current slide), `drag`, `trans`, `rc` (0 means home, 1 means closed into the card), `alpha`.
- `real(i) = ((i mod 5) + 5) mod 5`.
- **Every frame:**
  - if a tween is running (`trans`), `smooth = goto`;
  - otherwise `smooth += (goto − smooth) × k`, with k = 0.1 while dragging and 0.05 otherwise, and snap when the difference is under 1e-5;
  - `int = real(round(smooth))`. When it changes, fire "change".
- **`gotoIdx(t)`:**
  1. Wrap `smooth` and `goto` with `real`.
  2. Take the shortest path round the loop: if |target − goto| > 2.5, add or subtract 5.
  3. Set `int` to the target immediately.
  4. GSAP-tween `goto` to the target over **2.5s, ease `power4.inOut`**, with `trans = true` until it completes.
- **On "change":**
  - move the tab indicator;
  - restart the autoplay timer;
  - point the Discover link at `#/item/<id>`;
  - tween the background colour from its current value to the new slide's colour, over 2.5s with quintic in-out easing if a slide tween is running, otherwise 1s linear.

### 5.3 Per-frame rendering of each slide i

1. Compute `n = i − real(smooth)`, wrapped into the range −2.5…2.5. Show the slide only while −1 < n < 1.
2. **Slides move vertically (the Left index layout).** Offsets are `dx = 0` and `dy = n × H × coeffWidth`: the next slide waits one screen below and rises into place, and the previous one leaves upward. Each object multiplies dy by its own speed `sp`, so back and front objects separate as they travel.
3. **For each object**, precompute on resize:
   - width w = card width × l/100, height h = w × cropH/cropW;
   - card position `pc = (cardX + o.l/100 × cardW, o.t/100 × cardH)`;
   - home offset `ph = (dx' × W/100 − pc.x, hy − pc.y)`, where hy = d.y × H/100. On desktop each object's home x is remapped to clear the left tab list: `dx' = 20 + 0.76 × d.x` (for example 7 → 25.3, 23 → 37.5, 70 → 73.2). On phones dx' = m.x.
   - On mobile, keep objects clear of the title. With `tt = H/2 − 1.36fs − 0.04H`: hy = min(hy, tt − 0.95h) for the back object, and hy = max(hy, tt + 1.45fs) for front objects.
4. **Each frame, for each object**, with r = 1 − rc:
   - `X = pc.x + ph.x × r + md.x` and `Y = pc.y + dy × sp + ph.y × r + md.y`.
   - **Mouse parallax:** `mouse = −(clientX − W/2, clientY − H/2)`, scaled by r.
   - Each object eases its own offset: `md += (mouse × ratioObj − md) × mr`, with `mr = lerp(0.05, 1, rc)`.
   - `ratioObj` interpolates from 0.005 to 0.01 for the back object and from 0.02 to 0.05 for front objects, by the object's index ÷ 2.
5. **Title canvas.** Pre-render each line in Figtree 500 at size fs, colour #1D1B2E, `textBaseline: middle` at 0.62fs, at up to 2× device pixel ratio. The lines are spaced 1.02fs apart and centred on each other.
   - **Stretch effect** (from the reference's letter sprites): each line has one "stretch column", a 1px-wide slice inside a letter.
   - To choose it, scan columns between 25% and 75% of the line width. Keep columns whose ink pixels are all between 36% and 86% of the line height and number fewer than 13% of that height. Score each as `count + |x/width − pref| × h × 0.4`, where pref is 0.42 for line 1 and 0.58 for line 2, and take the lowest score.
   - Stretch amount `i = 225 × clamp(|n|, 0, 0.5) × ratio × |horizontal component of the slide direction|`. With vertical slides this is 0, so the column-picking code is kept but the title does not stretch in this layout.
   - Draw the left part, then the 1px slice stretched to width i, then the right part shifted by i. If n ≥ 0 the left edge stays fixed; if n < 0 the whole line shifts left by i.
   - **Canvas position:** desktop x = 0.56W + rc × dcx − canvasWidth/2 (lines centred on each other); phones x = 0.5W − canvasWidth/2. y = H/2 − 1.36fs (minus 0.04H on phones) + rc × dcy + dy. Opacity is `r × alpha`.
6. The home UI's opacity is `r³ × alpha`.

### 5.4 Home UI (tabs and Discover)

- **Layout (desktop and landscape).** The tabs are a fixed vertical list on the left: left 46u, vertically centred (top 50%, translateY(−50%)), 22u left padding, 18u gaps, aligned to the left. Discover is fixed on its own: left `56vw − 96u`, top `71vh − 33u`, sitting under the title.
- **Tabs.** Each is a row of a small number ("01" to "05", 11u, 70% opacity, baseline-aligned, 12u gap) followed by the name at 19u, weight 500. Tabs are at 62% opacity; the current tab is at 100%.
- **Tab indicator.** A vertical 2px bar (`rgba(29,27,46,.22)`) at the list's left edge, positioned with `translateY` and `scaleY` (base height 100px, transform-origin top). Inside it, an ink progress line is scaled with `scaleY` from 0 to 1. Tab positions are measured as each tab's top and height relative to the list.
- **Indicator move**, ported exactly from the reference but along y. Let a = the new tab's top, l = its height relative to the bar, and `n_w` = its height in pixels. ("Right" below means down the list, "left" means up.)
  - Moving right: phase 1 keeps x and stretches the width to reach the middle of the new tab (scx = (a − x + 0.5 × n_w) / barWidth), and the progress line goes to 1.
  - Moving left: phase 1 sets x to x + 0.5(a − x) and widens so the right edge stays put, and the progress line goes to 0.
  - Phase 1 is 0.5s `quint.in`. Phase 2 moves to (a, l) over 0.5s `quint.out` with the progress line fading out, then the autoplay timer starts.
- **Autoplay.** The progress line runs from scaleX 0 to 1 over **5s linear**, then the slider moves to the next slide. It pauses while dragging, while the menu is open and away from home.
- **Discover.** A 66u-tall ink pill with 38u horizontal padding, ivory 17u text "Discover", and a 26×12u arrow. The shadow is `0 18u 40u rgba(29,27,46,.18)`. On hover the pill rises 3px and the arrow moves 6px right over 0.5s.

### 5.5 Input

- **Drag** (pointer events on the stage):
  - On pointerdown, ignored during a tween: record the start x and the start smooth value; `drag = true`; add an `is-grabbing` class to the html element; pause the timer.
  - On move, project the pointer movement onto the slide direction V = (0, H × coeffWidth): `panIndex = −(Δx·Vx + Δy·Vy) / |V|²`, so dragging up by one screen height moves one slide forward, and `goto = startSmooth + panIndex`. Velocity is the projected px/ms, smoothed (new = 0.6 × old + 0.4 × instantaneous).
  - On release: `r = goto − velocity × 0.2`, rounded to n. If real(n) is still the start slide and |panIndex| > 0.3, step one slide in the drag direction. Set `goto = n`; the smoothing then settles it.
- **Wheel:** `delta = wheelDeltaX || −deltaX`, else the Y equivalent, times 0.5; then `goto −= delta / (3W)`. 50ms after the last wheel event, round `goto`.
- **Keyboard:** ArrowLeft and ArrowRight step through the slides.
- **Phones held upright** keep the stacked horizontal tab row and Discover under the title (see §11), but the slides still move vertically and dragging is up and down.

### 5.6 Entrance

After the intro film (or straight away with reduced motion):
- `smooth = goto = int − 0.45`, then tween `goto` to `int` over 2s with `power3.out`;
- tween `alpha` from 0 to 1 over 1.1s linear.

---

## 6. Discover → product (the card morph)

The full-screen colour shrinks into the product card while the objects fly into it.

- Show the card div with its colour starting at the current background colour.
- Over **1.5s with `expo.inOut`**, tween `rc` from 0 to 1 and `goto` to the item (shortest path, `trans = true`).
- **Each frame:**
  - card transform: `translate3d(cardX × rc, 0, 0) scale(lerp(W, cardW, rc)/W, lerp(H, cardH, rc)/H)`;
  - card colour: a mix from the start colour to the item's card colour by rc.
- The objects move from their home positions to their card positions (ph × r → 0), the mouse influence fades out, and the title fades out while drifting by dcx/dcy.
- When the morph completes:
  - build the product page DOM with the card and objects at exactly the same pixel positions;
  - hide the stage;
  - fade the text in with a 30px rise, 1s `expo.out`, staggered 0.08s.
- **Back to home** via the logo or Collection, while within the top 30% of the page:
  - set the stage to that item with rc = 1 and show it;
  - fade the page out over 0.35s;
  - tween rc back to 0 over 1.5s with `power4.inOut`.
- **From any other page to home:** fade the stage `alpha` from 0 to 1 over 1.5s.
- **Between other pages:** fade the current page out over 0.6s, then fade the new one in over 0.8s. The editorial cover image and card enter from −40px and +40px with 1.3s `expo.out`.

---

## 7. Product page (scroll container)

**Scrolling.** On desktop, wheel and keyboard drive a smooth virtual scroll: the target is clamped, the position eases by 0.1 per frame, and `#pageIn` uses `translate3d`. Touch devices, pointer: coarse and phones or tablets held upright use native `overflow-y: auto`.

**Reveal.** Elements marked for reveal start at opacity 0 and 50u lower, and animate in once their top passes 88% of the viewport (opacity over 1s and transform over 1.2s, both `cubic-bezier(.16,1,.3,1)`).

**Parallax types:**
- `speed`: translateY(−(centre − viewport centre) × (sp − 1));
- `img`: translateY(−(centre − viewport centre) × 0.08);
- `float`: translateY from a to b (in vh) as the section crosses the viewport, with a rotation from −7° to +7°.

**Sections:**

1. **Hero** (Centre stage layout: auto height, 110u bottom padding, item background colour).
   - The card is centred at the top: left = (W − 0.36W)/2, top 0, 0.36W × 0.64H, in the item's card colour, holding the three objects at their card positions with their shadows. Each object has speed parallax at its own `sp`. This is exactly where the Discover morph ends.
   - Text is centred under the card: a 600u-wide centred block with top padding `64vh + 44u`, text-align centre:
     - "Collection", 13u, weight 500, 70% opacity;
     - the h1 title, 34u, weight 500, −0.01em tracking, 10u above and 24u below;
     - the description, 16u, line-height 1.75.
   - No scroll hint in this layout.
2. **Loop band** (84vh, card colour, inset 6vw from each side).
   - The fallback is the three objects arranged at the card layout, scaled to a 0.62W-wide box (1.05W on mobile), centred, with speed parallax 1.12.
   - Over it is a `<video muted loop playsinline autoplay>` with the item's loop URL and `object-fit: cover`. On its first `playing` event it fades in over 0.8s while the fallback fades out. Omit the video when reduced motion is set.
3. **Info** (item background colour, 120u top padding, 150u bottom, centred).
   - The float object (quadrant `float`, 0.14W wide) sits at left 150u with float parallax from 50vh to −32vh.
   - Then the info title (34u, weight 500) and the five list lines (17u, line-height 1.85), each revealed in turn.
4. **"Any questions?"** (110u top padding, 90u bottom).
   - Title 34u, then "Write to us about commissions, editions or workshops." and, on a new line, "We will be happy to answer." at 17u.
   - Then a "Contact us →" pill, 60u tall, ink, linking to `mailto:hello@foldwild.studio`.
5. **Cards.**
   - A darker band (`rgba(29,27,46,.07)`) covers the bottom 62% of the section.
   - Four 296×420u cards with 38u gaps: one for each other item, in its card colour, showing its three objects arranged inside without shadows.
   - Each card has a 46u ink circle with an arrow, 20u from its bottom-right corner.
   - On hover the card rises 10u and its objects scale to 1.05, over 0.8–1.1s with `cubic-bezier(.16,1,.3,1)`.
   - The bottom padding is 170u.

---

## 8. Editorial page

1. **Cover** (100vh, page colour).
   - The image box spans x 0–864u and from 23vh down, 54vh tall. The scene inside is 12% taller than the box and moves with img parallax.
   - A white card overlaps it at left 770u and 29vh down, 462u wide, with 64u/60u padding: the page name as the small label, the title at 32u, and the description at 16u in grey #77757f.
2. **Blocks** (#FBFAF8 background, 140u top padding).
   - Each block is a flex row with 162u side padding and 150u below it.
   - The text column (420u) holds a 34u heading and a 16u paragraph at line-height 1.8 in #55535f.
   - The image is 620×470u, cover-cropped from its scene with img parallax.
   - The second block is mirrored.
3. **Ask band and cards** on the page colour: the same "Any questions?" section as the product page, then cards.
   - The cards are the two other editorial pages (cover scene, card colour = that page's colour, with a white pill label naming the page) and a "Collection" card showing the Morpho objects.
   - Pill label: `rgba(255,255,255,.92)` background, 7u/15u padding, 16u text.

---

## 9. Menu overlay

- A full-screen ivory layer at z-index 70.
- **Opens** with a clip-path circle growing from the burger's centre to the farthest corner over 1s `expo.inOut`. Then the links and items rise 30px and fade in, staggered 0.05s, over 0.9s `expo.out`, starting at 0.45s; the preview card rises 40px at 0.5s.
- **Closes** with the reverse circle over 0.8s.
- **Contents:**
  - Preview card at left 208u, 26vh down, 338u wide, 48vh tall. It holds five layered previews, one per item in its card colour with its objects; the hovered or current one is shown with a 0.6s opacity crossfade.
  - Links at left 690u, 30vh down, 4.6vh apart: "01. Collection" (#/), "02. About", "03. Studio", "04. Journal". The text is 38u, the numbers 12u; on hover the text slides 10u right.
  - Product list at left 1010u, 23vh down: five rows, each a 62u square thumbnail in the item's card colour holding its first front object at 80% width, then its name at 17u. Rows are at 70% opacity; the hovered or active row is at 100% and weight 500.
- Escape closes the menu, and choosing a link closes it.

---

## 10. Intro film (shown on every visit to home)

- A fixed full-screen layer at z-index 95 with a mint (#BEE5D3) background and the intro video, `object-fit: cover` at `object-position: 35% 50%`.
- A 3px ink progress bar along the top scales with currentTime ÷ duration.
- **Timed words,** shown 27% down from the top (in the sky), centred, ink, weight 500, 150u (64px on phones), −0.02em tracking:
  - "We fold" from 0.4 to 3s;
  - "the wild" from 3.4 to 6.2s;
  - "in paper" from 6.6 to 9.4s.
- Each word enters letter by letter (40px rise, 0.9s `expo.out`, 0.04s stagger) and leaves upward (−30px, 0.4s `power2.in`).
- **Bottom centre,** 46u up: a countdown "00:10" (14u, tabular figures) above a "Skip →" ink pill 56u tall.
- **Ending.** On the video's end, on Skip, or on a load error (or if it hasn't started after 6s), fade the layer out over 0.8s and run the home entrance.
- "Replay film" in the footer plays it again, returning to home first if needed.
- With reduced motion, skip the film entirely.

---

## 11. Phones and tablets

**Phones held upright** (W ≤ 820 and H ≥ W): `--u: 100vw/390`.
- **Chrome.** The logo is 20px at 20px/22px. The burger is 48px at 12px/14px. The fixed footer shows only on home; other pages end with an in-page footer row at 11px.
- **Home.** The tabs (names only, numbers hidden) and Discover stack in a column at 70vh. Tabs are 13px with 12px gaps; Discover is 52px tall at 15px. Slides still move vertically.
- **Product.**
  - The card sits at the top (x 0.11W, width 0.78W); the text block follows below it, 104vw + 26px down, 24px from each side.
  - Sizes: title 28px, description 15px, label 12px.
  - The hero has no minimum height and 64px of bottom padding (use `display: flow-root` so the margin doesn't collapse).
  - No scroll hint. The loop band is 62vw tall.
  - The info section has 170px of top padding, with the float object centred above the heading (width 0.28W, gentle 4vh drift).
  - The cards are a two-column grid, each (50vw − 23px) wide and 1.42× as tall.
- **Editorial.** The cover image is full width and 62vw tall; the white card overlaps it by 40px with 16px side margins. Blocks stack with the image first, 76vw tall.
- **Menu.** No preview card. The links are 34px at 24px/110px. The five thumbnails form a five-column grid near the bottom, with 11px labels under them.

**Tablets held upright** (600–820px wide): one size step up.
- Logo 26px, tabs 17px, Discover 64px tall.
- Product: text 64px from the sides, up to 600px wide; title 40px, description 18px.
- Info, ask and editorial headings 34–36px; body text 18px.
- Menu links 54px.
- Header backdrop 96px.

**Short landscape screens** (landscape and H ≤ 540): the desktop layout with `--u: 100vw/1000`.
- Home UI at 72vh.
- Product text at left 110u, 300u wide, 24vh down.
- Editorial: image 58vw wide, card at left 50vw and 44vw wide, block image 44×30vw.
- Menu: preview at left 9vw and 25vw wide, links at 42vw, items at 70vw, thumbnails 44u.
- The in-page footer replaces the fixed footer away from home.

**Reduced motion:** reveals start visible, and slide changes, the card morph and the menu circle all happen instantly. The intro film and the loop videos are not shown.

---

## 12. Acceptance checklist

- The intro film plays with the three timed phrases, the countdown and Skip, then hands over to the home entrance.
- The home slider shows a numbered tab list on the left with an upright progress line, autoplays every 5s, loops endlessly with slides rising vertically, and can be dragged up and down with the mouse or a finger, scrolled with the wheel, stepped with the arrow keys and chosen from the tabs.
- Objects move at depths 0.9–1.3 during slides, and the background colour crossfades.
- Titles stretch at one inner column while sliding.
- Objects drift slightly with the mouse.
- Discover shrinks the full screen into the right-hand card in 1.5s, with the objects landing exactly where the product page draws them.
- Returning from the top of a product page reverses the morph.
- Each product page scrolls smoothly through its sections, and its loop video fades in over the fallback.
- The menu opens as a circle from the burger, and hovering the thumbnails changes the preview.
- About, Studio and Journal show the cover, three alternating blocks and the cards.
- At 360, 390 and 768px upright and at 812×375 sideways, nothing scrolls sideways and no text overlaps.
- There are no console errors and every media URL above returns 200.