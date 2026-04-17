import Link from "next/link";
import { BrandMark } from "@/components/common/BrandMark";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-ink-10 mt-24 pb-20 lg:pb-0">
      <div className="container-shop grid gap-12 lg:grid-cols-5 py-16">
        <div className="lg:col-span-2">
          <BrandMark size="xl" />
          <p className="mt-4 text-sm text-ink-50 max-w-xs">
            Modern, comfortable kids' clothing designed to keep up with every adventure.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-ink-70 mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-ink-70">
            <li><Link className="hover:text-brand-black" href="/products">All products</Link></li>
            <li><Link className="hover:text-brand-black" href="/category/boys">Boys</Link></li>
            <li><Link className="hover:text-brand-black" href="/category/girls">Girls</Link></li>
            <li><Link className="hover:text-brand-black" href="/category/new-arrivals">New arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-ink-70 mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-ink-70">
            <li><Link className="hover:text-brand-black" href="/about">About</Link></li>
            <li><Link className="hover:text-brand-black" href="/blogs">Blogs</Link></li>
            <li><Link className="hover:text-brand-black" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-brand-black" href="/account">Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-ink-70 mb-4">Help</h4>
          <ul className="space-y-2.5 text-sm text-ink-70">
            <li><Link className="hover:text-brand-black" href="/contact">Shipping &amp; returns</Link></li>
            <li><Link className="hover:text-brand-black" href="/contact">Size guide</Link></li>
            <li><Link className="hover:text-brand-black" href="/contact">Care</Link></li>
            <li><Link className="hover:text-brand-black" href="/contact">FAQ</Link></li>
          </ul>
          <div className="flex items-center gap-3 mt-6">
            <a aria-label="Instagram" href="#" className="text-ink-70 hover:text-brand-black">
              <Instagram className="h-5 w-5" />
            </a>
            <a aria-label="Facebook" href="#" className="text-ink-70 hover:text-brand-black">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-10">
        <div className="container-shop flex flex-col sm:flex-row items-center justify-between gap-2 py-6 text-xs text-ink-50">
          <p>&copy; {new Date().getFullYear()} Bacha Stylo. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-brand-black">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-black">Terms</Link>
            <Link href="/refund" className="hover:text-brand-black">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
