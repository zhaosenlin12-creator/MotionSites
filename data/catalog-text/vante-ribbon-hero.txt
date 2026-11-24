# Video Ribbon — Vante Scroll Portfolio Hero (exact recreation prompt)

Build a single-file, full-viewport, scroll-driven portfolio hero called **Vante**. On a near-black page, the two-part headline `CRAFT IN` / `MOTION` slides across the screen in opposite directions while a continuous ribbon of live video cards spirals around the viewer in 3D. It starts small along the bottom, swings close in a shallow curved arc, wraps around the left edge, runs away along the top and leaves top right. Then the cards land one by one in a calm 3×2 grid.

Plain HTML, CSS and one vanilla ES module in one file. The only external resources are the Google Fonts, three.js 0.170.0 from jsDelivr and the eight video URLs listed below. Reproduce every value, string and timing exactly. The CSS, markup and script are given verbatim, so copy them without changes.

Four rules define it:
1. **Everything comes from one number.** Scroll progress `p` from 0 to 1, smoothed with `p += (target - p) * .09` each frame, drives everything. Scrolling back reverses it perfectly.
2. **The ribbon runs on a fixed rail.** The path never moves. The ribbon only slides along it, card after card.
3. **Text always reads correctly.** The cards are a two-sided strip. When a card is seen from behind on the near pass, the fragment shader flips `uv.x`, so videos are never mirrored.
4. **The curve stays gentle up close.** The near pass is a shallow arc, about 5.4 to 7.6 units from the camera, so the middle card stays wide and flat. The far runs reach 24 units away, so the cards look tiny there.

---

## 1. Page basics

- Title: `Vante — Craft in Motion`
- Meta description: `A studio portfolio where a ribbon of live video work sweeps through space, then lands in a grid.`
- Fonts: `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&display=swap`, with preconnects to fonts.googleapis.com and fonts.gstatic.com (crossorigin).
- Import map: `three` → `https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js`
- Colours: background `#0a0a0b`, ink `#f4f1ea`, mid `#8d8b86`, line `rgba(244,241,234,.14)`.
- Structure: `#track` is 900vh tall and holds a sticky 100vh `.stage`.

## 2. Videos (use these exact URLs)

All are hosted with `Access-Control-Allow-Origin: *` and are loaded with `crossOrigin="anonymous"`, muted, looping and inline. Each one is a `THREE.VideoTexture`.

1. Roadster 3D: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/roadster-3d-car-landing.mp4`
2. Living Portrait: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4`
3. Particle Self: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/oraciteslArea.mp4`
4. Robot Jellyfish: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/medusa-jellyfish-hero.mp4`
5. Ink Reveal: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/ink-reveal-hover.mp4`
6. Space Voyage: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/space-voyage-video.mp4`
7. Helion Dispatch: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/helion-dispatch-landing.mp4`
8. Honey Bee: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/honey-bee-melli-landing.mp4`

The first six land in the grid. The last two appear only in the ribbon. Videos play only while their card is visible.

## 3. Layout

- **Top left:** a small triangular mark and `VANTE`, then two boxed pager arrows `←` and `→` hanging from the top edge.
- **Top centre:** `START A PROJECT →` in IBM Plex Mono with an underline.
- **Top right:** a `LET'S TALK` pill with a dot and a `MENU` pill with a two-line icon.
- **Bottom left:** `Concepts, explorations and interface experiments shared openly as part of our creative process.`
- **Bottom centre:** `VISUALS / FILM / MUSIC / EXPERIMENTS`. **Bottom right:** `VIEW SHOWREEL` with a short line.
- **Centre:** the caption `Exploring ideas through daily design practice.`, small and uppercase, between the two headline lines.
- **Headline:** Inter Tight 400, `clamp(40px,6.7vw,130px)`, letter-spacing `-.055em`. The two lines are offset horizontally and stack about one line apart.

## 4. First frame

At `p = 0` the screen looks almost empty and technical. A soft lighter glow fades down from the top over 42% of the height. A hairline with a small `+` at its centre crosses at 37.5% of the height. Only the end of the headline shows: `IN` at the far left edge and the start of `M` at the far right edge, both low on the screen, with the caption low in the centre. The glow, hairline, pager and `START A PROJECT` link fade out by `p = .05`.

## 5. Scroll timeline

| Progress | What happens |
|---|---|
| 0–.12 | Headline and caption rise 34vh into place |
| 0–.58 | `CRAFT IN` runs from -50vw to +76vw, `MOTION` runs the opposite way, crossing near .24 |
| .14–.63 | Ribbon slides along the whole rail |
| .52–.57 | Caption fades |
| As each card leaves the rail | That card flies straight to its grid slot over .13 of scroll, so there is never an empty screen |
| .72–.86 | A hairline draws across between the two rows |

