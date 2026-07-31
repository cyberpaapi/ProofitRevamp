import Image from "next/image";
import Reveal from "@/components/Reveal";
import ArrowBtn from "@/components/ArrowBtn";
import ThermalHero from "@/components/ThermalHero";
import ServicesCarousel, { type ServiceSlide } from "@/components/ServicesCarousel";
import HowItWorks from "@/components/HowItWorks";
import DarkEnquiryForm from "@/components/DarkEnquiryForm";
import HomeAboutSequence from "@/components/HomeAboutSequence";
import InspectionBubbles from "@/components/InspectionBubbles";
import ModelsReveal, { ModelsRevealMobile } from "@/components/ModelsReveal";
import MumbaiTestimonials from "@/components/MumbaiTestimonials";
import LandingLeadForm from "@/components/LandingLeadForm";
import ScrollToEnquiryButton from "@/components/ScrollToEnquiryButton";
import { site } from "@/lib/site";

/* ------------------------------ Content (per client refs) ------------------------------ */

const serviceSlides: ServiceSlide[] = [
  {
    anchor: "service-pre-possession",
    title: "Pre Possession Inspection",
    desc: "A detailed inspection before you take possession of your new flat to identify construction defects, incomplete work, finishing issues, and quality concerns so they can be rectified by the builder.",
    benefits: [
      "Ensure promised specifications are delivered",
      "Affordable Pricing",
      "Rectification by the builder, at zero cost to you",
      "Understand the true condition of the property",
    ],
    media: { type: "image", src: "/images/svc-possession-tablet.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector checking a damp wall while homeowners observe",
  },
  {
    anchor: "service-resale",
    title: "Resale Property Inspection",
    desc: "An independent condition assessment of an older property before you commit - surfacing hidden dampness, ageing plumbing and electrical systems, and structural wear that a walkthrough can't reveal.",
    benefits: [
      "Negotiate with facts, not impressions",
      "Uncover hidden dampness and seepage",
      "Assess ageing electrical & plumbing",
      "Avoid post-purchase repair shocks",
    ],
    media: { type: "image", src: "/images/svc-resale.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector examining the condition of a resale apartment",
  },
  {
    anchor: "service-rental",
    title: "Rental Move-In / Move-Out Inspection",
    desc: "Documented condition reports at the start and end of a tenancy that protect deposits and prevent disputes - for tenants and owners alike.",
    benefits: [
      "Deposit-protecting photo evidence",
      "Neutral third-party documentation",
      "Faster, dispute-free handovers",
      "Peace of mind for both parties",
    ],
    media: { type: "image", src: "/images/svc-rental.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector documenting a rental property handover",
  },
  {
    anchor: "service-thermal",
    title: "Water Leakage & Dampness Inspection",
    desc: "AI-enabled thermal imaging and calibrated moisture meters trace leakage and dampness to its true source - non-destructively, without breaking a single tile.",
    benefits: [
      "Find the source, not just the stain",
      "100% non-destructive methods",
      "Thermal + moisture-mapped evidence",
      "Clear rectification guidance",
    ],
    media: { type: "image", src: "/images/svc-water.webp" },
    href: "/services/water-inspection",
    mediaAlt: "Proofit inspector checking moisture beside a kitchen sink",
  },
  {
    anchor: "service-renovation",
    title: "Pre-Renovation / Post-Renovation Inspection",
    desc: "Verify contractor workmanship before final payments - finishes, civil work, electrical and plumbing checked against what was promised.",
    benefits: [
      "Hold contractors to specification",
      "Catch defects before final payment",
      "Civil work integrity checks",
      "Documented quality benchmarks",
    ],
    media: { type: "image", src: "/images/svc-renovation.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector checking finishes after renovation work",
  },
  {
    anchor: "service-builder-audit",
    title: "Builder Quality Audit",
    desc: "Independent, evidence-backed quality audits for developers and societies - standardized pre-handover checks that reduce escalations and strengthen buyer confidence.",
    benefits: [
      "Standardized pre-handover audits",
      "Reduced warranty claims & escalations",
      "Data-backed quality benchmarking",
      "Stronger handovers, lower liability",
    ],
    media: { type: "image", src: "/images/svc-audit.webp" },
    href: "/services/home-inspection",
    mediaAlt: "Proofit inspector auditing construction quality on site",
  },
];

const howSteps = [
  {
    title: "Stage-Based Assessment",
    body: [
      "Risk is different at every stage of ownership.",
      "A newly handed-over home may have construction defects. A lived-in home may develop seepage, plumbing inefficiencies, or electrical stress over time.",
      "We begin by understanding the age, usage pattern, and current concerns to define the inspection scope.",
    ],
    image: "/images/process-1.webp",
  },
  {
    title: "System-Level Evaluation",
    intro: "We do not conduct a surface walkthrough.",
    body: ["We evaluate core performance areas including:"],
    points: [
      "Bathroom and balcony drainage slopes",
      "Moisture intrusion and dampness mapping",
      "Waterproofing effectiveness",
      "Plumbing pressure and leakage indicators",
      "Electrical load and safety checks",
    ],
    outro: "AI-supported diagnostics strengthen pattern recognition and risk identification.",
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
    outro: "We identify these conditions before they escalate.",
    image: "/images/thermal-camera-screen.webp",
  },
  {
    title: "Structured Reporting",
    intro: "Every finding is documented with:",
    points: [
      "Photographic evidence",
      "Location tagging",
      "Severity grading",
      "Clear technical observations",
      "Actionable recommendations",
    ],
    outro: "You receive a structured digital report that helps you prioritize corrective action, negotiate with builders, or plan preventive maintenance.",
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

export default function HomeExperience({ campaignMode = false }: { campaignMode?: boolean }) {
  return (
    <>
      <div className="relative">
        {/* ------------------------------- HERO ------------------------------- */}
        <ThermalHero>
          <div className="absolute inset-x-0 top-0 z-10 pt-28 sm:pt-32 lg:pt-[9.5rem]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1
                className="banner-copy-scrim hero-rise max-w-[620px] font-display text-[2.45rem] font-semibold leading-[1.08] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.4rem]"
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
            <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:items-end lg:px-8">
              <p
                className="banner-copy-scrim hero-rise max-w-[500px] font-display text-sm font-normal leading-[1.55] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-base md:text-left"
                style={{ ["--rise-delay" as string]: "220ms" }}
              >
                For homeowners who value informed long-term decisions, PROOFIT delivers structured,
                technology-backed inspections. We uncover hidden issues before they become costly repairs. Protect
                your home with clarity, not assumptions.
              </p>
              <div className="hero-actions hero-rise flex w-full max-w-[500px] flex-wrap items-center justify-start gap-3 sm:gap-5" style={{ ["--rise-delay" as string]: "340ms" }}>
                {campaignMode ? (
                  <ScrollToEnquiryButton targetId="landing2-enquiry" variant="orange" className="hero-action-primary">
                    Book an Inspection
                  </ScrollToEnquiryButton>
                ) : (
                  <>
                    <ArrowBtn href="/contact" variant="orange" className="hero-action-primary">
                      Book an Inspection
                    </ArrowBtn>
                    <ArrowBtn href={site.whatsapp} external variant="ghost" className="hero-action-secondary">
                      Get in Touch
                    </ArrowBtn>
                  </>
                )}
              </div>
            </div>
          </div>
        </ThermalHero>

        <HomeAboutSequence hideCta={campaignMode} />
      </div>

      {/* --------------------------- SERVICES CAROUSEL ------------------------ */}
      <section className="ink-texture">
        <ServicesCarousel slides={serviceSlides} hideLinks={campaignMode} />
      </section>

      {/* ----------------------------- PROOFIT CARE+ -------------------------- */}
      <section className="about-texture pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-[1500px] sm:w-[calc(100%-3rem)]">
          <Reveal>
            <div className="flex flex-col items-start gap-8 overflow-visible rounded-2xl border border-brand bg-cream p-8 md:flex-row md:items-center md:justify-between md:px-14 md:py-12 xl:px-20">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Proofit Care+</p>
                <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-[1.15] md:text-4xl">
                  From Inspection to Execution
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft/80">
                  Waterproofing, civil repair, facility management, HVAC, pest control and more - one professional
                  partner from problem identification to final execution and long-term maintenance. Inspect. Verify.
                  Trust. Repair.
                </p>
              </div>
              {!campaignMode && (
                <div className="shrink-0">
                  <ArrowBtn href="/care-plus" variant="dark">
                    Know More
                  </ArrowBtn>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <InspectionBubbles />

      {/* ----------------------------- HOW IT WORKS --------------------------- */}
      <section className="about-texture pb-20 pt-24 md:pb-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-4 md:grid-cols-2 md:items-end md:gap-6">
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
      <MumbaiTestimonials />

      {/* ------------------------------ FINAL CTA ----------------------------- */}
      <section className="border-t border-white/10 bg-[#101010] pb-20 pt-16 text-white md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Don&apos;t Just Buy a
              <br />
              Home. PROOFIT.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/70 md:mt-6">
              Because ownership should begin with certainty, not surprises. An inspection today can prevent repair
              bills worth lakhs tomorrow.
            </p>
          </Reveal>
          <Reveal delay={150} className="text-left">
            {campaignMode ? <LandingLeadForm idPrefix="landing2-enquiry" /> : <DarkEnquiryForm />}
          </Reveal>
        </div>
      </section>
    </>
  );
}
