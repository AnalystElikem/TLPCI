import type { Metadata } from "next";
import Link from "next/link";
import { Music2, Mic2, Users, Sliders } from "lucide-react";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import {
  getMinistryHero,
  getMinistryLeaders,
} from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsMinistryHeroText } from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "ministries/music";

export const metadata: Metadata = {
  title: "Music Ministry",
  description:
    "The Music Ministry of TLPCI — leading the church into worship through choir, praise team, and instrumentalists.",
};

const teams = [
  {
    icon: Users,
    title: "Choir & Praise Team",
    text: "Voices raised in unity, leading the congregation into worship every service.",
  },
  {
    icon: Music2,
    title: "Instrumentalists",
    text: "Musicians who serve with skill, setting an atmosphere for God's presence.",
  },
  {
    icon: Mic2,
    title: "Worship Leading",
    text: "Leaders who usher hearts from praise into deep, sincere worship.",
  },
  {
    icon: Sliders,
    title: "Sound & Media",
    text: "The team behind the scenes ensuring every voice and note is heard clearly.",
  },
];

export const revalidate = 300;

export default async function MusicMinistryPage() {
  const [heroImage, liveLeaders, heroCms] = await Promise.all([
    getMinistryHero("Music"),
    getMinistryLeaders("Music"),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      <section className="relative h-[240px] overflow-hidden md:h-[320px]">
        <MinistryHeroMedia src={heroImage} alt="Music ministry" priority />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-end px-4 pb-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1100px]">
            <CmsMinistryHeroText
              cms={heroCms}
              fallbackEyebrow="Worship & Praise"
              fallbackTitle="Music Ministry"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Leading the Church into Worship
          </h2>
          <p className="mt-5 leading-relaxed text-text-muted">
            The Music Ministry ministers in song at every gathering, creating an
            atmosphere for the presence of God. Through the choir, praise team,
            and instrumentalists, we serve with excellence and humility —
            lifting up the name of Jesus and drawing hearts into worship.
          </p>
        </div>
      </section>

      {/* Teams */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold uppercase text-foreground md:text-3xl">
            How We Serve
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => {
              const Icon = team.icon;
              return (
                <div key={team.title} className="bg-white p-6 text-center md:p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{team.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {team.text}
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
            Called to worship God with your gift?
          </p>
          <Link href="/get-involved/volunteer" className="btn btn-primary">
            Join the music ministry
          </Link>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} heading="Ministry Leadership" />

      <MinistryRelatedContent ministry="Music" />

      <OtherMinistries current="music" />
    </>
  );
}
