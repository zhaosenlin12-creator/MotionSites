# MotionSites Prompts

A curated, offline-first library of **968 motion-driven UI resources** — landing pages, hero scenes, dashboards, pricing pages, portfolios and 3D showcases. Every card ships a locally stored preview **and its complete prompt**, so you can browse it, copy it, and build from it without an account.

No login. No third-party tracking. No external CDN at load time.

---

## What's inside

| | |
|---|---|
| Resources | **968** |
| Full prompts | **968** (every card has one) |
| Image previews | 844 (webp / png / jpg) |
| Video previews | 124 (mp4 loops) |
| Categories | 62 |
| Total media | ~110 MB, all served from this repository |

- **Preview + prompt on every card** — open a card, read the whole prompt, copy it, or export it as Markdown
- **Filters** for category, type, format and media kind
- **Search** across title, description, prompt text and tags
- **Keyboard first**: `/` focus search, `Esc` close, `G` toggle density
- **Bilingual UI** (中文 / English)

---

## Run it locally

Any static server works — nothing to install:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open <http://localhost:8000>.

> Opening `index.html` directly through `file://` renders the shell but the browser blocks `fetch()`, so the catalogue will not load. Use a server.

---

## Rebuild the catalogue

Node 18+ only, no dependencies:

```bash
node scripts/build.js          # data/*.json + index.html
node scripts/audit-catalog.js  # counts, bodies, assets, orphans
node scripts/verify-assets.js  # every preview file: exists, size, magic bytes
node --test scripts/tests/*.test.js
```

The build is deterministic: running it twice on an unchanged tree produces byte-identical output.

To add a card, append a record to `data/ms_prompts_merged.json` **and** its body to `data/ms_prompts_with_text.json` (same `id`), drop a preview into `assets/previews/<id>.webp`, then rebuild.

---

## Project layout

```
index.html              Built page (generated — do not edit)
ms_template.html        Page shell + CSS; build.js renders it into index.html
ms_script.js            All client JS: catalogue, filters, modal
data/                   Catalog JSON (meta, bodies, text index, sources)
data/catalog-text/      One .txt per card, lazy-loaded by the modal
assets/previews/        Local preview media (webp / mp4)
assets/fonts/           Self-hosted woff2 subsets
scripts/                Build, audit, verify, tests
deploy/                 Cloudflare Pages + GitHub Pages helpers
archive/                One-off importers kept for reference
```

---

## Deploy

**Cloudflare Pages** (primary, `motionsites-prompts.pages.dev`):

```powershell
$env:CLOUDFLARE_API_TOKEN = "<token with Pages:Edit>"
.\deploy\deploy-wrangler.ps1 -CommitHash <sha> -CommitMessage "release" -Branch master
```

`-Branch master` matters: it is the project's production branch. Any other branch name only produces a
preview URL.

**GitHub Pages** (mirror, `zhaosenlin12-creator.github.io/MotionSites`) publishes automatically from `main`.

---

## Verify a deployment

```bash
python scripts/verify_live_sample.py --base https://motionsites-prompts.pages.dev/ --n 60
python scripts/_probe_live_resource_only.py https://motionsites-prompts.pages.dev/
```

The first samples previews and decodes each one; the second checks the card count, the badges and that a
modal returns a prompt body.

---

## License

[MIT](LICENSE) for the code and the catalogue structure. Each resource keeps its own author's rights.
