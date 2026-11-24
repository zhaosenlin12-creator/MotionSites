# APERTURE ROW: vintage camera shop with a top-down rotating lens-ring hero

Build a single-file, fully responsive, **highly interactive** landing page for an invented vintage camera shop in Berlin, **"APERTURE ROW"**.

The hero is a **straight-down (top-down) view of a gigantic black lens ring**. Its centre is far below the screen, so only its top arc is visible. Six vintage cameras sit on the arc, each with its own scattered accessories, and the ring turns to bring the next camera in from the right while the previous one leaves to the left.

Under the hero come four parts:

- **The Bench:** a servicing section with an animated 9-blade aperture iris and count-up stats.
- **The Catalog:** three columns of cameras.
- **Visit:** a booking form.
- **A footer** with a giant wordmark.

Clicking a camera opens a **right-side detail drawer** with specs, condition, kit options, a warranty toggle, sample photos and add-to-cart. The cart has a fly-in animation, a camera flash, a toast and a drop-down.

Everything is light enough for 120 fps: the ring is drawn on canvas, only its visible arc, and only when it turns. Match every detail below.

---

## 1. Global

- **Fonts** (Google Fonts):
  - **Barlow Condensed** 500/600/700 for display text and titles (uppercase);
  - **Barlow Semi Condensed** 500/600 for labels (uppercase, letter-spacing .14–.28em);
  - **Inter** 400/500/600 for body text.
  - No monospace anywhere.
- **Tokens:**
  - `--bg: #0b0c0e`
  - `--ink: #eef0f3`
  - `--mute: #8d929b`
  - `--line: rgba(255,255,255,.1)`
  - `--blue: #3d7bff`
  - `--blue2: #7aa4ff`
  - `--card: #121317`
- **Easings:**
  - `--out: cubic-bezier(.16,1,.3,1)`
  - `--io: cubic-bezier(.77,0,.18,1)`
  - `--spring: cubic-bezier(.34,1.56,.64,1)`
- **Grain:** a fixed SVG fractal-noise overlay at opacity .05. It is static.
- **Scrollbar:** hidden.

## 2. Assets (exactly these URLs)

All are transparent PNG cutouts made with Higgsfield. Load them through:

`https://images.higgs.ai/?default=1&output=webp&url=<encodeURIComponent(png)>&w=<width>&q=85`

Use w=1000 for the hero cameras, 700 for the drawer, 300 for accessories, 240 for catalog thumbnails, 500/1200 for photos and 200 for the cart and toast.

