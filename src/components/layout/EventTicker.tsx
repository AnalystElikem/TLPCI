"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Verse {
  verse: string;
  ref: string;
}

// Bottom-right "Verse for Today" pop-up (desktop only, dismissible).
// Fetches the single verse of the day from the server, so the full verse
// list is never shipped to the browser.
export default function EventTicker() {
  const [visible, setVisible] = useState(true);
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/daily-verse")
      .then((r) => r.json())
      .then((v) => {
        if (active) setVerse(v);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!visible || !verse) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden max-w-xs bg-secondary text-white shadow-lg md:block">
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            Verse for Today
          </p>
          <p className="mt-1 text-xs italic leading-relaxed text-white/95">
            &ldquo;{verse.verse}&rdquo;
          </p>
          <p className="mt-1 text-xs font-bold">{verse.ref}</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-white/80 transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
