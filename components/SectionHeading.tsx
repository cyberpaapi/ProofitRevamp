import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  center?: boolean;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, accent, lede, center, dark }: Props) {
  return (
    <Reveal className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-semibold leading-[1.12] md:text-5xl ${dark ? "text-white" : "text-ink"}`}>
        {title} {accent && <span className="text-brand">{accent}</span>}
      </h2>
      {lede && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink-soft/80"}`}>{lede}</p>
      )}
    </Reveal>
  );
}
