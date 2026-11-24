# Zestwell — Citrus Season: recreation prompt

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts.

---

Build a single-file web page (one index.html, no build step) for a fictional art-print shop called **Zestwell**. The page is a first-person **3D curved gallery passage** rendered in WebGL with three.js. Prints hang on both walls of a ring-shaped corridor, and the visitor scrolls or drags to walk forward along the curve. Clicking a print glides the camera up to it, and clicking it again opens a **print product page**. That page has option chips, Add to bag, accordions, a "Get the collection" row and a **bag drawer** that slides in from the right. A **List** view shows all nine prints as cards. The page is warm cream, butter and blush, with deep plum-ink type.

## 1. Assets

| Asset | Exact URL | How it is used |
|---|---|---|
| Artwork sheet (one PNG, 1744 × 2336 px, 3 × 3 grid of nine portrait prints separated by thin white gutters) | Original result: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261120_071134_02d2d6ba-ed91-4c3f-87c4-1354b61b5882.png — load it through the image proxy: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261120_071134_02d2d6ba-ed91-4c3f-87c4-1354b61b5882.png&w=1744&q=85 | The only image on the page. Each print is cropped from it: in WebGL by texture offset and repeat; in the DOM by CSS background-size and background-position. Never slice or re-host it. The proxy sends Access-Control-Allow-Origin: *, so load it with crossOrigin "anonymous". |
| three.js | https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js | ES module through an import map, with the key "three" pointing at that URL. |

**Sheet cell boxes in source pixels.** Columns run x 0–575, 585–1158 and 1168–1743. Rows run y 0–769, 779–1545 and 1555–2335. Inset every cell by 6 px on all sides to drop the white gutters. Print i (0–8) uses column i mod 3 and row floor(i / 3). So the crop is x = colStart + 6, y = rowStart + 6, w = colEnd − colStart − 12, h = rowEnd − rowStart − 12.

**WebGL crop.** Clone the sheet texture for each print and set repeat = (w / 1744, h / 2336). Set offset = (x / 1744, 1 − (y + h) / 2336), because the v axis is flipped. Use colorSpace SRGB and anisotropy set to the renderer maximum.

**DOM crop.** For an element of size W × H, set sx = W / w and sy = H / h. Then background-size = (1744·sx)px (2336·sy)px and background-position = (−x·sx)px (−y·sy)px, with no-repeat. Recompute on resize.

**The nine prints, in sheet order.** Each description is the line below followed by ", painted in flat gouache tones. Printed on archival paper with a soft matte finish."

| i | Title | Artist | Year | Price | Description start |
|---|---|---|---|---|---|
| 0 | Lemons on Gingham | Tova Lindqvist | 2024 | $60 | A sunny tabletop of lemons, a striped jug and blue gingham |
| 1 | Oranges & Stripe | Elise Marten | 2024 | $60 | A striped bowl heaped with oranges on a candy-stripe cloth |
| 2 | Pink Blooms | Soren Vale | 2023 | $55 | Pink garden flowers in a cobalt striped jug against warm yellow |
| 3 | Citrus Jug | Nora Feldt | 2024 | $60 | Leafy lemon branches in a striped jug on a sunlit table |
| 4 | Teacup & Lemon | Ada Kerrow | 2023 | $50 | A blue-patterned teacup with a slice of lemon, all morning light |
| 5 | Blood Orange Bowl | Pim Halden | 2024 | $60 | Halved blood oranges glowing in a white bowl on deep blue |
| 6 | Lemon Tree, Window | Ines Morrow | 2022 | $65 | A potted lemon tree by an open window on a gingham table |
| 7 | Grapefruit Halves | Juno Basset | 2024 | $55 | Pink grapefruit halves on a hand-painted checked plate |
| 8 | Daisies in Stripes | Wren Calloway | 2023 | $55 | White daisies in a tall striped pitcher against blush pink |

## 2. Fonts

Self-host the latin WOFF2 subsets from Google Fonts with font-display: swap.

