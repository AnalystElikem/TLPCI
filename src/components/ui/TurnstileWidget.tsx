"use client";

import { useEffect, useRef } from "react";
import {
  TURNSTILE_SITE_KEY,
  loadTurnstileScript,
} from "@/lib/turnstile-client";

/**
 * Cloudflare Turnstile bot check. Put it inside a <form>, just above the submit
 * button. Turnstile adds a hidden "cf-turnstile-response" field to the form, so
 * the existing FormData submit picks the token up with no other changes.
 *
 * It stays invisible for real visitors (it only shows a tick box when Cloudflare
 * is unsure), loads Cloudflare's script only when the form is about to be seen,
 * and renders nothing at all until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export default function TurnstileWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const siteKey = TURNSTILE_SITE_KEY;
    if (!siteKey || !el) return;

    let widgetId: string | undefined;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        loadTurnstileScript()
          .then(() => {
            if (cancelled || !window.turnstile) return;
            widgetId = window.turnstile.render(el, {
              sitekey: siteKey,
              appearance: "interaction-only",
              theme: "light",
            });
          })
          .catch(() => {
            // Script blocked or offline: the form will report an error on submit.
          });
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className="mt-4" />;
}
