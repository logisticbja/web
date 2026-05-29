import { Metadata } from "next";
import { Car } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildVehicleMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kirim Mobil ke Papua & Indonesia Timur — Penanganan Khusus",
  description: "Jasa kirim mobil ke Papua, Maluku, NTT & Sulawesi. Semua jenis kendaraan diterima, asuransi wajib, penanganan profesional. Hubungi BJA Logistic untuk info harga.",
  keywords: ["kirim mobil ke papua", "ekspedisi mobil papua", "jasa kirim mobil indonesia timur", "cargo mobil papua", "pengiriman kendaraan papua"],
  alternates: { canonical: "https://bjalogistic.id/layanan/kirim-mobil" },
  openGraph: {
    title: "Kirim Mobil ke Papua & Indonesia Timur — BJA Logistic",
    description: "Jasa kirim mobil ke Papua, Maluku, NTT & Sulawesi. Semua jenis kendaraan, asuransi wajib, penanganan profesional.",
    url: "https://bjalogistic.id/layanan/kirim-mobil",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function KirimMobilPage() {
  return (
    <ServicePageLayout
      icon={Car}
      title="Kirim Mobil ke Papua & Indonesia Timur"
      subtitle="Pengiriman Kendaraan Roda Empat"
      description="Layanan khusus pengiriman mobil dan kendaraan roda empat ke Papua dan seluruh Indonesia Timur. Aman, bergaransi, dengan asuransi pengiriman."
      priceFrom="Hubungi Kami"
      priceNote="Harga tergantung jenis & ukuran mobil serta rute"
      eta="Sesuai rute"
      waHref={buildVehicleMessage("mobil")}
      waLabel="Tanya Kirim Mobil"
      features={[
        "Semua jenis mobil dilayani",
        "Asuransi pengiriman wajib",
        "Survey & dokumentasi lengkap",
        "Tracking perjalanan",
        "Kendaraan terlindungi penuh",
        "Tim khusus kendaraan",
        "Foto kondisi sebelum & sesudah",
        "Pengalaman 10+ tahun",
      ]}
      details={[
        {
          title: "Jenis Kendaraan yang Dilayani",
          desc: "Sedan, SUV, MPV, pickup, truk kecil, bus kecil, minibus, dan kendaraan niaga. Untuk kendaraan alat berat, silakan lihat layanan Project Logistics.",
        },
        {
          title: "Proses Pengiriman Mobil",
          desc: "Survey & foto kondisi mobil → pengurusan dokumen → mobilisasi ke pelabuhan → muat ke kapal Roro/container → pengiriman → serah terima di pelabuhan tujuan.",
        },
        {
          title: "Keamanan & Asuransi",
          desc: "Setiap pengiriman mobil dilindungi asuransi transportasi. Survey kondisi dilakukan sebelum dan sesudah pengiriman dengan dokumentasi foto lengkap.",
        },
        {
          title: "Dokumen yang Dibutuhkan",
          desc: "STNK kendaraan, KTP pemilik, surat kuasa jika dikuasakan, dan form pengiriman BJA. Pastikan pajak kendaraan masih aktif.",
        },
        {
          title: "Metode Pengiriman",
          desc: "Pengiriman mobil umumnya via kapal Roro (Roll-on Roll-off) atau kapal container, tergantung rute dan ketersediaan armada. Hubungi kami untuk detail rute spesifik.",
        },
      ]}
      relatedServices={[
        { name: "Kirim Motor", href: "/layanan/kirim-motor" },
        { name: "Cargo Laut", href: "/layanan/cargo-laut" },
        { name: "Project Logistics", href: "/kontak" },
        { name: "Cargo Darat", href: "/layanan/cargo-darat" },
      ]}
    />
  );
}
