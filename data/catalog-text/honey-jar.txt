# HIVEN Raw Honey: four-scene pinned-product story (recreation brief)

Build a single-page, full-screen product story for a fictional raw-honey brand, **HIVEN**. One honey jar stays on screen the whole time while four scenes change around it: a misty lake hero, an ingredients ring, a hand presenting the jar beside three benefits, and a dark kitchen with the jar on a wooden pedestal. The page never scrolls natively. Each wheel flick, swipe or arrow key plays **one complete, time-based transition** to the next scene, with soft, fast-start, long-settle curves. The feel is calm, warm and premium, like a high-end skincare site.

Everything below is exact. Use these asset URLs as given, never re-hosted.

---

## 1. Assets (use exactly these links)

All images load through the Higgsfield image proxy. All of them send `Access-Control-Allow-Origin: *`, which the cutout step needs.

| Role | URL | Native size | How it is used |
|---|---|---|---|
| Hero plate (still) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_060932_bb1e06e4-8bd5-45a0-b4a4-24854cffb528.png&w=2048&q=85` | 1024×688 source | Warm off-white haze over still pale water, with a dark basalt rock centred. Shown under the video and before it starts. |
| Hero water video | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261123_070127_46bf2fe6-4037-462d-aa6a-55d52b357a2d.mp4` | 1168×784, 24 fps, 5.04 s, H.264, no audio | Same framing as the plate (pixel-aligned). Water ripples and mist drift while the rock stays fixed. The first and last frames equal the plate. Two copies of it are used for a crossfade loop. |
| Final scene plate | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_060933_bddedf90-ba56-477b-9c32-901bc025bdb0.png&w=2048&q=85` | 1024×688 source | Dark terracotta kitchen at dusk: an empty round wooden pedestal centred on a terracotta table, a light beam from the right, dried wheat in a clay vase at the right edge and a small potted plant in a bowl at the left. |
| Jar cutout | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061027_50e61758-34cf-4e20-b115-380d40ae9a87.png&w=1024&q=85` | 1024×1024, transparent | Squat clear glass jar of amber honey with a light wood lid. Its cream label reads HIVEN / RAW HONEY, with a line bee icon and PURE / NATURAL / REAL. Crop rectangle (x, y, w, h) = **214, 158, 592, 680**. |
| Hand cutout | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_061028_dd300bd1-4172-4809-abac-c1b9e7660381.png&w=1024&q=85` | 1024×688, transparent | A slim female hand and bare forearm entering from the left, palm open and flat, facing up. Crop rectangle = **0, 240, 858, 262**. |
| Sheet 1 (2×2) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_060932_f7a02a74-f897-4398-b9ab-96ef9898e8bc.png&w=1024&q=85` | 1024×1024 | Macro photos on cream: top-left acacia blossoms, top-right lavender, bottom-left honeycomb, bottom-right bee pollen. |
| Sheet 2 (2×2) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261123_060932_90850cb3-1ec6-4622-b548-a8ca88dd30f0.png&w=1024&q=85` | 1024×1024 | Top-left propolis resin chunks, top-right a honey drop falling from a spoon, bottom-left glossy honeycomb cells, bottom-right a ribbon of honey folding on itself. |

**Sheet crops.** Every round photo is an `<i>` filling its circle, with `background-size: 204.8% 204.8%` and `background-repeat: no-repeat`. The quadrant positions are:
- top-left: `1.15% 1.15%`
- top-right: `98.85% 1.15%`
- bottom-left: `1.15% 98.85%`
- bottom-right: `98.85% 98.85%`

Together these show a 500 px window inside each 512 px quadrant, offset 6 px, which hides the thin gaps between quadrants.

**Cutout clean-up, done in the browser before the intro starts.**
1. Load each cutout as an `Image` with `crossOrigin = 'anonymous'`.
2. Draw only its crop rectangle onto a canvas of the crop size.
3. Erode the alpha channel twice with a 4-neighbour minimum filter (2 px in total).
4. Feather it once. Each pixel's new alpha is (4 × own alpha + the 4 neighbours' alphas) ÷ the number of samples.
5. Export the canvas to a WebP blob at quality 0.92 and set it as the `<img>` src.

This removes the background remover's pale halo. The jar ends up 592×680 (aspect ratio `JAR_R = 680/592`) and the hand 858×262 (`HAND_R = 262/858`). If anything fails, fall back to the raw URL.

---

## 2. Fonts

- **Outfit** (Google Fonts, variable, weight 100–900). Used for the nav, ingredient names and lines, body copy and the button. Weights used: 400 and 500.
- **Playfair Display** (Google Fonts, variable, weight 400–900). Used for the giant wordmark (400), benefit titles (500) and the tagline (400).

Load the latin subsets with `font-display: swap`, for example `https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap`. Body text uses `-webkit-font-smoothing: antialiased`.

---

## 3. Head and colour tokens

- Title: `Hiven — Raw Honey`, `lang="en"`, standard viewport meta.
- Add `<link rel="preconnect" href="https://images.higgs.ai" crossorigin>`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF4EC` | Page cream, ingredients background, chip ring fill |
| hero background | `#FBF4E9` | Hero layer fill: the exact colour of the plate's top haze, so the intro rise shows no seam |
| `--bg3` | `#F2E6D3` | Benefits panel |
| `--accent` | `#C79A67` | Reserved honey accent |
| `--ink` | `#2A2118` | Nav and headings |
| secondary text | `#4a3d30` | Ingredient benefit lines and benefit paragraphs |
| `--mark` | `#EDE3D4` | Giant wordmark, very pale |
| `--dark` | `#2B1F14` | Final scene fill |
| light text | `#F6EEE2` | Nav over the dark scene, tagline, button border (at 70% alpha), button hover fill |
| hairlines | `rgba(42,33,24,.18)` on chips, `rgba(42,33,24,.16)` on benefit thumbnails | 1 px ring around each round photo |

