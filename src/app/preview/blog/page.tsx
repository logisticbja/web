import type { Metadata } from "next";
import { BlogIndexPreview } from "@/components/preview/ToolPreview";
import { getAllPosts } from "@/lib/blog";
import { loadBlogIndex } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Blog — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function BlogIndexPreviewPage() {
  const [posts, { live, defaults }] = await Promise.all([getAllPosts(), loadBlogIndex()]);
  return <BlogIndexPreview live={live} defaults={defaults} posts={posts} />;
}
