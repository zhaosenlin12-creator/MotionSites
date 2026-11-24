# HERO PROMPT — "Poke Pal" build-your-bowl interactive ordering page (exact recreation)

Build one self-contained `index.html` with inline `<style>` and `<script>`, no framework and no build step. It must recreate the "Poke Pal — Build Your Bowl" page exactly as specified below.

It is a playful top-down poke-bowl builder on a brushed-steel counter:

1. **Intro.** A closed teal Poke Pal box and the headline "Good things come in bowls." The page opens into the builder.
2. **Ingredients.** You grab ingredients from stainless hotel pans with a **coral rubber-glove cursor** and drop them into a bowl inside a teal bento box. Rice goes first; then each topping lands where you drop it.
3. **Sauces.** You pick up squeeze bottles; the glove tips the bottle and draws sauce wherever you drag over the bowl.
4. **Sides.** You drag a side into the box's second compartment.
5. **Finish.** You top it off with a garnish rain, a printed receipt rolls in, and a "Good food. Coming your way." checkout appears over a blurred page.

**Rules:**
- Every number below is load-bearing. Where a value is given, use exactly that value.
- Use invented branding only.
- Do not add anything that is not described here.

**Page basics:**
- `<title>`: `Poke Pal — Build Your Bowl`.
- `lang="en"`, UTF-8.
- Viewport: `width=device-width,initial-scale=1`.

---

## 1. Assets (use these exact URLs)

URL helper (`q=86`):
```
CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'
H(file, w) = 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(CDN + file) + '&w=' + w + '&q=86'
```

**Sheets.** Every sheet is 2048×1360 with a **transparent background**, except `bg` (2688×1520).

| key | contents | URL |
|---|---|---|
| bg | Empty brushed stainless-steel counter. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042539_bee90308-05ef-4b87-a91f-6b86c7e02f94.png&w=2400&q=86 |
| tr | 8 steel hotel pans (4×2). | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042539_ad6880ac-f262-4716-90ed-24c287232feb.png&w=1500&q=86 |
| pl | 8 top-down ingredient portions for the bowl (4×2). | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042538_7987a8aa-885b-4db2-a664-50e7ee9fb13f.png&w=1500&q=86 |
| bw | Branded Poke Pal paper bowl: empty (left) and filled with rice (right). | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042538_efc215bc-128e-481e-a1e2-3d026dd6ab81.png&w=1500&q=86 |
| bt | Squeeze bottles SHOYU, SPICY MAYO and PONZU with coral caps and teal labels. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042538_a703fa03-9bb4-49d9-be23-1bde093c65c4.png&w=1500&q=86 |
| sd | Sides: miso soup cup, gyoza tray, prawn-crackers cup. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042538_c8c2be5c-8263-42df-b8b8-08a5f89d3532.png&w=1500&q=86 |
| bxo | Open teal bento box: empty left compartment, right compartment lined with fish-pattern paper. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042538_bdab28e0-83c2-48fc-8f65-12d376fddcaf.png&w=1500&q=86 |
| bxc | The same box closed, with a "POKE PAL · BUILD YOUR BOWL" lid. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_042539_7e258e75-50d8-422c-8395-8506fa6fa210.png&w=1500&q=86 |

**Sprite boxes** in sheet pixels, `[x0, y0, x1, y1]`:

| Ingredient | Pan box (tr) | Bowl portion box (pl) |
|---|---|---|
| Salmon | `[51,149,511,638]` | `[48,185,490,647]` |
| Tuna | `[542,146,1009,632]` | `[564,187,1006,641]` |
| Avocado | `[1043,150,1535,629]` | `[1075,197,1501,656]` |
| Edamame | `[1536,149,1998,631]` | `[1548,193,1982,646]` |
| Cucumber | `[33,687,508,1203]` | `[45,740,497,1214]` |
| Mango | `[535,689,1009,1201]` | `[557,744,992,1214]` |
| Seaweed salad | `[1044,687,1519,1198]` | `[1057,740,1501,1217]` |
| Sushi rice | `[1539,687,2020,1204]` | `[1569,742,2000,1207]` |

| Item | Box |
|---|---|
| Bottle: Shoyu | `[302,104,691,1222]` |
| Bottle: Spicy mayo | `[826,102,1222,1221]` |
| Bottle: Ponzu | `[1354,107,1746,1218]` |
| Side: Miso soup | `[26,323,619,1033]` |
| Side: Gyoza | `[628,447,1458,1037]` |
| Side: Prawn crackers | `[1457,304,2036,1048]` |
| Bowl, empty | `[168,245,930,1140]` |
| Bowl, with rice | `[1110,247,1866,1143]` |
| Open box | `[259,141,1879,1216]` |
| Closed box | `[247,136,1901,1261]` |

**Sprite rule (important):**
- Each sprite element is **resized to exactly its product's box**, contain-fitted and centred in the space it was given, using width/height plus margin offsets.
- Set `background-size: 2048k × 1360k` and `background-position: −x0·k −y0·k`.
- **Never** crop with `clip-path`. That would cut off the `drop-shadow` filters, which every product uses (`drop-shadow(0 10px 10px rgba(0,0,0,.35))`).

