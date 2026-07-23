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
