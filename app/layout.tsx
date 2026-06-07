import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import {
  localBusinessSchema,
  organizationSchema,
  jsonLd,
} from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "Commercial Restaurant Equipment Repair Houston TX | Cesar's Restaurant Appliances Repair",
    template: "%s | Cesar's Restaurant Appliances Repair",
  },
  description:
    "24/7 commercial restaurant equipment repair in Houston TX. $50 on-site diagnostic & estimate, emergency service, same-day repairs for refrigerators, freezers, ice machines, fryers, ovens and more.",
  applicationName: SITE.name,
  keywords: [
    "commercial restaurant equipment repair Houston",
    "commercial refrigerator repair Houston",
    "walk-in cooler repair Houston",
    "ice machine repair Houston",
    "commercial fryer repair Houston",
    "restaurant equipment repair Houston TX",
    "emergency refrigeration repair Houston",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: SITE.url,
    siteName: SITE.name,
    title:
      "Commercial Restaurant Equipment Repair Houston TX | Cesar's Restaurant Appliances Repair",
    description:
      "24/7 commercial restaurant equipment repair in Houston TX. $50 on-site diagnostic & estimate, emergency service, same-day repairs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Restaurant Equipment Repair Houston TX",
    description:
      "24/7 commercial restaurant equipment repair in Houston TX. $50 diagnostic & estimate, emergency & same-day service.",
  },
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
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#1a1d21",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <StickyMobileCTA />
        </LanguageProvider>
      </body>
    </html>
  );
}
