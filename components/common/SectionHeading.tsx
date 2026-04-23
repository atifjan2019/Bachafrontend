export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  variant = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-[2px] w-8 bg-brand-red" />
          <p className="text-[11px] uppercase tracking-[0.28em] font-bold text-brand-red">
            {eyebrow}
          </p>
          <span className="h-[2px] w-8 bg-brand-red" />
        </div>
      )}
      <h2
        className={`font-display font-bold tracking-tightest leading-[1.02] text-4xl sm:text-5xl lg:text-6xl ${
          isDark ? "text-white" : "text-brand-black"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base lg:text-lg leading-relaxed max-w-xl ${
            align === "center" ? "mx-auto" : ""
          } ${isDark ? "text-white/70" : "text-ink-70"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
