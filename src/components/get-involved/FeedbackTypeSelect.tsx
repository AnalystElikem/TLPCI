import { FEEDBACK_TYPES } from "@/lib/feedback-types";

export default function FeedbackTypeSelect({
  value,
  locked = false,
  className = "field sm:col-span-2",
}: {
  value?: string;
  locked?: boolean;
  className?: string;
}) {
  if (locked && value) {
    return (
      <>
        <input type="hidden" name="feedback_type" value={value} />
        <div className={className}>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
            Feedback type
          </label>
          <p className="rounded border border-border bg-muted-surface px-3 py-2.5 text-sm text-foreground">
            {value}
          </p>
        </div>
      </>
    );
  }

  return (
    <div className={className}>
      <label
        htmlFor="feedback_type"
        className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted"
      >
        Feedback type *
      </label>
      <select
        id="feedback_type"
        name="feedback_type"
        required
        defaultValue={value || "General"}
        className="field"
        aria-label="Feedback type"
      >
        {FEEDBACK_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
