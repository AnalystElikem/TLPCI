import type { Metadata } from "next";
import Image from "next/image";
import { getMinisters, getPageBanner } from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import Link from "next/link";
import MinistersDirectory from "@/components/churches/MinistersDirectory";

const PAGE_ROUTE = "churches/pastors";

export const metadata: Metadata = {
  title: "Our Ministers",
  description:
    "Meet the apostles, prophets, pastors, reverends, and elders who shepherd The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

export default async function PastorsPage() {
  const [hero, banner, ministerGroups] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Our Ministers", PAGE_ROUTE),
    getMinisters(),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Our Ministers"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1600&q=80"
        }
        fallbackEyebrow="Servants of the Church"
        fallbackTitle="Our Ministers"
      />

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-8 text-center lg:px-8">
          <p className="leading-relaxed text-text-muted md:text-lg">
            {webText(
              hero,
              "subtitle",
              "The apostles, prophets, pastors, reverends, and elders who shepherd our congregations across Ghana and beyond. For our national leadership, see Leadership."
            )}
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <MinistersDirectory ministerGroups={ministerGroups} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative min-h-[220px] md:min-h-[260px]">
          <Image
            src="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1400&q=80"
            alt="Visit a church"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1200px]">
              <span className="section-accent-white" />
              <h2 className="text-xl font-bold uppercase text-white md:text-2xl">
                Ready to visit a congregation?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/85">
                Use the church locator to find a branch near you.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/churches/find" className="btn btn-primary">
                  Find a Church
                </Link>
                <Link href="/get-involved/plan-your-visit" className="btn btn-white">
                  Plan Your Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
