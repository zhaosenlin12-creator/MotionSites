# HERO PROMPT — "MAISON EDIT" build-your-look virtual try-on (exact recreation)

Build one self-contained `index.html` with inline `<style>` and `<script>`, no framework and no build step. It must recreate the "Maison Edit — Build Your Look" virtual try-on page exactly as specified below.

The page is a wide, warm off-white fashion web app with three columns:

1. **Shop panel (left).** Logo above the panel, then search, category tabs, stores, a product grid and a tab bar.
2. **Model (centre).** A large photoreal young Korean woman stands on a white 360° turntable platform directly on the page background. Around her are a round icon rail, a worn-items strip and a 3D/AR toggle.
3. **Look panels (right).** "YOUR LOOK" (her four pieces, the total, style & fit checks and "Shop the Look"), with a "Recommended for you" card below.

**Interaction:**
- Every piece can be swapped live on the model: tops, skirts, shoes and bags mix freely across 81 combinations.
- The model is a canvas compositor. It blends pixel-aligned photo variants through soft region masks and reveals each change with a sweep line.

**Rules:**
- Every number below is load-bearing. Where a value is given, use exactly that value.
- No real brand names.
- Do not add anything that is not described here.

**Page basics:**
- `<title>`: `Maison Edit — Build Your Look`.
- `lang="en"`, UTF-8.
- Viewport: `width=device-width,initial-scale=1`.

---

## 1. Assets (use these exact URLs)

Helper (`q=88`):
```
CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'
H(file, w) = 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(CDN + file) + '&w=' + w + '&q=88'
```

### 1.1 Model photos

Nine model photos, each 1360×2048 with a **transparent background**, loaded at `w=1000`.

They all show the same young Korean woman:
- sleek black chin-length bob;
- front-facing, right arm down;
- left hand holding a small bag by its handle beside her thigh.

They are registered pixel-for-pixel: head top at 2.0% and feet at 98.1% of the image height. Each variant differs from `base` in **one** item only.

| key | changes vs base | file / URL |
|---|---|---|
| base | ivory off-shoulder top · charcoal pleated mini · black knee boots · black buckle shoulder bag | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132636_5eabfff6-e1ee-4368-b3a9-6582c1f1397b.png&w=1000&q=88 |
| t2 | black ribbed turtleneck | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132720_0affdcfe-f56e-4943-a986-c2e87f5c57ff.png&w=1000&q=88 |
| t3 | burgundy cropped knit cardigan | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132720_f30c45fe-a7d7-4392-97f3-de87f324f3b2.png&w=1000&q=88 |
| k2 | light-blue denim mini skirt | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132721_9d39ba54-b830-4e1e-9076-1f45f5be7621.png&w=1000&q=88 |
| k3 | cream bouclé tweed mini skirt | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132720_0986c806-cb61-488a-acf7-daa9d1c32adc.png&w=1000&q=88 |
| s2 | white leather sneakers + white socks | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132720_8c9da93a-bc4f-4496-957c-56cf9ac47131.png&w=1000&q=88 |
| s3 | burgundy knee-high heeled boots | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132719_dd94cd18-2c72-4272-a4d9-829761077f19.png&w=1000&q=88 |
| g2 | cream quilted mini bag | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132721_feb73af1-d27a-4122-848a-727dae3be59f.png&w=1000&q=88 |
| g3 | burgundy top-handle bag | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132729_883f3a83-2c13-418d-a959-79708075153f.png&w=1000&q=88 |

Load each with `crossOrigin="anonymous"` and wait for all of them before the first draw.

### 1.2 Product sheet

The product sheet is a 1744×2336 image: a 3-column × 4-row grid of flat product photos on light warm-grey tiles. It is used for **every** product thumbnail on the page.
- URL: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132845_faa91ba1-ab25-49d9-8de1-44b84b0d65f7.png&w=1000&q=88
- Tile size: 523×537.
- Tile x origins (columns c = 0, 1, 2): `44, 610, 1177`.
- Tile y origins (rows r = 0–3): `42, 611, 1180, 1749`.

| Row | Content | Columns 0 / 1 / 2 |
|---|---|---|
| 0 | tops | off-shoulder / turtleneck / cardigan |
| 1 | skirts | pleated / denim / bouclé |
| 2 | shoes | black boots / white sneakers / burgundy boots |
| 3 | bags | black buckle / cream quilted / burgundy top-handle |

