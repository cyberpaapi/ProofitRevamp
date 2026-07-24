"use client";

import { useRef, useState } from "react";

type Point = { x: number; y: number };

const bubbles = [
  { text: "After the first heavy monsoon", x: 18, y: 17, rotate: 7, tone: "outline", width: "w-[72%]" },
  { text: "Before possession day", x: 11, y: 39, rotate: 4, tone: "dark", width: "w-[50%]" },
  { text: "When your EMIs begin", x: 51, y: 46, rotate: -2, tone: "orange", width: "w-[47%]" },
  { text: "Before finalising renovation work", x: 7, y: 57, rotate: 7, tone: "outline", width: "w-[76%]" },
  { text: "When you notice slight dampness", x: 6, y: 77, rotate: 5, tone: "outline", width: "w-[47%]" },
  { text: "Before buying a resale home", x: 56, y: 76, rotate: -6, tone: "dark", width: "w-[40%]" },
] as const;

const toneClasses = {
  outline: "border border-brand bg-white text-ink",
  dark: "border border-ink bg-ink text-white",
  orange: "border border-brand bg-brand text-ink",
};

function BubblePanel({ title }: { title: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ index: number; offsetX: number; offsetY: number } | null>(null);
  const [positions, setPositions] = useState<Array<Point | null>>(() => bubbles.map(() => null));
  const [active, setActive] = useState<number | null>(null);

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
    const bubble = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      index,
      offsetX: event.clientX - bubble.left,
      offsetY: event.clientY - bubble.top,
    };
    setActive(index);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !panel || drag.index !== Number(event.currentTarget.dataset.index)) return;

    const bounds = panel.getBoundingClientRect();
    const x = Math.min(
      Math.max(0, event.clientX - bounds.left - drag.offsetX),
      Math.max(0, bounds.width - event.currentTarget.offsetWidth),
    );
    const y = Math.min(
      Math.max(0, event.clientY - bounds.top - drag.offsetY),
      Math.max(0, bounds.height - event.currentTarget.offsetHeight),
    );

    setPositions((current) => current.map((position, index) => index === drag.index ? { x, y } : position));
  };

  const stopDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setActive(null);
  };

  return (
    <article className="overflow-hidden rounded-[28px] border border-ink/45 bg-cream">
      <h3 className="bg-ink px-5 py-5 text-center font-display text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h3>
      <div ref={panelRef} className="relative h-[430px] overflow-hidden sm:h-[500px]">
        {bubbles.map((bubble, index) => {
          const position = positions[index];
          return (
            <button
              key={bubble.text}
              type="button"
              data-index={index}
              onPointerDown={(event) => startDrag(event, index)}
              onPointerMove={moveDrag}
              onPointerUp={stopDrag}
              onPointerCancel={stopDrag}
              className={`bubble-float absolute touch-none select-none rounded-full px-4 py-4 text-center font-display text-sm font-semibold leading-tight shadow-sm transition-shadow active:cursor-grabbing sm:px-5 sm:text-lg ${bubble.width} ${toneClasses[bubble.tone]} ${
                active === index ? "z-20 cursor-grabbing shadow-xl" : "z-10 cursor-grab"
              }`}
              style={{
                left: position ? `${position.x}px` : `${bubble.x}%`,
                top: position ? `${position.y}px` : `${bubble.y}%`,
                rotate: `${bubble.rotate}deg`,
                animationDelay: `${index * -0.45}s`,
                animationDuration: `${3.4 + index * 0.22}s`,
              }}
              aria-label={`${bubble.text}. Drag to move.`}
            >
              {bubble.text}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default function InspectionBubbles() {
  return (
    <section className="bg-[#f5f5f5] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="text-center font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
          You Bought the Home.
          <br />
          Now Verify It
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <BubblePanel title="When should you get a inspection" />
          <BubblePanel title="Why it’s not optional" />
        </div>
        <p className="mt-5 text-center text-xs font-medium text-ink-soft/55">
          Drag any label to explore and rearrange the inspection moments.
        </p>
      </div>
    </section>
  );
}
