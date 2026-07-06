import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const serviceLinks = [
  { href: "/services/water-inspection", label: "Water Inspection" },
  { href: "/services/home-inspection", label: "Home Inspection" },
  { href: "/services/proofit-care-plus", label: "Proofit Care+" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image src="/images/logo.svg" alt="Proofit" width={160} height={54} className="mb-4 rounded bg-white px-3 py-2" />
          <p className="text-sm leading-relaxed text-white/70">
            Independent, evidence-backed home inspections in {site.serviceArea}. International standards, thermal
            imaging, and reports that settle arguments.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand">Company</h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand">Reach Us</h3>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-brand">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener" className="transition-colors hover:text-brand">
                WhatsApp us
              </a>
            </li>
            <li className="pt-1 text-white/60">{site.serviceArea}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.legalName}. All rights reserved.
      </div>
    </footer>
  );
}
