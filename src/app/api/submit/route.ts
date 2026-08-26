import { NextResponse } from "next/server";
import { erpnextCreate, erpnextWriteConfigured } from "@/lib/erpnext";

// Receives generic website forms (Contact, Prayer, Volunteer, Plan a Visit)
// and creates a single "Website Submission" record in ERPNext. Newsletter
// signups use /api/subscribe instead (Email Group Member + Subscribers).

export const runtime = "nodejs";

// Very light in-memory rate limit per IP (best-effort; resets on cold start).
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
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Read + trim + cap length so oversized payloads can't be used to abuse the
  // ERPNext record.
  const val = (k: string, max = 200) =>
    String(form.get(k) ?? "").trim().slice(0, max);

  // Honeypot: real users never fill this hidden field. Pretend success so bots
  // don't learn they were caught.
  if (val("_gotcha")) return NextResponse.json({ ok: true });

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = val("email");
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 422 });
  }

  const visitDate = val("visit_date");
  // ERPNext Date fields want "YYYY-MM-DD" or null — never an empty string.
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(visitDate) ? visitDate : null;

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  }

  const payload = {
    form_type: val("form_type") || "Contact",
    full_name: val("name"),
    email,
    phone: val("phone", 40),
    subject: val("subject"),
    // The main text field differs per form — take whichever was sent.
    message:
      val("message", 5000) ||
      val("request", 5000) ||
      val("about", 5000) ||
      val("details", 5000),
    category: val("category") || val("area"),
    branch: val("branch"),
    visit_date: validDate,
    confidential: val("confidential") ? 1 : 0,
    contact_me: val("contact_me") ? 1 : 0,
  };

  // Require at least an email or a name plus some content, so empty/garbage
  // posts don't create records.
  if (!payload.email && !payload.full_name) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  // Not configured yet (no write key): accept gracefully so forms still work in
  // development and nothing breaks before ERPNext is wired.
  if (!erpnextWriteConfigured()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const created = await erpnextCreate("Website Submission", payload);
  if (!created) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true, stored: true });
}
