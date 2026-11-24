# Prompt: Distill, "Built for people. Read by machines." comparison section

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts. This is that prompt.

## What it is

Build a full-viewport **comparison hero** for a fictional AI-readability product called Distill. Use plain HTML, CSS and vanilla JavaScript in one file, with no framework and no libraries.

- **Top:** a nav bar and a two-column hero. On the left, a serif headline, "Built for people. / *Read by machines.*". On the right, a paragraph and an orange pill button.
- **Below:** a **conveyor belt** of rounded website cards, real mini web pages of a fictional materials company called Kessler built in HTML/CSS, drifts continuously to the left.
- **The scanner:** at the horizontal centre of the screen stands a glowing orange vertical **scanner line**.
  - **Right of the line:** the cards look like a real website.
  - **At the line:** each card **dissolves into a dense cloud of orange pixel particles**.
  - **Left of the line:** the exact same card area shows **that page's plain HTML source**, the token-light version an AI agent receives, printed in small grey monospace. It fades out towards the left edge of the screen.
- **The counter:** a floating counter on top of the line labelled "Token reduction" counts down the tokens removed from the card currently crossing ("−48,193") with its percentage ("91% less").
- **Interaction:** hovering the belt slows it; dragging scrubs it with inertia. Dragging a card back to the right rebuilds it from its code, pixel by pixel.

Everything, including the particle dissolve, is real code, with no video. The cards are DOM, the code is real text, and the dissolve is a 2D canvas drawn every frame in sync with the card positions.

## Media: every asset URL

Six photographs (WebP, about 650 × 655 px), used as backgrounds inside the Kessler cards. All are hosted on the Higgsfield CDN.

| Name | URL | Used in |
|---|---|---|
| dunes: golden desert dunes at sunset | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp | Card 1 (Home) full background; Card 6 third post thumbnail |
| foundry: molten metal poured in a dark foundry | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp | Card 4 (Vision) first tile |
| mineral: warm macro of a rough mineral surface | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp | Card 3 (Case study) blurred background |
| mesa: desert mesa at blue hour | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp | Card 4 second tile; Card 6 second post thumbnail |
| fire: smeared long-exposure furnace fire | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp | Card 5 (Alloy) slightly blurred background |
| saltflat: white salt flats with a distant mountain | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp | Card 6 (Journal) first post thumbnail |

All images are set as CSS `background-image`, with `background-size: cover` and `background-position: center`.

## Fonts

Self-host them; the single-file version embeds each as base64 WOFF2 (Latin subset).

| Family | Weights | Use | Source |
|---|---|---|---|
| Inter (variable) | 100–900, using 300 / 400 / 500 / 600 | Nav, paragraph, buttons, card UI, stats | https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600 |
| Newsreader (variable, opsz 6–72) | 400, plus 400 italic | Hero headline, card serif titles | https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400 and `ital,opsz,wght@1,6..72,400` |
| IBM Plex Mono | 400 and 500 | Eyebrow, code text, counter, card kickers | https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500 |

| Stack | Value |
|---|---|
| `--sans` | `"Inter", system-ui, sans-serif` |
| `--serif` | `"Newsreader", Georgia, serif` |
| `--mono` | `"IBM Plex Mono", ui-monospace, Menlo, monospace` |

## Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#EEF0F2` | Page background (pale cool grey) |
| `--ink` | `#0F1115` | Headline, logo |
| `--body` | `#2A2E35` | Nav links, paragraph, eyebrow |
| `--muted` | `#8B9098` | "Token reduction" label |
| `--code` | `#7A7F88` | HTML code text |
| `--comment` | `#B3B8BF` | `<!-- … -->` comment lines |
| `--hot` | `#FF5A1F` | Accent: buttons, scanner, counter, particles |
| `--hot-soft` | `#FFE1D3` | Right half of the counter pill |
| `--cw` | `46vw` | Card width (mobile `84vw`) |
| `--ch` | `52vh` | Card height (mobile `54vw`) |
| `--gap` | `4.75vw` | Gap between cards (mobile `7vw`) |
| `--top` | `40.2vh` | Top edge of the cards (mobile `54svh`; `58svh` when the phone is shorter than 700px) |

