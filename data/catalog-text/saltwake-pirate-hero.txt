# Saltwake — Pirate Ship Two-Scene Hero (exact recreation prompt)

Build a single-file, full-viewport landing hero for **Saltwake**, an illustrated pirate voyage brand. The page is a flat game-art scene on parchment inside a thick black rounded frame. A galleon rides black hand-drawn line-art waves that are animated live in code. One click (or a scroll) plays a long single-take transition: the sea rises over the headline, the ship shrinks away to the horizon, and a palm island with a pirate captain slides in from the left. Soft palm-frond shadows drift across everything, and a custom black ring cursor pulses on click.

Plain HTML, CSS and vanilla JS in one file, no frameworks. Every animated value is computed per frame in one `render(now)` function. Reproduce every value, string, URL and timing below exactly.

---

## 1. Assets (use exactly these URLs)

All artwork comes from three transparent PNGs on Higgsfield, served through the images.higgs.ai proxy:

```js
const P = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_';
const SHIP = P + '20261031_024714_39df675e-5060-4528-87dc-9d0c274815aa.png&w=1600&q=90';
const CAPT = P + '20261031_024703_a0298b6a-0117-47f1-8462-4be671d0407e.png&w=2048&q=90';
const PLANTS = P + '20261031_024704_3ccf1ac2-bec7-4fdb-bfce-ac19eca8db28.png&w=2048&q=90';
```

Full URLs, for reference:
- Ship (single galleon, 2048×2048, displayed with `background-size:100% 100%`): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_024714_39df675e-5060-4528-87dc-9d0c274815aa.png&w=1600&q=90`
- Captain + chest sheet (2048×1360): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_024703_a0298b6a-0117-47f1-8462-4be671d0407e.png&w=2048&q=90`
- Palm + plants sheet (2048×1360): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261031_024704_3ccf1ac2-bec7-4fdb-bfce-ac19eca8db28.png&w=2048&q=90`

Sprites are cropped from the sheets in CSS, never re-exported. For box `[x,y,w,h]` on a 2048×1360 sheet:
```
background-size: (2048/w·100)% (1360/h·100)%;
background-position: (x/(2048−w)·100)% (y/(1360−h)·100)%;
```
Element height = element width × h/w.

```js
const SHEET = {w: 2048, h: 1360};
// sprite boxes on the 2048x1360 sheets: x, y, w, h
const BOX = {
  capt:  [CAPT, 34, 153, 1246, 1074],
  chest: [CAPT, 1475, 830, 446, 392],
  palm:  [PLANTS, 19, 32, 910, 1284],
  bushL: [PLANTS, 515, 820, 860, 496],
  bushR: [PLANTS, 1528, 908, 499, 405]
};
```
Palm also has `clip-path:polygon(0 0,100% 0,100% 61%,46% 61%,46% 100%,0 100%)` so the neighbouring clump on the sheet never shows.

Fonts, exactly:
`https://fonts.googleapis.com/css2?family=Goudy+Bookletter+1911&family=Sorts+Mill+Goudy&family=Josefin+Sans:wght@600&family=Open+Sans:wght@700&display=swap`
- **Goudy Bookletter 1911**: headlines and logo, always tight (`letter-spacing:-.045em`) so letters nearly touch. This tightness is the look; do not substitute it.
- **Sorts Mill Goudy**: the widely spaced eyebrow.
- **Josefin Sans 600**: pill buttons.
- **Open Sans 700**: nav and small paragraph, uppercase and tracked.

## 2. CSS (use verbatim)

