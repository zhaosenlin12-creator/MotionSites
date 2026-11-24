# Myth Atlas ‚Äî Interactive 3D Creature Field Guide (exact recreation prompt)

Build a single-file, full-viewport web app called **Myth Atlas**: an interactive 3D field guide to creatures that never existed. It looks like a museum specimen plate on warm sandstone paper. A phoenix and a kraken sit in the centre as real textured 3D models you can drag, zoom and spin. A left sidebar, two specimen tabs, and a right catalogue card surround them. Clicking a tab flies one model out and springs the other in, while the card's copy swaps with a staggered rise. A sun button flips the whole page and the 3D lighting to a dark dusk mode.

Vanilla HTML, CSS and JS in one file, using Three.js r170 from a CDN import map. No frameworks and no build step. Reproduce every value, string, icon, URL and timing below exactly.

---

## 1. Head and external resources

- `<!DOCTYPE html>`, `lang="en"`, charset utf-8, viewport `width=device-width, initial-scale=1, viewport-fit=cover`.
- Title: `Myth Atlas ‚Äî Featured creatures`
- Meta description: `Turn a phoenix and a kraken in your hands. An interactive 3D field guide to creatures that never existed.`
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin).
- Fonts stylesheet, exactly:
  `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap`
- Import map:
  ```json
  { "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
  } }
  ```
- Script is `type="module"` and imports: `THREE`; `GLTFLoader` from `three/addons/loaders/GLTFLoader.js`; `DRACOLoader` from `three/addons/loaders/DRACOLoader.js`; `MeshoptDecoder` from `three/addons/libs/meshopt_decoder.module.js`; `RoomEnvironment` from `three/addons/environments/RoomEnvironment.js`.
- Draco decoder path: `https://www.gstatic.com/draco/versioned/decoders/1.5.7/`

## 2. Assets (use exactly these URLs)

| Asset | URL |
|---|---|
| Phoenix image (thumbnail, featured card, close-up lens, fallback) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_020340_4815bb8d-68c3-48c4-ad05-6307d085e896.png&w=900&q=85` |
| Phoenix 3D model (GLB, ‚âà72 MB) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261031_015714_12c0e407-828a-4b1f-957c-2efe1fe83be1.glb` |
| Kraken image (same uses) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_020342_3e375b40-2c06-4189-995a-acbc21f06142.png&w=900&q=85` |
| Kraken 3D model (GLB, ‚âà60 MB) | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261031_013537_0dc2c71f-4f11-4a86-ab93-91a59535d5b7.glb` |

No other images or media. All icons are inline SVG (section 9).

## 3. Design tokens

```css
:root {
  --bg:#ebe1cd; --panel:#f8f2e6; --line:#d6c9ae; --ink:#241c14; --muted:#7a6b58;
  --accent:#b4532a; --accent-ink:#ffffff; --accent-tint:#f3dfcd; --chip:#e4d8c2;
  --shadow:70,48,24;
  --serif:"Fraunces","Iowan Old Style",Georgia,serif;
  --sans:"Instrument Sans","Segoe UI",system-ui,sans-serif;
  --mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
  --ease:cubic-bezier(.22,.8,.24,1);
}
.hero[data-light="dusk"] {
  --bg:#17120d; --panel:#211a13; --line:#3d3225; --ink:#f1e7d6; --muted:#a89880;
  --accent:#e08a4f; --accent-ink:#17120d; --accent-tint:#3b2415; --chip:#2d251b;
  --shadow:0,0,0;
}
```

Base: `*{box-sizing:border-box;margin:0}`. `html,body{height:100%}`. Body uses `--bg`, `--sans`, `--ink`, `overflow:hidden`, antialiased. Buttons reset (`font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0`). `:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:3px}`. `svg{display:block}`. Icon class `.ico`: 20√ó20, `fill:none; stroke:currentColor; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; flex:none`.

Radii are small and archival: 3px almost everywhere.

## 4. Layout

`main.hero#hero[data-light="day"]`: `position:relative; height:100vh; height:100dvh; display:grid; grid-template-columns:196px minmax(0,1fr) clamp(300px,27vw,356px); overflow:hidden; background:var(--bg); transition: background-color .6s var(--ease), color .6s var(--ease)`.

