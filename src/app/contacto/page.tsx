"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Error al enviar");

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado");
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Contacto</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
              Contacto
            </span>
            <h1 className="text-4xl font-black mb-4">
              Hablemos <span className="gradient-text">de tu idea</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              ¿Tienes un proyecto en mente? ¿Necesitas ayuda para elegir el material o calcular el coste?
              Estamos aquí para ayudarte.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: "Email",
                  value: "info@impresion-arte.es",
                  href: "mailto:info@impresion-arte.es",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Tiempo de respuesta",
                  value: "Menos de 24h",
                  href: null,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: "Ubicación",
                  value: "España",
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-semibold hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="card p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black mb-3">¡Mensaje enviado!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Hemos recibido tu consulta. Te responderemos en menos de 24 horas.
                </p>
                <Link href="/" className="btn-primary">Volver al inicio</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                {status === "error" && (
                  <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      disabled={status === "loading"}
                      className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      disabled={status === "loading"}
                      className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">Asunto</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Cuéntanos los detalles de tu proyecto..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>

                <p className="text-xs text-center text-gray-400">
                  Respuesta garantizada en menos de 24h · Sin spam
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
