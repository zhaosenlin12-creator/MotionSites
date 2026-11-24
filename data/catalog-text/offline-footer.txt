# Prompt: "offline" power-button footer

Build a single-file **website footer** for a fictional digital-wellbeing product, **offline** ("Everything you need to know before you finally log off"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. The footer is one full-bleed cinematic scene: a small beige vintage all-in-one computer (generic, no brand logo) on a grassy hill under a blue sky. The wordmark's "o" is a power button. Clicking it takes the scene offline: the sky turns to night, the CRT collapses to a point, and that last point of light flies up into the power-o.

## Media

- **Scene clip, 1080p:** https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/abdab52e-bb1b-477d-ae7c-26c5f8915433.mp4 (1920×1080, 60 fps, 5.0 s, no audio)
- **Scene clip, 720p, for screens ≤ 900 px:** https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/15017aa7-135b-471f-a8a1-42a208bc61b2.mp4
- **Poster:** https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/af6deff1-d678-4dc6-ae24-2880b16cdb20.jpg (the clip's first frame: day, screen off)
- **Fonts:**
  - Instrument Serif 400 (wordmark and column headings), self-hosted latin woff2: https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2
  - Inter 400/500 (body and links), latin variable woff2: https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2

### Clip timeline

The clip is one locked-off shot:

| Time (s) | What happens |
|---|---|
| 0 – 1.17 | Day, CRT off (glossy black screen) |
| 1.2 – 1.6 | Switch-on: a thin white line expands into white static, then TV colour bars with a purple-pink glow |
| 1.9 – 2.7 | Steady colour bars, dandelion seeds drifting |
| 2.7 – 4.4 | The sky turns from day through a warm dusk to deep navy night with stars; the light on the computer and grass dims |
| 4.46 – 4.62 | The picture collapses to a thin line, then to one point of light at the screen's centre |
| 4.62 – 5.0 | Night: dark screen, a faint point, stars, seeds |

Nothing in the scene is drawn or animated in code. Every scene change comes from the clip, which never plays in reverse and never crossfades.

## Layout (desktop; 1 u = 1/1902 of the viewport width)

- **Footer:** 100svh tall, `overflow:hidden`. The video and poster cover it (`object-fit:cover`, `object-position: center bottom`).
- **Top tint:** a soft dark wash on the top 38 %.
- **Grid:** top-left at 105u / 78u, with columns of 528u, 404u and 404u, then the rest. White text.
- **Brand column:**
  - **Wordmark** "offline", Instrument Serif 58u. The **o is an inline SVG power symbol** (viewBox 0 0 50 62):
    - an open circle `M14.2 22.6 A19 19 0 1 0 35.8 22.6`
    - a vertical tick `M25 6.5 V33`
    - stroke 4.6, round caps, `currentColor`, matched to the serif's weight
    - plus a blurred white halo ring whose opacity is driven by a `--lit` variable
  - **Tagline:** 19.5u Inter at 1.5 line height, max 300u wide.
  - **Copyright:** "© 2026 OFFLINE, Inc. All rights reserved." at 17u, 34u below the tagline.
- **Link columns:** headings in Instrument Serif 35u, 40u above the first link. Links in Inter 19.5u with 19u gaps:
  - **Platform:** Manifesto, How it works, Pricing, FAQ
  - **About:** About, Careers, Privacy Policy, Cookie Policy
  - **Social Media:** LinkedIn, Instagram, TikTok

## Interaction

### Arrival (online)

- When the footer is 35 % in view, the text rises in: 10u lift, 0.9 s, staggered 60 ms.
- The clip plays from 0.6 s, shows the switch-on, then pauses on the colour bars at 2.3 s.

### Online idle (code overlay on a canvas over the video)

- **Scanline:** a soft white scanline band (≈52 px tall, 10 % white) sweeps down the screen glass every ~1.8 s, with a faint flicker. It's clipped to the screen rectangle, which is (806, 505)–(1077, 724) in the clip's 1920×1080 frame, mapped through the same cover transform as the video.
- **Glints:** ~10 small four-point star glints twinkle in the sky. Their number grows to ~22 as the clip's sky reaches night.

### The wordmark is a power button

- It's a `<button>` with `cursor:pointer` and aria-pressed.
- **Hover:** a soft white `drop-shadow` glow on the power-o.
- **Press:** the o scales to 0.94.

### Click while online → offline

- The clip plays from 2.3 s to the end at 1×: dusk, then night, then the CRT collapse.
- At clip time 4.72 s a **glowing dot** leaves the screen's last point of light, at (945, 594) in the clip frame.
  - It flies for 0.78 s on a curved, eased (cubic in-out) quadratic path up and left into the centre of the power-o.
  - Size: a white core with a 6× radial bloom halo, growing and then shrinking along the way.
- **Landing:** the power-o's halo ring glows (`--lit` from 0.9 to 0 over 0.9 s), as if the light went into the button.
- The clip holds on its night frame.

### Click while offline → back online

- Cut back to 0.6 s and replay the switch-on to the 2.3 s colour-bar idle.
- Clicks during the switch-off are ignored.

### Links

- On hover, a 1.6u underline wipes in from the left over 0.32 s and wipes out to the right.

## Phone (≤ 760 px)

- **Text:** the text block sits on top in two columns, with the brand spanning both.
- **Scene:** the clip sits at the bottom at 170 % width (16:9), with its top edge masked into the sky.
- **Sky:** the sky behind the text is a canvas. It paints the clip's top rows, blurred by 18 px and stretched, every frame, so it follows the clip from day to night.
- **Spacing:** the footer's bottom padding is about 80 % of the clip's height.

## Reduced motion

- No video and no entrance; the poster and text show statically.

## Acceptance check (1440×960)

1. On load, the CRT switches on (line, static, colour bars) on a day sky, and the scanline shimmer runs.
2. Click the power-o: the sky goes to night, the CRT collapses, and a glowing dot flies into the o, which glows.
3. Click again: the scene comes back online.
4. Link hovers underline.
5. No brand logos anywhere.