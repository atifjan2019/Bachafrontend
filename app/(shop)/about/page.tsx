import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Heart,
  Leaf,
  Shield,
  Users,
  Star,
  Scissors,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — Bacha Stylo",
  description:
    "The story behind Bacha Stylo — small-batch kids' clothing designed and made in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] overflow-hidden bg-brand-black text-white">
        <Image
          src="/images/about/hero.png"
          alt="Children in Bacha Stylo clothing"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black/80 to-brand-red/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.3)_0%,transparent_55%)]" />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

        {/* Side rotating label */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center gap-4 text-[10px] uppercase tracking-[0.42em] text-white/40 font-semibold">
          <span>Since 2020</span>
          <span className="text-brand-red">◆</span>
          <span>Lahore, Pakistan</span>
        </div>

        <div className="relative h-full flex flex-col justify-end container-shop pb-16 sm:pb-20 lg:pb-28 min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh]">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-10 bg-brand-red" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
              Our Story
            </span>
          </div>
          <h1 className="font-display font-bold tracking-tightest leading-[0.94] text-[clamp(2.5rem,8vw,7rem)] text-white max-w-4xl">
            Clothes kids
            <br />
            actually{" "}
            <span className="italic text-brand-red">want</span>
            <br />
            to wear.
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed">
            Small-batch kids&apos; clothing designed and made in Pakistan — built
            for play, priced for parents.
          </p>
        </div>
      </section>

      {/* ─── MISSION MARQUEE ─── */}
      <section className="relative bg-brand-red text-white overflow-hidden py-4 sm:py-5 border-y-2 border-brand-black">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-12 px-6">
              {[
                "Premium Fabrics",
                "Made in Pakistan",
                "Honest Pricing",
                "Safe for Skin",
              ].map((t, j) => (
                <span key={j} className="flex items-center gap-3 sm:gap-5">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
                  <span className="font-display text-lg sm:text-2xl lg:text-3xl font-black uppercase tracking-tight">
                    {t}
                  </span>
                  <span className="text-lg sm:text-2xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY WE EXIST ─── */}
      <section className="py-20 sm:py-24 lg:py-36 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-64 bg-brand-red hidden lg:block" />

        <div className="container-shop grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[2px] w-8 bg-brand-red" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                  Why We Exist
                </span>
              </div>
              <div className="font-display text-[10rem] leading-none font-black text-brand-red/10 hidden lg:block">
                01
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-display font-bold tracking-tightest leading-[1] text-4xl sm:text-5xl lg:text-7xl text-brand-black">
              Kids grow fast.
              <br />
              <span className="italic text-brand-red">Their clothes</span>
              <br />
              should keep up.
            </h2>
            <p className="mt-8 sm:mt-10 text-lg sm:text-xl text-ink-70 max-w-2xl leading-relaxed">
              We believe every child deserves well-made, thoughtfully designed clothes at honest
              prices. No compromises on comfort, quality, or the people who make them.
            </p>
          </div>
        </div>
      </section>

      {/* ─── ORIGIN STORY ─── */}
      <section className="relative bg-brand-black text-white overflow-hidden py-20 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,29,37,0.2)_0%,transparent_55%)]" />

        <div className="container-shop relative grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="relative max-w-lg mx-auto lg:mx-0 w-full order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/about/craftsmanship.png"
                alt="Artisan craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-red/20" />
            </div>
            <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-14 sm:w-20 h-14 sm:h-20 border-t-2 border-l-2 border-brand-red" />
            <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-14 sm:w-20 h-14 sm:h-20 border-b-2 border-r-2 border-brand-red" />
            <div className="absolute top-4 sm:top-6 -right-3 sm:-right-6 bg-brand-red text-white px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-bold shadow-red-glow-lg flex items-center gap-2">
              <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} /> Lahore, PK
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-[2px] w-8 sm:w-10 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                The Origin
              </span>
            </div>

            <h2 className="font-display font-bold tracking-tightest leading-[0.98] text-4xl sm:text-5xl lg:text-6xl">
              From a single
              <br />
              <span className="italic text-brand-red">sewing machine</span>
              <br />
              to a brand families trust.
            </h2>

            <div className="mt-8 sm:mt-10 space-y-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
              <p>
                It started with a frustrated parent and a sewing machine. Off-the-shelf kids&apos;
                clothes were either too flimsy, too expensive, or both. So we started making our
                own — testing fabrics, perfecting fits, listening.
              </p>
              <p>
                Word spread, orders grew, and Bacha Stylo was born. Today we work with a tight
                circle of local artisans in Lahore, producing in small batches so nothing goes
                to waste — and every piece gets the attention it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-36 bg-ink-5 relative noise-overlay">
        <div className="container-shop relative">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                What Drives Us
              </span>
              <span className="h-[2px] w-8 bg-brand-red" />
            </div>
            <h2 className="font-display font-bold tracking-tightest leading-[1.02] text-4xl sm:text-5xl lg:text-6xl text-brand-black">
              Six ideas we
              <br />
              <span className="italic text-brand-red">won&apos;t compromise</span> on.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-ink-10 bg-white">
            {[
              { icon: Shield, title: "Built to Last", body: "Reinforced stitching, generous seam allowances, pre-washed fabrics that soften with age." },
              { icon: Scissors, title: "Small Batch", body: "Less waste, better quality control, and the ability to bring back styles you love." },
              { icon: Leaf, title: "Kind to Skin", body: "OEKO-TEX certified dyes, natural fibre blends, chemical-free finishing." },
              { icon: Heart, title: "Honest Pricing", body: "No middlemen, no inflated margins. Quality wear that doesn't require a second thought." },
              { icon: Users, title: "Local Makers", body: "Every piece is stitched in Pakistan by skilled artisans paid above market rate." },
              { icon: Star, title: "Parent-Approved", body: "Designed by parents, tested by kids. Real feedback shapes every collection." },
            ].map((v, i) => (
              <Value key={i} index={i} icon={<v.icon className="h-5 w-5" strokeWidth={2} />} title={v.title} body={v.body} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="relative bg-brand-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.18)_0%,transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

        <div className="container-shop grid grid-cols-2 lg:grid-cols-4 py-16 sm:py-20 lg:py-24 gap-8 sm:gap-10 relative z-10 divide-x divide-white/10">
          <Stat number="12" label="Collections in 2025" />
          <Stat number="48k+" label="Happy Families" />
          <Stat number="100%" label="Made in Pakistan" />
          <Stat number="14d" label="Easy Returns" />
        </div>
      </section>

      {/* ─── PROMISE / CTA ─── */}
      <section className="py-20 sm:py-24 lg:py-36 bg-white">
        <div className="container-shop grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-[2px] w-8 sm:w-10 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
                Our Promise
              </span>
            </div>

            <h2 className="font-display font-bold tracking-tightest leading-[0.98] text-4xl sm:text-5xl lg:text-6xl text-brand-black">
              Good clothes,
              <br />
              <span className="italic text-brand-red">made responsibly.</span>
            </h2>

            <div className="mt-8 space-y-4 sm:space-y-5 text-base sm:text-lg text-ink-70 leading-relaxed max-w-xl">
              <p>
                Every Bacha Stylo piece is cut with extra room for growth, stitched to handle real
                life, and priced so parents never have to choose between quality and value.
              </p>
              <p>
                We work directly with local makers and pay above market rate. No middlemen, no
                markups on top of markups — just well-made clothes from our studio to your door.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 space-y-3">
              {[
                { icon: Sparkles, text: "Premium pre-washed fabrics that soften with every wash" },
                { icon: Shield, text: "Reinforced seams for active kids who never slow down" },
                { icon: Leaf, text: "Chemical-free dyes, safe on even the most sensitive skin" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 border border-brand-red flex items-center justify-center shrink-0 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                    <item.icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="text-sm sm:text-base text-ink-70">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center gap-3 bg-brand-red text-white px-6 sm:px-8 py-4 sm:py-5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] transition-all duration-500 hover:bg-brand-black"
              >
                Shop the Collection
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border-2 border-brand-black text-brand-black px-6 sm:px-8 py-4 sm:py-5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-brand-black hover:text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative max-w-lg mx-auto lg:mx-0 w-full">
            <div className="relative aspect-square w-full overflow-hidden bg-ink-5">
              <Image
                src="/images/about/flatlay.png"
                alt="Bacha Stylo kids clothing flatlay"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-14 sm:w-20 h-14 sm:h-20 border-t-2 border-l-2 border-brand-red" />
            <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-14 sm:w-20 h-14 sm:h-20 border-b-2 border-r-2 border-brand-red" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Value({
  icon,
  title,
  body,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="group relative p-8 sm:p-10 border-ink-10 border-b sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(2n)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l lg:[&:nth-child(n+4)]:border-t sm:[&:nth-last-child(-n+1)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 bg-white hover:bg-brand-black transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 left-0 h-1 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="h-14 w-14 border-2 border-brand-red text-brand-red group-hover:bg-brand-red group-hover:text-white flex items-center justify-center transition-colors">
            {icon}
          </div>
          <span className="font-display text-2xl font-black text-ink-10 group-hover:text-brand-red/40 transition-colors">
            0{index + 1}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-black group-hover:text-white tracking-tight mb-3 transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-ink-70 group-hover:text-white/70 leading-relaxed transition-colors">
          {body}
        </p>
      </div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center px-2 sm:px-4">
      <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tightest text-white leading-none">
        {number}
      </p>
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
        <span className="h-[1px] w-4 bg-brand-red" />
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-red font-bold">
          {label}
        </p>
        <span className="h-[1px] w-4 bg-brand-red" />
      </div>
    </div>
  );
}
