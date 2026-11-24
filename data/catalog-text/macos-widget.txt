# Prompt: Recreate the Driftbar Meadow Footer (exact spec)

Copy everything below the line into your AI coding tool.

---

Build a single-file `index.html` (inline CSS, no frameworks, no build step) that recreates the **Driftbar** footer **exactly** as specified. It is one full-viewport footer:
- a pale paper top holding a brand block and three link columns
- a looping video of a blue-hour meadow (lavender mist, fireflies, first stars) filling the lower half and fading into the paper
- a giant frosted-glass "Driftbar" wordmark sinking into lavender fog at the bottom

Follow every value literally.

## 1. Media (use these exact URLs)

```html
<div class="footer__stage" aria-hidden="true">
  <video class="footer__video"
    src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4"
    poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261014_121838_c97d0940-f430-4304-8573-4f47ee44f447.png"
    autoplay muted loop playsinline preload="auto"></video>
</div>
```

The video is 1920×1080 and loops seamlessly. It shows rolling grassy hills at blue hour: a grassy slope in the left foreground, misty hills receding to the right, a pink-violet horizon, a periwinkle sky with a few stars, and warm fireflies over the grass.

## 2. Font

**Inter** (variable, optical size 14–32, weight 400–700) for everything:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap" rel="stylesheet" />
```

Stack: `"Inter", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`, with antialiased font smoothing.

## 3. Head

`<title>Driftbar — Meadow Footer</title>` and `<meta name="viewport" content="width=device-width, initial-scale=1" />`.

## 4. Tokens and unit system

```css
:root {
  --paper: #f1f1ee;
  --ink: #0c0c0c;
  --body: #6f6f6c;
  --muted: #9c9c98;
  --wordmark: #efefeb;
  --mist: #e2e3f1; /* pale lavender the blue-hour meadow fades into */
  --font: "Inter", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font); }
a { color: inherit; text-decoration: none; }
ul { margin: 0; padding: 0; list-style: none; }
```

The footer is drawn on a **1440 × 672 canvas**. Every desktop size below is `calc(N * var(--u))`, written as `N u`:

```css
.footer {
  --u: min(100vw / 1440, 100vh / 672);
  --u: min(100vw / 1440, 100svh / 672);
  position: relative; height: 100vh; height: 100svh;
  background: var(--paper); overflow: hidden; isolation: isolate;
}
```

## 5. Structure (exact DOM order)

```
footer.footer
  div.footer__stage[aria-hidden] > video.footer__video        (section 1)
  p.footer__wordmark[aria-hidden]   "Driftbar"
  div.footer__fog[aria-hidden]
  div.footer__content
    div.brand
      a.brand__logo[href="#"][aria-label="Driftbar home"] > span.brand__mark + "Driftbar"
      h2.brand__title    "The calm bar for macOS"
      p.brand__text      "Driftbar gathers music, tasks, meetings, weather, search, focus timers, quick notes, and more handy widgets into one calm floating bar just above your Mac Dock."
      a.brand__cta[href="#"] > Apple-logo svg + "Get Driftbar today"
      p.brand__copy      "© 2026 Driftbar Inc. - Made in Lisbon."
      p.brand__by        "Built with " span.brand__heart[aria-label="love"] "💙" " by " span.brand__author > (span.brand__avatar[aria-hidden] > svg) "Mira Okafor"
      ul.brand__status   (chips, below)
    nav.col.col--menu[aria-label="Menu"]          h3.col__title "Menu"          ul.col__list: Tour, Showcase, Q&A, Licence, Journal
    nav.col[aria-label="Essentials"]              h3.col__title "Essentials"    ul.col__list: Support, Up next, Privacy notice, Usage guidelines, Manage licences
    nav.col[aria-label="From our team"]           h3.col__title "From our team" ul.col__list: Clipnest.io, Tallyo.io, Pinwell.io, Glyfo.co, Shelfmark.app, Wireloom.com, Gridcraft.app
