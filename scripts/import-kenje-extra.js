// scripts/import-kenje-extra.js — the leftovers: retry the blocked media, and import the
// HorizonX / 21st.dev corpora that the first pass excluded.
//
// Both lists carry a full prompt body; only the media fetch failed. Videos are grabbed with ffmpeg
// straight from the URL (one frame at 1 s), images with a browser-like header set plus the source
// site as Referer. Anything that still fails is skipped rather than listed without a preview.
//
// Usage: node scripts/import-kenje-extra.js [--write]
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RETRY = path.join(ROOT, '.work', 'kenje-retry.json');
const EXCLUDED = path.join(ROOT, '.work', 'kenje-excluded.json');
const TMP = path.join(ROOT, '.work', 'kenje-extra');
const PREVIEWS = path.join(ROOT, 'assets', 'previews');

const CATEGORY = { 'HorizonX Library': 'Interactive', '21st.dev Registry': 'Components' };
const SOURCE = {
  id: 'kenje-rebirth-motionsites',
  repository: 'kenje24/rebirth-motionsitesprompt',
  url: 'https://github.com/kenje24/rebirth-motionsitesprompt',
  license: 'MIT',
  preview_notice: 'Preview media is fetched from the URLs recorded in the repository manifest and converted to a 1280x800 webp cover; nothing is hotlinked at runtime.',
  usage: 'MotionSites-family records plus the repository’s HorizonX and 21st.dev captures, attributed per record',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + '\n', 'utf8');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const fp = (s) => crypto.createHash('sha1').update(String(s || '').replace(/\s+/g, ' ').trim().slice(0, 400)).digest('hex');
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');

async function download(url, dest) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(25000),
        headers: {
          'User-Agent': UA,
          Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
          Referer: 'https://motionsites.ai/',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1024) throw new Error('tiny ' + buf.length);
      fs.writeFileSync(dest, buf);
      return buf.length;
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 700 * (attempt + 1)));
    }
  }
  return 0;
}

function frame(url, dest) {
  // ffmpeg reads the URL directly: no full download, works for mp4 and HLS.
  const args = ['-y', '-loglevel', 'error', '-rw_timeout', '20000000', '-headers',
    'User-Agent: ' + UA + '\r\nReferer: https://motionsites.ai/\r\n',
    '-ss', '1', '-i', url, '-frames:v', '1', dest];
  execFileSync('ffmpeg', args, { stdio: 'pipe', timeout: 60000, killSignal: 'SIGKILL' });
}

function toCover(src, dest) {
  execFileSync('python', [path.join(ROOT, 'scripts', 'convert_preview.py'), src, dest], { stdio: 'pipe' });
}

async function main() {
  const write = process.argv.includes('--write');
  const retry = readJson(RETRY);
  const excluded = readJson(EXCLUDED);
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'));
  const have = new Set(merged.map((r) => r.id));
  const haveStrings = new Set([...have, ...merged.map((r) => norm(r.title))]);
  const haveBodies = new Set(prompts.map((p) => fp(p.prompt_text)));
  let maxSort = merged.reduce((m, r) => Math.max(m, Number(r.sort_order) || 0), 0);

  const jobs = [];
  for (const p of retry) {
    if (have.has(p.id)) continue;
    jobs.push({ id: p.id, title: p.title, category: p.category, type: p.type || 'section', prompt: p.prompt, media: p.media, kind: p.mediaType, sourceFolder: p.folder, origin: 'kenje' });
  }
  for (const r of excluded) {
    const id = String(r.id || '').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    if (!id || have.has(id)) continue;
    const title = String(r.title || id).replace(/^\[(HorizonX|21st\.dev)\]\s*/i, '').trim();
    if (haveStrings.has(norm(title))) continue;
    if (haveBodies.has(fp(r.prompt))) continue;
    jobs.push({
      id, title,
      category: CATEGORY[r.category] || 'Components',
      type: r.category === '21st.dev Registry' ? 'component' : 'hero',
      prompt: r.prompt,
      media: r.mediaUrl || r.posterUrl || r.animatedUrl,
      kind: r.mediaType,
      sourceFolder: r.folder,
      origin: r.category === '21st.dev Registry' ? '21st.dev' : 'HorizonX',
    });
  }

  console.log('jobs', jobs.length, '| retry', retry.length, '| excluded', excluded.length);
  if (!write) { console.log('dry run; pass --write'); return; }
  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(PREVIEWS, { recursive: true });

  let imported = 0;
  const failures = [];
  for (const j of jobs) {
    const dest = path.join(PREVIEWS, j.id + '.webp');
    try {
      if (!fs.existsSync(dest)) {
        const ext = ((new URL(j.media).pathname.match(/\.([a-z0-9]{2,5})$/i) || [])[1] || '').toLowerCase();
        // Decide by the URL, not by the manifest's mediaType: mux thumbnails are labelled "video" but
        // are served as .webp stills, and ffmpeg cannot read those.
        const isVideo = ['mp4', 'webm', 'mov', 'm3u8'].includes(ext) || (!ext && j.kind === 'video');
        const shot = path.join(TMP, j.id + '.png');
        if (isVideo) {
          // Some CDNs refuse ffmpeg's TLS/UA but answer a plain fetch, so fall back to
          // downloading the clip and cutting the frame locally.
          try {
            frame(j.media, shot);
          } catch (e) {
            const local = path.join(TMP, j.id + '.mp4');
            await download(j.media, local);
            execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', local, '-frames:v', '1', shot],
              { stdio: 'pipe', timeout: 60000, killSignal: 'SIGKILL' });
          }
        } else {
          const img = path.join(TMP, j.id + (ext ? '.' + ext : '.img'));
          await download(j.media, img);
          fs.copyFileSync(img, shot);
        }
        toCover(shot, dest);
      }
      const size = fs.statSync(dest).size;
      if (size < 2500) throw new Error('cover too small ' + size);
    } catch (e) {
      failures.push([j.id, String(e.message).slice(0, 90)]);
      continue;
    }

    merged.push({
      id: j.id,
      title: j.title,
      description: j.category + ' · ' + j.type,
      category: j.category,
      type: j.type,
      page_type: j.origin === 'kenje' ? 'landing' : 'component',
      is_free: true,
      source_kind: 'community',
      source_id: SOURCE.id,
      source_url: 'https://github.com/kenje24/rebirth-motionsitesprompt/blob/HEAD/' + (j.sourceFolder || '') + '/',
      source_repo: SOURCE.repository,
      source_license: SOURCE.license,
      local_rel: 'assets/previews/' + j.id + '.webp',
      local_kind: 'webp',
      sort_order: (maxSort += 3),
      tags: [j.category, j.type, 'kenje'],
      community_slug: j.id,
    });
    prompts.push({ id: j.id, prompt_text: String(j.prompt).replace(/\r\n/g, '\n') });
    have.add(j.id);
    imported += 1;
    if (imported % 15 === 0) console.log('imported', imported, '/', jobs.length, 'failures', failures.length);
  }

  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), merged);
  writeJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), prompts);
  console.log('imported', imported, '| failures', failures.length);
  if (failures.length) console.log(JSON.stringify(failures.slice(0, 12)));
}

main();
