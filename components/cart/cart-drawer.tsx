"use client";

import Image from "next/image";
import { useCart } from "./cart-context";
import { formatMoney } from "@/lib/utils";
import { CloseIcon, MinusIcon, PlusIcon, ShieldIcon } from "@/components/icons";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isPending } = useCart();
  const lines = cart?.lines ?? [];

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-ink-950/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h2 className="text-lg font-bold text-ink-900">
            Tu carrito {lines.length > 0 && <span className="text-ink-400">({cart?.totalQuantity})</span>}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-full p-2 text-ink-500 hover:bg-ink-50 hover:text-ink-800"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-ink-500">Tu carrito está vacío.</p>
            <button onClick={closeCart} className="btn-outline">
              Ver servicios
            </button>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-50">
                  {line.merchandise.product.featuredImage ? (
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">🌐</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-semibold text-ink-900">{line.merchandise.product.title}</p>
                  {line.merchandise.title !== "Default Title" && (
                    <p className="text-xs text-ink-500">{line.merchandise.title}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink-200">
                      <button
                        disabled={isPending}
                        onClick={() => updateItem(line.id, line.quantity - 1)}
                        aria-label="Disminuir cantidad"
                        className="p-1.5 text-ink-600 hover:text-brand-700 disabled:opacity-40"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium">{line.quantity}</span>
                      <button
                        disabled={isPending}
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        aria-label="Aumentar cantidad"
                        className="p-1.5 text-ink-600 hover:text-brand-700 disabled:opacity-40"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-ink-900">{formatMoney(line.cost.totalAmount)}</span>
                  </div>
                </div>
                <button
                  disabled={isPending}
                  onClick={() => removeItem(line.id)}
                  aria-label="Quitar del carrito"
                  className="self-start text-ink-300 hover:text-accent-600 disabled:opacity-40"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && cart && (
          <div className="space-y-3 border-t border-ink-100 px-5 py-4">
            <div className="flex items-center justify-between text-sm text-ink-500">
              <span>Subtotal</span>
              <span className="font-semibold text-ink-900">{formatMoney(cart.cost.subtotalAmount)}</span>
            </div>
            <a
              href={cart.checkoutUrl}
              className="btn-cta w-full"
              aria-disabled={isPending}
            >
              Ir a pagar de forma segura
            </a>
            <p className="flex items-center justify-center gap-1.5 text-xs text-ink-400">
              <ShieldIcon className="h-3.5 w-3.5 text-success-600" />
              Pago 100% seguro procesado por Shopify
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
