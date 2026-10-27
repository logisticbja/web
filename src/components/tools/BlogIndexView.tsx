import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blogDate";
import BlogCoverImage from "@/app/blog/BlogCoverImage";
import { cms } from "@/components/home/cms";
import type { BlogIndexContent } from "@/lib/sitePages/blogIndex";
import { Sec } from "./ToolHero";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogFilterBar } from "@/components/blog/BlogFilterBar";
import type { BlogCategory } from "@/lib/blogCategories";

const categoryColors: Record<string, string> = {
  "Tips Pengiriman": "bg-blue-50 text-blue-700 border border-blue-200",
  "Info Cargo Laut": "bg-cyan-50 text-cyan-700 border border-cyan-200",
  "Update Layanan": "bg-green-50 text-green-700 border border-green-200",
  "Panduan Packing": "bg-purple-50 text-purple-700 border border-purple-200",
  "Berita & Promo": "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

function CategoryBadge({ category }: { category: string }) {
  const cls = categoryColors[category] ?? "bg-gray-50 text-gray-600 border border-gray-200";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {category}
    </span>
  );
}

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

export function BlogIndexView({
  content,
  posts,
  edit,
  page,
  categories,
  activeCategory,
}: {
  content: BlogIndexContent;
  posts: PostMeta[];
  edit?: boolean;
  page?: { current: number; total: number; base?: string };
  categories?: BlogCategory[];
  activeCategory?: { slug: string; name: string };
}) {
  const subtitle = [
    activeCategory ? `Kategori: ${activeCategory.name}` : null,
    page && page.current > 1 ? `Halaman ${page.current}` : null,
  ].filter(Boolean).join(" · ");
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sec edit={edit} id="hero">
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
            <nav aria-label="Breadcrumb" className="mb-3">
              <ol className="flex items-center gap-1.5 text-xs text-gray-400">
                <li><Link href="/" className="hover:text-[#CC1F2A] transition-colors">Beranda</Link></li>
                <li>»</li>
                <li className="text-gray-500" {...cms(edit, "hero.breadcrumb")}>{content.hero.breadcrumb}</li>
              </ol>
            </nav>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] mb-3" {...cms(edit, "hero.title")}>
              {content.hero.title}
              {subtitle ? <span className="block text-base sm:text-lg font-semibold text-gray-400 mt-1">{subtitle}</span> : null}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl" {...cms(edit, "hero.description")}>
              {content.hero.description}
            </p>
          </div>
        </div>
      </Sec>

      <Sec edit={edit} id="posts">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {categories ? <BlogFilterBar categories={categories} active={activeCategory?.slug} /> : null}
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 py-20" {...cms(edit, "posts.emptyText")}>{content.posts.emptyText}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9">
              {posts.map((post) => (
                <SimplePostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          {page ? <BlogPagination current={page.current} total={page.total} base={page.base} /> : null}
        </div>
      </Sec>
    </div>
  );
}
