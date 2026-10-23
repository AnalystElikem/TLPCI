import { NextResponse } from "next/server";

// Receives Content-Security-Policy violation reports from browsers (the policy
// is in report-only mode, see next.config.ts). Reports are written to the
// server log (Vercel > project > Logs, search "csp-violation") and nothing is
// stored. The endpoint is public, so it is kept small and cheap: tiny body
// limit, a per-address cap, only a few safe fields logged, always answers 204.

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return false;
}

// Keep only scheme + host + path of a URL (drop query strings and fragments,
// which can carry personal data), and cap the length.
function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const u = new URL(value);
    return `${u.origin}${u.pathname}`.slice(0, 200);
  } catch {
    return value.replace(/[\r\n]/g, " ").slice(0, 60); // e.g. "inline", "eval"
  }
}

const NO_CONTENT = () => new NextResponse(null, { status: 204 });

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NO_CONTENT();

  const length = Number(req.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return NO_CONTENT();

  let raw = "";
  try {
    raw = (await req.text()).slice(0, MAX_BODY_BYTES);
  } catch {
    return NO_CONTENT();
  }

  try {
    const data = JSON.parse(raw);
    // Older format: { "csp-report": {...} }. Newer Reporting API: [ { body: {...} } ].
    const list: Record<string, unknown>[] = Array.isArray(data)
      ? data.map((r) => (r && typeof r === "object" ? (r as { body?: Record<string, unknown> }).body ?? {} : {}))
      : [(data as { "csp-report"?: Record<string, unknown> })["csp-report"] ?? {}];

    for (const r of list.slice(0, 5)) {
      const directive = String(
        r["violated-directive"] ?? r["effectiveDirective"] ?? r["effective-directive"] ?? "",
      ).slice(0, 60);
      console.warn(
        "csp-violation",
        JSON.stringify({
          directive,
          blocked: clean(r["blocked-uri"] ?? r["blockedURL"]),
          page: clean(r["document-uri"] ?? r["documentURL"]),
        }),
      );
    }
  } catch {
    // not JSON — ignore
  }
  return NO_CONTENT();
}

// Browsers only POST; anything else gets a plain 405 from Next.
