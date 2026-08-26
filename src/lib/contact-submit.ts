import { isFeedbackType } from "@/lib/feedback-types";
import { erpnextCreateResult, erpnextWriteConfigured } from "@/lib/erpnext";

export type ContactSubmitInput = {
  name: string;
  phone?: string;
  email: string;
  feedbackType: string;
  comment: string;
};

export type ContactSubmitResult =
  | { ok: true; stored: boolean; feedbackId?: string }
  | { ok: false; error: "invalid" | "server" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function commentHtml(text: string): string {
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

export function validateContactInput(
  input: ContactSubmitInput
): "name" | "email" | "feedbackType" | "comment" | null {
  if (!input.name.trim() || input.name.trim().length < 2) return "name";
  if (!input.email.trim() || !EMAIL_RE.test(input.email.trim())) return "email";
  if (!input.feedbackType.trim() || !isFeedbackType(input.feedbackType.trim())) {
    return "feedbackType";
  }
  if (!input.comment.trim() || input.comment.trim().length < 10) return "comment";
  return null;
}

export async function submitContact(
  input: ContactSubmitInput
): Promise<ContactSubmitResult> {
  const invalid = validateContactInput(input);
  if (invalid) return { ok: false, error: "invalid" };

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const result = await erpnextCreateResult<{ name: string }>("Feedback", {
    name1: input.name.trim(),
    phone_number: input.phone?.trim() ?? "",
    email: input.email.trim(),
    feedback_type: input.feedbackType.trim(),
    comment: commentHtml(input.comment.trim()),
  });

  if (!result.ok || !result.data?.name) {
    return { ok: false, error: "server" };
  }

  return {
    ok: true,
    stored: true,
    feedbackId: result.data.name,
  };
}
