Build a single, self-contained `index.html` file — one file, no build step, no dependencies, no frameworks. All CSS in one `<style>` block in `<head>`, all JS in one IIFE `<script>` block at the end of `<body>`. It is a scroll-scrubbed video landing page for a fictional 3D studio called "Cast & Render". Scrolling the page does not move the page content — it scrubs a fixed full-screen background video frame by frame, while three text panels cross-fade in and out over it.

============================================================
1. DOCUMENT HEAD
============================================================
- `<!DOCTYPE html>`, `<html lang="en">`.
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (viewport-fit=cover is required for the safe-area insets used later).
- `<title>Cast &amp; Render — 3D Object Studio</title>`
- Preconnects, in this order:
  - `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
  - `<link rel="preconnect" href="https://d2ol7oe51mr4n9.cloudfront.net" crossorigin>`
- Font: `<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap" rel="stylesheet">`
  Only Inter Tight, only weights 400 and 500. Body stack:
  `'Inter Tight','Helvetica Neue',Helvetica,Arial,sans-serif`, base weight 400.

============================================================
2. CSS CUSTOM PROPERTIES (on :root)
============================================================
--fg:#0d0c0b;
--fg-soft:rgba(13,12,11,.64);
--fg-faint:rgba(13,12,11,.42);
--shade:#f2f0ec;
--rule:rgba(13,12,11,.16);
--ease:cubic-bezier(.22,.61,.36,1);
--pill-bg:#0a0908;
--pill-fg:#ffffff;

Global reset: 
`html{ -webkit-text-size-adjust:100%; }`
`body`: background var(--shade); color var(--fg); the font stack above; font-weight 400; `-webkit-font-smoothing:antialiased`; `-moz-osx-font-smoothing:grayscale`; `overflow-x:hidden`.

============================================================
3. MARKUP ORDER INSIDE <body>
============================================================
1. `<div class="boot" id="boot">` containing `<div class="bar"><i id="bootBar"></i></div>` and `<p id="bootPct">LOADING 0%</p>`
2. `<div class="stage">` containing
   `<video id="clip" muted playsinline preload="auto" disablepictureinpicture></video>`
   (NO src attribute — JS sets it), then `<div class="veil"></div>`, then `<div class="grain"></div>`
3. `<i class="meter" id="meter"></i>`
4. `<header class="chrome">` with:
   - `<div class="mark"><span class="mark-star" aria-hidden="true">&#10037;</span>&nbsp;Cast &amp; Render</div>`
   - `<nav class="nav">` with `<a href="#board">Works</a>`, `<a href="#visit">About</a>`, `<a class="pill" href="#order">Start a brief</a>`
5. `<main class="panels">` with three `<section class="panel" data-panel>` elements (content in §7)
6. `<footer class="foot">112 Render Lane &nbsp;&middot;&nbsp; Tue–Sun, 9am till sold out</footer>`
7. `<div class="track"></div>`  ← the only thing that gives the page height
8. `<script>` … `</script>`

============================================================
4. FIXED BACKGROUND VIDEO LAYER
============================================================
.stage — `position:fixed; inset:0; z-index:0; overflow:hidden; background:var(--shade);`
.stage video — `position:absolute; top:50%; left:50%; width:100%; height:100%;
  transform:translate(-50%,-50%) scale(1.02); object-fit:cover; filter:contrast(1.02); will-change:transform;`

.veil — `position:absolute; inset:0; pointer-events:none;` with a three-layer background,
in this exact order (the footage is high-key white, so this is a deliberately light wash,
heavier at the top and bottom edges where nav and footer sit):
```
background:
  linear-gradient(to bottom, rgba(242,240,236,.62) 0%, rgba(242,240,236,.12) 22%, rgba(242,240,236,.12) 78%, rgba(242,240,236,.66) 100%),
  radial-gradient(100% 80% at 50% 48%, rgba(242,240,236,0) 0%, rgba(242,240,236,.34) 100%),
  rgba(242,240,236,.20);
```

.grain — fine SVG turbulence noise so the flat wash doesn't band:
`position:absolute; inset:-50%; opacity:.13; mix-blend-mode:multiply; pointer-events:none;` and
```
background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='.5'/></svg>");
```
(the `#` in `url(#n)` must be percent-encoded as `%23n`).

============================================================
5. CHROME (fixed header), FOOTER, SCROLL METER
============================================================
.chrome — `position:fixed; left:0; right:0; top:0; z-index:40; display:flex;
align-items:center; justify-content:space-between; gap:12px;`
padding: `max(14px, calc(env(safe-area-inset-top, 0px) + 12px)) clamp(16px, 3.4vw, 44px) 14px;`
background: `linear-gradient(to bottom, rgba(242,240,236,.94) 0%, rgba(242,240,236,.78) 72%, rgba(242,240,236,0) 100%);`

