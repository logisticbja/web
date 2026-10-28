import { Star, Quote } from "lucide-react";
import type { TestimonialsContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

export function Testimonials({ content, edit }: { content: TestimonialsContent } & EditProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "testimonials.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "testimonials.title")}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-gray-500 text-lg mt-3" {...cms(edit, "testimonials.subtitle")}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="m-swipe grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((t, i) => (
            <div key={`${i}-${t.name}`} className="bg-[#F8FAFC] rounded-2xl p-7 relative border border-gray-100" {...cms(edit, `testimonials.items.${i}`)}>
              <Quote size={32} className="text-[#CC1F2A]/10 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4" {...cms(edit, `testimonials.items.${i}.rating`)}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6" {...cms(edit, `testimonials.items.${i}.text`)}>&quot;{t.text}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#CC1F2A] flex items-center justify-center">
                  <span className="text-white font-black text-sm">{(t.name.trim()[0] ?? "?").toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-bold text-[#111111] text-sm" {...cms(edit, `testimonials.items.${i}.name`)}>{t.name}</p>
                  <p className="text-xs text-gray-500" {...cms(edit, `testimonials.items.${i}.role`)}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
