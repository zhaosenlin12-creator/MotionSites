# Driftlab — Jellyfish Scroll Hero (exact recreation prompt)

Give me a single-file, scroll-driven hero called **Driftlab**. A pink jellyfish floats in the middle of a lilac sky. Huge condensed black words arrive big from the lower right on a curve, pass behind the jellyfish, pause in the centre and leave to the left. After the last word falls away, the jellyfish grows and two text panels appear in turn while it moves to the other side.

Plain HTML, CSS and one vanilla script with raw WebGL2 in one file, with no libraries. The only external resources are the Google Fonts and the three media URLs below. Reproduce every value, string and timing exactly, and use the complete code at the end as the source of truth.

Six rules define it:
1. **One canvas, drawn in this order:** sky, points, words, jellyfish. Depth is simply draw order, which is why the jellyfish is always in front of the letters.
2. **The jellyfish is a green-screen video keyed in a shader.** `d = g - max(r,b)` and `alpha = 1 - smoothstep(.10,.38,d)`. Green spill is clamped with `g = min(g, max(r,b)*.96)`. Translucent tentacles keep the letters visible through them.
3. **Words are bent ribbons.** Each word is a 56-column triangle strip on a ring of radius 9. Its ends come towards the camera and its right side drops, which gives the big entrance from the lower right.
4. **The words share one atlas.** Each word is drawn once with Canvas 2D into its own 512px row of a 4096px texture, with mipmaps and anisotropic filtering.
5. **Words dwell.** Position between words uses `ease = x*x*x*(x*(6*x-15)+10)`, so each one rests in the centre.
6. **A sticky stage on a long page.** `.track` is 800vh and `.view` is sticky. The script reads scroll progress and eases towards it at 10% per frame.

---

## 1. Page basics

- Title: `Driftlab`
- Meta description: `A jellyfish drifts through a lilac sky while huge words wrap around it as you scroll.`
- Fonts: `https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@600&family=Space+Mono&display=swap`, with preconnects to fonts.googleapis.com and fonts.gstatic.com (crossorigin). The supplied standalone file embeds the latin woff2 files as base64 instead.
- Anton for the giant words, caption and panels. Outfit 600 for the logo. Space Mono for links, index and the sound label.
- Ink `#0b0b10`, page fallback `#dcd8f4`.
- Unit: `--u:min(calc(100vw/1600),calc(100vh/900))`, which becomes `1px` at 820px wide and below.

## 2. Media (use these exact URLs)

All three are served with `Access-Control-Allow-Origin: *`. Load them with `crossOrigin='anonymous'`.

