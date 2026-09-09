"use client";
import { useEffect, useId, useState } from "react";
export default function FaqGrid({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [paired, setPaired] = useState(false);
  const id = useId();
  useEffect(() => {
    // Match the two-column breakpoint: single questions on phones, pairs on desktop/tablet.
    const media = window.matchMedia("(min-width: 48rem)");
    const update = () => setPaired(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const isOpen = (index: number) => open !== null && (paired ? Math.floor(open / 2) === Math.floor(index / 2) : open === index);
  return <div data-faq-grid className="grid items-stretch gap-4 md:grid-cols-2">
    {faqs.map((faq, index) => <div key={faq.q} className={`rounded-2xl border bg-white transition-colors ${isOpen(index) ? "border-brand shadow-sm" : "border-line"}`}>
      <h3><button type="button" className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl p-5 text-left font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand" onClick={() => setOpen(isOpen(index) ? null : index)} aria-expanded={isOpen(index)} aria-controls={`${id}-${index}`}>
        {faq.q}<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xl text-brand-deep" aria-hidden>{isOpen(index) ? "−" : "+"}</span>
      </button></h3>
      <div id={`${id}-${index}`} hidden={!isOpen(index)} className="px-5 pb-6 leading-relaxed text-ink-soft">{faq.a}</div>
    </div>)}
  </div>;
}
