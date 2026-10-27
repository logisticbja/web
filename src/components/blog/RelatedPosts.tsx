import Link from "next/link";
import BlogCoverImage from "@/app/blog/BlogCoverImage";
import { formatDate } from "@/lib/blogDate";
import type { PostMeta } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-posts" className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 id="related-posts" className="mb-2 text-lg font-black text-[#111111] sm:text-xl">
        Artikel Terkait
      </h2>
      <ul className="divide-y divide-gray-100">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 py-4">
              <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg sm:w-28">
                <BlogCoverImage src={post.cover} alt={post.title} category={post.category} />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-bold leading-snug text-[#111111] transition-colors group-hover:text-[#CC1F2A] sm:text-base">
                  {post.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">{formatDate(post.date)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
