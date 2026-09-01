# MotionSites Prompts — A Curated Library of Motion-Driven UI

> A progressively-loaded, **offline-first** catalog of **568 motion-driven UI prompts** — landing pages, hero scenes, agency showcases, dashboards, and more. Browse, search, copy, and export every prompt locally. **No login, no third-party tracking, no paywall, no external CDN at load time.**

## What is inside

- **568 curated prompts** (429 MotionSites main library + 139 community picks)
- **512 full prompt bodies** — copy to clipboard or export as a Markdown file
- **200 image previews** (static webp / png, 1280px q=85)
- **173 looping video previews** (mp4, ~140 KB each on average)
- **195 concept cards** with curated per-category palettes (when the source page has no preview)
- **Multi-dimensional filters**: category, type, source (MotionSites / Community), media format
- **Top-9 category chips** with live counts from the lite payload
- **Combined search** over title / description / prompt text / source repo / file path
- **Keyboard-first**: `/` focus search, `Esc` close modal, `G` toggle compact
- **Spotlight search**: when a query is active, a soft glow tracks the best matching card
- **Two card densities**: standard 16:10 grid and compact
- **Sticky hero** with brand mark, tagline, and live counters

![Catalog preview](docs/catalog_preview.png)

![Modal - full prompt](docs/catalog_prompt_detail.png)

---

## Live deployments

| URL | Hosting | Status |
|---|---|---|
| **https://motionsites-prompts.pages.dev/** | Cloudflare Pages (Direct Upload via wrangler) | Primary |
| **https://zhaosenlin12-creator.github.io/MotionSites/** | GitHub Pages (auto-deploy from `main`) | Backup |

**Both deployments serve the same static build** — same `index.html`, `ms_script.js`, `data/`, `assets/`. The only differences are the host header and cache TTL rules shipped via `_headers` (CF Pages) vs. GitHub Pages defaults.

### Why two deployments?

- **Cloudflare Pages** has its own edge CDN, respects `_headers` and `_redirects`, and serves a fresh build within ~30 seconds of `wrangler pages deploy`.
- **GitHub Pages** uses the Fastly CDN with default `max-age=600` cache. No `_headers` / `_redirects` support. Used as a redundant mirror so the project never depends on a single provider.

Cold-cache FCP on a typical broadband connection: **~140 ms** to first paint of the hero bar, **~280 ms** to first card preview rendered.

---

## Architecture (all local, zero external CDN)

The whole site is **~2 MB total** (1.6 MB compressed) and serves everything from the repo. **Zero `fetch()` calls go to any external domain at page load.**

### Request waterfall on cold cache

```
index.html                                ~33 KB   HTML + inline skeleton
  assets/fonts/fonts.css                   ~2 KB    11 @font-face rules
  assets/fonts/inter-400-n.woff2          ~48 KB   preloaded
  assets/fonts/fraunces-400-n.woff2       ~36 KB   preloaded
  ms_script.js?v=20260831v6               ~45 KB   defer
  data/catalog-lite.json?v=...            ~1 KB    header counters + chips
  data/catalog-meta.json?v=...            ~85 KB   568 cards
  data/catalog-text-index.json?v=...      ~12 KB   lazy on modal open
  assets/previews/<id>.{webp|mp4|png}     lazy via IntersectionObserver
```

All assets live in `assets/` and `data/`. No `<link rel="preconnect">` to third-party origins.

### Self-hosted fonts

Three fonts in use (Inter / Fraunces / JetBrains Mono). All 11 latin woff2 subsets served locally (`assets/fonts/`). No Google Fonts, no gstatic, no fonts.googleapis.com.

### Cache bust strategy

Every `data/*.json` fetch and `ms_script.js` request gets a `?v=20260831v6` query stamp injected at runtime so a fresh deploy forces a cache miss on returning browsers without a manual hard-reload.

---

## File layout

