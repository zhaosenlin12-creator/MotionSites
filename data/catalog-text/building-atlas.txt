# Plinth — "Shared Interiors": exact recreation brief

Build a single self-contained HTML page (one file, vanilla HTML/CSS/JS, no frameworks, no build step) for **Plinth**, a dark editorial atlas of invented buildings. The page has three stacked sections on the home view — (1) a hero with a huge two-line serif headline, a search field and a **drifting 3D ribbon of paper "book-cards"** sweeping from huge blurred cards at the bottom-left to tiny cards at the right; (2) a **bookshelf** of upright 3D book spines where one book is turned face-out; (3) a **footer** with a giant hatched outline wordmark. Clicking any sharp card (or any shelf book) launches a **3D flight**: the book flies to the centre while spinning one full turn, then zooms until its colour fills the screen, and a simple reading view fades in. Browser Back flies it back into place. Everything below is exact; follow it literally.

---

## 1. Assets

### 1.1 Images (all photos come from five 2×2 photo sheets; never crop files — crop with CSS)

Each sheet is a 2336×1744 (4:3) grayscale architectural photo grid with no gutters; each quarter is one photo. Use these exact URLs:

| Sheet | URL | TL (0) | TR (1) | BL (2) | BR (3) |
|---|---|---|---|---|---|
| 0 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192006_dd6f50c5-96f1-4366-a0b9-0e4a09cf5b0d.png&w=1600&q=85 | concrete house with deep arches | cantilevered tower | glass pavilion on reflecting pool | stepped concrete plaza |
| 1 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192017_98626c26-3f57-4237-9f43-c2098c60f4d6.png&w=1600&q=85 | folded concrete facade | house cantilevered off a ridge | lakeside glass studio | crescent hall with columns |
| 2 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192017_5e2e7057-6f42-43b7-b901-d9a05410bfcf.png&w=1600&q=85 | terraced stone hillside housing | slender crenellated tower | concrete spiral stair from below | library under board-marked overhang |
| 3 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192016_3cfaf615-9452-411f-82d8-efce7d4ac496.png&w=1600&q=85 | chapel cut into a quarry | courtyard with square openings | baths with round skylights | sawtooth-roof atelier |
| 4 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261108_192005_ce70ee97-86d4-49ce-9eb5-dc2a3ca1cd00.png&w=1600&q=85 | monolith with one slot window | tower with vertical fins | house with a palisade of columns | timber pavilion in an orchard |

A photo is shown by an absolutely positioned `<i>` filling its frame with `background-image: url(sheet)`, `background-size: 200% 200%`, `background-repeat: no-repeat`, and `background-position` = cell 0 → `0% 0%`, 1 → `100% 0%`, 2 → `0% 100%`, 3 → `100% 100%`.

### 1.2 Fonts

Load from Google Fonts (or self-host the latin woff2 files): https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300..500&family=Geist:wght@300..600&family=Geist+Mono&display=swap

- `--serif`: "Newsreader", Georgia, serif — all display type, weight 400, optical sizing auto.
- `--sans`: "Geist", ui-sans-serif, system-ui, sans-serif — body/UI.
- `--mono`: "Geist Mono", ui-monospace, monospace — shelf labels and captions.

Start the gallery only after `document.fonts.ready` resolves (it measures the hero text block).

### 1.3 Grain

`body::before`: `position:fixed; inset:0; z-index:1000; pointer-events:none; opacity:.06; mix-blend-mode:overlay;` background = inline SVG data URI 160×160 with `feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"` filling the rect.

---

## 2. Tokens, head and themes

