export type BlogRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

const cityPostRedirects: [string, string][] = [
  ["ekspedisi-jakarta-manokwari", "manokwari"],
  ["ekspedisi-jakarta-ambon", "ambon"],
  ["ekspedisi-jakarta-jayapura", "jayapura"],
  ["ekspedisi-jakarta-merauke", "merauke"],
  ["ekspedisi-jakarta-sorong", "sorong"],
  ["ekspedisi-jakarta-kupang", "kupang"],
  ["ekspedisi-jakarta-ternate", "ternate"],
  ["ekspedisi-jakarta-makassar", "makassar"],
  ["ekspedisi-jakarta-manado", "manado"],
  ["ekspedisi-jakarta-palu", "palu"],
  ["ekspedisi-jakarta-kendari", "kendari"],
  ["ekspedisi-jakarta-baubau", "baubau"],
  ["ekspedisi-jakarta-bone", "bone"],
  ["ekspedisi-jakarta-maros", "maros"],
  ["jakarta-fakfak", "fakfak"],
  ["jakarta-saumlaki", "saumlaki"],
];

const schedulePostPrefixes = ["jadwal-", "rute-"];

export const blogRedirects: BlogRedirect[] = [
  ...cityPostRedirects.map(([slug, city]) => ({
    source: `/blog/${slug}`,
    destination: `/kirim-ke/${city}`,
    permanent: true as const,
  })),
  ...schedulePostPrefixes.map((prefix) => ({
    source: `/blog/${prefix}:slug`,
    destination: "/jadwal-kapal",
    permanent: true as const,
  })),
];

const redirectedSlugs = new Set(cityPostRedirects.map(([slug]) => slug));

export function isRedirectedBlogSlug(slug: string) {
  return (
    redirectedSlugs.has(slug) ||
    schedulePostPrefixes.some((prefix) => slug.startsWith(prefix) && slug.length > prefix.length)
  );
}
