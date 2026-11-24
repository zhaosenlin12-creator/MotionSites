# Fernhollow — Night Flower Valley Hero (exact recreation prompt)

Give me a single-file, full-screen hero for a regenerative design studio called **Fernhollow**. It sits on top of an interactive 3D night valley of glowing flowers. A centred cream headline "Grown, not built." in tall condensed type sits over the valley, with a short caption, a round arrow button, a top nav and a sound toggle.

The valley is the 3D flower valley from gladeye.com, used with permission. It is not rebuilt. The page runs the original compiled engine: their webpack runtime and chunks, including three.js r154, the valley scene class, its shaders and its post-processing. It also loads their ten valley assets. The supplied **HTML Code** section contains everything inlined in one file: every script chunk, every asset as a base64 data URI, and both fonts. Use that file as the source of truth. The prompt below describes the interface layer and how the valley is started.

How the valley behaves (all from the original engine):
- **Flowers:** thousands of point-sprite flowers and leaves are scattered over a terrain map. Flowers bloom from small to full size as they approach the camera, and leaves grow in further back.
- **Camera path:** the camera flies along a path baked into `camera-path07.glb`. Wheel or touch moves along it through a virtual scroller (20× touch multiplier). When idle it drifts forward slowly by itself.
- **Mouse:** pushes every point on screen away from the cursor in screen space, with the strongest push close by. Points nearest the cursor glow, and the camera tilts slightly toward the mouse.
- **Effects:** bloom, a split-RGB noise pass, depth fog, light ray sprites, dust particles and a vignette that tightens as you move faster.
- **Hover transition:** `startHoverTransition()` eases the flight to a stop, disperses the flowers outward into floating glowing particles, and muffles the ambient sound through a low-pass filter. `stopHoverTransition()` reverses all of it.
- **Audio:** a looping ambient track through the three.js `AudioListener`. It starts muted and fades in and out when toggled.

---

## 1. Page basics

- Title: `Fernhollow`
- Meta description: `A regenerative design studio. Wander through a night valley of flowers that grows as you move.`
- Fonts: `https://fonts.googleapis.com/css2?family=Antonio:wght@400&family=Manrope:wght@400;500&display=swap`. Antonio is the headline face, and Manrope is used for everything else. The supplied file embeds both.
- Colours: black background, cream `#f5efe2` text, dark text `#151510` on the cream pill.
- Unit: `--u:min(calc(100vw/1600),calc(100vh/900))`, which becomes `1px` at 820px and below.
- `html` and `body` have overflow hidden. `#valley` is fixed full screen and holds `.js-canvas-container`, which the engine mounts its canvas into. The engine's debug panel (`.lil-gui`) is hidden.

## 2. Interface (fixed above the canvas, `pointer-events:none` except links and buttons)

- **Header,** padding 24u top and 44u sides: the wordmark `Fernhollow` at 26u, weight 500. On the right, `Work`, `About`, `Journal` at 14.5u uppercase with .16em tracking and 44u gap, then the cream pill `Let’s talk`, 46u tall with 26u side padding.
- **Hero,** centred horizontally and vertically (`top:50%`, `translateY(-46%)`):
  - `Grown, not built.` in Antonio 400 at 158u, line height .92, tracking -.012em, no wrapping.
  - `Rooted in nature.` / `Built for what’s next.` at 20u, line height 1.3, 48u below.
  - A 58u circle with a 1.5px cream border holding a right arrow, 34u below. It fills cream on hover.
- **Bottom right,** at 44u: `Scroll to wander` at 12.5u uppercase with .16em tracking, a 1px divider 26u tall, then a 28u speaker icon button. It shows a speaker with an X when muted and with waves when playing.
- **Loader:** a black full-screen cover with one pulsing 9u cream dot. It fades out over 1s when the engine reports it has loaded.
- **Interface reveal:** it starts at opacity 0 and fades in over 1.6s the first time the engine reports its intro has finished.

## 3. Starting the original engine

After all chunks have run:

