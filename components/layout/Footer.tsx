import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { Facebook, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { getSettings, type Settings } from "@/lib/api/settings";

export async function Footer() {
  const settings = await getSettings().catch((): Settings => ({} as Settings));

  return (
    <footer className="relative bg-brand-black text-white pb-20 lg:pb-0 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.18)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      {/* Huge brand display */}
      <div className="container-shop relative pt-14 sm:pt-20 lg:pt-28 pb-8 sm:pb-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 sm:gap-10">
          <div className="max-w-xl w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 sm:w-10 bg-brand-red" />
              <span className="text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-brand-red font-bold">
                Join the Family
              </span>
            </div>
            <h3 className="font-display font-bold tracking-tightest leading-[0.98] text-3xl sm:text-4xl lg:text-6xl">
              Stay in the loop.
              <br />
              <span className="italic text-brand-red">Never miss</span> a drop.
            </h3>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-white/60 leading-relaxed max-w-md">
              Subscribe for first access to new arrivals, exclusive deals, and stories from our studio.
            </p>
          </div>

          <form className="w-full lg:w-[420px]">
            <div className="flex border-2 border-white/20 focus-within:border-brand-red transition-colors">
              <div className="pl-3 sm:pl-4 flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white/50" strokeWidth={2} />
              </div>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-3 sm:py-4 text-white placeholder:text-white/40 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-brand-red hover:bg-white hover:text-brand-black text-white px-4 sm:px-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all whitespace-nowrap"
              >
                Subscribe <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-3 text-[11px] text-white/40">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="container-shop relative">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Links */}
      <div className="container-shop relative grid gap-8 sm:gap-10 lg:gap-12 grid-cols-2 lg:grid-cols-5 py-12 sm:py-16">
        <div className="col-span-2 lg:col-span-2">
          <div className="bg-white p-3 inline-block mb-5">
            <BrandMark size="lg" logoUrl={settings?.logo_url as string | undefined} />
          </div>
          <p className="text-sm text-white/60 max-w-xs leading-relaxed">
            Modern, comfortable kids' clothing designed to keep up with every adventure.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {settings?.instagram_url && (
              <a
                aria-label="Instagram"
                href={settings.instagram_url}
                className="group h-10 w-10 border border-white/20 hover:bg-brand-red hover:border-brand-red flex items-center justify-center transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4 text-white/70 group-hover:text-white" strokeWidth={2} />
              </a>
            )}
            {settings?.facebook_url && (
              <a
                aria-label="Facebook"
                href={settings.facebook_url}
                className="group h-10 w-10 border border-white/20 hover:bg-brand-red hover:border-brand-red flex items-center justify-center transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4 text-white/70 group-hover:text-white" strokeWidth={2} />
              </a>
            )}
          </div>
        </div>

        <FooterColumn
          title="Shop"
          links={[
            { href: "/products", label: "All products" },
            { href: "/category/boys", label: "Boys" },
            { href: "/category/girls", label: "Girls" },
            { href: "/category/new-arrivals", label: "New arrivals" },
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { href: "/about", label: "About" },
            { href: "/blogs", label: "Journal" },
            { href: "/contact", label: "Contact" },
            { href: "/account", label: "Account" },
          ]}
        />
        <FooterColumn
          title="Help"
          links={[
            { href: "/contact", label: "Shipping & returns" },
            { href: "/contact", label: "Size guide" },
            { href: "/contact", label: "Care guide" },
            { href: "/contact", label: "FAQ" },
          ]}
        />
      </div>

      {/* Giant brand text */}
      <div className="relative overflow-hidden border-t border-white/10">
        <div className="container-shop py-10 lg:py-14">
          <p className="font-display font-black tracking-tightest leading-none text-center text-[clamp(3.5rem,15vw,13rem)] text-transparent bg-clip-text bg-gradient-to-b from-white/15 to-transparent select-none">
            BACHA STYLO
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black">
        <div className="container-shop flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Bacha Stylo. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-red transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-red transition-colors">
              Terms
            </Link>
            <Link href="/refund" className="hover:text-brand-red transition-colors">
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <span className="h-[2px] w-5 bg-brand-red" />
        <h4 className="text-[11px] uppercase tracking-[0.28em] text-brand-red font-bold">
          {title}
        </h4>
      </div>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-white/70 hover:text-brand-red transition-colors"
            >
              {l.label}
              <ArrowUpRight
                className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                strokeWidth={2.5}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
