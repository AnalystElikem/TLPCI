import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EventSignUpForm from "@/components/events/EventSignUpForm";
import { getSignUpEvents } from "@/lib/content-source";

export const metadata: Metadata = {
  title: "Event sign-up",
  description: "Register to attend an upcoming church event.",
};

export const revalidate = 300;

export default async function EventsSignUpPage() {
  const events = await getSignUpEvents();

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[760px] px-4 py-10 lg:px-8">
          <Link
            href="/news-events/events"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-text-muted hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All events
          </Link>
          <span className="section-accent mt-6" />
          <h1 className="mt-3 text-3xl font-bold uppercase text-foreground md:text-4xl">
            Event sign-up
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            Choose an upcoming event and tell us a little about yourself. Past
            events are not listed here.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[760px] px-4 lg:px-8">
          <EventSignUpForm events={events} />
        </div>
      </section>
    </>
  );
}
