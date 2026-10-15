import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance ("under construction") switch.
 *
 * ON:  set the environment variable MAINTENANCE_MODE=true in Vercel and redeploy.
 * OFF: delete the variable (or set it to anything else) and redeploy.
 *
 * Optional: set MAINTENANCE_BYPASS_KEY to a secret word. Opening any page on the
 * site with ?bypass=<that word> lets that one browser see the real site for 12
 * hours, so you can keep testing while everyone else sees the notice.
 */

const BYPASS_COOKIE = "tlpci_bypass";
const BYPASS_SECONDS = 60 * 60 * 12;

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Back soon | The Lord's Pentecostal Church International</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
    background:#fff;color:#222;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:24px}
  main{max-width:520px;text-align:center}
  img{width:96px;height:96px;object-fit:contain}
  h1{font-family:Merriweather,Georgia,serif;font-size:28px;line-height:1.3;margin:24px 0 12px}
  p{color:#666;line-height:1.7;margin:0 0 12px;font-size:16px}
  .bar{width:56px;height:3px;background:#c8102e;margin:20px auto}
  a{color:#c8102e;text-decoration:none;font-weight:600}
  small{display:block;margin-top:28px;color:#999;font-size:13px}
</style>
</head>
<body>
<main>
  <img src="/tlpci-logo.png" alt="TLPCI logo">
  <h1>Our website is getting an upgrade</h1>
  <div class="bar"></div>
  <p>We are making some improvements and will be back shortly. Thank you for your patience.</p>
  <p>For anything urgent, write to <a href="mailto:info@tlpci.org">info@tlpci.org</a>.</p>
  <small>The Lord's Pentecostal Church International<br>Christ our Lord, the Bible our Guide</small>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  const key = process.env.MAINTENANCE_BYPASS_KEY;
  if (key) {
    const url = request.nextUrl;
    if (url.searchParams.get("bypass") === key) {
      const clean = url.clone();
      clean.searchParams.delete("bypass");
      const res = NextResponse.redirect(clean);
      res.cookies.set(BYPASS_COOKIE, key, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: BYPASS_SECONDS,
        path: "/",
      });
      return res;
    }
    if (request.cookies.get(BYPASS_COOKIE)?.value === key) {
      return NextResponse.next();
    }
  }

  return new NextResponse(PAGE, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export const config = {
  // Skip Next.js internals and static files (anything with a file extension),
  // so the logo, favicon, robots.txt and sitemap.xml keep working.
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
