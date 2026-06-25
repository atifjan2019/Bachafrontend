"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validators/schemas";
import { Input } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { resetPassword } from "@/lib/api/auth";
import { useToast } from "@/components/ui/toast";

export default function ResetPasswordPage() {
  // useSearchParams requires a Suspense boundary in the app router.
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { show } = useToast();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";
  const invalidLink = !token || !email;

  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(values: ResetPasswordInput) {
    setSubmitting(true);
    try {
      await resetPassword(email, token, values.password, values.confirm_password);
      show({
        title: "Password reset",
        description: "You can now sign in with your new password",
        tone: "success",
      });
      router.push("/login");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "This reset link is invalid or has expired";
      show({ title: "Could not reset password", description: msg, tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-shop py-12 lg:py-20">
      <div className="max-w-md mx-auto bg-ivory border border-border rounded-lg p-6 lg:p-8">
        <div className="text-center mb-6">
          <GoldDivider className="mb-3" />
          <h1 className="font-display text-3xl text-brand-black">Set a new password</h1>
          <p className="text-sm text-muted mt-1">
            {invalidLink ? "This reset link is incomplete." : `For ${email}`}
          </p>
        </div>

        {invalidLink ? (
          <div className="space-y-4 text-center">
            <p className="text-sm leading-relaxed text-ink-70">
              This password reset link is invalid or incomplete. Please request a new one.
            </p>
            <Button asChild className="w-full">
              <Link href="/forgot-password">Request a new link</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                className="mt-1.5"
                placeholder="At least 6 characters"
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </div>
            <div>
              <Label htmlFor="confirm_password">Confirm password</Label>
              <Input
                id="confirm_password"
                type="password"
                {...form.register("confirm_password")}
                className="mt-1.5"
                placeholder="Re-enter your password"
              />
              <FieldError>{form.formState.errors.confirm_password?.message}</FieldError>
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Updating..." : "Reset password"}
            </Button>
          </form>
        )}

        <p className="text-sm text-muted text-center mt-6">
          <Link href="/login" className="text-brand-red hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
