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
