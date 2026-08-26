import { NextResponse } from "next/server";
import { submitSubscribe, validateSubscribeInput } from "@/lib/subscribe-submit";

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

  const input = { email: val("email", 120) };

  const invalid = validateSubscribeInput(input);
  if (invalid) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const result = await submitSubscribe(input);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.error === "invalid" ? 422 : 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored: result.stored,
    subscriberId: result.subscriberId,
    emailGroupMemberId: result.emailGroupMemberId,
  });
}
