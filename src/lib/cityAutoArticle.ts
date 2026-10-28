import type { CityView } from "@/lib/cityPage";
import { toSlug } from "@/lib/cityPage";

function esc(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function pick<T>(seed: string, items: T[]): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return items[h % items.length];
}

function rp(n: number) {
  return `Rp${n.toLocaleString("id-ID")}`;
}

function range(min: number | null, max: number | null) {
  if (min === null || max === null) return "";
  return min === max ? `${min} hari` : `${min}–${max} hari`;
}

export function buildAutoCityArticle(view: CityView): string {
  const { cityLabel, city, region, cityGroups, validCityValues, cp } = view;
  if (!cityLabel) return "";
  const k = esc(cityLabel);
  const value = city?.value ?? "";
  const group = cityGroups.find((g) => g.cities.some((x) => x.value === value));
  const area = esc(group?.groupLabel ?? region);
  const seed = value || cityLabel;

  const reg = cp.regulerPrice !== null ? { price: rp(cp.regulerPrice), eta: range(cp.regulerEtaMin, cp.regulerEtaMax) } : null;
  const exp = cp.expressPrice !== null ? { price: rp(cp.expressPrice), eta: range(cp.expressEtaMin, cp.expressEtaMax) } : null;

  const intro = pick(seed, [
    `${k} termasuk salah satu tujuan pengiriman rutin BJA Logistic di wilayah ${area}. Kebutuhan barang di kota ini banyak didatangkan dari Pulau Jawa lewat jalur laut, mulai dari bahan bangunan, perabot, sampai stok dagangan toko.`,
    `Mengirim barang ke ${k} dari Pulau Jawa paling hemat lewat jalur laut. BJA Logistic melayani pengiriman cargo ke ${k} dan kota-kota lain di ${area}, untuk kebutuhan usaha maupun pribadi.`,
    `BJA Logistic rutin mengirim cargo ke ${k}, ${area}. Barang dijemput atau diterima di gudang kami, lalu dikirim lewat kapal sesuai jadwal keberangkatan terdekat.`,
  ]);

  const parts: string[] = [];
  parts.push(`<h2>Pengiriman Cargo dari Jakarta ke ${k}</h2>`);
  parts.push(`<p>${intro}</p>`);
  parts.push(
    `<p>Barang bisa dikirim dari Jakarta dan sekitarnya (Jabodetabek) maupun dari Surabaya, dengan minimal pengiriman <strong>${cp.minWeightKg} kg</strong>. Untuk tujuan ${k} tersedia layanan berikut:</p>`
  );

  const svc: string[] = [];
  if (reg) svc.push(`<li><strong>Reguler</strong>: ${reg.price}/kg${reg.eta ? `, estimasi ${reg.eta} setelah kapal berangkat` : ""}. Pilihan paling hemat untuk barang dalam jumlah besar.</li>`);
  if (exp) svc.push(`<li><strong>Express</strong>: ${exp.price}/kg${exp.eta ? `, estimasi ${exp.eta} setelah kapal berangkat` : ""}. Memakai kapal PELNI, cocok untuk barang yang perlu tiba lebih cepat.</li>`);
  if (svc.length) parts.push(`<ul>${svc.join("")}</ul>`);
  parts.push(
    `<p>Untuk barang yang besar tetapi ringan, ongkir dihitung dari <a href="/blog/cara-hitung-volume-barang-untuk-pengiriman-cargo-dan-jasa-ekspedisi">berat volume</a> jika lebih besar dari berat timbangan. Harga final dikonfirmasi tim kami sebelum barang dikirim.</p>`
  );

  const nearby = (group?.cities ?? []).filter((x) => x.value !== value && validCityValues.has(x.value)).slice(0, 6);
  if (nearby.length > 0) {
    parts.push(`<h3>Pengiriman ke Daerah Sekitar ${k}</h3>`);
    parts.push(
      `<p>Selain ${k}, kami juga melayani pengiriman ke kota dan kabupaten lain di ${area}, antara lain ${nearby
        .map((x) => `<a href="/kirim-ke/${toSlug(x.value)}">${esc(x.label)}</a>`)
        .join(", ")}. Tarif dan estimasi tiap tujuan bisa berbeda, jadi cek halaman kota masing-masing.</p>`
    );
  }

  parts.push(`<h3>Barang yang Sering Dikirim ke ${k}</h3>`);
  parts.push(
    `<ul><li>Material bangunan dan peralatan proyek</li><li>Perabot rumah tangga dan <a href="/layanan/pindahan-rumah">barang pindahan</a></li><li>Stok barang untuk toko dan usaha</li><li>Mesin dan peralatan kerja</li><li>Kendaraan seperti <a href="/layanan/kirim-motor">motor</a> dan <a href="/layanan/kirim-mobil">mobil</a></li></ul>`
  );

  parts.push(`<h3>Persiapan Sebelum Mengirim</h3>`);
  parts.push(
    `<ul><li>Cek <a href="/jadwal-kapal">jadwal kapal</a> dan pastikan barang sudah diserahkan sebelum closing date.</li><li>Barang pecah belah sebaiknya dikemas dengan <a href="/blog/cara-packing-kayu-yang-baik-untuk-pengiriman-cargo-laut">packing kayu</a> agar aman selama perjalanan laut.</li><li>Siapkan nama, alamat lengkap, dan nomor telepon penerima di ${k} yang aktif.</li><li>Kami tidak menerima hewan hidup maupun mati dan frozen food.</li></ul>`
  );

  return parts.join("");
}
