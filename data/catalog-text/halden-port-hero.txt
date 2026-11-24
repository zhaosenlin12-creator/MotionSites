# Prompt: Halden, AI teammate for port operators (bowl-glow scroll hero)

Give me the superdetailed exact prompt to recreate this page exactly as it is, including the correct asset URL, all elements, animations, and fonts. This is that prompt.

## What it is

Build a B2B SaaS landing hero for a fictional maritime-logistics AI company, **Halden**, whose AI agent is called **Hal**. Use one HTML file with plain CSS and vanilla JavaScript: no framework, no build step, no libraries.

The page is three scenes stacked in one scroll:

1. **Hero.** A white page with a soft, rounded, **bowl-shaped sky-cyan glow** hanging from the top edge. It has a pale periwinkle rim and fades to white at the sides and bottom. Over it sit:
   - a floating white pill navbar;
   - a big two-line navy headline;
   - a "trust" line;
   - a large "Get a demo" pill;
   - a 4×2 grid of fictional partner wordmarks.
2. **Statement.** As you scroll, the hero content scrolls away while the bowl deepens and widens until the whole screen is flooded sky-cyan. A centred four-line statement rises from below and pins in the middle. It reveals **letter by letter as you scroll**: each letter goes from invisible to blurred white, then blue, then navy. When about 40% is revealed, a "Get a demo" pill pops into the navbar, first as a dot, then a circle, then stretching to a full pill.
3. **Dark split.** After the statement finishes, a deep navy panel scrolls up over it.
   - **Left 58.3%:** thin guide lines, a white headline revealing letter by letter with scroll, and a ruled row that fades up.
   - **Right 41.7%:** a full-height aerial photo of a container ship in a fjord, slowly zooming out as the panel arrives.

Every "Get a demo" button has the same hover: its small glowing cyan dot grows into a cyan circle holding a navy chevron.

## Media: every asset URL

There is exactly **one image** and **one font stylesheet**. Nothing else is loaded.

| Asset | URL |
|---|---|
| Aerial container ship in a misty fjord (right half of the dark split) | `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_050506_a830ff21-4c71-4272-bc39-b61cacb54463.png&w=1400&q=85` |
| Google Fonts: Inter Tight 400/500/600 | `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap` |

About the ship photo:
- It is a 2:3 portrait, generated with Higgsfield and served through the images.higgs.ai resizer as WebP, 1400px wide, quality 85.
- The scene is shot from a high drone angle down the length of a long dark Norwegian fjord: a loaded container ship in the lower-centre third, a white foamy V-wake trailing to the bottom edge, steep snow-dusted forested cliffs on both sides receding into low cloud at the top, and cold teal-navy water.
- Use it as `<img id="ship">` with `object-fit:cover`, absolutely filling its column.
- Alt text: "Aerial view of a container ship sailing up a misty fjord".

The background glow is not an image. It is drawn every frame into a tiny 96×60 `<canvas>`, which CSS stretches to the full viewport so the browser's bilinear upscaling makes it naturally soft (see "Bowl glow").

All logo marks and the brand mark are inline SVG.

## Fonts

- **Inter Tight** (Google Fonts, weights 400/500/600) for everything, falling back to `system-ui, sans-serif`. `-webkit-font-smoothing:antialiased`.
- **Georgia, serif** (bold italic) only for the "Nordhavn" wordmark in the logo grid.

## Tokens

```css
:root{
  --ink:#0b1d3a;          /* headline navy, button fill */
  --ink-2:#1d2f4f;        /* trust line */
  --accent:#5b7cf0;       /* "Hal" highlight, brand mark */
  --dot:#2fe0d0;          /* button dot / arrow circle */
  --panel:#0e1f3d;        /* dark split panel */
  --panel-line:rgba(255,255,255,.12);
  --gut:clamp(20px,5.7vw,82px);    /* page gutter */
  --ease:cubic-bezier(.22,.7,.2,1);
}
```