- `<title>` "Plinth — Shared Interiors", `<html lang="en" data-theme="dark">`, viewport meta.
- Dark (default): `--bg #111111`, `--fg #ededed`, `color-scheme: dark`. Light (`[data-theme=light]`): `--bg #ffffff`, `--fg #0a0a0a`, `color-scheme: light`.
- Derived: `--fg-muted = color-mix(in srgb, fg 64%, bg)`, `--fg-subtle = 50%`, `--border = 12%`, `--border-strong = 22%`, `--bg-muted = 8%`. Card ink `--ink #171614`.
- `--scene-h: clamp(640px, calc(80svh - 48px), 900px)` (660px under 640px width).
- `body`: Geist, antialiased, `overflow-x:hidden`, background/colour transition .3s. `.wrap`: max-width 1180px, centred, 0 24px padding (content column = 1132px).
- Card palette (9 pastels, used in order by book index mod 9): #f0b0ae, #edbb99, #e8d194, #d1da9a, #a9d1b0, #a4ced0, #adc3e4, #c1b6df, #ddb0cc.
- Shelf book material — dark: book colour #161618, ink #050506, ink gradient `linear-gradient(125deg,#050506 5%,#29292c 24%,#77777c 33%,#202023 42%,#080809 58%,#505055 78%,#0b0b0d 94%)`, ink shadow `0 -.5px 0 #ffffff26, 0 .5px 0 #000000b3`, material line #ffffff14, image filter `grayscale(1) brightness(.32) contrast(1.15)` with blend `screen`, page stripes #222225/#0e0e10/#19191b, contact shadow #000000a6, cast shadow #00000047. Light: book #ededea, ink #fff, gradient `linear-gradient(125deg,#fff 5%,#dedee2 24%,#fff 33%,#e9e9ec 42%,#fff 58%,#d0d0d5 78%,#fff 94%)`, ink shadow `0 -.5px 0 #fffffff2, 0 .5px 0 #00000038`, line #00000012, image filter `grayscale(1) invert(1) brightness(.32) contrast(1.15) invert(1)` blend `multiply`, stripes #f8f8f6/#d9d9d6/#e7e7e4, contact #1112163d, cast #1112161a.

---

## 3. Content

### 3.1 Hero books (20; numbered Nº 01–20 by order; colour = palette[i mod 9])

| # | Title | Kicker | Read | Sheet/cell | Summary |
|---|---|---|---|---|---|
| 01 | Arches House | Dossier | ~2 min tour | 0/0 | A low concrete house fronted by five deep arches that keep its rooms in shade through the long summer afternoons. |
| 02 | Cantilever Tower | Dossier | ~3 | 0/1 | A residential tower whose upper floors widen outward, carried on raking concrete brackets above a narrow shaft. |
| 03 | Glass Pavilion | Notes | ~2 | 0/2 | A single glass room under a thin steel roof, set at the edge of a still reflecting pool. |
| 04 | Steps Plaza | Deep dive | ~3 | 0/3 | A civic square cut into a slope as a run of broad, shallow terraces that double as seating. |
| 05 | The Fold | Dossier | ~1 | 1/0 | A gallery wrapped in angled concrete planes that open and close like a creased sheet of paper. |
| 06 | Ridge House | Dossier | ~2 | 1/1 | A timber and glass box cantilevered off a rock ledge, with the whole valley framed by one long window. |
| 07 | Lakeside Studio | Notes | ~2 | 1/2 | A painter's studio on a stone plinth, its glass wall facing north across open water. |
| 08 | Crescent Hall | Deep dive | ~4 | 1/3 | A curved assembly hall carried on a ring of fluted columns, its roof rising toward the open side. |
| 09 | Stone Terrace | Dossier | ~3 | 2/0 | Housing stepped down a hillside, each flat roof forming the garden of the home above it. |
| 10 | Slender Tower | Notes | ~1 | 2/1 | A narrow apartment tower with a crenellated crown, built on a plot no wider than a townhouse. |
| 11 | Spiral Stair | Deep dive | ~2 | 2/2 | A free-standing concrete stair that coils through a three-storey atrium without a central column. |
| 12 | Board Library | Dossier | ~3 | 2/3 | A reading room beneath a deep board-marked overhang, glazed on every side for even daylight. |
| 13 | Quarry Chapel | Notes | ~2 | 3/0 | A small chapel carved into the face of a worked-out quarry, lit by a single cut in the rock. |
| 14 | Courtyard Block | Dossier | ~3 | 3/1 | A school arranged around a planted court, its facades a grid of deep square openings. |
| 15 | Skylight Baths | Deep dive | ~3 | 3/2 | Public baths under a heavy roof pierced by round skylights that move pools of light across the water. |
| 16 | North Atelier | Dossier | ~2 | 3/3 | Workshops under a sawtooth roof whose north-facing glass gives shadowless light all day. |
| 17 | Monolith | Notes | ~1 | 4/0 | A windowless block broken by one full-height slot that turns into a blade of light at dusk. |
| 18 | Fin Tower | Dossier | ~3 | 4/1 | An office tower sheathed in vertical concrete fins that shade the glass from the low western sun. |
| 19 | Palisade House | Dossier | ~2 | 4/2 | A long single-storey house screened by a palisade of slender columns along its garden edge. |
| 20 | Orchard Pavilion | Deep dive | ~2 | 4/3 | A timber pavilion set among old fruit trees, its roof a shallow gable on exposed rafters. |

