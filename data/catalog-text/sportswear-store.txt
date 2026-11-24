# OVRA "Every Workout": full recreation brief

Build a single-file, three-section landing page for a fictional athletic knitwear label called OVRA. It is a light, misty-orchid sportswear site: a framed hero with a cut-out athlete, a "WORKOUT" photo collage, and a "Fresh Fits" card with giant scrolling stencil type. Everything below is exact. Use one HTML file with inline CSS and JS, no frameworks, no libraries.

## 1. Assets (use these URLs exactly, never re-host)

| Asset | URL | Native size | How it is used |
|---|---|---|---|
| Hero athlete cut-out (transparent PNG served as WebP) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_120532_a504ce9e-4820-4193-8b7c-9b1abb1f45b9.png&w=1528&q=85 | 1528 × 2048 | One img element. Young man with short twisted hair, clear wraparound sport glasses, oversized orchid ribbed knit full-zip with a tall funnel collar, framed head to hips. |
| Collage sheet (2×2 grid) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261114_120327_e42374b9-471e-4799-9dca-07fe8b4d6536.png&w=2048&q=85 (the inner url is https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_120327_e42374b9-471e-4799-9dca-07fe8b4d6536.png, URL-encoded) | 2048 × 2048 | Background-image crops for the three collage cards, the hero video card and the three hero avatars. |
| Marquee sheet (2×2 grid) | https://images.higgs.ai/?default=1&output=webp&url= + URL-encoded https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261114_120324_90c4bb35-2fb2-47a8-aa6e-14a7c92e2214.png + &w=1744&q=85 | 1744 × 2336 | Background-image crops for the four looks that cycle in the marquee card. |

Build the two sheet URLs in JS as 'https://images.higgs.ai/?default=1&output=webp&url=' + encodeURIComponent(innerUrl) + '&w=<native width>&q=85'.

### Sheet cells (pixel rectangles x, y, w, h inside each sheet)

| Element | Sheet | Cell x,y,w,h | Focal point (fx, fy) | Content |
|---|---|---|---|---|
| Collage centre card | collage | 29, 28, 982, 982 | 0.5, 0.2 | Side profile of the same athlete, looking right, orchid funnel collar, orchid-to-pale-lilac studio gradient |
| Collage left card | collage | 1036, 28, 982, 982 | 0.5, 0.3 | Woman's torso and legs in a lilac fleece half-zip and joggers, hand in pocket |
| Collage right card | collage | 29, 1036, 982, 982 | 0.5, 0.45 | Crossed forearms in plum fleece sleeves with lilac fingerless gloves |
| Hero video card | collage | 1036, 1036, 982, 983 | 0.5, 0.62 | Three athletes sitting and crouching in lilac, orchid and plum knit sets |
| Avatar 1 | collage | 1452, 1186, 130, 130 | centre | Woman's face (ponytail) |
| Avatar 2 | collage | 1200, 1146, 135, 135 | centre | Man's face (clear glasses) |
| Avatar 3 | collage | 1690, 1150, 135, 135 | centre | Woman's face (lilac beanie) |
| Marquee look 1 (start) | marquee | 0, 0, 866, 1159 | 0.5, 1 | Group of four athletes in orchid, lilac and plum half-zips, top 40% empty lilac gradient |
| Marquee look 2 | marquee | 878, 0, 866, 1159 | 0.5, 1 | Woman full length in lilac ribbed half-zip and joggers |
| Marquee look 3 | marquee | 0, 1172, 866, 1164 | 0.5, 1 | Man full length in plum fleece set holding a lilac duffel |
| Marquee look 4 | marquee | 878, 1172, 866, 1164 | 0.5, 1 | Woman full length in orchid cropped knit zip top and leggings |

Crop logic (run on load and on resize) for every element with a cell: let ew, eh be the element's box; s = max(ew / cw, eh / ch); background-size = (sheetW × s)px (sheetH × s)px; background-position-x = −(cx × s) − (cw × s − ew) × fx; background-position-y = −(cy × s) − (ch × s − eh) × fy; background-repeat no-repeat; fallback background-color #CDB4D6.

