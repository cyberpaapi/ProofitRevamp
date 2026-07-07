import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { openings } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Join the Proofit Team",
  description:
    "Build a career in India's emerging home inspection industry. Open roles at Proofit Mumbai: Home Inspector, Trainee Inspector, Operations Coordinator.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Learn a profession"
        accent="India is just discovering."
        lede="Home inspection is a decades-old discipline in North America and a brand-new industry here. Join early, learn deeply, grow with it."
        image="/images/careers-trainee.webp"
        imageAlt="A trainee inspector learning to read a moisture meter beside a senior colleague"
      />

      {/* Why join */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Why Proofit" title="Craft, instruments" accent="and honest work." />
            <Reveal delay={100} className="-mt-6 space-y-4 leading-relaxed text-ink-soft/85">
              <p>
                You&apos;ll train in international-standard inspection methodology — thermal imaging, moisture
                diagnostics, structured reporting — with founders who learned the trade in Canada and practice it
                daily in Mumbai.
              </p>
              <p>
                The work is honest by design: we don&apos;t sell repairs, so your only job is finding the truth about a
                building and documenting it well. If you like buildings, evidence and craft, you&apos;ll like it here.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8 grid grid-cols-2 gap-4">
              {["Hands-on instrument training", "International methodology", "Early role in a new industry", "Field + report craft"].map((x) => (
                <p key={x} className="flex items-start gap-2 text-sm font-semibold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                    <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {x}
                </p>
              ))}
            </Reveal>
          </div>
          <Reveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/team-inspectors.webp"
                alt="The Proofit inspection team"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Openings */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Open roles" title="Current" accent="openings." center />
          <div className="space-y-5">
            {openings.map((o, i) => (
              <Reveal key={o.title} delay={i * 100} className="tile tile-hover p-7 md:p-8">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">{o.title}</h3>
                  <span className="rounded-full bg-brand-soft px-4 py-1.5 text-xs font-bold text-brand-deep">{o.type}</span>
                </div>
                <p className="mb-5 leading-relaxed text-ink-soft/80">{o.desc}</p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${o.title}`)}`}
                  className="inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand"
                >
                  Apply via email
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 rounded-2xl border border-dashed border-brand/50 bg-brand-soft/50 p-7 text-center">
            <p className="font-bold">Don&apos;t see your role?</p>
            <p className="mt-1 text-ink-soft/80">
              We&apos;re always interested in people who care about buildings. Write to{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-brand-deep underline underline-offset-2">
                {site.email}
              </a>{" "}
              with a few lines about yourself.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