Reset: `*{box-sizing:border-box;margin:0;padding:0}`. `html` and `body` have a `#fff` background. `body` has `overflow-x:hidden`, and links inherit colour with no underline.

Colours used by the JavaScript:

| Name | Value | Used for |
|---|---|---|
| Bowl core | `#8fd5f1` | sky cyan |
| Bowl rim | `#d2daff` | pale periwinkle |
| Outside | `#ffffff` | white |
| Reveal accent | `#3f7cff` | hero and statement letters on their way to navy |
| Dark-panel ghost | `#5c6f92` | first colour of the dark headline letters |
| Dark-panel accent | `#8fe6f4` | middle colour of the dark headline letters |
| Dark-panel final | `#ffffff` | dark headline letters once revealed |

## Structure

```html
<div class="atmo"><canvas id="bg" width="96" height="60"></canvas></div>
<header class="nav" id="nav">…</header>
<main>
  <section class="hero" id="hero">…</section>
  <section class="statement" id="statement"><div class="pin"><p id="stmt">…</p></div></section>
  <section class="split" id="split"><div class="l">…</div><div class="r"><img id="ship"></div></section>
</main>
```

- `.atmo`: `position:fixed; inset:0; z-index:0; pointer-events:none; background:#fff`. The canvas is absolute, `inset:0`, 100%×100%, `display:block`.
- `main`: `position:relative; z-index:1`.

## Navbar (fixed pill)

- **Container:** `position:fixed; z-index:50; top:20px; left/right:var(--gut); height:60px; border-radius:999px; background:#fff; display:flex; align-items:center; padding:0 10px 0 22px`. Shadow: `0 1px 0 rgba(11,29,58,.04), 0 10px 30px -18px rgba(11,29,58,.25)`.
- **Entrance:** it starts at `opacity:0; translateY(-8px)` and animates in with `navin .9s var(--ease) .15s forwards`.
- **Brand (left):** a 22px SVG mark, a periwinkle `#5b7cf0` circle (r 11) with two white wavy strokes (stroke 1.8, round caps): `M5 10.2c2.3-1.6 4.7-1.6 7 0s4.7 1.6 7 0` and the same 4px lower. Next to it, "Halden" in 17px weight 500, letter-spacing −.02em, with a 9px gap.
- **Links (centre):** absolutely centred (`left:50%; translateX(-50%)`), gap 31px, 14px weight 500, letter-spacing −.005em, opacity .92. Hover takes them to opacity .55 over .2s. They read: Platform, Solutions, Security, Company, Resources.
- **Right:** "Login" (14px, weight 500, padding 0 14px), then the **nav CTA wrapper** `.navcta`:
  - Hidden state: `width:42px; height:42px; overflow:hidden; border-radius:999px; margin-left:-42px; transform:scale(0); transform-origin:100% 50%`.
  - Transitions: `transform .35s var(--ease), width .65s var(--ease) .22s, margin .35s var(--ease)`.
  - Inside is a `.btn` fixed at 142px wide. Its label `<span class="lbl">Get a demo</span>` has `opacity:0` and fades in `.4s` after a `.45s` delay.
  - When `#nav` gets class `on`, the wrapper becomes `width:142px; margin-left:16px; transform:scale(1)`, the label goes to opacity 1, and Login loses its right padding. The result: a dark circle pops in at the right end, then stretches leftwards into the full pill, then the text appears.

## Button (`.btn`): dot to arrow hover

