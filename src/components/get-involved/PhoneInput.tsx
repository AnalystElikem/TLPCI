"use client";

import { useState } from "react";

// Country dialing codes — Ghana first, then common countries for the church's
// local and diaspora reach. Add more as needed.
const CODES: { country: string; dial: string }[] = [
  { country: "Ghana", dial: "+233" },
  { country: "Nigeria", dial: "+234" },
  { country: "Togo", dial: "+228" },
  { country: "Côte d'Ivoire", dial: "+225" },
  { country: "United States", dial: "+1" },
  { country: "United Kingdom", dial: "+44" },
  { country: "Canada", dial: "+1" },
  { country: "Germany", dial: "+49" },
  { country: "Italy", dial: "+39" },
  { country: "Netherlands", dial: "+31" },
  { country: "France", dial: "+33" },
  { country: "Spain", dial: "+34" },
  { country: "South Africa", dial: "+27" },
  { country: "United Arab Emirates", dial: "+971" },
  { country: "Australia", dial: "+61" },
  { country: "Other", dial: "" },
];

export default function PhoneInput({
  required = false,
  label = "Phone number",
  className = "",
}: {
  required?: boolean;
  label?: string;
  className?: string;
}) {
  const [dial, setDial] = useState("+233");
  const [number, setNumber] = useState("");

  const combined = number.trim()
    ? `${dial}${dial ? " " : ""}${number.trim()}`
    : "";

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Country code — fixed width so it can't swallow the number field */}
      <div className="w-32 shrink-0 sm:w-40">
        <select
          aria-label="Country code"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="field w-full"
        >
          {CODES.map((c) => (
            <option key={`${c.country}-${c.dial}`} value={c.dial}>
              {c.dial ? `${c.dial} ${c.country}` : c.country}
            </option>
          ))}
        </select>
      </div>

      {/* Number — takes the remaining space; min-w-0 lets it shrink cleanly */}
      <div className="min-w-0 flex-1">
        <input
          type="tel"
          inputMode="tel"
          required={required}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          pattern="[0-9()\-\s]{6,20}"
          title="Enter a valid phone number (digits only, 6–20 characters)"
          placeholder={required ? `${label} *` : label}
          aria-label={label}
          className="field w-full"
        />
      </div>

      {/* Combined value that actually gets submitted */}
      <input type="hidden" name="phone" value={combined} />
    </div>
  );
}
