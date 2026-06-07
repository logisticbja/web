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

const ChevronRight = () => (
  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// 5-item repeating pattern that tiles perfectly in a 3-col grid:
// Row 1-2: [big 2×2] [overlay 1×1]
//                    [overlay 1×1]
// Row 3:   [overlay 1×1] [wide 2×1]
const GRID_PATTERN = [
  { col: "md:col-span-2", row: "md:row-span-2", type: "big" },
  { col: "md:col-span-1", row: "md:row-span-1", type: "overlay" },
  { col: "md:col-span-1", row: "md:row-span-1", type: "overlay" },
  { col: "md:col-span-1", row: "md:row-span-1", type: "overlay" },
  { col: "md:col-span-2", row: "md:row-span-1", type: "wide" },
] as const;

function BigCard({ post }: { post: PostMeta }) {
  if (!post.cover) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex flex-col md:col-span-2 md:row-span-2 border-l-4 border-l-[#CC1F2A] p-7"
      >
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
        </div>
        <h3 className="font-black text-[#111111] text-2xl leading-snug mb-4 group-hover:text-[#CC1F2A] transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-5 mb-5 flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-1 text-[#CC1F2A] text-sm font-bold mt-auto">
          Baca Selengkapnya <ChevronRight />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex flex-col md:col-span-2 md:row-span-2"
    >
      <div className="relative flex-1 min-h-0 min-h-[180px]">
        <BlogCoverImage
          src={post.cover}
          alt={post.title}
          category={post.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
        </div>
        <h3 className="font-black text-[#111111] text-lg leading-snug mb-1.5 group-hover:text-[#CC1F2A] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-1 text-[#CC1F2A] text-sm font-bold">
          Baca Selengkapnya <ChevronRight />
        </div>
      </div>
    </Link>
  );
}

function OverlayCard({ post }: { post: PostMeta }) {
  if (!post.cover) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex flex-col md:col-span-1 md:row-span-1 min-h-[200px] p-5"
      >
        <CategoryBadge category={post.category} />
        <h3 className="font-black text-[#111111] text-sm sm:text-base leading-snug mt-3 line-clamp-3 group-hover:text-[#CC1F2A] transition-colors flex-1">
          {post.title}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
          <div className="flex items-center gap-1 text-[#CC1F2A] text-xs font-bold">
            Baca <ChevronRight />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all md:col-span-1 md:row-span-1 min-h-[200px]"
    >
      <div className="absolute inset-0">
        <BlogCoverImage
          src={post.cover}
          alt={post.title}
          category={post.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <CategoryBadge category={post.category} white />
        <h3 className="font-black text-white text-sm sm:text-base leading-snug mt-2 line-clamp-2 drop-shadow">
          {post.title}
        </h3>
        <div className="flex items-center gap-1 text-white/80 text-xs font-semibold mt-2">
          Baca <ChevronRight />
        </div>
      </div>
    </Link>
  );
}

function WideCard({ post }: { post: PostMeta }) {
  if (!post.cover) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex items-center md:col-span-2 md:row-span-1 min-h-[200px] border-l-4 border-l-[#CC1F2A] px-7 py-5"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(post.date)}</span>
          </div>
          <h3 className="font-black text-[#111111] text-lg leading-snug mb-2 group-hover:text-[#CC1F2A] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center gap-1 text-[#CC1F2A] text-sm font-bold">
            Baca Selengkapnya <ChevronRight />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex md:col-span-2 md:row-span-1 min-h-[200px]"
    >
      <div className="relative w-2/5 shrink-0">
        <BlogCoverImage
          src={post.cover}
          alt={post.title}
          category={post.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(post.date)}</span>
        </div>
        <h3 className="font-black text-[#111111] text-base leading-snug mb-1.5 group-hover:text-[#CC1F2A] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
        <div className="flex items-center gap-1 text-[#CC1F2A] text-sm font-bold">
          Baca Selengkapnya <ChevronRight />
        </div>
      </div>
    </Link>
  );
}

function BentoCard({ post, index }: { post: PostMeta; index: number }) {
  const { type } = GRID_PATTERN[index % GRID_PATTERN.length];
  if (type === "big") return <BigCard post={post} />;
  if (type === "wide") return <WideCard post={post} />;
  return <OverlayCard post={post} />;
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/20 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/20 -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            Blog BJA Logistic
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
            Tips & Panduan Pengiriman
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto">
            Panduan ekspedisi, tips packing, dan info layanan cargo ke Papua & Indonesia Timur
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Belum ada artikel.</p>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-lg transition-all mb-10"
              >
                <div className="md:flex">
                  <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden flex-shrink-0">
                    <BlogCoverImage
                      src={featured.cover}
                      alt={featured.title}
                      category={featured.category}
                      className="group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="p-7 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryBadge category={featured.category} />
                      <span className="text-xs text-gray-400">{formatDate(featured.date)}</span>
                    </div>
                    <h2 className="font-black text-[#111111] text-xl sm:text-2xl leading-snug mb-3 group-hover:text-[#CC1F2A] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{featured.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-[#CC1F2A] text-sm font-bold">
                      Baca Artikel
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Bento grid */}
            {rest.length > 0 && (
              <>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Artikel Lainnya</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-4 md:grid-flow-dense">
                  {rest.map((post, i) => (
                    <BentoCard key={post.slug} post={post} index={i} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
