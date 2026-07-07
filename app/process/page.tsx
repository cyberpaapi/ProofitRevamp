import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Inspection Process — Booked to Briefed in 5 Steps",
  description:
    "How a Proofit inspection works: booking, structured on-site inspection, thermal and instrument scanning, a 48-hour evidence-backed report, and a findings walkthrough.",
};

const tools = [
  { title: "AI-enabled thermal camera", desc: "Reads surface temperature differences as small as 0.1°C — mapping moisture, insulation gaps and electrical hot spots." },
  { title: "Moisture meters", desc: "Pin and pinless meters quantify dampness inside walls and slabs, separating live leaks from historic stains." },
  { title: "Electrical testers", desc: "Every point tested for polarity, earthing and function — not just 'does the light come on'." },
  { title: "Structured checklists", desc: "North American inspection methodology adapted to Indian construction, so nothing depends on an inspector's mood or memory." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="Methodical. Instrumented."
        accent="Documented."
        lede="Every Proofit inspection follows the same disciplined sequence — so the quality of your report never depends on luck."
        image="/images/bathroom-moisture-check.webp"
        imageAlt="Proofit inspector checking a bathroom wall with a moisture meter"
      />

      {/* Steps timeline */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ol className="relative space-y-10 border-l-2 border-brand/30 pl-8 md:space-y-14 md:pl-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 80} className="relative">
                <span
                  className="absolute -left-[45px] flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white md:-left-[61px] md:h-10 md:w-10"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="grid items-center gap-6 overflow-hidden tile sm:grid-cols-[240px_1fr]">
                  <div className="relative aspect-[4/3] sm:aspect-square">
                    <Image
                      src={`/images/process-${i + 1}.webp`}
                      alt={step.title}
                      fill
                      sizes="(min-width: 640px) 240px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 pt-0 sm:py-6 sm:pl-0 sm:pr-8">
                    <h2 className="mb-2 text-2xl font-bold">{step.title}</h2>
                    <p className="leading-relaxed text-ink-soft/85">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Toolkit */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/thermal-camera-screen.webp"
                alt="Thermal imaging camera screen showing a heat map of a damp interior wall"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="The toolkit" title="Instruments don't" accent="have opinions." />
            <div className="-mt-4 space-y-5">
              {tools.map((t, i) => (
                <Reveal key={t.title} delay={i * 90} className="flex gap-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mt-1 shrink-0" aria-hidden>
                    <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="font-bold">{t.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft/75">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="See the process on your own property." lede="Tell us about the flat — we'll tell you what an inspection will and won't find." />
    </>
  );
}
