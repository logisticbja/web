import { createServerClient } from "@/lib/supabase/server";
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

export interface Post extends PostMeta, PostSeo {
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, title, date, excerpt, category, cover, cover_alt, author, tags")
      .eq("published", true)
      .order("date", { ascending: false });

    return (data ?? []).map((row) => ({
      slug: row.slug,
      title: row.title,
      date: row.date ?? "",
      excerpt: row.excerpt ?? "",
      category: row.category ?? "Umum",
      cover: row.cover ?? undefined,
      coverAlt: row.cover_alt ?? undefined,
      author: row.author ?? "Tim BJA Logistic",
      tags: row.tags ?? [],
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = createServerClient();
    const { data: row } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!row) return null;

    return {
      slug: row.slug,
      title: row.title,
      date: row.date ?? "",
      excerpt: row.excerpt ?? "",
      category: row.category ?? "Umum",
      cover: row.cover ?? undefined,
      coverAlt: row.cover_alt ?? undefined,
      author: row.author ?? "Tim BJA Logistic",
      tags: row.tags ?? [],
      content: marked(row.content ?? "") as string,
      metaTitle: row.meta_title ?? undefined,
      metaDesc: row.meta_desc ?? undefined,
      focusKeyword: row.focus_keyword ?? undefined,
      ogTitle: row.og_title ?? undefined,
      ogDesc: row.og_desc ?? undefined,
      ogImage: row.og_image ?? undefined,
    };
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
