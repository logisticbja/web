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

export interface RelatedArticle {
  title: string;
  slug: string;
}

export interface Post extends PostMeta, PostSeo {
  content: string;
  relatedArticles: RelatedArticle[];
}

function apiHeaders() {
  return { "X-API-Key": process.env.TRACKING_API_KEY ?? "" };
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const RELATED_ARTICLE_INTERVAL = 3;

// Sisipkan blok "Baca juga" ke markdown mentah setiap N paragraf (sebelum
// dikonversi ke HTML), supaya bisa nebeng linebreak paragraf asli alih-alih
// parsing ulang HTML hasil marked(). Kalau artikel terkait lebih sedikit
// dari titik sisipan, dipakai berulang (cycle).
function insertRelatedArticles(markdown: string, related: RelatedArticle[]): string {
  if (related.length === 0) return markdown;

  const paragraphs = markdown.split(/\n{2,}/);
  const out: string[] = [];
  let relatedIndex = 0;

  paragraphs.forEach((para, i) => {
    out.push(para);
    const isLast = i === paragraphs.length - 1;
    if (!isLast && (i + 1) % RELATED_ARTICLE_INTERVAL === 0) {
      const article = related[relatedIndex % related.length];
      relatedIndex++;
      out.push(
        `<p class="not-prose my-6 bg-red-50 border-l-4 border-[#CC1F2A] rounded-r-lg px-5 py-3 text-sm">` +
          `<strong>Baca juga:</strong> ` +
          `<a href="/blog/${encodeURIComponent(article.slug)}" class="text-[#CC1F2A] font-semibold hover:underline">${escapeHtml(article.title)}</a>` +
        `</p>`
      );
    }
  });

  return out.join("\n\n");
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
    const relatedArticles: RelatedArticle[] = Array.isArray(row.relatedArticles)
      ? row.relatedArticles.filter((a: RelatedArticle) => a?.title && a?.slug)
      : [];

    return {
      ...mapPost(row),
      content:      await marked(insertRelatedArticles(row.content ?? "", relatedArticles)) as string,
      relatedArticles,
      metaTitle:    row.metaTitle       || undefined,
      metaDesc:     row.metaDescription || undefined,
      focusKeyword: row.focusKeyword    || undefined,
      ogTitle:      row.ogTitle         || undefined,
      ogDesc:       row.ogDescription   || undefined,
      ogImage:      row.ogImage         || undefined,
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
