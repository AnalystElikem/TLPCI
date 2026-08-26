"use client";

import { CheckCircle2 } from "lucide-react";
import { useSubscribeSubmit } from "@/lib/useSubscribeSubmit";

export default function NewsletterForm() {
  const { submitted, submitting, error, handleSubmit } = useSubscribeSubmit();

  if (submitted) {
    return (
      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/90">
        <CheckCircle2 className="h-4 w-4 text-secondary" />
        You&apos;re subscribed — thank you!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <input type="hidden" name="_subject" value="New newsletter signup — TLPCI website" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email address"
        aria-label="Email address"
        className="field flex-1 border-0 bg-white text-foreground placeholder:text-text-muted"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary shrink-0 disabled:opacity-60"
      >
        {submitting ? "…" : "Subscribe"}
      </button>
      {error && (
        <p className="text-sm text-white/90">Something went wrong — try again.</p>
      )}
    </form>
  );
}
