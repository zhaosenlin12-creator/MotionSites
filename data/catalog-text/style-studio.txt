# HERO PROMPT — "VELL" character creator / virtual styling studio (exact recreation)

Build one self-contained `index.html` with inline `<style>` and `<script>`, no framework and no build step. It must recreate the "VELL — Create a Character" interactive hero exactly as specified below.

**What it is:** a full-screen virtual-character styling studio.
- A photoreal young Korean woman stands full-body in the centre of an almost empty, cool-daylight city loft.
- Frosted dark-glass UI panels float around her:
  - a top step-tab bar (DNA / BODY / STYLE / PERSONALITY / STORY);
  - a profile card;
  - a vertical style menu;
  - an OUTFITS panel with category chips, a 4×2 outfit grid and collapsible piece lists;
  - an Undo / Redo / Pose / Reset bar;
  - a Realism slider;
  - a Filter dropdown with five face thumbnails;
  - a glowing SAVE TO LIBRARY button.

**Interaction:**
- Clicking an outfit swaps her clothes with a top-to-bottom reveal wipe, led by a glowing white scan line.
- Filters regrade the whole scene.
- Realism stylizes it.
- The tabs swap the right panel between Outfits, DNA, Body, Personality and Story views.
- Everything feeds a real undo / redo history.

**Rules:**
- Every number below is load-bearing. Where a value is given, use exactly that value.
- Do not add anything that is not described here.

**Page basics:**
- `<title>`: `VELL — Create a Character`.
- `lang="en"`, UTF-8.
- Viewport: `width=device-width,initial-scale=1`.

---

## 1. Assets (use these exact URLs)

All images are transparent-background PNGs served through the `images.higgs.ai` resizer as WebP (alpha preserved). Build every URL with this helper:

```
CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'
H(file, w) = 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(CDN + file) + '&w=' + w + '&q=85'
```

### 1.1 Background

The background is a photoreal empty minimalist city loft in neutral cool overcast daylight. It contains:
- a floor-to-ceiling black steel window on the left, looking onto a hazy skyline and river;
- a black clothing rail with three garments by the window;
- a pale polished concrete floor;
- a warm-grey plaster wall on the right;
- a potted olive tree at the far right.

Source: 2688×1520 PNG, used at `w=2400`.
- File: `hf_20261112_034551_6394b127-5366-40a8-9c82-3c416f1161f1.png`
- Full URL: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034551_6394b127-5366-40a8-9c82-3c416f1161f1.png&w=2400&q=85

### 1.2 Model cut-outs

There are eight cut-outs, each 1360×2048 with a transparent background. All eight show the **same woman**:
- same face, same high messy bun and gold hoops;
- same front-facing pose with arms down;
- same scale and position.

Because they are registered pixel-for-pixel (head top ≈ y 28, feet ≈ y 2025, head centre x = 680), they can be stacked directly. Each one is used at `w=1000` for the stage model, the avatar and the face thumbnails, and at `w=360` for grid cards. The URL builder is the same in both cases; only `&w=` changes.

| # | Look name | Category | File |
|---|---|---|---|
| 0 | Denim Maxi | everyday | `hf_20261112_034542_a6430ecf-9862-412c-8ef6-5745115bd78c.png` |
| 1 | Cloud Set | everyday | `hf_20261112_034738_73282737-acc8-41e9-a822-96c663e27b6c.png` |
| 2 | Library Knit | everyday | `hf_20261112_034742_9a8a92fd-79ae-4163-9ffa-14ae2a68717f.png` |
| 3 | Lilac Run | athletic | `hf_20261112_034735_4e352e03-ad2b-44d1-9fcf-4b5b9454dc55.png` |
| 4 | Satin Night | sleep | `hf_20261112_034738_aeb8ea57-6399-4f3c-b54a-4a57d0bd971e.png` |
| 5 | Night Suit | formal | `hf_20261112_034736_aace5c5f-8c14-4b00-83ba-744dbad2e337.png` |
| 6 | Sage Slip | party | `hf_20261112_034735_3d9fb69e-b4e0-49f7-a2d4-e592bd616c27.png` |
| 7 | Bomber Cargo | street | `hf_20261112_034740_3e3c5ad7-689b-46a2-8e09-c7d36a569b9c.png` |

