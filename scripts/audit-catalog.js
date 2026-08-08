const path = require('node:path');

const {
  auditCatalog,
  isCompletePrompt,
  readJson,
} = require('./lib/catalog-utils');

function main() {
  const root = path.resolve(__dirname, '..');
  const merged = readJson(path.join(root, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(root, 'data', 'ms_prompts_with_text.json'));
  const sourcesPath = path.join(root, 'data', 'catalog_sources.json');
  const sources = require('node:fs').existsSync(sourcesPath) ? readJson(sourcesPath) : [];
  const result = auditCatalog({ root, merged, prompts, sources });

  if (result.errors.length) {
    for (const error of result.errors) {
      const detail = [error.code, error.id, error.path].filter(Boolean).join(' ');
      console.error(`AUDIT ERROR ${detail}`);
    }
    console.error(`AUDIT FAIL errors=${result.errors.length}`);
    process.exit(1);
  }

  const promptById = new Map(prompts.map((p) => [p.id, p]));
  const complete = merged.filter((record) => {
    const prompt = promptById.get(record.id);
    if (!prompt) return false;
    return isCompletePrompt(prompt.prompt_text || '', { source_kind: record.source_kind });
  }).length;
  const community = merged.filter((record) => record.source_kind === 'community').length;
  const missingBodies = merged.length - complete;
  const assets = merged.filter((record) => !!record.local_rel).length;
  console.log(`AUDIT OK records=${merged.length} complete=${complete} community=${community} missingBodies=${missingBodies} assets=${assets}`);
}

main();
