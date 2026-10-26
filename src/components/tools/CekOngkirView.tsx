import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { CekOngkirForm } from "@/components/CekOngkirForm";
import { CekOngkirExample } from "@/components/tools/CekOngkirExample";
import { cms } from "@/components/home/cms";
import type { CekOngkirContent, CekOngkirSection } from "@/lib/sitePages/cekOngkir";
import { InfoCards, Sec, ToolHero } from "./ToolHero";

export function CekOngkirView({ content, edit }: { content: CekOngkirContent; edit?: boolean }) {
  const blocks: Record<Exclude<CekOngkirSection, "hero">, React.ReactNode> = {
    calculator: (
      <>
        <CekOngkirForm />
        <CekOngkirExample />
      </>
    ),
    routes: content.routes.items.length > 0 && (
      <div className="mt-8 mb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3" {...cms(edit, "routes.label")}>
          {content.routes.label}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {content.routes.items.map((r, i) => (
            <Link
              key={`${r.slug}-${i}`}
              href={r.slug ? `/cargo/${r.slug}` : "/cargo"}
              className="group bg-white rounded-xl border border-gray-100 hover:border-[#CC1F2A]/40 hover:shadow-md p-4 transition-all flex flex-col gap-1.5"
              {...cms(edit, `routes.items.${i}`)}
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
    ),
    infoCards: content.infoCards.items.length > 0 && (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCards items={content.infoCards.items} path="infoCards.items" edit={edit} />
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sec edit={edit} id="hero">
        <ToolHero icon={Calculator} hero={content.hero} maxWidth="max-w-3xl" edit={edit} />
      </Sec>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {content.order
          .filter((k): k is Exclude<CekOngkirSection, "hero"> => k !== "hero" && !content.hidden.includes(k))
          .map((k) => (
            <Sec key={k} edit={edit} id={k}>
              {blocks[k]}
            </Sec>
          ))}
      </div>
    </div>
  );
}
