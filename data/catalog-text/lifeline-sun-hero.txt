# Sun Timeline — Life of the Sun Scrub Hero (exact recreation prompt)

Build a single-file, full-viewport interactive page called **The Life of the Sun**. It is extremely minimal: a pure black page, one glowing ball in the upper-middle, a soft pool of light under it, a two-line caption, and a thin timeline of fine ticks. Scrubbing moves through ten stages of the Sun's life, from solar nebula to white dwarf. Each scrub physically throws the ball: it whips round, its surface smears into horizontal bands, and the new surface lands within about a quarter of a second while the caption blurs across.

Everything is drawn live in a raw WebGL fragment shader. There are no images, no video, and no libraries. Plain HTML, CSS and vanilla JS in one file; the only external resource is the font. Reproduce every value, string and timing below exactly.

Three rules define the look:
1. The ball **never changes size**. All ten stages are surfaces on the same ball.
2. The page stays **pure black**. The halo must reach exactly zero a short way off the ball; no wide glows or background gradients anywhere.
3. It must be **instantly responsive**. Every wheel tick, drag pixel or hover move changes state on that frame.

---

## 1. Font

`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap` (preconnect to fonts.googleapis.com and fonts.gstatic.com crossorigin).

Title: `The Life of the Sun`. Meta description: `Scroll across ten billion years and watch the Sun be born, swell and fade.`

## 2. CSS (use verbatim)

```css
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:#000;color:#fff;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden;overscroll-behavior:none;touch-action:none;user-select:none;-webkit-user-select:none}
#gl{position:fixed;inset:0;width:100%;height:100%;display:block}
.ui{position:fixed;left:0;right:0;top:63.2%;display:grid;justify-items:center;padding:0 20px;pointer-events:none}
.cap{position:relative;width:100%;height:54px}
.line{position:absolute;inset:0;text-align:center;transition:opacity .2s linear,filter .2s linear}
.line.off{opacity:0;filter:blur(5px)}
.line h1{font-weight:600;font-size:clamp(16px,2.05vh,21px);letter-spacing:-.012em;line-height:1.25}
.line p{margin-top:6px;font-size:clamp(12.5px,1.55vh,15px);line-height:1.3;color:rgba(255,255,255,.5)}
.line p b{font-weight:500;color:#fff;margin-right:7px}
#track{position:relative;width:min(47vh,84vw);height:64px;margin-top:clamp(14px,3.2vh,30px);pointer-events:auto;cursor:pointer;outline:none}
#track::before{content:"";position:absolute;inset:-8px -30px}
#ticks{position:absolute;left:0;right:0;top:0;height:44px;display:flex;justify-content:space-between;align-items:flex-end;pointer-events:none}
#ticks i{display:block;width:1.5px;height:44px;background:#fff;transform-origin:50% 100%;will-change:transform}
.ends{position:absolute;left:0;right:0;top:54px;display:flex;justify-content:space-between;font-size:12.5px;color:rgba(255,255,255,.42);pointer-events:none}
.ends span.on{color:#fff;font-weight:500}
```

## 3. Markup

```html
<canvas id="gl"></canvas>
<div class="ui">
  <div class="cap" id="cap"></div>
  <div id="track" role="slider" tabindex="0" aria-label="Time" aria-valuemin="0" aria-valuemax="9">
    <div id="ticks"></div>
    <div class="ends"><span id="e0">Nebula</span><span id="e1">White dwarf</span></div>
  </div>
</div>
```

`#ticks` is filled with 37 empty `<i>` elements.

## 4. Stages and looks (use verbatim)

