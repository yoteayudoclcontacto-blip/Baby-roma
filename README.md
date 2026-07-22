# YoTeAyudo — Tienda headless (Next.js 14 + Shopify Storefront API)

Storefront headless para **YoTeAyudo**, construida con Next.js 14 (App Router),
TypeScript, Tailwind CSS y la API Storefront de Shopify. Diseñada con un
enfoque de CRO (conversion rate optimization) y psicología del color para un
negocio de servicios dirigido a un público de 18 a 45 años.

## Arquitectura

- **App Router + Server Components**: las páginas de catálogo y producto
  obtienen datos directamente desde Shopify en el servidor (`lib/shopify`),
  sin exponer ninguna credencial al navegador.
- **Carrito**: implementado 100% sobre la Cart API de Shopify mediante
  Server Actions (`lib/actions/cart.ts`). El `cartId` se guarda en una
  cookie `httpOnly`; el checkout final redirige al `checkoutUrl` que entrega
  Shopify (pago procesado por Shopify, no por este proyecto).
- **Catálogo con respaldo (`lib/catalog.ts`)**: si las variables de entorno
  de Shopify no están configuradas (o la API no responde), el sitio usa
  `lib/mock-data.ts` para poder maquetarse y revisarse igual. En cuanto
  configuras las credenciales reales, el catálogo real las reemplaza
  automáticamente — no hay que tocar código.
- **Sistema de diseño** (`tailwind.config.ts`): paleta pensada para
  conversión — azul (`brand`) para confianza/profesionalismo, naranja
  (`accent`) reservado solo para CTAs de conversión (contraste
  complementario máximo), verde (`success`) para señales de confianza.

## Configuración

1. Copia `.env.example` a `.env.local` y completa:

   ```
   SHOPIFY_STORE_DOMAIN=yoteayudo-6462.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=<tu Storefront API token>
   SHOPIFY_STOREFRONT_API_VERSION=2024-10
   NEXT_PUBLIC_SITE_URL=https://www.yoteayudo.cl
   ```

   **Importante:** solo se necesita el **Storefront API token** (acceso
   público de solo lectura a productos/checkout). El **Admin API token**
   de Shopify **no se usa en este proyecto** — nunca debe exponerse a un
   frontend ni comitearse a un repositorio. Si en algún momento compartiste
   ese token en texto plano (chat, issue, etc.), revócalo y genera uno
   nuevo desde el admin de Shopify.

2. Instala dependencias y levanta el entorno de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

3. Para producción:

   ```bash
   npm run build
   npm run start
   ```

## Estructura

```
app/                     Rutas (App Router)
  page.tsx                Home
  productos/page.tsx       Catálogo
  productos/[handle]/      Detalle de producto
components/
  home/                    Secciones de la home (hero, FAQ, testimonios…)
  product/                 Card, galería, selector de variantes, add-to-cart
  cart/                    Contexto de carrito + drawer
  layout/                  Header / Footer
lib/
  shopify/                 Cliente GraphQL, queries, mutations, tipos
  actions/cart.ts          Server Actions del carrito
  catalog.ts               Capa con fallback a datos mock
  mock-data.ts             Datos de respaldo para desarrollo sin conexión
```

## Notas

- Los testimonios en `components/home/testimonials.tsx` son de ejemplo
  para maquetar la sección — reemplázalos por reseñas reales antes de
  publicar.
- Las imágenes de producto se sirven desde `cdn.shopify.com`
  (configurado en `next.config.mjs`).
