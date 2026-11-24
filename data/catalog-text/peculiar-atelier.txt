Build a single standalone file, index.html, containing one full-screen hero section. Everything (HTML, CSS, JS) is inline in that one file. No frameworks, no build step, no libraries, no local assets. The only external resources are the Inter font from Google Fonts and one image loaded from this exact URL:

https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9212999e-7a4a-4f70-bc34-e4e1c4533b81.jpg

That URL is a square 1024x1024 JPEG (NOT a video): a purple holographic foil print with a chrome octopus and the words "STRANGE BY DESIGN". It is served with Access-Control-Allow-Origin: *, so it can be used as a WebGL texture. Do not download it, embed it, or replace it. There is no video anywhere on the page.

=== WHAT THE PAGE IS ===
A light grey studio-wall hero, exactly 100vh tall. On the left-centre hangs a square holographic cloth, pinned by its two top corners, simulated in real time. The visitor can grab the cloth anywhere with mouse or finger and drag it around in 3D; when released it falls back and settles. To the right of the cloth is a two-line heading. A nav bar sits on top.

=== HEAD ===
- <html lang="en">, charset utf-8, viewport width=device-width, initial-scale=1
- <title>Peculiar Atelier — Unusual by intent</title>
- meta description: "Peculiar Atelier. Unusual by intent. Tug the cloth, I dare you."
- preconnect to fonts.googleapis.com, fonts.gstatic.com (crossorigin) and https://d2ol7oe51mr4n9.cloudfront.net (crossorigin)
- Font: https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap

=== CSS TOKENS (on :root) ===
--paper: #e3e4e9
--paper-edge: #cfd1d9
--ink: #000000
--ink-soft: rgba(0,0,0,0.5)
--violet: #5b07fb
--violet-deep: #4a00d6
--white: #ffffff
--gutter: clamp(20px, 3.2vw, 46px)
--display: clamp(44px, min(7.65vw, 13.6vh), 168px)

Global: box-sizing border-box everywhere; body margin 0, background var(--paper), font-family "Inter", "Helvetica Neue", Arial, sans-serif; -webkit-font-smoothing antialiased; text-rendering optimizeLegibility.

=== MARKUP (in this order) ===
<section class="hero" id="hero" aria-label="Peculiar Atelier">
  1. <canvas class="hero__cloth" id="cloth" role="img" tabindex="-1" aria-label="A violet holographic cloth showing a chrome octopus beneath the words Strange by design. Grab it then tug it around.">
  2. <img class="hero__still" id="still" alt="" decoding="async" src="[the image URL above]">  (hidden fallback)
  3. <header class="nav">
       <a class="nav__logo" href="#hero">Peculiar Atelier</a>
       <div class="nav__actions">
         <button class="pill pill--menu" type="button" aria-haspopup="true" aria-expanded="false"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>More</button>
         <a class="pill pill--start" href="#start">Start a brief</a>
       </div>
     </header>
  4. <h1 class="hero__title"><span>Grab me</span><span class="soft">I dare you</span></h1>
</section>

