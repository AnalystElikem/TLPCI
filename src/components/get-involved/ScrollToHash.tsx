"use client";

import { useEffect } from "react";

/** Scroll to a hash target after navigation (e.g. /plan-your-visit#plan-visit). */
export default function ScrollToHash({ id }: { id: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== `#${id}`) return;
    const el = document.getElementById(id);
    if (!el) return;
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [id]);

  return null;
}