| Family | Use | Weights and styles | Google Fonts |
|---|---|---|---|
| Oswald | Condensed display: the headline, the print title, "Get the collection", "Your bag", the button labels | Variable 200–700 (uses 500 and 600) | https://fonts.google.com/specimen/Oswald |
| Newsreader | Serif: the logo, nav links, artist names, descriptions, accordion rows, the labels on the 3D wall | Variable 200–800 roman (uses 400 and 500) plus italic 400 | https://fonts.google.com/specimen/Newsreader |
| DM Mono | Mono micro-type: the kicker, hint, toggle, chips, prices, the pill, small meta | 400 and 500 | https://fonts.google.com/specimen/DM+Mono |

Font stacks: serif "Newsreader", Georgia, serif. Mono "DM Mono", ui-monospace, monospace. Condensed "Oswald", "Arial Narrow", sans-serif.

## 3. Head and tokens

- **Title:** "Zestwell — Citrus Season". Use the standard viewport meta tag.
- **Colour tokens:**

| Token | Value | Use |
|---|---|---|
| --wall | #FFF9EC | page and scene background, fog |
| --floor | #F8E7D2 | reference only (the floor uses its own gradient) |
| --ink | #3A3550 | all text, dark buttons, active toggle |
| --ink-60 | rgba(58,53,80,.6) | secondary text |
| --ink-35 | rgba(58,53,80,.35) | outlines and dividers |
| --ink-15 | rgba(58,53,80,.15) | faint outlines |
| --lemon | #FBE46D | reference |
| --blush | #F7D2D1 | reference |
| --chip-on | #FCEB93 | selected chip fill |
| --drawer | #F9E3DF | bag drawer background |
| --page | #FFF9EF | print page and list background |

- **Global rules:** html and body are 100% tall with overflow hidden and background --wall. Text is --ink with antialiased smoothing. Buttons have no chrome and inherit the font. Links have no underline.

## 4. Scaling system

- **Gallery UI and nav:** use one design unit, --u = min(100vw / 1440, 100vh / 900). Every measurement below written "N u" means calc(N × var(--u)), designed on a 1440 × 900 frame.
- **Print page, list and drawer:** use the width unit --w = 100vw / 1440, written "N w".
- **Minimum sizes:** every font size of 20 units or less is wrapped as max(11px, …), so no text renders below 11 px. Tap targets are at least 24 px: icons are max(24px, 26u), toggle buttons max(24px, 22u), chips max(28px, 32w), qty buttons max(24px, 24w) and accordion rows max(32px, 40w). Nav links and "Enter the collection" have min-height 24 px.
- **Small-screen layout:** a separate layout applies when ANY of these media conditions matches: (max-width: 819px), (orientation: portrait) and (max-width: 1100px), or (orientation: landscape) and (max-height: 500px). In it, --u and --w both become 1px. JavaScript uses the same query with matchMedia.

## 5. The 3D room (three.js)

**Renderer and camera.**
- Renderer: antialias on, pixel ratio min(devicePixelRatio, 2), output colorSpace SRGB, no tone mapping.
- Scene background #FFF9EC, linear fog #FFF9EC from 10 to 46.
- Camera: PerspectiveCamera with near 0.05 and far 100. The vertical FOV is 56° when width ≥ height and 70° when width < height. Update the aspect on resize.
- Every surface uses MeshBasicMaterial (unlit). The shading comes from gradient textures. A hemisphere light (0xfffdf6 / 0xe9cfa6, 1.55) and an ambient light (0xfff6e6, 0.55) are added but have no effect on basic materials.

