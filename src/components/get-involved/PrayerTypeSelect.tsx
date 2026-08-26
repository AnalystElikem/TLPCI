import type { PrayerRequestTypeOption } from "@/lib/prayer-request-submit";

export default function PrayerTypeSelect({
  types,
  className = "sm:col-span-2",
}: {
  types: PrayerRequestTypeOption[];
  className?: string;
}) {
  if (!types.length) {
    return (
      <p className={`text-sm text-text-muted ${className}`}>
        Prayer types are not available right now. Please try again later.
      </p>
    );
  }

  return (
    <div className={className}>
      <label
        htmlFor="prayer_type"
        className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted"
      >
        Prayer type *
      </label>
      <select
        id="prayer_type"
        name="category"
        required
        defaultValue={types[0].value}
        className="field cursor-pointer"
        aria-label="Prayer type"
      >
        {types.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}