- **Base:** `position:relative; inline-flex; height:42px; padding:0 46px 0 18px; border-radius:999px; background:var(--ink); color:#fff; 13.5px weight 500; letter-spacing −.01em; nowrap`.
- **Dot (`.dot`):** absolute, `right:16px`, vertically centred, 10×10, round, `#2fe0d0`, glow `0 0 10px rgba(47,224,208,.7)`. It holds a 12px chevron SVG (`M4.5 2.5 8 6l-3.5 3.5`, stroke `#0b1d3a`, width 1.6, round) at `opacity:0; translateX(-4px)`.
- **Hover:** the dot becomes 32×32 at `right:5px` and loses its glow (width/height/margin/right animate .45s var(--ease)). The chevron fades in (.3s, .05s delay) and slides to place.
- **Large variant (`.btn.lg`, the hero CTA):** height 62px, padding `0 62px 0 28px`, 17px text.
  - Dot: 14px at `right:24px`, chevron 16px.
  - Hover: dot grows to 48px at `right:7px`.

## Hero (100vh, min 640px)

All children are absolutely positioned against the hero, using `--gut` as the left offset.

- **Headline `h1#h1`:**
  - Position: `top:21.5vh`, weight 400, `font-size:clamp(34px,4.65vw,70px)`, line-height 1.03, letter-spacing −.035em, nowrap.
  - Text: `Meet <span class="hl">Hal</span>, your AI teammate<br>for port operators`. "Hal" is `#5b7cf0`, the rest `#0b1d3a`.
  - It reveals letter by letter on load (see "Letter reveal").
- **Trust line `.trust`:** `top:58vh`, `clamp(15px,1.28vw,19px)`, letter-spacing −.015em, `#1d2f4f`. Text: "Port operators trust Halden". Fades up with a 1.15s delay.
- **CTA:** `.btn.lg` at `bottom:7.5vh`, "Get a demo". Fades up with a 1.3s delay.
- **Logo grid `.logos`:**
  - Layout: `position:absolute; right:0; width:50%; top:55vh; bottom:0`, a 4-column × 2-row grid of equal cells. Each cell centres its mark in `#3e4d68`.
  - Hairlines: every cell has a 1px left line (vertical gradient `rgba(11,29,58,.08)` to `.05`), and cells 5–8 also have a 1px top line `rgba(11,29,58,.06)`.
  - Cells fade up with staggered delays: 1.25, 1.32, 1.39, 1.46, 1.42, 1.49, 1.56, 1.63s.
  - Marks are 13px, weight 600, letter-spacing .06em, with SVGs 20px tall and a 7px gap:
    1. **OCEANEX:** two wavy strokes (stroke 2.4).
    2. **Nordhavn:** Georgia bold italic 15px, letter-spacing .02em, no icon.
    3. **BLUEGATE:** three solid bars of heights 10/15/12.
    4. **KELPWAY:** outlined triangle, text 11px weight 500 letter-spacing .32em.
    5. **TIDELINE:** text only, 16px weight 800, letter-spacing −.02em, inside a 2px border with radius 4px and padding 2px 7px.
    6. **HARBORIX:** "H" made of 3px strokes.
    7. **seaflux:** lowercase 15px weight 500, ring plus centre dot.
    8. **PORTERRA:** filled mountain silhouette, 11px letter-spacing .24em.
- **Fade-up:** `.fade-up{opacity:0;translateY(14px)}`. Once `body.ready` is set, each runs `fu .9s var(--ease) forwards` with `animation-delay:var(--d)`, ending at opacity 1, no transform.

## Bowl glow (the main effect)

`#bg` is a **96×60 canvas** redrawn every `requestAnimationFrame`, with one RGBA value per pixel. CSS stretches it to the viewport, so it renders as a large, perfectly smooth gradient.

### Shape

Work in viewport units: y runs from 0 at the top to 1 at the bottom, and x is measured from the centre in height units, i.e. `px = |x/W − .5| · aspect` where aspect = innerWidth/innerHeight.

1. **Edge curve.** Build the bowl's edge from 48 points with `yy` running from −0.3 to `tip`:
   `CX = half·aspect·(1 − yy/tip)^0.72`, `CY = yy`.
   The exponent 0.72 curves the walls, flaring them outward near the top.
