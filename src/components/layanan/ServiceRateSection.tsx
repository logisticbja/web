import { getRateTable, type RateType } from "@/lib/rateTables";
import { getAllCityPages, type CityPageData } from "@/lib/cityPages";
import { resolveDestinationValue } from "@/lib/data/pricing";
import { FreightRateTable } from "./FreightRateTable";
import {
  SeaFreightTable,
  type SeaRate,
  type SeaRegion,
} from "./SeaFreightTable";

const SEA_REGION_ORDER = ["Papua", "Maluku", "NTT", "Sulawesi"];

function seaRate(
  price: string | null,
  min: number | null,
  max: number | null,
): SeaRate {
  const value = Number(String(price ?? "").replace(/[^\d]/g, ""));
  if (!value) return null;
  const eta =
    min && max ? (min === max ? `${min} hari` : `${min}–${max} hari`) : "";
  return { price: value, eta };
}

function citySlug(slug: string) {
  return resolveDestinationValue(slug.replace(/-/g, "_")).replace(/_/g, "-");
}

function completeness(row: { reguler: SeaRate; express: SeaRate }) {
  return [row.reguler, row.express].reduce(
    (n, r) => n + (r ? 1 : 0) + (r?.eta ? 1 : 0),
    0,
  );
}

function buildSeaRegions(pages: CityPageData[]): SeaRegion[] {
  const groups = new Map<string, SeaRegion>();
  for (const page of pages) {
    const reguler = seaRate(
      page.priceRegular,
      page.regularEtaMin,
      page.regularEtaMax,
    );
    const express = seaRate(
      page.priceExpress,
      page.expressEtaMin,
      page.expressEtaMax,
    );
    if (!reguler && !express) continue;
    const region = (page.region || "Lainnya").trim();
    if (!groups.has(region)) groups.set(region, { region, rows: [] });
    const slug = citySlug(page.slug);
    const row = { city: page.city, slug, reguler, express };
    const rows = groups.get(region)!.rows;
    const existing = rows.findIndex((r) => r.slug === slug);
    if (existing === -1) rows.push(row);
    else if (completeness(row) > completeness(rows[existing]))
      rows[existing] = row;
  }
  const rank = (name: string) => {
    const i = SEA_REGION_ORDER.indexOf(name);
    return i === -1 ? SEA_REGION_ORDER.length : i;
  };
  return [...groups.values()]
    .sort(
      (a, b) =>
        rank(a.region) - rank(b.region) || a.region.localeCompare(b.region),
    )
    .map((g) => ({
      ...g,
      rows: g.rows.sort((a, b) => a.city.localeCompare(b.city, "id")),
    }));
}

async function SeaRateSection() {
  const regions = buildSeaRegions(await getAllCityPages());
  if (regions.length === 0) return null;
  const total = regions.reduce((n, r) => n + r.rows.length, 0);
  return (
    <section
      aria-labelledby="tarif-laut"
      className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
    >
      <h2 id="tarif-laut" className="mb-2 text-xl font-black text-[#111111]">
        Tarif Cargo Laut ke {total} Kota
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        Pilih wilayah atau cari nama kota. Klik nama kota untuk melihat detail
        layanan, jadwal, dan FAQ. Minimal pengiriman 100 kg.
      </p>
      <SeaFreightTable regions={regions} />
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
        <li>Estimasi dihitung sejak kapal berangkat dari pelabuhan asal.</li>
        <li>
          Berat yang dihitung adalah yang terbesar antara berat asli dan berat
          volume (P × L × T ÷ 4.000).
        </li>
        <li>
          Sudah termasuk pengantaran sampai alamat untuk wilayah kota tujuan.
          Alamat di luar wilayah kota dikenakan biaya penerusan.
        </li>
        <li>Tarif belum termasuk packing dan asuransi.</li>
      </ul>
    </section>
  );
}

const SECTIONS: Record<
  string,
  {
    type: RateType;
    title: string;
    intro: string;
    placeholder: string;
    notes: string[];
  }
