# Orrin — Kinetic Art: recreation prompt

Build a single-page hero called **"Orrin — Kinetic Art"** as one self-contained `index.html` (HTML, CSS and one JavaScript ES module, no build step). It is a dark, scroll-scrubbed WebGL gallery of live website-preview videos.

**Opening sequence (about 5 s):**
1. The serif wordmark **Orrin** starts at the exact centre of the screen and rises to the top.
2. The title **Kinetic Art** fades in at the centre, and its two words slide apart.
3. Between them, 150 small video cards fly out of one point into a **sine-wave ribbon**.
4. The words fade, and the cards **burst out into a staggered 3-column, 2-layer grid**. The grid keeps a clear hole around the heading. Its back layer turns into faint blank plates, and its front layer plays the videos.
5. The resting heading scales in: a small sans eyebrow, a large three-line serif headline and a glass **Scroll down** button.

**Interaction (from 4.5 s):**
- Scrolling unlocks and the camera follows the mouse on a spring.
- At 6.5 s a glass hint pill appears bottom right.
- Hovering a front card grows it 1.1×.
- Clicking a card swaps the hint for a credit card: a live thumbnail, name, category, an "Open the prompt" link and a close button.

**Scrolling** zooms the camera in, lifts and fades the heading, scrolls the gallery upward through the grid, dims its centre column and moves the wordmark to the top-left corner. Below 900px wide everything switches to a portrait layout with a vertical ribbon.

Follow every value below exactly. They come from the final source.

---

## 1. Media (all public, CORS `Access-Control-Allow-Origin: *`)

There are 16 looping preview videos on one public R2 bucket. Base URL: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/`. Each is an H.264 MP4 at 16:10, 1440×900, with no audio.

Create one `<video>` per clip in JavaScript, not in the DOM:
- set `crossOrigin = "anonymous"`, `muted`, `loop`, `playsInline` (plus the `playsinline` and `muted` attributes) and `preload = "auto"`;
- call `play()` for clip i after a delay of i × 60 ms, catching and ignoring any rejection;
- wrap each in a Three.js `VideoTexture` with sRGB colour space, linear min and mag filters, and no mipmaps.

Use the direct links as they are; do not re-host them.

| # | Video URL | Card title | Category | motionsites.ai prompt id |
|---|---|---|---|---|
| 0 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/card-stack-hero.mp4 | Card Stack | Portfolio | card-stack |
| 1 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/fernhollow.mp4 | Flower Valley | 3D | fernhollow |
| 2 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/medusa-jellyfish-hero.mp4 | Robot Jellyfish | 3D | medusa-jellyfish-hero |
| 3 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/halftone-recap.mp4 | Year Recap | Portfolio | (none) |
| 4 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/lumen-roof-hero.mp4 | Solar Fog | Interactive | lumen-roof-hero |
| 5 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4 | Living Portrait | Portfolio | living-portrait-hero |
| 6 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/wyrmfall.mp4 | Dragon Knight | 3D | (none) |
| 7 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/found-spider.mp4 | Spider Web | Interactive | found-spider |
| 8 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vell-lookbook.mp4 | Runway Lookbook | Interactive | vell-lookbook |
| 9 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/nously-brain.mp4 | Particle Brain | 3D | (none) |
| 10 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vante-ribbon-hero.mp4 | Video Ribbon | Portfolio | vante-ribbon-hero |
| 11 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/mossline-hero.mp4 | Moss Island | SaaS | moss-island |
| 12 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/orbe-future-mode.mp4 | Future Fashion | Fashion | future-fashion |
| 13 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/driftlab-hero.mp4 | Jellyfish Scroll | Interactive | driftlab-hero |
| 14 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/aurelis-infinite-gallery.mp4 | Infinite Gallery | Interactive | (none) |
| 15 | https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/vhs-arc-hero.mp4 | VHS Archive | Portfolio | vhs-archive |

The prompt link is `https://motionsites.ai/?prompt=<id>`. When a clip has no id, link to `https://motionsites.ai/`. The link opens in a new tab.

