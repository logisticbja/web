import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CekOngkirExample() {
  return (
    <section className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <h2 className="text-xl font-black text-[#111111] mb-4">Contoh Perhitungan Ongkir</h2>

      <div className="space-y-3 text-[15px] leading-relaxed text-gray-700">
        <p>
          Misalnya kamu hendak mengirim <strong className="text-[#111111]">satu set sofa</strong> dari Jakarta ke
          Jayapura. Setelah dikemas peti kayu, ukurannya{" "}
          <strong className="text-[#111111]">120 × 80 × 100 cm</strong>. Saat ditimbang, beratnya{" "}
          <strong className="text-[#111111]">150 kg</strong>.
        </p>
        <p>
          Sofa memang tidak terlalu berat, namun memakan tempat cukup banyak di kapal. Karena itu kami juga
          menghitung <strong className="text-[#111111]">berat volumenya</strong>:
        </p>
      </div>

      <div className="my-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-[15px] text-gray-700 space-y-1.5">
        <p>
          <span className="inline-block rounded-md bg-[#CC1F2A] px-2.5 py-0.5 font-mono text-sm font-bold text-white">
            P × L × T ÷ 4.000
          </span>
        </p>
        <p>
          120 × 80 × 100 ÷ 4.000 = <strong className="text-[#111111]">240 kg</strong>
        </p>
        <p>
          Berat timbangan 150 kg, berat volume 240 kg. Yang dipakai adalah yang lebih besar:{" "}
          <strong className="text-[#CC1F2A]">240 kg</strong>.
        </p>
      </div>

      <p className="text-[15px] leading-relaxed text-gray-700">
        Jadi ongkir sofa tadi dihitung dari 240 kg. Sebaliknya, untuk barang yang padat dan berat seperti mesin
        atau besi, biasanya yang dipakai berat timbangannya.
      </p>

      <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-gray-700">
        <strong className="text-[#111111]">Catatan:</strong> jika angka di belakang koma 0,6 atau lebih, berat
        dibulatkan ke atas. Contoh: 109,7 kg dihitung 110 kg.
      </div>

      <Link
        href="/blog/cara-hitung-volume-barang-untuk-pengiriman-cargo-dan-jasa-ekspedisi"
        className="mt-5 inline-flex items-center gap-1.5 font-black text-[#CC1F2A] hover:underline"
      >
        Baca panduan lengkap cara hitung volume barang <ArrowRight size={16} />
      </Link>
    </section>
  );
}
