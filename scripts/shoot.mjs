import puppeteer from "puppeteer-core";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const base = "/unempoyment-calendar";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

const server = createServer((req, res) => {
  try {
    let path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (path === base || path.startsWith(base + "/")) path = path.slice(base.length) || "/";
    const file = path === "/" ? "index.html" : path.slice(1);
    const full = join(root, file);
    if (existsSync(full)) {
      res.writeHead(200, { "content-type": types[extname(full)] ?? "application/octet-stream" });
      res.end(readFileSync(full));
    } else {
      res.writeHead(404);
      res.end("nf");
    }
  } catch {
    try { res.writeHead(500); res.end(); } catch {}
  }
});

await new Promise((r) => server.listen(4399, "127.0.0.1", r));

const exe = ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"].find((p) => existsSync(p));
if (!exe) throw new Error("no browser found");

const browser = await puppeteer.launch({
  executablePath: exe,
  headless: true,
  dumpio: true,
  args: ["--no-proxy-server", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-sandbox", "--user-data-dir=" + new URL("../.impeccable/chrome-profile/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")],
});

const url = "http://127.0.0.1:4399/unempoyment-calendar/";
const shots = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: s.width, height: s.height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `.impeccable/review/${s.name}.png`, fullPage: true });
  console.log(`${s.name}: captured fullPage`);
  await page.close();
}

await browser.close();
server.close();
console.log("done");
