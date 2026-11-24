Build a single standalone index.html (inline <style> and one inline <script type="module">, no build step, no local assets) containing one 100vh hero section: an interactive 3D bird field guide called "Feather Atlas". Two birds only: Hoopoe and Kingfisher. Do not download any asset; load everything from the URLs given below.

=== ASSETS (use exactly these URLs) ===
CDN base: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/
Kingfisher image (transparent PNG): {CDN}hf_20261004_073256_f9e3e60d-acdc-4925-b393-c4ce14b28711.png
Kingfisher 3D model (GLB):          {CDN}hf_20261004_073345_12721630-c589-442f-8884-e4a445cd8980.glb
Hoopoe image (transparent PNG):     {CDN}hf_20261004_073256_21ed095c-d038-4ab5-87b7-b44e527ec449.png
Hoopoe 3D model (GLB):              {CDN}hf_20261004_073347_06b339a7-70bc-4ecd-9e72-1a4143264da9.glb
There is no video on the page.

=== LIBRARIES ===
Import map: "three" -> https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js and "three/addons/" -> https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/
Use GLTFLoader, DRACOLoader (decoder path https://www.gstatic.com/draco/versioned/decoders/1.5.7/), MeshoptDecoder and RoomEnvironment from three/addons. Do not use OrbitControls.

=== FONTS (Google Fonts) ===
Display: "Newsreader" (opsz 6..72; weights 400, 500; italic 400). Body/UI: "Nunito Sans" (opsz 6..12; weights 400, 600, 700).
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap
Fallbacks: serif -> "Iowan Old Style", Georgia, serif; sans -> "Segoe UI", system-ui, sans-serif.

=== COLOR TOKENS (CSS custom properties on :root) ===
Day:  --bg #f6f1e7; --panel #fbf8f1; --line #e7e0d1; --ink #1b1a17; --muted #6d685d; --sage #4d5a3d; --sage-ink #ffffff; --sage-tint #e9ebdc; --chip #efeadd; --shadow 60,48,28 (rgb triplet)
Dusk (on .hero[data-light="dusk"]): --bg #14170f; --panel #1b1f15; --line #2d3324; --ink #f2ecdf; --muted #a8a392; --sage #a9b98a; --sage-ink #14170f; --sage-tint #283020; --chip #262b1d; --shadow 0,0,0
Easing: --ease cubic-bezier(.22,.8,.24,1). Body: overflow hidden, antialiased, background var(--bg). Focus ring: 2px solid var(--sage), offset 2px.
Icons: all inline SVG line icons via <symbol>/<use>, 24x24 viewBox, fill none, stroke currentColor, stroke-width 1.5, round caps and joins, default 20px. No icon library, no emoji.

=== DESKTOP LAYOUT (>1100px) ===
.hero: position relative; height 100vh then 100dvh; overflow hidden; CSS grid with columns 196px | minmax(0,1fr) | clamp(300px,27vw,356px); background and color transition .6s.
A single <canvas id="gl"> is absolutely positioned over the whole hero (inset 0, z-index 5, pointer-events none) so the bird is never clipped by any panel and renders on top of tabs, sidebar and detail panel when zoomed or rotated.

1) Left sidebar (aside): flex column, padding 22px 12px 18px 24px, border-right 1px var(--line).
 - Brand "Feather Atlas": Newsreader 26px, letter-spacing -.01em.
 - Nav list (margin 20px 0 12px, gap 2px). Each item is a button: flex, gap 16px, padding 7px 10px, radius 10px, 14.5px text, hover background var(--chip). Sub-label in <small> 12px muted, margin-top 3px. Items in order: Home (house icon); Featured (star icon, aria-current="page", background var(--sage-tint)); Songbirds "34 species"; Kingfishers "8 species"; Owls "11 species" (owl icon); Hummingbirds "15 species"; Raptors "12 species"; Waders "9 species" (wading-bird icon). Other items use simple line bird icons.
 - Featured card pinned to the bottom (margin-top auto): background var(--sage-tint), radius 10px, padding 14px 14px 16px. Eyebrow "FEATURED SPECIES" (9.5px, letter-spacing .22em, uppercase, muted, weight 600); the active bird's PNG (92x76, object-fit contain, centered); title in Newsreader 18px; text 12px muted line-height 1.4; underlined link "Learn more" with a small right arrow icon.

