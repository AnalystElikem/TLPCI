import type { Metadata } from "next";
import Image from "next/image";
import { getPageBanner } from "@/lib/content-source";
import Link from "next/link";
import { GraduationCap, BookOpen, HeartHandshake, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Education",
  description:
    "The Lord's Academy basic schools, the ISOM-affiliated Bible training school (TLLBTS), and a scholarship scheme supporting hundreds of students — how TLPCI invests in education.",
};

const academyLocations = ["Kwashieman", "Ashaiman"];

const programmes = ["Certificate", "Diploma", "Degree", "Masters"];

export const revalidate = 300;

export default async function EducationPage() {
  const banner = await getPageBanner("Education");
  return (
    <>
      {/* Hero */}
      <section className="relative h-[240px] overflow-hidden md:h-[340px]">
        <Image
          src={banner || "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1600&q=80"}
          alt="Education"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            Reaching Minds &amp; Hearts
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
            Education &amp; Training
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Transforming the Whole Person
          </h2>
          <p className="mt-5 leading-relaxed text-text-muted">
            We believe the gospel touches every part of life. Alongside the
            preaching of the Word, The Lord&apos;s Pentecostal Church
            International invests in education — nurturing young minds, training
            leaders for ministry, and opening doors of opportunity for the next
            generation.
          </p>
        </div>
      </section>

      {/* The Lord's Academy */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative order-last min-h-[280px] overflow-hidden shadow-sm lg:order-first lg:min-h-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80"
              alt="The Lord's Academy"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <GraduationCap className="h-4 w-4" />
              Basic Education
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
              The Lord&apos;s Academy
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              The Lord&apos;s Academy is our network of basic schools providing
              quality education from the early years through Junior High School
              (JHS). Rooted in Christian values and academic excellence, our
              schools shape children into confident, God-fearing young people
              prepared for the future.
            </p>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
                Our Campuses
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {academyLocations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 border border-border bg-white px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {loc}
                  </span>
                ))}
                <span className="inline-flex items-center px-3 py-1.5 text-sm italic text-text-muted">
                  and more across the nation
                </span>
              </div>
            </div>
            <Link href="/contact" className="btn btn-primary mt-8">
              Enquire about admissions
            </Link>
          </div>
        </div>
      </section>

      {/* TLLBTS */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <BookOpen className="h-4 w-4" />
              Ministry Training
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-3xl">
              The Lord&apos;s Leadership Bible Training School
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              TLLBTS equips men and women for ministry and leadership through
              sound, structured theological education. The school is affiliated
              with the International School of Ministry (ISOM), and offers a
              clear path of study from foundational to advanced levels:
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {programmes.map((p) => (
                <div
                  key={p}
                  className="border-t-2 border-primary bg-muted-surface px-4 py-3 text-center text-sm font-bold text-foreground"
                >
                  {p}
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn btn-primary mt-8">
              Enquire about programmes
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden shadow-sm lg:min-h-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80"
              alt="Bible training school"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Scholarship scheme */}
      <section className="bg-secondary py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center lg:px-8">
          <HeartHandshake className="mx-auto h-10 w-10" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
            The Scholarship Scheme
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/90">
            Through our scholarship scheme, the church has supported hundreds of
            needy but brilliant young people to pursue their education —
            removing financial barriers and releasing God-given potential in the
            lives of students who might otherwise have been left behind.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-white">
              Support a student
            </Link>
            <Link href="/contact" className="btn btn-outline !border-white/60 !text-white hover:!bg-white/10">
              Apply for a scholarship
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
