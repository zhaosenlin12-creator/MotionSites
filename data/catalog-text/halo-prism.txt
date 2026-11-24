Build a single standalone index.html (no build step, no local assets, no video, no images) containing ONE full-viewport dark hero section for a fictional product called "halo" — "The P3 palette kit, crafted for screens." All visuals are generated in code: a real-time 3D glass prism (three.js) that refracts a white light beam into a soft rainbow, steered by the mouse. Recreate everything below exactly.

==================================================
1. HEAD, FONTS, TOKENS
==================================================
- <title>halo — The P3 palette kit</title>, meta description "halo is the P3 palette kit, crafted for screens.", meta theme-color #151517, viewport "width=device-width, initial-scale=1, viewport-fit=cover".
- Google Fonts (preconnect to fonts.googleapis.com and fonts.gstatic.com):
  https://fonts.googleapis.com/css2?family=Geist:wght@300..600&family=Newsreader:opsz,wght@6..72,300..500&display=swap
- CSS custom properties on :root:
  --bg:#151517; --bg-2:#1b1b1e; --ink:#ededed; --muted:#a1a1a1; --dim:#6e6e73;
  --line:rgba(255,255,255,.12); --chip:rgba(255,255,255,.04);
  --gutter:clamp(16px,2.6vw,28px);
  --sans:"Geist",ui-sans-serif,system-ui,sans-serif;
  --serif:"Newsreader","Times New Roman",serif;
