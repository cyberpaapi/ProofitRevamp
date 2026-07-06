"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/water-inspection", label: "Water Inspection" },
      { href: "/services/home-inspection", label: "Home Inspection" },
      { href: "/services/proofit-care-plus", label: "Proofit Care+" },
    ],
  },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-[0_2px_20px_rgba(23,24,26,0.08)] backdrop-blur" : "bg-paper/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Proofit — home" className="shrink-0 py-3">
          <Image
            src="/images/logo.svg"
            alt="Proofit"
            width={150}
            height={50}
            priority
            className={`h-auto transition-all duration-300 ${scrolled ? "w-[120px]" : "w-[150px]"}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm font-semibold transition-colors hover:text-brand ${
                    isActive(item.href) ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden className="transition-transform duration-200 group-hover:rotate-180">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full w-60 translate-y-2 rounded-xl border border-line bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-soft hover:text-brand-deep"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 text-sm font-semibold transition-colors hover:text-brand ${
                  isActive(item.href) ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="ml-3 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_-6px_rgba(247,148,29,0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            Book an Inspection
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg lg:hidden"
        >
          <div className="relative h-4 w-6">
            <span className={`absolute left-0 top-0 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? "top-2 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-6 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-4 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? "top-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          open ? "max-h-[calc(100dvh-64px)] border-t border-line" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col px-4 py-4">
          <Link href="/" className="border-b border-line py-3.5 font-semibold">Home</Link>
          {nav.map((item) =>
            item.children ? (
              <div key={item.href} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setMobileServices(!mobileServices)}
                  aria-expanded={mobileServices}
                  className="flex w-full cursor-pointer items-center justify-between py-3.5 font-semibold"
                >
                  {item.label}
                  <span className={`text-xl text-brand transition-transform duration-200 ${mobileServices ? "rotate-45" : ""}`} aria-hidden>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${mobileServices ? "max-h-60 pb-2" : "max-h-0"}`}>
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="block py-2.5 pl-4 text-sm font-medium text-ink-soft">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="border-b border-line py-3.5 font-semibold">
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="mt-4 rounded-full bg-brand px-5 py-3 text-center font-bold text-white"
          >
            Book an Inspection
          </Link>
        </nav>
      </div>
    </header>
  );
}
