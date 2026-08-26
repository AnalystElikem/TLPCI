"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryAlbum } from "@/lib/content-source";

const EMPTY_MESSAGE =
  "Church gallery categories will appear here once they are added in Church IT.";

export default function GalleryAlbumGrid({
  albums = [],
}: {
  albums?: GalleryAlbum[];
}) {
  const [active, setActive] = useState("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(albums.map((a) => a.category)))],
    [albums]
  );

  const visible = useMemo(() => {
    if (active === "All") return albums;
    return albums.filter((a) => a.category === active);
  }, [active, albums]);

  if (!albums.length) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <p className="mx-auto max-w-lg px-4 text-center text-sm leading-relaxed text-text-muted lg:px-8">
          {EMPTY_MESSAGE}
        </p>
      </section>
    );
  }

  return (
    <>
      {filters.length > 2 ? (
        <section className="border-y border-border bg-muted-surface">
          <div className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-4 py-4 lg:px-8">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  active === f
                    ? "bg-foreground text-white"
                    : "bg-white text-text-muted hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <p className="mb-6 text-sm text-text-muted">
            {visible.length} {visible.length === 1 ? "gallery" : "galleries"}
            {active !== "All" ? ` in ${active}` : ""} — click to view photos
          </p>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-text-muted">
              No galleries in this category yet.
            </p>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {visible.map((item) => (
                <Link
                  key={item.slug}
                  href={`/media/gallery/${item.slug}`}
                  className="group relative mb-4 block break-inside-avoid overflow-hidden"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-muted-surface ${
                      item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-4 text-center text-xs text-text-muted">
                        No cover image yet
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                        {item.category} · {item.photos.length} photos
                      </p>
                      <p className="mt-1 text-lg font-bold text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
