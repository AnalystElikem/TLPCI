import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPostPath, getBlogPost, getBlogPosts } from "@/lib/content-source";
import { sanitizeHtml } from "@/lib/sanitize";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getBlogPosts();
  return items.map((item) => ({ slug: encodeURIComponent(String(item.id)) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBlogPost(decodeURIComponent(slug));
  return {
    title: item ? item.title : "Latest News",
    description: item?.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBlogPost(decodeURIComponent(slug));
  if (!item) notFound();

  const all = await getBlogPosts();
  const others = all
    .filter((n) => String(n.id) !== String(item.id))
    .slice(0, 3);
  const bodyHtml = sanitizeHtml(item.body);

  return (
    <>
      <section className="relative overflow-hidden bg-foreground">
        {/* Blurred copy of the cover as a backdrop, so nothing is cropped away */}
        <Image
          src={item.image}
          alt=""
          aria-hidden
          fill
          className="scale-110 object-cover opacity-40 blur-2xl"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
        <div className="relative px-4 pb-10 pt-12 md:pb-12 md:pt-16 lg:px-8">
          <div className="mx-auto w-full max-w-[820px]">
            <Link
              href="/news-events/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Latest news
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/75">
              {item.category} · {item.date}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              {item.title}
            </h1>
            {item.blogger && (
              <p className="mt-3 text-sm text-white/85">By {item.blogger}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          {/* Full cover photo, never cropped, whatever its shape */}
          <div className="relative aspect-video w-full overflow-hidden bg-foreground shadow-md">
            <Image
              src={item.image}
              alt=""
              aria-hidden
              fill
              className="scale-110 object-cover opacity-50 blur-2xl"
              sizes="(max-width: 900px) 100vw, 900px"
            />
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[760px] px-4 lg:px-8">
          {bodyHtml ? (
            <div
              className="prose-tlpci text-justify leading-relaxed text-text-muted"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            <p className="text-justify text-lg leading-relaxed text-text-muted">
              {item.excerpt}
            </p>
          )}

          <div className="mt-10 border-t border-border pt-6">
            <Link
              href="/news-events/events"
              className="text-xs font-bold uppercase tracking-wide text-primary hover:underline"
            >
              See upcoming events →
            </Link>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-border bg-muted-surface py-14 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              More news
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((n) => (
                <Link
                  key={n.id}
                  href={blogPostPath(n.id)}
                  className="group block overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {n.category} · {n.date}
                    </p>
                    <h3 className="mt-1 font-bold leading-snug text-foreground group-hover:text-primary">
                      {n.title}
                    </h3>
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
