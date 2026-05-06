import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Owner Toko Material, Jayapura",
    initial: "B",
    rating: 5,
    text: "Sudah 3 tahun pakai BJA untuk kirim material bangunan dari Surabaya ke Jayapura. Harganya paling murah dibanding yang lain, dan barang selalu dateng tepat waktu. Pelayanan CS juga responsif banget!",
  },
  {
    name: "Dewi Rahayu",
    role: "Distributor FMCG, Sorong",
    initial: "D",
    rating: 5,
    text: "Kirim 2-3 ton barang tiap bulan via cargo laut BJA. Trackingnya real-time, jadi saya bisa kasih info akurat ke customer saya di Sorong. Highly recommended untuk bisnis yang butuh logistik ke Papua!",
  },
  {
    name: "Hendra Wijaya",
    role: "Pengusaha, Jakarta",
    initial: "H",
    rating: 5,
    text: "Awalnya ragu kirim mesin industri ke Timika, tapi BJA meyakinkan dengan solusi packing kayu dan asuransi. Alhamdulillah semua aman sampai tujuan. Proses koordinasinya juga mudah via WhatsApp.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#F97316] font-bold text-sm uppercase tracking-wider mb-2">Testimoni</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            Ribuan pelanggan sudah merasakan manfaat layanan kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-[#F8FAFC] rounded-2xl p-7 relative border border-gray-100">
              <Quote size={32} className="text-[#1B3A6B]/10 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B3A6B] flex items-center justify-center">
                  <span className="text-white font-black text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
