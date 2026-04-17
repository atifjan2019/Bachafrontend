"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-ivory px-3 text-sm text-brand-black placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:border-brand-red disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[90px] w-full rounded-md border border-border bg-ivory px-3 py-2 text-sm text-brand-black placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 focus-visible:border-brand-red disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
