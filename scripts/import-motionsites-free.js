// scripts/import-motionsites-free.js — archive the free prompts motionsites.ai serves publicly.
//
// The site's own body endpoint (`/functions/v1/get-prompt`) returns `prompt_text` for rows marked
// `is_free` without any session; paid rows answer `paid_only` with `prompt_text: null`. This
// importer walks the rows that are not in the catalogue yet, keeps only the ones the endpoint
// actually returns, downloads their public preview, and writes a normal card.
//
// Usage: node scripts/import-motionsites-free.js [--write] [--limit N]
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const NET = path.join(ROOT, '.work', 'ms-recon', 'net');
const KEYS = JSON.parse(fs.readFileSync(path.join(ROOT, '.work', 'ms-recon', 'supabase-keys.json'), 'utf8'));
const TMP = path.join(ROOT, '.work', 'ms-free');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');
const HOST = 'https://mjofeydconwqhnyyylsd.supabase.co';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

const CATEGORY = {
  'Landing Page': 'Landing Page', 'Hero Section': 'Hero Section', 'Portfolio': 'Portfolio',
  'SaaS': 'SaaS', 'Agency': 'Agency', 'E-commerce': 'E-commerce', 'Ecommerce': 'E-commerce',
  '3D': '3D Website', 'Interactive': 'Interactive', 'Pricing': 'Pricing Page',
  'Footer': 'Footer Section', 'Footer Section': 'Footer Section', 'Creative': 'Creative',
  'AI': 'AI Apps', 'Travel': 'Travel', 'Fashion': 'Fashion', 'Fintech': 'Fintech',
  'Dashboard': 'Dashboards', 'Restaurant': 'Food & Drink', 'Health': 'Healthcare',
  'Education': 'Education', 'Real Estate': 'Real Estate', 'Logistics': 'Logistics',
};
const TYPE = {
  hero: 'hero', footer: 'footer', pricing: 'pricing', landing: 'landing-page',
  'landing-page': 'landing-page', section: 'section', component: 'component',
  dashboard: 'dashboard', mobile: 'mobile-app',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

async function body(id) {
  const r = await fetch(HOST + '/functions/v1/get-prompt', {
    method: 'POST',
    headers: { apikey: KEYS.apikey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt_id: id }),
  });
  const j = await r.json();
  return { text: typeof j.prompt_text === 'string' ? j.prompt_text : '', code: j.code || '' };
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, Referer: 'https://motionsites.ai/' }, signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1024) throw new Error('tiny');
  fs.writeFileSync(dest, buf);
}

function cover(src, dest, isVideo) {
  if (isVideo) {
    const frame = TMP / path.basename(src, path.extname(src))+'.png';
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', src, '-frames:v', '1', frame],
      { stdio: 'pipe', timeout: 60000, killSignal: 'SIGKILL' });
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), frame, dest], { stdio: 'pipe' });
  } else {
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), src, dest], { stdio: 'pipe' });
  }
}

async function main() {
  const write = process.argv.includes('--write');
  const limArg = process.argv.indexOf('--limit');
  const limit = limArg > 0 ? Number(process.argv[limArg + 1]) : Infinity;

  const netFile = fs.readdirSync(NET).find((f) => f.includes('prompts'));
  const rows = readJson(path.join(NET, netFile)).filter((r) => r.is_free);
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'));
  const ids = new Set(merged.map((r) => r.id));
  const titles = new Set(merged.map((r) => norm(r.title)));
  let maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  const todo = rows.filter((r) => !ids.has(r.id) && !titles.has(norm(r.title))).slice(0, limit);
  console.log('free rows', rows.length, '| to fetch', todo.length);
  if (!write) { console.log(todo.slice(0, 8).map((r) => r.id).join(', ')); return; }

  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(PREVIEWS, { recursive: true });
  let imported = 0, noText = 0;
  const failures = [];
  for (const r of todo) {
    let text = '';
    try {
      ({ text } = await body(r.id));
    } catch (e) {
      failures.push([r.id, 'body ' + String(e.message).slice(0, 40)]);
      continue;
    }
    if (!text || text.trim().length < 200) { noText += 1; continue; }

    const dest = path.join(PREVIEWS, r.id + '.webp');
    try {
      if (!fs.existsSync(dest)) {
        const media = r.image_preview_url || r.video_preview_url;
        if (!media) throw new Error('no preview url');
        const isVideo = /\.mp4|\.webm|\.m3u8/i.test(media) || (!/\.(webp|png|jpe?g|gif)/i.test(media) && !!r.video_preview_url);
        const ext = ((new URL(media).pathname.match(/\.([a-z0-9]{2,5})$/i) || [])[1] || (isVideo ? 'mp4' : 'webp')).toLowerCase();
        const src = path.join(TMP, r.id + '.' + ext);
        await download(media, src);
        cover(src, dest, isVideo);
      }
      if (fs.statSync(dest).size < 2500) throw new Error('cover too small');
    } catch (e) {
      failures.push([r.id, String(e.message).slice(0, 50)]);
      continue;
    }

    const category = CATEGORY[r.category] || r.category || 'Other';
    const type = TYPE[r.type] || 'section';
    merged.push({
      id: r.id,
      title: String(r.title || r.id).trim(),
      description: category + ' · ' + type,
      category,
      type,
      page_type: r.page_type || 'landing',
      is_free: true,
      source_kind: 'motionsites',
      source_id: 'motionsites-public-catalog',
      source_url: 'https://motionsites.ai/?prompt=' + encodeURIComponent(r.id),
      source_repo: 'motionsites.ai',
      source_license: 'public free prompt (site serves the body without a session)',
      local_rel: 'assets/previews/' + r.id + '.webp',
      local_kind: 'webp',
      sort_order: (maxSort += 3),
      tags: [category, type, 'free'],
    });
    prompts.push({ id: r.id, prompt_text: String(text).replace(/\r\n/g, '\n') });
    imported += 1;
    if (imported % 20 === 0) console.log('imported', imported, '/', todo.length, '| noText', noText, '| failures', failures.length);
  }

  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), merged);
  writeJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), prompts);
  console.log('imported', imported, '| body unavailable', noText, '| media failures', failures.length);
  if (failures.length) console.log(JSON.stringify(failures.slice(0, 10)));
}

main();
