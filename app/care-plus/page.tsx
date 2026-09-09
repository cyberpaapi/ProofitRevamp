import CtaBand from "@/components/CtaBand";
import CareProcess from "@/components/CareProcess";
import { getPublicOfferings } from "@/lib/admin/public-content";
import type { Metadata } from "next";
import Image from "next/image";
import ArrowBtn from "@/components/ArrowBtn";
import { CareServices, CareWhyCarousel } from "@/components/CarePlusInteractive";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proofit Care+ - Complete Property Care & Facility Management",
  description:
    "Twelve integrated property care solutions covering waterproofing, civil repairs, water management, facility management, HVAC, pest control, security, landscaping and more.",
};



const whyChoose = [
  {
    title: "Inspection-Led Approach",
    desc: "Our background in professional property inspection helps us approach repairs differently. We focus on understanding the problem before recommending major rectification work.",
  },
  {
    title: "One Partner for Multiple Property Services",
    desc: "Instead of coordinating with several contractors and service providers, clients can work with Proofit Care+ for multiple property maintenance, repair, and facility management requirements.",
  },
  {
    title: "Qualified Technical Teams",
    desc: "Different property problems require different technical expertise. We coordinate appropriate professionals and technical teams based on the nature and complexity of each project.",
  },
  {
    title: "Transparent Reporting & Communication",
    desc: "Property owners and facility managers should understand the work being recommended and executed. We provide clear scopes of work, quotations, execution updates, and documentation based on project requirements.",
  },
  {
    title: "Quality Workmanship",
    desc: "Our focus is on systematic execution, appropriate materials, proper surface preparation, technical supervision, and professional completion of the assigned scope of work.",
  },
  {
    title: "Cost-Effective Solutions",
    desc: "We aim to recommend practical solutions based on the actual condition of the property instead of unnecessary or repetitive repairs.",
  },
  {
    title: "Preventive Maintenance Approach",
    desc: "Preventive inspections and scheduled maintenance can help identify defects earlier, reduce unexpected breakdowns, and improve the long-term condition of the property.",
  },
  {
    title: "Residential, Commercial & Industrial Expertise",
    desc: "Our services support individual property owners, housing societies, hospitals, commercial buildings, institutions, business parks, and industrial facilities.",
  },
];

const howWeWork = [
  "Inspect & Understand",
  "Identify the Problem",
  "Recommend the Solution",
  "Prepare the Scope of Work",
  "Execute Professionally",
  "Verify Completion",
  "Provide Ongoing Maintenance Support",
];

export default async function CarePlusPage() {
  const services = (await getPublicOfferings()).filter(item => item.category === "care-plus").map(item => ({title:item.title, body:item.description, slug:item.slug}));
  return (
    <>
      <section className="relative flex min-h-[700px] items-end overflow-hidden bg-ink pb-12 pt-28 text-white md:min-h-[540px] md:pb-14 md:pt-32">
        <Image
          src="/images/careplus-hero-mobile.webp"
          alt="Technician executing waterproofing repair on a rooftop terrace"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/careplus-hero-desktop.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <div className="absolute inset-y-0 left-0 w-[min(94%,62rem)] bg-gradient-to-r from-ink/65 via-ink/30 to-transparent" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Proofit Care+" }]} className="hero-rise mb-5" />
          <p className="hero-rise font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Proofit Care+
          </p>
          <h1 className="hero-rise mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
            From Inspection to Execution
          </h1>
          <p
            className="hero-rise mt-4 max-w-[620px] font-display text-sm font-normal leading-[1.55] text-white/90 sm:text-base md:mt-6"
            style={{ ["--rise-delay" as string]: "140ms" }}
          >
            Inspect. Verify. Trust. Repair. One professional partner from problem identification to final execution
            and long-term maintenance.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Proofit Care+</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-5xl">
              Complete Property Care. One Trusted Partner.
            </h2>
            <p className="mt-4 max-w-5xl leading-relaxed text-ink-soft/82 md:mt-7">
              Proofit Care Plus is a trusted property care and facility management company delivering reliable,
              technology-driven maintenance solutions for housing societies, hospitals, commercial buildings,
              industrial facilities, educational institutions, hotels, and corporate campuses. Our team of skilled
              professionals is committed to quality, safety, and preventive maintenance, helping clients protect
              their assets, reduce long-term maintenance costs, and enhance the performance and lifespan of their
              properties. With a customer-first approach and end-to-end execution, we ensure every property receives
              the highest standard of care under one trusted brand.
            </p>
          </Reveal>
        </div>
      </section>

      <CareServices services={services} />

      <CareWhyCarousel reasons={whyChoose} />

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">How We Work</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              One continuous path from diagnosis to care.
            </h2>
          </Reveal>

          <CareProcess steps={howWeWork} />

          <Reveal delay={150} className="mt-10 max-w-4xl">
            <p className="leading-relaxed text-ink-soft/82">
              Whether you are dealing with recurring water leakage, deteriorating building surfaces, civil repair
              requirements, STP maintenance, facility management challenges, HVAC systems, pest problems, security
              infrastructure, landscaping requirements, or high-rise facade maintenance, Proofit Care+ provides
              access to multiple property solutions through one professional platform.
            </p>
            <p className="mt-6 text-left font-display text-2xl font-semibold text-ink">
              One Stop for All Your Property Needs.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="One Partner. Multiple Solutions." lede="From inspection to execution, we provide coordinated property care through one accountable team." />
    </>
  );
}
