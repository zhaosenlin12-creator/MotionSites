# Kolibrie Studio: recreation prompt

Build a three-section landing page for **Kolibrie**, a fictional studio that makes short-form social films, reels and motion. It is a single self-contained HTML file (one inline `<style>`, one inline `<script>`, four self-hosted fonts) with a warm golden-hour, cream-and-tomato look. The three sections are: a full-screen **hero** with a looping video background and a photo card that follows the cursor; a pinned **"Latest drops"** section with copy on the left and a 3D stack of five case cards on the right that peels away as you scroll; and a tall **"Meet the flock"** team section where the heading stays fixed in the centre, the page fades to near-black, and twelve photos rise past on both sides at different speeds. Every animation and interaction below must be rebuilt exactly, with the same libraries, timings, easings and numbers.

---

## 1. Libraries (load in this order, at the end of `<body>`)

| Library | URL |
|---|---|
| GSAP 3.13.0 | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js |
| ScrollTrigger | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js |
| SplitText | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js |
| DrawSVGPlugin | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/DrawSVGPlugin.min.js |
| InertiaPlugin | https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/InertiaPlugin.min.js |
| Lenis 1.3.17 | https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js |

Register ScrollTrigger, SplitText, DrawSVGPlugin and InertiaPlugin. If GSAP fails to load, make everything visible immediately (the page must never stay hidden). There is also a 4-second failsafe: if the page has not marked itself ready by then, reveal everything.

## 2. Fonts

Self-host the latin woff2 subset of each (in the standalone file they are embedded as base64 data URIs). All come from Google Fonts.

| Family | Use | Axes / settings | Google Fonts source |
|---|---|---|---|
| Archivo (variable) | Heavy condensed grotesk: headlines, nav, labels, card titles | wght 100–900, wdth 62–125. Headlines use `"wght" 700, "wdth" 72`; card titles and badge `"wght" 800, "wdth" 72` | https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900 |
| Playfair (variable, the 2.0 family "Playfair", not "Playfair Display") | Light high-contrast serif for the alternate headline words, eyebrows, paragraph, link | opsz 5–1200, wdth 87.5–112.5, wght 300–900. Alt headline words `"wght" 300, "wdth" 87.5, "opsz" 120`; eyebrows `"wght" 500, "wdth" 87.5, "opsz" 40`; paragraph `"wght" 400, "wdth" 100, "opsz" 20` | https://fonts.googleapis.com/css2?family=Playfair:opsz,wdth,wght@5..1200,87.5..112.5,300..900 |
| Yellowtail | Script wordmark "Kolibrie" (nav logo and team stamp) | regular | https://fonts.googleapis.com/css2?family=Yellowtail |
| Titan One | Bubbly name stickers on team photos | regular | https://fonts.googleapis.com/css2?family=Titan+One |

Declare Archivo with `font-weight: 100 900; font-stretch: 62% 125%` and Playfair with `font-weight: 300 900; font-stretch: 87.5% 112.5%`, all with `font-display: swap`.

## 3. Head, tokens and the scaling system

- Title: **Kolibrie Studio**. Meta description: "Kolibrie: a small studio for scroll-stopping reels, films and motion." Standard UTF-8 charset and `width=device-width, initial-scale=1` viewport.
- Colour tokens: cream `#faf3e4` (page background), ink `#141110` (text), tomato `#ef4a23` (accent), butter `#ffd46e`, sky `#8fc6e8`, pink `#f6a9c2`, sage `#b9c48a`, white `#ffffff`, night `#141110` (dark-theme background). A `--page` variable holds the current page background and defaults to cream.
- Scaling: everything is sized in `rem`, and the root font size is fluid. Desktop: `html { font-size: calc(100vw / 90) }`, so 1 rem = 16 px at 1440 px wide. At 991 px wide and below: `calc(100vw / 60)`. At 600 px and below: `calc(100vw / 24.375)` (16 px at a 390 px phone).
- Reset: border-box everywhere, zero margins and padding, links inherit colour with no underline, images are block-level. The body uses the page token as its background with `transition: background-color .7s cubic-bezier(.65,.05,0,1)`, ink text, Archivo, and `overflow-x: clip`.
- Lenis helper rules: `html.lenis, html.lenis body { height: auto }` and `.lenis.lenis-smooth { scroll-behavior: auto !important }`.
- Before the page is ready, `main` is `visibility: hidden` (until `html[data-page-ready]` is set). Every element marked for a text or scroll reveal starts `visibility: hidden` and is shown by the reveal code.

### Shared type styles

