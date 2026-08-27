import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, CalendarDays, Home } from "lucide-react";
import { getEvents, getPageBanner, eventPath } from "@/lib/content-source";
import { getWebPageSection } from "@/lib/web-page-content";
import CmsPageBanner from "@/components/cms/CmsPageSections";

const PAGE_ROUTE = "news-events/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events, crusades, and gatherings at The Lord's Pentecostal Church International.",
};

export const revalidate = 300;

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80";

export default async function EventsPage() {
  const [events, hero, banner] = await Promise.all([
    getEvents(),
    getWebPageSection(PAGE_ROUTE, "hero"),
    getPageBanner("Events", PAGE_ROUTE),
  ]);
  return (
    <>
      <CmsPageBanner
        cms={hero}
        alt="Events"
        fallbackImage={banner || DEFAULT_BANNER}
        fallbackEyebrow="Join Us"
        fallbackTitle="Events"
      />

      {/* Home cells promo */}
      <section className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1600&q=80"
          alt="Home cell fellowship"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/95 via-secondary-dark/85 to-secondary/70" />
        <div className="relative mx-auto max-w-[1100px] px-4 py-14 lg:px-8 lg:py-20">
          <div className="max-w-2xl text-white">
            <span className="section-accent-white" />
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              <Home className="h-4 w-4" />
              Belong · Grow · Care
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Grow Closer in a Home Cell
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Home cells are where the church becomes family — small groups
              meeting in homes across each branch for prayer, the Word, and
              genuine care for one another. It is the easiest place to belong,
              grow in faith, and be truly known.
            </p>

            <blockquote className="mt-6 border-l-2 border-white/50 pl-4">
              <p className="font-serif italic leading-relaxed text-white/95">
                &ldquo;And they, continuing daily with one accord in the temple,
                and breaking bread from house to house, did eat their meat with
                gladness and singleness of heart.&rdquo;
              </p>
              <cite className="mt-2 block text-sm font-bold not-italic text-white">
                — Acts 2:46
              </cite>
            </blockquote>

            <Link href="/churches/find" className="btn btn-white mt-8">
              Find a home cell near you
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events list */}
      <section className="bg-muted-surface py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="section-accent" />
              <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
                Upcoming events
              </h2>
            </div>
            <p className="hidden text-sm text-text-muted sm:block">
              {events.length} scheduled
            </p>
          </div>

          {events.length === 0 && (
            <p className="mt-8 text-text-muted">
              No church-wide events are scheduled right now — please check back
              soon, or visit a ministry page for its events.
            </p>
          )}
          <ul className="mt-8 space-y-4">
            {events.map((event) => {
              const [month, day] = event.date.split(" ");
              return (
                <li
                  key={event.id}
                  className="grid gap-4 bg-white p-5 shadow-sm sm:grid-cols-[90px_1fr_auto] sm:items-center sm:gap-6 md:p-6"
                >
                  <Link
                    href={eventPath(event.id)}
                    className="flex h-[72px] w-[72px] flex-col items-center justify-center bg-foreground text-white sm:h-[80px] sm:w-[80px]"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wide">
                      {month}
                    </span>
                    <span className="text-2xl font-bold leading-none sm:text-3xl">
                      {day}
                    </span>
                  </Link>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {event.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">
                      <Link href={eventPath(event.id)} className="hover:text-primary">
                        {event.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">
                      {event.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={eventPath(event.id)}
                    className="btn btn-outline w-fit sm:justify-self-end"
                  >
                    View details
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] px-4 text-center lg:px-8">
          <CalendarDays className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 text-xl font-bold uppercase text-foreground md:text-2xl">
            Can&apos;t make it in person?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
            Most services are streamed live so you can join from anywhere.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/media/livestream" className="btn btn-primary">
              Watch Live
            </Link>
            <Link href="/churches/find" className="btn btn-outline">
              Find a Church
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
