import type { Metadata } from "next";
import { getSchedules, jakartaToday, formatMonthYear, formatLongDate } from "@/lib/schedule";
import { loadJadwalKapal } from "@/lib/sitePages/fetch";
import { siteMetadata } from "@/lib/sitePages/metadata";
import { JADWAL_KAPAL_DEFAULTS, type JadwalKapalContent } from "@/lib/sitePages/jadwalKapal";
import { ScheduleClient } from "./ScheduleClient";
import { ScheduleGuide } from "./ScheduleGuide";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

const HERO_TITLE = "Jadwal Kapal ke Papua & Indonesia Timur";

function withSeoDefaults(live: JadwalKapalContent): JadwalKapalContent {
  const today = jakartaToday();
  const seo = { ...live.seo };
  if (!seo.title || seo.title === JADWAL_KAPAL_DEFAULTS.seo.title) {
    seo.title = `Jadwal Kapal PELNI ke Papua – ${formatMonthYear(today)}`;
  }
  if (!seo.description || seo.description === JADWAL_KAPAL_DEFAULTS.seo.description) {
    seo.description = `Jadwal kapal PELNI & Roro dari Surabaya ke Papua, Maluku, NTT, dan Sulawesi, diperbarui ${formatLongDate(today)}. Cek closing date & ETD, kirim barang mulai Rp7.000/kg.`;
  }
  const hero = live.hero.title === JADWAL_KAPAL_DEFAULTS.hero.title ? { ...live.hero, title: HERO_TITLE } : live.hero;
  return { ...live, seo, hero };
}

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadJadwalKapal();
  return siteMetadata(withSeoDefaults(live), "/jadwal-kapal", "Jadwal Kapal PELNI ke Papua & Indonesia Timur");
}

export default async function JadwalKapalPage() {
  const [schedules, { live }] = await Promise.all([getSchedules(), loadJadwalKapal()]);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "https://bjalogistic.id" },
          { name: "Jadwal Kapal", url: "https://bjalogistic.id/jadwal-kapal" },
        ]}
      />
      <ScheduleClient schedules={schedules} content={withSeoDefaults(live)} extra={<ScheduleGuide />} />
    </>
  );
}
