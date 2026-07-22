const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";

export class ShopifyConfigError extends Error {}

function endpoint(): string {
  if (!domain || !token) {
    throw new ShopifyConfigError(
      "Faltan SHOPIFY_STORE_DOMAIN y/o SHOPIFY_STOREFRONT_API_TOKEN. Configúralos en .env.local (ver .env.example)."
    );
  }
  return `https://${domain}/api/${apiVersion}/graphql.json`;
}

type ShopifyFetchOptions<TVariables> = {
  query: string;
  variables?: TVariables;
  tags?: string[];
  cache?: RequestCache;
  revalidate?: number | false;
};

export async function shopifyFetch<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  tags,
  cache,
  revalidate,
}: ShopifyFetchOptions<TVariables>): Promise<TData> {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : {}),
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined ? { revalidate } : {}),
    },
  });

  const body = await res.json();

  if (!res.ok || body.errors) {
    const message = body.errors?.map((e: { message: string }) => e.message).join("; ") || res.statusText;
    throw new Error(`Shopify Storefront API error: ${message}`);
  }

  return body.data as TData;
}
