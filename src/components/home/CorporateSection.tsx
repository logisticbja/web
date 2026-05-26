import { MessageCircle, Tag, Users, BarChart3, Shield, FileText } from "lucide-react";
import { buildCorporateMessage } from "@/lib/whatsapp";

const benefits = [
  {
    icon: Tag,
    title: "Harga Kontrak Khusus",
    desc: "Negosiasi tarif tetap per periode — jauh di bawah harga eceran",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    desc: "1 AM khusus yang mengenal bisnis Anda, siap dihubungi 7 hari seminggu",
  },
  {
    icon: BarChart3,
    title: "Laporan Pengiriman Bulanan",
    desc: "Rekap lengkap: volume, status, invoice, dan analytics per bulan",
  },
  {
    icon: Shield,
    title: "Asuransi Full Coverage",
    desc: "Perlindungan menyeluruh untuk setiap pengiriman tanpa batas nilai",
  },
  {
    icon: FileText,
    title: "Invoice & Faktur Pajak",
    desc: "Dokumen lengkap untuk kebutuhan pembukuan dan pelaporan pajak",
  },
];

const stats = [
  { value: "50+", label: "Klien Corporate Aktif" },
  { value: "1 AM", label: "Dedicated per Klien" },
];

export function CorporateSection() {
  return (
    <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — headline + benefits + CTA */}
          <div>
            <p className="text-[#F5C518] font-bold text-sm uppercase tracking-wider mb-3">
              Untuk Bisnis & Enterprise
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              Solusi Logistik{" "}
              <span className="text-[#F5C518]">Corporate</span>{" "}
              yang Menguntungkan
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Untuk bisnis dengan kebutuhan pengiriman rutin ke Papua & Indonesia Timur, kami menyediakan paket corporate dengan harga, fasilitas, dan layanan eksklusif yang tidak tersedia di tarif reguler.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon size={18} className="text-[#F5C518]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{b.title}</p>
                    <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={buildCorporateMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black px-7 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(245,197,24,0.3)] text-base"
            >
              <MessageCircle size={18} />
              Hubungi Tim Corporate Kami
            </a>
            <p className="text-white/30 text-xs mt-3">
              Respon dalam 1×24 jam · Tim corporate siap Senin–Sabtu
            </p>
          </div>

          {/* Right — stats + requirement */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-[#F5C518]/30 transition-all"
                >
                  <p className="text-3xl font-black text-[#F5C518] mb-1">{s.value}</p>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Minimum requirement card */}
            <div className="bg-[#CC1F2A]/15 border border-[#CC1F2A]/30 rounded-2xl p-6">
              <p className="text-white font-black text-base mb-2">Persyaratan Minimum</p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Volume pengiriman min.{" "}
                <strong className="text-white">500 kg per bulan</strong> atau komitmen kontrak
                min.{" "}
                <strong className="text-white">3 bulan</strong>. Cocok untuk distributor,
                FMCG, kontraktor, dan perusahaan dengan pengiriman rutin.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Distributor", "FMCG", "Kontraktor", "Mining", "Retail Chain", "Manufaktur"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70 font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Social proof note */}
            <p className="text-white/30 text-xs mt-4 text-center">
              Sudah dipercaya Indomaret, BNI, United Tractors, PLN, dan 50+ perusahaan lainnya
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
