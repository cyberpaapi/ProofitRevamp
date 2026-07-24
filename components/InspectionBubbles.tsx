"use client";

import { useEffect, useRef } from "react";

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  dragging: boolean;
};

const bubbles = [
  { text: "After the first heavy monsoon", x: 12, y: 3, rotate: 7, tone: "outline", width: "w-[72%]" },
  { text: "Before possession day", x: 6, y: 21, rotate: 4, tone: "dark", width: "w-[50%]" },
  { text: "When your EMIs begin", x: 50, y: 26, rotate: -2, tone: "orange", width: "w-[47%]" },
  { text: "Before finalising renovation work", x: 5, y: 42, rotate: 7, tone: "outline", width: "w-[76%]" },
  { text: "When you notice slight dampness", x: 5, y: 61, rotate: 5, tone: "outline", width: "w-[47%]" },
  { text: "Before buying a resale home", x: 55, y: 59, rotate: -6, tone: "dark", width: "w-[40%]" },
] as const;

const toneClasses = {
  outline: "border border-brand bg-white text-ink",
  dark: "border border-ink bg-ink text-white",
  orange: "border border-brand bg-brand text-ink",
};

function BubblePanel({ title }: { title: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const bodiesRef = useRef<Body[]>([]);
  const dragRef = useRef<{
    index: number;
    offsetX: number;
    offsetY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
  } | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    let raf = 0;
    let previousTime = performance.now();

    const initialize = () => {
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      bodiesRef.current = bubbles.map((bubble, index) => {
        const element = bubbleRefs.current[index];
        const bodyWidth = element?.offsetWidth ?? 160;
        const bodyHeight = element?.offsetHeight ?? 64;
        return {
          x: Math.min((bubble.x / 100) * width, Math.max(0, width - bodyWidth)),
          y: Math.min((bubble.y / 100) * height, Math.max(0, height - bodyHeight)),
          vx: 0,
          vy: 0,
          width: bodyWidth,
          height: bodyHeight,
          dragging: false,
        };
      });
    };

    const resolveCollision = (first: Body, second: Body) => {
      const firstCenterX = first.x + first.width / 2;
      const firstCenterY = first.y + first.height / 2;
      const secondCenterX = second.x + second.width / 2;
      const secondCenterY = second.y + second.height / 2;
      const overlapX = (first.width + second.width) / 2 - Math.abs(firstCenterX - secondCenterX);
      const overlapY = (first.height + second.height) / 2 - Math.abs(firstCenterY - secondCenterY);
      if (overlapX <= 0 || overlapY <= 0 || (first.dragging && second.dragging)) return;

      const firstWeight = first.dragging ? 0 : second.dragging ? 1 : 0.5;
      const secondWeight = second.dragging ? 0 : first.dragging ? 1 : 0.5;

      if (overlapY <= overlapX) {
        const direction = firstCenterY < secondCenterY ? -1 : 1;
        first.y += direction * overlapY * firstWeight;
        second.y -= direction * overlapY * secondWeight;
        if (!first.dragging && !second.dragging) {
          const sharedVelocity = Math.min(first.vy, second.vy) * 0.12;
          first.vy = sharedVelocity;
          second.vy = sharedVelocity;
        } else if (!first.dragging) {
          first.vy = 0;
        } else if (!second.dragging) {
          second.vy = 0;
        }
      } else {
        const direction = firstCenterX < secondCenterX ? -1 : 1;
        first.x += direction * overlapX * firstWeight;
        second.x -= direction * overlapX * secondWeight;
        if (!first.dragging) first.vx *= -0.08;
        if (!second.dragging) second.vx *= -0.08;
      }
    };

    const constrainBody = (body: Body, width: number, height: number) => {
      if (body.x < 0) {
        body.x = 0;
        body.vx = Math.abs(body.vx) * 0.08;
      } else if (body.x + body.width > width) {
        body.x = Math.max(0, width - body.width);
        body.vx = -Math.abs(body.vx) * 0.08;
      }

      if (body.y < 0) {
        body.y = 0;
        body.vy = Math.abs(body.vy) * 0.05;
      } else if (body.y + body.height > height) {
        body.y = Math.max(0, height - body.height);
        body.vy = Math.abs(body.vy) > 45 ? -Math.abs(body.vy) * 0.04 : 0;
        body.vx *= 0.8;
      }
    };

    const tick = (time: number) => {
      const frameTime = Math.min(0.032, Math.max(0.001, (time - previousTime) / 1000));
      previousTime = time;
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      const bodies = bodiesRef.current;
      const substeps = 3;
      const dt = frameTime / substeps;

      for (let step = 0; step < substeps; step += 1) {
        for (const body of bodies) {
          if (body.dragging) continue;
          body.vy += 1900 * dt;
          body.vx *= 0.995;
          body.x += body.vx * dt;
          body.y += body.vy * dt;

          constrainBody(body, width, height);
        }

        for (let iteration = 0; iteration < 12; iteration += 1) {
          for (let first = 0; first < bodies.length; first += 1) {
            for (let second = first + 1; second < bodies.length; second += 1) {
              resolveCollision(bodies[first], bodies[second]);
            }
          }
          bodies.forEach((body) => constrainBody(body, width, height));
        }
      }

      bodies.forEach((body, index) => {
        const element = bubbleRefs.current[index];
        if (!element) return;
        element.style.left = `${body.x}px`;
        element.style.top = `${body.y}px`;
      });
      raf = requestAnimationFrame(tick);
    };

    initialize();
    raf = requestAnimationFrame(tick);
    const resizeObserver = new ResizeObserver(() => {
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      bodiesRef.current.forEach((body, index) => {
        const element = bubbleRefs.current[index];
        if (element) {
          body.width = element.offsetWidth;
          body.height = element.offsetHeight;
        }
        body.x = Math.min(Math.max(0, body.x), Math.max(0, width - body.width));
        body.y = Math.min(Math.max(0, body.y), Math.max(0, height - body.height));
      });
    });
    resizeObserver.observe(panel);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
    const panel = panelRef.current;
    const body = bodiesRef.current[index];
    if (!panel || !body) return;
    const panelBounds = panel.getBoundingClientRect();
    body.dragging = true;
    body.vx = 0;
    body.vy = 0;
    dragRef.current = {
      index,
      offsetX: event.clientX - panelBounds.left - body.x,
      offsetY: event.clientY - panelBounds.top - body.y,
      lastX: body.x,
      lastY: body.y,
      lastTime: performance.now(),
    };
    event.currentTarget.style.zIndex = "30";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const panel = panelRef.current;
    const drag = dragRef.current;
    if (!panel || !drag || drag.index !== Number(event.currentTarget.dataset.index)) return;
    const body = bodiesRef.current[drag.index];
    const bounds = panel.getBoundingClientRect();
    const nextX = Math.min(
      Math.max(0, event.clientX - bounds.left - drag.offsetX),
      Math.max(0, bounds.width - body.width),
    );
    const nextY = Math.min(
      Math.max(0, event.clientY - bounds.top - drag.offsetY),
      Math.max(0, bounds.height - body.height),
    );
    const now = performance.now();
    const elapsed = Math.max(16, now - drag.lastTime) / 1000;
    body.vx = (nextX - drag.lastX) / elapsed;
    body.vy = (nextY - drag.lastY) / elapsed;
    body.x = nextX;
    body.y = nextY;
    drag.lastX = nextX;
    drag.lastY = nextY;
    drag.lastTime = now;
  };

  const stopDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (drag) {
      const body = bodiesRef.current[drag.index];
      if (body) {
        body.dragging = false;
        body.vx *= 0.35;
        body.vy *= 0.35;
      }
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.zIndex = "";
    dragRef.current = null;
  };

  return (
    <article className="overflow-hidden rounded-[28px] border border-ink/45 bg-cream">
      <h3 className="bg-ink px-5 py-5 text-center font-display text-xl font-semibold text-white sm:text-2xl">
        {title}
      </h3>
      <div ref={panelRef} className="relative h-[430px] overflow-hidden sm:h-[500px]">
        {bubbles.map((bubble, index) => (
          <button
            key={bubble.text}
            ref={(element) => {
              bubbleRefs.current[index] = element;
            }}
            type="button"
            data-index={index}
            onPointerDown={(event) => startDrag(event, index)}
            onPointerMove={moveDrag}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            className={`absolute z-10 touch-none select-none rounded-full px-4 py-4 text-center font-display text-sm font-semibold leading-tight shadow-sm active:cursor-grabbing sm:px-5 sm:text-lg ${bubble.width} ${toneClasses[bubble.tone]} cursor-grab`}
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
            aria-label={`${bubble.text}. Drag to move.`}
          >
            {bubble.text}
          </button>
        ))}
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
          Drag any label, then release it to let gravity take over.
        </p>
      </div>
    </section>
  );
}
