import type { Metadata } from "next";
import Link from "next/link";
import OtherMinistries from "@/components/ministries/OtherMinistries";
import MinistryLeaders from "@/components/ministries/MinistryLeaders";
import MinistryGallery from "@/components/ministries/MinistryGallery";
import MinistryHeroMedia from "@/components/ministries/MinistryHeroMedia";
import {
  getMinistryHero,
  getMinistryGallery,
  getMinistryLeaders,
} from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import MinistryRelatedContent from "@/components/ministries/MinistryRelatedContent";

const PAGE_ROUTE = "ministries/children";

export const metadata: Metadata = {
  title: "Children Ministry",
  description:
    "The Children's Ministry of TLPCI — helping children know Jesus through age-appropriate classes, worship, and Bible teaching.",
};

const classes = [
  { title: "Alpha Class", ages: "Ages 3–5", text: "Nursery & Kindergarten" },
  { title: "Genesis Class", ages: "Ages 6–8", text: "Basic 1 & 2" },
  { title: "David Class", ages: "Ages 9–10", text: "Basic 3 & 4" },
  { title: "John Class", ages: "Ages 10–12", text: "Basic 5 & 6" },
  { title: "Samuel Class", ages: "Ages 12–14", text: "JHS 1 & 2" },
  { title: "Timothy Class", ages: "Age 15", text: "JHS 3" },
];

export const revalidate = 300;

export default async function ChildrenMinistryPage() {
  const [heroImage, gallery, liveLeaders, heroCms] = await Promise.all([
    getMinistryHero("Children"),
    getMinistryGallery("Children"),
    getMinistryLeaders("Children"),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  return (
    <>
      {/* Split hero — unique to Children */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[480px]">
            <MinistryHeroMedia
              src={heroImage}
              alt="Children's ministry"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 lg:px-14 lg:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {webText(heroCms, "eyebrow", "Next Generation")}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {webText(heroCms, "title", "Children's Ministry")}
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-text-muted">
              A safe, joyful place where kids encounter Jesus through Bible
              stories, worship, and age-appropriate teaching every Sunday.
            </p>
            <p className="mt-6 text-sm font-semibold text-foreground">
              Sundays during the main service
            </p>
            <Link href="/get-involved/plan-your-visit" className="btn btn-primary mt-6 w-fit">
              Bring your children
            </Link>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <h2 className="text-center text-2xl font-bold uppercase text-foreground md:text-3xl">
            Classes by age
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-text-muted">
            Every child is welcomed into a class that fits their stage of growth.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((group, i) => (
              <div key={group.title} className="bg-white p-6 md:p-8">
                <span className="text-3xl font-bold text-primary/30">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">
                  {group.ages}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {group.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MinistryLeaders leaders={liveLeaders} />

      <MinistryRelatedContent ministry="Children" />

      <MinistryGallery
        images={gallery}
        heading="Children in Action"
        subtitle="Moments from our classes, events, and celebrations."
      />

      {/* Parents */}
      <section className="bg-white py-14 lg:py-16">
        <div className="mx-auto max-w-[800px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="text-2xl font-bold uppercase text-foreground">
            Partnering with parents
          </h2>
          <p className="mt-4 leading-relaxed text-text-muted">
            We come alongside families to raise children who love God, respect
            others, and live with purpose. Volunteers are trained, screened, and
            committed to keeping every child safe and known by name.
          </p>
          <Link href="/get-involved/volunteer" className="btn btn-outline mt-8">
            Serve with kids
          </Link>
        </div>
      </section>

      <OtherMinistries current="children" />
    </>
  );
}
