# HAVEN — spatial (visionOS-style) smart-home dashboard floating in a living room

Build a single-file, fully responsive, highly interactive **spatial smart-home dashboard**. A floating frosted-glass window, a pill tab bar and a slim icon rail hover in front of a **full-screen, looping Kling 4 video of a sunlit Scandinavian living room**. The camera in the video glides around the sofa and returns to its start.

The window holds:
- a live camera tile;
- a big mint **thermostat dial** you can drag;
- a "Morning" scene pill;
- a robot-vacuum card;
- a mint-gradient **Ceiling lights** card;
- a **brightness slider that really dims the room behind the glass**;
- a music player.

Everything tilts in 3D with the mouse. Accent colours are mint, teal and soft lime. All names are invented. Match every detail below.

---

## 1. Global

- **Font:** **Manrope** from Google Fonts (400–700), falling back to system-ui.
- **Tokens:**
  - mint gradient `--grad: linear-gradient(135deg, #e3fbb0 0%, #8ef0d6 45%, #3cc4b4 100%)`
  - `--m2: #7ee8d0`, `--m3: #3cc4b4`
  - window glass `rgba(86,90,82,.38)`
  - inner cards `rgba(255,255,255,.075)` with a 1 px `rgba(255,255,255,.14)` border
  - text white, muted `rgba(255,255,255,.62)`
- **Easings:**
  - `--out: cubic-bezier(.16,1,.3,1)`
  - `--ease: cubic-bezier(.65,0,.35,1)`
  - `--spring: cubic-bezier(.34,1.56,.64,1)`
- **Fluid scale:** `html { font-size: min(calc(100vw/144), calc(100vh/81)) }`, so 1rem = 10 px on a 1440×810 artboard. Size everything in rem.
- **Desktop:** the body is 100vh with overflow hidden.
- **Glass material** (`.glass`):
  - `backdrop-filter: blur(28px) saturate(1.35)`
  - border `1px rgba(255,255,255,.22)`
  - inset top highlight `inset 0 1px 0 rgba(255,255,255,.28)`
  - soft drop shadow `0 3rem 8rem -3rem rgba(30,28,20,.45)`

## 2. Assets (use exactly these)

- **Room video.** A 10 s Kling 4 loop: morning sun and dust motes, swaying trees and curtains, a camera glide that returns to its start framing. Use it full-bleed (object-fit cover) **and** reuse it inside the live-camera tile:
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261118_005751_ccbea518-0364-45d9-8951-be0c8e36bd0a.mp4`
- **Room still:** the poster for both videos.
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005657_e8371ddf-b918-4539-b7c2-07cd5010e4e6.png&w=1920&q=85`
- **Camera feeds for the other rooms** (high-corner, CCTV-style wide shots):
  - Kitchen: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005653_23f1bd6a-f11f-492b-99af-c726f290bb4e.png&w=1100&q=85`
  - Bathroom: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005653_c18141e3-13e9-4ca0-b182-094207ea14b2.png&w=1100&q=85`
  - Bedroom: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005652_b7c02446-6122-4a60-bf93-2f968214b55e.png&w=1100&q=85`
- **Album art:**
  - "Slow Bloom" by Nami: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005653_8b53b6f2-a379-434c-9c37-3766a3c6ae3f.png&w=400&q=85`
  - "Sea Glass" by Oda Marin: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005653_bd9be7e9-7cc8-4336-9688-ba74f5a13e75.png&w=400&q=85`
  - "Fern Light" by Juniper: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261118_005653_60c08159-38f9-4ed3-a13d-e9c65cee4f7b.png&w=400&q=85`
- Everything else is inline SVG or CSS. The video loops natively; never crossfade it.

## 3. Scene layers

- **`#room`:** fixed, inset −3%. It holds the still, the video, and three overlays:
  - a soft-light sun glow `radial-gradient(40% 50% at 18% 30%, rgba(255,236,190,.35), transparent 70%)` whose opacity follows the brightness;
  - an edge vignette;
  - a **dim layer** `#1b1a14` whose opacity is `(100 − brightness)/100 × .28`, or .32 when the lights are off, transitioning over 1 s.
