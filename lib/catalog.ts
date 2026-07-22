import { getProductByHandle, getProducts } from "./shopify";
import { mockProducts } from "./mock-data";
import type { Product } from "./shopify/types";

export const isShopifyConfigured = Boolean(
  process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_API_TOKEN
);

export async function listProducts(opts?: { first?: number; query?: string }): Promise<Product[]> {
  if (!isShopifyConfigured) return mockProducts;
  try {
    return await getProducts(opts);
  } catch {
    return mockProducts;
  }
}

export async function findProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) return mockProducts.find((p) => p.handle === handle) ?? null;
  try {
    return await getProductByHandle(handle);
  } catch {
    return mockProducts.find((p) => p.handle === handle) ?? null;
  }
}
