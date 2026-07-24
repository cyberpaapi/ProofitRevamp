"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ArrowBtn from "@/components/ArrowBtn";

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
      <ul className="mt-2 flex-1 space-y-2">
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

export default function ModelsReveal({ b2b, b2c }: { b2b: InspectionModel; b2c: InspectionModel }) {
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
    <section ref={stageRef} className="relative mb-24 hidden h-[150vh] lg:block">
      <div className="sticky top-[72px] mx-auto grid h-[calc(100vh-72px)] max-w-7xl grid-cols-[minmax(260px,340px)_1fr] gap-16 px-8 py-10">
        <div>
          <h2 className="font-display text-[2.6rem] font-semibold leading-tight">
            One Platform.
            <br />
            Two Models
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft/75">
            Choose Your Inspection Approach. Whether you manage properties at scale or own a single home, PROOFIT
            delivers structured, AI-led home health assessments designed for your context.
          </p>
          <div className="tile mt-7 p-5 text-center">
            <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-xl bg-[#fcfcfe]">
              <Image
                src="/images/proofit-peace.png"
                alt="PROOFIT for Peace"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <div className="mt-5">
              <ArrowBtn href="/process" variant="white" className="border border-line">
                View Sample Report
              </ArrowBtn>
            </div>
          </div>
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

export function ModelsRevealMobile({ b2b, b2c }: { b2b: InspectionModel; b2c: InspectionModel }) {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:hidden">
      <h2 className="font-display text-4xl font-semibold leading-tight">
        One Platform.
        <br />
        Two Models
      </h2>
      <p className="mt-5 leading-relaxed text-ink-soft/75">
        Choose Your Inspection Approach. Whether you manage properties at scale or own a single home, PROOFIT
        delivers structured, AI-led home health assessments designed for your context.
      </p>
      <div className="tile mt-8 p-5 text-center">
        <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-xl bg-[#fcfcfe]">
          <Image src="/images/proofit-peace.png" alt="PROOFIT for Peace" fill sizes="176px" className="object-contain" />
        </div>
        <div className="mt-5">
          <ArrowBtn href="/process" variant="white" className="border border-line">
            View Sample Report
          </ArrowBtn>
        </div>
      </div>
      <div className="mt-8 grid gap-6">
        <ModelCard model={b2b} />
        <ModelCard model={b2c} />
      </div>
    </section>
  );
}