- Reset: *{box-sizing:border-box;margin:0;padding:0}. body: background var(--bg), color var(--ink), font-family var(--sans), -webkit-font-smoothing antialiased, overflow-x hidden. Links inherit colour, no underline. Buttons: font inherit, no background, no border, pointer. :focus-visible { outline:2px solid #fff; outline-offset:3px; border-radius:6px }.

==================================================
2. MARKUP
==================================================
<section class="hero" aria-label="halo">
  <div class="stage" aria-hidden="true"><canvas id="gl"></canvas><canvas id="fx"></canvas></div>
  <header class="nav">
    left  (.brand): a link wrapping a 22×22 white filled triangle SVG (viewBox 0 0 24 24, path "M12 3 22 20H2z") · a "/" span (.brand-slash) · link "halo" (.brand-name) · <nav class="links"> with "Docs" and "Palettes"
    right (.right): button.search ["Search…" + <kbd>⌘ K</kbd>] · button.ask "Ask AI" · a.icon-btn with the 18px GitHub mark SVG (aria-label GitHub) · button.icon-btn.menu (two-line hamburger SVG: path "M4 8h16M4 16h16", stroke 1.6, round caps; aria-label "Open menu")
  </header>
  <div class="copy">
    <h1 class="wordmark rise">halo</h1>
    <p class="lede rise"><span>The P3 palette kit,</span><span>crafted for screens.</span></p>
    <div class="tabs rise" role="tablist" aria-label="Install method">
      Tokens · CSS · Figma · API   (buttons .tab role="tab", separated by <span class="dot">·</span>; Tokens is aria-selected="true")
      data-cmd values:
        Tokens → Install halo in my site, then npx halo
        CSS    → @import "halo/p3.css";
        Figma  → Sync halo swatches into your Figma file
        API    → GET api.halo.dev/v1/palette?space=p3
    </div>
    <div class="cmd rise">
      <span class="cmd-text" id="cmd">Install halo in my site, then npx halo</span>
      <button class="copy-btn" id="copy" aria-label="Copy command"> copy-icon SVG (.cp, 15px, two rounded squares) + check SVG (.ok, path "m5 12.5 4.5 4.5L19 7.5") </button>
    </div>
  </div>
</section>

==================================================
3. CSS
==================================================
.hero { position:relative; min-height:100vh; min-height:100svh; isolation:isolate; overflow:hidden; background:var(--bg) }
.stage { position:absolute; inset:0; z-index:-1; touch-action:pan-y }  .stage canvas { position:absolute; inset:0; width:100%; height:100%; display:block }  #fx { mix-blend-mode:screen }
.nav { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:14px var(--gutter); height:64px }
.brand { display:flex; align-items:center; gap:14px }  .brand-slash { color:var(--dim); font-size:22px; font-weight:300; transform:translateY(-1px) }
.brand-name { font-family:var(--serif); font-size:24px; font-weight:400; letter-spacing:-.01em; line-height:1 }
.links { display:flex; gap:20px; margin-left:12px }  .links a { font-size:14px; color:var(--muted); transition:color .2s }  hover → var(--ink)
.right { display:flex; align-items:center; gap:8px }
.search { display:flex; align-items:center; justify-content:space-between; gap:28px; height:36px; padding:0 6px 0 12px; min-width:172px; border:1px solid var(--line); border-radius:8px; background:var(--chip); font-size:14px; color:var(--muted) } hover: border rgba(255,255,255,.22), colour ink
kbd { font-family:var(--sans); font-size:11px; color:var(--muted); border:1px solid var(--line); border-radius:5px; padding:2px 5px; background:rgba(255,255,255,.03) }
.ask { height:36px; padding:0 12px; border:1px solid var(--line); border-radius:8px; font-size:14px; font-weight:500; background:var(--chip) } hover: background rgba(255,255,255,.08), border rgba(255,255,255,.22)
.icon-btn { 36×36; display:grid; place-items:center; border-radius:8px } hover background rgba(255,255,255,.06).  .menu { display:none }
.copy { position:relative; z-index:1; min-height:calc(100svh - 64px); display:flex; flex-direction:column; justify-content:center; padding:0 var(--gutter) 64px; max-width:560px; pointer-events:none }  .copy > * { pointer-events:auto }
.wordmark { font-family:var(--serif); font-weight:400; font-size:clamp(72px,8.6vw,124px); line-height:.9; letter-spacing:-.035em; font-variation-settings:"opsz" 72; margin-bottom:clamp(14px,1.8vw,22px) }
.lede { font-size:clamp(28px,3.05vw,44px); line-height:1.2; font-weight:400; letter-spacing:-.025em; margin-bottom:clamp(24px,2.6vw,36px) }  .lede span { display:block }
.tabs { display:flex; align-items:center; gap:8px; font-size:15px; margin-bottom:14px }  .tab { color:var(--dim); padding:2px 0 } hover var(--muted); [aria-selected=true] var(--ink)  .dot { color:var(--dim); font-size:11px }
.cmd { position:relative; display:flex; align-items:center; justify-content:space-between; gap:12px; max-width:440px; padding-top:14px; font-size:15px; line-height:1.5 }
.cmd::before { 1px hairline across the top: linear-gradient(90deg, rgba(255,255,255,.28), rgba(255,255,255,.08) 70%, transparent) }
.cmd-text { transition:opacity .18s, transform .18s }  .cmd-text.swap { opacity:0; transform:translateY(3px) }
.copy-btn { 30×30; border-radius:7px; color:var(--dim) } hover: ink + background rgba(255,255,255,.06). .ok hidden until .done.
Load-in: .rise { opacity:0; transform:translateY(12px); animation:rise .9s cubic-bezier(.2,.7,.2,1) forwards } with delays .08s/.16s/.24s on children 2–4; @keyframes rise { to { opacity:1; transform:none } }.  .stage { opacity:0; animation:fade 1.6s .2s ease forwards }.
Responsive:
  ≤960px: .search { min-width:0; gap:14px }
  ≤820px: hide .links, .search, .ask; show .menu; .copy { justify-content:flex-start; min-height:0; padding-top:clamp(28px,7svh,64px); padding-bottom:0; max-width:100% }; .hero { min-height:max(100svh,720px) }
  ≤420px: .tabs font 14px gap 6px; .cmd font 14px
  prefers-reduced-motion: no rise/fade animations (render final state).
No horizontal scroll at 375px.

==================================================
4. SMALL SCRIPT (classic <script>)
==================================================
Tab click → set aria-selected, add .swap to #cmd, after 160ms set its text to the tab's data-cmd and remove .swap. Copy button → navigator.clipboard.writeText(cmd text) (try/catch), add .done for 1400ms.

==================================================
5. PRISM + LIGHT ENGINE (<script type="module">)
==================================================
Import map: "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/". Add a header comment crediting the glass as ported from vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.), apps/docs/app/[lang]/(home)/components/prism-background.

