import Link from "next/link";
import Image from "next/image";

interface BrandMarkProps {
  variant?: "light" | "dark";
  size?: "default" | "lg" | "xl";
}

export function BrandMark({ variant = "light", size = "default" }: BrandMarkProps) {
  const src =
    variant === "dark"
      ? "/images/BachaStylo%20White%20Logo%20for%20web.png"
      : "/images/BachaStylo%20Logo%20for%20web.png";

  const maxH = {
    default: "max-h-10",
    lg:      "max-h-[60px]",
    xl:      "max-h-20",
  }[size];

  return (
    <Link href="/" className="inline-flex items-center" aria-label="Bacha Stylo">
      <Image
        src={src}
        alt="Bacha Stylo"
        width={0}
        height={0}
        sizes="100vw"
        className={`w-auto h-auto ${maxH} object-contain`}
        priority
      />
    </Link>
  );
}
