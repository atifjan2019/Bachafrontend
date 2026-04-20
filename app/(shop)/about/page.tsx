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
  ArrowRight,
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
    <div className="flex flex-col">
      {/* ─── HERO: Full-width image with overlay ─── */}
      <section className="relative h-[480px] lg:h-[600px] overflow-hidden">
        <Image
          src="/images/about/hero.png"
          alt="Children in Bacha Stylo clothing"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end container-shop pb-12 lg:pb-16">
          <span className="inline-block text-[11px] uppercase tracking-[0.22em] font-medium text-white/60 mb-3">
            Our story
          </span>
          <h1 className="font-display text-4xl lg:text-6xl text-white tracking-tightest leading-[1.02] max-w-2xl">
            Clothes kids actually{" "}
            <span className="italic font-normal">want</span> to wear.
          </h1>
          <p className="mt-4 text-base lg:text-lg text-white/70 max-w-xl leading-relaxed">
            Small-batch kids&apos; clothing designed and made in Pakistan —
            built for play, priced for parents.
          </p>
        </div>
      </section>

      {/* ─── MISSION STRIP ─── */}
      <section className="border-b border-ink-10 bg-white">
        <div className="container-shop py-6 flex items-center justify-center gap-8 overflow-x-auto no-scrollbar text-xs uppercase tracking-[0.22em] text-ink-50 whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Premium fabrics
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Made in Pakistan
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Honest pricing
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Safe for skin
          </span>
        </div>
      </section>

      {/* ─── WHY WE EXIST ─── */}
      <section className="py-20 lg:py-28">
        <div className="container-shop max-w-4xl text-center">
          <span className="eyebrow">Why we exist</span>
          <h2 className="mt-4 font-display text-3xl lg:text-5xl text-brand-black tracking-tightest leading-tight">
            Kids grow fast. Their clothes should keep up — not hold them back.
          </h2>
          <p className="mt-6 text-base text-ink-50 max-w-2xl mx-auto leading-relaxed">
            We believe every child deserves well-made, thoughtfully designed
            clothes at honest prices. No compromises on comfort, quality, or the
            planet.
          </p>
        </div>
      </section>

      {/* ─── TWO-COL STORY: Left image, right text ─── */}
      <section className="bg-surface-soft">
        <div className="container-shop grid lg:grid-cols-2 gap-0 lg:min-h-[560px]">
          <div className="relative aspect-square lg:aspect-auto overflow-hidden">
            <Image
              src="/images/about/craftsmanship.png"
              alt="Artisan craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center p-10 lg:p-16 xl:p-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-ink-10 w-fit mb-6">
                <MapPin className="h-3.5 w-3.5 text-brand-black" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-black">
                  Made in Lahore
                </span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl text-brand-black tracking-tightest leading-tight">
                From a single sewing machine to a brand families trust.
              </h2>
              <p className="mt-6 text-sm text-ink-50 leading-relaxed">
                It started with a frustrated parent and a sewing machine.
                Off-the-shelf kids&apos; clothes were either too flimsy, too
                expensive, or both. So we started making our own — testing
                fabrics, perfecting fits, and listening to what other parents
                actually needed.
              </p>
              <p className="mt-4 text-sm text-ink-50 leading-relaxed">
                Word spread, orders grew, and Bacha Stylo was born. Today we
                work with a tight circle of local artisans in Lahore, producing
                in small batches so nothing goes to waste and every piece gets
                the attention it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES GRID ─── */}
      <section className="py-20 lg:py-28">
        <div className="container-shop">
          <div className="text-center mb-14">
            <span className="eyebrow">What drives us</span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
              Our values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <Value
              icon={<Shield className="h-5 w-5" />}
              title="Built to last"
              body="Reinforced stitching, generous seam allowances, and pre-washed fabrics that only get softer with age."
              accent="bg-blue-50 text-blue-600"
            />
            <Value
              icon={<Scissors className="h-5 w-5" />}
              title="Small batch"
              body="We stitch in small runs — less waste, better quality control, and the ability to bring back styles you love."
              accent="bg-amber-50 text-amber-600"
            />
            <Value
              icon={<Leaf className="h-5 w-5" />}
              title="Kind to skin"
              body="OEKO-TEX certified dyes, natural fibre blends, and chemical-free finishing safe for sensitive skin."
              accent="bg-green-50 text-green-600"
            />
            <Value
              icon={<Heart className="h-5 w-5" />}
              title="Honest pricing"
              body="No middlemen, no inflated margins. Quality kids' wear that doesn't require a second thought at checkout."
              accent="bg-rose-50 text-rose-600"
            />
            <Value
              icon={<Users className="h-5 w-5" />}
              title="Local makers"
              body="Every piece is stitched in Pakistan by skilled artisans paid above market rate."
              accent="bg-purple-50 text-purple-600"
            />
            <Value
              icon={<Star className="h-5 w-5" />}
              title="Parent-approved"
              body="Designed by parents, tested by kids. Real feedback shapes every collection we release."
              accent="bg-orange-50 text-orange-600"
            />
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="bg-brand-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container-shop grid grid-cols-2 lg:grid-cols-4 py-16 lg:py-20 gap-8 relative z-10">
          <Stat number="12" label="Collections in 2025" />
          <Stat number="48k+" label="Happy families" />
          <Stat number="100%" label="Made in Pakistan" />
          <Stat number="14-day" label="Easy returns" />
        </div>
      </section>

      {/* ─── TWO-COL REVERSE: Text left, image right ─── */}
      <section className="py-20 lg:py-28">
        <div className="container-shop grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="eyebrow">Our promise</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-brand-black tracking-tightest leading-tight">
              Good clothes,
              <br />
              <span className="text-ink-50">made responsibly.</span>
            </h2>
            <p className="mt-6 text-sm text-ink-50 leading-relaxed">
              Every Bacha Stylo piece is cut with extra room for growth,
              stitched to handle real life, and priced so parents never have to
              choose between quality and value.
            </p>
            <p className="mt-4 text-sm text-ink-50 leading-relaxed">
              We work directly with local makers and pay above market rate. No
              middlemen, no markups on top of markups — just well-made clothes
              from our studio to your doorstep.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                {
                  icon: Sparkles,
                  text: "Premium pre-washed fabrics that soften with every wash",
                },
                {
                  icon: Shield,
                  text: "Reinforced seams for active kids who never slow down",
                },
                {
                  icon: Leaf,
                  text: "Chemical-free dyes, safe on even the most sensitive skin",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-ink-70"
                >
                  <div className="h-8 w-8 rounded-lg bg-surface-soft flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-brand-black" />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-brand-black text-white hover:bg-black hover:shadow-md hover:-translate-y-0.5 rounded-full transition-all duration-300 group"
              >
                Shop the collection
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-sunken">
            <Image
              src="/images/about/flatlay.png"
              alt="Bacha Stylo kids clothing flatlay"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER / CTA ─── */}
      <section className="bg-surface-soft border-t border-ink-10">
        <div className="container-shop py-20 lg:py-24 text-center max-w-2xl mx-auto">
          <span className="eyebrow">Join the family</span>
          <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
            Stay in the loop
          </h2>
          <p className="mt-4 text-sm text-ink-50 leading-relaxed">
            New drops, restocks, and behind-the-scenes from our workshop. No
            spam — just good stuff for your little ones.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-brand-black text-white hover:bg-black hover:shadow-md rounded-full transition-all duration-300 w-full sm:w-auto group"
            >
              Browse collection
              <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-ink-20 text-brand-black hover:bg-white rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              Contact us
            </Link>
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
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="group rounded-2xl border border-ink-10 p-6 transition-all duration-300 hover:border-ink-30 hover:shadow-md hover:-translate-y-1 bg-white">
      <div
        className={`h-11 w-11 rounded-xl ${accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="font-display text-lg text-brand-black tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-50 leading-relaxed">{body}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl lg:text-5xl tracking-tightest">
        {number}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">
        {label}
      </p>
    </div>
  );
}
