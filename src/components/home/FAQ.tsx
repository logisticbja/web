"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

export function FAQ({ content, edit }: { content: FaqContent } & EditProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {content.eyebrow && (
            <p className="text-[#CC1F2A] font-bold text-sm uppercase tracking-wider mb-2" {...cms(edit, "faq.eyebrow")}>{content.eyebrow}</p>
          )}
          <h2 className="text-3xl lg:text-4xl font-black text-[#111111]" {...cms(edit, "faq.title")}>
            {content.title}
          </h2>
        </div>

        <div className="space-y-3">
          {content.items.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden" {...cms(edit, `faq.items.${i}`)}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-[#111111] pr-4" {...cms(edit, `faq.items.${i}.q`)}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-gray-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4" {...cms(edit, `faq.items.${i}.a`)}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
