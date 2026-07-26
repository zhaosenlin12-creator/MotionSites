const fs = require('node:fs');
const path = require('node:path');

const {
  detectAssetKind,
  extractMarkdownPrompt,
  isCompletePrompt,
  normalizePrompt,
  readJson,
  slugify,
  writeJson,
} = require('./lib/catalog-utils');

const ROOT = path.resolve(__dirname, '..');
const SUPERDESIGN_SOURCE_ID = 'superdesign-prompts';
const SUPERDESIGN_REPO = 'superdesigndev/superdesign-prompts';
const SUPERDESIGN_BRANCH = 'main';

const LEGACY_PREVIEW_IDS = [
  'luxury-focus',
  'speakup-venture-hero',
  'visual-hero',
  'no-code-waitlist',
  'shop',
  'fun-404-page',
];

function buildCommunityId(slug) {
  return `community-superdesign-${slugify(slug)}`;
}

function ensureDir(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function normalizeDescription(value) {
  return String(value || '')
    .replace(/\n+Source:\s*https?:\/\/\S+/gi, '')
    .replace(/\s+/g, ' ')
    .trim() || null;
}

function inferKindFromPath(relativePath) {
  const extension = path.extname(relativePath || '').toLowerCase();
  if (extension === '.mp4') return 'mp4';
  if (extension === '.m3u8') return 'hls';
  if (extension === '.webp') return 'webp';
  if (extension === '.gif') return 'gif';
  if (extension === '.png') return 'png';
  if (extension === '.jpg' || extension === '.jpeg') return 'jpeg';
  return 'other';
}

function deriveType(record) {
  const bag = [record.category, ...(record.tags || []), record.slug, record.title].join(' ').toLowerCase();
  if (bag.includes('landing')) return 'landing-page';
  if (bag.includes('hero')) return 'hero';
  if (bag.includes('dashboard')) return 'dashboard';
  if (bag.includes('background')) return 'background';
  if (bag.includes('animation')) return 'animation';
  if (bag.includes('footer')) return 'footer';
  if (bag.includes('waitlist')) return 'waitlist';
  if (bag.includes('pricing')) return 'pricing';
  if (bag.includes('portfolio')) return 'portfolio';
  if (bag.includes('form') || bag.includes('signup') || bag.includes('sign-in') || bag.includes('contact')) return 'form';
  return slugify(record.category || record.tags?.[0] || 'community');
}

function derivePageType(record) {
  const bag = [record.category, ...(record.tags || []), record.slug, record.title].join(' ').toLowerCase();
  if (bag.includes('landing')) return 'landing';
  if (bag.includes('hero')) return 'hero';
  if (bag.includes('dashboard')) return 'dashboard';
  if (bag.includes('footer')) return 'footer';
  return 'community';
}

function buildTextRecord(meta, promptText) {
  return {
    id: meta.id,
    title: meta.title,
    category: meta.category,
    type: meta.type,
    is_free: meta.is_free,
    page_type: meta.page_type,
    description: meta.description,
    prompt_text: normalizePrompt(promptText),
    local_rel: meta.local_rel,
    local_kind: meta.local_kind,
    source_kind: meta.source_kind,
    source_id: meta.source_id,
    source_url: meta.source_url,
    source_path: meta.source_path,
    source_repo: meta.source_repo,
    source_license: meta.source_license,
  };
}

function finalizeMeta(meta, promptText) {
  const normalized = normalizePrompt(promptText);
  return {
    ...meta,
    has_text: isCompletePrompt(normalized, { source_kind: meta.source_kind }),
    text_len: normalized.length,
  };
}

function buildRecoveredMeta(record) {
  return {
    id: record.id,
    title: record.title,
    category: record.category || 'Hero',
    type: record.type || 'hero',
    page_type: record.page_type || 'hero',
    is_free: record.is_free ?? false,
    description: normalizeDescription(record.description),
    image_preview_url: record.image_preview_url ?? null,
    video_preview_url: record.video_preview_url ?? null,
    sort_order: record.sort_order ?? 9999,
    created_at: record.created_at ?? null,
    local_rel: record.local_rel ?? null,
    local_kind: record.local_rel ? inferKindFromPath(record.local_rel) : null,
    source_kind: 'motionsites',
    source_id: record.source_id,
    source_url: record.source_url,
    source_path: record.source_path,
    source_repo: record.source_repo,
    source_license: record.source_license,
  };
}

function buildCommunityMeta(record) {
  const previewPath = record.preview || `prompts/${record.slug}/preview.png`;
  const localRel = record.local_rel || `assets/community/superdesign/${record.slug}/${path.basename(previewPath)}`.replace(/\\/g, '/');
  return {
    id: buildCommunityId(record.slug),
    title: record.title,
    category: record.category,
    type: deriveType(record),
    page_type: derivePageType(record),
    is_free: true,
    description: normalizeDescription(record.description),
    image_preview_url: null,
    video_preview_url: record.video || null,
    sort_order: 10000 + Number(record.rank || 0),
    created_at: null,
    local_rel: localRel,
    local_kind: inferKindFromPath(localRel),
    source_kind: 'community',
    source_id: SUPERDESIGN_SOURCE_ID,
    source_url: `https://github.com/${SUPERDESIGN_REPO}/blob/${SUPERDESIGN_BRANCH}/prompts/${record.slug}/README.md`,
    source_path: `prompts/${record.slug}/README.md`,
    source_repo: SUPERDESIGN_REPO,
    source_license: 'CC0-1.0',
    tags: record.tags || [],
    industry: record.industry || null,
    author: record.author || null,
    try_url: record.try_url || null,
    copy_count: record.copyCount ?? null,
    try_count: record.tryCount ?? null,
    deslop_score: record.deslop_score ?? null,
    visual_score: record.visual_score ?? null,
    community_slug: record.slug,
    preview: previewPath,
  };
}

function mergeImportedData({ merged, prompts, recovered, community }) {
  const originalOrder = merged.map((record) => record.id);
  const mergedMap = new Map(merged.map((record) => [record.id, {
    ...record,
    source_kind: record.source_kind || 'motionsites',
  }]));
  const promptMap = new Map();

  for (const record of prompts) {
    const meta = mergedMap.get(record.id) || record;
    if (!isCompletePrompt(record.prompt_text || '', meta)) {
      continue;
    }
    promptMap.set(record.id, {
      ...record,
      source_kind: meta.source_kind || record.source_kind || 'motionsites',
      prompt_text: normalizePrompt(record.prompt_text),
    });
  }

  const stats = {
    replaced: 0,
    addedRecovered: 0,
    addedCommunity: 0,
    removedIncomplete: prompts.length - promptMap.size,
    skippedRecovered: 0,
    skippedCommunity: 0,
  };

  const appendedRecovered = [];
  const appendedCommunity = [];

  for (const record of recovered) {
    if (!record.id || !isCompletePrompt(record.prompt_text || '')) {
      stats.skippedRecovered += 1;
      continue;
    }

    const existingMeta = mergedMap.get(record.id);
    const existingPrompt = promptMap.get(record.id);
    if (existingMeta && existingPrompt) {
      stats.skippedRecovered += 1;
      continue;
    }

    const meta = finalizeMeta(
      existingMeta ? { ...existingMeta, ...buildRecoveredMeta(record) } : buildRecoveredMeta(record),
      record.prompt_text,
    );

    mergedMap.set(record.id, meta);
    promptMap.set(record.id, buildTextRecord(meta, record.prompt_text));

    if (existingMeta) {
      stats.replaced += 1;
    } else {
      stats.addedRecovered += 1;
      appendedRecovered.push(record.id);
    }
  }

  for (const record of community) {
    if (!record.slug || !isCompletePrompt(record.prompt_text || '', { source_kind: 'community' })) {
      stats.skippedCommunity += 1;
      continue;
    }

    const meta = finalizeMeta(buildCommunityMeta(record), record.prompt_text);
    if (mergedMap.has(meta.id) || promptMap.has(meta.id)) {
      stats.skippedCommunity += 1;
      continue;
    }

    mergedMap.set(meta.id, meta);
    promptMap.set(meta.id, buildTextRecord(meta, record.prompt_text));
    appendedCommunity.push(meta.id);
    stats.addedCommunity += 1;
  }

  const orderedIds = [...originalOrder, ...appendedRecovered, ...appendedCommunity];
  const finalMerged = orderedIds.map((id) => mergedMap.get(id)).filter(Boolean);
  const finalPrompts = orderedIds.map((id) => promptMap.get(id)).filter(Boolean);

  return {
    finalMerged,
    finalPrompts,
    mergedMap,
    promptMap,
    stats,
  };
}

function readRecoveredSources(root) {
  const recovered = [];
  const markdownDirectory = path.join(root, 'sources', 'giglianepefrei_fetch', 'Pro prompts');
  if (fileExists(markdownDirectory)) {
    for (const name of fs.readdirSync(markdownDirectory)) {
      if (!name.toLowerCase().endsWith('.md')) {
        continue;
      }
      const absolutePath = path.join(markdownDirectory, name);
      const parsed = extractMarkdownPrompt(fs.readFileSync(absolutePath, 'utf8'), name);
      if (!parsed.id || !isCompletePrompt(parsed.promptText)) {
        continue;
      }
      recovered.push({
        id: parsed.id,
        title: parsed.title,
        category: parsed.category,
        type: parsed.type,
        page_type: /landing/i.test(parsed.type || '') ? 'landing' : 'hero',
        description: null,
        prompt_text: parsed.promptText,
        source_id: 'giglianepefrei-motionsites-library',
        source_repo: 'giglianepefrei/motionsites.ai-prompt-library',
        source_license: 'NOASSERTION',
        source_path: `Pro prompts/${name}`,
        source_url: `https://github.com/giglianepefrei/motionsites.ai-prompt-library/blob/main/Pro%20prompts/${encodeURIComponent(name).replace(/%20/g, '%20')}`,
      });
    }
  }

  const missingPath = path.join(root, 'sources', 'nomaan5541_fetch', 'missing_prompts.json');
  if (fileExists(missingPath)) {
    for (const record of readJson(missingPath)) {
      if (!record.id || !isCompletePrompt(record.prompt_text || '')) {
        continue;
      }
      recovered.push({
        id: record.id,
        title: record.title,
        category: record.category,
        type: record.type,
        page_type: record.page_type,
        is_free: record.is_free,
        description: null,
        image_preview_url: record.image_preview_url || null,
        video_preview_url: record.video_preview_url || null,
        sort_order: record.sort_order,
        created_at: record.created_at,
        prompt_text: record.prompt_text,
        source_id: 'nomaan5541-motionsites-collection',
        source_repo: 'nomaan5541/motionsites-prompt-collection',
        source_license: 'MIT',
        source_path: 'missing_prompts.json',
        source_url: 'https://github.com/nomaan5541/motionsites-prompt-collection/blob/main/missing_prompts.json',
      });
    }
  }

  return recovered;
}

function readCommunitySource(root) {
  const promptsPath = path.join(root, 'sources', 'superdesign_fetch', 'prompts.json');
  if (!fileExists(promptsPath)) {
    throw new Error('Missing sources/superdesign_fetch/prompts.json. Fetch the source snapshot before importing.');
  }
  return readJson(promptsPath).map((record) => ({
    ...record,
    prompt_text: record.prompt,
  }));
}

function deriveLegacyPreviewUrl(record) {
  if (record.image_preview_url) {
    return record.image_preview_url;
  }
  const match = String(record.video_preview_url || '').match(/stream\.mux\.com\/([^./?]+)/i);
  if (!match) {
    return null;
  }
  return `https://image.mux.com/${match[1]}/thumbnail.png?time=1`;
}

function deriveLegacyPreviewPath(record) {
  if (record.image_preview_url) {
    return `assets/previews/${record.id}.webp`;
  }
  return `assets/previews/${record.id}.png`;
}


const RETRYABLE_CODES = new Set([
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_SOCKET',
  'ECONNRESET',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EAI_AGAIN',
]);

function isRetryableError(error) {
  if (!error) return false;
  const code = error.cause && error.cause.code;
  if (code && RETRYABLE_CODES.has(code)) return true;
  if (error.name === 'AbortError') return true;
  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadWithRetry(url, absolutePath, options = {}) {
  const attempts = Math.max(1, options.attempts ?? 4);
  const baseDelayMs = options.baseDelayMs ?? 250;
  const maxDelayMs = options.maxDelayMs ?? 4000;
  const timeoutMs = options.timeoutMs ?? 15000;
  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Download failed ' + response.status + ' for ' + url);
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      ensureDir(path.dirname(absolutePath));
      fs.writeFileSync(absolutePath, buffer);
      return buffer.length;
    } catch (error) {
      lastError = error;
      const retryable = isRetryableError(error);
      if (!retryable || attempt === attempts) {
        const reason = (error && error.cause && error.cause.code) || (error && error.name) || (error && error.message);
        const wrapped = new Error('Download aborted after ' + attempt + ' attempt(s) for ' + url + ': ' + reason);
        wrapped.cause = error;
        throw wrapped;
      }
      const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      await sleep(delay);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError || new Error('Download failed for ' + url);
}


async function runTaskQueue(tasks, concurrency) {
  const limit = Math.max(1, concurrency || 1);
  let cursor = 0;
  let totalBytes = 0;
  const failures = [];
  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= tasks.length) return;
      const task = tasks[index];
      try {
        const bytes = await downloadWithRetry(task.url, task.absolutePath, task.options || {});
        totalBytes += bytes || 0;
      } catch (error) {
        failures.push({ url: task.url, absolutePath: task.absolutePath, message: (error && error.message) || String(error) });
      }
    }
  }
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () => worker());
  await Promise.all(workers);
  return { bytes: totalBytes, failures };
}

