import { Metadata } from "next";
import { MessageCircle, Tag, CreditCard, Users, BarChart3, Shield, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { buildCorporateMessage } from "@/lib/whatsapp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WALink } from "@/components/ui/WALink";

export const metadata: Metadata = {
  title: "Solusi Logistik Corporate & B2B — Harga Kontrak Khusus",
  description:
    "Paket corporate BJA Logistic: harga kontrak khusus, pembayaran NET 30/60, dedicated account manager, dan laporan bulanan. Untuk bisnis dengan volume pengiriman 500 kg+/bulan ke Papua & Indonesia Timur.",
  alternates: { canonical: "https://bjalogistic.id/corporate" },
};

const benefits = [
  { icon: Tag, title: "Harga Kontrak Khusus", desc: "Negosiasi tarif tetap per periode — jauh di bawah harga eceran untuk volume rutin." },
  { icon: CreditCard, title: "Pembayaran Tempo NET 30/60", desc: "Fasilitas kredit untuk menjaga cash flow bisnis Anda tetap sehat sepanjang bulan." },
  { icon: Users, title: "Dedicated Account Manager", desc: "Satu AM khusus yang mengenal bisnis Anda, siap dihubungi 7 hari seminggu." },
  { icon: BarChart3, title: "Laporan Pengiriman Bulanan", desc: "Rekap lengkap: volume, status, invoice, dan analytics setiap bulan." },
  { icon: Shield, title: "Asuransi Full Coverage", desc: "Perlindungan menyeluruh untuk setiap pengiriman tanpa batas nilai barang." },
  { icon: FileText, title: "Invoice & Faktur Pajak", desc: "Dokumen lengkap untuk kebutuhan pembukuan dan pelaporan pajak perusahaan." },
];

const steps = [
  { step: "01", title: "Hubungi Tim Corporate", desc: "Chat WhatsApp tim corporate kami. Ceritakan kebutuhan volume, rute, dan frekuensi pengiriman Anda." },
  { step: "02", title: "Survei & Penawaran", desc: "Tim kami akan menganalisis kebutuhan dan menyiapkan penawaran harga kontrak yang kompetitif." },
  { step: "03", title: "Tanda Tangan Kontrak", desc: "Setujui MOU/kontrak kerjasama, tentukan SLA, dan aktifkan akun corporate Anda." },
  { step: "04", title: "Mulai Kirim & Pantau", desc: "Nikmati layanan dedicated AM, tracking prioritas, dan laporan pengiriman bulanan." },
];

const sectors = ["Distributor & FMCG", "Kontraktor & Konstruksi", "Mining & Energi", "Retail Chain", "Manufaktur", "Pemerintah & BUMN", "Pertanian & Perkebunan", "Telekomunikasi"];

const faqs = [
  { q: "Berapa minimum volume untuk program corporate?", a: "Volume pengiriman minimum 500 kg per bulan, atau komitmen kontrak minimum 3 bulan. Hubungi kami untuk diskusi lebih lanjut — kami fleksibel untuk bisnis baru yang sedang berkembang." },
  { q: "Berapa diskon yang bisa didapatkan vs tarif eceran?", a: "Penghematan rata-rata 15–25% dibanding tarif reguler, tergantung volume dan rute. Semakin besar volume dan frekuensi pengiriman, semakin kompetitif harga yang bisa kami berikan." },
  { q: "Apa itu NET 30/60 dan bagaimana cara kerjanya?", a: "NET 30/60 berarti tagihan dapat dibayarkan 30 atau 60 hari setelah pengiriman selesai. Fasilitas ini tersedia setelah melalui proses credit check dan penandatanganan perjanjian kredit." },
  { q: "Apakah tersedia layanan untuk pengiriman alat berat dan proyek skala besar?", a: "Ya, kami memiliki divisi Project Logistics khusus untuk pengiriman alat berat, mesin industri, dan kargo oversized. Hubungi tim kami untuk survei dan penawaran khusus." },
  { q: "Berapa lama proses onboarding corporate?", a: "Proses onboarding biasanya selesai dalam 3–5 hari kerja: konsultasi → survei kebutuhan → penawaran → penandatanganan kontrak → aktivasi akun." },
];

export default function CorporatePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Beranda", url: "https://bjalogistic.id" },
        { name: "Corporate", url: "https://bjalogistic.id/corporate" },
      ]} />

      {/* Hero */}
      <div className="bg-[#1A1A1A] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #F5C518 0%, transparent 60%)" }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/20 border border-[#F5C518]/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-sm font-semibold">Untuk Bisnis & Enterprise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            Solusi Logistik <span className="text-[#F5C518]">Corporate</span><br />yang Menguntungkan
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mb-8 leading-relaxed">
            Program eksklusif untuk bisnis dengan kebutuhan pengiriman rutin ke Papua & Indonesia Timur — harga kontrak, pembayaran tempo, dan layanan dedicated yang tidak tersedia di tarif reguler.
          </p>
          <div className="flex flex-wrap gap-4">
            <WALink
              href={buildCorporateMessage()}
              conversion="waCorporate"
              className="flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-7 py-4 rounded-xl transition-all hover:shadow-lg text-base"
            >
              <MessageCircle size={18} />
              Hubungi Tim Corporate
            </WALink>
            <a href="#cara-daftar" className="flex items-center gap-2 border-2 border-white/20 text-white hover:bg-white/10 font-bold px-7 py-4 rounded-xl transition-all text-base">
              Lihat Cara Daftar <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#F5C518] py-5 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: "50+", label: "Klien Corporate Aktif" },
            { value: "Hemat 20%", label: "vs Tarif Eceran" },
            { value: "NET 60", label: "Tenor Pembayaran Maks" },
            { value: "1 AM", label: "Dedicated per Klien" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-[#1A1A1A]">{s.value}</p>
              <p className="text-[#1A1A1A]/60 text-xs font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* Benefits */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-2">Fasilitas Program Corporate</h2>
          <p className="text-gray-500 mb-10">Eksklusif untuk klien corporate — tidak tersedia di tarif reguler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#F5C518]/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#F5C518]/15 flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-[#D4A910]" />
                </div>
                <h3 className="font-black text-[#111111] mb-1.5">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who is it for */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-2">Cocok untuk Industri Apa?</h2>
          <p className="text-gray-500 mb-8">Program corporate kami dirancang untuk bisnis dari berbagai sektor yang memiliki kebutuhan pengiriman rutin ke Papua & Indonesia Timur.</p>
          <div className="flex flex-wrap gap-3">
            {sectors.map((s) => (
              <span key={s} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-[#111111] shadow-sm">
                <CheckCircle size={14} className="text-[#D4A910]" />
                {s}
              </span>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#CC1F2A]/5 border border-[#CC1F2A]/15 rounded-xl text-sm text-gray-600">
            <strong className="text-[#CC1F2A]">Persyaratan minimum:</strong> Volume pengiriman min. 500 kg/bulan atau komitmen kontrak min. 3 bulan.
          </div>
        </div>

        {/* How to register */}
        <div id="cara-daftar">
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-2">Cara Daftar Corporate</h2>
          <p className="text-gray-500 mb-10">Proses onboarding selesai dalam 3–5 hari kerja.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-black text-[#F5C518]/30 mb-3">{s.step}</div>
                <h3 className="font-black text-[#111111] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111111] mb-8">Pertanyaan Umum Corporate</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-bold text-[#111111] list-none hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#1A1A1A] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, #F5C518 0%, transparent 60%)" }} />
          <div className="relative">
            <h2 className="text-3xl font-black text-white mb-3">Siap Memulai Kerjasama?</h2>
            <p className="text-white/55 mb-8 max-w-lg mx-auto">Tim corporate kami siap membantu Anda mendapatkan penawaran terbaik. Respon dalam 1×24 jam.</p>
            <WALink
              href={buildCorporateMessage()}
              conversion="waCorporate"
              className="inline-flex items-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,197,24,0.3)] text-lg"
            >
              <MessageCircle size={20} />
              Chat Tim Corporate Sekarang
            </WALink>
            <p className="text-white/30 text-xs mt-4">Senin–Sabtu 08.00–20.00 WIB · Respon dalam 1×24 jam</p>
          </div>
        </div>
      </div>
    </>
  );
}
