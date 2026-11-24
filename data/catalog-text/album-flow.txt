# Spindle: Dark 3D Cover Flow Music Website (exact recreation prompt)

Build a single-file, interactive hero page for a fictional music streaming service, **SPINDLE**. The centrepiece is a faithful recreation of the classic portable media player **Cover Flow** on a glossy black floor:

- **Layout:** sixteen square album covers stand in 3D. The centre album faces you flat, and the others are turned 72° and packed tightly on both sides, set back.
- **Reflections:** every cover has a mirror reflection on the floor that fades down.
- **Moving:** the flow follows the target with the device's quick exponential ease-out, and the leaving cover swings from flat to 72° as it slides away.
- **Letter box:** a white rounded box under the centre album shows the artist's initial.
- **Flip:** clicking the centre album lifts it forward and flips it 180° into a large tracklist, with a grey-blue glossy header and a glossy blue highlight row.
- **Website layer:** a nav, a big headline, a now-playing title with a progress scrubber, an A–Z index, and a soft glow tinted by the centre album's colours.

Use plain HTML, CSS (3D transforms) and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Spindle`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Font (Google Fonts):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the Inter latin woff2 files as base64 `@font-face` rules instead.
- **Variables:** `--bg:#050506`, `--ink:#f4f4f5`, `--mute:#8a8a90`, `--glow:120,90,200` (rgb triplet).
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `--bg`.
  - Body font Inter, antialiased, no selection.

## 2. Asset (URL exact)

**One 2048×2048 contact sheet**: a 4×4 grid of original album covers with white gutters.

- Cell column x-ranges: `[24,507] [529,1014] [1035,1519] [1541,2024]`
- Cell row y-ranges: `[24,505] [526,1012] [1032,1516] [1537,2023]`

`https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261107_114939_622a32d2-97e3-4fb9-8553-77eab7d548f0.png&w=2048&q=90`

Albums in cell order, as artist, title, then tracks:

