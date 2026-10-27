import Link from "next/link";
import { blogPageHref } from "@/lib/blogPageHref";

function pageItems(current: number, total: number): (number | "gap")[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("gap");
    items.push(p);
  });
  return items;
}

export function BlogPagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const base = "min-w-10 h-10 px-3 inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors";
  return (
    <nav aria-label="Halaman artikel" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {current > 1 ? (
        <Link href={blogPageHref(current - 1)} rel="prev" className={`${base} border border-gray-200 bg-white text-gray-700 hover:border-[#CC1F2A] hover:text-[#CC1F2A]`}>
          ‹ Sebelumnya
        </Link>
      ) : null}
      {pageItems(current, total).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-gray-400">…</span>
        ) : item === current ? (
          <span key={item} aria-current="page" className={`${base} bg-[#CC1F2A] text-white`}>
            {item}
          </span>
        ) : (
          <Link key={item} href={blogPageHref(item)} className={`${base} border border-gray-200 bg-white text-gray-700 hover:border-[#CC1F2A] hover:text-[#CC1F2A]`}>
            {item}
          </Link>
        )
      )}
      {current < total ? (
        <Link href={blogPageHref(current + 1)} rel="next" className={`${base} border border-gray-200 bg-white text-gray-700 hover:border-[#CC1F2A] hover:text-[#CC1F2A]`}>
          Berikutnya ›
        </Link>
      ) : null}
    </nav>
  );
}
