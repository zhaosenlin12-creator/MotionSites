// scripts/import-motionsites-catalog.js — mirror the public motionsites.ai catalogue.
//
// motionsites.ai is a Supabase-backed SPA. Its own (public) row projection exposes every record:
// id, title, category, type, is_free, image_preview_url, video_preview_url. The prompt body is
// account-gated, so these cards are imported as **preview-only**: preview + metadata + a link to
// the source page, badged in the UI, and never counted as "full text".
//
// Input: .work/ms-new.json (produced by the diff against data/catalog-meta.json) and the media in
// .work/ms-dl/{img,vid}. Output: covers in assets/previews/<id>.webp and records appended to
// data/ms_prompts_merged.json.
//
// Usage: node scripts/import-motionsites-catalog.js [--write] [--limit N]
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const WORK = path.join(ROOT, '.work');
const IMG = path.join(WORK, 'ms-dl', 'img');
const VID = path.join(WORK, 'ms-dl', 'vid');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');
const NEW = path.join(WORK, 'ms-new.json');

const SOURCE = {
  id: 'motionsites-public-catalog',
  repository: 'motionsites.ai public catalog',
  url: 'https://motionsites.ai',
  license: 'public preview media, archived for preview use',
  usage: 'Row metadata and preview media from the site\'s public catalogue projection; prompt bodies are account-gated and are not archived',
};

const TYPE = {
  hero: 'hero', footer: 'footer', pricing: 'pricing', mobile: 'mobile-app', cta: 'section',
  'social-media': 'section', features: 'section', 'landing-page': 'landing-page', faq: 'section',
  dashboard: 'dashboard', 'login-sign-up': 'form',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n', 'utf8');

function normalizeCategory(raw) {
  const map = {
    'saas website': 'SaaS', 'ai / saas': 'SaaS', 'ai app': 'AI Apps', 'ai data': 'AI',
    footer: 'Footer Section', 'footer section': 'Footer Section', 'cta section': 'CTA Section',
    '3d': '3D Website', 'interactive 3d': 'Interactive', 'investor presentations': 'Presentation',
    'developer platform': 'Technology', developer: 'Technology', 'learning saas': 'Education',
    'email marketing': 'Email & Newsletter', component: 'Components', 'health app': 'Healthcare',
    'health': 'Healthcare', 'mindfulness': 'Wellness', 'books': 'E-commerce',
  };
  const key = String(raw || '').trim().toLowerCase();
  return map[key] || String(raw || 'Other').trim();
}

function coverFor(id) {
  for (const ext of ['.webp', '.png', '.jpg', '.jpeg', '.gif']) {
    const p = path.join(IMG, id + ext);
    if (fs.existsSync(p)) return { kind: 'image', file: p };
  }
  for (const ext of ['.mp4', '.webm', '.mov']) {
    const p = path.join(VID, id + ext);
    if (fs.existsSync(p)) return { kind: 'video', file: p };
  }
  return null;
}

function toCover(src, dest, kind) {
  if (kind === 'video') {
    const frame = path.join(WORK, '_frame.png');
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', src, '-frames:v', '1', frame], { stdio: 'pipe' });
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), frame, dest], { stdio: 'pipe' });
    try { fs.unlinkSync(frame); } catch (e) {}
  } else {
    execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), src, dest], { stdio: 'pipe' });
  }
}

function main() {
  const write = process.argv.includes('--write');
  const limitArg = process.argv.indexOf('--limit');
  const limit = limitArg > 0 ? Number(process.argv[limitArg + 1]) : Infinity;

  const rows = readJson(NEW);
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const have = new Set(merged.map((r) => r.id));
  const maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  const planned = [];
  const skipped = { present: 0, noMedia: 0 };
  for (const row of rows) {
    if (planned.length >= limit) break;
    const id = String(row.id);
    if (have.has(id)) { skipped.present += 1; continue; }
    const media = coverFor(id.replace(/[^a-zA-Z0-9._-]/g, '_'));
    if (!media) { skipped.noMedia += 1; continue; }
    planned.push({ row, id, media });
  }

  console.log('rows', rows.length, '| planned', planned.length, '| skipped', JSON.stringify(skipped));
  if (!write) { console.log('dry run; pass --write'); return; }

  let imported = 0;
  let bytes = 0;
  const added = [];
  for (const p of planned) {
    const dest = path.join(PREVIEWS, p.id + '.webp');
    try {
      if (!fs.existsSync(dest)) toCover(p.media.file, dest, p.media.kind);
      const size = fs.statSync(dest).size;
      if (size < 2048) throw new Error('cover too small ' + size);
      bytes += size;
    } catch (e) {
      console.log('skip', p.id, String(e.message).slice(0, 90));
      continue;
    }
    const category = normalizeCategory(p.row.category);
    const type = TYPE[String(p.row.type || '').trim()] || 'section';
    merged.push({
      id: p.id,
      title: String(p.row.title || p.id).trim(),
      description: category + ' · 公开预览，正文需登录原站',
      category,
      type,
      page_type: 'preview-only',
      is_free: !!p.row.isFree,
      source_kind: 'motionsites',
      source_id: SOURCE.id,
      source_url: 'https://motionsites.ai/',
      source_repo: SOURCE.repository,
      source_license: SOURCE.license,
      local_rel: 'assets/previews/' + p.id + '.webp',
      local_kind: 'webp',
      preview_only: true,
      upstream_id: p.id,
      sort_order: maxSort + 3 * added.length + 1,
      tags: [category, type, 'preview-only'].filter(Boolean),
    });
    added.push(p.id);
    imported += 1;
  }

  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), merged);

  const srcPath = path.join(ROOT, 'data', 'catalog_sources.json');
  const sources = readJson(srcPath);
  if (!sources.some((s) => s.id === SOURCE.id)) {
    sources.push(SOURCE);
    writeJson(srcPath, sources);
  }
  console.log('imported', imported, '| covers', (bytes / 1048576).toFixed(1), 'MB | merged', merged.length);
}

main();