2) Centre column (section.main): grid rows auto / minmax(0,1fr); padding 48px 18px 14px 26px.
 - Tabs row (role="tablist", flex, gap 10px), two tab buttons in order Hoopoe, Kingfisher. Each tab: 130px wide, padding 8px 8px 11px, grid centered, background var(--panel), 1px border var(--line), radius 8px, hover translateY(-2px). Contents: bird PNG 58x52 contain; name in Newsreader 15.5px; Latin name in Newsreader italic 12.5px muted. Selected tab: background var(--sage-tint), border color-mix(in srgb, var(--sage) 45%, transparent). Arrow Left/Right move between tabs.
 - Stage (div#stage, tabindex 0): position relative, fills the remaining height, touch-action none, cursor grab (grabbing while dragging), user-select none. Children:
   a) Ground shadow: absolute, left 50%, bottom 15%, width min(62%,460px), height 44px, radial-gradient(closest-side, rgba(var(--shadow),.22), transparent). While a tab switch is in progress it fades to opacity 0 and scaleX(.4).
   b) Loader: centered 30px ring (1.5px border var(--line), top color var(--sage), 1s linear spin) with text "Preparing the specimen…" 12.5px muted; fades in/out.
   c) Fallback: if a GLB fails to load, show that bird's PNG centered in the stage.
   d) Hint, top-right: hand icon + "Drag to turn · scroll to zoom", 11.5px muted; fades out permanently after the first interaction.
   e) Icon rail, absolute left 0, vertically centered, z-index 6, grid gap 9px: four 38px circular buttons (background var(--panel), 1px border var(--line), 17px icon, hover border sage, active scale .92; "on" state = background var(--sage), icon var(--sage-ink)). Order: Zoom in (magnifier with plus; "on" whenever zoom >= 1), Zoom out (plain magnifier; "on" when zoom < 1), Expand (four corner brackets), Light (sun).
   f) Turn pill, absolute bottom 46px, centered, z-index 6: pill with background var(--panel), 1px border, radius 999px, padding 3px 6px, 13px text; three buttons: counter-clockwise arrow, the label "360°", clockwise arrow.
   g) Caption, absolute bottom 0, centered: Newsreader italic, clamp(16px,1.55vw,20px), shows the active bird's caption.

3) Right column (section.info): grid rows auto / minmax(0,1fr), gap 16px, padding 13px 26px 14px 0.
 - Top row: search field (flex 1, height 32px, background var(--panel), 1px border, radius 8px, 15px magnifier icon, placeholder "Search species, habitats, or regions…" at 11.5px), bell icon button (32px), account button showing a 24px ink-filled circle with a user icon.
 - Detail card: background var(--panel), 1px border var(--line), radius 6px, padding 22px 20px 16px, overflow-y auto (thin scrollbar). Inside, an <article aria-live="polite"> as a flex column containing in order:
   eyebrow with the family name (uppercase, same eyebrow style);
   h1 bird name: Newsreader 500, clamp(40px,4.2vw,54px), line-height 1, letter-spacing -.025em, margin-top 8px;
   three tag pills (11.5px, padding 6px 13px, radius 999px, background var(--chip)), margin-top 16px;
   description paragraph 13.5px, line-height 1.55, text-wrap pretty;
   h2 "Key Traits": Newsreader 400, 21px, with a 1px top border and 14px padding-top;
   four trait rows, each a grid 22px | 88px | 1fr, gap 16px, 13px text: icon, muted label, value;
   h2 "Habitat" (same style) and a row with a reed icon + habitat sentence;
   "Close-up Detail" button pinned to the bottom (margin-top auto): grid 76px | 1fr | 18px, gap 14px, padding 10px, 1px border, radius 8px; a 76px circular "lens" showing the bird PNG as background at background-size 520% with a per-bird background-position; title "Close-up Detail" in Newsreader 18px; 11.5px muted description; chevron-right icon. Hover/pressed: border sage, background sage-tint, chevron rotates 180deg when pressed.