Full `w=1000` URLs, in order 0–7:
1. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034542_a6430ecf-9862-412c-8ef6-5745115bd78c.png&w=1000&q=85
2. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034738_73282737-acc8-41e9-a822-96c663e27b6c.png&w=1000&q=85
3. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034742_9a8a92fd-79ae-4163-9ffa-14ae2a68717f.png&w=1000&q=85
4. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034735_4e352e03-ad2b-44d1-9fcf-4b5b9454dc55.png&w=1000&q=85
5. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034738_aeb8ea57-6399-4f3c-b54a-4a57d0bd971e.png&w=1000&q=85
6. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034736_aace5c5f-8c14-4b00-83ba-744dbad2e337.png&w=1000&q=85
7. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034735_3d9fb69e-b4e0-49f7-a2d4-e592bd616c27.png&w=1000&q=85
8. https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261112_034740_3e3c5ad7-689b-46a2-8e09-c7d36a569b9c.png&w=1000&q=85

What each look wears, with the piece lists used in the accordion (name, colour, price in USD). An empty list means the row shows "Nothing in this look".
- **0 Denim Maxi:**
  - tops: Ribbed crop tank (Charcoal, 38)
  - bottoms: Washed denim maxi skirt (Light wash, 96)
  - full: none
  - shoes: Knee-high leather boots (Black, 210)
  - acc: Leather belt (Black, 42) and Gold hoops (14k, 64)
- **1 Cloud Set:**
  - tops: Half-zip sweatshirt (Oat, 74)
  - bottoms: Wide sweatpants (Oat, 68)
  - shoes: Chunky sneakers (White, 120)
  - acc: Gold hoops (14k, 64)
- **2 Library Knit:**
  - tops: Cable-knit cardigan (Cream, 112) and Cotton tee (White, 24)
  - bottoms: Pleated wide trousers (Heather grey, 98)
  - shoes: Penny loafers (Brown, 150)
  - acc: none
- **3 Lilac Run:**
  - tops: Zip training jacket (Lilac, 88) and Sports crop top (Lilac, 44)
  - bottoms: High-rise leggings (Lilac, 72)
  - shoes: Running sneakers (White, 140)
- **4 Satin Night:**
  - tops: Satin pyjama shirt (Powder blue, 66)
  - bottoms: Satin pyjama trousers (Powder blue, 58)
  - shoes: Fluffy slippers (Ivory, 34)
- **5 Night Suit:**
  - tops: Oversized blazer (Black, 240) and Silk camisole (Ivory, 82)
  - bottoms: Straight suit trousers (Black, 160)
  - shoes: Pointed heels (Black, 190)
- **6 Sage Slip:**
  - full: Satin slip midi dress (Sage, 180)
  - shoes: Strappy sandals (Silver, 130)
  - acc: Fine chain necklace (Silver, 56)
- **7 Bomber Cargo:**
  - tops: Leather bomber (Black, 260) and Crop tee (White, 22)
  - bottoms: Parachute cargo pants (Khaki, 94)
  - shoes: Platform sneakers (Black, 150)

Preload all eight `w=1000` images as `Image` objects at startup.

---

## 2. Fonts

Load from Google Fonts with `display=swap`:
- **Figtree** 300 / 400 / 500 / 600: all UI text.
- **Syne** 700 / 800: only the `VELL` wordmark.

The body font stack is `Figtree, system-ui, sans-serif`, antialiased.

---

## 3. Tokens

```
--glass: rgba(38,36,40,.30)      panel fill (dark smoked glass)
--glass-2: rgba(255,255,255,.10) inner tiles / rows / chips
--line: rgba(255,255,255,.30)    1px borders
--line-strong: rgba(255,255,255,.75)
--ink: #fff   --ink-2: rgba(255,255,255,.72)   --ink-3: rgba(255,255,255,.5)
--glow: 0 0 0 1px rgba(255,255,255,.85), 0 0 18px rgba(255,255,255,.35)   (the "active" outline used everywhere)
```

