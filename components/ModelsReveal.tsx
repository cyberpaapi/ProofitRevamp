"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ArrowBtn from "@/components/ArrowBtn";
import { site } from "@/lib/site";

export type InspectionModel = {
  title: string;
  tagline: string;
  idealFor: string;
  benefits: string[];
  outcome: string;
};

function ModelCard({ model, className = "" }: { model: InspectionModel; className?: string }) {
  return (
    <article className={`card-outline flex h-full flex-col p-6 md:p-7 ${className}`}>
      <h3 className="font-display text-xl font-semibold">{model.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft/75">{model.tagline}</p>
      <div className="mt-5 rounded-xl bg-cream p-4">
        <p className="font-display text-sm font-semibold">Ideal For</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft/80">{model.idealFor}</p>
      </div>
      <p className="mt-5 font-display text-sm font-semibold">Key Benefits</p>
      <ul className="mt-2 space-y-2">
        {model.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm leading-snug text-ink-soft">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
            {benefit}
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-xl bg-cream p-4">
        <p className="font-display text-sm font-semibold">Outcome</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft/80">{model.outcome}</p>
      </div>
    </article>
  );
}

function SampleReportPrompt({ className = "", hideLink = false }: { className?: string; hideLink?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/images/proofit-certified-stamp.png"
        alt="Proofit officially certified inspection stamp"
        width={266}
        height={244}
        sizes="(min-width: 1024px) 180px, 168px"
        className="h-auto w-[10.5rem] object-contain lg:w-[11.25rem]"
      />
      {!hideLink && (
        <ArrowBtn
          href={site.whatsappSampleReport}
          external
          variant="dark"
          className="mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Ask for Sample Report
        </ArrowBtn>
      )}
    </div>
  );
}

export default function ModelsReveal({ b2b, b2c, hideSampleReportLink = false }: { b2b: InspectionModel; b2c: InspectionModel; hideSampleReportLink?: boolean }) {
  const stageRef = useRef<HTMLElement>(null);
  const movingCardRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const movingCard = movingCardRef.current;
    const deck = deckRef.current;
    if (!stage || !movingCard || !deck) return;

    let raf = 0;
    const render = () => {
      raf = 0;
      const bounds = stage.getBoundingClientRect();
      // Use the entire visible journey so the reveal finishes as the sticky stage releases.
      const revealDistance = Math.max(1, stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / revealDistance));
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const distance = movingCard.offsetWidth + 24;
      movingCard.style.transform = `translate3d(${distance * eased}px, 0, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section ref={stageRef} className="relative mb-12 hidden h-[125vh] lg:block">
      <div className="sticky top-[72px] mx-auto grid h-[calc(100vh-72px)] max-w-7xl grid-cols-[minmax(260px,340px)_1fr] gap-16 px-8 py-8">
        <div className="flex min-h-0 flex-col">
          <h2 className="font-display text-[2.6rem] font-semibold leading-tight">
            One Platform.
            <br />
            Two Models
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft/75 md:mt-5">
            Choose Your Inspection Approach. Whether you manage properties at scale or own a single home, PROOFIT
            delivers structured, AI-led home health assessments designed for your context.
          </p>
          <SampleReportPrompt className="mt-7" hideLink={hideSampleReportLink} />
        </div>

        <div ref={deckRef} className="relative h-full min-h-0 overflow-visible">
          <div ref={movingCardRef} className="absolute inset-y-0 left-0 z-[1] w-[calc(50%-12px)] will-change-transform">
            <ModelCard model={b2c} />
          </div>
          <div className="absolute inset-y-0 left-0 z-[2] w-[calc(50%-12px)]">
            <ModelCard model={b2b} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ModelsRevealMobile({ b2b, b2c, hideSampleReportLink = false }: { b2b: InspectionModel; b2c: InspectionModel; hideSampleReportLink?: boolean }) {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:hidden">
      <h2 className="font-display text-4xl font-semibold leading-tight">
        One Platform.
        <br />
        Two Models
      </h2>
      <p className="mt-3 leading-relaxed text-ink-soft/75 md:mt-5">
        Choose Your Inspection Approach. Whether you manage properties at scale or own a single home, PROOFIT
        delivers structured, AI-led home health assessments designed for your context.
      </p>
      <SampleReportPrompt className="mt-7" hideLink={hideSampleReportLink} />
      <div className="mt-8 grid gap-6">
        <ModelCard model={b2b} />
        <ModelCard model={b2c} />
      </div>
    </section>
  );
}
