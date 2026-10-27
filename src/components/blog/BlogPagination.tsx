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

export function BlogPagination({ current, total, base = "/blog" }: { current: number; total: number; base?: string }) {
  if (total <= 1) return null;
  const link = "px-2 py-1 text-sm text-gray-500 transition-colors hover:text-[#CC1F2A]";
  return (
    <nav aria-label="Halaman artikel" className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      {current > 1 ? (
        <Link href={blogPageHref(current - 1, base)} rel="prev" className={link}>
          ‹ Sebelumnya
        </Link>
      ) : null}
      {pageItems(current, total).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="text-sm text-gray-300">…</span>
        ) : item === current ? (
          <span key={item} aria-current="page" className="px-2 py-1 text-sm font-bold text-[#111111] underline decoration-[#CC1F2A] decoration-2 underline-offset-8">
            {item}
          </span>
        ) : (
          <Link key={item} href={blogPageHref(item, base)} className={link}>
            {item}
          </Link>
        )
      )}
      {current < total ? (
        <Link href={blogPageHref(current + 1, base)} rel="next" className={link}>
          Berikutnya ›
        </Link>
      ) : null}
    </nav>
  );
}
