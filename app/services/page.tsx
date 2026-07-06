import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Water Inspection, Home Inspection & Proofit Care+",
  description:
    "Proofit's residential inspection services in Mumbai: thermal-imaging led water leakage detection, full home snag inspections, and the Proofit Care+ annual home-care plan.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Pick the inspection"
        accent="your situation needs."
        lede="Chasing a leak, taking possession, buying resale, or protecting a home for the long run — there's a Proofit service built for it."
        image="/images/inspector-snagging.webp"
        imageAlt="Proofit inspector documenting snags in a new apartment"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={80}>
              <Link
                href={`/services/${s.slug}`}
                className={`card-lift group grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-2 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-brand-deep md:text-3xl">
                    {s.name}
                  </h2>
                  <p className="mb-6 leading-relaxed text-ink-soft/80">{s.short}</p>
                  <ul className="mb-8 space-y-2">
                    {s.includes.slice(0, 3).map((inc) => (
                      <li key={inc.title} className="flex items-start gap-2.5 text-sm font-medium text-ink-soft">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                          <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {inc.title}
                      </li>
                    ))}
                  </ul>
                  <p className="font-bold text-brand">
                    View service <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Not sure which one fits?" lede="Describe your situation on WhatsApp — we'll point you to the right inspection, or tell you if you don't need one." />
    </>
  );
}
