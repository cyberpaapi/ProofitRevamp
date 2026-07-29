import type { Metadata } from "next";
import Image from "next/image";
import { CampaignFooter, CampaignHeader } from "@/components/CampaignChrome";
import LandingEnquiryPopup from "@/components/LandingEnquiryPopup";
import LandingLeadForm from "@/components/LandingLeadForm";
import Reveal from "@/components/Reveal";
import ScrollToEnquiryButton from "@/components/ScrollToEnquiryButton";

export const metadata: Metadata = {
  title: "Property Inspection & Thermal Scanning in Mumbai",
  description:
    "AI-powered property inspection, thermal scanning, water leakage detection, waterproofing diagnosis and pre-possession snagging across Mumbai and its suburbs.",
  keywords: [
    "thermal scanning Mumbai",
    "water leakage inspection Mumbai",
    "waterproofing inspection",
    "home inspection Mumbai",
    "property inspection Mumbai",
    "seepage detection",
    "dampness inspection",
    "pre possession inspection",
    "electrical audit",
    "snagging inspection",
  ],
  alternates: { canonical: "/landing-page" },
  openGraph: {
    title: "Find Hidden Property Problems Before They Become Expensive Repairs",
    description: "AI-powered thermal and property inspections across Mumbai. Limited-period monsoon offer: ₹1,000 off.",
    images: [{ url: "/images/thermal-technician.webp", alt: "Proofit technician performing a thermal property inspection" }],
  },
};

const services = [
  {
    number: "01",
    title: "Thermal Scanning",
    copy: "IR technology reveals temperature anomalies, concealed moisture paths, insulation gaps, and overheating risks that visual checks can miss.",
  },
  {
    number: "02",
    title: "Leakage & Seepage Detection",
    copy: "Trace dampness and recurring water ingress to the probable source before committing to disruptive or repeated repair work.",
  },
  {
    number: "03",
    title: "Waterproofing Diagnosis",
    copy: "Assess terraces, bathrooms, external walls, basements, joints, and cracks before choosing the right rectification approach.",
  },
  {
    number: "04",
    title: "Pre-Possession Inspection",
    copy: "Document defects, incomplete work, slope issues, plumbing concerns, and finish quality before taking possession or releasing payment.",
  },
  {
    number: "05",
    title: "Electrical Safety Audit",
    copy: "Identify visible safety concerns, overheating points, load risks, and installation defects across homes and managed properties.",
  },
  {
    number: "06",
    title: "Property Quality Audit",
    copy: "Structured quality checks for housing societies, commercial properties, industrial facilities, and managed property portfolios.",
  },
];

const audiences = [
  { title: "Housing Societies", copy: "Common-area leakage, facade concerns, terraces, tanks, recurring dampness, and preventive property checks." },
  { title: "Commercial Properties", copy: "Evidence-led assessments that help facility teams prioritise maintenance and reduce operational disruption." },
  { title: "Industrial Facilities", copy: "Thermal, moisture, electrical, and building-condition checks for higher-risk operational environments." },
  { title: "Property & Facility Managers", copy: "Consistent reporting across sites, with clear issue records and practical rectification priorities." },
];

const reportItems = [
  "Photographic evidence of observed defects",
  "Thermal and moisture findings where applicable",
  "Issue location and severity categorisation",
  "Clear rectification priorities",
  "A structured report for owners, builders, and vendors",
  "A walkthrough of important findings",
];

const faqs = [
  {
    question: "What can thermal scanning detect?",
    answer:
      "Thermal scanning helps identify temperature differences associated with moisture paths, missing insulation, overheating electrical points, and other hidden performance concerns. Findings are interpreted alongside on-site observations and suitable instruments.",
  },
  {
    question: "Do you break walls or tiles during inspection?",
    answer:
      "The inspection is designed to be non-destructive. Thermal cameras, moisture meters, visual checks, and other instruments help narrow down likely problem areas without unnecessary opening work.",
  },
  {
    question: "Who is this inspection suitable for?",
    answer:
      "Proofit works with homeowners, housing societies, commercial and industrial properties, and property or facility management companies across Mumbai and its suburbs.",
  },
  {
    question: "Can I book before taking possession of a new property?",
    answer:
      "Yes. A pre-possession inspection can document visible defects, workmanship concerns, plumbing and electrical issues, slopes, dampness, and incomplete work before handover.",
  },
  {
    question: "What happens after the inspection?",
    answer:
      "You receive an evidence-backed report with observed issues and priorities. The team can also walk you through the important findings so you can plan the next steps with clarity.",
  },
];

const Check = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m4 12.5 5 5L20 6.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

