import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of ["index.html", "style.css", "app.js", "data.js"]) {
  copyFileSync(new URL(`../${file}`, import.meta.url), new URL(file, dist));
}

if (existsSync(new URL("../docs", import.meta.url))) {
  cpSync(new URL("../docs", import.meta.url), new URL("docs", dist), { recursive: true });
}

console.log("Eventra static build ready");