async function downloadAllBounded(tasks, concurrency) {
  const result = await runTaskQueue(tasks, concurrency);
  if (result.failures.length) {
    const messages = result.failures.map((f) => f.message).join("\n  ");
    throw new Error("Download aborted after retries for " + result.failures.length + " url(s):\n  " + messages);
  }
  return result.bytes;
}

async function downloadFile(url, absolutePath) {
  return downloadWithRetry(url, absolutePath, { attempts: 3, baseDelayMs: 200, maxDelayMs: 2000, timeoutMs: 15000 });
}

async function ensureLegacyPreviewAssets(root, mergedMap) {
  const tasks = [];
  for (const id of LEGACY_PREVIEW_IDS) {
    const record = mergedMap.get(id);
    if (!record) {
      continue;
    }
    const url = deriveLegacyPreviewUrl(record);
    if (!url) {
      continue;
    }
    const localRel = deriveLegacyPreviewPath(record);
    const absolutePath = path.join(root, localRel);
    if (!fileExists(absolutePath)) {
      tasks.push({ url, absolutePath, options: { attempts: 4, baseDelayMs: 250, maxDelayMs: 4000, timeoutMs: 15000 } });
    }
    record.local_rel = localRel.replace(/\\/g, "/");
    record.local_kind = detectAssetKind(absolutePath);
  }
  const result = await runTaskQueue(tasks, 4);
  for (const failure of result.failures) {
    console.warn("[warn] preview download failed: " + failure.message);
  }
  return result;
}

