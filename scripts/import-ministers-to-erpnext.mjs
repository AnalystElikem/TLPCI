/**
 * Sync ministers from TLPCI Ministers Database.xlsx into ERPNext Person records.
 *
 * Updates each matched Person with:
 *   - titled full_name (Category + Name, e.g. "Apostle Eric Essandoh Anim Otoo")
 *   - custom_location (Church Location link from Branch)
 *   - positions child table (Position Type, start date, title in notes from Office or Category)
 *   - custom_is_executive / custom_is_executiveminister from Office (executive titles)
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-ministers-to-erpnext.mjs
 *   MINISTERS_XLSX="C:/path/to/file.xlsx" node --env-file=.env.local scripts/import-ministers-to-erpnext.mjs
 *   DRY_RUN=1 node --env-file=.env.local scripts/import-ministers-to-erpnext.mjs
 */

import * as XLSX from "xlsx";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const DEFAULT_XLSX =
  "C:/Users/debor/OneDrive/Desktop/Church Project/church-site/src/TLPCI Ministers Database.xlsx";
const XLSX_PATH =
  process.env.MINISTERS_XLSX ||
  (existsSync(DEFAULT_XLSX)
    ? DEFAULT_XLSX
    : join(root, "TLPCI Ministers Database.xlsx"));

const BASE = (process.env.ERPNEXT_URL || "").replace(/\/+$/, "");
const READ_KEY = process.env.ERPNEXT_API_KEY || "";
const READ_SECRET = process.env.ERPNEXT_API_SECRET || "";
const WRITE_KEY = process.env.ERPNEXT_WRITE_API_KEY || "";
const WRITE_SECRET = process.env.ERPNEXT_WRITE_API_SECRET || "";
const DRY_RUN = process.env.DRY_RUN === "1";

const readAuth = `token ${READ_KEY}:${READ_SECRET}`;
const writeAuth = `token ${WRITE_KEY}:${WRITE_SECRET}`;

const TITLE_PREFIXES = [
  "Apostle",
  "Prophet",
  "Senior Pastor",
  "Reverend",
  "Pastor",
  "Elder",
  "Deacon",
];

const stats = {
  positionTypesCreated: 0,
  locationsMatched: 0,
  locationsMissing: 0,
  personsCreated: 0,
  personsUpdated: 0,
  personsSkipped: 0,
  personsUnmatched: 0,
  errors: 0,
};

