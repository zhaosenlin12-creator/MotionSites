# Glyph Animals — recreation brief

Build a single-file, full-screen browser "new tab" page: a near-black grid on which a flock of animals made entirely of keyboard characters travels across the screen, with a frosted liquid-glass species switcher at the top, a centred greeting with a round avatar, a large glass AI composer box, a "Tweaks" panel of live sliders, and a tiny "click to scatter" hint. Seven species can be switched: Moth, Rabbit, Sea turtle, Squid, Owl, Flying fish, Eagle. Every animal is drawn procedurally on a 2D canvas each frame; there are no images, sprites, videos or external assets of any kind apart from two web fonts. The whole thing is one HTML file with inline CSS and one inline script (no libraries, no build step).

## 1. Assets and fonts

There are no image or video assets. The only external resources are two Google Fonts, which in the delivered file are embedded as base64 WOFF2 data URIs (latin subset) so the page makes zero network requests.

| Font | Weights | Source | Used for |
|---|---|---|---|
| Geist (variable) | 400–500 | https://fonts.google.com/specimen/Geist (latin woff2: https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2) | All UI text |
| Geist Mono | 600 | https://fonts.google.com/specimen/Geist+Mono (latin woff2: https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeHjL65U5Ck.woff2) | Every glyph on the canvas, the Tweaks section headers and values, the "click to scatter" hint |

Declare both with font-display swap. The greeting uses the stack -apple-system, BlinkMacSystemFont, "SF Pro Display", Geist, system-ui, sans-serif; the composer uses the same stack with "SF Pro Text". Body text is Geist, ui-sans-serif, system-ui. The canvas's CSS font-family is "Geist Mono", ui-monospace, Menlo, monospace, and the renderer reads it from getComputedStyle. Wait for document.fonts to load "600 16px Geist Mono" before drawing a reduced-motion still.

## 2. Document head and colour tokens

- html lang="en" with data-theme="dark". Title: "glyph animals". Viewport: width=device-width, initial-scale=1, viewport-fit=cover.
- A tiny head script adds class "liquid" to the html element when the user agent contains "Chrome/" (only Chromium can run an SVG filter inside backdrop-filter; other browsers get plain frosted glass).
- An invisible inline SVG (0×0, absolutely positioned) defines filter id "liquid-glass": feTurbulence type fractalNoise, baseFrequency "0.007 0.011", numOctaves 2, seed 11, result noise → feGaussianBlur stdDeviation 2 → feDisplacementMap on SourceGraphic with that map, scale 40, xChannelSelector R, yChannelSelector G. color-interpolation-filters sRGB, filter region x/y 0, width/height 100%.

Dark theme tokens (the page always runs dark; a light token set exists but is unused):

| Token | Value |
|---|---|
| --bg | #06070c |
| --text | #e8ebf7 |
| --text-soft | rgba(232,235,247,.72) |
| --muted | rgba(232,235,247,.4) |
| --tint-a / --tint-b | .1 / .03 |
| --glass-edge | rgba(255,255,255, .14 × --edge) |
| --glass-rim | rgba(255,255,255, .32 × --edge) |
| --glass-rim-low | rgba(255,255,255, .08 × --edge) |
| --glass-glow | rgba(140,170,255,.07) |
| --glass-sheen | rgba(255,255,255,.1) |
| --glass-shadow | 0 16px 48px rgba(0,0,0,.55), 0 2px 8px rgba(0,0,0,.4) |
| --chip / --chip-hover / --chip-edge | rgba(255,255,255,.05) / .12 / .1 |
| --accent | #7aa2ff |
| --thumb | rgba(255,255,255,.14) |
| --focus | rgba(122,162,255,.3) |

html and body: margin 0, height 100%, background var(--bg), overflow hidden, antialiased text.

## 3. The glass material (shared by every floating UI element)

