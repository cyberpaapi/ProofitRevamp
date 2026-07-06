import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      publishedTime: post.date,
    },
  };
}

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.legalName },
  };

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-ink pb-20 pt-36 text-white md:pb-24 md:pt-44">
          <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="hero-rise mb-4 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{post.tag}</span>
              <span className="text-white/70">
                {fmt.format(new Date(post.date))} · {post.readMins} min read
              </span>
            </p>
            <h1 className="hero-rise text-3xl font-bold leading-tight md:text-5xl" style={{ ["--rise-delay" as string]: "120ms" }}>
              {post.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.title} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
          </Reveal>
          <div className="space-y-6">
            {post.body.map((block, i) => (
              <Reveal key={i} delay={40}>
                {block.h && <h2 className="mb-3 mt-4 text-2xl font-bold">{block.h}</h2>}
                <p className="text-lg leading-relaxed text-ink-soft/90">{block.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 rounded-2xl border-l-4 border-brand bg-brand-soft p-7">
            <p className="font-bold text-ink">Dealing with this in your own home?</p>
            <p className="mt-1 text-ink-soft/85">
              A Proofit inspection turns suspicion into an evidence-backed answer.{" "}
              <Link href="/contact" className="font-bold text-brand-deep underline underline-offset-2">
                Book an inspection
              </Link>{" "}
              or message us on WhatsApp.
            </p>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-line bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card-lift group flex items-center gap-5 rounded-2xl border border-line bg-paper p-5">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.image} alt={p.title} fill sizes="112px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold leading-snug transition-colors group-hover:text-brand-deep">{p.title}</h3>
                  <p className="mt-1 text-xs text-ink-soft/60">{p.readMins} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
