# SUNFIZZ — exact recreation prompt

Build a single-file, scroll-driven product website for **SUNFIZZ**, a fictional sparkling fruit soda in glass bottles. All products are real-time 3D bottles rendered with Three.js r160 on one full-screen WebGL canvas. Four story sections are choreographed on one continuous scroll timeline: hero carousel, sticky back-label story, manifesto, and a receding bottle lineup that the page ends on. Every visible layer is `position: fixed` and driven by a smoothed scroll value. The document itself only contains an empty 805vh tall track that gives the page its scroll length.

---

## 1. Assets and URLs

| Asset | URL / source | Use |
|---|---|---|
| Label artwork sheet (8 front labels, 2 columns × 4 rows, transparent PNG, 2048×2048) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261120_070622_93733524-ae88-4030-bcf5-052bfac8f786.png&w=2048&q=90` (load with `crossOrigin='anonymous'`; CORS is open) | Each cell is 1024×512 of the 2048×2048 sheet. Cell index i: column `i%2`, row `floor(i/2)`. Each cell is drawn into its own 1024×512 canvas and used as the front-label texture. Order: 0 PEACH FIZZ, 1 APRICOT FIZZ, 2 ROSE FIZZ, 3 BLOOD ORANGE, 4 MANGO FIZZ, 5 RASPBERRY, 6 GUAVA FIZZ, 7 NECTARINE. Every label is a cream (#FFF3EC) brush-edged ribbon tilted up to the right, with a big hand-lettered italic "SUNFIZZ" wordmark in the flavour colour, the flavour name in small condensed italic caps and a small flat fruit illustration. |
| Three.js | `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js` via an import map `{"imports":{"three":"…"}}` | Renderer |
| Barlow Condensed 800 italic | `https://fonts.gstatic.com/s/barlowcondensed/v13/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrf3fmu4kG.woff2` | Display type, back-label row headings |
| Barlow Condensed 900 italic | `https://fonts.gstatic.com/s/barlowcondensed/v13/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrW3bmu4kG.woff2` | Logo, all big headlines, manifesto texture |
| Manrope 400–700 (variable, latin) | `https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSg.woff2` | Body copy, nav, buttons, label small print |

If the label sheet fails to load, the fallback draws each front label in canvas: the brush banner shape in cream, "SUNFIZZ" in 900 italic 230px in the flavour ink colour, centred at y 300, and the flavour name in 800 italic 64px at y 380.

Everything else (bottle geometry, glass, liquid, caps, back labels, droplets, environment lighting, background, manifesto type, disc, glows) is generated in code.

## 2. Head, fonts, tokens

- `<title>SUNFIZZ — Real Fruit Soda</title>`, meta description "SUNFIZZ sparkling fruit soda in glass bottles. Real fruit, light fizz, no sugar added.", and the viewport `width=device-width, initial-scale=1, viewport-fit=cover`.
- @font-face: "Barlow Condensed" italic 800 and italic 900 with `font-display:block`, and "Manrope" normal 400–700 with `font-display:swap`.
- Colour tokens: `--cocoa #4A1E17` (text), `--coral #E25B45` (accent), `--cream #FFF3EC`, `--peach #FCD9C8`, `--peach2 #F5B39A`. The html and body background is #F5B39A.
- Easing token: `--ease: cubic-bezier(.22,1,.36,1)`. Font stacks: `--disp: "Barlow Condensed", Impact, sans-serif` and `--body: "Manrope", system-ui, sans-serif`.

### Flavour table

| # | Name | Liquid | Cap / accent | Label ink | Fruit word |
|---|---|---|---|---|---|
| 0 | PEACH FIZZ | #F27A3C | #E25B45 | #E8673E | peach |
| 1 | APRICOT FIZZ | #F39A2E | #E58A2A | #E8942F | apricot |
| 2 | ROSE FIZZ | #EC6E8F | #D9567A | #D9567A | rose petal |
| 3 | BLOOD ORANGE | #D63A2C | #C7332B | #C7332B | blood orange |
| 4 | MANGO FIZZ | #F4AA2C | #E39A22 | #E7A229 | mango |
| 5 | RASPBERRY | #D6436A | #C93A5C | #C93A5C | raspberry |
| 6 | GUAVA FIZZ | #EF7464 | #E2665E | #E2665E | guava |
| 7 | NECTARINE | #EA5A30 | #D9502F | #D9502F | nectarine |

