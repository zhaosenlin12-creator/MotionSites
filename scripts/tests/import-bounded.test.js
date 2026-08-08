const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { downloadAllBounded } = require("../import-community");

async function withTempDir(run) {
  const directory = await fs.promises.mkdtemp(path.join(os.tmpdir(), "ms-import-bounded-"));
  try {
    return await run(directory);
  } finally {
    await fs.promises.rm(directory, { recursive: true, force: true });
  }
}

test("downloadAllBounded never exceeds the configured concurrency", { timeout: 30000 }, async () => {
  let active = 0;
  let peak = 0;
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    active += 1;
    peak = Math.max(peak, active);
    await new Promise((resolve) => setTimeout(resolve, 25));
    active -= 1;
    return new Response("ok", { status: 200 });
  };

  try {
    await withTempDir(async (tempDir) => {
      const tasks = Array.from({ length: 12 }, (_, i) => ({
        url: "https://example.test/" + i + ".png",
        absolutePath: path.join(tempDir, i + ".png"),
        options: { attempts: 1, timeoutMs: 5000 },
      }));
      const bytes = await downloadAllBounded(tasks, 3);
      assert.equal(bytes, 12 * 2);
      assert.equal(peak <= 3, true, "expected peak<=3 got " + peak);
    });
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("downloadAllBounded propagates errors so callers can stop importing", { timeout: 30000 }, async () => {
  const realFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls += 1;
    if (String(url).endsWith("boom.png")) {
      return new Response("nope", { status: 500 });
    }
    return new Response("ok", { status: 200 });
  };

  try {
    await withTempDir(async (tempDir) => {
      const tasks = [
        { url: "https://example.test/a.png", absolutePath: path.join(tempDir, "a.png"), options: { attempts: 1, timeoutMs: 5000 } },
        { url: "https://example.test/boom.png", absolutePath: path.join(tempDir, "boom.png"), options: { attempts: 1, timeoutMs: 5000 } },
        { url: "https://example.test/c.png", absolutePath: path.join(tempDir, "c.png"), options: { attempts: 1, timeoutMs: 5000 } },
      ];
      await assert.rejects(downloadAllBounded(tasks, 2));
      assert.equal(calls >= 2, true);
    });
  } finally {
    globalThis.fetch = realFetch;
  }
});

