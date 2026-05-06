import { Metadata } from "next";
import { Bike } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildVehicleMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Kirim Motor ke Papua",
  description: "Layanan pengiriman sepeda motor ke Papua & Indonesia Timur. Aman, terlindungi asuransi. Hubungi BJA Logistic.",
};

export default function KirimMotorPage() {
  return (
    <ServicePageLayout
      icon={Bike}
      title="Kirim Motor ke Papua & Indonesia Timur"
      subtitle="Pengiriman Kendaraan Roda Dua"
      description="Layanan khusus pengiriman sepeda motor yang aman dan terpercaya ke seluruh Papua, Maluku, NTT, dan Sulawesi. Motor Anda aman di tangan kami."
      priceFrom="Hubungi Kami"
      priceNote="Harga tergantung jenis motor & rute tujuan"
      eta="Sesuai rute"
      waHref={buildVehicleMessage("motor")}
      waLabel="Tanya Kirim Motor"
      features={[
        "Packing standar kendaraan",
        "Asuransi pengiriman tersedia",
        "Semua jenis motor dilayani",
        "Tracking pengiriman",
        "Door to door tersedia",
        "Tim berpengalaman",
        "Survey kondisi motor sebelum kirim",
        "Dokumentasi foto sebelum & sesudah",
      ]}
      details={[
        {
          title: "Jenis Motor yang Dilayani",
          desc: "Semua jenis sepeda motor: motor bebek, matic, sport, trail, motor listrik, dan motor besar (moge). Kondisi: bisa berjalan maupun tidak bisa berjalan (dengan biaya tambahan).",
        },
        {
          title: "Proses Pengiriman Motor",
          desc: "Survey kondisi & foto motor → packing aman dengan cover dan pengaman → muat ke kapal/truk → pengiriman ke tujuan → serah terima dengan dokumentasi foto.",
        },
        {
          title: "Packing & Perlindungan",
          desc: "Motor dikemas dengan bubble wrap, cover khusus, dan pengaman tambahan untuk menghindari goresan dan kerusakan selama perjalanan laut/darat.",
        },
        {
          title: "Dokumen yang Dibutuhkan",
          desc: "STNK motor (wajib), KTP pemilik, dan form pengiriman dari BJA Logistic. Tanpa STNK, motor tidak bisa dikirim.",
        },
        {
          title: "Estimasi Harga",
          desc: "Harga kirim motor tergantung jenis motor, rute tujuan, dan layanan yang dipilih (laut/darat/udara). Hubungi CS kami untuk penawaran terbaik.",
        },
      ]}
      relatedServices={[
        { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
        { name: "Cargo Laut", href: "/layanan/cargo-laut" },
        { name: "Cargo Darat", href: "/layanan/cargo-darat" },
        { name: "Project Logistics", href: "/kontak" },
      ]}
    />
  );
}
