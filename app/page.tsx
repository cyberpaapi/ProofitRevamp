import Image from "next/image";
import Reveal from "@/components/Reveal";
import ArrowBtn from "@/components/ArrowBtn";
import ThermalHero from "@/components/ThermalHero";
import ServicesCarousel, { type ServiceSlide } from "@/components/ServicesCarousel";
import HowItWorks from "@/components/HowItWorks";
import DarkEnquiryForm from "@/components/DarkEnquiryForm";
import { site } from "@/lib/site";

/* ------------------------------ Content (per client refs) ------------------------------ */

const distinction = [
  "Affordable Pricing",
  "Highly Trained Expert Care",
  "Tailored Packages",
  "Interactive Reporting",
];

const serviceSlides: ServiceSlide[] = [
  {
    title: "New Flat Possession Inspection",
    desc: "A detailed inspection before you take possession of your new flat to identify construction defects, incomplete work, finishing issues, and quality concerns so they can be rectified by the builder.",
    benefits: [
      "Ensure promised specifications are delivered",
      "Affordable Pricing",
      "Rectification by the builder, at zero cost to you",
      "Understand the true condition of the property",
    ],
    media: { type: "video", src: "/videos/service-tablet.mp4", poster: "/images/svc-possession-tablet.webp" },
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
    desc: "Verify contractor workmanship before final payments — finishes, waterproofing, electrical and plumbing checked against what was promised.",
    benefits: [
      "Hold contractors to specification",
      "Catch defects before final payment",
      "Waterproofing integrity checks",
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

const whenToInspect = [
  "On possession day",
  "When your EMIs begin",
  "Before finalising renovation work",
  "After the first heavy monsoon",
  "Before your builder warranty ends",
  "Before buying a resale home",
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

const Check = ({ size = 16, stroke = "#F7941D" }: { size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 12.5 9.5 18 20 6.5" stroke={stroke} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <ThermalHero>
        <div className="absolute inset-x-0 top-0 pt-28 md:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1
              className="hero-rise max-w-2xl font-display text-4xl font-semibold leading-[1.15] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] md:text-5xl xl:text-[3.4rem]"
              style={{ ["--rise-delay" as string]: "80ms" }}
            >
              India&apos;s First and Most Trusted AI Led Home Health Assessment
            </h1>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:px-6 md:items-end lg:px-8">
            <p
              className="hero-rise max-w-md font-display text-sm font-semibold leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:text-right"
              style={{ ["--rise-delay" as string]: "220ms" }}
            >
              For homeowners who value informed long-term decisions, PROOFIT delivers structured, technology-backed
              inspections. We uncover hidden issues before they become costly repairs. Protect your home with
              clarity, not assumptions.
            </p>
            <div className="hero-rise flex flex-wrap gap-4" style={{ ["--rise-delay" as string]: "340ms" }}>
              <ArrowBtn href="/contact" variant="white">
                Book an Inspection
              </ArrowBtn>
              <ArrowBtn href={site.whatsapp} external variant="ghost">
                Get in Touch
              </ArrowBtn>
            </div>
          </div>
        </div>
      </ThermalHero>

      {/* ------------------------------ ABOUT US ----------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[1fr_auto_1.2fr] lg:gap-16 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold md:text-5xl">About Us</h2>
          </Reveal>
          <Reveal delay={120} className="relative -mx-4 sm:mx-0 md:w-72 lg:w-80">
            <div className="relative aspect-[16/10] overflow-hidden sm:rounded-2xl md:aspect-[3/4]">
              <Image
                src="/images/svc-possession-tablet.webp"
                alt="Proofit inspector reading a thermal heat map on a tablet"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={200} className="max-w-xl leading-relaxed text-ink-soft/85">
              <p>
                With decades of combined engineering and on-site building experience, the PROOFIT team understands
                how homes are built and where they commonly fail. We combine hands-on expertise with AI-powered
                thermal imaging to detect issues that traditional visual inspections often miss.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-7">
              <ArrowBtn href="/about" variant="dark">
                About Us
              </ArrowBtn>
            </Reveal>

            {/* The PROOFIT Distinction */}
            <Reveal delay={380} className="mt-14">
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                The PROOFIT
                <br />
                Distinction
              </h3>
              <div className="mt-6 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
                {distinction.map((d) => (
                  <div key={d} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink" aria-hidden>
                      <Check size={16} />
                    </span>
                    <p className="text-sm font-semibold leading-snug">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------- SAVINGS HEADING -------------------------- */}
      <section className="pb-14 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="md:ml-auto md:max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.15] md:text-5xl">
              Delivering Up to 30% Greater Cost Savings Than Conventional Vendors
            </h2>
            <p className="mt-5 max-w-xl text-ink-soft/75">
              A wide array of pre-emptive and problem-solving inspection services designed to protect your property,
              your investment, and your peace of mind.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- SERVICES CAROUSEL ------------------------ */}
      <section>
        <ServicesCarousel slides={serviceSlides} />
      </section>

      {/* ----------------------------- PROOFIT CARE+ -------------------------- */}
      <section className="pt-20 md:pt-28">
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

      {/* --------------------------- WHEN TO INSPECT -------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              You Bought
              <br />
              the Home.
            </h2>
            <p className="mt-1 font-display text-xl font-semibold">Now Verify It</p>
            <p className="mt-8 font-display font-semibold">
              When Should You Get
              <br />a Home Inspection
            </p>
            <p className="mt-4 font-display font-semibold text-ink-soft/45">
              Why Home Inspection
              <br />
              Shouldn&apos;t be Optional
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {whenToInspect.map((w, i) => (
              <Reveal key={w} delay={i * 80}>
                <p className="font-display text-2xl font-semibold">{String(i + 1).padStart(2, "0")}</p>
                <div className="mt-3 h-px w-full bg-line" aria-hidden />
                <p className="mt-3 font-medium text-ink-soft">{w}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------- HOW IT WORKS --------------------------- */}
      <section className="pb-20 md:pb-28">
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
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-4xl font-semibold leading-tight md:text-[2.6rem]">
                  One Platform.
                  <br />
                  Two Models
                </h2>
                <p className="mt-5 leading-relaxed text-ink-soft/75">
                  Choose Your Inspection Approach. Whether you manage properties at scale or own a single home,
                  PROOFIT delivers structured, AI-led home health assessments designed for your context.
                </p>
              </Reveal>
              <Reveal delay={150} className="tile mt-8 p-6 text-center">
                <div className="mx-auto flex aspect-square w-40 items-center justify-center rounded-xl bg-cream p-4">
                  <Image src="/images/logo.svg" alt="PROOFIT" width={150} height={50} className="h-auto w-full" />
                </div>
                <div className="mt-5">
                  <ArrowBtn href="/process" variant="white" className="border border-line">
                    View Sample Report
                  </ArrowBtn>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[b2b, b2c].map((m, mi) => (
                <Reveal key={m.title} delay={mi * 130} className="card-outline flex h-full flex-col p-6 md:p-7">
                  <h3 className="font-display text-xl font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">{m.tagline}</p>
                  <div className="mt-5 rounded-xl bg-cream p-4">
                    <p className="font-display text-sm font-semibold">Ideal For</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft/80">{m.idealFor}</p>
                  </div>
                  <p className="mt-5 font-display text-sm font-semibold">Key Benefits</p>
                  <ul className="mt-2 flex-1 space-y-2">
                    {m.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-cream p-4">
                    <p className="font-display text-sm font-semibold">Outcome</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft/80">{m.outcome}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- SERVING MUMBAI ------------------------- */}
      <section className="bg-ink py-20 text-white md:py-28">
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
                src="/images/mumbai-map.webp"
                alt="Glowing outline map of Maharashtra with Mumbai marked"
                width={900}
                height={1205}
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
      <section className="border-t border-white/10 bg-ink pb-20 pt-16 text-white md:pb-24">
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
