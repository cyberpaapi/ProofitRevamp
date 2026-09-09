import Reveal from "./Reveal";
export default function CareProcess({ steps }: { steps: string[] }) {
  return <Reveal className="proofit-scrollbar mt-12 overflow-x-auto overscroll-x-contain pb-6"><ol className="care-path flex w-max min-w-full items-stretch" aria-label="Proofit Care Plus process">
    {steps.map((step, index) => <Reveal as="li" delay={index * 90} className="relative flex w-40 flex-1 flex-col items-center px-3 text-center" key={step}>
      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand bg-cream text-lg font-semibold text-brand-deep">{String(index+1).padStart(2,"0")}</span>
      {index < steps.length - 1 && <span aria-hidden className="care-link absolute left-1/2 top-7 h-0.5 w-full bg-brand" />}
      <p className="mt-4 max-w-40 text-sm font-semibold leading-relaxed">{step}</p>
    </Reveal>)}
  </ol></Reveal>;
}
