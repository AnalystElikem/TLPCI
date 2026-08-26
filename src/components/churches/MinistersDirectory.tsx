"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { ministerGroups, totalMinisters } from "@/data/ministers";

export default function MinistersDirectory() {
  const [query, setQuery] = useState("");
  const [activeRank, setActiveRank] = useState("All");
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const ranks = ["All", ...ministerGroups.map((g) => g.rank)];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ministerGroups
      .filter((g) => activeRank === "All" || g.rank === activeRank)
      .map((g) => ({
        ...g,
        ministers: q
          ? g.ministers.filter(
              (m) =>
                m.name.toLowerCase().includes(q) ||
                m.branch?.toLowerCase().includes(q) ||
                m.office?.toLowerCase().includes(q)
            )
          : g.ministers,
      }))
      .filter((g) => g.ministers.length > 0);
  }, [query, activeRank]);

  const shown = results.reduce((n, g) => n + g.ministers.length, 0);
  const searching = query.trim() !== "";

  // A section is expanded when: searching, a single rank is selected, or the
  // user has opened it. Otherwise collapsed (to cut scrolling under "All").
  const isOpen = (rank: string) =>
    searching || activeRank !== "All" || openSet.has(rank);

  const toggle = (rank: string) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(rank) ? next.delete(rank) : next.add(rank);
      return next;
    });

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
            placeholder="Search by name, branch, or office…"
            className="w-full border border-border bg-white py-4 pl-12 pr-4 text-sm outline-none transition-colors focus:border-primary"
            aria-label="Search ministers"
          />
        </div>
        <p className="mt-3 text-center text-sm text-text-muted">
          {query || activeRank !== "All"
            ? `Showing ${shown} of ${totalMinisters} ministers`
            : `${totalMinisters} ministers serving across the church`}
        </p>
      </div>

      {/* Rank filter */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {ranks.map((rank) => (
          <button
            key={rank}
            type="button"
            onClick={() => setActiveRank(rank)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              activeRank === rank
                ? "bg-foreground text-white"
                : "bg-white text-text-muted hover:text-foreground"
            }`}
          >
            {rank}
          </button>
        ))}
      </div>

      {/* Results */}
      {shown === 0 ? (
        <p className="mt-12 text-center text-text-muted">
          No ministers match{" "}
          <span className="font-semibold text-foreground">
            &ldquo;{query}&rdquo;
          </span>
          .
        </p>
      ) : (
        <div className="mt-10 space-y-4">
          {results.map((group) => {
            const open = isOpen(group.rank);
            return (
              <div key={group.rank} className="border border-border bg-white">
                <button
                  type="button"
                  onClick={() => toggle(group.rank)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-muted-surface"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-serif text-lg font-bold text-foreground md:text-xl">
                      {group.rank}
                    </span>
                    <span className="text-sm text-text-muted">
                      {group.ministers.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <ul className="grid gap-3 border-t border-border bg-muted-surface p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.ministers.map((m) => (
                      <li
                        key={`${group.rank}-${m.name}`}
                        className="border-l-2 border-primary bg-white p-4 shadow-sm"
                      >
                        <p className="font-bold text-foreground">{m.name}</p>
                        {m.office && (
                          <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-primary">
                            {m.office}
                          </p>
                        )}
                        {(m.branch || m.ordained) && (
                          <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
                            {m.branch && (
                              <>
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                                {m.branch}
                              </>
                            )}
                            {m.ordained && (
                              <span className="ml-auto text-xs text-text-muted">
                                Ord. {m.ordained}
                              </span>
                            )}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
