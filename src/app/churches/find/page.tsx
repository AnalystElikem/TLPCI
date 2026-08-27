import type { Metadata } from "next";
import { getPageBanner } from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";
import Link from "next/link";
import BranchDirectory from "@/components/churches/BranchDirectory";

const PAGE_ROUTE = "churches/find";

export const metadata: Metadata = {
  title: "Find a Church",
  description:
    "Find a TLPCI branch near you — search our 200+ congregations across Ghana and beyond.",
};

export const revalidate = 300;

export default async function ChurchLocatorPage() {
  const [hero, banner] = await Promise.all([
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Find a Church", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Find a Church"
        fallbackImage={
          banner ||
          "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80"
        }
        fallbackEyebrow="Church Locator"
        fallbackTitle="Find a Church"
      />

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-8 text-center lg:px-8">
          <p className="leading-relaxed text-text-muted md:text-lg">
            {webText(
              hero,
              "subtitle",
              "The Lord's Pentecostal Church International is present in communities across Ghana and beyond. Search for your town below — if we're near you, get in touch and we'll connect you to the branch closest to you."
            )}
          </p>
          <nav
            aria-label="Churches pages"
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-wide"
          >
            <Link
              href="/churches/pastors"
              className="text-foreground transition-colors hover:text-primary"
            >
              Branch Pastors
            </Link>
            <span className="hidden text-border sm:inline" aria-hidden>
              |
            </span>
            <Link
              href="/get-involved/plan-your-visit"
              className="text-foreground transition-colors hover:text-primary"
            >
              Plan Your Visit
            </Link>
          </nav>
        </div>
      </section>

      <section className="bg-muted-surface py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <BranchDirectory />
        </div>
      </section>

      {/* Note about details coming */}
      <section className="border-t border-border bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-[900px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Don&apos;t see full details yet?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-text-muted">
            We&apos;re updating each branch with exact addresses and service
            times. In the meantime, reach out and a member of our team will be
            glad to help you find and visit a congregation near you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link href="/get-involved/plan-your-visit" className="btn btn-outline">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
