import type { MetadataRoute } from "next";
import { listProducts } from "@/lib/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yoteayudo.cl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/productos`, changeFrequency: "weekly", priority: 0.9 },
    ...products.map((p) => ({
      url: `${siteUrl}/productos/${p.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
