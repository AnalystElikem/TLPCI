import Link from "next/link";
import { Headphones, Play } from "lucide-react";
import { sermonPath, type SermonItem } from "@/lib/content-source";
import { watchLabelForUrl } from "@/lib/stream-url";

type Variant = "text" | "button";

function watchTarget(sermon: SermonItem): {
  href: string;
  external: boolean;
} {
  const href =
    sermon.youtubeUrl ||
    sermon.facebookUrl ||
    sermon.videoUrl ||
    "/media/livestream";
  const external = Boolean(
    sermon.youtubeUrl || sermon.facebookUrl || sermon.videoUrl
  );
  return { href, external };
}

function listenTarget(sermon: SermonItem): {
  href: string;
  external: boolean;
} {
  if (sermon.audioUrl) {
    return { href: sermon.audioUrl, external: true };
  }
  return { href: `${sermonPath(sermon.id)}#audio`, external: false };
}

export default function SermonMediaActions({
  sermon,
  variant = "text",
}: {
  sermon: SermonItem;
  variant?: Variant;
}) {
  const watch = watchTarget(sermon);
  const listen = listenTarget(sermon);
  const watchUrl =
    sermon.youtubeUrl || sermon.facebookUrl || sermon.videoUrl || null;
  const watchLabel =
    sermon.isLive === true
      ? "Watch Live"
      : watch.external
        ? watchLabelForUrl(watchUrl)
        : "Watch Video";
  const listenLabel =
    variant === "button" ? "Listen to Audio" : "Listen to Audio";
  const watchClass =
    variant === "button"
      ? "btn btn-primary"
      : "flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary";
  const listenClass =
    variant === "button"
      ? "btn btn-outline"
      : "flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-primary";

  return (
    <>
      {watch.external ? (
        <a
          href={watch.href}
          target="_blank"
          rel="noopener noreferrer"
          className={watchClass}
        >
          <span className="inline-flex items-center gap-2">
            <Play className="h-3.5 w-3.5" />
            {watchLabel}
          </span>
        </a>
      ) : (
        <Link href={watch.href} className={watchClass}>
          <span className="inline-flex items-center gap-2">
            <Play className="h-3.5 w-3.5" />
            {watchLabel}
          </span>
        </Link>
      )}
      {listen.external ? (
        <a
          href={listen.href}
          target="_blank"
          rel="noopener noreferrer"
          className={listenClass}
        >
          <span className="inline-flex items-center gap-2">
            <Headphones className="h-3.5 w-3.5" />
            {listenLabel}
          </span>
        </a>
      ) : (
        <Link href={listen.href} className={listenClass}>
          <span className="inline-flex items-center gap-2">
            <Headphones className="h-3.5 w-3.5" />
            {listenLabel}
          </span>
        </Link>
      )}
    </>
  );
}