**Geometry. Units are metres; the ring's centre is the origin.**
- Outer radius R = 18, inner radius RIN = 12.2 and wall height H = 6.2. The corridor between the two walls is 5.8 m wide.
- Outer wall: an open CylinderGeometry(18, 18, 6.2, 160) rendered BackSide and raised by 3.1. Its texture is a 4 × 256 vertical canvas gradient: 0 #F5EBD8, .2 #FBF3E3, .6 #FBF3E3, .86 #F8EDD9, 1 #EFDFC4.
- Inner pillar: an open CylinderGeometry(12.2, 12.2, 6.2, 120) rendered FrontSide and raised by 3.1. Its gradient: 0 #F7EEDD, .3 #FFFAF0, .8 #FDF5E6, 1 #F1E1C6.
- Floor: CircleGeometry(18, 160) rotated −90° about X. Its 1024² canvas texture is a radial gradient from radius 512 × 12.2 / 18 out to 512: 0 #EDD6B0, .55 #F3E1C3, 1 #EFDAB8.
- Ceiling: CircleGeometry(18, 160) in colour #FAF1E0, BackSide, rotated −90° about X, at y = 6.2.

**Prints and frame groups.**
- Each print is 1.36 m wide and 1.36 × 763 / 567 ≈ 1.83 m tall, with its centre at height PY = 1.95.
- **Outer (right) wall:** 36 prints at angles s × 2π / 36. Each group sits at radius 17.98 and looks at the origin. The print index is s mod 9.
- **Inner (left) wall:** 24 prints at angles (k + 0.5) × 2π / 24. Each group sits at radius 12.22 and looks outward, at twice its own position. The print index is (k + 4) mod 9.
- **Each group contains, in local z order:**
  1. **Halo:** a plane 2.1 × PW by 1.75 × PH at y PY + 0.05, z 0.005. Its 256² radial gradient is white at 0.95 alpha out to 35% radius, then fades to 0. It is transparent, does not write depth, and is fogged.
  2. **Shadow:** a plane 1.25 × PW by 1.18 × PH at (0.05, PY − 0.06, 0.01). Its radial gradient is rgba(120,90,50,.28) out to 25% radius, then fades to 0.
  3. **Frame:** a box (PW + 0.07) × (PH + 0.07) × 0.06 in colour #D3AA72, centred at (0, PY, 0.045).
  4. **Print plane:** PW × PH at z 0.077, textured with that print's crop.
  5. **Label:** a plane 0.92 wide by 0.92 × 260 / 640 tall at (−PW/2 + 0.46, PY − PH/2 − 0.42, 0.02). Its left edge lines up with the print's left edge. Its texture is a transparent 640 × 260 canvas: the artist in 500 58px Newsreader at (30, 82), the title in italic 400 54px Newsreader at (30, 150), and "YEAR · PRINT" in 400 30px DM Mono at 70% alpha at (30, 215). All three are in #3A3550, drawn after document.fonts.ready.

**Camera pose model.** A pose is (th, r, yaw, y, pitch):
- Camera position = (r·cos th, y, r·sin th).
- Forward along the passage is the tangent (sin th, 0, −cos th), so the centre of the ring is always on the left. Walking forward means th decreases.
- The outward normal is (cos th, 0, sin th).
- View direction = cos(yaw)·tangent + sin(yaw)·normal. The camera looks at position + direction + (0, pitch, 0). Yaw 0 looks straight down the passage, +π/2 faces the right (outer) wall and −π/2 faces the left (inner) wall.

| Pose | Desktop and landscape | Portrait small screens |
|---|---|---|
| Walk | r 15.6, yaw −0.30, y 1.92, pitch −0.12 | r 15.4, yaw −0.42, y 1.90, pitch −0.10 |
| Focus, outer-wall print | r 18 − 4.26, yaw +π/2, y PY − 0.52, pitch 0 | r 18 − 5.2, yaw +π/2, y PY − 1.05 |
| Focus, inner-wall print | r 12.2 + 4.26, yaw −π/2, y PY − 0.52, pitch 0 | r 12.2 + 5.2, yaw −π/2, y PY − 1.05 |

