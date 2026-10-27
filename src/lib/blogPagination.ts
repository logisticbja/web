import { getAllPosts, type PostMeta } from "@/lib/blog";
import { isRedirectedBlogSlug } from "@/lib/blogRedirects";
import { buildCategories, categorySlug, type BlogCategory } from "@/lib/blogCategories";

export { blogPageHref } from "@/lib/blogPageHref";

export const POSTS_PER_PAGE = 24;

export async function getListablePosts(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !isRedirectedBlogSlug(post.slug));
}

export async function getBlogListing(): Promise<{ posts: PostMeta[]; categories: BlogCategory[] }> {
  const posts = await getListablePosts();
  return { posts, categories: buildCategories(posts) };
}

export function postsInCategory(posts: PostMeta[], slug: string) {
  return posts.filter((post) => categorySlug(post.category || "") === slug);
}

export function getPageCount(total: number) {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function getPagePosts(posts: PostMeta[], page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

export function pickRelatedPosts(posts: PostMeta[], current: { slug: string; category: string }, limit = 4) {
  const others = posts.filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter((post) => post.category === current.category);
  const picked = sameCategory.slice(0, limit);
  for (const post of others) {
    if (picked.length >= limit) break;
    if (!picked.includes(post)) picked.push(post);
  }
  return picked;
}
