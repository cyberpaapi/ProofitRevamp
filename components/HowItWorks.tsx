"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";

type Step = {
  title: string;
  points: string[];
  image: string;
  intro?: string;
};

type MotionDirection = "forward" | "backward";

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [motion, setMotion] = useState<MotionDirection | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const indexRef = useRef(0);
  const scrollIndexRef = useRef(0);
  const leaveTimerRef = useRef<number | null>(null);
  const transitionRef = useRef<(nextIndex: number, direction?: MotionDirection) => void>(() => {});
  const step = steps[index];

  transitionRef.current = (nextIndex: number, direction?: MotionDirection) => {
    const normalized = (nextIndex + steps.length) % steps.length;
    const current = indexRef.current;
    if (current === normalized) return;
    const resolvedDirection = direction ?? (normalized < current ? "backward" : "forward");

    if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current);
    setMotion(resolvedDirection);
    setLeavingIndex(resolvedDirection === "forward" ? current : null);
    indexRef.current = normalized;
    setIndex(normalized);
    leaveTimerRef.current = window.setTimeout(() => {
      setLeavingIndex(null);
      setMotion(null);
      leaveTimerRef.current = null;
    }, 520);
  };

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
      if (nextIndex !== scrollIndexRef.current) {
        const direction = nextIndex < scrollIndexRef.current ? "backward" : "forward";
        scrollIndexRef.current = nextIndex;
        transitionRef.current(nextIndex, direction);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [steps.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || steps.length <= 1) return;
    const timer = window.setTimeout(() => {
      transitionRef.current(indexRef.current + 1, "forward");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [index, isPaused, isVisible, steps.length]);

  const selectIndex = (nextIndex: number) => {
    const normalized = (nextIndex + steps.length) % steps.length;
    const direction = nextIndex < indexRef.current ? "backward" : "forward";
    transitionRef.current(normalized, direction);
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

  const onTouchStart = (event: TouchEvent) => {
    setIsPaused(true);
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const startX = touchX.current;
    touchX.current = null;
    setIsPaused(false);
    if (startX === null) return;
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 48) selectIndex(index + (distance < 0 ? 1 : -1));
  };

  return (
    <section
      ref={stageRef}
      className="relative"
      style={{ height: `calc(100svh + ${(steps.length - 1) * 70}svh)` }}
    >
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center py-6 lg:top-[72px] lg:h-[calc(100svh-72px)] lg:py-8">
        <div
          className="relative min-h-0 flex-1 touch-pan-y pt-9 md:pt-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => {
            touchX.current = null;
            setIsPaused(false);
          }}
        >
          <div
            className="absolute left-[2.25rem] top-0 h-[calc(100%-2.25rem)] w-[calc(100%-2.25rem)] rounded-[1.75rem] border-2 border-brand bg-white md:left-[4.5rem] md:h-[calc(100%-3.5rem)] md:w-[calc(100%-4.5rem)]"
            aria-hidden
          />
          <div
            className="absolute left-6 top-3 h-[calc(100%-1.5rem)] w-[calc(100%-2.25rem)] rounded-[1.75rem] border-2 border-brand bg-white md:left-12 md:top-5 md:h-[calc(100%-2.5rem)] md:w-[calc(100%-4.5rem)]"
            aria-hidden
          />
          <div
            className="absolute left-3 top-6 h-[calc(100%-0.75rem)] w-[calc(100%-2.25rem)] rounded-[1.75rem] border-2 border-brand bg-white md:left-6 md:top-10 md:h-[calc(100%-1.25rem)] md:w-[calc(100%-4.5rem)]"
            aria-hidden
          />

          <article
            key={step.title}
            className={`${motion === "backward" ? "deck-enter-left z-20" : ""} relative h-[calc(100%-2.25rem)] w-[calc(100%-2.25rem)] overflow-hidden rounded-[1.75rem] border-2 border-brand bg-white p-4 text-ink shadow-[0_24px_60px_rgba(17,17,18,0.12)] sm:p-5 md:h-[calc(100%-3.5rem)] md:w-[calc(100%-4.5rem)] md:p-8 lg:p-10`}
          >
            <div className="grid h-full min-h-0 grid-rows-[20svh_1fr] gap-4 md:grid-cols-[minmax(280px,0.82fr)_1.18fr] md:grid-rows-1 md:gap-10 lg:gap-16">
              <div className="relative min-h-0 overflow-hidden rounded-[1.4rem]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 470px, (min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div className="flex min-h-0 flex-col overflow-hidden pb-1 md:justify-center md:py-3 md:pr-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55 sm:text-sm">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl md:mt-2 md:text-[2rem]">
                  {step.title}
                </h3>
                {step.intro && (
                  <p className="mt-1 text-xs leading-relaxed text-ink/75 sm:text-sm md:mt-3 md:text-base">
                    {step.intro}
                  </p>
                )}
                <ul className="mt-3 grid gap-2 sm:mt-4 md:mt-6 md:gap-3">
                  {step.points.map((point) => (
                    <li key={point} className="rounded-lg border border-brand/20 bg-brand/[0.06] px-3 py-2 text-xs font-semibold leading-snug text-ink sm:text-sm md:px-5 md:py-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {leavingIndex !== null && (
            <article
              key={`leaving-${leavingIndex}-${index}`}
              className="deck-exit-left absolute left-0 top-9 z-20 h-[calc(100%-2.25rem)] w-[calc(100%-2.25rem)] overflow-hidden rounded-[1.75rem] border-2 border-brand bg-white p-4 text-ink shadow-[0_24px_60px_rgba(17,17,18,0.12)] sm:p-5 md:top-14 md:h-[calc(100%-3.5rem)] md:w-[calc(100%-4.5rem)] md:p-8 lg:p-10"
              aria-hidden
            >
              <div className="grid h-full min-h-0 grid-rows-[20svh_1fr] gap-4 md:grid-cols-[minmax(280px,0.82fr)_1.18fr] md:grid-rows-1 md:gap-10 lg:gap-16">
                <div className="relative min-h-0 overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={steps[leavingIndex].image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 470px, (min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-h-0 flex-col overflow-hidden pb-1 md:justify-center md:py-3 md:pr-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/55 sm:text-sm">
                    Step {String(leavingIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl md:mt-2 md:text-[2rem]">
                    {steps[leavingIndex].title}
                  </h3>
                  {steps[leavingIndex].intro && (
                    <p className="mt-1 text-xs leading-relaxed text-ink/75 sm:text-sm md:mt-3 md:text-base">
                      {steps[leavingIndex].intro}
                    </p>
                  )}
                  <ul className="mt-3 grid gap-2 sm:mt-4 md:mt-6 md:gap-3">
                    {steps[leavingIndex].points.map((point) => (
                      <li key={point} className="rounded-lg border border-brand/20 bg-brand/[0.06] px-3 py-2 text-xs font-semibold leading-snug text-ink sm:text-sm md:px-5 md:py-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-label={`Step ${index + 1} of ${steps.length}`}>
          {steps.map((item, stepIndex) => (
            <span
              key={item.title}
              aria-label={`View step ${stepIndex + 1}: ${item.title}`}
              aria-current={stepIndex === index ? "step" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                stepIndex === index ? "w-8 bg-brand" : "w-4 bg-brand/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
