# Prompt: Zapline trading CTA hero ("Royal Violet")

Build a single-file, one-screen **trading-product hero** for a fictional on-chain trading tool, **Zapline**. Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a pure black starfield with the glowing violet rim of a giant planet arching across the top. A big bold headline sits under it, and a dark product dashboard rises from the bottom of the screen with a violet light line along its top edge.

## Media

- **Glow video:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e859f229-8ebd-43fb-a5a0-58006ba75327.mp4` (1460×624, 4s, muted, loops).
  - **Content:** the violet and magenta planet rim on black. The glow pulses, plasma ripples along the arc, light streaks race outward, and the camera pushes in slowly.
  - **Loop:** the last second crossfades into the first, so it loops without a jump and never plays in reverse.
  - **Placement:** desktop only. Lay it over the star layer with `mix-blend-mode: screen` so its black stays transparent. It covers the top 1672×717 design px of the stage, and fades in (0.8s) when ready.
- **Fallback:** until then (and on phones), the rim is painted on a canvas from a small polar colour table, `panel-texture.png` / `chart-texture.png` (violet, embedded).
- **Stars:** procedural white dots on a canvas.
- **Dashboard glow:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e0e14572-12e1-4c08-b471-a21521844945.png`, a screen-blended strip above the dashboard.
- **Rule:** nothing in the sky is animated in code. Only the video moves it.

## Frame and scaling

- **Frame:** a **1672×941 design stage**, scaled by `s = min(vw/1672, vh/941)` and centred.
- **Overflow:** the dashboard panel stretches to the bottom edge, and the sky and stars fill the whole viewport.
- **Below 900px or portrait:** a stacked mobile layout.

## Type and colour

- **Fonts:** Inter 400/500/600 for the UI, and a heavy grotesk display (700) for the headline.
- **Colours:** background `#000`, text `#f7f7f8`, muted `#8b8988`, violet `#9312ff` with a button gradient `#a020ff` → `#7a1cf8`, green `#45b558`, red `#f03b2a`.

## Layout (design px)

- **Nav:** a violet lightning-bolt logo on the left; a centred menu "Home · Features · Zapline Advantage · Referral · FAQ" with Home in a dark pill; a violet "Get Started" pill on the right.
- **Hero:**
  - **Headline**, about 84px and centred: "**Zapline** Trade Smarter, / Faster, Safer.", with Zapline in a violet gradient.
  - **Lede:** "The first fully integrated on-chain trading experience. No dashboards, no delays — Zapline empowers you / to trade directly from your favorite DeFi apps and terminals."
  - **Buttons:** a violet "Get Started" pill and a dark "Learn More" pill.
- **Dashboard panel** (1204px wide, from y = 651, rounded 14px, dark glass with a violet border), with a thin glowing violet line along its top:
  - **Sidebar:**
    - "Zapline" with a gear
    - Search, Dashboard (active pill), Snipes, Disconnect
    - Wallets, Referral, Settings
    - a "Zapline Pro" promo card with an "Upgrade" pill
  - **Top bar:** small icons and the user "Alex T. 0x3f4…9c7e".
  - **Stats:** "Revenue generated (since inception) 214,402 +12.5%" and "Active wallets/users 6412 −3.1%".
  - **Chart:** "Daily dynamics of sales" with a violet area chart.
  - **Calendar:** "January 2024", then "Start date–Now (monthly)", then rows: Total snipes 1,284 +8.4%, Avg. execution 0.42s, Win rate 68.2% +2.1%, and a "Connected apps: Charting · Terminals" row.

## Motion (UI)

- **Entrance:** one timeline.
  - The nav fades down.
  - The headline wipes up line by line, then the lede and buttons.
  - The dashboard rises; its sidebar, stats, chart and calendar settle in a stagger.
- **Hover:** buttons brighten with a violet glow.
- **Reduced motion:** no entrance and no video.

## Phones

- **Planet:** the rim is cropped to the screen width.
- **Nav:** collapses to a menu button.
- **Hero:** the headline wraps to three lines.
- **Dashboard:** becomes a scrolling column with sidebar chips.

## Acceptance check (1440×960)

- The violet planet rim glows across the top and visibly pulses and streaks.
- The headline and buttons are centred.
- The violet-edged dashboard fills the lower half.
- **Content:** no real brands.