There are 16 bottle instances. Instance i uses flavour `i % 8`, so every flavour appears twice. Per-instance hero tilt (rad): .10, −.15, .07, −.09, .14, −.06, .12, −.13, .08, −.11, .15, −.07, .09, −.14, .06, −.10.

## 3. DOM, in order (all overlays fixed)

1. `canvas#gl`: fixed, inset 0, 100vw × 100lvh, `touch-action: pan-y`. It starts at opacity 0 and fades to 1 over 1 s with the ease token when `body.ready` is added.
2. `header.nav`: fixed, 84px tall, contents centred, z-index 5.
   - It starts at opacity 0 and translateY(−12px), then eases in over .9 s when `body.intro-ui` is added (at 70% of the intro).
   - Logo: "SUNFIZZ" plus a superscript "™" (Manrope 600 9px). Barlow 900 italic 40px, letter-spacing −.01em, cream, text-shadow `0 1px 14px rgba(120,40,20,.18)`, centred.
   - Right group, absolutely positioned 48px from the right edge with a 34px gap:
     - Menu button: a 2×2 grid of 4px rounded squares with a 3px gap, then the word "MENU" (Manrope 700 13px, letter-spacing .08em), cream, min 32×32px.
     - "SHOP" pill: Manrope 800 12px, letter-spacing .08em, 1.5px cream border, radius 999px, padding 9px 24px. On hover it fills cream with cocoa text. A click glides to the lineup.
3. `#hero` overlay:
   - `h1.title`: the current flavour name. Top-left at left 3.4vw, top max(92px, 11vh). Barlow 900 italic, size clamp(54px, 7.4vw, 112px), line-height 1, letter-spacing −.015em, cocoa, uppercase. Overflow hidden with height equal to one line, so names roll vertically.
   - Arrow buttons bottom-right (right 3.2vw, bottom max(40px, 6vh), 16px gap). Each is a 52px circle with a 2px cream border at .95 alpha, cream fill at .08 alpha, shadow `0 4px 18px rgba(150,60,30,.12)` and an 18px chevron (stroke 2). On hover the fill rises to .22 alpha and the button scales to 1.06; while pressed it scales to .96.
   - `.strip`: a 3px glowing line on the bottom edge. Its gradient runs transparent → flavour tint (18%) → white (50%) → flavour tint (82%) → transparent, with box-shadows `0 0 22px 6px` and `0 0 70px 18px` in the flavour colour. The flavour colour comes from the CSS variables --sc and --sg, set every frame.
4. `#story` overlay:
   - Left icon column: left 4.4vw, vertically centred, 22px gap. Four 58px circles with a 2px cream border and 24px line icons (leaf, bubbles, peach, sun). The active one has a cream fill, a coral icon and scale 1.08, transitioned over .45 s with the ease token.
   - Copy block: left 51.5vw, top 50%, translateY(−46%), width min(36vw, 520px).
     - Tag: a 22px coral rounded square, then text in Manrope 700 11px, letter-spacing .16em, uppercase.
     - Title `h2.stitle`: Barlow 900 italic clamp(64px, 7.6vw, 118px), line-height .9, letter-spacing −.02em, cocoa, min-height 1.8em. It contains a placeholder-bars element: two blurred bars at 80% and 56% width, cocoa at .18 alpha.
     - Body: Manrope 400 clamp(15px, 1.25vw, 19px), line-height 1.6, cocoa at .86 alpha.
5. `#track`: an empty div, 805vh tall. It is the only thing the browser actually scrolls.

## 4. 3D scene

- **Renderer:**
  - WebGLRenderer with antialias.
  - Pixel ratio min(dpr, 1.5). If the average frame time goes above 19.5 ms, it drops by .15 (down to .7) and won't rise again for 8 s. Otherwise it climbs back by .05 per 1.2 s while frames stay under 17.3 ms.
  - Tone mapping ACESFilmic at exposure 1.0, sRGB output.
