"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type OrderStatus = "pending" | "confirmed" | "printing" | "shipped" | "delivered" | "cancelled";

interface OrderDetail {
  id: string;
  type: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  material: string | null;
  acabado: string | null;
  description: string | null;
  fileUrl: string | null;
  fileName: string | null;
  totalPrice: number | null;
  adminNotes: string | null;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: { name: string; material: string };
  }>;
}

const STATUS_STEPS: OrderStatus[] = ["pending", "confirmed", "printing", "shipped", "delivered"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  printing: "Imprimiendo",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default function PedidoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/cuenta/orders?id=${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setOrder)
      .catch(() => setError("Pedido no encontrado"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="card p-16 text-center text-gray-400">Cargando...</div>;
  if (error || !order) return (
    <div className="card p-16 text-center">
      <p className="text-gray-500 mb-4">{error}</p>
      <Link href="/cuenta/pedidos" className="btn-primary text-sm !py-2">Volver a pedidos</Link>
    </div>
  );

  const stepIndex = STATUS_STEPS.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/cuenta/pedidos" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-black">Pedido #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-gray-400">
            {new Date(order.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Estado / Progress */}
      {!isCancelled ? (
        <div className="card p-6">
          <h2 className="font-bold mb-5">Estado del pedido</h2>
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, idx) => {
              const done = idx <= stepIndex;
              const current = idx === stepIndex;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${done ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"} ${current ? "ring-4 ring-primary/20" : ""}`}>
                    {done && idx < stepIndex ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : <span>{idx + 1}</span>}
                  </div>
                  {idx < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-1 rounded-full transition-all ${idx < stepIndex ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3">
            {STATUS_STEPS.map((step) => (
              <div key={step} className="flex-1 text-center">
                <span className={`text-[10px] font-medium ${step === order.status ? "text-primary" : "text-gray-400"}`}>
                  {STATUS_LABELS[step]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-5 border-red-200 dark:border-red-900">
          <p className="text-red-500 font-semibold">Pedido cancelado</p>
          {order.adminNotes && <p className="text-sm text-gray-500 mt-1">{order.adminNotes}</p>}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Detalles del pedido */}
        <div className="card p-6">
          <h2 className="font-bold mb-4">Detalles</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tipo</span>
              <span className="font-medium capitalize">{order.type === "custom" ? "Personalizado" : "Catálogo"}</span>
            </div>
            {order.material && (
              <div className="flex justify-between">
                <span className="text-gray-500">Material</span>
                <span className="font-medium">{order.material}</span>
              </div>
            )}
            {order.acabado && (
              <div className="flex justify-between">
                <span className="text-gray-500">Acabado</span>
                <span className="font-medium capitalize">{order.acabado}</span>
              </div>
            )}
            {order.totalPrice != null && (
              <div className="flex justify-between border-t border-light-border dark:border-dark-border pt-3 mt-3">
                <span className="font-semibold">Total</span>
                <span className="font-black text-primary text-base">{order.totalPrice.toFixed(2).replace(".", ",")}€</span>
              </div>
            )}
            {order.totalPrice == null && (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-4 py-3 mt-2">
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Presupuesto en proceso</p>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">Te enviaremos el presupuesto en menos de 24h</p>
              </div>
            )}
          </div>
        </div>

        {/* Notas admin / Descripción */}
        <div className="space-y-4">
          {order.description && (
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-2 text-gray-500 uppercase tracking-wider">Tu descripción</h3>
              <p className="text-sm leading-relaxed">{order.description}</p>
            </div>
          )}
          {order.fileName && (
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-2 text-gray-500 uppercase tracking-wider">Archivo adjunto</h3>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
                <span className="font-mono text-xs truncate">{order.fileName}</span>
              </div>
            </div>
          )}
          {order.adminNotes && !isCancelled && (
            <div className="card p-5 border-primary/20">
              <h3 className="font-semibold text-sm mb-2 text-primary uppercase tracking-wider">Nota del taller</h3>
              <p className="text-sm leading-relaxed">{order.adminNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Items de catálogo */}
      {order.items && order.items.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-light-border dark:border-dark-border">
            <h2 className="font-bold">Productos del pedido</h2>
          </div>
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-400">{item.product.material} · x{item.quantity}</p>
                </div>
                <p className="font-bold text-primary">{(item.price * item.quantity).toFixed(2).replace(".", ",")}€</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contacto */}
      <div className="card p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-semibold">¿Tienes alguna duda sobre este pedido?</p>
          <p className="text-sm text-gray-400 mt-0.5">Nuestro equipo te responde en menos de 24h</p>
        </div>
        <Link href="/cuenta/contacto" className="btn-secondary text-sm !py-2 shrink-0">
          Contactar
        </Link>
      </div>
    </div>
  );
}
