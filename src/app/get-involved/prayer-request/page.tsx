import type { Metadata } from "next";
import Image from "next/image";
import { getPageBanner } from "@/lib/content-source";
import { getPrayerRequestTypes } from "@/lib/prayer-request-submit";
import { Lock, Heart, Users } from "lucide-react";
import PrayerRequestForm from "@/components/get-involved/PrayerRequestForm";

export const metadata: Metadata = {
  title: "Prayer Request",
  description:
    "Submit a prayer request to The Lord's Pentecostal Church International — our team will stand with you in prayer.",
};

export const revalidate = 300;

export default async function PrayerRequestPage() {
  const [banner, prayerTypes] = await Promise.all([
    getPageBanner("Prayer Request"),
    getPrayerRequestTypes(),
  ]);
  return (
    <>
      <section className="relative min-h-[360px] overflow-hidden">
        <Image
          src={banner || "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80"}
          alt="Prayer"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto flex min-h-[360px] max-w-[900px] flex-col items-center justify-center px-4 py-14 text-center text-white">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="mt-4 font-serif text-4xl font-bold md:text-6xl">We will pray with you</h1>
          <p className="mt-5 max-w-xl leading-relaxed text-white/80">
            Whatever you are carrying, you do not have to carry it alone.
            Share your request with our prayer team.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-8 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <aside className="space-y-5">
            <div className="bg-white p-6">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-bold text-foreground">Your privacy matters</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Confidential requests are seen only by designated prayer leaders.
              </p>
            </div>
            <div className="bg-white p-6">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-bold text-foreground">Prayer support</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                If you ask for contact, a pastoral team member may follow up with you.
              </p>
            </div>
            <blockquote className="border-l-2 border-primary pl-4 font-serif text-lg italic text-text-muted">
              “Cast all your anxiety on him because he cares for you.”
              <footer className="mt-2 font-sans text-xs font-bold uppercase tracking-wide text-primary">1 Peter 5:7</footer>
            </blockquote>
          </aside>

          <PrayerRequestForm types={prayerTypes} />
        </div>
      </section>
    </>
  );
}
