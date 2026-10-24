import Image from "next/image";
import {
  Anchor,
  Award,
  Box,
  Globe,
  Users,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Star,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import { cms } from "@/components/home/cms";
import type { InfoCard, SiteHero, SiteIconName } from "@/lib/sitePages/core";

type IconType = React.FC<{ size?: number; className?: string }>;

export const TOOL_ICONS: Record<SiteIconName, IconType> = {
  Ship,
  Truck,
  Zap,
  Plane,
  Package,
  Clock,
  MessageCircle,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Calculator,
  Calendar,
  Phone,
  Star,
  Warehouse,
  Anchor,
  Globe,
  Users,
  Award,
  Box,
};

export function Sec({ edit, id, children }: { edit?: boolean; id: string; children: React.ReactNode }) {
  return edit ? <div data-cms-section={id}>{children}</div> : <>{children}</>;
}

export function ToolHero({
  icon: Icon,
  hero,
  maxWidth,
  edit,
}: {
  icon: IconType;
  hero: SiteHero;
  maxWidth: "max-w-3xl" | "max-w-5xl";
  edit?: boolean;
}) {
  return (
    <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[428px] flex items-center w-full" {...cms(edit, "hero.image")}>
      {hero.image && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="100vw" className="object-cover" unoptimized={edit} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        </>
      )}
      <div className={`relative ${maxWidth} mx-auto text-center px-4 w-full min-w-0`}>
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-5">
          <Icon size={30} className="text-[#1A1A1A]" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3" {...cms(edit, "hero.title")}>
          {hero.title}
        </h1>
        <p className="text-white/70 text-base sm:text-lg" {...cms(edit, "hero.description")}>
          {hero.description}
        </p>
        {hero.badges.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            {hero.badges.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="inline-flex items-center gap-1.5 bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                {...cms(edit, `hero.badges.${i}`)}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function InfoCards({ items, path, edit }: { items: InfoCard[]; path: string; edit?: boolean }) {
  if (items.length === 0) return null;
  return (
    <>
      {items.map((item, i) => {
        const Icon = TOOL_ICONS[item.icon] ?? CheckCircle;
        return (
          <div key={`${item.title}-${i}`} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-3" {...cms(edit, `${path}.${i}`)}>
            <Icon size={20} className="text-[#CC1F2A] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#111111] text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
