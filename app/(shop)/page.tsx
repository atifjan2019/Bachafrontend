import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories } from "@/lib/api/categories";
import { getFeatured } from "@/lib/api/products";
import { Truck, ShieldCheck, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";

export const revalidate = 300;

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
                    src={c.image}
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
          <div className="order-1 lg:order-2">
            <span className="eyebrow">Designed in Pakistan</span>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl text-brand-black tracking-tightest leading-[1.02]">
              Small batch.
              <br />
              Built to last.
            </h2>
            <p className="mt-6 text-base text-ink-50 leading-relaxed max-w-lg">
              We work with a tight circle of local makers to produce in small runs. That means better
              quality control, less waste, and pieces that hold up through everything kids throw at them.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-70">
              <li className="flex gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-black mt-2 shrink-0" />
                Soft, pre-washed cottons and breathable fabrics
              </li>
              <li className="flex gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-black mt-2 shrink-0" />
                Reinforced seams and generous fit for growing bodies
              </li>
              <li className="flex gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-black mt-2 shrink-0" />
                OEKO-TEX certified dyes, safe on sensitive skin
              </li>
            </ul>
            <Link href="/about" className="btn-outline mt-10">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 border-t border-ink-10">
        <div className="container-shop grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          <ValueProp
            title="Free shipping"
            sub="On orders over Rs. 5,000"
            icon={<Truck className="h-5 w-5" />}
          />
          <ValueProp
            title="Easy returns"
            sub="14 days, no questions asked"
            icon={<RefreshCw className="h-5 w-5" />}
          />
          <ValueProp
            title="Secure checkout"
            sub="COD, JazzCash & Easypaisa"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <ValueProp
            title="New arrivals weekly"
            sub="Fresh styles every Thursday"
            icon={<Sparkles className="h-5 w-5" />}
          />
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
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-full bg-surface-soft flex items-center justify-center text-brand-black shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-brand-black">{title}</p>
        <p className="text-xs text-ink-50 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
