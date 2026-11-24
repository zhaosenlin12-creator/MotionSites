# Bag Slots: Glass Slot-Machine Bag Reveal Story (exact recreation prompt)

Build a single-file, interactive, vertical 9:16 social-media story for a fictional bag brand, **LUNE**.

A young woman in a cropped indigo denim jacket stands against a grey studio wall. A frosted-glass panel floats across her chest, reading "L U N E". When you tap the glass, she reaches toward the camera with her hand, grabs the glass and pulls it down like a slot-machine lever. That plays from a real video clip.

The panel then becomes three slot reels of shoulder bags that spin with motion blur and stop one by one on three matching bags. Then:

1. The glass melts away and the two side bags slide out.
2. The centre bag grows over her chest.
3. The frame washes out to white and holds as a clean packshot (with swatches that recolour the bag).
4. Hard cut to a black card with the small "L U N E" wordmark.
5. Tapping it cuts her back to the start (hidden behind the black card) and she pulls again.

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Bag Slots`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Font (Google Fonts):** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the three latin woff2 faces as base64 `@font-face` rules instead of the link.
- **Variables:** `--ink:#16161a`, `--glass:rgba(255,255,255,.14)`, `--edge:rgba(255,255,255,.42)`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height, `overflow:hidden`, background `#cfd0cf`.
  - body font `"Inter","Helvetica Neue",Arial,sans-serif`, ink colour, antialiased, `user-select:none`.

## 2. Assets (all URLs exact)

1. **Her clip (Kling 4.0 reference-to-video, 5.04 s, 24 fps, 1080×1920, no audio).** It was generated with our model image as the start and the original campaign's reach-and-pull segment as the motion reference.
   - She stands with her arms down.
   - She reaches up toward the camera with her right hand (screen left) at chest height and leans in.
   - About 1.72 s: she grabs an invisible panel.
   - About 2.05 s: she pulls it down.
   - She then straightens, puts her hands behind her back, tilts her head and waits.

   `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261106_073138_ef13b890-f508-46d7-bf25-278d3144c3d5.mp4`
2. **White bag cut-out (transparent PNG, 1:1):** an original small structured baguette shoulder bag in plain white leather, with a slim front flap, a small gold ring clasp and a thin curved single strap on gold rings. Front view, no logo.
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_072459_3a7afc56-a581-4651-8e7e-756e12183786.png&w=900&q=88`

**Colours:**

| # | Name | Hex |
|---|---|---|
| 0 | Lilac | `#b9a8ef` |
| 1 | Butter | `#f2dfa8` |
| 2 | Sage | `#8cc27a` |
| 3 | Tangerine | `#f29a52` |
| 4 | Rose | `#ee88b6` |
| 5 | Ink | `#3a3a44` |
| 6 | Sky | `#9ccff0` |

**One tinted bag (`.bag`):** a relative box holding two full-size layers:

- `.t`: background `var(--c)`, masked by the bag image (`mask: var(--m) center/contain no-repeat`, with a `-webkit-` prefix too).
- The white bag `<img>`: `object-fit:contain`, `mix-blend-mode:multiply`.

This turns the one white bag into any colour while keeping its leather shading.

## 3. Story canvas

- **Story `#story`:** absolutely centred (translate -50%,-50%), overflow hidden, background `#d4d5d3`.
  - On load and resize: `w = min(innerWidth, innerHeight·9/16)`, height `w·16/9`, and `font-size w/100` px, so **1em = 1% of the story width**.
- **Canvas `#cv`:** fills the story.
- **Hidden clip `<video id="pv" muted playsinline preload="auto" crossorigin="anonymous">`:** asset 1, 2×2px, opacity 0.
- **Frame cache:**
  - On `loadeddata`: `NF = round(duration·24)`, which is 121.
  - Draw frame 0 into a 720×1280 offscreen canvas immediately and store it as a JPEG blob (quality .9).
  - Then capture every frame with `requestVideoFrameCallback` while the clip plays once: `i = round(mediaTime·24)`, JPEG quality .88.
  - Fallback without rVFC: seek through `i/24` and grab on each `seeked`.
- **Canvas drawing:**
  - The backing store is the canvas's client size × `min(devicePixelRatio, 2)`.
  - `draw()` decodes the nearest cached frame to `want` with `createImageBitmap` and draws it cover-fitted.
- **play(to, ms):** a rAF tween of the playhead `head` from its current value to `to` over `ms`, setting `want = round(head)` each frame.
- **Recorder hook:** `window.__hero = {ready, settled}`. `ready` means at least NF-2 frames are cached; `settled` means the shown frame equals the nearest-to-want frame.

## 4. Glass slot panel

- **Panel `#panel`:** absolute at left and right 6%, top 37%, height 22%, radius 2.6em, `cursor:pointer`.
  - Background `linear-gradient(160deg, rgba(255,255,255,.22), rgba(255,255,255,.06) 55%, rgba(255,255,255,.12))`.
  - `backdrop-filter: blur(1.6em) saturate(1.25) brightness(1.06)`, with a `-webkit-` prefix.
  - Box-shadows: `0 0 0 .14em var(--edge) inset`, `0 1.6em 3.4em rgba(0,0,0,.18)` and `0 .25em 0 rgba(255,255,255,.35) inset`.
  - Transition: transform .6s `cubic-bezier(.3,1.4,.5,1)`, opacity .5s, filter .5s.
