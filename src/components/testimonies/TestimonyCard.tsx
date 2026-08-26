import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { testimonyPath, type TestimonyItem } from "@/lib/content-source";

type Props = {
  testimony: TestimonyItem;
  compact?: boolean;
};

export default function TestimonyCard({ testimony, compact = false }: Props) {
  return (
    <Link
      href={testimonyPath(testimony.id)}
      className="group card-shadow block border-l-4 border-primary/20 transition-all hover:border-primary hover:shadow-md"
    >
      <div className={compact ? "px-5 py-5 md:px-6" : "px-6 py-7 md:px-8 md:py-8"}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="date-badge">{testimony.dateLabel}</span>
          {testimony.testifierName && (
            <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Shared by {testimony.testifierName}
            </span>
          )}
        </div>

        <h2
          className={`mt-4 font-serif font-bold leading-snug text-foreground group-hover:text-primary ${
            compact ? "text-lg" : "text-xl md:text-2xl"
          }`}
        >
          {testimony.title}
        </h2>

        {!compact && testimony.testimony && (
          <p className="mt-4 line-clamp-3 text-justify text-sm italic leading-relaxed text-text-muted md:text-base">
            &ldquo;{testimony.testimony}&rdquo;
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-primary">
          Read testimony
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function TestimonyShareBanner() {
  return (
    <aside className="card-shadow mt-14 border border-border-subtle px-6 py-8 text-center md:px-10 md:py-10">
      <span className="section-accent mx-auto" />
      <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
        Share your story
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
        Has God done something remarkable in your life? We would love to hear
        from you.
      </p>
      <Link href="/media/testimonies/share" className="btn btn-primary mt-6">
        Share your testimony
      </Link>
    </aside>
  );
}
