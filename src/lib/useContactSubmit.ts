import { useState } from "react";
import type { FormEvent } from "react";

type Options = {
  defaultFeedbackType?: string;
  prepareFormData?: (data: FormData) => void;
};

export function useContactSubmit(options: Options = {}) {
  const { defaultFeedbackType = "", prepareFormData } = options;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (defaultFeedbackType && !data.get("feedback_type")) {
      data.set("feedback_type", defaultFeedbackType);
    }
    prepareFormData?.(data);
    setError(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        stored?: boolean;
      };
      if (!res.ok || !json.ok || !json.stored) {
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
