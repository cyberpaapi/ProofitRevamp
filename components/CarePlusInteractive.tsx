"use client";

import { useRef, useState } from "react";

type Service = {
  title: string;
  body: string;
};

type Reason = {
  title: string;
  desc: string;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarouselButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

export function CareServices({ services }: { services: Service[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + services.length) % services.length);
  };

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Our Services</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
          Twelve Solutions. One Platform.
        </h2>

        <div className="mt-10 lg:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const distance = event.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(distance) > 48) go(distance < 0 ? 1 : -1);
            }}
          >
            <article key={services[index].title} className="service-content-fade rounded-2xl border border-ink/15 bg-white p-6 sm:p-8" aria-live="polite">
              <p className="font-display text-sm font-semibold text-brand">
                {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">{services[index].title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft/80 md:mt-5">{services[index].body}</p>
            </article>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <CarouselButton label="Previous service" direction="left" onClick={() => go(-1)} />
            <CarouselButton label="Next service" direction="right" onClick={() => go(1)} />
            <div className="ml-2 h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10" aria-hidden>
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-300"
                style={{ width: `${((index + 1) / services.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 hidden grid-cols-2 gap-5 lg:grid xl:grid-cols-3">
          {services.map((service, serviceIndex) => (
            <article key={service.title} className="rounded-2xl border border-ink/15 bg-white p-7">
              <p className="font-display text-sm font-semibold text-brand">{String(serviceIndex + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft/80">{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareWhyCarousel({ reasons }: { reasons: Reason[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (direction: 1 | -1) => {
    setIndex((current) => (current + direction + reasons.length) % reasons.length);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-2xl bg-ink p-7 text-white md:p-12">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Why Proofit Care+</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] md:text-5xl">
            Why property owners stay with us.
          </h2>

          <div
            className="mt-10"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const distance = event.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(distance) > 48) go(distance < 0 ? 1 : -1);
            }}
          >
            <article key={reasons[index].title} className="service-content-fade grid gap-6 border-t border-white/15 pt-8 md:grid-cols-[160px_1fr] md:gap-12" aria-live="polite">
              <p className="font-display text-lg font-semibold text-brand">
                {String(index + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
              </p>
              <div>
                <h3 className="max-w-2xl font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {reasons[index].title}
                </h3>
                <p className="mt-4 max-w-3xl leading-relaxed text-white/72">{reasons[index].desc}</p>
              </div>
            </article>
          </div>

          <div className="mt-9 flex gap-3">
            <CarouselButton label="Previous reason" direction="left" onClick={() => go(-1)} />
            <CarouselButton label="Next reason" direction="right" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
