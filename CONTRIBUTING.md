# Contributing to MotionSites Prompts

Thanks for helping grow this open catalog! New prompts are very welcome.

## 1. Quick start

```bash
git clone https://github.com/zhaosenlin12-creator/MotionSites-Prompts.git
cd MotionSites-Prompts
# Windows
start templates\starter.html
# macOS
open templates/starter.html
# Linux
xdg-open templates/starter.html
```

No build step. The repo is a plain tree of Markdown + HTML + SVG.

## 2. Add a new prompt

1. Copy `prompts/_TEMPLATE.md` to `prompts/<category>/NNN-<short-name>.md`.
   - `<category>` is one of: `landing`, `hero`, `saas`, `agency`, `dashboard`, `portfolio`, `web3`, `travel`, `healthcare`, `realestate`, `ai`.
   - `<NNN>` is the next available zero-padded number in that category.
2. Fill the front-matter (`id`, `title`, `category`, `type`, `access`, `tags`, `palette`, `created`).
3. Write the **prompt body** in the `## Prompt` code block — at least 80 words, self-contained, copy-pasteable into any LLM.
4. Drop a preview into `docs/screenshots/<id>.svg` (or a WebP / MP4 if you can).
5. Append the same record to `docs/catalog.json` (both in `categories` and in `prompts`).
6. Open a PR with a title like `[prompt] hero: My new prompt title`.

## 3. Style guide

- **Tone**: descriptive, second-person, instructional. Imagine you're briefing a junior front-end engineer.
- **Length**: 80–250 words for the prompt body. Shorter is fine for tightly-scoped components.
- **Specifics**: include colors (hex), easing curves, timings, fonts, and exact selectors / class names.
- **Constraints**: call out browser support, `prefers-reduced-motion`, and performance tips in `## Notes`.
- **No private / paywalled assets** in the previews — keep everything self-contained.

## 4. Validation (planned)

A future `scripts/validate.js` will check:

- All `prompts/**/*.md` have valid YAML front-matter.
- Every `id` is unique across the repo.
- Every entry in `docs/catalog.json` references an existing file.
- Every `preview` path resolves to an existing file in `docs/screenshots/`.

PRs that fail validation will not be merged. Until the script lands, please run the equivalent checks manually.

## 5. Adding a category

If you need a new category not in the list above:

1. Add the category to `prompts/_TEMPLATE.md` under `category:`.
2. Open an issue first to discuss — categories affect the URL paths and the catalog header.

## 6. Code of conduct

This project follows the spirit of the [Contributor Covenant](https://www.contributor-covenant.org/). Be kind, be patient, and focus on the work.

## 7. License

By submitting a PR, you agree that your contribution is MIT-licensed (matching this repo). If you are re-publishing prompts originally written by someone else, please credit them in the `## Source` block.
