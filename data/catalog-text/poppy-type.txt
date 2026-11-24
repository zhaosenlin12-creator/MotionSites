# Letterbloom: poppy type garden (recreation brief)

Build a single, self-contained, full-screen web page called **Letterbloom**: a generative type toy where everything you type is set as one huge serif word in the centre of a flat dark field, and poppies grow out of every letter. Stems are drawn on like ink, weave over and under the letters, end in poppies that spring open petal by petal, in seed pods, feathery leaves or spiral curls. Space cuts the stems and makes the word finish with a little burst of blooms, Backspace withers the last letter, Enter clears the field. A white butterfly flies in when you click and perches on a poppy. Stems and poppies lean toward the cursor. A second mode, Poster, renders the same garden as a 1080 × 1080 looping animation with seven motion presets and exports MP4 or PNG frames.

Everything is drawn live on a 2D canvas with plain JavaScript: there are no images, no videos and no libraries. The only external assets are two Google Fonts.

## 1. Assets and fonts

| Asset | Source | Use |
|---|---|---|
| Playfair Display 600 (latin) | https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap | The typed word on the canvas, the "Poster" panel heading, the poster Words input, the "Aa" in palette cards |
| DM Mono 400 and 500 (latin) | https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap | All interface text: wordmark, mode toggle, hints, buttons, poster panel |

Self-host the latin WOFF2 files (or embed them as base64 data URIs) with font-display: swap. Canvas font string: weight 600, size S px, family "Playfair Display", Georgia, serif. When document.fonts finishes loading "600 100px Playfair Display", clear the glyph-width cache, re-run the layout and rebuild the poster garden. No other media: no image or video URLs are used anywhere.

Head: title "Letterbloom", meta description "Type, and poppies grow from your letters. Space cuts the stems, backspace withers them.", viewport width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content, theme-color set live to the current background, an empty data: favicon.

## 2. Palettes

Each palette has seven colours: background, flower, stem & leaf, flower line (the fine lines on petals), type, and poppy core (the dark centre and stamen dots). The leaf vein and the pod rib lines use the background colour. The default and first palette is Ember.

| # | Name | Background | Flower | Stem & leaf | Flower line | Type | Core |
|---|---|---|---|---|---|---|---|
| 1 | Ember (default) | #1C1C1B | #D9603A | #A8A08A | #FFD0B8 | #F4EFE6 | #0E0B0A |
| 2 | Night | #0A1520 | #F2502E | #6F8E9E | #FFC2AE | #FFFFFF | #05080C |
| 3 | Soft | #181F2C | #EB6F70 | #8AA6A3 | #FFD6D2 | #FFFFFF | #0B0E15 |
| 4 | Field | #22301F | #E8643C | #B9C79A | #FFD8C2 | #F6F1E6 | #0F160E |
| 5 | Dusk | #2A1E2E | #F07A5A | #B49AB8 | #FFD9CC | #FFF4EE | #140D16 |
| 6 | Clay | #3A2A22 | #F28C5B | #C9B79C | #FFE0CC | #FFF6EC | #1C130E |
| 7 | Linen | #F1EBE0 | #D9472B | #5E6B4E | #FFD3C2 | #1E1B18 | #1E1B18 |
| 8 | Butter | #F6E7B8 | #D8432C | #4F6B3A | #FFCDB8 | #241D14 | #241D14 |
| 9 | Blush | #F4D6D0 | #C83A30 | #6E7F5C | #FFE1DA | #2A1A18 | #2A1A18 |
| 10 | Mono | #0B0B0C | #E9E4DA | #6B6B6B | #0B0B0C | #FFFFFF | #0B0B0C |

The html, body and app container background, and the theme-color meta, always follow the current palette's background (poster mode uses #111110).

## 3. Page structure (desktop, 1440 × 900 reference)

The whole page is one fixed, full-viewport app container (position fixed, inset 0, overflow hidden, cursor text, user-select none, tap highlight off, DM Mono). Layers from bottom to top:

