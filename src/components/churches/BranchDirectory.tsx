"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { branchNetwork, totalBranches } from "@/data/branchNetwork";

export default function BranchDirectory() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const regions = ["All", ...branchNetwork.map((r) => r.region)];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return branchNetwork
      .filter((r) => activeRegion === "All" || r.region === activeRegion)
      .map((r) => ({
        ...r,
        areas: r.areas
          .map((a) => ({
            ...a,
            branches: q
              ? a.branches.filter((b) => b.toLowerCase().includes(q))
              : a.branches,
          }))
          .filter((a) => a.branches.length > 0),
      }))
      .filter((r) => r.areas.length > 0);
  }, [query, activeRegion]);

  const shown = results.reduce(
    (n, r) => n + r.areas.reduce((m, a) => m + a.branches.length, 0),
    0
  );

  return (
    <div>
      {/* Search */}
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your town or community…"
            className="w-full border border-border bg-white py-4 pl-12 pr-4 text-sm outline-none transition-colors focus:border-primary"
            aria-label="Search branch locations"
          />
        </div>
        <p className="mt-3 text-center text-sm text-text-muted">
          {query || activeRegion !== "All"
            ? `Showing ${shown} of ${totalBranches} branches`
            : `${totalBranches} branches across Ghana and beyond`}
        </p>
      </div>

      {/* Region filter */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              activeRegion === region
                ? "bg-foreground text-white"
                : "bg-white text-text-muted hover:text-foreground"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Results */}
      {shown === 0 ? (
        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="text-text-muted">
            We couldn&apos;t find a branch matching{" "}
            <span className="font-semibold text-foreground">
              &ldquo;{query}&rdquo;
            </span>
            . We may still be near you — reach out and we&apos;ll help you find
            the closest congregation.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Contact Us
          </Link>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {results.map((region) => (
            <div key={region.region}>
              <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-3">
                <h3 className="font-serif text-xl font-bold text-foreground md:text-2xl">
                  {region.region}
                </h3>
                <span className="text-sm text-text-muted">
                  {region.areas.reduce((m, a) => m + a.branches.length, 0)}{" "}
                  branches
                </span>
              </div>

              <div className="space-y-6">
                {region.areas.map((area) => (
                  <div key={area.area}>
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                      <MapPin className="h-3.5 w-3.5" />
                      {area.area}
                    </p>
                    <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
                      {area.branches.map((branch) => (
                        <li
                          key={`${area.area}-${branch}`}
                          className="border-l-2 border-primary bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-sm"
                        >
                          {branch}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
