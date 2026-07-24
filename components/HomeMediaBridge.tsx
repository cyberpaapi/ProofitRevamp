"use client";

import { useEffect, useRef } from "react";

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function HomeMediaBridge() {
  const bridgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bridge = bridgeRef.current;
    const source = document.getElementById("about-service-media-source");
    const target = document.getElementById("service-one-media-target");
    if (!bridge || !source || !target) return;

    let raf = 0;
    let startBox: Box | null = null;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const hideBridge = () => {
      bridge.style.display = "none";
    };

    const render = () => {
      raf = 0;

      if (window.innerWidth < 1024 || target.dataset.activeServiceIndex !== "0") {
        source.style.opacity = "";
        startBox = null;
        hideBridge();
        return;
      }

      const targetBox = target.getBoundingClientRect();
      const transitionStart = window.innerHeight * 0.94;
      const transitionEnd = Math.max(72, window.innerHeight * 0.12);
      const progress = clamp((transitionStart - targetBox.top) / (transitionStart - transitionEnd));

      if (progress <= 0) {
        source.style.opacity = "";
        startBox = null;
        hideBridge();
        return;
      }

      if (!startBox) {
        const sourceBox = source.getBoundingClientRect();
        startBox = {
          left: sourceBox.left,
          top: sourceBox.top,
          width: sourceBox.width,
          height: sourceBox.height,
        };
      }

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      source.style.opacity = "0";
      bridge.style.display = "block";
      bridge.style.left = `${lerp(startBox.left, targetBox.left, eased)}px`;
      bridge.style.top = `${lerp(startBox.top, targetBox.top, eased)}px`;
      bridge.style.width = `${lerp(startBox.width, targetBox.width, eased)}px`;
      bridge.style.height = `${lerp(startBox.height, targetBox.height, eased)}px`;
      bridge.style.borderRadius = `${lerp(16, 0, eased)}px`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new MutationObserver(schedule);
    observer.observe(target, { attributes: true, attributeFilter: ["data-active-service-index"] });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      source.style.opacity = "";
    };
  }, []);

  return (
    <div
      ref={bridgeRef}
      className="pointer-events-none fixed z-20 hidden overflow-hidden bg-black"
      aria-hidden
    >
      <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
        <source src="/videos/S1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
