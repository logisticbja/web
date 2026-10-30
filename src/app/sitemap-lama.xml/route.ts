import { destinationCities, destinationValueToSlug } from "@/lib/data/pricing";
import { resolveLegacyCityPath } from "@/lib/legacyCityRedirect";

export const dynamic = "force-static";

const BASE_URL = "https://bjalogistic.id";

export function GET() {
  const paths = new Set<string>();
  for (const city of destinationCities) {
    const slug = destinationValueToSlug(city.value);
    for (const origin of ["jakarta", "surabaya"]) {
      const path = `/${origin}-${slug}`;
      const target = resolveLegacyCityPath(path);
      if (target && target !== path && target.startsWith("/kirim-ke/")) paths.add(path);
    }
  }
  const urls = [...paths]
    .sort()
    .map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
