import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories } from "@/lib/api/categories";
import { getFeatured, getBestSellers } from "@/lib/api/products";
import { getSettings, type Settings } from "@/lib/api/settings";
import { formatPKR } from "@/lib/utils/format";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/common/SocialIcons";
import { SOCIAL_ACCOUNTS, resolveWhatsApp } from "@/lib/constants/social";
import {
  Truck,
  Banknote,
  MessageCircle,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Gem,
  Scissors,
  Feather,
} from "lucide-react";

export const revalidate = 0;

// Short editorial taglines for spotlighted collections, keyed by category slug.
// Falls back to DEFAULT_TAGLINE for any slug not listed here.
const COLLECTION_TAGLINES: Record<string, string> = {
  "traditional-wear": "Timeless silhouettes, tailored for every occasion.",
  "premium-waistcoats": "Tailored waistcoats and refined occasion wear.",
  "chitrali-pakol": "Handcrafted caps rooted in northern heritage.",
  shawls: "Elegant drapes woven with warmth and grace.",
  clothes: "Refined everyday essentials for the modern wardrobe.",
  "peshawari-chappal": "Handmade leather footwear, built to last.",
  "luxury-fragrances": "Signature scents for a lasting impression.",
  accessories: "Finishing touches that define the look.",
  "beauty-care": "Premium grooming and care, thoughtfully curated.",
};
const DEFAULT_TAGLINE = "A curated edit of premium essentials.";

// Rotating editorial labels for best-selling products.
const BESTSELLER_LABELS = [
  "Trending Now",
  "Limited Edition",
  "Customer Favourite",
  "New Arrival",
];

// Trust badges shown in the "Why customers trust Bacha Stylo" section.
const TRUST_POINTS = [
  { icon: Truck, title: "Nationwide Delivery" },
  { icon: Banknote, title: "Cash on Delivery" },
  { icon: MessageCircle, title: "WhatsApp Support" },
  { icon: Sparkles, title: "New Weekly Arrivals" },
  { icon: BadgeCheck, title: "Carefully Curated" },
];

