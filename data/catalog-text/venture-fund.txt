# Hale Moor: build brief for the full landing page

Build **one self-contained `index.html`**: a soft, pastel, scroll-driven landing page for a fictional venture fund called **Hale Moor**. Two real-time WebGL objects carry it:

- a luminous **iridescent particle sphere** that rises in the hero and then travels through the page as you scroll;
- a **faceted geodesic glass crystal** that takes over in the focus-area section.

Everything else is HTML/CSS laid over a fixed full-screen canvas. There are no images and no videos: all imagery is drawn live in WebGL or as inline SVG.

The page has seven parts, top to bottom:

1. Hero
2. Manifesto
3. Track record (portfolio cards)
4. Focus area (the crystal)
5. Who we are (names wheel)
6. Footer
7. A fixed nav and a fixed pager that sit over all of them

Follow every value below exactly. All desktop measurements are in a **1440 × 900 design frame**.

---

## 1. External resources (exact URLs)

| What | URL | How it is used |
|---|---|---|
| Three.js 0.173.0 (ES module) | `https://cdn.jsdelivr.net/npm/three@0.173.0/build/three.module.js` | Through an import map: `{"imports":{"three":"<that URL>"}}`, then `import * as THREE from 'three'` in a `<script type="module">`. No add-ons. |
| Instrument Sans (latin, variable 400–700) | `https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1Q.woff2` | `@font-face { font-family:'Instrument Sans'; font-weight:400 700; font-stretch:100%; font-display:swap }`. Body face. |
| Geist Mono (latin, variable 100–900) | `https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2` | `@font-face { font-family:'Geist Mono'; font-weight:100 900; font-display:swap }`. Labels, tabs, chips, pager. |

In the standalone file, both fonts are embedded as `data:font/woff2;base64,…` in the `src` of each `@font-face`. There are no other assets.

---

## 2. Units, colours and global styles

**Units (CSS custom properties on `:root`):**
- `--u: max(calc(100vw / 1440), calc(100vh / 900))`: the hero's "cover" unit. The 1440×900 frame always covers the viewport.
- `--n: clamp(0.8px, calc(100vw / 1440), 1.3px)`: the nav's own unit, pinned to the viewport edges. On phones it is fixed at `0.82px`.
- `--w: calc(100vw / 1440)`: the width unit for every scrolling section.

**Colours:**
- `--ink: #2d2934` (body text)
- `--mark: #15121b` (wordmark and menu icon)
- `--tab: #ead2f0` (card name tabs)
- `--chip: #f4c6da` (EXIT chip fill, border `#e9a9c4`)
- Body background `#e7c0dc`

**Global styles:**
- `* { margin:0; padding:0; box-sizing:border-box }`.
- Body: font Instrument Sans, `overflow-x:hidden`, `-webkit-font-smoothing:antialiased`.
- `.mono`: Geist Mono, uppercase, letter-spacing `0.02em`, size `12.5 × --w`, weight 400.

---

## 3. Fixed stage (behind everything)

A `div.stage` with `position:fixed; inset:0; overflow:hidden; aria-hidden`. It contains, in this order:

1. **`.frame`**: the hero backdrop, sized 1440×900 in `--u`, centred with `left:50%; top:50%; translate(-50%,-50%)`. Its background is `linear-gradient(180deg, #d3c6ef 0%, #d8c6eb 11%, #dcc3e5 33%, #e8c0dc 44%, #eebcd5 56%, #f1b7cc 67%, #f5b1c3 78%, #f6abbc 89%, #f7a6b3 100%)`, lavender at the top to blush pink at the bottom.
   - Inside it sits **`.glow`**: a 1500u × 1500u circle centred on frame point (720, 890), with background `radial-gradient(circle, rgba(255,246,252,.22) 25%, rgba(255,244,250,.14) 34%, rgba(255,240,248,.05) 46%, rgba(255,240,248,0) 58%)`. It is hidden on phones.
2. Three **section colour layers** (`.bg`, `position:absolute; inset:0; opacity:0`). Script cross-fades them by scroll:
   - `.bg-manifesto`: `linear-gradient(160deg, #f3c9dc 0%, #f6b6c6 45%, #f59bab 100%)`.
   - `.bg-focus`: `radial-gradient(32% 46% at 68% 48%, rgba(255,240,253,.95) 0%, rgba(250,230,252,.7) 34%, rgba(232,220,252,0) 100%)` over `linear-gradient(180deg, #a993f5 0%, #ae9ff7 16%, #b4b2fa 30%, #bcd0fa 46%, #b6e6f6 62%, #a8ecf3 78%, #a4ecee 100%)`. That is lilac-violet at the top, mint at the bottom, with a white-pink haze behind the crystal.
   - `.bg-team`: `radial-gradient(60% 70% at 85% 0%, rgba(250,150,230,.55) 0%, rgba(250,150,230,0) 70%)` over `linear-gradient(180deg, #e6c6f2 0%, #efc8ef 50%, #e4b8f1 100%)`.
