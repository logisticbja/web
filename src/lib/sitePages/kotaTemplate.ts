import { iconName, isObj, list, obj, safeImage, sectionKeys, str, strList, type SiteIconName } from "./core";

export const KOTA_SECTIONS = ["hero", "info", "services", "served", "cityServices", "why", "clients", "steps", "testimonials", "cities", "related", "faq", "cta"] as const;
export type KotaSection = (typeof KOTA_SECTIONS)[number];
export const KOTA_FIXED: KotaSection[] = ["hero", "info"];
export const KOTA_NO_HIDE: KotaSection[] = ["services"];

export interface KotaServiceType {
  label: string;
  highlights: string[];
}

export interface KotaTemplate {
  version: number;
  order: KotaSection[];
  hidden: KotaSection[];
  hero: {
    title: string;
    description: string;
    waLabel: string;
    calcLabel: string;
    priceTitle: string;
    notice: string;
  };
  info: { popupTitle: string; popupMinText: string; popupRestrictedText: string };
  services: {
    title: string;
    description: string;
    reguler: KotaServiceType;
    express: KotaServiceType;
    orderLabel: string;
    unavailableTitle: string;
    unavailableText: string;
    noteTitle: string;
    noteText: string;
  };
  served: { title: string };
  cityServices: { title: string };
  why: { title: string; items: { title: string; desc: string }[] };
  clients: { subtitle: string; title: string; logos: { src: string; alt: string }[]; footnote: string };
  steps: { title: string; items: { icon: SiteIconName; title: string; desc: string }[] };
  testimonials: {
    label: string;
    titleCity: string;
    titleGeneric: string;
    subtitle: string;
    items: { name: string; role: string; quote: string }[];
  };
  cities: { title: string };
  related: { title: string; linkPrefix: string };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; description: string; waLabel: string };
}