`canvas#gl` is the first child: `position:absolute; inset:0; width/height:100%; z-index:5; pointer-events:none`. The canvas spans the **whole hero**, so a model flying out is never cropped by a column.

### 4.1 Sidebar `aside.side` (aria-label "Atlas sections")
- Flex column, padding `22px 12px 18px 24px`, `border-right:1px solid var(--line)`.
- `.brand`: "Myth Atlas" in serif 27px weight 400, letter-spacing ‚àí.02em, `font-variation-settings:"opsz" 48`, nowrap. Inside, a `small` block: "Cryptozoology ¬∑ Vol. I", mono 9.5px, letter-spacing .18em, uppercase, muted, margin-top 4px.
- `ul.nav`: `margin:20px 0 12px; display:grid; gap:2px; overflow:hidden`. Each button is full width, flex, gap 16px, padding 7px 10px, radius 3px, font-size 14px, line-height 1.15, `box-shadow:inset 2px 0 0 transparent`. Hover background `--chip`. `aria-current="page"` gets background `--accent-tint` and `box-shadow:inset 2px 0 0 var(--accent)`. Sub-labels are `small`: mono 10.5px, muted, margin-top 3px.
- Items in order (icon, label, sub-label): i-home Home ¬∑ i-star **Featured** (current) ¬∑ i-flame Fire birds "6 legends" ¬∑ i-wave Sea monsters "14 legends" ¬∑ i-claw Dragons "22 legends" ¬∑ i-skull Chimeras "9 legends" ¬∑ i-peak Giants "11 legends" ¬∑ i-mask Tricksters "8 legends".
- `.feature` card pinned to the bottom (`margin-top:auto`): background `--panel`, 1px line border, `border-left:3px solid var(--accent)`, radius 3px, padding `14px 14px 16px`. Contents:
  - `.eyebrow` "Featured creature": mono 9.5px, .2em tracking, uppercase, muted, weight 500.
  - `img#featImg`: 92√ó76, `object-fit:contain`, `margin:4px auto 2px`.
  - `h3#featTitle`: serif 18px weight 400, line-height 1.15, ‚àí.01em.
  - `p#featText`: 12px, line-height 1.4, muted, margin-top 6px.
  - `a[href="#detail"]` "Learn more" + i-arrow (14px): inline-flex, gap 6px, margin-top 10px, 12px, ink, underline offset 3px.

### 4.2 Centre `section.main`
Grid rows `auto minmax(0,1fr)`, padding `48px 18px 14px 26px`.

**Tabs** `.tabs#tabs` (role tablist, aria-label "Featured creatures"): flex, gap 10px. Generated from data. Each `.tab` (role tab, `id="tab-{id}"`, `data-no="01"`): width 130px, padding `8px 8px 11px`, grid centred, panel background, 1px line border, radius 3px, relative.
- `::before`: the `data-no` number at top-left (left 8px, top 6px), mono 9.5px, muted, .1em.
- `::after`: 2px accent bar along the bottom, `scaleX(0)` ‚Üí `scaleX(1)` when selected, .35s ease.
- `img` 58√ó52 contain. `b` name: serif 15.5px, margin-top 2px, ‚àí.01em. `i` latin: serif italic 12px, muted.
- Hover: `translateY(-2px)`, border `--muted`. Selected: border `--ink`.
- ArrowLeft/ArrowRight move focus and select, wrapping. Roving tabindex.

