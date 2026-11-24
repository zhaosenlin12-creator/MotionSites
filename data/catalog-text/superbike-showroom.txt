# HalvenMotos — Superbike Paint Carousel Hero: exact recreation prompt

Build a single-file, one-screen hero for a fictional superbike maker called **HalvenMotos**. A huge white word, **RIDE OUT**, stands behind one large, sharp motorcycle in exact side profile. Two smaller copies of the same bike in other paints peek in from the left and right edges, blurred and higher up. The whole page is painted in the colour of the bike in the centre: deep at the top, saturated behind the word, very pale at the floor. Every 2 seconds, on an arrow click, or on a drag, the row slides one step: the next bike grows, drops to the ground line and sharpens, the old one shrinks, rises and blurs, and the room changes colour, all on one progress value. A translucent spec row sits along the bottom. The word, dots, nav, arrows and spec row never move during a change.

Use plain HTML, CSS and vanilla JavaScript, one WebGL canvas for the bikes, and the Web Animations API for the load-in. Use no libraries. Everything below is taken from the finished source; follow it value for value.

Contents: 1 assets · 2 fonts · 3 page and colours · 4 stacking and markup · 5 responsive tiers and geometry · 6 word · 7 background and dots · 8 nav · 9 arrows · 10 spec row · 11 bike textures · 12 renderer · 13 carousel maths · 14 timing and easing · 15 autoplay · 16 arrows behaviour · 17 drag · 18 load sequence · 19 accessibility and reduced motion · 20 acceptance checklist.

---

## 1. Assets

There is exactly one image on the page: a 3840 × 2160 transparent PNG sheet holding the same motorcycle four times in a 2 × 2 grid, facing right, in four paints.

| Item | Exact value |
|---|---|
| Source URL | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261122_131809_0c1477f1-f13a-4b07-84e4-6ad1f33c15c5.png` |
| URL to load (WebP, about 1.2 MB, keeps transparency) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261122_131809_0c1477f1-f13a-4b07-84e4-6ad1f33c15c5.png&w=3840&q=85` |
| Fallback | If the WebP URL fails to load, load the source PNG URL. |
| Loading | A JavaScript Image with crossOrigin set to "anonymous" (both hosts send Access-Control-Allow-Origin: *), so it can be read on a canvas and uploaded to WebGL. |
| Preconnect | `https://images.higgs.ai`, with crossorigin. |

Bike bounds on the sheet, in 3840 × 2160 sheet pixels. If the decoded image has another width, multiply every number by decoded width ÷ 3840 when sampling.

| Slide | Paint name | Page colour | Left | Top | Right | Bottom |
|---|---|---|---|---|---|---|
| 0 (first shown) | Magenta satin | #782956 | 92 | 122 | 1749 | 992 |
| 1 | Deep sapphire | #033878 | 1972 | 121 | 3636 | 996 |
| 2 | Cocoa copper | #593429 | 91 | 1113 | 1748 | 1992 |
| 3 | Violet pearl | #5b44a7 | 1970 | 1111 | 3636 | 1991 |

The generated sheet carries two small stray marks on each tank. They are painted out at load (method in section 11). Each mark is a line segment in sheet pixels with a half-width:

| Slide | Main mark: x0, y0 → x1, y1 | Half-width | Faint mark: x0, y0 → x1, y1 | Half-width |
|---|---|---|---|---|
| 0 | 1041, 265.5 → 1120, 294.5 | 7.5 | 1053, 255 → 1109, 275.5 | 3.6 |
| 1 | 2921, 266 → 3002, 294.5 | 7.5 | 2940, 257.5 → 2984, 275 | 3.6 |
| 2 | 1035, 1258.5 → 1118, 1288.5 | 7.5 | 1058, 1249.5 → 1114, 1271.5 | 3.6 |
| 3 | 2921, 1260.5 → 3002, 1289 | 7.5 | 2939, 1252 → 2995, 1272.5 | 3.6 |

