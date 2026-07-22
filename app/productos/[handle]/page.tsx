import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProduct, listProducts } from "@/lib/catalog";
import { ProductDetail } from "@/components/product/product-detail";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await findProduct(params.handle);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: product.featuredImage
      ? { images: [{ url: product.featuredImage.url }] }
      : undefined,
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await findProduct(params.handle);
  if (!product) notFound();

  const price = product.priceRange.minVariantPrice;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      "@type": "Offer",
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ handle: p.handle }));
}
