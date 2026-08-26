import { isLiveStreamUrl } from "@/lib/stream-url";

/** Extract a YouTube video id from common URL formats for embeds. */
export function youtubeVideoId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/")[2] || null;
      }
      if (u.pathname.startsWith("/live/")) {
        return u.pathname.split("/")[2] || null;
      }
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || null;
      }
      return u.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

/** Check whether a YouTube URL is broadcasting live right now. */
export async function isYoutubeStreamLive(
  url?: string | null
): Promise<boolean> {
  if (!url || !isLiveStreamUrl(url)) return false;
  const id = youtubeVideoId(url);
  if (!id) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TLPCI/1.0)",
        "Accept-Language": "en",
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return false;
    const html = await res.text();
    if (/"isLive":true/.test(html)) return true;
    if (/"liveBroadcastContent":"live"/.test(html)) return true;
    return false;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Check whether a stream URL is live (YouTube verified; Facebook by URL pattern). */
export async function isStreamLive(url?: string | null): Promise<boolean> {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      return isYoutubeStreamLive(url);
    }
  } catch {
    return false;
  }
  return isLiveStreamUrl(url);
}