1. Sky (w=1920, q=80): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_045255_3cb4b3c2-3cb5-4af9-93b4-bd88f2f883c3.png&w=1920&q=80`
2. Jellyfish still on green, shown until the video has a frame and used alone for reduced motion (w=1080, q=85): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_045249_4f7fe287-c84b-479f-a953-04990fe1a3ac.png&w=1080&q=85`
3. Jellyfish video on green, 1080 × 1920, 5 s seamless loop, muted, looping, inline, `preload="auto"`, not added to the page: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261102_045327_a6584765-3154-43e6-b1c9-4e574f83a811.mp4`

## 3. Overlay content

- Logo top left at 30u, 20u: `Driftlab`, Outfit 600, 25u, followed by a 50u wide hand-drawn squiggle SVG.
- Top right at 38u, 24u: `[Works]` and `[Agency]`, 13u, gap 18u.
- Left index, centred at 19u from the left: rows of 3u dots with `01`, `02`, `03`, `04`, `05` between them, 11u. The current word's number is at full opacity, the others at 45%.
- Right edge at 10u: a 1px scroll rail from 22% to 78% of the height, with a 3px thumb 9% tall.
- Bottom centre, 680u wide, 30u from the bottom: a goggles icon, 30u × 20u, above Anton 23u uppercase captions at line height 1.18.
- First caption: `Welcome to a creative space showcasing groundbreaking` / `projects that blend creativity and technology`
- Second caption: `Follow us into the future of interactive` / `and immersive digital experiences`
- Left panel at 84u: `Each project at Driftlab serves as a testament to our commitment to innovation and excellence`
- Right panel at 84u, right aligned: `Browse our portfolio to see the magic we create with cutting-edge technologies including XR, AR, AI and 3D.`
- Panels are 330u wide, Anton 25u, line height 1.14, vertically centred, rising 18px as they fade in.
- Bottom left: black 30u sound pill with seven small bars and `OFF` or `ON`. It plays looping brown noise through a 520 Hz lowpass with a .09 Hz wobble of ±240 Hz, fading to .34 gain.
- Bottom right: 34u black circle with an up arrow that scrolls back to the top.

## 4. Scroll timeline

With `s` from 0 to 1, and `span = .14 * 4 = .56`:

- **Words:** `k = clamp(s/span)*4`. The head position moves between word centres with the ease above.
- **Sink:** from `span+.015` to `span+.105`, the words drop by 6 units.
- **Grow:** from `span+.08` to `span+.22`, the jellyfish grows from .98 to 1.40 of its base height and moves down .1.
- **Side:** `smooth(.76,.82,s) - 2*smooth(.88,.94,s)`, moving the jellyfish by `.34` clip units, right for the left panel and left for the right panel.
- **First caption:** fades out from .04 to .08. **Second caption:** in from .08 to .12, out from .56 to .62. The goggles follow whichever is showing.
- **Left panel:** in .72–.77, out .84–.88. **Right panel:** in .90–.95, then stays.

## 5. Word ribbons

Constants: `GAP=3.4`, `RADIUS=9`, `CAM=11`, `FOCAL=8.14`. Words in order: `DRIFTLAB`, `DESIGN TO`, `DELIGHT`, `INSPIRE`, `AND ENGAGE`. Anton 440px with 8px letter spacing, each word's world length being its measured width / 440 × .86.

For a vertex at track position `t` from the centre:

```
th = clamp(t/9, -1.45, 1.45)
x  = 9*sin(th)
z  = 9*(1-cos(th))*.82
y  = (v-.5)*height + .19 - sink - 3.6*pow(smoothstep(.8,8.,t),1.25) - .012*t*t
gl_Position = vec4(x*8.14/aspect, y*8.14, 0, 11-z)
```

Using `w = 11-z` makes the perspective correct on the texture. The colour is `(.043,.043,.063)`, premultiplied. On narrow screens everything is scaled by `clamp(aspect*.58,.26,1)`.

## 6. Jellyfish

A quad of base height .98 × 2 clip units at 1080:1920, scaled by `clamp(.62+aspect*.4,.6,1)` on narrow screens. It bobs `.018*sin(t*.8)`, follows the mouse by .018, rolls by `.1*sin(s*13+.4) + .03*sin(t*.5)`, and squashes its width by `.93+.07*cos(s*14)` to suggest turning. The matrix corrects for aspect so rotation never skews it.

## 7. Sky and points

- The sky is drawn at mip level 1.6 for softness, cover-fitted at 92% zoom, and drifts sideways by `s*.05 + t*.0022`.
- 40 points: three quarters are soft white specks, a quarter are black rotating squares that slide with the scroll.

## 8. Phones (820px and below)

`--u:1px`, index hidden, logo 21px, links 12px, caption 17px with its line break removed and 72px from the bottom, panels pinned 72px from the bottom at 21px.

---

## Complete code

This is the finished page. Build exactly this.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Driftlab</title>
<meta name="description" content="A jellyfish drifts through a lilac sky while huge words wrap around it as you scroll.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@600&family=Space+Mono&display=swap" rel="stylesheet">
<style>
:root{--u:min(calc(100vw/1600),calc(100vh/900));--ink:#0b0b10}
*{box-sizing:border-box;margin:0;padding:0}
html{background:#dcd8f4}
body{color:var(--ink);font-family:"Space Mono",ui-monospace,monospace;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.track{height:800vh;position:relative}
.view{position:sticky;top:0;height:100svh;overflow:hidden;background:#dcd8f4}
canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.ui{position:absolute;inset:0;pointer-events:none}
.ui a,.ui button{pointer-events:auto}
.logo{position:absolute;left:calc(30*var(--u));top:calc(20*var(--u));display:flex;align-items:center;gap:calc(14*var(--u));font:600 calc(25*var(--u))/1 Outfit,sans-serif;letter-spacing:-.01em}
.logo svg{width:calc(50*var(--u));height:calc(30*var(--u));fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round}
.links{position:absolute;right:calc(38*var(--u));top:calc(24*var(--u));display:flex;gap:calc(18*var(--u));font-size:calc(13*var(--u));letter-spacing:.04em}
.links a:hover{text-decoration:underline}
.index{position:absolute;left:calc(19*var(--u));top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:calc(9*var(--u));font-size:calc(11*var(--u))}
.index i{width:calc(3*var(--u));height:calc(3*var(--u));border-radius:50%;background:currentColor;opacity:.75}
.index b{font-weight:400;opacity:.45;transition:opacity .3s}
.index b.on{opacity:1}
.bar{position:absolute;right:calc(10*var(--u));top:22%;bottom:22%;width:1px;background:rgba(11,11,16,.2)}
.bar i{position:absolute;left:-1px;top:0;width:3px;height:9%;background:var(--ink);will-change:transform}
.cap{position:absolute;left:50%;bottom:calc(30*var(--u));width:calc(680*var(--u));margin-left:calc(-340*var(--u));text-align:center;font:400 calc(23*var(--u))/1.18 Anton,sans-serif;text-transform:uppercase;letter-spacing:.012em}
.cap svg{display:block;margin:0 auto calc(9*var(--u));width:calc(30*var(--u));height:calc(20*var(--u));fill:currentColor}
.cap p{position:absolute;left:0;right:0;top:calc(29*var(--u));will-change:opacity}
.cap{height:calc(84*var(--u))}
.panel{position:absolute;top:50%;width:calc(330*var(--u));font:400 calc(25*var(--u))/1.14 Anton,sans-serif;text-transform:uppercase;letter-spacing:.012em;opacity:0;will-change:opacity,transform}
.p1{left:calc(84*var(--u))}.p2{right:calc(84*var(--u));text-align:right}
.sound{position:absolute;left:calc(30*var(--u));bottom:calc(30*var(--u));display:flex;align-items:center;gap:calc(7*var(--u));height:calc(30*var(--u));padding:0 calc(11*var(--u));border-radius:99px;background:var(--ink);color:#f3f0ff;font-size:calc(11*var(--u));letter-spacing:.04em}
.sound span{display:flex;align-items:center;gap:calc(1.5*var(--u));height:calc(13*var(--u))}
.sound span i{width:1px;height:30%;background:currentColor;transition:height .3s}
.sound[aria-pressed=true] span i:nth-child(odd){height:100%}
.sound[aria-pressed=true] span i:nth-child(even){height:60%}
.up{position:absolute;right:calc(30*var(--u));bottom:calc(30*var(--u));display:grid;place-items:center;width:calc(34*var(--u));height:calc(34*var(--u));border-radius:50%;background:var(--ink);color:#f3f0ff;transition:transform .25s}
.up:hover{transform:translateY(-2px)}
.up svg{width:calc(16*var(--u));height:calc(16*var(--u));fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round}
button:focus-visible,a:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media (max-width:820px){
  :root{--u:1px}
  .logo{left:16px;top:16px;font-size:21px}
  .links{right:16px;top:19px;font-size:12px}
  .index{display:none}.bar{right:6px}
  .cap{width:calc(100% - 32px);left:16px;margin:0;bottom:72px;font-size:19px;height:70px}
  .cap svg{width:24px;height:16px;margin-bottom:6px}.cap p{top:22px}
  .cap br{display:none}.cap{font-size:17px}
  .panel{top:auto;bottom:72px;left:16px;right:16px;width:auto;text-align:left;font-size:21px}
  .sound{left:16px;bottom:18px}.up{right:16px;bottom:18px}
}
</style>
</head>
<body>
<div class="track" id="track">
  <div class="view">
    <canvas id="gl" aria-label="A pink jellyfish drifting in a lilac sky with giant words wrapping around it"></canvas>
    <div class="ui">
      <a class="logo" href="#" aria-label="Driftlab">Driftlab<svg viewBox="0 0 50 30" aria-hidden="true"><path d="M2 22C8 20 12 6 15 3c2-2-3 20-1 21 3 1 5-9 8-9-1 3-2 8 0 8 3 0 4-8 7-8s-1 8 2 8 5-6 8-6 2 4 9 2"/></svg></a>
      <nav class="links" aria-label="Main"><a href="#">[Works]</a><a href="#">[Agency]</a></nav>
      <div class="index" id="index" aria-hidden="true"><i></i><b class="on">01</b><i></i><i></i><i></i><b>02</b><i></i><i></i><i></i><b>03</b><i></i><i></i><i></i><b>04</b><i></i><i></i><i></i><b>05</b><i></i></div>
      <div class="bar" aria-hidden="true"><i id="thumb"></i></div>
      <div class="cap">
        <svg id="goggle" viewBox="0 0 30 20" aria-hidden="true"><path fill-rule="evenodd" d="M7 2h16a6 6 0 0 1 6 6v5a5 5 0 0 1-9 3l-2-3h-6l-2 3a5 5 0 0 1-9-3V8a6 6 0 0 1 6-6Zm1 5a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7Zm14 0a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7Z"/></svg>
        <p id="c1">Welcome to a creative space showcasing groundbreaking <br>projects that blend creativity and technology</p>
        <p id="c2" style="opacity:0">Follow us into the future of interactive <br>and immersive digital experiences</p>
      </div>
      <p class="panel p1" id="p1">Each project at Driftlab serves as a testament to our commitment to innovation and excellence</p>
      <p class="panel p2" id="p2">Browse our portfolio to see the magic we create with cutting-edge technologies including XR, AR, AI and 3D.</p>
      <button class="sound" id="sound" aria-pressed="false" aria-label="Ambient sound"><span aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><em style="font-style:normal" id="st">OFF</em></button>
      <button class="up" id="up" aria-label="Back to top"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14V2M3 7l5-5 5 5"/></svg></button>
    </div>
  </div>
</div>
<script>
const SKY='https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_045255_3cb4b3c2-3cb5-4af9-93b4-bd88f2f883c3.png&w=1920&q=80';
const STILL='https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_045249_4f7fe287-c84b-479f-a953-04990fe1a3ac.png&w=1080&q=85';
const VIDEO='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261102_045327_a6584765-3154-43e6-b1c9-4e574f83a811.mp4';
const WORDS=['DRIFTLAB','DESIGN TO','DELIGHT','INSPIRE','AND ENGAGE'];
const STEP=.14,GAP=3.4,RADIUS=9,CAM=11,FOCAL=8.14;
const $=id=>document.getElementById(id),clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const smooth=(a,b,x)=>{x=clamp((x-a)/(b-a));return x*x*(3-2*x)},ease=x=>x*x*x*(x*(6*x-15)+10);
const cv=$('gl'),gl=cv.getContext('webgl2',{alpha:false,antialias:true,premultipliedAlpha:true});
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function program(vs,fs,names){
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,'#version 300 es\nprecision highp float;\n'+s);gl.compileShader(o);
    if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(o));return o};
  const p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);
  const u={};names.forEach(n=>u[n]=gl.getUniformLocation(p,n));return{p,u};
}
const QUAD=`out vec2 v;void main(){vec2 c=vec2((gl_VertexID<<1)&2,gl_VertexID&2);v=c;gl_Position=vec4(c*2.-1.,0,1);}`;
const skyP=program(QUAD,`in vec2 v;uniform sampler2D T;uniform vec3 C;out vec4 O;
  void main(){vec2 uv=vec2(.5)+(v-.5)*C.xy;uv.y=1.-uv.y;uv.x+=C.z;O=textureLod(T,uv,1.6);}`,['T','C']);
const wordP=program(`layout(location=0) in vec2 a;uniform vec4 W;uniform vec4 B;uniform float A;uniform vec3 L;out vec2 v;
  void main(){
    float t=(a.x-.5)*W.x+W.y;
    float th=clamp(t/${RADIUS.toFixed(1)},-1.45,1.45);
    float x=${RADIUS.toFixed(1)}*sin(th),z=${RADIUS.toFixed(1)}*(1.-cos(th))*.82;
    float y=(a.y-.5)*L.x+L.y-L.z-3.6*pow(smoothstep(.8,8.,t),1.25)-.012*t*t;
    v=vec2(mix(B.x,B.z,a.x),mix(B.w,B.y,a.y));
    gl_Position=vec4(x*${FOCAL.toFixed(2)}/A,y*${FOCAL.toFixed(2)},0.,${CAM.toFixed(1)}-z);
  }`,`in vec2 v;uniform sampler2D T;out vec4 O;void main(){float a=texture(T,v).a;O=vec4(vec3(.043,.043,.063)*a,a);}`,['W','B','A','L','T']);
const dotP=program(`layout(location=0) in vec4 a;uniform float S,H,P;out float k;out float r;
  void main(){k=a.w;float y=fract(a.y+S*.012*(.4+a.z))*2.3-1.15;float x=fract(a.x+H*(a.w>.5?.035:.004))*2.4-1.2+.03*sin(S*.2+a.z*9.);
    gl_Position=vec4(x,y,0,1);gl_PointSize=(a.w>.5?5.+a.z*15.:5.+a.z*24.)*P;r=S*.6+a.z*7.+H;}`,
  `in float k;in float r;out vec4 O;void main(){vec2 p=gl_PointCoord-.5;
    if(k>.5){float c=cos(r),s=sin(r);p=mat2(c,-s,s,c)*p;float a=step(max(abs(p.x),abs(p.y)),.3);O=vec4(vec3(.04)*a,a);}
    else{float a=smoothstep(.5,.1,length(p))*.62;O=vec4(vec3(1.)*a,a);}}`,['S','H','P']);
const jellyP=program(`uniform mat3 M;out vec2 v;void main(){vec2 c=vec2((gl_VertexID<<1)&2,gl_VertexID&2);if(gl_VertexID==3)c=vec2(2,2);c*=.5;v=vec2(c.x,1.-c.y);gl_Position=vec4((M*vec3(c-.5,1.)).xy,0,1);}`,
  `in vec2 v;uniform sampler2D T;out vec4 O;void main(){
    vec3 c=texture(T,v).rgb;
    float d=c.g-max(c.r,c.b);
    float a=1.-smoothstep(.10,.38,d);
    c.g=min(c.g,max(c.r,c.b)*.96);
    O=vec4(c*a,a);}`,['M','T']);

// word atlas: one row per word, cut to its measured width
const ROW=512,EM=440,atlas=document.createElement('canvas');atlas.width=4096;atlas.height=ROW*WORDS.length;
let layout=[];
function drawAtlas(){
  const x=atlas.getContext('2d');x.clearRect(0,0,atlas.width,atlas.height);x.font=`${EM}px Anton`;x.textBaseline='alphabetic';x.fillStyle='#000';x.textAlign='left';
  x.letterSpacing='8px';let c=0;layout=[];
  WORDS.forEach((w,i)=>{
    const m=x.measureText(w).width+16;x.fillText(w,8,i*ROW+EM*.92+6);
    const uW=m/EM*.86;layout.push({len:uW,c:c+uW/2,u:m/atlas.width,top:i/WORDS.length,bot:(i+1)/WORDS.length});c+=uW+GAP;
  });
}
const tex=(unit,filter)=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);return t};
const tSky=tex(0,gl.LINEAR_MIPMAP_LINEAR),tWords=tex(1,gl.LINEAR_MIPMAP_LINEAR),tJelly=tex(2,gl.LINEAR);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,255,0,255]));
const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
function load(url){return new Promise(r=>{const i=new Image;i.crossOrigin='anonymous';i.onload=()=>r(i);i.onerror=()=>r(null);i.src=url})}

const cols=56,ribbon=new Float32Array((cols+1)*4);
for(let i=0;i<=cols;i++){ribbon.set([i/cols,0,i/cols,1],i*4)}
const vaoW=gl.createVertexArray();gl.bindVertexArray(vaoW);gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,ribbon,gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const dots=[];let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
for(let i=0;i<40;i++)dots.push(rnd(),rnd(),rnd(),i%4?0:1);
const vaoD=gl.createVertexArray();gl.bindVertexArray(vaoD);gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dots),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,4,gl.FLOAT,false,0,0);
const vaoE=gl.createVertexArray();

const video=document.createElement('video');video.crossOrigin='anonymous';video.muted=true;video.loop=true;video.playsInline=true;video.preload='auto';video.src=VIDEO;
let W=1,H=1,dpr=1,asp=1,haveVid=false,lastT=-1;
function size(){dpr=Math.min(devicePixelRatio||1,2);W=Math.round(cv.clientWidth*dpr);H=Math.round(cv.clientHeight*dpr);cv.width=W;cv.height=H;asp=W/H;gl.viewport(0,0,W,H)}
addEventListener('resize',size);

function pushVideo(){
  if(video.readyState<2||video.currentTime===lastT)return;
  lastT=video.currentTime;haveVid=true;gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tJelly);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);
}
function draw(s,sec){
  pushVideo();
  const n=WORDS.length,span=STEP*(n-1),k=clamp(s/span)*(n-1),i=Math.min(n-2,Math.floor(k)),f=k-i;
  const c0=layout[i].c,c1=layout[i+1].c,head=c0+(c1-c0)*ease(f);
  const sink=ease(smooth(span+.015,span+.105,s))*6;
  const grow=ease(smooth(span+.08,span+.22,s)),side=smooth(.76,.82,s)-2*smooth(.88,.94,s);
  // sky
  gl.disable(gl.BLEND);gl.useProgram(skyP.p);gl.bindVertexArray(vaoE);
  gl.uniform1i(skyP.u.T,0);const ca=asp/(16/9),fx=ca>1?1:ca,fy=ca>1?1/ca:1;gl.uniform3f(skyP.u.C,fx*.92,fy*.92,s*.05+sec*.0022);gl.drawArrays(gl.TRIANGLES,0,3);
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
  // points
  gl.useProgram(dotP.p);gl.bindVertexArray(vaoD);gl.uniform1f(dotP.u.S,sec);gl.uniform1f(dotP.u.H,head*.1+s*4);gl.uniform1f(dotP.u.P,dpr*H/dpr/900);gl.drawArrays(gl.POINTS,0,40);
  // words
  gl.useProgram(wordP.p);gl.bindVertexArray(vaoW);gl.uniform1i(wordP.u.T,1);gl.uniform1f(wordP.u.A,asp);
  const hs=clamp(asp*.58,.26,1);gl.uniform3f(wordP.u.L,hs,.19+.1*(1-hs),sink);
  layout.forEach(w=>{const t=w.c-head;if(Math.abs(t)>24)return;
    gl.uniform4f(wordP.u.W,w.len*hs,t*hs,0,0);gl.uniform4f(wordP.u.B,0,w.top,w.u,w.bot);gl.drawArrays(gl.TRIANGLE_STRIP,0,(cols+1)*2)});
  // jellyfish
  gl.useProgram(jellyP.p);gl.bindVertexArray(vaoE);gl.uniform1i(jellyP.u.T,2);
  const h=(.98+grow*.42)*clamp(.62+asp*.4,.6,1),w=h*(1080/1920)/asp*(.93+.07*Math.cos(s*14));
  const roll=(.1*Math.sin(s*13+.4)+.03*Math.sin(sec*.5))*(1+grow*.5),co=Math.cos(roll),si=Math.sin(roll);
  const ox=(mx*.018+side*.34*Math.min(1,asp)),oy=.03+.018*Math.sin(sec*.8)+my*.018-grow*.1;
  gl.uniformMatrix3fv(jellyP.u.M,false,[w*2*co,w*2*si*asp,0,-h*2*si/asp,h*2*co,0,ox,oy,1]);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  ui(s,k);
}
let lastIdx=0;const marks=[...$('index').querySelectorAll('b')];
function ui(s,k){
  const op=(a,b,c,d)=>smooth(a,b,s)*(1-smooth(c,d,s));
  const c1=1-smooth(.04,.08,s),c2=op(.08,.12,.56,.62);$('c1').style.opacity=c1;$('c2').style.opacity=c2;$('goggle').style.opacity=Math.max(c1,c2);
  const a=op(.72,.77,.84,.88),b=op(.9,.95,1.1,1.2);
  $('p1').style.opacity=a;$('p1').style.transform=`translateY(calc(-50% + ${(1-a)*18}px))`;
  $('p2').style.opacity=b;$('p2').style.transform=`translateY(calc(-50% + ${(1-b)*18}px))`;
  const idx=Math.round(k);if(idx!==lastIdx){marks[lastIdx].classList.remove('on');marks[idx].classList.add('on');lastIdx=idx}
  $('thumb').style.transform=`translateY(${(s*1011).toFixed(1)}%)`;
}

let target=0,now=0,mx=0,my=0,tmx=0,tmy=0;
const read=()=>{const r=$('track').getBoundingClientRect(),m=r.height-innerHeight;target=clamp(-r.top/m)};
addEventListener('scroll',read,{passive:true});
addEventListener('pointermove',e=>{tmx=e.clientX/innerWidth*2-1;tmy=1-e.clientY/innerHeight*2});
function loop(t){
  now+=(target-now)*(calm?1:.1);mx+=(tmx-mx)*.05;my+=(tmy-my)*.05;draw(now,t/1000);
  requestAnimationFrame(loop);
}
$('up').onclick=()=>scrollTo({top:0,behavior:calm?'auto':'smooth'});

let ctx,gain;
$('sound').onclick=()=>{
  const b=$('sound'),on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);$('st').textContent=on?'ON':'OFF';
  if(!ctx){
    ctx=new AudioContext;gain=ctx.createGain();gain.gain.value=0;
    const n=ctx.createBuffer(2,ctx.sampleRate*4,ctx.sampleRate);
    for(let c=0;c<2;c++){const d=n.getChannelData(c);let l=0;for(let i=0;i<d.length;i++){l=(l+.02*(Math.random()*2-1))/1.02;d[i]=l*3.5}}
    const src=ctx.createBufferSource();src.buffer=n;src.loop=true;
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=520;
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=.09;lg.gain.value=240;lfo.connect(lg).connect(lp.frequency);
    src.connect(lp).connect(gain).connect(ctx.destination);src.start();lfo.start();
  }
  ctx.resume();gain.gain.setTargetAtTime(on?.34:0,ctx.currentTime,.4);
};

Promise.all([load(SKY),load(STILL),document.fonts.load(`${EM}px Anton`,'DRIFTLAB')]).then(([sky,still])=>{
  drawAtlas();
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tSky);if(sky){gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sky);gl.generateMipmap(gl.TEXTURE_2D)}
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,tWords);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas);gl.generateMipmap(gl.TEXTURE_2D);
  if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,8);
  if(still){gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,tJelly);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,still)}
  if(!calm)video.play().catch(()=>{});
  size();read();now=target;requestAnimationFrame(loop);
});
</script>
</body>
</html>
```