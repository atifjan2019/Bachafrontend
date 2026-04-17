import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Return Policy",
  description: "Bacha Stylo's refund, return, and exchange policy.",
};

import { PageHero } from "@/components/common/PageHero";

export default function RefundPage() {
  return (
    <div className="flex flex-col">
      <PageHero eyebrow="Legal" title="Refund & Return Policy" subtitle="Last updated: April 2026" />

      <section className="container-shop py-16 lg:py-20 max-w-3xl prose-policy">
        <h2>1. Return Window</h2>
        <p>
          You may return any item within <strong>14 days</strong> of delivery. Items must be unworn,
          unwashed, and in their original packaging with all tags attached.
        </p>

        <h2>2. Non-Returnable Items</h2>
        <ul>
          <li>Items marked as &quot;Final Sale&quot; or purchased during clearance promotions.</li>
          <li>Undergarments and socks, for hygiene reasons.</li>
          <li>Customised or made-to-order items.</li>
        </ul>

        <h2>3. How to Initiate a Return</h2>
        <ol>
          <li>
            Email <strong>hello@bachastylo.pk</strong> or message us on WhatsApp at
            <strong> +92 300 1234 567</strong> with your order number and reason for return.
          </li>
          <li>Our team will confirm eligibility and arrange a reverse pickup at no extra cost.</li>
          <li>
            Once we receive and inspect the item, we&apos;ll process your refund within
            <strong> 5–7 working days</strong>.
          </li>
        </ol>

        <h2>4. Refund Method</h2>
        <ul>
          <li>
            <strong>Online payments</strong> (card, JazzCash, Easypaisa) — refunded to the original
            payment method.
          </li>
          <li>
            <strong>Cash on Delivery orders</strong> — refunded via bank transfer or Easypaisa/JazzCash.
            We&apos;ll ask for your preferred account details.
          </li>
        </ul>

        <h2>5. Exchanges</h2>
        <p>
          Want a different size or colour? We&apos;re happy to exchange. Contact us within 14 days and
          we&apos;ll ship the replacement as soon as we receive the original item. If the new item
          costs more, we&apos;ll let you know the difference before shipping.
        </p>

        <h2>6. Damaged or Incorrect Items</h2>
        <p>
          If you receive a damaged, defective, or wrong item, contact us within <strong>48 hours</strong>
          of delivery with photos. We&apos;ll arrange an immediate replacement or full refund —
          including shipping charges — at no cost to you.
        </p>

        <h2>7. Late or Missing Refunds</h2>
        <p>
          If you haven&apos;t received your refund within the stated timeframe, first check with your
          bank or payment provider. Processing times vary. If the issue persists,
          email <strong>hello@bachastylo.pk</strong> and we&apos;ll investigate immediately.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about returns or refunds? Reach us at <strong>hello@bachastylo.pk</strong> or
          call <strong>+92 300 1234 567</strong> (Mon–Sat, 10 am – 7 pm PKT).
        </p>
      </section>
    </div>
  );
}
