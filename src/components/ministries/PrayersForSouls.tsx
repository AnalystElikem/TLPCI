"use client";

import { useEffect, useState } from "react";

const prayers = [
  "Lord, open blind eyes to see the light of the gospel of Christ.",
  "Father, send labourers into the harvest, for the fields are white and ready.",
  "We pray for every unreached community — may they hear the name of Jesus.",
  "Lord, soften hard hearts and draw the lost to Yourself today.",
  "Give us boldness to preach Christ crucified, without fear or shame.",
  "Father, let signs, wonders, and healings confirm the preaching of Your Word.",
  "We stand for our families — save every soul, and leave none behind.",
  "Lord, break every chain of darkness holding people captive.",
  "Raise up a generation of soul-winners across this nation and beyond.",
  "Father, let every crusade and outreach bring salvation to many.",
  "We pray for open doors into cities, villages, and hidden places.",
  "Lord, grant repentance and faith to all who hear the gospel.",
  "Comfort and strengthen every missionary carrying the good news.",
  "Let Your kingdom come and Your will be done in every community.",
  "Father, may the joy of the Lord fill every new believer today.",
];

const INTERVAL = 5000;

export default function PrayersForSouls() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % prayers.length),
      INTERVAL
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-secondary py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
        <span className="section-accent-white mx-auto" />
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
          Prayers for Souls
        </h2>

        <div className="relative mt-6 min-h-[120px] md:min-h-[100px]">
          {prayers.map((prayer, i) => (
            <p
              key={i}
              aria-hidden={i !== index}
              className={`absolute inset-0 flex items-center justify-center font-serif text-2xl italic leading-snug transition-opacity duration-700 md:text-3xl ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              &ldquo;{prayer}&rdquo;
            </p>
          ))}
        </div>

        {/* Progress dots */}
        <div className="mt-8 flex flex-wrap justify-center gap-1.5">
          {prayers.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Prayer ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