| Style | Font | Size (desktop / ≤991 / ≤600) | Other |
|---|---|---|---|
| Hero headline | Archivo 700, wdth 72 | 9 rem / 6.4 rem / 4 rem | uppercase, letter-spacing −0.02em, line-height 0.8em |
| Section headline | Archivo 700, wdth 72 | 8 rem / 6 rem / 4.2 rem (team headline: 7 rem desktop, 4.2 rem phone) | same as above |
| Alternate headline word | Playfair 300, wdth 87.5, opsz 120 | inherits | letter-spacing −0.035em |
| Eyebrow M | Playfair 500, wdth 87.5, opsz 40 | 2.5 rem / – / 1.75 rem | letter-spacing −0.03em, line-height 1em |
| Eyebrow S | same as M | 2 rem / – / 1.5 rem | same |
| Paragraph | Playfair 400, wdth 100, opsz 20 | 1.25 rem | line-height 1.35, letter-spacing −0.01em |

SplitText line wrappers get `padding-bottom: .06em; margin-bottom: -.06em` so descenders aren't clipped by the line masks.

## 4. Assets (all direct generation links, never re-hosted)

Images are served through the Higgsfield resizer, in the form `https://images.higgs.ai/?default=1&output=webp&url=<url-encoded result URL>&w=<width>&q=85`.

| Asset | What it is | Native size | URL used |
|---|---|---|---|
| Hero video | Kling 3 loop (5.04 s, 1280×720, H.264, 24 fps, no sound): olive branch swaying hard on the left with sun flare flickering through it, leaf shadows racing across a terracotta wall on the right, empty flat cream centre | 1280×720 | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261110_231342_88260d66-aa30-4612-9157-d7f1b5a66d8c.mp4 |
| Hero plate (video poster and reduced-motion still) | The same scene as a still | 2048×1360 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224241_f6feccd5-1c45-4d22-b369-f927916f9973.png&w=2048&q=85 |
| Work sheet 1 | 2×2 grid of 16:9 campaign stills: 0 giant orange in sunglasses on a red vintage car roof on a Tuscan road, 1 woman laughing on a striped lilo in a turquoise pool from above, 2 croissant tower on a bakery counter with a hand grabbing one, 3 skateboarder mid-ollie on a sun-baked street | 2688×1520 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_b0899b4d-5876-4c63-98d3-8608d8dbe790.png&w=2400&q=85 |
| Work sheet 2 | 2×2 grid: 0 friends at a night-market food stall under string lights, 1 surfer carrying a board along a sunset beach, 2 orange scooter by a pastel wall with bougainvillea, 3 orange soda bottle splashing on cream | 2688×1520 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_aee93a53-873f-470f-afb3-6395c22ab639.png&w=2400&q=85 |
| Team sheet 1 | 2×2 grid of 3:4 portraits in a sunny old street: 0 woman with a coffee cup, 1 man with a film camera and backpack, 2 man in a hoodie and green jacket sitting on a wall, 3 woman in a red beanie | 1744×2336 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224239_be9bd6b1-debb-4a95-aadf-1a36e4d2f557.png&w=1600&q=85 |
| Team sheet 2 | 2×2 grid: 0 woman eating fries on a bench, 1 man laughing against a terracotta wall, 2 man with red headphones round his neck, 3 woman with curly hair and glasses | 1744×2336 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bfc657e7-cbc1-43fb-a726-e8be5dd42302.png&w=1600&q=85 |
| Behind-the-scenes sheet | 2×2 grid: 0 cinema camera on a gimbal in a sunny street, 1 hands holding a blank clapperboard, 2 phone on a mini tripod filming a plate of pasta, 3 boom microphone and a gold reflector at sunset | 1744×2336 | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261110_224238_bf8567fa-9d67-4f1e-b4e0-5662c0bf70e4.png&w=1600&q=85 |

### Cropping one photo out of a sheet (no local slicing)

Each photo on the page is a `.crop` box with the attribute `data-crop="<sheet>:<cell>"` (cells 0–3, row-major). A script fills it at load: it inserts a `.cell` div whose aspect ratio is the cell's own ratio, sized to cover the box (`position: absolute; centred with translate(-50%,-50%); aspect-ratio: var(--ar); width: max(100cqw, calc(100cqh * var(--ar)))`; the box is `container-type: size; overflow: hidden`). Inside the cell is an `<img>` of the whole sheet, `position: absolute; max-width: none`, with width = sheetW / cellW × 100 %, height = sheetH / cellH × 100 %, left = −cellX / cellW × 100 %, top = −cellY / cellH × 100 %. Images are `loading="lazy"` and `decoding="async"`. Cell rectangles in source pixels `[x, y, w, h]`, each then inset by 4 px on every side so the white gutters never show:

| Sheet | Cell 0 | Cell 1 | Cell 2 | Cell 3 |
|---|---|---|---|---|
| work1 (2688×1520) | 0,0,1336,752 | 1352,0,1336,752 | 0,768,1336,752 | 1352,768,1336,752 |
| work2 (2688×1520) | 0,0,1335,749 | 1356,0,1332,749 | 0,770,1335,750 | 1356,770,1332,750 |
| team1 (1744×2336) | 0,0,864,1156 | 881,0,863,1156 | 0,1175,864,1161 | 881,1175,863,1161 |
| team2 (1744×2336) | 0,0,864,1159 | 880,0,864,1159 | 0,1176,864,1160 | 880,1176,864,1160 |
| bts (1744×2336) | 0,0,865,1160 | 881,0,863,1160 | 0,1176,865,1160 | 881,1176,863,1160 |

## 5. Page structure, top to bottom

### 5.1 Load wipe (fixed overlay)

A fixed full-screen layer (`z-index: 1000`, no pointer events, `overflow: clip`) holds one SVG (viewBox 0 0 1000 1000, `preserveAspectRatio="none"`, filling the screen) with a single tomato, round-capped, round-joined stroked path: `M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001`. Its initial stroke width is 0. Once the overlay gets `data-transition-ready` it is `display: none`.

### 5.2 Cursor label ("View case →")

A fixed element at the top-left (`z-index: 100`, no pointer events) containing a butter-yellow card 9.5 rem wide with `overflow: hidden`, scaled to 0 by default with `transition: transform .4s cubic-bezier(.65,.05,0,1)`. When its wrapper has `data-cursor-marquee-status="active"` the card scales to 1. Inside are two copies of the text "View case →" (Archivo 700 wdth 72, uppercase, 1.3 rem, padding .375em .25em, no wrap); the second sits at `left: 100%`. Both run a CSS keyframe that moves them to translateX(−100%) linearly forever, paused by default.

### 5.3 Nav (fixed, z-index 50)

Padding 1.25 rem top/bottom and 1.5 rem left/right, a flex row with space-between; the bar itself ignores pointer events but its children don't.
- Left: the wordmark "Kolibrie" in Yellowtail, 3.6 rem, line-height 1, tomato, rotated −8° around its left-centre, margin-top .2 rem. It links to the top.
- Centre, absolutely centred at top 1.25 rem: a white pill 3 rem tall, padding 0 1.25 rem, gap 1.5 rem, holding three uppercase links in Archivo 700 wdth 72 at 1.05 rem, letter-spacing −0.01em: **About** (to the team section), **Work**, **Services** (both to the work section). Each link is a column flex with an empty underline box under it (absolute, full width, top 100 %, height .5em, tomato) that the draw-underline effect fills on hover.
- Right: a white box in the same style with gap .5 rem: a .45 rem tomato dot, then **Contact** (to the team section).
- At 991 px and below the centre pill is hidden. At 600 px and below the nav padding is 1 rem, the logo 2.6 rem, and the Contact box 2.5 rem tall at .95 rem text with .9 rem side padding.
- Every in-page `#` link scrolls smoothly with Lenis (`lenis.scrollTo(target, { duration: 1.4 })`; native smooth scroll under reduced motion).

### 5.4 Hero (100vh, `data-cursor-cards`, threshold 300)

