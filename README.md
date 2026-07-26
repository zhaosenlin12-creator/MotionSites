# MotionSites Prompts — A Curated Library of Motion-Driven UI


## 🚀 在线浏览（Live Site）

👉 **https://motionsites-prompts.pages.dev/**

已经部署到 Cloudflare Pages，公网可直接访问 505 条提示词、466 条完整正文、306 张预览、87 个循环视频。无需登录、无需付费、无网络调用，打开即用。

> 备用入口：在浏览器里把上面的链接粘进去即可。如需本地运行，请看下面的 *Run it locally* 章节；要重新部署，请看 *Push to GitHub & Deploy* 章节。

> An offline-first, single-file catalog of **505 motion-driven UI prompts** — landing pages, hero scenes, agency showcases, dashboards, and more. Browse, search, copy, and export every prompt locally. No login, no network call, no paywall.

> The catalog combines **365 MotionSites main-library entries** (with rich previews and video) and **140 community-picked prompts** sourced from public CC0-licensed GitHub repositories. Every community record keeps its source repository, file path, and license in the detail panel.

![Catalog preview](docs/catalog_preview.png)

## What is inside

- **505 curated prompts** (365 MotionSites main library + 140 community picks) across Landing Page, Hero, SaaS, Agency, Portfolio, Web3, AI / Dashboard, Travel, Healthcare, Real Estate, and more
- **466 full prompt bodies** (165 MotionSites + 301 community) — copy to clipboard or export as a Markdown file
- **306 motion / static previews** + **87 looping video previews** (all downloaded locally)
- **112 concept cards** with curated per-category palettes and animated art (used when the source page has no preview)
- **Multi-dimensional filters**: category, type, source (MotionSites / Community), media format, plus top-9 category chips and combined search over the source repository / file path
- **Keyboard-first**: `/` focus search, `Esc` close modal, `G` toggle compact
- **Spotlight search**: when a query is active, a soft glow tracks the best matching card
- **Two card densities**: standard 16:10 grid and compact
- **Sticky hero** with brand mark, tagline and live stats

![Modal - full prompt](docs/catalog_prompt_detail.png)

## Run it locally

The entire catalog is a single static file. You can open it directly from disk:

```bash
git clone https://github.com/<your-account>/motionsites-prompts.git
cd motionsites-prompts
# Windows
start index.html
# macOS
open index.html
# Linux
xdg-open index.html
```

...or serve it with any static server (no Node required to use the catalog):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Cloudflare Pages

### 当前线上版本

**项目名：** `motionsites-prompts`  
**线上地址：** https://motionsites-prompts.pages.dev/  
**部署方式：** Cloudflare Pages（Direct Upload）  
**仓库地址：** https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git

> 上面的 *Live Site* 区块和这里指向的是同一个部署。任何 PR 合并到 `master` 后，只需运行 `.\deploy\deploy-cloudflare.ps1` 即可刷新线上版本（详见 *Push to GitHub & Deploy*）。


This project is a pure-static site — it deploys in under a minute.

### One-time setup

1. Push the repo to GitHub (see *Contributing* below for the file layout).
2. Visit the Cloudflare Pages dashboard and create a project (Direct Upload or connect the GitHub repo).
3. Build settings:
   - **Build command** — leave empty (or `node scripts/build.js` if you want to regenerate `index.html` from `data/`)
   - **Build output directory** — `/` (project root)
4. Cloudflare auto-detects the included `wrangler.toml`, `_headers`, and `_redirects`.
5. After deploy, your site is live at `https://<project>.pages.dev` (custom domain optional).

### What `_headers` ships with

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

All preview assets are content-stable at build time, so the year-long cache is safe.

![Search spotlight](docs/catalog_search_spotlight.png)

![Placeholder card detail](docs/catalog_placeholder_detail.png)

## Push to GitHub & Deploy

The repo ships with two one-shot PowerShell helpers under `deploy/`:

### 1) Push to GitHub

```powershell
# From the project root
.\deploy\push-to-github.ps1
# You will be prompted for a Personal Access Token.
# Use a token with `repo` scope at https://github.com/settings/tokens
```