**Base styles:**
- `html, body`: background `#cfd2d4`, `overflow: hidden`, white text.
- Buttons are reset: no background or border, they inherit font and colour, and use a pointer cursor.

**`.glass` panels:**
- absolute positioning, background `--glass`, 1px `--line` border, radius 22px;
- `backdrop-filter: blur(22px) saturate(140%)`, with the `-webkit-` prefix too;
- box-shadow: `inset 0 1px 0 rgba(255,255,255,.35), 0 18px 40px -18px rgba(0,0,0,.35)`.

`.pill-on` = `--glow` plus background `rgba(255,255,255,.14)`. It is used for the sliding indicators.

---

## 4. Scene layers (fixed, full viewport)

1. `#scene` is fixed with `inset: 0` and `overflow: hidden`. It contains:
   - **`#grade`**: absolute, `inset: -3%`, `transition: filter .9s ease`. It holds the filter grade. Inside it:
     - **`#bg`**: absolute, `inset: 0`. The background image uses `center / cover`. Its transform is `translate3d(var(--bx), var(--by), 0) scale(1.04)` with a `.6s cubic-bezier(.2,.7,.2,1)` transition.
     - **`#tint`**: absolute, `inset: 0`, `mix-blend-mode: soft-light`, `transition: background .9s`.
   - **`#vignette`**: absolute, `inset: 0`, with two backgrounds:
     - `radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(20,18,22,.38) 100%)`;
     - `linear-gradient(180deg, rgba(20,20,24,.22), transparent 18%, transparent 70%, rgba(20,20,24,.35))`.
2. **Parallax** runs on `pointermove` with `x = clientX/innerWidth − .5` and `y = clientY/innerHeight − .5`:
   - `--bx = −x·22px` and `--by = −y·12px` on `#bg`;
   - `--mx = x·10px` on the model's inner wrapper.

---

## 5. Stage: a 1600×900 design canvas

- `#stage` is fixed at `left: 50%; top: 50%`, size `1600×900`.
- Its transform is `translate(-50%,-50%) scale(var(--s))` with the origin at the centre.
- `--s = min(innerWidth/1600, innerHeight/900)`, recomputed on resize.

All coordinates below are in stage pixels.

---

## 6. The model

**Structure:** `#modelWrap.full` › `#shadow` + `#modelInner` › `#breath` › (`#figs`, `#scan`, `#hotspots`).

- **`#modelWrap`:**
  - `left: 800px; top: 72px; width: 440px; height: 663px; margin-left: -220px`;
  - `transform-origin: 50% 100%`, `transition: transform 1s cubic-bezier(.65,0,.2,1)`.
  - Framing classes:
    - `.full`: no transform;
    - `.mid`: `translateY(345px) scale(1.5)`, waist-up with the head kept in frame;
    - `.portrait`: `translateY(940px) scale(2.4)`, head and shoulders.
- **`#modelInner`:**
  - transform `translate3d(var(--mx),0,0) scaleX(var(--build)) scaleY(var(--height))`;
  - origin at the bottom centre, `.7s cubic-bezier(.2,.7,.2,1)` transition.
- **`#breath`:** animation `breath 5.5s ease-in-out infinite`, going from `scaleY(1)` to `scaleY(1.006)` and back, with the origin at the bottom.
- **`.fig`:**
  - absolute, `inset: 0`, image at `center bottom / contain`, `filter: var(--real)`;
  - one `.fig` per shown look, stacked in `#figs`.
- **`#shadow`:**
  - a 300×34 ellipse at the bottom centre (`bottom: -6px`);
  - background `radial-gradient(closest-side, rgba(30,28,26,.55), rgba(30,28,26,0))`, `blur(4px)`.

### 6.1 Outfit swap (the signature effect)

