import type { Metadata } from "next";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { ShieldIcon, ClockIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Planes para tu sitio web",
  description:
    "Elige el plan de creación de sitio web ideal para tu negocio. Precios claros, pago único, entrega en días.",
};

const GUARANTEES = [
  { icon: ClockIcon, title: "Entrega rápida", text: "Tu sitio publicado en días, no meses." },
  { icon: ShieldIcon, title: "Pago seguro", text: "Checkout protegido, procesado por Shopify." },
  { icon: CheckIcon, title: "Satisfacción garantizada", text: "Revisiones incluidas hasta que quede perfecto." },
];

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Elige el plan para tu sitio web</h1>
        <p className="mt-3 text-ink-500">
          Sin letra chica: cada plan indica exactamente qué incluye. Pago único, resultados reales.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="mt-14 text-center text-ink-500">
          Pronto vas a poder ver aquí nuestros planes disponibles.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} highlight={i === 1} />
          ))}
        </div>
      )}

      <div className="mt-16 grid gap-6 border-t border-ink-100 pt-12 sm:grid-cols-3">
        {GUARANTEES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="rounded-full bg-success-50 p-2 text-success-600">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-ink-900">{title}</p>
              <p className="text-sm text-ink-500">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
