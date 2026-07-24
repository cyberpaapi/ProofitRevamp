"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Step = {
  title: string;
  points: string[];
  image: string;
  intro?: string;
};

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const step = steps[index];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    const render = () => {
      raf = 0;
      const bounds = stage.getBoundingClientRect();
      const travel = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const nextIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setIndex((current) => current === nextIndex ? current : nextIndex);
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
  }, [steps.length]);

  const selectIndex = (nextIndex: number) => {
    const normalized = (nextIndex + steps.length) % steps.length;
    setIndex(normalized);
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const stageTop = window.scrollY + bounds.top;
    const travel = Math.max(1, stage.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: stageTop + (normalized / Math.max(1, steps.length - 1)) * travel,
      behavior: "smooth",
    });
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(distance) > 48) selectIndex(index + (distance < 0 ? 1 : -1));
  };

  return (
    <section
      ref={stageRef}
      className="relative"
      style={{ height: `calc(100svh + ${(steps.length - 1) * 70}svh)` }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center py-8 lg:top-[72px] lg:h-[calc(100svh-72px)]">
        <div
          className="relative min-h-0 flex-1 touch-pan-y pt-7"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute left-1/2 top-0 h-16 w-[calc(100%-4rem)] -translate-x-1/2 rounded-t-2xl border border-brand/30 bg-white" aria-hidden />
          <div className="absolute left-1/2 top-3.5 h-16 w-[calc(100%-2rem)] -translate-x-1/2 rounded-t-2xl border border-brand/50 bg-white" aria-hidden />

          <article
            key={step.title}
            className="deck-enter relative h-full overflow-hidden rounded-2xl border border-brand bg-white p-4 md:p-6"
          >
            <div className="grid h-full min-h-0 grid-rows-[22svh_1fr] gap-4 md:grid-cols-[minmax(260px,420px)_1fr] md:grid-rows-1 md:gap-10">
              <div className="relative min-h-0 overflow-hidden rounded-xl">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="min-h-0 overflow-hidden pb-1 md:py-3 md:pr-3">
                <p className="text-xs text-ink-soft/70 sm:text-sm">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-ink sm:text-2xl md:text-[1.75rem]">
                  {step.title}
                </h3>
                {step.intro && <p className="mt-1 text-xs leading-relaxed text-ink-soft/80 sm:text-sm md:mt-2 md:text-base">{step.intro}</p>}
                <ul className="mt-3 grid gap-2 md:mt-5 md:gap-3">
                  {step.points.map((point) => (
                    <li key={point} className="rounded-lg bg-cream px-3 py-2 text-xs font-semibold leading-snug text-ink sm:text-sm md:px-5 md:py-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-4 hidden flex-wrap items-center justify-center gap-3 md:flex">
          {steps.map((item, stepIndex) => (
            <button
              key={item.title}
              type="button"
              onClick={() => selectIndex(stepIndex)}
              aria-pressed={stepIndex === index}
              className={`cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors ${
                stepIndex === index
                  ? "bg-ink text-white"
                  : "border border-line text-ink-soft hover:border-brand hover:text-brand-deep"
              }`}
            >
              {String(stepIndex + 1).padStart(2, "0")} · {item.title}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden" aria-label={`Step ${index + 1} of ${steps.length}`}>
          {steps.map((item, stepIndex) => (
            <span
              key={item.title}
              className={`h-1.5 rounded-full transition-all ${
                stepIndex === index ? "w-8 bg-brand" : "w-4 bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