The PNG base is:

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_<id>.png`

**Cameras** (all top-down):

| Key | Camera | ID |
|---|---|---|
| cam1 | silver rangefinder "RANGER" | `20261123_063459_193f84da-199e-41b5-8799-928ad67fd4e7` |
| cam2 | TLR "OKTA 6x6", tall | `20261123_063501_0cebf6fd-58cd-4cff-83c8-ecaa026bc315` |
| cam3 | black SLR "NORDA" | `20261123_063500_3aaf0fbc-be7e-4aaa-b9e3-c05576fca584` |
| cam4 | champagne compact "PIP 90" | `20261123_063501_5bb9fba1-e90d-42a3-86de-f3781bf93890` |
| cam5 | Super 8 "KINO 8" | `20261123_063500_febed648-3445-48b8-8a77-95ed640de074` |
| cam6 | folding bellows "FALTA" | `20261123_063459_46765ae9-cef1-4d57-be66-cf4874b98c88` |

**Accessories:**

| Key | Accessory | ID |
|---|---|---|
| a1 | film canister "HALIDE 400" | `20261123_063500_52268785-384c-458a-bba8-48e8e31dc1b7` |
| a2 | canister "SILVR 100" | `20261123_063500_5da68034-0d53-430b-b2e7-125f951b8edd` |
| a3 | lens cap "AR" | `20261123_063529_7e251229-2a86-4bf0-b1ce-a0c322b72a10` |
| a4 | negative strip | `20261123_063528_42a9482e-5de3-463d-96c9-2a55aaa21c03` |
| a5 | light meter "LUXO" | `20261123_063528_3b261fd2-e255-4dad-8620-4a697efdf68d` |
| a6 | coiled cable release | `20261123_063528_6371899e-449a-4370-a795-94acddce62ef` |
| a7 | 120 roll "PANORA 160" | `20261123_063529_160252d7-09c5-4e0f-99f4-8b7f443705d7` |
| a8 | chrome filter | `20261123_063528_8f1f255c-addc-4ec1-8c5e-4b04a91439ed` |

**Film photos** (4:5):

| Key | Photo | ID |
|---|---|---|
| p1 | Berlin street with yellow tram | `20261123_063528_7094557c-58c4-4ba4-9166-0336dd238901` |
| p2 | laughing woman on rooftop | `20261123_063529_aa416f7c-8fd5-4a58-bd98-25614addbb3f` |
| p3 | misty lake with rowing boat | `20261123_063555_769d745e-3f9e-4c8d-a6d9-95f7f2da27f5` |
| p4 | black-and-white man reading in café | `20261123_063554_53d93f22-8b9c-4147-8f61-a53f9d8785ce` |

## 3. Camera data

Each camera gives: name, type, year, max aperture, price, catalog column, image scale. Then its description, three chips, six spec rows (label: value), three condition chips, sample shots, and accessories as [asset, x, y, rotation°, size]. Accessory x/y and size are fractions of the item width, measured from the item centre.

1. **Ranger 35**, Rangefinder, 1966, f/2, 890 €, column 0, scale 1
   - Description: "A pocketable 35mm rangefinder with a bright-frame finder and a whisper-quiet leaf shutter. The camera street photographers keep for life."
   - Chips: Rangefinder · 35mm · Leaf shutter
   - Specs:
     - Format: 35mm film
     - Lens: 50mm f/2, fixed
     - Shutter: Leaf · 1s – 1/500
     - Metering: Selenium, coupled
     - Weight: 520 g
     - Made: 1966
   - Condition: Grade A · excellent / Seals replaced / Shutter timed
   - Shots: p1, p4, p2
   - Accessories: a1 (-.66, -.12, -22°, .2), a3 (.66, .2, 0, .2), a4 (-.52, .44, 24°, .22), a6 (.6, -.4, 0, .24)
2. **Okta 6×6**, Twin-lens reflex, 1958, f/3.5, 1,150 €, column 2, scale 1.42
   - Description: "Look down into the ground glass and the world goes square. A medium format TLR with a sharp 75mm taking lens and a crank that feels like clockwork."
   - Chips: Medium format · 120 film · Waist-level
   - Specs:
     - Format: 6×6 cm on 120
     - Lens: 75mm f/3.5
     - Shutter: Leaf · 1s – 1/500
     - Finder: Waist-level, bright screen
     - Weight: 1,080 g
     - Made: 1958
   - Condition: Grade A · excellent / New focusing screen / Film counter checked
   - Shots: p3, p2, p1
   - Accessories: a7 (-.6, -.16, -14°, .22), a5 (.62, .06, 12°, .24), a3 (-.46, .46, 0, .17), a8 (.48, .48, 0, .17)
3. **Norda SLR**, Single-lens reflex, 1974, f/1.8, 640 €, column 1, scale 1
   - Description: "All-mechanical, built like a tank, with a split-prism finder that snaps into focus. The SLR we hand to every first-time film shooter."
   - Chips: SLR · 35mm · Fully mechanical
   - Specs:
     - Format: 35mm film
     - Lens: 50mm f/1.8
     - Shutter: Focal-plane · 1s – 1/1000
     - Metering: TTL match-needle
     - Weight: 740 g
     - Made: 1974
   - Condition: Grade A+ · near mint / Mirror foam new / Meter calibrated
   - Shots: p4, p1, p3
   - Accessories: a2 (-.64, -.22, 16°, .2), a8 (.62, .3, 0, .18), a4 (.54, -.44, -30°, .22), a1 (-.56, .42, 38°, .19)
4. **Pip 90**, Compact, 1994, f/3.5, 280 €, column 0, scale 1
   - Description: "A champagne point-and-shoot with a sharp little zoom and a flash that makes every night out look like 1996."
   - Chips: Compact · Autofocus · Zoom
   - Specs:
     - Format: 35mm film
     - Lens: 38–90mm f/3.5–7.8
     - Exposure: Programmed AE
     - Flash: Built-in, red-eye
     - Weight: 285 g
     - Made: 1994
   - Condition: Grade A · excellent / Clean LCD / Battery included
   - Shots: p2, p1, p3
   - Accessories: a1 (-.64, .08, 10°, .19), a2 (.64, -.2, -26°, .19), a4 (-.44, -.48, 70°, .2), a3 (.52, .46, 0, .17)
5. **Kino 8**, Super 8 cine, 1971, f/1.8, 420 €, column 1, scale 1
   - Description: "Home movies the way they should feel: grainy, golden and a little shaky. Power zoom, auto exposure and a viewfinder that hums."
   - Chips: Super 8 · Cine · Power zoom
   - Specs:
     - Format: Super 8 cartridge
     - Lens: 8–40mm f/1.8 zoom
     - Speeds: 18 / 24 fps
     - Metering: Through-the-lens
     - Weight: 1,240 g
     - Made: 1971
   - Condition: Grade B+ · very good / Motor serviced / Zoom tested
   - Shots: p3, p4, p2
   - Accessories: a6 (-.64, -.2, 0, .24), a8 (.62, .36, 0, .17), a4 (.56, -.46, 20°, .22), a2 (-.52, .46, -40°, .18)
6. **Falta 6×9**, Folding, 1953, f/4.5, 560 €, column 2, scale 1.2
   - Description: "Unfold the bellows and you are holding the biggest negative that still fits in a coat pocket: eight huge frames on every roll."
   - Chips: Folding · 120 film · 6×9 negatives
   - Specs:
     - Format: 6×9 cm on 120
     - Lens: 105mm f/4.5
     - Shutter: Leaf · 1s – 1/250
     - Focus: Scale, front cell
     - Weight: 690 g
     - Made: 1953
   - Condition: Grade A · excellent / Bellows light-tight / Shutter timed
   - Shots: p1, p3, p4
   - Accessories: a7 (.62, -.24, 20°, .22), a5 (-.64, .1, -15°, .24), a6 (.56, .44, 0, .22), a3 (-.46, -.48, 0, .16)

**Extra catalog rows**, without images:

- Tomo Half: Half-frame · 1965, 310 €, Reserved
- Brio 35: Compact · 1989, 160 €
- Velo 400: Instant · 1978, 190 €, Sold out
- Luma 6×7: Medium format SLR · 1982, 1,690 €, Waitlist

## 4. Header

- **Layout:** fixed, 84px tall, side padding `max(20px, 3.6vw)`. After scrolling more than 40px it becomes `rgba(11,12,14,.72)` with a 14px backdrop blur, 70px tall, with a hairline bottom border.
- **Brand:** a 40px blue circle logo with six thin aperture-blade strokes. The blades **rotate at 3× the ring's rotation**.
- **Name:** "APERTURE ROW" in Barlow Condensed 600 at 23px, letter-spacing .08em. Under it, "VINTAGE CAMERAS · BERLIN" at 10.5px, letter-spacing .24em, muted.
- **Navigation:** THE BENCH, CATALOG, VISIT, with blue underlines that draw in on hover. Each smoothly tweens the page to its section.
- **Cart pill:** outlined, reading "CART" with a blue count badge. It bumps with a spring when something is added.
- **Button:** a blue pill, "BOOK A SESSION".

## 5. Hero: the lens ring

- **Pinned scroll.** `#hero` is `100vh + (N-1) × SEG` tall, with `SEG = .8 × viewport height`. It contains a sticky 100vh stage. `pos = (scrollY - heroTop) / SEG`, clamped 0..5 and smoothed: `posS += (pos - posS) × (1 - e^(-dt×11))`.
- **Geometry (desktop):**
  - ring radius `R = 1.45W`;
  - centre `CX = .6W`, `CY = .29H + R`;
  - item radius `RI = R - .27H`;
  - item width `IW = .31W`, height `IH = IW × .672`;
  - angular step `DELTA = .47W / RI`.
