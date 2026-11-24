Build a single, standalone, production-ready HTML file (all CSS in one <style> in <head>, all JS in one <script> before </body>). No frameworks, no build step, no external assets except the Google Font and the video URLs given below. Name it index.html.

It is ONE full-viewport hero section for an AI company called "JungleMind". Match every value below exactly.

═══════════════════════════════════════
1. DOCUMENT HEAD
═══════════════════════════════════════
- <html lang="en">, <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1">
- <title>JungleMind — The thinking engine shaped for what counts.</title>
- Google Fonts with preconnect to https://fonts.googleapis.com and https://fonts.gstatic.com (crossorigin):
  https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap
- Body font stack: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
- -webkit-font-smoothing: antialiased

═══════════════════════════════════════
2. DESIGN TOKENS (:root)
═══════════════════════════════════════
--ink: #111111
--muted: #5c5c5c
--card: rgba(248, 248, 246, 0.97)
--shell: 1120px
--ease: cubic-bezier(0.16, 1, 0.3, 1)     /* expo-out, used by every animation */

Global: *, *::before, *::after { box-sizing: border-box }
html, body { background:#eef2ee; overflow-x:hidden }
body.menu-open { overflow: hidden }        /* scroll lock while mobile menu is open */

═══════════════════════════════════════
3. BACKGROUND VIDEO — NO OVERLAY
═══════════════════════════════════════
Structure: <section class="hero"> > <div class="hero__bg"> > <video>

Video element attributes: autoplay muted loop playsinline preload="auto"
poster (URL-encoded, escape & as &amp; in the attribute):
https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260831_223518_f11bfa03-4e65-47e1-a4a7-30e42a7a8c2f.png&w=1920&q=85

<source type="video/mp4"> exact CloudFront URL:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_232706_43757be4-2250-4f09-8cd7-23aebbf147ad.mp4

(The clip is a 10s 16:9 1080p loop of a sunlit glasshouse jungle — monstera and palm leaves, pink lilies, a shallow stream, drifting sunbeams.)

CRITICAL:
- .hero__bg { position:absolute; inset:0; z-index:0 }
- .hero__bg video { position:absolute; inset:0; width:100%; height:100%; object-fit: fill }
  Use object-fit: FILL, not cover — the entire frame must span the section with no crop and no zoom.
- There must be NO gradient, tint, scrim, or overlay element of any kind on top of the video.
  Content sits directly on it. Do not add a .hero__wash or similar.

═══════════════════════════════════════
4. HERO SHELL
═══════════════════════════════════════
.hero { position:relative; height:100vh; height:100svh; min-height:620px; width:100%;
        overflow:hidden; display:flex; flex-direction:column }
.hero__inner { position:relative; z-index:2; display:flex; flex-direction:column;
               flex:1 1 auto; min-height:0 }

═══════════════════════════════════════
5. NAV BAR (desktop)
═══════════════════════════════════════
<header class="nav"> — position:relative; z-index:70 (must stay above the mobile panel);
width:100%; max-width:var(--shell); margin:0 auto; padding:26px 24px 0;
display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:16px

Three grid children in order: brand (left), <nav class="nav__nav" id="site-menu"> (centre),
<div class="nav__cta"> (right, justify-self:end). A 4th child, the hamburger button, is
display:none on desktop.

BRAND: <a class="brand" href="#"> — inline-flex; gap:10px; font-size:25px; font-weight:600;
letter-spacing:-0.02em; color:var(--ink); text-decoration:none. SVG is 30x30, display:block.
Logo SVG (viewBox "0 0 32 32", fill none, aria-hidden), two paths — an outlined diamond and a
solid inner diamond:
  <path d="M16 2.5 29.5 16 16 29.5 2.5 16 16 2.5Z" stroke="#141414" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M16 9.5 22.5 16 16 22.5 9.5 16 16 9.5Z" fill="#141414"/>
Wordmark text: JungleMind

LINKS: <ul class="nav__links"> — flex; align-items:center; gap:42px; list-style:none; margin:0; padding:0
Items in order: Help, API, Credits, News
a { font-size:15px; font-weight:400; color:#1a1a1a; text-decoration:none; opacity:0.9;
    transition:opacity 0.18s ease }  a:hover { opacity:0.55 }

CTA BUTTON .btn-dark — inline-flex centred; background:#141414; color:#fff; font-family:inherit;
font-size:14.5px; font-weight:500; padding:13px 22px; border:0; border-radius:9px;
white-space:nowrap; cursor:pointer; transition: background 0.18s ease, transform 0.18s ease
:hover { background:#000; transform:translateY(-1px) }
Label: Request Access

═══════════════════════════════════════
6. HAMBURGER BUTTON (base styles)
═══════════════════════════════════════
.nav__toggle { display:none; align-items:center; justify-content:center; width:44px; height:44px;
  margin-right:-10px; padding:0; border:0; background:transparent; cursor:pointer;
  -webkit-tap-highlight-color:transparent }
Markup: <button class="nav__toggle" id="menu-toggle" type="button" aria-label="Open menu"
  aria-expanded="false" aria-controls="site-menu"> containing
  <span class="nav__toggle-box" aria-hidden="true"><span class="bar bar--top"></span><span class="bar bar--bot"></span></span>

.nav__toggle-box { position:relative; display:block; width:22px; height:14px }
.nav__toggle .bar { position:absolute; left:0; width:100%; height:1.8px; border-radius:2px;
  background:#141414; transition: transform 0.55s var(--ease), width 0.45s var(--ease) }
.bar--top { top:0 }
.bar--bot { bottom:0; width:70% }              /* deliberately short — asymmetric detail */
.nav__toggle:hover .bar--bot { width:100% }
.nav__toggle[aria-expanded="true"] .bar--top { transform: translateY(6.1px) rotate(45deg) }
.nav__toggle[aria-expanded="true"] .bar--bot { width:100%; transform: translateY(-6.1px) rotate(-45deg) }

IMPORTANT specificity rule — write this exactly:
.nav .menu__cta { display: none }
The .nav prefix is required because .btn-dark { display:inline-flex } is declared later in the
sheet; without it the in-panel CTA leaks onto tablet widths and you get two CTAs.

═══════════════════════════════════════
7. CENTRE STACK
═══════════════════════════════════════
.stage { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; align-items:center;
  justify-content:center; text-align:center; padding:24px; gap:clamp(18px, 2.4vh, 26px) }

BADGE (pill): .badge { display:inline-flex; align-items:center; gap:14px;
  background:rgba(255,255,255,0.94); border:1px solid rgba(0,0,0,0.07); border-radius:999px;
  padding:7px 16px 7px 8px; font-size:13.5px; color:#4a4a4a }
.badge__tag { background:rgba(255,255,255,0.95); border:1px solid rgba(0,0,0,0.07);
  border-radius:999px; padding:3px 12px; font-size:13.5px; font-weight:500; color:#111 }
Content: <span class="badge__tag">Now</span><span>JungleMind 3.0 is here</span>

HEADLINE h1.headline { margin:0; font-size:clamp(32px, 5.7vw, 72px); line-height:1.03;
  font-weight:500; letter-spacing:-0.035em; max-width:20ch }
Exact text with a forced break:
  The thinking engine<br class="brk" /> shaped for what counts.

SUBCOPY p.sub { margin:0; font-size:clamp(14px, 1.35vw, 17.5px); line-height:1.65;
  font-weight:400; color:var(--muted); max-width:66ch }
Exact text, two sentences split by a forced break:
  JungleMind is an AI system that reasons through every problem carefully before answering.<br class="brk" />
  Plug into the API, launch in minutes, and ship reasoning you can really rely on.

FORCED-BREAK MECHANISM (reproduces the reference wrapping only on wide screens):
.brk { display: none }
@media (min-width: 900px) {
  .brk { display: inline }
  .stage .headline { max-width: none }
  .stage .sub { max-width: none }
}
The .stage prefix is required — the plain .headline/.sub max-widths are declared later and
would otherwise win.

═══════════════════════════════════════
8. PROMPT CARD (frosted glass)
═══════════════════════════════════════
<form class="prompt" onsubmit="return false;">
.prompt { width:min(790px, 100%); background:rgba(255,255,255,0.42);
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  backdrop-filter: blur(18px) saturate(1.15);
  border:1px solid rgba(0,0,0,0.06); border-radius:20px; padding:22px 20px 16px;
  text-align:left; box-shadow:0 18px 44px -26px rgba(0,0,0,0.28);
  margin-top:clamp(6px, 1.6vh, 16px) }
(The glass blur belongs to the CARD only — it must never be applied to the hero background.)

Visually-hidden label: <label class="sr-only" for="prompt-input">Ask JungleMind</label>
.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap }

<textarea id="prompt-input" class="prompt__input" rows="3" placeholder="How do rainforests survive?">
.prompt__input { width:100%; border:0; outline:0; resize:none; background:transparent;
  font-family:inherit; font-size:16.5px; line-height:1.5; color:var(--ink);
  min-height:clamp(56px, 11vh, 108px); padding:2px 4px }
.prompt__input::placeholder { color:#3d3d3d; opacity:0.72 }

.prompt__bar { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:10px }
  Left: circular "+" button. Right: <div class="prompt__right"> (flex, gap:12px) with a bare
  microphone button then a dark square send button.
.prompt__right { display:flex; align-items:center; gap:12px }

.icon-btn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px;
  border-radius:50%; border:1px solid rgba(0,0,0,0.1); background:#fff; color:#1a1a1a;
  cursor:pointer; padding:0; transition: background 0.18s ease }
.icon-btn:hover { background:#f1f1ef }
.icon-btn--bare { border:0; background:transparent; width:34px }
.icon-btn--bare:hover { background:rgba(0,0,0,0.05) }
.icon-btn--send { background:#141414; border-color:#141414; color:#fff; width:46px; height:46px; border-radius:12px }
.icon-btn--send:hover { background:#000 }
.icon-btn svg { width:19px; height:19px }   .icon-btn--send svg { width:21px; height:21px }

Inline SVG icons (all viewBox "0 0 24 24", fill="none", stroke="currentColor"):
  Plus   (aria-label "Add attachment", type=button): stroke-width 1.9, stroke-linecap round,
         <path d="M12 5v14M5 12h14"/>
  Mic    (aria-label "Use microphone", type=button): stroke-width 1.7, linecap+linejoin round,
         <rect x="9" y="2.5" width="6" height="11" rx="3"/>
         <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>
  Arrow  (aria-label "Send message", type=submit): stroke-width 1.9, linecap+linejoin round,
         <path d="M4 12h15M13 6l6 6-6 6"/>

═══════════════════════════════════════
9. PAGE-LOAD ENTRANCE ANIMATION
═══════════════════════════════════════
@keyframes rise { from { opacity:0; transform:translate3d(0,18px,0) }
                  to   { opacity:1; transform:translate3d(0,0,0) } }
@keyframes fade-in { from { opacity:0 } to { opacity:1 } }

.hero__bg { animation: fade-in 1.15s var(--ease) both }
.rise { animation: rise 0.9s var(--ease) both; animation-delay: calc(var(--i, 0) * 70ms) }

Add class="rise" plus an inline style="--i:N" to these elements, with these exact N values
(70ms apart, transform/opacity only so layout never shifts):
  logo <svg> ............ 0
  brand <span>JungleMind> 1
  <li> Help ............. 2
  <li> API .............. 3
  <li> Credits .......... 4
  <li> News ............. 5
  div.nav__cta .......... 6
  button.nav__toggle .... 6
  div.badge ............. 8
  h1.headline ........... 10
  p.sub ................. 12
  form.prompt ........... 14
  plus icon-btn ......... 16
  mic icon-btn .......... 17
  send icon-btn ......... 18

═══════════════════════════════════════
10. MOBILE MENU — @media (max-width: 900px)
═══════════════════════════════════════
.nav { display:flex; align-items:center; gap:12px; padding:18px 20px 0 }
  (flex, NOT grid — the panel goes position:fixed and leaves the flow)
.brand, .nav__toggle { position:relative; z-index:80 }
  (required: .nav creates a stacking context at z-index 70, and the panel's z-index 60 would
   otherwise paint over the logo and the hamburger, which have z-index auto)
.brand { font-size:21px; margin-right:auto }   .brand svg { width:25px; height:25px }
.btn-dark { padding:11px 17px; font-size:13.5px }
.nav__toggle { display:inline-flex }

FULL-SCREEN PANEL:
.nav__nav { position:fixed; inset:0; z-index:60; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:30px; padding:92px 28px 46px;
  background:#fafbf9;                      /* fully opaque — no ghosting of the hero */
  opacity:0; visibility:hidden; transform:translateY(-12px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease), visibility 0s linear 0.45s }
.nav__nav.is-open { opacity:1; visibility:visible; transform:translateY(0);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease), visibility 0s linear 0s }
  (Delaying visibility to the END of the close transition is what lets it fade out instead of
   vanishing instantly; on open the delay is 0.)

LINKS RISING OUT OF MASKS:
.nav__links { flex-direction:column; gap:2px; width:100%; max-width:340px }
.nav__links li { overflow:hidden }          /* the mask each link slides out of */
.nav__links a { display:block; padding:9px 0; text-align:center;
  font-size:clamp(26px, 7.4vw, 34px); font-weight:500; letter-spacing:-0.03em;
  opacity:0; transform:translateY(115%);
  transition: opacity 0.5s var(--ease), transform 0.7s var(--ease) }
.nav__links a:hover { opacity:0 }           /* stays hidden while closed */
.nav__nav.is-open .nav__links a { opacity:1; transform:translateY(0) }
.nav__nav.is-open .nav__links a:hover { opacity:0.55 }
Stagger — scoped to .is-open ONLY, so closing collapses everything at once (slow in, fast out):
.nav__nav.is-open .nav__links li:nth-child(1) a { transition-delay:0.12s }
.nav__nav.is-open .nav__links li:nth-child(2) a { transition-delay:0.18s }
.nav__nav.is-open .nav__links li:nth-child(3) a { transition-delay:0.24s }
.nav__nav.is-open .nav__links li:nth-child(4) a { transition-delay:0.30s }

.nav__links .rise { animation: none }
  (the page-load rise would fight the closed-menu hide on the same nodes)

.menu__cta { opacity:0; transform:translateY(16px);
  transition: opacity 0.5s var(--ease), transform 0.6s var(--ease), background 0.18s ease }
.nav__nav.is-open .menu__cta { opacity:1; transform:translateY(0); transition-delay:0.36s }

The panel contains the <ul class="nav__links"> followed by
<a class="btn-dark menu__cta" href="#">Request Access</a>

═══════════════════════════════════════
11. PHONE — @media (max-width: 640px)
═══════════════════════════════════════
.hero { min-height:560px }
.nav__cta { display:none }                  /* bar gets crowded; CTA moves into the menu */
.nav .menu__cta { display:inline-flex; width:100%; max-width:340px; padding:15px 22px;
  font-size:15px; border-radius:11px }
.stage { padding:16px 18px 22px; gap:16px }
.headline { font-size:clamp(26px, 7.6vw, 36px); max-width:13ch; letter-spacing:-0.03em }
.sub { font-size:14px; line-height:1.6; max-width:40ch }
.badge { font-size:12px; padding:6px 13px 6px 6px; gap:10px }
.badge__tag { font-size:12px; padding:3px 10px }
.prompt { border-radius:17px; padding:16px 14px 12px }
.prompt__input { font-size:16px; min-height:62px }
  (16px is a hard minimum — anything smaller makes iOS Safari zoom the page on focus)
.icon-btn { width:38px; height:38px }
.icon-btn--bare { width:32px }
.icon-btn--send { width:42px; height:42px; border-radius:11px }

═══════════════════════════════════════
12. LANDSCAPE PHONES
═══════════════════════════════════════
@media (max-height: 560px) and (orientation: landscape) {
  .hero { height:auto; min-height:100svh }
  .stage { padding-block:34px }
  .prompt__input { min-height:48px }
}

═══════════════════════════════════════
13. REDUCED MOTION
═══════════════════════════════════════
@media (prefers-reduced-motion: reduce) {
  .hero__bg video { display:none }                    /* poster still shows */
  .hero__bg, .rise { animation:none !important }
  .nav__nav, .nav__nav .nav__links a, .menu__cta, .nav__toggle .bar {
    transition-duration:0.01ms !important; transition-delay:0s !important }
  .nav__nav, .nav__nav .nav__links a, .menu__cta { transform:none !important }
}
Note: do NOT reset transform on .nav__toggle .bar — the bars must still rotate into the X.

═══════════════════════════════════════
14. JAVASCRIPT (vanilla, wrapped in an IIFE)
═══════════════════════════════════════
Get #menu-toggle and #site-menu; bail out if either is missing.
setMenu(open):
  - toggle.setAttribute('aria-expanded', String(open))
  - toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  - menu.classList.toggle('is-open', open)
  - document.body.classList.toggle('menu-open', open)
isOpen(): reads aria-expanded === 'true' (aria attribute is the single source of truth)
Behaviours:
  - click on toggle → setMenu(!isOpen())
  - click on ANY <a> inside the menu → setMenu(false)
  - keydown Escape while open → setMenu(false) then toggle.focus()
  - window resize, innerWidth > 900 && isOpen() → setMenu(false)
    (otherwise rotating to desktop while open strands the body scroll lock)

═══════════════════════════════════════
15. ACCEPTANCE CHECKS
═══════════════════════════════════════
- No horizontal scrollbar at 320, 375, 640, 768, 900, 1280, 1512 px.
- At 320px the logo and hamburger must not collide.
- Desktop (>900px): hamburger hidden, links in a row, headline on exactly 2 lines, subcopy on
  exactly 2 lines, bar CTA visible, in-panel CTA display:none.
- 641–900px: hamburger visible, bar CTA still visible, in-panel CTA display:none (exactly one CTA).
- ≤640px: bar CTA hidden, in-panel CTA visible, textarea computes to 16px.
- Menu open: logo and X render ABOVE the panel; page content is fully hidden behind it.
- The video fills the section edge to edge, uncropped, with nothing layered over it.
Build a single, standalone, production-ready HTML file (all CSS in one <style> in <head>, all JS in one <script> before </body>). No frameworks, no build step, no external assets except the Google Font and the video URLs given below. Name it index.html.Build a single, standalone, production-ready HTML file (all CSS in one <style> in <head>, all JS in one <script> before </body>). No frameworks, no build step, no external assets except the Google Font and the video URLs given below. Name it index.html.

It is ONE full-viewport hero section for an AI company called "JungleMind". Match every value below exactly.

═══════════════════════════════════════
1. DOCUMENT HEAD
═══════════════════════════════════════
- <html lang="en">, <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1">
- <title>JungleMind — The thinking engine shaped for what counts.</title>
- Google Fonts with preconnect to https://fonts.googleapis.com and https://fonts.gstatic.com (crossorigin):
  https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap
- Body font stack: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
- -webkit-font-smoothing: antialiased

═══════════════════════════════════════
2. DESIGN TOKENS (:root)
═══════════════════════════════════════
--ink: #111111
--muted: #5c5c5c
--card: rgba(248, 248, 246, 0.97)
--shell: 1120px
--ease: cubic-bezier(0.16, 1, 0.3, 1)     /* expo-out, used by every animation */

Global: *, *::before, *::after { box-sizing: border-box }
html, body { margin:0; padding:0; background:#eef2ee; overflow-x:hidden }
body.menu-open { overflow: hidden }        /* scroll lock while mobile menu is open */

═══════════════════════════════════════
3. BACKGROUND VIDEO — NO OVERLAY
═══════════════════════════════════════
Structure: <section class="hero"> > <div class="hero__bg"> > <video>

Video element attributes: autoplay muted loop playsinline preload="auto"
poster (URL-encoded, escape & as &amp; in the attribute):
https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260831_223518_f11bfa03-4e65-47e1-a4a7-30e42a7a8c2f.png&w=1920&q=85

<source type="video/mp4"> exact CloudFront URL:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260831_232706_43757be4-2250-4f09-8cd7-23aebbf147ad.mp4

(The clip is a 10s 16:9 1080p loop of a sunlit glasshouse jungle — monstera and palm leaves, pink lilies, a shallow stream, drifting sunbeams.)

CRITICAL:
- .hero__bg { position:absolute; inset:0; z-index:0 }
- .hero__bg video { position:absolute; inset:0; width:100%; height:100%; object-fit: fill }
  Use object-fit: FILL, not cover — the entire frame must span the section with no crop and no zoom.
- There must be NO gradient, tint, scrim, or overlay element of any kind on top of the video.
  Content sits directly on it. Do not add a .hero__wash or similar.

═══════════════════════════════════════
4. HERO SHELL
═══════════════════════════════════════
.hero { position:relative; height:100vh; height:100svh; min-height:620px; width:100%;
        overflow:hidden; display:flex; flex-direction:column }
.hero__inner { position:relative; z-index:2; display:flex; flex-direction:column;
               flex:1 1 auto; min-height:0 }

═══════════════════════════════════════
5. NAV BAR (desktop)
═══════════════════════════════════════
<header class="nav"> — position:relative; z-index:70 (must stay above the mobile panel);
width:100%; max-width:var(--shell); margin:0 auto; padding:26px 24px 0;
display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:16px

Three grid children in order: brand (left), <nav class="nav__nav" id="site-menu"> (centre),
<div class="nav__cta"> (right, justify-self:end). A 4th child, the hamburger button, is
display:none on desktop.

BRAND: <a class="brand" href="#"> — inline-flex; gap:10px; font-size:25px; font-weight:600;
letter-spacing:-0.02em; color:var(--ink); text-decoration:none. SVG is 30x30, display:block.
Logo SVG (viewBox "0 0 32 32", fill none, aria-hidden), two paths — an outlined diamond and a
solid inner diamond:
  <path d="M16 2.5 29.5 16 16 29.5 2.5 16 16 2.5Z" stroke="#141414" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M16 9.5 22.5 16 16 22.5 9.5 16 16 9.5Z" fill="#141414"/>
Wordmark text: JungleMind

LINKS: <ul class="nav__links"> — flex; align-items:center; gap:42px; list-style:none; margin:0; padding:0
Items in order: Help, API, Credits, News
a { font-size:15px; font-weight:400; color:#1a1a1a; text-decoration:none; opacity:0.9;
    transition:opacity 0.18s ease }  a:hover { opacity:0.55 }

CTA BUTTON .btn-dark — inline-flex centred; background:#141414; color:#fff; font-family:inherit;
font-size:14.5px; font-weight:500; padding:13px 22px; border:0; border-radius:9px;
white-space:nowrap; cursor:pointer; transition: background 0.18s ease, transform 0.18s ease
:hover { background:#000; transform:translateY(-1px) }
Label: Request Access

═══════════════════════════════════════
6. HAMBURGER BUTTON (base styles)
═══════════════════════════════════════
.nav__toggle { display:none; align-items:center; justify-content:center; width:44px; height:44px;
  margin-right:-10px; padding:0; border:0; background:transparent; cursor:pointer;
  -webkit-tap-highlight-color:transparent }
Markup: <button class="nav__toggle" id="menu-toggle" type="button" aria-label="Open menu"
  aria-expanded="false" aria-controls="site-menu"> containing
  <span class="nav__toggle-box" aria-hidden="true"><span class="bar bar--top"></span><span class="bar bar--bot"></span></span>

.nav__toggle-box { position:relative; display:block; width:22px; height:14px }
.nav__toggle .bar { position:absolute; left:0; width:100%; height:1.8px; border-radius:2px;
  background:#141414; transition: transform 0.55s var(--ease), width 0.45s var(--ease) }
.bar--top { top:0 }
.bar--bot { bottom:0; width:70% }              /* deliberately short — asymmetric detail */
.nav__toggle:hover .bar--bot { width:100% }
.nav__toggle[aria-expanded="true"] .bar--top { transform: translateY(6.1px) rotate(45deg) }
.nav__toggle[aria-expanded="true"] .bar--bot { width:100%; transform: translateY(-6.1px) rotate(-45deg) }

IMPORTANT specificity rule — write this exactly:
.nav .menu__cta { display: none }
The .nav prefix is required because .btn-dark { display:inline-flex } is declared later in the
sheet; without it the in-panel CTA leaks onto tablet widths and you get two CTAs.

═══════════════════════════════════════
7. CENTRE STACK
═══════════════════════════════════════
.stage { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; align-items:center;
  justify-content:center; text-align:center; padding:24px; gap:clamp(18px, 2.4vh, 26px) }

BADGE (pill): .badge { display:inline-flex; align-items:center; gap:14px;
  background:rgba(255,255,255,0.94); border:1px solid rgba(0,0,0,0.07); border-radius:999px;
  padding:7px 16px 7px 8px; font-size:13.5px; color:#4a4a4a }
.badge__tag { background:rgba(255,255,255,0.95); border:1px solid rgba(0,0,0,0.07);
  border-radius:999px; padding:3px 12px; font-size:13.5px; font-weight:500; color:#111 }
Content: <span class="badge__tag">Now</span><span>JungleMind 3.0 is here</span>

HEADLINE h1.headline { margin:0; font-size:clamp(32px, 5.7vw, 72px); line-height:1.03;
  font-weight:500; letter-spacing:-0.035em; max-width:20ch }
Exact text with a forced break:
  The thinking engine<br class="brk" /> shaped for what counts.

SUBCOPY p.sub { margin:0; font-size:clamp(14px, 1.35vw, 17.5px); line-height:1.65;
  font-weight:400; color:var(--muted); max-width:66ch }
Exact text, two sentences split by a forced break:
  JungleMind is an AI system that reasons through every problem carefully before answering.<br class="brk" />
  Plug into the API, launch in minutes, and ship reasoning you can really rely on.

FORCED-BREAK MECHANISM (reproduces the reference wrapping only on wide screens):
.brk { display: none }
@media (min-width: 900px) {
  .brk { display: inline }
  .stage .headline { max-width: none }
  .stage .sub { max-width: none }
}
The .stage prefix is required — the plain .headline/.sub max-widths are declared later and
would otherwise win.

═══════════════════════════════════════
8. PROMPT CARD (frosted glass)
═══════════════════════════════════════
<form class="prompt" onsubmit="return false;">
.prompt { width:min(790px, 100%); background:rgba(255,255,255,0.42);
  -webkit-backdrop-filter: blur(18px) saturate(1.15);
  backdrop-filter: blur(18px) saturate(1.15);
  border:1px solid rgba(0,0,0,0.06); border-radius:20px; padding:22px 20px 16px;
  text-align:left; box-shadow:0 18px 44px -26px rgba(0,0,0,0.28);
  margin-top:clamp(6px, 1.6vh, 16px) }
(The glass blur belongs to the CARD only — it must never be applied to the hero background.)

Visually-hidden label: <label class="sr-only" for="prompt-input">Ask JungleMind</label>
.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap }

<textarea id="prompt-input" class="prompt__input" rows="3" placeholder="How do rainforests survive?">
.prompt__input { width:100%; border:0; outline:0; resize:none; background:transparent;
  font-family:inherit; font-size:16.5px; line-height:1.5; color:var(--ink);
  min-height:clamp(56px, 11vh, 108px); padding:2px 4px }
.prompt__input::placeholder { color:#3d3d3d; opacity:0.72 }

.prompt__bar { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:10px }
  Left: circular "+" button. Right: <div class="prompt__right"> (flex, gap:12px) with a bare
  microphone button then a dark square send button.
.prompt__right { display:flex; align-items:center; gap:12px }

.icon-btn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px;
  border-radius:50%; border:1px solid rgba(0,0,0,0.1); background:#fff; color:#1a1a1a;
  cursor:pointer; padding:0; transition: background 0.18s ease }
.icon-btn:hover { background:#f1f1ef }
.icon-btn--bare { border:0; background:transparent; width:34px }
.icon-btn--bare:hover { background:rgba(0,0,0,0.05) }
.icon-btn--send { background:#141414; border-color:#141414; color:#fff; width:46px; height:46px; border-radius:12px }
.icon-btn--send:hover { background:#000 }
.icon-btn svg { width:19px; height:19px }   .icon-btn--send svg { width:21px; height:21px }

Inline SVG icons (all viewBox "0 0 24 24", fill="none", stroke="currentColor"):
  Plus   (aria-label "Add attachment", type=button): stroke-width 1.9, stroke-linecap round,
         <path d="M12 5v14M5 12h14"/>
  Mic    (aria-label "Use microphone", type=button): stroke-width 1.7, linecap+linejoin round,
         <rect x="9" y="2.5" width="6" height="11" rx="3"/>
         <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>
  Arrow  (aria-label "Send message", type=submit): stroke-width 1.9, linecap+linejoin round,
         <path d="M4 12h15M13 6l6 6-6 6"/>

═══════════════════════════════════════
9. PAGE-LOAD ENTRANCE ANIMATION
═══════════════════════════════════════
@keyframes rise { from { opacity:0; transform:translate3d(0,18px,0) }
                  to   { opacity:1; transform:translate3d(0,0,0) } }
@keyframes fade-in { from { opacity:0 } to { opacity:1 } }

.hero__bg { animation: fade-in 1.15s var(--ease) both }
.rise { animation: rise 0.9s var(--ease) both; animation-delay: calc(var(--i, 0) * 70ms) }

Add class="rise" plus an inline style="--i:N" to these elements, with these exact N values
(70ms apart, transform/opacity only so layout never shifts):
  logo <svg> ............ 0
  brand <span>JungleMind> 1
  <li> Help ............. 2
  <li> API .............. 3
  <li> Credits .......... 4
  <li> News ............. 5
  div.nav__cta .......... 6
  button.nav__toggle .... 6
  div.badge ............. 8
  h1.headline ........... 10
  p.sub ................. 12
  form.prompt ........... 14
  plus icon-btn ......... 16
  mic icon-btn .......... 17
  send icon-btn ......... 18

═══════════════════════════════════════
10. MOBILE MENU — @media (max-width: 900px)
═══════════════════════════════════════
.nav { display:flex; align-items:center; gap:12px; padding:18px 20px 0 }
  (flex, NOT grid — the panel goes position:fixed and leaves the flow)
.brand, .nav__toggle { position:relative; z-index:80 }
  (required: .nav creates a stacking context at z-index 70, and the panel's z-index 60 would
   otherwise paint over the logo and the hamburger, which have z-index auto)
.brand { font-size:21px; margin-right:auto }   .brand svg { width:25px; height:25px }
.btn-dark { padding:11px 17px; font-size:13.5px }
.nav__toggle { display:inline-flex }

FULL-SCREEN PANEL:
.nav__nav { position:fixed; inset:0; z-index:60; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:30px; padding:92px 28px 46px;
  background:#fafbf9;                      /* fully opaque — no ghosting of the hero */
  opacity:0; visibility:hidden; transform:translateY(-12px);
  transition: opacity 0.45s var(--ease), transform 0.45s var(--ease), visibility 0s linear 0.45s }
.nav__nav.is-open { opacity:1; visibility:visible; transform:translateY(0);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease), visibility 0s linear 0s }
  (Delaying visibility to the END of the close transition is what lets it fade out instead of
   vanishing instantly; on open the delay is 0.)

LINKS RISING OUT OF MASKS:
.nav__links { flex-direction:column; gap:2px; width:100%; max-width:340px }
.nav__links li { overflow:hidden }          /* the mask each link slides out of */
.nav__links a { display:block; padding:9px 0; text-align:center;
  font-size:clamp(26px, 7.4vw, 34px); font-weight:500; letter-spacing:-0.03em;
  opacity:0; transform:translateY(115%);
  transition: opacity 0.5s var(--ease), transform 0.7s var(--ease) }
.nav__links a:hover { opacity:0 }           /* stays hidden while closed */
.nav__nav.is-open .nav__links a { opacity:1; transform:translateY(0) }
.nav__nav.is-open .nav__links a:hover { opacity:0.55 }
Stagger — scoped to .is-open ONLY, so closing collapses everything at once (slow in, fast out):
.nav__nav.is-open .nav__links li:nth-child(1) a { transition-delay:0.12s }
.nav__nav.is-open .nav__links li:nth-child(2) a { transition-delay:0.18s }
.nav__nav.is-open .nav__links li:nth-child(3) a { transition-delay:0.24s }
.nav__nav.is-open .nav__links li:nth-child(4) a { transition-delay:0.30s }

.nav__links .rise { animation: none }
  (the page-load rise would fight the closed-menu hide on the same nodes)

.menu__cta { opacity:0; transform:translateY(16px);
  transition: opacity 0.5s var(--ease), transform 0.6s var(--ease), background 0.18s ease }
.nav__nav.is-open .menu__cta { opacity:1; transform:translateY(0); transition-delay:0.36s }

The panel contains the <ul class="nav__links"> followed by
<a class="btn-dark menu__cta" href="#">Request Access</a>

═══════════════════════════════════════
11. PHONE — @media (max-width: 640px)
═══════════════════════════════════════
.hero { min-height:560px }
.nav__cta { display:none }                  /* bar gets crowded; CTA moves into the menu */
.nav .menu__cta { display:inline-flex; width:100%; max-width:340px; padding:15px 22px;
  font-size:15px; border-radius:11px }
.stage { padding:16px 18px 22px; gap:16px }
.headline { font-size:clamp(26px, 7.6vw, 36px); max-width:13ch; letter-spacing:-0.03em }
.sub { font-size:14px; line-height:1.6; max-width:40ch }
.badge { font-size:12px; padding:6px 13px 6px 6px; gap:10px }
.badge__tag { font-size:12px; padding:3px 10px }
.prompt { border-radius:17px; padding:16px 14px 12px }
.prompt__input { font-size:16px; min-height:62px }
  (16px is a hard minimum — anything smaller makes iOS Safari zoom the page on focus)
.icon-btn { width:38px; height:38px }
.icon-btn--bare { width:32px }
.icon-btn--send { width:42px; height:42px; border-radius:11px }

═══════════════════════════════════════
12. LANDSCAPE PHONES
═══════════════════════════════════════
@media (max-height: 560px) and (orientation: landscape) {
  .hero { height:auto; min-height:100svh }
  .stage { padding-block:34px }
  .prompt__input { min-height:48px }
}

═══════════════════════════════════════
13. REDUCED MOTION
═══════════════════════════════════════
@media (prefers-reduced-motion: reduce) {
  .hero__bg video { display:none }                    /* poster still shows */
  .hero__bg, .rise { animation:none !important }
  .nav__nav, .nav__nav .nav__links a, .menu__cta, .nav__toggle .bar {
    transition-duration:0.01ms !important; transition-delay:0s !important }
  .nav__nav, .nav__nav .nav__links a, .menu__cta { transform:none !important }
}
Note: do NOT reset transform on .nav__toggle .bar — the bars must still rotate into the X.

═══════════════════════════════════════
14. JAVASCRIPT (vanilla, wrapped in an IIFE)
═══════════════════════════════════════
Get #menu-toggle and #site-menu; bail out if either is missing.
setMenu(open):
  - toggle.setAttribute('aria-expanded', String(open))
  - toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  - menu.classList.toggle('is-open', open)
  - document.body.classList.toggle('menu-open', open)
isOpen(): reads aria-expanded === 'true' (aria attribute is the single source of truth)
Behaviours:
  - click on toggle → setMenu(!isOpen())
  - click on ANY <a> inside the menu → setMenu(false)
  - keydown Escape while open → setMenu(false) then toggle.focus()
  - window resize, innerWidth > 900 && isOpen() → setMenu(false)
    (otherwise rotating to desktop while open strands the body scroll lock)

═══════════════════════════════════════
15. ACCEPTANCE CHECKS
═══════════════════════════════════════
- No horizontal scrollbar at 320, 375, 640, 768, 900, 1280, 1512 px.
- At 320px the logo and hamburger must not collide.
- Desktop (>900px): hamburger hidden, links in a row, headline on exactly 2 lines, subcopy on
  exactly 2 lines, bar CTA visible, in-panel CTA display:none.
- 641–900px: hamburger visible, bar CTA still visible, in-panel CTA display:none (exactly one CTA).
- ≤640px: bar CTA hidden, in-panel CTA visible, textarea computes to 16px.
- Menu open: logo and X render ABOVE the panel; page content is fully hidden behind it.
- The video fills the section edge to edge, uncropped, with nothing layered over it.