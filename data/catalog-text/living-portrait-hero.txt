Build a 3D Creator portfolio landing page with an interactive living portrait for "Mina" using React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The page has a dark theme (#0C0C0C background) with the font Kanit (Google Fonts, weights 300-900). The page title is "Mina -- 3D Creator".

FONT
Load exactly: https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap with preconnect to https://fonts.googleapis.com and https://fonts.gstatic.com (crossorigin).

GLOBAL STYLES
Background: #0C0C0C on html, body, #root, and the main wrapper
Font family: 'Kanit', sans-serif
Global reset: box-sizing border-box, margin 0, padding 0
CSS class .hero-heading: gradient text using background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%) with -webkit-background-clip: text and -webkit-text-fill-color: transparent
Main wrapper has overflowX: 'clip'
SECTION ORDER
HeroSection
MarqueeSection
AboutSection
ServicesSection
ProjectsSection
1. HERO SECTION
Full viewport height (h-screen), flex column layout with overflowX: clip.

Navbar: Horizontal nav bar with 4 links -- "About", "Price", "Projects", "Contact" -- evenly spaced with justify-between. Text color #D7E2EA, font-medium, uppercase, tracking-wider. Sizes: text-sm md:text-lg lg:text-[1.4rem]. Padding: px-6 md:px-10 pt-6 md:pt-8. Hover: opacity 70% with 200ms transition.

Hero Heading: Massive h1 with text "Hi, i'm mina" (lowercase "i", curly apostrophe via &apos;). Uses the .hero-heading gradient text class. Font-black, uppercase, tracking-tight, leading-none, whitespace-nowrap, w-full. Font sizes: text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]. Margin top: mt-6 sm:mt-4 md:-mt-5. Wrapped in overflow-hidden container.

Bottom bar: Flexbox justify-between items-end with pb-7 sm:pb-8 md:pb-10:

Left: paragraph text "a 3d creator driven by crafting striking and unforgettable projects", color #D7E2EA, font-light, uppercase, tracking-wide, leading-snug. Font size: clamp(0.75rem, 1.4vw, 1.5rem). Max-width: max-w-[160px] sm:max-w-[220px] md:max-w-[260px].
Right: ContactButton component (see below)
Hero Portrait: The Living Portrait, exactly as specified in section 6 below. It is centred in the hero both ways (absolute, left 50%, top 50%, translate(-50%, -50%), z-10). Width: 400px, 500px from 640px, 600px from 768px, clamp(640px, 78vh, 46vw) from 1024px. There is NO Magnet effect on it any more.

FadeIn animations: Navbar fades in with delay 0, y -20. Heading: delay 0.15, y 40. Left text: delay 0.35, y 20. Contact button: delay 0.5, y 20. Portrait: delay 0.6, y 30.

2. MARQUEE SECTION
Two rows of images that scroll horizontally based on page scroll position. Background #0C0C0C. Padding: pt-24 sm:pt-32 md:pt-40 pb-10.

21 GIF images from motionsites.ai (exact URLs):


https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif
https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif
https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif
https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif
https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif
https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif
https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif
https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif
https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif
https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif
https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif
https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif
https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif
https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif
https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif
https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif
https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif
https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif
https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif
https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif
https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif
Row 1: first 11 images, tripled for seamless scrolling. Moves RIGHT on scroll (translateX(offset - 200)).
Row 2: remaining 10 images, tripled. Moves LEFT on scroll (translateX(-(offset - 200))).
Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
Each image tile: 420px x 270px, rounded-2xl, object-cover, lazy loaded.
Gap between tiles: gap-3. Gap between rows: gap-3.
Uses willChange: 'transform' for performance. Scroll listener is passive.
3. ABOUT SECTION
Full-height centered section with min-h-screen, padding px-5 sm:px-8 md:px-10 py-20.

Four decorative 3D images positioned absolutely in corners:

Top-left: Moon icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] left-[1%] sm:left-[2%] md:left-[4%]. FadeIn: delay 0.1, x -80, y 0, duration 0.9.
Bottom-left: 3D object -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png -- w-[100px] sm:w-[140px] md:w-[180px], positioned bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]. FadeIn: delay 0.25, x -80, y 0, duration 0.9.
Top-right: Lego icon -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png -- w-[120px] sm:w-[160px] md:w-[210px], positioned top-[4%] right-[1%] sm:right-[2%] md:right-[4%]. FadeIn: delay 0.15, x 80, y 0, duration 0.9.
Bottom-right: 3D group -- https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png -- w-[130px] sm:w-[170px] md:w-[220px], positioned bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]. FadeIn: delay 0.3, x 80, y 0, duration 0.9.
Heading: "About me" using .hero-heading gradient text, font-black, uppercase, leading-none, tracking-tight, centered. Font size: clamp(3rem, 12vw, 160px). FadeIn: delay 0, y 40.

Animated paragraph: Uses a character-by-character scroll-driven opacity animation. Text: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" -- color #D7E2EA, font-medium, centered, leading-relaxed, max-w-[560px], font size clamp(1rem, 2vw, 1.35rem). Each character animates from opacity 0.2 to 1 based on scroll progress, with scroll offset ['start 0.8', 'end 0.2'].

Contact button below the text block. Gap between heading/text: gap-10 sm:gap-14 md:gap-16. Gap between text block and button: gap-16 sm:gap-20 md:gap-24.

