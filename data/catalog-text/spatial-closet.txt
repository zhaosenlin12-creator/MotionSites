# HERO PROMPT — "Atelia" spatial / AR closet shopping interface (exact recreation)

Build one self-contained `index.html` with inline `<style>` and `<script>`, no framework and no build step. It must recreate the "Atelia — Spatial Closet" hero exactly as specified below.

The hero is a full-screen AR-concept shopping interface floating inside a photoreal dark-walnut walk-in closet:

1. **Featured window (left).** A thick warm-taupe glass frame holding an editorial photo, a small-caps kicker and a light serif headline. Three glass pill tabs hang along its top edge: **TRENDING**, **COLLECTIONS** and **EXPLORE**.
2. **Tile wall (right).** Eight taupe glass category tiles on a 2×4 wall turned toward the viewer: the right column is nearer and larger.
3. **Pop-out card.** One frontal card ("Clothing · 345 items ↗") pops out over the window's right edge.

**Interaction:**
- Clicking a tile glides its card out of the wall into the pop-out position and switches the window to that category.
- The tabs switch the editorial.
- The cursor tilts the scene slightly.

**Rules:**
- Every number below is load-bearing. Where a value is given, use exactly that value.
- **Performance rule:** do not use `backdrop-filter` anywhere, and do not run any per-frame layout work. Glass is tinted gradients only.
- Do not add anything that is not described here.

**Page basics:**
- `<title>`: `Atelia — Spatial Closet`.
- `lang="en"`, UTF-8.
- Viewport: `width=device-width,initial-scale=1`.

---

## 1. Assets (use these exact URLs)

URL helper (`q=86`):
```
CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'
H(file, w) = 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(CDN + file) + '&w=' + w + '&q=86'
```

| key | what | URL |
|---|---|---|
| bg | Photoreal walk-in closet, 2688×1520, no interface in it: dark walnut walls, glass-front shelves with warm LED strips, hanging garments, herringbone floor, and a curved walnut vanity on the right with dried pampas flowers and a perfume bottle. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_023843_9fce0893-294b-4ede-8abb-5962c0f6f88a.png&w=2400&q=86 |
| e1 | Editorial (Collections tab), 4:3: young Korean woman, slicked-back hair, slate blue blazer, looking down, blue-grey light. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_023840_7405e42a-f5b5-4fc5-875d-3465a2919c7f.png&w=1400&q=86 |
| e2 | Editorial (Trending tab): Korean woman in a camel coat by a sunlit stone wall. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_023840_1717a76f-b56b-4b5e-8fc9-b37f35f4bc5d.png&w=1400&q=86 |
| e3 | Editorial (Explore tab): Korean woman in a black satin slip and a sheer coat by a window, with city lights at dusk. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_023840_614d8b2e-873e-490c-970a-0292c1076ace.png&w=1400&q=86 |
| ps | Product sheet, 2048×1360, **transparent background**: 8 isolated products in a 4×2 grid. | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_023841_93d89f89-7be4-4b0c-8b6c-6fbb7cf46112.png&w=1400&q=86 |

**Product bounding boxes** in the 2048×1360 sheet, `[x0, y0, x1, y1]`:

| Product | Box |
|---|---|
| gold and crystal brooch | `[36,132,469,580]` |
| black lace-up ankle boot | `[546,152,993,567]` |
| dark green satin blouse | `[1045,89,1519,622]` |
| grey geometric prism tote | `[1623,67,1983,624]` |
| red structured handbag | `[43,753,479,1239]` |
| beige top-handle bag | `[550,753,986,1239]` |
| camel wool coat | `[1066,681,1498,1297]` |
| silver block-heel sandal | `[1576,818,2008,1207]` |

**Sprites:** every product image is a sprite of this sheet, sized to fit (contain) its element:
- `k = min(elW/boxW, elH/boxH)`;
- `background-size: 2048k × 1360k`;
- position so the box is centred;
- **`clip-path: inset(...)` to the box**, so neighbouring products never show.

Measure with `offsetWidth/offsetHeight`, not bounding rects (3D transforms distort those), and re-run on resize.

---

## 2. Fonts and tokens

**Fonts:**
- **Fraunces** (opsz 9–144, weight 300): the window headline.
- **Montserrat** 500/600: the tab pills.
- **Inter** 300/400/500: everything else.

**Tokens:**
```
--tile:    rgba(112,101,94,.66)   taupe glass
--tile-hi: rgba(150,139,131,.84)  hovered / popped
--frame:   rgba(133,122,114,.80)  window frame
--edge:    rgba(255,255,255,.22)  1px glass border
```

