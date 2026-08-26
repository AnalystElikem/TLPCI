import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getGalleryAlbums } from "@/lib/content-source";

const routes = [
  "",
  "/about/our-story",
  "/about/what-we-believe",
  "/about/leadership",
  "/about/education",
  "/about/healing-station",
  "/churches/find",
  "/churches/pastors",
  "/ministries/men",
  "/ministries/women",
  "/ministries/youth",
  "/ministries/students",
  "/ministries/children",
  "/ministries/missions",
  "/ministries/music",
  "/ministries/deacons",
  "/media/sermons",
  "/media/devotions",
  "/media/testimonies",
  "/media/testimonies/share",
  "/media/gallery",
  "/media/livestream",
  "/news-events/blog",
  "/news-events/events",
  "/get-involved/plan-your-visit",
  "/get-involved/membership",
  "/get-involved/volunteer",
  "/get-involved/prayer-request",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const albums = await getGalleryAlbums();

  const staticPages = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const galleryPages = albums.map((album) => ({
    url: `${SITE_URL}/media/gallery/${album.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...galleryPages];
}
