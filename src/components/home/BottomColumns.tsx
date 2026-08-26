import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogPostPath, type BlogPost } from "@/lib/content-source";

export default function BottomColumns({ news }: { news?: BlogPost[] }) {
  const latest = (news ?? []).slice(0, 4);
  const hasPosts = latest.length > 0;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <SectionHeading title="Latest Blog">
          {hasPosts && (
            <Link
              href="/news-events/blog"
              className="btn btn-outline hidden shrink-0 sm:inline-block"
            >
              All Posts
            </Link>
          )}
        </SectionHeading>

        {hasPosts ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((item) => (
                <Link
                  key={item.id}
                  href={blogPostPath(item.id)}
                  className="card-shadow group overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="date-badge absolute left-3 top-3">
                      {item.date}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/news-events/blog" className="btn btn-outline">
                All Posts
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-text-muted">Coming soon.</p>
        )}
      </div>
    </section>
  );
}