Reading label format: "~N min tour". Slugs: lowercase, non-alphanumerics → "-".

### 3.2 Shelf books (15; Nº 21–35; kicker cycles Dossier / Notes / Deep dive; minutes = 1 + (i·7 mod 4); height cycles 310, 326, 300, 318 px)

Marrow House (0/0), Cistern Hall (1/3), Granary Loft (2/0), Weir Station (3/2), Kiln Studio (4/0), Saltern Court (0/3), Lantern Tower (4/1), Basalt Rooms (2/3), Tannery Lofts (3/1), Ferry Terminal (1/2), Belvedere (0/1), Sluice House (3/3), Aqueduct Rooms (1/0), Signal Box (2/1), Concrete Almanac (0/2, the one open on load). Summary for each: "<Title> is one of the quieter entries in the atlas: a working building whose plan, light and material are read here as closely as any monument."

Tagline used on card backs: "A field guide to buildings that last".

---

## 4. Navigation bar (home and article)

Sticky, top 0, z-index 50, background = page bg. Inner `.wrap` 48px tall, flex, space-between.
- Logo (link, aria-label "Plinth home"): Newsreader 22px/1, letter-spacing -.01em, gap 8px; a ring glyph before it = inline-block 14×16 ellipse, border 2.1px currentColor (left 1.6px, right 2.6px), radius 50%, translateY(1px). Text "Plinth".
- Theme pill (right, home only): flex, 2px padding, 1px `--border-strong` border, radius 999px, Geist 12px. Two buttons "Paper" (data-t light) and "Noir" (data-t dark), each 7px 12px padding, radius 999, colour fg-muted; the pressed one gets colour = bg. A sliding `<i>` indicator (absolute, top/bottom 2px, radius 999, background fg) is moved under the pressed button by setting its `left`/`width` to the button's offsetLeft/offsetWidth, transition left/width .35s cubic-bezier(.23,1,.32,1). Persist choice in localStorage "plinth-theme" (wrap in try/catch).

---

## 5. Hero section

`.hero`: relative, full width, `min-height: calc(var(--scene-h) + 160px)`, `overflow-x: clip` (y visible), isolation isolate.

### 5.1 Title block `#heroContent`

Absolute, z-index 2, `top: clamp(48px, 8svh, 96px)`, `left: 50%`, `translateX(-50%)`, width `calc(100% - 48px)`, max-width 450px, left-aligned, `container-type: inline-size`.
- H1, two block spans with nowrap: "Shared" / "Interiors". Newsreader 400, `font-size: 26.2743cqi` (≈118px at 450px), line-height .96, letter-spacing -.025em.
- Paragraph: "A quiet atlas of the buildings we love." margin-top 24px, `clamp(15px, 1.2vw, 17px)`/1.5, colour fg-muted.
- Search (margin-top 24px): a form (role search) = flex row, gap 12px, min-height 48px.
  - Field: magnifier SVG 14px at left (circle r 4.75 + handle, stroke 1.5, fg-muted, vertically centred); input type search, min-height 48px, no border except 1px bottom `--border-strong` (fg-muted on focus), transparent, 16px/1.5, padding 12px 0 12px 26px, placeholder " ".
  - Rotating placeholder: absolute `inset: 0 0 1px 26px`, flex centred, fg-muted 16px, nowrap, hidden whenever the input is focused or non-empty. Inside, an inline-grid with `perspective: 320px`; all names share grid-area 1/1, `transform-origin: 50% 50% -.6em`, backface hidden. The list = all 35 titles, shuffled once (Fisher–Yates). Every 2400 ms the step increments: the previous name gets animation **nameOut** (.62s cubic-bezier(.22,1,.36,1) both: from opacity 1 → opacity 0, blur 2px, translateY(-.9em) rotateX(80deg)) and the new one **nameIn** (from opacity 0, blur 2px, translateY(.9em) rotateX(-80deg) → none). The first name shows with no animation.
  - Submit button: 40×40 circle, flex 0 0 40px, align-self flex-end, margin-bottom 4px, 1px `--border-strong` border, bg page bg, chevron path "m6 3.5 4.5 4.5L6 12.5" stroke 1.5 round. Hover: border fg-muted, bg `--bg-muted`; active scale(.94); transitions .16s.
  - Typing filters the ribbon (see 6.8). Submitting opens the first title that equals, else contains, the query (straight into the reading view, no flight).

