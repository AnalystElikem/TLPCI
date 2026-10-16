import type { RegionGroup } from "@/data/branchNetwork";

interface BranchSelectProps {
  network: RegionGroup[];
  name?: string;
  required?: boolean;
  className?: string;
  ariaLabel?: string;
}

// Reusable branch picker, populated from the full branch network and grouped
// by region. Use in any form that needs a branch selection.
export default function BranchSelect({
  network,
  name = "branch",
  required = false,
  className = "field",
  ariaLabel = "Choose a branch",
}: BranchSelectProps) {
  return (
    <select
      name={name}
      required={required}
      defaultValue=""
      aria-label={ariaLabel}
      className={className}
    >
      <option value="" disabled>
        Choose a branch
      </option>
      {network.map((region) => (
        <optgroup key={region.region} label={region.region}>
          {region.areas
            .flatMap((a) => a.branches)
            .map((branch, i) => (
              <option key={`${region.region}-${branch}-${i}`} value={branch}>
                {branch}
              </option>
            ))}
        </optgroup>
      ))}
    </select>
  );
}
