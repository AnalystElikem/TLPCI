/**
 * Import ministers from TLPCI Ministers Database.xlsx into ERPNext.
 *
 * Creates (when missing):
 *   - Position Type records (Category column)
 *   - Ministers records with location + position child table
 *
 * Church Location links are resolved from existing ERPNext records only
 * (Branch column matched against Church Location.location / name).
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-ministers-to-erpnext.mjs
 *   DRY_RUN=1 node --env-file=.env.local scripts/import-ministers-to-erpnext.mjs
 */

import * as XLSX from "xlsx";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const XLSX_PATH = join(root, "TLPCI Ministers Database.xlsx");

const BASE = (process.env.ERPNEXT_URL || "").replace(/\/+$/, "");
const READ_KEY = process.env.ERPNEXT_API_KEY || "";
const READ_SECRET = process.env.ERPNEXT_API_SECRET || "";
const WRITE_KEY = process.env.ERPNEXT_WRITE_API_KEY || "";
const WRITE_SECRET = process.env.ERPNEXT_WRITE_API_SECRET || "";
const DRY_RUN = process.env.DRY_RUN === "1";

const readAuth = `token ${READ_KEY}:${READ_SECRET}`;
const writeAuth = `token ${WRITE_KEY}:${WRITE_SECRET}`;

const stats = {
  positionTypesCreated: 0,
  locationsMatched: 0,
  locationsMissing: 0,
  ministersCreated: 0,
  ministersUpdated: 0,
  ministersSkipped: 0,
  errors: 0,
};

