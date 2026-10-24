import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { BlogPostView } from "@/components/blog/BlogPostView";
import {
  ArticleJsonLd,
  ArticleFaqJsonLd,
  HowToJsonLd,
  ProductJsonLd,
  BreadcrumbJsonLd,
} from "@/components/JsonLd";
import { Metadata } from "next";
import { stripBrand } from "@/lib/seoTitle";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

const BASE_URL = "https://bjalogistic.id";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const canonical   = `${BASE_URL}/blog/${slug}`;
  const metaTitle   = stripBrand(post.metaTitle ?? post.title);
  const metaDesc    = post.metaDesc    ?? post.excerpt;
  const ogTitle     = post.ogTitle     ?? metaTitle;
  const ogDesc      = post.ogDesc      ?? metaDesc;
  const ogImage     = post.ogImage     ?? post.cover ?? "/og-image.png";
  const coverAlt    = post.coverAlt    ?? post.title;
  const allKeywords = [
    ...(post.focusKeyword ? [post.focusKeyword] : []),
    ...(post.tags ?? []),
  ];

  return {
    title: metaTitle || post.title,
    description: metaDesc,
    keywords: allKeywords,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [`${BASE_URL}/tentang-kami`],
      section: post.category,
      tags: post.tags ?? [],
      siteName: "BJA Logistic",
      locale: "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630, alt: coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [{ url: ogImage, alt: coverAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const canonical  = `${BASE_URL}/blog/${slug}`;
  const ogImage    = post.ogImage ?? post.cover ?? "/og-image.png";
  const allKeywords = [
    ...(post.focusKeyword ? [post.focusKeyword] : []),
    ...(post.tags ?? []),
  ];

  // Artikel berita pakai @type NewsArticle, sisanya (termasuk FAQ/HowTo/Product)
  // tetap dapat schema Article dasar sebagai pelengkap — beberapa blok JSON-LD
  // sekaligus di satu halaman itu valid & lazim (mis. Article + FAQPage).
  const articleType = post.schemaType === "NewsArticle" ? "NewsArticle" : "Article";

  return (
    <>
      {/* Structured data */}
      <ArticleJsonLd
        url={canonical}
        title={post.metaTitle ?? post.title}
        description={post.metaDesc ?? post.excerpt}
        image={ogImage}
        datePublished={post.date}
        author={post.author}
        keywords={allKeywords}
        section={post.category}
        type={articleType}
      />
      {post.schemaType === "FAQPage" && post.faqItems.length > 0 && (
        <ArticleFaqJsonLd items={post.faqItems} />
      )}
      {post.schemaType === "HowTo" && post.howToSteps.length > 0 && (
        <HowToJsonLd name={post.title} steps={post.howToSteps} />
      )}
      {post.schemaType === "Product" && (
        <ProductJsonLd
          name={post.title}
          image={ogImage}
          description={post.metaDesc ?? post.excerpt}
          price={post.productPrice}
          currency={post.productCurrency}
          availability={post.productAvailability}
          url={canonical}
        />
      )}
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: canonical },
        ]}
      />

      <BlogPostView post={post} />
    </>
  );
}