`html` and `body` both get `height: 100%`, `overflow: hidden`, `overscroll-behavior: none`, background `--bg`, colour `--ink`, font Outfit. `box-sizing: border-box` and zero margin and padding everywhere. Images are `display: block; height: auto`, not selectable and not draggable.

---

## 4. Scaling system (two units, recomputed on every resize)

The design frame is **1440×900**. Read `vw = innerWidth` and `vh =` the stage's `clientHeight` (100svh).

- **Plate unit `s` = max(vw/1440, vh/900).** This is a cover fit. A `.frame` box of 1440s × 900s is centred in the viewport at `left = fl = (vw − 1440s)/2` and `top = ft = (vh − 900s)/2`. Both background plates sit inside it. `F(x, y, w)` maps frame coordinates to the screen: `{x: fl + x·s, y: ft + y·s, w: w·s}`.
- **UI unit `c` = min(vw/1440, vh/900).** This is a contain fit, with offsets `ul = (vw − 1440c)/2` and `ut = (vh − 900c)/2`. `U(x, y, w)` maps the same way. All UI (chips, rows, CTA) and the jar's middle positions use `U`.
- **Portrait mode** applies when `vw/vh < 0.9`. It has its own layout (section 8).

Write `--s`, `--c`, `--fl` and `--ft` as CSS variables, in px.

**Plate placement inside `.frame`:**
- Hero image and both hero videos: `position: absolute; width: 102.78%; left: −0.14%; top: −5.22%`. This centres the rock exactly at frame x = 720. The videos also get `aspect-ratio: 1168/784` and start at opacity 0.
- Scene image: `width: 100%; left: 0; top: −3.75%`.

**Jar keyframes**, positioned by bottom-centre point (x, y) and width w:

| Key | Desktop / landscape | Meaning |
|---|---|---|
| K0 | `F(720, 490, 290)` | Standing on the flat top of the rock (portrait: w capped at 0.48·vw) |
| K1 | `U(720, 1012, 466)`, then y += dy (see chips) | Enlarged and cropped by the bottom edge: its top sits at about 477c |
| K2 | `U(465, 640, 300)`, then x is recomputed from the hand | In the palm |
| K4 | `F(720, 697, 183)` | On the wooden pedestal |

