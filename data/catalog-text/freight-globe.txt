# Prompt: KV freight landing page (rotating globe hero, horizon glow, pinned stats, services scroll scene)

Build a single-file landing page for a fictional freight group called **KV**, in plain HTML, CSS and vanilla JavaScript, with no framework and no build step. The page is white and calm, with ink-black type and one accent colour, cobalt. It has three sections, in this order:

1. **Globe hero.** A real 3D dotted globe turns slowly on the right, drawn live on a canvas, with three port pins and raised route arcs. On the left is a vertical mono nav, a cobalt overline, a huge three-line condensed headline, a paragraph and two pill buttons. The headline arrives with a glitchy double-exposure reveal.
2. **Horizon glow transition, then stats.** On scroll, the hero holds still while a curved cobalt "planet edge" glow rises over it from the bottom. The glow decelerates, stops near the top and fades as the white stats section scrolls up beneath it. In the stats section, a port photo and a four-line headline stay pinned on the left while a right-hand column of intro copy and five counting stats scrolls past.
3. **Services scroll scene.** One scrubbed video: a teal reach-stacker loads a navy container onto a black truck, the camera pulls back onto a black band, giant "OUR SERVICES" letters slide behind the truck, and a dark strip of five service cards slides in from the right.

Everything after the load sequence is driven by scroll. Nothing autoplays except the globe's slow spin.

---

## 1. Media (use these exact URLs)

| What | URL | How it is used |
|---|---|---|
| Services clip, 1080p | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4 | Scrubbed `<video>`, used when the viewport is wider than 900px |
| Services clip, 720p | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4 | The same clip at 900px wide and below |
| Services clip poster (first frame) | https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg | `poster` attribute of the video |
| Port aerial photo (stats section) | https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261116_131941_31d10ef7-4bff-4a6b-94a7-27e15c950f26.png&w=1200&q=85 | CSS background, `50% 50% / cover`, inside the stats photo box |
| World land polygons (to build the globe dots) | https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-50m.json | Used once, offline, to precompute the dot list that is embedded in the page (see section 5) |

