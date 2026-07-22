import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getActiveCart } from "@/lib/actions/cart";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yoteayudo.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "YoTeAyudo — Creamos el sitio web de tu negocio",
    template: "%s | YoTeAyudo",
  },
  description:
    "YoTeAyudo diseña y desarrolla el sitio web de tu negocio en días, no meses. Planes claros, pago único y acompañamiento real para que empieces a vender online.",
  keywords: ["creación de sitios web", "diseño web Chile", "página web para negocios", "tienda online"],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "YoTeAyudo",
    title: "YoTeAyudo — Creamos el sitio web de tu negocio",
    description:
      "Diseño y desarrollo de tu sitio web profesional, listo para vender. Planes claros, sin letra chica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YoTeAyudo — Creamos el sitio web de tu negocio",
    description: "Tu sitio web profesional, listo en días.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "YoTeAyudo",
  url: siteUrl,
  description: "Servicio de creación de sitios web para personas y empresas.",
  areaServed: "CL",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialCart = await getActiveCart();

  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider initialCart={initialCart}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