- **Camera:** PerspectiveCamera with fov 30, at z = 10 looking at the origin. The visible height at z = 0 is VH = 20·tan(15°) = 5.359, and the visible width is W = VH × aspect.
- **Environment** (PMREM from a small scene, blur .035): background #2c1b17, plus emissive planes facing the origin:
  - 1.0×16 white ×7 at (−5.5, 0, 4.2)
  - 0.55×16 white ×5 at (4.8, .5, 3.6)
  - 0.35×16 #fff4ea ×3.5 at (1.4, 0, 6.5)
  - 12×2.5 #fff1e6 ×2.4 at (0, 7.5, 1.5)
  - 10×9 #ff9466 ×1.3 at (0, −1, −8)
  - 7×8 #ffc6a8 ×1.1 at (−8, −1, −3)
  - 7×8 #ffb08c ×.9 at (8, −1, −2)

  These planes create the long vertical specular streaks on the glass. A DirectionalLight (white, 1.1) sits at (−3, 5, 6), plus an AmbientLight #ffe8dc at .35.
- **Bottle (height BH = 2.43 units, pivot at mid-height):**
  - **Glass:** a LatheGeometry with 112 segments from a 140-point centripetal Catmull-Rom profile of (radius, y): (0,0) (.40,0) (.485,.022) (.515,.085) (.52,.16) (.52,1.08) (.524,1.2) (.517,1.33) (.47,1.5) (.385,1.69) (.295,1.86) (.24,2.0) (.217,2.12) (.21,2.21) (.226,2.245) (.229,2.31) (.214,2.34) (.18,2.345).
    - Material: MeshPhysicalMaterial with black colour, roughness .04, transparent, opacity .07, no depth write, clearcoat 1 (roughness .05), envMapIntensity 2.1, ior 1.5.
    - Before `opaque_fragment`, alpha is patched to `a + fresnel·.3 + smoothstep(.22, 1.1, maxRGB(outgoingLight))·.9`, where fresnel = (1 − |n·v|)^2.2. Only the rims and specular highlights become opaque, which keeps the juice colour rich.
    - Droplet normal map: a 512² canvas with 340 seeded radial-gradient drops (radius 2–15px), converted to normals with strength 2.2. Repeat 3 × 2.4, normalScale .42.
  - **Liquid:** a lathe (96 segments) of (0,.06) (.38,.06) (.465,.09) (.49,.16) (.49,1.08) (.493,1.2) (.487,1.33) (.443,1.5) (.36,1.69) (.272,1.86) (.214,2.0) (.196,2.12) (.19,2.24) (0,2.24). MeshPhysicalMaterial in the flavour liquid colour, roughness .22, emissive in the same colour, clearcoat .7.
  - **Crown cap:** a lathe (126 segments) of (0,2.425) (.17,2.425) (.222,2.415) (.244,2.39) (.252,2.36) (.254,2.3) (.246,2.285). Below y 2.4, vertices are pushed out radially by `1 + .04·max(0,cos(21φ))^.7` to form 21 crimps. MeshStandardMaterial in the cap colour, metalness .55, roughness .32.
  - **Front label:** an open CylinderGeometry with radius .528, height .94, centred on +z, covering an arc of (.94·2)/.528 rad. It sits at y .6 from the base and uses the sheet cell as its map with alphaTest .5, roughness .55, clearcoat .25.
  - **Back label:** an open cylinder with radius .528, height .88, arc 2.4 rad centred on π, at y .62.
    - The 1024×700 canvas holds the brush-banner shape in cream, "SUNFIZZ" (900 italic 104px, ink colour, at y 118) and "SPARKLING FRUIT SODA" (800 italic 30px, at y 156).
    - Three rows at canvas y 175, 325 and 475, each 140px tall, spanning x 150–874:
      - REAL FRUIT: "18% {fruit} juice, never from concentrate"
      - LIGHT FIZZ: "Fine bubbles, a soft natural sparkle"
      - NO SUGAR ADDED: "4.2 g sugar per 100 ml, all from fruit"
    - Each row has an 80px outlined circle icon (leaf, bubbles, fruit) at x+70, a heading in 800 italic 60px at x+135, and detail text in Manrope 500 25px.
    - Footer: "330 ml · 92 kcal · best served cold" at y 662.
    - There is no coloured fill on the label: rows are highlighted in the shader with white light only (see section 8).
