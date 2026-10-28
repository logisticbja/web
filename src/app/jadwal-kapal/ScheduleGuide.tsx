import Link from "next/link";
import { ArticleFaqJsonLd } from "@/components/JsonLd";

const ROUTES = [
  {
    region: "Papua",
    href: "/cargo/papua",
    text: "Kapal dari Surabaya ke Papua umumnya singgah di beberapa pelabuhan, misalnya Sorong dan Manokwari sebelum Jayapura, atau Timika sebelum Merauke.",
    cities: [
      ["Jayapura", "jayapura"],
      ["Sorong", "sorong"],
      ["Manokwari", "manokwari"],
      ["Merauke", "merauke"],
      ["Timika", "mimika"],
      ["Biak", "biak-numfor"],
      ["Nabire", "nabire"],
    ],
  },
  {
    region: "Maluku",
    href: "/cargo/maluku",
    text: "Rute Maluku melayani Ambon dan Ternate, termasuk kapal yang transit di Ternate sebelum lanjut ke Papua.",
    cities: [
      ["Ambon", "ambon"],
      ["Ternate", "ternate"],
      ["Tual", "tual"],
    ],
  },
  {
    region: "Sulawesi",
    href: "/cargo/sulawesi",
    text: "Untuk Sulawesi, pengiriman dilayani ke pelabuhan utama seperti Makassar dan Bitung, lalu diteruskan ke kota sekitarnya.",
    cities: [
      ["Makassar", "makassar"],
      ["Bitung", "bitung"],
      ["Manado", "manado"],
      ["Kendari", "kendari"],
    ],
  },
  {
    region: "NTT",
    href: "/cargo/ntt",
    text: "Pengiriman ke Nusa Tenggara Timur dilayani dengan tujuan utama Kupang.",
    cities: [["Kupang", "kupang"]],
  },
];

const FAQS = [
  {
    question: "Apa itu closing date pada jadwal kapal?",
    answer: "Closing date adalah batas terakhir barang harus sudah diterima di gudang kami agar bisa ikut kapal tersebut. Barang yang datang setelah closing date akan ikut kapal berikutnya.",
  },
  {
    question: "Apa arti ETD dan ETA?",
    answer: "ETD (Estimated Time of Departure) adalah perkiraan tanggal kapal berangkat dari Surabaya. ETA (Estimated Time of Arrival) adalah perkiraan tanggal kapal tiba di pelabuhan tujuan.",
  },
  {
    question: "Kenapa ETA tertulis Tanya CS?",
    answer: "Banyak kapal singgah di beberapa pelabuhan dalam satu perjalanan, sehingga waktu tiba di setiap kota berbeda. Tim kami akan menginfokan perkiraan tiba untuk kota tujuanmu lewat WhatsApp.",
  },
  {
    question: "Apa bedanya kapal Express (PELNI) dan Reguler?",
    answer: "Express memakai kapal PELNI yang lebih cepat sampai. Reguler memakai kapal Roro dan kapal cargo dengan tarif yang lebih hemat. Tidak semua kota memiliki kedua layanan.",
  },
  {
    question: "Apakah BJA Logistic menjual tiket kapal PELNI?",
    answer: "Tidak. BJA Logistic adalah jasa pengiriman barang (cargo) minimal 100 kg. Untuk tiket penumpang, silakan cek situs resmi PELNI di pelni.co.id.",
  },
  {
    question: "Bisakah kirim barang dari Jakarta dengan jadwal kapal ini?",
    answer: "Bisa. Barang dari Jakarta dan sekitarnya dibawa dulu ke Surabaya, jadi perlu dikirim lebih awal dari closing date. Tanyakan ke tim kami kapan barang paling lambat harus diserahkan.",
  },
];

export function ScheduleGuide() {
  return (
    <div className="space-y-6 mt-10">
      <section aria-labelledby="rute-kapal" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h2 id="rute-kapal" className="text-xl font-black text-[#111111] mb-2">
          Rute Kapal dari Surabaya ke Indonesia Timur
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Semua jadwal di atas berangkat dari Pelabuhan Tanjung Perak, Surabaya. Klik nama kota untuk melihat tarif, estimasi, dan cara kirim barang ke kota tersebut, atau hitung sendiri di <Link href="/cek-ongkir" className="font-semibold text-[#CC1F2A] hover:underline">Cek Ongkir</Link>.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {ROUTES.map((r) => (
            <div key={r.region}>
              <h3 className="font-bold text-[#111111] mb-1">Jadwal kapal ke {r.region}</h3>
              <p className="text-sm text-gray-600 mb-2">{r.text}</p>
              <p className="text-sm">
                {r.cities.map(([label, slug], i) => (
                  <span key={slug}>
                    {i > 0 && ", "}
                    <Link href={`/kirim-ke/${slug}`} className="font-semibold text-[#CC1F2A] hover:underline">
                      {label}
                    </Link>
                  </span>
                ))}
              </p>
              <Link href={r.href} className="mt-2 inline-block text-sm font-bold text-gray-700 hover:text-[#CC1F2A]">
                Tarif cargo ke {r.region} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-jadwal" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
        <h2 id="faq-jadwal" className="text-xl font-black text-[#111111] mb-3">
          Pertanyaan Seputar Jadwal Kapal
        </h2>
        <div className="divide-y divide-gray-100">
          {FAQS.map((f) => (
            <details key={f.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                {f.question}
                <span className="text-[#CC1F2A] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <ArticleFaqJsonLd items={FAQS} />
    </div>
  );
}
