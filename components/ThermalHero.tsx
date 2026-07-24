"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed static hero image with a roaming thermal lens. The lens eases
 * between inspection points, pauses, then continues around the room.
 */
export default function ThermalHero({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const thermalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const lens = lensRef.current;
    const thermal = thermalRef.current;
    if (!frame || !lens || !thermal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let size = 180;
    let routeIndex = 0;
    let legStartedAt = performance.now();
    let pausedAt = 0;
    let startX = 0;
    let startY = 0;
    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorMode = false;
    const travelTime = 2600;
    const pauseTime = 720;
    const route = [
      [0.08, 0.12],
      [0.7, 0.18],
      [0.58, 0.68],
      [0.16, 0.61],
      [0.38, 0.34],
    ];

    const pointAt = (index: number) => {
      const [px, py] = route[index];
      return {
        x: px * Math.max(0, frame.clientWidth - size),
        y: py * Math.max(0, frame.clientHeight - size),
      };
    };

    const placeLens = () => {
      lens.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      thermal.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
    };

    const measure = () => {
      const w = frame.clientWidth;
      size = Math.max(144, Math.min(264, w * 0.192));
      lens.style.width = `${size}px`;
      lens.style.height = `${size}px`;
      // the thermal layer inside the lens must be exactly frame-sized so the
      // two photographs stay pixel-aligned
      thermal.style.width = `${frame.clientWidth}px`;
      thermal.style.height = `${frame.clientHeight}px`;
      const current = pointAt(routeIndex);
      x = current.x;
      y = current.y;
      startX = x;
      startY = y;
      const next = pointAt((routeIndex + 1) % route.length);
      targetX = next.x;
      targetY = next.y;
      legStartedAt = performance.now();
      pausedAt = 0;
      placeLens();
    };
    measure();

    const tick = (now: number) => {
      if (cursorMode) {
        x += (cursorX - x) * 0.16;
        y += (cursorY - y) * 0.16;
        placeLens();
      } else if (pausedAt) {
        if (now - pausedAt >= pauseTime) {
          routeIndex = (routeIndex + 1) % route.length;
          startX = x;
          startY = y;
          const next = pointAt((routeIndex + 1) % route.length);
          targetX = next.x;
          targetY = next.y;
          legStartedAt = now;
          pausedAt = 0;
        }
      } else {
        const progress = Math.min((now - legStartedAt) / travelTime, 1);
        // Quadratic ease-in-out gives each scan a clear acceleration and stop.
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        x = startX + (targetX - startX) * eased;
        y = startY + (targetY - startY) * eased;
        placeLens();
        if (progress === 1) pausedAt = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onPointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 1024 || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const bounds = frame.getBoundingClientRect();
      cursorMode = true;
      cursorX = Math.min(
        Math.max(0, event.clientX - bounds.left - size / 2),
        Math.max(0, frame.clientWidth - size),
      );
      cursorY = Math.min(
        Math.max(0, event.clientY - bounds.top - size / 2),
        Math.max(0, frame.clientHeight - size),
      );
    };

    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    frame.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      frame.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <section ref={frameRef} className="sticky top-0 z-0 h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink">
      {/* base photograph */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-house-clean-v2.png)" }}
        role="img"
        aria-label="Bright modern home interior; a roaming thermal scanner reveals the infrared view of whatever it passes over"
      />
      {/* roaming thermal lens */}
      <div ref={lensRef} className="thermal-lens left-0 top-0 z-[2]" aria-hidden>
        <div
          ref={thermalRef}
          className="lens-img bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-house-thermal-v2.png)" }}
        />
      </div>
      {/* scrims for text legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink/55 via-transparent to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-ink/65 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/35 bg-black/25 px-4 py-2 font-display text-xs font-medium text-white backdrop-blur-md lg:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
        Move your cursor across the image to explore the thermal scan
      </div>
      {children}
    </section>
  );
}