2. **Distance.** For each pixel, take the exact distance to the nearest **segment** of that polyline (not the nearest point, which would leave gaps and spikes). Make it negative when the pixel is inside, i.e. `py < tip` and `px < half·aspect·(1 − py/tip)^0.72`.
3. **Round the bottom.** Subtract `RND = 0.25` from the distance. This inflates the shape so the bottom becomes a wide round U instead of a point.
4. **Fill amount.** `g = 1 − smoothstep((sd + soft)/(2·soft))`, which runs from 0 (white) to 1 (core).
5. **Colour.**
   - For `g < .38`: mix white to `#d2daff`, eased by smoothstep(g/.38).
   - Otherwise: mix `#d2daff` to `#8fd5f1`, eased by smoothstep((g−.38)/.62).
6. **Idle drift.** `tip += sin(t·0.00033 + 1.3)·0.02` and `half += sin(t·0.0005)·0.015`, which gives a slow breathing wobble.

### Scroll table

With `q = scrollY / innerHeight`, interpolate linearly between these keys. The values were fitted frame by frame to the reference motion.

| q | 0 | .03 | .08 | .18 | .40 | .66 | .87 | 1.15 | 1.43 | 1.8 |
|---|---|---|---|---|---|---|---|---|---|---|
| tip | .30 | .45 | .65 | .80 | .95 | 1.05 | 1.05 | 1.10 | 1.30 | 2.40 |
| half | .34 | .38 | .38 | .38 | .38 | .46 | .66 | .90 | 1.60 | 3.00 |
| soft | .22 | .26 | .22 | .22 | .19 | .16 | .13 | .10 | .10 | .10 |

What this looks like:
- **At rest:** a shallow, wide, soft bowl in the upper half, with white below it.
- **First ~40% of a screen:** the bottom of the bowl drops past the fold while its walls stay put.
- **From ~0.66 screens:** the walls spread outward until the last white wedges leave through the bottom corners. By ~1.43 screens the screen is solid cyan, and it stays solid after that.

The current values chase their targets with `cur += (tgt − cur)·0.12` each frame, which adds a little inertia.

### Intro

1. The bowl starts at `tip −.3, half .3, soft .1`: nothing visible, a pure white page.
2. After 0.25s it eases over 1.05s (smoothstep) to the q=0 values, so the glow drops in from the top edge as a band and blooms into the bowl.
3. During the intro, `cur` is set directly instead of easing.

## Letter reveal (shared)

1. **Split** `#h1`, `#stmt` and `#h2` into per-character spans:
   - Words are wrapped in `inline-block; nowrap` spans, so lines never break mid-word.
   - Whitespace stays as plain text, and `<br>` is kept.
   - Characters inside `.hl` are flagged so they finish in the accent colour.
2. **Progress.** `paint(chars, p, spread, final, accent, ghost)` gives each character a local progress: `t = clamp((p·(1+spread) − i/n)/spread)`.
3. **States.** Map `t` like this:

| t | opacity | colour | blur |
|---|---|---|---|
| 0 | 0 | ghost | 8px |
| 0 → .35 | 0 → 1 | ghost | 8 → 1.5px |
| .35 → .70 | 1 | ghost → accent | 1.5 → 0px |
| .70 → 1 | 1 | accent → final (`#5b7cf0` for flagged characters) | 0 |

Set `color` as rgba plus `filter:blur()` inline.

Where each reveal is used:
- **Hero headline:** time-based, `p` from 0 to 1 over 1.25s from load. Spread .35, final `#0b1d3a`, accent `#3f7cff`, ghost white.
- **Statement:** scroll-based, spread .16, same colours.
- **Dark headline:** scroll-based, spread .35, final white, accent `#8fe6f4`, ghost `#5c6f92`.

## Statement (pinned)

