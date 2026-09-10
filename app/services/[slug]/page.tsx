import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import EnquiryForm from "@/components/EnquiryForm";
import FaqGrid from "@/components/FaqGrid";
import ArrowBtn from "@/components/ArrowBtn";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import copyByService from "@/lib/service-page-copy.json";
import { getPublicOfferings } from "@/lib/admin/public-content";
import { seedOfferings, slugify } from "@/lib/admin/offering-seeds";

type Params = { params: Promise<{ slug: string }> };
type ServiceSlug = keyof typeof copyByService;
const isServiceSlug = (slug: string): slug is ServiceSlug => Object.hasOwn(copyByService, slug);

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service || !isServiceSlug(slug)) return {};
  return { title: `${service.name} - Proofit Services`, description: copyByService[slug].meta, openGraph: { images: [{ url: service.image }] } };
}

function TickList({ items }: { items: string[] }) {
  return <ul className="space-y-4">{items.map((item) => (
    <li key={item} className="flex items-start gap-3 leading-relaxed">
      <Image src="/images/proofit-orange-tick-black.webp" alt="" width={24} height={24} className="mt-1 h-6 w-6 shrink-0 rounded" />
      <span>{item}</span>
    </li>
  ))}</ul>;
}

const formServices = {
  "water-inspection": ["Water leakage and Seepage Inspection", "Pre Possession Inspection", "Resale Property Inspection", "Rental Move-In / Move-Out Inspection", "Thermal Inspection", "Pre-Renovation / Post-Renovation Inspection"],
  "home-inspection": ["Pre Possession Inspection", "Resale Property Inspection", "Rental Move-In / Move-Out Inspection", "Pre-Renovation / Post-Renovation Inspection", "Builder Quality Audit"],
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  if (slug === "proofit-care-plus") redirect("/care-plus");
  const service = services.find((item) => item.slug === slug);
  if (!service || !isServiceSlug(slug)) notFound();
  const copy = copyByService[slug];
  const offerings = (await getPublicOfferings()).filter(item => item.category === slug);
  // Update seeded text on these pages, preserving custom admin copy, visibility,
  // order, image choices and newly added cards. Do not mutate the shared store.
  const details = offerings.flatMap(item => {
    const next = copy.details.items.find(detail => detail.id === item.id || detail.id === item.slug);
    const seed = seedOfferings.find(original => original.id === item.id);
    if (!next && seed) return [];
    return [{ ...item,
      title: next && item.title === seed?.title ? next.title : item.title,
      description: next && item.description === seed?.description ? next.body : item.description,
      benefits: next && JSON.stringify(item.benefits) === JSON.stringify(seed?.benefits) ? next.benefits : item.benefits,
      when: next?.when, originalAnchor: next?.id,
    }];
  });
  const steps = copy.process.steps.map((step, index) => {
    const legacy = slug === "water-inspection" ? service.includes[index] : undefined;
    const anchor = legacy ? slugify(legacy.title) : undefined;
    const managed = anchor && offerings.find(item => item.id === `water-${anchor}`);
    return { ...step, anchor,
      title: managed && managed.title !== legacy?.title ? managed.title : step.title,
      body: managed && managed.description !== legacy?.desc ? managed.description : step.body,
    };
  });

  return <>
    <PageHero eyebrow={service.name} title={copy.hero} lede={copy.lede} image={service.image} imageAlt={service.name} breadcrumbLabel={service.name} breadcrumbParent={{ label: "Services", href: "/services" }} />

    <section className="site-section" id="what-is-it"><div className="site-container">
      <div className="section-heading flex flex-wrap items-center gap-4">
        <ArrowBtn href="#enquire" variant="dark">Book an Inspection</ArrowBtn>
        <ArrowBtn href={site.whatsapp} external variant="orange">Chat on WhatsApp</ArrowBtn>
      </div>
      <ul className="section-heading grid gap-4 md:grid-cols-3">{copy.highlights.map(line => <li key={line} className="rounded-full border border-brand/40 bg-brand-soft px-5 py-3 text-center text-sm font-semibold">{line}</li>)}</ul>
      <SectionHeading eyebrow="In plain language" title={copy.overview.title} lede={copy.overview.body} />
      <div className="grid gap-5 md:grid-cols-3">{copy.overview.terms.map((term, index) => <Reveal key={term.title} delay={index * 70} className="tile p-6 md:p-8">
        <p className="mb-3 text-sm font-semibold text-brand-deep">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="text-xl font-semibold">{term.title}</h3><p className="mt-4 leading-relaxed text-ink-soft/85">{term.body}</p>
      </Reveal>)}</div>
      <div className="section-content grid gap-6 md:grid-cols-2">{copy.overview.tools.map(tool => <Reveal key={tool.title} className="rounded-2xl border border-brand/30 bg-brand-soft p-6 md:p-8">
        <h3 className="text-xl font-semibold">{tool.title}</h3><p className="mt-4 leading-relaxed text-ink-soft/85">{tool.body}</p>
      </Reveal>)}</div>
    </div></section>

    <section className="site-section bg-cream"><div className="site-container grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div><SectionHeading eyebrow="Why it matters" title={copy.why.title} /><div className="space-y-5 leading-relaxed text-ink-soft/85">{copy.why.paragraphs.map(text => <p key={text}>{text}</p>)}</div></div>
      <Reveal className="tile p-6 md:p-8"><h3 className="mb-6 text-xl font-semibold">{copy.why.listHeading}</h3><TickList items={copy.why.items} /></Reveal>
    </div></section>

    <section className="site-section"><div className="site-container">
      <SectionHeading eyebrow="What's included" title={copy.process.title} lede={copy.process.lede} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{steps.map((step, index) => <Reveal key={step.title} className="tile tile-hover scroll-mt-28 p-6">
        {step.anchor && <span id={step.anchor} className="block scroll-mt-28" />}
        <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-xl font-semibold">{step.title}</h3><p className="mt-4 leading-relaxed text-ink-soft/85">{step.body}</p>
      </Reveal>)}</div>
    </div></section>

    {details.length > 0 && <section className="site-section bg-cream"><div className="site-container">
      <SectionHeading eyebrow="When you need it" title={copy.details.title} lede={copy.details.lede} />
      <div className={`grid gap-6 ${details.length > 1 ? "lg:grid-cols-2" : ""}`}>{details.map(item => <Reveal key={item.id} className={`tile tile-hover overflow-hidden ${details.length === 1 ? "grid lg:grid-cols-2" : ""}`}>
        <div className="relative aspect-[16/10] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" /></div>
        <div id={item.slug} className="scroll-mt-28 p-6 md:p-8">
          {item.originalAnchor && item.originalAnchor !== item.slug && <span id={item.originalAnchor} className="block scroll-mt-28" />}
          <h3 className="text-2xl font-semibold leading-snug">{item.title}</h3>
          {item.when && <p className="mt-3 font-medium leading-relaxed text-brand-deep">{item.when}</p>}
          <p className="my-5 leading-relaxed text-ink-soft/85">{item.description}</p><TickList items={item.benefits} />
        </div>
      </Reveal>)}</div>
    </div></section>}

    <section className="site-section bg-ink text-white"><div className="site-container"><SectionHeading eyebrow="Where we operate" title={copy.serving.title} lede={copy.serving.body} dark /></div></section>

    <section className="site-section"><div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div><SectionHeading eyebrow="What you receive" title={copy.report.title} lede={copy.report.body} /><ArrowBtn href={site.whatsappSampleReport} external variant="dark">Ask for Sample Report</ArrowBtn></div>
      <Reveal><Image src="/images/inspection-report-sample.webp" alt="Sample home inspection report showing issue locations, observations and Critical, Medium or Low severity ratings" width={722} height={505} sizes="(min-width:1024px) 50vw, 100vw" quality={90} className="h-auto w-full rounded-2xl" /></Reveal>
    </div></section>

    <section className="site-section bg-cream"><div className="site-container"><SectionHeading eyebrow="Before you enquire" title="Questions we get a lot" /><FaqGrid faqs={copy.faqs} /></div></section>

    <section id="enquire" className="site-section scroll-mt-20"><div className="site-container grid gap-12 lg:grid-cols-2">
      <div><SectionHeading eyebrow="Get a quote" title={copy.enquiry.title} lede={copy.enquiry.body} /><TickList items={copy.enquiry.facts} /></div>
      <Reveal from="right"><EnquiryForm defaultService={formServices[slug][0]} serviceOptions={formServices[slug]} propertyOptions={["Home/Apartment", "Villa/Bungalow", "Office/Commercial"]} /></Reveal>
    </div></section>

    <section className="site-section"><div className="site-container">
      <SectionHeading eyebrow="Other services" title="Not what you need? Here's the rest." />
      <div className="grid gap-6 md:grid-cols-2">{services.filter(item => item.slug !== slug).map(other => <Reveal key={other.slug}>
        <Link href={other.slug === "proofit-care-plus" ? "/care-plus" : `/services/${other.slug}`} className="tile tile-hover group flex h-full items-center gap-5 p-5">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl"><Image src={other.image} alt="" fill sizes="96px" className="object-cover" /></div>
          <div className="min-w-0"><h3 className="font-semibold transition-colors group-hover:text-brand-deep">{other.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft/85">{other.short}</p></div>
        </Link>
      </Reveal>)}</div>
    </div></section>
  </>;
}