```css
:root{--paper:#e6e0cf;--ink:#201c15;--line:#16130e;--band:#d7d2c2;--band2:#dcd7c7}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:var(--paper);overflow:hidden;color:var(--ink);-webkit-font-smoothing:antialiased}
html.fine,html.fine *{cursor:none}
a{color:inherit;text-decoration:none}

.frame{position:fixed;inset:14px;border-radius:34px;overflow:hidden;background:var(--paper);isolation:isolate}
.frame::after{content:"";position:absolute;inset:0;border:6px solid var(--line);border-radius:34px;pointer-events:none;z-index:30}
#shade{position:absolute;left:-12%;top:-12%;width:124%;height:124%;mix-blend-mode:multiply;opacity:.4;pointer-events:none;z-index:25;will-change:transform}

#scene{position:absolute;left:0;top:0;transform-origin:0 0}
#scene>*{position:absolute}
svg.w{left:0;top:0;overflow:visible;pointer-events:none}
svg.w path{vector-effect:none}

.spr{background-repeat:no-repeat;will-change:transform}
#ship{background-size:100% 100%;transform-origin:50% 100%}
#capt{transform-origin:45% 100%}
#palm{transform-origin:22% 100%;clip-path:polygon(0 0,100% 0,100% 61%,46% 61%,46% 100%,0 100%)}

/* copy */
.t1{left:150px;top:292px;width:640px;white-space:nowrap}
.t1 .eb{font:400 27px/1 "Sorts Mill Goudy",serif;letter-spacing:.2em;text-transform:uppercase}
h1,h2{font-family:"Goudy Bookletter 1911","Sorts Mill Goudy",serif;font-weight:400;text-transform:uppercase;letter-spacing:-.045em}
h1{font-size:88px;line-height:.92;margin-top:26px}
.pill{display:inline-block;position:relative;font:600 19px/1 "Josefin Sans",sans-serif;text-transform:uppercase;letter-spacing:.01em;
  border:3px solid var(--line);border-radius:999px;background:#ece7d8;box-shadow:0 7px 0 -1px var(--paper),0 7px 0 2px var(--line);transition:transform .25s,box-shadow .25s}
.pill:hover{transform:translateY(3px);box-shadow:0 4px 0 -1px var(--paper),0 4px 0 2px var(--line)}
.t1 .pill{margin-top:40px;padding:21px 62px 17px}
.t2{left:1000px;top:462px;width:520px}
h2{font-size:72px;line-height:.98}
.t2 p{margin-top:22px;font:700 14.5px/1.72 "Open Sans",sans-serif;letter-spacing:.13em;text-transform:uppercase}
.btnw{display:inline-block;position:relative;margin-top:30px}
.t2 .pill{font-size:16px;padding:15px 38px 12px}
.tick{position:absolute;top:-15px;width:22px;height:4px;border-radius:2px;background:var(--line)}
.tick.a{left:-30px;transform:rotate(24deg)}.tick.b{left:-16px;top:-23px;width:13px;transform:rotate(58deg)}.tick.c{right:-30px;transform:rotate(-30deg)}

/* chrome */
.logo{position:absolute;left:6.6%;top:58px;z-index:20;display:flex;align-items:center;gap:9px;font:400 30px/1 "Goudy Bookletter 1911",serif;letter-spacing:-.03em}
.logo svg{width:26px;height:30px}
nav{position:absolute;right:5.4%;top:62px;z-index:20;display:flex;gap:clamp(34px,6.6vw,104px)}
nav a{position:relative;font:700 12.5px/1 "Open Sans",sans-serif;letter-spacing:.17em;text-transform:uppercase;padding:6px 0}
nav a svg{position:absolute;left:100%;top:-4px;margin-left:7px;width:17px;height:21px;opacity:0;transform:translateY(-10px) rotate(-30deg);transform-origin:50% 0;transition:opacity .2s,transform .55s cubic-bezier(.3,1.9,.5,1)}
nav a:hover svg{opacity:1;transform:none}

/* cursor */
#cur,#ping{position:fixed;left:0;top:0;z-index:50;pointer-events:none;border-radius:50%;display:none}
html.fine #cur,html.fine #ping{display:block}
#cur{width:var(--ring,40px);height:var(--ring,40px);margin:calc(var(--ring,40px)/-2);border:5px solid var(--line)}
#ping{width:var(--ring,40px);height:var(--ring,40px);margin:calc(var(--ring,40px)/-2);border:1.5px solid var(--line);opacity:0}

.portrait .t1{left:60px;top:190px;width:680px}
.portrait #shade{opacity:.26}
.portrait h1{font-size:98px}
.portrait .t1 .eb{font-size:32px}
.portrait .t1 .pill{font-size:26px;padding:27px 74px 22px}
.portrait .t2{left:64px;top:1036px;width:680px}
.portrait h2{font-size:96px}
.portrait .t2 p{font-size:21px}
.portrait .t2 .pill{font-size:24px;padding:22px 52px 18px}
@media (max-width:760px){
  .frame,.frame::after{border-radius:22px}
  .frame{inset:8px}
  .logo{top:26px;font-size:22px}.logo svg{width:20px;height:23px}
  nav{top:30px;gap:16px}
  nav a{font-size:9.5px;letter-spacing:.1em}
  nav a:nth-child(n+3){display:none}
}
```

