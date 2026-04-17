interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "light",
  align = "left",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-brand-black text-white" : "bg-surface-soft"}>
      <div
        className={`container-shop py-16 lg:py-20 ${
          align === "center" ? "text-center max-w-4xl mx-auto" : "max-w-4xl"
        }`}
      >
        <span
          className={`inline-block text-[11px] uppercase tracking-[0.22em] font-medium ${
            isDark ? "text-white/60" : "text-ink-50"
          }`}
        >
          {eyebrow}
        </span>
        <h1
          className={`mt-4 font-display text-4xl lg:text-5xl tracking-tightest leading-tight ${
            isDark ? "text-white" : "text-brand-black"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-4 text-base lg:text-lg max-w-2xl leading-relaxed ${
              align === "center" ? "mx-auto" : ""
            } ${isDark ? "text-white/70" : "text-ink-50"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
