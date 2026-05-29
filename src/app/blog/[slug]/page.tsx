import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = `https://bjalogistic.id/blog/${slug}`;
  const ogImage = post.cover ?? "/og-image.png";

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "BJA Logistic",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#CC1F2A] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </Link>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {post.cover && (
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
          </div>
        )}

        {/* Article content */}
        <article
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-gray max-w-none
            prose-headings:font-black prose-headings:text-[#111111]
            prose-h2:text-xl prose-h3:text-lg
            prose-a:text-[#CC1F2A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#111111]
            prose-table:text-sm
            prose-th:bg-gray-50 prose-th:font-bold
            prose-td:border prose-td:border-gray-200 prose-th:border prose-th:border-gray-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-br from-[#CC1F2A] to-[#A01820] rounded-2xl p-7 text-white text-center">
          <h3 className="text-xl font-black mb-2">Siap Kirim Barang?</h3>
          <p className="text-white/70 text-sm mb-5">
            Chat tim BJA Logistic via WhatsApp — kami siap bantu dari cek ongkir hingga tracking resi.
          </p>
          <a
            href={buildGeneralMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-3 px-8 rounded-xl transition-colors text-sm"
          >
            <MessageCircle size={16} />
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
