// scripts/verify-assets.js — prove every referenced preview is on disk, decodable and sane.
//
// Checks each card's local_rel and poster_rel: file exists, is larger than 2 KB, and starts with
// the magic bytes of the format its extension claims (webp / png / jpeg / mp4 / webm). Run it
// before a deploy: a card that points at a truncated or mislabelled file is a broken preview.
//
// Usage: node scripts/verify-assets.js [--json]
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const meta = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'catalog-meta.json'), 'utf8'));

const MAGIC = {
  '.webp': (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP',
  '.png': (b) => b[0] === 0x89 && b.subarray(1, 4).toString('latin1') === 'PNG',
  '.jpg': (b) => b[0] === 0xFF && b[1] === 0xD8,
  '.jpeg': (b) => b[0] === 0xFF && b[1] === 0xD8,
  '.gif': (b) => b.subarray(0, 3).toString('latin1') === 'GIF',
  '.mp4': (b) => b.length > 12 && b.subarray(4, 8).toString('latin1') === 'ftyp',
  '.webm': (b) => b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3,
  '.mov': (b) => b.length > 12 && b.subarray(4, 8).toString('latin1') === 'ftyp',
};

const problems = [];
const checked = new Set();
let bytes = 0;
const byKind = {};

for (const card of meta) {
  for (const rel of [card.local_rel, card.poster_rel]) {
    if (!rel || checked.has(rel)) continue;
    checked.add(rel);
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) { problems.push('missing ' + rel); continue; }
    const st = fs.statSync(abs);
    if (st.size < 2048) { problems.push('too small (' + st.size + ' B) ' + rel); continue; }
    const ext = path.extname(rel).toLowerCase();
    const test = MAGIC[ext];
    const head = Buffer.alloc(16);
    const fd = fs.openSync(abs, 'r');
    fs.readSync(fd, head, 0, 16, 0);
    fs.closeSync(fd);
    if (!test) { problems.push('unknown extension ' + ext + ' ' + rel); continue; }
    if (!test(head)) { problems.push('bad magic for ' + ext + ' ' + rel); continue; }
    bytes += st.size;
    byKind[ext] = (byKind[ext] || 0) + 1;
  }
}

const summary = {
  cards: meta.length,
  files: checked.size,
  bytes: Math.round(bytes / 1048576),
  byKind,
  problems: problems.length,
};
if (process.argv.includes('--json')) console.log(JSON.stringify(summary, null, 2));
else {
  console.log('assets: ' + checked.size + ' files, ' + summary.bytes + ' MB, ' + JSON.stringify(byKind));
  if (problems.length) {
    console.log('PROBLEMS ' + problems.length);
    problems.slice(0, 20).forEach((p) => console.log(' - ' + p));
    process.exitCode = 1;
  } else console.log('ASSETS OK');
}
