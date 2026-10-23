export const BRAND = "BJA Logistic";

const TRAILING_BRAND = /\s*(?:[|\-–—:]\s*)?BJA\s+Logistic\s*$/i;

export function stripBrand(title?: string | null): string {
  let t = (title ?? "").trim();
  // Diulang, untuk membersihkan data lama yang sudah terlanjur dobel
  // (misal "Judul | BJA Logistic | BJA Logistic").
  while (TRAILING_BRAND.test(t)) {
    const next = t.replace(TRAILING_BRAND, "").trim();
    if (next === t) break;
    t = next;
  }
  return t;
}

export function withBrand(title?: string | null): string {
  const t = stripBrand(title);
  return t ? `${t} | ${BRAND}` : BRAND;
}v
