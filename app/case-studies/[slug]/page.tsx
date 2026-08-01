import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { caseStudies } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return {};

  return {
    title: `${study.title} - Case Study`,
    description: study.outcome,
    openGraph: {
      type: "article",
      title: study.title,
      description: study.outcome,
      images: [{ url: study.image }],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const studyIndex = caseStudies.findIndex((item) => item.slug === slug);
  const study = caseStudies[studyIndex];

  if (!study) notFound();

  const nextStudy = caseStudies[(studyIndex + 1) % caseStudies.length];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.outcome,
    image: `${site.url}${study.image}`,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
  };

  return (
    <>
      <article>
        <header className="relative flex min-h-[620px] items-end overflow-hidden bg-ink pb-14 pt-32 text-white md:min-h-[570px] md:pb-20">
          <Image src={study.image} alt={study.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/10" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Case Studies", href: "/case-studies" },
                { label: study.title },
              ]}
              className="hero-rise mb-5"
            />
            <p className="hero-rise font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Case study {String(studyIndex + 1).padStart(2, "0")}
            </p>
            <h1 className="hero-rise mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl" style={{ ["--rise-delay" as string]: "120ms" }}>
              {study.title}
            </h1>
            <p className="hero-rise mt-5 text-base font-normal text-white/80 md:text-lg" style={{ ["--rise-delay" as string]: "220ms" }}>
              {study.service} · {study.location}
            </p>
          </div>
        </header>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal className="grid gap-3 sm:grid-cols-3">
              {study.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-line bg-white p-6 text-center">
                  <p className="font-display text-3xl font-semibold text-brand-deep">{stat.value}</p>
                  <p className="mt-1 text-sm text-ink-soft/70">{stat.label}</p>
                </div>
              ))}
            </Reveal>

            <div className="mt-14 space-y-12 md:mt-20">
              {[
                { number: "01", title: "The problem", copy: study.problem },
                { number: "02", title: "What we did", copy: study.approach },
                { number: "03", title: "The outcome", copy: study.outcome },
              ].map((section, index) => (
                <Reveal key={section.title} delay={index * 70} className="grid gap-4 border-t border-line pt-7 md:grid-cols-[160px_1fr] md:gap-10">
                  <div>
                    <p className="font-display text-xs font-semibold tracking-[0.16em] text-brand">{section.number}</p>
                    <h2 className="mt-2 font-display text-xl font-semibold text-ink">{section.title}</h2>
                  </div>
                  <p className="max-w-3xl text-lg leading-relaxed text-ink-soft/85">{section.copy}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16 flex flex-col items-start justify-between gap-5 rounded-2xl bg-brand-soft p-7 sm:flex-row sm:items-center md:p-9">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-deep">Next case study</p>
                <p className="mt-2 max-w-xl text-lg font-semibold leading-snug">{nextStudy.title}</p>
              </div>
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-ink px-6 py-3 font-display text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                Read next
              </Link>
            </Reveal>
          </div>
        </section>
      </article>

      <CtaBand title="Need the same clarity for your property?" lede="Our inspectors turn hidden risks into clear findings and practical next steps." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