### 1.3 AR room

The AR room is a bright fitting room with an oak floor, an arched mirror and a clothing rail, used as the AR background.
- URL: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261113_132845_2fe30a71-4937-4877-b8df-92bba80bbabe.png&w=1800&q=88

### 1.4 Masks

There are eight soft region masks, one per variant: 340×512 RGBA PNG, white with the **alpha** channel equal to the region weight. They are embedded as data URIs; the exact strings are in the appendix at the end of this document. They were derived from the variants:
- **Tops:** the difference from base within rows 8–52%, cleaned up and hole-filled.
- **Skirts:** a row-filled span of the difference within the skirt band (31–69% x, 33.5–55.5% y), minus the bag.
- **Shoes:** the leg zone (x 16–70%, y ≥ 54.8%), minus the base bag.
- **Bags:** the new bag shape plus the old bag shape (the old bag found as pixels that differ in both bag variants), dilated.

Feather: 4–10px blur.

---

## 2. Fonts and tokens

**Fonts:**
- **Bodoni Moda** 500/600: the logo and serif store wordmarks.
- **Inter** 400/500/600: everything else.
- Base text size: `clamp(11px, .86vw, 13px)`.

**Tokens:**
```
--page:#efede9  --panel:#f7f6f3  --tile:#ebe9e5
--ink:#151515   --ink-2:#5e5c58  --mute:#9b9892  --line:#e4e1dc
```

**Panels:**
- background `--panel`, radius 14;
- shadow `0 1px 1px rgba(0,0,0,.02), 0 10px 30px -18px rgba(40,30,20,.18)`.

**Thumbnails:** every product thumbnail is the product sheet cropped with **pure CSS** (class `.pt`):
- `background-size: 333.46% Y%`, where Y = 2336 / (visible source height) × 100;
- `background-position: (TX/(1744 − 523)·100)% ((TY + (537 − ch)/2)/(2336 − ch)·100)%`, where `ch` is the visible source height.

| Element | ch | Aspect | Y |
|---|---|---|---|
| Grid cards | 400 | 523/400 | 584% |
| Look rows and recommendations | 450 | 523/450 | 519% |
| Strip | 537 | 523/537 | 435.01% |

---

## 3. Layout (proportions from a 1344×752 design)

- **Page:** `body` uses `--page` with `overflow: hidden`.
- **`#app`:** `height: 100vh; display: grid; grid-template-columns: minmax(0,357fr) minmax(0,500fr) minmax(0,292fr); padding: 0 7.3vw`.
- **Left column:** padding `2.6vh 0 3.4vh`.
  - The top row is 6vh tall: the logo **"MAISON EDIT"** in Bodoni Moda 500, `clamp(20px, 2.15vw, 32px)`, .035em tracking. A 22px hamburger icon sits on the right.
  - Then a 1.6vh gap.
  - Then the shop panel, which fills the remaining height.
- **Centre column:** the stage (§5).
- **Right column:** padding `8.6vh 0 3.4vh`, a column with 1.4vh gap holding the look panel (flex: 1) and the recommended card.

**Responsive:**
- At ≤ 1100px: side padding becomes 3vw.
- At ≤ 860px:
  - the page scrolls in a single column with 16px padding;
  - order is stage (`min(92svh, 820px)` tall), then the look panels, then the shop (88svh);
  - the rail, strip and toggle pin to the stage edges.

---

## 4. Shop panel (left)

**Search pill:**
- margin `2vh 1.1vw 0`, height `clamp(34px, 4.6vh, 44px)`, radius 22, white, soft shadow;
- a magnifier icon, then placeholder text "Search for products, brands or styles...".
- Typing filters the grid live by product name, store and category.

**Category tabs:**
- All / Tops / Bottoms / Shoes / Bags / Accessories;
- gap `clamp(12px, 1.75vw, 26px)`, with a bottom border;
- the active tab is ink colour, weight 500, with a 2px ink underline bar that slides (left/width over `.4s cubic-bezier(.6,0,.2,1)`);
- tabs filter the grid.

**Scroll area** (hidden scrollbar):

