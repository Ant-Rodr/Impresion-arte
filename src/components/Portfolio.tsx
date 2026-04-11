"use client";

import { useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    category: "gaming",
    categoryLabel: "Gaming",
    color: "#6C3CE1",
    name: "Soporte triple monitor curvo",
    material: "PLA Silk Blanco",
    finish: "Lijado",
    dimensions: "28×12×8 cm",
    price: 34,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    category: "mesa-rol",
    categoryLabel: "Mesa & Rol",
    color: "#06D6A0",
    name: "Miniaturas D&D Barbarian 32mm",
    material: "Resina gris",
    finish: "Imprimación",
    dimensions: "32 mm escala",
    price: 8,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313" />
      </svg>
    ),
  },
  {
    category: "decoracion",
    categoryLabel: "Decoración",
    color: "#F59E0B",
    name: "Maceta geométrica hexagonal Ø18",
    material: "PLA Silk Dorado",
    finish: "Pieza en crudo",
    dimensions: "Ø18×14 cm",
    price: 26,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    category: "cosplay",
    categoryLabel: "Cosplay",
    color: "#EC4899",
    name: "Casco Iron Man MK50 1:1",
    material: "PLA Estándar",
    finish: "Pintado a mano",
    dimensions: "Talla única adulto",
    price: 185,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    category: "gaming",
    categoryLabel: "Gaming",
    color: "#6C3CE1",
    name: "Rack modular periféricos escritorio",
    material: "PLA Silk Negro",
    finish: "Pieza en crudo",
    dimensions: "40×20×15 cm",
    price: 22,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    category: "decoracion",
    categoryLabel: "Decoración",
    color: "#F59E0B",
    name: "Litofanía familiar 20×15 cm",
    material: "PLA Blanco",
    finish: "Pieza en crudo",
    dimensions: "20×15 cm",
    price: 22,
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

const FILTERS = [
  { value: "all", label: "Todos" },
  { value: "gaming", label: "Gaming" },
  { value: "mesa-rol", label: "Mesa & Rol" },
  { value: "decoracion", label: "Decoración" },
  { value: "cosplay", label: "Cosplay" },
];

export default function Portfolio() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Proyectos <span className="gradient-text">realizados</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Una muestra de lo que fabricamos cada semana. Desde piezas únicas hasta lotes para empresas.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                active === f.value
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-gray-600 dark:text-gray-300 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="card p-6 group hover:border-primary/30 transition-all duration-300"
            >
              {/* Imagen placeholder con icono */}
              <div
                className="w-full h-44 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: p.color + "12" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: p.color + "18" }}
                />
                <span style={{ color: p.color + "80" }}>
                  {p.icon}
                </span>
              </div>

              {/* Badge categoría */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: p.color + "20", color: p.color }}
                >
                  {p.categoryLabel}
                </span>
                <span className="text-xs text-gray-400">desde {p.price}€</span>
              </div>

              <h3 className="font-bold text-base mb-3 leading-snug">{p.name}</h3>

              {/* Detalles */}
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-5">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  {p.material}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  {p.finish}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  {p.dimensions}
                </div>
              </div>

              <Link
                href="/personalizado"
                className="btn-primary w-full text-sm !py-2.5"
              >
                Pedir similar
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          ¿Quieres algo así?{" "}
          <Link href="/personalizado" className="text-primary hover:underline font-semibold">
            Solicita tu presupuesto en 24h
          </Link>
        </p>
      </div>
    </section>
  );
}
