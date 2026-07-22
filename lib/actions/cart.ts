"use server";

import { cookies } from "next/headers";
import { addCartLines, createCart, getCart, removeCartLines, updateCartLines } from "@/lib/shopify";
import type { Cart } from "@/lib/shopify/types";

const CART_COOKIE = "cartId";

function setCartCookie(cartId: string) {
  cookies().set(CART_COOKIE, cartId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getActiveCart(): Promise<Cart | null> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}

export async function addToCartAction(merchandiseId: string, quantity = 1): Promise<Cart> {
  const cartId = cookies().get(CART_COOKIE)?.value;

  if (!cartId) {
    const cart = await createCart([{ merchandiseId, quantity }]);
    setCartCookie(cart.id);
    return cart;
  }

  try {
    return await addCartLines(cartId, [{ merchandiseId, quantity }]);
  } catch {
    // El carrito guardado ya no existe en Shopify (p. ej. tras un checkout
    // completado) — se crea uno nuevo en vez de fallar la acción del usuario.
    const cart = await createCart([{ merchandiseId, quantity }]);
    setCartCookie(cart.id);
    return cart;
  }
}

export async function updateCartLineAction(lineId: string, quantity: number): Promise<Cart | null> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return null;
  if (quantity <= 0) return removeCartLines(cartId, [lineId]);
  return updateCartLines(cartId, [{ id: lineId, quantity }]);
}

export async function removeCartLineAction(lineId: string): Promise<Cart | null> {
  const cartId = cookies().get(CART_COOKIE)?.value;
  if (!cartId) return null;
  return removeCartLines(cartId, [lineId]);
}
