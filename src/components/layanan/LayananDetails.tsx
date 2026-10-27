import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WALink } from "@/components/ui/WALink";
import { buildGeneralMessage } from "@/lib/whatsapp";
import { getRateTable, rateStats } from "@/lib/rateTables";
import { FreightRateTable } from "./FreightRateTable";

function rupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

type Stats = { landMinPrice: number; landEtaMin: number; landEtaMax: number; landMinKg: number; airMinPrice: number; airMinKg: number };

const buildComparison = ({ landMinPrice, landEtaMin, landEtaMax, landMinKg, airMinPrice, airMinKg }: Stats) => [
  {
    label: "Cocok untuk",
    laut: "Barang berat dan besar: material proyek, mesin, stok toko, barang pindahan, kendaraan",
    darat: "Distribusi stok, barang proyek, dan kiriman partai besar antarkota di Pulau Jawa",
    udara: "Barang mendesak dan bernilai tinggi: dokumen, sparepart, alat kesehatan",
  },
  {
    label: "Rute",
    laut: "Jakarta & sekitarnya atau Surabaya ke Papua, Maluku, NTT, dan Sulawesi",
    darat: "Jakarta ke Jawa Barat, Jawa Tengah, DI Yogyakarta, dan Jawa Timur",
    udara: "Jakarta ke Indonesia Timur dan kota besar lainnya",
  },
  {
    label: "Estimasi",
    laut: "4–25 hari setelah kapal berangkat, tergantung kota dan layanan",
    darat: `${landEtaMin}–${landEtaMax} hari, tergantung kota tujuan`,
    udara: "2–8 hari kerja untuk sebagian besar kota",
  },
  {
    label: "Minimal kirim",
    laut: "100 kg",
    darat: `${landMinKg} kg`,
    udara: `${airMinKg} kg`,
  },
  {
    label: "Tarif",
    laut: "Mulai Rp7.000/kg",
    darat: `Mulai ${rupiah(landMinPrice)}/kg`,
    udara: `Mulai ${rupiah(airMinPrice)}/kg ke Indonesia Timur`,
  },
];

const faqs = [
  {
    q: "Mana yang lebih hemat, cargo laut atau cargo udara?",
    a: "Untuk tujuan Indonesia Timur, cargo laut jauh lebih hemat untuk barang di atas 100 kg. Cargo udara lebih mahal per kg, tetapi barang tiba dalam hitungan hari kerja, sehingga cocok untuk kiriman kecil yang mendesak.",
  },
  {
    q: "Bagaimana berat kiriman dihitung?",
    a: "Yang dihitung adalah berat terbesar antara berat asli dan berat volume. Berat volume cargo laut dan darat = panjang × lebar × tinggi (cm) ÷ 4.000, sedangkan cargo udara ÷ 5.000.",
  },
  {
    q: "Apakah tarif sudah termasuk packing dan asuransi?",
    a: "Belum. Packing kayu, bubble wrap, dan asuransi bisa ditambahkan sesuai kebutuhan barang. Tim kami akan menghitungnya saat konfirmasi pesanan.",
  },
  {
    q: "Apakah barang diantar sampai alamat?",
    a: "Untuk cargo laut, pengiriman sudah termasuk pengantaran sampai alamat penerima di wilayah kota tujuan. Untuk alamat di luar wilayah kota dan daerah terpencil, ada biaya penerusan yang dihitung terpisah.",
  },
  {
    q: "Bagaimana cara memesan?",
    a: "Hubungi tim BJA lewat WhatsApp dengan menyebutkan kota asal, kota tujuan, jenis barang, serta perkiraan berat atau ukurannya. Tim kami akan mengirimkan penawaran harga dan jadwal keberangkatan terdekat.",
  },
];

