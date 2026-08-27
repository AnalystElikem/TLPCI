import type { Metadata } from "next";
import Link from "next/link";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import {
  getMinistryHero,
  getMinistryGallery,
  getMinistryLeaders,
} from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";

const PAGE_ROUTE = "ministries/youth";

export const metadata: Metadata = {
  title: "Youth Ministry",
  description:
    "The Youth Ministry of TLPCI — raising young people who stand firm in faith and impact their world for Christ.",
};

const rhythm = [
  { label: "Worship", detail: "Spirit-filled praise" },
  { label: "Word", detail: "Bible teaching that sticks" },
  { label: "Squads", detail: "Small groups & mentors" },
  { label: "Evangelism", detail: "Schools & community" },
];

export const revalidate = 300;

export default async function YouthMinistryPage() {
  const [heroImage, gallery, liveLeaders, heroCms] = await Promise.all([
    getMinistryHero("Youth"),
    getMinistryGallery("Youth"),
    getMinistryLeaders("Youth"),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      {/* Full dark banner with big type */}
      <section className="relative min-h-[70vh] overflow-hidden bg-[#111]">
        <MinistryHeroMedia
          src={heroImage}
          alt="Youth ministry"
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1200px] flex-col justify-end px-4 pb-14 pt-28 lg:px-8 lg:pb-20">
          <h1 className="max-w-2xl text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl md:text-7xl">
            {webText(heroCms, "title", "Youth on fire")}
          </h1>
          <p className="mt-5 max-w-md text-base text-white/80">
            Raising young people who stand firm in faith, live holy lives, and
            impact their world for Christ.
          </p>
        </div>
      </section>

      {/* This week strip */}
      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Weekly gathering
            </p>
            <p className="mt-1 text-lg font-bold">
              Meeting days vary by branch
            </p>
          </div>
          <Link href="/get-involved/plan-your-visit" className="btn btn-white">
            Find your branch time
          </Link>
        </div>
      </section>

      {/* Rhythm */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
            The youth rhythm
          </h2>
          <div className="mt-10 grid gap-0 border-t border-border sm:grid-cols-4">
            {rhythm.map((item) => (
              <div
                key={item.label}
                className="border-b border-border px-0 py-8 sm:border-b-0 sm:border-r sm:px-6 sm:py-10 last:sm:border-r-0"
              >
                <h3 className="text-xl font-bold text-foreground">{item.label}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + CTA */}
      <section className="bg-[#1a1a1a] py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <blockquote className="font-serif text-2xl leading-snug text-white md:text-3xl">
            &ldquo;Don&apos;t let anyone look down on you because you are young,
            but set an example for the believers.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-primary">
            1 Timothy 4:12
          </p>
          <p className="mt-10 text-base text-white/80">
            Got a burning question about faith or life?
          </p>
          <Link href="/get-involved/prayer-request" className="btn btn-primary mt-4">
            Ask a youth leader
          </Link>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Youth" />

      <MinistryGallery
        images={gallery}
        heading="Youth in Action"
        subtitle="Camps, fellowships, and outreach — life together in Christ."
      />

      <OtherMinistries current="youth" />
    </>
  );
}
