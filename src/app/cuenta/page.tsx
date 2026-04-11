"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "confirmed" | "printing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  type: string;
  status: OrderStatus;
  material: string | null;
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

export default function CuentaDashboard() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cuenta/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const userName = session?.user?.name ?? session?.user?.email?.split("@")[0] ?? "Cliente";
  const pending = orders.filter((o) => o.status === "pending" || o.status === "confirmed" || o.status === "printing").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const recent = orders.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <div className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shrink-0">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-gray-500">Bienvenido,</p>
            <h1 className="text-2xl font-black">{userName}</h1>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Pedidos totales", value: orders.length, color: "text-primary", bg: "bg-primary/10" },
          { label: "En proceso", value: pending, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/20" },
          { label: "Entregados", value: delivered, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/personalizado"
          className="card p-5 flex items-center gap-4 hover:border-primary/40 group transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Nuevo pedido personalizado</p>
            <p className="text-sm text-gray-400">Sube tu archivo STL o descríbenos la pieza</p>
          </div>
        </Link>

        <Link
          href="/catalogo"
          className="card p-5 flex items-center gap-4 hover:border-accent/40 group transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Ver catálogo</p>
            <p className="text-sm text-gray-400">Productos listos para pedir</p>
          </div>
        </Link>
      </div>

      {/* Pedidos recientes */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-border dark:border-dark-border">
          <h2 className="font-bold">Pedidos recientes</h2>
          {orders.length > 4 && (
            <Link href="/cuenta/pedidos" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          )}
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Cargando...</div>
        ) : recent.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500 mb-4">Todavía no tienes pedidos</p>
            <Link href="/catalogo" className="btn-primary text-sm !py-2">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {recent.map((order) => (
              <Link
                key={order.id}
                href={`/cuenta/pedidos/${order.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {order.type === "custom" ? "Pedido personalizado" : "Pedido catálogo"}
                    </p>
                    <p className="text-xs text-gray-400">
                      #{order.id.slice(-8).toUpperCase()} · {new Date(order.createdAt).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold hidden sm:inline-flex ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                  {order.totalPrice && (
                    <span className="text-sm font-bold text-primary">{order.totalPrice.toFixed(2).replace(".", ",")}€</span>
                  )}
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