export default async function HomePage() {
  const [categories, featuredProducts, bestSellers, settings] = await Promise.all([
    getCategories(),
    getFeatured(3),
    getBestSellers(8),
    getSettings().catch(() => ({}) as Settings),
  ]);

  // Heritage visual for the Traditional Collection highlight — a real category
  // image when available, otherwise a branded gradient panel.
  const heritageCategory =
    categories.find((c) => /tradition|heritage|waistcoat|shawl/i.test(c.slug)) ?? categories[0];

  // Canonical brand accounts, with admin Settings overriding the URL when set.
  const socials = [
    {
      name: "Instagram",
      handle: SOCIAL_ACCOUNTS.instagram.handle,
      href: settings.instagram_url || SOCIAL_ACCOUNTS.instagram.href,
      icon: InstagramIcon,
    },
    {
      name: "Facebook",
      handle: SOCIAL_ACCOUNTS.facebook.handle,
      href: settings.facebook_url || SOCIAL_ACCOUNTS.facebook.href,
      icon: FacebookIcon,
    },
    {
      name: "TikTok",
      handle: SOCIAL_ACCOUNTS.tiktok.handle,
      href: settings.tiktok_url || SOCIAL_ACCOUNTS.tiktok.href,
      icon: TikTokIcon,
    },
    {
      name: "WhatsApp",
      handle: SOCIAL_ACCOUNTS.whatsapp.handle,
      href: resolveWhatsApp(settings.whatsapp_number).href,
      icon: WhatsAppIcon,
    },
  ];

  // Featured Collection spotlights: prefer admin-curated featured products
  // (real product photography). If none are flagged yet, fall back to the
  // first few categories so the section still looks intentional.
  const spotlights =
    featuredProducts.length > 0
      ? featuredProducts.slice(0, 3).map((p) => ({
          href: `/products/${p.slug}`,
          image: p.images[0]?.url,
          eyebrow: p.category.name,
          title: p.name,
          subtitle: formatPKR(p.sale_price ?? p.price),
        }))
      : categories.slice(0, 3).map((c) => ({
          href: `/category/${c.slug}`,
          image: c.image || undefined,
          eyebrow: "Collection",
          title: c.name,
          subtitle: COLLECTION_TAGLINES[c.slug] ?? DEFAULT_TAGLINE,
        }));

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
              eyebrow="Categories"
              title="Explore Our Collection"
              subtitle="Carefully curated pieces that blend tradition, comfort, and modern sophistication."
            />
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-[0.2em] hover:gap-3 transition-all shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-5">
            {categories.slice(0, 9).map((c, idx) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group relative block overflow-hidden bg-brand-black shadow-[0_2px_20px_-10px_rgba(20,20,20,0.25)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_35px_60px_-20px_rgba(20,20,20,0.5)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <CollectionImage
                    src={c.image}
                    alt={c.name}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    fallbackLabel={c.name}
                  />
                  {/* Gradient overlays for legibility + hover depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Inset hairline frame */}
                <div className="pointer-events-none absolute inset-3 sm:inset-4 border border-white/0 transition-colors duration-500 group-hover:border-white/25" />

                {/* Top red accent grows on hover */}
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-brand-red transition-all duration-500 ease-out group-hover:w-full" />

                {/* Glassy circular arrow */}
                <div className="absolute right-3 top-3 sm:right-5 sm:top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:border-brand-red group-hover:bg-brand-red sm:h-11 sm:w-11">
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={2}
                  />
                </div>

                {/* Category content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-7">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="font-display text-sm italic text-brand-red sm:text-base">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-8 bg-gradient-to-r from-brand-red to-transparent sm:w-10" />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-tight text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:text-2xl lg:text-[1.7rem]">
                    {c.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 group-hover:text-white sm:mt-2.5 sm:text-[11px]">
                    <span className="h-px w-4 bg-brand-red transition-all duration-500 group-hover:w-7" />
                    Shop Now
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COLLECTION ──────────────────────────────── */}
      {spotlights.length > 0 && (
        <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-20 lg:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,29,37,0.18)_0%,transparent_55%)]" />

          <div className="container-shop relative">
            <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Featured Collection"
                title="Define your signature look."
                subtitle="From formal gatherings to everyday elegance, explore collections designed to bring confidence, simplicity, and timeless style to every occasion."
                variant="dark"
              />
              <Link
                href="/products"
                className="hidden shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-red transition-all hover:gap-3 sm:inline-flex"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Editorial mosaic — one feature + two stacked spotlights */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
              {/* Feature */}
              <Link
                href={spotlights[0].href}
                className="group relative aspect-[4/5] overflow-hidden bg-brand-black-soft sm:aspect-[16/10] lg:col-span-7 lg:aspect-[4/3]"
              >
                <CollectionImage
                  src={spotlights[0].image}
                  alt={spotlights[0].title}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  fallbackLabel={spotlights[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-4 border border-white/0 transition-colors duration-500 group-hover:border-white/25 sm:inset-6" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                    {spotlights[0].eyebrow}
                  </p>
                  <h3 className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">
                    {spotlights[0].title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                    {spotlights[0].subtitle}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white">
                    Discover
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </Link>

              {/* Right stack */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2 lg:gap-6">
                {spotlights.slice(1).map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group relative aspect-[16/10] overflow-hidden bg-brand-black-soft sm:aspect-[4/5] lg:aspect-auto lg:min-h-[200px]"
                  >
                    <CollectionImage
                      src={s.image}
                      alt={s.title}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                      fallbackLabel={s.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 to-transparent" />
                    <div className="pointer-events-none absolute inset-3 border border-white/0 transition-colors duration-500 group-hover:border-white/25 sm:inset-4" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red">
                        {s.eyebrow}
                      </p>
                      <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                        {s.subtitle}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-brand-red">
                        Discover
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45"
                          strokeWidth={2.5}
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── BESTSELLERS ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-32 bg-ink-5 relative noise-overlay">
        <div className="container-shop relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            <SectionHeading
              eyebrow="Most Loved"
              title="Best Sellers"
              subtitle="Discover our most admired pieces, selected for their craftsmanship, comfort, and enduring style."
            />
            <Link href="/products" className="hidden sm:inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-[0.2em] hover:gap-3 transition-all shrink-0">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
            {bestSellers.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                label={p.label ?? BESTSELLER_LABELS[i % BESTSELLER_LABELS.length]}
              />
            ))}
          </div>

          <div className="mt-10 sm:mt-14 text-center sm:hidden">
            <Link href="/products" className="btn-outline">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CRAFT / QUALITY ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.16)_0%,transparent_60%)]" />

        <div className="container-shop relative">
          <SectionHeading
            eyebrow="Craftsmanship"
            title="Crafted with precision. Designed to last."
            subtitle="At Bacha Stylo, we collaborate with skilled local artisans to create products that reflect quality craftsmanship, refined tradition, and everyday comfort."
            variant="dark"
            align="center"
          />

          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-3">
            {[
              {
                icon: Gem,
                title: "Premium Materials",
                desc: "Hand-selected fabrics chosen for their richness, durability, and a refined finish.",
              },
              {
                icon: Scissors,
                title: "Refined Finishing",
                desc: "Meticulous stitching and detailing, completed by skilled artisan hands.",
              },
              {
                icon: Feather,
                title: "Everyday Comfort",
                desc: "Tailored for ease of movement and all-day comfort, without compromise.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative bg-brand-black p-8 transition-colors duration-500 hover:bg-brand-black-soft sm:p-10 lg:p-12"
              >
                <span className="absolute right-6 top-6 font-display text-sm italic text-white/20">
                  0{i + 1}
                </span>
                <div className="mb-6 flex h-14 w-14 items-center justify-center border border-brand-red/60 text-brand-red transition-colors duration-500 group-hover:bg-brand-red group-hover:text-white sm:h-16 sm:w-16">
                  <item.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  {item.desc}
                </p>
                <span className="mt-6 block h-px w-10 bg-brand-red transition-all duration-500 group-hover:w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST ────────────────────────────────────────────── */}
      <section className="border-t border-ink-10 bg-white py-16 sm:py-20 lg:py-28">
        <div className="container-shop">
          <SectionHeading
            eyebrow="Why Bacha Stylo"
            title="Why customers trust Bacha Stylo"
            subtitle="A premium shopping experience built on quality products, dependable service, and customer satisfaction."
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {TRUST_POINTS.map((t) => (
              <div
                key={t.title}
                className="group flex flex-col items-center gap-4 border border-ink-10 bg-white px-5 py-8 text-center transition-all duration-300 hover:border-brand-red/40 hover:shadow-[0_20px_40px_-20px_rgba(20,20,20,0.18)] sm:px-6 sm:py-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-5 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                  <t.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-black sm:text-[13px]">
                  {t.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRADITIONAL COLLECTION HIGHLIGHT ─────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(232,29,37,0.2)_0%,transparent_55%)]" />

        <div className="container-shop relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="group relative order-2 aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:order-1 lg:aspect-[4/5]">
            <CollectionImage
              src={settings.home_highlight_image || heritageCategory?.image}
              alt="Traditional Pakistani wear"
              sizes="(max-width: 1024px) 100vw, 50vw"
              fallbackLabel={heritageCategory?.name ?? "Heritage"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
            <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-brand-red" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-brand-red" />
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Heritage
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tightest sm:text-5xl lg:text-6xl">
              {settings.home_highlight_title ? (
                settings.home_highlight_title
              ) : (
                <>
                  Traditional wear with{" "}
                  <span className="italic text-brand-red">modern elegance.</span>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              {settings.home_highlight_description ||
                "Explore premium waistcoats, clothes, authentic Chitrali pakol caps, elegant shawls, fragrances, and timeless accessories inspired by Pakistani heritage."}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Waistcoats", "Chitrali Pakol", "Shawls", "Fragrances", "Accessories"].map((tag) => (
                <span
                  key={tag}
                  className="border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-9">
              <Link
                href={settings.home_highlight_link || "/products"}
                className="group inline-flex items-center gap-3 bg-brand-red px-8 py-5 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-brand-black"
              >
                {settings.home_highlight_button || "View Collection"}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:rotate-45"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL MEDIA ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="container-shop">
          <SectionHeading
            eyebrow="@bachastylo"
            title="Experience the Bacha Stylo lifestyle."
            subtitle="Follow us for new arrivals, customer reviews, styling inspiration, behind-the-scenes moments, and exclusive product highlights."
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-4">
            {socials.map((s) => (
              <SocialCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.2)_0%,transparent_60%)]" />

        <div className="container-shop relative">
          <SectionHeading
            eyebrow="Newsletter"
            title="Get seasonal access to new arrivals."
            subtitle="Join the Bacha Stylo community for exclusive launches, seasonal collections, and premium style updates."
            align="center"
            variant="dark"
          />
          <div className="mt-8 sm:mt-10">
            <NewsletterForm />
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-white/40">
            No spam — unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}

/**
 * Renders a real catalog image when available, otherwise an elegant
 * branded gradient panel — never a random stock photo. Keeps the brand
 * feeling premium and consistent even before imagery is uploaded.
 */
function CollectionImage({
  src,
  alt,
  sizes,
  fallbackLabel,
}: {
  src?: string;
  alt: string;
  sizes: string;
  fallbackLabel: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.06]"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116] transition-transform duration-[1300ms] ease-out group-hover:scale-[1.04]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,29,37,0.22)_0%,transparent_60%)]" />
      <span className="absolute inset-0 flex items-center justify-center font-display text-[5rem] font-bold leading-none text-white/[0.06] sm:text-[7rem]">
        {fallbackLabel.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function SocialCard({
  name,
  handle,
  href,
  icon: Icon,
}: {
  name: string;
  handle: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const inner = (
    <div className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br from-brand-black via-brand-black-soft to-[#241015] p-8 text-center text-white transition-transform duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.18)_0%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-brand-red transition-colors duration-500 group-hover:bg-brand-red group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <div className="relative">
        <h3 className="font-display text-xl font-bold">{name}</h3>
        {/* <p className="mt-1 text-xs text-white/60">{handle}</p> */}
      </div>
      <span className="relative mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 transition-colors group-hover:text-brand-red">
        Follow
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
