import type { Metadata } from "next";
import { CekOngkirPreview } from "@/components/preview/ToolPreview";
import { loadCekOngkir } from "@/lib/sitePages/fetch";

export const metadata: Metadata = {
  title: { absolute: "Preview Cek Ongkir — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default async function CekOngkirPreviewPage() {
  const { live, defaults } = await loadCekOngkir();
  return <CekOngkirPreview live={live} defaults={defaults} />;
}
