"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryPhoto } from "@/lib/content-source";

export default function GalleryLightbox({
  photos,
  title,
}: {
  photos: GalleryPhoto[];
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") {
        setActive((i) => (i === null ? i : (i + 1) % photos.length));
      }
      if (e.key === "ArrowLeft") {
        setActive((i) =>
          i === null ? i : (i - 1 + photos.length) % photos.length
        );
      }
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, photos.length]);

  if (!photos.length) {
    return (
      <p className="py-12 text-center text-sm leading-relaxed text-text-muted">
        Photos for this gallery will appear here once they are added in Church IT.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={`${photo.url}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden bg-surface text-left ${
              i % 5 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={photo.url}
              alt={photo.title || `${title} photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {photo.title ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8">
                <p className="line-clamp-2 text-xs font-medium text-white">
                  {photo.title}
                </p>
              </div>
            ) : null}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo ${active + 1}`}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 text-white/80 hover:text-white"
            onClick={() => setActive(null)}
          >
            <X className="h-7 w-7" />
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-3 text-white/80 hover:text-white md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) =>
                i === null ? i : (i - 1 + photos.length) % photos.length
              );
            }}
          >
            <ChevronLeft className="h-9 w-9" />
          </button>

          <div
            className="flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={photos[active].url}
                alt={photos[active].title || `${title} photo ${active + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mt-4 w-full max-w-2xl text-center">
              <p className="text-sm text-white/70">
                {active + 1} / {photos.length}
              </p>
              {photos[active].title ? (
                <p className="mt-2 text-sm leading-relaxed text-white">
                  {photos[active].title}
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-3 text-white/80 hover:text-white md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i + 1) % photos.length));
            }}
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}
    </>
  );
}
