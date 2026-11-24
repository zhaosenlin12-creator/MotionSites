# Tidewell — "Tides in Motion" scroll story: full recreation prompt

Build a single-file, four-part scroll-story landing page for a fictional coastal motion studio called **Tidewell**. It is one `index.html` with inline CSS and vanilla JavaScript (no libraries, no build step). The page is a long scroll: a light hero whose headline assembles itself out of tiny pixel icons, a pinned stage where a fan of painterly coastal art cards scatters, piles up and re-fans into a rotating wheel under a "From shore to product" headline, a dawn-sky panel that grows from the centre with a floating cream instant camera that finally zooms into its own lens, and a black manifesto section that scrolls one huge line of text sideways while pastel stickers and 3D trinkets pop in. Everything below must be reproduced exactly: every string, colour, size, asset URL, timing, easing and scroll range.

---

## 1. Assets (use these exact URLs; do not re-host)

Every image is loaded through the Higgsfield image proxy: `https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded source>&w=<width>&q=85`. In the table, "source" is the URL to encode into that template. All sources share the prefix `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/`.

| Name | Source file (append to prefix) | Proxy width | What it is |
|---|---|---|---|
| Grid A | `hf_20261118_061436_77e1a13d-60a0-4746-bf7b-53b2365609f5.png` | 900 | 2×2 sheet, 1744×2336, four 3:4 card paintings: top-left lighthouse on dark rocks at a peach sunset; top-right peach scallop shell on lavender clouds; bottom-left blue harbour with white sailboats and a pastel town; bottom-right top-down beach, white surf on peach sand |
| Grid B | `hf_20261118_061435_8a1828bc-a149-44ea-80fd-c4c33eef7407.png` | 900 | 2×2 sheet: TL white lighthouse on rocks in a pink dawn sea; TR dark teal wave crashing with white foam; BL teal barrel wave with a tiny surfer silhouette; BR lavender-pink dawn sky over a flat sea |
| Grid C | `hf_20261118_061433_df51e37b-d8b8-40b1-9830-01ea6c20c83d.png` | 900 (300 for the chip) | 2×2 sheet: TL peach scallop shell on pale sand; TR white sailboat on a lavender sea at dawn; BL deep slate-blue open sea; BR pale blue shallows with foam lines on sand |
| Sky plate | `hf_20261118_061434_a222c9d2-715b-44b7-873f-0548d1624211.png` | 2400 | 2688×1152 dawn sky, blue-grey to peach clouds, no objects |
| Sky video | `hf_20261118_065029_a6ae2ebb-cd79-41fd-ae60-6b66fdda04ee.mp4` (use the CloudFront URL directly, not the proxy) | — | Kling 3.0 clip, 1280×720, 24 fps, 5.04 s, silent: the same sky as a fast cloud time-lapse that loops back to its first frame |
| Camera | `hf_20261118_061547_10365665-40d3-4390-944f-7bcb10dc6d4a.png` | 1400 | 2048×2048 transparent PNG, a cream retro instant camera seen 3/4 from the front (no branding) |
| Sticker sheet | `hf_20261118_061547_979f8673-f904-4102-90a0-6458bce33bc8.png` | 1200 (plane), 700 (stickers) | 2048×2048 transparent PNG with four 3D objects: TL pink-white spiral conch shell, TR pearly peach sphere, BL glossy peach-pink capsule, BR folded white paper plane |

**Sprite cropping (no local slicing).** Show part of a sheet by setting, for a crop box `[x0,y0,x1,y1]` in 0–1 image fractions with `dx=x1-x0`, `dy=y1-y0`: `background-size: (100/dx)% (100/dy)%` and `background-position: (x0/(1-dx))*100% (y0/(1-dy))*100%` (use 0% if dx or dy is 1). Crop boxes: paper plane `[.594,.613,.891,.816]`, conch shell `[.109,.121,.430,.422]`, pearl `[.625,.152,.863,.395]`, capsule `[.094,.656,.418,.793]`, camera `[.148,.141,.879,.809]` (camera element aspect ratio 1.094). A card shows one quadrant of a grid: `background-size:200% 200%`, position `0%/100%` horizontally for left/right cell and `0%/100%` vertically for top/bottom cell.

