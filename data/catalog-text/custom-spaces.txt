Recreate this exact single-page marketing landing page for “Bespoke Architecture Studio” pixel-faithfully. Stack: React + TypeScript + Vite + Tailwind CSS. Page title: “Bespoke Architecture Studio”. Pure white background (#ffffff). No cards in the hero. No purple. No cream. No dark mode. Minimal black/white architectural aesthetic. Body must use overflow-hidden on the root page wrapper: min-h-screen bg-white overflow-hidden.

═══════════════════════════════════════
FONTS
═══════════════════════════════════════
Load Google Fonts Geist exactly as:
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

Apply globally:
body { font-family: 'Geist', sans-serif; }

═══════════════════════════════════════
PAGE STRUCTURE (top → bottom, 4 sections)
═══════════════════════════════════════
1) Fixed Navbar
2) HeroContent
3) ImageMarquee (infinite drag-enabled horizontal strip with curved white masks)
4) BottomSection

═══════════════════════════════════════
1) NAVBAR — fixed top bar
═══════════════════════════════════════
Position: fixed top-0 left-0 right-0 z-50
Layout: flex items-center justify-between
Padding: px-4 sm:px-6 md:px-10 py-4 sm:py-5

LEFT — Logo SVG (28×28), viewBox="0 0 256 256", fill="#1a1a1a", exact path:
M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z
(Abstract geometric mark: angular “arrow/corner” brand glyph, near-black #1a1a1a)

CENTER — Hamburger open button, absolutely centered:
absolute left-1/2 -translate-x-1/2
Two horizontal lines only (NOT three): each w-6 h-[1.5px] bg-neutral-900 rounded-full, gap-[5px]
Hover: each line shrinks to w-5, transition-all duration-300
aria-label="Open menu"

RIGHT — CTA link (hidden on mobile, visible sm+):
text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-2.5
hover:bg-neutral-800 transition-colors
Label: “Book a meeting”
href="#"
On mobile only: spacer div w-7 to balance the logo (sm:hidden)

MENU OPEN STATE:
- When open: document.body.style.overflow = 'hidden'; restore on close/unmount

OVERLAY:
fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
Open: opacity-100 pointer-events-auto
Closed: opacity-0 pointer-events-none
Click overlay → close

DRAWER / FULL-SCREEN MENU:
Mobile: fixed inset-0 white panel
Desktop (sm+): fixed top-0 right-0 h-full w-full max-w-sm white panel
z-[70]
Same duration-500 cubic-bezier(0.16,1,0.3,1)
Open mobile: opacity-100 translate-y-0
Closed mobile: opacity-0 translate-y-full
Open desktop: opacity-100 translate-x-0
Closed desktop: opacity-0 translate-x-full

Drawer header: flex justify-between, same logo SVG, close button:
relative w-10 h-10 rounded-full hover:bg-neutral-100
Two lines that morph into an X when open:
- line A: rotate-45 when open; otherwise rotate-0 -translate-y-[3px]
- line B: -rotate-45 when open; otherwise rotate-0 translate-y-[3px]
Each line: absolute w-5 h-[1.5px] bg-neutral-900 rounded-full
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
aria-label="Close menu"

Menu links (staggered entrance), labels exact order:
Work, Index, Events, Projects
Each: text-3xl font-medium text-neutral-900 py-3 hover:text-neutral-500
Open: opacity-100 translate-x-0
Closed: opacity-0 translate-x-8
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
Stagger delay when opening: 150ms + i*60ms (i = 0..3) → 150, 210, 270, 330ms
On click: close menu
href="#"

Drawer CTA below links (pt-12):
Same “Book a meeting” pill: text-sm font-medium text-white bg-neutral-900 rounded-full px-6 py-3 hover:bg-neutral-800
Fade/slide: open opacity-100 translate-y-0; closed opacity-0 translate-y-4
Delay when open: 400ms
Same cubic-bezier easing / 500ms

═══════════════════════════════════════
2) HERO CONTENT
═══════════════════════════════════════
section: pt-24 sm:pt-28 pb-1 text-center px-4 sm:px-6

H1 (two lines, exact line break after “Architecture”):
“Bespoke Architecture
Studio”
Classes: text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-neutral-900 leading-[1.05] max-w-3xl mx-auto

Subhead paragraph:
“The building you deserve has never been built before.”
Classes: mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-neutral-900 max-w-xl mx-auto leading-relaxed

═══════════════════════════════════════
3) IMAGE MARQUEE (core visual + interaction)
═══════════════════════════════════════
section: relative py-4 overflow-hidden