> = {
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

const FAQS: Record<string, { q: string; a: string }[]> = {
  "cargo-laut": [
    {
      q: "Berapa lama kirim cargo laut ke Papua?",
      a: "Layanan Reguler umumnya 15–25 hari dan Express 6–17 hari, tergantung kota tujuan. Estimasi dihitung sejak kapal berangkat. Estimasi tiap kota ada di tabel di atas.",
    },
    {
      q: "Apa bedanya layanan Reguler dan Express?",
      a: "Reguler memakai kapal cargo dan Roro, sehingga tarifnya lebih hemat. Express memakai kapal PELNI yang lebih cepat sampai. Tidak semua kota memiliki kedua layanan.",
    },
    {
      q: "Berapa berat minimal kirim cargo laut?",
      a: "Minimal 100 kg. Untuk barang besar tetapi ringan, yang dihitung adalah berat volume (panjang × lebar × tinggi dalam cm ÷ 4.000) jika lebih besar dari berat aslinya.",
    },
    {
      q: "Apakah barang diantar sampai alamat penerima?",
      a: "Ya, untuk wilayah kota tujuan pengiriman sudah termasuk pengantaran sampai alamat (door to door). Untuk alamat di luar wilayah kota, biaya penerusan dihitung terpisah.",
    },
    {
      q: "Kapan barang saya berangkat?",
      a: "Barang berangkat mengikuti jadwal kapal terdekat. Pastikan barang sudah sampai gudang sebelum closing date yang tercantum di halaman jadwal kapal.",
    },
  ],
  "cargo-darat": [
    {
      q: "Berapa lama kirim barang dari Jakarta ke Surabaya lewat darat?",
      a: "Sekitar 3–5 hari. Tujuan Jawa Barat umumnya 2–4 hari, sedangkan Jawa Tengah, DI Yogyakarta, dan Jawa Timur sekitar 3–5 hari.",
    },
    {
      q: "Berapa berat minimal kirim cargo darat?",
      a: "Minimal 100 kg. Untuk barang besar tetapi ringan, yang dihitung adalah berat volume (panjang × lebar × tinggi dalam cm ÷ 4.000) jika lebih besar dari berat aslinya.",
    },
    {
      q: "Kota mana saja yang dilayani cargo darat?",
      a: "Lebih dari 70 kota di Jawa Barat, Jawa Tengah, DI Yogyakarta, dan Jawa Timur. Kalau kota tujuanmu belum ada di tabel, tanyakan ke tim kami lewat WhatsApp.",
    },
    {
      q: "Apakah tarif sudah termasuk packing dan asuransi?",
      a: "Belum. Packing tambahan dan asuransi bisa diatur sesuai kebutuhan barang, dan biayanya diinformasikan saat konfirmasi pesanan.",
    },
    {
      q: "Bisakah kirim ke luar Pulau Jawa lewat darat?",
      a: "Untuk tujuan Papua, Maluku, NTT, dan Sulawesi, gunakan layanan cargo laut atau cargo udara.",
    },
  ],
  "cargo-udara": [
    {
      q: "Berapa lama kirim cargo udara ke Papua?",
      a: "Sebagian besar kota tiba dalam 2–8 hari kerja. Contohnya Jayapura sekitar 4 hari kerja dan Sorong sekitar 3 hari kerja. Estimasi tiap kota ada di tabel di atas.",
    },
    {
      q: "Berapa berat minimal kirim cargo udara?",
      a: "Minimal 20 kg. Untuk barang besar tetapi ringan, yang dihitung adalah berat volume (panjang × lebar × tinggi dalam cm ÷ 5.000) jika lebih besar dari berat aslinya.",
    },
    {
      q: "Mana yang lebih hemat, cargo udara atau cargo laut?",
      a: "Cargo laut jauh lebih hemat untuk barang di atas 100 kg. Cargo udara cocok untuk kiriman yang harus tiba dalam hitungan hari kerja.",
    },
    {
      q: "Barang apa yang tidak bisa dikirim?",
      a: "BJA tidak menerima hewan hidup dan frozen food. Untuk cairan dan barang berbahaya, konfirmasikan dulu ke tim kami sebelum mengirim.",
    },
    {
      q: "Apa saja biaya di luar tarif per kg?",
      a: "Packing, asuransi, dan bongkar muat dihitung terpisah. Pengiriman ke daerah terpencil juga dikenakan biaya penerusan.",
    },
  ],
};

export function hasServiceRates(slug: string) {
  return slug in SECTIONS || slug === "cargo-laut";
}

function ServiceFaq({ slug }: { slug: string }) {
  const faqs = FAQS[slug];
  if (!faqs) return null;
  return (
    <section
      aria-labelledby={`faq-${slug}`}
      className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
    >
      <h2 id={`faq-${slug}`} className="mb-3 text-xl font-black text-[#111111]">
        Pertanyaan yang Sering Ditanyakan
      </h2>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
              {faq.q}
              <span className="text-[#CC1F2A] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export async function ServiceRateSection({ slug }: { slug: string }) {
  if (slug === "cargo-laut") {
    return (
      <>
        <SeaRateSection />
        <ServiceFaq slug={slug} />
      </>
    );
  }
  const section = SECTIONS[slug];
  if (!section) return null;
  const table = await getRateTable(section.type);
  return (
    <>
      <section
        aria-labelledby={`tarif-${section.type}`}
        className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
      >
        <h2
          id={`tarif-${section.type}`}
          className="mb-2 text-xl font-black text-[#111111]"
        >
          {section.title}
        </h2>
        <p className="mb-5 text-sm text-gray-500">
          {section.intro} Minimal pengiriman {table.minKg} kg.
        </p>
        <FreightRateTable
          regions={table.regions}
          idPrefix={section.type}
          placeholder={section.placeholder}
        />
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
          {section.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
      <ServiceFaq slug={slug} />
    </>
  );
}
