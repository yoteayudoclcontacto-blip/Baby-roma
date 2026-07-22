import Link from "next/link";
import { CheckIcon, StarIcon } from "@/components/icons";

const HERO_CHECKS = ["Listo en 7 días", "Pago único, sin mensualidades ocultas", "Diseño 100% a tu medida"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="container-page relative flex flex-col items-center gap-8 py-20 text-center sm:py-28">
        <span className="badge-urgent animate-fade-up bg-accent-500/15 text-accent-200">
          <StarIcon className="h-3.5 w-3.5" />
          +500 negocios ya confían en nosotros
        </span>

        <h1 className="animate-fade-up max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Yo te ayudo a tener el sitio web que tu negocio necesita
        </h1>

        <p className="animate-fade-up max-w-xl text-lg text-brand-100" style={{ animationDelay: "80ms" }}>
          Diseñamos, construimos y dejamos funcionando tu sitio web profesional —
          sin que tengas que entender de tecnología. Tú te enfocas en tu negocio,
          nosotros en que se vea increíble y venda.
        </p>

        <div
          className="animate-fade-up flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "140ms" }}
        >
          <Link href="/productos" className="btn-cta px-8 py-4 text-base">
            Quiero mi sitio web
          </Link>
          <Link href="/#como-funciona" className="btn-outline border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white">
            Ver cómo funciona
          </Link>
        </div>

        <ul
          className="animate-fade-up flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-brand-100"
          style={{ animationDelay: "200ms" }}
        >
          {HERO_CHECKS.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-success-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
