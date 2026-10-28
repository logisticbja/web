import Image from "next/image";
import type { ClientsContent } from "@/lib/homepage/types";
import { cms, type EditProps } from "./cms";

export function ClientLogos({ content, edit }: { content: ClientsContent } & EditProps) {
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {content.eyebrow && (
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2" {...cms(edit, "clients.eyebrow")}>
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-black text-[#111111]" {...cms(edit, "clients.title")}>
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
          {content.logos.map((client, i) => (
            <div
              key={`${i}-${client.name}`}
              className="bg-white rounded-xl px-3 py-4 sm:px-5 sm:py-5 shadow-sm border border-gray-100 hover:border-[#CC1F2A]/30 hover:shadow-md transition-all flex items-center justify-center"
              style={{ minHeight: 72 }}
              {...cms(edit, `clients.logos.${i}`)}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={client.width}
                height={client.height}
                sizes="160px"
                className="object-contain max-h-10 sm:max-h-12 w-auto"
                {...(edit ? { unoptimized: true } : {})}
              />
            </div>
          ))}
        </div>

        {content.footnote && (
          <p className="text-center text-xs text-gray-400" {...cms(edit, "clients.footnote")}>{content.footnote}</p>
        )}
      </div>
    </section>
  );
}
