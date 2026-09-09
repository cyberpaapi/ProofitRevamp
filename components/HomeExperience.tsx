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
import { getPublicTestimonials, getPublicServiceSlides } from "@/lib/admin/public-content";

/* ------------------------------ Content (per client refs) ------------------------------ */



const howSteps = [
  {
    title: "Stage-Based Assessment",
    body: [
      "Every property has different risks depending on its age and usage.",
      "We assess your home's condition to define the right inspection scope.",
    ],
    image: "/images/process-1.webp",
  },
  {
    title: "System-Level Evaluation",
    body: [
      "We inspect structure, waterproofing, plumbing, drainage, and electrical systems - not just visible surfaces.",
      "AI-powered diagnostics help identify hidden risks.",
    ],
    image: "/images/process-2.webp",
  },
  {
    title: "Early Risk Identification",
    body: [
      "Small issues often become expensive repairs.",
      "We detect hidden moisture, leakage, drainage, plumbing, and electrical risks before they worsen.",
    ],
    image: "/images/thermal-camera-screen.webp",
  },
  {
    title: "Structured Reporting",
    body: [
      "Every finding is documented with photos, severity ratings, technical observations, and clear recommendations.",
      "You'll receive a structured digital report to help you take the right action.",
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

export default async function HomeExperience({ campaignMode = false }: { campaignMode?: boolean }) {
  const [managedTestimonials, serviceSlides] = await Promise.all([getPublicTestimonials(), getPublicServiceSlides()]);
  return (
    <>
      <div className="relative">
        {/* ------------------------------- HERO ------------------------------- */}
        <ThermalHero>
          <div className="absolute inset-x-0 top-0 z-10 pt-28 sm:pt-32 lg:pt-[9.5rem]">
            <div className="site-container ">
              <h1
                className="banner-copy-scrim hero-rise max-w-[620px] font-display text-[2.45rem] font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]"
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
            <div className="site-container flex flex-col items-start gap-6 md:items-end">
              <p
                className="banner-copy-scrim hero-rise max-w-[500px] font-display text-sm font-normal leading-[1.55] text-white sm:text-base md:text-left"
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
      <section className="site-section about-texture">
        <div className="site-container">
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
      <section className="site-section about-texture">
        <div className="site-container ">
          <div className="section-heading grid gap-4 md:grid-cols-2 md:items-end md:gap-6">
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
      <ModelsReveal b2b={b2b} b2c={b2c} formHref={campaignMode ? "#landing2-enquiry" : undefined} />
      <ModelsRevealMobile b2b={b2b} b2c={b2c} formHref={campaignMode ? "#landing2-enquiry" : undefined} />

      {/* ----------------------------- SERVING MUMBAI ------------------------- */}
      <MumbaiTestimonials testimonials={managedTestimonials} />

      {/* ------------------------------ FINAL CTA ----------------------------- */}
      <section className="site-section border-t border-white/10 bg-[#101010] text-white">
        <div className="site-container grid gap-14 lg:grid-cols-2 lg:gap-20">
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
