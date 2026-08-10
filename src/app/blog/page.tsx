import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { PostMeta } from "@/lib/blog";
import BlogCoverImage from "./BlogCoverImage";
import { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog — Tips & Panduan Pengiriman Cargo",
  description: "Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur dari tim BJA Logistic.",
  alternates: { canonical: "https://bjalogistic.id/blog" },
  openGraph: {
    title: "Blog BJA Logistic — Tips & Panduan Pengiriman Cargo",
    description: "Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur.",
    url: "https://bjalogistic.id/blog",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog BJA Logistic — Tips & Panduan Pengiriman Cargo",
    description: "Tips pengiriman cargo, panduan packing, dan panduan ekspedisi ke Papua & Indonesia Timur.",
    images: ["/og-image.png"],
  },
};

const categoryColors: Record<string, string> = {
  "Tips Pengiriman": "bg-blue-50 text-blue-700 border border-blue-200",
  "Info Cargo Laut": "bg-cyan-50 text-cyan-700 border border-cyan-200",
  "Update Layanan": "bg-green-50 text-green-700 border border-green-200",
  "Panduan Packing": "bg-purple-50 text-purple-700 border border-purple-200",
  "Berita & Promo": "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

function CategoryBadge({ category, white = false }: { category: string; white?: boolean }) {
  if (white) {
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/25 text-white border border-white/30">
        {category}
      </span>
    );
  }
  const cls = categoryColors[category] ?? "bg-gray-50 text-gray-600 border border-gray-200";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {category}
    </span>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header — bersih, tanpa hero besar. Pola sama seperti referensi
          troben.id/blog/category/{kategori}. */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-[#CC1F2A] transition-colors">Beranda</Link></li>
              <li>»</li>
              <li className="text-gray-500">Blog</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] mb-3">
            Blog BJA Logistic
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl">
            Tips pengiriman cargo, panduan packing, info jadwal kapal, dan panduan ekspedisi ke Papua & Indonesia Timur.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9">
            {posts.map((post) => (
              <SimplePostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Kartu artikel sederhana — thumbnail, kategori, judul, penulis & tanggal.
// Gantikan bento-grid lama (BigCard/OverlayCard/WideCard) yang lebih ramai;
// sekarang seragam semua, sesuai referensi troben.id.
function SimplePostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <BlogCoverImage
          src={post.cover}
          alt={post.title}
          category={post.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CategoryBadge category={post.category} />
      <h3 className="font-black text-[#111111] text-base leading-snug mt-2 mb-1.5 line-clamp-2 group-hover:text-[#CC1F2A] transition-colors">
        {post.title}
      </h3>
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
        <span>{post.author}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
      </div>
    </Link>
  );
}