The only library is **Three.js r160** as an ES module, loaded through an import map: `three` → `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`.

---

## 2. Fonts

| Family | Use | Google Fonts CSS | Direct latin WOFF2 |
|---|---|---|---|
| Newsreader (variable, `opsz` 6–72, weight 400, always with `font-variation-settings: "opsz" 72`) | wordmark, intro title, headline | https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=swap | https://fonts.gstatic.com/s/newsreader/v26/cY9VfjOCX1hbuyalUrK49dLafXjalZCsZBsgBgbNJYQ.woff2 |
| Inter (variable, weights 400 and 500) | eyebrow, button, hint and credit card | https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap | https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2 |

Self-host or base64-embed the WOFF2 files:
- `@font-face "Newsreader"`: weight range 200–800, `font-display: swap`.
- `@font-face "Inter"`: weight range 100–900, `font-display: swap`.

---

## 3. Tokens, rem scale, page shell

**Colours:**

| Token | Value | Use |
|---|---|---|
| --bg | #0a0a0b | page background |
| --ink | #ece8e1 | text, menu button fill |
| --mute | rgba(236,232,225,.55) | hint text, credit description |

**The rem scale drives every size.** Set it on `html`:

| Viewport width | `font-size` |
|---|---|
| default (below 450px) | 2.6666666667vw |
| 450px and up | 12px |
| 901px and up | .625vw |
| 1920px and up | 12px |

So 1rem is 9px at 1440 and 2.4px less per 384px below that, down to 901px.

Also on `html`: `-webkit-font-smoothing: antialiased` and `font-synthesis: none`.

**The 900px switch:**
- CSS: 900px and below is the "mobile" layout.
- JavaScript: `innerWidth < 900` counts as mobile. Rebuild the collage when this flips on resize.

**Page structure:**
- `body`: font-size 1.5rem, `touch-action: pan-y`, `overscroll-behavior: none`.
- A `.track` div 300lvh tall makes the page scrollable.
- The visible hero is `.stage`: `position: fixed`, inset 0, 100lvh tall, `overflow: hidden`, background `radial-gradient(120% 90% at 50% 50%, #111113 0%, #0a0a0b 55%, #050506 100%)`.
- A head script adds `locked` to `<html>` (`overflow: hidden` on `html` and `body`) so the page can't scroll during the intro. It also adds `touch` when `(hover: none) and (pointer: coarse)` matches.

**Type classes:**
- `.textH1`: Newsreader 400, letter-spacing −.03em, line-height 1.
- `.textH2`: Newsreader 400, 6rem, letter-spacing −.02em, line-height 1.2 (4rem at 900px and below).
- `.textLabelS`: Inter 400, 1.4rem, letter-spacing −.01em.

**Glass** (`.blurredBg`): `backdrop-filter: blur(2rem)`, background rgba(28,28,31,.62), radius 1.2rem.

---

## 4. DOM, in order, with measurements

1. **`<canvas class="gl">`** fills `.stage`.

2. **Intro title** `<h1 class="introTitle textH1">` with two spans side by side and no space between them: `.line1` "Kinetic" and `.line2` "Art".
   - Placement: absolutely centred (left 50%, top 50%, translate −50% −50%), flex row, centred, no wrap.
   - Size: font-size **8rem** (on mobile **4rem**, and the flex direction becomes a column).
   - Starts at opacity 0 with `pointer-events: none`.