### 5.2 Gallery stage `#gallery`

Absolute, left/right 0, top 0, height `--scene-h`, z-index 0, `pointer-events:none` (sharp cards re-enable it). Inside, `.layer` (absolute inset 0, overflow visible) holds the cards; on boot it plays **galleryEnter** (opacity 0 → 1, .6s cubic-bezier(.23,1,.32,1)). A visually-hidden note: "Newest entries. · Slowly moving · Scroll down the page to wander".

---

## 6. The drifting ribbon — exact math

Notation: `u` = stage width, `d` = stage height (scene-h), `A` = card width 230 (200 under 640px), `L` = card height 310 (280 under 640px), card thickness base `BT` = 26, `N` = number of (filtered) books, `ss(x)` = smoothstep with clamp (`x=clamp(x,0,1); x²(3−2x)`), pitch constant `PITCH = −0.065` rad. `cb` = title block rectangle relative to the stage (left, right, bottom of the search row).

### 6.1 Card volume (shared by ribbon cards, shelf books and the flight)

A `.vol` (absolute, size `--w`×`--h`, `transform-style: preserve-3d`, origin centre) containing six faces, each absolute `--w`×`--h`, backface hidden, background `--c`, overflow hidden:
- front `translateZ(t/2)`; back `rotateY(180deg) translateZ(t/2)`;
- spine (left edge) width `t`, left `50% − t/2`, `rotateY(-90deg) translateZ(w/2)`; pages (right edge) same with `rotateY(90deg)`;
- top height `t`, top `50% − t/2`, `rotateX(90deg) translateZ(h/2)`; bottom the same with `rotateX(-90deg)`.
Every front/back/spine also contains a `.paper` overlay (absolute inset 0, z 5, background `var(--paper, var(--c))`, `opacity: calc(1 − var(--co,1))`) used to fade content out during the flight.

