import { cache } from "react";
import { absoluteFileUrl, erpnextDoc, erpnextList } from "@/lib/erpnext";

export type WebPageSectionValues = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  cta_label?: string;
  cta_url?: string;
  [key: string]: string | undefined;
};

export type WebPageSection = {
  id: string;
  template: string;
  values: WebPageSectionValues;
};

type WebPageBlockRow = {
  web_template?: string;
  section_id?: string;
  web_template_values?: string;
  hide_block?: number | boolean;
  idx?: number;
};

function parseBlockValues(raw?: string): WebPageSectionValues {
  if (!raw?.trim()) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const values: WebPageSectionValues = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value === null || value === undefined) continue;
      values[key] = String(value);
    }
    return values;
  } catch {
    return {};
  }
}

function normalizeRoute(route: string): string {
  return route.replace(/^\/+/, "").replace(/\/+$/, "");
}

function mapBlockRow(row: WebPageBlockRow): WebPageSection | null {
  if (row.hide_block === 1 || row.hide_block === true) return null;
  const values = parseBlockValues(row.web_template_values);
  const id = str(row.section_id) || str(row.web_template) || "section";
  if (!id) return null;
  return {
    id,
    template: str(row.web_template),
    values,
  };
}

function str(value: unknown): string {
  return value === null || value === undefined ? "" : String(value).trim();
}

import { HOME_HERO_FALLBACKS } from "@/data/home-hero-fallbacks";

export const HERO_SLIDE_TEMPLATE = "TLPCI Hero Slide";

/** True when a Page Builder block is a homepage carousel slide. */
export function isHeroCarouselSection(section: WebPageSection): boolean {
  if (section.template === HERO_SLIDE_TEMPLATE) return true;
  return isHeroSectionId(section.id);
}

/** Legacy section_id patterns still supported (`hero`, `hero-2`, `carousel-1`, …). */
export function isHeroSectionId(id: string): boolean {
  return (
    id === "hero" ||
    /^hero[-_]\d+$/i.test(id) ||
    /^carousel[-_]\d+$/i.test(id)
  );
}

export type CmsHeroSlide = {
  title: string;
  text: string;
  image: string;
  mobileImage?: string;
  ctaLabel: string;
  ctaHref: string;
};

function mapSectionToHeroSlide(
  section: WebPageSection,
  index: number
): CmsHeroSlide | null {
  const fallback = HOME_HERO_FALLBACKS[index];
  const title = webText(section.values, "title", fallback?.title ?? "");
  const text = webText(section.values, "subtitle", fallback?.text ?? "");
  const image =
    webImage(section.values, "image") ?? fallback?.image ?? "";
  if (!image) return null;
  const fallbackMobile = (fallback as { mobileImage?: string } | undefined)?.mobileImage;
  return {
    title,
    text,
    image,
    mobileImage: webImage(section.values, "mobile_image") ?? fallbackMobile,
    ctaLabel: webText(section.values, "cta_label", fallback?.ctaLabel ?? "Find Out More"),
    ctaHref: webText(section.values, "cta_url", fallback?.ctaHref ?? "/about/our-story"),
  };
}

/** Carousel slides from TLPCI Hero Slide blocks (or legacy hero section_ids). */
export function heroSlidesFromWebPage(
  sections: WebPageSection[]
): CmsHeroSlide[] {
  const heroSlides = sections
    .filter((section) => isHeroCarouselSection(section))
    .map(mapSectionToHeroSlide)
    .filter((slide): slide is CmsHeroSlide => Boolean(slide));

  if (heroSlides.length) return heroSlides;

  const welcome = sections.find((section) => section.id === "welcome");
  if (!welcome) return [];

  const image = webImage(welcome.values, "image");
  if (!image) return [];

  const fallback = HOME_HERO_FALLBACKS[0];
  return [
    {
      title: webText(welcome.values, "title", fallback?.title ?? "Welcome to TLPCI"),
      text: webText(
        welcome.values,
        "subtitle",
        webText(welcome.values, "eyebrow", fallback?.text ?? "")
      ),
      image,
      ctaLabel: webText(welcome.values, "cta_label", fallback?.ctaLabel ?? "Find Out More"),
      ctaHref: webText(welcome.values, "cta_url", fallback?.ctaHref ?? "/about/our-story"),
    },
  ];
}

/** All published Page Builder sections for a site route (e.g. "about/our-story"). */
export const getWebPageContent = cache(async function getWebPageContent(
  route: string
): Promise<WebPageSection[]> {
  const normalized = normalizeRoute(route);
  if (!normalized) return [];

  const rows = await erpnextList<{ name?: string }>("Web Page", {
    fields: ["name"],
    filters: [
      ["route", "=", normalized],
      ["published", "=", 1],
      ["content_type", "=", "Page Builder"],
    ],
    limit: 1,
  });

  const pageName = rows?.[0]?.name;
  if (!pageName) return [];

  const doc = await erpnextDoc<{
    page_blocks?: WebPageBlockRow[];
  }>("Web Page", pageName);

  const blocks = doc?.page_blocks ?? [];
  return [...blocks]
    .sort((a, b) => (Number(a.idx) || 0) - (Number(b.idx) || 0))
    .map(mapBlockRow)
    .filter((section): section is WebPageSection => Boolean(section));
});

/** One section by section_id, or the first block when id is omitted. */
export async function getWebPageSection(
  route: string,
  sectionId = "hero"
): Promise<WebPageSectionValues> {
  const sections = await getWebPageContent(route);
  if (!sections.length) return {};
  const match = sections.find((section) => section.id === sectionId);
  return match?.values ?? sections[0]?.values ?? {};
}

/** Text field with fallback to the hardcoded default in the page component. */
export function webText(
  values: WebPageSectionValues,
  key: keyof WebPageSectionValues,
  fallback = ""
): string {
  const value = str(values[key]);
  return value || fallback;
}

/** Image field resolved to an absolute URL, with optional fallback. */
export function webImage(
  values: WebPageSectionValues,
  key: keyof WebPageSectionValues = "image",
  fallback?: string | null
): string | null {
  const value = absoluteFileUrl(values[key]);
  if (value) return value;
  return fallback ?? null;
}

/** Split a title that may contain \\n into lines for multi-line headings. */
export function webTitleLines(
  values: WebPageSectionValues,
  fallback: string
): string[] {
  const title = webText(values, "title", fallback);
  return title.split("\n").map((line) => line.trim()).filter(Boolean);
}

/** Strip basic HTML from Text Editor body fields for plain-text rendering. */
export function webBodyText(
  values: WebPageSectionValues,
  fallback = ""
): string {
  const raw = webText(values, "body", fallback);
  if (!raw) return fallback;
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
