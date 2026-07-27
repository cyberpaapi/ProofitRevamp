"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/landing-page", label: "Landing Page" },
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/services", label: "Services" },
  { href: "/care-plus", label: "Proofit Care+" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
  { href: "/services/water-inspection", label: "Water Inspection" },
  { href: "/services/home-inspection", label: "Home Inspection" },
  { href: "/care-plus", label: "Proofit Care+" },
];

export default function Header() {
  const pathname = usePathname();
  const [heroMode, setHeroMode] = useState(pathname === "/");
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          heroMode
            ? "bg-gradient-to-b from-ink/70 to-transparent text-white"
            : "bg-paper/95 text-ink shadow-[0_1px_0_rgba(17,17,18,0.06)] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4 md:gap-6 lg:gap-8">
            <Link href="/" aria-label="Proofit — home" className="shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Proofit"
                width={128}
                height={43}
                priority
                className={`h-auto w-[108px] transition-[filter] duration-300 md:w-[128px] ${
                  heroMode ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex shrink-0 cursor-pointer items-center gap-2 font-display text-sm font-semibold transition-colors hover:text-brand md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              Menu
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
              <Link
                href="/about"
                className="font-display text-sm font-semibold transition-colors hover:text-brand"
              >
                About
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

          <Link
            href="/contact"
            className={`group inline-flex h-10 shrink-0 items-center rounded-full shadow-[0_4px_18px_rgba(17,17,18,0.18)] transition-all hover:-translate-y-0.5 ${
              heroMode ? "bg-white text-ink" : "bg-ink text-white"
            }`}
          >
            <span className="whitespace-nowrap pl-4 font-display text-sm font-semibold">Enquire Now</span>
            <span className={`mx-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:translate-x-0.5 ${
              heroMode ? "text-white" : "text-ink"
            }`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </header>

      {/* Full menu overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink text-white transition-all duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Image src="/images/logo.svg" alt="Proofit" width={128} height={43} className="h-auto w-[110px] rounded-md bg-white/95 px-2 py-1 md:w-[128px]" />
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
        <nav aria-label="Site" className="mx-auto grid h-[calc(100dvh-80px)] max-w-7xl content-center gap-1 overflow-y-auto px-4 sm:px-6 lg:grid-cols-2 lg:gap-x-16 lg:px-8">
          {menuLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-baseline gap-4 border-b border-white/10 py-3.5 md:py-4 ${
                pathname === l.href ? "text-brand" : "text-white"
              }`}
            >
              <span className="font-display text-sm text-brand/70">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl font-semibold transition-all group-hover:translate-x-2 group-hover:text-brand md:text-3xl">
                {l.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
