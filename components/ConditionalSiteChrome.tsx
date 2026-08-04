"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const campaignRoutes = new Set(["/landing-page", "/landing-page2", "/thank-you"]);

export function ConditionalHeader() {
  const pathname = usePathname();
  return campaignRoutes.has(pathname) ? null : <Header />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (campaignRoutes.has(pathname)) {
    return pathname === "/thank-you" ? null : <WhatsAppFloat />;
  }
  return (
    <>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
