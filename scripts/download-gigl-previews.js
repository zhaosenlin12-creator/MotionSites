// Download gigl free-prompt preview videos in small batches. Resumable via
// data/gigl-preview-log.json so a timeout can pick up where it left off.
const fs = require('node:fs');
const path = require('node:path');
const { readGiglianepefrei } = require('./import-community');

const ROOT = path.resolve(__dirname, '..');
const LOG_PATH = path.join(ROOT, 'data', 'gigl-preview-log.json');
const BATCH_SIZE = Number(process.env.GIGL_BATCH || 6);
const CONCURRENCY = Number(process.env.GIGL_CONCURRENCY || 2);

const RETRYABLE_CODES = new Set(['UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_SOCKET', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN']);

function isRetryable(error) {
  if (!error) return false;
  const code = error.cause && error.cause.code;
  if (code && RETRYABLE_CODES.has(code)) return true;
  if (error.name === 'AbortError') return true;
  return false;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function downloadWithRetry(url, absolutePath, options) {
  const attempts = Math.max(1, options.attempts || 3);
  const baseDelayMs = options.baseDelayMs || 400;
  const maxDelayMs = options.maxDelayMs || 4000;
  const timeoutMs = options.timeoutMs || 20000;
  let lastError = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Download failed ' + response.status + ' for ' + url);
      const buffer = Buffer.from(await response.arrayBuffer());
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, buffer);
      return buffer.length;
    } catch (error) {
      lastError = error;
      if (!isRetryable(error) || attempt === attempts) {
        throw new Error('Download aborted after ' + attempt + ' attempt(s) for ' + url + ': ' + ((error && error.cause && error.cause.code) || error.name || error.message));
      }
      await sleep(Math.min(maxDelayMs, baseDelayMs * Math.pow(2, attempt - 1)));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

async function downloadBatch(tasks) {
  let cursor = 0;
  let bytes = 0;
  const failures = [];
  async function worker() {
    while (true) {
      const idx = cursor;
      cursor += 1;
      if (idx >= tasks.length) return;
      const task = tasks[idx];
      try {
        const b = await downloadWithRetry(task.url, task.absolutePath, task.options);
        bytes += b || 0;
      } catch (error) {
        failures.push({ id: task.id, url: task.url, message: (error && error.message) || String(error) });
      }
    }
  }
  const workers = Array.from({ length: Math.min(CONCURRENCY, tasks.length || 1) }, () => worker());
  await Promise.all(workers);
  return { bytes, failures };
}

function loadLog() {
  if (fs.existsSync(LOG_PATH)) {
    try { return JSON.parse(fs.readFileSync(LOG_PATH, 'utf8')); } catch (_) {}
  }
  return { ok: [], failed: [] };
}

function saveLog(log) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2) + '\n', 'utf8');
}

function buildTasks(records, log) {
  const tasks = [];
  for (const record of records) {
    if (!record.preview_url) continue;
    if (log.ok.includes(record.id)) continue;
    const extMatch = record.preview_url.match(/\.(mp4|webm|mov|jpg|jpeg|png|gif)/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'mp4';
    const localRel = path.join('assets', 'previews', record.id + '.' + ext);
    const absolutePath = path.join(ROOT, localRel);
    if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).size > 1024) {
      log.ok.push(record.id);
      continue;
    }
    tasks.push({
      id: record.id,
      url: record.preview_url,
      absolutePath,
      options: { attempts: 3, baseDelayMs: 400, maxDelayMs: 4000, timeoutMs: 20000 },
    });
  }
  return tasks;
}

async function main() {
  const { records } = readGiglianepefrei({ root: ROOT });
  const log = loadLog();
  log.ok = Array.from(new Set(log.ok));
  log.failed = Array.from(new Set(log.failed));

  let tasks = buildTasks(records, log);
  console.log('[download-gigl-previews] candidates=' + tasks.length + ' already-ok=' + log.ok.length);
  if (!tasks.length) { console.log('[download-gigl-previews] nothing to do'); saveLog(log); return; }

  while (tasks.length) {
    const slice = tasks.splice(0, BATCH_SIZE);
    console.log('[download-gigl-previews] batch=' + slice.length);
    const t0 = Date.now();
    const { bytes, failures } = await downloadBatch(slice);
    console.log('[download-gigl-previews]   ' + (Date.now() - t0) + 'ms bytes=' + bytes + ' failures=' + failures.length);
    for (const t of slice) if (!failures.find((f) => f.id === t.id)) if (!log.ok.includes(t.id)) log.ok.push(t.id);
    for (const f of failures) if (!log.failed.includes(f.id)) log.failed.push(f.id);
    saveLog(log);
    await sleep(400);
  }
  console.log('[download-gigl-previews] done. ok=' + log.ok.length + ' failed=' + log.failed.length);
}

if (require.main === module) {
  main().catch((e) => { console.error(e.message || e); process.exit(1); });
}

module.exports = { downloadWithRetry, downloadBatch, loadLog, saveLog, buildTasks };
