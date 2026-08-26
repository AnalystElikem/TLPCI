import Image from "next/image";

const DEFAULT_MESSAGE =
  "A banner image for this ministry will appear here once it is added in Church IT.";

export default function MinistryHeroMedia({
  src,
  alt,
  className = "object-cover",
  sizes = "100vw",
  priority = false,
  emptyMessage = DEFAULT_MESSAGE,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  emptyMessage?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-muted-surface via-surface to-primary/5 px-6 text-center">
      <p className="max-w-md text-sm leading-relaxed text-text-muted">
        {emptyMessage}
      </p>
    </div>
  );
}
