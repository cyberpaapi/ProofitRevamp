"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProofitLogo from "@/components/ProofitLogo";
import { serviceNavigation as serviceLinks, type NavigationItem } from "@/lib/navigation";

export default function Header({ navigation: menuLinks }: { navigation: NavigationItem[] }) {
  const pathname = usePathname();
  const [heroMode, setHeroMode] = useState(pathname === "/");
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroBoundary = Math.max(560, window.innerHeight * 0.92);
      setHeroMode(pathname === "/" && window.scrollY < heroBoundary);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setExpanded({ "/case-studies": pathname.startsWith("/case-studies"), "/services": pathname.startsWith("/services") });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); return; }
      if (event.key !== "Tab") return;
      const elements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]') || []).filter(el => el.getClientRects().length && !el.closest("[inert]"));
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          heroMode
            ? "bg-gradient-to-b from-ink/70 to-transparent text-white"
            : "bg-white/75 text-ink shadow-[0_1px_0_rgba(17,17,18,0.08)] backdrop-blur-xl"
        }`}
      >
        <div className="site-container site-header-inner flex flex-wrap items-center justify-between gap-2 py-3 sm:gap-4">
          <div className="flex shrink-0 items-center gap-2 md:gap-6 lg:gap-8">
            <Link href="/" aria-label="Proofit - home" className="shrink-0">
              <ProofitLogo
                priority
                className="w-[114.4px] sm:w-[140.4px] md:w-[166.4px]"
                imageClassName={`transition-[filter] duration-300 ${
                  heroMode ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex lg:gap-8">
              <Link
                href="/about"
                className="font-display text-sm font-semibold transition-colors hover:text-brand"
              >
                About Us
              </Link>

              <div className="group relative">
                <button
                  type="button"
                  onClick={() => setServicesOpen((value) => !value)}
                  className="flex cursor-pointer items-center gap-1.5 font-display text-sm font-semibold transition-colors hover:text-brand"
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                >
                  Services
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden
                    className={`transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : "group-hover:rotate-180"
                    }`}
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </button>
                <div
                  className={`absolute left-0 top-full w-56 rounded-xl border p-2 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-2 group-focus-within:opacity-100 ${
                    servicesOpen ? "visible translate-y-2 opacity-100" : "invisible translate-y-3 opacity-0"
                  } ${heroMode ? "border-white/10 bg-ink" : "border-line bg-white"}`}
                >
                  <Link
                    href="/services"
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-brand ${
                      heroMode ? "text-white/85 hover:bg-white/10" : "text-ink/80 hover:bg-cream"
                    }`}
                  >
                    All Services
                  </Link>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-brand ${
                        heroMode ? "text-white/85 hover:bg-white/10" : "text-ink/80 hover:bg-cream"
                      }`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/care-plus"
                className="whitespace-nowrap font-display text-sm font-semibold transition-colors hover:text-brand"
              >
                Proofit Care+
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full border border-current/20 px-2 transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:gap-2 sm:px-4"
            ref={menuButtonRef}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg width="20" height="16" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-display text-xs font-semibold sm:text-sm">Menu</span>
          </button>
          <Link
            href="/contact"
            className={`group inline-flex h-11 shrink-0 touch-manipulation items-center rounded-full shadow-[0_4px_18px_rgba(17,17,18,0.18)] transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
              heroMode ? "bg-white text-ink hover:bg-brand hover:text-white" : "bg-ink text-white hover:bg-white hover:text-ink"
            }`}
          >
            <span className="whitespace-nowrap pl-3 font-display text-xs font-semibold sm:pl-4 sm:text-sm">
              Enquire<span className="hidden sm:inline"> Now</span>
            </span>
            <span className={`mx-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:translate-x-0.5 ${
              heroMode ? "text-white" : "text-ink"
            }`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          </div>
        </div>
      </header>

      {/* Full menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink text-white transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        ref={dialogRef}
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="site-container flex items-center justify-between py-2">
          <ProofitLogo
            className="w-[143px] md:w-[166.4px]"
            imageClassName="brightness-0 invert"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand hover:text-brand"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Site" className="site-container grid h-[calc(100dvh-80px)] content-start gap-1 overflow-y-auto py-5 md:py-5 lg:grid-cols-2 lg:gap-x-16">
          {menuLinks.map((l, i) => {
            const index = i + 1;
            const isGroup = !!l.children;
            const isExpanded = !!expanded[l.href];
            const submenuId = `site-menu-${l.href.slice(1)}`;
            const isActive = pathname === l.href || (isGroup && pathname.startsWith(`${l.href}/`));

            if (isGroup) {
              return (
                <div key={l.href} className="border-b border-white/10 py-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(value => ({ ...value, [l.href]: !value[l.href] }))}
                    className={`group flex min-h-14 w-full cursor-pointer items-center gap-4 py-2.5 text-left ${isActive ? "text-brand" : "text-white"}`}
                    aria-expanded={isExpanded}
                    aria-controls={submenuId}
                  >
                    <span className="font-display text-sm text-brand/70">{String(index).padStart(2, "0")}</span>
                    <span className="font-display text-2xl font-semibold transition-all group-hover:translate-x-2 group-hover:text-brand md:text-3xl">
                      {l.label}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`ml-auto shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    id={submenuId}
                    inert={!isExpanded}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-3 pl-8 sm:pl-12">
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="mb-1 flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                        >
                          {l.overviewLabel}
                        </Link>
                        {l.children!.map((child, childIndex) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`group/sub flex min-h-11 items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${
                              pathname === child.href ? "text-brand" : "text-white/85"
                            }`}
                          >
                            <span className="shrink-0 font-display text-xs text-brand/80">{index}.{childIndex + 1}</span>
                            <span className="max-w-md text-sm font-medium leading-snug">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline gap-4 border-b border-white/10 py-3.5 md:py-4 ${
                  isActive ? "text-brand" : "text-white"
                }`}
              >
                <span className="font-display text-sm text-brand/70">{String(index).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-semibold transition-all group-hover:translate-x-2 group-hover:text-brand md:text-3xl">
                  {l.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
