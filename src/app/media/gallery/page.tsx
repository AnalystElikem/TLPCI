import type { Metadata } from "next";
import Link from "next/link";
import GalleryAlbumGrid from "@/components/media/GalleryAlbumGrid";
import { getGalleryAlbums } from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";

const PAGE_ROUTE = "media/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from worship, events, and ministry life at The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

export default async function GalleryPage() {
  const [albums, hero] = await Promise.all([
    getGalleryAlbums(),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[720px] px-4 py-14 text-center lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
            {webText(hero, "eyebrow", "Moments")}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-6xl">
            {webText(hero, "title", "Gallery")}
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-text-muted">
            {webText(
              hero,
              "subtitle",
              "Choose a category, then open an album to browse the photos."
            )}
          </p>
        </div>
      </section>

      <GalleryAlbumGrid albums={albums} />

      <section className="bg-[#1a1a1a] py-12">
        <div className="mx-auto max-w-[720px] px-4 text-center lg:px-8">
          <h2 className="text-xl font-bold uppercase text-white md:text-2xl">
            Experienced it in person?
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Plan a visit or catch the next livestream with us.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/get-involved/plan-your-visit" className="btn btn-primary">
              Plan Your Visit
            </Link>
            <Link href="/media/livestream" className="btn btn-white">
              Watch Live
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