export default function LandingPage() {
  return (
    <>
      <CampaignHeader />
      <section className="relative overflow-hidden bg-[#f2efe8] px-4 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:px-8">
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-brand/12 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[32px] bg-ink shadow-[0_40px_100px_-55px_rgba(17,17,18,0.7)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex min-h-[610px] items-end overflow-hidden p-7 text-white sm:p-10 lg:min-h-[720px] lg:p-14">
            <Image
              src="/images/thermal-technician.webp"
              alt="Proofit technician in orange uniform scanning a property wall with a thermal camera"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[48%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/62 to-ink/10" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" aria-hidden />

            <div className="relative max-w-3xl">
              <div className="hero-rise inline-flex rounded-full border border-white/20 bg-ink/45 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
                Mumbai & Mumbai Suburbs
              </div>
              <h1 className="hero-rise mt-6 font-display text-[2.7rem] font-semibold leading-[1.03] sm:text-5xl lg:text-[4.2rem]">
                Find hidden property problems before they become expensive repairs.
              </h1>
              <p
                className="hero-rise mt-4 max-w-2xl text-base leading-relaxed text-white/82 sm:text-lg md:mt-6"
                style={{ ["--rise-delay" as string]: "120ms" }}
              >
                AI-powered thermal scanning and professional property inspections for leakage, seepage, dampness,
                defects, electrical risks, and pre-possession quality checks.
              </p>
              <div className="hero-rise mt-7 flex flex-wrap gap-2.5" style={{ ["--rise-delay" as string]: "220ms" }}>
                {["5,000+ inspections", "Professional trained team", "Evidence-backed reports"].map((item) => (
                  <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur-md">
                    {item}
                  </span>
                ))}
              </div>
              <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ ["--rise-delay" as string]: "300ms" }}>
                <ScrollToEnquiryButton targetId="landing-enquiry" variant="orange">Claim ₹1,000 Off</ScrollToEnquiryButton>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-brand p-4 sm:p-8 lg:p-10">
            <LandingLeadForm />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {[
            ["5,000+", "Inspections completed"],
            ["AI + IR", "Technology-backed checks"],
            ["Mumbai", "City and suburbs"],
            ["Clear", "Accurate reporting"],
          ].map(([value, label], index) => (
            <div key={label} className={`py-7 ${index % 2 ? "pl-5" : "pr-5"} ${index > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""}`}>
              <p className="font-display text-2xl font-semibold text-brand sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs leading-snug text-ink-soft/60 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink">
              <Image
                src="/images/thermal-camera-screen.webp"
                alt="Thermal camera revealing hidden moisture in a wall"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-brand px-5 py-4 text-white shadow-xl">
                <p className="font-display text-2xl font-semibold">See beyond the stain.</p>
                <p className="mt-1 text-sm text-white/80">Find the probable source.</p>
              </div>
            </div>
          </Reveal>
          <Reveal from="right">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Why Inspect First?</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              A damp patch is usually the symptom, not the source.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft/75 md:mt-6">
              Repainting, patch repairs, or repeated waterproofing can fail when the real leakage path has not been
              identified. Proofit combines structured visual checks with thermal scanning and calibrated instruments
              to help locate hidden risks before repair decisions are made.
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {["Avoid repeated repair spending", "Prioritise the right areas", "Document defects clearly", "Make decisions with evidence"].map((item) => (
                <li key={item} className="flex items-center gap-3 font-display text-sm font-semibold"><Check />{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Inspection Solutions</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              One inspection team. Six high-impact checks.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={Math.min(index, 5) * 60}>
                <article className={`h-full rounded-2xl border p-7 ${index === 0 ? "border-brand bg-brand text-white" : "border-ink/12 bg-white"}`}>
                  <p className={`font-display text-sm font-semibold ${index === 0 ? "text-white/65" : "text-brand"}`}>{service.number}</p>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight">{service.title}</h3>
                  <p className={`mt-4 text-sm leading-relaxed ${index === 0 ? "text-white/82" : "text-ink-soft/72"}`}>{service.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Built for Mumbai Properties</p>
            <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              From one apartment to an entire property portfolio.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience, index) => (
              <Reveal key={audience.title} delay={index * 70} className="bg-ink p-7 md:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{audience.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{audience.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">The Proofit Report</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              Not an opinion. A clear record of what we found.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft/75 md:mt-6">
              The inspection is translated into an accurate, structured report that helps owners, committees,
              facility managers, builders, and repair vendors work from the same evidence.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {reportItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft/80"><Check />{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image
                src="/images/report-review-couple.webp"
                alt="Property owners reviewing a Proofit inspection report"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f2efe8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">How It Works</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">Four steps from concern to clarity.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Share the concern", "Tell us the property type, location, and issue you want checked."],
              ["02", "Inspect on site", "A trained inspector follows a structured checklist and uses suitable instruments."],
              ["03", "Review the evidence", "Observed defects, thermal findings, and priorities are organised clearly."],
              ["04", "Plan the next step", "Use the report to discuss rectification with your builder, committee, or vendor."],
            ].map(([number, title, copy], index) => (
              <Reveal key={title} delay={index * 70}>
                <article className="h-full border-t-2 border-brand pt-5">
                  <p className="font-display text-sm font-semibold text-brand">{number}</p>
                  <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft/68">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Questions</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] md:text-5xl">Before you book.</h2>
            <p className="mt-3 max-w-md leading-relaxed text-ink-soft/70 md:mt-5">
              Share the property details and concern through the enquiry form. A Proofit team member will follow up
              within 24–48 hours.
            </p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={Math.min(index, 4) * 50}>
                <details className="group rounded-2xl border border-ink/12 bg-white open:border-brand">
                  <summary className="flex cursor-pointer items-center justify-between gap-5 p-5 font-display font-semibold marker:content-none [&::-webkit-details-marker]:hidden sm:p-6">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-ink-soft/72 sm:px-6">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16 text-white md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/65">Monsoon Inspection Offer</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
              Claim ₹1,000 off before the next repair bill.
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex shrink-0 flex-wrap gap-3">
            <ScrollToEnquiryButton targetId="landing-enquiry" variant="dark">Request Inspection</ScrollToEnquiryButton>
          </Reveal>
        </div>
      </section>
      <CampaignFooter idPrefix="landing-footer-enquiry" />
      <LandingEnquiryPopup />
    </>
  );
}
