"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Step = {
  title: string;
  points: string[];
  image: string;
  intro?: string;
};

const CYCLE_MS = 7000;
const LEAVE_MS = 300;

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const busyRef = useRef(false);
  const step = steps[index];

  const cycle = useCallback((next: (i: number) => number) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setLeaving(true);
    setTimeout(() => {
      setIndex(next);
      setLeaving(false);
      busyRef.current = false;
    }, LEAVE_MS);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => cycle((i) => (i + 1) % steps.length), CYCLE_MS);
  }, [cycle, steps.length]);

  // auto-advance: front card animates to the back of the deck every 7s, looping
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const manualDir = (dir: 1 | -1) => {
    cycle((i) => (i + dir + steps.length) % steps.length);
    resetTimer();
  };
  const manualTo = (target: number) => {
    cycle(() => target);
    resetTimer();
  };

  // swipe: left = next card, right = previous card
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) manualDir(dx < 0 ? 1 : -1);
  };

  return (
    <div>
      {/* stacked card deck — two outlines peeking above the live card */}
      <div className="relative mt-8 touch-pan-y" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="absolute -top-7 left-1/2 h-16 w-[calc(100%-6rem)] -translate-x-1/2 rounded-t-2xl border border-brand/30 bg-white" aria-hidden />
        <div className="absolute -top-3.5 left-1/2 h-16 w-[calc(100%-3rem)] -translate-x-1/2 rounded-t-2xl border border-brand/50 bg-white" aria-hidden />
        <div className={`relative overflow-hidden rounded-2xl border border-brand bg-white p-5 md:p-7 ${leaving ? "deck-leave" : "deck-enter"}`}>
          <div className="grid gap-8 md:grid-cols-[minmax(260px,420px)_1fr] md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:min-h-[440px]">
              <Image
                key={step.image}
                src={step.image}
                alt={step.title}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            {/* fixed min-height so every card in the deck is the same size */}
            <div className="min-h-[430px] pb-2 sm:min-h-[400px] md:min-h-[440px] md:py-4 md:pr-4">
              <p className="text-ink-soft/80">Step {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-[1.75rem]">
                {step.title}
              </h3>
              {step.intro && <p className="mt-2 text-ink-soft/80">{step.intro}</p>}
              <ul className="mt-6 space-y-4">
                {step.points.map((p) => (
                  <li key={p} className="rounded-lg bg-cream px-5 py-4 text-[15px] font-semibold text-ink">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* step controls — desktop only; phones swipe */}
      <div className="mt-8 hidden flex-wrap items-center justify-center gap-3 md:flex">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => {
              if (i !== index) manualTo(i);
            }}
            aria-pressed={i === index}
            className={`cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all ${
              i === index ? "bg-ink text-white" : "border border-line text-ink-soft hover:border-brand hover:text-brand-deep"
            }`}
          >
            {String(i + 1).padStart(2, "0")} · {s.title}
          </button>
        ))}
      </div>

      {/* mobile dots */}
      <div className="mt-6 flex justify-center gap-2 md:hidden" aria-hidden>
        {steps.map((s, i) => (
          <span key={s.title} className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-4 bg-line"}`} />
        ))}
      </div>
    </div>
  );
}
