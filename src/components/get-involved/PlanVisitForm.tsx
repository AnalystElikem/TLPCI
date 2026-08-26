"use client";

import BranchSelect from "./BranchSelect";
import FormSuccess from "./FormSuccess";
import PhoneInput from "./PhoneInput";
import { usePlanVisitSubmit } from "@/lib/usePlanVisitSubmit";

export default function PlanVisitForm() {
  const { submitted, submitting, visitationLogId, error, handleSubmit, reset } =
    usePlanVisitSubmit();

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you!"
        message={
          visitationLogId
            ? `Your first-visit request is saved in Church IT. A local host will reach out to welcome you.`
            : "We've received your visit plan. A local host will reach out to welcome you and help you settle in."
        }
        onReset={reset}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-fit gap-4 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
      <input type="hidden" name="_subject" value="New visit plan — TLPCI website" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="text"
        name="name"
        required
        minLength={2}
        className="field sm:col-span-2"
        placeholder="Full name *"
        aria-label="Full name"
      />
      <PhoneInput required className="sm:col-span-2" />
      <div className="flex min-w-0 flex-col">
        <label
          htmlFor="visit_branch"
          className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted"
        >
          Which branch?
        </label>
        <BranchSelect required className="field" />
      </div>
      <div className="flex min-w-0 flex-col">
        <label
          htmlFor="visit_date"
          className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted"
        >
          Preferred visit date *
        </label>
        <input
          type="date"
          id="visit_date"
          name="visit_date"
          required
          className="field"
          aria-label="Visit date"
        />
      </div>
      <textarea
        rows={4}
        name="details"
        className="field sm:col-span-2"
        placeholder="Children attending, accessibility needs, or questions (optional)"
        aria-label="Additional visit details"
      />
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
        {submitting ? "Sending…" : "Plan My Visit"}
      </button>
    </form>
  );
}
