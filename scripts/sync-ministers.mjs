// Regenerates src/data/ministers.ts from the "Data" sheet of the
// TLPCI Ministers Database.xlsx workbook.
//
// Usage:  node scripts/sync-ministers.mjs
// Also runs automatically before `npm run build` (see package.json "prebuild").
//
// Edit the workbook's "Data" tab (columns: Category, Name, Branch, Ordained,
// Office), save it, then run this script (or just build) to update the site.

import * as XLSX from "xlsx";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const XLSX_PATH = join(root, "TLPCI Ministers Database.xlsx");
const OUT_PATH = join(root, "src", "data", "ministers.ts");

// Rank display order + singular -> plural labels
const RANK_ORDER = [
  ["Apostle", "Apostles"],
  ["Prophet", "Prophets"],
  ["Senior Pastor", "Senior Pastors"],
  ["Reverend", "Reverends"],
  ["Pastor", "Pastors"],
  ["Elder", "Elders"],
];

if (!existsSync(XLSX_PATH)) {
  console.warn(
    `[sync-ministers] Workbook not found at ${XLSX_PATH} — skipping (keeping existing ministers.ts).`
  );
  process.exit(0);
}

const wb = XLSX.read(readFileSync(XLSX_PATH), { type: "buffer" });
const sheet = wb.Sheets["Data"];
if (!sheet) {
  console.warn('[sync-ministers] No "Data" sheet found — skipping.');
  process.exit(0);
}

const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
const str = (v) => (v === null || v === undefined ? "" : String(v).trim());

// Group by category, preserving the row order within each category.
const byCat = new Map();
for (const r of rows) {
  const cat = str(r.Category);
  const name = str(r.Name);
  if (!cat || !name) continue;
  if (!byCat.has(cat)) byCat.set(cat, []);
  const m = { name };
  const office = str(r.Office);
  const branch = str(r.Branch);
  const ordained = str(r.Ordained);
  if (office) m.office = office;
  if (branch) m.branch = branch;
  if (ordained) m.ordained = ordained;
  byCat.get(cat).push(m);
}

// Emit in defined rank order; any unknown categories go last.
const ordered = [];
const known = new Set(RANK_ORDER.map(([s]) => s));
for (const [singular, plural] of RANK_ORDER) {
  if (byCat.has(singular)) {
    ordered.push({ rank: plural, ministers: byCat.get(singular) });
  }
}
for (const [cat, ms] of byCat) {
  if (!known.has(cat)) ordered.push({ rank: cat, ministers: ms });
}

const groups = ordered.map((g) => ({
  rank: g.rank,
  count: g.ministers.length,
  ministers: g.ministers,
}));

const banner =
  "// Ministers of TLPCI, grouped by rank.\n" +
  "// GENERATED FILE — do not edit by hand. Run `node scripts/sync-ministers.mjs`\n" +
  "// (or `npm run build`) to regenerate from TLPCI Ministers Database.xlsx.\n";

const ts =
  banner +
  "export interface Minister { name: string; office?: string; branch?: string; ordained?: string; }\n" +
  "export interface MinisterGroup { rank: string; count: number; ministers: Minister[]; }\n\n" +
  "export const ministerGroups: MinisterGroup[] = " +
  JSON.stringify(groups, null, 2) +
  ";\n\n" +
  "export const totalMinisters = ministerGroups.reduce((n, g) => n + g.count, 0);\n";

writeFileSync(OUT_PATH, ts);
const total = groups.reduce((n, g) => n + g.count, 0);
console.log(
  `[sync-ministers] Wrote ${OUT_PATH} — ${total} ministers across ${groups.length} ranks.`
);
