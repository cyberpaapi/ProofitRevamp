"use client";

import Image from "next/image";
import { useState } from "react";

type Step = {
  title: string;
  points: string[];
  image: string;
  intro?: string;
};

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <div>
      {/* stacked card deck — two outlines peeking above the live card */}
      <div className="relative mt-8">
        <div className="absolute -top-7 left-1/2 h-16 w-[calc(100%-6rem)] -translate-x-1/2 rounded-t-2xl border border-brand/30 bg-white" aria-hidden />
        <div className="absolute -top-3.5 left-1/2 h-16 w-[calc(100%-3rem)] -translate-x-1/2 rounded-t-2xl border border-brand/50 bg-white" aria-hidden />
        <div className="relative overflow-hidden rounded-2xl border border-brand bg-white p-5 md:p-7">
          <div className="grid gap-8 md:grid-cols-[minmax(260px,420px)_1fr] md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[5/6] md:max-h-[440px]">
              <Image
                key={step.image}
                src={step.image}
                alt={step.title}
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pb-2 md:py-4 md:pr-4">
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

      {/* step controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={`cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-all ${
              i === index ? "bg-ink text-white" : "border border-line text-ink-soft hover:border-brand hover:text-brand-deep"
            }`}
          >
            {String(i + 1).padStart(2, "0")} · {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
