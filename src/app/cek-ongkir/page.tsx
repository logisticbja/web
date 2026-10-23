import { Metadata } from "next";
import { CekOngkirView } from "@/components/tools/CekOngkirView";
import { loadCekOngkir } from "@/lib/sitePages/fetch";
import { siteMetadata } from "@/lib/sitePages/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadCekOngkir();
  return siteMetadata(live, "/cek-ongkir", "Cek Ongkir — Kalkulator Biaya Pengiriman");
}

export default async function CekOngkirPage() {
  const { live } = await loadCekOngkir();
  return <CekOngkirView content={live} />;
}
