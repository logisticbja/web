import type { WhyUsContent } from "@/lib/homepage/types";
import { cms, HOME_ICONS, type EditProps } from "./cms";

export function WhyUs({ content, edit }: { content: WhyUsContent } & EditProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "whyUs.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "whyUs.title")}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto" {...cms(edit, "whyUs.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((r, i) => {
            const Icon = HOME_ICONS[r.icon] ?? HOME_ICONS.CheckCircle;
            return (
              <div key={`${i}-${r.title}`} className="flex gap-4" {...cms(edit, `whyUs.items.${i}`)}>
                <div className="w-12 h-12 rounded-xl bg-[#CC1F2A] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-[#111111] text-lg mb-1.5" {...cms(edit, `whyUs.items.${i}.title`)}>{r.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed" {...cms(edit, `whyUs.items.${i}.desc`)}>{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