- **Geometry (mobile < 860px):** `R = 1.5W`, `CX = .5W`, `CY = .5H + R`, `IW = .74W`, `RI = R - .2H`, `DELTA = .92W / RI`.
- **Disc.** A static canvas, drawn once on resize:
  - a radial gradient #111216 → #15161a;
  - a blue glow above it (shadow rgba(61,123,255,.28), blur 120, offset -30);
  - machining grooves: arcs every 4.5px on the visible upper half, alpha .018–.03;
  - a fixed white light sweep at the top;
  - two rim hairlines.
- **Ring.** A second canvas, redrawn only when the rotation changes, and only for the visible angle range:
  - **knurled edge:** a radial line every 4.8px of arc, from R-1 to R-14, colour #26282d;
  - **tick scale:** every 1° from R-20 to R-27, longer (to R-34) every 5°;
  - **engraved rim text** along radius R-58: "APERTURE ROW · BERLIN · VINTAGE CAMERAS · SERVICED BY HAND · " repeated, Barlow Condensed 600 at `max(13px, 1.25vw)`, letter-spacing .42em, `rgba(255,255,255,.24)`. Each glyph is placed and rotated tangent to the arc;
  - **blue focus/aperture scale** along R-96: "∞ 10 5 3 2 1.5 1 m · 1.4 2 2.8 4 5.6 8 11 16 ·", `rgba(122,164,255,.34)`;
  - ring rotation = `-posS × DELTA`.
