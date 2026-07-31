import Image from "next/image";
import LandingLeadForm from "@/components/LandingLeadForm";

export function CampaignHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/92 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Image
          src="/images/logo.svg"
          alt="Proofit"
          width={138}
          height={46}
          priority
          className="h-auto w-[118px] brightness-0 invert sm:w-[138px]"
        />
      </div>
    </header>
  );
}

export function CampaignFooter({ idPrefix }: { idPrefix: string }) {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-9 grid gap-6 lg:grid-cols-[260px_1fr] lg:items-end">
          <div>
            <Image
              src="/images/logo.svg"
              alt="Proofit"
              width={150}
              height={50}
              className="h-auto w-[140px] brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Evidence-backed property inspections for clearer decisions.
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand">Enquire Now</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
              Tell us what needs to be inspected.
            </h2>
          </div>
        </div>
        <LandingLeadForm variant="horizontal" idPrefix={idPrefix} />
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Proofit Company. All rights reserved.
      </div>
    </footer>
  );
}
