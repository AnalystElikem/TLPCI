import Link from "next/link";
import { BookOpen, HelpCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { devotionPath, getLatestDevotion } from "@/lib/content-source";

export default async function DailyDevotion() {
  const devotion = await getLatestDevotion();
  const dateLabel =
    devotion.dateLabel ||
    new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading title="Today's Devotion">
          <Link
            href="/media/devotions"
            className="btn btn-primary hidden shrink-0 sm:inline-block"
          >
            All devotions
          </Link>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <article className="card-shadow flex flex-col overflow-hidden">
            <div className="flex flex-col p-6 md:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Daily Devotional · {dateLabel}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl">
                {devotion.title}
              </h3>

              {(devotion.scriptureText || devotion.scriptureReference) && (
                <blockquote className="mt-5 border-l-2 border-primary bg-primary-subtle p-4 md:p-5">
                  {devotion.scriptureText && (
                    <p className="italic leading-relaxed text-foreground">
                      &ldquo;{devotion.scriptureText}&rdquo;
                    </p>
                  )}
                  {devotion.scriptureReference && (
                    <cite className="mt-2 block text-sm font-bold not-italic text-primary">
                      — {devotion.scriptureReference}
                    </cite>
                  )}
                </blockquote>
              )}

              {devotion.keyMessage && (
                <div className="mt-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Key Message
                  </p>
                  <p className="mt-2 line-clamp-4 text-justify leading-relaxed text-text-muted">
                    {devotion.keyMessage}
                  </p>
                </div>
              )}

              {devotion.reflection && (
                <div className="mt-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    Reflection
                  </p>
                  <p className="mt-2 line-clamp-3 italic leading-relaxed text-foreground">
                    {devotion.reflection}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3 sm:hidden">
                <Link href="/media/devotions" className="btn btn-primary">
                  All devotions
                </Link>
                <Link href={devotionPath(devotion.id)} className="btn btn-outline">
                  Read full devotion
                </Link>
              </div>
              <Link
                href={devotionPath(devotion.id)}
                className="btn btn-outline mt-8 hidden w-fit sm:inline-flex"
              >
                Read full devotion
              </Link>
            </div>
          </article>

          {devotion.prayerFocus && (
            <aside className="flex flex-col justify-center bg-footer-bg p-6 text-white md:p-9">
              <span className="section-accent" />
              <h3 className="text-xl font-bold uppercase tracking-wide md:text-2xl">
                Prayer Focus
              </h3>
              <p className="mt-5 text-justify leading-relaxed text-white/85">
                {devotion.prayerFocus}
              </p>
              {devotion.scriptureReference && (
                <p className="mt-6 text-sm italic text-white/60">
                  — {devotion.title}, {devotion.scriptureReference}
                </p>
              )}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