```js
const STAGES = [
  {t: '4.6 billion years ago', b: 'Solar nebula', c: 'A cold cloud falls inward'},
  {t: '4.57 billion years ago', b: 'Protostar', c: 'Gravity heats a young core'},
  {t: '4.5 billion years ago', b: 'Ignition', c: 'Hydrogen begins to burn'},
  {t: 'Today', b: 'The Sun', c: 'Halfway through its life'},
  {t: '1 billion years from now', b: 'Brighter Sun', c: 'The oceans boil away'},
  {t: '5 billion years from now', b: 'Subgiant', c: 'The core runs out of fuel'},
  {t: '7.6 billion years from now', b: 'Red giant', c: 'The Sun swallows Mercury'},
  {t: '7.7 billion years from now', b: 'Helium flash', c: 'The core reignites'},
  {t: '7.8 billion years from now', b: 'Planetary nebula', c: 'The outer layers drift away'},
  {t: '8 billion years from now', b: 'White dwarf', c: 'An ember the size of Earth'}
];
// one look per stage; every stage is the same ball. colours are linear and tone-mapped in the shader
const LOOK = [
  {c0: [.05,.01,.1],   c1: [.62,.12,.42], c2: [1.9,.85,.5],  glow: [.8,.25,.6],  gI: .22, freq: 2.6, warp: 1.9, cells: 0,  gas: 1,  shell: 0,  boil: 1},
  {c0: [.015,.004,0],  c1: [.62,.05,.01], c2: [3,1.1,.15],   glow: [1.3,.2,.04], gI: .28, freq: 3.1, warp: 1.2, cells: 1,  gas: 0,  shell: 0,  boil: .7},
  {c0: [.5,.05,0],     c1: [1.7,.48,.03], c2: [3.2,2,.55],   glow: [1.6,.5,.06], gI: .85, freq: 4.6, warp: 1.6, cells: .3, gas: 0,  shell: 0,  boil: 1.5},
  {c0: [1,.26,.01],    c1: [2.3,1,.12],   c2: [3.6,2.9,1.3], glow: [1.8,.68,.1], gI: 1,   freq: 3.4, warp: 1.1, cells: 0,  gas: 0,  shell: 0,  boil: 1.1},
  {c0: [1.5,.72,.2],   c1: [3,2.1,.8],    c2: [4.6,4.3,3.4], glow: [1.9,1.2,.5], gI: 1.2, freq: 3.8, warp: 1.1, cells: 0,  gas: 0,  shell: 0,  boil: 1.3},
  {c0: [.6,.1,.005],   c1: [1.8,.5,.03],  c2: [3,1.5,.25],   glow: [1.7,.42,.05],gI: .9,  freq: 3,   warp: 1.6, cells: .15,gas: 0,  shell: 0,  boil: 1.2},
  {c0: [.22,.008,.003],c1: [1.25,.1,.015],c2: [3,.95,.1],    glow: [1.8,.16,.03],gI: .85, freq: 2,   warp: 2.1, cells: .35,gas: 0,  shell: 0,  boil: 1.4},
  {c0: [1.6,.8,.3],    c1: [4,3,1.4],     c2: [8,7,5.5],     glow: [2.4,1.6,.8], gI: 1.7, freq: 3.2, warp: 2,   cells: 0,  gas: 0,  shell: 0,  boil: 3},
  {c0: [.02,.09,.12],  c1: [.1,.7,.72],   c2: [1.8,.42,.16], glow: [.3,.7,.8],   gI: .3,  freq: 3.4, warp: 1.5, cells: 0,  gas: .75,shell: 1,  boil: .9},
  {c0: [.8,1,1.5],     c1: [1.7,2.1,3],   c2: [3.6,4.2,5.4], glow: [.8,1.2,2.1], gI: .9,  freq: 2.6, warp: .8,  cells: 0,  gas: 0,  shell: 0,  boil: .5}
];
const LAST = STAGES.length - 1, PER = 4, N = LAST * PER + 1, START = 3;   // 37 ticks, a stage on every 4th
```

## 5. WebGL

Get a `webgl` context with `{antialias:false, alpha:false}`. Draw one full-screen triangle (`[-1,-1, 3,-1, -1,3]`). Canvas backing size is `innerWidth/innerHeight × min(dpr,1.5)`.

Fixed uniforms: `rad = .17`, `cy = .13`, `sc = min(1, innerWidth/innerHeight*1.5)` (shrinks the ball on portrait screens; update on resize).

Vertex shader: `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`

Fragment shader (use verbatim):

