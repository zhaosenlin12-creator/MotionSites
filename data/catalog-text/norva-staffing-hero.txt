# Prompt: NORVA night-city staffing hero

Build a single-file, scroll-driven hero for a fictional crew-staffing company, **NORVA** ("The New Standard in Staffing"). Use plain HTML, CSS and vanilla JS, with no framework and no build step. The look is a 3D isometric miniature city at night. Graphite clay buildings with warm lit windows, tiny workers in hi-vis vests and white hard hats, wind turbines and container stacks all sit on a deep slate-navy ground, joined by glowing cyan route lines. Scrolling glides the camera forward over the city to a hub building, while the headline lies back into the ground and a four-step process list takes over the bottom left.

## Media

- **Glide clip (desktop):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/65fdef53-5686-4659-8761-52d61bf1a4f7.mp4`. 1920×1080, 60 fps, 5.04 s, no audio, a keyframe every 8 frames so it seeks instantly.
  - **Content:** one continuous camera glide at a fixed isometric angle.
  - **Start:** the night city sits in the lower 60% of the frame, with empty dark ground above it for the headline.
  - **During the glide:** the buildings slide up and out of view, cyan routes stream toward a hub building, workers walk, turbines turn and steam drifts.
  - **End:** the hub building with a glowing cyan dot halo, three parallel cyan routes running in from the top left, and two cooling towers with steam on the right.
  - The motion only moves forward and eases out at the end.
- **Glide clip (≤ 900 px wide):** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9a30e5e9-9f03-4755-9bc1-7bcf1510aab3.mp4`, the same clip at 1280×720.
- **Poster:** `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/33150b94-09f7-47da-a7c9-3ae76c2dd7eb.jpg`, the clip's first frame.
- **Rule:** nothing in the city is drawn or animated in code. All scene motion comes from the clip, and the clip has no opacity transitions.

## Type and colour

- **Font:** Inter Tight (variable, self-hosted latin woff2).
  - Headline: 600 at 84u, line-height .96, tracking −.045em.
  - Body: 400 at 18u.
  - UI labels: 500/600 uppercase at 11–11.5u with .05–.06em tracking.
- **Unit:** `u = clamp(.72px, min(100vw/1440, 100vh/960), 1.5px)`.
- **Colours:**
  - night `#0f1626`
  - ink `#f4f6fa`, with 72% and 46% alphas for secondary text
  - pill grey `#2a3245`
  - lime `#c6ff2e` (dark text on it)
  - cyan `#3fd8ff` (loader mark)
  - hairlines in white at 22%

## Layout (1440×960)

- **Nav** (fixed, 58u tall, three columns):
  - left: "OUR INDUSTRIES", "OUR MISSION"
  - centre: the wordmark "NORVA" (700, 19u, .06em tracking)
  - right: a grey pill "APPLY" and a lime pill "REQUEST CREWS" (40u tall, fully rounded; they lift 1px on hover)
- **Hero copy** (fixed, centred, 92u from the top, inside a `perspective: 900u` stage):
  - "The New Standard / in Staffing"
  - three lines in 72% white: "AI driven speed. Expert curation. / We mobilize verified crews to protect your schedule and / your bottom line in high-consequence environments."
- **Scroll cue:** "SCROLL TO DISCOVER OUR PROCESS", centred 36u from the bottom, with a 1px underline.
- **Process list** (fixed, bottom left at 36u / 28u, 430u wide): four rows.
  - **Inactive row:** a 36u number cell and a 12.5u title, both at 72% white.
  - **Active row:** the number sits in a white rounded square with dark text, the title grows to 18u white, and a paragraph opens below it (`grid-template-rows: 0fr → 1fr`, .45s) with a hairline at its left.
  - **Rows:**
    - 01 "Activation, simplified": "One call starts mobilization. Craft, headcount and start date go straight to our vetted crews. No hand-offs. No escalations. Just boots on site within minutes."
    - 02 "Cleared to count": "Every worker is screened before dispatch: compliance, background, certifications and fitness for duty, so the whole crew clears the gate on day one."
    - 03 "Proven field match"
    - 04 "Seamless arrival"
- **Scene:** a light shade over the clip keeps the type readable: navy at 55% fading out by 34% from the top, and 50% fading out by 30% from the bottom.

## Scroll behaviour

- **Structure:** a 420vh track holding a sticky 100vh scene with the `<video>` (object-fit cover).
- **Progress:** `p = (scrollY − track.top) / (track.height − innerHeight)`, clamped to 0–1.
- **Clip:** target time = `p × (duration − 1/48)`. Each frame, `cur += (target − cur) × .2`. Set `currentTime` only when the video isn't already seeking and the difference is more than 1/60 s, and re-seek on `seeked`.
- **The rest of the UI is a pure function of p:**
  - **Headline block:** with `h = easeInOutQuad(p/.38)`, apply `translateY(−34h vh) rotateX(62h deg) scale(1 − .12h)` around its bottom edge, so it lies back into the city. Its opacity falls from 1 to 0 between p .10 and .24.
  - **Process list:** rises 40px and fades in between p .08 and .24. Step 01 is active below p .62, and step 02 above it.
  - **Scroll cue:** its underline drains over the first 10%, and the cue fades out between p .04 and .12.
- **Loader:** a full-screen night panel with two dotted ellipses (one wide, one circular) around the mark. The mark is six cyan squares in a ring and a lime chevron, spinning every 1.6 s on an ease. The loader fades out (.6s) 350ms after the clip's first frame loads, or after 3.5 s at most.
- **Reduced motion:** no loader spin and no transitions. The UI still follows scroll, without smoothing.
- **Recorder mode (`?rec=1`):** the loader is removed and a 6.5 s Web Animation drives p: hold 0.55 s, then a linear glide of exactly 5.04 s (one clip frame per frame at 60 fps), then hold. `window.__recTime(video, t)` scrolls to that p, updates the UI and returns the clip time.

## Phone (≤ 760px)

- **Unit:** u = 1px.
- **Nav:** the left links are hidden; the wordmark sits left and the two pills (34px) right.
- **Headline:** 96px from the top, clamp(38px, 11vw, 48px).
- **Subline:** 15px, flowing as one paragraph up to 34ch.
- **Process list:** spans the width with 18px gutters, 22px from the bottom.
- **Overflow:** no sideways scroll.

## Acceptance check (1440×960)

- **On load:** the loader spins and then fades to the night city, with the headline over the dark ground.
- **Scrolling:** the headline tilts back into the ground and disappears while the camera glides over the city, and step 01 opens at the bottom left.
- **Further on:** the cyan routes lead to the glowing hub and step 02 takes over.
- **Scrolling back:** reverses everything smoothly.
- **Content:** no real brands or logos.