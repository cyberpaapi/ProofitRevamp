import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs — Home Inspection Questions Answered",
  description:
    "Answers to common questions about Proofit home inspections: what's covered, thermal imaging, report timelines, costs, and using reports with builders and societies.",
};

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Straight answers,"
        accent="no jargon."
        lede="Everything people usually ask us before booking their first inspection."
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i, 4) * 60}>
                <details className="group rounded-2xl border border-line bg-white open:border-brand/50 open:shadow-md">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand transition-transform duration-200 group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-ink-soft/85">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Question not on the list?" lede="Ask us directly — WhatsApp or the enquiry form, whichever you prefer." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
