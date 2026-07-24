"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowBtn from "./ArrowBtn";

export type ServiceSlide = {
  title: string;
  desc: string;
  benefits: string[];
  media:
    | { type: "video"; src: string; poster: string }
    | { type: "image"; src: string }
    | { type: "placeholder" };
  href: string;
  mediaAlt: string;
};

export default function ServicesCarousel({ slides }: { slides: ServiceSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [index, slides.length]);

  const selectIndex = (nextIndex: number) => {
    const normalized = (nextIndex + slides.length) % slides.length;
    setIndex(normalized);
  };
  const go = (dir: 1 | -1) => selectIndex(index + dir);

  // swipe: left = next, right = previous
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  return (
    <section className="relative bg-ink">
      <div
        className="grid min-h-[calc(100svh-4rem)] touch-pan-y gap-3 bg-ink text-white sm:gap-4 lg:min-h-[calc(100svh-72px)] lg:grid-cols-2 lg:gap-0"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Media */}
        <div
          id="service-one-media-target"
          data-active-service-index={index}
          className="relative h-[26svh] min-h-[180px] max-h-[280px] bg-black sm:h-[30svh] lg:h-auto lg:max-h-none"
        >
          {slide.media.type === "video" ? (
            <video
              key={slide.media.src}
              className="service-card-enter absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={slide.media.poster}
              aria-label={slide.mediaAlt}
            >
              <source src={slide.media.src} type="video/mp4" />
            </video>
          ) : slide.media.type === "image" ? (
            <Image
              key={slide.media.src}
              src={slide.media.src}
              alt={slide.mediaAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="service-card-enter object-cover"
            />
          ) : (
            <video
              className="service-card-enter absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={slide.mediaAlt}
            >
              <source src="/videos/S1.mp4?v=pexels-29296279" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Panel */}
        <div key={`service-panel-${index}`} className="service-card-enter relative flex min-h-0 flex-col justify-center px-5 pb-8 pt-8 sm:px-7 sm:pb-10 sm:pt-9 md:p-10 lg:overflow-hidden lg:p-16">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">Our Services</p>
          <p className="mt-2 font-display text-base text-white/60 lg:mt-8 lg:text-lg">
            {String(index + 1).padStart(2, "0")}
            <span className="text-white/35">/{String(slides.length).padStart(2, "0")}</span>
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold leading-tight md:text-3xl lg:mt-2 lg:text-4xl">{slide.title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75 lg:mt-4 lg:text-base">{slide.desc}</p>

          <h4 className="mt-4 font-display text-lg font-semibold lg:mt-8 lg:text-xl">Benefits</h4>
          <ul className="mt-2 grid max-w-lg grid-cols-2 gap-x-4 gap-y-2 lg:mt-4 lg:gap-x-8 lg:gap-y-4">
            {slide.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-xs text-white/85 sm:text-sm lg:gap-3">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-white lg:h-5 lg:w-5" aria-hidden>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-3 lg:mt-9 lg:gap-4">
            <ArrowBtn href={slide.href} variant="white">
              Learn More
            </ArrowBtn>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous service"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand hover:text-brand lg:h-11 lg:w-11"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next service"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep lg:h-11 lg:w-11"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 lg:mt-8" role="tablist" aria-label="Service slides">
            {slides.map((service, serviceIndex) => (
              <button
                key={service.title}
                type="button"
                role="tab"
                aria-selected={serviceIndex === index}
                aria-label={service.title}
                onClick={() => selectIndex(serviceIndex)}
                className={`h-1.5 cursor-pointer rounded-full transition-all ${serviceIndex === index ? "w-8 bg-brand" : "w-4 bg-white/25 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
