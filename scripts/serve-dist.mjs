import { createServer } from "node:http";
import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, extname } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const base = "/unempoyment-calendar";
const log = "C:\\Users\\verab\\AppData\\Local\\Temp\\opencode\\serve-log.txt";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
};

process.on("uncaughtException", (e) => {
  try { appendFileSync(log, `UNCAUGHT: ${e.message}\n`); } catch {}
});
process.on("unhandledRejection", () => {});

createServer((req, res) => {
  try {
    appendFileSync(log, `${new Date().toISOString()} ${req.url}\n`);
    let path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (path === base || path.startsWith(base + "/")) path = path.slice(base.length) || "/";
    const file = path === "/" ? "index.html" : path.slice(1);
    const full = join(root, file);
    if (existsSync(full) && !extname(full).match(/\.hbs$/)) {
      res.writeHead(200, { "content-type": types[extname(full)] ?? "application/octet-stream" });
      res.end(readFileSync(full));
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
    }
  } catch (e) {
    try { res.writeHead(500); res.end("error"); } catch {}
  }
}).listen(4399, "127.0.0.1", () => {
  try { appendFileSync(log, `LISTENING\n`); } catch {}
});
