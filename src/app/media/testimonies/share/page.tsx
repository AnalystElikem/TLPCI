import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShareTestimonyForm from "@/components/testimonies/ShareTestimonyForm";

export const metadata: Metadata = {
  title: "Share Your Testimony",
  description:
    "Share how God has worked in your life with The Lord's Pentecostal Church International.",
};

export default function ShareTestimonyPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 lg:px-8 lg:py-12">
          <Link
            href="/media/testimonies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All testimonies
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Media
          </p>
          <h1 className="mt-2 text-3xl font-bold uppercase text-foreground md:text-5xl">
            Share Your Testimony
          </h1>
          <p className="mt-3 max-w-xl text-text-muted">
            Tell us what God has done. Submissions are reviewed before anything
            is published on the website.
          </p>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
          <div>
            <span className="section-accent" />
            <h2 className="text-2xl font-bold uppercase text-foreground md:text-3xl">
              Your story matters
            </h2>
            <p className="mt-5 leading-relaxed text-text-muted">
              Whether it is healing, provision, salvation, or another touch
              from God, your testimony can encourage others. Fill in the form
              and our team will review it.
            </p>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-text-muted">
              <li>
                <strong className="text-foreground">Confidential:</strong> check
                this if your story is for pastoral care only and should not be
                shared publicly.
              </li>
              <li>
                <strong className="text-foreground">Can contact:</strong> if you
                want a follow-up call, a phone number is required. Email is
                optional.
              </li>
              <li>
                Published testimonies appear on the website only after they are
                approved in Church IT.
              </li>
            </ul>
          </div>

          <ShareTestimonyForm />
        </div>
      </section>
    </>
  );
}
