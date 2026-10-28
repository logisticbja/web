"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ExpandableHtml({
  html,
  className,
  collapse = true,
  ...rest
}: { html: string; className?: string; collapse?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const clamp = collapse && !open;
  return (
    <div className="relative">
      <div
        {...rest}
        className={`${className ?? ""} ${clamp ? "max-h-[420px] overflow-hidden sm:max-h-none sm:overflow-visible" : ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {clamp && (
        <div className="sm:hidden absolute inset-x-0 bottom-0 flex justify-center rounded-b-2xl bg-gradient-to-t from-white via-white/95 to-transparent pt-16 pb-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#CC1F2A] shadow-sm"
          >
            Baca selengkapnya <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
