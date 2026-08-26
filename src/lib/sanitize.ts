// Minimal, dependency-free HTML sanitizer for rich text coming from ERPNext
// (the News "body" field). ERPNext editors are trusted, so this is
// defense-in-depth: it strips the constructs that turn stored content into an
// XSS vector — scripts, event handlers, and dangerous URL schemes — while
// leaving ordinary formatting (headings, lists, links, images, emphasis) intact.
//
// For a hardened, spec-complete sanitizer, swap this for DOMPurify (needs a DOM
// like jsdom on the server). This covers the realistic risks for trusted input.

// Tags removed entirely, including their contents.
const DROP_WITH_CONTENT =
  /<(script|style|iframe|object|embed|form|noscript|template|link|meta|base)\b[\s\S]*?<\/\1>/gi;
// Self-closing / unclosed variants of the same dangerous tags.
const DROP_SELF_CLOSING =
  /<(script|style|iframe|object|embed|form|noscript|template|link|meta|base)\b[^>]*\/?>/gi;
// on*="..." event-handler attributes (onclick, onerror, onload, …).
const DROP_EVENT_HANDLERS = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
// javascript: / vbscript: / data: (non-image) URLs in href/src/style.
const DROP_JS_URI =
  /\s(href|src|xlink:href|action)\s*=\s*("|')\s*(javascript|vbscript|data):[^"']*\2/gi;
// style="..." attributes (can smuggle url()/expression()).
const DROP_STYLE_ATTR = /\sstyle\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;

export function sanitizeHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(DROP_WITH_CONTENT, "")
    .replace(DROP_SELF_CLOSING, "")
    .replace(DROP_EVENT_HANDLERS, "")
    .replace(DROP_JS_URI, "")
    .replace(DROP_STYLE_ATTR, "")
    .trim();
}