```

Every link is `<li><a href="#">…</a></li>`.

**Apple logo (CTA):**
```html
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path
d="M17.05 12.54c-.03-2.75 2.25-4.07 2.35-4.14-1.28-1.87-3.27-2.13-3.98-2.16-1.69-.17-3.3 1-4.16 1-.86 0-2.18-.97-3.59-.95-1.85.03-3.55 1.07-4.5 2.72-1.92 3.33-.49 8.25 1.38 10.95.91 1.32 2 2.8 3.43 2.75 1.38-.06 1.9-.89 3.56-.89 1.66 0 2.13.89 3.59.86 1.48-.03 2.42-1.34 3.33-2.67 1.05-1.53 1.48-3.02 1.5-3.1-.03-.01-2.88-1.1-2.91-4.37ZM14.31 4.46c.76-.92 1.27-2.2 1.13-3.46-1.09.04-2.41.73-3.19 1.64-.7.81-1.31 2.1-1.15 3.34 1.22.09 2.46-.62 3.21-1.52Z"
/>
</svg>
```

**Avatar:**
```html
<svg viewBox="0 0 24 24">
<rect width="24" height="24" fill="#e6e6e3" />
<circle cx="12" cy="9.2" r="4.4" fill="#1b1b1b" />
<path d="M3 25c0-6 4-9.4 9-9.4S21 19 21 25Z" fill="#1b1b1b" />
</svg>
```

**Status chips:**
```html
<ul class="brand__status" aria-label="Driftbar status">
<li class="chip"><span class="chip__dot" aria-hidden="true"></span>9,400 Macs in sync</li>
<li class="chip">
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7" /><path d="M20 4v7h-7" /></svg>
v1.8 · Shipped today
</li>
<li class="chip">
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8Z" /></svg>
Rated 4.8 avg
</li>
</ul>
```

## 6. Desktop styles

**Stage and video**
- `.footer__stage`: absolute, `inset:0`, z-index 0.
- `.footer__video`: block, 100% × 100%, `object-fit:cover; object-position:50% 100%; transform:translateY(9%)`.
- `.footer__stage::after` (a haze so the copy stays readable): absolute, `inset:0`, `linear-gradient(to bottom, var(--paper) 0%, rgb(241 241 238 / .96) 26%, rgb(241 241 238 / .72) 44%, rgb(241 241 238 / 0) 70%)`.

**Wordmark, frosted glass**
- Position: absolute, `left:50%; bottom:-2u; transform:translateX(-50%)`, z-index 1, margin 0.
- Type: `font-size:390u` (this makes "Driftbar" span about 1200u), weight 600, `line-height:.74`, `letter-spacing:-0.045em`, no wrap, `pointer-events:none; user-select:none`.
- Glass fill, clipped to the letters:
  ```css
  color: rgb(232 234 250 / .4);
  background: linear-gradient(to bottom, rgb(255 255 255 / .78), rgb(214 218 246 / .36) 48%, rgb(255 255 255 / .62));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 -1u 0 rgb(255 255 255 / .55)) drop-shadow(0 0 18u rgb(190 200 255 / .45));
  ```
  Do **not** use `-webkit-text-stroke`. The letters overlap slightly, and a stroke would draw lines through the overlaps.

**Fog**
- `.footer__fog`: absolute at the bottom (`inset:auto 0 0`), z-index 2, `height:17%`, no pointer events.
- Background: `linear-gradient(to top, var(--mist) 0%, rgb(226 227 241 / .6) 30%, rgb(226 227 241 / 0) 100%)`.

**Content grid**
- `.footer__content`: relative, z-index 3.
- Grid columns `440u 240u 240u 1fr`, `align-items:start`.
- Width `1440u`, `margin:0 auto`, padding `86u 100u 0 160u`.

**Brand block**
- `.brand__logo`: inline-flex, centred, gap `10u`, `17u`, weight 500, letter-spacing −0.02em.
- `.brand__mark`: a `30u` square with radius `8u`.
  - Background `linear-gradient(to bottom, #2b2b2b, #0a0a0a 55%)`, shadow `0 1u 2u rgb(0 0 0 / .25)`.
  - `::after` is a white pill: left and right 13%, bottom 14%, height 19%, radius 999px.
- `.brand__title`: margin-top `19u`, `20u`, weight 600, line-height 1.2, −0.045em.
- `.brand__text`: max-width `412u`, margin-top `18u`, `--body` colour, `13.7u`, line-height 1.43, −0.012em.
- `.brand__cta`:
  - Box: inline-flex, gap `6u`, height `32.5u`, margin-top `20u`, padding `0 16u 0 15u`, radius `7u`, black, white text.
  - Type: `11.8u`, weight 500, −0.01em.
  - Icon: the svg is `13u` with margin-top `−1.5u`.
  - Hover: background `#262626` and `translateY(-1px)` (.2s).
- `.brand__copy`: margin-top `23u`, `--muted`, `12.2u`, letter-spacing .01em.
- `.brand__by`: flex, centred, gap `5u`, margin-top `21u`, `11.8u`, weight 500, −0.01em.
  - `.brand__heart` is .95em. `.brand__author` is inline-flex with gap `6u` and margin-left `5u`.
  - `.brand__avatar` is a `23u` circle on `#e3e3e0`.
- `.brand__status`: flex, wrap, gap `8u`, margin-top `16u`.
- `.chip`:
  - Box: inline-flex, gap `6u`, height `25u`, padding `0 10u`, `1px solid rgb(12 12 12 / .12)`, radius 999px, `rgb(255 255 255 / .55)` background.
  - Type: `10.8u`, weight 500, −0.01em, no wrap.
  - Icons: the chip svg is `11u`, no fill, `stroke:currentColor`, stroke-width 2, round caps and joins.
  - `.chip__dot`: a `6u` circle in `#2fb36a` with a ring `0 0 0 2.5u rgb(47 179 106 / .18)`.

**Link columns**
- `.col__title`: `16u`, weight 600, line-height 1, −0.045em.
- `.col__list`: grid, gap `20.5u`, margin-top `24u`, `13.7u`, line-height 1.24, letter-spacing .022em, colour `#161616`.
- The Menu column's list overrides that: gap `15u`, margin-top `21u`, weight 500, −0.025em, `--ink`.
- Links fade to opacity .55 on hover (.2s).

## 7. Tablet (768–1023px)

- `--u: min(100vw / 1040, 100svh / 672)`.
- Columns `400u 190u 210u 1fr`, width `1040u`, padding `64u 40u 0`.
- Brand text max-width `350u`.
- Wordmark `286u`, bottom `10u`.

## 8. Mobile (≤767px)

- **Footer:** `--u:1px`. It becomes a flex column, `height:auto; min-height:100svh`.
- **Haze:** `linear-gradient(to bottom, var(--paper) 0%, rgb(241 241 238 / .95) 50%, rgb(241 241 238 / .8) 68%, rgb(241 241 238 / 0) 90%)`. It runs further down than on desktop because the blue-hour hills are darker.
- **Content:**
  - Grid columns `auto auto auto`, `justify-content:space-between`.
  - Gaps: column 12px, row 36px.
  - Width 100%, padding `40px 20px 0`, margin-bottom `max(34vw, 150px)`.
  - `.brand` spans all columns.
- **Brand block sizes:**
  - Title 21px. Text max-width 34em, 14px.
  - CTA: height 38px, padding `0 18px 0 16px`, radius 8px, 13px, svg 14px.
  - Copy and credit line 12.5px.
  - Chips: height 28px, 12px.
- **Columns:**
  - Column titles 15px.
  - All lists: gap 14px, margin-top 20px, 13px, letter-spacing 0, no wrap.
- **Wordmark and fog:** wordmark `bottom:5vw; font-size:27vw`, fog height 7%.
- **Below 360px:** columns become `1fr 1fr`.

## 9. Motion

The only motion is the looping video and the hover transitions. Under `prefers-reduced-motion: reduce`, turn off the CTA and link transitions.

## 10. Acceptance check

At 1440×900 you should see:
- **Top left:** the black logo tile and "Driftbar".
- **Brand block:** "The calm bar for macOS", the three-line grey paragraph and the black "Get Driftbar today" button. Below them, the copyright, the "Built with 💙 by Mira Okafor" line and three chips.
- **Columns:** Menu, Essentials and From our team, starting at x≈600, 840 and 1080.
- **Lower half:** the blue-hour meadow with fireflies, fading into the paper above.
- **Wordmark:** a giant frosted-glass "Driftbar" spanning roughly x 140–1320, sinking into lavender fog at the bottom edge.