"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/store/auth";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuth((s) => s.setUser);
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    setSubmitting(true);
    try {
      const { user } = await login(values.email, values.password);
      setUser(user);
      show({ title: "Welcome back", description: user.name, tone: "success" });
      router.push("/account");
    } catch {
      show({ title: "Login failed", description: "Check your email and password", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-shop py-12 lg:py-20">
      <div className="max-w-md mx-auto bg-ivory border border-border rounded-lg p-6 lg:p-8">
        <div className="text-center mb-6">
          <GoldDivider className="mb-3" />
          <h1 className="font-display text-3xl text-brand-black">Welcome back</h1>
          <p className="text-sm text-muted mt-1">Login to see your orders and save addresses.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </Button>
        </form>
        <p className="text-sm text-muted text-center mt-6">
          New to Bacha Stylo?{" "}
          <Link href="/register" className="text-brand-red hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
