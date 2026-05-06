"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Apa itu BJA Logistic dan apa spesialisasinya?",
    a: "BJA Logistic adalah perusahaan ekspedisi yang berspesialisasi pada pengiriman cargo ke Papua dan Indonesia Timur, mencakup Maluku, NTT, dan Sulawesi. Kami memiliki pengalaman lebih dari 10 tahun dengan jaringan yang luas termasuk daerah pelosok.",
  },
  {
    q: "Berapa ongkir kirim ke Papua?",
    a: "Ongkir ke Papua mulai dari Rp 6.000/kg untuk cargo laut (min. 100 kg) dan Rp 7.000/kg untuk cargo darat. Harga final tergantung berat, volume, dan rute tujuan. Hubungi kami via WhatsApp untuk harga pasti.",
  },
  {
    q: "Berapa lama pengiriman ke Papua?",
    a: "Cargo laut: 14–20 hari. Cargo darat: 7–14 hari. Cargo udara: 2–4 hari. Waktu dapat bervariasi tergantung jadwal kapal dan kondisi cuaca.",
  },
  {
    q: "Apakah ada layanan door to door?",
    a: "Ya! Kami menyediakan layanan jemput barang langsung dari lokasi Anda di area Jabodetabek dan Surabaya. Antar ke tujuan juga tersedia di beberapa kota.",
  },
  {
    q: "Bagaimana cara tracking pengiriman saya?",
    a: "Anda bisa tracking melalui halaman tracking di website kami menggunakan nomor resi, atau langsung chat ke WhatsApp kami dengan menyebutkan nomor resi. Kami juga akan kirim notifikasi status secara berkala.",
  },
  {
    q: "Apakah ada layanan packing dan asuransi?",
    a: "Ya! Kami menyediakan jasa packing kayu (wooden crate) untuk barang fragile dan berharga, serta asuransi pengiriman untuk ketenangan pikiran Anda. Biaya tambahan berlaku.",
  },
  {
    q: "Apakah bisa kirim motor atau mobil?",
    a: "Ya, kami melayani pengiriman sepeda motor dan mobil ke seluruh Papua dan Indonesia Timur. Hubungi kami untuk survei dan penawaran harga terbaik.",
  },
  {
    q: "Apakah ada harga khusus untuk pengiriman volume besar / corporate?",
    a: "Tentu! Kami memiliki program corporate dengan harga khusus, diskon volume, asuransi pengiriman, dan pembayaran tempo (TOP). Hubungi kami untuk diskusi lebih lanjut.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#F97316] font-bold text-sm uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">
            Pertanyaan yang Sering Ditanyakan
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-[#0F172A] pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
