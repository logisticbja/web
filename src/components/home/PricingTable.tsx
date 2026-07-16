import { CheckCircle, Star } from "lucide-react";
import { WAButton } from "@/components/ui/WAButton";
import { buildServiceMessage } from "@/lib/whatsapp";

const plans = [
  {
    name: "Cargo Darat",
    tagline: "Seimbang & Fleksibel",
    priceFrom: "Rp 7.000",
    unit: "/kg",
    minWeight: "min. 100 kg",
    eta: "7–14 hari",
    waService: "Cargo Darat",
    popular: false,
    features: [
      "Armada truk sendiri",
      "Door to door Jabodetabek",
      "Tracking pengiriman",
      "Cocok untuk barang sedang",
      "Packing standar tersedia",
    ],
  },
  {
    name: "Cargo Laut",
    tagline: "Paling Populer & Hemat",
    priceFrom: "Rp 6.000",
    unit: "/kg",
    minWeight: "min. 100 kg",
    eta: "14–20 hari",
    waService: "Cargo Laut",
    popular: true,
    features: [
      "Kapal Roro & PELNI",
      "Cocok barang berat & besar",
      "Harga paling terjangkau",
      "Tracking real-time",
      "Packing kayu tersedia",
      "Asuransi tersedia",
    ],
  },
  {
    name: "Cargo Udara",
    tagline: "Paling Cepat",
    priceFrom: "Rp 20.000",
    unit: "/kg",
    minWeight: "min. 100 kg",
    eta: "2–4 hari",
    waService: "Cargo Udara",
    popular: false,
    features: [
      "Via pesawat komersial",
      "Paling cepat sampai",
      "Cocok barang urgent",
      "Tracking real-time",
      "Layanan express tersedia",
    ],
  },
];

export function PricingTable() {
  return (
    <section id="harga" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2">Perbandingan Harga</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]">
            Pilih Layanan Sesuai Kebutuhan
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            Harga transparan, tidak ada biaya tersembunyi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                plan.popular
                  ? "bg-[#CC1F2A] text-white shadow-2xl shadow-navy/20 scale-105"
                  : "bg-white text-[#111111] border border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="bg-[#F5C518] text-[#1A1A1A] text-xs font-bold text-center py-2 px-4 flex items-center justify-center gap-1.5">
                  <Star size={12} fill="white" />
                  PALING POPULER
                </div>
              )}

              <div className="p-7 flex-1">
                <h3 className={`text-xl font-black mb-1 ${plan.popular ? "text-white" : "text-[#111111]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-white/70" : "text-gray-500"}`}>
                  {plan.tagline}
                </p>

                <div className="mb-2">
                  <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-[#CC1F2A]"}`}>
                    {plan.priceFrom}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/70" : "text-gray-500"}`}>
                    {plan.unit}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    plan.popular ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {plan.minWeight}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    plan.popular ? "bg-[#F5C518]/30 text-[#F5C518]" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    ⏱ {plan.eta}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle
                        size={16}
                        className={plan.popular ? "text-[#F5C518]" : "text-green-500"}
                      />
                      <span className={`text-sm ${plan.popular ? "text-white/80" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-7 pb-7">
                <WAButton
                  href={buildServiceMessage(plan.waService)}
                  label={`Pesan ${plan.name}`}
                  size="md"
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          * Harga di atas adalah estimasi. Harga final tergantung rute, berat, dan volume barang.{" "}
          <a href="#" className="text-[#CC1F2A] font-semibold hover:underline">Hubungi kami</a> untuk penawaran terbaik.
        </p>
      </div>
    </section>
  );
}
