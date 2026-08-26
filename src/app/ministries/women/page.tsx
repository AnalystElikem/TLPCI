import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";
import {
  getMinistryHero,
  getMinistryGallery,
  getMinistryLeaders,
} from "@/lib/content-source";

export const metadata: Metadata = {
  title: "Women's Ministry",
  description:
    "The Women's Ministry of TLPCI — fellowship, teaching, and support for women to flourish in Christ.",
};

const circles = [
  {
    title: "Prayer Circle",
    text: "Intercession for families, the church, and nations.",
  },
  {
    title: "Discipleship",
    text: "Word study and mentoring across seasons of life.",
  },
  {
    title: "Fellowship",
    text: "Encouragement, friendship, and shared celebration.",
  },
  {
    title: "Service",
    text: "Practical love for the congregation and community.",
  },
];

export const revalidate = 300;

export default async function WomenMinistryPage() {
  const [hero, gallery, liveLeaders] = await Promise.all([
    getMinistryHero("Women"),
    getMinistryGallery("Women"),
    getMinistryLeaders("Women"),
  ]);
  return (
    <>
      {/* Editorial centered intro — no full-bleed dark banner */}
      <section className="bg-white">
        <div className="mx-auto max-w-[720px] px-4 py-16 text-center lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
            Women of virtue
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
            Flourishing
            <br />
            in Christ
          </h1>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-text-muted md:text-lg">
            Fellowship, teaching, and support for sisters at every stage —
            rooted in prayer and practical Christian living.
          </p>
          <p className="mt-6 text-sm font-semibold text-foreground">
            Meeting days vary by branch —{" "}
            <Link
              href="/get-involved/plan-your-visit"
              className="text-primary hover:underline"
            >
              find your branch time
            </Link>
          </p>
        </div>
      </section>

      <section className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
        <MinistryHeroMedia src={hero} alt="Women's fellowship" priority />
      </section>

      {/* Two-column prose + circles list */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              A place to grow together
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-text-muted">
              <p>
                Women&apos;s Ministry welcomes sisters of every age — young
                women, mothers, and elders — into a community where the Word
                shapes daily life.
              </p>
              <p>
                We gather to pray, learn, and encourage one another so each
                woman can flourish spiritually and serve the body of Christ with
                confidence.
              </p>
            </div>
            <Link href="/get-involved/volunteer" className="btn btn-primary mt-8">
              Get connected
            </Link>
          </div>

          <ul className="space-y-5">
            {circles.map((item) => (
              <li
                key={item.title}
                className="border-b border-border pb-5 last:border-0"
              >
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Women" />

      <MinistryGallery
        images={gallery}
        heading="Women in Action"
        subtitle="Fellowship, prayer, and sisterhood in Christ."
      />

      <OtherMinistries current="women" />
    </>
  );
}
