import ContentImage from "@/components/ui/ContentImage";
import Link from "next/link";
import { blogPostPath, getMinistryBlogPosts } from "@/lib/content-source";

/**
 * One large "Latest news" card for a ministry or fellowship page.
 * Shows the newest published post linked to the ministry; renders nothing
 * when the ministry has no news yet.
 */
export default async function MinistryRelatedContent({
  ministry,
}: {
  ministry: string;
}) {
  const posts = await getMinistryBlogPosts(ministry);
  const post = posts[0];
  if (!post) return null;

  return (
    <section className="bg-muted-surface py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
          Latest news
        </p>
        <article className="mt-4 grid overflow-hidden bg-white shadow-sm lg:grid-cols-[1.2fr_1fr]">
          <Link
            href={blogPostPath(post.id)}
            className="relative block min-h-[240px] lg:min-h-[380px]"
            aria-label={post.title}
          >
            <ContentImage
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </Link>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {[post.category, post.date].filter(Boolean).join(" · ")}
            </p>
            {post.blogger && (
              <p className="mt-2 text-sm text-text-muted">By {post.blogger}</p>
            )}
            <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-foreground md:text-3xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-4 line-clamp-4 leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
            )}
            <Link
              href={blogPostPath(post.id)}
              className="mt-6 inline-block text-xs font-bold uppercase tracking-wide text-primary hover:underline"
            >
              Read story →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
