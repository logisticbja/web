const ALLOWED_TAGS = new Set(["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "a"]);
const DROP_WITH_CONTENT = /<(script|style|iframe|object|embed|noscript|template|svg|math|textarea|select|button|form)\b[\s\S]*?<\/\1\s*>/gi;
const OWN_SITE = /^https?:\/\/(www\.)?bjalogistic\.id(\/|$)/i;

function safeHrefAttr(attrs: string): { href: string; external: boolean } | null {
  const m = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
  const raw = (m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim();
  if (!raw) return null;
  if (!/^(https?:\/\/|\/(?!\/)|#|mailto:|tel:)/i.test(raw)) return null;
  const href = raw.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return { href, external: /^https?:\/\//i.test(raw) && !OWN_SITE.test(raw) };
}

function sanitize(input: unknown, allowed: Set<string>, keepListType: boolean): string {
  if (typeof input !== "string" || input.trim() === "") return "";
  const s = input
    .slice(0, 20000)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(DROP_WITH_CONTENT, "")
    .replace(/<(script|style|iframe|object|embed|noscript|template|svg|math)\b[^>]*>/gi, "");

  return s.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>|<|>/g, (match, tag: string | undefined, attrs: string | undefined) => {
    if (!tag) return match === "<" ? "&lt;" : "&gt;";
    const lower = tag.toLowerCase();
    const t = keepListType && lower === "h1" ? "h2" : lower;
    if (!allowed.has(t)) return "";
    const closing = match.startsWith("</");
    if (t === "br") return closing ? "" : "<br>";
    if (closing) return `</${t}>`;
    if (t === "a") {
      const link = safeHrefAttr(attrs ?? "");
      if (!link) return "<a>";
      return link.external
        ? `<a href="${link.href}" target="_blank" rel="nofollow noopener noreferrer">`
        : `<a href="${link.href}">`;
    }
    if (t === "li" && keepListType) {
      const m = /\bdata-list\s*=\s*["']?(bullet|ordered)/i.exec(attrs ?? "");
      if (m) return `<li data-list="${m[1].toLowerCase()}">`;
    }
    return `<${t}>`;
  });
}

export function sanitizeRichText(input: unknown): string {
  return sanitize(input, ALLOWED_TAGS, false);
}

const CITY_TAGS = new Set([...ALLOWED_TAGS, "h2", "h3", "h4", "blockquote", "s", "table", "thead", "tbody", "tr", "th", "td"]);

export function sanitizeCityHtml(input: unknown): string {
  const html = sanitize(input, CITY_TAGS, true);
  return html.replace(/<(p|h2|h3|h4)>\s*(<br>)?\s*<\/\1>/g, "").trim();
}
