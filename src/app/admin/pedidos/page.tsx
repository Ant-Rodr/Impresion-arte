"use client";

import { useEffect, useState } from "react";

type OrderStatus = "pending" | "confirmed" | "printing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  type: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  material?: string;
  acabado?: string;
  description?: string;
  fileName?: string;
  fileUrl?: string;
  totalPrice?: number;
  adminNotes?: string;
  createdAt: string;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "printing", label: "Imprimiendo" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  printing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  shipped: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Order | null>(null);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<{ status: OrderStatus; adminNotes: string; totalPrice: string }>({
    status: "pending",
    adminNotes: "",
    totalPrice: "",
  });

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openOrder = (order: Order) => {
    setSelected(order);
    setEditForm({
      status: order.status,
      adminNotes: order.adminNotes ?? "",
      totalPrice: order.totalPrice?.toString() ?? "",
    });
  };

  const saveOrder = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selected.id,
        status: editForm.status,
        adminNotes: editForm.adminNotes,
        totalPrice: editForm.totalPrice || undefined,
      }),
    });
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? { ...o, ...updated } : o)));
    setSelected(null);
    setSaving(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-24 text-gray-400">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black mb-1">Pedidos</h1>
        <p className="text-gray-500 text-sm">{orders.length} pedidos en total</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No hay pedidos todavía</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  {["ID", "Cliente", "Material / Acabado", "Archivo", "Precio", "Estado", "Fecha", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      <p>{order.material ?? "—"}</p>
                      {order.acabado && <p className="text-xs text-gray-400">{order.acabado}</p>}
                    </td>
                    <td className="px-4 py-3">
                      {order.fileUrl ? (
                        <a href={order.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                          {order.fileName ?? "Ver archivo"}
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">Sin archivo</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {order.totalPrice ? `${order.totalPrice.toFixed(2)}€` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                        {STATUS_OPTIONS.find((s) => s.value === order.status)?.label ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openOrder(order)}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de edición */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Pedido #{selected.id.slice(0, 8).toUpperCase()}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
              <p><span className="font-semibold">Cliente:</span> {selected.customerName} ({selected.customerEmail})</p>
              <p><span className="font-semibold">Material:</span> {selected.material ?? "—"}</p>
              <p><span className="font-semibold">Acabado:</span> {selected.acabado ?? "—"}</p>
              {selected.description && <p className="text-xs text-gray-400 mt-2 whitespace-pre-wrap">{selected.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Estado</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as OrderStatus })}
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Precio final (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={editForm.totalPrice}
                onChange={(e) => setEditForm({ ...editForm, totalPrice: e.target.value })}
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Notas internas</label>
              <textarea
                rows={3}
                placeholder="Notas visibles solo para el admin..."
                value={editForm.adminNotes}
                onChange={(e) => setEditForm({ ...editForm, adminNotes: e.target.value })}
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1 !py-2.5 text-sm">
                Cancelar
              </button>
              <button
                onClick={saveOrder}
                disabled={saving}
                className="btn-primary flex-1 !py-2.5 text-sm disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
