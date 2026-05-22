import Link from "next/link";
import { Ship, Truck, Plane, Bike, Car, Package, Clock, ArrowRight } from "lucide-react";
import { WAButton } from "@/components/ui/WAButton";
import { buildServiceMessage } from "@/lib/whatsapp";
import { services } from "@/lib/data/services";

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Ship, Truck, Plane, Bike, Car, Package,
};

export function ServicesGrid() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2">Layanan Kami</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]">
            Semua Kebutuhan Logistik Anda
          </h2>
          <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">
            Dari cargo reguler hingga kendaraan dan proyek besar — kami handle semuanya ke Papua & Indonesia Timur
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Package;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center mb-4 group-hover:bg-[#CC1F2A] transition-colors">
                  <Icon size={26} className="text-[#CC1F2A] group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-black text-[#111111] mb-2">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Price & ETA */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Mulai dari</p>
                    <p className="font-black text-[#CC1F2A]">{service.priceFrom}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                      <Clock size={11} /> Estimasi
                    </p>
                    <p className="font-bold text-gray-700 text-sm">{service.eta}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <WAButton
                    href={buildServiceMessage(service.waService)}
                    label="Tanya WA"
                    size="sm"
                    className="flex-1 text-xs"
                  />
                  <Link
                    href={service.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#CC1F2A] hover:text-[#CC1F2A] transition-colors"
                  >
                    Detail <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
