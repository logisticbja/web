import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";
import { Metadata } from "next";

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
  "Tips Pengiriman": "bg-blue-100 text-blue-700",
  "Info Cargo Laut": "bg-cyan-100 text-cyan-700",
  "Update Layanan": "bg-green-100 text-green-700",
  "Panduan Packing": "bg-purple-100 text-purple-700",
  "Berita & Promo": "bg-yellow-100 text-yellow-700",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = categoryColors[category] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {category}
    </span>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#CC1F2A] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Blog BJA Logistic</h1>
          <p className="text-white/70 text-lg">
            Tips pengiriman, info layanan, dan panduan ekspedisi ke Indonesia Timur
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all"
              >
                {post.cover && (
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={post.category} />
                    <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                  </div>
                  <h2 className="font-black text-[#111111] text-lg leading-snug mb-2 group-hover:text-[#CC1F2A] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#CC1F2A] text-sm font-semibold">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
