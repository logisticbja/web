import { Metadata } from "next";
import { Truck } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { buildServiceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cargo Darat Papua",
  description: "Layanan cargo darat ke Papua & Indonesia Timur via armada truk. Mulai Rp 7.000/kg. Door to door Jabodetabek.",
};

export default function CargoDaratPage() {
  return (
    <ServicePageLayout
      icon={Truck}
      title="Cargo Darat ke Papua & Indonesia Timur"
      subtitle="Seimbang & Fleksibel"
      description="Pengiriman cargo via armada truk sendiri — pilihan ideal yang menyeimbangkan kecepatan dan harga untuk pengiriman ke Papua dan Indonesia Timur."
      priceFrom="Rp 7.000/kg"
      priceNote="Minimum 100 kg · Harga tergantung rute"
      eta="7–14 hari"
      waHref={buildServiceMessage("Cargo Darat")}
      waLabel="Tanya Harga Cargo Darat"
      features={[
        "Armada truk milik sendiri",
        "Door to door seluruh Jabodetabek",
        "Lebih cepat dari cargo laut",
        "Tracking pengiriman",
        "Cocok untuk barang menengah",
        "Flexible pickup schedule",
        "Driver berpengalaman",
        "Tersedia packing standar",
      ]}
      details={[
        {
          title: "Armada & Kapasitas",
          desc: "Armada truk kami mencakup truk box, truk engkel, dan truk besar sesuai kebutuhan. Kapasitas mulai dari 1 ton hingga 20+ ton per pengiriman.",
        },
        {
          title: "Rute & Cakupan",
          desc: "Pengiriman darat mencakup rute Jawa–Bali–Lombok, kemudian dilanjutkan via kapal ke Papua dan Indonesia Timur. Kombinasi darat-laut untuk efisiensi optimal.",
        },
        {
          title: "Keunggulan vs Cargo Laut",
          desc: "Cargo darat lebih cepat 30–50% dibanding cargo laut untuk rute tertentu. Cocok jika kebutuhan mendesak tapi budget tidak memungkinkan cargo udara.",
        },
        {
          title: "Jadwal Keberangkatan",
          desc: "Pengiriman dilakukan setiap minggu sesuai jadwal keberangkatan. Hubungi kami untuk informasi jadwal terdekat dari kota Anda.",
        },
      ]}
      relatedServices={[
        { name: "Cargo Laut", href: "/layanan/cargo-laut" },
        { name: "Cargo Udara", href: "/layanan/cargo-udara" },
        { name: "Kirim Motor", href: "/layanan/kirim-motor" },
        { name: "Kirim Mobil", href: "/layanan/kirim-mobil" },
      ]}
    />
  );
}
