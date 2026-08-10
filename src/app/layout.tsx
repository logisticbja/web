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
    default: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
  },
  description:
    "Jasa ekspedisi cargo terpercaya ke Papua, Maluku, NTT, dan Sulawesi. Cargo laut mulai Rp 6.000/kg, door to door Jabodetabek. Spesialis pengiriman Papua 10+ tahun. ☎ 0815-1333-5157.",
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
    title: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
    description:
      "Jasa ekspedisi terpercaya ke Papua, Maluku, NTT, Sulawesi. Cargo laut mulai Rp 6.000/kg. Door to door Jabodetabek. 10+ tahun pengalaman.",
    url: BASE_URL,
    siteName: "BJA Logistic",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BJA Logistic — Ekspedisi Cargo Papua & Indonesia Timur",
    description: "Jasa ekspedisi terpercaya ke Papua & Indonesia Timur. Mulai Rp 6.000/kg.",
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W3BHM7PF');
            `,
          }}
        />
        {/* End Google Tag Manager */}
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
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWA />
        <MobileCtaBar />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
                ${GOOGLE_ADS_ID && GOOGLE_ADS_ID !== "AW-XXXXXXXXXX" ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