Class "glass": position fixed, isolation isolate; background a 135° linear gradient from rgba(255,255,255, tint-a × --tint) to rgba(255,255,255, tint-b × --tint); 1px border var(--glass-edge); box-shadow = inset 1px 1px 0 rim, inset -1px -1px 0 rim-low, inset 0 0 24px glow, then the glass shadow; backdrop-filter blur(var(--blur, 6px)) saturate(180%). Under html.liquid the backdrop-filter becomes url(#liquid-glass) blur(var(--blur)) saturate(180%). A ::after pseudo-element covers the element (inset 0, z-index -1, border-radius inherit) with a 180° gradient from --glass-sheen to transparent at 48%. Transition background, border-color and box-shadow over .4s. --tint defaults to 0 and --edge to .55 (set on the root by the Tweaks "Chat glass" group).

## 4. Layout, in DOM order (desktop 1440×900 reference)

1. Canvas (class field, aria-hidden): display block, 100vw × 100vh, touch-action none. It is the whole background.
2. Top bar: fixed, z-index 30, top 18px, horizontally centred (left 50%, translate -50% 0), flex with 8px gap. Inside it a radiogroup "Animal" with classes "choices glass" (position relative inside the bar): flex, gap 2px, padding 4px, border-radius 999px, --blur 5px, max-width max(240px, 100vw − 300px), horizontally scrollable with hidden scrollbar.
   - First child: a "thumb" span (absolute, top 0, left 0, height 32px, radius 999px, background --thumb, box-shadow inset 0 1px 0 rim plus 0 2px 8px #0000001f). Its translate and width transition over .35s with cubic-bezier(.3,1.3,.5,1) (a slight overshoot). It is moved to the selected pill with translate = the button's offsetLeft and offsetTop, and width/height = the button's size; it re-places on resize and when fonts are ready.
   - Then seven buttons, role radio, in this order and with these dot colours: Moth rgb(232,162,124); Rabbit rgb(248,199,181); Sea turtle rgb(109,176,138); Squid rgb(232,106,160); Owl rgb(217,195,160); Flying fish rgb(133,227,221); Eagle rgb(230,233,242). Each button: inline-flex, gap 7px, height 32px, padding 0 13px 0 11px, no border or background, 13px weight 500, colour --muted (hover --text-soft, checked --text), colour transition .3s. The dot is a 9px circle whose background is a radial gradient at 35% 30% from the swatch mixed 50% with white to the pure swatch at 70%. Left/Right arrow keys move the selection; the selected button gets tabindex 0 and the rest -1.
3. Stage (main): fixed and centred (top/left 50%, translate -50% -50%). It holds:
   - A masthead positioned absolutely above the composer (bottom 100%, centred, margin-bottom 28px, column flex, gap 16px, pointer-events none) with a 66px round avatar and then the greeting.
   - The avatar is a frosted circle (gradient #ffffff1a→#ffffff05 with the glass backdrop blur and, under .liquid, the displacement filter) whose ::before carries, at 62% opacity, a fine 176° stripe pattern (2px light / 3px dark bands) over a radial grey sphere #9a9ea8 → #4a4d55 (62%) → #24262c, so it reads as a soft grey marble.
   - The greeting h1: no margin, nowrap, size clamp(24px, 5vw, 32px), weight 500, line-height 1.15, letter-spacing -0.02em, colour #e8e8e8, text-shadow 0 0 6px and 0 0 24px in the background colour so animals passing behind never hurt legibility. Text depends on the local hour and refreshes every minute: 5–11 "Good morning, Rosalie", 12–16 "Good afternoon, Rosalie", 17–21 "Good evening, Rosalie", otherwise "Still up, Rosalie?".
   - The composer form ("composer glass"): width min(720px, 100vw − 32px), column flex, gap 18px, padding 18px 12px 12px 18px, radius 24px, --blur 7px, --glass-rim at .14 × edge and --glass-sheen .04. On focus-within its border becomes rgba(122,162,255,.3 × edge) and it gains a 3px rgba(122,162,255,.12 × edge) focus ring. Row 1: an 18px search icon (circle r 6.5 at 10.5,10.5 plus a line to 20.5,20.5; stroke 2; colour #8d8d8d; 4px top margin) and a one-row auto-growing textarea, placeholder "Ask anything..." (17px, line-height 1.55, colour #ececec, placeholder #8d8d8d, max height 200px, then it scrolls). Row 2, space-between: a pill button with a 16px plus icon and "Add tabs or files" (height 34px, padding 0 14px 0 11px, 1px rgba(255,255,255,.1) border, radius 999px, 14px, colour #c4c4c4, hover background #ffffff0d) and, on the right, a 34px round mic icon button (#8d8d8d, hover #ffffff0f) and a 34px round send button with an up arrow (background #3a3a3a, colour #e6e6e6; disabled state #333 / #7c7c7c; enabled hover #f2f2f2 with #1c1c1c). Send is disabled until the textarea has non-blank text; Enter (without Shift and not composing) submits; submitting dispatches a "chat:submit" CustomEvent with the text and clears the box. On devices with a fine pointer the textarea is focused on load.
4. The hint paragraph "click to scatter": fixed at left 14px, bottom 12px, Geist Mono 600 11px, letter-spacing .02em, colour --muted, not selectable, pointer-events none.
5. The Tweaks opener and panel are created by script (see section 9).

## 5. Responsive behaviour

| Condition | Changes |
|---|---|
| width ≤ 920px | The species bar wraps onto rows (flex-wrap, centred, row-gap 2px, overflow visible, radius 22px) instead of scrolling, so all seven options are always visible; the thumb follows rows because it uses offsetTop too |
| width ≤ 720px | Top bar spans left/right 12px (top = max(12px, safe-area top)), the bar may use 100% width; the Tweaks opener moves to the bottom-right (bottom = max(12px, safe-area bottom)); the open panel becomes a bottom sheet (left/right/bottom 12px, auto width, max-height 70vh); the hint sits at bottom max(22px, safe-area + 10px) |
| width ≤ 640px | Pills shrink to height 30px, padding 0 11px 0 9px, gap 6px, 12.5px text (thumb 30px) — two rows on a 375px phone |
| width ≤ 520px | The "Add tabs or files" label hides, leaving the round plus button (padding 0 9px) |
| width ≤ 360px | Pills padding 0 8px 0 7px, gap 5px, 12px text — still two rows at 320px |
| width ≤ 640px and height 521–700px | Avatar 48px, masthead gap 10px and margin 18px, stage centre pushed down 30px so the wrapped bar never touches the avatar |
| height ≤ 520px (landscape phones) | Avatar hidden, masthead gap 8px / margin 14px, greeting 22px, composer gap 10px and padding 12px 10px 10px 14px, top bar at max(8px, safe-area top), stage centre pushed down 24px |
| prefers-reduced-motion | All UI transitions off; the canvas draws a single settled still (see section 8) |

## 6. The canvas renderer (the ASCII grid)

The canvas is sized to its CSS box times devicePixelRatio (capped at 2) and redrawn every frame. It is a grid of character cells:

- Cell width cw = clamp(round(viewport width ÷ 124 ÷ detail), 5, 24) px, cell height ch = round(cw × 1.45). "detail" is the per-species "ASCII detail" tuning (1.3 by default; 1.7 for Rabbit and Eagle). At 1440 wide and detail 1.3 the cells are 9 × 13 px.
- Background layer (cached on an offscreen canvas, repainted only on resize, grid change or hue change): fill rgb(6,7,12), then 1px grid lines on every cell boundary in rgba(255,255,255, 0.055 × grid), where "grid" is a tuning (1.05 default).
- Each frame: copy the background, draw the trail layer, then draw every non-empty cell. Text is drawn centred in its cell with font "600 round(ch × 0.74)px" + the canvas font family, textBaseline middle, at y + ch/2 + 1.
- Cell states: empty, stroke (glyph only) and solid (a filled rectangle inset 1px — x+1, y+1, cw−1, ch−1 — plus a glyph on top). Solid cells win over strokes.

How an animal becomes cells: every animal is an implicit shape function of local coordinates (u along its heading, v across it, both in units of its "span" in pixels). For each cell inside a square of ± extent × span around the animal, the function is probed at the cell centre and at four sub-points (fractions .25/.30, .75/.30, .25/.72, .75/.72 of the cell). It returns false (outside) or a colour plus a "kind" and optional glyph set. Coverage = hits ÷ 5.

- If the centre is outside or coverage < 0.6 it is an edge cell: a stroke whose glyph is picked from ":;" (coverage ≥ .5) or ".',`" and whose colour is the cell colour faded toward the background by fog + .55 − .45 × coverage.
- Otherwise the cell is solid, with a fill and a glyph colour that depend on the kind:

| Kind | Fill | Glyph colour | Default glyphs |
|---|---|---|---|
| Plain | colour (with fog) | 0.42 × fill | ".:;+=*%#" chosen by inverse luminance ± 1 jitter |
| Shine | same as Plain, but brightness × (1 − .4 × shimmer + shimmer × sin(2.2t + 9u + 6v + tilt + 2 × heading)) | 0.42 × fill | same ramp |
| Dark | colour | fill × 1.7 + (34,30,30) | "#%@" |
| Light | colour | 0.4 × fill | "o*" |
| Fur | colour | fill × 1.6 + (44,40,36) | "8#@" |
| Soft | colour faded by min(1, .62 + .38 × fog) | colour | ".:;+=*%#" |
| Bright | 0.58 × colour | colour × 1.05 + 50 | ".:*" |
| Line | no fill (stroke only, never over a solid) | colour | ".:+*" by luminance |

- Glyph choice is stable per animal: a hash of the animal id and the cell's rounded local position picks a character from the set, so patterns stick to the body as it moves instead of flickering.
- Every cell's brightness gets a tiny ±3% flicker that re-rolls 6 times a second. Sparkle: a per-cell hash re-rolled ~2.4 times a second turns the glyph pure white, light ice blue or pale cyan when below the "sparkle" tuning (full rate on Shine, a third on Plain, also on Soft and Bright).
- Depth fog: fog = (1 − depth) × "Distance fade" tuning; colours are mixed toward the background by that amount.
- Hue shift: all colours are passed through a standard luminance-preserving hue-rotation matrix by the "Hue shift" degrees.
- Lines: segments between two points are rasterised every half a cell, each cell getting a stroke glyph chosen from the segment angle ("-", "\\", "|" or "/"), optionally ending in a custom glyph. Dots put one glyph in one cell. Spots are single solid cells with their own fill and glyph (used for eyes, written as "●").

Trails: a per-cell energy field. Animals "shed" energy into the cell under a point (amount × "Trail" tuning, capped at 1.6); taps and landings "stamp" a round blob of radius r cells (rows weighted 1.4×). Each frame the field is diffused (new = (4 × self + 4 neighbours) ÷ 8) and decays by exp(−dt × "Trail fade"). It is drawn as small squares (size max(2, round(0.19 × cw)) px, one larger above 0.6 energy) centred at 50%/60% of each cell, in six alpha steps of the species' trail colour (alpha 0.85 × step/6), with a gentle per-cell twinkle (× 0.75 + 0.25 sin(5t + hash × 40)). Trail squares never draw over solid cells.

## 7. The flock (shared motion system)

- Fixed-step simulation at 60 Hz (accumulator, at most 4 steps per frame, dt capped at 0.1 s). Drawing happens every requestAnimationFrame; the loop pauses when the canvas is not intersecting the viewport and never runs under reduced motion.
- base size = clamp(min(viewport w, h) × 0.2, 80, 190) × species scale. Each animal has a random "roll" 0–1; depth = farthest + (1 − farthest) × roll^farBias; span = base × depth × size. Animals are kept sorted by roll so near ones draw last (on top).
- Population: target = clamp(round(w × h ÷ (area × (base ÷ scale ÷ 160)²) × density), 1, 200). Extra animals are removed at random; new ones spawn off-screen on the upwind edge (or, on first load and half of later spawns, anywhere on screen).
- Course: the travel direction in degrees (0 = right, 90 = up) from the species' "Direction", or, if "Corner to corner" is on, the bottom-left-to-top-right diagonal of the window. The group heading sways: course + sway × (sin(0.13t) + 0.5 sin(0.31t + 1.7)). Each animal has a bias in −1..1 multiplied by "Spread".
- Steering: acceleration toward (cos aim, sin aim) × speed minus current velocity, times a gain; separation pushes apart animals within (spanA + spanB) × reach whose depths differ by less than 0.18, strength = "Separation"; speed is capped (plus 300 px/s while startled). cruise speed = species speed × (0.55 + 0.45 × depth) × "Speed". The heading turns toward the velocity at a limited rate.
- Wrapping: when an animal has passed the downwind edge by one span (or is three spans off-screen anywhere) it re-enters on the upwind edge, placed along the edges in proportion to their exposure to the course.
- Tap / click (pointerdown on the canvas only, ignored under reduced motion): stamps a 6-cell trail burst of 1.4 at the point and startles every animal within 240 px with strength k = 1 − distance/240 (each species reacts in its own way below), unless the species overrides taps (Sea turtle drops food instead).

## 8. The seven species

Default travel directions: Moth, Sea turtle, Owl and Eagle 49° (toward the top-right); Squid and Flying fish 131° (toward the top-left); Rabbit 0° (straight left to right). All other tuning defaults are listed per species; unlisted values come from the shared defaults: density 1, speed 1, sway .04, spread .06, size 1, farthest .45, farBias 1.6, grip 2, separation 300, hue 0, shimmer .3, sparkle .12, fog .75, trail 1, trail fade 1.3, grid 1.05, detail 1.3.

### Moth (flutter and glide) — default species
- Species: scale 1, area 48 000, speed 90, trail colour (255,196,156). Defaults: density 1.05, speed 1.05, sway 0, spread 0, size 1.25, farthest .18, farBias 1.7, grip 5, separation 700, trail 1.55, trail fade .15, flutter 0, glide 2.75, flap rate 1.
- Motion: steer along the course with grip; random flutter impulses (√dt × 520 × 1.3 × flutter, damped ×3/s, reduced while gliding); each downstroke (max(0, −sin phase)) pushes forward 1.4 × cruise. Wing phase advances at 2.6 Hz × flap rate × (0.8 + 0.6 × speed fraction) × (1 − 0.9 × glide). Glides start at random (0.35 × glide per second) for 0.5–1.4 s and ease in at rate 6. Wing opening = 0.1 + 0.9 × (((0.5 + 0.5 cos phase)^0.8) × (1 − glide) + 0.96 × glide). The drawn heading wobbles by 0.06 sin(phase).
- Startle: velocity kick of k × 420 × depth away from the tap, startled 0.6–1.2 s, glide cancelled.
- Shape (extent 0.78): a furry body along the axis — head disc centred at u .15 (radius .04), thorax half-width .05 from u −.04 to .11, abdomen tapering from .046 to ~.016 at u −.34; head/thorax Fur (112,70,50) glyphs "%#8"; abdomen banded Fur (70,42,32) / (150,98,72) every 1/22. Wings are polar lobes measured from a pivot (angle = atan2(u − pivot, |v| ÷ opening)): forewing pivot u .05, angles −.78….46 rad, reach .64, peak at 70% of the sweep, roundness .3; hindwing pivot u −.05, angles −1.55…−.3, reach .38, peak 50%, roundness .55, slightly scalloped. Colouring by normalised radius r: r > .86 dark rim (84,46,32) with cream (252,230,204) Light dots along the forewing edge; r < .1 dark root (120,72,50); a wavy dark cross-band on the forewing at r ≈ .5 (150,88,60); a dark "@" eyespot on each hindwing; otherwise Shine (200 + 48r, 132 + 46r, 96 + 40r). Lighting 0.6 + 0.4 × opening.
- Feathery antennae: two lines from (.17, ±.014) to (.36, ±.13) with a slight wobble, colour (214,170,130), each with three short side barbs when the moth is wider than 70 px. Wing tips shed trail energy (more on the downstroke).

### Rabbit (hop in bursts, bolt on tap)
- Species: scale 1.15, area 80 000, speed 95, trail (226,190,168). Defaults: direction 0, detail 1.7, fog .12, density 1.6, sway 0, spread 0, farthest .3, farBias .8, grip 3, separation 420, trail 1.2, trail fade .35, shimmer .1, sparkle .03, burst 1, pause 1, hop speed 1, scare .6.
- Motion: alternates running and resting — running lasts 0.5–1.6 s × burst, resting 0.3–1.4 s × pause (never rests if pause is 0). While running it steers to cruise speed along the course (gain 2 × grip); resting it brakes to zero. The heading turns toward its velocity at 3 rad/s (10 while fleeing). A hop amount eases to 1 above 12 px/s; the gait phase advances by dt × max(speed, 30 × hop) × hop speed ÷ max(4, 0.32 × span); each completed hop stamps a footprint (radius 0, 0.5 × depth × trail) just below the body.
- Startle (scare > 0): flee direction away from the tap ± .35 rad, flee speed cruise × (2.5 + 3k) × scare for (1 + 1.5k) × √scare seconds (speed fading quadratically), ears flatten (alarm = 1, fading at 0.7/s).
- Drawn in side view, never upside down: it faces right or left by the sign of its horizontal velocity and tilts only 35% of the slope (max ±.6 rad). During a hop the whole rabbit lifts by 0.16 × span × sin(π × hop phase) and grows 8%, and a stretch value sin(2π × phase − .4) lengthens the body and pushes the hind feet back. Shape (extent .56, +v = down): two long ears from (.13, −.12) and (.105, −.11), angled back by .35 + .35 × air + .25 × alarm, length .24, width .034 tapering, the near ear with a pink (244,150,156) Light inner stripe, the far one 18% darker; head ellipse at (.17, −.07) .09 × .072 (pink nose cells at the front); a white (255,250,246) Light "*@" cotton tail at (−.28, −.01) r .048; body ellipse at (−.05, .02) .2 × .125 (stretching) plus a haunch circle at (−.15, .05) r .12; underside below v .08 shaded (206,150,132) Fur; otherwise speckled Fur (248,199,181) "%8"; a hind foot ellipse along the ground and a front paw stroke that reach out during the hop. Eye spot "●" at (.2, −.09), dark on a pale fill.

### Sea turtle (swim and feed)
- Species: scale 1.6, area 110 000, speed 46, trail (110,200,186). Defaults: fog .64, density 1.4, speed 1.4, spread 0, sway 0, farthest .33, farBias 1.3, grip 2.65, separation 780, trail 3, trail fade .4, shimmer .35, sparkle .08, meander .4, flipper beat 1, food range 200.
- Motion: aims along the course plus meander × 0.6 × sin(0.35t + 1.7 id) (lazy S-curves), blended with separation; turns at most (0.9 × grip … 2.6 when hungry) rad/s; speed = cruise × (0.85 + 0.25 sin(0.5t + id), rising to 1.8× when chasing food). Flipper phase advances at (1.4 + speed/40) × flipper beat.
- Tap = feeding (no scatter): 7–11 pellets appear within 70 px of the tap, drifting outward at 4–14 px/s and slowing (×e^(−0.8 dt)), each with a small 1-cell ripple stamp; at most 60 pellets; they live 14 s, drawn as "o" then "." (fading over the last 30% of their life) in (190,226,150). A turtle notices the nearest pellet within the food range, turns harder and swims faster the closer it is, and eats it when within 0.32 × span + 6 px (a 0.7 ripple stamp).
- Shape (extent .58, top-down): shell ellipse centred at u −.02, semi-axes .28 × .22 — rim band (normalised radius > .83) Dark (74,132,100) "="; two vertebral seams at |v| ≈ .34 of the shell and cross seams every 1/1.7 (1/1.4 on the sides) Dark (40,84,62); plates Shine (109,176,138) brightened toward the centre (× .86 + .32(1 − r)). Head ellipse at u .33 (.085 × .07) and neck, skin (142,200,164). Front flippers are tapered blades from (.12, ±.17), length .24, swept by angle 1.25 − 0.6 sin(phase) × beat; rear flippers from (−.2, ±.13), length .11, angle 2.5 + .28 sin(phase + 1.4); a small tail at the back. Eyes "●" at (.37, ±.045). Sheds trail energy from the back of the shell.

### Squid (pulse and jet)
- Species: scale 1.55, area 95 000, speed 55, trail (255,140,196). Defaults: direction 131, speed 1.05, sway .04, spread .08, farthest .3, farBias 1.4, grip 1.4, trail .8, trail fade .6, sparkle .1, pulse rate 1, pulse power 1, pulse glow 1, arm length 1 (no shimmer control).
- Motion: pulse phase advances at 0.6 Hz × pulse rate × (0.9 + 0.2 roll). The squeeze value rises over the first 22% of each cycle (smoothstep) and relaxes over the rest; only during that first 22% does it jet forward (acceleration 6.2 × cruise × pulse power), always with drag (−1.4 × velocity). Heading turns toward the course at most 0.6 × grip rad/s; a smoothed turn rate bends the arms.
- Startle: jumps straight to the start of its next pulse and gets a forward kick of 260 × k × depth.
- Background: drifting marine snow, one particle per 6 000 px², sinking at 3–12 px/s with a little sideways wobble, "." or (8%) "*", pink (255,176,214), twinkling via fog.
- Shape (mantle forward, arms trailing): the mantle runs from u −.02 to .52 with half-width .1 × (1 − .16 × squeeze) × √(1 − s^2.4); rim Bright (255,200,226) ":;", a Bright dorsal stripe "|", chromatophore speckles Dark (150,40,96) "%#" that re-seed twice a second (shimmering skin), otherwise Shine (232,106,160) brighter toward the centre. Two Soft fins over the last 38% of the mantle (up to .11 extra width). A head ellipse at u −.06. A soft "." halo around the mantle that brightens with the pulse glow (glow = smooth rise over the first 16% of the cycle, then e^(−4.5 × time)). Eyes "●" at (−.055, ±.06). Eight arms: 12-segment lines from the head, length .42 × arm length (±15%), spread ±.06 that bunches by 55% on the squeeze, waving 0.035 sin(phase − 3.5s + 1.3i), colour (232,104,168), fading toward the tips. Two long tentacles: 22 dotted steps of ":" / "|" length .78 × arm length, ending in an "o@o" club (255,160,204) that sheds a little trail.

### Owl (hover, then swoop)
- Species: scale 2.1, area 130 000, speed 70, trail (236,212,170). Defaults: fog .26, density 1.5, sway 0, spread 0, farthest .32, farBias 2.4, grip 5, separation 720, trail .6, trail fade 1.2, sparkle .08, hover 1.3, cruising .5, swoop speed 1.3, wingbeat 1 (no shimmer control).
- Motion is a three-state machine. Hover lasts min(3, max(.15, exponential with mean .7)) × hover seconds, with a gentle figure-eight drift (40 px/s² wobble) while holding a quarter of cruise speed. Then a swoop: 0.15–0.45 s at 4 × cruise × swoop speed, very sharp turning (14 rad/s). After a swoop it either cruises (probability = cruising) for 1.2–4.5 s along a wandering aim or hovers again; after a cruise it swoops (35%) or hovers. Wing tuck eases to 1 while swooping. Wing phase runs at 3.4 Hz while hovering, 2.2 Hz otherwise, × wingbeat × (1 − .85 tuck). Swoops shed trail.
- Startle: forces an immediate swoop along the group heading lasting .25 + .3k s.
- Shape (top-down, extent .66): face disc centred at u .13, radius .1 — rim Dark (128,100,70), cream face (244,232,206) with a small "v" beak; two "^" ear tufts at (.19–.26, ±.06); body ellipse (−.06, .16 × .085) Fur (217,195,160) "%8" with Dark "v" chevron bars; a barred tail from u −.18 to −.34. Wings from |v| .06 out to .06 + .5 × opening, opening = max(.3, (.55 + .45 × (0.5 + 0.5 cos phase)^0.8) × (1 − .5 tuck)); leading edge .12 − .04s − .06s², trailing edge −.18 + .08s with a slight feather scallop; the last 20% rounds off and shows five slotted "finger" feathers; pale coverts (238,220,184) along the front inner part, Dark (150,118,82) bars across the flight feathers, otherwise Plain (217,195,160) shading lighter toward the leading edge. Big amber eyes: "●" spots at (.135, ±.045), near-black on fill (250,186,58).

### Flying fish (leap)
- Species: scale 1.25, area 85 000, speed 80, trail (120,214,226). Defaults: direction 131, fog 0, size 1.2, density 1.3, sway 0, spread 0, farthest .35, farBias 1.4, separation 450, trail 3.45, trail fade .4, shimmer .25, sparkle .1, how often 1, leap length .6, leap height 1 (no Hold-course control).
- Motion: between leaps it waits still (just turning to its aim) for 0.5–2.2 s ÷ (how often × speed). A leap targets a point span × 2.4–3.6 × leap length × speed ahead along the course (aim clamped within ±.35 rad of the group heading); if separation is on it tries distance multipliers 1, .8, 1.2, .65, 1.35 and keeps the one with the most room from other fish. A leap takes .42–.55 s × √leap length and moves linearly. On landing it stamps a radius-2 ripple of .7 × depth × trail, then picks a new aim (heading ± .7 × spread).
- Startle: a non-waiting fish leaps straight away from the tap with power 1 + k (20% faster).
- Look of a leap: arc = 4s(1 − s) × leap height; the fish draws (1 + .35 arc) larger at the top. Between leaps it is "under water": faded by an extra .22 fog and swaying slightly; it surfaces within the first and last 10% of the leap. The pectoral "wings" (polar lobe pivot u .12, angles −1.2…−.12, reach .46, peak 36%, scalloped) are 42% open at rest and spread fully during 16%–72% of the leap; small pelvic fins behind (pivot u −.1, reach .2). Fins are Soft (160,238,232) ".:" with Line rays (92,190,186) every 1/8 of the sweep. Body from u −.3 to .32, half-width .082 × sin profile, dark back Dark (62,150,150) "=:", Light belly (224,250,246) "o.", Shine flanks (133,227,221). A deeply forked tail from u −.28 to −.46 (lower lobe 15% longer). Eye "●" at (.24, ±.032).

### Eagle (slow wingbeat and soaring glide)
- Species: scale 1.5, area 60 000, speed 82, trail (200,204,226) (trail is 0 by default). Defaults: detail 1.7, density .75, speed 1.4, sway 0, spread 0, farthest .35, farBias 1.3, grip 3, separation 150, trail 0, shimmer .1, sparkle .04, wingbeat .85, glide 1.6, folding flap off.
- Motion: steers along the course (gain = grip) with separation (reach .45), cap 1.6 × cruise, turning 2 rad/s. Glides start at random (0.25 × glide per second) for 1–2.5 s, eased at rate 3. Wing phase: 1.25 Hz × wingbeat × a per-bird pace .8–1.2 × (1 − .92 glide).
- Wing pose: with folding flap off, arm = hand = max(.12, .25 + .75 × (flap × (1 − glide) + glide)) where flap = (0.5 + 0.5 cos phase)^0.8. With it on: a slow downstroke over 60% of the cycle (angle .85 → −.6, a slight forward sweep and a lift that scales the bird up 2.5%) and a quick upstroke that folds the hand back at the wrist (sweep up to 1.05 rad, wrist bend .45); the glide blends everything toward a flat, open wing.
- Shape (seen from below, extent .68): wings from the body edge (.05) to the tip (.54) with the wrist at .25; the wrist-to-tip part is rotated by the sweep and both parts are compressed by arm/hand. Chord: leading edge .13 + .02s − .07s², trailing edge −.115 + .025s with a feather scallop (cos 8 cycles) on the inner 74%; the tip rounds off over the last 30%, where six spread "finger" primaries are cut by slots. Outer primaries Dark (112,120,144); trailing flight feathers Dark (150,158,180) "=#"; white wing linings (236,238,246) toward the leading edge. White body ellipse (.17 × .062) with faint "v" chest bars; bright white head (252,252,255) Light "o." at u .215 (.075 × .048); gold (240,190,70) hooked beak "@" and "v"; a white fan tail from u −.14 to −.38 widening to ±.12 with notched tips; two gold talon lines under the tail. Gold-ringed eyes "●" at (.225, ±max(.026, cw/span)) when the bird is large enough. Lighting .82 + .18 × arm.

## 9. Tweaks panel

- Opener: a glass pill fixed at top 16px, right 16px (z-index 10), height 34px, padding 0 14px 0 12px, 13px weight 500, --text-soft (hover --text), --blur 10px, with a 15px sliders icon and the word "Tweaks". Under .liquid the Tweaks elements use plain blur, not the displacement filter. Dark background colour #0a0c148c behind the glass.
- Panel: glass aside, top 16px right 16px, width 288px, max-height 100vh − 32px, radius 20px, 12px text, --blur 18px, tint .1/.06. Header (padding 12px 10px 10px 16px, bottom border --chip-edge): title "Tweaks" (13px 500), "Copy" and "Reset" chip buttons (26px tall, radius 999px) and a 26px round close "×". Body scrolls (padding 4px 16px 14px, overscroll contained).
- Groups, each with an uppercase Geist Mono 600 10px header (letter-spacing .08em, --muted): "Movement" (Density 0.1–4; Corner to corner toggle; Direction 0–360°, disabled while Corner to corner is on; Speed 0.1–3; Sway 0–.6; Spread 0–.8; Size 0.3–2.5; Farthest depth 0.1–1; Far bias 0.3–3; Hold course 0.2–5; Separation 0–1000), then the species' own group(s) (Moth "Flight": Flutter, Glide, Flap rate; Rabbit "Hopping": Burst length, Pause length, Hop speed, Scare; Sea turtle "Swimming": Meander, Flipper beat and "Feeding": Food range; Squid "Swimming": Pulse rate, Pulse power, Pulse glow, Arm length; Owl "Flight": Hover time, Cruising, Swoop speed, Wingbeat; Flying fish "Leaping": How often, Leap length, Leap height; Eagle "Flight": Wingbeat, Glide, Folding flap toggle), then "Look" (Hue shift −180…180°, Shimmer, Sparkle, Distance fade, Trail 0–4, Trail fade 0.05–6, Grid 0–4, ASCII detail 0.5–2), then "Chat glass" (Blur 0–30 px default 3.5, Refraction 0–150 default 40 → the filter's displacement scale, Ripple 0.001–0.04 default .007 → turbulence baseFrequency "r r×1.5", Tint 0–3 default 0, Edge 0–2 default .55, Corner radius 0–48 default 24, Width 320–960 default 720 → the composer). Species that hide a control (Shimmer for Squid and Owl, Hold course for Flying fish) leave it out.
- Each row is a two-column grid: label and a Geist Mono 600 11px value (decimals from the step size), with the slider spanning beneath. Sliders: 18px tall, 4px track whose left part (up to the value, via a --fill percentage) is the accent colour and the rest --chip-edge; 14px white thumb with a faint border and shadow. Toggles: 30 × 18 px switch, accent when on, a 14px knob sliding 12px. Disabled rows fade to 40%.
- Hovering or focusing a row shows a tooltip to the left of the panel (max 240px, radius 12px, background #0e101aeb) with the hint text plus "Double-click the name to reset it." Double-clicking a label resets that value.
- Changes apply live. Detail triggers a resize; hue and grid repaint the cached background. Settings that differ from the species defaults are saved per species in localStorage under "wild-tab:tweaks:<species>" (tuning plus glass), and the open/closed state under "wild-tab:tweaks-open" (closed by default). Copy writes those changes as pretty JSON to the clipboard ("Copied", or "In console" if the clipboard is refused), reverting after 1.4 s. Reset asks "Reset all?" (red confirm styling) for 3 s and on a second click restores every default and clears storage. Another tab saving the same key reloads the page.
- Switching species rebuilds the flock with that species' defaults plus its saved tweaks, rebuilds the panel, clears the trail field and remembers the choice in localStorage "wild-tab:animal". A "?animal=<key>" URL parameter (moths, rabbits, turtles, squid, owls, flyingfish, eagles) picks the starting species, and "?count=N" fixes the number of animals.

## 10. Reduced motion and robustness

- Under prefers-reduced-motion the animation loop never starts: the flock is simulated silently for 4 s (240 steps) and one frame is drawn, re-drawn whenever a tweak changes, the window resizes or the preference flips; taps do nothing. Switching the preference off resumes animation.
- A ResizeObserver on the canvas re-sizes the grid and population; an IntersectionObserver pauses the loop when hidden. All localStorage access is wrapped in try/catch so the page works when storage is blocked.

## 11. Acceptance checklist

- One HTML file, no network requests beyond the embedded fonts, no console errors.
- At 1440×900: the species bar is centred at the top with Moth selected, the avatar, "Good … , Rosalie" and the 720px composer sit in the middle, Tweaks is top-right and the hint bottom-left; moths fill the grid flying toward the top-right.
- Each of the seven pills switches instantly to that species, with its own shape, colours, motion, direction and Tweaks group; the highlight slides to the chosen pill with a slight overshoot.
- Clicking empty space scatters animals (moths kick away, rabbits bolt, owls swoop, squid jet, flying fish leap away, eagles are pushed), drops food for the sea turtles, and leaves a trail burst.
- On a 375px phone and a 320px phone all seven pills are visible on two rows, nothing overlaps, nothing scrolls sideways; Tweaks opens as a bottom sheet. On a landscape phone the avatar hides and everything fits. With reduced motion a single still frame shows.