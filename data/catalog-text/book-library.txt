# FOLIO ROOM: interactive 3D book-orbit hero for a digital design-book library

Build a single-file, fully responsive, **highly interactive hero** for an invented digital library of design books, **"Folio Room"**.

The page is one 100vh screen on warm paper (#f4f1ea). Its parts:

- **Top bar:**
  - centred stacked wordmark;
  - a pill search bar;
  - the counter "2,400 books · 186 curators" on the left;
  - a "My Shelf" pill on the right.
- **Centre:**
  - the headline "One Shelf for / Every [mini book] Curious Mind.";
  - a grey subline;
  - a black "View Collections" pill;
  - four category chips.
- **Twelve CSS-3D hardcover books.** Each has a real cover, spine, page edges and back.
  - They orbit around the headline on an evenly spaced rounded-rectangle ring.
  - They tilt with the cursor.
  - They can be dragged and thrown, and they spring back.
  - They open in a focus view, filter with search and categories, and morph into a grid.

All motion is spring physics in one requestAnimationFrame loop. Match every detail below.

---

## 1. Global

- **Fonts** (Google Fonts):
  - **Inter Tight** 500/600/700 for the headline, wordmark and titles;
  - **Inter** 400/500/600 for UI.
- **Tokens:**
  - `--paper: #f4f1ea`
  - `--ink: #141414`
  - `--mute: #86827a`
  - `--line: rgba(20,20,20,.1)`
  - `--spring: cubic-bezier(.34,1.56,.64,1)`
  - `--out: cubic-bezier(.16,1,.3,1)`
- **Stage:** `html, body { height: 100%; overflow: hidden }`.
- **Paper grain:** a fixed `body::before` holding an SVG feTurbulence noise (baseFrequency .9, warm brown tint, alpha .22) at opacity .35 with `mix-blend-mode: multiply`.
- **Book stage:** `#stage`, fixed, full-screen, with `perspective: 1900px` and `touch-action: none`.

## 2. Assets (exactly these URLs)

Every cover is a Higgsfield PNG with a **transparent background**: the cover's colour must be painted behind it with CSS `background-color`. Load the covers through:

`https://images.higgs.ai/?default=1&output=webp&url=<encodeURIComponent(png)>&w=900&q=85`

Use `w=900` for books, 300 for the fly animation, 200 for shelf thumbnails, 160 for the mini book and 120 for search thumbnails.

The PNG base is:

`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_<id>.png`

Twelve books, in order. Each line gives id, then title, author, category, pages, year and score, then the cover / spine / endpaper colours, then the note.

1. `20261121_033327_214ed3f3-b77e-440f-aba1-a8f6bfef39e1`
   - **GRID**, Ines Vahl, Layout, 248 pages, 2023, 4.9
   - Colours: #ecebe6 / #cfccc4 / #1a1a1a
   - Note: "The modular grid explained without dogma: 60 real layouts rebuilt column by column, from timetables to museum walls."
2. `20261121_033326_84bf819c-5088-4118-894d-254c41530560`
   - **LOUD**, Marco Teller, Posters, 192 pages, 2024, 4.7
   - Colours: #f26b1d / #c9520f / #141414
   - Note: "Posters that refuse to whisper. A field guide to scale, contrast and the courage to crop."
3. `20261121_033326_08a6f155-e502-4d1d-95a6-60b7769e8b67`
   - **Rules of Marks**, Juno Okafor, Branding, 212 pages, 2024, 4.8
   - Colours: #efe6d4 / #1f4fd6 / #f26b1d
   - Note: "How a circle becomes a company. Logos, symbols and the quiet grammar that makes a mark feel inevitable."
4. `20261121_033326_c5a053e3-7715-4568-9125-10dbe94553a2`
   - **Shaping Identity**, Elena Marsh, Branding, 304 pages, 2022, 4.9
   - Colours: #1f4a3a / #163629 / #efe6d4
   - Note: "Identity systems as places people want to belong to — with case files from twelve studios."
5. `20261121_033326_55f0fe07-e4ee-4593-9f95-048d16d00ff6`
   - **Make it Matter**, Theo Brandt, Typography, 176 pages, 2025, 4.6
   - Colours: #c9b8ee / #a995d8 / #f7d23e
   - Note: "Short essays on type that does a job: signage, protest, packaging and the kindness of legibility."
6. `20261121_033326_6b08a110-3b3e-4ec5-bc4b-c74529c150d5`
   - **Type Weather**, Ada Kowal, Typography, 228 pages, 2024, 4.8
   - Colours: #1d4fd6 / #153ba3 / #f4f1ea
   - Note: "Why some letters feel cold and others warm. A mood atlas of 400 typefaces, sorted by climate."
7. `20261121_033327_682c9cb0-53ec-4295-be49-f580b5c227df`
   - **Small Ideas, Big Change**, Rui Sato, Posters, 160 pages, 2023, 4.5
   - Colours: #f0491f / #c23612 / #141414
   - Note: "One idea per page. A pocket manifesto for designers who want to move people, not pixels."
8. `20261121_033326_a0acd858-b948-4dfc-ab4e-1c231920b1d3`
   - **Quiet Systems**, Noor Haddad, Layout, 196 pages, 2022, 4.7
   - Colours: #b9b7b2 / #8f8d88 / #141414
   - Note: "Restraint as a method. Whitespace, rhythm and the systems behind calm interfaces and books."
9. `20261121_033349_28c091d1-780b-4588-a455-5005f6e8cf61`
   - **Colour Is a Verb**, Lena Fosse, Posters, 184 pages, 2025, 4.6
   - Colours: #ec3d8c / #bf2a6c / #ffe066
   - Note: "Colour as action: 120 palettes that change how a room, a page or a brand behaves."
10. `20261121_033349_daee32f0-2cba-4282-9a73-3a9867931dba`
    - **Letters in Motion**, Kai Mendez, Typography, 220 pages, 2025, 4.8
    - Colours: #121212 / #000000 / #d7ff3a
    - Note: "The kinetic type handbook: timing, easing and how to make words move without losing their meaning."
11. `20261121_033349_da8b7941-c1f0-47e8-b671-f0e1c4059711`
    - **The Honest Page**, Clara Weiss, Layout, 264 pages, 2021, 4.9
    - Colours: #f4f0e6 / #d8d2c3 / #d62b20
    - Note: "Editorial layout without tricks — hierarchy, measure and the respect a reader deserves."
12. `20261121_033348_9e021045-5de0-46f4-bc5d-c9dda64062c3`
    - **Signal & Noise**, Omar Reyes, Branding, 236 pages, 2024, 4.7
    - Colours: #f5e72d / #d6c61b / #141414
    - Note: "Branding in a crowded world: how distinct brands cut through without shouting louder."

Base tilts per book (degrees): -16, 12, -8, 15, -13, 9, -18, 11, -6, 17, -12, 7. Each book also gets `seed = sin(i×91.7)×.5 + .5`.

## 3. The 3D hardcover (pure CSS 3D)

- **Sizes:**
  - book width `BW = clamp(130px, 12.8vw, 230px)`; on phones `min(30vw, 140px)`;
  - height `BH = BW × 1.327`;
  - depth `D = BW × .085`.
- **Wrapper:** each book is `.book > .b3d` with `transform-style: preserve-3d`, and every face is centred with negative margins.
- **Faces:**
  - **front:** `translateZ(D/2) rotateY(var(--open) × -158deg)`, `transform-origin: left`, radius 2px 5px 5px 2px.
    - It contains `.cv`: the cover colour plus the img, with a hinge crease (a 1.6% wide gradient strip at 3.2% from the left).
    - Over that sits a moving specular sheen: a 115° white gradient, soft-light blend, translated by `--gx` from the tilt.
    - Its reverse face, `.inside`, shows the endpaper colour.
  - **page1:** the first page, `translateZ(D/2 - 1.5px)`, #fbf8f1, with an inner gutter shadow. It holds the category label, title, note, author and year, sized relative to `--w`.
  - **back:** `rotateY(180deg)`, in the spine colour.
  - **spine:** `rotateY(-90deg) translateZ(W/2)`, spine colour with a highlight gradient.
  - **fore-edge, top and bottom:** cream page stripes made with 1px/2px `repeating-linear-gradient`.
- **Shadow:** a separate blurred floor shadow per book (rgba(58,44,28,.34), blur 16px). It moves further away and fades as the book lifts in z.

## 4. Physics and layouts

**State.** Every book holds a spring state `p` and velocity `v` for x, y, z, rx, ry, rz, s, o and open.

- Stiffness: x/y 120, z 140, rx/ry 160, rz 120, s 170, o 90, open 110.
- Damping: 17 / 20 / 18 / 15 / 21 / 19 / 20.
- Integrate with 4 substeps per frame (dt capped at .033).
- Transform: `translate3d(x - BW/2, y - BH/2, z) rotateZ(rz) rotateX(rx) rotateY(ry) scale(s)`.
- z-index is sorted by depth.

**Orbit (default):**

- **Ring path.** A superellipse with exponent .5 per axis (a rounded rectangle) and radii .42W × .43H around (W/2, .53H). It is sampled at 720 points and **parameterised by arc length**, so the 12 books are evenly spaced. Each book's position is `phase/2π + k/n`.
- **Rotation.** `phase` drifts at .035 rad/s. The wheel adds to `phaseV` (`delta × .00009`), dragging empty space spins it, and `phaseV` decays at .93 per frame.
- **Top clearance.** Books crossing the top centre (`|x| < .2W`) rise by up to `.17H + .35BH` and shrink 25%, so the logo and search stay clear.
- **Parallax:** `x += (mx-.5)×-38×depth` and `y += (my-.5)×-26×depth`, with `depth = .6 + seed×.8`. Add a bob of `sin(t×.7 + i×1.7)×5px` and a sway on rz.
- **Tilt:** `rx = (my-.5)×-16`, `ry = (mx-.5)×22`.
- **Cursor repel:** inside 1.25×BW, push away by up to .35×BW.
- **Hover:**
  - z 70, scale 1.07, rz straightens by 55%;
  - the cover cracks open (`open` .06);
  - a black pill tooltip with title and author follows the cursor.

**Intro.** Books start at the headline (scale .15, opacity 0) and are released one by one, staggered .25 s + i×.07 s, so they burst out.

**Grid.** "View Collections", or the Orbit/Grid switch at bottom right, changes layout:

- The headline block moves up 21vh and scales to .56.
- Active books form a centred grid: 6 columns (3 on mobile), scale `min(.78, .24H/BH)`, centred at .66H, with slight parallax.
- Each switch kicks every book's velocity (rz and z) so the layouts morph with energy.
- The CTA label toggles to "Back to Orbit".

**Filtering:**

- Search matches title, author or category; it is accent-insensitive.
- Chips filter by category and toggle.
- Inactive books fall below the screen (y = H + 1.2BH), rotating and fading.
- Active books re-space themselves around the ring.

**Drag to throw:**

- On pointerdown a book follows the pointer exactly, at z 110 and scale 1.1, tilting with velocity (`rz = tilt + vx×2.2`, `ry = vx×3`, `rx = -vy×3`).
- On release, its velocity is the pointer velocity ×60, so it flies and springs back home. A toast says one of "Nice throw." / "It always comes back." / "Gravity: optional.".
- A click without movement (under 6 px) opens the book.

## 5. Focus (open a book)

- `body.focus` fades the hero copy.
- **The chosen book:**
  - moves to `x = max(BW×s×1.5 + 30, .53W - BW×s/2 - 24)`, `y = .5H`;
  - scale `min(1.6, .56H/BH)`;
  - z 120, rz 0, ry -12 plus slight parallax.
  - After 650 ms the cover swings open to `--open .92`, showing the endpaper and the first page.
- **Other books** fly outward along their angle from the centre (×.62W / .62H) and fade out.
- **Side panel** at left 57%, fading up with staggered children:
  - category and year in uppercase;
  - the title in Inter Tight 600, clamp(34px, 4vw, 62px);
  - "by Author";
  - a meta row between hairlines: pages, edition, curator score;
  - the note;
  - buttons: black "Read sample" (toggles the cover between open and almost closed) and outlined "Add to shelf".
- **Controls:** a round black close button at top left, ← → buttons at the bottom centre, and keyboard arrows. Esc or clicking the background closes.
- **Add to shelf:**
  - a cover clone flies along an arc into the My Shelf counter (900 ms, rotating and scaling to .08);
  - the counter bumps;
  - the button turns green: "On your shelf ✓".
- **The My Shelf pill** opens a drop-down of saved mini covers; clicking one opens that book.

## 6. Hero copy

- **Wordmark:** "Folio / Room", stacked, Inter Tight 700 at 25px, line-height .86, letter-spacing -.04em.
- **Search:**
  - a 340px pill at `rgba(251,250,246,.86)` with backdrop blur, a search icon, the placeholder "Search 2,400 design books" and a `/` kbd;
  - a results drop-down with cover thumbnails, the match highlighted in `#ffe066`, arrow-key selection, Enter to open, and the empty state "No books match…";
  - the `/` key focuses it.
- **Headline:** Inter Tight 500, clamp(40px, 5.6vw, 92px), letter-spacing -.045em, line-height 1.02. The two lines rise in from masks.
- **Mini book:** an inline 3D book (.62em × .84em, rotated -9°) between "Every" and "Curious".
  - It flips on rotateY every 2.6 s to the next cover.
  - Hover scales it to 1.12.
  - Clicking it shuffles the ring, randomising tilts and kicking velocities, with the toast "Shelf shuffled".
- **Subline:** "A digital library of design books for curious creatives.", #86827a.
- **CTA:** a black 46px pill "View Collections" with an arrow that rotates -45° on hover.
- **Chips:** "Typography 3", "Branding 3", "Posters 3", "Layout 3"; the active chip turns black.
- **Corners:** the counter at top left, hints at bottom left ("Drag to throw · Scroll to spin · Click to open"), and the Orbit/Grid segmented switch at bottom right.
- **Toast:** a centred black pill at the bottom.

## 7. Responsive (<760px)

- Hide the counter and hints.
- The headline is 10.2vw.
- Book width is `min(30vw, 140px)`, and the ring radii are .5W × .42H.
- **Focus:** the book sits at top centre (`.34H`), and the panel moves to the bottom without the note.
- The grid uses 3 columns.
- The layout switch is centred at the bottom.