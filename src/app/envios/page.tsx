import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones | Impresion-arte",
  description: "Información sobre plazos de envío, costes y política de devoluciones de Impresion-arte.",
};

export default function EnviosPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Envíos y Devoluciones</span>
        </nav>

        <h1 className="text-3xl font-black mb-2">Envíos y Devoluciones</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril 2025</p>

        <div className="space-y-8">
          {/* Envíos */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                🚚
              </span>
              Envíos
            </h2>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "España Peninsular", time: "2–3 días laborables", price: "4,95€ (gratis +50€)" },
                  { label: "Baleares / Canarias", time: "3–5 días laborables", price: "9,95€" },
                  { label: "Europa (UE)", time: "5–10 días laborables", price: "Consultar" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-light-border dark:border-dark-border p-4">
                    <p className="font-semibold mb-1">{s.label}</p>
                    <p className="text-gray-500">{s.time}</p>
                    <p className="text-primary font-bold mt-1">{s.price}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500">
                Los pedidos se procesan en 1–2 días laborables. El tiempo de producción es adicional al
                plazo de envío. Recibirás un email con número de seguimiento cuando tu pedido salga.
              </p>
            </div>
          </div>

          {/* Devoluciones */}
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm">
                ↩️
              </span>
              Devoluciones
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Catálogo: 14 días</p>
                <p>Productos de catálogo sin usar pueden devolverse en 14 días. El coste de envío de devolución
                  corre a cargo del cliente salvo defecto de fabricación.</p>
              </div>
              <div className="rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
                <p className="font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Personalizados: no reembolsables</p>
                <p>Los pedidos a medida no admiten devolución salvo error o defecto imputable a
                  Impresion-arte. En ese caso, reimprimimos o reembolsamos a nuestra elección.</p>
              </div>
              <p>Para iniciar una devolución, contacta en info@impresion-arte.es indicando tu número de pedido.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
