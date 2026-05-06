import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { buildGeneralMessage, WA_PHONE } from "@/lib/whatsapp";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0f2347] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-putih-bja.webp"
                alt="BJA Logistic"
                width={140}
                height={42}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Solusi logistik terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Cepat, aman, dan harga kompetitif sejak lebih dari 10 tahun.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/bja_logistic" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F97316] flex items-center justify-center transition-colors">
                <IconInstagram size={16} />
              </a>
              <a href="https://facebook.com/BJALogistick" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F97316] flex items-center justify-center transition-colors">
                <IconFacebook size={16} />
              </a>
              <a href={buildGeneralMessage()} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Layanan</h3>
            <ul className="space-y-2.5">
              {[
                ["Cargo Laut", "/layanan/cargo-laut"],
                ["Cargo Darat", "/layanan/cargo-darat"],
                ["Cargo Udara", "/layanan/cargo-udara"],
                ["Kirim Motor", "/layanan/kirim-motor"],
                ["Kirim Mobil", "/layanan/kirim-mobil"],
                ["Project Logistics", "/kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Informasi</h3>
            <ul className="space-y-2.5">
              {[
                ["Cek Ongkir", "/cek-ongkir"],
                ["Tracking Resi", "/tracking"],
                ["Jadwal Kapal", "/jadwal-kapal"],
                ["Tentang Kami", "/kontak"],
                ["Blog", "/blog"],
                ["Kontak", "/kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li>
                <a href={`https://wa.me/6281513335157`} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors">
                  <Phone size={16} className="mt-0.5 shrink-0 text-[#F97316]" />
                  <span className="text-sm">{WA_PHONE}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#F97316]" />
                  <div className="text-sm space-y-3">
                    <p><span className="text-white font-semibold">Surabaya (Pusat)</span><br />
                      Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan</p>
                    <p><span className="text-white font-semibold">Bekasi</span><br />
                      Ruko Grand Galaxy, Jl. Rose Garden 1 No. 33, Bekasi Selatan</p>
                    <p><span className="text-white font-semibold">Papua</span><br />
                      Jl. Timika Belakang, Abepura, Jayapura</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BJA Logistic. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