---

## 2. Fonts and tokens

**Fonts:**
- **Lilita One:** logo, headings and receipt title.
- **Fredoka** 400/500/600/700: UI.
- **Caveat Brush:** handwritten stickers.
- **Courier Prime** 400/700: receipt and totals.

**Tokens:**
```
--coral:#f2766a --coral-d:#e05d50 --coral-l:#ffe2dc --teal:#0d6a6e --teal-d:#0a5155 --teal-l:#d5efec --cream:#fff8f0 --ink:#0f3b3e
--u: min(100vw,177.78vh)/100     (1% of a contained 16:9 scene)
```

**Page:**
- `body` has `cursor: none` everywhere (the glove replaces it).
- `#counter`: fixed at `inset: -2%`, `bg` at cover, plus a soft vignette.
- `#scene`: a centred, contained 16:9 box; all positions below are in `u`.

---

## 3. Header and stickers

**Nav band (`#band`):**
- fixed, full width, at the top of the scene, `3.1u` tall, coral;
- a scalloped bottom edge: a `.7u` repeating radial-gradient strip of coral half-circles.
- Teal-dark links: Menu, Build Your Poke Bowl, Bowls, Sides, Drinks, Help. Each gets an underline that scales in on hover.
- Right side: "How it works" with a ringed **?**. It opens a cream popover with 3 numbered steps:
  1. Grab rice, then your toppings.
  2. Pick up a bottle and drizzle.
  3. Drop in a side, top it off, check out.

**Logo** at `(2.2u, 4.6u)`:
- "POKE" teal over "PAL" coral, Lilita at `3.9u`, line-height .82;
- a white text stroke (`.16u`, paint-order stroke) and a small drop shadow.
- Beside it, "Fresh bowls.<br>Better days." in Caveat Brush coral at `1.8u`, rotated −5°.

**Stickers:**
- "Better together.": teal Caveat sticker, top-right, +3°.
- "Make it yours!": coral Caveat brush sticker at bottom-left `(2u, 51.6u)`, −3°.
- "Poke Pal!": coral Caveat sticker at bottom-right, −6°.

---

## 4. Intro (closed box)

- **Closed box** (`bxc`): at `left 32.5u, top 16.4u, 38u × 30u`, with hover lift and −1° tilt.
- **Copy** at `(7u, 17u)`:
  - "Good things come in bowls." in Lilita `3.6u` teal;
  - "A little rice, a lot of fresh. Build your bowl, sauce it up and grab a side." at `1.05u`.
- **Button:** "Open for something fresh ↗", teal, centred at `top 46u`.
- **Clicking the box or the button** adds `body.open`:
  - the closed box lifts, tilts −4° and fades;
  - the copy slides left and fades;
  - every builder element (pans, bottles, box, sides, stickers, bar) springs in from `translateY(30px) scale(.8)`, staggered 50ms each;
  - the toast reads "Grab some sushi rice to start."

---

## 5. Builder layout

**Pans:**
- each `9.2u × 9.4u`, in two columns at x `2.4u` and `12.4u`, rows at y `11.8 / 21.4 / 31 / 40.6u`;
- order: Sushi rice, Salmon, Tuna, Avocado, Edamame, Cucumber, Mango, Seaweed salad.
- Each pan has a teal **tag** below it: a white circle with an emoji icon, the name, and the price.
  - Prices: rice `$8.00`; salmon and tuna `+$3.00`; avocado and mango `+$1.00`; edamame, cucumber and seaweed `+$0.75`.
  - The tag turns coral once that ingredient is used.
- Hover: the pan lifts 5px and scales 1.03.

**Bottles:**
- `5.6u × 16u` at x `31 / 38 / 45u`, `top 4.4u`;
- a cream tag below each ("Shoyu $0.00" and so on) that turns teal when used;
- hover: lift 6px and rotate −3°.

**Open box:**
- `left 29.5u, top 22.4u, 42u × 28u`.
- **Bowl:** sized to 98% of the left compartment's height, centred in it. The compartment interior is `[330,223]–[1249,968]` in box pixels. The bowl crossfades from empty to rice.
- **Rice surface:** an ellipse at `cx .5, cy .375, rx .43, ry .31` of the bowl box.
- **Right compartment** (`[1274,337]–[1757,866]`): holds a cream "Poke Bowl / Fresh ingredients · Big vibes" card in Caveat coral, at −2°.

**Sides:**
- `11u × 12.4u` at `x ≈ 83.5u`, tops `8.2 / 21.8 / 35.4u`;
- teal tags: "Miso soup $2.50", "Gyoza $4.00", "Prawn crackers $3.50".

**Bottom bar:**
- a cream pill centred at `top 51.2u`;
- four steps, each a ringed number: **Choose base**, **Add proteins**, **Pick toppings**, **Select sauce**.
  - A done step fills teal with a ✓.
  - The current step gets a teal-light background.
