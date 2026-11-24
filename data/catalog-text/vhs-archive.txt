# Leon Vasari: Curved VHS Archive (exact recreation prompt)

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts. This is that prompt.

## What it is

Build a single-screen **film archive hero** for a fictional director, Leon Vasari. Use plain HTML, CSS and vanilla JavaScript in one file, with no framework and no libraries.

The page is warm off-white paper.
- **The shelf:** across the middle, worn VHS tapes stand on a **curved arc that recedes into depth**. Spines get smaller, darker and more tightly packed toward both edges, about 11 per side. They turn slightly toward the centre and sit lower as they go back, like a shelf bent into a shallow bowl.
- **The active tape:** the tape at the centre is **turned 90° in 3D** so its illustrated front cover faces you, pushed slightly forward, over a soft floor shadow.
- **Background:** two columns of giant halftone kanji, **映画** on the left and **の記憶** on the right, sit behind the shelf.
- **Caption:** under the cover, the film's title is set big and bold in cobalt, with its romanised and kanji titles, a short rule and "YEAR — GENRE". Arrows sit on either side.
- **Timeline:** a ruler from 1955 to 1990 runs along the bottom. A cobalt dot glides to the active film's year.
- **Detail sheet:** clicking the cover grows a sheet of paper out of it into a full-screen detail page. Its poster bleeds in like ink.

Everything runs on one `requestAnimationFrame` loop plus the Web Animations API. There are no opacity fades: every reveal is a mask slide, a clip or a scale.

## Media: every asset URL

All 24 images come from **four Higgsfield GPT Image 2.5 sheets** with transparent backgrounds, loaded through the Higgsfield image proxy as WebP. The art is fictional, unbranded VHS art. Each spine and cover is a rectangle cropped out of a sheet with CSS backgrounds; there are no separate image files.

| Sheet id | Size (px) | Contents | URL |
|---|---|---|---|
| covers | 1744 × 2336 | all 12 covers in a 4 × 3 grid | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010644_837e04ca-2418-45c1-b8e0-0233265c4cd5.png&w=1744&q=85 |
| spines | 2688 × 1152 | 12 spines in one row (9 used) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010738_a3e47ead-18f2-4974-9468-06d16a25edc5.png&w=2688&q=85 |
| fix | 1520 × 2688 | re-drawn spine RIVER OF SALT | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010831_3ebb874b-93dc-433e-87ed-6299aba720f0.png&w=1520&q=85 |
| fix2 | 1520 × 2688 | re-drawn spines THE OBSERVER and LIGHT IN THE STORM | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_092020_f96bc094-db7b-46de-9298-074a24e0a3b8.png&w=1520&q=85 |

**What the art looks like:**
- **Spines** (about 1:6): worn cardboard, a small illustration at the top, the title vertical in a condensed serif, then "VASARI" and a boxed "VHS".
- **Covers** (about 1:1.95): "A LEON VASARI FILM" at the top, a big condensed serif title, a duotone screen-print illustration in ink, cobalt, vermilion and cream, and a "VHS" badge.

Crop boxes are in sheet pixels, `x, y, w, h`:

| Film id | Spine sheet | Spine box | Cover sheet | Cover box |
|---|---|---|---|---|
| valley | spines | 266, 31, 189, 1089 | covers | 497, 72, 344, 659 |
| bluehour | spines | 492, 31, 189, 1089 | covers | 914, 72, 342, 659 |
| river | fix | 197, 54, 324, 2566 | covers | 1332, 72, 344, 659 |
| summer | spines | 937, 31, 188, 1089 | covers | 74, 813, 344, 676 |
| green | spines | 1157, 31, 185, 1090 | covers | 497, 815, 344, 674 |
| noon | spines | 44, 32, 184, 1088 | covers | 74, 72, 347, 659 |
| observer | fix2 | 371, 15, 349, 2655 | covers | 915, 815, 342, 675 |
| birds | spines | 1573, 31, 183, 1089 | covers | 1331, 815, 345, 675 |
| storm | fix2 | 808, 15, 347, 2656 | covers | 74, 1571, 345, 681 |
| tide | spines | 2012, 31, 188, 1089 | covers | 496, 1577, 343, 678 |
| war | spines | 2236, 31, 189, 1089 | covers | 913, 1579, 343, 676 |
| door | spines | 2462, 31, 188, 1089 | covers | 1331, 1579, 344, 677 |

