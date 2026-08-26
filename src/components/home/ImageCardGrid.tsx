import Link from "next/link";

interface ImageCard {
  title: string;
  description: string;
  href: string;
  bgClass: string;
}

interface ImageCardGridProps {
  cards: ImageCard[];
}

export default function ImageCardGrid({ cards }: ImageCardGridProps) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative flex min-h-[260px] flex-col justify-end p-7 ${card.bgClass}`}
          >
            <div className="image-card-overlay absolute inset-0 transition-opacity group-hover:opacity-90" />
            <div className="relative z-10">
              <span className="section-accent-white" />
              <h3 className="text-sm font-bold uppercase tracking-wide text-white lg:text-base">
                {card.title}
              </h3>
              <p className="mt-1.5 text-xs text-white/90">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