## 3. Markup

```
main.frame#frame
  div.logo: inline anchor SVG + "Saltwake"
  nav: Voyages [data-go=0] · Crew [data-go=1] · Charts · Contact
       (each link also contains the small anchor SVG, revealed on hover)
  div#scene
    div.spr#cloudA        (inline flat cloud SVG, see below)
    svg.w#wBack           (back waves)
    div.t1#t1             .eb "Port Royal" / h1 "Tales of<br>the open sea" / a.pill[data-go=1] "Set sail"
    div.spr#ship
    svg.w#wFront          (front waves, covers the hull bottom and later the t1 copy)
    div.spr#palm, #capt, #chest, #bushL, #bushR
    div.t2#t2             h2#h2 "Rules of<br>the crew"
                          p#p2 "Every sailor signed the articles<br>before the anchor came up"
                          span.btnw#btn2: i.tick.a, i.tick.b, i.tick.c, a.pill "Read more"
  canvas#shade width=64 height=36
div#ping, div#cur (outside the frame)
```
This DOM order is the z-order and it matters: the ship sits between the two wave SVGs, and `.t1` sits under `#wFront` so the rising water hides it.

Logo anchor SVG (26×30 box, also used 17×21 in the nav with stroke 2.6):
`<svg viewBox="0 0 26 30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="13" cy="4.5" r="2.8"/><path d="M13 7.5V28M7 12h12M2.5 19c.6 5.500 5.500 9 10.500 9s9.900-3.500 10.500-9"/><path d="m1 21 1.500-2.500L5 20.500M25 21l-1.500-2.500-2.500 2"/></svg>`
The nav version omits the second path.

Cloud: `<svg viewBox="0 0 300 80" width="300" height="80"><path fill="#d3cebe" d="M0 79c14-3 26-3 38-10-4-16 10-30 30-26 6-22 42-34 62-16 16-12 42-6 50 14 10-2 18 2 22 8 24 22 66 26 98 30z"/></svg>`

## 4. Layout system

`#scene` is a fixed design box, scaled with "contain" and centred:
```js
W = frame.clientWidth; H = frame.clientHeight; portrait = H > W;
L = portrait ? LAY.port : LAY.land;
S = min(W/L.w, H/L.h); DW = W/S; DH = H/S;
DX = (DW - L.w)/2; DY = (DH - L.h)/2;
scene.style.transform = `translate(${DX*S}px,${DY*S}px) scale(${S})`;
```
Toggle class `portrait` on `<html>`. Size both wave SVGs to the design box. Position each sprite from its `L[id]` entry (width, left, top). Waves extend past the box by `DX + 20` each side and `DY + 40` below, so there is never a gap.

