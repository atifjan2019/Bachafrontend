import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { Facebook, Instagram, ArrowUpRight, Heart } from "lucide-react";
import { getSettings, type Settings } from "@/lib/api/settings";

const FOOTER_ABOUT =
  "Bacha Stylo is a premium Pakistani fashion and lifestyle brand offering traditional wear, fragrances, footwear, accessories, and everyday essentials designed with elegance, simplicity, and authenticity.";

export async function Footer() {
  const settings = await getSettings().catch((): Settings => ({}) as Settings);

  return (
    <footer className="relative overflow-hidden bg-brand-black pb-20 text-white lg:pb-0">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,29,37,0.18)_0%,transparent_55%)]" />
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      {/* Divider */}
      <div className="container-shop relative">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Links */}
      <div className="container-shop relative grid grid-cols-2 gap-8 py-14 sm:gap-10 lg:grid-cols-5 lg:gap-12 lg:py-20">
        <div className="col-span-2 lg:col-span-2">
          <div className="mb-6 inline-block">
            <BrandMark
              size="lg"
              logoUrl={(settings?.footer_logo_url || settings?.logo_url) as string | undefined}
              className="max-h-[100px]"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            {settings?.footer_about || FOOTER_ABOUT}
          </p>
          <div className="mt-7 flex items-center gap-3">
            {settings?.instagram_url && (
              <SocialIcon label="Instagram" href={settings.instagram_url}>
                <Instagram className="h-4 w-4" strokeWidth={2} />
              </SocialIcon>
            )}
            {settings?.facebook_url && (
              <SocialIcon label="Facebook" href={settings.facebook_url}>
                <Facebook className="h-4 w-4" strokeWidth={2} />
              </SocialIcon>
            )}
            {settings?.tiktok_url && (
              <SocialIcon label="TikTok" href={settings.tiktok_url}>
                <TikTokIcon className="h-4 w-4" />
              </SocialIcon>
            )}
          </div>
        </div>

        <FooterColumn
          title="Explore"
          links={[
            { href: "/products", label: "All products" },
            { href: "/about", label: "About us" },
            { href: "/blogs", label: "Journal" },
            { href: "/account", label: "My account" },
          ]}
        />
        <FooterColumn
          title="Customer Care"
          links={[
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "Shipping & Delivery" },
            { href: "/refund", label: "Returns & Exchanges" },
            { href: "/contact", label: "Contact Us" },
          ]}
        />
        <FooterColumn
          title="Legal"
          links={[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms & Conditions" },
          ]}
        />
      </div>

      
      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black">
        {/* Right padding keeps content clear of the fixed WhatsApp button (bottom-right). */}
        <div className="container-shop flex flex-col items-center justify-between gap-3 py-6 pr-16 text-xs text-white/50 sm:flex-row sm:pr-20 lg:pr-24">
          <p>&copy; {new Date().getFullYear()} Bacha Stylo. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-white/40">
            Made with
            <Heart className="h-3.5 w-3.5 fill-brand-red text-brand-red" aria-hidden="true" />
            by
            <a
              href="https://www.webspires.com.pk?utm_source=bachastylo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 transition-colors hover:text-brand-red"
            >
              Webspires
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-all hover:border-brand-red hover:bg-brand-red hover:text-white"
    >
      {children}
    </a>
  );
}

/** TikTok glyph — lucide has no TikTok icon, so use a minimal inline SVG. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.5 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.81a5.79 5.79 0 0 0-.78-.06 5.8 5.8 0 1 0 5.8 5.8V9.01a7.3 7.3 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.31-1.48z" />
    </svg>
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
      <div className="mb-5 flex items-center gap-2">
        <span className="h-[2px] w-5 bg-brand-red" />
        <h4 className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
          {title}
        </h4>
      </div>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-brand-red"
            >
              {l.label}
              <ArrowUpRight
                className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                strokeWidth={2.5}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
