import { erpnextCreateResult, erpnextWriteConfigured } from "@/lib/erpnext";

export type TestimonySubmitInput = {
  title: string;
  testifierName: string;
  dateOfTestimony: string;
  testimony: string;
  isConfidential: boolean;
  canContact: boolean;
  phone?: string;
  email?: string;
};

export type TestimonySubmitResult =
  | { ok: true; stored: boolean; testimonyId?: string; testimonyTitle?: string }
  | { ok: false; error: "invalid" | "rate" | "server" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function testimonyHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!paragraphs.length) return "";
  return paragraphs
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function validateTestimonyInput(
  input: TestimonySubmitInput
): "title" | "name" | "date" | "testimony" | "phone" | "email" | null {
  if (!input.title.trim() || input.title.trim().length < 2) return "title";
  if (!input.testifierName.trim() || input.testifierName.trim().length < 2) {
    return "name";
  }
  if (!DATE_RE.test(input.dateOfTestimony)) return "date";
  if (!input.testimony.trim() || input.testimony.trim().length < 10) {
    return "testimony";
  }
  if (input.canContact && !input.phone?.trim()) return "phone";
  if (input.email?.trim() && !EMAIL_RE.test(input.email.trim())) return "email";
  return null;
}

export async function submitTestimony(
  input: TestimonySubmitInput
): Promise<TestimonySubmitResult> {
  const invalid = validateTestimonyInput(input);
  if (invalid) return { ok: false, error: "invalid" };

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const result = await erpnextCreateResult<{ name: string }>("Testimonies", {
    title: input.title.trim(),
    testifier_name: input.testifierName.trim(),
    date_of_testimony: input.dateOfTestimony,
    the_testimony: testimonyHtml(input.testimony.trim()),
    is_confidential: input.isConfidential ? 1 : 0,
    can_contact: input.canContact ? 1 : 0,
    phone_number: input.canContact ? (input.phone?.trim() ?? "") : "",
    email: input.email?.trim() ?? "",
    is_approved: 0,
    publish: 0,
  });

  if (!result.ok || !result.data?.name) {
    return { ok: false, error: "server" };
  }

  return {
    ok: true,
    stored: true,
    testimonyId: result.data.name,
    testimonyTitle: input.title.trim(),
  };
}