```js
const LAY = {
  land: {
    w: 1600, h: 900,
    wave: {y0: 748, y1: 272, gap0: 1, gap1: .6},
    ship: {x0: 1130, w0: 710, x1: 1345, w1: 176},
    palm: {x: -92, y: -112, w: 620}, capt: {x: 120, y: 318, w: 540}, chest: {x: 640, y: 628, w: 200},
    bushL: {x: 96, y: 716, w: 700}, bushR: {x: 1370, y: 740, w: 300}
  },
  port: {
    w: 800, h: 1500,
    wave: {y0: 1300, y1: 430, gap0: 1, gap1: .7},
    ship: {x0: 420, w0: 620, x1: 640, w1: 150},
    palm: {x: -150, y: -60, w: 560}, capt: {x: 20, y: 440, w: 600}, chest: {x: 560, y: 830, w: 190},
    bushL: {x: -40, y: 1330, w: 520}, bushR: {x: 570, y: 1340, w: 260}
  }
};
```

## 5. Waves

```js
// wave layers, back to front. dy = offset from the main swell, fill optional, span = open line drawn over part of the width
const BACK = [
  {dy: -100, a: 20, k: 1.5, v: .9, ph: 0, fill: 'var(--band)'},
  {dy: -52, a: 23, k: 1.9, v: 1.15, ph: 1.7, fill: 'var(--paper)'}
];
const FRONT = [
  {dy: 0, a: 25, k: 1.7, v: 1.3, ph: 3.1, fill: 'var(--band2)'},
  {dy: 26, a: 18, k: 2.4, v: 1, ph: 4.4, span: [.06, .44]},
  {dy: 48, a: 22, k: 1.45, v: 1.4, ph: .6, fill: 'var(--paper)'},
  {dy: 76, a: 15, k: 2.1, v: 1.2, ph: 5.1, span: [.52, .97]},
  {dy: 104, a: 24, k: 1.8, v: 1.25, ph: 2.2, fill: 'var(--paper)'},
  {dy: 130, a: 14, k: 2.7, v: 1, ph: 1.1, span: [.0, .62]},
  {dy: 158, a: 20, k: 1.6, v: 1.1, ph: 3.8}
];
```
Height function:
```js
yAt(l, x, t, p):
  W = L.wave
  base = mix(W.y0, W.y1, p) + l.dy * mix(W.gap0, W.gap1, p)
  a = l.a * mix(1, .72, p)
  f = 2π/1100 * l.k * (1 - .35*p)
  return base + a*sin(f*x + t*l.v + l.ph) + a*.45*sin(f*2.3*x - t*l.v*.7 + l.ph*1.7)
```
Each layer is one `<path>` with `stroke:var(--line)`, `stroke-width:3.2`, `stroke-linecap:round`, `fill:l.fill||'none'`. Rebuild `d` every frame with an `L` point every 22 design px. Layers with `fill` close down to the bottom (`L x1 H L x0 H Z`). Layers with `span` draw only that fraction of the width, giving the broken hand-drawn lines.

## 6. Transition

`p` runs 0 (open sea) to 1 (island). `go(to)`: ignore if already there, else `pFrom = p; pTo = to; pT0 = now`. Each frame:
```js
DUR = reduced ? 1 : 2100;
k = seg(now, pT0, pT0+DUR); p = mix(pFrom, pTo, io(k));
```
Helpers: `seg(p,a,b)=clamp((p-a)/(b-a))`; `io(k)=k<.5?4k³:1-(-2k+2)³/2`; `out(k)=1-(1-k)³`; `back(k)=1+2.4(k-1)³+1.4(k-1)²`.

Triggers: any `[data-go]` click (Set sail → 1, Crew → 1, Voyages → 0); wheel `deltaY>8` → 1, `<-8` → 0, locked for 1200ms. All `href="#"` clicks `preventDefault`.