`showLook(i)`:
1. Immediately mark grid card `i` as `.on`.
2. Await `IMGS[i].decode()`, so the wipe never reveals an unloaded image. A token guards against rapid clicks: only the latest call proceeds.
3. Append a new `.fig.in` with look `i`'s `w=1000` image. `.in` starts at `clip-path: inset(0 0 100% 0)` and runs `wipe 1.05s cubic-bezier(.7,0,.25,1) forwards` to `inset(0 0 0 0)`. The new outfit is revealed **top to bottom** over the old one. No opacity is involved.
4. At the same moment, restart `#scan.go`. `#scan` is a 2px line spanning `left: -10%; right: -10%`:
   - background `linear-gradient(90deg, transparent, #fff 25%, #fff 75%, transparent)`;
   - glow `0 0 22px 6px rgba(255,255,255,.55), 0 0 60px 18px rgba(214,226,255,.35)`.

   Its animation, `scan 1.05s` with the same easing, moves it from `top: 0` to `top: 100%`. It stays fully visible until 92%, then fades. The line rides exactly on the wipe edge.
5. On the wipe's `animationend`, remove all older `.fig`s and drop `.in`.
6. Re-render the accordion rows, the hotspots and the favourite states for the new look.

`rescan()` replays only the scan line. It is used as "re-render" feedback by the tuning controls.

### 6.2 Hotspots (full framing only)

- Show one round marker per non-empty piece group, positioned in % of the figure box:
  - tops (60%, 24%), full (60%, 38%), bottoms (38%, 47%), shoes (40%, 95%), acc (56%, 14%).
- Marker style:
  - 26px circle, `rgba(255,255,255,.25)` fill, 1px white border, `blur(6px)` backdrop;
  - a 6px white dot centre;
  - a `::before` ring pulsing with `ping 2.4s` (scale .6 → 1.6, opacity 1 → 0);
  - hover: scale 1.18.
- Hover tooltip: appears to the right (`left: 34px`), slides in from −6px, with dark glass `rgba(30,30,34,.55)` and `blur(14px)`. Text: "**Piece name** · Colour · $Price".
- Click opens that accordion row.
- Hidden (opacity 0, no pointer) when the framing is not `.full`.

---

## 7. Top bar

- **Logo** at (30, 22):
  - `VELL` in Syne 800, 46px, line-height 1, letter-spacing −.02em;
  - then, 18px gap and baseline-aligned, `CREATE A VELL` at 15px with .06em tracking.
- **Tabs `#tabs.glass`:**
  - geometry `left: 410; top: 22; 720×54`, radius 30, padding 4, flex;
  - five equal buttons `DNA, BODY, STYLE, PERSONALITY, STORY`, each 44px tall, radius 24, 16px, .05em tracking, colour `--ink-2`; the active one is white;
  - a sliding `#tabInd.pill-on` (44px tall, radius 24, `top: 5`) animates `left` and `width` over `.55s cubic-bezier(.7,0,.2,1)` to the active button.
  - STYLE is active by default.
- **Icon buttons** (right: 28, top: 24, gap 12), each a 50px round glass button with 22px white line icons:
  - **Cart:** badge counts pieces in the cart.
  - **Heart:** badge counts favourites. Its icon fills white when the current look is a favourite.
  - **Bag (Library):** badge counts saved looks. Clicking toggles the Library drawer.
  - **More (•••):** toggles a dropdown menu.
- **Badges:**
  - 20px white pill with dark text, 12px/600, at the top-right corner;
  - `scale(0)` when the count is 0, `scale(1)` otherwise, with a `.35s cubic-bezier(.3,1.8,.5,1)` spring;
  - a `bump` keyframe (scale 1.45 at 40%) plays on every change.
- **More menu** (glass, 210px wide, under the icons at top 84, origin top-right):
  - closed: scale .9 and opacity 0; open: normal;
  - items: Share look, Export render, Duplicate, Settings;
  - each item closes the menu and toasts "Share link copied", "Exported 4K render", "Duplicated as new VELL" or "Settings saved".

---

## 8. Profile card `#profile.glass`

