# Prompt: Wander Far travel hero

Build a single-file, one-screen **travel-booking landing hero** for a fictional travel site: "Wander far. Rest easy." Use plain HTML, CSS and vanilla JS, with no framework and no build step. The design is clean, white and editorial: a huge black headline, a quiet search bar, and below them a wide cinematic photo panel of a Norwegian fjord at blue hour that comes alive with motion.

## Type and colour

- **Fonts** (self-hosted woff2):
  - Inter Display 700 for the headline (tight, about −0.035em)
  - Inter 400/500/600 for the UI
  - a small mono for the coordinate
- **Colours:**
  - **Base:** background `#FEFEFE`, headline ink `#0B0E0C`, text `#222223`, labels `#111313`
  - **Grey text:** muted `#6E7070`, lede `#727274`, hairlines `#E6E6E7`
  - **Accent:** fjord navy `#00286E` for the button, with `#0A2A72` for the field icons and the active-tab underline

## Scaling

- **Desktop:** the layout is authored at **1446×1088** with `--u = min(100vw/1446, max(100dvh/1088, .78px))`.
- **Height:** the page is exactly one viewport tall; the photo panel absorbs the spare height.

## Layout (desktop)

1. **Header row:**
   - **Left:** the headline **"Wander far. / Rest easy."** on two lines, about 90u.
   - **Right:** a right-aligned grey lede in two lines: "Find quiet fjords, cozy cabins, and the slow, wild / mornings you came for, all here in one place."
2. **Tabs:** Stays (active: semibold, with a navy underline) · Flights · Experiences, each with a thin line icon.
3. **Search bar:** one long hairline-bordered panel split into four cells.
   - **Fields:** each has a tiny caps label and a value with a navy icon. Where to? · Molde | Dates · Jun 18 – Jun 24 | Travelers · 3 travelers.
   - **Button:** a navy "Search" button with a magnifier icon.
4. **Photo panel:** full content width, filling the rest of the screen, square corners.
   - **Image:** `object-fit:cover`, centred. A 16:9 photo of a still fjord at blue hour: steep dark cliffs, low clouds clinging to the slopes, snowy peaks in the distance, a tall waterfall on the right, and a red cabin with lit windows and a small boat on the right shore, all mirrored in glassy water. Still: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/bd8d16a6-ac46-4cb8-bf0b-fb8e732ed31a.webp`.
   - **Motion:** a 5s muted looping video of the same frame plays on top with the identical cover rules: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b7e754-022b-4512-9b96-513173cb2e14.mp4` (1280×720). Clouds roll along the cliffs, the sky drifts, the waterfall pours and the reflections ripple. Fade it in when its first frame is ready.
   - **Label:** a small white location chip in the bottom-left corner: **"Geirangerfjord, Norge"** in semibold plus "62.10° N" in mono grey.

## Motion (UI)

- **Entrance:** a one-time CSS entrance. The headline lines rise and settle 0.14s apart, then the lede fades up, the tabs appear, the search panel slides in and the button pops last.
- **Rule:** the photo never animates in code; only the video moves.
- **Reduced motion:** no entrance and no video.

## Smaller screens

- **Layout:** stacked. The headline, then the lede, then the tabs.
- **Search:** the search fields stack vertically with a full-width navy button.
- **Photo:** the panel stays at least 240px tall, with the crop shifted right (`object-position:74%`) so the cabin and waterfall stay in view.

## Acceptance check (1440×900)

- The white page shows the black headline top-left and the grey lede top-right, then the tabs, the navy search bar and the wide fjord panel.
- The clouds and waterfall visibly move in the panel.
- **Content:** no brand logos.