async function ensureCommunityPreviewAssets(root, communityRecords) {
  const tasks = [];
  for (const record of communityRecords) {
    const localRel = record.local_rel;
    const absolutePath = path.join(root, localRel);
    if (fileExists(absolutePath)) {
      continue;
    }
    const url = "https://raw.githubusercontent.com/" + SUPERDESIGN_REPO + "/" + SUPERDESIGN_BRANCH + "/" + record.preview;
    tasks.push({ url, absolutePath, options: { attempts: 4, baseDelayMs: 400, maxDelayMs: 6000, timeoutMs: 20000 } });
  }
  const result = await runTaskQueue(tasks, 4);
  for (const failure of result.failures) {
    console.warn("[warn] preview download failed: " + failure.message);
  }
  return result;
}

async function runImport({ write }) {
  const merged = readJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'));
  const prompts = readJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'));
  const recovered = readRecoveredSources(ROOT);
  const community = readCommunitySource(ROOT);
  const result = mergeImportedData({ merged, prompts, recovered, community });

  if (!write) {
    console.log(JSON.stringify({
      write: false,
      stats: result.stats,
      merged: result.finalMerged.length,
      prompts: result.finalPrompts.length,
    }, null, 2));
    return result;
  }

  const legacyQueue = await ensureLegacyPreviewAssets(ROOT, result.mergedMap);
  const legacyBytes = legacyQueue.bytes;
  const legacyFailures = legacyQueue.failures;
  const communityRows = result.finalMerged.filter((record) => record.source_kind === 'community');
  const communityQueue = await ensureCommunityPreviewAssets(ROOT, communityRows);
  const communityBytes = communityQueue.bytes;
  const communityFailures = communityQueue.failures;

  const mergedMap = new Map(result.finalMerged.map((record) => [record.id, record]));
  const syncedMerged = result.finalMerged.map((record) => {
    const current = mergedMap.get(record.id);
    if (current.local_rel) {
      const absolutePath = path.join(ROOT, current.local_rel);
      current.local_kind = detectAssetKind(absolutePath);
    }
    return current;
  });
  const syncedPrompts = result.finalPrompts.map((record) => {
    const meta = mergedMap.get(record.id);
    return {
      ...record,
      local_rel: meta?.local_rel || null,
      local_kind: meta?.local_kind || null,
      source_kind: meta?.source_kind || record.source_kind || 'motionsites',
      source_id: meta?.source_id || record.source_id || null,
      source_url: meta?.source_url || record.source_url || null,
      source_path: meta?.source_path || record.source_path || null,
      source_repo: meta?.source_repo || record.source_repo || null,
      source_license: meta?.source_license || record.source_license || null,
    };
  });

  if (communityFailures.length) {
    const failedPaths = new Set(communityFailures.map((f) => f.absolutePath));
    for (const row of syncedMerged) {
      if (row.source_kind === 'community' && row.local_rel && failedPaths.has(path.join(ROOT, row.local_rel))) {
        row.local_rel = null;
        row.local_kind = null;
      }
    }
    for (const row of syncedPrompts) {
      if (row.source_kind === 'community' && row.local_rel && failedPaths.has(path.join(ROOT, row.local_rel))) {
        row.local_rel = null;
        row.local_kind = null;
      }
    }
  }
  writeJson(path.join(ROOT, 'data', 'ms_prompts_merged.json'), syncedMerged);
  writeJson(path.join(ROOT, 'data', 'ms_prompts_with_text.json'), syncedPrompts);

  console.log(JSON.stringify({
    write: true,
    stats: result.stats,
    merged: syncedMerged.length,
    prompts: syncedPrompts.length,
    legacyPreviewBytes: legacyBytes,
    communityPreviewBytes: communityBytes,
    legacyFailures: legacyFailures.length,
    communityFailures: communityFailures.length,
  }, null, 2));
  if (communityFailures.length) {
    console.error("[warn] community preview failures (" + communityFailures.length + "):");
    for (const failure of communityFailures) console.error("  - " + failure.url + " :: " + failure.message);
  }

  return result;
}

if (require.main === module) {
  const write = process.argv.includes('--write');
  runImport({ write }).catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}

module.exports = {
  buildCommunityId,
  downloadWithRetry,
  downloadAllBounded,
  mergeImportedData,
  runImport,
};


