import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";

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
import { buildGeneralMessage, buildCorporateMessage, WA_PHONE, WA_PHONE_RAW } from "@/lib/whatsapp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi BJA Logistic via WhatsApp, telepon, atau kunjungi kantor kami. Siap melayani pengiriman ke Papua & Indonesia Timur.",
};

const offices = [
  {
    name: "Kantor Pusat — Surabaya",
    address: "Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan, Surabaya 60177",
    type: "Kantor Operasional & Gudang",
    mapsUrl: "https://www.google.com/maps/place/BJA+Logistic/@-7.2285461,112.7200165,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7f9bad78ff50b:0xde7d0ef09506ab57!8m2!3d-7.2285461!4d112.7225914!16s%2Fg%2F11hsx6s5g7",
  },
  {
    name: "Cabang Jakarta",
    address: "Ruko Grand Galaxy, Jl. Rose Garden 1 No. 33, Jaka Setia, Bekasi Selatan",
    type: "Kantor Perwakilan & Pickup Point",
    mapsUrl: "https://www.google.com/maps/place/BJA+Logistic/@-6.2689044,106.9726877,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698d000e04fbd5:0x9ab27113fe6d1c4d!8m2!3d-6.2689044!4d106.9752626!16s%2Fg%2F11wy0nytrb",
  },
];

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#CC1F2A] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Hubungi Kami</h1>
          <p className="text-white/70 text-lg">
            Tim kami siap membantu Anda — via WhatsApp, telepon, atau email
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact options */}
          <div className="space-y-5">
            <h2 className="text-xl font-black text-[#111111]">Cara Menghubungi Kami</h2>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-[#111111]">WhatsApp</p>
                  <p className="text-sm text-gray-500">Respon tercepat</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Chat langsung dengan tim kami via WhatsApp untuk cek ongkir, pemesanan, tracking, dan pertanyaan lainnya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={buildGeneralMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc59] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  Chat Sekarang
                </a>
                <a
                  href={buildCorporateMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Kerjasama Corporate
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#CC1F2A] flex items-center justify-center">
                  <Phone size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-[#111111]">Telepon</p>
                  <p className="text-sm text-gray-500">{WA_PHONE}</p>
                </div>
              </div>
              <a
                href={`tel:+${WA_PHONE_RAW}`}
                className="flex items-center justify-center gap-2 bg-[#CC1F2A] hover:bg-[#1A1A1A] text-white font-bold py-3 rounded-xl transition-colors text-sm w-full"
              >
                <Phone size={16} />
                Telepon Sekarang
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock size={22} className="text-[#D4A910]" />
                </div>
                <p className="font-black text-[#111111]">Jam Operasional</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Senin – Jumat</span>
                  <span className="font-semibold">08.00 – 20.00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="font-semibold">08.00 – 17.00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu & Libur</span>
                  <span className="text-orange-500 font-semibold">Via WA saja</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="font-black text-[#111111] mb-4">Ikuti Kami</p>
              <div className="flex gap-3">
                <a href="https://instagram.com/bja_logistic" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-pink-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors">
                  <IconInstagram size={16} />
                  @bja_logistic
                </a>
                <a href="https://facebook.com/BJALogistick" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-blue-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                  <IconFacebook size={16} />
                  BJA Logistick
                </a>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div>
            <h2 className="text-xl font-black text-[#111111] mb-5">Lokasi Kantor Kami</h2>
            <div className="space-y-4">
              {offices.map((office) => (
                <a
                  key={office.name}
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#CC1F2A]/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#CC1F2A]" />
                    </div>
                    <div>
                      <p className="font-black text-[#111111] mb-0.5">{office.name}</p>
                      <p className="text-xs text-[#CC1F2A] font-semibold mb-2">{office.type}</p>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Corporate box */}
            <div className="mt-6 bg-gradient-to-br from-[#CC1F2A] to-[#A01820] rounded-2xl p-7 text-white">
              <h3 className="text-xl font-black mb-2">Tertarik Kerjasama Corporate?</h3>
              <p className="text-white/70 text-sm mb-5">
                Dapatkan harga khusus, diskon volume, asuransi pengiriman, dan layanan dedicated team untuk bisnis Anda.
              </p>
              <ul className="space-y-2 mb-5 text-sm text-white/70">
                {[
                  "Harga kontrak khusus",
                  "Tim dedicated & account manager",
                  "Laporan pengiriman bulanan",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={buildCorporateMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-3 rounded-xl transition-colors text-sm w-full"
              >
                <MessageCircle size={16} />
                Hubungi untuk Kerjasama
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