3. **`canvas.scene`**: absolute, 100% × 100%. This is the transparent WebGL canvas.

---

## 4. Fixed nav

`header.nav` is `position:fixed; top:0; left:0; right:0; z-index:3; pointer-events:none`. Its children re-enable pointer events.

- **Wordmark** `a.wordmark`:
  - Two block spans, "HALE" over "MOOR".
  - Weight 700, size `26.1 × --n`, line-height `25 × --n`, letter-spacing `-0.023em`, colour `#15121b`.
  - Position: `left 27n`, `top 30n`.
  - `aria-label="Hale Moor home"`.
- **Menu button** `button.menu`:
  - A white `#fff` square, `47n × 47n`, `right 22n`, `top 28n`, no border, no radius, centred content.
  - Hover: `scale(1.06)` over `.3s cubic-bezier(.2,.7,.2,1)`.
  - Icon: an inline SVG at `17n × 13n`, viewBox `0 0 18 14`, stroke `#15121b`, width 1.6, square caps. Four lines:
    - (1,2)→(17,2)
    - (5,7)→(17,7)
    - (1,12)→(11,12)
    - a short dash (15,12)→(17,12)
  - `aria-label="Open menu"`.

---

## 5. Section by section

### 5.1 Hero (`section.hero`, height `100vh`, `100svh` on phones, `pointer-events:none`)

**Headline** `h1.headline`: **"Build the world worth waking to"** (31 characters).
- Instrument Sans 400, size `52 × --u`, line-height 1.1, letter-spacing `-0.005em`, colour `#2d2934`, `white-space:nowrap`.
- Position: absolute, `left:50%`, `top: calc((100vh - 900u)/2 + 177u)`.
- `transform: translateX(calc(-50% + 4.5u))`.
- Its ink spans frame x 361→1092, cap top y 183, cap height 37.

**The particle sphere** sits centred on frame point **(720, 875)** with a screen radius of **427u**. That places its rim top at y≈465 and its half-width at y 880 at about 425. Most of it is below the fold, like a planet rising. Its build is described in section 6.

**Phone** (≤ 820px):
- The headline sits at `top:116px`, `translateX(-50%)`, width `calc(100vw - 32px)`, size `clamp(38px, 11vw, 48px)`, line-height 1.06, centred, wrapping to two lines.
- The sphere radius is `min(0.8 vw, 0.4 vh)`, with its centre at (vw/2, vh − 0.38 r).

### 5.2 Manifesto (`section#manifesto`, height `140vh`, `150vh` on phones)

**Copy** `.copy.reveal`:
- `position:sticky; top: calc(50vh - 150w)`, `margin-left 868w`, width `480w`.
- Size `25w`, line-height 1.24, letter-spacing `-0.005em`.
- Paragraph 1: "Everything feels within reach, and nothing feels steady. The range of possible futures has never been wider, and the room for error has never been thinner."
- Paragraph 2 (spaced `1.05em` from paragraph 1): "At Hale Moor, we back only two kinds of technology: the kind that carries us toward the future worth having, and the kind that guards us from the one we fear."
- **"Read the manifesto"** (`a.textlink.mono`, margin-top `30w`): its underline grows from 0 to 100% width (1px, `currentColor`) on hover, over `.4s`.

**Phone:** sticky `top 38vh`, margins 20px, size 21px.

The sphere drifts left and grows here (see the keyframes in section 7).

### 5.3 Track record (`section#track`, padding `18vh 0 22vh`; `6vh 0 14vh` on phones)

- **Label** "SELECTED TRACK RECORD" (mono), margin `0 0 30w 244w`.
- **Grid**: `display:grid; grid-template-columns: repeat(4, 226w); column-gap 24w; margin-left 244w; align-items:start`.
  - Four `.col` flex columns, gap `22w`.
  - Staggered with `.col:nth-of-type(2) margin-top -46w`, `(3) 16w`, `(4) -70w`. Use `nth-of-type`, not `nth-child`.
- **Phone:** two columns `1fr 1fr`, gap 12px, margins 20px. Column offsets are 0 / 36 / 12 / 48px. Cards are 118px tall.

