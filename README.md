# MotionSites Prompts — A Curated Library of Motion-Driven UI

> An offline-first, single-file catalog of **364 motion-driven UI prompts** — landing pages, hero scenes, agency showcases, dashboards, and more. Browse, search, copy, and export every prompt locally. No login, no network call, no paywall.

![Catalog preview](docs/catalog_preview.png)

## What is inside

- **364 curated prompts** across Landing Page, Hero, SaaS, Agency, Portfolio, Web3, AI / Dashboard, Travel, Healthcare, Real Estate, and more
- **328 full prompt bodies** — copy to clipboard or export as a Markdown file
- **175 motion / static previews** + **74 looping video previews** (all downloaded locally)
- **110 concept cards** with curated per-category palettes and animated art (used when the source page has no preview)
- **Multi-dimensional filters**: category, type, access (open / premium), media format, plus top-9 category chips
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

Live URL after deploy: **https://motionsites-prompts.pages.dev** (custom domains can be added in the dashboard).

A custom domain like `motionsites.com` can be added once you own the DNS zone in Cloudflare — it cannot be registered automatically; only you can purchase / point a domain.

## Performance budget

Measured locally with Edge 138 in headless mode against `python -m http.server`:

| Metric | Value |
| --- | --- |
| First Contentful Paint | ~600 ms |
| DOMContentLoaded | ~1.5 s |
| Total transfer | 3.1 MB (gzipped by Cloudflare to ~700 KB) |
| Cards rendered | 364 |
| Console errors | 0 |

All preview media is `loading="lazy"`, the grid is built with `DocumentFragment`, and event delegation is used for clicks and image fallback — see `ms_script.js`.

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
|   |-- build.js                    # data/*.json + ms_template.html + ms_script.js -> index.html
|   |-- dump.js                     # (optional) re-crawl motionsites.ai for new metadata
|   |-- download.js                 # (optional) re-fetch all preview media
|   `-- helpers.js                  # (optional) shared HTTP / file helpers
|-- docs/                           # README screenshots
|-- CONTRIBUTING.md
`-- LICENSE                         # MIT
```

## Rebuild `index.html` from source

The shipped `index.html` is pre-generated, but you can regenerate it any time:

```bash
node scripts/build.js
# -> Records=364 complete=328 images=175 videos=74 concepts=110
# -> Wrote index.html bytes 3165581
# -> SELF-VERIFY OK records=364
```

The build merges `data/ms_prompts_merged.json` with `data/ms_prompts_with_text.json`, enriches each entry with a per-category colour palette, writes the assembled JSON into a `<script>` block inside `ms_template.html`, and emits the final `index.html`.

To update the catalog with new prompts:

1. Edit `data/ms_prompts_merged.json` (add a new record) and `data/ms_prompts_with_text.json` (add the matching `prompt_text`).
2. Drop a preview into `assets/previews/<id>.webp` and reference it via `local_rel` in the metadata.
3. Run `node scripts/build.js` and commit the regenerated `index.html`.

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
