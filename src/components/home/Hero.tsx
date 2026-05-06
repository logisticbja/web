import { MessageCircle, ChevronDown, CheckCircle } from "lucide-react";
import { buildGeneralMessage } from "@/lib/whatsapp";

const trustBadges = [
  "10+ Tahun Pengalaman",
  "50+ Kota Tujuan",
  "Indomaret & BNI Percaya Kami",
  "98% Tepat Waktu",
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#1B3A6B] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A6B] via-[#1B3A6B]/95 to-[#0f2347]" />

      {/* Orange accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F97316]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/40 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-[#F97316] text-sm font-semibold">
              #1 Ekspedisi Papua & Indonesia Timur
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
            Kirim Cargo ke{" "}
            <span className="text-[#F97316]">Papua</span> &{" "}
            <span className="text-[#F97316]">Indonesia Timur</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">Cepat, Aman & Terjangkau</span>
          </h1>

          {/* Subheadline */}
          <p className="text-blue-200 text-lg sm:text-xl mb-8 leading-relaxed">
            Mulai <strong className="text-white">Rp 6.000/kg</strong> &nbsp;·&nbsp; Door to Door Jabodetabek &nbsp;·&nbsp; Kapal Roro, PELNI & Pesawat
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={buildGeneralMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg px-7 py-4 rounded-xl shadow-2xl"
            >
              <MessageCircle size={20} />
              Cek Ongkir via WhatsApp
            </a>
            <a
              href="#harga"
              className="btn-secondary text-base sm:text-lg px-7 py-4 rounded-xl"
            >
              Lihat Harga
              <ChevronDown size={18} />
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <CheckCircle size={14} className="text-[#F97316] shrink-0" />
                <span className="text-white text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
