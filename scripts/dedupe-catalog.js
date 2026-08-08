// Collapse records that share the same normalized title into one canonical entry.
// Preference order:
//   1. The record that already has a local_rel (a downloaded preview).
//   2. The record with a non-empty body (already in prompts).
//   3. The first occurrence in the file (stable for legacy ids).
//
// File rename logic:
//   - The KEEP id is canonical. Any pre-existing local_rel file whose id was the
//     DISCARD entry is renamed to the KEEP id's filename (preserving extension).
//   - If the rename target already exists, the smaller file is removed.
//
// Records under assets/community/superdesign/<slug>/preview.* are NOT touched
// (community assets live in their own directory).
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const mergedPath = path.join(ROOT, 'data', 'ms_prompts_merged.json');
const withTextPath = path.join(ROOT, 'data', 'ms_prompts_with_text.json');
const merged = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));
const withText = JSON.parse(fs.readFileSync(withTextPath, 'utf8'));
const wtMap = new Map(withText.map((r) => [r.id, r]));

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

const groups = new Map();
for (const r of merged) {
  const norm = normalize(r.title);
  if (!groups.has(norm)) groups.set(norm, []);
  groups.get(norm).push(r);
}

let removed = 0;
let renamed = 0;
let bodiesCopied = 0;
const finalMerged = [];
for (const [, items] of groups) {
  if (items.length === 1) { finalMerged.push(items[0]); continue; }
  // score: +10 if local_rel, +1 if has body, otherwise 0; stable order by index
  const indexed = items.map((r, idx) => ({ r, idx, score: (r.local_rel ? 10 : 0) + (wtMap.get(r.id)?.prompt_text ? 1 : 0) }));
  indexed.sort((a, b) => b.score - a.score || a.idx - b.idx);
  const keep = indexed[0].r;
  const discard = indexed.slice(1).map((x) => x.r);

  // Rename preview files from discard ids to keep id.
  for (const d of discard) {
    if (!d.local_rel) continue;
    const keepExt = path.extname(d.local_rel);
    const keepPath = path.join(ROOT, 'assets', 'previews', keep.id + keepExt);
    const discardPath = path.join(ROOT, d.local_rel);
    if (!fs.existsSync(discardPath)) continue;
    if (!fs.existsSync(keepPath)) {
      try { fs.renameSync(discardPath, keepPath); renamed += 1; } catch (_) {}
    } else {
      // both exist - keep the larger
      try {
        const a = fs.statSync(discardPath).size;
        const b = fs.statSync(keepPath).size;
        if (a > b) {
          fs.renameSync(discardPath, keepPath);
          renamed += 1;
        } else {
          fs.unlinkSync(discardPath);
        }
      } catch (_) {}
    }
  }

  // Use keep.local_rel, preferring a non-null value
  const newLocalRel = keep.local_rel || discard.find((d) => d.local_rel)?.local_rel;
  if (newLocalRel) {
    const newExt = path.extname(newLocalRel);
    keep.local_rel = 'assets/previews/' + keep.id + newExt;
    keep.local_kind = path.extname(keep.local_rel).slice(1).toLowerCase();
  }

  // Copy body from discard if keep has no body.
  if (!wtMap.get(keep.id)?.prompt_text) {
    for (const d of discard) {
      const p = wtMap.get(d.id);
      if (p && p.prompt_text) {
        wtMap.set(keep.id, { ...p, id: keep.id });
        bodiesCopied += 1;
        break;
      }
    }
  }

  // Merge source fields from discard if keep has none.
  for (const d of discard) {
    if (!keep.source_id && d.source_id) {
      Object.assign(keep, {
        source_id: d.source_id,
        source_repo: d.source_repo,
        source_license: d.source_license,
        source_path: d.source_path,
        source_url: d.source_url,
        text_reconstructed: d.text_reconstructed,
      });
    }
  }

  removed += discard.length;
  finalMerged.push(keep);
}

const finalPrompts = withText.filter((r) => finalMerged.some((m) => m.id === r.id));

fs.writeFileSync(mergedPath, JSON.stringify(finalMerged, null, 2) + '\n', 'utf8');
fs.writeFileSync(withTextPath, JSON.stringify(finalPrompts, null, 2) + '\n', 'utf8');

console.log('records before:', merged.length);
console.log('records after:', finalMerged.length);
console.log('duplicates removed:', removed);
console.log('files renamed:', renamed);
console.log('bodies copied:', bodiesCopied);