function str(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function parseFullName(name) {
  return name.trim().replace(/\s+/g, " ");
}

function isExecutiveCategory(category) {
  return normalizeKey(category) === "apostle";
}

function ordainedStartDate(ordained) {
  const year = str(ordained).replace(/[^\d]/g, "");
  if (/^\d{4}$/.test(year)) return `${year}-01-01`;
  return "2000-01-01";
}

function positionNotes(office, ordained) {
  const parts = [];
  const officeText = str(office);
  const year = str(ordained).replace(/[^\d]/g, "");
  if (officeText) parts.push(officeText);
  if (/^\d{4}$/.test(year)) parts.push(`Ordained ${year}`);
  return parts.join(" · ");
}

async function api(method, path, { write = false, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: write ? writeAuth : readAuth,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json };
}

async function listAll(doctype, fields = ["name"]) {
  const params = new URLSearchParams();
  params.set("fields", JSON.stringify(fields));
  params.set("limit_page_length", "0");
  const { json } = await api(
    "GET",
    `/api/resource/${encodeURIComponent(doctype)}?${params}`
  );
  return json.data ?? [];
}

async function createRecord(doctype, data) {
  if (DRY_RUN) {
    console.log(`[dry-run] create ${doctype}`, data);
    return { name: `dry-${doctype}` };
  }
  const { ok, status, json } = await api(
    "POST",
    `/api/resource/${encodeURIComponent(doctype)}`,
    { write: true, body: data }
  );
  if (!ok || !json.data) {
    throw new Error(
      `${doctype} create failed (${status}): ${
        json.exception || json._server_messages || "unknown"
      }`
    );
  }
  return json.data;
}

async function updateRecord(doctype, name, data) {
  if (DRY_RUN) {
    console.log(`[dry-run] update ${doctype}/${name}`, data);
    return jsonSafe(data);
  }
  const { ok, status, json } = await api(
    "PUT",
    `/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`,
    { write: true, body: data }
  );
  if (!ok || !json.data) {
    throw new Error(
      `${doctype} update failed (${status}): ${
        json.exception || json._server_messages || "unknown"
      }`
    );
  }
  return json.data;
}

function jsonSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeKey(value) {
  return str(value).toLowerCase();
}

async function loadExistingMaps() {
  const [positionTypes, locations, ministers] = await Promise.all([
    listAll("Position Type", ["name", "position"]),
    listAll("Church Location", ["name", "location"]),
    listAll("Ministers", ["name", "full_name"]),
  ]);

  const positionTypeSet = new Set(
    positionTypes.map((row) => normalizeKey(row.position ?? row.name))
  );

  const locationByText = new Map();
  for (const row of locations) {
    const docName = str(row.name);
    const label = str(row.location);
    if (label) locationByText.set(normalizeKey(label), docName);
    if (docName) locationByText.set(normalizeKey(docName), docName);
  }

  console.log(
    `[import-ministers] Loaded ${locations.length} Church Location records from ERPNext.`
  );

  const ministersByName = new Map();
  for (const row of ministers) {
    const label = str(row.full_name);
    if (label) ministersByName.set(normalizeKey(label), row.name);
  }

  return { positionTypeSet, locationByText, ministersByName };
}

async function ensurePositionType(category, cache) {
  const key = normalizeKey(category);
  if (cache.positionTypeSet.has(key)) return category;

  await createRecord("Position Type", {
    position: category,
    description: `${category} minister`,
  });
  cache.positionTypeSet.add(key);
  stats.positionTypesCreated += 1;
  console.log(`+ Position Type: ${category}`);
  return category;
}

async function resolveChurchLocation(branch, cache) {
  const label = str(branch);
  if (!label) return undefined;

  const docName = cache.locationByText.get(normalizeKey(label));
  if (docName) {
    stats.locationsMatched += 1;
    return docName;
  }

  stats.locationsMissing += 1;
  console.warn(`! Church Location not found in ERPNext: "${label}"`);
  return undefined;
}

function buildPositionRow(category, office, ordained) {
  return {
    position: category,
    start_date: ordainedStartDate(ordained),
    notes: positionNotes(office, ordained) || undefined,
  };
}

function hasMatchingPosition(positions, category, office, ordained) {
  const notes = positionNotes(office, ordained);
  const start = ordainedStartDate(ordained);
  return (positions ?? []).some((row) => {
    const sameType = str(row.position) === category;
    const sameStart = str(row.start_date) === start;
    const sameNotes = str(row.notes) === notes;
    return sameType && sameStart && sameNotes;
  });
}

async function upsertMinister(row, cache) {
  const category = str(row.Category);
  const name = str(row.Name);
  const branch = str(row.Branch);
  const office = str(row.Office);
  const ordained = str(row.Ordained);

  if (!category || !name) {
    stats.ministersSkipped += 1;
    return;
  }

  await ensurePositionType(category, cache);
  const locationId = branch
    ? await resolveChurchLocation(branch, cache)
    : undefined;

  const fullName = parseFullName(name);
  const positionRow = buildPositionRow(category, office, ordained);
  const isExecutive = isExecutiveCategory(category) ? 1 : 0;
  const existingId = cache.ministersByName.get(normalizeKey(fullName));
  const existing = existingId
    ? (
        await api("GET", `/api/resource/Ministers/${encodeURIComponent(existingId)}`)
      ).json.data
    : null;

  if (!existing) {
    const payload = {
      full_name: fullName,
      position: [positionRow],
      is_executive: isExecutive,
    };
    if (locationId) payload.location = locationId;

    const created = await createRecord("Ministers", payload);
    cache.ministersByName.set(normalizeKey(fullName), created.name);
    stats.ministersCreated += 1;
    console.log(`+ Ministers: ${fullName} (${created.name})`);
    return;
  }

  const updates = {};
  if (locationId && str(existing.location) !== locationId) {
    updates.location = locationId;
  }
  if (Number(existing.is_executive) !== isExecutive) {
    updates.is_executive = isExecutive;
  }

  const positionRows = Array.isArray(existing.position)
    ? [...existing.position]
    : [];
  if (!hasMatchingPosition(positionRows, category, office, ordained)) {
    positionRows.push(positionRow);
    updates.position = positionRows;
  }

  if (!Object.keys(updates).length) {
    stats.ministersSkipped += 1;
    return;
  }

  await updateRecord("Ministers", existing.name, updates);
  stats.ministersUpdated += 1;
  console.log(`~ Ministers: ${fullName} (${existing.name})`);
}

async function main() {
  if (!BASE || !READ_KEY || !READ_SECRET || !WRITE_KEY || !WRITE_SECRET) {
    console.error(
      "Missing ERPNEXT_URL / API keys in .env.local (read + write credentials required)."
    );
    process.exit(1);
  }

  if (!existsSync(XLSX_PATH)) {
    console.error(`Workbook not found: ${XLSX_PATH}`);
    process.exit(1);
  }

  const wb = XLSX.read(readFileSync(XLSX_PATH), { type: "buffer" });
  const sheet = wb.Sheets.Data;
  if (!sheet) {
    console.error('Workbook is missing the "Data" sheet.');
    process.exit(1);
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  console.log(
    `[import-ministers] Starting import of ${rows.length} rows${DRY_RUN ? " (DRY RUN)" : ""}…`
  );

  const cache = await loadExistingMaps();

  for (const row of rows) {
    try {
      await upsertMinister(row, cache);
    } catch (error) {
      stats.errors += 1;
      console.error(
        `! Failed for ${str(row.Name) || "unknown"}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log("\n[import-ministers] Done.");
  console.log(JSON.stringify(stats, null, 2));
  if (stats.errors) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
