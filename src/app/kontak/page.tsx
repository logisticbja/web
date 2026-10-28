import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { Metadata } from "next";
import { buildGeneralMessage, buildCorporateMessage, WA_PHONE, WA_PHONE_RAW } from "@/lib/whatsapp";
import { WALink } from "@/components/ui/WALink";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

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

const PAGE_URL = "https://bjalogistic.id/kontak";
const PAGE_TITLE = "Kontak BJA Logistic — Kantor Surabaya & Bekasi | WA 0815-1333-5157";
const PAGE_DESCRIPTION =
  "Hubungi BJA Logistic, ekspedisi cargo ke Papua & Indonesia Timur. Kantor pusat di Surabaya (Perak Barat) dan cabang Jakarta di Bekasi (Grand Galaxy). Chat WhatsApp 0815-1333-5157.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "kontak bja logistic",
    "alamat bja logistic",
    "kantor bja logistic surabaya",
    "kantor bja logistic bekasi",
    "ekspedisi papua surabaya",
    "ekspedisi papua bekasi",
    "ekspedisi indonesia timur jakarta",
    "whatsapp ekspedisi papua",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kontak BJA Logistic — Kantor Surabaya & Bekasi",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak BJA Logistic — Kantor Surabaya & Bekasi",
    description: PAGE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

type OfficeHours = { days: string; time: string }[];

type Office = {
  id: string;
  name: string;
  type: string;
  description: string;
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  address: string;
  lat: number;
  lng: number;
  mapsUrl: string;
  mapQuery: string;
  hours: OfficeHours;
  schemaHours: { dayOfWeek: string | string[]; opens: string; closes: string }[];
};

