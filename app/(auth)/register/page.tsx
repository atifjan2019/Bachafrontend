"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { register as registerApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/store/auth";
import { useToast } from "@/components/ui/toast";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterInput) {
    setSubmitting(true);
    try {
      const { user } = await registerApi(values.name, values.email, values.password);
      setUser(user);
      show({ title: "Account created", description: `Welcome, ${user.name}`, tone: "success" });
      router.push("/account");
    } catch (err: any) {
      const msg = err?.response?.data?.message
        || (err?.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(". ")
          : "Please try again");
      show({ title: "Could not register", description: msg, tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-shop py-12 lg:py-20">
      <div className="max-w-md mx-auto bg-ivory border border-border rounded-lg p-6 lg:p-8">
        <div className="text-center mb-6">
          <GoldDivider className="mb-3" />
          <h1 className="font-display text-3xl text-brand-black">Create account</h1>
          <p className="text-sm text-muted mt-1">Save addresses, track orders, keep your favourites.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...form.register("name")} className="mt-1.5" placeholder="Your name" />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} className="mt-1.5" placeholder="you@example.com" />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} className="mt-1.5" placeholder="At least 6 characters" />
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="confirm_password">Confirm password</Label>
            <Input id="confirm_password" type="password" {...form.register("confirm_password")} className="mt-1.5" />
            <FieldError>{form.formState.errors.confirm_password?.message}</FieldError>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="text-sm text-muted text-center mt-6">
          Already with us?{" "}
          <Link href="/login" className="text-brand-red hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
