import Image from "next/image";
import Reveal from "@/components/Reveal";
import ArrowBtn from "@/components/ArrowBtn";
import ThermalHero from "@/components/ThermalHero";
import ServicesCarousel, { type ServiceSlide } from "@/components/ServicesCarousel";
import HowItWorks from "@/components/HowItWorks";
import DarkEnquiryForm from "@/components/DarkEnquiryForm";
import HomeAboutSequence from "@/components/HomeAboutSequence";
import HomeMediaBridge from "@/components/HomeMediaBridge";
import InspectionBubbles from "@/components/InspectionBubbles";
import ModelsReveal, { ModelsRevealMobile } from "@/components/ModelsReveal";
import { site } from "@/lib/site";

/* ------------------------------ Content (per client refs) ------------------------------ */

const serviceSlides: ServiceSlide[] = [
  {
    title: "Pre Possession Inspection",
    desc: "A detailed inspection before you take possession of your new flat to identify construction defects, incomplete work, finishing issues, and quality concerns so they can be rectified by the builder.",
    benefits: [
      "Ensure promised specifications are delivered",
      "Affordable Pricing",
      "Rectification by the builder, at zero cost to you",
      "Understand the true condition of the property",
    ],
    media: { type: "placeholder" },
    href: "/services/home-inspection",
    mediaAlt: "Inspector scanning a room with a tablet showing live thermal imagery",
  },
  {
    title: "Resale Property Inspection",
    desc: "An independent condition assessment of an older property before you commit — surfacing hidden dampness, ageing plumbing and electrical systems, and structural wear that a walkthrough can't reveal.",
    benefits: [
      "Negotiate with facts, not impressions",
      "Uncover hidden dampness and seepage",
      "Assess ageing electrical & plumbing",
      "Avoid post-purchase repair shocks",
    ],
    media: { type: "image", src: "/images/svc-resale.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Inspector examining the wall of a resale apartment",
  },
  {
    title: "Rental Move In / Move Out Inspection",
    desc: "Documented condition reports at the start and end of a tenancy that protect deposits and prevent disputes — for tenants and owners alike.",
    benefits: [
      "Deposit-protecting photo evidence",
      "Neutral third-party documentation",
      "Faster, dispute-free handovers",
      "Peace of mind for both parties",
    ],
    media: { type: "image", src: "/images/svc-rental.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Inspector handing over keys at a rental move-in",
  },
  {
    title: "Water Leakage & Dampness Inspection",
    desc: "AI-enabled thermal imaging and calibrated moisture meters trace leakage and dampness to its true source — non-destructively, without breaking a single tile.",
    benefits: [
      "Find the source, not just the stain",
      "100% non-destructive methods",
      "Thermal + moisture-mapped evidence",
      "Clear rectification guidance",
    ],
    media: { type: "image", src: "/images/svc-water.webp" },
    href: "/services/water-inspection",
    mediaAlt: "Inspector pointing a thermal camera at a bathroom wall",
  },
  {
    title: "Pre / Post Renovation Inspection",
    desc: "Verify contractor workmanship before final payments — finishes, civil work, electrical and plumbing checked against what was promised.",
    benefits: [
      "Hold contractors to specification",
      "Catch defects before final payment",
      "Civil work integrity checks",
      "Documented quality benchmarks",
    ],
    media: { type: "image", src: "/images/svc-renovation.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Inspector checking freshly renovated room finishes",
  },
  {
    title: "Builder Quality Audit",
    desc: "Independent, evidence-backed quality audits for developers and societies — standardized pre-handover checks that reduce escalations and strengthen buyer confidence.",
    benefits: [
      "Standardized pre-handover audits",
      "Reduced warranty claims & escalations",
      "Data-backed quality benchmarking",
      "Stronger handovers, lower liability",
    ],
    media: { type: "image", src: "/images/svc-audit.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Inspector in a hard hat auditing new construction",
  },
];

const howSteps = [
  {
    title: "Book & Brief",
    intro: "Tell us about the property and your concern — we plan the right inspection for it:",
    points: [
      "Possession, resale, rental or leak investigation",
      "Configuration, age and leak history captured upfront",
      "Visit scheduled — all you provide is access",
    ],
    image: "/images/process-1.webp",
  },
  {
    title: "On-Site Assessment",
    intro: "A structured, room-by-room evaluation against international-standard checklists:",
    points: [
      "Civil finishes, doors, windows and fittings",
      "Every electrical point tested",
      "Plumbing fixtures and drainage flow-checked",
      "Waterproofing-critical zones scanned thermally",
    ],
    image: "/images/process-2.webp",
  },
  {
    title: "Early Risk Identification",
    intro: "Many expensive repairs begin as small technical failures:",
    points: [
      "Incorrect slope leading to water stagnation",
      "Minor waterproofing gaps that result in seepage",
      "Hidden moisture damaging woodwork and paint",
      "Plumbing inconsistencies increasing long-term leakage risk",
      "Electrical irregularities creating safety hazards",
    ],
    image: "/images/thermal-camera-screen.webp",
  },
  {
    title: "Interactive Report & Walkthrough",
    intro: "Within 48 hours, evidence you can act on:",
    points: [
      "Every finding photographed and severity-graded",
      "Thermal documentation where relevant",
      "Walkthrough of findings and rectification priorities",
    ],
    image: "/images/process-5.webp",
  },
];

const b2b = {
  title: "B2B Inspection Solutions",
  tagline: "Ensures quality, reduce post-handover disputes, and protect asset value at scale",
  idealFor:
    "Real estate developers and builders, office park and commercial asset owners, facility management companies, and property investors and portfolio managers.",
  benefits: [
    "Standardized pre-handover quality audits",
    "Drainage, waterproofing, plumbing & electrical risk evaluation",
    "Defect identification before client possession",
    "Reduced warranty claims and escalation risk",
    "Data-backed quality benchmarking across projects",
  ],
  outcome: "Stronger handovers. Lower liability. Higher buyer confidence.",
};

const b2c = {
  title: "B2C Home Inspection",
  tagline: "Avoid hidden repair costs and verify your home before commitment.",
  idealFor:
    "New home possession, secondary market buyers, rental move-ins and lease exits, post-renovation verification, and existing homes with dampness or seepage concerns.",
  benefits: [
    "Bathroom & balcony slope testing",
    "Moisture mapping and seepage detection",
    "Waterproofing integrity checks",
    "Plumbing pressure and leak risk assessment",
    "Electrical load & safety evaluation",
    "Structured interactive digital reporting",
  ],
  outcome: "Clarity before payment. Confidence before possession. Protection before monsoon.",
};

export default function HomePage() {
  return (
    <>
      <div className="relative">
        {/* ------------------------------- HERO ------------------------------- */}
        <ThermalHero>
          <div className="absolute inset-x-0 top-0 z-10 pt-28 sm:pt-32 lg:pt-[9.5rem]">
            <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-0">
              <h1
                className="hero-rise max-w-[620px] font-display text-[2.45rem] font-semibold leading-[1.08] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.4rem]"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                <span className="lg:hidden">India&apos;s First and Most Trusted AI Led Home Health Assessment</span>
                <span className="hidden lg:inline">
                  India&apos;s First and Most
                  <br />
                  Trusted AI Led Home
                  <br />
                  Health Assessment
                </span>
              </h1>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 pb-9 sm:pb-12 lg:pb-32">
            <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-5 sm:px-8 md:items-end lg:px-0">
              <p
                className="hero-rise max-w-[500px] font-display text-sm font-semibold leading-[1.45] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-base md:text-left"
                style={{ ["--rise-delay" as string]: "220ms" }}
              >
                For homeowners who value informed long-term decisions, PROOFIT delivers structured,
                technology-backed inspections. We uncover hidden issues before they become costly repairs. Protect
                your home with clarity, not assumptions.
              </p>
              <div className="hero-actions hero-rise flex w-full max-w-[500px] flex-wrap items-center justify-start gap-3 sm:gap-5" style={{ ["--rise-delay" as string]: "340ms" }}>
                <ArrowBtn href="/contact" variant="orange" className="hero-action-primary">
                  Book an Inspection
                </ArrowBtn>
                <ArrowBtn href={site.whatsapp} external variant="ghost" className="hero-action-secondary">
                  Get in Touch
                </ArrowBtn>
              </div>
            </div>
          </div>
        </ThermalHero>

        <HomeAboutSequence />
      </div>

      {/* --------------------------- SERVICES CAROUSEL ------------------------ */}
      <section>
        <ServicesCarousel slides={serviceSlides} />
      </section>
      <HomeMediaBridge />

      {/* ----------------------------- PROOFIT CARE+ -------------------------- */}
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-8 rounded-2xl border border-brand bg-cream p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Proofit Care+</p>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-[1.15] md:text-4xl">
                  From Inspection to Execution
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft/80">
                  Waterproofing, civil repair, facility management, HVAC, pest control and more — one professional
                  partner from problem identification to final execution and long-term maintenance. Inspect. Verify.
                  Trust. Repair.
                </p>
              </div>
              <div className="shrink-0">
                <ArrowBtn href="/care-plus" variant="dark">
                  Know More
                </ArrowBtn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <InspectionBubbles />

      {/* ----------------------------- HOW IT WORKS --------------------------- */}
      <section className="pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold md:text-5xl">
                How PROOFIT
                <br />
                Works?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-md text-ink-soft/75 md:ml-auto">
                If it&apos;s worth living In, it&apos;s worth verifying. Our inspection journey includes: A structured,
                technology-backed inspection designed to identify performance risks in your home before they become
                repair costs.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <HowItWorks steps={howSteps} />
          </Reveal>
        </div>
      </section>

      {/* -------------------------- ONE PLATFORM, TWO MODELS ------------------ */}
      <ModelsReveal b2b={b2b} b2c={b2c} />
      <ModelsRevealMobile b2b={b2b} b2c={b2c} />

      {/* ----------------------------- SERVING MUMBAI ------------------------- */}
      <section className="bg-[#101010] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Serving Mumbai &amp;
              <br />
              It&apos;s People
            </h2>
          </Reveal>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal from="left" className="relative mx-auto w-full max-w-sm">
              <Image
                src="/images/mumbai-map-orange.png"
                alt="Orange outline map of Mumbai with a glowing location marker"
                width={666}
                height={956}
                className="h-auto w-full"
              />
            </Reveal>
            <div>
              <Reveal>
                <p className="max-w-md leading-relaxed text-white/80">
                  We serve homeowners, buyers, and businesses from coastal neighborhoods to inland communities.
                  PROOFIT provides professional inspection services wherever Mumbai&apos;s humidity creates risk.
                </p>
              </Reveal>
              <Reveal delay={140} className="mt-10">
                <svg width="44" height="34" viewBox="0 0 32 24" fill="none" aria-hidden>
                  <path d="M0 24V14.4C0 6.4 4.8 1.6 12.8 0l1.6 4c-4.8 1.6-7.2 4.27-7.2 8h6.4v12H0Zm18.4 0V14.4c0-8 4.8-12.8 12.8-14.4l1.6 4c-4.8 1.6-7.2 4.27-7.2 8H32v12H18.4Z" fill="#F7941D" />
                </svg>
                <p className="mt-5 max-w-xl font-display font-semibold leading-relaxed">
                  As a developer, post-handover complaints were becoming a recurring issue for us, especially around
                  seepage and bathroom slopes. PROOFIT&apos;s structured inspection before possession helped us identify
                  technical gaps early and fix them systematically. The result was fewer escalations, smoother
                  handovers, and stronger buyer confidence
                </p>
                <div className="mt-7 flex items-center gap-4 border-t border-white/15 pt-6">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="/images/director.webp"
                      alt="Project Director of a residential development firm"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">Project Director</p>
                    <p className="text-sm font-semibold text-white/70">Residential Development Firm</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ FINAL CTA ----------------------------- */}
      <section className="border-t border-white/10 bg-[#101010] pb-20 pt-16 text-white md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Don&apos;t Just Buy a
              <br />
              Home. PROOFIT.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Because ownership should begin with certainty, not surprises. An inspection today can prevent repair
              bills worth lakhs tomorrow.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <DarkEnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
