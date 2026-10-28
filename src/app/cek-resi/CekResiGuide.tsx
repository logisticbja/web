import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WALink } from "@/components/ui/WALink";
import { buildGeneralMessage } from "@/lib/whatsapp";

const STEPS = [
  {
    title: "Cari nomor BJA No.",
    text: "Nomor resi adalah BJA No. yang ada di pojok kanan atas STT (Surat Tanda Terima), atau di bagian BJA No pada invoice. Nomor ini juga bisa ditanyakan ke CS kami lewat WhatsApp.",
  },
  {
    title: "Ketik nomornya tanpa angka 0 di depan",
    text: "Contoh: BJA No. 008203 cukup ditulis 8203, dan 009875 ditulis 9875. Kalau di invoice tertulis 10702, ketik 10702.",
  },
  {
    title: "Klik tombol Cek",
    text: "Status terbaru, asal dan tujuan, serta riwayat perjalanan barang akan muncul di bawah kolom pencarian.",
  },
  {
    title: "Belum ketemu? Hubungi CS",
    text: "Jika resi tidak ditemukan atau status belum berubah, kirim nomor resi ke CS kami lewat WhatsApp untuk dicek langsung.",
  },
];

const STATUSES = [
  ["Diterima", "Barang masuk dan dicatat di gudang asal."],
  ["Proses", "Barang sedang dikemas dan diproses."],
  ["Siap Muat", "Barang menunggu jadwal kapal atau pesawat."],
  ["Dalam Perjalanan", "Kapal atau pesawat sudah berangkat."],
  ["Transit", "Singgah di pelabuhan atau hub transit."],
  ["Tiba di Pelabuhan", "Barang tiba di pelabuhan atau bandara tujuan."],
  ["Proses Bongkar", "Barang sedang dibongkar dan disiapkan untuk diantar."],
  ["Pengiriman Terakhir", "Barang sedang diantar ke alamat penerima."],
  ["Terkirim", "Barang sudah diterima oleh penerima."],
];

export const CEK_RESI_FAQS = [
  {
    question: "Di mana saya bisa menemukan nomor resi BJA Logistic?",
    answer: "Nomor resi adalah BJA No. yang tertera di pojok kanan atas STT (Surat Tanda Terima) dan di bagian BJA No pada invoice. Anda juga bisa menanyakannya ke CS BJA Logistic lewat WhatsApp.",
  },
  {
    question: "Bagaimana cara menulis nomor resi saat cek resi?",
    answer: "Ketik nomor BJA No. tanpa angka 0 di depan. Contohnya, BJA No. 008203 cukup ditulis 8203.",
  },
  {
    question: "Kenapa nomor resi saya tidak ditemukan?",
    answer: "Pastikan nomor BJA No. diketik benar tanpa angka 0 di depan. Jika barang baru saja diserahkan, data mungkin belum masuk ke sistem. Hubungi CS kami lewat WhatsApp untuk dicek langsung.",
  },
  {
    question: "Apakah bisa cek resi lewat WhatsApp?",
    answer: "Bisa. Kirim nomor resi ke CS BJA Logistic lewat WhatsApp, tim kami akan menginfokan status dan posisi barang Anda.",
  },
  {
    question: "Kapan status pengiriman diperbarui?",
    answer: "Status diperbarui setiap kali barang berpindah tahap, misalnya saat kapal berangkat, tiba di pelabuhan tujuan, atau sedang diantar ke penerima.",
  },
];

export function CekResiGuide() {
  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-6">
        <section aria-labelledby="cara-cek-resi" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 id="cara-cek-resi" className="text-xl font-black text-[#111111] mb-5">
            Cara Cek Resi BJA Logistic
          </h2>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="w-8 h-8 shrink-0 rounded-full bg-[#CC1F2A] text-white text-sm font-black flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#111111]">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <WALink
            href={buildGeneralMessage()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#CC1F2A] px-5 py-3 text-sm font-bold text-white hover:bg-[#A01820]"
          >
            <MessageCircle size={16} /> Cek Resi via WhatsApp
          </WALink>
        </section>

        <section aria-labelledby="arti-status" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 id="arti-status" className="text-xl font-black text-[#111111] mb-2">
            Arti Status Pengiriman
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Berikut urutan status yang akan Anda lihat saat cek resi, dari barang diterima sampai tiba di penerima.
          </p>
          <dl className="divide-y divide-gray-100">
            {STATUSES.map(([name, desc]) => (
              <div key={name} className="py-3 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="font-bold text-sm text-[#111111]">{name}</dt>
                <dd className="text-sm text-gray-600 mt-0.5 sm:mt-0">{desc}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-gray-600 mt-5">
            Ingin tahu kapan kapal berikutnya berangkat? Lihat{" "}
            <Link href="/jadwal-kapal" className="font-semibold text-[#CC1F2A] hover:underline">
              jadwal kapal
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="faq-cek-resi" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h2 id="faq-cek-resi" className="text-xl font-black text-[#111111] mb-3">
            Pertanyaan Seputar Cek Resi
          </h2>
          <div className="divide-y divide-gray-100">
            {CEK_RESI_FAQS.map((f) => (
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
      </div>
    </div>
  );
}
