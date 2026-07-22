import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";

export async function FeaturedProducts() {
  const products = await listProducts({ first: 3 });

  if (products.length === 0) return null;

  return (
    <section id="planes" className="py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge-urgent">Precios claros, sin sorpresas</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">Elige el plan para tu sitio</h2>
          <p className="mt-3 text-ink-500">
            Pago único por proyecto. Sin mensualidades obligatorias ni letra chica.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} highlight={i === 1} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/productos" className="btn-outline">
            Ver todos los planes y detalles
          </Link>
        </div>
      </div>
    </section>
  );
}
