import type { Metadata } from "next";
import Image from "next/image";
import { getLivestream, getPageBanner } from "@/lib/content-source";
import { getWebPageSection, webText } from "@/lib/web-page-content";
import Link from "next/link";
import { Radio, Calendar, Clock, Youtube, Facebook } from "lucide-react";
import { youtubeVideoId } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Livestream",
  description:
    "Watch TLPCI services and The Lord's Hour live, or catch the replay — worship with us from anywhere.",
};

const upcoming = [
  {
    title: "Church Service at TLPCI Ashaiman Central",
    note: "General Overseer's Branch",
    when: "Sunday · 8:00 am",
  },
  {
    title: "Church Service at TLPCI Abundant Life Centre",
    note: "Headquarters Branch",
    when: "Sunday · 8:30 am",
  },
  { title: "The Lord's Hour", when: "Wednesday · 10:00 pm" },
];

const PAGE_ROUTE = "media/livestream";

export const revalidate = 300;

export default async function LivestreamPage() {
  const [banner, live, hero] = await Promise.all([
    getPageBanner("Livestream", PAGE_ROUTE),
    getLivestream(),
    getWebPageSection(PAGE_ROUTE, "hero"),
  ]);
  const youtubeId = youtubeVideoId(live.youtubeUrl);
  const hasVideo = Boolean(youtubeId || live.facebookUrl);
  const statusLabel = !hasVideo
    ? null
    : live.isLive
      ? "Live"
      : "On demand";

  return (
    <>
      {/* Theater-style dark page */}
      <section className="bg-[#111] text-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 lg:px-8 lg:py-14">
          <div className="flex flex-wrap items-center gap-3">
            {statusLabel && (
              <span className="inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide">
                <Radio className="h-3.5 w-3.5" />
                {statusLabel}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold uppercase md:text-5xl">
            {webText(hero, "title", "Livestream")}
          </h1>
          <p className="mt-3 max-w-lg text-white/70">
            {webText(
              hero,
              "subtitle",
              "Join us for worship and the Word online — or catch the replay when you can't make it in person."
            )}
          </p>

          {/* Player */}
          <div className="relative mt-8 aspect-video overflow-hidden bg-black shadow-2xl">
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={live.sourceTitle ?? "Livestream"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : live.facebookUrl ? (
              <iframe
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(live.facebookUrl)}&show_text=false&width=1100`}
                title={live.sourceTitle ?? "Livestream"}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <>
                <Image
                  src={
                    banner ||
                    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1400&q=80"
                  }
                  alt="Livestream"
                  fill
                  className="object-cover opacity-40"
                  sizes="1100px"
                  priority
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white md:h-20 md:w-20">
                    <Radio className="h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <p className="mt-5 text-lg font-bold uppercase md:text-xl">
                    No live video
                  </p>
                  <p className="mt-2 max-w-md text-sm text-white/65">
                    Add a YouTube or Facebook live link to a published sermon in
                    Church IT and it will appear here automatically.
                  </p>
                </div>
              </>
            )}
          </div>

          {live.sourceTitle && hasVideo && (
            <p className="mt-4 text-sm text-white/70">
              {live.isLive ? "Live now" : "Now playing"}:{" "}
              <span className="font-medium text-white">{live.sourceTitle}</span>
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {live.youtubeUrl && (
              <a
                href={live.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            )}
            {live.facebookUrl && (
              <a
                href={live.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
            )}
            <Link
              href="/media/sermons"
              className="inline-flex items-center border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/10"
            >
              Past Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming schedule */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <span className="section-accent" />
              <h2 className="text-2xl font-bold uppercase text-foreground">
                When we go live
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Join from anywhere. Times shown in local church schedule —
                arrive a few minutes early to settle in online.
              </p>
              <Link
                href="/get-involved/plan-your-visit"
                className="btn btn-outline mt-6"
              >
                Prefer in person?
              </Link>
            </div>

            <ul className="space-y-0 border-t border-border">
              {upcoming.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start justify-between gap-4 border-b border-border py-5"
                >
                  <div>
                    <p className="font-bold text-foreground">{item.title}</p>
                    {item.note && (
                      <p className="text-xs italic text-text-muted">
                        {item.note}
                      </p>
                    )}
                    <p className="mt-1 flex items-center gap-2 text-sm text-text-muted">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {item.when}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
                    <Clock className="h-3 w-3" />
                    Live
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
