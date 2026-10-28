import Link from "next/link";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { buildServiceMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import type { CoverageContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

const REGION_COLORS = {
  merah: "bg-[#CC1F2A]",
  merahTua: "bg-[#A01820]",
} as const;

export function CoverageSection({ content, edit }: { content: CoverageContent } & EditProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "coverage.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "coverage.title")}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto" {...cms(edit, "coverage.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="m-swipe grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.regions.map((region, i) => (
            <div
              key={`${i}-${region.name}`}
              className={`${REGION_COLORS[region.color]} rounded-2xl p-6 text-white flex flex-col`}
              {...cms(edit, `coverage.regions.${i}`)}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-[#F5C518]" />
                <h3 className="font-black text-base" {...cms(edit, `coverage.regions.${i}.name`)}>{region.name}</h3>
              </div>
              <ul className="space-y-1.5 flex-1 mb-6" {...cms(edit, `coverage.regions.${i}.cities`)}>
                {region.cities.map((city, j) => (
                  <li key={`${j}-${city.name}`} className="text-sm">
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
              <div className="flex gap-2">
                {region.cargoSlug && (
                  <Link
                    href={`/cargo/${region.cargoSlug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <ArrowRight size={14} />
                    Cek Harga
                  </Link>
                )}
                <WALink
                  href={buildServiceMessage(`Pengiriman ke ${region.name}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-2.5 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={14} />
                  Chat WA
                </WALink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
