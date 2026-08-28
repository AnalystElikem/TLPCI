import Image from "next/image";
import { CHURCH_LOGO } from "@/lib/constants";
import { firstValidImageSrc } from "@/lib/image-placeholders";

export function isValidImageSrc(src?: string | null): src is string {
  return Boolean(src?.trim());
}

type PlaceholderProps = {
  className?: string;
};

/** Branded empty state for missing photos and media. */
export function ImagePlaceholder({ className = "" }: PlaceholderProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-muted-surface via-surface to-primary/5 ${className}`}
      aria-hidden
    >
      <Image
        src={CHURCH_LOGO}
        alt=""
        width={64}
        height={64}
        className="h-12 w-12 object-contain opacity-80 md:h-16 md:w-16"
      />
    </div>
  );
}

type ContentImageProps = {
  src?: string | null;
  fallbackSrc?: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/** Image with a consistent TLPCI placeholder when the source is missing. */
export default function ContentImage({
  src,
  fallbackSrc,
  alt,
  fill = false,
  width,
  height,
  className = "",
  imageClassName = "object-cover",
  sizes,
  priority = false,
}: ContentImageProps) {
  const resolvedSrc = firstValidImageSrc(src, fallbackSrc);

  if (!resolvedSrc) {
    const placeholder = (
      <ImagePlaceholder className={fill ? "absolute inset-0" : className} />
    );
    return fill ? placeholder : <div className={className}>{placeholder}</div>;
  }

  if (fill) {
    return (
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className={`${imageClassName} ${className}`.trim()}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${imageClassName} ${className}`.trim()}
      sizes={sizes}
      priority={priority}
    />
  );
}
