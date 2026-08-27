"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHURCH_LOGO } from "@/lib/constants";
import type { EventItem } from "@/lib/content-source";

export type HomeBannerSlide = {
  id: string;
  image: string;
  alt: string;
  title?: string;
};

const DEFAULT_LORDS_HOUR_ALT =
  "Join us every Wednesday for The Lord's Hour — corporate prayer for all TLPCI members and associates, 10PM to 11PM GMT.";

const SLIDE_INTERVAL = 6000;

type LordsHourBannerProps = {
  advertisements?: EventItem[];
  /** Home Settings banner — used for the default (first) slide. */
  image?: string | null;
};

function buildSlides(
  advertisements: EventItem[],
  fallbackImage?: string | null
): HomeBannerSlide[] {
  const defaultSlide: HomeBannerSlide = {
    id: "default-lords-hour",
    image: fallbackImage || "/images/home/lords-hour.jpg",
    alt: DEFAULT_LORDS_HOUR_ALT,
    title: "The Lord's Hour",
  };

  const adSlides = advertisements.map((event) => ({
    id: String(event.id),
    image: event.poster || CHURCH_LOGO,
    alt: `${event.title} — event poster`,
    title: event.title,
  }));

  return [defaultSlide, ...adSlides];
}

export default function LordsHourBanner({
  advertisements = [],
  image,
}: LordsHourBannerProps) {
  const slides = useMemo(
    () => buildSlides(advertisements, image),
    [advertisements, image]
  );
  const [active, setActive] = useState(0);
  const carousel = slides.length > 1;
  const current = slides[active] ?? slides[0];

  useEffect(() => {
    setActive(0);
  }, [slides.length]);

  useEffect(() => {
    if (!carousel) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(timer);
  }, [carousel, slides.length]);

  return (
    <section className="bg-muted-surface py-12 lg:py-16">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <div className="relative aspect-[3/2] w-full overflow-hidden shadow-md">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              aria-hidden={carousel ? i !== active : undefined}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "z-[1] opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className={
                  slide.image === CHURCH_LOGO
                    ? "bg-white object-contain p-12"
                    : "object-cover"
                }
                sizes="(max-width: 1100px) 100vw, 1100px"
                priority={i === 0}
              />
              {slide.image === CHURCH_LOGO && slide.title ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-16">
                  <p className="text-lg font-bold text-white">{slide.title}</p>
                </div>
              ) : null}
            </div>
          ))}

          {carousel ? (
            <>
              <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {active + 1} / {slides.length}
                {current.title ? ` · ${current.title}` : ""}
              </div>
              <button
                type="button"
                aria-label="Previous banner"
                onClick={() =>
                  setActive((i) => (i - 1 + slides.length) % slides.length)
                }
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next banner"
                onClick={() => setActive((i) => (i + 1) % slides.length)}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/45 px-3 py-2">
                {slides.map((slide, i) => (
                  <button
                    key={`${slide.id}-dot`}
                    type="button"
                    aria-label={`Go to banner ${i + 1}${slide.title ? `: ${slide.title}` : ""}`}
                    onClick={() => setActive(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === active
                        ? "w-7 bg-white"
                        : "w-2.5 bg-white/45 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
