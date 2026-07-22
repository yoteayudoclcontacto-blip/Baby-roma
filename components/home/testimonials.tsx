import { StarIcon } from "@/components/icons";

// Testimonios de ejemplo para maquetar la sección — reemplázalos por
// reseñas reales de clientes antes de publicar el sitio.
const TESTIMONIALS = [
  {
    name: "Javiera M.",
    role: "Dueña de emprendimiento de repostería",
    quote:
      "En menos de una semana tenía mi sitio funcionando. Pude explicar justo lo que quería y el equipo lo hizo realidad sin dolores de cabeza.",
  },
  {
    name: "Rodrigo P.",
    role: "Contador independiente",
    quote:
      "Necesitaba verme profesional frente a mis clientes y lo logré. El proceso fue simple y el precio se pagó solo con los primeros clientes nuevos.",
  },
  {
    name: "Camila S.",
    role: "Fundadora de tienda de ropa online",
    quote:
      "Lo que más valoro es que no tuve que aprender nada técnico. Les conté mi idea y ellos se encargaron de todo, con revisiones incluidas.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-brand-950 py-20 text-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Negocios reales, resultados reales</h2>
          <p className="mt-3 text-brand-200">
            Así lo cuentan quienes ya confiaron en nosotros para construir su presencia online.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="flex gap-0.5 text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-brand-100">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="block text-brand-300">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
