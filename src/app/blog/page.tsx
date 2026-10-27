import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { isRedirectedBlogSlug } from "@/lib/blogRedirects";
import { BlogIndexView } from "@/components/tools/BlogIndexView";
import { loadBlogIndex } from "@/lib/sitePages/fetch";
import { BLOG_INDEX_DEFAULTS, BLOG_OG } from "@/lib/sitePages/blogIndex";
import { stripBrand, withBrand } from "@/lib/seoTitle";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadBlogIndex();
  const title = stripBrand(live.seo.title) || BLOG_INDEX_DEFAULTS.seo.title;
  const description = live.seo.description;
  const untouched = live.seo.title === BLOG_INDEX_DEFAULTS.seo.title && live.seo.description === BLOG_INDEX_DEFAULTS.seo.description;
  const ogTitle = untouched ? BLOG_OG.title : withBrand(title);
  const ogDescription = untouched ? BLOG_OG.description : description;
  const twitterDescription = untouched ? BLOG_OG.twitterDescription : description;
  const ogImage = live.seo.ogImage || "/og-image.png";
  return {
    title,
    description,
    alternates: { canonical: "https://bjalogistic.id/blog" },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://bjalogistic.id/blog",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: twitterDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPage() {
  const [posts, { live }] = await Promise.all([getAllPosts(), loadBlogIndex()]);
  return <BlogIndexView content={live} posts={posts.filter((post) => !isRedirectedBlogSlug(post.slug))} />;
}