**Cropping:**
- Store the tables as `SHEET[id] = [url, W, H]` and `CROP['spine-<id>'|'cover-<id>'] = [sheet, x, y, w, h]`.
- A face's background is `background-image:url(sheet); background-size:(W/w·100)% (H/h·100)%; background-position:(x/(W−w)·100)% (y/(H−h)·100)%`.
- **Detail poster:** an SVG `<image>` of the sheet with `x=−x·474/w`, `y=−y·900/h`, `width=W·474/w`, `height=H·900/h` and `preserveAspectRatio="none"`, clipped to a 474 × 900 rect.
- Preload the four sheets as `Image()` objects on start.

## Fonts (all embedded as base64 WOFF2)

| Family | Weight | Use |
|---|---|---|
| Inter Tight (variable 100–900) | 500, 600 | Every label, the caption title, the detail title, years |
| Newsreader (variable 200–800, roman and italic) | 400 | Detail synopsis and italic credit |
| Noto Sans JP | 500 | All small Japanese text (labels, kanji titles); second in the sans stack |
| Noto Serif SC | 700 | (embedded, not visible in this layout) |
| "Noto Sans JP Big" | 800 | The giant 映画 / の記憶 only: a Google Fonts subset of Noto Sans JP 800 with `text=映画の記憶`, `font-display:block` |

- **Sans stack:** `"Inter Tight","Noto Sans JP",system-ui,sans-serif`.
- **Serif stack:** `"Newsreader",Georgia,serif`.

## Tokens

```css
--paper:#ECE8E0; --sheet:#F3F0EA; --ink:#141414; --muted:#6D6A63; --cobalt:#1F3FB0; --rule:rgba(20,20,20,.9);
--ease:cubic-bezier(.2,.8,.2,1);
--H:min(47vh,33vw);  /* tape height; min(68vw,40svh) on phones */
--cy:41%;            /* shelf centre line; 43% on phones */
```

- `body` is paper, with hidden overflow, `user-select:none` and antialiasing. On `(pointer:fine)` the native cursor is hidden.
- **Paper grain:** a fixed full-screen layer (z 40, no pointer events, `mix-blend-mode:multiply`, opacity .6). It is a 220px SVG tile: `feTurbulence` fractalNoise (baseFrequency .85, 3 octaves, stitchTiles) through `feColorMatrix` `0 0 0 0 .45 / 0 0 0 0 .42 / 0 0 0 0 .38 / 0 0 0 .22 0`.
- **`.lbl`:** Inter Tight 600, 10.5px, line-height 1, letter-spacing .14em, uppercase.
- **`.box`:** inline-flex, 21px tall, 0 8px padding, 1px `--rule` border.

## Layout (desktop; everything fixed)

1. **Top bar:** 76px tall, 36px side padding, space-between, all cobalt.
   - **Left:** a link `.lbl` "LEON VASARI", a 40 × 1px line, then "FILM ARCHIVE", with 16px gaps.
   - **Right:** "FILMS", "ABOUT", "JOURNAL" (34px gaps), then a burger of two 1.5px lines, 26 × 12px.
2. **Halftone kanji:**
   - Fixed, z 1, `writing-mode:vertical-rl`, font "Noto Sans JP Big" 800 at `min(19vh,12.5vw)`, line-height 1.02, letter-spacing .02em.
   - The fill is a dot screen: transparent text with `background-clip:text` over `radial-gradient(circle at 50% 50%, rgba(64,82,138,.55) 0 36%, transparent 40%)` at 3 × 3px, plus a flat `rgba(110,122,160,.26)` wash.
   - **映画** sits at left 2.4vw, top 13vh. **の記憶** sits at right 2.4vw, top 9vh.
3. **Floor shadow:**
   - Position: centred at `top:calc(--cy + H×.47)`, width `min(96vw, H×3.6)`, height `H×.26`.
   - Fill: `radial-gradient(50% 50% at 50% 40%, rgba(40,32,20,.30), rgba(40,32,20,.10) 55%, transparent 72%)`.
