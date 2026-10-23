import type { Metadata } from "next";
import { ToolPreview } from "@/components/preview/ToolPreview";

export const metadata: Metadata = {
  title: { absolute: "Preview Cek Ongkir — BJA Logistic" },
  robots: { index: false, follow: false },
};

export default function CekOngkirPreviewPage() {
  return <ToolPreview page="cek-ongkir" />;
}