- **Index mark.** A fixed blue triangle above the top of the ring. Under it, the current camera's max aperture ("f/2") in blue2; it scrambles through random characters for about 300 ms on every change.
- **Cameras.** Camera i sits at angle `-90° + (i - posS) × DELTA` on radius RI, rotated by the same angle, so it turns with the ring. Its image is `object-fit: contain`, scaled by the camera's scale, with `drop-shadow(0 24px 26px rgba(0,0,0,.75))`.
  - **Motion blur** only while turning: `blur = min(7, |velocity| × 2.6)`, quantised to 0.5px.
  - Neighbours are dimmed with opacity `1 - min(.62, |d| × .5)`.
  - Items further than 1.9 steps away are hidden.
- **Accessories "arrive".** Each accessory has a spring:
  - target `max(0, 1 - |d| × 1.15)`;
  - stiffness 90 minus 12 per index, damping 13.
  - Its offset from the camera spreads out by `1 + (1 - s) × .9`, it spins by `(1 - s) × 80° × random`, and its opacity is `s × 1.4`, with a tiny idle sway.
  - So when a camera lands, its film, cap, meter and cable fly in and settle; when it leaves, they scatter outward and fade.
- **Left shade.** `linear-gradient(90deg, rgba(11,12,14,.92) 0, .7 at 24%, 0 at 46%)` sits over the ring, under the copy.
- **Copy column:** left `max(20px, 5vw)`, top 24vh, width `min(36vw, 520px)`.
  - **Index:** "01 —— 06" in blue2, with a 72px line whose blue fill grows to `(i+1)/N`.
  - **Title:** the camera name in uppercase Barlow Condensed 600, `clamp(56px, 7.4vw, 124px)`, line-height .88, inside an overflow-hidden line.
  - **Sub:** "TYPE · YEAR" label.
  - **Description:** max 40ch, #c3c7cf.
  - **Chips:** outlined pills, 32px tall.
  - **Buy row:** the price in Barlow Condensed at 38px and a blue "VIEW & BUY →" button that opens the drawer.
- **Swap animation on active change:**
  1. The title slides up out of its mask (`translateY(-108%)`, .6s `--io`), while the sub, description, chips and buy row fade, blur 6px and drop 10px.
  2. After 300 ms the content is replaced. The new title rises from `translateY(108%)`, and the other blocks return staggered by 70 ms.
- **Dot pager:** on the right edge. The active dot is a 28px-tall blue capsule.
- **Hint:** "⟷ SCROLL OR DRAG TO TURN THE RING" at the bottom centre of the ring. It fades once the user interacts.
- **Input:**
  - **Mouse wheel:** one gesture turns exactly one camera (accumulate delta; over 24 → step; 620 ms lock). The tween lasts 760 ms with cubic in-out easing. At the first and last camera the page scrolls on normally.
  - **Drag:** dragging the ring itself scrubs it (`pos = start - dx / (RI × DELTA)`). On release it flings using velocity × .22, clamped to ±1.2, and snaps.
  - **Snap:** whenever scrolling stops for 170 ms inside the hero, the ring snaps to the nearest camera.
  - **Other controls:** the dots, arrow keys, and Enter (opens the drawer).
  - **Clicks:** clicking a neighbour camera spins to it; clicking the active camera opens the drawer.
- **Hover on the active camera:**
  - a viewfinder reticle: 4 blue corner brackets that spring in from outside, plus a centre focus circle with a crosshair;
  - a blue pill following the cursor, "● VIEW DETAILS", with a blinking record dot;
  - the camera lifts to scale 1.035.

## 6. Detail drawer