**Font:** Inter (variable, weights 100–900), latin subset, self-hosted woff2 from `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2`, `font-display:swap`. Fallback stack: `system-ui, -apple-system, "Segoe UI", sans-serif`. Body weight 500.

---

## 2. Colour tokens

| Token | Hex | Use |
|---|---|---|
| bg | `#F1ECEA` | page canvas (warm shell-pink off-white) |
| ink | `#1F2430` | headlines, nav current link, dark buttons, pixel-icon outlines |
| muted | `#938B90` | grey accent words, nav links |
| dark | `#12141B` | manifesto background, blackout |
| sky1 / sky2 | `#C0C9D9` / `#EFCEBE` | dawn sky palette |
| peach | `#DDAD95` | stickers, sun icon |
| lavender | `#B0AEC6` | stickers |
| harbour blue | `#7DA3BB` | pixel-icon fill |
| sand | `#EBC9AE` | sticker |
| rose | `#BF9FA5` | — |
| slate | `#4C6165` | — |
| ice | `#BAD9E6` | stickers |
| sub-line grey | `#5B5A62` | process sub-line |
| sky grey words | `#8D8893` | grey words on the sky |
| manifesto grey words | `#6E7180` | grey words on black |
| CTA hover | `#2E3546` | dark button hover |

---

## 3. Scaling system

All sizes are computed in JS on load and on resize, and written as CSS custom properties on `:root`.

- `W = innerWidth`, `H = innerHeight`. **Mobile layout** when `W < 820 && W < H*1.1` (portrait phones and portrait tablets); landscape phones use the desktop layout.
- `--u = min(W/1440, H/800)` px (design unit, used for the plane size).
- `--n` = nav/edge unit: mobile `min(1, W/560)`, desktop `clamp(W/1440, 0.62, 1.25)`.
- `--hfs` hero headline size: mobile `min(W*.12, H*.09)`, desktop `min(W*.074, H*.135)` (≈106 px at 1440×900).
- `--ic` pixel icon size = `hfs*.62`.
- `--pfs` process headline: mobile `min(W*.085, 40)`, desktop `min(W*.0335, H*.062)`.
- `--sfs` sky words: mobile `min(W*.09, 44)`, desktop `min(W*.042, H*.078)`.
- `--mfs` manifesto line: mobile `min(W*.11, H*.075)`, desktop `min(W*.05, H*.1)`.
- `--camw` camera width: mobile `min(W*.62, H*.34)`, desktop `min(W*.19, H*.36)`.
- Card width `cw` (px, set as `--cw` unitless on the cards container): mobile `min(W*.30, H*.2)`, desktop `min(W/1440, H/780)*218`. Card height = `cw*1.32`, radius `cw*.075`, centred on its transform point (margin −0.66cw / −0.5cw). Card shadow `0 cw*.03 cw*.09 rgba(31,36,48,.16)` plus `inset 0 0 0 1px rgba(255,255,255,.35)`.

---

## 4. Page structure (DOM in order)

1. **Fixed nav** (z 50, height `86n`, side padding `40n`, flex space-between, pointer-events only on children):
   - Logo (46n square SVG, viewBox 48, currentColor = ink): a filled circle at (24,12.5) r 8.5 (a "head"), a filled wave band path `M6 27c6-5 13-5 18 0s12 5 18 0v6c-6 5-13 5-18 0S12 28 6 33z`, and a stroked wave `M10 39c5-3.6 10-3.6 14 0s9 3.6 14 0` (stroke 4.2, round caps). Link to top, aria-label "Tidewell home".
   - Centre links, 15n, weight 400, tracking −0.005em, gap 28n, colour muted, current/hover ink: **Home**, **Our Team**, **Cases**, **Features**, **Pricing**, **Contact**. Hidden below 820 px. Home→top, Our Team/Cases→process, Features/Pricing→product, Contact→manifesto (anchor clicks jump to 20% / 74% of the story scroll, or to the manifesto top).
   - Dark pill button **View Collections** + 16n arrow icon (path `M3 8h10M9 4l4 4-4 4`, stroke 1.6): height 42n, padding 0 16n 0 20n, radius 12n, bg ink, text bg colour, 15n weight 500.
   - When scrolled past 98.5% of the story or into the manifesto, the body gets `dark-nav`: logo white, links `#8C8F9A`, current link white, button white with ink text.
