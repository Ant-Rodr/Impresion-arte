import { prisma } from "@/lib/prisma";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  printing: "Imprimiendo",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  printing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  shipped: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default async function AdminDashboard() {
  const [ordersCount, pendingCount, contactsCount, unreadCount, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { read: false } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        type: true,
        status: true,
        customerName: true,
        customerEmail: true,
        material: true,
        totalPrice: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    { label: "Pedidos totales", value: ordersCount, color: "text-primary" },
    { label: "Pedidos pendientes", value: pendingCount, color: "text-yellow-500" },
    { label: "Mensajes de contacto", value: contactsCount, color: "text-blue-500" },
    { label: "Sin leer", value: unreadCount, color: "text-red-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Resumen de actividad</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border p-5">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
          <h2 className="font-bold">Pedidos recientes</h2>
          <a href="/admin/pedidos" className="text-sm text-primary hover:underline">Ver todos</a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            No hay pedidos todavía
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  {["ID", "Cliente", "Material", "Precio", "Estado", "Fecha"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border">
                {recentOrders.map((order: typeof recentOrders[number]) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{order.material ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold">
                      {order.totalPrice ? `${order.totalPrice.toFixed(2)}€` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] ?? ""}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
