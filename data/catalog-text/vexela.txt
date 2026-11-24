Build one standalone HTML document that is the entire Vexel hero screen. Output only that file. Reproduce the markup, CSS, SVG paths, type, motion, and responsive rules exactly. Do not restyle, simplify, rename classes, or substitute a different background.

Page
- Language English. Title: Vexel — Your next customer starts with a hello.
- Viewport: width=device-width, initial-scale=1, viewport-fit=cover. Theme color #01061a.
- One screen, no page scroll. Column, centered. Background #01061a with a horizontal sky gradient: #00061a 0%, #01071b 22%, #01071a 45%, #010718 62%, #010614 80%, #020511 100%.

Type
- Font family "Google Sans", then "Product Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif.
- Embed Google Sans with font-display:block:
  weight 400 from assets/google-sans-400.woff2
  weight 500 from assets/google-sans-500.woff2
- Antialiased, geometricPrecision, normal kerning.

Scale
- Reference frame is 1280×800. Every layout number is multiplied by --u. At 1280×800, --u is 1px.
- Default: --u = min(100dvh/800, max(100vw/1280, min(100vw/640, .75px))). Fall back to vh where dvh is unsupported.
- Colors: ink #ffffff; nav rgba(238,242,255,.9); subhead rgba(226,233,255,.74); link rgba(212,236,255,.77); hairline rgba(255,255,255,.19); button #ffffff with ink #0a0a0a.

Masthead, centered
- Wordmark link, aria-label "Vexel home", href "#". White filled SVG, viewBox "588 40.5 103.5 23.5", height max(23.5u, 17px), shifted left by 0.5u. Paths, in order:
  M588.6 40.8H594.9L601.4 56.6L606.5 40.8H612.6L604.2 63.5H597.8Z
  M612.8 40.8H630.5V45.2H619.2V49.8H628.3V54.4H619.2V58.9H631.5V63.5H612.8Z
  M631.3 40.8H637.9L642.5 47.4L646.5 40.8H653.1L646.4 52L653.6 63.5H647.1L642.5 56.4L638.3 63.5H631.4L638.8 52Z
  M653.6 40.8H669.6V63.5H653.6V58.9H664.3V54.4H657V49.8H664.3V45.2H653.6Z
  M672.4 40.8H677.6V58.9H690.5V63.5H672.4Z
- Top padding: safe-area-inset-top plus 40.5u.
- Hairline under the logo: width max(284u, 252px), 1px, margin-top 24u.
- Nav width matches the hairline. Three links, space-between, margin-top 17.4u, side padding 8.9u: Platform #platform, Company #company, Contact #contact. Size max(15u, 13px), tracking -0.033em, color the nav token, hover #fff.

Copy, centered
- A flexible gap above the copy flexes at 82.98 and never shorter than 24u.
- Headline, weight 400, size max(68u, 34px), line-height 0.9559, tracking -0.0279em, nowrap. Two masked lines:
  line 1: Your next customer
  line 2: starts with a hello.
  Line 2 tracking -0.0294em and shifted right 2.6u. Each line is a span.l containing a span.li.
- Subhead: "Make the first move. We’ll help with what follows." Join the words inside each sentence with U+00A0 no-break spaces. The only normal space is the space after the period, so that is the only wrap point. Size max(21u, 15px), tracking -0.005em, margin-top 18.98u, color the subhead token, text-wrap balance.
- Button "Start a conversation" to #contact. Width max(216u, 196px), height max(46u, 44px), radius max(4.5u, 4px), weight 500, size max(17u, 15px), tracking -0.0265em, margin-top 25.64u. Hover fill #e8eef7 and a 4u ring of rgba(120,200,255,.12).
- Link "Discover the platform" to #platform, size max(14.8u, 13px), tracking -0.051em, margin-top 20.55u. Beside it, a 0.68em by 0.85em stroke arrow, viewBox "0 0 11 12.6", stroke 1.45, round caps: M5.5 .4V12M1 7.5L5.5 12L10 7.5. On hover the arrow moves down 0.12em.

