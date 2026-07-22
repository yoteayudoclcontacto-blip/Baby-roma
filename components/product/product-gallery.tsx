"use client";

import Image from "next/image";
import { useState } from "react";
import type { ShopifyImage } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: ShopifyImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [];

  if (gallery.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-ink-50 text-7xl">
        🌐
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-50">
        <Image
          src={gallery[active].url}
          alt={gallery[active].altText ?? title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {gallery.length > 1 && (
        <div className="mt-3 flex gap-2">
          {gallery.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={cn(
                "relative h-16 w-16 overflow-hidden rounded-lg border-2",
                active === i ? "border-brand-600" : "border-transparent"
              )}
            >
              <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
