import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { SocialLinks } from "@/components/common/SocialLinks";
import { ArrowUpRight, Heart, Mail, Phone } from "lucide-react";
import { getSettings, type Settings } from "@/lib/api/settings";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants/contact";
import { resolveWhatsApp } from "@/lib/constants/social";

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
          <div className="mt-7">
            <SocialLinks
              tone="onDark"
              size="md"
              overrides={{
                facebook: settings?.facebook_url,
                instagram: settings?.instagram_url,
                tiktok: settings?.tiktok_url,
                whatsapp: settings?.whatsapp_number
                  ? `https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, "")}`
                  : undefined,
              }}
            />
          </div>

          {/* Contact */}
          <div className="mt-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
              Get in touch
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group flex items-center gap-3 text-white/70 transition-colors hover:text-brand-red"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-red" strokeWidth={2} />
                {SUPPORT_EMAIL}
              </a>
              <a
                href={resolveWhatsApp(SUPPORT_PHONE).href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-white/70 transition-colors hover:text-brand-red"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-red" strokeWidth={2} />
                {SUPPORT_PHONE}
                <span className="text-white/40">· Call &amp; WhatsApp</span>
              </a>
            </div>
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
