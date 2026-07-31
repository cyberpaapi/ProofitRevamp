import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
};

/** Interior-page hero: dark charcoal band per the reference theme. */
export default function PageHero({ eyebrow, title, accent, lede, image, imageAlt = "" }: Props) {
  const bodyCopy = lede?.trim();
  const punctuatedBodyCopy = bodyCopy && !/[.!?]$/.test(bodyCopy) ? `${bodyCopy}.` : bodyCopy;

  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white md:pb-24 md:pt-40">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-y-0 left-0 w-[min(92%,58rem)] bg-gradient-to-r from-ink/68 via-ink/35 to-transparent" aria-hidden />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="hero-rise font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand" style={{ ["--rise-delay" as string]: "0ms" }}>
          {eyebrow}
        </p>
        <h1 className="hero-rise mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.12] md:text-6xl" style={{ ["--rise-delay" as string]: "120ms" }}>
          {title} {accent && <span className="text-brand">{accent}</span>}
        </h1>
        {punctuatedBodyCopy && (
          <p className="hero-rise mt-4 max-w-2xl font-normal text-lg leading-relaxed text-white/85 md:mt-6" style={{ ["--rise-delay" as string]: "240ms" }}>
            {punctuatedBodyCopy}
          </p>
        )}
      </div>
    </section>
  );
}
