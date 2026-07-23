const https = require("https");
const { URL } = require("url");

const fs = require("fs");
const path = require("path");
const bundle = fs.readFileSync(path.join(__dirname, "motionsites_bundle.js"), "utf8");
const m = bundle.match(/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
const KEY = m[0];
const HOST = "xgdzyqfalbibzelpdpvr.supabase.co";

function q(pathOrUrl) {
  return new Promise((resolve, reject) => {
    const u = new URL(pathOrUrl, `https://${HOST}`);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: { apikey: KEY, authorization: "Bearer " + KEY },
    };
    const req = https.get(opts, r => {
      const chunks = [];
      r.on("data", c => chunks.push(c));
      r.on("end", () => {
        const buf = Buffer.concat(chunks);
        const ct = r.headers["content-type"] || "";
        if (ct.includes("json")) {
          try { resolve(JSON.parse(buf.toString("utf8"))); }
          catch (e) { resolve(buf.toString("utf8")); }
        } else {
          resolve(buf);
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => req.destroy(new Error("timeout")));
  });
}

module.exports = { KEY, HOST, q };