**Card** `a.card.reveal`: white, height `165w`, no radius.
- Hover: `translateY(-6w)`, shadow `0 18w 40w rgba(120,60,120,.18)`, over `.5s cubic-bezier(.2,.7,.2,1)`.
- Contents:
  - **`.tab`** (mono, `9.5w`, height `20w`, padding `0 8w`, background `--tab`), absolute at the top-right corner, showing the company name.
  - **`.logo`**: centred row, gap `9w`. A 26w inline SVG glyph and a wordmark.
  - **`.note`**: absolute, left/right `16w`, top `40w`, size `14.5w`, line-height 1.25. Hidden by default.
  - **`.visit`** ("Visit site →", mono `9.5w`): bottom-right, `10w` in from the edges.
  - Optional **`.chips`** at the bottom-left (`8w` in, gap `4w`):
    - `.chip` (mono `8.5w`, padding `4w 7w`, 1px border `rgba(45,41,52,.22)`);
    - `.chip.exit` (fill `--chip`, border `#e9a9c4`).
- On hover, the logo fades out to `scale(.96)`, and the note and visit link fade in and rise `8w`.
- `.card.dim`: white at 45%, with the tab at 60%.

**Wordmark styles:**
- `w-a`: 700, `15w`, tracking `.14em`, uppercase.
- `w-b`: 500, `24w`, tracking `-0.03em`, lowercase.
- `w-c`: 400 italic, `19w`, `-0.02em`.
- `w-d`: 600, `17w`, `.02em`, uppercase.
- `w-e`: Geist Mono 500, `15w`, `.06em`.

**Glyphs** are eight `<symbol>`s (viewBox 0 0 24 24, `currentColor`), referenced with `<use href="#gN">`:
- g1: a ring of r 8.5, stroke 2.4.
- g2: a filled hexagon with a white centre dot of r 3.2.
- g3: a stroked triangle with a small filled triangle inside.
- g4: two overlapping circles, one filled and one stroked.
- g5: a filled diamond.
- g6: a six-spoke asterisk, stroke 2.4, round caps.
- g7: two stacked sine waves.
- g8: a filled half-disc over a bar.

**Cards, column by column** (tab name · glyph · wordmark class and text · note · chips):

- **Column 1**
  - Kestrion · g3 · w-a "KESTRION" · "Backed at pre-seed. Now flying autonomous survey fleets."
  - Mirefold · g4 · w-b "mirefold" · "Backed at inception. Open storage network, live worldwide." · EXIT
  - Ondine Labs · g7 · w-c "Ondine Labs" · "Backed at seed. Building compact fusion test cells."
  - Velloria (dim) · g1 · w-d "VELLORIA" · "Sensing systems that see through weather." · PRIOR WORK
- **Column 2**
  - Thornquist · g6 · w-e "THORNQUIST" · "Backed at seed. Programmable chemistry, made in a box."
  - Lattice Nine · g2 · w-a "LATTICE NINE" · "Partners invested early from prior funds." · EXIT + PRIOR WORK
  - Brindle · g8 · w-b "brindle" · "Acquired. Games played by millions every day." · EXIT
  - Quillon · g5 · w-c "Quillon" · "Cooling for the hottest chips in the data centre." · PRIOR WORK
- **Column 3**
  - Pellucid · g1 · w-b "pellucid" · "Backed at seed, alongside close friends."
  - Orrery · g4 · w-d "ORRERY" · "Backed at seed. Wallets that disappear into the app." · EXIT
  - Saltmarsh · g7 · w-e "SALTMARSH" · "Resilient links for machines far from home."
  - Wexley Bio (dim) · g3 · w-c "Wexley Bio" · "Medicines that slow the ageing brain."
- **Column 4**
  - Corvane · g2 · w-d "CORVANE" · "Quantum hardware, from lab bench to public markets." · EXIT + PRIOR WORK
  - Fennix · g6 · w-b "fennix" · "Insurance that prices risk at the speed of compute."
  - Hollis & Vane · g8 · w-c "Hollis & Vane" · "Co-led the seed. Tools for thinking, not scrolling." · PRIOR WORK

**Closing** (margin `20vh 0 0 244w`):
- h2: **"Unlikely bets for an age of outliers."** Weight 400, `58w`, line-height 1.04, `-0.02em`, width `780w`.
- Below it, `a.btn.mono` **"View the full portfolio →"**: white, padding `15w 20w`, margin-top `34w`, gap `10w`. On hover it turns to `--ink` with white text.
- **Phone:** h2 at 36px.

The cards scroll over the particle sphere, which sits behind them on the left.

### 5.4 Focus area: the crystal (`section#focus[data-focus="1"]`, height `150vh`)

