"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { requestPasswordReset } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values: ForgotPasswordInput) {
    setSubmitting(true);
    try {
      await requestPasswordReset(values.email);
      setSent(true);
    } catch {
      show({
        title: "Something went wrong",
        description: "Please try again in a moment",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-shop py-12 lg:py-20">
      <div className="max-w-md mx-auto bg-ivory border border-border rounded-lg p-6 lg:p-8">
        <div className="text-center mb-6">
          <GoldDivider className="mb-3" />
          <h1 className="font-display text-3xl text-brand-black">Forgot password?</h1>
          <p className="text-sm text-muted mt-1">
            {sent
              ? "Check your inbox for the reset link."
              : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {sent ? (
          <div className="space-y-4 text-center">
            <p className="text-sm leading-relaxed text-ink-70">
              If an account exists for that email, a password reset link is on its way. The link
              expires in 60 minutes.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="mt-1.5"
                placeholder="you@example.com"
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}

        <p className="text-sm text-muted text-center mt-6">
          Remembered it?{" "}
          <Link href="/login" className="text-brand-red hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
