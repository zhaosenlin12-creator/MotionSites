# Prompt: Oda Nobunaga, "Unifiers of Japan" hero and bio

Build a single-file **two-section page** about the warlord Oda Nobunaga. Use plain HTML, CSS and vanilla JS, with no framework and no build step.

- **Section 1:** a full-bleed signal-red hero in a flat vector illustration style. A giant two-line title sits behind the lord, and a kanji line sits above it.
- **Scroll beat:** as you scroll the first ~70 % of a screen, samurai armour builds onto the lord piece by piece while the camera pushes in on his face. Red cherry petals fall over everything.
- **Section 2:** a cream bio panel with the clan crest, six stats and a centred statement card.

## Media (all URLs used)

| Asset | URL | Notes |
|---|---|---|
| Lord in kimono (base layer) | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/5b4e0901-a420-4d48-a2f8-0983ac5e1811.webp | 2048×2048 with alpha; covers the whole stage |
| Armour: side flaps | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/df3f02d3-42b8-4d75-a592-363d4f9e97b3.webp | Placed at left 26.172 %, top 37.598 %, width 47.412 %, height 22.607 % of the stage |
| Armour: chest plate | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f1d71bb6-a9c7-4956-ad93-7de36b6bdee3.webp | 31.299 % / 55.713 % / 37.549 % / 44.287 % |
| Armour: demon mask | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fe02860a-fb96-4451-b0cb-55156e3573d2.webp | 38.672 % / 37.598 % / 22.803 % / 21.924 % |
| Armour: helmet | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7229bca2-f88f-43c1-914b-37bf5e6321c3.webp | 27.734 % / 4.932 % / 44.531 % / 32.666 % |
| Armour: crescent horns | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e71cba83-443b-4d04-9959-f64286de1604.webp | 29.834 % / 5.127 % / 40.332 % / 26.172 % |
| Falling petals loop | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2c1e0be2-077e-464f-9797-ff6ee91769ac.mp4 | 720×720, 5 s, red petals on chroma green; load with `crossorigin="anonymous"` |
| Clan crest (five-lobed mokko) | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/857c3bc4-0da2-4095-8d2c-64274974833b.webp | Red, alpha |
| Fan / pine icon | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/425a6870-25c3-4155-a076-e2146f3587db.webp | Red, alpha |

The five armour pieces were cut from one drawing that lines up exactly with the base layer. Stack them over the base in this order: flaps, chest, mask, helmet, horns.

### Fonts

Self-host them; the single file embeds them as base64 woff2.

| Font | Use | Source |
|---|---|---|
| Anton | Title | https://fonts.googleapis.com/css2?family=Anton |
| Mochiy Pop One | Kanji | https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&text=織田信長 (subset to those 4 characters) |
| Archivo variable (width 62–125, weight 100–900) | Everything else | https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900 |

## Palette and scale

| Token | Value |
|---|---|
| Red | `#E40038` |
| Cream | `#FAF3E9` |
| Ink | `#201408` |

- **Scale unit:** `--u = 100vw / 1507`, so the page is designed on a 1507px frame. `--side = 121u`.
- **Paper grain:** an SVG fractal-noise overlay at 16 % opacity in multiply blend sits on both sections.

## Section 1: hero (height 1440u, red, `overflow:hidden`)

- **Nav:** 84u tall with a 1px cream (50 %) bottom rule. Three centred items, MENU, ABOUT and STUDIO: Archivo 30u, weight 900, width 84 %, uppercase.
- **Frame:** two vertical 1px cream (50 %) rules at `--side` from each edge, starting under the nav.
- **Side labels:** small rotated labels (11u, 800, uppercase, +.08em tracking) centred in each side gutter.
  - **Left**, rotated -90°: "01 / 05" at 225u, "ODA NOBUNAGA" at 560u, "UNIFICATION OF JAPAN" at 1010u, "01 / 05" at 1330u.
  - **Right**, rotated 90°: the same labels, with the two middle ones swapped.
- **Kanji:** "織田信長" in Mochiy Pop One 56u, centred, at top 158u.
- **Title:** two Anton lines in cream, each stretched to fill its box exactly. Measure Anton's cap height on a canvas, set the font size so the caps fill the box height, and use SVG `textLength` + `lengthAdjust="spacingAndGlyphs"` for the width.
  - "ODA": 392u × 258u, top 252u.
  - "NOBUNAGA": 1120u × 266u, top 526u.
