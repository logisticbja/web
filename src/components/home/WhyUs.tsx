import { MapPin, Layers, DollarSign, Home, Globe, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Spesialis Papua",
    desc: "Kami memahami betul kondisi geografis, cuaca, dan infrastruktur di Papua & Indonesia Timur — bukan generalis.",
  },
  {
    icon: Layers,
    title: "Layanan Lengkap",
    desc: "Darat, laut, udara, kendaraan, hingga project logistics — semua tersedia dalam satu atap.",
  },
  {
    icon: DollarSign,
    title: "Harga Paling Kompetitif",
    desc: "Tarif mulai Rp 6.000/kg tanpa biaya tersembunyi. Jauh lebih hemat dari ekspedisi umum.",
  },
  {
    icon: Home,
    title: "Door to Door",
    desc: "Layanan antar-jemput langsung dari lokasi Anda di Jabodetabek. Tanpa repot ke terminal.",
  },
  {
    icon: Globe,
    title: "Jaringan Sangat Luas",
    desc: "Menjangkau 50+ kota termasuk pelosok Papua yang tidak terlayani ekspedisi lain.",
  },
  {
    icon: ShieldCheck,
    title: "Aman & Tepat Waktu",
    desc: "Tracking real-time, packing kayu tersedia, asuransi pengiriman, dan garansi waktu tiba.",
  },
];

export function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#F97316] font-bold text-sm uppercase tracking-wider mb-2">Mengapa BJA?</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">
            Kenapa Ribuan Pelanggan Percaya Kami
          </h2>
          <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">
            Bukan sekadar ekspedisi biasa — kami adalah spesialis dengan pengalaman mendalam di wilayah timur Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B3A6B] flex items-center justify-center shrink-0 mt-0.5">
                <r.icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-[#0F172A] text-lg mb-1.5">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