4. **Shelf:**
   - The section spans the full width, top `--cy − H/2 − 50px`, height `H + 100px`, with `perspective:1400px` at `50% 50%`, z 10 and `touch-action:pan-y`.
   - A zero-size `.stage` at the centre has `preserve-3d`.
   - **Each tape** is a zero-size `preserve-3d` box with two faces. Faces are H tall, top −H/2, `backface-visibility:hidden`, radius 2px.
     - **Spine face `.sp`:** width `ws`, `translateZ(d/2)`.
     - **Cover face `.cv`:** width `d`, `rotateY(90deg) translateZ(ws/2)`, shadow `0 34px 60px -30px rgba(20,16,10,.6)`.
   - **Shading:** each face has a black `::after` whose opacity comes from `--shade`.
5. **Play ring:** a fixed 42px circle with a 1px cobalt border, `rgba(236,232,224,.8)` fill and a 12px cobalt triangle. It sits on the cover's lower-left corner (`left = W/2 − d/2 − 6`, `top = shelfCentre + .36H`).
6. **Caption:** a centred grid at `top: --cy + H/2 + 4.2vh`, 10px gap. Each line sits in an overflow mask, `min(80vw,640px)` wide.
   - **Title:** Inter Tight 600, `clamp(28px,3.4vw,46px)`, letter-spacing −.015em, cobalt (e.g. **Noon in Ashes**).
   - **Subtitle:** a cobalt `.lbl` at 9.5px, letter-spacing .24em, "ROMAJI / kanji" (e.g. `HAI NO SHOGO / 灰の正午`).
   - **Rule:** 18 × 1px, cobalt.
   - **Year line:** Inter Tight 500, 10.5px, letter-spacing .08em, ink, `YEAR — GENRE` (e.g. `1971 — WESTERN`).
7. **Arrows:** two 44px cobalt buttons on the title's line, at `50% ± min(19vw,250px)`. They hold 24 × 12 arrow SVGs (1.2px stroke): `M6 1L1 6l5 5M1 6h23` and its mirror.
8. **Timeline:** left and right 36px, bottom 64px, 40px tall.
   - A cobalt 1px line at 12px (opacity .75).
   - A tick for every year 1955–1990. Majors every 5 years are 13px tall at .75 opacity; minors are 7px at .4.
   - Year labels in Inter Tight 500 9.5px, cobalt, under the majors (the first is left-aligned, 1990 right-aligned).
   - A 9px cobalt dot rides the line.
   - A click area covers it.
9. **Footer:** left/right 36px, bottom 24px, cobalt `.lbl`s: "© LEON VASARI. ALL RIGHTS RESERVED." on the left and "FB / TW" (links) on the right.
10. **Cursor:** 58px, fixed, z 100.
    - **Parts:** a 1.5px ink ring, a 6px ink dot, and a hidden white label "OPEN" over "開く" in Inter Tight 600 10px.
    - **Movement:** it follows with `1 − e^(−16dt)` smoothing.
    - **States:**
      - `.open` (over the settled cover): the ring scales to 1.75 and fills cobalt, and the label pops in.
      - `.spine` (over other tapes): .72.
      - `.btn` (over buttons, links or the timeline): .55 with no dot.
    - **Transitions:** ring .5s, colours .4s, dot .4s, label .45s.

## Film data (shelf order; the page opens on index 5)

| # | id | Title | Romaji | Kanji | Year | Genre | Min | Synopsis |
|---|---|---|---|---|---|---|---|---|
| 0 | valley | The Silent Valley | SHIZUKANA TANI | 静かな谷 | 1958 | Drama | 104 | A schoolteacher returns to the mountain village that exiled her father, and finds the valley has kept every one of its secrets. |
| 1 | bluehour | The Blue Hour | AO NO TOKI | 青の刻 | 1962 | Romance | 97 | Over one long evening in a harbour town, a widow and a stranger trade small lies until the light runs out. |
| 2 | river | River of Salt | SHIO NO KAWA | 塩の川 | 1964 | Drama | 121 | Two brothers drag a salt barge downriver to a city that no longer wants anything they carry. |
| 3 | summer | The Last Summer | SAIGO NO NATSU | 最後の夏 | 1966 | Drama | 109 | The summer before the dam floods their village, three friends set fire to everything they cannot take with them. |
| 4 | green | The Green Road | MIDORI NO MICHI | 緑の道 | 1969 | Mystery | 101 | A surveyor mapping a forest road keeps finding the same footprints, always one day ahead of him. |
| 5 | noon | Noon in Ashes | HAI NO SHOGO | 灰の正午 | 1971 | Western | 112 | A rider crosses a white desert to settle an old debt, and learns too late who sent him. |
| 6 | observer | The Observer | KANSATSUSHA | 観察者 | 1973 | Thriller | 96 | A night watchman begins to suspect that the building he guards has started watching him back. |
| 7 | birds | The Fallen Birds | OCHITA TORI | 落ちた鳥 | 1975 | Drama | 118 | When the birds stop singing over a frontier town, the mayor’s daughter is the only one who goes looking for the reason. |
| 8 | storm | Light in the Storm | ARASHI NO HI | 嵐の灯 | 1978 | Drama | 127 | A lighthouse keeper and his son wait out a three-day storm with a shipwrecked sailor who will not give his name. |
| 9 | tide | The Long Tide | NAGAI SHIO | 長い潮 | 1981 | Drama | 99 | A fisherman’s wife counts the tides on the harbour wall while her husband’s boat fails to come home. |
| 10 | war | A Quiet War | SHIZUKANA SENSO | 静かな戦争 | 1985 | Comedy | 103 | Two neighbours fight a silent war over a garden wall for thirty years, and neither will say how it began. |
| 11 | door | Red Door | AKAI TOBIRA | 赤い扉 | 1989 | Thriller | 114 | A projectionist follows a reel of unknown film through the corridors of a cinema on its final night. |