- **Mouse parallax** (lerp .05):
  - the room moves `scale(1.04) translate(sx·18px, sy·12px)`;
  - the UI layer (`perspective: 1600px` on the stage) rotates `rotateY(sx·4deg) rotateX(−sy·3deg)` and translates `(sx·−14px, sy·−10px)`.

## 4. Tab bar (top centre)

- **Bar:** a glass pill 6rem tall with .6rem padding, centred at top 3.2rem.
- **Tabs:** 4.8rem pills with a line icon and a label (1.45rem, 600):
  - **Favorites** (heart)
  - **Living room** (sofa)
  - **Kitchen** (fork and knife)
  - **Bathroom** (tub)
  - **Bedroom** (bed)
  - then a 4.8rem round "+" that rotates 90° on hover.
- **Active tab:** a white indicator pill **slides and springs** under it (left and width transitions, .7s `--spring`), and the active label turns `#1b1d19`.
- **Switching room:**
  - the camera tile wipes down with a dark `clip-path` curtain, swaps feed and wipes away;
  - the card titles roll out and in (staggered);
  - all cards do a small dip;
  - the dial re-animates to the room's value;
  - a toast appears.
- **Room data:**

  | Room | Dial | Scene | Small card | Gradient card |
  |---|---|---|---|---|
  | Living room | Thermostat 22° | Morning | Robot vacuum (Docked / Cleaning · x% done) | Ceiling lights |
  | Kitchen | Oven 180° (range 50–250) | Breakfast | Dishwasher (Idle / Washing) | Pendant lights |
  | Bathroom | Floor heat 26° | Spa | Towel warmer (Off / Warming) | Mirror light |
  | Bedroom | Thermostat 19° | Wind down | Air purifier (Standby / Purifying) | Bedside lamps |

## 5. Icon rail (left)

- A glass pill, 6.4rem wide, at left 11.4rem and top 27.4rem.
- Five 4.8rem buttons: Home, Lighting (active), Climate, Security, Settings.
- The active one is white with dark strokes.
- Hover scales 1.08 and shows a small glass tooltip that slides out to the right.

## 6. Window

- **Size:** left 20.4rem, top 11.2rem, 111.8 × 63.4rem, radius 4.2rem, glass.
- **Inner cards:** radius 2.8rem, positioned absolutely.

### 6.1 Live camera

- Position: 2.2rem, 1.8rem; 53.6 × 27rem.
- **Living room feed:** the room video scaled 1.35 from 62% 45%, with a slight contrast boost.
- **Overlays:**
  - CRT scanlines (repeating 1 px lines, overlay blend);
  - a top and bottom gradient;
  - a "● Live" glass chip whose mint dot pulses;
  - a "REC · 09:41:07" clock that ticks every second, top right;
  - "Living room / Live camera" at the bottom left.
- **Other rooms:** stills with a slow Ken Burns zoom.
- **Click:** the tile expands to fill the whole window (.8 s `--ease`); click again to dock it.

### 6.2 Thermostat dial

- **Card:** 57.8rem, 1.8rem; 51.8 × 40.2rem.
- **Header:** "Thermostat · 22°" (2.6rem, 600). Below it a status chip with a glowing dot: orange "Heating", mint "Cooling", grey "Off", or "Preheating" in the kitchen. A round settings gear rotates 120° on hover.
- **Ring:** an SVG 260-unit viewBox, 26rem, radius 104, stroke 22, round caps. It sweeps **270° from −135° to +135°** with the gap at the bottom.
  - a dark track `rgba(40,42,38,.45)`;
  - the value arc in a mint-teal-lime gradient, plus a blurred glow copy;
  - 31 tick marks inside the ring (every 5th one longer) that light up white up to the value;
  - a white knob at the arc end.
