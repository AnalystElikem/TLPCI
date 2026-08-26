import { useState } from "react";
import type { FormEvent } from "react";

export function useTestimonySubmit() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [testimonyId, setTestimonyId] = useState<string | null>(null);
  const [testimonyTitle, setTestimonyTitle] = useState<string | null>(null);
  const [error, setError] = useState<
    false | "generic" | "invalid" | "phone" | "email"
  >(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError(false);
    setTestimonyId(null);
    setTestimonyTitle(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimony", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        stored?: boolean;
        testimonyId?: string;
        testimonyTitle?: string;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        if (json.error === "phone") setError("phone");
        else if (json.error === "email") setError("email");
        else if (json.error === "invalid") setError("invalid");
        else setError("generic");
        return;
      }
      setTestimonyId(json.testimonyId ?? null);
      setTestimonyTitle(json.testimonyTitle ?? null);
      setSubmitted(true);
    } catch {
      setError("generic");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setTestimonyId(null);
    setTestimonyTitle(null);
    setError(false);
  }

  return { submitted, submitting, testimonyId, testimonyTitle, error, handleSubmit, reset };
}
