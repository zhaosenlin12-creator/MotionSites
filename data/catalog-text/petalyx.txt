Build a single standalone index.html landing page called "Petalyx": a cherry-blossom, anime-watercolor themed SaaS page for measuring AI agents. One file, inline <style> and <script>, no build step, no local assets. Every image and video must load from the exact CloudFront URLs given below. Recreate everything exactly as specified.

==================================================
1. HEAD, FONTS, LIBRARIES
==================================================
- <title>Petalyx — Benchmark all AI staff</title>
- <meta name="description" content="Benchmark the impact of all your AI staff.">
- <meta name="viewport" content="width=device-width, initial-scale=1">
- Font: Google Fonts "Inter Tight", weights 400/500/600/700 + italic 400/500:
  https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap
  (preconnect to fonts.googleapis.com and fonts.gstatic.com crossorigin)
- Scripts at end of body, in this order:
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js
  https://unpkg.com/lenis@1.1.13/dist/lenis.min.js

==================================================
2. ASSET URLS (use exactly)
==================================================
HERO_VIDEO  (Seedance 2.5, 1080p, seamless loop, petals/river/birds):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093331_5998f443-1b9c-4b62-820c-8219c73c72c4.mp4
HERO_POSTER / intro blurred backdrop (cherry blossom valley, white sky top):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093215_b7826239-e451-4e15-b42b-d6bcf9497a32.png
CLOUD_A (transparent PNG, puffy left, wispy tail to right):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093216_44218665-b15e-4566-a2d4-2676ab03609d.png
CLOUD_B (transparent PNG, puffy right, wispy tail to left):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093215_0f37c0c3-f82c-485b-87dd-5a35b75a8782.png
TREE (transparent PNG, pink cherry blossom trees on a flat-cut grassy base):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093215_95f11900-c4a0-49ad-bb2d-bb927dd594ee.png
NIGHT (21:9 moonlit cherry blossom valley with lake, deep blues):
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261021_093217_cc690198-ad8c-4127-8734-8485bd878351.png

