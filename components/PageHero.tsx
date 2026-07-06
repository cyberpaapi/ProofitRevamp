import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
};

/** Standard interior-page hero: dark band, orange eyebrow, optional background image. */
export default function PageHero({ eyebrow, title, accent, lede, image, imageAlt = "" }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-28 md:pt-44">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" aria-hidden />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="hero-rise mb-4 text-sm font-bold uppercase tracking-[0.2em] text-brand" style={{ ["--rise-delay" as string]: "0ms" }}>
          {eyebrow}
        </p>
        <h1 className="hero-rise max-w-3xl text-4xl font-bold leading-[1.1] md:text-6xl" style={{ ["--rise-delay" as string]: "120ms" }}>
          {title} {accent && <span className="text-brand">{accent}</span>}
        </h1>
        {lede && (
          <p className="hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-white/80" style={{ ["--rise-delay" as string]: "240ms" }}>
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
