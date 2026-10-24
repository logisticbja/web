import { getRegionConfig } from "@/lib/data/regions";
import { loadBlogIndex, loadCekOngkir, loadJadwalKapal, loadLayanan, loadTracking, loadTujuan } from "@/lib/sitePages/fetch";

export const revalidate = 3600;

const CRM_ORIGIN = process.env.NEXT_PUBLIC_CRM_ORIGIN || "https://invoice.bjalogistic.id";

export async function GET() {
  const regions = (["papua", "maluku", "ntt", "sulawesi"] as const).map((r) => getRegionConfig(r)).filter((c) => c !== undefined);
  const [layanan, cekOngkir, jadwalKapal, tracking, blog, ...tujuan] = await Promise.all([
    loadLayanan(),
    loadCekOngkir(),
    loadJadwalKapal(),
    loadTracking(),
    loadBlogIndex(),
    ...regions.map((c) => loadTujuan(c)),
  ]);
  const pages: Record<string, unknown> = {
    layanan,
    "cek-ongkir": cekOngkir,
    "jadwal-kapal": jadwalKapal,
    tracking,
    blog,
  };
  regions.forEach((c, i) => {
    pages[`tujuan-${c.slug}`] = tujuan[i];
  });
  return Response.json(
    { pages },
    { headers: { "Access-Control-Allow-Origin": CRM_ORIGIN, Vary: "Origin" } },
  );
}