All icons are inline SVG (path data in sections 8, 9 and 10). There are no videos.

## 2. Fonts

| Family | File | Weights | Loading |
|---|---|---|---|
| Albert Sans (variable, latin subset) | `https://fonts.gstatic.com/s/albertsans/v4/i7dOIFdwYjGaAMFtZd_QA1ZbYFc.woff2` | font-weight range 400 to 600 | One @font-face, format woff2, font-display swap. Preload it, or embed it as base64. |

The Google Fonts stylesheet for the same family is `https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400..600&display=swap`. The stack everywhere is "Albert Sans", Arial, sans-serif. Weights used: 400 (logo, labels), 435 (panel title), 450 (RIDE OUT), 530 (View Full Specs), 540 (Contact Now), 560 (spec values).

## 3. Page, head and colours

Head: language en; charset utf-8; viewport width=device-width, initial-scale=1, viewport-fit=cover; title "HalvenMotos | Ride Out"; meta description "HalvenMotos superbikes in four satin pearl paints: magenta satin, deep sapphire, cocoa copper and violet pearl."; an empty icon link (href "data:,"). A one-line script in the head adds the class js to the html element.

| Token | Value | Use |
|---|---|---|
| magenta | #782956 | html and body background, hero background before the script runs |
| ink | #1d222b | text on white and on the panel |
| muted | #4b4f57 | spec labels |
| panel | rgba(246,246,246,.94) | spec row background |
| arrow | #ffe100 | both arrow buttons |
| arrow ink | #16140a | arrow glyphs |
| divider | rgba(29,34,43,.11) | 1 px lines between specs |
| dot | rgba(255,255,255,.29) | dot grid |
| word and logo | #ffffff | RIDE OUT, HalvenMotos® |

Global rules: border-box sizing with zero margin and padding on every element; html and body are 100% high; body has overflow hidden, ink colour, antialiased smoothing and text-size-adjust 100%. Buttons inherit font and colour, have no border or background, a pointer cursor and a transparent tap highlight. The focus-visible outline is 2 px solid white with a 3 px offset (ink colour inside the panel). All SVGs are display block.

## 4. Stacking and markup

The main element is the hero: position relative, 100% wide, 100vh high and then 100svh where supported, overflow hidden, isolation isolate. It has aria-roledescription "carousel" and aria-label "HalvenMotos paint colours". Inside it, in this order:

| Layer | Element | z-index | Notes |
|---|---|---|---|
| Dot grid | div, aria-hidden | 0 | no pointer events |
| Word | h1 holding a visually hidden span "Ride out" and an aria-hidden SVG | 1 | no pointer events, not selectable |
| Bikes | one canvas filling the hero, aria-hidden | 2 | no pointer events |
| Drag surface | transparent div filling the hero, aria-hidden | 3 | touch-action pan-y, cursor grab (grabbing during a drag), not selectable |
| Nav | header with menu button, logo paragraph, Contact Now button | 4 | the header has no pointer events, its buttons do |
| Arrows | two buttons: "Previous colour", "Next colour" | 5 | centred on their point with translate(−50%, −50%) |
| Spec row | section labelled by its h2 | 4 | |
| Status | visually hidden paragraph, aria-live polite | none | |

Because the word is under the canvas, the bikes always cover the lower middle of the letters. This layering is the signature of the design: never put the word in front, and never separate it from the bike.

Exact visible text:

| Element | Text |
|---|---|
| Logo | HalvenMotos® (the ® is a superscript) |
| Nav button | Contact Now |
| Word | RIDE OUT |
| Panel title | Bike Spec Details |
| Panel button | View Full Specs |
| Spec 1 | Range (per tank) / 310 km |
| Spec 2 | Top Speed / 299 km/h |
| Spec 3 | Acceleration / 2.9 seconds |
| Spec 4 | Cooling / Liquid |
| Spec 5 | Engine Layout / 1200 cc V4 |
| Spec 6 | Seat Capacity / 2 seats |