## 2. Font

One family: Archivo (Google Fonts variable font, axes wdth 62–125 and wght 100–900), latin subset, self-hosted as a WOFF2 (https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLg.woff2), declared with font-weight 100 900 and font-stretch 62% 125%, font-display swap. Fallback stack: system-ui, -apple-system, "Segoe UI", sans-serif. Every piece of text on the page is Archivo; weight and width vary per element as listed below.

### Stencil lettering

The stencil look (hero WORKOUT!, card WORKOUT, both marquee rows) is ordinary Archivo with one thin cut through each letter, made with a CSS mask on each letter's own span: a linear gradient that is black everywhere except a transparent gap 0.068em wide (±0.034em) centred at a set percentage of the letter box. Cut direction and position per letter: W vertical at 50%; O vertical 50%; R vertical 29%; K vertical 27%; U vertical 50%; T horizontal at 21% (just under the bar); F vertical 29%; E vertical 29%; S vertical 50%; H vertical 29%; I horizontal 52%; Y horizontal 50%; N vertical 29%; X horizontal 50%; C vertical 52%; A horizontal 62%; the exclamation mark has no cut. Vertical means a 90° gradient (gap runs top to bottom), horizontal means 180°.

## 3. Colour tokens

| Token | Value | Use |
|---|---|---|
| sky-top | #E4D0EA | Hero gradient top |
| sky-mid | #EBDDEF | Hero gradient at 45% |
| sky-bot | #F8F1F9 | Hero gradient bottom |
| bezel | #EFE6F1 | Page background, notch fill |
| panel | #F4EEF6 | Collage panel |
| panel2 | #F3E9F4 | Marquee panel |
| ink | #26132A | Headlines, nav, light-pill text |
| muted | #6E5873 | Body copy |
| pill | #2D1833 | Dark pills, lock button, LEVEL UP tag |
| line | #C9B6CF | Outline of the collage word |
| marquee type | #CDBFD3 | Giant marquee rows |
| avatar ring | #EADDEE | 2u border around avatars |
| collage empty card | gradient #8E6A99 → #D9C4E0 (top to bottom) | Centre card before its photo strips in |
| marquee card | gradient #BA8FC7 0%, #D8C0E1 55%, #E7D7EC 100% | Card base under the looks |

## 4. Scaling system

Desktop design frame: 1440 × 956. Define u = min(100vw / 1440, 100svh / 956) and uw = 100vw / 1440. Every size and position is written as a number × u; offsets from the left and right page edges for the nav and hero side blocks use uw so they hug the edges on wide screens. Below 821 px width switch to the phone frame: u = uw = 100vw / 390. Body: margin 0, background bezel, overflow-x hidden, antialiased.

Each section is a block (height 956u) containing one rounded panel: margin 0 16u, height 924u, border-radius 36u, overflow hidden. The hero and collage sections have 16u top padding; the marquee has 16u top and bottom padding. Page order: hero, collage, marquee. No footer.

## 5. Hero (desktop, all positions relative to the hero panel)

