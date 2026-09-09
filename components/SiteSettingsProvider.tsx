"use client";
import { createContext, useContext } from "react";
import { site } from "@/lib/site";
const SiteContext = createContext(site);
export function useSiteSettings() { return useContext(SiteContext); }
export default function SiteSettingsProvider({ value, children }: {value: typeof site;children:React.ReactNode}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