function str(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function normalizeKey(value) {
  return str(value).toLowerCase();
}

function stripTitle(name) {
  let value = str(name);
  for (const prefix of TITLE_PREFIXES) {
    const pattern = new RegExp(`^${prefix}\\.\\s+`, "i");
    const patternPlain = new RegExp(`^${prefix}\\s+`, "i");
    if (pattern.test(value)) {
      value = value.replace(pattern, "").trim();
      break;
    }
    if (patternPlain.test(value)) {
      value = value.replace(patternPlain, "").trim();
      break;
    }
  }
  return value.replace(/\s+/g, " ").trim();
}

function titledFullName(category, name) {
  const base = stripTitle(name);
  const title = str(category);
  if (!base) return "";
  if (!title) return base;
  const lowerBase = base.toLowerCase();
  if (lowerBase.startsWith(`${title.toLowerCase()} `)) return base;
  return `${title} ${base}`;
}

function parseNameParts(fullName) {
  const parts = stripTitle(fullName).split(/\s+/).filter(Boolean);
  if (!parts.length) return { first_name: fullName, last_name: "" };
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  return {
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
  };
}

function ordainedStartDate(ordained) {
  const year = str(ordained).replace(/[^\d]/g, "");
  if (/^\d{4}$/.test(year)) return `${year}-01-01`;
  return "2000-01-01";
}

function positionTitle(office, category) {
  return str(office) || str(category);
}

/** Map Excel Office to ERPNext executive checkboxes. */
function executiveFlags(category, office) {
  if (!str(office)) {
    return { custom_is_executive: 0, custom_is_executiveminister: 0 };
  }

  const isMinister = TITLE_PREFIXES.includes(str(category));
  if (isMinister) {
    return { custom_is_executive: 0, custom_is_executiveminister: 1 };
  }

  return { custom_is_executive: 1, custom_is_executiveminister: 0 };
}

function frappeFlag(value) {
  return Number(value) === 1 ? 1 : 0;
}

function executiveFlagsChanged(existing, flags) {
  return (
    frappeFlag(existing.custom_is_executive) !== flags.custom_is_executive ||
    frappeFlag(existing.custom_is_executiveminister) !==
      flags.custom_is_executiveminister
  );
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
    console.log(`[dry-run] create ${doctype}`, data.full_name ?? data.name);
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
    return data;
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

async function loadExistingMaps() {
  const [positionTypes, locations, people] = await Promise.all([
    listAll("Position Type", ["name", "position"]),
    listAll("Church Location", ["name", "location"]),
    listAll("Person", ["name", "full_name"]),
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

  const peopleByName = new Map();
  for (const row of people) {
    const label = str(row.full_name);
    if (!label) continue;
    peopleByName.set(normalizeKey(label), row.name);
    peopleByName.set(normalizeKey(stripTitle(label)), row.name);
  }

  return { positionTypeSet, locationByText, peopleByName };
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
    notes: positionTitle(office, category),
  };
}

/** Merge or update the position row for this rank; notes hold the minister's title. */
function syncPositionRows(existingRows, category, office, ordained) {
  const start = ordainedStartDate(ordained);
  const rows = Array.isArray(existingRows) ? [...existingRows] : [];

  let match =
    rows.find((r) => str(r.position) === category && str(r.start_date) === start) ??
    rows.find((r) => str(r.position) === category && !str(r.end_date)) ??
    rows.find((r) => str(r.position) === category);

  if (match) {
    const desired = positionTitle(office, category);
    if (str(match.notes) !== desired) {
      match.notes = desired;
      return { rows, changed: true };
    }
    return { rows, changed: false };
  }

  rows.push(buildPositionRow(category, office, ordained));
  return { rows, changed: true };
}

function findPersonId(row, cache) {
  const candidates = [
    normalizeKey(titledFullName(row.Category, row.Name)),
    normalizeKey(stripTitle(row.Name)),
    normalizeKey(row.Name),
  ];
  for (const key of candidates) {
    const id = cache.peopleByName.get(key);
    if (id) return id;
  }
  return null;
}

async function upsertPerson(row, cache) {
  const category = str(row.Category);
  const name = str(row.Name);
  const branch = str(row.Branch);
  const office = str(row.Office);
  const ordained = str(row.Ordained);

  if (!category || !name) {
    stats.personsSkipped += 1;
    return;
  }

  await ensurePositionType(category, cache);
  const locationId = branch
    ? await resolveChurchLocation(branch, cache)
    : undefined;

  const fullName = titledFullName(category, name);
  const nameParts = parseNameParts(name);
  const positionRow = buildPositionRow(category, office, ordained);
  const execFlags = executiveFlags(category, office);
  const personId = findPersonId(row, cache);

  if (!personId) {
    stats.personsUnmatched += 1;
    console.warn(`! No Person record matched for "${name}" - creating new Person`);

    const payload = {
      first_name: nameParts.first_name,
      last_name: nameParts.last_name,
      full_name: fullName,
      positions: [positionRow],
      ...execFlags,
    };
    if (locationId) payload.custom_location = locationId;

    const created = await createRecord("Person", payload);
    cache.peopleByName.set(normalizeKey(fullName), created.name);
    cache.peopleByName.set(normalizeKey(stripTitle(fullName)), created.name);
    stats.personsCreated += 1;
    console.log(`+ Person: ${fullName} (${created.name})`);
    return;
  }

  const existing = (
    await api("GET", `/api/resource/Person/${encodeURIComponent(personId)}`)
  ).json.data;

  const updates = {};
  if (fullName && str(existing.full_name) !== fullName) {
    updates.full_name = fullName;
    updates.first_name = nameParts.first_name;
    updates.last_name = nameParts.last_name;
  }
  if (locationId && str(existing.custom_location) !== locationId) {
    updates.custom_location = locationId;
  }

  const positionRows = Array.isArray(existing.positions)
    ? [...existing.positions]
    : [];
  const { rows: syncedRows, changed: positionsChanged } = syncPositionRows(
    positionRows,
    category,
    office,
    ordained
  );
  if (positionsChanged) {
    updates.positions = syncedRows;
  }
  if (executiveFlagsChanged(existing, execFlags)) {
    updates.custom_is_executive = execFlags.custom_is_executive;
    updates.custom_is_executiveminister = execFlags.custom_is_executiveminister;
  }

  if (!Object.keys(updates).length) {
    stats.personsSkipped += 1;
    return;
  }

  await updateRecord("Person", existing.name, updates);
  cache.peopleByName.set(normalizeKey(fullName), existing.name);
  cache.peopleByName.set(normalizeKey(stripTitle(fullName)), existing.name);
  stats.personsUpdated += 1;
  console.log(`~ Person: ${fullName} (${existing.name})`);
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
    `[import-ministers] Syncing ${rows.length} rows to Person${DRY_RUN ? " (DRY RUN)" : ""}…`
  );
  console.log(`[import-ministers] Workbook: ${XLSX_PATH}`);

  const cache = await loadExistingMaps();

  for (const row of rows) {
    try {
      await upsertPerson(row, cache);
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