export async function LayananDetails() {
  const [land, air] = await Promise.all([getRateTable("darat"), getRateTable("udara")]);
  const landStats = rateStats(land);
  const airStats = rateStats(air, ["Kota besar lainnya"]);
  const comparison = buildComparison({
    landMinPrice: landStats.minPrice,
    landEtaMin: landStats.minDays,
    landEtaMax: landStats.maxDays,
    landMinKg: land.minKg,
    airMinPrice: airStats.minPrice,
    airMinKg: air.minKg,
  });
  return (
    <div className="bg-[#F8FAFC] pb-16">
      <section aria-labelledby="bandingkan" className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="bandingkan" className="mb-2 text-xl font-black text-[#111111] sm:text-2xl">
          Bandingkan Cargo Laut, Darat, dan Udara
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-gray-500 sm:text-base">
          Setiap layanan punya kelebihan masing-masing. Pilih berdasarkan jenis barang, berat, dan seberapa cepat barang perlu tiba.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-gray-50 text-left text-gray-900">
              <tr>
                <th className="w-36 px-5 py-4" />
                <th className="px-5 py-4 font-black">
                  <Link href="/layanan/cargo-laut" className="hover:text-[#CC1F2A]">Cargo Laut</Link>
                </th>
                <th className="px-5 py-4 font-black">
                  <Link href="/layanan/cargo-darat" className="hover:text-[#CC1F2A]">Cargo Darat</Link>
                </th>
                <th className="px-5 py-4 font-black">
                  <Link href="/layanan/cargo-udara" className="hover:text-[#CC1F2A]">Cargo Udara</Link>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comparison.map((row) => (
                <tr key={row.label}>
                  <th className="px-5 py-4 text-left align-top text-xs font-bold uppercase tracking-wide text-gray-400">{row.label}</th>
                  <td className="px-5 py-4 align-top text-gray-700">{row.laut}</td>
                  <td className="px-5 py-4 align-top text-gray-700">{row.darat}</td>
                  <td className="px-5 py-4 align-top text-gray-700">{row.udara}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="tarif-laut" className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="tarif-laut" className="mb-2 text-xl font-black text-[#111111] sm:text-2xl">
            Tarif Cargo Laut ke Indonesia Timur
          </h2>
          <p className="mb-5 max-w-2xl text-sm text-gray-500 sm:text-base">
            Tarif cargo laut berbeda untuk setiap kota tujuan, mulai Rp7.000/kg dengan minimal 100 kg. Tersedia layanan Reguler (kapal cargo) dan Express (kapal PELNI) untuk sebagian besar kota.
          </p>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { href: "/cargo/papua", label: "Papua" },
              { href: "/cargo/maluku", label: "Maluku" },
              { href: "/cargo/ntt", label: "NTT" },
              { href: "/cargo/sulawesi", label: "Sulawesi" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-bold text-gray-800 transition-colors hover:border-[#CC1F2A] hover:text-[#CC1F2A]"
              >
                Cargo ke {item.label}
              </Link>
            ))}
          </div>
          <Link href="/cek-ongkir" className="text-sm font-bold text-[#CC1F2A] hover:underline">
            Hitung estimasi ongkir cargo laut di Cek Ongkir →
          </Link>
        </div>
      </section>

      <section aria-labelledby="tarif-darat" className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="tarif-darat" className="mb-2 text-xl font-black text-[#111111] sm:text-2xl">
            Tarif Cargo Darat Jakarta – Jawa
          </h2>
          <p className="mb-5 max-w-2xl text-sm text-gray-500 sm:text-base">
            Kirim barang dari Jakarta ke kota-kota di Jawa Barat, Jawa Tengah, DI Yogyakarta, dan Jawa Timur lewat jalur darat. Minimal pengiriman {land.minKg} kg.
          </p>
          <FreightRateTable regions={land.regions} idPrefix="darat" placeholder="Cari kota, mis. Semarang" />
          <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
            <li>Berat yang dihitung adalah yang terbesar antara berat asli dan berat volume (P × L × T ÷ 4.000).</li>
            <li>Tarif belum termasuk packing dan asuransi.</li>
            <li>Tarif dapat berubah sewaktu-waktu. Pastikan harga final saat konfirmasi pesanan.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="tarif-udara" className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="tarif-udara" className="mb-2 text-xl font-black text-[#111111] sm:text-2xl">
            Tarif Cargo Udara dari Jakarta
          </h2>
          <p className="mb-5 max-w-2xl text-sm text-gray-500 sm:text-base">
            Pilih wilayah atau cari nama kota untuk melihat tarif per kg dan estimasi waktu pengiriman. Minimal pengiriman {air.minKg} kg.
          </p>
          <FreightRateTable regions={air.regions} idPrefix="udara" placeholder="Cari kota, mis. Jayapura" />
          <ul className="mt-5 list-disc space-y-1.5 pl-5 text-xs text-gray-500 sm:text-sm">
            <li>Berat yang dihitung adalah yang terbesar antara berat asli dan berat volume (P × L × T ÷ 5.000).</li>
            <li>Tarif belum termasuk packing, asuransi, serta biaya bongkar muat.</li>
            <li>Tarif berlaku untuk kota tujuan. Pengiriman ke daerah terpencil dikenakan biaya penerusan.</li>
            <li>Estimasi dihitung dalam hari kerja, tidak termasuk hari libur.</li>
            <li>Tarif dapat berubah sewaktu-waktu. Pastikan harga final saat konfirmasi pesanan.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="cara-memilih" className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="cara-memilih" className="mb-4 text-xl font-black text-[#111111] sm:text-2xl">
            Cara Memilih Layanan yang Tepat
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-gray-700 sm:text-base">
            <li>
              <strong>Lihat berat barang.</strong> Di atas 100 kg, cargo laut hampir selalu paling hemat. Untuk kiriman kecil, bandingkan dengan cargo udara.
            </li>
            <li>
              <strong>Tentukan kapan barang harus tiba.</strong> Kalau ada tenggat dalam hitungan hari, pilih cargo udara. Kalau masih ada waktu beberapa minggu, cargo laut lebih efisien.
            </li>
            <li>
              <strong>Perhatikan ukuran barang.</strong> Barang besar tapi ringan dihitung dengan berat volume. Pelajari caranya di artikel{" "}
              <Link href="/blog/cara-hitung-volume-barang-untuk-pengiriman-cargo-dan-jasa-ekspedisi" className="font-semibold text-[#CC1F2A] hover:underline">
                cara menghitung berat volume
              </Link>
              .
            </li>
            <li>
              <strong>Cek jadwal keberangkatan.</strong> Untuk cargo laut, pastikan barang tiba di gudang sebelum{" "}
              <Link href="/jadwal-kapal" className="font-semibold text-[#CC1F2A] hover:underline">
                closing date jadwal kapal
              </Link>
              .
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-layanan" className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 id="faq-layanan" className="mb-4 text-xl font-black text-[#111111] sm:text-2xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                  {faq.q}
                  <span className="text-[#CC1F2A] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] p-7 text-center text-white sm:p-9">
          <h2 className="mb-2 text-lg font-black sm:text-xl">Masih bingung pilih layanan?</h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-white/75">
            Ceritakan barang dan tujuan pengirimanmu. Tim BJA akan bantu pilihkan layanan yang paling hemat dan tepat waktu.
          </p>
          <WALink
            href={buildGeneralMessage()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5C518] px-8 py-3 text-sm font-bold text-[#1A1A1A] shadow-lg transition-colors hover:bg-[#D4A910]"
          >
            <MessageCircle size={16} />
            Chat via WhatsApp
          </WALink>
        </div>
      </section>
    </div>
  );
}
