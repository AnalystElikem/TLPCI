// Checks every Unsplash image URL used in src/ and reports broken ones.
// Run with:  node check-all-images.mjs
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(tsx?|css)$/.test(name)) files.push(p);
  }
  return files;
}

const ids = new Set();
for (const file of walk("src")) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/https:\/\/images\.unsplash\.com\/photo-[0-9a-z-]+/g)) {
    ids.add(m[0]);
  }
}

console.log(`Checking ${ids.size} unique images...\n`);
let broken = 0;
for (const url of ids) {
  try {
    const r = await fetch(url + "?w=50&q=30", { method: "HEAD" });
    if (r.status !== 200) {
      broken++;
      console.log(`BROKEN (${r.status}): ${url}`);
    }
  } catch (e) {
    broken++;
    console.log(`FAILED: ${url} (${e.message})`);
  }
}
console.log(broken === 0 ? "\nAll images OK ✓" : `\n${broken} broken image(s) found.`);