3. **Breakout wrap** `.breakoutWrap`: absolute, full width, 100lvh tall, flex column, centred both ways, `pointer-events: none`. It holds:
   - **`.breakout`**:
     - Layout: relative, top −5%, width **90rem**, flex column centred, gap **3rem**, centred text, `text-wrap: pretty`, starts at opacity 0.
     - Eyebrow `<p class="breakout__sub textLabelS">`: "Hundreds of Designs, Rendered in Living Motion", weight 500, width **44rem**.
     - Headline `<h2 class="breakout__text textH2">`: "Here's how the Orrin Motion Library is reshaping how web pages move, one frame at a time." Text shadow `0 0 3rem rgba(10,10,11,.85)`. At 1440 wide it wraps to three lines.
   - **Button** `.breakoutBtn` (a sibling of `.breakout` inside the wrap):
     - Layout: relative, z-index 10, `visibility: hidden` until 3.5 s, `pointer-events: auto`, flex row with a 1rem gap, padding 1.5rem × 2rem, margin-top **3rem**.
     - Text: Inter 500 at 1.4rem, letter-spacing −.02em. Label "Scroll down", preceded by a 1.5rem down-arrow SVG (viewBox 0 0 15 15, stroke 1.3, path `M7.5 1.5v12 M2.5 8.5l5 5 5-5`).
     - Background: an absolute `.breakoutBtn__bg` glass layer that scales to **1.16** on hover over .8s with cubic-bezier(.215,.61,.355,1).
     - Clicking scrolls the window smoothly down by one viewport height.
   - **Mobile:** breakout width **30rem**, gap 2rem; headline **2.8rem** with line-height 1 (four lines); eyebrow width **16rem**, wrapping to three lines; button margin 0, font 1.1rem, gap .8rem, padding 1.2rem × 1.5rem, arrow 1.2rem.

4. **Wordmarks** (inside `.logos`, both `position: fixed`, z-index 999): Newsreader "Orrin", letter-spacing −.02em. The inner `.logo__mark` is a flex-centred box **10rem × 4rem** with font-size **4.4rem** (mobile: 5rem × 2rem at 2.2rem).
   - **`.logoCenter`:** at left 50%, top 50lvh; its mark is translated −50% −50%. It fades with a .8s opacity transition.
   - **`.logoLeft`:** at left 2rem, top 2rem, opacity 0. On desktop its mark is 7.4rem × 3rem at 3.3rem, left-aligned.
   - Once `scrollY > 50`, `.logos` gets `showLeftLogo`: the centre mark fades out in .2s and the left mark fades in over .8s.
   - Clicking either mark scrolls smoothly to the top.

5. **Nav** (fixed, inset 0, z 100, `pointer-events: none`):
   - **Menu button:** 4rem square at top 2rem, right 2rem, `pointer-events: auto`.
     - Its `:before` layer is the --ink fill with radius 1.2rem; it scales to 1.1 on hover over .8s with the same bezier, and turns #c9c5be when pressed.
     - Inside are two `<hr>` bars: 36% wide, 1.5px tall, --bg coloured, .6rem apart.
   - **Section dots:**
     - Box: a glass pill at right 2rem, vertically centred, 4rem × 9rem, radius 1rem, flex column with a .4rem gap.
     - Dots: three, each .5rem × .5rem with radius .25rem.
     - Each dot has a 10%-opacity track. The first dot is "active": it is 3rem tall with an .8s ease-in-out height transition, and its fill height is `var(--progress)` × 100%, driven by scroll progress.
   - **Mobile:** button at right 1rem; dots at right 1rem, top 45%, 2rem × 7rem.

6. **Credits popup** `.creditsPopup.blurredBg`, `aria-live="polite"`:
   - **Box:** fixed at right 2rem, bottom 2rem, z 100, flex with a 2rem gap, width **35.4rem**, padding 1.5rem 3.5rem 1.5rem 1.5rem. Starts at opacity 0 with `pointer-events: none`; `.active` turns pointer events on.
   - **Tutorial variant** `.creditsPopup--tutorial`: width auto, padding 2rem 5rem 2rem 2rem. It holds one `textLabelS` paragraph in --mute: "Click on any design to learn more." (touch or mobile: "Tap on any design to learn more.").
   - **Credit variant**, in order:
     - a close button: .8rem square at top 2rem, right 2rem, an X drawn with a 1.2 stroke;
     - a 4.6rem square thumbnail: the clip's own MP4 as a muted, looping, autoplaying `<video>` with `object-fit: contain` and `object-position: center top`, linked to the prompt;
     - a text column at 1.3rem with line-height 1.3, containing:
       - the title (Inter 500);
       - the line "<Category> · Orrin Motion Library";
       - a description in --mute with a 1rem top margin: an underlined "Open the prompt" link, then ", a live motion design, free to remix";
     - an 11px external-link icon at bottom 2rem, right 2rem, which fades in over .2s only while the link is hovered (desktop only).
   - **901–1600px:** gap 15px, padding 20px 35px 20px 20px, width 354px. Tutorial padding 2.4rem 6rem 2.4rem 1.8rem. Close button and icon at 20px.
   - **Mobile:** left and right 1.5rem, bottom 4.3rem, width auto. The tutorial is centred with padding 1.6rem × 2rem. No icon.

