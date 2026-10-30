import Link from "next/link";
import { getAllCityPages } from "@/lib/cityPages";
import { getEffectiveCityPricing, formatEta, toSlug } from "@/lib/cityPage";
import { getCitiesByRegion } from "@/lib/data/regions";

const KEY_CITIES: { value: string; label: string }[] = [
  { value: "jayapura", label: "Jayapura" },
  { value: "sorong", label: "Sorong" },
  { value: "manokwari", label: "Manokwari" },
  { value: "merauke", label: "Merauke" },
  { value: "mimika", label: "Mimika (Timika)" },
  { value: "nabire", label: "Nabire" },
  { value: "biak_numfor", label: "Biak Numfor" },
  { value: "fakfak", label: "Fakfak" },
  { value: "kaimana", label: "Kaimana" },
  { value: "serui", label: "Serui" },
  { value: "wamena", label: "Wamena" },
];

function rupiah(n: number | null) {
  return n === null ? "–" : `Rp${n.toLocaleString("id-ID")}/kg`;
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 rounded-full bg-[#CC1F2A]" />
      <h2 className="text-base font-black text-[#111]">{children}</h2>
    </div>
  );
}

export async function RegionGuidePapua() {
  const pages = await getAllCityPages();
  const bySlug = new Map(pages.map((p) => [p.slug, p]));
  const cityCount = getCitiesByRegion("papua").reduce((n, g) => n + g.cities.length, 0);

  const rows = KEY_CITIES.map((c) => {
    const p = getEffectiveCityPricing(c.value, bySlug.get(toSlug(c.value)) ?? null);
    return {
      ...c,
      slug: toSlug(c.value),
      reguler: p.regulerPrice,
      regulerEta: formatEta(p.regulerEtaMin, p.regulerEtaMax),
      express: p.expressPrice,
      expressEta: formatEta(p.expressEtaMin, p.expressEtaMax),
    };
  });
  const cheapest = rows.reduce<number | null>((m, r) => {
    const v = [r.reguler, r.express].filter((x): x is number => x !== null);
    const low = v.length ? Math.min(...v) : null;
    return low === null ? m : m === null ? low : Math.min(m, low);
  }, null);

  return (
    <div className="space-y-10 mb-10">
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <Title>Ekspedisi Pengiriman ke Papua dari Jakarta dan Surabaya</Title>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            BJA Logistic adalah ekspedisi spesialis Papua dan Indonesia Timur. Kami melayani cargo ke Papua untuk barang dalam
            jumlah besar, mulai dari stok toko, material proyek, mesin, sampai barang pindahan, dengan minimal pengiriman
            <strong> 100 kg</strong>.
          </p>
          <p>
            Barang bisa dijemput atau diantar ke gudang kami di Jakarta &amp; sekitarnya (Jabodetabek) dan Surabaya, lalu
            dikirim lewat kapal laut ke {cityCount} kota dan kabupaten di Papua, Papua Barat, Papua Barat Daya, Papua Tengah,
            Papua Selatan, dan Papua Pegunungan.
            {cheapest !== null && (
              <>
                {" "}Ongkir kirim barang ke Papua mulai <strong>{rupiah(cheapest)}</strong>, tergantung kota tujuan dan layanan.
              </>
            )}
          </p>
        </div>
      </section>

      <section>
        <Title>Ongkir Cargo ke Papua per Kota</Title>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-[#CC1F2A] text-white">
                <th className="text-left px-5 py-3 font-bold">Kota Tujuan</th>
                <th className="text-left px-5 py-3 font-bold">Reguler</th>
                <th className="text-left px-5 py-3 font-bold">Express</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.value} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-5 py-3">
                    <Link href={`/kirim-ke/${r.slug}`} className="font-bold text-[#CC1F2A] hover:underline">
                      Cargo ke {r.label}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {r.reguler === null ? "Tidak tersedia" : `${rupiah(r.reguler)}${r.regulerEta ? ` · ${r.regulerEta}` : ""}`}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {r.express === null ? "Tidak tersedia" : `${rupiah(r.express)}${r.expressEta ? ` · ${r.expressEta}` : ""}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          Estimasi dihitung sejak kapal berangkat dari pelabuhan asal. Untuk barang besar tetapi ringan, ongkir dihitung dari
          berat volume (P × L × T ÷ 4.000). Harga final dikonfirmasi tim kami sebelum barang dikirim. Kota lain di Papua bisa
          dicek di daftar kota di atas atau lewat <Link href="/cek-ongkir" className="text-[#CC1F2A] font-semibold hover:underline">cek ongkir</Link>.
        </p>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <Title>Cara Kirim Barang ke Papua lewat BJA Logistic</Title>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 leading-relaxed">
          <li>Chat tim kami lewat WhatsApp: sebutkan jenis barang, perkiraan berat atau ukuran, dan kota tujuan di Papua.</li>
          <li>Tim kami mengirim penawaran harga dan jadwal kapal terdekat.</li>
          <li>Barang dijemput dari lokasi Anda di Jabodetabek atau Surabaya, atau Anda antar sendiri ke gudang kami.</li>
          <li>Barang ditimbang, diukur, dan dikemas bila perlu, lalu dimuat ke kapal sebelum <em>closing date</em>.</li>
          <li>Pantau status pengiriman lewat halaman <Link href="/cek-resi" className="text-[#CC1F2A] font-semibold hover:underline">cek resi</Link> sampai barang tiba di alamat penerima.</li>
        </ol>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <Title>Reguler atau Express ke Papua?</Title>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>Reguler</strong> memakai kapal cargo. Tarifnya paling hemat, cocok untuk barang besar dan pengiriman
              rutin yang tidak dikejar waktu.
            </p>
            <p>
              <strong>Express</strong> memakai kapal PELNI sehingga lebih cepat sampai. Cocok untuk barang yang ditunggu,
              misalnya kebutuhan proyek atau stok toko yang hampir habis.
            </p>
            <p>
              Untuk kota di pegunungan seperti Wamena, barang dikirim lewat laut ke kota pesisir, lalu diteruskan dengan
              pesawat cargo. Karena itu tarifnya lebih tinggi.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <Title>Barang yang Bisa Dikirim ke Papua</Title>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600 leading-relaxed">
            <li>Material bangunan, peralatan proyek, dan <Link href="/layanan/kirim-alat-berat" className="text-[#CC1F2A] font-semibold hover:underline">alat berat</Link></li>
            <li>Stok barang toko, sembako, dan barang dagangan umum</li>
            <li>Mesin dan peralatan kerja</li>
            <li>Perabot rumah tangga dan <Link href="/layanan/pindahan-rumah" className="text-[#CC1F2A] font-semibold hover:underline">barang pindahan</Link></li>
            <li>Kendaraan: <Link href="/layanan/kirim-motor" className="text-[#CC1F2A] font-semibold hover:underline">motor</Link> dan <Link href="/layanan/kirim-mobil" className="text-[#CC1F2A] font-semibold hover:underline">mobil</Link></li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">Kami tidak menerima hewan hidup maupun mati dan frozen food.</p>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <Title>Tips Agar Barang Aman Sampai Papua</Title>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 leading-relaxed">
          <li>Cek <Link href="/jadwal-kapal" className="text-[#CC1F2A] font-semibold hover:underline">jadwal kapal cargo</Link> dan serahkan barang sebelum closing date agar tidak tertinggal kapal.</li>
          <li>Barang pecah belah dan elektronik sebaiknya dikemas dengan <Link href="/blog/cara-packing-kayu-yang-baik-untuk-pengiriman-cargo-laut" className="text-[#CC1F2A] font-semibold hover:underline">packing kayu</Link>.</li>
          <li>Tulis nama, alamat lengkap, dan nomor telepon penerima yang aktif di setiap koli.</li>
          <li>Gunakan asuransi untuk barang bernilai tinggi seperti mesin dan elektronik.</li>
        </ul>
      </section>
    </div>
  );
}
