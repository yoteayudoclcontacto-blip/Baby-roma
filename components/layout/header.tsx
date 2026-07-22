import Link from "next/link";
import { CartButton } from "@/components/cart/cart-button";

const NAV_LINKS = [
  { href: "/productos", label: "Servicios" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#testimonios", label: "Testimonios" },
  { href: "/#faq", label: "Preguntas frecuentes" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">Y</span>
          Yo<span className="text-brand-600">Te</span>Ayudo
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/productos" className="btn-cta hidden sm:inline-flex">
            Empezar mi sitio
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
