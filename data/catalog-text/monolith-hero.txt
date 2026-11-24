# Prompt: recreate the Stratum hero page exactly

Recreate this exact single-page real-estate hero site. This is a fidelity task, not a redesign. Implement the supplied content, assets, CSS, animations and interactions exactly as specified. Build only this one page. Keep it local; do not publish or deploy it. Do not add sections, headers, footers, cards, forms, extra buttons, extra links, extra animations or extra copy.

The complete `index.html` appended at the end of this prompt is the authoritative specification. Copy it byte-for-byte. Everything above it describes that file so you can check your work; if anything here disagrees with the file, the file wins.

The page is static HTML with inline CSS and JS: no framework, no build step, no dependencies, no external requests at runtime (no Google Fonts, no CDN, no analytics).

---

## 1. File structure

```
index.html                     # the page: inline <style> and one inline <script> IIFE
README.md
assets/
  fonts/inter-s-400.woff2      # Inter Regular, subset       (7,556 bytes)
  fonts/inter-s-700.woff2      # Inter Bold, subset          (7,756 bytes)
  fonts/chakra-s-700.woff2     # Chakra Petch Bold, subset   (4,720 bytes)
  img/background.webp          # hero still, 1586 x 992      (52,084 bytes)
  video/background.mp4         # VISION scene       (1,351,213 bytes, 8.04 s)
  video/expression.mp4         # EXPRESSION scene   (2,335,010 bytes, 10.04 s)
  video/craftsmanship.mp4      # CRAFTSMANSHIP scene(3,839,784 bytes, 10.04 s)
  video/refinement.mp4         # REFINEMENT scene   (2,343,776 bytes, 10.04 s)
  video/balance.mp4            # BALANCE scene      (1,852,238 bytes, 16.04 s)
  video/origin.mp4             # ORIGIN scene       (4,591,643 bytes, 12.04 s)
```

Serve it over HTTP (for example `npx http-server . -p 8080 -c-1` or `python3 -m http.server 8080`). Opening `index.html` from `file://` also works; the page needs no fetch calls.

---

## 2. Fonts (exact)

Three self-hosted WOFF2 subsets. Each covers exactly 98 code points: U+0020–U+007E (printable ASCII) plus U+2018 and U+2019 (curly single quotes). Use these family names, weights and `font-display:block`:

```css
@font-face{font-family:'Inter S';src:url(assets/fonts/inter-s-400.woff2) format('woff2');font-weight:400;font-style:normal;font-display:block}
@font-face{font-family:'Inter S';src:url(assets/fonts/inter-s-700.woff2) format('woff2');font-weight:700;font-style:normal;font-display:block}
@font-face{font-family:'Chakra S';src:url(assets/fonts/chakra-s-700.woff2) format('woff2');font-weight:700;font-style:normal;font-display:block}
```

| File | Source font | Used for |
|---|---|---|
| `inter-s-400.woff2` | Inter v4.001 (rsms/inter), Regular 400 | Paragraph (`.blurb`) |
| `inter-s-700.woff2` | Inter v4.001, Bold 700 | Headline (`.headline`) |
| `chakra-s-700.woff2` | Chakra Petch Bold 700 (Google Fonts, OFL, v1.000) | Every label: nav links, ENTER, MENU, index rail, CTA, dock (`.lbl`, `.index a`) |

If the original files are available, copy them unchanged. Otherwise rebuild equivalents with fontTools, from the Inter 4.0 release (github.com/rsms/inter, static `Inter-Regular.ttf` and `Inter-Bold.ttf`) and `ChakraPetch-Bold.ttf` from github.com/google/fonts (`ofl/chakrapetch`):

```bash
pyftsubset Inter-Regular.ttf     --unicodes="U+0020-007E,U+2018,U+2019" --flavor=woff2 --output-file=assets/fonts/inter-s-400.woff2
pyftsubset Inter-Bold.ttf        --unicodes="U+0020-007E,U+2018,U+2019" --flavor=woff2 --output-file=assets/fonts/inter-s-700.woff2
pyftsubset ChakraPetch-Bold.ttf  --unicodes="U+0020-007E,U+2018,U+2019" --flavor=woff2 --output-file=assets/fonts/chakra-s-700.woff2
```

Body font stack: `'Inter S',-apple-system,'Helvetica Neue',Arial,sans-serif`. Label stack: `'Chakra S','Inter S',sans-serif`. Rendering: `-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:geometricPrecision`. Do not substitute other typefaces or synthesize bold.

---

## 3. Background still (exact)

`assets/img/background.webp` is 1586 × 992 (16:10). It shows a monolithic pale stone cube with a warm-lit arched doorway and steps, standing in a still dark lake between two rocky mountains under a deep navy night sky, with the golden reflection of the arch on the rippled water. It is used twice:

1. As the CSS background of `.bg` (`background-size:cover`, centred): the fallback under the videos.
2. As the `poster` of the first (VISION) video.

A lossless PNG copy of this exact image is hosted here (it was the input to every Seedance generation below):

```
https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b5f79c5a-2ebd-41ef-865e-24c660ac98bd.png
```

If the original `.webp` isn't available, download that PNG and convert it: `cwebp -q 90 background.png -o assets/img/background.webp`. The result is the same image but not byte-identical.

---

## 4. Videos (exact CloudFront sources and exact derivative commands)

All six scenes were generated with Seedance 2.5 (Higgsfield) from the image above, at 1920 × 1080, 24 fps, HEVC, no audio. Use these complete, literal CloudFront URLs. Do not substitute other clips, omit path segments, escape the underscores or alter the filenames.

| Chapter | Local file | Complete source URL | Source length |
|---|---|---|---|
| VISION | `background.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_024808_abbfad57-4496-4906-9abc-49f0d153d287.mp4` | 8.04 s |
| EXPRESSION | `expression.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_025948_2befd859-101e-49a4-8cb0-cdbb28cb11a7.mp4` | 5.04 s |
| CRAFTSMANSHIP | `craftsmanship.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_071544_17524fe8-2f07-4fbc-8a55-47518532df6f.mp4` | 10.04 s |
| REFINEMENT | `refinement.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_025948_9fe460cc-21c2-476c-8e61-6bf57c2d6775.mp4` | 5.04 s |
| BALANCE | `balance.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_072855_ba37e93c-1119-4b93-a3cd-6b29ced17dc2.mp4` | 8.04 s |
| ORIGIN | `origin.mp4` | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_031433_64aea4c7-c53b-4e13-a1fc-bd73673b4fa5.mp4` | 12.04 s |

What each clip shows:

- **VISION:** locked-off camera. The water ripples, the arch's reflection shimmers and the doorway light breathes. It starts and ends on the reference frame, so it loops seamlessly.
- **EXPRESSION:** the camera orbits steadily to the right around the cube, revealing its shaded right face, with the mountains shifting in parallax.
- **CRAFTSMANSHIP:** a full dramatic orbit. The camera circles right, rises high, passes behind the cube (plain walls) and comes back around to the front, ending on the reference framing.
- **REFINEMENT:** the camera descends from a high aerial view of the water channel down into the reference framing.
- **BALANCE:** a near-still frame. The light in the arch flickers subtly and the water barely moves.
- **ORIGIN:** the camera moves out to the left, rises high above the cube, and returns to the reference framing.

Download every source, then make the local H.264 files with exactly these commands. Clips that only move one way are ping-ponged (played forward, then reversed without repeating the turn frame) so they loop without a jump. Clips that already return to their first frame are only re-encoded.

```bash
mkdir -p src assets/video
curl -L -o src/vision.mp4        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_024808_abbfad57-4496-4906-9abc-49f0d153d287.mp4'
curl -L -o src/expression.mp4    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_025948_2befd859-101e-49a4-8cb0-cdbb28cb11a7.mp4'
curl -L -o src/craftsmanship.mp4 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_071544_17524fe8-2f07-4fbc-8a55-47518532df6f.mp4'
curl -L -o src/refinement.mp4    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_025948_9fe460cc-21c2-476c-8e61-6bf57c2d6775.mp4'
curl -L -o src/balance.mp4       'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_072855_ba37e93c-1119-4b93-a3cd-6b29ced17dc2.mp4'
curl -L -o src/origin.mp4        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260928_031433_64aea4c7-c53b-4e13-a1fc-bd73673b4fa5.mp4'

# VISION: plain re-encode, CRF 20
ffmpeg -v error -y -i src/vision.mp4 -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart assets/video/background.mp4

# ping-pong (forward + reversed, turn frame not repeated), CRF 23
PP="[0:v]split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1,fps=24"
ffmpeg -v error -y -i src/expression.mp4 -filter_complex "$PP" -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart assets/video/expression.mp4
ffmpeg -v error -y -i src/refinement.mp4 -filter_complex "$PP" -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart assets/video/refinement.mp4
ffmpeg -v error -y -i src/balance.mp4    -filter_complex "$PP" -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart assets/video/balance.mp4

