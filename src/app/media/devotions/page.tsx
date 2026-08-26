import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { CHURCH_LOGO } from "@/lib/constants";
import { devotionPath, getDevotions } from "@/lib/content-source";

export const metadata: Metadata = {
  title: "Devotions",
  description:
    "Daily devotions from The Lord's Pentecostal Church International — scripture, reflection, and prayer.",
};

export const revalidate = 300;

export default async function DevotionsPage() {
  const devotions = await getDevotions();
  const [featured, ...rest] = devotions;

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Media
          </p>
          <h1 className="mt-2 text-3xl font-bold uppercase text-foreground md:text-5xl">
            Devotions
          </h1>
          <p className="mt-3 max-w-xl text-text-muted">
            Grow daily through scripture, key messages, reflection, and prayer
            from Church IT.
          </p>
        </div>
      </section>

      {devotions.length === 0 ? (
        <section className="bg-muted-surface py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 text-center lg:px-8">
            <p className="text-text-muted">
              No devotions are published yet. Add entries in Church IT under{" "}
              <strong>Devotion</strong> and they will appear here automatically.
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-muted-surface py-14 lg:py-20">
            <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
                Latest devotion
              </p>
              <article className="mt-4 grid overflow-hidden bg-white shadow-sm lg:grid-cols-[1.2fr_1fr]">
                <div className="relative min-h-[260px] lg:min-h-[360px]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark via-secondary to-primary" />
                  )}
                  <span className="date-badge absolute left-4 top-4">
                    {featured.dateLabel}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  {featured.scriptureReference && (
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
                      <BookOpen className="h-4 w-4" />
                      {featured.scriptureReference}
                    </p>
                  )}
                  <h2 className="mt-2 text-2xl font-bold leading-snug text-foreground md:text-3xl">
                    <Link href={devotionPath(featured.id)} className="hover:text-primary">
                      {featured.title}
                    </Link>
                  </h2>
                  {featured.keyMessage && (
                    <p className="mt-4 line-clamp-4 text-justify leading-relaxed text-text-muted">
                      {featured.keyMessage}
                    </p>
                  )}
                  <Link
                    href={devotionPath(featured.id)}
                    className="btn btn-outline mt-6 w-fit"
                  >
                    Read devotion
                  </Link>
                </div>
              </article>
            </div>
          </section>

          {rest.length > 0 && (
            <section className="bg-white py-16 lg:py-24">
              <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
                <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
                  All devotions
                </h2>
                <ul className="mt-8 divide-y divide-border border-y border-border">
                  {rest.map((devotion) => (
                    <li key={devotion.id}>
                      <Link
                        href={devotionPath(devotion.id)}
                        className="group grid gap-4 py-5 transition-colors hover:bg-muted-surface sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6 sm:px-2"
                      >
                        <div className="relative aspect-video overflow-hidden bg-muted-surface sm:aspect-[4/3]">
                          {devotion.image ? (
                            <Image
                              src={devotion.image}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="140px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20">
                              <Image
                                src={CHURCH_LOGO}
                                alt=""
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain opacity-80"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          {devotion.scriptureReference && (
                            <p className="text-xs font-bold uppercase tracking-wide text-primary">
                              {devotion.scriptureReference}
                            </p>
                          )}
                          <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary">
                            {devotion.title}
                          </h3>
                          {devotion.keyMessage && (
                            <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                              {devotion.keyMessage}
                            </p>
                          )}
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-text-muted">
                            {devotion.dateLabel}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
                            <ArrowRight className="h-3 w-3" />
                            Read
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
