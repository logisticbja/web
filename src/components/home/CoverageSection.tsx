import { MapPin, MessageCircle } from "lucide-react";
import { buildServiceMessage } from "@/lib/whatsapp";

const regions = [
  {
    name: "Papua & Papua Barat",
    color: "bg-[#1B3A6B]",
    cities: [
      "Jayapura", "Sorong", "Manokwari", "Merauke", "Timika",
      "Wamena", "Nabire", "Biak", "Fakfak", "Raja Ampat",
      "+ semua kab/kota & pelosok Papua",
    ],
  },
  {
    name: "Maluku & Maluku Utara",
    color: "bg-[#2a5298]",
    cities: [
      "Ambon", "Ternate", "Tidore", "Tual", "Saumlaki",
      "Namlea", "Masohi",
      "+ semua pulau & kepulauan Maluku",
    ],
  },
  {
    name: "Nusa Tenggara Timur",
    color: "bg-[#1B3A6B]",
    cities: [
      "Kupang", "Ende", "Maumere", "Labuan Bajo", "Waingapu",
      "Atambua", "Ruteng",
      "+ semua kab/kota NTT",
    ],
  },
  {
    name: "Sulawesi Tenggara & Sekitarnya",
    color: "bg-[#2a5298]",
    cities: [
      "Kendari", "Baubau", "Kolaka", "Raha",
      "Pomalaa",
      "+ semua wilayah Sulawesi Tenggara",
    ],
  },
];

export function CoverageSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#F97316] font-bold text-sm uppercase tracking-wider mb-2">Jangkauan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0F172A]">
            Kami Menjangkau Seluruh Indonesia Timur
          </h2>
          <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">
            Termasuk daerah pelosok yang tidak terlayani ekspedisi umum lainnya
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => (
            <div
              key={region.name}
              className={`${region.color} rounded-2xl p-6 text-white flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-[#F97316]" />
                <h3 className="font-black text-base">{region.name}</h3>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {region.cities.map((city) => (
                  <li key={city} className={`text-sm ${city.startsWith("+") ? "text-blue-300 italic" : "text-blue-100"}`}>
                    {city.startsWith("+") ? city : `• ${city}`}
                  </li>
                ))}
              </ul>
              <a
                href={buildServiceMessage(`Pengiriman ke ${region.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#ea6c0a] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
              >
                <MessageCircle size={15} />
                Kirim ke Sini
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