**Copy** `.copy.reveal` (measured on the chosen mockup):
- `position:sticky; top: calc(50vh - 264w)`, which puts the label at y 186 in a 900-tall viewport.
- `margin-left 104w`, width `466w`, colour `#2a2858`.
- **Label** "SIGNAL & SYSTEMS": mono `13w`, letter-spacing `.13em`, colour `#33316a`, display block, margin-bottom `15w`.
- **Paragraph**: `27.6w`, line-height 1.175, `-0.008em`. Text: "We back the quiet machinery of⏎ the next century: compute, networks and models that keep a fragile world steady, deep beneath the surface where few will ever look."
  - ⏎ is a `<br class="d">` that is hidden on phones.
  - The five desktop lines break exactly as: "We back the quiet machinery of" / "the next century: compute, networks" / "and models that keep a fragile world" / "steady, deep beneath the surface" / "where few will ever look."
  - The line tops are at y 217, 249, 282, 314 and 347.
- **Phone:** sticky `top:45vh`, margins 20px, label 11px, paragraph 21px.

**The crystal** is centred on **(979w, 0.482 vh)** with a screen radius of **305w**. That is frame point (979, 434) on the right half. Its build is described in section 6.

**Pager** `nav.pager.mono` (fixed, `left 22n`, `bottom 12n`, `z-index:3`):
- 1px border `rgba(40,36,83,.45)`, colour `#282453`.
- Hidden by default (`opacity 0`, `translate 0 10px`); class `.show` fades it in over `.5s`.
- **Count block**: `114n × 59n`, padding `8n 10n`.
  - `.num` "01": Geist Mono 300, `44n`, letter-spacing `-0.02em`.
  - `.tot` "/ 01": `11n`, not uppercase.
  - Script fills it in as `"/ " + count of [data-focus] sections`, zero-padded to two digits.
- **Arrow column**: `32n` wide, with a left border. Two stacked buttons:
  - up arrow: SVG 10×12, `M5 11V1M1.5 4.5 5 1l3.5 3.5`;
  - down arrow: `M5 1v10M1.5 7.5 5 11l3.5-3.5`;
  - stroke 1.2, a hairline between them.
  - The buttons are disabled when there is only one focus section; otherwise they `scrollIntoView` the previous or next one.

### 5.5 Who we are (`section#team`, height `340vh`)

The section has a sticky `.pin` (`top:0; height:100vh; overflow:hidden`) that holds two layers.

**Intro** (absolute, `left 92w`, `top calc(50vh - 120w)`, width `440w`):
- Label "WHO WE ARE" (mono, margin-bottom `10w`).
- Paragraph (`24.5w`, line-height 1.22): "We are a small partnership of equals across two continents, founded in 2017. We back founders from pre-seed to Series A, as a lead or co-lead investor."
- **Phone:** left/right 20px, `top 46vh`, paragraph 20px.

**Names wheel** `.wheel` (absolute, inset 0). Script builds twelve `.name` rows. Each row is a colour dot (`12w` circle) followed by the name, at Instrument Sans `46w`, `-0.02em`, `white-space:nowrap`, `transform-origin: 0 50%`.

| Name | Role | Dot colour |
|---|---|---|
| Ada Lindqvist | Partner | #7fcbe6 |
| Tomas Reyes | Partner | #f0a35e |
| Noor Haddad | Partner | #7fc28f |
| Felix Okafor | Partner | #e57a8c |
| Ines Marlowe | Venture partner | #b49be8 |
| Jun Takeda | Principal | #e9bf3f |
| Priya Raman | Principal | #6fa8f0 |
| Oskar Brandt | Investor | #e48fd0 |
| Lena Fischer | Investor | #86c9a8 |
| Mateo Duarte | Operations | #f08a6b |
| Saoirse Kane | Operations | #8aa0f0 |
| Ravi Menon | Operations | #c99ae8 |

There is also a `.rule`: a 1px line in `rgba(45,41,52,.7)`, with the active person's role (mono `10.5w`) at its right end, `8w` above the line. It is hidden on phones. On phones the names are 26px, with 8px dots and an 8px gap.

### 5.6 Footer (`footer.foot`)

- Padding `16vh 92w 40w`. A flex row with space-between, aligned to the bottom.
- Left: **"Write to us while it still sounds impossible."** (`58w`, line-height 1.04, `-0.02em`, width `700w`, `.reveal`).
- Right, a column aligned to the right with gap `14w`:
  - a mono button "Back to top ↑", which smooth-scrolls to 0 (instant for reduced motion);
  - "© 2026 Hale Moor" (mono).
