"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";

type Step = {
  title: string;
  points?: string[];
  image: string;
  intro?: string;
  body?: string[];
  outro?: string;
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
      <div className="how-it-works-sticky sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center py-2 lg:top-[72px] lg:h-[calc(100svh-72px)] lg:py-3">
        <div
          className="relative min-h-0 flex-1 touch-pan-y"
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
            className="absolute left-[6%] top-0 h-[94%] w-[94%] rounded-[1.5rem] border-2 border-brand bg-white md:rounded-[1.75rem]"
            aria-hidden
          />
          <div
            className="absolute left-[4%] top-[2%] h-[94%] w-[94%] rounded-[1.5rem] border-2 border-brand bg-white md:rounded-[1.75rem]"
            aria-hidden
          />
          <div
            className="absolute left-[2%] top-[4%] h-[94%] w-[94%] rounded-[1.5rem] border-2 border-brand bg-white md:rounded-[1.75rem]"
            aria-hidden
          />

          <article
            key={step.title}
            className={`${motion === "backward" ? "deck-enter-left z-20" : ""} how-it-works-card absolute bottom-0 left-0 z-10 h-[94%] w-[94%] overflow-hidden rounded-[1.5rem] border-2 border-brand bg-white p-3.5 text-ink shadow-[0_20px_50px_rgba(17,17,18,0.12)] min-[390px]:p-4 sm:p-5 md:rounded-[1.75rem] md:p-7 lg:p-9`}
          >
            <div className="how-it-works-grid grid h-full min-h-0 grid-rows-[clamp(14rem,34svh,19rem)_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(280px,1.1fr)_minmax(0,0.9fr)] sm:grid-rows-1 sm:gap-6 md:grid-cols-[minmax(390px,1.25fr)_minmax(0,0.75fr)] md:gap-8 lg:gap-10">
              <div className="relative min-h-0 overflow-hidden rounded-[1.15rem] bg-[#f3f1ed] md:rounded-[1.4rem]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 38vw, 90vw"
                  className="object-contain object-center"
                  priority={index === 0}
                />
              </div>

              <div className="how-it-works-content flex min-h-0 flex-col items-stretch justify-start overflow-hidden pb-0.5 pt-2 text-justify sm:items-center sm:justify-center sm:px-2 sm:py-2 sm:text-center md:px-3 md:py-3">
                <p className="how-it-works-step text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink/60 min-[390px]:text-xs sm:text-sm">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="how-it-works-title mt-0.5 font-display text-xl font-semibold tracking-tight min-[390px]:text-[1.375rem] sm:text-2xl md:mt-2 md:text-[2rem]">
                  {step.title}
                </h3>
                {step.intro && (
                  <p className="how-it-works-intro mt-1 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                    {step.intro}
                  </p>
                )}
                {step.body?.map((paragraph) => (
                  <p key={paragraph} className="how-it-works-intro mt-2 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {step.points && (
                  <ul className="how-it-works-list mt-2 grid w-full gap-1 min-[390px]:mt-2.5 min-[390px]:gap-1.5 sm:mt-3 md:mt-4 md:gap-2">
                    {step.points.map((point) => (
                      <li key={point} className="how-it-works-point rounded-lg border border-brand/20 bg-brand/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold leading-snug text-ink min-[390px]:px-3 min-[390px]:py-1.5 min-[390px]:text-xs sm:text-sm md:px-4 md:py-2">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {step.outro && (
                  <p className="how-it-works-intro mt-2 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                    {step.outro}
                  </p>
                )}
              </div>
            </div>
          </article>

          {leavingIndex !== null && (
            <article
              key={`leaving-${leavingIndex}-${index}`}
              className="deck-exit-left how-it-works-card absolute bottom-0 left-0 z-20 h-[94%] w-[94%] overflow-hidden rounded-[1.5rem] border-2 border-brand bg-white p-3.5 text-ink shadow-[0_20px_50px_rgba(17,17,18,0.12)] min-[390px]:p-4 sm:p-5 md:rounded-[1.75rem] md:p-7 lg:p-9"
              aria-hidden
            >
              <div className="how-it-works-grid grid h-full min-h-0 grid-rows-[clamp(14rem,34svh,19rem)_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(280px,1.1fr)_minmax(0,0.9fr)] sm:grid-rows-1 sm:gap-6 md:grid-cols-[minmax(390px,1.25fr)_minmax(0,0.75fr)] md:gap-8 lg:gap-10">
                <div className="relative min-h-0 overflow-hidden rounded-[1.15rem] bg-[#f3f1ed] md:rounded-[1.4rem]">
                  <Image
                    src={steps[leavingIndex].image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 38vw, 90vw"
                    className="object-contain object-center"
                  />
                </div>
                <div className="how-it-works-content flex min-h-0 flex-col items-stretch justify-start overflow-hidden pb-0.5 pt-2 text-justify sm:items-center sm:justify-center sm:px-2 sm:py-2 sm:text-center md:px-3 md:py-3">
                  <p className="how-it-works-step text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ink/60 min-[390px]:text-xs sm:text-sm">
                    Step {String(leavingIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="how-it-works-title mt-0.5 font-display text-xl font-semibold tracking-tight min-[390px]:text-[1.375rem] sm:text-2xl md:mt-2 md:text-[2rem]">
                    {steps[leavingIndex].title}
                  </h3>
                  {steps[leavingIndex].intro && (
                    <p className="how-it-works-intro mt-1 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                      {steps[leavingIndex].intro}
                    </p>
                  )}
                  {steps[leavingIndex].body?.map((paragraph) => (
                    <p key={paragraph} className="how-it-works-intro mt-2 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {steps[leavingIndex].points && (
                    <ul className="how-it-works-list mt-2 grid w-full gap-1 min-[390px]:mt-2.5 min-[390px]:gap-1.5 sm:mt-3 md:mt-4 md:gap-2">
                      {steps[leavingIndex].points.map((point) => (
                        <li key={point} className="how-it-works-point rounded-lg border border-brand/20 bg-brand/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold leading-snug text-ink min-[390px]:px-3 min-[390px]:py-1.5 min-[390px]:text-xs sm:text-sm md:px-4 md:py-2">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {steps[leavingIndex].outro && (
                    <p className="how-it-works-intro mt-2 text-xs leading-snug text-ink/75 min-[390px]:text-[0.8125rem] sm:text-sm md:mt-3 md:text-base md:leading-relaxed">
                      {steps[leavingIndex].outro}
                    </p>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="how-it-works-progress mt-2 flex justify-center gap-2" aria-label={`Step ${index + 1} of ${steps.length}`}>
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
