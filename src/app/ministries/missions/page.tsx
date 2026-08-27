import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HandHeart, Plane, HeartHandshake } from "lucide-react";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";
import {
  getMinistryHero,
  getMinistryGallery,
} from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import { CmsMinistryHeroText } from "@/components/cms/CmsPageSections";
import PrayersForSouls from "@/components/ministries/PrayersForSouls";

const PAGE_ROUTE = "ministries/missions";

export const metadata: Metadata = {
  title: "Missions",
  description:
    "Missions at TLPCI — taking the gospel to the nations through prayer, giving, going, and the Jesus The Light Crusade.",
};

const paths = [
  {
    icon: HandHeart,
    title: "Pray",
    text: "Stand with missionaries and open doors through intercession.",
  },
  {
    icon: HeartHandshake,
    title: "Give",
    text: "Resource outreach, church plants, and mercy work.",
  },
  {
    icon: Plane,
    title: "Go",
    text: "Join short-term trips and long-term calling as God leads.",
  },
];

export const revalidate = 300;

export default async function MissionsMinistryPage() {
  const [heroImage, gallery, heroCms] = await Promise.all([
    getMinistryHero("Missions"),
    getMinistryGallery("Missions"),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      <section className="relative min-h-[380px] overflow-hidden md:min-h-[440px]">
        <MinistryHeroMedia src={heroImage} alt="Missions" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 lg:px-16">
          <div className="mx-auto w-full max-w-[1100px]">
            <CmsMinistryHeroText
              cms={heroCms}
              fallbackEyebrow="Go & tell"
              fallbackTitle="Taking the gospel to the nations"
            />
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-14 text-center lg:px-8 lg:py-16">
          <span className="section-accent mx-auto" />
          <blockquote className="font-serif text-2xl italic leading-snug text-foreground md:text-3xl">
            &ldquo;Go ye into all the world, and preach the gospel to every
            creature.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-primary">
            Mark 16:15
          </p>
        </div>
      </section>

      {/* Pray / Give / Go */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
              Everyone can take part
            </h2>
            <p className="mt-3 text-sm text-text-muted md:text-base">
              Missions is not only for a few — the whole church partners in the
              Great Commission.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {paths.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center bg-primary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold uppercase text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Partner with us
            </Link>
            <Link href="/get-involved/prayer-request" className="btn btn-outline">
              Pray with us
            </Link>
          </div>
        </div>
      </section>

      {/* Jesus The Light Crusade */}
      <section className="bg-footer-bg py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            Mission Directorate
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            Jesus The Light Crusade
          </h2>
          <p className="mt-2 text-lg font-bold text-primary">
            Coming to a Community Near You
          </p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80">
            A mobile crusade led by the General Overseer under the auspices of
            the Mission Directorate, taking the gospel to unreached communities.
            Through the preaching of the Word, prayer, healing, and deliverance,
            Jesus — the Light of the world — is presented so that many come out
            of darkness into His marvellous light.
          </p>

          <div className="mx-auto mt-10 max-w-[900px] overflow-hidden shadow-2xl">
            <Image
              src="/images/ministries/missions/jitl-web.jpg"
              alt="Jesus The Light Crusade"
              width={2048}
              height={1120}
              className="h-auto w-full"
            />
          </div>

          <Link href="/contact" className="btn btn-primary mt-10">
            Invite the crusade to your community
          </Link>
        </div>
      </section>

      <MinistryRelatedContent ministry="Missions" />

      {/* Prayers for Souls slider */}
      <PrayersForSouls />

      {/* Gallery */}
      <MinistryGallery
        images={gallery}
        heading="Missions in Action"
        subtitle="Crusades, outreaches, and lives touched by the gospel."
      />

      <OtherMinistries current="missions" />
    </>
  );
}
