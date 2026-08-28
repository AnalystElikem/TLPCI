import ContentImage from "@/components/ui/ContentImage";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import {
  getMinister,
  getMinisterIds,
  getMinisters,
} from "@/lib/content-source";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const ids = await getMinisterIds();
  return ids.map((id) => ({ id: encodeURIComponent(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const minister = await getMinister(decodeURIComponent(id));
  if (!minister) return { title: "Minister" };

  return {
    title: minister.name,
    description: `${minister.positionType}${minister.office ? ` — ${minister.office}` : ""}. Minister of The Lord's Pentecostal Church International.`,
  };
}

function formatServiceDates(startDate: string, endDate?: string): string {
  const start = startDate.slice(0, 4);
  if (!endDate) return `${start} — present`;
  return `${start} — ${endDate.slice(0, 4)}`;
}

export default async function MinisterDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const [minister, groups] = await Promise.all([
    getMinister(decodedId),
    getMinisters(),
  ]);
  if (!minister) notFound();

  const others = groups
    .flatMap((group) => group.ministers)
    .filter((m) => m.id !== minister.id)
    .slice(0, 4);

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 lg:px-8 lg:py-12">
          <Link
            href="/churches/pastors"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All ministers
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface shadow-sm">
              <ContentImage
                src={minister.photo}
                alt={minister.name}
                fill
                imageClassName="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                {minister.positionType}
              </p>
              <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">
                {minister.name}
              </h1>
              {minister.office && (
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-text-muted">
                  {minister.office}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-text-muted">
                {minister.branch && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    {minister.branch}
                  </span>
                )}
                {minister.ordained && (
                  <span>Ordained {minister.ordained}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted-surface py-14 lg:py-20">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <div className="bg-white p-6 shadow-sm md:p-8">
            <span className="section-accent" />
            <h2 className="font-serif text-xl font-bold text-foreground">
              Positions held
            </h2>
            <ul className="mt-5 space-y-4">
              {minister.positions.map((position, index) => (
                <li
                  key={`${position.title}-${position.startDate}-${index}`}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="font-bold text-foreground">{position.title}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    {formatServiceDates(position.startDate, position.endDate)}
                    {position.current ? " · Current" : ""}
                  </p>
                  {position.notes && (
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {position.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-14 max-w-[1100px] px-4 lg:px-8">
            <span className="section-accent" />
            <h2 className="font-serif text-xl font-bold text-foreground md:text-2xl">
              More ministers
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/churches/pastors/${encodeURIComponent(m.id)}`}
                    className="block border border-border bg-white p-4 shadow-sm transition-colors hover:border-primary"
                  >
                    <p className="font-bold text-foreground">{m.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {m.positionType}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