const offices: Office[] = [
  {
    id: "surabaya",
    name: "Kantor Pusat — Surabaya",
    type: "Kantor Operasional & Gudang",
    description: "Gudang utama dekat Pelabuhan Tanjung Perak. Barang dari Surabaya dan Jawa Timur bisa diantar langsung ke sini.",
    street: "Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan",
    locality: "Surabaya",
    region: "Jawa Timur",
    postalCode: "60177",
    address: "Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan, Surabaya 60177",
    lat: -7.2285461,
    mapQuery: "BJA Logistic, Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan, Surabaya",
    lng: 112.7225914,
    mapsUrl: "https://www.google.com/maps/place/BJA+Logistic/@-7.2285461,112.7200165,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7f9bad78ff50b:0xde7d0ef09506ab57!8m2!3d-7.2285461!4d112.7225914!16s%2Fg%2F11hsx6s5g7",
    hours: [
      { days: "Senin – Jumat", time: "08.00 – 20.00 WIB" },
      { days: "Sabtu", time: "08.00 – 17.00 WIB" },
    ],
    schemaHours: [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
    ],
  },
  {
    id: "bekasi",
    name: "Cabang Jakarta — Bekasi",
    type: "Kantor Perwakilan & Pickup Point",
    description: "Melayani pelanggan Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Barang bisa diantar ke kantor atau kami jemput.",
    street: "Ruko Grand Galaxy City, Jl. Rose Garden 1 No. 33, RT.009/RW.012, Jaka Setia, Kec. Bekasi Selatan",
    locality: "Kota Bekasi",
    region: "Jawa Barat",
    postalCode: "17147",
    address: "Ruko Grand Galaxy City, Jl. Rose Garden 1 No. 33, Jaka Setia, Bekasi Selatan, Kota Bekasi 17147",
    lat: -6.2689044,
    mapQuery: "BJA Logistic, Ruko Grand Galaxy City, Jl. Rose Garden 1 No. 33, Bekasi Selatan",
    lng: 106.9752626,
    mapsUrl: "https://www.google.com/maps/place/BJA+Logistic/@-6.2689044,106.9726877,17z/data=!3m1!4b1!4m6!3m5!1s0x2e698d000e04fbd5:0x9ab27113fe6d1c4d!8m2!3d-6.2689044!4d106.9752626!16s%2Fg%2F11wy0nytrb",
    hours: [
      { days: "Senin – Jumat", time: "09.00 – 17.00 WIB" },
      { days: "Sabtu", time: "09.00 – 13.00 WIB" },
    ],
    schemaHours: [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
  },
];

function KontakJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "id-ID",
    about: { "@id": "https://bjalogistic.id/#business" },
    mainEntity: offices.map((office) => ({
      "@type": "LocalBusiness",
      "@id": `${PAGE_URL}#${office.id}`,
      name: `BJA Logistic ${office.locality}`,
      description: office.description,
      parentOrganization: { "@id": "https://bjalogistic.id/#business" },
      url: PAGE_URL,
      telephone: `+${WA_PHONE_RAW}`,
      priceRange: "$$",
      image: "https://bjalogistic.id/logo-putih-bja.webp",
      address: {
        "@type": "PostalAddress",
        streetAddress: office.street,
        addressLocality: office.locality,
        addressRegion: office.region,
        postalCode: office.postalCode,
        addressCountry: "ID",
      },
      geo: { "@type": "GeoCoordinates", latitude: office.lat, longitude: office.lng },
      hasMap: office.mapsUrl,
      openingHoursSpecification: office.schemaHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        ...h,
      })),
      areaServed: ["Papua", "Maluku", "Nusa Tenggara Timur", "Sulawesi"],
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <KontakJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Beranda", url: "https://bjalogistic.id" },
          { name: "Kontak", url: PAGE_URL },
        ]}
      />

      <div className="relative bg-gradient-to-br from-[#CC1F2A] to-[#8B1219] min-h-[428px] flex items-center w-full">
        <div className="relative max-w-5xl mx-auto text-center px-4 w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">Kontak BJA Logistic</h1>
          <p className="text-white/70 text-base sm:text-lg">
            Tim kami siap membantu Anda — via WhatsApp, telepon, atau datang langsung ke kantor kami di Surabaya dan Bekasi
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-black text-[#111111]">Cara Menghubungi Kami</h2>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#CC1F2A] flex items-center justify-center">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-[#111111]">WhatsApp</p>
                  <p className="text-sm text-gray-500">Respon tercepat</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Chat langsung dengan tim kami via WhatsApp untuk cek ongkir, pemesanan, cek resi, dan pertanyaan lainnya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <WALink
                  href={buildGeneralMessage()}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#CC1F2A] hover:bg-[#A01820] text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  Chat Sekarang
                </WALink>
                <WALink
                  href={buildCorporateMessage()}
                  conversion="waCorporate"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#CC1F2A] text-[#CC1F2A] hover:bg-[#CC1F2A] hover:text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Kerjasama Corporate
                </WALink>
              </div>
            </div>

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

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock size={22} className="text-[#D4A910]" />
                </div>
                <h2 className="font-black text-[#111111]">Jam Operasional</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                {offices.map((office) => (
                  <div key={office.id}>
                    <p className="font-bold text-[#111111] mb-1">{office.locality === "Surabaya" ? "Surabaya" : "Bekasi"}</p>
                    <div className="space-y-1">
                      {office.hours.map((h) => (
                        <div key={h.days} className="flex justify-between">
                          <span>{h.days}</span>
                          <span className="font-semibold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between border-t border-gray-100 pt-3">
                  <span>Minggu & Libur</span>
                  <span className="text-orange-500 font-semibold">Via WA saja</span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="font-black text-[#111111] mb-4">Ikuti Kami</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.instagram.com/bjalogisticofficial/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-pink-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-pink-600 transition-colors">
                  <IconInstagram size={16} />
                  @bjalogisticofficial
                </a>
                <a href="https://facebook.com/BJALogistick" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-blue-400 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                  <IconFacebook size={16} />
                  BJA Logistick
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-black text-[#111111]">Lokasi Kantor Kami</h2>
            <div className="flex-1 flex flex-col gap-5">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className="flex-1 flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <iframe
                    title={`Peta lokasi ${office.name}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&z=16&output=embed`}
                    className="w-full flex-1 min-h-52 border-0 block"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="p-6 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#CC1F2A]/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#CC1F2A]" />
                    </div>
                    <div>
                      <h3 className="font-black text-[#111111] mb-0.5">{office.name}</h3>
                      <p className="text-xs text-[#CC1F2A] font-semibold mb-2">{office.type}</p>
                      <address className="not-italic text-gray-600 text-sm">{office.address}</address>
                      <p className="text-gray-500 text-sm mt-2">{office.description}</p>
                      <a
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[#CC1F2A] hover:text-[#A01820] text-sm font-semibold mt-3"
                      >
                        Buka di Google Maps →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-[#CC1F2A] to-[#A01820] rounded-2xl p-7 lg:p-10 text-white grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center">
          <div>
            <h3 className="text-xl lg:text-2xl font-black mb-2">Tertarik Kerjasama Corporate?</h3>
            <p className="text-white/70 text-sm lg:text-base mb-5">
              Dapatkan harga khusus, diskon volume, asuransi pengiriman, dan layanan dedicated team untuk bisnis Anda.
            </p>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-6 text-sm text-white/70">
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
          </div>
          <WALink
            href={buildCorporateMessage()}
            conversion="waCorporate"
            className="flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-[#D4A910] text-[#1A1A1A] font-bold py-3 lg:py-4 px-8 rounded-xl transition-colors text-sm w-full lg:w-auto whitespace-nowrap"
          >
            <MessageCircle size={16} />
            Hubungi untuk Kerjasama
          </WALink>
        </div>
      </div>
    </div>
  );
}