.mark — `display:flex; align-items:center; gap:9px; font-size:15px; letter-spacing:-.012em;
color:var(--fg); min-width:0; flex-shrink:1;`
.mark-star — `opacity:.85;`

.nav — `display:flex; align-items:center; gap:clamp(14px, 2.4vw, 32px); flex-shrink:0;`
.nav a:not(.pill) — `color:var(--fg); text-decoration:none; font-size:14.5px;
letter-spacing:-.008em; opacity:.88; transition:opacity .3s var(--ease);` hover → opacity 1.

.pill — `display:inline-flex; align-items:center; justify-content:center; height:40px;
padding:0 21px; border-radius:999px; background:var(--pill-bg); color:var(--pill-fg);
font-size:14.5px; font-weight:500; letter-spacing:-.008em; text-decoration:none;
white-space:nowrap; opacity:1; border:1px solid rgba(10,9,8,.12);
box-shadow:0 1px 0 rgba(255,255,255,.10) inset; -webkit-text-fill-color:var(--pill-fg);
transition:transform .4s var(--ease), background .3s var(--ease), color .3s var(--ease);`
Add `.nav .pill{ color:#fff; -webkit-text-fill-color:#fff; }` — this is required so the
nav's inherited link colour never bleeds into the dark pill on mobile Safari.
`.pill:hover, .pill:focus-visible` → `transform:translateY(-2px); background:#000; color:#fff;
-webkit-text-fill-color:#fff;`
`.pill:focus-visible` → `outline:2px solid var(--fg); outline-offset:2px;`

.foot — `position:fixed; bottom:0; left:0; right:0; z-index:40; display:flex;
justify-content:center;` padding `14px clamp(16px, 4vw, 24px) max(16px, calc(env(safe-area-inset-bottom, 0px) + 12px));`
`font-size:12px; line-height:1.45; letter-spacing:.02em; color:var(--fg-faint);
text-align:center; pointer-events:none;`
background: `linear-gradient(to top, rgba(242,240,236,.92) 0%, rgba(242,240,236,.72) 72%, rgba(242,240,236,0) 100%);`

.meter (scroll progress hairline) — `position:fixed; top:0; left:0; z-index:50; height:2px;
width:100%; transform:scaleX(0); transform-origin:0 50%; background:var(--fg); opacity:.55;`

============================================================
6. PANEL LAYER
============================================================
.panels — `position:fixed; inset:0; z-index:20; pointer-events:none;`
.panel — `position:absolute; inset:0; display:flex; flex-direction:column;
align-items:center; justify-content:center; text-align:center;`
padding: `max(104px, calc(env(safe-area-inset-top, 0px) + 88px)) clamp(20px, 5vw, 60px) max(96px, calc(env(safe-area-inset-bottom, 0px) + 80px));`
`opacity:0; will-change:opacity,transform;` (JS drives opacity/transform every frame)

.eyebrow — `display:flex; align-items:center; justify-content:center; flex-wrap:wrap;
gap:6px 12px; font-size:12.5px; letter-spacing:.045em; color:var(--fg-soft);
margin-bottom:clamp(16px,2vw,22px); max-width:min(46ch, 100%); text-align:center;`

h1 — `font-weight:400; font-size:clamp(34px, 7.1vw, 104px); line-height:.98;
letter-spacing:-.036em; max-width:15ch; text-wrap:balance;`

.sub — `margin-top:clamp(18px,2.2vw,28px); font-size:clamp(15px,1.28vw,19px);
line-height:1.5; letter-spacing:-.008em; color:var(--fg-soft);
max-width:min(46ch, 100%); text-wrap:pretty;`

.cta — `margin-top:clamp(28px,3.4vw,44px); pointer-events:auto; width:100%;
display:flex; justify-content:center;`
.cta .pill — `height:48px; padding:0 27px; font-size:15px; max-width:min(100%, 320px);`

============================================================
7. PANEL COPY (verbatim)
============================================================
Panel 1
  eyebrow: `Objects studio <span>&middot;</span> No. 112 Render Lane`
  h1: `Built at four.<br />Out by seven.`
  sub: `Six kinds of mesh, one render farm, and a queue that starts before the sun does.`
  cta: pill link `href="#board"` → `View the reel`

Panel 2
  eyebrow: `Across the studio`
  h1: `Flat, never bent.`
  sub: `The mesh should still be clean when it reaches the viewport. We export to order, never before.`
  cta: pill link `href="#visit"` → `Tour our space`

Panel 3
  eyebrow: `The surface`
  h1: `Smooth enough to<br />hold a light pass.`
  sub: `Custom surface shaders whipped every morning, spread to the edge and weighed by the quarter pound.`
  cta: pill link `href="#order"` → `Start a brief`

