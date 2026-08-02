import Image from "next/image";

export default function ProofitCheck() {
  return (
    <Image
      src="/images/proofit-orange-tick-black.webp"
      alt=""
      width={24}
      height={24}
      className="h-5 w-5 shrink-0 object-cover"
      aria-hidden="true"
    />
  );
}
