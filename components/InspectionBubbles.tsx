"use client";

import BubblePanel from "./FallingCapsules";

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
