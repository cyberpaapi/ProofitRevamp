import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  image?: string;
  imageMobile?: string;
  imageAlt?: string;
  imagePosition?: "top" | "center";
  breadcrumbLabel?: string;
  breadcrumbParent?: { label: string; href: string };
};

/** Interior-page hero: dark charcoal band per the reference theme. */
export default function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  image,
  imageMobile,
  imageAlt = "",
  imagePosition = "top",
  breadcrumbLabel,
  breadcrumbParent,
}: Props) {
  const bodyCopy = lede?.trim();
  const punctuatedBodyCopy = bodyCopy && !/[.!?]$/.test(bodyCopy) ? `${bodyCopy}.` : bodyCopy;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(breadcrumbParent ? [breadcrumbParent] : []),
    { label: breadcrumbLabel ?? eyebrow },
  ];

  return (
    <section
      className="site-banner relative flex items-end overflow-hidden bg-ink text-white"
    >
      {image && (
        <>
          {imageMobile && (
            <Image src={imageMobile} alt={imageAlt} fill priority sizes="100vw" className="object-cover md:hidden" />
          )}
          <Image src={image} alt={imageMobile ? "" : imageAlt} fill priority quality={85} sizes="100vw" className={`${imageMobile ? "hidden md:block" : ""} ${imagePosition === "center" ? "origin-bottom scale-125 md:scale-100" : ""} object-cover`} style={{objectPosition:imagePosition}} />
          <div className="absolute inset-y-0 left-0 w-[min(92%,58rem)] bg-gradient-to-r from-ink/68 via-ink/35 to-transparent" aria-hidden />
        </>
      )}
      <div className="site-container relative">
        <Breadcrumbs items={breadcrumbItems} className="hero-rise mb-5" />
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
