import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ToastProvider } from "@/components/ui/toast";
import { MobileNav } from "@/components/layout/MobileNav";
import { AuthHydrator } from "@/components/layout/AuthHydrator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const revalidate = 0;

import { getSettings, type Settings } from "@/lib/api/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch((): Settings => ({} as Settings));
  return {
    title: {
      default: settings.meta_title || "Bacha Stylo Fashion Home | Modern Kids' Wear in Pakistan",
      template: `%s | ${settings.business_name || 'Bacha Stylo Fashion Home'}`,
    },
    description: settings.meta_description || "Modern kids' clothing, thoughtfully designed in Pakistan. Nationwide shipping, Cash on Delivery, JazzCash and Easypaisa supported.",
    metadataBase: new URL(settings.canonical_base_url || "https://bachastylo.pk"),
    icons: {
      icon: settings.favicon_url || "/images/BachaStylo%20favicon.png",
      shortcut: settings.favicon_url || "/images/BachaStylo%20favicon.png",
      apple: settings.favicon_url || "/images/BachaStylo%20favicon.png",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch((): Settings => ({} as Settings));

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <AuthHydrator />
          <AnnouncementBar threshold={settings?.free_shipping_threshold} />
          <Header logoUrl={settings?.logo_url} />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </ToastProvider>
      </body>
    </html>
  );
}
