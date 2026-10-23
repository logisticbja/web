import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { cms } from "@/components/home/cms";
import type { PageHeroContent } from "@/lib/pageHero";
import { cekOngkirContent } from "@/lib/toolPages";
import { heroBadges, InfoCards, ToolHero } from "./ToolHero";

const DEFAULT_BADGES = ["Regular: min. 100 kg", "Express: min. 100 kg"];

export function CekOngkirView({ hero, edit }: { hero: PageHeroContent | null; edit?: boolean }) {
  const content = cekOngkirContent(hero);
  const badges = heroBadges(hero, ": ");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ToolHero
        icon={Calculator}
        hero={hero}
        defaultTagline="Kalkulator Ongkir"
        defaultDescription="Hitung estimasi biaya pengiriman ke Papua & Indonesia Timur dalam detik"
        defaultAlt="Cek Ongkir"
        badges={badges.length > 0 ? badges : DEFAULT_BADGES}
        maxWidth="max-w-3xl"
        edit={edit}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <CekOngkirForm />

        {content.routes.length > 0 && (
          <div className="mt-8 mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3" {...cms(edit, "content.routesLabel")}>
              {content.routesLabel}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {content.routes.map((r, i) => (
                <Link
                  key={`${r.slug}-${i}`}
                  href={`/cargo/${r.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 hover:border-[#CC1F2A]/40 hover:shadow-md p-4 transition-all flex flex-col gap-1.5"
                  {...cms(edit, `content.routes.${i}`)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#111] text-sm">{r.label}</span>
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-[#CC1F2A] transition-colors" />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">{r.cities}</p>
                  {r.badge && (
                    <span className="text-[10px] font-bold text-[#CC1F2A] bg-red-50 px-2 py-0.5 rounded-full self-start mt-auto">
                      {r.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {content.infoCards.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCards items={content.infoCards} path="content.infoCards" edit={edit} />
          </div>
        )}
      </div>
    </div>
  );
}