=== BIRD DATA ===
Hoopoe — Latin: Upupa epops — family: UPUPIDAE — tags: Ground forager, Crested, Migrant
 Description: "Unmistakable in cinnamon, black and white, the hoopoe walks open ground probing for grubs with its long curved bill. It lifts its crest into a fan when it lands or takes fright, and flies on broad wings with a loose, butterfly-like beat."
 Traits: Length 25–29 cm (ruler icon); Wingspan 44–48 cm (wing icon); Diet "Insects, larvae and grubs" (fish icon); Range "Europe, Asia and Africa" (globe icon)
 Habitat: "Orchards, vineyards and dry grassland."
 Caption: "A crown raised, and the orchard takes notice."
 Close-up text: "Every crest feather ends in a black tip, so the raised fan reads like a row of signal flags." Lens position: 62% 22%
 Featured card: title "A crown of cinnamon." text "Bold bars on broad wings. A call you hear before you see it."
Kingfisher (selected by default) — Latin: Alcedo atthis — family: ALCEDINIDAE — tags: River bird, Diver, Iridescent
 Description: "A small, spectacular bird of rivers and lakes, the kingfisher is renowned for its dazzling plumage and astonishing hunting dives. A master of stealth and speed, it links healthy waterways with extraordinary beauty."
 Traits: Length 16–17 cm (ruler); Dive speed "Up to 40 km/h" (gauge icon); Diet "Small fish and insects" (fish); Range "Europe and Asia" (globe)
 Habitat: "Slow rivers, streams and lakes."
 Caption: "Blink, and the river keeps its secret."
 Close-up text: "An intricate mosaic of structure and colour gives the kingfisher its unmistakable sheen." Lens position: 24% 30%
 Featured card: title "A flash of river blue." text "Extraordinary colours. A remarkable life by the water."

=== 3D SCENE ===
WebGLRenderer on the full-hero canvas: alpha true, antialias true, pixel ratio min(devicePixelRatio, 2), sRGB output, NeutralToneMapping, exposure 1.05. Environment: PMREM of RoomEnvironment (blur 0.04), environmentIntensity 0.95. PerspectiveCamera FOV 26, looking down -Z at the origin. Key DirectionalLight color #fff4e2 intensity 1.6 at (2.5, 4, 5); rim DirectionalLight #bfd8ff intensity 0.5 at (-4, 2, -3).
Each bird has a rig: pivot Group (slide, scale, idle sway) > spin Group (user rotation quaternion) > holder Group > GLB scene. On load: compute the bounding sphere, re-centre the model on the sphere centre, scale the holder by 1/radius so every bird has radius 1; set max anisotropy on base-color maps; disable frustum culling. Home orientation for both birds: Euler order YXZ, yaw 0.75 rad, pitch 0.12 rad (three-quarter view, bill pointing right).
Load the active bird first, then preload the other in the background.
Framing: measure the hero and the stage with ResizeObserver. Target centre = stage centre horizontally, 44% of stage height vertically. Target radius in pixels px = min(stageWidth*0.5, stageHeight*0.6) * 1.16. Each frame set camera.position.z = heroHeight / (2 * tan(FOV/2) * px * zoom) and call camera.setViewOffset(W, H, W/2 - cx, H/2 - cy, W, H) so the origin renders at the stage centre without distortion. Ease cx, cy, px toward targets with factor 1 - exp(-dt*7); ease zoom with rate 6.

