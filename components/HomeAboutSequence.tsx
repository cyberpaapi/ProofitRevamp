"use client";

import { useEffect, useRef } from "react";
import ArrowBtn from "@/components/ArrowBtn";

const distinction = [
  "Affordable Pricing",
  "Highly Trained Expert Care",
  "Tailored Packages",
  "Interactive Reporting",
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 12.5 9.5 18 20 6.5"
      stroke="#F7941D"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function AboutCopy() {
  return (
    <>
      <p className="leading-relaxed text-ink-soft/85">
        With decades of combined engineering and on-site building experience, the PROOFIT team understands how
        homes are built and where they commonly fail. We combine hands-on expertise with{" "}
        <strong className="font-semibold text-ink">IR technology (Thermal Scanning)</strong> to detect issues that
        traditional visual inspections often miss.
      </p>
      <div className="mt-7">
        <ArrowBtn href="/about" variant="dark">
          About Us
        </ArrowBtn>
      </div>
    </>
  );
}

function Distinction() {
  return (
    <>
      <h3 className="font-display text-2xl font-semibold md:text-3xl">
        The PROOFIT
        <br />
        Distinction
      </h3>
      <div className="mt-6 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
        {distinction.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink" aria-hidden>
              <Check />
            </span>
            <p className="text-sm font-semibold leading-snug">{item}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function HomeAboutSequence() {
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    if (!stage || !canvas || !image || !title) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const render = () => {
      raf = 0;
      const stageTop = stage.getBoundingClientRect().top;
      const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
      const progress = reducedMotion ? 1 : clamp(-stageTop / scrollable);
      const morph = clamp((progress - 0.12) / 0.72);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      image.style.left = `${lerp(width * 0.12, 0, morph)}px`;
      image.style.top = `${lerp(height * 0.2, height * 0.14, morph)}px`;
      image.style.width = `${lerp(width * 0.62, width, morph)}px`;
      image.style.height = `${lerp(height * 0.58, height * 0.72, morph)}px`;
      title.style.transform = `translate3d(0, ${-110 * morph}px, 0)`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section ref={stageRef} className="relative z-10 bg-white">
      <div className="mx-auto hidden max-w-[1200px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 lg:grid">
        <div>
          <div ref={canvasRef} className="sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden">
            <h2
              ref={titleRef}
              className="absolute left-0 top-[9%] z-[3] font-display text-5xl font-semibold will-change-transform"
            >
              About Us
            </h2>
            <div
              id="about-service-media-source"
              ref={imageRef}
              className="absolute z-[2] overflow-hidden rounded-2xl will-change-[left,top,width,height]"
              style={{ left: "12%", top: "20%", width: "62%", height: "58%" }}
            >
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Proofit inspector using a tablet during a property assessment"
              >
                <source src="/videos/S1.mp4?v=pexels-29296279" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start pb-12 pt-[9vh]">
            <div className="w-full">
              <AboutCopy />
            </div>
          </div>

          <div className="flex min-h-[calc(100vh-72px)] translate-x-5 flex-col justify-start pb-16 pt-4">
            <div>
              <Distinction />
            </div>
            <div>
              <h2 className="mt-16 font-display text-5xl font-semibold leading-[1.15]">
                Delivering Up to 30% Greater Cost Savings Than Conventional Vendors
              </h2>
              <p className="mt-5 max-w-xl text-ink-soft/75">
                A wide array of pre-emptive and problem-solving inspection services designed to protect your
                property, your investment, and your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 lg:hidden">
        <h2 className="font-display text-4xl font-semibold sm:text-5xl">About Us</h2>
        <div className="relative -mx-5 mt-8 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-2xl">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Proofit inspector using a tablet during a property assessment"
          >
            <source src="/videos/S1.mp4?v=pexels-29296279" type="video/mp4" />
          </video>
        </div>
        <div className="mt-8">
          <AboutCopy />
        </div>
        <div className="mt-8">
          <Distinction />
        </div>
        <div className="mt-14">
          <h2 className="font-display text-3xl font-semibold leading-[1.15] sm:text-4xl">
            Delivering Up to 30% Greater Cost Savings Than Conventional Vendors
          </h2>
          <p className="mt-5 text-ink-soft/75">
            A wide array of pre-emptive and problem-solving inspection services designed to protect your property,
            your investment, and your peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
}
