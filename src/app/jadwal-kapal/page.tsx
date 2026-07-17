import type { Metadata } from "next";
import { getSchedules } from "@/lib/schedule";
import { ScheduleClient } from "./ScheduleClient";

export const metadata: Metadata = {
  title: "Jadwal Kapal PELNI ke Papua & Indonesia Timur | BJA Logistic",
  description: "Jadwal keberangkatan kapal PELNI dan Roro dari Surabaya ke Papua, Maluku, NTT, dan Sulawesi. Cek estimasi waktu tiba dan frekuensi keberangkatan.",
};

export const revalidate = 3600;

export default async function JadwalKapalPage() {
  const schedules = await getSchedules();

  return <ScheduleClient schedules={schedules} />;
}