```glsl
precision highp float;
  uniform vec2 res;
  uniform float sc, rad, cy, fade, t, evo, rot, blur, starX, freq, warp, cells, gas, shell, gI, flick;
  uniform vec3 c0, c1, c2, glow;
  float h(vec3 p){ p = fract(p*.3183099 + .1); p *= 17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
  float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.-2.*f);
    return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y),
               mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
  float fbm(vec3 p){ float a=.5, s=0.; for(int i=0;i<5;i++){ s+=a*n3(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.5; } return s; }
  vec3 stars(vec2 uv){
    vec2 q = (uv + vec2(starX, 0.))*34., id = floor(q), f = fract(q)-.5;
    float r = fract(sin(dot(id,vec2(127.1,311.7)))*43758.5453);
    vec2 o = vec2(fract(r*17.3),fract(r*91.7))-.5;
    float tw = .55+.45*sin(t*(.7+r*1.8)+r*40.);
    vec2 g = f-o*.7; g.x *= 1./(1.+blur*7.);
    return vec3(smoothstep(.975,1.,r)*smoothstep(.06,.0,length(g))*tw*.55);
  }
  void main(){
    vec2 uv = (gl_FragCoord.xy - .5*res)/res.y, p = (uv - vec2(0., cy))/sc;
    float d = length(p), e = max(d-rad, 0.);
    vec3 col = stars(uv);

    // tight halo that ends completely a short way off the ball, the page stays pure black
    vec2 dir = p/max(d,1e-4);
    float rays = .72 + .56*fbm(vec3(dir*2.4, evo*.5));
    float hal = exp(-e/(rad*.11))*smoothstep(rad*.6, rad*.12, e);
    col += glow*gI*.7*hal*rays*flick;

    // soft pool of light under the ball, standing in for the reference's contact shadow
    float py = (p.y + rad + .065)/.0135, px = p.x/(rad*1.02);
    float pool = max(0., 1.-px*px) * exp(-py*py);
    col += glow*min(gI,1.)*.1*pool*pool;

    if(d < rad + .02){
      float k = min(d/rad, 1.);
      vec3 nrm = vec3(p/rad, sqrt(max(1.-k*k, 0.)));
      float cr = cos(rot), sr = sin(rot);
      vec3 n = vec3(nrm.x*cr + nrm.z*sr, nrm.y, -nrm.x*sr + nrm.z*cr);
      // spinning fast smears the surface along its axis of rotation
      float sq = 1./(1.+blur*3.2);
      vec3 q = vec3(n.x*sq, n.y, n.z*sq);
      float w1 = fbm(q*freq + vec3(0.,0.,evo*.28)), w2 = fbm(q*freq*.9 + 7. - vec3(evo*.22,0.,0.));
      float v = fbm(q*freq*1.7 + warp*2.2*vec3(w1, w2, w1-w2));
      float vein = 1.-abs(2.*fbm(q*freq*1.5 + warp*1.3*vec3(w2, w1, 0.))-1.);
      vein = pow(vein, 9.);
      float s = smoothstep(.24,.76,v);
      s = mix(s, clamp(vein*1.25 + s*.14,0.,1.), cells);
      vec3 c = mix(c0, c1, smoothstep(.0,.55,s));
      c = mix(c, c2, smoothstep(.5,1.,s));
      float mu = nrm.z;
      if(shell > .001){
        // planetary nebula: a hot point, a teal cavity and a filament shell seen through the ball
        vec3 sh = c0 + c1*smoothstep(.95,.3,k)*(.25+v*1.2);
        float fil = smoothstep(.5,.82,k)*smoothstep(1.,.8,k)*pow(v+.32,3.)*3.2;
        sh += c2*fil + vec3(3.5,4.,5.)*exp(-k*k/.012);
        c = mix(c, sh, shell);
      } else {
        c *= mix(mix(.34, .8, gas), 1., pow(mu,.5));
      }
      c += glow*pow(1.-mu,2.6)*.42*min(gI,1.)*(1.-gas);
      float edge = smoothstep(1., .985, k);
      float soft = smoothstep(1., .58, k + (fbm(q*3.4 + evo*.1)-.5)*.62) * smoothstep(1., .9, k);
      float a = mix(edge, soft, gas);
      col = mix(col, c, a);
    }
    col = 1. - exp(-col*1.15);
    gl_FragColor = vec4(pow(col, vec3(.4545))*fade, 1.);
  }
```

