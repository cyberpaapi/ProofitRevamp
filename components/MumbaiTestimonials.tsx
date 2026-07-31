"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    name: "Rahul Mehta",
    image: "/images/testimonials/rahul-mehta.webp",
    quote: "As a developer, post-handover complaints were becoming a recurring issue for us, especially around seepage and bathroom slopes. PROOFIT’s structured inspection before possession helped us identify technical gaps early and fix them systematically. The result was fewer escalations, smoother handovers, and stronger buyer confidence.",
    author: "Project Director",
    organisation: "Residential Development Firm",
  },
  {
    name: "Neha Kapoor",
    image: "/images/testimonials/neha-kapoor.webp",
    quote: "We manage multiple commercial assets, and inconsistent quality checks were increasing maintenance costs. PROOFIT brought a standardized, data-backed inspection framework that highlighted drainage, waterproofing, and electrical risks across units. It has helped us move from reactive maintenance to preventive asset management.",
    author: "Head of Facilities",
    organisation: "Commercial Office Portfolio",
  },
  {
    name: "Rohan Shah",
    image: "/images/testimonials/rohan-shah.webp",
    quote: "We were about to close on a resale apartment that looked flawless. PROOFIT’s inspection revealed concealed moisture and improper balcony slopes that would have led to seepage in monsoon. Their report gave us leverage to negotiate corrective work before payment. It changed the outcome completely.",
    author: "Homebuyer",
    organisation: "Secondary Market",
  },
  {
    name: "Aditi Desai",
    image: "/images/testimonials/aditi-desai.webp",
    quote: "After renovation, everything appeared fine visually, but we wanted technical validation. PROOFIT identified plumbing pressure inconsistencies and minor waterproofing gaps that our contractor had overlooked. Fixing them early prevented long-term damage and unnecessary future expenses.",
    author: "Homeowner",
    organisation: "Post-Renovation",
  },
  {
    name: "Vikram Malhotra",
    image: "/images/testimonials/vikram-malhotra.webp",
    quote: "Tenant complaints around dampness were affecting our rental yield. PROOFIT’s detailed assessment helped us trace the issue to improper drainage flow and waterproofing failure. Their structured report allowed us to address the root cause instead of patchwork fixes.",
    author: "Landlord & Property Investor",
    organisation: "",
  },
  {
    name: "Priya Nair",
    image: "/images/testimonials/priya-nair.webp",
    quote: "What stood out was the clarity of their reporting. Every issue was documented with evidence, severity grading, and precise location tagging. It removed guesswork and gave us a technical basis to hold contractors accountable without confrontation.",
    author: "Corporate Real Estate Manager",
    organisation: "",
  },
];

export default function MumbaiTestimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];
  const move = (direction: number) => {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative isolate scroll-mt-16 overflow-hidden bg-[#101010] py-5 text-white md:py-10 lg:h-[calc(100svh-72px)] lg:min-h-[620px] lg:scroll-mt-[72px] lg:py-8">
      <div className="relative mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[17rem] font-display text-[2rem] font-semibold leading-[1.05] sm:max-w-none sm:text-4xl md:text-5xl">
          Serving Mumbai-Wide &amp; Neighbouring Cities on Request
        </h2>
        <div className="mt-5 grid min-h-0 flex-1 items-center gap-7 md:grid-cols-[minmax(190px,0.7fr)_1.3fr] md:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-[666/956] w-full max-w-[18rem] md:mx-0 md:aspect-auto md:h-full md:max-h-[70svh] md:max-w-sm">
            <Image
              src="/images/mumbai-map-orange.png"
              alt="Orange outline map of Mumbai with a glowing location marker"
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 30vw, 288px"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex w-full min-w-0 flex-col justify-center md:max-w-[42rem] md:justify-self-stretch">
            <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              We serve homeowners, buyers, and businesses Mumbai-wide, and also offer services to Mumbai&apos;s
              neighbouring cities on request.
            </p>
            <article className="mt-3 flex h-[25rem] w-full flex-col sm:h-[22rem] md:mt-4 md:h-[20rem] lg:h-[18rem]" aria-live="polite" aria-atomic="true">
              <svg className="h-6 w-8 sm:h-8 sm:w-11" viewBox="0 0 32 24" fill="none" aria-hidden>
                <path d="M0 24V14.4C0 6.4 4.8 1.6 12.8 0l1.6 4c-4.8 1.6-7.2 4.27-7.2 8h6.4v12H0Zm18.4 0V14.4c0-8 4.8-12.8 12.8-14.4l1.6 4c-4.8 1.6-7.2 4.27-7.2 8H32v12H18.4Z" fill="#F7941D" />
              </svg>
              <p className="mt-2 max-w-2xl font-display text-sm font-semibold leading-[1.55] md:mt-3 sm:text-base lg:text-lg">
                {testimonial.quote}
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-white/15 pt-3 md:pt-4">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.author}`}
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-brand sm:h-16 sm:w-16"
                />
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold sm:text-lg">{testimonial.name}</p>
                  <p className="mt-0.5 text-xs font-semibold text-brand sm:text-sm">{testimonial.author}</p>
                  {testimonial.organisation && (
                    <p className="mt-0.5 text-xs text-white/60 sm:text-sm">{testimonial.organisation}</p>
                  )}
                </div>
              </div>
            </article>
            <div className="mt-3 flex w-full items-center gap-3 md:mt-4">
              <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="sr-only">Testimonial {index + 1} of {testimonials.length}</span>
                {testimonials.map((item, itemIndex) => (
                  <span key={item.author} aria-hidden className={`h-1.5 rounded-full transition-all ${itemIndex === index ? "w-5 bg-brand" : "w-1.5 bg-white/30"}`} />
                ))}
              </div>
              <button type="button" onClick={() => move(1)} aria-label="Next testimonial" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
