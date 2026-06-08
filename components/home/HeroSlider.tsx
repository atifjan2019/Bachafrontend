"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroContent {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const HERO: HeroContent = {
  image:
    "https://media.bachastylo.com/media/c20808da-4ba4-4ea0-967f-16e75b9422bf.jpg",
  alt: "Bacha Style collection",
  eyebrow: "Latest collection",
  title: "Style meets\ncomfort.",
  subtitle:
    "Beautifully crafted kids' outfits designed for everyday adventures.",
  cta: { label: "Shop now", href: "/products" },
  ctaSecondary: { label: "Explore collection", href: "/products" },
};

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-black">
      {/* Background image */}
      <Image
        src={HERO.image}
        alt={HERO.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="container-shop relative flex min-h-[78vh] items-center py-20 lg:min-h-[86vh] lg:py-28">
        <div className="max-w-2xl">
          <span className="pill mb-6 border-white/30 bg-white/10 text-white backdrop-blur">
            {HERO.eyebrow}
          </span>
          <h1 className="font-display text-5xl text-white leading-[0.98] tracking-tightest whitespace-pre-line sm:text-6xl lg:text-7xl xl:text-8xl">
            {HERO.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 lg:text-lg">
            {HERO.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={HERO.cta.href} className="btn-primary">
              {HERO.cta.label}
            </Link>
            {HERO.ctaSecondary && (
              <Link
                href={HERO.ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 border-2 border-white bg-transparent px-8 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-brand-black"
              >
                {HERO.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
