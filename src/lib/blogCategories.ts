import type { PostMeta } from "@/lib/blog";

export type BlogCategory = { name: string; slug: string; count: number };

const HIDDEN_CATEGORIES = new Set(["Marketing"]);
const MIN_POSTS = 5;

export function categorySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryBase(slug: string) {
  return `/blog/kategori/${slug}`;
}

export function buildCategories(posts: PostMeta[]): BlogCategory[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const name = (post.category || "").trim();
    if (!name || HIDDEN_CATEGORIES.has(name)) continue;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_POSTS)
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count);
}
