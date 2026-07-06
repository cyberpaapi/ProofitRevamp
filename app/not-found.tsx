import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 pb-24 pt-44 text-center">
      <p className="mb-3 font-display text-7xl font-bold text-brand">404</p>
      <h1 className="mb-3 text-2xl font-bold">This page didn&apos;t pass inspection.</h1>
      <p className="mb-8 max-w-md text-ink-soft/75">
        The page you&apos;re looking for has been moved or doesn&apos;t exist. Let&apos;s get you back to solid ground.
      </p>
      <Link href="/" className="rounded-full bg-brand px-7 py-3.5 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-deep">
        Back to Homepage
      </Link>
    </div>
  );
}
