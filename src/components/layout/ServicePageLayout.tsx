import { CheckCircle, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { WAButton } from "@/components/ui/WAButton";
import Link from "next/link";
import Image from "next/image";
import { sanitizeRichText } from "@/lib/safeHtml";

interface Feature {
  title: string;
  desc: string;
}

interface ServicePageLayoutProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  // Gambar banner (opsional) — kalau diisi, jadi background hero full-bleed
  // dengan overlay gelap, ukuran & gaya disamakan dengan hero /cargo/{region}.
  // Kalau kosong, hero tetap gradient merah polos seperti sebelumnya.
  imageBanner?: string;
  description: string;
  priceFrom: string;
  priceNote: string;
  eta: string;
  waHref: string;
  waLabel: string;
  features: string[];
  details: Feature[];
  relatedServices: { name: string; href: string }[];
  rateSection?: React.ReactNode;
  edit?: boolean;
}

function cms(edit: boolean | undefined, path: string): { "data-cms"?: string } {
  return edit ? { "data-cms": path } : {};
}

export function ServicePageLayout({
  icon: Icon,
  title,
  subtitle,
  imageBanner,
  description,
  priceFrom,
  priceNote,
  eta,
  waHref,
  waLabel,
  features,
  details,
  relatedServices,
  rateSection,
  edit,
}: ServicePageLayoutProps) {
  return (
    <div>
      {/* Hero — ukuran & gaya disamakan PERSIS dengan hero /cargo/{region} (lihat
          app/cargo/[region]/page.tsx): min-height sama, padding sama, gradient
          overlay sama, biar konsisten di seluruh situs. */}
      <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[300px] sm:min-h-[428px] flex items-end w-full" {...cms(edit, "imageBanner")}>
        {imageBanner && (
          <>
                                <div className="absolute inset-0 overflow-hidden">
              <Image
                src={imageBanner}
                alt={`Banner ${title}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                {...(edit ? { unoptimized: true } : {})}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          </>
        )}
        <div className="relative max-w-5xl mx-auto px-4 py-10 sm:py-12 w-full min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#F5C518] flex items-center justify-center shrink-0" {...cms(edit, "icon")}>
              <Icon size={22} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-semibold mb-0.5" {...cms(edit, "subtitle")}>{subtitle}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white" {...cms(edit, "title")}>{title}</h1>
            </div>
          </div>
          {/* Deskripsi disimpan sebagai HTML (dari editor teks di CRM) — pakai
              dangerouslySetInnerHTML supaya tag-nya dirender, bukan tampil mentah.
              Konten ini cuma diisi lewat CRM oleh tim BJA sendiri, bukan input publik. */}
          <div
            className="text-white/70 text-sm sm:text-base max-w-2xl mb-6 leading-relaxed [&_p]:mb-0"
            {...cms(edit, "description")}
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(description) }}
          />

          <div className="flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] text-white font-black px-6 py-3.5 rounded-xl transition-all hover:shadow-lg text-base"
              {...cms(edit, "waLabel")}
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
            {rateSection}
            {/* Features */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#111111] mb-5">Keunggulan Layanan</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <li key={`${i}-${f}`} className="flex items-start gap-2.5" {...cms(edit, `features.${i}`)}>
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
                {details.map((d, i) => (
                  <div key={`${i}-${d.title}`} className="flex gap-3" {...cms(edit, `details.${i}`)}>
                    <div className="w-1.5 rounded-full bg-[#F5C518] shrink-0 mt-1.5" />
                    <div>
                      <p className="font-bold text-[#111111] mb-1" {...cms(edit, `details.${i}.title`)}>{d.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed" {...cms(edit, `details.${i}.desc`)}>{d.desc}</p>
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
              <p className="text-3xl font-black mb-1" {...cms(edit, "priceFrom")}>{priceFrom}</p>
              <p className="text-white/60 text-xs mb-4" {...cms(edit, "priceNote")}>{priceNote}</p>
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/20" {...cms(edit, "eta")}>
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
                {relatedServices.map((s, i) => (
                  <li key={`${i}-${s.href}`} {...cms(edit, `relatedServices.${i}`)}>
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
