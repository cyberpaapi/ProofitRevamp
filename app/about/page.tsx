import type { Metadata } from "next";
import Image from "next/image";
import ArrowBtn from "@/components/ArrowBtn";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AboutAccordion from "@/components/AboutAccordion";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us - The Team Behind Proofit",
  description:
    "Proofit combines engineering expertise, IR technology, and globally inspired inspection practices adapted for Indian properties.",
};

const leadership = [
  {
    name: "Hardik Sampat",
    image: "/images/team/hardik-back.webp",
    role: "Co-Founder · Head of Business Development",
    bio: "Hardik spent his formative professional years in Canada, where he developed deep expertise in residential construction, building materials, and property systems. After working with Home Depot, he managed end-to-end residential projects as a General Contractor before training with Primary Home Inspection in structured, standards-based inspection methodologies. At Proofit, Hardik leads business development while driving the adoption of globally inspired inspection practices, helping establish new benchmarks for transparency, quality, and preventive property care in India.",
  },
  {
    name: "Nupur Mahipal",
    image: "/images/team/nupur-back.webp",
    role: "Partner · Chief Marketing Officer (CMO)",
    bio: "Nupur brings over seven years of experience in the property inspection industry, with expertise spanning operations, client relationships, marketing, and business development. Her hands-on understanding of the industry has helped shape Proofit’s customer-first approach while strengthening its brand presence and strategic partnerships. She leads marketing and growth initiatives with a focus on building trust, creating meaningful customer experiences, and expanding Proofit’s reach across India’s evolving real estate landscape.",
  },
  {
    name: "Dhyan Parekh",
    image: "/images/team/dhyan-back.webp",
    role: "Co-Founder · Operations & Quality Lead",
    bio: "Having lived and worked in Canada, Dhyan recognised that professional home inspections were a standard part of property ownership - something largely missing in Mumbai despite its demanding climate and ageing infrastructure. Inspired to bridge that gap, he co-founded Proofit to bring globally inspired inspection standards to India. He leads inspection workflows, report structuring, and quality assurance, ensuring every report is evidence-backed, consistent, and easy for clients to understand.",
  },
];

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      {/* Responsive banner: 480×700 mobile / 1440×540 desktop */}
      <section className="relative flex min-h-[700px] items-end overflow-hidden bg-ink pb-12 pt-28 text-white md:min-h-[540px] md:pb-14 md:pt-32">
        <Image
          src="/images/about-hero-mobile.webp"
          alt="Proofit inspection team at a residential property"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/about-hero-desktop.webp"
          alt="Proofit inspection team at a residential property"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <div className="absolute inset-y-0 left-0 w-[min(94%,62rem)] bg-gradient-to-r from-ink/65 via-ink/30 to-transparent" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="hero-rise max-w-4xl font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
            Inspired by Canadian Standards. Engineered for Indian Homes.
          </h1>
          <p
            className="hero-rise mt-4 max-w-[620px] font-display text-sm font-normal leading-[1.55] text-white/90 sm:text-base md:mt-6"
            style={{ ["--rise-delay" as string]: "140ms" }}
          >
            Helping uncover hidden property risks through globally inspired inspection practices and local expertise
            before they become expensive repairs.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Who We Are</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.12] md:text-5xl">
              Built on Engineering. Powered by AI.
            </h2>
            <div className="mt-4 max-w-2xl space-y-5 leading-relaxed text-ink-soft/82 md:mt-7">
              <p>
                Proofit is India’s first AI-led home, thermal and commercial inspection company, bringing together
                engineering expertise, advanced inspection technology, and globally inspired methodologies to help
                homebuyers, homeowners, and property investors make informed decisions.
              </p>
              <p>
                Every inspection goes beyond what the eye can see - detecting structural concerns, moisture
                intrusion, plumbing issues, electrical risks, and other hidden defects before they become costly
                surprises.
              </p>
            </div>
          </Reveal>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/inspector-snagging.webp"
                alt="Proofit inspector assessing a residential property"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story - retained */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-india-building.webp"
                alt="Low-angle view of a brown building beneath a cloudy sky"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our Story" title="Why India needed" accent="a Proofit." />
            <Reveal delay={100} className="-mt-6 space-y-4 leading-relaxed text-ink-soft/85">
              <p>
                In North America, no serious property deal closes without an independent inspection. In India -
                where a home is usually the single largest purchase of a lifetime - buyers routinely sign on trust,
                a walkthrough, and fresh paint.
              </p>
              <p>
                Proofit exists to change that. We provide independent, third-party evaluations of residential
                properties - from compact apartments to luxury homes and villas - combining expert on-site
                evaluation with AI-enabled thermal imaging to reveal what the eye can’t see.
              </p>
              <p>
                Every engagement ends with an evidence-backed report: photographed, thermally documented, and
                severity-graded. Not opinions - proof.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inspection Framework */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/thermal-technician.webp"
                alt="Inspector using thermal scanning technology"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Methodology</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.12] md:text-5xl">
              Our Inspection Framework
            </h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-ink-soft/82 md:mt-7">
              <p>
                Our inspection framework draws inspiration from internationally recognised Canadian inspection
                practices while being specifically adapted for Mumbai’s unique environmental conditions.
              </p>
              <p>
                From heavy monsoons and coastal humidity to ageing buildings and waterproofing failures, every
                inspection is designed to identify risks that matter locally - not just globally.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8 md:grid-cols-2">
          <Reveal className="rounded-2xl bg-brand p-8 md:p-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/75">Our Mission</p>
            <p className="mt-3 text-xl font-medium leading-relaxed md:mt-5">
              Making home inspections an essential part of every property decision by helping people buy, own and
              maintain homes with greater confidence.
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-white/15 bg-white/5 p-8 md:p-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">Our Vision</p>
            <p className="mt-3 text-xl font-medium leading-relaxed md:mt-5">
              To become India’s most trusted property intelligence company by setting new benchmarks in
              transparency, technology, and preventive home care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="The team behind Proofit"
            lede="Global inspection experience, local market understanding, and a shared commitment to evidence-backed property decisions."
            center
          />
          <div className="grid items-stretch gap-7 lg:grid-cols-3">
            {leadership.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 120} className="tile flex h-full flex-col p-7 md:p-8">
                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-brand-soft">
                  <Image
                    src={leader.image}
                    alt={`${leader.name} wearing the orange Proofit team shirt, seen from behind`}
                    fill
                    sizes="(min-width: 1024px) 28vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mb-6 flex min-h-16 items-center">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{leader.name}</h3>
                    <p className="mt-1 text-sm font-semibold leading-snug text-brand-deep">{leader.role}</p>
                  </div>
                </div>
                <p className="flex-1 leading-relaxed text-ink-soft/82">{leader.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">How We Work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.12] md:text-5xl">
              Three things we refuse to compromise.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <AboutAccordion />
          </Reveal>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQs"
            title="Straight answers, no jargon."
            lede="Everything people usually ask us before booking their first inspection."
            center
          />
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={Math.min(index, 4) * 60}>
                <details className="group tile open:border-brand/50 open:shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl font-bold text-brand transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-ink-soft/85">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Page closing section, separate from the footer */}
      <section className="bg-brand-soft py-20 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-end">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] md:text-5xl">
              Know Your Property Before You Commit.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft/78 md:mt-6">
              Whether you’re buying your first home, investing in real estate, or maintaining an existing property,
              Proofit gives you the confidence to make informed decisions.
            </p>
          </Reveal>
          <Reveal delay={140} className="shrink-0">
            <ArrowBtn href="/contact" variant="dark">
              Book a Home Inspection Today
            </ArrowBtn>
          </Reveal>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
