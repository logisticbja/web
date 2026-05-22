export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bjalogistic.id/#business",
    name: "BJA Logistic",
    alternateName: "BJA Logistics",
    description:
      "Jasa ekspedisi cargo terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Layanan cargo laut, darat, udara, kirim motor dan mobil. Mulai Rp 6.000/kg.",
    url: "https://bjalogistic.id",
    telephone: "+6281513335157",
    email: "info@bjalogistic.id",
    priceRange: "Rp 6.000 – Rp 35.000 per kg",
    image: "https://bjalogistic.id/logo-putih-bja.webp",
    logo: "https://bjalogistic.id/logo-putih-bja.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Tanjung Sadari No. 125, Perak Barat, Krembangan",
      addressLocality: "Surabaya",
      addressRegion: "Jawa Timur",
      postalCode: "60177",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.2262,
      longitude: 112.7279,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://instagram.com/bja_logistic",
      "https://facebook.com/BJALogistick",
      "https://tiktok.com/@bjalogistic",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Ekspedisi BJA Logistic",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Laut ke Papua",
            description: "Pengiriman cargo via kapal Roro & PELNI ke Papua dan Indonesia Timur",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "6000",
            priceCurrency: "IDR",
            unitText: "per kg",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Darat ke Papua",
            description: "Pengiriman cargo via truk ke Papua dan Indonesia Timur",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "7000",
            priceCurrency: "IDR",
            unitText: "per kg",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Udara ke Papua",
            description: "Pengiriman express via pesawat ke Papua, 2-4 hari sampai",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "20000",
            priceCurrency: "IDR",
            unitText: "per kg",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa ongkir kirim ke Papua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ongkir ke Papua mulai dari Rp 6.000/kg untuk cargo laut (min. 100 kg) dan Rp 7.000/kg untuk cargo darat. Cargo udara mulai Rp 20.000/kg. Hubungi WhatsApp 0815-1333-5157 untuk harga pasti.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama pengiriman ke Papua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cargo laut: 14–20 hari. Cargo darat: 7–14 hari. Cargo udara: 2–4 hari. Waktu dapat bervariasi tergantung jadwal kapal dan kondisi cuaca.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah BJA Logistic melayani door to door?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, BJA Logistic menyediakan layanan jemput barang langsung dari lokasi Anda di area Jabodetabek dan Surabaya.",
        },
      },
      {
        "@type": "Question",
        name: "Kota mana saja yang dilayani BJA Logistic di Papua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BJA Logistic melayani 50+ kota di Papua termasuk Jayapura, Sorong, Manokwari, Merauke, Timika, Wamena, Nabire, Biak, Fakfak, Raja Ampat, dan daerah pelosok Papua lainnya.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah bisa kirim motor dan mobil ke Papua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, BJA Logistic melayani pengiriman sepeda motor dan mobil ke Papua dan Indonesia Timur, dilengkapi dengan asuransi pengiriman dan dokumentasi foto.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