export const KOTA_TEMPLATE_DEFAULTS: KotaTemplate = {
  version: 1,
  order: [...KOTA_SECTIONS],
  hidden: [],
  hero: {
    title: "Ekspedisi Cargo\nke {kota}",
    description: "Ekspedisi cargo Jakarta ke {kota}: kirim barang mulai dari {harga}/kg via cargo laut, minimal {minkg} kg. Door to door dari Jabodetabek & Surabaya.",
    waLabel: "Tanya Harga ke {kota}",
    calcLabel: "Hitung Ongkir",
    priceTitle: "Estimasi Ongkir ke {kota}",
    notice: "Tidak menerima pengiriman hewan & frozen food",
  },
  info: {
    popupTitle: "Info Penting Pengiriman ke {kota}",
    popupMinText: "Minimal pengiriman {minkg} kg.",
    popupRestrictedText: "Barang yang tidak bisa dikirim ke {kota}:",
  },
  services: {
    title: "Ongkir Cargo ke {kota}: Pilih Layanan",
    description: "Estimasi harga berdasarkan tarif per kg. Harga final menyesuaikan berat & volume aktual.",
    reguler: {
      label: "Cargo Reguler",
      highlights: [
        "Menggunakan kapal cargo",
        "Lebih ekonomis untuk pengiriman non-urgent",
        "Cocok untuk barang besar, berat, dan pengiriman rutin",
        "Tracking pengiriman tersedia",
      ],
    },
    express: {
      label: "Cargo Express",
      highlights: [
        "Menggunakan kapal PELNI",
        "Lebih cepat sampai dibanding layanan Reguler",
        "Cocok untuk barang besar, berat, dan kebutuhan urgent",
        "Tracking pengiriman tersedia",
      ],
    },
    orderLabel: "Pesan {layanan}",
    unavailableTitle: "Layanan tidak tersedia",
    unavailableText: "{layanan} saat ini tidak tersedia untuk tujuan {kota}.",
    noteTitle: "Catatan estimasi pengiriman",
    noteText:
      "Estimasi waktu dihitung sejak kapal berangkat dari pelabuhan asal, bukan sejak barang dipesan atau di-pickup. Jadwal kapal dapat berubah karena kondisi operasional, cuaca, pelabuhan, atau perjalanan. Pastikan konfirmasi jadwal kapal terdekat ke CS BJA Logistic sebelum melakukan pengiriman.",
  },
  served: { title: "Area yang Dilayani di {kota}" },
  cityServices: { title: "Layanan Pengiriman ke {kota}" },
  why: {
    title: "Mengapa Pilih BJA untuk Pengiriman ke {kota}?",
    items: [
      { title: "10+ Tahun Pengalaman", desc: "Kami telah melayani pengiriman ke {kota} dan seluruh {wilayah} selama lebih dari 10 tahun." },
      { title: "Jaringan Agen Lokal", desc: "Agen dan mitra lokal di {kota} memastikan pengiriman selesai hingga ke alamat tujuan." },
      { title: "Tracking Real-Time", desc: "Pantau status pengiriman Anda kapan saja via WhatsApp atau halaman tracking kami." },
      { title: "Harga Kompetitif", desc: "Tarif pengiriman ke {kota} mulai {harga}/kg — salah satu yang paling kompetitif." },
    ],
  },
  clients: {
    subtitle: "Dipercaya oleh perusahaan-perusahaan terkemuka",
    title: "Klien Corporate Kami",
    logos: [
      { src: "/client/indomaret.webp", alt: "Indomaret" },
      { src: "/client/bni.webp", alt: "BNI" },
      { src: "/client/united-tractor.webp", alt: "United Tractors" },
      { src: "/client/pln.webp", alt: "PLN" },
      { src: "/client/cap.webp", alt: "Chandra Asri" },
      { src: "/client/synnex.webp", alt: "Synnex Metrodata" },
      { src: "/client/madesa.webp", alt: "Madesa" },
      { src: "/client/sonton.webp", alt: "Sonton" },
      { src: "/client/sigs.webp", alt: "SIGS" },
      { src: "/client/aksara.webp", alt: "Aksara Grafika" },
    ],
    footnote: "+ ratusan klien UKM & perorangan lainnya",
  },
  steps: {
    title: "Cara Kirim Barang ke {kota}",
    items: [
      { icon: "MessageCircle", title: "Chat via WhatsApp", desc: "Konsultasi & cek ongkir gratis, respon cepat tim kami." },
      { icon: "Package", title: "Konfirmasi & Jemput Barang", desc: "Tim jemput langsung dari lokasi Anda di Jabodetabek & Surabaya." },
      { icon: "Ship", title: "Proses & Pengiriman", desc: "Barang ditimbang, dikemas, dan dikirim sesuai jadwal kapal." },
      { icon: "MapPin", title: "Tracking & Sampai Tujuan", desc: "Pantau status real-time hingga barang sampai." },
    ],
  },
  testimonials: {
    label: "TESTIMONI",
    titleCity: "Apa Kata Pelanggan Kami di {kota}",
    titleGeneric: "Apa Kata Pelanggan Kami",
    subtitle: "Ribuan pelanggan sudah merasakan manfaat layanan kami",
    items: [
      {
        name: "Budi Santoso",
        role: "Owner Toko Material, Jayapura",
        quote: "Sudah 3 tahun pakai BJA untuk kirim material bangunan dari Surabaya ke Jayapura. Harganya paling murah dibanding yang lain, dan barang selalu dateng tepat waktu. Pelayanan CS juga responsif banget!",
      },
      {
        name: "Dewi Rahayu",
        role: "Distributor FMCG, Sorong",
        quote: "Kirim 2-3 ton barang tiap bulan via cargo laut BJA. Trackingnya real-time, jadi saya bisa kasih info akurat ke customer saya di Sorong. Highly recommended untuk bisnis yang butuh logistik ke Papua!",
      },
      {
        name: "Hendra Wijaya",
        role: "Pengusaha, Jakarta",
        quote: "Awalnya ragu kirim mesin industri ke Timika, tapi BJA meyakinkan dengan solusi packing kayu dan asuransi. Alhamdulillah semua aman sampai tujuan. Proses koordinasinya juga mudah via WhatsApp.",
      },
    ],
  },
  cities: { title: "Kota yang Dilayani di {wilayah}" },
  related: { title: "Kota Lain di {wilayah}", linkPrefix: "Kirim ke" },
  faq: {
    title: "FAQ Pengiriman ke {kota}",
    items: [
      {
        q: "Berapa ongkir ke {kota}?",
        a: "Ongkir ke {kota}: {ongkir} (min. {minkg} kg). Harga final tergantung berat aktual dan dimensi barang.",
      },
      {
        q: "Berapa lama pengiriman ke {kota}?",
        a: "Estimasi waktu pengiriman ke {kota}: {estimasi}. Estimasi dihitung sejak kapal berangkat dari pelabuhan asal dan dapat berubah tergantung jadwal kapal, cuaca, operasional pelabuhan, serta kondisi perjalanan.",
      },
      {
        q: "Apakah tersedia layanan door to door ke {kota}?",
        a: "Ya, kami menyediakan layanan jemput barang langsung dari lokasi Anda di Jabodetabek dan Surabaya. Untuk pengantaran ke {kota}, tersedia untuk area tertentu — hubungi CS kami untuk konfirmasi.",
      },
      {
        q: "Apa saja barang yang bisa dikirim ke {kota}?",
        a: "Hampir semua jenis barang: sembako, elektronik, material bangunan, perabotan, mesin industri, alat pertanian, pakaian, dan barang dagangan umum. Untuk barang khusus (B3, senjata, dll), hubungi kami terlebih dahulu.",
      },
      {
        q: "Apakah ada asuransi pengiriman ke {kota}?",
        a: "Ya, asuransi pengiriman tersedia untuk semua layanan. Biaya asuransi dihitung dari nilai barang yang diasuransikan. Sangat direkomendasikan untuk barang elektronik, mesin, dan barang bernilai tinggi.",
      },
    ],
  },
  cta: {
    title: "Siap Kirim Cargo ke {kota}?",
    description: "Chat WhatsApp sekarang — tim kami konfirmasi harga & jadwal dalam hitungan menit.",
    waLabel: "Chat Sekarang — Kirim ke {kota}",
  },
};

