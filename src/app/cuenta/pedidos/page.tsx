"use client";

import { useEffect, useState } from "react";
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
  description: string | null;
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

export default function MisPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    fetch("/api/cuenta/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black">Mis Pedidos</h1>
        <Link href="/personalizado" className="btn-primary text-sm !py-2 gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nuevo pedido
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {([["all", "Todos"], ["pending", "Pendiente"], ["printing", "Imprimiendo"], ["shipped", "Enviado"], ["delivered", "Entregado"]] as [string, string][]).map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val as typeof filter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === val
                ? "bg-primary text-white"
                : "bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-gray-500 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card p-16 text-center text-gray-400">Cargando pedidos...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-gray-500 mb-4">{orders.length === 0 ? "Todavía no tienes pedidos" : "Sin pedidos con este estado"}</p>
          {orders.length === 0 && (
            <Link href="/catalogo" className="btn-primary text-sm !py-2">Explorar catálogo</Link>
          )}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {filtered.map((order) => (
              <Link
                key={order.id}
                href={`/cuenta/pedidos/${order.id}`}
                className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group"
              >
                {/* Icono */}
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm">
                      {order.type === "custom" ? "Pedido personalizado" : "Pedido catálogo"}
                    </p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold hidden sm:inline-flex ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>#{order.id.slice(-8).toUpperCase()}</span>
                    {order.material && <><span>·</span><span>{order.material}</span></>}
                    <span>·</span>
                    <span>{new Date(order.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  </div>
                </div>

                {/* Precio + flecha */}
                <div className="flex items-center gap-3 shrink-0">
                  {order.totalPrice ? (
                    <span className="font-bold text-primary">{order.totalPrice.toFixed(2).replace(".", ",")}€</span>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Presupuesto pendiente</span>
                  )}
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
