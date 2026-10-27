import { getRateTable, type RateType } from "@/lib/rateTables";
import { FreightRateTable } from "./FreightRateTable";

const SECTIONS: Record<string, { type: RateType; title: string; intro: string; placeholder: string; notes: string[] }> = {
  "cargo-darat": {
    type: "darat",
    title: "Tarif Cargo Darat dari Jakarta",
    intro: "Pilih provinsi atau cari nama kota.",
    placeholder: "Cari kota, mis. Semarang",
    notes: [
      "Berat yang dihitung adalah yang terbesar antara berat asli dan berat volume (P × L × T ÷ 4.000).",
      "Tarif belum termasuk packing dan asuransi.",
      "Tarif dapat berubah sewaktu-waktu. Pastikan harga final saat konfirmasi pesanan.",
    ],
  },
  "cargo-udara": {
    type: "udara",
    title: "Tarif Cargo Udara dari Jakarta",
    intro: "Pilih wilayah atau cari nama kota.",
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

export async function ServiceRateSection({ slug }: { slug: string }) {
  const section = SECTIONS[slug];
  if (!section) return null;
  const table = await getRateTable(section.type);
  return (
    <section aria-labelledby={`tarif-${section.type}`} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
      <h2 id={`tarif-${section.type}`} className="mb-2 text-xl font-black text-[#111111]">
        {section.title}
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        {section.intro} Minimal pengiriman {table.minKg} kg.
      </p>
      <FreightRateTable regions={table.regions} idPrefix={section.type} placeholder={section.placeholder} />
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