```js
self.webpackChunk_N_E.push([[90001],{},function(r){window.__req=r}]);
__req(889);                                   // the valley module
const Valley=window.__GE.et(), audioStore=window.__GE.Y();
let introShown=false;
const valley=new Valley(document.getElementById('valley'),
  ()=>loader.classList.add('gone'),           // onLoaded
  ()=>{ if(!introShown){ introShown=true; ui.classList.add('on') } });  // onIntroDone, called every frame after the intro
audioStore().initAudio();
sound.onclick=()=>{ const s=audioStore(); if(!s.isInitialized) return; const muted=s.toggleMute(); sound.setAttribute('aria-pressed', String(!muted)) };
go.addEventListener('pointerenter',()=>valley.startHoverTransition());
go.addEventListener('pointerleave',()=>valley.stopHoverTransition());
```

The page chunk is patched with one line before its `var ew=e=>{` so the module exposes its classes: `window.__GE={et:()=>et,Y:()=>Y};`

In the single-file version, each `"valley/…"` asset path inside the page chunk is replaced by its data URI. The camera path GLB URI must include `name=camera-path.glb`, because the engine picks its loader from the text after the first dot.

## 4. Phones (820px and below)

Header padding is 18px, and the nav links are hidden so only the `Let’s talk` pill shows (40px tall, 12px text). The headline is `clamp(64px,19vw,96px)` and may wrap. The caption is 17px. `Scroll to wander` and the sound button are centred at the bottom, 30px up.

---

## Interface code

