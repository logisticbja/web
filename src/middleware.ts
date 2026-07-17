import { NextRequest, NextResponse } from "next/server";

// Known top-level routes — skip middleware for these
const STATIC_ROUTES = new Set([
  "/cek-ongkir",
  "/client",
  "/corporate",
  "/jadwal-kapal",
  "/kontak",
  "/tracking",
]);

// Known path prefixes — skip middleware for these
const KNOWN_PREFIXES = [
  "/blog/",
  "/cargo/",
  "/cek-ongkir-cargo/",
  "/cek-ongkir",
  "/kirim-ke/",
  "/layanan/",
  "/api/",
  "/jakarta-",
  "/_next/",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip root and known routes
  if (pathname === "/" || STATIC_ROUTES.has(pathname)) return NextResponse.next();

  // Skip known prefixes
  if (KNOWN_PREFIXES.some((p) => pathname.startsWith(p))) return NextResponse.next();

  // Skip paths with file extensions (static assets)
  if (pathname.includes(".")) return NextResponse.next();

  // Only handle single-segment paths (e.g. /cara-kirim-barang-ke-papua)
  const slug = pathname.slice(1);
  if (slug.includes("/")) return NextResponse.next();

  // Check if a blog post with this slug exists via PHP API
  try {
    const res = await fetch(
      `${process.env.BLOG_API_URL}?slug=${encodeURIComponent(slug)}`,
      { headers: { "X-API-Key": process.env.TRACKING_API_KEY ?? "" } }
    );
    const json = await res.json();
    if (json.status === "success" && json.data) {
      return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 301);
    }
  } catch {
    // API error — fall through to 404
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon\\.).*)"],
};
