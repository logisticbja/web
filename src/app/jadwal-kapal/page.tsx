import type { Metadata } from "next";
import { getSchedules } from "@/lib/schedule";
import { getPageHero } from "@/lib/pageHero";
import { ScheduleClient } from "./ScheduleClient";

const BASE_URL = "https://bjalogistic.id";
const DEFAULT_TITLE = "Jadwal Kapal PELNI ke Papua & Indonesia Timur";
const DEFAULT_DESCRIPTION = "Jadwal keberangkatan kapal PELNI dan Roro dari Surabaya ke Papua, Maluku, NTT, dan Sulawesi. Cek estimasi waktu tiba dan frekuensi keberangkatan.";

export const revalidate = 300;

// generateMetadata (bukan `export const metadata` statis) — supaya bisa ambil
// override SEO dari CRM (menu Hero Halaman > Jadwal Kapal > bagian SEO).
// Catatan bug yang diperbaiki Agustus 2026: title di sini SEBELUMNYA sudah
// menulis manual "| BJA Logistic" di akhir, padahal root layout.tsx juga
// otomatis nambahin itu lewat title template — jadinya dobel di tab browser.
// Sekarang title TIDAK boleh include "| BJA Logistic" manual lagi.
export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageHero("jadwal-kapal");
  const title = hero?.seoMetaTitle || DEFAULT_TITLE;
  const description = hero?.seoMetaDescription || DEFAULT_DESCRIPTION;
  const canonical = `${BASE_URL}/jadwal-kapal`;
  const ogImage = hero?.seoOgImage || hero?.image || "/og-image.png";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function JadwalKapalPage() {
  const schedules = await getSchedules();
  // Konten hero (gambar/judul/deskripsi/badge) opsional dari CRM — menu "Hero
  // Halaman" > Jadwal Kapal. Kosongkan di CRM untuk tetap pakai teks default.
  // ScheduleClient adalah client component, jadi fetch-nya di sini (server)
  // lalu diteruskan lewat prop.
  const hero = await getPageHero("jadwal-kapal");

  return <ScheduleClient schedules={schedules} hero={hero} />;
}
