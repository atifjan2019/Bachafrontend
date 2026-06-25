import {
  SOCIAL_ACCOUNTS,
  SOCIAL_ORDER,
  type SocialKey,
} from "@/lib/constants/social";
import { SOCIAL_ICONS } from "./SocialIcons";

type Tone = "onLight" | "onDark";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: string; icon: string; gap: string }> = {
  sm: { box: "h-9 w-9", icon: "h-[15px] w-[15px]", gap: "gap-2" },
  md: { box: "h-10 w-10", icon: "h-[18px] w-[18px]", gap: "gap-2.5" },
  lg: { box: "h-11 w-11", icon: "h-5 w-5", gap: "gap-3" },
};

/**
 * Row of brand social icons that all point at the canonical Bacha Stylo
 * accounts. Drop it into any surface and tune the look with `tone`
 * (background it sits on), `bordered`, and `size`.
 *
 * `overrides` lets pages that already load admin Settings substitute the
 * configured URL for a channel; empty/missing values fall back to the
 * constant so a link is always rendered.
 */
export function SocialLinks({
  tone = "onLight",
  bordered = true,
  size = "md",
  includeWhatsApp = true,
  overrides,
  className = "",
}: {
  tone?: Tone;
  bordered?: boolean;
  size?: Size;
  includeWhatsApp?: boolean;
  overrides?: Partial<Record<SocialKey, string | null | undefined>>;
  className?: string;
}) {
  const s = SIZES[size];
  const keys = SOCIAL_ORDER.filter((k) => includeWhatsApp || k !== "whatsapp");

  const tones: Record<Tone, string> = {
    onDark: bordered
      ? "border border-white/20 text-white/70 hover:border-brand-red hover:bg-brand-red hover:text-white"
      : "text-white/70 hover:text-brand-red",
    onLight: bordered
      ? "border border-ink-10 text-ink-70 hover:border-brand-red hover:bg-brand-red hover:text-white"
      : "text-ink-50 hover:text-brand-red",
  };

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {keys.map((k) => {
        const account = SOCIAL_ACCOUNTS[k];
        const Icon = SOCIAL_ICONS[k];
        const href = overrides?.[k]?.trim() || account.href;
        return (
          <a
            key={k}
            aria-label={account.label}
            title={account.label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex shrink-0 items-center justify-center transition-all duration-300 ${s.box} ${tones[tone]}`}
          >
            <Icon className={s.icon} />
          </a>
        );
      })}
    </div>
  );
}