- **Hero disc:**
  - A clear cylinder with radius 1 and height .05 (opacity .22).
  - An additive torus ring with radius 1 and tube .007. Its colour is the flavour cap colour lerped .25 toward white, ×1.5.
  - A flattened radial-glow plane (3.2 × 1.1, tilted).
  - The whole disc is scaled by (hc·1.25, hc·1.2, hc·1.25) and sits at the bottom of the centre bottle.
- **Row glow:** an additive open cylinder with radius .544, height .3 and arc 2.1 rad around π, holding a horizontal/vertical feathered glow texture. It is attached to the centre bottle and follows the active back-label row.

## 5. Background shader (a full-screen quad drawn first)

The background is a gradient from bottom to top colour. On top of it:
- Glow: `glowColour · amount · exp(−|(uv − glowPos)·(aspect,1)|² · radius)`.
- Floor sheen: `glow · floor · smoothstep(.5, 0, uv.y) · .55`.
- Clouds: `fbm` (5 octaves) at uv·aspect·1.35, drifting at (.022, .011)·t, plus a second fbm at ×1.8 with weight .32, passed through smoothstep(.42, .86). The result mixes toward #FFE6DA by cloud·.5.
- Manifesto type: two canvas textures, sharp (blur 5px) and soft (blur 26px), each 2048×1024 with "REAL FRUIT" / "REAL FIZZ" in white 900 italic fitted to 1880px wide. They are mixed by `sharp`, given per-pixel animated grain (×.82–1.18), and tinted #FFF1E8 at amount·.78. The text box is centred at uTxtY (.47 portrait to .5 landscape) and is uTxtW of the screen width (1.02 portrait to .92 landscape).
- Global film grain of ±.0225 on everything.

Phase palettes (top / bottom / glow / glow position / glow amount / glow radius / clouds / floor):
- **hero:** #EE9F84 / #F7BBA2 / #FFD8C4 / (.5, .2) / .42 / 2.4 / 0 / 0
- **story:** #F6B8A0 / #F09C7F / #FFE6D8 / (.36, .5) / .5 / 1.6 / 0 / 0
- **manifesto:** #F29A87 / #E7806E / #FFD2C2 / (.5, .42) / .45 / 1.8 / 1 / 0
- **lineup:** #3E150E / #250A06 / #7A2E1A / (.3, .05) / 0 / 2 / 0 / 1

## 6. Scroll system

- Y = (spring-smoothed scrollY) / innerHeight. A critically damped spring with ω = 5.6, sub-stepped at 240 Hz, follows the native scroll position, so wheel notches, trackpads, touch flings, keys and jumps all become one soft glide with no overshoot. With reduced motion, ω = 40. dt comes from the rAF timestamp, capped at 50 ms.
- Timeline in viewport heights: a 0–.75 (hero → story), s .75–3.3 (story), b 3.3–3.95 (story → manifesto), m 3.95–5.0 (manifesto), c 5.0–5.7 (manifesto → lineup), l 5.7–7.05 (lineup sweep, the end of the page). a, b and c use easeInOutCubic.
- Overlay opacity:
  - hero = 1 − smoothstep(.02, .35, Y), shown only once the intro passes 75%
  - story = smoothstep(.5, .8, Y) · (1 − smoothstep(3.3, 3.55, Y))
  - visibility is set to hidden below .01.

## 7. Layout functions (k = smoothstep(.72, 1.25, aspect): 0 is portrait, 1 is landscape)

- **Hero centre bottle:** height lerp(.38, .5, k)·VH, capped so its width ≤ lerp(.36, .2, k)·W. The bottom sits at y = lerp(−.3, −.35, k)·VH.
- **Hero arc (d = signed slot distance from the centre, continuous):**
  - x = sign(d)·(min(|d|,1)·s1 + max(0,|d|−1)·s2)·W, with s1 = lerp(.36, .15, k) and s2 = lerp(.25, .104, k)
  - scale = hc·(1 − .3·min(|d|,1) − .035·max(0,|d|−1))
  - bottoms stay level; side bottles sit +.05·VH higher
  - z = −min(|d|,6)·.32
  - rotZ = tilt[i]·smoothstep(0, 1, |d|), rotY = −d·.2
  - idle: y += sin(1.1t + 1.7i)·.035, rotZ += sin(.8t + 2.3i)·.025, rotY += sin(.5t + i)·.06
