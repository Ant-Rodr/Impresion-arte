"use client";

import Link from "next/link";
import { useState } from "react";

const benefits = [
  {
    id: "ingenieria",
    tab: "Ingeniería",
    title: "Prototipado Rápido para Ingeniería",
    desc: "Piezas funcionales en 24-72h para validar diseños antes de producción. Tolerancias precisas en PETG, PLA o resina técnica.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: "#6C3CE1",
    tags: ["Tolerancia ±0.2mm", "Entrega exprés", "Materiales técnicos"],
  },
  {
    id: "arquitectura",
    tab: "Arquitectura",
    title: "Maquetas para Arquitectura",
    desc: "Maquetas a escala y modelos de presentación de alta fidelidad. Desde volumetrías urbanas hasta detalle de fachadas.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: "#06D6A0",
    tags: ["Escalas personalizadas", "Multi-material", "Alta resolución"],
  },
  {
    id: "marketing",
    tab: "Marketing",
    title: "Merchandising Corporativo",
    desc: "Regalos de empresa, trofeos personalizados, stands de producto y displays de marca. Producción en serie con descuentos por volumen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: "#F59E0B",
    tags: ["Descuento por volumen", "Logotipo integrado", "Entrega coordinada"],
  },
];

const trustedBy = ["Ingeniería", "Arquitectura", "Marketing", "Fabricación", "I+D"];

export default function B2BSection() {
  const [activeTab, setActiveTab] = useState(0);
  const active = benefits[activeTab];

  return (
    <section id="empresas" className="bg-light-card dark:bg-dark-card section-padding border-y border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-4 uppercase tracking-widest">
            Soluciones para Empresas
          </span>
          <h2 className="text-4xl font-black mb-4">
            Servicios <span className="gradient-text">B2B</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Trabajamos con equipos de ingeniería, estudios de arquitectura y departamentos de marketing
            que necesitan piezas 3D profesionales de forma recurrente.
          </p>

          {/* Sectores */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {trustedBy.map((sector) => (
              <span
                key={sector}
                className="px-3 py-1 text-xs font-medium rounded-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-gray-500 dark:text-gray-400"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs de categorías */}
        <div className="overflow-x-auto mb-8">
          <div className="flex flex-nowrap gap-2 min-w-max sm:min-w-0 sm:justify-center">
            {benefits.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-xl text-sm transition-all duration-200 ${
                  activeTab === i
                    ? "bg-purple-600 border border-purple-600 text-white font-medium"
                    : "bg-transparent border border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {b.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del tab activo */}
        <div className="py-8">
          <div
            className="card p-7 relative overflow-hidden max-w-2xl mx-auto"
            style={{ borderColor: active.color + "40" }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 translate-x-10 -translate-y-10"
              style={{ backgroundColor: active.color }}
            />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: active.color + "1A", color: active.color }}
            >
              {active.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{active.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{active.desc}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ backgroundColor: active.color + "15", color: active.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA diferenciado */}
        <div className="mt-16 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black mb-4">
            ¿Tu empresa necesita piezas 3D de forma recurrente?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
            Accede a precios especiales por volumen, tiempos de entrega prioritarios y un gestor de cuenta dedicado.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto?tipo=b2b"
              className="btn-accent text-base px-8 py-4"
            >
              Solicitar Presupuesto B2B
            </Link>
            <Link
              href="/contacto"
              className="btn-secondary text-base px-8 py-4"
            >
              Hablar con un especialista
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Respuesta en menos de 4h en horario laboral · Sin compromiso
          </p>
        </div>
      </div>
    </section>
  );
}