# already return to their first frame: plain re-encode, CRF 23
ffmpeg -v error -y -i src/craftsmanship.mp4 -vf fps=24 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart assets/video/craftsmanship.mp4
ffmpeg -v error -y -i src/origin.mp4        -vf fps=24 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart assets/video/origin.mp4
```

Expected results: all 1920 × 1080, 24 fps, H.264 (yuv420p), no audio track; durations 8.04 / 10.04 / 10.04 / 10.04 / 16.04 / 12.04 s. H.264 is required: the HEVC sources do not play in Firefox or in many Windows and Linux browsers.

### Video element rules

- Every video lives inside `.bg`, stacked, `muted loop playsinline aria-hidden="true"`, with no controls, no audio and no loading UI.
- **VISION** (the first video) has `class="on"`, `src`, `poster="assets/img/background.webp"`, `autoplay` and `preload="auto"`.
- **The other five** have no `src`: only `data-src="assets/video/<chapter>.mp4"` and `preload="none"`. They load only when their chapter is first chosen.
- Every video has `data-chapter="<id>"`, where the ids are `vision`, `expression`, `craftsmanship`, `refinement`, `balance` and `origin`.

### Video framing (exact)

The clips aren't cropped with object-fit. The video box itself is sized to cover the stage at 16:9, then scaled up 10% and shifted right, because the arch sits about 4% left of centre in the footage:

```css
.bg video{position:absolute;left:50%;top:50%;display:block;
          width:max(100vw, 177.78vh);height:max(100vh, 56.25vw);
          transform:translate(-45.5%,-50%) scale(1.1)}
