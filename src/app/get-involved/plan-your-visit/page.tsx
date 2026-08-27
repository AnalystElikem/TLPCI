import type { Metadata } from "next";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import Link from "next/link";
import { Users, Baby, Shirt, Coffee } from "lucide-react";
import PlanVisitForm from "@/components/get-involved/PlanVisitForm";
import ScrollToHash from "@/components/get-involved/ScrollToHash";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Planning your first visit to TLPCI? Here's what to expect, our service times, and how to let us know you're coming.",
};

const expectations = [
  { icon: Shirt, title: "Come as you are", text: "There is no special dress code. Wear what makes you comfortable." },
  { icon: Coffee, title: "A warm welcome", text: "A host can meet you, show you around, and help you settle in." },
  { icon: Baby, title: "Children are welcome", text: "Safe, age-appropriate Bible classes are available during worship." },
  { icon: Users, title: "Worship & the Word", text: "Expect heartfelt worship, prayer, and practical Bible teaching." },
];

const serviceTimes = [
  {
    name: "Church Service at TLPCI Ashaiman Central",
    note: "General Overseer's Branch",
    time: "Sunday · 8:00 am",
  },
  {
    name: "Church Service at TLPCI Abundant Life Centre",
    note: "Headquarters Branch",
    time: "Sunday · 8:30 am",
  },
];

const PAGE_ROUTE = "get-involved/plan-your-visit";

export const revalidate = 300;

export default async function PlanYourVisitPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Plan Your Visit", PAGE_ROUTE),
  ]);
  return (
    <>
      <ScrollToHash id="plan-visit" />
      <CmsPageBanner
        cms={hero}
        alt="Church worship service"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80"
        }
        fallbackEyebrow="Your first Sunday"
        fallbackTitle="Plan Your Visit"
        fallbackSubtitle="Visiting somewhere new can feel uncertain. We want to make your first Sunday simple, comfortable, and meaningful."
        heightClass="min-h-[430px]"
        overlayClass="bg-gradient-to-r from-black/80 via-black/55 to-black/20"
        showSubtitle
      />
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-3 px-4 py-5 lg:px-8">
          <a href="#plan-visit" className="btn btn-primary">
            Plan My Visit
          </a>
          <Link href="/churches/find" className="btn btn-outline">
            Find a Church
          </Link>
        </div>
      </section>

      <section id="plan-visit" className="scroll-mt-24 bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="whitespace-nowrap text-2xl font-bold uppercase leading-tight text-foreground md:text-3xl">
              Let us know you&apos;re coming
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              This is optional, but it helps a local host welcome you and point
              you in the right direction when you arrive.
            </p>

            <div className="mt-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Service times
              </h3>
              <div className="mt-3 divide-y divide-border border-y border-border text-sm">
                {serviceTimes.map((service) => (
                  <div key={service.name} className="py-3">
                    <p className="whitespace-nowrap text-[13px] font-semibold text-foreground">
                      {service.name}
                    </p>
                    {service.note && (
                      <p className="mt-0.5 text-xs italic text-text-muted">
                        {service.note}
                      </p>
                    )}
                    <p className="mt-1 font-semibold text-primary">
                      {service.time}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/churches/find"
                className="mt-5 inline-block text-xs font-bold uppercase tracking-wide text-primary hover:underline"
              >
                Find a church near you →
              </Link>
            </div>
          </div>

          <PlanVisitForm />
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-accent mx-auto" />
            <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
              What to expect
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {expectations.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-border p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
