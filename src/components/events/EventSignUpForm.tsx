"use client";

import { useMemo, useState } from "react";
import FormSuccess from "@/components/get-involved/FormSuccess";
import PhoneInput from "@/components/get-involved/PhoneInput";
import { useEventSignUp } from "@/lib/useEventSignUp";
import { formatEventSignUpLabel, type EventItem } from "@/lib/content-source";

type Props = {
  events: EventItem[];
  selectedEventId?: string;
  lockEvent?: boolean;
};

function formatEventDate(event: EventItem): string {
  const hasEndDate = Boolean(event.endDate?.trim());
  const dateLine = hasEndDate
    ? `${event.startDate || event.date} – ${event.endDate}`
    : event.startDate || event.date;
  const timeLine = event.allDay
    ? "All day"
    : [event.startTime, event.endTime].filter(Boolean).join(" – ") || event.time;
  return [dateLine, timeLine].filter(Boolean).join(" · ");
}

function formatEventLocation(event: EventItem): string {
  return event.address || event.location || "Location to be announced";
}

export default function EventSignUpForm({
  events,
  selectedEventId,
  lockEvent = false,
}: Props) {
  const { submitted, submitting, signUpId, error, handleSubmit, reset } =
    useEventSignUp();
  const initialId =
    selectedEventId && events.some((e) => String(e.id) === selectedEventId)
      ? selectedEventId
      : events[0]
        ? String(events[0].id)
        : "";

  const [eventId, setEventId] = useState(initialId);

  const selectedEvent = useMemo(
    () => events.find((e) => String(e.id) === eventId) ?? events[0],
    [events, eventId]
  );

  if (submitted) {
    return (
      <FormSuccess
        title="You're signed up!"
        message={
          signUpId
            ? `Your registration is saved in Church IT as Function Sign-Up ${signUpId}. You can also find it on the event's Attendance tab in ERPNext.`
            : "Thank you — we've received your registration. We look forward to seeing you at the event."
        }
        onReset={reset}
      />
    );
  }

  if (!events.length) {
    return (
      <div className="bg-white p-8 text-center shadow-sm">
        <p className="text-text-muted">
          No upcoming events are open for sign-up right now. Please check back soon.
        </p>
      </div>
    );
  }

  const errorMessage =
    error === "duplicate"
      ? "This phone number is already registered for this event."
      : error === "event"
        ? "This event is no longer accepting sign-ups."
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

      <div className="sm:col-span-2">
        <label
          htmlFor="event_function"
          className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted"
        >
          Event *
        </label>
        {lockEvent && selectedEvent ? (
          <>
            <input
              type="text"
              readOnly
              value={formatEventSignUpLabel(selectedEvent)}
              className="field bg-muted-surface"
              aria-label="Event"
            />
            <input type="hidden" name="function" value={String(selectedEvent.id)} />
          </>
        ) : (
          <select
            id="event_function"
            name="function"
            required
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="field w-full"
            aria-label="Select event"
          >
            {events.map((event) => (
              <option key={event.id} value={String(event.id)}>
                {formatEventSignUpLabel(event)}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedEvent && (
        <>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
              Date
            </label>
            <input
              type="text"
              readOnly
              value={formatEventDate(selectedEvent)}
              className="field bg-muted-surface"
              aria-label="Event date"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
              Location
            </label>
            <input
              type="text"
              readOnly
              value={formatEventLocation(selectedEvent)}
              className="field bg-muted-surface"
              aria-label="Event location"
            />
          </div>
        </>
      )}

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

      <input
        type="email"
        name="email"
        className="field sm:col-span-2"
        placeholder="Email address (optional)"
        aria-label="Email address"
      />

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
          Are you a church member? *
        </legend>
        <div className="flex flex-wrap gap-6 text-sm">
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="is_member" value="yes" required />
            Yes, I am a member
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="radio" name="is_member" value="no" required />
            No, I am not a member
          </label>
        </div>
      </fieldset>

      <textarea
        rows={4}
        name="notes"
        className="field sm:col-span-2"
        placeholder="Notes or questions (optional)"
        aria-label="Notes"
      />

      {errorMessage && (
        <p className="text-sm text-primary sm:col-span-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-fit sm:col-span-2 disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Sign up to attend"}
      </button>
    </form>
  );
}