Or set it via env var to skip the prompt:

```powershell
$env:GH_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"
.\deploy\push-to-github.ps1
```

This pushes the local `master` branch to
`https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git`.

### 2) Deploy to Cloudflare Pages

```powershell
# One-time: create the project in the dashboard
#   https://dash.cloudflare.com/?to=/:account/pages/new
#   Project name:  motionsites-prompts
#   Build command: (leave empty)
#   Build output:  /
# Then grab your Account ID + an API token with `Edit Cloudflare Pages` scope.

.\deploy\deploy-cloudflare.ps1
```


### Alternative: deploy via Wrangler (Direct Upload)

If `wrangler` is already authenticated (e.g. via `wrangler login`), prefer `deploy-wrangler.ps1`. It stages a clean upload tree, skips files over 25 MiB, and pushes via `wrangler pages deploy`:

```powershell
.\deploy\deploy-wrangler.ps1
# or with explicit commit metadata:
.\deploy\deploy-wrangler.ps1 -CommitHash <sha> -CommitMessage "<msg>"
```

Live URL after deploy: **https://motionsites-prompts.pages.dev** (custom domains can be added in the dashboard).

A custom domain like `motionsites.com` can be added once you own the DNS zone in Cloudflare — it cannot be registered automatically; only you can purchase / point a domain.

## Performance budget

Measured locally with Edge 138 in headless mode against `python -m http.server`:

| Metric | Value |
| --- | --- |
| First Contentful Paint | ~700 ms |
| DOMContentLoaded | ~1.7 s |
| Total transfer | 3.2 MB (gzipped by Cloudflare to ~720 KB) |
| Cards rendered | 364 |
| Console errors | 0 |

All preview media is `loading="lazy"`, the grid is built with `DocumentFragment`, and event delegation is used for clicks and image fallback — see `ms_script.js`.


## Live audit (2026-07-24)

Re-verified on the deployed `motionsites-prompts.pages.dev` site:

| Check | Result |
| --- | --- |
| HTTP status of `/` | 200 (text/html) |
| Static previews (webp) | 200 (image/webp) |
| Video previews (mp4) | 200 (video/mp4) |
| `data/*.json` Content-Type | 200 (application/json via `_headers` rule) |
| Console errors on `/` | 0 |
| Cards without `local_rel` (concepts) | 110 (rendered as animated concept cards) |
| Cards with full prompt body | 328 |
| Over-limit previews (> 24 MiB) | 1 (auto-demoted to concept card at build time) |

### 25 MiB file cap and `fun-404-page.webp`

Cloudflare Pages silently replaces any single file larger than 25 MiB with an HTML error page (HTTP 200 but `Content-Type: text/html`). `assets/previews/fun-404-page.webp` (43.99 MiB) is one such file - it is in fact a 1920x1080 MP4 in a `.webp` wrapper. The build script (`scripts/build.js`) now detects any `local_rel` larger than 24 MiB and demotes the record to a concept card, so the deployed site never references a file the host will break. To re-enable the original video, transcode it under 25 MiB with `ffmpeg` (e.g. `-crf 28 -preset slow -movflags +faststart`) and re-run the build.

### Entries without a published prompt body

110 of the 364 records come from the motionsites.ai public catalog, which only exposes the title / description / category - the full prompt body is paywalled. These records now render an in-modal **metadata panel** instead of a single placeholder line, surfacing `created_at`, `page_type`, `sort_order`, `local_kind`, `text_len`, plus deep links to the original motion preview image, video and the motionsites.ai source page.

## File layout