- Geometry: `left: 24; top: 96; 476×124`, flex, centred, gap 20, padding 0 16.
- **Avatar:**
  - 98×98, radius 18, 1.5px border `rgba(255,255,255,.85)`, white glow;
  - a **face crop of the current look's image**: a 360×360 window of the 1360×2048 source at (500, 46), scaled so 360 → 98 (background-size `1360·k × 2048·k`, position `−500·k −46·k`, where `k = 98/360`).
  - It updates whenever the look changes.
- **Name:**
  - `Han Seo-yeon`, 28px/400;
  - followed by a pencil button (38px round) and a glass shuffle button (38px round).
- **Meta row** (16px, `--ink-2`, separated by 1×16 line dividers):
  - `23` | `Seoul, KR` | a cloud icon and `14°C`;
  - hovering the weather shows the tooltip "Overcast · soft daylight".
- **Pencil:** toggles `contentEditable` on the name and selects all of it. While editing, the name gets a white 1px ring and a 14% white fill. Enter or clicking the pencil again ends editing and toasts "Name updated".
- **Shuffle:** rotates its button +180° each click (.5s). It cycles through these identities, scrambling the name with random letters for about 14 frames before it resolves:
  - Han Seo-yeon, 23, Seoul KR, 14°C
  - Kim Ha-eun, 22, Busan KR, 17°C
  - Yoon Ji-woo, 25, Seoul KR, 12°C
  - Park Min-ji, 24, Incheon KR, 13°C
  - Lee Soo-ah, 21, Daegu KR, 15°C

  It also updates the age, city and temperature, and the DNA seed `VL-0{400 + k·37}-KR`.

---

## 9. Style menu `#side.glass` and Randomize

- **Style menu:**
  - geometry `left: 24; top: 236; 172×470`, padding 10, column, gap 2;
  - eight 54px buttons (radius 16, 16px, gap 14, 22px line icon then label, colour `--ink-2`, white on hover or active): Face, Hair, Makeup, Body, **Outfits** (active), Accessories, Tattoos, Details;
  - a sliding `#sideInd.pill-on` (152×54, radius 16) animates `top` over `.45s cubic-bezier(.7,0,.2,1)`.
- **Randomize `#rand.glass`:**
  - geometry `left: 24; top: 722; 220×52`, radius 16;
  - a circular-arrows icon followed by `Randomize VELL`.
- Both slide out to the left when the active tab is not STYLE: `translateX(-240px)` for the menu and `-280px` for Randomize, `.6s cubic-bezier(.7,0,.2,1)`.
- **Menu actions:**
  - Outfits → Outfits view.
  - Body → Body view.
  - Any other item → the **Tune** view for that item.

---

## 10. Right panel `#panel.glass`

- Geometry: `left: 1112; top: 96; 464×680`, padding 22 18 18, `overflow: hidden`.
- It contains six absolutely stacked `.view`s (`inset: 22px 18px 18px`, flex column).
- Hidden views get `opacity: 0; transform: translateX(30px)` and no pointer events, with a `.55s` transform and `.4s` opacity transition.
- View headers are `h3` at 17px/400, uppercase, .06em tracking, with a right-aligned 12px `--ink-3` note in normal case.

### 10.1 Outfits view (default)

**Header:** `OUTFITS`, with the note "8 looks" (live count, singular "look" when there is one).

**Category chips** (7, space-between):
- Each chip is a 58px column: a 48px rounded-14 tile (`--glass-2` fill, `--line` border) with a 24px line icon, and a 12px label underneath.
- The active chip gets `--glow`.
- Order: All (grid icon), Everyday (tee), Athletic, Sleep (moon), Formal, Party (dress), Street (hoodie).
- Click filters the grid:
  - non-matching cards go `.out` (opacity 0, scale .85), then `display: none` after 300ms;
  - matching cards re-enter with a stagger (45ms apart, 500ms each) from `translateY(14px) scale(.96)`.

**Grid:**
- 4 columns, gap 10, height 296, margin-top 16.
- Each card:
  - 142px tall, radius 14, 1px `--line` border;
  - background `linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.06))`;
  - the look's `w=360` image in an inner `.im` layer extending 20% beyond each side, `center top / auto 104%`.
