Build ONE standalone index.html file (inline <style> and <script>, no frameworks, no build step) for a full-screen hero section called "Pink Rider". It must match every spec below exactly and work on mobile.

=====================================================================
1. ASSETS (use these URLs directly; do not download or replace them)
=====================================================================
FRONT image (Korean woman in her early 20s, white ribbed top, transparent background PNG, 1536x2048, 3:4):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261103_152350_4fd91a2b-94c2-4b86-834f-3b7f9a716d5b.png

BACK image (same woman, same pose and framing, glossy baby-pink motorcycle helmet with iridescent pink visor plus a baby-pink leather racing jacket with white stripes and heart patches, transparent background PNG, 1792x2400):
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261103_152354_98c21034-6558-4210-a810-8232cf9d2557.png

Put <link rel="preload" as="image"> for both URLs in <head>.

=====================================================================
2. HEAD / FONT
=====================================================================
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Mina Hwang-Seo — Pink Rider</title>
<meta name="description" content="Hover to reveal the pink rider.">
Google Fonts, with preconnect to fonts.googleapis.com and fonts.gstatic.com (crossorigin):
https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap
Body font stack: "Inter Tight", system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased.

=====================================================================
3. DESIGN TOKENS (:root)
=====================================================================
--bg: #fdeef3;        (very light baby pink)
--bg-2: #fbe3eb;
--ink: #141114;
--muted: #7a6870;
--ghost: #d6c3ca;
--accent: #ff7fab;    (pink)
--accent-ink: #ffffff;
--gutter: clamp(16px, 2.4vw, 32px);
Global reset: * { box-sizing:border-box; margin:0; padding:0 }  html,body { height:100% }
body { background: var(--bg); color: var(--ink); overflow-x: hidden; }

=====================================================================
4. HTML STRUCTURE (in this order)
=====================================================================
<header class="nav">
  <a class="brand" href="#">
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>
    </span>
    Mina Hwang-Seo
  </a>
  <nav class="links">
    <a href="#">Rides</a> <a href="#">Lookbooks</a> <a href="#">Journal</a>
    <a class="cta" href="#">Say hi! <span aria-hidden="true">↗</span></a>
  </nav>
</header>

<section class="hero" id="hero" aria-label="Hover to reveal the pink rider">
  <div class="marquees" aria-hidden="true">
    <div class="row ghost"> 4x <span>Dream Ride Sparkle</span> </div>
    <div class="row solid"> 4x <span>Ride Pretty Stay Bolder</span> </div>
  </div>
  <div class="figure" id="figure">
    <img id="front" alt="Young woman in a white ribbed top" src="FRONT_URL">
    <canvas id="reveal" aria-hidden="true"></canvas>
  </div>
  <p class="hint"><i></i><span id="hintText">Move your cursor to suit up</span></p>
  <span class="tag">Pink Rider · SS27</span>
</section>
<div class="cursor" id="cursor"></div>   (sibling right after the section)