`body` has `overflow-x: hidden` and antialiased smoothing. The whole section is a `position: absolute; inset: 0; overflow: hidden` stage, exactly one viewport tall.

## Nav (56px tall, 20px side padding, flex, 56px gap)

- **Logo:** an 19 × 23 SVG droplet filled in currentColor, with a small background-coloured highlight curve inside the drop (stroke 1.7, round caps), then "Distill" in Inter 600, 23px, letter-spacing −.035em, 8px gap.
- **Links:** Inter 500, 13px, `--body`, 38px apart: "Product", "Use cases" and "Resources", each followed by an 8 × 5 chevron at 70 % opacity, then "Pricing".
- **Right, pushed with `margin-left: auto`, 20px gaps, Inter 500, 12.5px:**
  - "Sign in" as plain text.
  - "Start a free trial": a 32px-tall pill with 0 17px padding, a 1px `#C4C9CF` border and `rgba(255,255,255,.35)` fill.
  - "Book a demo": a 32px pill filled `--hot`, with white text.

## Hero copy

A grid of `1fr | 34vw` with a 4vw gap and padding `30px 8.9vw 0`.

- **Left column:**
  - **Eyebrow:** "AI READABILITY" in IBM Plex Mono 500, 11.5px, letter-spacing .06em, uppercase, `--body`.
  - **Headline,** 14px below: Newsreader 400, `clamp(30px, 3vw, 58px)`, line height 1.05, letter-spacing −.025em. Two lines: "Built for people." then, on a new line, "Read by machines." in italic.
- **Right column:**
  - **Paragraph:** Inter 400, `clamp(14px, 1.05vw, 19px)`, line height 1.55, `--body`, max width 34vw. Text: "Distill detects AI agents at the edge and serves them a clean, token‑light version of every page, without changing a pixel of what people see." Use a non-breaking hyphen in "token‑light".
  - **Button,** 20px below: "Explore Distill", a 40px-tall pill with 0 22px padding, `--hot` fill, white Inter 500 13px. On hover it lifts 2px over `.35s cubic-bezier(.2,.8,.2,1)`.

## The belt

- **`.belt`:** full width, top at `--top − 70px`, height `--ch + 140px`. It has `cursor: grab` (`grabbing` while dragging) and `touch-action: pan-y`.
- **Three stacked layers inside it:**
  1. **`.codes`, the code layer.** A CSS mask fades it from transparent at the left edge to fully visible at 24vw (30vw on mobile): `linear-gradient(90deg, transparent 0, #000 24vw)`. The oldest code dissolves into the page as it travels off to the left.
  2. **`.cards`, the website cards.**
  3. **`canvas.fx`.** It covers the belt at device-pixel-ratio resolution (capped at 2) and draws the haze, the dissolve and the sparks.
- **Element positions:** every card and every code block is `position: absolute; top: 70px; left: 0`, `--cw` × `--ch`, and positioned only with `transform: translate3d(x, 0, 0)`.

### The scanner line (`.scan`)

- **Position:** a zero-width element at `left: 50%`, top `--top − 14px`, height `--ch + 40px`, above the belt. It overshoots the cards by 14px at the top and 26px at the bottom.
- **Core `<i>`:** 4px wide, centred (left −2px), 4px radius.
  - Fill: a vertical gradient `#ff7a3c → #FF5A1F (12%) → #FF5A1F (88%) → #ff7a3c`.
  - Glow: `box-shadow: 0 0 10px 2px rgba(255,90,31,.85), 0 0 34px 10px rgba(255,90,31,.38)`.
- **Halo `<b>`:** 42px wide, starting at the line, from 4 % to 96 % of the height. It is a horizontal gradient from `rgba(255,110,50,.55)` to transparent, blurred 6px. The glow therefore spills onto the card side only.

### The counter badge (`.badge`)