Background video
- Use this URL and no other asset. Do not download it and do not replace it with a local file or poster image:
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_182549_18378239-da8f-48a7-9666-d6e0a6a88561.mp4
- Video element: autoplay, muted, loop, playsinline, no controls, decorative.
- The field fills the remaining height (flex 318.68, min-height 160u) and is a size container. The video is absolutely centered, width auto, pointer-events none. Its horizon, 50.463% down the frame, sits 36.4u above the bottom of the copy. Height is the larger of fitting the field width at the artwork ratio 1619:971 and reaching the bottom edge: max(100cqw * 971/1619, (100cqh + 36.4u) / 0.49537 + 1px). Without container units, fall back to max(60vw, 105vh). Fade the top 4% of the video to transparent with a mask.

Focus
- Remove the default outline. Visible focus on the wordmark, nav links, and discover link is a 2px #7fd4ff outline offset 4px. The button uses offset 3px.

Responsive
- Tablet, 600px to 1099.98px wide and at least 541px tall: hold --u at min(100dvh/800, 1px, max(100vw/1280, 100dvh/1190, .86px)). Cap the video field at 48% of the screen height. Enlarge tap targets with negative margin so nothing moves: nav links 14px 8px, discover link 12px 10px.
- Portrait under 600px: same scale model, but use svh. Keep the two headline lines nowrap. Headline size is max(26px, min(68u, (100vw - 48px) / 8.235)). Subhead floor 16px, size min(21u, 3.345vw), line-height 1.25, overflow-wrap break-word. Hero side padding 24px. Hairline and nav width min(max(284u, 252px), 100vw - 32px). Field max-height 48%. Same enlarged tap targets.
- Landscape shorter than 540px: keep the desktop proportions and lower the floors — logo 13px, hairline and nav 210px, nav 11px, headline 28px, subhead 12px, button 150×34px at 12.5px, discover 11px, gap min 14u, field min 120u.
- Coarse pointer in that short landscape: grow tap targets only.
- At 359px and below, outside the portrait block, allow the headline to wrap at 30px.
- prefers-reduced-motion: no transitions, and do not run the entrance.

Entrance, once per load, only if Web Animations and matchMedia exist and reduced motion is off
- Add class "intro" immediately. If the entrance has not started within 3500ms, remove it.
- While intro is on: wordmark, nav items, subhead, button, and discover link start at opacity 0. Hairline starts at scaleX(0). Each headline line is clipped at its baseline and its inner span starts at translateY(104%).
- Wait for document.fonts.ready and for the video loadeddata event, but never longer than 900ms, then start.
- Distances scale with k, the logo height divided by 23.5, clamped from 0.65 to 1.
- Wordmark: from opacity 0 and translateY(-6k px), delay 60ms, 900ms, cubic-bezier(0.22, 1, 0.36, 1).
- Hairline: scaleX 0 to 1, delay 180ms, 1000ms, cubic-bezier(0.7, 0, 0.2, 1).
- Nav: center link first at 420ms, then the outer links at 490ms. Each from opacity 0 and translateY(-4k px), 700ms, the same quint easing.
- Headline lines rise from translateY(104%) to none, 1100ms, cubic-bezier(0.16, 1, 0.3, 1). First line delay 200ms, second 290ms.
- Subhead rises 10k px, delay 700ms, 850ms, quint.
- Button rises 12k px from scale 0.975, delay 860ms, 900ms, expo.
- Discover link rises 6k px, delay 1040ms, 700ms, quint.
- Arrow starts 5k px above and settles, delay 1120ms, 820ms, expo.
- All animations use fill both. When every animation finishes, remove intro, cancel the animations, and if focus is not inside the page, toggle the page display none for one reflow so the masks do not leave a separate GPU layer. Then set data-intro="done" on the document element.