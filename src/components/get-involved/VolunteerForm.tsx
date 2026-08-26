"use client";

import FormSuccess from "./FormSuccess";
import PhoneInput from "./PhoneInput";
import FeedbackTypeSelect from "./FeedbackTypeSelect";
import { useContactSubmit } from "@/lib/useContactSubmit";

export default function VolunteerForm({ areas }: { areas: string[] }) {
  const { submitted, submitting, error, handleSubmit, reset } = useContactSubmit({
    defaultFeedbackType: "Volunteer",
    prepareFormData(data) {
      const area = String(data.get("area") ?? "").trim();
      const about = String(data.get("about") ?? "").trim();
      const lines = [
        area ? `Area of interest: ${area}` : "",
        about,
      ].filter(Boolean);
      data.set("comment", lines.join("\n\n") || "Volunteer interest submitted via website.");
    },
  });

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you for stepping up!"
        message="We've received your interest to serve. A ministry leader will be in touch about next steps."
        onReset={reset}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid h-fit gap-4 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
    >
      <input type="hidden" name="_subject" value="New volunteer interest — TLPCI website" />
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
        placeholder="Full name *"
        className="field md:col-span-2"
        aria-label="Full name"
      />
      <PhoneInput required className="md:col-span-2" />
      <input
        type="email"
        name="email"
        required
        placeholder="Email address *"
        className="field md:col-span-2"
        aria-label="Email address"
      />
      <FeedbackTypeSelect
        value="Volunteer"
        locked
        className="md:col-span-2"
      />
      <select
        name="area"
        required
        className="field md:col-span-2"
        aria-label="Area of interest"
        defaultValue=""
      >
        <option value="" disabled>
          Area of interest *
        </option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      <textarea
        rows={4}
        name="about"
        placeholder="Tell us about yourself and your availability"
        className="field md:col-span-2"
        aria-label="About yourself"
      />
      {error && (
        <p className="text-sm text-primary md:col-span-2">
          Sorry, something went wrong. Please try again in a moment.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-fit md:col-span-2 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit Interest"}
      </button>
    </form>
  );
}
