"use client";

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";
import { addToCartAction, removeCartLineAction, updateCartLineAction } from "@/lib/actions/cart";
import type { Cart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: Cart | null;
  isPending: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const addItem = (merchandiseId: string, quantity = 1) => {
    startTransition(async () => {
      const updated = await addToCartAction(merchandiseId, quantity);
      setCart(updated);
      setIsOpen(true);
    });
  };

  const updateItem = (lineId: string, quantity: number) => {
    startTransition(async () => {
      const updated = await updateCartLineAction(lineId, quantity);
      setCart(updated);
    });
  };

  const removeItem = (lineId: string) => {
    startTransition(async () => {
      const updated = await removeCartLineAction(lineId);
      setCart(updated);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isPending,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