- **Starting angle:** th = 0 + D. The walk offset D is 0.14 rad, or 0.14 + 0.9 × (2π / 36) on portrait small screens. This puts print 0 just ahead on the right.
- **What the walk view shows:** a cream curved corridor with a big print near-left on the convex inner wall and a big print near-right on the concave outer wall. Smaller prints recede along both walls toward the curve's far end, left of centre. The beige floor sweeps in from the bottom.

## 6. DOM in order (desktop measurements in u, 1440 × 900 frame)

1. **Nav** (`header.nav`): fixed at the top, 58u tall, flex row centred, side padding 27u, z-index 30.
   - **Logo:** "Zestwell", Newsreader 500, 21u, letter-spacing −0.01em, 36u right margin.
   - **Links:** Index, Shop, Info, Auctions, Help in Newsreader 13.5u, gap 22u, opacity 0.85 (1 on hover). Index goes to the gallery and Shop to the list.
   - **Right group** (margin-left auto, gap 14u):
     - Search pill: 159u × 27u, 1px --ink-35 border, radius 99px, padding 0 6u 0 11u, 12u text "Search…" in --ink-60, a 12u magnifier icon and a "⌘K" kbd (DM Mono 9u, 1px --ink-15 border, radius 4px, --ink-35).
     - Currency pill: "USD" plus an 8px chevron, 27u tall, DM Mono 10.5u, same border.
     - Three 26u outline icons (account, heart, bag) at 18u with stroke 1.6. The bag button carries a count badge: --ink circle, min 16px, DM Mono, hidden until the bag has items.
   - When a page or the list is open, the nav gets background --page and a 1px --ink-15 bottom hairline (0.3s background transition).
2. **Gallery** (`main#gallery`): fixed, fills the screen, touch-action none, cursor grab (grabbing while dragging, pointer over a print). It holds the WebGL canvas (opacity transition 0.3s) and a #veil div in --wall used for the load fade.
3. **Gallery UI** (`.gui`): fixed full screen, z-index 20, pointer-events only on its children. It fades out over 0.3s (then visibility hidden) whenever the page or list is open.
   - **Arrows:** absolute at left 27u, top 262u, a column with 10u gap. Two 50u circles with a 1.5px --ink border holding 20u arrow icons (← previous, → next). Hover fills them --ink with --wall icons over 0.25s.
   - **Hint:** absolute at right 27u, bottom 229u, right-aligned. DM Mono 10u, letter-spacing 0.12em, line-height 1.65, uppercase. Line 1 "Scroll or drag to walk round", line 2 "Click a painting to look closer". In focus state the lines read "Click the painting to open it" and "Esc or click away to step back".
   - **Toggle:** absolute at right 29u, bottom 174u. A pill with a 1px --ink-35 border, 2u padding and 2u gap, holding "GALLERY" and "LIST" in DM Mono 9.5u, letter-spacing 0.12em, 22u tall, 14u side padding, radius 99px. The active one is filled --ink with --wall text.
   - **Caption block:** absolute at left 25u, bottom 30u.
     - Kicker "YOU ARE WALKING PAST": DM Mono 11.5u, letter-spacing 0.14em, width max-content, margin 0 0 10u 3u.
     - Headline row: h1 "CITRUS SEASON" in Oswald 600 at 170u, line-height 0.82, letter-spacing 0.005em, nowrap, transform scaleX(0.855) from the bottom-left. It ends at about x 942 and its caps are about 136 px tall.
     - Link "ENTER THE COLLECTION →": absolute at left 946u, bottom 0, DM Mono 11u, letter-spacing 0.12em, 1px --ink underline border with 2u padding-bottom, 9u bottom margin. It opens the list.
   - Every text line (kicker, headline, link, both hint lines) sits inside an overflow-hidden mask span, so it can rise into view.
