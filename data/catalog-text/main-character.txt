# Main Character Mode: Interactive Life-Sim Social Post (exact recreation prompt)

Build a single-file, interactive 4:5 social-media post in the style of a life-simulation game. A stylish young woman sits on an invisible chair on a bright green hill under a clear blue sky. A green rotating crystal gem floats above her head, and cream pill-shaped action bubbles fan out around her like a game pie menu: "Gossip", "Flirt", "Change Outfit", "Ask About Mood", "Talk About Pet", "More Choices…".

The woman subtly comes alive in a looping video. Each bubble triggers its own effect:

- floating hearts
- a speech bubble with gibberish
- a sparkle-swirl outfit change
- a mood panel
- a thought bubble
- a second page of choices

Use plain HTML, CSS and vanilla JS in one file, with no libraries. Every value below is exact. Reproduce every string, number, timing and URL as written.

---

## 1. Page basics

- `<html lang="en">`, title `Main Character Mode`, viewport `width=device-width,initial-scale=1`, charset utf-8.
- **Font (Google Fonts):** `https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap`, with preconnects to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin). The standalone version embeds the three latin woff2 faces (Nunito 700/800/900) as base64 `@font-face` rules instead of the link.
- **CSS variables:** `--navy:#1f3f8f`, `--pill1:#fffaf4`, `--pill2:#f3e9de`, `--sky:#3f8fd8`.
- **Reset and base:**
  - Universal `box-sizing:border-box;margin:0;padding:0`.
  - `html,body` fill the height with `overflow:hidden` and background `#3d86cf`.
  - body font `"Nunito","Trebuchet MS",system-ui,sans-serif`, antialiased, `user-select:none`.

## 2. Assets (all URLs exact)

1. **Idle loop video (Kling 4.0, 5.04 s, 24 fps, 1288×1608, 4:5, no audio):** a static camera; she breathes, slowly turns her head to the camera with a slight smile, then turns back to look off to the side; a breeze ripples the grass and her curls. The first frame equals the last frame, so it loops seamlessly.
   `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261106_062821_b3d651fe-7fbe-4e60-b4f5-77b953e1d1ce.mp4`
2. **Scene still and poster (GPT Image 2.5, 1792×2240, 4:5):** a bright gradient blue sky with fine film grain and a lush green grass hill sloping down from the left. A young woman with short dark curly hair and gold hoops sits on an invisible chair, one knee raised, hands on the knee, looking off to her right. She wears an oversized pastel-yellow and white striped short-sleeve shirt, wide-leg cream trousers and plain white chunky sneakers. Two patches of red flowers sit in the grass, and a long soft shadow falls to the right.
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_062711_9bf7546c-1db2-4093-97d4-0e32ea8d2abd.png&w=1800&q=86`
3. **Second outfit still (same frame, pixel-aligned):** a cropped cobalt-blue bomber jacket over a white tee, baggy light-wash jeans and chunky red sneakers.
   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_062819_17105efe-2915-4316-bf1a-e0df5aaf09f5.png&w=1800&q=86`
4. **Icon sticker sheet (transparent PNG, glossy cartoon icons, treated as a 1300×735 frame).** Eight icons in a 4×2 grid:
   - lips at (185,225)
   - pink heart at (492,225)
   - blue cap at (795,225)
   - two speech bubbles ("chat") at (1115,225)
   - white puppy ("dog") at (175,500)
   - laughing face ("laugh") at (495,500)
   - gold four-point star at (797,505)
   - purple music note at (1102,500)

   `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261106_062315_19b00fc8-cf66-4329-9c8f-9a6b05569d1a.png&w=1300&q=90`

**Icon sprite helper `icon(el,key)`:** cell size c=210. Set the background-image to the sheet, `background-size: (1300/c*100)% (735/c*100)%`, and `background-position: ((cx-c/2)/(1300-c)*100)% ((cy-c/2)/(735-c)*100)%`.

## 3. Layout

