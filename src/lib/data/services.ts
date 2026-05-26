export interface Service {
  id: string;
  name: string;
  description: string;
  priceFrom: string;
  eta: string;
  icon: string;
  href: string;
  waService: string;
  highlights: string[];
}

export const services: Service[] = [
  {
    id: "cargo-laut",
    name: "Cargo Laut",
    description: "Pengiriman cargo via kapal ke Papua, Maluku, NTT & Sulawesi — solusi ekonomis untuk muatan besar",
    priceFrom: "Rp 6.000/kg",
    eta: "14–20 hari",
    icon: "Ship",
    href: "/layanan/cargo-laut",
    waService: "Cargo Laut",
    highlights: ["Kapal Roro & PELNI", "Cocok untuk barang besar", "Tracking real-time"],
  },
  {
    id: "cargo-darat",
    name: "Cargo Darat",
    description: "Jaringan truk door-to-door ke Sulawesi dan area yang terjangkau jalur darat dari pelabuhan tujuan",
    priceFrom: "Rp 7.000/kg",
    eta: "7–14 hari",
    icon: "Truck",
    href: "/layanan/cargo-darat",
    waService: "Cargo Darat",
    highlights: ["Armada sendiri", "Door to door", "Terpercaya"],
  },
  {
    id: "cargo-udara",
    name: "Cargo Udara",
    description: "Layanan ekspres via pesawat untuk pengiriman mendesak ke kota-kota besar Indonesia Timur",
    priceFrom: "Rp 20.000/kg",
    eta: "2–4 hari",
    icon: "Plane",
    href: "/layanan/cargo-udara",
    waService: "Cargo Udara",
    highlights: ["Paling cepat", "Aman & terlacak", "Cocok untuk urgent"],
  },
  {
    id: "kirim-motor",
    name: "Kirim Motor",
    description: "Pengiriman sepeda motor dengan penanganan khusus ke Papua, Maluku, NTT & Sulawesi",
    priceFrom: "Hubungi kami",
    eta: "Sesuai rute",
    icon: "Bike",
    href: "/layanan/kirim-motor",
    waService: "Kirim Motor",
    highlights: ["Dikemas aman", "Asuransi tersedia", "Door to door"],
  },
  {
    id: "kirim-mobil",
    name: "Kirim Mobil",
    description: "Pengiriman kendaraan roda empat dengan penanganan khusus ke Indonesia Timur",
    priceFrom: "Hubungi kami",
    eta: "Sesuai rute",
    icon: "Car",
    href: "/layanan/kirim-mobil",
    waService: "Kirim Mobil",
    highlights: ["Kendaraan aman", "Survey & asuransi", "Full tracking"],
  },
  {
    id: "corporate",
    name: "Corporate & B2B",
    description: "Harga kontrak khusus dan dedicated AM untuk bisnis dengan kebutuhan pengiriman volume besar",
    priceFrom: "Harga Kontrak",
    eta: "Custom SLA",
    icon: "Building2",
    href: "/kontak",
    waService: "corporate",
    highlights: ["Harga kontrak & diskon volume", "Dedicated account manager", "Laporan pengiriman bulanan"],
  },
];
