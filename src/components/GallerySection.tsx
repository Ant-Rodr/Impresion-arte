"use client";

import { useState } from "react";
import Link from "next/link";

const filters = ["Todos", "Gaming", "Mesa & Rol", "Decoración", "Cosplay"];

const items = [
  {
    id: 1,
    cat: "Gaming",
    title: "Soporte triple monitor curvo",
    mat: "PLA Silk Blanco",
    finish: "Lijado",
    size: "28×12×8 cm",
    price: "desde 34€",
    gradient: "from-violet-900/80 to-purple-950/60",
    accent: "#7C3AED",
  },
  {
    id: 2,
    cat: "Gaming",
    title: "Torre carga mandos + auriculares",
    mat: "PLA Negro Mate",
    finish: "En crudo",
    size: "15×10×22 cm",
    price: "desde 18€",
    gradient: "from-indigo-900/80 to-slate-950/60",
    accent: "#6366F1",
  },
  {
    id: 3,
    cat: "Gaming",
    title: "Base mecánica palancas arcade",
    mat: "PETG Negro",
    finish: "En crudo",
    size: "40×30×6 cm",
    price: "desde 52€",
    gradient: "from-purple-900/80 to-indigo-950/60",
    accent: "#8B5CF6",
  },
  {
    id: 4,
    cat: "Mesa & Rol",
    title: "Miniaturas D&D Barbarian 32mm",
    mat: "Resina UV",
    finish: "Pintado a mano",
    size: "3.2cm escala 1:56",
    price: "desde 8€/ud",
    gradient: "from-emerald-900/80 to-teal-950/60",
    accent: "#10B981",
  },
  {
    id: 5,
    cat: "Mesa & Rol",
    title: "Torre de dados personalizada",
    mat: "Resina UV",
    finish: "Lijado",
    size: "7×7×12 cm",
    price: "desde 22€",
    gradient: "from-teal-900/80 to-cyan-950/60",
    accent: "#06D6A0",
  },
  {
    id: 6,
    cat: "Mesa & Rol",
    title: "Inserto organizador Gloomhaven",
    mat: "PLA Estándar",
    finish: "En crudo",
    size: "Medidas caja original",
    price: "desde 28€",
    gradient: "from-cyan-900/80 to-teal-950/60",
    accent: "#0891B2",
  },
  {
    id: 7,
    cat: "Decoración",
    title: "Maceta geométrica hexagonal Ø18",
    mat: "PLA Silk Dorado",
    finish: "Lijado",
    size: "18×18×22 cm",
    price: "desde 26€",
    gradient: "from-amber-900/80 to-yellow-950/60",
    accent: "#F59E0B",
  },
  {
    id: 8,
    cat: "Decoración",
    title: "Litofanía familiar retroiluminada",
    mat: "PLA Translúcido",
    finish: "En crudo",
    size: "20×15 cm",
    price: "desde 19€",
    gradient: "from-orange-900/80 to-amber-950/60",
    accent: "#F97316",
  },
  {
    id: 9,
    cat: "Decoración",
    title: "Reloj pared paramétrico modular",
    mat: "PLA Silk Negro",
    finish: "Lijado",
    size: "45cm diámetro",
    price: "desde 44€",
    gradient: "from-stone-800/80 to-zinc-950/60",
    accent: "#A3A3A3",
  },
  {
    id: 10,
    cat: "Cosplay",
    title: "Casco Iron Man MK50 1:1",
    mat: "PLA + Pintura acrílica",
    finish: "Pintado a mano",
    size: "Talla adulto universal",
    price: "desde 185€",
    gradient: "from-red-900/80 to-rose-950/60",
    accent: "#EF4444",
  },
  {
    id: 11,
    cat: "Cosplay",
    title: "Escudo Capitán América 60cm",
    mat: "PLA + Vinilo",
    finish: "Pintado a mano",
    size: "60cm diámetro",
    price: "desde 120€",
    gradient: "from-blue-900/80 to-indigo-950/60",
    accent: "#3B82F6",
  },
  {
    id: 12,
    cat: "Cosplay",
    title: "Guantelete Thanos completo",
    mat: "PLA Silk Dorado",
    finish: "Lijado + Imprimación",
    size: "Talla adulto",
    price: "desde 95€",
    gradient: "from-violet-900/80 to-purple-950/60",
    accent: "#7C3AED",
  },
];

const tallIds = new Set([1, 4, 10]);

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredItems =
    activeFilter === "Todos"
      ? items
      : items.filter((i) => i.cat === activeFilter);

  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Portfolio
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Trabajos{" "}
          <span className="gradient-text">realizados</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Cada pieza es única. Aquí una muestra de lo que hemos creado para
          otros makers.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mt-8 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 border ${
              activeFilter === filter
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-transparent border border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4">
            <div className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-dark-card hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Visual area */}
              <div
                className={`${tallIds.has(item.id) ? "h-56" : "h-44"} relative bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                {/* Decorative element */}
                <div
                  className="w-24 h-24 rounded-2xl border-2 rotate-12 group-hover:rotate-6 transition-transform duration-500 flex items-center justify-center"
                  style={{
                    borderColor: item.accent,
                    backgroundColor: item.accent + "20",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border border-white/30 -rotate-12"
                    style={{ backgroundColor: item.accent + "30" }}
                  />
                </div>

                {/* Category badge */}
                <span
                  className="absolute bottom-3 left-3 text-xs font-bold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: item.accent + "30",
                    color: item.accent,
                  }}
                >
                  {item.cat}
                </span>

                {/* Price badge */}
                <span className="absolute bottom-3 right-3 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  {item.price}
                </span>
              </div>

              {/* Info area */}
              <div className="p-4">
                <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Material row */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                  <span>{item.mat}</span>
                </div>

                {/* Finish row */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                  <span>{item.finish}</span>
                </div>

                {/* Size */}
                <p className="text-xs text-gray-600 mt-2">{item.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link href="/contacto" className="btn-secondary">
          ¿Quieres algo así? Pídelo ahora
        </Link>
      </div>
    </section>
  );
}
