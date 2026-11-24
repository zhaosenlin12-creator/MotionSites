# Try the Look. — Runway: exact recreation prompt

Build a single page that recreates the user's own static export of a Shopify "runway" section called "Try the Look." exactly as it is. It is a Nike-branded streetwear outfit carousel. Six full-body models stand on a white stage, arranged in depth on a turning 3D ring with blurred outer figures. The carousel advances every 5 seconds, with a 01–06 progress bar, arrows and a pause button. It has a custom "Drag / View" cursor and a "View look" popup with numbered product pins. A right-hand "In this look" panel lists the pieces with plus buttons and size pickers, and ends with a "Complete the look" bundle price and an "Add full look to bag" button. A local "styling bag" dialog keeps the shortlist. Keep every Nike name, product name, price and shop link exactly as listed below.

Write plain HTML, CSS and vanilla JavaScript with no frameworks. The section is a custom element `<runway-section>` defined with `customElements.define`. Every number in this brief comes from the final source and must be used as given.

---

## 1. Page basics

- `<html lang="en">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width,initial-scale=1">`, `<meta name="theme-color" content="#ffffff">`.
- Title: `Try the Look — Runway`.
- Meta description: `Six looks, styled head to toe. Explore the runway, isolate a look, and tap a pin to see the piece.`
- Preload the first model: `<link rel="preload" as="image" href="https://reel-ref-try-the-look.vercel.app/assets/model-1-640.webp" fetchpriority="high">`.
- Global reset: `* {box-sizing:border-box}`. `html, body` have margin 0, padding 0, max-width 100%, font-family `Helvetica, Arial, sans-serif`, colour `#151413` and background `#fff`. `body` has `overflow-x:hidden`. Buttons, inputs and selects use `font: inherit`. Links have `color: inherit` and no underline. Buttons have `color: inherit`. Buttons and links have `-webkit-tap-highlight-color: transparent`. `button:focus-visible` and `a:focus-visible` get `outline: 2px solid #151413; outline-offset: 4px`. `[hidden]` is `display:none !important`. `:root` has `color-scheme: light`.
- Root theme variables (mirroring Shopify Horizon tokens): `--font-body--family: Helvetica,Arial,sans-serif`, `--font-body--weight: 400`, `--font-heading--family: Helvetica,Arial,sans-serif`, `--font-heading--weight: 400`, `--color-primary-button-background: #151413`, `--color-primary-button-text: #fff`, `--style-border-radius-buttons-primary: 0px`.
- Document order inside `<body>`:
  1. `<header class="site-header shopify-section-group-header-group">`. The class name `shopify-section-group-header-group` matters because the script measures it to fit the section under the header.
  2. `<main>` holding the `<runway-section>`.
  3. `<dialog id="bag-dialog">`, the styling bag.
  4. `<div id="bag-status" role="status" aria-live="polite">`, the toast.
  5. The script (deferred).

### 1.1 Site header

