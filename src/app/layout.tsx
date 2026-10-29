import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { RestrictionNotice } from "@/components/layout/RestrictionNotice";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWA } from "@/components/ui/FloatingWA";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { UTMTracker } from "@/components/UTMTracker";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { GA_ID, GOOGLE_ADS_ID } from "@/lib/gtag";

const BASE_URL = "https://bjalogistic.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | BJA Logistic",
    default: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
  },
  description:
    "Jasa ekspedisi cargo terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Mulai Rp 7.000/kg, door to door Jabodetabek. Spesialis pengiriman Papua 10+ tahun. ☎ 0815-1333-5157.",
  keywords: [
    "ekspedisi papua", "cargo papua", "kirim barang ke papua", "ongkir papua",
    "cargo laut papua", "ekspedisi indonesia timur", "cargo maluku", "cargo ntt",
    "jasa pengiriman papua", "bja logistic", "ekspedisi surabaya papua",
    "ekspedisi jakarta papua", "kirim motor ke papua", "kirim mobil ke papua",
    "cargo jayapura", "cargo sorong", "cargo manokwari", "cargo merauke",
    "ekspedisi murah ke papua", "pengiriman ke papua terpercaya",
    "cargo laut ke papua murah", "jasa kirim barang papua indonesia timur",
  ],
  authors: [{ name: "BJA Logistic", url: BASE_URL }],
  creator: "BJA Logistic",
  publisher: "BJA Logistic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
    description:
      "Jasa ekspedisi terpercaya ke Papua, Maluku, NTT, Sulawesi. Mulai Rp 7.000/kg. Door to door Jabodetabek. 10+ tahun pengalaman.",
    url: BASE_URL,
    siteName: "BJA Logistic",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BJA Logistic — Ekspedisi Spesialis Papua & Indonesia Timur",
    description: "Jasa ekspedisi terpercaya ke Papua & Indonesia Timur. Mulai Rp 7.000/kg.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3BHM7PF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        <Navbar />
        <RestrictionNotice />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <FloatingWA />
        <MobileCtaBar />
        <Script id="tag-loader" strategy="afterInteractive">
          {`
            (function(){
              if (location.pathname.startsWith('/preview/')) return;
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
              ${GA_ID ? `gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: true });
              ${GOOGLE_ADS_ID && GOOGLE_ADS_ID !== "AW-XXXXXXXXXX" ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}` : ""}
              var loaded = false;
              var events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'mousemove'];
              function add(src){ var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
              function load(){
                if (loaded) return;
                loaded = true;
                events.forEach(function(e){ window.removeEventListener(e, load, { passive: true }); });
                window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                add('https://www.googletagmanager.com/gtm.js?id=GTM-W3BHM7PF');
                ${GA_ID ? `add('https://www.googletagmanager.com/gtag/js?id=${GA_ID}');` : ""}
              }
              events.forEach(function(e){ window.addEventListener(e, load, { passive: true }); });
              setTimeout(load, 6000);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