1. **"Shop by Store"** heading with a "See all" link. "See all" clears the store filter.
2. **Four store tiles:**
   - 4 equal columns, height `clamp(40px, 7.6vh, 58px)`, radius 8, `--tile` fill;
   - hover lifts 2px; the active tile gets a 1.5px ink border on white;
   - clicking toggles a store filter.
   - Wordmarks: **NORRA** (Inter 600, letter-spaced .2em), ***Lune&Co*** (Bodoni Moda italic), **MERIDIAN** (Bodoni Moda caps), **ODE STUDIO** (Inter 600 on two lines).
3. **"Popular in your style"** heading with a live item count on the right. The heading changes to "Saved pieces" or "<Store> picks" when those filters are active.
4. **Product grid:** 2 columns, gap `2vh 1.1vw`. Each card has:
   - a thumbnail at aspect 523/400, radius 8, with a 1.5px border on hover (#d3cfc8) and in ink when the piece is worn;
   - a heart button at the top-right (it fills ink when saved, with a spring);
   - a "WEARING" ink tag that springs up at the bottom-left when the piece is worn;
   - a white "Try on" chip that fades in at the bottom-right on hover;
   - store caps (600), the product name (`--ink-2`) and the price (500).
   - Clicking a card wears that piece. Filtered cards re-enter with a staggered fade-up (35ms apart, 380ms each).

**Bottom tab bar:**
- Home / Explore (active) / Outfits / Saved / Profile, with line icons;
- Home resets every filter; Saved filters to hearted pieces; Outfits runs the AI stylist.

**Products** (key = category + index, where index 1 is what the base photo wears):

| key | store | name | price | sheet (c, r) | tags |
|---|---|---|---|---|---|
| t1 | norra | Off-shoulder top | 29.90 | 0, 0 | minimal soft |
| t2 | meridian | Ribbed turtleneck | 34.90 | 1, 0 | minimal sharp |
| t3 | lune | Cropped knit cardigan | 45.00 | 2, 0 | romantic wine |
| k1 | meridian | Pleated mini skirt | 49.99 | 0, 1 | minimal sharp |
| k2 | norra | Denim mini skirt | 39.90 | 1, 1 | casual |
| k3 | ode | Bouclé tweed skirt | 59.00 | 2, 1 | romantic soft |
| s1 | norra | Leather knee boots | 129.00 | 0, 2 | minimal sharp |
| s2 | ode | Leather sneakers | 89.00 | 1, 2 | casual |
| s3 | lune | Wine knee boots | 139.00 | 2, 2 | romantic wine |
| g1 | ode | Buckle shoulder bag | 189.00 | 0, 3 | minimal sharp |
| g2 | lune | Quilted mini bag | 159.00 | 1, 3 | romantic soft |
| g3 | meridian | Wine top-handle bag | 175.00 | 2, 3 | romantic wine |

Denim mini skirt (k2) starts saved.

---

## 5. Stage (centre): the model straight on the page

- **`#figure`:**
  - absolute, `left: 45%; top: 3.6vh; height: 85.5vh; aspect-ratio: 1360/2048; transform: translateX(-50%)`.
  - It contains two stacked canvases, `#cOld` and `#cNew`, each 1000 × 1506 px and filling the figure, inside `#spin`, inside `#body`.
- **`#body`:** perspective 1600, `cursor: grab`, `touch-action: pan-y`.
- **`#spin`:** `transform: rotateY(var(--ry))` with the origin at the bottom centre.
- **Turntable `#tt`:**
  - width 112% of the figure, height `85.5vh·(1360/2048)·1.12/3.3`;
  - top edge at `98.6% − 0.40·height`, so the platform's top ellipse is centred under the feet.
  - Top face: an ellipse at `inset: 0 0 16% 0`, `radial-gradient(ellipse at 50% 38%, #fdfcfb, #f3f1ee 60%, #e7e4df)`.
  - Side: an ellipse at `inset: 16% 0 0 0`, `linear-gradient(#e2dfda, #d3cfc8)`, placed behind the top face.
  - A dashed SVG ellipse ring sits on the top face: `stroke rgba(0,0,0,.13)`, dash `3 5`, pathLength 300. Its `stroke-dashoffset` animates continuously and speeds up with drag velocity.
  - The label "⟲ 360° ⟳" uses two long curved arrows that nudge outwards on hover.
- **Shadow:** an ellipse at `top: 96.6%`, 46% wide, `radial-gradient(rgba(0,0,0,.26), transparent)`, blurred 2px. It shifts with the rotation.

**Rail** at `left: 8.4%; top: 8.6vh`, a column with gap `clamp(6px, 1.2vh, 10px)`:
- **Buttons:** round, `clamp(30px, 5.2vh, 40px)`, #fbfaf8 with a soft shadow; hover scale 1.08; active is an ink fill with white icons.
- **Tooltips:** an ink pill to the right. Category buttons show "Tops · <current piece>".
- **Buttons, in order:**
  1. ← undo (disabled at 40% opacity when there is no history);
  2. body / size: toasts "Size M · 165 cm · fit profile saved";
  3. top;
  4. skirt;
  5. shoe;
  6. bag;
  7. ✦ "AI stylist · surprise me".
- A category button cycles that category to its next piece, and also sets the shop filter to that category.

**Worn strip** at `left: 75.4%; top: 10.8vh`:
- a #fbfaf8 radius-10 card holding four vertical thumbnails, `clamp(36px, 4vw, 56px)` wide;
- hovering a thumbnail outlines it in ink and highlights the matching look row;
- clicking cycles that piece;
- the thumbnail that just changed pops in from scale .6.

**3D / AR pill** at `left: 72%; top: 4vh`:
- an ink indicator slides between "3D" and "AR".
- **AR on:**
  - the room photo fades and scales in behind the model (`left / right 4%`, `top 2.6vh`, `bottom 3.4vh`, radius 16);
  - white corner brackets appear;
  - a white scan line sweeps down once;
  - a bottom label with a red pulsing dot reads "AR preview · your room".

**Drag to rotate:**
- pointer drag sets `ry = clamp(start + dx·.22, −34°, 34°)`;
- on release `ry` springs back to 0 by ×0.92 per frame.

---

## 6. Outfit compositor (the core)

**State:** `look = {t, k, s, g}`, starting as `{t1, k1, s1, g1}`, which is the base photo.

**`draw(ctx, look)`:**
1. Draw base at full size.
2. For each category in the order **shoes → skirt → top → bag**, if its key is not `*1`:
   - on an offscreen canvas, draw the variant's mask, then `source-in` the variant image (this gives the masked variant);
   - on the main canvas, use `destination-out` with the mask, which punches the region out;
   - then use `lighter` with the masked variant.

This is an exact soft replacement (premultiplied lerp), so any combination composes cleanly.

**Swap animation (`render(category)`):**
- Draw the new state into `#cNew`.
- Animate a sweep from the category's region top to its region bottom, over 720ms with ease-in-out (quadratic). Region y-ranges as fractions of the figure height: top `.07–.53`, skirt `.32–.57`, shoes `.53–1`, bag `.45–.75`.
- Each frame:
  - `#cNew` has `clip-path: inset(0 0 (100 − y)% 0)`, so it shows above the line;
  - `#cOld` has `clip-path: inset(y% 0 0 0)`, so it shows below the line.
  - This means the old outfit never shows through the transparent areas of the new one.
- A 2px white glint line with a glow rides on `y`.
- At the end, copy the state to `#cOld` and reset both clips.
- If a new change starts mid-sweep, first redraw `#cOld` with the previous state.

**`wear(key)`:**
- push the history;
- update `look`;
- render;
- sync the whole UI (§7);
- fly the clicked thumbnail to the strip slot;
- toast "Trying on · <name>".

`cycle(cat)` steps 1 → 2 → 3 → 1.

**Undo** restores the previous state and animates the changed region.

**AI stylist** steps through five curated looks, swapping their pieces one after another 520ms apart, with the toast "AI stylist · <name>":

| Look | Pieces |
|---|---|
| Monochrome minimal | t2 k1 s1 g1 |
| Wine romance | t3 k3 s3 g3 |
| Weekend denim | t1 k2 s2 g2 |
| Soft contrast | t2 k3 s3 g2 |
| Campus cool | t3 k2 s2 g3 |

---

## 7. Right column

### 7.1 Look panel

- **Header:** "YOUR LOOK" (letter-spaced .2em), with the live **total** on the right. The total counts to its new value over 600ms (ease-out cubic).
- **Four rows** (top, skirt, shoes, bag):
  - each row has a thumbnail at aspect 523/450, `height: min(9vh, 100%)`, radius 8;
  - store caps, name and price;
  - a single **›** chevron that moves 2px on hover.
  - Clicking a row cycles that piece and sets the shop filter to its category.
  - A changed row's thumbnail plays `swapIn` (scale .6 with −8° rotation, to normal, .55s spring).
  - Hovering a row outlines its strip thumbnail.
- **"STYLE & FIT":** three rows, each with a check circle that fills ink with an animated tick (staggered 140ms), the label, an ⓘ, and a right-aligned percentage that counts up. Hovering a row shows an ink bubble with its note.

| Row | Score | Bubble note |
|---|---|---|
| Fits your size | always 100 | "Size M fits your saved measurements" |
| Matches your style | 56 + 9 × (most common tag count across the worn pieces), max 99 | "Based on 4 pieces and your saved styles" |
| Complements your body shape | 78 + (k1 → 14, k3 → 10, otherwise 6) + (no sneakers → 4) | "Mini length + knee height balance your frame" |

  A row's check fills when its score is ≥ 80.

- **"Shop the Look":**
  - #2b2b2b fill, radius 9, height `clamp(36px, 5.2vh, 44px)`, with an external-link icon;
  - on click: a light sweep across it, the four look thumbnails fly into it, a white count badge appears, the label briefly reads "Added · view bag", and the toast reads "4 pieces added · $total".

### 7.2 Recommended for you

- A ✦ icon and the title.
- **Three cards:** pieces not currently worn, preferring the mood of the current top (first tag). Each card has a thumbnail at aspect 523/450, store, name and price.
- Clicking a card wears that piece.

**Toast:** a fixed ink pill at the top centre, 12px white text, spring-in, hidden after 1.8 s.

---

## 8. Acceptance checklist

- [ ] It looks like the reference composition, as a wide web page:
  - the logo sits above the left panel;
  - the model stands huge on a small white platform directly on the warm page background;
  - the rail and strip float beside her;
  - the right column holds the look and recommended panels.
- [ ] Every way of choosing a piece swaps it on the model with a sweep: grid card, recommendation, look row, strip thumbnail, rail button, stylist and undo.
- [ ] Any mix of the 12 pieces composites with no seams or leftovers, and the old piece is never visible behind the new one.
- [ ] The total, fit scores, "Wearing" tags, strip, look rows and recommendations all update together.
- [ ] Filters, search, store tiles, hearts and Saved, AR mode, drag-to-rotate and Shop the Look all work.
- [ ] It is responsive down to a phone, with a single stacked column.

---

## Appendix — mask data URIs (use verbatim)

- `t2`: `data:image/png;base64,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qAACFQCBCiBQAQQqAAIVQKACCFQAgQqAQAUQqAACFQCBCiBQAQQqgEAFQKACCFQAgQogUAEQqAACFUCgAiBQAQQqgEAFEKgACFQAgQogUAEEKgACFUCgAghUAAQqgEAFEKgAAhUAgQogUAEEKoBABUCgAghUAIEKgEAFEKgAAhVAoAIgUAEEKoBABUCgAghUAIEKIFABEKgAAhVAoAIIVAAEKoBABRCoAAhUAIEKIFABBCoAAhVAoAIIVACBCoBABRCoAAIVAIEKIFABBCqAQAVAoAIIVACBCiBQARCoAAIVQKACIFABBCqAQAUQqAAIVACBCiBQARCoAAIVQKACCFQABCqAQAUQqAACFQCBCiBQAQQqAAIVQKACCFQAgQqAQAUQqAACFUCgAiBQAQQqgEAFQKACCFQAgQogUAEQqAACFUCgAghULwGAQAUQqAACFQCBCiBQAQQqgEAFQKACCFQAgQqAQAUQqAACFUCgAiBQAQQqgEAFEKgACFQAgQogUAEQqAACFUCgAghUAAQqgEAFEKgAAhUAgQogUAEEKgACFUCgAghUAIEKwOP5/0Py7pYNBM2IAAAAAElFTkSuQmCC`
- `t3`: `data:image/png;base64,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`
- `k2`: `data:image/png;base64,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BBVAUAEEFUBQARBUAEEFEFQABBVAUAEEFUBQARBUAEEFEFQAQQVAUAEEFUBQARBUAEEFEFQAQQVAUAEEFUBQAQQVAEEFEFQAQQVAUAEEFUBQAQQVAEEFEFQAQQUQVAAEFUBQAQQVAEEFEFQAQQUQVAAEFUBQAQQVAEEFEFQAQQUQVAAEFUBQAQQVQFABEFQAQQUQVAAEFUBQAQQVQFABEFQAQQUQVABBBUBQAQQVQFABEFQAQQUQVABBBUBQAQQVQFABBBUAQQUQVABBBUBQAQQVQFABBBUAQQUQVABBBUBQAQQVQFABBBUAQQUQVABBBRBUAAQVQFABBBUAQQUQVABBBRBUAAQVQFABBBVAUAEQVABBBRBUAAQVQFABBBVAUAEQVABBBRBUAAQVQFABBBVAUAEQVABBBRBUAEEFQFABBBVAUAEQVABBBRBUAEEFQFABBBVAUAEEFQBBBRBUAEEFQFABBBVAUAEEFQBBBRBUAEEFEFQABBVAUAEEFQBBBRBUAEEFEFQABBVAUAEEFQBBBRBUAEEFEFQABBVAUAEEFUBQARBUAEEFEFQABBVAUAEEFUBQARBUAEEFEFQAQQVAUAEEFUBQARBUAEEFEFQAQQVAUAEEFUBQAQQVAEEFEFQAQQVAUAEEFUBQAQQVAEEFEFQAQQVAUAEEFUBQAQQVAEEFEFQAQQUQVAAEFUBQAQQVAEEFEFQAQQUQVAAEFUBQAQQVQFABEFQAQQUQVAAEFUBQAQQVQFABEFQAQQUQVABB9RIACCqAoAIIKgCCCiCoAAPxv9MSI+fcjTz8AAAAAElFTkSuQmCC`
- `k3`: `data:image/png;base64,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QaXV7j99PE8HH5q1nNsx/rixt/ivGq9B+cDpvqDSyvedfta4f//t6r8F9dyO8/vV31XfadwR98C2KUHleA6078yYbvtKOq+3pH5S/Uf148bNG2Kat55yPFeDtxsXKmzcP79BPTiyrGPtVFA5oZe64Yn9OOXHgQZ5pxQAggogqACCCiCoAAgqgKACCCoAggogqACCCiCoAAgqgKACCCqAoAIgqACCCiCoAAgqgKACCCqAoAIgqACCCiCoAAgqgKACCCqAoAIgqACCCiCoAIIKgKACCCqAoAIgqACCCiCoAIIKgKACCCqAoAIIKgCCCiCoAIIKgKACCCqAoAIIKgCCCiCoAIIKIKgACCqAoAIIKgCCCiCoAIIKIKgACCqAoAIIKgCCCiCoAIIKIKgACCqAoAIIKoCgAiCoAIIKIKgACCqAoAIIKoCgAiCoAIIKIKgAggqAoAIIKoCgAiCoAIIKIKgAggqAoAIIKoCgAiCoAIIKIKgAggqAoAIIKoCgAggqAIIKIKgAggqAoAIIKoCgAggqAIIKIKgAggogqAAIKoCgAggqAIIKIKgAggogqAAIKoCgAggqgKACIKgAggogqAAIKoCgAggqgKACIKgAggogqAAIKoCgAggqgKACIKgAggogqACCCoCgAggqgKACIKgAggogqACCCoCgAggqgKACCCoAggogqACCCoCgAggqgKACCCoAggogqACCCiCoAAgqgKACCCoAggogqACCCiCoAAgqgKACCCoAggogqACCCiCoAAgqgKACCCqAoAIgqACCCiCoAAgqgKACCCqAoAIgqACCCiCoAIIKgKACCCqAoAIgqACCCiCoAIIKgKACCCqAoAIIqq8AQFABBBVAUAEQVABBBRBUAEEFQFABBBVAUAEQVABBBRBUAEEFQFABBBVAUAEEFQBBBfjS/S8nkpiDqus5eAAAAABJRU5ErkJggg==`
- `s2`: `data:image/png;base64,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`
- `s3`: `data:image/png;base64,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`
- `g2`: `data:image/png;base64,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`
- `g3`: `data:image/png;base64,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`