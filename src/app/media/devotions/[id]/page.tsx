import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, HelpCircle } from "lucide-react";
import {
  devotionPath,
  getDevotion,
  getDevotions,
} from "@/lib/content-source";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getDevotions();
  return items.map((item) => ({ id: encodeURIComponent(String(item.id)) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const devotion = await getDevotion(decodeURIComponent(id));
  return {
    title: devotion ? devotion.title : "Devotion",
    description: devotion?.keyMessage,
  };
}

export default async function DevotionDetailPage({ params }: Props) {
  const { id } = await params;
  const devotion = await getDevotion(decodeURIComponent(id));
  if (!devotion) notFound();

  const all = await getDevotions();
  const others = all
    .filter((d) => String(d.id) !== String(devotion.id))
    .slice(0, 3);

  return (
    <>
      {devotion.image ? (
        <section className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
          <Image
            src={devotion.image}
            alt={devotion.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
          <div className="relative flex min-h-[280px] flex-col justify-end px-4 pb-8 md:min-h-[420px] lg:px-8">
            <div className="mx-auto w-full max-w-[900px]">
              <Link
                href="/media/devotions"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All devotions
              </Link>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/75">
                Daily Devotional · {devotion.dateLabel}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
                {devotion.title}
              </h1>
              {devotion.scriptureReference && (
                <p className="mt-3 text-sm text-white/85">
                  {devotion.scriptureReference}
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-[900px] px-4 py-10 lg:px-8 lg:py-12">
            <Link
              href="/media/devotions"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All devotions
            </Link>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Daily Devotional · {devotion.dateLabel}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl">
              {devotion.title}
            </h1>
            {devotion.scriptureReference && (
              <p className="mt-3 text-sm text-text-muted">
                {devotion.scriptureReference}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 lg:grid-cols-[1fr_320px] lg:gap-12 lg:px-8">
          <div>
            {(devotion.scriptureText || devotion.scriptureReference) && (
              <blockquote className="border-l-2 border-primary bg-white p-5 shadow-sm md:p-6">
                {devotion.scriptureText && (
                  <p className="font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                    &ldquo;{devotion.scriptureText}&rdquo;
                  </p>
                )}
                {devotion.scriptureReference && (
                  <cite className="mt-3 block text-sm font-bold not-italic text-primary">
                    — {devotion.scriptureReference}
                  </cite>
                )}
              </blockquote>
            )}

            {devotion.keyMessage && (
              <div className="mt-10">
                <span className="section-accent" />
                <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
                  Key Message
                </h2>
                <p className="mt-5 text-justify text-lg leading-relaxed text-foreground md:text-xl">
                  {devotion.keyMessage}
                </p>
              </div>
            )}

            {devotion.reflection && (
              <div className="mt-10">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Reflection
                </p>
                {devotion.reflectionHtml ? (
                  <div
                    className="prose prose-sm mt-4 max-w-none text-justify leading-relaxed text-text-muted"
                    dangerouslySetInnerHTML={{ __html: devotion.reflectionHtml }}
                  />
                ) : (
                  <p className="mt-4 text-justify italic leading-relaxed text-text-muted">
                    {devotion.reflection}
                  </p>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {devotion.image && (
              <div className="relative aspect-[4/3] overflow-hidden bg-white shadow-sm">
                <Image
                  src={devotion.image}
                  alt={`${devotion.title} image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            )}

            {devotion.prayerFocus && (
              <div className="bg-footer-bg p-6 text-white md:p-8">
                <span className="section-accent" />
                <h2 className="text-lg font-bold uppercase tracking-wide md:text-xl">
                  Prayer Focus
                </h2>
                <p className="mt-4 text-justify leading-relaxed text-white/85">
                  {devotion.prayerFocus}
                </p>
              </div>
            )}

            {!devotion.image && (
              <div className="border border-border bg-white p-6 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                  {devotion.dateLabel}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-border bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
            <span className="section-accent" />
            <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
              More devotions
            </h2>
            <ul className="mt-8 space-y-4">
              {others.map((d) => (
                <li key={d.id}>
                  <Link
                    href={devotionPath(d.id)}
                    className="group block bg-muted-surface p-5 transition-colors hover:bg-white hover:shadow-sm"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {d.dateLabel}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary">
                      {d.title}
                    </h3>
                    {d.scriptureReference && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-text-muted">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        {d.scriptureReference}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
