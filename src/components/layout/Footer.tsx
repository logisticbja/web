import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { buildGeneralMessage, WA_PHONE } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconTiktok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
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
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-putih-bja.webp"
                alt="BJA Logistic"
                width={497}
                height={80}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Solusi logistik terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Cepat, aman, dan harga kompetitif sejak lebih dari 10 tahun.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/bjalogisticofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram BJA Logistic"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5C518] hover:text-[#1A1A1A] flex items-center justify-center transition-colors">
                <IconInstagram size={16} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592894893288" target="_blank" rel="noopener noreferrer" aria-label="Facebook BJA Logistic"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5C518] hover:text-[#1A1A1A] flex items-center justify-center transition-colors">
                <IconFacebook size={16} />
              </a>
              <a href="https://www.tiktok.com/@bjalogistic" target="_blank" rel="noopener noreferrer" aria-label="TikTok BJA Logistic"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#F5C518] hover:text-[#1A1A1A] flex items-center justify-center transition-colors">
                <IconTiktok size={16} />
              </a>
              <WALink href={buildGeneralMessage()} aria-label="WhatsApp BJA Logistic"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#CC1F2A] flex items-center justify-center transition-colors">
                <MessageCircle size={16} />
              </WALink>
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
                  <Link href={href} prefetch={false} className="text-gray-400 hover:text-white text-sm transition-colors">
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
                ["Jadwal Kapal", "/jadwal-kapal"],
                ["Cek Ongkir", "/cek-ongkir"],
                ["Cek Resi", "/cek-resi"],
                ["Blog", "/blog"],
                ["Kontak", "/kontak"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} prefetch={false} className="text-gray-400 hover:text-white text-sm transition-colors">
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
                  <Phone size={16} className="mt-0.5 shrink-0 text-[#F5C518]" />
                  <span className="text-sm">{WA_PHONE}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#F5C518]" />
                  <div className="text-sm space-y-3">
                    <p>
                      <span className="text-white font-semibold">Surabaya (Pusat)</span><br />
                      <a href="https://www.google.com/maps/place/BJA+Logistic/@-7.2285461,112.7200165,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7f9bad78ff50b:0xde7d0ef09506ab57!8m2!3d-7.2285461!4d112.7225914!16s%2Fg%2F11hsx6s5g7" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
                        Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan
                      </a>
                    </p>
                    <p>
                      <span className="text-white font-semibold">Jakarta</span><br />
                      <a href="https://www.google.com/maps/place/BJA+Logistic/@-6.2689044,106.9726877,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698d000e04fbd5:0x9ab27113fe6d1c4d!8m2!3d-6.2689044!4d106.9752626!16s%2Fg%2F11wy0nytrb" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
                        Ruko Grand Galaxy, Jl. Rose Garden 1 No. 33, Bekasi Selatan
                      </a>
                    </p>
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
            <Link href="/privacy" prefetch={false} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" prefetch={false} className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
