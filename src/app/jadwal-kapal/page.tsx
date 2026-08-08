import type { Metadata } from "next";
import { getSchedules } from "@/lib/schedule";
import { getPageHero } from "@/lib/pageHero";
import { ScheduleClient } from "./ScheduleClient";

export const metadata: Metadata = {
  title: "Jadwal Kapal PELNI ke Papua & Indonesia Timur | BJA Logistic",
  description: "Jadwal keberangkatan kapal PELNI dan Roro dari Surabaya ke Papua, Maluku, NTT, dan Sulawesi. Cek estimasi waktu tiba dan frekuensi keberangkatan.",
};

export const revalidate = 300;

export default async function JadwalKapalPage() {
  const schedules = await getSchedules();
  // Konten hero (gambar/judul/deskripsi/badge) opsional dari CRM — menu "Hero
  // Halaman" > Jadwal Kapal. Kosongkan di CRM untuk tetap pakai teks default.
  // ScheduleClient adalah client component, jadi fetch-nya di sini (server)
  // lalu diteruskan lewat prop.
  const hero = await getPageHero("jadwal-kapal");

  return <ScheduleClient schedules={schedules} hero={hero} />;
}