```
MotionSites/
|-- index.html                       Single-page entry (~33 KB)
|-- ms_script.js                    All JS: catalog, render, filters, modal (~45 KB)
|-- wrangler.toml                   Cloudflare Pages project config
|-- _headers                        CF-only: per-path Cache-Control rules
|-- _redirects                      CF-only: 301 rules for renamed assets
|
|-- data/                           Progressive JSON catalog
|   |-- catalog-lite.json           ~1 KB  counters, top categories
|   |-- catalog-meta.json           ~85 KB all 568 card entries
|   |-- catalog-details.json        ~190 KB per-card metadata (lazy)
|   |-- catalog-text-index.json     ~12 KB id -> .txt path map
|   |-- catalog-text.json           ~4.5 MB inline prompt bodies (legacy)
|   |-- catalog-text/<id>.txt       512 files one per card with text
|   |-- ms_prompts_merged.json      Build-time source (titles + categories)
|   |-- ms_prompts_with_text.json   Build-time source (full prompt bodies)
|
|-- assets/
|   |-- previews/<id>.{webp,mp4,png}     ~370 preview files (~1.2 GB total)
|   |-- community/superdesign/<dir>/     5 community-source mp4 previews
|   |-- fonts/{inter,fraunces,jetbrains-mono}-*.woff2  11 latin subsets
|
|-- scripts/                        Build / scrape / normalize / audit
|   |-- build.js                    Build catalog + index from sources
|   |-- import-community.js         Pull new prompts from community repos
|   |-- normalize-categories.js     Collapse synonyms to 58 canonical labels
|   |-- dedupe-catalog.js           Drop duplicate IDs after import
|   |-- audit-catalog.js            Count sanity (images+videos+concepts=total)
|   |-- download-gigl-previews.js   Fetch missing previews from giglianepefrei
|   |-- lib/category-utils.js       Frozen synonym map (145 entries)
|   |-- tests/category-utils.test.js  6 unit tests for the map
|
|-- deploy/
|   |-- deploy-wrangler.ps1         Cloudflare Pages direct upload
|   |-- deploy-cloudflare.ps1       Legacy Cloudflare API deploy (older)
|   |-- push-to-github.ps1          Push to origin/main with retry
|
|-- docs/                           Screenshots, perf logs, .log
|-- CHANGELOG.md                    Per-release change log (1.0.0 -> 1.1.8)
|-- CONTRIBUTING.md                 File format + build flow
|-- README.md                       This file
|-- LICENSE                         MIT
```

---

## Run it locally

Any static server works (no Node required to use the catalog):

```bash
git clone https://github.com/zhaosenlin12-creator/MotionSites.git
cd MotionSites
python -m http.server 8000
# or
npx serve .
# then visit http://localhost:8000
```

Note: opening `index.html` directly via `file://` works for the static HTML, but `fetch()` is blocked by browsers on `file://` URLs, so the catalog data will not load. Use a local server.

---

## Deploy

### Cloudflare Pages (primary)

The `wrangler.toml` points at the `motionsites-prompts` project on Cloudflare Pages with the repo root as the build output. Deployment is a single command:

```powershell
.\deploy\deploy-wrangler.ps1 -CommitHash <sha> -CommitMessage "msg"
```

The script stages the repo into a temp dir (excluding `.git`, `.wrangler`, `node_modules`, files >25 MiB) and runs `wrangler pages deploy`. After about 30 s the new version is live at `https://motionsites-prompts.pages.dev/`.

`_headers` ships with `/assets/* Cache-Control: public, max-age=31536000, immutable` so woff2 / webp / mp4 are long-lived. `_redirects` handles the one renamed asset (`website-builder.mp4` -> `.webp`) on CF Pages (GH Pages does not honor `_redirects`, so the in-repo mp4 stub handles it there instead).

### GitHub Pages (backup)

