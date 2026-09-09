"use client";

import { useEffect, useRef, type PointerEvent } from "react";

type Capsule = { text: string; tone: "dark" | "outline" | "orange" };
type Controls = {
  grab: (index: number, x: number, y: number) => void;
  move: (x: number, y: number) => void;
  release: () => void;
  nudge: (index: number) => void;
};

export default function FallingCapsules({ title, bubbles }: { title: string; bubbles: Capsule[] }) {
  const panel = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const controls = useRef<Controls | null>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    let disposed = false;
    let teardown = () => {};

    // Keep readable, in-flow pills until the physics engine and fonts are ready.
    Promise.all([import("matter-js"), document.fonts.ready]).then(([module]) => {
      if (disposed) return;
      const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = module.default;
      const engine = Engine.create({ enableSleeping: true, positionIterations: 10, velocityIterations: 8 });
      engine.gravity.y = 1.25;
      let pills: ReturnType<typeof Bodies.rectangle>[] = [];
      let sizes: { w: number; h: number }[] = [];
      let tether: ReturnType<typeof Constraint.create> | null = null;
      let grabbed = -1;
      let raf = 0, last = 0, accumulator = 0;
      let visible = false, entered = false, roofAdded = false;
      let width = 0, height = 0;
      let floor: ReturnType<typeof Bodies.rectangle> | null = null;
      const motion = matchMedia("(prefers-reduced-motion: reduce)");
      const offsets = [0.24, 0.72, 0.44, 0.77, 0.20, 0.60, 0.34, 0.73];
      const angles = [-0.17, 0.22, -0.11, 0.09, 0.25, -0.20, 0.14, -0.15];

      function draw() {
        pills.forEach((body, index) => {
          const button = buttons.current[index];
          if (!button) return;
          button.style.transform = "translate3d(" + (body.position.x - sizes[index].w / 2) + "px," + (body.position.y - sizes[index].h / 2) + "px,0) rotate(" + body.angle + "rad)";
          button.style.zIndex = index === grabbed ? "2" : "1";
        });
      }

      function step() {
        // Rounded bodies collide freely; there are no assigned rows or columns.
        pills.forEach((body, index) => {
          // A gentle upright bias keeps a loose brick-like pile legible, without locking rotation.
          if (index !== grabbed && !body.isSleeping) body.torque -= Math.sin(body.angle) * body.inertia * 0.000004;
        });
        Engine.update(engine, 1000 / 120);
        if (!roofAdded && pills.every(body => body.bounds.min.y > 6)) {
          Composite.add(engine.world, Bodies.rectangle(width / 2, -24, width + 100, 48, { isStatic: true }));
          roofAdded = true;
        }
      }

      function release() {
        if (tether) Composite.remove(engine.world, tether);
        tether = null;
        grabbed = -1;
        draw();
      }

      function layout(animate: boolean) {
        release();
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        width = el!.clientWidth;
        el!.dataset.physicsReady = "true";
        buttons.current.forEach((button, index) => {
          if (!button) return;
          const ratio = [0.43, 0.49, 0.53, 0.41, 0.48, 0.45, 0.54, 0.42][index % 8];
          const maxWidth = width - 28;
          let pillWidth = Math.min(maxWidth, Math.max(Math.min(150, width * 0.48), width * ratio));
          button.style.width = pillWidth + "px";
          // Long answers need wider capsules, not taller near-circles. Measure
          // the wrapped text before building its matching collision body.
          while (pillWidth < maxWidth && button.offsetWidth < button.offsetHeight * 2.25) {
            pillWidth = Math.min(maxWidth, pillWidth + 12);
            button.style.width = pillWidth + "px";
          }
        });
        sizes = buttons.current.map(button => ({ w: button!.offsetWidth, h: button!.offsetHeight }));
        const area = sizes.reduce((sum, size) => sum + size.w * size.h, 0);
        height = Math.ceil(Math.max(380, area / (width * 0.63) + 85));
        el!.style.height = height + "px";
        // The paired panel may stretch this one taller; physics must use the real floor.
        height = el!.clientHeight;
        roofAdded = false;
        const wall = { isStatic: true, friction: 0.65, restitution: 0.1 };
        floor = Bodies.rectangle(width / 2, height + 22, width + 100, 60, wall);
        Composite.add(engine.world, [
          floor,
          Bodies.rectangle(-24, height / 2 - 1200, 60, height + 3000, wall),
          Bodies.rectangle(width + 24, height / 2 - 1200, 60, height + 3000, wall),
        ]);
        const spacing = Math.max(...sizes.map(s => s.h)) + 50;
        pills = sizes.map(({ w, h }, index) => {
          const x = Math.max(w / 2 + 12, Math.min(width - w / 2 - 12, offsets[index % 8] * width));
          const body = Bodies.rectangle(x, -h - index * spacing, w + 4, h + 4, {
            chamfer: { radius: (h + 4) / 2, quality: 16 },
            angle: angles[index % 8], friction: 0.65, frictionStatic: 0.9,
            frictionAir: 0.025, restitution: 0.16, density: 0.002, sleepThreshold: 100,
          });
          Body.setVelocity(body, { x: index % 2 ? -0.4 : 0.4, y: 0 });
          return body;
        });
        Composite.add(engine.world, pills);
        if (!animate) {
          for (let i = 0; i < 900; i++) step();
          pills.forEach(body => Sleeping.set(body, true));
        }
        accumulator = 0;
        draw();
      }

      function frame(now: number) {
        raf = 0;
        if (!visible || document.hidden || disposed) return;
        accumulator += Math.min(40, now - last || 16.67);
        last = now;
        while (accumulator >= 1000 / 120) { step(); accumulator -= 1000 / 120; }
        draw();
        if (grabbed !== -1 || pills.some(body => !body.isSleeping)) raf = requestAnimationFrame(frame);
      }
      function wake() {
        if (visible && !raf && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
      }
      function point(x: number, y: number) {
        const bounds = el!.getBoundingClientRect();
        return { x: Math.max(20, Math.min(width - 20, x - bounds.left)), y: Math.max(25, Math.min(height - 25, y - bounds.top)) };
      }
      controls.current = {
        grab(index, x, y) {
          release();
          grabbed = index;
          const body = pills[index], p = point(x, y);
          pills.forEach(item => Sleeping.set(item, false));
          tether = Constraint.create({ bodyB: body, pointA: p,
            pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
            length: 0, stiffness: 0.16, damping: 0.12,
          });
          Composite.add(engine.world, tether);
          wake();
        },
        move(x, y) { if (tether) { tether.pointA = point(x, y); wake(); } },
        release,
        nudge(index) {
          pills.forEach(item => Sleeping.set(item, false));
          Body.setVelocity(pills[index], { x: index % 2 ? -2 : 2, y: -5 });
          Body.setAngularVelocity(pills[index], index % 2 ? -0.025 : 0.025);
          wake();
        },
      };

      layout(false);
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!entered) { entered = true; if (!motion.matches) layout(true); }
          wake();
        } else { release(); cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: 0.12 });
      io.observe(el);
      let resizeTimer: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        const textSizeChanged = buttons.current.some((button, index) => button && sizes[index] &&
          (button.offsetHeight !== sizes[index].h || button.offsetWidth !== sizes[index].w));
        if (Math.abs(el.clientWidth - width) < 1 && !textSizeChanged) {
          if (floor && Math.abs(el.clientHeight - height) > 1) {
            height = el.clientHeight;
            Body.setPosition(floor, { x: width / 2, y: height + 22 });
            pills.forEach(body => Sleeping.set(body, false));
            wake();
          }
          return;
        }
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { layout(false); wake(); }, 100);
      });
      ro.observe(el);
      buttons.current.forEach(button => { if (button) ro.observe(button); });
      const visibility = () => { if (document.hidden) { release(); cancelAnimationFrame(raf); raf = 0; } else wake(); };
      document.addEventListener("visibilitychange", visibility);
      teardown = () => {
        cancelAnimationFrame(raf); clearTimeout(resizeTimer); io.disconnect(); ro.disconnect();
        document.removeEventListener("visibilitychange", visibility);
        Composite.clear(engine.world, false); Engine.clear(engine); controls.current = null;
        delete el.dataset.physicsReady; el.style.removeProperty("height");
        buttons.current.forEach(button => { if (button) { button.style.removeProperty("transform"); button.style.removeProperty("width"); } });
      };
    }).catch(() => { /* In-flow pills remain readable if enhancement cannot load. */ });
    return () => { disposed = true; teardown(); };
  }, [bubbles]);

  function release(event: PointerEvent<HTMLButtonElement>) {
    controls.current?.release();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <article className="flex flex-col overflow-hidden rounded-2xl border border-ink/30 bg-cream">
    <h3 className="shrink-0 bg-ink px-4 py-4 text-center font-semibold text-white">{title}</h3>
    <div ref={panel} className="physics-pills relative flex grow shrink-0 flex-wrap items-start justify-center gap-3 overflow-hidden p-3">
      {bubbles.map((bubble, index) => <button key={bubble.text} ref={el => { buttons.current[index] = el; }}
        type="button" aria-label={bubble.text + " Drag to pick up and release to drop. Press Enter to nudge."}
        onPointerDown={event => { if (!controls.current) return; event.currentTarget.setPointerCapture(event.pointerId); controls.current.grab(index, event.clientX, event.clientY); }}
        onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) controls.current?.move(event.clientX, event.clientY); }}
        onPointerUp={release} onPointerCancel={release} onLostPointerCapture={() => controls.current?.release()}
        onClick={event => { if (event.detail === 0) controls.current?.nudge(index); }}
        className={"min-h-14 w-[46%] select-none rounded-full border px-6 py-3 text-center text-xs font-semibold leading-relaxed shadow-sm [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm " + (bubble.tone === "dark" ? "border-ink bg-ink text-white" : bubble.tone === "orange" ? "border-brand bg-brand text-ink" : "border-brand bg-white text-ink")}><span className="block">{bubble.text}</span></button>)}
    </div>
  </article>;
}
