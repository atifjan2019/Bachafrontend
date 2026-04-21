import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories } from "@/lib/api/categories";
import { getFeatured } from "@/lib/api/products";
import { Truck, ShieldCheck, RefreshCw, Sparkles, ArrowRight, Leaf, Scissors, Heart } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";

export const revalidate = 0;

export default async function HomePage() {
  const [categories, featured] = await Promise.all([getCategories(), getFeatured(8)]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageHero
        eyebrow="New season 2026"
        title="Modern clothing, made for small humans."
        subtitle="Soft, durable, and thoughtfully designed pieces for kids who live full days."
        variant="dark"
        align="center"
        size="lg"
      />

      {/* Marquee strip */}
      <div className="border-y border-ink-10 bg-white overflow-hidden">
        <div className="container-shop py-4">
          <div className="flex items-center justify-between gap-8 overflow-x-auto no-scrollbar text-xs uppercase tracking-[0.22em] text-ink-50 whitespace-nowrap">
            <span>New arrivals</span>
            <span>·</span>
            <span>Everyday essentials</span>
            <span>·</span>
            <span>Festive edit</span>
            <span>·</span>
            <span>Gift ready</span>
            <span>·</span>
            <span>Up to 30% off</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-20 lg:py-28">
        <div className="container-shop">
          <div className="flex items-end justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="Shop by edit"
              title="Find their next favourite"
              subtitle="Thoughtfully merchandised collections — whether you're after everyday basics or something for a big moment."
            />
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-70 hover:text-brand-black shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-sunken">
                  <Image
                    src={c.image || "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=70"}
                    alt={c.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-brand-black">{c.name}</h3>
                  <span className="text-xs text-ink-50 group-hover:text-brand-black transition">
                    Shop →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 lg:py-20 bg-surface-soft">
        <div className="container-shop">
          <div className="flex items-end justify-between gap-6 mb-10">
            <SectionHeading
              eyebrow="Best sellers"
              title="What everyone's wearing"
              subtitle="Our most-loved pieces, restocked regularly."
            />
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-ink-70 hover:text-brand-black shrink-0"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Link href="/products" className="btn-outline">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="py-20 lg:py-28">
        <div className="container-shop grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-sunken order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1400&auto=format&fit=crop&q=70"
              alt="Behind the design"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center text-left items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-soft border border-ink-10 w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-black opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-black"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-black">Designed in Pakistan</span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl text-brand-black tracking-tightest leading-[1.02] mb-6">
              Small batch.
              <br />
              <span className="text-ink-50">Built to last.</span>
            </h2>

            <p className="text-base lg:text-lg text-ink-70 leading-relaxed max-w-lg mb-8">
              We work with a tight circle of local makers to produce in small runs. That means better
              quality control, less waste, and pieces that hold up through everything kids throw at them.
            </p>

            <div className="grid gap-3 mb-10 w-full">
              {[
                { icon: Leaf, title: 'Premium Fabrics', desc: 'Soft, pre-washed cottons and breathable materials.' },
                { icon: Scissors, title: 'Smart Tailoring', desc: 'Reinforced seams and generous fit for growing bodies.' },
                { icon: Heart, title: 'Safe & Gentle', desc: 'OEKO-TEX certified dyes, safe on sensitive skin.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-ink-10 hover:bg-surface-soft transition-all duration-300 group">
                  <div className="h-12 w-12 rounded-full bg-surface-sunken flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-5 w-5 text-brand-black" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-brand-black mb-1">{item.title}</h4>
                    <p className="text-sm text-ink-50 leading-relaxed max-w-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 bg-brand-black text-white hover:bg-black hover:shadow-md hover:-translate-y-0.5 rounded-full group">
                Discover our process
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-12 lg:py-16 border-t border-ink-10 relative bg-surface-soft overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="container-shop relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <ValueProp
              title="Free shipping"
              sub="On orders over Rs. 5,000"
              icon={<Truck className="h-5 w-5 transition-transform group-hover:scale-110 duration-500" />}
            />
            <ValueProp
              title="Easy returns"
              sub="14 days, no questions asked"
              icon={<RefreshCw className="h-5 w-5 transition-transform group-hover:scale-110 duration-500" />}
            />
            <ValueProp
              title="Secure checkout"
              sub="COD, JazzCash & Easypaisa"
              icon={<ShieldCheck className="h-5 w-5 transition-transform group-hover:scale-110 duration-500" />}
            />
            <ValueProp
              title="New arrivals weekly"
              sub="Fresh styles every Thursday"
              icon={<Sparkles className="h-5 w-5 transition-transform group-hover:scale-110 duration-500" />}
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
    <div className="group flex flex-col items-start text-left p-5 rounded-2xl border border-ink-10 bg-white hover:bg-brand-black hover:-translate-y-1 transition-all duration-500 hover:shadow-lg hover:border-transparent">
      <div className="h-10 w-10 rounded-xl bg-surface-soft text-brand-black flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:text-white group-hover:-rotate-6 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-brand-black group-hover:text-white transition-colors duration-500 mb-1">{title}</h3>
      <p className="text-xs text-ink-50 group-hover:text-ink-10 transition-colors duration-500 leading-relaxed max-w-[160px] lg:max-w-none">{sub}</p>
    </div>
  );
}