- Height 88px, padding `0 40px`, flex row, `align-items:center`, gap 32px, `border-bottom: 1px solid #e4e4e4`, background `#fff`, `position:relative`, z-index 50.
- Brand link `<a href="./" class="brand" aria-label="Runway home">` with `margin-right:auto`, inline-flex. It holds `<img>` of the Nike swoosh (https://reel-ref-try-the-look.vercel.app/assets/nike-logo.svg) with `width=68 height=24 alt="Nike"`. The image is display block, 68×24 px, `object-fit: contain`.
- `<nav aria-label="Main navigation">`: flex, gap 28px, font-size 14px, font-weight 600, font-family `Inter, Helvetica, Arial, sans-serif` (the only place Inter is used). Each link has padding `12px 0`. On hover the link gets `text-decoration: underline; text-underline-offset: 4px`. The links, in order:
  1. `Home` → `./`
  2. `Nike Orbit` → `https://nike-makknzjs.myshopify.com/pages/nike-orbit` (`target="_blank" rel="noopener noreferrer"`)
  3. `Hand Rail Pro` → `https://nike-makknzjs.myshopify.com/pages/scene-rail` (`target="_blank" rel="noopener noreferrer"`)
  4. `Runway` → `./` with `aria-current="page"`
- Bag button `<button id="open-bag" aria-label="Open styling bag">`: flex, centred, gap 5px, no background or border, min 44×44, pointer cursor. It contains:
  - An outline shopping-bag SVG, 22×24, viewBox `0 0 24 26`, no fill, `stroke="currentColor"`, stroke-width 1.3, path `M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2`.
  - `<span data-cart-count>0</span>` at 10px.

### 1.2 The section element and its attributes

The `<runway-section>` has `id="Runway-template--28035983671601__the_runway_wdM8BG"` and classes `rw rw--add-icon rw--popup rw--list has-dividers has-border`. Its data attributes, which the script reads:

| attribute | value | meaning |
|---|---|---|
| `data-feel` | `balanced` | spring stiffness 95, follow lag 0.04 s per place in line |
| `data-blur` | `true` | depth blur on queue bodies |
| `data-mblur` | `true` | motion blur (line mode only, desktop; unused in ring) |
| `data-style` | `ring` | desktop layout = 3D ring |
| `data-mstyle` | `classic` | phone layout = classic diagonal line |
| `data-fit` | `true` | desktop frame = viewport minus header height |
| `data-height-mode` | `original` | desktop height rule |
| `data-height-vh` | `100` | (unused in original mode) |
| `data-mheight-mode` | `custom` | phone height = custom percentage |
| `data-mheight-vh` | `109` | phone frame = 109% of the viewport height |
| `data-reflect` | `false` | no floor reflection |
| `data-autoplay` | `true` | autoplay on |
| `data-speed` | `5000` | 5 s per look |
| `data-after-add` | `stay` | stay on page after adding |
| `data-bundle-code` | `""` | no discount code |
| `data-msg-choose` | `Pick a size for: [items]` | message when sizes are missing |
| `data-msg-error` | `Couldn’t add to bag. Please try again.` | error copy (curly apostrophe) |
| `data-msg-soldout` | `Sold out` | sold-out label |

Its inline style sets the design tokens listed in section 4.

---

## 2. Assets

All images are referenced by absolute URL on the user's deployment, `https://reel-ref-try-the-look.vercel.app/assets/…`. Do not re-host them and do not use relative `assets/` paths. Model and product images are transparent-background WebP cut-outs (they have an alpha channel), and they sit directly on the white stage and panel.

### 2.1 Logo

| URL | shows | where |
|---|---|---|
| https://reel-ref-try-the-look.vercel.app/assets/nike-logo.svg | Black Nike swoosh, viewBox `135.5 361.38 1000 356.39` (no fill set, so it renders black) | Header brand, 68×24 desktop / 48×17 phone, `object-fit: contain` |

### 2.2 Model cut-outs (runway figures)

Each look uses one 640-wide image as `src` and its 1080-wide original in `srcset`. Every model `<img>` has `srcset="<640 url> 640w, <1080 url> 1080w"`, `sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px"`, `loading="eager"`, `decoding="async"`, `width="1100" height="1956"`, `draggable="false"`, the attribute `data-model-image`, and `alt` = the look name. Clones made by the script get `loading="lazy"`.

| Look # (index) | 640 px src (640×1138) | 1080 px srcset (1080×1920) | shows |
|---|---|---|---|
| 1 (0) "The City Edit" | https://reel-ref-try-the-look.vercel.app/assets/model-1-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-1.webp | Young man with curly dark hair, arms crossed, charcoal-grey crew knit, wide light-blue denim, grey sneakers |
| 2 (1) "Gallery Opening" | https://reel-ref-try-the-look.vercel.app/assets/model-5-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-5.webp | Man with braids, white oversized tee, very wide washed vintage denim, white sneakers |
| 3 (2) "Gallery Opening" | https://reel-ref-try-the-look.vercel.app/assets/model-4-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-4.webp | Man in olive-green chunky knit, brown wide trousers, tan shoes |
| 4 (3) "Studio Day" | https://reel-ref-try-the-look.vercel.app/assets/model-6-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-6.webp | Man in sunglasses, black tee, chain necklace, pale wide jeans, white sneakers |
| 5 (4) "Studio Day" | https://reel-ref-try-the-look.vercel.app/assets/model-3-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-3.webp | Man in burgundy/rust knit over white tee, grey wide jeans, black shoes |
| 6 (5) "Studio Day" | https://reel-ref-try-the-look.vercel.app/assets/model-2-640.webp | https://reel-ref-try-the-look.vercel.app/assets/original-look-2.webp | Man in light-grey crew sweatshirt, light washed wide denim, white sneakers |

Note the non-sequential file mapping: look 2 uses model-5, look 3 uses model-4, look 4 uses model-6, look 5 uses model-3 and look 6 uses model-2. Each model image appears three times in the DOM:
- in the queue body (`.rw__model`) for the look,
- in the clone of that body (the script clones bodies 0–5 into bodies 6–11),
- in the matching hero (`.rw__hero`).

The hero's `data-probe` attribute holds the same 640 URL, which the script uses for feet detection (section 8.6). In the popup the clone's `sizes` is rewritten to `round(h × 0.5625)px`.

Model images start at `opacity:0`. When `image.decode()` resolves (or on load, if decode throws but `naturalWidth` exists), they get class `is-decoded`, which sets `opacity:1`. There is no transition: the image appears in one step.

### 2.3 Product images (panel thumbnails, size-sheet thumbnails, bag rows)

| URL | natural size | shows | used for product |
|---|---|---|---|
| https://reel-ref-try-the-look.vercel.app/assets/source-tatum-5-orbit-copy.webp | 400×400 | Low-top sneaker, light grey/cream with dark-brown swoosh and small pink accents, side view | "Air Jordan 12 Retro" |
| https://reel-ref-try-the-look.vercel.app/assets/source-tatum-5-orbit.webp | 400×400 | Air Jordan 3 style: white leather, black collar, grey elephant print, red accents | "Tatum 5 Orbit" |
| https://reel-ref-try-the-look.vercel.app/assets/source-air-jordan-12-retro-copy.webp | 400×400 | Black low-top leather sneaker with white midsole | "Luka 5" |
| https://reel-ref-try-the-look.vercel.app/assets/source-tshirt.webp | 400×563 | Black jersey tee on a hanger, pink rib collar, white gothic "Reign" print with a star | "Tshirt" |
| https://reel-ref-try-the-look.vercel.app/assets/source-sweatshirt.webp | 400×581 | Beige crew-neck sweatshirt on a hanger, small chest print | "Sweatshirt" |
| https://reel-ref-try-the-look.vercel.app/assets/source-sweatshirt-plus.webp | 393×600 (HTML says 400×610) | Bottle-green hoodie, cream varsity "VERDO ORIGINAL" lettering | "Sweatshirt Plus" |
| https://reel-ref-try-the-look.vercel.app/assets/source-hoodie.webp | 400×555 | Heather-grey hoodie with black "THANK GOD I'M AN ATHEIST" print | "Hoodie" |
| https://reel-ref-try-the-look.vercel.app/assets/source-hoodie-black.webp | 400×536 | Black hoodie with a grey star/snowflake graphic | "Hoodie Black" |

In the panel these are `<img loading="lazy" decoding="async" alt="">` with `width=400` and `height` = the natural height from the table. Shoes are 400. The others are tee 563, sweatshirt 581, sweatshirt plus 610, hoodie 555, hoodie black 536. In the mobile size sheet they are `width=160` with heights scaled the same way: shoes 160, tee 225, sweatshirt 232, sweatshirt plus 244, hoodie 222, hoodie black 214.

### 2.4 Data and other files

- Product catalog JSON for the bag: https://reel-ref-try-the-look.vercel.app/native-catalog.json (described in section 6.3). In the standalone version, inline its contents as a JS object, with every `image` rewritten to the absolute asset URL above, rather than fetching a relative `native-catalog.json`.
- Font: https://reel-ref-try-the-look.vercel.app/assets/inter-600.woff2 (section 3).
- The original registers a service worker `./sw.js` (https://reel-ref-try-the-look.vercel.app/sw.js) with errors swallowed. Leave it out in the standalone.
- Complete list of asset URLs used (22): inter-600.woff2, model-1…6-640.webp, original-look-1…6.webp, nike-logo.svg, and source-air-jordan-12-retro-copy, source-hoodie-black, source-hoodie, source-sweatshirt-plus, source-sweatshirt, source-tatum-5-orbit-copy, source-tatum-5-orbit and source-tshirt (all .webp). Every one sits under `https://reel-ref-try-the-look.vercel.app/assets/`.

---

## 3. Fonts

- **Inter 600 (header nav only).** Declare `@font-face { font-family: Inter; src: url(<woff2>) format('woff2'); font-weight: 600; font-style: normal; font-display: swap; }`. In the standalone file, embed the woff2 as a base64 data URI (`data:font/woff2;base64,…`). The original file is https://reel-ref-try-the-look.vercel.app/assets/inter-600.woff2 (39,620 bytes). Apply it only to `.site-header nav` (`font-family: Inter, Helvetica, Arial, sans-serif`), at 14px / 600 on desktop and 11px on phones.
- **Everything else** uses the system stack `Helvetica, Arial, sans-serif`, at weight 400 by default. The heading family `--rw-hf` resolves to the same stack at weight `--rw-hw: 400`. Product names, buttons and the bundle title use weight 500. Pin numbers, thumbnail number badges and the "New" tag use 600. Nothing loads from Google Fonts.
- The section uses `-webkit-font-smoothing: antialiased`. Tick labels, the popup kicker and counts use `font-variant-numeric: tabular-nums`.

---

## 4. Tokens

### 4.1 Inline tokens on the section (exact values)

| token | value |
|---|---|
| `--rw-c-stage` | `#ffffff` (stage background) |
| `--rw-c-panel` | `#ffffff` (panel background) |
| `--rw-c-text` | `#151413` |
| `--rw-c-muted` | `#66625c` |
| `--rw-c-accent` | `#0e0e0e` |
| `--rw-c-on-accent` | `#ffffff` |
| `--rw-c-line` | `#c8c8c8` |
| `--rw-card` | `#DFDFDF` (card mode only, unused in list mode) |
| `--rw-hf` | `var(--font-heading--family, inherit)` |
| `--rw-hw` | `400` |
| `--rw-h-d` / `--rw-h-m` | `46px` / `24px` (title) |
| `--rw-sub-d` / `--rw-sub-m` | `12px` / `12px` |
| `--rw-eyebrow-d` / `-m` | `11px` / `10px` (no eyebrow element in this export) |
| `--rw-label-d` / `-m` | `10px` / `9px` |
| `--rw-chip-d` / `-m` | `17px` / `18px` (popup look name) |
| `--rw-ph-d` / `-m` | `18px` / `16px` (panel heading) |
| `--rw-pt-size-d` / `-m` | `13px` / `12px` (product title) |
| `--rw-price-d` / `-m` | `12px` / `12px` |
| `--rw-opt-d` / `-m` | `11px` / `11px` |
| `--rw-total-d` / `-m` | `16px` / `16px` |
| `--rw-thumb-d` / `-m` | `92px` / `62px` |
| `--rw-tag-top` / `--rw-tag-left` | `18px` / `0px` |
| `--rw-thumb-radius` | `0px` |
| `--rw-morph` | `900ms` |
| `--rw-bar-r` | `20px` (mobile docked panel radius) |
| `--rw-panel-w` | `380px` |
| `--rw-panel-pad-d` | `32px` |
| `--rw-radius` | `0px` |
| `--rw-max` | `none` |
| `--rw-speed` | `5s` |
| `--rw-ax` | `40%` (rewritten by the script to the hero x in %) |
| `--rw-btn-radius` | `0px` |
| `--rw-pill-radius` | `30px` |
| `--rw-add-radius` | `20px` |

### 4.2 Derived tokens (on `runway-section`)

- Desktop sizes: `--rw-h`, `--rw-sub`, `--rw-label`, `--rw-chip`, `--rw-ph`, `--rw-pt-size`, `--rw-price`, `--rw-opt`, `--rw-total` and `--rw-thumb` take their `-d` values. `--rw-panel-pad` = 32px. `--rw-model-h` defaults to 560px and is overwritten by the script.
- Colours: `--rw-stage` = #ffffff, `--rw-panel` = #ffffff, `--rw-text` = `--rw-head` = #151413, `--rw-muted` = #66625c, `--rw-accent` = #0e0e0e, `--rw-on-accent` = #ffffff, `--rw-line` = #c8c8c8.
- Buttons: `--rw-btn-bg` = `--color-primary-button-background` = #151413, `--rw-btn-fg` = #fff, `--rw-btn-radius` = `--style-border-radius-buttons-primary` = 0px.
- Easings:
  - `--rw-ease: cubic-bezier(.16,1,.3,1)`: long, silky deceleration, used almost everywhere.
  - `--rw-ease-silk: cubic-bezier(.65,0,.35,1)`: symmetric, for the light sweep.
  - `--rw-ease-spring: cubic-bezier(.34,1.56,.64,1)`: overshoot, for pin pop-ins and pills.
  - `--rw-ease-sheet: cubic-bezier(.32,.72,0,1)`: bottom-sheet slide.
- `--rw-pin-base: .15s` (`.6s` only in morph modes).
- The section is `display:block; position:relative`, with colour `--rw-text`, background `--rw-panel` and the body font family and weight.

---

## 5. Layout

### 5.1 Frame and grid (desktop ≥1100px)

- `.rw__sticky` has height `var(--rw-frame-h, 100svh)` and is a flex column. The script sets `--rw-frame-h` (section 8.1). On desktop this is `max(380, innerHeight − 88)`, so the header plus the section fill exactly one screen.
- `.rw__grid` is a grid with `grid-template-columns: minmax(0,1fr) 380px` and `grid-template-rows: minmax(0,1fr)`, full width, `max-width: none`, centred.
- **Left column `.rw__left`**: relative, flex column, background white (stage), `overflow:hidden`. It contains `.rw__head`, `.rw__stage`, `.rw__controls` and the popup `.rw__lb`.
- **Right column `.rw__panel.has-rule`**: background white, `border-left: 1px solid #c8c8c8`. `.rw__panel-inner` is `position:absolute; inset:0`, a flex column.

### 5.2 Head

- `.rw__head` is flex, `justify-content: space-between`, `align-items: flex-end`, gap 24px, padding `44px 56px 0`, z-index 5.
- `.rw__intro` is a flex column, gap 12px, max-width 640px. It contains:
  - `<h2 class="rw__title">Try the Look.</h2>`: margin 0, heading family, weight 400, 46px, line-height 1, letter-spacing −0.02em, colour #151413.
  - `<p class="rw__sub">Six looks, styled head to toe. Tap a pin to see the piece.</p>`: 12px, line-height 1.55, colour #66625c, max-width 46ch.
- Next to the intro is the visually hidden live region `<span class="rw__sr" aria-live="polite" aria-atomic="true" data-rw-live>`. It announces e.g. "Look 2: Gallery Opening" on each change.
- `.rw__sr` is the standard screen-reader-only style: absolute, 1×1, `clip: rect(0,0,0,0)`, nowrap.

### 5.3 Stage

- `.rw__stage[data-rw-stage]` has `tabindex="0" role="region" aria-roledescription="carousel"` and `aria-label="Try the Look. — use arrow keys or swipe to change look"`. It is relative, `flex: 1 1 auto`, `min-height: 0`, `touch-action: pan-y`, `user-select: none`, `cursor: grab` (`grabbing` while dragging), no outline, `overflow: hidden`, z-index 0. `:focus-visible` gives `box-shadow: inset 0 0 0 2px #0e0e0e`.
- Children, in order:
  1. `.rw__actors[data-rw-actors]` (absolute, inset 0) with the six `.rw__model` queue bodies. The script appends six clones to it.
  2. `.rw__heroes[data-rw-heroes]` (absolute, inset 0, `pointer-events:none`, z-index 1500) with the six `.rw__hero` elements.
  3. `<span class="rw__sweep">` (absolute, inset 0, z-index 1550, `mix-blend-mode: soft-light`, no pointer events).
  4. The custom cursor `<span class="rw__cursor" data-rw-cursor>`, which contains `<span class="rw__cursor-in">` holding `<span class="rw__cursor-label rw__cursor-drag">Drag</span><span class="rw__cursor-label rw__cursor-view">View</span>`.
  5. `<span class="rw__walk"><span class="rw__walk-line"></span></span>` (phone-only progress line).
- **Queue body** `.rw__model[data-rw-model][data-index=i][aria-hidden=true]` is absolute at left 0, bottom 0, with `transform-origin: 50% 100%`, `will-change: transform, opacity` and initial opacity 0. Inside it:
  - `<span class="rw__shadow">`.
  - `.rw__figure` with style `--rw-ar: 0.5625`: relative, height `var(--rw-model-h)`, `aspect-ratio: var(--rw-ar)` (9:16).
  - Inside the figure, `.rw__art` (absolute, inset 0, `transform: translateY(calc(var(--rw-foot,0) * 100%))`) holds the `<img>` and a `<button class="rw__hit" data-rw-go="i" aria-label="Look N: Name" tabindex="-1">`.
  - The image is absolute, inset 0, 100%×100%, `object-fit: contain`, `object-position: 50% 100%`, no pointer events, not draggable.
  - `.rw__hit` is absolute, inset 0, z-index 1, transparent, no border, radius 24px, pointer cursor. On `:focus-visible` it gets a 2px accent outline at 6px offset.
- **Contact shadow** `.rw__shadow`: absolute, left 58%, bottom 0, width 150%, height 9% (min 14px, max 46px), `transform: translate(-50%, 50%)`, `filter: blur(2px)`. Background `radial-gradient(closest-side, rgb(20 16 12/.30), rgb(20 16 12/.14) 45%, rgb(20 16 12/.04) 75%, rgb(20 16 12/0))`.
- **Hero** `.rw__hero[data-rw-hero][data-index=i]` carries `data-name`, `data-label="Look N: Name"` and `data-probe=<640 URL>`. The first hero has class `is-on`. It is absolute at `left: var(--rw-hx, 72%)` and `bottom: var(--rw-hy, 30px)`, with `transform: translateX(-50%) scale(var(--rw-fs,1))` and origin `50% 100%`. It contains `.rw__morph`, which holds a shadow and a figure. The figure's art holds the image, then:
  - `<button class="rw__zoom" data-rw-zoom aria-label="View look: Name" tabindex="-1">`: absolute, inset 0, z-index 1, transparent, radius 24px, `cursor: zoom-in`.
  - `.rw__pins` with three pin buttons (data in section 6.2).
- **Pin** `<button class="rw__pin" data-rw-pin="n" data-tip="Product" style="left:X%; top:Y%; --pi:n" aria-label="n: Product" tabindex="-1">` contains `<span class="rw__pin-dot">n</span>`.
  - Hit area is 44×44, centred on the point with `margin: -22px 0 0 -22px`, transparent, grid centred.
  - The dot is 24×24, circular, background `rgb(255 255 255/.86)` with `backdrop-filter: blur(6px)`, text #151413, 11px, weight 600, line-height 1, shadow `0 4px 14px -4px rgb(0 0 0/.35)`.
  - Pin styling and animation are in section 9.4.
  - Because the section has class `rw--popup`, the pins inside the runway heroes are `display:none !important`. Pins only appear in the "View look" popup.

### 5.4 Controls row

- `.rw__controls` is flex, centred vertically, gap 20px, padding `6px 44px 30px`, z-index 5. Left to right:
  1. **Prev** `<button class="rw__icon" data-rw-prev aria-label="Previous look">` with a 26×14 arrow SVG (stroke currentColor, width 1.3, round caps and joins, path `M25 7H1M7 1L1 7l6 6`).
  2. **Ticks** `.rw__ticks`: flex 1, gap 6px, min-width 0. It holds six `<button class="rw__tick" data-rw-tick="i" aria-current="true|false" aria-label="Look N: Name">`. Each contains `<span class="rw__tick-bar">` and `<span class="rw__tick-label">0N<span class="rw__tick-name">&nbsp;&nbsp;Name</span></span>`. The labels are `01  The City Edit`, `02  Gallery Opening`, `03  Gallery Opening`, `04  Studio Day`, `05  Studio Day`, `06  Studio Day`, with two non-breaking spaces before the name.
  3. **Autoplay** `<button class="rw__icon rw__auto" data-rw-auto aria-pressed="false" aria-label="Autoplay">` with a play SVG (14×14, viewBox 0 0 24 24, fill currentColor, path `M7 4.5v15l12.5-7.5z`) and a pause SVG (path `M6.5 4.5h3.5v15H6.5zM14 4.5h3.5v15H14z`). The pause icon shows while `is-playing`; otherwise the play icon shows.
  4. **Next** `<button class="rw__icon" data-rw-next aria-label="Next look">` with arrow path `M1 7h24M19 1l6 6-6 6`.
- `.rw__icon` is 44×44, grid centred, no border or background, colour #151413, `position: relative`.
  - `::before` is a ring: inset 2px, circular, 1px currentColor border, opacity 0, `scale(.55)`, transitioning transform `.7s var(--rw-ease)` and opacity `.4s`. On hover it goes to opacity .22 and `scale(1)`.
  - On hover the SVG of prev moves `translateX(-4px)` and the SVG of next moves `translateX(4px)`. On `:active` the SVG scales to .88. SVG transitions are `.5s cubic-bezier(.2,1.6,.4,1)`.
  - Focus-visible: 2px accent outline, offset 2px, radius 4px.
- **Tick**: `flex: 0 1 44px`, min-width 14px, height 44px, flex column centred, gap 9px, colour #66625c, left aligned. It transitions `flex-basis .8s cubic-bezier(.2,1.25,.3,1)` and `color .3s`.
  - The current tick (`aria-current="true"`) is `flex: 0 0 190px` in #151413.
  - On hover the colour becomes #151413 and the bar gets `scaleY(1.5)` (`.5s var(--rw-ease)`).
  - **Bar**: 2px tall, full width, overflow hidden, background `color-mix(in srgb, #151413 14%, transparent)`. Its `::after` fill is #151413 at `scaleX(0)` with origin left, transitioning transform `1s var(--rw-ease)`, opacity `.4s` and background `.4s`.
  - Past ticks (`.is-past`): fill `scaleX(1)` at opacity .35. The current tick: fill `scaleX(1)` in the accent colour at opacity 1 (overridden by autoplay, section 8.5).
  - **Label**: 10px, letter-spacing .12em, nowrap, ellipsis, tabular numbers. `.rw__tick-name` is hidden except on the current tick. There it shows inline and animates `rw-name-in 1.1s var(--rw-ease) .1s backwards`, which goes from opacity 0 and letter-spacing .34em to normal.

### 5.5 Panel ("In this look")

- **Head** `.rw__panel-head`: flex, space-between, baseline, gap 12px, padding `44px 32px 18px`. It contains `<h3 class="rw__panel-title">In this look</h3>` and `<span class="rw__label" data-rw-pieces>`.
  - The title is heading family, 400, 18px, line-height 1.1.
  - The script fills the label from the active look's `<template data-rw-pieces-text>3 pieces</template>`, so it shows "3 pieces". `.rw__label` is 10px, letter-spacing .16em, uppercase, #66625c, nowrap. On each change it replays `rw-fade .8s var(--rw-ease)` (opacity 0, translateY 6px → normal).
- **Look panels**: six `<div class="rw__look-panel" data-rw-panel="i">`. Only the active one is visible; the others have `hidden`. The first starts with class `is-in`. Each is a flex column, `flex: 1 1 auto`, `min-height: 0`, and contains:
  1. `.rw__mhead`, the phone-only header: `<span class="rw__mhead-title">Look name</span><span class="rw__label">3 pieces</span>`. It is hidden on desktop.
  2. `<ul class="rw__items" role="list">`: no list style, padding `6px 32px 20px`, flex column, `overflow-y: auto`, `flex: 1 1 auto`, `min-height: 0`, `overscroll-behavior: contain`, thin scrollbar.
  3. `.rw__bundle.has-rule`, the bundle footer (section 10.4).
  4. `<template data-rw-pieces-text>3 pieces</template>`.
- **Product row** `<li class="rw__item" data-rw-card="n" style="--i:n" data-title="Product">`:
  - It is relative, a grid with columns `var(--rw-thumb) minmax(0,1fr) 44px` (92px | text | 44px), column-gap 18px, centred, padding `18px 0`.
  - List mode with dividers: `border-top: 1px solid #c8c8c8`; the last row also gets `border-bottom`.
  - `::after` is a 1px accent underline at the bottom (bottom −1px, left/right 0) at `scaleX(0)` with origin left, transitioning `.9s var(--rw-ease)`. It reaches `scaleX(1)` on `.is-hot` and on hover (hover-capable devices).
  - **Children**, in order:
    - Optional tag `<span class="rw__tag"><span class="rw__tag-text">New</span></span>`.
    - `<a class="rw__media" href=<product url> target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">` containing the thumbnail `<img>` and `<span class="rw__num">n</span>`.
    - `.rw__info`, a flex column with gap 5px:
      - `<span class="rw__type">`: the vendor line, 10px, .14em, uppercase, muted, ellipsis.
      - `<a class="rw__name" href=… target="_blank" rel="noopener noreferrer">`: 13px, weight 500, line-height 1.3, `align-self: flex-start`. It has an animated underline: `background: linear-gradient(currentColor,currentColor) 0 100% / 0 1px no-repeat`, which grows to `100% 1px` on hover over `.7s var(--rw-ease)`.
      - `<span class="rw__price"><span>$149.00</span></span>`: 12px, flex, gap 8px.
    - The add button.
    - The picker.
  - **Media**: block, `aspect-ratio: 4/5`, radius 0, overflow hidden, background `color-mix(in srgb, #151413 5%, #fff)`. The image fills it with `object-fit: cover` and `transition: transform 1.4s var(--rw-ease)`. On row hover the image scales to 1.07 (none on `hover:none` devices).
  - **Number badge** `.rw__num`: absolute, top 6px, right 6px, 20×20, circular, `rgb(255 255 255/.9)`, #151413, 10px, weight 600. Background and colour transition `.3s`; transform transitions `.45s cubic-bezier(.2,1.6,.4,1)`. When the row is hot or hovered it turns accent (#0e0e0e) with white text and `scale(1.12)`.
  - **Tag** `.rw__tag`:
    - Absolute at `top: calc(18px − 7px) = 11px` and `left: calc(0px + 8px) = 8px`, z-index 2, flex column, `transform-origin: 10px 0`, no pointer events.
    - `::before` is a 1px × 11px string line with `margin-left: 10px`, coloured `color-mix(#151413 50%, transparent)`.
    - The text sits on a #151413 background with white (panel) text: 9px, weight 600, .14em, uppercase, padding `4px 6px`, radius 2px.
    - On row hover it swings with `rw-swing 1.4s cubic-bezier(.3,.7,.4,1)`, rotating −16° → 11° → −7° → 4° → −2° → 0 at 0/25/45/65/82/100%.
  - **Add button** `<button class="rw__add" data-rw-add aria-expanded="false" aria-controls="Picker-…" aria-label="Add to bag: Product" data-added-label="Added to bag: Product">`:
    - 44×44, grid, no border or background, `align-self: end`. It holds three stacked SVGs (`grid-area: 1/1`):
      - plus: 20×20, stroke 1.3, path `M12 4v16M4 12h16`.
      - check: 20×20, stroke 1.5, path `M4.5 12.5l5 5L19.5 7`.
      - spinner: 18×18, stroke 1.5, path `M12 3a9 9 0 1 1-9 9`.
    - Check and spinner start at opacity 0. The SVGs transition transform `.55s cubic-bezier(.2,1.6,.4,1)` and opacity `.2s`.
    - `::before` is a hover ring: inset 4px, radius `var(--rw-add-radius)` = 20px, 1px currentColor border, opacity 0 at `scale(.55)`, going to opacity .22 at `scale(1)` (`.7s var(--rw-ease)`).
    - States are in section 10.1.

---

## 6. Data

### 6.1 Looks

| # | index | look name | model image | pieces (row order) | pieces label | bundle |
|---|---|---|---|---|---|---|
| 01 | 0 | The City Edit | model-1 / original-look-1 | Air Jordan 12 Retro · Tshirt · Sweatshirt | 3 pieces | ~~$547.00~~ **$492.30** |
| 02 | 1 | Gallery Opening | model-5 / original-look-5 | Tatum 5 Orbit · Hoodie Black (tag "New") · Tshirt | 3 pieces | ~~$547.00~~ **$492.30** |
| 03 | 2 | Gallery Opening | model-4 / original-look-4 | Sweatshirt Plus · Tatum 5 Orbit (tag "New") · Tshirt | 3 pieces | ~~$547.00~~ **$492.30** |
| 04 | 3 | Studio Day | model-6 / original-look-6 | Hoodie Black · Air Jordan 12 Retro · Tshirt | 3 pieces | ~~$547.00~~ **$492.30** |
| 05 | 4 | Studio Day | model-3 / original-look-3 | Sweatshirt · Tatum 5 Orbit · Tshirt | 3 pieces | ~~$547.00~~ **$492.30** |
| 06 | 5 | Studio Day | model-2 / original-look-2 | Hoodie · Luka 5 · Tshirt | 3 pieces | ~~$547.00~~ **$492.30** |

Catalog look descriptions (in the JSON, not displayed):
1. "A charcoal knit and easy denim."
2. "A clean white tee and relaxed denim."
3. "Olive knitwear. A grounded palette."
4. "Black, white and laid-back denim."
5. "Burgundy layers. A tailored perspective."
6. "A grey crew and your favourite denim."

The catalog `source` is `https://nike-makknzjs.myshopify.com/pages/runway`.

### 6.2 Pins per look (hero/popup, `left` / `top` as % of the figure box)

| look | pin 1 | pin 2 | pin 3 |
|---|---|---|---|
| 1 The City Edit | "Air Jordan 12 Retro" 47% / 27% | "Tshirt" 48% / 58% | "Sweatshirt" 45% / 96% |
| 2 Gallery Opening | "Tatum 5 Orbit" 50% / 28% | "Hoodie Black" 48% / 58% | "Tshirt" 45% / 88% |
| 3 Gallery Opening | "Sweatshirt Plus" 50% / 28% | "Tatum 5 Orbit" 48% / 58% | "Tshirt" 45% / 88% |
| 4 Studio Day | "Hoodie Black" 50% / 28% | "Air Jordan 12 Retro" 48% / 58% | "Tshirt" 45% / 88% |
| 5 Studio Day | "Sweatshirt" 50% / 28% | "Tatum 5 Orbit" 48% / 58% | "Tshirt" 45% / 88% |
| 6 Studio Day | "Hoodie" 50% / 28% | "Luka 5" 48% / 58% | "Tshirt" 45% / 88% |

Each pin's `data-tip` is the product name (the tooltip text), `aria-label` is "n: Name", and `--pi` = n (used for stagger). Pin n is linked to panel row `data-rw-card="n"` of the same look.

### 6.3 Products (8 unique; the same product can appear in several looks)

| catalog id | displayed name | vendor line (`.rw__type`) | price | option legend | values (in this order; first is pre-checked) | link |
|---|---|---|---|---|---|---|
| tatum-5-orbit-copy | Air Jordan 12 Retro | `Nikey \| Password: 1` | $149.00 | Shoe size | 40, 41, 42, 43, 44, 45, 46 | https://nike-makknzjs.myshopify.com/products/tatum-5-orbit-copy |
| tshirt | Tshirt | `Nike` | $199.00 | Size | S, L, M, XL | https://nike-makknzjs.myshopify.com/products/tshirt |
| sweatshirt | Sweatshirt | `Nike` | $199.00 | Size | S, L, M, XL | https://nike-makknzjs.myshopify.com/products/sweatshirt |
| tatum-5-orbit | Tatum 5 Orbit | `Nikey \| Password: 1` | $149.00 | Shoe size | 40–46 | https://nike-makknzjs.myshopify.com/products/tatum-5-orbit |
| hoodie-black | Hoodie Black | `Nike` | $199.00 | Size | S, L, M, XL | https://nike-makknzjs.myshopify.com/products/hoodie-black |
| sweatshirt-plus | Sweatshirt Plus | `Nike` | $199.00 | Size | S, L, M, XL | https://nike-makknzjs.myshopify.com/products/sweatshirt-plus |
| hoodie | Hoodie | `Nike` | $199.00 | Size | S, L, M, XL | https://nike-makknzjs.myshopify.com/products/hoodie |
| air-jordan-12-retro-copy | Luka 5 | `Nikey \| Password: 1` | $149.00 | Shoe size | 40–46 | https://nike-makknzjs.myshopify.com/products/air-jordan-12-retro-copy |

The vendor line is literally `Nikey | Password: 1` for the three shoes. Keep it verbatim. Apparel sizes are in the store's order S, L, M, XL, not S, M, L, XL. The catalog's `type` is "From the original lookbook" for every item (not displayed).

**Variant IDs.** Each `.rw__picker` holds a `<script type="application/json" data-rw-variants>` array of `{id, a:true, o:[value]}`. All variants are available. The IDs are listed in option order.

| product | variant ids |
|---|---|
| Air Jordan 12 Retro | 40: 57015167025457 · 41: 57015167058225 · 42: 57015167090993 · 43: 57015167123761 · 44: 57015167156529 · 45: 57015167189297 · 46: 57015167222065 |
| Tatum 5 Orbit | 40: 57015166730545 · 41: 57015166763313 · 42: 57015166796081 · 43: 57015166828849 · 44: 57015166861617 · 45: 57015166894385 · 46: 57015166927153 |
| Luka 5 | 40: 57015176364337 · 41: 57015176397105 · 42: 57015176429873 · 43: 57015176462641 · 44: 57015176495409 · 45: 57015176528177 · 46: 57015176560945 |
| Tshirt | S: 56835911582001 · L: 56835911614769 · M: 56835911647537 · XL: 56835911680305 |
| Sweatshirt | S: 56835806396721 · L: 56835806429489 · M: 56835806462257 · XL: 56835806495025 |
| Sweatshirt Plus | S: 56836143743281 · L: 56836143776049 · M: 56836143808817 · XL: 56836143841585 |
| Hoodie | S: 56836002185521 · L: 56836002218289 · M: 56836002251057 · XL: 56836002283825 |
| Hoodie Black | S: 56836251681073 · L: 56836251713841 · M: 56836251746609 · XL: 56836251779377 |

**Element ids.**
- Picker ids follow `Picker-template--28035983671601__the_runway_wdM8BG-look_<key>-<n>`.
- Radio names follow `Opt-template--28035983671601__the_runway_wdM8BG-look_<key>-<n>-1`.
- Look keys in order: `bndthK`, `XckgG6`, `rLfAhC`, `FKg67q`, `8KREEE`, `N3bfm9`.
- Radios carry `data-rw-option="0"`.

**Catalog JSON shape** (native-catalog.json): `{ source, looks: [{name, description, image, products:[ids]}], items: [{id, name, type, price (number), image, sizes, variants:[{id,a,o}], url}] }`. Items are listed in the order of the product table above.

### 6.4 Bundle maths

- Every look holds one shoe ($149) and two apparel pieces ($199 each): 149 + 199 + 199 = **$547.00**.
- The bundle note reads "Bundle all 3 and save 10%", so the bundle price is 547 × 0.9 = **$492.30**.
- These values are static in the markup, identical for all six looks:
  - `<s>$547.00</s>` and `<strong>$492.30</strong>`.
  - The phone CTA reads `Add full look — $492.30`, with an em dash.
- The discount is display-only. `data-bundle-code` is empty, and the bag sums each piece at its full catalog price.

---

## 7. Carousel math (desktop "ring", phone "classic")

### 7.1 Bodies and state

- n = 6 looks. Body count N = n × ceil(8 / n) = **12**. Bodies 0–5 are the originals; bodies 6–11 are deep clones of bodies 0–5, marked `data-rw-clone` with their images set to lazy loading. Body a shows look `a mod 6`.
- State values:
  - `index`: active look 0–5.
  - `target`: continuous position the ring is heading to; it can grow past 5 or go negative.
  - `cur`: current rendered position.
  - `vel`: velocity.
- Feel `balanced`: K = 95, C = 2√K ≈ 19.49 (critically damped, no overshoot), lag = 0.04 s.
- Entrance offset: `start` = 1.15, or 0 under reduced motion. At start `cur` = −1.15 while `target` = 0, so on first view the ring turns 1.15 steps (34.5°) into place. In classic mode every body starts 1.15 places further back and walks forward.

### 7.2 Frame and model height (computed in `measure()`)

- **Desktop**: `frameH = max(380, innerHeight − headerHeight)`. The header height is the summed height of visible `.shopify-section-group-header-group` / `#shopify-section-header` / `#shopify-section-announcement-bar` elements that do not contain the section, which here is 88px. The result is written to `--rw-frame-h`.
- **Phone**: `frameH = vh × clamp(109, 50, 120) / 100 = 1.09 × vh`. Here vh is the stored innerHeight. It is only re-latched when the width changes or the height changes by 160px or more, which ignores URL-bar resizes.
- Stage rect gives W and H.
- `fs` = 1.08 in ring mode (the active model stands 8% taller) and 1 otherwise. It is written to `--rw-fs`.
- Model height:
  - ring: `modelH = max(200, round((H − 34 − 18) / 1.08))`.
  - classic: `max(200, round(H − 24 − 18))` on phone (36 instead of 24 on desktop).
  - The result is written to the stage as `--rw-model-h`.
- The hero anchor `--rw-hx` / `--rw-hy` is written on the stage:
  - ring: `hx = 0.5W`, `hy = 34px`.
  - classic phone: `hx = 0.3W`, `hy = 22px`.
  - `--rw-ax` on the section = hx / W in %.
- Each body's width `s.w` = offsetWidth, which is roughly modelH × 0.5625.

### 7.3 Placement primitive `put(s, x, bottom, scale, opacity, blur, z)`

- If `x + w·scale/2 < −4` or `x − w·scale/2 > W + 4`, opacity is forced to 0 (off-screen cull).
- `transform: translate3d(x px, −bottom px, 0) translateX(−50%) scale(scale)`, with origin 50% 100% from CSS.
- `opacity` gets 3 decimals and `z-index` gets z. `visibility` is hidden when opacity < 0.01. `pointer-events` is none when opacity < 0.5.
- `filter: blur(b px)` with b rounded to 0.1, written only when it changes, and removed when b ≤ 0.05.

### 7.4 Ring mode (desktop ≥750px, `data-style="ring"`)

Constants: cx = 0.5W, R = 0.62W (0.72W if mobile), P = 1.65W (1.9W if mobile), floor = H − 34, horizon = 0.36H, unit = max(120, 0.3W) (90 minimum on mobile), step = 2π/12 = 30°.

For each body a:
- φ = ((a − cur) · step) mod 2π, wrapped into (−π, π]
- z = R · (1 − cos φ)  (depth)
- persp = P / (P + z)
- sl = |φ| / step  (slots from the front)
- scale = persp · (1 + (fs − 1) · clamp(1 − sl, 0, 1))
- x = cx + R · sin φ · persp
- feet = horizon + (floor − horizon) · persp, so bottom = H − feet
- blur = sl ≤ 1 ? 1.8·sl : min(1.8 + (sl − 1)·2, 6.5)
- opacity = clamp((cos φ + 0.55) / 0.3, 0, 1)
- At rest (`still`) and sl < 0.02, opacity = 0, because the identical hero takes the front place.
- z-index = round(scale · 1000)

Resulting slots on desktop (mirror x around 0.5W for negative slots):

| slot | scale | x | blur | opacity | z |
|---|---|---|---|---|---|
| 0 (front) | 1.080 | 0.500W | 0 | 1 (0 at rest; hero shown instead) | 1080 |
| ±1 | 0.952 | 0.795W / 0.205W | 1.8px | 1 | 952 |
| ±2 | 0.842 | 0.952W / 0.048W | 3.8px | 1 | 842 |
| ±3 | 0.727 | 0.951W / 0.049W | 5.8px | 1 | 727 |
| ±4 | 0.640 | 0.843W / 0.157W | 6.5px | 0.167 | 640 |
| ±5, 6 | 0.588, 0.571 | – | 6.5px | 0 | – |

The back of the ring shrinks toward the horizon line at 36% of the stage height, so the outer figures stand higher and smaller, giving a turning carousel of 7–9 visible figures. Larger z draws in front.

Spring (ring): each animation frame, dt = min(0.034, Δt/1000) (1/60 on the first frame), split into 3 sub-steps. In each sub-step, `acc = −K(cur − target) − C·vel; vel += acc·h; cur += vel·h`. The ring has settled when |cur − target| ≤ 0.0005 and |vel| ≤ 0.0005; it then snaps to the target. Every frame calls `renderAll()`.

### 7.5 Classic mode (phones ≤749px, `data-mstyle="classic"`)

- Constants (phone): ax = 0.3, ay = 22, sx = 0.32, sy = 22, sr = 0.76, ex = 0.55, d = 4. unit = max(90, W · 0.32 · 1.6).
- Desktop classic values exist but are unused here: ax .4, ay 36, sx .125, sy 58, sr .76, ex .38, d 5.
- Each body has its own spring. `goal = wrapN(a − target)`, which is the place in line from 0 to 11.
  - A "trip" starts when the goal jumps by more than N/2 (the body wraps from front to back or back to front). At that moment `from = x`.
  - Follow target g eases toward goal with `g += (goal − g)·(1 − e^(−dt/τ))`. τ is 0.016 while dragging, 0.1 on a trip, and otherwise 0.03 + 0.04·min(goal, 4). That gives the staggered walk: bodies further back follow later.
  - x then springs to g with K = 95 and C = 19.49 (3 sub-steps). A body settles at 0.0006 tolerance; a trip ends when |x − goal| < 0.02.
- Place k = x (e = −1), except:
  - Trip forward (goal > from), with u = |x − from| / |goal − from|:
    - u < 0.5: exit e = 2u · 1.4.
    - otherwise: k = goal + 2(1 − u), re-entering from two places further back.
  - Trip backward:
    - u < 0.5: k = from + 2u.
    - otherwise: e = 2(1 − u) · 1.4, entering from the camera side.
  - Not on a trip but k < 0: e = min(−k, 1.4).
- Exit pose (e ≥ 0): x = W(ax − ex·e), bottom = ay − 22e, scale = 1 + 0.14e, opacity = max(0, 1 − 1.05e), blur = 4·min(e, 1), z = 1100. The model walks out past the camera to the left, growing.
- Line pose: x = W(ax + sx·k), bottom = ay + sy·k, scale = sr^k.
  - Opacity = 1 − 0.13k for k ≤ d − 1 = 3; otherwise max(0, 0.61 · (4 − k)).
  - Blur = min(0.9k, 3.2).
  - z = 1000 − round(10k).
  - At rest, k ≈ 0 has opacity 0 because the hero shows instead.
- Phone slots: k = 0 at 0.30W (scale 1); k = 1 at 0.62W, bottom 44px, scale .76, opacity .87, blur .9px; k = 2 at 0.94W, bottom 66px, scale .578, opacity .74, blur 1.8px; k ≥ 3 is culled off-screen.

### 7.6 Hero ↔ body hand-off (ring and classic are not "morph" modes)

- Only cinema and scroll modes morph. In ring and classic, `.rw__morph` has no transition, filter or transform.
- The active hero (`.is-on`) is hidden while anything is moving. It shows (opacity 1, visible) only when the section has `rw--still`, at the same moment the matching front body drops to opacity 0. The hero sits at `left: hx; bottom: hy; scale(fs)`, exactly over the front body, so the swap is invisible.
- `setStill(false)` runs on every moving frame. When the loop settles, `setStill(true)` applies and the frame re-renders.
- For reference, the morph-mode CSS is kept:
  - `.rw__morph` starts at opacity 0, visibility hidden, `filter: blur(16px) brightness(1.25)`, `transform: scale(.96,.97)`.
  - Transitions: opacity `calc(900ms·.9) cubic-bezier(.4,0,.2,1)`, filter `900ms`, transform `calc(900ms·1.2) cubic-bezier(.19,1,.22,1)`, visibility `0s linear 900ms`.
  - `.was` uses `scale(1.04,1.03)`.
  - `.is-on` returns to normal with a delay of `900ms·.18` on each property.

### 7.7 Light sweep

Every non-silent look change (when motion is allowed) replays class `is-sweep` on the stage. `.rw__sweep::before` is a band:
- top −20%, bottom −20%, width 42%.
- Background `linear-gradient(100deg, transparent, rgb(255 255 255/.25) 42%, rgb(255 255 255/.55) 50%, rgb(255 255 255/.25) 58%, transparent)`.
- Rest position `translateX(−130%) skewX(−12deg)`, opacity 0.
- Animation `rw-sweep 1.5s var(--rw-ease-silk)`: at 0% it is at −130% with opacity 0, at 18% opacity 1, and at 100% it is at `translateX(330%)` with opacity 0.
- It blends with `soft-light` above the models.

### 7.8 Render loop

`requestAnimationFrame` runs only while the section is visible (IntersectionObserver, threshold 0) and the document is not hidden. It stops when everything has settled and nothing is being dragged. `kick()` restarts it on visibility, resize, index change and drag.

---

## 8. Autoplay, timing and lifecycle

### 8.1 Measure and resize

- `measure()` runs on init. It runs again on window resize (debounced 120ms) and from a ResizeObserver on the stage.
- At the 749/750px boundary it switches mode (ring ↔ classic). It also re-docks any open mobile sheet into its card when going back to desktop.

### 8.2 Intro reveal

- The script adds `rw--js`. That hides the title, sub and panel head (opacity 0, translateY(22px), blur(8px); the title also gets letter-spacing .03em), and also the stage, controls and panel (opacity 0).
- A second IntersectionObserver (threshold 0, rootMargin `0px 0px -22% 0px`) waits for the section to be visible. Two nested rAFs later it adds `is-revealed`. The transitions then are:
  - title / sub / panel head: opacity 1.1s, transform 1.4s, filter 1.1s and letter-spacing 1.8s, all `var(--rw-ease)`. The title's letter-spacing goes from .03em to −.02em. Delays: title .12s, sub .26s, panel head .34s.
  - stage: opacity 1.6s with delay .1s.
  - panel: opacity 1.2s with delay .25s.
  - controls: opacity 1.2s with delay .55s.
- At the same time the ring walks in from −1.15 steps.
- Under reduced motion `is-revealed` is added immediately and nothing transitions.

### 8.3 Index change `setIndex(i)`

- Updates `index` and kicks the loop.
- Accessibility of queue bodies: for each body, rank k is computed (ring rank is signed, in −6..6). Bodies with k ≠ 0 and |k| ≤ 2 (ring) or ≤ 3 (classic) get `tabIndex = 0` on their `.rw__hit`, aria-hidden false, and the body loses `aria-hidden`. Every other body is aria-hidden with `tabIndex = −1`.
- On a real change:
  - Closes the popup and, on phones, closes any size sheet.
  - Sets `--rw-progress = (i + 1)/6` (3 decimals) on the section.
  - Toggles heroes: `.is-on` on the new one, `.was` on the old one, aria-hidden, and the zoom button `tabIndex` 0 only on the active one.
  - Replays the sweep.
  - Writes the live region text (e.g. "Look 3: Gallery Opening").
  - Updates ticks: `aria-current`, and `.is-past` for j < i.
  - Shows the active panel (`hidden = false`), removes `is-in` from all panels, forces reflow, then adds `is-in` to the new one to replay the row entrance.
  - Sets the pieces label to "3 pieces" and replays `is-swap`.
  - Clears hot states and restarts the autoplay bar.
- The first call is silent: no sweep, no announcement, no entrance replay. The first panel already has `is-in` in the markup.

### 8.4 Navigation functions

- `next()` = `moveTo(round(target) + 1)`. `prev()` = `moveTo(round(target) − 1)`.
- `go(i)` takes the shortest way round the loop: d = (i − index) mod 6, and if d > 3 then d −= 6. It then calls `moveTo(round(target) + d)`.
- `moveTo(T)` sets `target = T`, calls `setStill(false)` and `setIndex(T mod 6)`. The ring loops forever in either direction.

### 8.5 Autoplay

- It starts on init when `data-autoplay="true"`, unless reduced motion or the Shopify editor is active. `play(true)` adds `is-playing` and sets `aria-pressed="true"` on the autoplay button, which then shows the pause icon.
- **Progress bar**: while playing, the current tick's fill is `scaleX(0)`. Restarting the bar removes `is-run` from every tick, forces reflow and adds `is-run` to the current tick. That tick's fill then runs `rw-fill 5s linear forwards` (`var(--rw-speed)`), going from scaleX 0 to 1. When it is not playing, the current fill is full and accent-coloured. Past ticks are full at .35 opacity, and future ticks are empty on a 14% track.
- **Timer**: `setTimeout(5000)`. When it fires, `next()` runs if `playing && visible && !dragging && !document.hidden && !panelHover && !zoomed && !engaged`. Otherwise the bar and timer simply restart. Every `setIndex` restarts the bar and timer, so a manual change gives the new look a full 5 s.
- **Panel hover** (mouse pointerenter on `.rw__panel`) sets `panelHover`. The look then holds, and the bar keeps restarting each cycle. Pointerleave clears it and restarts the bar.
- **Engage** (shopper working with products) sets `engaged = true` and calls `play(false)`, which stops autoplay for good. It fires on:
  - any click on a button, a, input, select or label inside the panel,
  - any `change` in the panel or the size sheet,
  - a pin click,
  - opening the popup.
- **Autoplay button**: if not playing, it first clears `engaged`, then toggles `play(!playing)`.
- On phones the controls are hidden, but autoplay still runs (classic is not scroll mode) and the walk line shows progress.

---

## 9. Interactions

### 9.1 Pointer drag / swipe (stage)

- **pointerdown**: primary mouse button or any touch. Records the start x/y, `t = target`, the pointer id and velocity samples (keeping the last 6 `{x, time}`).
- **pointermove**:
  - Becomes a drag once |dx| > 8 and |dx| > 1.2·|dy|. It then adds `is-dragging` to the section and captures the pointer.
  - If |dy| > 10 first, the gesture is abandoned, leaving vertical page scroll.
  - A mouse move with the button released ends the drag.
  - While dragging, `target = t − dx / unit` (ring and classic; cinema would add) and the loop is kicked. In ring mode, dragging left turns the ring toward the next look.
- **pointerup / pointercancel**:
  - Velocity vx = (last.x − first.x) / (last.time − first.time) in px/ms. sign = −1. from = round(t).
  - **Phones**: one swipe moves one look. If |dx| > 30 or |vx| > 0.3, `moveTo(from + sign · (dx>0 ? 1 : −1))`, so a swipe right goes to the previous look and a swipe left to the next. Otherwise `moveTo(from)`.
  - **Desktop** momentum: i = round(target + sign·vx·160 / unit). If i == from and |vx| > 0.3, step one look in the fling direction. Then clamp i to from ± 2 and `moveTo(i)`.
  - Clicks are suppressed for 60ms after a drag (capture-phase click handler).

### 9.2 Trackpad, keyboard and clicks

- **Trackpad horizontal wheel** (|deltaX| > |deltaY|): `preventDefault`, accumulate deltaX. When |acc| > 45, positive acc (fingers moving left) calls `next()` and negative calls `prev()` (inverted only in cinema). Then reset acc and lock for 520ms.
- **Keyboard**:
  - On the focused stage, ArrowRight calls `next()` and ArrowLeft calls `prev()` (preventDefault).
  - Escape anywhere in the section closes an open phone size sheet first and returns focus to its plus button. Otherwise it closes the popup.
- **Clicks** (delegated on the section, in this priority order):
  1. pick-close
  2. popup close button
  3. click on the popup backdrop or popup stage (beside the model) closes the popup
  4. `[data-rw-zoom]` opens the popup
  5. next
  6. prev
  7. tick: `go(i)`
  8. autoplay toggle
  9. pin: engage, then `hot(n, scroll=true)`
  10. queue body `[data-rw-go]`: if its rank k ≠ 0 and |k| < 6, `moveTo(round(target) + k)` brings that model to the front. If k = 0 it opens the popup.
  11. size confirm
  12. plus button
  13. "add full look"
- Ticks, arrows and the autoplay toggle are real buttons with focus-visible outlines.

### 9.3 Custom cursor (desktop with `(hover: hover) and (pointer: fine)` only; otherwise the element is removed)

- The section gets `rw--cursor`, which sets `cursor: none` on the stage and everything in it.
- `.rw__cursor` is an absolute 0×0 point at the stage's top-left, z-index 1700, no pointer events, moved by `translate3d(x, y, 0)`.
- **Inertia**: on every mouse pointermove the target is the pointer position relative to the stage. A rAF loop lerps `x += (tx − x)·0.18` (1 under reduced motion) until the remaining distance is under 0.2px. On first entry it jumps straight to the pointer and adds `is-on`.
- **Ring** `.rw__cursor-in`:
  - Absolute at −42/−42, 84×84, circular, grid-centred, colour #151413.
  - Border `1px solid color-mix(#151413 28%, transparent)`, background `color-mix(#fff 40%, transparent)`, `backdrop-filter: blur(6px)`.
  - Hidden state: opacity 0, `scale(.3)`. Transitions: transform `.6s var(--rw-ease)`, and opacity, background, border-color and colour `.35s`.
- **Labels**: "Drag" and "View" are stacked in one grid cell. They are 10px, letter-spacing .24em with padding-left .24em to optically centre, uppercase, nowrap. Opacity transitions `.25s` and letter-spacing `.7s var(--rw-ease)`.
- **States**:
  - `is-on`: opacity 1, scale 1. It shows "Drag" by default.
  - `is-view`: shows "View" when hovering the front hero's `.rw__zoom` and not dragging.
  - `is-link`: over a pin or a queue body's `.rw__hit`, not dragging. The ring shrinks to `scale(.2)` and fills with the accent, with a transparent border and hidden labels, leaving a small black dot.
  - Dragging: `scale(.74)`, accent fill and border, white text, letter-spacing .42em, so "DRAG" spreads out.
- Pointerleave on the stage removes `is-on`, `is-link` and `is-view`.

### 9.4 Pins and hot linking

- **Pin dot halos**:
  - `::after`: inset −5px, circular, `1px solid rgb(255 255 255/.8)`, running `rw-ring 2.6s cubic-bezier(.2,.6,.3,1) infinite` (scale .8 at opacity .9 → scale 1.7 at opacity 0).
  - `::before`: the same with border alpha .55 and a 1.3s delay, giving a double ripple.
- **Dot hover or `.is-hot`**: `scale(1.3)`, background #0e0e0e, white number. Halo shadow `0 0 0 6px color-mix(#0e0e0e 22%, transparent), 0 8px 20px -6px rgb(0 0 0/.45)`. Transitions: transform `.5s cubic-bezier(.2,1.6,.4,1)`, background and colour `.25s`. On `:focus-visible` the dot gets `box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0e0e0e`.
- **Tooltip** (`.rw__pin::after`, content `attr(data-tip)`):
  - Placed at `left: calc(100% − 6px)`, `top: 50%`, max-width 200px (150px on phones), ellipsis, padding `7px 12px`, radius 999px.
  - Background `rgb(255 255 255/.88)` with `backdrop-filter: blur(10px)`, #151413 text at 11px, weight 500, letter-spacing .04em, line-height 1, shadow `0 10px 26px -12px rgb(0 0 0/.4)`.
  - Hidden state: opacity 0, `translate(−8px, −50%) scale(.96)` with origin left. Transitions: opacity `.35s`, transform `.6s var(--rw-ease)`.
  - It is shown (opacity 1, `translate(0, −50%)`) on `.is-hot`, on `:focus-visible`, and on hover where `(hover: hover)` applies.
- **Hot linking**:
  - `hot(n)` clears all `.is-hot`, then adds `.is-hot` to pin n (in the popup if it is open, otherwise in the front hero) and to row `data-rw-card=n` of the active panel.
  - Hovering a panel row with a mouse calls `hot(n)` without scrolling. Pointerout that leaves the card clears it.
  - Clicking a pin calls `hot(n, true)`, which reveals the row:
    - If the list scrolls horizontally (phone), it smooth-scrolls to `card.left − list.left − 20`.
    - Else if it scrolls vertically, it scrolls to `card.offsetTop − list.offsetTop − 12`.
    - Else, if the card is outside the window (top < 0 or bottom > innerHeight − 140), it scrolls the window by `card.top − 0.3·innerHeight`.
    - Smooth, or instant under reduced motion.

---

## 10. Panel & bag

### 10.1 Plus button and single-piece add

- No product has a direct `data-variant-id`, so the plus always toggles the size picker.
- **Opening**:
  - Opens the picker and focuses the checked radio (without scrolling). On desktop it also reveals the card.
  - The row gets `.is-picking`: the plus rotates 45° (becoming ×) and the hover ring shows (opacity .22).
  - `aria-expanded` becomes `true`.
  - Pressing the plus again closes it.
  - Opening one picker does not close others on desktop. On phones only one sheet is open at a time.
- **Confirm** ("Add to bag") adds the selected variant: `{id, quantity: 1}` via the bag.
- **States while adding**:
  - `.is-loading`: plus hidden; spinner shown and spinning (`rw-spin .8s linear infinite`). A shimmer runs over the thumbnail: `linear-gradient(100deg, transparent 30%, rgb(255 255 255/.5) 50%, transparent 70%)`, translated −100% → 100% over 1.1s, infinitely.
  - On success the row gets `.is-added`:
    - The check shows in the accent colour, popping with `rw-pop .6s cubic-bezier(.2,1.6,.4,1)` (scale .4 → 1.25 → 1).
    - Its path draws in: stroke-dasharray 24, offset 24 → 0, `.7s var(--rw-ease)` with a .1s delay.
    - A burst ring (`::after`, inset 4px, 1px accent border) runs `rw-burst 1s var(--rw-ease) forwards` (scale .55 at opacity .9 → scale 1.7 at opacity 0). The hover ring hides.
    - The picker closes and re-docks.
    - The button's aria-label becomes "Added to bag: Product" and `aria-expanded` is removed.
    - Phones vibrate for 12ms when supported and motion is allowed.
    - An added row cannot be added again.
  - On error: `.is-loading` is removed and the message line shows the error text.

### 10.2 Inline picker (desktop)

- `.rw__picker[data-rw-picker][hidden]` spans the full row (`grid-column: 1 / -1`), as a flex column with gap 14px and padding-top 16px.
- When it opens: `rw-drop .7s var(--rw-ease)` (opacity 0, translateY(−8px) → normal). The fieldset and confirm button run `rw-rise .8s var(--rw-ease)` (opacity 0, translateY 14px → normal), with the confirm delayed .16s.
- `.rw__picker-head` (thumbnail, title, price, close) is hidden on desktop.
- **Fieldset** `.rw__opt`: no border, padding or margin. Legend `.rw__opt-name` is "Shoe size" or "Size", 11px, #151413, margin-bottom 8px.
- **Values** are flex-wrapped with gap 8px. Each pill is `<label class="rw__pill"><input type="radio" …><span class="rw__pill-label">42</span></label>`. The radio is invisible and covers the label.
  - Pill label: inline-flex centred, min-width 44px, min-height 40px, padding `0 14px`, radius 30px, `1px solid #c8c8c8`, transparent background, #151413 text at 11px.
  - Transitions: background, colour and border `.3s`; transform `.45s var(--rw-ease-spring)`; box-shadow `.45s`.
  - Hover: border #151413. Checked: background #151413, white text, border #151413. Active: `scale(.94)`. Focus-visible: 2px accent outline, offset 2px.
  - Unavailable values get `.is-unavailable`: muted text and a 1px diagonal strike drawn with a linear-gradient. With the current data none are unavailable.
- **Confirm** `<button class="rw__confirm" data-rw-confirm>` contains `<span data-rw-confirm-label data-add="Add to bag">Add to bag</span>` and a hidden `<span class="rw__sr"> — Product</span>`.
  - Min-height 46px, no border, radius 0, background #151413, white, 11px, weight 500, letter-spacing .02em, flex centred, gap 10px, relative, overflow hidden.
  - Hover: `translateY(−1px)` (`.4s cubic-bezier(.2,1.5,.4,1)`), plus a shine sweep. The `::before` band is 60% wide, `linear-gradient(100deg, transparent, rgb(255 255 255/.26) 50%, transparent)`, moving from `translateX(−140%) skewX(−18deg)` to `translateX(260%) skewX(−18deg)` over 1.1s `var(--rw-ease)`.
  - Disabled (no available match): opacity .45 and the label "Sold out".
- **Option change**:
  - Recomputes the selected values and finds the matching variant.
  - Toggles `is-unavailable` per value: a value is available if some available variant has it and matches the other current selections.
  - Enables or disables confirm.
  - Stores `card.dataset.selected = variantId`. Any non-initial change also sets `card.dataset.touched = "1"`.
  - Clicking confirm also marks the card touched.

### 10.3 Bag (localStorage "styling bag")

- **Storage**: key `runway-styling-bag-v3`. Entries are `[{id, quantity}]`; on load they are filtered to safe integers with quantity between 1 and 20, and capped at 50 entries. Every storage access is wrapped in try/catch.
- **Catalog**: loaded once from the catalog JSON and validated. Every item needs a string id and name, a finite price ≥ 0, and variants with safe-integer id, boolean `a` and string-array `o`. A failed load throws "The product list could not load."; a failed validation throws "The product list is unavailable."
- **Adding**: `add(items)` takes a list of `{id, quantity: 1}`. Each id must match an available variant, or it throws "Please choose an available size." An existing entry's quantity increments (max 20); otherwise a new entry is pushed. Then it saves, re-renders and shows a toast:
  - one item: "Piece saved to your styling bag".
  - several: "Look saved to your styling bag".
- **Counter**: every `[data-cart-count]` shows the sum of quantities. It starts at 0.
- **Toast** `#bag-status`: fixed, bottom 24px, centred with `translateX(−50%)`, background #151413, white, padding `12px 20px`, 12px, z-index 2147483002, opacity 0 with a `.25s` transition, no pointer events. `.is-on` sets opacity 1 for 2.5 s; each new toast restarts the timer.
- **Dialog** `<dialog id="bag-dialog">`, opened by the header bag button with `showModal()` after a render:
  - Border `1px solid #d9d9d9`, white, #151413, padding 24px, width `min(560px, 100vw − 32px)`, max-height 85dvh, scrolls. Backdrop `#0005` with `backdrop-filter: blur(4px)`.
  - Head `.bag-heading`: flex, space-between, gap 20px. It holds `<h2>Your styling bag</h2>` (25px, weight 400, margin 0) and `<button id="close-bag" aria-label="Close styling bag">×</button>` (28px, 44×44, no background).
  - `<p class="bag-note">A local outfit shortlist. No payment or order is collected here. Open a piece on the original demo to continue.</p>` at 12px, #666, line-height 1.5.
  - `#bag-items`:
    - Empty: `<p class="bag-note">Your styling bag is empty. Choose a size beside a piece to save it.</p>`.
    - Otherwise one `.bag-row` per entry: grid `60px 1fr auto`, gap 18px, centred, padding `18px 0`, `border-bottom: 1px solid #ddd`.
    - Row image: 60×80, `object-fit: contain`, using the catalog image URL (absolute) with alt = product name.
    - Row details: `<h3>` with the name (14px, weight 400, margin `0 0 8px`), then `<p>Size 42 · Quantity 1 · $149.00</p>` (12px; the money format is en-US USD), then the link `View original piece ↗` (12px, underline, offset 3px, new tab).
    - The link URL must have hostname `nike-makknzjs.myshopify.com`, or the render throws.
    - Remove button: `×` (20px, padding 12px, aria-label "Remove Name"). It deletes the entry, saves and re-renders.
  - `<p id="bag-total">`: right-aligned 15px, padding `12px 0`, reading "Reference subtotal $X" (sum of price × qty), or empty.
  - `<button id="export-bag">Download outfit shortlist</button>`: background #151413, white, no border, padding `16px 20px`, full width. It is disabled (opacity .4) when the bag is empty.
    - It downloads `runway-outfit-shortlist.txt` (text/plain; utf-8; the object URL is revoked after 1 s).
    - The text joins these parts with a blank line between each: `RUNWAY — STYLING SHORTLIST`, `Reference prices; no order or payment has been placed.`, an empty part, then one `Name · Size X · Quantity N` line plus the product URL per entry.
  - Clicking the backdrop (outside the dialog rect) closes it.

### 10.4 Bundle footer and "Add full look to bag"

- `.rw__bundle.has-rule`: padding `20px 32px 30px`, flex column, gap 16px, white, `border-top: 1px solid #c8c8c8`. It contains:
  - `<p class="rw__msg" data-rw-msg role="status" aria-live="polite">`: 11px, line-height 1.45, accent colour. It is hidden when empty and plays `rw-rise .6s` when filled.
  - `.rw__bundle-row`: flex, space-between, flex-end, gap 12px.
    - `.rw__bundle-copy` (column, gap 3px): `<span class="rw__bundle-title">Complete the look</span>` (13px, weight 500) and `<span class="rw__bundle-note">Bundle all 3 and save 10%</span>` (11px, muted).
    - `.rw__bundle-price` (flex, baseline, gap 10px, nowrap): `<s>$547.00</s>` (11px, muted) and `<strong>$492.30</strong>` (heading family, weight 400, 16px).
  - CTA `<button class="rw__cta" data-rw-all>` containing:
    - `<span class="rw__cta-add">Add full look to bag</span>`
    - `<span class="rw__cta-m">Add full look — $492.30</span>` (phone only)
    - `<span class="rw__cta-done">Full look in your bag</span>` (hidden until complete)
    - an arrow SVG: 22×12, viewBox 0 0 26 14, stroke 1.4, path `M1 7h24M19 1l6 6-6 6`
    - a spinner SVG: 16×16, stroke 1.8
- **CTA style**: relative, overflow hidden, min-height 56px, full width, no border, radius 0, background #151413, white, 13px, weight 500, letter-spacing .02em, flex centred, gap 12px.
  - Transitions: transform `.6s var(--rw-ease)`, background and colour `.45s`, box-shadow `.6s var(--rw-ease)`.
  - Hover: `translateY(−2px)`, shadow `0 18px 34px -22px color-mix(#151413 80%, transparent)`, the same shine sweep as confirm, and the arrow moves `translateX(4px)` (`.5s cubic-bezier(.2,1.6,.4,1)`).
  - Active: `scale(.985)`.
  - `.is-loading`: the arrow is replaced by the spinning spinner. Disabled: opacity .5.
- **Entrance** with each look's `is-in`: the bundle row runs `rw-rise 1s var(--rw-ease) backwards` with delay .38s, and the CTA the same with delay .46s.
- **Add full look logic**:
  - Ignored if the panel is complete or the CTA is loading.
  - The cards considered are the panel's cards that are not yet added (and not sold out).
  - Ready cards are those with a direct variant id, or with `touched` set and a selected variant. Sizes are never guessed, so the pre-checked default size does not count unless the shopper changed or confirmed it.
  - Ready items go to the bag in one call. During the call the CTA and those rows are `is-loading`; afterwards each ready row is marked added, and the CTA's loading state is removed.
  - Pending cards: their pickers open (all of them on desktop, only the first on phones), the panel scrolls the first into view, and the message line reads `Pick a size for: Air Jordan 12 Retro, Tshirt, Sweatshirt` (the `data-msg-choose` template with `[items]` replaced by the pending titles joined with ", ").
  - The message clears at the start of each attempt.
- **Completion**: once every card in the panel (at least 2) is added, the panel gets `is-complete`. The CTA turns accent (#0e0e0e) with white text and plays `rw-glow 1.8s var(--rw-ease)`, a box-shadow ring growing from 0 to 16px while fading from 55% accent to 0. The label switches to "Full look in your bag", entering with `rw-rise .7s`. The message clears. Further clicks do nothing.

### 10.5 Row entrance on each look change (`.is-in`)

- Each `.rw__item` runs `rw-item-in 1.1s var(--rw-ease) backwards` (opacity 0, translateY(26px), blur(8px) → normal) with delay `i·85ms + 140ms`, where i = 1, 2, 3.
- Its `.rw__media` curtains open with `rw-curtain 1.2s` (clip-path `inset(0 0 100% 0)` → `inset(0)`) with delay `i·85ms + 200ms`.
- The thumbnail runs `rw-media-in 1.8s` (from `scale(1.22)` with `saturate(.4) brightness(1.08)` → normal) with the same delay.

---

## 11. Popups

### 11.1 "View look" popup (lightbox)

- **Markup** (last child of `.rw__left`): `<div class="rw__lb" data-rw-lb data-word="Look" role="region" aria-label="View look" aria-hidden="true">` containing:
  - `<div class="rw__lb-stage" data-rw-lb-stage>`.
  - `.rw__lb-top` with `<p class="rw__lb-cap"><span class="rw__lb-kicker" data-rw-lb-kicker></span><span class="rw__lb-name" data-rw-lb-name></span></p>` and a close button `<button class="rw__lb-close" data-rw-zoom-close aria-label="Close">`. Its × SVG is 16×16, stroke 1.5, path `M5 5l14 14M19 5L5 19`.
  - `<p class="rw__lb-hint">Tap a dot to shop the piece</p>`.
- **Opened by** clicking the front hero (`.rw__zoom`, where the cursor reads "View") or the front body's hit area. Opening:
  - engages (stops autoplay) and clears hot states.
  - clones the front hero's shadow and figure into a new `.rw__lb-model` wrapper. The clone loses the zoom button; its pins get `tabIndex 0`, its images are eager and decoded, and it copies `--rw-foot`.
  - sets the kicker to `Look 0N` (data-word plus a zero-padded number) and the name to the look name.
  - adds `rw--zoom` to the section, sets aria-hidden false and focuses the close button.
- **Layout**:
  - `.rw__lb` is absolute, inset 0, z-index 40. When closed it has `visibility: hidden` (with a `.95s` delay) and no pointer events.
  - Its `::before` fills the column with the stage colour (white), fading in at `.45s` when opening and out at `.6s var(--rw-ease)` with a .15s delay when closing.
  - With `rw--zoom`, the runway actors, heroes, head and walk line fade to opacity 0 (`.35s`) and lose pointer events. They come back with `.7s var(--rw-ease)` after a .2s delay.
  - `.rw__lb-stage` is absolute, inset `88px 48px 48px`, flex, bottom-aligned, centred, `cursor: zoom-out`. The model is centred at its bottom.
  - Model height h = max(160, min(stageHeight, stageWidth / 0.5625)), written as `--rw-model-h` on the wrapper. Image `sizes` = round(h·0.5625)px.
  - `.rw__lb-model` is relative, `flex: 0 0 auto`, `cursor: default`, with `transition: transform .95s var(--rw-ease)`.
- **FLIP grow**:
  - a = runway figure rect, b = popup figure rect.
  - The wrapper's `transform-origin` is `0 100%`. It is set with no transition to `translate3d(a.left − b.left, a.bottom − b.bottom, 0) scale(a.height / b.height)`. After a forced reflow the transform is cleared, so the model grows from her runway spot into the popup over .95s.
  - **Closing** sets the same "at" transform again, so she shrinks back. It removes `rw--zoom`, sets aria-hidden true, empties the popup after 950ms, and returns focus to the stage if focus was inside.
  - Under reduced motion there is no FLIP.
- **Top bar** `.rw__lb-top`: absolute at the top, flex, space-between, gap 16px, padding `32px 32px 0 56px`. When hidden: opacity 0, translateY(−10px). It comes in with opacity `.8s` and transform `1s var(--rw-ease)` after a .35s delay.
  - Kicker: 10px, .2em, uppercase, muted, tabular numbers.
  - Name: heading family, 400, 17px (`--rw-chip`), line-height 1.1, ellipsis.
  - Close: 48×48, circular, `1px solid color-mix(#151413 22%, transparent)`, background `color-mix(#fff 55%, transparent)` with blur(8px). Transition `.6s var(--rw-ease)`. Hover: `rotate(90deg)` and border #151413. Focus-visible: accent outline, offset 3px.
- **Hint**: absolute, bottom 16px, centred, 10px, .2em, uppercase, muted, no pointer events. It fades in over 1s `var(--rw-ease)` after a 1.1s delay.
- **Pins in the popup**: forced visible. Each dot springs in with `rw-pin-in .9s var(--rw-ease-spring) backwards` (scale 0 at opacity 0 → scale 1 at opacity 1), delayed `pi·110ms + .6s`, giving .71s, .82s and .93s. Then the halos ripple. Hover, focus or click shows the glass tooltip. A click highlights and reveals the matching panel row.
- **Closed by**: the close button, a click on the popup background or stage beside the model, Escape, or any look change.

### 11.2 Size sheet (phones) — see section 12.

---

## 12. Mobile

### 12.1 Header (≤749px)

- Height 68px, padding `0 20px`, gap 18px.
- Logo 48×17.
- Nav gap 14px, font 11px, link padding `15px 0`. "Nike Orbit" and "Hand Rail Pro" (2nd and 3rd links) are hidden, leaving "Home" and "Runway".
- The bag button gets `margin-left: 8px`.

### 12.2 Section (≤749px)

- Token switch: title 24px, label 9px, chip 18px, panel heading 16px, product title 12px, thumb 62px, `--rw-panel-pad` 20px. The other sizes keep their values.
- Mode `classic` (section 7.5), frame height = 1.09 × viewport height.
- `.rw__grid` becomes a flex column (relative, overflow hidden).
- `.rw__left`: `flex: 1 1 auto`, z-index 1, `padding-bottom: 20px` (bar radius).
- **Head**: flex column stretched, gap 18px, padding `30px 20px 0`. Intro gap 10px. Title `font-size: min(24px, 11.5vw)`. The sub stays visible at 12px.
- **Controls row** hidden (`display:none`). Instead `.rw__walk` shows:
  - absolute, left 50%, bottom 8px, z-index 1600, width `min(140px, 38%)`, centred with `translateX(−50%)`.
  - `.rw__walk-line` is a 2px track at 14% text colour with an accent fill `scaleX(var(--rw-progress))`. Progress is 1/6, 2/6 … 6/6, transitioning `1.1s var(--rw-ease)`.
- **Docked panel**:
  - relative, z-index 2, `flex: 0 0 auto`, no max-height, overflow visible, `margin-top: −20px` (overlapping the stage), radius `20px 20px 0 0`, no left border.
  - `.rw__panel-inner` is static. The panel head ("In this look") is hidden.
  - `.rw__mhead` shows: flex, baseline, space-between, gap 12px, padding `12px 20px 6px`. Title: heading family, 400, 16px, line-height 1.15, ellipsis. Count: "3 pieces" label. It replays `rw-fade .8s` on each look.
- **Product rows** become a horizontal snap carousel:
  - `.rw__items`: row direction, `flex: 0 0 auto`, gap 0, padding `10px 20px 6px`, `overflow-x: auto`, `overflow-y: hidden`, `scroll-snap-type: x mandatory`, `scroll-padding-inline: 20px`, `overscroll-behavior-x: contain`, no scrollbar, touch scrolling.
  - Each `.rw__item`: `flex: 0 0 calc(100% − 64px)`, snap start, margin-right 16px (0 on the last), padding `6px 16px 6px 0`, column-gap 14px, no top or bottom borders. Every item except the last has `border-right: 1px solid #c8c8c8`.
  - The plus is vertically centred. A pressed thumbnail scales to 1.04.
  - "New" tag at left 6px, top −1px.
  - Entrance: `rw-card-in .9s var(--rw-ease) backwards` (opacity 0, translateY(10px) → normal), delayed `i·80ms + 100ms`. No curtain or media animation.
- **Bundle**:
  - padding `10px 20px calc(16px + env(safe-area-inset-bottom))`, gap 10px, no top rule.
  - The price row is hidden. The CTA shows `Add full look — $492.30`, with no arrow, at min-height 54px. When complete it shows "Full look in your bag".
  - CTA entrance: `rw-rise 1s` with a .3s delay.
- **Popup**:
  - `.rw__lb` stops at `bottom: 20px`, clear of the docked panel's rounded top.
  - Stage inset `72px 16px 40px`, top padding `16px 12px 0 20px`, close button 44×44, hint at bottom 12px, tooltips max 150px.

### 12.3 Size sheet (phones)

- On open, the picker moves out of the card into a host `<div class="rw-sheet-host">` appended to `<body>`, so theme transforms cannot trap the fixed position.
- The host contains a scrim `<button class="rw__pick-scrim" data-rw-pick-close tabindex="-1" aria-hidden="true">`.
- The host copies the section's computed values of `--rw-panel`, `--rw-text`, `--rw-muted`, `--rw-line`, `--rw-accent`, `--rw-on-accent`, `--rw-btn-bg`, `--rw-btn-fg`, `--rw-btn-radius`, `--rw-pill-radius`, `--rw-bar-r`, `--rw-thumb-radius`, `--rw-pt-size`, `--rw-price`, `--rw-opt`, `--rw-ease`, `--rw-ease-sheet` and `--rw-ease-spring`, plus its font-family and colour.
- The host handles its own clicks (same click router), option changes (which also engage) and Escape.
- **Scrim**: fixed, inset 0, z-index 2147483000, `rgb(12 10 8/.38)`. It goes from opacity 0 to 1 over `.5s var(--rw-ease)` while the host is `.is-open`. Tapping it closes the sheet.
- **Sheet** `.rw__picker`:
  - fixed to the bottom, full width, z-index 2147483001, max-height `min(82vh, 640px)`, scrolls with contained overscroll.
  - gap 18px, padding `14px 20px calc(20px + safe-area)`, white background, radius `20px 20px 0 0`, shadow `0 -24px 60px -24px rgb(0 0 0/.4)`.
  - It slides up with `rw-sheet-up .65s var(--rw-ease-sheet)` (translateY(100%) → 0).
  - `::before` is a grabber: 34×4, radius 2px, 16% text colour, centred.
- **Sheet head** (shown only here): grid `52px 1fr 44px`, gap 14px, padding-bottom 16px, `border-bottom: 1px solid #c8c8c8`.
  - Thumbnail: the 160px product image, cover.
  - Title: 12px, weight 500.
  - Price: 12px, muted.
  - Close: 44×44; on active it rotates 90° and scales to .9.
- Confirm min-height is 54px.
- Only one sheet is open at a time. The section gets `rw--picking` while one is open. Closing, adding, Escape or a look change docks the picker back into its card.
- If the viewport grows past 749px while a sheet is open, every picker re-docks inline.

### 12.4 Other breakpoints

- **750–1099px**: panel column `min(380px, 380px)`. Head padding `36px 32px 0`, stacked as a column aligned left. Controls padding `6px 22px 26px`. Current tick 130px wide.
- **≤374px**: head padding `22px 16px 0`. mhead, items and bundle side padding 16px (`scroll-padding-inline` 16px). Item width `calc(100% − 44px)`, column-gap 12px.
- **Landscape phones** (max-height 520px): head padding-top 14px, sub hidden, title `min(var(--rw-h), 36px)`, panel head padding 18px top and 10px bottom, controls padding-bottom 8px.
- **`(hover: none)`**: no thumbnail zoom on row hover.

---

## 13. Reduced motion (`prefers-reduced-motion: reduce`)

- **Script**:
  - The entrance offset is 0 and `is-revealed` is added at once.
  - Autoplay does not start.
  - The ring and line jump straight to their targets (no springs; classic bodies snap to their goals).
  - No sweep, no FLIP on the popup, no haptics.
  - The cursor follows the pointer exactly (lerp factor 1).
  - Scrolls into view are instant (`behavior: auto`).
- **CSS**:
  - The intro states are shown with no transition.
  - These animations are removed: the pin halos (`::after` and `::before`), pin pop-ins, tag swing, row, media, curtain and media-in entrances, picker drop and rise, bundle-row and CTA rise, CTA glow, tick-name in, label swap, burst, check draw, shimmer, message rise, the phone card and mhead entrances, the sheet slide-up and the popup pin springs.
  - These transitions are removed: tick, icon, icon SVG, CTA, cursor ring, name underline, row underline, popup model, popup backdrop, top bar, hint, actors, heroes, head, walk line and scrim.
  - `scroll-behavior: auto`. The toast has no transition.

---

## 14. Accessibility and miscellany

- The stage is a focusable carousel region with arrow keys. The polite live region announces each look.
- Ticks have `aria-current` and full "Look N: Name" labels.
- The autoplay button uses `aria-pressed`.
- Plus buttons use `aria-expanded` and `aria-controls` pointing at their picker id.
- Visually hidden text gives confirm buttons the product name.
- Thumbnail links are `aria-hidden` with `tabindex="-1"`; the product name link is the focusable one.
- Every bag message, error and "Pick a size" line is in a `role="status"` region.
- Shopify editor hooks (`Shopify.designMode` → `rw--design`, `shopify:block:select`) are harmless in the standalone and may be kept or omitted.
- **Feet detection**: each look's 640 image (`data-probe`) is drawn into a 48px-wide canvas. The script scans from the bottom for the last row with any pixel whose alpha is above 40, then sets `--rw-foot = clamp((h − 1 − lastRow)/h, 0, 0.4)` on the hero and on every body of that look. `.rw__art` shifts down by that fraction so the soles touch the floor line. Use `crossOrigin="anonymous"` and wrap it in try/catch so a tainted canvas silently keeps offset 0.
- **Disconnect**: cancel rAFs and timers, disconnect the observers, remove the window and document listeners, and dock and remove the sheet host.