=== LAYOUT AND STYLE ===
.hero: position relative; height 100vh then 100svh; min-height 480px; overflow hidden; isolation isolate; background: radial-gradient(120% 95% at 58% 38%, #e8e9ed 0%, var(--paper) 46%, var(--paper-edge) 100%).

.hero__cloth: position absolute; inset 0; width/height 100%; display block; z-index 0; touch-action pan-y; no tap highlight; outline none. Class "is-over" sets cursor grab; class "is-held" sets cursor grabbing. focus-visible: 2px solid violet outline, offset -6px.

.hero__still (fallback image): position absolute; left 40%; top 48.5%; width min(64vw, 84vh); aspect-ratio 1/1; object-fit cover; transform translate(-50%,-50%) rotate(5deg); box-shadow -18px 40px 70px rgba(20,20,40,0.22); display none. When .hero has class "no-cloth", show the still and hide the canvas.

.nav: position absolute, top 0, full width; z-index 2; flex, align centre, space-between; padding 18px var(--gutter) 0; pointer-events none on the bar, auto on its children.
.nav__logo: 19px, weight 400, letter-spacing -0.045em, line-height 36px, colour ink, no underline.
.nav__actions: flex, gap 12px.
.pill: inline-flex, centred, gap 14px, height 36px, padding 0 18px, no border, radius 999px, font-size 16px, weight 500, letter-spacing -0.045em, line-height 1, white text, cursor pointer; transition transform 0.25s cubic-bezier(0.2,0.8,0.2,1) and background-color 0.2s. Hover: translateY(-1px). Active: scale(0.98).
.pill--menu: background ink, padding-left 16px; hover background #1b1b1f.
.pill--start: background violet; hover violet-deep.
.burger: grid, gap 4px, width 24px; each <i> is a 1.5px-high white bar with 1px radius. On menu hover the first bar shifts translateX(-2px) and the last translateX(2px), 0.25s.
Focus-visible on logo and pills: 2px solid violet outline, offset 3px (ink colour on the violet pill).

.hero__title: position absolute; z-index 1; left 66.9%; top 48.4%; transform translateY(-50%); margin 0; font-size var(--display); weight 500; line-height 0.99; letter-spacing -0.06em; white-space nowrap; pointer-events none; user-select none. Each span is display block. The second span (.soft) uses var(--ink-soft).

Entrance animation: each heading span and the nav animate "rise" 0.9s cubic-bezier(0.2,0.8,0.2,1) both, from opacity 0 / translate 0 18px to opacity 1 / translate 0 0; second heading line delayed 0.08s. Disable these and the pill/burger transitions under prefers-reduced-motion: reduce.

=== RESPONSIVE ===
@media (max-width: 1099px), (max-aspect-ratio: 5/4):
  --display becomes clamp(44px, min(12.4vw, 11vh), 120px)
  .hero__title moves to left var(--gutter), top auto, bottom clamp(20px, 4vh, 44px), transform none
  .hero__still: left 50%, top 44%, width min(78vw, 60vh)
@media (max-width: 520px): hide .pill--start; logo font-size 18px.
The cloth repositions in JS (see "View" below). Must work down to 375px wide with no horizontal scroll.

=== THE CLOTH (WebGL 1, written from scratch, no libraries) ===
Get a "webgl" context with alpha true, antialias true, premultipliedAlpha true, powerPreference high-performance. If WebGL is missing, shaders fail, the image fails to load, or the context is lost, add class "no-cloth" to the hero.

Settings:
size 0.90 (cloth height as a share of hero height), aspect 1.12 (width/height), spread 0.98, pinRoll 5.5 degrees, flutter 0.35, damping 0.30, stiffness 0.60, crumple 0.55, grabRadius 0.12, carryRadius 0.20, gravity 2.6, tilt -10 degrees, turn -12 degrees, perspective 0.45, maxSpeed 12, steps 8.
Grid: 46 columns x 42 rows of points. CH = size, CW = size * aspect. Row 0 is the bottom edge, the last row is the top edge.

Camera: t = tilt, r = turn in radians. World-to-view rows:
R0 = (cos r, 0, sin r); R1 = (sin t * sin r, cos t, -sin t * cos r); R2 = (-cos t * sin r, sin t, cos t * cos r).
CAM = exp(ln(18) * (1 - perspective) + ln(1.7) * perspective).
Projection: q = R * p; scale = CAM / max(CAM - q.z, 0.001); screen = q.xy * scale * zoom. Screen units: 1.0 = hero height.
Clip position: x = 2 * (cx + screen.x / aspectRatio) - 1; y = 1 - 2 * (cy - screen.y); z = -q.z * 0.5; w = 1.

View (recomputed on resize, via ResizeObserver and window resize; canvas pixel size = hero size * min(devicePixelRatio, 2)):
- Wide layout (width >= 1100 and width/height >= 1.25): cx 0.402, cy 0.485, zoom = min(1, 0.58 * aspectRatio / (CW * 1.12)).
- Stacked layout (otherwise): cx 0.5; cy 0.41 if aspectRatio < 0.75 else 0.43; zoom = min(1, 0.92 * aspectRatio / (CW * 1.12), (0.60 if aspectRatio < 0.75 else 0.66) / CH).

Rest shape: each point's flat position is ((u - 0.5) * CW, (v - 0.5) * CH), plus a permanent crease height in z:
ridge(x) = sqrt(sin(x)^2 + 0.03) - 0.64
crease(u,v) = crumple * 0.045 * CH * [ ridge(2.7u + 2.9v + 0.7) + 0.8 * ridge(-2.6u + 3.3v + 2.1) + 0.5 * sin(4.9u - 1.4v + 2.2) + 0.55 * ridge(1.1u + 6.4v + 1.3) + 0.4 * ridge(8.3u + 3.9v + 0.2) + 0.3 * ridge(-5.7u + 9.1v + 1.6) ]

Pins: the top-left and top-right points are fixed. half = 0.5 * CW * spread, top = 0.5 * CH, roll = pinRoll in radians. Left pin at (-half * cos roll, top + half * sin roll, 0); right pin at (half * cos roll, top - half * sin roll, 0). So the left pin sits higher.

Links (distance constraints, rest length measured on the creased rest shape):
- neighbours right and up: stiffness 1
- both diagonals of each cell: stiffness 0.5
- two apart (right and up): stiffness bend = 0.02 + (0.60 - 0.02) * 0.60
- five apart (right and up): stiffness bend * 0.5
Tethers: no point may be further from either pin than 1.02 x its flat distance to that pin; clamp after each step.

Starting pose: x scaled by spread + (1 - spread) * (1 - v)^2, then the whole sheet rotated by the roll angle about the middle of the top edge so it already leans with the pins.

Each animation frame: dt = min(elapsed seconds, 1/30); run 8 sub-steps of h = dt / 8. Each sub-step:
1. Time T advances by h. damp = exp(-(0.15 + 5.85 * damping) * h). gust = 0.6 + 0.4 * sin(0.37T) * sin(0.23T + 1.0). wind = flutter * 2.4 * gust * (gravity / 2.6); wind is 0 under prefers-reduced-motion.
2. Verlet step for every free point: velocity = (pos - prev) * damp + accel * h^2, with speed capped at maxSpeed * h. accel = (wind * 0.25 * sin(3.3v + 1.1T + u), wind * 0.1 * s2 - gravity, wind * (0.45 * s1 + 0.35 * s2 + 0.3 * s3)), where s1 = sin(9.1u - 3.7v + 3.1T), s2 = sin(6.3u + 7.9v - 2.3T + 1.3), s3 = sin(2.9u + 1.7T + 0.8 * sin(0.5T)) * cos(2.3v - 0.9T).
3. One sweep over all links, moving both ends toward the rest length weighted by inverse mass (pinned and held points do not move). Alternate sweep direction every sub-step (forwards, then backwards).
4. Apply the two tethers to every free point.
Before the first frame, run 360 sub-steps of 1/240 s with damping temporarily set to 1, so the cloth appears already hanging, never as a flat sheet.

Grabbing:
- Convert the pointer to screen units: x = ((clientX - left) / width - cx) * aspectRatio / zoom; y = (cy - (clientY - top) / height) / zoom.
- On pointerdown (left button only for mouse), project every point; pick the point with the lowest score = distance - 0.08 * viewDepth among those within grabRadius / zoom. If none, do nothing.
- Remember that point's view depth and its offset from the pointer, so there is no jump.
- Carry weights: for every point, d = flat distance to the grabbed point / (carryRadius * CH); weight = (1 - d^2)^2 if d < 1, else 0; the grabbed point is 1; pins are 0.
- While held, each sub-step: target = pointer unprojected at the remembered depth plus offset, rotated back to world space, then clamped by the two tethers of the grabbed point. delta = target - grabbed point position. Points with weight >= 0.98 move by the full delta and are treated as fixed for that step; other points move by weight * delta without gaining that as velocity.
- Release on pointerup, pointercancel, or lostpointercapture. Use setPointerCapture.
- Mouse hover: toggle class "is-over" when a pick would succeed; add "is-held" while dragging.
- Touch: a non-passive touchstart calls preventDefault only when the finger is on the cloth, and touchmove only while dragging, so the page still scrolls everywhere else.

Rendering, per frame:
1. Compute smooth per-point normals from central differences (cross of the horizontal and vertical neighbours' differences). Upload positions and normals as dynamic buffers. Texture coordinates: u = column / 45, v = 1 - row / 41 (so the top row shows the top of the image). Indexed triangles, two per cell.
2. Shadow: draw the cloth as solid white into an off-screen texture 1/8 the canvas size. Then draw a full-screen triangle that samples it with a 7x7 Gaussian (weight exp(-d^2 / 6), tap spacing = texel * (0.9 + 1.5 * zoom * heroHeight / 724)), shifted by (-0.012 * zoom / aspectRatio, -0.045 * zoom), colour (0.07, 0.07, 0.16) at 0.30 strength, premultiplied, blended ONE / ONE_MINUS_SRC_ALPHA.
3. Cloth: depth test on (LEQUAL), no blending, no face culling.

Cloth fragment shader (precision highp):
- n = normalised view-space normal; back = n.z < 0, and if so flip n.
- V = normalize((0,0,CAM) - viewPosition); Rf = reflect(-V, n); KEY = normalize(-0.42, 0.45, 0.79); nv = clamp(dot(n,V)); nl = max(dot(n,KEY), 0).
- print = texture colour raised to 2.2 (until the image has loaded use flat colour (0.10, 0.02, 0.32)).
- shade = 0.46 + 0.68 * nl + 0.08 * n.y
- key = pow(max(dot(Rf,KEY),0), 26)
- box(dir, centre, halfSize, soft): a soft rectangular light seen in the reflection, with smoothstep(-0.5, 0.5) edges.
  strip = box(Rf, normalize(0.08, 0.93, 0.36), (1.1, 0.07), 0.22)
  side = box(Rf, normalize(0.86, 0.12, 0.50), (0.06, 0.85), 0.20)
  fill = box(Rf, KEY, (0.42, 0.30), 0.35)
- phase = 3.0 * (0.85 * dot(n.xy, (0.6, 0.8)) + 0.75 * (1 - nv) + 0.3 * dot(Rf.xy, (-0.8, 0.6))) + 0.4 * sin(5 * uv.x + 7 * uv.y)
- rainbow(p) = clamp((0.74, 0.58, 0.96) + (0.26, 0.24, 0.10) * cos(2*pi * (p + (0.0, 0.28, 0.62))))  — stays in violet, pink and blue
- holo = mix(white, rainbow(phase)^2.2, 0.8)
- lum = luminance of print; gloss = mix(1.0, 0.45, smoothstep(0.55, 0.9, lum))  (white lettering is less shiny)
- spec = holo * gloss * mix(white, print * 2.4 + 0.08, 0.65) * (0.34 * key + 0.11 * strip + 0.07 * side + 0.02 * fill)
- colour = print * shade + spec + holo * print * 0.6 * (1 - nv)^3
- back face: foil = (0.30, 0.22, 0.52) * (0.35 + 0.9 * nl) + spec * 1.3; colour = mix(foil, print * shade, 0.38)
- soft highlight roll-off above 0.8: colour = min(colour, 0.8) + 0.2 * (1 - exp(-max(colour - 0.8, 0) / 0.2))
- output pow(colour, 1/2.2), alpha 1.

Image loading: create an Image with crossOrigin = "anonymous", set src to the URL above. On load, upload with texImage2D (no Y flip), clamp to edge, linear magnification, mipmaps with LINEAR_MIPMAP_LINEAR (the image is power-of-two), anisotropic filtering up to 8x if available. Show the print at full strength immediately on load and draw a frame straight away — do NOT fade it in over frames. On error, add "no-cloth".

Loop: requestAnimationFrame, running only while the hero is on screen (IntersectionObserver) and the tab is visible; resume on visibilitychange.

=== QUALITY ===
Visible keyboard focus on all controls, no console errors, no horizontal scroll at any width, smooth at 60fps on a laptop. Result at 1280x724: cloth spans roughly from 11% to 65% of the width and 6% to 92% of the height, slightly rotated clockwise, bottom edge wider than the top, with a soft shadow below it; heading "Grab me" (black) over "I dare you" (50% black) on the right; "Peculiar Atelier" top-left; black "More" pill and violet "Start a brief" pill top-right.