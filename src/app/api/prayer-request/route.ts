import { NextResponse } from "next/server";
import {
  submitPrayerRequest,
  validatePrayerRequestInput,
} from "@/lib/prayer-request-submit";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function checked(form: FormData, key: string): boolean {
  const value = String(form.get(key) ?? "").trim().toLowerCase();
  return value === "yes" || value === "on" || value === "1" || value === "true";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const val = (k: string, max = 200) =>
    String(form.get(k) ?? "").trim().slice(0, max);

  if (val("_gotcha")) return NextResponse.json({ ok: true });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const input = {
    name: val("name", 120) || undefined,
    email: val("email", 120) || undefined,
    type: val("category", 120) || val("type", 120),
    request: val("request", 5000),
    isPrivate: checked(form, "confidential"),
    contactMe: checked(form, "contact_me"),
  };

  const invalid = validatePrayerRequestInput(input);
  if (invalid) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const result = await submitPrayerRequest(input);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.error === "invalid" ? 422 : 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored: result.stored,
    prayerRequestId: result.prayerRequestId,
  });
}
