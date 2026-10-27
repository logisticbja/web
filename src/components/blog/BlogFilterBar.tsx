import Link from "next/link";
import type { BlogCategory } from "@/lib/blogCategories";
import { categoryBase } from "@/lib/blogCategories";
import { BlogSearch } from "./BlogSearch";

export function BlogFilterBar({ categories, active }: { categories: BlogCategory[]; active?: string }) {
  const chip = "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors";
  const on = "bg-[#CC1F2A] text-white";
  const off = "border border-gray-200 bg-white text-gray-600 hover:border-[#CC1F2A] hover:text-[#CC1F2A]";
  return (
    <div className="mb-8 space-y-4">
      <BlogSearch />
      {categories.length > 0 ? (
        <nav aria-label="Kategori artikel" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <ul className="flex gap-2 sm:flex-wrap">
            <li>
              <Link href="/blog" aria-current={!active ? "page" : undefined} className={`${chip} ${!active ? on : off} inline-block`}>
                Semua
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={categoryBase(category.slug)}
                  aria-current={active === category.slug ? "page" : undefined}
                  className={`${chip} ${active === category.slug ? on : off} inline-block whitespace-nowrap`}
                >
                  {category.name}
                  <span className="ml-1.5 opacity-70">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
