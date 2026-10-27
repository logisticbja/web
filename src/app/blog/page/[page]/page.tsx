import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndexView } from "@/components/tools/BlogIndexView";
import { loadBlogIndex } from "@/lib/sitePages/fetch";
import { BLOG_INDEX_DEFAULTS } from "@/lib/sitePages/blogIndex";
import { stripBrand, withBrand } from "@/lib/seoTitle";
import { blogPageHref, getBlogListing, getListablePosts, getPageCount, getPagePosts } from "@/lib/blogPagination";

export const revalidate = 86400;

type Props = { params: Promise<{ page: string }> };

function parsePage(value: string) {
  return /^\d+$/.test(value) ? Number(value) : NaN;
}

export async function generateStaticParams() {
  const posts = await getListablePosts();
  const total = getPageCount(posts.length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const current = parsePage(page);
  const { live } = await loadBlogIndex();
  const baseTitle = stripBrand(live.seo.title) || BLOG_INDEX_DEFAULTS.seo.title;
  const title = `${baseTitle} — Halaman ${current}`;
  const description = `${live.seo.description} Halaman ${current}.`;
  const url = `https://bjalogistic.id${blogPageHref(current)}`;
  const ogImage = live.seo.ogImage || "/og-image.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: withBrand(title),
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const { page } = await params;
  const current = parsePage(page);
  if (current === 1) permanentRedirect("/blog");
  const [{ posts, categories }, { live }] = await Promise.all([getBlogListing(), loadBlogIndex()]);
  const total = getPageCount(posts.length);
  if (!Number.isInteger(current) || current < 2 || current > total) notFound();
  return (
    <BlogIndexView
      content={live}
      posts={getPagePosts(posts, current)}
      page={{ current, total }}
      categories={categories}
    />
  );
}
