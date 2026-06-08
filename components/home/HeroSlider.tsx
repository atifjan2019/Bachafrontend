import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const HERO_IMAGE =
  "https://media.bachastylo.com/media/c20808da-4ba4-4ea0-967f-16e75b9422bf.jpg";

const STATS = [
  { num: "50k+", label: "Happy Families" },
  { num: "200+", label: "Signature Pieces" },
  { num: "4.9★", label: "Customer Rating" },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-brand-black text-white">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Bacha Style collection"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/85 via-brand-black/55 to-brand-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-brand-black/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.28)_0%,transparent_55%)]" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

      {/* Side label (desktop) */}
      <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center gap-4 text-[10px] uppercase tracking-[0.42em] text-white/40 font-semibold">
        <span>Est · 2020</span>
        <span className="text-brand-red">◆</span>
        <span>Made in Pakistan</span>
      </div>

      {/* Content */}
      <div className="relative container-shop flex min-h-[80vh] flex-col justify-center py-20 sm:min-h-[86vh] lg:min-h-[92vh] lg:py-28">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/80">
              New Season · Spring 2026
            </span>
          </div>

          <h1 className="font-display font-bold tracking-tightest leading-[0.92] text-[clamp(2.5rem,9vw,6rem)] text-white">
            <span className="block">Bold styles</span>
            <span className="block">
              for <span className="italic text-brand-red">little</span>
            </span>
            <span className="block">legends.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
            Premium kids' clothing made for motion, mischief and moments that
            matter. Crafted from soft, durable fabrics — built for every
            adventure.
          </p>

          <div className="mt-9 flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-brand-red px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-brand-black sm:px-8 sm:py-5 sm:text-[13px]"
            >
              <span className="relative z-10">Shop the Collection</span>
              <ArrowUpRight
                className="relative z-10 h-4 w-4 transition-transform group-hover:rotate-45"
                strokeWidth={2.5}
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/40 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-brand-red hover:text-brand-red sm:px-8 sm:py-5 sm:text-[13px]"
            >
              Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 sm:gap-6 lg:mt-16 lg:gap-12 lg:pt-8">
            {STATS.map((s) => (
              <div key={s.label} className="min-w-0">
                <div className="truncate font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {s.num}
                </div>
                <div className="mt-1 text-[9px] uppercase leading-tight tracking-[0.18em] text-white/55 sm:text-[10px] sm:tracking-[0.22em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