Render the 12 films three times (36 tapes, virtual index `v = copy×12 + i`). Start at `s = T = 5 + 12`.

## Arc geometry (the core of this design)

### Measured values
Measure H with a probe element of `height:var(--H)`. Then:
- `ws = H·142/840`, `d = H·474/900`, `gap = H·.035`
- `U = H·1.3` on desktop, `H·1.05` below 768px (the depth falloff)
- `P = 1400` (the CSS perspective)

### Functions
- **Relative index:** `rel(v,s) = ((v−s) mod 36)` mapped into [−18, 18).
- **Arc length from the centre:** `F(r) = r·(ws+gap) + (d − ws + 1.4·gap)·B(r)`, where `B(r) = (r + sin(πr)/π)/2` for |r| < 1 and `±.5` otherwise. The open cover pushes its neighbours apart smoothly.
- **Screen scale at arc length u:** `scl(u) = 1/(1 + (|u|/U)^1.6)`.
- **Screen x:** the integral of `scl`. Precompute `XS` by stepping u from 0 to 3U in 2px steps, accumulating `2/(1+(u/U)^1.6)`. Then `xsc(u) = sign(u)·XS[|u|/2]`. Far spines pack tighter in screen space.

### Per tape, every frame
- `o = smoothstep(max(0, 1−|r|))`: 0 for a spine, 1 for the open cover.
- `u = F(r)`. If `|u| > U·1.95`, hide the tape.
- `sc = scl(u)` and `k = 1/sc`. The tape sits at the depth that gives this on-screen scale:
  - `z = P·(1−k) + o·H·.1`
  - `x = xsc(u)·k`
  - `y = (H·.5·(1−sc)·.42 + o·H·.012 − lift·H·.05)·k`, so far tapes sink a little, forming the bowl.
- `rotateY = sign(u)·min(1,|u|/U)·26°·(1−o) − 90°·o + tiltY·o`, and `rotateX = tiltX·o`.
- Transform: `translate3d(x,y,z) rotateX() rotateY()`. z-index `round(3000+z)`.
- **Shading:** the spine's `--shade` is `min(.6, o·.55 + (1−sc)·.32)`, so far spines darken. The cover's `--shade` is `(1−o)·.82`.
- **Hover lift:** a hovered non-active tape (`|r| > .5`) eases its lift to 1 at `1−e^(−12dt)`.

### Motion
- **Spring:** `s += (T−s)·(1−e^(−k·dt))`, with k = 5.2, or 18 while dragging. `dt` is capped at 50ms. When `s` passes ±4 loops, shift `s` and `T` by whole loops.
- **Active film:** `round(s) mod 12`. On change, swap the caption with `dir = sign(T−s)`.
- **Timeline dot:** interpolate the year between the films at `floor(s)` and `floor(s)+1`. On the 1989 → 1958 wrap, jump at the halfway point. It eases at `1−e^(−14dt)` and jumps directly when more than 6 years away. Left is `(year−1955)/35`.
- **Cover tilt:**
  - The pointer is "on the cover" when it is within `.55d` of the screen centre and `.55H` of the shelf centre, the shelf has settled (`|T−s| < .3`) and the detail is closed.
  - On the cover: `tiltY → (mx−W/2)/(.55d)·8°` and `tiltX → −(my−cy)/(H/2)·5°`.
  - Elsewhere: `tiltY → (mx−W/2)/W·4°` and `tiltX → 0`.
  - Both ease at `1−e^(−7dt)`.
