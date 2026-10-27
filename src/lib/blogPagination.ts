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

const STOPWORDS = new Set(["dan", "di", "ke", "dari", "yang", "untuk", "dengan", "atau", "ini", "itu", "cara", "apa", "bagaimana", "kenapa", "lewat", "dalam", "pada", "bisa", "agar", "jadi", "tips", "panduan"]);

function titleWords(title: string) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word))
  );
}

export function pickRelatedPosts(posts: PostMeta[], current: { slug: string; category: string; title: string; tags: string[] }, limit = 4) {
  const words = titleWords(current.title);
  const tags = new Set(current.tags.map((tag) => tag.toLowerCase().trim()).filter(Boolean));
  return posts
    .filter((post) => post.slug !== current.slug)
    .map((post, order) => {
      const sharedWords = [...titleWords(post.title)].filter((word) => words.has(word)).length;
      const sharedTags = post.tags.filter((tag) => tags.has(tag.toLowerCase().trim())).length;
      const score = sharedWords * 2 + sharedTags * 3 + (post.category === current.category ? 1 : 0);
      return { post, score, order };
    })
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((item) => item.post);
}
