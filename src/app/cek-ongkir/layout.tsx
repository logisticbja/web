import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Ongkir ke Papua & Indonesia Timur",
  description:
    "Hitung estimasi ongkir pengiriman cargo ke Papua, Maluku, NTT, dan Sulawesi. Kalkulator ongkir gratis — cargo laut, darat, dan udara. Langsung pesan via WhatsApp.",
  keywords: [
    "cek ongkir papua", "ongkir ke papua", "hitung ongkir papua",
    "kalkulator ongkir papua", "tarif ekspedisi papua", "biaya kirim ke papua",
    "cek ongkir jayapura", "cek ongkir sorong", "cek ongkir manokwari",
  ],
  alternates: { canonical: "https://bjalogistic.id/cek-ongkir" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
