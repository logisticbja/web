import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { buildServiceMessage } from "@/lib/whatsapp";

type City = { name: string; slug?: string };

const regions: { name: string; color: string; cities: City[] }[] = [
  {
    name: "Papua & Papua Barat",
    color: "bg-[#CC1F2A]",
    cities: [
      { name: "Jayapura", slug: "jayapura" },
      { name: "Sorong", slug: "sorong" },
      { name: "Manokwari", slug: "manokwari" },
      { name: "Merauke", slug: "merauke" },
      { name: "Timika", slug: "timika" },
      { name: "Wamena", slug: "wamena" },
      { name: "Nabire", slug: "nabire" },
      { name: "Biak", slug: "biak" },
      { name: "Fakfak", slug: "fakfak" },
      { name: "Raja Ampat", slug: "raja-ampat" },
      { name: "+ semua kab/kota & pelosok Papua" },
    ],
  },
  {
    name: "Maluku & Maluku Utara",
    color: "bg-[#A01820]",
    cities: [
      { name: "Ambon", slug: "ambon" },
      { name: "Ternate", slug: "ternate" },
      { name: "Tidore", slug: "tidore" },
      { name: "Tual", slug: "tual" },
      { name: "Saumlaki" },
      { name: "Namlea" },
      { name: "Masohi" },
      { name: "+ semua pulau & kepulauan Maluku" },
    ],
  },
  {
    name: "Nusa Tenggara Timur",
    color: "bg-[#CC1F2A]",
    cities: [
      { name: "Kupang", slug: "kupang" },
      { name: "Ende", slug: "ende" },
      { name: "Maumere", slug: "maumere" },
      { name: "Labuan Bajo", slug: "labuan-bajo" },
      { name: "Waingapu" },
      { name: "Atambua" },
      { name: "Ruteng" },
      { name: "+ semua kab/kota NTT" },
    ],
  },
  {
    name: "Sulawesi Tenggara & Sekitarnya",
    color: "bg-[#A01820]",
    cities: [
      { name: "Kendari", slug: "kendari" },
      { name: "Baubau", slug: "baubau" },
      { name: "Kolaka" },
      { name: "Raha" },
      { name: "Pomalaa" },
      { name: "+ semua wilayah Sulawesi Tenggara" },
    ],
  },
];

export function CoverageSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2">Jangkauan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]">
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
                <MapPin size={18} className="text-[#F5C518]" />
                <h3 className="font-black text-base">{region.name}</h3>
              </div>
              <ul className="space-y-1.5 flex-1 mb-6">
                {region.cities.map((city) => (
                  <li key={city.name} className="text-sm">
                    {city.name.startsWith("+") ? (
                      <span className="text-white/50 italic">{city.name}</span>
                    ) : city.slug ? (
                      <Link
                        href={`/kirim-ke/${city.slug}`}
                        className="flex items-center gap-1.5 text-white/80 hover:text-[#F5C518] transition-colors group"
                      >
                        <span className="text-white/40 group-hover:text-[#F5C518]/60">•</span>
                        <span className="underline-offset-2 group-hover:underline">{city.name}</span>
                      </Link>
                    ) : (
                      <span className="text-white/60">• {city.name}</span>
                    )}
                  </li>
                ))}
              </ul>
              <a
                href={buildServiceMessage(`Pengiriman ke ${region.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-2.5 rounded-xl transition-colors text-sm"
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
