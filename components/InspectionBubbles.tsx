"use client";

import { useEffect, useRef } from "react";

type Tone = "outline" | "dark" | "orange";

type Bubble = {
  text: string;
  x: number;
  y: number;
  rotate: number;
  tone: Tone;
  width: number;
};

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  restAngle: number;
  width: number;
  height: number;
  dragging: boolean;
  releaseAt: number;
  targetY: number;
};

const whenBubbles: Bubble[] = [
  { text: "Before possession day", x: 4, y: 4, rotate: -4, tone: "dark", width: 43 },
  { text: "Before buying a resale home", x: 49, y: 8, rotate: 4, tone: "outline", width: 48 },
  { text: "Before finalising renovation work", x: 3, y: 29, rotate: 3, tone: "orange", width: 52 },
  { text: "After the first heavy monsoon", x: 56, y: 31, rotate: -5, tone: "dark", width: 41 },
  { text: "When you notice slight dampness", x: 3, y: 54, rotate: -3, tone: "outline", width: 48 },
  { text: "Before renting out your home", x: 52, y: 56, rotate: 5, tone: "orange", width: 45 },
  { text: "Before moving into a rented home", x: 3, y: 80, rotate: 4, tone: "dark", width: 56 },
  { text: "When your EMIs begin", x: 61, y: 82, rotate: -4, tone: "outline", width: 36 },
];

const whyBubbles: Bubble[] = [
  { text: "Because fresh paint hides more than it shows.", x: 3, y: 4, rotate: 4, tone: "orange", width: 52 },
  { text: "Because you are inheriting years of invisible wear.", x: 56, y: 7, rotate: -4, tone: "dark", width: 41 },
  { text: "Because new tiles can sit on old problems.", x: 3, y: 29, rotate: -3, tone: "outline", width: 44 },
  { text: "Because water finds what walkthroughs miss.", x: 49, y: 32, rotate: 4, tone: "orange", width: 48 },
  { text: "Because small patches become large repairs.", x: 3, y: 54, rotate: 5, tone: "dark", width: 43 },
  { text: "Because undocumented defects become your liability.", x: 49, y: 57, rotate: -4, tone: "outline", width: 48 },
  { text: "Because you should not pay for someone else’s damage.", x: 3, y: 79, rotate: -4, tone: "orange", width: 52 },
  { text: "Because a 20 year commitment deserves a technical check.", x: 56, y: 82, rotate: 4, tone: "dark", width: 41 },
];

const toneClasses: Record<Tone, string> = {
  outline: "border border-brand bg-white text-ink",
  dark: "border border-ink bg-ink text-white",
  orange: "border border-brand bg-brand text-ink",
};

