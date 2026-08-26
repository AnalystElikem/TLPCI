import Link from "next/link";
import { ministries } from "@/data/content";

export default function OtherMinistries({ current }: { current: string }) {
  const others = ministries.filter((m) => m.slug !== current);
  return (
    <section className="border-t border-border bg-white py-10">
      <div className="mx-auto max-w-[1100px] px-4 text-center lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
          Other ministries
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {others.map((m) => (
            <Link
              key={m.slug}
              href={`/ministries/${m.slug}`}
              className="text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
            >
              {m.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
