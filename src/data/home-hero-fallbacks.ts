/** Built-in homepage carousel defaults when ERPNext slides omit title, text, or image. */
export const HOME_HERO_FALLBACKS = [
  {
    title: "Welcome to TLPCI",
    text: "You are not here by chance — come and be part of a family where faith grows and lives are transformed.",
    image: "/images/home/hero-womens-convention-2026.jpg",
    // Phones show the first lady only, cropped from the same photo.
    mobileImage: "/images/home/hero-first-lady-mobile.jpg",
    ctaLabel: "Find Out More",
    ctaHref: "/about/our-story",
  },
  {
    title: "2026 Theme",
    text: "Empowered to Transform (Acts 1:8)",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1800&q=80",
    ctaLabel: "Find Out More",
    ctaHref: "/about/our-story",
  },
  {
    title: "God Is In This Place",
    text: "There is a place for you here. Come, worship with us, and encounter the life-changing power of God.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1800&q=80",
    ctaLabel: "Find Out More",
    ctaHref: "/about/our-story",
  },
] as const;
