import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { CHURCH_LOGO } from "@/lib/constants";
import { events as fallbackEvents } from "@/data/content";
import { eventPath, type EventItem } from "@/lib/content-source";

export default function EventsBar({ events }: { events?: EventItem[] }) {
  // `events` is always provided by the homepage (may be an empty church-wide
  // list). Only fall back to samples if the prop is entirely absent.
  const list: EventItem[] = events ?? fallbackEvents;
  const featured = list.slice(0, 3);
  // Always show 3 slots on the homepage — fill any empties with a branded
  // "coming soon" placeholder until there are three real events.
  const placeholders = Math.max(0, 3 - featured.length);

  return (
    <section className="bg-muted-surface py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading title="Upcoming Events">
          <Link
            href="/news-events/events"
            className="btn btn-primary hidden shrink-0 sm:inline-block"
          >
            More Events
          </Link>
        </SectionHeading>

        <div className="mx-auto grid max-w-[420px] gap-6 md:mx-0 md:max-w-none md:grid-cols-3">
          {featured.map((event) => {
            const poster = event.poster;
            return (
              <Link
                key={event.id}
                href={eventPath(event.id)}
                className="card-shadow group block overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Poster: square frame; object-contain guarantees the full
                    poster is always visible, never cropped */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  {poster ? (
                    <Image
                      src={poster}
                      alt={`${event.title} poster`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center border-b border-border-subtle bg-gradient-to-b from-white to-muted-surface">
                      <Image
                        src={CHURCH_LOGO}
                        alt=""
                        width={64}
                        height={64}
                        className="h-16 w-16 object-contain opacity-90"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                    {event.category}
                  </p>
                  <h3 className="mt-1 font-bold text-foreground group-hover:text-primary">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {event.date} · {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
          {Array.from({ length: placeholders }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="card-shadow block overflow-hidden"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-white">
                <div className="absolute inset-0 flex items-center justify-center border-b border-border-subtle bg-gradient-to-b from-white to-muted-surface">
                  <Image
                    src={CHURCH_LOGO}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain opacity-90"
                  />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                  Coming soon
                </p>
                <h3 className="mt-1 font-bold text-foreground/70">
                  New event to be announced
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news-events/events" className="btn btn-primary">
            More Events
          </Link>
        </div>
      </div>
    </section>
  );
}
