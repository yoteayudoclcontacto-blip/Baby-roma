import type { Product } from "./shopify/types";

/**
 * Datos de respaldo usados SOLO cuando SHOPIFY_STORE_DOMAIN /
 * SHOPIFY_STOREFRONT_API_TOKEN no están configurados (p. ej. en este entorno
 * de desarrollo, donde el acceso saliente a la tienda real está bloqueado).
 * En producción, con las env vars configuradas, la tienda real reemplaza
 * esto automáticamente — ver lib/shopify/products.ts.
 */
export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/mock-1",
    handle: "sitio-web-esencial",
    title: "Sitio Web Esencial",
    description:
      "Tu sitio web profesional, listo en 7 días. Diseño a medida, hosting y dominio incluidos el primer año.",
    descriptionHtml:
      "<p>Tu sitio web profesional, listo en 7 días. Diseño a medida, hosting y dominio incluidos el primer año.</p>",
    availableForSale: true,
    tags: ["popular"],
    priceRange: {
      minVariantPrice: { amount: "149990", currencyCode: "CLP" },
      maxVariantPrice: { amount: "149990", currencyCode: "CLP" },
    },
    compareAtPriceRange: null,
    featuredImage: null,
    images: [],
    options: [{ id: "1", name: "Plan", values: ["Esencial"] }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-1",
        title: "Esencial",
        availableForSale: true,
        quantityAvailable: 20,
        price: { amount: "149990", currencyCode: "CLP" },
        compareAtPrice: { amount: "199990", currencyCode: "CLP" },
        selectedOptions: [{ name: "Plan", value: "Esencial" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/mock-2",
    handle: "sitio-web-negocio",
    title: "Sitio Web Negocio",
    description:
      "Para marcas que venden online: catálogo, pagos, blog y SEO optimizado desde el primer día.",
    descriptionHtml:
      "<p>Para marcas que venden online: catálogo, pagos, blog y SEO optimizado desde el primer día.</p>",
    availableForSale: true,
    tags: ["recomendado"],
    priceRange: {
      minVariantPrice: { amount: "289990", currencyCode: "CLP" },
      maxVariantPrice: { amount: "289990", currencyCode: "CLP" },
    },
    compareAtPriceRange: null,
    featuredImage: null,
    images: [],
    options: [{ id: "1", name: "Plan", values: ["Negocio"] }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-2",
        title: "Negocio",
        availableForSale: true,
        quantityAvailable: 15,
        price: { amount: "289990", currencyCode: "CLP" },
        compareAtPrice: { amount: "349990", currencyCode: "CLP" },
        selectedOptions: [{ name: "Plan", value: "Negocio" }],
      },
    ],
  },
  {
    id: "gid://shopify/Product/mock-3",
    handle: "sitio-web-a-medida",
    title: "Sitio Web a Medida",
    description:
      "Proyectos complejos: e-commerce headless, integraciones, sistemas de reservas o portales a medida.",
    descriptionHtml:
      "<p>Proyectos complejos: e-commerce headless, integraciones, sistemas de reservas o portales a medida.</p>",
    availableForSale: true,
    tags: [],
    priceRange: {
      minVariantPrice: { amount: "590000", currencyCode: "CLP" },
      maxVariantPrice: { amount: "590000", currencyCode: "CLP" },
    },
    compareAtPriceRange: null,
    featuredImage: null,
    images: [],
    options: [{ id: "1", name: "Plan", values: ["A Medida"] }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-3",
        title: "A Medida",
        availableForSale: true,
        quantityAvailable: 8,
        price: { amount: "590000", currencyCode: "CLP" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Plan", value: "A Medida" }],
      },
    ],
  },
];