**Stage** `.stage#stage` (`tabindex="0"`, aria-label "3D creature model. Drag to rotate, scroll or pinch to zoom, double-click to reset."): relative, `touch-action:none; cursor:grab; user-select:none`, radius 3px. `.dragging` ‚Üí `cursor:grabbing`. Children in order:
- `.plate`: `position:absolute; inset:10px 0 24px; z-index:1`, containing four 14√ó14 `i` corner brackets drawn with 1px `--line` borders. They frame the stage like a plate in a book.
- `.ground`: contact shadow. `left:50%; bottom:15%; width:min(62%,460px); height:44px; translateX(-50%)`, `radial-gradient(closest-side, rgba(var(--shadow),.22), rgba(var(--shadow),0))`, transitions opacity .5s, transform .7s var(--ease). While `.stage.switching`: opacity 0, `translateX(-50%) scaleX(.4)`.
- `.fallback#fallback`: `inset:6% 10% 16%`, hidden, `background:center/contain no-repeat`. Shown with `.stage.failed`.
- `.loader#loader`: "Preparing the specimen‚Ä¶", centred mono 11px, .08em, uppercase, muted. `::before` is a 30px ring with 1px `--line` border and `--accent` top, spinning 1s linear. Fades by `.show`, .35s.
- `.hint`: top-right (right 4px, top 8px), z-index 6, i-hand 15px + "Drag to turn ¬∑ scroll to zoom", mono 10.5px, muted. Fades out on `.hero.touched` (.6s).
- `.rail` (toolbar, aria-label "Viewer tools"): left 0, vertically centred, grid gap 9px, z-index 6. 38√ó38 buttons, panel bg, line border, radius 3px, icons 17px. Hover border accent, active `scale(.92)`. `.on` = accent bg, accent-ink, accent border. Buttons: `#zoomIn` i-plus (starts `.on`), `#zoomOut` i-search, `#expand` i-expand, `#light` i-sun. Aria labels: "Zoom in", "Zoom out", "Expand viewer", "Switch to dusk lighting".
- `.turn`: `left:50%; bottom:46px`, centred, z-index 6, flex gap 2px, panel bg, line border, radius 3px, padding 3px 4px, mono 12px. Buttons 28px tall, min-width 32px, hover chip. `#turnL` i-ccw, `#turnFull` text "360¬∞", `#turnR` i-cw.
- `.scale#scale`: left 0, bottom 30px, mono 10px, muted, .08em. `::before` is a 72√ó6px scale bar with 1px muted borders and no top border, margin-bottom 4px. Text comes from data.
- `p.caption#caption`: absolute bottom 0, full width, centred, serif italic weight 300, `font-size:clamp(17px,1.65vw,22px)`, ‚àí.01em.

### 4.3 Right `section.info`
Grid rows `auto minmax(0,1fr)`, gap 16px, padding `13px 26px 14px 0`.

**Top bar** `.top`: flex, gap 10px.
- `label.search`: flex 1, height 32px, padding 0 12px, panel bg, line border, radius 3px, muted, gap 9px. i-search 15px, then a search input with placeholder "Search creatures, legends, or regions‚Ä¶", 11.5px. `:focus-within` border accent.
- `.iconbtn` (32px circle, hover chip): i-bell "Notifications". Then "Account" with `.avatar`: a 24px ink circle holding i-user 15px, stroke 1.8.

**Card** `.card`: panel bg, 1px line border, radius 3px, `box-shadow: inset 0 0 0 4px var(--panel), inset 0 0 0 5px var(--line)` (a double museum-plate rule), padding `26px 24px 20px`, `overflow-y:auto; overscroll-behavior:contain; scrollbar-width:thin`.

Inside, `article.detail#detail[aria-live="polite"]`, flex column, min-height 100%. Rows rendered from data, in this order, each with `style="--i:n"`:
0. `.eyebrow`: `{family} ¬∑ Specimen {no}`
1. `h1`: name in serif weight 300, `clamp(42px,4.4vw,58px)`, line-height .96, ‚àí.035em, margin-top 8px, `"opsz" 144`. Inside it `em`: latin, italic 300, block, `.36em`, letter-spacing 0, muted, margin-top 8px.
2. `.tags`: flex wrap, gap 8px, margin-top 16px. Each `span`: mono 10.5px, .04em, padding 5px 9px, radius 2px, 1px line border.
3. `p.lede`: 13.5px, line-height 1.55, margin-top 16px, `text-wrap:pretty`.
4. Era timeline `.era` (margin-top 14px, see 4.4).
5. `h2` "Field notes": mono 500 10px, .2em, uppercase, muted, margin-top 18px, padding-top 14px, border-top 1px line.
6. `dl.traits`: margin-top 10px, grid gap 9px. Each row is a flex baseline with gap 10px, 13px text: icon (18px, muted), `dt` muted with a dotted leader (`::after` flex 1, `border-bottom:1px dotted var(--line)`, margin 0 8px, translateY ‚àí3px), `dd` right-aligned weight 500.
7. `h2` "Haunts".
8. `.habitat`: flex, gap 16px, margin-top 12px, 13px: t-reed icon + habitat text.
9. `.closeup-wrap` (`margin-top:auto; padding-top:16px`) with `button.closeup#closeup` (`aria-pressed`): grid `76px 1fr 18px`, gap 14px, padding 10px, line border, radius 3px. `.lens` is 76√ó76, radius 2px, chip bg, the creature image as `background-size:520%`, `background-position` = data `lens`. Then `b` "Close-up Detail" (serif 18px) with `small` closeup text (11.5px, muted). Then i-chev 18px, rotated 180¬∞ when pressed (.3s). Hover or pressed: border accent, bg accent-tint.