- Hover: the card lifts 3px and the image scales 1.06. A name tag slides up from below: 11px, dark-glass pill, 6px insets.
- Active card: `--glow` plus a 3px `rgba(255,255,255,.25)` ring.
- Each card has a 24px round heart badge at the top-right. It is hidden, and springs in when the look is a favourite.
- Interaction:
  - click: `pickLook(i)` (ignored if `i` is already the current look) → swap the model, update the avatar and filter thumbnails, commit to history;
  - double-click: toggle favourite.

**Accordion** (`margin-top: auto`, gap 7): five rows, TOPS, BOTTOMS, FULL BODY, SHOES, ACCESSORIES.
- Row style: radius 12, `--glass-2` fill, `--line` border; the header button is 42px, 15px uppercase.
- The piece count of the current look shows as a small "· n" next to the title.
- A chevron rotates 180° when the row is open.
- The body opens with `grid-template-rows: 0fr → 1fr` over `.4s cubic-bezier(.7,0,.2,1)`. Only one row is open at a time.
- Item lines, one per piece: name, then a smaller muted colour, then a white price `$NN`, then a 28px round `+` button.
- The `+` button toggles the piece in the cart: it turns into a white filled `✓`, updates the cart badge, and toasts "Added to cart".

### 10.2 Tune view (Face, Hair, Makeup, Accessories, Tattoos, Details)

**Layout**, top to bottom:
1. The header shows the item name and the note "changes re-render the model".
2. An optional row of 34px colour swatches. The active swatch gets a 3px white ring.
   - Hair: `#14110f #3b2a20 #6b4a35 #a07c5a #d9c3a1`
   - Makeup: `#e8b4a8 #d98c8c #b5525e #8e3c4a`
3. Preset chips (`.opt`: radius 12, 9×14 padding, 14px; the active one gets `--glow`).
4. Sliders.

**Content per item:**
- **Face:** sliders Smile 35, Jawline 50, Freckles 10. Presets Soft, Defined, Natural, Sculpted.
- **Hair:** sliders Volume 60, Shine 70. Presets High bun, Low bun, Long straight, Bob, Ponytail.
- **Makeup:** sliders Blush 30, Lip tint 45, Glow 55. Presets No-makeup, Glass skin, Soft glam, Editorial.
- **Accessories:** multi-select, labelled "Add items". Options: Gold hoops, Silver chain, Shoulder bag, Sunglasses, Watch, Hair clip.
- **Tattoos:** slider Opacity 40. Presets None, Fine line, Floral, Script, Minimal dots.
- **Details:** sliders Skin texture 70, Fabric detail 80, Lighting softness 60. Presets Studio, Natural, Cinematic.

**Behaviour:**
- Picking a preset replays the scan line and toasts "Hair: Bob" (or the equivalent).
- Picking a swatch, or releasing a slider, replays the scan line.
- State is remembered per item.

**Slider style** (used everywhere):
- a 4px track filled white up to `--p` and `rgba(255,255,255,.28)` after it;
- a 22px white thumb with a 5px translucent white border and a white glow;
- the label row shows the name on the left and the bold value on the right.

### 10.3 DNA view (tab DNA)

- Header: `DNA`, with the note "identity seed".
- A 300×120 SVG **animated double helix**: 26 rungs, 11px apart.
  - Strand points are at `60 ± sin(i·.42 + t)·38`; `t` grows by .03 per frame.
  - Dot radius is `2 + depth·2.4` and alpha is `.4 + depth·.6`; rung alpha is `.15 + depth·.25`.
- Rows (15px, separated by 1px dividers): Seed `VL-0423-KR`, Heritage Korean, Age 23, Eye colour Dark brown, Hair Black · high bun.
- A full-width `Re-seed identity` outline button (46px, radius 14, white 1.5px border, white fill on hover). It does the same thing as the profile shuffle, plus a scan.

### 10.4 Body view (tab BODY, or the Body menu item)

