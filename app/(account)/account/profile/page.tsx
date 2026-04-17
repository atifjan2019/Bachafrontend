"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/store/auth";
import { updateProfile } from "@/lib/api/auth";
import { profileSchema, type ProfileInput } from "@/lib/validators/schemas";
import { Input, Textarea } from "@/components/ui/input";
import { Label, FieldError } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoldDivider } from "@/components/common/GoldDivider";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuth((s) => s.user);
  const hydrated = useAuth((s) => s.hydrated);
  const setUser = useAuth((s) => s.setUser);
  const { show } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
  }, [user, form]);

  async function onSubmit(values: ProfileInput) {
    setSubmitting(true);
    try {
      const updated = await updateProfile({
        name: values.name,
        phone: values.phone,
        address: values.address,
      });
      setUser(updated);
      show({ title: "Profile updated", tone: "success" });
    } catch {
      show({ title: "Could not update profile", tone: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) return null;

  return (
    <div className="container-shop py-10 lg:py-14">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <GoldDivider className="mb-3" />
          <h1 className="font-display text-3xl sm:text-4xl">Your Profile</h1>
          <p className="text-sm text-muted mt-1">Keep your delivery details up to date.</p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-ivory border border-border rounded-lg p-5 lg:p-6 space-y-4"
        >
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...form.register("name")} className="mt-1.5" />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled className="mt-1.5" />
            <p className="text-xs text-muted mt-1">Email cannot be changed in this release.</p>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...form.register("phone")} className="mt-1.5" placeholder="03XXXXXXXXX" />
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </div>
          <div>
            <Label htmlFor="address">Default address</Label>
            <Textarea id="address" {...form.register("address")} className="mt-1.5" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Save changes"}
            </Button>
            <Button asChild variant="outline" type="button">
              <Link href="/account">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
