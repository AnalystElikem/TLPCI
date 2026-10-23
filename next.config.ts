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

// Content Security Policy, in REPORT-ONLY mode. The browser checks every page
// against this list of allowed sources and sends a short report to
// /api/csp-report for anything outside it, but it blocks nothing, so the site
// cannot break because of it. Once the reports have stayed quiet for a while,
// change CSP_HEADER_NAME to "Content-Security-Policy" to start enforcing.
//
// 'unsafe-inline' stays for scripts and styles because Next.js writes small
// inline scripts for page hydration and the JSON-LD block; a per-request nonce
// is the next step up and is not needed for report-only.
const erpnextOrigin = (() => {
  try {
    return process.env.ERPNEXT_URL ? new URL(process.env.ERPNEXT_URL).origin : "";
  } catch {
    return "";
  }
})();

const isProd = process.env.NODE_ENV === "production";

const CSP_HEADER_NAME = "Content-Security-Policy-Report-Only";
const csp = [
  "default-src 'self'",
  // Cloudflare Turnstile (bot check) loads its script from challenges.cloudflare.com.
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${erpnextOrigin}`.trim(),
  "font-src 'self' data:",
  `media-src 'self' ${erpnextOrigin}`.trim(),
  "connect-src 'self' https://challenges.cloudflare.com",
  // Google Maps, YouTube and Facebook video embeds, and the Turnstile widget.
  "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://www.facebook.com https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "report-uri /api/csp-report",
].join("; ");

// Baseline security headers applied to every route.
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
  { key: CSP_HEADER_NAME, value: csp },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Only the ERPNext host is allowed (see erpnextPatterns above). Keep this
      // list short: every host here can be fetched and resized by this site.
      ...erpnextPatterns,
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