0. **Aurel Vance**, *Northern Lights*: Northern Lights, Lake Effect, Altitude, Paper Planes, Sunlit Rooms, Driftwood, Long Exposure, Home by Morning. *(Cover: a mountain lake at sunset with a pink sun.)*
1. **Bluehour**, *Low Tide*: Low Tide, Undertow, Salt, Coral, Holding Breath, The Blue Hour. *(An underwater swimmer in blue light rays.)*
2. **Cass Mirelle**, *Velvet Static*: Velvet Static, Channel 9, Rewind, Red Light, Snow on Screen, Tracking, After Credits. *(A woman's profile in red VHS light.)*
3. **Dune Theory**, *Mirage*: Mirage, Heatwave, Chrome Sun, Oasis, Sand in the Gears, Horizon Line. *(A chrome sphere over orange dunes.)*
4. **Echo Park Kids**, *Summer Reruns*: Summer Reruns, Car Roof, Polaroid, Fireflies, Last Day of School, Reruns (Reprise). *(A faded polaroid of friends on a car roof.)*
5. **Fennel**, *Greenhouse*: Greenhouse, Condensation, Fern, Window Light, Slow Grow, Watering Can, Bloom. *(Plants behind foggy glass.)*
6. **Grey Harbor**, *Fog Signals*: Fog Signals, Lighthouse, Northbound, Tidewater, Harbor Lights, Morse. *(A lighthouse in fog.)*
7. **Halcyon Drive**, *Night Swim*: Night Swim, Chlorine, Deep End, Lifeguard Off Duty, Turquoise, Pool Lights, Dry Off. *(A neon pool at night.)*
8. **Juno Vale**, *Paper Moons*: Paper Moons, Scissors, Crescent, Glue Stick Heart, Origami, Phases. *(A cut-paper moon.)*
9. **Kaito Rei**, *Neon Rain*: Neon Rain, Shibuya 2AM, Umbrella, Puddles, Taxi Light, Last Train, Signal. *(A rainy neon street.)*
10. **Lumen**, *Afterglow*: Afterglow, Liquid, Ember, Prism, Violet Hour, Fade. *(An orange and violet gradient.)*
11. **Marlowe**, *Slow Burn*: Slow Burn, Matchstick, Smoke, Kindling, Embers, Ash, Relight. *(A lit match.)*
12. **Nadia Sol**, *Gold Hour*: Gold Hour, Lens Flare, Sun on Skin, Halo, Late August, Golden. *(A golden backlit portrait.)*
13. **Oslo Club**, *Cold Water*: Cold Water, Grid, Blue Circle, Helvetica, Fjord, Minimal. *(A swiss poster with a blue circle.)*
14. **Pale Atlas**, *Satellites*: Satellites, Star Trails, Observatory, Long Night, Orbit, Signal Lost, Dawn. *(Star trails over an observatory.)*
15. **Rivers & Co**, *Long Drive Home*: Long Drive Home, Mile Marker, Windshield, Gas Station Coffee, Exit 14, Headlights, Driveway. *(A highway at dusk through a windshield.)*

**Track length** for album i, track k: `s = 170 + ((i·37 + k·53) mod 110)` seconds, shown as m:ss.

**paint(el, k):**

1. Take the cell box, inset by 3px.
2. Set `background-size: (2048/w·100)% (2048/h·100)%`.
3. Set `background-position: (x/(2048−w)·100)% (y/(2048−h)·100)%`.

## 3. Layout

- **`#glow`:** fixed at left 50%, top 44%, 120vmin × 80vmin, centred.
  - Background `radial-gradient(closest-side, rgba(var(--glow),.34), rgba(var(--glow),.08) 55%, transparent)`.
- **Nav:** fixed, 84px tall, padding `0 3.2vw`, space-between.
  - "SPINDLE" at 21px, weight 500, letter-spacing .32em.
  - Links at 15px with a 44px gap: Discover (ink, active), Albums, Live (mute, ink on hover), and "Sign in" as a pill (1px `rgba(255,255,255,.55)` border, padding `9px 22px`, radius 40).
- **`#flow`:** fixed, left and right 0, top 9vh, height 62vh, `perspective: W·3.4px`, `perspective-origin: 50% 42%`, `cursor:grab`, `touch-action:none`.
- **Cover width W:** `round(min(innerHeight·.36, innerWidth·.34, 420))`, exposed as `--w`.
- **`.cv`:** absolute, centred (left and top 50%, W×W with negative margins), `transform-style:preserve-3d`.
  - **`.f` (front face):** inset 0, painted, `backface-visibility:hidden`, hairline ring `0 0 0 1px rgba(255,255,255,.06)`.
  - **`.r` (reflection):** top 100%, the same size, painted, margin-top 2px, `transform: scaleY(-1)` (origin 50% 50%), opacity .42.
    - Mask `linear-gradient(to top, rgba(0,0,0,.9), transparent 55%)`, so the mirror image fades away from the cover's bottom edge.
    - Hidden while flipped.
  - **`.bk` (back face, the tracklist):** centred, `1.62W × 1.08W`, `transform: rotateY(180deg) scale(1.18)`, `backface-visibility:hidden`, background `#fbfbfc`, shadow `0 30px 80px rgba(0,0,0,.5)`. It is shown only while flipping.
    - **Header `.hd`:** 16% of the height, padding 0 4%, text centred vertically.
      - Background `linear-gradient(#cdd8e4, #a7b8cb 50%, #97abc1 51%, #adbed0)` (the glossy two-tone bar), bottom border `#7489a1`.
      - Album title: bold 700, `W·.075`, white with text-shadow `0 -1px 0 rgba(40,60,90,.55)`.
      - Artist: `W·.05`, colour `#41505f`.
    - **Rows `li`:** `W·.108` tall, padding 0 4%, bold 700 at `W·.058`, with the title on the left and the length on the right, and a `#e3e5e8` divider.
    - **Highlighted row `.hi`:** white text on `linear-gradient(#6aa8f7, #3a7fe6 50%, #2a6fd9 51%, #3178df)`, with text-shadow `0 -1px 0 rgba(0,0,60,.35)`.

## 4. Cover Flow geometry and motion (as on the device)

**Constants:** `ANG = 72`, `GAP = .62`, `STEP = .2`, `DEPTH = .42`, all in units of W.

For each cover i, with `d = i − pos`, `a = |d|`, `s = sign(d)`:

- **a < 1:** `x = d·GAP`, `rot = −d·ANG`, `z = −a·DEPTH`. The centre swings progressively as it slides.
- **Otherwise:** `x = s·(GAP + (a−1)·STEP)`, `rot = −s·ANG`, `z = −DEPTH`.
- **Transform:** `translate3d(x·W, 0, z·W) rotateY(rot deg)`.
- **Stacking:** z-index `500 − round(a·10)`, so nearer covers sit on top.
- Covers with a > 9 are hidden.

**Following:** each frame, `pos += (target − pos)·(1 − e^(−dt·13))`, snapping when closer than .0005. This gives the device's quick ease-out, about 0.25 s per step, and fast input streams covers continuously.

## 5. Flip to the tracklist

- Clicking the centre cover (the one at the rounded target) or pressing Enter sets `flipped = i` and adds `.flip`. `flipK` animates from 0 to 1 over 0.62 s (back to 0 when closing).
- **Easing:** easeInOutQuad `e`. The flipped cover gets an extra `rotateY(e·180deg)`, and `z += sin(min(1, k·1.4)·π/2)·.55`, so it **lifts forward first, then turns**. Its z-index is 999.
- The letter box hides while flipped.
- **Inside the tracklist:**
  - Wheel or ↑↓ moves the highlight.
  - Clicking a row, or Enter, **plays** it.
  - Esc, ← → or dragging the flow flips it back.
- **Clicking a side cover:** flips back and sets the target to that cover.

## 6. Input

- **Wheel:** accumulate delta (horizontal if larger); every 60px moves the target by one cover, clamped 0 to 15. Passive false, with preventDefault.
- **Drag on the flow:**
  - Remember the cover under pointerdown (the pointer is captured, so on pointerup the target is the flow itself).
  - Past 4px it becomes a drag: `pos = clamp(p0 − dx/(W·STEP·2.2), −.4, N−.6)`, with velocity tracked.
  - On release: `target = round(pos + v·.18)`.
  - Without movement, it is a click on the remembered cover.
- **Keys:** ← → move the target by one; Enter flips.

## 7. Website layer

- **`#letter`:** fixed, centred, top `9vh + 31vh + W/2 + W·.2`, a `W·.17` square with radius `W·.025`.
  - Background `linear-gradient(#fff, #e9e9ec)`, black 600 letter at `W·.12`.
  - Shadow: inset highlight and `0 6px 18px rgba(0,0,0,.45)`.
  - Shows the centre artist's first letter; hidden while flipped.
- **`#np`:** fixed, centred, top `9vh + 31vh + W/2 + W·.43`, width `min(440px, 70vw)`.
  - Title at 19px 600, artist at 14px mute.
  - A bar row with elapsed time, a 3px track (`rgba(255,255,255,.18)`) with a white fill and an 11px white knob, then the total time.
  - Shows the centre album until a track is played. Then it shows the track title, "Artist — Album", and real-time progress that loops.
- **`#az`:** fixed, centred, bottom 7.5vh, a 14-column grid with an 8px gap: `#` then A–Z as 26px rounded squares (radius 6, 12px).
  - Letters with an album are brighter; letters without are disabled at 35%.
  - The current letter gets a white border and a faint fill.
  - Clicking one flips back and jumps to the first album with that initial.
- **h1** "Every record.<br>One flick.": fixed at left 3.2vw, bottom 6.5vh, `clamp(34px, 4.6vw, 70px)`, weight 600, line-height 1.02, letter-spacing −.025em.
- **`#hint`:** bottom right, 12px mute, two lines: "Scroll, drag or ← → to browse" and "Click the album to flip it".
- **Glow colour:**
  1. On load, draw each sheet cell into an 8×8 canvas (the image has `crossOrigin='anonymous'`) and average its pixels.
  2. Brighten the average so its largest channel is about 190 (gain capped at 2.2).
  3. Set `--glow` to the centre album's colour; it changes as the centre changes (1 s transition).
- **At 820px or narrower:** the nav keeps only Sign in, the h1 moves under the nav at 30px, the hint hides, and A–Z uses 9 columns.