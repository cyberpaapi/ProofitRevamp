import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Proofit — Home & Water Inspection Experts | Mumbai",
    template: "%s | Proofit",
  },
  description:
    "Independent, evidence-backed residential property inspections in Mumbai. Thermal imaging, international standards, 48-hour reports. New flat snagging, water leakage detection, annual home care.",
  keywords: [
    "home inspection Mumbai",
    "property inspection",
    "water leakage detection",
    "thermal imaging inspection",
    "flat possession inspection",
    "snag report Mumbai",
  ],
  openGraph: {
    type: "website",
    siteName: "Proofit",
    title: "Proofit — Home & Water Inspection Experts | Mumbai",
    description:
      "Independent, evidence-backed residential property inspections in Mumbai. Thermal imaging, international standards, 48-hour reports.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Proofit — home inspection, proven" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/og.jpg`,
  description:
    "Independent residential property inspection company in Mumbai — thermal imaging led home and water inspections with evidence-backed reports.",
  areaServed: ["Mumbai", "Navi Mumbai", "Thane"],
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "MH", addressCountry: "IN" },
  founder: [
    { "@type": "Person", name: "Hardik Sampat" },
    { "@type": "Person", name: "Dhyan Parekh" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