4. SERVICES SECTION
White background (#FFFFFF), with rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] top corners. Padding: px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32.

Heading: "Services" in #0C0C0C, font-black, uppercase, centered, font size clamp(3rem, 12vw, 160px). Margin bottom: mb-16 sm:mb-20 md:mb-28.

5 service items in a vertical list, max-w-5xl, centered:

01 - 3D Modeling: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
02 - Rendering: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
03 - Motion Design: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
04 - Branding: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
05 - Web Design: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
Each item: horizontal layout with number (font-black, font size clamp(3rem, 10vw, 140px), color #0C0C0C) on the left and name + description stacked vertically on the right. Name: font-medium, uppercase, font size clamp(1rem, 2.2vw, 2.1rem). Description: font-light, leading-relaxed, max-w-2xl, font size clamp(0.85rem, 1.6vw, 1.25rem), opacity 0.6. Items separated by 1px borders (rgba(12, 12, 12, 0.15)). Padding: py-8 sm:py-10 md:py-12. Staggered FadeIn: each item delays by i * 0.1.

5. PROJECTS SECTION
Dark background (#0C0C0C), rounded top corners rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px], pulled up with -mt-10 sm:-mt-12 md:-mt-14, z-10.

Heading: "Project" (singular) using .hero-heading gradient, same styling as other headings.

3 sticky-stacking project cards that scale down as you scroll past them (card stacking effect using Framer Motion useScroll and useTransform). Each card is sticky top-24 md:top-32 inside an h-[85vh] container.

Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03. Each card offset by top: ${index * 28}px.

Each card has: rounded-[40px] sm:rounded-[50px] md:rounded-[60px], border-2 border-[#D7E2EA], background #0C0C0C, padding p-4 sm:p-6 md:p-8.

Card layout:

Top row: Number (huge, same style as services), category label, project name, and a "Live Project" ghost button (rounded-full, border-2 #D7E2EA, uppercase, tracking-widest).
Bottom row: Two-column image grid -- left column (40% width) has 2 stacked images, right column (60%) has 1 tall image. All images have heavy border radius rounded-[40px] sm:rounded-[50px] md:rounded-[60px]. Left top image height: clamp(130px, 16vw, 230px). Left bottom image height: clamp(160px, 22vw, 340px).
Project data with CloudFront image URLs:

Project 01 - "Nextlevel Studio" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85
Project 02 - "Aura Brand Identity" (Personal):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85
Project 03 - "Solaris Digital" (Client):

Col1 image 1: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85
Col1 image 2: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85
Col2 image: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85
REUSABLE COMPONENTS
ContactButton: Rounded-full pill button with gradient background linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%), inner box-shadow 0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, white 2px outline with -3px offset. Text: white, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4, text text-xs sm:text-sm md:text-base. Label: "Contact Me".

LiveProjectButton: Ghost/outline pill button. Rounded-full, border-2 border-[#D7E2EA], text color #D7E2EA, font-medium, uppercase, tracking-widest. Sizes: px-8 py-3 sm:px-10 sm:py-3.5, text text-sm sm:text-base. Hover: bg-[#D7E2EA]/10. Label: "Live Project".

FadeIn: Framer Motion wrapper using whileInView with viewport={{ once: true, margin: "50px", amount: 0 }}. Accepts delay, duration (default 0.7), x (default 0), y (default 30). Easing: [0.25, 0.1, 0.25, 1]. Uses motion.create() for dynamic element types.

Magnet: Mouse-following magnetic hover effect. Tracks mouse position relative to element center, applies translate3d transform divided by strength factor. Activates when cursor is within padding distance of element edge. Smooth transition in (0.3s ease-out) and out (0.6s ease-in-out). Uses willChange: 'transform'.

AnimatedText: Character-by-character scroll-reveal text animation. Each character goes from opacity 0.2 to 1 based on its position in the text relative to scroll progress. Uses Framer Motion useScroll targeting the paragraph element with offset ['start 0.8', 'end 0.2']. Each character uses invisible placeholder + absolute positioned animated span.

KEY DEPENDENCIES
react, react-dom (^18.3.1)
framer-motion (^12.38.0)
lucide-react (^0.344.0)
tailwindcss (^3.4.1)
vite, typescript
RESPONSIVE BREAKPOINTS
All sections use Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px) with mobile-first approach. Heavy use of clamp() for fluid typography. The entire design scales gracefully from mobile to ultra-wide screens.

6. THE LIVING PORTRAIT (the signature of this page)

The portrait is a floating 3D-animated head of an adult Korean woman with shoulder-length dark-brown hair, pearl earrings and a soft smile. She feels alive. It is built from 59 separately generated pictures of the same face, all pixel-aligned, swapped on a soft stretchy sheet in WebGL. Use the exact picture ids in the code below. Do not fake expressions with code.

Hard rules, because each of these was a real bug:
- Only ONE picture is ever on screen. Never composite eye patches, hair masks or overlays over a face: they cause double eyes, double chins, black outlines and spots. Changes between pictures are a crossfade of 70ms at most.
- Gaze is whole pictures, 16 directions plus half and closed lids.
- The sheet must never fold. Overlapping triangles draw as a comb of cuts, so every frame each row and column is forced back into order with a minimum gap (the untangle step). The hand's radius and pull limit are also chosen so the slope cannot fold.
- Physics runs at a fixed 1/240s step whatever the frame rate, otherwise it tears into spikes on large screens.
- She never changes her expression on her own while the visitor is active. Self-playing acts only start after 30 to 45 seconds with no input, and any input ends them at once.

Behaviour:
- Page load: her eyes are closed. The first pointer move wakes her through half to open.
- Moving the cursor: her eyes follow it in 16 directions everywhere on the page, and she blinks every 2.2 to 5.6 seconds. Her head leans slightly toward the cursor.
- Hover, reacting after 80ms: lips kiss, nose goes cross-eyed, either eye winks. The forehead, cheeks, chin and hair do not change her face on hover; her eyes keep following.
- Tap: forehead angry, eyes ouch, nose plays the sneeze act, lips tongue out, cheek puffed, chin laugh.
- Tap on hair: cycles pink, blue, blonde and back to her own hair. Colours persist. The colour pictures face forward, so her eyes rest while coloured, and expressions show her own hair.
- Grab and pull anywhere: the skin stretches like dough and ripples back. Pull distance moves her from shock to ouch to scared. On release she looks scrunched or dizzy; after 5 pulls in 14 seconds she gets angry, after 8 she cries.
- Shaking the cursor fast blows her hair, and keeping it up turns her sick.
- Hovering the Contact Me button gives heart eyes, and leaving it gives a grin.
- Scrolling makes her look down.
- Idle acts, in rotation: yawn, shifty eyes, a gum bubble that pops on her face, a fly that lands on her nose and is blown off, flirt, eye roll, sneeze, trying on hair colours, a ghost hand tugging her cheek, cross-eyed fish face, whistle, dozing off and snoring, cheeky tongue, starry eyes, and crying.

Markup inside the hero:

```html
<div class="hero-portrait-wrap" id="magnetWrap">
        <div class="hero-portrait-inner fade-in" id="magnetInner" style="--fade-y: 30px;" data-delay="600">
          <img id="faceFallback" src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a.png&w=1024&q=92" alt="Portrait" />
          <canvas id="faceGl" aria-hidden="true"></canvas>
          <div id="faceProps" aria-hidden="true">
            <svg id="faceFly" viewBox="0 0 32 32"><path class="wing" d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z"/><path class="wing r" d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z"/><ellipse cx="16" cy="19.500" rx="4" ry="6.500"/><circle cx="16" cy="11.500" r="3.300"/></svg>
            <svg id="faceHand" viewBox="0 0 32 32"><path class="open" d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"/><path class="grab" d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"/></svg>
          </div>
        </div>
      </div>
```

CSS (use verbatim):

```css
/* Hero portrait with magnet */
.hero-portrait-wrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 400px;
  top: 50%;
  transform: translate(-50%, -50%);
  touch-action: pan-y;
}
.hero-portrait-inner {
  transition: transform 0.6s ease-in-out;
  will-change: transform;
}
.hero-portrait-inner { position: relative; }
.hero-portrait-inner img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}
#faceGl { position: absolute; left: -35%; top: -35%; width: 170%; height: 170%; pointer-events: none; }
#faceProps { position: absolute; inset: 0; pointer-events: none; }
#faceFly, #faceHand { position: absolute; opacity: 0; transition: opacity .2s; transform: translate(-50%, -50%); }
#faceFly { width: 6%; fill: #111; }
#faceFly .wing { fill: rgba(220, 235, 255, .7); transform-origin: 16px 15px; animation: flap .05s linear infinite alternate; }
#faceFly .wing.r { animation-direction: alternate-reverse; }
@keyframes flap { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
#faceHand { width: 11%; fill: #fff; stroke: #0c0c0c; stroke-width: 1.4; stroke-linejoin: round; }
#faceHand .grab { display: none; }
#faceHand.shut .open { display: none; }
#faceHand.shut .grab { display: block; }
```

Engine (use verbatim, placed just before the closing body tag). It has no dependencies. All picture ids are in IDS, and each is requested through the images.higgs.ai proxy shown in the code, with crossOrigin anonymous:

```html
<script>
  // ===== LIVING PORTRAIT =====
  // A photo-like head on a soft sheet. Every expression, gaze and blink is a separately generated
  // picture of the same face; the code only decides which one to show and makes the skin move.
  (() => {
    const P = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_';
    const SHEETW = innerWidth < 760 ? 640 : 1024;
    const url = id => P + id + '.png&w=' + SHEETW + '&q=90';
    const IDS = {"left":"20261031_041539_0c28e75d-625c-458f-8856-6b453a928025","closed":"20261031_041538_8fc82176-77a6-4184-8f32-945745b2f221","shock":"20261031_041539_ee462c23-6248-4ef8-83d4-807441048b67","tongue":"20261031_041539_75259b31-bca1-4dcd-adb9-31a25fa07a11","right":"20261031_041648_92b934ff-4d25-4e28-972f-cef1e88f054f","downleft":"20261031_041648_94ec5df2-86e4-481d-a104-6604cd3ee36b","upright":"20261031_041648_8de72dda-4c29-4d52-a259-acb682b21567","up":"20261031_041648_736f4839-4571-4677-898f-c5f64bfeb525","downright":"20261031_041649_eed87373-0d0c-4401-ab76-ad8da40421d3","down":"20261031_041649_143660e6-f71a-4874-b97f-fb8890d5b1a1","half":"20261031_041704_053e92a5-721a-4f93-86d8-631c1b8ea31a","cross":"20261031_041705_dc163465-5cfa-40c1-8c43-76c5deb789a0","angry":"20261031_041706_bc89f0b6-438d-46fc-86bd-d3ae08b1a561","scrunch":"20261031_041706_87b48b08-cc37-4278-96c2-8ac49d48a165","winkr":"20261031_041705_f622e78c-2c3d-4635-b4ac-bab0e5b2862a","winkl":"20261031_041705_df901488-4988-4b29-9517-44d417ead6f2","raised":"20261031_041705_53d6bed3-91ae-47f4-a306-6615fc30c3a7","puff":"20261031_041721_69a2bd4b-a663-4638-9fe1-952d640726e5","laugh":"20261031_041722_402f7a03-a57c-418c-a513-65d5ee89aecf","yawn":"20261031_041726_3ccd0f66-112a-408b-870d-84a73b907211","grin":"20261031_041722_14bedc29-1d7e-407f-800c-f8a584be9743","kiss":"20261031_041722_c9dfa379-7ad7-469a-a7a1-2207ea3b2132","cry":"20261031_041725_ab6d29ed-9c51-4d18-9a19-15161a42b914","smug":"20261031_041726_941343db-f191-42e2-a20d-76471622963b","scared":"20261031_041742_76d19aad-5f53-4657-bda1-ed0ba07d0919","fish":"20261031_041738_1b8b311f-0b40-4014-9301-f855cadf7775","blue":"20261031_041743_0d2ae3ce-1ef4-4e25-bde2-f850d836a452","dizzy":"20261031_041739_d2d94cc6-c8a8-4948-b160-433b4ee8d335","blonde":"20261031_041745_54be8d58-68ad-4cdc-b894-57f3820521fc","pink":"20261031_041742_b07d9eeb-d0c2-4684-bd82-dd0a34faae70","wind":"20261031_041748_a042c812-0a19-4c44-8e26-19ebba49d827","sse":"20261031_041847_06cd56a3-85a3-428f-9761-40f0455fea28","nnw":"20261031_041848_c954304f-6a0f-40e7-90a7-61e760ec3217","ese":"20261031_041848_cf01800b-186c-4534-b3fa-839000a9ab40","ene":"20261031_041848_5baf5c75-5af4-43cc-9e36-6d5bb7268cc9","wnw":"20261031_041848_9b609e34-57f0-47f0-a733-270f3d487766","ssw":"20261031_041848_08ae5fa2-0ba2-43b3-948c-dcde293d6957","wsw":"20261031_041849_84482741-9730-4a28-be2f-e85c04206a2d","ouch":"20261031_041903_1df48a13-6d25-42e4-9666-f762bc338f2a","deadpan":"20261031_041904_18bc71c8-d88a-4c12-9e43-82b8ac222b00","yawn1":"20261031_041904_3b68d48d-633a-4761-9af7-e574da308039","yawn2":"20261031_041904_7027967a-59be-4eec-b6e1-6ec2255df748","whistle1":"20261031_041905_03626778-4a7a-4bd8-9136-658e44c36fe3","nne":"20261031_041903_73a000c6-37b6-48a1-a60a-628954160c41","yawn4":"20261031_041905_66ce2f38-8e7d-4ade-b678-9020af378b08","sneeze1":"20261031_041920_d4fee90e-7fb7-43ff-b378-bc549653f68d","gum1":"20261031_041921_3c249ba4-f88e-49f5-b985-c7380ec5c91a","gum2":"20261031_041922_8d65cee5-5d05-4c89-a3c9-8a397c060e04","whistle2":"20261031_041920_ba051a0a-45bb-4004-b0e6-73d2cd519d71","sneeze2":"20261031_041920_f30e74cb-21f3-4f11-8b9d-e4a1f469307e","gum3":"20261031_041923_a427c4d9-f78a-41e5-acd6-91adc3c79025","gumpop":"20261031_041926_358ed853-58d5-45c0-bcb6-f052169c6f2d","hearts":"20261031_041938_b3929b4d-e3d9-4e5d-8cd0-7ec8ef5248ba","stars":"20261031_041940_4128a9d8-9ce2-4b51-a8b7-84cdcb0b4f12","snore":"20261031_041936_e5a6759e-7dd8-4425-a913-98ac6633603f","shy":"20261031_041937_7f0eff0c-37ce-4d0c-9f5d-547d75e45e93","sick":"20261031_041941_59aa6c28-2fc5-40d7-bb9a-699fd8539d59","rest":"20261031_040619_2f6f349e-a4a7-40db-8e9b-03b6acd8b99a"};

    // sixteen gaze directions plus half and closed lids: each is a whole picture of her, swapped like any other face
    const RING = ['e', 'ene', 'ne', 'nne', 'n', 'nnw', 'nw', 'wnw', 'w', 'wsw', 'sw', 'ssw', 's', 'sse', 'se', 'ese'];
    const EYEFILE = {e: 'right', ene: 'ene', ne: 'upright', nne: 'nne', n: 'up', nnw: 'nnw', nw: 'wnw', wnw: 'wnw', w: 'left', wsw: 'wsw', sw: 'downleft', ssw: 'ssw', s: 'down', sse: 'sse', se: 'downright', ese: 'ese', half: 'half', closed: 'closed'};
    const HAIRS = ['pink', 'blue', 'blonde'];

    const OVER = 1.7, N = 72, M = N + 1, SPAN = OVER / N, ORIGIN = .5 - OVER / 2;
    const WOBBLE = 2.3 * 2 * Math.PI, REACH = .085 / SPAN, C = REACH * WOBBLE, GAMMA = 2 * .14 * WOBBLE, NU = .2 * C;

    const wrap = document.getElementById('magnetWrap'), canvas = document.getElementById('faceGl'), layer = document.getElementById('faceProps');
    const fly = document.getElementById('faceFly'), hand = document.getElementById('faceHand');
    const gl = canvas.getContext('webgl', {alpha: true, premultipliedAlpha: true, antialias: true});
    if (!gl) return;
    window.__faceEngine = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const VS = `attribute vec2 a, d; attribute float s; varying vec2 vUv; varying float vS;
      uniform vec2 lean; uniform float overS;
      void main(){ vUv = a; vS = s; vec2 p = a + d + lean; gl_Position = vec4(vec2(p.x-.5, .5-p.y)*2./overS, 0., 1.); }`;
    const FS = `precision highp float; varying vec2 vUv; varying float vS;
      uniform sampler2D faceA, faceB;
      uniform float fade;
      void main(){
        if(vUv.x<0.||vUv.y<0.||vUv.x>1.||vUv.y>1.){ gl_FragColor = vec4(0.); return; }
        vec4 c = mix(texture2D(faceA,vUv), texture2D(faceB,vUv), fade);
        if(c.a<.004){ gl_FragColor = vec4(0.); return; }
        gl_FragColor = vec4(c.rgb*vS, c.a);
      }`;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(o)); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr); gl.useProgram(pr);
    const U = {over_: gl.getUniformLocation(pr, 'overS')};
    for (const n of ['lean', 'faceA', 'faceB', 'fade']) U[n] = gl.getUniformLocation(pr, n);
    gl.uniform1f(U.over_, OVER);
    gl.uniform1i(U.faceA, 0); gl.uniform1i(U.faceB, 1); 

    // ---- the sheet: a damped wave equation on the displacement of each node ----
    const count = M * M, ux = new Float32Array(count), uy = new Float32Array(count), vx = new Float32Array(count), vy = new Float32Array(count);
    const rest = new Float32Array(count * 2), dyn = new Float32Array(count * 3);
    const sx = new Float32Array(count), sy = new Float32Array(count);
    for (let j = 0, k = 0; j < M; j++) for (let i = 0; i < M; i++) { rest[k++] = ORIGIN + i * SPAN; rest[k++] = ORIGIN + j * SPAN; }
    const idx = new Uint16Array(N * N * 6);
    for (let j = 0, k = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * M + i, b = a + 1, c = a + M, d = c + 1; idx[k++] = a; idx[k++] = c; idx[k++] = b; idx[k++] = b; idx[k++] = c; idx[k++] = d; }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, rest, gl.STATIC_DRAW);
    const aa = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(aa); gl.vertexAttribPointer(aa, 2, gl.FLOAT, false, 0, 0);
    const dynBuf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf); gl.bufferData(gl.ARRAY_BUFFER, dyn, gl.DYNAMIC_DRAW);
    const ad = gl.getAttribLocation(pr, 'd'), as = gl.getAttribLocation(pr, 's');
    gl.enableVertexAttribArray(ad); gl.vertexAttribPointer(ad, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(as); gl.vertexAttribPointer(as, 1, gl.FLOAT, false, 12, 8);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.clearColor(0, 0, 0, 0);

    // a handful of skin: nodes near the point follow the hand, fully at the centre
    let brush = null;
    function takeHold(u, v, radius = .22) {
      const list = [];
      for (let k = 0; k < count; k++) {
        const dx = rest[k * 2] + ux[k] - u, dy = rest[k * 2 + 1] + uy[k] - v, w = Math.exp(-(dx * dx + dy * dy) / (radius * radius));
        if (w > .02) list.push([k, w, ux[k], uy[k]]);
      }
      brush = {u, v, list, px: 0, py: 0};
    }
    // The sheet must never fold over itself: overlapping triangles draw as a comb of cuts.
    // Every frame, whatever the physics did, each row and column is forced back into order
    // with a minimum gap between neighbours, so the picture can squash but never cross.
    const GAP = SPAN * .34, lineA = new Float32Array(M), lineB = new Float32Array(M), lineP = new Float32Array(M);
    function order(start, stride, field, base) {
      for (let i = 0; i < M; i++) { const k = start + i * stride; lineP[i] = base[k] + field[k]; }
      lineA[0] = lineP[0]; for (let i = 1; i < M; i++) lineA[i] = Math.max(lineP[i], lineA[i - 1] + GAP);
      lineB[N] = lineP[N]; for (let i = N - 1; i >= 0; i--) lineB[i] = Math.min(lineP[i], lineB[i + 1] - GAP);
      for (let i = 0; i < M; i++) { const k = start + i * stride; field[k] = (lineA[i] + lineB[i]) / 2 - base[k]; }
    }
    const restX = new Float32Array(count), restY = new Float32Array(count);
    for (let k = 0; k < count; k++) { restX[k] = rest[k * 2]; restY[k] = rest[k * 2 + 1]; }
    function untangle() {
      for (let pass = 0; pass < 2; pass++) {
        for (let j = 0; j < M; j++) order(j * M, 1, sx, restX);
        for (let i = 0; i < M; i++) order(i, M, sy, restY);
      }
    }

    const H = 1 / 240; let simLeft = 0;
    function step(dt) {
      const c2 = C * C, wo2 = WOBBLE * WOBBLE;
      for (let j = 1; j < N; j++) for (let i = 1; i < N; i++) {
        const k = j * M + i, l = k - 1, r = k + 1, t = k - M, b = k + M;
        const lx = ux[l] + ux[r] + ux[t] + ux[b] - 4 * ux[k], ly = uy[l] + uy[r] + uy[t] + uy[b] - 4 * uy[k];
        const lvx = vx[l] + vx[r] + vx[t] + vx[b] - 4 * vx[k], lvy = vy[l] + vy[r] + vy[t] + vy[b] - 4 * vy[k];
        vx[k] += (c2 * lx - wo2 * ux[k] - GAMMA * vx[k] + NU * lvx) * dt;
        vy[k] += (c2 * ly - wo2 * uy[k] - GAMMA * vy[k] + NU * lvy) * dt;
      }
      if (brush) for (const [k, w, u0, v0] of brush.list) {
        const K = 3000 * w, D = 90 * w;
        vx[k] += ((u0 + brush.px * w - ux[k]) * K - vx[k] * D) * dt;
        vy[k] += ((v0 + brush.py * w - uy[k]) * K - vy[k] * D) * dt;
      }
      for (let k = 0; k < count; k++) { ux[k] += vx[k] * dt; uy[k] += vy[k] * dt; }
    }
    // a shove from nowhere: sneezes, jolts, a fly landing
    function poke(u, v, dx, dy, radius = .09) {
      for (let k = 0; k < count; k++) {
        const ax = rest[k * 2] - u, ay = rest[k * 2 + 1] - v, w = Math.exp(-(ax * ax + ay * ay) / (radius * radius));
        vx[k] += dx * w; vy[k] += dy * w;
      }
    }

    // ---- pictures ----
    const tex = {};
    const param = () => { gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); };
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    const load = name => new Promise(res => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = () => res(null); i.src = url(IDS[name]); });
    function upload(name, img) { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE5); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); param(); tex[name] = t; }

    function hitMap(img) {
      const a = document.createElement('canvas'); a.width = a.height = 128;
      const ac = a.getContext('2d', {willReadFrequently: true}); ac.drawImage(img, 0, 0, 128, 128);
      alphaMap = ac.getImageData(0, 0, 128, 128).data;
    }

    // ---- what she does ----
    const SPOT = {nose: [.5, .54], brow: [.5, .34], cheekR: [.66, .57], cheekL: [.34, .57], mouth: [.505, .645]};
    // [picture or eye cell, crossfade ms, hold ms, extras]
    const ACTS = {
      yawn: [['yawn1', 140, 240], ['yawn2', 140, 200], ['yawn', 170, 900], ['yawn2', 150, 130], ['yawn4', 180, 700]],
      whistle: [['whistle1', 150, 700], ['whistle2', 100, 700], ['whistle1', 100, 620], ['whistle2', 100, 620]],
      shifty: [['eye:w', 60, 520], ['eye:e', 60, 600], ['eye:w', 60, 400], ['eye:rest', 60, 260]],
      roll: [['eye:w', 70, 200], ['eye:wnw', 50, 55], ['eye:nw', 50, 55], ['eye:nnw', 50, 60], ['eye:n', 50, 140], ['eye:nne', 50, 60], ['eye:ne', 50, 55], ['eye:ene', 50, 55], ['eye:e', 50, 240], ['eye:rest', 90, 200], ['deadpan', 120, 700]],
      sneeze: [['sneeze1', 130, 380], ['half', 90, 120], ['sneeze1', 90, 560], ['sneeze2', 50, 300, {jolt: [.5, .6, 0, 1.5, .34], lean: [0, .03]}], ['dizzy', 110, 620], ['shy', 140, 650]],
      gum: [['gum1', 130, 800], ['gum2', 180, 460], ['gum3', 200, 760], ['gumpop', 40, 1300, {jolt: [.5, .63, 0, -1.1, .3]}], ['deadpan', 200, 700], ['laugh', 130, 700]],
      doze: [['half', 450, 700, {lean: [.006, .006]}], ['closed', 320, 500, {lean: [.012, .012]}], ['half', 200, 340], ['closed', 400, 1100, {lean: [.02, .02]}], ['snore', 260, 3400, {lean: [.03, .03], wake: 1}], ['shock', 50, 650, {jolt: [.5, .5, 0, -.9, .3]}]],
      flirt: [['smug', 130, 520], ['winkr', 80, 420], ['kiss', 120, 560], ['hearts', 120, 900], ['shy', 160, 620]],
      cheeky: [['winkl', 90, 340], ['tongue', 110, 900], ['grin', 120, 620]],
      cross: [['cross', 140, 800], ['fish', 130, 800], ['puff', 120, 700, {jolt: [.5, .6, 0, -.25, .3]}], ['laugh', 90, 800]],
      sad: [['raised', 140, 500], ['cry', 240, 1500], ['shy', 200, 520]],
      wow: [['stars', 130, 1000], ['grin', 140, 640]],
      fly: 'fly', tug: 'tug', hair: 'hair'
    };
    const ROTATION = ['yawn', 'shifty', 'gum', 'fly', 'flirt', 'roll', 'sneeze', 'hair', 'tug', 'cross', 'whistle', 'doze', 'cheeky', 'wow', 'sad'];
    // what each part of her answers to
    const ZONES = {
      hover: {eyeL: 'winkl', eyeR: 'winkr', nose: 'cross', mouth: 'kiss'},
      tap: {brow: 'angry', eyeL: 'ouch', eyeR: 'ouch', nose: 'act:sneeze', mouth: 'tongue', cheek: 'puff', chin: 'laugh'}
    };
    const zoneAt = (u, v) => {
      const a = (u - .505) / .225, b = (v - .485) / .33;
      if (a * a + b * b > 1 || v < .23) return 'hair';
      if (v < .385) return 'brow';
      if (Math.abs(v - .455) < .05 && u > .33 && u < .455) return 'eyeL';
      if (Math.abs(v - .455) < .05 && u > .545 && u < .67) return 'eyeR';
      if (Math.abs(u - .5) < .055 && v < .6) return 'nose';
      if (v > .6 && v < .71 && Math.abs(u - .5) < .1) return 'mouth';
      return v > .71 ? 'chin' : 'cheek';
    };

    // state
    let ready = false, alphaMap = null, tStart = 0, last = performance.now();
    let mx = 0, my = 0, pu = .5, pv = .5, onHead = false, zone = null, zoneSince = 0;
    let lastInput = -1e9, awake = false, pressed = false, downAt = 0, downU = 0, downV = 0, lastX = 0, lastY = 0, speed = 0, shake = 0;
    let moodFace = null, moodUntil = 0, pulls = [], lookAt = null;
    let act = null, actI = 0, actT = 0, rotation = [], nextIdle = 30000;
    let faceA = 'rest', faceB = 'rest', fadeT = 0, fadeMs = 1;
    let logical = 'rest', logicalMs = 70, eyeNow = 'rest', eyeNowMs = 40;
    let nextBlink = 0, blinkStep = -1, blinkT = 0;
    let leanX = 0, leanY = 0, lvX = 0, lvY = 0, wantLean = [0, 0];
    let hairI = -1;   // -1 is her own hair, then each colour in turn
    const pullNow = [0, 0];

    const fileOf = cell => cell === 'rest' ? 'rest' : EYEFILE[cell];
    const setFace = (n, ms) => { logical = n; logicalMs = ms; };
    const setEye = (cell, ms) => { if (tex[fileOf(cell)]) { eyeNow = cell; eyeNowMs = ms; } };
    // one picture on screen at a time, always
    function show(n, ms, now) {
      if (!tex[n] || n === faceB) return;
      faceA = (now - fadeT) / fadeMs > .5 ? faceB : faceA; faceB = n; fadeT = now; fadeMs = Math.min(70, Math.max(1, ms));
    }
    function compose(now) {
      if (logical !== 'rest') show(logical, logicalMs, now);
      else if (hairI >= 0) show(HAIRS[hairI], 70, now);   // no gaze pictures exist in colour, so she faces front
      else show(fileOf(eyeNow), eyeNowMs, now);
    }
    const ringFor = (dx, dy) => RING[Math.round(((Math.atan2(-dy, dx) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 8)) % 16];

    function startAct(name, now) {
      endAct();
      const a = ACTS[name];
      if (a === 'fly') act = flyAct(); else if (a === 'tug') act = tugAct(); else if (a === 'hair') act = hairAct(); else act = a;
      actI = -1; actT = now; advance(now);
    }
    function endAct() {
      act = null; fly.style.opacity = 0; hand.style.opacity = 0; lookAt = null;
      if (handHeld) { handHeld = false; brush = null; pullNow[0] = pullNow[1] = 0; }
    }
    function advance(now) {
      actI++;
      if (!act || actI >= act.length) { endAct(); return; }
      const [show, fade, , x] = act[actI]; actT = now;
      if (show.startsWith('eye:')) { setFace('rest', fade, now); setEye(show.slice(4), fade, now); wantEyes = show.slice(4); }
      else if (show === 'half' || show === 'closed') { setFace('rest', fade, now); setEye(show, fade, now); wantEyes = show; }
      else { wantEyes = null; setFace(show, fade, now); }
      if (x) {
        if (x.jolt) poke(...x.jolt);
        wantLean = x.lean || [0, 0];
        if (x.call) x.call(now);
      } else wantLean = [0, 0];
    }
    let wantEyes = null, handHeld = false, handFrom = [1.4, .9], handTo = [1.4, .9], flyFrom = [1.4, 0], flyTo = [1.4, 0], moveT = 0, moveMs = 1;
    const place = (el, u, v) => { el.style.left = ((u - .5) * 100 + 50) + '%'; el.style.top = ((v - .5) * 100 + 50) + '%'; };
    const moveHand = (u, v, ms) => (now) => { handFrom = handTo; handTo = [u, v]; moveT = now; moveMs = ms; };
    const moveFly = (u, v, ms) => (now) => { flyFrom = flyTo; flyTo = [u, v]; moveT = now; moveMs = ms; };

    function flyAct() {
      flyTo = [1.35, .02]; fly.style.opacity = 1; lookAt = () => flyPos;
      const hop = (u, v, ms) => ['rest', 40, ms, {call: moveFly(u, v, ms * .9)}];
      return [hop(.92, .2, 620), hop(.1, .32, 680), hop(.9, .66, 640), hop(.16, .62, 600), hop(...SPOT.nose, 520),
        ['cross', 110, 950, {jolt: [.5, .54, 0, .28, .05]}],
        ['whistle1', 90, 340, {call: moveFly(.5, .3, 280)}], ['deadpan', 110, 480, {call: moveFly(...SPOT.nose, 320)}],
        ['cross', 90, 560, {jolt: [.5, .54, 0, .28, .05]}],
        ['whistle2', 90, 620, {call: moveFly(1.5, -.35, 600)}], ['smug', 120, 600]];
    }
    function tugAct() {
      handTo = [1.3, .86]; hand.style.opacity = 1; hand.classList.remove('shut');
      const g = (u, v, ms, face, grip) => [face, 90, ms, {call: now => { moveHand(u, v, ms * .8)(now); handGrip = grip; }}];
      return [g(...SPOT.cheekR, 760, 'eye:se', false), g(...SPOT.cheekR, 240, 'shock', 'on'),
        g(.95, .5, 620, 'ouch', 'pull'), g(.86, .56, 240, 'ouch', 'pull'), g(.98, .48, 240, 'ouch', 'pull'), g(.9, .52, 260, 'ouch', 'pull'),
        g(1.4, .22, 1000, 'dizzy', 'off'), ['angry', 120, 620]];
    }
    let handGrip = false;
    function hairAct() { return [['pink', 70, 950], ['blue', 70, 850], ['blonde', 70, 950], ['rest', 70, 200]]; }

    // ---- input ----
    const toUv = (x, y) => { const r = canvas.getBoundingClientRect(); return [((x - r.left) / r.width - .5) * OVER + .5, ((y - r.top) / r.height - .5) * OVER + .5]; };
    const solid = (u, v) => alphaMap && u >= 0 && v >= 0 && u < 1 && v < 1 && alphaMap[((v * 128 | 0) * 128 + (u * 128 | 0)) * 4 + 3] > 40;
    function wake(now) { lastInput = now; if (!awake) { awake = true; nextBlink = now + 1600; setEye('half', 90, now); setTimeout(() => awake && setEye('rest', 100, performance.now()), 110); } nextIdle = 30000 + Math.random() * 15000; }

    addEventListener('pointermove', e => {
      const now = performance.now();
      const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
      mx = e.clientX; my = e.clientY; [pu, pv] = toUv(mx, my);
      speed += Math.hypot(dx, dy) * .004;
      wake(now);
      if (act && !pressed && act !== ACTS.doze) endAct(); else if (act === ACTS.doze) { actI = act.length - 2; advance(now); }
      onHead = solid(pu, pv);
      const z = onHead ? zoneAt(pu, pv) : null;
      if (z !== zone) { zone = z; zoneSince = now; }
      wrap.style.cursor = pressed ? 'grabbing' : onHead ? 'grab' : '';
      // a cursor on the skin rubs it along
      if (onHead && !pressed) poke(pu, pv, dx * .00035, dy * .00035, .07);
      if (pressed && brush) {
        let px = pu - brush.u, py = pv - brush.v; const L = Math.hypot(px, py), lim = .24;
        if (L > 0) { const k = lim * (1 - Math.exp(-L / lim)) / L; px *= k; py *= k; }
        brush.px = px; brush.py = py;
      }
    });
    wrap.addEventListener('pointerdown', e => {
      const now = performance.now(), [u, v] = toUv(e.clientX, e.clientY);
      if (!solid(u, v)) return;
      wake(now); endAct(); pressed = true; downAt = now; downU = u; downV = v; takeHold(u, v);
      moodFace = null; wrap.setPointerCapture(e.pointerId); e.preventDefault();
    });
    function release() {
      if (!pressed) return;
      const now = performance.now(), L = Math.hypot(brush.px, brush.py), z = zoneAt(downU, downV), held = now - downAt;
      pressed = false; brush = null; wrap.style.cursor = onHead ? 'grab' : '';
      pulls = pulls.filter(t => now - t < 14000);
      if (L < .03 && held < 380) {             // a tap
        if (z === 'hair') hairI = hairI + 1 >= HAIRS.length ? -1 : hairI + 1;
        else { const r = ZONES.tap[z]; if (r.startsWith('act:')) startAct(r.slice(4), now); else { moodFace = r; moodUntil = now + 1100; } poke(downU, downV, 0, .5, .06); }
        return;
      }
      pulls.push(now);
      const n = pulls.length;
      moodFace = n >= 8 ? 'cry' : n >= 5 ? 'angry' : L > .22 ? 'dizzy' : L > .1 ? 'scrunch' : 'deadpan';
      moodUntil = now + (n >= 5 ? 2600 : 700 + L * 2800);
    }
    addEventListener('pointerup', release); addEventListener('pointercancel', release);
    addEventListener('pointerleave', () => { zone = null; });
    document.querySelectorAll('.contact-btn').forEach(b => {
      b.addEventListener('pointerenter', () => { moodFace = 'hearts'; moodUntil = performance.now() + 1e7; });
      b.addEventListener('pointerleave', () => { moodFace = 'grin'; moodUntil = performance.now() + 700; });
    });
    let lastScroll = scrollY, scrollUntil = 0;
    addEventListener('scroll', () => { const n = performance.now(); if (Math.abs(scrollY - lastScroll) > 2) { scrollUntil = n + 500; lastScroll = scrollY; } wake(n); }, {passive: true});

    let flyPos = [1.4, 0], visible = true;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }, {threshold: 0}).observe(canvas);
    new ResizeObserver(() => { const r = Math.min(devicePixelRatio || 1, 2), b = canvas.getBoundingClientRect(); canvas.width = b.width * r; canvas.height = b.height * r; gl.viewport(0, 0, canvas.width, canvas.height); }).observe(canvas);

    // ---- frame ----
    function frame(now) {
      requestAnimationFrame(frame);
      const dt = Math.min(.04, (now - last) / 1000); last = now;
      if (!ready || !visible) return;
      const f = r => 1 - Math.exp(-dt * r);

      speed *= Math.exp(-dt * 6); shake += ((speed > 1.5 ? 1 : 0) - shake) * f(speed > 1.5 ? 1.2 : .9);

      // acts when the page goes quiet
      if (act) { if (now - actT > act[actI][2]) advance(now); }
      else if (!reduced && !pressed && tStart && now - Math.max(lastInput, tStart) > nextIdle) {
        if (!rotation.length) rotation = [...ROTATION];
        startAct(rotation.shift(), now); lastInput = now; nextIdle = 30000 + Math.random() * 15000;
        if (!awake) wake(now);
      }

      // moving props
      const mk = Math.min(1, (now - moveT) / moveMs), me = mk * mk * (3 - 2 * mk);
      flyPos = [flyFrom[0] + (flyTo[0] - flyFrom[0]) * me + Math.sin(now * .02) * .012 * (1 - (mk >= 1 ? .85 : 0)), flyFrom[1] + (flyTo[1] - flyFrom[1]) * me + Math.cos(now * .027) * .012 * (1 - (mk >= 1 ? .85 : 0))];
      place(fly, flyPos[0], flyPos[1]);
      const hp = [handFrom[0] + (handTo[0] - handFrom[0]) * me, handFrom[1] + (handTo[1] - handFrom[1]) * me];
      place(hand, hp[0], hp[1]);
      if (handGrip === 'on' && !handHeld) { takeHold(hp[0], hp[1], .22); handHeld = true; hand.classList.add('shut'); handGrip = 'pull'; }
      if (handHeld && brush) { brush.px = hp[0] - brush.u; brush.py = hp[1] - brush.v; }
      if (handGrip === 'off' && handHeld) { handHeld = false; brush = null; hand.classList.remove('shut'); handGrip = false; }

      // which picture
      let want = 'rest';
      const pull = brush ? Math.hypot(brush.px, brush.py) : 0;
      if (act) want = null;
      else if (pressed) want = pull > .24 ? 'scared' : pull > .1 ? 'ouch' : pull > .02 || zoneAt(downU, downV) !== 'hair' ? 'shock' : 'rest';
      else if (moodFace && now < moodUntil) want = moodFace;
      else if (shake > .55) want = shake > .92 ? 'sick' : 'wind';
      else if (zone && now - zoneSince > 80 && ZONES.hover[zone]) want = ZONES.hover[zone];
      if (want) setFace(want, want === 'rest' ? 110 : 90, now);

      // eyes: only over the resting face, and they go shut when she is left alone
      const neutral = logical === 'rest';
      if (neutral) {
        if (wantEyes) setEye(wantEyes, 60, now);
        else if (!awake) setEye('closed', 200, now);
        else if (blinkStep >= 0) {
          const s = (now - blinkT) / 62 | 0;
          if (s !== blinkStep) { blinkStep = s; if (s === 0) setEye('half', 20, now); else if (s === 1) setEye('closed', 20, now); else if (s === 2) setEye('half', 20, now); else blinkStep = -1; }
        } else {
          let target;
          if (lookAt) { const p = lookAt(); target = [p[0] - .5, p[1] - .46]; }
          else if (now < scrollUntil) target = [0, 1];
          else target = [pu - .5, pv - .46];
          setEye(Math.hypot(target[0], target[1]) < .13 ? 'rest' : ringFor(target[0], target[1]), 50, now);
          if (now > nextBlink) { blinkStep = 0; blinkT = now; setEye('half', 20, now); nextBlink = now + 2200 + Math.random() * 3400; }
        }
      }

      compose(now);

      // the head leans toward the pull, the cursor, and whatever the act asks
      const tx = (pressed || handHeld ? (brush ? brush.px * .16 : 0) : awake ? (pu - .5) * .012 : 0) + wantLean[0] + Math.sin(now * .0009) * .0015;
      const ty = (pressed || handHeld ? (brush ? brush.py * .16 : 0) : awake ? (pv - .46) * .008 : 0) + wantLean[1] + Math.sin(now * .0013) * .0022;
      lvX += ((tx - leanX) * 70 - lvX * 8) * dt; lvY += ((ty - leanY) * 70 - lvY * 8) * dt;
      leanX += lvX * dt; leanY += lvY * dt;

      // skin
      simLeft += dt;
      let steps = 0;
      while (simLeft >= H && steps < 9) { step(H); simLeft -= H; steps++; }
      if (steps === 9) simLeft = 0;
      for (let j = 0; j < M; j++) for (let i = 0; i < M; i++) {
        const k = j * M + i, edge = i === 0 || j === 0 || i === N || j === N;
        sx[k] = edge ? ux[k] : (ux[k] * 4 + ux[k - 1] + ux[k + 1] + ux[k - M] + ux[k + M]) / 8;
        sy[k] = edge ? uy[k] : (uy[k] * 4 + uy[k - 1] + uy[k + 1] + uy[k - M] + uy[k + M]) / 8;
      }
      untangle();
      for (let k = 0, o = 0; k < count; k++) {
        dyn[o++] = sx[k]; dyn[o++] = sy[k];
        const r = k % M, c = k / M | 0;
        let sh = 1;
        if (r > 0 && r < N && c > 0 && c < N) sh = Math.max(.86, Math.min(1.16, 1 - ((sx[k + 1] - sx[k - 1]) + (sy[k + M] - sy[k - M])) * 1.8));
        dyn[o++] = sh;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf); gl.bufferSubData(gl.ARRAY_BUFFER, 0, dyn);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[faceA] || tex.rest);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex[faceB] || tex.rest);
      gl.uniform1f(U.fade, Math.min(1, (now - fadeT) / fadeMs));
      gl.uniform2f(U.lean, leanX, leanY);
      gl.drawElements(gl.TRIANGLES, idx.length, gl.UNSIGNED_SHORT, 0);
    }

    (async () => {
      const base = await load('rest');
      if (!base) return;
      upload('rest', base); hitMap(base);
      document.getElementById('faceFallback').style.visibility = 'hidden';
      ready = true; tStart = performance.now(); requestAnimationFrame(frame);
      const take = async n => { const img = await load(n); if (img) upload(n, img); };
      await take('closed'); await take('half');
      const names = Object.keys(IDS).filter(n => !['rest', 'closed', 'half'].includes(n));
      let i = 0;
      await Promise.all(Array.from({length: 6}, async () => { while (i < names.length) await take(names[i++]); }));
    })();
  })();
</script>
```