`main` is auto-deployed by the GitHub Pages integration. Each push typically surfaces within 1-3 minutes. Cache is the default `max-age=600` for all paths, which is why the JS / CSS use a `?v=YYYYMMDDvx` build stamp — when a fresh stamp ships, returning browsers pick it up on next visit.

GH Pages does not honor `_headers` / `_redirects`. We:
- Ship the renamed-asset stub (`assets/previews/website-builder.mp4` is a 2.1 KB 1-second h264 black frame) so any stale `.mp4` URL still returns a real video payload instead of bogus webp_pipe bytes.
- Put `?v=N` cache-bust stamps on `ms_script.js`, `fonts.css`, and the two preloaded woff2 URLs so users with cached assets see the new versions on next load.

### Push to GitHub

```powershell
git push origin main
```

The first push after a long offline stretch may take a few minutes if the commit touches a large number of binaries. If `git push` times out, retry with `git push origin main --no-thin`.

---

## Counts (live)

```
Total         568
With text     512   (has_text=true and text_len>0)
Images        200   (local_rel ends with .webp or .jpg)
Videos        173   (local_rel ends with .mp4)
Concepts      195   (no local_rel, no remote URL, show palette placeholder)
Motionsites   429   (source_kind=motionsites)
Community     139   (source_kind=community)
Motions       173   (=videos)
Categories    58    (collapsed from 105 raw labels)
```

The math always sums: `200 + 173 + 195 = 568` and `429 + 139 = 568`.

---

## Recent changes

| Version | Date | Highlights |
|---|---|---|
| 1.1.8 | 2026-09-01 | Fix `fonts.css` nested-path bug (all 11 woff2 404); convert 153 `webp_anim` cards to static webp (browser `<img>` first-frame black-screen issue); rename `jetbrains mono` files (no-space URL). |
| 1.1.7 | 2026-08-31 | Self-host Google Fonts (11 latin woff2, 427 KB total); drop the last external CDN dependency at load time. |
| 1.1.6 | 2026-08-31 | Wire 8 missing previews (3 webp/png images + 5 community mp4s); catalog counts 200/173/195. |
| 1.1.5 | 2026-08-31 | Wire `poster_rel` into `<video poster>` (mp4 cards now show webp thumbnail on hover); bump `?v=` cache-bust. |
| 1.1.4 | 2026-08-31 | Fix `website-builder.mp4` misclassification (was webp); restore 11 stale `has_text` flags; re-add `community-superdesign-the-stacking-cards-effect`. |
| 1.1.3 | 2026-08-31 | Prune 11 dead-end cards (no preview, no text). |
| 1.1.2 | 2026-08-31 | Sync 75 new prompts from motionsites.ai. |
| 1.1.1 | 2026-08-31 | Replace hardcoded header counters with live catalog-lite values. |
| 1.1.0 | 2026-08-31 | Cache-bust + i18n (zh-CN / en) switch + per-language labels. |
| 1.0.0 | 2026-08-08 | First stable release: 504 curated prompts across MotionSites + community sources. |

See [CHANGELOG.md](CHANGELOG.md) for the full per-commit log.

---

## Data provenance

| Field | Source |
|---|---|
| Title, description, category, type | `motionsites.ai` public catalog (HTTP scrape, never the paywall) |
| Full prompt body | `motionsites.ai` recovery + 4 community GitHub repos: `xianxian-sensen`, `Melectrona`, `akkikumar72/liro-prompts`, `giglianepefrei`, `superdesigndev/superdesign-prompts` |
| Preview media | Downloaded once from `motionsites.ai` CDN (R2 / CloudFront / higgs.ai / Dribbble) and bundled locally. No runtime fetch to any third party. |

The original `motionsites.ai` paywall is **not** bypassed. Records without a recoverable body or preview surface as concept cards with palette placeholders and a deep link to the source.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the file format, build flow, and the ten-minute path to your first PR.

---

## License

[MIT](LICENSE) — free to use, modify, and redistribute. Each individual prompt body retains its original author's copyright; this repository only archives and indexes them.