5a. Layout (in CSS px, recomputed on resize, debounced 60ms, and after document.fonts.ready)
- W,H = stage size. dpr = min(devicePixelRatio,2). mobile = W < 820. Light canvases use dpr (mobile: min(dpr,1.5)).
- Desktop: side S = min(W*0.36, H*0.62), centroid at (0.66W, 0.53H).
- Mobile: S = min(W*0.72, H*0.40, 400); centroid x = W/2, y = max(copyBottom+30 + S*0.62, (copyBottom+30+H)/2).
- 2D "light plane" triangle (y down): top (cx, cy−R), right (cx+S/2, cy+R/2), left (cx−S/2, cy+R/2), R = S/√3. Edges: 0 = right face (top→right), 1 = base, 2 = left face. Outward edge normals.

5b. Optics (2D ray tracing on the plane through the middle of the glass)
- Dispersion (Cauchy): n(λ) = 1.2 + 0.1/λ² (λ in µm). 72 wavelengths from 410 to 695 nm.
- Colour per λ via a piecewise visible-spectrum approximation (violet/blue <440, blue→cyan to 490, cyan→green to 510, green→yellow to 580, yellow→red to 645, red after). Store a "vivid" RGB for fills, and a white-balanced RGB+weight (sum of all wavelengths = white) for core lines.
- Per wavelength: trace from the lamp; at every face apply vector Snell refraction; unpolarised Fresnel split (rs,rp averaged); total internal reflection when Snell has no solution. Recurse up to depth 7; continue transmitted rays if energy > 0.08, reflected if > 0.12. Rays leaving the prism go 1.5×diagonal far. Group segments of all wavelengths by their path key (sequence of T/R + face) so neighbouring wavelengths can be filled into a continuous band.
- Lamp (vgpu lampForIncidence): always from the RIGHT, aimed at a point on the right face. Incidence angle from pointer height y∈[0,1]: piecewise −35° (top) → 60° (middle) → 75° (bottom). Direction = inward normal of the right face rotated by +incidence (y-down space). Entry point = lerp along right face from 0.08 to 0.92 by pointer x. Source = entry − dir × far.

5c. Drawing the light (offscreen 2D canvas, additive 'lighter')
- Incoming beam: white stroke 12px @ .3 alpha + 4.5px @ 1 (×0.8 on mobile), round caps.
- 70 dust motes drifting along the incoming beam (spread wider away from the prism), radius .5–1.6, twinkling alpha .3–1 × .75.
- For each path group: per wavelength a white-balanced core line (alpha = weight × energy × 2.2, width 4 inside / 3.4 outside); between neighbouring wavelengths fill a quad with the vivid colour (alpha energy × .5 inside, × .78 outside). Outgoing quads use a linear gradient alpha 1 → .75 (30%) → .25 (70%) → 0.
- Edge glints: where the beam crosses a face, stroke that whole face with a radial white gradient (radius 0.2·S) 2px wide, plus a 2.6px white dot.
- Soft bloom composite into #fx: drawImage the offscreen canvas three times with ctx.filter blur(34px)@.6, blur(12px)@.9, blur(3.2px)@1 — no unblurred pass (everything soft). If canvas filters are unsupported, fake the blur by drawing through 1/16, 1/6 and 1/2 size buffers and scaling up.
- All plane points are mapped to the screen through the 3D camera each frame (so the light gets the same subtle parallax as the glass).