This is the interface page as served next to the original `_next/static/chunks/` and `valley/` files. The HTML Code section has the same page with all of them inlined.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fernhollow</title>
<meta name="description" content="A regenerative design studio. Wander through a night valley of flowers that grows as you move.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--u:min(calc(100vw/1600),calc(100vh/900));--cream:#f5efe2}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#000;overflow:hidden}
body{color:var(--cream);font-family:Manrope,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
#valley{position:fixed;inset:0}
.js-canvas-container{position:absolute;inset:0}
.js-canvas-container canvas{display:block;width:100%!important;height:100%!important}
.lil-gui{display:none!important}
.ui{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity 1.6s ease}
.ui.on{opacity:1}
.ui a,.ui button{pointer-events:auto}
header{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;justify-content:space-between;padding:calc(24*var(--u)) calc(44*var(--u)) 0}
.logo{font-size:calc(26*var(--u));font-weight:500;letter-spacing:-.02em}
nav{display:flex;align-items:center;gap:calc(44*var(--u));font-size:calc(14.5*var(--u));font-weight:500;letter-spacing:.16em;text-transform:uppercase}
nav a:not(.pill){transition:opacity .2s}nav a:not(.pill):hover{opacity:.6}
.pill{display:inline-flex;align-items:center;height:calc(46*var(--u));padding:0 calc(26*var(--u));border-radius:99px;background:var(--cream);color:#151510;transition:transform .25s}
.pill:hover{transform:translateY(-1px)}
.hero{position:absolute;left:0;right:0;top:50%;transform:translateY(-46%);display:flex;flex-direction:column;align-items:center;text-align:center}
h1{font:400 calc(158*var(--u))/.92 Antonio,"Arial Narrow",sans-serif;letter-spacing:-.012em;white-space:nowrap}
.cap{margin-top:calc(48*var(--u));font-size:calc(20*var(--u));line-height:1.3}
.go{display:grid;place-items:center;margin-top:calc(34*var(--u));width:calc(58*var(--u));height:calc(58*var(--u));border:1.5px solid var(--cream);border-radius:50%;transition:background .3s,color .3s}
.go:hover{background:var(--cream);color:#151510}
.go svg{width:calc(22*var(--u));height:calc(22*var(--u));fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.corner{position:absolute;right:calc(44*var(--u));bottom:calc(44*var(--u));display:flex;align-items:center;gap:calc(18*var(--u));font-size:calc(12.5*var(--u));font-weight:500;letter-spacing:.16em;text-transform:uppercase}
.corner i{width:1px;height:calc(26*var(--u));background:rgba(245,239,226,.45)}
.sound{display:grid;place-items:center;width:calc(28*var(--u));height:calc(28*var(--u))}
.sound svg{width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.sound .w{transition:opacity .3s}.sound[aria-pressed=false] .w{opacity:0}
.sound[aria-pressed=true] .x{opacity:0}
.loader{position:fixed;inset:0;z-index:3;display:grid;place-items:center;background:#000;transition:opacity 1s ease;pointer-events:none}
.loader.gone{opacity:0}
.loader span{width:calc(9*var(--u));height:calc(9*var(--u));min-width:6px;min-height:6px;border-radius:50%;background:var(--cream);animation:pulse 1.2s ease-in-out infinite}
@keyframes pulse{50%{transform:scale(.4);opacity:.4}}
a:focus-visible,button:focus-visible{outline:2px solid var(--cream);outline-offset:3px}
@media (max-width:820px){
  :root{--u:1px}
  header{padding:18px 18px 0}
  nav a:not(.pill){display:none}
  .pill{height:40px;padding:0 18px;font-size:12px}
  .hero{left:20px;right:20px}
  .corner{left:20px;justify-content:center}
  h1{font-size:clamp(64px,19vw,96px);white-space:normal}
  .cap{font-size:17px}
  .corner{right:20px;bottom:30px;font-size:11px}
}
@media (prefers-reduced-motion:reduce){.loader span{animation:none}}
</style>
</head>
<body>
<div id="valley" aria-hidden="true"><div class="js-canvas-container"></div></div>
<div class="ui" id="ui">
  <header>
    <a class="logo" href="#" aria-label="Fernhollow">Fernhollow</a>
    <nav aria-label="Main"><a href="#">Work</a><a href="#">About</a><a href="#">Journal</a><a class="pill" href="#">Let’s talk</a></nav>
  </header>
  <section class="hero">
    <h1>Grown, not built.</h1>
    <p class="cap">Rooted in nature.<br>Built for what’s next.</p>
    <a class="go" href="#" id="go" aria-label="See our work"><svg viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"/></svg></a>
  </section>
  <div class="corner"><span>Scroll to wander</span><i></i>
    <button class="sound" id="sound" aria-pressed="false" aria-label="Ambient sound"><svg viewBox="0 0 24 24"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5Z"/><path class="w" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/><path class="x" d="m16 10 4 4m0-4-4 4"/></svg></button>
  </div>
</div>
<div class="loader" id="loader"><span></span></div>
<script src="_next/static/chunks/webpack-a76c04a7ba9aa4ef.js"></script>
<script src="_next/static/chunks/fd9d1056-76aadce26f555392.js"></script>
<script src="_next/static/chunks/123-3b7f3df3cc5866d7.js"></script>
<script src="_next/static/chunks/450-96e2a31dde902aa5.js"></script>
<script src="_next/static/chunks/567-6466d5cc81546a43.js"></script>
<script src="_next/static/chunks/340-4c85e05b44fc7370.js"></script>
<script src="_next/static/chunks/15-91b52fecfdd8e21a.js"></script>
<script src="_next/static/chunks/780-35f43a00462f78e8.js"></script>
<script src="_next/static/chunks/419-c9aec889e32d9e7b.js"></script>
<script src="_next/static/chunks/131-8efcfd03f067c029.js"></script>
<script src="_next/static/chunks/app/layout-681f1a9fe4dd4628.js"></script>
<script src="_next/static/chunks/4b5b508e-6dceef0b9f02cb18.js"></script>
<script src="_next/static/chunks/8-5234b317a5794281.js"></script>
<script src="_next/static/chunks/785-3ec288b614fa287f.js"></script>
<script src="_next/static/chunks/b536a0f1-51636bd4ac051d8f.js"></script>
<script src="_next/static/chunks/596-40a806be0d0d2bb3.js"></script>
<script src="_next/static/chunks/app/page-4c279de0997d388f.js"></script>
<script>
// boot the original flower valley from its own bundle, outside of its React page
self.webpackChunk_N_E.push([[90001],{},function(r){window.__req=r}]);
__req(889);
const Valley=window.__GE.et(),audioStore=window.__GE.Y();
let introShown=false;
const valley=new Valley(document.getElementById('valley'),
  ()=>document.getElementById('loader').classList.add('gone'),
  ()=>{if(!introShown){introShown=true;document.getElementById('ui').classList.add('on')}});
audioStore().initAudio();
const sound=document.getElementById('sound');
sound.onclick=()=>{const s=audioStore();if(!s.isInitialized)return;const muted=s.toggleMute();sound.setAttribute('aria-pressed',String(!muted))};
// hovering the arrow eases the camera to a stop and muffles the sound, like the original call to action
const go=document.getElementById('go');
go.addEventListener('pointerenter',()=>valley.startHoverTransition());
go.addEventListener('pointerleave',()=>valley.stopHoverTransition());
</script>
</body>
</html>
```