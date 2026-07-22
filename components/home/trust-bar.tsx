const STATS = [
  { value: "500+", label: "sitios entregados" },
  { value: "7 días", label: "tiempo promedio de entrega" },
  { value: "4.9/5", label: "satisfacción de clientes" },
  { value: "100%", label: "pago seguro con Shopify" },
];

export function TrustBar() {
  return (
    <section className="border-b border-ink-100 bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-500 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
