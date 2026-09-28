import Link from "next/link";
import { SafeImage } from "@/components/common/SafeImage";

interface BrandMarkProps {
  variant?: "light" | "dark";
  size?: "default" | "lg" | "xl";
  logoUrl?: string;
  className?: string;
}

// Rendered height per size, and the intrinsic width we ask the optimizer for.
// `sizes="100vw"` used to make Next pick the largest breakpoint (w=3840) for a
// logo that is never taller than 80px — a multi-hundred-KB download, marked
// `priority`, competing with the real above-the-fold content.
const SIZE = {
  default: { maxH: "max-h-10", px: 160 },
  lg: { maxH: "max-h-[60px]", px: 240 },
  xl: { maxH: "max-h-20", px: 320 },
} as const;

export function BrandMark({ variant = "light", size = "default", logoUrl, className }: BrandMarkProps) {
  const packaged =
    variant === "dark"
      ? "/images/BachaStylo%20White%20Logo%20for%20web.png"
      : "/images/BachaStylo%20Logo%20for%20web.png";
  const src = logoUrl || packaged;

  const { maxH, px } = SIZE[size];

  return (
    <Link href="/" className="inline-flex items-center" aria-label="Bacha Stylo">
      <SafeImage
        src={src}
        alt="Bacha Stylo"
        width={px}
        height={px}
        sizes={`${px}px`}
        className={`w-auto h-auto ${maxH} object-contain ${className || ""}`}
        priority
        referrerPolicy="no-referrer"
        // An admin-configured logo URL can 404 like any other media record;
        // fall back to the packaged file rather than losing the masthead.
        fallbackSrc={logoUrl ? packaged : undefined}
        fallback={<span className="sr-only">Bacha Stylo</span>}
      />
    </Link>
  );
}