- **Position:** centred on the line (`left: 50%; translateX(−50%)`), top at `--top − 60px`. It is a small vertical stack with a 9px gap.
- **Label:** "Token reduction" in Inter 400, 11.5px, `--muted`.
- **Pill:** 26px tall, fully rounded, `overflow: hidden`, `box-shadow: 0 0 18px rgba(255,90,31,.35)`, IBM Plex Mono 500, 12.5px. It has two halves:
  - **Number:** `--hot` fill, white text, padding 0 11px 0 13px, min width 8.2ch, right-aligned, tabular numbers. It reads, for example, "−48,193" with a true minus sign (U+2212).
  - **Percent:** `--hot-soft` fill, `#D9430F` text, 11px, padding 0 12px 0 10px. It reads, for example, "91% less".
- The pill's bottom edge sits about 20px above the card tops, riding on the scanner.

## The six Kessler cards

### Card shell

- **Size and shape:** `--cw` × `--ch`, border radius 1.6vw, `overflow: hidden`, white Inter text, `will-change: transform, clip-path`, not selectable.
- **Internal units:** `container-type: inline-size`, so everything inside is sized in **cqw** (1cqw = 1 % of card width). Each card is a true scaled mini website.

### Shared card header (`.k-nav`)

- **Position:** 4.4cqw from the left and right, 4cqw from the top, with space between its two parts.
- **Logo:** a double-peak mountain mark (two overlapping open triangles, 54 × 42 viewBox, stroke 3.2, drawn at 5.4 × 4.2cqw), then "Kessler" in Inter 500, 4.6cqw, letter-spacing −.03em, 1.3cqw gap.
- **Menu:** three uppercase items in Inter 500, 1.32cqw, letter-spacing .14em, 85 % opacity, 3.4cqw apart. The current page's item is wrapped in a 1px `rgba(255,255,255,.6)` pill: padding .7cqw 1.6cqw, offset back by negative margins so the text doesn't move.

### Cards in belt order

| # | id | Look | Content |
|---|---|---|---|
| 1 | home | **dunes** photo full-bleed, under a vertical darkening gradient: `rgba(20,10,4,.25)` → transparent at 30 % → `rgba(20,10,4,.55)` | Menu: PRODUCTS · IMPACT · ABOUT. **Bottom left:** two stats split by a 1px `rgba(255,255,255,.35)` rule, 4cqw gap. Each has Inter 300 numerals at 9cqw, line height .9, letter-spacing −.04em, over a 1.9cqw label: "200x" / "stronger" and "87%" / "lower emissions". **Bottom right:** "Advanced materials for a stronger tomorrow.", 2.2cqw, 24cqw wide |
| 2 | price | **No photo.** Dark-brown text `#2A1406` on `radial-gradient(120% 90% at 20% 110%, #FF6A1F 0, #FF9A4A 35%, #F7C79A 62%, #EFD9C4 100%)` | Menu: PRODUCTS · **PRICING** (pill) · CONTACT. **Price:** "$2,400" at 38 % from the top in Inter 300, 13cqw, letter-spacing −.05em, with a raised "$" at .4em. **Under it, at 62 %:** "PER MONTH · INDUSTRIAL" in mono 1.6cqw at 75 % opacity. **Right, 36cqw wide:** a plans list, each row with a top rule `rgba(42,20,6,.25)`: Pilot $299 · Industrial $2,400 · Foundry Custom. **Bottom left:** a dark pill "Start a pilot", `#2A1406` fill, `#F7E6D6` text |
| 3 | case | **mineral** photo blurred 1.4cqw, saturate 1.1, scaled 1.12, under a veil `rgba(25,14,8,.15→.55)` | Menu: PRODUCTS · IMPACT · ABOUT. **Kicker:** "CASE STUDY · ATLAS RAIL" in mono 1.4cqw, at 17 %. **Title:** "How Atlas Rail cut track weight by a third in eighteen months" in Newsreader 4.6cqw, 56cqw wide, at 24 %. **Stats:** three columns with top rules: "34%" lighter track · "3.4x" service life · "0" unplanned closures, in Inter 300 at 6cqw |
| 4 | vision | **Solid `#1B1311`** | Menu: PRODUCTS · **VISION** · ABOUT. **Tiles row:** at 21 % from the top, 46 % tall, columns `1fr 1fr 1.2fr`, 2cqw gap. The tiles are **foundry** and **mesa** with 1.4cqw radius, then a serif quote in Newsreader 3.4cqw: "The Kessler vision: *materials that outlast the people who made them.*", with the italic part at 75 % opacity. **Footer:** "How Kessler pours alloy / at the edge of the desert" on the left, "Manifesto · 6 min" on the right, 1.6cqw at 70 % opacity |
| 5 | alloy | **fire** photo, blurred .6cqw, scaled 1.06, with a slight right-side darkening, on `#140C08` | Menu: PRODUCTS · IMPACT · ABOUT. **Bottom left:** "The carbon‑negative" over an italic "alloy." in Newsreader 7.4cqw, line height .98. **Bottom right, 30cqw wide:** a ruled spec list: Product / K-Alloy 7 · Tensile / 1,940 MPa · Datasheet / PDF ↗ |
| 6 | journal | **Light `#E9ECF1`** with ink `#121A2A` | Menu: PRODUCTS · **JOURNAL** · ABOUT, at 70 % opacity. **Title** at 23 %: "Journal" over an italic "field notes from the flats" in `#46618E`, Newsreader 5.6cqw. **Posts:** three columns `1.25fr 1fr 1fr`, each a 4:3 thumbnail with 1.2cqw radius, a mono kicker in `#6A7891` and a title. **saltflat:** "FIELD NOTES / Mining nothing but light on the salt flats". **mesa:** "PLANTS / Atacama, year one". **dunes:** "PROCESS / Why we melt sand at noon" |

