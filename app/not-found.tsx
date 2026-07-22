import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center gap-4 py-32 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="text-2xl font-extrabold text-ink-900">No encontramos esta página</h1>
      <p className="max-w-sm text-ink-500">
        El contenido que buscas ya no está disponible o cambió de dirección.
      </p>
      <Link href="/" className="btn-cta">
        Volver al inicio
      </Link>
    </div>
  );
}