Panel background: linear-gradient(180deg, #E4D0EA 0%, #EBDDEF 45%, #F8F1F9 100%).

Notch: an SVG (viewBox 0 0 560 61, preserveAspectRatio none) centred at the top of the panel (top −1px), 560u × 61u, fill bezel, path "M0 0 C34 0 46 6 60 22 L78 44 C88 56 98 61 116 61 L444 61 C462 61 472 56 482 44 L500 22 C514 6 526 0 560 0 Z". It reads as a trapezoid tab cut down into the panel with soft rounded shoulders.

Logo: the text OVRA centred horizontally, top 10u, 33u, weight 380, font-stretch 122%, letter-spacing 0.2em (with 0.2em left padding to re-centre), line-height 1, ink. Sits inside the notch.

Left nav: top 33u, left 40uw, links SHOP, MEN, WOMEN, TRENDING, gap 30u, 13.5u, weight 470, letter-spacing −0.01em, ink.

Right nav: top 17u, right 41uw, row with gap 31u: SEASONAL, ACCESSORIES (same type as left nav), then a dark pill "SIGN  IN / UP" (two spaces after SIGN; 44u tall, padding 0 22u, fully rounded, background pill, white text 13.5u weight 470, margin-right −27u so it nearly touches the next item), then a 44u round lock button (background pill, 2u border in sky-top) holding a 15u white outline padlock icon (16×16 viewBox: rounded rect x3 y7 w10 h7.5 r2, shackle path M5.2 7V5a2.8 2.8 0 0 1 5.6 0v2, a 0.9 radius dot at 8,10.8; stroke white 1.4).

Rays: an SVG filling the panel (viewBox 0 0 1408 924, preserveAspectRatio none), z-index 1, six white lines at 75% opacity, 1.1px, non-scaling stroke, all starting at 704,610 and ending at 0,300; 0,470; 90,924; 1408,300; 1408,470; 1318,924.

Athlete: wrapper fills the panel (z-index 2); the img is absolutely positioned, left 50% with margin-left −581u, top 92u, width 1161u (height auto), transform-origin 50% 0. Final framing: hair top at about 350u from the page top, chest and funnel collar filling the bottom, cut by the panel's bottom edge.

Headline (h1, z-index 4): spans the panel width, top 120u, centred, 64.5u, line-height 0.93, weight 760, letter-spacing −0.035em, uppercase, ink. Two lines, each a block that clips its overflow and never wraps: line 1 "GEAR UP EVERY SEASON", line 2 "EVERY " followed by "WORKOUT!" in the stencil style (weight 360, normal width, letter-spacing −0.01em). Every character is its own inline-block span.

CTAs: centred row at top 270u, gap 8u: dark pill "SHOP NOW" and white pill "EXPLORE ALL" (white background, ink text), both 44u tall, padding 0 21u, 13.5u weight 470.

Avatars: left 40uw, top 578u, three 45u circles with a 2u #EADDEE border, each overlapping the next by 13u (margin-right −13u), filled with the avatar crops.

Body copy: left 40uw, top 668u, width 262u, 14.2u, line-height 1.52, muted, letter-spacing −0.01em, first-line indent 51u. Text: "Soft knit layers that move with every single rep. Our orchid winter drop keeps you warm on dark runs and late gym sessions."

Video card: right 42uw, top 617u, 280u × 187u, radius 16u, overflow hidden, filled with the video-card crop. Centred play button: 48u circle, background rgba(45,24,51,0.72) with a 6px backdrop blur, white triangle 14u (path M0 0 12 7 0 14Z), nudged 2u right.

## 6. WORKOUT collage (desktop)

Panel background panel (#F4EEF6). Inside, a 1408u-wide frame centred horizontally; positions relative to it.

| Element | Left | Top | Size | Radius | Layer |
|---|---|---|---|---|---|
| Left card | 80u | 135u | 218 × 287u | 14u | 1 |
| Outlined word "WORKOUT" | 12u | 305u | 287u type | — | 2 |
| Right card | 1079u | 395u | 212 × 281u | 14u | 1 |
| Centre card | 514u | 135u | 380 × 534u | 24u | 3 |
| Top-right paragraph | 1058u | 122u | width 250u | — | 4 |
| Bottom-left paragraph | 80u | 665u | width 205u | — | 4 |

Outlined word: weight 300, normal width, line-height 1, transparent fill with a 1.6u stroke in #C9B6CF, no wrapping. After fonts load (and on resize), set its letter-spacing so the word spans exactly 1384u: spacing = (1384u − natural width) / 6. The centre card hides "RK"; the stroke of W runs over the left card and U over the right card because the word sits above the side cards and below the centre card.

Paragraphs: 14u, line-height 1.43, muted, letter-spacing −0.01em. Top right: "Warm hands, loose shoulders. Our knit half-zips hold heat without extra bulk, so you stay quick through the coldest sessions" (no final full stop). Bottom left: "Brushed fleece for every body—made for icy mornings and warm evenings."

## 7. Fresh Fits marquee (desktop)

Panel background panel2 (#F3E9F4).

Rows: two absolutely positioned rows at left 0, top 146u and 646u, z-index 1, 140u, line-height 1, weight 380, font-stretch 112%, colour #CDBFD3, uppercase, no wrap. Row 1 text "FRESH FITS FOR", row 2 "YOUR NEXT WORKOUT", each repeated six times; every letter is a stencil span, every space and the gap between repeats is a 0.45em inline-block.

Card: centred, top 73u, 503u × 699u, radius 24u, overflow hidden, z-index 2, base gradient as in the token table. Inside, four absolutely filling layers with the four marquee looks (look 1 visible, the rest at opacity 0). Above them an arch: left/right 16u, top 16u, height 360u, top corners rounded 235u, background linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.1) 60%, transparent), z-index 3. Above that the card head (z-index 4), centred, top 59u: a "LEVEL UP" tag (23u tall, padding 0 14u, fully rounded, background pill, text #F3E6F6, 12u weight 470, letter-spacing 0.01em), then 14u below it a two-line title, 41u, line-height 0.93, weight 720, letter-spacing −0.035em, uppercase, ink: "WITH THE LATEST IN" / "WORKOUT" in stencil (weight 360) followed by " WEAR". Same per-letter spans and clipping lines as the hero headline.

## 8. Motion (measured frame by frame from the reference; reproduce exactly)

Add a js class to html immediately. Elements marked hidden-until-animated (both navs, rays, CTAs, avatars, hero copy, video card, side cards, collage word, both paragraphs, LEVEL UP tag) start at opacity 0 only when that class is present. A 6 s failsafe timer shows them all if the intro never starts. With prefers-reduced-motion: reduce, show everything at once in its final state and skip all motion.

Helpers. Fade = Web Animations opacity 0 → 1, fill both, default easing cubic-bezier(.25,.6,.3,1). Strip reveal = a CSS mask on the element: repeating-linear-gradient(180deg, black 0 to a px, transparent a px to P px) where P is the band pitch and a = max(0.6, f × P) grows from 0 to P, so every band grows downward from its own top edge; mask-position-y = phase mod P; f follows the given curve via requestAnimationFrame; remove the mask at the end. Letter wipe = each letter animates clip-path inset(0 0 100% 0) → inset(0 0 0 0) and opacity 0.35 → 1 over 110 ms, easing cubic-bezier(.3,.6,.4,1), letters started one after another at a fixed step; letters start clipped and invisible.

Hero load timeline (t = 0 once the athlete image has decoded, max 4 s wait, and fonts are ready):

| Start | Duration | What | Curve |
|---|---|---|---|
| 0 ms | 550 ms | Both navs fade in | default |
| 0 ms | 650 ms | Athlete strip reveal; pitch 83u, phase 98u (desktop) or 50u / 90u (phone); athlete held at translateY(−236u) (phone −150u), which shows him from head to hips | cubic-bezier(.3,0,.2,1) |
| 1020 ms | 620 ms | Athlete slides from translateY(−236u) to 0, no scaling, to the chest-up framing | cubic-bezier(.3,0,.15,1) |
| 1100 ms | 600 ms | Rays fade in | default |
| 1130 ms | 550 ms | Video card fades in | default |
| 1240 ms | 350 ms | Avatars and body copy fade in | default |
| 1370 ms | 500 ms | CTA pills fade in | default |
| 1540 ms | 18 ms step | Headline line 1 letter wipe | as above |
| 1570 ms | 40 ms step | Headline line 2 letter wipe | as above |
| line 2 end + 150 ms | — | Once only: hide the letters of WORKOUT! from the end back to "WOR" at 45 ms each, hold 450 ms, show them again at 50 ms each | visibility toggles |

Smooth scrolling (wheel only; touch, keys and the scrollbar stay native): intercept wheel events (non-passive, ignore ctrl+wheel), add deltaY to a target clamped to the scrollable range (line mode × 40, page mode × viewport height) and each animation frame move the current position toward the target by 1 − 0.9^(dt / 16.67), scrollTo it, and stop within 0.5 px. The hero simply scrolls away; nothing scales or rises on its own.

Collage trigger: when the collage top is above 18% of the viewport height (and its bottom below 30%), or the whole section is on screen: the centre photo layer (hidden until now, so the empty gradient card shows while scrolling in) strips in over 470 ms, pitch 40u, phase 0, cubic-bezier(.3,0,.2,1); at the same moment the side cards, outlined word and both paragraphs fade in over 500 ms with cubic-bezier(.45,0,.35,1). Runs once.

Marquee rows, every frame: d = −(marquee section top) × 0.45 + drift. With w = one repetition's width (row scrollWidth / 6) and o = −6u, row 1 is translated by mod(d, w) − w + o and row 2 by o − mod(d, w), using translate3d. Scrolling down moves row 1 right and row 2 left; when the section is settled at the top of the viewport "FRESH" and "YOUR" start at the left edge.

Marquee trigger: when the section top is above 15% of the viewport (bottom below 40%), or the whole section is on screen: LEVEL UP fades in over 150 ms, title line 1 wipes from 150 ms at 18 ms per letter and line 2 from 180 ms at 40 ms per letter. 400 ms after the title finishes, the rows begin drifting (drift grows by 0.05u per ms) and the look cycle starts: every 1270 ms the next look is raised above the current one, made visible and strip-revealed over 200 ms (pitch 34u, phase 0, cubic-bezier(.3,0,.3,1)), then the previous look is hidden; it loops 1 → 2 → 3 → 4 → 1 forever.

## 9. Phone layout (below 821 px; u = 100vw / 390)

Panels: margin 0 8u, radius 24u. Hero: height max(820u, 100svh), top padding 8u, panel fills it. Notch 200u × 34u; logo top 6u, 19u. Left nav at top 20u, left 16u, gap 14u, 11u type, showing only SHOP and MEN. Right nav at top 8u, right 10u, showing only the lock button at 34u (icon 13u). Headline top 70u, 28.5u (still two lines). CTAs top 148u, pills 38u tall, 11.5u type, padding 0 16u. Athlete: top 111u, width 620u, margin-left −310u. Avatars at left 14u, 150u from the panel bottom, 34u circles overlapping by 10u. Body copy hidden. Video card at right 12u, bottom 16u, 128u × 86u, radius 12u, play button 32u with a 10u triangle.

Collage: section 760u, panel 744u, frame full width. Top paragraph at 16u, 28u, width 300u, 13u type. Left card 14u, 150u, 108 × 164u, radius 12u. Centre card 130u, 190u, 230 × 324u, radius 18u. Right card 24u, 500u, 126 × 168u, radius 12u. Word at 8u, 318u, 80u type, 1px stroke, fitted to 370u. Bottom paragraph at 172u, 560u, width 180u, 13u type.

Marquee: section 676u with 8u padding, panel 660u. Rows 76u type at top 22u and 552u. Card top 118u, 300u × 417u, radius 18u, head at top 34u, tag 20u tall with 10u type, title 27u with 9u top margin, arch corners 140u.

## 10. Acceptance checklist

- At 1440 × 956 the hero matches: logo in the notch, headline 64.5u spanning about 788u on line 1, pills at 270u, athlete hair top near 350u, avatars and copy bottom left, video card bottom right, six faint rays.
- Load plays in order: navs and strips (0–0.65 s), hold, slide down (1.02–1.64 s), rays/video card/avatars/copy/pills, headline wipe, then one WOR backspace and retype.
- The athlete never scales; he only slides down 236u.
- Wheel scrolling glides; the collage photo strips in only after the section settles; side cards and word fade together.
- The outlined WORKOUT spans exactly 28u to 1412u of the page and is hidden under the centre card in the middle.
- Marquee rows move in opposite directions with scroll, the title wipes in, then looks swap every 1.27 s with a 0.2 s strip reveal while the rows drift.
- No horizontal scroll at 390 px; reduced motion shows everything at rest.