- **Faint grid (`:before`):** opacity .35. Two 0.4%-wide white lines at 33.3% and 66.7% (60% alpha) and a horizontal centre line (35% alpha).
- **Wordmark `.word`:** "LUNE", centred, white, Inter 500 at 4.2em, letter-spacing .62em (with matching text-indent), soft shadow.
  - When the panel gets `.used`, it fades out and its tracking widens to 1em.
- **Reels:** at inset `6% 4%`, a three-column grid with a 4% gap, hidden until `.used`.
  - Each reel: radius 1.6em, overflow hidden, masked with `linear-gradient(transparent, #000 18%, #000 82%, transparent)` so bags fade in and out at the top and bottom.
  - Each reel holds a `.strip` of cells, each one reel tall (`--ch`, measured), with a tinted bag scaled to 128%.
- **States:**
  - `.pull`: `translateY(2.2em) rotate(-.6deg) scale(.985)`, .35s `cubic-bezier(.4,0,.2,1)`.
  - `.clear`: no background, backdrop-filter or shadow, and the grid fades out.
  - `.gone`: opacity 0, `scale(.92)`, blur .6em.
- **Hint:** "Tap the glass to spin", centred at top 61.6%, white, Inter 500 at 2.7em, letter-spacing .24em, uppercase, soft shadow. It hides on the first spin.
- **Initial reels:** Lilac, Sage, Butter.

## 5. The pull and the spin

- **spin():** only from the idle state.
  1. If `head > .5`, cut her straight to frame 0 (never play backwards).
  2. Play the clip forward from 0 to NF-1 at real speed (5.04 s).
  3. At 1.72 s add `.pull` to the panel (her hand grabs it).
  4. At 2.05 s remove `.pull` and start the reels (her pull).
- **Reels:**
  - Every pull lands three of a kind, cycling the target through Sage, Butter, Lilac, Rose, Sky, Tangerine.
  - Each reel k builds a strip: its current colour, then `14 + 6k` random colours, then the target.
  - The strip gets blur .35em and animates translateY with `cubic-bezier(.2,.55,.3,1)` over `1200 + 420k` ms, fill forwards. Keyframes: 0 → `-(dist + .18·cell)` at 90% → `-(dist - .06·cell)` at 96% → `-dist`, giving an overshoot and bounce stop.
  - The blur is removed at `900 + 420k` ms.
  - On finish, collapse the strip to the single result cell. When all three have stopped, run the jackpot.

## 6. Jackpot ending (as in the original campaign film)

All times are relative to the third reel stopping.

- **+450ms:**
  - Left reel: `translateX(-80%)` with opacity → 0.
  - Right reel: `translateX(80%)` with opacity → 0.
  - Both run 600ms with `cubic-bezier(.5,0,.75,0)`, fill forwards.
  - The panel gets `.clear`, so the glass melts away and the centre bag stays.
- **+1150ms:**
  - Create `#big`, a tinted bag box sized S = 80% of the story width, centred horizontally, with its centre at 47% of the story height.
  - Measure the centre reel's bag rectangle and animate `#big` from that position and scale (`translate(dx, dy) scale(cellW/S)`) to none over 760ms with `cubic-bezier(.55,0,.2,1)`, fill backwards.
  - The panel gets `.gone`.
- **+1700ms:** the white overlay `#white` (full story, `#fff`) animates opacity 0 → 1 over 650ms ease-in-out, fill forwards. It sits above her and below the bag, so the frame washes to white around the bag.
- **+2350ms:** the packshot state.
  - `#pack` fades in at bottom 14% (column, 3.2em gap).
  - A row of seven 5em colour swatches (gap 2.4em, white ring; the active one gets an extra ink ring; hover scale 1.14).
  - Under them, "The Lune Bag · Sage" (the active colour name) at 2.5em, letter-spacing .42em, uppercase, `#8a8a8f`.
  - Tapping a swatch recolours the big bag (.5s colour transition) and gives a little swing: rotate 4° → -2.5° → 0 around 50% 8%, 600ms.
- **End card:** reached by tapping the packshot outside the swatches, by Space, or automatically after 2.8 s idle.
  - A hard cut to `#end`: full black, with "LUNE" centred in white Inter 500 at 3.2em, letter-spacing .7em.
  - "Tap to spin again" at bottom 10%, 2.3em, letter-spacing .3em, uppercase, `#6d6d72`.
- **Restart:** from a tap on the end card, Space, or automatically after 2.6 s idle. While the card is still black:
  1. Hide the pack and big bag, cancel the white overlay and reel animations, and restore the panel.
  2. Cut her to frame 0 and wait until it is drawn.
  3. Then hide the black card, return to idle, and pull again after 350ms.

## 7. Controls and autoplay

- **Tap the glass:** spin.
- **Space:** spin, or advance from the packshot to the end card, or from the end card to a restart.
- **Autoplay:** waits until the clip is fully cached, then repeats the loop on its own, in this order:
  - Idle for 4.2 s: spin.
  - Packshot after 2.8 s: end card.
  - End card after 2.6 s: restart.
- Any pointer movement resets the idle timer.