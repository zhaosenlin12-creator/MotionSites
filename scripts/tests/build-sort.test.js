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