=== INTERACTIONS ===
- Free rotation: on pointer drag over the stage (pointer capture), premultiply the spin quaternion by a rotation about world Y by dx*k and about world X by dy*k, where k = PI / max(260, px*1.6). Not axis-locked. On release keep the last velocity and decay it by exp(-dt*4.5) (inertia).
- Zoom: clamp 0.55 to 3.4. Mouse wheel: zoom *= exp(-deltaY*0.0016) (0.01 when ctrlKey), preventDefault. Two-finger pinch scales zoom by the distance ratio. Zoom in / Zoom out buttons multiply / divide by 1.35.
- Turn pill: left arrow queues -90deg yaw, right arrow +90deg, "360°" queues a full +360deg; the queue is consumed each frame by step = queue * (1 - exp(-dt*4.2)).
- Double-click the stage (or key 0): slerp back to the home orientation (rate 6) and zoom back to 1.
- Keyboard on the focused stage: arrow keys rotate by 0.18 rad; + / - zoom by 1.2.
- Close-up Detail button: toggles zoom between 2.6 and 1; aria-pressed true while zoom > 2.2.
- Expand button: toggles class "focus" on the hero: sidebar fades and slides left 24px, right column fades and slides right 24px, tabs fade and slide up 16px (all .5s var(--ease), pointer-events none); the framing target becomes the whole hero, centred at 50% height, so the bird glides to the middle and grows. Escape closes it.
- Light button: toggles data-light between "day" and "dusk" (CSS tokens swap with .6s transitions; also set the body background to #14170f in dusk). Lights ease (rate 4) to dusk values: environmentIntensity 0.28, key 2.6 with color #ffc98a, rim 1.9, exposure 1.0; day values as listed above.
- Idle life: after 1.8s without interaction, ease in over 1.5s a slow sway on the pivot: rotation.y = sin(t*0.55)*0.16, rotation.x = sin(t*0.9)*0.03; plus a constant hover position.y = sin(t*1.3 + index)*0.028.
- Tab switch (780ms): direction dir = sign(newIndex - oldIndex). Outgoing bird over 60% of the duration with ease-in cubic e: scale 1-e, x = -dir*e*slide, extra yaw -dir*e*1.4. Incoming bird over the full duration with ease-out cubic e and a back-overshoot curve outBack(t) = 1 + 2.2(t-1)^3 + 1.2(t-1)^2: scale = outBack * (0.25 + 0.75e), x = dir*(1-e)*slide, extra yaw dir*(1-e)*1.6. slide = stageWidth*0.95/px world units. Reset zoom to 1 and the incoming bird to its home orientation. If the incoming model is not loaded yet, show the loader until it is.
- Side info swap on tab switch: the detail children animate out together (opacity 0, translateY(-6px), .2s ease-in), then the content is replaced and each child animates in with opacity 0 + translateY(12px) -> rest, .6s var(--ease), staggered 45ms per child. Caption, featured-card image/title/text and the lens image update at the same moment.

=== TABLET (max-width 1100px) ===
Hide the sidebar; grid becomes minmax(0,1fr) | clamp(280px,36vw,340px); centre column left padding 20px.

=== PHONE (max-width 760px) ===
Hero becomes a flex column, still exactly 100dvh, no page scroll.
 1. Top bar (padding 10px 14px 0): "Feather Atlas" in Newsreader 21px on the left; search collapses to a 32px round icon button (input hidden), then bell and account.
 2. Centre column (flex 1, padding 10px 14px 6px): the two tabs share the width equally; each tab becomes a horizontal layout with the 44x40 image on the left and name (15px) + Latin name (12px) stacked on the right, padding 6px 10px. Rail buttons shrink to 34px with 7px gap; turn pill at bottom 30px; caption 15px; hint hidden; ground shadow at bottom 17%, height 30px.
 3. Detail card becomes a bottom sheet: z-index 7 (above the canvas), max-height 40dvh, internally scrollable, radius 16px 16px 0 0, top border only, padding 14px 16px plus safe-area inset at the bottom; h1 34px; h2 19px.
 In focus mode on phone the sheet slides down out of view and the top bar fades out.
One-finger drag rotates, two-finger pinch zooms.

=== ALSO ===
Short desktop viewports (max-height 620px): reduce centre and sidebar top padding and hide the featured-card image and text. prefers-reduced-motion: disable idle sway/hover, make the tab switch instant and collapse CSS animation/transition durations. Tabs use role="tab" with aria-selected; rail buttons have aria-labels and aria-pressed; the stage has an aria-label explaining drag, zoom and double-click reset. No horizontal overflow at 375px wide.