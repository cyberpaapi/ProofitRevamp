import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Proofit Care+ — From Inspection to Execution",
  description:
    "Proofit Care+ combines technical inspection, diagnosis, repair execution, restoration and preventive maintenance: waterproofing, civil repair, STP/ETP, facility management, HVAC, pest control and more — one partner, multiple solutions.",
};

const services = [
  {
    title: "Water Leakage & Waterproofing Solutions",
    body: [
      "Water leakage can damage walls, ceilings, electrical systems, furniture, structural components, and interior finishes. Treating only the visible damp area may not permanently resolve the problem.",
      "Proofit Care+ provides inspection-led water leakage rectification and waterproofing solutions for residential, commercial, institutional, and industrial properties.",
      "Our services include terrace waterproofing, bathroom and wet-area waterproofing, external wall waterproofing, basement waterproofing, water seepage rectification, crack filling, deteriorated joint treatment, and associated structural repair works.",
      "Where required, advanced inspection techniques such as thermal imaging and non-invasive moisture investigation can be used to help identify temperature anomalies, moisture patterns, and probable areas of water ingress before repair work begins.",
      "Our objective is to investigate first, recommend the appropriate treatment, and execute the repair systematically.",
    ],
  },
  {
    title: "Civil Repair & Restoration",
    body: [
      "Buildings require regular repairs and restoration to maintain their safety, functionality, appearance, and long-term condition.",
      "Proofit Care+ undertakes civil repair and restoration works for housing societies, individual apartments, commercial properties, hospitals, institutions, and industrial facilities.",
      "Our services include masonry work, plaster repairs, tile replacement, painting and protective coatings, crack repairs, structural repair works, damaged surface restoration, and renovation services.",
      "Every project begins with an assessment of the affected area, followed by preparation of the proposed scope of work, execution planning, and professional implementation by the appropriate technical team.",
    ],
  },
  {
    title: "STP, ETP & Water Management",
    body: [
      "Efficient water management systems are essential for residential societies, commercial properties, hospitals, and industrial facilities.",
      "Proofit Care+ provides solutions for the installation, operation, maintenance, and upkeep of Sewage Treatment Plants (STP), Effluent Treatment Plants (ETP), and associated water management systems.",
      "Our services include STP and ETP installation, operations and maintenance support, water treatment solutions, pump maintenance, plumbing repairs, and preventive maintenance of water management infrastructure.",
      "We work with clients to improve operational reliability, reduce equipment downtime, and maintain essential property infrastructure.",
    ],
  },
  {
    title: "Professional Water Tank Cleaning",
    body: [
      "Regular cleaning and maintenance of water storage tanks is important for maintaining hygiene and reducing the accumulation of sediment, dirt, and other contaminants.",
      "Proofit Care+ provides professional water tank cleaning services for underground water tanks, overhead tanks, hospital water tanks, industrial water storage systems, commercial properties, and housing societies.",
      "Our teams follow a systematic cleaning process based on the requirements, size, accessibility, and condition of the water storage system.",
    ],
  },
  {
    title: "Facility Management Services",
    body: [
      "Managing a property requires coordination between multiple technical services, maintenance teams, vendors, and preventive maintenance activities.",
      "Proofit Care+ provides integrated facility management solutions designed to simplify property operations and maintenance.",
      "Our services include housing society maintenance support, building maintenance services, preventive maintenance programs, technical vendor coordination, property upkeep, maintenance planning, and customized Annual Maintenance Contracts (AMC).",
      "Our objective is to provide clients with a dependable single point of coordination for their recurring property maintenance requirements.",
    ],
  },
  {
    title: "Deep Cleaning Services",
    body: [
      "Proofit Care+ provides professional deep cleaning and specialized cleaning solutions for residential, commercial, institutional, and industrial properties.",
      "Our services are available for housing societies, hospitals, schools and colleges, offices, commercial buildings, industrial facilities, and common areas.",
      "Cleaning programs can be customized according to the property type, area, usage, frequency, and specific operational requirements.",
    ],
  },
  {
    title: "HVAC & Air Conditioning Services",
    body: [
      "Proper maintenance of air conditioning and HVAC systems helps maintain indoor comfort, operational efficiency, and equipment performance.",
      "Proofit Care+ provides AC installation, AC repair, preventive maintenance, Annual Maintenance Contracts, and duct cleaning services.",
      "Our HVAC solutions are available for housing societies, commercial properties, offices, hospitals, institutions, and other facilities requiring regular technical support.",
    ],
  },
  {
    title: "Pest Control Services",
    body: [
      "Pest infestations can affect hygiene, property conditions, and the overall safety and comfort of occupants.",
      "Proofit Care+ provides pest management solutions for residential societies, commercial properties, hospitals, institutions, and industrial facilities.",
      "Our services include general pest control, termite treatment, rodent control, mosquito treatment, and cockroach treatment.",
      "Treatment programs can be customized based on the property type, severity of infestation, and requirement for periodic preventive pest management.",
    ],
  },
  {
    title: "Security & IT Solutions",
    body: [
      "Modern properties depend on reliable security and technology infrastructure for everyday operations.",
      "Proofit Care+ provides CCTV installation and maintenance, intercom systems, access control systems, network infrastructure support, computer maintenance services, and IT support for housing societies and commercial buildings.",
      "We help clients coordinate the installation, maintenance, and ongoing technical support of essential security and IT infrastructure.",
    ],
  },
  {
    title: "Landscape & Horticulture Maintenance",
    body: [
      "Well-maintained outdoor spaces contribute to the appearance, usability, and overall environment of a property.",
      "Proofit Care+ provides landscape development and horticulture maintenance services for housing societies, commercial properties, hospitals, institutions, business parks, and other large properties.",
      "Our services include garden maintenance, tree pruning and trimming, lawn care and grass cutting, irrigation system maintenance, seasonal plantation, landscape development, weed and pest control, and maintenance of business parks and society landscaping.",
      "We offer both one-time landscaping solutions and recurring maintenance programs based on the requirements of the property.",
    ],
  },
  {
    title: "Façade & High-Rise Glass Cleaning Services",
    body: [
      "Maintaining the external façade of high-rise buildings requires specialized equipment, trained personnel, appropriate safety procedures, and professional supervision.",
      "Proofit Care+ provides façade maintenance and high-rise cleaning solutions for commercial towers, residential buildings, hospitals, corporate buildings, hotels, institutions, and business parks.",
      "Our services include external glass cleaning, high-rise window cleaning, rope-access cleaning, ACP panel cleaning, building façade washing, commercial tower cleaning, and periodic façade maintenance programs.",
      "Work is planned according to the building configuration, accessibility, site conditions, and required safety protocols.",
    ],
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
    desc: "We believe property owners and facility managers should understand the work being recommended and executed. We provide clear scopes of work, quotations, execution updates, and documentation based on project requirements.",
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
    desc: "Many expensive property problems develop gradually. Preventive inspections and scheduled maintenance can help identify defects earlier, reduce unexpected breakdowns, and improve the long-term condition of the property.",
  },
  {
    title: "Residential, Commercial & Industrial Expertise",
    desc: "Our services are designed to support individual property owners, housing societies, hospitals, commercial buildings, institutions, business parks, and industrial facilities.",
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
      <PageHero
        eyebrow="Proofit Care+"
        title="From Inspection"
        accent="to Execution"
        lede="Inspect. Verify. Trust. Repair. One professional partner from problem identification to final execution and long-term maintenance."
        image="/images/careplus-rooftop.webp"
        imageAlt="Technician executing waterproofing repair on a rooftop terrace"
      />

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-[1.15] md:text-4xl">
              Property problems are often more complicated than they appear.
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-4 leading-relaxed text-ink-soft/85">
            <p>
              A visible damp patch may be caused by water entering from another location. Repeated waterproofing
              treatments may fail when the actual source of leakage has not been identified. Cracks, deteriorated
              grout joints, plumbing defects, façade deterioration, and inadequate maintenance can lead to recurring
              problems and unnecessary repair expenses.
            </p>
            <p>
              Proofit Care+ combines technical inspection, diagnosis, repair execution, restoration, and preventive
              maintenance to provide a more systematic approach to property care.
            </p>
            <p>
              Our teams can inspect the affected area, identify visible and hidden defects, recommend an appropriate
              scope of work, execute the required repairs, document the work carried out, and provide ongoing
              maintenance support where required.
            </p>
            <p className="font-semibold text-ink">
              This allows our clients to work with one professional partner from problem identification to final
              execution and long-term maintenance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our services" title="Eleven solutions." accent="One platform." center />
          <div className="space-y-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 4) * 60}>
                <details className="group tile open:border-brand/60 open:shadow-md" {...(i === 0 ? { open: true } : {})}>
                  <summary className="flex cursor-pointer items-center gap-4 p-5 marker:content-none [&::-webkit-details-marker]:hidden md:p-6">
                    <span className="font-display text-xl font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-display text-lg font-semibold leading-snug">{s.title}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand transition-transform duration-200 group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <div className="space-y-3 px-5 pb-6 leading-relaxed text-ink-soft/85 md:px-6 md:pl-[3.75rem]">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="tile-black p-7 md:p-12">
              <SectionHeading eyebrow="Why Proofit Care+" title="Why property owners" accent="stay with us." dark center />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {whyChoose.map((w, i) => (
                  <Reveal key={w.title} delay={Math.min(i, 5) * 70} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h3 className="flex items-start gap-2.5 font-display font-semibold text-brand">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden>
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {w.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">{w.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How we work" title="A repair job is not the goal." accent="A relationship is." center />
          <Reveal>
            <ol className="flex flex-wrap items-center justify-center gap-3">
              {howWeWork.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="rounded-full border border-line bg-white px-5 py-2.5 font-display text-sm font-semibold">
                    {step}
                  </span>
                  {i < howWeWork.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="#F7941D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={150} className="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-ink-soft/85">
            <p>
              Whether you are dealing with recurring water leakage, deteriorating building surfaces, civil repair
              requirements, STP maintenance, facility management challenges, HVAC systems, pest problems, security
              infrastructure, landscaping requirements, or high-rise façade maintenance — Proofit Care+ provides
              access to multiple property solutions through one professional platform.
            </p>
            <p className="mt-5 font-display text-xl font-semibold text-ink">
              One Stop for All Your Property Needs.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="One Partner. Multiple Solutions."
        lede="From Inspection to Execution — We've Got You Covered. Proofit Care+: Inspect. Verify. Trust. Repair."
      />
    </>
  );
}
