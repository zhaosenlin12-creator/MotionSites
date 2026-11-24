Build one standalone file, index.html, that reproduces the Novaryn homepage section exactly. Output only that file. Do not redesign, restyle, rename classes, rewrite copy, swap the video, add sections, or simplify the motion. Keep every measurement, color, selector, keyframe, delay, easing, and script behavior below.

Page
- Title: Novaryn — Acceleration Through Vision™
- Language: en
- Viewport: width=device-width, initial-scale=1, viewport-fit=cover
- One screen on desktop: a top editorial band plus a video stage that fills the remaining height. The video is flush to the bottom of the viewport. Side inset is 20 design units. Top corners of the video are slightly rounded; bottom corners are square.
- Background of the page: #f7f8f3. Text and logo: #25251d.
- Font: @font-face family "Novaryn Sans", src url(assets/novaryn-sans.ttf) format("truetype"), font-weight 300 900, font-display block. Body stack: "Novaryn Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif. Antialiased, geometricPrecision.
- Design unit --u is min(100vw / 1280, 100svh / 800), with 1vh as the fallback where svh is unsupported. Desktop positions are absolute and sized in --u against a 1280×800 reference. The top band is 345u tall.

Desktop composition, all positions absolute inside .top unless noted
- A 4u-wide vertical hairline sits on the horizontal center, full band height. Gradient left to right: #f5f6f1 0–25%, #f3f4ef 25–75%, #f5f6f1 75–100%.
- Logo, top-left, 20u from the left and 21u from the top, z-index 90. Mark is an inline SVG, viewBox 0 0 39 26, two filled paths: "M0 26V0h6.9l18.2 17.2V0H32v26h-6.6L6.9 8.7V26Z" and "M34 20h5v6h-5Z". Word "Novaryn" at 34.5u, weight 350, line-height 1, letter-spacing -0.003em. A 6.4u four-point star sits as the registered mark: path "M5 0 6.25 3.75 10 5 6.25 6.25 5 10 3.75 6.25 0 5 3.75 3.75Z". Link aria-label "Novaryn home", href "#".
- Menu button, top-right, 20u from the right and top, height 35u, gap 16.5u, no background or border, font inherited. Label is a two-layer stack: "Menu" and "Close". Icon is a 36u SVG, viewBox -18 -18 36 36, nine dots of radius 2.3 on a circle (angles every 45°, radius 15) plus a center dot radius 2.45. A CSS X is hidden until open. Button aria-label "Open navigation menu", aria-controls "site-menu", aria-expanded false.
- Pill "See Further", href "#contact", id contact. Dark #25251d, fully rounded, text #edefe8, weight 350, size max(12px, 16.5u), letter-spacing -0.02em. Position right 20u, top 144.5u, height 41u, padding 4u 19.5u 0 20.8u.
- Headline, left 20u, top 207.6u, size 62.14u, weight 450, letter-spacing -0.015em, line-height 60u, nowrap. Two lines: "Acceleration" then "Through Vision" with a ™ at 0.83em, raised -6.3u, margin-left 2.1u. id vision.
- Lead, right 20u, top 228u, width 520u, padding-left 21u, size max(13px, 20.5u), weight 400, letter-spacing 0.004em, line-height 1.3171. A 2.4u rule, minimum 1.5px, color #1c1c1c, sits on the left of the paragraph. Three nowrap lines, exactly: "We imagine with pathfinders to discover frontiers" / "unfold worlds and shape technologies beyond physical" / "boundaries." id systems.