## 6. State

```js
let x = START/LAST;          // timeline position 0..1
let stage = START, omega = 14;   // spin speed in rad/s, the page opens on a whip
let rot = 0, evo = 0, starX = 0, lastInput = -1e9, hover = -1, dragX = null;
const cur = deep copy of LOOK[START];   // the live, eased look
```

**Input** all funnels through:
```js
function moveTo(nx, now) {
  nx = clamp(nx, 0, 1);
  omega += (nx - x) * 150;   // every bit of input throws the ball
  x = nx; lastInput = now;
}
```
- `wheel` on window, non-passive, `preventDefault`. Use the larger of deltaX/deltaY: `moveTo(x + d*(deltaMode===1 ? .012 : .00075), now)`.
- `#track` `pointermove`: `hover = clamp(px(e))` where `px(e) = (clientX-rect.left)/rect.width`. For mouse when not dragging, `moveTo(hover)`. `pointerleave` sets `hover=-1`.
- Window `pointerdown`: `dragX=clientX`; on the track also `moveTo(px(e))`.
- Window `pointermove` while dragging: on the track `moveTo(px(e))`, elsewhere `moveTo(x + dx/min(innerWidth,900))`.
- `pointerup`/`pointercancel`: `dragX=null`.
- Arrow keys step one stage: Right/Down forward, Left/Up back.

**Each frame** (`dt` capped at .05, `f(r)=1-exp(-dt*r)`, `time=(now-t0)/1000`):

1. Idle autoplay: if not reduced motion, `now-lastInput>5000` and `now>nextAuto` (initially `t0+5000`): `x=((i+1)%(LAST+1))/LAST` where `i=round(x*LAST)`, `omega+=9`, `nextAuto=now+2600`.
2. `i=round(x*LAST)`. If `i!==stage`: `omega += omega>=0?7:-7; stage=i; setCaption(i)`.
3. Ease every numeric and colour field of `cur` toward `LOOK[stage]` by `f(13)` (`f(60)` when reduced motion).
4. `omega *= exp(-dt*3.6)`.
5. `spin = reduced ? 0 : .22 + omega`; `blur = min(1.4, |omega|*.1)`.
6. `rot += spin*dt`; `evo += dt*cur.boil*(1+|omega|*.1)`; `starX += omega*dt*.012`.
7. Set uniforms: `freq warp cells gas shell gI c0 c1 c2 glow t evo rot blur starX`, plus `flick = 1 + .1 sin(time*2.1) + .06 sin(time*5.3)` and `fade = min(1,(now-t0)/500)`.
8. Draw.
9. Update ticks (section 8).

## 7. Caption

`setCaption(i)` appends a new `.line.off` with `<h1>{t}</h1><p><b>{b}</b>{c}</p>`, forces layout, removes `.off`. The previous line gets `.off` and is removed after 240ms. So the old line blurs out while the new one blurs in. Also update `aria-valuenow` and `aria-valuetext`, and toggle `.on` on `#e0` (stage 0) and `#e1` (last stage).

## 8. Ticks

37 ticks (`LAST*PER+1`, `PER=4`), so a stage sits on every 4th tick. Each frame, for tick `j`:
```js
active = x*(N-1); bellAt = (hover>=0 ? hover : x)*(N-1);
q = j-bellAt; bell = exp(-q*q/5.5); on = exp(-(j-active)²/.22);
goal = max((j%PER ? .17 : .28) + bell*.55, on);
tickH[j] += (goal-tickH[j])*f(22);
transform = scaleY(tickH[j]); opacity = .3 + bell*.35 + on*.6;
```
A narrow bell follows the pointer, and the active tick stands tallest and brightest.

## 9. Feel

Quiet and precise, then physical the moment you touch it. Nothing on the page moves without reason, but the ball feels heavy and alive: boiling at rest, thrown hard by the slightest scroll, landing crisply on the next chapter of the Sun's life.