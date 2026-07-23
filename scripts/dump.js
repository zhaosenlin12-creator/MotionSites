const { KEY } = require('C:/kaifa_boot/ms_helpers.js');
const https = require('https');
const { URL } = require('url');
function raw(path){return new Promise((resolve)=>{const u=new URL(path,'https://xgdzyqfalbibzelpdpvr.supabase.co');const req=https.request({hostname:u.hostname,path:u.pathname+u.search,method:'GET',headers:{apikey:KEY,authorization:'Bearer '+KEY}},r=>{const chunks=[];r.on('data',c=>chunks.push(c));r.on('end',()=>resolve({status:r.statusCode,body:Buffer.concat(chunks).toString('utf8')}));});req.on('error',e=>resolve({err:e.message}));req.end();});}
(async()=>{
  const cols='id,title,category,sort_order,type,types,page_type,row_span,is_free,image_preview_url,video_preview_url,created_at';
  let all=[]; let off=0; const lim=500;
  while(true){
    const r=await raw(`/rest/v1/prompts?select=${encodeURIComponent(cols)}&order=sort_order.asc&offset=${off}&limit=${lim}`);
    if(r.status!==200){console.log('err',r.status,r.body.slice(0,200));break;}
    const arr=JSON.parse(r.body);
    if(arr.length===0) break;
    all=all.concat(arr);
    if(arr.length<lim) break;
    off+=lim;
  }
  require('fs').writeFileSync('C:/kaifa_boot/ms_prompts.json', JSON.stringify(all));
  console.log('total',all.length);
  console.log('with image_preview:',all.filter(x=>x.image_preview_url).length);
  console.log('with video_preview:',all.filter(x=>x.video_preview_url).length);
  console.log('free:',all.filter(x=>x.is_free).length,'paid:',all.filter(x=>!x.is_free).length);
  console.log('categories:',[...new Set(all.map(x=>x.category))].join(' | '));
  console.log('page_types:',[...new Set(all.map(x=>x.page_type))].join(' | '));
})();