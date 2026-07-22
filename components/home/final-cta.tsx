import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-gradient-to-br from-accent-500 to-accent-600 py-16 text-white">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl">
          Tu negocio merece un sitio web a la altura
        </h2>
        <p className="max-w-md text-accent-50">
          Empieza hoy y ten tu sitio web publicado en días, no meses.
        </p>
        <Link href="/productos" className="btn bg-white text-accent-700 hover:bg-accent-50">
          Quiero mi sitio web
        </Link>
      </div>
    </section>
  );
}