Row animation: `.detail > *{animation:rise .6s var(--ease) both; animation-delay:calc(var(--i,0)*45ms)}` with `@keyframes rise{from{opacity:0;transform:translateY(12px)}}`. Leaving: `.detail.leaving > *{animation:sink .2s ease-in both;animation-delay:0s}` with `@keyframes sink{to{opacity:0;transform:translateY(-6px)}}`.

### 4.4 Era timeline
Span = ‚àí800 to 1900. `.bar`: relative grid `1300fr 1000fr 400fr`, height 6px, radius 2px. Three `b` segments in `--chip` with a 1px panel divider (outer corners rounded 2px). `u` marker: absolute, top ‚àí3px, height 12px, min-width 3px, accent, radius 1px, `left = pct(from)`, `width = max(.6, pct(to)‚àípct(from))` percent, `data-l` = eraLabel. `u::after` shows the label: absolute, right 0, top 15px, mono 9.5px, accent, nowrap, .04em. If `pct(from) < 50`, add class `l` so the label anchors left instead (`right:auto;left:0`). `.lab` below uses the same grid, margin-top 20px, mono 9px, .12em, uppercase, muted: Antiquity ¬∑ Medieval ¬∑ Modern.

### 4.5 Focus view
`.hero.focus`: `.side` fades and moves ‚àí24px X, `.info` fades and moves +24px X, `.tabs` fades and moves ‚àí16px Y, each `pointer-events:none`, all `.5s var(--ease)`. The stage measure becomes the entire hero, so the model glides to centre and grows. Escape closes it.

### 4.6 Responsive
- `max-width:1100px`: columns `minmax(0,1fr) clamp(280px,36vw,340px)`, `.side` hidden, `.main` padding-left 20px.
- `max-width:760px`: `.hero` flex column, `.info{display:contents}`. `.top` order 1, padding `10px 14px 0`, with `::before` "Myth Atlas" serif 21px, margin-right auto. `.search` collapses to a 32px circle, input hidden. `.main` order 2, flex 1, padding `10px 14px 6px`. Tabs gap 8px, `.tab` flex 1, grid `44px 1fr` with image spanning two rows (44√ó40), padding 6px 10px, b 15px, i 12px. Rail buttons 34px, gap 7px. `.turn` bottom 30px. Caption 15px. Hint hidden. Ground `bottom:17%; height:30px`. `.card` order 3, relative, z-index 7, `flex:0 0 auto; max-height:40dvh`, radius `10px 10px 0 0`, border-top only, no shadow, padding `14px 16px calc(14px + env(safe-area-inset-bottom))`, `transition: transform .5s var(--ease), background-color .6s`. `h1` 34px, margin-top 4px. Tags margin-top 10px. Lede margin-top 10px, 13px. h2 margin-top 12px, padding-top 10px. In focus: card absolute at the bottom, `translateY(105%)`; `.top` hidden.
- `max-height:620px and min-width:761px`: `.main` padding-top 16px, `.side` padding-top 14px, nav margin-top 12px, featured image and paragraph hidden.
- `prefers-reduced-motion`: all animation and transition durations .01s, delays 0. Idle motion off, `DUR = 1`, info swap instant.

## 5. Data (use verbatim; array is named `DINOS`)