TOP CURVED WHITE MASK (pointer-events-none, z-10):
absolute top-0 left-0 right-0 h-[80px] sm:h-[100px]
SVG viewBox="0 0 1440 100" preserveAspectRatio="none" class w-full h-full
Path fill white:
M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z
(Creates a soft concave white curtain dipping into the image strip from the top)

BOTTOM CURVED WHITE MASK (mirror):
absolute bottom-0 left-0 right-0 h-[80px] sm:h-[100px]
Path fill white:
M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z

MARQUEE TRACK:
flex w-max gap-3 sm:gap-4 py-4 select-none
cursor-grab (cursor-grabbing while dragging)
willChange: transform
Images array DUPLICATED once ([...images, ...images]) for seamless loop

Each slide:
wrapper: w-60 h-80 sm:w-80 sm:h-[32rem] flex-shrink-0 rounded-2xl overflow-hidden
img: w-full h-full object-cover pointer-events-none loading="lazy" draggable={false} alt=""

EXACT IMAGE URLs (use these exact Higgs CDN webp proxy URLs, order preserved):
1) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png&w=1920&q=85
2) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png&w=1920&q=85
3) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png&w=1920&q=85
4) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png&w=1920&q=85
5) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png&w=1920&q=85
6) https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png&w=1920&q=85

(Optional raw CloudFront PNG originals if proxy fails:)
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png

ANIMATION ENGINE (requestAnimationFrame, NOT CSS marquee):
Constant SPEED = 0.8 px per frame (auto-scroll left)
Transform: translate3d(offsetPx, 0, 0)
Seamless wrap:
halfWidth = track.scrollWidth / 2
if offset <= -halfWidth → offset += halfWidth
if offset > 0 → offset -= halfWidth

DRAG / POINTER INTERACTION:
onPointerDown: set dragging true, velocity=0, capture pointer, store startX + startOffset, cursor-grabbing
onPointerMove while dragging:
  velocity = (dx / dt) * 16   // normalize ~60fps
  offset = dragStartOffset + (clientX - dragStartX)
onPointerUp / onPointerCancel: dragging=false, release grabbing cursor
While NOT dragging:
  if |velocity| > 0.1: offset += velocity; velocity *= 0.95 (momentum decay)
  else: velocity=0; offset -= SPEED (resume auto-scroll)
This yields: continuous left crawl → grab/drag → inertial coast → resume crawl

═══════════════════════════════════════
4) BOTTOM SECTION
═══════════════════════════════════════
section: text-center px-4 sm:px-6 pt-2 pb-12 sm:pb-16 max-w-2xl mx-auto

Body copy (exact):
“We design private residences and commercial spaces from a blank page. No templates, no repeated floorplans, no shortcuts.”
Classes: text-base sm:text-lg md:text-xl text-neutral-900 leading-relaxed

CTA row: mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8
Two underlined text links (NOT buttons):
1) “Book a meeting”
2) “See Projects”
Both: text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors
href="#"

═══════════════════════════════════════
RESPONSIVE BEHAVIOR SUMMARY
═══════════════════════════════════════
- Mobile: nav CTA hidden; hamburger centered; menu is full-screen slide-up; marquee cards 240×320; curved masks 80px tall; bottom CTAs stacked
- sm+: nav CTA visible; menu becomes right drawer max-w-sm slide-from-right; marquee cards 320×512; masks 100px; bottom CTAs side-by-side
- Typography scales: hero 4xl → 5xl → 7xl → 5.5rem

═══════════════════════════════════════
INTERACTION / MOTION CHECKLIST (must all exist)
═══════════════════════════════════════
✓ Hamburger line shrink on hover
✓ Menu overlay fade + blur
✓ Mobile menu slide up / desktop slide from right (500ms, cubic-bezier(0.16,1,0.3,1))
✓ Hamburger→X morph on close button
✓ Staggered link slide-in (150 + i*60 ms)
✓ CTA fade/slide with 400ms delay
✓ Body scroll lock while menu open
✓ Infinite image marquee at 0.8px/frame
✓ Pointer drag with setPointerCapture
✓ Velocity-based inertia (decay 0.95)
✓ Seamless loop via duplicated strip + half-width wrap
✓ Grab / grabbing cursor states
✓ Underline decoration color hover on bottom links
✓ Book meeting pill hover to neutral-800

═══════════════════════════════════════
DO NOT
═══════════════════════════════════════
- Do not use Inter/Roboto/system UI as primary font (use Geist)
- Do not add hero cards, badges, stats, or overlays on images
- Do not use CSS @keyframes marquee instead of the rAF + drag physics system
- Do not change copy, link labels, logo path, mask SVG paths, or image URLs
- Do not add purple/cream/dark themes

Reproduce layout, copy, assets, fonts, masks, menu physics, and marquee drag physics exactly as specified above.
```

---