The menu, Contact Now and View Full Specs buttons are visual only and open nothing. The spec values are the same for every slide and do not animate.

## 5. Responsive tiers and geometry

W and H are the hero's client width and height. Recompute everything on every resize with a ResizeObserver.

**Tier choice**

| Tier | Condition |
|---|---|
| tall | W ÷ H is less than 1.2 |
| short | W ÷ H is at least 1.2 and (H ≤ 500 or W < 900) |
| wide | everything else |

**Modifier classes on the hero**

| Class | Condition |
|---|---|
| cols-3 | tall and W ≥ 560, or short and W < 840 |
| narrow | tall and W < 360 |
| roomy | tall and W < 560 and H ≥ 720 |
| tablet | tall and W ≥ 580 and H ≥ 900 |

**Design frame** (all numbers in a 1440 × 810 frame)

| Thing | Value |
|---|---|
| Word box | x 22.5, top 159, width 1357, cap height 198.5 |
| Centre bike | centre x 710, centre y 427, width 762, ground line (tyre bottom) 628 |
| Row step (centre to centre) | 776 |
| Side scale | 740 ÷ 1240 = 0.596774 |
| Side blur | Gaussian sigma 4.5 px |
| Arrows | centres x 229 and x 1197.5, y 433, diameter 36 |

The CSS variable --u is min(W ÷ 1440, H ÷ 810) pixels in the wide tier and 1 px in the other two. Set it, and the tier and classes, before measuring the panel's top edge (panelTop).

**Wide tier.** u = min(W/1440, H/810). Horizontal offset ox = W/2 − 720u. Vertical offset oy = (H − 810u) × 0.5. Then room = panelTop − 8 − (oy + 628u); if room is negative, add it to oy. Every frame x becomes ox + x·u, every y becomes oy + y·u, every length is multiplied by u. The arrow diameter is max(28, 36u).

**Short tier.** navBottom = 46 and band = panelTop − 46. u = min(W/1440, (band − 10) ÷ 478). oy = 46 + (band − 478u)/2 − 150u. ox and all mappings are as in the wide tier.

**Tall tier.** navBottom is 84 on tablet, otherwise 58. band = panelTop − navBottom. wordK = (W − 14) ÷ 1357. bikeW = 0.92W. overlap = 0.34 × 198.5 × wordK (the bike begins a third of the way down the word). bikeH = 0.527 × bikeW. The arrow diameter d is 54 on tablet, otherwise 44 when H ≥ 720, otherwise 38. gap = 12 + d (this never scales). k = min(1, (band − 16 − gap) ÷ (overlap + bikeH)). top = navBottom + (band − (overlap + bikeH)·k − gap)/2. Then:

| Output | Value |
|---|---|
| Word | width 1357·wordK·k, centred horizontally, top as above, cap height 198.5·wordK·k |
| Bike width | bikeW·k |
| Bike centre | x W/2, y top + overlap·k + bikeH·k/2 |
| Ground | top + (overlap + bikeH)·k |
| Step | W/2 − 0.022W + (bikeW·k × 0.596774)/2 |
| Arrows | x W/2 ± 0.85d, y ground + 12 + d/2 |

The canvas backing store is W and H multiplied by min(devicePixelRatio, 2), rounded.

## 6. The word RIDE OUT

The h1 is absolutely positioned at the word box computed above. Its SVG fills it, with viewBox 0 0 1357 198.5, preserveAspectRatio none and overflow visible. Text is Albert Sans 450, white.

Before the font loads, show a single text element: "RIDE OUT", x 0, y 198.5, font-size 283. Once the font has loaded (wait for 450 100px "Albert Sans"), replace it with seven text elements, one per letter, so each letter's ink fills an exact box:

