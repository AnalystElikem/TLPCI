// Server-side ERPNext (Frappe) REST client.
//
// Reads content from ERPNext when it is configured (env vars set) and returns
// null / empty on ANY problem — missing config, network error, bad response —
// so callers can quietly fall back to the in-code defaults. It never throws.
//
// Env vars (set in .env.local locally and in Vercel → Settings → Environment
// Variables). See .env.local.example.
//   ERPNEXT_URL         e.g. https://new---tlpci.nvi.frappe.cloud
//   ERPNEXT_API_KEY     the website user's API key
//   ERPNEXT_API_SECRET  the website user's API secret

const BASE_URL = (process.env.ERPNEXT_URL || "").replace(/\/+$/, "");
const API_KEY = process.env.ERPNEXT_API_KEY || "";
const API_SECRET = process.env.ERPNEXT_API_SECRET || "";

// Separate, create-only credentials for writing form submissions into ERPNext.
// Server-only — never referenced from client code.
const WRITE_API_KEY = process.env.ERPNEXT_WRITE_API_KEY || "";
const WRITE_API_SECRET = process.env.ERPNEXT_WRITE_API_SECRET || "";

// How often (seconds) cached ERPNext data is refreshed. 5 minutes — edits in
// ERPNext appear on the site within this window, no rebuild needed.
export const ERPNEXT_REVALIDATE = 300;

// Give up on a slow/unreachable ERPNext quickly and fall back to in-code content
// rather than letting a page render hang.
const REQUEST_TIMEOUT_MS = 8000;

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif|svg)(\?.*)?$/i;

export function erpnextConfigured(): boolean {
  return Boolean(BASE_URL && API_KEY && API_SECRET);
}

function authHeaders() {
  return {
    Authorization: `token ${API_KEY}:${API_SECRET}`,
    Accept: "application/json",
  };
}

type FetchOptions = {
  /** Skip Next.js data cache — use when content must appear immediately after ERPNext edits. */
  fresh?: boolean;
};

// fetch() with a hard timeout. Returns null on timeout or any network error.
async function timedFetch(
  url: string,
  options: FetchOptions = {}
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      headers: authHeaders(),
      signal: controller.signal,
      ...(options.fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: ERPNEXT_REVALIDATE } }),
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

type ListOptions = FetchOptions & {
  fields?: string[];
  filters?: unknown[];
  orderBy?: string;
  limit?: number;
};

/** Fetch a list of records for a DocType. Returns null on any failure. */
export async function erpnextList<T = Record<string, unknown>>(
  doctype: string,
  options: ListOptions = {}
): Promise<T[] | null> {
  if (!erpnextConfigured()) return null;

  const params = new URLSearchParams();
  params.set("fields", JSON.stringify(options.fields ?? ["*"]));
  if (options.filters && options.filters.length) {
    params.set("filters", JSON.stringify(options.filters));
  }
  if (options.orderBy) params.set("order_by", options.orderBy);
  // 0 = no limit (return all matching rows)
  params.set("limit_page_length", String(options.limit ?? 0));

  const url = `${BASE_URL}/api/resource/${encodeURIComponent(
    doctype
  )}?${params.toString()}`;

  const res = await timedFetch(url, options);
  if (!res || !res.ok) return null;
  try {
    const json = (await res.json()) as { data?: T[] };
    return json?.data ?? null;
  } catch {
    return null;
  }
}

/** Fetch a single record by name (also used for Single DocTypes). Null on failure. */
export async function erpnextDoc<T = Record<string, unknown>>(
  doctype: string,
  name: string,
  options: FetchOptions = {}
): Promise<T | null> {
  if (!erpnextConfigured()) return null;
  const url = `${BASE_URL}/api/resource/${encodeURIComponent(
    doctype
  )}/${encodeURIComponent(name)}`;
  const res = await timedFetch(url, options);
  if (!res || !res.ok) return null;
  try {
    const json = (await res.json()) as { data?: T };
    return json?.data ?? null;
  } catch {
    return null;
  }
}

