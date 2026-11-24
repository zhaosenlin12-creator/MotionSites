# Noa Ellsworth: a botanist made of 66,000 dots

Build a single-page, full-screen portfolio hero: a dark moss-black room where the head-and-shoulders bust of a fictional botanist, Noa Ellsworth, is drawn entirely from about 66,000 soft glowing dots in WebGL (three.js). Her hair is gathered into a loose bun with a small sprig of leaves tucked into its right side, a few wavy strands hang beside her cheeks and neck, she wears a linen shirt with an open pointed collar, and across her eyes sits a single wraparound visor, also made of dots, with a faint sage-tinted lens. Her face is smooth and featureless, like a clay sculpture: the likeness lives in the silhouette, the hair, the leaves and the visor, never in eyes or a mouth.

The page opens on a ring-shaped loader whose number is the real download of the 3D model. At 100 every dot leaves the ring and arcs forward into place, so you watch her assemble herself. As the last dots land, one diagonal band of light sweeps down the bust once. From then on the visitor's cursor is a small light: it lights whatever part of her it is near, and her head turns gently to look at it. Every few seconds a sage glint runs across the visor and then across the leaves. Faint dust drifts upward through the whole room and a fine film grain sits over everything. The mood is calm, quiet and premium; nothing is busy, nothing reacts loudly.

Recreate everything below exactly: every value is taken from the finished page.

---

## 1. Assets and external URLs

| What | URL | How it is used |
|---|---|---|
| The 3D bust (untextured GLB, about 1.48 MB, one mesh of about 40,476 vertices and 30,887 triangles, CORS open) | https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261115_071021_742152ba-5554-4270-9dc5-286bcff36a1a.glb | Streamed with fetch so the loader can show true byte progress, parsed with three.js GLTFLoader, then sampled into dots in the browser. The model faces +Z, Y is up, and it spans roughly x −0.75…0.74, y −0.95…0.95, z −0.42…0.42 in its own units. |
| three.js 0.170.0 core | https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js | ES module, mapped as "three" in an import map. |
| three.js addons 0.170.0 | https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/ | Mapped as "three/addons/". Use loaders/GLTFLoader.js and math/MeshSurfaceSampler.js. |
| Geist (variable, weights 100–900, latin) | https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2 | Sans for the name and tagline. |
| Geist Mono (variable, weights 100–900, latin) | https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2 | Mono for the loader counter, the loader label, the hint and the pill. |
| Instrument Serif (400, latin) | https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2 | Serif for the "Noa." logo. |
| Film grain | Inline SVG data URI (no file) | An SVG of 240 × 240 with a feTurbulence filter (type fractalNoise, baseFrequency 0.85, numOctaves 3, stitchTiles stitch) followed by an feColorMatrix whose values are all zero except the alpha row "1.7 0 0 0 −0.6", applied to a full-size rect. Used as a repeating background on an overlay. |

Declare the three fonts with @font-face (font-display swap; Geist and Geist Mono with font-weight 100 900; Instrument Serif weight 400). In a single-file version, embed them as base64 data URIs.

## 2. Head and colour tokens

Title: "Noa Ellsworth". Meta description: "A point cloud portrait of a botanist, built from 66,000 dots. Move the light." Viewport meta: width=device-width, initial-scale=1. A preconnect to https://cdn.jsdelivr.net.

| Token | Value | Used for |
|---|---|---|
| --color-night | #0f110d | Page background and the WebGL clear colour |
| --color-paper | #f0e5c8 | Cream: logo, name, loader text and ring dots, and the colour the shine pulls dots toward |
| --color-dots | #c9d4b8 | The soft moss-green ink of every bust dot and of the dust |
| --color-tech | #7fa8a3 | Sage-teal: the glint colour and the lens tint |
| --color-muted | #7f8a6a | The tagline |
| --color-surface | #fff | Pill background |
| --color-ink | #111 | Pill text |
| --color-line | #1111111a | Pill hairline ring |
| --font-sans | "Geist", ui-sans-serif, system-ui, sans-serif | |
| --font-mono | "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace | |
| --font-serif | "Instrument Serif", Georgia, "Times New Roman", serif | |

All elements use box-sizing border-box. html and body: margin 0, height 100%, background --color-night. Body font --font-sans with antialiased font smoothing.

## 3. DOM, in order

A single main element (class page, data-phase "loading" at first, later "ready") containing:

1. A stage div (aria-hidden) that receives the WebGL canvas.
2. The loader: a div with role progressbar, aria-label "Loading the dots", aria-valuemin 0, aria-valuemax 100, aria-valuenow updated live. Inside: an SVG ring (viewBox −110 −110 220 220), a span counter showing "000", and a span label "66,000 dots".
3. A link "Noa." (the logo, href "./").
4. An h1 "Noa Ellsworth".
5. A p "Grows quiet things with AI" (the tagline).
6. A p "Move the light" (the hint).
7. A link "How this page was made →" (the pill).

There is no navigation bar and no other text.

## 4. Desktop layout and styling

The page is position fixed, inset 0, overflow hidden, background --color-night, text colour --color-paper, cursor crosshair while loading and cursor none once data-phase is "ready" (the WebGL light replaces the pointer), touch-action none.

A ::after pseudo-element covers the page (position absolute, inset 0, pointer-events none) with the grain data URI as background, filter invert(1) and opacity 0.05.

The stage is absolute, inset 0; its canvas is width and height 100%, display block.

**Loader.** Absolute, inset 0, display grid, place-items center, pointer-events none, opacity transition 0.5 s with a 0.15 s delay; it goes to opacity 0 when the page is ready.
- The ring SVG is 220 × 220 px, centred with top 50%, left 50% and translate −50% −50%, overflow visible. It holds 96 circles placed on a circle of radius 92: circle i sits at angle (i / 96) × 2π − π/2 (starting at 12 o'clock, going clockwise), with cx = 92 cos(angle) and cy = 92 sin(angle) rounded to two decimals, and r 1.6. An unlit circle is filled with --color-paper mixed 18% into transparent. A lit circle (attribute data-on) is filled solid --color-paper with r 2.2 px. Both fill and r transition over 0.25 s. Circle i is lit while i / 96 < progress.
- The counter is Geist Mono 34 px, letter-spacing 0.02em, tabular numerals, centred at 50%/50% with translate −50% −60%. It shows the rounded percentage padded to three digits ("000" to "100").
- The label is Geist Mono 11 px, uppercase, letter-spacing 0.12em, opacity 0.5, centred horizontally at 50%/50% with translate −50% 26 px (so it sits just under the counter).

**Text.** The logo, name, tagline and hint all start at opacity 0, margin 0, position absolute, with transitions of opacity 0.9 s and translate 0.9 s cubic-bezier(0.22, 1, 0.36, 1).
- Name and tagline: Geist 400, font-size clamp(17px, 1.6vw, 24px) (24 px at 1440 wide), letter-spacing −0.01em, top 50%, starting at translate 0 calc(10px − 50%) and ending at translate 0 −50% (a 10 px rise). The name sits at left clamp(20px, 4vw, 64px). The tagline sits at right clamp(20px, 4vw, 64px), has colour --color-muted and a 0.12 s transition delay.
- Logo: Instrument Serif 26 px, colour inherited (cream), no underline, top 20 px, left clamp(20px, 4vw, 64px). It fades to opacity 0.9 when ready; on hover or keyboard focus it goes to opacity 1 with an underline offset 4 px.
- Hint: Geist Mono 11 px, uppercase, letter-spacing 0.12em, no wrapping, bottom 22 px, left 50%, starting at translate −50% 10 px with a 0.5 s transition delay, ending at translate −50% (0) and opacity 0.45.

**Pill.** "How this page was made →": position fixed, bottom 20 px, left 20 px, z-index 7, background #fff, colour #111, Geist Mono 12 px, letter-spacing 0.04em, padding 8 px 12 px, border-radius 6 px, no underline, box-shadow of a 1 px #1111111a ring plus 0 10px 24px −12px #0006. It plays one animation from 4 s: 0.6 s, cubic-bezier(0.22, 1, 0.36, 1), fill both, keyframe 0% at opacity 0 and translateY 8 px (so it fades up into place).

## 5. Mobile layout

At max-width 700 px: the name and tagline drop to 16 px, move to top 72 px, start at translate 0 10 px and end at translate 0 (so they sit side by side near the top: name on the left, tagline on the right); the hint moves to bottom 60 px.

At max-width 600 px: the pill shrinks to padding 6 px 9 px and 11 px text, sits at bottom 12 px, and moves to the right (left auto, right 12 px).

The canvas and loader stay full screen; the camera fit below keeps the whole bust visible on narrow screens.

## 6. Building the dots from the model

After the download and parse, take the first mesh in the scene, clone its geometry with the mesh's world matrix applied, and compute vertex normals if missing. Build a three.js MeshSurfaceSampler on it.

**Candidates.** Sample 330,000 candidate points (5 × 66,000) with their normals, in model units.

**Even density (so the hair doesn't swallow every dot).** Put every candidate in a 3D voxel grid of 0.022 model units. Find the smallest per-voxel cap such that the sum over voxels of min(count, cap) reaches 1.8 × the number of bust dots needed. Keep at most cap candidates per voxel (in sampling order), shuffle that pool, and take as many as needed. The 1.8 headroom keeps some extra density in the hair so it keeps its texture.

**The leaf sprig (part 2).** A candidate is a leaf when x > 0.13, y > 0.6 and (x − 0.02)² + (z + 0.06)² > 0.035 (model units). Leaf candidates skip the voxel cap: keep the first 60% of them, so the sprig is denser than its area alone would give it, the way the original draws its glasses.

**The visor (parts 3 and 4).** Drawn as its own dots, as one rigid curved shape fitted to the face:
- Build a front height map of the face: for candidates whose normal z ≥ 0.2 and that lie within x −0.32…0.32 and y 0.2…0.45, keep the highest z per 0.01 × 0.01 cell. The face height at (x, y) is the maximum over the 3 × 3 neighbouring cells.
- Half-width W = 0.215. Clearance 0.028. Top edge: y = 0.378 − 0.022 (x / W)². Lower edge: y = 0.282 + 0.032 exp(−(x / 0.034)²) + 0.026 (x / W)⁴. The Gaussian term is a notch over the nose; the fourth-power term tapers the ends.
- The lens depth is one smooth curve, z = front − wrap × x². "front" is the highest face height over x −0.06…0.06 and y 0.30…0.36, plus the clearance. "wrap" is the smallest value of (front − need − 0.7 × clearance) / x² over x from −W to W in 0.01 steps (skipping |x| < 0.05), where "need" is the highest face height between the lower and top edges at that x. Fall back to 2.4 if the fit fails. Each dot's normal is (2·wrap·x, 0, 1) normalised.
- Dots, each with a small random jitter: 950 along the top bar (x uniform across −W…W, y = top edge minus a random amount weighted toward the edge, up to 0.016; pushed 0.004 forward); 380 along the lower edge (pushed 0.002 forward); 70 at each end, filling between the two edges at x = ±W; 1,500 lens dots filling the area between the edges (part 4); and 70 per side for the arms, running from each end 0.03 outward and 0.15 back along z, 0.008 below the top edge. Frame dots are part 3; lens dots are part 4.

**Placement.** Every dot is moved into world space by x × 2.8, y × 2.8 − 0.68, z × 2.8. That puts the top of the bun near the top edge of a 1440 × 900 view and lets the bottom edge crop the shoulders.

**Total.** Exactly 66,000 dots: the visor dots, the kept leaf dots, and the voxel-thinned bust dots fill the rest. Every dot also gets aRand, a uniform random number from 0 to 1.

**Depth values (aShade).** For every final dot, look at the candidates within radius R = 0.03 (model units), using the first half of the candidates in a hash grid of cell size R.
- The ridge value is −(the average neighbour offset · the dot's normal) / R. Positive means the dot stands proud of its neighbours (bun twists, leaf edges, collar points); negative means it sits in a crease. Divide by the 90th percentile of its absolute value and clamp to −1…1.
- The thin value is 1 − neighbourCount / (0.55 × the median count), clamped to 0…1. It is high for loose strands and leaf tips.

Store both as a two-component attribute. Also record the smallest and largest world x of all non-bust dots (parts 2–4); these bound the glint sweep.

## 7. Scene, camera and renderer

Use a WebGLRenderer with antialias off and powerPreference high-performance, pixel ratio min(devicePixelRatio, 2) (called dpr below), clear colour #0f110d. Use a PerspectiveCamera with fov 30, near 0.1 and far 100, looking at the target (0, −0.15, 0).

On every resize: the camera distance is max(2.35 / tan 15°, 1.7 / (tan 15° × aspect)). Put the camera at (0, −0.15, distance) looking at the target, so the view is always 4.7 units tall, or wider when the screen is narrow. One CSS pixel at the bust's depth is 2 × distance × tan 15° / height world units. The loader ring's world radius is 92 of those pixels and its centre is (0, −0.15, 0), so the WebGL ring lines up exactly with the SVG ring.

There are three Points objects, all with transparent true, depthWrite false and additive blending, and all with frustum culling off.

**1. The bust (uniforms).**

| Uniform | Value |
|---|---|
| uTime | Seconds since start |
| uAssemble | 0 to 1 |
| uSize | 26 × dpr |
| uGlint | Glint x position; −9 when off |
| uShine | Shine band position; 99 when off |
| uHead | 2D head turn |
| uLight | Cursor light position, starting at (−1.4, 1.2, 1.6) |
| uRingCenter, uRingRadius | Set by the resize |
| uInk | #c9d4b8 |
| uBlue | #7fa8a3 |
| uCream | #f0e5c8 |

**2. The cursor light.** One point with a light shader: point size 240 × dpr × uOn / depth. Its fragment is a white core, smoothstep(0.14, 0.08, r), plus a glow, exp(−4r) × 0.45 + exp(−12r) × 0.7, where r is twice the distance from the sprite centre.

**3. The dust.** 900 points spread over x −9…9, y −6…6 and z −6…2. Each rises at 0.03 + aRand × 0.05 units per second, wrapping y through a 12-unit range. Each sways in x by sin(t × 0.2 + aRand × 40) × 0.15. Point size is 22 × dpr × (0.5 + aRand) / depth. Brightness is (0.1 + aRand × 0.18) × uOn in the bust's ink colour, with the same Gaussian falloff as the bust dots.

## 8. The bust's vertex shader, step by step

1. **Head turn.** head = smoothstep(−1.3, −0.6, y). The rotation is rotY(uHead.x × (0.25 + 0.75 × head)) times rotX(uHead.y × head), applied about the pivot (0, −1, 0) to both the position and the normal. The head turns fully and the shoulders follow at 25%.
2. **Breathing.** Each dot moves along its normal by sin(uTime × 1.4 + aRand × 60) × 0.006.
3. **Entrance.**
   - r2 = fract(sin(aRand × 91.7) × 43758.5453).
   - Per-dot progress: t = clamp((uAssemble − aRand × 0.45) / 0.55, 0, 1). Each dot starts after a delay of up to 0.45 and takes 0.55 of the assemble time.
   - Ease in-out cubic: e = 4t³ when t < 0.5, otherwise 1 − (−2t + 2)³ / 2.
   - Start point: on the ring at angle aRand × 2π, radius uRingRadius × (1 + (r2 − 0.5) × 0.06), so the ring unwinds in the same order the SVG ring filled.
   - Position: mix(start, home, e), plus an arc toward the camera: (sin(aRand × 40 + uTime × 0.3), cos(aRand × 31), 0.9 + r2 × 1.4) × sin(e × π) × 0.45.
4. **Light terms.**
   - lit = max(n · toLight̂, 0) / (1 + |toLight|² × 0.32), where toLight is the cursor light's position minus the dot's world position.
   - key = max(n · normalize(−0.5, 0.6, 0.7), 0), a soft key from the top left.
   - facing = the view-space normal's z.
   - rim = (1 − |facing|)³.
5. **Brightness.**
   - Start with b = 0.3 + key × 0.22 + lit × 1.5 + rim × 0.14. It's mostly an even tone, like a scan.
   - Multiply by mix(0.55, 1, smoothstep(−0.3, 0.25, facing)), so the far side of the head is a little darker.
6. **Depth.**
   - Multiply b by 1 + ridge × 0.7 when ridge > 0, otherwise 1 + ridge × 0.5.
   - Add thin × (0.26 + key × 0.3).
7. **Parts.** Leaf dots × 0.9. Visor frame and lens dots × 0.78. Lens dots a further × 0.7. Then every dot × (0.7 + r2 × 0.5), so no two dots are alike.
8. **Glint.** Only leaf and visor dots: glint = smoothstep(0.09, 0, |x − uGlint|), measured on the dot's home x. Add glint × 1.2 to b.
9. **Shine.** band = y − x × 0.5 − uShine, measured on the turned home position. shine = exp(−band² × 4). Add shine × 1.3 to b.
10. **Alpha.** mix(0.75, 1, e).
11. **Size.** uSize × (0.45 + r2² × 1.3) × (1 + shine × 0.6) / view depth. Most dots are small, a few up to about three times larger, and dots swell slightly as the shine passes.

**Fragment.**
- Discard outside radius 0.5.
- Alpha is exp(−16 r²) × the vertex alpha, a soft Gaussian like a lens rather than a hard pixel.
- The ink starts at #c9d4b8, mixed toward cream #f0e5c8 by shine × 0.6, then toward sage #7fa8a3 by 0.6 on lens dots, then toward sage by glint × 0.7.
- The output colour is ink × brightness × alpha.

## 9. Timeline and interactions

| Time / trigger | What happens |
|---|---|
| Page load | Ring of 96 faint dots, counter "000", label "66,000 DOTS". Cursor is a crosshair. |
| While the GLB streams | Progress = bytes received / Content-Length (if no length: min(0.95, bytes / 1.5 MB)); ring dots light up clockwise from 12 o'clock, counter counts up. |
| Download done | Parse, build the dots, set progress to 1 ("100", ring full), hold 380 ms. |
| t = 0 (renderer starts) | uAssemble = min(1, t / 2.6): over 2.6 s every dot leaves the ring and arcs into place. Light sprite and dust fade in (light: uOn eases toward min(1, 1.6 × uAssemble) at rate 4; dust: toward 1 at rate 0.8, with ease = 1 − e^(−dt × rate)). |
| uAssemble > 0.55 (t ≈ 1.43 s) | data-phase becomes "ready": loader fades out (0.5 s after 0.15 s), cursor hides, logo fades to 0.9, name and tagline fade and rise 10 px over 0.9 s (tagline 0.12 s later), hint fades to 0.45 after 0.5 s. |
| t = 2.34 s → 4.54 s | The shine: s = (t − 2.34) / 2.2; uShine = 2.8 − (1 − (1 − s)²) × 7.4 (ease-out), so one diagonal band sweeps from above the bun down past the shoulders, once. |
| 4 s | The "How this page was made →" pill fades up. |
| t = 4.6 s, then every 4.2 s | The glint: over 0.9 s uGlint runs linearly from (smallest non-bust x − 0.15) to (largest non-bust x + 0.15), i.e. across the visor first and then across the leaves. Then it resets to −9. |
| Pointer move / pointer down | Pointer position in normalised device coordinates. A ray from the camera through it hits the plane z = 2.6; the light eases toward that point (rate 5), and the head eases toward (0.5 × x, 0.18 × y) (rate 3). uHead = (head.x, −head.y). |
| No pointer (or pointer left, or 1.5 s after the last touch) | The light orbits on its own at (1.9 sin(0.45 t), 0.5 + 0.8 cos(0.33 t), 2.6), and the head eases toward (0.35 sin(0.45 t), 0.12 cos(0.33 t)) at rate 1.5. |
| Frame step | dt is capped at 0.05 s. |

Easing for all of these "eases toward" is exponential smoothing: value += (target − value) × (1 − e^(−dt × rate)), or a lerp with that factor.

## 10. Reduced motion and errors

With prefers-reduced-motion: reduce, there is no 380 ms hold, uAssemble starts at 1 (no entrance), uTime stays 0 (no breathing, no drifting dust), there is no shine and no glint, the head stays still, the light snaps to its target, the dust and light start fully on, CSS transitions on the loader, logo, name, tagline and hint are off, and the pill does not animate.

If the model fails to load, the counter shows "Could not load" and the label "Refresh to try again".

## 11. Acceptance checklist

- At 1440 × 900 the bun's top sits about 36 px from the top edge, the head is centred, the shoulders run off the bottom edge, the name is at left 58 px and the tagline at right 58 px, both vertically centred.
- The loader number climbs with the real download, the dots fly from the ring into the bust, the text appears around 1.4 s, the shine runs once around 2.3–4.5 s, the glint crosses the visor and leaves every 4.2 s.
- The cursor is hidden once ready; a soft glowing point follows it, the bust brightens near it, and the head turns toward it.
- The bun's twists, the leaf edges and the collar points catch light; the area under the bun and inside the collar falls into shadow; hanging strands glow softly.
- The visor reads as one wraparound piece with a brighter top bar, a finer lower edge with a nose notch, a faint sage lens and short arms; it turns with the head.
- At 375 px wide the name and tagline sit at the top, the pill is bottom-right, there is no sideways scroll.
- No console errors; exactly 66,000 bust dots.