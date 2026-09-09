"use client";
import { useState } from "react";
export function CareServices({ services }: { services: { title: string; body: string; slug?: string }[] }) {
  return <section className="bg-cream py-16 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="font-display text-sm font-semibold uppercase tracking-[.18em] text-brand">Our Services</p>
    <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Complete care. One platform.</h2>
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <article id={service.slug} key={service.slug || service.title} className="scroll-mt-28 rounded-2xl border border-ink/15 bg-white p-7 shadow-[0_6px_20px_rgba(0,0,0,.06)] transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-lg motion-reduce:transform-none">
      <p className="text-sm font-semibold text-brand-deep">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-4 font-display text-xl font-semibold">{service.title}</h3><p className="mt-4 text-sm leading-relaxed text-ink-soft">{service.body}</p>
    </article>)}</div>
  </div></section>;
}
export function CareWhyCarousel({ reasons }: { reasons: { title: string; desc: string }[] }) {
  const [index, setIndex] = useState(0);
  const pages = Array.from({ length: Math.ceil(reasons.length / 4) }, (_, i) => reasons.slice(i * 4, i * 4 + 4));
  return <section className="py-16 md:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand">Why Proofit Care+</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold md:text-5xl">Why property owners stay with us.</h2>
    <div className="mt-10 grid" aria-live="polite">{pages.map((page, pageIndex) => <div key={pageIndex} className={`col-start-1 row-start-1 grid grid-cols-1 gap-5 sm:grid-cols-2 transition-opacity duration-300 ${pageIndex === index ? "opacity-100" : "invisible opacity-0"}`} aria-hidden={pageIndex !== index}>
      {page.map((reason, reasonIndex) => <article key={reason.title} className="rounded-2xl bg-ink p-7 text-white md:p-8"><p className="text-sm font-semibold text-brand">{String(pageIndex * 4 + reasonIndex + 1).padStart(2, "0")}</p><h3 className="mt-3 text-xl font-semibold">{reason.title}</h3><p className="mt-4 leading-relaxed text-white/80">{reason.desc}</p></article>)}
    </div>)}</div>
    <div className="mt-6 flex items-center justify-end gap-3"><span className="mr-2 text-sm">{index + 1} / {pages.length}</span>{[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? "Previous reasons" : "Next reasons"} onClick={() => setIndex((index + direction + pages.length) % pages.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-white text-xl transition-colors hover:bg-brand hover:text-white">{direction < 0 ? "←" : "→"}</button>)}</div>
  </div></section>;
}
