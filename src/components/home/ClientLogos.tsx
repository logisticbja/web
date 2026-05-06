import Image from "next/image";
import { buildCorporateMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const clients = [
  { name: "Indomaret", src: "/client/indomaret.webp", width: 160, height: 80 },
  { name: "BNI", src: "/client/bni.webp", width: 160, height: 55 },
  { name: "United Tractors", src: "/client/united-tractor.webp", width: 180, height: 45 },
  { name: "PLN", src: "/client/pln.webp", width: 60, height: 80 },
  { name: "Chandra Asri", src: "/client/cap.webp", width: 180, height: 55 },
  { name: "Synnex Metrodata", src: "/client/synnex.webp", width: 180, height: 55 },
  { name: "Madesa", src: "/client/madesa.webp", width: 160, height: 45 },
  { name: "Sonton", src: "/client/sonton.webp", width: 140, height: 60 },
  { name: "SIGS", src: "/client/sigs.webp", width: 80, height: 55 },
  { name: "Aksara Grafika", src: "/client/aksara.webp", width: 160, height: 60 },
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {clients.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-xl px-5 py-5 shadow-sm border border-gray-100 hover:border-[#1B3A6B]/30 hover:shadow-md transition-all flex items-center justify-center"
              style={{ minHeight: 88 }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                className="object-contain max-h-12 w-auto"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mb-10">+ ratusan klien UKM & perorangan lainnya</p>

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
