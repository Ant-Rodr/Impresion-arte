"use client";

import { useState } from "react";

const DEMO_STEPS = [
  { id: 1, label: "Pedido recibido", description: "Tu pedido ha sido registrado y confirmado.", icon: "📦", status: "completed" as const },
  { id: 2, label: "En preparación", description: "Estamos preparando los materiales y configurando la impresora.", icon: "⚙️", status: "completed" as const },
  { id: 3, label: "Imprimiendo", description: "Tu pieza está siendo impresa ahora mismo.", icon: "🖨️", status: "current" as const },
  { id: 4, label: "Control de calidad", description: "Revisamos cada detalle para garantizar la perfección.", icon: "✅", status: "pending" as const },
  { id: 5, label: "Enviado", description: "Tu pedido ha salido de nuestras instalaciones.", icon: "🚚", status: "pending" as const },
  { id: 6, label: "Entregado", description: "¡Tu pedido ha llegado a su destino!", icon: "🎉", status: "pending" as const },
];

type StepStatus = "completed" | "current" | "pending";

const stepStyles: Record<StepStatus, string> = {
  completed: "bg-emerald-500 text-white border-emerald-500",
  current: "bg-primary text-white border-primary animate-pulse",
  pending: "bg-transparent text-gray-400 border-gray-600",
};

const lineStyles: Record<StepStatus, string> = {
  completed: "bg-emerald-500",
  current: "bg-gradient-to-b from-emerald-500 to-primary",
  pending: "bg-gray-700",
};

export default function SeguimientoPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24">
      <div className="max-w-2xl mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Tracking
          </span>
          <h1
            className="text-5xl mb-4 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Seguimiento de pedido
          </h1>
          <p className="text-gray-400">
            Introduce tu número de pedido para ver el estado actual.
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="card p-6 mb-10 flex gap-3">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => { setOrderNumber(e.target.value); setSubmitted(false); }}
            placeholder="Ej. IMP-2026-00123"
            className="flex-1 px-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <button type="submit" className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
            Buscar pedido
          </button>
        </form>

        {/* Timeline */}
        {submitted && (
          <div className="card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Número de pedido</p>
                <p className="font-bold text-white text-lg">{orderNumber}</p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                En proceso
              </span>
            </div>

            <div className="relative">
              {DEMO_STEPS.map((step, idx) => (
                <div key={step.id} className="flex gap-5 relative">
                  {/* Connector line */}
                  {idx < DEMO_STEPS.length - 1 && (
                    <div className="absolute left-[18px] top-10 bottom-0 w-0.5 z-0">
                      <div className={`w-full h-full ${lineStyles[step.status]}`} />
                    </div>
                  )}

                  {/* Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-base transition-all duration-300 ${stepStyles[step.status]}`}
                    >
                      {step.status === "completed" ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm">{step.icon}</span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`pb-8 ${idx === DEMO_STEPS.length - 1 ? "pb-0" : ""}`}>
                    <p
                      className={`font-bold text-sm ${
                        step.status === "completed"
                          ? "text-emerald-400"
                          : step.status === "current"
                          ? "text-primary"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                      {step.status === "current" && (
                        <span className="ml-2 text-xs font-normal text-primary/70 animate-pulse">● En curso</span>
                      )}
                    </p>
                    <p className={`text-xs mt-1 ${step.status === "pending" ? "text-gray-600" : "text-gray-400"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-dark-border text-center">
              <p className="text-xs text-gray-500">
                Estimación de entrega: <span className="text-white font-semibold">24-48 horas</span>
              </p>
            </div>
          </div>
        )}

        {!submitted && (
          <div className="text-center text-gray-500 text-sm py-8">
            <div className="text-6xl mb-4">📬</div>
            <p>Introduce tu número de pedido para ver el seguimiento.</p>
            <p className="text-xs mt-2 text-gray-600">
              Puedes encontrarlo en el email de confirmación que te enviamos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
