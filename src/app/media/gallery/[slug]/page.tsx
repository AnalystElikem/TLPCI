import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import { getGalleryAlbum, getGalleryAlbums } from "@/lib/content-source";
import GalleryLightbox from "@/components/media/GalleryLightbox";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);
  return { title: album ? album.title : "Gallery" };
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = await getGalleryAlbum(slug);
  if (!album) notFound();

  const all = await getGalleryAlbums();
  const others = all.filter((a) => a.slug !== album.slug).slice(0, 4);

  return (
    <>
      <section className="relative h-[220px] overflow-hidden md:h-[300px]">
        <MinistryHeroMedia
          src={album.image}
          alt={album.title}
          priority
          emptyMessage="A cover image for this gallery will appear here once it is added in Church IT."
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <Link
              href="/media/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All galleries
            </Link>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              {album.category}
              {album.date ? ` · ${album.date}` : ""} · {album.photos.length}{" "}
              photos
            </p>
            <h1 className="mt-2 text-3xl font-bold uppercase text-white md:text-5xl">
              {album.title}
            </h1>
          </div>
        </div>
      </section>

      {album.description ? (
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-[720px] px-4 py-8 text-center lg:px-8">
            <p className="leading-relaxed text-text-muted">{album.description}</p>
          </div>
        </section>
      ) : null}

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <GalleryLightbox photos={album.photos} title={album.title} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              More galleries
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/media/gallery/${item.slug}`}
                  className="group overflow-hidden bg-muted-surface"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-3 text-center text-xs text-text-muted">
                        No cover image
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {item.category}
                    </p>
                    <p className="mt-0.5 font-bold text-foreground group-hover:text-primary">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
