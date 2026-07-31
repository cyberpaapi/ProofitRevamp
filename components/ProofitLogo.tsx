import Image from "next/image";

type ProofitLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export default function ProofitLogo({ className = "", imageClassName = "", priority = false }: ProofitLogoProps) {
  return (
    <span
      className={`relative inline-block shrink-0 [container-type:inline-size] ${className}`}
    >
      <Image
        src="/images/logo.svg"
        alt="Proofit"
        width={647}
        height={218}
        priority={priority}
        className={`block h-auto w-full ${imageClassName}`}
      />
      <span
        aria-hidden="true"
        className="absolute -right-[7cqw] top-[9%] font-display text-[7cqw] font-medium leading-none tracking-[0.03em]"
      >
        TM
      </span>
    </span>
  );
}
