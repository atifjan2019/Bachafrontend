export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-brand-black">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-ink-50 max-w-xl">{subtitle}</p>}
    </div>
  );
}
