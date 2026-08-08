const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const { auditCatalog, findOrphanAssets } = require('../lib/catalog-utils');

test('audit rejects duplicate ids, missing assets, and short prompts', () => {
  const result = auditCatalog({
    root: process.cwd(),
    merged: [
      { id: 'same', local_rel: 'assets/missing-preview.webp' },
      { id: 'same', local_rel: null },
    ],
    prompts: [
      { id: 'same', prompt_text: 'short prompt' },
    ],
    sources: [],
  });

  assert.deepEqual(
    result.errors.map((error) => error.code).sort(),
    ['duplicate-id', 'missing-asset', 'short-prompt'],
  );
});

test('audit flags orphan assets under assets/previews and assets/community', () => {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'audit-orphans-'));
  fs.mkdirSync(path.join(tmp, 'assets', 'previews'), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'assets', 'community', 'superdesign'), { recursive: true });
  fs.mkdirSync(path.join(tmp, 'data'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'assets', 'previews', 'referenced.webp'), '');
  fs.writeFileSync(path.join(tmp, 'assets', 'previews', 'orphan.webp'), '');
  fs.mkdirSync(path.join(tmp, 'assets', 'community', 'superdesign', 'orphan-slug'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'assets', 'community', 'superdesign', 'orphan-slug', 'preview.png'), '');
  fs.writeFileSync(path.join(tmp, 'data', 'ms_prompts_merged.json'), JSON.stringify([
    { id: 'referenced', local_rel: 'assets/previews/referenced.webp' },
  ]));

  try {
    const result = auditCatalog({
      root: tmp,
      merged: [{ id: 'referenced', local_rel: 'assets/previews/referenced.webp' }],
      prompts: [],
      sources: [],
    });
    const codes = result.errors.map(function(e){ return e.code + ':' + e.path; }).sort();
    assert.ok(codes.indexOf('orphan-asset:assets/previews/orphan.webp') >= 0);
    assert.ok(codes.indexOf('orphan-asset:assets/community/superdesign/orphan-slug/preview.png') >= 0);
    assert.equal(codes.indexOf('orphan-asset:assets/previews/referenced.webp'), -1);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('findOrphanAssets is a no-op when root has no merged.json', () => {
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'audit-orphans-empty-'));
  try {
    const { findOrphanAssets } = require('../lib/catalog-utils');
    assert.deepEqual(findOrphanAssets(tmp), []);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