```js
const DINOS = [
  {
    id: 'phoenix', no: 'MA-001', era: [-800, -430], eraLabel: 'Herodotus, 430 BC', scale: '1 m',
    name: 'Phoenix', latin: 'Phoenix ignis', family: 'Fire birds',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_020340_4815bb8d-68c3-48c4-ad05-6307d085e896.png&w=900&q=85',
    model: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261031_015714_12c0e407-828a-4b1f-957c-2efe1fe83be1.glb',
    yaw: 3.9, pitch: 0.1,
    tags: ['Immortal', 'Solitary', 'Fire-born'],
    lede: 'A bird the size of an eagle in crimson and gold, said to live five hundred years before building a nest of frankincense and myrrh, setting it alight and rising again from the ash. Herodotus heard the story in Egypt and admitted he did not quite believe it. Every age since has told it anyway.',
    traits: [
      ['t-wing', 'Wingspan', '4 m'],
      ['t-time', 'Lifespan', '500 years, then again'],
      ['t-diet', 'Diet', 'Frankincense and myrrh'],
      ['t-range', 'Reported', 'Heliopolis, Egypt'],
    ],
    habitat: 'Temple roofs, desert dawns and the pages of Herodotus.',
    caption: 'Burns once a lifetime. Never twice the same.',
    closeup: 'Each tail plume ends in a pale gold tip, the only part said to survive the fire.',
    lens: '55% 25%',
    feature: ['A fire you can outlive.', 'Crimson, gold and patient. The bird that refuses to end.'],
  },
  {
    id: 'kraken', no: 'MA-002', era: [1180, 1752], eraLabel: 'Pontoppidan, 1752', scale: '10 m',
    name: 'Kraken', latin: 'Architeuthis mythos', family: 'Sea monsters',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_020342_3e375b40-2c06-4189-995a-acbc21f06142.png&w=900&q=85',
    model: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261031_013537_0dc2c71f-4f11-4a86-ab93-91a59535d5b7.glb',
    yaw: 0.75, pitch: 0.12,
    tags: ['Abyssal', 'Ship-taker', 'Norse'],
    lede: 'Norwegian sailors described an island that was not there the day before, then the whirlpool it left when it sank. Bishop Pontoppidan wrote it up in 1752 as the largest creature in the world. The giant squid, hauled up a century later, turned out to be the smaller, truer version of the same story.',
    traits: [
      ['t-ruler', 'Length', 'A mile across, by oath'],
      ['t-depth', 'Depth', 'Norwegian Sea floor'],
      ['t-diet', 'Diet', 'Fish, whales and ships'],
      ['t-range', 'Reported', 'Off Bergen, Norway'],
    ],
    habitat: 'Cold deep water between Norway and Iceland.',
    caption: 'The island breathed, and the crew stopped rowing.',
    closeup: 'Suckers the width of a barrel lid, each ringed with a horn like a saw.',
    lens: '30% 45%',
    feature: ['An island with an appetite.', 'Eight arms, two tentacles and a thousand years of sailors‚Äô tales.'],
  },
];
```

## 6. Three.js scene

- Renderer: `{canvas, alpha:true, antialias:true, powerPreference:'high-performance'}`, pixel ratio `min(devicePixelRatio,2)`, `SRGBColorSpace`, `NeutralToneMapping`, exposure 1.05.
- `scene.environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture`, `environmentIntensity = .95`.
- `PerspectiveCamera(26, 1, .1, 100)`.
- `key = DirectionalLight(0xfff4e2, 1.6)` at (2.5, 4, 5). `rim = DirectionalLight(0xbfd8ff, .5)` at (‚àí4, 2, ‚àí3).
- Light presets:
  ```js
  day:  { env:.95, key:1.6, rim:.5, keyColor:0xfff4e2, exposure:1.05 }
  dusk: { env:.28, key:2.6, rim:1.9, keyColor:0xffc98a, exposure:1.0 }
  ```
- One rig per creature: `pivot` (slide, scale, sway) > `spin` (free rotation from the hand) > `holder` > `model`. `home` quaternion = `Euler(pitch, yaw, 0, 'YXZ')`, applied to `spin`.
- Loading: `GLTFLoader` with `DRACOLoader` and `MeshoptDecoder`. Compute the bounding sphere, subtract its centre from `model.position`, wrap in `holder` scaled `1/radius` so every model has radius 1. Each mesh: `frustumCulled=false`, `map.anisotropy = max`, `envMapIntensity = 1`. On failure log, set `rig.failed` and show `.fallback`. Each model loads once (cache the promise).