A card is on the rail until it reaches the end of it, then it switches to its grid pose. Each card flies in from its own side with a small tilt, eased with `1-(1-t)^3`. Top row cards come from above, bottom row cards from below, outer cards from the sides.

## 6. The ribbon rail

Built from 161 sampled points as a centripetal `CatmullRomCurve3`, read back by arc length into a table of 1201 points and tangents. For `t` in 0–1 and `ph` from `-1.5` to `2π + 1.35`:

- `cs = cos(ph)`
- `depth = cs > 0 ? 7.6 + 16.4 * cs^.9 : 7.6 + 2.2 * cs`
- `edge = .84 + .5 * span(.14 - t, 0, .14) + .8 * span(t, .84, 1)`
- `u = 2t - 1`
- Point: `(edge * sin(ph) * depth * .561, .5 * sign(u) * |u|^1.4 * depth * .63, -depth)`

Cards are 2.1 × 1.32 units with a gap of .03, so they read as one strip. Each is a `PlaneGeometry` with 28 × 3 segments whose vertices are rewritten every frame by walking the rail. The local up vector is world Y made perpendicular to the tangent.

Camera: field of view 35°. Below 16:9 the field of view is recalculated with `atan(.561 / aspect)` so the horizontal view stays fixed and the ribbon is never squashed on a narrower window.

## 7. Card shader

A `ShaderMaterial` with an analytic rounded rectangle (`radius .018`), a cover fit from the video's aspect ratio, a dark placeholder of `vec3(.075)` until the video loads, a faint light edge, and `if(!gl_FrontFacing) uv.x = 1. - uv.x`. Output colour space is linear passthrough, with texture colour space `NoColorSpace`, so the videos keep their true colours.

## 8. Grid

Three columns and two rows on a plane at z = -8, 74% of the view width, gap 1.7% of that width. Below an aspect of .9 it becomes two columns and three rows at 88% width. Past `p = .86`, hovering a card shows a small ink pill with the design name that follows the cursor.

## 9. CSS (use verbatim)

```css
:root{--bg:#0a0a0b;--ink:#f4f1ea;--mid:#8d8b86;--line:rgba(244,241,234,.14)}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg)}
body{font-family:'Inter Tight',system-ui,sans-serif;color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
#track{height:900vh}
.stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;background:var(--bg)}
.hl{position:absolute;left:0;right:0;font-weight:400;font-size:clamp(40px,6.7vw,130px);line-height:1;letter-spacing:-.055em;white-space:nowrap;text-align:center;will-change:transform}
#l1{top:calc(50% - .98em)}
#l2{top:calc(50% + .03em)}
#l1 span,#l2 span{display:inline-block}
#l1 span{margin-right:15vw}
#l2 span{margin-left:15vw}
#cap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:15em;text-align:center;font-size:clamp(9px,.74vw,13px);font-weight:500;line-height:1.3;letter-spacing:.03em;text-transform:uppercase;color:var(--ink)}
#gl{position:absolute;inset:0;width:100%;height:100%;display:block}
.top{position:absolute;left:32px;right:32px;top:26px;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
.top{justify-content:flex-start}.acts{margin-left:auto}
#pager{display:flex;margin:-26px 0 0 28px;pointer-events:auto}
#pager span{display:grid;place-items:center;width:44px;height:50px;border:1px solid var(--line);border-top:0;margin-left:-1px;font:400 11px 'IBM Plex Mono',monospace;color:var(--mid)}
#glow{position:absolute;left:0;right:0;top:0;height:42%;background:linear-gradient(rgba(244,241,234,.1),rgba(244,241,234,0))}
#cross{position:absolute;left:32px;right:32px;top:37.5%;height:1px;background:var(--line)}
#cross i{position:absolute;left:50%;top:-.62em;margin-left:-.3em;font:400 13px 'IBM Plex Mono',monospace;color:var(--mid);background:var(--bg);padding:0 .3em;line-height:1.2}
.logo{display:flex;align-items:center;gap:9px;font-size:19px;font-weight:600;letter-spacing:.09em}
.logo svg{width:22px;height:18px;fill:var(--ink)}
.acts{display:flex;align-items:center;gap:7px;pointer-events:auto}
.acts a{display:flex;align-items:center;gap:9px;height:32px;padding:0 15px;border:1px solid rgba(244,241,234,.55);border-radius:99px;color:var(--ink);text-decoration:none;font-size:12px;font-weight:500;letter-spacing:.06em;transition:background .2s,color .2s}
.acts a:hover{background:var(--ink);color:var(--bg)}
.acts a i{width:6px;height:6px;border-radius:50%;background:currentColor}
.acts a b{display:block;width:13px;height:7px;border-top:1px solid currentColor;border-bottom:1px solid currentColor}
#hint{position:absolute;left:50%;top:33px;transform:translateX(-50%);font:400 11.5px 'IBM Plex Mono',monospace;letter-spacing:.06em;color:var(--ink);padding-bottom:6px;border-bottom:1px solid var(--line)}
.bot{position:absolute;left:32px;right:32px;bottom:26px;display:grid;grid-template-columns:1fr auto 1fr;align-items:end;font-size:12.5px;line-height:1.35;pointer-events:none}
.bot p{color:var(--ink);max-width:21em}
.bot .mid{font:400 11.5px 'IBM Plex Mono',monospace;letter-spacing:.06em}
.bot .mid s{text-decoration:none;color:var(--mid);margin:0 .9em}
.bot .r{justify-self:end;display:flex;gap:12px;align-items:center;font:400 11.5px 'IBM Plex Mono',monospace;letter-spacing:.06em}
.bot .r:after{content:"";width:22px;height:1px;background:var(--ink)}
#rule{position:absolute;left:3.5vw;right:3.5vw;top:50%;height:1px;background:var(--line);transform-origin:left;transform:scaleX(0)}
#name{position:absolute;left:0;top:0;padding:6px 11px;background:var(--ink);color:var(--bg);border-radius:99px;font-size:11.5px;font-weight:600;letter-spacing:.04em;pointer-events:none;opacity:0;transition:opacity .16s;white-space:nowrap}
@media (max-width:760px){
  .top{left:18px;right:18px;top:18px}.bot{left:18px;right:18px;bottom:18px;grid-template-columns:1fr auto}.bot .mid{display:none}
  #hint,#pager{display:none}.bot p{max-width:17em;font-size:11px}
}
```