7. **Landscape warning:** a fixed full-screen --bg overlay at z 1000 showing "Rotate your device to portrait for the best view." in 10px text at 50% opacity, no wrap. It shows only on touch devices when `min-aspect-ratio: 13/9`.

---

## 5. The 3D scene

**Renderer and camera**
- WebGLRenderer with antialias and alpha (transparent, so the gradient shows through), pixel ratio min(dpr, 2), sRGB output, sized to the viewport.
- PerspectiveCamera: **fov 45**, near .1, far 100, at **(0, 0, 5)** with no rotation.
- Camera x and y follow a damped spring toward a target: acceleration = −100·(pos − target) − 30·velocity, integrated each frame with dt capped at .05 s.
- From 4.5 s, `cameraMotion` = **.25**. On pointer move (not on touch devices), the target is x = lerp(−.25, .25, clientX/W) and y = lerp(.25, −.25, clientY/H). Before that, and on touch devices, the target is (0, 0).
- Camera z is set directly by the scroll zoom (§7).

**Collage configuration** (desktop / mobile):

| Setting | Desktop | Mobile |
|---|---|---|
| columns × rows × layers | 3 × 25 × 2 (150 images) | 3 × 30 × 2 (180 images) |
| xSpacing / ySpacing / zSpacing | 2.8 / 1.3 / 1 | 1.7 / 1.5 / 1 |
| random size per image | 0.7 – 1.0 | 0.5 – 0.8 |
| repel radius | 1 | .46 |
| ribbon scale | .5 | .4 |
| start point | (.5, 0, 0) | (0, 0, 0) |
| centre-dim threshold \|x\| | 1 | .5 |

Derived values: grid width = (cols−1)·xSpacing; grid height = (rows−1)·ySpacing; depth = (layers−1)·zSpacing = 1.

**Seeded randomness.** Use a mulberry32 PRNG seeded at 20261108 at every build, so layout and timing are identical on every load. Clip order is a seeded shuffle of 0–15; image j shows clip `order[j mod 16]`.

**Each image j** (0 … count−1) is a nest of groups:
- **outer:** position plus intro scale;
- **holder:** a seeded random scale between min and max size;
- **inner:** the hover scale;
- **mesh:** a 1×1 plane scaled to (1, 10/16) so the 16:10 video sits inside a unit square.

**Grid slot** (a brick offset):
- `G = −width/2 − xSpacing/2`; on mobile also add `ae = .7` to y.
- col = j mod cols; row = ⌊(j mod (cols·rows)) / cols⌋; layer = ⌊j / (cols·rows)⌋.
- x = col·xSpacing + (row odd ? xSpacing/2 : 0) + (layer odd ? xSpacing/2 : 0) + G
- y = −row·ySpacing + (col odd ? ySpacing·.3 : 0) + (layer odd ? ySpacing/2 : 0) (+ .7 on mobile)
- z = −layer·zSpacing, so the front layer is at 0 and the back layer at −1.
- Only front-layer images (z ≠ −depth) are interactive.

**Ribbon slot:**
- mid = ⌊count/2⌋; At = mid − |j − mid|; z = zGrid·.01 − At·.005, so the middle of the ribbon sits deeper; xe = j/count.
- Desktop: x = lerp(−1.5, 1.5, xe) + .5, y = sin(2π·xe)·.7.
- Mobile: x = sin(2π·xe)·.35, y = lerp(−1, 1, xe) + .05 (a vertical S).