- **Story:** start height lerp(.9, 1.08, k)·VH, at x = lerp(0, −.17, k)·W, top at lerp(.15, .44, k)·VH, tilt rotZ lerp(.12, .3, k). Close-up scale = min(start·lerp(1.25, 1.22, k), lerp(.78, .36, k)·W / 1.04) at x = lerp(0, −.165, k)·W. The active row's centre is placed at y = lerp(−.19, 0, k)·VH.
- **Manifesto:** height min(lerp(.5, .7, k)·VH, .36·W·2.43/1.05), centre y = lerp(−.16, −.1, k)·VH.
- **Lineup:** height lerp(.42, .6, k)·VH. For slot u = slot − easeInOut(l)·2: z = 1.4 − 1.55u; x runs linearly from −.3W·.86 (u = 0) to .48W·3.19 (u = 15), plus min(0,u)·.35W for bottles leaving on the left; the floor is at (−.43·VH)·.86; rotY = −.38 + sin(.8u + 2.5l)·.12.

## 8. Choreography

- **Load:**
  - Once the fonts and the label sheet have loaded and all shaders are precompiled, the canvas fades in.
  - The intro runs for 1.9 s. Each bottle's own progress is (intro − .06·|d|)/.62, so the centre bottle goes first.
  - The centre bottle rises from 75% of the screen height below with easeOutCubic.
  - Side bottles fly in from ±.85W with easeOutBack (overshoot 1.15) while their tilt unwinds from ±.5 rad.
  - The disc rises with easeOutCubic. The nav, title and arrows fade in last.
- **Hero carousel:**
  - The value `car` follows a target with a critically damped spring (k = 46).
  - Drag with mouse or touch: one bottle step equals s1·innerWidth px.
  - Release: the velocity is smoothed with lerp .35 per move and clamped to ±14 slots/s. If the pointer has rested for more than 90 ms, the velocity resets to 0. The target becomes round(car + v·.22), so a fast throw passes several bottles and glides to a soft stop.
  - A click (under 6px of movement) raycasts the glass: clicking a side bottle centres it.
  - ‹ › buttons and the arrow keys: target ±1. A horizontal trackpad swipe adds deltaX/220, then snaps 130 ms after the last wheel event.
  - Hover: a side bottle lifts .09 and brightens, and the cursor is grab/grabbing/pointer.
  - Lighting: the centre bottle is fully lit and side bottles dim by up to 48% (liquid colour ×(.42 + .58L), emissive .08 + .34L, labels .48 + .52L).
  - When the centre flavour changes, the title rolls: the new name slides in from below (or above when moving backwards) over .62 s with the ease token while the old one slides out. The disc ring, glow and bottom strip cross-fade to the flavour colour with exp(−4dt) smoothing.
- **Hero → story (a):**
  - Side bottles slide out by ±.9W·a and shrink by 25%.
  - The disc sinks.
  - The centre bottle blends into the story pose. The bottle that was centred is the one shown in the story.
