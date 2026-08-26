/** True when the URL points at a live stream, not a regular recording. */
export function isLiveStreamUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    const path = u.pathname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      return path.includes("/live/");
    }

    if (host.includes("facebook.com") || host.includes("fb.watch")) {
      return (
        path.includes("/live") ||
        path.includes("live_videos") ||
        u.searchParams.get("live") === "true"
      );
    }

    return false;
  } catch {
    return false;
  }
}

export function watchLabelForUrl(url?: string | null): "Watch Live" | "Watch Video" {
  return isLiveStreamUrl(url) ? "Watch Live" : "Watch Video";
}