/** Image attachments on a specific record, oldest first. Returns [] on failure. */
export async function erpnextAttachments(
  doctype: string,
  name: string
): Promise<string[]> {
  const files = await erpnextList<{ file_url?: string }>("File", {
    fields: ["file_url", "creation"],
    filters: [
      ["attached_to_doctype", "=", doctype],
      ["attached_to_name", "=", name],
      ["is_folder", "=", 0],
    ],
    orderBy: "creation asc",
  });
  if (!files) return [];
  return files
    .map((f) => f.file_url || "")
    .filter((u) => IMAGE_EXT.test(u))
    .map((u) => absoluteFileUrl(u))
    .filter((u): u is string => Boolean(u));
}

/** Turn a Frappe file path ("/files/foo.jpg") into an absolute URL. */
export function absoluteFileUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) {
    try {
      const u = new URL(path);
      u.pathname = u.pathname
        .split("/")
        .map((segment, i) =>
          i === 0 ? segment : encodeURIComponent(decodeURIComponent(segment))
        )
        .join("/");
      return u.href;
    } catch {
      return path;
    }
  }
  if (!BASE_URL) return null;
  try {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const encoded = normalized
      .split("/")
      .map((segment, i) =>
        i === 0 ? segment : encodeURIComponent(decodeURIComponent(segment))
      )
      .join("/");
    return new URL(encoded, BASE_URL).href;
  } catch {
    return null;
  }
}

/**
 * Story and notes text written in ERPNext links to its files with relative
 * paths such as src="/files/photo.jpg". Those only work on the ERPNext site,
 * so on this website they would be broken images. Point them at ERPNext.
 */
export function absolutizeHtmlFileUrls(html?: string | null): string {
  if (!html) return "";
  return html.replace(
    /\b(src|href)=(["'])\s*(\/?(?:private\/)?files\/[^"']*)\2/gi,
    (match, attr: string, quote: string, path: string) => {
      const url = absoluteFileUrl(path);
      return url ? `${attr}=${quote}${url}${quote}` : match;
    }
  );
}

/** Whether write (create) credentials are configured. */
export function erpnextWriteConfigured(): boolean {
  return Boolean(BASE_URL && WRITE_API_KEY && WRITE_API_SECRET);
}

/**
 * Create a record in ERPNext using the create-only write user. Returns true on
 * success. Used server-side only (form submissions → Website Submission).
 */
export async function erpnextCreate(
  doctype: string,
  data: Record<string, unknown>
): Promise<boolean> {
  const result = await erpnextCreateResult(doctype, data);
  return result.ok;
}

type CreateResult<T = Record<string, unknown>> =
  | { ok: true; data: T }
  | { ok: false; message?: string };

/** Create a record and return the created document or an error message. */
export async function erpnextCreateResult<T = Record<string, unknown>>(
  doctype: string,
  data: Record<string, unknown>
): Promise<CreateResult<T>> {
  if (!erpnextWriteConfigured()) return { ok: false, message: "not_configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(
      `${BASE_URL}/api/resource/${encodeURIComponent(doctype)}`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${WRITE_API_KEY}:${WRITE_API_SECRET}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        cache: "no-store",
      }
    );
    const json = (await res.json().catch(() => ({}))) as {
      data?: T;
      exception?: string;
      _server_messages?: string;
    };
    if (res.ok && json.data) return { ok: true, data: json.data };
    const message =
      extractFrappeMessage(json._server_messages) ||
      json.exception ||
      `http_${res.status}`;
    return { ok: false, message };
  } catch {
    return { ok: false, message: "network_error" };
  } finally {
    clearTimeout(timer);
  }
}

function extractFrappeMessage(raw?: string): string | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as string[];
    const first = parsed[0] ? (JSON.parse(parsed[0]) as { message?: string }) : null;
    return first?.message;
  } catch {
    return undefined;
  }
}

/** Hostname of the ERPNext site, for next.config image allow-listing. */
export function erpnextHostname(): string | null {
  try {
    return BASE_URL ? new URL(BASE_URL).hostname : null;
  } catch {
    return null;
  }
}
