// scripts/build.js - Progressive build (v2)
//
// Splits the catalog into three JSON files instead of inlining a single
// 4.5 MB JSON blob into index.html.
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const { sortCatalog } = require("./lib/catalog-utils");

const ROOT = path.resolve(__dirname, "..");
const MAX_PREVIEW_BYTES = 24 * 1024 * 1024;

function readNoBom(p) { let buf = fs.readFileSync(p); if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) buf = buf.subarray(3); return buf.toString("utf8"); }

function detectKind(abs) {
  try {
    const b = fs.readFileSync(abs).subarray(0, 16);
    const sig = b.toString("latin1");
    if (sig.startsWith("RIFF") && sig.includes("WEBP")) return "webp";
    if (sig.startsWith("#EXTM3U")) return "hls";
    if (b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return "webm";
    if (b.subarray(4, 8).toString() === "ftyp") return "mp4";
    if (b[0] === 0x47) return "gif";
    if (b[0] === 0x89) return "png";
    if (b[0] === 0xff) return "jpeg";
    const ext = path.extname(abs).toLowerCase();
    if (ext === ".webm") return "webm";
    if (ext === ".m3u8") return "hls";
    if (ext === ".mp4" || ext === ".mov" || ext === ".m4v") return "mp4";
    if (ext === ".webp") return "webp";
    if (ext === ".gif") return "gif";
    if (ext === ".png") return "png";
    if (ext === ".jpg" || ext === ".jpeg") return "jpeg";
  } catch (e) {}
  return "other";
}

function enrich(rec) {
  const o = Object.assign({}, rec);
  if (rec.local_rel) {
    function locAbs(p) {
      if (!p) return null;
      const a = path.join(ROOT, p);
      if (fs.existsSync(a)) return a;
      const b = path.join(ROOT, p.replace(/^assets\//, "assets/"));
      if (fs.existsSync(b)) return b;
      return a;
    }
    const abs = locAbs(rec.local_rel);
    if (abs && fs.existsSync(abs)) {
      const stat = fs.statSync(abs);
      if (stat.size > MAX_PREVIEW_BYTES) {
        console.warn("[build] demoting over-limit preview", rec.id, (stat.size / 1048576).toFixed(2) + "MiB");
        o.local_rel = null;
        o.local_kind = "other";
        o.size_bytes = stat.size;
      } else {
        o.local_kind = detectKind(abs);
        o.size_bytes = stat.size;
      }
    } else {
      o.local_kind = "other";
    }
  }
  return o;
}

// ---- Load source data ----
const mergedRaw = JSON.parse(readNoBom(path.join(ROOT, "data", "ms_prompts_merged.json")));
const merged = mergedRaw.map(function (x) { if (x.local_rel && x.local_rel.startsWith("assets/")) x.local_rel = x.local_rel.replace(/^motionsites_assets\//, "assets/"); return x; });

const t1 = JSON.parse(readNoBom(path.join(ROOT, "data", "ms_prompts_with_text.json")));
const t1map = new Map(t1.map(function (x) { return [x.id, x.prompt_text || ""]; }));

const root2 = path.join(ROOT, "sources", "akkikumar72", "liro-prompts");
if (fs.existsSync(root2)) {
  for (const dir of fs.readdirSync(root2)) {
    if (dir.toLowerCase() === "index.md") continue;
    const mp = path.join(root2, dir, "metadata.json");
    if (!fs.existsSync(mp)) continue;
    let m;
    try { m = JSON.parse(readNoBom(mp)).record; } catch (e) { continue; }
    if (!m || !m.id) continue;
    if (!t1map.has(m.id)) {
      const wp = path.join(root2, dir, "working-prompt.md");
      if (fs.existsSync(wp)) {
        const wk = readNoBom(wp);
        const idx = wk.indexOf("## Prompt");
        const body = idx < 0 ? wk : wk.slice(idx + "## Prompt".length).replace(/```[a-z]*\n([\s\S]*?)\n```/g, "$1").trim();
        if (body.length > 200) t1map.set(m.id, body);
      }
    }
  }
}

const sortedMeta = sortCatalog(merged);
const prompts = sortedMeta.map(function (x) { return Object.assign({}, x, { prompt_text: t1map.get(x.id) || "" }); });
const enriched = prompts.map(enrich);

const complete = enriched.filter(function (x) { return x.prompt_text && x.prompt_text.trim(); }).length;
const images = enriched.filter(function (x) { return x.local_kind === "webp" || x.local_kind === "gif" || x.local_kind === "png" || x.local_kind === "jpeg"; }).length;
const videos = enriched.filter(function (x) { return x.local_kind === "mp4" || x.local_kind === "webm" || x.local_kind === "hls"; }).length;
const noMedia = enriched.filter(function (x) { return !x.local_rel; }).length;
const community = enriched.filter(function (x) { return x.source_kind === "community"; }).length;
const motionsites = enriched.filter(function (x) { return (x.source_kind || "motionsites") === "motionsites"; }).length;
console.log("Records=" + enriched.length + " complete=" + complete + " images=" + images + " videos=" + videos + " concepts=" + noMedia + " motionsites=" + motionsites + " community=" + community);

// ---- Build the three progressive JSON files ----
const counts = {};
for (const r of enriched) counts[r.category] = (counts[r.category] || 0) + 1;
const topCats = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 9).map(function (c) { return { category: c[0], count: c[1] }; });
const lite = { total: enriched.length, complete: complete, images: images, videos: videos, concepts: noMedia, motionsites: motionsites, community: community, topCategories: topCats, categories: counts, version: 2 };

const meta = enriched.map(function (r) { const o = {}; for (const k of Object.keys(r)) { if (k === "prompt_text") continue; o[k] = r[k]; } return o; });

const textMap = {};
for (const r of enriched) { if (r.prompt_text && r.prompt_text.trim()) textMap[r.id] = r.prompt_text; }

const dataDir = path.join(ROOT, "data");
fs.mkdirSync(dataDir, { recursive: true });

function writeJsonGz(name, obj) {
  const s = JSON.stringify(obj);
  const jsonPath = path.join(dataDir, name + ".json");
  const gzPath = path.join(dataDir, name + ".json.gz");
  fs.writeFileSync(jsonPath, s, "utf8");
  fs.writeFileSync(gzPath, zlib.gzipSync(Buffer.from(s, "utf8"), { level: 9 }));
  console.log("Wrote " + name + ".json  " + (s.length / 1024).toFixed(1) + " KB  (gzip " + (fs.statSync(gzPath).size / 1024).toFixed(1) + " KB)");
}

writeJsonGz("catalog-lite", lite);
writeJsonGz("catalog-meta", meta);
writeJsonGz("catalog-text", textMap);

// ---- Per-id prompt files (so detail-modal fetches one body, not the whole file) ----
const txtDir = path.join(dataDir, "catalog-text");
fs.mkdirSync(txtDir, { recursive: true });
const txtIndex = {};
for (const id of Object.keys(textMap)) {
  const safe = id.replace(/[^a-zA-Z0-9._-]/g, "_");
  fs.writeFileSync(path.join(txtDir, safe + ".txt"), textMap[id], "utf8");
  txtIndex[id] = "catalog-text/" + safe + ".txt";
}
fs.writeFileSync(path.join(dataDir, "catalog-text-index.json"), JSON.stringify(txtIndex), "utf8");
console.log("Wrote catalog-text/  " + Object.keys(txtIndex).length + " files");

// ---- Generate index.html (no inlined DATA) ----
let html = readNoBom(path.join(ROOT, "ms_template.html"));
const rpl = function (s) { return function () { return s; }; };
html = html.replace("$" + "{enriched.length}", rpl(String(enriched.length))).replace("$" + "{complete}", rpl(String(complete))).replace("$" + "{images}", rpl(String(images))).replace("$" + "{videos}", rpl(String(videos))).replace("$" + "{noMedia}", rpl(String(noMedia))).replace("<script>__SCRIPT_BODY__</script>", rpl("<script src=\"ms_script.js\" defer></script>"));

const outPath = path.join(ROOT, "index.html");
fs.writeFileSync(outPath, html, "utf8");
console.log("Wrote " + outPath + " bytes " + html.length);
