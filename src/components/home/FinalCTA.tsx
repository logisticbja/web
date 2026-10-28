import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { buildGeneralMessage, WA_PHONE, WA_PHONE_RAW } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import type { FinalCtaContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

export function FinalCTA({ content, edit }: { content: FinalCtaContent } & EditProps) {
  return (
    <section className="py-20 bg-[#CC1F2A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #F5C518 0%, transparent 60%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)",
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {content.badge && (
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/20 border border-[#F5C518]/40 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-sm font-semibold" {...cms(edit, "finalCta.badge")}>{content.badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight" {...cms(edit, "finalCta.title")}>
          {content.title}
          {content.titleAccent && <br />}
          {content.titleAccent && (
            <span className="text-[#F5C518]" {...cms(edit, "finalCta.titleAccent")}>{content.titleAccent}</span>
          )}
        </h2>

        {content.description && (
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto" {...cms(edit, "finalCta.description")}>
            {content.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <WALink
            href={buildGeneralMessage()}
            className="flex items-center justify-center gap-3 bg-[#15803D] hover:bg-[#166534] text-white font-black text-lg px-10 py-4 rounded-2xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
            {...cms(edit, "finalCta.waLabel")}
          >
            <MessageCircle size={22} />
            {content.waLabel}
            <ArrowRight size={18} />
          </WALink>
          <a
            href={`tel:+${WA_PHONE_RAW}`}
            className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all"
          >
            <Phone size={20} />
            {WA_PHONE}
          </a>
        </div>

        {content.hours && (
          <p className="text-white/60 text-sm mt-8" {...cms(edit, "finalCta.hours")}>
            {content.hours}
          </p>
        )}
      </div>
    </section>
  );
}
