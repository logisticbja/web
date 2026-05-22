import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracking Pengiriman — Cek Resi BJA Logistic",
  description:
    "Lacak status pengiriman cargo BJA Logistic dengan nomor resi. Cek posisi paket Anda ke Papua, Maluku, NTT, dan Sulawesi secara real-time.",
  keywords: [
    "tracking pengiriman papua", "cek resi bja logistic", "lacak paket papua",
    "tracking cargo papua", "cek pengiriman indonesia timur",
  ],
  alternates: { canonical: "https://bjalogistic.id/tracking" },
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