## The code each card turns into

Each card has a twin `.code` block at the same x, the same size, `white-space: pre` and `overflow: hidden`. Its two text blocks use IBM Plex Mono 400 at **1.56cqw** (about 10.3px at 1440), line height 1.39.

> Set the font size on the **children**, not on `.code` itself. The children's container is `.code`; cqw on `.code` itself would resolve against the viewport.

- **HTML block:** `--code` grey, at the block's top-left (left 0, top 0).
- **Meta block:** `--comment` lighter grey, at left 51 %, top 0. Three comment lines:
  `<!-- distilled: N tokens -->`, `<!-- original: N tokens -->`, `<!-- url -->`.

Token numbers, with comma thousands separators:

| Card | Original | Distilled | Saved | % less | URL |
|---|---|---|---|---|---|
| home | 70,411 | 6,140 | 64,271 | 91% | kessler.co/ |
| price | 41,208 | 4,960 | 36,248 | 88% | kessler.co/pricing |
| case | 98,432 | 6,300 | 92,132 | 94% | kessler.co/cases/atlas-rail |
| vision | 55,870 | 8,215 | 47,655 | 85% | kessler.co/vision |
| alloy | 63,904 | 5,512 | 58,392 | 91% | kessler.co/products/k-alloy-7 |
| journal | 47,316 | 7,602 | 39,714 | 84% | kessler.co/journal |

The HTML text for each card, exactly as shown (two-space indents inside lists):

