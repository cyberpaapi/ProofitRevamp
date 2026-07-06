"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** slide direction: up (default) | left | right | scale */
  from?: "up" | "left" | "right" | "scale";
  delay?: number;
  as?: "div" | "section" | "li" | "span";
};

/** Reveals children with a transform/opacity transition when scrolled into view. */
export default function Reveal({ children, className = "", from = "up", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass = from === "up" ? "" : from === "scale" ? "reveal-scale" : `reveal-${from}`;
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${dirClass} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
