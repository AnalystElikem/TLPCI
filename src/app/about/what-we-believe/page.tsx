import type { Metadata } from "next";
import Image from "next/image";
import { getPageBanner } from "@/lib/content-source";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { basisOfFaith } from "@/data/content";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "Our mission and basis of faith — the fundamental truths The Lord's Pentecostal Church International holds to.",
};

export const revalidate = 300;

export default async function WhatWeBelievePage() {
  const banner = await getPageBanner("What We Believe");
  return (
    <>
      {/* Banner */}
      <section className="relative h-[200px] w-full overflow-hidden md:h-[280px]">
        <Image
          src={banner || "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1600&q=80"}
          alt="What We Believe"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-center text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
            What We Believe
          </h1>
        </div>
      </section>

      {/* Mission statement — the big statement */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-[1100px] px-4 py-16 text-center lg:px-8 lg:py-24">
          <span className="section-accent-white mx-auto" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            Our Mission
          </p>
          <p className="mx-auto mt-6 max-w-4xl font-serif text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.25]">
            To bring people to know Jesus Christ and join His family, to build
            them to Christlike maturity and equip them through the Holy Spirit
            for ministry in the church and the world, to the glory of God.
          </p>
        </div>
      </section>

      {/* Basis of Faith */}
      <section className="bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center">
            <span className="section-accent mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Basis of Faith
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-muted">
              These are the fundamental truths we hold to as a church — the
              beliefs that shape our worship, our teaching, and our life
              together.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {basisOfFaith.map((item, index) => (
              <article
                key={index}
                className="flex flex-col border-l-2 border-primary bg-white p-6 shadow-sm"
              >
                <p className="flex-1 text-justify leading-relaxed text-foreground">
                  {item.text}
                </p>
                <p className="mt-4 flex items-start gap-2 border-t border-border-subtle pt-3 text-left text-sm font-medium text-primary">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{item.refs}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Keep worship with us CTA */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[220px] md:min-h-[260px]">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80"
            alt="Church gathering"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1400px]">
              <span className="section-accent-white" />
              <h2 className="text-xl font-bold uppercase text-white md:text-2xl">
                Ready to grow in the Word with us?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/85">
                Join a Bible study, Sunday service, or membership class near you.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/churches/find" className="btn btn-primary">
                  Find a Church
                </Link>
                <Link href="/get-involved/membership" className="btn btn-white">
                  Membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
