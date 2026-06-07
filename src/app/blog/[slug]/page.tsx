import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Clock, User, ArrowLeft, Tag } from "lucide-react";
import BlogCoverImage from "../BlogCoverImage";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

const BASE_URL = "https://bjalogistic.id";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const canonical   = `${BASE_URL}/blog/${slug}`;
  const metaTitle   = post.metaTitle   ?? post.title;
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
    title: metaTitle,
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

function estimateReadTime(htmlContent: string): number {
  const text = htmlContent.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const canonical  = `${BASE_URL}/blog/${slug}`;
  const ogImage    = post.ogImage ?? post.cover ?? "/og-image.png";
  const readTime   = estimateReadTime(post.content);
  const allKeywords = [
    ...(post.focusKeyword ? [post.focusKeyword] : []),
    ...(post.tags ?? []),
  ];

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
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          { name: post.title, url: canonical },
        ]}
      />

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-7 transition-colors group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Kembali ke Blog
              </Link>
            </nav>

            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-white/25 text-white text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-snug mb-5">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {post.author}
              </span>
              <span className="text-white/30">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {readTime} menit baca
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Cover image */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-md">
            <BlogCoverImage
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              category={post.category}
              priority
            />
          </div>

          {/* Excerpt / intro callout */}
          {post.excerpt && (
            <div className="bg-white border-l-4 border-[#CC1F2A] rounded-r-xl px-6 py-4 mb-8 shadow-sm">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed italic">{post.excerpt}</p>
            </div>
          )}

          {/* Article content */}
          <article
            className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-gray-100 prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-gray-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] rounded-2xl p-7 sm:p-9 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative">
              <h3 className="text-lg sm:text-xl font-black mb-2">Siap Kirim Barang?</h3>
              <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
                Chat tim BJA Logistic via WhatsApp — kami siap bantu dari cek ongkir hingga tracking resi.
              </p>
              <a
                href={buildGeneralMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-3 px-8 rounded-xl transition-colors text-sm shadow-lg"
              >
                <MessageCircle size={16} />
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#CC1F2A] text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              Lihat semua artikel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
