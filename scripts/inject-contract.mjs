import { readFileSync, writeFileSync } from "node:fs";

const contract = `seed:e903b6f4 THESIS: One long gig bill announcing a month of unemployment as shows anyone can attend; it refuses the clean events-cards page. OWN-WORLD: Bone stock under fluoro riso inks - red-orange, acid yellow, navy - misregistered layers, halftone grain, perforation tears, slab letterpress type; joining means tearing a ticket stub. STORY: A show flyer for real life; the visitor laughs, scans the time slots like stage times, and tears a stub to join. FIRST VIEWPORT: Full-bleed stacked masthead THE UNEMPLOYMENT CALENDAR with navy ghost layer misprinted behind fluoro red, an ALL AGES FREE ADMISSION strip beneath, then the first day header and its first act block already visible; every act carries its own stub action bottom of its block. FORM: Chosen pick card Riso Gig Poster, code-led, seed e903b6f4. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.`;

const file = new URL("../dist/index.html", import.meta.url);
let html = readFileSync(file, "utf8");
if (!html.includes("seed:e903b6f4")) {
  const marker = "<body";
  const at = html.indexOf(marker);
  if (at === -1) throw new Error("no <body> in dist/index.html");
  const end = html.indexOf(">", at);
  if (end === -1) throw new Error("malformed <body> tag");
  html = html.slice(0, end + 1) + "\n<!-- " + contract + " -->" + html.slice(end + 1);
  writeFileSync(file, html);
  console.log("contract injected");
} else {
  console.log("contract already present");
}