- **Story (s):**
  - Turn: turn = easeInOut(s/.12). The bottle zooms from the start scale to the close-up scale, moves to the close-up x, straightens rotZ to .025 and rotates rotY by π to show its back label.
  - Row follow: f = step + smoothstep(.6, 1, frac(3s)), with f ≤ 2. The bottle's y keeps row f (interpolated between row centres) at the row target height. rotY adds (f − 1)·.14 and an idle sway of sin(.7t)·.025.
  - Highlight: the active row k = floor(3s) is used once s ≥ .11.
    - The row's sweep value p moves toward 1 at 1/0.6 per second; other rows move toward 0 at 1.4× that rate. The shader receives easeInOut(p).
    - White gradient highlight, no coloured fill: inside the active row band, a sweep mask runs where u < mix(.12, .9, p) with a .03 soft edge, feathered at both ends (smoothstep .12→.30 and .90→.72 in u). Where the mask is on, only the light label paper (luma smoothstep .72→.90) is mixed toward pure white by .85. The text, icon and detail line are never washed; they are multiplied by 1 − mask·.25, so the active row reads a touch deeper.
    - Inactive rows are dimmed toward cream by d·.66, where d smooths toward 1 with exp(−7dt).
    - On every row change, a diagonal white light streak crosses the row paper (not the text): position mix(−.15, 1.15, easeOutCubic(t)) over .95 s, intensity sin(πt)·.6.
    - The row-glow cylinder follows the active row's y with exp(−8dt). It is pure white, additive, at opacity .2 + .05·sin(2.2t).
  - Copy: the same index drives the left copy. Steps:
    - "01 — Fruit" / REAL FRUIT / "Made with real fruit juice and a splash of sparkling water. Bright, refreshing and naturally delicious."
    - "02 — Bubbles" / LIGHT FIZZ / "Fine bubbles, never harsh. A soft sparkle that lifts the fruit instead of hiding it under gas."
    - "03 — Sugar" / NO SUGAR ADDED / "Sweetened only by ripe fruit, with 40% less sugar than classic soda and nothing artificial inside."
  - Decode reveal: the tag and body blur out (8px blur, .5 s), the title hides behind the placeholder bars for 230 ms, then the new title scrambles from random glyphs (A–Z, 0–9) resolving left to right over 520 ms. The tag returns at once and the body fades back in after 160 ms.
  - Icons: the active icon fills. Clicking an icon scrolls to the middle of its step (the 4th icon jumps to the lineup).
- **Story → manifesto (b):** the bottle blends from the last story pose to the manifesto pose: it turns back to the front (rotY toward 2π), shrinks and centres. The background cross-fades to the manifesto palette and the type fades in (amount b).
- **Manifesto (m):** the bottle spins one full extra turn with easeInOut(m). The type sharpens from fully soft to .62 sharp with easeOutCubic(m) and drifts horizontally by (m − .5)·.03. Clouds move continuously.
- **Manifesto → lineup (c):**
  - The background fades to dark cocoa and the type fades out.
  - The other 15 bottles slide in alternately from left and right (±1.25W, with .05·VH lift and ±1.2 rad turn) into their lineup slots, staggered by (slot%5)/5·.15.
  - The manifesto bottle moves to slot 0, at the front left.
- **Lineup (l):** the whole row sweeps 2 slots toward the camera and left (easeInOutCubic over l), each bottle turning slightly in a sine wave. At l = 1 it rests on a clean receding row with the third bottle at the front left, which is the final state of the page.

## 9. Responsive

- **≤ 820px wide or portrait:**
  - Nav is 68px, the logo 30px, and the word "MENU" is hidden.
  - Hero title: left 20px, top max(78px, 10vh), size clamp(46px, 13vw, 80px).
  - Arrows: 48px, bottom-right 20px.
  - Story copy: top max(86px, 11vh), full width with 20px gutters, title clamp(50px, 13vw, 84px), body 15px. The icons become a 44px row at the bottom right.
  - The 3D layout uses the k = 0 values in section 7.
- **≤ 360px wide:** logo 25px, SHOP padding 7px 11px.
- **Short landscape (height ≤ 520px and aspect ≥ 1):** keeps the desktop split. The icon column is at left 3vw and the copy at left 51.5vw. Titles are clamp(40px, 6vw, 64px).
- **Reduced motion:** the intro is skipped, the idle bob, sway and spins are off, transitions are near-instant, and the scroll spring is stiff (ω 40). Drag and arrows still work.

## 10. Acceptance checklist

- [ ] The glass shows long vertical highlight streaks and Fresnel rims, with the rich juice colour visible and not milky.
- [ ] A throw passes several bottles and settles softly, and the title rolls in the throw direction.
- [ ] In the story, the bottle turns to the back label and each row lights up with a soft white gradient sweep and a light streak (no coloured fill, text stays crisp) while the others dim. The camera keeps the active row level with the copy.
- [ ] Scrolling backwards reverses everything exactly.
- [ ] The manifesto type sharpens and grains behind the spinning bottle.
- [ ] The lineup recedes in perspective on dark cocoa and sweeps to a clean final row.
- [ ] 60 fps on desktop, and no element overflows at any size from 320px to 2560px.