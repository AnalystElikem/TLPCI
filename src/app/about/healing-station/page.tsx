import type { Metadata } from "next";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import Link from "next/link";
import { Clock, Sparkles, BedDouble, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Healing Station",
  description:
    "The Tokokoe Healing Station near Ho in the Volta Region — a place of round-the-clock prayer, healing, and deliverance, with accommodation and an on-site clinic.",
};

const facilities = [
  {
    icon: BedDouble,
    title: "Accommodation",
    text: "On-site lodging for those who need to stay and seek God without distraction.",
  },
  {
    icon: Stethoscope,
    title: "Clinic",
    text: "A clinic attends to the physical and medical needs of visitors — caring for the whole person.",
  },
  {
    icon: Clock,
    title: "Round-the-Clock Prayer",
    text: "Ministers are available day and night, so no one seeking help is ever turned away.",
  },
];

const PAGE_ROUTE = "about/healing-station";

export const revalidate = 300;

export default async function HealingStationPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Healing Station", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="The Tokokoe Healing Station"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80"
        }
        fallbackEyebrow="A Place of Encounter"
        fallbackTitle="The Tokokoe Healing Station"
        heightClass="min-h-[380px] md:min-h-[460px]"
        overlayClass="bg-gradient-to-t from-black/85 via-black/55 to-black/40"
      />

      {/* Intro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            A Refuge of Prayer, Healing &amp; Deliverance
          </h2>
          <p className="mt-5 leading-relaxed text-text-muted">
            Set at Tokokoe, near Ho in the Volta Region, the Healing Station is
            a dedicated place where those carrying heavy burdens find refuge and
            round-the-clock spiritual care. Pastors, prophets, and prophetesses
            are available day and night to minister to all who come — praying
            them through spiritual battles, oppression, sickness, and every kind
            of need. Many arrive weary and burdened, and leave free.
          </p>
        </div>
      </section>

      {/* Signs and wonders */}
      <section className="bg-footer-bg py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <Sparkles className="mx-auto h-10 w-10 text-primary" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl font-bold md:text-3xl">
            Signs, Wonders &amp; Miracles
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/85">
            Over the years, God has wrought remarkable miracles, signs, and
            wonders at the Healing Station — healing the sick, delivering the
            oppressed, and restoring hope to the broken. Testimony after
            testimony continues to point to the power and faithfulness of God.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="text-center">
            <span className="section-accent mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Caring for Body &amp; Soul
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted">
              The Healing Station is equipped to receive and care for everyone
              who comes seeking God.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {facilities.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white p-6 text-center md:p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {f.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Do you need prayer or a place to seek God?
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-text-muted">
            Reach out to us, or send a prayer request — and if you would like to
            visit the Healing Station, we will gladly help you plan your stay.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-involved/prayer-request" className="btn btn-primary">
              Request prayer
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact us to visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
