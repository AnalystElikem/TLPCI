import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPostPath, getBlogPosts } from "@/lib/content-source";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and stories from The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured =
    posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => String(post.id) !== String(featured?.id));

  if (!featured) {
    return (
      <>
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              News &amp; Events
            </p>
            <h1 className="mt-2 text-3xl font-bold uppercase text-foreground md:text-5xl">
              Blog
            </h1>
          </div>
        </section>
        <section className="bg-muted-surface py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 text-center lg:px-8">
            <p className="text-text-muted">Coming soon.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            News &amp; Events
          </p>
          <h1 className="mt-2 text-3xl font-bold uppercase text-foreground md:text-5xl">
            Blog
          </h1>
          <p className="mt-3 max-w-xl text-text-muted">
            Articles, updates, and stories from across the church.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
            {featured.featured ? "Featured post" : "Latest post"}
          </p>
          <article className="mt-4 grid overflow-hidden bg-white shadow-sm lg:grid-cols-[1.3fr_1fr]">
            <div className="relative min-h-[260px] lg:min-h-[380px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {featured.category} · {featured.date}
              </p>
              {featured.blogger && (
                <p className="mt-2 text-sm text-text-muted">
                  By {featured.blogger}
                </p>
              )}
              <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-foreground md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-text-muted">
                {featured.excerpt}
              </p>
              <Link
                href={blogPostPath(featured.id)}
                className="mt-6 inline-block text-xs font-bold uppercase tracking-wide text-primary hover:underline"
              >
                Read post →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
            <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
              More posts
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {rest.map((item) => (
                <Link
                  key={item.id}
                  href={blogPostPath(item.id)}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-primary">
                    {item.category} · {item.date}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-foreground group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#1a1a1a] py-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-xl font-bold uppercase text-white">
              Never miss an update
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Upcoming programmes and gatherings are on the events calendar.
            </p>
          </div>
          <Link href="/news-events/events" className="btn btn-primary">
            View Events
          </Link>
        </div>
      </section>
    </>
  );
}
