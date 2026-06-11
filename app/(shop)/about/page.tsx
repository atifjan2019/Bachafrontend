import Link from "next/link";
import type { Metadata } from "next";
import { getSettings } from "@/lib/api/settings";
import {
  ArrowUpRight,
  Crown,
  ClipboardList,
  Megaphone,
  Headphones,
  Palette,
  CheckCircle2,
  Tag,
  Gem,
  ShieldCheck,
  Landmark,
  Repeat,
  Quote,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Foundation & Vision — Bacha Stylo",
  description:
    "The people, vision, and values behind Bacha Stylo — a trusted Pakistani fashion and lifestyle brand rooted in quality, honesty, and modern elegance.",
};

const TEAM_ROLES = [
  { icon: Crown, title: "Founder / CEO", desc: "Vision & leadership" },
  { icon: ClipboardList, title: "Operations Manager", desc: "Fulfilment & logistics" },
  { icon: Megaphone, title: "Marketing Manager", desc: "Growth & brand reach" },
  { icon: Headphones, title: "Customer Support Lead", desc: "Care & after-sales" },
  { icon: Palette, title: "Creative / Brand Director", desc: "Design & identity" },
];

const MISSION = [
  "Deliver high-quality fashion, fragrances, beauty care, and lifestyle products at fair prices.",
  "Build trust through honest and transparent business practices.",
  "Make traditional and modern lifestyle products accessible to all.",
  "Represent Pakistani culture with elegance and professionalism.",
  "Ensure consistent customer satisfaction through service and quality.",
];

const VALUES = [
  { icon: Tag, title: "Honest Pricing", desc: "Fair prices with no inflated margins or misleading offers." },
  { icon: Gem, title: "Quality Craftsmanship", desc: "Carefully selected materials and refined finishing on every piece." },
  { icon: ShieldCheck, title: "Customer Trust", desc: "Transparent service that puts our customers first, always." },
  { icon: Landmark, title: "Cultural Authenticity", desc: "Pakistani heritage represented with elegance and pride." },
  { icon: Repeat, title: "Consistent Service", desc: "Dependable quality and support, order after order." },
];