The jar `<img>` is given a fixed CSS width `W` = the largest keyframe width. It is drawn with `transform: translate3d(x − W/2, y − W·JAR_R + introOffset, 0) scale(w/W)` and `transform-origin: 50% 100%`. It also gets `filter: drop-shadow(0 18px 24px rgba(42,33,24,.18))`, `z-index: 5`, and `will-change: transform`.

---

## 5. Layers and DOM (in order, all inside a fixed 100svh stage with `overflow: hidden`)

1. **Nav**: `position: fixed`, z-index 20, a flex row with `justify-content: space-between` and padding `28c 42c 0`. Font size `max(12px, 17c)`, Outfit 400, letter-spacing .01em, colour `--ink`, with a 0.5 s colour transition. Five plain text links: **Home, Products, About, Reviews, Contact**. Each link has `padding: 6px 2px`. On hover, a 1 px underline in `currentColor` grows from the left (`scaleX` 0 → 1 over .35 s). The nav gets class `light` (colour `#F6EEE2`) once the dark scene covers more than 96% of the screen. There is no logo and no button. Links jump to scenes: Home → 0, Products → 1, About → 2, Reviews → 2, Contact → 3.
2. **Hero layer**, fill `#FBF4E9`. It holds the `.frame` (plate, then video A, then video B) and the `<h1>` wordmark.
   - **Wordmark:** the word **HIVEN** in Playfair Display 400, colour `#EDE3D4`, line-height 1, letter-spacing −.01em, centred, never wrapped or split.
   - **Wordmark size:** set the font size so the rendered word measures `min(960s, 0.9·vw)` wide on desktop, or `0.9·vw` in portrait. Measure it with a `Range` around the text node.
   - **Wordmark position:** its cap height is 0.708 em, and the visible cap top sits 0.2 em below the element top. Put the cap centre at `jarTop + 0.25·jarHeight`, using the jar at K0, so the word runs behind the upper quarter of the jar. If the cap top would come within 12 px of the nav's bottom edge, move it down to stay 12 px clear.
3. **Ingredients layer**, transparent, `pointer-events: none`. It holds five `.chip` elements, each placed by its circle centre with `transform: translate(−50%, −chip/2)`.
   - **Circle:** a `--chip` diameter disc with a 1 px hairline ring, 4% inner padding and a `--bg` fill, holding the round sheet crop.
   - **Under each circle:** the name in Outfit 500 at `--cn`, with a margin-top of 0.2·chip and no wrapping. Then a one-line benefit in `#4a3d30` at `--cs`, line-height 1.3, max-width 2.3·chip.
   - **Contents, in DOM order:**
     - **Wild Acacia** / Floral & light (sheet 1, top-left)
     - **Lavender** / Calms and soothes (sheet 1, top-right)
     - **Honeycomb** / Seals in the flavor (sheet 1, bottom-left)
     - **Bee Pollen** / Protein & Zinc (sheet 1, bottom-right)
     - **Bee Resin** / Supports your defences (sheet 2, top-left)
4. **Benefits layer**: a full-screen panel filled `#F2E6D3`, resting at `translateY(100%)`. It holds `.rows`, three `.row` elements.
   - **Thumbnail:** a `--rt` disc with a 1 px hairline ring, 4% padding and a `--bg3` fill, holding a sheet crop.
   - **Text block:** an `<h3>` in Playfair Display 500 at `--rh`, line-height 1.2, then a `<p>` in Outfit at `--rp`, line-height 1.45, colour `#4a3d30`, margin-top .25em, max-width `--rw`.
   - **Spacing:** the gap between thumbnail and text is 0.28·rt. Rows are `--rg` apart.
   - **Rows, in order:**
     - **Clean Energy**: "Natural sugars give steady energy that lasts all through the day." (sheet 2, top-right)
     - **Soothes Throat**: "One warm spoonful coats and calms a dry, tired throat." (sheet 2, bottom-left)
     - **Raw & Unfiltered**: "Never heated or filtered, so each enzyme and pollen grain is kept." (sheet 2, bottom-right)
