"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ProductImage } from "@/types";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const active = images[index] ?? images[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-cream">
        {active && (
          <Image
            src={active.url}
            alt={active.alt ?? name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border",
                i === index ? "border-brand-black" : "border-border"
              )}
            >
              <Image src={img.url} alt={img.alt ?? name} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
