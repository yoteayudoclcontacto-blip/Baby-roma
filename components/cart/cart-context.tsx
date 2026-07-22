"use client";

import { createContext, useContext, useState, useTransition, type ReactNode } from "react";
import { addToCartAction, removeCartLineAction, updateCartLineAction } from "@/lib/actions/cart";
import type { Cart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: Cart | null;
  isPending: boolean;
  isOpen: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => void;
  updateItem: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const GENERIC_ERROR = "No pudimos actualizar tu carrito. Intenta de nuevo en unos segundos.";

export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const addItem = (merchandiseId: string, quantity = 1) => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await addToCartAction(merchandiseId, quantity);
        setCart(updated);
        setIsOpen(true);
      } catch (err) {
        console.error("addToCartAction failed", err);
        setError(GENERIC_ERROR);
      }
    });
  };

  const updateItem = (lineId: string, quantity: number) => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await updateCartLineAction(lineId, quantity);
        setCart(updated);
      } catch (err) {
        console.error("updateCartLineAction failed", err);
        setError(GENERIC_ERROR);
      }
    });
  };

  const removeItem = (lineId: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await removeCartLineAction(lineId);
        setCart(updated);
      } catch (err) {
        console.error("removeCartLineAction failed", err);
        setError(GENERIC_ERROR);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isPending,
        isOpen,
        error,
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
