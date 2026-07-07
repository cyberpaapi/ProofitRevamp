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
      {/* stacked card look */}
      <div className="relative">
        <div className="absolute inset-x-3 -top-2 h-full rounded-2xl border border-brand/35 bg-white" aria-hidden />
        <div className="absolute inset-x-6 -top-4 h-full rounded-2xl border border-brand/20 bg-white" aria-hidden />
        <div className="relative grid overflow-hidden rounded-2xl border border-brand/60 bg-white md:grid-cols-[minmax(260px,380px)_1fr]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
            <Image
              key={step.image}
              src={step.image}
              alt={step.title}
              fill
              sizes="(min-width: 768px) 380px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-7 md:p-10">
            <p className="font-display text-sm font-medium text-ink-soft/70">Step {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl">{step.title}</h3>
            {step.intro && <p className="mt-2 text-ink-soft/75">{step.intro}</p>}
            <ul className="mt-5 space-y-3">
              {step.points.map((p) => (
                <li key={p} className="rounded-xl bg-cream px-5 py-3.5 text-sm font-medium text-ink">
                  {p}
                </li>
              ))}
            </ul>
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
