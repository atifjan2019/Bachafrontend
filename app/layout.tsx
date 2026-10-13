import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ToastProvider } from "@/components/ui/toast";
import { MobileNav } from "@/components/layout/MobileNav";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { AuthHydrator } from "@/components/layout/AuthHydrator";
import { AbandonedCartTracker } from "@/components/cart/AbandonedCartTracker";
import { Tracking } from "@/components/analytics/Tracking";

// Montserrat powers the entire site (body + display headings).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Cache rendered pages for 5 minutes (ISR) instead of rendering every request.
// Storefront content (settings, categories, catalog) is non-personalized and
// changes rarely; admin edits still appear within the window.
export const revalidate = 0;

import { getSettings, type Settings } from "@/lib/api/settings";
import { getCategories } from "@/lib/api/categories";
import { resolveWhatsApp } from "@/lib/constants/social";
import { siteOrigin, robotsFromSetting, validGaId, validPixelId } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch((): Settings => ({} as Settings));
  const verification = settings.google_site_verification?.trim();
  return {
    title: {
      default:
        settings.meta_title ||
        "Bacha Stylo | Premium Pakistani Fashion & Lifestyle",
      template: `%s | ${settings.business_name || "Bacha Stylo"}`,
    },
    description:
      settings.meta_description ||
      "Premium Pakistani fashion and lifestyle — traditional wear, waistcoats, Chitrali pakol caps, shawls, fragrances, footwear, and refined accessories. Nationwide delivery, Cash on Delivery, JazzCash and Easypaisa.",
    metadataBase: new URL(siteOrigin(settings)),
    // A relative canonical resolves against each route's own URL, so every
    // page gets its exact canonical from this one place. Pages that set their
    // own (blog posts with a canonical_url) still override it.
    alternates: { canonical: "./" },
    ...(robotsFromSetting(settings.robots_meta) ? { robots: robotsFromSetting(settings.robots_meta) } : {}),
    ...(verification ? { verification: { google: verification } } : {}),
    other: {
      simpledcver:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkb21haW4iOiJiYWNoYXN0eWxvLmNvbSIsImV4cCI6MTc4Mjk1MDQwMH0.ygBW6WTYwg99HAxQFiM5JF5iYuDk5pjyPuxKg_gv80s",
    },
    icons: {
      icon: settings.favicon_url || "/images/BachaStylo%20favicon.png",
      shortcut: settings.favicon_url || "/images/BachaStylo%20favicon.png",
      apple: settings.favicon_url || "/images/BachaStylo%20favicon.png",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch((): Settings => ({} as Settings));
  const categories = await getCategories().catch(() => []);

  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col" cz-shortcut-listen="true">
        <Tracking
          gaId={validGaId(settings?.google_analytics_id)}
          pixelId={validPixelId(settings?.facebook_pixel_id)}
        />
        <ToastProvider>
          <AuthHydrator />
          <AbandonedCartTracker />
          <AnnouncementBar threshold={settings?.free_shipping_threshold} />
          <Header logoUrl={settings?.logo_url} categories={categories} />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <FloatingWhatsApp phone={resolveWhatsApp(settings?.whatsapp_number).number} />
        </ToastProvider>
      </body>
    </html>
  );
}
