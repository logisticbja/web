import { marked } from "marked";
import { sanitizeArticleHtml } from "./articleHtml";
import type { AuthorProfile, Post, SchemaType } from "./blog";

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const s = (v: unknown, max = 4000) => (typeof v === "string" ? v.slice(0, max) : "");
const url = (v: unknown) => {
  const x = s(v, 1000).trim();
  return /^https:\/\/[^\s"'<>]+$/i.test(x) || /^\/(?!\/)[^\s"'<>]*$/.test(x) ? x : "";
};
const arr = (v: unknown) => (Array.isArray(v) ? v.slice(0, 60) : []);
const SCHEMA_TYPES: SchemaType[] = ["Article", "NewsArticle", "FAQPage", "HowTo", "Product"];

function author(raw: unknown): AuthorProfile | undefined {
  if (!isObj(raw)) return undefined;
  const name = s(raw.name, 120);
  if (!name) return undefined;
  return {
    name,
    role: s(raw.role, 200) || undefined,
    avatar: url(raw.avatar) || undefined,
    bio: s(raw.bio, 2000) || undefined,
    linkedin: url(raw.linkedin) || undefined,
  };
}

export function articleHtml(raw: string): string {
  return sanitizeArticleHtml(marked.parse(raw, { async: false }) as string);
}

export function normalizeBlogPreview(raw: unknown): Post | null {
  if (!isObj(raw)) return null;
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t) => s(t, 80).trim())
    : s(raw.tags, 2000).split(",").map((t) => t.trim());
  const schemaType = SCHEMA_TYPES.includes(raw.schemaType as SchemaType) ? (raw.schemaType as SchemaType) : "Article";
  const cover = url(raw.cover);
  return {
    slug: s(raw.slug, 200),
    title: s(raw.title, 500),
    date: s(raw.date, 40),
    excerpt: s(raw.excerpt, 2000),
    category: s(raw.category, 120) || "Umum",
    cover: cover || undefined,
    coverAlt: s(raw.coverAlt, 300) || undefined,
    author: s(raw.author, 120) || "Tim BJA Logistic",
    tags: tags.filter(Boolean),
    content: articleHtml(s(raw.content, 300000)),
    authorProfile: author(raw.authorProfile),
    schemaType,
    faqBlurb: s(raw.faqBlurb, 2000) || undefined,
    faqItems: arr(raw.faqItems).filter(isObj).map((x) => ({ question: s(x.question, 500), answer: s(x.answer) })).filter((x) => x.question && x.answer),
    howToSteps: arr(raw.howToSteps).filter(isObj).map((x) => ({ title: s(x.title, 500), desc: s(x.desc) })).filter((x) => x.title && x.desc),
    productCurrency: "IDR",
    productAvailability: "InStock",
  };
}
