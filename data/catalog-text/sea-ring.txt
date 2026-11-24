# Noa Ellsworth — Sea Ring Portfolio: exact recreation prompt

Build a two-view, single-file portfolio site (one `index.html`, vanilla HTML/CSS/JS, no frameworks, no build step) for a fictional product engineer called **Noa Ellsworth**. View one, **Home**, is a full-screen stage: a serif sentence and three stats across the top, and below it a large rounded panel showing a looping video of a sunlit turquoise sea with white flowers, inside which a 3D cylindrical ring of 16 landscape website-preview video cards surrounds the viewer and spins with the wheel, drag and touch. View two, **Build**, is a rounded panel with the same sea video behind a centred two-line headline and a fill-in-the-blanks project brief card. A full-screen loader opens the site: the name "Noa." rises letter by letter, a percentage odometer counts up while the card posters load, the cards assemble into a small tilted ring, then the ring expands to wrap the viewer while the loader fades, the panel's clip closes to its rounded frame and "Noa." flies into the nav wordmark. Every value below is taken from the shipped source; reproduce it exactly.

---

## 1. Media (all remote, use these exact URLs)

Image proxy wrapper used for every still image: `https://images.higgs.ai/?default=1&output=webp&url=<URL-encoded source>&w=<width>&q=85`.

Base for generated media: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/` (call it CF). Base for preview videos: `https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/` (call it R2).

| Asset | Source | Used as |
|---|---|---|
| Sea plate (still) | CF + `hf_20261111_224417_17e8d78c-9384-4a50-93b4-92510f1957db.png` (2688×1520, 16:9), through the proxy at w=2048 | Poster/fallback image of the scene on both views |
| Sea loop video | CF + `hf_20261111_232613_bf108dd9-dc98-4729-9163-748475f20b61.mp4` (1276×720, h264, 24 fps, 5.04 s, no audio; Kling 3 loop: waves rolling, sun glitter flickering, white flowers swaying; first frame = last frame) | Scene video on both views, played over the still |

The 16 ring cards, in this exact order (slot data). Poster = CF + `<poster id>.png` through the proxy at w=720. Video = R2 + path. Link = `https://motionsites.ai/?prompt=<slug>`. Ratio = native video width ÷ height.

| # | Title | Slug | Video path | Poster id | Native size | World |
|---|---|---|---|---|---|---|
| 01 | Look Circle | look-circle | aaaf/look-circle-hero.mp4 | hf_20261111_034848_928e6733-ce60-48f4-9a65-14dc76a1d74b | 1600×900 | brand |
| 02 | Video Studio | video-studio | aaaf/kolibrie-landing.mp4 | hf_20261110_232427_5e9a291a-5c3e-4f0e-9506-06fedc0020f4 | 1440×810 | build |
| 03 | Balloon Drop | balloon-drop | aaaf/balloon-drop-hero-edge.mp4 | hf_20261109_030427_0961b20a-ba6b-4094-8ea2-de5916dfa0b3 | 1600×900 | brand |
| 04 | Fox Couture | fox-couture | aaaf/fox-couture-hero.mp4 | hf_20261107_154307_13b28214-7ca8-4b2a-b8aa-a2f84e7cfcec | 1440×900 | brand |
| 05 | Laptop Portfolio | laptop-portfolio | aaaf/laptop-portfolio.mp4 | hf_20261111_030305_aa366bc0-85e3-4f61-82c1-cbf8ae8217a3 | 1440×810 | build |
| 06 | Ink Portfolio | ink-portfolio | aaaf/ink-portfolio.mp4 | hf_20261111_001348_8bc89068-e31a-4ccf-a6cb-893ff11c134f | 1440×810 | build |
| 07 | Clothing Rail | clothing-rail | aaaf/clothing-rail-hero.mp4 | hf_20261108_064619_5aab2bf3-3e14-41b3-9421-250f3c9eac47 | 1500×1000 | brand |
| 08 | Spin Product | spin-product | aaaf/spin-product-hero.mp4 | hf_20261107_113531_66f5b631-47f4-45da-8094-29dc04544d61 | 1500×1000 | brand |
| 09 | Sphere Gallery | sphere-gallery | aaaf/sphere-gallery.mp4 | hf_20261111_011719_6594eb98-1eff-4903-9888-f4617764070d | 1440×810 | learn |
| 10 | Video Editor | video-editor | aaaf/glaze-motion.mp4 | hf_20261110_223913_74dc89fd-5948-4da9-8749-3bcd3f40fd8d | 1440×810 | build |
| 11 | Card Story | card-story | aaaf/kinestra-card-story-v2.mp4 | hf_20261108_020030_b8d50a01-c927-44a4-ad51-ab48c283c9d5 | 1440×900 | learn |
| 12 | Year Recap | year-recap | aaaf/halftone-recap.mp4 | hf_20261107_001441_a517a376-cfaa-415e-95d8-ea8b61c1727c | 1440×900 | learn |
| 13 | Future Fashion | future-fashion | aaaf/orbe-future-mode.mp4 | hf_20261106_084953_1d74b316-6fa3-4558-a532-462e7ae8d559 | 1440×900 | brand |
| 14 | VHS Archive | vhs-archive | aaaf/vhs-arc-hero.mp4 | hf_20261105_045553_51e4ba42-a8a4-4702-ad5f-18c0e2a5ba85 | 1600×900 | learn |
| 15 | Moss Island | moss-island | aaaf/mossline-hero.mp4 | hf_20261106_032528_99eb9a00-a553-40b6-8b97-017e918971c6 | 1600×900 | build |
| 16 | Outfit Carousel | outfit-carousel | aaaf/try-the-look-hero.mp4 | hf_20261105_051536_4f458170-47a1-440e-a08c-8ed434394ce8 | 1600×900 | brand |

