import Link from "next/link";
import ContentImage from "@/components/ui/ContentImage";
import SectionHeading from "@/components/ui/SectionHeading";
import SermonMediaActions from "@/components/sermons/SermonMediaActions";
import { sermonPath, type SermonItem } from "@/lib/content-source";

export default function SermonsSection({ sermons }: { sermons?: SermonItem[] }) {
  const featured = (sermons ?? []).slice(0, 3);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading title="Sermons" />

        {featured.length === 0 && (
          <p className="py-8 text-center text-text-muted">
            New messages are coming soon. Please check back shortly.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((sermon) => (
            <article key={sermon.id} className="card-shadow overflow-hidden">
              <Link href={sermonPath(sermon.id)} className="relative block h-52">
                <ContentImage
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  imageClassName="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="date-badge absolute left-3 top-3">{sermon.date}</span>
              </Link>
              <div className="p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
                  {sermon.category || "Sermon"}
                </p>
                <h3 className="mb-2 text-[15px] font-bold leading-snug text-foreground">
                  <Link href={sermonPath(sermon.id)} className="hover:text-primary hover:underline">
                    {sermon.title}
                  </Link>
                </h3>
                {sermon.speaker && (
                  <p className="mb-4 text-sm text-text-muted">{sermon.speaker}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <SermonMediaActions sermon={sermon} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