- **Dragging** anywhere on the ring sets the value from the pointer angle (pointer capture): 16–30° normally, 50–250° for the oven. On release a toast says "Thermostat set to 26°".
- **Centre:** a 6.4rem dark power button. When on, it has a mint halo. Off greys out the ring.
- **Below:** a big "22°" (4.6rem) and "Target temperature".
- **Value changes** animate with an ease-out (700 ms).

### 6.3 Scene pill

- Position: 2.2rem, 30.6rem; 26.2 × 7rem; fully rounded.
- Contents: a 5rem mint-gradient circle with a sun icon, "Morning / Scene", and a round play button.
- **Play:**
  - a lime ripple expands from the click;
  - the sun icon spins for 2.4 s;
  - the lights turn on and brightness eases to **86%**;
  - the thermostat goes to 22°;
  - music starts;
  - a toast reads "Morning scene · lights 86%, 22°, music on".

### 6.4 Robot vacuum

- Position: 2.2rem, 39.4rem; 26.2 × 22.2rem.
- Contents: two round icons (the robot, and a light home icon), a status at the top right ("Docked"), the title and a sub-line at the bottom, and a toggle.
- **Toggle on:**
  - the robot icon spins;
  - a mint progress bar fills 2% per second;
  - the status shows the percentage, with the line "Cleaning · x% done";
  - at 100% it docks itself.

### 6.5 Ceiling lights

- Position: 30.2rem, 30.6rem; 25.6 × 22.4rem.
- **On:** a **mint gradient card** with dark-teal text, a bulb icon with a warm glow, "On" at the top right, "Ceiling lights / On · 72%" and a toggle. The glow strength follows the brightness.
- **Off:** the card becomes plain glass, the slider is disabled (greyscale) and the room darkens.

### 6.6 Brightness slider

- Position: 30.2rem, 54.8rem; 25.6 × 7rem.
- A rounded pill with a mint-gradient fill whose width is the value (minimum 18% visual), a sun icon (rotates while dragging) and "72%".
- **Drag** to set 1–100% (pointer capture). **The real room behind dims and brightens live.**

### 6.7 Music player

- Position: 57.8rem, 43.6rem; 51.8 × 18.2rem.
- **Left:** a 15rem rounded album image.
- **Right:**
  - a "Now Playing" glass chip with a mint music-note badge and a tiny 3-bar equaliser, which pauses when the music is paused;
  - the time "1:12 / 3:24";
  - the title (2.2rem) and artist;
  - a thin clickable progress bar;
  - prev, a round play/pause, and next.
- **Behaviour:**
  - the time ticks every second, and the next track starts automatically at the end;
  - next and prev wipe in the new album art with `clip-path`, and the titles roll;
  - prev restarts the track if more than 5 s in.

## 7. Toast and cursor

- **Toast:** a glass pill at the bottom centre with a mint ✓ circle. It slides up (.7 s `--out`) and hides after 2.4 s.
- **`?rec` mode:** a 52 px frosted white cursor circle that is mint-tinted on hover and pressed. The videos are stepped by the page clock.

## 8. Intro

1. The room un-blurs.
2. The window flies forward from `translateZ(-260px) translateY(6rem) scale(.9)` (1.4 s).
3. The tab bar drops in.
4. The rail slides in, its buttons popping with a spring.
5. The cards rise and un-blur in a stagger.
6. The dial sweeps from 16° to 22°, and the brightness fills from 20% to 72%.

## 9. Responsive (≤900 px)

- The page scrolls and the parallax is disabled.
- The tabs become a horizontally scrolling glass pill, and the rail hides.
- The window becomes a 2-column grid:
  - camera (16:9, full width);
  - dial (full width);
  - scene and brightness (full width at ≤480 px);
  - vacuum and lights side by side;
  - music (full width).
- No horizontal overflow.

## 10. Do not

- No real brands or logos (no streaming-service marks).
- No opacity crossfade loops on the video, and no device frame.