## 10. Markup (use verbatim, as the contents of body before the script)

```html
<div id="track">
  <main class="stage" id="stage">
    <h1 aria-label="Craft in motion">
      <div class="hl" id="l1" aria-hidden="true"><span>CRAFT IN</span></div>
      <div class="hl" id="l2" aria-hidden="true"><span>MOTION</span></div>
    </h1>
    <div id="cap">Exploring ideas through daily design practice.</div>
    <div id="glow"></div>
    <div id="cross"><i>+</i></div>
    <div id="rule"></div>
    <canvas id="gl"></canvas>
    <div id="hint">START A PROJECT &nbsp;→</div>
    <header class="top">
      <div class="logo"><svg viewBox="0 0 22 18"><path d="M11 0l11 18h-6.200L11 9.600 6.200 18H0z"/></svg>VANTE</div>
      <div id="pager"><span>←</span><span>→</span></div>
      <nav class="acts"><a href="#"><i></i>LET'S TALK</a><a href="#">MENU<b></b></a></nav>
    </header>
    <footer class="bot">
      <p>Concepts, explorations and interface experiments shared openly as part of our creative process.</p>
      <div class="mid">VISUALS<s>/</s>FILM<s>/</s>MUSIC<s>/</s>EXPERIMENTS</div>
      <div class="r">VIEW SHOWREEL</div>
    </footer>
    <div id="name"></div>
  </main>
</div>
```

## 11. Script (use verbatim, as `<script type="module">`)

