import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies - Real Inspections, Real Outcomes",
  description:
    "How Proofit inspections played out in the field: possession snag lists builders acted on, leak mysteries solved without demolition, and neighbour disputes settled with evidence.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Findings you can"
        accent="hold in your hand."
        lede="A selection of representative engagements - anonymised, but exactly how they unfolded on site."
        image="/images/duotone-split-room.webp"
        imageAlt="Split view of a room showing water damage and its thermal signature"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 md:space-y-24 lg:px-8">
          {caseStudies.map((cs, i) => (
            <article key={cs.slug} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal from={i % 2 ? "right" : "left"}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="group relative block aspect-[16/11] overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  aria-label={`Read case study: ${cs.title}`}
                >
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {cs.service} · {cs.location}
                  </span>
                </Link>
              </Reveal>
              <Reveal delay={120}>
                <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                  Case study {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mb-5 text-2xl font-bold leading-snug md:text-3xl">
                  <Link href={`/case-studies/${cs.slug}`} className="transition-colors hover:text-brand-deep">
                    {cs.title}
                  </Link>
                </h2>
                <dl className="space-y-4 leading-relaxed">
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wider text-brand">The problem</dt>
                    <dd className="mt-1 text-ink-soft/85">{cs.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wider text-brand">What we did</dt>
                    <dd className="mt-1 text-ink-soft/85">{cs.approach}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wider text-brand">The outcome</dt>
                    <dd className="mt-1 text-ink-soft/85">{cs.outcome}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap gap-4">
                  {cs.stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-line bg-white px-5 py-3 text-center">
                      <p className="font-display text-2xl font-bold text-brand">{s.value}</p>
                      <p className="text-xs text-ink-soft/70">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  Read full case study
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Your property could be the next quiet success story." lede="Most of our best work is a problem that never got worse." />
    </>
  );
}
