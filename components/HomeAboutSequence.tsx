"use client";

import { useEffect, useRef } from "react";
import ArrowBtn from "@/components/ArrowBtn";
import Reveal from "@/components/Reveal";

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

function AboutVideo({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-ink shadow-[0_24px_70px_-38px_rgba(17,17,18,0.5)] ${className}`}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Proofit inspector using a tablet during a property assessment"
      >
        <source src="/videos/S1.mp4?v=pexels-29296279" type="video/mp4" />
      </video>
    </div>
  );
}

function AboutCopy({ hideCta = false }: { hideCta?: boolean }) {
  return (
    <>
      <p className="max-w-xl font-body text-base leading-[1.75] text-ink-soft/85 xl:text-[1.05rem]">
        With decades of combined engineering and on-site building experience, the PROOFIT team understands how
        homes are built and where they commonly fail. We combine hands-on expertise with{" "}
        <strong className="font-semibold text-ink">IR technology (Thermal Scanning)</strong> to detect issues that
        traditional visual inspections often miss.
      </p>
      {!hideCta && (
        <div className="mt-7">
          <ArrowBtn href="/about" variant="dark" className="about-cta">
            About Us
          </ArrowBtn>
        </div>
      )}
    </>
  );
}

function Distinction() {
  return (
    <>
      <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand">Why Proofit</p>
      <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.08] md:text-4xl">
        The PROOFIT
        <br />
        Distinction
      </h3>
      <div className="mt-7 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 xl:gap-x-10">
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

function SavingsStatement() {
  return (
    <div className="mt-12 border-t border-ink/10 pt-9">
      <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.12] xl:text-[2.65rem]">
        Delivering Up to 30% Greater Cost Savings Than Conventional Vendors
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft/75 xl:text-base">
        A wide array of pre-emptive and problem-solving inspection services designed to protect your property,
        your investment, and your peace of mind.
      </p>
    </div>
  );
}

export default function HomeAboutSequence({ hideCta = false }: { hideCta?: boolean }) {
  const desktopStageRef = useRef<HTMLElement>(null);
  const desktopMediaRef = useRef<HTMLDivElement>(null);
  const desktopIntroRef = useRef<HTMLDivElement>(null);
  const desktopDetailRef = useRef<HTMLDivElement>(null);
  const mobileIntroRef = useRef<HTMLDivElement>(null);
  const mobileMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopStage = desktopStageRef.current;
    const desktopMedia = desktopMediaRef.current;
    const desktopIntro = desktopIntroRef.current;
    const desktopDetail = desktopDetailRef.current;
    const mobileIntro = mobileIntroRef.current;
    const mobileMedia = mobileMediaRef.current;
    if (!desktopStage || !desktopMedia || !desktopIntro || !desktopDetail || !mobileIntro || !mobileMedia) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let desktopCurrent = 0;
    let mobileCurrent = 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (value: number) => value * value * (3 - 2 * value);

    const render = () => {
      raf = 0;

      const desktopBounds = desktopStage.getBoundingClientRect();
      const desktopTravel = Math.max(1, desktopStage.offsetHeight - window.innerHeight);
      const desktopTarget = clamp(-desktopBounds.top / desktopTravel);
      desktopCurrent = reducedMotion ? desktopTarget : desktopCurrent + (desktopTarget - desktopCurrent) * 0.16;
      const reveal = smoothstep(clamp((desktopCurrent - 0.28) / 0.44));
      const introFade = smoothstep(clamp((desktopCurrent - 0.2) / 0.32));

      desktopMedia.style.transform = `translate3d(0, ${desktopCurrent * 34}px, 0) scale(${1 + desktopCurrent * 0.045})`;
      desktopIntro.style.opacity = `${1 - introFade}`;
      desktopIntro.style.transform = `translate3d(0, ${-24 * introFade}px, 0)`;
      desktopIntro.style.pointerEvents = introFade > 0.75 ? "none" : "auto";
      desktopDetail.style.opacity = `${reveal}`;
      desktopDetail.style.transform = `translate3d(0, ${(1 - reveal) * 34}px, 0)`;

      const mobileBounds = mobileIntro.getBoundingClientRect();
      const mobileTravel = Math.max(1, mobileIntro.offsetHeight - window.innerHeight * 0.7);
      const mobileTarget = clamp(-mobileBounds.top / mobileTravel);
      mobileCurrent = reducedMotion ? mobileTarget : mobileCurrent + (mobileTarget - mobileCurrent) * 0.14;
      mobileMedia.style.transform = `translate3d(0, ${mobileCurrent * 22}px, 0) scale(${1 + mobileCurrent * 0.035})`;

      if (
        Math.abs(desktopTarget - desktopCurrent) > 0.001 ||
        Math.abs(mobileTarget - mobileCurrent) > 0.001
      ) {
        raf = requestAnimationFrame(render);
      }
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
    <>
      <section ref={desktopStageRef} className="about-texture relative z-10 hidden h-[190svh] bg-[#fbfaf7] lg:block">
        <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-hidden">
          <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] gap-16 px-8 xl:gap-24">
            <div className="relative min-h-0">
              <h2 className="absolute left-0 top-[8.5vh] z-[2] font-display text-5xl font-semibold xl:text-[3.4rem]">
                About Us
              </h2>
              <div
                ref={desktopMediaRef}
                className="absolute left-0 top-[19vh] h-[58vh] max-h-[620px] min-h-[430px] w-[94%] origin-center will-change-transform"
              >
                <AboutVideo className="h-full w-full" />
              </div>
            </div>

            <div className="relative h-full min-h-0">
              <div
                ref={desktopIntroRef}
                className="absolute inset-x-0 top-[9vh] will-change-[opacity,transform]"
              >
                <AboutCopy hideCta={hideCta} />
              </div>
              <div
                ref={desktopDetailRef}
                className="absolute inset-x-0 top-[8vh] opacity-0 will-change-[opacity,transform]"
              >
                <Distinction />
                <SavingsStatement />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-texture relative z-10 bg-[#fbfaf7] lg:hidden">
        <div ref={mobileIntroRef} className="min-h-[calc(100svh-4rem)] px-5 pb-12 pt-10 sm:px-8">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">About Us</h2>
          <div ref={mobileMediaRef} className="mt-6 aspect-[4/3] origin-center will-change-transform sm:mt-8">
            <AboutVideo className="h-full w-full" />
          </div>
          <div className="relative z-[2] mt-7 rounded-2xl bg-[#fbfaf7]/92 pt-1 backdrop-blur-[2px]">
            <AboutCopy hideCta={hideCta} />
          </div>
        </div>

        <div className="flex min-h-[calc(100svh-4rem)] items-center px-5 py-16 sm:px-8">
          <Reveal from="up" className="w-full">
            <Distinction />
            <SavingsStatement />
          </Reveal>
        </div>
      </section>
    </>
  );
}
