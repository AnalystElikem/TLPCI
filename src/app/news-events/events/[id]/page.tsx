import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  UserPlus,
  Users,
  Building2,
  Tag,
} from "lucide-react";
import { CHURCH_LOGO } from "@/lib/constants";
import { getAllEvents, getEvent, eventPath, eventSignUpPath, isEventPast } from "@/lib/content-source";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getAllEvents();
  return items.map((item) => ({ id: encodeURIComponent(String(item.id)) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(decodeURIComponent(id));
  return {
    title: event ? event.title : "Event",
    description: event?.description,
  };
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border-subtle py-3 last:border-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-foreground">{children}</dd>
    </div>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const all = await getAllEvents();
  const event = all.find((e) => String(e.id) === decodedId);
  if (!event) notFound();

  const others = all
    .filter((e) => String(e.id) !== String(event.id))
    .slice(0, 3);

  const location = event.address || event.location;
  const hasEndDate = Boolean(event.endDate?.trim());
  const whenLine = event.allDay
    ? "All day"
    : [event.startTime, event.endTime].filter(Boolean).join(" – ") || event.time;
  const dateRange = hasEndDate
    ? `${event.startDate || event.date} – ${event.endDate}`
    : event.startDate || event.date;
  const canSignUp = Boolean(event.allowSignUps && !isEventPast(event));

  return (
    <>
      {/* Poster hero — custom_event_poster from Church IT */}
      <section className="relative min-h-[280px] overflow-hidden md:min-h-[420px]">
        {event.poster ? (
          <Image
            src={event.poster}
            alt={`${event.title} poster`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-dark via-secondary to-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
        <div className="relative flex min-h-[280px] flex-col justify-end px-4 pb-8 md:min-h-[420px] lg:px-8">
          <div className="mx-auto w-full max-w-[1100px]">
            <Link
              href="/news-events/events"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All events
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/75">
              {[event.type || event.category, dateRange].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
              {event.functionName || event.title}
            </h1>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              {whenLine && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {whenLine}
                </li>
              )}
              {location && (
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {location}
                </li>
              )}
              {event.associatedMinistry && (
                <li className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {event.associatedMinistry}
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Content + Church IT field details */}
      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 lg:grid-cols-[1fr_340px] lg:gap-12 lg:px-8">
          <div>
            {event.description ? (
              <div className="max-w-2xl">
                <span className="section-accent" />
                <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
                  About this event
                </h2>
                <p className="mt-4 text-justify text-base leading-relaxed text-text-muted md:text-lg">
                  {event.description}
                </p>
              </div>
            ) : (
              <p className="text-text-muted">More details for this event will be posted soon.</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {canSignUp ? (
                <Link href={eventSignUpPath(event.id)} className="btn btn-primary">
                  <span className="inline-flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Sign up to attend
                  </span>
                </Link>
              ) : (
                <p className="w-full text-sm text-text-muted">
                  {event.allowSignUps
                    ? "Sign-ups are closed for this event."
                    : "Registration is not required for this event."}
                </p>
              )}
              <Link href="/media/livestream" className="btn btn-outline">
                Watch online
              </Link>
            </div>
          </div>

          <aside className="bg-white p-6 shadow-sm lg:sticky lg:top-8 lg:self-start">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Event details
              </h2>
            </div>
            <dl className="mt-4">
              {(event.type || event.category) && (
                <DetailRow label="Type">
                  <span className="inline-flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-primary" />
                    {event.type || event.category}
                  </span>
                </DetailRow>
              )}

              <DetailRow label="Name">{event.functionName || event.title}</DetailRow>

              {event.associatedMinistry && (
                <DetailRow label="Associated ministry">{event.associatedMinistry}</DetailRow>
              )}

              <DetailRow label={hasEndDate ? "Date range" : "Date"}>
                {dateRange}
              </DetailRow>

              <DetailRow label="Time">{whenLine || "To be announced"}</DetailRow>

              {event.allDay && (
                <DetailRow label="All day">Yes — this runs all day</DetailRow>
              )}

              {location ? (
                <DetailRow label="Address">{location}</DetailRow>
              ) : (
                <DetailRow label="Address">Location to be announced</DetailRow>
              )}

              <DetailRow label="Sign-ups">
                {canSignUp ? (
                  <Link
                    href={eventSignUpPath(event.id)}
                    className="font-semibold text-primary hover:underline"
                  >
                    Open — register now
                  </Link>
                ) : event.allowSignUps ? (
                  "Sign-ups are closed for this event"
                ) : (
                  "No registration required"
                )}
              </DetailRow>

              <DetailRow label="Attendance">
                {typeof event.attendanceTotal === "number" && event.attendanceTotal > 0 ? (
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    {event.attendanceTotal} confirmed
                  </span>
                ) : (
                  "None recorded yet"
                )}
              </DetailRow>
            </dl>
          </aside>
        </div>
      </section>

      {/* Poster preview when hero used a fallback gradient */}
      {!event.poster && (
        <section className="border-t border-border bg-white py-10">
          <div className="mx-auto flex max-w-[1100px] justify-center px-4 lg:px-8">
            <Image
              src={CHURCH_LOGO}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 object-contain opacity-90"
            />
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-border bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
            <span className="section-accent" />
            <h2 className="text-xl font-bold uppercase text-foreground md:text-2xl">
              More upcoming events
            </h2>
            <ul className="mt-8 space-y-4">
              {others.map((e) => {
                const [m, d] = (e.date || "").split(" ");
                return (
                  <li key={e.id}>
                    <Link
                      href={eventPath(e.id)}
                      className="group grid gap-4 bg-muted-surface p-5 transition-colors hover:bg-white hover:shadow-sm sm:grid-cols-[72px_1fr] sm:items-center"
                    >
                      <div className="flex h-[72px] w-[72px] flex-col items-center justify-center bg-foreground text-white">
                        <span className="text-[10px] font-bold uppercase">{m}</span>
                        <span className="text-2xl font-bold leading-none">{d}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                          {e.category}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-foreground group-hover:text-primary">
                          {e.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-muted">
                          {[e.time, e.location].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
