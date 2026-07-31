import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ConditionalFooter, ConditionalHeader } from "@/components/ConditionalSiteChrome";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Proofit - Home & Water Inspection Experts | Mumbai & Nearby Cities",
    template: "%s | Proofit",
  },
  description:
    "Independent, evidence-backed residential property inspections Mumbai-wide and in neighbouring cities on request. Thermal imaging, international standards, and reports in 2-5 business working days.",
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
    title: "Proofit - Home & Water Inspection Experts | Mumbai & Nearby Cities",
    description:
      "Independent, evidence-backed residential property inspections Mumbai-wide and in neighbouring cities on request. Thermal imaging, international standards, and reports in 2-5 business working days.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Proofit - home inspection, proven" }],
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
    "Independent residential property inspections Mumbai-wide and in neighbouring cities on request, using thermal imaging and evidence-backed reporting.",
  areaServed: ["Mumbai", "Navi Mumbai", "Thane"],
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "MH", addressCountry: "IN" },
  founder: [
    { "@type": "Person", name: "Hardik Sampat" },
    { "@type": "Person", name: "Dhyan Parekh" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <ConditionalHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <ConditionalFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