.bg video{opacity:0;transition:opacity .9s ease}
.bg video.on{opacity:1}
```

This keeps the cube's centre at 50.0% of the viewport width at every aspect ratio (verified at 1600×600, 800×608 and 375×812) with no exposed edge.

---

## 5. Visual design (exact values)

Everything is measured in reference pixels of a 1280 × 800 canvas. `--u` is one reference pixel and scales with the viewport; `--t` is the type/content unit.

```css
:root{
  --u: clamp(0.68px, min(100vw / 1280, 100dvh / 800), 1.72px);  /* 100vh fallback declared first */
  --t: var(--u);
  --line: rgba(255,255,255,.13);
  --cream:#e8d1cb;
  --ink:#15131b;
  --hair: max(1px, calc(1 * var(--u)));
  --nudge: calc(1 * var(--t));
  --e-mask: cubic-bezier(.16,1,.3,1);
  --e-line: cubic-bezier(.65,0,.35,1);
  --e-soft: cubic-bezier(.22,.61,.36,1);
}
```

- **Page:** `html,body{height:100%}`; body `margin:0; background:#04070d; overflow:hidden`. `.stage` is `position:fixed; inset:0; overflow:hidden`. There's no scrolling: the page is exactly one screen.
- **Frame:** inset 30u from left, top and right, and 31u from the bottom. It's a 1px hairline in `--line` with a 26u diagonal chamfer at all four corners; the corners are drawn with linear-gradient diagonals 1.3px thick.
- **Logo:** the "STRATUM" wordmark as one inline SVG path (viewBox 0 0 163 19), `fill:#fff`, at left 24t, top 22t, 163t × 19t. It links to `#` with `aria-label="Stratum — home"`.
- **Masthead** (right 11t, top 12t, height 41t):
  - **Nav links:** STORY, CONCEPTS, PROCESS, CONNECT, FILM (Chakra 10t, colour #e3e8f2 at .94 opacity, gap 14.4t).
  - **ENTER pill:** 87t × 41t, `rgba(255,250,246,.05)` background with a 12t backdrop blur, and a 3-block pixel icon.
  - **MENU pill:** 90t × 41t, cream #e8d1cb, top-right corner cut 15t, ink #15131b label, and a 2×2 rounded-square icon.
- **Index rail:** left 10.5t, vertically centred. Six items, 26.6t apart, Chakra 10t, letter-spacing 1.3t: VISION, EXPRESSION, CRAFTSMANSHIP, REFINEMENT, BALANCE, ORIGIN. Inactive items are `rgba(232,238,250,.3)`; active and hover are `#e6eaf5`. The active item has a 6t × 7t white marker 13.5t to its left.
- **Hero** (centred column, bottom `max(7.98%, 59t)`):
  - **Headline:** `<h1>`, Inter 700, 31.5t / 32t line height, letter-spacing 1.53t, uppercase, white. It's two rows, each an `.hrow` (overflow hidden) wrapping an `.hrise`.
  - **Paragraph:** Inter 400, 11.1t / 19.7t, `rgba(224,232,245,.72)`, max-width 420t, 15.56t above it, four hand-set lines separated by `<br>`.
  - **CTA** "UNCOVER OUR APPROACH": 190t × 41t, 23t above it. It has a glass fill (`rgba(255,255,255,.035)`, 12t blur) clipped to a chamfered octagon, and an SVG outline path `M3.5.5 H179.5 L189.5 10.5 V37.5 L186.5 40.5 H10.5 L.5 30.5 V3.5 Z` stroked `rgba(255,255,255,.085)`.
- **Dock** (bottom row, height 47t): a top hairline and two vertical dividers at 116t from the left and 139t from the right. The three cells are:
  - **AUDIO ON button:** a speaker icon with two wave strokes that fade out and an × slash that fades in when muted.
  - **SCROLL TO UNCOVER link:** centred, with a double-chevron icon.
  - **TALK WITH US link:** with a speech-bubble icon holding three dots.
- **Hover states:** nav links go to white; ENTER to `.075` white; the CTA glass to `.075` and its outline to `.2`; dock items to white; index items to `#e6eaf5`. All transitions are .25–.3s ease. Focus ring: `1.5t solid #e8d1cb`, offset 3t.

---

## 6. Exact visible copy

Keep spelling, capitalisation and punctuation exactly. Note the apostrophe in "India's": the initial HTML paragraph and the meta description use a straight apostrophe (`India's`), but the VISION entry in the JS `COPY` table uses a curly one (`India’s`, written `\u2019`). Reproduce both as written.

- **Nav:** STORY · CONCEPTS · PROCESS · CONNECT · FILM · ENTER · MENU (MENU reads CLOSE when the mobile panel is open)
- **Rail:** VISION · EXPRESSION · CRAFTSMANSHIP · REFINEMENT · BALANCE · ORIGIN
- **CTA:** UNCOVER OUR APPROACH
- **Dock:** AUDIO ON (AUDIO OFF when toggled) · SCROLL TO UNCOVER · TALK WITH US
- **Document title:** `Stratum — We raise the spirit of each street`. **Meta description:** `For over 45 years, Stratum has planned some of India's most considered real estate developments.` `lang="en"`.

Chapter copy: the headline is two lines, rendered uppercase by CSS. The paragraph is four lines, separated by `<br>`.

| Chapter | Headline line 1 / line 2 | Paragraph lines |
|---|---|---|
| VISION (initial) | `We raise the spirit ` / `of each street` | For over 45 years, Stratum has planned some of India’s most considered real / estate developments, unifying modern Residential, Commercial and / Industrial concepts. From the initial brief to reality, places for people to / inhabit. |
| EXPRESSION | `Every facade ` / `tells its story` | Architecture is how a place introduces itself. We give each project a / clear voice, shaped by its street, its climate and the people who / will live with it every day, so that it is recognised long after it / is built. |
| CRAFTSMANSHIP | `Built by hand, ` / `made to last` | Our teams work with stone, timber and light the way a craftsman / works a single piece, testing every joint and every surface until / the detail holds, from the first foundation to the final finish of / each room. |
| REFINEMENT | `Nothing extra, ` / `nothing missing` | Each plan passes through many hands before it is drawn for the last / time. We remove what distracts and sharpen what matters, until the / building feels inevitable, calm and quietly resolved from every / angle. |
| BALANCE | `Where land meets ` / `the life around it` | We weigh density against open ground, commerce against quiet and / ambition against place, so that each development works in harmony / with the city around it, today and for the generations that follow / after us. |
| ORIGIN | `Rooted in the ` / `soil we build on` | Stratum grew from a simple belief: that good buildings make good / streets, and good streets make good cities. Forty-five years on, it / still guides every brief we accept and every place we hand over to / its people. |

(The trailing space at the end of each first headline line is intentional.)

---

## 7. Entrance animation (runs once on load)

An inline `<script>` in `<head>` adds `class="anim"` to `<html>` unless `prefers-reduced-motion: reduce` is set, and removes it after 3200 ms; the boot script also removes it at 2200 ms. All entrance CSS is scoped under `.anim`. The photograph and video never move during the entrance.

Keyframes:

```css
@keyframes drawX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes drawY{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes maskUp{from{transform:translateY(112%)}to{transform:translateY(0)}}
@keyframes settle{from{opacity:0;transform:translateY(calc(7*var(--t)))}to{opacity:1;transform:none}}
@keyframes markIn{from{transform:translateY(-50%) scaleX(0)}to{transform:translateY(-50%) scaleX(1)}}
@keyframes settleC{from{opacity:0;transform:translate(-50%,calc(7*var(--t)))}to{opacity:1;transform:translateX(-50%)}}
```

Timeline (delay, duration and easing are exact):

| Delay | Element | Animation |
|---|---|---|
| 40 ms | Frame top line (from left), left line (from top) | drawX / drawY .5s `--e-line` |
| 160 ms | Logo SVG inside an overflow-hidden box | maskUp .8s `--e-mask` |
| 200 ms | Frame bottom line (from right), right line (from bottom) | drawX / drawY .5s `--e-line` |
| 300 ms | ENTER pill | settle .56s `--e-soft` |
| 340 ms | Nav links group | fadeIn .4s linear |
| 360 ms | MENU pill | settle .56s `--e-soft` |
| 420 ms | Headline row 1 | maskUp .9s `--e-mask` |
| 520 ms | Headline row 2 | maskUp .9s `--e-mask` |
| 550 ms | Frame corners | fadeIn .3s linear |
| 600 ms | Index rail | fadeIn .45s linear |
| 640 ms | Active marker | markIn .42s `--e-soft` |
| 700 ms | Paragraph | settle .72s `--e-soft` |
| 860 ms | CTA | settle .62s `--e-soft` |
| 920 ms | Dock rule (from left) | drawX .52s `--e-line` |
| 960 ms | AUDIO | settle .52s `--e-soft` |
| 1020 ms | SCROLL TO UNCOVER | settleC .52s `--e-soft` |
| 1060 ms | Dock dividers (from top) | drawY .36s `--e-line` |
| 1080 ms | TALK WITH US | settle .52s `--e-soft` |

**Decode labels (JS):** every `.t` label resolves left-to-right in exactly 400 ms, whatever its length.

- **The effect:** resolved characters trail a band 3.6 characters wide of random A–Z letters, re-rolled every 45 ms, with nothing rendered past the band.
- **Width:** each label's natural width is measured and pinned first (`reserve()`, redone 160 ms after a resize), so a scramble never reflows its row.
- **Fallback:** a timeout at duration + 500 ms force-settles the label if frames are throttled.
- **Boot schedule:** after `document.fonts.ready`: ENTER at 330 ms, MENU at 390 ms, nav links from 360 ms (45 ms stagger), active index item at 660 ms, other index items from 720 ms (55 ms stagger), CTA at 900 ms, dock labels from 1000 ms (60 ms stagger). Every label is force-settled at 2600 ms.
- **Hover:** hovering any link or button re-runs the decode on its label.

**Reduced motion:** `@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`. The decode is skipped (labels appear settled), the `anim` class is never added, and parallax is off.

---

## 8. Interactions

1. **Scene parallax (mouse only, not touch):**
   - **Movement:** `.bg` drifts against the pointer on a long ease, lerping 0.045 per frame toward the target. The offset is `dx = -cx·W·0.0156` and `dy = -cy·H·0.015`, where cx and cy run -1…1 from the pointer position.
   - **Cover scale:** `2·max(|dx|/W, |dy|/H)`, plus `0.014·max(0, cy)` extra zoom as the pointer moves toward the bottom.
   - **Stopping:** the requestAnimationFrame loop stops when the pointer is within 0.0004 of the target. When the pointer leaves the document, the target resets to centre.
2. **Chapter switching** (clicking a rail item):
   - **Rail:** prevents navigation, moves `.on` and `aria-current="true"` to the clicked item, and re-decodes its label.
   - **Video:** the chapter's video gets `preload='auto'` and its `data-src` as `src`, then `load()` is called. On `canplay` (or immediately if `readyState >= 3`), and only if that chapter is still the chosen one, the video rewinds to 0 and plays. It gets `.on` (a .9s opacity fade over the previous one), every other `.on` video loses the class, and each is paused 950 ms later if it's still off.
   - **Copy:** `.hero` gets `.swapping`, so each `.hrise` slides down to `translateY(112%)` inside its mask (.5s `--e-mask`) and `.blurb` fades to 0 while dropping 7t (.4s). After 500 ms (0 ms under reduced motion), the two headline rows and the four paragraph lines (joined by `<br>`) are replaced, a reflow is forced, and `.swapping` is removed, so the copy rises back in.
   - **Rapid clicks:** a newer choice always wins; stale `canplay` handlers and pending swaps are ignored or cancelled.
   - **Mobile:** the headline rows are inline there, so the whole headline fades (opacity .4s) instead of masking.
3. **Audio toggle:** it flips `aria-pressed`, toggles `.muted` (the waves fade out and the slash fades in), and decodes the label between AUDIO ON and AUDIO OFF. The page plays no sound; it's a UI state only.
4. **MENU at 830px or narrower:**
   - **The panel:** the same nav set becomes a panel hung below the MENU pill (`rgba(11,16,26,.74)` with a 16t blur, chamfered corners, a .34s fade and slide). ENTER becomes a full-width row.
   - **Opening:** focuses the first link, and the label decodes between MENU and CLOSE.
   - **Closing:** Escape (focus returns to MENU), clicking outside, clicking a link, or resizing wider than 830px.

---

## 9. Responsive rules (exact breakpoints)

- **1152px or narrower (tablet):**
  - **Units:** `--u` is clamped to .8–1.1px, and `--t = max(--u, clamp(.9px, .9px + (1152px - 100vw)·.00042, 1.12px))`.
  - **Pills and CTA:** size to their labels. ENTER padding is 0 19t 0 21t, MENU 0 24t 0 21t, CTA 0 19t.
  - **Dock:** becomes a space-between flex row. The dividers become the cell borders of AUDIO (right) and TALK (left).
  - **Touch targets:** nav gap 17t; index links get 7t vertical padding.
- **At most 1152px wide and wider than 6/5 aspect:** the hero gets 150t side padding.
- **At most 1152px wide and 6/5 aspect or narrower:** the rail moves up to `top:32%`, and the hero gets 22t side padding.
- **830px or narrower:** the nav collapses into the MENU panel (section 8.4).
- **548px or narrower (mobile):**
  - **Units:** `--u` is clamped to .62–1.1px from `min(100vw/500, 100dvh/820)`, and `--t` is clamped to 1.06–1.12px from `100vw/489`.
  - **Frame:** 22u inset.
  - **Logo:** fluid, `min(163t, 42vw)` wide.
  - **Rail:** docks under the wordmark at top 70t, 24t item height, inactive colour `.42`.
  - **Hero:** bottom `max(9%, 59t)`, 18t side padding.
  - **Headline:** `text-wrap:balance`, rows inline; the entrance is a single `settle .8s` at 420 ms.
  - **Paragraph:** max-width 400t, `<br>` hidden.
- **370px or narrower:** the dock wraps. AUDIO and TALK split the first row at 44t high; SCROLL TO UNCOVER takes its own 40t row with a top hairline, and the hero moves to bottom 96t.
- **Height 560px or less, or 370px wide and 640px tall or less:** the paragraph is hidden.

---

## 10. Validation checklist

- At 1280 × 800 the page matches the reference geometry exactly: frame 30u inset, logo at 24/22, masthead right 11, rail left 10.5.
- The VISION video autoplays, loops seamlessly and sits with the cube's centre at 50% viewport width at 1600×600, 800×608 and 375×812, with no exposed edge.
- Clicking each rail item crossfades to that chapter's clip and swaps to its headline and paragraph; only one video is playing afterwards. Rapid clicks end on the last choice.
- The entrance sequence ends by about 1.52 s; nothing animates afterwards except the video, hover states and the parallax drift.
- No console errors, and no network requests except to the local assets.

---

## AUTHORITATIVE SOURCE FILE FOLLOWS

File: `index.html` (copy exactly):

````html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Stratum — We raise the spirit of each street</title>
<script>if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.className="anim";setTimeout(function(){document.documentElement.classList.remove("anim")},3200);}</script>
<meta name="description" content="For over 45 years, Stratum has planned some of India's most considered real estate developments.">
<style>
/* ---------- embedded faces ---------- */
@font-face{font-family:'Inter S';src:url(assets/fonts/inter-s-400.woff2) format('woff2');font-weight:400;font-style:normal;font-display:block}
@font-face{font-family:'Inter S';src:url(assets/fonts/inter-s-700.woff2) format('woff2');font-weight:700;font-style:normal;font-display:block}
@font-face{font-family:'Chakra S';src:url(assets/fonts/chakra-s-700.woff2) format('woff2');font-weight:700;font-style:normal;font-display:block}

/* ---------- reference unit ----------
   Every measurement below is a real pixel value read off the 1280x800 reference.
   --u is the reference pixel: 1px at 1280x800, and it scales with the viewport,
   so proportions are preserved while the chrome stays anchored to the real edges. */