- **Height (cm) slider:** 150–185, default 168. It sets `--height = 1 + (v − 168)/168·.9`.
- **Build slider:** 0–100, default 50. It sets `--build = 1 + (v − 50)/50·.07`.
- Both commit to history on release.
- **Posture** chips: Relaxed (active), Confident, Editorial. They replay the scan.
- **Framing** chips: Full body, Mid shot, Portrait. They set the framing and stay in sync with the Pose button.

### 10.5 Personality view

- Header: `PERSONALITY`, with the note "pick up to 3".
- Ten trait chips: Curious, Bold, Calm, Witty, Romantic, Driven, Playful, Gentle, Creative, Loyal.
  - The default selection is Curious, Creative and Gentle.
  - Picking a fourth drops the oldest.
  - Every change recomputes the five radar values deterministically from the selected trait names (30–94).
- **Radar** (250×210 SVG):
  - five axes (Openness, Energy, Warmth, Focus, Humour), radius 78;
  - four concentric grid pentagons;
  - 11px labels;
  - the value polygon is filled `rgba(255,255,255,.28)` with a 1.5px white stroke.
- Openness and Energy sliders below the radar edit those axes live.

### 10.6 Story view

- Header: `STORY`, with the note "auto-written from your choices".
- A rounded glass text box (16px / 1.6). Every time the tab opens it **types** a bio, 2 characters every 22ms, with a blinking 2px caret. The bio is built from the name, height, city, look name and traits:

  > "{name} is {height} cm of {trait1} energy from {city}. Mornings start with a long walk along the river in her {look name lowercase} look; friends call her {trait2} and a little {trait3}. She collects film cameras, keeps a sketchbook of strangers' outfits, and is saving for a studio of her own."

- **Rewrite story** picks three random traits and types again.

---

## 11. Bottom controls

### 11.1 Control bar `#ctrl.glass`

- Geometry: `left: 504; top: 742; 592×54`, radius 18.
- Four equal 44px buttons (17px, icon gap 12): **Undo**, **Redo**, **Pose**, **Reset**.
- Disabled buttons sit at 40% opacity. Pose always has `--glow` and its label shows the current framing: `Full`, `Mid` or `Portrait`.

**History:**
- `S = {look, grade, real, height, build}`, defaulting to `{0, 0, 75, 168, 50}`.
- Every committed change pushes a copy and truncates the redo tail.
- Undo and Redo re-apply a snapshot. The look is swapped with the full wipe animation.
- Cmd/Ctrl+Z undoes and Shift+Cmd/Ctrl+Z redoes. ArrowLeft and ArrowRight step through the looks.

**Buttons:**
- **Pose** cycles the framing full → mid → portrait.
- **Reset** applies the defaults with full framing, commits, and toasts "Reset to default".

### 11.2 Realism `#real.glass`

- Geometry: `left: 24; top: 796; 452×88`, padding 16 20.
- Contents: the title `Realism` (16px), a slider (0–100, default 75) with its `75%` value on the right, and the end labels `Stylized` / `Hyper Realistic` (13px) under it.
- Mapping, with `k = max(0, (80 − v)/80)`:
  - model `--real = saturate(1 + k·.9) contrast(1 + k·.25) blur(k·1.4px) brightness(1 + k·.05)`;
  - background `blur(k·5px) saturate(1 + k·.5)`.

### 11.3 Filter `#filt.glass`

- Geometry: `left: 494; top: 796; 640×88`, flex, gap 16.
- **Dropdown:**
  - a `Filter` title over a 156×38 dropdown button showing the current filter name and a chevron (which rotates when open);
  - the list opens **upward** (`bottom: 46px`) as a glass list with one button per filter.
- **Thumbnails:** five 64×64 radius-12 thumbnails, each a **face crop of the current look** (same crop as the avatar, `k = 64/360`).
  - Each previews its own filter: the CSS filter on the thumbnail, plus an `<i>` soft-light tint overlay.
  - The active one gets `--glow`; hover lifts 3px.
  - Click applies the filter and commits.
- A 36px round **›** button rotates the five-thumbnail window by one, nudging the row from −14px back to 0 over 350ms.

**Filters** (`#grade` filter / `#tint` background):

