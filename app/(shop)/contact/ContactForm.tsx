"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with real API call when ready
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-ink-70 py-4">
        Thanks for reaching out! We'll get back to you within one working day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="cf-name">Full name</Label>
          <Input id="cf-name" name="name" placeholder="Ahmed Ali" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cf-email">Email</Label>
          <Input id="cf-email" name="email" type="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cf-subject">Subject</Label>
        <Input id="cf-subject" name="subject" placeholder="Order #1234 — size question" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cf-message">Message</Label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us how we can help…"
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
        />
      </div>
      <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
