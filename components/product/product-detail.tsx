"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatMoney, cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { CheckIcon, ShieldIcon, ClockIcon, StarIcon } from "@/components/icons";

const INCLUDED_DEFAULT = [
  "Diseño a medida para tu negocio",
  "Optimizado para verse perfecto en el celular",
  "Formulario de contacto o botón de WhatsApp",
  "Acompañamiento hasta que quede publicado",
];

function findMatchingVariant(product: Product, selected: Record<string, string>): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every((opt) => selected[opt.name] === opt.value)
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of product.options) {
      initial[option.name] = option.values[0];
    }
    return initial;
  });

  const variant = useMemo(() => findMatchingVariant(product, selected) ?? product.variants[0], [product, selected]);

  const hasMultipleOptions = product.options.some((o) => o.values.length > 1);
  const compareAt = variant?.compareAtPrice;
  const savingsPct =
    compareAt && Number(compareAt.amount) > 0
      ? Math.round((1 - Number(variant.price.amount) / Number(compareAt.amount)) * 100)
      : null;

  return (
    <div className="container-page grid gap-12 py-14 lg:grid-cols-2">
      <ProductGallery images={product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : []} title={product.title} />

      <div>
        <div className="flex items-center gap-2 text-accent-600">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
          </span>
          <span className="text-sm font-medium text-ink-500">Basado en clientes reales</span>
        </div>

        <h1 className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl">{product.title}</h1>
        <p className="mt-3 text-ink-500">{product.description}</p>

        <div className="mt-6 flex items-end gap-3">
          {compareAt && (
            <span className="text-lg text-ink-400 line-through">{formatMoney(compareAt)}</span>
          )}
          <span className="text-3xl font-extrabold text-ink-900">
            {variant ? formatMoney(variant.price) : formatMoney(product.priceRange.minVariantPrice)}
          </span>
          {savingsPct && savingsPct > 0 && (
            <span className="badge-urgent">Ahorra {savingsPct}%</span>
          )}
        </div>

        {hasMultipleOptions &&
          product.options.map((option) => (
            <div key={option.id} className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink-800">{option.name}</p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => (
                  <button
                    key={value}
                    onClick={() => setSelected((prev) => ({ ...prev, [option.name]: value }))}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      selected[option.name] === value
                        ? "border-brand-600 bg-brand-50 text-brand-700"
                        : "border-ink-200 text-ink-600 hover:border-brand-300"
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <AddToCartButton
            variantId={variant?.id ?? ""}
            available={Boolean(variant?.availableForSale)}
            className="flex-1"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
          <span className="flex items-center gap-1.5">
            <ShieldIcon className="h-4 w-4 text-success-600" /> Pago 100% seguro
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-success-600" /> Entrega rápida
          </span>
        </div>

        <div className="mt-8 rounded-2xl bg-ink-50 p-6">
          <p className="font-semibold text-ink-900">Este plan incluye</p>
          <ul className="mt-3 space-y-2">
            {INCLUDED_DEFAULT.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-600">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
