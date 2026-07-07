import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/services/home-inspection", label: "New Flat Possession Inspection" },
  { href: "/services/home-inspection", label: "Resale Property Inspection" },
  { href: "/services/home-inspection", label: "Rental Move-In / Out Inspection" },
  { href: "/services/water-inspection", label: "Thermal Inspection" },
  { href: "/services/home-inspection", label: "Pre/Post Renovation Inspection" },
  { href: "/services/home-inspection", label: "Builder Quality Audit" },
];

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Career" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/process", label: "Methodology" },
];

const socials = [
  { label: "Instagram", d: "M8 0C5.8 0 5.6 0 4.7.1 3.9.1 3.3.3 2.8.5c-.6.2-1 .5-1.5 1S.7 2.3.5 2.8C.3 3.3.1 3.9.1 4.7 0 5.6 0 5.8 0 8s0 2.4.1 3.3c0 .8.2 1.4.4 1.9.2.5.5 1 1 1.5s.9.7 1.4 1c.5.2 1 .3 1.9.4.9 0 1.1.1 3.3.1s2.4 0 3.3-.1c.8 0 1.4-.2 1.9-.4a4 4 0 0 0 2.4-2.4c.2-.5.3-1 .4-1.9V8c0-2.2 0-2.4-.1-3.3 0-.8-.2-1.4-.4-1.9a4 4 0 0 0-2.4-2.4C12.7.3 12.1.1 11.3.1 10.4 0 10.2 0 8 0zm0 1.4c2.1 0 2.4 0 3.2.1.8 0 1.2.2 1.5.3.4.1.7.3.9.6.3.3.5.6.6 1 .1.2.3.6.3 1.4.1.8.1 1.1.1 3.2s0 2.4-.1 3.2c0 .8-.2 1.2-.3 1.5-.1.4-.3.7-.6.9-.3.3-.6.5-.9.6-.3.1-.7.3-1.5.3-.8.1-1.1.1-3.2.1s-2.4 0-3.2-.1c-.8 0-1.2-.2-1.5-.3a2.6 2.6 0 0 1-1-.6 2.6 2.6 0 0 1-.5-.9c-.1-.3-.3-.7-.3-1.5C1.4 10.4 1.4 10.1 1.4 8s0-2.4.1-3.2c0-.8.2-1.2.3-1.5.1-.4.3-.7.6-.9.3-.3.5-.5.9-.6.3-.1.7-.3 1.5-.3.8-.1 1.1-.1 3.2-.1zM8 3.9a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2zm0 6.8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4zm5.2-7a1 1 0 1 1-1.9 0 1 1 0 0 1 1.9 0z" },
  { label: "LinkedIn", d: "M0 1.1C0 .5.5 0 1.2 0h13.6c.7 0 1.2.5 1.2 1.1v13.8c0 .6-.5 1.1-1.2 1.1H1.2C.5 16 0 15.5 0 14.9V1.1zm4.9 12.3V6.2H2.5v7.2h2.4zM3.7 5.2c.9 0 1.4-.5 1.4-1.2 0-.7-.5-1.2-1.3-1.2-.9 0-1.4.5-1.4 1.2 0 .7.5 1.2 1.3 1.2zm5 8.2V9.4c0-.2 0-.4.1-.6.2-.4.5-.9 1.2-.9.9 0 1.2.6 1.2 1.6v3.9h2.4V9.2c0-2.2-1.2-3.2-2.7-3.2-1.3 0-1.8.7-2.1 1.2v-1H6.3v7.2h2.4z" },
  { label: "Facebook", d: "M16 8a8 8 0 1 0-9.2 7.9v-5.6h-2V8h2V6.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V8h2.2l-.4 2.3H9.2v5.6A8 8 0 0 0 16 8z" },
  { label: "YouTube", d: "M15.7 4.2a2 2 0 0 0-1.4-1.4C13 2.4 8 2.4 8 2.4s-5 0-6.3.3A2 2 0 0 0 .3 4.2C0 5.4 0 8 0 8s0 2.6.3 3.8a2 2 0 0 0 1.4 1.4c1.2.4 6.3.4 6.3.4s5 0 6.3-.3a2 2 0 0 0 1.4-1.4C16 10.6 16 8 16 8s0-2.6-.3-3.8zM6.4 10.4V5.6L10.6 8l-4.2 2.4z" },
  { label: "X", d: "M9.5 6.8 15.3 0h-1.4L8.9 5.9 4.9 0H.3l6.1 8.9L.3 16h1.4l5.3-6.2 4.3 6.2h4.6L9.5 6.8zm-1.9 2.2-.6-.9L2.2 1h2.1l4 5.7.6.9 5.1 7.4h-2.1L7.6 9z" },
];

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(220px,300px)_1fr_minmax(220px,300px)] lg:px-8">
        {/* Brand */}
        <div>
          <Image src="/images/logo.svg" alt="Proofit" width={150} height={50} className="mb-4 rounded-md bg-white px-3 py-2" />
          <p className="text-sm leading-relaxed text-white/60">
            Independent, evidence-backed home inspections in {site.serviceArea}. International standards, thermal
            imaging, and reports that settle arguments.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm text-white/70">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-brand">{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">{site.email}</a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-6 text-sm font-medium text-white/45">Services</h3>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="font-display font-semibold transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-6 text-sm font-medium text-white/45">Links</h3>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="font-display font-semibold transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-white/45 sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={`Proofit on ${s.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-brand hover:text-brand"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
