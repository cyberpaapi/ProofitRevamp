"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { NavigationItem } from "@/lib/navigation";

const campaignRoutes = new Set(["/landing-page", "/landing-page2", "/thank-you"]);

export function ConditionalHeader({ navigation }: { navigation: NavigationItem[] }) {
  const pathname = usePathname();
  return campaignRoutes.has(pathname) || pathname.startsWith("/admin") ? null : <Header navigation={navigation} />;
}

export function ConditionalFooter({ navigation }: { navigation: NavigationItem[] }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  if (campaignRoutes.has(pathname)) {
    return pathname === "/thank-you" ? null : <WhatsAppFloat />;
  }
  return (
    <>
      <Footer navigation={navigation} />
      <WhatsAppFloat />
    </>
  );
}
