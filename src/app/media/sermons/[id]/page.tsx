import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Play,
  User,
} from "lucide-react";
import ContentImage from "@/components/ui/ContentImage";
import FullCover, { BlurredBackdrop } from "@/components/ui/FullCover";
import SermonMediaActions from "@/components/sermons/SermonMediaActions";
import { getSermon, getSermons, sermonPath } from "@/lib/content-source";
import { sanitizeHtml } from "@/lib/sanitize";
import { youtubeVideoId } from "@/lib/youtube";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getSermons();
  return items.map((item) => ({ id: encodeURIComponent(String(item.id)) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sermon = await getSermon(decodeURIComponent(id));
  return {
    title: sermon ? sermon.title : "Sermon",
    description: sermon?.notes
      ? sanitizeHtml(sermon.notes).replace(/<[^>]+>/g, " ").slice(0, 160)
      : undefined,
  };
}

export default async function SermonDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const all = await getSermons();
  const sermon = all.find((s) => String(s.id) === decodedId);
  if (!sermon) notFound();

  const others = all
    .filter((s) => String(s.id) !== String(sermon.id))
    .slice(0, 3);

  const notesHtml = sanitizeHtml(sermon.notes);
  const youtubeId = youtubeVideoId(sermon.youtubeUrl);

  return (
    <>
      <section className="relative overflow-hidden bg-foreground">
        <BlurredBackdrop src={sermon.image} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
        <div className="relative px-4 pb-10 pt-12 md:pb-12 md:pt-16 lg:px-8">
          <div className="mx-auto w-full max-w-[900px]">
            <Link
              href="/media/sermons"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All sermons
            </Link>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-white/75">
              {[sermon.category, sermon.date].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              {sermon.title}
            </h1>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
              {sermon.speaker && (
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {sermon.speaker}
                </li>
              )}
              {sermon.scripture && (
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {sermon.scripture}
                </li>
              )}
              {sermon.duration && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {sermon.duration}
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-8">
        <div className="mx-auto flex max-w-[900px] flex-wrap gap-3 px-4 lg:px-8">
          <SermonMediaActions sermon={sermon} variant="button" />
        </div>
      </section>

      {!youtubeId && sermon.image && (
        <section className="bg-muted-surface py-10 lg:py-14">
          <div className="mx-auto max-w-[900px] px-4 lg:px-8">
            <FullCover src={sermon.image} alt={sermon.title} />
          </div>
        </section>
      )}

      {youtubeId && (
        <section className="bg-muted-surface py-10 lg:py-14">
          <div className="mx-auto max-w-[900px] px-4 lg:px-8">
            <div className="relative aspect-video overflow-hidden bg-black shadow-sm">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={sermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </section>
      )}

      <section id="audio" className="border-b border-border bg-white py-10 scroll-mt-24">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
            Audio recording
          </h2>
          {sermon.audioUrl ? (
            <audio controls className="mt-4 w-full" src={sermon.audioUrl}>
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="mt-4 text-sm text-text-muted">
              No audio has been uploaded for this sermon yet. Add an{" "}
              <strong>Audio Recording</strong> in Church IT to enable listening
              here.
            </p>
          )}
        </div>
      </section>

      {notesHtml && (
        <section className="bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-[760px] px-4 lg:px-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              Sermon notes
            </h2>
            <div
              className="prose-tlpci mt-6 text-justify leading-relaxed text-text-muted"
              dangerouslySetInnerHTML={{ __html: notesHtml }}
            />
          </div>
        </section>
      )}

      {sermon.slides && sermon.slides.length > 0 && (
        <section className="border-t border-border bg-muted-surface py-14 lg:py-20">
          <div className="mx-auto max-w-[900px] px-4 lg:px-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              Slides &amp; references
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm shadow-sm">
                <thead>
                  <tr className="border-b border-border bg-muted-surface">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-text-muted">
                      Type
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-text-muted">
                      Content
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-text-muted">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sermon.slides.map((slide, index) => {
                    const slideNotes = sanitizeHtml(slide.notes);
                    return (
                      <tr
                        key={`${slide.type}-${slide.content}-${index}`}
                        className="border-b border-border align-top last:border-b-0"
                      >
                        <td className="px-4 py-4 font-medium text-foreground">
                          {slide.type || "—"}
                        </td>
                        <td className="px-4 py-4 text-foreground">
                          {slide.content || "—"}
                        </td>
                        <td className="px-4 py-4 text-text-muted">
                          {slideNotes ? (
                            <div
                              className="prose-tlpci text-sm"
                              dangerouslySetInnerHTML={{ __html: slideNotes }}
                            />
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-border bg-white py-14 lg:py-20">
          <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
              More messages
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={sermonPath(s.id)}
                  className="group block overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ContentImage
                      src={s.image}
                      alt={s.title}
                      fill
                      imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
                      {[s.category, s.date].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="mt-1 font-bold leading-snug text-foreground group-hover:text-primary">
                      {s.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
                      <Play className="h-3 w-3" />
                      Open sermon
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
