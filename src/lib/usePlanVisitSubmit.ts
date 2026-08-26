import { useState } from "react";
import type { FormEvent } from "react";

export function usePlanVisitSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [visitationLogId, setVisitationLogId] = useState<string | null>(null);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError(false);
    setVisitationLogId(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/plan-visit", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        stored?: boolean;
        visitationLogId?: string;
      };
      if (!res.ok || !json.ok || !json.stored) {
        setError(true);
        return;
      }
      setVisitationLogId(json.visitationLogId ?? null);
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
    setVisitationLogId(null);
    setError(false);
  }

  return { submitted, submitting, visitationLogId, error, handleSubmit, reset };
}
