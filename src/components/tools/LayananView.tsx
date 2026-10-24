import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, CheckCircle } from "lucide-react";
import { cms } from "@/components/home/cms";
import type { LayananContent } from "@/lib/sitePages/layanan";
import { Sec, TOOL_ICONS } from "./ToolHero";

export function LayananView({ content, edit }: { content: LayananContent; edit?: boolean }) {
  const { hero, services } = content;
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sec edit={edit} id="hero">
        <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[428px] flex items-end w-full overflow-hidden" {...cms(edit, "hero.image")}>
          {hero.image && (
            <>
              <div className="absolute inset-0">
                <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover" unoptimized={edit} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            </>
          )}
          <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-12 w-full min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <ChevronRight size={13} />
              <span className="text-white font-semibold" {...cms(edit, "hero.breadcrumb")}>{hero.breadcrumb}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 max-w-xl" {...cms(edit, "hero.title")}>
              {hero.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-lg leading-relaxed" {...cms(edit, "hero.description")}>
              {hero.description}
            </p>
          </div>
        </div>
      </Sec>

      <Sec edit={edit} id="services">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {services.items.map((s, i) => {
              const Icon = TOOL_ICONS[s.icon] ?? CheckCircle;
              return (
                <Link
                  key={`${s.slug}-${i}`}
                  href={s.slug ? `/layanan/${s.slug}` : "/layanan/kirim-barang-kargo"}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#CC1F2A]/30 transition-all p-6 flex flex-col"
                  {...cms(edit, `services.items.${i}`)}
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#CC1F2A]" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900 mb-1">{s.name}</h2>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{s.tagline}</p>

                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-4">
                    <span>{s.price}</span>
                    <span>{s.eta}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#CC1F2A] group-hover:gap-2.5 transition-all">
                    {services.linkLabel}
                    <ArrowRight size={15} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </Sec>
    </div>
  );
}
