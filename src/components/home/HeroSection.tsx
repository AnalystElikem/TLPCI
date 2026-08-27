"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHURCH_NAME } from "@/lib/constants";
import { HOME_HERO_FALLBACKS } from "@/data/home-hero-fallbacks";

type Slide = {
  title: string;
  text: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DEFAULT_SLIDES: Slide[] = HOME_HERO_FALLBACKS.map((slide) => ({ ...slide }));

const SLIDE_INTERVAL = 6000;

export default function HeroSection({ slides: slidesProp }: { slides?: Slide[] }) {
  const slides = slidesProp && slidesProp.length ? slidesProp : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);

  useEffect(() => {
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
  }, [slides.length]);

  return (
    <section className="relative h-[420px] w-full overflow-hidden md:h-[540px] lg:h-[620px]">
      <h1 className="sr-only">{CHURCH_NAME}</h1>

      {slides.map((slide, i) => (
        <div
          key={`${slide.title}-${i}`}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1400px] px-4 pb-14 lg:px-8 lg:pb-20">
              <div className="max-w-2xl">
                <span className="section-accent-white" />
                <h2 className="whitespace-nowrap text-2xl text-white sm:text-h2 md:text-h1 lg:text-display">
                  {slide.title}
                </h2>
                {slide.text ? (
                  <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                    {slide.text}
                  </p>
                ) : null}
                <Link
                  href={slide.ctaHref || "/about/our-story"}
                  className="btn btn-primary mt-6"
                  tabIndex={i === active ? 0 : -1}
                >
                  {slide.ctaLabel || "Find Out More"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() =>
          setActive((i) => (i - 1 + slides.length) % slides.length)
        }
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/80 transition-colors hover:bg-black/50 hover:text-white md:block"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setActive((i) => (i + 1) % slides.length)}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white/80 transition-colors hover:bg-black/50 hover:text-white md:block"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 right-4 flex gap-2 lg:right-8">
        {slides.map((slide, i) => (
          <button
            key={`${slide.title}-dot-${i}`}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
