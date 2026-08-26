"use client";

import FormSuccess from "./FormSuccess";
import PrayerTypeSelect from "./PrayerTypeSelect";
import { usePrayerRequestSubmit } from "@/lib/usePrayerRequestSubmit";
import type { PrayerRequestTypeOption } from "@/lib/prayer-request-submit";

export default function PrayerRequestForm({
  types,
}: {
  types: PrayerRequestTypeOption[];
}) {
  const { submitted, submitting, error, handleSubmit, reset } =
    usePrayerRequestSubmit();

  if (submitted) {
    return (
      <FormSuccess
        title="Your request has been received"
        message="Thank you for trusting us with your prayer. Our team will stand with you in prayer."
        onReset={reset}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
      <input type="hidden" name="_subject" value="New prayer request — TLPCI website" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="sm:col-span-2">
        <h2 className="text-xl font-bold uppercase text-foreground">
          Share your request
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Fields marked optional may be left blank.
        </p>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        className="field"
        aria-label="Your name"
      />
      <input
        type="email"
        name="email"
        placeholder="Email address (optional)"
        className="field"
        aria-label="Email address"
      />
      <PrayerTypeSelect types={types} />
      <textarea
        rows={7}
        name="request"
        required
        minLength={5}
        placeholder="Share your prayer request *"
        className="field sm:col-span-2"
        aria-label="Prayer request"
      />
      <label className="flex items-center gap-2 text-sm text-text-muted sm:col-span-2">
        <input type="checkbox" name="confidential" value="Yes" className="accent-primary" />
        Keep this request private (not shared with the church body)
      </label>
      <label className="flex items-center gap-2 text-sm text-text-muted sm:col-span-2">
        <input type="checkbox" name="contact_me" value="Yes" className="accent-primary" />
        I would like a pastoral team member to contact me (marked urgent)
      </label>
      {error && (
        <p className="text-sm text-primary sm:col-span-2">
          Sorry, something went wrong. Please try again in a moment.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-fit sm:col-span-2 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Prayer Request"}
      </button>
    </form>
  );
}