- **Stage:** 1386u square, centred, top 54u, above the title. It holds the base webp and the five armour pieces, each absolutely placed by the percentages above.
- **Petals:** a 1507u square WebGL canvas over everything. Each frame it draws the petals video, with alpha keyed from redness: `a = smoothstep(.12,.75, r - g*.5)`, green clamped to blue, premultiplied. That leaves clean red petals with no green fringe.

## The suit-up (scroll-driven)

- **Progress:** `p = clamp((scrollY - 0.06·vh) / (0.62·vh))`, smoothed by 20 % per frame.
- **Camera:** the inner layer scales `1 + 0.3·easeInOutCubic(p)` and moves up `-4 %·easeInOutCubic(p)`, so it pushes in on his face.
- **Pieces:** each one grows from an anchor inside the 2048px drawing. Before its window it is invisible; inside the window it snaps to full opacity in the first ~7 %, then scales from (sx, sy) up to (1, 1).

| Piece | Anchor (x, y) | Window of p | Start scale (sx, sy) | Ease |
|---|---|---|---|---|
| Mask | 1024, 960 | .16–.46 | .72, .72 | easeOutCubic |
| Helmet | 1024, 600 | .22–.54 | .12, .30 | backOut 1.25 |
| Flaps | 1024, 770 | .30–.60 | .25, .65 | easeOutCubic |
| Horns | 1024, 640 | .40–.70 | .12, .10 | backOut 1.4 |
| Chest | 1024, 1185 | .34–.74 | .55, 0 | easeOutCubic |

The mask closes over his face, the helmet grows out of his forehead, the flaps open out, the horns shoot up, and the chest plate drops down from his neck. Scrolling back up takes everything off in reverse.

## Load reveal (Web Animations)

| Element | Animation | Duration | Delay |
|---|---|---|---|
| Title lines | Rise out of their masks (translateY 102 % → 0) | 1.1s | 150 / 290ms |
| Kanji | Rises 16u while fading in | — | 60ms |
| Nav and side labels | Fade in | 0.7s | 120ms + 25ms each |
| Stage | Rises 6 % | 1.3s | — |

All of them use `cubic-bezier(.2,.8,.2,1)`.

## Section 2: biodata and introduction (cream)

- **Rules:** the same two vertical side rules, in red at 55 %.
- **Biodata row:** 324u tall, with a red rule underneath. Side labels: "BIODATA" on the left, "02 / 05" on the right.
  - **Left block** (at 200u, 290u wide): the label "[ CREST OF THE ODA CLAN ]" (10.5u, 700, uppercase), with the crest under it at 232u wide.
  - **Right side:** a 2 × 3 stat grid from 560u to 150u from the right. Each stat is a tiny label above a value in Archivo 31u, weight 900, width 90 %, uppercase:

| Label | Value |
|---|---|
| POSITION | ODA CLAN LEADER |
| CONTROL | 1/3 OF JAPAN |
| TIMELINE | 1534 — 1582 |
| POWER | 22 YRS IN POWER |
| CAPITAL | AZUCHI CASTLE |
| LEGACY | MILITARY INNOVATION |

- **Introduction card:** 134u side margins, a 1px red (70 %) border, and a 30u circle on each corner with its centre on the corner point.
  - The fan icon (118u) sits centred at the top.
  - The statement is in Archivo 50u, weight 900, width 96 %, line height 1, uppercase, one line per row:
    > ODA NOBUNAGA IS KNOWN AS THE / FIRST GREAT UNIFIER OF JAPAN - / A DAIMYŌ WHO OVERTHREW THE / ASHIKAGA SHOGUNATE AND ENDED / YEARS OF FEUDAL WARS IN JAPAN
  - Under it, a 19u paragraph, 500 wide max: "Accounts describe him as tall, lean and lightly bearded. His ambition made him ruthless, yet he was a clear-eyed realist, respected for making the hard calls."
  - Side labels: "03 / 05", "ODA NOBUNAGA", "INTRODUCTION".

## Mobile (≤ 767px)

- `--u = 100vw / 1300` and `--side = 22px`.
- **Hero:** height `max(100svh, 178vw)`. The nav is 56px tall; the kanji sits at 86px and the title starts at 130px. The stage becomes 150vw square, anchored to the bottom centre.
- **Bio:** the crest and stats stack, with the stats in two columns.
- **Card:** the statement drops to `min(4vw, 22px)`.

## Reduced motion

Skip the reveal, show the full armour (p = 1) and pause the petals.