The three "worlds" (one per sentence choice) and their colours:

| World | Label | Colour (`--world`) | Text on it (`--on`) | Preview blurb |
|---|---|---|---|---|
| build | BUILD | #3AA8D0 | #04121A | Software for startups, from first sketch to a shipped product. |
| brand | BRAND | #EEF4F6 | #0A0E11 | Showreels and launch sites for labels that want to move. |
| learn | LEARN | #9ED8E4 | #0E2A3B | Free toolkits and breakdowns for learners, one site at a time. |
| ai (4th choice) | NOA'S ASSISTANT | marker #9ED8E4 with #0A0E11 text; preview card #05090C | white | Answers about projects, rates and timelines, in Noa's own words. |

## 2. Fonts

Load from Google Fonts or self-host the latin woff2 files (the shipped standalone embeds them as base64):

- **Newsreader**, variable, weight axis 300–500, normal style (`https://fonts.gstatic.com/s/newsreader/v26/cY9AfjOCX1hbuyalUrK4397yjA.woff2`). Serif for the wordmark, the sentence, stats numbers, card titles, preview text, headline, brief sentence and logos.
- **Geist Mono**, variable 100–900 (`https://fonts.gstatic.com/s/geistmono/v6/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2`). Nav links, labels, kickers, loader caption and odometer, card chips, send button.
- **Geist**, variable 100–900 (`https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2`). Body default and small preview paragraph.

All with `font-display: swap`. Stacks: serif = "Newsreader", Georgia, serif; mono = "Geist Mono", ui-monospace, monospace; sans = "Geist", system-ui, sans-serif.

## 3. Head and tokens

- Title: `Noa Ellsworth | Product engineer, site builder, creator`. Meta description: "Noa Ellsworth builds software for startups, showreels for labels and free toolkits for learners. A ring of recent motion sites floating over a sunlit sea." Viewport `width=device-width, initial-scale=1`.
- Favicon: inline SVG data URI, 32×32 rounded square (rx 8) filled #0A0E11 with a Georgia "N." 17px in #EEF4F6 centred at y 22.
- **Dark mode.** `html { color-scheme: dark }`. Colour tokens: paper (page background) #0A0E11, paper-deep #111920, surface #141C22, ink (main text) #EEF4F6, ink-soft #9FB4BF, ink-muted #647C8A, line rgba(238,244,246,.14), accent (underlines, focus, links; "clay" token) #3AA8D0, button blue ("btn" token) #1E86AC (hover #2597C0), aqua ("sage" token) #9ED8E4, night #05090C, on-sky text #0E2A3B (used only where text sits directly on the bright sky image). The sea image and video are unchanged; only the UI around them is dark.
- Main ease: cubic-bezier(.22,1,.36,1).
- Grain: an inline SVG data URI, 160×160, `feTurbulence type=fractalNoise baseFrequency=.9 numOctaves=3 stitchTiles=stitch` on a full rect. Used twice: a fixed full-page overlay (`body::before`, inset −50%, opacity .045, blend mode screen, z 200, no pointer events) and inside each scene layer (see 6).
- Page: background paper, text ink, Geist, antialiased. `html, body { overflow-x: clip; max-width: 100% }` so nothing can ever create a horizontal scrollbar. While the Home view is shown the body is `overflow: hidden; overscroll-behavior: none; height: 100svh` (the wheel spins the ring instead of scrolling).