=====================================================================
5. CSS (exact)
=====================================================================
NAV
.nav { position:fixed; inset:0 0 auto 0; z-index:20; display:flex; align-items:center; justify-content:space-between; padding:var(--gutter); }
.brand { display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--ink); font-weight:500; font-size:15px; letter-spacing:-0.01em; }
.brand-mark { width:34px; height:34px; border-radius:9px; background:var(--accent); display:grid; place-items:center; }   (NO box-shadow)
.brand-mark svg { width:18px; height:18px; }
.links { display:flex; align-items:center; gap:clamp(14px, 2vw, 28px); }
.links a { color:var(--muted); text-decoration:none; font-size:14px; transition:color .2s; }
.links a:hover { color:var(--ink); }
.links .cta { background:var(--accent); color:var(--accent-ink); font-weight:500; padding:10px 18px; border-radius:10px; display:inline-flex; gap:6px; align-items:center; transition:transform .2s, background .2s; }   (NO box-shadow)
.links .cta:hover { color:#fff; background:#ff6a9c; transform:translateY(-1px); }

HERO
.hero { position:relative; height:100vh; height:100svh; min-height:560px; overflow:hidden; touch-action:pan-y; cursor:none;
  background: radial-gradient(60% 55% at 50% 45%, #fff6f9 0%, rgba(255,246,249,0) 70%), linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%); }

MARQUEES (sit BEHIND the figure)
.marquees { position:absolute; left:0; right:0; top:50%; transform:translateY(-58%); z-index:1; pointer-events:none; user-select:none; display:flex; flex-direction:column; gap:clamp(4px, 1.2vw, 18px); }
.row { display:flex; width:max-content; white-space:nowrap; will-change:transform; }
.row span { font-size:clamp(54px, 9.6vw, 168px); line-height:1; letter-spacing:-0.035em; text-transform:uppercase; padding-right:0.3em; }
.row.ghost span { color:var(--ghost); font-weight:400; }
.row.solid span { color:var(--ink); font-weight:500; }
.row.ghost { animation: slideL 38s linear infinite; }
.row.solid { animation: slideR 32s linear infinite; }
@keyframes slideL { from { transform:translateX(0) } to { transform:translateX(-50%) } }
@keyframes slideR { from { transform:translateX(-50%) } to { transform:translateX(0) } }

FIGURE
.figure { position:absolute; left:50%; bottom:0; z-index:2; height:min(94svh, 133vw); aspect-ratio:3/4; transform:translateX(-50%); pointer-events:none; }
.figure img, .figure canvas { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center bottom; display:block; }
.figure img { opacity:0; }   (the img only loads the image and holds alt text; the canvas paints both layers)
.figure canvas { opacity:0; transition:opacity .8s ease; }
.figure canvas.ready { opacity:1; }

CUSTOM CURSOR (plain solid dot, no glow or ring)
.cursor { position:fixed; left:0; top:0; z-index:30; pointer-events:none; width:14px; height:14px; margin:-7px 0 0 -7px; border-radius:50%; background:var(--accent); opacity:0; transition:opacity .25s, width .2s, height .2s; }
.hero:hover ~ .cursor, .cursor.on { opacity:1; }

HINT + TAG
.hint { position:absolute; left:var(--gutter); bottom:var(--gutter); z-index:3; font-size:13px; color:var(--muted); display:flex; align-items:center; gap:8px; }
.hint i { width:8px; height:8px; border-radius:50%; background:var(--accent); }   (plain dot, NO pulse animation)
.tag { position:absolute; right:var(--gutter); bottom:var(--gutter); z-index:3; font-size:12px; color:var(--ink); background:rgba(255,255,255,.7); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); padding:8px 12px; border-radius:999px; }

RESPONSIVE
@media (max-width:720px) {
  .links a:not(.cta) { display:none; }
  .links .cta { padding:9px 14px; font-size:13px; }
  .brand { font-size:14px; }
  .brand-mark { width:30px; height:30px; border-radius:8px; }
  .hero { cursor:auto; }
  .marquees { transform:translateY(-62%); }
  .figure { height:auto; width:min(160vw, 64svh); }
  .tag { display:none; }
  .hint { left:50%; transform:translateX(-50%); bottom:18px; background:rgba(255,255,255,.75); padding:8px 12px; border-radius:999px; color:var(--ink); white-space:nowrap; }
}
@media (hover:none) { .cursor { display:none; } }
@media (prefers-reduced-motion:reduce) { .row { animation-duration:120s; } }

=====================================================================
6. HOVER-REVEAL EFFECT (JavaScript, wrapped in an IIFE)
=====================================================================
Concept: a paint-brush trail follows the pointer. Inside the trail, the FRONT image is fully erased and the BACK (pink biker) image shows instead, so the front never shows through transparent parts of the back. Each brush stamp is an organic blob made of several overlapping circles with hard edges, so the edges look torn. The stamp holds for a moment, then shrinks and disappears.

Setup:
- Read #hero, #figure, #front (img), #reveal (canvas), #cursor.
- Touch detection must be LIVE: const touchMQ = matchMedia("(hover: none), (pointer: coarse)"); let coarse; syncTouch() sets coarse = touchMQ.matches and sets #hintText to "Drag to suit up" (touch) or "Move your cursor to suit up" (mouse). Call it once, then on touchMQ "change".
- Two offscreen canvases: `mask` (the brush trail) and `buf` (the back image clipped to the mask).
- back = new Image(), src = BACK_URL; set backReady=true on load.
- frontReady = true when #front has loaded (check front.complete && front.naturalWidth, otherwise listen for "load"); then add class "ready" to the canvas.
- resize(): r = figure.getBoundingClientRect(); dpr = min(devicePixelRatio, 2); W=r.width; H=r.height; set canvas/mask/buf width = round(W*dpr) and height = round(H*dpr). Call it on load and on window resize.

Stamps:
- LIFE = 1100 ms.
- addStamp(x, y, now): base = max(W, 260) * (coarse ? 0.15 : 0.12); n = 3 + random 0..2 lobes; each lobe gets a random angle, offset distance random*base*0.45, and radius base*(0.45 + random*0.55). Push { x, y, t: now, lobes }.
- pointerTo(clientX, clientY, now): convert to figure-local coordinates. If a previous point exists, interpolate between it and the new point with step = max(W,260)*0.04, capped at 40 stamps, so fast moves leave a continuous stroke. Then add a stamp at the point, set last = {x, y} and lastMove = now.
- Events on #hero: "pointermove" calls pointerTo, moves #cursor with transform translate(clientX px, clientY px) and adds class "on". "pointerleave" sets last=null and removes "on". "pointerdown" calls pointerTo.
- Auto-wander (only when coarse, i.e. touch devices): if there has been no pointer input for 2500 ms, autoT += 0.016; x = W*(0.5 + sin(autoT*1.3)*0.28); y = H*(0.32 + sin(autoT*0.9 + 1)*0.22). Add a stamp whenever the point has moved more than W*0.02 from the last one.

Render loop (requestAnimationFrame):
1. If coarse, call autoWander. Remove stamps older than LIFE.
2. Mask: mctx.setTransform(dpr,0,0,dpr,0,0), clear it, fill black. For each stamp: k = 1 - age/LIFE; scale = k < 0.75 ? k/0.75 : 1. Draw each lobe as a filled circle at (s.x + dx*scale, s.y + dy*scale) with radius r * scale^0.8.
3. Main canvas: reset the transform, use source-over, clear. If frontReady, drawCover(ctx, front).
4. If any stamps exist:
   a. ctx "destination-out": draw mask (erases the front inside the trail). Switch back to source-over.
   b. If backReady: clear buf, draw mask into buf, set bctx "source-in", drawCover(bctx, back), then ctx.drawImage(buf, 0, 0).
- drawCover(c, img): cover-fit the image into canvas.width x canvas.height, centred horizontally and anchored to the BOTTOM, so both layers line up exactly.

=====================================================================
7. RESULT CHECKLIST
=====================================================================
- Baby-pink light theme. The two uppercase marquee rows move in opposite directions BEHIND the cut-out girl: light grey "DREAM RIDE SPARKLE" moving left, bold black "RIDE PRETTY STAY BOLDER" moving right.
- Moving the mouse paints a torn brush trail that swaps her into the pink helmet and jacket. The trail fades after about 1.1 s.
- Inside the trail, the front image is never visible.
- No drop shadows on the logo or the button, and no glowing or pulsing circles: all dots are flat solid pink.
- On mobile: the nav shows only the logo and "Say hi!", the figure is enlarged, the hint becomes a centred pill reading "Drag to suit up", and the reveal wanders on its own when the screen is idle. No horizontal scroll.