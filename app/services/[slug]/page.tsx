import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import { services } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — Proofit Services`,
    description: service.short,
    openGraph: { images: [{ url: service.image }] },
  };
}

const formDefault: Record<string, string> = {
  "water-inspection": "Water Inspection",
  "home-inspection": "Home Inspection — New Flat / Possession",
  "proofit-care-plus": "Proofit Care+ (Annual Plan)",
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.hero}
        image={service.image}
        imageAlt={service.name}
      />

      {/* Intro + includes */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <Reveal className="space-y-4 leading-relaxed text-ink-soft/85 lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold text-ink md:text-3xl">The problem we solve</h2>
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <div className="tile p-6">
                <h3 className="mb-3 font-bold text-ink">Ideal for</h3>
                <ul className="space-y-2.5">
                  {service.idealFor.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              <Reveal>
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">What&apos;s included</h2>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {service.includes.map((inc, i) => (
                  <Reveal key={inc.title} delay={i * 90} className="tile tile-hover p-6">
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="mb-2 font-bold">{inc.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/75">{inc.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Get a quote"
              title="Tell us about"
              accent="the property."
              lede="Share your configuration and concern — we'll respond with a quote and available slots the same day."
            />
            <Reveal delay={100} className="-mt-4 space-y-3 text-ink-soft/80">
              {["No obligation — a quote is free.", "Same-day response, report in 48 hours after inspection."].map((line) => (
                <p key={line} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {line}
                </p>
              ))}
            </Reveal>
          </div>
          <Reveal from="right">
            <EnquiryForm defaultService={formDefault[service.slug]} />
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-8 text-2xl font-bold">Other services</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 100}>
                <Link href={`/services/${o.slug}`} className="tile tile-hover group flex items-center gap-5 p-5">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image src={o.image} alt={o.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold transition-colors group-hover:text-brand-deep">{o.name}</h3>
                    <p className="line-clamp-2 text-sm text-ink-soft/70">{o.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
