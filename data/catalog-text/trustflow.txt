Build a single full-viewport marketing landing page for **Boomerang**, a conversational AI platform for financial institutions. Tech: React + TypeScript + Vite + Tailwind CSS + Lucide React (`ArrowRight` only). No other UI libraries.

---

### Fonts (exact)

Load in `index.html`:

1. **Display / serif:** `P22 Mackinac W01 Book`  
   `https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book`

2. **UI / sans:** Inter weights 300, 400, 500, 600  
   `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap`

Tailwind `fontFamily`:
- `sans: ['Inter', 'sans-serif']`
- `serif: ['P22 Mackinac W01 Book', 'Georgia', 'serif']`

Body: `font-family: 'Inter', sans-serif` with antialiased smoothing. Page title: `Build Lasting Relationships`. Background: pure white `#FFFFFF`. Primary text/chrome: `#191919`.

---

### CloudFront video (exact URL — required)

```
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4
```

---

### Hero video background — boomerang playback (critical behavior)

Implement a `BoomerangVideoBg` absolute full-bleed background (`absolute inset-0 z-0`) with:

1. Wrapper: `scale-[1.15] origin-top overflow-hidden` (slightly oversized, anchored from top).
2. Hidden/capture `<video>`: `src` = CloudFront URL above, `muted`, `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`, `className="w-full h-full object-cover object-top"`.
3. On load: play once (no native loop). While playing, capture every frame to offscreen canvases (prefer `requestVideoFrameCallback`, else `requestAnimationFrame`). Cap capture width at **960px**, scale height proportionally. Deduplicate by `currentTime`.
4. On `ended`: stop capture, store frames, switch from video to a display `<canvas>` (`w-full h-full object-cover object-top`).
5. Canvas playback: ping-pong / boomerang at **30fps** (`interval = 1000/30`). Advance frame index forward to last, then reverse to first, forever.
6. While frames aren’t ready, show the live video; once ready, hide video (`display: none`) and show canvas.

This is the main motion: a soft looping forward→reverse background video behind the hero.

---

### Logo (exact SVG)

Custom SVG mark (not Lucide), `viewBox="0 0 256 256"`, `fill="currentColor"`:

```
M 144 256 L 27.598 256 L 144 139.598 Z
M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z
M 0 204.402 L 0 112 L 92.402 112 Z
```

Navbar size: `w-6 h-6 text-[#191919]`. Wordmark beside it: “Boomerang”, `font-semibold text-base tracking-tight text-[#191919]`, gap `2.5`.

---

### Fixed navbar

- `fixed top-0 left-0 right-0 z-50`
- Padding: `px-6 sm:px-10 md:px-14`, `py-4 sm:py-5`
- Three zones: logo left | center links (hidden below `md`) | CTA right
- Links: Product, Solutions, Pricing, Company — `text-sm text-[#191919]/70`, hover to full `#191919`, `transition-colors duration-200`, hrefs `#product` `#solutions` `#pricing` `#company`
- CTA button: “Book A Demo” — `px-5 py-2.5 bg-[#191919] text-white text-sm font-medium rounded-lg hover:bg-[#191919]/90 transition-colors duration-200`
- No nav background / blur / border — transparent over the video

---

### Hero section (first viewport = full screen)

- `relative flex flex-col items-center overflow-hidden h-screen`
- Video bg at `z-0`; content at `z-10`

**Hero copy block** (centered):
- Top padding: `pt-24 sm:pt-26 md:pt-32`, horizontal `px-4 sm:px-6`
- H1 (serif Mackinac):  
  `Build lasting` + line break + `relationships.`  
  Classes: `font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-[#191919] font-normal`
- Subcopy max-width `max-w-sm sm:max-w-md`, `mt-5 sm:mt-6 md:mt-8`, `text-sm md:text-base text-[#191919]/70 leading-relaxed`:  
  “Conversational AI platform for modern financial institutions — agents that handle the full borrower lifecycle across email, SMS, and voice.”
- Second “Book A Demo” button: `mt-6 sm:mt-8 md:mt-10 px-6 sm:px-8 py-3 sm:py-3.5` same black pill styling as nav CTA

**Bottom info panel** (`mt-auto`, sits on bottom of viewport):
- Outer: `w-full max-w-5xl px-4 sm:px-6`
- Card: `bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm` — flush to bottom (no bottom border/radius)
- **Row 1 — 2 cols** (`md:grid-cols-2`, gaps `6 / 8 / 16`):
  - Left: micro-label `WHAT DO WE DO?` — `text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium`  
    then H2 serif: “Conversations that / build momentum” — `mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight` (line break from `sm` up)
  - Right: body bottom-aligned — `text-sm md:text-[15px] text-[#191919]/70 leading-relaxed`:  
    “Conversational AI built for regulated financial institutions. Agents that hold a real conversation, plug into the systems you run, and show their work.”
- **Hairline divider:** `mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full`
- **Row 2 — 3 interactive rows** (`sm:grid-cols-3`, gap `2` / `3`):
  - Items:
    - `01 / Conversational`
    - `02 / Connected`
    - `03 / Compliant`
  - Each: `bg-[#F4F3F3] hover:bg-[#eaeaea] transition-all duration-200 cursor-pointer`, `px-4 sm:px-6 py-3.5 sm:py-4`, flex space-between
  - Number: `text-[#191919]/40`; slash: `mx-2 text-[#191919]/30`; label: `font-medium`
  - Lucide `ArrowRight` `w-4 h-4 text-gray-400`; on group hover: `text-gray-700` + `translate-x-0.5`, `transition-all duration-200`

---

### Layout / motion summary

- Page: `min-h-screen bg-white overflow-x-hidden`
- Only intentional motions:
  1. Boomerang video ping-pong on canvas
  2. Color transitions on nav links & buttons (200ms)
  3. Feature-row hover bg + arrow nudge (200ms)
- No purple, no cards-as-hero, no stat strips, no floating badges. One composition: brand + headline + one sentence + CTA + full-bleed video, with the “What do we do?” panel anchored at the bottom of the first viewport.
- Responsive: nav links hide below `md`; feature rows stack on mobile; typography scales as specified.

Reproduce pixel-faithfully: same copy, colors (`#191919`, `#F4F3F3`, white/90 glass panel), fonts, CloudFront URL, and the capture→boomerang canvas video technique.

---