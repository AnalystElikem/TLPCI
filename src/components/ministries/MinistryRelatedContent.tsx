import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import {
  blogPostPath,
  eventPath,
  getMinistryBlogPosts,
  getMinistryEvents,
  type BlogPost,
  type EventItem,
} from "@/lib/content-source";

function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={eventPath(event.id)}
      className="group card-shadow block overflow-hidden transition-all hover:shadow-md"
    >
      {event.poster ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-muted-surface">
          <Image
            src={event.poster}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      ) : null}
      <div className="px-5 py-5 md:px-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
          <CalendarDays className="h-3.5 w-3.5" />
          {event.date}
          {event.time ? ` · ${event.time}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-lg font-bold text-foreground group-hover:text-primary">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 text-sm text-text-muted">{event.location}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
          View event
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={blogPostPath(post.id)}
      className="group card-shadow block overflow-hidden transition-all hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted-surface">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="px-5 py-5 md:px-6">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
          <FileText className="h-3.5 w-3.5" />
          {post.category} · {post.date}
        </p>
        <h3 className="mt-2 font-serif text-lg font-bold text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
            {post.excerpt}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
          Read post
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

export default async function MinistryRelatedContent({
  ministry,
}: {
  ministry: string;
}) {
  const [events, posts] = await Promise.all([
    getMinistryEvents(ministry),
    getMinistryBlogPosts(ministry),
  ]);

  if (!events.length && !posts.length) return null;

  return (
    <section className="bg-muted-surface py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        {events.length > 0 && (
          <div>
            <span className="section-accent" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Upcoming events
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {posts.length > 0 && (
          <div className={events.length > 0 ? "mt-14" : ""}>
            <span className="section-accent" />
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              From the blog
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
