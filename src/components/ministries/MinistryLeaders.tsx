import ContentImage from "@/components/ui/ContentImage";

export interface Leader {
  name: string;
  role: string;
  image?: string;
}

const EMPTY_MESSAGE =
  "Leadership for this ministry has not been published yet. Please check back soon or contact the church office to learn more.";

export default function MinistryLeaders({
  leaders,
  heading = "Ministry Leadership",
  emptyMessage = EMPTY_MESSAGE,
}: {
  leaders: Leader[];
  heading?: string;
  emptyMessage?: string;
}) {
  if (!leaders.length) {
    return (
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-4 text-center lg:px-8">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-muted">
            {emptyMessage}
          </p>
        </div>
      </section>
    );
  }

  const count = leaders.length;
  const gridClass =
    count === 1
      ? "max-w-[300px] grid-cols-1"
      : count >= 3
        ? "max-w-[900px] sm:grid-cols-2 lg:grid-cols-3"
        : "max-w-[640px] sm:grid-cols-2";

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <div className="text-center">
          <span className="section-accent mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            {heading}
          </h2>
        </div>

        <div className={`mx-auto mt-10 grid gap-8 ${gridClass}`}>
          {leaders.map((leader, i) => (
            <article
              key={leader.name || `${leader.role}-${i}`}
              className="text-center"
            >
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden bg-surface shadow-sm">
                <ContentImage
                  src={leader.image}
                  alt={leader.name}
                  fill
                  imageClassName="object-cover object-top"
                  sizes="280px"
                />
              </div>
              {leader.role ? (
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-primary">
                  {leader.role}
                </p>
              ) : null}
              <h3 className="mt-1 text-lg font-bold text-foreground">
                {leader.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
