import { ChevronDownIcon } from "@/components/icons";

const FAQS = [
  {
    q: "¿Cuánto tiempo toma tener mi sitio web listo?",
    a: "En promedio, 7 días hábiles desde que confirmamos el contenido y diseño contigo. Proyectos a medida pueden tomar más, y te damos un plazo claro antes de empezar.",
  },
  {
    q: "¿Necesito saber de tecnología o diseño?",
    a: "No. Tú nos cuentas tu negocio y tus ideas, nosotros nos encargamos de todo el proceso técnico y de diseño de principio a fin.",
  },
  {
    q: "¿El pago es único o tiene mensualidades?",
    a: "El desarrollo de tu sitio es un pago único. Si más adelante quieres hosting, dominio o mantenciones adicionales, te ofrecemos planes opcionales, nunca obligatorios.",
  },
  {
    q: "¿Puedo pedir cambios después de ver el diseño?",
    a: "Sí, cada plan incluye rondas de revisión para que el resultado final sea exactamente lo que necesitas.",
  },
  {
    q: "¿Qué pasa si no quedo conforme?",
    a: "Trabajamos contigo hasta que el sitio cumpla lo acordado. Nuestro objetivo es que tengas un sitio que realmente represente y haga crecer tu negocio.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-3 text-ink-500">Todo lo que necesitas saber antes de empezar.</p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl divide-y divide-ink-100">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-ink-900">
                {item.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
