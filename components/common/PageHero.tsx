import Image from "next/image";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  image?: string;
  size?: "default" | "lg";
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  variant = "light",
  align = "left",
  image,
  size = "default",
}: PageHeroProps) {
  const isDark = variant === "dark" || !!image;
  const heightClass =
    size === "lg" ? "h-[440px] lg:h-[520px]" : "h-[220px] lg:h-[260px]";

  return (
    <section className={`relative ${heightClass} overflow-hidden`}>
      {/* Background */}
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      ) : (
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-brand-black" : "bg-surface-soft"
          }`}
        />
      )}

      {/* Content */}
      <div
        className={`relative h-full flex flex-col justify-center container-shop ${
          align === "center" ? "text-center items-center" : ""
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
          className={`mt-3 font-display text-3xl lg:text-4xl tracking-tightest leading-tight ${
            isDark ? "text-white" : "text-brand-black"
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-2 text-sm lg:text-base max-w-xl leading-relaxed ${
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