Video stage
- main.media, id research, flex 1, min-height 0, margin 0 20u, border-radius 5u 5u 0 0, overflow hidden, isolation isolate.
- Fallback fill: radial-gradient(120% 90% at 52% 45%, #334a5f 0%, #142333 48%, #05090f 100%).
- The only media is this video, id hero, autoplay, muted, loop, playsinline, preload auto, object-fit cover, object-position 50% 45%, inset 0. Aria-label: "Photonic lens focusing neural light into a violet beam". Use this exact src and no local video or poster:
  https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261005_183134_2d4380fd-64a0-459c-a1eb-add70a3e1a7b.mp4
- If prefers-reduced-motion: reduce, remove autoplay and pause the video.
- News bar over the video, centered, bottom 30u, width 800u, min-height 56u, radius 2u, padding 8u 8u 8u 20u, background rgba(189,191,177,0.985), backdrop-filter blur(24px) saturate(1.1). Copy: "Novaryn presents the blueprint for the next era of AI infrastructure." Weight 350, size max(12px, 17.5u), letter-spacing -0.02em. Pill "View Next", href "#", width 118u, height 40u, text #d2d3c7, size max(12px, 16.75u).

Entrance, once, only when reduced motion is off
- Before first paint add class motion-pending on html. Remove it after the sequence, with a 3000ms fallback.
- While pending, hide the divider (scaleY 0 from the top), logo, menu, CTA, lead, and news. Logo and menu start 8px up. CTA and lead start 10px down. Each headline line starts clipped from the bottom and 0.72em down. News starts translated 10px down and scaled 0.96 on X.
- Then Web Animations, fill both, then cancel and clear the class:
  divider 820ms delay 20ms, easing cubic-bezier(.65,0,.35,1), scaleY 0 to 1
  logo 560ms delay 90ms, cubic-bezier(.16,1,.3,1)
  menu 520ms delay 170ms, same settle easing
  "Acceleration" 790ms delay 250ms, cubic-bezier(.22,1,.36,1), clip-path reveal upward
  "Through Vision™" 840ms delay 360ms, same reveal
  lead 620ms delay 570ms, settle
  See Further 520ms delay 730ms, from translateY(10px) scale(.985)
  news 720ms delay 920ms, reveal easing, from translate 0 10px and scale .96 1
- The video does not enter. It is already the stage.

Orbit menu
- Accent #7b3cff. Opening adds html.menu-open and locks overflow. The wash is rgba(247,248,243,.90) with blur(16px) saturate(.9), and expands as a circle from the menu glyph: clip-path from circle(0) to circle(radius) over 1.2s cubic-bezier(.62,0,.18,1). Closing reverses over 1s cubic-bezier(.7,0,.25,1) with a 250ms delay, then visibility hidden after 1.3s.
- "Menu" slides up and "Close" slides in, 800ms cubic-bezier(.65,0,.2,1). The dot icon fades out immediately. The X rotates from -90deg scale(.3) to 0 scale(1), delayed 450ms, 900ms cubic-bezier(.16,1,.3,1).
- Six destinations, angles and notes:
  01 About, 315°, "Who we are", #top
  02 Vision, 45°, "Why we exist", #vision
  03 Systems, 90°, "What we shape", #systems
  04 Research, 135°, "How we learn", #research
  05 Journal, 225°, "Notes from the frontier", #research
  06 Contact, 270°, "Begin together", #contact
- Also draw non-link dots at 0°, 180°, and the center. Center radius collapses to 0 once html.menu-settled, 1700ms after open (0ms if reduced motion).
- Desktop: dots leave the glyph and land on a circle centered at 50% width and 50% height + 18px. Radius is max(110, min(20% of width, 37% of (height − 190))). Active dots are 14px, idle dots 7px, center 12px. Spokes draw outward in ink at 50% opacity and inward in accent. Labels sit past the outer spoke, weight 350, letter-spacing -0.025em, size clamp from about 22px to 40px. Numbers are 11px, weight 500, tracking 0.08em. Labels blur in from 8px and travel along their angle, staggered from 0.95s by 0.06s per item.
- Hover or focus a destination: that label and its dot turn accent, the dot scales to 1.5, both spokes turn accent and the inward spoke scales to full length, everything else drops to about 38% opacity. Caption at the lower left changes from "Index / 06 destinations" / "Hover a point to preview" to "Index / 0N — 06" and that item's note. Caption is 12px, index 10px uppercase tracking 0.14em, fading in at 1.2s.
- A circular preview sits in the middle, diameter 1.24× the orbit radius, background #e9eae3, clip-path circle opening at 1.05s. Images, in order, cover the circle and crossfade: assets/menu-about.webp, assets/menu-vision.webp, assets/menu-systems.webp, assets/menu-research.webp, assets/menu-journal.webp, assets/menu-contact.webp. About is visible first.
- Click the wash, the logo, a destination, or press Escape to close. Tab cycles the trigger and the six links. Resize recomputes the orbit. Logo and menu stay above the wash (z-index 90; menu overlay z-index 50). On tablet and below, html.menu-open .top uses isolation auto so the logo and trigger stay above the wash.
- Below 680px the preview, spokes, and caption are hidden. Links stack in a left column from the glyph: order 0°, 315°, 45°, 90°, 135°, 225°, 270°, 180°, center. Titles use clamp(25px, 8vw, 34px).

Responsive, desktop rules stay untouched above these breakpoints
- Apply the tablet rewrite at max-width 959.98px, or max-height 599.98px, or portrait. --u becomes clamp(0.85px, 100vw / 1280, 1px). Body overflow visible. Page height auto with min-height 100dvh. Outer margin --gx clamp(20px, 2.6vw, 28px). Column gap --gc clamp(40px, 6.5vw, 72px).
- The band becomes a 2-column grid: logo | menu, empty | See Further, headline | lead. Min-height 36svh. Headline size clamp(34px, (50vw − gx − gc/2) / 7.3, 96px), line-height 0.9655. Lead wraps, size clamp(16px, 0.55vw + 12px, 19px), line-height 1.42, max-width 30em. Video min-height max(300px, 50svh). News width min(800u, 100% − 2gx). Enlarge hit areas with a -6px pseudo inset, not the drawn size.
- At max-width 679.98px, gx is 20px. Grid becomes logo | menu, headline full width, lead full width, then See Further on the right. Band min-height 44svh. Headline clamp(32px, (100vw − 40px) / 7.3, 54px). Lead 16.5px, max-width 32em. Video min-height max(300px, 46svh). News is inset 12px on the left, right, and bottom, width auto, padding 10px 8px 10px 14px, gap 12px.
- prefers-reduced-motion: reduce disables transitions and animations. Focus-visible is a 2px ink outline, offset 3px, accent when inside the menu.

Implement this as one HTML document with the CSS and the three scripts inline: the pre-paint motion class, the entrance timeline, the reduced-motion video pause, and the orbit layout and interaction. Preserve the exact copy, SVG paths, CloudFront URL, asset paths, timings, and breakpoints.