import ContentImage from "@/components/ui/ContentImage";

export default function MinistryHeroMedia({
  src,
  alt,
  className = "object-cover",
  sizes = "100vw",
  priority = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <ContentImage
      src={src}
      alt={alt}
      fill
      imageClassName={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
