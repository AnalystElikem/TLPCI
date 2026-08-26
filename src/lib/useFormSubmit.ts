import { useState } from "react";
import type { FormEvent } from "react";

// Submits a form to our own /api/submit route, which creates a Website
// Submission record in ERPNext. Pass the form type so the record is labelled
// (e.g. "Contact", "Prayer Request"). The honeypot (_gotcha) and rate limiting
// are handled server-side.

export function useFormSubmit(formType: string) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("form_type", formType);
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
      };
      if (!res.ok || !json.ok) {
        setError(true);
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setError(false);
  }

  return { submitted, submitting, error, handleSubmit, reset };
}
