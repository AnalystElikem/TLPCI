import type { NextConfig } from "next";

// Allow images served by the ERPNext site (uploaded posters, photos, banners).
// Derived from ERPNEXT_URL so only your actual ERPNext host is allow-listed —
// no broad wildcard.
const erpnextPatterns: { protocol: "https"; hostname: string }[] = [];
try {
  if (process.env.ERPNEXT_URL) {
    erpnextPatterns.push({
      protocol: "https",
      hostname: new URL(process.env.ERPNEXT_URL).hostname,
    });
  }
} catch {
  // ignore a malformed ERPNEXT_URL — the site still builds without it
}

// Baseline security headers applied to every route. (Kept deliberately
// conservative — no strict CSP — so inline styles/scripts and the embedded
// Google Maps iframe keep working.)
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      // Church IT demo Person photos; production uploads use the ERPNext host above.
      { protocol: "https", hostname: "randomuser.me" },
      ...erpnextPatterns,
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
