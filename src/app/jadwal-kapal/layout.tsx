import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Kapal ke Papua & Indonesia Timur",
  description:
    "Jadwal kapal PELNI dan Roro ke Papua, Maluku, NTT, dan Sulawesi. Cek jadwal keberangkatan, rute, dan estimasi tiba. Konfirmasi via WhatsApp BJA Logistic.",
  keywords: [
    "jadwal kapal papua", "jadwal kapal pelni papua", "jadwal kapal roro papua",
    "jadwal kapal surabaya jayapura", "jadwal kapal ke sorong", "jadwal kapal ke manokwari",
    "jadwal kapal indonesia timur", "jadwal pelni 2025",
  ],
  alternates: { canonical: "https://bjalogistic.id/jadwal-kapal" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
