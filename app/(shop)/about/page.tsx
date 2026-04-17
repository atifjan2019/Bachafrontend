import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Heart, Leaf, Shield, Users, Star, Scissors } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "About — Bacha Stylo",
  description:
    "The story behind Bacha Stylo — small-batch kids' clothing designed and made in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageHero
        eyebrow="Our story"
        title="Clothes kids actually want to wear."
        subtitle="Small-batch kids' clothing designed and made in Pakistan."
        variant="dark"
        align="center"
      />

      {/* Mission statement */}
      <section className="py-20 lg:py-28">
        <div className="container-shop max-w-4xl text-center">
          <span className="eyebrow">Why we exist</span>
          <h2 className="mt-4 font-display text-3xl lg:text-5xl text-brand-black tracking-tightest leading-tight">
            Kids grow fast. Their clothes should keep up — not hold them back.
          </h2>
          <p className="mt-6 text-base text-ink-50 max-w-2xl mx-auto leading-relaxed">
            We believe every child deserves well-made, thoughtfully designed clothes at honest
            prices. No compromises on comfort, quality, or the planet.
          </p>
        </div>
      </section>

      {/* Two-column story */}
      <section className="bg-surface-soft">
        <div className="container-shop grid lg:grid-cols-2 gap-0">
          <div className="relative aspect-square lg:aspect-auto overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1400&auto=format&fit=crop&q=70"
              alt="Fabric and stitching detail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center p-10 lg:p-20">
            <div>
              <span className="eyebrow">The beginning</span>
              <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
                From a single sewing machine to a brand families trust.
              </h2>
              <p className="mt-6 text-sm text-ink-50 leading-relaxed">
                It started with a frustrated parent and a sewing machine. Off-the-shelf kids&apos;
                clothes were either too flimsy, too expensive, or both. So we started making our
                own — testing fabrics, perfecting fits, and listening to what other parents actually
                needed. Word spread, orders grew, and Bacha Stylo was born.
              </p>
              <p className="mt-4 text-sm text-ink-50 leading-relaxed">
                Today we work with a tight circle of local artisans in Lahore, producing in small
                batches so nothing goes to waste and every piece gets the attention it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-20 lg:py-28">
        <div className="container-shop">
          <div className="text-center mb-14">
            <span className="eyebrow">What drives us</span>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl text-brand-black tracking-tightest">
              Our values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <Value
              icon={<Shield className="h-6 w-6" />}
              title="Built to last"
              body="Reinforced stitching, generous seam allowances, and pre-washed fabrics that only get softer with age."
            />
            <Value
              icon={<Scissors className="h-6 w-6" />}
              title="Small batch"
              body="We stitch in small runs — less waste, better quality control, and the ability to bring back styles you love."
            />
            <Value
              icon={<Leaf className="h-6 w-6" />}
              title="Kind to skin"
              body="OEKO-TEX certified dyes, natural fibre blends, and chemical-free finishing safe for sensitive skin."
            />
            <Value
              icon={<Heart className="h-6 w-6" />}
              title="Honest pricing"
              body="No middlemen, no inflated margins. Quality kids' wear that doesn't require a second thought at checkout."
            />
            <Value
              icon={<Users className="h-6 w-6" />}
              title="Local makers"
              body="Every piece is stitched in Pakistan by skilled artisans paid above market rate. We know every hand that touches your order."
            />
            <Value
              icon={<Star className="h-6 w-6" />}
              title="Parent-approved"
              body="Designed by parents, tested by kids. Real feedback shapes every collection we release."
            />
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-ink-10 bg-brand-black text-white">
        <div className="container-shop grid grid-cols-2 lg:grid-cols-4 py-16 lg:py-20 gap-8">
          <Stat number="12" label="Collections in 2025" />
          <Stat number="48k+" label="Happy families" />
          <Stat number="100%" label="Made in Pakistan" />
          <Stat number="14-day" label="Easy returns" />
        </div>
      </section>

      {/* Promise + CTA */}
      <section className="py-20 lg:py-28">
        <div className="container-shop grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="eyebrow">Our promise</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-brand-black tracking-tightest leading-tight">
              Good clothes, made responsibly.
            </h2>
            <p className="mt-6 text-sm text-ink-50 leading-relaxed">
              Every Bacha Stylo piece is cut with extra room for growth, stitched to handle real
              life, and priced so parents never have to choose between quality and value.
            </p>
            <p className="mt-4 text-sm text-ink-50 leading-relaxed">
              We work directly with local makers and pay above market rate. No middlemen, no markups
              on top of markups — just well-made clothes from our studio to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Shop the collection
              </Link>
              <Link href="/contact" className="btn-outline">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-sunken">
            <Image
              src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=1400&auto=format&fit=crop&q=70"
              alt="Happy child in Bacha Stylo clothing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Value({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="group rounded-xl border border-ink-10 p-6 transition hover:border-ink-30 hover:shadow-sm">
      <div className="h-12 w-12 rounded-full bg-surface-soft flex items-center justify-center text-brand-black mb-5">
        {icon}
      </div>
      <h3 className="font-display text-lg text-brand-black tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-ink-50 leading-relaxed">{body}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl lg:text-5xl tracking-tightest">{number}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">{label}</p>
    </div>
  );
}
