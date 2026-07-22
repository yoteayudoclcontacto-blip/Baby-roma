import Link from "next/link";
import { ShieldIcon, ClockIcon, CheckIcon } from "@/components/icons";

const TRUST_ITEMS = [
  { icon: ShieldIcon, label: "Pago 100% seguro" },
  { icon: ClockIcon, label: "Entrega en 7 días" },
  { icon: CheckIcon, label: "Garantía de satisfacción" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-300">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="flex items-center gap-2 text-lg font-extrabold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">Y</span>
            YoTeAyudo
          </p>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            Creamos el sitio web de tu negocio, de principio a fin. Diseño, desarrollo y
            acompañamiento para que vendas y te encuentren online, sin complicaciones.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-ink-300">
                <Icon className="h-4 w-4 text-success-500" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Servicios</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/productos" className="hover:text-white">Ver todos los planes</Link></li>
            <li><Link href="/#como-funciona" className="hover:text-white">Cómo funciona</Link></li>
            <li><Link href="/#testimonios" className="hover:text-white">Casos de éxito</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Ayuda</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/#faq" className="hover:text-white">Preguntas frecuentes</Link></li>
            <li><a href="mailto:hola@yoteayudo.cl" className="hover:text-white">hola@yoteayudo.cl</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-xs text-ink-500">
          © {new Date().getFullYear()} YoTeAyudo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