1. On a 2D canvas set the font to 450 100px Albert Sans, measure "T", and set size = 100 × 198.5 ÷ its actualBoundingBoxAscent.
2. At that size, measure each letter. Its horizontal scale sx is (right − left) ÷ (actualBoundingBoxLeft + actualBoundingBoxRight), using the table below.
3. Each text element has that font-size and the transform: translate by (left − 22.5 + actualBoundingBoxLeft × sx, 198.5), then scale (sx, 1).

| Letter | R | I | D | E | O | U | T |
|---|---|---|---|---|---|---|---|
| Left | 22.5 | 214.5 | 282.5 | 495 | 760 | 1010 | 1212 |
| Right | 185 | 245.5 | 464 | 640 | 978 | 1187 | 1379.5 |

## 7. Background and dot grid

The hero background is a vertical linear gradient that is rewritten on every animation frame from the current colour. The current colour is a straight RGB interpolation between slide floor(pos) and slide floor(pos) + 1 (wrapping through four slides) by the fractional part of pos.

There are twelve stops. For a negative amount t, the stop colour is the colour × (1 + t), a shade. For a positive amount, it is a mix from the colour towards white by t. Round each channel.

| Frame row | 0 | 70 | 120 | 200 | 248 | 300 | 380 | 450 | 530 | 610 | 700 | 810 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Amount | −0.34 | −0.26 | −0.20 | −0.08 | 0 | 0.08 | 0.21 | 0.36 | 0.53 | 0.66 | 0.755 | 0.82 |

Each frame row maps to a screen pixel by piecewise-linear interpolation through four anchors: row 0 → 0; row 159 → the word's top; row 628 → the bike's ground; row 810 → H. Clamp to 0…H and use pixel stop positions. This keeps the colour saturated behind the word and pale under the tyres at every screen size.

Dot grid: a layer from top 0, full width, with height = word top + 0.75 × cap height. Its background image is a circular radial gradient of rgba(255,255,255,.29) from 0 to 1.15 px, fading to transparent at 1.75 px. With s = bike width ÷ 762, the tile is max(22, 45.4s) wide by max(20, 41s) high. Background position x is (W/2 − tile width/2) modulo tile width, and y is 31s − tile height/2. A mask, linear-gradient from black at 25% to transparent at the bottom, fades it out (include the -webkit- prefix).

## 8. Nav

The header is absolute at the top, full width, 72u high (56 px in the short and tall tiers). "Nu" below means N × the --u variable.

| Property | Wide | Short | Tall | Tall + narrow | Tall + tablet |
|---|---|---|---|---|---|
| Menu left / top | 31.5u / 15.5u | 14 / 9 px | 16 / 13 px | left 10 px | 24 / 20 px |
| Menu size | max(30px, 40u) circle | 32 px | 34 px | 34 px | 46 px |
| Menu glyph | max(10px, 12u) × max(8px, 10u) | same | same | same | 15 × 12 px |
| Logo centre y | 35.8u | 25 px | 30 px | 30 px | 43 px |
| Logo size | max(15px, 22.2u) | 16 px | 17 px | 14 px, tracking .01em | 25 px |
| Contact right / top | 40u / 17u | 14 / 10 px | 16 / 14 px | right 10 px | 24 / 21 px |
| Contact size | max(92px, 127u) × max(28px, 39u) | 98 × 30 px | 98 × 32 px | 86 × 32 px | 134 × 44 px |
| Contact text | max(11px, 12.6u) | 11.5 px | 11.5 px | 11 px | 14.5 px |

The menu is a white circle with a centred glyph: viewBox 0 0 12 10, path "M0 1.2h12M0 5h12M0 8.8h12", stroke currentColor, stroke-width 1.5. The logo is absolute at left 50%, translated −50% both ways, margin-left −1.5u, weight 400, white, line-height 1, tracking .032em, no wrapping; its ® is .72em, line-height 0, vertical-align .38em, tracking 0. Contact Now is a white pill (radius 99 px), weight 540, tracking .024em, no wrapping.

## 9. Arrow buttons

