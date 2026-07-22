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
  const { addItem, isPending } = useCart();

  return (
    <button
      disabled={!available || isPending}
      onClick={() => addItem(variantId, 1)}
      className={cn("btn-cta", className)}
    >
      {!available ? "Agotado" : isPending ? "Agregando…" : label}
    </button>
  );
}
