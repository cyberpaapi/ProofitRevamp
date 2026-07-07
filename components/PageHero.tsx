import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
};

/** Interior-page hero: light editorial header with an optional wide banner tile. */
export default function PageHero({ eyebrow, title, accent, lede, image, imageAlt = "" }: Props) {
  return (
    <section className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span
          className="hero-rise inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-sm font-bold text-brand-deep"
          style={{ ["--rise-delay" as string]: "0ms" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {eyebrow}
        </span>
        <h1
          className="hero-rise mt-5 max-w-4xl text-4xl font-bold leading-[1.05] md:text-6xl"
          style={{ ["--rise-delay" as string]: "120ms" }}
        >
          {title} {accent && <span className="text-brand">{accent}</span>}
        </h1>
        {lede && (
          <p
            className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft/80"
            style={{ ["--rise-delay" as string]: "240ms" }}
          >
            {lede}
          </p>
        )}
        {image && (
          <div
            className="hero-rise relative mt-10 aspect-[21/9] overflow-hidden rounded-3xl md:mt-14"
            style={{ ["--rise-delay" as string]: "320ms" }}
          >
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
