import Image from "next/image";
import Link from "next/link";
import type { WebPageSectionValues } from "@/lib/web-page-content";
import { webImage, webText, webTitleLines } from "@/lib/web-page-content";

type CmsPageBannerProps = {
  cms: WebPageSectionValues;
  alt: string;
  fallbackImage: string;
  fallbackEyebrow?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  heightClass?: string;
  overlayClass?: string;
  showSubtitle?: boolean;
};

/** Top banner image with optional CMS eyebrow, title, and subtitle overlays. */
export default function CmsPageBanner({
  cms,
  alt,
  fallbackImage,
  fallbackEyebrow,
  fallbackTitle,
  fallbackSubtitle,
  heightClass = "h-[200px] md:h-[280px]",
  overlayClass = "bg-gradient-to-t from-black/70 via-black/45 to-black/35",
  showSubtitle = false,
}: CmsPageBannerProps) {
  const image = webImage(cms, "image", fallbackImage) ?? fallbackImage;
  const eyebrow = webText(cms, "eyebrow", fallbackEyebrow ?? "");
  const title = webText(cms, "title", fallbackTitle);
  const subtitle = webText(cms, "subtitle", fallbackSubtitle ?? "");

  return (
    <section className={`relative w-full overflow-hidden ${heightClass}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
          {title}
        </h1>
        {showSubtitle && subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

type CmsPageIntroProps = {
  cms: WebPageSectionValues;
  fallbackEyebrow?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  className?: string;
  titleClassName?: string;
};

/** Centered page intro (eyebrow, multi-line title, subtitle) from Page Builder. */
export function CmsPageIntro({
  cms,
  fallbackEyebrow,
  fallbackTitle,
  fallbackSubtitle,
  className = "bg-white",
  titleClassName = "mt-4 font-serif text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-6xl",
}: CmsPageIntroProps) {
  const eyebrow = webText(cms, "eyebrow", fallbackEyebrow ?? "");
  const titleLines = webTitleLines(cms, fallbackTitle);
  const subtitle = webText(cms, "subtitle", fallbackSubtitle ?? "");

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1100px] px-4 py-16 text-center lg:px-8 lg:py-24">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className={titleClassName}>
          {titleLines.map((line, index) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < titleLines.length - 1 ? (
                <>
                  <br className="hidden md:block" />{" "}
                </>
              ) : null}
            </span>
          ))}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function CmsMinistryHeroText({
  cms,
  fallbackEyebrow,
  fallbackTitle,
}: {
  cms: WebPageSectionValues;
  fallbackEyebrow: string;
  fallbackTitle: string;
}) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
        {webText(cms, "eyebrow", fallbackEyebrow)}
      </p>
      <h1 className="mt-2 text-4xl font-bold uppercase text-white md:text-5xl">
        {webText(cms, "title", fallbackTitle)}
      </h1>
    </>
  );
}

type CmsCompactHeaderProps = {
  cms: WebPageSectionValues;
  fallbackEyebrow: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
};

/** Compact list-page header (sermons, blog, gallery, etc.). */
export function CmsCompactHeader({
  cms,
  fallbackEyebrow,
  fallbackTitle,
  fallbackSubtitle,
}: CmsCompactHeaderProps) {
  const eyebrow = webText(cms, "eyebrow", fallbackEyebrow);
  const title = webText(cms, "title", fallbackTitle);
  const subtitle = webText(cms, "subtitle", fallbackSubtitle ?? "");

  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-8 lg:py-12">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold uppercase text-foreground md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-xl text-text-muted">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

type CmsPageCtaProps = {
  cms: WebPageSectionValues;
  fallbackLabel: string;
  fallbackHref: string;
  className?: string;
};

export function CmsPageCta({
  cms,
  fallbackLabel,
  fallbackHref,
  className = "btn btn-primary",
}: CmsPageCtaProps) {
  const label = webText(cms, "cta_label", fallbackLabel);
  const href = webText(cms, "cta_url", fallbackHref);
  if (!label || !href) return null;
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
