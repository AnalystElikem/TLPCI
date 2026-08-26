import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TestimonyCard, {
  TestimonyShareBanner,
} from "@/components/testimonies/TestimonyCard";
import {
  getTestimonies,
  getTestimony,
} from "@/lib/content-source";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getTestimonies();
  return items.map((item) => ({ id: encodeURIComponent(String(item.id)) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const testimony = await getTestimony(decodeURIComponent(id));
  return {
    title: testimony ? testimony.title : "Testimony",
    description: testimony?.testimony?.slice(0, 160),
  };
}

export default async function TestimonyDetailPage({ params }: Props) {
  const { id } = await params;
  const testimony = await getTestimony(decodeURIComponent(id));
  if (!testimony) notFound();

  const all = await getTestimonies();
  const others = all
    .filter((t) => String(t.id) !== String(testimony.id))
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[820px] px-4 py-10 lg:px-8 lg:py-12">
          <Link
            href="/media/testimonies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All testimonies
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="date-badge">{testimony.dateLabel}</span>
            {testimony.testifierName && (
              <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Shared by {testimony.testifierName}
              </span>
            )}
          </div>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {testimony.title}
          </h1>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[820px] px-4 lg:px-8">
          <article className="card-shadow border-l-4 border-primary px-6 py-8 md:px-10 md:py-12">
            {testimony.testimonyHtml ? (
              <div
                className="prose prose-sm max-w-none text-justify leading-relaxed text-foreground md:prose-lg [&_p:first-child]:text-lg [&_p:first-child]:md:text-xl"
                dangerouslySetInnerHTML={{ __html: testimony.testimonyHtml }}
              />
            ) : (
              <p className="text-justify text-lg leading-relaxed text-foreground md:text-xl">
                {testimony.testimony}
              </p>
            )}
          </article>

          {others.length > 0 && (
            <div className="mt-14">
              <span className="section-accent" />
              <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
                More testimonies
              </h2>
              <ul className="mt-6 space-y-4">
                {others.map((t) => (
                  <li key={t.id}>
                    <TestimonyCard testimony={t} compact />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <TestimonyShareBanner />
        </div>
      </section>
    </>
  );
}