:root{
  --u: clamp(0.68px, min(100vw / 1280, 100vh / 800), 1.72px);
  --t: var(--u);   /* desktop: content and structure share one scale */
  --u: clamp(0.68px, min(100vw / 1280, 100dvh / 800), 1.72px);
  --line: rgba(255,255,255,.13);
  --cream:#e8d1cb;
  --ink:#15131b;
  --hair: max(1px, calc(1 * var(--u)));
  --nudge: calc(1 * var(--t));   /* Chrome centres these caps ~1px high */
}
*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;background:#04070d;overflow:hidden;
  font-family:'Inter S',-apple-system,'Helvetica Neue',Arial,sans-serif;
  -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  text-rendering:geometricPrecision;
}
.stage{position:fixed;inset:0;overflow:hidden}

/* ---------- hero image: graded exactly as the reference, cover, centred ---------- */
.bg{position:absolute;inset:0;background-image:url(assets/img/background.webp);
    background-size:cover;background-position:50% 50%;background-repeat:no-repeat}
/* the video box is sized to cover the stage at 16:9 (no object-fit crop, so it can
   move without exposing an edge). The arch sits ~4% left of centre in the clip:
   scale up 10% and shift the box right by 4.5% of its own width. */
.bg video{position:absolute;left:50%;top:50%;display:block;
          width:max(100vw, 177.78vh);height:max(100vh, 56.25vw);
          transform:translate(-45.5%,-50%) scale(1.1)}
/* one clip per chapter, stacked; the chosen one fades up over the last */
.bg video{opacity:0;transition:opacity .9s ease}
.bg video.on{opacity:1}
/* chapter change: the headline drops back into its mask and the paragraph
   settles out, the copy is swapped, and both return the way they entered */
.hero .hrise{transition:transform .5s var(--e-mask)}
.hero .blurb{transition:opacity .4s ease, transform .4s ease}
.swapping .hrise{transform:translateY(112%)}
.swapping .blurb{opacity:0;transform:translateY(calc(7*var(--t)))}

/* ---------- frame: 30u inset, 1px hairline, 26u chamfer on all four corners ---------- */
.frame{position:absolute;left:calc(30*var(--u));top:calc(30*var(--u));
       right:calc(30*var(--u));bottom:calc(31*var(--u))}
.ln{position:absolute;background:var(--line)}
.ln-t{left:calc(26*var(--u));right:calc(26*var(--u));top:0;height:var(--hair)}
.ln-b{left:calc(26*var(--u));right:calc(26*var(--u));bottom:0;height:var(--hair)}
.ln-l{top:calc(26*var(--u));bottom:calc(26*var(--u));left:0;width:var(--hair)}
.ln-r{top:calc(26*var(--u));bottom:calc(26*var(--u));right:0;width:var(--hair)}
.cn{position:absolute;width:calc(26*var(--u));height:calc(26*var(--u))}
.cn-tl{left:0;top:0;background:linear-gradient(to bottom right,transparent calc(50% - .65px),var(--line) calc(50% - .65px),var(--line) calc(50% + .65px),transparent calc(50% + .65px))}
.cn-br{right:0;bottom:0;background:linear-gradient(to bottom right,transparent calc(50% - .65px),var(--line) calc(50% - .65px),var(--line) calc(50% + .65px),transparent calc(50% + .65px))}
.cn-tr{right:0;top:0;background:linear-gradient(to bottom left,transparent calc(50% - .65px),var(--line) calc(50% - .65px),var(--line) calc(50% + .65px),transparent calc(50% + .65px))}
.cn-bl{left:0;bottom:0;background:linear-gradient(to bottom left,transparent calc(50% - .65px),var(--line) calc(50% - .65px),var(--line) calc(50% + .65px),transparent calc(50% + .65px))}

/* ---------- shared label face ---------- */
.lbl{font-family:'Chakra S','Inter S',sans-serif;font-weight:700;
     font-size:calc(10*var(--t));line-height:1;white-space:nowrap}
.t{position:relative;top:var(--nudge);display:inline-block;text-align:left;white-space:pre}
.bg{will-change:transform;transform-origin:50% 50%;backface-visibility:hidden}

/* ---------- masthead ---------- */
.logo{position:absolute;left:calc(24*var(--t));top:calc(22*var(--t));
      width:calc(163*var(--t));height:calc(19*var(--t));display:block}