5d. The 3D glass (three.js 0.160, WebGL2 required; otherwise hide nothing and fall back to the 2D #fx canvas with a thin triangle outline)
- Renderer: antialias, autoClear false, outputColorSpace Linear, NoToneMapping (shaders encode sRGB themselves). Hide #fx; use it as a CanvasTexture (needsUpdate every frame).
- Constants (vgpu, side 0.57 units): depth = S × 0.3/0.57, fillet radius = S × 0.008/0.57 on ALL nine edges, 4 corner segments, 4 bevel segments, 16 edge segments. Port vgpu's prismMeshData: rounded-triangle contour (tangent arcs at corners), quarter-round rings (theta stops at π/2−0.06) from back cap to front cap, then front/back cap fans. Interleaved position+normal, Uint16 indices, apex up, centred at origin, z ∈ [−depth/2, +depth/2].
- Five ideal planes (3 side faces + front + back) as (outward normal, offset) uniforms.
- Camera: PerspectiveCamera fov 48°, distance D = (H/2)/tan(24°) so z=0 maps 1:1 to CSS px; it orbits on a sphere around the prism by up to ±3.5° yaw/pitch from the pointer and always looks at the prism; camera.setViewOffset(W,H, W/2−cx, H/2−cy, W,H) keeps the prism at its layout position.
- Studio environment (analytic, in the shader — vgpu environment.wgsl): near-black room with darker back wall (−z) and slightly lighter floor; + back-left wall panel dir(−0.82,0.08,0.57) size(1.35,1.1) feather .22 colour(.82,.84,.88) ×0.011; + soft fill dir(0,−0.707,0.707) size(.38,.62) feather .18 colour(1,.97,.91) ×0.22; + cool right key dir(0.612,0.354,0.707) size(.5,.16) feather .035 colour(.76,.88,1) ×20. Then c/(1+c), pow 1/2.2, sRGB→linear, × exposure 2.3.
- Glass params (dark theme): IOR 1.645, F0 = ((ior−1)/(ior+1))², reflectionStrength 2.14, Beer–Lambert absorption (1,1,0.54) per 0.57-unit side (scale by 0.57/S per px), Schlick Fresnel.
- Render order each frame:
  1. Into a HalfFloat render target: full-screen quad = page bg #151517 screen-blended with the light canvas (1−(1−bg)(1−rgb·a)), stored linear.
  2. Back faces (BackSide, premultiplied blend ONE / ONE_MINUS_SRC_ALPHA) — vgpu glass-back.wgsl: refract camera ray glass→air at the inward normal; on TIR reflect and continue to the next ideal plane (exclude the plane just left), up to 3 bounces. Also follow the inner-face reflection out of the glass, sample the studio, × (1−Fresnel) at its exit. Output (env × reflection × weight, weight), weight = Fresnel if escaped else 1.
  3. To screen: copy the render target (linear→sRGB).
  4. Front faces — vgpu glass.wgsl: reflect view ray → studio; refract into glass (1/ior), march to the nearest ideal plane, project that exit point with a uViewProj uniform to UV, sample the render target, × exp(−absorption·distance). colour = transmitted·(1−F) + reflected·F + panel highlight (smoothstep(.5,.82, luminance(env)) × clamp(reflection·.4,0,.7) × (.65+.35·(1−facing)^1.5)). Soft shoulder above 0.8 instead of ACES, then linear→sRGB.
  (GLSL: no ternary on structs; projectionMatrix isn't available in fragment shaders — pass a uViewProj uniform.)

5e. Interaction (vgpu interaction.ts)
- Normalised pointer over the stage: height → incidence (aim[0]), width → entry point (aim[1]); camera orbit target = (x·2−1, y·2−1). Ease per 60Hz frame: lamp 0.12, camera 0.08 (frame-rate independent). Pointer leaving the window → orbit back to 0.
- Mobile (and an idle desktop after 6s without movement): a virtual pointer circles the centre, radius 0.34, period 18s (no camera orbit on mobile). Respect prefers-reduced-motion (no automatic motion).
- Listen to pointermove (primary only), pointerdown and touchmove (passive).

Result: a dark-gray page, the serif "halo" wordmark and Geist headline on the left, and on the right a smoky, slightly rounded 3D glass prism. A soft white beam with dust comes in from the right, refracts through the glass and fans out to the left as a wide, smooth, glowing rainbow. Moving the mouse swings the light and tilts the view.