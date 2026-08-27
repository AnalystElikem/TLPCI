import type { Metadata } from "next";
import Link from "next/link";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";
import {
  getMinistryHero,
  getMinistryGallery,
  getMinistryLeaders,
} from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsMinistryHeroText } from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "ministries/men";

export const metadata: Metadata = {
  title: "Men's Ministry",
  description:
    "The Men's Ministry of TLPCI — building men of integrity, faith, and leadership for their homes and the church.",
};

export const revalidate = 300;

const pillars = [
  {
    title: "Integrity",
    text: "Men who walk in purity and keep their word in private and public.",
  },
  {
    title: "Leadership",
    text: "Husbands, fathers, and brothers who serve their homes and church.",
  },
  {
    title: "Brotherhood",
    text: "Accountability, prayer, and honest fellowship that builds strength.",
  },
  {
    title: "Mission",
    text: "Hands ready to work — from practical service to evangelism.",
  },
];

const callResponse = [
  { call: "Men", response: "The head" },
  { call: "Men", response: "The head" },
  { call: "Stand up", response: "For Jesus" },
  { call: "Stand up", response: "For Jesus" },
  { call: "To be a man", response: "Is to be like Jesus" },
];

export default async function MenMinistryPage() {
  const [heroImage, gallery, liveLeaders, heroCms] = await Promise.all([
    getMinistryHero("Men"),
    getMinistryGallery("Men"),
    getMinistryLeaders("Men"),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      <section className="relative h-[240px] overflow-hidden md:h-[320px]">
        <MinistryHeroMedia src={heroImage} alt="Men's ministry" priority />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-end px-4 pb-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1100px]">
            <CmsMinistryHeroText
              cms={heroCms}
              fallbackEyebrow="Men of faith"
              fallbackTitle="Men's Ministry"
            />
          </div>
        </div>
      </section>

      {/* Building men who lead well */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="whitespace-nowrap font-serif text-xl font-bold text-foreground sm:text-2xl md:text-[1.75rem]">
              Building Men Who Lead Well
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              The Men&apos;s Ministry strengthens brothers to lead their homes,
              serve the church, and walk in purity and purpose as disciples of
              Jesus Christ.
            </p>
            <div className="mt-8 border border-border bg-muted-surface p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                Meeting times
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                Meeting days vary by branch
              </p>
              <Link
                href="/get-involved/plan-your-visit"
                className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-primary hover:underline"
              >
                Find your branch time →
              </Link>
            </div>
          </div>

          <ol className="relative space-y-0 border-l border-border pl-8">
            {pillars.map((item, i) => (
              <li key={item.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call & Response */}
      <section className="bg-footer-bg py-14 text-white lg:py-20">
        <div className="mx-auto max-w-[640px] px-4 text-center lg:px-8">
          <span className="section-accent-white mx-auto" />
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            Our Call &amp; Response
          </h2>
          <div className="mt-8 space-y-3">
            {callResponse.map((line, i) => (
              <p
                key={i}
                className="flex flex-wrap items-center justify-center gap-x-3 text-lg"
              >
                <span className="font-bold uppercase tracking-wide text-primary">
                  {line.call}
                </span>
                <span className="text-white/30">—</span>
                <span className="font-serif italic text-white/90">
                  {line.response}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Men" />

      <MinistryGallery
        images={gallery}
        heading="Men in Action"
        subtitle="Fellowship, service, and brotherhood in Christ."
      />

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center lg:px-8">
          <p className="text-lg font-bold text-white md:text-xl">
            Ready to stand with the brothers?
          </p>
          <Link href="/get-involved/volunteer" className="btn btn-white">
            Join men&apos;s ministry
          </Link>
        </div>
      </section>

      <OtherMinistries current="men" />
    </>
  );
}
