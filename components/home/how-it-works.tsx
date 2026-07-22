const STEPS = [
  {
    number: "01",
    title: "Cuéntanos tu idea",
    description:
      "Eliges tu plan y nos cuentas qué necesitas: tu rubro, tus productos o servicios, y el estilo que buscas.",
  },
  {
    number: "02",
    title: "Diseñamos tu sitio",
    description:
      "Nuestro equipo diseña y construye tu sitio a medida, con revisiones incluidas hasta que quede como lo imaginaste.",
  },
  {
    number: "03",
    title: "Publicamos y vendes",
    description:
      "Dejamos tu sitio en línea, funcionando y listo para recibir visitas, clientes y ventas desde el primer día.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-ink-50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge-trust">Simple y sin estrés</span>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">Cómo funciona</h2>
          <p className="mt-3 text-ink-500">
            De la idea a tu sitio publicado en tres pasos. Nosotros nos encargamos de todo lo técnico.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="card relative p-8">
              <span className="text-4xl font-extrabold text-brand-100">{step.number}</span>
              <h3 className="mt-3 text-lg font-bold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
