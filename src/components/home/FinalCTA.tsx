import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { buildGeneralMessage, WA_PHONE, WA_PHONE_RAW } from "@/lib/whatsapp";

export function FinalCTA() {
  return (
    <section className="py-20 bg-[#1B3A6B] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #F97316 0%, transparent 60%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)",
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/40 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
          <span className="text-[#F97316] text-sm font-semibold">Siap Kirim Sekarang?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
          Konsultasi Gratis,<br />
          <span className="text-[#F97316]">Harga Langsung Transparan</span>
        </h2>

        <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
          Chat WhatsApp kami sekarang — tim kami siap bantu hitung ongkir, konfirmasi jadwal, dan proses pengiriman Anda dalam hitungan menit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={buildGeneralMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc59] text-white font-black text-lg px-10 py-4 rounded-2xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
          >
            <MessageCircle size={22} />
            Chat WhatsApp Sekarang
            <ArrowRight size={18} />
          </a>
          <a
            href={`tel:+${WA_PHONE_RAW}`}
            className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all"
          >
            <Phone size={20} />
            {WA_PHONE}
          </a>
        </div>

        <p className="text-blue-300 text-sm mt-8">
          Senin – Sabtu, 08.00 – 20.00 WIB &nbsp;·&nbsp; Respon dalam 5 menit
        </p>
      </div>
    </section>
  );
}
