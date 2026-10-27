import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexView } from "@/components/tools/BlogIndexView";
import { loadBlogIndex } from "@/lib/sitePages/fetch";
import { withBrand } from "@/lib/seoTitle";
import { categoryBase } from "@/lib/blogCategories";
import { blogPageHref, getBlogListing, getPageCount, getPagePosts, postsInCategory } from "@/lib/blogPagination";

export async function categoryStaticParams(withPages: boolean) {
  const { posts, categories } = await getBlogListing();
  return categories.flatMap((category) => {
    if (!withPages) return [{ kategori: category.slug }];
    const total = getPageCount(postsInCategory(posts, category.slug).length);
    return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ kategori: category.slug, page: String(i + 2) }));
  });
}

export async function categoryMetadata(slug: string, current: number): Promise<Metadata> {
  const { categories } = await getBlogListing();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  const pageText = current > 1 ? ` — Halaman ${current}` : "";
  const title = `${category.name}: Artikel Blog${pageText}`;
  const description = `Kumpulan artikel ${category.name.toLowerCase()} dari BJA Logistic seputar pengiriman cargo ke Papua & Indonesia Timur.${current > 1 ? ` Halaman ${current}.` : ""}`;
  const url = `https://bjalogistic.id${blogPageHref(current, categoryBase(slug))}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: withBrand(title), description, url },
  };
}

export async function CategoryListing({ slug, current }: { slug: string; current: number }) {
  const [{ posts, categories }, { live }] = await Promise.all([getBlogListing(), loadBlogIndex()]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const inCategory = postsInCategory(posts, slug);
  const total = getPageCount(inCategory.length);
  if (!Number.isInteger(current) || current < 1 || current > total) notFound();
  return (
    <BlogIndexView
      content={live}
      posts={getPagePosts(inCategory, current)}
      page={{ current, total, base: categoryBase(slug) }}
      categories={categories}
      activeCategory={{ slug, name: category.name }}
    />
  );
}