- Then the live **total** (Courier, counts up over 450ms), a coral **Top it off ↗** (enabled once there is rice and at least one topping), and an underlined **↺ Undo**.

**Toast:** a teal pill above the bar that springs in for 1.6 s.

---

## 6. The glove cursor

`#glove` is a fixed 58×62 SVG that follows the pointer, with three states:
- **open:** an open palm;
- **point:** index finger extended, used over any button, pan, bottle, side, pile, box, input or link;
- **grab:** a closed fist, used while holding something.

Drawing: coral `#f2766a` fill, `#a8392f` 2.2px outline, drop shadow.

---

## 7. Interactions (modelled on the reference video)

**Picking up.**
- Press on a pan, bottle or side to pick it up. Either **press-drag** and release over the target, or **click** once to pick up and click again to drop.
- The held item renders under the glove fingers in `#held` (fixed) with a big shadow:
  - an ingredient portion is shown about 38% of the bowl width, rotated −8°;
  - a side is shown at 80% scale;
  - a **bottle leaves its spot** (the original fades out) and is held rotated −130°.
- The bowl glows coral while you hover it with something held.
- Esc drops the item back.

**Rice first.**
- Dropping rice fills the bowl: the rice image crossfades in and the bowl plays a squash. Toast: "Sushi rice added."
- Any topping dropped before rice flies back to its pan, with the toast "Start with sushi rice!".

**Toppings.**
- A topping lands **where it was dropped**:
  - the drop point is snapped inside the rice ellipse at a radius of at most .62;
  - it is nudged away from existing piles (minimum normalised gap .38);
  - there are at most 8 piles.
- Each pile is 42% of the bowl width and is z-sorted by y.
- It plays `drop`: from `translateY(−40%) scale(1.25)`, to a `1.08/.9` squash, to rest.
- Toast: "Salmon added." (and so on).
- Clicking a pile sends it flying back to its pan, with the toast "Salmon removed.".

**Sauces.**
- Pick up a bottle (rice must be in) and press/drag over the bowl. The bottle tips to −158° and **draws sauce along your path**.
- The sauce goes on a canvas over the toppings, clipped to the rice ellipse:
  - a dark under-stroke;
  - the colour stroke at `4.2%` of the canvas width;
  - a light highlight stroke offset up-left.
  - Colours: shoyu `#3a1c0e`, spicy mayo `#ee8a3a`, ponzu `#e9dcae`.
- On release the bottle flies back to its spot, rotating upright with a spring.
- Toast: "Spicy mayo on top."
- A stroke shorter than 4 points is discarded.

**Sides.**
- Drag a side onto the right compartment. It drops in with a bounce, the menu card spins away, and the shelf original dims to 35%.
- Toast: "Gyoza on the side." A new side replaces the previous one.
- A side dropped anywhere else flies home, with the toast "Drop it in the side spot!".

**Top it off ↗.**
- About 90 pieces fall from above onto the rice and settle: sesame seeds (cream), nori strips (dark green-black) and scallion dots (green).
- Toast: "One very good bowl."
- After 650ms the **receipt** slides in from the left over the pans, rotated −1.2°:
  - cream paper with a scalloped bottom edge (CSS mask);
  - "POKE PAL" (Lilita, teal) and "ONE VERY GOOD BOWL";
  - dashed rules;
  - lines **printed one by one** every 110ms: Sushi rice $8.00, then each topping and price, each sauce "ON US", then the side;
  - TOTAL counts up;
  - Pick up / Delivery +$4 radios, which recount the total;
  - a teal **Checkout ↗** button and "← Back to building", which removes the garnish and receipt.

**Checkout.**
- The page blurs (`backdrop-filter: blur(8px)`) behind a coral-light card tilted −1°, which springs in.
- Card contents:
  - "Good food.<br>Coming your way." in Lilita;
  - fields: Your name, Phone;
  - a select: "Pick up at" (two Poke Pal locations) or "Deliver to" (two addresses), depending on the chosen mode;
  - the total;
  - **Place my order ↗**.
- Placing the order shows a teal circle with an animated tick, "Order #PP-2481", and "Build another bowl", which resets everything.

**Undo** (and Cmd/Ctrl-Z) restores the previous state: piles, sauces, side and the topped / receipt state.

---

## 8. Acceptance checklist

- [ ] It looks like the Poke Pal mockup: a steel counter, steel pans with teal icon tags, coral-capped labelled bottles, a teal bento box with the Poke Pal bowl, coral side cups, the coral scalloped nav, the step bar and the handwritten stickers.
- [ ] The intro box opens into the builder, and the glove cursor changes between open, point and grab.
- [ ] Rice comes first. Toppings land where they're dropped. Bottles are carried, tipped and **draw** sauce over the toppings. Sides drop into the compartment.
- [ ] Shadows are never cropped. Toasts, steps, the counting total and Undo all work.
- [ ] Top it off garnishes the bowl, the receipt prints line by line, and the checkout runs from form to confirmation.