- **Phone:** a column, padding `12vh 20px 28px`, line at 34px.

---

## 6. The WebGL scene (Three.js 0.173)

**Renderer:**
- `new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true, premultipliedAlpha:true, powerPreference:'high-performance' })`.
- `setClearColor(0x000000, 0)`.
- Pixel ratio `min(devicePixelRatio, 2)`.
- If WebGL fails, still run the text entrance.

**Camera:** `PerspectiveCamera(35°, aspect, 0.1, 100)` at (0, 0, 10). The visible height at z = 0 is `VIS_H = 2·10·tan(17.5°)`.

**Placing an object from screen pixels.** Given a screen centre (cx, cy) and a screen radius r in CSS px:
- `k = VIS_H / innerHeight`
- `Rs = r·k`
- world radius `R = Rs·10 / sqrt(100 + Rs²)` (this undoes the perspective growth of the silhouette)
- `x = (cx − vw/2)·k`
- `y = −(cy − vh/2)·k`

**Shared material set-up.** Every material is a `ShaderMaterial` with:
- `transparent:true`, `depthWrite:false`, `depthTest:false`;
- `CustomBlending`, `AddEquation`, `blendSrc = OneFactor`, `blendDst = OneMinusSrcAlphaFactor`, and the same factors for alpha;
- shaders that output **premultiplied** colour.

This gives soft, additive-looking light that stays correct on a transparent canvas.

**Noise:** standard 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT), `float snoise(vec3)`.

**Shared uniforms:**
- `uTime`
- `uReveal` (0→1)
- `uPx` (object size → device pixels)
- `uMouse` (vec2, world)
- `uMouseStr` (0–1)
- `uMouseRad` (0.3·R)
- `uFade` (scroll fade of the main sphere)

**Mouse push** (in the vertex shader of both particle layers):
- `wp = modelMatrix·p`; `dlt = wp.xy − uMouse`; `dd = |dlt|`.
- `push = uMouseStr · exp(−dd²/uMouseRad²)`.
- `dir = dlt/dd`; `wp.xy += (dir·0.6 + perp(dir)·0.4) · push · uMouseRad · 0.32`.
- `wp.z += push · uMouseRad · 0.25`.

The perpendicular term makes the cursor *stir* the particles rather than punch a hole in them.

### 6a. Main sphere: three layers inside `orb → spin`

Draw order is cloud (1), glass (2), spray (3).

**1. Inner cloud.** 120,000 points (65,000 on phones), placed at a random direction × `r = 0.5 + 0.47·rand^0.45`, with `aRand` vec4.

- **Vertex shader:**
  - Drift: `p += (snoise(q), snoise(q+17.1), snoise(q+43.7))·0.04`, where `q = p·1.6 + (0,0,t·0.12)`.
  - Reveal: `rv = smoothstep(aRand.x·0.45, aRand.x·0.45 + 0.55, uReveal)`, then `p *= mix(0.55, 1, rv)`.
- **Colour** (from the original position o):
  - `n = snoise(o·1.25 + 3)`, `n2 = snoise(o·2.6 − 5 + t·0.03)`.
  - Start with `mix(violet (0.50,0.33,0.84), lilac (0.74,0.55,0.95), smoothstep(−0.45, 0.6, n2))`.
  - Blend in teal (0.42,0.86,0.84) by `smoothstep(0.2, 0.75, −o.x·0.85 − o.y·0.25 + n·0.45)·0.85`, so teal sits on the lower left.
  - Blend in pink (0.98,0.48,0.80) by `smoothstep(0.2, 0.8, o.x·0.85 + n·0.5)·0.8`, so pink sits on the right.
  - 8% of points are sparkles (`aRand.y > 0.92`), mixed 92% toward white.
- **Clusters:** `cluster = smoothstep(−0.4, 0.55, snoise(o·2.3 + t·0.035))`.
- **Alpha:** `vAlpha = (0.35 + 0.65·cluster)·rv·(0.7 + 0.3·aRand.z)`.
- **Point size:** `0.0072·(0.55 + 0.9·aRand.w)·(1 + spark·1.1)·(0.75 + 0.45·cluster)·uPx / −mv.z`.
- **Fragment shader:**
  - Disc `a = smoothstep(0.5, 0.08, |coord − .5|)`.
  - Sparkles twinkle at `0.65 + 0.35·sin(t·4 + fragX·0.37 + fragY·0.21)`.
  - Output `(col·α, α·mix(0.92, 0.6, spark))`, where `α = a·vAlpha·tw·uFade`.

