# Contributing

Thanks for helping grow the library. Everything runs on Node 18+ with no dependencies.

## The shape of a card

A card is two records with the same `id`:

```jsonc
// data/ms_prompts_merged.json — metadata
{
  "id": "my-hero",
  "title": "My Hero",
  "description": "中文一句话描述",
  "category": "Hero Section",
  "type": "hero",
  "source_kind": "motionsites",
  "local_rel": "assets/previews/my-hero.webp",
  "local_kind": "webp",
  "sort_order": 12000,
  "tags": ["hero", "dark"]
}
```

```jsonc
// data/ms_prompts_with_text.json — body
{ "id": "my-hero", "prompt_text": "The full prompt, in English, paste-ready…" }
```

Plus `assets/previews/my-hero.webp` — a 1280×800 cover (16:10).

**Rules the build enforces**

- every published card has a local preview **and** a non-empty body (min 200 characters)
- previews stay under 24 MiB
- ids are unique and referenced by exactly one record
- no preview file may be orphaned

## Workflow

1. Add the preview under `assets/previews/`.
2. Append both records.
3. Rebuild and check:

```bash
node scripts/build.js
node scripts/audit-catalog.js
node scripts/verify-assets.js
node --test scripts/tests/*.test.js
```

4. Commit the data, the preview and the regenerated `index.html`.

## Quality bar

- the prompt must be paste-ready: one paragraph of concrete instructions with numbers, ending in an
  `Acceptance:` sentence
- the cover must be a real capture of the design, 16:10, no letterboxing
- categorise by section (`Hero Section`, `Landing Page`, `Pricing Page`, …) and keep industry words in `tags`

## Tests

The suite is hermetic: importers are exercised against fixtures in `scripts/tests/fixtures/`, so a fresh
clone is green without any cached downloads.

```bash
node --test scripts/tests/*.test.js
```

## Deploy

See the README. Cloudflare Pages needs `-Branch master`; GitHub Pages publishes from `main`.
