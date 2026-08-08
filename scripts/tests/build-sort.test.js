const test = require("node:test");
const assert = require("node:assert/strict");

const { sortCatalog } = require("../lib/catalog-utils");

test("sortCatalog puts records with a video preview before image previews", () => {
  const list = [
    { id: "img-a", local_rel: "assets/img-a.webp", local_kind: "webp", sort_order: 10 },
    { id: "vid-a", local_rel: "assets/vid-a.mp4", local_kind: "mp4", sort_order: 80 },
    { id: "img-b", local_rel: "assets/img-b.webp", local_kind: "webp", sort_order: 20 },
    { id: "vid-b", local_rel: "assets/vid-b.mp4", local_kind: "mp4", sort_order: 90 },
  ];
  const sorted = sortCatalog(list);
  // videos (any sort_order) come before images
  assert.deepEqual(
    sorted.map((x) => x.id),
    ["vid-a", "vid-b", "img-a", "img-b"]
  );
});

test("sortCatalog falls back to sort_order then id within each visual bucket", () => {
  const list = [
    { id: "b", local_rel: "assets/b.webp", local_kind: "webp", sort_order: 50 },
    { id: "a", local_rel: "assets/a.webp", local_kind: "webp", sort_order: 50 },
    { id: "d", local_rel: "assets/d.webp", local_kind: "webp", sort_order: 5 },
    { id: "c", local_rel: null, sort_order: 1 },
    { id: "e", local_rel: null, sort_order: 2 },
  ];
  const sorted = sortCatalog(list);
  // images first (sorted by sort_order then id), then concepts (sorted by sort_order then id)
  assert.deepEqual(
    sorted.map((x) => x.id),
    ["d", "a", "b", "c", "e"]
  );
});

test("sortCatalog handles missing sort_order and local_rel gracefully", () => {
  const list = [
    { id: "a" },
    { id: "b", local_rel: "assets/b.webp", local_kind: "webp" },
    { id: "c", sort_order: 1 },
  ];
  const sorted = sortCatalog(list);
  // b has a preview, so it should come first even without an explicit sort_order
  assert.equal(sorted[0].id, "b");
});

test("sortCatalog groups records with a preview above records without one", () => {
  const list = [
    { id: "concept-low", local_rel: null, sort_order: 1 },
    { id: "preview-high", local_rel: "assets/preview-high.webp", local_kind: "webp", sort_order: 9999 },
    { id: "concept-mid", local_rel: null, sort_order: 500 },
  ];
  const sorted = sortCatalog(list);
  // the preview record should rank above concept records no matter what their sort_order is
  assert.deepEqual(
    sorted.map((x) => x.id),
    ["preview-high", "concept-low", "concept-mid"]
  );
});

const { detectAssetKind } = require('../lib/catalog-utils');
const fs2 = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function withTempFile(bytes, ext, fn) {
  const tmp = fs2.mkdtempSync(path.join(os.tmpdir(), 'detect-kind-'));
  const fp = path.join(tmp, 'asset' + (ext || ''));
  fs2.writeFileSync(fp, bytes);
  try { return fn(fp); } finally { fs2.rmSync(tmp, { recursive: true, force: true }); }
}

test('detectAssetKind recognises mp4 magic bytes regardless of extension', () => {
  // 4 bytes size + 'ftyp' + brand = mp4 signature
  const mp4 = Buffer.from([0,0,0,32,0x66,0x74,0x79,0x70,0x69,0x73,0x6f,0x6d,0,2,0,0]);
  withTempFile(mp4, '.webp', function(fp) {
    assert.equal(detectAssetKind(fp), 'mp4');
  });
});

test('detectAssetKind recognises webm magic bytes (EBML header)', () => {
  // 1A 45 DF A3 = EBML
  const webm = Buffer.from([0x1A,0x45,0xDF,0xA3,0x42,0x82,0x88,0,0,0,0,0,0,0,0,0]);
  withTempFile(webm, '.bin', function(fp) {
    assert.equal(detectAssetKind(fp), 'webm');
  });
});

test('detectAssetKind falls back to extension when magic bytes are unknown', () => {
  const empty = Buffer.alloc(0);
  withTempFile(empty, '.png', function(fp) {
    assert.equal(detectAssetKind(fp), 'png');
  });
  withTempFile(empty, '.mp4', function(fp) {
    assert.equal(detectAssetKind(fp), 'mp4');
  });
  withTempFile(empty, '.webm', function(fp) {
    assert.equal(detectAssetKind(fp), 'webm');
  });
});

test('detectAssetKind returns "other" for missing files', () => {
  assert.equal(detectAssetKind(null), 'other');
  assert.equal(detectAssetKind(''), 'other');
  assert.equal(detectAssetKind('does-not-exist.webp'), 'other');
});

test('sortCatalog buckets webm alongside mp4 as videos', () => {
  const list = [
    { id: 'img', local_rel: 'assets/img.webp', local_kind: 'webp' },
    { id: 'webm', local_rel: 'assets/webm.webm', local_kind: 'webm' },
    { id: 'mp4', local_rel: 'assets/mp4.mp4', local_kind: 'mp4' },
    { id: 'concept', local_rel: null },
  ];
  const sorted = sortCatalog(list);
  // webm and mp4 should both come before webp and concept
  assert.deepEqual(sorted.map(function(x){ return x.id; }), ['mp4', 'webm', 'img', 'concept']); // id tie-break
});

