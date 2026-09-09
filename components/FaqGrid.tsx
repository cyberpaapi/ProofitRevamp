"use client";
import { useId, useState } from "react";
export default function FaqGrid({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return <div className="grid items-start gap-4 md:grid-cols-2">
    {faqs.map((faq, index) => <div key={faq.q} className={`rounded-2xl border bg-white transition-colors ${open === index ? "border-brand shadow-sm" : "border-line"}`}>
      <h3><button type="button" className="flex min-h-16 w-full items-center justify-between gap-4 p-5 text-left font-semibold" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`${id}-${index}`}>
        {faq.q}<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl text-brand-deep" aria-hidden>{open === index ? "−" : "+"}</span>
      </button></h3>
      <div id={`${id}-${index}`} hidden={open !== index} className="px-5 pb-6 leading-relaxed text-ink-soft">{faq.a}</div>
    </div>)}
  </div>;
}