4. **Pill** "OPEN THE PRINT": fixed, background #1e1b2b, white DM Mono 10u, letter-spacing 0.14em, padding 7u 13u, radius 99px, opacity 0 (0.12s transition). It is centred on the cursor while the cursor is over the focused print. On small screens it shows automatically at the print's centre, 55% of the way down.
5. **Print page** (`section#page`): fixed full screen, z-index 15, background --page, scrolls vertically, hidden by default. Measurements in w.
   - **Wrapper:** padding-top 96w. Grid columns 712w and 638w.
   - **Left column:** a sticky box (top 96w, padding-left 184w, width 544w) holding:
     - The print: 360w wide, aspect 3 / 4.08, with a 10w #F6EAD8 mat (as a box-shadow spread) and a soft shadow (0 2w 10w 10w rgba(58,53,80,.06)).
     - A meta row 360w wide, 34w below: "1/1", a cube icon with "View in room", and a bookmark icon, all in DM Mono 11w with 17w icons.
   - **Right column, top to bottom:**
     - Title: Oswald 600, 46w, uppercase, line-height 1.
     - Artist: Newsreader italic 19w, 6w above.
     - Description: 14.5w, line-height 1.55, --ink-60, max-width 560w.
     - Price "$ 60.00": DM Mono 15w.
     - Tax line "Prices include VAT. Shipping calculated at checkout.": DM Mono 10w, --ink-60, 24w above.
     - Four option groups, 21w apart. Each has a label (DM Mono 10w uppercase, letter-spacing 0.1em) followed by the current choice in --ink-60. The chips are DM Mono 10.5w, 32w tall, 14w side padding, 1px --ink-35 outline, 13w gap. A selected chip has fill --chip-on and an --ink border.
       - **Paper:** Art Paper, Fine Art Paper, Recycled Paper.
       - **Size:** 11.7 × 16.5" (A3), 16.5 × 23.4" (A2), 23.4 × 33.1" (A1), 33.1 × 46.8" (A0).
       - **Signature:** Unsigned, Signed and Numbered.
       - **Frame:** three thumbnail chips (Unframed, Classic Frame, Framed Canvas), each 121w × 126w with a 1px --ink-15 border and rgba(255,255,255,.35) fill. Each shows a 38w print crop: plain, with a 4w #C99A63 frame ring, or with a 5w #1d1b24 frame ring.
     - Buy row, 42w above, gap 26w: a qty stepper (100w × 50w, outline, "− 1 +", DM Mono 13w) and a full-width ADD TO BAG button (--ink fill, white Oswald 500 16w, letter-spacing 0.12em, 50w tall, hover #2a2640).
     - Accordion, 36w above: rows separated by 1px --ink-35 lines, each 40w tall, Newsreader 15w, with a DM Mono "+" on the right that rotates 45° when the row is open. The body height animates over 0.3s.
       - **Paper & Sizes:** "Art Paper is a smooth 200 gsm matte stock. Fine Art Paper is a 310 gsm cotton rag with a soft texture. Recycled Paper is 100% post-consumer fibre."
       - **Delivery Info:** "Prints are made to order and ship rolled in a tube within 3–5 working days. Framed pieces ship flat within 7–10 working days."
       - **Returns Policy:** "Unframed prints can be returned within 30 days in their original tube. Signed editions are final sale."
   - **Collection band:** 70w below, background #FBF3E4, padding 36w 0 80w 48w.
     - "GET THE COLLECTION" in Oswald 600 38w, offset −15w.
     - Four cards (the current print plus the next three) with 87w gaps. Each card is 168w wide with a 3:4 crop and a 7w #F6EAD8 mat. Under it: the title in Newsreader 500 14w, the artist in italic 13.5w, and the price in DM Mono 11w. On hover the image lifts 4w (0.35s cubic-bezier(.2,.7,.2,1)).
6. **List** (`section#list`): fixed, z-index 14, --page background, fades over 0.3s. "CITRUS SEASON — ALL PRINTS" in Oswald 38w, then all nine cards wrapping with a 46w row gap. Padding 110w 48w 80w.
7. **Drawer** (`aside.drawer`): fixed on the right, full height, 387w wide, z-index 40, background --drawer, padding 28w 28w 28w 32w, flex column.
   - Header: "YOUR BAG" in Oswald 600 26w, with a × close button.
   - Items: a 66w 3:4 thumbnail, then the title (14w), the artist (italic 13w), the size (DM Mono 11w), a "− q +" stepper and a trash button. Empty state: "YOUR BAG IS EMPTY", DM Mono, centred, 120w down.
   - Footer: a 1px top rule with "Subtotal" on the left and "$ total.00" on the right. Below it, a full-width CHECKOUT → button (--ink, Oswald 500 17w, 50w tall).

## 7. Interactions and timings

**Walking.**
- The wheel adds −deltaY × 0.0016 rad to the target angle, so scrolling down walks forward. Line-mode wheel deltas are multiplied by 33.
- Dragging past a 6 px threshold also walks: the target becomes the angle at pointerdown + (dx if |dx| > |dy|, else dy) × 0.0022 rad per px (0.0042 on small screens). Dragging left or swiping up walks forward.
- The ← / → buttons and the arrow keys (→ or ↓ = next, ← or ↑ = previous) snap the target to the next 2π / 36 slot along the passage. The formula is target = (round((target − D) / STEP) − d) × STEP + D, where d = +1 for next.
- Smoothing: each frame, th += (target − th) × (1 − e^(−dt / 0.36)). This exponential follow (time constant 0.36 s) leaves a soft glide tail of about 0.8 s after input stops, matching the reference reel. The walls and prints never move; only the camera travels along the ring.
- While a print is focused, any wheel or drag first steps back.

**Focus glide.**
- Clicking without dragging raycasts the print planes. A click on any print, on either wall, starts a glide from the current pose to that print's focus pose at the print's angle. Pick the copy of the angle within ±π of the current th, so the camera goes the short way round.
- The glide lasts 0.95 s. Each pose component has its own easing so the camera travel leads and the turn lags: th uses quartic ease-out 1 − (1 − t)^4, yaw uses quadratic ease-out 1 − (1 − t)^2, and r, y and pitch use cubic ease-out. As a result the print slides in from the side and settles centred and upright with its label under it, and the neighbouring prints peek in at the screen edges.
- The hint switches to its focus text when the glide starts.
- In focus, clicking the focused print opens the print page, clicking another print glides to it, and clicking empty space, Esc, the wheel, a drag or an arrow button steps back. Stepping back sets the walk angle to the current th + D and glides back to the walk pose with the same easing over 0.95 s.

**Opening the print.**
- The print page becomes visible at opacity 0 and fades to 1 over 0.3s, covering the room.
- A flyer div showing the print crop is placed at the print's projected screen rectangle. That is the bounding box of the projected corners of the print plane. The flyer animates with the Web Animations API (translate and scale) to the page's image box over 300 ms, easing cubic-bezier(.25,.75,.25,1). The real image stays hidden until the flyer lands.
- The right column, the meta row and the collection band appear 1000 ms after the click with a 0.15s opacity fade, matching the reel's delay.

**On the print page.**
- Chips select instantly and update their group label.
- The quantity runs from 1 to 9.
- Accordions animate their height.
- A collection card opens that print the same way: smooth scroll to top, flyer from the card, details at 1.0 s.

**Bag.**
- ADD TO BAG adds the current print with the selected size and quantity, or increases the quantity of a matching line.
- The drawer then slides in: translateX(101%) to 0 over 0.45s with cubic-bezier(.1,.85,.2,1). About 90% of the travel happens in the first 0.2 s.
- A new item row fades and rises 6w into place 0.75 s after the click. The subtotal and badge update.
- The × button or Esc slides the drawer out. The bag icon opens it at any time.

**Back to the room.** GALLERY, Index or the logo closes any page or list (0.3s fade). It then puts the camera on the outer-wall copy of the last print nearest the current angle and glides to focus on it.

**List view.** LIST, Shop or "Enter the collection" opens the list (0.3s fade). The toggle shows LIST as active.

## 8. Opening animation

The entrance starts once the art texture has loaded and document.fonts.ready has resolved. A failsafe starts it after 4 s regardless.

| Element | From → to | Delay | Duration | Easing |
|---|---|---|---|---|
| Veil over the canvas | opacity 1 → 0 | 0 | 900 ms | ease-out |
| Camera | starts at the walk pose with th + 0.16 (slightly behind) and r − 0.35, then eases to the walk pose: a gentle step forward into the passage | 0 | 1400 ms | expo out, 1 − 2^(−10t) |
| Each masked text line (both hint lines, kicker, headline, link, in DOM order), then each nav child | text rises from translateY(105%) to 0; nav items fade from opacity 0 to 1 | 250 ms + index × 60 ms | 1000 ms | cubic-bezier(.2,.7,.2,1), fill backwards |

All three rows run only once.

## 9. Small-screen layout

These rules apply when the small-screen query matches. All values are in px.

- **Nav:** 52 tall with 16 side padding. Logo 19 px. Links, search, currency and the account and heart icons are hidden; only the bag icon stays (32 × 32, 20 px icon).
- **Hint:** at top 62, left and right 16, left-aligned, 11 px.
- **Caption:** left 14, bottom 100. Kicker 11 px. Headline min(23.5vw, 19vh), wrapping onto two lines (CITRUS / SEASON) with line-height 0.84. The link stacks under the headline (position static) with a 12 gap.
- **Arrows:** bottom-left (left 16, bottom 24), side by side, 44 px circles.
- **Toggle:** bottom-right (right 16, bottom 30), 26 px buttons.
- **Landscape phones** (height ≤ 500): headline min(13vw, 26vh) on one line, caption bottom 18. The link sits under the headline, the hint is hidden, the arrows move to the bottom-right and the toggle to the top-right under the nav (top 60).
- **Desktop-width portrait screens** (width ≥ 820 and aspect ≤ 1): the headline drops to 150u.
- **Print page:** padding-top 64. Single column, max-width 680, centred, 20 px side padding. The image is not sticky (full width, max 420, 8 px mat). Title 36, artist 18, description 14.5, chips 36 tall at 11 px with 8 px gaps. Frame chips are min((100vw − 60) / 3, 190) wide and 118 tall. Buy row: qty 100 × 50, button 50 tall. Accordion rows 46 tall.
- **Collection band:** padding 30 0 60, left padding max(20, (100vw − 640) / 2). Cards 150 wide in a horizontally scrolling row with snap and 16 px gaps.
- **List:** a 2-column grid.
- **Drawer:** min(88vw, 380) wide with 22 / 20 padding.

## 10. Reduced motion

With prefers-reduced-motion: reduce, all CSS transitions and animations are disabled. Camera glides and the intro take 0 ms, so the camera cuts instead of moving. Walking applies the target instantly. The flyer, the details delay and the bag item delay are all 0.

## 11. Acceptance checklist

- The first frame shows the cream curved passage, with framed prints and serif labels on both walls and a floor that sweeps in from the bottom.
- The nav sits top-left and top-right. Round arrows are at the left, the hint, toggle and huge condensed "CITRUS SEASON" sit at the bottom, and "ENTER THE COLLECTION →" is to the right of the headline.
- Scrolling down walks forward: prints approach along both walls and pass by. On release the motion glides on for about 0.8 s. Nothing in the room moves on its own.
- Clicking any print glides the camera to it in about 0.95 s. Hovering shows the OPEN THE PRINT pill, and Esc steps back.
- Opening a print flies its image into the left column in 0.3 s, and the details fade in at about 1.0 s. Chips, quantity and accordions work.
- ADD TO BAG slides the 387w drawer in over 0.45 s, the item appears about 0.75 s after the click, and the badge counts it.
- LIST shows all nine prints, and GALLERY returns you to the room in front of the last print.
- At every size from 320 px phones to 2560 px desktops, nothing overflows or overlaps, text is at least 11 px and tap targets are at least 24 px.