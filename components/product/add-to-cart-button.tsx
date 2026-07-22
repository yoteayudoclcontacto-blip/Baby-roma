"use client";

import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  variantId,
  available,
  className,
  label = "Empezar mi sitio ahora",
}: {
  variantId: string;
  available: boolean;
  className?: string;
  label?: string;
}) {
  const { addItem, isPending, error } = useCart();

  return (
    <div className={cn(className)}>
      <button
        disabled={!available || isPending}
        onClick={() => addItem(variantId, 1)}
        className="btn-cta w-full py-4 text-base"
      >
        {!available ? "Agotado" : isPending ? "Agregando…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-accent-700">{error}</p>}
    </div>
  );
}
