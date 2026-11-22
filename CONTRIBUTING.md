# Contributing to MotionSites Prompts

Thanks for helping grow this open catalog! The full pipeline runs in Node.js 18+ with no other dependencies. Rendering new recipe previews additionally needs Python 3.10+, Playwright (Chromium) and ffmpeg.

## 1. Local setup

```bash
git clone https://github.com/zhaosenlin12-creator/MotionSites.git
cd MotionSites
node scripts/build.js       # regenerate data/catalog-*.json + index.html
python -m http.server 8000  # then open http://localhost:8000
```

The build script:

- Loads `data/ms_prompts_merged.json` (metadata records) and `data/ms_prompts_with_text.json` (prompt bodies)
- Folds in `data/recipe_pack.json` (the curated replication-recipe pack)
- Publishes only records that have a local preview **and** a non-empty prompt body, then sorts by `sort_order` (stable for ties, so curated order is preserved)
- Writes `data/catalog-lite.json`, `catalog-meta.json`, `catalog-text.json`, `catalog-text-index.json` and one `catalog-text/<id>.txt` per card
- Renders `index.html` from `ms_template.html`, injecting the `BUILD_STAMP` cache-bust version
- Asserts its own invariants (media counters add up, every body exists, every preview file exists) and fails loudly if a card is broken

A second run on an unchanged tree is byte-identical — that is the reproducibility contract.

## 2. Add a new catalog prompt

1. Drop a preview into `assets/previews/<your-id>.{webp|mp4}` (16:10 ratio recommended; mp4 should loop under 24 MiB).
2. Add a metadata record to `data/ms_prompts_merged.json`:

   ```jsonc
   {
     "id": "my-new-prompt",
     "title": "My New Prompt",
     "category": "Landing Page",
     "type": "hero",
     "is_free": true,
     "description": "One-line description shown on the card.",
     "local_rel": "assets/previews/my-new-prompt.webp",
     "sort_order": 250
   }
   ```

3. Add the body to `data/ms_prompts_with_text.json`:

   ```jsonc
   { "id": "my-new-prompt", "prompt_text": "Full prompt body the user can copy." }
   ```

4. Run `node scripts/build.js` — the card appears on the next page reload.
5. Commit `data/*.json`, the preview and the regenerated `index.html`.

## 3. Add a replication recipe (new in 1.2.0)

Recipes live in `data/recipe_pack.json` instead of the scrape sources. Each record looks like:

```jsonc
{
  "id": "re-15-my-recipe",
  "title": "My Recipe",
  "description": "One-line Chinese description (<= 60 chars).",
  "category": "Replication Recipes",
  "type": "playbook",                       // hero | section | full-page | component | playbook
  "tags": ["cdp", "timeline", "easing"],
  "palette": ["#0e0e11", "#23232b", "#ff6b6b", "#f4f4f5"],
  "prompt": "140–320 word paste-ready English prompt …",
  "notes": ["2–3 implementation callouts"],
  "demo": { "style": "timeline", "t1": "TIMELINE", "kind": "GSAP", "meta": "ScrollTrigger", "variant": "" },
  "source": { "pack": "rea", "repo": "morluto/rea", "url": "https://github.com/morluto/rea", "license": "MIT", "ref": "docs/guide" },
  "sort_order": -999
}
```

Then:

```bash
python scripts/render_recipe_previews.py --ids re-15-my-recipe   # writes assets/previews/<id>.{mp4,webp}
node scripts/build.js
node scripts/build_recipe_docs.js                                 # regenerates docs/recipe-pack.md
node --test scripts/tests/recipe-pack.test.js
```

`demo.style` picks one of the archetypes in `scripts/recipe_demo.js` (`teardown`, `hero`, `tokens`, `materials`, `timeline`, `bezier`, `timing`, `matrix`, `scrollmap`, `stack`, `pointer`, `scene`, `svgdraw`, `reveal`, `states`, `responsive`, `report`, `diff`, `micro`, `phases`, `filmstrip`, `marquee`, `textfx`, `shader`, `transition`, `bento`, `gallery`, `tilt`, `trail`). Demos must stay pure HTML/CSS so `window.__seek(ms)` can freeze them deterministically. Use a negative `sort_order` to pin a new card above the scraped catalog.

## 4. Fix a missing preview

If a card renders as the palette placeholder, the file referenced by `local_rel` is missing or over the 24 MiB limit — `node scripts/build.js` lists the exact card. Add the asset, or delete the record from the source files; the build refuses to publish a card without a preview.

## 5. Style / behaviour changes

- `ms_template.html` — HTML shell + CSS. Search for `/* === ... === */` blocks. `index.html` is generated, never edit it by hand.
- `ms_script.js` — client-side render / filter / modal logic.
- After changing either, run `node scripts/build.js` to refresh `index.html`.

## 6. Deployment

The repo ships with `wrangler.toml`, `_headers`, and `_redirects`. Push to GitHub and connect the repo in the Cloudflare Pages dashboard; no build command is required because `index.html` is committed.

## 7. License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE). Prompt bodies you submit must be your own or fall under a compatible license — please credit the original author in the record if you are archiving a community-sourced prompt.

## 8. Reproducible maintenance pipeline

The repository ships with a tested pipeline that keeps `data/`, `assets/`, and `index.html` in sync:

```bash
node --test scripts/tests/*.test.js
node scripts/import-community.js       # dry-run; never writes
node scripts/audit-catalog.js          # counts, bodies, provenance, orphan assets
node scripts/build.js
node scripts/build_recipe_docs.js      # docs/recipe-pack.md
python scripts/validate_catalog.py     # optional: v1 markdown library check
```

`node scripts/import-community.js --write` is the only command that touches `data/ms_prompts_*.json` and downloads new previews. The local `sources/` cache used for research is **git-ignored** and never enters the public repository. Every community record carries `source_repo`, `source_path`, and `source_license` so its origin is verifiable in the rendered detail panel.

Note: `scripts/tests/import-liro.test.js` requires the git-ignored `sources/akkikumar72/liro-prompts` cache; those four tests fail on a fresh clone by design.

### Catalog sources

`data/catalog_sources.json` lists every external feed the catalog ingests from, with license and purpose. New sources must declare an explicit license and a research-only cache path under `sources/`.

The importer recognizes three ingest paths:

- `superdesigndev/superdesign-prompts` (CC0-1.0) — community prompt + preview picks.
- `akkikumar72/liro-prompts` (MIT) — fills paywall MotionSites records with the repository's `working-prompt.md` reconstructions when no original body is available. Filled records carry `text_reconstructed: true` for transparency.
- `giglianepefrei/motionsites.ai-prompt-library` (NOASSERTION) — free prompts from the public `prompts/` directory; preview videos are downloaded via `ensureGiglPreviewAssets`. The importer de-duplicates by normalized title so slug differences do not create duplicates.

The recipe pack is not an import feed: its prompts are original syntheses written for this catalog, attributed per record to the repository or library whose method they encode (`morluto/rea` MIT, `storytold/craft-anything` Apache-2.0, MIT component libraries per [docs/recipe-pack.md](docs/recipe-pack.md)).