============================================================
8. PRELOADER
============================================================
.boot — `position:fixed; inset:0; z-index:90; display:flex; flex-direction:column;
align-items:center; justify-content:center; gap:16px; background:var(--shade);
transition:opacity .7s var(--ease), visibility .7s;`
`.boot.done{ opacity:0; visibility:hidden; }`
`.boot p{ font-size:12.5px; letter-spacing:.05em; color:var(--fg-faint); }`
`.bar{ width:150px; height:1px; background:var(--rule); overflow:hidden; }`
`.bar i{ display:block; height:100%; width:100%; background:var(--fg); transform:scaleX(0); transform-origin:0 50%; }`
Text reads `LOADING 0%` → `LOADING 100%`, uppercase, driven by JS.

============================================================
9. SCROLL TRACK
============================================================
`.track{ position:relative; z-index:1; height:560vh; min-height:3200px; }`
This is the entire page height. Nothing else contributes scroll length.

============================================================
10. RESPONSIVE BREAKPOINTS (exact, in this order)
============================================================
@media (max-width:900px) — strengthen the veil so dark type stays legible on small,
bright screens:
```
.veil{
  background:
    linear-gradient(to bottom, rgba(242,240,236,.72) 0%, rgba(242,240,236,.18) 24%, rgba(242,240,236,.18) 76%, rgba(242,240,236,.74) 100%),
    radial-gradient(100% 80% at 50% 48%, rgba(242,240,236,0) 0%, rgba(242,240,236,.40) 100%),
    rgba(242,240,236,.24);
}
```

@media (max-width:720px)
- `.nav a:not(.pill){ display:none; }`  (Works/About hide; only the pill remains)
- `.mark{ font-size:14px; }`
- `.nav .pill{ height:38px; padding:0 16px; font-size:13.5px; }`
- `h1{ max-width:12ch; font-size:clamp(30px, 9.8vw, 52px); }`
- `.sub{ font-size:15px; max-width:34ch; }`
- `.panel{ padding: max(92px, calc(env(safe-area-inset-top, 0px) + 76px)) 18px max(88px, calc(env(safe-area-inset-bottom, 0px) + 72px)); }`
- `.foot{ font-size:11px; max-width:34ch; }`

@media (max-width:420px)
- `.mark-star{ display:none; }`
- `.nav .pill{ height:36px; padding:0 14px; font-size:13px; }`
- `h1{ max-width:11ch; font-size:clamp(28px, 10.5vw, 40px); }`
- `.eyebrow{ font-size:11px; letter-spacing:.04em; max-width:28ch; }`
- `.cta .pill{ width:100%; max-width:280px; height:44px; padding:0 20px; font-size:14px; }`

@media (max-height:520px) and (orientation:landscape)
- `.panel{ padding: max(72px, calc(env(safe-area-inset-top, 0px) + 56px)) 24px max(64px, calc(env(safe-area-inset-bottom, 0px) + 48px)); }`
- `h1{ font-size:clamp(28px, 8vh, 44px); }`
- `.sub{ margin-top:12px; font-size:14px; }`
- `.cta{ margin-top:16px; }`

============================================================
11. JAVASCRIPT — wrap everything in `(function(){ "use strict"; … })();`
============================================================

VIDEO URL — use exactly this, no substitutions:
```
var VIDEO_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4";
```
(1920×1080, 10.04s, 241 frames, all-intra — every frame is a keyframe, which is why a
scroll scrub can land on an exact frame instantly. Note this in a comment.)

Grab refs: `clip`, `boot`, `bootBar`, `bootPct`, `meter`, and
`panels = [].slice.call(document.querySelectorAll("[data-panel]"))`.

--- Cue table ---
Each panel owns a slice of scroll as `[fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]`
in 0..1 page progress. The gaps between one panel's fadeOutEnd and the next's fadeInStart
are deliberate dead zones — video only — so two panels are never readable at once:
```
var CUES = [
  [0.00, 0.00, 0.15, 0.23],
  [0.35, 0.43, 0.57, 0.65],
  [0.77, 0.85, 1.10, 1.20]
];
var DRIFT = 22; // px of counter-scroll travel per panel
```

--- Helpers ---
`clamp(v,a,b)`; `smooth(t){ return t*t*(3-2*t); }` (smoothstep);
`ramp(p,a,b)`: if `b <= a` return `p >= b ? 1 : 0`, else `smooth(clamp((p-a)/(b-a),0,1))`.

--- State ---
`progress` (0..1 down the page), `seekTo` (target video time), `seekAt` (actual, eased),
`duration`, `ready`.

`readScroll()`: `max = document.documentElement.scrollHeight - window.innerHeight;`
`progress = max > 0 ? clamp(window.pageYOffset / max, 0, 1) : 0;`
`if (duration) seekTo = progress * duration;`

