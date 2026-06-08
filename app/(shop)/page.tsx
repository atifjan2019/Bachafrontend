import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories } from "@/lib/api/categories";
import { getFeatured } from "@/lib/api/products";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Scissors,
  Heart,
} from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeatured(8)]);

  return (
    <div className="flex flex-col bg-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <HeroSlider />

      {/* ─── MARQUEE ──────────────────────────────────────────── */}
      <section className="relative bg-brand-red text-white overflow-hidden py-2 sm:py-4 border-y-2 border-brand-black">
        <div className="flex animate-marquee whitespace-nowrap gap-8 sm:gap-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-12 px-4 sm:px-6">
              <span className="font-display text-sm  md:text-xl  font-black uppercase tracking-tight">
                New Arrivals
              </span>
              <span className="text-lg ">✦</span>
              <span className="font-display text-sm  md:text-xl  font-black uppercase tracking-tight">
                Limited Drops
              </span>
              <span className="text-lg ">✦</span>
              <span className="font-display text-sm  md:text-xl  font-black uppercase tracking-tight">
                Free Shipping
              </span>
              <span className="text-lg ">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white relative">
        <div className="container-shop">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            <SectionHeading
              eyebrow="Shop by Edit"
              title="Find their next favourite."
              subtitle="Curated collections for every mood, moment, and milestone."
            />
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-[0.2em] hover:gap-3 transition-all shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {categories.slice(0, 4).map((c, idx) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative block overflow-hidden bg-brand-black"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={
                      c.image ||
                      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={c.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-90" />
                  {/* Red line */}
                  <div className="absolute top-0 left-0 h-[3px] w-0 bg-brand-red transition-all duration-500 group-hover:w-full" />
                </div>

                {/* Category content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-brand-red font-bold">
                      0{idx + 1}
                    </span>
                    <span className="h-[1px] w-6 bg-brand-red" />
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {c.name}
                  </h3>
                  <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/80 font-semibold group-hover:text-brand-red transition-colors">
                    Explore <ArrowUpRight className="h-3 sm:h-3.5 w-3 sm:w-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-32 bg-ink-5 relative noise-overlay">
        <div className="container-shop relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            <SectionHeading
              eyebrow="Bestsellers"
              title="What everyone's wearing."
              subtitle="Our most-loved pieces — restocked regularly, loved universally."
            />
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-[0.2em] hover:gap-3 transition-all shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 sm:mt-14 text-center sm:hidden">
            <Link href="/products" className="btn-outline">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL / MANIFESTO ─────────────────────────────── */}
      <section className="relative bg-brand-black text-white overflow-hidden py-16 sm:py-24 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_right,rgba(232,29,37,0.2)_0%,transparent_60%)]" />

        <div className="container-shop relative grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 max-w-lg mx-auto lg:mx-0 w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1400&auto=format&fit=crop&q=80"
                alt="Behind the craft"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-red/20" />
            </div>
            <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-14 sm:w-20 h-14 sm:h-20 border-t-2 border-l-2 border-brand-red" />
            <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-14 sm:w-20 h-14 sm:h-20 border-b-2 border-r-2 border-brand-red" />
            <div className="absolute top-4 sm:top-6 -right-3 sm:-right-6 bg-brand-red text-white px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-bold shadow-red-glow-lg">
              Made with love
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="h-[2px] w-8 sm:w-10 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-brand-red font-bold">
                The Craft
              </span>
            </div>

            <h2 className="font-display font-bold tracking-tightest leading-[0.98] text-4xl sm:text-5xl lg:text-6xl">
              Small batch.
              <br />
              <span className="italic text-brand-red">Built</span> to last.
            </h2>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
              We partner with a tight circle of local makers to produce in small runs. Better quality
              control, less waste, pieces that hold up to anything little ones throw at them.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
              {[
                { icon: Leaf, title: "Premium Fabrics", desc: "Pre-washed cottons, breathable, buttery-soft." },
                { icon: Scissors, title: "Smart Tailoring", desc: "Reinforced seams, generous room to grow." },
                { icon: Heart, title: "Safe & Gentle", desc: "OEKO-TEX certified dyes — skin-first." },
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-4 sm:gap-5 pb-4 sm:pb-5 border-b border-white/10 hover:border-brand-red transition-colors">
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-brand-red flex items-center justify-center group-hover:bg-brand-red transition-colors">
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-brand-red group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <span className="absolute -top-2 -left-2 text-[10px] font-bold text-brand-red">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                href="/about"
                className="group relative inline-flex items-center gap-3 bg-brand-red text-white px-6 sm:px-8 py-4 sm:py-5 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] transition-all duration-500 hover:bg-white hover:text-brand-black"
              >
                Discover our process
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS ──────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-ink-10">
        <div className="container-shop">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-ink-10 [&>*]:border-ink-10 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(2)]:border-l [&>*:nth-child(4)]:border-l lg:[&>*:nth-child(n+3)]:border-t-0 lg:[&>*:not(:first-child)]:border-l">
            <ValueProp
              title="Free Shipping"
              sub="On orders over Rs. 5,000"
              icon={<Truck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />}
            />
            <ValueProp
              title="Easy Returns"
              sub="14 days, no questions"
              icon={<RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />}
            />
            <ValueProp
              title="Secure Checkout"
              sub="COD · JazzCash · Easypaisa"
              icon={<ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />}
            />
            <ValueProp
              title="New Weekly"
              sub="Fresh drops every Thursday"
              icon={<Sparkles className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueProp({
  title,
  sub,
  icon,
}: {
  title: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative p-5 sm:p-7 lg:p-10 bg-white transition-all duration-500 hover:bg-brand-black overflow-hidden">
      <div className="absolute inset-0 bg-brand-red -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      <div className="relative z-10">
        <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center bg-brand-red/10 text-brand-red group-hover:bg-white group-hover:text-brand-red transition-colors duration-500 mb-4 sm:mb-5">
          {icon}
        </div>
        <h3 className="text-sm sm:text-base font-bold text-brand-black group-hover:text-white transition-colors duration-500 mb-1 sm:mb-1.5 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-50 group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
          {sub}
        </p>
      </div>
    </div>
  );
}
