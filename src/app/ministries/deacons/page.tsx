import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, DoorOpen, Coffee, HandHelping } from "lucide-react";
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
  title: "Deacons & Deaconesses",
  description:
    "The Deacons & Deaconesses of TLPCI — the ministry of helps, serving the church through welfare, hospitality, and order.",
};

const duties = [
  {
    icon: HeartHandshake,
    title: "Welfare & Benevolence",
    text: "Caring for members in need and showing the practical love of Christ.",
  },
  {
    icon: DoorOpen,
    title: "Ushering & Order",
    text: "Welcoming worshippers and keeping the house of God in decency and order.",
  },
  {
    icon: Coffee,
    title: "Hospitality & Care",
    text: "Receiving guests warmly and making every visitor feel at home.",
  },
  {
    icon: HandHelping,
    title: "Supporting the Ministers",
    text: "Serving alongside the pastors so the work of the Gospel flows freely.",
  },
];

export const revalidate = 300;

export default async function DeaconsMinistryPage() {
  const [hero, gallery, liveLeaders] = await Promise.all([
    getMinistryHero("Deacons & Deaconesses"),
    getMinistryGallery("Deacons & Deaconesses"),
    getMinistryLeaders("Deacons & Deaconesses"),
  ]);
  return (
    <>
      <section className="relative h-[240px] overflow-hidden md:h-[320px]">
        <MinistryHeroMedia src={hero} alt="Deacons and deaconesses" priority />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-end px-4 pb-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1100px]">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              The Ministry of Helps
            </p>
            <h1 className="mt-2 text-3xl font-bold uppercase text-white sm:text-4xl md:text-5xl">
              Deacons &amp; Deaconesses
            </h1>
          </div>
        </div>
      </section>

      {/* Intro + scripture */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Serving the Body of Christ
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              The Deacons and Deaconesses carry the ministry of helps —
              attending to the practical life of the church so the work of the
              Gospel flows without hindrance. From welfare and hospitality to
              order and care for members, they serve quietly and faithfully,
              following the example of the first deacons chosen in the early
              church.
            </p>
          </div>
          <div className="flex items-center">
            <blockquote className="border-l-2 border-primary bg-muted-surface p-6 md:p-8">
              <p className="italic leading-relaxed text-foreground">
                &ldquo;Look ye out among you seven men of honest report, full of
                the Holy Ghost and wisdom, whom we may appoint over this
                business.&rdquo;
              </p>
              <cite className="mt-3 block text-sm font-bold not-italic text-primary">
                — Acts 6:3
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Duties */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold uppercase text-foreground md:text-3xl">
            How They Serve
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {duties.map((duty) => {
              const Icon = duty.icon;
              return (
                <div key={duty.title} className="bg-white p-6 text-center md:p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{duty.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {duty.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-footer-bg py-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center lg:px-8">
          <p className="text-lg font-bold text-white md:text-xl">
            Do you have a heart to serve?
          </p>
          <Link href="/get-involved/volunteer" className="btn btn-primary">
            Serve with us
          </Link>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Deacons & Deaconesses" />

      <MinistryGallery
        images={gallery}
        heading="Serving in Action"
        subtitle="The ministry of helps at work in the house of God."
      />

      <OtherMinistries current="deacons" />
    </>
  );
}
