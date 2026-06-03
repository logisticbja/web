import { CheckCircle, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { WAButton } from "@/components/ui/WAButton";
import Link from "next/link";

interface Feature {
  title: string;
  desc: string;
}

interface ServicePageLayoutProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  priceFrom: string;
  priceNote: string;
  eta: string;
  waHref: string;
  waLabel: string;
  features: string[];
  details: Feature[];
  relatedServices: { name: string; href: string }[];
}

export function ServicePageLayout({
  icon: Icon,
  title,
  subtitle,
  description,
  priceFrom,
  priceNote,
  eta,
  waHref,
  waLabel,
  features,
  details,
  relatedServices,
}: ServicePageLayoutProps) {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#CC1F2A] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0">
              <Icon size={20} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold mb-0.5">{subtitle}</p>
              <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
            </div>
          </div>
          <p className="text-white/70 text-sm max-w-2xl mb-6">{description}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
            >
              <MessageCircle size={18} />
              {waLabel}
            </a>
            <Link
              href="/cek-ongkir"
              className="flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-bold px-6 py-3.5 rounded-xl transition-all text-base"
            >
              Cek Ongkir <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#111111] mb-5">Keunggulan Layanan</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#111111] mb-5">Detail Layanan</h2>
              <div className="space-y-5">
                {details.map((d) => (
                  <div key={d.title} className="flex gap-3">
                    <div className="w-1.5 rounded-full bg-[#F5C518] shrink-0 mt-1.5" />
                    <div>
                      <p className="font-bold text-[#111111] mb-1">{d.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Pricing card */}
            <div className="bg-[#CC1F2A] rounded-2xl p-6 text-white">
              <p className="text-white/70 text-sm mb-1">Harga Mulai Dari</p>
              <p className="text-3xl font-black mb-1">{priceFrom}</p>
              <p className="text-white/60 text-xs mb-4">{priceNote}</p>
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/20">
                <Clock size={14} className="text-[#F5C518]" />
                <span className="text-sm">Estimasi: <strong>{eta}</strong></span>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-3 rounded-xl transition-colors text-sm w-full"
              >
                <MessageCircle size={16} />
                Pesan Sekarang
              </a>
            </div>

            {/* Related services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="font-bold text-[#111111] mb-4 text-sm">Layanan Lainnya</p>
              <ul className="space-y-2">
                {relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-[#CC1F2A] hover:font-semibold transition-all py-1.5"
                    >
                      {s.name}
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="font-black text-gray-900 mb-2">Butuh Bantuan?</p>
              <p className="text-sm text-gray-600 mb-4">Tim kami siap membantu 7 hari seminggu</p>
              <WAButton href={waHref} label="Chat CS Sekarang" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
