import type { Metadata } from "next";
import Image from "next/image";
import ArrowBtn from "@/components/ArrowBtn";
import { CareServices, CareWhyCarousel } from "@/components/CarePlusInteractive";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proofit Care+ - Complete Property Care & Facility Management",
  description:
    "Twelve integrated property care solutions covering waterproofing, civil repairs, water management, facility management, HVAC, pest control, security, landscaping and more.",
};

const services = [
  {
    title: "Water Leakage & Waterproofing Solutions",
    body: "Water damage can impact structural elements, interiors, and electrical systems if left untreated. Proofit Care+ provides inspection-led waterproofing and leakage rectification for residential, commercial, institutional, and industrial properties. Our solutions include terrace, basement, bathroom, and external wall waterproofing, crack repairs, seepage treatment, and structural repairs, supported by advanced inspection techniques where required.",
  },
  {
    title: "Civil Repair & Restoration",
    body: "Maintain the safety, functionality, and appearance of your property with expert civil repair solutions. Proofit Care+ undertakes masonry, plastering, painting, tile replacement, crack repairs, structural restoration, renovation, and surface repairs. Every project begins with a technical assessment followed by planned execution and quality workmanship.",
  },
  {
    title: "STP, ETP & Water Management",
    body: "Efficient water systems are critical for every property. Proofit Care+ provides installation, operation, maintenance, and servicing of Sewage Treatment Plants (STP), Effluent Treatment Plants (ETP), pumps, plumbing systems, and water infrastructure. Our solutions improve operational efficiency, reduce downtime, and ensure reliable water management.",
  },
  {
    title: "Professional Water Tank Cleaning",
    body: "Clean water begins with clean storage. We provide professional cleaning for overhead, underground, commercial, hospital, industrial, and society water tanks. Our systematic cleaning process removes sediment and contaminants while improving hygiene, water quality, and overall system performance.",
  },
  {
    title: "Facility Management Services",
    body: "Simplify property operations with integrated facility management solutions. Proofit Care+ offers preventive maintenance, technical vendor coordination, building upkeep, maintenance planning, Annual Maintenance Contracts (AMC), and day-to-day operational support—providing clients with a single trusted partner for ongoing property care.",
  },
  {
    title: "Deep Cleaning Services",
    body: "Maintain healthier, cleaner spaces with professional deep cleaning services. We provide customized cleaning solutions for homes, offices, hospitals, educational institutions, commercial buildings, industrial facilities, and housing societies. Services are tailored to your property's size, usage, and operational requirements.",
  },
  {
    title: "HVAC & Air Conditioning Services",
    body: "Ensure year-round comfort with reliable HVAC and air conditioning services. Proofit Care+ offers AC installation, repairs, preventive maintenance, duct cleaning, and Annual Maintenance Contracts for residential, commercial, healthcare, educational, and industrial properties to improve efficiency and equipment life.",
  },
  {
    title: "Pest Control Services",
    body: "Protect your property with safe and effective pest management solutions. Our services include termite treatment, rodent control, mosquito management, cockroach treatment, and general pest control for residential, commercial, institutional, and industrial properties. Programs are customized to suit the property's needs and infestation levels.",
  },
  {
    title: "Security & IT Solutions",
    body: "Strengthen your property's security and technology infrastructure. Proofit Care+ provides CCTV systems, access control, intercom solutions, networking, computer maintenance, and IT support for housing societies, commercial buildings, and institutions—ensuring reliable operations and ongoing technical assistance.",
  },
  {
    title: "Landscape & Horticulture Maintenance",
    body: "Enhance outdoor spaces with professional landscaping and horticulture services. Our offerings include lawn care, tree pruning, irrigation maintenance, seasonal plantation, garden upkeep, landscape development, and ongoing maintenance for housing societies, business parks, hospitals, and commercial properties.",
  },
  {
    title: "Façade & High-Rise Glass Cleaning",
    body: "Maintain a clean, professional exterior with specialized façade and high-rise cleaning services. We provide rope-access glass cleaning, ACP panel cleaning, façade washing, and periodic maintenance for residential towers, commercial buildings, hotels, hospitals, and business parks, following strict safety standards.",
  },
  {
    title: "Rainwater Harvesting Solutions",
    body: "Make every drop count with sustainable rainwater harvesting solutions. Proofit Care+ designs, installs, upgrades, and maintains rainwater harvesting systems for residential societies, commercial buildings, institutions, hospitals, and industrial facilities. Our solutions help reduce water dependency, improve groundwater recharge, support regulatory compliance, and promote long-term environmental sustainability.",
  },
];

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

export default function CarePlusPage() {
  return (
    <>
      <section className="relative flex min-h-[700px] items-end overflow-hidden bg-ink pb-12 pt-28 text-white md:min-h-[540px] md:pb-14 md:pt-32">
        <Image
          src="/images/careplus-rooftop.webp"
          alt="Technician executing waterproofing repair on a rooftop terrace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/62 to-ink/20" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-transparent to-ink/25" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="hero-rise font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Proofit Care+
          </p>
          <h1 className="hero-rise mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
            From Inspection to Execution
          </h1>
          <p
            className="hero-rise mt-6 max-w-[620px] font-display text-sm font-semibold leading-[1.45] text-white/90 sm:text-base"
            style={{ ["--rise-delay" as string]: "140ms" }}
          >
            Inspect. Verify. Trust. Repair. One professional partner from problem identification to final execution
            and long-term maintenance.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Proofit Care+</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] md:text-5xl">
              Complete Property Care. One Trusted Partner.
            </h2>
            <p className="mt-7 max-w-5xl leading-relaxed text-ink-soft/82">
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
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">How We Work</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              One continuous path from diagnosis to care.
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-12 overflow-x-auto pb-5">
            <ol className="flex min-w-max items-center">
              {howWeWork.map((step, index) => (
                <li key={step} className="flex items-center">
                  <div className="w-56 shrink-0 rounded-2xl border border-ink/15 bg-white p-5">
                    <p className="font-display text-sm font-semibold text-brand">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-3 font-display text-lg font-semibold leading-snug">{step}</p>
                  </div>
                  {index < howWeWork.length - 1 && (
                    <div className="flex w-14 shrink-0 items-center" aria-hidden>
                      <span className="h-px flex-1 bg-brand" />
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="m8 5 7 7-7 7" stroke="#F7941D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={150} className="mx-auto mt-14 max-w-4xl">
            <p className="leading-relaxed text-ink-soft/82">
              Whether you are dealing with recurring water leakage, deteriorating building surfaces, civil repair
              requirements, STP maintenance, facility management challenges, HVAC systems, pest problems, security
              infrastructure, landscaping requirements, or high-rise facade maintenance, Proofit Care+ provides
              access to multiple property solutions through one professional platform.
            </p>
            <p className="mt-6 text-center font-display text-2xl font-semibold text-ink">
              One Stop for All Your Property Needs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Proofit Care+</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              One Partner. Multiple Solutions.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft/80">
              From inspection to execution, we provide coordinated property care through one accountable team.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex shrink-0 flex-wrap gap-4">
            <ArrowBtn href="/contact" variant="dark">
              Get Started
            </ArrowBtn>
            <ArrowBtn href={site.whatsapp} external variant="white" className="border border-line">
              WhatsApp Us
            </ArrowBtn>
          </Reveal>
        </div>
      </section>
    </>
  );
}
