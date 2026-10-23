import type { StatsContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

export function StatsBar({ content, edit }: { content: StatsContent } & EditProps) {
  return (
    <section className="bg-[#F5C518] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-yellow-600">
          {content.items.map((stat, i) => (
            <div key={`${i}-${stat.label}`} className="text-center text-[#1A1A1A] px-4 py-2">
              <p className="text-3xl lg:text-4xl font-black" {...cms(edit, `stats.items.${i}.value`)}>{stat.value}</p>
              <p className="font-bold text-sm mt-0.5" {...cms(edit, `stats.items.${i}.label`)}>{stat.label}</p>
              <p className="text-[#1A1A1A]/60 text-xs mt-0.5" {...cms(edit, `stats.items.${i}.sub`)}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
