import { AIR_FREIGHT_MIN_KG, airFreightRates } from "@/lib/data/airFreight";
import { LAND_FREIGHT_MIN_KG, landFreightRates } from "@/lib/data/landFreight";
import { FreightRateTable, type FreightRegion } from "./FreightRateTable";

const airRegions: FreightRegion[] = airFreightRates.map((r) => ({
  region: r.region,
  rates: r.rates.map((rate) => ({ city: rate.city, price: rate.price, eta: `${rate.days} hari kerja` })),
}));

const landRegions: FreightRegion[] = landFreightRates.map((r) => ({
  region: r.region,
  rates: r.rates.map((rate) => ({ city: rate.city, price: rate.price, eta: `${rate.etaMin}–${rate.etaMax} hari` })),
}));

const SECTIONS: Record<string, { title: string; intro: string; regions: FreightRegion[]; idPrefix: string; placeholder: string; notes: string[] }> = {
  "cargo-darat": {
    title: "Tarif Cargo Darat dari Jakarta",
    intro: `Pilih provinsi atau cari nama kota. Minimal pengiriman ${LAND_FREIGHT_MIN_KG} kg.`,
    regions: landRegions,
    idPrefix: "darat",
    placeholder: "Cari kota, mis. Semarang",
    notes: [
      "Berat yang dihitung adalah yang terbesar antara berat asli dan berat volume (P × L × T ÷ 4.000).",
      "Tarif belum termasuk packing dan asuransi.",
      "Tarif dapat berubah sewaktu-waktu. Pastikan harga final saat konfirmasi pesanan.",
    ],
  },
  "cargo-udara": {
    title: "Tarif Cargo Udara dari Jakarta",
    intro: `Pilih wilayah atau cari nama kota. Minimal pengiriman ${AIR_FREIGHT_MIN_KG} kg.`,
    regions: airRegions,
    idPrefix: "udara",
    placeholder: "Cari kota, mis. Jayapura",
    notes: [
      "Berat yang dihitung adalah yang terbesar antara berat asli dan berat volume (P × L × T ÷ 5.000).",
      "Tarif belum termasuk packing, asuransi, serta biaya bongkar muat.",
      "Pengiriman ke daerah terpencil dikenakan biaya penerusan.",
      "Estimasi dihitung dalam hari kerja, tidak termasuk hari libur.",
    ],
  },
};

export function hasServiceRates(slug: string) {
  return slug in SECTIONS;
}

export function ServiceRateSection({ slug }: { slug: string }) {
  const section = SECTIONS[slug];
  if (!section) return null;
  return (
    <section aria-labelledby={`tarif-${section.idPrefix}`} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
      <h2 id={`tarif-${section.idPrefix}`} className="mb-2 text-xl font-black text-[#111111]">
        {section.title}
      </h2>
      <p className="mb-5 text-sm text-gray-500">{section.intro}</p>
      <FreightRateTable regions={section.regions} idPrefix={section.idPrefix} placeholder={section.placeholder} />
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
