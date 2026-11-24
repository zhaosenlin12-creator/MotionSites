// scripts/import-motionsites-paid.js — pull the paid-only bodies with the site owner's own session.
//
// The free endpoint answers without a session; paid rows need `Authorization: Bearer <access_token>`
// from a logged-in account that owns them (Unlimited or an individual purchase). The token is read
// from .work/ms-session.json, which either the login window or a pasted token writes.
//
// Usage: node scripts/import-motionsites-paid.js [--write] [--limit N]
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const NET = path.join(ROOT, '.work', 'ms-recon', 'net');
const KEYS = JSON.parse(fs.readFileSync(path.join(ROOT, '.work', 'ms-recon', 'supabase-keys.json'), 'utf8'));
const SESSION = JSON.parse(fs.readFileSync(path.join(ROOT, '.work', 'ms-session.json'), 'utf8'));
const TOKEN = SESSION.data.access_token;
const EXP = Number(SESSION.data.expires_at || 0);
const TMP = path.join(ROOT, '.work', 'ms-paid');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');
const HOST = 'https://mjofeydconwqhnyyylsd.supabase.co';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

const BY_TYPE = {
  hero: 'Hero Section', footer: 'Footer Section', pricing: 'Pricing Page', mobile: 'Mobile App',
  cta: 'CTA Section', features: 'Features Section', faq: 'FAQ & Help', dashboard: 'Dashboards',
  'login-sign-up': 'Auth & Login', 'social-media': 'Social Media', 'landing-page': 'Landing Page',
  section: 'Sections',
};
const TYPE = {
  hero: 'hero', footer: 'footer', pricing: 'pricing', landing: 'landing-page',
  'landing-page': 'landing-page', section: 'section', component: 'component', dashboard: 'dashboard',
  mobile: 'mobile-app',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

async function body(id) {
  const r = await fetch(HOST + '/functions/v1/get-prompt', {
    method: 'POST',
    headers: { apikey: KEYS.apikey, 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN },
    body: JSON.stringify({ prompt_id: id }),
    signal: AbortSignal.timeout(30000),
  });
  const j = await r.json();
  const text = typeof j.prompt_text === 'string' ? j.prompt_text : '';
  const sections = Array.isArray(j.sections) ? j.sections.filter((s) => s && s.name && s.text).map((s) => '## ' + s.name + '\n\n' + s.text).join('\n\n') : '';
  return { text: text || sections, code: j.code || '' };
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
    const frame = path.join(TMP, path.basename(src, path.extname(src)) + '.png');
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

  if (EXP && EXP * 1000 < Date.now()) {
    console.error('token expired at', new Date(EXP * 1000).toISOString(), '— refresh the session and retry');
    process.exit(2);
  }

  const netFile = fs.readdirSync(NET).find((f) => f.includes('prompts'));
  const rows = readJson(path.join(NET, netFile)).filter((r) => !r.is_free);
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'));
  const ids = new Set(merged.map((r) => r.id));
  const titles = new Set(merged.map((r) => norm(r.title)));
  let maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  const todo = rows.filter((r) => !ids.has(r.id) && !titles.has(norm(r.title))).slice(0, limit);
  console.log('paid rows', rows.length, '| to try', todo.length);
  if (!write) { console.log(todo.slice(0, 8).map((r) => r.id).join(', ')); return; }

  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(PREVIEWS, { recursive: true });
  let imported = 0, refused = 0, noMedia = 0;
  const failures = [];
  for (const r of todo) {
    let text = '', code = '';
    try {
      ({ text, code } = await body(r.id));
    } catch (e) {
      failures.push([r.id, 'body ' + String(e.message).slice(0, 40)]);
      continue;
    }
    if (!text || text.trim().length < 200) {
      if (code === 'paid_only' || code === 'access_denied') refused += 1; else failures.push([r.id, 'code ' + code]);
      continue;
    }
    const dest = path.join(PREVIEWS, r.id + '.webp');
    try {
      if (!fs.existsSync(dest)) {
        const media = r.image_preview_url || r.video_preview_url;
        if (!media) { noMedia += 1; }
        else {
          const isVideo = /\.mp4|\.webm|\.m3u8/i.test(media) || (!/\.(webp|png|jpe?g|gif)/i.test(media) && !!r.video_preview_url);
          const ext = ((new URL(media).pathname.match(/\.([a-z0-9]{2,5})$/i) || [])[1] || (isVideo ? 'mp4' : 'webp')).toLowerCase();
          const src = path.join(TMP, r.id + '.' + ext);
          await download(media, src);
          cover(src, dest, isVideo);
        }
      }
      if (!media_ok(dest)) throw new Error('no cover');
    } catch (e) {
      failures.push([r.id, String(e.message).slice(0, 50)]);
      continue;
    }
    const industry = String(r.category || '').trim();
    const category = BY_TYPE[r.type] || 'Other';
    merged.push({
      id: r.id, title: String(r.title || r.id).trim(),
      description: (industry && industry !== category ? industry + ' · ' : '') + category,
      category, type: TYPE[r.type] || 'section', page_type: r.page_type || 'landing', is_free: false,
      source_kind: 'motionsites', source_id: 'motionsites-public-catalog',
      source_url: 'https://motionsites.ai/?prompt=' + encodeURIComponent(r.id),
      source_repo: 'motionsites.ai', source_license: 'archived with the owner account session',
      local_rel: 'assets/previews/' + r.id + '.webp', local_kind: 'webp',
      sort_order: (maxSort += 3), tags: [category, TYPE[r.type] || 'section', industry].filter(Boolean),
    });
    prompts.push({ id: r.id, prompt_text: String(text).replace(/\r\n/g, '\n') });
    imported += 1;
    if (imported % 10 === 0) console.log('imported', imported, '| refused', refused, '| failures', failures.length);
  }

  function media_ok(p) { try { return fs.existsSync(p) && fs.statSync(p).size >= 2500; } catch (e) { return false; } }

  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), merged);
  writeJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), prompts);
  console.log('imported', imported, '| refused (paid_only)', refused, '| no preview', noMedia, '| failures', failures.length);
  if (failures.length) console.log(JSON.stringify(failures.slice(0, 10)));
}

main();
