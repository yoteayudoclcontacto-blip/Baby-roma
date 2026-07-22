import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

export function ProductCard({ product, highlight }: { product: Product; highlight?: boolean }) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.variants[0]?.compareAtPrice;
  const isPopular = product.tags.includes("popular") || product.tags.includes("recomendado");

  return (
    <Link
      href={`/productos/${product.handle}`}
      className={`card group relative flex flex-col overflow-hidden hover:shadow-cardHover ${
        highlight ? "ring-2 ring-brand-500" : ""
      }`}
    >
      {isPopular && (
        <span className="absolute left-4 top-4 z-10 badge bg-brand-600 text-white">Más elegido</span>
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-50">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">🌐</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-ink-900">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-ink-500">{product.description}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {compareAt && (
              <span className="mr-2 text-sm text-ink-400 line-through">{formatMoney(compareAt)}</span>
            )}
            <span className="text-xl font-extrabold text-ink-900">{formatMoney(price)}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-brand-700">
            Ver plan
            <CheckIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
