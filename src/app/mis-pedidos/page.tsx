"use client";

import { useState } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "confirmed" | "printing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  type: string;
  status: OrderStatus;
  material: string | null;
  acabado: string | null;
  totalPrice: number | null;
  createdAt: string;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  printing: "Imprimiendo",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  printing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_STEPS: OrderStatus[] = ["pending", "confirmed", "printing", "shipped", "delivered"];

export default function MisPedidosPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    setSearched(false);
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email.trim())}`);
      if (!res.ok) {
        setError("Error al buscar pedidos");
        return;
      }
      const data = await res.json();
      setOrders(data);
      setSearched(true);
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function getStepIndex(status: OrderStatus) {
    return STATUS_STEPS.indexOf(status);
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Mis Pedidos</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-black mb-2">Seguimiento de pedidos</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Introduce el email con el que realizaste tu pedido para ver su estado.
          </p>
        </div>

        <form onSubmit={handleSearch} className="card p-6 mb-8">
          <label className="block text-sm font-semibold mb-2">
            Email del pedido
          </label>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary text-sm !py-2.5 gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )}
              Buscar
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-3">{error}</p>
          )}
        </form>

        {searched && orders.length === 0 && (
          <div className="card p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">No encontramos pedidos con ese email</p>
            <p className="text-sm text-gray-500 mt-1">Comprueba que el email es el mismo que usaste al hacer el pedido</p>
            <Link href="/contacto" className="btn-secondary text-sm !py-2 mt-4 inline-flex">
              Contactar soporte
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {orders.length} {orders.length === 1 ? "pedido encontrado" : "pedidos encontrados"} para{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">{email}</span>
            </p>

            {orders.map((order) => {
              const stepIndex = getStepIndex(order.status);
              const isCancelled = order.status === "cancelled";

              return (
                <div key={order.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-400">#{order.id.slice(-8).toUpperCase()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>
                          {STATUS_LABELS[order.status]}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="capitalize">{order.type === "custom" ? "Personalizado" : "Catálogo"}</span>
                        {order.material && <><span>·</span><span>{order.material}</span></>}
                        {order.totalPrice && (
                          <><span>·</span><span className="font-semibold text-primary">{order.totalPrice.toFixed(2).replace(".", ",")}€</span></>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {!isCancelled && (
                    <div className="mt-4">
                      <div className="flex items-center gap-0">
                        {STATUS_STEPS.map((step, idx) => {
                          const done = idx <= stepIndex;
                          const current = idx === stepIndex;
                          return (
                            <div key={step} className="flex items-center flex-1">
                              <div className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                done
                                  ? "bg-primary text-white"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                              } ${current ? "ring-4 ring-primary/20" : ""}`}>
                                {done && idx < stepIndex ? (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                  </svg>
                                ) : (
                                  <span>{idx + 1}</span>
                                )}
                              </div>
                              {idx < STATUS_STEPS.length - 1 && (
                                <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${
                                  idx < stepIndex ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                                }`} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2">
                        {STATUS_STEPS.map((step) => (
                          <div key={step} className="flex-1 text-center">
                            <span className={`text-[10px] font-medium ${
                              step === order.status ? "text-primary" : "text-gray-400"
                            }`}>
                              {STATUS_LABELS[step]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isCancelled && (
                    <p className="text-sm text-red-500 mt-2">
                      Este pedido fue cancelado. Para más información{" "}
                      <Link href="/contacto" className="underline">contacta con nosotros</Link>.
                    </p>
                  )}
                </div>
              );
            })}

            <p className="text-xs text-center text-gray-400 pt-2">
              ¿Problemas con tu pedido?{" "}
              <Link href="/contacto" className="text-primary hover:underline">
                Contacta con soporte
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
