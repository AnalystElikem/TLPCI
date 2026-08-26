import { useState } from "react";
import type { FormEvent } from "react";

export function useEventSignUp() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signUpId, setSignUpId] = useState<string | null>(null);
  const [error, setError] = useState<
    false | "generic" | "duplicate" | "event" | "invalid"
  >(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError(false);
    setSignUpId(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/event-signup", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        stored?: boolean;
        signUpId?: string;
        error?: string;
      };
      if (!res.ok || !json.ok || !json.stored) {
        if (json.error === "duplicate") setError("duplicate");
        else if (json.error === "event") setError("event");
        else if (json.error === "invalid") setError("invalid");
        else setError("generic");
        return;
      }
      setSignUpId(json.signUpId ?? null);
      setSubmitted(true);
    } catch {
      setError("generic");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setSignUpId(null);
    setError(false);
  }

  return { submitted, submitting, signUpId, error, handleSubmit, reset };
}