**Intro schedule.** Seeded-shuffle the images; for the image at shuffled position k:
- `d1 = −.1 + At·.008 + .2`: the ends of the ribbon arrive first and the middle about .6 s later;
- `d2 = 2.1 + k·.003`: the burst starts over a .45 s spread.

**Per frame**, with intro time t:
- k1 = power2.inOut over [d1, d1+1.5]; k2 = power2.inOut over [d2, d2+2].
- Intro scale = lerp(lerp(0, ribbonScale, k1), 1, k2). Hide the image while its scale is ≈ 0.
- **Rest position:**
  1. Take the grid slot and add the collage scroll offset to y (§7).
  2. Push it out of the **repel hole** at (0, .93 + scroll, 0): f = slot − repel; if |f.x| < .1, set f.x = .1; set f.z = 0; normalise f, scale it by the repel radius, and add it to the slot.
- Position = start, lerp to the ribbon slot by k1, then lerp to the rest position by k2.

**Material** (ShaderMaterial; transparent; `depthWrite: false`). Uniforms: `uTexture` (the clip's VideoTexture), `uDepth` = 1, `uDimmed`, `uRolloverPr`.
- **Vertex shader:** `vDepthFactor = smoothstep(−uDepth, −0.5, worldPosition.z)`; pass the uv.
- **Fragment shader**, with tex = texture2D(uTexture, vUv):
  1. `cDimmed = mix(vec3(0.003), tex.rgb, .5)`
  2. `cBack = mix(vec3(0.011), tex.rgb, .004)`. The back layer becomes near-blank plates just lighter than the page.
  3. `color = tex`
  4. `color.rgb = mix(color.rgb, cDimmed, uDimmed)`
  5. `color.rgb = mix(cBack, color.rgb, vDepthFactor)`
  6. `color.rgb = mix(color.rgb, tex.rgb, uRolloverPr)`
  7. `color.rgb = mix(cBack, color.rgb, tex.a)`
  8. `color.a = mix(1., tex.a, clamp(vDepthFactor + uRolloverPr, 0., 1.))`
  9. End with the `tonemapping_fragment` and `colorspace_fragment` includes.

  Cards in flight between layers fade smoothly between full video and blank plate.

---

## 6. Intro timeline (t in seconds; GSAP-equivalent easings)

Easings:
- power1.out = 1−(1−x)²
- power2.out = 1−(1−x)³
- power3.out = 1−(1−x)⁴
- power2.in = x³
- power2.inOut = x < .5 ? 4x³ : 1 − (−2x+2)³/2
- power3.inOut = x < .5 ? 8x⁴ : 1 − (−2x+2)⁴/2
- sine.inOut = −(cos πx − 1)/2

| t start | Duration | Element | Animation |
|---|---|---|---|
| 0 | 1.5 (power2.inOut) | Centre wordmark | translateY 0 → −45vh (from the screen centre to the top) |
| 0.1 | 1.5 (power3.inOut) | Intro title | opacity 0 → 1, scale .8 → 1 |
| 0 | 1.5 (power2.inOut) | "Kinetic" / "Art" | translateX 0 → −41vh / +50vh (mobile: translateY −30vh / +28vh) |
| ~0.1 – 0.9 | 1.5 each (power2.inOut) | 150 images | from the start point onto the ribbon, scale 0 → .5 (per d1) |
| 2.1 – 2.55 | 2 each (power2.inOut) | 150 images | from the ribbon into the grid, scale .5 → 1 (per d2) |
| 2.2 | 0.5 (power2.inOut) | "Kinetic" / "Art" | opacity 1 → 0 |
| 3.5 | 1.5 (power2.out) | Breakout | opacity 0 → 1, scale .8 → 1; the button turns visible at once |
| 4.0 | — | Hover | enabled |
| 4.5 | — | Scroll | `locked` removed, scrolling allowed, camera motion .25 |
| 6.5 | — | Hint pill | the tutorial shows, unless a design was already opened |

**Popup motion:**
- Show: after a .1 s delay, opacity 0 → 1 over .5 s (power1.out), scale .9 → 1 over 1.5 s (power3.out).
- Hide: opacity → 0 and scale → .9 over .3 s (power2.in); clear the contents once it's gone.
- Transform origin: bottom right (mobile: bottom centre).

**QA freeze:** the URL parameter `?t=<seconds>` pins the intro clock at that second, for checking frames and rendering recordings.

**Reduced motion** (`prefers-reduced-motion: reduce`): start in the resting state (t treated as 99, the intro words hidden, no hover). Videos load, seek to 1.2 s and stay paused.

---

## 7. Scroll timeline (scrubbed)

**Progress:**
- Raw progress p = scrollY / (scrollHeight − innerHeight), clamped 0–1, and 0 while locked.
- Smooth it each frame: s += (p − s)·.1.
- Scroll time is ST = s·4.5.

| ST range | Effect |
|---|---|
| 0 – 1.5 (power2.out) | Camera z 5 → 4 (zoom in) |
| 0 – 1 (linear) | Breakout opacity 1 → 0 (the lower of this and its intro opacity applies). The breakout wrap moves translateY 0 → −75vh. |
| 1 – 2 (sine.inOut) | `uDimmed` 0 → 1 on images whose grid x is within ±1 (mobile ±.5) |
| all | Collage scroll: section progress = ST / 18.8; target = clamp(progress/.7)·gridHeight; scroll += (target − scroll)·.3 per frame. It is added to every grid y and to the repel point. |
| scrollY > 50 | Wordmark swaps to the top-left corner |
| all | First nav dot fill = s |

**Scrolling** means a scroll event in the last 150 ms, or s still catching up by more than .002. While scrolling:
- hover is off;
- an open credit card closes (the tutorial stays).

---

## 8. Hover and click

- **Hover** is live when t ≥ 4, not reduced motion, not scrolling, and the pointer's last move targeted the canvas.
  - Each frame, raycast from the pointer against the **front-layer** meshes only.
  - On the hit card: inner scale eases to **1.1** over .5 s (power1.out) and `uRolloverPr` to 1 over .2 s. Its `renderOrder` becomes 1 and `depthTest` turns off, so it draws over its neighbours. The stage gets `.hot` (`cursor: pointer` on the canvas).
  - On un-hover, both values ease back over the same durations.
- **Click** on the canvas (t ≥ 4): raycast the front layer the same way. A hit opens the credit card for that clip (§4.6). The tutorial never comes back after the first card opens. The close button hides the popup.

---

## 9. Acceptance checklist

- [ ] At 1440×900, `?t=0.4` shows "Orrin" centred with "Kinetic Art" faintly scaling in behind it.
- [ ] At `?t=1.5`, "Kinetic" and "Art" sit far apart with a dense sine ribbon of video cards between them, right of centre; "Orrin" is at the top.
- [ ] At `?t=3.2`, the cards are mid-burst toward the grid and the words are gone.
- [ ] At `?t=8`, the heading is three lines and the button sits under it. Live cards and faint blank plates are scattered around a clear centre, and the hint pill reads "Click on any design to learn more."
- [ ] Hovering a front card grows it; clicking opens its credit card, whose link and thumbnail work and whose close button works.
- [ ] Moving the mouse sways the camera on a spring, nearer cards more than farther ones.
- [ ] Scrolling zooms in, lifts the heading away, scrolls the gallery up, dims the centre column, moves the wordmark to the top-left and fills the first dot; scrolling back restores it all.
- [ ] At 390×844 the ribbon is vertical between the stacked "Kinetic" and "Art". At rest the eyebrow is three lines and the headline four, and a full-width "Tap on any design…" pill sits at the bottom.
- [ ] No console errors. All 16 MP4s, both fonts and three.module.js return 200.