**Glass surface:**
- background `linear-gradient(160deg, rgba(255,255,255,.07), rgba(255,255,255,0) 40%), var(--tile)`;
- 1px `--edge` border;
- shadow `inset 0 1px 0 rgba(255,255,255,.28), 0 24px 50px -26px rgba(0,0,0,.65)`.

---

## 3. Page, room and corner labels

- **`body`:** `#1a120c`, `overflow: hidden`, white text.
- **`#room`:** fixed at `inset: -2%`, background `bg` at `cover`.
- **`#shade`:** a radial vignette, `radial-gradient(120% 95% at 50% 45%, transparent 55%, rgba(10,6,3,.42) 100%)`.
- **Corner labels:** Inter 300.
  - "Atelia" at `left: 3.1vw; top: 4.4vh`, size `clamp(16px, 1.5vw, 27px)`;
  - "AR Concept" bottom-left and "2026" bottom-right at `4.4vh` / `3.1vw`, size `clamp(14px, 1.25vw, 22px)`.

**Scene:**
- **`#scene`:** a centred, contained 16:9 box, `width: min(100vw, 177.78vh)`, `height: min(56.25vw, 100vh)`.
  - The unit `--u` is 1% of the scene width.
  - `perspective: calc(var(--u) * 140)`.
- **`#plane`** (fills the scene):
  - `transform-style: preserve-3d; transform: rotateY(var(--py)) rotateX(var(--px))`;
  - it holds the window and the wall.

---

## 4. Featured window

**`#win`:**
- `left: 19.4%; top: 20.5%; width: 32.4%; height: 58%`;
- `transform: rotateY(-7deg) rotateZ(-.8deg)`, origin at the left middle.

**Frame:**
- `inset: 0`, radius `1.45u`, 1px `rgba(255,255,255,.34)` border;
- background `linear-gradient(165deg, rgba(255,255,255,.16), transparent 35%), var(--frame)`;
- inset top highlight plus a large soft drop shadow.

**Photo area:**
- inset `2.6%` left/right and `3.4%` top/bottom, radius `.55u`, `overflow: hidden`.
- Layers inside, which crossfade by opacity over .7 s:
  - three editorial layers (e2, e1, e3 for tabs 0, 1, 2) at `center / cover`;
  - a **category layer**: `radial-gradient(70% 80% at 35% 50%, #8a7d70, #5c5047 60%, #3f352e)` with a large product sprite (`left 5%, top 14%, width 40%, height 68%`, drop shadow `0 20px 26px rgba(0,0,0,.45)`) that rises 6% as the layer appears.
- **Overlay:** `linear-gradient(90deg, rgba(18,12,8,.55), rgba(18,12,8,.1) 55%, transparent)` plus `linear-gradient(0deg, rgba(18,12,8,.35), transparent 45%)`.

**Caption:**
- position `left 4.5%; bottom 8.5%`;
- small caps kicker at `.5u` with .12em tracking, 80% white;
- headline in Fraunces 300 at `2.15u`, line-height 1.08, −.015em.

| Tab | Kicker | Headline |
|---|---|---|
| Collections (default) | "Featured collections" | "Change of season,<br>change of clothes" |
| Trending | "Trending now" | "Warm coats,<br>cold mornings" |
| Explore | "Explore the night" | "After dark,<br>dressed in silk" |

**Caption change:**
- fade it out and drop it 10px (.35 s);
- swap the text after 300ms;
- fade it back in.

**Category caption** (`.side`):
- placed at `left: 49%; top: 50%`, vertically centred, 30% wide;
- kicker "Category · N items", the category name as the headline;
- a row of two pills: white "Shop now" and outline "← Back", which returns to the current tab. Both use `white-space: nowrap`.

**Tabs (`#tabs`):**
- a flex row anchored above the frame (`left: 3%; bottom: 100%; margin-bottom: 1.15u; gap: .9u; align-items: flex-end`);
- the whole row has `rotateZ(-4deg)`, so the pills climb to the right like the reference.
- Inactive pill:
  - glass, height `2.05u`, padding `0 1.25u`, Montserrat 500 at `.55u`, .18em tracking, uppercase;
  - 80% white, with a `.35u` bottom margin;
  - hover uses `--tile-hi`.
- Active pill:
  - height `3.1u`, padding `0 1.7u`, Montserrat 600 at `1.05u`, .12em tracking, `--tile-hi`;
  - a **stem** (`1.6u` wide, `1.25u` tall, frame colour with side edges) scales down from its bottom centre to touch the frame.