Per frame, with `t = (now-t0)/1000` (0 when reduced motion):
- **Ship:** `sw = mix(c.w0,c.w1,p)`, `sx = mix(c.x0,c.x1,p)`, `sh = sw*2002/1961`. Width and height set directly, left `sx - sw/2`, top `wy + sw*.05 - sh`, where `wy = yAt(FRONT[0], sx, t, p)`. So it always rides the main swell, sunk 5% into it. Rotation: `atan(slope)*57.3*.75` degrees, where `slope = (yAt(FRONT[0],sx+90)-yAt(FRONT[0],sx-90))/180`. `transform-origin:50% 100%`.
- **Cloud:** left `((L.w*.72 - t*16) mod (L.w+700)) - 400`, top 150 (portrait 110), opacity `1-seg(p,.3,.7)`.
- **Intro:** `intro = out(seg(now,t0+200,t0+1100))`.
- **`.t1`:** opacity `intro*(1-seg(p,.62,.7))`, translateY `(1-intro)*26 - p*40`, pointer-events none when `p>.1`.
- **Logo:** opacity `1-seg(p,.12,.3)`.
- **Island:** `e = io(seg(p,.04,.92))`.
  - Palm: translate `(mix(-L.palm.w-80,0,e), mix(-170,0,e))`, rotate `sin(t*.8)*.7deg`.
  - Captain: translateX `mix(-L.capt.w-160,0,e)`, rotate `sin(t*1.1)*.5*p deg`.
  - Chest: translate `(mix(-L.chest.w-720,0,e), mix(120,0,e))`.
- **Foreground:** `b = out(seg(p,.5,1))`. BushL translateY `mix(340,0,b)`, bushR `mix(300,0,b)`.
- **h2:** `hk = seg(p,.42,.82)`, opacity `hk²`, translateY `mix(70,0,out(hk))`. It reads as a pale ghost rising through the water.
- **p2:** `pk = seg(p,.76,.92)`, opacity pk, translateY `mix(16,0,pk)`.
- **Button:** `bk = seg(p,.86,1)`, opacity bk, `scale(mix(.7,1,back(bk)))`. `#t2` pointer-events none until `p>.9`.

Element transform format: `translate(xpx,ypx) rotate(rdeg) scale(s)`.

## 7. Palm shade

Canvas 64×36, stretched by CSS to 124% of the frame, so its low resolution is the blur. Once at start: `scale(.5,.5)`, fill white, then stroke `rgba(120,114,96,.9)` round-cap quadratic curves, each `moveTo(x0,y0); quadraticCurveTo((x0+x1)/2+6,(y0+y1)/2+8,x1,y1)`:
`[x0,y0,x1,y1,lineWidth]` = `[-10,26,38,-8,8] [-8,46,58,-2,5] [-10,62,74,6,4] [14,78,96,16,4] [40,82,118,22,3] [78,80,140,34,5] [-12,74,22,56,6]`.

Each frame: `translate(sin(t*.35)*2.2%, cos(t*.27)*1.6%) rotate(sin(t*.22)*.8deg)`. It uses `mix-blend-mode:multiply`, so it falls over the art and type alike.

## 8. Cursor

Only when `(hover:hover) and (pointer:fine)`; add class `fine` to `<html>`, which hides the native cursor. `#cur` eases to the pointer: `f = 1-exp(-dt*22)` with `dt` capped at .05s. Scale `.7` while pressed, `1.35` over any link, else 1. On pointerdown, `#ping` is placed at the press point and over 650ms goes to `scale(1+out(k)*1.9)` with opacity `1-k`. The ring size comes from `--ring` (default 40px).

## 9. Boot

`resize()` on load and on `resize`. Then `(function loop(n){render(n);requestAnimationFrame(loop)})(t0)`. Respect `prefers-reduced-motion` (waves frozen, instant transition).

## 10. Feel

A storybook adventure game's title screen. Slow rolling water, a ship with real weight, and one long unbroken camera move into the island. Everything is parchment, ink and a few warm flat colours; add no gradients or glows.