`height: 100vh`, overflow hidden, content centred both ways.
- **Background video**: an absolutely positioned full-bleed `<video muted loop playsinline preload="auto" aria-hidden>` with `object-fit: cover; object-position: center 50%` (on phones `6% 50%`, which keeps the olive branch in view). Its poster is the hero plate. Unless reduced motion is on, its src is the Kling video and it plays. With reduced motion the src is removed and only the poster shows. This is re-checked when the setting changes.
- **Cursor card** (z-index 1, behind the text): a 16 rem square, centred with `translate: -50% -50%` (use the CSS `translate` property so GSAP's x/y stack on top of it), `overflow: hidden`, hidden at start. Inside is a media layer scaled to 1.2 that holds eight stacked crop boxes, of which only the one with class `on` is visible. In order: work2:1 surfer, work1:0 orange car, work2:3 soda, work1:1 pool, work2:2 scooter, work1:2 croissants, work2:0 night market, work1:3 skater.
- **Content** (z-index 2, column flex, centred, gap 2 rem, margin-top −3 rem):
  - The headline (h1) on two lines: "Stories that" / "get **shared**", where "shared" is the alternate serif word. Rendered in uppercase: "STORIES THAT / GET SHARED". The h1 has `data-text-reveal="chars"` and the font-weight hover (rest 700, near 200, radius 400). The span around "shared" has its own font-weight hover (rest 300, near 800, radius 400).
  - The link "See the reel" (Playfair 500, wdth 87.5, opsz 40, 2.1 rem, letter-spacing −0.03em, line-height 1, gap .375em), linking to the work section. The text has an always-on drawn underline: its box sits at top 118 %, height .6em, tomato. Next to it is a 1em tomato square with a white down-arrow (a two-copy wrapper; on hover the copies slide down 100 % with `transform .525s cubic-bezier(.175,.885,.32,1.275)`). The arrow path in a 14×13 box: `M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z`.
- **Client marquee**: absolutely positioned at bottom 1.5 rem, full width, z-index 2. One collection of eight tomato abstract icon marks drawn as inline SVG (made-up logos, not real brands): a six-spoke asterisk of round-capped strokes; two capsule "D" shapes side by side; three wavy lines; four diamonds in a diamond pattern; a half sun over three bars; two arches; a four-point sparkle star; a circle with a cross inside. Each sits in a 9×7 rem box with 2.5 rem side margins, with the icon at 60 %. Phones: 5.5×5 rem boxes with 1 rem margins. Settings: direction left, speed 30, scroll speed 10, duplicate 2 (behaviour in section 6).
- Phones (≤600 px): content gap 1.4 rem, margin-top 5 rem, side padding 1 rem, link 1.6 rem. The cursor card is always visible as a static 7.5 rem card at top 13 %, centred horizontally, rotated −5°, showing the first photo.

### 5.5 "Latest drops" (two columns, pinned)

The section has `data-featured-stack` with scroll factor 1.2. Inside, a pin element 100vh tall uses a two-column grid (38fr / 62fr, gap 2 rem, padding 0 3 rem 0 5 rem, items centred vertically, overflow hidden).
- **Left column** (column flex, gap 1.5 rem, centred vertically; one scroll-reveal group):
  - Eyebrow S, max-width 26 rem: "Made to be watched twice. A handful of what left our edit desk lately." (line reveal)
  - Section headline: "Latest" + alternate serif "drops" (uppercase "LATEST DROPS", wrapping to two lines in the column). Char reveal, plus the font-weight hover (heavy word rest 700 → near 200, serif word rest 300 → near 800, radius 400).
  - Nothing else: no list and no button.
- **Right column (stage)**: `position: relative; height: 100%; perspective: 1400px`. Inside is a full-height stack root (`transform-style: preserve-3d`) with five slides, each `position: absolute; aspect-ratio: 1.75; width: min(80vh, 52vw); left: 50%; top: calc(50% - 5vh); translate: -50% -50%`. Each slide is a link card: a solid colour frame with padding 1.75vh, a crop box filling it, a bottom gradient overlay inset 1.75vh (`linear-gradient(#0000 55%, #0006)`), and a centred title at bottom 2.4em in Archivo 800 wdth 72, uppercase, 7.5vh, line-height .8, letter-spacing −0.02em, cream, with a soft text-shadow `0 .05em .3em rgba(0,0,0,.25)`. Every card carries `data-cursor-marquee-text="View case →"`. Front to back:

| # | Title | Frame colour | Photo |
|---|---|---|---|
| 1 | SQUEEZE THE SUN | tomato | work1:0 |
| 2 | DEEP END DAYS | sky | work1:1 |
| 3 | FLAKE & BAKE | butter | work1:2 |
| 4 | CURB APPEAL | sage | work1:3 |
| 5 | NIGHT BITES | pink | work2:0 |

- **Badge**: absolute at bottom-right of the stage (right 1 rem, bottom 1 rem), 9×9 rem, z-index 5. An SVG (viewBox 200×200) with a tomato circle r 98; around it, on a circle path of radius 70, the text "SCROLL · SAVE · SHARE · REPEAT ·" in Archivo 800 wdth 80, 24 px, cream, stretched to `textLength 436` with `lengthAdjust="spacing"`; in the middle, a cream outline sun (a circle r 17 plus eight round-capped rays, stroke 5).
- **≤991 px**: no pinning. Single column, height auto, padding 6 rem 1.5 rem 4 rem, gap 3 rem. The cards become a vertical list (relative position, full width, gap 1.5 rem), frame padding 1 rem, title 3.4 rem at bottom 1.6em (2 rem on phones), and the badge is hidden.

### 5.6 "Meet the flock" (tall, sticky title, dark theme)

The section is 340vh tall (260vh at 991 px and below) and has `data-page-theme="dark"`.
- **Sticky title** (`position: sticky; top: 0; height: 100vh`, content centred, z-index 1). A column flex with gap 1.4 rem, centred text, as one scroll-reveal group:
  - A stamp sticker (absolute, 10 rem wide, left −3 rem, top −8 rem, rotated −10°): an SVG ellipse (rx 104, ry 58) with a cream fill and a 10-unit tomato stroke, with "Kolibrie" in Yellowtail 54 px tomato rotated −8° inside. It has the momentum hover.
  - Eyebrow M: "The people behind the frames" (line reveal).
  - Headline at 7 rem: serif "Meet", heavy "the", serif "flock", shown as "MEET THE FLOCK" with only "THE" heavy. Char reveal, plus the font-weight hover (heavy rest 700 → 200, serif words rest 300 → 800, radius 400).
  - Paragraph, max-width 26 rem: "Twelve makers, one group chat. We shoot, cut and animate before the coffee goes cold."
- **Photo layer** (absolute over the whole section, z-index 2, no pointer events except on the photos): twelve absolutely placed photo cards. Each has a 4:5 crop with a warm placeholder background `#e9dcc6`, a rotation, and a parallax speed. Team members get a name sticker: Titan One 3.4 rem, tomato fill with a .32 rem cream stroke (`-webkit-text-stroke` with `paint-order: stroke fill`), centred at bottom −0.9 rem, rotated by its own angle. Behind-the-scenes shots get a caption tag instead: a cream box at bottom-left .7 rem, Archivo 700 wdth 72, uppercase, .9 rem, padding .25 .5 rem.

| Side | Offset | Top | Width | Rotate | Speed | Photo | Label |
|---|---|---|---|---|---|---|---|
| left | 2.5vw | 3 % | 14 rem | −4° | 1 | team1:0 | Noor (−7°) |
| left | 21vw | 19 % | 11 rem | 3° | 0.6 | bts:0 | ON SET |
| left | 3vw | 33 % | 13 rem | 5° | 1.3 | team1:1 | Sem (4°) |
| left | 23vw | 49 % | 13.5 rem | −3° | 0.8 | team2:3 | Mila (−5°) |
| left | 2vw | 64 % | 11.5 rem | −6° | 1.15 | bts:2 | DINNER, IN 9:16 |
| left | 20vw | 79 % | 14 rem | 4° | 0.7 | team1:2 | Daan (6°) |
| right | 3vw | 2 % | 13.5 rem | 4° | 0.75 | team2:0 | Lotte (5°) |
| right | 22vw | 17 % | 11 rem | −5° | 1.25 | bts:1 | TAKE ONE |
| right | 2.5vw | 32 % | 14 rem | −3° | 0.9 | team2:1 | Jules (−6°) |
| right | 23vw | 48 % | 13 rem | 5° | 1.4 | team1:3 | Yara (4°) |
| right | 3vw | 63 % | 11.5 rem | 6° | 0.65 | bts:3 | GOLDEN HOUR |
| right | 20vw | 78 % | 14 rem | −4° | 1.05 | team2:2 | Kenji (−4°) |

The photos form two staggered columns per side: an outer one at the edge and an inner one that slides across the ends of the centred title as it rises. The photo layer (z-index 2) is always above the sticky title (z-index 1), so the title text sits behind the photos as they pass over it.
- **Phones (≤600 px)**: the photos stay above the title; every photo is 8 rem wide, the odd ones pinned to −1 rem from their edge and the even ones at 4 rem from it, so they pass over the title; and only one photo sits at any height: their tops are overridden so they alternate left and right down the section (left photos 1–6 at 1, 17, 33, 49, 65, 81 %; right photos 1–6 at 9, 25, 41, 57, 73, 89 %); name stickers are 1.9 rem with a .22 rem stroke; caption tags are hidden. The stamp is 6 rem at left 0, top −5 rem, and the title gets side padding 1.5 rem.
- **Dark theme**: while this section is active, `html[data-theme="dark"]` sets the page background to night `#141110` (the body fades over .7 s with `cubic-bezier(.65,.05,0,1)`) and the section's text to cream over the same .7 s. Photos, stickers, nav boxes and the logo keep their colours.

## 6. Motion and interactions (all exact)

### 6.1 Smooth scroll
Lenis with `{ lerp: 0.165, wheelMultiplier: 1.25 }`, driven by the GSAP ticker (`lenis.raf(time * 1000)`), with `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker.lagSmoothing(0)`. Lenis is off under reduced motion.

### 6.2 Load sequence
Start when `document.fonts.ready` resolves, or after 1.5 s, whichever comes first. Set `html[data-page-ready]`. Then run one timeline:

| Time | What happens |
|---|---|
| 0 s | main `autoAlpha: 0`; the wipe path is set to `drawSVG: "0% 100%"` and `strokeWidth: "30%"`, so the thick tomato scribble covers the screen |
| 0.4 s ("reveal" label) | main becomes visible; the text reveal starts with a base delay of 0.6 s; page init runs (all scroll and hover systems); the path tweens to `drawSVG: "100% 100%"`, `strokeWidth: "5%"` over 1.25 s, `power1.inOut`, which unwinds the scribble off the screen; when it finishes, the overlay gets `data-transition-ready` and is hidden |
| ~1.3 s after init | the hero link's always-on underline draws in (0.6 s) |

Under reduced motion: no wipe, no Lenis; main shows instantly, reveals are skipped, and init still runs.

### 6.3 Text reveal on load (`data-text-reveal`)
SplitText with `type: "chars,words,lines"` for chars mode or `"lines,words"` for lines mode, `linesClass: "line"`, `charsClass: "char"`, `mask: "lines"`, and `autoSplit` off whenever the element has the font-weight hover (so the hover keeps the same char nodes). Tween chars (or lines) from `yPercent: 135` to 0, duration 1, `expo.out`. Chars stagger `0.07 × 0.25 = 0.0175 s` each from the start; lines stagger 0.07 s. Inside a `data-text-reveal-group`, each later element adds 0.12 s. When done, dispatch a `reveal:done` event.

### 6.4 Scroll reveal (`data-scroll-reveal`)
Same split settings and the same tween (`yPercent 135 → 0`, 1 s, `expo.out`, stagger 0.07, or 0.0175 for chars). Mode `"element"` is a plain `y: 24, autoAlpha: 0 → 0, 1` over 0.8 s `expo.out`. Elements inside a `data-scroll-reveal-group` go into one timeline triggered once at `"top 85%"` of the group, 0.12 s apart. As above, `autoSplit` is off when the element has the font-weight hover.

### 6.5 Draw underline (`data-draw-line`)
Six hand-drawn stroke variants (viewBox 310×40, stroke width 10, round caps, `currentColor`, `preserveAspectRatio="none"`), cycled in order from a random start:
1. `M5 20.9999C26.7762 16.2245 49.5532 11.5572 71.7979 14.6666C84.9553 16.5057 97.0392 21.8432 109.987 24.3888C116.413 25.6523 123.012 25.5143 129.042 22.6388C135.981 19.3303 142.586 15.1422 150.092 13.3333C156.799 11.7168 161.702 14.6225 167.887 16.8333C181.562 21.7212 194.975 22.6234 209.252 21.3888C224.678 20.0548 239.912 17.991 255.42 18.3055C272.027 18.6422 288.409 18.867 305 17.9999`
2. `M5 24.2592C26.233 20.2879 47.7083 16.9968 69.135 13.8421C98.0469 9.5853 128.407 4.02322 158.059 5.14674C172.583 5.69708 187.686 8.66104 201.598 11.9696C207.232 13.3093 215.437 14.9471 220.137 18.3619C224.401 21.4596 220.737 25.6575 217.184 27.6168C208.309 32.5097 197.199 34.281 186.698 34.8486C183.159 35.0399 147.197 36.2657 155.105 26.5837C158.11 22.9053 162.993 20.6229 167.764 18.7924C178.386 14.7164 190.115 12.1115 201.624 10.3984C218.367 7.90626 235.528 7.06127 252.521 7.49276C258.455 7.64343 264.389 7.92791 270.295 8.41825C280.321 9.25056 296 10.8932 305 13.0242`
3. `M5 29.5014C9.61174 24.4515 12.9521 17.9873 20.9532 17.5292C23.7742 17.3676 27.0987 17.7897 29.6575 19.0014C33.2644 20.7093 35.6481 24.0004 39.4178 25.5014C48.3911 29.0744 55.7503 25.7731 63.3048 21.0292C67.9902 18.0869 73.7668 16.1366 79.3721 17.8903C85.1682 19.7036 88.2173 26.2464 94.4121 27.2514C102.584 28.5771 107.023 25.5064 113.276 20.6125C119.927 15.4067 128.83 12.3333 137.249 15.0014C141.418 16.3225 143.116 18.7528 146.581 21.0014C149.621 22.9736 152.78 23.6197 156.284 24.2514C165.142 25.8479 172.315 17.5185 179.144 13.5014C184.459 10.3746 191.785 8.74853 195.868 14.5292C199.252 19.3205 205.597 22.9057 211.621 22.5014C215.553 22.2374 220.183 17.8356 222.979 15.5569C225.4 13.5845 227.457 11.1105 230.742 10.5292C232.718 10.1794 234.784 12.9691 236.164 14.0014C238.543 15.7801 240.717 18.4775 243.356 19.8903C249.488 23.1729 255.706 21.2551 261.079 18.0014C266.571 14.6754 270.439 11.5202 277.146 13.6125C280.725 14.7289 283.221 17.209 286.393 19.0014C292.321 22.3517 298.255 22.5014 305 22.5014`
4. `M17.0039 32.6826C32.2307 32.8412 47.4552 32.8277 62.676 32.8118C67.3044 32.807 96.546 33.0555 104.728 32.0775C113.615 31.0152 104.516 28.3028 102.022 27.2826C89.9573 22.3465 77.3751 19.0254 65.0451 15.0552C57.8987 12.7542 37.2813 8.49399 44.2314 6.10216C50.9667 3.78422 64.2873 5.81914 70.4249 5.96641C105.866 6.81677 141.306 7.58809 176.75 8.59886C217.874 9.77162 258.906 11.0553 300 14.4892`
5. `M4.99805 20.9998C65.6267 17.4649 126.268 13.845 187.208 12.8887C226.483 12.2723 265.751 13.2796 304.998 13.9998`
6. `M5 29.8857C52.3147 26.9322 99.4329 21.6611 146.503 17.1765C151.753 16.6763 157.115 15.9505 162.415 15.6551C163.28 15.6069 165.074 15.4123 164.383 16.4275C161.704 20.3627 157.134 23.7551 153.95 27.4983C153.209 28.3702 148.194 33.4751 150.669 34.6605C153.638 36.0819 163.621 32.6063 165.039 32.2029C178.55 28.3608 191.49 23.5968 204.869 19.5404C231.903 11.3436 259.347 5.83254 288.793 5.12258C294.094 4.99476 299.722 4.82265 305 5.45025`

On mouseenter, insert the next variant, set `drawSVG: "0%"` and tween to `"100%"` over 0.5 s `power2.inOut`. On mouseleave (after any running draw finishes), tween to `drawSVG: "100% 100%"` over 0.5 s `power2.inOut`, then remove it. Links marked "always" draw once (0.6 s) and never erase.

### 6.6 Font weight follows the cursor (`data-font-weight-hover`)
Used on all three section headlines. Off on touch devices (`hover: none` or `pointer: coarse`) and under reduced motion. Take each top-level marked element; reuse the chars from its reveal split (wait for `reveal:done` on load-revealed headings). Otherwise split into chars and words with autoSplit off. For each char, read rest / near / radius from the nearest marked ancestor, set a `--wght` custom property to rest, and rewrite its `font-variation-settings` so `'wght' var(--wght)` replaces the existing wght axis while the other axes (wdth, opsz) are kept. Store each char's page-space centre. On every GSAP tick: distance d from the pointer's page position; factor f = d ≥ radius ? 0 : 1 − d / radius; target = clamp(rest + (near − rest) × f, between rest and near). If it changed by at least 1, tween `--wght` with a `gsap.quickTo(char, "--wght", { duration: 0.4, ease: "power2.out" })`. Re-measure every char's centre on resize and on every scroll event (the work and team headlines are pinned or sticky, so their page position changes as you scroll), and shift the stored pointer Y by the scroll delta so it stays in page space.

### 6.7 Hero cursor card (desktop ≥992 px with a fine hover pointer only)
quickTo x / y / rotation on the card: 1 s `power4`. quickTo xPercent (0.6 s `power2`) and yPercent (0.7 s `power2`) on the inner media layer. The first photo is `on` and the card starts at `autoAlpha 0`. On mousemove over the hero: if the pointer is over a link or button, fade the card out (0.25 s `power2.out`) and stop; otherwise fade it back in. On the first move, place the card instantly at x = clientX − innerWidth/2 and y = clientY − innerHeight/2 − heroTop, then fade it in (0.3 s). Every move: dx = (x − lastX)/2 and dy = (y − lastY)/2; rotation = (x − lastX)/4; card x / y follow the pointer by the same formula; the media layer gets xPercent −clamp(−8, 8, dx) and yPercent −clamp(−8, 8, dy), a small counter-drift. Add |dx| + |dy| to a travel counter; when it passes 300, reset it and switch `on` to the next photo in order. 66 ms after the last move, ease rotation and drift back to 0. On mouseleave: reset everything and fade out (0.3 s).

### 6.8 Client marquee that flips with scroll direction
Loop duration = speed (30) × (collection width / viewport width) × f, where f is 1 on desktop, 0.5 under 991 px and 0.25 under 479 px. Give the scroll wrapper margin-left −10 % and width 120 % (scroll speed 10), and append two clones of the collection. Tween all collections `xPercent: -100`, repeat −1, linear, start at total progress 0.5, after setting them to xPercent −100 (direction left = −1). A ScrollTrigger over the marquee flips `timeScale` to −direction when scrolling down and +direction when scrolling up. A second scrubbed trigger (scrub 0, from top-of-marquee-at-viewport-bottom to bottom-at-top) moves the wrapper from x +10vw to −10vw.

### 6.9 "Latest drops" 3D stack (desktop ≥992 px)
Constants: depth 120, offset 40, tiltX 6, tiltY 10, segment duration 1, badge spin 180. Set each slide b: `z: -b × 120, y: -b × 40, zIndex: count − b, autoAlpha 1`. In a paused timeline, for every slide except the last, at time b: move it `y: "+=" + innerHeight × 0.9` (`power2.in`, duration 1) and fade it to autoAlpha 0 (linear, 0.25) starting at b + 0.7; at the same time, move every slide behind it forward one step to `z: -C × 120, y: -C × 40` (C = its new index, linear, duration 1). The badge rotates 0 → 180° linearly across the whole timeline. Total duration = count − 1 (4). ScrollTrigger: trigger the section, start "top top", end `+= innerHeight × 1.2 × (count − 1)`, pin the 100vh pin element with pin spacing, scrub 0.3, refreshPriority 1, invalidateOnRefresh; onUpdate sets the timeline progress to the trigger progress. Mouse tilt (not under reduced motion): quickTo rotationX and rotationY on the stack root (0.6 s `power3`); on mousemove over the pin, rotationX = −((y − top)/height − 0.5) × 6 and rotationY = ((x − left)/width − 0.5) × 10; mouseleave eases both to 0.

### 6.10 "View case →" cursor label (fine hover pointer only)
quickTo x / y on the label wrapper (0.4 s `power3`). It snaps to the pointer on the first move. On every pointermove and scroll, check `elementFromPoint` for the nearest `[data-cursor-marquee-text]`. On entering one, copy its text into both spans, set the keyframe duration to text length / 5 seconds, run it, and set the status to active (the card scales in). On leaving, set it to not-active (the card scales out) and pause the scroll 0.4 s later.

### 6.11 Team photo parallax
gsap.matchMedia with desktop (≥992), tablet (480–991), mobile (≤479) and reduced motion (none). The distance is 320 × k, where k is 1 on desktop, 0.5 on tablet and 0.3 on mobile. Each photo tweens from `y: distance × speed` to `y: −distance × speed`, linear, scrubbed (scrub true) over the section, start `"clamp(top bottom)"`, end `"clamp(bottom top)"`, invalidateOnRefresh, refreshPriority −1. Every photo rises as you scroll down, each at its own speed from the table, which gives the layered depth.

### 6.12 Momentum hover (InertiaPlugin, fine hover pointer, no reduced motion)
On the team section: track the pointer velocity per animation frame (vx, vy = this frame's delta). When the pointer enters a photo (or the stamp), compute the offset from the target's centre (F, R), torque = (F × vy − R × vx) / hypot(F, R), and run `gsap.to(target, { inertia: { x: { velocity: clamp(±1080, vx × 30), end: 0 }, y: { velocity: clamp(±1080, vy × 30), end: 0 }, rotation: { velocity: clamp(±60, torque × 20), end: 0 }, resistance: 200 } })`. The photo gets flicked in the direction of the swipe and springs back.

### 6.13 Page theme switch
A ScrollTrigger on every `[data-page-theme]` element: start "top 55%", end "bottom 45%", refreshPriority −1. While active, set `html[data-theme]` to the element's value ("dark"); otherwise remove it. The background and text colours fade through the CSS transitions in section 5.6, and scrolling back up returns the cream page.

## 7. Reduced motion
`prefers-reduced-motion: reduce` gives: no wipe, no Lenis, no reveals (all text visible), no font-weight hover, no momentum hover, no marquee movement, no stack tilt, no team parallax, and the hero shows the still poster. The hero cursor card, the "View case →" label and the pinned card stack (its drop-and-advance steps and badge spin) still work, because they are tied to the pointer or scroll position rather than to ambient motion. The team section becomes auto height: the title sits normally with 8 rem top and 4 rem bottom padding, and the twelve photos flow in a responsive grid (`repeat(auto-fill, minmax(14rem, 1fr))`, gap 2 rem, padding 2 rem).

## 8. Acceptance checklist
- At 1440×900: the scribble wipe unwinds and "STORIES THAT / GET SHARED" rises in letter by letter, with the underline drawn under "See the reel".
- Moving the mouse in the hero shows a 16 rem photo card trailing behind the headline. It tilts with the movement and switches photo about every 600 px of movement, and it hides over the link.
- Near any of the three headlines, the heavy letters thin out and the serif letters thicken within 400 px of the pointer.
- The work section pins for 4.8 screen heights. The tomato card drops away and the sky card moves forward, and so on to "Night Bites". The badge turns half a circle. The stack tilts toward the mouse and shows the yellow "View case →" label over the cards. The front card sits level with the left copy.
- The team section turns the page near-black with cream text. "MEET THE FLOCK" stays centred while twelve photos rise past at different speeds on both sides, sliding over the title text, and a fast swipe flicks a photo. Scrolling back up returns the cream background.
- Phone (390 px): a static tilted photo card above the headline, a stacked card list, and small photos rising over the team title. No horizontal scroll.