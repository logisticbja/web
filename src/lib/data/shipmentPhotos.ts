import type { RegionConfig } from "@/lib/data/regions";

export type ShipmentPhoto = {
  image: string;
  alt: string;
  caption: string;
  citySlug: string;
};

export const SHIPMENT_PHOTOS: Partial<Record<RegionConfig["slug"], ShipmentPhoto[]>> = {
  maluku: [
    {
      image: "/images/pengiriman/muat-cargo-ternate-kontainer.jpg",
      alt: "Muat barang ke truk untuk pengiriman cargo 2 kontainer 20 feet ke Ternate",
      caption: "Pickup dan muat barang untuk pengiriman 2 kontainer 20 feet ke Ternate.",
      citySlug: "ternate",
    },
    {
      image: "/images/pengiriman/tim-bja-muat-cargo-ternate.jpg",
      alt: "Tim BJA Logistic mengawasi proses muat cargo tujuan Ternate di gudang",
      caption: "Tim BJA Logistic mengawasi proses muat barang tujuan Ternate.",
      citySlug: "ternate",
    },
  ],
  papua: [
    {
      image: "/images/pengiriman/barang-tiba-jayapura.jpg",
      alt: "Barang dengan packing kayu kiriman BJA Logistic tiba di Jayapura",
      caption: "Barang dengan packing kayu tiba di Jayapura.",
      citySlug: "jayapura",
    },
    {
      image: "/images/pengiriman/serah-terima-barang-jayapura.jpg",
      alt: "Serah terima barang kiriman BJA Logistic kepada penerima di Jayapura",
      caption: "Serah terima barang kepada penerima di Jayapura.",
      citySlug: "jayapura",
    },
    {
      image: "/images/pengiriman/penerimaan-cargo-jayapura.jpg",
      alt: "Penerima di Jayapura menerima kiriman cargo karung dari BJA Logistic",
      caption: "Penerimaan kiriman cargo di Jayapura.",
      citySlug: "jayapura",
    },
  ],
};
