import sanitizeHtml from "sanitize-html";

const SAFE_COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)$/i, /^[a-z]{3,20}$/i];

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "hr", "div", "span",
    "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup", "small",
    "blockquote", "pre", "code",
    "ul", "ol", "li",
    "a", "img", "figure", "figcaption",
    "table", "caption", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td",
    "iframe",
  ],
  disallowedTagsMode: "discard",
  nonTextTags: ["script", "style", "textarea", "option", "noscript", "template", "title", "head"],
  allowedAttributes: {
    "*": ["class", "style"],
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "frameborder", "loading"],
    li: ["data-list"],
    ol: ["start"],
    td: ["colspan", "rowspan", "data-row"],
    th: ["colspan", "rowspan", "data-row", "scope"],
    col: ["span", "width"],
  },
  allowedClasses: {
    "*": ["ql-*", "table-*", "min-w-full", "border-collapse", "text-sm"],
  },
  allowedStyles: {
    "*": {
      color: SAFE_COLOR,
      "background-color": SAFE_COLOR,
      "text-align": [/^(left|right|center|justify)$/],
    },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"], iframe: ["https"] },
  allowProtocolRelative: false,
  allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "player.vimeo.com", "www.google.com"],
  transformTags: {
    a: (tagName, attribs) => {
      const out = { ...attribs };
      if (out.target && out.target !== "_blank" && out.target !== "_self") delete out.target;
      if (out.target === "_blank") {
        const rel = new Set((out.rel ?? "").split(/\s+/).filter(Boolean));
        rel.add("noopener");
        rel.add("noreferrer");
        out.rel = [...rel].join(" ");
      }
      return { tagName, attribs: out };
    },
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: attribs.loading === "eager" ? "eager" : "lazy" } }),
  },
  exclusiveFilter: (frame) => frame.tag === "iframe" && !frame.attribs.src,
};

export function sanitizeArticleHtml(input: unknown): string {
  if (typeof input !== "string" || input.trim() === "") return "";
  return sanitizeHtml(input, OPTIONS);
}
