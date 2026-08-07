import { marked } from "marked";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  cover?: string;
  coverAlt?: string;
  author: string;
  tags: string[];
}

export interface PostSeo {
  metaTitle?: string;
  metaDesc?: string;
  focusKeyword?: string;
  ogTitle?: string;
  ogDesc?: string;
  ogImage?: string;
}

// ── Schema Markup ──
// schemaType menentukan tipe JSON-LD yang dirender di halaman artikel
// (lihat src/components/JsonLd.tsx). Field di bawah faqBlurb/faqItems dst
// cuma relevan kalau schemaType yang cocok dipilih di CRM.
export type SchemaType = "Article" | "NewsArticle" | "FAQPage" | "HowTo" | "Product";

export interface FaqItem {
  question: string;
  answer: string;
}
export interface HowToStep {
  title: string;
  desc: string;
}
export interface PostSchema {
  schemaType: SchemaType;
  faqBlurb?: string;
  faqItems: FaqItem[];
  howToSteps: HowToStep[];
  productPrice?: string;
  productCurrency: string;
  productAvailability: string;
}

export interface Post extends PostMeta, PostSeo, PostSchema {
  content: string;
}

function apiHeaders() {
  return { "X-API-Key": process.env.TRACKING_API_KEY ?? "" };
}

function mapPost(row: Record<string, string>): PostMeta {
  return {
    slug:     row.slug,
    title:    row.title,
    date:     row.publishedAt ?? "",
    excerpt:  row.excerpt ?? "",
    category: row.category ?? "Umum",
    cover:    row.coverUrl   || undefined,
    coverAlt: row.coverAlt   || undefined,
    author:   row.author     ?? "Tim BJA Logistic",
    tags:     Array.isArray(row.tags) ? row.tags : [],
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const res = await fetch(
      `${process.env.BLOG_API_URL}?limit=200`,
      { headers: apiHeaders(), next: { revalidate: 300 } }
    );
    const json = await res.json();
    if (json.status !== "success") return [];
    return (json.data ?? []).map(mapPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${process.env.BLOG_API_URL}?slug=${encodeURIComponent(slug)}`,
      { headers: apiHeaders(), next: { revalidate: 300 } }
    );
    const json = await res.json();
    if (json.status !== "success" || !json.data) return null;

    const row = json.data;

    return {
      ...mapPost(row),
      content:      await marked(row.content ?? "") as string,
      metaTitle:    row.metaTitle       || undefined,
      metaDesc:     row.metaDescription || undefined,
      focusKeyword: row.focusKeyword    || undefined,
      ogTitle:      row.ogTitle         || undefined,
      ogDesc:       row.ogDescription   || undefined,
      ogImage:      row.ogImage         || undefined,
      // ── Schema Markup ──
      schemaType:           (row.schemaType as SchemaType) || "Article",
      faqBlurb:             row.faqBlurb || undefined,
      faqItems:             Array.isArray(row.faqItems) ? row.faqItems : [],
      howToSteps:           Array.isArray(row.howToSteps) ? row.howToSteps : [],
      productPrice:         row.productPrice || undefined,
      productCurrency:      row.productCurrency || "IDR",
      productAvailability:  row.productAvailability || "InStock",
    };
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
