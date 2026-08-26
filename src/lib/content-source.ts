// Content loaders: read from ERPNext when available, otherwise return the
// in-code defaults. Every image slot falls back to what's already in the code,
// so nothing ever goes blank (see the governing principle in ERPNEXT-SETUP-PLAN).
//
// These run only on the server (they call the ERPNext client). Client
// components receive the results as props from a server component/page.

import {
  events as fallbackEvents,
  sermons as fallbackSermons,
  generalOverseer as fallbackGO,
  executiveCouncil as fallbackCouncil,
  pastOverseers as fallbackPast,
} from "@/data/content";
import {
  absoluteFileUrl,
  erpnextList,
  erpnextDoc,
  erpnextAttachments,
} from "@/lib/erpnext";
import { isStreamLive } from "@/lib/youtube";
import { getDailyDevotion } from "@/lib/daily";
import { sanitizeHtml } from "@/lib/sanitize";

// ---------------------------------------------------------------- date helpers
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseDate(d?: string | null): Date | null {
  if (!d) return null;
  // ERPNext dates are "YYYY-MM-DD"; append time to force UTC parsing.
  const dt = new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00Z` : d);
  return isNaN(dt.getTime()) ? null : dt;
}
function fmtShort(d?: string | null): string {
  const dt = parseDate(d); // "Jul 11"
  return dt ? `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}` : "";
}
function fmtLong(d?: string | null): string {
  const dt = parseDate(d); // "Jul 8, 2026"
  return dt
    ? `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`
    : "";
}

// Safe default images (already allow-listed hosts) used only if an ERPNext
// record is missing its image.
const DEFAULT_NEWS_IMAGE =
  "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&q=80";
const DEFAULT_SERMON_IMAGE =
  "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80";

// --------------------------------------------------------------------- Events
export type EventItem = {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  poster?: string | null;
  type?: string;
  functionName?: string;
  associatedMinistry?: string;
  allDay?: boolean;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  allowSignUps?: boolean;
  attendanceTotal?: number;
  address?: string;
  startDateIso?: string;
  endDateIso?: string;
};

export function eventPath(id: number | string): string {
  return `/news-events/events/${encodeURIComponent(String(id))}`;
}

export function eventSignUpPath(id: number | string): string {
  return `${eventPath(id)}/sign-up`;
}

/** True when the event's last day is before today (UTC). */
export function isEventPast(event: EventItem): boolean {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const lastDay = event.endDateIso || event.startDateIso;
  const end = parseDate(lastDay);
  if (!end) return false;
  return end.getTime() < today.getTime();
}

export function formatEventSignUpLabel(event: EventItem): string {
  const title = event.functionName || event.title;
  const when = event.startDate || event.date;
  return when ? `${title} — ${when}` : title;
}

/** Published functions that accept sign-ups and have not ended yet. */
export async function getSignUpEvents(): Promise<EventItem[]> {
  const all = await getAllEvents();
  return all.filter((e) => e.allowSignUps && !isEventPast(e));
}

function formatClockTime(t?: string | null): string {
  if (!t) return "";
  const match = t.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return t;
  let hour = parseInt(match[1], 10);
  const minutes = match[2];
  const suffix = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return minutes === "00" ? `${hour} ${suffix}` : `${hour}:${minutes} ${suffix}`;
}

function functionTimeOf(r: Record<string, string>): string {
  if (String(r.all_day) === "1") return "All day";
  const start = formatClockTime(r.start_time);
  const end = formatClockTime(r.end_time);
  if (start && end) return `${start} – ${end}`;
  return start || end || r.time || "";
}

// Read the event's start date regardless of how the field was named in ERPNext.
function eventDateOf(r: Record<string, string>): string {
  return (
    r.event_date ??
    r.event_start_date ??
    r.start_date ??
    r.date ??
    ""
  );
}

// A blank (or "church-wide") ministry means the event belongs on the main
// homepage / Events page. Any other value routes it to that ministry's page.
const CHURCH_WIDE = new Set(["", "General", "Main", "Church-wide", "All"]);
const MINISTRY_MATCH: Record<string, string[]> = {
  Men: ["Men", "Men's Ministry", "Men Ministry"],
  Women: ["Women", "Women's Ministry", "Women Ministry"],
  Youth: ["Youth", "Youth Ministry"],
  Students: ["Students", "Student Ministry", "Campus"],
  Children: ["Children", "Children's Ministry", "Kids"],
  Missions: ["Missions", "Mission"],
  Music: ["Music", "Worship", "Worship Ministry"],
  "Deacons & Deaconesses": ["Deacons", "Deaconesses", "Deacon"],
};

function eventMinistryOf(r: Record<string, string>): string {
  return eventLinkedMinistryOf(r);
}

/** Ministry link on Function — Associated Ministry or custom Linked Ministry. */
function eventLinkedMinistryOf(r: Record<string, string>): string {
  return (
    r.custom_linked_ministry_ ??
    r.custom_linked_ministry ??
    r.associated_ministry ??
    r.ministry ??
    ""
  ).trim();
}

/** Ministry link on Blog Post — custom Linked Ministry field in Church IT. */
function blogLinkedMinistryOf(r: Record<string, string>): string {
  return (
    r.custom_linked_ministry_ ??
    r.custom_linked_ministry ??
    ""
  ).trim();
}

export type ErpMinistry = {
  id: string;
  name: string;
  published: boolean;
};

async function fetchAllErpMinistries(): Promise<ErpMinistry[]> {
  const rows = await erpnextList<Record<string, string>>("Ministry", {
    fields: ["name", "ministry_name", "publish"],
    orderBy: "ministry_name asc",
    fresh: true,
  });
  if (!rows?.length) return [];
  return rows
    .filter((r) => r.name)
    .map((r) => ({
      id: r.name ?? "",
      name: r.ministry_name ?? r.name ?? "",
      published: Number(r.publish) === 1,
    }));
}

/** Map a site ministry page label to the ERPNext Ministry document id (e.g. MIN-097). */
export async function resolveSiteMinistryToErpId(
  siteMinistry: string
): Promise<string | null> {
  const ministries = await fetchAllErpMinistries();
  if (!ministries.length) return null;

  const exact = ministries.find(
    (m) => m.name.toLowerCase() === siteMinistry.toLowerCase()
  );
  if (exact) return exact.id;

  const alias = ministries.find((m) =>
    ministryNameMatches(siteMinistry, m.name)
  );
  return alias?.id ?? null;
}

function ministryNameMatches(siteMinistry: string, erpName: string): boolean {
  const needles = MINISTRY_MATCH[siteMinistry] ?? [siteMinistry];
  const hay = erpName.toLowerCase();
  return needles.some(
    (needle) =>
      hay === needle.toLowerCase() || hay.includes(needle.toLowerCase())
  );
}

function isChurchItFunction(r: Record<string, string>): boolean {
  return "function_name" in r || "publish" in r;
}

function sortByEventDate(rows: Record<string, string>[]) {
  rows.sort(
    (a, b) =>
      (parseDate(eventDateOf(a))?.getTime() ?? 0) -
      (parseDate(eventDateOf(b))?.getTime() ?? 0)
  );
}

async function fetchPublishedFunctions(): Promise<
  Record<string, string>[] | null
> {
  const churchItRows = await erpnextList<Record<string, string>>("Function", {
    fields: [
      "name",
      "function_name",
      "type",
      "start_date",
      "start_time",
      "end_date",
      "end_time",
      "all_day",
      "publish",
      "description",
      "associated_ministry",
      "address",
      "allow_sign_ups",
      "attendance_total",
      "custom_event_poster",
    ],
    filters: [["publish", "=", 1]],
  });
  if (churchItRows !== null) return churchItRows;

  return erpnextList<Record<string, string>>("Web Event", {
    fields: ["*"],
    filters: [["is_published", "=", 1]],
  });
}

async function fetchMinistryNameMap(
  ids: string[]
): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  const rows = await erpnextList<Record<string, string>>("Ministry", {
    fields: ["name", "ministry_name"],
    filters: [["name", "in", unique]],
  });
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    if (row.name) map.set(row.name, row.ministry_name ?? "");
  }
  return map;
}

async function fetchAddressMap(
  ids: string[]
): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  const rows = await erpnextList<Record<string, string>>("Address", {
    fields: [
      "name",
      "address_title",
      "address_line1",
      "address_line2",
      "city",
      "state",
      "country",
    ],
    filters: [["name", "in", unique]],
  });
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    if (!row.name) continue;
    const label = [
      row.address_title,
      row.address_line1,
      row.address_line2,
      row.city,
      row.state,
      row.country,
    ]
      .filter(Boolean)
      .join(", ");
    if (label) map.set(row.name, label);
  }
  return map;
}

function isChurchWideFunction(
  r: Record<string, string>,
  ministryMap: Map<string, string>
): boolean {
  const ministryId = eventMinistryOf(r);
  if (!ministryId) return true;
  const ministryName = ministryMap.get(ministryId) ?? ministryId;
  return CHURCH_WIDE.has(ministryName) || CHURCH_WIDE.has(ministryId);
}

function functionMatchesMinistry(
  r: Record<string, string>,
  siteMinistry: string,
  ministryMap: Map<string, string>
): boolean {
  const ministryId = eventMinistryOf(r);
  if (!ministryId) return false;
  const ministryName = ministryMap.get(ministryId) ?? ministryId;
  return ministryNameMatches(siteMinistry, ministryName);
}

function mapWebsiteEvent(r: Record<string, string>, i: number): EventItem {
  return {
    id: r.name ?? i,
    title: r.title ?? "",
    date: fmtShort(eventDateOf(r)),
    time: r.time ?? "",
    location: r.location ?? "",
    category: r.category ?? "",
    description: r.description ?? "",
    poster: absoluteFileUrl(r.poster),
  };
}

function mapFunction(
  r: Record<string, string>,
  i: number,
  addressMap: Map<string, string>,
  ministryMap: Map<string, string> = new Map()
): EventItem {
  const ministryId = eventMinistryOf(r);
  const address = addressMap.get(r.address ?? "") ?? "";
  return {
    id: r.name ?? i,
    title: r.function_name ?? "",
    functionName: r.function_name ?? "",
    type: r.type ?? "",
    date: fmtShort(eventDateOf(r)),
    time: functionTimeOf(r),
    location: address,
    address,
    category: r.type ?? "",
    description: r.description ?? "",
    poster:
      absoluteFileUrl(r.custom_event_poster) ??
      absoluteFileUrl(r.poster ?? r.image ?? r.cover_image),
    associatedMinistry: ministryId
      ? ministryMap.get(ministryId) ?? ministryId
      : "",
    allDay: String(r.all_day) === "1",
    startDate: fmtLong(r.start_date),
    endDate: r.end_date ? fmtLong(r.end_date) : "",
    startDateIso: r.start_date ?? "",
    endDateIso: r.end_date ?? "",
    startTime: formatClockTime(r.start_time),
    endTime: formatClockTime(r.end_time),
    allowSignUps: String(r.allow_sign_ups) === "1",
    attendanceTotal: Number(r.attendance_total ?? 0),
  };
}

/** Church-wide functions for the homepage + Events page. */
export async function getEvents(): Promise<EventItem[]> {
  const rows = await fetchPublishedFunctions();
  if (!rows || rows.length === 0) return fallbackEvents;

  if (rows.some(isChurchItFunction)) {
    const ministryMap = await fetchMinistryNameMap(
      rows.map((r) => eventMinistryOf(r))
    );
    const addressMap = await fetchAddressMap(rows.map((r) => r.address ?? ""));
    const churchWide = rows.filter((r) => isChurchWideFunction(r, ministryMap));
    sortByEventDate(churchWide);
    return churchWide.map((r, i) => mapFunction(r, i, addressMap, ministryMap));
  }

  const churchWide = rows.filter((r) =>
    CHURCH_WIDE.has(eventMinistryOf(r))
  );
  sortByEventDate(churchWide);
  return churchWide.map(mapWebsiteEvent);
}

/** The next published function tagged to a given ministry (or null). */
export async function getMinistryEvent(
  ministry: string
): Promise<EventItem | null> {
  const events = await getMinistryEvents(ministry);
  return events[0] ?? null;
}

async function ministryTaggedFunctions(
  siteMinistry: string
): Promise<EventItem[]> {
  const ministryId = await resolveSiteMinistryToErpId(siteMinistry);
  if (!ministryId) return [];

  const rows = await fetchPublishedFunctions();
  if (!rows || rows.length === 0) return [];

  if (rows.some(isChurchItFunction)) {
    const ministryMap = await fetchMinistryNameMap(
      rows.map((r) => eventLinkedMinistryOf(r)).filter(Boolean)
    );
    const addressMap = await fetchAddressMap(rows.map((r) => r.address ?? ""));
    const tagged = rows.filter(
      (r) => eventLinkedMinistryOf(r) === ministryId
    );
    if (!tagged.length) return [];
    sortByEventDate(tagged);
    return tagged.map((r, i) => mapFunction(r, i, addressMap, ministryMap));
  }

  const tagged = rows.filter((r) => eventLinkedMinistryOf(r) === ministryId);
  if (!tagged.length) return [];
  sortByEventDate(tagged);
  return tagged.map((r, i) => mapWebsiteEvent(r, i));
}

/** Published upcoming functions tagged to a ministry. */
export async function getMinistryEvents(ministry: string): Promise<EventItem[]> {
  const events = await ministryTaggedFunctions(ministry);
  return events.filter((event) => !isEventPast(event));
}

/** Published blog posts linked to a ministry via custom Linked Ministry. */
export async function getMinistryBlogPosts(
  siteMinistry: string
): Promise<BlogPost[]> {
  const ministryId = await resolveSiteMinistryToErpId(siteMinistry);
  if (!ministryId) return [];

  const rows = await fetchPublishedBlogRows();
  if (!rows?.length) return [];

  const matched = rows.filter(
    (r) => blogLinkedMinistryOf(r) === ministryId
  );
  if (!matched.length) return [];

  const [categories, bloggers] = await Promise.all([
    fetchBlogCategoryMap(matched.map((r) => r.blog_category ?? "")),
    fetchBloggerMap(matched.map((r) => r.blogger ?? "")),
  ]);

  return matched.map((r, i) => mapBlogPostRow(r, categories, bloggers, i));
}

export async function getEvent(id: string): Promise<EventItem | null> {
  const rows = await fetchPublishedFunctions();
  if (!rows || rows.length === 0) {
    return fallbackEvents.find((e) => String(e.id) === id) ?? null;
  }

  const row = rows.find((r) => String(r.name ?? "") === id);
  if (!row) return null;

  if (isChurchItFunction(row)) {
    const ministryMap = await fetchMinistryNameMap([eventMinistryOf(row)]);
    const addressMap = await fetchAddressMap([row.address ?? ""]);
    return mapFunction(row, 0, addressMap, ministryMap);
  }

  return mapWebsiteEvent(row, 0);
}

/** All published functions (church-wide and ministry) for detail routes. */
export async function getAllEvents(): Promise<EventItem[]> {
  const rows = await fetchPublishedFunctions();
  if (!rows || rows.length === 0) return fallbackEvents;

  if (rows.some(isChurchItFunction)) {
    const ministryMap = await fetchMinistryNameMap(
      rows.map((r) => eventMinistryOf(r))
    );
    const addressMap = await fetchAddressMap(rows.map((r) => r.address ?? ""));
    sortByEventDate(rows);
    return rows.map((r, i) => mapFunction(r, i, addressMap, ministryMap));
  }

  sortByEventDate(rows);
  return rows.map(mapWebsiteEvent);
}

// ------------------------------------------------------------------------ Blog
export type BlogPost = {
  id: number | string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body?: string;
  blogger: string;
  route: string;
  featured: boolean;
};

/** @deprecated Use BlogPost */
export type NewsItem = BlogPost;

const BLOG_POST_FIELDS = [
  "name",
  "title",
  "blog_category",
  "blogger",
  "route",
  "published",
  "published_on",
  "featured",
  "blog_intro",
  "content",
  "meta_image",
  "custom_linked_ministry_",
  "creation",
  "modified",
];

async function fetchPublishedBlogRows(): Promise<
  Record<string, string>[] | null
> {
  return erpnextList<Record<string, string>>("Blog Post", {
    fields: BLOG_POST_FIELDS,
    filters: [["published", "=", 1]],
    orderBy: "published_on desc, modified desc",
    fresh: true,
  });
}

function blogDateOf(r: Record<string, string>): string {
  return r.published_on ?? r.creation ?? "";
}

function formatCategoryLabel(name?: string): string {
  if (!name) return "";
  return name
    .split(/[-_/]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function fetchBlogCategoryMap(
  ids: string[]
): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  const rows = await erpnextList<Record<string, string>>("Blog Category", {
    fields: ["name", "title"],
    filters: [["name", "in", unique]],
  });
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    if (row.name) map.set(row.name, row.title ?? formatCategoryLabel(row.name));
  }
  return map;
}

async function fetchBloggerMap(ids: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  const rows = await erpnextList<Record<string, string>>("Blogger", {
    fields: ["name", "full_name", "short_name"],
    filters: [["name", "in", unique]],
  });
  const map = new Map<string, string>();
  for (const row of rows ?? []) {
    if (row.name) {
      map.set(
        row.name,
        row.full_name ?? row.short_name ?? row.name
      );
    }
  }
  return map;
}

function mapBlogPostRow(
  r: Record<string, string>,
  categories: Map<string, string>,
  bloggers: Map<string, string>,
  i = 0
): BlogPost {
  const categoryKey = r.blog_category ?? "";
  return {
    id: r.name ?? i,
    title: r.title ?? "",
    date: fmtLong(blogDateOf(r)),
    category:
      categories.get(categoryKey) ?? formatCategoryLabel(categoryKey),
    excerpt: r.blog_intro ?? "",
    image: absoluteFileUrl(r.meta_image) ?? DEFAULT_NEWS_IMAGE,
    body: r.content ?? "",
    blogger: bloggers.get(r.blogger ?? "") ?? r.blogger ?? "",
    route: r.route ?? "",
    featured: Number(r.featured) === 1,
  };
}

export function blogPostPath(id: string | number): string {
  return `/news-events/blog/${encodeURIComponent(String(id))}`;
}

async function fetchPublishedBlogPosts(): Promise<BlogPost[] | null> {
  const rows = await erpnextList<Record<string, string>>("Blog Post", {
    fields: BLOG_POST_FIELDS,
    filters: [["published", "=", 1]],
    orderBy: "published_on desc, modified desc",
    fresh: true,
  });
  if (rows === null) return null;
  if (!rows.length) return [];

  const [categories, bloggers] = await Promise.all([
    fetchBlogCategoryMap(rows.map((r) => r.blog_category ?? "")),
    fetchBloggerMap(rows.map((r) => r.blogger ?? "")),
  ]);

  return rows.map((r, i) => mapBlogPostRow(r, categories, bloggers, i));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await fetchPublishedBlogPosts();
  if (rows === null || rows.length === 0) return [];
  return rows;
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const decoded = decodeURIComponent(id);
  const row = await erpnextDoc<Record<string, string>>("Blog Post", decoded, {
    fresh: true,
  });

  if (row && Number(row.published) === 1) {
    const [categories, bloggers] = await Promise.all([
      fetchBlogCategoryMap([row.blog_category ?? ""]),
      fetchBloggerMap([row.blogger ?? ""]),
    ]);
    return mapBlogPostRow(row, categories, bloggers);
  }

  return null;
}

/** @deprecated Use getBlogPosts */
export async function getNews(): Promise<BlogPost[]> {
  return getBlogPosts();
}

/** @deprecated Use getBlogPost */
export async function getNewsItem(id: string): Promise<BlogPost | null> {
  return getBlogPost(id);
}

// -------------------------------------------------------------------- Sermons
export type SermonSlideItem = {
  type: string;
  content: string;
  notes?: string;
};

export type SermonItem = {
  id: number | string;
  title: string;
  date: string;
  category: string;
  speaker: string;
  scripture: string;
  duration: string;
  image: string;
  videoUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  audioUrl?: string;
  notes?: string;
  slides?: SermonSlideItem[];
  isLive?: boolean;
};

type SermonSlide = { slide_type?: string; slide?: string; notes?: string };
type SermonPresentation = { date?: string; audio_recording?: string };
type SermonDoc = {
  custom_sermon_image?: string;
  custom_live_link_youtube?: string;
  custom_live_link_facebook?: string;
  audio_recording?: string;
  notes?: string;
  slides?: SermonSlide[];
  presentation_history?: SermonPresentation[];
};

function mergeChurchItRow(
  row: Record<string, string>,
  doc: SermonDoc | null
): Record<string, string> {
  if (!doc) return row;
  const merged = { ...row };
  for (const key of [
    "custom_sermon_image",
    "custom_live_link_youtube",
    "custom_live_link_facebook",
    "audio_recording",
    "notes",
  ] as const) {
    const value = doc[key];
    if (value) merged[key] = value;
  }
  return merged;
}

function sermonImageOf(
  r: Record<string, string>,
  person?: { photo?: string }
): string {
  return (
    absoluteFileUrl(r.custom_sermon_image) ??
    absoluteFileUrl(r.thumbnail ?? r.image ?? r.cover_image) ??
    absoluteFileUrl(person?.photo) ??
    DEFAULT_SERMON_IMAGE
  );
}

export function sermonPath(id: number | string): string {
  return `/media/sermons/${encodeURIComponent(String(id))}`;
}

function sermonDateOf(r: Record<string, string>): string {
  return (
    r.date ??
    r.sermon_date ??
    r.publish_date ??
    r.creation ??
    r.modified ??
    ""
  );
}

function scriptureFromSlides(slides?: SermonSlide[]): string {
  const refs = (slides ?? [])
    .filter((s) => s.slide_type === "Bible Reference" && s.slide?.trim())
    .map((s) => s.slide!.trim());
  return refs.join(" · ");
}

function mapSlides(slides?: SermonSlide[]): SermonSlideItem[] {
  return (slides ?? []).map((s) => ({
    type: s.slide_type ?? "",
    content: s.slide ?? "",
    notes: s.notes ?? "",
  }));
}

function latestPresentationDate(history?: SermonPresentation[]): string {
  if (!history?.length) return "";
  const sorted = [...history].sort(
    (a, b) =>
      (parseDate(b.date)?.getTime() ?? 0) - (parseDate(a.date)?.getTime() ?? 0)
  );
  return sorted[0]?.date ?? "";
}

function latestPresentationAudio(history?: SermonPresentation[]): string {
  if (!history?.length) return "";
  const sorted = [...history].sort(
    (a, b) =>
      (parseDate(b.date)?.getTime() ?? 0) - (parseDate(a.date)?.getTime() ?? 0)
  );
  for (const row of sorted) {
    if (row.audio_recording) return row.audio_recording;
  }
  return "";
}

function isChurchItSermon(r: Record<string, string>): boolean {
  return "prepared_by" in r || "publish" in r;
}

async function fetchPublishedSermons(): Promise<Record<string, string>[] | null> {
  // Church IT app — uses `publish` and links to Person / Sermon Series.
  const churchItRows = await erpnextList<Record<string, string>>("Sermon", {
    fields: [
      "name",
      "title",
      "prepared_by",
      "series",
      "publish",
      "audio_recording",
      "notes",
      "custom_live_link_youtube",
      "custom_live_link_facebook",
      "custom_sermon_image",
      "creation",
      "modified",
    ],
    filters: [["publish", "=", 1]],
  });
  if (churchItRows !== null) return churchItRows;

  // Custom website DocType from ERPNEXT-SETUP-PLAN.md
  return erpnextList<Record<string, string>>("Sermon", {
    fields: ["*"],
    filters: [["is_published", "=", 1]],
  });
}

async function fetchPersonMap(
  ids: string[]
): Promise<Map<string, { full_name: string; photo?: string }>> {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map();

  const people = await erpnextList<Record<string, string>>("Person", {
    fields: ["name", "full_name", "photo"],
    filters: [["name", "in", unique]],
  });
  const map = new Map<string, { full_name: string; photo?: string }>();
  for (const person of people ?? []) {
    if (person.name) {
      map.set(person.name, {
        full_name: person.full_name ?? "",
        photo: person.photo ?? "",
      });
    }
  }
  return map;
}

function mapWebsiteSermon(r: Record<string, string>, i: number): SermonItem {
  const youtube = r.custom_live_link_youtube?.trim() ?? "";
  const facebook = r.custom_live_link_facebook?.trim() ?? "";
  return {
    id: r.name ?? i,
    title: r.title ?? "",
    date: fmtLong(sermonDateOf(r)),
    category: r.category ?? "",
    speaker: r.speaker ?? "",
    scripture: r.scripture ?? "",
    duration: r.duration ?? "",
    image: sermonImageOf(r),
    videoUrl: youtube || facebook || r.video_url || "",
    youtubeUrl: youtube,
    facebookUrl: facebook,
    audioUrl: absoluteFileUrl(r.audio_recording ?? r.audio_url) ?? "",
    notes: r.notes ?? "",
  };
}

function mapChurchItSermon(
  r: Record<string, string>,
  doc: SermonDoc | null,
  person: { full_name: string; photo?: string } | undefined,
  i: number
): SermonItem & { _sortTime: number } {
  const presentationDate = latestPresentationDate(doc?.presentation_history);
  const rawDate = presentationDate || sermonDateOf(r);
  const audioPath =
    r.audio_recording || latestPresentationAudio(doc?.presentation_history);
  const youtube = r.custom_live_link_youtube?.trim() ?? "";
  const facebook = r.custom_live_link_facebook?.trim() ?? "";
  const slides = mapSlides(doc?.slides);

  return {
    id: r.name ?? i,
    title: r.title ?? "",
    date: fmtLong(rawDate),
    category: r.series ?? "",
    speaker: person?.full_name ?? "",
    scripture: scriptureFromSlides(doc?.slides),
    duration: "",
    image: sermonImageOf(r, person),
    videoUrl: youtube || facebook || "",
    youtubeUrl: youtube,
    facebookUrl: facebook,
    audioUrl: absoluteFileUrl(audioPath) ?? "",
    notes: r.notes ?? "",
    slides,
    _sortTime: parseDate(rawDate)?.getTime() ?? 0,
  };
}

export async function getSermons(): Promise<SermonItem[]> {
  const rows = await fetchPublishedSermons();
  if (!rows || rows.length === 0) return fallbackSermons;

  const churchIt = rows.some(isChurchItSermon);
  if (!churchIt) {
    rows.sort(
      (a, b) =>
        (parseDate(sermonDateOf(b))?.getTime() ?? 0) -
        (parseDate(sermonDateOf(a))?.getTime() ?? 0)
    );
    return rows.map(mapWebsiteSermon);
  }

  const [personMap, fullDocs] = await Promise.all([
    fetchPersonMap(rows.map((r) => r.prepared_by ?? "")),
    Promise.all(
      rows.map((r) =>
        r.name ? erpnextDoc<SermonDoc>("Sermon", r.name) : Promise.resolve(null)
      )
    ),
  ]);

  const mapped = await Promise.all(
    rows.map(async (r, i) => {
      const sermon = mapChurchItSermon(
        mergeChurchItRow(r, fullDocs[i]),
        fullDocs[i],
        personMap.get(r.prepared_by ?? ""),
        i
      );
      const streamUrl = sermon.youtubeUrl || sermon.facebookUrl;
      return {
        ...sermon,
        isLive: streamUrl ? await isStreamLive(streamUrl) : false,
      };
    })
  );

  mapped.sort((a, b) => b._sortTime - a._sortTime);
  return mapped.map(({ _sortTime: _, ...sermon }) => sermon);
}

export async function getSermon(id: string): Promise<SermonItem | null> {
  const sermons = await getSermons();
  return sermons.find((s) => String(s.id) === id) ?? null;
}

// -------------------------------------------------------------- Livestream
export type LivestreamInfo = {
  youtubeUrl: string | null;
  facebookUrl: string | null;
  sourceTitle: string | null;
  isLive: boolean;
};

/** Latest published sermon with a YouTube or Facebook video link from Church IT. */
export async function getLivestream(): Promise<LivestreamInfo> {
  const empty: LivestreamInfo = {
    youtubeUrl: null,
    facebookUrl: null,
    sourceTitle: null,
    isLive: false,
  };

  const rows = await erpnextList<Record<string, string>>("Sermon", {
    fields: [
      "title",
      "custom_live_link_youtube",
      "custom_live_link_facebook",
      "modified",
    ],
    filters: [["publish", "=", 1]],
    orderBy: "modified desc",
  });
  if (!rows?.length) return empty;

  for (const row of rows) {
    const youtube = row.custom_live_link_youtube?.trim() || null;
    const facebook = row.custom_live_link_facebook?.trim() || null;
    if (youtube || facebook) {
      const activeUrl = youtube || facebook;
      return {
        youtubeUrl: youtube,
        facebookUrl: facebook,
        sourceTitle: row.title ?? null,
        isLive: await isStreamLive(activeUrl),
      };
    }
  }

  return empty;
}

// ---------------------------------------------------------------- Hero slides
export type HeroSlide = { title: string; text: string; image: string };

/** Returns null when ERPNext has no slides — the slider keeps its built-in ones. */
export async function getHeroSlides(): Promise<HeroSlide[] | null> {
  const rows = await erpnextList<Record<string, string>>("Hero Slide", {
    fields: ["title", "text", "image", "display_order"],
    filters: [["is_published", "=", 1]],
    orderBy: "display_order asc",
  });
  if (!rows || rows.length === 0) return null;
  const slides = rows
    .map((r) => ({
      title: r.title ?? "",
      text: r.text ?? "",
      image: absoluteFileUrl(r.image) ?? "",
    }))
    .filter((s) => s.image);
  return slides.length ? slides : null;
}

// -------------------------------------------------------------- Home settings
export type HomeSettings = {
  testimoniesBackground: string | null;
  advertisementBanner: string | null;
};

export async function getHomeSettings(): Promise<HomeSettings> {
  const doc = await erpnextDoc<Record<string, string>>(
    "Home Settings",
    "Home Settings"
  );
  return {
    testimoniesBackground: absoluteFileUrl(doc?.testimonies_background),
    advertisementBanner: absoluteFileUrl(doc?.advertisement_banner),
  };
}

// ------------------------------------------------------------- Ministry hero
/** Banner image from the Ministry record's custom Image field in Church IT. */
export async function getMinistryHero(ministry: string): Promise<string | null> {
  const ministryId = await resolveSiteMinistryToErpId(ministry);
  if (!ministryId) return null;

  const doc = await erpnextDoc<Record<string, string>>(
    "Ministry",
    ministryId,
    { fresh: true }
  );
  if (!doc) return null;

  return absoluteFileUrl(doc.custom_image ?? doc.hero_image);
}

// ---------------------------------------------------------- Ministry leaders
export type MinistryLeader = { name: string; role: string; image: string };

type LeaderListRow = {
  name1?: string;
  leader?: string;
  person?: string;
  image?: string;
  idx?: number;
};

type PersonPositionRow = {
  position?: string;
  start_date?: string;
  end_date?: string;
};

function ministryLeaderListOf(
  ministry: Record<string, unknown>
): LeaderListRow[] {
  const rows = ministry.custom_leader_list ?? ministry.leader_list;
  return Array.isArray(rows) ? (rows as LeaderListRow[]) : [];
}

function leaderPersonIdOf(row: LeaderListRow): string {
  return (row.name1 ?? row.leader ?? row.person ?? "").trim();
}

/** Current or most recent position title(s) from a Person record. */
function personTitleOf(positions?: PersonPositionRow[]): string {
  if (!positions?.length) return "";
  const current = positions.filter((p) => !p.end_date?.trim());
  const pool = current.length ? current : positions;
  return [...pool]
    .sort((a, b) => {
      const aTime = a.start_date ? new Date(a.start_date).getTime() : 0;
      const bTime = b.start_date ? new Date(b.start_date).getTime() : 0;
      return bTime - aTime;
    })
    .map((p) => p.position?.trim())
    .filter(Boolean)
    .join(" · ");
}

/** Leaders for a ministry (empty when none in ERPNext). */
export async function getMinistryLeaders(
  siteMinistry: string
): Promise<MinistryLeader[]> {
  const ministryId = await resolveSiteMinistryToErpId(siteMinistry);
  if (!ministryId) return [];

  const ministry = await erpnextDoc<Record<string, unknown>>(
    "Ministry",
    ministryId,
    { fresh: true }
  );
  if (!ministry) return [];

  const rows = ministryLeaderListOf(ministry);
  if (!rows.length) return [];

  const sorted = [...rows].sort(
    (a, b) => (Number(a.idx) || 0) - (Number(b.idx) || 0)
  );

  const leaders = await Promise.all(
    sorted.map(async (row): Promise<MinistryLeader | null> => {
      const personId = leaderPersonIdOf(row);
      if (!personId) return null;

      const person = await erpnextDoc<{
        full_name?: string;
        photo?: string;
        positions?: PersonPositionRow[];
      }>("Person", personId, { fresh: true });

      if (!person?.full_name?.trim()) return null;

      return {
        name: person.full_name.trim(),
        role: personTitleOf(person.positions),
        image:
          absoluteFileUrl(row.image) ??
          absoluteFileUrl(person.photo) ??
          "",
      };
    })
  );

  const published = leaders.filter((l): l is MinistryLeader => Boolean(l));
  return published;
}

type MinistryGalleryRow = {
  image?: string;
  idx?: number;
};

function ministryGalleryListOf(
  ministry: Record<string, unknown>
): MinistryGalleryRow[] {
  const rows =
    ministry.custom_image_list ??
    ministry.gallery_list ??
    ministry.image_list ??
    ministry.custom_gallery_list;
  return Array.isArray(rows) ? (rows as MinistryGalleryRow[]) : [];
}

/** Published gallery images for a ministry from the Ministry Image List table. */
export async function getMinistryGallery(
  siteMinistry: string
): Promise<string[]> {
  const ministryId = await resolveSiteMinistryToErpId(siteMinistry);
  if (!ministryId) return [];

  const ministry = await erpnextDoc<Record<string, unknown>>(
    "Ministry",
    ministryId,
    { fresh: true }
  );
  if (!ministry) return [];

  const rows = ministryGalleryListOf(ministry);
  if (!rows.length) return [];

  return [...rows]
    .sort((a, b) => (Number(a.idx) || 0) - (Number(b.idx) || 0))
    .map((row) => absoluteFileUrl(row.image))
    .filter((url): url is string => Boolean(url));
}

// --------------------------------------------------------------- Page banner
export async function getPageBanner(page: string): Promise<string | null> {
  const rows = await erpnextList<Record<string, string>>("Page Banner", {
    fields: ["page", "banner_image"],
    filters: [["page", "=", page]],
    limit: 1,
  });
  return absoluteFileUrl(rows?.[0]?.banner_image);
}

// -------------------------------------------------------------------- Gallery
export type GalleryPhoto = {
  url: string;
  title: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  ministry?: string;
  tall?: boolean;
  photos: GalleryPhoto[];
};

type ChurchGalleryImageRow = {
  image?: string;
  title?: string;
  idx?: number;
};

function churchGallerySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapChurchGalleryCategory(
  doc: Record<string, unknown>
): GalleryAlbum | null {
  const images = Array.isArray(doc.images)
    ? (doc.images as ChurchGalleryImageRow[])
    : [];
  const sorted = [...images].sort(
    (a, b) => (Number(a.idx) || 0) - (Number(b.idx) || 0)
  );

  const photos: GalleryPhoto[] = sorted
    .map((row) => {
      const url = absoluteFileUrl(row.image);
      if (!url) return null;
      return { url, title: row.title?.trim() ?? "" };
    })
    .filter((p): p is GalleryPhoto => Boolean(p));

  const title = String(doc.title ?? doc.name ?? "").trim();
  if (!title) return null;

  const name = String(doc.name ?? "");
  const cover = photos[0]?.url ?? "";

  return {
    slug: churchGallerySlug(name || title),
    title,
    category: title,
    date: fmtShort(String(doc.modified ?? doc.creation ?? "")),
    description: String(doc.description ?? "").trim(),
    image: cover,
    photos,
    tall: photos.length % 3 === 1,
  };
}

async function fetchChurchGalleryCategories(): Promise<GalleryAlbum[]> {
  const rows = await erpnextList<Record<string, string>>(
    "Church Gallery Category",
    {
      fields: ["name", "title", "description", "modified", "creation"],
      orderBy: "modified desc",
      fresh: true,
    }
  );
  if (!rows?.length) return [];

  const albums = await Promise.all(
    rows.map(async (row) => {
      const doc = await erpnextDoc<Record<string, unknown>>(
        "Church Gallery Category",
        row.name,
        { fresh: true }
      );
      return doc ? mapChurchGalleryCategory(doc) : null;
    })
  );

  return albums.filter((a): a is GalleryAlbum => Boolean(a));
}

/** Church gallery categories from Church IT (Church Gallery Category doctype). */
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return fetchChurchGalleryCategories();
}

/** A single gallery category by slug. */
export async function getGalleryAlbum(
  slug: string
): Promise<GalleryAlbum | null> {
  const decoded = decodeURIComponent(slug);
  const albums = await fetchChurchGalleryCategories();
  return (
    albums.find((a) => a.slug === decoded) ??
    albums.find((a) => churchGallerySlug(a.title) === decoded) ??
    null
  );
}

// ----------------------------------------------------------- Exec. Committee
export type LeaderGO = {
  name: string;
  role: string;
  image: string;
  spouse?: string;
  book?: string;
  bio: string[];
};
export type CouncilMember = { name: string; role: string; image: string };
export type PastOverseer = {
  name: string;
  note: string;
  tenure: string;
  image: string;
};
export type Leadership = {
  generalOverseer: LeaderGO;
  council: CouncilMember[];
  pastOverseers: PastOverseer[];
};

// Turn ERPNext Text Editor HTML into an array of plain paragraphs.
function htmlToParagraphs(html?: string | null): string[] {
  if (!html) return [];
  return html
    .split(/<\/p>|<br\s*\/?>(?:\s*<br\s*\/?>)?/i)
    .map((chunk) => chunk.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim())
    .filter(Boolean);
}

/**
 * Leadership for the Leadership page. Uses ERPNext records where present and
 * falls back to the in-code people/photos otherwise. Council and Past Overseer
 * images are the main thing this unlocks (their photos start empty in code).
 */
export async function getLeadership(): Promise<Leadership> {
  const rows = await erpnextList<Record<string, string>>(
    "Executive Committee",
    {
      fields: [
        "full_name", "role", "category", "image",
        "tenure", "note", "bio", "display_order",
      ],
      filters: [["is_published", "=", 1]],
      orderBy: "display_order asc",
    }
  );

  const fallback: Leadership = {
    generalOverseer: fallbackGO as LeaderGO,
    council: fallbackCouncil as CouncilMember[],
    pastOverseers: fallbackPast as PastOverseer[],
  };
  if (!rows || rows.length === 0) return fallback;

  const goRow = rows.find((r) => r.category === "General Overseer");
  const councilRows = rows.filter((r) => r.category === "Executive Council");
  const pastRows = rows.filter((r) => r.category === "Past Overseer");

  const generalOverseer: LeaderGO = goRow
    ? {
        // Keep the rich in-code GO copy; override name/image/bio if ERPNext has them.
        ...(fallbackGO as LeaderGO),
        name: goRow.full_name || fallbackGO.name,
        role: goRow.role || fallbackGO.role,
        image: absoluteFileUrl(goRow.image) ?? fallbackGO.image,
        bio: htmlToParagraphs(goRow.bio).length
          ? htmlToParagraphs(goRow.bio)
          : (fallbackGO.bio as string[]),
      }
    : (fallbackGO as LeaderGO);

  const council: CouncilMember[] = councilRows.length
    ? councilRows.map((r) => ({
        name: r.full_name ?? "",
        role: r.role ?? "",
        image: absoluteFileUrl(r.image) ?? "",
      }))
    : (fallbackCouncil as CouncilMember[]);

  const pastOverseers: PastOverseer[] = pastRows.length
    ? pastRows.map((r) => ({
        name: r.full_name ?? "",
        note: r.note ?? "",
        tenure: r.tenure ?? "",
        image: absoluteFileUrl(r.image) ?? "",
      }))
    : (fallbackPast as PastOverseer[]);

  return { generalOverseer, council, pastOverseers };
}

// ------------------------------------------------------------------- Devotion
export type DevotionItem = {
  id: string;
  title: string;
  dateLabel: string;
  scriptureReference: string;
  scriptureText: string;
  keyMessage: string;
  reflection: string;
  reflectionHtml: string;
  prayerFocus: string;
  image?: string | null;
  fromErpnext: boolean;
};

const DEVOTION_FIELDS = [
  "name",
  "title",
  "date",
  "scripture_reference",
  "scripture_text",
  "key_message",
  "reflection",
  "prayer_focus",
  "devotion_image",
];

function mapDevotionRow(r: Record<string, string>): DevotionItem {
  const reflectionRaw = r.reflection ?? "";
  const reflectionHtml = sanitizeHtml(reflectionRaw);
  const reflectionText = reflectionHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    id: r.name ?? "",
    title: r.title ?? "Daily Devotion",
    dateLabel: fmtLong(r.date),
    scriptureReference: r.scripture_reference ?? "",
    scriptureText: r.scripture_text ?? "",
    keyMessage: r.key_message ?? "",
    reflection: reflectionText || reflectionRaw,
    reflectionHtml,
    prayerFocus: r.prayer_focus ?? "",
    image: absoluteFileUrl(r.devotion_image),
    fromErpnext: true,
  };
}

function fallbackDevotionItem(): DevotionItem {
  const devotion = getDailyDevotion();
  const dateLabel = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    id: "fallback",
    title: devotion.topic,
    dateLabel,
    scriptureReference: devotion.ref,
    scriptureText: devotion.verse,
    keyMessage: devotion.message,
    reflection: devotion.question,
    reflectionHtml: "",
    prayerFocus: devotion.prayer,
    image: null,
    fromErpnext: false,
  };
}

export function devotionPath(id: string): string {
  return `/media/devotions/${encodeURIComponent(id)}`;
}

/** Latest Devotion record from Church IT (by date), or the rotating fallback. */
export async function getLatestDevotion(): Promise<DevotionItem> {
  const rows = await erpnextList<Record<string, string>>("Devotion", {
    fields: DEVOTION_FIELDS,
    orderBy: "date desc, modified desc",
    limit: 1,
  });

  if (!rows?.length) return fallbackDevotionItem();
  return mapDevotionRow(rows[0]);
}

export async function getDevotions(): Promise<DevotionItem[]> {
  const rows = await erpnextList<Record<string, string>>("Devotion", {
    fields: DEVOTION_FIELDS,
    orderBy: "date desc, modified desc",
  });
  if (!rows?.length) return [];
  return rows.map(mapDevotionRow);
}

export async function getDevotion(id: string): Promise<DevotionItem | null> {
  const row = await erpnextDoc<Record<string, string>>("Devotion", id);
  if (!row) return null;
  return mapDevotionRow(row);
}

// --------------------------------------------------------------- Testimonies
export type TestimonyItem = {
  id: string;
  title: string;
  testifierName: string;
  dateLabel: string;
  testimony: string;
  testimonyHtml: string;
  fromErpnext: boolean;
};

const TESTIMONY_FIELDS = [
  "name",
  "title",
  "testifier_name",
  "date_of_testimony",
  "the_testimony",
  "is_approved",
  "publish",
];

const TESTIMONY_FILTERS: unknown[] = [
  ["publish", "=", 1],
  ["is_approved", "=", 1],
];

function testimonyExcerpt(html: string): string {
  const text = sanitizeHtml(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

/** Prefer the Title field; avoid showing auto-generated document ids when title was not set. */
function testimonyDisplayTitle(
  r: Record<string, string>,
  excerpt: string
): string {
  const id = (r.name ?? "").trim();
  const title = (r.title ?? "").trim();
  const looksLikeAutonameId =
    /^[a-z0-9]{8,14}$/i.test(id) && (!title || title === id);

  if (title && !looksLikeAutonameId) return title;
  if (title && title !== id) return title;

  if (excerpt) {
    return excerpt.length > 72 ? `${excerpt.slice(0, 69).trim()}…` : excerpt;
  }
  if (r.testifier_name?.trim()) {
    return `Testimony — ${r.testifier_name.trim()}`;
  }
  return "Testimony";
}

function mapTestimonyRow(r: Record<string, string>): TestimonyItem {
  const raw = r.the_testimony ?? "";
  const testimonyHtml = sanitizeHtml(raw);
  const testimony = testimonyExcerpt(raw);

  return {
    id: r.name ?? "",
    title: testimonyDisplayTitle(r, testimony),
    testifierName: r.testifier_name ?? "",
    dateLabel: fmtLong(r.date_of_testimony),
    testimony,
    testimonyHtml,
    fromErpnext: true,
  };
}

export function testimonyPath(id: string): string {
  return `/media/testimonies/${encodeURIComponent(id)}`;
}

export async function getTestimonies(): Promise<TestimonyItem[]> {
  const rows = await erpnextList<Record<string, string>>("Testimonies", {
    fields: TESTIMONY_FIELDS,
    filters: TESTIMONY_FILTERS,
    orderBy: "date_of_testimony desc, modified desc",
    fresh: true,
  });
  if (!rows?.length) return [];
  return rows.map(mapTestimonyRow);
}

export async function getTestimony(id: string): Promise<TestimonyItem | null> {
  const row = await erpnextDoc<Record<string, string>>("Testimonies", id, {
    fresh: true,
  });
  if (!row) return null;
  if (Number(row.publish) !== 1 || Number(row.is_approved) !== 1) return null;
  return mapTestimonyRow(row);
}
