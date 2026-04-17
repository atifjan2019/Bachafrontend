"use client";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils/cn";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
      <SliderPrimitive.Range className="absolute h-full bg-brand-red" />
    </SliderPrimitive.Track>
    {Array.isArray(props.value ?? props.defaultValue) ? (
      (props.value ?? (props.defaultValue as number[])).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-4 w-4 rounded-full border border-brand-red bg-ivory shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40"
        />
      ))
    ) : (
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-brand-red bg-ivory shadow focus:outline-none" />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