## 4. Scaling system

One design unit: `--u = min(100vw, 160svh) / 1440` (a 1440×900 frame). Every desktop measurement below is "N u" = N × --u. At ≤820 px the unit becomes `100vw / 390` and the phone rules in section 9 apply.

## 5. Nav (both views)

A 92u-tall flex row, space-between, padding 0 46u 0 45u, z 50.

- Left: the wordmark link "Noa Ellsworth." (href #home, goes to Home). Newsreader 40u, letter-spacing −0.02em, line-height 1. It is two inline-block spans: "Noa" (class wmFirst, the fly-in target) and "&nbsp;Ellsworth." (fades in).
- Right: "HOME / BUILD". Geist Mono 13u, letter-spacing .1em, uppercase, ink-soft, gap 10u between items; the "/" is ink-muted. Each link has 3px bottom padding and a 1.5px accent underline (scaleX 0 → 1 from the left, .5s main ease) shown on hover and on the current page (aria-current="page"), which is also ink coloured. Home is current on load.
- During the intro, everything except "Noa" is at opacity 0 and fades in over .9s when the intro ends; "Noa" is hidden until the flying loader name lands on it.

## 6. Home view (desktop 1440×900)

The stage is a flex column, height 100svh − 92u.

**6a. Top row.** Grid with columns `1fr auto`, column gap 40u, padding 8u 46u 26u 45u, z 4.

- Sentence (left): Newsreader 400, 45u, line-height 50u, letter-spacing −0.005em, max-width 800u, three lines with forced breaks: "I craft products for **startups**⁰¹," / "showreels for **labels**⁰² and free toolkits" / "for **learners**⁰³. Or just **chat with Noa**⁰⁴." Each plain word is wrapped in a word mask (inline-block, overflow hidden, 0.08em bottom padding offset by −0.08em margin) whose inner span starts at translateY(110%). The four bold items are "choices": inline, nowrap links (startups → Build view; the others stay on Home), each containing a marker (absolute, inset .1em −.12em −.02em, background = its world colour, scaleX 0 from the left), the masked words, an underline bar (absolute, bottom .02em, height max(2px, .05em), accent colour, scaleX 0 from the left), and a superscript number 01–04 (Newsreader, max(10px, .34em), vertical-align top, nudged up .05em, ink). Punctuation directly after a choice (",", ".") is placed inside that choice so it can never wrap to the start of the next line. Each word gets a stagger delay of 0.05 s + 0.035 s × its index across the whole sentence; underlines and superscripts reuse the index at that point.
- Stats (right): a definition list with a 1px line on its left and 39u left padding; three columns, each with 28u side padding (none on the outer edges) and 1px lines between them. Each column is number above label: number Newsreader 38u, line-height 1, letter-spacing −0.02em, tabular figures; label Geist Mono 12u, letter-spacing .14em, uppercase, ink-soft, 14u gap. Values: **11.4M+** PLAYS, **38.2K** COMMUNITY, **24.9K** MEMBERS. Each column starts at opacity 0 and translateY(14px) and fades up over .9 s main ease with delays .35 s, .45 s, .55 s.

**6b. World frame (the rounded scene panel).** Fills the rest of the stage: flex 1, margin 0 16u 22u, border-radius 22u, clip-path inset(0 round 22u), background paper-deep, isolation isolate. On a 1440×900 screen it runs from about y 255 to y 878. The clip-path animates over 1.1 s cubic-bezier(.5,0,.1,1). During the intro it carries an "open" state whose clip-path is a negative inset reaching the viewport edges (top/left/right/bottom distances measured in JS and set as --ft/--fl/--fr/--fb), with no rounding, so the forming ring is never clipped; at reveal the open state is removed and the clip shrinks to the rounded frame. While entering it has z 101 and a transparent background; once not open it is overflow hidden. Layers inside, back to front:

1. Scene layer (z 0, inset −4%, so it can drift with the pointer): the sea still (object-fit cover, object-position 50% 62%) and over it the sea loop video (same fit and position, muted, loop, playsinline, preload none, opacity 0 → 1 over .8 s once it fires "playing"). A grain overlay sits on top (inset −4%, opacity .07, a 0.9 s steps(5) jitter loop through translate (0,0) → (−3%,2%) → (2%,−3%) → (−1%,−2%) → (3%,1%) → (0,0)).
2. Back petals (z 1).
3. The ring wall (z 2), see 6c.
4. Mist layer (z 3): left/right −6%, bottom −4%, height 46%, two white radial gradients (60%×70% at 18% 100%, rgba(250,252,253,.78) fading by 70%; 55%×60% at 82% 100%, rgba(250,252,253,.7) by 72%) plus a linear gradient to top from rgba(246,250,251,.55) to transparent at 75%. It starts at opacity 0 and translateY(18%) and rises to opacity .92 over 1.6 s (opacity over .9 s) at reveal.
5. Front petals (z 3) and light motes (z 4).

The scene layers (sky, mist, both petal layers, motes) stay at opacity 0 until reveal and then fade in over .9 s.

**Petals** (same data as the reference): leaf-shaped spans (border-radius 80% 0, height = 0.62 × width, opacity .85, shadow 0 1px 3px rgba(14,42,59,.18)), colours alternating white #FFFFFF and pale aqua #D6EEF3. Each item is [left %, top %, width px, duration s, delay s, layer]: back layer — [4,14,9,29,0], [14,4,7,34,−12], [24,26,8,31,−21], [36,10,6,37,−5], [46,30,9,27,−16], [56,6,7,33,−27], [66,20,8,30,−9], [76,2,6,36,−24], [86,24,9,28,−3], [94,12,7,35,−18], [30,44,6,39,−31], [60,40,7,32,−13]; front layer — [10,50,14,23,−6], [40,62,12,26,−19], [70,56,16,21,−11], [88,46,13,24,−2], [52,70,11,28,−23]. Colours by list position: white, aqua, white, aqua… (the original alternation: back items 1,3,5,7,9,11 white, 2,4,6,8,10,12 aqua; front items aqua, white, white, aqua, aqua). Every third petal (index % 3 = 0 within its layer) uses the mirrored keyframes. Drift keyframes (linear, infinite): 0% opacity 0, translate(−6vw,−12vh) rotate 0; 8% opacity .85; 50% translate(14vw,18vh) rotate 260deg; 92% opacity .85; 100% opacity 0, translate(34vw,46vh) rotate 540deg. Mirrored: 0% (6vw,−12vh); 50% (−12vw,16vh) rotate −240deg; 100% (−28vw,44vh) rotate −500deg.

**Motes**: 14 round glows (radial-gradient white f2 → #bfeaf3 at 45% → transparent at 70%), items [left %, top %, size px, duration s, delay s]: [8,62,10,14,−2], [18,40,6,18,−9], [27,70,14,16,−5], [36,52,8,20,−13], [44,30,5,17,−3], [53,66,12,15,−11], [61,44,7,19,−7], [69,74,16,14,−1], [77,36,6,21,−15], [85,58,11,16,−8], [92,46,7,18,−4], [13,82,9,22,−17], [48,84,13,17,−6], [72,22,5,23,−19]. Keyframes ease-in-out infinite: 0% opacity 0 scale .6; 20% opacity .9; 50% opacity .55, translate(14px,−9vh) scale 1; 80% opacity .85; 100% opacity 0, translate(−6px,−20vh) scale .7.

**Pointer parallax**: on fine pointers only (and not with reduced motion), pointer x and y are mapped to −1…1 across the window and smoothed by a spring (stiffness 40, damping 18, mass 1). Each layer is translated by (−x × depth, −y × depth × 0.5) px with depths: scene 10, back petals 22, mist 34, motes 40, front petals 48. The Build panel's scene and petals use the same parallax.

**6c. The ring of cards.**

Structure: the wall fills the frame (cursor grab, touch-action pinch-zoom, no text selection). Inside it a "lens" box (absolute, inset −100vh 0, carries the CSS perspective) contains the ring centre: a zero-size element at 50%/50% with preserve-3d and transform translate(--intro-x, --intro-offset) rotateZ(--intro-roll) rotateX(--intro-tilt) scale3d(s, s, --intro-sz), where s = wall-scale × --intro-scale and wall-scale = 1.1 on desktop (0.9 when the viewport is ≤760px tall, 0.8 on phones).

Cards: 16 slots, one per site. Each card is an anchor (opens the motionsites link in a new tab), height 160 px and width 160 × the site's ratio (so 284 px for 16:9, 256 px for 16:10, 240 px for 3:2), positioned with its centre on the ring centre (top −80 px, left −width/2), preserve-3d, starting at opacity 0. Inside: a tilt wrapper (preserve-3d), a frame (inset −9px, 3px border in the world colour, radius 24px, glow 0 40px 80px −30px world colour, clip-path inset(0 100% 0 0 round 24px) that opens to full in .55 s on hover), and the face (radius 16px, overflow hidden, backface hidden, navy #0E2A3B fill, shadow 0 18px 36px −24px rgba(0,0,0,.45), and a reflection below it: `-webkit-box-reflect: below 10px linear-gradient(transparent 52%, rgba(255,255,255,.32))`). The face holds the poster image (cover), the preview video (cover, muted, loop, playsinline, preload none, opacity 0 → 1 over .4 s on "playing"), a chip at bottom-left (14px in, pill, rgba(0,0,0,.45) background, white Geist Mono 13px, a 6px dot in the world colour, text "No. 01" … "No. 16"; it fades out on hover), and a label bar (12px from left/right/bottom, padding 11px 14px, radius 12px, world colour background, `--on` text; contents: world label in Geist Mono 500 12px .12em tracking, the site title in Newsreader 22px truncated, and an "↗" that springs from translate(−6px,6px) to 0 over .5s cubic-bezier(.34,1.56,.64,1) with .15 s delay; the bar is revealed by clip-path from the left over .5 s with 50 ms delay on hover). A paper-coloured overlay on the face rises to opacity .6 on cards whose world is not the one currently focused by the sentence hover.

Slot → site mapping: slot e shows site `((e − a·16 + min(3, N−1)) mod N + N) mod N`, where a = floor((360e/16 + rotation + 180) / 360) and N = 16 (with exactly 16 sites this is a stable offset of 3; during the intro rotation is treated as 0). Slot angle: `angle(e) = ((((360e/16 + rotation + 180) mod 360) + 360) mod 360) − 180`.

Ring geometry for expansion e ∈ [0,1] (e = 0 small intro ring, e = 1 final ring):
- tilt = −22 × (1 − e) degrees
- radius = 460 + 1340 × e
- anchor = −radius × sin(tilt) + 460 × sin(−22°) × (1 − e)
- perspective = 1000 + (760 − 1000) × e (final camera distance 760)
- roll = −20 × (1 − e) degrees
- card scale = 0.52 + (2.3 − 0.52) × e²

Card placement for a slot with angle r and formation f ∈ [0,1]: n = ((r + 180) mod 360), a = n/360, i = clamp((f − 0.7a)/0.3, 0, 1), s = 1 − (1 − i)³, yaw l = −180 + n × s, effective radius c = radius − (1 − s) × a × 24, x = −sin(l) × c, z = −cos(l) × c, appear = min(1, 2.5 i). The card transform is translate3d(x, 0, z) rotateY(l deg) scale(card scale) and its opacity = appear. A card is hidden if z × cos(tilt) ≥ perspective − 70 (behind the camera), or, once the intro is complete, if |r| > 96°. If z > radius² / perspective, the face is flipped with rotateY(180deg).

Per-frame camera values (A = wall-scale × (fit + (1 − fit) × e), fit = min(1.05, (innerWidth − 32)/1240, 0.66 × innerHeight/800) ÷ wall-scale, introOff = 0.44 × innerHeight − frame centre y): --intro-offset = introOff × (1 − e) + anchor × A px; lens perspective = perspective × A px; lens perspective-origin = 50% calc(50% + introOff × (1 − e) px); --intro-tilt, --intro-roll in degrees; --intro-x = 160 × sin(roll) × A px; --intro-sz = A; --intro-scale = fit + (1 − fit) × e. (So during the intro the small ring sits centred at 44% of the viewport height, tilted and rolled, slightly to one side, and it grows into the frame.)

Rotation: a target value m and a displayed value g that follows m with a spring (stiffness 150, damping 27, mass 1). Every frame (frame factor k = dt in ms ÷ 16.67, capped at 3): an easing factor E moves toward 0.2 when the mouse is over a card (checked every third frame with elementFromPoint) and toward 1 otherwise, by min(1, 0.08 k) of the gap. If not dragging, not focused inside the wall and not reduced motion, m increases by 0.3 × E × k degrees once the intro is complete; during the intro by 0.3 × (0.5 + 0.5e) × clamp((78 − m)/20, 0, 1) × E × k (so it spins until about 78° and eases off).
- Wheel (window listener, non-passive, Home view only, ignored over inputs or with Ctrl/Meta; it always prevents page scroll): delta = the larger of deltaY/deltaX, ×16 for line mode or ×innerHeight for page mode, then m += 0.5 × clamp(delta, −480, 480). Only after the intro completes.
- Drag (mouse button 0 on the wall, after the intro): m = start m + 0.2 × (the larger-magnitude of dx, dy); moving more than 4 px marks it a drag, and a click right after a drag (within 50 ms) is cancelled; cursor shows "grabbing".
- Touch (one finger, not starting on a card or input): same 0.2 factor.
- With reduced motion the spring jumps straight to the target.
- Card hover tilt: on mouse move over a card, normalised x/y in −0.5…0.5 set targets rotateX = −20 × y, rotateY = 24 × x, translateZ = 45 px, each on its own spring (stiffness 180, damping 24); leaving resets them to 0. Applied to the tilt wrapper.
- Videos: a card's preview video plays only when formation > 0.5, |angle| ≤ 78°, the tab is visible, the Home view is shown and reduced motion is off; its src is set the first time it needs to play; it pauses otherwise. When a slot's site changes, the video is paused, its src removed and reloaded.

**6d. Sentence hover and preview card.** Only after the intro has entered. Hovering a choice marks it active and the sentence "hovering": all words drop to opacity .28 except the active choice, whose words turn the `--on` colour while its marker sweeps in (scaleX 0 → 1, .5 s main ease) behind it in the world colour. For build/brand/learn the stage gets a focus attribute that dims every card of another world (a page-black overlay to .6). A preview card follows the pointer: a fixed anchor translated to the pointer by springs (stiffness 260, damping 28, mass 0.6), holding a 260 px card (radius 16px, surface background #141C22, shadow 0 30px 60px −28px #000 and a 1px rgba(238,244,246,.1) ring), placed so it always stays fully on screen: by default its bottom-left corner sits 18 px right of and 22 px above the pointer; if there is not room above (it would come closer than 12 px to the top edge) it flips to 22 px below the pointer, and if there is not room on the right it flips to the left side (18 px gap); a 24 px hysteresis stops it flickering on the threshold, and the final position is clamped 12 px inside every viewport edge; its transform-origin follows the corner nearest the pointer; opacity 0/scale .85 → 1/1 (.25 s / .35 s). Its media area is 146 px tall, shows that site’s poster as its background (and as the video poster) straight away, and plays the first site of that world (Look Circle for brand, Video Studio for build, Sphere Gallery for learn); below it a meta block (12px padding 14px, 12px Geist, line-height 1.5): a Geist Mono 500 11px .1em line with an 8px world-coloured square, "BRAND · LOOK CIRCLE" style text, then the world blurb. For "chat with Noa" the card turns night (#05090C), the media hides, and it shows "Ask me anything" in Newsreader 28px white with a 2px aqua caret blinking every 1 s (step-end), label "NOA'S ASSISTANT", blurb in #9fb4bf. Leaving the sentence clears everything and pauses the preview video. Clicking "startups" opens the Build view.

## 7. Build view (desktop)

A flex column, min-height 100svh − 92u.

- Panel: margin −15u 22u 0 24u (it starts at about y 77), height 716u, radius 24u, clip-path inset(0 round 24u), overflow hidden, background paper-deep, flex column centred. Inside: the same scene layer (sea still + sea video, object-position 50% 70%, grain, parallax depth 10) and a back petal layer containing all 17 petals.
- Headline: two lines "I take startups" / "from sketch to ship.", centred, Newsreader weight 460, 88u, line-height 76u, letter-spacing −0.015em, colour #0E2A3B (dark navy: it sits directly on the bright sky, so it stays dark in dark mode for contrast), margin-top 86u. Each word is masked and rises from translateY(110%) over .8 s main ease with delay 0.15 s + 0.06 s × index when the view is entered. A visually hidden line reads "Build: software for startups".
- Brief card: margin-top 60u, width 542u, padding 28u 30u 25u, radius 16u, dark glass: surface #141C22 at 86% (color-mix) with 10px backdrop blur, shadow 0 40px 80px −40px rgba(0,0,0,.8) plus an inset 1px rgba(238,244,246,.08) ring; all its text uses the light ink tokens, column gap 14u. It fades up (opacity 0, translateY 16px → 0 over .9 s, delay .45 s). Contents:
  - Kicker "SHARE WHAT YOU'RE CREATING": Geist Mono 11u, .1em, uppercase, ink-soft.
  - Sentence in Newsreader 25.5u, line-height 41u, three lines on desktop: "I'm creating [a booking app for gyms]" / "for [coaches in Porto], and I want it" / "[in 6 weeks] by next May / when it's ready." The blanks are text inputs styled as underlines (width = characters × 0.5em, with 23 and 17 characters; 1.5px ink-muted bottom border that turns accent on focus; placeholder ink-muted). The timeline is a radiogroup of three buttons ("in 6 weeks" checked by default, "by next May", "when it's ready", with a space before the second and " / " before the third); each button is ink-muted with a button-blue (#1E86AC) highlight behind it (inset .12em −.1em .04em, radius .22em, scaleX 0 → 1 from the left over .5 s) shown on hover and when checked, which also turns its text white; clicking selects it.
  - Note "GOES TO ME@NOAELLSWORTH.COM. NOA REPLIES, ALWAYS." in the kicker style.
  - Actions row (gap 14u): two 44u round ghost buttons (inset 1px line ring, ink-soft icon 20u, ring 1.5px ink on hover) — an eight-ray asterisk ("Copy this brief": copies the composed sentence to the clipboard and shows "Brief copied" in accent mono 11u for 1.6 s) and a target/orbit icon ("Share this brief": the Web Share API, or copy as a fallback) — then the send button "Send to Noa ↗": 40u tall pill, padding 0 22u, button-blue #1E86AC background (hover #2597C0), white Geist Mono 13u. The button is magnetic: on mouse move it translates by 0.3 × the x offset and 0.4 × the y offset from its centre, resetting on leave. Submitting opens `mailto:me@noaellsworth.com` with subject "A new brief" and body "Hi Noa, I'm creating <what> for <who>, and I want it <when>. Could we talk?" (empty blanks fall back to their placeholders).
- Under the panel: "WORKED AT" kicker (padding 24u 53u 26u) and two wordmarks 48u apart, Newsreader 27u: a wave line icon + "Fernway" and a peak line icon + "Quill Labs" (icons 42u wide, ink-soft, 1.6px strokes). Fades up with .7 s delay.

## 8. Opening sequence (Home)

| Time | What happens |
|---|---|
| 0 | Full-screen loader (fixed, z 100, page-black #0A0E11 background, light #EEF4F6 text). Top-left (3.2vh, 4vw), "Noa." in Newsreader clamp(64px, 9vw, 150px), line-height .95, −0.03em: each letter is in a mask and rises from translateY(105%) rotate(8deg) to rest over 1 s main ease with delays 0.10 / 0.18 / 0.26 / 0.34 s. Bottom-right (4vh, 5vw): the caption types "LOADING SITES" one character every 45 ms starting at 350 ms (Geist Mono 12px, .14em, ink-soft); below it a three-digit odometer (Geist Mono clamp(80px, 12vw, 180px), −0.09em tracking, each digit a column of 0–9 that slides .7 s main ease; unused leading digits hidden) rises into its mask over .9 s with .2 s delay, followed by a small "%". Bottom-left: a 44px round skip button "↗". |
| 0–2.6 s | Formation goes 0 → 1 linearly over 2.6 s: cards sweep around the small tilted ring one after another (placement formula above) above the loader (the wall and frame are z 101 with the frame clip open and its scene layers hidden). Meanwhile the odometer counts to (posters loaded ÷ 16) × 100, each change tweened over .65 s main ease; a 9 s failsafe forces 100%. |
| reveal (formation done and all posters loaded) | The loader fades out over .9 s and is removed after 1 s; the odometer slides up out of its mask (.5 s, cubic-bezier(.6,0,.8,.4)); the frame drops its open clip and animates to the rounded frame (1.1 s); its scene layers fade in (.9 s) and the mist rises (1.6 s); expansion goes 0 → 1 over 1.9 s with cubic-bezier(.5,0,.15,1); the loader "Noa." flies to the nav's "Noa" over 1.3 s with cubic-bezier(.65,0,.35,1) (translate to the target's top-left and scale by the ratio of font sizes) while its "." fades out over .5 s; when it lands, the real wordmark and nav fade in and the flying copy is removed. |
| reveal + 1.05 s | The page is marked "entered": sentence words rise (staggered), underlines draw in (1 s, delayed .35 s after each word), superscripts fade in, stats fade up. |
| reveal + 1.9 s | Expansion complete: the ring becomes interactive (wheel, drag, hover), its slot mapping follows rotation, and the constant 0.3°/frame auto-spin starts. |

Escape, Tab or the skip button (1px rgba(238,244,246,.16) ring) jumps straight to the final state. With reduced motion, or when the page is opened directly on #build, the intro is skipped entirely.

## 9. Views and routing

The two views are sections with ids view-home and view-build (not "home"/"build", so the #build hash never scroll-jumps). Links carry data-go="home"/"build"; clicking one shows that view, hides the other, plays a .6 s opacity fade-in on the shown one, updates aria-current in the nav, pushes #home or #build to history (back/forward work), scrolls to top, re-runs the Build entrance when entering Build, and switches the sea video so only the visible view's video plays (it starts loading the first time its view is shown). Opening the URL with #build lands on Build.

## 10. Phone and tablet (≤ 820 px)

Unit becomes 100vw/390. Nav 64 px tall, padding 0 16px, wordmark 24px, links 11px with 7px gap. Home: top row becomes one column (14px row gap, padding 4px 16px 16px); the sentence is clamp(26px, 7.4vw, 32px) with line-height 1.12, the forced line breaks and superscripts are removed so it reflows naturally; stats lose the outer line, columns get 16px side padding and a 6px gap, numbers 26px, labels 10px. The frame gets margin 0 10px 10px and radius 20px; the ring's wall-scale is 0.8. Build: panel margin 0 10px, auto height with min-height 100svh − 170px, bottom padding 22px, radius 20px; headline 46px/42px with 34px top margin and 12px side padding; the brief is full width minus 24px, padding 20px 18px, radius 14px, gap 12px, kicker 10px, sentence 22px/36px with its desktop line breaks removed and blanks at 0.44em per character; ghost buttons 40px (18px icons); send 40px tall, 12px text, padding 0 18px, never wrapping; "worked at" padding 18px 20px 24px, wordmarks 22px with 34px icons and 28px gap. There is no horizontal scrolling at any width from 320 px up.

## 11. Reduced motion

`prefers-reduced-motion: reduce` hides the loader, stops the petals, motes and grain jitter, shows all text instantly with no transitions on masks, underlines, markers, frames or labels, keeps the scene as the still image (videos never play), keeps the ring static at its final shape, and makes wheel/drag move it directly without the spring. Changing the setting live re-applies this.

## 12. Acceptance checklist

- At 1440×900 after the intro: the sentence occupies three lines between about y 100 and y 225, the stats sit at the right behind a vertical line, the frame starts near y 255, and about seven landscape cards are visible in a gently curved row over the water with reflections, the outer ones larger and cut by the frame edge.
- The intro reads in order: name rises, count runs to 100, ring forms tilted above the loader, loader fades while the ring opens around you, the clip closes to the rounded frame and "Noa." lands in the nav.
- Wheel and drag spin the ring with spring easing; hovering a card slows the spin, tilts the card toward the cursor and reveals its frame and label; clicking opens the motionsites page.
- Hovering each sentence choice dims the rest, sweeps its marker, dims other worlds' cards and shows the matching preview; "chat with Noa" shows the dark assistant card.
- Build shows the centred headline, the brief with working blanks, radio chips, copy, share, magnetic send and mailto.
- The sea video loops on whichever view is showing; the still shows until it plays.
- No horizontal scrollbar at any size; layouts hold at 320, 390, 768, 1024×768 and 1440×900.