- **Backdrop:** a fixed `.backdrop` at inset -8% shows the poster image `center/cover`, with `filter: blur(40px) saturate(1.1)` and `scale(1.05)`.
- **Card `#scene`:** absolutely centred (translate -50%,-50%), overflow hidden, shadow `0 30px 80px rgba(10,40,80,.35)`.
  - **Sizing (JS, on load and on resize):** `w = min(innerWidth, innerHeight*.8)`, `h = w*1.25`, and `font-size = w/100` px, so **1em = 1% of the card width**. Everything inside uses card % and em.
  - CSS variable `--hx: 51.6%` (her head's x).
- **Stacking order inside the card:**
  1. `<video id="vid" autoplay muted loop playsinline preload="auto">` (asset 1, with asset 2 as its poster), absolute inset 0, `object-fit:cover`.
  2. `<img id="still">` (asset 3), the same box, `visibility:hidden` until the outfit changes.
  3. **Grain overlay:** inset 0, opacity .22, `mix-blend-mode:overlay`. A 220×220 SVG data-URI fractalNoise (baseFrequency .9, 2 octaves, stitched) mapped to mid-grey at alpha .9, tiled.
  4. **Hit area `#hit`** (her body): left 33%, top 30%, 30% × 59%, `cursor:pointer`, radius 40%.
  5. Gem `#gem`.
  6. Menu `#menu` (absolute inset 0, pointer-events none; pills re-enable them).
  7. Effects layer `#fx` (inset 0, no pointer events).
  8. Action queue `#queue`.
  9. Mood panel `#mood`.
  10. Hint pill `.hint`.

## 4. Gem (rotating crystal)

- **Element:** `#gem` at left `var(--hx)`, top 20.4%, 8em × 17em, margin `-8.5em 0 0 -4em`, `cursor:pointer`, `filter: drop-shadow(0 .5em 1.2em rgba(40,160,40,.35))`.
- **SVG:** viewBox `-50 -110 100 220`, redrawn every frame as a **square bipyramid** spinning about its vertical axis.
  - **Vertices:** four equator vertices at angle `θ + k·90°` with x = `50·sin(a)`. The top apex is at y = -100 and the bottom apex at y = +100.
  - **Visible faces:** for each pair of adjacent vertices, the mid-angle is `θ + k·90° + 45°`. The face is visible when `cos(mid) > 0`, drawn back to front by that value. Light is `max(0, cos(mid - .7))`.
  - **Top triangle:** `(0,-100) (ax,0) (bx,0)`, fill `hsl(120+hue, 70%, 48+lit·30 %)`, stroke `hsl(120+hue,80%,80%)` .6 at opacity .5.
  - **Bottom triangle:** `(0,100) (ax,0) (bx,0)`, fill `hsl(120+hue, 72%, 30+lit·24 %)`, stroke `hsl(120+hue,80%,70%)` at opacity .4.
  - **Behind the gem:** a radial glow ellipse (`#d8ffc8` at .9 → `#7be05a` at 0) with rx `46+boost·14`, ry `70+boost·20`, opacity `.35+boost·.5`.
  - **On top:** a white highlight sliver `M-6 -70 L0 -96 L3 -60 Z` at opacity .45.
- **Per frame:**
  - `θ += dt·.0012·speed`.
  - `boost` decays by dt/2200 to 0; `hue *= .9993^dt` (eases back to green).
  - Transform: `translate3d(sx·-.6em, sin(now/700)·.45 + sy·-.4 em, 0)`, a bob plus cursor parallax.
- **Interaction:** hover sets speed 4 (otherwise 1); clicking sets a random hue between 0 and -160 and boost 1.

## 5. Pie menu bubbles

- **Pill style:**
  - Absolute, flex, height 2.3em, padding `0 1.5em 0 2.5em`, radius 2em, no wrapping.
  - Background `linear-gradient(180deg, #fffaf4, #f3e9de)`; text navy, Nunito 800 at 1.9em.
  - Box-shadows: `0 .12em 0 rgba(255,255,255,.9) inset`, `0 -.12em .2em rgba(160,130,100,.18) inset`, `0 .35em .9em rgba(20,50,110,.28)` and `0 0 0 .06em rgba(120,140,190,.25)`.
- **Pill icon:** a 2.3em square sprite overlapping the left end (left -.6em, vertically centred). Pills without an icon use 1.4em left padding.
- **Open/close animation:**
  - Closed: `translate(-50%,-50%) scale(0)`. Open (`#menu.open`): `scale(1)`.
  - Transition `transform .45s cubic-bezier(.3,1.6,.5,1)`, staggered 45ms per pill when opening and 30ms when closing.
- **Hover:** background `linear-gradient(180deg, #fff, #e6f1ff)`, scale 1.08, and the icon rotates -12deg and scales 1.15.
- **Press:** a .35s scale dip to .9.
- **Page 1** (pill centres in card %):
  - Gossip (lips) 33.9/33.5
  - Flirt (heart) 69.1/33.5
  - Change Outfit (cap) 29.8/40.5
  - Ask About Mood (chat) 74.1/40.5
  - Talk About Pet (dog) 26.1/47.5
  - More Choices… (no icon) 77/47.5
- **Page 2:**
  - Tell a Joke (laugh) 33.9/33.5
  - Compliment (star) 69.1/33.5
  - Dance Together (note) 29.8/40.5
  - Share a Secret (lips) 74.1/40.5
  - Go Back… (no icon) 77/47.5
- **Menu parallax:** the menu layer follows `translate3d(sx·-.5em, sy·-.3em, 0)`, where sx and sy are the pointer offsets from the viewport centre (-.5….5), eased 5% per frame.
- **Hint:** a pill "Pick an action ✦" at bottom 3.4em, centred, 1.85em Nunito 800, background `rgba(255,250,244,.88)`. Its opacity is 1 while the menu is open and 0 while it is closed (.5s).
- **Clicking her (`#hit`)** toggles the menu (ignored while an action runs).

## 6. Choosing an action

- **More Choices / Go Back:** switch page, close the menu, and reopen it after 320ms with the new pills.
- **Any other action:**
  1. Mark busy and close the menu after 180ms.
  2. Run the effect, which returns its duration in ms.
  3. Push a queue icon.
  4. After duration + 250ms, clear busy and reopen the menu.
- **Action queue** (top-left, at left and top 3.5em; flex with a 1.4em gap):
  - Each item is an 8em circle (cream gradient, soft shadow) holding the action's icon at 5.6em.
  - A 4px green `#4cc93a` progress ring (SVG r=29 inside a 66 viewBox, rotated -90°) fills over the action's duration.
  - Items pop in (scale 0→1, .4s spring) and pop out when done.
- **Effects:**
  - **Gossip (2600):** a white speech bubble above her right shoulder (left 58%, top 27.5%, anchored bottom-centre, 2.2em Nunito 900, radius 1.4em, tail at 28%). It springs in from scale 0 and shows one random gibberish line from: "Vobba zim, frenna lo!", "Ooh! Shaba kreepo…", "Mibbli doo, nash nash!", "Zubb zubb… wahee!", "Fennu? Ka-blibbo!", followed by a lips icon (2.2em). It stays for 2.4 s.
  - **Flirt (2600):** nine heart icons (5em) spawn every 160ms around her head (x = 51.6% ± 4%, y 33%). Each floats over 2.2–2.8 s: from `scale(.2)`, to `(±6em, -9em) scale(1)` at 30%, to `(±11em, -30em) scale(.7)` with opacity 0, with random tilts. The gem's hue goes to -110 (gold) and boost to 1.
  - **Change Outfit (1700):**
    - A sparkle spin column centred on her (top 30%, 34em wide, 60% tall).
    - A blurred white-cyan radial "beam" scales vertically 0 → 1 (at 35%) → 1 (at 60%) → 0 over 1.5 s.
    - 44 glowing dots (2.4em radial white→`#bff3ff`) each orbit a helix: random phase, radius 5–11em that narrows at the ends, three turns, rising 40% over 1.5 s, scale `.7+cos(angle)·.5`.
    - At 620ms the outfit toggles: the second-outfit still becomes visible, or hidden on the next change.
  - **Ask About Mood (2200):**
    - The mood panel slides in from the right (top and right 3.5em, 34em wide, padding 2em 2.2em, radius 2.6em, cream gradient). Contents:
      - "MOOD" label at 1.8em, uppercase, .7 opacity.
      - "Happy" at 3em Nunito 900.
      - A 1.6em bar filling to 78% with a green gradient (`#7ad14a` → `#36b524`) over 1.2 s.
      - A list: "Feeling the sunshine +2", "Great outfit +1", "Good conversation +1" (values in `#2f9a20`).
    - It auto-hides after 3.8 s.
    - A speech bubble shows a chat icon and "Pretty good!" for 2 s.
  - **Talk About Pet (2600):** a thought bubble (round dots instead of a tail) with dog and heart icons, for 2.4 s.
  - **Tell a Joke (2200):** six laughing-face floaters and the bubble "Ha! Ha! Ha!".
  - **Compliment (2400):** eight star floaters (spread 12%), the mood panel as "Very Happy" with the bar at 92%, and gem boost.
  - **Dance Together (2600):** ten music-note floaters (spread 14%).
  - **Share a Secret (2200):** the bubble "Psst…" with a lips icon.