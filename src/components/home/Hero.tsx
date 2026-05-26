import Image from "next/image";
import Link from "next/link";
import { MessageCircle, CheckCircle, Calculator, Ship, MapPin, Building2, ChevronDown } from "lucide-react";
import { buildGeneralMessage, buildCorporateMessage } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { TrackingInput } from "@/components/ui/TrackingInput";

const quickLinks = [
  { icon: Calculator, label: "Cek Ongkir", href: "/cek-ongkir", external: false },
  { icon: Ship, label: "Jadwal Kapal", href: "/jadwal-kapal", external: false },
  { icon: MapPin, label: "Track Resi", href: "/tracking", external: false },
];

const trustBadges = [
  "10+ Tahun Pengalaman",
  "50+ Kota Tujuan",
  "Indomaret & BNI Percaya Kami",
  "98% Tepat Waktu",
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero-bg.jpg"
        alt="Pelabuhan cargo Indonesia"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay — left heavy for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-[#CC1F2A]/50" />

      {/* Subtle red bottom bar accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#CC1F2A]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/20 border border-[#F5C518]/40 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-sm font-semibold">
              #1 Ekspedisi Papua & Indonesia Timur
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
            Kirim Cargo ke{" "}
            <span className="text-[#F5C518]">Papua</span> &{" "}
            <span className="text-[#F5C518]">Indonesia Timur</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">Cepat, Aman & Terjangkau</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/75 text-lg sm:text-xl mb-6 leading-relaxed">
            Mulai <strong className="text-white">Rp 6.000/kg</strong> &nbsp;·&nbsp; Door to Door Jabodetabek &nbsp;·&nbsp; Kapal Roro, PELNI & Pesawat
          </p>

          {/* Tracking input */}
          <div className="mb-8">
            <TrackingInput />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <WALink
              href={buildGeneralMessage()}
              className="btn-primary text-base sm:text-lg px-7 py-4 rounded-xl shadow-2xl"
            >
              <MessageCircle size={20} />
              Cek Ongkir via WhatsApp
            </WALink>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <CheckCircle size={14} className="text-[#F5C518] shrink-0" />
                <span className="text-white text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>

          {/* Quick intent shortcuts */}
          <div className="flex items-center gap-1 flex-wrap pt-5 border-t border-white/15">
            <span className="text-white/35 text-xs mr-2 shrink-0">Langsung ke:</span>
            {quickLinks.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/20 text-sm mx-1">·</span>}
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-white/65 hover:text-[#F5C518] text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <item.icon size={13} />
                  {item.label}
                </Link>
              </span>
            ))}

            {/* Corporate — visually distinct */}
            <span className="text-white/20 text-sm mx-1">·</span>
            <WALink
              href={buildCorporateMessage()}
              conversion="waCorporate"
              className="flex items-center gap-1.5 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] text-xs font-black px-3 py-1.5 rounded-lg transition-colors"
            >
              <Building2 size={12} />
              Corporate
            </WALink>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
