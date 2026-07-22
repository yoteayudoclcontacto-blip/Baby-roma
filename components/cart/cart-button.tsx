"use client";

import { useCart } from "./cart-context";
import { CartIcon } from "@/components/icons";

export function CartButton() {
  const { cart, openCart } = useCart();
  const quantity = cart?.totalQuantity ?? 0;

  return (
    <button
      onClick={openCart}
      aria-label={`Abrir carrito, ${quantity} productos`}
      className="relative rounded-full p-2.5 text-ink-700 transition-colors hover:bg-ink-50 hover:text-brand-700"
    >
      <CartIcon className="h-6 w-6" />
      {quantity > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
          {quantity}
        </span>
      )}
    </button>
  );
}