`paint()`:
- `meter.style.transform = "scaleX(" + progress + ")";`
- For each panel i: `enter = ramp(progress, c[0], c[1])`, `leave = ramp(progress, c[2], c[3])`,
  `o = enter * (1 - leave)`, `y = (1 - enter) * DRIFT - leave * DRIFT`.
  Set `el.style.opacity = o`, `el.style.transform = "translate3d(0," + y + "px,0)"`,
  and `el.style.pointerEvents = o > 0.6 ? "auto" : "none"`.

`frame()` — rAF loop, never cancelled:
```
if (ready && duration){
  var gap = seekTo - seekAt;
  if (Math.abs(gap) > 0.0008){
    seekAt += gap * 0.115;                       // easing factor — do not change
    if (clip.readyState >= 2 && !clip.seeking){
      try { clip.currentTime = seekAt; } catch (e) {}
    }
  }
}
paint();
requestAnimationFrame(frame);
```
The easing of `currentTime` toward the scroll target (rather than snapping) is what turns
a jumpy scrub into a smooth one.

--- Boot / loading ---
`setProgress(f)` sets `bootBar.style.transform = "scaleX(" + f + ")"` and
`bootPct.textContent = "LOADING " + Math.round(f * 100) + "%"`.

`start()` — idempotent via a `started` flag: set `ready = true`, add class `done` to `boot`,
`readScroll()`, `seekAt = seekTo`.

`attach(src)` — idempotent via an `attached` flag. Bind listeners BEFORE setting src:
- `loadedmetadata` → `duration = clip.duration || 0; clip.pause(); readScroll(); seekAt = seekTo;`
  then `try { clip.currentTime = seekAt; } catch(e){}`
- `loadeddata` → `start`
- `canplaythrough` → `start`
- `error` → `start`
Then `clip.src = src; clip.load();` and `setTimeout(start, 12000);` so a stalled decode
never strands the page behind the preloader.

`preload()` — fetch the mp4 as a fully buffered blob first, because seeking inside a
buffered blob is near instant while range requests over the network are a slideshow:
- Create an `AbortController` if available.
- Set a 15000 ms `bail` timer: if not yet attached, abort the fetch, `setProgress(1)`,
  and `attach(VIDEO_URL)` to stream directly instead.
- `fetch(VIDEO_URL, {signal})`; throw if `!res.ok || !res.body`.
- Read `content-length` into `total`; pump `res.body.getReader()` recursively, pushing each
  chunk into an array and accumulating `got`. Per chunk call
  `setProgress(total ? got / total : Math.min(got / 11e6, 0.95))` — the 11e6 fallback is the
  approximate byte size used when the server sends no content-length.
- On `r.done` resolve `new Blob(chunks, { type:"video/mp4" })`.
- `.then(blob)` → `clearTimeout(bail); setProgress(1); attach(URL.createObjectURL(blob));`
- `.catch()` → `clearTimeout(bail); setProgress(1); attach(VIDEO_URL);`
  (covers CORS failure, abort, and offline).

--- iOS unlock ---
iOS will not paint a frame from a video that has never been played, so nudge it once on the
first interaction and pause immediately:
```
function unlock(){
  var p = clip.play();
  if (p && p.then) p.then(function(){ clip.pause(); }).catch(function(){});
  else clip.pause();
}
["touchstart","pointerdown","wheel","keydown"].forEach(function(ev){
  window.addEventListener(ev, unlock, { once:true, passive:true });
});
```

--- Wiring, in this order at the end of the IIFE ---
```
window.addEventListener("scroll", readScroll, { passive:true });
window.addEventListener("resize", readScroll);

readScroll();
paint();
preload();
requestAnimationFrame(frame);
```

============================================================
12. REQUIREMENTS TO HOLD TO
============================================================
- Exactly one file. No React, no GSAP, no Lenis, no ScrollTrigger, no Tailwind, no bundler.
- Nothing scrolls visually except the video scrub and the panel cross-fades — header,
  footer, video and panels are all `position:fixed`.
- Panels are driven imperatively from the rAF loop; do NOT use IntersectionObserver,
  CSS scroll-timeline, or CSS transitions on `.panel` opacity/transform.
- Keep the light, off-white editorial look: paper `#f2f0ec`, near-black ink `#0d0c0b`,
  tight negative letter-spacing on display type, grain over the whole stage.
- Mobile: touch targets stay ≥36px tall, the nav collapses to the single dark pill, the
  pill's white text is forced with `-webkit-text-fill-color` so it never inherits link
  colour, all safe-area insets are respected, and no horizontal overflow at 320px width.
- Include the short explanatory comments described above (all-intra keyframes, dead zones
  between cues, blob-vs-range-request reasoning, the iOS play/pause nudge).