==================================================
3. DESIGN TOKENS & GLOBAL CSS
==================================================
:root{ --ink:#121410; --olive:#4d6a10; --green:#6f9a0c; --lime:#b4cd52; --pill:#e7efcf; --line:#eef0ea; --bg:#fff; --radius:22px; }
*{box-sizing:border-box;margin:0;padding:0}
html{background:#e9eee0}   html.lenis, html.lenis body{height:auto}   .lenis.lenis-smooth{scroll-behavior:auto!important}
body{font-family:"Inter Tight",system-ui,sans-serif;color:var(--ink);background:transparent;overflow-x:hidden;-webkit-font-smoothing:antialiased}
img,video{display:block;max-width:100%}  a{color:inherit;text-decoration:none}

Shared components:
- .pill: inline-flex, 11px, weight 500, padding 5px 10px, radius 999px, bg var(--pill), color #2c3a10, letter-spacing .01em.
- .h2: font-size clamp(26px,3.1vw,44px), weight 400, letter-spacing -.03em, line-height 1.12, centered.
- .btn: inline-flex centered, height 36px, padding 0 16px, radius 999px, bg var(--olive), color #f3f8e4, 13px, weight 600, letter-spacing -.01em, white-space nowrap,
  box-shadow inset 0 1px 0 rgba(255,255,255,.25), 0 2px 6px rgba(60,80,10,.25); transition transform .3s, background .3s; hover: translateY(-1px), bg #5a7c14.
- .w (split word span): inline-block, will-change transform/filter/opacity.
- .glass (frosted square): absolute, radius 12px, bg rgba(255,255,255,.16), 1px solid rgba(255,255,255,.55), backdrop-filter blur(10px) saturate(1.2) (+ -webkit-), box-shadow inset 0 1px 0 rgba(255,255,255,.4).
- .grid-sq: absolute, 1px solid #edf0e8, radius 10px, pointer-events none.
- Keyframes: driftA → translateX(26px) translateY(4px); driftB → translateX(-30px) translateY(6px).
  .drift-a: driftA 14s ease-in-out infinite alternate. .drift-b: driftB 17s ease-in-out infinite alternate.

==================================================
4. STRUCTURE
==================================================
<body class="intro">
  <div class="backdrop">  (fixed, inset -40px, z 0, background HERO_POSTER center 70%/cover, filter blur(18px) saturate(1.1), transform scale(1.3))
  <div id="app">  (relative, z 1, bg #fff, transform-origin 50% 50vh, overflow clip; while body.intro: transform scale(.9), border-radius 28px)
     sections: #hero, #stats, #loop, #cta, footer#footer

--------------------------------------------------
4a. HERO  (section.hero#hero: relative, height 100vh, min-height 620px, overflow hidden, bg #fff)
--------------------------------------------------
- Floating pill nav (.nav): absolute top 22px, centered (left 50%, translateX(-50%)), z 20, flex, gap 44px, padding 5px 5px 5px 16px, radius 999px, bg rgba(255,255,255,.9),
  box-shadow 0 0 0 1px rgba(0,0,0,.05), 0 6px 18px rgba(0,0,0,.06), backdrop-filter blur(8px).
  - Brand link (.brand, href #hero, aria-label "Petalyx home"): flex, gap 6px, 22px, weight 500, letter-spacing -.04em. Logo SVG 30x22:
    <svg viewBox="0 0 30 22"><circle cx="4" cy="17" r="3.6" fill="currentColor"/><path d="M10.5 18.5 16.8 5.2 25.5 18.5" fill="none" stroke="currentColor" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    then lowercase text "petalyx".
  - Button .btn "Start for $0" (href #cta).
- Cloud left (.cloud.cloud-l, data-par="-60"): absolute, top -3%, left -5%, width min(44vw,640px); inner <img class="drift-a"> = CLOUD_A at width 100%.
- Cloud right (.cloud.cloud-r, data-par="-90"): top 2%, right -6%, width min(42vw,620px); <img class="drift-b"> = CLOUD_B.
- Headline h1#heroTitle.split: absolute, z 6, top 31%, full width, centered, font-size clamp(34px,5.2vw,76px), weight 400, letter-spacing -.045em, line-height 1.04, padding 0 16px.
  Text: "Benchmark the impact of<br>all your <em>AI staff.</em>"  — em: color var(--olive), italic, weight 500.
- .hero-media: absolute, left/right/bottom 0, height 72%, z 2, mask-image linear-gradient(to bottom, transparent 0, #000 22%) (+ -webkit-).
  <video id="heroVideo" autoplay muted loop playsinline preload="auto" poster=HERO_POSTER src=HERO_VIDEO>, width/height 100%, object-fit cover, object-position center 70%.
- .hero-glass#heroGlass: absolute inset 0, z 5, pointer-events none — filled by JS with frosted squares (see JS).

--------------------------------------------------
4b. STATS  (section.stats#stats: relative, 100vh, min-height 680px, overflow hidden, bg #fff)
--------------------------------------------------
- <div class="sq-field" data-count="22"> (faint grid squares at top, generated by JS).
- Tree: .tree-wrap absolute z 2, left 50% translateX(-50%), bottom -2%, width min(340px,58vw); <img id="tree" class="tree"> = TREE.
- .stats-inner: relative z 3, height 100%, flex column, centered both axes, gap 22px, padding 0 16px. Contains:
  1) span.pill.reveal "Teams rely on us"
  2) h2.h2.split (margin-bottom 18px): "80,000+ flows<br>finished on autopilot."
  3) .cards: relative z 4, grid 4 columns, gap 12px, width min(880px,100%). Four ticket cards (.card):
     height 150px, padding 18px 22px, radius 22px, bg var(--lime), flex column space-between.
     Ticket notches via mask (and -webkit-mask):
       radial-gradient(circle 17px at 0 55%, #0000 97%, #000) left/51% 100% no-repeat,
       radial-gradient(circle 17px at 100% 55%, #0000 97%, #000) right/51% 100% no-repeat
     small label: 10.5px, weight 500, color #2a3410. Big value <b>: clamp(30px,3.4vw,44px), weight 600, letter-spacing -.04em, color #151a08, tabular-nums.
     Cards (label / target / decimals / suffix):
       "Staff Time Freed"   40   0  "%"
       "Customers"          300  0  "+"
       "Task Success Rates" 99.2 1  "%"
       "Output Reliability" 99.2 1  "%"
     Store as data-to, data-dec, data-suf; initial text "0%" / "0+".
  4) .cards-shadow: width min(820px,94%), height 10px, margin-top -18px, radius 50%, background radial-gradient(closest-side, rgba(0,0,0,.08), transparent), z 3.
  5) Wrapper (relative, width min(860px,100%), flex centered) containing:
     - .band#band: absolute z 5, centered, top -6px, width min(340px,58vw), height 64px, backdrop-filter blur(14px), bg rgba(255,255,255,.12),
       mask-image linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent) — frosted strip where the tree passes behind the logos.
     - .logos: relative z 6, flex space-between, gap 24px, width min(860px,100%), padding 6px 10px, color #151515. Items (21px, weight 700, letter-spacing -.03em, gap 6px, nowrap):
       slack (with Slack-like hash SVG 20x20), "zapier" (weight 400), Dropbox (with Dropbox diamonds SVG 20x18), "HubSpot", Notion (15px weight 500, with outlined N-in-rounded-square SVG).

--------------------------------------------------
4c. HUMAN-IN-THE-LOOP HOVER ACCORDION  (section.loop#loop: relative, 100vh, min-height 680px, overflow hidden, bg #fff)
--------------------------------------------------
NOT a horizontal scroll. It's a full-width, full-height row of 3 vertical panels separated by thin 1px lines (var(--line)). One panel is active (expanded); the others collapse to narrow strips that clip their giant number.
- .loop-cloud (data-par="-50"): absolute z 3, top 4vh, left -4vw, width min(36vw,520px). <img class="drift-a"> = CLOUD_A plus three .glass squares inside: (left 6%, top 30%, width 15%), (left 23%, top 58%, width 13%), (left 38%, top 24%, width 13%), all aspect-ratio 1.
- .loop-head: absolute z 4, top 9vh, full width, centered column, gap 16px, padding 0 16px:
  span.pill.reveal "Expert escalation"; h2.h2.split "Humans take over only at<br>the crunch."
- .track#track: absolute z 2, inset 0, display flex.
- .panel (tabindex 0): relative, flex 0 0 clamp(96px,11vw,170px), height 100%, overflow hidden, border-right 1px solid var(--line) (none on last), cursor pointer, outline none,
  transition flex-grow .9s cubic-bezier(.77,0,.18,1). .panel.is-active: flex-grow 1, cursor default. First panel starts active.
- .panel-in: absolute, left clamp(14px,1.8vw,28px), bottom 10vh, flex, align-items flex-end, gap clamp(16px,2vw,30px), width max-content.
- .num: font-size clamp(170px,36vh,380px), weight 600, line-height .74, letter-spacing -.07em. Colors: 1 = var(--olive), 2 = var(--green), 3 = var(--lime).
- .step: relative, width min(400px,30vw), padding-bottom 4px; inactive: opacity 0, translateX(-24px), blur(6px), transition opacity .4s, transform .5s, filter .4s.
  Active: opacity 1, no transform/filter, transition opacity .7s .4s, transform .9s .35s cubic-bezier(.2,.8,.2,1), filter .7s .4s.
  h3: clamp(20px,1.7vw,26px), weight 400, letter-spacing -.03em, margin-bottom 12px. p: 14px, line-height 1.4, color #2b2e27.
- .mini-cloud (inside .step, so it only shows on the active panel): absolute, left -10%, bottom calc(100% + clamp(70px,13vh,150px)), width min(18vw,250px), max-width none, animation driftA 9s ease-in-out infinite alternate.
- Panels:
  1  "Ticket comes in" — "A shopper files a return claim with the purchase details, why it's going back, and any proof they can share."  (mini-cloud = CLOUD_B)
  2  "Review record"   — "Your agent scans the buyer profile, earlier purchases, prior returns, and any notable account events."     (mini-cloud = CLOUD_A)
  3  "Apply the rules" — "Your agent measures the claim against return terms, qualifying conditions, time limits, and edge cases." (mini-cloud = CLOUD_B)
  aria-label each: "Step N: Title".
- Interaction (desktop ≥761px): mouseenter, focus, or click on a panel makes it the only .is-active. The last hovered panel stays open.

--------------------------------------------------
4d. CTA  (section.cta#cta: relative, height 110vh, min-height 720px, overflow hidden, bg #fff)
--------------------------------------------------
- <div class="sq-field" data-count="16">.
- .cta-img: absolute left/right/bottom 0, height 78%, mask-image linear-gradient(to bottom, transparent 0, #000 24%). <img id="ctaImg" alt="Moonlit cherry blossom valley"> = NIGHT, width 100%, height 118%, object-fit cover, object-position center 60%.
- .petals#petals: absolute inset 0, z 3, pointer-events none, overflow hidden. JS adds 18 .petal spans:
  .petal: absolute, top -20px, 10x8px, border-radius 80% 0 80% 0, bg #f6c4d6, opacity .85, animation fall linear infinite;
  @keyframes fall { to { transform: translate(var(--dx),110vh) rotate(540deg) } }
- .cta-card#ctaCard: absolute z 4, left 50%, top 30%, translateX(-50%), width min(680px, calc(100% - 32px)), padding 46px 28px 54px, centered text, radius 26px,
  background linear-gradient(to bottom, rgba(255,255,255,.96) 0%, rgba(255,255,255,.75) 35%, rgba(255,255,255,.12) 100%), border 1px solid rgba(255,255,255,.7),
  backdrop-filter blur(16px) saturate(1.1), box-shadow 0 30px 60px rgba(10,20,60,.18). Contents:
  span.pill "Get started"; h2.h2.split (margin 16px 0 10px, font-size clamp(24px,2.8vw,38px)) "Every hour your agents free up is gold.";
  p.reveal (14px, color #1d2230, margin-bottom 20px) "Set up your first AI agent in minutes and see results on day one."; a.btn.reveal "Start for $0" (href #hero).

--------------------------------------------------
4e. FOOTER  (footer#footer: bg var(--lime), padding 34px 4vw 22px, grid 3 columns 1fr auto 1fr, align center, row-gap 22px)
--------------------------------------------------
- .f-logo (72x72, aria-label "Petalyx") SVG viewBox 0 0 80 80, overflow visible:
  <circle id="fRing" cx="40" cy="40" r="37" fill="none" stroke="#111" stroke-width="2.4" stroke-dasharray="233" stroke-dashoffset="233" transform="rotate(-90 40 40)"/>
  three <circle class="fdot"> at cx 22/40/58, cy 40, r 4.5, fill #111
  <path id="fMark" d="M33 53 43 31 56 53" fill="none" stroke="#111" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="60" stroke-dashoffset="60"/>
- nav.f-links (flex, gap 24px, 13px, color #1d240c, hover underline): Toolkit · Mission · Help desk · Terms
- .f-social (flex, gap 16px, justify-self end; icons 18x18): X logo, Instagram outline (rounded square + circle + dot), LinkedIn filled.
- .f-copy (full row, centered, 11px, color #2a330f): "© 2026 Petalyx. All rights reserved."

==================================================
5. JAVASCRIPT (vanilla + GSAP/ScrollTrigger/Lenis, wrapped in an IIFE)
==================================================
1) gsap.registerPlugin(ScrollTrigger); reduce = prefers-reduced-motion; isMobile = innerWidth <= 760.
2) Split every .split element's text nodes into <span class="w"> per word, recursing into <em> and keeping <br>.
3) .sq-field generator: style = absolute, inset 0 0 auto 0, height 42%, z 1, pointer-events none, mask linear-gradient(#000, transparent).
   For data-count squares: size 46, random col 0–29 and row 0–5, left = col*48-10px, top = row*48+6px, 46x46 .grid-sq. Each gets a GSAP opacity 0→1 yoyo repeat -1, duration 1.2, random delay 0–4s, random repeatDelay 0–3s.
4) Hero glass squares appended to #heroGlass at [x%, y%]:
   left [3,64],[3,71],[6.5,71],[10,71],[3,78]; [-1,70]; center [45.5,76],[49,80],[49,76],[52.5,76]; right [86,58],[86,67],[82,76],[89.5,76],[86,84].
   Size: center ones (40<x<60) clamp(28px,3.4vw,44px), others clamp(36px,5.4vw,74px), aspect-ratio 1. On mobile hide every odd-indexed square.
   Unless reduced motion: gsap.to opacity .15, duration .9, yoyo repeat -1, ease sine.inOut, random delay 0–3s, repeatDelay 1–4s (flickering glass).
5) Petals: 18 spans, random left 0–100%, --dx random -80..80px, duration 9–18s, negative delay 0–15s, scale .6–1.4.
6) Lenis smooth scroll: new Lenis({duration:1.25, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true}); lenis.on('scroll', ScrollTrigger.update);
   gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0). All a[href^="#"] use lenis.scrollTo(id,{duration:1.6}).
7) INTRO (page zooms out of a blurred landscape): lenis.stop(); set hero words {opacity 0, y 24, blur(10px)}, nav {opacity 0, y -16}.
   Timeline (delay .25):
   - #app fromTo {scale .9, borderRadius 28} → {scale 1, borderRadius 0}, 1.4s, expo.inOut
   - .nav → opacity 1, y 0, .8s power3.out at "-=.5"
   - hero words → opacity 1, y 0, blur(0), 1s, stagger .07, power3.out at "-=.7"
   - .cloud-l from x -120 opacity 0, 1.6s power3.out at .4; .cloud-r from x 120 opacity 0, same at .4
   - #heroGlass .glass from opacity 0 scale .6, .6s, stagger {each .05, from random}, back.out(2) at "-=1"
   onComplete: remove body.intro, gsap.set('#app',{clearProps:'all'}) (so pins work), remove .backdrop, lenis.start(), then setupScroll().
8) setupScroll():
   - Hero parallax (trigger #hero, top top → bottom top, scrub): #heroTitle yPercent -60; each .hero [data-par] y = data-par*2; .hero-media yPercent 8.
   - .reveal elements: from opacity 0, y 16, .8s power3.out, start "top 85%".
   - Word reveal for .split in stats/loop/cta: words from opacity 0, y 22, blur(8px), .9s, stagger .06, power3.out, start "top 80%".
   - Counters: setCounters(p) writes (data-to*p).toFixed(data-dec)+data-suf into each card <b>.
   - gsap.matchMedia:
     (min-width:901px): cards from y 40 opacity 0 stagger .08 (start top 70%). PIN #stats: timeline scrollTrigger {start top top, end "+=120%", pin true, scrub 1};
        tween proxy p 0→1 (ease none) calling setCounters; simultaneously #tree fromTo yPercent 75 → 6 (tree rises from behind the cards, blurred where it passes the logo band).
     (max-width:900px): cards from y 30 opacity 0 stagger .08 (start top 85%); counters animate 0→1 over 2s power2.out when .cards hits top 80%;
        #tree yPercent 40 → 0 scrubbed across the section.
     (min-width:761px): attach hover/focus/click accordion handlers to .panel; .panel-in from y 120 opacity 0, 1.1s stagger .12 (trigger #loop top 60%);
        .loop-cloud x → 60 scrubbed (#loop top bottom → bottom top).
     (max-width:760px): each .panel's children from y 40 opacity 0, .9s stagger .1, start top 85%.
   - CTA: #ctaImg fromTo yPercent -12 → 0 scrubbed (#cta top bottom → bottom bottom); #ctaCard from y 80, scale .94, opacity 0, blur(10px), 1.2s power3.out at #cta top 60%.
   - Footer logo timeline (trigger #footer top 92%): dots bounce y -8 (.25s, stagger .08, yoyo, repeat 3, sine.inOut) → all dots move to cx 27 cy 50 (.45s power3.inOut)
     → dots 2 and 3 fade out (.1s) → #fMark strokeDashoffset 0 (.6s power3.out, "-=.05") with dot 1 r → 5.5 (back.out(3), "<") → #fRing strokeDashoffset 0 (.9s power2.inOut, "-=.3").
   - ScrollTrigger.refresh(); also refresh on window load.

==================================================
6. RESPONSIVE
==================================================
@media (max-width:900px):
  .nav gap 24px; .cards 2 columns; .card height 120px; .logos wrap, centered, gap 14px 26px, item font 17px;
  .stats height auto, min-height 100vh, padding 90px 0 300px (no pin); .tree-wrap bottom 0; .band hidden.
@media (max-width:760px):
  .hero height 100svh, min-height 560px; h1 top 26%;
  .hero-media height 66%, mask transparent 0 → #000 14%; video object-position 38% 100%, transform scale(1.12), origin 50% 100%;
  .cloud-l width 70vw, left -18vw, top 6%; .cloud-r width 66vw, right -20vw, top 10%;
  .nav top 16px, gap 18px, padding-left 12px; .brand 19px;
  .loop height auto, min-height 0, padding 12vh 0 40px; .loop-head relative, top auto; .loop-cloud width 62vw, left -14vw, top 2vh, opacity .9;
  .track relative, inset auto, flex-direction column, margin-top 40px;
  .panel flex none, height auto, overflow visible, no right border, border-top 1px solid var(--line), cursor auto;
  .panel-in relative, left/bottom auto, width auto, padding 28px 16px, gap 18px; .num 150px;
  .step (all states) opacity 1, no transform/filter, width auto; .mini-cloud hidden  → steps become a simple stacked list.
  .cta height auto, min-height 0, padding 60px 0 0; .cta-img relative, height 92vh, min-height 620px; img object-position 30% 60%;
  .cta-card top 120px, padding 34px 18px 42px (still overlaps the night image);
  footer single column, centered items, .f-social centered, .f-links gap 18px wrap centered.
@media (prefers-reduced-motion: reduce): disable .drift-a, .drift-b, .petal animations.
No horizontal scroll at any width (body overflow-x hidden, #app overflow clip).

==================================================
7. RESULT CHECKLIST
==================================================
- On load the white page starts at 90% scale with rounded corners over a blurred cherry-blossom backdrop, then grows to full screen.
- Hero: centered pill nav, drifting pastel clouds top-left/right, headline revealing word by word from blur, looping cherry-blossom valley video in the lower 72% fading into the white sky, flickering frosted glass squares.
- Stats pins on desktop: counters scrub up to 40% / 300+ / 99.2% / 99.2% while the cherry tree rises behind the lime ticket cards and a frosted band blurs it behind the logo row.
- Steps: 3-panel hover accordion with giant olive / green / lime numbers; inactive panels show clipped numbers; the active panel shows title, text and a drifting cloud.
- CTA: frosted white-to-clear card over a moonlit valley with falling pink petals.
- Lime footer: three dots bounce, merge into the Petalyx mark, and a ring draws around it.
- All smooth-scrolled with Lenis.