**2. Rim spray.** 40,000 points (16,000 on phones).
- **Directions:** 78% hug the silhouette ring, `normalize(cos θ, sin θ, ±0.32·rand)`; the rest are fully random.
- **Vertex shader:**
  - `life = fract(t·(0.045 + 0.07·aRand.x) + aRand.y)`.
  - Tufts: `tuft = (0.5 + 0.5·snoise(dir·3.2 + (0, t·0.02, 0)))^1.6`.
  - Reach: `reach = 0.015 + 0.42·aRand.z^1.7·(0.25 + 1.1·tuft)`.
  - Radius `r = 1 + reach·(0.35 + 0.65·life)`, plus a small noise drift of `0.03·(0.4 + life)`.
  - Reveal `rv = smoothstep(0.35 + aRand.w·0.4, 1, uReveal)`.
  - Silhouette weight `sil = 1 − |worldNormal.z|`.
  - `alpha = sin(life·π)·(0.45 + 0.75·tuft)·rv·(0.7 + 0.5·aRand.w)·(0.3 + 0.7·sil)`.
  - Colour: warm white, tinted 25% × aRand.x toward mint on the left and pink on the right.
  - Point size `0.0075·(0.45 + 1.1·aRand.x²)`.
- **Fragment shader:** `core = smoothstep(0.24, 0, d)`, `halo = smoothstep(0.5, 0, d)·0.55`, output alpha × 0.85.

**3. Glass shell.** `SphereGeometry(1, 160, 96)`, scaled `mix(0.8, 1, uReveal)`.
- `f = 1 − dot(N, V)`, `fr = f^2.6`.
- Thin-film colour: `irid = 0.5 + 0.5·cos(2π·(f·1.15 + atan(y,x)·0.16 + t·0.025 + (0, .33, .67)))`, then mixed 50% with white.
- Edge line `edge = smoothstep(0.78, 0.96, f)·(1 − smoothstep(0.992, 1, f))`.
- `col = mix((0.98, 0.95, 1), irid, smoothstep(0.35, 0.95, f))`, then 60% toward white on the edge.
- `alpha = (0.025 + fr·0.42 + edge·0.6)·uReveal·uFade`.

**Size uniform.** `uPx = vh·dpr / VIS_H · 10 · sqrt(R·R_hero)`. The dots grow only with √scale, so the sphere stays fine-grained when it gets big.

**Motion:**
- `spin.rotation.y = t·0.045 + scrollY·0.0004`.
- `orb` rotation eases toward the mouse: `ry = ndcX·0.28`, `rx = −ndcY·0.16`, with `L = 1 − 0.0025^dt` and factor ×0.6.
- `orb.x` adds `ry·R·0.12`, eased with factor ×0.5.
- `uMouseStr` eases to 1 while the pointer has moved within the last 900 ms, and back to 0 otherwise.
- `uMouse` follows the pointer ray hitting the z = 0 plane, with factor ×1.4.
- **Hero rise:** `orb.y = layout.y − (1 − uReveal)·R·0.28`.

### 6b. The crystal (focus section): group `crystal → crystalSpin`

**Geometry:** `IcosahedronGeometry(1, 1)`, which gives 80 flat triangular panels and is non-indexed. Add a barycentric attribute `aBary`, with each vertex getting (1,0,0), (0,1,0) or (0,0,1) by index mod 3.

**Meshes:** draw it twice with the shared material settings, first `BackSide` (alpha × 0.5) and then `FrontSide`.

**Fragment shader:**
- Flat normal `N = normalize(cross(dFdx(viewPos), dFdy(viewPos)))`.
- `fres = (1 − |N·V|)^2.2`.
- `minB = min(bary)`.
- **Rib** `edge = 1 − smoothstep(0, 0.03, minB)`.
- **Bevel** `bevel = 1 − smoothstep(0.03, 0.12, minB)`, and `fringe = bevel·(1 − edge)`.
- **Dispersion:** `h = N·norm(0.35, 0.65, 0.6)·1.3 + minB·4 + objY·0.35 + t·0.04`, `rainbow = 0.55 + 0.45·cos(2π(h + (0, .33, .67)))`.
- **Caustics:** `caustic = (1 − |snoise(obj·2.6 + (0, t·0.18, t·0.07))|)^14`.
- **Glint:** `spec = max(N·H, 0)^48`, with light direction `norm(−0.45, 0.7, 0.55)`.
- **Colour:**
  - `col = (0.92, 0.9, 1)·(0.22 + 0.4·fres)`
  - `+ rainbow·(0.14·fres + 0.5·fringe + 0.12·caustic)`
  - `+ (1, 0.97, 1)·(edge + caustic·0.25 + spec)`
