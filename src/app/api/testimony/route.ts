import { NextResponse } from "next/server";
import { submitTestimony, validateTestimonyInput } from "@/lib/testimony-submit";

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

function val(form: FormData, key: string, max = 200): string {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

function checked(form: FormData, key: string): boolean {
  const raw = String(form.get(key) ?? "").trim().toLowerCase();
  return raw === "1" || raw === "on" || raw === "yes" || raw === "true";
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (val(form, "_gotcha")) return NextResponse.json({ ok: true });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const canContact = checked(form, "can_contact");
  const input = {
    title: val(form, "title", 140),
    testifierName: val(form, "testifier_name", 120),
    dateOfTestimony: val(form, "date_of_testimony", 10),
    testimony: val(form, "the_testimony", 8000),
    isConfidential: checked(form, "is_confidential"),
    canContact,
    phone: canContact ? val(form, "phone", 40) : "",
    email: val(form, "email", 120),
  };

  const invalid = validateTestimonyInput(input);
  if (invalid) {
    return NextResponse.json(
      { ok: false, error: invalid === "phone" || invalid === "email" ? invalid : "invalid" },
      { status: 422 }
    );
  }

  const result = await submitTestimony(input);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    stored: result.stored,
    testimonyId: result.testimonyId,
    testimonyTitle: result.testimonyTitle,
  });
}