5. **Scene layer**, filled `#2B1F14`, resting at `translateY(100%)`. It holds the `.frame` with the scene plate and a centred `.cta` column in `#F6EEE2`.
   - **Tagline:** an `<h2>` reading **FROM THE HIVE,** / **STRAIGHT TO YOU.** on two lines (a `<br>`). Playfair Display 400 at `--th`, letter-spacing .2em, line-height 1.3.
   - **Button:** below it, a pill link **Discover** with a 1 px `rgba(246,238,226,.7)` border, radius 999 px, padding .7em 2.2em, font size `--tf`, letter-spacing .04em, and margin-top `--tb`. On hover, the fill turns `#F6EEE2` and the text `#2B1F14` (.3 s). It returns to scene 0.
6. **Jar** `<img>` (z 5), followed by the **hand** `<img>` (z 6, `transform-origin: 0 0`). The hand is deliberately drawn **in front of** the jar, so its palm and fingers cover the jar's base.

---

## 6. Desktop / landscape measurements (UI unit c)

**Chips.** The circle diameter is `max(44px, 116c)`. The name is `max(12px, 21c)` and the benefit line `max(11px, 17.5c)`. Circle centres in UI-box coordinates:

| Chip | Position (x, y) |
|---|---|
| Acacia | (230, 421) |
| Lavender | (454, 268) |
| Honeycomb | (720, 196) |
| Pollen | (988, 278) |
| Resin | (1212, 439) |

The five circles form an arch around the jar.
- **x on screen:** `vw/2 + (x − 720)·kx`, with `kx = max(c, 0.96·vw/1440)`. On wide but short screens this spreads the chips across the width.
- **y on screen:** `ut + y·c + dy`, where `dy = max(0, navBottom + 6 − (ut + 196c − chip/2))`. This keeps the top chip clear of the nav, and the same dy is added to K1.y so the cropped jar drops with the chips.

**Benefits.**

| Element | Size |
|---|---|
| Thumbnail | `max(48px, 96c)` |
| Title | `max(14px, 25c)` |
| Paragraph | `max(11px, 16.5c)` |
| Row gap | `max(14px, 40c)` |
| Text max-width | `max(200px, 330c)` |

The rows block starts at `left = ul + 915c`, with `top: 50%` and `transform: translateY(−44%)`.

**Hand and jar in the palm.**
- **Hand width:** `hw = K2.w × 3.05`.
- **Hand left edge:** `hx0 = K2.x − 0.56·hw`, with K2.x starting at 465c.
- **Jar re-anchored to the palm:** `K2.x = hx0 + 0.63·hw`. The jar always lands 63% along the hand, in the centre of the palm.
- **Hand top:** `K2.y + 0.13·(K2.w·JAR_R) − 0.30·(hw·HAND_R)`. The fingers then cover roughly the bottom 10% of the jar.

**CTA.** The tagline is `max(17px, 34c)`, the button text `max(12px, 16c)`, and the button gap `max(16px, 30c)`. The column top is `ut + 150c`.

---

## 7. Motion: measured from the reference, frame by frame

### 7a. Load intro (only on first load)
- **What happens:** the whole hero scene rises from below. The hero plate, both videos and the jar share one vertical offset, `introOffset`. The jar keeps its size the whole time.
- **Start:** `0.276 × vh` lower than rest.
- **Curve:** it settles to 0 over **1600 ms** on **cubic-bezier(.5, 0, 0, 1)**. It holds still for a beat, accelerates through the middle and has a long soft finish. This curve was fitted to the reference with 0.8% RMS error.
- **Wordmark and nav:** they do not move. They fade in: the wordmark 0 → 1 over 450 ms (60 ms delay, ease-out), the nav over 350 ms (ease-out).
- **Waiting state:** until fonts and both cutouts are ready, `html.intro` hides the nav, wordmark, hero frame and jar (opacity 0). A 3.5 s failsafe removes the class.
- **Reduced motion:** no rise, no fades.

### 7b. Stepped scenes
There are four states: **0 hero, 1 ingredients, 2 benefits, 3 scene**. Every animated value is a *channel* (tween). A new target always starts from the channel's live value, so interrupting is seamless. A channel holds a queue of segments `{to, delay, dur, ease}`. Array channels can give each axis its own duration and ease, which bends the path instead of chaining moves.

**Curves:**

