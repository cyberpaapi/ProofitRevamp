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
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${
          dark ? "bg-white/10 text-brand" : "bg-brand-soft text-brand-deep"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {eyebrow}
      </span>
      <h2 className={`mt-4 text-3xl font-bold leading-[1.08] md:text-5xl ${dark ? "text-white" : "text-ink"}`}>
        {title} {accent && <span className="text-brand">{accent}</span>}
      </h2>
      {lede && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink-soft/80"}`}>{lede}</p>
      )}
    </Reveal>
  );
}