2. **`<section id="story">`**, height **1600vh**, position relative. Contains:
   - **Hero** (`<header>`, absolute top 0, full width, 100vh, z 9, pointer-events none). It is its own section: it scrolls away 1:1 with the page while the stage below stays pinned. Inside:
     - Headline holder at top 41%, height 0, font `--hfs`, weight 560, tracking −0.035em, line-height 1, ink. Role heading level 1, aria-label "Tides in Motion". It contains the word row (centred, each character its own inline-block span, start hidden) and an icon layer (7 absolutely positioned pixel icons).
     - Paper plane element (62u square, sprite of the plane crop), hidden until it flies.
   - **Pinned stage** (`position:sticky; top:0; height:100vh/100svh; overflow:hidden; bg`), containing in z order:
     - Process block (z 4), top 20% (17% on mobile), centred, 16 px side padding: two-line headline at `--pfs`, weight 500, line-height 1.12, tracking −0.03em: line 1 "**From** shore [chip] **to** product", line 2 "built **through** real process" (bold words above = muted grey; the rest ink). Each word is an inline-block. The chip is 1.05em × 0.92em, radius .16em, vertical-align −.12em, margin 0 .14em, shadow `0 .06em .18em rgba(31,36,48,.18)`, showing Grid C's top-right cell (sailboat at dawn). Sub-line "Turning concepts into working digital products." at `pfs*.27`, weight 400, `#5B5A62`, margin-top `pfs*.42`. Dark pill **View All Collections** + arrow: height `pfs*.64`, font `pfs*.25`, padding 0 `.28pfs` 0 `.32pfs`, radius `.2pfs`, margin-top `.38pfs`.
     - Cards layer (z 2): 12 card divs.
     - Sky panel (z 6), full stage, initially hidden: the sky plate (inset −4%, cover), the sky video over it (left/top −4%, 108% size, object-fit cover, fades in to opacity .78 over 1.2 s once playing, playbackRate **0.6**, muted, looped, playsinline), the camera (centred at 50%/51%, width `--camw`, drop shadow `0 camw*.12 camw*.08 rgba(60,52,70,.22)`), top-left words "**Not just** visuals" at left 40n/top 104n, and bottom-right words "**Real** products **that** run" at right 40n/bottom 46n (mobile: 16 px insets, top 84 px / bottom 28 px). Sky words: `--sfs`, ink, grey words `#8D8893`, tracking −0.03em, each word an inline-block.
     - Blackout layer (z 8), colour dark, opacity 0.
3. **`<section id="manifesto">`**, height **950vh**, bg dark, with a sticky 100vh stage holding the horizontal track (absolute, left 0, top 50%, flex row, items centred, gap `mfs*.32`, nowrap, font `--mfs`, tracking −0.03em, white).

---

## 5. The 12 cards

Card art (index → grid cell): 0 B-BR (lavender dawn sea), 1 A-TR (shell on lavender), 2 A-BL (harbour), 3 A-BR (beach surf), 4 B-TL (pink lighthouse), 5 B-TR (crashing wave), 6 C-TR (sailboat), 7 C-TL (shell on sand), 8 B-BL (surfer barrel), 9 A-TL (sunset lighthouse), 10 C-BL (slate sea), 11 C-BR (shallows). Cards 0–5 are the hero fan; 6–11 join later.

Each card pose is `[x, y, rotation°, scale, opacity]` (x/y = card centre in stage px). Poses:

