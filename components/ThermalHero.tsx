"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed static hero image with a translucent square "thermal lens" that
 * bounces around the image (DVD-logo style). Wherever the lens travels it
 * reveals the thermal-imaging version of the same photograph underneath.
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
    let x = 60;
    let y = 80;
    // gentle drift, ~55px/s
    let vx = 0.9;
    let vy = 0.72;
    let size = 180;

    const measure = () => {
      const w = frame.clientWidth;
      size = Math.max(144, Math.min(264, w * 0.192));
      lens.style.width = `${size}px`;
      lens.style.height = `${size}px`;
      // the thermal layer inside the lens must be exactly frame-sized so the
      // two photographs stay pixel-aligned
      thermal.style.width = `${frame.clientWidth}px`;
      thermal.style.height = `${frame.clientHeight}px`;
      x = Math.min(x, frame.clientWidth - size);
      y = Math.min(y, frame.clientHeight - size);
    };
    measure();

    const tick = () => {
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      x += vx;
      y += vy;
      if (x <= 0) { x = 0; vx = Math.abs(vx); }
      if (y <= 0) { y = 0; vy = Math.abs(vy); }
      if (x >= w - size) { x = w - size; vx = -Math.abs(vx); }
      if (y >= h - size) { y = h - size; vy = -Math.abs(vy); }
      lens.style.transform = `translate(${x}px, ${y}px)`;
      thermal.style.transform = `translate(${-x}px, ${-y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={frameRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink">
      {/* base photograph */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-house.webp)" }}
        role="img"
        aria-label="Bright modern home interior; a roaming thermal scanner reveals the infrared view of whatever it passes over"
      />
      {/* bouncing thermal lens */}
      <div ref={lensRef} className="thermal-lens left-0 top-0" aria-hidden>
        <div
          ref={thermalRef}
          className="lens-img bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-house-thermal.webp)" }}
        />
        <span className="tick tick-tl" />
        <span className="tick tick-tr" />
        <span className="tick tick-bl" />
        <span className="tick tick-br" />
      </div>
      {/* scrims for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/15 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />
      {children}
    </section>
  );
}
