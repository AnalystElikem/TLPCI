import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EventSignUpForm from "@/components/events/EventSignUpForm";
import {
  eventPath,
  getEvent,
  getSignUpEvents,
  isEventPast,
} from "@/lib/content-source";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(decodeURIComponent(id));
  return {
    title: event ? `Sign up — ${event.title}` : "Event sign-up",
    description: event
      ? `Register to attend ${event.functionName || event.title}.`
      : undefined,
  };
}

export default async function EventSignUpPage({ params }: Props) {
  const { id } = await params;
  const eventId = decodeURIComponent(id);
  const event = await getEvent(eventId);
  if (!event || !event.allowSignUps || isEventPast(event)) notFound();

  const signUpEvents = await getSignUpEvents();
  const openEvents = signUpEvents.some((e) => String(e.id) === String(event.id))
    ? signUpEvents
    : [event, ...signUpEvents.filter((e) => String(e.id) !== String(event.id))];

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[760px] px-4 py-10 lg:px-8">
          <Link
            href={eventPath(event.id)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to event
          </Link>
          <span className="section-accent mt-6" />
          <h1 className="mt-3 text-3xl font-bold uppercase text-foreground md:text-4xl">
            Sign up to attend
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            Register for{" "}
            <span className="font-semibold text-foreground">
              {event.functionName || event.title}
            </span>
            . Phone number is required; email is optional.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[760px] px-4 lg:px-8">
          <EventSignUpForm
            events={openEvents}
            selectedEventId={String(event.id)}
            lockEvent
          />
        </div>
      </section>
    </>
  );
}