- **Alpha:** `(0.06 + fres·0.26 + edge·0.9 + fringe·0.26 + caustic·0.14 + spec·0.8)·(1 + 0.35·uHover)`, clamped, then × `mix(1, 0.5, back)` × `uFade2`.

The result is clear glass with white ribs and a thin prism fringe beside each rib.

**Core glow:** a camera-facing 2.6 × 2.6 quad drawn before the shell. Its alpha is `(e^(−5d²)·0.95 + e^(−1.6d²)·0.45)·smoothstep(1, 0.55, d)·(0.85 + 0.1·sin(t·0.8) + 0.2·uHover)·uFade2`, with colour (1, 0.94, 0.99). The `smoothstep` is required so the quad never shows its square edge.

**Motion:**
- `crystalSpin.rotation = (0.32 + t·0.025, t·0.11 + scrollY·0.0007, 0)`.
- `crystal.rotation = orb.rotation·1.4` (it follows the mouse).
- `crystal.x` adds `mouseOffset·0.6`.
- `uHover` eases to 1 while the cursor is inside the crystal's screen circle (`1 − 0.02^dt`).

---

## 7. Scroll choreography (one smoothed scroll value drives everything)

**Smoothed scroll.** Each frame: `sS += (scrollY − sS)·(1 − 0.0015^dt)`, snapping when the difference is under 0.1. Section tops and bottoms are measured with `getBoundingClientRect().top + scrollY` on load, on resize and after `document.fonts.ready`.

**Keyframes.** Each key is `(scroll, cx, cy, r, fade)`. Interpolate between neighbouring keys with smoothstep `x²(3 − 2x)`. In the tables, `w = vw/1440`, `m`/`tr`/`fo`/`te` are the manifesto, track, focus and team sections, and `H` is the hero placement.

**Main sphere, desktop:**

| Scroll | cx | cy | r | fade |
|---|---|---|---|---|
| 0 | hero (720u, 875u) | | 427u | 1 |
| m.top | 330w | 0.47vh | 560w | 1 |
| tr.top + 0.2vh | 290w | 0.50vh | 600w | 0.95 |
| tr.bottom − vh | 250w | 0.46vh | 600w | 0.85 |
| fo.top − 0.15vh | −420w | 0.20vh | 520w | 0 |
| fo.bottom − 0.5vh | −420w | 0.20vh | 520w | 0 |
| fo.bottom − 0.45vh | 1030w | 1.30vh | 330w | 0 (repositions while invisible) |
| te.top | 1030w | 0.45vh | 330w | 1 |
| te.top + 0.9vh | 150w | 0.50vh | 470w | 1 |
| te.bottom − vh | 150w | 0.50vh | 470w | 1 |
| te.bottom | 150w | −0.2vh | 470w | 0.5 |

**Main sphere, phone:**

| Scroll | cx | cy | r | fade |
|---|---|---|---|---|
| 0 | hero | | | 1 |
| m.top | 0.1vw | 0.17vh | 0.62vw | 0.95 |
| tr.top + 0.3vh | 0.08vw | 0.22vh | 0.62vw | 0.7 |
| fo.top − 0.3vh | −0.7vw | 0.1vh | 0.6vw | 0 |
| fo.bottom − 0.5vh | −0.7vw | 0.1vh | 0.6vw | 0 |
| fo.bottom − 0.45vh | 0.5vw | 1.3vh | 0.42vw | 0 |
| te.top | 0.5vw | 0.27vh | 0.42vw | 1 |
| te.top + 0.9vh | −0.12vw | 0.5vh | 0.5vw | 1 |
| te.bottom − vh | −0.12vw | 0.5vh | 0.5vw | 1 |
| te.bottom | −0.12vw | −0.1vh | 0.5vw | 0.6 |

**Crystal, desktop:**

| Scroll | cx | cy | r | fade |
|---|---|---|---|---|
| fo.top − 0.75vh | 1180w | 1.05vh | 230w | 0 |
| fo.top − 0.05vh | 979w | (434/900)vh | 305w | 1 |
| fo.bottom − 0.6vh | 979w | (434/900)vh | 305w | 1 |
| fo.bottom − 0.2vh | 900w | 0.12vh | 250w | 0 |

**Crystal, phone:**

| Scroll | cx | cy | r | fade |
|---|---|---|---|---|
| fo.top − 0.7vh | 0.7vw | 1.1vh | 0.3vw | 0 |
| fo.top | 0.5vw | 0.24vh | 0.36vw | 1 |
| fo.bottom − 0.6vh | 0.5vw | 0.24vh | 0.36vw | 1 |
| fo.bottom − 0.2vh | 0.5vw | −0.05vh | 0.3vw | 0 |