function serviceType(raw: unknown, base: KotaServiceType): KotaServiceType {
  const x = isObj(raw) ? raw : {};
  return { label: str(x.label, base.label), highlights: strList(x.highlights, base.highlights) };
}

export function mergeKotaTemplate(base: KotaTemplate, raw: unknown): KotaTemplate {
  if (!isObj(raw)) return base;
  const hero = obj(raw, "hero");
  const info = obj(raw, "info");
  const services = obj(raw, "services");
  const served = obj(raw, "served");
  const cityServices = obj(raw, "cityServices");
  const why = obj(raw, "why");
  const clients = obj(raw, "clients");
  const steps = obj(raw, "steps");
  const testimonials = obj(raw, "testimonials");
  const cities = obj(raw, "cities");
  const related = obj(raw, "related");
  const faq = obj(raw, "faq");
  const cta = obj(raw, "cta");
  return {
    version: 1,
    order: sectionKeys(raw.order, KOTA_SECTIONS, base.order, true),
    hidden: sectionKeys(raw.hidden, KOTA_SECTIONS, base.hidden, false).filter((k) => !KOTA_FIXED.includes(k) && !KOTA_NO_HIDE.includes(k)),
    hero: {
      title: str(hero.title, base.hero.title),
      description: str(hero.description, base.hero.description),
      waLabel: str(hero.waLabel, base.hero.waLabel),
      calcLabel: str(hero.calcLabel, base.hero.calcLabel),
      priceTitle: str(hero.priceTitle, base.hero.priceTitle),
      notice: str(hero.notice, base.hero.notice),
    },
    info: {
      popupTitle: str(info.popupTitle, base.info.popupTitle),
      popupMinText: str(info.popupMinText, base.info.popupMinText),
      popupRestrictedText: str(info.popupRestrictedText, base.info.popupRestrictedText),
    },
    services: {
      title: str(services.title, base.services.title),
      description: str(services.description, base.services.description),
      reguler: serviceType(services.reguler, base.services.reguler),
      express: serviceType(services.express, base.services.express),
      orderLabel: str(services.orderLabel, base.services.orderLabel),
      unavailableTitle: str(services.unavailableTitle, base.services.unavailableTitle),
      unavailableText: str(services.unavailableText, base.services.unavailableText),
      noteTitle: str(services.noteTitle, base.services.noteTitle),
      noteText: str(services.noteText, base.services.noteText),
    },
    served: { title: str(served.title, base.served.title) },
    cityServices: { title: str(cityServices.title, base.cityServices.title) },
    why: {
      title: str(why.title, base.why.title),
      items: list(why.items, base.why.items, (x, b) => ({ title: str(x.title, b.title), desc: str(x.desc, b.desc) }), { title: "", desc: "" }),
    },
    clients: {
      subtitle: str(clients.subtitle, base.clients.subtitle),
      title: str(clients.title, base.clients.title),
      logos: list(clients.logos, base.clients.logos, (x, b) => ({ src: safeImage(x.src, b.src), alt: str(x.alt, b.alt) }), { src: "", alt: "" }).filter((l) => l.src !== ""),
      footnote: str(clients.footnote, base.clients.footnote),
    },
    steps: {
      title: str(steps.title, base.steps.title),
      items: list(steps.items, base.steps.items, (x, b) => ({ icon: iconName(x.icon, b.icon), title: str(x.title, b.title), desc: str(x.desc, b.desc) }), { icon: "CheckCircle", title: "", desc: "" }),
    },
    testimonials: {
      label: str(testimonials.label, base.testimonials.label),
      titleCity: str(testimonials.titleCity, base.testimonials.titleCity),
      titleGeneric: str(testimonials.titleGeneric, base.testimonials.titleGeneric),
      subtitle: str(testimonials.subtitle, base.testimonials.subtitle),
      items: list(testimonials.items, base.testimonials.items, (x, b) => ({ name: str(x.name, b.name), role: str(x.role, b.role), quote: str(x.quote, b.quote) }), { name: "", role: "", quote: "" }),
    },
    cities: { title: str(cities.title, base.cities.title) },
    related: { title: str(related.title, base.related.title), linkPrefix: str(related.linkPrefix, base.related.linkPrefix) },
    faq: {
      title: str(faq.title, base.faq.title),
      items: list(faq.items, base.faq.items, (x, b) => ({ q: str(x.q, b.q), a: str(x.a, b.a) }), { q: "", a: "" }),
    },
    cta: {
      title: str(cta.title, base.cta.title),
      description: str(cta.description, base.cta.description),
      waLabel: str(cta.waLabel, base.cta.waLabel),
    },
  };
}

export type KotaVars = Record<string, string>;

export function fillTemplate(text: string, vars: KotaVars): string {
  let t = text;
  if (!vars.wilayah) t = t.replace(/\s*(?:dan |di )?seluruh \{wilayah\}/g, "");
  return t.replace(/\{([a-z_]+)\}/g, (m, k: string) => (k in vars ? vars[k] : m));
}