| Name | Curve | Use |
|---|---|---|
| **EJ** | `cubic-bezier(.3, 0, .05, 1)` | Jar moves. Fast start, very long settle. Fitted to the reference's jar scale and position, 1.2–1.8% RMS. |
| **EP** | `cubic-bezier(.3, 0, .15, 1)` | Panels and fades. Fitted to the reference panel slide, 2.9% RMS. |
| **EF** | `cubic-bezier(.25, .1, .25, 1)` | Opacity |
| **EY** | `cubic-bezier(.5, 0, .1, 1)` | Delayed drop |

**Channels:**

| Channel | Values | What it drives |
|---|---|---|
| `jar` | [x, y, w] | The jar transform |
| `hero` | 1 → 0 | Hero layer opacity. The hero frame also scales `1 + (1 − hero)·0.06`, so the plate zooms 6% as it fades. |
| `bene` | 0 → 1 | Panel `translateY((1 − bene)·100%)` |
| `handOut` | 0 → 1 | Hand slides out to the left |
| `rows` | 0 → 1 | Rows opacity |
| `scene` | 0 → 1 | Scene `translateY((1 − scene)·100%)`. The nav turns light when scene > 0.96. |

**Hand transform:** `translate3d(hx0 − handOut·(hx0 + 1.05·hw), handTop + (1 − bene)·vh, 0)`. The hand rides up with the benefits panel and leaves to the left.

**Transitions (milliseconds):**

| To state | Jar | Other channels | Class timing |
|---|---|---|---|
| 0 (hero) | → K0, 1150, EJ | hero → 1, 700, EP. bene → 0, 650, EP. handOut → 0. rows → 0. scene → 0. | All `.on` classes removed at once |
| 1 (ingredients) | → K1, 1150, EJ | hero → 0, 700, EP. bene → 0, 650, EP. | `.ingr.on` after **1000 ms** going forward (600 ms coming back): chips pop in as the jar settles |
| 2 (benefits) | → K2, 1150, EJ (the jar is caught by the rising hand) | bene → 1, 650, EP. rows → 1, 500, EF. Coming back from 3: handOut → 0 with a 150 ms delay over 650 ms, and rows with a 300 ms delay. | `.bene.on` after **550 ms** (350 ms coming back) |
| 3 (scene) | From 2, one continuous path to K4 with per-axis durations: **x over 700 ms (EJ), y over 1600 ms (EY), w over 1600 ms (EJ)**. The jar glides off the palm to centre and sinks onto the pedestal without stopping. From elsewhere: → K4, 1150, EJ. | handOut → 1, 600, EP. rows → 0, 400, EF. scene → 1, delay 350, 650, EP. | `.scene.on` after **1350 ms** |

**CSS entrances triggered by those classes:**
- **Chips:** `.in-w` goes from opacity 0 and `scale(.7)` to 1 and none. Opacity runs .5 s on cubic-bezier(.25,.1,.25,1), transform .7 s on cubic-bezier(.3,0,.15,1). There is no overshoot, and all five chips come in together.
- **Rows:** from opacity 0 and `translateX(60px)` to rest. Opacity runs .6 s on cubic-bezier(.25,.1,.25,1), transform 1 s on cubic-bezier(.3,0,.05,1). Rows 2 and 3 are delayed .12 s and .24 s.
- **Tagline:** rises 24 px and fades in, opacity .9 s ease and transform 1 s cubic-bezier(.22,1,.36,1).
- **Button:** does the same from 18 px, .15 s later.

Every channel is evaluated once per `requestAnimationFrame`.

### 7c. Input (one gesture = one step)
- **Wheel** (`passive: false`, `preventDefault`):
  - **Fresh gesture:** a gap of more than 160 ms since the last wheel event, or a delta stronger than 1.6 × the previous one + 4. This catches a new push during trackpad inertia.
  - **Stepping:** deltas add up, and when the total passes 24 px, step by its sign.
  - **Lock:** after a step, input is locked for 1000 ms. During that lock, input is ignored rather than queued, so a scene is never skipped.
- **Touch:** `touchmove` is prevented, and a vertical swipe longer than 40 px steps.
- **Keys:** ArrowDown, PageDown and Space go forward. ArrowUp and PageUp go back. Home and End jump to the first and last scene.
- **Nav links** jump straight to their scene.
- **Hook for testing:** expose `window.hiven = {go(n, instant), state}`.
- **Resize:** recompute the layout and snap every channel to the current state.

