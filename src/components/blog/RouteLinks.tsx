import Link from "next/link";
import type { RouteLink } from "@/lib/blogRouteLinks";

export function RouteLinks({ links }: { links: RouteLink[] }) {
  if (links.length === 0) return null;
  return (
    <section aria-labelledby="route-links" className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 id="route-links" className="mb-4 text-lg font-black text-[#111111] sm:text-xl">
        Kirim Barang ke Tujuan Ini
      </h2>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center rounded-full border border-gray-200 px-4 py-2 text-sm font-bold text-[#111111] transition-colors hover:border-[#CC1F2A] hover:text-[#CC1F2A]"
            >
              {link.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