- **home:** `<h1>Kessler — Advanced materials</h1>`; `<p>` "Advanced materials for a stronger / tomorrow. Ceramic-matrix alloys made / with desert sand and solar heat." `</p>`; `<h2>At a glance</h2>` with `<li>` items: "Strength: 200x steel by weight", "Emissions: 87% lower", "Plants: Nevada, Atacama, Oman", "Founded: 2019"; `<h2>Products</h2>` with "K-Alloy 7 — structural", "Basalt fibre — tensile", "Ceramic matrix — thermal"; then `<a href="/demo">Book a demo</a>`.
- **price:** `<h1>Kessler — Pricing</h1>`; `<p>` "Three plans for every scale of / production. Start small, scale to / full foundry output." `</p>`; `<h2>Pilot — $299 / mo</h2>` with "Sample batches: 4 / mo", "Alloy grades: 2", "Support: email"; `<h2>Industrial — $2,400 / mo</h2>` with "Tonnage: up to 40 t / mo", "Alloy grades: all", "Certification: ISO 9001", "Support: dedicated engineer".
- **case:** `<h1>Case study: Atlas Rail</h1>`; `<p>` "How Atlas Rail cut track weight by / a third in eighteen months." `</p>`; `<h2>The challenge</h2>` `<p>` "1,200 km of desert line, rails / warping above 50 °C every summer." `</p>`; `<h2>The result</h2>` with "34% lighter track sections", "3.4x longer service life", "0 unplanned closures in 2025"; `<p>` "We stopped losing summers." / — Head of Infrastructure `</p>`.
- **vision:** `<article>`, `<h1>The Kessler vision</h1>`; `<p>` "Materials that outlast the people / who made them." `</p>`; `<p>` "We build where the sun is / strongest and the sand is free: / three plants, one closed loop." `</p>`; `<h2>Principles</h2>` `<ol>` with "Heat from the sun, not gas", "Sand in, scrap back in", "Publish every number"; `</article>`.
- **alloy:** `<h1>K-Alloy 7</h1>`; `<p>The carbon-negative alloy.</p>`; `<h2>Specification</h2>` with "Tensile strength: 1,940 MPa", "Density: 2.9 g/cm³", "Max service temp: 1,150 °C", "CO₂: −0.4 kg per kg made"; `<h2>Uses</h2>` with "Rail, bridges, turbine housings"; `<a href="/k-alloy-7.pdf">Datasheet</a>`.
- **journal:** `<h1>Kessler Journal</h1>`, `<p>Field notes from the flats.</p>`, then three `<article>`s, each with an `<h2>` title and a `<time>`: "Mining nothing but light" 2026-03-14 · "Atacama, year one" 2026-02-02 · "Why we melt sand at noon" 2026-01-09.

## Motion engine (one requestAnimationFrame loop)

### Geometry

Measure on load and on resize:
- `cw`, `ch` from the first card's rect.
- `gap` = `--gap` in px.
- The scanner `Lx = innerWidth / 2`.
- The canvas size = belt size × dpr.

### Belt position

- **Offset:** a single `off` in px. It starts at `W/2 − 0.62·cw`, so the first card is already about 12 % past the line on load.
- **Card position:** with `span = cw + gap` and `period = span × 6`, card i sits at `x = mod(off + i·span + span, period) − span`. Cards wrap invisibly off the left edge back to the far right.

### Speed

- **Auto speed:** `−0.075 × innerWidth` px per second, leftwards (about 108 px/s at 1440). It is 0 with reduced motion.
- **Hover:** entering the belt eases a `hover` value to 1 (rate 4/s); leaving eases it back to 0. The target speed is `auto × (1 − 0.65·hover)`, so the belt slows to 35 % under the cursor.
- **Easing:** when not dragging, `vel` eases towards the target at `1 − e^(−2.2·dt)`, then `off += vel·dt`.
- **Drag:**
  - `pointerdown` on the belt captures the pointer.
  - Each `pointermove` adds dx straight to `off` and estimates velocity: `dx / max(8ms, Δt) × 1000 × .8 + previous × .2`.
  - On release, that velocity carries as inertia and then eases back to the auto speed, so a flick right reverses the belt for a moment.
- **Wheel:** horizontal wheel input (when `|deltaX| > |deltaY|`) adds `−deltaX × 6` to the velocity.

### Per card, every frame

- `cut = clamp(Lx − x, 0, cw)` is how many pixels of the card are already past the scanner.
- **Card:**
  - `transform: translate3d(x, 0, 0)`.
  - `clip-path: inset(0 0 0 cut px round 0 1.6vw 1.6vw 0)` when cut > 0. The left side of a crossing card is a hard straight edge at the line.
  - A CSS mask `linear-gradient(90deg, transparent cut px, #000 cut+26 px)`, so the card softens into the particles over its first 26px.
- **Code block:** the same transform, `clip-path: inset(0 (cw − cut)px 0 0)`, and `visibility: hidden` while cut = 0. The code is revealed exactly where the card has been removed, as if printed by the scanner.

### The counter

- It follows the card currently crossing (0 < cut < cw), with progress `cut / cw`.
- Its target is `round((original − distilled) × progress)`.
- The shown number eases towards the target at `dt × 14`. When the crossing card changes, it snaps and the percent label updates to `round(saved / original × 100)% less`.
- Numbers use the en-US thousands format with a leading "−".

## The dissolve (canvas `drawFx`, for each card where cut > 0 and the card's right edge is still past the line)

