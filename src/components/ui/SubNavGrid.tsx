import Link from "next/link";

interface SubLink {
  label: string;
  href: string;
  description?: string;
}

interface SubNavGridProps {
  links: SubLink[];
}

export default function SubNavGrid({ links }: SubNavGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="card-shadow group block p-6 transition-shadow hover:shadow-lg"
        >
          <span className="section-accent" />
          <h3 className="text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-primary">
            {link.label}
          </h3>
          {link.description && (
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {link.description}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
