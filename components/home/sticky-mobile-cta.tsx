import Link from "next/link";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink-100 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link href="/productos" className="btn-cta block w-full">
        Quiero mi sitio web
      </Link>
    </div>
  );
}
