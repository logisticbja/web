import type { Metadata } from "next";
import { BlogIndexPreview } from "@/components/preview/ToolPreview";
import { getListablePosts, getPagePosts } from "@/lib/blogPagination";
import { loadBlogIndex } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Blog — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function BlogIndexPreviewPage() {
  const [posts, { live, defaults }] = await Promise.all([getListablePosts(), loadBlogIndex()]);
  return <BlogIndexPreview live={live} defaults={defaults} posts={getPagePosts(posts, 1)} />;
}
