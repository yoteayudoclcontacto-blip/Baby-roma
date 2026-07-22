import { shopifyFetch, ShopifyConfigError } from "./client";
import {
  getCartQuery,
  getProductByHandleQuery,
  getProductsQuery,
  getShopInfoQuery,
} from "./queries";
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
} from "./mutations";
import type { Cart, Product, ShopInfo } from "./types";

export { ShopifyConfigError };

type Edges<T> = { edges: { node: T }[] };

function flatten<T>(connection?: Edges<T> | null): T[] {
  return connection?.edges?.map((e) => e.node) ?? [];
}

function normalizeProduct(raw: any): Product {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    availableForSale: raw.availableForSale,
    tags: raw.tags ?? [],
    priceRange: raw.priceRange,
    compareAtPriceRange: null,
    featuredImage: raw.featuredImage ?? null,
    images: flatten(raw.images),
    options: raw.options ?? [],
    variants: flatten(raw.variants),
  };
}

function normalizeCart(raw: any): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines: flatten(raw.lines).map((line: any) => ({
      id: line.id,
      quantity: line.quantity,
      cost: line.cost,
      merchandise: {
        id: line.merchandise.id,
        title: line.merchandise.title,
        product: line.merchandise.product,
        price: line.merchandise.price,
      },
    })),
  };
}

export async function getShopInfo(): Promise<ShopInfo | null> {
  try {
    const data = await shopifyFetch<{ shop: ShopInfo }>({
      query: getShopInfoQuery,
      tags: ["shop"],
      revalidate: 3600,
    });
    return data.shop;
  } catch (err) {
    if (err instanceof ShopifyConfigError) return null;
    throw err;
  }
}

export async function getProducts(opts?: {
  first?: number;
  query?: string;
}): Promise<Product[]> {
  const data = await shopifyFetch<{ products: Edges<any> }>({
    query: getProductsQuery,
    variables: { first: opts?.first ?? 24, query: opts?.query },
    tags: ["products"],
    revalidate: 60,
  });
  return flatten(data.products).map(normalizeProduct);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: any | null }>({
    query: getProductByHandleQuery,
    variables: { handle },
    tags: [`product:${handle}`],
    revalidate: 60,
  });
  return data.product ? normalizeProduct(data.product) : null;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: any | null }>({
    query: getCartQuery,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } }>({
    query: cartCreateMutation,
    variables: { lines },
    cache: "no-store",
  });
  if (data.cartCreate.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  return normalizeCart(data.cartCreate.cart);
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>({
    query: cartLinesAddMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  if (data.cartLinesAdd.userErrors?.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join("; "));
  }
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  if (data.cartLinesUpdate.userErrors?.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join("; "));
  }
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: any; userErrors: any[] } }>({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  if (data.cartLinesRemove.userErrors?.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join("; "));
  }
  return normalizeCart(data.cartLinesRemove.cart);
}
