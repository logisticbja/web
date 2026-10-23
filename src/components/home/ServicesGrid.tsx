import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WAButton } from "@/components/ui/WAButton";
import { buildServiceMessage, buildCorporateMessage } from "@/lib/whatsapp";
import type { ServicesContent } from "@/lib/homepage/types";
import { cms, HOME_ICONS, type EditProps } from "./cms";

export function ServicesGrid({ content, edit }: { content: ServicesContent } & EditProps) {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "services.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "services.title")}>
            {content.title}
            {content.titleAccent ? " " : null}
            {content.titleAccent ? (
              <span className="text-[#CC1F2A]" {...cms(edit, "services.titleAccent")}>{content.titleAccent}</span>
            ) : null}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto" {...cms(edit, "services.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((service, i) => {
            const Icon = HOME_ICONS[service.icon] ?? HOME_ICONS.Package;
            const key = `${i}-${service.id || service.name}`;

            if (service.variant === "corporate") {
              return (
                <div
                  key={key}
                  className="bg-[#1A1A1A] rounded-2xl p-6 shadow-xl border border-[#F5C518]/20 hover:border-[#F5C518]/60 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                  {...cms(edit, `services.items.${i}`)}
                >
                  {/* Background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5C518]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-black bg-[#F5C518] text-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Eksklusif
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#F5C518]/15 flex items-center justify-center mb-4 group-hover:bg-[#F5C518]/25 transition-colors">
                    <Icon size={26} className="text-[#F5C518]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-white mb-2" {...cms(edit, `services.items.${i}.name`)}>{service.name}</h3>
                  <p className="text-white/55 text-sm mb-4 leading-relaxed" {...cms(edit, `services.items.${i}.description`)}>{service.description}</p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5" {...cms(edit, `services.items.${i}.highlights`)}>
                    {service.highlights.map((h, j) => (
                      <li key={`${j}-${h}`} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={buildCorporateMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-black py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle size={15} />
                    Hubungi Tim Corporate
                  </a>
                </div>
              );
            }

            return (
              <div
                key={key}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group"
                {...cms(edit, `services.items.${i}`)}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center mb-4 group-hover:bg-[#CC1F2A] transition-colors">
                  <Icon size={26} className="text-[#CC1F2A] group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-black text-[#111111] mb-2" {...cms(edit, `services.items.${i}.name`)}>{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed" {...cms(edit, `services.items.${i}.description`)}>{service.description}</p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5" {...cms(edit, `services.items.${i}.highlights`)}>
                  {service.highlights.map((h, j) => (
                    <li key={`${j}-${h}`} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex gap-2">
                  <WAButton
                    href={buildServiceMessage(service.waService || service.name)}
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
