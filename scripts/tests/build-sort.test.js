const test = require("node:test");
const assert = require("node:assert/strict");

const { sortCatalog } = require("../lib/catalog-utils");

test("sortCatalog prefers records with a local preview first", () => {
  const list = [
    { id: "a", local_rel: null, sort_order: 10 },
    { id: "b", local_rel: "assets/b.webp", sort_order: 50 },
    { id: "c", local_rel: null, sort_order: 5 },
    { id: "d", local_rel: "assets/d.webp", sort_order: 40 },
  ];
  const sorted = sortCatalog(list);
  assert.deepEqual(sorted.map((x) => x.id), ["d", "b", "c", "a"]);
});

test("sortCatalog falls back to sort_order then id within each group", () => {
  const list = [
    { id: "b", local_rel: "assets/b.webp", sort_order: 50 },
    { id: "a", local_rel: "assets/a.webp", sort_order: 50 },
    { id: "d", local_rel: "assets/d.webp", sort_order: 5 },
    { id: "c", local_rel: null, sort_order: 1 },
    { id: "e", local_rel: null, sort_order: 2 },
  ];
  const sorted = sortCatalog(list);
  assert.deepEqual(sorted.map((x) => x.id), ["d", "a", "b", "c", "e"]);
});

test("sortCatalog handles missing sort_order and local_rel gracefully", () => {
  const list = [
    { id: "a" },
    { id: "b", local_rel: "assets/b.webp" },
    { id: "c", sort_order: 1 },
  ];
  const sorted = sortCatalog(list);
  assert.equal(sorted[0].id, "b");
});
