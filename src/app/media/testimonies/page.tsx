import type { Metadata } from "next";
import Link from "next/link";
import { getTestimonies } from "@/lib/content-source";
import TestimonyCard, {
  TestimonyShareBanner,
} from "@/components/testimonies/TestimonyCard";

export const metadata: Metadata = {
  title: "Testimonies",
  description:
    "Stories of God's faithfulness from members of The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies();

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[820px] px-4 py-10 lg:px-8 lg:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Media
          </p>
          <span className="section-accent mt-4" />
          <h1 className="font-serif text-3xl font-bold uppercase text-foreground md:text-5xl">
            Testimonies
          </h1>
          <p className="mt-4 max-w-xl text-body leading-relaxed text-text-muted">
            Read how God is moving in the lives of our church family.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[820px] px-4 lg:px-8">
          {testimonies.length === 0 ? (
            <div className="card-shadow px-6 py-12 text-center">
              <p className="text-text-muted">No testimonies yet.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {testimonies.map((testimony) => (
                <li key={testimony.id}>
                  <TestimonyCard testimony={testimony} />
                </li>
              ))}
            </ul>
          )}

          <TestimonyShareBanner />
        </div>
      </section>
    </>
  );
}
