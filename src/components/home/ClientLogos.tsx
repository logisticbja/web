import { buildCorporateMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const clients = [
  "Indomaret", "Bank Negara Indonesia", "United Tractor",
  "PLN", "Synnex Metrodata", "CAP", "Madesa", "SIGS",
];

export function ClientLogos() {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Dipercaya oleh perusahaan-perusahaan terkemuka
          </p>
          <h2 className="text-2xl font-black text-[#0F172A]">
            Klien Corporate Kami
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {clients.map((client) => (
            <div
              key={client}
              className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 hover:border-[#1B3A6B]/30 hover:shadow-md transition-all"
            >
              <span className="font-black text-[#1B3A6B] text-sm whitespace-nowrap">{client}</span>
            </div>
          ))}
        </div>

        {/* Corporate CTA */}
        <div className="bg-gradient-to-r from-[#1B3A6B] to-[#2a5298] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-2">Untuk Kebutuhan Corporate?</h3>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            Dapatkan harga khusus, diskon volume, pembayaran tempo (TOP), dan tim dedicated untuk bisnis Anda
          </p>
          <a
            href={buildCorporateMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg"
          >
            <MessageCircle size={18} />
            Hubungi untuk Kerjasama Corporate
          </a>
        </div>
      </div>
    </section>
  );
}
