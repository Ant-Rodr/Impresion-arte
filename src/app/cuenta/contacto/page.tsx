"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CuentaContactoPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name || session?.user?.email?.split("@")[0] || "Cliente",
        email: form.email || session?.user?.email,
        subject: form.subject,
        message: form.message,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setForm((f) => ({ ...f, subject: "", message: "" }));
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al enviar el mensaje");
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black">Contacto</h1>

      {success && (
        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-700 dark:text-green-400">Mensaje enviado</p>
              <p className="text-sm text-green-600 dark:text-green-500">Te responderemos en menos de 24h</p>
            </div>
          </div>
        </div>
      )}

      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Nombre</label>
              <input
                value={form.name || session?.user?.email?.split("@")[0] || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Email</label>
              <input
                type="email"
                value={form.email || session?.user?.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Asunto</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary transition-all"
            >
              <option value="">Selecciona un asunto</option>
              <option value="Estado de mi pedido">Estado de mi pedido</option>
              <option value="Consulta sobre materiales">Consulta sobre materiales</option>
              <option value="Presupuesto personalizado">Presupuesto personalizado</option>
              <option value="Problema con mi pedido">Problema con mi pedido</option>
              <option value="Devolución o cambio">Devolución o cambio</option>
              <option value="Consulta B2B / empresas">Consulta B2B / empresas</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Mensaje</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              placeholder="Cuéntanos en qué podemos ayudarte..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </span>
            ) : "Enviar mensaje"}
          </button>
        </form>
      </div>

      {/* Info adicional */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Email directo</p>
            <p className="text-xs text-gray-400 mt-0.5">info@impresion-arte.es</p>
          </div>
        </div>
        <div className="card p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Tiempo de respuesta</p>
            <p className="text-xs text-gray-400 mt-0.5">Menos de 24h laborables</p>
          </div>
        </div>
      </div>
    </div>
  );
}
