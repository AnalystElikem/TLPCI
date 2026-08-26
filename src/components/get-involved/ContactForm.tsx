"use client";

import FormSuccess from "./FormSuccess";
import PhoneInput from "./PhoneInput";
import FeedbackTypeSelect from "./FeedbackTypeSelect";
import { useContactSubmit } from "@/lib/useContactSubmit";

export default function ContactForm({
  defaultFeedbackType = "",
}: {
  defaultFeedbackType?: string;
}) {
  const { submitted, submitting, error, handleSubmit, reset } =
    useContactSubmit({ defaultFeedbackType });

  if (submitted) {
    return (
      <FormSuccess
        title="Message sent — thank you!"
        message="We've received your message and a member of our team will get back to you soon."
        onReset={reset}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
      <input type="hidden" name="_subject" value="New contact message — TLPCI website" />
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
        className="field"
        aria-label="Full name"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email address *"
        className="field"
        aria-label="Email address"
      />
      <PhoneInput className="sm:col-span-2" />
      <FeedbackTypeSelect
        value={defaultFeedbackType}
        locked={Boolean(defaultFeedbackType)}
      />
      <textarea
        rows={5}
        name="comment"
        required
        minLength={10}
        placeholder="Your message *"
        className="field sm:col-span-2"
        aria-label="Your message"
      />
      {error && (
        <p className="text-sm text-primary sm:col-span-2">
          Sorry, something went wrong sending your message. Please try again or
          email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-fit sm:col-span-2 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
