const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { downloadWithRetry } = require('../import-community');

async function withTempDir(run) {
  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'ms-import-'));
  try {
    return await run(directory);
  } finally {
    await fs.promises.rm(directory, { recursive: true, force: true });
  }
}

test('downloadWithRetry retries transient failures and finally succeeds', { timeout: 20000 }, async () => {
  let attempts = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    attempts += 1;
    if (attempts < 3) {
      const error = new Error('Connect Timeout Error');
      error.cause = { code: 'UND_ERR_CONNECT_TIMEOUT' };
      throw error;
    }
    return new Response('ok-bytes', { status: 200, headers: { 'content-type': 'application/octet-stream' } });
  };

  try {
    await withTempDir(async (tempDir) => {
      const target = path.join(tempDir, 'sub', 'preview.png');
      const bytes = await downloadWithRetry('https://example.test/preview.png', target, {
        attempts: 4,
        baseDelayMs: 1,
        maxDelayMs: 2,
        timeoutMs: 5000,
      });
      assert.equal(attempts, 3);
      assert.equal(bytes, 'ok-bytes'.length);
      assert.equal(fs.readFileSync(target, 'utf8'), 'ok-bytes');
    });
  } finally {
    globalThis.fetch = realFetch;
  }
});

test('downloadWithRetry throws after exhausting attempts', { timeout: 20000 }, async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const error = new Error('Connect Timeout Error');
    error.cause = { code: 'UND_ERR_CONNECT_TIMEOUT' };
    throw error;
  };

  try {
    await withTempDir(async (tempDir) => {
      const target = path.join(tempDir, 'preview.png');
      await assert.rejects(
        downloadWithRetry('https://example.test/preview.png', target, {
          attempts: 3,
          baseDelayMs: 1,
          maxDelayMs: 2,
          timeoutMs: 5000,
        }),
      );
    });
  } finally {
    globalThis.fetch = realFetch;
  }
});