- **Panel:** right side, `min(560px, 46vw)` wide (full width on mobile), #101114 with a hairline left border. It slides in from `translateX(102%)` over .75s `--io`.
- **Scrim:** `rgba(6,7,9,.62)` over the page.
- **Close:** a round outlined ✕ that rotates 90° on hover; Esc or clicking the scrim also closes. Contents fade up with 60 ms staggers.
- **Header:** the label "02 / 06 · TYPE" in blue2.
- **Plate:** a 290px turntable plate (grooved radial gradient with a blue glow) with the camera on it. The camera **tilts in 3D with the cursor** (rotateY ±12°, rotateX ±10°).
- **Body:**
  - the name in Barlow Condensed at 56px, then the description;
  - **SPECS:** a two-column grid of label/value rows between hairlines;
  - **CONDITION:** chips with blue check icons;
  - **KIT:** two option cards, "Camera only · Serviced, with cap & strap" and "Shooter kit · + case, 3 rolls, cable · +X €", where X ≈ 7% of the price + 20, rounded to 5. The selected card gets a blue border and a tinted fill;
  - **Warranty toggle:** "Extended warranty · 24 months · Free re-calibration in year two", +39 €, with an iOS-style switch;
  - **SHOT ON THIS CAMERA:** three film-print thumbnails (black border, thicker at the bottom) that tilt on hover. Clicking one opens a lightbox print with the caption "SHOT ON NAME" and "▸ 14A" in film-edge amber.
- **Sticky footer:** "ADD TO CART · price". The price counts up or down over 450 ms when the options change.
- **Add to cart:**
  1. A white camera flash: full-screen, opacity 0 → .85 → 0 over 420 ms.
  2. The camera image flies along an arc into the cart badge (900 ms).
  3. The badge count updates and bumps.
  4. The button turns green: "ADDED TO CART ✓".
  5. The drawer closes and a white toast appears at the bottom, with a camera thumbnail: "Name · shooter kit added to cart".
- **Cart drop-down:** lines with a thumbnail, name, options, price and ✕ remove, plus the total and a "Checkout" button. Checkout shows the toast "Demo store — checkout is switched off".

## 7. Sections

**The Bench:** two columns, min-height 100vh.

- **Left:**
  - the label "THE BENCH";
  - h2 "OPENED. / CLEANED. / CALIBRATED." in Barlow Condensed 600, `clamp(52px, 6.6vw, 112px)`;
  - the paragraph "No camera leaves our bench untouched…";
  - three stats that count up over 1.6 s when the section scrolls into view: 1,240 cameras serviced · 48 point check · 12 month warranty.
- **Right:** an SVG **9-blade aperture iris**.
  - An outer knurled bezel with 48 ticks and the f-stop numbers 1.4 to 16.
  - A blue lit centre: radial #9fbcff → #3d7bff → #0a1430.
  - Blades are half-planes clipped to the circle. Each is translated to the opening radius `ro = 14 + open × (IR - 30)`, rotated by `k/9 × 360 + twist`, then rotated again by `-twist × 1.6`, with `twist = (1 - open) × 34°`.
  - Blades alternate between two linear-gradient shadings, with a bright edge line.
  - The opening follows scroll progress through the section; hovering opens it wide.
  - A readout under it: "f/2.8 · HOVER TO OPEN" / "· WIDE OPEN".
  - A blue radial glow behind it scales with the opening.
  - It is only updated while visible and changing.

**Catalog:**

- h2 "EVERYTHING / ON THE SHELF".
- Three columns: RANGEFINDER & COMPACT, SLR & CINE, MEDIUM FORMAT.
- Each row has a 74px round dark thumbnail (the camera overflowing it), the name, "Type · Year", the price, and a tag ("In stock" in blue, or Reserved / Sold out / Waitlist in amber).
- On hover the row gets a blue tint, slides 8px, and the thumbnail scales to 1.18 and rotates -8°.
- Clicking a camera row opens its drawer. Extra rows show the toast "Name — we'll email you when it's back on the shelf".

**Visit:**

- **Left:** h2 "BRING YOUR / CAMERA IN.", hours "Tuesday – Saturday / 11:00 – 19:00 · Sundays by appointment", the address "Lichtstraße 12 · 10119 Berlin", and a note about the free condition check.
- **Right:** a form card with:
  - date (defaults to 2 days from now) and time select;
  - a session select: Condition check · free / Repair estimate / Film 101 workshop · 35 € / Private viewing;
  - name;
  - a blue submit button.
- **On submit:** a spinner for 1.1 s, then an overlay with an animated check (stroke-dashoffset), "YOU'RE BOOKED", the session, date and time, and a booking code "AR-####". It resets after 6 s.

**Footer:** a giant "APERTURE ROW" in Barlow Condensed 700 at 17.2vw, with a white-to-grey text gradient, plus a small row with © and links.

**Reveal:** sections fade up 40px via IntersectionObserver.

## 8. Performance rules

- No per-frame SVG rebuilds, no layout reads inside the loop (heroTop is cached), and no large CSS filters on full-screen layers.
- The ring canvas redraws only when the rotation changes.
- The hero loop stops updating once the hero is scrolled past.
- The iris updates only when visible and changing.
- Camera filters change only while the ring is moving.