### Camera placement (critical)
The canvas spans the hero while the model is centred on the stage. Do this with a shifted principal point, not by moving the canvas:
```js
// measure(): s = focus ? heroRect : stageRect
goal.cx = s.left - h.left + s.width/2;
goal.cy = s.top - h.top + s.height * (focus ? .5 : .44);
goal.px = Math.min(s.width*.5, s.height*.6) * 1.16;   // pixels per world unit
goal.sw = s.width;
renderer.setSize(W, H, false); camera.aspect = W/H;
// every frame:
camera.position.z = H / (2*Math.tan(degToRad(26/2)) * view.px * zoom);
camera.setViewOffset(W, H, W/2 - view.cx, H/2 - view.cy, W, H);
```
`view` eases toward `goal` at rate 7. First measure snaps. ResizeObservers on hero and stage, plus `orientationchange`.

## 7. Interaction

All easing below uses `f(rate) = 1 - exp(-dt*rate)`, with `dt` capped at .05s.

- **Drag:** pointer capture on stage (ignore buttons). `k = PI / max(260, view.px*1.6)`, about half a turn per model width. `vel = delta*k`. `turnBy` premultiplies `spin.quaternion` by a Y-axis rotation then an X-axis rotation (world axes). Adds `.dragging`, clears `yawQueue`.
- **Inertia:** when released, keep applying `vel`, decaying by `exp(-dt*4.5)`.
- **Zoom:** `zoom` eases to `zoomGoal` at rate 6, clamped .55‚Äì3.4. Wheel: `zoomGoal*exp(-deltaY*(ctrlKey ? .01 : .0016))`, non-passive `preventDefault`. Two-finger pinch scales by the distance ratio. Rail buttons multiply or divide by 1.35. `#zoomIn.on` when `zoomGoal>=1`, `#zoomOut.on` otherwise. `#closeup` `aria-pressed` = `zoomGoal>2.2`.
- **Turn buttons:** `yawQueue` ¬±œÄ/2, 360¬∞ adds 2œÄ. Consumed with `step = yawQueue*f(4.2)`.
- **Double-click / key 0:** reset. `homing` slerps `spin` to `home` at rate 6 until within .002 rad; `setZoom(1)`.
- **Keyboard on stage:** arrows turn ¬±.18 rad; `+`/`=` zoom √ó1.2; `-` zoom √∑1.2.
- **Close-up button:** toggles zoom 2.6 ‚Üî 1.
- **Expand:** toggles `.focus`, `.on`, aria-pressed and aria-label ("Close expanded viewer" / "Expand viewer"), then calls `measure()`.
- **Light button:** toggles `data-light` day/dusk, `document.body.style.background = dusk ? '#14170f' : ''`, `.on`, aria-pressed and aria-label ("Switch to daylight" / "Switch to dusk lighting"). All light values ease at rate 4, key colour via `lerp`.
- Any interaction calls `touched()`: records `lastTouch`, cancels homing, adds `.hero.touched`.

## 8. Tab switch and idle life

`select(i)`:
1. Ignore if already active. `dir = sign(i - from)`. Update `aria-selected` and tabindex.
2. `paintInfo(i)`: add `.leaving`, then after 200ms fill the card, caption, scale text, featured card and fallback image, and reset card scroll.
3. Add `.stage.switching`, clear velocity and queue, `setZoom(1)`.
4. `anim = {from, to:-1, dir, t0:now}`: the old model leaves at once. If the new one isn't loaded, show the loader and await it. Bail if the user moved on.
5. Reset `spin` to `home`, set `anim.to = i` and `t1 = now`, remove `.switching`.

Timing with `DUR = 780`ms; `inCubic(t)=t¬≥`, `outCubic(t)=1-(1-t)¬≥`, `outBack(t)=1+2.2(t-1)¬≥+1.2(t-1)¬≤`, `slide = goal.sw*.95/view.px` world units:
- **Outgoing** over `DUR*.6`, `e=inCubic(t)`: `k=1-e`, `x=-dir*e*slide`, `twist=-dir*e*1.4`.
- **Incoming** over `DUR`, `e=outCubic(t)`: `k=max(.0001,outBack(t))*(.25+.75e)`, `x=dir*(1-e)*slide`, `twist=dir*(1-e)*1.6`.

Every frame each visible rig gets:
- `pivot.scale = k`
- `pivot.position = (x, sin(s*1.3+i)*.028, 0)`: a constant slow hover
- `pivot.rotation = (sin(s*.9)*.03*idle, twist + sin(s*.55)*.16*idle, 0)`