- Transitions: `.5s cubic-bezier(.3,1.25,.5,1)`.
- Click switches the editorial. ArrowLeft/ArrowRight cycle tabs; Esc returns to the tab view.

---

## 5. Tile wall

**`#wall`:**
- `left: 52.2%; top: 2.5%; width: 28.6%; height: 88%`;
- `transform: rotateY(-24deg)`, origin at the left middle, so the right side is nearer.

**Slots** (% of the wall: x, y, w, h):

| Column | Tile | Slot | Product |
|---|---|---|---|
| left, smaller | Jewelry | `0, 9, 46, 19` | brooch |
| left, smaller | Outerwear | `0, 30, 46, 19` | coat |
| left, smaller | **Clothing** | `0, 51, 46, 19` | blouse |
| left, smaller | Editorial | `0, 72, 46, 19` | red bag |
| right, larger | Shoes | `52, 2, 48, 22` | boot |
| right, larger | Accessories | `52, 26, 48, 22` | prism tote |
| right, larger | Bags | `52, 52, 48, 22` | beige bag |
| right, larger | Sale | `52, 76, 48, 22` | silver sandal |

**Item counts:** Jewelry 128, Outerwear 87, Clothing 345, Editorial 24, Shoes 212, Accessories 96, Bags 158, Sale 63.

**Tile:**
- glass, radius `1.05u`;
- product sprite area `left / right 14%`, `top 10%`, `bottom 30%`, with drop shadow `0 6px 8px rgba(0,0,0,.35)`;
- label centred at `bottom 11%`, Inter 400 at `.78u`.
- **Hover:** `translateZ(2.4u)` and `--tile-hi` (`.45s cubic-bezier(.25,1.3,.45,1)`).
- The tile currently shown in the pop-out card is hidden (opacity 0), so its slot reads as pulled out.

---

## 6. Pop-out card (frontal, always in front)

`#pop` is **outside the 3D plane**, so the turned wall can never cover it.

**Geometry and styling:**
- `position: absolute; z-index: 30; left: 45.3%; top: 41%; width: 18.2%; height: 28.5%`, radius `1.25u`;
- background `linear-gradient(160deg, rgba(255,255,255,.18), transparent 40%), var(--tile-hi)`;
- 1px `rgba(255,255,255,.38)` border, inset highlight, big shadow;
- it overlaps the window's right edge like the reference.

**Contents:**
- product sprite at `left / right 18%`, `top 8%`, `bottom 34%`;
- name in Inter 500 at `1.25u` (bottom 17%);
- "N items" in 80% white at `.72u` (bottom 8%);
- a thin ↗ arrow at the top-right that nudges on hover.

**Default:** Clothing.

**Clicking another tile:**
1. Hide that tile.
2. Fill the card with it.
3. **FLIP-animate** the card from the tile's on-screen rect to its own place, starting at that offset and scale with opacity .6, over 650ms with `cubic-bezier(.2,.85,.25,1.05)`.
4. Open the category view in the window.

Clicking the card itself also opens its category.

---

## 7. Cursor parallax (one eased transform)

- Targets come from the pointer position (−.5 to .5).
- Each animation frame, ease toward them by ×0.06, and **only write styles while still moving**:
  - `--py = x·5°` and `--px = −y·3°` on `#plane`;
  - `#room` translates `(−x·18px, −y·10px)`;
  - `#pop` translates `(x·14px, y·8px)`.

---

## 8. Responsive

At aspect ratio ≤ 1:1 (portrait):
- the scene fills the viewport with `--u = 100vw/52`;
- the window sits at the top (`5%, 14%`, `90% × 34%`) with no rotation;
- the wall sits at the bottom (`6%, 56%`, `88% × 40%`) with no rotation;
- the pop-out card sits at `56%, 30%` (`38% × 24%`).

---

## 9. Acceptance checklist

- [ ] The composition matches the reference: a walnut closet, a frontal taupe-framed editorial window with the climbing tab pills, a turned 2×4 taupe tile wall with the larger right column, and "Clothing · 345 items ↗" popped out over the window edge.
- [ ] It is smooth: no backdrop blur, no per-frame layout work, and only one eased parallax transform.
- [ ] Product sprites are clipped to their own product, with no neighbours bleeding in.
- [ ] Clicking a tile flies its card to the pop-out spot and switches the window to the category view. The tabs switch the editorials with a crossfade and caption change. Back, Esc and the arrow keys work.