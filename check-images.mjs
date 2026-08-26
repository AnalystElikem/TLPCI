const candidates = [
  "https://images.unsplash.com/photo-1593113630400-ea4288922497",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  "https://images.unsplash.com/photo-1526976668912-1a811878dd37",
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a",
];
for (const c of candidates) {
  const r = await fetch(c + "?w=100&q=50", { method: "HEAD" });
  console.log(r.status, c);
}
