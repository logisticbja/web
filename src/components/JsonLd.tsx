export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bjalogistic.id/#business",
    name: "BJA Logistic",
    alternateName: "BJA Logistics",
    description:
      "Jasa ekspedisi cargo terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Layanan cargo laut, darat, udara, kirim motor dan mobil. Cargo laut mulai Rp 7.000/kg.",
    url: "https://bjalogistic.id",
    telephone: "+6281513335157",
    email: "info@bjalogistic.id",
    priceRange: "Rp 2.500 – Rp 528.000 per kg",
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
      "https://www.instagram.com/bjalogisticofficial/",
      "https://www.facebook.com/profile.php?id=61592894893288",
      "https://www.tiktok.com/@bjalogistic",
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
            price: "7000",
            priceCurrency: "IDR",
            unitText: "per kg",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Darat Jakarta – Jawa",
            description: "Pengiriman cargo via truk dari Jakarta ke kota-kota di Pulau Jawa, estimasi 2–5 hari",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "2500",
            priceCurrency: "IDR",
            unitText: "per kg",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Udara ke Papua",
            description: "Pengiriman via pesawat ke Papua dan Indonesia Timur, estimasi 2–8 hari kerja, minimal 20 kg",
          },
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "102000",
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
          text: "Ongkir ke Papua lewat cargo laut mulai Rp 7.000/kg (min. 100 kg). Cargo udara ke Papua mulai Rp 186.000/kg (min. 20 kg). Hubungi WhatsApp 0815-1333-5157 untuk harga pasti.",
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

interface ArticleJsonLdProps {
  url: string;
  title: string;
  description: string;
  image: string;
  datePublished: string;
  author: string;
  keywords?: string[];
  section?: string;
  type?: "Article" | "NewsArticle";
}

export function ArticleJsonLd({
  url, title, description, image, datePublished, author, keywords = [], section, type = "Article",
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    headline: title,
    description,
    image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    datePublished,
    dateModified: datePublished,
    inLanguage: "id",
    ...(section && { articleSection: section }),
    ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
    author: {
      "@type": "Organization",
      name: author,
      url: "https://bjalogistic.id",
    },
    publisher: {
      "@type": "Organization",
      name: "BJA Logistic",
      url: "https://bjalogistic.id",
      logo: {
        "@type": "ImageObject",
        url: "https://bjalogistic.id/logo-putih-bja.webp",
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// FAQ per-artikel (beda dari FaqJsonLd statis di homepage) — dipakai kalau
// penulis pilih Schema Type "FAQ (FAQPage)" di CRM dan isi minimal 1 FAQ.
interface ArticleFaqJsonLdProps {
  items: { question: string; answer: string }[];
}
export function ArticleFaqJsonLd({ items }: ArticleFaqJsonLdProps) {
  if (!items.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

interface HowToJsonLdProps {
  name: string;
  steps: { title: string; desc: string }[];
}
export function HowToJsonLd({ name, steps }: HowToJsonLdProps) {
  if (!steps.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.desc,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  image: string;
  description: string;
  price?: string;
  currency: string;
  availability: string;
  url: string;
}
export function ProductJsonLd({
  name, image, description, price, currency, availability, url,
}: ProductJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    url,
  };
  if (price) {
    data.offers = {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url,
    };
  }
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
