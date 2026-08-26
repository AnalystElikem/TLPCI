import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, Users } from "lucide-react";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import {
  getMinistryHero,
  getMinistryGallery,
  getMinistryLeaders,
} from "@/lib/content-source";

export const metadata: Metadata = {
  title: "TELPSAM — Students Ministry",
  description:
    "TELPSAM — The Lord's Pentecostal Students & Associates' Ministry, reaching tertiary campuses across Ghana since 2001.",
};

const activities = [
  "Bible Studies",
  "Prayers",
  "Evangelism",
  "Sunday Services",
  "Retreats & Picnics",
];

const campuses = [
  {
    name: "TELPSAM Accra",
    detail:
      "University of Ghana (Legon & City Campus), University of Professional Studies (UPSA), Accra Technical University, University of Media, Arts & Communication (UniMAC), Colleges of Education (Teaching & Nursing), and all other tertiary institutions in Accra.",
  },
  {
    name: "TELPSAM UCC",
    detail: "University of Cape Coast.",
  },
  {
    name: "TELPSAM UEW",
    detail: "University of Education, Winneba.",
  },
  {
    name: "TELPSAM KNUST",
    detail: "Kwame Nkrumah University of Science & Technology.",
  },
  {
    name: "TELPSAM Ho",
    detail:
      "All tertiary institutions in the Volta & Oti Regions — Ho Technical University, Ho Nursing Training College, University of Health & Allied Sciences (UHAS) campuses in Ho and Hohoe, Akatsi College of Education, and others.",
  },
  {
    name: "TELPSAM KTU",
    detail: "Koforidua Technical University.",
  },
  {
    name: "TELPSAM Sunyani",
    detail:
      "University of Energy & Natural Resources, Sunyani Technical University, and other tertiary institutions.",
  },
];

export const revalidate = 300;

export default async function StudentsMinistryPage() {
  const [hero, gallery, liveLeaders] = await Promise.all([
    getMinistryHero("Students"),
    getMinistryGallery("Students"),
    getMinistryLeaders("Students"),
  ]);
  return (
    <>
      {/* Hero — image + brand */}
      <section className="relative min-h-[560px] overflow-hidden bg-footer-bg md:min-h-[600px]">
        {hero ? (
          <Image
            src={hero}
            alt="TELPSAM students"
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1100px] flex-col items-center justify-center px-4 py-20 text-center md:min-h-[600px] lg:px-8">
          <div className="inline-flex rounded-md bg-white px-6 py-5 shadow-2xl">
            <div className="relative h-16 w-44 md:h-20 md:w-56">
              <Image
                src="/images/brand/telpsam-logo.png"
                alt="TELPSAM logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <span className="mt-8 inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-white">
            Established 2001
          </span>
          <h1 className="mt-5 max-w-2xl font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
            The Lord&apos;s Pentecostal Students &amp; Associates&apos; Ministry
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/80">
            Reaching tertiary campuses across Ghana with the gospel — raising
            students who stand firm in Christ, the sure foundation, and spread
            the Word.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#campuses" className="btn btn-primary">
              Find my campus
            </Link>
            <Link href="/contact" className="btn btn-white">
              New student? Connect
            </Link>
          </div>
        </div>
      </section>

      {/* Activities banner */}
      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-5 text-sm font-bold uppercase tracking-wide lg:px-8">
          {activities.map((activity, i) => (
            <span key={activity} className="flex items-center gap-x-4">
              {i > 0 && <span className="text-white/40">•</span>}
              {activity}
            </span>
          ))}
        </div>
      </section>

      {/* Impact stats */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1100px] grid-cols-3 divide-x divide-border px-4 py-10 lg:px-8">
          {[
            { value: "2001", label: "Established" },
            { value: "7", label: "Campus Fellowships" },
            { value: "Nationwide", label: "Tertiary Reach" },
          ].map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="font-serif text-2xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-text-muted md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stay rooted — illustrated */}
      <section className="bg-muted-surface">
        <div className="mx-auto grid max-w-[1200px] items-stretch lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80"
              alt="Students in fellowship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-14 lg:px-14 lg:py-20">
            <span className="section-accent" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Stay Rooted on Campus
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              We reach universities and colleges with the gospel — Bible study,
              evangelism, and peer discipleship so students shine as lights
              during their academic years and beyond.
            </p>
            <p className="mt-4 leading-relaxed text-text-muted">
              From your first week on campus to graduation and into alumni life,
              TELPSAM is a family that keeps you grounded in Christ and connected
              to fellow believers.
            </p>
          </div>
        </div>
      </section>

      {/* Campus fellowships — vertical list */}
      <section id="campuses" className="scroll-mt-20 bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="text-center">
            <span className="section-accent mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Campus Fellowships
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">
              Seven fellowships covering tertiary institutions across the nation.
            </p>
          </div>

          <ol className="mt-12 space-y-4">
            {campuses.map((c, i) => (
              <li
                key={c.name}
                className="group flex items-start gap-5 border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-md md:gap-7 md:p-7"
              >
                <span className="font-serif text-3xl font-bold leading-none text-primary/25 transition-colors group-hover:text-primary/50 md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-foreground group-hover:text-primary md:text-xl">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {c.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* New students & alumni */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="flex flex-col border-t-4 border-primary bg-white p-7 md:p-9">
              <GraduationCap className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                New Student?
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-text-muted">
                Just gained admission to a tertiary institution, or looking for a
                place of worship on campus? Share your details and we&apos;ll
                follow up and welcome you into the family.
              </p>
              <Link href="/contact" className="btn btn-primary mt-6 w-fit">
                Connect with TELPSAM
              </Link>
            </article>

            <article className="flex flex-col border-t-4 border-secondary bg-white p-7 md:p-9">
              <Users className="h-8 w-8 text-secondary" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-xl font-bold text-foreground">
                TELPSAM Alumni
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-text-muted">
                Update your information to reconnect with old colleagues and for
                the opportunity to mentor and support the current generation of
                students.
              </p>
              <Link href="/contact" className="btn btn-secondary mt-6 w-fit">
                Update your details
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Expansion / pioneer CTA */}
      <section className="bg-footer-bg py-14 lg:py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            Expanding to a Campus Near You
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-white/80">
            Don&apos;t see your school yet? We&apos;re growing — contact us to
            help pioneer a TELPSAM fellowship on your campus.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Be a pioneer
          </Link>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Students" />

      <MinistryGallery
        images={gallery}
        heading="TELPSAM in Action"
        subtitle="Fellowship, evangelism, retreats, and campus life in Christ."
      />

      <OtherMinistries current="students" />
    </>
  );
}
