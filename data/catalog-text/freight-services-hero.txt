# Prompt: KV freight services scroll hero

Build a single-file **scroll-driven freight hero** for a fictional freight group, **KV**, in plain HTML, CSS and vanilla JS, with no framework and no build step. It's a clean product-render story on a white page.

1. A teal reach-stacker lifts a navy container off a stack, turns, and lowers it onto a black semi-truck's trailer.
2. The camera pulls back and a black band rises until the truck sits on its top edge.
3. Huge light-grey "OUR SERVICES" letters slide past *behind* the truck while a dark-band strip (a headline, then five service cards) slides in from the right.

Scrolling drives everything. The scene is one sticky viewport.

## Media

- **Handling clip:** one scrubbed clip, a continuous 4.04s shot at 24fps (97 frames), muted, every 4th frame a keyframe for fast seeking.
  - 1080p: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4
  - 720p, used at 900px wide and below: https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4
  - Poster (first frame): https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg
- **Clip content:** pure white background with a flat near-black ground band (#111). Its top edge sits at 82.9% of the frame height until about 3.1s.
  - The stacker lifts, turns toward camera and lowers the container onto the arriving truck.
  - The spreader releases and leaves top-left.
  - The camera pulls back, and by 3.75s the band edge is at 44.8%, with the truck's wheels on it. The rig spans about 16–66% of the frame width.
  - The last ~0.3s holds.
- **Rule:** the vehicles are never drawn or moved in code; all their motion is in the clip. No opacity transitions on the video. It is never played, only scrubbed.

## Type and colour

- **Anton** for the big caps (headline, card titles, giant letters).
- **Archivo** (variable, 400–600) for body, nav and pill.
- **JetBrains Mono** 400 for the speed readout.
- Self-host latin woff2.
- **Colours:** white #fff, ink and band #111, cobalt #2f63ff, giant letters #e9e9e9.
- **Unit:** u = min(100vw/1440, 100vh/960).

## Structure

- **Track:** `.track` (white), whose height is set by JS to (1 + A + B) × viewport.
  - A = 2.4 viewports for the clip.
  - B = (strip width + 0.45 × vw) / vw × 1.1 viewports for the services strip.
- **Nav:** absolute at the top of the track, so it scrolls away.
  - Left: "KV" (Archivo 600, 30u, tracking −.06em).
  - Right: "→ Menu", "Follow", and an outline pill "Work with us" (Archivo 500, 10u, uppercase, tracking .1em).
- **Scene:** `.scene` is sticky at top:0, 100vh (100lvh), overflow hidden. Its background is white above and #111 below a line placed inside the clip, which only matters where the clip doesn't cover the screen.
- **Layers, bottom to top:**
  1. **The `<video>`**, absolutely sized by JS.
     - Wide screens: cover (scale = max(vw/1920, vh/1080), centred).
     - Portrait or narrow screens (below 768px, or vw ≤ vh): width 155vw, horizontally positioned so 40% of the frame sits at mid-screen, and vertically so the final band edge lands at 36% of the viewport.
  2. **Giant letters:** "OUR SERVICES" in Anton at 330u, line-height .8, #e9e9e9, nowrap. Its bottom sits on the final band edge (JS writes `--edge-px` = clip top + 0.448 × clip height). It has **`mix-blend-mode: darken`**, so it only shows where the clip is white. The truck and container, whose silver tops out around #e5, always win, so the letters read as behind the truck. Phones: 180u.
  3. **Speed readout:** top-left (26u, 52u), "NN KM/H" in mono at 10.5u. It shows the smoothed scroll speed (|Δy|/Δt ÷ 32, capped at 99, two digits) and appears once the truck has settled.
  4. **Band:** from `--edge-px` to the bottom, holding the horizontal strip and the "Our services" outline pill. The pill sits centred 36u from the bottom; once the truck settles it fades and rises 24px into place.

## The strip (dark band, slides left)

- **Placement:** a flex row, top 76u, gap 120u, white text.
- **Lead block** (gap 64u):
  - Headline "EVERYTHING YOUR / FREIGHT NEEDS. / UNDER ONE GROUP." in Anton 64u, line-height .98. The third line is cobalt.
  - Beside it, a 250u column of two small paragraphs (Archivo 12u, white at 62%):
    - "From air to sea, from customs clearance to the last mile, we bring decades of practice to every freight discipline."
    - "One integrated network means one partner, one point of contact and full visibility from origin to destination."
- **Five cards**, each 270u wide with 30u side padding and a 1px divider (white at 12%) on the left; the first has no divider. Each has a 38u white line icon, a two-line Anton title at 26u, and Archivo body at 12.4u:
  - **Air freight** (plane): "Express, priority and deferred options across global lanes, booked and tracked end to end."
  - **Ocean freight** (ship): "FCL and LCL sailings on every major trade lane, with carrier choice based on cost and transit time."
  - **Customs brokerage** (document with check): "Licensed in-house brokers for classification, duties and inspections, so goods clear first time."
  - **Warehousing and 3PL** (warehouse): "Bonded and general storage, pick and pack, and distribution that plugs straight into transport."
  - **Project cargo** (crane hook and load): "Oversized and heavy-lift moves, engineered, permitted and escorted from factory to foundation."
- **Card reveal:** title and body use a background-clip:text gradient: white up to (s − 34%), cobalt at (s − 6%), transparent at (s + 26%). Here s = clamp((0.98 − cardLeft/vw) / 0.3, −0.4, 1.6) × 100%, so each card's text sweeps in from blue to white as it travels in from the right.

## Scroll mapping (JS, one rAF loop)

- **Clip time:** q = clamp(scrollY / (A·vh)), and target time = q × (duration − 1/48). Ease toward it each frame (cur += (target − cur) × 0.2). Seek only when the video isn't already seeking and the difference is more than 1/60s, and re-seek on `seeked`.
- **Settled flag:** when q ≥ 0.94, set `--ph = 1`. This shows the readout and the pill.
- **Strip:** r = clamp((scrollY − A·vh) / (B·vh)).
  - Strip translateX = vw − r × (stripWidth + 0.45·vw).
  - Giant letters translateX = vw − r × (lettersWidth + vw).
- **Recorder mode (`?rec=1`):** an 11s Web Animation drives progress (hold to 4%, ease cubic-bezier(.4,.05,.55,.95) to 96%, then hold). `window.__recTime(video, t)` scrolls to that progress, updates the readout from the scripted speed, and returns the clip time, so a frame-by-frame recorder is deterministic.

## Phones (below 768px, or any portrait screen)

- u = min(100vw/430, 1.4px). The clip is framed as above, with white above and black below it.
- **Strip:** top 44u, gap 56u, 22px left padding. The lead block stacks the headline (46u) over the paragraphs (300u wide, 13u).
- **Cards:** 250u wide, titles 26u, body 13u.
- **Readout:** 11px at (20px, 22px). The nav hides "Follow".
- **Overflow:** no sideways scroll.

## Acceptance check (1440×960)

- **On load:** the stacker holds the navy container over the stack, under the KV nav.
- **Handling:** scrolling lifts the container, turns the stacker, loads the truck, and pulls back until the truck sits on the black band.
- **Services:** "OUR SERVICES" then slides past behind the truck, with no letters showing through the container or cab. The headline enters from the right, followed by the five cards sweeping from blue to white. The KM/H number follows scroll speed.
- **Scrubbing:** scrolling back reverses everything.
- **Content:** no real brands or logos.