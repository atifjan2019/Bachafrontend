"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators/schemas";
import { Input, Textarea } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { PaymentMethodRadio } from "@/components/checkout/PaymentMethodRadio";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { placeOrder } from "@/lib/api/orders";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useToast } from "@/components/ui/toast";

const PROVINCES = ["Sindh", "Punjab", "Islamabad Capital Territory", "Khyber Pakhtunkhwa", "Balochistan", "Azad Kashmir", "Gilgit-Baltistan"];

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const user = useAuth((s) => s.user);
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { payment_method: "cod", city: "", province: "Sindh" },
  });

  // Auto-fill form with logged-in user's info
  useEffect(() => {
    if (user) {
      if (user.name) form.setValue("name", user.name);
      if (user.email) form.setValue("email", user.email);
      if (user.phone) form.setValue("phone", user.phone);
      if (user.address) form.setValue("full_address", user.address);
    }
  }, [user, form]);

  if (lines.length === 0) {
    return (
      <div className="container-shop py-12">
        <EmptyCart />
      </div>
    );
  }

  async function onSubmit(values: CheckoutInput) {
    setSubmitting(true);
    try {
      const order = await placeOrder({
        customer: { name: values.name, phone: values.phone, email: values.email || undefined },
        shipping_address: {
          full_address: values.full_address,
          city: values.city,
          province: values.province,
          postal_code: values.postal_code,
        },
        items: lines.map((l) => ({
          product_id: l.product_id,
          variant_id: l.variant_id,
          quantity: l.quantity,
          unit_price: l.unit_price,
          name: l.name,
          size: l.size,
        })),
        payment_method: values.payment_method,
        notes: values.notes,
      });
      clear();
      show({ title: "Order placed", description: `Order ${order.id} confirmed`, tone: "success" });
      router.push(`/checkout/success?id=${order.id}`);
    } catch (e) {
      show({ title: "Could not place order", description: "Please try again in a moment", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  const payment = form.watch("payment_method");

  return (
    <div className="container-shop py-6 sm:py-8 lg:py-16">
      <div className="text-center mb-6 sm:mb-10">
        <GoldDivider className="mb-4 lg:mb-8 mx-auto" />
        <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl">Checkout</h1>
        <p className="mt-2 text-xs sm:text-sm text-muted uppercase tracking-[0.1em]">Complete your order</p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid lg:grid-cols-[1fr_380px] gap-4 lg:gap-12 items-start"
      >
        <div className="space-y-4 lg:space-y-8">
          <section className="bg-white border border-ink-10 p-4 sm:p-6 lg:p-10">
            <h3 className="font-display text-base lg:text-2xl mb-4 lg:mb-8 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center bg-brand-red text-white text-[10px] font-bold">01</span>
              Your Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 lg:gap-6">
              <div>
                <Label htmlFor="name" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Full name</Label>
                <Input id="name" {...form.register("name")} className="h-10 lg:h-12 text-sm" placeholder="Ayesha Khan" />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="phone" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Phone Number</Label>
                <Input id="phone" {...form.register("phone")} className="h-10 lg:h-12 text-sm" placeholder="03XXXXXXXXX" />
                <FieldError>{form.formState.errors.phone?.message}</FieldError>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Email Address (Optional)</Label>
                <Input id="email" {...form.register("email")} className="h-10 lg:h-12 text-sm" placeholder="you@example.com" />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </div>
            </div>
          </section>

          <section className="bg-white border border-ink-10 p-4 sm:p-6 lg:p-10">
            <h3 className="font-display text-base lg:text-2xl mb-4 lg:mb-8 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center bg-brand-red text-white text-[10px] font-bold">02</span>
              Shipping Address
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 lg:gap-6">
              <div className="sm:col-span-2">
                <Label htmlFor="full_address" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Street Address</Label>
                <Input id="full_address" {...form.register("full_address")} className="h-10 lg:h-12 text-sm" placeholder="House #, Street name, Area..." />
                <FieldError>{form.formState.errors.full_address?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="city" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">City</Label>
                <Input id="city" {...form.register("city")} className="h-10 lg:h-12 text-sm" placeholder="e.g. Lahore" />
                <FieldError>{form.formState.errors.city?.message}</FieldError>
              </div>
              <div>
                <Label className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Province</Label>
                <Select
                  value={form.watch("province")}
                  onValueChange={(v) => form.setValue("province", v, { shouldValidate: true })}
                >
                  <SelectTrigger className="h-10 lg:h-12 text-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError>{form.formState.errors.province?.message}</FieldError>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="postal_code" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Postal Code (Optional)</Label>
                <Input id="postal_code" {...form.register("postal_code")} className="h-10 lg:h-12 text-sm" placeholder="75500" />
                <FieldError>{form.formState.errors.postal_code?.message}</FieldError>
              </div>
            </div>
            <div className="mt-4 lg:mt-8">
              <Label htmlFor="notes" className="text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5 block">Order Notes (Optional)</Label>
              <Textarea id="notes" {...form.register("notes")} className="text-sm min-h-[80px] lg:min-h-[120px]" placeholder="Anything else we should know?" />
            </div>
          </section>

          <section className="bg-white border border-ink-10 p-4 sm:p-6 lg:p-10">
            <h3 className="font-display text-base lg:text-2xl mb-4 lg:mb-8 flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center bg-brand-red text-white text-[10px] font-bold">03</span>
              Payment Method
            </h3>
            <PaymentMethodRadio
              value={payment}
              onChange={(v) => form.setValue("payment_method", v)}
            />
          </section>

          <div className="hidden lg:block pt-4">
            <Button type="submit" size="lg" className="w-full h-14 text-sm font-bold uppercase tracking-widest" disabled={submitting}>
              {submitting ? "Processing..." : "Confirm Order"}
            </Button>
          </div>
        </div>

        <div className="sticky top-24 space-y-4">
          <OrderSummaryCard />
          <div className="lg:hidden">
            <Button type="submit" size="lg" className="w-full h-12 text-xs font-bold uppercase tracking-widest" disabled={submitting}>
              {submitting ? "Processing..." : "Place Order"}
            </Button>
          </div>
          <p className="text-[10px] text-center text-ink-50 px-4">
            By placing your order, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
}
