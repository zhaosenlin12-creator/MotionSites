Build a single standalone index.html file: a full-screen hero section for "Halden", an expedition travel brand. Put the CSS in a <style> tag and the JS in a <script> tag, with no frameworks and no build step. Match every value below exactly.

=====================================================================
1. FONTS & GLOBAL
=====================================================================
- Google Fonts: Geist, weights 400 and 500.
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap" rel="stylesheet">
- font-family: "Geist", "Inter", system-ui, sans-serif; -webkit-font-smoothing: antialiased.
- <title>: Halden — Expeditions to the edge
- Reset: * { box-sizing: border-box }, html/body margin 0; links inherit color with no underline; buttons have no background, border or padding, inherit font and color, cursor pointer; img display block.
- :focus-visible { outline: 2px solid #fff; outline-offset: 3px; border-radius: 6px }

CSS custom properties on :root:
  --ink:   #0b1013                     (body background)
  --panel: rgba(14, 19, 23, 0.84)      (dropdown and mobile sheet background)
  --line:  rgba(255, 255, 255, 0.08)   (1px panel border)
  --hover: rgba(255, 255, 255, 0.065)  (row hover/active background)
  --text:  #ffffff
  --soft:  rgba(255, 255, 255, 0.74)   (idle nav link color)
  --muted: rgba(255, 255, 255, 0.60)   (descriptions)
  --ease:  cubic-bezier(0.22, 1, 0.36, 1)
  --morph: 0.5s                        (dropdown morph duration)

=====================================================================
2. HERO BACKGROUND (still image, not a video)
=====================================================================
<section class="hero"> : position relative; height 100vh and then 100svh; min-height 560px; overflow hidden; isolation isolate.

Inside it, <div class="hero-bg" role="img" aria-label="A turquoise glacial river winding through a volcanic valley toward snow-capped mountains">:
  position absolute; inset 0; z-index -2;
  background: #1b2a30 url("https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_144652_9eaf1d6a-3e8d-4460-bd5b-0ec7221685a0.png") center 45% / cover no-repeat;
  animation: heroIn 2.4s var(--ease) both;
  @keyframes heroIn { from { transform: scale(1.08); filter: brightness(0.6) } to { transform: scale(1); filter: brightness(1) } }

Overlay .hero::after: position absolute; inset 0; z-index -1; pointer-events none; background is two stacked gradients:
  linear-gradient(to bottom, rgba(6,10,12,0.35) 0%, rgba(6,10,12,0) 22%),
  linear-gradient(to top, rgba(6,9,11,0.8) 0%, rgba(6,9,11,0.25) 30%, rgba(6,9,11,0) 55%)

Scroll cue, centred: <div class="scroll-cue" aria-hidden="true"><span>(</span><span>scroll down</span><span>)</span></div>
  position absolute; left 50%; top 44%; transform translateX(-50%);
  display flex; align-items center; gap 16px; font-size 13.5px; letter-spacing 0.01em;
  color rgba(255,255,255,0.92); text-shadow 0 1px 12px rgba(0,0,0,0.35);
  the two parenthesis spans have opacity 0.8;
  animation: fadeUp 1s var(--ease) 0.9s both;
  @keyframes fadeUp { from { opacity:0; transform: translate(-50%, 10px) } to { opacity:1; transform: translate(-50%, 0) } }

There is NO headline, subtitle or other hero text. The hero shows only the header and the scroll cue.

=====================================================================
3. HEADER BAR
=====================================================================
<header class="header" id="header">: position absolute; top 0; left 0; right 0; z-index 20. The header itself is the containing block for the dropdown.

.bar: height 76px; padding 0 clamp(20px, 3.4vw, 52px); display grid; grid-template-columns 1fr auto 1fr; align-items center.
The three children are the logo (left), the nav (centre) and the actions (right).

Entrance animations (all use fill-mode BACKWARDS, not both/forwards):
  - logo:    fadeDown 0.9s var(--ease) 0.35s backwards
  - nav:     fadeIn 0.9s ease 0.45s backwards   <- OPACITY ONLY. Never put a transform on the nav: a transform would make the nav the containing block and throw off the dropdown's position.
  - actions: fadeDown 0.9s var(--ease) 0.55s backwards
  @keyframes fadeDown { from { opacity:0; transform: translateY(-8px) } to { opacity:1; transform: translateY(0) } }
  @keyframes fadeIn { from { opacity:0 } }

Logo: <a class="logo" aria-label="Halden home">, 30x26px, inline-flex, justify-self start. Inline SVG with viewBox "0 0 30 26": one white (#fff) path with fill-rule="evenodd" (a rounded pebble shape with a small mountain cut out of it):
  M3.2 19.6C.4 15.8 1.3 8.6 6.6 4.7 11.3 1.2 18.9.9 23.9 4.1c4.7 3 6.3 9 3.6 13.9-2.9 5.3-9.4 7.7-15.4 7-3.8-.4-6.9-2.4-8.9-5.4ZM9.5 17.2l4.3-6.4 2.6 3.6 1.7-2.2 3.4 5z

Centre nav: <nav class="desktop-nav" id="nav" aria-label="Main"> contains <ul class="links"> (flex, align-items center, gap 26px, no list style) with four items:
  1. <button class="trigger" data-menu="discover" aria-expanded="false">Discover + chevron</button>
  2. <button class="trigger" data-menu="journeys" aria-expanded="false">Journeys + chevron</button>
  3. <button class="trigger" data-menu="regions"  aria-expanded="false">Regions + chevron</button>
  4. <a class="plain-link" id="story-link" href="#story">Our story</a>   (no dropdown)
  Triggers and the link: inline-flex; align-items center; gap 6px; padding 8px 0; font-size 14.5px; color var(--soft); transition color 0.25s ease. On hover, and when aria-expanded="true", the color becomes #fff.
  Chevron: inline SVG 8x5px, viewBox "0 0 8 5", path "M1 1l3 3 3-3", stroke currentColor, stroke-width 1.3, round caps and joins, no fill. transition transform 0.35s var(--ease). It rotates 180deg when the trigger has aria-expanded="true".
  The dropdown (section 4) sits INSIDE the <nav>, after the <ul>, so the nav's pointerleave covers both the links and the panel.

Right actions (.actions: justify-self end; flex; gap 10px):
  - CTA <a class="cta" href="#contact">Enquire</a>: height 32px; padding 0 15px; border-radius 999px; background #fff; color #0b0f12; 14px; weight 500. On hover: background #e9eef0 and translateY(-1px). Transition 0.25s.
  - Mobile menu button (hidden on desktop; see section 6).

=====================================================================
4. MORPHING DROPDOWN (the signature element: copy it exactly)
=====================================================================
ONE shared container <div class="dd" id="dd"> holds three content panels. When the pointer moves between triggers, the container does not close and reopen. It MORPHS: it animates its x position, width and height to fit the new panel, and the content slides in the direction of travel with a blur crossfade.

.dd styles:
  custom props --x:0px; --w:400px; --h:300px; --s:0.97
  position absolute; top 64px; left 0; width var(--w); height var(--h);
  transform: translateX(var(--x)) scale(var(--s)); transform-origin 50% 0;
  opacity 0; pointer-events none; border-radius 16px; background var(--panel); border 1px solid var(--line);
  box-shadow: 0 30px 70px -25px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.2);
  backdrop-filter (and -webkit-): blur(22px) saturate(140%); overflow hidden;
  transition: transform var(--morph) var(--ease), width var(--morph) var(--ease), height var(--morph) var(--ease), opacity 0.3s ease;
  .dd.open { --s:1; opacity:1; pointer-events:auto }
  .dd.instant { transition: opacity 0.3s ease, transform var(--morph) var(--ease) }   (used on first open so width, height and x do not animate)
  .dd.instant.snap { transition: none }

.panel (each content panel):
  position absolute; top 0; left 0; opacity 0; visibility hidden; filter blur(8px); transform translateX(0);
  transition: opacity 0.26s ease, transform var(--morph) var(--ease), filter 0.4s ease, visibility 0s linear var(--morph);
  [data-state="exit-left"]  { transform: translateX(-56px) }
  [data-state="exit-right"] { transform: translateX(56px) }
  [data-state="active"] { opacity 1; visibility visible; filter blur(0); transform translateX(0);
     transition: opacity 0.36s ease 0.06s, transform var(--morph) var(--ease), filter 0.45s ease 0.04s, visibility 0s }
  .panel.snap { transition: none !important }

--- Panel A: DISCOVER (id p-discover, data-panel="discover"): 664 x 358px; grid; columns 236px 1fr ---
Left column .d-list: flex column; padding 8px; gap 2px. Four <a class="d-item" data-img="N"> rows, each flex:1, flex column, justify-content center, padding 0 12px, border-radius 10px, background transition 0.3s. The active row (.is-active) gets background var(--hover). The first row starts active.
  Title <strong>: 15px, weight 500, margin-bottom 4px. Description <span>: 13px, line-height 1.42, color var(--muted).
  Rows:
   0  Glaciers  - "Ancient ice fields carved into blue crevasses."
   1  Volcanoes - "Walk the rim where the earth is still forming."
   2  Dunes     - "Sand seas shaped by wind and long shadows."
   3  Islands   - "Remote shores where the ocean sets the pace."
Right column .d-media (aria-hidden): position relative; overflow hidden; border-radius 0 15px 15px 0 (the image runs flush to the panel's top, right and bottom edges).
  ::before is a 70px-wide left-edge fade: linear-gradient(to right, rgba(14,19,23,0.55), rgba(14,19,23,0)); z-index 2.
  Four stacked <img> elements (absolute, inset 0, 100% size, object-fit cover). Each starts at opacity 0, scale(1.06), blur(10px); transition opacity 0.6s ease, transform 0.9s var(--ease), filter 0.6s ease. The .is-active image is opacity 1, scale(1), blur(0), z-index 1. The first one starts active.
   img 0: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051509_384c49d8-b37c-49a7-9180-a06ad914ec24.png   (glacier aerial)
   img 1: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051509_bf51abc3-090e-459f-8066-8f0cdd0c36b9.png   (volcano, lava)
   img 2: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051509_c4fa86ad-842a-41c9-8cff-a70068ac1aa3.png   (sand dunes)
   img 3: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051511_ab19ff38-a140-442d-b2e7-82e3431bf3b6.png   (island cliffs)
  Hovering or focusing a row makes it .is-active and crossfades to its matching image (blurred and scaled in, then sharpening).

--- Panel B: JOURNEYS (id p-journeys): 446 x 308px; padding 7px; grid 2 equal columns; gap 7px ---
Two <a class="card"> photo cards: relative; overflow hidden; border-radius 10px; flex column; justify-content flex-end; padding 14px; isolation isolate.
  Card image: absolute, full size, object-fit cover, z-index -2, transition transform 0.9s var(--ease), filter 0.5s. On hover or focus-visible: scale(1.05) and brightness(1.08).
  ::after gradient (z-index -1): linear-gradient(to top, rgba(8,11,13,0.88) 0%, rgba(8,11,13,0.35) 38%, rgba(8,11,13,0) 60%).
  Title <strong>: 15.5px, weight 500, margin-bottom 5px. Description <span>: 13px, line-height 1.42, var(--muted).
   Card 1: "Small Group Treks" / "Six travellers, one guide, no crowds."
      https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051510_400ed870-8ffb-4030-b267-2b003780a5e3.png
   Card 2: "Solo Expeditions" / "Planned end to end around your pace."
      https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_051510_3d88d3aa-ac8a-4e80-b70b-0da5523138cf.png

--- Panel C: REGIONS (id p-regions): 232 x 218px; padding 8px; flex column; gap 2px ---
Four <a class="r-link"> rows: flex 1; align-items center; padding 0 12px; border-radius 9px; 15px; hover/focus background var(--hover), transition 0.25s.
  "The Nordics", "Patagonia", "Himalaya", "Oceania"

=====================================================================
5. DROPDOWN JAVASCRIPT BEHAVIOUR (vanilla, in an IIFE)
=====================================================================
- Menu order: ['discover','journeys','regions']. Constant PAD = 20. It lines each panel's text up with its trigger's text (8px panel padding + 12px row padding).
- place(id): read the panel's offsetWidth and offsetHeight.
    x = triggerRect.left - PAD, clamped between headerRect.left + 12 and headerRect.right - panelWidth - 12, then minus (dd.offsetParent || header).getBoundingClientRect().left.
    Set --x, --w and --h in px on .dd.
- open(id):
    clearTimeout(closeTimer); if id is already open, return.
    FIRST OPEN (nothing open): add .instant and .snap to .dd; add .snap to every panel and remove its data-state; call place(id); force a reflow (void dd.offsetWidth); remove .snap from .dd and from the panels; add .open to .dd; on the next requestAnimationFrame remove .instant.
      Result: the panel appears in place, scaling from 0.97 to 1, fading in, and its content un-blurs from 8px. Position and size do not animate.
    SWITCH (another menu open): dir = +1 if the new index > the current index, else -1.
      The old panel gets data-state = dir>0 ? 'exit-left' : 'exit-right'.
      The new panel: add .snap, set data-state = dir>0 ? 'exit-right' : 'exit-left', force a reflow, remove .snap, then place(id). The container morphs x, width and height over 0.5s.
    Then set the new panel's data-state='active', set aria-expanded="true" on its trigger only, and set current = id.
- close(): remove .open from .dd; remove data-state from the current panel (it fades and blurs out); set all aria-expanded="false"; current = null.
- scheduleClose(ms = 140): debounced setTimeout(close).
- Events:
    trigger pointerenter (only when e.pointerType === 'mouse') -> open(menu)
    trigger click -> toggle (for touch and keyboard)
    #story-link pointerenter (mouse) -> scheduleClose(60)
    nav pointerenter -> clearTimeout; nav pointerleave (mouse) -> scheduleClose()   (140ms grace period)
    nav focusout with the focus leaving the nav -> scheduleClose(0)
    Escape -> close and return focus to the trigger that was open; also close the mobile sheet
    document pointerdown outside the nav -> close
    window resize -> re-run place(current) if a menu is open
    .d-item pointerenter/focus -> set that row .is-active and the image with index data-img .is-active

=====================================================================
6. MOBILE (<= 860px)
=====================================================================
- .bar switches to grid-template-columns 1fr auto; .desktop-nav is display none; the menu button shows.
- Menu button <button class="menu-btn" aria-label="Open menu" aria-expanded="false">, placed after the Enquire CTA: 36x32px, pill radius 999px, background rgba(255,255,255,0.12), backdrop-filter blur(10px). It holds a 16px SVG with two lines, "M2 5.5h12M2 10.5h12", stroke #fff, width 1.5, round caps.
- Sheet <div class="sheet" id="sheet">, placed inside the header after .bar: position absolute; top 68px; left 12px; right 12px; padding 10px; radius 16px; background var(--panel); border 1px solid var(--line); backdrop-filter blur(22px) saturate(140%); max-height calc(100svh - 90px); overflow auto.
    Closed: opacity 0; visibility hidden; transform translateY(-6px) scale(0.98); transform-origin 50% 0.
    .open: opacity 1; visible; transform none. Transitions: opacity 0.3s ease, transform 0.45s var(--ease); visibility is delayed 0.45s when closing.
    Group headings are <h3>: 12px, weight 500, letter-spacing 0.06em, uppercase, var(--muted), margin 10px 12px 6px.
    Links: block; padding 10px 12px; radius 9px; 15px; hover background var(--hover).
    Content: DISCOVER (Glaciers, Volcanoes, Dunes, Islands) / JOURNEYS (Small Group Treks, Solo Expeditions) / REGIONS (The Nordics, Patagonia, Himalaya, Oceania) / HALDEN (Our story).
    Clicking the button toggles .open and aria-expanded. Clicking any link closes the sheet.
- At >= 861px the sheet is display none.

=====================================================================
7. ACCESSIBILITY & REDUCED MOTION
=====================================================================
- Hero section aria-label "Halden expeditions"; the scroll cue is aria-hidden; the Discover preview images use alt="".
- @media (prefers-reduced-motion: reduce): --morph: 0.01s; all animations duration 0.01s with no delay; no blur filters on .panel or .d-media img.

Output only the complete index.html.