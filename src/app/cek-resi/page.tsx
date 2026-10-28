import type { Metadata } from "next";
import { TrackingView } from "@/components/tools/TrackingView";
import { loadTracking } from "@/lib/sitePages/fetch";
import { siteMetadata } from "@/lib/sitePages/metadata";
import { TRACKING_DEFAULTS, type TrackingContent } from "@/lib/sitePages/tracking";
import { ArticleFaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { CekResiGuide, CEK_RESI_FAQS } from "./CekResiGuide";

const OLD_SEO_TITLES = ["Tracking Resi", "Tracking Pengiriman"];
const OLD_SEO_DESCRIPTIONS = ["Cek status pengiriman Anda dengan nomor resi BJA Logistic."];
const OLD_HERO_TITLES = ["Tracking Pengiriman", "Tracking Resi"];
const OLD_HERO_DESCRIPTIONS = ["Cek status pengiriman Anda dengan nomor resi"];
const OLD_PLACEHOLDERS = ["Masukkan nomor resi — contoh: BJA-2024-001"];

function withCekResiDefaults(live: TrackingContent): TrackingContent {
  const d = TRACKING_DEFAULTS;
  const pickNew = (value: string, olds: string[], next: string) => (!value || olds.includes(value) ? next : value);
  return {
    ...live,
    seo: {
      ...live.seo,
      title: pickNew(live.seo.title, OLD_SEO_TITLES, d.seo.title),
      description: pickNew(live.seo.description, OLD_SEO_DESCRIPTIONS, d.seo.description),
    },
    hero: {
      ...live.hero,
      title: pickNew(live.hero.title, OLD_HERO_TITLES, d.hero.title),
      description: pickNew(live.hero.description, OLD_HERO_DESCRIPTIONS, d.hero.description),
      imageAlt: pickNew(live.hero.imageAlt, OLD_HERO_TITLES, d.hero.imageAlt),
    },
    search: {
      ...live.search,
      placeholder: pickNew(live.search.placeholder, OLD_PLACEHOLDERS, d.search.placeholder),
    },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { live } = await loadTracking();
  return siteMetadata(withCekResiDefaults(live), "/cek-resi", "Cek Resi BJA Logistic – Lacak Pengiriman Cargo");
}

export default async function CekResiPage() {
  const { live } = await loadTracking();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "https://bjalogistic.id" },
          { name: "Cek Resi", url: "https://bjalogistic.id/cek-resi" },
        ]}
      />
      <ArticleFaqJsonLd items={CEK_RESI_FAQS} />
      <TrackingView content={withCekResiDefaults(live)} extra={<CekResiGuide />} />
    </>
  );
}
