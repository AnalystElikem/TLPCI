import type { Metadata } from "next";
import Image from "next/image";
import { getMinisters, getPageBanner } from "@/lib/content-source";
import Link from "next/link";
import MinistersDirectory from "@/components/churches/MinistersDirectory";

export const metadata: Metadata = {
  title: "Our Ministers",
  description:
    "Meet the apostles, prophets, pastors, reverends, and elders who shepherd The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

export default async function PastorsPage() {
  const [banner, ministerGroups] = await Promise.all([
    getPageBanner("Our Ministers"),
    getMinisters(),
  ]);
  return (
    <>
      <section className="relative h-[200px] w-full overflow-hidden md:h-[280px]">
        <Image
          src={banner || "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1600&q=80"}
          alt="Our Ministers"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            Servants of the Church
          </p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
            Our Ministers
          </h1>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-8 text-center lg:px-8">
          <p className="leading-relaxed text-text-muted md:text-lg">
            The apostles, prophets, pastors, reverends, and elders who shepherd
            our congregations across Ghana and beyond. For our national
            leadership, see{" "}
            <Link
              href="/about/leadership"
              className="font-medium text-primary hover:underline"
            >
              Leadership
            </Link>
            .
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