- **Play ring scale:** `smoothstep(max(0, 1−|T−s|·3))`, or 0 while the detail is open.

### Inputs
- **Click a tape:** the active one opens the detail; any other glides to `round(T + r)`. Clicks are ignored after a drag.
- **Arrows and keys:** arrows and ←/→ step ±1. Enter opens, Escape closes.
- **Drag:** `T = T0 − dx/(ws+gap)` once moved more than 5px. Release snaps to the nearest integer.
- **Wheel:** `T += delta/(ws+gap)·.5`, using the larger axis, then snaps after 160ms idle. It is ignored while the detail is open.
- **Timeline click:** convert x to a year and jump to the film with the nearest year by the shortest way round.

## Caption swap (mask slide)

- A new span is appended over the old one inside the mask.
- The new span slides from `translateY(dir·105%)` to 0.
- Each old span slides from its current transform to `translateY(−dir·105%)` and is then removed.
- Timing: 650ms, `cubic-bezier(.2,.8,.2,1)`, `fill both`.

## Detail sheet

**Structure:** a fixed full-screen `.detail` in `--sheet`, z 60, hidden until opened.
- **Grid:** two columns with a 4vw gap and padding `110px 6vw 56px 7vw`.
- **Close button:** a boxed `.lbl` "CLOSE / 閉じる" at 36px, 28px.
- **Brand:** a cobalt copy of the brand ("LEON VASARI —— FILM ARCHIVE") top right.

**Left column:** centred vertically, max 520px, 18px gap. Every line sits in its own mask:
1. The cobalt subtitle `.lbl`.
2. The title in Inter Tight 600, `clamp(44px,5.2vw,80px)`, letter-spacing −.03em, cobalt.
3. The muted meta line `YEAR / GENRE / N min`.
4. The synopsis in Newsreader 17px/1.5, max 42ch.
5. The italic muted credit "Written and directed by Leon Vasari. 監督作品".
6. A 44px cobalt-bordered button "WATCH THE FILM / 映画を見る".

**Right column:** the poster SVG (viewBox 474 × 900, height `min(100%,78vh)`).
- **Image:** the cover crop, masked by seven white circles in a group.
- **Ink filter on that group:** `feTurbulence` fractalNoise, baseFrequency .011, 3 octaves, seed 7, into `feDisplacementMap` with scale 120 (R/G channels).
- **Circles** (cx, cy, delay ms): (150,330,0) (340,600,120) (250,120,220) (90,760,300) (400,250,360) (260,860,420) (230,470,180).

**Open:**
1. Snap T, fill in the texts, aim the poster image, and reset the radii to 0.
2. Read the cover face's projected `getBoundingClientRect`.
3. Animate the sheet's `clip-path` from `inset(top right bottom left round 3px)` (the cover rect) to `inset(0 round 0)` over **1050ms** with `cubic-bezier(.76,0,.18,1)`. A blank rectangle of paper grows straight out of the cover to fill the screen.
4. The text lines rise from `translateY(110%)` over 900ms, with delays of `620 + i·75` ms.
5. From 520ms, each circle grows from 0 to r = 720 over 1250ms after its delay (ease-out cubic). The poster bleeds in as ragged ink blots.

**Close:** the reverse clip back to the current cover rect over 850ms, then hide the sheet and cancel its animations.

## Phones (≤ 767px)
- `--H:min(68vw,40svh)` and `--cy:43%`.
- **Top bar:** 60px, 16px padding. The nav text is hidden (the burger stays) and the brand line is 22px.
- **Kanji:** 22vw at .8 opacity.
- **Caption:** the title is 27px. The arrows drop to bottom 118px at the screen edges.
- **Timeline:** 16px sides, bottom 54px, and every other year label is hidden.
- **Detail:** one scrolling column with the poster first at 46svh and a 42px title.
- No custom cursor; finger drag scrubs the shelf.

## Reduced motion
- The spring and lift are instant.
- Captions swap without sliding.
- The sheet and text animations take 1ms.
- The ink starts 5s in the past, so the poster shows at once.