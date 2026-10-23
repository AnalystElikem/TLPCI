// HTML cleaner for rich text coming from ERPNext (news body, sermon notes,
// testimonies). ERPNext editors are trusted, but this is the last line of
// defence before stored HTML is rendered on a public page, so it works from an
// allow-list: only the tags and attributes listed here survive. Everything
// else (scripts, iframes, forms, event handlers, style attributes, odd URL
// schemes, encoded tricks) is removed by a real HTML parser, not by regexes.

import sanitize from "sanitize-html";

const ALLOWED_TAGS = [
  "p", "br", "hr", "div", "span",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "b", "em", "i", "u", "s", "strike", "sub", "sup", "mark", "small",
  "blockquote", "pre", "code",
  "ul", "ol", "li",
  "a",
  "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
];

// Links may only go to web pages, email or phone. Images only to web URLs or
// same-site paths. Nothing else (javascript:, data:, vbscript:, file: ...).
const LINK_SCHEMES = ["http", "https", "mailto", "tel"];
const IMAGE_SCHEMES = ["http", "https"];

const OPTIONS: sanitize.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "title", "target", "rel", "name"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    col: ["span"],
    colgroup: ["span"],
    "*": ["class"],
  },
  // Rich-text editor classes (Quill: ql-*) are kept; any other class is dropped.
  allowedClasses: { "*": [/^ql-[a-z0-9-]+$/i] },
  allowedSchemes: LINK_SCHEMES,
  allowedSchemesByTag: { img: IMAGE_SCHEMES },
  allowProtocolRelative: false,
  // Anything not on the list is dropped; these are removed with their content.
  nonTextTags: ["script", "style", "textarea", "option", "noscript", "template", "title"],
  disallowedTagsMode: "discard",
  transformTags: {
    a: (tagName, attribs) => {
      const out: Record<string, string> = { ...attribs };
      if (out.target && out.target !== "_blank") delete out.target;
      if (out.target === "_blank") out.rel = "noopener noreferrer";
      else delete out.rel;
      return { tagName, attribs: out };
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: "lazy" },
    }),
  },
};

export function sanitizeHtml(html?: string | null): string {
  if (!html) return "";
  return sanitize(String(html), OPTIONS).trim();
}
