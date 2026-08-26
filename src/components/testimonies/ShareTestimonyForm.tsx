"use client";

import { useState } from "react";
import FormSuccess from "@/components/get-involved/FormSuccess";
import PhoneInput from "@/components/get-involved/PhoneInput";
import { useTestimonySubmit } from "@/lib/useTestimonySubmit";

export default function ShareTestimonyForm() {
  const { submitted, submitting, testimonyTitle, error, handleSubmit, reset } =
    useTestimonySubmit();
  const [canContact, setCanContact] = useState(false);

  if (submitted) {
    return (
      <FormSuccess
        title="Thank you for sharing!"
        message={
          testimonyTitle
            ? `Your testimony "${testimonyTitle}" has been received and is pending review. Once approved, it may be published on the website.`
            : "Your testimony has been received. Our team will review it and may follow up if you asked to be contacted."
        }
        onReset={reset}
      />
    );
  }

  const errorMessage =
    error === "phone"
      ? "Please enter a phone number so we can contact you."
      : error === "email"
        ? "Please enter a valid email address."
        : error === "invalid"
          ? "Please check your details and try again."
          : error
            ? "Sorry, something went wrong. Please try again in a moment."
            : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
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
        name="title"
        required
        minLength={2}
        className="field sm:col-span-2"
        placeholder="Title for your testimony *"
        aria-label="Testimony title"
      />

      <input
        type="text"
        name="testifier_name"
        required
        minLength={2}
        className="field sm:col-span-2"
        placeholder="Your full name *"
        aria-label="Your name"
      />

      <div className="sm:col-span-2">
        <label
          htmlFor="date_of_testimony"
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted"
        >
          Date of testimony *
        </label>
        <input
          type="date"
          id="date_of_testimony"
          name="date_of_testimony"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="field w-full"
          aria-label="Date of testimony"
        />
      </div>

      <textarea
        rows={6}
        name="the_testimony"
        required
        minLength={10}
        className="field sm:col-span-2"
        placeholder="Share what God has done in your life *"
        aria-label="Your testimony"
      />

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
          Privacy &amp; contact
        </legend>
        <div className="space-y-3 text-sm">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="is_confidential"
              value="1"
              className="mt-1"
            />
            <span>
              Keep this testimony confidential (for pastoral review only, not
              for public sharing)
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="can_contact"
              value="1"
              checked={canContact}
              onChange={(e) => setCanContact(e.target.checked)}
              className="mt-1"
            />
            <span>I would like someone from the church to contact me</span>
          </label>
        </div>
      </fieldset>

      {canContact && (
        <>
          <PhoneInput
            required
            label="Phone number"
            className="sm:col-span-2"
          />
          <input
            type="email"
            name="email"
            className="field sm:col-span-2"
            placeholder="Email address (optional)"
            aria-label="Email address"
          />
        </>
      )}

      {errorMessage && (
        <p className="text-sm text-primary sm:col-span-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-fit sm:col-span-2 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Share my testimony"}
      </button>
    </form>
  );
}