### 1. Haze

- A horizontal linear gradient from `Lx` to `Lx + 150`, going from `rgba(255,96,40,.42)` to transparent.
- It fills a rect from the line, over the card's height, `min(150, x + cw − Lx)` px wide.
- The width must never be negative; that is why it is only drawn while the card's right edge is past the line.

### 2. Dithered particles fixed to the card surface

- **Grid:** the card is divided into a **3px grid in card-local coordinates**, so the dots travel with the card. Only columns from the cut to `R = 0.3·cw` past the line are walked.
- **Probability:** for each column at screen x `sx = x + gx·3`, with distance `d = sx − Lx`, the lighting probability is `p = (1 − d/R)^1.7`. It is almost solid at the line and thins to nothing 30 % of a card width away.
- **Rows:** rows run from −5 to `rows + 5`, so a few dots spill above and below the card.
  - Inside the card, a cell lights when `hash(gx, row, cardIndex) < p × 0.92`.
  - Outside the card, `p × .16`, fading out over 5 rows.
- **Hash:** a 32-bit integer hash. `h = (a·374761393 + b·668265263 + c·2147483647) | 0`, then `h = (h ^ (h >>> 13)) · 1274126177 | 0`, then `((h ^ (h >>> 16)) >>> 0) / 2³²`.
- **Twinkle:** cells are skipped when `hash(gx, row, floor(t × 9) + 97) < .22`. About a fifth of the dots blink, changing 9 times per second.
- **Colour:** from the palette `#FF4A12, #FF5A1F, #FF6B2C, #FF8A3D, #FFB06A, #FFD9B5, #FFF3E6`, chosen by a second hash `h2 = hash(row, gx, cardIndex + 31)`.
  - Within 10px of the line, use the three palest colours (index 4 + floor(h2 × 3)). The edge reads white-hot.
  - Elsewhere, use index `floor(h2² × 7)`, mostly deep oranges.
- **Size:** `1.1 + h2 × 1.7` px squares.
- **Jitter:** up to ±0.8px in x and y from the hashes, so the grid doesn't read as a grid.

### 3. Free sparks

- **Spawning:** each frame, up to 3 sparks (70 % chance each) spawn within 30px right of the line, anywhere from 10px above to 10px below the card.
- **Movement:** velocity x is −30…+40 px/s plus 60 % of the belt velocity; velocity y is ±25 px/s.
- **Look:** size .8–2.6px, random palette colour.
- **Life:** .3–1.1s. Alpha is `min(1, life × 2.2)`.
- Sparks drift off the line and over the code side like embers.

## Responsive (≤ 767px)

- **Card variables:** `--cw: 84vw; --ch: 54vw; --gap: 7vw; --top: 54svh`, or `58svh` when the height is ≤ 700px.
- **Nav:** the links, "Sign in" and "Start a free trial" are hidden; only the logo and the orange "Book a demo" pill (30px, 0 13px, 12px text) remain. Side padding is 16px.
- **Hero:** stacks to one column with 14px gaps and padding 18px 20px 0. Headline 34px, paragraph 14px, no max width, button 14px below.
- **Code mask:** the fade extends to 30vw.
- All card internals scale automatically through cqw.

## Reduced motion

- Auto speed is 0, so the belt stands still with one card mid-crossing.
- The particles stop twinkling and jittering, and no sparks spawn.
- Dragging still works, so the comparison can be scrubbed by hand.

## Acceptance checklist

- At 1440 × 810 the headline block sits top-left and the paragraph with the orange pill sits top-right.
- The belt's cards are about 662 × 421px with about 68px gaps, the orange scanner stands at exactly x = 720, and the "Token reduction" pill rides above it.
- A dark card crossing the line shows a dense, flickering orange pixel cloud fading out about 200px into the card, with the card's left edge cut straight at the line.
- Immediately left of the line, that card's HTML and its three comment lines appear in 10px grey mono. They fade out towards the screen's left edge.
- The counter rises (in magnitude) smoothly while a card crosses, and jumps to the next card's percentage when a new card starts crossing.
- Dragging right rebuilds the card from its code; letting go resumes the leftward drift.