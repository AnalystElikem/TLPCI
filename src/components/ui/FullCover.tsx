import Image from "next/image";

/**
 * Blurred copy of a photo, used as a header backdrop so the real photo never
 * has to be cropped to fit a banner. Put it inside a `relative overflow-hidden`
 * parent.
 */
export function BlurredBackdrop({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      fill
      className="scale-110 object-cover opacity-40 blur-2xl"
      sizes="100vw"
      priority={priority}
    />
  );
}

/**
 * Shows a photo or poster in full, never cropped, whatever its shape. Any
 * leftover space is filled with a blurred copy of the same picture.
 */
export default function FullCover({
  src,
  alt,
  aspectClass = "aspect-video",
  sizes = "(max-width: 900px) 100vw, 900px",
  priority = false,
}: {
  src: string;
  alt: string;
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-foreground shadow-md ${aspectClass}`}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        className="scale-110 object-cover opacity-50 blur-2xl"
        sizes={sizes}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
