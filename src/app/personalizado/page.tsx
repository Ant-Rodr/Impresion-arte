"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MATERIALS, ACABADOS } from "@/data/constants";

const Viewer3D = dynamic(() => import("@/components/Viewer3D"), { ssr: false });

export default function PersonalizadoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    material: "pla",
    acabado: "raw",
    desc: "",
  });
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          material: MATERIALS[form.material].label,
          acabado: ACABADOS[form.acabado].label,
          description: form.desc,
          fileUrl: uploadedFile?.url ?? null,
          fileName: uploadedFile?.name ?? null,
        }),
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Personalizar</span>
        </nav>

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Pedido personalizado
          </span>
          <h1 className="text-4xl font-black mb-4">
            Tu idea, <span className="gradient-text">nuestra impresora</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Cuéntanos qué necesitas y te damos un presupuesto en menos de 24h.
          </p>
        </div>

        {status === "success" ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-black mb-3">¡Solicitud enviada!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Te contactaremos en menos de 24h con tu presupuesto personalizado.
              Revisa tu bandeja de entrada.
            </p>
            <Link href="/" className="btn-primary">Volver al inicio</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-8 space-y-8">
            {status === "error" && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {errorMsg}
              </div>
            )}

            {/* 1. Material */}
            <div>
              <label className="block text-sm font-semibold mb-3">1. Elige el material</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(MATERIALS).map(([id, m]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm({ ...form, material: id })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      form.material === id
                        ? "border-primary bg-primary/10"
                        : "border-light-border dark:border-dark-border hover:border-primary/50"
                    }`}
                  >
                    <p className={`font-semibold text-sm ${form.material === id ? "text-primary" : ""}`}>
                      {m.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {m.desc} · {m.pricePerCm3.toFixed(2).replace(".", ",")}€/cm³
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Acabado */}
            <div>
              <label className="block text-sm font-semibold mb-3">2. Acabado / Post-procesado</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(ACABADOS).map(([id, a]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm({ ...form, acabado: id })}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-center ${
                      form.acabado === id
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-light-border dark:border-dark-border hover:border-accent/50"
                    }`}
                  >
                    {a.label}
                    {a.multiplier > 1 && (
                      <span className="block text-[10px] opacity-60 mt-0.5">×{a.multiplier}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Visor 3D */}
            <Viewer3D onFileUploaded={(f) => setUploadedFile({ name: f.name, url: f.url })} />

            {/* 4. Descripción */}
            <div>
              <label htmlFor="desc" className="block text-sm font-semibold mb-2">
                4. Describe tu pieza
              </label>
              <textarea
                id="desc"
                rows={4}
                placeholder="Dimensiones aproximadas, uso previsto, referencias, cantidad, etc."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                required
                disabled={status === "loading"}
                className="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-60"
              />
            </div>

            {/* 5. Contacto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando solicitud...
                </span>
              ) : (
                "Enviar solicitud de presupuesto"
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              Respuesta garantizada en menos de 24h · Sin compromiso · Recibirás confirmación por email
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