Hide either group entirely when its fade is below 0.003.

**Colour layers.** With `ramp(x, a, b) = clamp((x − a)/(b − a))`:
- manifesto opacity `= ramp(sS, 0.35vh, vh)·(1 − ramp(sS, fo.top − 0.9vh, fo.top − 0.2vh))`;
- focus opacity `= ramp(sS, fo.top − 0.9vh, fo.top − 0.2vh)·(1 − ramp(sS, fo.bottom − 0.8vh, fo.bottom − 0.2vh))`;
- team opacity `= ramp(sS, fo.bottom − 0.8vh, fo.bottom − 0.2vh)`;
- hero glow opacity `= 1 − ramp(sS, 0, 0.5vh)`.

**Pager:** `.show` while `fo.top − 0.3vh < sS < fo.bottom − 0.6vh`.

**Team wheel.** Let `tp = ramp(sS, te.top, te.bottom − vh)`.
- Intro opacity `= 1 − ramp(tp, 0.12, 0.26)`.
- Wheel opacity `= ramp(tp, 0.2, 0.34)`.
- Active index `= ramp(tp, 0.3, 0.98)·11`.
- Name i is placed at angle `a = (i − active)·11°` (13° on phones) on a circle of radius `RR = sphere r·1.12` (1.10 on phones) around the sphere's screen centre:
  - `transform: translate(cx + cos a·RR, cy + sin a·RR) rotate(a) translateY(−50%) scale(1 + 0.16·near)`, where `near = max(0, 1 − |i − active|)`;
  - opacity `(0.35 + 0.65·near)·max(0, 1 − |a|/1.15)`.
- The rule starts at `cx + RR + 430w` and ends `80w` before the right edge, at height cy. Its opacity is `1 − min(1, |active − round(active)|·1.6)`, and its role text is the rounded active person's role.

---

## 8. Entrance (one Web Animations timeline, run once)

- `<html class="pre">` hides the wordmark, menu and headline (`opacity:0`).
- **Failsafe:** an inline script in `<head>` waits 2600 ms. If `.pre` is still there, it sets `window.__heroShown = true` and removes `.pre`.
- Once the module runs:
  - **Sphere reveal proxy:** a detached `<i>` animates opacity 0→1 over 2200 ms, easing `cubic-bezier(.16,.84,.24,1)`, `fill:both`. Every frame, `uReveal` = `proxy.effect.getComputedTiming().progress`, so the sphere shares the same timeline. It always runs.
  - If `__heroShown` is already set, stop here so the copy isn't hidden again. Otherwise animate, all with `fill:'backwards'` and easing `cubic-bezier(.2,.7,.2,1)`:
    - wordmark: opacity 0→1, translateY(−8px)→0, 700 ms, delay 200;
    - menu: the same, delay 280;
    - headline: opacity 0→1, `translate: 0 22px`→0, `blur(6px)`→0, 1100 ms, delay 350. Use the individual `translate` property so the CSS `transform` offset survives.
  - Then remove `.pre`.
- **Section reveals:** an `IntersectionObserver` (threshold 0.15, rootMargin `0px 0px -6% 0px`) adds `.in` to each `.reveal`, then unobserves it.
  - `.reveal`: `opacity 0; translate 0 28w`, with a 1 s transition on both properties using `cubic-bezier(.2,.7,.2,1)`.
  - Each item has `transition-delay = (index mod 4)·70 ms`.

---

## 9. Loop, resize and reduced motion

- `renderer.setAnimationLoop`. Skip frames while `document.hidden`. `dt = min(clock.getDelta(), 0.05)`.
- **On resize:** update the size and pixel ratio, set the camera aspect, re-measure the sections and rebuild the keyframes.
- **`prefers-reduced-motion: reduce`:**
  - No animation loop, no mouse listeners and no entrance animations. Remove `.pre` at once.
  - `uReveal = 1`. All `.reveal` elements get `.in`, with no transitions.
  - The sphere and crystal jump straight to their keyframe for the current `scrollY`; `render(0)` runs on every scroll and resize.
  - Card, button and pager transitions are off.
- **Phone layout:** at ≤ 820px, every section uses the phone values given above and there is no horizontal scroll.

---

## 10. Accessibility and semantics

- `<main>` wraps the hero and the sections. The headline is an `h1`; the closing line is an `h2`.
- The stage and canvas are `aria-hidden`.
- The wheel has `aria-label="Team"`. The pager is a `nav` with `aria-label="Focus areas"`, and its buttons are labelled.
- Every company, person and claim is fictional.