- **Card spacing (fan and wheel):** neighbouring cards always keep a visible gap. The angular step between cards is `step(R) = 2·asin(1.05·cw / (2R))`, so the chord between two card centres is 1.05 × the card width (a small, even gap of about 5% of a card).
- **Fan (hero, cards 0–5).** Desktop: `R = 1250*W/1440`, angle `θ = (i − 2.5) × step(R)`, centre `cx = W*.55`, `cy = H*.86 + R`; x = `cx + R*sinθ − W*.02`, y = `cy − R*cosθ`, rotation θ. Mobile: `R = W*1.35`, θ = `(i − 2.5) × step(R)`, `cx = W*.5`, `cy = H*.86 + R`, y gets `+cw*.2`. Cards 6–11 wait hidden at `(W*.5, H*1.4)`.
- **Scatter** (fractions of W, H, rotation): desktop 0 `(.08,.46,−20)`, 1 `(.20,.86,−12)`, 2 `(.80,.84,14)`, 3 `(.38,1.04,−8)`, 4 `(.92,.42,16)`, 5 `(.62,1.04,9)`; cards 6–11 stay invisible. Mobile cards 0–5: `(.06,.60,−20)`, `(.45,.66,12)`, `(.94,.60,16)`, `(.22,.93,−14)`, `(.72,.96,9)`, `(.5,1.3,0)`. On screens shorter than 500 px, scatter y values below .1 are lifted by .08. No card may cover the nav or the process text.
- **Pile:** x = `W*.5 + ((i%3)−1)*cw*.08`, y = `H*.62 + (((i*7)%5)−2)*cw*.04`, rotation `±(4 + i*1.3)°` (sign alternates by index), opacity 1.
- **Wheel/arc:** 12 slots; `slot = ((i + rot) mod 12) − 5.5`; angle = slot × step(R) (the same gap rule as the fan); `R = 900*W/1440` desktop or `W*1.2` mobile; centre `(W*.5, H*.82 + R)` desktop or `(W*.5, H*.76 + R)` mobile; x = `cx + R*sin`, y = `cy − R*cos`, rotation = angle; visible only when |angle| < 62°. `rot` = −3 × (wheel progress) so the cards travel right-to-left along the arc.

**Per-card inertia:** after computing the target pose for the current scroll, each card's displayed pose moves toward it by `k = 1 − (1 − w)^(dt/16.67)` per frame with `w = .055 + (i%4)*.008` (so cards arrive one after another, softly). At scroll progress ≈ 0 the pose is applied directly (no lag during the load animation).

---

## 6. Load sequence (time-based, t in seconds from page load)

| t | What happens |
|---|---|
| 0.15–0.35 | Logo fades in (ease-out cubic) |
| 0.20 + i×0.03 → 0.42 + i×0.03 | Each nav link fades in and rises 6 px, left to right |
| 0.23–0.42 | "View Collections" button wipes open from its right edge (clip-path inset from the left, round 12n), ease-out cubic |
| 0.33–1.27 | Paper plane flies a Catmull-Rom path through (t, x% of W, y% of H): (.33, −3, 73), (.45, 4, 71), (.60, 13, 65), (.70, 22, 55), (.80, 31, 44), (.87, 32.5, 47.5), (.93, 26, 48), (1.00, 21.5, 45), (1.07, 22.5, 51.5), (1.15, 27, 52) — a climb, a small loop back — and lands at 1.27 s on the first icon slot of the headline row. Its rotation follows the direction of travel + 18°. 1.27–1.33: shrinks to 0.6 and fades out as the first pixel icon (a plane) takes its place |
| 0.53, 0.60, 0.63, 0.70, 0.80, 0.86 | Hero cards rise from below the screen (start y = H + cw*1.2, start rotation +8°) in the order card 5, 2, 0, 1, 3, 4; each takes 0.7 s with a soft back-out (overshoot 1.15) |
| 1.27 + (0.03 + j×0.07) | Pixel icons 2–7 pop in to the right of the plane icon (scale back-out over 0.32 s, fade 0.12 s). The row of 7 icons is centred on the headline line |
| 1.9 → ≈5.2 | **Icon-to-letter morph.** Every 0.22 s one more character of "Tides in Motion" appears (15 characters incl. spaces). The leftmost icon to be consumed squashes into a dark stroke (scaleY 1→.16, scaleX 1→1.25, rotate 0→−28° over the first 45% of the step, then rotates a further −62° and fades; brightness 1→0 so it reads as an ink stroke). The new letter wipes in left-to-right with clip-path over 32–90% of its step. The number of icons left is `ceil(7 × lettersLeft / 13)`. Letters and remaining icons stay as one centred group, sliding with a cubic-bezier(.25,.75,.2,1) glide every step, so the finished word ends perfectly centred. When the word completes, all icons are gone |

