import { NextResponse } from "next/server";
import { isFeedbackType } from "@/lib/feedback-types";
import { submitContact, validateContactInput } from "@/lib/contact-submit";

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

  const feedbackType = val("feedback_type", 120) || val("subject", 120);
  if (!isFeedbackType(feedbackType)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const input = {
    name: val("name", 120),
    phone: val("phone", 40) || undefined,
    email: val("email", 120),
    feedbackType,
    comment: val("comment", 5000) || val("message", 5000),
  };

  const invalid = validateContactInput(input);
  if (invalid) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const result = await submitContact(input);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.error === "invalid" ? 422 : 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored: result.stored,
    feedbackId: result.feedbackId,
  });
}