Two yellow (#ffe100) circles of the diameter and centre from section 5. Each has an invisible pseudo-element 6 px larger on every side as a bigger hit area. The glyph is an SVG at 40% of the button, viewBox 0 0 16 16, no fill, stroke currentColor, width 1.7.

| Button | Path |
|---|---|
| Previous | "M15 8H1.6M7 2.4 1.4 8 7 13.6" |
| Next | "M1 8h13.4M9 2.4 14.6 8 9 13.6" |

They have no hover effect. They stay still while the bikes pass underneath.

## 10. Spec row

The section is absolute, horizontally centred with left 50% and translateX(−50%), z-index 4, with the panel colour. Its head is a flex row (space-between, centred, 12 px gap) holding the h2 (line-height 1, weight 435, tracking −.013em) and the white pill button (radius 99 px, shadow 0 2px 8px rgba(20,20,30,.07), weight 530, tracking .006em). The list below has no bullets and is a CSS grid.

**Panel by tier**

| Property | Wide | Short | Tall | Tall + roomy | Tall + tablet |
|---|---|---|---|---|---|
| Bottom | 29u | 8 px | max(10px, safe-area inset bottom) | same as tall | 24 px |
| Width | min(100% − 48px, max(1313u, 880px)) | min(100% − 20px, 960px) | 100% − 20px, max 780 px | same as tall | 100% − 40px, max 960 px |
| Padding | 16u 29u 13.5u 32u | 6 10 7 px | 10 12 11 px | 16 15 18 px | 24 26 28 px |
| Radius | max(12px, 17u) | 12 px | 14 px | 17 px | 22 px |
| Head height | max(24px, 30u) | 26 px | 30 px | 30 px | 42 px |
| Title size | max(13px, 18u) | 13 px | 15 px | 17 px | 23 px |
| Button | max(100px, 135u) × max(24px, 30u), text max(11px, 12.5u) | 100 × 24, text 11 | 108 × 28, text 11.5 | 116 × 32, text 12 | 146 × 42, text 14.5 |
| List margin-top | 20u | 4 px | 7 px | 14 px | 24 px |

**Columns**

| Tier | Grid columns | Row gap |
|---|---|---|
| Wide | six tracks, each minmax(max-content, Nfr) with N = 186, 223, 223, 212, 229, 176 | none |
| Short | six tracks of minmax(max-content, 1fr) | none |
| Short + cols-3 | three tracks of minmax(max-content, 1fr) | 3 px |
| Tall | two tracks of minmax(0, 1fr) | 7 px (16 px roomy) |
| Tall + cols-3 | three tracks of minmax(0, 1fr) | 12 px (16 px roomy, 28 px tablet) |

**Each item** is a two-column grid (icon, then text at max-content), vertically centred, position relative. Every item after the first has a 1 px full-height divider on its left; hide the divider on the first item of each row, and give that item 2 px left padding (3u in the wide tier for the first item). The text is a definition list with line-height 1.2; labels are muted, weight 400, and never wrap; values are weight 560, tracking .008em, and never wrap.

| Property | Wide | Short | Tall | Tall + narrow | Tall + roomy | Tall + tablet |
|---|---|---|---|---|---|---|
| Icon width | max(15px, 18u) | 15 px | 16 px | 16 px | 16 px | 22 px |
| Icon gap | 15u | 6 px | 8 px | 6 px | 8 px | 12 px |
| Item padding | 2u 6u 2u 47u | 1 4 1 9 px | 1 2 1 12 px | left 8 px | as tall | left 20 px |
| Label | max(11px, 12.9u), tracking −.02em | 11 px | 11.5 px | 11 px, tracking 0 | 12.5 px (11 px if also narrow) | 15 px |
| Value | max(11.5px, 14.5u) | 11.5 px | 13 px | 13 px | 14.5 px | 18 px |
| Value margin-top | 7.5u | 1 px | 2 px | 2 px | 3 px | 5 px |

**Icons** have no fill, stroke currentColor, width 1.55, round caps and joins, 100% width, auto height.

| Spec | viewBox | Shapes |
|---|---|---|
| Range | 0 0 20 22 | path "M10 20.5S2 13.4 2 8.6a8 8 0 0 1 16 0c0 4.8-8 11.9-8 11.9z"; path "M10 13.6s-4.2-2.2-4.2-5.2a4.2 4.2 0 0 1 8.4 0c0 3-4.2 5.2-4.2 5.2z"; circle 10, 8.5, radius .9 |
| Top speed | 0 0 20 22 | path "M10 11.5V2.8a8.7 8.7 0 1 1-6.6 3z" |
| Acceleration | 0 0 20 22 | path "M7.2 2h7.3l-2.4 6.6h5.2L6.8 20.4l2.1-7.8H3.3z" |
| Cooling | 0 0 20 22 | circle 10, 11, radius 2; path "M10 9C6 7 6.2 2.6 9.4 2.4c3.4-.2 3.5 4 .6 6.6zM12 11c2-4 6.4-3.8 6.6-.6.2 3.4-4 3.5-6.6.6zM10 13c4 2 3.8 6.4.6 6.6-3.4.2-3.5-4-.6-6.6zM8 11c-2 4-6.4 3.8-6.6.6C1.2 8.2 5.4 8.1 8 11z" |
| Engine layout | 0 0 22 22 | path "m8.6 14.4-6-7.3 4.6-3.8 3.8 4.6 3.8-4.6 4.6 3.8-6 7.3M4.5 9.4l4.6-3.8M17.5 9.4l-4.6-3.8"; circle 11, 15.8, radius 3.6; circle 11, 15.8, radius .9 |
| Seat capacity | 0 0 20 22 | path "M5.4 12.2V5.6A3.6 3.6 0 0 1 9 2h2a3.6 3.6 0 0 1 3.6 3.6v6.6"; path "M5.4 12.2h9.2l2 3.2a1.5 1.5 0 0 1-1.3 2.3H4.7a1.5 1.5 0 0 1-1.3-2.3zM7.4 17.7v2.6M12.6 17.7v2.6" |

## 11. Building the four bike textures

Do this once, when the sheet has loaded, for each of the four bikes.

**Cut and solidify.** Draw the bike's box onto a canvas of the box's size and read its pixels. For alpha a: below 8 becomes 0, otherwise min(255, (a − 6) × 255 ÷ 236). This removes haze and makes the body fully solid.

**Paint out the two tank marks**, reading from an untouched copy of the surrounding pixels for each mark. Let u be the unit vector along the segment and n the signed perpendicular distance of a pixel from it (positive below the line). For each pixel within 18 px of the segment's bounding range:

1. End fade: out = max(−3 − along, along − length − 3, 0), where along is the distance along the segment from its start. Band weight w = clamp((half + 1.5 − |n|) ÷ 2.5, 0, 1) × max(0, 1 − out ÷ 4).
2. Project the pixel onto the segment's centre line. From there step (half + 2) to each side along the perpendicular. On each side, average three bilinear samples taken at −3, 0 and +3 px along u.
3. The fill is an interpolation from the upper sample to the lower one by clamp((n + half) ÷ (2 × half), 0, 1). Mix it over the original RGB by w. Leave alpha alone.

**Compose the texture.** A 2048 × 1024 canvas (power of two, for mipmaps). Constants: bike left 134, bike width 1780, ground y 960. First draw four soft elliptical shadows, each a radial gradient of rgba(10,7,10) with alpha A at the centre, 0.55A at 45% and 0 at the edge:

| Shadow | Centre x | Centre y | Radius x | Radius y | A |
|---|---|---|---|---|---|
| Broad | 1024 | 954 | 1010 | 58 | .30 |
| Core | 1024 | 956 | 720 | 34 | .26 |
| Rear tyre | 134 + 0.158 × 1780 | 957 | 300 | 26 | .85 |
| Front tyre | 134 + 0.843 × 1780 | 957 | 300 | 26 | .85 |

Then, with high-quality smoothing, draw the bike 1780 wide, its height in proportion, with its bottom edge on y 960. The texture's scaling centre is y = 960 − (628 − 427) × 1780 ÷ 762, about 490.5. Scaling about this shared centre line is what makes a shrinking bike rise and a growing bike land.

## 12. Renderer

Get a WebGL context with alpha, premultiplied alpha and no antialiasing. Upload the four canvases premultiplied, clamped to the edge, with linear-mipmap-linear minification, generated mipmaps, and 4× anisotropic filtering where the extension exists. Blend with ONE, ONE_MINUS_SRC_ALPHA. Draw each bike as one textured quad in CSS pixel coordinates, on a transparent clear.

Blur is done in the fragment stage:

* When sigma is at most 0.06 px, take one texture sample with a mip bias of −0.35.
* Otherwise grow the quad by 2.2 × sigma on every side (extending the texture coordinates to match) and average 28 samples on a Vogel spiral. For sample i: f = i + 0.5, r = √(f ÷ 28), angle = f × 2.399963, weight = e^(−2r²), offset = (cos, sin) × r × radius. The radius is 2 × sigma, converted to texture coordinates separately in x and y. The mip bias is log2 of max(1, sigma × device pixel ratio × 0.55).

If WebGL is unavailable, use a 2D canvas and draw the same rectangles with a canvas blur filter of sigma × device pixel ratio. If the WebGL context is lost, prevent the default, stop drawing and autoplay, and rebuild on restore.

## 13. Carousel maths: one progress value

A single number, pos, drives everything. Whole numbers are bikes at rest. It is unbounded in both directions, so the loop is endless; the slide shown at index i is i modulo 4, always positive.

For every index i near pos (nearest whole number ± reach, where reach = ceil((W/2 + 0.4 × bike width) ÷ step) + 1):

| Property | Formula |
|---|---|
| Offset o | i − pos |
| Amount t | min(1, absolute o) |
| Scale s | 1 + (0.596774 − 1) × t |
| Centre x | bike centre x + o × step |
| Screen pixels per texture pixel q | bike width × s ÷ 1780 |
| Quad | left = centre x − 1024q; top = bike centre y − 490.5q; size 2048q × 1024q |
| Blur sigma | 4.5 × (bike width ÷ 762) × t |

Cull quads more than 20 px off screen. Draw the farthest from the centre first, so the centre bike is on top. Position, size, rise, blur, shadow and background colour therefore change together, with no separate animations.

The order is magenta → sapphire → cocoa copper → violet → magenta. At first load magenta is centred, sapphire waits on the right and violet on the left. "Next" brings the right-hand bike to the centre, so the row moves left.

## 14. Timing and easing

Every change takes **1400 ms** on **cubic-bezier(0.51, 0, 0, 0.98)**: a slow start, a very fast middle and a long soft landing. Evaluate the curve in JavaScript by bisecting for the parameter (24 iterations). Each frame: x = clamp((now − start) ÷ 1400, 0, 1) and pos = from + (to − from) × ease(x), redrawn with requestAnimationFrame. At x = 1 snap to the whole number, mark settled, and run a queued click if there is one.

You also need the inverse of the same curve (for a given eased value, find its time) for drag release.

## 15. Autoplay

| Rule | Behaviour |
|---|---|
| Wait | Each bike rests for 2000 ms, then "next" runs with the normal 1400 ms move, forever. |
| First wait | Begins 1000 ms after the load-in starts, so the first change begins 3000 ms after reveal. |
| Restart | Every arrow click, drag, tap or return to the tab restarts the full 2000 ms once the bike is at rest. |
| Pause | While a pointer is held or dragging, while a button has keyboard focus (focus-visible, so mouse clicks don't pause it), and while the document is hidden. |
| Off | With prefers-reduced-motion, or while there is no renderer. |

The timer is only ever scheduled when a bike is at rest. React to visibilitychange, to the reduced-motion query changing, and to focusin and focusout (re-checking focusout one task later).

## 16. Arrow behaviour

A click at rest moves from the nearest whole number by −1 or +1. A click during a move is stored as one queued step, replacing any earlier queued step, and runs when the move lands; it never jumps. Clicks are ignored during a drag. Buttons work with Enter and Space.

## 17. Drag and swipe

1. On pointer down (primary mouse button, touch or pen; one pointer at a time): stop any move, remember its destination, clear the queue and the autoplay timer, and capture the pointer.
2. The drag becomes active after 5 px of movement that is more horizontal than vertical. Vertical gestures are left to the browser.
3. While active, pos = starting pos − dx ÷ step, redrawn on every pointer move. The bike follows the finger 1:1 and can cross several bikes. Keep a trail of the last 90 ms of samples.
4. On release, speed is the trail's dx ÷ dt in px/ms, or 0 if the last move is at least 90 ms old. The target is the nearest whole number. If the absolute speed is over 0.45 and the pointer was not cancelled, it is the next whole number in the flick's direction (ceiling for leftwards, floor for rightwards).
5. Join the curve instead of starting a new one. remaining = min(1, absolute (target − pos)); dir = the sign of (target − pos); run a move from target − dir to target whose start time is now − inverse-ease(1 − remaining) × 1400. The motion continues from exactly where the finger let go, with no jump.
6. A tap with no drag resumes the interrupted move's destination, or stays on the nearest bike.

Treat pointerup, pointercancel and lostpointercapture as a release.

## 18. Load sequence

1. The hero starts with the class pending, which (only when html has the js class) holds the word, canvas, nav, arrows and panel at opacity 0. The magenta gradient and dots are visible immediately.
2. Lay out at once. In parallel, load the font (then fit the word and lay out again) and the sheet (then build textures and start the renderer).
3. When both have settled, reveal on the next animation frame. A failsafe reveals after 6000 ms regardless.
4. The reveal removes pending and plays, once, a Web Animation from opacity 0 with translate 0 16px to opacity 1 with translate 0 0. It lasts 850 ms with cubic-bezier(.22,1,.36,1), fill backwards, using the translate property (not transform) so centring transforms survive. The delays are: word 0, bikes 60, nav 120, both arrows 150, panel 150 ms. The whole load-in finishes in 1000 ms.

There are no hover effects, parallax or other animations.

## 19. Accessibility and reduced motion

* The h1's accessible name is "Ride out"; decorative layers are aria-hidden; every icon button has an aria-label.
* When the visitor changes the colour, the polite live region announces the paint name. Automatic changes are not announced.
* Every target is at least 24 px, all text at least 11 px, and focus-visible outlines are clear.
* With prefers-reduced-motion: no load-in, no autoplay, and every change (arrow or drag release) lands instantly. Dragging still follows the finger.

## 20. Acceptance checklist

1. At 1440 × 810: the word spans x 22.5 to 1379.5 with its cap top at 159; the centre bike is 762 wide with its tyres on y 628; the side bikes are 59.7% of its size, blurred, sharing its centre line; arrows are at (229, 433) and (1197.5, 433); the panel spans about x 64–1377 and y 657–781.
2. The bike always covers part of the word, and the word never moves during a change.
3. Each change takes 1400 ms on the given curve; halfway through the travel both bikes are the same size and the page is the exact mix of the two colours.
4. Autoplay holds 2000 ms on every bike and loops through all four paints.
5. Next, previous, queueing, drag, flick, snap-back, touch and keyboard all work, and release never jumps.
6. The tanks show no script or marks, and the page names no real brand.
7. From 320 × 568 to 2560 × 1440, including 568 × 320, 768 × 1024, 1024 × 1366 and near-square windows: nothing leaves the screen or overlaps, the nav stays on one row, and there is no sideways scroll.
8. It holds 60 fps during a change on integrated graphics.