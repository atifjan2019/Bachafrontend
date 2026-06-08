"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const SLIDES: Slide[] = [
  {
    image:
      "https://media.bachastylo.com/media/c20808da-4ba4-4ea0-967f-16e75b9422bf.jpg",
    alt: "Bacha Style collection",
    eyebrow: "Latest collection",
    title: "Style meets\ncomfort.",
    subtitle:
      "Beautifully crafted kids' outfits designed for everyday adventures.",
    cta: { label: "Shop now", href: "/products" },
  },
];

const AUTO_PLAY_MS = 5000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative bg-surface-soft overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-shop grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 lg:py-24">
        {/* Text */}
        <div className="lg:col-span-6">
          <span className="pill mb-5">{slide.eyebrow}</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-brand-black leading-[0.98] tracking-tightest whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="mt-6 text-base lg:text-lg text-ink-50 max-w-lg leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={slide.cta.href} className="btn-primary">
              {slide.cta.label}
            </Link>
            {slide.ctaSecondary && (
              <Link href={slide.ctaSecondary.href} className="btn-outline">
                {slide.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-sunken">
            {SLIDES.map((s, i) => (
              <Image
                key={i}
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 600px"
                className={`object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-black hover:bg-white transition shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-brand-black hover:bg-white transition shadow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-6 bg-brand-black"
                    : "w-2 bg-brand-black/30 hover:bg-brand-black/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