**Pixel icons** (9×9 SVGs, `shape-rendering:crispEdges`, each cell a 1.02 rect). Palette: k ink `#1F2430`, b harbour `#7DA3BB`, w white, p peach `#DDAD95`. Order: paper plane, scallop shell, sailboat, lighthouse, fish, wave, sun. Rows (top to bottom, `.` = empty):
- plane: `........k` `......kkb` `....kkwkb` `..kkwwkb.` `kkwwwkbb.` `..kkkbb..` `....kb...` `....k....` `.........`
- shell: `...kkk...` `..kbwbk..` `.kbwbwbk.` `kbwbwbwbk` `kwbwbwbwk` `.kbwbwbk.` `..kbbbk..` `...kkk...` `.........`
- boat: `....k....` `....kb...` `....kbb..` `...wkbbb.` `..wwkbbb.` `....k....` `kkkkkkkkk` `.kpppppk.` `..kkkkk..`
- lighthouse: `...kkk...` `..kbbbk..` `...kwk...` `...kbk...` `...kwk...` `...kbk...` `..kwwwk..` `..kbbbk..` `.kkkkkkk.`
- fish: `.........` `...kkk..k` `..kbbbkkk` `.kbwbbbbk` `kbbbbbkkk` `.kbbbbk.k` `..kkkk...` `.........` `.........`
- wave: `.........` `...kkk...` `..kbbbk..` `.kbwwbbk.` `kbw..kbbk` `kb....kbk` `bbbbbbbbb` `kkkkkkkkk` `.........`
- sun: `....p....` `.p..k..p.` `...kpk...` `..kpppk..` `pkpppppkp` `..kpppk..` `...kpk...` `.p..k..p.` `....p....`

Icon gap = 0.2 × icon size; gap between the last letter and the first icon = 1.6 × that.

---

## 7. Scroll choreography

**Smooth scrolling (desktop, fine pointer only):** wheel events are intercepted; the target scroll moves by `deltaY × 0.75` (×32 for line-mode deltas) and the page jumps there natively, while a smoothed value `sy` chases it with `sy += (ty − sy) × (1 − (1 − .06)^(dt/16.67))` (frame-rate independent, ≈0.8 s glide). If no wheel event for 250 ms, the target re-syncs to the real scroll position (keyboard, scrollbar, anchors). Touch devices use native scrolling.

Story progress `p = clamp((sy − story.top) / (story.height − H), 0, 1)`. Phases (eInOut = cubic in-out, eGlide = cubic-bezier(.25,.75,.2,1)):

| p range | Motion |
|---|---|
| 0 → ~0.06 | The hero section scrolls away 1:1. The headline fades from opacity 1 to 0 as its top moves from `navHeight + 1.9×fontSize` down to `navHeight + 0.55×fontSize`, so it disappears before it reaches the nav |
| .004 → .085 | Cards blend from fan to scatter (eInOut) |
| .05 → .075 | The process block fades in (opacity follows p). Below .05 it is hidden and its word reveal resets, so scrolling back up never overlaps the hero headline |
| > .078 | Process words reveal once (time-based): word i fades in, rises from .35em and un-blurs from 6 px over 0.55 s, starting at i×0.11 s (ease-out cubic). Sub-line 0.7–1.2 s, button 0.85–1.35 s (fade + 8 px rise) |
| .21 → .31 | All cards gather into the centre pile (eInOut); cards 8–11 fade in during this |
| .31 → .41 | Pile fans out into the wheel along the bottom (eGlide) |
| .41 → .57 | The wheel turns 3 slots, cards travelling right-to-left (eInOut) |
| .57 → .62 | Hold: the wheel rests |
| .62 → .74 | **Gated:** the sky panel may only start once the wheel has finished turning AND every card has settled (each card within 3 px / 1° of its target pose). Until then its progress target is 0; once allowed, its displayed progress chases the scroll value with the same frame-rate-independent glide (weight .09 per frame). So on a fast scroll the camera and sky wait for the card marquee to finish, then catch up smoothly. The sky panel grows from a small rounded window (desktop 17% × 20% of the stage, centred 12% above the middle; mobile 42% × 16%, 6% above) to full bleed using clip-path inset with corner radius 14 px → 0 (eInOut). The plate and video scale 1.18 → 1. The camera scales .5 → 1 with the panel. The video plays only while the panel is visible |
| when the panel is full | Sky words reveal (time-based): "Not", "just", "visuals" at 0, .12, .24 s; "Real", "products", "that", "run" at .45, .57, .69, .81 s; each 0.6 s fade + .3em rise + 6 px blur-out |
| .74 → .88 | Camera yaws from −10° to +10° (perspective 900 px) and bobs ±6n px on a 1.6 rad/s sine |
| .88 → .97 | Camera zooms into its lens: `q = ((p − .88)/.09)^1.6`, multiplied by the sky panel's own progress gate (0 until the panel is ≥ 90% grown, 1 when full), scale `1 + q²×28`, transform-origin 54% 31% (the lens). Blackout fades in over q .45 → .85. The nav switches to its dark style at p > .985 |

