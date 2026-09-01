// scripts/cleanup-cards.js
// Strip catalog-meta/cards/text-files down to "preview AND prompt text" only.
// Removes: concept-only cards (no preview) + cards missing prompt text.
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "")); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8"); }

console.log("[cleanup] reading current data...");
const metaRaw = readJson(path.join(DATA, "catalog-meta.json"));
const cards = metaRaw.cards || metaRaw;
const textIdx = readJson(path.join(DATA, "catalog-text-index.json"));
const detailsObj = readJson(path.join(DATA, "catalog-details.json"));

console.log("[cleanup] cards: " + cards.length);

const textIds = Object.keys(textIdx);
const keepIds = cards
  .filter((c) => (c.local_rel || c.poster_rel) && textIds.includes(c.id))
  .map((c) => c.id);
const removeIds = cards
  .filter((c) => !((c.local_rel || c.poster_rel) && textIds.includes(c.id)))
  .map((c) => c.id);

console.log("[cleanup] keep: " + keepIds.length + "  remove: " + removeIds.length);

const keepSet = new Set(keepIds);

const newCards = cards.filter((c) => keepSet.has(c.id));
const newDetails = {};
for (const id of keepIds) if (detailsObj[id]) newDetails[id] = detailsObj[id];
const newTextIdx = {};
for (const id of keepIds) if (textIdx[id]) newTextIdx[id] = textIdx[id];

// --- rebuild lite counts from the new card set ---
const counts = { total: newCards.length, image: 0, video: 0, concept: 0 };
const catCounts = {};
let complete = 0;
for (const c of newCards) {
  const hasPreview = !!(c.local_rel || c.poster_rel);
  if (hasPreview) {
    const ext = path.extname(c.local_rel || c.poster_rel).toLowerCase();
    if (ext === ".mp4" || ext === ".mov" || ext === ".m4v" || ext === ".webm") counts.video++;
    else counts.image++;
  } else {
    counts.concept++;
  }
  catCounts[c.category] = (catCounts[c.category] || 0) + 1;
  if (textIds.includes(c.id)) complete++;
}
counts.complete = complete;

const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
const topCats = sortedCats.slice(0, 9).map(([name, n]) => ({ name, n }));
const newLite = {
  total: counts.total,
  complete: counts.complete,
  images: counts.image,
  videos: counts.video,
  concepts: counts.concept,
  topCategories: topCats,
  categories: catCounts,
  version: 2,
  cleanedAt: new Date().toISOString()
};

// --- identify preview files to delete ---
const deleteFiles = new Set();
for (const c of cards) {
  if (keepSet.has(c.id)) continue;
  if (c.local_rel && c.local_rel.startsWith("assets/")) {
    deleteFiles.add(path.join(ROOT, c.local_rel));
  }
  if (c.poster_rel && c.poster_rel.startsWith("assets/")) {
    deleteFiles.add(path.join(ROOT, c.poster_rel));
  }
}
const fileList = Array.from(deleteFiles).filter((p) => fs.existsSync(p));
console.log("[cleanup] preview files to delete: " + fileList.length);

// --- identify text files to delete ---
const deleteText = new Set();
for (const id of removeIds) {
  const rel = textIdx[id];
  if (rel) deleteText.add(path.join(DATA, rel));
}
const textList = Array.from(deleteText).filter((p) => fs.existsSync(p));
console.log("[cleanup] text files to delete: " + textList.length);

// --- write data files ---
console.log("[cleanup] writing catalog-meta.json...");
writeJson(path.join(DATA, "catalog-meta.json"), newCards);

console.log("[cleanup] writing catalog-lite.json...");
writeJson(path.join(DATA, "catalog-lite.json"), newLite);

console.log("[cleanup] writing catalog-text-index.json...");
writeJson(path.join(DATA, "catalog-text-index.json"), newTextIdx);

console.log("[cleanup] writing catalog-details.json...");
writeJson(path.join(DATA, "catalog-details.json"), newDetails);

// --- regenerate catalog-text.json as a stripped prompt list ---
const textBundle = {};
for (const id of keepIds) {
  const rel = textIdx[id];
  if (!rel) continue;
  const abs = path.join(DATA, rel);
  if (!fs.existsSync(abs)) continue;
  textBundle[id] = fs.readFileSync(abs, "utf8").replace(/^\uFEFF/, "").trim();
}
console.log("[cleanup] writing catalog-text.json (" + Object.keys(textBundle).length + " entries)...");
fs.writeFileSync(path.join(DATA, "catalog-text.json"), JSON.stringify(textBundle));

// --- delete files ---
console.log("[cleanup] deleting " + fileList.length + " preview files...");
for (const p of fileList) {
  try { fs.unlinkSync(p); } catch (e) { console.warn("  fail " + p + " " + e.message); }
}
console.log("[cleanup] deleting " + textList.length + " text files...");
for (const p of textList) {
  try { fs.unlinkSync(p); } catch (e) { console.warn("  fail " + p + " " + e.message); }
}

console.log("[cleanup] done.  final: " + counts.total + " total / " + counts.image + " images / " + counts.video + " videos / " + counts.concept + " concepts / " + counts.complete + " complete");
