const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');

// Cloudflare Pages enforces a 25 MiB per-file cap. We auto-demote any
// local preview above this threshold to a concept card so the deployed
// site never references a file that the host will silently replace
// with an HTML error page.
const MAX_PREVIEW_BYTES = 24 * 1024 * 1024;

function readNoBom(p){
  let buf=fs.readFileSync(p);
  if(buf[0]===0xEF&&buf[1]===0xBB&&buf[2]===0xBF)buf=buf.subarray(3);
  return buf.toString('utf8');
}

const mergedRaw=JSON.parse(readNoBom(path.join(ROOT,'data','ms_prompts_merged.json')));
const merged=mergedRaw.map(function(x){if(x.local_rel&&x.local_rel.startsWith('assets/'))x.local_rel=x.local_rel.replace(/^motionsites_assets\//,'assets/');return x});

const t1=JSON.parse(readNoBom(path.join(ROOT,'data','ms_prompts_with_text.json')));
const t1map=new Map(t1.map(function(x){return [x.id,x.prompt_text||'']}));

const root2=path.join(ROOT,'sources','akkikumar72','liro-prompts');
if(fs.existsSync(root2)){
  for(const dir of fs.readdirSync(root2)){
    if(dir.toLowerCase()==='index.md')continue;
    const mp=path.join(root2,dir,'metadata.json');
    if(!fs.existsSync(mp))continue;
    let m;
    try{m=JSON.parse(readNoBom(mp)).record}catch(e){continue};
    if(!m||!m.id)continue;
    if(!t1map.has(m.id)){
      const wp=path.join(root2,dir,'working-prompt.md');
      if(fs.existsSync(wp)){
        const wk=readNoBom(wp);
        const idx=wk.indexOf('## Prompt');
        const body=idx<0?wk:wk.slice(idx+'## Prompt'.length).replace(/```[a-z]*\n([\s\S]*?)\n```/g,'$1').trim();
        if(body.length>200)t1map.set(m.id,body);
      }
    }
  }
}

const prompts=merged.map(function(x){return Object.assign({},x,{prompt_text:t1map.get(x.id)||''})});

function detectKind(abs){
  try{
    const b=fs.readFileSync(abs).subarray(0,16);
    const s=b.toString('latin1');
    if(s.startsWith('RIFF')&&s.includes('WEBP'))return 'webp';
    if(s.startsWith('#EXTM3U'))return 'hls';
    if(b.subarray(4,8).toString()==='ftyp')return 'mp4';
    if(b[0]===0x47)return 'gif';
    if(b[0]===0x89)return 'png';
    if(b[0]===0xff)return 'jpeg';
  }catch(e){}
  return 'other';
}

const enriched=prompts.map(function(x){
  const o=Object.assign({},x);
  if(x.local_rel){
    function locAbs(p){
      if(!p)return null;
      const a=path.join(ROOT,p);
      if(fs.existsSync(a))return a;
      const b=path.join(ROOT,p.replace(/^assets\//,'assets/'));
      if(fs.existsSync(b))return b;
      return a;
    }
    const abs=locAbs(x.local_rel);
    if(abs && fs.existsSync(abs)){
      const stat=fs.statSync(abs);
      if(stat.size>MAX_PREVIEW_BYTES){
        // Cloudflare Pages 25 MiB per-file cap - demote to concept card
        console.warn('[build] demoting over-limit preview', x.id, (stat.size/1048576).toFixed(2)+'MiB');
        o.local_rel=null;
        o.local_kind='other';
        o.size_bytes=stat.size;
      } else {
        o.local_kind=detectKind(abs);
        o.size_bytes=stat.size;
      }
    } else {
      o.local_kind='other';
    }
  }
  return o;
});

function safe(x){
  let s=JSON.stringify(x);
  s=s.split('</'+'script>').join('<\\/'+'script>');
  return s;
}

const complete=enriched.filter(function(x){return x.prompt_text&&x.prompt_text.trim()}).length;
const webp=enriched.filter(function(x){return x.local_kind==='webp'||x.local_kind==='gif'||x.local_kind==='png'||x.local_kind==='jpeg'}).length;
const mp4=enriched.filter(function(x){return x.local_kind==='mp4'||x.local_kind==='hls'}).length;
const noMedia=enriched.filter(function(x){return !x.local_rel}).length;
console.log('Records='+enriched.length+' complete='+complete+' images='+webp+' videos='+mp4+' concepts='+noMedia);

let html=readNoBom(path.join(ROOT,'ms_template.html'));
const scriptBody=readNoBom(path.join(ROOT,'ms_script.js'));
const data=safe(enriched);

function rpl(s){return function(){return s}}
html=html.replace('$'+'{'+'enriched.length}',rpl(String(enriched.length)))
  .replace('$'+'{'+'complete}',rpl(String(complete)))
  .replace('$'+'{'+'webp}',rpl(String(webp)))
  .replace('$'+'{'+'mp4}',rpl(String(mp4)))
  .replace('$'+'{'+'noMedia}',rpl(String(noMedia)))
  .replace('__SCRIPT_BODY__',function(){return 'const DATA='+data+'\n'+scriptBody});

const outPath=path.join(ROOT,'index.html');
fs.writeFileSync(outPath,html,'utf8');
console.log('Wrote '+outPath+' bytes',html.length);
// Self-verify (bracket-matched JSON parse)
const back=fs.readFileSync(outPath,'utf8');
const sb=back.slice(back.indexOf('<script>')+8,back.lastIndexOf('</'+'script>'));
const ds=sb.indexOf('const DATA=')+11;
let de=ds,depth=0,inStr=false,escape=false;
for(let i=ds;i<sb.length;i++){const c=sb[i];if(inStr){if(escape){escape=false;continue}if(c==='\\'){escape=true;continue}if(c==='"')inStr=false;continue}if(c==='"'){inStr=true;continue}if(c==='[')depth++;else if(c===']'){depth--;if(depth===0){de=i+1;break}}}
const jsonStr=sb.slice(ds,de).split('<\\/script>').join('</'+'script>');
try{
  const records=JSON.parse(jsonStr);
  console.log('SELF-VERIFY OK records='+records.length+' first='+records[0].title);
} catch(e){
  console.log('SELF-VERIFY FAIL:',e.message);
}
