interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-8 lg:py-14">
        <span className="section-accent" />
        <h1 className="text-h2 text-foreground md:text-h1">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
