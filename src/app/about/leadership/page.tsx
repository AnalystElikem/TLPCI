import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentImage from "@/components/ui/ContentImage";
import { getLeadership, getPageBanner } from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "about/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the General Overseer, Executive Council, and past overseers of The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

function PersonPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
      <ContentImage
        src={src}
        alt={alt}
        fill
        imageClassName="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
    </div>
  );
}

export default async function LeadershipPage() {
  const [hero, banner, leadership] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Leadership", PAGE_ROUTE),
    getLeadership(),
  ]);
  const {
    generalOverseer: go,
    council: executiveCouncil,
    pastOverseers,
  } = leadership;

  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Leadership"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1600&q=80"
        }
        fallbackEyebrow="Meet Our Leaders"
        fallbackTitle="Leadership"
      />

      {/* Intro + jump links */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-10 text-center lg:px-8 lg:py-12">
          <p className="leading-relaxed text-text-muted md:text-lg">
            {webText(
              hero,
              "subtitle",
              "Servant leaders who oversee the work of the church — guiding doctrine, mission, and pastoral care across our congregations."
            )}
          </p>
          <nav
            aria-label="Leadership sections"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-wide"
          >
            <a href="#overseer" className="text-foreground transition-colors hover:text-primary">
              General Overseer
            </a>
            <span className="hidden text-border sm:inline" aria-hidden>|</span>
            <a href="#council" className="text-foreground transition-colors hover:text-primary">
              Executive Council
            </a>
            <span className="hidden text-border sm:inline" aria-hidden>|</span>
            <a href="#past" className="text-foreground transition-colors hover:text-primary">
              Past Overseers
            </a>
            <span className="hidden text-border sm:inline" aria-hidden>|</span>
            <Link href="/churches/pastors" className="text-foreground transition-colors hover:text-primary">
              Branch Pastors
            </Link>
          </nav>
        </div>
      </section>

      {/* Featured General Overseer */}
      <section id="overseer" className="scroll-mt-24 bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 md:grid-cols-[minmax(0,380px)_1fr] md:gap-12 lg:px-8 lg:gap-16">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface shadow-sm md:self-start">
            <ContentImage
              src={go.image}
              alt={go.name}
              fill
              imageClassName="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 380px"
              priority
            />
          </div>

          <div>
            <span className="section-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {go.role}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {go.name}
            </h2>
            <div className="mt-5 space-y-4 text-justify leading-relaxed text-text-muted">
              {go.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Council */}
      <section id="council" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-accent mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              The Executive Council
            </h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              Together with the General Overseer, the Executive Council provides
              spiritual oversight and administrative leadership for the church.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
            {executiveCouncil.map((member, i) => (
              <article key={i} className="group text-center">
                <PersonPhoto src={member.image} alt={member.name || member.role} />
                <h3 className="mt-4 text-[0.95rem] font-bold leading-snug text-foreground md:text-base">
                  {member.name || " "}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Past General Overseers */}
      <section id="past" className="scroll-mt-24 border-t border-border bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="section-accent mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Past General Overseers
            </h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              We honour those who have faithfully led The Lord&apos;s Pentecostal
              Church International through the years.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:gap-x-10">
            {pastOverseers.map((person) => (
              <article key={person.name} className="group text-center">
                <PersonPhoto src={person.image} alt={person.name} />
                <p className="mt-4 font-serif text-lg font-bold text-primary">
                  {person.tenure}
                </p>
                <h3 className="mt-1 text-[0.95rem] font-bold leading-snug text-foreground md:text-base">
                  {person.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{person.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Branch pastors CTA */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[220px] md:min-h-[260px]">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80"
            alt="Local congregation"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1200px]">
              <span className="section-accent-white" />
              <h2 className="text-xl font-bold uppercase text-white md:text-2xl">
                Looking for your local branch pastor?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/85">
                This page covers our national leadership. Branch pastors serve
                specific congregations near you.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/churches/pastors" className="btn btn-primary">
                  View Branch Pastors
                </Link>
                <Link href="/churches/find" className="btn btn-white">
                  Find a Church
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