**Manifesto** (progress `mp` over its 950vh): the track translates from x = `W*.06` (mobile `W*.08`) to `−(trackWidth − W*.9)`, vertically centred. An item reveals once when its left edge passes `W*.86` (mobile `.92`), and only after the section is within 20% of the viewport:
- Words: each character starts at opacity 0, translateY .55em, rotate 14° (origin bottom-left) and drops into place over 0.5 s with a 35 ms stagger (ease-out cubic).
- Stickers and objects: 120 ms delay, then scale 0 → 1 with a back-out (1.15) over 0.5 s, rotating from −14° to their resting angle.

Track contents, in order:
1. Intro block (font .72em, two rows, gap .26em): row 1 "**Designing** motion", row 2 "that moves **people.**" (bold = grey `#6E7180`). Three small labels (font .24em of the line, padding .3em .6em, radius .16em, ink text, shadow `0 .12em .3em rgba(0,0,0,.35)`): "motion studio" `#EFCEBE` at top −.95em/left 0, rotated −6°; "since the tide turned" `#EBC9AE` at top −1.1em/left 3.4em, −4°; "coast to coast" `#BAD9E6` at bottom −1em/left .6em, +4°.
2. Conch shell object, 1.25em wide, −12°.
3. "**Crafting**".
4. A vertical stack: label "tidal" `#DDAD95` (−8°, with a small ink dot at its top-right corner) over the small label "and immersive" `#B0AEC6` (+6°).
5. "**animation**" "experiences."
6. Sparkle (0.34em four-point star, path `M10 0c.8 5.6 3.6 8.6 10 10-6.4 1.4-9.2 4.4-10 10-.8-5.6-3.6-8.6-10-10 6.4-1.4 9.2-4.4 10-10z`, colour `#F4E3D3`), pearl .8em.
7. "The" "ocean" "**–**" "**is**" "**a**".
8. Label "tidal" `#EFCEBE` (−8°), conch 1.05em (+10°), pearl .5em, sparkle, label "coastal" `#B0AEC6` (+3°).
9. "**and**" "**a**", label "drift" `#BAD9E6` (−10°), capsule 1.05em (−8°).
10. "atelier" "that" "brings" "brands," "stories," "**and**" "experiences" "**to**" "**life**" "**through**" "art," "design," "**and**" "technology." then a 30vw spacer.

Big labels: font .42em of the line, padding .28em .62em .3em, radius .16em. (Bold words in this list are grey `#6E7180`; the rest white.)

---

## 8. Mobile and reduced motion

- Below the mobile breakpoint the nav links hide (logo + button remain), and the alternative fan, scatter, wheel, sky-window and font sizes above apply. Check at 375×812, 320×568, 812×375, 568×320 and 768×1024: no horizontal scroll, nothing cut off, every control visible.
- `prefers-reduced-motion: reduce`: the intro jumps to its end state (full headline, cards in the fan), the sky video is not loaded, card inertia and wheel smoothing are off, and the story/manifesto sections drop their tall heights (sticky stages become normal blocks).

---

## 9. Acceptance checklist

- The hero headline builds from 7 coastal pixel icons into "Tides in Motion" and is fully formed at about 5.2 s; the paper plane's flight ends exactly on the first icon.
- The hero scrolls away as its own section; its headline is gone before it reaches the nav, and scrolling back up never shows it on top of the process text.
- Cards: fan → scatter (clear of nav and text) → pile → wheel → wheel turns right-to-left, all gliding softly with staggered inertia.
- The sky grows from a rounded centre window; the Kling clouds drift at 0.6× under a soft veil; the camera yaws, then zooms into its lens to black.
- The manifesto letters drop in and the stickers pop with a spring as the line scrolls sideways.
- All assets load from the URLs above, and only Inter is used.