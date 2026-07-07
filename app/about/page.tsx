import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { founders, vision, mission } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — The Team Behind Proofit",
  description:
    "Proofit brings North American home inspection standards to Mumbai. Meet co-founders Hardik Sampat and Dhyan Parekh and the team setting new benchmarks in residential inspection.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Proofit"
        title="Built in Canada."
        accent="Made for Mumbai."
        lede="We took the inspection discipline that protects every home sale in North America and adapted it to Indian construction, Indian apartments and Indian monsoons."
        image="/images/team-inspectors.webp"
        imageAlt="The Proofit inspection team in front of a residential building"
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Our story" title="Why India needed" accent="a Proofit." />
            <Reveal delay={100} className="-mt-6 space-y-4 leading-relaxed text-ink-soft/85">
              <p>
                In North America, no serious property deal closes without an independent inspection. In India — where a
                home is usually the single largest purchase of a lifetime — buyers routinely sign on trust, a
                walkthrough and fresh paint.
              </p>
              <p>
                Proofit exists to change that. We provide independent, third-party evaluations of residential
                properties — from compact apartments to luxury homes and villas — combining expert on-site
                evaluation with AI-enabled thermal imaging to reveal what the eye can&apos;t see.
              </p>
              <p>
                Every engagement ends with an evidence-backed report: photographed, thermally documented,
                severity-graded. Not opinions — proof.
              </p>
            </Reveal>
          </div>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/facade-warm.webp"
                alt="Whitewashed residential home facade in soft morning light"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal className="tile-orange relative overflow-hidden p-8 md:p-10">
            <svg className="check-watermark -bottom-10 -right-10 h-48 w-48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12.5 9.5 18 20 6.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="relative mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/80">Vision</p>
            <p className="relative text-xl font-medium leading-relaxed text-white">{vision}</p>
          </Reveal>
          <Reveal delay={120} className="tile-black relative overflow-hidden p-8 md:p-10">
            <svg className="check-watermark -bottom-10 -right-10 h-48 w-48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="relative mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-brand">Mission</p>
            <p className="relative text-xl font-medium leading-relaxed text-white">{mission}</p>
          </Reveal>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="The founders"
            lede="Two professionals who learned the discipline of inspection in Canada — and came home to build it for India."
            center
          />
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 150} className="flex h-full flex-col tile p-8 md:p-10">
                <div className="mb-6 flex min-h-16 items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand font-display text-2xl font-bold text-white" aria-hidden>
                    {f.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{f.name}</h3>
                    <p className="text-sm font-semibold text-brand-deep">{f.role}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-3 leading-relaxed text-ink-soft/85">
                  {f.bio.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {f.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-ink-soft">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="tile-black p-7 md:p-12">
              <SectionHeading eyebrow="How we work" title="Three things we" accent="refuse to compromise." dark center />
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: "Independence", desc: "We don't sell repairs, materials or contracting. Our only product is the truth about your property — which is why our reports carry weight with builders and societies." },
                  { title: "Evidence", desc: "Every finding is photographed, thermally documented where relevant, and severity-graded. If we can't show it, we don't report it." },
                  { title: "Clarity", desc: "Reports written for homeowners, structured for site teams. You understand what's wrong; your contractor knows exactly what to fix." },
                ].map((v, i) => (
                  <Reveal key={v.title} delay={i * 120} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                    <h3 className="mb-3 flex items-center gap-2.5 text-xl font-bold text-brand">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {v.title}
                    </h3>
                    <p className="leading-relaxed text-white/80">{v.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Want the truth about a property?" lede="Talk to the team — we'll tell you honestly whether you need an inspection at all." />
    </>
  );
}
