# Contributing to MotionSites Prompts

Thanks for helping grow this open catalog! The full pipeline runs in Node.js 18+ with no other dependencies.

## 1. Local setup

```bash
git clone https://github.com/<your-account>/motionsites-prompts.git
cd motionsites-prompts
node scripts/build.js       # regenerate index.html
start index.html            # (or `open` / `xdg-open` on macOS / Linux)
```

The build script:
- Loads `data/ms_prompts_merged.json` (metadata) and `data/ms_prompts_with_text.json` (full prompts)
- Enriches each record with a per-category colour palette + concept-art fallback
- Inlines everything into `ms_template.html` and emits `index.html`
- Self-verifies the output (parses the embedded JSON, checks the record count)

## 2. Add a new prompt

1. Drop a preview into `assets/previews/<your-id>.webp` (1600x1000 max, 16:10 ratio recommended).
2. Add a row to `data/ms_prompts_merged.json`:

   ```jsonc
   {
     "id": "my-new-prompt",
     "title": "My New Prompt",
     "category": "Landing Page",
     "type": "hero",
     "is_free": true,
     "description": "One-line description shown on the card.",
     "local_rel": "assets/previews/my-new-prompt.webp"
   }
   ```

3. Add a row to `data/ms_prompts_with_text.json`:

   ```jsonc
   {
     "id": "my-new-prompt",
     "prompt_text": "Full prompt body the user can copy."
   }
   ```

4. Run `node scripts/build.js` - the new card appears on the next page reload.
5. Commit `data/*.json`, the preview, and the regenerated `index.html`.

## 3. Fix a missing preview

If a card shows the placeholder art, the source likely had no preview image. You can:

- Upload a 1600x1000 webp to `assets/previews/<id>.webp` and set `local_rel` accordingly.
- Or leave the placeholder - the animated concept card already looks intentional.

## 4. Style / behaviour changes

- `ms_template.html` - HTML skeleton + CSS. Search for the relevant `/* === ... === */` block.
- `ms_script.js` - client-side render / filter / modal logic.
- After changing either, run `node scripts/build.js` to refresh `index.html`.

## 5. Deployment

The repo ships with `wrangler.toml`, `_headers`, and `_redirects`. Push to GitHub and connect the repo in the Cloudflare Pages dashboard; no build command is required because `index.html` is committed.

## 6. License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE). Prompt bodies you submit must be your own or fall under a compatible license - please credit the original author in the JSON if you are archiving a community-sourced prompt.


## 7. Reproducible maintenance pipeline

The repository ships with a tested pipeline that keeps `data/`, `assets/`, and `index.html` in sync:

```bash
node --test scripts/tests/*.test.js
node scripts/import-community.js       # dry-run; never writes
node scripts/audit-catalog.js
node scripts/build.js
```

`node scripts/import-community.js --write` is the only command that touches `data/ms_prompts_*.json` and downloads new previews. The local `sources/` cache used for research is **git-ignored** and never enters the public repository. Every community record carries `source_repo`, `source_path`, and `source_license` so its origin is verifiable in the rendered detail panel.

### Catalog sources

`data/catalog_sources.json` lists every external feed the catalog ingests from, with license and purpose. New sources must declare an explicit license and a research-only cache path under `sources/`.

The importer currently recognizes three ingest paths:

- `superdesigndev/superdesign-prompts` (CC0-1.0) — community prompt + preview picks.
- `akkikumar72/liro-prompts` (MIT) — fills paywall MotionSites records with the repository's `working-prompt.md` reconstructions when no original body is available. Filled records carry `text_reconstructed: true` for transparency.
- `giglianepefrei/motionsites.ai-prompt-library` (NOASSERTION) — free prompts from the public `prompts/` directory; preview videos are downloaded via `ensureGiglPreviewAssets`. The importer de-duplicates by normalized title so slug differences do not create duplicates.