Here `s` is seconds and `idle = clamp01((now - lastTouch - 1800)/1500)`, so sway eases back in 1.8s after the hand lets go.

Boot: `paintInfo(0,true)`, `measure()`, show the loader, start the loop, load the active model, hide the loader, play the intro as an incoming `anim` (`from:-1`), then warm the other model.

## 9. Icon sprite (paste verbatim right after `<body>`)

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3.8 2.5 5.3 5.7.7-4.2 4 1.1 5.7-5.1-2.8-5.1 2.8L8 13.8l-4.2-4 5.7-.7z"/></symbol>
  <symbol id="i-claw" viewBox="0 0 24 24"><path d="M12 20c-1.5-3-1-7 1.5-10.5M12 20c-3.5-1.5-6-5-6.5-9.5M12 20c3.5-1.5 6-5 6.5-9.5M13.5 9.5 15 4M5.5 10.5 3.5 6M18.5 10.5 20.5 6"/></symbol>
  <symbol id="i-skull" viewBox="0 0 24 24"><path d="M12 3.5c4.5 0 7.5 3 7.5 7 0 2.5-1.2 4.2-3 5.3V20h-9v-4.2c-1.8-1.1-3-2.8-3-5.3 0-4 3-7 7.5-7z"/><circle cx="9.3" cy="11" r="1.6"/><circle cx="14.7" cy="11" r="1.6"/><path d="M11 20v-2.5M13 20v-2.5"/></symbol>
  <symbol id="i-bone" viewBox="0 0 24 24"><path d="M7.5 9.5 14.5 16.5M5 5.5a2.2 2.2 0 0 1 3.5 2.6 2.2 2.2 0 0 1-2.6 3.5A2.2 2.2 0 1 1 5 5.5zM19 18.5a2.2 2.2 0 0 1-3.5-2.6 2.2 2.2 0 0 1 2.6-3.5 2.2 2.2 0 1 1 .9 6.1z"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.5 19 6.5v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9v-5z"/><path d="M12 8v9M8.5 10.5h7"/></symbol>
  <symbol id="i-wing" viewBox="0 0 24 24"><path d="M3 15c3-6 8-9 15-9.5 1.5 0 3 .3 3 .3-1.5 1.5-2.5 4-4.5 5.5C13 14 8.5 15 3 15z"/><path d="M3 15c3.5.5 7 1.5 9.5 4.5M9 12.5l1.5 2.5"/></symbol>
  <symbol id="i-egg" viewBox="0 0 24 24"><path d="M12 3.5c3.5 0 6.5 4.5 6.5 9.5a6.5 6.5 0 0 1-13 0c0-5 3-9.5 6.5-9.5z"/><path d="m8 11 2 1.5 1.5-2 2 2 1.5-1.5"/></symbol>
  <symbol id="i-flame" viewBox="0 0 24 24"><path d="M12 3c1 3 4 4.5 4 8.5a4 4 0 0 1-8 0c0-1.5.5-2.5 1.5-3.5 0 1.5.7 2.3 1.5 2.5C10.5 8 11 5.5 12 3z"/><path d="M12 21c-4 0-7-2.6-7-6.5 0-2 .8-3.5 2-4.8"/><path d="M12 21c4 0 7-2.6 7-6.5 0-2-.8-3.5-2-4.8"/></symbol>
  <symbol id="i-wave" viewBox="0 0 24 24"><path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></symbol>
  <symbol id="i-peak" viewBox="0 0 24 24"><path d="M3 19 9.5 7l3 5.5L15 9l6 10z"/><path d="M8 10.5 9.5 12l1.5-1.5"/></symbol>
  <symbol id="i-mask" viewBox="0 0 24 24"><path d="M4 6c2.5 1 5.5 1.5 8 1.5S17.5 7 20 6v6c0 4.5-3.5 7.5-8 8.5C7.5 19.5 4 16.5 4 12z"/><path d="M8 11.5c1-1 2.5-1 3.5 0M12.5 11.5c1-1 2.5-1 3.5 0M9 15c1.5 1.5 4.5 1.5 6 0"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M14 7l5 5-5 5"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="m15.500 15.500 4.500 4.500M10.500 8v5M8 10.500h5"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="m15.500 15.500 4.500 4.500M8 10.500h5"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.500" cy="10.500" r="6.500"/><path d="m15.500 15.500 4.500 4.500"/></symbol>
  <symbol id="i-expand" viewBox="0 0 24 24"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.800"/><path d="M12 3v2.200M12 18.800V21M3 12h2.200M18.800 12H21M5.600 5.600l1.600 1.600M16.800 16.800l1.600 1.600M5.600 18.400l1.600-1.600M16.800 7.200l1.600-1.600"/></symbol>
  <symbol id="i-ccw" viewBox="0 0 24 24"><path d="M5 12a7 7 0 1 0 2.300-5.200L5 9M5 4.500V9h4.500"/></symbol>
  <symbol id="i-cw" viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-2.300-5.200L19 9M19 4.500V9h-4.500"/></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6.500 16.500V11a5.500 5.500 0 0 1 11 0v5.500l1.500 2H5zM10 20.500h4"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.500"/><path d="M5.500 19.500c1.200-3 3.600-4.500 6.500-4.500s5.300 1.500 6.500 4.500"/></symbol>
  <symbol id="i-chev" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></symbol>
  <symbol id="i-hand" viewBox="0 0 24 24"><path d="M8.500 12V5.500a1.500 1.500 0 0 1 3 0V11m0-1.500a1.500 1.500 0 0 1 3 0V11m0-.5a1.500 1.500 0 0 1 3 0v4.500c0 3.300-2.200 5.500-5.500 5.500-2.500 0-4-1-5.300-3.200L4.500 13.500c-.6-1.200 1-2.300 2-1.200l2 2.200"/></symbol>
  <symbol id="t-ruler" viewBox="0 0 24 24"><path d="m3.500 15.500 12-12 5 5-12 12zM7.500 11.500l2 2M10.500 8.500l2 2M13.500 5.500l2 2"/></symbol>
  <symbol id="t-speed" viewBox="0 0 24 24"><path d="M4 16a8.500 8.500 0 1 1 16 0M12 14l3.500-4.500"/><path d="M8 19h8"/></symbol>
  <symbol id="t-wing" viewBox="0 0 24 24"><path d="M3 8c4-3 9-3 12 0 2-1.5 4-1.5 6 0-1 4-4 6.5-8 6.5-5 0-8.5-2.5-10-6.5zM8 11.5l3 3M12 10.5l2.5 3.5"/></symbol>
  <symbol id="t-time" viewBox="0 0 24 24"><path d="M7 3h10M7 21h10M8 3c0 4 4 5.5 4 9s-4 5-4 9M16 3c0 4-4 5.5-4 9s4 5 4 9"/></symbol>
  <symbol id="t-depth" viewBox="0 0 24 24"><path d="M12 3v11M8.5 10.5 12 14l3.5-3.5M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></symbol>
  <symbol id="t-weight" viewBox="0 0 24 24"><path d="M12 4v3M4 7h16M6 7l-2.5 6a3 3 0 0 0 6 0zM18 7l-2.5 6a3 3 0 0 0 6 0zM9 20h6M12 7v13"/></symbol>
  <symbol id="t-diet" viewBox="0 0 24 24"><path d="M3 12c3-4 7-5 11-3.500 2 .7 3.500 2 5 3.500-1.500 1.500-3 2.800-5 3.500C10 17 6 16 3 12zM19 12l2.500-2.500v5zM8 11.500h.01"/></symbol>
  <symbol id="t-range" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.500"/><path d="M3.500 12h17M12 3.500c2.500 2.500 3.500 5.300 3.500 8.500s-1 6-3.500 8.500c-2.500-2.500-3.500-5.300-3.500-8.500s1-6 3.500-8.500z"/></symbol>
  <symbol id="t-reed" viewBox="0 0 24 24"><path d="M12 21V6M12 6c-1.200-1.200-1.200-2.500 0-3.500 1.200 1 1.200 2.300 0 3.500zM8 21v-8c0-2-1-3.500-2.500-4.500M16 21v-8c0-2 1-3.500 2.500-4.500M4 21h16"/></symbol>
</svg>
```

## 10. Feel

A quiet natural-history museum plate that happens to be alive. Warm paper, hairline rules, deadpan scholarly copy, and one vivid creature that weighs something in your hand: momentum when you flick it, a soft spring when it arrives, a slow breath when left alone. Do not add gradients, glows or extra colour.