**About the services clip.** It is a continuous 4.04 s shot at 24 fps (97 frames), muted, with a keyframe every 4th frame so seeking is fast.
- **Background:** pure white, with a flat near-black ground band (#111). The band's top edge sits at 82.9% of the frame height until about 3.1 s.
- **Action:** the teal reach-stacker lifts a navy container, turns toward camera and lowers it onto the arriving black truck. The spreader releases and leaves top-left.
- **Pull-back:** the camera pulls back, so by 3.75 s the band's top edge is at 44.8% of the frame height, with the truck's wheels on it. The rig spans about 16–66% of the frame width. The last ~0.3 s holds.
- **Rules:** the vehicles are never drawn or moved in code. The clip is never played, only scrubbed, and it never gets an opacity transition.

**About the port photo.** It is a straight top-down drone view of a container port: a ship moored on the left in deep teal water (#1d3b44), loaded with red, blue and grey containers. Two pale-blue gantry cranes reach over it, and rows of stacked red (#c8402f), blue (#2a4f8f) and steel-grey (#9aa3a8) containers fill the right. It has no text or logos. The box behind it is #1d3b44, so it never flashes white while loading.

---

## 2. Fonts

Self-host the latin WOFF2 files, or load the same families from Google Fonts. The latin files are:

| Family | Weights | Latin WOFF2 | Used for |
|---|---|---|---|
| Anton | 400 | https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm3Kz-C8.woff2 | Every big condensed caps line: hero headline, stats headline, stat numbers, services headline, card titles, giant letters |
| Archivo (variable) | 400–800 | https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxI.woff2 | Body copy, overline (700), links, captions, "Our services" pill (500) |
| JetBrains Mono (variable) | 400–500 | https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2 | Hero nav, hero buttons, globe city labels (500), KM/H readout |

Declare each with `font-display: swap`, give Archivo the weight range `400 800` and JetBrains Mono `400 500`, and preload Anton and Archivo. Fallbacks: Anton → Impact, sans-serif; Archivo → system-ui, sans-serif; JetBrains Mono → ui-monospace, monospace.

---

## 3. Head, colours and units

- **Head:** `<title>KV Freight</title>` and a meta description: "KV runs air, ocean, road and customs brokerage as one network under one accountable team." Use the viewport meta `width=device-width, initial-scale=1, viewport-fit=cover`.
- **Entrance guard:** a tiny inline script in the head adds the class `js-anim` to `<html>`. Under that class, every element marked `.ent` starts at opacity 0. An `.anim-done` class (added by a 4 s failsafe) forces them all to opacity 1.

| Token | Value | Use |
|---|---|---|
| ink | #111111 | Headlines, nav, body links, globe dots, services ground band |
| white | #ffffff | Page background |
| cobalt | #2f63ff | Overline, filled button, outline buttons, stat numbers, pins, arcs, glow peak, third services line |
| cobalt hover | #1f4fe0 | Filled button hover |
| muted | #5d6270 | Hero paragraph |
| muted 2 | #6b6f78 | Stats intro copy and stat captions |
| wash | #eef2ff | Pale blue used in the globe haze and the glow |
| periwinkle | #a9bcff | Mid tone of the glow |
| giant | #e9e9e9 | "OUR SERVICES" giant letters |
| hairline | #d9dbe0 | Dividers between stats |

The page has no horizontal scroll (`overflow-x: clip` on body). All boxes use `box-sizing: border-box`, with margins and padding reset to 0.

**Units.** JavaScript writes four pixel units to `<html>` on load and on every resize. Every measurement below is written as "N units", meaning N × that unit. The viewport size is read from `document.documentElement.clientWidth` / `clientHeight`, not `innerWidth`, because a mobile browser that has zoomed out reports a wrong `innerWidth`.
- **`--uc` (hero copy):** min(vw/1440, vh/900). On short landscape screens (height below 520) it becomes min(vw/1440, max(vh/900, 0.6)).
- **`--uv` (globe frame):** max(vw/1440, heroHeight/900). It is a cover scale, anchored to the right edge.
- **`--us` (stats section):** vw/1440.
- **`--u` (services scene):** min(vw/1440, vh/960) on desktop; min(vw/430, 1.4) on phones; vh/430 on short landscape phones.

**Layout modes.** JavaScript sets these classes on `<html>`:
- `m-port`: portrait, meaning width ≤ height.
- `m-land`: landscape and height below 500.
- `m-hp`: services phone framing, when `m-port` or `m-land` applies or the width is below 768.
- `sticky`: desktop and not short. The hero holds still during the glow.

---

## 4. Section 1: Globe hero (desktop)

**Structure.**
- `div.hwrap` (relative) wraps `section.hero#top` (white, z-index 1, 100vh/100svh tall, overflow hidden).
- In `sticky` mode the wrapper is 165vh tall and the hero is `position: fixed; top:0; left:0; right:0`. The hero stays put for the whole glow transition, and the extra 65vh reserves the scroll.
- Inside the hero, `div.gwrap` (absolute, inset 0) holds `<canvas id="globe">`, which fills it. `div.hf` holds all the copy and nav.

**`div.hf`** is a 1440 × 900 frame in `--uc` units, absolutely positioned at left 0, and centred vertically: top = max(0, (vh − 900·uc)/2).

| Element | Position (units of `--uc`, inside `.hf`) | Style and content |
|---|---|---|
| Logo, an `<a href="#top">` with an inline SVG | left 40, top 36, width 71 | A "KV" wordmark in #111. The SVG viewBox is 0 0 71 31 and holds two filled paths: the K is a vertical stem 9.4 wide with a diagonal arm and leg meeting at about x 12–20, and the V is two diagonals meeting at the bottom (x 32.4–67.4). It is heavy, geometric and tight. |
| Vertical nav `ul.vnav`, two items | left 218, top 77 | Links "ABOUT" (→ #about) and "SERVICES" (→ #services). JetBrains Mono 400, size max(13 units, 11px), line-height 1, letter-spacing .09em, uppercase, 6.1 units of padding above and below each link. Hover turns cobalt. Only the built sections are listed; there are no pills, buttons or extra links. |
| Copy block `div.copy` | left 218, top 294, width 560 | Holds the four items below, in normal flow. |
| Overline "ONE NETWORK" | top of `.copy` | Archivo 700, size max(19.2 units, 12px), line-height 1, uppercase, letter-spacing −.005em, cobalt. |
| Headline `h1.hl` | 7 units below the overline | Three lines, each a `span.ln` set to `display: block` and `nowrap`: "EVERY LEG", "OF THE", "ROUTE". Anton 400, uppercase, 114.3 units, line-height .953, letter-spacing −.004em, #111. Cap height is about 100 units and the line pitch about 109 units, with the first cap top at y ≈ 322. |
| Paragraph `p.lede` | 21 units below the headline | "Air, ocean, road and customs brokerage, run as one network under one accountable team." Archivo 400, size max(18.2 units, 13px), line-height 1.45, colour #5d6270, max-width max(418 units, 250px), so it wraps into two lines after "one". |
| Buttons `div.btns` | 19 units below the paragraph; flex row with a gap of 15 units, wrapping | Two pills, each height max(40 units, 34px), side padding max(25 units, 16px), radius 999px, a 1.3px cobalt border, and JetBrains Mono 400 at max(12 units, 11px), letter-spacing .09em, uppercase. "GET A QUOTE" (→ #about) is filled cobalt with white text, hover #1f4fe0. "OUR SERVICES" (→ #services) is transparent with cobalt text, and on hover fills cobalt with white text. Colour transitions take .25s. |

**The globe** is drawn on the canvas every animation frame while the hero is on screen (see section 5).

---

## 5. The globe (canvas, real 3D rotation)

**Dot data, built offline once and embedded.**
- Take the world-atlas `land-50m.json` TopoJSON. Decode its delta-encoded arcs with its `transform` (scale and translate), and rebuild every land polygon with its holes.
- Sample an even grid on the sphere, with rows from latitude −58° to +80° every 1.7°.
- In each row, use round(360 · cos(lat) / 1.7) points spread evenly in longitude. Offset every other row by half a step, so the grid is staggered.
- Keep a point only if it lies inside a land polygon and not inside a hole (even-odd ray test with a bounding-box precheck). That gives about 3,760 dots.
- Store them as a flat JSON array of integers, lon × 10, lat × 10, in a `<script type="application/json" id="landdots">` tag (about 32 KB).
- At startup, convert each dot to a unit vector: x = cos(lat)·sin(lon), y = sin(lat), z = cos(lat)·cos(lon).

**Geometry.**
- **Frame:** the globe lives in the same 1440 × 900 frame as the mockup, scaled by `--uv` and anchored to the right edge of the hero. The frame's origin is at x = vw − 1440·uv, y = min(0, (heroHeight − 900·uv)/2).
- **Sphere:** centre at frame (1166, 530), radius 400 frame units. The left edge falls at x ≈ 766 and the top at y ≈ 130, and it bleeds off the right and bottom edges.
- **Size:** the canvas fills the hero and is drawn at devicePixelRatio, capped at 2.

**View and rotation.**
- Orthographic projection with a fixed tilt of 9° (the north pole leans toward the viewer).
- The starting view longitude is −10°. The globe spins steadily at 2.4° per second, about one turn every 150 s: view longitude = −10° − t·2.4°.
- Real Earth direction: the land moves left to right across the face.
- For each point, rotate about the vertical axis by the view longitude, then about the horizontal axis by the tilt. A point is visible when its depth z is above 0.02. Its screen position is (cx + R·x, cy − R·y).

**Draw order on every frame.** Clear the canvas, then draw at a global alpha equal to the intro fade (below).
1. **Haze and rim glow.** Fill the whole canvas with a radial gradient centred at (cx − .05R, cy + .08R), running from radius .9R to 1.5R. Its stops are rgba(47,99,255,.55) at 0, rgba(90,128,255,.32) at .12, rgba(169,188,255,.16) at .4 and rgba(238,242,255,0) at 1. The result is a soft cobalt-to-periwinkle glow hugging the sphere, strongest at the bottom-left.
2. **Sphere body.** Fill the circle with a radial gradient from a light source at the upper right: inner circle at (cx + .3R, cy − .42R) with radius .05R, outer circle at (cx + .1R, cy − .15R) with radius 1.25R. Stops: #ffffff at 0, #f6f8ff at .55, #e8eeff at .85, #d5dfff at 1.
3. **Inner shading, clipped to the circle.** Draw a radial gradient centred on the sphere, from radius .8R to R: transparent cobalt at 0, rgba(47,99,255,.10) at .75 and rgba(47,99,255,.42) at 1, which gives an inner limb glow. Then draw a linear gradient from (cx − .8R, cy + .8R) to (cx + .2R, cy − .2R), going from rgba(47,99,255,.30) to transparent, which strengthens the bottom-left.
4. **Land dots, still clipped.**
   - Each visible dot has radius max(.9px, 1.75·uv) × (.5 + .5·√z), so it shrinks toward the limb.
   - Put dots into five depth buckets, bucket = min(4, floor(z·5.5)), and draw each bucket as one #111 path at alpha .22 + bucket·.19.
   - The result: dots near the edge are smaller and fainter, and they crowd together naturally because of the projection.
5. **Rim.**
   - Line width max(1, 1.4·uv).
   - A full circle stroke in rgba(47,99,255,.38).
   - A white highlight arc, rgba(255,255,255,.9), at radius R − .8 from angle −2.4 to −0.3 rad (the upper-left to upper-right rim).
6. **Route arcs.**
   - Three great-circle arcs: Rotterdam → Santos, Rotterdam → Lagos and Lagos → Santos.
   - Each arc is 57 points from a spherical linear interpolation between the two cities, lifted off the surface by the factor 1 + (0.07 + 0.42·ω/π)·sin(π·t), where ω is the angle between the cities. Long arcs rise higher.
   - Stroke them cobalt at alpha .8, width max(1, 1.15·uv).
   - Draw a segment only where the point faces the viewer (z > 0) or rises outside the disc (x² + y² > 1), so the arcs hide when they turn behind the globe.
7. **City pins and labels.**
   - Rotterdam (51.92° N, 4.48° E), Lagos (6.45° N, 3.39° E) and Santos (23.96° S, 46.33° W).
   - Pin: a cobalt dot of radius max(3, 4.6·uv) with a 1.5px white ring.
   - Label: centred above the pin, its baseline at (pin radius + .55·label size) above the centre. JetBrains Mono 500, uppercase, label size 12.5·uv on desktop and max(9.5, 12.5·uv) on phones, letter-spacing .05em, #111.
   - Alpha: clamp(z·5) × the pin's entrance progress, so pins fade as they rotate toward the limb and disappear behind it.

**Globe timing after load** (t = seconds since load):

| Part | Behaviour |
|---|---|
| Whole globe | Fades in: alpha = 1 − (1 − clamp(t/1.1))³ |
| Pins | Pin i fades in over 0.6 s, starting at t = 0.8 + i·0.16 |
| Arcs | Arc i draws itself along its length over 1.1 s, starting at t = 1.0 + i·0.18 |
| Rotation | Continuous from t = 0 |

When the hero is scrolled, the canvas opacity becomes .45 + .55·clamp(e/0.7), where e is the glow edge from section 6. The globe dims slightly but stays visible until the glow covers it. The globe is not drawn once e < −0.1.

---

## 6. Horizon glow transition (between the hero and the stats)

This copies the reference's "planet edge" transition, measured frame by frame and recoloured in the KV daylight palette.

**Element.** A `div.hz`: `position: fixed; inset: 0; z-index: 2; pointer-events: none; display: none`. It sits above the hero (z 1) and below the stats section (z 3). The stats section has a transparent background, so its text draws over the glow.

**Edge position.** Define e as the glow's inner edge, in screen heights from the top (1 = bottom of the screen): e = (wrapperHeight − scrollY)/vh − 0.47.
- On desktop the wrapper is 165vh, so e = 1.18 − scrollY/vh. The glow starts just below the screen and rises 1:1 with scroll.
- On phones and short landscape screens, the wrapper is max(165vh, heroHeight + 12vh) and the hero scrolls normally.
- The stats section therefore always begins exactly where the glow turns fully white (e + 0.47).

**Deceleration and fade.**
- While e > 0.12 the drawn edge equals e. Below that, the drawn edge is −0.03 + 0.15·exp((e − 0.12)/0.15), so it slows smoothly and stops with the blue peak about 14% below the top of the screen.
- The glow's opacity is 1 − easeInOutQuad(clamp((−0.12 − e)/0.4)), so it fades out over 0.4 screens of further scroll while the stats keep scrolling up.
- It is hidden when its opacity is below .002 or e > 1.04.
- In `sticky` mode, the hero's visibility is set to hidden once e < −0.06, by which point it is fully covered.

**Shape.**
- A radial ellipse with horizontal radius Rx = max(0.75·vw, 0.9·vh) and vertical radius Ry = 0.72·vh. It is centred horizontally, with its centre at y = edge·vh − Ry, above the top of the screen, so the bottom of the ellipse is the edge.
- The edge is a gentle arch: in the middle it sits about 6% of the screen height lower than at ±30% of the width.
- Set it as `radial-gradient(Rx px Ry px at 50% centreY px, …)`. The stops are written in px as multiples of Rx, because a radial gradient's stops run along the horizontal radius.

| Stop (× Rx) | Colour |
|---|---|
| 0 | rgba(255,255,255,0), clear inside the ellipse, so the hero shows |
| 0.985 | rgba(238,242,255,0) |
| 1.00 | rgba(214,224,255,.6), the edge |
| 1.06 | #9fb2ff |
| 1.14 | #5a80ff |
| 1.236 | #2f63ff, the cobalt peak, about 17% of the screen below the edge |
| 1.32 | #5a80ff |
| 1.42 | #a9bcff |
| 1.53 | #dfe6ff |
| 1.65 | #ffffff, fully white from here outward, about 47% of the screen below the edge, which covers the rest of the hero |

**What happens to the hero while the glow rises.** Let k = clamp((0.95 − e)/0.42).
- **Copy block:** opacity 1 − k, translateY −5·k vh.
- **Headline glitch-out**, applied per line after the entrance has finished:
  - A stepped jitter j = (((floor(k·16)·9301 + 49297) mod 233280)/233280 − .5) while 0 < k < 1. Each line gets an offset o = j·0.09em, with the sign flipped on alternate lines.
  - Each line gets translateX(o).
  - Its text-shadow is (−1.6·o)em 0 0 rgba(47,99,255, .7k + .15) plus (.8·o)em 0 0 rgba(17,17,17,.25).
  - Its clip-path is inset(0 (k²·100)% 0 0), so the lines are wiped away to the left.
  - The headline is fully gone by the time the edge reaches about the middle of the screen.
- **Logo and nav:** opacity 1 − clamp((0.85 − e)/0.4).

---

## 7. Section 2: Stats (`section.stats#about`, desktop)

**Layout model.**
- The section has position relative, z-index 3 and a transparent background. It contains two blocks.
- **`div.pin`** is `position: sticky; top: min(0px, 100vh − 900 units); height: 900 units; z-index: 1`. It holds the photo and the big headline, which therefore stay pinned while you scroll through the section.
- **`div.col`** is relative, with `margin-top: −900 units`, so it overlaps the pinned block. Its height is (371 + 5·166 + 140) units. It holds the intro and the stats column, which scroll normally.
- When `.col` ends, the whole section scrolls away into the services scene.

All positions below are in `--us` units (vw/1440), measured from the section top.

| Element | Position | Style and content |
|---|---|---|
| Photo box `div.ph` (pinned) | left 64, top 93, 440 × 236 | Overflow hidden, background #1d3b44. An inner `<i>` covers it with the port photo (cover, centred). |
| Headline `h2.big` (pinned) | left 64, top 383 | Four lines as `span.ln` (block, nowrap): "WE MOVE", "FREIGHT.", "WE OWN", "THE OUTCOME.". Anton, uppercase, 105 units, line-height 1, letter-spacing .02em, #111. |
| Intro `div.intro` (scrolls) | left 594, top 117, width 440 | Archivo 400, size max(17.9 units, 12.5px), line-height 1.36, #6b6f78. Paragraph 1: "With every service under one roof, your supply chain moves the way your business demands." Paragraph 2 (24 units below): "From ocean to air, road to rail, we bring together global reach, local expertise and technology-driven solutions to keep your cargo moving." Then, 22 units below, a row of two links with a gap of 26 units: "Our services" (→ #services) and "Our network" (→ #top). The links are #111, underlined 1px with an offset of .28em, and turn cobalt on hover. |
| Stats list `ul.nums` (scrolls) | left 993, top 371, width 384 | Five `li`, each 166 units tall. Every `li` after the first has a 1px #d9dbe0 hairline 16 units above it, scaled from its left edge with the custom property `--hl`. |
| Stat number `.n` | in each `li` | Anton, 82 units, line-height 1, cobalt, tabular numerals, nowrap. |
| Stat caption `.c` | 6 units under the number | Archivo, size max(17 units, 11.5px), #6b6f78. |

**The five stats** (fictional figures for the fictional KV brand):

| Number | Caption | Count-up format |
|---|---|---|
| 2 500+ | Shipments per month | Counts 0 → 2500, thin space as the thousands separator, then "+" |
| 98.2% | On-time delivery rate | Counts 0.0 → 98.2 with one decimal, then "%" |
| 8+ | Years in operation | Counts 0 → 8, then "+" |
| 60+ | Countries on our network | Counts 0 → 60, then "+" |
| 24/7 | Live shipment tracking | No count; it glitches in as text |

**Stats reveals.** Use IntersectionObservers with threshold 0 and rootMargin "0px 0px −15% 0px", so each reveal fires when its target passes 85% of the screen height, once only.
- **Photo and intro**, when the photo is reached:
  - The photo box wipes up over 1.1 s, clip-path inset(100% 0 0 0) → inset(0), cubic-bezier(.7,0,.2,1).
  - The image inside settles from scale 1.12 to 1 over 1.6 s, cubic-bezier(.2,.7,.2,1).
  - The intro fades up 14px over 0.9 s, after a 250 ms delay.
- **Headline**, when it is reached: each of the four lines plays the glitch reveal (section 9), 130 ms apart.
- **Each stat, one at a time as it scrolls in:**
  - The `li` fades up 12px over 0.7 s.
  - The number plays the glitch reveal after a 60 ms delay.
  - The hairline draws from scaleX 0 to 1 over 0.9 s, cubic-bezier(.7,0,.2,1), after a 60 ms delay. Register `--hl` with `CSS.registerProperty` as a `<number>` with initial value 1, so it animates.
  - The count runs over 1.6 s with ease-out-cubic, 1 − (1 − k)³. Before it starts, the number shows its zero form ("0+", "0.0%").

---

## 8. Section 3: Services scroll scene (`section.track#services`)

This is the existing KV services hero, unchanged, attached after the stats.

**Structure.**
- The `.track` (white, relative, z-index 4) gets its height from JavaScript: (1 + A + B) × vh. A = 2.4 screens for the clip; B = (strip width + 0.45·vw)/vw × 1.1 screens for the services strip.
- Inside it, `.scene` is sticky at top 0, 100vh (100lvh) tall, overflow hidden. Its background is white above and #111 below a line placed at 90% of the clip's height, which only shows where the clip does not cover the screen.
- The section has no nav of its own; the hero nav covers the page.

**Layers, bottom to top:**
1. **The `<video>`** (muted, playsinline, preload auto, the poster above), absolutely sized by JavaScript.
   - Desktop: cover, with scale s = max(vw/1920, vh/1080), centred.
   - Phones and short landscape (`m-hp`): width 155vw, positioned so that 40% of the frame sits at mid-screen horizontally, and so that the final band edge lands at 36% of the screen height vertically.
   - The 720p source is used at 900px wide and below.
2. **Giant letters "OUR SERVICES".**
   - Anton, 330 units of `--u`, line-height .8, colour #e9e9e9, nowrap, uppercase, `mix-blend-mode: darken`. They only show where the clip is white; the truck and its silver container (about #e5) always win, so the letters read as being behind the truck.
   - Their bottom sits on the final band edge: JavaScript writes `--edge-px` = clip top + 0.448 × clip height, and the letters' top = `--edge-px` − 264 units.
3. **Speed readout**, "NN KM/H".
   - At (26, 52) units, JetBrains Mono 400 at 10.5 units, letter-spacing .06em, #111.
   - It shows the smoothed scroll speed: |Δy|/Δt in px per second, divided by 32, eased with speed += (instant − speed)·0.1, capped at 99, always two digits.
   - It fades in over .5 s once the truck has settled.
4. **Band**, from `--edge-px` to the bottom, white text. It holds:
   - **The strip:** a flex row at top 76 units with a gap of 120 units.
     - **Lead block** (gap 64 units): the headline "EVERYTHING YOUR / FREIGHT NEEDS. / UNDER ONE GROUP." in Anton at 64 units, line-height .98, nowrap, with the third line cobalt.
     - **Beside it:** a 250-unit column of two Archivo paragraphs at 12 units, line-height 1.5, white at 62% opacity, 1em apart: "From air to sea, from customs clearance to the last mile, we bring decades of practice to every freight discipline." and "One integrated network means one partner, one point of contact and full visibility from origin to destination."
     - **Then five cards,** each 270 units wide with 30 units of side padding and a 1px left divider in white at 12% opacity (none on the first).
     - **Each card:** a 38-unit white line icon (stroke 1.4, round caps and joins), a two-line Anton title at 26 units (line-height 1.05, 22 units below the icon), and Archivo body text at 12.4 units (line-height 1.5, 14 units below the title).
   - **The "Our services" outline pill:** centred, 36 units from the bottom.
     - 1px border in white at 70%, radius 999px, padding 11 × 22 units.
     - Archivo 500 at 10 units, letter-spacing .1em, uppercase.
     - Once the truck settles, it fades in and rises 24px into place over .6s (cubic-bezier(.2,.7,.2,1)).

| Card title | Icon | Body |
|---|---|---|
| AIR / FREIGHT | Plane | Express, priority and deferred options across global lanes, booked and tracked end to end. |
| OCEAN / FREIGHT | Ship on waves | FCL and LCL sailings on every major trade lane, with carrier choice based on cost and transit time. |
| CUSTOMS / BROKERAGE | Document with a check mark | Licensed in-house brokers for classification, duties and inspections, so goods clear first time. |
| WAREHOUSING / AND 3PL | Warehouse | Bonded and general storage, pick and pack, and distribution that plugs straight into transport. |
| PROJECT / CARGO | Crane hook over a load | Oversized and heavy-lift moves, engineered, permitted and escorted from factory to foundation. |

**Card text reveal.**
- Each card's title and body use a `background-clip: text` gradient: white up to (s − 34%), cobalt at (s − 6%), transparent at (s + 26%).
- s = clamp((0.98 − cardLeft/vw)/0.3, −0.4, 1.6) × 100%.
- As each card travels in from the right, its text sweeps in from blue to white.

**Scroll mapping** (one requestAnimationFrame loop for the whole page):
- **Clip time:**
  - q = clamp((scrollY − trackTop)/(A·vh)), and the target time is q × (duration − 1/48).
  - Each frame, ease toward it: cur += (target − cur)·0.2.
  - Seek only when the video isn't already seeking and the difference is more than 1/60 s; re-seek on `seeked`.
- **Settled flag:** when q ≥ 0.94, set `--ph` = 1. This shows the readout and the pill.
- **Strip:** r = clamp((scrollY − trackTop − A·vh)/(B·vh)). The strip's translateX = vw − r·(stripWidth + 0.45·vw), and the giant letters' translateX = vw − r·(lettersWidth + vw).
- **Scrubbing:** scrolling back reverses everything.

---

## 9. Load sequence and the glitch reveal

**The glitch (double-exposure) reveal.** A Web Animation of 900 ms with easing `steps(14, end)` and `fill: backwards`, which gives a hard, stepped flicker. It has five keyframes:

| Offset | Opacity | Clip-path | Transform | Text-shadow (cobalt ghost, ink ghost) |
|---|---|---|---|---|
| 0 | 0 | inset(0 100% 0 0) | translateX(−.05em) | −.12em rgba(47,99,255,.8), .07em rgba(17,17,17,.25) |
| .30 | 1 | inset(0 38% 0 0) | translateX(.035em) | .09em rgba(47,99,255,.65), −.05em rgba(17,17,17,.3) |
| .55 | .8 | inset(0) | translateX(−.018em) | −.045em rgba(47,99,255,.55), .025em rgba(17,17,17,.2) |
| .78 | 1 | inset(0) | translateX(.008em) | .015em rgba(47,99,255,.35), none |
| 1 | 1 | inset(0) | none | none |

When it finishes, remove the element's `.ent` class so it stays visible.

**The fade-up** is a Web Animation from opacity 0 and translateY(N px) to opacity 1 and none, with cubic-bezier(.2,.7,.2,1) and `fill: backwards`. It removes `.ent` when it finishes.

**Hero load timeline** (ms from load):

| Delay | Duration | Element | Animation |
|---|---|---|---|
| 0 | 1100 | Globe canvas | Fade in (inside the canvas drawing) |
| 0 / 70 / 140 | 700 | Logo, then the two nav links | Fade up 8px |
| 150 | 700 | Overline | Fade up 10px |
| 260 / 390 / 520 | 900 | Headline lines 1, 2 and 3 | Glitch reveal |
| 800 / 960 / 1120 | 600 | Pins: Rotterdam, Lagos, Santos | Fade in |
| 900 | 800 | Paragraph | Fade up 14px |
| 1000 / 1180 / 1360 | 1100 | Route arcs | Draw along their length |
| 1040 | 800 | Buttons | Fade up 14px |
| 4000 | — | Failsafe | Add `.anim-done`, which forces every `.ent` element visible |

The headline's scroll glitch-out (section 6) only takes over after the last line's reveal has finished.

---

## 10. Phones, short landscape and tablets

**Portrait screens (`m-port`, which includes portrait tablets).**
- **Hero:** height auto, at least 100svh, a flex column.
  - The copy frame is in normal flow with 22px padding (no bottom padding).
  - Logo at the top-left, 58px wide. The nav sits at the top-right (right 22px, top 20px, right-aligned, mono 12px, 4px of padding per link).
  - The copy starts clamp(44px, 9vh, 96px) below.
  - Overline 14px. Headline size min(23vw, 150px), 12px below the overline. Paragraph 15px, max-width 420px, 20px below. Buttons 40px tall, 20px side padding, 11px text, 10px gap.
- **Globe on phones:**
  - It sits under the copy, in a box 98vw tall, overflow hidden, whose bottom 28% fades out with a mask (linear-gradient black 72% → transparent).
  - The globe's diameter is 1.25 × the screen width. It is anchored to the right edge (frame scale up = 1.25·vw/800, origin x = vw − 1440·up, y = 16 − 130·up), so its centre sits at about 57% of the width and it bleeds off the right.
  - Labels are max(9.5px, 12.5·up) and pins at least 3px.
- **Glow:** the same as on desktop, but the hero scrolls normally (it is not fixed).
- **Stats** (also in short landscape):
  - One stacked column with padding 56px 22px 72px. The pin and column wrappers become `display: contents`, and the order is photo, intro, headline, stats. Nothing is pinned.
  - The photo is full width (max 620px) with aspect ratio 440/236. The intro is 15px, max-width 520px, 28px below the photo.
  - The headline is min(15.5vw, 120px), 48px below. The stats start 44px below, with 18px vertical padding per stat, the hairline at the top of each, numbers at min(19vw, 100px) and captions at 14px.
- **Services (`m-hp`):**
  - The strip sits at top 44 units with a gap of 56 units and 22px left padding.
  - The lead block stacks the headline (46 units) over the paragraphs (300 units wide, 13 units).
  - Cards are 250 units wide with 13-unit body text. The readout is 11px at (20px, 22px).

**Short landscape phones (`m-land`, height below 500).**
- **Hero:** the desktop layout with the copy unit floored at 0.6, minimum font sizes as listed above, and the hero grown to fit the copy: max(vh, 900·uc, copy bottom + 28px). It is not fixed.
- **Services:** the phone framing with u = vh/430.
  - The strip is at top 14 units with a gap of 48 units. The lead block is side by side (gap 28 units), with the headline at 34 units and the paragraphs 230 units wide at max(12 units, 10px).
  - Cards are 240 units wide, with 30-unit icons, 22-unit titles (12 units below the icon) and body text at max(12 units, 10px). The pill sits 12 units from the bottom.

**Everywhere:** no element is hidden, cut off, overlapping or scrolling sideways at 320×568, 375×812, 568×320, 812×375, 768×1024 or 1440×900.

---

## 11. Reduced motion and recorder mode

**`prefers-reduced-motion: reduce`.**
- Every `.ent` element is visible immediately, and no entrance animations run.
- The globe is drawn without rotation, with pins and arcs fully shown.
- The stats skip their reveals and count-ups and show their final numbers.
- The readout and pill transitions are off.
- The scroll-driven clip, strip and glow still follow the scroll, because they are direct scroll mappings rather than decoration.

**Recorder mode (`?rec=1`).** The rAF loop runs once, and `window.__recTime(video, t)` drives the services section deterministically along an 11 s path:
- Hold until 0.44 s, then ease with cubic-bezier(.4,.05,.55,.95) until 10.56 s, then hold.
- It scrolls to that point, sets the readout from the scripted speed (|Δy|·60/32, capped at 99), updates the hero, glow and globe, and returns the clip time to seek to.

---

## 12. Acceptance check (1440 × 900)

- **On load:**
  - The dotted globe fades in on the right and turns slowly, land moving left to right, with the dots crowding toward its edge.
  - "EVERY LEG / OF THE / ROUTE" glitches in line by line under the cobalt overline.
  - The paragraph and pills fade up, and the Rotterdam, Lagos and Santos pins pop in as the cobalt arcs draw between them.
- **First scroll:**
  - The hero holds still while a curved cobalt glow rises from the bottom.
  - The headline is wiped off with a stepped cobalt ghost glitch, the nav fades and the globe dims.
  - The glow slows and stops near the top, then fades as the white stats section scrolls up under it.
- **Stats:**
  - The port photo wipes up, and "WE MOVE / FREIGHT. / WE OWN / THE OUTCOME." glitches in. Both stay pinned on the left.
  - The intro and the five stats scroll past on the right; each number glitches in, counts up, and its hairline draws.
  - After "24/7" the section scrolls away.
- **Services:**
  - Scrolling scrubs the clip: the stacker loads the truck and the camera pulls back onto the black band.
  - "OUR SERVICES" slides past behind the truck, never showing through the container or cab.
  - The headline enters from the right, followed by the five cards sweeping from blue to white.
  - The KM/H number follows your scroll speed.
- **Scrolling back** reverses everything.
- **Content:** no real brands, logos or people anywhere. The nav lists only About and Services.