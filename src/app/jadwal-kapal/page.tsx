import type { Metadata } from "next";
import { getSchedules } from "@/lib/schedule";
import { loadJadwalKapal } from "@/lib/sitePages/fetch";
import { siteMetadata } from "@/lib/sitePages/metadata";
import { ScheduleClient } from "./ScheduleClient";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadJadwalKapal();
  return siteMetadata(live, "/jadwal-kapal", "Jadwal Kapal PELNI ke Papua & Indonesia Timur");
}

export default async function JadwalKapalPage() {
  const [schedules, { live }] = await Promise.all([getSchedules(), loadJadwalKapal()]);
  return <ScheduleClient schedules={schedules} content={live} />;
}