```js
import * as THREE from 'three';

const R2 = 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/';
const WORK = [
  ['Roadster 3D', 'designs/roadster-3d-car-landing.mp4'],
  ['Living Portrait', 'aaaf/living-portrait-hero.mp4'],
  ['Particle Self', 'aaaf/oraciteslArea.mp4'],
  ['Robot Jellyfish', 'aaaf/medusa-jellyfish-hero.mp4'],
  ['Ink Reveal', 'designs/ink-reveal-hover.mp4'],
  ['Space Voyage', 'designs/space-voyage-video.mp4'],
  ['Helion Dispatch', 'designs/helion-dispatch-landing.mp4'],
  ['Honey Bee', 'designs/honey-bee-melli-landing.mp4'],
];
const $ = id => document.getElementById(id);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const out = t => 1 - (1 - t) ** 3;
const span = (p, a, b) => clamp((p - a) / (b - a));

/* ---------- renderer ---------- */
const canvas = $('gl');
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setClearColor(0, 0);
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
const scene = new THREE.Scene();
const FOV = 35, camera = new THREE.PerspectiveCamera(FOV, 1, .1, 100);

/* ---------- ribbon path ---------- */
let path, PATH_L = 1;
const SAMPLES = 1200, pathP = [], pathT = [];
const PH0 = -1.5, PH1 = Math.PI * 2 + 1.35;
function buildPath() {
  const pts = [];
  for (let i = 0; i <= 160; i++) {
    const t = i / 160, ph = mix(PH0, PH1, t), cs = Math.cos(ph), u = 2 * t - 1;
    // a shallow arc close to the camera, then long runs far behind it
    const depth = cs > 0 ? 7.6 + 16.4 * cs ** .9 : 7.6 + 2.2 * cs;
    const edge = .84 + .5 * span(.14 - t, 0, .14) + .8 * span(t, .84, 1);
    pts.push(new THREE.Vector3(edge * Math.sin(ph) * depth * .561, .5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * .63, -depth));
  }
  path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  path.arcLengthDivisions = 1500;
  PATH_L = path.getLength(); pathP.length = pathT.length = 0;
  for (let i = 0; i <= SAMPLES; i++) { const u = i / SAMPLES; pathP.push(path.getPointAt(u)); pathT.push(path.getTangentAt(u)); }
}
const at = (s, op, ot) => {
  const f = clamp(s / PATH_L) * SAMPLES, i = Math.min(SAMPLES - 1, Math.floor(f)), k = f - i;
  op.lerpVectors(pathP[i], pathP[i + 1], k); ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
};

/* ---------- cards ---------- */
const CARD_W = 2.1, CARD_H = 1.32, GAP = .03, STEP = CARD_W + GAP, NX = 28, NY = 3;
const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;
const cards = WORK.map(([title, src], i) => {
  const v = document.createElement('video');
  Object.assign(v, {crossOrigin:'anonymous', muted:true, loop:true, playsInline:true, preload:'auto', src:R2 + src});
  v.setAttribute('playsinline', '');
  const tex = new THREE.VideoTexture(v);
  tex.colorSpace = THREE.NoColorSpace; tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false;
  const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
  const mat = new THREE.ShaderMaterial({vertexShader:vs, fragmentShader:fs, transparent:true, side:THREE.DoubleSide,
    uniforms:{map:{value:tex}, cover:{value:new THREE.Vector2(1, 1)}, aspect:{value:CARD_W / CARD_H}, ready:{value:0}, radius:{value:.018}}});
  const mesh = new THREE.Mesh(geo, mat); mesh.frustumCulled = false; scene.add(mesh);
  const c = {i, title, v, tex, geo, mat, mesh, rect:null};
  v.addEventListener('loadeddata', () => {
    const va = v.videoWidth / v.videoHeight, ca = CARD_W / CARD_H;
    mat.uniforms.cover.value.set(va > ca ? ca / va : 1, va > ca ? 1 : va / ca);
    mat.uniforms.ready.value = 1;
  });
  return c;
});

/* ---------- layout ---------- */
const GZ = 8;
let W = 1, H = 1, asp = 1, cols = 3, rows = 2, tanH = .3153;
function resize() {
  W = innerWidth; H = innerHeight; asp = W / H;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(W, H, false);
  camera.aspect = asp; camera.fov = asp < 16 / 9 ? Math.atan(.561 / asp) * 360 / Math.PI : FOV; camera.updateProjectionMatrix();
  tanH = Math.tan(camera.fov * Math.PI / 360);
  cols = asp < .9 ? 2 : 3; rows = asp < .9 ? 3 : 2;
  }
addEventListener('resize', resize); resize(); buildPath();
function grid(i) {
  const vh = 2 * GZ * tanH, vw = vh * asp, gw = vw * (cols === 3 ? .74 : .88), gap = gw * .017;
  const cw = (gw - gap * (cols - 1)) / cols, ch = cw / (CARD_W / CARD_H), gh = ch * rows + gap * 1.6 * (rows - 1);
  const c = i % cols, r = Math.floor(i / cols);
  return {x:-gw / 2 + cw / 2 + c * (cw + gap), y:gh / 2 - ch / 2 - r * (ch + gap * 1.6), w:cw, h:ch, vw, vh, c, r};
}

/* ---------- scroll ---------- */
let target = 0, p = 0, frozen = false;
const readScroll = () => { const t = $('track'); target = clamp(scrollY / (t.offsetHeight - innerHeight)); };
addEventListener('scroll', readScroll, {passive:true}); readScroll();

/* ---------- pose ---------- */
const op = new THREE.Vector3(), ot = new THREE.Vector3(), up = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0), vp = new THREE.Vector3();
function poseRibbon(c, head) {
  const pos = c.geo.attributes.position, centre = head - c.i * STEP;
  for (let iy = 0; iy <= NY; iy++) for (let ix = 0; ix <= NX; ix++) {
    const k = iy * (NX + 1) + ix, lu = ix / NX - .5, lv = .5 - iy / NY;
    at(centre + lu * CARD_W, op, ot);
    // keep the sheet upright, leaning a little into the turn
        up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
    vp.copy(op).addScaledVector(up, lv * CARD_H);
    pos.setXYZ(k, vp.x, vp.y, vp.z);
  }
  pos.needsUpdate = true;
}
function poseGrid(c, q) {
  const g = grid(c.i), pos = c.geo.attributes.position;
  const dx = (g.c - (cols - 1) / 2) * 1.2 + (cols === 3 && g.c === 1 ? 0 : 0), dy = g.r < rows / 2 ? 1 : -1;
  const ox = dx * g.vw * .62 * (1 - q), oy = dy * g.vh * (g.c === 1 ? .95 : .34) * (1 - q), tilt = (1 - q) * .22 * (g.c - 1 || .5) * dy;
  const cs = Math.cos(tilt), sn = Math.sin(tilt);
  for (let iy = 0; iy <= NY; iy++) for (let ix = 0; ix <= NX; ix++) {
    const k = iy * (NX + 1) + ix, x = (ix / NX - .5) * g.w, y = (.5 - iy / NY) * g.h;
    pos.setXYZ(k, g.x + ox + x * cs - y * sn, g.y + oy + x * sn + y * cs, -GZ - (1 - q) * .6 * Math.sin(ix / NX * Math.PI));
  }
  pos.needsUpdate = true;
  c.rect = g;
}

const RIB_A = .14, RIB_B = .63;
function setVideos(fn) { cards.forEach(c => fn(c)); }
function render() {
  const pp = p;
  // headline runs right across the page in opposite directions
  const rise = 1 - out(span(pp, 0, .12));
  const run = mix(-50, 76, span(pp, 0, .58));
  $('l1').style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
  $('l2').style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;
  const capA = 1 - span(pp, .52, .57);
  $('cap').style.opacity = capA; $('cap').style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
  const intro = 1 - span(pp, 0, .05);
  for (const id of ['hint', 'pager', 'cross', 'glow']) $(id).style.opacity = intro;
  $('rule').style.transform = `scaleX(${ease(span(pp, .72, .86))})`;
  $('rule').style.top = '50%';
  // ribbon, then the grid
  const pr = span(pp, RIB_A, RIB_B), head = mix(0, PATH_L + cards.length * STEP, pr);
  for (const c of cards) {
    const s = head - c.i * STEP, end = PATH_L - CARD_W;
    if (s < end) {
      c.mesh.visible = s > CARD_W; c.rect = null;
      if (c.mesh.visible) poseRibbon(c, head);
    } else if (c.i < cols * rows) {
      // each card flies to its slot the moment it leaves the rail
      const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP)), q = out(span(pp, st, st + .13));
      c.mesh.visible = q > .001;
      if (c.mesh.visible) poseGrid(c, q);
    } else { c.mesh.visible = false; c.rect = null; }
  }
  renderer.render(scene, camera);
}

/* ---------- hover ---------- */
const nameEl = $('name');
$('stage').addEventListener('pointermove', e => {
  let hit = null;
  if (p > .86) {
    const nx = (e.clientX / W - .5), ny = (.5 - e.clientY / H);
    for (const c of cards) { const g = c.rect; if (!g) continue; const x = nx * g.vw, y = ny * g.vh; if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) hit = c; }
  }
  nameEl.style.opacity = hit ? 1 : 0;
  if (hit) { nameEl.textContent = hit.title; nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`; }
});

/* ---------- loop ---------- */
function loop() {
  if (!frozen) {
    p += (target - p) * .09;
    if (Math.abs(target - p) < .00005) p = target;
    for (const c of cards) {
      if (c.mesh.visible && c.v.paused) c.v.play().catch(() => {});
      else if (!c.mesh.visible && !c.v.paused) c.v.pause();
    }
    render();
  }
  requestAnimationFrame(loop);
}
loop();
```

## 12. Feel

Black, quiet and exact. The headline glides like two trains passing. The ribbon arrives small and far away, then swings past you with real weight, wraps around the edge and is gone. Then six live pieces of work settle into a calm grid.