1. **Canvas** filling the container (inset 0, width and height 100%), sized at devicePixelRatio for sharpness, re-measured on resize.
2. **Hidden text input** (1 × 1 px at the top-left, opacity 0, font-size 16 px so phones don't zoom, transparent caret, pointer-events none, autocapitalize/autocomplete/autocorrect off, spellcheck false, aria-label "Type to grow a garden"). It holds one zero-width space (U+200B) as a sentinel so Backspace on an "empty" field still reports.
3. **Wordmark** "letterbloom" top-left: top 22 px, left 26 px (plus safe-area insets), DM Mono 400, 15 px, letter-spacing 0.04em, line-height 1, in the palette's type colour, not clickable.
4. **Mode toggle** top-right: top 16 px, right 18 px; a pill (radius 999 px, 1 px border, 4 px padding, 4 px gap) holding two buttons "Type" and "Poster" (DM Mono 13 px, letter-spacing 0.04em, padding 8 px 17 px, radius 999 px). The selected button is filled with the type colour and its text is the background colour; the other is transparent with type-colour text. Border colour is rgba(255,255,255,.22) on dark palettes and rgba(0,0,0,.22) on light ones (light means the red channel of the background is above 140). Pill background is the palette background. In poster mode: pill background #111110, border #3A3A38, selected button white with black text, the other #BDBDBD.
5. **Bottom bar**: left 26 px, right 20 px, bottom 46 px; flex, space-between, centred vertically, gap 16 px, wraps; DM Mono 13 px, letter-spacing 0.06em, colour = type colour.
   - Left: hints at 85% opacity with 31 px gaps: "type to grow", "space cuts", "backspace withers", "enter clears". On coarse pointers (touch) these read "tap to type", "space cuts", "⌫ withers", "return clears".
   - Right: a swatch pill (1 px border, radius 999 px, padding 4 px 6 px, 6 px gap) holding 10 round 24 px swatch buttons, each filled with its palette's background and holding a centred dot 46% of its size in that palette's flower colour. The active swatch has a 1.5 px ring in the current type colour and is scaled 1.1; a swatch whose background equals the current background gets a ring in the bar line colour; others have a transparent ring. Hover scales any swatch to 1.15 (0.15 s). Then two outline pill buttons "PNG" and "SVG" (1 px border, padding 9 px 15 px, 13 px, letter-spacing 0.04em, border turns the text colour on hover).
6. **Poster screen** (hidden in Type mode, see section 9).

The canvas, wordmark and bottom bar are hidden in Poster mode.

## 4. Type layout

Letters are laid out by measuring each glyph at 100 px in the canvas font and caching width/100 per character (a space counts 1.4 × its measured width).

- Maximum line width maxW = 80% of the viewport width (68% when the viewport is narrower than 600 px). Base size S0 = 28% of the viewport height. Line height = 2.1 × size.
- Size S = min(S0, maxW ÷ total width at size 1). If there are two or more words and S would drop below 10% of the height (or below 14% if the text was already wrapped), wrap instead: binary-search (22 iterations) the largest size between 3% and 15% of the height where greedy word wrapping keeps every line within maxW and lines × 2.1 × size ≤ 82% of the height.
- Each line is centred horizontally (trailing spaces ignored). Baseline of line k of n: y = H/2 + (k − (n−1)/2) × lineHeight + 0.33 × S. Each letter stores its target centre x, baseline y and width.
- Every frame, the drawn size, each letter's position and the caret ease toward their targets with k = 1 − e^(−dt/80) (dt capped at 64 ms), so letters glide when the word grows, shrinks or wraps. On resize everything snaps.
- Letters are drawn with fillText, centred, alphabetic baseline, in the type colour.
- **Caret**: a bar 0.8 × S tall and max(2, 0.03 × S) wide in the type colour, centred at x = last letter's right edge + 0.07 × S and y = baseline − 0.33 × S (or the screen centre when empty). Its height grows in with ease-out cubic over 600 ms after load. It blinks with a 530 ms period but stays solid for 500 ms after any keystroke.

## 5. Input

- On desktop the hidden input is focused 50 ms after load and again on every pointerdown in the app, so typing works immediately. Ctrl/Cmd+S saves a PNG, Ctrl/Cmd+Shift+S saves an SVG.
- Printable key: add the letter. Space: cut (below). Backspace: wither the last live letter. Enter: clear all letters. Keys with Ctrl/Meta/Alt are ignored, as are Enter/Space while a button has focus.
- Phones: tapping the canvas focuses the input to open the keyboard. Because mobile keyboards often write into the field instead of firing key events, the field is mirrored: on each input event compare the field with its previous value, wither one letter per removed character, add each new character (a newline clears), then reset the field to the sentinel (during IME composition keep the composing text and diff when it ends). A keydown that was already handled sets a flag for one tick so the input event is ignored.
- Phones also track window.visualViewport: the app's top and height follow the visible area (CSS variables), and if the keyboard closes while the field still has focus the field is blurred so the next tap reopens it.

## 6. How a letter grows

All randomness uses a seeded mulberry32 generator. Each word gets a random word seed; every letter in a word shares it plus its index, so a word has one character. Per-word parameters (from the word seed): poppy chance 0.24–0.46, leafiness 0.6–1.4, lean −0.3…0.3, bloom scale 0.85–1.3, curviness 0.8–1.4, bridge chance 0.45–0.8 (capped 0.95). All geometry is in units of the type size S, relative to the letter's baseline centre (negative y is up). w = the letter's width in S units.

**Vine path**: 40 steps of equal length from a base point in a start direction; at step fraction u the heading is dir + bend × u + amp × sin(u × π × waves + phase) × min(1, 3u), with amp = (0.35–0.8) × curviness, waves 1–2.6, bend −0.6…0.6. A "curl" tip appends a 1.6-turn spiral (14 points, radius 0.05–0.10 shrinking to half) to either side.

**Weave**: each stem is split at 1–3 random points (between 15% and 85% of its length) into segments that alternate between behind the letters (layer 0) and in front (layer 1); 30% of the cuts leave a 2–5% gap. Leaves and tips take the layer of the segment they sit on.

**Per letter**:
- 1 upward stem (a second with probability 0.45): base x random within ±35% of the letter width, base y 0 to −0.3, direction straight up ± lean/2 ± 0.35 rad, length 0.6–1.1, delays 40 ms and 170 ms. The first letter of every word always ends its first stem in a poppy.
- 40% chance of a downward stem: base y −0.1 to −0.45, direction down ± 0.4 rad, length 0.35–0.7, delay 160 ms.
- If the letter follows another in the same word, with the bridge chance: a cubic Bézier from a point inside this letter to a point inside the previous one (both at y −0.05 to −0.6), bulging up or down by 0.4–0.8; 45% of the time it is cut short to 70–90% of its length. Delay 90 ms; its tip is a curl (50%), a leaf (25%) or a poppy (25%).
- The first letter of a word also grows a side curl pointing left (base x −0.3w, length 0.45–0.75, delay 120 ms).
- Every letter also keeps one hidden tendril curl (base x +0.25w, direction ±0.7 rad sideways, length 0.45–0.7). It is drawn only while the letter is the last letter of its word, growing in with ease-out cubic over 450 ms after a 150 ms delay. When a letter is followed by another, it disappears.

**Each stem** draws on from its base with ease-out cubic over max(320, length × 620) ms after its delay. Width 0.017 × S (82% for side branches). It carries 0–2 fine hairs (short strokes 0.035 × S long, 0.012 × S wide, angled 2.5 rad off the stem) that appear once the stroke passes them. 0–3 leaves sit along it (count floor(random × 2.8 × leafiness)) at 25–85% of its length, alternating sides, angled 0.55–1.05 rad off the stem, length 0.14–0.34 (×0.8 on branches), each appearing as the stem reaches it. 30% of top-level stems fork once into a side branch from 35–70% of their length (length 35–55% of the parent, starting in the parent's layer).

**Tips** (when not forced): poppy with the word's poppy chance, otherwise pod 45%, leaf 15% (of the remainder), else curl. Tips appear at 80% of the stem's draw time.
- **Poppy**: radius R = (0.17–0.33) × bloom scale (×0.75 on branches). A poppy whose centre sits over the letter body (y between −0.78 and 0.05 and within half the letter width) goes behind the letters 78% of the time; elsewhere it is in front 60% of the time. 10% of poppies get a smaller twin (60–90% size) beside them, 120 ms later.
- **Pod**: length 0.11–0.16, pointing along the stem.
- **Leaf**: length 0.16–0.32, pointing along the stem.

**Space** (cut): the last letter of the word gets 1–3 extra side stems (fanned around up-and-right, length 0.4–0.85), each tipped with a poppy (the first always, others 50%) or a pod, starting when the cut happens. Its tendril recoils: its drawn length shrinks over 150 ms by min(0.85, 20 px ÷ (0.6 × S)).

**Backspace** (wither): the last letter is marked dead; everything it grew scales down with ease-out cubic over 260 ms, then it is removed at 300 ms. The previous letter (if in the same word) loses its cut blooms and regrows its tendril.

## 7. Drawing

All shapes are filled or stroked smooth paths: closed shapes go through the midpoints of consecutive points with quadratic curves; open strokes use round caps and joins.

**Hand-drawn boil**: every 120 ms (frame index floor(t/120)) each element gets a new pseudo-random offset of up to ±max(0.8, 1% of S) px in x and y and up to ±0.035 rad rotation, hashed from its id and the frame index, so linework trembles like a stop-motion drawing.

**Birth sway**: for 2.5 s after a letter is typed, every point of its garden is pushed sideways by 0.07 × S × h × e^(−3.2t) × sin(11t) and vertically by 0.035 × S × h × e^(−3.2t) × sin(11t + 1.2), where h is the point's height above the baseline in S units and odd/even letters sway in opposite directions.

**Cursor lean**: for each live letter, measure from a point 0.6 × S above its baseline to the pointer. Within reach = max(260, 3.2 × S) px, the lean vector is the unit direction × smoothstep(1 − d/reach). Each letter eases its lean toward that at 0.07 per frame. A point at height h (clamped 0–2.5) moves by lean × (0.1 × S, 0.05 × S) × (0.5h² + 0.5h), so tops of stems bend the most. Poppies also turn to face the pointer: within 300 px the face vector is the direction × smoothstep × min(1, d/40), eased at 0.09 per frame; it squashes the flower along that direction (factor −0.28 × strength), shifts its inner layers toward the pointer, and adds 0.22 × x-component to its rotation. On touch, the lean relaxes when the finger lifts. Leaving the window clears the pointer.

**Feathery leaf**: a blade along its axis (with a slight bend of up to 0.6 × 0.15 × length), half-width = 0.3 × L × sin(π × u^0.8) × (0.28 + 0.72 × tooth), where tooth is a sawtooth with 5.5 teeth (rising for 70% of each tooth, dropping for 30%), the two sides offset by 0.09 so the teeth alternate; 44 points per side; filled in the stem colour; a centre vein from 5% to 85% of its length in the background colour, width max(0.7, 0.022 × L). Leaves spring in: scale = 1 − e^(−7t) cos(15t) (t in seconds from its delay).

**Seed pod** (length L = pod size × S × spring, same spring as leaves): an oval capsule from the stem tip outward (centre 0.55L, radii 0.55L along and 0.44L across), a flat crown disc at 1.12L (radii 0.1L by 0.36L), five short crown rays from 1.06L fanning out to 1.24L, all in the stem colour; three thin rib lines along the capsule in the background colour, width max(0.7, 0.045 × L).

**Poppy** (radius R in px, rotation −0.5…0.5 rad, two random phases): four petals, back to front: left-back (−0.42, −0.24; radii 0.6 × 0.56; −0.4 rad), right-back (0.44, −0.22; 0.6 × 0.56; +0.4 rad), left-front (−0.38, 0.24; 0.6 × 0.5; +0.3 rad; depth 0.12), right-front (0.4, 0.26; 0.6 × 0.5; −0.3 rad; depth 0.12), all in units of R. Each petal is a 34-point ellipse whose radius is crinkled by 1 + 0.045 sin(5θ + phase1 + i) + 0.03 sin(9θ + phase2) + 0.012 sin(15θ + 2i), filled in the flower colour.
- Each petal opens 85 ms after the previous with spring s = 1 − e^(−8t) cos(14t): it scales from the base point (0, 0.45R) by s and starts rotated 0.5 rad outward, settling as s reaches 1.
- Petal lines (only when R ≥ 10): once a petal's spring passes 0.4, three fine lines per petal draw on over the next half of the spring, radiating from the centre toward the petal at angle offsets −0.32, +0.05 and +0.36 rad, from 32% to 100% of a reach of (centre distance + 0.55–0.65 × petal radius), slightly bowed; flower-line colour, width 0.032R (middle line 0.9 ×, outer 0.75 ×).
- Centre: 80 ms after the last petal starts, a progress value grows with ease-out cubic over 520 ms. A dark core disc of radius 0.24R × progress (slightly wavy, 86% as tall as wide) at (0, −0.02R) in the core colour; when R ≥ 9 a ring of 11 stamen dots (radius 0.045R) at 0.33R from the centre pops in one after another; on top, a small seed-cap disc (0.085R × 0.075R) in the stem colour.
- Inner parts are lifted toward the pointer by depth (petals 0–0.12, core 0.3, cap 0.36) for the turning effect.

**Butterfly** (size s = max(14, 0.15 × S)): four wing ellipses per side (lower wing centre (0.46, 0.28), radii 0.36 × 0.3, tilted 0.5; upper wing centre (0.55, −0.32), radii 0.55 × 0.36, tilted −0.55), slightly wavy, filled in the type colour and compressed horizontally by 0.12 + 0.88 × open; when open > 0.3 each upper wing gets a flower-colour tip spot and two fine dark veins (background colour); a slim body ellipse (0.07 × 0.46) and two curved antennae in the stem colour.
- Clicking the canvas spawns one (max 6; the oldest leaves when a 7th comes). It enters from the nearer side edge at a random height and flies to the nearest free poppy that has been open for over 700 ms, landing 0.55R above its centre. Flight: steering speed min(0.34, 0.06 + 0.0016 × distance) px/ms, velocity eased at 0.06 per 16 ms, flutter wobble sin(7t) × 0.12 and cos(4.3t) × 0.1, vertical bob sin(13t) × 0.6 px, body tilt following horizontal velocity (±0.5 rad), wingbeat |cos(17t)|. Perched: it follows the poppy, wings mostly half closed (0.25 + 0.15 sin), with a short fast flapping burst whenever sin(0.9t + seed) > 0.75. If its poppy disappears it flies off up and out. With no poppy available it wanders around the click point for 3.5 s and leaves.

**Planted poppies**: double-clicking or double-tapping the canvas (two taps within 340 ms and 40 px, at most one plant per 1.8 s) plants a free-standing poppy (0.24 × S, random rotation) at that spot that blooms like the others and lasts 60 s, fading and sinking over its last 2.2 s. At most 14 at once.

**Draw order each frame**: fill the background; all layer-0 stems, leaves, pods and poppies; the letters; all layer-1 elements; butterflies; planted poppies; the caret.

## 8. Exports

- **PNG**: renders the current frame without the caret and downloads the canvas as letterbloom.png.
- **SVG**: re-runs the same drawing into SVG paths (fills and round-capped strokes, coordinates rounded to 0.01) over a background rect, with letters as text elements in Playfair Display 600, and downloads letterbloom.svg.

## 9. Poster mode

Clicking "Poster" switches to a two-column screen (background #111110, cursor default, DM Mono 12 px, letter-spacing 0.03em, text #EDEDED): a left panel minmax(280 px, 340 px) wide (#161615, 1 px right border #262624, padding 24 px 22 px 32 px, 26 px gaps, scrolls) and a stage that centres a 1080 × 1080 canvas shown at min(100%, 100vh − 104 px) with a 1 px #262624 border and 64 px top padding. The text typed in Type mode becomes the poster words (default "red poppy").

Panel, top to bottom:
- "Poster" in Playfair Display 600, 26 px, white; under it in #8C8C88 "1:1 · <loop seconds>s loop · 30 fps".
- Section label "WORDS" (11 px uppercase, letter-spacing 0.08em, #8C8C88); an input in Playfair Display 600 22 px (bg #0E0E0D, 1 px #2E2E2C border, radius 10 px, padding 10 px 12 px, border white on focus) that rebuilds the garden on change (max 40 characters); a "Regrow garden" outline pill that picks a new random seed.
- "MOTION": a two-column grid of seven cards (radius 10 px, 1 px #2E2E2C border, padding 10 px 12 px; title 13 px, subtitle 11 px #8C8C88; selected = white border on #1E1E1C): Breathe "Slow sway · 3s", Grow & wither "Bloom, then back · 6s", Typed "Type, cut, repeat · 5s", Gust "Wind sweeps through · 4s", Reach "Stems follow a light · 6s", Scatter "Random bloom, fade · 6s", Visitor "Butterfly drops by · 7s".
- "PALETTE": a two-column grid of the ten palettes as cards (radius 12 px, padding 6 px 6 px 8 px), each with a 44 px preview strip in the palette background showing an 18 px flower dot, a 12 px stem dot overlapping it by 4 px, and "Aa" in Playfair 18 px in the type colour, with the name below; the selected card has a white border.
- "EXPORT · 1080 × 1080 LOOP" (1 px #262624 top border, 20 px padding): a white filled pill "Export MP4 loop" (or WebM, black 500-weight text, padding 12 px 14 px), an outline pill "PNG frames (.zip)", and a status line.

The poster garden is generated from the words with a seed (7 by default), laid out with the same rules on a 1080 square, then scaled (up to 1.25 ×) and centred on the type so the whole garden fits inside a 6% margin (half-size 0.44 × 1080). It loops continuously; time t runs modulo the preset length T. Letters are always shown in full.
- **Breathe (3 s)**: fully grown. Each point sways x by sin(φ + 0.004 x_letter + 1.1h) × 0.03 S × h and y by cos(φ + 0.003x) × 0.008 S × h, with φ = 2π t/T; leaves and poppies rotate sin(φ + 0.7 id) × 0.12 rad.
- **Grow & wither (6 s)**: letters are "typed" every min(110, 3000/n) ms starting at 200 ms, words are cut at spaces, and from 4.2 s letters wither one by one from the end (spacing min(60, 900/n) ms, 600 ms wither).
- **Typed (5 s)**: letters appear one by one every min(85, 3600/n) ms from 300 ms with a blinking caret (400 ms period); the frame goes blank after 4.4 s and restarts.
- **Gust (4 s)**: a wind front sweeps from x = −35% to 155% of the width; points ahead of it barely move, points behind it ring out (e^(2.2d) cos(9d)), with an idle sway of 0.012; displacement scales with height.
- **Reach (6 s)**: a small light disc (0.09 S, flower-line colour) travels a figure-eight (x = 540 + 430 sin φ, y = 540 + 260 sin 2φ) and stems within 560 px bend toward it.
- **Scatter (6 s)**: letters bloom at random times between 150 ms and 2.55 s and wither from 4.7 s.
- **Visitor (7 s)**: a gentle sway while a butterfly flies in from the left (1.8 s arc), perches on the poppy a quarter of the way across (until 3.4 s, a wing flap at 2.4–2.8 s), hops to the poppy three-quarters across (to 4.6 s), rests (flap at 5–5.3 s), and flies out to the top right.

**Export**: MP4 (avc1 if supported, else WebM) is recorded from an offscreen 1080 canvas with MediaRecorder at 14 Mbps, 30 frames per second of loop, frames drawn deterministically one per 1/30 s; the button shows progress and then "Saved MP4 · N frames". PNG frames renders the same frames to PNGs and downloads them as a stored (uncompressed) ZIP built in the browser, named letterbloom-<words>-<preset>-frames.zip.

Clicking "Type" returns to the live garden and refocuses the input.

## 10. Responsive behaviour

- **Up to 600 px wide**: wordmark top 24 px, left 16 px, 13 px; toggle right 12 px, buttons 7 px 13 px at 12 px; bottom bar left/right 16 px, bottom 16 px, gap 12 px, 11 px text; hints gap 12 px; the controls row takes the full width (swatch pill on the left, PNG/SVG on the right); swatches shrink to clamp(13 px, (100vw − 183 px)/10, 22 px) with 4 px gaps; buttons 7 px 11 px. The type uses 68% of the width and wraps phrases onto two lines.
- **Landscape phones (height ≤ 460 px)**: the bar sits 10 px from the bottom and the hint row is hidden.
- **Up to 720 px wide in Poster mode**: the screen becomes one scrolling column: the square canvas first (full width, max 520 px, 64 px top padding), then the panel below a 1 px #262624 top border; a 60 px fade from #111110 sits under the toggle while scrolling.
- Touch devices show "tap to type" hints; tapping the canvas opens the keyboard; the app follows the visible viewport above the keyboard.
- All values include env(safe-area-inset-*) offsets.

## 11. Reduced motion

With prefers-reduced-motion: reduce, the boil is turned off, every growth, spring, sway and wither is shown in its finished state (time is advanced past all animations), the caret appears at full height, and the swatch and button transitions are removed. Typing still adds and removes letters instantly.

## 12. Acceptance checklist

- On load: an empty field in Ember (#1C1C1B) with the blinking cream caret, "letterbloom" top-left, the Type/Poster pill top-right, the hint row and swatches bottom.
- Typing "red poppy" at 1440 × 900 sets the word at roughly 78% of the width in cream Playfair Display, with orange poppies, khaki stems, feathery leaves and pods weaving over and under the letters, mostly above the word.
- Poppies open petal by petal with a spring, then show a black centre, a ring of black stamen dots, a khaki cap and pale apricot petal lines.
- Linework visibly boils every 120 ms; new letters sway for 2.5 s; stems lean toward the cursor.
- Space adds blooms to the word's end; Backspace withers the last letter in about a quarter second; Enter clears.
- Clicking spawns a white butterfly that lands on a poppy; double-clicking plants a poppy.
- Each swatch recolours everything live; PNG and SVG download.
- Poster mode shows the looping square with all seven presets and both exports.
- No horizontal scrolling at any width; phones wrap the phrase onto two lines; nothing in the interface overlaps.