**Ribbon card faces** (`--w 230px --h 310px --t 26px`, ink #171614):
- Spine = `color-mix(in srgb, --c 78%, #000)`. Pages/top/bottom = paper-edge stripes `repeating-linear-gradient(#f8f4ea 0 1px, #ded7c8 1px 2px, #eee8db 2px 3px)` (90deg on pages, 0deg on top/bottom) framed by 2px bands of `--c`; bottom brightness .82, pages .9.
- Front (flex column): header 35.5px tall, padding 12px 16px 0, Geist 9px: "Plinth" left, "Nº 07" right. Photo area flex 1 (`<i>` with filter `grayscale(1) contrast(1.08)`, `mix-blend-mode: multiply` over the card colour). Text block padding 12px 16px 10px: kicker Geist 9px (margin-bottom 10.5px); title Newsreader 25px/1.04, letter-spacing −.01em, max 2 lines; footer row margin-top 14px, padding-top 8px, 1px top rule rgba(23,22,20,.2), Geist 9px: "~2 min tour" left, "Open ↗" right.
- Back: header 57.5px tall (same labels); title Newsreader 27px/1.08, padding 0 20px, max 3 lines; summary Geist 12px / 18.6px, padding 12px 20px 0, max 6 lines; footer at bottom (padding 0 20px 20px, Geist 9px/13.5px): reading time, "Visited 12 Oct 2026", then the tagline (margin-top 12px, max-width 150px).
- Binding stripes on front and back: a 7px strip at the left edge = `linear-gradient(90deg, rgba(23,22,20,.15) 0 2.5px, rgba(23,22,20,.07) 2.5px 5px, transparent 5px 6px, rgba(23,22,20,.1) 6px 7px)`.

### 6.2 Per-card projection

Each card has centre `(x, y)`, scale `s`, yaw, pitch, rotation, blur. DOM: an outer `<a class="gcard">` (absolute at 0,0, size A×L) with `transform: translate3d(x − A/2, y − L/2, 0) rotate(rotation)` and `filter: blur(b px)` when b > .05; inside it the `.vol` with `transform: perspective(P px) rotateX(pitch) rotateY(yaw) scale3d(s,s,s)` where `P = max(900, A·s, L·s)`. (Keeping blur on the 2D outer and 3D on the inner avoids flattening.) Paint order = sorted ascending by depth then slot; z-index = rank.

For bounding boxes use the same projection: rotate a local point by yaw (`x' = x cosθ + z sinθ`, `z' = −x sinθ + z cosθ`), then by pitch (`y'' = y cosφ − z' sinφ`, `z'' = y sinφ + z' cosφ`), `w = max(.1, 1 − z''/P)`, screen = centre + rotate(rotation)·(x'/w, y''/w).

### 6.3 Position along the ribbon (desktop, `u ≥ 640`)

For a card whose left-to-right screen x is `S`:
- `r = ss(S/u)`; `a = clamp(d/1050, .85, 1.2)`; **scale** `= (0.34 + (2.4 − 0.34)·(1 − r)³)·a`; **rise** `= −0.8·d·(r − 0.4)²`; **order** `= (1 − r)·100 + 1`.
- **Yaw** `= 0.35 − ss(S/u)·0.24`. Pitch −0.065. Rotation 0.
- **Depth-of-field blur**: `n = clamp(S/u,0,1)`; `lft = 1 − ss(n/.38)`; `rgt = 1 − ss((1 − n)/.035)`; side = left if lft > rgt, else right if rgt > 0; `v` = that side's value; blur = `round(v·(left ? 60 : 3)·10)/10`, capped at 60. Only cards with blur exactly 0 are clickable ("hot", cursor pointer, tabbable).
- Card size `A·scale × L·scale`, thickness `26·scale`. Depth for sorting = order + 0.7 + 0.25·(bookIndex mod 3).

### 6.4 Spacing, margins and baseline (recomputed on resize)

- Margins: with `l = 2.88`, `o = 0.408`, `e(w,h,θ) = |cosθ|·w + |sinθ|·h`: `left = max(520, e(A·l/2+193, 1.4·A·l/2+193, 5.4°), bboxRight(card A·l × 1.4A·l, thickness 26·l, yaw .35, pad 193))`, `right = max(96, e(A·o/2+13.25, 1.4·A·o/2+13.25, 14.2°), −bboxLeft(card A·o, yaw .11, pad 13.25))`. (≈ left 584, right 96 at 1440px.)
- **Spacing** `T = max(A − 135, ceil((u + left + right)/22))` (≈ 97px at 1440).
- **Baseline** `R`: march 128 steps from `p = −3A` to `u + 3A`. For each pair (previous `dp`, current `p`) with scales `f = along(dp)`, `g = along(p)`: consider it if either has zero blur or they straddle `u/2`. Let `lx = A·f.scale/2 + 13`, `oy = L·f.scale/2 + 13`, `st = 26·f.scale/2`, `r = yaw(p)`, `a = yaw(dp)`; `cx = lx cos r + st sin a`; `hz = lx sin a + st cos r`; `k = 1/max(.1, 1 − (oy·0.0649542 + 0.9978882·hz)/900)`; projected half-extents `(cx·k, (0.9978882·oy + hz·0.0649542)·k)`. If `p + x ≥ cb.left − 10` and `dp − x ≤ cb.right + 10`, then `R = max(R, cb.bottom + 24 + y − min(f.rise, g.rise))`. Finally `R += 24`. This lifts the ribbon as high as possible while every sharp card clears the search row by 24px.

### 6.5 Which cards exist each frame

`B = mod(phase, N·T)`. First slot `C = ceil((B − A/2 − left)/T)`, last `J = floor((B − A/2 + u + right)/T)`, at most 24 slots from C. Slot `n` shows book `mod(n, N)` at `S = n·T + A/2 − B`, `y = R + rise(S)`. Reuse DOM nodes keyed by slot (rebuild only if the slot's book changes); remove nodes for slots that left.

### 6.6 Motion: drift, scroll, wheel, drag

- **phase = drift + wheel + drag + 0.8 · window.scrollY.** Scrolling the page therefore slides the ribbon left at 0.8× the scroll distance while the hero scrolls up.
- **Drift**: every frame `drift += T · dt / 10` (one card spacing every 10 s), `dt = min(.05, frame delta s)`. Paused while a flight is running, when the tab is hidden, or with reduced motion. Only run the loop work while the hero is within 200px of the viewport (IntersectionObserver).
- **Horizontal wheel / shift+wheel** on the stage (`preventDefault`): add the delta (×16 for line mode, ×width for page mode) to a pending pool; each frame move a smoothed share into `wheel`: `a = −expm1(−12·dt)`, `pending' = pending·(1 − a)` (snap to 0 below .01), `wheel += pending − pending'`.
- **Drag**: pointerdown on a card records start; once moved ≥ 6px the axis locks. Horizontal: `drag = −(x − startX)` live; on release fold `drag` into `drift`. A drag suppresses the click.

### 6.7 Phone deck (`u < 640`)

Cards fan around the centre instead of the ribbon. `g = mod(phase, N·T)/T`, `v = floor(g)`, `q(e) = e³(e(6e − 15) + 10)`, `b = v + q(q(g − v))` (so each step snaps with a double smootherstep). `y0 = min(1.15, .46u/A)`; centre line `E = cb.bottom + 24 + L·y0/2 + 24`. For each slot e within ±3 of b: `t = e − b`, `n = |t|`, `o = sign(t)`; interpolate across tables at n (linear between integers 0–3): X [0,.118,.22,.2], Y [0,.045,.105,.11], ROT° [0,6,7,7], SCALE [1,.92,.86,.78], YAW [0,.07,.12,.12]. Card: x = u/2 + o·X·u, y = E + Y·u, scale = y0·SCALE, yaw = −o·YAW, rotation = o·ROT°, clickable only if n < .5, depth = −n. Here `T` is `max(A − 135, ceil((u + left + right)/22))` with left/right computed using l = 1.7, o = .45.

### 6.8 Search filter

On input: 180 ms debounce → stage gets `data-filter=out` (layer opacity 0, translateY(14px) scale(.985), .16s) → after 160 ms swap the book list (titles+summaries containing the query, case-insensitive), clear all cards → `data-filter=in` (**filterIn** .52s cubic-bezier(.22,1,.36,1): from opacity 0, translateY(18px) scale(.985)) → remove after 520 ms. No matches: centred text at 62% height "No listings match “query”." in fg-muted 15px.

---

## 7. The book flight (open)

Timeline: **0–600 ms "centering"**, **600–1060 ms "zooming"**, then swap to the reading view and **220 ms reveal**.

On click of a sharp card: hide that slot's card (keep its slot hidden while flying), pause drift, `history.pushState` to `#/b/<slug>`. Create a fixed overlay (inset 0, z-index 2147483000, role dialog, focused, blocks wheel/touchmove; Escape cancels, Tab is trapped). Inside, a `.flight` div (absolute, `preserve-3d`, origin centre, `left: −n/2`, `top: −o/2`, size n×o) holding a fresh `.vol` of that book. Variables: model size `n×o×a` = 230×310×26; origin box = the card's unrotated screen box (centre, `width = A·s`, `height = L·s`); pose = card yaw/pitch/rotation, thickness `26·s`; optics: perspective `Pp = max(900, A·s, L·s)`, camera/pivot/translate offsets 0. After the first paint at t=0, measure the flight's front face rect against the source card's front face rect and shift the origin by the difference, so the hand-off is seamless.

For time t (ms, clamped 0–1060):
- `f = ss(min(1, t/600))`, `h = ss(max(0, (t − 600)/460))`.
- `p = origin.width/n`, `m = origin.height/o`, `g = min(.46·vw/origin.width, .58·vh/origin.height, 340/origin.width)` (card grows to ~340px wide at most).
- `x = lerp(originCentreX, vw/2, f)`, `y = lerp(originCentreY, vh/2, f)`.
- `yaw = lerp(yaw0, K, f)` with `K = (floor(yaw0/2π) + 1)·2π` → **one full spin** to face front. `pitch → 0`, `rotation → 0` by f.
- `scaleX = p·lerp(1, g, f)`, `scaleY = m·lerp(1, g, f)`, `scaleZ = thickness/a`.
- `w = 1.08·max((vw + 8)/(n·p·g), (vh + 8)/(o·m·g))`; `zTarget = Pp − thickness/2 − Pp/w`; `z = lerp(tz·(1 − f), zTarget, h)` → the card grows until it covers the viewport ×1.08.
- Content fade: overlay `--co = 1 − f` (each face's `.paper` overlay rises to the book colour, so at the end the front is a flat field of the card colour).
- Transform on `.flight`: `translate3d(x, y, 0) rotateZ(rotation) translate(camX·σ, camY·σ) perspective(Pp) translate(−camX·σ, −camY·σ) translate3d(tx·σ, ty·σ, z) translate(pivX·σ, pivY·σ) rotateX(pitch) rotateY(yaw) scale3d(scaleX, scaleY, scaleZ) translate(−pivX·σ, −pivY·σ)` with seed `σ = 1 − f`.

At t ≥ 1060: show the reading view underneath (page background becomes the card colour, scroll to top), wait two animation frames, add `.revealing` to the overlay (opacity 0 and `scale(1.02)` over 220 ms cubic-bezier(.23,1,.32,1)), then remove it.

**Shelf books** use the same flight with: model = that book's volume (n = 210, o = its height, a = 38); pose read from the volume's computed matrix (`yaw = atan2(−m13/sx, m33/sz)`, `pitch = asin(m23/sy)`, `rotation = atan2(−m21/sy, m22/sy)`); origin from its bounding box centre and unprojected size; optics: perspective 1200, camera offset = perspective-origin (50% 100%) minus the volume's centre, pivot = transform-origin (50% 100%) minus centre, translate = m41/m42/m43; the source face is the cover if the book is open, else the spine. Paper colour = page bg (the reading view keeps the page colour).

**Reduced motion**: skip straight to t = 1060 and no reveal transition.

## 8. Return flight (Back)

On `popstate` from the reading view (or the "← All buildings" link, which calls `history.back()`): create the overlay in the final zoomed state (t = 1060) at opacity 0 and fade it to 1 over 200 ms linear ("re-emerging"). Then show the home view, restore the scroll position saved at open, and re-aim: for ribbon cards shift `drift` so that a slot of that book lands at the same x it was opened from (fraction of the stage width, clamped 24px from the edges; slot chosen nearest the current phase); for shelf books, use the book's current rect. Then animate r = 0 → 1060 ms with state `flight(1060 − r)` (zoom out 460 ms, then spin back 600 ms), remove the overlay, unhide the card, resume drift. Turn off native scroll restoration (`history.scrollRestoration = "manual"`).

---

## 9. Reading view (simple)

Replaces the home view (home hidden, scroll top). Background `--abg` = the card colour (shelf books: page bg); text `#171614` on coloured pages, else fg. Document title "<Title> — Plinth".
- Nav: logo (acts as back) and "← All buildings" (Geist 13px, opacity .7 → 1 on hover).
- Head (padding-top 72px): H1 Newsreader `clamp(48px, 6.4vw, 84px)/1`, letter-spacing −.025em; a pill below (margin-top 22px, 7px 14px, radius 999, 1px border currentColor 30%, 14px) with the kicker.
- Grid (padding 40px top, 120px bottom; columns 152px | 1fr | 264px, gap 32px; single column under 820px, contents column hidden):
  - Contents: small label "Sections" (11px, opacity .6) and links "Synopsis" (active: 2px left border, 7% tint), "Plan and light", "Material".
  - Body: H2 "Synopsis" Newsreader 32px/1.15; paragraph 1 = summary; paragraph 2 = "Like every entry in this atlas, <Title> is an invented building, described the way a field guide would describe a specimen: what it is made of, how light reaches its rooms, and how it sits on its ground. The figure on the right is a study photograph made for this page." (Geist 18px/1.65, max 640px).
  - Aside: a 4:3 plate with the book's photo (multiply over the card colour; on shelf/plain pages normal blend, grayscale), caption Geist Mono 11px "Fig. 01 · Study photograph · Nº 07" over a 1px rule; then, above a 1px rule (margin-top 28px, padding-top 22px), "Quick facts" (Newsreader 26px/1.1) and the line "<reading time> · Visited 12 Oct 2026" (Geist 14px/1.5, opacity .85).
- Loading the page with a `#/b/<slug>` hash opens that reading view directly.

---

## 10. Shelf section

`section.shelfsec` (aria-label "Recommended reading shelf"): relative, z-index 10, page background (so it covers the hero's bleed), margin-top 32px, padding-top 24px. A horizontal scroller (overflow-x auto, thin scrollbar) holds `ul.shelf`: flex, centred, `align-items: flex-end`, gap 4px, `width: max-content; min-width: 100%`, padding 64px 32px 24px. Under 640px the list gets `zoom: .6`, padding 40px 40px.

Each `li.slot` (`--t 38px`, `--w 210px`, `--h` = book height): width `--t`, height `--h`, transition width .8s cubic-bezier(.22,.8,.25,1). Open slot (`data-open="true"`, z 2): width `calc(210px + 38px·.65)`.

Inside, `a.sbook` (full size, `perspective: 1200px`, `perspective-origin: 50% 100%`) containing the volume (`left: calc(50% − 105px)`, height 100%, `transform-origin: 50% 100%`, transition transform .8s same curve):
- closed: `translateZ(−105px) rotateY(90deg)` (spine faces you);
- open: `translateZ(24px) rotateY(−4deg)` (cover faces you).
Shadows: `::before` cast shadow (radial ellipse at 42% 20% of the cast colour, 12px tall, width t+14, bottom −6px); open: width 224px, 18px tall, bottom −14px, opacity .75, `translate(−50%) translate(8px) skew(−10deg)`. `::after` contact shadow 3px tall under the book (width t → 210 when open).

Faces (material per section 2; all faces 1px material-line border plus a faint texture `repeating-linear-gradient(0deg,#ffffff02 0 1px,#0000 1px 3px), linear-gradient(115deg,#ffffff05,#0000 45%,#0000001a)`):
- Spine: column, centred, gap 18px, padding 16px 3px 12px, inset shadows `1px 0 #ffffff0d` and `−3px 0 5px #00000038`, 1px line 5px from the right edge; number Geist Mono 9px; title Newsreader 18px, `writing-mode: vertical-rl` rotated 180° (reads bottom-to-top), nowrap, ellipsis.
- Cover: column; header Geist Mono 9px ("Plinth" / "Nº 35", padding 12px 16px 10px); photo area flex 1 (image filter/blend from the theme); text padding 12px 16px 14px: kicker Geist Mono 9px, title Newsreader 25px/1.04 (−.02em, max 3 lines), footer rule + "~N min tour" / "Open ↗". A 7px dark binding strip on the left edge. All cover/spine text uses the metallic ink: gradient clipped to text, 160% wide, plus the ink shadow.
- Pages/top/bottom: page-stripe gradients in the theme's three page tones, framed by 3px of book colour.
- **Hover**: on pointermove (mouse only, hover-capable devices, ignore repeated identical coordinates) over a different book, after **100 ms** move `data-open` to it. Focus does it instantly.
- **Sheen**: while the pointer is over the open cover, a radial highlight (`circle at pointer`: white .16 → .04 at 28% → transparent 55%, screen blend; light theme white .7/.2) fades in (.25s) and follows the pointer.
- Click any book → shelf flight (section 7).

## 11. Footer

`footer.foot`: relative, z 10, page bg, 1px top border `--border`, overflow hidden. Row (`.wrap`, padding 20px): "Built with ◆ Studio" left, "2026" right, Geist 12px fg-muted. Below, an SVG wordmark, width `calc(100% − 48px)` (max 1360px), margin 24px auto 0, colour fg-subtle, viewBox 0 0 1000 250 (top-aligned), with a 45°-rotated line pattern (7×7 tile, 1.1px lines, currentColor). Text "Plinth", Newsreader 400px, x 500 middle-anchored, y 318 (cropped by the viewBox bottom), letter-spacing −8, fill = the hatch pattern, stroke currentColor 1.2px.

## 12. Acceptance checklist

- At 1440×900, dark: headline lines "Shared" and "Interiors" at ~118px; ribbon cards curve from huge, 60px-blurred cards at the bottom-left up to tiny cards at the right edge, sharp cards clearing the search row by 24px.
- Cards drift left one spacing per 10 s; scrolling down slides them further left at 0.8× scroll; shift-wheel and drag also scrub.
- Clicking a sharp card: 600 ms fly-to-centre with a full spin, 460 ms zoom to fill the screen with the card colour, 220 ms fade into the reading view; Back reverses it and the card lands where it was.
- Shelf: hover a spine → after 100 ms it swings out face-on over .8s; clicking flies it open the same way.
- Placeholder names flip every 2.4 s; typing filters the ribbon with the out/in fades.
- Paper/Noir toggle swaps themes; phone width shows the fanned deck without horizontal scroll; reduced motion freezes the drift and skips flights.