export default async function AboutPage() {
  const settings = await getSettings().catch(() => null);
  const waNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, "");
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "/contact";

  return (
    <div className="flex flex-col bg-white">
      {/* ─── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-24 text-white sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.28)_0%,transparent_55%)]" />
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

        <div className="container-shop relative max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-brand-red" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
              Foundation &amp; Vision
            </span>
          </div>
          <h1 className="font-display font-bold tracking-tightest leading-[0.96] text-[clamp(2.25rem,6.5vw,5.5rem)] text-white">
            The people behind{" "}
            <span className="italic text-brand-red">Bacha Stylo.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            A dedicated team working with passion to build a trusted Pakistani fashion brand
            rooted in quality, honesty, and modern elegance.
          </p>
        </div>
      </section>

      {/* ─── 2. TEAM STRUCTURE ────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="container-shop">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Our Team
              </span>
              <span className="h-[2px] w-8 bg-brand-red" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tightest text-brand-black sm:text-5xl">
              Our Team Structure
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-70 sm:text-lg">
              Meet the people who manage, design, and deliver the Bacha Stylo experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {TEAM_ROLES.map((role) => (
              <div
                key={role.title}
                className="group overflow-hidden border border-ink-10 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(20,20,20,0.4)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-black via-brand-black-soft to-[#241015]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,29,37,0.22)_0%,transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <role.icon
                      className="h-12 w-12 text-white/25 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.25}
                    />
                  </div>
                  <div className="absolute left-0 top-0 h-0.5 w-0 bg-brand-red transition-all duration-500 group-hover:w-full" />
                </div>
                <div className="p-4 text-center sm:p-5">
                  <h3 className="font-display text-base font-bold leading-tight text-brand-black sm:text-lg">
                    {role.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-red">
                    {role.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. FOUNDER ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-5 py-20 sm:py-24 lg:py-32">
        <div className="container-shop grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_25%,rgba(232,29,37,0.25)_0%,transparent_60%)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[7rem] font-bold leading-none text-white/10">
                MA
              </span>
            </div>
            <div className="absolute -left-3 -top-3 h-14 w-14 border-l-2 border-t-2 border-brand-red sm:-left-4 sm:-top-4 sm:h-20 sm:w-20" />
            <div className="absolute -bottom-3 -right-3 h-14 w-14 border-b-2 border-r-2 border-brand-red sm:-bottom-4 sm:-right-4 sm:h-20 sm:w-20" />
          </div>

          {/* Bio */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Founder &amp; CEO
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tightest text-brand-black sm:text-4xl lg:text-5xl">
              Muhammad Ali Shah Bacha
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-70 sm:text-lg">
              <p>
                Muhammad Ali Shah Bacha is the founder of Bacha Stylo Fashion, a fashion and
                lifestyle brand built on years of practical experience and market understanding.
                With over 11 years of involvement in the fashion and lifestyle industry, he has
                focused on continuous research, product selection, and learning from real market
                conditions to develop a strong sense of customer needs and trends.
              </p>
              <p>
                His journey began at a very small level with limited resources, but through
                consistency, honesty, and customer satisfaction, he gradually built trust in the
                market — which became the foundation of the brand&apos;s growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4 & 5. VISION + MISSION ──────────────────────────── */}
      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="container-shop grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Vision */}
          <div className="border border-ink-10 p-8 sm:p-10 lg:p-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Our Vision
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tightest text-brand-black sm:text-4xl">
              Our Vision
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-70 sm:text-lg">
              To become a trusted Pakistani lifestyle brand that makes traditional fashion and
              lifestyle products accessible, authentic, and affordable for everyone — without
              compromising on quality or trust.
            </p>
          </div>

          {/* Mission */}
          <div className="border border-ink-10 p-8 sm:p-10 lg:p-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Our Mission
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tightest text-brand-black sm:text-4xl">
              Our Mission
            </h2>
            <ul className="mt-6 space-y-3.5">
              {MISSION.map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm leading-relaxed text-ink-70 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" strokeWidth={2} />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. BRAND PROMISE ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.2)_0%,transparent_60%)]" />
        <div className="container-shop relative mx-auto max-w-3xl text-center">
          <Quote className="mx-auto mb-6 h-10 w-10 text-brand-red" strokeWidth={1.5} />
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
            Our Brand Promise
          </p>
          <p className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            We believe fashion should never be misleading or overpriced. Our promise is simple:{" "}
            <span className="italic text-brand-red">quality, honesty, and value</span> in every
            product.
          </p>
        </div>
      </section>

      {/* ─── 7. OUR STORY ─────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="container-shop grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Heritage visual */}
          <div className="relative order-2 aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:order-1 lg:aspect-[4/5]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,29,37,0.22)_0%,transparent_60%)]" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-[5rem] font-bold leading-none text-white/[0.07] sm:text-[7rem]">
                BS
              </span>
            </div>
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-brand-red px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-red-glow-lg">
              <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} /> Lower Dir, KPK
            </div>
          </div>

          {/* Story copy */}
          <div className="order-1 lg:order-2">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Our Story
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tightest text-brand-black sm:text-4xl lg:text-5xl">
              Rooted in tradition,{" "}
              <span className="italic text-brand-red">built on trust.</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-70 sm:text-lg">
              <p>
                Bacha Stylo started from Lower Dir, KPK with a simple vision — to create a trusted
                fashion identity rooted in tradition, honesty, and quality.
              </p>
              <p>
                What began with traditional wear has now grown into a broader lifestyle brand
                offering clothes, waistcoats, Chitrali pakols, caps, shawls, fragrances, footwear,
                and personal care products. Every product reflects our belief in authenticity, fair
                pricing, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. VALUES ────────────────────────────────────────── */}
      <section className="bg-ink-5 py-20 sm:py-24 lg:py-32">
        <div className="container-shop">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-[2px] w-8 bg-brand-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
                Our Values
              </span>
              <span className="h-[2px] w-8 bg-brand-red" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tightest text-brand-black sm:text-5xl">
              What we stand for
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group relative border border-ink-10 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(20,20,20,0.35)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-brand-red/60 text-brand-red transition-colors duration-500 group-hover:bg-brand-red group-hover:text-white">
                  <v.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="absolute right-5 top-5 font-display text-sm italic text-ink-30">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-bold leading-tight text-brand-black">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. CLOSING CTA ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-black py-20 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,29,37,0.22)_0%,transparent_60%)]" />
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

        <div className="container-shop relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tightest sm:text-5xl lg:text-6xl">
            Experience the{" "}
            <span className="italic text-brand-red">Bacha Stylo</span> standard.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Explore our collections and discover fashion built on trust, tradition, and quality.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/products"
              className="group inline-flex w-full items-center justify-center gap-3 bg-brand-red px-8 py-5 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-brand-black sm:w-auto"
            >
              Shop Collection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
            </Link>
            <a
              href={waHref}
              {...(waNumber ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex w-full items-center justify-center gap-3 border-2 border-white/40 px-8 py-5 text-[13px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-brand-red hover:text-brand-red sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
    </svg>
  );
}
