"use client";

import { useState } from "react";

const items = [
  {
    title: "Independence",
    body: "We don't sell repairs, materials, or contracting. Our only product is the truth about your property — which is why our reports carry weight with builders and societies.",
  },
  {
    title: "Evidence",
    body: "Every finding is photographed, thermally documented where relevant, and severity-graded. If we can't show it, we don't report it.",
  },
  {
    title: "Clarity",
    body: "Reports are written for homeowners and structured for site teams. You understand what's wrong, and your contractor knows exactly what to fix.",
  },
];

export default function AboutAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-white/15 border-y border-white/15">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
              aria-expanded={open}
            >
              <span className="font-display text-xl font-semibold text-white md:text-2xl">{item.title}</span>
              <span
                className={`relative h-9 w-9 shrink-0 rounded-full border border-brand transition-colors ${
                  open ? "bg-brand" : "bg-transparent"
                }`}
                aria-hidden
              >
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white" />
                <span
                  className={`absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 leading-relaxed text-white/72">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
