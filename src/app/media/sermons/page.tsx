import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Play, BookOpen, User, Clock } from "lucide-react";
import SermonMediaActions from "@/components/sermons/SermonMediaActions";
import { getSermons, sermonPath } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsCompactHeader } from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "media/sermons";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch and listen to sermons from The Lord's Pentecostal Church International — grow in the Word anytime.",
};

export const revalidate = 300;

export default async function SermonsPage() {
  const [sermons, hero] = await Promise.all([
    getSermons(),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  const [featured, ...rest] = sermons;

  if (!featured) {
    return (
      <>
        <CmsCompactHeader
          cms={hero}
          fallbackEyebrow="Media"
          fallbackTitle="Sermons"
          fallbackSubtitle="Grow through the Word — watch or listen to recent messages anytime."
        />
        <section className="bg-muted-surface py-20">
          <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
            <p className="text-lg text-text-muted">
              New messages are coming soon. Please check back shortly.
            </p>
            <Link href="/media/livestream" className="btn btn-primary mt-6 inline-block">
              Go to Livestream
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <CmsCompactHeader
        cms={hero}
        fallbackEyebrow="Media"
        fallbackTitle="Sermons"
        fallbackSubtitle="Grow through the Word — watch or listen to recent messages anytime."
      />

      {/* Featured sermon — large horizontal layout */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
            Latest message
          </p>
          <article className="mt-4 grid overflow-hidden bg-white shadow-sm lg:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[260px] lg:min-h-[360px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <span className="date-badge absolute left-4 top-4">
                {featured.date}
              </span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {featured.category}
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground md:text-3xl">
                <Link href={sermonPath(featured.id)} className="hover:text-primary">
                  {featured.title}
                </Link>
              </h2>
              <ul className="mt-5 space-y-2 text-sm text-text-muted">
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {featured.speaker}
                </li>
                {featured.scripture && (
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {featured.scripture}
                  </li>
                )}
                {featured.duration && (
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {featured.duration}
                  </li>
                )}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={sermonPath(featured.id)} className="btn btn-outline">
                  Open sermon
                </Link>
                <SermonMediaActions sermon={featured} variant="button" />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Archive list — row layout, not card grid like homepage */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
            More messages
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {rest.map((sermon) => (
              <li key={sermon.id}>
                <Link
                  href={sermonPath(sermon.id)}
                  className="group grid gap-4 py-5 transition-colors hover:bg-muted-surface sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6 sm:px-2"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface sm:aspect-[4/3]">
                    <Image
                      src={sermon.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="140px"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">
                      {sermon.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary">
                      {sermon.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {[sermon.speaker, sermon.scripture, sermon.duration]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-text-muted">
                      {sermon.date}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
                      <Play className="h-3 w-3" /> Open
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-muted-surface py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center lg:px-8">
          <p className="text-sm text-text-muted">
            Prefer to join live? Watch the next service online.
          </p>
          <Link href="/media/livestream" className="btn btn-primary">
            Go to Livestream
          </Link>
        </div>
      </section>
    </>
  );
}
