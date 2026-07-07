"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowBtn from "./ArrowBtn";

export type ServiceSlide = {
  title: string;
  desc: string;
  benefits: string[];
  media: { type: "video"; src: string; poster: string } | { type: "image"; src: string };
  href: string;
  mediaAlt: string;
};

export default function ServicesCarousel({ slides }: { slides: ServiceSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <div className="grid overflow-hidden bg-ink text-white lg:grid-cols-2">
      {/* Media */}
      <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-[560px]">
        {slide.media.type === "video" ? (
          <video
            key={slide.media.src}
            className="absolute inset-0 h-full w-full object-cover"
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
        ) : (
          <Image
            key={slide.media.src}
            src={slide.media.src}
            alt={slide.mediaAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Panel */}
      <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Our Services</p>
        <p className="mt-8 font-display text-lg text-white/60">
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/35">/{String(slides.length).padStart(2, "0")}</span>
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight md:text-4xl">{slide.title}</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-white/75">{slide.desc}</p>

        <h4 className="mt-8 font-display text-xl font-semibold">Benefits</h4>
        <ul className="mt-4 grid max-w-lg gap-x-8 gap-y-4 sm:grid-cols-2">
          {slide.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-white/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-white" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5 9.5 18 20 6.5" stroke="#F7941D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex items-center gap-4">
          <ArrowBtn href={slide.href} variant="white">
            Learn More
          </ArrowBtn>
          <div className="ml-auto flex gap-2.5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous service"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 transition-colors hover:border-brand hover:text-brand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next service"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-all hover:bg-brand-deep"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* slide dots */}
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Service slides">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.title}
              onClick={() => setIndex(i)}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${i === index ? "w-8 bg-brand" : "w-4 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