### 7d. Hero water loop
- **Start:** video A plays muted inline from 0 when the page starts and switches to opacity 1 once playing.
- **Crossfade:** 0.6 s before A ends, B restarts from 0 above A (z-index 2 over 1) and fades in over 600 ms. Then A pauses and goes transparent, and the two swap roles.
- **Pausing:** both videos pause while the hero is hidden (not in state 0 and hero opacity under 0.01).
- **Reduced motion:** the videos never play, and the still plate shows.

---

## 8. Portrait layout (vw/vh < 0.9: phones and portrait tablets)

**Jar keyframes:**

| Key | Portrait value |
|---|---|
| K0 | `F(720, 490, 290)` with w capped at 0.48·vw |
| K1 | w1 = min(0.72·vw, 0.42·vh), x = vw/2, y = max(vh + 0.16·w1·JAR_R, bottom of the lowest chip label + 10 + w1·JAR_R). It is always cropped by the bottom edge and never overlaps a label. |
| K2 | w = min(0.40·vw, 0.22·vh), y = 0.80·vh. The hand is 3.2 × that width, placed so the jar centre (63% along the hand) is at vw/2. |
| K4 | `F(720, 697, 183)` |

**Chips.**
- Circle size: `min(max(58px, 0.17·vw), 96px)`.
- Name size: `min(max(12px, 0.034·vw), 17px)`. Benefit line: `min(max(11px, 0.029·vw), 15px)`.
- Rows: `top = max(64, 0.06·vh) + chip/2 + 8` and `row2 = top + chip + max(84, 0.10·vh)`.
- Positions as (fraction of vw, y), each with 0.55·chip added to y:

| Chip | Position |
|---|---|
| Lavender | (0.20, top + 0.35·chip) |
| Honeycomb | (0.50, top) |
| Pollen | (0.80, top + 0.35·chip) |
| Acacia | (0.25, row2) |
| Resin | (0.75, row2) |

**Benefits.**
- Stacked at the top: `left` and `right` = max(18px, 0.06·vw), `top` = max(64, 0.07·vh) + 10.
- Thumbnail `min(max(48px, 0.13·vw), 76px)`. Title `min(max(15px, 0.042·vw), 22px)`. Paragraph `min(max(12px, 0.033·vw), 16px)`. Row gap `min(max(12px, 0.022·vh), 26px)`. No max-width.
- The hand and jar sit in the lower part of the screen.

**CTA.** The tagline is `min(max(16px, 0.052·vw), 34px)`, the button text 14px, and the gap 20px. The column top is max(84, 0.13·vh).

**Wordmark.** 0.9·vw wide.

---

## 9. Acceptance checklist
- On load, the misty lake, rock and jar rise together from 27.6% lower and settle softly in 1.6 s. The pale HIVEN wordmark fades in behind the jar's upper quarter, and the water ripples in a seamless loop.
- One wheel flick:
  - The jar grows and drops to bottom-centre, cropped, in about 1.15 s.
  - The lake fades to cream while the plate zooms slightly.
  - Five round ingredient chips fade and scale in around the jar about 1 s in.
- Next flick:
  - The warm beige panel slides up in 0.65 s with the hand, and the jar lands in the palm, behind the fingers and centred on the palm.
  - The three benefit rows glide in from the right, staggered.
- Next flick:
  - The rows fade and the hand slides away left.
  - The jar glides to the centre and keeps sinking onto the wooden pedestal as the dark kitchen rises from below.
  - The nav turns light, and the two-line tagline and Discover pill rise in after about 1.35 s.
- Scrolling back reverses every scene with the same softness. A gesture during a transition never skips a scene.
- At every size from 320×568 to 2560×1440, including landscape phones and portrait tablets:
  - no UI leaves the viewport;
  - no chip, label, row, tagline or button overlaps another, the nav or the jar;
  - the nav stays on one row;
  - text is at least 11 px and tap targets at least 24 px.
- Reduced motion: every scene still changes by input, instantly, and the video stays still.