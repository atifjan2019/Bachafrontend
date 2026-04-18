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

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot", "Gujranwala", "Bahawalpur", "Other"];
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
    defaultValues: { payment_method: "cod", city: "Karachi", province: "Sindh" },
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
    <div className="container-shop py-8 lg:py-12">
      <div className="text-center mb-8">
        <GoldDivider className="mb-4" />
        <h1 className="font-display text-3xl sm:text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted">Almost there. Let us know where to send the parcel.</p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid lg:grid-cols-[1fr_380px] gap-8"
      >
        <div className="space-y-8">
          <section className="bg-ivory border border-border rounded-lg p-5 lg:p-6">
            <h3 className="font-display text-lg mb-4">Your details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" {...form.register("name")} className="mt-1.5" placeholder="e.g. Ayesha Khan" />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...form.register("phone")} className="mt-1.5" placeholder="03XXXXXXXXX" />
                <FieldError>{form.formState.errors.phone?.message}</FieldError>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" {...form.register("email")} className="mt-1.5" placeholder="you@example.com" />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </div>
            </div>
          </section>

          <section className="bg-ivory border border-border rounded-lg p-5 lg:p-6">
            <h3 className="font-display text-lg mb-4">Shipping address</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="full_address">Full address</Label>
                <Input id="full_address" {...form.register("full_address")} className="mt-1.5" placeholder="House #, Street, Area" />
                <FieldError>{form.formState.errors.full_address?.message}</FieldError>
              </div>
              <div>
                <Label>City</Label>
                <Select
                  value={form.watch("city")}
                  onValueChange={(v) => form.setValue("city", v, { shouldValidate: true })}
                >
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError>{form.formState.errors.city?.message}</FieldError>
              </div>
              <div>
                <Label>Province</Label>
                <Select
                  value={form.watch("province")}
                  onValueChange={(v) => form.setValue("province", v, { shouldValidate: true })}
                >
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FieldError>{form.formState.errors.province?.message}</FieldError>
              </div>
              <div>
                <Label htmlFor="postal_code">Postal code</Label>
                <Input id="postal_code" {...form.register("postal_code")} className="mt-1.5" placeholder="75500" />
                <FieldError>{form.formState.errors.postal_code?.message}</FieldError>
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="notes">Order notes (optional)</Label>
              <Textarea id="notes" {...form.register("notes")} className="mt-1.5" placeholder="Special instructions, apartment number, landmark..." />
            </div>
          </section>

          <section className="bg-ivory border border-border rounded-lg p-5 lg:p-6">
            <h3 className="font-display text-lg mb-4">Payment method</h3>
            <PaymentMethodRadio
              value={payment}
              onChange={(v) => form.setValue("payment_method", v)}
            />
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Placing order..." : "Place Order"}
          </Button>
        </div>

        <OrderSummaryCard />
      </form>
    </div>
  );
}
