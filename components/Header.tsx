"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
  { href: "/services/water-inspection", label: "Water Inspection" },
  { href: "/services/home-inspection", label: "Home Inspection" },
  { href: "/services/proofit-care-plus", label: "Proofit Care+" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
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
        className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-300 ${
          scrolled ? "bg-ink/95 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur" : "bg-gradient-to-b from-ink/70 to-transparent"
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
                className="h-auto w-[96px] rounded-md bg-white/95 px-2 py-1 md:w-[120px]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex shrink-0 cursor-pointer items-center gap-2 font-display text-sm font-semibold transition-colors hover:text-brand"
              aria-label="Open menu"
              aria-expanded={open}
            >
              Menu
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Services dropdown (desktop) */}
            <div className="group relative hidden lg:block">
              <Link
                href="/services"
                className="flex items-center gap-1.5 font-display text-sm font-semibold transition-colors hover:text-brand"
              >
                Services
                <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden className="transition-transform duration-200 group-hover:rotate-180">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </Link>
              <div className="invisible absolute left-0 top-full w-56 translate-y-2 rounded-xl border border-white/10 bg-ink p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-brand"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="group inline-flex h-10 shrink-0 items-center rounded-full bg-white text-ink shadow-[0_4px_18px_rgba(17,17,18,0.25)] transition-all hover:-translate-y-0.5"
          >
            <span className="whitespace-nowrap pl-4 font-display text-sm font-semibold">Enquire Now</span>
            <span className="mx-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-0.5">
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
