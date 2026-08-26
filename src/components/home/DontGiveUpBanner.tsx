import Link from "next/link";
import { getDailyVerse } from "@/lib/daily";

// Server component — today's verse is chosen deterministically at render.
// The homepage revalidates daily (see app/page.tsx), so this updates on its
// own with no manual posting and the full verse list stays off the client.
export default function DontGiveUpBanner() {
  const entry = getDailyVerse();

  return (
    <section className="bg-secondary py-9">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:items-center lg:px-8">
        <div>
          <span className="section-accent-white" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-white md:text-2xl">
            {entry.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/90">
            &hellip;{entry.verse} ({entry.ref})
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-nowrap">
          <Link
            href="/contact"
            className="btn btn-white shrink-0 whitespace-nowrap"
          >
            Give Your Life to Christ Today
          </Link>
          <Link
            href="/get-involved/prayer-request"
            className="btn btn-white shrink-0 whitespace-nowrap"
          >
            Request a Prayer
          </Link>
          <Link
            href="/churches/find"
            className="btn btn-white shrink-0 whitespace-nowrap"
          >
            Find a Church Near You
          </Link>
        </div>
      </div>
    </section>
  );
}
