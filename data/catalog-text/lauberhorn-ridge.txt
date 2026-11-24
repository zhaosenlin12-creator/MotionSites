# Prompt: Lauberhorn Ridge trail dashboard hero

Build a single-file, one-screen **hiking trail guide dashboard hero** for a fictional alpine trail, **Lauberhorn Ridge** (above Interlaken, Switzerland), seen by a signed-in hiker, **Mira Holt**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a bright autumn travel app: a full-bleed photo of a golden larch valley with a turquoise lake under snowy peaks, and soft cream glass widgets floating over it.

## Scene

- **Plate:** the whole background is ONE 16:10 photo (1728×1080), stretched to the frame: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4e84f7cd-8250-48e6-8dfa-746b13b73bfb.jpg`.
  - Golden larch forest on both slopes, a turquoise glacial lake winding into the valley, snow-capped peaks and a clear blue sky at the top.
- **Motion:** a muted looping drone shot of the same valley plays over it: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48d4c209-86b6-4b1c-b972-4f57e3dafe89.mp4` (1280×720, 10s, loops seamlessly because it plays forward then reversed). The camera glides forward over the larches toward the lake, with a slow push-in and slight parallax.
  - The video was rendered 16:9 from the plate mirror-padded 96/1728 on each side. Lay it at **111.11% width, left −5.556%** so its middle sits exactly on the plate.
  - Fade it in (0.8s) once its first frame is ready.
- **Rule:** nothing in the scene is drawn or animated in code. Only the UI animates.

## Frame and scaling

- **Frame:** one **1440×900 frame** that covers the viewport: `--u = max(100vw/1440, 100vh/900)`, centred. Every element below is placed in frame units.

## Type and colour

- **Sans:** **Inter Tight** 300/400. The trail title is Inter Tight 300.
- **Mono:** **JetBrains Mono** 500, uppercase, tracking .06em, for labels, chips, tabs and values. Card labels start with a tight "::" prefix.
- **Colours:**
  - card cream glass `rgba(244,240,233,.94)` with a 14px backdrop blur
  - inner panels `#EAE6DE`
  - ink `#2E2D2A`
  - amber `#F6B733` and light amber `#FBD06A`
  - orange pin `#F59E0B`, violet pin `#7C6CF2`
- **Shadows:** no drop shadows on cards or the photo. Only a faint text shadow on the white title and breadcrumb.

## Layout (1440×900 frame)

- **Logo tile:** 41×38 cream tile at (15, 14), radius 12, with a six-spoke asterisk glyph.
- **User pill:** at (62, 14), 38 tall, radius 12: "::", then "Mira Holt" (18px) and a small orange ring (status dot).
- **Breadcrumb:** white mono at 12.6px, not uppercase, at (15, 73): "Back to Explore  Switzerland / Interlaken / Jungfrau Region /".
- **Title:** "Lauberhorn Ridge", white, Inter Tight 300, 96px, tracking −.045em, at (20, 86).
- **Chips:** at (15, 198), 32 tall, peach `rgba(248,232,205,.92)`, radius 9, 14px mono:
  - "4.7 (198 REVIEWS)" with an orange star disc
  - "ALPINE LARCH FORESTS" with an orange mountain glyph
- **Search card:** 359×137 at (15, 462).
  - "Hey, Mira!" at 25px.
  - "Interlaken, Switzerland ˄" at 14.5px.
  - A 37-tall panel field: "SEARCH BY ANYTHING" with a magnifier at the right.
- **Points of interest card:** 358×215 at (15, 612).
  - Label "::POINTS OF INTEREST".
  - A topographic map fills it: 16 thin wavy contour lines `#c9c5bc`, and a dark winding route that climbs to a sharp peak near the right.
  - A violet pin with a white mountain glyph marks the start; an orange pin marks the summit.
- **Photo card:** 336×215 at (383, 612), radius 16, cover-filled with a hiker in an orange jacket and backpack looking over the larch valley and lake: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/8097efdf-745f-4a23-8b33-0bed6ee16bc7.jpg` (position 72% 50%).
  - Bottom-left: a 38px white play button, then a light amber chip "211 Photos" (sans 14px) with a photo icon.
- **Altitude card:** 387×215 at (728, 612).
  - Label "::ALTITUDE". Top right: "TOTAL GAIN" with two small legend dots, "● HIKE" (amber) and "● DESCENT" (grey).
  - A line chart with a baseline:
    - the hiked part is a thick dark line that rises steeply then levels out
    - the rest is a grey dotted line that slopes down, with amber dots at waypoints
    - small mono axis labels: "0 km", "1,25 km", "2,800 m"
  - A panel tab bar at the bottom: "SLOPES", "ALTITUDE" (active, light amber with a mountain glyph), "SEASONS" (snowflake) and "TYPES". Tabs switch on click.
- **Weather card:** 303×380 at (1126, 12). Label "::WEATHER".
  - **Gauge panel**, 242 tall:
    - a centred "ENTIRE TRAIL" pill
    - a thick semicircle arc with a gradient from `#E7E1D3` through `#F8C44C` to `#F6B12A`, white knobs at both ends, and a thin white progress arc inside it
    - a big "19°" (74px) in the middle
    - "-3°" left, "Sunny" centre, ". 20°" right
  - **Two tiles:** "WIND" (orange disc) "14 km/h" and "SUNSET" (light amber disc) "17:52", values in mono 18.5px.
- **Trail info card:** 303×425 at (1126, 402). Label "::TRAIL INFO". Three 118-tall stacked panels, each with an amber-tint icon square, a big value and a caption:
  - "6.5 km", DISTANCE
  - "2.5-3 hr", DURATION
  - "350 m", ELEVATION GAIN

## Motion (UI)

- **Entrance:** one Web Animations timeline, about 2.8s.
  - The logo and user pill drop in; the breadcrumb fades.
  - The title rises out of a 10px blur; the chips follow.
  - The weather and trail info cards slide in from the right, staggered.
  - The bottom cards rise up in turn (search, points of interest, photo, altitude).
  - The gauge's white progress arc draws; the map route and the hiked chart line draw on.
  - The temperature counts up from 0° to 19°.
- **Hover:** the play button grows to 1.08.
- **Reduced motion:** no entrance and no video.

## Phones (≤ 820px)

- **Hero:** the photo and video fill the top 62% of the screen.
- **Header:** the logo and user pill share the first row, then the breadcrumb, a 46–64px title and the chips wrapped over the photo.
- **Cards:** below, full width and stacked: search, points of interest, photo, altitude, weather and trail info.

## Acceptance check (1440×900)

- Every widget sits at the coordinates above over the golden larch valley.
- The drone glide visibly moves the camera and loops without a jump.
- **Content:** no real brands, logos or people.