"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQty, clear, total, count, isOpen, closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al iniciar el pago");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-light-card dark:bg-dark-card border-l border-light-border dark:border-dark-border z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-light-border dark:border-dark-border">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h2 className="text-lg font-bold">
              Carrito{" "}
              {count > 0 && (
                <span className="text-sm font-normal text-gray-500">({count} {count === 1 ? "artículo" : "artículos"})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500 mt-1">Añade productos del catálogo para empezar</p>
              </div>
              <button
                onClick={closeCart}
                className="btn-primary text-sm !py-2"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-xl border border-light-border dark:border-dark-border bg-gray-50 dark:bg-dark-bg"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight">{item.product.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.material}</p>
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-1 text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-primary">
                        {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}€
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="self-start p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={clear}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-center py-2"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-light-border dark:border-dark-border space-y-4">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-2">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total (IVA incl.)</span>
              <span className="text-2xl font-black text-primary">
                {total.toFixed(2).replace(".", ",")}€
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Pagar con Stripe
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-400">
              Pago seguro · Stripe · SSL cifrado
            </p>
          </div>
        )}
      </div>
    </>
  );
}