- **Section:** `.statement{position:relative; height:306vh; margin-top:-31vh; pointer-events:none}`. The negative margin makes the pin engage before the hero has fully left; the text is still invisible at that point.
- **Pin:** `.pin{position:sticky; top:0; height:100vh}`.
- **Text:** `#stmt` is absolute, `top:41.5vh`, left/right 0, centred, weight 400, `clamp(20px,2.8vw,42px)`, line-height 1.16, letter-spacing −.03em, navy, nowrap. It has `will-change:transform`. Four lines:
  > Hal is an AI teammate
  > that tracks vessels, books berths, files customs,
  > coordinates crews, escalates and does anything
  > in between to keep a port moving

  Put a space after each `<br>` so the words stay separate when the breaks are hidden on mobile.
- **Rise:** `s = clamp((q − .69)/.74)`, then `translateY(.205·(1−s)²·innerHeight)`. The text eases up the last ~20vh into place while it starts revealing.
- **Reveal:** `p = clamp((q − .56)/2.03)`.
- **Nav CTA:** `#nav.on` is toggled when `p > .4`.

## Dark split

- **Section:** `.split{position:relative; z-index:2; background:#0e1f3d; color:#fff; min-height:100vh; display:grid; grid-template-columns:58.3% 41.7%}`.
- **Left column `.l`:** `padding-left:var(--gut)`, with a 1px vertical guide line at `left:var(--gut)` running full height in `rgba(255,255,255,.12)`.
- **Headline `h2#h2`:**
  - Weight 400, `clamp(32px,3.15vw,48px)`, line-height 1.08, letter-spacing −.03em, padding `21vh 0 0 6.2vw`.
  - Text: "AI teammate that operates<br>like you work".
  - Reveal progress: `p2 = clamp((.8 − splitTop/innerHeight)/.65)`, so it reveals while the panel's top travels from 80% to 15% of the viewport.
- **Row `#row`:**
  - Layout: `margin-top:6.4vh`, 1px top border in the panel line colour, which runs from the guide line to the image. Grid `1fr 1.05fr`, gap 24px, padding `3vh 6vw 0 6.2vw`.
  - `h3`: "Port operators", 400 weight, `clamp(17px,1.4vw,21px)`.
  - `p`: `clamp(13px,1.1vw,16px)`, line-height 1.38, `rgba(255,255,255,.5)`, max 20em. Text: **"Berth faster. Clear more. Stop chasing manifests."** in white weight 500, then "Hal runs scheduling, bookings, customs filings, and more - so your team stays focused on throughput and safety."
  - Starts at `opacity:0; translateY(14px)` and transitions to visible over .9s with the same ease once `p2 > .92`, then back again if you scroll up.
- **Right column `.r`:** `position:relative; overflow:hidden`. The ship image fills it with a `50% 60%` origin. Its scale goes `1.08 − 0.08·clamp(1 − splitTop/innerHeight)`, settling at scale 1 as the panel reaches the top.

## Script order

1. Split the three text blocks and paint them all at p=0.
2. On the first animation frame, add `body.ready` (which starts the CSS fade-ups), then start the intro loop and the canvas loop.
3. Run `onScroll` on scroll (passive), on resize and during the intro. It updates:
   - the bowl targets;
   - the statement rise and reveal;
   - the nav CTA;
   - the dark headline and row;
   - the ship scale.

## Responsive (≤ 820px)

- Hide the nav links. The nav becomes 54px tall at `top:12px`, with an 8px CTA margin and Login padding of 0 6px.
- Hero headline: `top:17vh; font-size:7.4vw`, wrapping allowed.
- Trust line at `top:44vh`. The logo grid spans full width from `top:50vh` to `bottom:18vh` with icons only (text spans hidden, marks 11px).
- CTA at `bottom:6vh`.
- Statement: wraps normally at 23px, max-width 15em, `<br>` hidden.
- Split: one column, rows `auto 70vh`. h2 padding `16vh 0 0 6vw`, row single-column with padding `3vh 6vw 6vh`.
- There must be no horizontal scrolling at 390px wide.