```
.
|-- index.html              # 3.2 MB self-contained catalog (open this)
|-- ms_template.html        # HTML skeleton (head + body + placeholders)
|-- ms_script.js            # Client-side render / filter / modal logic
|-- wrangler.toml           # Cloudflare Pages config
|-- _headers                # Cache + security headers (Cloudflare)
|-- _redirects              # Static-site routing (none used)
|-- data/
|   |-- ms_prompts_merged.json     # 235 KB - metadata (titles, categories, image URLs)
|   `-- ms_prompts_with_text.json  # 3.1 MB - full prompt bodies
|-- assets/
|   |-- previews/                   # 246 webp / mp4 previews
|   `-- thumbnails/                 # 55 webp thumbnails
|-- scripts/
|   `-- build.js                    # data/*.json + ms_template.html + ms_script.js -> index.html
|-- docs/                           # README screenshots
|-- CONTRIBUTING.md
`-- LICENSE                         # MIT
|-- docs/                           # README screenshots
|-- CONTRIBUTING.md
`-- LICENSE                         # MIT
```

## Rebuild `index.html` from source

The shipped `index.html` is pre-generated, but you can regenerate it any time:

```bash
node scripts/build.js
# -> Records=364 complete=328 images=175 videos=73 concepts=111
# -> Wrote index.html bytes 3186593
# -> [build] demoting over-limit preview fun-404-page 43.99MiB
# -> SELF-VERIFY OK records=364
```

The build merges `data/ms_prompts_merged.json` with `data/ms_prompts_with_text.json`, enriches each entry with a per-category colour palette, writes the assembled JSON into a `<script>` block inside `ms_template.html`, and emits the final `index.html`.

To update the catalog with new prompts:

1. Edit `data/ms_prompts_merged.json` (add a new record) and `data/ms_prompts_with_text.json` (add the matching `prompt_text`).
2. Drop a preview into `assets/previews/<id>.webp` and reference it via `local_rel` in the metadata.
3. Run `node scripts/build.js` and commit the regenerated `index.html`.

## Extending the catalog

The shipped 364 prompts come from these sources (see `data/ms_prompts_merged.json`):

| Source | Records | Notes |
| --- | --- | --- |
| [motionsites.ai](https://motionsites.ai) | 110 (concepts only, no previews) | Title + description + category scraped from the public catalog; no previews were reachable from the public CDN |
| [xianxian-sensen](https://github.com/xianxian-sensen) | 109 | Hero / SaaS sections with React/Tailwind recipes |
| [Melectrona](https://github.com/Melectrona) | 84 | Landing pages with copy + CSS gradients |
| [akkikumar72/liro-prompts](https://github.com/akkikumar72/liro-prompts) | 40 | Liro prompts (long-form Markdown) |
| [giglianepefrei](https://github.com/giglianepefrei) | 21 | Hero / agency sections |

The build script (`scripts/build.js`) merges `data/ms_prompts_merged.json` with `data/ms_prompts_with_text.json`, enriches each entry with a per-category colour palette, then emits `index.html`. To add new prompts:

1. Append a record to **both** JSON files with the same `id`.
2. Drop a preview into `assets/previews/<id>.webp` (and reference it as `local_rel`).
3. Re-run `node scripts/build.js`.
4. Commit and push.

Potential future sources worth scraping (compatible with the same schema):

- [ui.aceternity.com](https://ui.aceternity.com) and other open UI registries
- Public prompts under the `ui-motion` and `landing-page` GitHub topics
- The user's own collected repos (drop your `.md` files into a folder named after the GitHub user)

The build script is idempotent: re-running it does not duplicate records. Duplicates are deduped by `id`.

## Data provenance

| Field | Source |
| --- | --- |
| Title, description, category, type, access, image URLs | `motionsites.ai` public catalog (Supabase anon read of `prompts` view) |
| Full prompt body | Curated 4 community-maintained GitHub repositories: `xianxian-sensen`, `Melectrona`, `akkikumar72/liro-prompts`, `giglianepefrei` |
| Preview media | `motionsites.ai` CDN (R2 / CloudFront / higgs.ai) - downloaded once and bundled |

The original `motionsites.ai` paywall is not bypassed. The 110 entries without a `local_rel` are surfaced as animated concept cards with curated per-category palettes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the file format, build flow, and the ten-minute path to your first PR.

## License

[MIT](LICENSE) - free to use, modify, and redistribute. Each individual prompt body retains its original author's copyright; this repository only archives and indexes them.