function BubblePanel({ title, bubbles }: { title: string; bubbles: Bubble[] }) {
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let active = false;
    let hasEntered = false;
    let previousTime = performance.now();

    const clampAngle = (angle: number) => Math.min(9, Math.max(-9, angle));
    const render = () => {
      bodiesRef.current.forEach((body, index) => {
        const element = bubbleRefs.current[index];
        if (!element) return;
        element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.angle}deg)`;
      });
    };

    const initialize = (settled: boolean) => {
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      const now = performance.now();
      bodiesRef.current = bubbles.map((bubble, index) => {
        const element = bubbleRefs.current[index];
        const bodyWidth = element?.offsetWidth ?? 160;
        const bodyHeight = element?.offsetHeight ?? 44;
        const radians = (bubble.rotate * Math.PI) / 180;
        const rotatedHeight = bodyWidth * Math.abs(Math.sin(radians)) + bodyHeight * Math.abs(Math.cos(radians));
        const maxTargetY = Math.max(0, height - bodyHeight - Math.max(0, (rotatedHeight - bodyHeight) / 2));
        const targetY = Math.min((bubble.y / 100) * height, maxTargetY);
        return {
          x: Math.min((bubble.x / 100) * width, Math.max(0, width - bodyWidth)),
          y: settled ? targetY : -bodyHeight - 16 - index * 10,
          vx: 0,
          vy: 0,
          angle: settled ? bubble.rotate : bubble.rotate * -1.5,
          angularVelocity: 0,
          restAngle: bubble.rotate,
          width: bodyWidth,
          height: bodyHeight,
          dragging: false,
          releaseAt: now + index * 85,
          targetY,
        };
      });
      render();
    };

    const rotatedSize = (body: Body) => {
      const radians = (body.angle * Math.PI) / 180;
      const cosine = Math.abs(Math.cos(radians));
      const sine = Math.abs(Math.sin(radians));
      return {
        width: body.width * cosine + body.height * sine,
        height: body.width * sine + body.height * cosine,
      };
    };

    const constrainBody = (body: Body, width: number, height: number) => {
      const bounds = rotatedSize(body);
      const centerX = body.x + body.width / 2;
      const left = centerX - bounds.width / 2;
      const right = centerX + bounds.width / 2;

      if (left < 0) {
        body.x -= left;
        body.vx = Math.abs(body.vx) * 0.06;
      } else if (right > width) {
        body.x -= right - width;
        body.vx = -Math.abs(body.vx) * 0.06;
      }

      body.targetY = Math.min(
        body.targetY,
        Math.max(0, height - body.height - Math.max(0, (bounds.height - body.height) / 2)),
      );
    };

    const tick = (time: number) => {
      if (!active) return;
      const frameTime = Math.min(0.03, Math.max(0.001, (time - previousTime) / 1000));
      previousTime = time;
      const width = panel.clientWidth;
      const height = panel.clientHeight;
      const bodies = bodiesRef.current;
      const substeps = 2;
      const dt = frameTime / substeps;

      for (let step = 0; step < substeps; step += 1) {
        for (const body of bodies) {
          if (body.dragging || time < body.releaseAt) continue;
          body.vy += 1450 * dt;
          body.vx *= 0.992;
          body.x += body.vx * dt;
          body.y += body.vy * dt;
          if (body.y >= body.targetY) {
            body.y = body.targetY;
            body.vy = body.vy > 70 ? -body.vy * 0.2 : 0;
          }
          constrainBody(body, width, height);
        }

        for (const body of bodies) {
          if (body.dragging || time < body.releaseAt) continue;
          body.angularVelocity += (body.restAngle - body.angle) * 14 * dt;
          body.angularVelocity *= 1 - Math.min(0.1, 5 * dt);
          body.angle = clampAngle(body.angle + body.angularVelocity * dt);
        }
      }

      render();
      raf = requestAnimationFrame(tick);
    };

    initialize(reducedMotion);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          active = true;
          if (!hasEntered) {
            hasEntered = true;
            initialize(reducedMotion);
          }
          if (!reducedMotion) {
            previousTime = performance.now();
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(tick);
          }
        } else {
          active = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    intersectionObserver.observe(panel);

    const resizeObserver = new ResizeObserver(() => {
      if (!hasEntered || reducedMotion) {
        initialize(reducedMotion);
        return;
      }
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
        const rotatedBounds = rotatedSize(body);
        body.targetY = Math.min(
          body.targetY,
          Math.max(0, height - body.height - Math.max(0, (rotatedBounds.height - body.height) / 2)),
        );
      });
      render();
    });
    resizeObserver.observe(panel);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [bubbles]);

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
    const panel = panelRef.current;
    const body = bodiesRef.current[index];
    if (!panel || !body) return;
    const panelBounds = panel.getBoundingClientRect();
    body.dragging = true;
    body.vx = 0;
    body.vy = 0;
    body.angularVelocity = 0;
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
    const nextX = Math.min(Math.max(0, event.clientX - bounds.left - drag.offsetX), Math.max(0, bounds.width - body.width));
    const nextY = Math.min(Math.max(0, event.clientY - bounds.top - drag.offsetY), Math.max(0, bounds.height - body.height));
    const now = performance.now();
    const elapsed = Math.max(16, now - drag.lastTime) / 1000;
    body.vx = (nextX - drag.lastX) / elapsed;
    body.vy = (nextY - drag.lastY) / elapsed;
    body.angularVelocity = Math.min(35, Math.max(-35, body.vx * 0.03));
    body.angle = Math.min(9, Math.max(-9, body.angle + body.angularVelocity * elapsed));
    body.x = nextX;
    body.y = nextY;
    drag.lastX = nextX;
    drag.lastY = nextY;
    drag.lastTime = now;
    event.currentTarget.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.angle}deg)`;
  };

  const stopDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (drag) {
      const body = bodiesRef.current[drag.index];
      if (body) {
        body.dragging = false;
        body.vx *= 0.3;
        body.vy *= 0.3;
        body.angularVelocity *= 0.45;
        body.targetY = body.y;
        body.restAngle = body.angle;
      }
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.zIndex = "";
    dragRef.current = null;
  };

  return (
    <article className="overflow-hidden rounded-[20px] border border-ink/40 bg-cream">
      <h3 className="bg-ink px-4 py-3 text-center font-display text-base font-semibold text-white sm:text-lg">
        {title}
      </h3>
      <div ref={panelRef} className="relative h-[250px] overflow-hidden sm:h-[270px]">
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
            className={`absolute left-0 top-0 z-10 flex min-h-11 cursor-grab touch-none select-none items-center justify-center rounded-full px-3 py-2 text-center font-display text-[10px] font-semibold leading-[1.15] shadow-sm will-change-transform active:cursor-grabbing sm:text-xs ${toneClasses[bubble.tone]}`}
            style={{ width: `${bubble.width}%` }}
            aria-label={`${bubble.text} Drag to move.`}
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
    <section className="bg-[#f5f5f5] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
          You Bought the Home.
          <br />
          Now Verify It
        </h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <BubblePanel title="When should you get an inspection" bubbles={whenBubbles} />
          <BubblePanel title="Why it’s not optional" bubbles={whyBubbles} />
        </div>
      </div>
    </section>
  );
}
