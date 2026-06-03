import { createServerClient } from "@/lib/supabase/server";
import { marked } from "marked";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  cover?: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, title, date, excerpt, category, cover, author")
      .eq("published", true)
      .order("date", { ascending: false });

    return (data ?? []).map((row) => ({
      slug: row.slug,
      title: row.title,
      date: row.date ?? "",
      excerpt: row.excerpt ?? "",
      category: row.category ?? "Umum",
      cover: row.cover ?? undefined,
      author: row.author ?? "Tim BJA Logistic",
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
      author: row.author ?? "Tim BJA Logistic",
      content: marked(row.content ?? "") as string,
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
