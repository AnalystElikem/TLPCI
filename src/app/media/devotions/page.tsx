import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { devotionPath, getRecentDevotions } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsCompactHeader } from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "media/devotions";

export const metadata: Metadata = {
  title: "Devotions",
  description:
    "Daily devotions from The Lord's Pentecostal Church International — scripture, reflection, and prayer.",
};

export const revalidate = 300;

function DevotionCard({
  devotion,
  label,
  priority = false,
}: {
  devotion: (Awaited<ReturnType<typeof getRecentDevotions>>)[number];
  label: string;
  priority?: boolean;
}) {
  return (
    <article
      className={`grid overflow-hidden bg-white shadow-sm ${
        devotion.image ? "lg:grid-cols-[1.2fr_1fr]" : ""
      }`}
    >
      {devotion.image ? (
        <div className="relative min-h-[260px] lg:min-h-[360px]">
          <Image
            src={devotion.image}
            alt={devotion.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={priority}
          />
          <span className="date-badge absolute left-4 top-4">
            {devotion.dateLabel}
          </span>
        </div>
      ) : null}
      <div className="flex flex-col justify-center p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
          {label}
        </p>
        {!devotion.image && (
          <span className="date-badge mb-4 mt-2 w-fit">{devotion.dateLabel}</span>
        )}
        {devotion.scriptureReference && (
          <p className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <BookOpen className="h-4 w-4" />
            {devotion.scriptureReference}
          </p>
        )}
        <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground md:text-3xl">
          <Link href={devotionPath(devotion.id)} className="hover:text-primary">
            {devotion.title}
          </Link>
        </h2>
        {devotion.keyMessage && (
          <p className="mt-4 line-clamp-4 text-justify leading-relaxed text-text-muted">
            {devotion.keyMessage}
          </p>
        )}
        <Link
          href={devotionPath(devotion.id)}
          className="btn btn-outline mt-6 w-fit"
        >
          Read devotion
        </Link>
      </div>
    </article>
  );
}

export default async function DevotionsPage() {
  const [recent, hero] = await Promise.all([
    getRecentDevotions(),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  const [today, yesterday] = recent;

  return (
    <>
      <CmsCompactHeader
        cms={hero}
        fallbackEyebrow="Media"
        fallbackTitle="Devotions"
        fallbackSubtitle="Grow daily through scripture, key messages, reflection, and prayer. Today and yesterday's devotions are featured here."
      />

      {!today ? (
        <section className="bg-muted-surface py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 text-center lg:px-8">
            <p className="text-text-muted">Devotions are not available right now.</p>
          </div>
        </section>
      ) : (
        <section className="bg-muted-surface py-14 lg:py-20">
          <div className="mx-auto max-w-[1200px] space-y-14 px-4 lg:px-8">
            <div>
              <DevotionCard devotion={today} label="Today's devotion" priority />
            </div>

            {yesterday ? (
              <div>
                <DevotionCard devotion={yesterday} label="Yesterday's devotion" />
              </div>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