.logo svg{width:100%;height:100%;display:block;fill:#fff}

.masthead{position:absolute;right:calc(11*var(--t));top:calc(12*var(--t));
          height:calc(41*var(--t));display:flex;align-items:center}
.navset{display:contents}
.links{display:flex;align-items:center;gap:calc(14.4*var(--t));margin-right:calc(18*var(--t))}
.links a{color:#e3e8f2;text-decoration:none;letter-spacing:calc(.1*var(--t));
         padding-left:calc(.1*var(--t));opacity:.94;transition:opacity .25s ease,color .25s ease}
.links a:hover{opacity:1;color:#fff}

.pill{height:calc(41*var(--t));display:flex;align-items:center;text-decoration:none;
      position:relative;cursor:pointer;border:0;padding:0}
.pill .ico{flex:none;display:block}
.enter{width:calc(87*var(--t));padding-left:calc(21*var(--t));
       background:rgba(255,250,246,.05);
       -webkit-backdrop-filter:blur(calc(12*var(--t)));backdrop-filter:blur(calc(12*var(--t)));
       transition:background .3s ease}
.enter:hover{background:rgba(255,250,246,.075)}
.enter .ico{width:calc(7*var(--t));height:calc(11*var(--t));fill:#f4f7ff}
.enter span{color:rgba(255,255,255,.93);margin-left:calc(7*var(--t));
            letter-spacing:calc(.33*var(--t))}

.menu{width:calc(90*var(--t));padding-left:calc(21*var(--t));background:var(--cream);
      clip-path:polygon(0 0, calc(100% - 15*var(--t)) 0, 100% calc(15*var(--t)), 100% 100%, 0 100%);
      transition:background .3s ease}
.menu:hover{background:var(--cream)}
.menu .ico{width:calc(10*var(--t));height:calc(10*var(--t));fill:var(--ink)}
.menu span{color:var(--ink);margin-left:calc(7*var(--t));letter-spacing:calc(.02*var(--t))}

/* ---------- section index ---------- */
.index{position:absolute;left:calc(10.5*var(--t));top:50%;transform:translateY(calc(-50% + 1.5*var(--t)));
       list-style:none;margin:0;padding:0}
.index li{height:calc(26.6*var(--t));display:flex;align-items:center;position:relative}
.index a{font-family:'Chakra S','Inter S',sans-serif;font-weight:700;font-size:calc(10*var(--t));
         line-height:1;letter-spacing:calc(1.3*var(--t));text-decoration:none;white-space:nowrap;
         color:rgba(232,238,250,.3);transition:color .3s ease}
.index a:hover{color:#e6eaf5}
.index .on a{color:#e6eaf5}
.index .on::before{content:"";position:absolute;left:calc(-13.5*var(--t));top:50%;
                   width:calc(6*var(--t));height:calc(7*var(--t));
                   transform:translateY(-50%);background:#fff}

/* ---------- hero ---------- */
.hero{position:absolute;left:0;right:0;bottom:max(7.98%, calc(59*var(--t)));
      display:flex;flex-direction:column;align-items:center;text-align:center}
.headline{margin:0;font-weight:700;font-size:calc(31.5*var(--t));line-height:calc(32*var(--t));
          letter-spacing:calc(1.53*var(--t));padding-left:calc(1.53*var(--t));
          color:#fff;text-transform:uppercase}
.blurb{margin:calc(15.56*var(--t)) 0 0;font-weight:400;font-size:calc(11.1*var(--t));
       line-height:calc(19.7*var(--t));color:rgba(224,232,245,.72);
       max-width:calc(420*var(--t))}
.cta{margin-top:calc(23*var(--t));position:relative;width:calc(190*var(--t));height:calc(41*var(--t));
     display:flex;align-items:center;justify-content:center;text-decoration:none}
.cta-glass{position:absolute;inset:0;background:rgba(255,255,255,.035);
  -webkit-backdrop-filter:blur(calc(12*var(--t)));backdrop-filter:blur(calc(12*var(--t)));
  clip-path:polygon(calc(3*var(--t)) 0, calc(100% - 10*var(--t)) 0, 100% calc(10*var(--t)),
                    100% calc(100% - 3*var(--t)), calc(100% - 3*var(--t)) 100%,
                    calc(10*var(--t)) 100%, 0 calc(100% - 10*var(--t)), 0 calc(3*var(--t)));
  transition:background .3s ease}
.cta:hover .cta-glass{background:rgba(255,255,255,.075)}
.cta-edge{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.cta-edge path{fill:none;stroke:rgba(255,255,255,.085);stroke-width:1;transition:stroke .3s ease}
.cta:hover .cta-edge path{stroke:rgba(255,255,255,.2)}
.cta-in{position:relative;display:flex;align-items:center}
.cta .ico{width:calc(7*var(--t));height:calc(11*var(--t));fill:#f2f6ff;flex:none}
.cta .t{margin-left:calc(6*var(--t));color:#e9eef7;letter-spacing:calc(.55*var(--t))}

/* ---------- dock ---------- */
.dock{position:absolute;left:0;right:0;bottom:0;height:calc(47*var(--t));--nudge:calc(1.6*var(--t))}
.dock .rule{position:absolute;left:0;right:0;top:0;height:var(--hair);background:var(--line)}
.dock .div{position:absolute;top:0;bottom:0;width:var(--hair);background:rgba(255,255,255,.21)}
.dock .div-l{left:calc(116*var(--t))}
.dock .div-r{right:calc(139*var(--t))}
.dock a,.dock button{display:flex;align-items:center;text-decoration:none;background:none;
      border:0;padding:0;cursor:pointer;color:rgba(255,255,255,.82);transition:color .3s ease}
.dock a:hover,.dock button:hover{color:#fff}
.audio{position:absolute;left:calc(26*var(--t));top:0;bottom:0}
.audio .ico{width:calc(14*var(--t));height:calc(11*var(--t));flex:none;fill:currentColor;stroke:currentColor}
.audio .wave{transition:opacity .25s ease}
.audio.muted .wave{opacity:0}
.audio .slash{opacity:0;transition:opacity .25s ease}
.audio.muted .slash{opacity:1}
.audio span{margin-left:calc(10*var(--t));letter-spacing:calc(.02*var(--t))}
.scroll{position:absolute;left:50%;transform:translateX(-50%);top:0;bottom:0}
.scroll .ico{width:calc(5*var(--t));height:calc(7*var(--t));flex:none;fill:currentColor;position:relative;top:calc(-1*var(--t))}
.scroll span{margin-left:calc(10*var(--t));letter-spacing:calc(-.23*var(--t))}
.talk{position:absolute;right:calc(24*var(--t));top:0;bottom:0}
.talk span{letter-spacing:calc(.12*var(--t))}
.talk .ico{width:calc(16*var(--t));height:calc(15*var(--t));margin-left:calc(11*var(--t));
           flex:none;fill:none;stroke:currentColor;stroke-width:1.6}

/* ================= ENTRANCE =================
   One sequence, once, on load. The photograph is the stage and never moves.
   Four behaviours only:
     DRAW    the frame and dock hairlines scale from their anchor — the
             architecture builds itself before anything is said
     MASK    wordmark and headline rise out of an overflow mask
     DECODE  every micro-label resolves with the site's own effect (JS)
     SETTLE  supporting copy, pills and controls arrive on a 7-unit lift

   Timeline (ms from first paint):
     40   frame top + left draw from the top-left corner
     160  wordmark masked rise
     200  frame right + bottom draw back toward it
     300  ENTER pill, 360 MENU pill
     340  nav group, labels decoding from 360
     420  headline line 1 masked rise, 520 line 2
     550  frame corners resolve
     600  index rail, 640 active marker, labels decoding from 660
     700  paragraph settles
     860  CTA settles, label decodes at 900
     920  dock rule draws, cells and labels follow to 1120
     ~1520 last motion ends. Nothing animates afterwards. */
:root{
  --e-mask: cubic-bezier(.16,1,.3,1);    /* expo-out: long, confident tail */
  --e-line: cubic-bezier(.65,0,.35,1);   /* a drawn stroke, not a fade */
  --e-soft: cubic-bezier(.22,.61,.36,1); /* power2-out for small settles */
}
@keyframes drawX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes drawY{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes maskUp{from{transform:translateY(112%)}to{transform:translateY(0)}}
@keyframes settle{from{opacity:0;transform:translateY(calc(7*var(--t)))}to{opacity:1;transform:none}}
@keyframes markIn{from{transform:translateY(-50%) scaleX(0)}to{transform:translateY(-50%) scaleX(1)}}

/* DRAW — two strokes leave the top-left corner, two answer from the bottom-right */
.anim .ln-t{transform-origin:left center;animation:drawX .5s var(--e-line) .04s both}
.anim .ln-l{transform-origin:center top;animation:drawY .5s var(--e-line) .04s both}
.anim .ln-b{transform-origin:right center;animation:drawX .5s var(--e-line) .2s both}
.anim .ln-r{transform-origin:center bottom;animation:drawY .5s var(--e-line) .2s both}
.anim .cn{animation:fadeIn .3s linear .55s both}

/* MASK — the wordmark rises inside its own box, no wrapper needed */
.anim .logo{overflow:hidden}
.anim .logo svg{animation:maskUp .8s var(--e-mask) .16s both}

/* SETTLE — masthead */
.anim .enter{animation:settle .56s var(--e-soft) .3s both}
.anim .menu{animation:settle .56s var(--e-soft) .36s both}
.anim .links{animation:fadeIn .4s linear .34s both}

/* MASK — the headline is the one moment that carries weight */
.headline .hrow{display:block;overflow:hidden}
.headline .hrise{display:block}
.anim .headline .hrise{animation:maskUp .9s var(--e-mask) both}
.anim .headline .hrow:first-child .hrise{animation-delay:.42s}
.anim .headline .hrow+.hrow .hrise{animation-delay:.52s}

/* the rail arrives as one group; its stagger is carried by the decoding labels */
.anim .index{animation:fadeIn .45s linear .6s both}
.anim .index .on::before{animation:markIn .42s var(--e-soft) .64s both}

.anim .blurb{animation:settle .72s var(--e-soft) .7s both}
.anim .cta{animation:settle .62s var(--e-soft) .86s both}

/* DRAW + SETTLE — the dock closes the composition */
.anim .dock .rule{transform-origin:left center;animation:drawX .52s var(--e-line) .92s both}
.anim .dock .div{transform-origin:center top;animation:drawY .36s var(--e-line) 1.06s both}
.anim .audio{animation:settle .52s var(--e-soft) .96s both}
@keyframes settleC{from{opacity:0;transform:translate(-50%,calc(7*var(--t)))}
                   to{opacity:1;transform:translateX(-50%)}}
.anim .scroll{animation:settleC .52s var(--e-soft) 1.02s both}
.anim .talk{animation:settle .52s var(--e-soft) 1.08s both}

/* ---------- a11y ---------- */
a:focus-visible,button:focus-visible{outline:calc(1.5*var(--t)) solid #e8d1cb;outline-offset:calc(3*var(--t))}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}

/* ---------- tablet ----------
   The desktop architecture is one uniform scale of the 1280x800 canvas:
   u = min(100vw/1280, 100dvh/800). It holds while that scale is generous —
   at 1366x1024 (12.9" landscape) it is 1.07, at 1180x820 it is 0.92. It
   fails at u < 0.9, where the 10px labels drop under 9px and the body copy
   under 10px; that is 1152px wide. Below that the type unit is pinned and
   the boxes carrying type size to their content, so the composition stops
   being a shrinking miniature and becomes a layout at its own scale, while
   the frame keeps scaling with the viewport. At the boundary both units are
   0.9 and every content-sized box resolves to its desktop width, so the
   architectures meet without a visible step. */
@media (max-width: 1152px){
  :root{
    --u: clamp(.8px, min(100vw / 1280, 100vh / 800), 1.1px);
    --u: clamp(.8px, min(100vw / 1280, 100dvh / 800), 1.1px);
    /* type grows fluidly as the viewport narrows: 0.9 at the breakpoint,
       matching the desktop scale exactly, up to 1.12 where the phone block
       takes over at the same value — both boundaries are stepless */
    --t: max(var(--u), clamp(.9px, calc(.9px + (1152px - 100vw) * .00042), 1.12px));
  }
  /* pills and the CTA size to their label instead of to a fixed canvas width;
     the paddings are the reference's own internal measurements, so at the
     breakpoint these resolve to 87/90/190 units exactly as before */
  .enter{width:auto;padding:0 calc(19*var(--t)) 0 calc(21*var(--t))}
  .menu{width:auto;padding:0 calc(24*var(--t)) 0 calc(21*var(--t))}
  .cta{width:auto;padding:0 calc(19*var(--t))}
  /* the dock's cells become content-aware; the dividers become their edges,
     landing on the same 116/139 offsets at the breakpoint */
  .dock{display:flex;justify-content:space-between;align-items:stretch}
  .dock .div{display:none}
  .audio,.talk{position:static;height:auto}
  .audio{padding:0 min(calc(20*var(--t)),5vw) 0 min(calc(26*var(--t)),6vw);
         border-right:var(--hair) solid rgba(255,255,255,.21)}
  .talk{padding:0 min(calc(24*var(--t)),6vw) 0 min(calc(20*var(--t)),5vw);
        border-left:var(--hair) solid rgba(255,255,255,.21)}
  /* touch targets grow inside the existing boxes — nothing moves */
  .links{gap:calc(17*var(--t));align-self:stretch}
  .links a{display:flex;align-items:center;align-self:stretch}
  .index a{padding:calc(7*var(--t)) 0}
}

/* The hero image is 16:10. Once the viewport is narrower than ~6/5 the frame
   crops the mountains away and the index rail loses the dark ground it reads
   against, so the rail moves up into the sky band and the hero takes the full
   width below it. Above that ratio the rail keeps its centred desktop
   position and the hero reserves its column. */
@media (max-width: 1152px) and (min-aspect-ratio: 6/5){
  .hero{padding-inline:calc(150*var(--t))}
}
@media (max-width: 1152px) and (max-aspect-ratio: 6/5){
  .index{top:32%}
  .hero{padding-inline:calc(22*var(--t))}
}

/* ---------- navigation collapse ----------
   The bar holds logo + links + both pills while the gap between the wordmark
   and the first link stays above an eighth of the frame width. With the type
   growing as the viewport narrows that gap closes at ~830px, so from there
   the same nav set becomes a panel hung off the MENU pill — the site's own
   dots icon is the burger. No markup is duplicated: .navset is
   display:contents in the bar and a flex panel here. */
@media (max-width: 830px){
  .navset{
    display:flex;flex-direction:column;align-items:stretch;
    position:absolute;top:calc(52*var(--t));right:0;min-width:calc(196*var(--t));
    padding:calc(16*var(--t)) calc(20*var(--t)) calc(18*var(--t));
    gap:calc(4*var(--t));
    background:rgba(11,16,26,.74);
    -webkit-backdrop-filter:blur(calc(16*var(--t)));backdrop-filter:blur(calc(16*var(--t)));
    clip-path:polygon(0 0, calc(100% - 15*var(--t)) 0, 100% calc(15*var(--t)), 100% 100%,
                      calc(15*var(--t)) 100%, 0 calc(100% - 15*var(--t)));
    opacity:0;visibility:hidden;transform:translateY(calc(-6*var(--t)));
    transition:opacity .34s ease, transform .34s cubic-bezier(.22,.61,.36,1), visibility .34s;
    z-index:6;
  }
  .nav-open .navset{opacity:1;visibility:visible;transform:none}
  .links{flex-direction:column;align-items:stretch;gap:0;margin-right:0;align-self:auto}
  .links a{padding:calc(9*var(--t)) 0;justify-content:flex-start}
  .navset .enter{width:auto;align-self:stretch;justify-content:flex-start;
    margin-top:calc(10*var(--t));height:calc(38*var(--t));
    padding:0 calc(16*var(--t));background:rgba(255,250,246,.07)}
}


/* ---------- mobile ----------
   The tablet architecture holds further than a conventional phone breakpoint
   would suggest. Measured down the range: the masthead still has 189px
   between wordmark and menu at 560, the headline keeps its two hand-set
   lines to 487, the dock keeps 200px of slack to 400. What fails first is
   the paragraph — its four hand-set lines need 452px of measure, so at
   549px the block breaks into five ragged lines with an orphan. That is the
   real breaking point, so mobile begins at 548.

   The architecture here: the hand-set breaks are released so the copy finds
   its own measure, the wordmark becomes fluid so it never crowds the menu,
   the frame margins tighten proportionally, the rail climbs clear of the
   subject as the frame crops to it, and the type scale simply carries over
   from the tablet boundary rather than shrinking — a phone is held closer,
   not read at arm's length. */
@media (max-width: 548px){
  :root{
    --u: clamp(.62px, min(100vw / 500, 100vh / 820), 1.1px);
    --u: clamp(.62px, min(100vw / 500, 100dvh / 820), 1.1px);
    /* 1.12 at the breakpoint, matching tablet exactly, easing to a 1.06 floor */
    --t: clamp(1.06px, calc(100vw / 489), 1.12px);
  }
  .frame{left:calc(22*var(--u));right:calc(22*var(--u));
         top:calc(22*var(--u));bottom:calc(22*var(--u))}
  /* the wordmark keeps its artwork and proportion, and yields width only
     when the bar actually needs it */
  .logo{left:calc(16*var(--t));top:calc(22*var(--t));
        width:min(calc(163*var(--t)), 42vw);height:auto;aspect-ratio:163 / 19}
  .masthead{right:calc(9*var(--t));top:calc(12*var(--t))}
  /* the frame now crops to the subject itself, so the rail stops floating
     beside the composition and docks under the wordmark, in the sky band —
     the one region that stays dark at every phone crop. Its rhythm tightens
     just enough to clear the stone, and the inactive items carry slightly
     more weight to hold up against a brighter backdrop. */
  .index{top:calc(70*var(--t));transform:none}
  .index li{height:calc(24*var(--t))}
  .index a{color:rgba(232,238,250,.42)}
  .hero{bottom:max(9%, calc(59*var(--t)));padding-inline:calc(18*var(--t))}
  .headline{text-wrap:balance}
  .blurb{max-width:calc(400*var(--t))}
  .blurb br{display:none}
  /* the headline wraps freely here, so it lifts as one block instead of per line */
  .headline .hrow{display:inline;overflow:visible}
  .headline .hrise{display:inline}
  .anim .headline .hrise{animation:none}
  .anim .headline{animation:settle .8s var(--e-mask) .42s both}
  .hero .headline{transition:opacity .4s ease}
  .swapping .headline{opacity:0}
}
/* ---------- narrow mobile ----------
   Measured: the dock's three cells hold one row down to 365px, where the
   centre cue meets the contact control. Below that the cue takes a row of
   its own — the two controls split the row above it, keeping the same
   hairline language — rather than the labels being shrunk or dropped. */
@media (max-width: 370px){
  .dock{height:auto;flex-wrap:wrap}
  .audio,.talk{flex:1 1 0;justify-content:center;height:calc(44*var(--t))}
  .scroll{position:static;transform:none;order:1;flex:1 0 100%;
          justify-content:center;height:calc(40*var(--t));
          border-top:var(--hair) solid rgba(255,255,255,.13)}
  .anim .scroll{animation-name:settle}
  .hero{bottom:calc(96*var(--t))}
}

/* last resort only: on a screen too short to hold the whole composition the
   supporting paragraph steps aside rather than the layout clipping */
@media (max-height: 560px),
       (max-width: 370px) and (max-height: 640px){ .blurb{display:none} }

</style>
</head>
<body>
<div class="stage">
  <div class="bg" role="img" aria-label="A stone arch standing in still water between dark mountains at dusk">
    <video class="on" data-chapter="vision" src="assets/video/background.mp4" poster="assets/img/background.webp" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video>
    <video data-chapter="expression" data-src="assets/video/expression.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
    <video data-chapter="craftsmanship" data-src="assets/video/craftsmanship.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
    <video data-chapter="refinement" data-src="assets/video/refinement.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
    <video data-chapter="balance" data-src="assets/video/balance.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
    <video data-chapter="origin" data-src="assets/video/origin.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
  </div>

  <div class="frame">
    <span class="ln ln-t"></span><span class="ln ln-b"></span>
    <span class="ln ln-l"></span><span class="ln ln-r"></span>
    <span class="cn cn-tl"></span><span class="cn cn-tr"></span>
    <span class="cn cn-bl"></span><span class="cn cn-br"></span>

    <a class="logo" href="#" aria-label="Stratum — home">
      <svg viewBox="0 0 163 19" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 17 L2.75 17 L1.75 16.5 L1.5 15 L2.25 14 L12.25 14 L12.75 13.75 L13 13 L12.75 11.5 L12 11.25 L4.5 11.25 L2.5 10.5 L1.75 8.75 L1.5 6.5 L1.5 4.5 L2.5 3 L4.25 2.5 L7.25 2.25 L15 2.25 L15.75 3 L16 4.5 L15 5.5 L6 5.5 L5 5.75 L4.5 6.5 L4.75 7.5 L5.5 8.25 L13 8.25 L14.75 8.75 L15.5 9.5 L16 11 L15.75 15.5 L14.25 16.5ZM62.25 17 L60.75 17 L60 16.5 L56 12 L53.75 11.25 L53 11.5 L52.25 12 L51.75 16.5 L50.75 16.75 L49.5 16.5 L49 15.25 L49 3.5 L49.5 2.75 L50.5 2.25 L59 2.5 L62 2.5 L62.75 3 L63.5 4 L63.75 5 L63.25 9.5 L62 11 L60 11.5 L59.75 12 L60.25 13 L63 15.75 L63 16.5ZM86.5 17 L85.5 16.75 L85 16.25 L84.5 12.5 L84 12 L83 11.75 L76.5 12 L76 12.75 L75.75 16.5 L75 17 L73.5 16.5 L73 15 L73.25 6.5 L73.25 4.5 L74.5 3.25 L76.5 2.5 L82 2.25 L85.5 2.5 L86.5 3 L87.5 4.25 L87.5 5 L87.75 15 L87.25 16.5ZM33.5 17 L31.75 16.75 L31.25 16 L31 6 L30 5.5 L25.5 5.25 L25 3.75 L25.5 2.5 L38.5 2.5 L39.5 2.5 L40 3 L40.25 4.5 L39.5 5.25 L35 5.5 L34.25 6 L34 15.5ZM103.75 16.75 L102.5 16.75 L101.75 16 L101.5 6 L100.75 5.5 L96.25 5.25 L95.75 4 L96 3 L96.5 2.5 L109.5 2.5 L110.5 3.25 L110.75 4.5 L110 5.25 L105.75 5.25 L104.75 6 L104.5 15.5 L104.25 16.5ZM129.75 17 L122.5 17 L121 16.25 L120.25 15.5 L119.75 14.5 L119.75 13 L119.75 3.75 L120.25 2.75 L122 2.5 L122.5 3.5 L123 13.5 L124 14 L130 14.25 L131 13.75 L131.5 13 L131.5 3.25 L132 2.5 L133 2.5 L134 3 L134.25 3.75 L134 14.5 L133.5 15.5 L132.5 16.25 L131.5 16.75ZM160.5 17 L159.5 16.75 L158.75 16 L158.75 6.5 L158.5 5.75 L157.5 5.5 L155 5.5 L154 6 L153.75 16 L153.5 16.75 L152.25 17 L151.5 16.75 L151 15.75 L150.75 6 L150 5.5 L147.25 5.25 L146.5 5.75 L146 6.5 L146 16 L145.25 16.75 L143.5 16.75 L143.25 15.25 L143.25 3.75 L143.5 3 L144 2.5 L146.75 2.5 L159.5 2.5 L161.5 3 L161.75 3.5 L161.75 15.5 L161.5 16.5ZM53.75 8.5 L60 8.5 L60.75 7.75 L60.75 6.25 L60.25 5.5 L59.5 5.25 L53 5.5 L52.25 6 L52.25 7.5 L52.5 8.5ZM83.75 9.25 L84.5 8.75 L84.75 7.75 L84.5 6 L84 5.5 L77 5.5 L76 6 L76 8.5 L76.75 9.25Z"/></svg>
    </a>

    <nav class="masthead" aria-label="Main">
      <div class="navset" id="navset">
      <div class="links lbl">
        <a href="#story"><span class="t">STORY</span></a><a href="#concepts"><span class="t">CONCEPTS</span></a><a href="#process"><span class="t">PROCESS</span></a><a href="#connect"><span class="t">CONNECT</span></a><a href="#film"><span class="t">FILM</span></a>
      </div>
      <a class="pill enter lbl" href="#enter">
        <svg class="ico" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="0" y="0" width="4" height="5"/><rect x="3" y="4" width="4" height="4"/><rect x="0" y="7" width="4" height="4"/></svg>
        <span class="t">ENTER</span>
      </a>
      </div>
      <button class="pill menu lbl" type="button" aria-expanded="false" aria-controls="navset">
        <svg class="ico" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="0" y="0" width="4" height="4" rx=".8"/><rect x="6" y="0" width="4" height="4" rx=".8"/><rect x="0" y="6" width="4" height="4" rx=".8"/><rect x="6" y="6" width="4" height="4" rx=".8"/></svg>
        <span class="t">MENU</span>
      </button>
    </nav>

    <ul class="index" aria-label="Chapters">
      <li class="on"><a href="#vision" aria-current="true"><span class="t">VISION</span></a></li>
      <li><a href="#expression"><span class="t">EXPRESSION</span></a></li>
      <li><a href="#craftsmanship"><span class="t">CRAFTSMANSHIP</span></a></li>
      <li><a href="#refinement"><span class="t">REFINEMENT</span></a></li>
      <li><a href="#balance"><span class="t">BALANCE</span></a></li>
      <li><a href="#origin"><span class="t">ORIGIN</span></a></li>
    </ul>

    <div class="hero">
      <h1 class="headline"><span class="hrow"><span class="hrise">We raise the spirit </span></span><span class="hrow"><span class="hrise">of each street</span></span></h1>
      <p class="blurb">For over 45 years, Stratum has planned some of India's most considered real<br>
        estate developments, unifying modern Residential, Commercial and<br>
        Industrial concepts. From the initial brief to reality, places for people to<br>
        inhabit.</p>
      <a class="cta lbl" href="#approach">
        <span class="cta-glass"></span>
        <svg class="cta-edge" viewBox="0 0 190 41" preserveAspectRatio="none" aria-hidden="true"><path d="M3.5.5 H179.5 L189.5 10.5 V37.5 L186.5 40.5 H10.5 L.5 30.5 V3.5 Z" vector-effect="non-scaling-stroke"/></svg>
        <span class="cta-in">
          <svg class="ico" viewBox="0 0 7 11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="0" y="0" width="4" height="5"/><rect x="3" y="4" width="4" height="4"/><rect x="0" y="7" width="4" height="4"/></svg>
          <span class="t">UNCOVER OUR APPROACH</span>
        </span>
      </a>
    </div>

    <div class="dock">
      <span class="rule"></span><span class="div div-l"></span><span class="div div-r"></span>

      <button class="audio lbl" type="button" aria-pressed="true">
        <svg class="ico" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7 0 L7 11 L0.6 7.6 L0.6 3.4 Z" stroke="none"/>
          <path class="wave" d="M9.4 2.2 C10.9 4 10.9 7 9.4 8.8" fill="none" stroke-width="1.3" stroke-linecap="round"/>
          <path class="wave" d="M11.9 0.6 C14.1 3.3 14.1 7.7 11.9 10.4" fill="none" stroke-width="1.3" stroke-linecap="round"/>
          <path class="slash" d="M9.2 2.4 L13.8 8.6 M13.8 2.4 L9.2 8.6" fill="none" stroke-width="1.3" stroke-linecap="round"/>
        </svg>
        <span class="t">AUDIO ON</span>
      </button>

      <a class="scroll lbl" href="#approach">
        <svg class="ico" viewBox="0 0 5 7" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 0 H5 L2.5 3 Z"/><path d="M0 4 H5 L2.5 7 Z"/></svg>
        <span class="t">SCROLL TO UNCOVER</span>
      </a>

      <a class="talk lbl" href="#contact">
        <span class="t">TALK WITH US</span>
        <svg class="ico" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 .8 C12 .8 15.2 3.8 15.2 7.4 C15.2 11 12 14 8 14 C6.6 14 5.3 13.6 4.2 13 L.9 13.9 L1.9 10.9 C1.2 9.9 .8 8.7 .8 7.4 C.8 3.8 4 .8 8 .8 Z"/>
          <g fill="currentColor" stroke="none"><circle cx="5.2" cy="7.4" r=".95"/><circle cx="8" cy="7.4" r=".95"/><circle cx="10.8" cy="7.4" r=".95"/></g>
        </svg>
      </a>
    </div>
  </div>
</div>

<script>
(function(){
  "use strict";
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var DUR = 400;   /* every label resolves in the same time, whatever its length */

  /* ---------------------------------------------------------------
     1. DECODE LABELS
     Every interactive label resolves left-to-right with a short band
     of random letters running ahead of the resolved characters and
     nothing rendered beyond it — the behaviour in the reference clip.
     Each label's natural width is reserved first so a scramble can
     never reflow the row it sits in.
  ---------------------------------------------------------------- */
  var labels = [].slice.call(document.querySelectorAll('.t'));
  labels.forEach(function(el){ el.dataset.text = el.textContent; });

  function reserve(){
    var w = [];
    labels.forEach(function(el){ el.style.width = ''; });
    labels.forEach(function(el){ w.push(el.getBoundingClientRect().width); });
    labels.forEach(function(el,i){ el.style.width = (Math.ceil(w[i]*100)/100) + 'px'; });
  }

  function settle(el){
    if (el._raf){ cancelAnimationFrame(el._raf); el._raf = 0; }
    if (el._t){ clearTimeout(el._t); el._t = 0; }
    el.textContent = el.dataset.text;
  }

  function decode(el, dur){
    var text = el.dataset.text, n = text.length;
    if (RM){ settle(el); return; }
    settle(el);
    var D = dur || DUR;
    var t0 = performance.now(), lastRoll = 0;
    var rand = new Array(n);
    function roll(){ for (var i=0;i<n;i++) rand[i] = CH.charAt((Math.random()*26)|0); }
    roll();
    function step(now){
      var p = Math.min(1, (now - t0) / D), front = p * n, out = '', i;
      if (now - lastRoll > 45){ roll(); lastRoll = now; }
      for (i = 0; i < n; i++){
        var c = text.charAt(i);
        if (i < front) out += c;
        else if (i < front + 3.6) out += (c === ' ' ? ' ' : rand[i]);
        else break;
      }
      el.textContent = out;
      if (p < 1) el._raf = requestAnimationFrame(step); else settle(el);
    }
    el._raf = requestAnimationFrame(step);
    /* if frames are throttled (background tab, reduced power), the label still
       resolves on its own rather than sitting half-decoded */
    el._t = setTimeout(function(){ settle(el); }, D + 500);
  }

  [].forEach.call(document.querySelectorAll('a, button'), function(el){
    var t = el.querySelector('.t');
    if (!t) return;
    el.addEventListener('pointerenter', function(){ decode(t); });
  });

  /* ---------------------------------------------------------------
     2. SCENE PARALLAX
     The hero image answers the pointer on a long ease and drifts
     against it, zooming very slightly as the pointer drops toward the
     foot of the screen. With no pointer input the transform is
     identity, so the resting frame is the reference frame.
  ---------------------------------------------------------------- */
  var bg = document.querySelector('.bg');
  var tx = 0, ty = 0, cx = 0, cy = 0, running = false;

  function tick(){
    cx += (tx - cx) * 0.045;
    cy += (ty - cy) * 0.045;
    var w = innerWidth, h = innerHeight;
    var dx = -cx * w * 0.0156, dy = -cy * h * 0.015;
    var cover = 2 * Math.max(Math.abs(dx) / w, Math.abs(dy) / h);
    var sc = 1 + cover + 0.014 * Math.max(0, cy);
    bg.style.transform = 'translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0) scale(' + sc.toFixed(4) + ')';
    if (Math.abs(tx - cx) < 0.0004 && Math.abs(ty - cy) < 0.0004){ running = false; return; }
    requestAnimationFrame(tick);
  }
  function wake(){ if (!running && !RM){ running = true; requestAnimationFrame(tick); } }

  window.addEventListener('pointermove', function(e){
    if (e.pointerType === 'touch') return;
    tx = (e.clientX / innerWidth) * 2 - 1;
    ty = (e.clientY / innerHeight) * 2 - 1;
    wake();
  }, {passive:true});
  document.addEventListener('pointerleave', function(){ tx = 0; ty = 0; wake(); });

  /* ---------------------------------------------------------------
     3. SMALL STATE CHANGES
  ---------------------------------------------------------------- */
  var audio = document.querySelector('.audio');
  audio.addEventListener('click', function(){
    var on = audio.getAttribute('aria-pressed') === 'true';
    audio.setAttribute('aria-pressed', String(!on));
    audio.classList.toggle('muted', on);
    var t = audio.querySelector('.t');
    t.dataset.text = on ? 'AUDIO OFF' : 'AUDIO ON';
    decode(t);
  });

  [].forEach.call(document.querySelectorAll('.index a'), function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      [].forEach.call(document.querySelectorAll('.index li'), function(li){ li.classList.remove('on'); });
      [].forEach.call(document.querySelectorAll('.index a'), function(x){ x.removeAttribute('aria-current'); });
      a.parentNode.classList.add('on');
      a.setAttribute('aria-current', 'true');
      decode(a.querySelector('.t'));
      showChapter(a.getAttribute('href').slice(1));
    });
  });

  /* ---------------------------------------------------------------
     3b. CHAPTERS
     Each chapter of the rail has its own Seedance clip and its own
     headline and paragraph. The next clip loads on demand and fades up
     once it can play; the copy drops out, is swapped, and rises back in.
     A newer choice always wins over one still loading or mid-swap.
  ---------------------------------------------------------------- */
  var COPY = {
    vision: [['We raise the spirit ', 'of each street'],
      ['For over 45 years, Stratum has planned some of India’s most considered real',
       'estate developments, unifying modern Residential, Commercial and',
       'Industrial concepts. From the initial brief to reality, places for people to',
       'inhabit.']],
    expression: [['Every facade ', 'tells its story'],
      ['Architecture is how a place introduces itself. We give each project a',
       'clear voice, shaped by its street, its climate and the people who',
       'will live with it every day, so that it is recognised long after it',
       'is built.']],
    craftsmanship: [['Built by hand, ', 'made to last'],
      ['Our teams work with stone, timber and light the way a craftsman',
       'works a single piece, testing every joint and every surface until',
       'the detail holds, from the first foundation to the final finish of',
       'each room.']],
    refinement: [['Nothing extra, ', 'nothing missing'],
      ['Each plan passes through many hands before it is drawn for the last',
       'time. We remove what distracts and sharpen what matters, until the',
       'building feels inevitable, calm and quietly resolved from every',
       'angle.']],
    balance: [['Where land meets ', 'the life around it'],
      ['We weigh density against open ground, commerce against quiet and',
       'ambition against place, so that each development works in harmony',
       'with the city around it, today and for the generations that follow',
       'after us.']],
    origin: [['Rooted in the ', 'soil we build on'],
      ['Stratum grew from a simple belief: that good buildings make good',
       'streets, and good streets make good cities. Forty-five years on, it',
       'still guides every brief we accept and every place we hand over to',
       'its people.']]
  };
  var hero = document.querySelector('.hero');
  var rises = [].slice.call(hero.querySelectorAll('.hrise'));
  var blurb = hero.querySelector('.blurb');
  var scenes = [].slice.call(document.querySelectorAll('.bg video'));
  var chapter = 'vision', swapT = 0;

  function showScene(v){
    if (!v.getAttribute('src')){ v.preload = 'auto'; v.src = v.dataset.src; v.load(); }
    function go(){
      if (v.dataset.chapter !== chapter) return;
      try { v.currentTime = 0; } catch(err){}
      var pr = v.play(); if (pr && pr.catch) pr.catch(function(){});
      scenes.forEach(function(o){
        if (o === v){ o.classList.add('on'); return; }
        if (!o.classList.contains('on')) return;
        o.classList.remove('on');
        setTimeout(function(){ if (!o.classList.contains('on')) o.pause(); }, 950);
      });
    }
    if (v.readyState >= 3) go(); else v.addEventListener('canplay', go, { once: true });
  }

  function showChapter(id){
    if (!COPY[id] || id === chapter) return;
    chapter = id;
    scenes.forEach(function(v){ if (v.dataset.chapter === id) showScene(v); });
    var c = COPY[id];
    clearTimeout(swapT);
    hero.classList.add('swapping');
    swapT = setTimeout(function(){
      rises[0].textContent = c[0][0];
      rises[1].textContent = c[0][1];
      blurb.textContent = '';
      c[1].forEach(function(line, i){
        if (i) blurb.appendChild(document.createElement('br'));
        blurb.appendChild(document.createTextNode(i ? '\n        ' + line : line));
      });
      void hero.offsetWidth;
      hero.classList.remove('swapping');
    }, RM ? 0 : 500);
  }

  /* the MENU pill is the burger: below 720px it opens the same nav set as a
     panel. Label decodes between MENU and CLOSE using the site's own effect. */
  var menu = document.querySelector('.menu');
  var navset = document.getElementById('navset');
  var menuLabel = menu.querySelector('.t');
  var root = document.documentElement;

  function setMenu(open){
    root.classList.toggle('nav-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menuLabel.dataset.text = open ? 'CLOSE' : 'MENU';
    decode(menuLabel);
    if (open) requestAnimationFrame(function(){
      var first = navset.querySelector('a');
      if (first) try { first.focus(); } catch(err){}
    });
  }
  menu.addEventListener('click', function(e){
    e.stopPropagation();
    setMenu(!root.classList.contains('nav-open'));
  });
  navset.addEventListener('click', function(e){
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && root.classList.contains('nav-open')){ setMenu(false); menu.focus(); }
  });
  document.addEventListener('click', function(e){
    if (root.classList.contains('nav-open') && !navset.contains(e.target) && e.target !== menu)
      setMenu(false);
  });
  addEventListener('resize', function(){
    if (innerWidth > 830 && root.classList.contains('nav-open')) setMenu(false);
  });

  /* ---------------------------------------------------------------
     4. BOOT — reserve widths once the face is ready, then run one
     decode pass so the chrome resolves as the hero rises.
  ---------------------------------------------------------------- */
  function boot(){
    reserve();
    if (RM) return;
    /* the decoding labels carry the same score as the CSS above: each group's
       type resolves just after its container has begun arriving */
    function at(sel, t0, step){
      [].slice.call(document.querySelectorAll(sel)).forEach(function(el, i){
        setTimeout(function(){ decode(el); }, t0 + i * (step || 0));
      });
    }
    at('.enter .t', 330);
    at('.menu .t', 390);
    at('.links a .t', 360, 45);
    at('.index li.on .t', 660);
    at('.index li:not(.on) .t', 720, 55);
    at('.cta .t', 900);
    at('.dock .t', 1000, 60);
    /* entrance is over by ~1.52s; the class comes off well after that and every
       label is force-settled, so no motion can outlive the sequence */
    setTimeout(function(){ document.documentElement.classList.remove('anim'); }, 2200);
    setTimeout(function(){ labels.forEach(settle); }, 2600);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(boot); else addEventListener('load', boot);

  var rt;
  addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(reserve, 160); });
})();
</script>
</body>
</html>
````