| Filter | `#grade` filter | `#tint` background |
|---|---|---|
| Daylight (default) | `none` | `transparent` |
| Soft Film | `contrast(.92) saturate(.85) brightness(1.06)` | `linear-gradient(180deg, rgba(255,226,214,.35), rgba(180,200,220,.35))` |
| Cool Studio | `saturate(.9) brightness(1.06) contrast(1.04)` | `linear-gradient(180deg, rgba(150,190,255,.55), rgba(200,220,255,.3))` |
| Blue Hour | `brightness(.82) contrast(1.1) saturate(1.1)` | `linear-gradient(180deg, rgba(70,60,170,.75), rgba(150,90,170,.55))` |
| Mono | `grayscale(1) contrast(1.12) brightness(1.03)` | `transparent` |
| Golden Hour | `saturate(1.1) brightness(1.02)` | `linear-gradient(180deg, rgba(255,180,90,.6), rgba(255,140,80,.4))` |

Both properties transition over .9s.

### 11.4 Save `#save.glass`

- Geometry: `left: 1302; top: 796; 274×88`, padding 14.
- Inside it is `SAVE TO LIBRARY`:
  - 17px, .06em tracking, radius 16, 1.5px white border;
  - glow `0 0 18px rgba(255,255,255,.35), inset 0 0 14px rgba(255,255,255,.15)`;
  - hover: white fill with dark text.
- On click:
  - a skewed white shine sweeps across the button (.9s);
  - the **Library drawer** opens;
  - a "flyer" clone of the current look (with the current grade filter) starts over the model's box (middle 50% of its width) and flies over `.8s cubic-bezier(.7,0,.2,1)` to the next 72×104 slot in the library row;
  - after 860ms the slot becomes a real saved card (it pops in from scale .4), the Library badge counts up, and the toast reads "Saved to library".
  - Clicking a saved card loads that look.

### 11.5 Library drawer `#lib.glass`

- Geometry: `left: 504; top: 560; 592×170`, sitting above the control bar.
- Hidden state: `translateY(20px) scale(.97)` and opacity 0, `.4s`.
- Contents: a `LIBRARY` header with the note "n saved", then a horizontal row of 72×104 saved cards. The empty text is "Save a look to start your library."
- Clicking outside the drawer, the Bag button and the Save button closes it.

---

## 12. Randomize

- The icon spins +360° (.8s).
- A **roulette** highlight then steps across the visible cards 12 times, slowing from 50ms by +8ms per step.
- It lands on a random different look and swaps it in with the wipe.
- It also sets a random filter from the first four and a random realism between 55 and 99, then commits.

---

## 13. Toast

- Glass pill centred at stage top 96, with a white check icon, 15px text.
- It drops in from −20px with a `.35s cubic-bezier(.3,1.4,.5,1)` spring and auto-hides after 1.8s.

---

## 14. Initial state and acceptance checklist

**Initial state:**
- Look 0 (Denim Maxi) shown without animation.
- Daylight filter, realism 75%, height 168, build 50, Full framing.
- Undo and Redo disabled.
- STYLE tab with the Outfits menu item active.
- Indicators positioned after layout and again on `load`.

**Checklist:**
- [ ] The scene is cool neutral daylight, not yellow, and the loft is nearly empty.
- [ ] All eight looks show the same Korean woman in the same pose. Swapping is a top-to-bottom clip wipe with a glowing scan line, and never a cross-fade.
- [ ] The avatar and the five filter thumbnails are face crops of the *current* look.
- [ ] Every control described above works: chips filter with a stagger, the accordion shows real pieces and prices, the cart / favourite / library badges spring, and undo / redo / reset follow real history.
- [ ] Pose re-frames full → mid → portrait with the head kept in frame, and the hotspots hide outside full framing.
- [ ] Tabs slide the indicator, swap the right-panel views, and slide the style menu and Randomize away outside STYLE.
- [ ] Panels are dark smoked glass with white text and the `--glow` active state everywhere.
- [ ] The 1600×900 stage scales to fit, and the background parallax follows the cursor.